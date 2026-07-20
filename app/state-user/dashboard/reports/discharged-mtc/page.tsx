"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Activity, Clock } from "lucide-react";

// --- TypeScript Interfaces ---
interface District { id: string; name: string; }
interface MTC { id: string; districtId: string; name: string; }
type ReportType = "daily" | "monthly" | "quarterly";

// --- Static Data ---
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
  { id: "m1", districtId: "1", name: "Bokaro General Hospital MTC" },
  { id: "m2", districtId: "1", name: "Chas CHC MTC" },
  { id: "m3", districtId: "8", name: "RIMS Ranchi MTC" },
  { id: "m4", districtId: "8", name: "Sadar Hospital Ranchi MTC" },
];

const YEARS = Array.from({ length: 10 }, (_, i) => (2020 + i).toString());
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

export default function ChildrenDischargedByMTC() {
  // Mode State
  const [reportType, setReportType] = useState<ReportType>("daily");

  // Daily/Period State
  const [fromDate, setFromDate] = useState<string>("2026-04-14");
  const [toDate, setToDate] = useState<string>("2026-04-14");
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [selectedMonth, setSelectedMonth] = useState<string>("4");
  const [selectedQuarter, setSelectedQuarter] = useState<string>("2");

  // Selection State
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedMTCs, setSelectedMTCs] = useState<string[]>([]);
  const [reportResult, setReportResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // MTC Logic
  const availableMTCs = useMemo(() => {
    return MOCK_MTCS.filter((mtc) => selectedDistricts.includes(mtc.districtId));
  }, [selectedDistricts]);

  useEffect(() => {
    const validMtcIds = new Set(availableMTCs.map((m) => m.id));
    setSelectedMTCs((prev) => prev.filter((id) => validMtcIds.has(id)));
  }, [availableMTCs]);

  // Handlers
  const toggleDistrict = (id: string) => setSelectedDistricts(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const toggleMTC = (id: string) => setSelectedMTCs(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const handleSearch = () => {
    setIsLoading(true);
    const payload = {
      type: reportType,
      districts: selectedDistricts,
      mtcs: selectedMTCs,
      ...(reportType === "daily" && { fromDate, toDate }),
      ...(reportType === "monthly" && { year: selectedYear, month: selectedMonth }),
      ...(reportType === "quarterly" && { year: selectedYear, quarter: selectedQuarter }),
    };
    console.log("Submitting payload:", payload);
    setTimeout(() => {
      setReportResult(`${reportType.toUpperCase()} report generated successfully.`);
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
            Discharge Report by MTC
          </h5>
          
          {/* Report Type Toggle */}
          <div className="flex bg-gray-200 p-1 rounded-lg">
            {(["daily", "monthly", "quarterly"] as ReportType[]).map((t) => (
              <button
                key={t}
                onClick={() => { setReportType(t); setReportResult(null); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  reportType === t ? "bg-white text-[#0b918c] shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t.toUpperCase()}
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

              {reportType === "daily" && (
                <>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">From</label>
                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full rounded-md border-gray-300 py-2 text-sm focus:ring-[#0b918c] focus:border-[#0b918c]" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">To</label>
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full rounded-md border-gray-300 py-2 text-sm focus:ring-[#0b918c] focus:border-[#0b918c]" />
                  </div>
                </>
              )}

              {(reportType === "monthly" || reportType === "quarterly") && (
                <>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Year</label>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full rounded-md border-gray-300 py-2 text-sm bg-white">
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  {reportType === "monthly" ? (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Month</label>
                      <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full rounded-md border-gray-300 py-2 text-sm bg-white">
                        {MONTHS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Quarter</label>
                      <select value={selectedQuarter} onChange={(e) => setSelectedQuarter(e.target.value)} className="w-full rounded-md border-gray-300 py-2 text-sm bg-white">
                        {QUARTERS.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
                      </select>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* 2. District Multi-select */}
            <div className="md:col-span-4 lg:col-span-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-gray-700">Districts</label>
                <button type="button" onClick={() => setSelectedDistricts(selectedDistricts.length === DISTRICTS.length ? [] : DISTRICTS.map(d => d.id))} className="text-[10px] uppercase font-bold text-[#0b918c]">Toggle All</button>
              </div>
              <div className="border rounded-md p-2 h-44 overflow-y-auto bg-gray-50">
                {DISTRICTS.map((d) => (
                  <label key={d.id} className="flex items-center gap-2 p-1 hover:bg-white rounded cursor-pointer">
                    <input type="checkbox" checked={selectedDistricts.includes(d.id)} onChange={() => toggleDistrict(d.id)} className="text-[#0b918c] rounded focus:ring-0" />
                    <span className="text-xs text-gray-600">{d.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. MTC Multi-select */}
            <div className="md:col-span-4 lg:col-span-3">
              <label className="block text-sm font-bold text-gray-700 mb-2">MTCs</label>
              <div className="border rounded-md p-2 h-44 overflow-y-auto bg-gray-50">
                {availableMTCs.length > 0 ? (
                  availableMTCs.map((m) => (
                    <label key={m.id} className="flex items-center gap-2 p-1 hover:bg-white rounded cursor-pointer">
                      <input type="checkbox" checked={selectedMTCs.includes(m.id)} onChange={() => toggleMTC(m.id)} className="text-[#0b918c] rounded focus:ring-0" />
                      <span className="text-xs text-gray-600 leading-tight">{m.name}</span>
                    </label>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center text-[11px] text-gray-400 text-center px-4">Select a district to view available MTCs</div>
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
          <div className="mt-8 pt-6 border-t">
            <div className="min-h-[120px] flex items-center justify-center border-2 border-dashed border-gray-100 rounded-lg">
              {reportResult ? (
                <div className="bg-emerald-50 text-emerald-700 px-6 py-4 rounded-md border border-emerald-100 text-sm font-medium">
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