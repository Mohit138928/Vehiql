import { getFeaturedCars } from "@/actions/home";
import CarCard from "@/components/car-card";
import HomeSearch from "@/components/home-search";
import { DotPattern } from "@/components/magicui/dot-pattern";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { bodyTypes, carMakes, faqItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SignedOut } from "@clerk/nextjs";
import { Calendar, Car, ChevronRight, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FadeInWhenVisible from "@/hooks/FadeInWhenVisible";
import ThreeDCar from "@/components/ThreeDCar";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";

export default async function Home() {
  const featuredCars = await getFeaturedCars();

  return (
    <div className="pt-10 flex flex-col">
      {/*Hero */}
      <FadeInWhenVisible>
        <HeroSection />
      </FadeInWhenVisible>

      {/* 3D Interactive Car Showcase Section */}
      <FadeInWhenVisible>
        <section className="py-16">
          <div className="container mx-auto px-4 flex flex-col items-center gap-10">
            <div className="w-full md:w-2/3 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">
                Explore Our Cars in 3D
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Interact with our 3D car models! Zoom, rotate, and view every
                detail. Experience the future of car browsing—see your dream car
                from every angle, right from your screen.
              </p>
              {/* <ul className="list-disc pl-5 text-gray-600 mb-4 text-left inline-block">
                <li>Switch between auto-spin and manual control</li>
                <li>Zoom in to inspect features</li>
                <li>Enjoy a realistic, immersive experience</li>
              </ul> */}
            </div>
            <div className="w-full md:w-2/3 flex justify-center">
              <ThreeDCar modelPath="/models/sportscar/scene.gltf" />
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* Featured Cars Section */}
      <FadeInWhenVisible>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Featured Cars</h2>
              <Button variant="ghost" className="flex items-center" asChild>
                <Link href="/cars">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* Browse by Make Section */}
      <FadeInWhenVisible>
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Browse by Make</h2>
              <Button variant="ghost" className="flex items-center" asChild>
                <Link href="/cars">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {carMakes.map((make) => (
                <Link
                  key={make.name}
                  href={`/cars?make=${make.name}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-2xl p-6 hover:bg-blue-50 transition-colors">
                    <div className="h-20 relative mb-4">
                      <Image
                        src={
                          make.imageUrl ||
                          `/make/${make.name.toLowerCase()}.webp`
                        }
                        alt={make.name}
                        fill
                        className="object-contain transition-transform group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-center font-medium">{make.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* Why Choose Us Section */}
      <FadeInWhenVisible>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-12">
              Why Choose Our Platform
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
                <p className="text-gray-600">
                  Thousands of Verified vehicles from trusted dealerships and
                  private sellers.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Easy Test Drive</h3>
                <p className="text-gray-600">
                  Book a Test Drive with just a few clicks. Choose your
                  preferred time.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Process</h3>
                <p className="text-gray-600">
                  Verified listings and secure booking process for peace of
                  minds.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* Browse by Body Type Section */}
      <FadeInWhenVisible>
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Browse by Body Type</h2>
              <Button variant="ghost" className="flex items-center" asChild>
                <Link href="/cars">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bodyTypes.map((type) => (
                <Link
                  key={type.name}
                  href={`/cars?bodyType=${type.name}`}
                  className="relative group cursor-pointer"
                >
                  <div className="overflow-hidden rounded-lg flex justify-end h-28 mb-4 relative">
                    <Image
                      src={
                        type.imageUrl || `/body/${type.name.toLowerCase()}.webp`
                      }
                      alt={type.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end">
                    <h3 className="text-white text-xl font-bold pl-4 pb-2 ">
                      {type.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* FAQ Section with Accordion */}
      <FadeInWhenVisible>
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="hover:no-underline font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* CTA Section */}
      <FadeInWhenVisible>
        <section className="py-16 dotted-background text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Dream Car?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found their perfect
              vehicle through our platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/cars">View All Cars</Link>
              </Button>
              <SignedOut>
                <Button size="lg" asChild>
                  <Link href="/sign-up">Sign Up Now</Link>
                </Button>
              </SignedOut>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>
    </div>
  );
}
