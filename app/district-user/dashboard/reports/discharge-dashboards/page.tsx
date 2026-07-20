// // "use client";

// // import React, { useState, useEffect, useRef } from "react";
// // import { 
// //   Calendar, 
// //   Search as SearchIcon, 
// //   ChevronDown, 
// //   FileSpreadsheet, 
// //   FileText, 
// //   Image as ImageIcon 
// // } from "lucide-react";

// // // MTC Data extracted from the HTML
// // const MTC_OPTIONS = [
// //   { id: "26", name: "BUNDU" },
// //   { id: "27", name: "DORANDA" },
// //   { id: "28", name: "MANDAR" },
// //   { id: "29", name: "BERO" },
// //   { id: "107", name: "UP REFERRAL RIMS" },
// // ];

// // export default function ReportDashboard() {
// //   // Form state
// //   const [fromDate, setFromDate] = useState<string>("2026-04-08");
// //   const [toDate, setToDate] = useState<string>("2026-04-08");
  
// //   // Selection state
// //   const [selectedMtcs, setSelectedMtcs] = useState<string[]>(
// //     MTC_OPTIONS.map(mtc => mtc.id) // Default all selected
// //   );

// //   // Dropdown UI & Search state
// //   const [isMtcOpen, setIsMtcOpen] = useState(false);
// //   const [mtcSearch, setMtcSearch] = useState("");
  
// //   // State to control visibility of export buttons
// //   const [hasSearched, setHasSearched] = useState(false);

// //   // Ref for handling outside clicks
// //   const mtcRef = useRef<HTMLDivElement>(null);

// //   // Handle outside clicks to close the dropdown
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (mtcRef.current && !mtcRef.current.contains(event.target as Node)) {
// //         setIsMtcOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Filtered lists based on search input
// //   const filteredMtcs = MTC_OPTIONS.filter((m) =>
// //     m.name.toLowerCase().includes(mtcSearch.toLowerCase())
// //   );

// //   // Toggle individual MTC
// //   const toggleMtc = (id: string) => {
// //     setSelectedMtcs((prev) =>
// //       prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
// //     );
// //   };

// //   // Toggle All MTCs
// //   const toggleAllMtcs = () => {
// //     if (selectedMtcs.length === MTC_OPTIONS.length) {
// //       setSelectedMtcs([]);
// //     } else {
// //       setSelectedMtcs(MTC_OPTIONS.map((m) => m.id));
// //     }
// //   };

// //   // Helper to get button text
// //   const getButtonText = (selectedCount: number, totalCount: number) => {
// //     if (selectedCount === 0) return "None selected";
// //     if (selectedCount === totalCount) return `All selected (${totalCount})`;
// //     return `${selectedCount} selected`;
// //   };

// //   // Handle Search Action
// //   const handleSearch = () => {
// //     const searchPayload = {
// //       fromDate,
// //       toDate,
// //       mtcs: selectedMtcs,
// //     };
// //     console.log("Fetching report with parameters:", searchPayload);
// //     // Show the export buttons after searching
// //     setHasSearched(true);
// //   };

// //   // Mock Export Functions
// //   const handleExportExcel = () => console.log("Downloading Excel...");
// //   const handleExportPdf = () => console.log("Downloading PDF...");
// //   const handleExportImage = () => console.log("Downloading Image...");

// //   return (
// //     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 text-sm">
      
// //       {/* Top Level Row Split: Filters (col-xl-10) and Export Actions (col-xl-2) */}
// //       <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-end">
        
// //         {/* Filters Section */}
// //         <div className="xl:col-span-10">
// //           <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-12 gap-4 items-end">
            
// //             {/* From Date (col-xl-2) */}
// //             <div className="xl:col-span-2">
// //               <label htmlFor="txt_FromDate" className="block font-medium text-gray-700 mb-1">
// //                 From Date
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   id="txt_FromDate"
// //                   type="date"
// //                   value={fromDate}
// //                   onChange={(e) => {
// //                     setFromDate(e.target.value);
// //                     setHasSearched(false); // Hide exports if parameters change
// //                   }}
// //                   className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C]"
// //                 />
// //                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
// //                   <Calendar size={16} />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* To Date (col-xl-2) */}
// //             <div className="xl:col-span-2">
// //               <label htmlFor="txt_ToDate" className="block font-medium text-gray-700 mb-1">
// //                 To Date
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   id="txt_ToDate"
// //                   type="date"
// //                   value={toDate}
// //                   onChange={(e) => {
// //                     setToDate(e.target.value);
// //                     setHasSearched(false);
// //                   }}
// //                   className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C]"
// //                 />
// //                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
// //                   <Calendar size={16} />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* District (col-xl-3) - Hidden based on your HTML */}
// //             <div className="hidden xl:col-span-3" id="div_district">
// //                {/* Reserved for future District dropdown */}
// //             </div>

// //             {/* MTC (col-xl-3) */}
// //             <div className="xl:col-span-3 relative" ref={mtcRef}>
// //               <label className="block font-medium text-gray-700 mb-1">MTC</label>
// //               <button
// //                 type="button"
// //                 onClick={() => setIsMtcOpen(!isMtcOpen)}
// //                 className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] flex items-center justify-between"
// //               >
// //                 <span className="truncate text-gray-700">
// //                   {getButtonText(selectedMtcs.length, MTC_OPTIONS.length)}
// //                 </span>
// //                 <ChevronDown size={16} className="ml-2 flex-shrink-0 text-gray-400" />
// //               </button>

// //               {isMtcOpen && (
// //                 <div className="absolute z-10 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col">
// //                   {/* Search Box */}
// //                   <div className="p-2 border-b border-gray-100 relative">
// //                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
// //                       <SearchIcon size={14} />
// //                     </div>
// //                     <input
// //                       type="search"
// //                       className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
// //                       placeholder="Search"
// //                       value={mtcSearch}
// //                       onChange={(e) => setMtcSearch(e.target.value)}
// //                     />
// //                   </div>

// //                   <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
// //                     {/* Select All Option */}
// //                     {!mtcSearch && (
// //                       <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors font-semibold">
// //                         <input
// //                           type="checkbox"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
// //                           checked={selectedMtcs.length === MTC_OPTIONS.length && MTC_OPTIONS.length > 0}
// //                           onChange={toggleAllMtcs}
// //                           className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
// //                         />
// //                         <span className="text-gray-900 select-none">Select all</span>
// //                       </label>
// //                     )}

// //                     {/* Individual Options */}
// //                     {filteredMtcs.map((mtc) => (
// //                       <label
// //                         key={mtc.id}
// //                         className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
// //                       >
// //                         <input
// //                           type="checkbox"
// //                           checked={selectedMtcs.includes(mtc.id)}
// //                           onChange={() => {
// //                             toggleMtc(mtc.id);
// //                             setHasSearched(false);
// //                           }}
// //                           className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
// //                         />
// //                         <span className="text-gray-700 select-none">{mtc.name}</span>
// //                       </label>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Search Button (col-xl-2) */}
// //             <div className="xl:col-span-2">
// //               <button
// //                 type="button"
// //                 onClick={handleSearch}
// //                 className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
// //               >
// //                 <SearchIcon size={16} />
// //                 Search
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Export Actions Section (col-xl-2) */}
// //         <div className="xl:col-span-2 flex justify-end">
// //           {/* Conditional rendering based on whether a search has been performed */}
// //           {hasSearched && (
// //             <div className="flex items-center gap-2 h-[38px]">
// //               <button
// //                 type="button"
// //                 onClick={handleExportExcel}
// //                 title="Download Excel"
// //                 className="p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
// //               >
// //                 <FileSpreadsheet size={18} />
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={handleExportPdf}
// //                 title="Download PDF"
// //                 className="p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
// //               >
// //                 <FileText size={18} />
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={handleExportImage}
// //                 title="Download Image"
// //                 className="p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
// //               >
// //                 <ImageIcon size={18} />
// //               </button>
// //             </div>
// //           )}
// //         </div>
        
// //       </div>

// //       {/* Report Output Areas */}
// //       <div className="mt-8">
// //         <div className="text-center w-full" id="div_Report">
// //            {/* Data Table 1 would render here */}
// //         </div>
// //         <div className="text-center w-full mt-4" id="div_Report2">
// //            {/* Data Table 2 would render here */}
// //         </div>
// //       </div>

// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { 
//   Calendar, 
//   Search as SearchIcon, 
//   ChevronDown, 
//   FileSpreadsheet, 
//   FileText, 
//   Image as ImageIcon,
//   UserCheck,
//   TrendingUp,
//   AlertCircle
// } from "lucide-react";

// const MTC_OPTIONS = [
//   { id: "26", name: "BUNDU" },
//   { id: "27", name: "DORANDA" },
//   { id: "28", name: "MANDAR" },
//   { id: "29", name: "BERO" },
//   { id: "107", name: "UP REFERRAL RIMS" },
// ];

// export default function DischargeDashboard() {
//   const [fromDate, setFromDate] = useState<string>("2026-05-01");
//   const [toDate, setToDate] = useState<string>("2026-05-15");
//   const [selectedMtcs, setSelectedMtcs] = useState<string[]>(MTC_OPTIONS.map(mtc => mtc.id));
//   const [isMtcOpen, setIsMtcOpen] = useState(false);
//   const [mtcSearch, setMtcSearch] = useState("");
//   const [hasSearched, setHasSearched] = useState(false);

//   const mtcRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (mtcRef.current && !mtcRef.current.contains(event.target as Node)) {
//         setIsMtcOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const filteredMtcs = MTC_OPTIONS.filter((m) =>
//     m.name.toLowerCase().includes(mtcSearch.toLowerCase())
//   );

//   const toggleMtc = (id: string) => {
//     setSelectedMtcs((prev) =>
//       prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
//     );
//   };

//   const toggleAllMtcs = () => {
//     setSelectedMtcs(selectedMtcs.length === MTC_OPTIONS.length ? [] : MTC_OPTIONS.map((m) => m.id));
//   };

//   const handleSearch = () => {
//     setHasSearched(true);
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4 space-y-6 font-sans">
//       {/* Header Area */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//         <div>
//           <h1 className="text-2xl font-bold text-blue-700">Discharge Dashboard</h1>
//           <p className="text-gray-500 text-sm">Monitoring patient outcomes and discharge efficiency</p>
//         </div>
        
//         {hasSearched && (
//           <div className="flex items-center gap-2">
//             <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm" title="Export Excel">
//               <FileSpreadsheet size={20} />
//             </button>
//             <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm" title="Export PDF">
//               <FileText size={20} />
//             </button>
//             <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm" title="Save Image">
//               <ImageIcon size={20} />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Filters Section */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-12 gap-4 items-end">
          
//           <div className="xl:col-span-3">
//             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">From Date</label>
//             <div className="relative">
//               <input
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//                 className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
//               />
//               <Calendar className="absolute right-3 top-2.5 text-gray-400" size={16} />
//             </div>
//           </div>

//           <div className="xl:col-span-3">
//             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">To Date</label>
//             <div className="relative">
//               <input
//                 type="date"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//                 className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
//               />
//               <Calendar className="absolute right-3 top-2.5 text-gray-400" size={16} />
//             </div>
//           </div>

//           <div className="xl:col-span-4 relative" ref={mtcRef}>
//             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select MTCs</label>
//             <button
//               type="button"
//               onClick={() => setIsMtcOpen(!isMtcOpen)}
//               className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:ring-2 focus:ring-blue-500 h-[38px] flex items-center justify-between text-sm"
//             >
//               <span className="truncate">
//                 {selectedMtcs.length === MTC_OPTIONS.length ? `All MTCs (${MTC_OPTIONS.length})` : `${selectedMtcs.length} selected`}
//               </span>
//               <ChevronDown size={16} className="text-gray-400" />
//             </button>

//             {isMtcOpen && (
//               <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-xl flex flex-col p-2">
//                 <input
//                   type="text"
//                   placeholder="Filter MTCs..."
//                   className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded mb-2 outline-none focus:border-blue-500"
//                   value={mtcSearch}
//                   onChange={(e) => setMtcSearch(e.target.value)}
//                 />
//                 <div className="max-h-48 overflow-y-auto">
//                   <label className="flex items-center space-x-2 p-2 hover:bg-blue-50 rounded cursor-pointer font-bold text-blue-700">
//                     <input type="checkbox" checked={selectedMtcs.length === MTC_OPTIONS.length} onChange={toggleAllMtcs} className="accent-blue-600" />
//                     <span>Select All</span>
//                   </label>
//                   {filteredMtcs.map((mtc) => (
//                     <label key={mtc.id} className="flex items-center space-x-2 p-2 hover:bg-blue-50 rounded cursor-pointer">
//                       <input type="checkbox" checked={selectedMtcs.includes(mtc.id)} onChange={() => toggleMtc(mtc.id)} className="accent-blue-600" />
//                       <span className="text-gray-700">{mtc.name}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="xl:col-span-2">
//             <button
//               onClick={handleSearch}
//               className="w-full h-[38px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-all shadow-md"
//             >
//               <SearchIcon size={18} /> Run Report
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Dashboard Content */}
//       {hasSearched ? (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
//           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
//             <div className="p-3 bg-blue-100 rounded-lg text-blue-700"><UserCheck size={28} /></div>
//             <div>
//               <p className="text-xs font-bold text-gray-500 uppercase">Total Cured</p>
//               <p className="text-2xl font-black text-blue-900">1,248</p>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
//             <div className="p-3 bg-blue-100 rounded-lg text-blue-700"><TrendingUp size={28} /></div>
//             <div>
//               <p className="text-xs font-bold text-gray-500 uppercase">Avg Cure Rate</p>
//               <p className="text-2xl font-black text-blue-900">88.4%</p>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 border-l-4 border-l-blue-500">
//             <div className="p-3 bg-blue-100 rounded-lg text-blue-700"><AlertCircle size={28} /></div>
//             <div>
//               <p className="text-xs font-bold text-gray-500 uppercase">Referrals</p>
//               <p className="text-2xl font-black text-blue-900">42</p>
//             </div>
//           </div>
          
//           <div className="md:col-span-3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[300px] flex items-center justify-center text-gray-400 italic">
//             Visual analytics and discharge trend tables would load here...
//           </div>
//         </div>
//       ) : (
//         <div className="py-20 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
//           <p className="text-gray-400">Select your parameters and click "Run Report" to populate the dashboard.</p>
//         </div>
//       )}
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
  UserCheck,
  TrendingUp,
  AlertCircle
} from "lucide-react";

const MTC_OPTIONS = [
  { id: "26", name: "BUNDU" },
  { id: "27", name: "DORANDA" },
  { id: "28", name: "MANDAR" },
  { id: "29", name: "BERO" },
  { id: "107", name: "UP REFERRAL RIMS" },
];

export default function DischargeDashboard() {
  const [fromDate, setFromDate] = useState<string>("2026-05-01");
  const [toDate, setToDate] = useState<string>("2026-05-15");
  const [selectedMtcs, setSelectedMtcs] = useState<string[]>(MTC_OPTIONS.map(mtc => mtc.id));
  const [isMtcOpen, setIsMtcOpen] = useState(false);
  const [mtcSearch, setMtcSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

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

  const handleSearch = () => {
    setHasSearched(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6 font-sans">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Discharge Dashboard</h1>
          <p className="text-gray-500 text-sm">Monitoring patient outcomes and discharge efficiency</p>
        </div>
        
        {hasSearched && (
          <div className="flex items-center gap-2">
            <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm" title="Export Excel">
              <FileSpreadsheet size={20} />
            </button>
            <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm" title="Export PDF">
              <FileText size={20} />
            </button>
            <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm" title="Save Image">
              <ImageIcon size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-12 gap-4 items-end">
          
          <div className="xl:col-span-3">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">From Date</label>
            <div className="relative">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
              <Calendar className="absolute right-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>

          <div className="xl:col-span-3">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">To Date</label>
            <div className="relative">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
              <Calendar className="absolute right-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>

          <div className="xl:col-span-4 relative" ref={mtcRef}>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select MTCs</label>
            <button
              type="button"
              onClick={() => setIsMtcOpen(!isMtcOpen)}
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:ring-2 focus:ring-blue-500 h-[38px] flex items-center justify-between text-sm"
            >
              <span className="truncate">
                {selectedMtcs.length === MTC_OPTIONS.length ? `All MTCs (${MTC_OPTIONS.length})` : `${selectedMtcs.length} selected`}
              </span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {isMtcOpen && (
              <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-xl flex flex-col p-2">
                <input
                  type="text"
                  placeholder="Filter MTCs..."
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded mb-2 outline-none focus:border-blue-500"
                  value={mtcSearch}
                  onChange={(e) => setMtcSearch(e.target.value)}
                />
                <div className="max-h-48 overflow-y-auto">
                  <label className="flex items-center space-x-2 p-2 hover:bg-blue-50 rounded cursor-pointer font-bold text-blue-700">
                    <input type="checkbox" checked={selectedMtcs.length === MTC_OPTIONS.length} onChange={toggleAllMtcs} className="accent-blue-600" />
                    <span>Select All</span>
                  </label>
                  {filteredMtcs.map((mtc) => (
                    <label key={mtc.id} className="flex items-center space-x-2 p-2 hover:bg-blue-50 rounded cursor-pointer">
                      <input type="checkbox" checked={selectedMtcs.includes(mtc.id)} onChange={() => toggleMtc(mtc.id)} className="accent-blue-600" />
                      <span className="text-gray-700">{mtc.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="xl:col-span-2">
            <button
              onClick={handleSearch}
              className="w-full h-[38px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-all shadow-md"
            >
              <SearchIcon size={18} /> Run Report
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      {hasSearched ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-700"><UserCheck size={28} /></div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Total Cured</p>
              <p className="text-2xl font-black text-blue-900">1,248</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-700"><TrendingUp size={28} /></div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Avg Cure Rate</p>
              <p className="text-2xl font-black text-blue-900">88.4%</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 border-l-4 border-l-blue-500">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-700"><AlertCircle size={28} /></div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Referrals</p>
              <p className="text-2xl font-black text-blue-900">42</p>
            </div>
          </div>
          
          <div className="md:col-span-3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[300px] flex items-center justify-center text-gray-400 italic">
            Visual analytics and discharge trend tables would load here...
          </div>
        </div>
      ) : (
        <div className="py-20 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400">Select your parameters and click &quot;Run Report&quot; to populate the dashboard.</p>
        </div>
      )}
    </div>
  );
}