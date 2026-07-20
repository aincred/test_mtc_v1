"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";

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

const STAFF_CATEGORIES: Option[] = [
  { value: "1", label: "Medical Officer" },
  { value: "2", label: "ANM" },
  { value: "3", label: "Nutrition Counsellor" },
  { value: "4", label: "Cook cum Care Taker" },
  { value: "5", label: "Attendent Cleaner" },
  { value: "6", label: "Medical Social Worker" },
  { value: "7", label: "Block Data Manager" },
  { value: "8", label: "Block Programme Manager" },
  { value: "9", label: "Hospital Manager" },
  { value: "10", label: "Support Staff" },
];

// Mock data for MTC dropdown
const MTC_OPTIONS: Option[] = [
  { value: "1", label: "MTC Center A" },
  { value: "2", label: "MTC Center B" },
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
      onChange([]); 
    } else {
      onChange(options.map((opt) => opt.value)); 
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
          </ul>
        </div>
      )}
    </div>
  );
};

// --- Main Component ---
export default function StaffDetailsReport() {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedMtc, setSelectedMtc] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSearch = () => {
    const searchParams = {
      districts: selectedDistricts,
      mtc: selectedMtc,
      categories: selectedCategories,
    };
    console.log("Searching Staff Details with params:", searchParams);
    // Add your API fetching logic here
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h5 className="text-lg font-medium text-[#0B918C]">
            Staff Details Report
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            
            {/* District Dropdown */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                District
              </label>
              <MultiSelect
                options={DISTRICTS}
                selectedValues={selectedDistricts}
                onChange={setSelectedDistricts}
              />
            </div>

            {/* MTC Dropdown */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                MTC
              </label>
              <MultiSelect
                options={MTC_OPTIONS}
                selectedValues={selectedMtc}
                onChange={setSelectedMtc}
              />
            </div>

            {/* Staff by Category Dropdown */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Staff by Category
              </label>
              <MultiSelect
                options={STAFF_CATEGORIES}
                selectedValues={selectedCategories}
                onChange={setSelectedCategories}
              />
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
              className="text-center text-gray-400 text-sm italic min-h-[150px] flex items-center justify-center"
            >
              Select relevant filters and click search to view staff details.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}