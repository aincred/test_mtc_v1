"use client";

import React, { useState } from "react";
import { Calendar, Search, ChevronDown } from "lucide-react";

// Types
type ViewMode = "Range" | "Quarterly";

interface Option {
  value: string;
  label: string;
}

// Data
const YEARS: Option[] = Array.from({ length: 26 }, (_, i) => {
  const year = (2001 + i).toString();
  return { value: year, label: year };
});

const QUARTERS: Option[] = [
  { value: "1", label: "Q1 (Jan 01 - Mar 31)" },
  { value: "2", label: "Q2 (Apr 01 - Jun 30)" },
  { value: "3", label: "Q3 (Jul 01 - Sep 30)" },
  { value: "4", label: "Q4 (Oct 01 - Dec 31)" },
];

export default function MtcQuarterlyReport() {
  const [viewMode, setViewMode] = useState<ViewMode>("Range");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [quarter, setQuarter] = useState<string>("");

  const handleSearch = () => {
    // Collect data based on the active view mode
    const searchParams = viewMode === "Range" 
      ? { mode: "Range", from: fromDate, to: toDate } 
      : { mode: "Quarterly", year, quarter };

    console.log("Fetching report with parameters:", searchParams);
    // Add your API call or report generation logic here
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h5 className="text-lg font-medium text-[#0B918C]">
            MoHFW MTC Quarterly Report
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="space-y-6">
            
            {/* View Mode Selection (Radio Group) */}
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="radio"
                  name="reportMode"
                  className="w-4 h-4 text-[#0B918C] focus:ring-[#0B918C] border-gray-300 cursor-pointer"
                  checked={viewMode === "Range"}
                  onChange={() => setViewMode("Range")}
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  Range
                </span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="radio"
                  name="reportMode"
                  className="w-4 h-4 text-[#0B918C] focus:ring-[#0B918C] border-gray-300 cursor-pointer"
                  checked={viewMode === "Quarterly"}
                  onChange={() => setViewMode("Quarterly")}
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  Quarterly
                </span>
              </label>
            </div>

            {/* Input Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
              
              {viewMode === "Range" ? (
                <>
                  {/* From Date */}
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      From Date
                    </label>
                    <div className="relative group">
                      <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white transition-shadow"
                      />
                      <Calendar 
                        size={16} 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 pointer-events-none transition-colors" 
                      />
                    </div>
                  </div>

                  {/* To Date */}
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      To Date
                    </label>
                    <div className="relative group">
                      <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white transition-shadow"
                      />
                      <Calendar 
                        size={16} 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 pointer-events-none transition-colors" 
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Year Select */}
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Year
                    </label>
                    <div className="relative group">
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white cursor-pointer transition-shadow"
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

                  {/* Quarter Select */}
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Quarter
                    </label>
                    <div className="relative group">
                      <select
                        value={quarter}
                        onChange={(e) => setQuarter(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white cursor-pointer transition-shadow"
                      >
                        <option value="">Select</option>
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
                </>
              )}

              {/* Search Button */}
              <div className="lg:col-span-1">
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

            {/* Report Content Container */}
            <div className="mt-10 border-t border-dashed border-gray-200 pt-8">
              <div 
                id="div_Report" 
                className="text-center text-gray-400 text-sm italic min-h-[150px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100"
              >
                Specify parameters and search to generate the quarterly report.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}