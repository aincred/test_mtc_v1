// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   Home,
//   Settings,
//   X,
//   LogOut,
//   ChevronDown,
//   UserPlus,
//   MessageSquare,
//   Globe,
//   Library,
//   Image as ImageIcon,
//   Building2,
//   ShieldCheck,
//   Mail,
//   CalendarCheck
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface NavigationItem {
//   name: string;
//   href: string;
//   icon: React.ComponentType<{ className?: string }>;
// }

// interface SideNavProps {
//   setSidebarOpen: (open: boolean) => void;
// }

// const mainNavigation: NavigationItem[] = [
//   { name: "Dashboard", href: "/admin/dashboard/home", icon: Home },
//   { name: "State Center Of Excellence", href: "/admin/dashboard/scoe", icon: Globe },
//   { name: "Resources", href: "/admin/dashboard/resources", icon: Library },
//   { name: "Gallery", href: "/admin/dashboard/gallery", icon: ImageIcon },
// ];

// const managementNavigation: NavigationItem[] = [
//   { name: "Create User", href: "/admin/dashboard/management/create-user", icon: UserPlus },
//   { name: "Create MTC", href: "/admin/dashboard/management/create-mtc", icon: Building2 },
// ];

// const smsNavigation: NavigationItem[] = [
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
//     sms: false,
//   });

//   const toggleMenu = (menu: keyof typeof openMenus) => {
//     setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
//   };

//   useEffect(() => {
//     if (pathname.includes("/management")) setOpenMenus((p) => ({ ...p, management: true }));
//     if (pathname.includes("/sms")) setOpenMenus((p) => ({ ...p, sms: true }));
//   }, [pathname]);

//   const handleLogout = () => {
//     localStorage.clear();
//     router.push("/");
//   };

//   const NavLink = ({ item, isSubItem = false }: { item: NavigationItem; isSubItem?: boolean }) => {
//     const isActive = pathname === item.href;
//     const Icon = item.icon;

//     return (
//       <Link
//         href={item.href}
//         onClick={() => setSidebarOpen(false)}
//         className={cn(
//           "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150",
//           isActive
//             ? "bg-indigo-50/80 text-indigo-600 font-semibold"
//             : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900",
//           isSubItem && "pl-8 text-[13px]"
//         )}
//       >
//         <Icon
//           className={cn(
//             "shrink-0 transition-colors duration-150",
//             isSubItem ? "h-4 w-4" : "h-4 w-4",
//             isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
//           )}
//         />
//         <span className="truncate">{item.name}</span>
//       </Link>
//     );
//   };

//   const DropdownMenu = ({
//     label,
//     menuKey,
//     icon: Icon,
//     items,
//   }: {
//     label: string;
//     menuKey: keyof typeof openMenus;
//     icon: React.ComponentType<{ className?: string }>;
//     items: NavigationItem[];
//   }) => {
//     const isOpen = openMenus[menuKey];
//     const isChildActive = items.some((item) => pathname === item.href);

//     return (
//       <div className="space-y-0.5">
//         <button
//           type="button"
//           onClick={() => toggleMenu(menuKey)}
//           className={cn(
//             "w-full group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150",
//             isChildActive
//               ? "text-indigo-600 font-semibold"
//               : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
//           )}
//         >
//           <div className="flex items-center gap-3">
//             <Icon
//               className={cn(
//                 "h-4 w-4 transition-colors",
//                 isChildActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
//               )}
//             />
//             <span>{label}</span>
//           </div>
//           <ChevronDown
//             className={cn(
//               "h-3.5 w-3.5 text-slate-400 transition-transform duration-200",
//               isOpen && "transform rotate-180 text-slate-600"
//             )}
//           />
//         </button>

//         <div
//           className={cn(
//             "grid transition-all duration-200 ease-in-out",
//             isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 overflow-hidden"
//           )}
//         >
//           <div className="overflow-hidden space-y-0.5 relative ml-2 pl-2 border-l border-slate-200">
//             {items.map((item) => (
//               <NavLink key={item.name} item={item} isSubItem />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="h-full flex flex-col bg-white border-r border-slate-200/80 select-none">
//       {/* Sidebar Header */}
//       <div className="flex items-center justify-between h-16 px-5 border-b border-slate-200/80 shrink-0">
//         <div className="flex items-center gap-2.5">
//           <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white shadow-xs">
//             M
//           </span>
//           <span className="text-base font-semibold tracking-tight text-slate-900">
//             MTC Admin
//           </span>
//         </div>
//         <button
//           type="button"
//           className="lg:hidden p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
//           onClick={() => setSidebarOpen(false)}
//         >
//           <span className="sr-only">Close sidebar</span>
//           <X className="h-5 w-5" />
//         </button>
//       </div>

//       {/* Main Nav Items */}
//       <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
//         <div className="space-y-0.5">
//           {mainNavigation.map((item) => (
//             <NavLink key={item.name} item={item} />
//           ))}
//         </div>

//         <div className="space-y-1">
//           <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
//             Administration
//           </p>
//           <DropdownMenu
//             label="Management"
//             menuKey="management"
//             icon={ShieldCheck}
//             items={managementNavigation}
//           />
//         </div>

//         <div className="space-y-1">
//           <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
//             Data &amp; Comms
//           </p>
//           <DropdownMenu
//             label="SMS"
//             menuKey="sms"
//             icon={MessageSquare}
//             items={smsNavigation}
//           />
//         </div>
//       </nav>

//       {/* Sticky Bottom Actions */}
//       <div className="p-3 border-t border-slate-200/80 space-y-1 shrink-0 bg-slate-50/50">
//         <NavLink
//           item={{ name: "Settings", href: "/admin/dashboard/settings", icon: Settings }}
//         />
//         <button
//           type="button"
//           onClick={handleLogout}
//           className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors group"
//         >
//           <LogOut className="h-4 w-4 text-rose-400 group-hover:text-rose-600 transition-colors" />
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
  ChevronDown,
  UserPlus,
  MessageSquare,
  Globe,
  Library,
  Image as ImageIcon,
  Building2,
  ShieldCheck,
  Mail,
  CalendarCheck,
  ClipboardList,
  UserCheck,
  LogOut as DischargeIcon,
  BedDouble,
  CalendarClock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SideNavProps {
  setSidebarOpen: (open: boolean) => void;
}

const mainNavigation: NavigationItem[] = [
  { name: "Dashboard", href: "/admin/dashboard/home", icon: Home },
  { name: "State Center Of Excellence", href: "/admin/dashboard/scoe", icon: Globe },
  { name: "Resources", href: "/admin/dashboard/resources", icon: Library },
  { name: "Gallery", href: "/admin/dashboard/gallery", icon: ImageIcon },
];

const clinicalNavigation: NavigationItem[] = [
  { name: "Child Master", href: "/admin/dashboard/management/records", icon: UserCheck },
  
];

const managementNavigation: NavigationItem[] = [
  { name: "Create User", href: "/admin/dashboard/management/create-user", icon: UserPlus },
  { name: "Create MTC", href: "/admin/dashboard/management/create-mtc", icon: Building2 },
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
    records: true,
    management: false,
    sms: false,
  });

  const toggleMenu = (menu: keyof typeof openMenus) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  useEffect(() => {
    if (pathname.includes("/records")) setOpenMenus((p) => ({ ...p, records: true }));
    if (pathname.includes("/management")) setOpenMenus((p) => ({ ...p, management: true }));
    if (pathname.includes("/sms")) setOpenMenus((p) => ({ ...p, sms: true }));
  }, [pathname]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const NavLink = ({ item, isSubItem = false }: { item: NavigationItem; isSubItem?: boolean }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    return (
      <Link
        href={item.href}
        onClick={() => setSidebarOpen(false)}
        className={cn(
          "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150",
          isActive
            ? "bg-indigo-50/80 text-indigo-600 font-semibold"
            : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900",
          isSubItem && "pl-8 text-[13px]"
        )}
      >
        <Icon
          className={cn(
            "shrink-0 transition-colors duration-150",
            "h-4 w-4",
            isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
          )}
        />
        <span className="truncate">{item.name}</span>
      </Link>
    );
  };

  const DropdownMenu = ({
    label,
    menuKey,
    icon: Icon,
    items,
  }: {
    label: string;
    menuKey: keyof typeof openMenus;
    icon: React.ComponentType<{ className?: string }>;
    items: NavigationItem[];
  }) => {
    const isOpen = openMenus[menuKey];
    const isChildActive = items.some((item) => pathname === item.href);

    return (
      <div className="space-y-0.5">
        <button
          type="button"
          onClick={() => toggleMenu(menuKey)}
          className={cn(
            "w-full group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150",
            isChildActive
              ? "text-indigo-600 font-semibold"
              : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
          )}
        >
          <div className="flex items-center gap-3">
            <Icon
              className={cn(
                "h-4 w-4 transition-colors",
                isChildActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
              )}
            />
            <span>{label}</span>
          </div>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 text-slate-400 transition-transform duration-200",
              isOpen && "transform rotate-180 text-slate-600"
            )}
          />
        </button>

        <div
          className={cn(
            "grid transition-all duration-200 ease-in-out",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 overflow-hidden"
          )}
        >
          <div className="overflow-hidden space-y-0.5 relative ml-2 pl-2 border-l border-slate-200">
            {items.map((item) => (
              <NavLink key={item.name} item={item} isSubItem />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-slate-200/80 select-none">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-slate-200/80 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white shadow-xs">
            M
          </span>
          <span className="text-base font-semibold tracking-tight text-slate-900">
            MTC Admin
          </span>
        </div>
        <button
          type="button"
          className="lg:hidden p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="sr-only">Close sidebar</span>
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        <div className="space-y-0.5">
          {mainNavigation.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </div>

        {/* Patient / Clinical Data Tables */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Patient Records
          </p>
          <DropdownMenu
            label="Clinical Tables"
            menuKey="records"
            icon={ClipboardList}
            items={clinicalNavigation}
          />
        </div>

        {/* Management Section */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Administration
          </p>
          <DropdownMenu
            label="Management"
            menuKey="management"
            icon={ShieldCheck}
            items={managementNavigation}
          />
        </div>

        {/* SMS Section */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Data &amp; Comms
          </p>
          <DropdownMenu
            label="SMS"
            menuKey="sms"
            icon={MessageSquare}
            items={smsNavigation}
          />
        </div>
      </nav>

      {/* Sticky Bottom Actions */}
      <div className="p-3 border-t border-slate-200/80 space-y-1 shrink-0 bg-slate-50/50">
        <NavLink
          item={{ name: "Settings", href: "/admin/dashboard/settings", icon: Settings }}
        />
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors group"
        >
          <LogOut className="h-4 w-4 text-rose-400 group-hover:text-rose-600 transition-colors" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}