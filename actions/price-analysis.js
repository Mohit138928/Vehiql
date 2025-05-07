"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzePriceHistory(carId) {
  try {
    const car = await db.car.findUnique({
      where: { id: carId },
      select: {
        make: true,
        model: true,
        year: true,
        price: true,
        mileage: true,
        fuelType: true,
        bodyType: true,
        priceHistory: true, // Assuming you add this field to your schema
      },
    });

    if (!car) {
      return { success: false, error: "Car not found" };
    }

    // Get similar cars for market comparison
    const similarCars = await db.car.findMany({
      where: {
        make: car.make,
        model: car.model,
        year: {
          gte: car.year - 2,
          lte: car.year + 2,
        },
        id: { not: carId },
      },
      select: {
        price: true,
        mileage: true,
        year: true,
      },
    });

    // Calculate depreciation rate
    const averageDepreciation = calculateDepreciation(car, similarCars);

    // Get AI-powered price analysis
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      As a car market expert, analyze this vehicle's pricing data:
      Car: ${car.year} ${car.make} ${car.model}
      Current Price: $${car.price}
      Similar Cars Average: $${calculateAveragePrice(similarCars)}
      Market Data: ${JSON.stringify({ car, similarCars, averageDepreciation })}

      Provide analysis in this JSON format (no markdown):
      {
        "marketValue": {
          "estimatedValue": number,
          "confidence": number,
          "priceRange": {
            "low": number,
            "high": number
          }
        },
        "priceAnalysis": {
          "isPriceCompetitive": boolean,
          "valueRating": "EXCELLENT" | "GOOD" | "FAIR" | "HIGH",
          "factors": string[]
        },
        "buyingRecommendation": {
          "recommendation": "BUY_NOW" | "WAIT" | "NEGOTIATE",
          "reasoning": string[],
          "potentialSavings": number
        },
        "seasonalTrends": {
          "bestMonthToBuy": string,
          "priceVariation": number,
          "seasonalFactors": string[]
        }
      }`;

    const result = await model.generateContent(prompt);
    const cleanJson = result.response
      .text()
      .replace(/```json\s*|\s*```/g, "")
      .trim();
    const analysis = JSON.parse(cleanJson);

    // Save analysis if user is logged in
    const { userId } = await auth();
    if (userId) {
      const dbUser = await db.user.findUnique({
        where: { clerkUserId: userId },
      });

      if (dbUser) {
        await db.priceAnalysis.create({
          data: {
            userId: dbUser.id,
            carId,
            marketValue: analysis.marketValue,
            priceAnalysis: analysis.priceAnalysis,
            buyingRecommendation: analysis.buyingRecommendation,
            seasonalTrends: analysis.seasonalTrends,
            createdAt: new Date(),
          },
        });
      }
    }

    return {
      success: true,
      data: {
        currentPrice: parseFloat(car.price.toString()),
        analysis,
        depreciation: {
          rate: averageDepreciation,
          projectedValues: calculateProjectedValues(
            car.price,
            averageDepreciation
          ),
        },
        marketComparison: {
          similarCars: formatSimilarCarsData(similarCars),
          averagePrice: calculateAveragePrice(similarCars),
          priceDistribution: calculatePriceDistribution(similarCars),
        },
      },
    };
  } catch (error) {
    console.error("Price analysis error:", error);
    return {
      success: false,
      error: "Failed to analyze price",
    };
  }
}

// Helper functions
function calculateDepreciation(car, similarCars) {
  const yearlyDepreciation = similarCars
    .map((similar) => {
      const ageDifference = car.year - similar.year;
      if (ageDifference <= 0) return null;
      const priceDropPercent =
        (parseFloat(car.price.toString()) -
          parseFloat(similar.price.toString())) /
        parseFloat(car.price.toString()) /
        ageDifference;
      return priceDropPercent;
    })
    .filter(Boolean);

  return yearlyDepreciation.length > 0
    ? yearlyDepreciation.reduce((a, b) => a + b, 0) / yearlyDepreciation.length
    : 0.15; // Default 15% if no data
}

function calculateProjectedValues(currentPrice, depreciationRate) {
  const price = parseFloat(currentPrice.toString());
  return Array.from({ length: 5 }, (_, i) => ({
    year: new Date().getFullYear() + i + 1,
    projectedValue: price * Math.pow(1 - depreciationRate, i + 1),
  }));
}

function formatSimilarCarsData(similarCars) {
  return similarCars.map((car) => ({
    price: parseFloat(car.price.toString()),
    mileage: car.mileage,
    year: car.year,
  }));
}

function calculateAveragePrice(similarCars) {
  const prices = similarCars.map((car) => parseFloat(car.price.toString()));
  return prices.length > 0
    ? prices.reduce((a, b) => a + b, 0) / prices.length
    : 0;
}

function calculatePriceDistribution(similarCars) {
  const prices = similarCars.map((car) => parseFloat(car.price.toString()));
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    median: calculateMedian(prices),
    quartiles: calculateQuartiles(prices),
  };
}

function calculateMedian(numbers) {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function calculateQuartiles(numbers) {
  const sorted = numbers.slice().sort((a, b) => a - b);
  return {
    q1: sorted[Math.floor(sorted.length / 4)],
    q2: calculateMedian(sorted),
    q3: sorted[Math.floor((3 * sorted.length) / 4)],
  };
}
