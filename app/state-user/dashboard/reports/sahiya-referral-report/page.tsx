"use client";

import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

// --- Types ---
interface Option {
  value: string;
  label: string;
}

// --- Data ---
const YEARS: Option[] = Array.from({ length: 26 }, (_, i) => {
  const year = (2001 + i).toString();
  return { value: year, label: year };
});

const MONTHS: Option[] = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const REFERRED_BY_OPTIONS: Option[] = [
  { value: "6", label: "Sahiya/ASHA" },
  { value: "1", label: "ANGANWADI" },
  { value: "2", label: "ANM" },
  { value: "7", label: "Poshan Sakhi" },
  { value: "8", label: "RBSK Team" },
  { value: "3", label: "OPD" },
  { value: "4", label: "SELF" },
  { value: "5", label: "OTHER" },
];

export default function SahiyaReferralReport() {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [referredBy, setReferredBy] = useState<string>("");

  const handleSearch = () => {
    const searchParams = {
      year: selectedYear,
      month: selectedMonth,
      referredBy: referredBy,
    };
    console.log("Searching Referral Report with params:", searchParams);
    // Logic to populate div_Report goes here
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h5 className="text-lg font-medium text-[#0B918C]">
            Sahiya/ ASHA Referral Report
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-end">
            
            {/* Year Selection */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <div className="relative group">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-md py-1.5 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer transition-all"
                >
                  <option value="">Select Year</option>
                  {YEARS.map((y) => (
                    <option key={y.value} value={y.value}>
                      {y.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 pointer-events-none transition-colors"
                />
              </div>
            </div>

            {/* Month Selection */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Month
              </label>
              <div className="relative group">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-md py-1.5 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer transition-all"
                >
                  <option value="">Select Month</option>
                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 pointer-events-none transition-colors"
                />
              </div>
            </div>

            {/* Referred By (Preserved as disabled per original HTML source) */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Referred By
              </label>
              <div className="relative group">
                <select
                  disabled
                  value={referredBy}
                  onChange={(e) => setReferredBy(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-md py-1.5 px-3 pr-10 text-sm focus:outline-none text-gray-500 cursor-not-allowed"
                >
                  <option value="">Select</option>
                  {REFERRED_BY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
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
              Set the Year and Month filters to generate the referral report.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}