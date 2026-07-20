"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, Search, ChevronDown } from "lucide-react";

// --- Types ---
interface Option {
  value: string;
  label: string;
}

// --- Data ---
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

// Mock data for MTC dropdown
const MTC_OPTIONS: Option[] = [
  { value: "1", label: "MTC Center A" },
  { value: "2", label: "MTC Center B" },
  { value: "3", label: "MTC Center C" },
];

// --- Sub-component: Custom MultiSelect ---
const MultiSelect = ({
  options,
  selectedValues,
  onChange,
  placeholder = "None selected",
}: {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleAll = () => {
    if (selectedValues.length === options.length) {
      onChange([]); // Deselect all
    } else {
      onChange(options.map((opt) => opt.value)); // Select all
    }
  };

  const handleToggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === options.length) return "All selected";
    if (selectedValues.length === 1) {
      return options.find((opt) => opt.value === selectedValues[0])?.label || placeholder;
    }
    return `${selectedValues.length} selected`;
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className="w-full bg-white border border-gray-300 text-gray-700 py-1.5 px-3 rounded-md text-sm text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{getDisplayText()}</span>
        <ChevronDown size={16} className="text-gray-500 ml-2 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="p-2 border-b border-gray-200">
            <label className="flex items-center space-x-2 text-sm font-semibold cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                checked={selectedValues.length === options.length && options.length > 0}
                onChange={handleToggleAll}
              />
              <span>Select all</span>
            </label>
          </div>
          <ul className="py-1">
            {options.map((option) => (
              <li key={option.value}>
                <label className="flex items-center space-x-2 px-3 py-1.5 text-sm hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    checked={selectedValues.includes(option.value)}
                    onChange={() => handleToggleOption(option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              </li>
            ))}
            {options.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500 text-center">No options</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

// --- Main Component ---
export default function MicronutrientsAntibioticsReport() {
  const [fromDate, setFromDate] = useState<string>("2026-04-15");
  const [toDate, setToDate] = useState<string>("2026-04-15");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedMtc, setSelectedMtc] = useState<string[]>([]);

  const handleSearch = () => {
    const searchParams = {
      fromDate,
      toDate,
      districts: selectedDistricts,
      mtc: selectedMtc,
    };
    console.log("Searching with params:", searchParams);
    // Add your API fetching logic here
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h5 className="text-lg font-medium text-[#0B918C]">
            Micronutrients and Antibiotics Details Report
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 items-end">
            
            {/* From Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Calendar
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            {/* To Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Calendar
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            {/* District Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <MultiSelect
                options={DISTRICTS}
                selectedValues={selectedDistricts}
                onChange={setSelectedDistricts}
              />
            </div>

            {/* MTC Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                MTC
              </label>
              <MultiSelect
                options={MTC_OPTIONS}
                selectedValues={selectedMtc}
                onChange={setSelectedMtc}
              />
            </div>

            {/* Search Button */}
            <div>
              <button
                type="button"
                onClick={handleSearch}
                className="w-full md:w-auto inline-flex justify-center items-center px-4 py-1.5 border border-teal-600 text-teal-600 rounded-md text-sm font-medium hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
              >
                <Search size={16} className="mr-2" />
                Search
              </button>
            </div>
            
          </div>

          {/* Report Output Area */}
          <div className="mt-8 text-center text-gray-500 text-sm" id="div_Report">
            {/* Dynamic content will render here based on search */}
          </div>
        </div>
      </div>
    </div>
  );
}