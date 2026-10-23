"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, Search, ChevronDown, Download, RefreshCw, AlertCircle } from "lucide-react";

// Types
type ViewMode = "Range" | "Quarterly";

interface Option {
  value: string;
  label: string;
}

interface ReportRow {
  district_name: string;
  mtc_name: string;
  total_admissions: number;
  total_discharges: number;
  male_admissions: number;
  female_admissions: number;
  avg_admission_weight: number;
  avg_discharge_weight: number;
  avg_length_of_stay: number;
  recovered_count: number;
  non_responder_count: number;
  defaulter_count: number;
  medical_referred_count: number;
  death_count: number;
}

// Data Constants
const YEARS: Option[] = Array.from({ length: 26 }, (_, i) => {
  const year = (2001 + i).toString();
  return { value: year, label: year };
});

const QUARTERS: Option[] = [
  { value: "1", label: "Q1 (Jan 01 - Mar 31)" },
  { value: "2", label: "Q2 (Apr 01 - Jun 30)" },
  { value: "3", label: "Q3 (Jul 01 - Sep 30)" },
  { value: "4", label: "Q4 (Oct 01 - Dec 31)" },
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

export default function MtcQuarterlyReport() {
  const [viewMode, setViewMode] = useState<ViewMode>("Range");
  const [fromDate, setFromDate] = useState<string>("2026-05-01");
  const [toDate, setToDate] = useState<string>("2026-08-31");
  const [year, setYear] = useState<string>("2026");
  const [quarter, setQuarter] = useState<string>("2");

  // Dynamic Dropdown Options
  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
  const [mtcOptions, setMtcOptions] = useState<Option[]>([]);

  // Selected Filter States
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedMtc, setSelectedMtc] = useState<string[]>([]);

  // Report Data & Loading State
  const [reportData, setReportData] = useState<ReportRow[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDistrictsLoading, setIsDistrictsLoading] = useState<boolean>(true);
  const [isMtcLoading, setIsMtcLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [appliedSummary, setAppliedSummary] = useState<string>("");

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
    handleSearch();
  }, []);

  // 2. Fetch MTC Options on District Selection Change
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

  // Handle Search Action
  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.append("mode", viewMode);

    if (viewMode === "Range") {
      params.append("from", fromDate);
      params.append("to", toDate);
    } else {
      params.append("year", year);
      params.append("quarter", quarter);
    }

    if (selectedDistricts.length > 0) {
      params.append("districts", selectedDistricts.join(","));
    }

    if (selectedMtc.length > 0) {
      params.append("mtc", selectedMtc.join(","));
    }

    try {
      const res = await fetch(`/api/mtc-state-report/quarterly?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || json.details || `Fetch failed with status ${res.status}`);
      }

      setReportData(json.data || []);

      // Format Detailed Display for "Showing Results:"
      const dateText = viewMode === "Range" 
        ? `${fromDate} to ${toDate}` 
        : `Q${quarter} ${year} (${json.dateRange?.startDate} to ${json.dateRange?.endDate})`;

      const distText = selectedDistricts.length === 0 || selectedDistricts.length === districtOptions.length
        ? "All Districts"
        : selectedDistricts.join(", ");

      const mtcText = selectedMtc.length === 0 || selectedMtc.length === mtcOptions.length
        ? "All MTCs"
        : selectedMtc.join(", ");

      setAppliedSummary(`Period: [${dateText}] | Districts: [${distText}] | MTCs: [${mtcText}]`);
    } catch (err: any) {
      console.error("Search Error:", err);
      setError(err.message || "Failed to generate quarterly report.");
      setReportData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (!reportData || reportData.length === 0) return;

    const headers = [
      "#,District Name,MTC Name,Total Admissions,Male,Female,Total Discharges,Avg Adm Weight (kg),Avg Discharge Weight (kg),Avg Stay (Days),Recovered,Defaulter,Referred,Deaths",
    ];

    const rows = reportData.map(
      (row, index) =>
        `${index + 1},"${row.district_name}","${row.mtc_name}",${row.total_admissions},${row.male_admissions},${row.female_admissions},${row.total_discharges},${row.avg_admission_weight || 0},${row.avg_discharge_weight || 0},${row.avg_length_of_stay || 0},${row.recovered_count},${row.defaulter_count},${row.medical_referred_count},${row.death_count}`
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MoHFW_Quarterly_Report_${viewMode}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // State Totals
  const totalAdmissions = reportData?.reduce((acc, row) => acc + row.total_admissions, 0) || 0;
  const totalDischarges = reportData?.reduce((acc, row) => acc + row.total_discharges, 0) || 0;
  const totalRecovered = reportData?.reduce((acc, row) => acc + row.recovered_count, 0) || 0;

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h5 className="text-lg font-medium text-[#0B918C]">
            MoHFW MTC Quarterly Report
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="space-y-6">
            
            {/* View Mode Radio Selection */}
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="radio"
                  name="reportMode"
                  className="w-4 h-4 text-[#0B918C] focus:ring-[#0B918C] border-gray-300 cursor-pointer"
                  checked={viewMode === "Range"}
                  onChange={() => setViewMode("Range")}
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  Range
                </span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="radio"
                  name="reportMode"
                  className="w-4 h-4 text-[#0B918C] focus:ring-[#0B918C] border-gray-300 cursor-pointer"
                  checked={viewMode === "Quarterly"}
                  onChange={() => setViewMode("Quarterly")}
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  Quarterly
                </span>
              </label>
            </div>

            {/* Input Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
              {viewMode === "Range" ? (
                <>
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      From Date
                    </label>
                    <div className="relative group">
                      <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white transition-shadow h-[38px]"
                      />
                      <Calendar
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 pointer-events-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      To Date
                    </label>
                    <div className="relative group">
                      <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white transition-shadow h-[38px]"
                      />
                      <Calendar
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 pointer-events-none transition-colors"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Year
                    </label>
                    <div className="relative group">
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white cursor-pointer transition-shadow h-[38px]"
                      >
                        <option value="">Select Year</option>
                        {YEARS.map((y) => (
                          <option key={y.value} value={y.value}>{y.label}</option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 pointer-events-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Quarter
                    </label>
                    <div className="relative group">
                      <select
                        value={quarter}
                        onChange={(e) => setQuarter(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white cursor-pointer transition-shadow h-[38px]"
                      >
                        <option value="">Select Quarter</option>
                        {QUARTERS.map((q) => (
                          <option key={q.value} value={q.value}>{q.label}</option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 pointer-events-none transition-colors"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Dynamic District Dropdown */}
              <div className="w-full">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
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
              <div className="w-full">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
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
              <div className="lg:col-span-1">
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="w-full md:w-auto inline-flex justify-center items-center px-6 py-1.5 border border-[#0B918C] text-[#0B918C] rounded-md text-sm font-semibold hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C] transition-all h-[38px] disabled:opacity-50"
                >
                  {isLoading ? <RefreshCw size={16} className="animate-spin mr-2" /> : <Search size={16} className="mr-2" />}
                  Search
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
                <AlertCircle size={18} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Report Content */}
            <div id="div_Report" className="mt-10 border-t border-gray-200 pt-6">
              {!reportData && !isLoading && !error && (
                <div className="text-center text-gray-400 text-sm italic min-h-[150px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
                  Specify parameters and click Search to generate the quarterly report.
                </div>
              )}

              {reportData && !isLoading && !error && (
                <div className="space-y-4">
                  {/* Action Header displaying full District and MTC summary */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-teal-50/60 p-3 rounded-lg border border-teal-100 text-xs md:text-sm">
                    <div>
                      <span className="font-semibold text-gray-800">Showing Results: </span>
                      <span className="text-[#0B918C] font-medium">{appliedSummary}</span>
                    </div>
                    <button
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0B918C] border border-[#0B918C] bg-white rounded hover:bg-teal-50 transition-colors shadow-sm"
                    >
                      <Download size={14} />
                      Export Report CSV
                    </button>
                  </div>

                  {/* Summary Table displaying District Name and MTC Name */}
                  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="w-full text-left border-collapse text-xs md:text-sm">
                      <thead>
                        <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 uppercase font-semibold">
                          <th className="py-3 px-3 w-10 text-center border-r border-gray-200">#</th>
                          <th className="py-3 px-3 border-r border-gray-200 font-bold text-gray-900">District Name</th>
                          <th className="py-3 px-3 border-r border-gray-200 font-bold text-teal-800">MTC Name</th>
                          <th className="py-3 px-3 border-r border-gray-200 text-right">Admissions</th>
                          <th className="py-3 px-3 border-r border-gray-200 text-right">Male</th>
                          <th className="py-3 px-3 border-r border-gray-200 text-right">Female</th>
                          <th className="py-3 px-3 border-r border-gray-200 text-right">Discharges</th>
                          <th className="py-3 px-3 border-r border-gray-200 text-right">Avg Adm Wt (kg)</th>
                          <th className="py-3 px-3 border-r border-gray-200 text-right">Avg Dis Wt (kg)</th>
                          <th className="py-3 px-3 border-r border-gray-200 text-right">Avg Stay (Days)</th>
                          <th className="py-3 px-3 border-r border-gray-200 text-right text-emerald-800">Recovered</th>
                          <th className="py-3 px-3 text-right text-red-700">Deaths</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-700">
                        {reportData.length === 0 ? (
                          <tr>
                            <td colSpan={12} className="py-8 text-center text-gray-500">
                              No quarterly records found for the selected period.
                            </td>
                          </tr>
                        ) : (
                          reportData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="py-2.5 px-3 text-center border-r border-gray-100 text-gray-400">{index + 1}</td>
                              <td className="py-2.5 px-3 border-r border-gray-100 font-semibold text-gray-900">{row.district_name}</td>
                              <td className="py-2.5 px-3 border-r border-gray-100 font-semibold text-teal-700">{row.mtc_name}</td>
                              <td className="py-2.5 px-3 border-r border-gray-100 text-right font-medium">{row.total_admissions}</td>
                              <td className="py-2.5 px-3 border-r border-gray-100 text-right">{row.male_admissions}</td>
                              <td className="py-2.5 px-3 border-r border-gray-100 text-right">{row.female_admissions}</td>
                              <td className="py-2.5 px-3 border-r border-gray-100 text-right font-medium">{row.total_discharges}</td>
                              <td className="py-2.5 px-3 border-r border-gray-100 text-right">{row.avg_admission_weight || "0.00"}</td>
                              <td className="py-2.5 px-3 border-r border-gray-100 text-right">{row.avg_discharge_weight || "0.00"}</td>
                              <td className="py-2.5 px-3 border-r border-gray-100 text-right">{row.avg_length_of_stay || "0.0"}</td>
                              <td className="py-2.5 px-3 border-r border-gray-100 text-right font-semibold text-emerald-800">{row.recovered_count}</td>
                              <td className="py-2.5 px-3 text-right font-semibold text-red-700">{row.death_count}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                      {reportData.length > 0 && (
                        <tfoot>
                          <tr className="bg-gray-100 font-bold text-gray-800 border-t-2 border-gray-300">
                            <td colSpan={3} className="py-3 px-3">State Totals</td>
                            <td className="py-3 px-3 text-right">{totalAdmissions}</td>
                            <td colSpan={2} className="py-3 px-3 border-r border-gray-200"></td>
                            <td className="py-3 px-3 text-right">{totalDischarges}</td>
                            <td colSpan={3} className="py-3 px-3 border-r border-gray-200"></td>
                            <td className="py-3 px-3 text-right text-emerald-800">{totalRecovered}</td>
                            <td className="py-3 px-3"></td>
                          </tr>
                        </tfoot>
                      )}
                    </table>
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