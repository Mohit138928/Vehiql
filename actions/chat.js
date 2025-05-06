"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function processChatMessage(message, conversationHistory) {
  try {
    const { userId } = await auth();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a more explicit prompt to avoid markdown formatting
    const prompt = `You are AutoVolt's car assistant. Respond EXACTLY in this format without any additional text or markdown:
{
  "message": "your response here",
  "preferences": {
    "fuelType": null or string,
    "bodyType": null or string,
    "make": null or string,
    "minPrice": null or number,
    "maxPrice": null or number,
    "minYear": null or number,
    "maxYear": null or number
  },
  "shouldAskMore": true or false
}

Current user message: "${message}"
Previous conversation: ${JSON.stringify(conversationHistory)}

Extract preferences from the conversation and provide relevant details. If any preference is not mentioned, set it to null.
If the user hasn't specified important details like budget or type, set shouldAskMore to true.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean the response text
    const cleanJson = responseText.replace(/```json\s*|\s*```/g, '').trim();
    
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error("Parse error:", parseError, "Raw response:", responseText);
      return {
        success: false,
        error: "Failed to parse AI response"
      };
    }

    // Build database query
    const where = {
      AND: [
        parsedResponse.preferences.make ? 
          { make: { contains: parsedResponse.preferences.make, mode: 'insensitive' } } : {},
        parsedResponse.preferences.bodyType ? 
          { bodyType: parsedResponse.preferences.bodyType } : {},
        parsedResponse.preferences.fuelType ? 
          { fuelType: parsedResponse.preferences.fuelType } : {},
        parsedResponse.preferences.minPrice ? 
          { price: { gte: parsedResponse.preferences.minPrice } } : {},
        parsedResponse.preferences.maxPrice ? 
          { price: { lte: parsedResponse.preferences.maxPrice } } : {},
        parsedResponse.preferences.minYear ? 
          { year: { gte: parsedResponse.preferences.minYear } } : {},
        parsedResponse.preferences.maxYear ? 
          { year: { lte: parsedResponse.preferences.maxYear } } : {},
      ].filter(clause => Object.keys(clause).length > 0)
    };

    // Get matching cars
    const recommendations = await db.car.findMany({
      where,
      take: 3,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        make: true,
        model: true,
        year: true,
        price: true,
        fuelType: true,
        bodyType: true,
        images: true
      }
    });

    // Build response message
    let responseMessage = parsedResponse.message;

    // Add follow-up questions if needed
    if (parsedResponse.shouldAskMore) {
      const missingPrefs = [];
      if (!parsedResponse.preferences.make) missingPrefs.push("preferred car brand");
      if (!parsedResponse.preferences.bodyType) missingPrefs.push("type of vehicle");
      if (!parsedResponse.preferences.maxPrice) missingPrefs.push("budget range");
      
      if (missingPrefs.length > 0) {
        responseMessage += `\n\nTo help you better, could you tell me your ${missingPrefs.join(", ")}?`;
      }
    }

    // Add recommendations if available
    if (recommendations.length > 0) {
      responseMessage += "\n\nHere are some cars that match your preferences:";
    }

    return {
      success: true,
      data: {
        message: responseMessage,
        recommendations: recommendations.map(car => ({
          ...car,
          price: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(car.price)
        }))
      }
    };

  } catch (error) {
    console.error("Chat processing error:", error);
    return {
      success: false,
      error: "Failed to process your message. Please try again."
    };
  }
}

// Optional: Get chat history for a user
export async function getUserChatHistory() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Not authenticated" };
    }

    const dbUser = await db.user.findUnique({
      where: { clerkUserId: userId }
    });

    if (!dbUser) {
      return { success: false, error: "User not found" };
    }

    const chatHistory = await db.chatInteraction.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        recommendedCars: true
      }
    });

    return {
      success: true,
      data: chatHistory
    };

  } catch (error) {
    console.error("Error fetching chat history:", error);
    return {
      success: false,
      error: "Failed to fetch chat history"
    };
  }
}