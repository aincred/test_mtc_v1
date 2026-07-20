// // "use client";

// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import { usePathname, useRouter } from "next/navigation";
// // import {
// //   Home,
// //   Settings,
// //   X,
// //   LogOut,
// //   FileText,
// //   ChevronDown,
// //   ChevronRight,
// //   LayoutDashboard,
// //   Download,
// //   UserPlus,
// //   MessageSquare,
// //   Globe,
// //   Library,
// //   Image as ImageIcon,
// //   Building2,
// //   FileEdit,
// //   UserMinus,
// //   ShieldCheck,
// //   Database,
// //   PlusCircle,
// //   ImagePlus,
// //   Star,
// //   Mail,
// //   CalendarCheck
// // } from "lucide-react";
// // import { cn } from "@/lib/utils";

// // interface SideNavProps {
// //   setSidebarOpen: (open: boolean) => void;
// // }

// // // --- Navigation Arrays ---

// // const mainNavigation = [
// //   { name: "Dashboard", href: "/admin/dashboard/home", icon: Home },
// //   { name: "State Center Of Excellence", href: "/admin/dashboard/scoe", icon: Globe },
// //   { name: "Resources", href: "/admin/dashboard/resources", icon: Library },
// //   { name: "Gallery", href: "/admin/dashboard/gallery", icon: ImageIcon },
// // ];

// // const managementNavigation = [
// //   { name: "Create User", href: "/admin/dashboard/management/create-user", icon: UserPlus },
// //   { name: "Create MTC", href: "/admin/dashboard/management/create-mtc", icon: Building2 },
// //   { name: "Edit/Delete Records", href: "/admin/dashboard/management/records", icon: FileEdit },
// //   { name: "Discharge", href: "/admin/dashboard/management/discharge", icon: UserMinus },
// //   { name: "Privileges", href: "/admin/dashboard/management/privileges", icon: ShieldCheck },
// // ];

// // const cmsNavigation = [
// //   { name: "Content Management System", href: "/admin/dashboard/cms/main", icon: Database },
// //   { name: "Add Resources", href: "/admin/dashboard/cms/add-resources", icon: PlusCircle },
// //   { name: "Add Gallery", href: "/admin/dashboard/cms/add-gallery", icon: ImagePlus },
// //   { name: "Add Spotlight", href: "/admin/dashboard/cms/add-spotlight", icon: Star },
// // ];

// // // New SMS Navigation based on your image
// // const smsNavigation = [
// //   { name: "Custom SMS", href: "/admin/dashboard/sms/custom", icon: MessageSquare },
// //   { name: "State SMS", href: "/admin/dashboard/sms/state", icon: Globe },
// //   { name: "District SMS", href: "/admin/dashboard/sms/district", icon: Building2 },
// //   { name: "MTC SMS", href: "/admin/dashboard/sms/mtc", icon: Mail },
// //   { name: "SMS Follow up Due Dates", href: "/admin/dashboard/sms/follow-up", icon: CalendarCheck },
// // ];

// // export default function AdminSideNav({ setSidebarOpen }: SideNavProps) {
// //   const pathname = usePathname();
// //   const router = useRouter();
  
// //   // State for dropdowns
// //   const [openMenus, setOpenMenus] = useState({
// //     management: false,
// //     cms: false,
// //     sms: false,
// //     reports: false,
// //   });

// //   const toggleMenu = (menu: keyof typeof openMenus) => {
// //     setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
// //   };

// //   // Auto-expand menu based on current path
// //   useEffect(() => {
// //     if (pathname.includes("/management")) setOpenMenus(p => ({ ...p, management: true }));
// //     if (pathname.includes("/cms")) setOpenMenus(p => ({ ...p, cms: true }));
// //     if (pathname.includes("/sms")) setOpenMenus(p => ({ ...p, sms: true }));
// //   }, [pathname]);

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     router.push("/login");
// //   };

// //   // Reusable Nav Link Component
// //   const NavLink = ({ item, isSubItem = false }: { item: any, isSubItem?: boolean }) => {
// //     const isActive = pathname === item.href;
// //     const Icon = item.icon;
// //     return (
// //       <Link
// //         href={item.href}
// //         onClick={() => setSidebarOpen(false)}
// //         className={cn(
// //           "group flex items-center py-2 font-medium border-l-4 rounded-r-md transition-all duration-150",
// //           isActive 
// //             ? "bg-indigo-50 border-indigo-600 text-indigo-700" 
// //             : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
// //           isSubItem ? "pl-10 text-sm" : "px-4 text-sm"
// //         )}
// //       >
// //         <Icon className={cn("mr-3 shrink-0", isSubItem ? "h-4 w-4" : "h-5 w-5", isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-500")} />
// //         {item.name}
// //       </Link>
// //     );
// //   };

// //   return (
// //     <div className="h-full flex flex-col bg-white border-r border-gray-200">
// //       {/* Header */}
// //       <div className="flex items-center justify-between h-16 px-6 bg-indigo-600 shrink-0">
// //         <span className="text-white font-bold text-lg tracking-tight">Admin Portal</span>
// //         <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
// //           <X className="h-6 w-6" />
// //         </button>
// //       </div>

// //       <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto custom-scrollbar">
// //         {/* Basic Navigation */}
// //         {mainNavigation.map(item => <NavLink key={item.name} item={item} />)}

// //         <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Administration</div>

// //         {/* Management Dropdown */}
// //         <div>
// //           <button 
// //             onClick={() => toggleMenu('management')}
// //             className="w-full group flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
// //           >
// //             <div className="flex items-center">
// //               <ShieldCheck className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
// //               Management
// //             </div>
// //             {openMenus.management ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
// //           </button>
// //           {openMenus.management && (
// //             <div className="mt-1 space-y-1">
// //               {managementNavigation.map(item => <NavLink key={item.name} item={item} isSubItem />)}
// //             </div>
// //           )}
// //         </div>

// //         {/* CMS Dropdown */}
// //         <div>
// //           <button 
// //             onClick={() => toggleMenu('cms')}
// //             className="w-full group flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
// //           >
// //             <div className="flex items-center">
// //               <LayoutDashboard className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
// //               CMS
// //             </div>
// //             {openMenus.cms ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
// //           </button>
// //           {openMenus.cms && (
// //             <div className="mt-1 space-y-1">
// //               {cmsNavigation.map(item => <NavLink key={item.name} item={item} isSubItem />)}
// //             </div>
// //           )}
// //         </div>

// //         <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Data & Comms</div>

// //         {/* SMS Dropdown (Updated from Image) */}
// //         <div>
// //           <button 
// //             onClick={() => toggleMenu('sms')}
// //             className="w-full group flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
// //           >
// //             <div className="flex items-center">
// //               <MessageSquare className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
// //               SMS
// //             </div>
// //             {openMenus.sms ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
// //           </button>
// //           {openMenus.sms && (
// //             <div className="mt-1 space-y-1">
// //               {smsNavigation.map(item => <NavLink key={item.name} item={item} isSubItem />)}
// //             </div>
// //           )}
// //         </div>

// //         {/* Reports & Downloads */}
// //         <NavLink item={{ name: "Reports", href: "/admin/dashboard/reports", icon: FileText }} />
// //         <NavLink item={{ name: "Download Tables", href: "/admin/dashboard/downloads", icon: Download }} />

// //         <div className="mt-auto pt-10">
// //           <NavLink item={{ name: "Settings", href: "/admin/dashboard/settings", icon: Settings }} />
// //           <button
// //             onClick={handleLogout}
// //             className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md mt-1"
// //           >
// //             <LogOut className="mr-3 h-5 w-5" />
// //             Logout
// //           </button>
// //         </div>
// //       </nav>
// //     </div>
// //   );
// // }


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
//   LayoutDashboard,
//   Download,
//   UserPlus,
//   MessageSquare,
//   Globe,
//   Library,
//   Image as ImageIcon,
//   Building2,
//   FileEdit,
//   UserMinus,
//   ShieldCheck,
//   Database,
//   PlusCircle,
//   ImagePlus,
//   Star,
//   Mail,
//   CalendarCheck
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface SideNavProps {
//   setSidebarOpen: (open: boolean) => void;
// }

// // --- Navigation Arrays ---
// const mainNavigation = [
//   { name: "Dashboard", href: "/admin/dashboard/home", icon: Home },
//   { name: "State Center Of Excellence", href: "/admin/dashboard/scoe", icon: Globe },
//   { name: "Resources", href: "/admin/dashboard/resources", icon: Library },
//   { name: "Gallery", href: "/admin/dashboard/gallery", icon: ImageIcon },
// ];

// const managementNavigation = [
//   { name: "Create User", href: "/admin/dashboard/management/create-user", icon: UserPlus },
//   { name: "Create MTC", href: "/admin/dashboard/management/create-mtc", icon: Building2 },
//   { name: "Edit/Delete Records", href: "/admin/dashboard/management/records", icon: FileEdit },
//   { name: "Discharge", href: "/admin/dashboard/management/discharge", icon: UserMinus },
//   { name: "Privileges", href: "/admin/dashboard/management/privileges", icon: ShieldCheck },
// ];

// const cmsNavigation = [
//   { name: "Content Management System", href: "/admin/dashboard/cms/main", icon: Database },
//   { name: "Add Resources", href: "/admin/dashboard/cms/add-resources", icon: PlusCircle },
//   { name: "Add Gallery", href: "/admin/dashboard/cms/add-gallery", icon: ImagePlus },
//   { name: "Add Spotlight", href: "/admin/dashboard/cms/add-spotlight", icon: Star },
// ];

// const smsNavigation = [
//   { name: "Custom SMS", href: "/admin/dashboard/sms/custom", icon: MessageSquare },
//   { name: "State SMS", href: "/admin/dashboard/sms/state", icon: Globe },
//   { name: "District SMS", href: "/admin/dashboard/sms/district", icon: Building2 },
//   { name: "MTC SMS", href: "/admin/dashboard/sms/mtc", icon: Mail },
//   { name: "SMS Follow up Due Dates", href: "/admin/dashboard/sms/follow-up", icon: CalendarCheck },
// ];

// export default function AdminSideNav({ setSidebarOpen }: SideNavProps) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [openMenus, setOpenMenus] = useState({
//     management: false,
//     cms: false,
//     sms: false,
//     reports: false,
//   });

//   const toggleMenu = (menu: keyof typeof openMenus) => {
//     setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
//   };

//   useEffect(() => {
//     if (pathname.includes("/management")) setOpenMenus(p => ({ ...p, management: true }));
//     if (pathname.includes("/cms")) setOpenMenus(p => ({ ...p, cms: true }));
//     if (pathname.includes("/sms")) setOpenMenus(p => ({ ...p, sms: true }));
//   }, [pathname]);

//   const handleLogout = () => {
//     localStorage.clear();
//     router.push("/login");
//   };

//   // Reusable Nav Link Component
//   const NavLink = ({ item, isSubItem = false }: { item: any, isSubItem?: boolean }) => {
//     const isActive = pathname === item.href;
//     const Icon = item.icon;
    
//     return (
//       <Link
//         href={item.href}
//         onClick={() => setSidebarOpen(false)}
//         className={cn(
//           "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
//           isActive
//             ? "bg-indigo-50 text-indigo-600 font-semibold"
//             : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
//           isSubItem && "pl-9 text-[13px]"
//         )}
//       >
//         <Icon
//           className={cn(
//             "shrink-0 transition-colors duration-200",
//             isSubItem ? "h-4 w-4" : "h-5 w-5",
//             isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-500"
//           )}
//         />
//         <span>{item.name}</span>
//       </Link>
//     );
//   };

//   // Reusable Dropdown Container Component
//   const DropdownMenu = ({ 
//     label, 
//     menuKey, 
//     icon: Icon, 
//     items 
//   }: { 
//     label: string, 
//     menuKey: keyof typeof openMenus, 
//     icon: any, 
//     items: any[] 
//   }) => {
//     const isOpen = openMenus[menuKey];
//     const isChildActive = items.some(item => pathname === item.href);

//     return (
//       <div className="space-y-1">
//         <button
//           onClick={() => toggleMenu(menuKey)}
//           className={cn(
//             "w-full group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
//             isChildActive 
//               ? "text-indigo-600 font-semibold" 
//               : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//           )}
//         >
//           <div className="flex items-center gap-3">
//             <Icon className={cn("h-5 w-5 transition-colors", isChildActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-500")} />
//             <span>{label}</span>
//           </div>
//           <ChevronDown
//             className={cn(
//               "h-4 w-4 text-slate-400 transition-transform duration-200 ease-in-out",
//               isOpen && "transform rotate-180 text-slate-600"
//             )}
//           />
//         </button>
        
//         {/* Hardware-accelerated smooth collapse/expand container */}
//         <div 
//           className={cn(
//             "grid transition-all duration-200 ease-in-out",
//             isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 overflow-hidden"
//           )}
//         >
//           <div className="overflow-hidden space-y-1 relative before:absolute before:left-[21px] before:top-0 before:bottom-2 before:w-px before:bg-slate-200">
//             {items.map(item => (
//               <NavLink key={item.name} item={item} isSubItem />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="h-full flex flex-col bg-white border-r border-slate-200 select-none">
//       {/* Header */}
//       <div className="flex items-center justify-between h-16 px-6 bg-slate-900 border-b border-slate-800 shrink-0">
//         <div className="flex items-center gap-2.5">
//           <div className="h-7 w-7 bg-indigo-500 rounded-md flex items-center justify-center font-bold text-white text-sm tracking-wider">A</div>
//           <span className="text-white font-semibold text-base tracking-tight">Admin Portal</span>
//         </div>
//         <button className="lg:hidden text-slate-400 hover:text-white transition-colors" onClick={() => setSidebarOpen(false)}>
//           <X className="h-5 w-5" />
//         </button>
//       </div>

//       {/* Main Scrollable Navigation Area */}
//       <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300">
//         {/* Basic Navigation Group */}
//         <div className="space-y-1">
//           {mainNavigation.map(item => <NavLink key={item.name} item={item} />)}
//         </div>

//         {/* Administration Group */}
//         <div className="space-y-1.5">
//           <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Administration</div>
//           <DropdownMenu label="Management" menuKey="management" icon={ShieldCheck} items={managementNavigation} />
//           <DropdownMenu label="CMS" menuKey="cms" icon={LayoutDashboard} items={cmsNavigation} />
//         </div>

//         {/* Data & Comms Group */}
//         <div className="space-y-1.5">
//           <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Data & Comms</div>
//           <DropdownMenu label="SMS" menuKey="sms" icon={MessageSquare} items={smsNavigation} />
//           <NavLink item={{ name: "Reports", href: "/admin/dashboard/reports", icon: FileText }} />
//           <NavLink item={{ name: "Download Tables", href: "/admin/dashboard/downloads", icon: Download }} />
//         </div>
//       </nav>

//       {/* Fixed Sticky Footer Panel */}
//       <div className="p-3 border-t border-slate-100 bg-slate-50/50 space-y-1 shrink-0">
//         <NavLink item={{ name: "Settings", href: "/admin/dashboard/settings", icon: Settings }} />
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50/60 hover:text-rose-700 rounded-lg transition-all duration-150 group"
//         >
//           <LogOut className="h-5 w-5 text-rose-400 group-hover:text-rose-500 transition-colors" />
//           <span>Logout</span>
//         </button>
//       </div>
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
  LayoutDashboard,
  Download,
  UserPlus,
  MessageSquare,
  Globe,
  Library,
  Image as ImageIcon,
  Building2,
  FileEdit,
  UserMinus,
  ShieldCheck,
  Database,
  PlusCircle,
  ImagePlus,
  Star,
  Mail,
  CalendarCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

// Strict type defining navigation element attributes
interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SideNavProps {
  setSidebarOpen: (open: boolean) => void;
}

// --- Navigation Arrays ---
const mainNavigation: NavigationItem[] = [
  { name: "Dashboard", href: "/admin/dashboard/home", icon: Home },
  { name: "State Center Of Excellence", href: "/admin/dashboard/scoe", icon: Globe },
  { name: "Resources", href: "/admin/dashboard/resources", icon: Library },
  { name: "Gallery", href: "/admin/dashboard/gallery", icon: ImageIcon },
];

const managementNavigation: NavigationItem[] = [
  { name: "Create User", href: "/admin/dashboard/management/create-user", icon: UserPlus },
  { name: "Create MTC", href: "/admin/dashboard/management/create-mtc", icon: Building2 },
  { name: "Edit/Delete Records", href: "/admin/dashboard/management/records", icon: FileEdit },
  { name: "Discharge", href: "/admin/dashboard/management/discharge", icon: UserMinus },
  { name: "Privileges", href: "/admin/dashboard/management/privileges", icon: ShieldCheck },
];

const cmsNavigation: NavigationItem[] = [
  { name: "Content Management System", href: "/admin/dashboard/cms/main", icon: Database },
  { name: "Add Resources", href: "/admin/dashboard/cms/add-resources", icon: PlusCircle },
  { name: "Add Gallery", href: "/admin/dashboard/cms/add-gallery", icon: ImagePlus },
  { name: "Add Spotlight", href: "/admin/dashboard/cms/add-spotlight", icon: Star },
];

const smsNavigation: NavigationItem[] = [
  { name: "Custom SMS", href: "/admin/dashboard/sms/custom", icon: MessageSquare },
  { name: "State SMS", href: "/admin/dashboard/sms/state", icon: Globe },
  { name: "District SMS", href: "/admin/dashboard/sms/district", icon: Building2 },
  { name: "MTC SMS", href: "/admin/dashboard/sms/mtc", icon: Mail },
  { name: "SMS Follow up Due Dates", href: "/admin/dashboard/sms/follow-up", icon: CalendarCheck },
];

export default function AdminSideNav({ setSidebarOpen }: SideNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [openMenus, setOpenMenus] = useState({
    management: false,
    cms: false,
    sms: false,
    reports: false,
  });

  const toggleMenu = (menu: keyof typeof openMenus) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  useEffect(() => {
    if (pathname.includes("/management")) setOpenMenus(p => ({ ...p, management: true }));
    if (pathname.includes("/cms")) setOpenMenus(p => ({ ...p, cms: true }));
    if (pathname.includes("/sms")) setOpenMenus(p => ({ ...p, sms: true }));
  }, [pathname]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  // Reusable Nav Link Component with type safety enforced
  const NavLink = ({ item, isSubItem = false }: { item: NavigationItem, isSubItem?: boolean }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;
    
    return (
      <Link
        href={item.href}
        onClick={() => setSidebarOpen(false)}
        className={cn(
          "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
          isActive
            ? "bg-indigo-50 text-indigo-600 font-semibold"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
          isSubItem && "pl-9 text-[13px]"
        )}
      >
        <Icon
          className={cn(
            "shrink-0 transition-colors duration-200",
            isSubItem ? "h-4 w-4" : "h-5 w-5",
            isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-500"
          )}
        />
        <span>{item.name}</span>
      </Link>
    );
  };

  // Reusable Dropdown Container Component with fixed type signatures
  const DropdownMenu = ({ 
    label, 
    menuKey, 
    icon: Icon, 
    items 
  }: { 
    label: string, 
    menuKey: keyof typeof openMenus, 
    icon: React.ComponentType<{ className?: string }>, 
    items: NavigationItem[] 
  }) => {
    const isOpen = openMenus[menuKey];
    const isChildActive = items.some(item => pathname === item.href);

    return (
      <div className="space-y-1">
        <button
          onClick={() => toggleMenu(menuKey)}
          className={cn(
            "w-full group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
            isChildActive 
              ? "text-indigo-600 font-semibold" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          )}
        >
          <div className="flex items-center gap-3">
            <Icon className={cn("h-5 w-5 transition-colors", isChildActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-500")} />
            <span>{label}</span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-slate-400 transition-transform duration-200 ease-in-out",
              isOpen && "transform rotate-180 text-slate-600"
            )}
          />
        </button>
        
        {/* Hardware-accelerated smooth collapse/expand container */}
        <div 
          className={cn(
            "grid transition-all duration-200 ease-in-out",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 overflow-hidden"
          )}
        >
          <div className="overflow-hidden space-y-1 relative before:absolute before:left-[21px] before:top-0 before:bottom-2 before:w-px before:bg-slate-200">
            {items.map(item => (
              <NavLink key={item.name} item={item} isSubItem />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-slate-200 select-none">
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-6 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 bg-indigo-500 rounded-md flex items-center justify-center font-bold text-white text-sm tracking-wider">A</div>
          <span className="text-white font-semibold text-base tracking-tight">Admin Portal</span>
        </div>
        <button className="lg:hidden text-slate-400 hover:text-white transition-colors" onClick={() => setSidebarOpen(false)}>
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Scrollable Navigation Area */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300">
        {/* Basic Navigation Group */}
        <div className="space-y-1">
          {mainNavigation.map(item => <NavLink key={item.name} item={item} />)}
        </div>

        {/* Administration Group */}
        <div className="space-y-1.5">
          <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Administration</div>
          <DropdownMenu label="Management" menuKey="management" icon={ShieldCheck} items={managementNavigation} />
          <DropdownMenu label="CMS" menuKey="cms" icon={LayoutDashboard} items={cmsNavigation} />
        </div>

        {/* Data & Comms Group */}
        <div className="space-y-1.5">
          <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Data & Comms</div>
          <DropdownMenu label="SMS" menuKey="sms" icon={MessageSquare} items={smsNavigation} />
          <NavLink item={{ name: "Reports", href: "/admin/dashboard/reports", icon: FileText }} />
          <NavLink item={{ name: "Download Tables", href: "/admin/dashboard/downloads", icon: Download }} />
        </div>
      </nav>

      {/* Fixed Sticky Footer Panel */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 space-y-1 shrink-0">
        <NavLink item={{ name: "Settings", href: "/admin/dashboard/settings", icon: Settings }} />
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50/60 hover:text-rose-700 rounded-lg transition-all duration-150 group"
        >
          <LogOut className="h-5 w-5 text-rose-400 group-hover:text-rose-500 transition-colors" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}