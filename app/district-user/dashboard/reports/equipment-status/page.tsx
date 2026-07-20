// // "use client";

// // import React, { useState, useEffect, useRef } from "react";
// // import { Search as SearchIcon, ChevronDown } from "lucide-react";

// // // MTC Data
// // const MTC_OPTIONS = [
// //   { id: "26", name: "BUNDU" },
// //   { id: "27", name: "DORANDA" },
// //   { id: "28", name: "MANDAR" },
// //   { id: "29", name: "BERO" },
// //   { id: "107", name: "UP REFERRAL RIMS" },
// // ];

// // // Equipment Data
// // const EQUIPMENT_OPTIONS = [
// //   { id: "1", name: "Digital Weighing Scale" }, { id: "2", name: "Stadiometer" }, { id: "3", name: "Infantometer" },
// //   { id: "4", name: "MUAC Tape" }, { id: "5", name: "Weing scales (to weigh to 5 gms.)" }, { id: "6", name: "Clock" },
// //   { id: "7", name: "Calculator" }, { id: "8", name: "SAM Chart" }, { id: "9", name: "SAM Register" },
// //   { id: "10", name: "Camera" }, { id: "11", name: "File" }, { id: "12", name: "Almira Rake" },
// //   { id: "13", name: "Almira" }, { id: "14", name: "Protocol Poster" }, { id: "15", name: "Marker" },
// //   { id: "16", name: "White Board" }, { id: "17", name: "Display Board" }, { id: "18", name: "Tab" },
// //   { id: "19", name: "Thermometers" }, { id: "20", name: "Resuscitation equipment" }, { id: "21", name: "NG Tube 6/8 No" },
// //   { id: "22", name: "Suction equipment (low pressure)" }, { id: "23", name: "Blood Transfusion Kit" }, { id: "24", name: "Hb Meter" },
// //   { id: "25", name: "Glucometer" }, { id: "26", name: "Bed" }, { id: "27", name: "Side Table" },
// //   { id: "28", name: "IV Stand" }, { id: "29", name: "Room Heater" }, { id: "30", name: "Cooler / AC" },
// //   { id: "31", name: "Fan (inward/ weighing area/playing area)" }, { id: "32", name: "Tabale/Chair" }, { id: "33", name: "Dustbin" },
// //   { id: "34", name: "Shoe Rack" }, { id: "35", name: "TV-  Ward and Play Area" }, { id: "36", name: "Inverter" },
// //   { id: "37", name: "Toys for structural play" }, { id: "38", name: "Washing Machine Automatic" }, { id: "39", name: "Geyser" },
// //   { id: "40", name: "Computer With Colour printer For reporting" }, { id: "41", name: "Bed Seat -for Ward" }, { id: "42", name: "Medicine Tray" },
// //   { id: "43", name: "Prada Window and Door" }, { id: "44", name: "Tube light" }, { id: "45", name: "Bulb" },
// //   { id: "46", name: "Cooking Gas" }, { id: "47", name: "Dietary Scale (Upto 1 gm Sensitive)" }, { id: "48", name: "Measuring Jar" },
// //   { id: "49", name: "Electric Mixer Blende" }, { id: "50", name: "Water Filter/RO" }, { id: "51", name: "Refrigerator" },
// //   { id: "52", name: "Utensil for Kitchen" }, { id: "53", name: "Massacring  Cup, Glass, Spoon" }, { id: "54", name: "Presser cooker" },
// //   { id: "55", name: "Steel Cacontner" }, { id: "56", name: "Tab" }, { id: "57", name: "Balti Steel - with Mug" },
// //   { id: "58", name: "Steel Plat Katori, Glass, Spoon" }, { id: "59", name: "Store Rack" }, { id: "60", name: "Nutrition Couselling Flip Books" }
// // ];

// // // Generate years from 2001 to 2026
// // const YEARS = Array.from({ length: 26 }, (_, i) => (2001 + i).toString());

// // export default function EquipmentFilter() {
// //   // Simple form state
// //   const [quarter, setQuarter] = useState<string>("");
// //   const [year, setYear] = useState<string>("");
// //   const [equipment, setEquipment] = useState<string>("");
  
// //   // MTC Multiselect state
// //   const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);
// //   const [isMtcOpen, setIsMtcOpen] = useState(false);
// //   const [mtcSearch, setMtcSearch] = useState("");

// //   // Ref for handling outside clicks
// //   const mtcRef = useRef<HTMLDivElement>(null);

// //   // Close dropdown on outside click
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (mtcRef.current && !mtcRef.current.contains(event.target as Node)) {
// //         setIsMtcOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Filtered MTC list based on search
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

// //   // Handle Search
// //   const handleSearch = () => {
// //     const searchPayload = {
// //       quarter,
// //       year,
// //       equipment,
// //       mtcs: selectedMtcs,
// //     };
// //     console.log("Fetching report with:", searchPayload);
// //   };

// //   return (
// //     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 text-sm">
      
// //       {/* Row 1: Quarter, Year, (Hidden District), MTC */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-6">
        
// //         {/* Quarter Dropdown */}
// //         <div>
// //           <label htmlFor="dd_Quarter" className="block font-medium text-gray-700 mb-1">
// //             Quarter
// //           </label>
// //           <select
// //             id="dd_Quarter"
// //             value={quarter}
// //             onChange={(e) => setQuarter(e.target.value)}
// //             className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] h-[38px]"
// //           >
// //             <option value="">select</option>
// //             <option value="1">Quarter (Jan-March)</option>
// //             <option value="2">Quarter (April-June)</option>
// //             <option value="3">Quarter (July-Sept)</option>
// //             <option value="4">Quarter (Oct-Dec)</option>
// //           </select>
// //         </div>

// //         {/* Year Dropdown */}
// //         <div>
// //           <label htmlFor="dd_Year" className="block font-medium text-gray-700 mb-1">
// //             Year
// //           </label>
// //           <select
// //             id="dd_Year"
// //             value={year}
// //             onChange={(e) => setYear(e.target.value)}
// //             className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] h-[38px]"
// //           >
// //             <option value="">Select Year</option>
// //             {YEARS.map((yr) => (
// //               <option key={yr} value={yr}>
// //                 {yr}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Hidden District Div */}
// //         <div className="hidden" id="div_district">
// //             {/* Kept hidden to match original HTML logic */}
// //         </div>

// //         {/* MTC Custom Checkbox Dropdown */}
// //         <div className="relative" ref={mtcRef}>
// //           <label className="block font-medium text-gray-700 mb-1">MTC</label>
// //           <button
// //             type="button"
// //             onClick={() => setIsMtcOpen(!isMtcOpen)}
// //             className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] flex items-center justify-between"
// //           >
// //             <span className="truncate text-gray-700">
// //               {getButtonText(selectedMtcs.length, MTC_OPTIONS.length)}
// //             </span>
// //             <ChevronDown size={16} className="ml-2 flex-shrink-0 text-gray-400" />
// //           </button>

// //           {isMtcOpen && (
// //             <div className="absolute z-10 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col">
// //               {/* Search Box */}
// //               <div className="p-2 border-b border-gray-100 relative">
// //                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
// //                   <SearchIcon size={14} />
// //                 </div>
// //                 <input
// //                   type="search"
// //                   className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
// //                   placeholder="Search"
// //                   value={mtcSearch}
// //                   onChange={(e) => setMtcSearch(e.target.value)}
// //                 />
// //               </div>

// //               <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
// //                 {/* Select All Option */}
// //                 {!mtcSearch && (
// //                   <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors font-semibold">
// //                     <input
// //                       type="checkbox"
// //                       checked={selectedMtcs.length === MTC_OPTIONS.length && MTC_OPTIONS.length > 0}
// //                       onChange={toggleAllMtcs}
// //                       className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
// //                     />
// //                     <span className="text-gray-900 select-none">Select all</span>
// //                   </label>
// //                 )}

// //                 {/* Individual Options */}
// //                 {filteredMtcs.map((mtc) => (
// //                   <label
// //                     key={mtc.id}
// //                     className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       checked={selectedMtcs.includes(mtc.id)}
// //                       onChange={() => toggleMtc(mtc.id)}
// //                       className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
// //                     />
// //                     <span className="text-gray-700 select-none">{mtc.name}</span>
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Row 2: Equipment and Search Button */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        
// //         {/* Equipment Dropdown */}
// //         <div>
// //           <label htmlFor="dd_Equipment" className="block font-medium text-gray-700 mb-1">
// //             Equipment:
// //           </label>
// //           <select
// //             id="dd_Equipment"
// //             value={equipment}
// //             onChange={(e) => setEquipment(e.target.value)}
// //             className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] h-[38px] truncate"
// //           >
// //             <option value="">Select</option>
// //             {EQUIPMENT_OPTIONS.map((item) => (
// //               <option key={item.id} value={item.id}>
// //                 {item.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Search Button */}
// //         <div>
// //           <button
// //             type="button"
// //             onClick={handleSearch}
// //             className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
// //           >
// //             <SearchIcon size={16} />
// //             Search
// //           </button>
// //         </div>

// //       </div>

// //       {/* Output Area */}
// //       <div className="mt-8 text-center" id="div_Report">
// //         {/* Report tables will render here */}
// //       </div>

// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Search as SearchIcon, ChevronDown, Package, CheckCircle, AlertTriangle, Download } from "lucide-react";

// // --- Data Constants ---
// const MTC_OPTIONS = [
//   { id: "26", name: "BUNDU" },
//   { id: "27", name: "DORANDA" },
//   { id: "28", name: "MANDAR" },
//   { id: "29", name: "BERO" },
//   { id: "107", name: "UP REFERRAL RIMS" },
// ];

// const EQUIPMENT_OPTIONS = [
//   { id: "1", name: "Digital Weighing Scale" }, { id: "2", name: "Stadiometer" }, 
//   { id: "3", name: "Infantometer" }, { id: "4", name: "MUAC Tape" }, 
//   { id: "24", name: "Hb Meter" }, { id: "25", name: "Glucometer" }, 
//   { id: "50", name: "Water Filter/RO" }, { id: "51", name: "Refrigerator" }
// ];

// const YEARS = Array.from({ length: 7 }, (_, i) => (2020 + i).toString());

// export default function EquipmentStatusReport() {
//   // --- State ---
//   const [quarter, setQuarter] = useState<string>("2");
//   const [year, setYear] = useState<string>("2026");
//   const [equipment, setEquipment] = useState<string>("1");
//   const [selectedMtcs, setSelectedMtcs] = useState<string[]>(MTC_OPTIONS.map(m => m.id));
//   const [isMtcOpen, setIsMtcOpen] = useState(false);
//   const [mtcSearch, setMtcSearch] = useState("");
//   const [showReport, setShowReport] = useState(false);
//   const [isSearching, setIsSearching] = useState(false);

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

//   const handleSearch = () => {
//     setIsSearching(true);
//     setTimeout(() => {
//       setIsSearching(false);
//       setShowReport(true);
//     }, 700);
//   };

//   const toggleMtc = (id: string) => {
//     setSelectedMtcs(prev => prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]);
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
//         {/* Header - Blue 700 */}
//         <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
//           <h2 className="text-blue-700 text-xl font-bold flex items-center gap-2">
//             <Package size={24} /> Equipment Status Report
//           </h2>
//         </div>

//         <div className="p-6">
//           {/* Filter Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end mb-8 pb-8 border-b border-gray-100">
            
//             <div>
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Quarter</label>
//               <select
//                 value={quarter}
//                 onChange={(e) => setQuarter(e.target.value)}
//                 className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
//               >
//                 <option value="1">Q1 (Jan-Mar)</option>
//                 <option value="2">Q2 (Apr-Jun)</option>
//                 <option value="3">Q3 (Jul-Sep)</option>
//                 <option value="4">Q4 (Oct-Dec)</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Year</label>
//               <select
//                 value={year}
//                 onChange={(e) => setYear(e.target.value)}
//                 className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
//               >
//                 {YEARS.map(yr => <option key={yr} value={yr}>{yr}</option>)}
//               </select>
//             </div>

//             <div className="relative" ref={mtcRef}>
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">MTCs</label>
//               <button
//                 type="button"
//                 onClick={() => setIsMtcOpen(!isMtcOpen)}
//                 className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:ring-1 focus:ring-blue-500 h-[38px] flex items-center justify-between text-sm"
//               >
//                 <span className="truncate">{selectedMtcs.length === MTC_OPTIONS.length ? "All MTCs" : `${selectedMtcs.length} Selected`}</span>
//                 <ChevronDown size={16} className="text-gray-400" />
//               </button>
//               {isMtcOpen && (
//                 <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-2 max-h-60 overflow-y-auto">
//                   {MTC_OPTIONS.map(m => (
//                     <label key={m.id} className="flex items-center space-x-2 p-2 hover:bg-blue-50 rounded cursor-pointer">
//                       <input type="checkbox" checked={selectedMtcs.includes(m.id)} onChange={() => toggleMtc(m.id)} className="accent-blue-600" />
//                       <span className="text-sm">{m.name}</span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div>
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Equipment</label>
//               <select
//                 value={equipment}
//                 onChange={(e) => setEquipment(e.target.value)}
//                 className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
//               >
//                 <option value="">All Equipment</option>
//                 {EQUIPMENT_OPTIONS.map(eq => <option key={eq.id} value={eq.id}>{eq.name}</option>)}
//               </select>
//             </div>

//             <button
//               onClick={handleSearch}
//               disabled={isSearching}
//               className="w-full h-[38px] flex items-center justify-center gap-2 border border-blue-600 text-blue-600 font-bold rounded-md hover:bg-blue-600 hover:text-white transition-all text-sm disabled:opacity-50"
//             >
//               <SearchIcon size={16} /> {isSearching ? "Searching..." : "Search"}
//             </button>
//           </div>

//           {/* Results Section */}
//           {showReport ? (
//             <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center gap-4">
//                   <div className="bg-blue-600 p-3 rounded-full text-white"><CheckCircle size={20} /></div>
//                   <div>
//                     <p className="text-xs font-bold text-blue-800 uppercase">Functional</p>
//                     <p className="text-2xl font-black text-blue-900">42 Units</p>
//                   </div>
//                 </div>
//                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center gap-4 border-l-4 border-l-amber-500">
//                   <div className="bg-amber-500 p-3 rounded-full text-white"><AlertTriangle size={20} /></div>
//                   <div>
//                     <p className="text-xs font-bold text-blue-800 uppercase">Non-Functional</p>
//                     <p className="text-2xl font-black text-blue-900">3 Units</p>
//                   </div>
//                 </div>
//                 <div className="flex items-end justify-end">
//                   <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-md text-sm font-bold hover:bg-blue-800 transition-colors shadow-md">
//                     <Download size={16} /> Export Status List
//                   </button>
//                 </div>
//               </div>

//               <div className="border border-gray-200 rounded-lg overflow-hidden">
//                 <table className="w-full text-left text-sm">
//                   <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
//                     <tr>
//                       <th className="px-4 py-3">MTC Name</th>
//                       <th className="px-4 py-3">Equipment Name</th>
//                       <th className="px-4 py-3 text-center">Sanctioned</th>
//                       <th className="px-4 py-3 text-center">Available</th>
//                       <th className="px-4 py-3 text-right">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100">
//                     {[
//                       { mtc: "BUNDU", name: "Digital Weighing Scale", sanc: 2, avail: 2, status: "Functional" },
//                       { mtc: "DORANDA", name: "Digital Weighing Scale", sanc: 3, avail: 2, status: "Non-Functional" },
//                       { mtc: "UP REFERRAL RIMS", name: "Digital Weighing Scale", sanc: 5, avail: 5, status: "Functional" },
//                       { mtc: "MANDAR", name: "Digital Weighing Scale", sanc: 1, avail: 1, status: "Functional" },
//                     ].map((row, i) => (
//                       <tr key={i} className="hover:bg-blue-50/30">
//                         <td className="px-4 py-3 font-semibold text-gray-800">{row.mtc}</td>
//                         <td className="px-4 py-3 text-gray-600">{row.name}</td>
//                         <td className="px-4 py-3 text-center text-gray-500">{row.sanc}</td>
//                         <td className="px-4 py-3 text-center text-gray-500">{row.avail}</td>
//                         <td className="px-4 py-3 text-right">
//                           <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
//                             row.status === "Functional" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
//                           }`}>
//                             {row.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ) : (
//             <div className="py-20 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
//               <p>Configure filters to generate the equipment status report.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, ChevronDown, Package, CheckCircle, AlertTriangle, Download } from "lucide-react";

// --- Data Constants ---
const MTC_OPTIONS = [
  { id: "26", name: "BUNDU" },
  { id: "27", name: "DORANDA" },
  { id: "28", name: "MANDAR" },
  { id: "29", name: "BERO" },
  { id: "107", name: "UP REFERRAL RIMS" },
];

const EQUIPMENT_OPTIONS = [
  { id: "1", name: "Digital Weighing Scale" }, { id: "2", name: "Stadiometer" }, 
  { id: "3", name: "Infantometer" }, { id: "4", name: "MUAC Tape" }, 
  { id: "24", name: "Hb Meter" }, { id: "25", name: "Glucometer" }, 
  { id: "50", name: "Water Filter/RO" }, { id: "51", name: "Refrigerator" }
];

const YEARS = Array.from({ length: 7 }, (_, i) => (2020 + i).toString());

export default function EquipmentStatusReport() {
  // --- State ---
  const [quarter, setQuarter] = useState<string>("2");
  const [year, setYear] = useState<string>("2026");
  const [equipment, setEquipment] = useState<string>("1");
  const [selectedMtcs, setSelectedMtcs] = useState<string[]>(MTC_OPTIONS.map(m => m.id));
  const [isMtcOpen, setIsMtcOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

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

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowReport(true);
    }, 700);
  };

  const toggleMtc = (id: string) => {
    setSelectedMtcs(prev => prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Header - Blue 700 */}
        <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-blue-700 text-xl font-bold flex items-center gap-2">
            <Package size={24} /> Equipment Status Report
          </h2>
        </div>

        <div className="p-6">
          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end mb-8 pb-8 border-b border-gray-100">
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Quarter</label>
              <select
                value={quarter}
                onChange={(e) => setQuarter(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="1">Q1 (Jan-Mar)</option>
                <option value="2">Q2 (Apr-Jun)</option>
                <option value="3">Q3 (Jul-Sep)</option>
                <option value="4">Q4 (Oct-Dec)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              >
                {YEARS.map(yr => <option key={yr} value={yr}>{yr}</option>)}
              </select>
            </div>

            <div className="relative" ref={mtcRef}>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">MTCs</label>
              <button
                type="button"
                onClick={() => setIsMtcOpen(!isMtcOpen)}
                className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:ring-1 focus:ring-blue-500 h-[38px] flex items-center justify-between text-sm"
              >
                <span className="truncate">{selectedMtcs.length === MTC_OPTIONS.length ? "All MTCs" : `${selectedMtcs.length} Selected`}</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
              {isMtcOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-2 max-h-60 overflow-y-auto">
                  {MTC_OPTIONS.map(m => (
                    <label key={m.id} className="flex items-center space-x-2 p-2 hover:bg-blue-50 rounded cursor-pointer">
                      <input type="checkbox" checked={selectedMtcs.includes(m.id)} onChange={() => toggleMtc(m.id)} className="accent-blue-600" />
                      <span className="text-sm">{m.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Equipment</label>
              <select
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="">All Equipment</option>
                {EQUIPMENT_OPTIONS.map(eq => <option key={eq.id} value={eq.id}>{eq.name}</option>)}
              </select>
            </div>

            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full h-[38px] flex items-center justify-center gap-2 border border-blue-600 text-blue-600 font-bold rounded-md hover:bg-blue-600 hover:text-white transition-all text-sm disabled:opacity-50"
            >
              <SearchIcon size={16} /> {isSearching ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Results Section */}
          {showReport ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-full text-white"><CheckCircle size={20} /></div>
                  <div>
                    <p className="text-xs font-bold text-blue-800 uppercase">Functional</p>
                    <p className="text-2xl font-black text-blue-900">42 Units</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center gap-4 border-l-4 border-l-amber-500">
                  <div className="bg-amber-500 p-3 rounded-full text-white"><AlertTriangle size={20} /></div>
                  <div>
                    <p className="text-xs font-bold text-blue-800 uppercase">Non-Functional</p>
                    <p className="text-2xl font-black text-blue-900">3 Units</p>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-md text-sm font-bold hover:bg-blue-800 transition-colors shadow-md">
                    <Download size={16} /> Export Status List
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                    <tr>
                      <th className="px-4 py-3">MTC Name</th>
                      <th className="px-4 py-3">Equipment Name</th>
                      <th className="px-4 py-3 text-center">Sanctioned</th>
                      <th className="px-4 py-3 text-center">Available</th>
                      <th className="px-4 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { mtc: "BUNDU", name: "Digital Weighing Scale", sanc: 2, avail: 2, status: "Functional" },
                      { mtc: "DORANDA", name: "Digital Weighing Scale", sanc: 3, avail: 2, status: "Non-Functional" },
                      { mtc: "UP REFERRAL RIMS", name: "Digital Weighing Scale", sanc: 5, avail: 5, status: "Functional" },
                      { mtc: "MANDAR", name: "Digital Weighing Scale", sanc: 1, avail: 1, status: "Functional" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-blue-50/30">
                        <td className="px-4 py-3 font-semibold text-gray-800">{row.mtc}</td>
                        <td className="px-4 py-3 text-gray-600">{row.name}</td>
                        <td className="px-4 py-3 text-center text-gray-500">{row.sanc}</td>
                        <td className="px-4 py-3 text-center text-gray-500">{row.avail}</td>
                        <td className="px-4 py-3 text-right">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                            row.status === "Functional" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
              <p>Configure filters to generate the equipment status report.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}