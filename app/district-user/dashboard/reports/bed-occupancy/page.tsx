// // "use client";

// // import React, { useState } from "react";

// // // --- Types & Data ---
// // type RangeType = "daily" | "monthly";

// // const YEARS = Array.from({ length: 26 }, (_, i) => (2001 + i).toString());

// // const MONTHS = [
// //   { value: "1", label: "January" }, { value: "2", label: "February" },
// //   { value: "3", label: "March" }, { value: "4", label: "April" },
// //   { value: "5", label: "May" }, { value: "6", label: "June" },
// //   { value: "7", label: "July" }, { value: "8", label: "August" },
// //   { value: "9", label: "September" }, { value: "10", label: "October" },
// //   { value: "11", label: "November" }, { value: "12", label: "December" },
// // ];

// // const DISTRICTS = [
// //   { id: "1", name: "BOKARO" }, { id: "2", name: "CHATRA" },
// //   { id: "16", name: "DEOGHAR" }, { id: "4", name: "DHANBAD" },
// //   { id: "17", name: "DUMKA" }, { id: "22", name: "EAST SINGHBHUM" },
// //   { id: "14", name: "GARHWA" }, { id: "3", name: "GIRIDIH" },
// //   { id: "18", name: "GODDA" }, { id: "9", name: "GUMLA" },
// //   { id: "6", name: "HAZARIBAGH" }, { id: "19", name: "JAMTARA" },
// //   { id: "10", name: "KHUNTI" }, { id: "7", name: "KODERMA" },
// //   { id: "15", name: "LATEHAR" }, { id: "11", name: "LOHARDAGA" },
// //   { id: "20", name: "PAKUR" }, { id: "13", name: "PALAMU" },
// //   { id: "5", name: "RAMGARH" }, { id: "8", name: "RANCHI" },
// //   { id: "21", name: "SAHIBGANJ" }, { id: "23", name: "SERAIKELA" },
// //   { id: "12", name: "SIMDEGA" }, { id: "24", name: "WEST SINGHBHUM" },
// // ];

// // const MTCS = [
// //   { id: "26", name: "BUNDU" }, { id: "27", name: "DORANDA" },
// //   { id: "28", name: "MANDAR" }, { id: "29", name: "BERO" },
// //   { id: "107", name: "UP REFERRAL RIMS" },
// // ];

// // export default function ReportForm() {
// //   // --- State Management ---
// //   const [range, setRange] = useState<RangeType>("monthly");
// //   const [fromDate, setFromDate] = useState<string>("2026-04-07"); 
// //   const [year, setYear] = useState<string>("2026");
// //   const [month, setMonth] = useState<string>("");
  
// //   // Using sets or arrays for multiselects
// //   const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
// //   const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);
// //   const [isSearching, setIsSearching] = useState(false);

// //   // --- Handlers ---
// //   const handleSearch = () => {
// //     setIsSearching(true);
    
// //     // Simulate API call or report generation
// //     const payload = {
// //       range,
// //       date: range === "daily" ? fromDate : null,
// //       year: range === "monthly" ? year : null,
// //       month: range === "monthly" ? month : null,
// //       districts: selectedDistricts,
// //       mtcs: selectedMtcs,
// //     };
    
// //     console.log("Fetching report with payload:", payload);
    
// //     setTimeout(() => setIsSearching(false), 1000);
// //   };

// //   const handleMultiSelect = (
// //     e: React.ChangeEvent<HTMLSelectElement>,
// //     setter: React.Dispatch<React.SetStateAction<string[]>>
// //   ) => {
// //     const values = Array.from(e.target.selectedOptions, (option) => option.value);
// //     setter(values);
// //   };

// //   return (
// //     <div className="w-full max-w-7xl mx-auto p-4">
// //       <div className="bg-white shadow-sm border border-gray-200" style={{ borderRadius: "0.8rem" }}>
// //         <div className="p-6">
          
// //           {/* Radio Group */}
// //           <div className="flex items-center space-x-6 mb-6">
// //             <label className="flex items-center space-x-2 cursor-pointer">
// //               <input
// //                 type="radio"
// //                 name="range"
// //                 value="daily"
// //                 checked={range === "daily"}
// //                 onChange={() => setRange("daily")}
// //                 className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
// //               />
// //               <span className="text-sm font-medium text-gray-700">Daily</span>
// //             </label>
// //             <label className="flex items-center space-x-2 cursor-pointer">
// //               <input
// //                 type="radio"
// //                 name="range"
// //                 value="monthly"
// //                 checked={range === "monthly"}
// //                 onChange={() => setRange("monthly")}
// //                 className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
// //               />
// //               <span className="text-sm font-medium text-gray-700">Monthly</span>
// //             </label>
// //           </div>

// //           {/* Form Controls Grid */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            
// //             {/* Daily: Date Picker */}
// //             {range === "daily" && (
// //               <div className="lg:col-span-1">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Date
// //                 </label>
// //                 <div className="relative">
// //                   <input
// //                     type="date"
// //                     value={fromDate}
// //                     onChange={(e) => setFromDate(e.target.value)}
// //                     className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// //                   />
// //                 </div>
// //               </div>
// //             )}

// //             {/* Monthly: Year Dropdown */}
// //             {range === "monthly" && (
// //               <div className="lg:col-span-1">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Year
// //                 </label>
// //                 <select
// //                   value={year}
// //                   onChange={(e) => setYear(e.target.value)}
// //                   className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
// //                 >
// //                   <option value="">Select Year</option>
// //                   {YEARS.map((y) => (
// //                     <option key={y} value={y}>{y}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             )}

// //             {/* Monthly: Month Dropdown */}
// //             {range === "monthly" && (
// //               <div className="lg:col-span-1">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Month
// //                 </label>
// //                 <select
// //                   value={month}
// //                   onChange={(e) => setMonth(e.target.value)}
// //                   className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
// //                 >
// //                   <option value="">All Months</option>
// //                   {MONTHS.map((m) => (
// //                     <option key={m.value} value={m.value}>{m.label}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             )}

// //             {/* District Multiselect */}
// //             <div className="lg:col-span-1">
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 District
// //               </label>
// //               {/* Note: Native multiple select used here. For a production UI matching the original Bootstrap-multiselect, consider wrapping a library like 'react-select' */}
// //               <select
// //                 multiple
// //                 value={selectedDistricts}
// //                 onChange={(e) => handleMultiSelect(e, setSelectedDistricts)}
// //                 className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white h-10 overflow-y-auto"
// //                 size={1}
// //                 title="Hold Ctrl/Cmd to select multiple"
// //               >
// //                 {DISTRICTS.map((d) => (
// //                   <option key={d.id} value={d.id}>{d.name}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* MTC Multiselect */}
// //             <div className="lg:col-span-1">
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 MTC
// //               </label>
// //               <select
// //                 multiple
// //                 value={selectedMtcs}
// //                 onChange={(e) => handleMultiSelect(e, setSelectedMtcs)}
// //                 className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white h-10 overflow-y-auto"
// //                 size={1}
// //               >
// //                 {MTCS.map((m) => (
// //                   <option key={m.id} value={m.id}>{m.name}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Search Button */}
// //             <div className="lg:col-span-1 pb-px">
// //               <button
// //                 type="button"
// //                 onClick={handleSearch}
// //                 disabled={isSearching}
// //                 className="w-full inline-flex justify-center items-center px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50"
// //               >
// //                 <svg
// //                   className="mr-2 -ml-1 h-4 w-4"
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   fill="none"
// //                   viewBox="0 0 24 24"
// //                   stroke="currentColor"
// //                 >
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //                 </svg>
// //                 {isSearching ? "Searching..." : "Search"}
// //               </button>
// //             </div>

// //           </div>

// //           {/* Report Results Container */}
// //           <div className="mt-8 border-t border-gray-100 pt-6">
// //             <div className="text-center w-full min-h-[100px] flex items-center justify-center text-gray-500 text-sm">
// //               <div id="div_Report">
// //                 {/* Generated report tables/charts will mount here */}
// //                 Select parameters and click search to view the report.
// //               </div>
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState } from "react";

// // --- Types & Data ---
// type RangeType = "daily" | "monthly" | "quarterly"; // Added quarterly

// const YEARS = Array.from({ length: 26 }, (_, i) => (2001 + i).toString());

// const MONTHS = [
//   { value: "1", label: "January" }, { value: "2", label: "February" },
//   { value: "3", label: "March" }, { value: "4", label: "April" },
//   { value: "5", label: "May" }, { value: "6", label: "June" },
//   { value: "7", label: "July" }, { value: "8", label: "August" },
//   { value: "9", label: "September" }, { value: "10", label: "October" },
//   { value: "11", label: "November" }, { value: "12", label: "December" },
// ];

// // Added Quarters
// const QUARTERS = [
//   { value: "Q1", label: "Q1 (Jan-Mar)" },
//   { value: "Q2", label: "Q2 (Apr-Jun)" },
//   { value: "Q3", label: "Q3 (Jul-Sep)" },
//   { value: "Q4", label: "Q4 (Oct-Dec)" },
// ];

// const DISTRICTS = [
//   { id: "1", name: "BOKARO" }, { id: "2", name: "CHATRA" },
//   { id: "16", name: "DEOGHAR" }, { id: "4", name: "DHANBAD" },
//   { id: "17", name: "DUMKA" }, { id: "22", name: "EAST SINGHBHUM" },
//   { id: "14", name: "GARHWA" }, { id: "3", name: "GIRIDIH" },
//   { id: "18", name: "GODDA" }, { id: "9", name: "GUMLA" },
//   { id: "6", name: "HAZARIBAGH" }, { id: "19", name: "JAMTARA" },
//   { id: "10", name: "KHUNTI" }, { id: "7", name: "KODERMA" },
//   { id: "15", name: "LATEHAR" }, { id: "11", name: "LOHARDAGA" },
//   { id: "20", name: "PAKUR" }, { id: "13", name: "PALAMU" },
//   { id: "5", name: "RAMGARH" }, { id: "8", name: "RANCHI" },
//   { id: "21", name: "SAHIBGANJ" }, { id: "23", name: "SERAIKELA" },
//   { id: "12", name: "SIMDEGA" }, { id: "24", name: "WEST SINGHBHUM" },
// ];

// const MTCS = [
//   { id: "26", name: "BUNDU" }, { id: "27", name: "DORANDA" },
//   { id: "28", name: "MANDAR" }, { id: "29", name: "BERO" },
//   { id: "107", name: "UP REFERRAL RIMS" },
// ];

// export default function ReportForm() {
//   // --- State Management ---
//   const [range, setRange] = useState<RangeType>("monthly");
//   const [fromDate, setFromDate] = useState<string>("2026-04-07"); 
//   const [year, setYear] = useState<string>("2026");
//   const [month, setMonth] = useState<string>("");
//   const [quarter, setQuarter] = useState<string>(""); // New state
  
//   const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
//   const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);
//   const [isSearching, setIsSearching] = useState(false);

//   // --- Handlers ---
//   const handleSearch = () => {
//     setIsSearching(true);
    
//     const payload = {
//       range,
//       date: range === "daily" ? fromDate : null,
//       year: (range === "monthly" || range === "quarterly") ? year : null,
//       month: range === "monthly" ? month : null,
//       quarter: range === "quarterly" ? quarter : null, // Added to payload
//       districts: selectedDistricts,
//       mtcs: selectedMtcs,
//     };
    
//     console.log("Fetching report with payload:", payload);
//     setTimeout(() => setIsSearching(false), 1000);
//   };

//   const handleMultiSelect = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//     setter: React.Dispatch<React.SetStateAction<string[]>>
//   ) => {
//     const values = Array.from(e.target.selectedOptions, (option) => option.value);
//     setter(values);
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4">
//       <div className="bg-white shadow-sm border border-gray-200" style={{ borderRadius: "0.8rem" }}>
//         <div className="p-6">
          
//           {/* Radio Group */}
//           <div className="flex items-center space-x-6 mb-6">
//             {["daily", "monthly", "quarterly"].map((r) => (
//               <label key={r} className="flex items-center space-x-2 cursor-pointer capitalize">
//                 <input
//                   type="radio"
//                   name="range"
//                   value={r}
//                   checked={range === r}
//                   onChange={() => setRange(r as RangeType)}
//                   className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                 />
//                 <span className="text-sm font-medium text-gray-700">{r}</span>
//               </label>
//             ))}
//           </div>

//           {/* Form Controls Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            
//             {/* Daily: Date Picker */}
//             {range === "daily" && (
//               <div className="lg:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//                 <input
//                   type="date"
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 />
//               </div>
//             )}

//             {/* Monthly/Quarterly: Year Dropdown */}
//             {(range === "monthly" || range === "quarterly") && (
//               <div className="lg:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
//                 <select
//                   value={year}
//                   onChange={(e) => setYear(e.target.value)}
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
//                 >
//                   <option value="">Select Year</option>
//                   {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
//                 </select>
//               </div>
//             )}

//             {/* Monthly: Month Dropdown */}
//             {range === "monthly" && (
//               <div className="lg:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
//                 <select
//                   value={month}
//                   onChange={(e) => setMonth(e.target.value)}
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
//                 >
//                   <option value="">All Months</option>
//                   {MONTHS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
//                 </select>
//               </div>
//             )}

//             {/* Quarterly: Quarter Dropdown */}
//             {range === "quarterly" && (
//               <div className="lg:col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Quarter</label>
//                 <select
//                   value={quarter}
//                   onChange={(e) => setQuarter(e.target.value)}
//                   className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
//                 >
//                   <option value="">Select Quarter</option>
//                   {QUARTERS.map((q) => <option key={q.value} value={q.value}>{q.label}</option>)}
//                 </select>
//               </div>
//             )}

//             {/* District Multiselect */}
//             <div className="lg:col-span-1">
//               <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
//               <select
//                 multiple
//                 value={selectedDistricts}
//                 onChange={(e) => handleMultiSelect(e, setSelectedDistricts)}
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white h-10"
//               >
//                 {DISTRICTS.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
//               </select>
//             </div>

//             {/* MTC Multiselect */}
//             <div className="lg:col-span-1">
//               <label className="block text-sm font-medium text-gray-700 mb-1">MTC</label>
//               <select
//                 multiple
//                 value={selectedMtcs}
//                 onChange={(e) => handleMultiSelect(e, setSelectedMtcs)}
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white h-10"
//               >
//                 {MTCS.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
//               </select>
//             </div>

//             {/* Search Button */}
//             <div className="lg:col-span-1 pb-px">
//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 disabled={isSearching}
//                 className="w-full inline-flex justify-center items-center px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 transition-colors disabled:opacity-50"
//               >
//                 {isSearching ? "Searching..." : "Search"}
//               </button>
//             </div>
//           </div>

//           <div className="mt-8 border-t border-gray-100 pt-6">
//             <div className="text-center w-full min-h-[100px] flex items-center justify-center text-gray-500 text-sm">
//               Select parameters and click search to view the report.
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Search, Bed, Users, Percent, Download } from "lucide-react";

// --- Types & Constants ---
type RangeType = "daily" | "monthly" | "quarterly";

const YEARS = Array.from({ length: 7 }, (_, i) => (2020 + i).toString());

const MONTHS = [
  { value: "1", label: "January" }, { value: "2", label: "February" },
  { value: "3", label: "March" }, { value: "4", label: "April" },
  { value: "5", label: "May" }, { value: "6", label: "June" },
  { value: "7", label: "July" }, { value: "8", label: "August" },
  { value: "9", label: "September" }, { value: "10", label: "October" },
  { value: "11", label: "November" }, { value: "12", label: "December" },
];

const QUARTERS = [
  { value: "Q1", label: "Q1 (Jan-Mar)" }, { value: "Q2", label: "Q2 (Apr-Jun)" },
  { value: "Q3", label: "Q3 (Jul-Sep)" }, { value: "Q4", label: "Q4 (Oct-Dec)" },
];

// --- Bed Occupancy Component ---
export default function BedOccupancyReport() {
  const [range, setRange] = useState<RangeType>("monthly");
  const [fromDate, setFromDate] = useState<string>("2026-05-15");
  const [year, setYear] = useState<string>("2026");
  const [month, setMonth] = useState<string>("5");
  const [quarter, setQuarter] = useState<string>("Q2");
  
  const [showReport, setShowReport] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSearching(false);
      setShowReport(true);
    }, 800);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-blue-700 text-xl font-bold flex items-center gap-2">
            <Bed size={24} /> Bed Occupancy Report
          </h2>
        </div>

        <div className="p-6">
          {/* Range Selectors */}
          <div className="flex items-center space-x-6 mb-6">
            {["daily", "monthly", "quarterly"].map((r) => (
              <label key={r} className="flex items-center space-x-2 cursor-pointer capitalize">
                <input
                  type="radio"
                  name="range"
                  value={r}
                  checked={range === r}
                  onChange={() => { setRange(r as RangeType); setShowReport(false); }}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 accent-blue-600"
                />
                <span className={`text-sm font-medium ${range === r ? 'text-blue-700' : 'text-gray-600'}`}>{r}</span>
              </label>
            ))}
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end border-b border-gray-100 pb-8">
            {range === "daily" && (
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Select Date</label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
            )}

            {(range === "monthly" || range === "quarterly") && (
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Year</label>
                <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-blue-500 bg-white">
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            )}

            {range === "monthly" && (
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Month</label>
                <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-blue-500 bg-white">
                  {MONTHS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </div>
            )}

            {range === "quarterly" && (
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Quarter</label>
                <select value={quarter} onChange={(e) => setQuarter(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-blue-500 bg-white">
                  {QUARTERS.map(q => <option key={q.value} value={q.value}>{q.label}</option>)}
                </select>
              </div>
            )}

            <div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-sm font-bold rounded-md text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
              >
                <Search size={16} /> {isSearching ? "Processing..." : "Generate Report"}
              </button>
            </div>
          </div>

          {/* Report Results */}
          {showReport && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-full text-white"><Bed size={24} /></div>
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Total Bed Capacity</p>
                    <p className="text-2xl font-bold text-blue-900">120</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-full text-white"><Users size={24} /></div>
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Total Patient Days</p>
                    <p className="text-2xl font-bold text-blue-900">2,840</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-full text-white"><Percent size={24} /></div>
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Avg. Occupancy Rate</p>
                    <p className="text-2xl font-bold text-blue-900">78.4%</p>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                    <tr>
                      <th className="px-4 py-3 font-semibold">MTC Name</th>
                      <th className="px-4 py-3 font-semibold text-center">Sanctioned Beds</th>
                      <th className="px-4 py-3 font-semibold text-center">Available Bed Days</th>
                      <th className="px-4 py-3 font-semibold text-center">Occupied Bed Days</th>
                      <th className="px-4 py-3 font-semibold text-right">Occupancy %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { name: "BUNDU", beds: 20, available: 600, occupied: 450, rate: "75.0%" },
                      { name: "DORANDA", beds: 30, available: 900, occupied: 820, rate: "91.1%" },
                      { name: "MANDAR", beds: 15, available: 450, occupied: 310, rate: "68.8%" },
                      { name: "UP REFERRAL RIMS", beds: 50, available: 1500, occupied: 1260, rate: "84.0%" },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900">{row.name}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{row.beds}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{row.available}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{row.occupied}</td>
                        <td className="px-4 py-3 text-right font-bold text-blue-700">{row.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-md text-sm font-bold hover:bg-blue-800 transition-colors">
                  <Download size={16} /> Export to Excel
                </button>
              </div>
            </div>
          )}

          {!showReport && !isSearching && (
            <div className="mt-12 text-center text-gray-400">
              <Bed size={48} className="mx-auto mb-4 opacity-20" />
              <p>Configure filters and generate the report to see occupancy data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}