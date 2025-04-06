import CarCard from "@/components/car-card";
import HomeSearch from "@/components/home-search";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Button } from "@/components/ui/button";
import { featuredCars } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="pt-20 flex flex-col">
      {/*Hero */}

      <section className="relative py-16 md:py-28 bg-[#16223c]">
        
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <h1 className="text-5xl md:text-8xl mb-4 gradient-title">
              Find Your Dream Car with Vehiql AI
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Advanced AI Car Search and test Drive from thousands of vehicles.
            </p>
          </div>

          {/* Search */}
          <HomeSearch />
        </div>
        <DotPattern
          // glow={true}
          className={cn(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]", "text-white"
          )}
        />
      </section>

      <section className="py-12">
        <div>
          <div>
            <h2>
              Featured Cars
            </h2>
            <Button>View All <ChevronRight className="ml-1 h-4 w-4"/></Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car}/>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
