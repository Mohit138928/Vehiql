import React from 'react';
import { 
  ScrollText as ScrollTextIcon, 
  UserCheck as UserCheckIcon, 
  Car as CarIcon, 
  Shield as ShieldIcon, 
  AlertCircle as AlertIcon,
  Scale as ScaleIcon,
  Clock as ClockIcon 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Terms of Service | AutoVolt",
  description: "Terms and conditions for using AutoVolt's car marketplace platform",
};

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl mb-4 gradient-title">Terms of Service</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Please read these terms carefully before using AutoVolt&apos;s car marketplace platform.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Agreement */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <ScrollTextIcon className="h-6 w-6 text-blue-600 mt-1" />
              <h2 className="text-2xl font-bold">Agreement to Terms</h2>
            </div>
            <p className="text-gray-600">
              By accessing or using AutoVolt&apos;s platform, you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, you may not access our services.
            </p>
          </CardContent>
        </Card>

        {/* User Accounts */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <UserCheckIcon className="h-6 w-6 text-blue-600 mt-1" />
              <h2 className="text-2xl font-bold">User Accounts</h2>
            </div>
            <ul className="ml-9 space-y-3 text-gray-600">
              <li>You must be at least 18 years old to use our services</li>
              <li>Account registration requires valid identification for test drive bookings</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>Multiple accounts for the same user are not permitted</li>
            </ul>
          </CardContent>
        </Card>

        {/* Platform Usage */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <CarIcon className="h-6 w-6 text-blue-600 mt-1" />
              <h2 className="text-2xl font-bold">Platform Usage</h2>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Car Listings and Information:</h3>
              <ul className="ml-9 space-y-3 text-gray-600">
                <li>All vehicle information must be accurate and up-to-date</li>
                <li>Images uploaded must be of actual vehicles listed</li>
                <li>Test drive bookings are subject to availability</li>
                <li>AI-powered search features are provided as-is</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Test Drive Rules */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <ClockIcon className="h-6 w-6 text-blue-600 mt-1" />
              <h2 className="text-2xl font-bold">Test Drive Rules</h2>
            </div>
            <ul className="ml-9 space-y-3 text-gray-600">
              <li>Valid driver&apos;s license required for test drives</li>
              <li>24-hour notice required for cancellations</li>
              <li>Users must follow dealership safety guidelines</li>
              <li>Insurance coverage verification may be required</li>
            </ul>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <ShieldIcon className="h-6 w-6 text-blue-600 mt-1" />
              <h2 className="text-2xl font-bold">Intellectual Property</h2>
            </div>
            <p className="text-gray-600 mb-4">
              All content on AutoVolt, including but not limited to text, images, logos, and software, 
              is the property of AutoVolt and protected by applicable intellectual property laws.
            </p>
          </CardContent>
        </Card>

        {/* Limitations */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertIcon className="h-6 w-6 text-blue-600 mt-1" />
              <h2 className="text-2xl font-bold">Limitations of Liability</h2>
            </div>
            <p className="text-gray-600 mb-4">
              AutoVolt shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use or inability to use our services.
            </p>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <ScaleIcon className="h-6 w-6 text-blue-600 mt-1" />
              <h2 className="text-2xl font-bold">Governing Law</h2>
            </div>
            <p className="text-gray-600">
              These terms shall be governed by and construed in accordance with the laws of California, 
              United States, without regard to its conflict of law provisions.
            </p>
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

export default TermsPage