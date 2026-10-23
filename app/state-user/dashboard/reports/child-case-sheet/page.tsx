"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, Search, ChevronDown, RefreshCw } from "lucide-react";

// --- Types ---
interface Option {
  value: string;
  label: string;
}

// --- Sub-component: Custom MultiSelect ---
const MultiSelect = ({
  options,
  selectedValues,
  onChange,
  placeholder = "None selected",
  disabled = false,
}: {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
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
    if (disabled) return "Loading...";
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
        disabled={disabled}
        className="w-full bg-white border border-gray-300 text-gray-700 py-1.5 px-3 rounded-md text-sm text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100 disabled:text-gray-400"
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="truncate">{getDisplayText()}</span>
        <ChevronDown size={16} className="text-gray-500 ml-2 shrink-0" />
      </button>

      {isOpen && !disabled && (
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
            {options.map((option, index) => (
              <li key={`opt-${option.value}-${index}`}>
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
              <li className="px-3 py-2 text-sm text-gray-500 text-center">No options available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

// --- Main Component ---
export default function DownloadChildrenRecords() {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  // Dynamic Options State
  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
  const [mtcOptions, setMtcOptions] = useState<Option[]>([]);

  // Selection States
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedMtc, setSelectedMtc] = useState<string[]>([]);

  // Loading States
  const [isDistrictsLoading, setIsDistrictsLoading] = useState<boolean>(true);
  const [isMtcLoading, setIsMtcLoading] = useState<boolean>(false);

  // 1. Fetch District Options on Mount
  useEffect(() => {
    const fetchDistricts = async () => {
      setIsDistrictsLoading(true);
      try {
        const res = await fetch("/api/districts");
        const json = await res.json();
        if (res.ok && json.success) {
          const formatted = (json.data || []).map((d: any) => ({
            value: d.name, // Use District Name as value for MTC API filtering
            label: d.name,
          }));
          setDistrictOptions(formatted);
        }
      } catch (err) {
        console.error("Error fetching districts:", err);
      } finally {
        setIsDistrictsLoading(false);
      }
    };

    fetchDistricts();
  }, []);

  // 2. Fetch MTC Options whenever selectedDistricts changes
  useEffect(() => {
    const fetchMtcCenters = async () => {
      setIsMtcLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedDistricts.length > 0) {
          params.append("districtName", selectedDistricts.join(","));
        }

        const res = await fetch(`/api/mtc-centers?${params.toString()}`);
        const json = await res.json();

        if (res.ok && json.success) {
          const formatted = (json.centers || []).map((c: any) => ({
            value: c.id.toString(),
            label: `${c.name} (${c.district})`,
          }));
          setMtcOptions(formatted);

          // Clean up selected MTCs that are no longer in the valid options
          const validValues = formatted.map((opt: Option) => opt.value);
          setSelectedMtc((prev) => prev.filter((val) => validValues.includes(val)));
        }
      } catch (err) {
        console.error("Error fetching MTC centers:", err);
      } finally {
        setIsMtcLoading(false);
      }
    };

    fetchMtcCenters();
  }, [selectedDistricts]);

  const handleSearch = () => {
    const searchParams = {
      fromDate,
      toDate,
      districts: selectedDistricts,
      mtc: selectedMtc,
    };
    console.log("Searching with parameters:", searchParams);
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h5 className="text-lg font-medium" style={{ color: "rgb(11,145,140)" }}>
            Download Children Records
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

            {/* Dynamic District Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <MultiSelect
                options={districtOptions}
                selectedValues={selectedDistricts}
                onChange={setSelectedDistricts}
                placeholder="All Districts"
                disabled={isDistrictsLoading}
              />
            </div>

            {/* Dynamic MTC Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                MTC
              </label>
              <MultiSelect
                options={mtcOptions}
                selectedValues={selectedMtc}
                onChange={setSelectedMtc}
                placeholder="All MTCs"
                disabled={isMtcLoading}
              />
            </div>

            {/* Search Button */}
            <div>
              <button
                type="button"
                onClick={handleSearch}
                className="w-full md:w-auto inline-flex justify-center items-center px-6 py-1.5 border border-teal-600 text-teal-600 rounded-md text-sm font-medium hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors h-[38px]"
              >
                <Search size={16} className="mr-2" />
                Search
              </button>
            </div>
            
          </div>

          {/* Report Output Area */}
          <div className="mt-8 text-center text-gray-500 text-sm" id="div_Report">
            {/* Dynamic search results will render here */}
          </div>

        </div>
      </div>
    </div>
  );
}