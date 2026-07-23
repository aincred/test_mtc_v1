"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, ChevronDown, Download, BarChart3, Users, UserX, HeartOff, Loader2, Building2 } from "lucide-react";

// --- Types & Constants ---
type RangeType = "daily" | "monthly" | "quarterly";

interface MtcOption {
  id: number;
  name: string;
}

interface ReportSummary {
  totalDischarged: number;
  totalDefaulters: number;
  totalDeaths: number;
  avgSuccessRate: string;
}

interface ReportRow {
  id: number;
  name: string;
  cured: number;
  lama: number;
  defaulter: number;
  death: number;
  ref: number;
  totalDischarged: number;
  rate: string;
}

const YEARS = Array.from({ length: 5 }, (_, i) => (2022 + i).toString());
const MONTHS = [
  { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
  { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
  { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
  { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
];
const QUARTERS = [
  { id: "1", name: "Q1 (Jan-Mar)" }, { id: "2", name: "Q2 (Apr-Jun)" },
  { id: "3", name: "Q3 (Jul-Sep)" }, { id: "4", name: "Q4 (Oct-Dec)" },
];

export default function MtcDischargeReport() {
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString();
  const currentDate = new Date().toISOString().split("T")[0];

  const [range, setRange] = useState<RangeType>("monthly");
  const [fromDate, setFromDate] = useState<string>(currentDate);
  const [toDate, setToDate] = useState<string>(currentDate);
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [selectedQuarter, setSelectedQuarter] = useState<string>("1");

  // Locked District State
  const [districtName, setDistrictName] = useState<string>("RANCHI");
  const [mtcOptions, setMtcOptions] = useState<MtcOption[]>([]);
  const [selectedMtcs, setSelectedMtcs] = useState<number[]>([]);

  const [isMtcOpen, setIsMtcOpen] = useState(false);
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [reportData, setReportData] = useState<ReportRow[]>([]);
  
  const [showReport, setShowReport] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mtcRef = useRef<HTMLDivElement>(null);

  // Sync Logged-In District from session storage
  useEffect(() => {
    const sessionData = sessionStorage.getItem("district_user") || sessionStorage.getItem("user");
    let activeDistrict = "RANCHI";

    if (sessionData) {
      try {
        const user = JSON.parse(sessionData);
        if (user.districtName) {
          activeDistrict = user.districtName.toUpperCase();
          setDistrictName(activeDistrict);
        }
      } catch (e) {
        console.error("Error reading session user:", e);
      }
    }

    fetchMtcList(activeDistrict);
  }, []);

  const fetchMtcList = async (distName: string) => {
    try {
      const res = await fetch(`/api/dashboard?districtName=${encodeURIComponent(distName)}`);
      const json = await res.json();
      if (json.locations) {
        setMtcOptions(json.locations.map((loc: any) => ({ id: Number(loc.id), name: loc.name })));
      }
    } catch (e) {
      console.error("Failed to load MTC options:", e);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mtcRef.current && !mtcRef.current.contains(e.target as Node)) setIsMtcOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    setIsSearching(true);
    setErrorMsg(null);

    try {
      const queryParams = new URLSearchParams({
        range,
        fromDate,
        toDate,
        year: selectedYear,
        month: selectedMonth,
        quarter: selectedQuarter,
        districtName,
        ...(selectedMtcs.length > 0 && { mtcIds: selectedMtcs.join(",") })
      });

      const res = await fetch(`/api/reports/children-discharged?${queryParams.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || json.message || "Failed to fetch discharge report.");
      }

      setSummary(json.summary);
      setReportData(json.data || []);
      setShowReport(true);
    } catch (err: any) {
      console.error("Discharge report error:", err);
      setErrorMsg(err.message || "An error occurred while loading discharge data.");
      setShowReport(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleExportCSV = () => {
    if (!reportData.length) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `Children Discharged Report - ${districtName} District\n`;
    csvContent += `Range: ${range.toUpperCase()}, Year: ${selectedYear}\n\n`;
    csvContent += "MTC Name,Total Discharged,Cured,LAMA,Defaulter,Deaths,Referrals,Cure Rate (%)\n";

    reportData.forEach((row) => {
      csvContent += `"${row.name}",${row.totalDischarged},${row.cured},${row.lama},${row.defaulter},${row.death},${row.ref},${row.rate}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Discharged_Report_${districtName}_${range}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 text-sm">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-blue-700">Children Discharged by MTC</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-semibold flex items-center gap-1.5">
            <Building2 size={13} /> {districtName} DISTRICT
          </span>
        </div>

        {/* Range Selector */}
        <div className="flex items-center space-x-6 mb-6">
          {(["daily", "monthly", "quarterly"] as RangeType[]).map((r) => (
            <label key={r} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="radio"
                checked={range === r}
                onChange={() => { setRange(r); setShowReport(false); }}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 accent-blue-600"
              />
              <span className={`capitalize font-medium ${range === r ? "text-blue-600 font-bold" : "text-gray-500"}`}>
                {r}
              </span>
            </label>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end mb-8">
          {range === "daily" ? (
            <>
              <div>
                <label className="block font-medium text-gray-700 mb-1">From Date</label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">To Date</label>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Year</label>
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-white outline-none focus:ring-2 focus:ring-blue-500">
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">{range === "monthly" ? "Month" : "Quarter"}</label>
                <select 
                  value={range === "monthly" ? selectedMonth : selectedQuarter} 
                  onChange={(e) => range === "monthly" ? setSelectedMonth(e.target.value) : setSelectedQuarter(e.target.value)} 
                  className="w-full px-3 py-2 border rounded-md bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{range === "monthly" ? "All Months" : "Select Quarter"}</option>
                  {(range === "monthly" ? MONTHS : QUARTERS).map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
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

          {/* Dynamic MTC Filter Dropdown */}
          <div className="relative" ref={mtcRef}>
            <label className="block font-medium text-gray-700 mb-1">MTC</label>
            <button onClick={() => setIsMtcOpen(!isMtcOpen)} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left h-[38px] flex justify-between items-center">
              <span className="truncate">{selectedMtcs.length === 0 ? "All MTCs" : `${selectedMtcs.length} selected`}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            {isMtcOpen && (
              <div className="absolute z-20 mt-1 w-full bg-white border rounded-md shadow-lg p-1 max-h-60 overflow-y-auto">
                {mtcOptions.map(m => (
                  <label key={m.id} className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedMtcs.includes(m.id)} 
                      onChange={() => setSelectedMtcs(prev => prev.includes(m.id) ? prev.filter(i => i !== m.id) : [...prev, m.id])} 
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" 
                    />
                    <span>{m.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button onClick={handleSearch} disabled={isSearching} className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all font-bold disabled:opacity-50">
            {isSearching ? <Loader2 size={16} className="animate-spin" /> : <SearchIcon size={16} />} 
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {errorMsg}
          </div>
        )}

        {/* Results Section */}
        {showReport && summary && (
          <div className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-center gap-4">
                <div className="bg-blue-600 p-3 rounded-full text-white"><Users size={20} /></div>
                <div>
                  <p className="text-blue-800 text-xs font-bold uppercase">Total Discharged</p>
                  <p className="text-2xl font-black text-blue-900">{summary.totalDischarged}</p>
                </div>
              </div>

              <div className="bg-rose-50 border border-rose-100 p-4 rounded-lg flex items-center gap-4">
                <div className="bg-rose-600 p-3 rounded-full text-white"><UserX size={20} /></div>
                <div>
                  <p className="text-rose-800 text-xs font-bold uppercase">Total Defaulters</p>
                  <p className="text-2xl font-black text-rose-900">{summary.totalDefaulters}</p>
                </div>
              </div>

              <div className="bg-slate-100 border border-slate-200 p-4 rounded-lg flex items-center gap-4">
                <div className="bg-slate-700 p-3 rounded-full text-white"><HeartOff size={20} /></div>
                <div>
                  <p className="text-slate-800 text-xs font-bold uppercase">Total Deaths</p>
                  <p className="text-2xl font-black text-slate-900">{summary.totalDeaths}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-center gap-4">
                <div className="bg-blue-600 p-3 rounded-full text-white"><BarChart3 size={20} /></div>
                <div>
                  <p className="text-blue-800 text-xs font-bold uppercase">Avg. Success Rate</p>
                  <p className="text-2xl font-black text-blue-900">{summary.avgSuccessRate}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <button 
                onClick={handleExportCSV}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-700 text-white rounded-md font-bold hover:bg-blue-800 transition-colors shadow-sm text-xs"
              >
                <Download size={16} /> Export MTC Data
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-x-auto shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                  <tr>
                    <th className="px-4 py-3">MTC Name</th>
                    <th className="px-4 py-3 text-center">Cured</th>
                    <th className="px-4 py-3 text-center">LAMA</th>
                    <th className="px-4 py-3 text-center text-rose-700">Defaulter</th>
                    <th className="px-4 py-3 text-center text-slate-700">Death</th>
                    <th className="px-4 py-3 text-center">Referrals</th>
                    <th className="px-4 py-3 text-right">Cure Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {reportData.length > 0 ? (
                    reportData.map((mtc) => (
                      <tr key={mtc.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-4 py-3 font-semibold text-gray-800">{mtc.name}</td>
                        <td className="px-4 py-3 text-center text-green-600 font-medium">{mtc.cured}</td>
                        <td className="px-4 py-3 text-center text-amber-600">{mtc.lama}</td>
                        <td className="px-4 py-3 text-center text-rose-600 font-medium">{mtc.defaulter}</td>
                        <td className="px-4 py-3 text-center text-slate-700 font-semibold">{mtc.death}</td>
                        <td className="px-4 py-3 text-center text-blue-500">{mtc.ref}</td>
                        <td className="px-4 py-3 text-right font-black text-blue-700">{mtc.rate}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-gray-400">
                        No discharge records found for the selected timeframe.
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