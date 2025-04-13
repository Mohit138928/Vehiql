"use client";

import { Calendar, Car, Cog, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

// Navigation items
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Cars",
    icon: Car,
    href: "/admin/cars",
  },
  {
    label: "Test Drives",
    icon: Calendar,
    href: "/admin/test-drives",
  },
  {
    label: "Settings",
    icon: Cog,
    href: "/admin/settings",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden md:flex h-full flex-col overflow-y-auto bg-white shadow-sm border-r">
        {routes.map((route) => (
          <Link
            key={route.label}
            href={route.href}
            className={cn(
              "flex items-center h-12 gap-x-2 text-slate-500 font-medium text-sm pl-6 transition-all hover:text-slate-600 hover:bg-slate-100/50",
              pathname === route.href &&
                "text-blue-700 bg-blue-100/50 hover:bg-blue-100 hover:text-blue-700 font-semibold"
            )}
          >
            <route.icon className="h-5 w-5" />
            <span>{route.label}</span>
          </Link>
        ))}
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t flex justify-around items-center h-16">
      {routes.map((route) => (
          <Link
            key={route.label}
            href={route.href}
            className={cn(
              "flex flex-col items-center justify-center text-slate-500 font-medium text-xs transition-all py-1 flex-1",
              pathname === route.href &&
                "text-blue-700 bg-blue-100/50 hover:bg-blue-100 hover:text-blue-700 font-semibold"
            )}
          >
            <route.icon className="h-5 w-5" />
            <span>{route.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
