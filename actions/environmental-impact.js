"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function calculateEnvironmentalImpact(carId) {
  try {
    const car = await db.car.findUnique({
      where: { id: carId },
      select: {
        make: true,
        model: true,
        year: true,
        fuelType: true,
        mileage: true,
        transmission: true,
      }
    });

    if (!car) {
      return { success: false, error: "Car not found" };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Simplified prompt with explicit instruction to return only JSON
    const prompt = `
You are an automotive environmental impact expert. Based on this car's data, provide ONLY a JSON object (no other text) with environmental metrics:

Car Details:
Make: ${car.make}
Model: ${car.model}
Year: ${car.year}
Fuel Type: ${car.fuelType}
Mileage: ${car.mileage || 'N/A'}
Transmission: ${car.transmission}

Return ONLY this JSON structure with no additional text or formatting:
{
  "carbonFootprint": {
    "annualCO2Emissions": number,
    "lifetimeCO2Emissions": number,
    "comparisonToAverage": number
  },
  "greenScore": {
    "score": number,
    "maxScore": 100,
    "factors": [
      {
        "name": string,
        "score": number,
        "impact": "HIGH" | "MEDIUM" | "LOW"
      }
    ]
  },
  "environmentalMetrics": {
    "fuelEfficiency": number,
    "emissionsCategory": string,
    "renewableCompatibility": number
  }
}`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    
    // More robust cleaning of the response
    responseText = responseText
      .replace(/```json\s*/g, '')  // Remove ```json
      .replace(/```/g, '')         // Remove ```
      .replace(/\n/g, '')          // Remove newlines
      .trim();                     // Remove whitespace

    // Add error logging
    try {
      const environmentalData = JSON.parse(responseText);

      // Validate the required structure
      if (!environmentalData.carbonFootprint || 
          !environmentalData.greenScore || 
          !environmentalData.environmentalMetrics) {
        throw new Error("Invalid response structure");
      }

      // Save environmental data if user is logged in
      const { userId } = await auth();
      if (userId) {
        const dbUser = await db.user.findUnique({
          where: { clerkUserId: userId }
        });

        if (dbUser) {
          await db.environmentalImpact.create({
            data: {
              userId: dbUser.id,
              carId,
              carbonFootprint: environmentalData.carbonFootprint,
              greenScore: environmentalData.greenScore,
              environmentalMetrics: environmentalData.environmentalMetrics,
              createdAt: new Date()
            }
          });
        }
      }

      return {
        success: true,
        data: environmentalData
      };
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Raw Response:", responseText);
      return {
        success: false,
        error: "Failed to parse environmental data"
      };
    }

  } catch (error) {
    console.error("Environmental impact calculation error:", error);
    return {
      success: false,
      error: "Failed to calculate environmental impact"
    };
  }
}

export async function getEcoFriendlyRecommendations(criteria) {
  try {
    const where = {
      AND: [
        { fuelType: { in: ['Electric', 'Hybrid'] } },
        criteria.maxPrice ? { price: { lte: criteria.maxPrice } } : {},
        criteria.bodyType ? { bodyType: criteria.bodyType } : {},
      ]
    };

    const ecoFriendlyCars = await db.car.findMany({
      where,
      take: 5,
      orderBy: { greenScore: 'desc' },
      select: {
        id: true,
        make: true,
        model: true,
        year: true,
        price: true,
        fuelType: true,
        greenScore: true,
        images: true
      }
    });

    return {
      success: true,
      data: ecoFriendlyCars
    };

  } catch (error) {
    console.error("Eco-friendly recommendations error:", error);
    return {
      success: false,
      error: "Failed to fetch eco-friendly recommendations"
    };
  }
}

export async function compareEnvironmentalImpact(carIds) {
  try {
    const cars = await db.car.findMany({
      where: {
        id: { in: carIds }
      },
      select: {
        id: true,
        make: true,
        model: true,
        year: true,
        fuelType: true,
        greenScore: true,
        environmentalMetrics: true
      }
    });

    const comparison = cars.map(car => ({
      id: car.id,
      name: `${car.year} ${car.make} ${car.model}`,
      fuelType: car.fuelType,
      greenScore: car.greenScore,
      metrics: car.environmentalMetrics
    }));

    return {
      success: true,
      data: comparison
    };

  } catch (error) {
    console.error("Environmental comparison error:", error);
    return {
      success: false,
      error: "Failed to compare environmental impact"
    };
  }
}