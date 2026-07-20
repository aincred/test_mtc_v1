"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home, Users, Settings, X, LogOut, User, FileText, Scale, Pill,
  FileCheck, ClipboardList, Wrench, BedDouble, BookOpen, Mail, HeartPulse, Banknote
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SideNavProps {
  setSidebarOpen: (open: boolean) => void;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  newTab?: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/mtc-user/dashboard/home", icon: Home },
  { name: "Child Registration", href: "/mtc-user/dashboard/child-registration", icon: FileText },
  { name: "Daily Weight Entry", href: "/mtc-user/dashboard/daily-weight", icon: Scale },
  { name: "Micronutrients & Antibiotics", href: "/mtc-user/dashboard/micronutrients", icon: Pill },
  { name: "Child Discharge", href: "/mtc-user/dashboard/discharge", icon: FileCheck },
  { name: "Follow-Up", href: "/mtc-user/dashboard/follow-up", icon: ClipboardList },
  { name: "Equipment Section", href: "/mtc-user/dashboard/equipment", icon: Wrench },
  { name: "Staff Details", href: "/mtc-user/dashboard/staff", icon: Users },
  { name: "Bed Occupancy", href: "/mtc-user/dashboard/bed-occupancy", icon: BedDouble },
  { name: "Child Records", href: "/mtc-user/dashboard/child-records", icon: BookOpen },
  { name: "MPR / Follow-Up Report", href: "/mtc-user/dashboard/mrp", icon: Mail },
  { name: "Maternal Nutrition", href: "/mtc-user/dashboard/maternal-nutrition", icon: HeartPulse },
  { name: "Samar", href: "/mtc-user/dashboard/Samar/referred-children", icon: HeartPulse },
  { name: "Compensation", href: "/mtc-user/dashboard/compensation", icon: Banknote },
  { name: "Settings", href: "/mtc-user/dashboard/settings", icon: Settings },
];

export default function SideNav({ setSidebarOpen }: SideNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mtcDisplayName, setMtcDisplayName] = useState("Loading...");

  useEffect(() => {
    const sessionData = sessionStorage.getItem("mtc_user");
    if (sessionData) {
      try {
        const user = JSON.parse(sessionData) as { mtcName?: string; loginId?: string };
        setMtcDisplayName(`MTC ${user.mtcName || user.loginId || ""}`);
      } catch (error) {
        console.error("Failed to parse user session", error);
        setMtcDisplayName("Unknown MTC");
      }
    } else {
      setMtcDisplayName("Guest User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("userSession");
    sessionStorage.removeItem("mtc_user");
    router.push("/");
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <HeartPulse className="h-6 w-6 text-indigo-600" />
          <h1 className="text-lg font-semibold text-gray-900">MTC Portal</h1>
        </div>
        <button
          type="button"
          className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              target={item.newTab ? "_blank" : undefined}
              rel={item.newTab ? "noopener noreferrer" : undefined}
              className={cn(
                isActive
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                "group flex items-center px-3 py-2 rounded-md text-sm transition-colors"
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon
                className={cn(
                  isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600",
                  "mr-3 h-5 w-5 shrink-0 transition-colors"
                )}
              />
              {item.name}
            </Link>
          );
        })}
        
        {/* Divider & Logout */}
        <div className="pt-4 mt-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full group flex items-center px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 shrink-0 text-gray-400 group-hover:text-red-600 transition-colors" />
            Logout
          </button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="shrink-0 p-4 border-t border-gray-200">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => router.push("/mtc-user/dashboard/settings")}
        >
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 group-hover:bg-indigo-50 transition-colors">
            <User className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{mtcDisplayName}</p>
            <p className="text-xs text-gray-500 group-hover:text-indigo-600 transition-colors">
              View Profile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}