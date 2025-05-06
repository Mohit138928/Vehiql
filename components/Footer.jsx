import Link from "next/link";
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon, 
  Youtube as YoutubeIcon, 
  Mail as MailIcon, 
  Phone as PhoneIcon, 
  MapPin as MapPinIcon,
  Shield as ShieldIcon,
  Clock as ClockIcon,
  Car as CarIcon 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">AutoVolt</h3>
            <p className="text-sm">
              Your trusted destination for finding the perfect car. Advanced AI-powered 
              car search and seamless test drive booking platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="hover:text-white transition">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="hover:text-white transition">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="hover:text-white transition">
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/cars" className="hover:text-white transition">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link href="/saved-cars" className="hover:text-white transition">
                  Saved Cars
                </Link>
              </li>
              <li>
                <Link href="/test-drive" className="hover:text-white transition">
                  Book Test Drive
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Car Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Car Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/cars?bodyType=SUV" className="hover:text-white transition">
                  SUV
                </Link>
              </li>
              <li>
                <Link href="/cars?bodyType=Sedan" className="hover:text-white transition">
                  Sedan
                </Link>
              </li>
              <li>
                <Link href="/cars?bodyType=Hatchback" className="hover:text-white transition">
                  Hatchback
                </Link>
              </li>
              <li>
                <Link href="/cars?bodyType=Luxury" className="hover:text-white transition">
                  Luxury Cars
                </Link>
              </li>
              <li>
                <Link href="/cars?fuelType=Electric" className="hover:text-white transition">
                  Electric Vehicles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPinIcon size={18} />
                <span>69 Car Street, Autoville, CA 69420</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MailIcon size={18} />
                <span>contact@autovolt.com</span>
              </li>
              <li className="flex items-center gap-2">
                <ClockIcon size={18} />
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Features Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <ShieldIcon className="text-blue-500" size={24} />
            <div>
              <h4 className="font-semibold text-white">Trusted Platform</h4>
              <p className="text-sm">100% Verified Cars</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CarIcon className="text-blue-500" size={24} />
            <div>
              <h4 className="font-semibold text-white">Wide Selection</h4>
              <p className="text-sm">Find Your Perfect Match</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ClockIcon className="text-blue-500" size={24} />
            <div>
              <h4 className="font-semibold text-white">Easy Booking</h4>
              <p className="text-sm">Quick Test Drive Scheduling</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © {currentYear} AutoVolt. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-white transition">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;