"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  MapPin, 
  Building, 
  FileText, 
  Hash, 
  User, 
  Search,
  Loader2
} from "lucide-react";

// Extracted Data for Dropdowns
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
  { id: "8", name: "RANCHI" },
  { id: "24", name: "WEST SINGHBHUM" },
];

// Mock data mapping Districts to their respective MTCs
const MTC_DATA: Record<string, { id: string; name: string }[]> = {
  "8": [ // Example: Ranchi district MTCs
    { id: "26", name: "BUNDU" },
    { id: "27", name: "DORANDA" },
    { id: "28", name: "MANDAR" },
    { id: "29", name: "BERO" },
    { id: "107", name: "UP REFERRAL RIMS" },
  ],
  // Add other mappings here as needed
};

export default function SmsFollowUp() {
  // Form State
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    districtId: "", // In your original HTML this was disabled, but I've enabled it here to show dependent logic
    mtcId: "",
    recordNo: "",
    samNo: "",
    childName: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Specific logic for numbers only on Record No
    if (name === "recordNo" && value !== "" && !/^\d+$/.test(value)) {
      return; 
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset MTC if district changes
      ...(name === "districtId" && { mtcId: "" }) 
    }));
  };

  // Search Submission
  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(false);

    try {
      console.log("Searching with parameters:", formData);
      // TODO: Replace with your actual data fetching logic
      await new Promise((resolve) => setTimeout(resolve, 1200)); 
      
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamically get MTC options based on selected district
  const availableMTCs = formData.districtId ? MTC_DATA[formData.districtId] || [] : [];

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-teal-700 flex items-center gap-2">
          SMS Follow up Due Dates
        </h2>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* ROW 1 */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" /> From Date
          </label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" /> To Date
          </label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" /> District
          </label>
          <select
            name="districtId"
            value={formData.districtId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all text-sm bg-white"
          >
            <option value="">Select District</option>
            {DISTRICTS.map((dist) => (
              <option key={dist.id} value={dist.id}>{dist.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Building className="w-4 h-4 text-gray-400" /> MTC
          </label>
          <select
            name="mtcId"
            value={formData.mtcId}
            onChange={handleChange}
            disabled={!formData.districtId || availableMTCs.length === 0}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all text-sm bg-white disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
          >
            <option value="">Select MTC</option>
            {availableMTCs.map((mtc) => (
              <option key={mtc.id} value={mtc.id}>{mtc.name}</option>
            ))}
          </select>
        </div>

        {/* ROW 2 */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" /> Record No
          </label>
          <input
            type="text"
            name="recordNo"
            value={formData.recordNo}
            onChange={handleChange}
            placeholder="Numbers only"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Hash className="w-4 h-4 text-gray-400" /> SAM Number
          </label>
          <input
            type="text"
            name="samNo"
            value={formData.samNo}
            onChange={handleChange}
            placeholder="Enter SAM No"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" /> Child Name
          </label>
          <input
            type="text"
            name="childName"
            value={formData.childName}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all text-sm"
          />
        </div>

        {/* Search Button (Aligned to bottom of row) */}
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors disabled:bg-teal-400"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* Results Container */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl min-h-[150px] flex items-center justify-center text-gray-500">
          {isLoading ? (
             <div className="flex flex-col items-center gap-2">
               <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
               <p className="text-sm">Fetching records...</p>
             </div>
          ) : hasSearched ? (
            <p className="text-sm text-gray-600">No records found for the given criteria. (Mock Data)</p>
          ) : (
            <p className="text-sm">Enter search parameters and click Search to view the child list.</p>
          )}
        </div>
      </div>
    </div>
  );
}