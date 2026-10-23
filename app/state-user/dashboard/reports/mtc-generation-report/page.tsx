// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { 
//   Calendar, 
//   Search as SearchIcon, 
//   ChevronDown, 
//   FileSpreadsheet, 
//   FileText, 
//   Image as ImageIcon 
// } from "lucide-react";

// // Full District Data
// const DISTRICTS = [
//   { id: "1", name: "BOKARO" }, { id: "2", name: "CHATRA" }, { id: "16", name: "DEOGHAR" },
//   { id: "4", name: "DHANBAD" }, { id: "17", name: "DUMKA" }, { id: "22", name: "EAST SINGHBHUM" },
//   { id: "14", name: "GARHWA" }, { id: "3", name: "GIRIDIH" }, { id: "18", name: "GODDA" },
//   { id: "9", name: "GUMLA" }, { id: "6", name: "HAZARIBAGH" }, { id: "19", name: "JAMTARA" },
//   { id: "10", name: "KHUNTI" }, { id: "7", name: "KODERMA" }, { id: "15", name: "LATEHAR" },
//   { id: "11", name: "LOHARDAGA" }, { id: "20", name: "PAKUR" }, { id: "13", name: "PALAMU" },
//   { id: "5", name: "RAMGARH" }, { id: "8", name: "RANCHI" }, { id: "21", name: "SAHIBGANJ" },
//   { id: "23", name: "SERAIKELA" }, { id: "12", name: "SIMDEGA" }, { id: "24", name: "WEST SINGHBHUM" },
// ];

// export default function AdmissionDashboardByMtc() {
//   // Form State
//   const [fromDate, setFromDate] = useState<string>("2026-04-10");
//   const [toDate, setToDate] = useState<string>("2026-04-10");
  
//   // District Selection State
//   const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
//   const [isDistrictOpen, setIsDistrictOpen] = useState(false);
//   const [districtSearch, setDistrictSearch] = useState("");

//   // MTC Selection State
//   const [mtcOptions, setMtcOptions] = useState<{id: string, name: string}[]>([]);
//   const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);
//   const [isMtcOpen, setIsMtcOpen] = useState(false);
//   const [mtcSearch, setMtcSearch] = useState("");

//   // Export Buttons State
//   const [hasSearched, setHasSearched] = useState(false);

//   // Refs for handling outside clicks
//   const districtRef = useRef<HTMLDivElement>(null);
//   const mtcRef = useRef<HTMLDivElement>(null);

//   // Handle outside clicks to close dropdowns
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (districtRef.current && !districtRef.current.contains(event.target as Node)) {
//         setIsDistrictOpen(false);
//       }
//       if (mtcRef.current && !mtcRef.current.contains(event.target as Node)) {
//         setIsMtcOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Mock dependent dropdown loading: when districts change, update MTC options
//   useEffect(() => {
//     if (selectedDistricts.length === 0) {
//       setMtcOptions([]);
//       setSelectedMtcs([]);
//       return;
//     }
//     // Simulate fetching MTCs based on selected districts
//     const mockMtcs = selectedDistricts.flatMap(dId => [
//       { id: `${dId}_1`, name: `MTC Center A (Dist ${dId})` },
//       { id: `${dId}_2`, name: `MTC Center B (Dist ${dId})` }
//     ]);
//     setMtcOptions(mockMtcs);
//     // Remove selected MTCs that are no longer in the options list
//     setSelectedMtcs(prev => prev.filter(mId => mockMtcs.some(m => m.id === mId)));
//   }, [selectedDistricts]);

//   // Filtered lists based on search
//   const filteredDistricts = DISTRICTS.filter(d => d.name.toLowerCase().includes(districtSearch.toLowerCase()));
//   const filteredMtcs = mtcOptions.filter(m => m.name.toLowerCase().includes(mtcSearch.toLowerCase()));

//   // Dropdown Toggles
//   const toggleDistrict = (id: string) => {
//     setSelectedDistricts(prev => prev.includes(id) ? prev.filter(dId => dId !== id) : [...prev, id]);
//     setHasSearched(false);
//   };

//   const toggleAllDistricts = () => {
//     if (selectedDistricts.length === DISTRICTS.length) setSelectedDistricts([]);
//     else setSelectedDistricts(DISTRICTS.map(d => d.id));
//     setHasSearched(false);
//   };

//   const toggleMtc = (id: string) => {
//     setSelectedMtcs(prev => prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]);
//     setHasSearched(false);
//   };

//   const toggleAllMtcs = () => {
//     if (selectedMtcs.length === mtcOptions.length) setSelectedMtcs([]);
//     else setSelectedMtcs(mtcOptions.map(m => m.id));
//     setHasSearched(false);
//   };

//   // Helper to get button text
//   const getButtonText = (selectedCount: number, totalCount: number) => {
//     if (selectedCount === 0) return "None selected";
//     if (selectedCount === totalCount && totalCount > 0) return `All selected (${totalCount})`;
//     return `${selectedCount} selected`;
//   };

//   // Handlers
//   const handleSearch = () => {
//     const payload = { fromDate, toDate, districts: selectedDistricts, mtcs: selectedMtcs };
//     console.log("Fetching Admission Dashboard By MTC for:", payload);
//     setHasSearched(true);
//   };

//   return (
//     <div className="w-full mt-8">
//       {/* Outer Card */}
//       <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
//         {/* Card Header */}
//         <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
//           <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
//             Admission Dashboard By MTC
//           </h5>
//         </div>

//         {/* Card Body */}
//         <div className="p-4 md:p-6 text-sm">
          
//           <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-end">
            
//             {/* Filters Section (col-xl-10) */}
//             <div className="xl:col-span-10">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                
//                 {/* From Date (col-xl-2) */}
//                 <div className="lg:col-span-2 flex flex-col gap-1">
//                   <label htmlFor="txt_FromDate" className="font-medium text-gray-700">From Date</label>
//                   <div className="relative">
//                     <input
//                       id="txt_FromDate"
//                       type="date"
//                       value={fromDate}
//                       onChange={(e) => { setFromDate(e.target.value); setHasSearched(false); }}
//                       className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] h-[38px]"
//                     />
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
//                       <Calendar size={16} />
//                     </div>
//                   </div>
//                 </div>

//                 {/* To Date (col-xl-2) */}
//                 <div className="lg:col-span-2 flex flex-col gap-1">
//                   <label htmlFor="txt_ToDate" className="font-medium text-gray-700">To Date</label>
//                   <div className="relative">
//                     <input
//                       id="txt_ToDate"
//                       type="date"
//                       value={toDate}
//                       onChange={(e) => { setToDate(e.target.value); setHasSearched(false); }}
//                       className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] h-[38px]"
//                     />
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
//                       <Calendar size={16} />
//                     </div>
//                   </div>
//                 </div>

//                 {/* District Multi-select (col-xl-3) */}
//                 <div className="lg:col-span-3 relative" ref={districtRef}>
//                   <label className="block font-medium text-gray-700 mb-1">District</label>
//                   <button
//                     type="button"
//                     onClick={() => setIsDistrictOpen(!isDistrictOpen)}
//                     className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] flex items-center justify-between transition-shadow"
//                   >
//                     <span className="truncate text-gray-700">
//                       {getButtonText(selectedDistricts.length, DISTRICTS.length)}
//                     </span>
//                     <ChevronDown size={16} className={`ml-2 flex-shrink-0 text-gray-400 transition-transform ${isDistrictOpen ? 'rotate-180' : ''}`} />
//                   </button>

//                   {isDistrictOpen && (
//                     <div className="absolute z-10 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col">
//                       <div className="p-2 border-b border-gray-100 relative bg-gray-50 rounded-t-md">
//                         <SearchIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="search"
//                           className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
//                           placeholder="Search District..."
//                           value={districtSearch}
//                           onChange={(e) => setDistrictSearch(e.target.value)}
//                         />
//                       </div>
//                       <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
//                         {!districtSearch && (
//                           <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors font-semibold border-b border-gray-100 mb-1">
//                             <input
//                               type="checkbox"
//                               checked={selectedDistricts.length === DISTRICTS.length && DISTRICTS.length > 0}
//                               onChange={toggleAllDistricts}
//                               className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
//                             />
//                             <span className="text-gray-900 select-none">Select all</span>
//                           </label>
//                         )}
//                         {filteredDistricts.map((district) => (
//                           <label key={district.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
//                             <input
//                               type="checkbox"
//                               checked={selectedDistricts.includes(district.id)}
//                               onChange={() => toggleDistrict(district.id)}
//                               className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
//                             />
//                             <span className="text-gray-700 select-none">{district.name}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* MTC Multi-select (col-xl-3) */}
//                 <div className="lg:col-span-3 relative" ref={mtcRef}>
//                   <label className="block font-medium text-gray-700 mb-1">MTC</label>
//                   <button
//                     type="button"
//                     disabled={mtcOptions.length === 0}
//                     onClick={() => setIsMtcOpen(!isMtcOpen)}
//                     className="w-full bg-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed border border-gray-300 rounded-md py-1.5 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] flex items-center justify-between transition-shadow"
//                   >
//                     <span className="truncate text-gray-700">
//                       {getButtonText(selectedMtcs.length, mtcOptions.length)}
//                     </span>
//                     <ChevronDown size={16} className={`ml-2 flex-shrink-0 transition-transform ${isMtcOpen ? 'rotate-180' : ''} ${mtcOptions.length === 0 ? 'text-gray-300' : 'text-gray-400'}`} />
//                   </button>

//                   {isMtcOpen && mtcOptions.length > 0 && (
//                     <div className="absolute z-10 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col right-0">
//                       <div className="p-2 border-b border-gray-100 relative bg-gray-50 rounded-t-md">
//                         <SearchIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="search"
//                           className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
//                           placeholder="Search MTC..."
//                           value={mtcSearch}
//                           onChange={(e) => setMtcSearch(e.target.value)}
//                         />
//                       </div>
//                       <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
//                         {!mtcSearch && (
//                           <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors font-semibold border-b border-gray-100 mb-1">
//                             <input
//                               type="checkbox"
//                               checked={selectedMtcs.length === mtcOptions.length && mtcOptions.length > 0}
//                               onChange={toggleAllMtcs}
//                               className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
//                             />
//                             <span className="text-gray-900 select-none">Select all</span>
//                           </label>
//                         )}
//                         {filteredMtcs.map((mtc) => (
//                           <label key={mtc.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
//                             <input
//                               type="checkbox"
//                               checked={selectedMtcs.includes(mtc.id)}
//                               onChange={() => toggleMtc(mtc.id)}
//                               className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
//                             />
//                             <span className="text-gray-700 select-none">{mtc.name}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Search Button (col-xl-2) */}
//                 <div className="lg:col-span-2 lg:pt-0 pt-2">
//                   <button
//                     type="button"
//                     onClick={handleSearch}
//                     className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-4 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-[#0B918C] bg-white hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C]"
//                   >
//                     <SearchIcon size={16} />
//                     Search
//                   </button>
//                 </div>

//               </div>
//             </div>

//             {/* Export Actions Section (col-xl-2) */}
//             <div className="xl:col-span-2 flex xl:justify-end mt-4 xl:mt-0">
//               {hasSearched && (
//                 <div className="flex items-center gap-2 h-[38px] animate-in fade-in duration-300">
//                   <button
//                     type="button"
//                     onClick={() => console.log("Exporting Excel")}
//                     title="Download Excel"
//                     className="p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-sm"
//                   >
//                     <FileSpreadsheet size={18} />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => console.log("Exporting PDF")}
//                     title="Download PDF"
//                     className="p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-sm"
//                   >
//                     <FileText size={18} />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => console.log("Exporting Image")}
//                     title="Download Image"
//                     className="p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-sm"
//                   >
//                     <ImageIcon size={18} />
//                   </button>
//                 </div>
//               )}
//             </div>

//           </div>

//           {/* Report Output Sections */}
//           <div className="mt-8 border-t border-gray-100 pt-6">
//             <div id="div_Report" className="w-full text-center text-gray-500 mb-6">
//               {hasSearched ? "MTC Dashboard data loaded." : "Enter parameters and search to view the dashboard."}
//             </div>
//             <div id="div_Report2" className="w-full text-center text-gray-500">
//               {/* Secondary Report Visualizations */}
//             </div>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Calendar, 
  Search as SearchIcon, 
  ChevronDown, 
  FileSpreadsheet, 
  FileText, 
  Image as ImageIcon,
  Loader2,
  Users,
  CheckCircle2,
  BedDouble,
  PieChart
} from "lucide-react";

interface DistrictOption {
  id: string;
  name: string;
}

interface MtcOption {
  id: string;
  name: string;
  district: string;
}

interface MtcAdmissionData {
  mtcId: string;
  mtcName: string;
  districtName: string;
  totalAdmissions: number;
  male: number;
  female: number;
  otherGender: number;
  st: number;
  sc: number;
  obc: number;
  general: number;
  sahiya: number;
  anm: number;
  selfReferral: number;
  othersReferral: number;
  age0to6m: number;
  age6to23m: number;
  age24to59m: number;
  compliantDischarge: number;
  nonCompliantDischarge: number;
  totalDischarged: number;
  sanctionedBeds: number;
  occupiedBeds: number;
  bedOccupancyRate: number;
}

export default function AdmissionDashboardByMtc() {
  // Form State
  const [fromDate, setFromDate] = useState<string>("2026-08-01");
  const [toDate, setToDate] = useState<string>("2026-08-05");

  // Dropdown Options & Loading States
  const [districts, setDistricts] = useState<DistrictOption[]>([]);
  const [isDistrictsLoading, setIsDistrictsLoading] = useState<boolean>(true);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [isDistrictOpen, setIsDistrictOpen] = useState<boolean>(false);
  const [districtSearch, setDistrictSearch] = useState<string>("");

  const [mtcOptions, setMtcOptions] = useState<MtcOption[]>([]);
  const [isMtcsLoading, setIsMtcsLoading] = useState<boolean>(false);
  const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);
  const [isMtcOpen, setIsMtcOpen] = useState<boolean>(false);
  const [mtcSearch, setMtcSearch] = useState<string>("");

  // Report Search State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [reportData, setReportData] = useState<MtcAdmissionData[]>([]);

  // Refs for Outside Click Detection
  const districtRef = useRef<HTMLDivElement>(null);
  const mtcRef = useRef<HTMLDivElement>(null);

  // Close Dropdowns on Outside Click
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

  // 1. Fetch Districts List on Load
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        setIsDistrictsLoading(true);
        const res = await fetch("/api/districts");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setDistricts(
            json.data.map((d: any) => ({
              id: String(d.district_id || d.district_name).toUpperCase(),
              name: String(d.district_name || d.name).toUpperCase(),
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch districts:", err);
      } finally {
        setIsDistrictsLoading(false);
      }
    };
    fetchDistricts();
  }, []);

  // 2. Fetch Dependent MTCs whenever Selected Districts Change
  useEffect(() => {
    const fetchMtcs = async () => {
      try {
        setIsMtcsLoading(true);
        const query =
          selectedDistricts.length > 0
            ? `?districtIds=${encodeURIComponent(selectedDistricts.join(","))}`
            : "";
        const res = await fetch(`/api/mtcs${query}`);
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          const formatted: MtcOption[] = json.data.map((m: any) => ({
            id: String(m.id),
            name: String(m.name),
            district: String(m.district),
          }));
          setMtcOptions(formatted);
          // Keep only selected MTCs that still exist in current options
          setSelectedMtcs((prev) => prev.filter((id) => formatted.some((m) => m.id === id)));
        } else {
          setMtcOptions([]);
          setSelectedMtcs([]);
        }
      } catch (err) {
        console.error("Failed to fetch MTC options:", err);
        setMtcOptions([]);
      } finally {
        setIsMtcsLoading(false);
      }
    };

    fetchMtcs();
  }, [selectedDistricts]);

  // Filtered dropdowns
  const filteredDistricts = districts.filter((d) =>
    d.name.toLowerCase().includes(districtSearch.toLowerCase())
  );
  const filteredMtcs = mtcOptions.filter((m) =>
    m.name.toLowerCase().includes(mtcSearch.toLowerCase())
  );

  // Dropdown Toggles
  const toggleDistrict = (id: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(id) ? prev.filter((dId) => dId !== id) : [...prev, id]
    );
    setHasSearched(false);
  };

  const toggleAllDistricts = () => {
    if (selectedDistricts.length === districts.length) setSelectedDistricts([]);
    else setSelectedDistricts(districts.map((d) => d.id));
    setHasSearched(false);
  };

  const toggleMtc = (id: string) => {
    setSelectedMtcs((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
    setHasSearched(false);
  };

  const toggleAllMtcs = () => {
    if (selectedMtcs.length === mtcOptions.length) setSelectedMtcs([]);
    else setSelectedMtcs(mtcOptions.map((m) => m.id));
    setHasSearched(false);
  };

  const getButtonText = (selectedCount: number, totalCount: number, label: string) => {
    if (selectedCount === 0) return `All ${label} (${totalCount})`;
    if (selectedCount === totalCount && totalCount > 0) return `All ${label} (${totalCount})`;
    return `${selectedCount} selected`;
  };

  // Execute API Search
  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setHasSearched(false);

      const queryParams = new URLSearchParams({
        fromDate,
        toDate,
        districtIds: selectedDistricts.length > 0 ? selectedDistricts.join(",") : "ALL",
        mtcIds: selectedMtcs.length > 0 ? selectedMtcs.join(",") : "ALL",
      });

      const res = await fetch(`/api/mtc-state-report/mtc-generation-report?${queryParams.toString()}`);
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        setReportData(json.data);
      } else {
        console.error("API error:", json.error);
        setReportData([]);
      }
    } catch (error) {
      console.error("Failed to fetch MTC report:", error);
      setReportData([]);
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  };

  // Aggregated Totals
  const totals = reportData.reduce(
    (acc, curr) => ({
      totalAdmissions: acc.totalAdmissions + curr.totalAdmissions,
      male: acc.male + curr.male,
      female: acc.female + curr.female,
      st: acc.st + curr.st,
      sc: acc.sc + curr.sc,
      obc: acc.obc + curr.obc,
      general: acc.general + curr.general,
      sahiya: acc.sahiya + curr.sahiya,
      anm: acc.anm + curr.anm,
      selfReferral: acc.selfReferral + curr.selfReferral,
      othersReferral: acc.othersReferral + curr.othersReferral,
      age0to6m: acc.age0to6m + curr.age0to6m,
      age6to23m: acc.age6to23m + curr.age6to23m,
      age24to59m: acc.age24to59m + curr.age24to59m,
      compliantDischarge: acc.compliantDischarge + curr.compliantDischarge,
      nonCompliantDischarge: acc.nonCompliantDischarge + curr.nonCompliantDischarge,
      totalDischarged: acc.totalDischarged + curr.totalDischarged,
      sanctionedBeds: acc.sanctionedBeds + curr.sanctionedBeds,
      occupiedBeds: acc.occupiedBeds + curr.occupiedBeds,
    }),
    {
      totalAdmissions: 0, male: 0, female: 0, st: 0, sc: 0, obc: 0, general: 0,
      sahiya: 0, anm: 0, selfReferral: 0, othersReferral: 0,
      age0to6m: 0, age6to23m: 0, age24to59m: 0,
      compliantDischarge: 0, nonCompliantDischarge: 0, totalDischarged: 0,
      sanctionedBeds: 0, occupiedBeds: 0
    }
  );

  const overallBedOccupancyRate = totals.sanctionedBeds > 0
    ? ((totals.occupiedBeds / totals.sanctionedBeds) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Search Filters Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-gray-200 px-6 py-4">
          <h5 className="text-lg font-semibold text-[#0B918C] m-0">Admission Dashboard By MTC</h5>
        </div>

        <div className="p-4 md:p-6 text-sm">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-end">
            <div className="xl:col-span-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                
                {/* From Date */}
                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label htmlFor="txt_FromDate" className="font-medium text-gray-700">From Date</label>
                  <div className="relative">
                    <input
                      id="txt_FromDate"
                      type="date"
                      value={fromDate}
                      onChange={(e) => { setFromDate(e.target.value); setHasSearched(false); }}
                      className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
                    />
                    <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* To Date */}
                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label htmlFor="txt_ToDate" className="font-medium text-gray-700">To Date</label>
                  <div className="relative">
                    <input
                      id="txt_ToDate"
                      type="date"
                      value={toDate}
                      onChange={(e) => { setToDate(e.target.value); setHasSearched(false); }}
                      className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
                    />
                    <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* District Dropdown */}
                <div className="lg:col-span-3 relative" ref={districtRef}>
                  <label className="block font-medium text-gray-700 mb-1">District</label>
                  <button
                    type="button"
                    onClick={() => setIsDistrictOpen(!isDistrictOpen)}
                    disabled={isDistrictsLoading}
                    className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] flex items-center justify-between"
                  >
                    <span className="truncate text-gray-700">
                      {isDistrictsLoading ? "Loading..." : getButtonText(selectedDistricts.length, districts.length, "Districts")}
                    </span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDistrictOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isDistrictOpen && (
                    <div className="absolute z-20 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col">
                      <div className="p-2 border-b relative bg-gray-50">
                        <SearchIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="search"
                          className="w-full pl-8 pr-2 py-1.5 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
                          placeholder="Search District..."
                          value={districtSearch}
                          onChange={(e) => setDistrictSearch(e.target.value)}
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto p-1">
                        {!districtSearch && (
                          <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer font-semibold border-b">
                            <input
                              type="checkbox"
                              checked={selectedDistricts.length === districts.length && districts.length > 0}
                              onChange={toggleAllDistricts}
                              className="rounded border-gray-300 text-[#0B918C]"
                            />
                            <span>Select all</span>
                          </label>
                        )}
                        {filteredDistricts.map((district) => (
                          <label key={district.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer text-xs">
                            <input
                              type="checkbox"
                              checked={selectedDistricts.includes(district.id)}
                              onChange={() => toggleDistrict(district.id)}
                              className="rounded border-gray-300 text-[#0B918C]"
                            />
                            <span>{district.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* MTC Dropdown */}
                <div className="lg:col-span-3 relative" ref={mtcRef}>
                  <label className="block font-medium text-gray-700 mb-1">MTC</label>
                  <button
                    type="button"
                    disabled={isMtcsLoading}
                    onClick={() => setIsMtcOpen(!isMtcOpen)}
                    className="w-full bg-white disabled:bg-gray-100 border border-gray-300 rounded-md py-1.5 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] flex items-center justify-between"
                  >
                    <span className="truncate text-gray-700">
                      {isMtcsLoading ? "Loading MTCs..." : getButtonText(selectedMtcs.length, mtcOptions.length, "MTCs")}
                    </span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isMtcOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isMtcOpen && mtcOptions.length > 0 && (
                    <div className="absolute z-20 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col right-0">
                      <div className="p-2 border-b relative bg-gray-50">
                        <SearchIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="search"
                          className="w-full pl-8 pr-2 py-1.5 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
                          placeholder="Search MTC..."
                          value={mtcSearch}
                          onChange={(e) => setMtcSearch(e.target.value)}
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto p-1">
                        {!mtcSearch && (
                          <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer font-semibold border-b">
                            <input
                              type="checkbox"
                              checked={selectedMtcs.length === mtcOptions.length && mtcOptions.length > 0}
                              onChange={toggleAllMtcs}
                              className="rounded border-gray-300 text-[#0B918C]"
                            />
                            <span>Select all</span>
                          </label>
                        )}
                        {filteredMtcs.map((mtc) => (
                          <label key={mtc.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer text-xs">
                            <input
                              type="checkbox"
                              checked={selectedMtcs.includes(mtc.id)}
                              onChange={() => toggleMtc(mtc.id)}
                              className="rounded border-gray-300 text-[#0B918C]"
                            />
                            <span>{mtc.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Search Button */}
                <div className="lg:col-span-2">
                  <button
                    type="button"
                    onClick={handleSearch}
                    disabled={isLoading || isDistrictsLoading}
                    className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-4 py-2 text-sm font-bold rounded-md text-white bg-[#0B918C] hover:bg-[#097773] transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <SearchIcon size={16} />}
                    SEARCH
                  </button>
                </div>

              </div>
            </div>

            {/* Export Buttons */}
            <div className="xl:col-span-2 flex xl:justify-end mt-4 xl:mt-0">
              {hasSearched && (
                <div className="flex items-center gap-2 h-[38px] animate-in fade-in duration-300">
                  <button title="Export Excel" className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors">
                    <FileSpreadsheet size={18} />
                  </button>
                  <button title="Export PDF" className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
                    <FileText size={18} />
                  </button>
                  <button title="Export Image" className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
                    <ImageIcon size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Key Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-teal-50 rounded-lg text-[#0b918c]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Total Admissions</p>
                <h3 className="text-xl font-bold text-gray-800">{totals.totalAdmissions}</h3>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Total Discharged</p>
                <h3 className="text-xl font-bold text-gray-800">{totals.totalDischarged}</h3>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <BedDouble className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Occupied Beds</p>
                <h3 className="text-xl font-bold text-gray-800">{totals.occupiedBeds} / {totals.sanctionedBeds}</h3>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                <PieChart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Avg Bed Occupancy</p>
                <h3 className="text-xl font-bold text-gray-800">{overallBedOccupancyRate}%</h3>
              </div>
            </div>
          </div>

          {/* Consolidated Data Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
              <h6 className="font-bold text-gray-700 text-sm tracking-wide uppercase">
                MTC-Wise Admission & Discharge Consolidated Report
              </h6>
              <span className="text-xs text-gray-500">
                Period: <span className="font-medium text-gray-700">{fromDate}</span> to <span className="font-medium text-gray-700">{toDate}</span>
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-100 text-gray-700 font-bold uppercase border-b border-gray-200">
                  <tr>
                    <th rowSpan={2} className="p-3 border-r border-gray-200 text-center min-w-[120px] bg-slate-200/60">District</th>
                    <th rowSpan={2} className="p-3 border-r border-gray-200 text-center min-w-[160px] bg-slate-200/60">MTC Center</th>
                    <th rowSpan={2} className="p-3 border-r border-gray-200 text-center bg-teal-50 text-[#0b918c]">Total Admissions</th>
                    <th colSpan={2} className="p-2 border-r border-gray-200 text-center bg-slate-100">Gender</th>
                    <th colSpan={4} className="p-2 border-r border-gray-200 text-center bg-slate-100">Caste / Category</th>
                    <th colSpan={4} className="p-2 border-r border-gray-200 text-center bg-slate-100">Referred By</th>
                    <th colSpan={3} className="p-2 border-r border-gray-200 text-center bg-slate-100">Discharge Age Group</th>
                    <th colSpan={3} className="p-2 border-r border-gray-200 text-center bg-emerald-50 text-emerald-800">Discharge Performance</th>
                    <th colSpan={3} className="p-2 text-center bg-blue-50 text-blue-800">Bed Occupancy Rate</th>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <th className="p-2 border-r border-gray-200 text-center">Male</th>
                    <th className="p-2 border-r border-gray-200 text-center">Female</th>
                    <th className="p-2 border-r border-gray-200 text-center">ST</th>
                    <th className="p-2 border-r border-gray-200 text-center">SC</th>
                    <th className="p-2 border-r border-gray-200 text-center">OBC</th>
                    <th className="p-2 border-r border-gray-200 text-center">GEN</th>
                    <th className="p-2 border-r border-gray-200 text-center">Sahiya</th>
                    <th className="p-2 border-r border-gray-200 text-center">ANM</th>
                    <th className="p-2 border-r border-gray-200 text-center">Self</th>
                    <th className="p-2 border-r border-gray-200 text-center">Others</th>
                    <th className="p-2 border-r border-gray-200 text-center">&lt; 6M</th>
                    <th className="p-2 border-r border-gray-200 text-center">6-23M</th>
                    <th className="p-2 border-r border-gray-200 text-center">24-59M</th>
                    <th className="p-2 border-r border-gray-200 text-center bg-emerald-50/50 text-emerald-700">Compliant</th>
                    <th className="p-2 border-r border-gray-200 text-center bg-emerald-50/50 text-emerald-700">Non-Compliant</th>
                    <th className="p-2 border-r border-gray-200 text-center bg-emerald-100/50 font-bold text-emerald-800">Total Discharged</th>
                    <th className="p-2 border-r border-gray-200 text-center bg-blue-50/50">Sanctioned</th>
                    <th className="p-2 border-r border-gray-200 text-center bg-blue-50/50">Occupied</th>
                    <th className="p-2 text-center bg-blue-100/50 font-bold text-blue-800">% Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reportData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 border-r border-gray-200 font-semibold text-gray-800">{row.districtName}</td>
                      <td className="p-3 border-r border-gray-200 text-gray-700">{row.mtcName}</td>
                      <td className="p-3 border-r border-gray-200 text-center font-bold text-[#0b918c] bg-teal-50/30">{row.totalAdmissions}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.male}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.female}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.st}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.sc}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.obc}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.general}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.sahiya}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.anm}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.selfReferral}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.othersReferral}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.age0to6m}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.age6to23m}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.age24to59m}</td>
                      <td className="p-2 border-r border-gray-200 text-center font-semibold text-emerald-600 bg-emerald-50/20">{row.compliantDischarge}</td>
                      <td className="p-2 border-r border-gray-200 text-center font-semibold text-red-500 bg-red-50/20">{row.nonCompliantDischarge}</td>
                      <td className="p-2 border-r border-gray-200 text-center font-bold text-gray-800 bg-emerald-50/30">{row.totalDischarged}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.sanctionedBeds}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.occupiedBeds}</td>
                      <td className="p-2 text-center font-bold bg-blue-50/30 text-blue-700">{row.bedOccupancyRate}%</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-100 font-bold border-t-2 border-gray-300 text-gray-800">
                  <tr>
                    <td colSpan={2} className="p-3 border-r border-gray-200 text-left uppercase">Total / State Average</td>
                    <td className="p-3 border-r border-gray-200 text-center text-[#0b918c]">{totals.totalAdmissions}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.male}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.female}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.st}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.sc}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.obc}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.general}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.sahiya}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.anm}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.selfReferral}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.othersReferral}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.age0to6m}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.age6to23m}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.age24to59m}</td>
                    <td className="p-2 border-r border-gray-200 text-center text-emerald-700">{totals.compliantDischarge}</td>
                    <td className="p-2 border-r border-gray-200 text-center text-red-600">{totals.nonCompliantDischarge}</td>
                    <td className="p-2 border-r border-gray-200 text-center text-gray-900">{totals.totalDischarged}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.sanctionedBeds}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.occupiedBeds}</td>
                    <td className="p-2 text-center text-blue-800">{overallBedOccupancyRate}%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { 
//   Calendar, 
//   Search as SearchIcon, 
//   ChevronDown, 
//   FileSpreadsheet, 
//   FileText, 
//   Image as ImageIcon,
//   Loader2,
//   Users,
//   CheckCircle2,
//   BedDouble,
//   PieChart
// } from "lucide-react";

// interface DistrictOption {
//   id: string;
//   name: string;
// }

// interface MtcOption {
//   id: string;
//   name: string;
//   district: string;
// }

// interface MtcAdmissionData {
//   mtcId: string;
//   mtcName: string;
//   districtName: string;
//   totalAdmissions: number;
//   male: number;
//   female: number;
//   otherGender: number;
//   st: number;
//   sc: number;
//   obc: number;
//   general: number;
//   sahiya: number;
//   anm: number;
//   selfReferral: number;
//   othersReferral: number;
//   age0to6m: number;
//   age6to23m: number;
//   age24to59m: number;
//   compliantDischarge: number;
//   nonCompliantDischarge: number;
//   totalDischarged: number;
//   sanctionedBeds: number;
//   occupiedBeds: number;
//   bedOccupancyRate: number;
// }

// export default function AdmissionDashboardByMtc() {
//   // Form Dates
//   const [fromDate, setFromDate] = useState<string>("2026-08-01");
//   const [toDate, setToDate] = useState<string>("2026-08-05");

//   // District Selection State
//   const [districts, setDistricts] = useState<DistrictOption[]>([]);
//   const [isDistrictsLoading, setIsDistrictsLoading] = useState<boolean>(true);
//   const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
//   const [isDistrictOpen, setIsDistrictOpen] = useState<boolean>(false);
//   const [districtSearch, setDistrictSearch] = useState<string>("");

//   // MTC Selection State
//   const [mtcOptions, setMtcOptions] = useState<MtcOption[]>([]);
//   const [isMtcsLoading, setIsMtcsLoading] = useState<boolean>(false);
//   const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);
//   const [isMtcOpen, setIsMtcOpen] = useState<boolean>(false);
//   const [mtcSearch, setMtcSearch] = useState<string>("");

//   // Search Results & Loading
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [hasSearched, setHasSearched] = useState<boolean>(false);
//   const [reportData, setReportData] = useState<MtcAdmissionData[]>([]);

//   // Refs for Outside Clicks
//   const districtRef = useRef<HTMLDivElement>(null);
//   const mtcRef = useRef<HTMLDivElement>(null);

//   // Close dropdowns on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (districtRef.current && !districtRef.current.contains(event.target as Node)) {
//         setIsDistrictOpen(false);
//       }
//       if (mtcRef.current && !mtcRef.current.contains(event.target as Node)) {
//         setIsMtcOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // 1. Fetch District Options on Load
//   useEffect(() => {
//     const fetchDistricts = async () => {
//       try {
//         setIsDistrictsLoading(true);
//         const res = await fetch("/api/districts");
//         const json = await res.json();
//         if (json.success && Array.isArray(json.data)) {
//           setDistricts(
//             json.data.map((d: any) => ({
//               id: String(d.district_id || d.district_name).toUpperCase(),
//               name: String(d.district_name || d.name).toUpperCase(),
//             }))
//           );
//         }
//       } catch (err) {
//         console.error("Failed to fetch districts:", err);
//       } finally {
//         setIsDistrictsLoading(false);
//       }
//     };
//     fetchDistricts();
//   }, []);

//   // 2. Fetch Dependent MTC Options whenever Selected Districts Change
//   useEffect(() => {
//     const fetchMtcs = async () => {
//       try {
//         setIsMtcsLoading(true);
//         const query =
//           selectedDistricts.length > 0
//             ? `?districtIds=${encodeURIComponent(selectedDistricts.join(","))}`
//             : "";
//         const res = await fetch(`/api/mtcs${query}`);
//         const json = await res.json();

//         if (json.success && Array.isArray(json.data)) {
//           const formatted: MtcOption[] = json.data.map((m: any) => ({
//             id: String(m.id || m.mtc_id || m.mtc_code),
//             name: String(m.name || m.mtc_name || m.center_name).toUpperCase(),
//             district: String(m.district || m.district_name || "").toUpperCase(),
//           }));
//           setMtcOptions(formatted);
//           setSelectedMtcs((prev) => prev.filter((id) => formatted.some((m) => m.id === id)));
//         } else {
//           setMtcOptions([]);
//           setSelectedMtcs([]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch MTC options:", err);
//         setMtcOptions([]);
//       } finally {
//         setIsMtcsLoading(false);
//       }
//     };

//     fetchMtcs();
//   }, [selectedDistricts]);

//   // Filtered dropdown lists
//   const filteredDistricts = districts.filter((d) =>
//     d.name.toLowerCase().includes(districtSearch.toLowerCase())
//   );
//   const filteredMtcs = mtcOptions.filter((m) =>
//     m.name.toLowerCase().includes(mtcSearch.toLowerCase())
//   );

//   // Dropdown Toggles
//   const toggleDistrict = (id: string) => {
//     setSelectedDistricts((prev) =>
//       prev.includes(id) ? prev.filter((dId) => dId !== id) : [...prev, id]
//     );
//     setHasSearched(false);
//   };

//   const toggleAllDistricts = () => {
//     if (selectedDistricts.length === districts.length) setSelectedDistricts([]);
//     else setSelectedDistricts(districts.map((d) => d.id));
//     setHasSearched(false);
//   };

//   const toggleMtc = (id: string) => {
//     setSelectedMtcs((prev) =>
//       prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
//     );
//     setHasSearched(false);
//   };

//   const toggleAllMtcs = () => {
//     if (selectedMtcs.length === mtcOptions.length) setSelectedMtcs([]);
//     else setSelectedMtcs(mtcOptions.map((m) => m.id));
//     setHasSearched(false);
//   };

//   const getButtonText = (selectedCount: number, totalCount: number, label: string) => {
//     if (selectedCount === 0) return `All ${label} (${totalCount})`;
//     if (selectedCount === totalCount && totalCount > 0) return `All ${label} (${totalCount})`;
//     return `${selectedCount} selected`;
//   };

//   // Search Submit Handler
//   const handleSearch = async () => {
//     try {
//       setIsLoading(true);
//       setHasSearched(false);

//       const queryParams = new URLSearchParams({
//         fromDate,
//         toDate,
//         districtIds: selectedDistricts.length > 0 ? selectedDistricts.join(",") : "ALL",
//         mtcIds: selectedMtcs.length > 0 ? selectedMtcs.join(",") : "ALL",
//       });

//       const res = await fetch(`/api/mtc-state-report/mtc-generation-report?${queryParams.toString()}`);
//       const json = await res.json();

//       if (json.success && Array.isArray(json.data)) {
//         setReportData(json.data);
//       } else {
//         console.error("API error:", json.error);
//         setReportData([]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch MTC report:", error);
//       setReportData([]);
//     } finally {
//       setIsLoading(false);
//       setHasSearched(true);
//     }
//   };

//   // Aggregate Column Totals
//   const totals = reportData.reduce(
//     (acc, curr) => ({
//       totalAdmissions: acc.totalAdmissions + curr.totalAdmissions,
//       male: acc.male + curr.male,
//       female: acc.female + curr.female,
//       st: acc.st + curr.st,
//       sc: acc.sc + curr.sc,
//       obc: acc.obc + curr.obc,
//       general: acc.general + curr.general,
//       sahiya: acc.sahiya + curr.sahiya,
//       anm: acc.anm + curr.anm,
//       selfReferral: acc.selfReferral + curr.selfReferral,
//       othersReferral: acc.othersReferral + curr.othersReferral,
//       age0to6m: acc.age0to6m + curr.age0to6m,
//       age6to23m: acc.age6to23m + curr.age6to23m,
//       age24to59m: acc.age24to59m + curr.age24to59m,
//       compliantDischarge: acc.compliantDischarge + curr.compliantDischarge,
//       nonCompliantDischarge: acc.nonCompliantDischarge + curr.nonCompliantDischarge,
//       totalDischarged: acc.totalDischarged + curr.totalDischarged,
//       sanctionedBeds: acc.sanctionedBeds + curr.sanctionedBeds,
//       occupiedBeds: acc.occupiedBeds + curr.occupiedBeds,
//     }),
//     {
//       totalAdmissions: 0, male: 0, female: 0, st: 0, sc: 0, obc: 0, general: 0,
//       sahiya: 0, anm: 0, selfReferral: 0, othersReferral: 0,
//       age0to6m: 0, age6to23m: 0, age24to59m: 0,
//       compliantDischarge: 0, nonCompliantDischarge: 0, totalDischarged: 0,
//       sanctionedBeds: 0, occupiedBeds: 0
//     }
//   );

//   const overallBedOccupancyRate = totals.sanctionedBeds > 0
//     ? ((totals.occupiedBeds / totals.sanctionedBeds) * 100).toFixed(1)
//     : "0.0";

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
//       {/* Control / Filter Panel */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="bg-slate-50 border-b border-gray-200 px-6 py-4">
//           <h5 className="text-lg font-semibold text-[#0B918C] m-0">Admission Dashboard By MTC</h5>
//         </div>

//         <div className="p-4 md:p-6 text-sm">
//           <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-end">
//             <div className="xl:col-span-10">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                
//                 {/* From Date */}
//                 <div className="lg:col-span-2 flex flex-col gap-1">
//                   <label htmlFor="txt_FromDate" className="font-medium text-gray-700">From Date</label>
//                   <div className="relative">
//                     <input
//                       id="txt_FromDate"
//                       type="date"
//                       value={fromDate}
//                       onChange={(e) => { setFromDate(e.target.value); setHasSearched(false); }}
//                       className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
//                     />
//                     <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                   </div>
//                 </div>

//                 {/* To Date */}
//                 <div className="lg:col-span-2 flex flex-col gap-1">
//                   <label htmlFor="txt_ToDate" className="font-medium text-gray-700">To Date</label>
//                   <div className="relative">
//                     <input
//                       id="txt_ToDate"
//                       type="date"
//                       value={toDate}
//                       onChange={(e) => { setToDate(e.target.value); setHasSearched(false); }}
//                       className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
//                     />
//                     <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                   </div>
//                 </div>

//                 {/* District Dropdown */}
//                 <div className="lg:col-span-3 relative" ref={districtRef}>
//                   <label className="block font-medium text-gray-700 mb-1">District</label>
//                   <button
//                     type="button"
//                     onClick={() => setIsDistrictOpen(!isDistrictOpen)}
//                     disabled={isDistrictsLoading}
//                     className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] flex items-center justify-between"
//                   >
//                     <span className="truncate text-gray-700">
//                       {isDistrictsLoading ? "Loading..." : getButtonText(selectedDistricts.length, districts.length, "Districts")}
//                     </span>
//                     <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDistrictOpen ? "rotate-180" : ""}`} />
//                   </button>

//                   {isDistrictOpen && (
//                     <div className="absolute z-20 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col overflow-hidden">
//                       <div className="p-2 border-b relative bg-gray-50">
//                         <SearchIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="search"
//                           className="w-full pl-8 pr-2 py-1.5 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
//                           placeholder="Search District..."
//                           value={districtSearch}
//                           onChange={(e) => setDistrictSearch(e.target.value)}
//                         />
//                       </div>
//                       <div className="max-h-60 overflow-y-auto p-1">
//                         {!districtSearch && (
//                           <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer font-semibold border-b text-xs">
//                             <input
//                               type="checkbox"
//                               checked={selectedDistricts.length === districts.length && districts.length > 0}
//                               onChange={toggleAllDistricts}
//                               className="rounded border-gray-300 text-[#0B918C]"
//                             />
//                             <span>Select all</span>
//                           </label>
//                         )}
//                         {filteredDistricts.map((district) => (
//                           <label key={district.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer text-xs">
//                             <input
//                               type="checkbox"
//                               checked={selectedDistricts.includes(district.id)}
//                               onChange={() => toggleDistrict(district.id)}
//                               className="rounded border-gray-300 text-[#0B918C]"
//                             />
//                             <span>{district.name}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* MTC Dropdown */}
//                 <div className="lg:col-span-3 relative" ref={mtcRef}>
//                   <label className="block font-medium text-gray-700 mb-1">MTC</label>
//                   <button
//                     type="button"
//                     disabled={isMtcsLoading}
//                     onClick={() => setIsMtcOpen(!isMtcOpen)}
//                     className="w-full bg-white disabled:bg-gray-50 border border-gray-300 rounded-md py-1.5 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] flex items-center justify-between"
//                   >
//                     <span className="truncate text-gray-700">
//                       {isMtcsLoading ? (
//                         <span className="flex items-center gap-1 text-gray-400">
//                           <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading MTCs...
//                         </span>
//                       ) : (
//                         getButtonText(selectedMtcs.length, mtcOptions.length, "MTCs")
//                       )}
//                     </span>
//                     <ChevronDown size={16} className={`text-gray-400 transition-transform ${isMtcOpen ? "rotate-180" : ""}`} />
//                   </button>

//                   {isMtcOpen && (
//                     <div className="absolute z-20 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col right-0 overflow-hidden">
//                       <div className="p-2 border-b relative bg-gray-50">
//                         <SearchIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                         <input
//                           type="search"
//                           className="w-full pl-8 pr-2 py-1.5 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
//                           placeholder="Search MTC..."
//                           value={mtcSearch}
//                           onChange={(e) => setMtcSearch(e.target.value)}
//                         />
//                       </div>
//                       <div className="max-h-60 overflow-y-auto p-1">
//                         {!mtcSearch && mtcOptions.length > 0 && (
//                           <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer font-semibold border-b text-xs">
//                             <input
//                               type="checkbox"
//                               checked={selectedMtcs.length === mtcOptions.length && mtcOptions.length > 0}
//                               onChange={toggleAllMtcs}
//                               className="rounded border-gray-300 text-[#0B918C]"
//                             />
//                             <span>Select all</span>
//                           </label>
//                         )}
//                         {filteredMtcs.length > 0 ? (
//                           filteredMtcs.map((mtc) => (
//                             <label key={mtc.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer text-xs">
//                               <input
//                                 type="checkbox"
//                                 checked={selectedMtcs.includes(mtc.id)}
//                                 onChange={() => toggleMtc(mtc.id)}
//                                 className="rounded border-gray-300 text-[#0B918C]"
//                               />
//                               <span>{mtc.name}</span>
//                             </label>
//                           ))
//                         ) : (
//                           <div className="p-3 text-center text-xs text-gray-400">
//                             {isMtcsLoading ? "Loading MTCs..." : "No MTCs found"}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Search Button */}
//                 <div className="lg:col-span-2">
//                   <button
//                     type="button"
//                     onClick={handleSearch}
//                     disabled={isLoading || isDistrictsLoading}
//                     className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-4 py-2 text-sm font-bold rounded-md text-white bg-[#0B918C] hover:bg-[#097773] transition-colors shadow-sm disabled:opacity-50"
//                   >
//                     {isLoading ? <Loader2 size={16} className="animate-spin" /> : <SearchIcon size={16} />}
//                     SEARCH
//                   </button>
//                 </div>

//               </div>
//             </div>

//             {/* Export Actions */}
//             <div className="xl:col-span-2 flex xl:justify-end mt-4 xl:mt-0">
//               {hasSearched && (
//                 <div className="flex items-center gap-2 h-[38px] animate-in fade-in duration-300">
//                   <button title="Export Excel" className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors">
//                     <FileSpreadsheet size={18} />
//                   </button>
//                   <button title="Export PDF" className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
//                     <FileText size={18} />
//                   </button>
//                   <button title="Export Image" className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
//                     <ImageIcon size={18} />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Results View */}
//       {hasSearched && (
//         <div className="space-y-6 animate-in fade-in duration-300">
          
//           {/* Key Metric KPI Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
//               <div className="p-3 bg-teal-50 rounded-lg text-[#0b918c]">
//                 <Users className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-gray-500 uppercase">Total Admissions</p>
//                 <h3 className="text-xl font-bold text-gray-800">{totals.totalAdmissions}</h3>
//               </div>
//             </div>

//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
//               <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
//                 <CheckCircle2 className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-gray-500 uppercase">Total Discharged</p>
//                 <h3 className="text-xl font-bold text-gray-800">{totals.totalDischarged}</h3>
//               </div>
//             </div>

//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
//               <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
//                 <BedDouble className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-gray-500 uppercase">Occupied Beds</p>
//                 <h3 className="text-xl font-bold text-gray-800">{totals.occupiedBeds} / {totals.sanctionedBeds}</h3>
//               </div>
//             </div>

//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
//               <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
//                 <PieChart className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-gray-500 uppercase">Avg Bed Occupancy</p>
//                 <h3 className="text-xl font-bold text-gray-800">{overallBedOccupancyRate}%</h3>
//               </div>
//             </div>
//           </div>

//           {/* Detailed Report Table */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
//               <h6 className="font-bold text-gray-700 text-sm tracking-wide uppercase">
//                 MTC-Wise Admission & Discharge Consolidated Report
//               </h6>
//               <span className="text-xs text-gray-500">
//                 Period: <span className="font-medium text-gray-700">{fromDate}</span> to <span className="font-medium text-gray-700">{toDate}</span>
//               </span>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-xs text-left border-collapse">
//                 <thead className="bg-slate-100 text-gray-700 font-bold uppercase border-b border-gray-200">
//                   <tr>
//                     <th rowSpan={2} className="p-3 border-r border-gray-200 text-center min-w-[120px] bg-slate-200/60">District</th>
//                     <th rowSpan={2} className="p-3 border-r border-gray-200 text-center min-w-[160px] bg-slate-200/60">MTC Center</th>
//                     <th rowSpan={2} className="p-3 border-r border-gray-200 text-center bg-teal-50 text-[#0b918c]">Total Admissions</th>
//                     <th colSpan={2} className="p-2 border-r border-gray-200 text-center bg-slate-100">Gender</th>
//                     <th colSpan={4} className="p-2 border-r border-gray-200 text-center bg-slate-100">Caste / Category</th>
//                     <th colSpan={4} className="p-2 border-r border-gray-200 text-center bg-slate-100">Referred By</th>
//                     <th colSpan={3} className="p-2 border-r border-gray-200 text-center bg-slate-100">Discharge Age Group</th>
//                     <th colSpan={3} className="p-2 border-r border-gray-200 text-center bg-emerald-50 text-emerald-800">Discharge Performance</th>
//                     <th colSpan={3} className="p-2 text-center bg-blue-50 text-blue-800">Bed Occupancy Rate</th>
//                   </tr>
//                   <tr className="border-t border-gray-200">
//                     <th className="p-2 border-r border-gray-200 text-center">Male</th>
//                     <th className="p-2 border-r border-gray-200 text-center">Female</th>
//                     <th className="p-2 border-r border-gray-200 text-center">ST</th>
//                     <th className="p-2 border-r border-gray-200 text-center">SC</th>
//                     <th className="p-2 border-r border-gray-200 text-center">OBC</th>
//                     <th className="p-2 border-r border-gray-200 text-center">GEN</th>
//                     <th className="p-2 border-r border-gray-200 text-center">Sahiya</th>
//                     <th className="p-2 border-r border-gray-200 text-center">ANM</th>
//                     <th className="p-2 border-r border-gray-200 text-center">Self</th>
//                     <th className="p-2 border-r border-gray-200 text-center">Others</th>
//                     <th className="p-2 border-r border-gray-200 text-center">&lt; 6M</th>
//                     <th className="p-2 border-r border-gray-200 text-center">6-23M</th>
//                     <th className="p-2 border-r border-gray-200 text-center">24-59M</th>
//                     <th className="p-2 border-r border-gray-200 text-center bg-emerald-50/50 text-emerald-700">Compliant</th>
//                     <th className="p-2 border-r border-gray-200 text-center bg-emerald-50/50 text-emerald-700">Non-Compliant</th>
//                     <th className="p-2 border-r border-gray-200 text-center bg-emerald-100/50 font-bold text-emerald-800">Total Discharged</th>
//                     <th className="p-2 border-r border-gray-200 text-center bg-blue-50/50">Sanctioned</th>
//                     <th className="p-2 border-r border-gray-200 text-center bg-blue-50/50">Occupied</th>
//                     <th className="p-2 text-center bg-blue-100/50 font-bold text-blue-800">% Rate</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {reportData.map((row, idx) => (
//                     <tr key={idx} className="hover:bg-slate-50 transition-colors">
//                       <td className="p-3 border-r border-gray-200 font-semibold text-gray-800">{row.districtName}</td>
//                       <td className="p-3 border-r border-gray-200 text-gray-700">{row.mtcName}</td>
//                       <td className="p-3 border-r border-gray-200 text-center font-bold text-[#0b918c] bg-teal-50/30">{row.totalAdmissions}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.male}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.female}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.st}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.sc}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.obc}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.general}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.sahiya}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.anm}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.selfReferral}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.othersReferral}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.age0to6m}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.age6to23m}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.age24to59m}</td>
//                       <td className="p-2 border-r border-gray-200 text-center font-semibold text-emerald-600 bg-emerald-50/20">{row.compliantDischarge}</td>
//                       <td className="p-2 border-r border-gray-200 text-center font-semibold text-red-500 bg-red-50/20">{row.nonCompliantDischarge}</td>
//                       <td className="p-2 border-r border-gray-200 text-center font-bold text-gray-800 bg-emerald-50/30">{row.totalDischarged}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.sanctionedBeds}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.occupiedBeds}</td>
//                       <td className="p-2 text-center font-bold bg-blue-50/30 text-blue-700">{row.bedOccupancyRate}%</td>
//                     </tr>
//                   ))}
//                 </tbody>
//                 <tfoot className="bg-slate-100 font-bold border-t-2 border-gray-300 text-gray-800">
//                   <tr>
//                     <td colSpan={2} className="p-3 border-r border-gray-200 text-left uppercase">Total / State Average</td>
//                     <td className="p-3 border-r border-gray-200 text-center text-[#0b918c]">{totals.totalAdmissions}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.male}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.female}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.st}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.sc}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.obc}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.general}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.sahiya}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.anm}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.selfReferral}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.othersReferral}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.age0to6m}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.age6to23m}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.age24to59m}</td>
//                     <td className="p-2 border-r border-gray-200 text-center text-emerald-700">{totals.compliantDischarge}</td>
//                     <td className="p-2 border-r border-gray-200 text-center text-red-600">{totals.nonCompliantDischarge}</td>
//                     <td className="p-2 border-r border-gray-200 text-center text-gray-900">{totals.totalDischarged}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.sanctionedBeds}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.occupiedBeds}</td>
//                     <td className="p-2 text-center text-blue-800">{overallBedOccupancyRate}%</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }