import { m, microtask } from 'framer-motion';
import React from 'react'
import { z } from 'zod';

// Predefined options
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"];
const transmissions = ["Automatic", "Manual", "Semi-Automatic"];
const bodyTypes = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Convertible",
  "Coupe",
  "Wagon",
  "Pickup",
];
const carStatuses = ["AVAILABLE", "UNAVAILABLE", "SOLD"];

const AddCarForm = () => {
    const carFromSchema = z.object({
        make : z.string().min(1, {message : "Make is required"}),
        model : z.string().min(1, {message : "Model is required"}),
        year : z.string().refine((val) => {
            const year = parseInt(val);
            return(
                !isNaN(year) && year >= 1900 && year <= new Date().getFullYear() + 1
            );
        }, "Valid year is required"),
        price: z.string().min(1, {message : "Price is required"}),
        mileage: z.string().min(1, {message : "Mileage is required"}),
        color: z.string().min(1, {message : "Color is required"}),
        fuelType : z.string().min(1, {message : "Fuel type is required"}),
        transmission : z.string().min(1, {message : "Transmission type is required"}),
        bodyType: z.string().min(1, {message : "Body type is required"}),
    })

  return (
    <div>AddCarForm</div>
  )
}

export default AddCarForm