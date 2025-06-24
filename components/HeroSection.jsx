"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HomeSearch from "@/components/home-search";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const carImages = [
  "/New_car/car1.jpeg",
  "/New_car/car2.jpeg",
  "/New_car/car3.jpeg",
  "/New_car/car4.jpeg",
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carImages.length);
    }, 6000); // 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50 to-white flex items-center">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <DotPattern className="absolute inset-0 -z-10 opacity-50" />

      <div className="container mx-auto px-4 md:px-10 pt-20 pb-20 flex flex-col md:flex-row gap-12 md:gap-20 items-center md:items-stretch relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col justify-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 leading-tight">
            Find Your Perfect Car with{" "}
            <span className="underline decoration-violet-500">AI</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl mb-10">
            Experience the future of car buying with our AI-powered platform
          </p>

          <SignedIn>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl w-full max-w-lg"
            >
              <HomeSearch />
            </motion.div>
          </SignedIn>
          <SignedOut>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 w-full max-w-lg"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Button asChild className="w-full shadow-md">
                  <Link href="/sign-in">
                    Sign Up Free <ArrowRight />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Button
                  asChild
                  variant="secondary"
                  className="w-full shadow-md"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </motion.div>
            </motion.div>
          </SignedOut>
        </motion.div>

        {/* Right Image Section with 3D Stack Animation */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full md:w-1/2 flex justify-center items-center relative h-[400px]  md:h-[550px]"
        >
          <div className="relative w-[450px] md:w-[500px] h-[400px] md:h-[500px]">
            {carImages.map((src, index) => {
              const position =
                (index - currentImageIndex + carImages.length) %
                carImages.length;

              let zIndex = 0;
              let styles = "";
              let scale = 0.9;
              let translate = "";

              if (position === 0) {
                zIndex = 30;
                scale = 1;
                translate = "translate-x-0";
              } else if (position === 1) {
                zIndex = 20;
                scale = 0.9;
                translate = "translate-x-16";
              } else if (position === 2) {
                zIndex = 10;
                scale = 0.85;
                translate = "-translate-x-16 -translate-y-4";
              } else {
                zIndex = 5;
                scale = 0.8;
                translate = "-translate-x-8 translate-y-4";
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className={`absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl transform ${translate}`}
                  style={{
                    zIndex,
                    scale,
                  }}
                >
                  <Image
                    src={src}
                    alt={`Car ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
