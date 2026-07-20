"use client";

import React, { useState } from "react";
import { Calendar, Search as SearchIcon } from "lucide-react";

// District Data from HTML
const DISTRICTS = [
  { id: "1", name: "BOKARO" }, { id: "2", name: "CHATRA" }, { id: "16", name: "DEOGHAR" },
  { id: "4", name: "DHANBAD" }, { id: "17", name: "DUMKA" }, { id: "22", name: "EAST SINGHBHUM" },
  { id: "14", name: "GARHWA" }, { id: "3", name: "GIRIDIH" }, { id: "18", name: "GODDA" },
  { id: "9", name: "GUMLA" }, { id: "6", name: "HAZARIBAGH" }, { id: "19", name: "JAMTARA" },
  { id: "10", name: "KHUNTI" }, { id: "7", name: "KODERMA" }, { id: "15", name: "LATEHAR" },
  { id: "11", name: "LOHARDAGA" }, { id: "20", name: "PAKUR" }, { id: "13", name: "PALAMU" },
  { id: "5", name: "RAMGARH" }, { id: "8", name: "RANCHI" }, { id: "21", name: "SAHIBGANJ" },
  { id: "23", name: "SERAIKELA" }, { id: "12", name: "SIMDEGA" }, { id: "24", name: "WEST SINGHBHUM" },
];

export default function StateAndDistrictAnnualFactsheet() {
  // Form State
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [district, setDistrict] = useState<string>("");

  const handleSearch = () => {
    const payload = {
      fromDate,
      toDate,
      districtId: district || "Jharkhand (All)",
    };
    console.log("Generating State and District Annual Factsheet for:", payload);
    // Add logic to fetch and display the report data here
  };

  return (
    <div className="w-full mt-8">
      {/* Outer Card with margin/shadow similar to HTML */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
        {/* Card Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
            State and District Annual Factsheet
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-4 md:p-6 text-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 items-end">
            
            {/* From Date (lg:col-span-2 maps to col-xl-2) */}
            <div className="lg:col-span-2 flex flex-col gap-1">
              <label htmlFor="txt_FromDate" className="font-medium text-gray-700">From Date</label>
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

            {/* To Date (lg:col-span-2 maps to col-xl-2) */}
            <div className="lg:col-span-2 flex flex-col gap-1">
              <label htmlFor="txt_ToDate" className="font-medium text-gray-700">To Date</label>
              <div className="relative">
                <input
                  id="txt_ToDate"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] h-[38px]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <Calendar size={16} />
                </div>
              </div>
            </div>

            {/* District Select (lg:col-span-3 maps to col-xl-3) */}
            <div className="lg:col-span-3 flex flex-col gap-1">
              <label htmlFor="ddl_District" className="font-medium text-gray-700">District</label>
              <select
                id="ddl_District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
              >
                <option value="">Jharkhand</option>
                {DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Search Button (lg:col-span-3 maps to col-xl-3) */}
            <div className="lg:col-span-3 lg:pt-0 pt-2">
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
            <div id="div_Report" className="w-full text-center text-gray-500">
              {/* The table or data result will be rendered here */}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}