"use client";

import { useState } from "react";
import {
  compareVehicles,
  saveComparison,
} from "@/actions/comparative-analysis";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { Loader2, Save } from "lucide-react";
import { formatCurrency } from "@/lib/helper";

export function CompareVehicles({ cars }) {
  const [loading, setLoading] = useState(false);
  const [comparison, setComparison] = useState(null);
  const [error, setError] = useState(null);

  const handleCompare = async () => {
    if (!cars?.length) {
      setError("No cars selected for comparison");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await compareVehicles(cars.map((car) => car.id));
      if (result.success && result.data) {
        if (!result.data.basics?.length || !result.data.comparison) {
          throw new Error("Invalid comparison data received");
        }
        setComparison(result.data);
      } else {
        throw new Error(result.error || "Failed to compare vehicles");
      }
    } catch (error) {
      console.error("Comparison error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(comparison);

  const conversionRate = 83; // 1 USD = 83.2 INR (as an example)

  const handleConvert = (dollar) => {
    const result = parseFloat(dollar) * conversionRate;
    return result.toFixed(2);
  };

  const handleSave = async () => {
    if (!comparison) return;
    try {
      await saveComparison({
        carIds: cars.map((car) => car.id),
        data: comparison,
      });
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  if (error) {
    return (
      <Card className="p-4 bg-red-50 text-red-600">
        <p>{error}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Button onClick={handleCompare} disabled={loading || !cars?.length}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Comparing...
            </>
          ) : (
            "Compare Vehicles"
          )}
        </Button>

        {comparison && (
          <Button onClick={handleSave} variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Comparison
          </Button>
        )}
      </div>

      {comparison?.basics?.length > 0 && comparison.comparison && (
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparison.basics.map((car) => {
              if (!car) return null;
              return (
                <Card key={car.id} className="p-4">
                  {car.image && (
                    <img
                      src={car.image}
                      alt={`${car.year || ""} ${car.make || ""} ${
                        car.model || ""
                      }`}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h3 className="font-semibold">
                    {[car.year, car.make, car.model].filter(Boolean).join(" ")}
                  </h3>
                  {formatCurrency(handleConvert(car.price)) && (
                    <p className="text-lg font-medium text-blue-600">
                      {/* $
                      {typeof car.price === "number"
                        ? car.price.toLocaleString()
                        : car.price} */}
                      {formatCurrency(handleConvert(car.price))}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Feature Comparison */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Feature Comparison</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Common Features */}
              <div>
                <h4 className="font-medium mb-2">Common Features</h4>
                {comparison.comparison.featureComparison.common.length > 0 ? (
                  <ul className="space-y-1">
                    {comparison.comparison.featureComparison.common.map(
                      (feature, i) => (
                        <li key={i} className="text-sm">
                          • {feature}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">
                    No common features found
                  </p>
                )}
              </div>

              {/* Unique Features */}
              <div>
                <h4 className="font-medium mb-2">Unique Features</h4>
                {Object.entries(comparison.comparison.featureComparison.unique)
                  .length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(
                      comparison.comparison.featureComparison.unique
                    ).map(([carId, features]) => {
                      const car = comparison.basics.find(
                        (c) => c?.id === carId
                      );
                      if (!car || !features?.length) return null;

                      return (
                        <div key={carId}>
                          <p className="text-sm font-medium text-blue-600">
                            {car.year} {car.make} {car.model}:
                          </p>
                          <ul className="mt-1 space-y-1">
                            {features.map((feature, i) => (
                              <li key={i} className="text-sm">
                                • {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No unique features found
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Cost Analysis in dollar */}
          {/* {comparison.costAnalysis?.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                5-Year Cost of Ownership
              </h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={comparison.costAnalysis.map((cost) => {
                      const car = comparison.basics.find(
                        (c) => c?.id === cost.carId
                      );
                      return {
                        name: car ? car.model : "Unknown",
                        Depreciation: cost.fiveYearCosts.depreciation,
                        Maintenance: cost.fiveYearCosts.maintenance,
                        Fuel: cost.fiveYearCosts.fuel,
                        Insurance: cost.fiveYearCosts.insurance,
                      };
                    })}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(0)}k`
                      }
                    />
                    <Tooltip
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Legend />
                    <Bar dataKey="Depreciation" stackId="a" fill="#8884d8" />
                    <Bar dataKey="Maintenance" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="Fuel" stackId="a" fill="#ffc658" />
                    <Bar dataKey="Insurance" stackId="a" fill="#ff7300" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )} */}

          {/* Cost Analysis in rupee */}
          {comparison.costAnalysis?.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                5-Year Cost of Ownership
              </h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={comparison.costAnalysis.map((cost) => {
                      const car = comparison.basics.find(
                        (c) => c?.id === cost.carId
                      );
                      return {
                        name: car ? car.model : "Unknown",
                        Depreciation: cost.fiveYearCosts.depreciation,
                        Maintenance: cost.fiveYearCosts.maintenance,
                        Fuel: cost.fiveYearCosts.fuel,
                        Insurance: cost.fiveYearCosts.insurance,
                      };
                    })}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={
                        (value) => `₹${(value / 100000).toFixed(1)}L` // Convert to Lakhs
                      }
                    />
                    <Tooltip
                      formatter={(value) => [
                        formatCurrency(value), // Use the formatCurrency helper
                        // Or if you want more precise formatting:
                        // `₹${value.toLocaleString('en-IN')}`
                      ]}
                    />
                    <Legend />
                    <Bar dataKey="Depreciation" stackId="a" fill="#8884d8" />
                    <Bar dataKey="Maintenance" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="Fuel" stackId="a" fill="#ffc658" />
                    <Bar dataKey="Insurance" stackId="a" fill="#ff7300" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
