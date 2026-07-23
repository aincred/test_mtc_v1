"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, ChevronDown, Download, Loader2, Building2, FileSpreadsheet } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type RangeType = "daily" | "monthly" | "quarterly";

interface MtcOption {
  id: string;
  name: string;
}

interface ChildRecord {
  id: number;
  samNo: string;
  childName: string;
  parentName: string;
  mobile: string;
  sex: string;
  admissionDate: string;
  admissionWeight: number;
  admissionHeight: number;
  zScore: string;
  mtcName: string;
  dischargeDate?: string;
  status: string;
}

const YEARS = Array.from({ length: 7 }, (_, i) => (2020 + i).toString());
const MONTHS = [
  { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
  { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
  { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
  { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
];
const QUARTERS = [
  { id: "1", name: "Q1 (Jan-Mar)" },
  { id: "2", name: "Q2 (Apr-Jun)" },
  { id: "3", name: "Q3 (Jul-Sep)" },
  { id: "4", name: "Q4 (Oct-Dec)" },
];

export default function DownloadChildrenRecords() {
  const currentDate = new Date().toISOString().split("T")[0];
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString();

  // State Management
  const [rangeType, setRangeType] = useState<RangeType>("monthly");
  const [fromDate, setFromDate] = useState<string>(currentDate);
  const [toDate, setToDate] = useState<string>(currentDate);
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [selectedQuarter, setSelectedQuarter] = useState<string>("1");

  const [districtName, setDistrictName] = useState<string>("RANCHI");
  const [mtcOptions, setMtcOptions] = useState<MtcOption[]>([]);
  const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);
  
  const [isMtcOpen, setIsMtcOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [records, setRecords] = useState<ChildRecord[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const mtcRef = useRef<HTMLDivElement>(null);

  // Sync Logged-In User District & Load MTCs
  useEffect(() => {
    const sessionData = sessionStorage.getItem("district_user") || sessionStorage.getItem("user") || sessionStorage.getItem("mtc_user");
    let activeDistrict = "RANCHI";

    if (sessionData) {
      try {
        const user = JSON.parse(sessionData);
        if (user.districtName) {
          activeDistrict = user.districtName.toUpperCase();
          setDistrictName(activeDistrict);
        }
      } catch (e) {
        console.error("Error reading session:", e);
      }
    }

    fetchMtcList(activeDistrict);
  }, []);

  const fetchMtcList = async (distName: string) => {
    try {
      const res = await fetch(`/api/dashboard?districtName=${encodeURIComponent(distName)}`);
      const json = await res.json();
      if (json.locations) {
        const opts = json.locations.map((loc: any) => ({ id: String(loc.id), name: loc.name }));
        setMtcOptions(opts);
        setSelectedMtcs(opts.map((m: MtcOption) => m.id)); // Select all by default
      }
    } catch (e) {
      console.error("Failed to load MTC list:", e);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mtcRef.current && !mtcRef.current.contains(event.target as Node)) setIsMtcOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    setIsSearching(true);
    setHasSearched(true);

    try {
      const queryParams = new URLSearchParams({
        rangeType,
        districtName,
        ...(selectedMtcs.length > 0 && { mtcs: selectedMtcs.join(",") }),
        ...(rangeType === "daily" && { fromDate, toDate }),
        ...(rangeType === "monthly" && { year: selectedYear, month: selectedMonth }),
        ...(rangeType === "quarterly" && { year: selectedYear, quarter: selectedQuarter }),
      });

      const res = await fetch(`/api/reports/download-children-records?${queryParams.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to fetch patient records.");
      }

      setRecords(json.records || []);
    } catch (err: any) {
      console.error("Search failed:", err);
      toast.error(err.message || "An error occurred while retrieving records.");
      setRecords([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleDownloadCSV = () => {
    if (records.length === 0) {
      toast.error("No records available to export");
      return;
    }

    const headers = [
      "SAM Number", "Child Name", "Parent Name", "Mobile", "Sex",
      "MTC Center", "Admission Date", "Weight (kg)", "Height (cm)", "Z-Score", "Discharge Date", "Status"
    ];

    const csvRows = records.map(r => [
      `"${r.samNo}"`,
      `"${r.childName}"`,
      `"${r.parentName}"`,
      `"${r.mobile}"`,
      `"${r.sex}"`,
      `"${r.mtcName}"`,
      `"${r.admissionDate}"`,
      r.admissionWeight,
      r.admissionHeight,
      `"${r.zScore}"`,
      `"${r.dischargeDate || 'N/A'}"`,
      `"${r.status}"`
    ]);

    const csvContent = [headers.join(","), ...csvRows.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Children_Records_${districtName}_${rangeType}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Spreadsheet generated successfully!");
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 font-sans">
      <Toaster position="top-right" />

      {/* Card Header */}
      <div className="bg-blue-50 border border-gray-200 px-6 py-4 rounded-t-xl flex justify-between items-center">
        <h5 className="text-[1.25rem] font-bold m-0 text-blue-700 flex items-center gap-2">
          <FileSpreadsheet size={22} /> Download Children Records
        </h5>
        <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-semibold flex items-center gap-1.5">
          <Building2 size={13} /> {districtName} District Scope
        </span>
      </div>

      <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200 p-4 md:p-6 text-sm">
        
        {/* Range Selection */}
        <div className="flex items-center space-x-6 mb-6">
          {(["daily", "monthly", "quarterly"] as RangeType[]).map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="radio"
                name="rangeType"
                checked={rangeType === type}
                onChange={() => { setRangeType(type); setHasSearched(false); }}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
              />
              <span className={`capitalize font-medium ${rangeType === type ? "text-blue-600 font-bold" : "text-gray-600 group-hover:text-gray-800"}`}>
                {type}
              </span>
            </label>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end mb-6">
          {rangeType === "daily" ? (
            <>
              <div>
                <label className="block font-medium text-gray-700 mb-1">From Date</label>
                <input 
                  type="date" 
                  value={fromDate} 
                  onChange={(e) => setFromDate(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">To Date</label>
                <input 
                  type="date" 
                  value={toDate} 
                  onChange={(e) => setToDate(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Year</label>
                <select 
                  value={selectedYear} 
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  {rangeType === "monthly" ? "Month" : "Quarter"}
                </label>
                <select 
                  value={rangeType === "monthly" ? selectedMonth : selectedQuarter}
                  onChange={(e) => rangeType === "monthly" ? setSelectedMonth(e.target.value) : setSelectedQuarter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{rangeType === "monthly" ? "All Months" : "Select Quarter"}</option>
                  {(rangeType === "monthly" ? MONTHS : QUARTERS).map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Locked District Display */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">District</label>
            <div className="w-full bg-slate-100 border border-gray-300 rounded-md py-2 px-3 text-slate-700 font-bold h-[38px] flex items-center cursor-not-allowed">
              <span>{districtName}</span>
            </div>
          </div>

          {/* MTC Filter Dropdown */}
          <div className="relative" ref={mtcRef}>
            <label className="block font-medium text-gray-700 mb-1">MTC</label>
            <button
              type="button"
              onClick={() => setIsMtcOpen(!isMtcOpen)}
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:ring-2 focus:ring-blue-500 h-[38px] flex items-center justify-between"
            >
              <span className="truncate text-gray-700">
                {selectedMtcs.length === 0 ? "None selected" : 
                 selectedMtcs.length === mtcOptions.length ? `All selected (${mtcOptions.length})` : 
                 `${selectedMtcs.length} selected`}
              </span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            {isMtcOpen && (
              <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-2 max-h-60 overflow-y-auto">
                {mtcOptions.map(mtc => (
                  <label key={mtc.id} className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMtcs.includes(mtc.id)}
                      onChange={() => setSelectedMtcs(prev => prev.includes(mtc.id) ? prev.filter(id => id !== mtc.id) : [...prev, mtc.id])}
                      className="accent-blue-600 w-4 h-4"
                    />
                    <span>{mtc.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="h-[38px] inline-flex justify-center items-center gap-2 px-6 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all font-bold disabled:opacity-50"
          >
            {isSearching ? <Loader2 size={16} className="animate-spin" /> : <SearchIcon size={16} />} 
            {isSearching ? "Loading..." : "Search"}
          </button>
        </div>

        {/* Results Workspace */}
        {hasSearched && (
          <div className="mt-8 pt-6 border-t border-gray-200 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <p className="text-gray-600 font-semibold text-sm">
                  Found <span className="text-blue-700 font-bold">{records.length}</span> patient records.
                </p>
              </div>
              {records.length > 0 && (
                <button
                  onClick={handleDownloadCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md text-xs font-bold transition-colors shadow-sm"
                >
                  <Download size={15} /> Export Spreadsheet (.CSV)
                </button>
              )}
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-lg overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold uppercase">
                  <tr>
                    <th className="px-4 py-3">SAM Number</th>
                    <th className="px-4 py-3">Child Name</th>
                    <th className="px-4 py-3">Parent/Guardian</th>
                    <th className="px-4 py-3">Mobile</th>
                    <th className="px-4 py-3">MTC Unit</th>
                    <th className="px-4 py-3">Admission Date</th>
                    <th className="px-4 py-3 text-center">Weight</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {records.length > 0 ? (
                    records.map((r) => (
                      <tr key={r.id} className="hover:bg-blue-50/40 transition-colors">
                        <td className="px-4 py-3 font-mono font-medium text-blue-900">{r.samNo}</td>
                        <td className="px-4 py-3 font-bold text-gray-800">{r.childName}</td>
                        <td className="px-4 py-3 text-gray-600">{r.parentName}</td>
                        <td className="px-4 py-3 text-gray-600">{r.mobile}</td>
                        <td className="px-4 py-3 text-gray-700 font-medium">{r.mtcName}</td>
                        <td className="px-4 py-3 text-gray-600">{r.admissionDate}</td>
                        <td className="px-4 py-3 text-center text-teal-700 font-bold">{r.admissionWeight} kg</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                            r.status === 'Cured' ? 'bg-green-100 text-green-800' :
                            r.status === 'Defaulter' ? 'bg-amber-100 text-amber-800' :
                            r.status === 'Death' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-gray-400">
                        No patient records found matching the selected timeframe and MTC centers.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}