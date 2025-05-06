import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Car as CarIcon, 
  Shield as ShieldIcon, 
  Search as SearchIcon, 
  Calendar as CalendarIcon,
  Users as UsersIcon,
  Clock as ClockIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon
} from "lucide-react";

export const metadata = {
  title: "About Us | AutoVolt",
  description: "Learn about AutoVolt's mission and commitment to revolutionizing car buying",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 dotted-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-title">
              Revolutionizing Car Shopping with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              AutoVolt combines cutting-edge AI technology with a seamless car buying experience to help you find your perfect vehicle.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At AutoVolt, we're on a mission to transform the car buying experience. We believe finding your dream car should be exciting, not exhausting. Our AI-powered platform simplifies the journey from search to test drive.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="text-blue-600 h-6 w-6 mt-1" />
                  <div>
                    <h3 className="font-semibold">AI-Powered Search</h3>
                    <p className="text-gray-600">Advanced image recognition to find similar cars</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="text-blue-600 h-6 w-6 mt-1" />
                  <div>
                    <h3 className="font-semibold">Seamless Booking</h3>
                    <p className="text-gray-600">Easy test drive scheduling with real-time availability</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="text-blue-600 h-6 w-6 mt-1" />
                  <div>
                    <h3 className="font-semibold">Verified Listings</h3>
                    <p className="text-gray-600">All cars thoroughly verified for your peace of mind</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/about-mission.png"
                alt="AutoVolt Mission"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Cars Listed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AutoVolt</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Smart Search</h3>
              <p className="text-gray-600">
                Our AI technology helps you find cars by simply uploading a photo or describing your dream car.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Easy Scheduling</h3>
              <p className="text-gray-600">
                Book test drives instantly with our real-time scheduling system.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShieldIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Secure Platform</h3>
              <p className="text-gray-600">
                Every listing is verified and transactions are secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 dotted-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-title">
            Ready to Find Your Dream Car?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect vehicle through AutoVolt.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/cars">Browse Cars</Link>
            </Button>
            {/* <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button> */}
          </div>
        </div>
      </section>
    </div>
  );
}