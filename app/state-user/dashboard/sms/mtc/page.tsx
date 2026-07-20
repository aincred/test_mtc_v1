"use client";

import React, { useState } from "react";

// District Data based on provided HTML
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

export default function MtcSmsList() {
  const [district, setDistrict] = useState<string>("");

  // Replaces the "DropdownChange()" from the original HTML
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrictId = e.target.value;
    setDistrict(selectedDistrictId);
    
    if (selectedDistrictId) {
      console.log(`Fetching MTC SMS list for District ID: ${selectedDistrictId}`);
      // Add your API call or data fetching logic here
    }
  };

  return (
    <div className="w-full mt-8">
      {/* Outer Card with Shadow */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
        {/* Card Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
              MTC SMS List
            </h5>
            {/* The commented out Add button from the HTML was left out to match your current layout, 
                but can be re-enabled here if needed later. */}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 md:p-6 text-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-6">
            
            {/* District Dropdown (Matches col-xl-3) */}
            <div className="flex flex-col gap-1">
              <label htmlFor="ddl_District" className="font-medium text-gray-700">
                District
              </label>
              <select
                id="ddl_District"
                name="DISTRICT_ID"
                value={district}
                onChange={handleDistrictChange}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] transition-colors"
              >
                <option value="">Select District</option>
                {DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Report Output Section Placeholder */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <div id="div_MTCSmslist" className="w-full">
              {district ? (
                <div className="text-center text-gray-500 py-8">
                  {/* The data table will be rendered here based on the selected district */}
                  <p>Loading records for selected district...</p>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                  <p>Please select a district to view the MTC SMS list.</p>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}