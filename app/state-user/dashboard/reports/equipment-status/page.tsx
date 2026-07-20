"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";

// --- Types ---
interface Option {
  value: string;
  label: string;
}

// --- Data ---
const QUARTERS: Option[] = [
  { value: "1", label: "Quarter (Jan-March)" },
  { value: "2", label: "Quarter (April-June)" },
  { value: "3", label: "Quarter (July-Sept)" },
  { value: "4", label: "Quarter (Oct-Dec)" },
];

const YEARS: Option[] = Array.from({ length: 26 }, (_, i) => {
  const year = (2001 + i).toString();
  return { value: year, label: year };
});

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

const EQUIPMENT_OPTIONS: Option[] = [
  { value: "1", label: "Digital Weighing Scale" },
  { value: "2", label: "Stadiometer" },
  { value: "3", label: "Infantometer" },
  { value: "4", label: "MUAC Tape" },
  { value: "5", label: "Weing scales (to weigh to 5 gms.)" },
  { value: "6", label: "Clock" },
  { value: "7", label: "Calculator" },
  { value: "8", label: "SAM Chart" },
  { value: "9", label: "SAM Register" },
  { value: "10", label: "Camera" },
  { value: "11", label: "File" },
  { value: "12", label: "Almira Rake" },
  { value: "13", label: "Almira" },
  { value: "14", label: "Protocol Poster" },
  { value: "15", label: "Marker" },
  { value: "16", label: "White Board" },
  { value: "17", label: "Display Board" },
  { value: "18", label: "Tab" },
  { value: "19", label: "Thermometers" },
  { value: "20", label: "Resuscitation equipment" },
  { value: "21", label: "NG Tube 6/8 No" },
  { value: "22", label: "Suction equipment (low pressure)" },
  { value: "23", label: "Blood Transfusion Kit" },
  { value: "24", label: "Hb Meter" },
  { value: "25", label: "Glucometer" },
  { value: "26", label: "Bed" },
  { value: "27", label: "Side Table" },
  { value: "28", label: "IV Stand" },
  { value: "29", label: "Room Heater" },
  { value: "30", label: "Cooler / AC" },
  { value: "31", label: "Fan (inward/ weighing area/playing area)" },
  { value: "32", label: "Tabale/Chair" },
  { value: "33", label: "Dustbin" },
  { value: "34", label: "Shoe Rack" },
  { value: "35", label: "TV-  Ward and Play Area" },
  { value: "36", label: "Inverter" },
  { value: "37", label: "Toys for structural play" },
  { value: "38", label: "Washing Machine Automatic" },
  { value: "39", label: "Geyser" },
  { value: "40", label: "Computer With Colour printer For reporting" },
  { value: "41", label: "Bed Seat -for Ward" },
  { value: "42", label: "Medicine Tray" },
  { value: "43", label: "Prada Window and Door" },
  { value: "44", label: "Tube light" },
  { value: "45", label: "Bulb" },
  { value: "46", label: "Cooking Gas" },
  { value: "47", label: "Dietary Scale (Upto 1 gm Sensitive)" },
  { value: "48", label: "Measuring Jar" },
  { value: "49", label: "Electric Mixer Blende" },
  { value: "50", label: "Water Filter/RO" },
  { value: "51", label: "Refrigerator" },
  { value: "52", label: "Utensil for Kitchen" },
  { value: "53", label: "Massacring  Cup, Glass, Spoon" },
  { value: "54", label: "Presser cooker" },
  { value: "55", label: "Steel Cacontner" },
  { value: "56", label: "Tab" },
  { value: "57", label: "Balti Steel - with Mug" },
  { value: "58", label: "Steel Plat Katori, Glass, Spoon" },
  { value: "59", label: "Store Rack" },
  { value: "60", label: "Nutrition Couselling Flip Books" },
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
export default function EquipmentStatusReport() {
  const [quarter, setQuarter] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedMtc, setSelectedMtc] = useState<string[]>([]);
  const [equipment, setEquipment] = useState<string>("");

  const handleSearch = () => {
    const searchParams = {
      quarter,
      year,
      districts: selectedDistricts,
      mtc: selectedMtc,
      equipment,
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
            Equipment Status Report
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          
          {/* First Row: Quarter, Year, District, MTC */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end mb-6">
            
            {/* Quarter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quarter
              </label>
              <div className="relative">
                <select
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white"
                >
                  <option value="">Select</option>
                  {QUARTERS.map((q) => (
                    <option key={q.value} value={q.value}>{q.label}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <div className="relative">
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white"
                >
                  <option value="">Select Year</option>
                  {YEARS.map((y) => (
                    <option key={y.value} value={y.value}>{y.label}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
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
          </div>

          {/* Second Row: Equipment, Search Button */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            
            {/* Equipment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment:
              </label>
              <div className="relative">
                <select
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white truncate"
                >
                  <option value="">Select</option>
                  {EQUIPMENT_OPTIONS.map((eq) => (
                    <option key={eq.value} value={eq.value}>{eq.label}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
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