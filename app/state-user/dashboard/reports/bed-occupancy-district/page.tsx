"use client";

import React, { useState } from "react";
import { Calendar, Search as SearchIcon } from "lucide-react";

// Data Constants
const YEARS = Array.from({ length: 26 }, (_, i) => (2001 + i).toString());

const MONTHS = [
  { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
  { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
  { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
  { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
];

export default function BedOccupancyDistrictReport() {
  // Report Type State
  const [reportType, setReportType] = useState<"Daily" | "Monthly">("Monthly");

  // Form Field State
  const [fromDate, setFromDate] = useState<string>("2026-04-11");
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");

  const handleSearch = () => {
    const payload = reportType === "Daily" 
      ? { type: "Daily", date: fromDate }
      : { type: "Monthly", year, month };
      
    console.log("Generating Bed Occupancy Report for:", payload);
    // Add logic to fetch and display the report data here
  };

  return (
    <div className="w-full mt-8 relative">
      {/* Outer Card with Shadow */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
        {/* Card Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
            Bed Occupancy Report By District
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-4 md:p-6 text-sm">
          
          {/* Radio Buttons for Report Type */}
          <div className="flex items-center gap-6 mb-6 px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="reportType" 
                value="Daily"
                checked={reportType === "Daily"}
                onChange={() => setReportType("Daily")}
                className="w-4 h-4 text-[#0B918C] border-gray-300 focus:ring-[#0B918C] cursor-pointer"
              />
              <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Daily</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="reportType" 
                value="Monthly"
                checked={reportType === "Monthly"}
                onChange={() => setReportType("Monthly")}
                className="w-4 h-4 text-[#0B918C] border-gray-300 focus:ring-[#0B918C] cursor-pointer"
              />
              <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Monthly</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            
            {/* Conditional Rendering based on Report Type */}
            {reportType === "Daily" ? (
              // Daily View: Shows Date input
              <div className="lg:col-span-2 flex flex-col gap-1 animate-in fade-in zoom-in duration-200">
                <label htmlFor="txt_FromDate" className="font-medium text-gray-700">Date</label>
                <div className="relative">
                  <input
                    id="txt_FromDate"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] h-[38px]"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <Calendar size={16} />
                  </div>
                </div>
              </div>
            ) : (
              // Monthly View: Shows Year and Month selects
              <>
                <div className="lg:col-span-2 flex flex-col gap-1 animate-in fade-in zoom-in duration-200">
                  <label htmlFor="dd_Year" className="font-medium text-gray-700">Year</label>
                  <select
                    id="dd_Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
                  >
                    <option value="">Select Year</option>
                    {YEARS.map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-1 animate-in fade-in zoom-in duration-200">
                  <label htmlFor="dd_Month" className="font-medium text-gray-700">Month</label>
                  <select
                    id="dd_Month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
                  >
                    <option value="">All Months</option>
                    {MONTHS.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Search Button */}
            <div className="lg:col-span-2 lg:pt-0 pt-2">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-[#0B918C] bg-white hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C]"
              >
                <SearchIcon size={16} />
                Search
              </button>
            </div>

          </div>

          {/* Report Output Section */}
          <div className="mt-8 flex justify-center border-t border-gray-100 pt-6">
            <div id="div_Report" className="w-full text-center text-gray-500 pt-2">
              {/* The table or data result will be rendered here */}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}