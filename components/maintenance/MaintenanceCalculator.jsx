"use client";

import { useState } from "react";
import { generateMaintenancePrediction } from "@/actions/maintenance-prediction";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/helper";

export function MaintenanceCalculator({ car }) {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const result = await generateMaintenancePrediction(car);
      if (result.success) {
        setPrediction(result.data);
      }
    } catch (error) {
      console.error("Calculation error:", error);
    } finally {
      setLoading(false);
    }
  };

     const conversionRate = 83; // 1 USD = 83.2 INR (as an example)

  const handleConvert = (dollar) => {
    const result = parseFloat(dollar) * conversionRate;
    return (result.toFixed(2));
  };

  return (
    <div className="space-y-6">
      <Button 
        onClick={handleCalculate} 
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Calculating...
          </>
        ) : (
          "Calculate Maintenance"
        )}
      </Button>

      {prediction && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Next Services */}
          <Card className="p-4">
            <h3 className="text-lg font-bold mb-4">Upcoming Services</h3>
            <ul className="space-y-3">
              {prediction.nextServices.map((service, i) => (
                <li key={i} className="flex justify-between">
                  <span>{service.serviceName}</span>
                  <span className="font-semibold">
                    {formatCurrency(handleConvert(service.estimatedCost))}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Parts Replacement */}
          <Card className="p-4">
            <h3 className="text-lg font-bold mb-4">Parts Replacement</h3>
            <ul className="space-y-3">
              {prediction.partsReplacement.map((part, i) => (
                <li key={i}>
                  <div className="flex justify-between">
                    <span>{part.partName}</span>
                    <span className="font-semibold">
                      {formatCurrency(handleConvert(part.estimatedCost))}
                    </span>
                  </div>
                  {part.warning && (
                    <p className="text-sm text-red-500 mt-1">
                      {part.warning}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Card>

          {/* Maintenance Schedule */}
          <Card className="p-4 md:col-span-2">
            <h3 className="text-lg font-bold mb-4">Maintenance Schedule</h3>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <h4 className="font-medium mb-2">Immediate</h4>
                <ul className="text-sm space-y-1">
                  {prediction.maintenanceSchedule.immediate.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Next 3 Months</h4>
                <ul className="text-sm space-y-1">
                  {prediction.maintenanceSchedule.next3Months.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Next 6 Months</h4>
                <ul className="text-sm space-y-1">
                  {prediction.maintenanceSchedule.next6Months.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Next 12 Months</h4>
                <ul className="text-sm space-y-1">
                  {prediction.maintenanceSchedule.next12Months.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Total Cost */}
          <Card className="p-4 md:col-span-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">
                Total Maintenance Cost (12 months)
              </h3>
              <span className="text-2xl font-bold text-blue-600">
                {formatCurrency(handleConvert(prediction.totalMaintenanceCost))}
              </span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}