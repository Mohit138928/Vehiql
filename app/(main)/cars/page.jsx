import { getCarFilters } from "@/actions/car-listing";
import React from "react";
import { CarFilters } from "./_components/car-filters";
import { CarListings } from "./_components/cars-listing";
import { CompareVehicles } from "@/components/comparison/CompareVehicles";

export const metadata = {
  title: "Cars | AutoVolt",
  description: "Browse and Search for your dream car",
};

const CarsPage = async () => {
  const filtersData = await getCarFilters(); // Fetching filters data on the server
  return (
    <div className="container mx-auto px-10 py-12">
      <h1 className="text-6xl mb-4 gradient-title">Browse Cars</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* filters Section */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <CarFilters filters={filtersData.data} />
        </div>

        {/* Car Listing */}
        <div className="flex-1">
          <CarListings />
        </div>

        {/* Add comparison section */}
        {/* <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Compare Vehicles</h2>
          <CompareVehicles cars={selectedCars} />
        </div> */}
      </div>
    </div>
  );
};

export default CarsPage;
