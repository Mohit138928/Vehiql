"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import HomeSearch from "@/components/home-search";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50 to-white flex items-center">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <DotPattern className="absolute inset-0 -z-10 opacity-50" />

      <div className="container mx-auto px-4 md:px-10 pt-20 pb-20 flex flex-col md:flex-row gap-12 md:gap-20 items-center md:items-stretch relative z-10">
        {/* Left Content - vertically centered */}
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

          {/* Conditional rendering based on sign-in status */}
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
                  <Link href="/sign-in">Sign Up Free <ArrowRight /></Link>
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

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full md:w-1/2 flex justify-center md:justify-end items-center"
        >
          <Image
            src="/New_car/car1.jpeg"
            alt="Hero Car"
            width={600}
            height={400}
            className="rounded-2xl shadow-2xl object-cover w-full max-w-lg h-auto"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
