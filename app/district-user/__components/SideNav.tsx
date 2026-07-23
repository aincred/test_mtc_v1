// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   Home,
//   Settings,
//   X,
//   LogOut,
//   FileText,
//   ChevronDown,
//   ChevronRight,
//   FileSpreadsheet,
//   LayoutDashboard,
//   Bed,
//   ClipboardList,
//   MapPin,
//   Building2,
//   Download,
//   PieChart,
//   Activity,
//   RefreshCw,
//   FlaskConical,
//   Pill,
//   CalendarDays,
//   TrendingUp,
//   UserPlus,
//   Contact,
//   MessageSquare,
//   MessageCircle,
//   Send,
//   CalendarClock,
//   Landmark,
//   Map
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface SideNavProps {
//   setSidebarOpen: (open: boolean) => void;
// }

// const smsNavigation = [
//   { name: "Custom SMS", href: "/district-user/dashboard/sms/custom", icon: MessageCircle },
//   { name: "State SMS", href: "/district-user/dashboard/sms/state", icon: Landmark },
//   { name: "District SMS", href: "/district-user/dashboard/sms/district", icon: Map },
//   { name: "MTC SMS", href: "/district-user/dashboard/sms/mtc", icon: Send },
//   // { name: "SMS Follow up Due Dates", href: "/district-user/dashboard/sms/follow-up", icon: CalendarClock },
// ];

// const reportsNavigation = [
//   { name: "Annual District Factsheet", href: "/district-user/dashboard/reports/annual-factsheet", icon: FileSpreadsheet },
//   { name: "Admission Dashboards", href: "/district-user/dashboard/reports/admission-dashboards", icon: LayoutDashboard },
//   { name: "Bed Occupancy", href: "/district-user/dashboard/reports/bed-occupancy", icon: Bed },
//   { name: "Child Case Sheet", href: "/district-user/dashboard/reports/child-case-sheet", icon: ClipboardList },
//   { name: "Children Discharged by District", href: "/district-user/dashboard/reports/discharged-district", icon: MapPin },
//   { name: "Children Discharged by MTC", href: "/district-user/dashboard/reports/discharged-mtc", icon: Building2 },
//   { name: "Download Children Records", href: "/district-user/dashboard/reports/download-records", icon: Download },
//   { name: "Discharge Dashboards", href: "/district-user/dashboard/reports/discharge-dashboards", icon: PieChart },
//   { name: "Equipment Status Report", href: "/district-user/dashboard/reports/equipment-status", icon: Activity },
//   { name: "FollowUp Status Report", href: "/district-user/dashboard/reports/followup-status", icon: RefreshCw },
//   { name: "Laboratory Test Details", href: "/district-user/dashboard/reports/laboratory-tests", icon: FlaskConical },
//   { name: "Micronutrients & Antibiotics", href: "/district-user/dashboard/reports/micronutrients-antibiotics", icon: Pill },
//   { name: "MTC Monthly Report", href: "/district-user/dashboard/reports/mtc-monthly", icon: CalendarDays },
//   { name: "Performance Ranking", href: "/district-user/dashboard/reports/performance-ranking", icon: TrendingUp },
//   { name: "FollowUp Report", href: "/district-user/dashboard/reports/followup", icon: RefreshCw },
//   { name: "Sahiya Referral/Followed-up", href: "/district-user/dashboard/reports/sahiya-referral", icon: UserPlus },
//   { name: "Staff Report", href: "/district-user/dashboard/reports/staff", icon: Contact },
// ];

// const mainNavigation = [
//   { name: "Dashboard", href: "/district-user/dashboard/home", icon: Home },
//   { name: "Settings", href: "/district-user/dashboard/settings", icon: Settings },
// ];

// export default function SideNav({ setSidebarOpen }: SideNavProps) {
//   const pathname = usePathname();
//   const router = useRouter();
  
//   // States to handle dropdowns
//   const [isReportsOpen, setIsReportsOpen] = useState(false);
//   const [isSmsOpen, setIsSmsOpen] = useState(false);

//   // Extract icons to Capitalized variables to satisfy Turbopack/React JSX parser
//   const DashboardIcon = mainNavigation[0].icon;
//   const SettingsIcon = mainNavigation[1].icon;

//   // Automatically open dropdowns if the user is on their respective pages
//   useEffect(() => {
//     if (pathname.includes("/reports")) {
//       setIsReportsOpen(true);
//     }
//     if (pathname.includes("/sms")) {
//       setIsSmsOpen(true);
//     }
//   }, [pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     sessionStorage.removeItem("userSession");
//     router.push("/");
//   };

//   return (
//     <div className="h-full flex flex-col bg-white">
//       {/* Logo and close button */}
//       <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 shrink-0">
//         <div className="flex items-center">
//           <div className="shrink-0">
//             <h1 className="text-xl font-bold text-indigo-600">MTC Dashboard</h1>
//           </div>
//         </div>
//         <button
//           type="button"
//           className="lg:hidden -mr-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//           onClick={() => setSidebarOpen(false)}
//         >
//           <span className="sr-only">Close sidebar</span>
//           <X className="h-6 w-6" aria-hidden="true" />
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
//         {/* Dashboard Link */}
//         <Link
//           href={mainNavigation[0].href}
//           className={cn(
//             pathname === mainNavigation[0].href
//               ? "bg-indigo-50 border-indigo-500 text-indigo-700"
//               : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800",
//             "group flex items-center px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150"
//           )}
//           onClick={() => setSidebarOpen(false)}
//         >
//           <DashboardIcon
//             className={cn(
//               pathname === mainNavigation[0].href ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500",
//               "mr-3 h-5 w-5 transition-colors duration-150"
//             )}
//             aria-hidden="true"
//           />
//           {mainNavigation[0].name}
//         </Link>

//         {/* SMS Dropdown */}
//         <div className="space-y-1">
//           <button
//             onClick={() => setIsSmsOpen(!isSmsOpen)}
//             className={cn(
//               pathname.includes("/sms")
//                 ? "bg-indigo-50 border-indigo-500 text-indigo-700"
//                 : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800",
//               "group w-full flex items-center justify-between px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150"
//             )}
//           >
//             <div className="flex items-center">
//               <MessageSquare
//                 className={cn(
//                   pathname.includes("/sms") ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500",
//                   "mr-3 h-5 w-5 transition-colors duration-150"
//                 )}
//                 aria-hidden="true"
//               />
//               SMS
//             </div>
//             {isSmsOpen ? (
//               <ChevronDown className="h-4 w-4 text-gray-500" />
//             ) : (
//               <ChevronRight className="h-4 w-4 text-gray-500" />
//             )}
//           </button>

//           {/* Expanded SMS Sub-menu */}
//           {isSmsOpen && (
//             <div className="mt-1 space-y-1 ml-4 border-l border-gray-200">
//               {smsNavigation.map((item) => {
//                 const isActive = pathname === item.href;
//                 const SmsIcon = item.icon; 
                
//                 return (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={cn(
//                       isActive
//                         ? "bg-indigo-50 text-indigo-700 font-semibold border-indigo-500"
//                         : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent",
//                       "group flex items-center pl-4 pr-3 py-2 border-l-4 text-xs md:text-sm font-medium rounded-r-md transition-colors duration-150"
//                     )}
//                     onClick={() => setSidebarOpen(false)}
//                   >
//                     <SmsIcon
//                       className={cn(
//                         isActive ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500",
//                         "mr-3 h-4 w-4 transition-colors duration-150 shrink-0"
//                       )}
//                       aria-hidden="true"
//                     />
//                     <span className="truncate">{item.name}</span>
//                   </Link>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Reports Dropdown */}
//         <div className="space-y-1">
//           <button
//             onClick={() => setIsReportsOpen(!isReportsOpen)}
//             className={cn(
//               pathname.includes("/reports")
//                 ? "bg-indigo-50 border-indigo-500 text-indigo-700"
//                 : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800",
//               "group w-full flex items-center justify-between px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150"
//             )}
//           >
//             <div className="flex items-center">
//               <FileText
//                 className={cn(
//                   pathname.includes("/reports") ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500",
//                   "mr-3 h-5 w-5 transition-colors duration-150"
//                 )}
//                 aria-hidden="true"
//               />
//               Reports
//             </div>
//             {isReportsOpen ? (
//               <ChevronDown className="h-4 w-4 text-gray-500" />
//             ) : (
//               <ChevronRight className="h-4 w-4 text-gray-500" />
//             )}
//           </button>

//           {/* Expanded Reports Sub-menu */}
//           {isReportsOpen && (
//             <div className="mt-1 space-y-1 ml-4 border-l border-gray-200">
//               {reportsNavigation.map((item) => {
//                 const isActive = pathname === item.href;
//                 const ReportIcon = item.icon; 
                
//                 return (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={cn(
//                       isActive
//                         ? "bg-indigo-50 text-indigo-700 font-semibold border-indigo-500"
//                         : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent",
//                       "group flex items-center pl-4 pr-3 py-2 border-l-4 text-xs md:text-sm font-medium rounded-r-md transition-colors duration-150"
//                     )}
//                     onClick={() => setSidebarOpen(false)}
//                   >
//                     <ReportIcon
//                       className={cn(
//                         isActive ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500",
//                         "mr-3 h-4 w-4 transition-colors duration-150 shrink-0"
//                       )}
//                       aria-hidden="true"
//                     />
//                     <span className="truncate">{item.name}</span>
//                   </Link>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Settings Link */}
//         <Link
//           href={mainNavigation[1].href}
//           className={cn(
//             pathname === mainNavigation[1].href
//               ? "bg-indigo-50 border-indigo-500 text-indigo-700"
//               : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800",
//             "group flex items-center px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150"
//           )}
//           onClick={() => setSidebarOpen(false)}
//         >
//           <SettingsIcon
//             className={cn(
//               pathname === mainNavigation[1].href ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500",
//               "mr-3 h-5 w-5 transition-colors duration-150"
//             )}
//             aria-hidden="true"
//           />
//           {mainNavigation[1].name}
//         </Link>
        
//         {/* Logout button */}
//         <button
//           onClick={handleLogout}
//           className="group flex items-center px-3 py-2 mt-8 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150 border-transparent text-red-600 hover:bg-red-50 hover:text-red-700 w-full text-left"
//         >
//           <LogOut className="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600 transition-colors duration-150" aria-hidden="true" />
//           Logout
//         </button>
//       </nav>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
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

const smsNavigation = [
  { name: "Custom SMS", href: "/district-user/dashboard/sms/custom", icon: MessageCircle },
  { name: "State SMS", href: "/district-user/dashboard/sms/state", icon: Landmark },
  { name: "District SMS", href: "/district-user/dashboard/sms/district", icon: Map },
  { name: "MTC SMS", href: "/district-user/dashboard/sms/mtc", icon: Send },
];

const reportsNavigation = [
  { name: "Annual District Factsheet", href: "/district-user/dashboard/reports/annual-factsheet", icon: FileSpreadsheet },
  { name: "Admission Dashboards", href: "/district-user/dashboard/reports/admission-dashboards", icon: LayoutDashboard },
  { name: "Bed Occupancy", href: "/district-user/dashboard/reports/bed-occupancy", icon: Bed },
  { name: "Child Case Sheet", href: "/district-user/dashboard/reports/child-case-sheet", icon: ClipboardList },
  { name: "Children Discharged by MTC", href: "/district-user/dashboard/reports/discharged-mtc", icon: Building2 },
  { name: "Download Children Records", href: "/district-user/dashboard/reports/download-records", icon: Download },
  { name: "Discharge Dashboards", href: "/district-user/dashboard/reports/discharge-dashboards", icon: PieChart },
  { name: "Equipment Status Report", href: "/district-user/dashboard/reports/equipment-status", icon: Activity },
  { name: "FollowUp Status Report", href: "/district-user/dashboard/reports/followup-status", icon: RefreshCw },
  { name: "Laboratory Test Details", href: "/district-user/dashboard/reports/laboratory-tests", icon: FlaskConical },
  { name: "Micronutrients & Antibiotics", href: "/district-user/dashboard/reports/micronutrients-antibiotics", icon: Pill },
  { name: "MTC Monthly Report", href: "/district-user/dashboard/reports/mtc-monthly", icon: CalendarDays },
  { name: "Performance Ranking", href: "/district-user/dashboard/reports/performance-ranking", icon: TrendingUp },
  { name: "FollowUp Report", href: "/district-user/dashboard/reports/followup", icon: RefreshCw },
  { name: "Sahiya Referral/Followed-up", href: "/district-user/dashboard/reports/sahiya-referral", icon: UserPlus },
  { name: "Staff Report", href: "/district-user/dashboard/reports/staff", icon: Contact },
];

const mainNavigation = [
  { name: "Dashboard", href: "/district-user/dashboard/home", icon: Home },
  { name: "Settings", href: "/district-user/dashboard/settings", icon: Settings },
];

export default function SideNav({ setSidebarOpen }: SideNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  // States to handle dropdowns
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isSmsOpen, setIsSmsOpen] = useState(false);

  // Extract icons to Capitalized variables to satisfy Turbopack/React JSX parser
  const DashboardIcon = mainNavigation[0].icon;
  const SettingsIcon = mainNavigation[1].icon;

  // Automatically open dropdowns if the user is on their respective pages
  useEffect(() => {
    if (pathname.includes("/reports")) {
      setIsReportsOpen(true);
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
      {/* Logo and close button */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 shrink-0">
        <div className="flex items-center">
          <div className="shrink-0">
            <h1 className="text-xl font-bold text-indigo-600">MTC Dashboard</h1>
          </div>
        </div>
        <button
          type="button"
          className="lg:hidden -mr-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="sr-only">Close sidebar</span>
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        {/* Dashboard Link */}
        <Link
          href={mainNavigation[0].href}
          className={cn(
            pathname === mainNavigation[0].href
              ? "bg-indigo-50 border-indigo-500 text-indigo-700"
              : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800",
            "group flex items-center px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150"
          )}
          onClick={() => setSidebarOpen(false)}
        >
          <DashboardIcon
            className={cn(
              pathname === mainNavigation[0].href ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500",
              "mr-3 h-5 w-5 transition-colors duration-150"
            )}
            aria-hidden="true"
          />
          {mainNavigation[0].name}
        </Link>

        {/* SMS Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setIsSmsOpen(!isSmsOpen)}
            className={cn(
              pathname.includes("/sms")
                ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800",
              "group w-full flex items-center justify-between px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150"
            )}
          >
            <div className="flex items-center">
              <MessageSquare
                className={cn(
                  pathname.includes("/sms") ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500",
                  "mr-3 h-5 w-5 transition-colors duration-150"
                )}
                aria-hidden="true"
              />
              SMS
            </div>
            {isSmsOpen ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )}
          </button>

          {/* Expanded SMS Sub-menu */}
          {isSmsOpen && (
            <div className="mt-1 space-y-1 ml-4 border-l border-gray-200">
              {smsNavigation.map((item) => {
                const isActive = pathname === item.href;
                const SmsIcon = item.icon; 
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      isActive
                        ? "bg-indigo-50 text-indigo-700 font-semibold border-indigo-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent",
                      "group flex items-center pl-4 pr-3 py-2 border-l-4 text-xs md:text-sm font-medium rounded-r-md transition-colors duration-150"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <SmsIcon
                      className={cn(
                        isActive ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 h-4 w-4 transition-colors duration-150 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Reports Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setIsReportsOpen(!isReportsOpen)}
            className={cn(
              pathname.includes("/reports")
                ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800",
              "group w-full flex items-center justify-between px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150"
            )}
          >
            <div className="flex items-center">
              <FileText
                className={cn(
                  pathname.includes("/reports") ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500",
                  "mr-3 h-5 w-5 transition-colors duration-150"
                )}
                aria-hidden="true"
              />
              Reports
            </div>
            {isReportsOpen ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )}
          </button>

          {/* Expanded Reports Sub-menu */}
          {isReportsOpen && (
            <div className="mt-1 space-y-1 ml-4 border-l border-gray-200">
              {reportsNavigation.map((item) => {
                const isActive = pathname === item.href;
                const ReportIcon = item.icon; 
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      isActive
                        ? "bg-indigo-50 text-indigo-700 font-semibold border-indigo-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent",
                      "group flex items-center pl-4 pr-3 py-2 border-l-4 text-xs md:text-sm font-medium rounded-r-md transition-colors duration-150"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <ReportIcon
                      className={cn(
                        isActive ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 h-4 w-4 transition-colors duration-150 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Settings Link */}
        <Link
          href={mainNavigation[1].href}
          className={cn(
            pathname === mainNavigation[1].href
              ? "bg-indigo-50 border-indigo-500 text-indigo-700"
              : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800",
            "group flex items-center px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150"
          )}
          onClick={() => setSidebarOpen(false)}
        >
          <SettingsIcon
            className={cn(
              pathname === mainNavigation[1].href ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500",
              "mr-3 h-5 w-5 transition-colors duration-150"
            )}
            aria-hidden="true"
          />
          {mainNavigation[1].name}
        </Link>
        
        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="group flex items-center px-3 py-2 mt-8 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150 border-transparent text-red-600 hover:bg-red-50 hover:text-red-700 w-full text-left"
        >
          <LogOut className="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600 transition-colors duration-150" aria-hidden="true" />
          Logout
        </button>
      </nav>
    </div>
  );
}