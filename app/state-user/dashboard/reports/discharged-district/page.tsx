"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, Activity, Clock } from "lucide-react";

// --- Types ---
interface District { id: string; name: string; }
interface MTC { id: string; districtId: string; name: string; }
type ReportMode = "daily" | "monthly" | "quarterly";

// --- Constants ---
const DISTRICTS: District[] = [
  { id: "1", name: "BOKARO" }, { id: "2", name: "CHATRA" }, { id: "16", name: "DEOGHAR" },
  { id: "4", name: "DHANBAD" }, { id: "17", name: "DUMKA" }, { id: "22", name: "EAST SINGHBHUM" },
  { id: "14", name: "GARHWA" }, { id: "3", name: "GIRIDIH" }, { id: "18", name: "GODDA" },
  { id: "9", name: "GUMLA" }, { id: "6", name: "HAZARIBAGH" }, { id: "19", name: "JAMTARA" },
  { id: "10", name: "KHUNTI" }, { id: "7", name: "KODERMA" }, { id: "15", name: "LATEHAR" },
  { id: "11", name: "LOHARDAGA" }, { id: "20", name: "PAKUR" }, { id: "13", name: "PALAMU" },
  { id: "5", name: "RAMGARH" }, { id: "8", name: "RANCHI" }, { id: "21", name: "SAHIBGANJ" },
  { id: "23", name: "SERAIKELA" }, { id: "12", name: "SIMDEGA" }, { id: "24", name: "WEST SINGHBHUM" },
];

const MOCK_MTCS: MTC[] = [
  { id: "m1", districtId: "1", name: "Bokaro General MTC" },
  { id: "m2", districtId: "1", name: "Chas CHC MTC" },
  { id: "m3", districtId: "8", name: "RIMS Ranchi MTC" },
  { id: "m4", districtId: "8", name: "Sadar Ranchi MTC" },
  { id: "m5", districtId: "4", name: "PMCH Dhanbad MTC" },
];

const YEARS = Array.from({ length: 6 }, (_, i) => (2021 + i).toString());
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

export default function ChildrenDischargedReport() {
  // Mode State
  const [reportMode, setReportMode] = useState<ReportMode>("daily");

  // Selection State
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedMtcIds, setSelectedMtcIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reportResult, setReportResult] = useState<string | null>(null);

  // Time States
  const [fromDate, setFromDate] = useState<string>("2026-04-14");
  const [toDate, setToDate] = useState<string>("2026-04-14");
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [selectedMonth, setSelectedMonth] = useState<string>("4");
  const [selectedQuarter, setSelectedQuarter] = useState<string>("2");

  // Filter MTCs based on selected Districts
  const availableMTCs = useMemo(() => {
    if (selectedDistricts.length === 0) return [];
    return MOCK_MTCS.filter((mtc) => selectedDistricts.includes(mtc.districtId));
  }, [selectedDistricts]);

  // Sync MTC selection if districts are removed
  useEffect(() => {
    const validIds = new Set(availableMTCs.map(m => m.id));
    setSelectedMtcIds(prev => prev.filter(id => validIds.has(id)));
  }, [availableMTCs]);

  // Handlers
  const toggleDistrict = (id: string) => {
    setSelectedDistricts(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);
  };

  const toggleMtc = (id: string) => {
    setSelectedMtcIds(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const handleSearch = () => {
    setIsLoading(true);
    const payload = {
      mode: reportMode,
      districts: selectedDistricts,
      mtcs: selectedMtcIds,
      ...(reportMode === "daily" && { fromDate, toDate }),
      ...(reportMode === "monthly" && { year: selectedYear, month: selectedMonth }),
      ...(reportMode === "quarterly" && { year: selectedYear, quarter: selectedQuarter }),
    };
    
    console.log("Search Payload:", payload);
    
    setTimeout(() => {
        setReportResult(`${reportMode.toUpperCase()} Report generated for ${selectedMtcIds.length} MTCs.`);
        setIsLoading(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center flex-wrap gap-4">
          <h5 className="text-lg font-semibold text-[#0b918c] m-0 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Children Discharged Detailed Report
          </h5>

          {/* Mode Selector Toggle */}
          <div className="flex bg-gray-200 p-1 rounded-lg">
            {(["daily", "monthly", "quarterly"] as ReportMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => { setReportMode(mode); setReportResult(null); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  reportMode === mode ? "bg-white text-[#0b918c] shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {mode.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* 1. Dynamic Period Column */}
            <div className="md:col-span-4 lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Select Period</span>
              </div>

              {reportMode === "daily" ? (
                <>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">From Date</label>
                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full rounded-md border-gray-300 py-2 text-sm focus:ring-[#0b918c] focus:border-[#0b918c]" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">To Date</label>
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full rounded-md border-gray-300 py-2 text-sm focus:ring-[#0b918c] focus:border-[#0b918c]" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Year</label>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full rounded-md border-gray-300 py-2 text-sm bg-white">
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">{reportMode === "monthly" ? "Month" : "Quarter"}</label>
                    <select 
                      value={reportMode === "monthly" ? selectedMonth : selectedQuarter} 
                      onChange={(e) => reportMode === "monthly" ? setSelectedMonth(e.target.value) : setSelectedQuarter(e.target.value)} 
                      className="w-full rounded-md border-gray-300 py-2 text-sm bg-white"
                    >
                      {(reportMode === "monthly" ? MONTHS : QUARTERS).map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
                    </select>
                  </div>
                </>
              )}
            </div>

            {/* 2. District Multi-select */}
            <div className="md:col-span-4 lg:col-span-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-gray-700">Districts</label>
                <button type="button" onClick={() => setSelectedDistricts(selectedDistricts.length === DISTRICTS.length ? [] : DISTRICTS.map(d => d.id))} className="text-[10px] uppercase font-bold text-[#0b918c] hover:underline">
                    Toggle All
                </button>
              </div>
              <div className="border rounded-md p-2 h-44 overflow-y-auto bg-gray-50">
                {DISTRICTS.map((d) => (
                  <label key={d.id} className="flex items-center gap-2 p-1.5 hover:bg-white rounded cursor-pointer group">
                    <input type="checkbox" checked={selectedDistricts.includes(d.id)} onChange={() => toggleDistrict(d.id)} className="text-[#0b918c] rounded focus:ring-0 w-4 h-4" />
                    <span className="text-xs text-gray-600 group-hover:text-black">{d.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. MTC Multi-select */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-gray-700">MTCs ({selectedMtcIds.length})</label>
                <button type="button" onClick={() => setSelectedMtcIds(selectedMtcIds.length === availableMTCs.length ? [] : availableMTCs.map(m => m.id))} className="text-[10px] uppercase font-bold text-[#0b918c] hover:underline">
                    Toggle All
                </button>
              </div>
              <div className="border rounded-md p-2 h-44 overflow-y-auto bg-gray-50">
                {availableMTCs.length > 0 ? (
                  availableMTCs.map((m) => (
                    <label key={m.id} className="flex items-center gap-2 p-1.5 hover:bg-white rounded cursor-pointer group">
                      <input type="checkbox" checked={selectedMtcIds.includes(m.id)} onChange={() => toggleMtc(m.id)} className="text-[#0b918c] rounded focus:ring-0 w-4 h-4" />
                      <span className="text-xs text-gray-600 leading-tight group-hover:text-black">{m.name}</span>
                    </label>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center text-[11px] text-gray-400 text-center px-4 italic">Select a district to view MTCs</div>
                )}
              </div>
            </div>

            {/* 4. Action Button */}
            <div className="md:col-span-12 lg:col-span-2 flex items-end">
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full bg-[#0b918c] text-white py-2.5 rounded-md text-sm font-bold shadow-md hover:bg-[#097773] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
                SEARCH
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="min-h-[120px] flex items-center justify-center border-2 border-dashed border-gray-100 rounded-lg">
              {reportResult ? (
                <div className="bg-emerald-50 text-emerald-700 px-6 py-4 rounded-md border border-emerald-100 text-sm font-medium w-full text-center animate-in fade-in slide-in-from-top-2">
                  {reportResult}
                </div>
              ) : (
                <p className="text-gray-400 text-xs italic">Choose your parameters and click search to generate results.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}