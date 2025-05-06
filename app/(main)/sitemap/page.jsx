import React from 'react';
import Link from 'next/link';
import { 
  Car as CarIcon, 
  User as UserIcon, 
  Search as SearchIcon,
  Calendar as CalendarIcon,
  BookOpen as BookOpenIcon,
  Shield as ShieldIcon,
  Mail as MailIcon,
  FileText as FileTextIcon 
} from "lucide-react";

export const metadata = {
  title: "Sitemap | AutoVolt",
  description: "Navigate through AutoVolt's website structure",
};

const SitemapPage = () => {
  const sitemapSections = [
    {
      title: "Car Shopping",
      icon: CarIcon,
      links: [
        { label: "Browse All Cars", href: "/cars" },
        { label: "Saved Cars", href: "/saved-cars" },
        { label: "Test Drive Bookings", href: "/test-drive" },
      ]
    },
    {
      title: "Car Categories",
      icon: SearchIcon,
      links: [
        { label: "SUVs", href: "/cars?bodyType=SUV" },
        { label: "Sedans", href: "/cars?bodyType=Sedan" },
        { label: "Hatchbacks", href: "/cars?bodyType=Hatchback" },
        { label: "Luxury Cars", href: "/cars?bodyType=Luxury" },
        { label: "Electric Vehicles", href: "/cars?fuelType=Electric" },
      ]
    },
    {
      title: "User Account",
      icon: UserIcon,
      links: [
        { label: "Sign In", href: "/sign-in" },
        { label: "Sign Up", href: "/sign-up" },
        { label: "Profile Settings", href: "/profile" },
      ]
    },
    {
      title: "Information",
      icon: BookOpenIcon,
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/faq" },
      ]
    },
    {
      title: "Legal",
      icon: ShieldIcon,
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl mb-4 gradient-title">Sitemap</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Navigate through AutoVolt's complete website structure
        </p>
      </div>

      {/* Sitemap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sitemapSections.map((section) => (
          <div key={section.title} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <section.icon className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold">{section.title}</h2>
            </div>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Additional Links */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/contact" 
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition"
          >
            <MailIcon className="h-4 w-4" />
            Contact Support
          </Link>
          <Link 
            href="/cars" 
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition"
          >
            <CarIcon className="h-4 w-4" />
            Browse Cars
          </Link>
          <Link 
            href="/test-drive" 
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition"
          >
            <CalendarIcon className="h-4 w-4" />
            Schedule Test Drive
          </Link>
          <Link 
            href="/terms" 
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition"
          >
            <FileTextIcon className="h-4 w-4" />
            Terms & Privacy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;