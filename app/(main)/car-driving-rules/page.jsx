"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function CarDrivingRulesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        >
          <source src="/driving.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          >
            Drive Safe, Drive Smart
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-lg md:text-xl text-white/90"
          >
            Learn the essential driving rules and safety precautions.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto py-16 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold mb-6 text-blue-800 text-center"
        >
          Car Driving Rules & Safety Precautions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-10 text-lg text-gray-700 text-center"
        >
          Following the rules and practicing safety precautions protects you,
          your passengers, and others on the road.
        </motion.p>

        {/* Sections */}
        {[
          {
            title: "General Driving Rules",
            items: [
              "Always carry your valid driver’s license, registration, and insurance.",
              "Obey all traffic signals, signs, and road markings.",
              "Drive on the correct side of the road (right/left as per your country).",
              "Always wear your seatbelt and ensure all passengers do too.",
              "Never use a mobile phone or get distracted while driving.",
              "Follow speed limits and adjust speed for weather/traffic conditions.",
              "Do not drive under the influence of alcohol or drugs.",
              "Yield to pedestrians at crosswalks and never block them.",
              "Use indicators/signals when turning or changing lanes.",
              "Maintain a safe distance from the vehicle ahead (the 3-second rule).",
              "Stop completely at stop signs and red lights.",
              "Give way to emergency vehicles (ambulance, fire truck, police).",
            ],
          },
          {
            title: "Safety Precautions",
            items: [
              "Check mirrors and blind spots before moving or changing lanes.",
              "Adjust your seat and mirrors before starting the car.",
              "Keep both hands on the steering wheel (usually at 9 and 3 o’clock).",
              "Do not drive when tired or drowsy.",
              "Keep your car well-maintained (brakes, tires, lights, fluids).",
              "Use headlights in low visibility (night, rain, fog).",
              "Be extra cautious in school zones and residential areas.",
              "Never leave children or pets unattended in a parked car.",
              "Always lock your car when leaving it.",
            ],
          },
          {
            title: "Emergency Tips",
            items: [
              "If your car breaks down, move to a safe spot and turn on hazard lights.",
              "Keep an emergency kit (first aid, flashlight, water, basic tools) in your car.",
              "Know how to change a tire and check your spare.",
              "Call for roadside assistance if needed.",
            ],
          },
        ].map((section, idx) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-700">
              {section.title}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-800">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.section>
        ))}

        {/* Driving Tutorial Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">
            Beginner Level Driving Tutorial
          </h3>
          <Image
            src="/car-driving-guide.jpeg"
            alt="Driving Tutorial"
            width={800}
            height={400}
            className="rounded-xl mb-6"
          />
          <ol className="list-decimal pl-6 space-y-4 text-gray-800">
            <li>
              <strong>Getting Started:</strong>
              <ul className="list-disc pl-6">
                <li>
                  Adjust seat, mirrors, and steering wheel for visibility.
                </li>
                <li>Fasten seatbelt; ensure all passengers do the same.</li>
                <li>
                  Familiarize with controls (pedals, gear, indicators, wipers,
                  lights).
                </li>
              </ul>
            </li>
            <li>
              <strong>Starting the Car:</strong>
              <ul className="list-disc pl-6">
                <li>Press brake pedal and start the engine.</li>
                <li>
                  For manual: press clutch and shift to first gear. For
                  automatic: shift to &apos;D&apos;.
                </li>
                <li>Release the parking brake.</li>
              </ul>
            </li>
            <li>
              <strong>Moving Off:</strong>
              <ul className="list-disc pl-6">
                <li>Check mirrors and blind spots.</li>
                <li>Indicate if pulling out.</li>
                <li>Release brake gently and press the accelerator to move.</li>
              </ul>
            </li>
            <li>
              <strong>Basic Maneuvers:</strong>
              <ul className="list-disc pl-6">
                <li>Smooth steering, acceleration, and braking.</li>
                <li>Turn left, right, U-turn safely.</li>
                <li>Practice parking (parallel, angle, perpendicular).</li>
                <li>Reverse slowly with checks.</li>
              </ul>
            </li>
            <li>
              <strong>Stopping and Parking:</strong>
              <ul className="list-disc pl-6">
                <li>Check mirrors and signal before stopping.</li>
                <li>Brake gently to stop.</li>
                <li>
                  Shift to ‘P’ (auto) or neutral (manual), apply handbrake,
                  switch off.
                </li>
              </ul>
            </li>
            <li>
              <strong>Defensive Driving:</strong>
              <ul className="list-disc pl-6">
                <li>Anticipate others&apos; actions.</li>
                <li>Keep distance, avoid aggressive driving.</li>
                <li>Stay calm and patient.</li>
              </ul>
            </li>
          </ol>
        </motion.section>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-8 text-center"
        >
          <Link
            href="/"
            className="text-blue-600 hover:underline font-semibold"
          >
            &larr; Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
