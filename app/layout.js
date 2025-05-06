import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import ConditionalFooter from "@/components/conditionalfooter";
import ChatBot from "@/components/chat/ChatBot";

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: "AutoVolt",
  description: "Find your dream car with AI",
  icons: {
    icon: [
      // You can specify multiple sizes
      // { url: '/favicon.ico', sizes: 'any' },
      // Or use PNG format
      { url: '/favicon.png', sizes: '32x32' },
      // { url: '/apple-icon.png', sizes: '180x180' },
    ],
    // For Apple devices
    // apple: [
    //   { url: '/apple-icon.png', sizes: '180x180' }
    // ],
    // For other devices
    // other: [
    //   {
    //     rel: 'mask-icon',
    //     url: '/safari-pinned-tab.svg',
    //     color: '#1d4ed8' // Your brand color
    //   }
    // ]
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
      <Header/>
      <main className="min-h-screen" >{children}</main>
      <ConditionalFooter />
      <ChatBot />
      <Toaster richColors />
        {/* <footer className="bg-blue-50 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>Made with Heart By Mohit Maurya</p>
          </div>
        </footer> */}
      </body>
    </html>
    </ClerkProvider>
  );
}
