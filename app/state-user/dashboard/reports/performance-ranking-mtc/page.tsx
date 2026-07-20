"use client";

import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

// --- Types ---
interface Option {
  value: string;
  label: string;
}

// --- Constants ---
const YEARS: Option[] = Array.from({ length: 26 }, (_, i) => {
  const year = (2001 + i).toString();
  return { value: year, label: year };
});

const QUARTERS: Option[] = [
  { value: "1", label: "Annual (Apr-Mar)" },
  { value: "2", label: "Quarter1 (Apr-Jun)" },
  { value: "3", label: "Quarter2 (Jul-Sept)" },
  { value: "4", label: "Quarter3 (Oct-Dec)" },
  { value: "5", label: "Quarter4 (Jan-Mar)" },
];

const DISTRICTS: Option[] = [
  { value: "1", label: "BOKARO" },
  { value: "2", label: "CHATRA" },
  { value: "16", label: "DEOGHAR" },
  { value: "4", label: "DHANBAD" },
  { value: "17", label: "DUMKA" },
  { value: "22", label: "EAST SINGHBHUM" },
  { value: "14", label: "GARHWA" },
  { value: "3", label: "GIRIDIH" },
  { value: "18", label: "GODDA" },
  { value: "9", label: "GUMLA" },
  { value: "6", label: "HAZARIBAGH" },
  { value: "19", label: "JAMTARA" },
  { value: "10", label: "KHUNTI" },
  { value: "7", label: "KODERMA" },
  { value: "15", label: "LATEHAR" },
  { value: "11", label: "LOHARDAGA" },
  { value: "20", label: "PAKUR" },
  { value: "13", label: "PALAMU" },
  { value: "5", label: "RAMGARH" },
  { value: "8", label: "RANCHI" },
  { value: "21", label: "SAHIBGANJ" },
  { value: "23", label: "SERAIKELA" },
  { value: "12", label: "SIMDEGA" },
  { value: "24", label: "WEST SINGHBHUM" },
];

export default function PerformanceRankingMtc() {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedQuarter, setSelectedQuarter] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedMtc, setSelectedMtc] = useState<string>("");

  const handleSearch = () => {
    const params = {
      year: selectedYear,
      quarter: selectedQuarter,
      districtId: selectedDistrict,
      mtcId: selectedMtc,
    };
    console.log("Fetching Performance Ranking by MTC with params:", params);
    // Add logic here to fetch data and update the report/SVG containers
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-[0.800rem] shadow-sm border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h5 className="text-lg font-medium" style={{ color: "rgb(11,145,140)" }}>
            Performance Ranking By MTC
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
            
            {/* Financial Year */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-tight">
                Financial Year
              </label>
              <div className="relative group">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-md py-1.5 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
                >
                  <option value="">Select Year</option>
                  {YEARS.map((y) => (
                    <option key={y.value} value={y.value}>{y.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-teal-500" />
              </div>
            </div>

            {/* Quarter */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-tight">
                Quarter
              </label>
              <div className="relative group">
                <select
                  value={selectedQuarter}
                  onChange={(e) => setSelectedQuarter(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-md py-1.5 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
                >
                  <option value="">select</option>
                  {QUARTERS.map((q) => (
                    <option key={q.value} value={q.value}>{q.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-teal-500" />
              </div>
            </div>

            {/* District */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-tight">
                District
              </label>
              <div className="relative group">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-md py-1.5 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
                >
                  <option value="">All Districts</option>
                  {DISTRICTS.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-teal-500" />
              </div>
            </div>

            {/* MTC Selection (Hidden as per original HTML) */}
            <div className="space-y-1 hidden">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-tight">
                MTC
              </label>
              <select
                value={selectedMtc}
                onChange={(e) => setSelectedMtc(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-1">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full inline-flex justify-center items-center px-6 py-2 border border-[#0B918C] text-[#0B918C] rounded-md text-sm font-semibold hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C] transition-all"
              >
                <Search size={16} className="mr-2" />
                Search
              </button>
            </div>
          </div>

          {/* Results Containers */}
          <div className="mt-10 space-y-6">
            <div 
              id="div_Report" 
              className="w-full text-center text-gray-400 italic text-sm"
            >
              {/* Report data will be injected here */}
            </div>
            
            <div 
              id="div_Svg" 
              className="w-full flex justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200 min-h-[300px] items-center"
            >
              <span className="text-gray-400 text-sm">
                Statistical visualizations and rankings will appear here after search.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}