"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Settings,
  X,
  LogOut,
  FileText,
  ChevronDown,
  ChevronRight,
  FileSpreadsheet,
  LayoutDashboard,
  Bed,
  ClipboardList,
  MapPin,
  Building2,
  Download,
  PieChart,
  Activity,
  RefreshCw,
  FlaskConical,
  Pill,
  CalendarDays,
  TrendingUp,
  UserPlus,
  Contact,
  MessageSquare,
  MessageCircle,
  Send,
  Landmark,
  Map
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SideNavProps {
  setSidebarOpen: (open: boolean) => void;
}

interface SubNavigationItem {
  name: string;
  href: string;
}

interface NavigationItem {
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubNavigationItem[];
}

const smsNavigation: NavigationItem[] = [
  { name: "Custom SMS", href: "/state-user/dashboard/sms/custom", icon: MessageCircle },
  { name: "State SMS", href: "/state-user/dashboard/sms/state", icon: Landmark },
  { name: "District SMS", href: "/state-user/dashboard/sms/district", icon: Map },
  { name: "MTC SMS", href: "/state-user/dashboard/sms/mtc", icon: Send },
];

const reportsNavigation: NavigationItem[] = [
  { name: "Annual District Factsheet", href: "/state-user/dashboard/reports/annual-factsheet", icon: FileSpreadsheet },
  { 
    name: "Admission Dashboards", 
    icon: LayoutDashboard,
    subItems: [
      { name: "District Admission Dashboard", href: "/state-user/dashboard/reports/admission-district" },
      { name: "MTC Admission Dashboard", href: "/state-user/dashboard/reports/admission-mtc" },
    ]
  },
  { 
    name: "Bed Occupancy", 
    icon: Bed,
    subItems: [
      { name: "Bed Occupancy by District Report", href: "/state-user/dashboard/reports/bed-occupancy-district" },
      { name: "Bed Occupancy by MTC Report", href: "/state-user/dashboard/reports/bed-occupancy-mtc" },
    ]
  },
  { name: "Child Case Sheet", href: "/state-user/dashboard/reports/child-case-sheet", icon: ClipboardList },
  { name: "Children Discharged by District", href: "/state-user/dashboard/reports/discharged-district", icon: MapPin },
  { name: "Children Discharged by MTC", href: "/state-user/dashboard/reports/discharged-mtc", icon: Building2 },
  { name: "Download Children Records", href: "/state-user/dashboard/reports/download-records", icon: Download },
  { 
    name: "Discharge Dashboards", 
    icon: PieChart,
    subItems: [
      { name: "Discharge Dashboard by District", href: "/state-user/dashboard/reports/discharge-dashboard-district" },
      { name: "Discharge Dashboard by MTC", href: "/state-user/dashboard/reports/discharge-dashboard-mtc" },
    ]
  },
  { name: "Equipment Status Report", href: "/state-user/dashboard/reports/equipment-status", icon: Activity },
  { name: "FollowUp Status Report", href: "/state-user/dashboard/reports/followup-status", icon: RefreshCw },
  { name: "Laboratory Test Details", href: "/state-user/dashboard/reports/laboratory-tests", icon: FlaskConical },
  { name: "Micronutrients & Antibiotics", href: "/state-user/dashboard/reports/micronutrients-antibiotics", icon: Pill },
  { name: "MTC Monthly Report", href: "/state-user/dashboard/reports/mtc-monthly", icon: CalendarDays },
  { 
    name: "Performance Ranking by Districts and MTCs", 
    icon: TrendingUp,
    subItems: [
      { name: "Performance Ranking by District Report", href: "/state-user/dashboard/reports/performance-ranking-district" },
      { name: "Performance Ranking by MTC Report", href: "/state-user/dashboard/reports/performance-ranking-mtc" },
    ]
  },
  { name: "FollowUp Report", href: "/state-user/dashboard/reports/followup", icon: RefreshCw },
  { 
    name: "Sahiya Referral/ Followed-up Report", 
    icon: UserPlus,
    subItems: [
      { name: "Sahiya Referral Report", href: "/state-user/dashboard/reports/sahiya-referral-report" },
      { name: "Follow-up Report", href: "/state-user/dashboard/reports/follow-up-report" },
    ]
  },
  { name: "Staff Report", href: "/state-user/dashboard/reports/staff", icon: Contact },
];

const mainNavigation = [
  { name: "Dashboard", href: "/state-user/dashboard/home", icon: Home },
  { name: "Settings", href: "/state-user/dashboard/settings", icon: Settings },
];

export default function SideNav({ setSidebarOpen }: SideNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isSmsOpen, setIsSmsOpen] = useState(false);
  
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isBedOccupancyOpen, setIsBedOccupancyOpen] = useState(false);
  const [isDischargeOpen, setIsDischargeOpen] = useState(false);
  const [isPerformanceRankingOpen, setIsPerformanceRankingOpen] = useState(false);
  const [isSahiyaReferralOpen, setIsSahiyaReferralOpen] = useState(false);

  const DashboardIcon = mainNavigation[0].icon;
  const SettingsIcon = mainNavigation[1].icon;

  useEffect(() => {
    if (pathname.includes("/reports")) {
      setIsReportsOpen(true);
      if (pathname.includes("/reports/admission-")) setIsAdmissionOpen(true);
      if (pathname.includes("/reports/bed-occupancy-")) setIsBedOccupancyOpen(true);
      if (pathname.includes("/reports/discharge-dashboard-")) setIsDischargeOpen(true);
      if (pathname.includes("/reports/performance-ranking-")) setIsPerformanceRankingOpen(true);
      if (pathname.includes("/reports/sahiya-referral-") || pathname.includes("/reports/follow-up-report")) {
        setIsSahiyaReferralOpen(true);
      }
    }
    if (pathname.includes("/sms")) {
      setIsSmsOpen(true);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("userSession");
    router.push("/");
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 shrink-0">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-[#0B918C]">MTC Dashboard</h1>
        </div>
        <button
          type="button"
          className="lg:hidden -mr-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        <Link
          href={mainNavigation[0].href}
          className={cn(
            pathname === mainNavigation[0].href ? "bg-teal-50 border-[#0B918C] text-[#0B918C]" : "border-transparent text-gray-600 hover:bg-gray-50",
            "group flex items-center px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150"
          )}
          onClick={() => setSidebarOpen(false)}
        >
          <DashboardIcon className={cn(pathname === mainNavigation[0].href ? "text-[#0B918C]" : "text-gray-400", "mr-3 h-5 w-5")} />
          {mainNavigation[0].name}
        </Link>

        {/* SMS Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setIsSmsOpen(!isSmsOpen)}
            className={cn(
              pathname.includes("/sms") ? "bg-teal-50 border-[#0B918C] text-[#0B918C]" : "border-transparent text-gray-600 hover:bg-gray-50",
              "group w-full flex items-center justify-between px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150"
            )}
          >
            <div className="flex items-center">
              <MessageSquare className={cn(pathname.includes("/sms") ? "text-[#0B918C]" : "text-gray-400", "mr-3 h-5 w-5")} />
              SMS
            </div>
            {isSmsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          {isSmsOpen && (
            <div className="mt-1 space-y-1 ml-4 border-l border-gray-200">
              {smsNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href || "#"}
                  className={cn(
                    pathname === item.href ? "bg-teal-50 text-[#0B918C] font-semibold border-[#0B918C]" : "text-gray-600 hover:bg-gray-50 border-transparent",
                    "group flex items-center pl-4 pr-3 py-2 border-l-4 text-sm font-medium rounded-r-md transition-colors duration-150"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={cn(pathname === item.href ? "text-[#0B918C]" : "text-gray-400", "mr-3 h-4 w-4 shrink-0")} />
                  <span className="truncate">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Reports Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setIsReportsOpen(!isReportsOpen)}
            className={cn(
              pathname.includes("/reports") ? "bg-teal-50 border-[#0B918C] text-[#0B918C]" : "border-transparent text-gray-600 hover:bg-gray-50",
              "group w-full flex items-center justify-between px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150"
            )}
          >
            <div className="flex items-center">
              <FileText className={cn(pathname.includes("/reports") ? "text-[#0B918C]" : "text-gray-400", "mr-3 h-5 w-5")} />
              Reports
            </div>
            {isReportsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>

          {isReportsOpen && (
            <div className="mt-1 space-y-1 ml-4 border-l border-gray-200">
              {reportsNavigation.map((item) => {
                if (item.subItems) {
                  const ReportIcon = item.icon;
                  let isOpen = false;
                  let toggleOpen = () => {};
                  let isSubActive = false;

                  if (item.name === "Admission Dashboards") {
                    isOpen = isAdmissionOpen;
                    toggleOpen = () => setIsAdmissionOpen(!isAdmissionOpen);
                    isSubActive = pathname.includes("/reports/admission-");
                  } else if (item.name === "Bed Occupancy") {
                    isOpen = isBedOccupancyOpen;
                    toggleOpen = () => setIsBedOccupancyOpen(!isBedOccupancyOpen);
                    isSubActive = pathname.includes("/reports/bed-occupancy-");
                  } else if (item.name === "Discharge Dashboards") {
                    isOpen = isDischargeOpen;
                    toggleOpen = () => setIsDischargeOpen(!isDischargeOpen);
                    isSubActive = pathname.includes("/reports/discharge-dashboard-");
                  } else if (item.name === "Performance Ranking by Districts and MTCs") {
                    isOpen = isPerformanceRankingOpen;
                    toggleOpen = () => setIsPerformanceRankingOpen(!isPerformanceRankingOpen);
                    isSubActive = pathname.includes("/reports/performance-ranking-");
                  } else if (item.name === "Sahiya Referral/ Followed-up Report") {
                    isOpen = isSahiyaReferralOpen;
                    toggleOpen = () => setIsSahiyaReferralOpen(!isSahiyaReferralOpen);
                    isSubActive = pathname.includes("/reports/sahiya-referral-") || pathname.includes("/reports/follow-up-report");
                  }

                  return (
                    <div key={item.name} className="flex flex-col">
                      <button
                        onClick={toggleOpen}
                        className={cn(
                          isSubActive ? "bg-teal-50 text-[#0B918C] font-semibold border-[#0B918C]" : "text-gray-600 hover:bg-gray-50 border-transparent",
                          "group w-full flex items-center justify-between pl-4 pr-3 py-2 border-l-4 text-xs md:text-sm font-medium rounded-r-md transition-colors duration-150"
                        )}
                      >
                        <div className="flex items-center truncate">
                          <ReportIcon className={cn(isSubActive ? "text-[#0B918C]" : "text-gray-400", "mr-3 h-4 w-4 shrink-0")} />
                          <span className="truncate">{item.name}</span>
                        </div>
                        {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                      </button>
                      {isOpen && (
                        <div className="mt-1 space-y-1 ml-6 border-l border-gray-100">
                          {item.subItems.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className={cn(
                                pathname === sub.href ? "text-[#0B918C] font-semibold border-[#0B918C]" : "text-gray-500 hover:text-gray-800 border-transparent",
                                "block pl-4 pr-3 py-1.5 border-l-2 text-xs md:text-sm transition-colors duration-150"
                              )}
                              onClick={() => setSidebarOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = pathname === item.href;
                const ReportIcon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href || "#"}
                    className={cn(
                      isActive ? "bg-teal-50 text-[#0B918C] font-semibold border-[#0B918C]" : "text-gray-600 hover:bg-gray-50 border-transparent",
                      "group flex items-center pl-4 pr-3 py-2 border-l-4 text-xs md:text-sm font-medium rounded-r-md transition-colors duration-150"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <ReportIcon className={cn(isActive ? "text-[#0B918C]" : "text-gray-400", "mr-3 h-4 w-4 shrink-0")} />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <Link
          href={mainNavigation[1].href}
          className={cn(
            pathname === mainNavigation[1].href ? "bg-teal-50 border-[#0B918C] text-[#0B918C]" : "border-transparent text-gray-600 hover:bg-gray-50",
            "group flex items-center px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150"
          )}
          onClick={() => setSidebarOpen(false)}
        >
          <SettingsIcon className={cn(pathname === mainNavigation[1].href ? "text-[#0B918C]" : "text-gray-400", "mr-3 h-5 w-5")} />
          {mainNavigation[1].name}
        </Link>
        
        <button
          onClick={handleLogout}
          className="group flex items-center px-3 py-2 mt-8 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150 border-transparent text-red-600 hover:bg-red-50 w-full text-left"
        >
          <LogOut className="mr-3 h-5 w-5 text-red-500" />
          Logout
        </button>
      </nav>
    </div>
  );
}