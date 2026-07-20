"use client";

import React, { useState } from "react";
import { MessageSquare, MapPin } from "lucide-react";

// Extracted district data for cleaner JSX rendering
const DISTRICTS = [
  { id: "1", name: "BOKARO" },
  { id: "2", name: "CHATRA" },
  { id: "16", name: "DEOGHAR" },
  { id: "4", name: "DHANBAD" },
  { id: "17", name: "DUMKA" },
  { id: "22", name: "EAST SINGHBHUM" },
  { id: "14", name: "GARHWA" },
  { id: "3", name: "GIRIDIH" },
  { id: "18", name: "GODDA" },
  { id: "9", name: "GUMLA" },
  { id: "6", name: "HAZARIBAGH" },
  { id: "19", name: "JAMTARA" },
  { id: "10", name: "KHUNTI" },
  { id: "7", name: "KODERMA" },
  { id: "15", name: "LATEHAR" },
  { id: "11", name: "LOHARDAGA" },
  { id: "20", name: "PAKUR" },
  { id: "13", name: "PALAMU" },
  { id: "5", name: "RAMGARH" },
  { id: "8", name: "RANCHI" },
  { id: "21", name: "SAHIBGANJ" },
  { id: "23", name: "SERAIKELA" },
  { id: "12", name: "SIMDEGA" },
  { id: "24", name: "WEST SINGHBHUM" },
];

export default function MtcSmsList() {
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    
    // Equivalent to your old DropdownChange() function
    console.log("District changed to ID:", districtId);
    // TODO: Fetch/filter your MTC SMS list based on the selected ID
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-teal-600" />
          <h2 className="text-lg font-semibold text-gray-800">MTC SMS List</h2>
        </div>
        {/* The commented-out button from your HTML, converted to React if you ever need it */}
        {/* <button 
          onClick={() => console.log('Add details clicked')} 
          className="px-3 py-1.5 text-sm border border-cyan-500 text-cyan-600 hover:bg-cyan-50 rounded transition-colors"
        >
          Add Details
        </button> 
        */}
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-start mb-8">
        <div className="w-full md:w-1/3">
          <label 
            htmlFor="ddl_District" 
            className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
          >
            <MapPin className="w-4 h-4 text-gray-500" />
            District
          </label>
          <select
            id="ddl_District"
            name="DISTRICT_ID"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
          >
            <option value="">Select District</option>
            {DISTRICTS.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* List Container (Equivalent to <div id="div_MTCSmslist"></div>) */}
      <div className="bg-gray-50 border border-gray-100 rounded-md p-8 text-center text-gray-500">
        {selectedDistrict ? (
          <p>Loading SMS data for District ID: {selectedDistrict}...</p>
          // Mount your data table or list component here
        ) : (
          <p>Please select a district to view the MTC SMS list.</p>
        )}
      </div>
    </div>
  );
}