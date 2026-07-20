// // // // // // // "use client";

// // // // // // // import { useState } from "react";
// // // // // // // import Image from "next/image";
// // // // // // // import Link from "next/link";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import {
// // // // // // //   NavigationMenu,
// // // // // // //   NavigationMenuItem,
// // // // // // //   NavigationMenuLink,
// // // // // // //   NavigationMenuList,
// // // // // // // } from "@/components/ui/navigation-menu";
// // // // // // // import {
// // // // // // //   DropdownMenu,
// // // // // // //   DropdownMenuContent,
// // // // // // //   DropdownMenuItem,
// // // // // // //   DropdownMenuTrigger,
// // // // // // // } from "@/components/ui/dropdown-menu";
// // // // // // // import {
// // // // // // //   Sheet,
// // // // // // //   SheetContent,
// // // // // // //   SheetHeader,
// // // // // // //   SheetTitle,
// // // // // // //   SheetTrigger,
// // // // // // // } from "@/components/ui/sheet";
// // // // // // // import { Menu, ChevronDown } from "lucide-react";

// // // // // // // export default function Header() {
// // // // // // //   const [open, setOpen] = useState(false);

// // // // // // //   const navLinks = [
// // // // // // //     { label: "Home", href: "/#home" },
// // // // // // //     {
// // // // // // //       label: "About",
// // // // // // //       subMenu: [
// // // // // // //         { label: "About Us", href: "#about" },
// // // // // // //         { label: "Message from Mission Director", href: "#message-director" },
// // // // // // //       ],
// // // // // // //     },
// // // // // // //     { label: "Resources", href: "/Resources/ShowResource" },
// // // // // // //     { label: "Gallery", href: "#gallery" },
// // // // // // //     { label: "Contact Us", href: "#contact-us" },
// // // // // // //   ];

// // // // // // //   const loginRoles = [
// // // // // // //     { label: "ADMINISTRATOR", href: "/administrator" },
// // // // // // //     { label: "STATE USER", href: "/state-user" },
// // // // // // //     { label: "DISTRICT USER", href: "/district-user" },
// // // // // // //     { label: "MTC USER", href: "/mtc-user" },
// // // // // // //   ];

// // // // // // //   return (
// // // // // // //     <header className="w-full bg-white shadow-md">
// // // // // // //       {/* ====== TOP SECTION ====== */}
// // // // // // //       <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-gray-200">
// // // // // // //         <div className="flex items-center">
// // // // // // //           <Image
// // // // // // //             src="/logo-jharkhand-govt.png"
// // // // // // //             alt="Government Emblem"
// // // // // // //             width={70}
// // // // // // //             height={70}
// // // // // // //             className="mr-2"
// // // // // // //           />
// // // // // // //         </div>

// // // // // // //         <div className="flex flex-col items-center text-center flex-1 mx-4">
// // // // // // //           <Image
// // // // // // //             src="/logo-mtc.png"
// // // // // // //             alt="MTC Logo"
// // // // // // //             width={300}
// // // // // // //             height={60}
// // // // // // //             className="mb-1 max-w-full h-auto"
// // // // // // //           />
// // // // // // //         </div>

// // // // // // //         <div className="hidden md:flex items-center space-x-3">
// // // // // // //           <Image src="/logo-Nhm1.png" alt="NHM" width={60} height={60} />
// // // // // // //           <Image src="/logo_7.png" alt="Poshan Abhiyaan" width={90} height={70} />
// // // // // // //           <Image src="/logo-unicef.png" alt="UNICEF" width={100} height={60} />
          
// // // // // // //           {/* Accessibility Options */}
// // // // // // //           <div className="flex flex-col text-xs bg-[#0b5a56] text-white rounded overflow-hidden shadow-md">
// // // // // // //             <button className="hover:bg-[#084d49] px-2 py-1 font-bold transition-colors">A++</button>
// // // // // // //             <button className="hover:bg-[#084d49] px-2 py-1 font-bold transition-colors">A</button>
// // // // // // //             <button className="hover:bg-[#084d49] px-2 py-1 font-bold transition-colors">A−</button>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* ===== MOBILE MENU ===== */}
// // // // // // //         <div className="flex md:hidden items-center">
// // // // // // //           <Sheet open={open} onOpenChange={setOpen}>
// // // // // // //             <SheetTrigger asChild>
// // // // // // //               <Button variant="ghost" size="icon" className="text-[#00796B]">
// // // // // // //                 <Menu className="h-6 w-6" />
// // // // // // //               </Button>
// // // // // // //             </SheetTrigger>
// // // // // // //             <SheetContent side="right" className="w-64 bg-white">
// // // // // // //               <SheetHeader>
// // // // // // //                 <SheetTitle className="text-lg font-semibold text-[#00796B]">
// // // // // // //                   Menu
// // // // // // //                 </SheetTitle>
// // // // // // //               </SheetHeader>

// // // // // // //               <div className="mt-6 flex flex-col space-y-3">
// // // // // // //                 {navLinks.map((item) =>
// // // // // // //                   item.subMenu ? (
// // // // // // //                     <div key={item.label}>
// // // // // // //                       <p className="text-[#004D40] font-semibold mb-2">{item.label}</p>
// // // // // // //                       <div className="ml-3 space-y-2">
// // // // // // //                         {item.subMenu.map((sub) => (
// // // // // // //                           <Link key={sub.label} href={sub.href}>
// // // // // // //                             <Button
// // // // // // //                               variant="ghost"
// // // // // // //                               className="w-full justify-start text-sm text-[#004D40] hover:bg-[#E0F2F1] hover:text-[#00796B]"
// // // // // // //                             >
// // // // // // //                               {sub.label}
// // // // // // //                             </Button>
// // // // // // //                           </Link>
// // // // // // //                         ))}
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                   ) : (
// // // // // // //                     <Link key={item.label} href={item.href}>
// // // // // // //                       <Button
// // // // // // //                         variant="ghost"
// // // // // // //                         className="w-full justify-start text-[#004D40] hover:bg-[#E0F2F1] hover:text-[#00796B]"
// // // // // // //                       >
// // // // // // //                         {item.label}
// // // // // // //                       </Button>
// // // // // // //                     </Link>
// // // // // // //                   )
// // // // // // //                 )}

// // // // // // //                 <div className="border-t pt-3 mt-3">
// // // // // // //                   <p className="text-sm font-medium text-gray-700 mb-2">
// // // // // // //                     Login As:
// // // // // // //                   </p>
// // // // // // //                   {loginRoles.map((role) => (
// // // // // // //                     <Link key={role.label} href={role.href}>
// // // // // // //                       <Button
// // // // // // //                         variant="outline"
// // // // // // //                         className="w-full justify-start text-[#004D40] border-[#00796B] hover:bg-[#E0F2F1] hover:text-[#00796B] mb-2"
// // // // // // //                       >
// // // // // // //                         {role.label}
// // // // // // //                       </Button>
// // // // // // //                     </Link>
// // // // // // //                   ))}
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </SheetContent>
// // // // // // //           </Sheet>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* ===== NAVIGATION BAR (Desktop Only) ===== */}
// // // // // // //       <div className="hidden md:flex items-center justify-between bg-[#00796B] text-white px-6 py-2">
// // // // // // //         <NavigationMenu>
// // // // // // //           <NavigationMenuList className="flex space-x-1">
// // // // // // //             {navLinks.map((item) =>
// // // // // // //               item.subMenu ? (
// // // // // // //                 <NavigationMenuItem key={item.label}>
// // // // // // //                   <DropdownMenu>
// // // // // // //                     <DropdownMenuTrigger asChild>
// // // // // // //                       <Button
// // // // // // //                         variant="ghost"
// // // // // // //                         className="text-white hover:bg-[#00695C] px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
// // // // // // //                       >
// // // // // // //                         {item.label}
// // // // // // //                         <ChevronDown className="h-4 w-4" />
// // // // // // //                       </Button>
// // // // // // //                     </DropdownMenuTrigger>
// // // // // // //                     <DropdownMenuContent className="bg-[#004D40] text-white font-semibold border-none shadow-lg">
// // // // // // //                       {item.subMenu.map((sub) => (
// // // // // // //                         <Link key={sub.label} href={sub.href} legacyBehavior passHref>
// // // // // // //                           <DropdownMenuItem className="hover:bg-[#00695C] cursor-pointer transition-colors">
// // // // // // //                             {sub.label}
// // // // // // //                           </DropdownMenuItem>
// // // // // // //                         </Link>
// // // // // // //                       ))}
// // // // // // //                     </DropdownMenuContent>
// // // // // // //                   </DropdownMenu>
// // // // // // //                 </NavigationMenuItem>
// // // // // // //               ) : (
// // // // // // //                 <NavigationMenuItem key={item.label}>
// // // // // // //                   <Link href={item.href} legacyBehavior passHref>
// // // // // // //                     <NavigationMenuLink className="hover:bg-[#00695C] px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
// // // // // // //                       {item.label}
// // // // // // //                     </NavigationMenuLink>
// // // // // // //                   </Link>
// // // // // // //                 </NavigationMenuItem>
// // // // // // //               )
// // // // // // //             )}
// // // // // // //           </NavigationMenuList>
// // // // // // //         </NavigationMenu>

// // // // // // //         {/* Login Dropdown */}
// // // // // // //         <DropdownMenu>
// // // // // // //           <DropdownMenuTrigger asChild>
// // // // // // //             <Button className="bg-[#FDD835] text-[#004D40] font-semibold hover:bg-[#FBC02D] transition-colors shadow-sm">
// // // // // // //               LOGIN
// // // // // // //             </Button>
// // // // // // //           </DropdownMenuTrigger>
// // // // // // //           <DropdownMenuContent className="bg-[#004D40] text-white font-semibold border-none shadow-lg">
// // // // // // //             {loginRoles.map((role) => (
// // // // // // //               <Link key={role.label} href={role.href} legacyBehavior passHref>
// // // // // // //                 <DropdownMenuItem className="hover:bg-[#00695C] cursor-pointer transition-colors">
// // // // // // //                   {role.label}
// // // // // // //                 </DropdownMenuItem>
// // // // // // //               </Link>
// // // // // // //             ))}
// // // // // // //           </DropdownMenuContent>
// // // // // // //         </DropdownMenu>
// // // // // // //       </div>
// // // // // // //     </header>
// // // // // // //   );
// // // // // // // }

// // // // // // "use client";

// // // // // // import { useState } from "react";
// // // // // // import Image from "next/image";
// // // // // // import Link from "next/link";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import {
// // // // // //   NavigationMenu,
// // // // // //   NavigationMenuItem,
// // // // // //   NavigationMenuLink,
// // // // // //   NavigationMenuList,
// // // // // // } from "@/components/ui/navigation-menu";
// // // // // // import {
// // // // // //   DropdownMenu,
// // // // // //   DropdownMenuContent,
// // // // // //   DropdownMenuItem,
// // // // // //   DropdownMenuTrigger,
// // // // // // } from "@/components/ui/dropdown-menu";
// // // // // // import {
// // // // // //   Sheet,
// // // // // //   SheetContent,
// // // // // //   SheetHeader,
// // // // // //   SheetTitle,
// // // // // //   SheetTrigger,
// // // // // // } from "@/components/ui/sheet";
// // // // // // import { Menu, ChevronDown } from "lucide-react";

// // // // // // export default function Header() {
// // // // // //   const [open, setOpen] = useState(false);

// // // // // //   const navLinks = [
// // // // // //     { label: "Home", href: "/#home" },
// // // // // //     {
// // // // // //       label: "About",
// // // // // //       subMenu: [
// // // // // //         { label: "About Us", href: "#about" },
// // // // // //         { label: "Message from Mission Director", href: "#message-director" },
// // // // // //       ],
// // // // // //     },
// // // // // //     { label: "Resources", href: "/Resources/ShowResource" },
// // // // // //     { label: "Gallery", href: "#gallery" },
// // // // // //     { label: "Contact Us", href: "#contact-us" },
// // // // // //   ];

// // // // // //   const loginRoles = [
// // // // // //     { label: "ADMINISTRATOR", href: "/admin" },
// // // // // //     { label: "STATE USER", href: "/state-user" },
// // // // // //     { label: "DISTRICT USER", href: "/district-user" },
// // // // // //     { label: "MTC USER", href: "/mtc-user" },
// // // // // //   ];

// // // // // //   return (
// // // // // //     <header className="w-full bg-white shadow-md">
// // // // // //       {/* ====== TOP SECTION ====== */}
// // // // // //       <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-gray-200">
// // // // // //         <div className="flex items-center">
// // // // // //           <Image
// // // // // //             src="/logo-jharkhand-govt.png"
// // // // // //             alt="Government Emblem"
// // // // // //             width={70}
// // // // // //             height={70}
// // // // // //             className="mr-2"
// // // // // //           />
// // // // // //         </div>

// // // // // //         <div className="flex flex-col items-center text-center flex-1 mx-4">
// // // // // //           <Image
// // // // // //             src="/logo-mtc.png"
// // // // // //             alt="MTC Logo"
// // // // // //             width={300}
// // // // // //             height={60}
// // // // // //             className="mb-1 max-w-full h-auto"
// // // // // //           />
// // // // // //         </div>

// // // // // //         <div className="hidden md:flex items-center space-x-3">
// // // // // //           <Image src="/logo-Nhm1.png" alt="NHM" width={60} height={60} />
// // // // // //           <Image src="/logo_7.png" alt="Poshan Abhiyaan" width={90} height={70} />
// // // // // //           <Image src="/logo-unicef.png" alt="UNICEF" width={100} height={60} />

// // // // // //           {/* Accessibility Options */}
// // // // // //           <div className="flex flex-col text-xs bg-[#0b5a56] text-white rounded overflow-hidden shadow-md">
// // // // // //             <button className="hover:bg-[#084d49] px-2 py-1 font-bold transition-colors">
// // // // // //               A++
// // // // // //             </button>
// // // // // //             <button className="hover:bg-[#084d49] px-2 py-1 font-bold transition-colors">
// // // // // //               A
// // // // // //             </button>
// // // // // //             <button className="hover:bg-[#084d49] px-2 py-1 font-bold transition-colors">
// // // // // //               A−
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* ===== MOBILE MENU ===== */}
// // // // // //         <div className="flex md:hidden items-center">
// // // // // //           <Sheet open={open} onOpenChange={setOpen}>
// // // // // //             <SheetTrigger asChild>
// // // // // //               <Button variant="ghost" size="icon" className="text-[#00796B]">
// // // // // //                 <Menu className="h-6 w-6" />
// // // // // //               </Button>
// // // // // //             </SheetTrigger>
// // // // // //             <SheetContent side="right" className="w-64 bg-white">
// // // // // //               <SheetHeader>
// // // // // //                 <SheetTitle className="text-lg font-semibold text-[#00796B]">
// // // // // //                   Menu
// // // // // //                 </SheetTitle>
// // // // // //               </SheetHeader>

// // // // // //               <div className="mt-6 flex flex-col space-y-3">
// // // // // //                 {navLinks.map((item) =>
// // // // // //                   item.subMenu ? (
// // // // // //                     <div key={item.label}>
// // // // // //                       <p className="text-[#004D40] font-semibold mb-2">
// // // // // //                         {item.label}
// // // // // //                       </p>
// // // // // //                       <div className="ml-3 space-y-2">
// // // // // //                         {item.subMenu.map((sub) => (
// // // // // //                           <Link key={sub.label} href={sub.href}>
// // // // // //                             <Button
// // // // // //                               variant="ghost"
// // // // // //                               className="w-full justify-start text-sm text-[#004D40] hover:bg-[#E0F2F1] hover:text-[#00796B]"
// // // // // //                             >
// // // // // //                               {sub.label}
// // // // // //                             </Button>
// // // // // //                           </Link>
// // // // // //                         ))}
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   ) : (
// // // // // //                     <Link key={item.label} href={item.href}>
// // // // // //                       <Button
// // // // // //                         variant="ghost"
// // // // // //                         className="w-full justify-start text-[#004D40] hover:bg-[#E0F2F1] hover:text-[#00796B]"
// // // // // //                       >
// // // // // //                         {item.label}
// // // // // //                       </Button>
// // // // // //                     </Link>
// // // // // //                   )
// // // // // //                 )}

// // // // // //                 <div className="border-t pt-3 mt-3">
// // // // // //                   <p className="text-sm font-medium text-gray-700 mb-2">
// // // // // //                     Login As:
// // // // // //                   </p>
// // // // // //                   {loginRoles.map((role) => (
// // // // // //                     <Link key={role.label} href={role.href}>
// // // // // //                       <Button
// // // // // //                         variant="outline"
// // // // // //                         className="w-full justify-start text-[#004D40] border-[#00796B] hover:bg-[#E0F2F1] hover:text-[#00796B] mb-2"
// // // // // //                       >
// // // // // //                         {role.label}
// // // // // //                       </Button>
// // // // // //                     </Link>
// // // // // //                   ))}
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </SheetContent>
// // // // // //           </Sheet>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* ===== NAVIGATION BAR (Desktop Only) ===== */}
// // // // // //       <div className="hidden md:flex items-center justify-between bg-[#00796B] text-white px-6 py-2">
// // // // // //         <NavigationMenu>
// // // // // //           <NavigationMenuList className="flex space-x-1">
// // // // // //             {navLinks.map((item) =>
// // // // // //               item.subMenu ? (
// // // // // //                 <NavigationMenuItem key={item.label}>
// // // // // //                   <DropdownMenu>
// // // // // //                     <DropdownMenuTrigger asChild>
// // // // // //                       <Button
// // // // // //                         variant="ghost"
// // // // // //                         className="text-white hover:bg-[#00695C] px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
// // // // // //                       >
// // // // // //                         {item.label}
// // // // // //                         <ChevronDown className="h-4 w-4" />
// // // // // //                       </Button>
// // // // // //                     </DropdownMenuTrigger>
// // // // // //                     <DropdownMenuContent className="bg-[#004D40] text-white font-semibold border-none shadow-lg">
// // // // // //                       {item.subMenu.map((sub) => (
// // // // // //                         <DropdownMenuItem key={sub.label} asChild>
// // // // // //                           <Link
// // // // // //                             href={sub.href}
// // // // // //                             className="hover:bg-[#00695C] cursor-pointer transition-colors block px-2 py-1"
// // // // // //                           >
// // // // // //                             {sub.label}
// // // // // //                           </Link>
// // // // // //                         </DropdownMenuItem>
// // // // // //                       ))}
// // // // // //                     </DropdownMenuContent>
// // // // // //                   </DropdownMenu>
// // // // // //                 </NavigationMenuItem>
// // // // // //               ) : (
// // // // // //                 <NavigationMenuItem key={item.label}>
// // // // // //                   <NavigationMenuLink asChild>
// // // // // //                     <Link
// // // // // //                       href={item.href}
// // // // // //                       className="hover:bg-[#00695C] px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
// // // // // //                     >
// // // // // //                       {item.label}
// // // // // //                     </Link>
// // // // // //                   </NavigationMenuLink>
// // // // // //                 </NavigationMenuItem>
// // // // // //               )
// // // // // //             )}
// // // // // //           </NavigationMenuList>
// // // // // //         </NavigationMenu>

// // // // // //         {/* ===== LOGIN DROPDOWN ===== */}
// // // // // //         <DropdownMenu>
// // // // // //           <DropdownMenuTrigger asChild>
// // // // // //             <Button className="bg-[#FDD835] text-[#004D40] font-semibold hover:bg-[#FBC02D] transition-colors shadow-sm">
// // // // // //               LOGIN
// // // // // //             </Button>
// // // // // //           </DropdownMenuTrigger>
// // // // // //           <DropdownMenuContent className="bg-[#004D40] text-white font-semibold border-none shadow-lg">
// // // // // //             {loginRoles.map((role) => (
// // // // // //               <DropdownMenuItem key={role.label} asChild>
// // // // // //                 <Link
// // // // // //                   href={role.href}
// // // // // //                   className="hover:bg-[#00695C] cursor-pointer transition-colors block px-2 py-1"
// // // // // //                 >
// // // // // //                   {role.label}
// // // // // //                 </Link>
// // // // // //               </DropdownMenuItem>
// // // // // //             ))}
// // // // // //           </DropdownMenuContent>
// // // // // //         </DropdownMenu>
// // // // // //       </div>
// // // // // //     </header>
// // // // // //   );
// // // // // // }


// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import Image from "next/image";
// // // import Link from "next/link";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   NavigationMenu,
// // //   NavigationMenuItem,
// // //   NavigationMenuLink,
// // //   NavigationMenuList,
// // //   navigationMenuTriggerStyle,
// // // } from "@/components/ui/navigation-menu";
// // // import {
// // //   DropdownMenu,
// // //   DropdownMenuContent,
// // //   DropdownMenuItem,
// // //   DropdownMenuTrigger,
// // // } from "@/components/ui/dropdown-menu";
// // // import {
// // //   Sheet,
// // //   SheetContent,
// // //   SheetHeader,
// // //   SheetTitle,
// // //   SheetTrigger,
// // // } from "@/components/ui/sheet";
// // // import { Menu, ChevronDown, Accessibility, LogIn } from "lucide-react";

// // // export default function Header() {
// // //   const [open, setOpen] = useState(false);
// // //   const [scrolled, setScrolled] = useState(false);

// // //   // Handle scroll effect for the sticky header
// // //   useEffect(() => {
// // //     const handleScroll = () => setScrolled(window.scrollY > 20);
// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   const navLinks = [
// // //     { label: "Home", href: "/#home" },
// // //     {
// // //       label: "About",
// // //       subMenu: [
// // //         { label: "About Us", href: "#about" },
// // //         { label: "Message from Mission Director", href: "#message-director" },
// // //       ],
// // //     },
// // //     { label: "Resources", href: "/Resources/ShowResource" },
// // //     { label: "Gallery", href: "#gallery" },
// // //     { label: "Contact Us", href: "#contact-us" },
// // //   ];

// // //   const loginRoles = [
// // //     { label: "Administrator", href: "/admin" },
// // //     { label: "State User", href: "/state-user" },
// // //     { label: "District User", href: "/district-user" },
// // //     { label: "MTC User", href: "/mtc-user" },
// // //   ];

// // //   return (
// // //     <>
// // //       {/* ====== TOP THIN UTILITY BAR ====== */}
// // //       <div className="w-full bg-slate-50 border-b border-slate-200 py-1.5 px-6 hidden lg:block">
// // //         <div className="container mx-auto flex justify-between items-center">
// // //           <div className="flex items-center gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
// // //             <Image src="/logo-Nhm1.png" alt="NHM" width={40} height={40} className="object-contain" />
// // //             <Image src="/logo_7.png" alt="Poshan Abhiyaan" width={60} height={40} className="object-contain" />
// // //             <Image src="/logo-unicef.png" alt="UNICEF" width={70} height={40} className="object-contain" />
// // //           </div>
          
// // //           <div className="flex items-center gap-4">
// // //             <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-0.5">
// // //               <Accessibility className="w-3.5 h-3.5 text-slate-400" />
// // //               <button className="text-[10px] font-bold px-1 hover:text-teal-600">A-</button>
// // //               <button className="text-[10px] font-bold px-1 hover:text-teal-600 border-x">A</button>
// // //               <button className="text-[10px] font-bold px-1 hover:text-teal-600">A+</button>
// // //             </div>
// // //             <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">Jharkhand Health Portal</span>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* ====== MAIN NAVIGATION ====== */}
// // //       <header 
// // //         className={`w-full sticky top-0 z-50 transition-all duration-300 ${
// // //           scrolled 
// // //           ? "bg-white/80 backdrop-blur-md shadow-lg py-2" 
// // //           : "bg-white py-4"
// // //         }`}
// // //       >
// // //         <div className="container mx-auto px-6 flex items-center justify-between">
          
// // //           {/* Brand/Logo Area */}
// // //           <Link href="/" className="flex items-center gap-4 group">
// // //             <div className="relative w-12 h-12 lg:w-14 lg:h-14 overflow-hidden rounded-xl bg-slate-50 p-1 shadow-sm group-hover:shadow-md transition-all">
// // //               <Image
// // //                 src="/logo-jharkhand.png"
// // //                 alt="Govt Emblem"
// // //                 fill
// // //                 className="object-contain p-1"
// // //               />
// // //             </div>
// // //             <div className="flex flex-col">
// // //               <span className="text-xs font-black text-teal-700 tracking-widest uppercase leading-none mb-1">MTC Jharkhand</span>
// // //               <span className="text-lg lg:text-xl font-bold text-slate-900 leading-none">Malnutrition Treatment</span>
// // //             </div>
// // //           </Link>

// // //           {/* Desktop Navigation */}
// // //           <div className="hidden lg:flex items-center gap-2">
// // //             <NavigationMenu>
// // //               <NavigationMenuList className="gap-1">
// // //                 {navLinks.map((item) => (
// // //                   <NavigationMenuItem key={item.label}>
// // //                     {item.subMenu ? (
// // //                       <DropdownMenu>
// // //                         <DropdownMenuTrigger asChild>
// // //                           <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors">
// // //                             {item.label} <ChevronDown className="w-4 h-4 opacity-50" />
// // //                           </button>
// // //                         </DropdownMenuTrigger>
// // //                         <DropdownMenuContent className="w-56 p-2 bg-white rounded-2xl shadow-xl border-slate-100 animate-in fade-in zoom-in-95">
// // //                           {item.subMenu.map((sub) => (
// // //                             <DropdownMenuItem key={sub.label} asChild>
// // //                               <Link href={sub.href} className="w-full px-4 py-3 text-sm font-medium rounded-xl hover:bg-teal-50 hover:text-teal-700 transition-all cursor-pointer block">
// // //                                 {sub.label}
// // //                               </Link>
// // //                             </DropdownMenuItem>
// // //                           ))}
// // //                         </DropdownMenuContent>
// // //                       </DropdownMenu>
// // //                     ) : (
// // //                       <Link href={item.href} passHref legacyBehavior>
// // //                         <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent! font-bold text-slate-600 hover:text-teal-600`}>
// // //                           {item.label}
// // //                         </NavigationMenuLink>
// // //                       </Link>
// // //                     )}
// // //                   </NavigationMenuItem>
// // //                 ))}
// // //               </NavigationMenuList>
// // //             </NavigationMenu>

// // //             <div className="h-6 w-px bg-slate-200 mx-4"></div>

// // //             {/* Login CTA */}
// // //             <DropdownMenu>
// // //               <DropdownMenuTrigger asChild>
// // //                 <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-6 font-bold shadow-lg shadow-teal-100 flex gap-2">
// // //                   <LogIn className="w-4 h-4" />
// // //                   Staff Login
// // //                 </Button>
// // //               </DropdownMenuTrigger>
// // //               <DropdownMenuContent align="end" className="w-56 p-2 bg-slate-900 text-white rounded-2xl shadow-2xl border-none">
// // //                 <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 mb-1">Select Portal</div>
// // //                 {loginRoles.map((role) => (
// // //                   <DropdownMenuItem key={role.label} asChild>
// // //                     <Link href={role.href} className="w-full px-4 py-3 text-sm font-bold rounded-xl hover:bg-teal-500 hover:text-white transition-all cursor-pointer block">
// // //                       {role.label}
// // //                     </Link>
// // //                   </DropdownMenuItem>
// // //                 ))}
// // //               </DropdownMenuContent>
// // //             </DropdownMenu>
// // //           </div>

// // //           {/* Mobile Navigation Trigger */}
// // //           <div className="lg:hidden flex items-center gap-3">
// // //              <Sheet open={open} onOpenChange={setOpen}>
// // //               <SheetTrigger asChild>
// // //                 <Button variant="ghost" size="icon" className="rounded-xl bg-slate-100">
// // //                   <Menu className="h-6 w-6 text-slate-600" />
// // //                 </Button>
// // //               </SheetTrigger>
// // //               <SheetContent side="right" className="w-full sm:w-[350px] p-0 border-none bg-white">
// // //                 <div className="bg-teal-700 p-8 text-white">
// // //                   <SheetHeader className="text-left mb-0">
// // //                     <SheetTitle className="text-white text-2xl font-black">Menu</SheetTitle>
// // //                   </SheetHeader>
// // //                   <p className="text-teal-100 text-sm opacity-80">MTC Jharkhand Resources</p>
// // //                 </div>
                
// // //                 <div className="p-6 space-y-2">
// // //                   {navLinks.map((item) => (
// // //                     <div key={item.label} className="border-b border-slate-50 last:border-0 pb-2">
// // //                       {item.subMenu ? (
// // //                         <div className="py-2">
// // //                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-4">{item.label}</p>
// // //                           {item.subMenu.map((sub) => (
// // //                             <Link key={sub.label} href={sub.href} onClick={() => setOpen(false)}>
// // //                               <Button variant="ghost" className="w-full justify-start text-lg font-bold text-slate-700 hover:bg-teal-50 hover:text-teal-600 py-6">
// // //                                 {sub.label}
// // //                               </Button>
// // //                             </Link>
// // //                           ))}
// // //                         </div>
// // //                       ) : (
// // //                         <Link href={item.href} onClick={() => setOpen(false)}>
// // //                           <Button variant="ghost" className="w-full justify-start text-lg font-bold text-slate-700 hover:bg-teal-50 hover:text-teal-600 py-6">
// // //                             {item.label}
// // //                           </Button>
// // //                         </Link>
// // //                       )}
// // //                     </div>
// // //                   ))}
// // //                 </div>

// // //                 <div className="absolute bottom-0 left-0 w-full p-6 bg-slate-50 border-t border-slate-100">
// // //                   <p className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">Login to Dashboard</p>
// // //                   <div className="grid grid-cols-2 gap-2">
// // //                     {loginRoles.map((role) => (
// // //                       <Link key={role.label} href={role.href} className="text-center bg-white border border-slate-200 py-3 rounded-xl text-xs font-black text-slate-600 hover:border-teal-500 hover:text-teal-600 transition-all">
// // //                         {role.label}
// // //                       </Link>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               </SheetContent>
// // //             </Sheet>
// // //           </div>

// // //         </div>
// // //       </header>
// // //     </>
// // //   );
// // // }


// // // // "use client";

// // // // import { useState, useEffect } from "react";
// // // // import Image from "next/image";
// // // // import Link from "next/link";
// // // // import { Button, Dropdown } from "@heroui/react";
// // // // import { LogIn, Shield, Map, MapPin, Hospital } from "lucide-react";
// // // 87
// // // // export default function Header() {
// // // //   const [scrolled, setScrolled] = useState(false);

// // // //   // Re-adding the scroll listener since the native Navbar wrapper is gone in v3
// // // //   useEffect(() => {
// // // //     const handleScroll = () => setScrolled(window.scrollY > 20);
// // // //     window.addEventListener("scroll", handleScroll);
// // // //     return () => window.removeEventListener("scroll", handleScroll);
// // // //   }, []);

// // // //   const loginRoles = [
// // // //     { key: "admin", label: "Administrator", href: "/admin", icon: Shield },
// // // //     { key: "state", label: "State User", href: "/state-user", icon: Map },
// // // //     { key: "district", label: "District User", href: "/district-user", icon: MapPin },
// // // //     { key: "mtc", label: "MTC User", href: "/mtc-user", icon: Hospital },
// // // //   ];

// // // //   return (
// // // //     <header
// // // //       className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
// // // //         scrolled
// // // //           ? "bg-white/80 backdrop-blur-md shadow-sm border-slate-200 py-3"
// // // //           : "bg-white border-transparent py-5"
// // // //       }`}
// // // //     >
// // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
// // // //         {/* ====== BRANDING / LOGO ====== */}
// // // //         <Link href="/" className="flex items-center gap-3 group">
// // // //           <div className="relative w-10 h-10 md:w-12 md:h-12 drop-shadow-sm transition-transform group-hover:scale-105">
// // // //             <Image
// // // //               src="/logo-jharkhand-govt.png"
// // // //               alt="Govt Emblem"
// // // //               fill
// // // //               className="object-contain"
// // // //             />
// // // //           </div>
// // // //           <div className="flex flex-col">
// // // //             <p className="font-black text-slate-900 text-lg md:text-xl leading-none tracking-tight">
// // // //               MTC Jharkhand
// // // //             </p>
// // // //             <p className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
// // // //               Health Portal
// // // //             </p>
// // // //           </div>
// // // //         </Link>

// // // //         {/* ====== LOGIN DROPDOWN ====== */}
// // // //         <Dropdown>
// // // //           <Dropdown.Trigger>
// // // //             <Button 
// // // //               variant="primary" 
// // // //               className="rounded-full px-6 shadow-md font-bold"
// // // //             >
// // // //               <LogIn className="w-4 h-4 mr-2" />
// // // //               <span className="hidden sm:inline">Portal Login</span>
// // // //               <span className="sm:hidden">Login</span>
// // // //             </Button>
// // // //           </Dropdown.Trigger>
          
// // // //           <Dropdown.Popover className="min-w-[240px] p-1 rounded-2xl shadow-xl border border-slate-100">
// // // //             <Dropdown.Menu aria-label="Login Roles">
// // // //               {loginRoles.map((role) => {
// // // //                 const Icon = role.icon;
// // // //                 return (
// // // //                   <Dropdown.Item
// // // //                     key={role.key}
// // // //                     id={role.key}
// // // //                     href={role.href}
// // // //                     textValue={role.label}
// // // //                     className="py-2.5 px-2 rounded-xl transition-colors hover:bg-slate-50"
// // // //                   >
// // // //                     <div className="flex items-center gap-3">
// // // //                       <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
// // // //                         <Icon className="w-4 h-4" />
// // // //                       </div>
// // // //                       <span className="font-semibold text-sm text-slate-700">
// // // //                         {role.label}
// // // //                       </span>
// // // //                     </div>
// // // //                   </Dropdown.Item>
// // // //                 );
// // // //               })}
// // // //             </Dropdown.Menu>
// // // //           </Dropdown.Popover>
// // // //         </Dropdown>

// // // //       </div>
// // // //     </header>
// // // //   );
// // // // }

// // // // "use client";

// // // // import { useState, useEffect } from "react";
// // // // import Image from "next/image";
// // // // import Link from "next/link";
// // // // import { Button } from "@/components/ui/button";
// // // // import {
// // // //   NavigationMenu,
// // // //   NavigationMenuItem,
// // // //   NavigationMenuLink,
// // // //   NavigationMenuList,
// // // //   navigationMenuTriggerStyle,
// // // // } from "@/components/ui/navigation-menu";
// // // // import {
// // // //   DropdownMenu,
// // // //   DropdownMenuContent,
// // // //   DropdownMenuItem,
// // // //   DropdownMenuTrigger,
// // // // } from "@/components/ui/dropdown-menu";
// // // // import {
// // // //   Sheet,
// // // //   SheetContent,
// // // //   SheetHeader,
// // // //   SheetTitle,
// // // //   SheetTrigger,
// // // // } from "@/components/ui/sheet";
// // // // import { Menu, ChevronDown, Accessibility, LogIn } from "lucide-react";

// // // // export default function Header() {
// // // //   const [open, setOpen] = useState(false);
// // // //   const [scrolled, setScrolled] = useState(false);

// // // //   // Handle scroll effect for the sticky header
// // // //   useEffect(() => {
// // // //     const handleScroll = () => setScrolled(window.scrollY > 10);
// // // //     window.addEventListener("scroll", handleScroll);
// // // //     return () => window.removeEventListener("scroll", handleScroll);
// // // //   }, []);

// // // //   const navLinks = [
// // // //     { label: "Home", href: "/#home" },
// // // //     {
// // // //       label: "About",
// // // //       subMenu: [
// // // //         { label: "About Us", href: "#about" },
// // // //         { label: "Message from Mission Director", href: "#message-director" },
// // // //       ],
// // // //     },
// // // //     { label: "Resources", href: "/Resources/ShowResource" },
// // // //     { label: "Gallery", href: "#gallery" },
// // // //     { label: "Contact Us", href: "#contact-us" },
// // // //   ];

// // // //   const loginRoles = [
// // // //     { label: "Administrator", href: "/admin" },
// // // //     { label: "State User", href: "/state-user" },
// // // //     { label: "District User", href: "/district-user" },
// // // //     { label: "MTC User", href: "/mtc-user" },
// // // //   ];

// // // //   return (
// // // //     <>
// // // //       {/* ====== TOP UTILITY BAR (PRO SOFTWARE DARK AESTHETIC) ====== */}
// // // //       <div className="w-full bg-zinc-950 border-b border-zinc-800 py-3 hidden lg:block">
// // // //         <div className="container mx-auto px-8 flex justify-between items-center text-base text-zinc-400">
// // // //           <div className="flex items-center gap-6">
// // // //             <div className="bg-zinc-100/10 p-1.5 rounded-md hover:bg-zinc-100/20 transition">
// // // //               <Image src="/logo-Nhm1.png" alt="NHM" width={40} height={40} className="object-contain" />
// // // //             </div>
// // // //             <div className="bg-zinc-100/10 p-1.5 rounded-md hover:bg-zinc-100/20 transition">
// // // //               <Image src="/logo_7.png" alt="Poshan Abhiyaan" width={55} height={40} className="object-contain" />
// // // //             </div>
// // // //             <div className="bg-zinc-100/10 p-1.5 rounded-md hover:bg-zinc-100/20 transition">
// // // //               <Image src="/logo-unicef.png" alt="UNICEF" width={70} height={40} className="object-contain" />
// // // //             </div>
// // // //           </div>
          
// // // //           <div className="flex items-center gap-6">
// // // //             <span className="font-semibold text-zinc-300 tracking-wide">Jharkhand Health Portal</span>
// // // //             <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded overflow-hidden shadow-sm">
// // // //               <div className="px-3 py-1.5 bg-zinc-950 border-r border-zinc-700">
// // // //                 <Accessibility className="w-5 h-5 text-cyan-500" />
// // // //               </div>
// // // //               <button className="px-3 py-1.5 hover:bg-zinc-800 hover:text-cyan-400 text-zinc-300 font-bold text-sm transition-colors">A-</button>
// // // //               <button className="px-3 py-1.5 hover:bg-zinc-800 hover:text-cyan-400 text-zinc-300 font-bold text-sm border-l border-r border-zinc-700 transition-colors">A</button>
// // // //               <button className="px-3 py-1.5 hover:bg-zinc-800 hover:text-cyan-400 text-zinc-300 font-bold text-sm transition-colors">A+</button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* ====== MAIN NAVIGATION (DARK MODE & CYAN ACCENTS) ====== */}
// // // //       <header 
// // // //         className={`w-full sticky top-0 z-50 transition-all duration-200 bg-zinc-900/95 backdrop-blur-md ${
// // // //           scrolled ? "shadow-2xl shadow-black/50 py-3" : "border-b border-zinc-800 py-5"
// // // //         }`}
// // // //       >
// // // //         <div className="container mx-auto px-8 flex items-center justify-between">
          
// // // //           {/* Brand/Logo Area */}
// // // //           <Link href="/" className="flex items-center gap-4 group">
// // // //             <div className="bg-zinc-100/10 p-2 rounded-lg group-hover:bg-zinc-100/20 transition">
// // // //               <Image
// // // //                 src="/logo-jharkhand.png"
// // // //                 alt="Govt Emblem"
// // // //                 width={56}
// // // //                 height={56}
// // // //                 className="object-contain"
// // // //               />
// // // //             </div>
// // // //             <div className="flex flex-col">
// // // //               <span className="text-2xl font-extrabold text-zinc-100 tracking-tight leading-tight group-hover:text-cyan-400 transition-colors">MTC Jharkhand</span>
// // // //               <span className="text-base text-zinc-500 font-medium leading-tight">Malnutrition Treatment</span>
// // // //             </div>
// // // //           </Link>

// // // //           {/* Desktop Navigation */}
// // // //           <div className="hidden lg:flex items-center gap-6">
// // // //             <NavigationMenu>
// // // //               <NavigationMenuList className="gap-3">
// // // //                 {navLinks.map((item) => (
// // // //                   <NavigationMenuItem key={item.label}>
// // // //                     {item.subMenu ? (
// // // //                       <DropdownMenu>
// // // //                         <DropdownMenuTrigger asChild>
// // // //                           <button className="flex items-center gap-1.5 px-4 py-2.5 text-base font-semibold text-zinc-300 hover:text-cyan-400 rounded-md hover:bg-zinc-800 transition-colors">
// // // //                             {item.label} <ChevronDown className="w-5 h-5 opacity-70" />
// // // //                           </button>
// // // //                         </DropdownMenuTrigger>
// // // //                         <DropdownMenuContent className="w-60 bg-zinc-900 border border-zinc-700 shadow-2xl rounded-md p-2">
// // // //                           {item.subMenu.map((sub) => (
// // // //                             <DropdownMenuItem key={sub.label} asChild>
// // // //                               <Link href={sub.href} className="w-full px-4 py-3 text-base text-zinc-300 hover:bg-zinc-800 hover:text-cyan-400 rounded-sm cursor-pointer block font-medium transition-colors">
// // // //                                 {sub.label}
// // // //                               </Link>
// // // //                             </DropdownMenuItem>
// // // //                           ))}
// // // //                         </DropdownMenuContent>
// // // //                       </DropdownMenu>
// // // //                     ) : (
// // // //                       <Link href={item.href} passHref legacyBehavior>
// // // //                         <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-zinc-300 hover:text-cyan-400 hover:bg-zinc-800 text-base font-semibold px-4 py-2.5 h-auto transition-colors`}>
// // // //                           {item.label}
// // // //                         </NavigationMenuLink>
// // // //                       </Link>
// // // //                     )}
// // // //                   </NavigationMenuItem>
// // // //                 ))}
// // // //               </NavigationMenuList>
// // // //             </NavigationMenu>

// // // //             <div className="h-8 w-px bg-zinc-800 mx-2"></div>

// // // //             {/* Login CTA (Neon Cyan Accent) */}
// // // //             <DropdownMenu>
// // // //               <DropdownMenuTrigger asChild>
// // // //                 <Button className="bg-cyan-600 hover:bg-cyan-500 text-zinc-950 text-base font-extrabold rounded-md px-6 py-6 flex gap-2 items-center shadow-lg shadow-cyan-900/20 transition-all">
// // // //                   <LogIn className="w-5 h-5" />
// // // //                   Staff Login
// // // //                 </Button>
// // // //               </DropdownMenuTrigger>
// // // //               <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border border-zinc-700 shadow-2xl rounded-md p-2">
// // // //                 <div className="px-4 py-2 text-xs font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-800 mb-1">
// // // //                   Select Portal
// // // //                 </div>
// // // //                 {loginRoles.map((role) => (
// // // //                   <DropdownMenuItem key={role.label} asChild>
// // // //                     <Link href={role.href} className="w-full px-4 py-3 text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-cyan-400 rounded-sm cursor-pointer block transition-colors">
// // // //                       {role.label}
// // // //                     </Link>
// // // //                   </DropdownMenuItem>
// // // //                 ))}
// // // //               </DropdownMenuContent>
// // // //             </DropdownMenu>
// // // //           </div>

// // // //           {/* Mobile Navigation Trigger */}
// // // //           <div className="lg:hidden flex items-center gap-4">
// // // //              <Sheet open={open} onOpenChange={setOpen}>
// // // //               <SheetTrigger asChild>
// // // //                 <Button variant="outline" size="icon" className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-cyan-400 w-12 h-12">
// // // //                   <Menu className="h-6 w-6" />
// // // //                 </Button>
// // // //               </SheetTrigger>
// // // //               <SheetContent side="right" className="w-[340px] sm:w-[400px] p-0 bg-zinc-950 border-l border-zinc-800">
// // // //                 <SheetHeader className="p-5 border-b border-zinc-800 text-left bg-zinc-900">
// // // //                   <SheetTitle className="text-xl font-bold text-zinc-100">Menu</SheetTitle>
// // // //                 </SheetHeader>
                
// // // //                 <div className="flex flex-col p-5 overflow-y-auto max-h-[calc(100vh-160px)]">
// // // //                   {navLinks.map((item) => (
// // // //                     <div key={item.label} className="border-b border-zinc-800/50 last:border-0">
// // // //                       {item.subMenu ? (
// // // //                         <div className="py-3">
// // // //                           <p className="text-base font-bold text-zinc-100 py-2 px-4">{item.label}</p>
// // // //                           <div className="flex flex-col gap-1 pl-4">
// // // //                             {item.subMenu.map((sub) => (
// // // //                               <Link key={sub.label} href={sub.href} onClick={() => setOpen(false)}>
// // // //                                 <Button variant="ghost" className="w-full justify-start text-base font-medium text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900 py-5 transition-colors">
// // // //                                   {sub.label}
// // // //                                 </Button>
// // // //                               </Link>
// // // //                             ))}
// // // //                           </div>
// // // //                         </div>
// // // //                       ) : (
// // // //                         <Link href={item.href} onClick={() => setOpen(false)}>
// // // //                           <Button variant="ghost" className="w-full justify-start text-base font-bold text-zinc-300 hover:text-cyan-400 hover:bg-zinc-900 py-7 transition-colors">
// // // //                             {item.label}
// // // //                           </Button>
// // // //                         </Link>
// // // //                       )}
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>

// // // //                 <div className="absolute bottom-0 left-0 w-full p-5 bg-zinc-900 border-t border-zinc-800">
// // // //                   <p className="text-xs font-bold text-zinc-500 uppercase mb-4 tracking-wider">Staff Login</p>
// // // //                   <div className="grid grid-cols-2 gap-3">
// // // //                     {loginRoles.map((role) => (
// // // //                       <Link key={role.label} href={role.href} className="text-center bg-zinc-950 border border-zinc-700 py-3 rounded text-sm font-semibold text-zinc-300 hover:border-cyan-500 hover:text-cyan-400 transition-colors shadow-sm">
// // // //                         {role.label}
// // // //                       </Link>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //               </SheetContent>
// // // //             </Sheet>
// // // //           </div>

// // // //         </div>
// // // //       </header>
// // // //     </>
// // // //   );
// // // // }

// // "use client";

// // import { useState } from "react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { Button } from "@/components/ui/button";
// // import {
// //   NavigationMenu,
// //   NavigationMenuItem,
// //   NavigationMenuLink,
// //   NavigationMenuList,
// // } from "@/components/ui/navigation-menu";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetHeader,
// //   SheetTitle,
// //   SheetTrigger,
// // } from "@/components/ui/sheet";
// // import { Menu, ChevronDown, LockKeyhole } from "lucide-react";

// // export default function Header() {
// //   const [open, setOpen] = useState(false);

// //   const navLinks = [
// //     { label: "Home", href: "/#home" },
// //     {
// //       label: "About",
// //       subMenu: [
// //         { label: "About Us", href: "#about" },
// //         { label: "Message from Mission Director", href: "#message-director" },
// //       ],
// //     },
// //     { label: "Resources", href: "/Resources/ShowResource" },
// //     { label: "Gallery", href: "#gallery" },
// //     { label: "Contact Us", href: "#contact-us" },
// //   ];

// //   const loginRoles = [
// //     { label: "ADMINISTRATOR", href: "/dashboards/admin" },
// //     { label: "STATE USER", href: "/dashboards/state-user" },
// //     { label: "DISTRICT USER", href: "/dashboards/district-user" },
// //     { label: "MTC USER", href: "/dashboards/mtc-user" },
// //   ];

// //   return (
// //     <header className="w-full font-sans flex flex-col shadow-lg">
      
// //       {/* ====== TIER 1: UTILITY & LOGIN BAR ====== */}
// //       <div className="bg-[#00332A] text-gray-200 py-1.5 px-4 lg:px-8 flex justify-between items-center text-xs sm:text-sm">
// //         <div className="hidden md:block font-medium tracking-wide">
// //           Government of Jharkhand | Tracking of Children with Severe Acute Malnutrition
// //         </div>
        
// //         <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
// //           {/* Accessibility Options */}
// //           <div className="flex items-center bg-black/20 border border-white/20 rounded">
// //             <button className="px-2.5 py-1 hover:text-white hover:bg-black/30 transition-colors">A+</button>
// //             <button className="px-2.5 py-1 border-l border-white/20 hover:text-white hover:bg-black/30 transition-colors">A</button>
// //             <button className="px-2.5 py-1 border-l border-white/20 hover:text-white hover:bg-black/30 transition-colors">A-</button>
// //           </div>

// //           {/* Secure Login */}
// //           <DropdownMenu>
// //             <DropdownMenuTrigger asChild>
// //               <Button size="sm" className="bg-[#FBC02D] text-black hover:bg-[#FDD835] font-bold h-7 px-3 text-xs rounded shadow-none">
// //                 <LockKeyhole className="w-3 h-3 mr-1.5" />
// //                 LOGIN PORTAL
// //               </Button>
// //             </DropdownMenuTrigger>
// //             <DropdownMenuContent align="end" className="bg-white text-gray-900 border-t-4 border-t-[#00796B] rounded-none shadow-xl min-w-[200px]">
// //               <div className="px-3 py-2 text-xs font-bold text-gray-400 border-b mb-1">SELECT USER ROLE</div>
// //               {loginRoles.map((role) => (
// //                 <DropdownMenuItem key={role.label} asChild>
// //                   <Link href={role.href} className="hover:bg-slate-100 cursor-pointer rounded-none py-2 font-medium block w-full">
// //                     {role.label}
// //                   </Link>
// //                 </DropdownMenuItem>
// //               ))}
// //             </DropdownMenuContent>
// //           </DropdownMenu>
// //         </div>
// //       </div>

// //       {/* ====== TIER 2: BRANDING & LOGOS ====== */}
// //       <div className="bg-white py-4 px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        
// //         {/* Left Branding */}
// //         <div className="flex items-center gap-4 w-full lg:w-auto justify-center lg:justify-start">
// //           <Image
// //             src="/logo-jharkhand-govt.png"
// //             alt="Government Emblem"
// //             width={80}
// //             height={80}
// //             className="flex-shrink-0"
// //           />
// //           <Image
// //             src="/logo-mtc.png"
// //             alt="MTC Logo"
// //             width={340}
// //             height={68}
// //             className="object-contain max-w-[200px] sm:max-w-xs md:max-w-sm"
// //           />
// //         </div>

// //         {/* Right Partner Logos */}
// //         <div className="hidden md:flex items-center justify-center gap-6 divide-x divide-gray-200">
// //           <div className="pl-6">
// //             <Image src="/logo-Nhm1.png" alt="NHM" width={65} height={65} />
// //           </div>
// //           <div className="pl-6">
// //             <Image src="/logo_7.png" alt="Poshan Abhiyaan" width={95} height={70} />
// //           </div>
// //           <div className="pl-6">
// //             <Image src="/logo-unicef.png" alt="UNICEF" width={110} height={65} />
// //           </div>
// //         </div>
// //       </div>

// //       {/* ====== TIER 3: FULL-WIDTH NAVIGATION ====== */}
// //       <div className="bg-[#00796B] sticky top-0 z-50">
// //         <div className="px-4 lg:px-8">
          
// //           {/* Desktop Nav */}
// //           <div className="hidden md:flex">
// //             <NavigationMenu>
// //               <NavigationMenuList className="flex space-x-1">
// //                 {navLinks.map((item) =>
// //                   item.subMenu ? (
// //                     <NavigationMenuItem key={item.label}>
// //                       <DropdownMenu>
// //                         <DropdownMenuTrigger asChild>
// //                           <Button
// //                             variant="ghost"
// //                             className="text-white hover:bg-[#004D40] hover:text-white rounded-none h-14 px-6 font-semibold flex items-center gap-2 border-r border-white/10"
// //                           >
// //                             {item.label}
// //                             <ChevronDown className="h-4 w-4" />
// //                           </Button>
// //                         </DropdownMenuTrigger>
// //                         <DropdownMenuContent className="bg-white rounded-none border-t-4 border-t-[#004D40] shadow-lg min-w-[220px] p-0">
// //                           {item.subMenu.map((sub) => (
// //                             <DropdownMenuItem key={sub.label} asChild>
// //                               <Link href={sub.href} className="hover:bg-slate-50 cursor-pointer rounded-none py-3 px-4 border-b border-gray-100 last:border-0 font-medium block w-full">
// //                                 {sub.label}
// //                               </Link>
// //                             </DropdownMenuItem>
// //                           ))}
// //                         </DropdownMenuContent>
// //                       </DropdownMenu>
// //                     </NavigationMenuItem>
// //                   ) : (
// //                     <NavigationMenuItem key={item.label}>
// //                       <NavigationMenuLink asChild>
// //                         <Link href={item.href} className="text-white hover:bg-[#004D40] rounded-none h-14 px-6 font-semibold flex items-center border-r border-white/10 transition-colors block w-full">
// //                           {item.label}
// //                         </Link>
// //                       </NavigationMenuLink>
// //                     </NavigationMenuItem>
// //                   )
// //                 )}
// //               </NavigationMenuList>
// //             </NavigationMenu>
// //           </div>

// //           {/* Mobile Menu Trigger (Inside the Teal Bar) */}
// //           <div className="md:hidden flex items-center justify-between h-14">
// //             <span className="text-white font-semibold tracking-wide uppercase text-sm">Navigation Menu</span>
// //             <Sheet open={open} onOpenChange={setOpen}>
// //               <SheetTrigger asChild>
// //                 <Button variant="ghost" size="icon" className="text-white hover:bg-[#004D40]">
// //                   <Menu className="h-6 w-6" />
// //                 </Button>
// //               </SheetTrigger>
// //               <SheetContent side="left" className="w-[80%] max-w-sm bg-white p-0">
// //                 <SheetHeader className="bg-[#00332A] p-4 text-left">
// //                   <SheetTitle className="text-white font-bold text-lg">Menu</SheetTitle>
// //                 </SheetHeader>

// //                 <div className="flex flex-col py-2">
// //                   {navLinks.map((item) =>
// //                     item.subMenu ? (
// //                       <div key={item.label} className="border-b border-gray-100 last:border-0">
// //                         <div className="px-6 py-3 font-bold text-gray-400 text-xs uppercase tracking-wider bg-slate-50">
// //                           {item.label}
// //                         </div>
// //                         <div className="flex flex-col">
// //                           {item.subMenu.map((sub) => (
// //                             <Link key={sub.label} href={sub.href} onClick={() => setOpen(false)} className="w-full text-left text-[#004D40] font-medium rounded-none px-6 py-4 hover:bg-[#E0F2F1] hover:text-[#00796B] transition-colors block">
// //                               {sub.label}
// //                             </Link>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     ) : (
// //                       <div key={item.label} className="border-b border-gray-100 last:border-0">
// //                         <Link href={item.href} onClick={() => setOpen(false)} className="w-full text-left text-[#004D40] font-bold rounded-none px-6 py-4 hover:bg-[#E0F2F1] block transition-colors">
// //                           {item.label}
// //                         </Link>
// //                       </div>
// //                     )
// //                   )}
// //                 </div>
// //               </SheetContent>
// //             </Sheet>
// //           </div>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Menu, ChevronDown, LockKeyhole } from "lucide-react";

// export default function Header() {
//   const [open, setOpen] = useState(false);

//   const navLinks = [
//     { label: "Home", href: "/#home" },
//     {
//       label: "About",
//       subMenu: [
//         { label: "About Us", href: "/landing-page/about" },
//         { label: "Message from Mission Director", href: "/landing-page/message-director" },
//       ],
//     },
//     { label: "Resources", href: "/landing-page/Resources/ShowResource" },
//     { label: "Gallery", href: "/landing-page/gallery" },
//     { label: "Contact Us", href: "/landing-page/contact-us" },
//     { label: "Calculator", href: "/landing-page/calculator" },
//   ];

//   const loginRoles = [
//     { label: "ADMINISTRATOR", href: "/admin" },
//     { label: "STATE USER", href: "/state-user" },
//     { label: "DISTRICT USER", href: "/district-user" },
//     { label: "MTC USER", href: "/mtc-user" },
//   ];

//   return (
//     <header className="w-full font-sans flex flex-col shadow-2xl relative z-50">
      
//       {/* ====== TIER 1: UTILITY & LOGIN BAR ====== */}
//       <div className="bg-slate-950 text-slate-300 py-1.5 px-4 lg:px-8 flex justify-between items-center text-xs sm:text-sm border-b border-white/5">
//         <div className="hidden md:block font-medium tracking-wider text-slate-400">
//           Government of Jharkhand <span className="mx-2 text-slate-600">|</span> 
//           <span className="text-slate-200">Tracking of Children with Severe Acute Malnutrition</span>
//         </div>
        
//         <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
//           {/* Accessibility Options */}
//           <div className="flex items-center bg-white/5 border border-white/10 rounded-md overflow-hidden backdrop-blur-sm">
//             <button className="px-3 py-1 hover:text-white hover:bg-white/10 transition-all font-medium">A+</button>
//             <button className="px-3 py-1 border-l border-white/10 hover:text-white hover:bg-white/10 transition-all font-medium">A</button>
//             <button className="px-3 py-1 border-l border-white/10 hover:text-white hover:bg-white/10 transition-all font-medium">A-</button>
//           </div>

//           {/* Secure Login */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button 
//                 size="sm" 
//                 className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 hover:from-amber-300 hover:to-orange-400 font-bold h-8 px-4 text-xs rounded-md border-none shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300"
//               >
//                 <LockKeyhole className="w-3.5 h-3.5 mr-2" />
//                 LOGIN 
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="bg-white text-slate-800 border-0 border-t-4 border-t-violet-600 rounded-b-lg shadow-2xl min-w-[220px] p-1">
//               <div className="px-3 py-2 text-[10px] font-extrabold text-slate-400 tracking-widest border-b mb-1">SELECT USER ROLE</div>
//               {loginRoles.map((role) => (
//                 <DropdownMenuItem key={role.label} asChild>
//                   <Link href={role.href} className="hover:bg-violet-50 hover:text-violet-700 cursor-pointer rounded-md py-2.5 px-3 font-semibold transition-colors block w-full text-sm">
//                     {role.label}
//                   </Link>
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       {/* ====== TIER 2: BRANDING & LOGOS ====== */}
//       {/* Added a subtle radial gradient background to make the white feel less flat */}
//       <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white py-5 px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-slate-100">
        
//         {/* Left Branding */}
//         <div className="flex items-center gap-5 w-full lg:w-auto justify-center lg:justify-start">
//           <div className="p-2 bg-white rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
//             <Image
//               src="/logo-jharkhand-govt.png"
//               alt="Government Emblem"
//               width={75}
//               height={75}
//               className="flex-shrink-0"
//             />
//           </div>
//           <Image
//             src="/logo-mtc.png"
//             alt="MTC Logo"
//             width={340}
//             height={68}
//             className="object-contain max-w-[200px] sm:max-w-xs md:max-w-sm drop-shadow-sm"
//           />
//         </div>

//         {/* Right Partner Logos */}
//         <div className="hidden md:flex items-center justify-center gap-8 divide-x divide-slate-200">
//           <div className="pl-8 transition-transform hover:scale-105 duration-300">
//             <Image src="/logo-Nhm1.png" alt="NHM" width={65} height={65} className="drop-shadow-sm" />
//           </div>
//           <div className="pl-8 transition-transform hover:scale-105 duration-300">
//             <Image src="/logo_7.png" alt="Poshan Abhiyaan" width={95} height={70} className="drop-shadow-sm" />
//           </div>
//           <div className="pl-8 transition-transform hover:scale-105 duration-300">
//             <Image src="/logo-unicef.png" alt="UNICEF" width={110} height={65} className="drop-shadow-sm" />
//           </div>
//         </div>
//       </div>

//       {/* ====== TIER 3: FULL-WIDTH NAVIGATION ====== */}
//       <div className="bg-gradient-to-r from-indigo-950 via-violet-900 to-indigo-950 sticky top-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)]">
//         <div className="px-4 lg:px-8">
          
//           {/* Desktop Nav */}
//           <div className="hidden md:flex">
//             <NavigationMenu>
//               <NavigationMenuList className="flex">
//                 {navLinks.map((item) =>
//                   item.subMenu ? (
//                     <NavigationMenuItem key={item.label}>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button
//                             variant="ghost"
//                             className="text-indigo-50 hover:bg-white/10 hover:text-white rounded-none h-14 px-7 font-medium tracking-wide flex items-center gap-2 border-r border-white/5 transition-all duration-300"
//                           >
//                             {item.label}
//                             <ChevronDown className="h-4 w-4 opacity-70" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent className="bg-white rounded-b-lg border-0 border-t-4 border-t-amber-500 shadow-xl min-w-[240px] p-1 mt-0">
//                           {item.subMenu.map((sub) => (
//                             <DropdownMenuItem key={sub.label} asChild>
//                               <Link href={sub.href} className="hover:bg-amber-50 hover:text-amber-900 cursor-pointer rounded-md py-3 px-4 font-medium block w-full text-sm transition-colors">
//                                 {sub.label}
//                               </Link>
//                             </DropdownMenuItem>
//                           ))}
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </NavigationMenuItem>
//                   ) : (
//                     <NavigationMenuItem key={item.label}>
//                       <NavigationMenuLink asChild>
//                         <Link href={item.href} className="text-indigo-50 hover:bg-white/10 hover:text-white rounded-none h-14 px-7 font-medium tracking-wide flex items-center border-r border-white/5 transition-all duration-300 block w-full">
//                           {item.label}
//                         </Link>
//                       </NavigationMenuLink>
//                     </NavigationMenuItem>
//                   )
//                 )}
//               </NavigationMenuList>
//             </NavigationMenu>
//           </div>

//           {/* Mobile Menu Trigger */}
//           <div className="md:hidden flex items-center justify-between h-14">
//             <span className="text-indigo-100 font-semibold tracking-widest uppercase text-xs">Navigation Menu</span>
//             <Sheet open={open} onOpenChange={setOpen}>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-md">
//                   <Menu className="h-6 w-6" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="left" className="w-[85%] max-w-sm bg-white p-0 border-r-0 shadow-2xl">
//                 <SheetHeader className="bg-gradient-to-r from-indigo-950 to-violet-900 p-5 text-left border-b-4 border-amber-500">
//                   <SheetTitle className="text-white font-bold text-xl tracking-wide">Menu</SheetTitle>
//                 </SheetHeader>

//                 <div className="flex flex-col py-3 overflow-y-auto h-full pb-20">
//                   {navLinks.map((item) =>
//                     item.subMenu ? (
//                       <div key={item.label} className="border-b border-slate-100 last:border-0">
//                         <div className="px-6 py-3 font-extrabold text-slate-400 text-[10px] uppercase tracking-widest bg-slate-50/50">
//                           {item.label}
//                         </div>
//                         <div className="flex flex-col">
//                           {item.subMenu.map((sub) => (
//                             <Link key={sub.label} href={sub.href} onClick={() => setOpen(false)} className="w-full text-left text-slate-700 font-medium px-6 py-3.5 hover:bg-violet-50 hover:text-violet-700 transition-colors block text-sm">
//                               {sub.label}
//                             </Link>
//                           ))}
//                         </div>
//                       </div>
//                     ) : (
//                       <div key={item.label} className="border-b border-slate-100 last:border-0">
//                         <Link href={item.href} onClick={() => setOpen(false)} className="w-full text-left text-slate-800 font-bold px-6 py-4 hover:bg-violet-50 hover:text-violet-700 block transition-colors">
//                           {item.label}
//                         </Link>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ChevronDown, LockKeyhole } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/#home" },
    {
      label: "About",
      subMenu: [
        { label: "About Us", href: "/landing-page/about" },
        { label: "Message from Mission Director", href: "/landing-page/message-director" },
      ],
    },
    { label: "Resources", href: "/landing-page/Resources/ShowResource" },
    { label: "Gallery", href: "/landing-page/gallery" },
    { label: "Contact Us", href: "/landing-page/contact-us" },
    { label: "Calculator", href: "/landing-page/calculator" },
  ];

  const loginRoles = [
    { label: "ADMINISTRATOR", href: "/admin" },
    { label: "STATE USER", href: "/state-user" },
    { label: "DISTRICT USER", href: "/district-user" },
    { label: "MTC USER", href: "/mtc-user" },
  ];

  return (
    <header className="w-full font-sans flex flex-col shadow-2xl relative z-50">
      
      {/* ====== TIER 1: UTILITY & LOGIN BAR ====== */}
      <div className="bg-slate-950 text-slate-300 py-1.5 px-4 lg:px-8 flex justify-between items-center text-xs sm:text-sm border-b border-white/5">
        <div className="hidden md:block font-medium tracking-wider text-slate-400">
          Government of Jharkhand <span className="mx-2 text-slate-600">|</span> 
          <span className="text-slate-200">Tracking of Children with Severe Acute Malnutrition</span>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          {/* Accessibility Options */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-md overflow-hidden backdrop-blur-sm">
            <button className="px-3 py-1 hover:text-white hover:bg-white/10 transition-all font-medium">A+</button>
            <button className="px-3 py-1 border-l border-white/10 hover:text-white hover:bg-white/10 transition-all font-medium">A</button>
            <button className="px-3 py-1 border-l border-white/10 hover:text-white hover:bg-white/10 transition-all font-medium">A-</button>
          </div>

          {/* Secure Login */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 hover:from-amber-300 hover:to-orange-400 font-bold h-8 px-4 text-xs rounded-md border-none shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300"
              >
                <LockKeyhole className="w-3.5 h-3.5 mr-2" />
                LOGIN 
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white text-slate-800 border-0 border-t-4 border-t-violet-600 rounded-b-lg shadow-2xl min-w-[220px] p-1">
              <div className="px-3 py-2 text-[10px] font-extrabold text-slate-400 tracking-widest border-b mb-1">SELECT USER ROLE</div>
              {loginRoles.map((role) => (
                <DropdownMenuItem key={role.label} asChild>
                  <Link href={role.href} className="hover:bg-violet-50 hover:text-violet-700 cursor-pointer rounded-md py-2.5 px-3 font-semibold transition-colors block w-full text-sm">
                    {role.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ====== TIER 2: BRANDING & LOGOS ====== */}
      {/* Added a subtle radial gradient background to make the white feel less flat */}
      <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white py-5 px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-slate-100">
        
        {/* Left Branding */}
        <div className="flex items-center gap-5 w-full lg:w-auto justify-center lg:justify-start">
          <div className="p-2 bg-white rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
            <Image
              src="/logo-jharkhand-govt.png"
              alt="Government Emblem"
              width={75}
              height={75}
              className="flex-shrink-0"
            />
          </div>
          
          {/* Replaced MTC Logo with Text */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight leading-tight uppercase">
              Malnutrition Treatment Center
            </h1>
            <p className="text-xs md:text-sm font-semibold text-amber-600 mt-1">
              Standing Quality, Building a Malnutrition-Free Jharkhand
            </p>
          </div>
        </div>

        {/* Right Partner Logos */}
        <div className="hidden md:flex items-center justify-center gap-8 divide-x divide-slate-200">
          <div className="pl-8 transition-transform hover:scale-105 duration-300">
            <Image src="/logo-Nhm1.png" alt="NHM" width={65} height={65} className="drop-shadow-sm" />
          </div>
          <div className="pl-8 transition-transform hover:scale-105 duration-300">
            <Image src="/logo_7.png" alt="Poshan Abhiyaan" width={95} height={70} className="drop-shadow-sm" />
          </div>
          <div className="pl-8 transition-transform hover:scale-105 duration-300">
            <Image src="/logo-unicef.png" alt="UNICEF" width={110} height={65} className="drop-shadow-sm" />
          </div>
        </div>
      </div>

      {/* ====== TIER 3: FULL-WIDTH NAVIGATION ====== */}
      <div className="bg-gradient-to-r from-indigo-950 via-violet-900 to-indigo-950 sticky top-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)]">
        <div className="px-4 lg:px-8">
          
          {/* Desktop Nav */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex">
                {navLinks.map((item) =>
                  item.subMenu ? (
                    <NavigationMenuItem key={item.label}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="text-indigo-50 hover:bg-white/10 hover:text-white rounded-none h-14 px-7 font-medium tracking-wide flex items-center gap-2 border-r border-white/5 transition-all duration-300"
                          >
                            {item.label}
                            <ChevronDown className="h-4 w-4 opacity-70" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white rounded-b-lg border-0 border-t-4 border-t-amber-500 shadow-xl min-w-[240px] p-1 mt-0">
                          {item.subMenu.map((sub) => (
                            <DropdownMenuItem key={sub.label} asChild>
                              <Link href={sub.href} className="hover:bg-amber-50 hover:text-amber-900 cursor-pointer rounded-md py-3 px-4 font-medium block w-full text-sm transition-colors">
                                {sub.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuLink asChild>
                        <Link href={item.href} className="text-indigo-50 hover:bg-white/10 hover:text-white rounded-none h-14 px-7 font-medium tracking-wide flex items-center border-r border-white/5 transition-all duration-300 block w-full">
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center justify-between h-14">
            <span className="text-indigo-100 font-semibold tracking-widest uppercase text-xs">Navigation Menu</span>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-md">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85%] max-w-sm bg-white p-0 border-r-0 shadow-2xl">
                <SheetHeader className="bg-gradient-to-r from-indigo-950 to-violet-900 p-5 text-left border-b-4 border-amber-500">
                  <SheetTitle className="text-white font-bold text-xl tracking-wide">Menu</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col py-3 overflow-y-auto h-full pb-20">
                  {navLinks.map((item) =>
                    item.subMenu ? (
                      <div key={item.label} className="border-b border-slate-100 last:border-0">
                        <div className="px-6 py-3 font-extrabold text-slate-400 text-[10px] uppercase tracking-widest bg-slate-50/50">
                          {item.label}
                        </div>
                        <div className="flex flex-col">
                          {item.subMenu.map((sub) => (
                            <Link key={sub.label} href={sub.href} onClick={() => setOpen(false)} className="w-full text-left text-slate-700 font-medium px-6 py-3.5 hover:bg-violet-50 hover:text-violet-700 transition-colors block text-sm">
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div key={item.label} className="border-b border-slate-100 last:border-0">
                        <Link href={item.href} onClick={() => setOpen(false)} className="w-full text-left text-slate-800 font-bold px-6 py-4 hover:bg-violet-50 hover:text-violet-700 block transition-colors">
                          {item.label}
                        </Link>
                      </div>
                    )
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}