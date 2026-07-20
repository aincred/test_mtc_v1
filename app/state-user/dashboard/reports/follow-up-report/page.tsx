"use client";

import React, { useState } from "react";
import { Calendar, Search, ChevronDown } from "lucide-react";

// --- Types ---
interface Option {
  value: string;
  label: string;
}

// --- Data ---
const FOLLOWED_BY_OPTIONS: Option[] = [
  { value: "6", label: "Sahiya/ASHA" },
  { value: "1", label: "ANGANWADI" },
  { value: "2", label: "ANM" },
  { value: "7", label: "Poshan Sakhi" },
  { value: "8", label: "RBSK Team" },
  { value: "3", label: "OPD" },
  { value: "4", label: "SELF" },
  { value: "5", label: "OTHER" },
];

export default function FollowUpReport() {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [followedBy, setFollowedBy] = useState<string>("");

  const handleSearch = () => {
    const searchParams = {
      fromDate,
      toDate,
      followedBy,
    };
    console.log("Searching Followed-up Report with params:", searchParams);
    // Add your API fetching logic here
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h5 className="text-lg font-medium text-[#0B918C]">
            Followed-up Report
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-end">
            
            {/* From Date */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <div className="relative group">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white transition-all"
                />
                <Calendar
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 pointer-events-none transition-colors"
                />
              </div>
            </div>

            {/* To Date */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <div className="relative group">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white transition-all"
                />
                <Calendar
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 pointer-events-none transition-colors"
                />
              </div>
            </div>

            {/* Followed-up By Dropdown */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Followed-up By
              </label>
              <div className="relative group">
                <select
                  value={followedBy}
                  onChange={(e) => setFollowedBy(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-md py-1.5 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer transition-all"
                >
                  <option value="">Select</option>
                  {FOLLOWED_BY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 pointer-events-none transition-colors"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="lg:pt-0 pt-2">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full md:w-auto inline-flex justify-center items-center px-6 py-2 border border-[#0B918C] text-[#0B918C] rounded-md text-sm font-semibold hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C] transition-all"
              >
                <Search size={16} className="mr-2" />
                Search
              </button>
            </div>
            
          </div>

          {/* Report Output Area */}
          <div className="mt-10 pt-8 border-t border-dashed border-gray-200">
            <div 
              id="div_Report" 
              className="text-center text-gray-400 text-sm italic min-h-[100px] flex items-center justify-center"
            >
              Select filters and click search to view the followed-up report.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}