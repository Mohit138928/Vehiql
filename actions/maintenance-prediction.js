"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateMaintenancePrediction(carData) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a more explicit prompt to avoid markdown
    const prompt = `
      You are an automotive maintenance expert. Analyze this car's data and provide maintenance predictions.
      RESPOND ONLY WITH A JSON OBJECT (no markdown, no backticks, no additional text).

      Car Details:
      Make: ${carData.make}
      Model: ${carData.model}
      Year: ${carData.year}
      Mileage: ${carData.mileage || 0}
      Fuel Type: ${carData.fuelType}

      Format your response exactly like this:
      {
        "nextServices": [
          {
            "serviceName": "string",
            "dueAt": number,
            "estimatedCost": number,
            "priority": "HIGH/MEDIUM/LOW",
            "description": "string"
          }
        ],
        "partsReplacement": [
          {
            "partName": "string",
            "recommendedReplacementMileage": number,
            "estimatedCost": number,
            "warning": "string or null"
          }
        ],
        "totalMaintenanceCost": number,
        "maintenanceSchedule": {
          "immediate": ["string"],
          "next3Months": ["string"],
          "next6Months": ["string"],
          "next12Months": ["string"]
        }
      }`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean the response text by removing any markdown formatting
    const cleanJson = responseText
      .replace(/```json\s*/g, '')  // Remove ```json
      .replace(/```\s*/g, '')      // Remove remaining ```
      .trim();                     // Remove extra whitespace

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error("Parse error:", parseError);
      console.log("Raw response:", responseText);
      console.log("Cleaned response:", cleanJson);
      return {
        success: false,
        error: "Failed to parse maintenance prediction"
      };
    }

    const { nextServices, partsReplacement, totalMaintenanceCost, maintenanceSchedule } = parsedResponse;

    // Save prediction if user is logged in
    const { userId } = await auth();
    if (userId) {
      const dbUser = await db.user.findUnique({
        where: { clerkUserId: userId }
      });

      if (dbUser) {
        await db.maintenancePrediction.create({
          data: {
            userId: dbUser.id,
            carId: carData.id,
            nextServices,
            partsReplacement,
            totalMaintenanceCost,
            maintenanceSchedule,
            createdAt: new Date()
          }
        });
      }
    }

    return {
      success: true,
      data: {
        nextServices,
        partsReplacement,
        totalMaintenanceCost,
        maintenanceSchedule
      }
    };

  } catch (error) {
    console.error("Maintenance prediction error:", error);
    return {
      success: false,
      error: "Failed to generate maintenance prediction"
    };
  }
}

export async function getMaintenanceHistory(carId) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const dbUser = await db.user.findUnique({
      where: { clerkUserId: userId }
    });

    const predictions = await db.maintenancePrediction.findMany({
      where: {
        userId: dbUser.id,
        carId
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });

    return {
      success: true,
      data: predictions
    };

  } catch (error) {
    console.error("Error fetching maintenance history:", error);
    return {
      success: false,
      error: "Failed to fetch maintenance history"
    };
  }
}

export async function generateServiceReminders(carId) {
  try {
    const prediction = await db.maintenancePrediction.findFirst({
      where: { carId },
      orderBy: { createdAt: 'desc' }
    });

    if (!prediction) {
      return {
        success: false,
        error: "No maintenance prediction found"
      };
    }

    // Generate reminder dates based on maintenance schedule
    const reminders = [];
    const now = new Date();

    // Immediate reminders
    prediction.maintenanceSchedule.immediate.forEach(service => {
      reminders.push({
        service,
        dueDate: now,
        priority: "HIGH"
      });
    });

    // 3-month reminders
    const threeMonths = new Date(now.setMonth(now.getMonth() + 3));
    prediction.maintenanceSchedule.next3Months.forEach(service => {
      reminders.push({
        service,
        dueDate: threeMonths,
        priority: "MEDIUM"
      });
    });

    // 6-month reminders
    const sixMonths = new Date(now.setMonth(now.getMonth() + 6));
    prediction.maintenanceSchedule.next6Months.forEach(service => {
      reminders.push({
        service,
        dueDate: sixMonths,
        priority: "LOW"
      });
    });

    return {
      success: true,
      data: reminders
    };

  } catch (error) {
    console.error("Error generating reminders:", error);
    return {
      success: false,
      error: "Failed to generate service reminders"
    };
  }
}