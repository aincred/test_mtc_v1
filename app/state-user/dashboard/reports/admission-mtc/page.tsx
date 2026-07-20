"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Calendar, 
  Search as SearchIcon, 
  ChevronDown, 
  FileSpreadsheet, 
  FileText, 
  Image as ImageIcon 
} from "lucide-react";

// Full District Data
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

export default function AdmissionDashboardByMtc() {
  // Form State
  const [fromDate, setFromDate] = useState<string>("2026-04-10");
  const [toDate, setToDate] = useState<string>("2026-04-10");
  
  // District Selection State
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState("");

  // MTC Selection State
  const [mtcOptions, setMtcOptions] = useState<{id: string, name: string}[]>([]);
  const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);
  const [isMtcOpen, setIsMtcOpen] = useState(false);
  const [mtcSearch, setMtcSearch] = useState("");

  // Export Buttons State
  const [hasSearched, setHasSearched] = useState(false);

  // Refs for handling outside clicks
  const districtRef = useRef<HTMLDivElement>(null);
  const mtcRef = useRef<HTMLDivElement>(null);

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (districtRef.current && !districtRef.current.contains(event.target as Node)) {
        setIsDistrictOpen(false);
      }
      if (mtcRef.current && !mtcRef.current.contains(event.target as Node)) {
        setIsMtcOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mock dependent dropdown loading: when districts change, update MTC options
  useEffect(() => {
    if (selectedDistricts.length === 0) {
      setMtcOptions([]);
      setSelectedMtcs([]);
      return;
    }
    // Simulate fetching MTCs based on selected districts
    const mockMtcs = selectedDistricts.flatMap(dId => [
      { id: `${dId}_1`, name: `MTC Center A (Dist ${dId})` },
      { id: `${dId}_2`, name: `MTC Center B (Dist ${dId})` }
    ]);
    setMtcOptions(mockMtcs);
    // Remove selected MTCs that are no longer in the options list
    setSelectedMtcs(prev => prev.filter(mId => mockMtcs.some(m => m.id === mId)));
  }, [selectedDistricts]);

  // Filtered lists based on search
  const filteredDistricts = DISTRICTS.filter(d => d.name.toLowerCase().includes(districtSearch.toLowerCase()));
  const filteredMtcs = mtcOptions.filter(m => m.name.toLowerCase().includes(mtcSearch.toLowerCase()));

  // Dropdown Toggles
  const toggleDistrict = (id: string) => {
    setSelectedDistricts(prev => prev.includes(id) ? prev.filter(dId => dId !== id) : [...prev, id]);
    setHasSearched(false);
  };

  const toggleAllDistricts = () => {
    if (selectedDistricts.length === DISTRICTS.length) setSelectedDistricts([]);
    else setSelectedDistricts(DISTRICTS.map(d => d.id));
    setHasSearched(false);
  };

  const toggleMtc = (id: string) => {
    setSelectedMtcs(prev => prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]);
    setHasSearched(false);
  };

  const toggleAllMtcs = () => {
    if (selectedMtcs.length === mtcOptions.length) setSelectedMtcs([]);
    else setSelectedMtcs(mtcOptions.map(m => m.id));
    setHasSearched(false);
  };

  // Helper to get button text
  const getButtonText = (selectedCount: number, totalCount: number) => {
    if (selectedCount === 0) return "None selected";
    if (selectedCount === totalCount && totalCount > 0) return `All selected (${totalCount})`;
    return `${selectedCount} selected`;
  };

  // Handlers
  const handleSearch = () => {
    const payload = { fromDate, toDate, districts: selectedDistricts, mtcs: selectedMtcs };
    console.log("Fetching Admission Dashboard By MTC for:", payload);
    setHasSearched(true);
  };

  return (
    <div className="w-full mt-8">
      {/* Outer Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
        {/* Card Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
            Admission Dashboard By MTC
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-4 md:p-6 text-sm">
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-end">
            
            {/* Filters Section (col-xl-10) */}
            <div className="xl:col-span-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                
                {/* From Date (col-xl-2) */}
                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label htmlFor="txt_FromDate" className="font-medium text-gray-700">From Date</label>
                  <div className="relative">
                    <input
                      id="txt_FromDate"
                      type="date"
                      value={fromDate}
                      onChange={(e) => { setFromDate(e.target.value); setHasSearched(false); }}
                      className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] h-[38px]"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <Calendar size={16} />
                    </div>
                  </div>
                </div>

                {/* To Date (col-xl-2) */}
                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label htmlFor="txt_ToDate" className="font-medium text-gray-700">To Date</label>
                  <div className="relative">
                    <input
                      id="txt_ToDate"
                      type="date"
                      value={toDate}
                      onChange={(e) => { setToDate(e.target.value); setHasSearched(false); }}
                      className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] h-[38px]"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <Calendar size={16} />
                    </div>
                  </div>
                </div>

                {/* District Multi-select (col-xl-3) */}
                <div className="lg:col-span-3 relative" ref={districtRef}>
                  <label className="block font-medium text-gray-700 mb-1">District</label>
                  <button
                    type="button"
                    onClick={() => setIsDistrictOpen(!isDistrictOpen)}
                    className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] flex items-center justify-between transition-shadow"
                  >
                    <span className="truncate text-gray-700">
                      {getButtonText(selectedDistricts.length, DISTRICTS.length)}
                    </span>
                    <ChevronDown size={16} className={`ml-2 flex-shrink-0 text-gray-400 transition-transform ${isDistrictOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDistrictOpen && (
                    <div className="absolute z-10 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col">
                      <div className="p-2 border-b border-gray-100 relative bg-gray-50 rounded-t-md">
                        <SearchIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="search"
                          className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
                          placeholder="Search District..."
                          value={districtSearch}
                          onChange={(e) => setDistrictSearch(e.target.value)}
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                        {!districtSearch && (
                          <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors font-semibold border-b border-gray-100 mb-1">
                            <input
                              type="checkbox"
                              checked={selectedDistricts.length === DISTRICTS.length && DISTRICTS.length > 0}
                              onChange={toggleAllDistricts}
                              className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
                            />
                            <span className="text-gray-900 select-none">Select all</span>
                          </label>
                        )}
                        {filteredDistricts.map((district) => (
                          <label key={district.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedDistricts.includes(district.id)}
                              onChange={() => toggleDistrict(district.id)}
                              className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
                            />
                            <span className="text-gray-700 select-none">{district.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* MTC Multi-select (col-xl-3) */}
                <div className="lg:col-span-3 relative" ref={mtcRef}>
                  <label className="block font-medium text-gray-700 mb-1">MTC</label>
                  <button
                    type="button"
                    disabled={mtcOptions.length === 0}
                    onClick={() => setIsMtcOpen(!isMtcOpen)}
                    className="w-full bg-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed border border-gray-300 rounded-md py-1.5 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] flex items-center justify-between transition-shadow"
                  >
                    <span className="truncate text-gray-700">
                      {getButtonText(selectedMtcs.length, mtcOptions.length)}
                    </span>
                    <ChevronDown size={16} className={`ml-2 flex-shrink-0 transition-transform ${isMtcOpen ? 'rotate-180' : ''} ${mtcOptions.length === 0 ? 'text-gray-300' : 'text-gray-400'}`} />
                  </button>

                  {isMtcOpen && mtcOptions.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col right-0">
                      <div className="p-2 border-b border-gray-100 relative bg-gray-50 rounded-t-md">
                        <SearchIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="search"
                          className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
                          placeholder="Search MTC..."
                          value={mtcSearch}
                          onChange={(e) => setMtcSearch(e.target.value)}
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                        {!mtcSearch && (
                          <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors font-semibold border-b border-gray-100 mb-1">
                            <input
                              type="checkbox"
                              checked={selectedMtcs.length === mtcOptions.length && mtcOptions.length > 0}
                              onChange={toggleAllMtcs}
                              className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
                            />
                            <span className="text-gray-900 select-none">Select all</span>
                          </label>
                        )}
                        {filteredMtcs.map((mtc) => (
                          <label key={mtc.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedMtcs.includes(mtc.id)}
                              onChange={() => toggleMtc(mtc.id)}
                              className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
                            />
                            <span className="text-gray-700 select-none">{mtc.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Search Button (col-xl-2) */}
                <div className="lg:col-span-2 lg:pt-0 pt-2">
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-4 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-[#0B918C] bg-white hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C]"
                  >
                    <SearchIcon size={16} />
                    Search
                  </button>
                </div>

              </div>
            </div>

            {/* Export Actions Section (col-xl-2) */}
            <div className="xl:col-span-2 flex xl:justify-end mt-4 xl:mt-0">
              {hasSearched && (
                <div className="flex items-center gap-2 h-[38px] animate-in fade-in duration-300">
                  <button
                    type="button"
                    onClick={() => console.log("Exporting Excel")}
                    title="Download Excel"
                    className="p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-sm"
                  >
                    <FileSpreadsheet size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => console.log("Exporting PDF")}
                    title="Download PDF"
                    className="p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-sm"
                  >
                    <FileText size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => console.log("Exporting Image")}
                    title="Download Image"
                    className="p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-sm"
                  >
                    <ImageIcon size={18} />
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Report Output Sections */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <div id="div_Report" className="w-full text-center text-gray-500 mb-6">
              {hasSearched ? "MTC Dashboard data loaded." : "Enter parameters and search to view the dashboard."}
            </div>
            <div id="div_Report2" className="w-full text-center text-gray-500">
              {/* Secondary Report Visualizations */}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}