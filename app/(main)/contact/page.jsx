import React from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  Clock, 
  MessageSquare, 
  Car,
  Shield 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Contact Us | AutoVolt",
  description: "Get in touch with AutoVolt for any queries about cars or test drives",
};

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl mb-4 gradient-title">Get In Touch</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions about a car or need assistance? We&apos;re here to help you find your perfect vehicle.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input placeholder="How can we help?" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea 
                    placeholder="Tell us more about your inquiry..." 
                    className="min-h-[150px]"
                  />
                </div>

                <Button className="w-full md:w-auto">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">AutoVolt Motors</p>
                    <p className="text-gray-600">Faridabad, Haryana 121007</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:autovolt@gmail.com" className="text-blue-600 hover:underline">
                      autovolt@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+917827136553" className="text-blue-600 hover:underline">
                      +91 7827136553
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Working Hours</p>
                    <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Choose Us */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Why Choose AutoVolt</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Car className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Wide Selection</p>
                    <p className="text-gray-600">Thousands of verified vehicles to choose from</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Trusted Platform</p>
                    <p className="text-gray-600">100% verified cars and secure transactions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Section */}
      {/* <Card>
        <CardContent className="p-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1225.6607505853628!2d77.3115463549927!3d28.405205291254088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cddb4eb004d59%3A0x504c5ea9ba819179!2sNavkar%20Enterprises%20Faridabad%20Textile%20Machinesry%20spare%20parts!5e1!3m2!1sen!2sin!4v1749652481785!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          ></iframe>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default ContactPage;