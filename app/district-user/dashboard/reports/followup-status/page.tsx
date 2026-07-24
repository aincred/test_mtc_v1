"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, ChevronDown, CheckSquare, Square, CheckCircle2, UserCheck, Stethoscope, Phone, Loader2 } from "lucide-react";

interface District {
  id: string;
  name: string;
}

interface MtcOption {
  id: string;
  name: string;
}

interface FollowUpStatus {
  status: "Completed" | "Pending" | "Upcoming" | "Missed";
  date?: string;
}

interface ChildRecord {
  id: string;
  childName: string;
  motherName: string;
  phoneNumber: string;
  referredBy: string;
  mtcName: string;
  admissionDate: string;
  followUp1: FollowUpStatus;
  followUp2: FollowUpStatus;
  followUp3: FollowUpStatus;
  followUp4: FollowUpStatus;
}

const MTC_OPTIONS: MtcOption[] = [
  { id: "1", name: "CHAS" }, { id: "2", name: "GOMIA" }, { id: "26", name: "BUNDU" }, 
  { id: "27", name: "DORANDA" }, { id: "104", name: "RIMS" }, { id: "107", name: "UP REFERRAL RIMS" }
];

export default function MtcFollowUpStatusReport() {
  // Range & Date states
  const [rangeType, setRangeType] = useState<"daily" | "monthly" | "quarterly">("daily");
  const [fromDate, setFromDate] = useState<string>("2026-06-01");
  const [toDate, setToDate] = useState<string>("2026-07-31");
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [selectedMonth, setSelectedMonth] = useState<string>("6");
  const [selectedQuarter, setSelectedQuarter] = useState<string>("2");

  // Selection states (District Scope is locked to default value)
  const [selectedDistrict] = useState<string>("RANCHI");
  const [selectedMtcs, setSelectedMtcs] = useState<string[]>(MTC_OPTIONS.map(m => m.id));
  const [isMtcOpen, setIsMtcOpen] = useState(false);
  const [mtcSearch, setMtcSearch] = useState("");

  // Status & Data states
  const [showReport, setShowReport] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [records, setRecords] = useState<ChildRecord[]>([]);

  const mtcRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mtcRef.current && !mtcRef.current.contains(event.target as Node)) {
        setIsMtcOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredMtcs = MTC_OPTIONS.filter((m) =>
    m.name.toLowerCase().includes(mtcSearch.toLowerCase())
  );

  const toggleMtc = (id: string) => {
    setSelectedMtcs((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const toggleAllMtcs = () => {
    setSelectedMtcs(selectedMtcs.length === MTC_OPTIONS.length ? [] : MTC_OPTIONS.map((m) => m.id));
  };

  const getButtonText = (selectedCount: number, totalCount: number) => {
    if (selectedCount === 0) return "None selected";
    if (selectedCount === totalCount) return `All selected (${totalCount})`;
    return `${selectedCount} selected`;
  };

  const handleFetchData = async () => {
    setLoading(true);
    setShowReport(false);
    try {
      const params = new URLSearchParams();
      params.append("rangeType", rangeType);
      params.append("districtName", selectedDistrict);

      if (rangeType === "daily") {
        params.append("fromDate", fromDate);
        params.append("toDate", toDate);
      } else if (rangeType === "monthly") {
        params.append("year", selectedYear);
        params.append("month", selectedMonth);
      } else if (rangeType === "quarterly") {
        params.append("year", selectedYear);
        params.append("quarter", selectedQuarter);
      }

      if (selectedMtcs.length > 0 && selectedMtcs.length < MTC_OPTIONS.length) {
        params.append("mtcs", selectedMtcs.join(","));
      }

      const res = await fetch(`/api/reports/follow-up-report?${params.toString()}`);
      const json = await res.json();

      if (json.success) {
        setRecords(json.data || []);
        setShowReport(true);
      } else {
        console.error("API error:", json.error);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="my-6 font-sans w-full max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Header Section */}
      <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h5 className="text-xl font-bold tracking-tight text-blue-700">
            MTC Child Follow-up Status Report
          </h5>
          <p className="text-xs text-slate-500 mt-1">Directory of admitted children with real-time follow-up progress and referral channels</p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-emerald-100 flex items-center gap-1.5">
          <CheckCircle2 size={14} /> Tracking Follow-ups
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Filter Parameters Controls */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-sm text-slate-700">
          
          {/* Range Type Selector */}
          <div className="md:col-span-2">
            <label htmlFor="select_RangeType" className="block mb-2 font-medium text-slate-700">Filter Range</label>
            <select
              id="select_RangeType"
              value={rangeType}
              onChange={(e) => setRangeType(e.target.value as "daily" | "monthly" | "quarterly")}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-slate-800 transition-all shadow-sm h-[38px]"
            >
              <option value="daily">Daily Range</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>

          {/* Dynamic Range Controls */}
          {rangeType === "daily" && (
            <>
              <div className="md:col-span-2">
                <label htmlFor="txt_FromDate" className="block mb-2 font-medium text-slate-700">From Date</label>
                <input
                  id="txt_FromDate"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-slate-800 transition-all shadow-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="txt_ToDate" className="block mb-2 font-medium text-slate-700">To Date</label>
                <input
                  id="txt_ToDate"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-slate-800 transition-all shadow-sm"
                />
              </div>
            </>
          )}

          {rangeType === "monthly" && (
            <>
              <div className="md:col-span-2">
                <label htmlFor="select_Year" className="block mb-2 font-medium text-slate-700">Year</label>
                <select
                  id="select_Year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-slate-800 shadow-sm h-[38px]"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="select_Month" className="block mb-2 font-medium text-slate-700">Month</label>
                <select
                  id="select_Month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-slate-800 shadow-sm h-[38px]"
                >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
            </>
          )}

          {rangeType === "quarterly" && (
            <>
              <div className="md:col-span-2">
                <label htmlFor="select_QYear" className="block mb-2 font-medium text-slate-700">Year</label>
                <select
                  id="select_QYear"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-slate-800 shadow-sm h-[38px]"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="select_Quarter" className="block mb-2 font-medium text-slate-700">Quarter</label>
                <select
                  id="select_Quarter"
                  value={selectedQuarter}
                  onChange={(e) => setSelectedQuarter(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-slate-800 shadow-sm h-[38px]"
                >
                  <option value="1">Q1 (Jan - Mar)</option>
                  <option value="2">Q2 (Apr - Jun)</option>
                  <option value="3">Q3 (Jul - Sep)</option>
                  <option value="4">Q4 (Oct - Dec)</option>
                </select>
              </div>
            </>
          )}

          {/* District Scope (Locked/Disabled) */}
          <div className="md:col-span-2">
            <label htmlFor="select_District" className="block mb-2 font-medium text-slate-700">District Scope</label>
            <div className="relative">
              <select
                id="select_District"
                value={selectedDistrict}
                disabled={true}
                className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-500 font-medium cursor-not-allowed outline-none shadow-sm h-[38px] appearance-none"
              >
                <option value={selectedDistrict}>{selectedDistrict}</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* MTC Selection Dropdown */}
          <div className="md:col-span-2 relative" ref={mtcRef}>
            <label className="block mb-2 font-medium text-slate-700">MTC Selection</label>
            <button
              type="button"
              onClick={() => setIsMtcOpen(!isMtcOpen)}
              className="w-full px-3 py-2 text-left border border-slate-300 rounded-md bg-white hover:bg-slate-50 focus:outline-none focus:border-blue-500 flex justify-between items-center text-slate-800 shadow-sm transition-all h-[38px]"
            >
              <span className="truncate">{getButtonText(selectedMtcs.length, MTC_OPTIONS.length)}</span>
              <ChevronDown size={14} className={`text-slate-500 transition-transform ${isMtcOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMtcOpen && (
              <div className="absolute left-0 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-xl max-h-60 overflow-y-auto z-50 p-2 space-y-0.5">
                <div className="p-1.5 border-b border-slate-100 bg-slate-50 rounded-t mb-1">
                  <input
                    type="search"
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 bg-white"
                    placeholder="Search MTC..."
                    value={mtcSearch}
                    onChange={(e) => setMtcSearch(e.target.value)}
                  />
                </div>
                {!mtcSearch && (
                  <button
                    type="button"
                    onClick={toggleAllMtcs}
                    className="w-full flex items-center gap-2 p-2 hover:bg-slate-50 rounded font-bold text-blue-600 text-xs text-left transition-colors border-b border-slate-50"
                  >
                    {selectedMtcs.length === MTC_OPTIONS.length ? <CheckSquare size={13} /> : <Square size={13} />}
                    Select All
                  </button>
                )}
                {filteredMtcs.map((mtc) => (
                  <button
                    key={mtc.id}
                    type="button"
                    onClick={() => toggleMtc(mtc.id)}
                    className="w-full flex items-center gap-2 p-2 hover:bg-slate-50 rounded text-xs font-medium text-slate-700 text-left transition-colors"
                  >
                    {selectedMtcs.includes(mtc.id) ? <CheckSquare size={13} className="text-blue-600" /> : <Square size={13} className="text-slate-400" />}
                    {mtc.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fetch Action Button */}
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={handleFetchData}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-white border border-blue-500 rounded-md hover:bg-blue-50/50 transition-all shadow-sm active:scale-[0.99] disabled:opacity-50 h-[38px]"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin text-blue-600" />
              ) : (
                <SearchIcon size={16} className="text-blue-600 stroke-[2.5]" />
              )}
              {loading ? "Fetching..." : "Fetch Report Data"}
            </button>
          </div>

        </div>

        {/* Report Workspace */}
        <div className="mt-6 border-t border-slate-200 pt-6">
          {showReport ? (
            <div className="w-full animate-in fade-in duration-300 space-y-6">
              
              {/* Report Header Banner */}
              <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200 py-3 rounded-xl shadow-inner">
                <h6 className="text-xs font-bold tracking-wider text-blue-900 uppercase m-0">
                  Follow-up Progress &mdash; District: {selectedDistrict} ({rangeType.toUpperCase()})
                </h6>
              </div>

              {/* Data Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                  <h6 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <UserCheck size={16} className="text-blue-600" />
                    Children Registry ({records.length} Records)
                  </h6>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
                        <th className="p-3">Child Name & ID</th>
                        <th className="p-3">Mother / Guardian</th>
                        <th className="p-3">Phone Number</th>
                        <th className="p-3">Referred By</th>
                        <th className="p-3">MTC Name</th>
                        <th className="p-3">1st Follow-up</th>
                        <th className="p-3">2nd Follow-up</th>
                        <th className="p-3">3rd Follow-up</th>
                        <th className="p-3">4th Follow-up</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {records.length > 0 ? (
                        records.map((child) => (
                          <tr key={child.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3">
                              <div className="font-bold text-slate-800 text-sm">{child.childName}</div>
                              <div className="text-slate-500 text-[11px]">ID: {child.id}</div>
                            </td>
                            <td className="p-3 font-semibold text-slate-700">
                              {child.motherName}
                            </td>
                            <td className="p-3">
                              <a 
                                href={`tel:${child.phoneNumber}`} 
                                className="inline-flex items-center gap-1 font-medium text-slate-800 hover:text-blue-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 transition-colors"
                              >
                                <Phone size={12} className="text-slate-500" />
                                {child.phoneNumber}
                              </a>
                            </td>
                            <td className="p-3">
                              <span className="inline-flex items-center gap-1 font-semibold text-blue-800 bg-blue-50 border border-blue-100 px-2 py-1 rounded text-[11px]">
                                <Stethoscope size={12} className="text-blue-600" />
                                {child.referredBy}
                              </span>
                            </td>
                            <td className="p-3 font-medium text-slate-700">{child.mtcName}</td>
                            
                            {/* Follow-up 1 */}
                            <td className="p-3">
                              {child.followUp1.status === 'Completed' ? (
                                <span className="text-emerald-700 font-medium">✓ {child.followUp1.date}</span>
                              ) : (
                                <span className="text-slate-400 font-normal">Pending</span>
                              )}
                            </td>

                            {/* Follow-up 2 */}
                            <td className="p-3">
                              {child.followUp2.status === 'Completed' ? (
                                <span className="text-emerald-700 font-medium">✓ {child.followUp2.date}</span>
                              ) : (
                                <span className="text-slate-400 font-normal">Pending</span>
                              )}
                            </td>

                            {/* Follow-up 3 */}
                            <td className="p-3">
                              {child.followUp3.status === 'Completed' ? (
                                <span className="text-emerald-700 font-medium">✓ {child.followUp3.date}</span>
                              ) : (
                                <span className="text-slate-400 font-normal">Pending</span>
                              )}
                            </td>

                            {/* Follow-up 4 */}
                            <td className="p-3">
                              {child.followUp4.status === 'Completed' ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                  ✓ Final ({child.followUp4.date})
                                </span>
                              ) : (
                                <span className="text-slate-400 font-normal">Pending</span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9} className="p-6 text-center text-slate-500">
                            No records found for the selected date range and MTC filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          ) : (
            <div className="w-full text-center min-h-[160px] flex flex-col items-center justify-center bg-slate-50/50 rounded border border-dashed border-slate-200 p-6">
              <p className="text-slate-500 text-sm font-normal">
                Click <span className="font-bold text-blue-600 cursor-pointer hover:underline" onClick={handleFetchData}>Fetch Report Data</span> to load child follow-up records...
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}