"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Search as SearchIcon, ChevronDown, UserCheck, TrendingUp, AlertCircle, 
  Baby, ArrowRight, Building2, Loader2 
} from "lucide-react";

interface MtcOption {
  id: string;
  name: string;
}

interface DischargedChild {
  id: string;
  name: string;
  age: string;
  mtc: string;
  admissionWeight: string;
  dischargeWeight: string;
  date: string;
  status: string;
}

interface SummaryKPIs {
  totalCured: number;
  avgCureRate: string;
  totalReferrals: number;
}

export default function DischargedChildrenTelemetry() {
  const [districtName, setDistrictName] = useState<string>("RANCHI");
  const [mtcOptions, setMtcOptions] = useState<MtcOption[]>([]);
  const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);
  const [isMtcOpen, setIsMtcOpen] = useState(false);

  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showAllRecords, setShowAllRecords] = useState(false);

  const [kpis, setKpis] = useState<SummaryKPIs>({ totalCured: 0, avgCureRate: "0.0%", totalReferrals: 0 });
  const [dischargedChildren, setDischargedChildren] = useState<DischargedChild[]>([]);

  const mtcRef = useRef<HTMLDivElement>(null);

  // Sync user session & fetch district MTC list
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
        console.error("Session parse error:", e);
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
        setSelectedMtcs(opts.map((m: MtcOption) => m.id));
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

  const toggleMtc = (id: string) => {
    setSelectedMtcs(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    setHasSearched(true);

    try {
      const queryParams = new URLSearchParams({
        districtName,
        ...(selectedMtcs.length > 0 && { mtcs: selectedMtcs.join(",") })
      });

      const res = await fetch(`/api/reports/discharged-telemetry?${queryParams.toString()}`);
      const json = await res.json();

      if (json.success) {
        setKpis(json.kpis);
        setDischargedChildren(json.children || []);
      }
    } catch (error) {
      console.error("Telemetry query failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Cured":
        return <span className="px-2.5 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full">Cured</span>;
      case "Referred":
        return <span className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-100 rounded-full">Referred</span>;
      case "Defaulter":
        return <span className="px-2.5 py-1 text-xs font-bold text-amber-700 bg-amber-100 rounded-full">Defaulter</span>;
      case "Death":
        return <span className="px-2.5 py-1 text-xs font-bold text-red-700 bg-red-100 rounded-full">Death</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-bold text-gray-700 bg-gray-100 rounded-full">{status}</span>;
    }
  };

  const displayedChildren = showAllRecords ? dischargedChildren : dischargedChildren.slice(0, 5);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      
      {/* Control Card Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 pb-4 border-b border-gray-100">
          <div>
            <h1 className="text-xl font-bold text-blue-700">Discharged Children Telemetry</h1>
            <p className="text-xs text-gray-500 mt-0.5">Real-time outcome metrics and patient progress tracker</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-semibold flex items-center gap-1.5">
            <Building2 size={13} /> {districtName} DISTRICT
          </span>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          
          {/* Locked District Field */}
          <div className="md:col-span-4 xl:col-span-5">
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Assigned District</label>
            <div className="w-full bg-slate-100 border border-gray-300 rounded-md py-2 px-3 text-slate-700 font-bold text-sm h-[38px] flex items-center cursor-not-allowed">
              <span>{districtName}</span>
            </div>
          </div>

          {/* Multiselect MTC Dropdown */}
          <div className="relative md:col-span-5 xl:col-span-5" ref={mtcRef}>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">MTC Centers</label>
            <button
              type="button"
              onClick={() => setIsMtcOpen(!isMtcOpen)}
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:ring-2 focus:ring-blue-500 h-[38px] flex items-center justify-between text-sm"
            >
              <span className="truncate text-gray-700">
                {selectedMtcs.length === 0 ? "None selected" : 
                 selectedMtcs.length === mtcOptions.length ? `All MTCs (${mtcOptions.length})` : 
                 `${selectedMtcs.length} selected`}
              </span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {isMtcOpen && (
              <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-2 max-h-60 overflow-y-auto text-sm">
                {mtcOptions.map(mtc => (
                  <label key={mtc.id} className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedMtcs.includes(mtc.id)} 
                      onChange={() => toggleMtc(mtc.id)} 
                      className="accent-blue-600 w-4 h-4" 
                    />
                    <span className="text-gray-700 font-medium">{mtc.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="md:col-span-3 xl:col-span-2">
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full h-[38px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-md transition-all shadow-sm text-sm"
            >
              {isSearching ? <Loader2 size={18} className="animate-spin" /> : <SearchIcon size={18} />} 
              {isSearching ? "Processing..." : "Run Report"}
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Results Section */}
      {hasSearched ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
          
          {/* Summary KPIs */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-700"><UserCheck size={28} /></div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Total Cured</p>
              <p className="text-2xl font-black text-blue-900">{kpis.totalCured}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-700"><TrendingUp size={28} /></div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Avg Cure Rate</p>
              <p className="text-2xl font-black text-blue-900">{kpis.avgCureRate}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 border-l-4 border-l-blue-500">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-700"><AlertCircle size={28} /></div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Referrals</p>
              <p className="text-2xl font-black text-blue-900">{kpis.totalReferrals}</p>
            </div>
          </div>
          
          {/* Discharged Children Table */}
          <div className="md:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col max-h-[800px]">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Baby className="text-blue-600" size={24} />
                <h2 className="text-lg font-bold text-gray-800">
                  {showAllRecords ? "All Discharged Children" : "Recent Discharged Children"}
                </h2>
              </div>
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Showing {displayedChildren.length} of {dischargedChildren.length} Records
              </span>
            </div>
            
            <div className="overflow-x-auto overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-gray-50 shadow-[0_1px_0_0_#e5e7eb] z-10">
                  <tr className="text-gray-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-bold">Patient ID</th>
                    <th className="p-4 font-bold">Child Info</th>
                    <th className="p-4 font-bold">MTC Location</th>
                    <th className="p-4 font-bold">Weight Prog.</th>
                    <th className="p-4 font-bold">Date</th>
                    <th className="p-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {displayedChildren.length > 0 ? (
                    displayedChildren.map((child, index) => (
                      <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                        <td className="p-4 text-sm font-mono font-medium text-blue-900">{child.id}</td>
                        <td className="p-4">
                          <div className="text-sm font-bold text-gray-800">{child.name}</div>
                          <div className="text-xs text-gray-500">{child.age}</div>
                        </td>
                        <td className="p-4 text-sm text-gray-600 font-medium">{child.mtc}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500">{child.admissionWeight}</span>
                            <ArrowRight size={14} className="text-gray-400" />
                            <span className="font-semibold text-teal-700">{child.dischargeWeight}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{child.date}</td>
                        <td className="p-4">{getStatusBadge(child.status)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-400 text-sm">
                        No discharge records found matching the selected MTC centers.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {dischargedChildren.length > 5 && (
              <div className="p-4 border-t border-gray-200 bg-gray-50 text-center flex-shrink-0">
                <button 
                  onClick={() => setShowAllRecords(!showAllRecords)}
                  className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors py-2 px-4 rounded-md hover:bg-blue-50"
                >
                  {showAllRecords ? "Show Less Records" : `View All (${dischargedChildren.length}) Records`}
                </button>
              </div>
            )}
          </div>

        </div>
      ) : (
        <div className="py-20 text-center bg-white rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">Select your parameters and click &quot;Run Report&quot; to populate the dashboard.</p>
        </div>
      )}
    </div>
  );
}