"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Calendar, 
  Search, 
  ChevronDown, 
  FileSpreadsheet, 
  FileText, 
  Image as ImageIcon
} from "lucide-react";

// --- Types ---
interface Option {
  value: string;
  label: string;
}

type ReportType = "daily" | "monthly" | "quarterly";

// --- Data Constants ---
const DISTRICTS: Option[] = [
  { value: "1", label: "BOKARO" }, { value: "2", label: "CHATRA" }, { value: "16", label: "DEOGHAR" },
  { value: "4", label: "DHANBAD" }, { value: "17", label: "DUMKA" }, { value: "22", label: "EAST SINGHBHUM" },
  { value: "14", label: "GARHWA" }, { value: "3", label: "GIRIDIH" }, { value: "18", label: "GODDA" },
  { value: "9", label: "GUMLA" }, { value: "6", label: "HAZARIBAGH" }, { value: "19", label: "JAMTARA" },
  { value: "10", label: "KHUNTI" }, { value: "7", label: "KODERMA" }, { value: "15", label: "LATEHAR" },
  { value: "11", label: "LOHARDAGA" }, { value: "20", label: "PAKUR" }, { value: "13", label: "PALAMU" },
  { value: "5", label: "RAMGARH" }, { value: "8", label: "RANCHI" }, { value: "21", label: "SAHIBGANJ" },
  { value: "23", label: "SERAIKELA" }, { value: "12", label: "SIMDEGA" }, { value: "24", label: "WEST SINGHBHUM" },
];

const YEARS = Array.from({ length: 10 }, (_, i) => (2020 + i).toString());

const MONTHS: Option[] = [
  { value: "1", label: "January" }, { value: "2", label: "February" }, { value: "3", label: "March" },
  { value: "4", label: "April" }, { value: "5", label: "May" }, { value: "6", label: "June" },
  { value: "7", label: "July" }, { value: "8", label: "August" }, { value: "9", label: "September" },
  { value: "10", label: "October" }, { value: "11", label: "November" }, { value: "12", label: "December" },
];

const QUARTERS: Option[] = [
  { value: "Q1", label: "Q1 (Jan-Mar)" },
  { value: "Q2", label: "Q2 (Apr-Jun)" },
  { value: "Q3", label: "Q3 (Jul-Sep)" },
  { value: "Q4", label: "Q4 (Oct-Dec)" },
];

interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

// --- Sub-component: Custom MultiSelect ---
const MultiSelect = ({ options, selectedValues, onChange, placeholder = "None selected" }: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleAll = () => {
    onChange(selectedValues.length === options.length ? [] : options.map((opt) => opt.value));
  };

  const handleToggleOption = (value: string) => {
    onChange(selectedValues.includes(value) ? selectedValues.filter((v) => v !== value) : [...selectedValues, value]);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className="w-full bg-white border border-gray-300 text-gray-700 py-1.5 px-3 rounded-md text-sm text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {selectedValues.length === 0 ? placeholder : selectedValues.length === options.length ? "All selected" : `${selectedValues.length} selected`}
        </span>
        <ChevronDown size={16} className="text-gray-500 ml-2 shrink-0" />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="p-2 border-b border-gray-200">
            <label className="flex items-center space-x-2 text-sm font-semibold cursor-pointer">
              <input type="checkbox" checked={selectedValues.length === options.length} onChange={handleToggleAll} className="rounded text-teal-600 focus:ring-teal-500" />
              <span>Select all</span>
            </label>
          </div>
          <ul className="py-1">
            {options.map((option) => (
              <li key={option.value}>
                <label className="flex items-center space-x-2 px-3 py-1.5 text-sm hover:bg-gray-100 cursor-pointer">
                  <input type="checkbox" checked={selectedValues.includes(option.value)} onChange={() => handleToggleOption(option.value)} className="rounded text-teal-600 focus:ring-teal-500" />
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
export default function DischargeDashboardDistrict() {
  const [reportType, setReportType] = useState<ReportType>("daily");
  const [fromDate, setFromDate] = useState<string>("2026-04-15");
  const [toDate, setToDate] = useState<string>("2026-04-15");
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [selectedMonth, setSelectedMonth] = useState<string>("4");
  const [selectedQuarter, setSelectedQuarter] = useState<string>("Q2");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const searchParams = {
      reportType,
      districts: selectedDistricts,
      ...(reportType === "daily" && { fromDate, toDate }),
      ...(reportType === "monthly" && { year: selectedYear, month: selectedMonth }),
      ...(reportType === "quarterly" && { year: selectedYear, quarter: selectedQuarter }),
    };
    console.log("Searching with params:", searchParams);
    setHasSearched(true);
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h5 className="text-lg font-medium text-[#0B918C]">Discharge Dashboard By District</h5>
        </div>

        <div className="p-6">
          {/* Report Type Selector */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
            {(["daily", "monthly", "quarterly"] as ReportType[]).map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="radio"
                  name="reportType"
                  checked={reportType === type}
                  onChange={() => { setReportType(type); setHasSearched(false); }}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500 accent-teal-600 cursor-pointer"
                />
                <span className={`text-sm font-medium capitalize ${reportType === type ? 'text-teal-700' : 'text-gray-500 group-hover:text-gray-700'}`}>
                  {type}
                </span>
              </label>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex-1 flex flex-wrap items-end gap-4">
              
              {/* Daily Mode: Date Inputs */}
              {reportType === "daily" && (
                <>
                  <div className="w-full md:w-40">
                    <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                    <div className="relative">
                      <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="w-full md:w-40">
                    <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                    <div className="relative">
                      <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                      <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}

              {/* Monthly/Quarterly Mode: Year Select */}
              {(reportType === "monthly" || reportType === "quarterly") && (
                <div className="w-full md:w-32">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                  >
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              )}

              {/* Monthly Mode: Month Select */}
              {reportType === "monthly" && (
                <div className="w-full md:w-40">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                  <select 
                    value={selectedMonth} 
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                  >
                    {MONTHS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                </div>
              )}

              {/* Quarterly Mode: Quarter Select */}
              {reportType === "quarterly" && (
                <div className="w-full md:w-40">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quarter</label>
                  <select 
                    value={selectedQuarter} 
                    onChange={(e) => setSelectedQuarter(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                  >
                    {QUARTERS.map(q => <option key={q.value} value={q.value}>{q.label}</option>)}
                  </select>
                </div>
              )}

              {/* District Dropdown */}
              <div className="w-full md:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                <MultiSelect options={DISTRICTS} selectedValues={selectedDistricts} onChange={setSelectedDistricts} />
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

            {/* Export Buttons */}
            {hasSearched && (
              <div className="flex items-end gap-2 lg:pb-[2px]">
                <button className="p-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-colors" title="Excel"><FileSpreadsheet size={16} /></button>
                <button className="p-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-colors" title="PDF"><FileText size={16} /></button>
                <button className="p-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-colors" title="Image"><ImageIcon size={16} /></button>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-6">
            <div id="div_Report" className="text-center text-gray-500 text-sm">
              {hasSearched ? "Report Generated Successfully" : "Select filters and click search to view the report."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}