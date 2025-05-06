import React from 'react';
import { Shield, Lock, User, Car, Image, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Privacy Policy | AutoVolt",
  description: "Privacy Policy and data handling practices at AutoVolt",
};

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl mb-4 gradient-title">Privacy Policy</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          At AutoVolt, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Introduction */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="h-6 w-6 text-blue-600 mt-1" />
              <h2 className="text-2xl font-bold">Introduction</h2>
            </div>
            <p className="text-gray-600">
              This Privacy Policy explains how AutoVolt ("we", "our", or "us") collects, uses, and protects your personal information when you use our car dealership platform. By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <User className="h-6 w-6 text-blue-600 mt-1" />
              <h2 className="text-2xl font-bold">Information We Collect</h2>
            </div>
            <div className="space-y-4">
              <div className="ml-9">
                <h3 className="font-semibold mb-2">Personal Information:</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Name, email address, and phone number</li>
                  <li>Profile pictures and account preferences</li>
                  <li>Authentication data through Clerk Identity service</li>
                </ul>
              </div>
              <div className="ml-9">
                <h3 className="font-semibold mb-2">Vehicle Interest Data:</h3>
                <ul className="list-disc ml-6 text-gray-600 space-y-2">
                  <li>Saved cars and search preferences</li>
                  <li>Test drive booking information</li>
                  <li>Vehicle images uploaded for AI-powered search</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Your Information */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Lock className="h-6 w-6 text-blue-600 mt-1" />
              <h2 className="text-2xl font-bold">How We Use Your Information</h2>
            </div>
            <ul className="ml-9 space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <Car className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>To provide personalized car recommendations and search results</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>To manage and confirm your test drive appointments</span>
              </li>
              <li className="flex items-start gap-2">
                <Image className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>To process AI-powered image searches using Google's Gemini AI</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <span>To provide location-based services and dealership information</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Storage and Security */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Lock className="h-6 w-6 text-blue-600 mt-1" />
              <h2 className="text-2xl font-bold">Data Storage and Security</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We use industry-standard security measures to protect your data:
            </p>
            <ul className="ml-9 list-disc text-gray-600 space-y-2">
              <li>Secure data storage using PostgreSQL on Supabase</li>
              <li>Image storage with encrypted Supabase Storage</li>
              <li>Authentication handled by Clerk's secure identity platform</li>
              <li>Regular security audits and updates</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="h-6 w-6 text-blue-600 mt-1" />
              <h2 className="text-2xl font-bold">Contact Us</h2>
            </div>
            <p className="text-gray-600 mb-4">
              If you have any questions about our Privacy Policy, please contact us:
            </p>
            <ul className="ml-9 text-gray-600 space-y-2">
              <li>Email: privacy@autovolt.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 69 Car Street, Autoville, CA 69420</li>
            </ul>
          </CardContent>
        </Card>

        {/* Last Updated */}
        {/* <p className="text-sm text-gray-500 text-center">
          Last updated: May 6, 2025
        </p> */}
      </div>
    </div>
  );
};

export default PrivacyPage;