"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { calculateEnvironmentalImpact, getEcoFriendlyRecommendations } from "@/actions/environmental-impact";
import { Loader2, Leaf, TreePine, Wind } from "lucide-react";

export function EnvironmentalDashboard({ car }) {
  const [loading, setLoading] = useState(false);
  const [impactData, setImpactData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const calculateImpact = async () => {
    setLoading(true);
    try {
      const result = await calculateEnvironmentalImpact(car.id);
      if (result.success) {
        setImpactData(result.data);
        
        // Get eco-friendly recommendations
        const recoResult = await getEcoFriendlyRecommendations({
          maxPrice: car.price,
          bodyType: car.bodyType
        });
        if (recoResult.success) {
          setRecommendations(recoResult.data);
        }
      }
    } catch (error) {
      console.error("Impact calculation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Button 
        onClick={calculateImpact} 
        disabled={loading}
        className="w-full md:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Calculating Environmental Impact...
          </>
        ) : (
          <>
            <Leaf className="mr-2 h-4 w-4" />
            Calculate Environmental Impact
          </>
        )}
      </Button>

      {impactData && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Carbon Footprint Card */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TreePine className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold">Carbon Footprint</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Annual CO2 Emissions</p>
                <p className="text-2xl font-bold">
                  {impactData.carbonFootprint.annualCO2Emissions} tons
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Comparison to Average</p>
                <p className="text-lg">
                  {impactData.carbonFootprint.comparisonToAverage}% 
                  {impactData.carbonFootprint.comparisonToAverage < 0 ? " lower" : " higher"}
                </p>
              </div>
            </div>
          </Card>

          {/* Green Score Card */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold">Green Score</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Progress 
                  value={(impactData.greenScore.score / impactData.greenScore.maxScore) * 100} 
                  className="h-2"
                />
                <p className="mt-2 text-2xl font-bold">
                  {impactData.greenScore.score}/{impactData.greenScore.maxScore}
                </p>
              </div>
              <div className="space-y-2">
                {impactData.greenScore.factors.map((factor, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{factor.name}</span>
                    <span className={`text-sm ${
                      factor.impact === "HIGH" ? "text-green-600" :
                      factor.impact === "MEDIUM" ? "text-amber-600" :
                      "text-red-600"
                    }`}>
                      {factor.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Environmental Metrics Card */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wind className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold">Environmental Metrics</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Fuel Efficiency</p>
                <p className="text-lg font-semibold">
                  {impactData.environmentalMetrics.fuelEfficiency} MPG
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Emissions Category</p>
                <p className="text-lg font-semibold">
                  {impactData.environmentalMetrics.emissionsCategory}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Renewable Compatibility</p>
                <p className="text-lg font-semibold">
                  {impactData.environmentalMetrics.renewableCompatibility}%
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Eco-Friendly Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Eco-Friendly Alternatives</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((car) => (
              <Card key={car.id} className="p-4">
                <img
                  src={car.images[0]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h4 className="font-semibold">{car.year} {car.make} {car.model}</h4>
                <p className="text-sm text-gray-600">{car.fuelType}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-green-600 font-medium">
                    Green Score: {car.greenScore}
                  </span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}