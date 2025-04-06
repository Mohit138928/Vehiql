"use client";

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Badge, CarIcon, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const CarCard = ({ car }) => {
  const [isSaved, setIsSaved] = useState(car.wishlisted);
  const router = useRouter();

  const handleToggleSave = async (e) => {};

  return (
    <Card className="overflow-hidden hover:shadow-lg transition group">
      <div className="relative h-48">
        {car.images && car.images.length > 0 ? (
          <div className="relative w-full h-full">
            <Image
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              // width={300}
              // height={200}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <CarIcon className="w-12 h-12 text-gray-300" />
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 bg-white/90 rounded-full p-1.51 ${
            isSaved
              ? "text-red-500 hover:text-red-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={handleToggleSave}
        >
          <Heart className={isSaved ? "fill-current" : ""} size={20} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="flex flex-col mb-2">
          <h3 className="text-lg font-bold line-clamp-1">
            {car.make} {car.model}
          </h3>
          <span className="text-xl font-bold text-blue-600">
            ${car.price.toLocaleString("en-US")}
          </span>
        </div>

        <div className="flex text-gray-600 mb-2 items-center">
          <span>{car.year}</span>
          <span className="mx-2">•</span>
          <span>{car.transmission}</span>
          <span className="mx-2">•</span>
          <span>{car.fuelType}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          <span className="bg-gray-100 text-black px-2 py-1 rounded text-xs hover:bg-gray-200 transition duration-300 font-mono font-semibold">
            {car.bodyType}
          </span>
          <span className="bg-gray-100 text-black px-2 py-1 rounded text-xs hover:bg-gray-200 transition duration-300 font-mono font-semibold">
            {car.mileage.toLocaleString()} miles
          </span>
          <span className="bg-gray-100 text-black px-2 py-1 rounded text-xs hover:bg-gray-200 transition duration-300 font-mono font-semibold">
            {car.color}
          </span>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <Button
            className="flex-1"
            onClick={() => router.push(`/cars/${car.id}`)}
          >
            View Car
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
