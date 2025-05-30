// // Helper function to serialize car data for the frontend
// export const serializedCarData = (car, wishlisted = false) => {
//   return {
//     ...car,
//     price: car.price ? parseFloat(car.price.toString()) : 0,
//     createdAt: car.createdAt?.toISOString(),
//     updatedAt: car.updatedAt?.toISOString(),
//     wishlisted: wishlisted,
//   };
// };

// export const formatCurrency = (amount) => {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(amount);
// };

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to serialize car data for the frontend
export const serializedCarData = (car, wishlisted = false) => {
  return {
    ...car,
    // Convert USD to INR (approximate conversion rate)
    price: car.price ? parseFloat((parseFloat(car.price.toString()) * 83).toFixed(0)) : 0,
    createdAt: car.createdAt?.toISOString(),
    updatedAt: car.updatedAt?.toISOString(),
    wishlisted: wishlisted,
  };
};