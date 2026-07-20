"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Search as SearchIcon, 
  ChevronDown, 
  FileSpreadsheet, 
  FileText, 
  Image as ImageIcon,
  Activity,
  Clock
} from "lucide-react";

// --- Constants ---
const DISTRICTS = [
  { id: "1", name: "BOKARO" }, { id: "2", name: "CHATRA" }, { id: "16", name: "DEOGHAR" },
  { id: "4", name: "DHANBAD" }, { id: "17", name: "DUMKA" }, { id: "22", name: "EAST SINGHBHUM" },
  { id: "14", name: "GARHWA" }, { id: "3", name: "GIRIDIH" }, { id: "18", name: "GODDA" },
  { id: "9", name: "GUMLA" }, { id: "6", name: "HAZARIBAGH" }, { id: "19", name: "JAMTARA" },
  { id: "10", name: "KHUNTI" }, { id: "7", name: "KODERMA" }, { id: "15", name: "LATEHAR" },
  { id: "11", name: "LOHARDAGA" }, { id: "20", name: "PAKUR" }, { id: "13", name: "PALAMU" },
  { id: "5", name: "RAMGARH" }, { id: "8", name: "RANCHI" }, { id: "21", name: "SAHIBGANJ" },
  { id: "23", name: "SERAIKELA" }, { id: "12", name: "SIMDEGA" }, { id: "24", name: "WEST SINGHBHUM" },
];

export default function AdmissionDashboardByDistrict() {
  // Form state
  const [fromDate, setFromDate] = useState<string>("2026-04-10");
  const [toDate, setToDate] = useState<string>("2026-04-10");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // District Selection State
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState("");

  const districtRef = useRef<HTMLDivElement>(null);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (districtRef.current && !districtRef.current.contains(event.target as Node)) {
        setIsDistrictOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDistricts = DISTRICTS.filter(d => 
    d.name.toLowerCase().includes(districtSearch.toLowerCase())
  );

  const toggleDistrict = (id: string) => {
    setSelectedDistricts(prev => 
      prev.includes(id) ? prev.filter(dId => dId !== id) : [...prev, id]
    );
  };

  const toggleAllDistricts = () => {
    setSelectedDistricts(selectedDistricts.length === DISTRICTS.length ? [] : DISTRICTS.map(d => d.id));
  };

  const handleSearch = () => {
    setIsLoading(true);
    setHasSearched(false);
    setTimeout(() => {
      setIsLoading(false);
      setHasSearched(true);
    }, 800);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center flex-wrap gap-4">
          <h5 className="text-lg font-semibold text-[#0b918c] m-0 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Admission Dashboard By District
          </h5>
          
          {/* Status Label */}
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Real-time Data</span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            {/* 1. From Date */}
            <div className="md:col-span-3 lg:col-span-2">
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">From Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full rounded-md border-gray-300 py-2 text-sm focus:ring-[#0b918c] focus:border-[#0b918c]"
                />
              </div>
            </div>

            {/* 2. To Date */}
            <div className="md:col-span-3 lg:col-span-2">
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">To Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full rounded-md border-gray-300 py-2 text-sm focus:ring-[#0b918c] focus:border-[#0b918c]"
                />
              </div>
            </div>

            {/* 3. District Multi-select Dropdown */}
            <div className="md:col-span-6 lg:col-span-4 relative" ref={districtRef}>
              <div className="flex justify-between items-end mb-1">
                <label className="block text-[11px] font-bold text-gray-500 uppercase">District Selection</label>
                <button 
                   onClick={toggleAllDistricts}
                   className="text-[10px] font-bold text-[#0b918c] uppercase hover:underline"
                >
                    {selectedDistricts.length === DISTRICTS.length ? 'Clear' : 'All'}
                </button>
              </div>
              
              <button
                type="button"
                onClick={() => setIsDistrictOpen(!isDistrictOpen)}
                className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-1 focus:ring-[#0b918c] flex items-center justify-between"
              >
                <span className="text-sm text-gray-600 truncate">
                  {selectedDistricts.length === 0 ? "None selected" : 
                   selectedDistricts.length === DISTRICTS.length ? `All Districts (${DISTRICTS.length})` : 
                   `${selectedDistricts.length} districts selected`}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDistrictOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDistrictOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                  <div className="p-2 bg-gray-50 border-b relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search districts..."
                      className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0b918c]"
                      value={districtSearch}
                      onChange={(e) => setDistrictSearch(e.target.value)}
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto p-1">
                    {filteredDistricts.map((district) => (
                      <label key={district.id} className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedDistricts.includes(district.id)}
                          onChange={() => toggleDistrict(district.id)}
                          className="w-3.5 h-3.5 text-[#0b918c] rounded border-gray-300 focus:ring-0"
                        />
                        <span className="text-xs text-gray-600 group-hover:text-black">{district.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Search Button */}
            <div className="md:col-span-12 lg:col-span-2">
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full bg-[#0b918c] text-white py-2 rounded-md text-sm font-bold shadow-md hover:bg-[#097773] flex items-center justify-center gap-2 transition-all disabled:opacity-50 h-[38px]"
              >
                {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <SearchIcon className="w-4 h-4" />}
                SEARCH
              </button>
            </div>

            {/* 5. Export Actions (Only visible after search) */}
            <div className="md:col-span-12 lg:col-span-2 flex gap-2">
                {hasSearched && (
                    <div className="flex gap-1.5 w-full animate-in fade-in zoom-in-95 duration-300">
                        <button title="Export Excel" className="flex-1 bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700 transition-colors flex justify-center">
                            <FileSpreadsheet className="w-4 h-4" />
                        </button>
                        <button title="Export PDF" className="flex-1 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors flex justify-center">
                            <FileText className="w-4 h-4" />
                        </button>
                        <button title="Export Image" className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors flex justify-center">
                            <ImageIcon className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
          </div>

          {/* Results Area */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/30">
              {hasSearched ? (
                <div className="w-full p-4">
                     <div className="bg-emerald-50 text-emerald-700 px-6 py-4 rounded-md border border-emerald-100 text-sm font-medium text-center">
                        Dashboard data for {selectedDistricts.length} districts loaded successfully.
                    </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-400 text-xs italic">Select dates and districts, then click search to populate dashboard.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}