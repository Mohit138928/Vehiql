import { getCarById } from "@/actions/car-listing";
import { CarDetails } from "./_components/car-details";
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
    </div>
  );
}
