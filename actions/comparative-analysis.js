"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to serialize decimal values
const serializePrice = (price) => {
  if (price === null || price === undefined) return 0;
  return parseFloat(price.toString());
};

export async function compareVehicles(carIds) {
  try {
    const cars = await db.car.findMany({
      where: {
        id: { in: carIds },
      },
      select: {
        id: true,
        make: true,
        model: true,
        year: true,
        price: true,
        mileage: true,
        fuelType: true,
        transmission: true,
        bodyType: true,
        seats: true,
        description: true,
        images: true,
        color: true,
        greenScore: true,
        environmentalMetrics: true,
      },
    });

    if (!cars.length) {
      return { success: false, error: "No cars found" };
    }

    // Prepare serialized data for AI analysis
    const serializedCars = cars.map((car) => ({
      id: car.id,
      make: car.make,
      model: car.model,
      year: car.year,
      price: serializePrice(car.price),
      mileage: car.mileage,
      fuelType: car.fuelType,
      transmission: car.transmission,
      bodyType: car.bodyType,
      seats: car.seats,
      description: car.description,
      color: car.color,
    }));

    // AI-powered comparison
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      As an automotive expert, analyze these vehicles and provide a detailed comparison:
      ${JSON.stringify(serializedCars)}

      Create a detailed comparison focusing on:
      1. Common features shared by all vehicles
      2. Unique features for each vehicle
      3. Value analysis considering price, features, and specifications
      4. Overall recommendations

      Return ONLY a JSON object in this exact format (no markdown or additional text):
      {
        "featureComparison": {
          "common": ["list specific features common to all cars, be detailed"],
          "unique": {
            "${cars[0].id}": ["specific unique features for first car"],
            "${cars[1].id}": ["specific unique features for second car"]
          }
        },
        "valueAnalysis": {
          "${cars[0].id}": {
            "strengths": ["detailed strengths"],
            "weaknesses": ["detailed weaknesses"],
            "valueScore": 85
          }
        },
        "recommendation": {
          "bestValue": "car model name",
          "bestPerformance": "car model name",
          "bestEfficiency": "car model name",
          "reasoning": ["detailed reasons"]
        }
      }`;

    const result = await model.generateContent(prompt);
    const cleanJson = result.response
      .text()
      .replace(/```json\s*|\s*```/g, "")
      .replace(/\n/g, "")
      .trim();

    let comparison;
    try {
      comparison = JSON.parse(cleanJson);
    } catch (error) {
      console.error("AI response parsing error:", error);
      console.error("Raw response:", cleanJson);
      return { success: false, error: "Failed to parse comparison data" };
    }

    // Calculate ownership costs
    const costAnalysis = cars.map((car) => {
      const basePrice = serializePrice(car.price);
      const yearlyDepreciation = 0.15; // 15% yearly depreciation
      const yearlyMaintenance = basePrice * 0.05; // 5% of price for maintenance
      const fuelCosts = calculateFuelCosts(car);

      return {
        carId: car.id,
        initialPrice: basePrice,
        fiveYearCosts: {
          depreciation: basePrice * yearlyDepreciation * 5,
          maintenance: yearlyMaintenance * 5,
          fuel: fuelCosts * 5,
          insurance: estimateInsuranceCost(car) * 5,
        },
      };
    });

    return {
      success: true,
      data: {
        basics: cars.map((car) => ({
          id: car.id,
          make: car.make,
          model: car.model,
          year: car.year,
          price: serializePrice(car.price),
          image: car.images[0] || null,
        })),
        comparison,
        costAnalysis,
        environmental: cars.map((car) => ({
          id: car.id,
          greenScore: car.greenScore || 0,
          metrics: car.environmentalMetrics || {},
        })),
      },
    };
  } catch (error) {
    console.error("Vehicle comparison error:", error);
    return {
      success: false,
      error: "Failed to compare vehicles",
    };
  }
}

function calculateFuelCosts(car) {
  const averageMileagePerYear = 12000;
  const fuelPrice = car.fuelType === "Electric" ? 0.14 : 3.5;
  const efficiency =
    car.fuelType === "Electric"
      ? 30 // Default kWh/100mi for electric
      : 25; // Default MPG for non-electric

  if (car.fuelType === "Electric") {
    return (averageMileagePerYear / 100) * efficiency * fuelPrice;
  }
  return (averageMileagePerYear / efficiency) * fuelPrice;
}

function estimateInsuranceCost(car) {
  const baseRate = 1200;
  const ageMultiplier = Math.max(
    0.8,
    1 - (new Date().getFullYear() - car.year) * 0.05
  );
  const valueMultiplier = 1 + (serializePrice(car.price) / 50000) * 0.2;

  return baseRate * ageMultiplier * valueMultiplier;
}

export async function saveComparison(comparisonData) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    const dbUser = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!dbUser) {
      return { success: false, error: "User not found" };
    }

    const savedComparison = await db.comparison.create({
      data: {
        userId: dbUser.id,
        carIds: comparisonData.carIds,
        comparisonData: comparisonData.data,
        createdAt: new Date(),
      },
    });

    return {
      success: true,
      data: savedComparison,
    };
  } catch (error) {
    console.error("Save comparison error:", error);
    return {
      success: false,
      error: "Failed to save comparison",
    };
  }
}
