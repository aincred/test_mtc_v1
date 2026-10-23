"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Calendar, Search, ChevronDown, Download, RefreshCw, AlertCircle, 
  FlaskConical, Pill, User, Hospital, FileDown, X, Printer 
} from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface LabReportRow {
  recordId: string;
  childId: string;
  samNo: string;
  childName: string;
  parentName: string;
  districtName: string;
  mtcName: string;
  totalLabTests: string;
  totalMedicinesGiven: string;
  admissionDate: string;
  createdDate: string;
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

export default function LaboratoryTestsAndMicronutrientsAndAntibiotics() {
  const [fromDate, setFromDate] = useState<string>("2026-05-01");
  const [toDate, setToDate] = useState<string>("2026-08-31");

  // Options State
  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
  const [mtcOptions, setMtcOptions] = useState<Option[]>([]);

  // Selected Filters
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedMtc, setSelectedMtc] = useState<string[]>([]);

  // Table Data & Loading States
  const [reportData, setReportData] = useState<LabReportRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDistrictsLoading, setIsDistrictsLoading] = useState<boolean>(true);
  const [isMtcLoading, setIsMtcLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Selected Detail State
  const [selectedDetail, setSelectedDetail] = useState<any | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);

  // Table Controls
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Districts on Mount
  useEffect(() => {
    const fetchDistricts = async () => {
      setIsDistrictsLoading(true);
      try {
        const res = await fetch("/api/districts");
        const json = await res.json();
        if (res.ok && json.success) {
          const formatted: Option[] = (json.data || []).map((d: any) => {
            const name = d.name || d.district_name || String(d);
            return { value: name, label: name };
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
    handleSearch();
  }, []);

  // Fetch MTC Options on District Selection Change
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
          const formatted: Option[] = (json.centers || []).map((c: any) => ({
            value: c.name || c.mtc_name,
            label: `${c.name || c.mtc_name}${c.district ? ` (${c.district})` : ""}`,
          }));
          setMtcOptions(formatted);

          const validValues = formatted.map((opt) => opt.value);
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

  // Search Action
  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);
    if (selectedDistricts.length > 0) {
      params.append("districts", selectedDistricts.join(","));
    }
    if (selectedMtc.length > 0) {
      params.append("mtc", selectedMtc.join(","));
    }

    try {
      const res = await fetch(`/api/mtc-state-report/lab-tests-details?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || json.details || `Fetch failed with status ${res.status}`);
      }

      setReportData(json.data || []);
      setCurrentPage(1);
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setError(err.message || "Failed to load laboratory tests, micronutrients, and antibiotics report.");
      setReportData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Select Action: Fetch Full Laboratory & Medication Details
  const handleSelectRecord = async (recordId: string) => {
    setIsDetailLoading(true);
    try {
      const res = await fetch(`/api/mtc-state-report/lab-tests-details?recordId=${recordId}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to fetch detailed lab test breakdown");
      }

      setSelectedDetail(json.data);

      setTimeout(() => {
        document.getElementById("div_Report")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      alert(err.message || "Error fetching details.");
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (reportData.length === 0) return;

    const headers = ["#,Reg ID,SAM Number,Child Name,Parent Name,District,MTC Name,Lab Tests Summary,Routine Medicines Summary,Admission Date,Created Date"];
    const rows = reportData.map((row, index) =>
      `${index + 1},"${row.childId}","${row.samNo}","${row.childName}","${row.parentName}","${row.districtName}","${row.mtcName}","${row.totalLabTests}","${row.totalMedicinesGiven}","${row.admissionDate}","${row.createdDate}"`
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laboratory_Tests_Micronutrients_Antibiotics_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Client Filter
  const filteredData = reportData.filter((item) =>
    item.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.samNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.districtName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.mtcName.toLowerCase().includes(searchQuery.toLowerCase())
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
        
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h5 className="text-lg font-medium text-[#0B918C]">
            Laboratory Tests and Micronutrients and Antibiotics
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 items-end mb-6">
            
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
              <label className="block text-sm font-medium text-gray-700 mb-1">MTC</label>
              <MultiSelect
                options={mtcOptions}
                selectedValues={selectedMtc}
                onChange={setSelectedMtc}
                placeholder="All MTCs"
                disabled={isMtcLoading}
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

          {/* Action Bar & Summary Table */}
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
                  placeholder="Search children..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-64 border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm"
                />

                <button
                  onClick={handleExportCSV}
                  disabled={reportData.length === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors text-xs font-semibold whitespace-nowrap disabled:opacity-50"
                >
                  <Download size={14} />
                  Export CSV
                </button>
              </div>

            </div>

            {/* Main Summary Table */}
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
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">MTC Name</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Lab Tests</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Routine Doses</th>
                    <th className="py-3 px-3 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {isLoading ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-teal-700">
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw size={18} className="animate-spin" />
                          <span>Fetching Laboratory Tests and Micronutrients and Antibiotics...</span>
                        </div>
                      </td>
                    </tr>
                  ) : paginatedData.length > 0 ? (
                    paginatedData.map((row, index) => (
                      <tr 
                        key={row.recordId || index} 
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleSelectRecord(row.recordId)}
                      >
                        <td className="py-2.5 px-3 text-center border-r border-gray-100 text-gray-400">{startIndex + index + 1}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 font-semibold text-teal-700">#{row.childId}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 font-medium">{row.samNo}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 font-medium text-gray-900">{row.childName}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100">{row.parentName}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100">{row.districtName}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 font-medium">{row.mtcName}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 font-medium text-teal-800">{row.totalLabTests}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 font-medium text-emerald-800">{row.totalMedicinesGiven}</td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectRecord(row.recordId);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors text-xs font-semibold shadow-sm"
                          >
                            <FileDown size={13} />
                            Select
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-gray-500">
                        No laboratory test or micronutrient records found.
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

            {/* EXPANDED DETAILED VIEW FOR SELECTED CHILD */}
            <div id="div_Report" className="mt-12">
              {isDetailLoading && (
                <div className="p-8 text-center text-teal-700 border border-teal-200 rounded-xl bg-teal-50/30 flex flex-col items-center gap-2">
                  <RefreshCw size={28} className="animate-spin" />
                  <span className="font-medium">Loading Laboratory Tests and Micronutrients and Antibiotics...</span>
                </div>
              )}

              {selectedDetail && !isDetailLoading && (
                <div className="bg-white border-2 border-[#0B918C] rounded-xl shadow-lg p-6 relative">
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-teal-100 text-[#0B918C] rounded-lg">
                        <FlaskConical size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 m-0">
                          Laboratory Tests and Micronutrients and Antibiotics
                        </h4>
                        <p className="text-xs text-gray-500 m-0">
                          SAM No: <span className="font-semibold text-gray-700">{selectedDetail.samNo}</span> | Child Reg ID: #{selectedDetail.childId}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0B918C] text-white text-xs font-semibold rounded-md hover:bg-[#086d69] transition-colors shadow"
                      >
                        <Printer size={14} />
                        Print Details
                      </button>
                      <button
                        onClick={() => setSelectedDetail(null)}
                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        title="Close Details"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Child Info Card */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50/80 p-4 rounded-lg border border-gray-200 text-xs mb-6">
                    <div><span className="text-gray-500">Child Name:</span> <p className="font-semibold text-gray-900 m-0">{selectedDetail.childName}</p></div>
                    <div><span className="text-gray-500">Parent Name:</span> <p className="font-semibold text-gray-900 m-0">{selectedDetail.parentName}</p></div>
                    <div><span className="text-gray-500">District:</span> <p className="font-semibold text-gray-900 m-0">{selectedDetail.districtName}</p></div>
                    <div><span className="text-gray-500">MTC Name:</span> <p className="font-semibold text-gray-900 m-0">{selectedDetail.mtcName}</p></div>
                  </div>

                  {/* Section 1: Laboratory Investigations */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 text-[#0B918C] font-semibold border-b border-teal-100 pb-2 mb-3">
                      <FlaskConical size={18} />
                      <span>Laboratory Investigations & Diagnostics</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedDetail.labBreakdown.map((lab: any, idx: number) => (
                        <div key={`lab-card-${idx}`} className="p-3 rounded-lg border border-gray-200 bg-teal-50/20 text-xs flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-gray-900 block mb-0.5">{lab.name}</span>
                            <span className="text-gray-600">Result: <strong className="text-teal-900">{lab.result}</strong></span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${lab.tested ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-500"}`}>
                            {lab.tested ? "Performed" : "Not Tested"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 2: 30-Day Routine Medication & Supplement Breakdown */}
                  <div>
                    <div className="flex items-center gap-2 text-[#0B918C] font-semibold border-b border-teal-100 pb-2 mb-3">
                      <Pill size={18} />
                      <span>30-Day Routine Micronutrient & Medicine Administration Chart</span>
                    </div>

                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-gray-100 text-gray-700 border-b border-gray-200">
                            <th className="py-2.5 px-3 font-semibold w-48 border-r border-gray-200">Medication / Supplement</th>
                            {Array.from({ length: 30 }, (_, i) => (
                              <th key={`day-h-${i}`} className="py-2 px-1 font-semibold text-center border-r border-gray-200 min-w-[28px]">
                                D{i}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-gray-700">
                          {selectedDetail.routineBreakdown.map((item: any, idx: number) => (
                            <tr key={`routine-row-${idx}`} className="hover:bg-gray-50">
                              <td className="py-2 px-3 font-medium text-gray-900 border-r border-gray-200 whitespace-nowrap">
                                {item.name}
                                {item.otherRoutine && <span className="block text-[10px] text-gray-500 font-normal">{item.otherRoutine}</span>}
                              </td>
                              {item.days.map((val: number, dayIdx: number) => (
                                <td 
                                  key={`day-cell-${idx}-${dayIdx}`} 
                                  className={`py-2 px-1 text-center font-bold border-r border-gray-100 text-[11px] ${
                                    val === 1 ? "bg-emerald-100 text-emerald-800" : "text-gray-300"
                                  }`}
                                >
                                  {val === 1 ? "✓" : "-"}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}