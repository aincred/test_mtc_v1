"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, Search, ChevronDown, Download, RefreshCw, AlertCircle } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface ChildRecordRow {
  registration_id: number;
  sam_no: string;
  child_full_name: string;
  parent_name: string;
  dob_formatted: string;
  admission_date_formatted: string;
  district_name: string;
  admission_weight_kg: number | string;
  length_height_cm: number | string;
  mobile_number: string;
}

// MultiSelect Dropdown Component
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
        className="w-full bg-white border border-gray-300 text-gray-700 py-1.5 px-3 rounded-md text-sm text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100 disabled:text-gray-400 h-[38px]"
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
              <li key={`opt-${option.value || index}`}>
                <label className="flex items-center space-x-2 px-3 py-1.5 text-sm hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    checked={selectedValues.includes(option.value)}
                    onChange={() => handleToggleOption(option.value)}
                  />
                  <span className="text-gray-800 font-medium">
                    {option.label || option.value}
                  </span>
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

export default function DownloadChildrenRecords() {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [isDistrictsLoading, setIsDistrictsLoading] = useState<boolean>(true);

  // Table Data & Search States
  const [tableData, setTableData] = useState<ChildRecordRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Table Controls State
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Load Districts on Mount
  useEffect(() => {
    const fetchDistricts = async () => {
      setIsDistrictsLoading(true);
      try {
        const res = await fetch("/api/districts");
        const json = await res.json();
        if (res.ok && json.success) {
          const formatted: Option[] = (json.data || []).map((d: any) => {
            const districtText = d.name || d.district_name || d.label || String(d);
            return {
              value: districtText,
              label: districtText,
            };
          });
          setDistrictOptions(formatted);
        }
      } catch (err) {
        console.error("Error fetching districts:", err);
      } finally {
        setIsDistrictsLoading(false);
      }
    };

    fetchDistricts();
    handleSearch(); // Fetch initial data
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);
    if (selectedDistricts.length > 0) {
      params.append("districts", selectedDistricts.join(","));
    }

    try {
      const res = await fetch(`/api/mtc-state-report/download-children-records?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || json.details || `Fetch failed with status ${res.status}`);
      }

      setTableData(json.data || []);
      setCurrentPage(1);
    } catch (err: any) {
      console.error("Search Error:", err);
      setError(err.message || "Failed to load children records.");
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (tableData.length === 0) return;

    const headers = ["#,Registration ID,SAM Number,Child Name,Parent Name,District,DOB,Admission Date,Weight (kg),Height (cm),Mobile Number"];
    const rows = tableData.map((row, index) =>
      `${index + 1},"${row.registration_id}","${row.sam_no || "-"}","${row.child_full_name || "-"}","${row.parent_name || "-"}","${row.district_name || "-"}","${row.dob_formatted || "-"}","${row.admission_date_formatted || "-"}","${row.admission_weight_kg || 0}","${row.length_height_cm || 0}","${row.mobile_number || "-"}"`
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Children_Records_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Client Filter
  const filteredData = tableData.filter((item) =>
    (item.child_full_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.sam_no || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.registration_id || "").toString().includes(searchQuery)
  );

  // Pagination
  const totalEntries = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h5 className="text-lg font-medium" style={{ color: "rgb(11,145,140)" }}>
            Download Children Records
          </h5>
        </div>

        {/* Form Filters */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end mb-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 h-[38px]"
                />
                <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 h-[38px]"
                />
                <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
              <MultiSelect
                options={districtOptions}
                selectedValues={selectedDistricts}
                onChange={setSelectedDistricts}
                placeholder="All Districts"
                disabled={isDistrictsLoading}
              />
            </div>

            <div>
              <button
                type="button"
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full md:w-auto inline-flex justify-center items-center px-6 py-1.5 border border-teal-600 text-teal-600 rounded-md text-sm font-medium hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors h-[38px] disabled:opacity-50"
              >
                {isLoading ? <RefreshCw size={16} className="animate-spin mr-2" /> : <Search size={16} className="mr-2" />}
                Search
              </button>
            </div>

          </div>

          <div className="w-full h-px bg-gray-200 mb-6"></div>

          {error && (
            <div className="p-4 mb-6 rounded-md bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Results Action & Table */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 text-sm">
              
              <div className="flex items-center gap-2 text-gray-700">
                <span>Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>entries</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input
                  type="search"
                  placeholder="Search records..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-64 border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm"
                />

                <button
                  onClick={handleExportCSV}
                  disabled={tableData.length === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors text-xs font-semibold whitespace-nowrap disabled:opacity-50"
                >
                  <Download size={14} />
                  Export CSV
                </button>
              </div>

            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 uppercase">
                    <th className="py-3 px-3 font-semibold text-center border-r border-gray-200 w-12">#</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Reg ID</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">SAM Number</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Child Name</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Parent Name</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">District</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">DOB</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Admission Date</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200 text-right">Weight (kg)</th>
                    <th className="py-3 px-3 font-semibold text-right">Height (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {isLoading ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-teal-700">
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw size={18} className="animate-spin" />
                          <span>Fetching Children Records...</span>
                        </div>
                      </td>
                    </tr>
                  ) : paginatedData.length > 0 ? (
                    paginatedData.map((row, index) => (
                      <tr key={row.registration_id || index} className="hover:bg-gray-50 transition-colors">
                        <td className="py-2.5 px-3 text-center border-r border-gray-100 text-gray-400">{startIndex + index + 1}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 font-semibold text-teal-700">#{row.registration_id}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 font-medium">{row.sam_no || "-"}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 font-medium text-gray-900">{row.child_full_name || "-"}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100">{row.parent_name || "-"}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100">{row.district_name || "-"}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 whitespace-nowrap">{row.dob_formatted || "-"}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 whitespace-nowrap">{row.admission_date_formatted || "-"}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 text-right">{row.admission_weight_kg || "0.00"}</td>
                        <td className="py-2.5 px-3 text-right">{row.length_height_cm || "0.00"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-gray-500">
                        No records found for the selected filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 text-gray-600 text-sm">
              <div>
                Showing {totalEntries === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries.toLocaleString()} entries
              </div>

              <div className="flex items-center shadow-sm rounded-md overflow-hidden border border-gray-200 bg-white">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-200 transition-colors"
                >
                  Previous
                </button>

                <span className="px-3 py-1.5 border-r border-gray-200 text-teal-700 font-medium bg-teal-50">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}