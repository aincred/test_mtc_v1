"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Download, RefreshCw, AlertCircle } from "lucide-react";

// --- Types ---
interface Option {
  value: string;
  label: string;
}

interface EquipmentReportRow {
  id: string;
  mtcCode: string;
  mtcName: string;
  district: string;
  category: string;
  equipmentId: number;
  equipmentName: string;
  totalQuantity: number;
  availability: string;
  workingStatus: string;
  workingQuantity: number;
  lastUpdated: string;
}

// Data Constants
const QUARTERS: Option[] = [
  { value: "1", label: "Quarter 1 (Jan-Mar)" },
  { value: "2", label: "Quarter 2 (Apr-Jun)" },
  { value: "3", label: "Quarter 3 (Jul-Sep)" },
  { value: "4", label: "Quarter 4 (Oct-Dec)" },
];

const YEARS: Option[] = Array.from({ length: 26 }, (_, i) => {
  const year = (2001 + i).toString();
  return { value: year, label: year };
});

const EQUIPMENT_OPTIONS: Option[] = [
  { value: "1", label: "Digital Weighing Scale" },
  { value: "2", label: "Stadiometer" },
  { value: "3", label: "Infantometer" },
  { value: "4", label: "MUAC Tape" },
  { value: "5", label: "Weighing scales (to weigh to 5 gms.)" },
  { value: "6", label: "Clock" },
  { value: "7", label: "Calculator" },
  { value: "8", label: "SAM Chart" },
  { value: "9", label: "SAM Register" },
  { value: "10", label: "Camera" },
  { value: "11", label: "File" },
  { value: "12", label: "Almirah Rack" },
  { value: "13", label: "Almirah" },
  { value: "14", label: "Protocol Poster" },
  { value: "15", label: "Marker" },
  { value: "16", label: "White Board" },
  { value: "17", label: "Display Board" },
  { value: "18", label: "Tablet" },
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
  { value: "32", label: "Table / Chair" },
  { value: "33", label: "Dustbin" },
  { value: "34", label: "Shoe Rack" },
  { value: "35", label: "TV - Ward and Play Area" },
  { value: "36", label: "Inverter" },
  { value: "37", label: "Toys for structural play" },
  { value: "38", label: "Nutrition Counselling Flip Books" },
  { value: "39", label: "Washing Machine Automatic" },
  { value: "40", label: "Geyser" },
  { value: "41", label: "Computer With Colour printer For reporting" },
  { value: "42", label: "Bed Sheet - for Ward" },
  { value: "43", label: "Medicine Tray" },
  { value: "44", label: "Curtains for Window and Door" },
  { value: "45", label: "Tube light" },
  { value: "46", label: "Bulb" },
  { value: "47", label: "Cooking Gas" },
  { value: "48", label: "Dietary Scale (Upto 1 gm Sensitive)" },
  { value: "49", label: "Measuring Jar" },
  { value: "50", label: "Electric Mixer Blender" },
  { value: "51", label: "Water Filter / RO" },
  { value: "52", label: "Refrigerator" },
  { value: "53", label: "Utensils for Kitchen" },
  { value: "54", label: "Measuring Cup, Glass, Spoon" },
  { value: "55", label: "Pressure Cooker" },
  { value: "56", label: "Steel Container" },
  { value: "57", label: "Tablet (Kitchen)" },
  { value: "58", label: "Steel Bucket with Mug" },
  { value: "59", label: "Steel Plate, Bowl, Glass, Spoon" },
  { value: "60", label: "Storage Rack" },
];

// Custom MultiSelect Component
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

// Main Component
export default function EquipmentStatusReport() {
  const [quarter, setQuarter] = useState<string>("3");
  const [year, setYear] = useState<string>("2026");

  // Options State
  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
  const [mtcOptions, setMtcOptions] = useState<Option[]>([]);

  // Filters State
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedMtc, setSelectedMtc] = useState<string[]>([]);
  const [equipment, setEquipment] = useState<string>("");

  // Table Data & Loading States
  const [reportData, setReportData] = useState<EquipmentReportRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDistrictsLoading, setIsDistrictsLoading] = useState<boolean>(true);
  const [isMtcLoading, setIsMtcLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Table Controls State
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Fetch District Options on Mount
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
    handleSearch(); // Fetch initial report data
  }, []);

  // 2. Fetch MTC Options from /api/mtc-centers whenever selectedDistricts changes
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

          // Retain valid selections
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
    if (selectedDistricts.length > 0) {
      params.append("districts", selectedDistricts.join(","));
    }
    if (selectedMtc.length > 0) {
      params.append("mtc", selectedMtc.join(","));
    }
    if (equipment) {
      params.append("equipment", equipment);
    }

    try {
      const res = await fetch(`/api/mtc-state-report/equipment-status?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || json.details || `Fetch failed with status ${res.status}`);
      }

      setReportData(json.data || []);
      setCurrentPage(1);
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setError(err.message || "Failed to load equipment status report.");
      setReportData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (reportData.length === 0) return;

    const headers = ["#,District,MTC Name,Category,Equipment Name,Total Quantity,Availability,Working Status,Working Quantity,Last Updated"];
    const rows = reportData.map((row, index) =>
      `${index + 1},"${row.district}","${row.mtcName}","${row.category}","${row.equipmentName}",${row.totalQuantity},"${row.availability}","${row.workingStatus}",${row.workingQuantity},"${row.lastUpdated}"`
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Equipment_Status_Report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Client Filter
  const filteredData = reportData.filter((item) =>
    item.mtcName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
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
                  className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white h-[38px]"
                >
                  <option value="">Select Quarter</option>
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
                  className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white h-[38px]"
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
                options={districtOptions}
                selectedValues={selectedDistricts}
                onChange={setSelectedDistricts}
                placeholder="All Districts"
                disabled={isDistrictsLoading}
              />
            </div>

            {/* MTC Dropdown */}
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

          </div>

          {/* Second Row: Equipment, Search Button */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end mb-6">
            
            {/* Equipment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment:
              </label>
              <div className="relative">
                <select
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white truncate h-[38px]"
                >
                  <option value="">All Equipments</option>
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
          <div id="div_Report">
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
                  placeholder="Search equipment..."
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

            {/* Data Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 uppercase">
                    <th className="py-3 px-3 font-semibold text-center border-r border-gray-200 w-12">#</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">District</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">MTC Name</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Category</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Equipment Name</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200 text-right">Qty</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Availability</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Working Status</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200 text-right">Working Qty</th>
                    <th className="py-3 px-3 font-semibold">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {isLoading ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-teal-700">
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw size={18} className="animate-spin" />
                          <span>Fetching Equipment Status...</span>
                        </div>
                      </td>
                    </tr>
                  ) : paginatedData.length > 0 ? (
                    paginatedData.map((row, index) => (
                      <tr key={row.id || index} className="hover:bg-gray-50 transition-colors">
                        <td className="py-2.5 px-3 text-center border-r border-gray-100 text-gray-400">{startIndex + index + 1}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 font-medium">{row.district}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 font-semibold text-teal-700">{row.mtcName}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 text-gray-600">{row.category}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 font-medium text-gray-900">{row.equipmentName}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 text-right font-medium">{row.totalQuantity}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                            row.availability.toLowerCase().includes("available")
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {row.availability || "N/A"}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 border-r border-gray-100">{row.workingStatus || "N/A"}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 text-right font-medium">{row.workingQuantity}</td>
                        <td className="py-2.5 px-3 whitespace-nowrap text-gray-500">{row.lastUpdated}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-gray-500">
                        No equipment status records found.
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