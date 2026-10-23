"use client";

import { Menu, User } from "lucide-react";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Mobile Toggle & Minimal Badge Brand */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white shadow-sm">
                M
              </span>
              <span className="text-base font-semibold tracking-tight text-slate-900">
                MTC Admin
              </span>
            </div>
          </div>

          {/* Right: User Profile Pill */}
          <div className="flex items-center">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 shadow-xs hover:border-slate-300 hover:bg-slate-50/60 transition-colors focus:outline-none"
              id="user-menu"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-medium">
                <User className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium text-slate-700 hidden sm:inline-block">
                Admin
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}