import { getCarById } from "@/actions/car-listing";
import { CarDetails } from "./_components/car-details";
import { MaintenanceCalculator } from "@/components/maintenance/MaintenanceCalculator";
import { EnvironmentalDashboard } from "@/components/environmental/EnvironmentalDashboard";
import { notFound } from "next/navigation";

// ✅ Correct: no await needed here
export async function generateMetadata({ params }) {
  const { id } = params;
  const result = await getCarById(id);

  if (!result.success) {
    return {
      title: "Car Not Found | AutoVolt",
      description: "The requested car could not be found",
    };
  }

  const car = result.data;

  return {
    title: `${car.year} ${car.make} ${car.model} | AutoVolt`,
    description: car.description.substring(0, 160),
    openGraph: {
      images: car.images?.[0] ? [car.images[0]] : [],
    },
  };
}

// ✅ Also fixed here
export default async function CarDetailsPage({ params }) {
  const { id } = params;
  const result = await getCarById(id);

  if (!result.success) {
    notFound();
  }

  return (
    <div className="container mx-auto px-10 py-12">
      <CarDetails car={result.data} testDriveInfo={result.data.testDriveInfo} />
      
      {/* Environmental Impact Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Environmental Impact</h2>
        <EnvironmentalDashboard car={result.data} />
      </div>

      {/* Maintenance Calculator Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Maintenance Predictions</h2>
        <MaintenanceCalculator car={result.data} />
      </div>
    </div>
  );
}
