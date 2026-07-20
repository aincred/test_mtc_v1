// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Calendar, Search as SearchIcon, ChevronDown } from "lucide-react";

// // MTC Data extracted from the specific HTML snippet
// const MTC_OPTIONS = [
//   { id: "26", name: "BUNDU" },
//   { id: "27", name: "DORANDA" },
//   { id: "28", name: "MANDAR" },
//   { id: "29", name: "BERO" },
//   { id: "107", name: "UP REFERRAL RIMS" },
// ];

// export default function DownloadChildrenRecords() {
//   // Form state
//   const [fromDate, setFromDate] = useState<string>("");
//   const [toDate, setToDate] = useState<string>("");
  
//   // Selection state (Defaulting to all 5 selected as per the HTML)
//   const [selectedMtcs, setSelectedMtcs] = useState<string[]>(
//     MTC_OPTIONS.map(mtc => mtc.id)
//   );

//   // Dropdown UI & Search state
//   const [isMtcOpen, setIsMtcOpen] = useState(false);
//   const [mtcSearch, setMtcSearch] = useState("");

//   // Ref for handling outside clicks
//   const mtcRef = useRef<HTMLDivElement>(null);

//   // Handle outside clicks to close the dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (mtcRef.current && !mtcRef.current.contains(event.target as Node)) {
//         setIsMtcOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Filtered lists based on search input
//   const filteredMtcs = MTC_OPTIONS.filter((m) =>
//     m.name.toLowerCase().includes(mtcSearch.toLowerCase())
//   );

//   // Toggle individual MTC
//   const toggleMtc = (id: string) => {
//     setSelectedMtcs((prev) =>
//       prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
//     );
//   };

//   // Toggle All MTCs
//   const toggleAllMtcs = () => {
//     if (selectedMtcs.length === MTC_OPTIONS.length) {
//       setSelectedMtcs([]);
//     } else {
//       setSelectedMtcs(MTC_OPTIONS.map((m) => m.id));
//     }
//   };

//   // Helper to get button text
//   const getButtonText = (selectedCount: number, totalCount: number) => {
//     if (selectedCount === 0) return "None selected";
//     if (selectedCount === totalCount) return `All selected (${totalCount})`;
//     return `${selectedCount} selected`;
//   };

//   // Handle Search Action
//   const handleSearch = () => {
//     const searchPayload = {
//       fromDate,
//       toDate,
//       mtcs: selectedMtcs,
//     };
//     console.log("Fetching report with parameters:", searchPayload);
//   };

//   return (
//     <div className="w-full">
//       {/* Card Header */}
//       <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
//         <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
//           Download Children Records
//         </h5>
//       </div>

//       {/* Card Body */}
//       <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200 p-4 md:p-6 text-sm">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          
//           {/* From Date */}
//           <div>
//             <label htmlFor="txt_FromDate" className="block font-medium text-gray-700 mb-1">
//               From Date
//             </label>
//             <div className="relative">
//               <input
//                 id="txt_FromDate"
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//                 className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C]"
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
//                 <Calendar size={16} />
//               </div>
//             </div>
//           </div>

//           {/* To Date */}
//           <div>
//             <label htmlFor="txt_ToDate" className="block font-medium text-gray-700 mb-1">
//               To Date
//             </label>
//             <div className="relative">
//               <input
//                 id="txt_ToDate"
//                 type="date"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//                 className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C]"
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
//                 <Calendar size={16} />
//               </div>
//             </div>
//           </div>

//           {/* District Custom Checkbox Dropdown (Hidden as per HTML structure) */}
//           <div className="hidden">
//              {/* Retained hidden div just to represent the <div id="div_district" style="display: none;"> from your snippet */}
//           </div>

//           {/* MTC Custom Checkbox Dropdown */}
//           <div className="relative" ref={mtcRef}>
//             <label className="block font-medium text-gray-700 mb-1">MTC</label>
//             <button
//               type="button"
//               onClick={() => setIsMtcOpen(!isMtcOpen)}
//               className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] flex items-center justify-between"
//             >
//               <span className="truncate text-gray-700">
//                 {getButtonText(selectedMtcs.length, MTC_OPTIONS.length)}
//               </span>
//               <ChevronDown size={16} className="ml-2 flex-shrink-0 text-gray-400" />
//             </button>

//             {isMtcOpen && (
//               <div className="absolute z-10 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col">
//                 {/* Search Box */}
//                 <div className="p-2 border-b border-gray-100 relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
//                     <SearchIcon size={14} />
//                   </div>
//                   <input
//                     type="search"
//                     className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
//                     placeholder="Search"
//                     value={mtcSearch}
//                     onChange={(e) => setMtcSearch(e.target.value)}
//                   />
//                 </div>

//                 <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
//                   {/* Select All Option */}
//                   {!mtcSearch && (
//                     <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors font-semibold">
//                       <input
//                         type="checkbox"
//                         checked={selectedMtcs.length === MTC_OPTIONS.length && MTC_OPTIONS.length > 0}
//                         onChange={toggleAllMtcs}
//                         className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
//                       />
//                       <span className="text-gray-900 select-none">Select all</span>
//                     </label>
//                   )}

//                   {/* Individual Options */}
//                   {filteredMtcs.map((mtc) => (
//                     <label
//                       key={mtc.id}
//                       className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={selectedMtcs.includes(mtc.id)}
//                         onChange={() => toggleMtc(mtc.id)}
//                         className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
//                       />
//                       <span className="text-gray-700 select-none">{mtc.name}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Search Button */}
//           <div>
//             <button
//               type="button"
//               onClick={handleSearch}
//               className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//             >
//               <SearchIcon size={16} />
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Report Output Area */}
//         <div className="mt-8 text-center" id="div_Report">
//           {/* Render your data table or visualization here */}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, ChevronDown } from "lucide-react";

// --- Types & Constants ---
type RangeType = "daily" | "monthly" | "quarterly";

const MTC_OPTIONS = [
  { id: "26", name: "BUNDU" },
  { id: "27", name: "DORANDA" },
  { id: "28", name: "MANDAR" },
  { id: "29", name: "BERO" },
  { id: "107", name: "UP REFERRAL RIMS" },
];

const YEARS = Array.from({ length: 10 }, (_, i) => (2020 + i).toString());
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
  // --- State Management ---
  const [rangeType, setRangeType] = useState<RangeType>("daily");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedQuarter, setSelectedQuarter] = useState<string>("");

  const [selectedMtcs, setSelectedMtcs] = useState<string[]>(MTC_OPTIONS.map(m => m.id));
  const [isMtcOpen, setIsMtcOpen] = useState(false);
  const mtcRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mtcRef.current && !mtcRef.current.contains(event.target as Node)) setIsMtcOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const payload = {
      rangeType,
      mtcs: selectedMtcs,
      ...(rangeType === "daily" && { fromDate, toDate }),
      ...(rangeType === "monthly" && { year: selectedYear, month: selectedMonth }),
      ...(rangeType === "quarterly" && { year: selectedYear, quarter: selectedQuarter }),
    };
    console.log("Fetching records with parameters:", payload);
  };

  return (
    <div className="w-full">
      {/* Card Header - Updated to Blue 700 */}
      <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
        <h5 className="text-[1.25rem] font-bold m-0 text-blue-700">
          Download Children Records
        </h5>
      </div>

      <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200 p-4 md:p-6 text-sm">
        
        {/* 1. Range Selection (Radio Buttons) - Updated to Blue 600 */}
        <div className="flex items-center space-x-6 mb-6">
          {(["daily", "monthly", "quarterly"] as RangeType[]).map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="radio"
                name="rangeType"
                checked={rangeType === type}
                onChange={() => setRangeType(type)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
              />
              <span className={`capitalize font-medium ${rangeType === type ? "text-blue-600" : "text-gray-600 group-hover:text-gray-800"}`}>
                {type}
              </span>
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          
          {/* 2. Conditional Date/Period Controls - Focus rings updated to Blue */}
          {rangeType === "daily" ? (
            <>
              <div>
                <label className="block font-medium text-gray-700 mb-1">From Date</label>
                <div className="relative">
                  <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">To Date</label>
                <div className="relative">
                  <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
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

          {/* 3. MTC Dropdown - Checkboxes updated to Blue 600 */}
          <div className="relative" ref={mtcRef}>
            <label className="block font-medium text-gray-700 mb-1">MTC</label>
            <button
              type="button"
              onClick={() => setIsMtcOpen(!isMtcOpen)}
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:ring-2 focus:ring-blue-500 h-[38px] flex items-center justify-between"
            >
              <span className="truncate text-gray-700">
                {selectedMtcs.length === 0 ? "None selected" : 
                 selectedMtcs.length === MTC_OPTIONS.length ? `All selected (${MTC_OPTIONS.length})` : 
                 `${selectedMtcs.length} selected`}
              </span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            {isMtcOpen && (
              <div className="absolute z-10 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg p-2 max-h-60 overflow-y-auto">
                {MTC_OPTIONS.map(mtc => (
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

          {/* 4. Search Button - Updated to Blue 600 */}
          <button
            onClick={handleSearch}
            className="h-[38px] inline-flex justify-center items-center gap-2 px-6 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors font-bold"
          >
            <SearchIcon size={16} /> Search
          </button>
        </div>
      </div>
    </div>
  );
}