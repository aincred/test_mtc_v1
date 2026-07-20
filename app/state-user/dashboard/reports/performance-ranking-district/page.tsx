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

const QUARTERS: Option[] = [
  { value: "1", label: "Annual (Apr-Mar)" },
  { value: "2", label: "Quarter1 (Apr-Jun)" },
  { value: "3", label: "Quarter2 (Jul-Sept)" },
  { value: "4", label: "Quarter3 (Oct-Dec)" },
  { value: "5", label: "Quarter4 (Jan-Mar)" },
];

export default function PerformanceRankingDistrict() {
  const [year, setYear] = useState<string>("");
  const [quarter, setQuarter] = useState<string>("");

  const handleSearch = () => {
    const searchParams = {
      year,
      quarter,
    };
    console.log("Fetching Performance Ranking with params:", searchParams);
    // Add logic to fetch and render the report/SVG here
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h5 className="text-lg font-medium text-[#0B918C]">
            Performance Ranking By District
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-end gap-6">
            
            {/* Financial Year Selection */}
            <div className="w-full md:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Financial Year
              </label>
              <div className="relative group">
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-md py-1.5 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="">Select Year</option>
                  {YEARS.map((y) => (
                    <option key={y.value} value={y.value}>{y.label}</option>
                  ))}
                </select>
                <ChevronDown 
                  size={16} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 pointer-events-none transition-colors" 
                />
              </div>
            </div>

            {/* Quarter Selection */}
            <div className="w-full md:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quarter
              </label>
              <div className="relative group">
                <select
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-300 rounded-md py-1.5 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="">select</option>
                  {QUARTERS.map((q) => (
                    <option key={q.value} value={q.value}>{q.label}</option>
                  ))}
                </select>
                <ChevronDown 
                  size={16} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 pointer-events-none transition-colors" 
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="w-full md:w-auto">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full md:w-auto inline-flex justify-center items-center px-6 py-1.5 border border-[#0B918C] text-[#0B918C] rounded-md text-sm font-semibold hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C] transition-all"
              >
                <Search size={16} className="mr-2" />
                Search
              </button>
            </div>
            
          </div>

          {/* Report and SVG Visualization Area */}
          <div className="mt-10 space-y-8">
            <div 
              id="div_Report" 
              className="text-center text-gray-400 text-sm italic min-h-[50px]"
            >
              {/* Report summary content */}
            </div>
            
            <div 
              id="div_Svg" 
              className="w-full flex justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200 min-h-[300px] items-center"
            >
              <span className="text-gray-400 text-sm">
                Charts and ranking visualizations will render here.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}