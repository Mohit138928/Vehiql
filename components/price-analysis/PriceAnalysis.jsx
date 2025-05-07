"use client";

import { useState } from "react";
import { analyzePriceHistory } from "@/actions/price-analysis";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2, TrendingDown, DollarSign, Calendar } from "lucide-react";

export function PriceAnalysis({ car }) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzePriceHistory(car.id);
      if (result.success) {
        setAnalysis(result.data);
      }
    } catch (error) {
      console.error("Price analysis error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full md:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing Price...
          </>
        ) : (
          <>
            <DollarSign className="mr-2 h-4 w-4" />
            Analyze Price
          </>
        )}
      </Button>

      {analysis && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Market Value Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Market Value Analysis</h3>
              <span
                className={`text-sm font-medium px-2 py-1 rounded ${
                  analysis.analysis.priceAnalysis.valueRating === "EXCELLENT"
                    ? "bg-green-100 text-green-700"
                    : analysis.analysis.priceAnalysis.valueRating === "GOOD"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {analysis.analysis.priceAnalysis.valueRating}
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Estimated Value</p>
                <p className="text-2xl font-bold">
                  $
                  {analysis.analysis.marketValue.estimatedValue.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Range: $
                  {analysis.analysis.marketValue.priceRange.low.toLocaleString()}{" "}
                  - $
                  {analysis.analysis.marketValue.priceRange.high.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price Competitiveness</p>
                <div className="mt-1">
                  {analysis.analysis.priceAnalysis.factors.map((factor, i) => (
                    <p key={i} className="text-sm">
                      • {factor}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Depreciation Forecast */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Depreciation Forecast</h3>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analysis.depreciation.projectedValues}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Value",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="projectedValue"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Annual Depreciation Rate:{" "}
              {(analysis.depreciation.rate * 100).toFixed(1)}%
            </p>
          </Card>

          {/* Best Time to Buy */}
          <Card className="p-6 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Buying Recommendation</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg font-medium">
                  {analysis.analysis.buyingRecommendation.recommendation.replace(
                    "_",
                    " "
                  )}
                </p>
                <div className="mt-2 space-y-1">
                  {analysis.analysis.buyingRecommendation.reasoning.map(
                    (reason, i) => (
                      <p key={i} className="text-sm">
                        • {reason}
                      </p>
                    )
                  )}
                </div>
                {analysis.analysis.buyingRecommendation.potentialSavings >
                  0 && (
                  <p className="mt-3 text-sm text-green-600">
                    Potential savings: $
                    {analysis.analysis.buyingRecommendation.potentialSavings.toLocaleString()}
                  </p>
                )}
              </div>
              <div>
                <p className="font-medium">Seasonal Trends</p>
                <p className="text-sm mt-2">
                  Best month to buy:{" "}
                  {analysis.analysis.seasonalTrends.bestMonthToBuy}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Price variation:{" "}
                  {analysis.analysis.seasonalTrends.priceVariation}%
                </p>
                <div className="mt-2">
                  {analysis.analysis.seasonalTrends.seasonalFactors.map(
                    (factor, i) => (
                      <p key={i} className="text-sm">
                        • {factor}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
