import HomeSearch from "@/components/home-search";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Home() {
  return (
    <div className="pt-20 flex flex-col bg-[#16223c]">
      {/*Hero */}

      <section className="relative py-16 md:py-28">
        
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
          <HomeSearch/>
        </div>
        <DotPattern
          // glow={true}
          className={cn(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]", "text-white"
          )}
        />
      </section>
    </div>
  );
}
