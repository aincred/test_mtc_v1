// // // "use client";

// // // import React, { useState } from "react";
// // // import { Calendar, Search } from "lucide-react";

// // // interface District {
// // //   id: string;
// // //   name: string;
// // // }

// // // const DISTRICTS: District[] = [
// // //   { id: "1", name: "BOKARO" },
// // //   { id: "2", name: "CHATRA" },
// // //   { id: "16", name: "DEOGHAR" },
// // //   { id: "4", name: "DHANBAD" },
// // //   { id: "17", name: "DUMKA" },
// // //   { id: "22", name: "EAST SINGHBHUM" },
// // //   { id: "14", name: "GARHWA" },
// // //   { id: "3", name: "GIRIDIH" },
// // //   { id: "18", name: "GODDA" },
// // //   { id: "9", name: "GUMLA" },
// // //   { id: "6", name: "HAZARIBAGH" },
// // //   { id: "19", name: "JAMTARA" },
// // //   { id: "10", name: "KHUNTI" },
// // //   { id: "7", name: "KODERMA" },
// // //   { id: "15", name: "LATEHAR" },
// // //   { id: "11", name: "LOHARDAGA" },
// // //   { id: "20", name: "PAKUR" },
// // //   { id: "13", name: "PALAMU" },
// // //   { id: "5", name: "RAMGARH" },
// // //   { id: "8", name: "RANCHI" },
// // //   { id: "21", name: "SAHIBGANJ" },
// // //   { id: "23", name: "SERAIKELA" },
// // //   { id: "12", name: "SIMDEGA" },
// // //   { id: "24", name: "WEST SINGHBHUM" },
// // // ];

// // // export default function DistrictAnnualFactsheet() {
// // //   // Converted default "04-Apr-2026" to valid YYYY-MM-DD for native date inputs
// // //   const [fromDate, setFromDate] = useState<string>("2026-04-04");
// // //   const [toDate, setToDate] = useState<string>("2026-04-04");
// // //   const [districtId, setDistrictId] = useState<string>("");
// // //   const [reportResult, setReportResult] = useState<string | null>(null);

// // //   const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// // //     const value = e.target.value;
// // //     setDistrictId(value);
    
// // //     // Original HTML had onchange="LoadDependentDD(this)"
// // //     // You can trigger your dependent dropdown fetching logic here
// // //     console.log("Loading dependent data for district ID:", value);
// // //   };

// // //   const getReport = () => {
// // //     // Placeholder for GetReport() function
// // //     const selectedDistrict = DISTRICTS.find(d => d.id === districtId)?.name || "Jharkhand (All)";
// // //     setReportResult(
// // //       `Generating report for ${selectedDistrict} from ${fromDate} to ${toDate}...`
// // //     );
// // //   };

// // //   return (
// // //     <div className="w-full max-w-7xl mx-auto mt-8 font-sans">
// // //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
// // //         {/* Card Header */}
// // //         <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
// // //           <h5 className="text-[#0b918c] text-lg font-semibold m-0">
// // //             District Annual Factsheet
// // //           </h5>
// // //         </div>

// // //         {/* Card Body */}
// // //         <div className="p-5">
// // //           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-5 items-end">
            
// // //             {/* From Date Input */}
// // //             <div className="xl:col-span-2">
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 From Date
// // //               </label>
// // //               <div className="relative">
// // //                 <input
// // //                   type="date"
// // //                   id="txt_FromDate"
// // //                   name="FromDate"
// // //                   value={fromDate}
// // //                   onChange={(e) => setFromDate(e.target.value)}
// // //                   className="w-full pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded focus:ring-[#0b918c] focus:border-[#0b918c] outline-none"
// // //                 />
// // //                 <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
// // //                   <Calendar size={16} />
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* To Date Input */}
// // //             <div className="xl:col-span-2">
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 To Date
// // //               </label>
// // //               <div className="relative">
// // //                 <input
// // //                   type="date"
// // //                   id="txt_ToDate"
// // //                   name="ToDate"
// // //                   value={toDate}
// // //                   onChange={(e) => setToDate(e.target.value)}
// // //                   className="w-full pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded focus:ring-[#0b918c] focus:border-[#0b918c] outline-none"
// // //                 />
// // //                 <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
// // //                   <Calendar size={16} />
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* District Dropdown */}
// // //             <div className="xl:col-span-3">
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 District
// // //               </label>
// // //               <select
// // //                 id="ddl_District"
// // //                 name="DISTRICT_ID"
// // //                 value={districtId}
// // //                 onChange={handleDistrictChange}
// // //                 // Removed disabled="disabled" from original so it can be interacted with in React, 
// // //                 // but you can add it back conditionally: disabled={true}
// // //                 className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-[#0b918c] focus:border-[#0b918c] outline-none bg-white"
// // //               >
// // //                 <option value="">Jharkhand</option>
// // //                 {DISTRICTS.map((district) => (
// // //                   <option key={district.id} value={district.id}>
// // //                     {district.name}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             </div>

// // //             {/* Search Button */}
// // //             <div className="xl:col-span-3 flex items-center h-[34px]">
// // //               <button
// // //                 type="button"
// // //                 id="btn_Search"
// // //                 onClick={getReport}
// // //                 className="flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-medium text-green-600 bg-transparent border border-green-600 rounded hover:bg-green-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
// // //               >
// // //                 <Search size={16} />
// // //                 Search
// // //               </button>
// // //             </div>

// // //           </div>

// // //           {/* Report Rendering Area */}
// // //           <div className="mt-8 border-t border-gray-100 pt-6">
// // //             <div className="w-full text-center min-h-[100px] flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-300">
// // //               <div id="div_Report" className="text-gray-500 text-sm">
// // //                 {reportResult ? (
// // //                   <span className="text-[#0b918c] font-medium">{reportResult}</span>
// // //                 ) : (
// // //                   "Report results will appear here..."
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>

// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import React, { useState } from "react";
// // import { Calendar, Search } from "lucide-react";

// // interface District {
// //   id: string;
// //   name: string;
// // }

// // const DISTRICTS: District[] = [
// //   { id: "1", name: "BOKARO" },
// //   { id: "2", name: "CHATRA" },
// //   { id: "16", name: "DEOGHAR" },
// //   { id: "4", name: "DHANBAD" },
// //   { id: "17", name: "DUMKA" },
// //   { id: "22", name: "EAST SINGHBHUM" },
// //   { id: "14", name: "GARHWA" },
// //   { id: "3", name: "GIRIDIH" },
// //   { id: "18", name: "GODDA" },
// //   { id: "9", name: "GUMLA" },
// //   { id: "6", name: "HAZARIBAGH" },
// //   { id: "19", name: "JAMTARA" },
// //   { id: "10", name: "KHUNTI" },
// //   { id: "7", name: "KODERMA" },
// //   { id: "15", name: "LATEHAR" },
// //   { id: "11", name: "LOHARDAGA" },
// //   { id: "20", name: "PAKUR" },
// //   { id: "13", name: "PALAMU" },
// //   { id: "5", name: "RAMGARH" },
// //   { id: "8", name: "RANCHI" },
// //   { id: "21", name: "SAHIBGANJ" },
// //   { id: "23", name: "SERAIKELA" },
// //   { id: "12", name: "SIMDEGA" },
// //   { id: "24", name: "WEST SINGHBHUM" },
// // ];

// // export default function DistrictAnnualFactsheet() {
// //   const [fromDate, setFromDate] = useState<string>("2026-04-04");
// //   const [toDate, setToDate] = useState<string>("2026-04-04");
// //   const [districtId, setDistrictId] = useState<string>("");
// //   const [reportResult, setReportResult] = useState<string | null>(null);

// //   const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     const value = e.target.value;
// //     setDistrictId(value);
// //     console.log("Loading dependent data for district ID:", value);
// //   };

// //   const getReport = () => {
// //     const selectedDistrict = DISTRICTS.find(d => d.id === districtId)?.name || "Jharkhand (All)";
// //     setReportResult(
// //       `Generating report for ${selectedDistrict} from ${fromDate} to ${toDate}...`
// //     );
// //   };

// //   return (
// //     <div className="w-full max-w-7xl mx-auto mt-8 font-sans">
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
// //         {/* Card Header - Updated to Blue */}
// //         <div className="bg-blue-50 px-5 py-4 border-b border-gray-200">
// //           <h5 className="text-blue-700 text-lg font-semibold m-0">
// //             District Annual Factsheet
// //           </h5>
// //         </div>

// //         {/* Card Body */}
// //         <div className="p-5">
// //           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-5 items-end">
            
// //             {/* From Date Input */}
// //             <div className="xl:col-span-2">
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 From Date
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type="date"
// //                   value={fromDate}
// //                   onChange={(e) => setFromDate(e.target.value)}
// //                   className="w-full pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
// //                 />
// //                 <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
// //                   <Calendar size={16} />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* To Date Input */}
// //             <div className="xl:col-span-2">
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 To Date
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type="date"
// //                   value={toDate}
// //                   onChange={(e) => setToDate(e.target.value)}
// //                   className="w-full pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
// //                 />
// //                 <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
// //                   <Calendar size={16} />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* District Dropdown */}
// //             <div className="xl:col-span-3">
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 District
// //               </label>
// //               <select
// //                 value={districtId}
// //                 onChange={handleDistrictChange}
// //                 className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
// //               >
// //                 <option value="">Jharkhand</option>
// //                 {DISTRICTS.map((district) => (
// //                   <option key={district.id} value={district.id}>
// //                     {district.name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Search Button - Updated to Blue */}
// //             <div className="xl:col-span-3 flex items-center h-[34px]">
// //               <button
// //                 type="button"
// //                 onClick={getReport}
// //                 className="flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-medium text-blue-600 bg-transparent border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
// //               >
// //                 <Search size={16} />
// //                 Search
// //               </button>
// //             </div>

// //           </div>

// //           {/* Report Rendering Area */}
// //           <div className="mt-8 border-t border-gray-100 pt-6">
// //             <div className="w-full text-center min-h-[100px] flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-300">
// //               <div className="text-gray-500 text-sm">
// //                 {reportResult ? (
// //                   <span className="text-blue-600 font-medium">{reportResult}</span>
// //                 ) : (
// //                   "Report results will appear here..."
// //                 )}
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
// import { Calendar, Search, ArrowUp, ArrowDown, Minus } from "lucide-react";

// interface MtcRecord {
//   sl: number;
//   district: string;
//   mtc: string;
//   bedOccupancy: number;
//   admissions: number;
//   gender: { m: number; f: number };
//   referredBy: { sahiya: number; aww: number; other: number };
//   exits: number;
//   outcome: { cure: number; defaulter: number; medTransfer: number; nonRespondent: number; death: number };
//   compositeScore: number;
//   rankJanMar: number;
//   rankChange: { type: "up" | "down" | "neutral"; value: number };
//   rankOctDec: number;
// }

// // Fixed Ranchi-only dataset featuring the requested MTCs
// const RANCHI_MTC_DATA: MtcRecord[] = [
//   { sl: 1, district: "RANCHI", mtc: "RIMS (UP REFERRAL)", bedOccupancy: 108, admissions: 85, gender: { m: 54.0, f: 46.0 }, referredBy: { sahiya: 92.4, aww: 2.0, other: 5.6 }, exits: 82, outcome: { cure: 98, defaulter: 0.0, medTransfer: 2.0, nonRespondent: 0.0, death: 0.0 }, compositeScore: 103, rankJanMar: 1, rankChange: { type: "neutral", value: 0 }, rankOctDec: 1 },
//   { sl: 2, district: "RANCHI", mtc: "BUNDU CHC", bedOccupancy: 84, admissions: 48, gender: { m: 50.0, f: 50.0 }, referredBy: { sahiya: 95.8, aww: 2.1, other: 2.1 }, exits: 44, outcome: { cure: 100, defaulter: 0.0, medTransfer: 0.0, nonRespondent: 0.0, death: 0.0 }, compositeScore: 92, rankJanMar: 2, rankChange: { type: "up", value: 4 }, rankOctDec: 6 },
//   { sl: 3, district: "RANCHI", mtc: "DORANDA UCHC", bedOccupancy: 76, admissions: 42, gender: { m: 48.5, f: 51.5 }, referredBy: { sahiya: 85.0, aww: 5.0, other: 10.0 }, exits: 38, outcome: { cure: 97, defaulter: 0.0, medTransfer: 3.0, nonRespondent: 0.0, death: 0.0 }, compositeScore: 88, rankJanMar: 3, rankChange: { type: "up", value: 1 }, rankOctDec: 4 },
//   { sl: 4, district: "RANCHI", mtc: "MANDAR CHC", bedOccupancy: 72, admissions: 34, gender: { m: 45.0, f: 55.0 }, referredBy: { sahiya: 78.0, aww: 12.0, other: 10.0 }, exits: 31, outcome: { cure: 100, defaulter: 0.0, medTransfer: 0.0, nonRespondent: 0.0, death: 0.0 }, compositeScore: 86, rankJanMar: 4, rankChange: { type: "down", value: 2 }, rankOctDec: 2 },
//   { sl: 5, district: "RANCHI", mtc: "BERO CHC", bedOccupancy: 65, admissions: 26, gender: { m: 52.0, f: 48.0 }, referredBy: { sahiya: 88.5, aww: 0.0, other: 11.5 }, exits: 24, outcome: { cure: 95, defaulter: 4.2, medTransfer: 0.8, nonRespondent: 0.0, death: 0.0 }, compositeScore: 80, rankJanMar: 5, rankChange: { type: "up", value: 3 }, rankOctDec: 8 }
// ];

// export default function DistrictAnnualFactsheet() {
//   const [fromDate, setFromDate] = useState<string>("2026-04-04");
//   const [toDate, setToDate] = useState<string>("2026-04-04");
//   const [reportData, setReportData] = useState<MtcRecord[] | null>(null);
//   const [hasSearched, setHasSearched] = useState<boolean>(false);

//   const getReport = () => {
//     setReportData(RANCHI_MTC_DATA);
//     setHasSearched(true);
//   };

//   const getOccupancyColor = (val: number) => {
//     if (val >= 90) return "bg-[#86efac] text-green-900 font-medium";
//     if (val >= 70) return "bg-[#bbf7d0] text-green-900";
//     if (val >= 60) return "bg-[#fef08a] text-yellow-900";
//     return "bg-[#fef9c3] text-yellow-800";
//   };

//   const getCureColor = (val: number) => {
//     if (val >= 95) return "bg-[#bbf7d0] text-green-900 font-medium";
//     if (val >= 85) return "bg-[#fef08a] text-yellow-900";
//     return "bg-[#fecaca] text-red-900";
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto mt-8 font-sans px-4">
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
//         {/* Card Header Focused on Ranchi District */}
//         <div className="bg-blue-50 px-5 py-4 border-b border-gray-200 flex justify-between items-center">
//           <div>
//             <h5 className="text-blue-700 text-lg font-semibold m-0">
//               District Annual Factsheet
//             </h5>
//             <p className="text-xs text-gray-500 m-0 mt-0.5">District Profile: RANCHI</p>
//           </div>
//           <span className="px-2.5 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
//             Ranchi District User Dashboard
//           </span>
//         </div>

//         {/* Dashboard Filter Controls */}
//         <div className="p-5">
//           <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-12 gap-5 items-end">
            
//             {/* From Date */}
//             <div className="xl:col-span-3">
//               <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
//               <div className="relative">
//                 <input
//                   type="date"
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                   className="w-full pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
//                   <Calendar size={16} />
//                 </div>
//               </div>
//             </div>

//             {/* To Date */}
//             <div className="xl:col-span-3">
//               <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
//               <div className="relative">
//                 <input
//                   type="date"
//                   value={toDate}
//                   onChange={(e) => setToDate(e.target.value)}
//                   className="w-full pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
//                   <Calendar size={16} />
//                 </div>
//               </div>
//             </div>

//             {/* Locked District Selection Field */}
//             <div className="xl:col-span-3">
//               <label className="block text-sm font-medium text-gray-700 mb-1">District Scope</label>
//               <input 
//                 type="text" 
//                 value="RANCHI" 
//                 disabled 
//                 className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-gray-100 text-gray-600 font-medium cursor-not-allowed outline-none" 
//               />
//             </div>

//             {/* Action Search Button */}
//             <div className="xl:col-span-3 flex items-center h-[34px]">
//               <button
//                 type="button"
//                 onClick={getReport}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-medium text-blue-600 bg-transparent border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <Search size={16} />
//                 Fetch District Data
//               </button>
//             </div>
//           </div>

//           {/* Interactive Matrix Spreadsheet */}
//           <div className="mt-8 border-t border-gray-100 pt-6">
//             {hasSearched && reportData ? (
//               <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//                 <table className="w-full text-xs text-center border-collapse whitespace-nowrap">
                  
//                   <thead>
//                     <tr className="bg-[#114b6e] text-white font-semibold border-b border-slate-700">
//                       <th rowSpan={2} className="px-2 py-3 border-r border-slate-600">SL</th>
//                       <th rowSpan={2} className="px-3 py-3 border-r border-slate-600 text-left">DISTRICT</th>
//                       <th rowSpan={2} className="px-4 py-3 border-r border-slate-600 text-left">MTC</th>
//                       <th rowSpan={2} className="px-2 py-3 border-r border-slate-600">Bed Occupancy (%)</th>
//                       <th rowSpan={2} className="px-2 py-3 border-r border-slate-600">No. of Admission</th>
//                       <th colSpan={2} className="px-4 py-1.5 border-r border-slate-600 border-b border-slate-600">GENDER (%)</th>
//                       <th colSpan={3} className="px-6 py-1.5 border-r border-slate-600 border-b border-slate-600">Referred by (%)</th>
//                       <th rowSpan={2} className="px-2 py-3 border-r border-slate-600">No. of Exits</th>
//                       <th colSpan={5} className="px-8 py-1.5 border-r border-slate-600 border-b border-slate-600">OUTCOME INDICATORS (%)</th>
//                       <th rowSpan={2} className="px-3 py-3 border-r border-slate-600">Composite Index Score [BO+CR] (%)</th>
//                       <th rowSpan={2} className="px-3 py-3 border-r border-slate-600">RANK (JAN-MAR 26)</th>
//                       <th rowSpan={2} className="px-3 py-3">RANK (OCT-DEC 26)</th>
//                     </tr>
//                     <tr className="bg-[#165a84] text-white font-medium">
//                       <th className="px-2 py-1.5 border-r border-slate-600">M</th>
//                       <th className="px-2 py-1.5 border-r border-slate-600">F</th>
//                       <th className="px-2 py-1.5 border-r border-slate-600">SAHIYA</th>
//                       <th className="px-2 py-1.5 border-r border-slate-600">AWW</th>
//                       <th className="px-2 py-1.5 border-r border-slate-600">Other</th>
//                       <th className="px-2 py-1.5 border-r border-slate-600">Cure</th>
//                       <th className="px-2 py-1.5 border-r border-slate-600">Defaulter</th>
//                       <th className="px-2 py-1.5 border-r border-slate-600">Med. Transfer</th>
//                       <th className="px-2 py-1.5 border-r border-slate-600">Non Respondent</th>
//                       <th className="px-2 py-1.5 border-r border-slate-600">Death</th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
//                     {reportData.map((row) => (
//                       <tr key={row.sl} className="hover:bg-slate-50 transition-colors">
//                         <td className="px-2 py-2 border-r border-gray-200 font-medium">{row.sl}</td>
//                         <td className="px-3 py-2 border-r border-gray-200 text-left font-medium text-slate-500">{row.district}</td>
//                         <td className="px-4 py-2 border-r border-gray-200 text-left font-medium text-blue-900">{row.mtc}</td>
//                         <td className={`px-2 py-2 border-r border-gray-200 ${getOccupancyColor(row.bedOccupancy)}`}>
//                           {row.bedOccupancy}
//                         </td>
//                         <td className="px-2 py-2 border-r border-gray-200 font-medium bg-slate-50">{row.admissions}</td>
//                         <td className="px-2 py-2 border-r border-gray-100">{row.gender.m.toFixed(1)}</td>
//                         <td className="px-2 py-2 border-r border-gray-200">{row.gender.f.toFixed(1)}</td>
//                         <td className="px-2 py-2 border-r border-gray-100">{row.referredBy.sahiya.toFixed(1)}</td>
//                         <td className="px-2 py-2 border-r border-gray-100">{row.referredBy.aww.toFixed(1)}</td>
//                         <td className="px-2 py-2 border-r border-gray-200">{row.referredBy.other.toFixed(1)}</td>
//                         <td className="px-2 py-2 border-r border-gray-200 bg-slate-50 font-medium">{row.exits}</td>
//                         <td className={`px-2 py-2 border-r border-gray-100 ${getCureColor(row.outcome.cure)}`}>
//                           {row.outcome.cure}
//                         </td>
//                         <td className="px-2 py-2 border-r border-gray-100">{row.outcome.defaulter.toFixed(1)}</td>
//                         <td className="px-2 py-2 border-r border-gray-100">{row.outcome.medTransfer.toFixed(1)}</td>
//                         <td className="px-2 py-2 border-r border-gray-100">{row.outcome.nonRespondent.toFixed(1)}</td>
//                         <td className="px-2 py-2 border-r border-gray-200">{row.outcome.death.toFixed(1)}</td>
//                         <td className="px-2 py-2 border-r border-gray-200 font-semibold text-slate-800 bg-slate-50">
//                           {row.compositeScore}
//                         </td>
//                         <td className="px-2 py-2 border-r border-gray-200 font-bold text-sm bg-slate-50">
//                           <div className="flex items-center justify-center gap-1">
//                             {row.rankJanMar}
//                             {row.rankChange.type === "up" && (
//                               <span className="inline-flex items-center px-1 rounded bg-green-100 text-green-700 text-[10px]">
//                                 <ArrowUp size={10} className="mr-0.5" /> {row.rankChange.value}
//                               </span>
//                             )}
//                             {row.rankChange.type === "down" && (
//                               <span className="inline-flex items-center px-1 rounded bg-red-100 text-red-700 text-[10px]">
//                                 <ArrowDown size={10} className="mr-0.5" /> {row.rankChange.value}
//                               </span>
//                             )}
//                             {row.rankChange.type === "neutral" && (
//                               <span className="text-gray-400"><Minus size={10} /></span>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-2 py-2 font-medium bg-slate-50">{row.rankOctDec}</td>
//                       </tr>
//                     ))}
//                   </tbody>

//                 </table>
//               </div>
//             ) : (
//               <div className="w-full text-center min-h-[120px] flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-300">
//                 <div className="text-gray-500 text-sm">
//                   Click <span className="font-semibold text-blue-600">Fetch District Data</span> to populate data across Ranchi MTC Blocks...
//                 </div>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Search, ArrowUp, ArrowDown, Minus, Loader2, Building2 } from "lucide-react";

interface MtcRecord {
  sl: number;
  district: string;
  mtc: string;
  bedOccupancy: number;
  admissions: number;
  gender: { m: number; f: number };
  referredBy: { sahiya: number; aww: number; other: number };
  exits: number;
  outcome: { cure: number; defaulter: number; medTransfer: number; nonRespondent: number; death: number };
  compositeScore: number;
  rankJanMar: number;
  rankChange: { type: "up" | "down" | "neutral"; value: number };
  rankOctDec: number;
}

export default function DistrictAnnualFactsheet() {
  const currentYear = new Date().getFullYear();
  const [fromDate, setFromDate] = useState<string>(`${currentYear}-01-01`);
  const [toDate, setToDate] = useState<string>(new Date().toISOString().split("T")[0]);
  
  const [districtName, setDistrictName] = useState<string>("RANCHI");
  const [districtId, setDistrictId] = useState<string | null>(null);

  const [reportData, setReportData] = useState<MtcRecord[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Sync user's session district
  useEffect(() => {
    const sessionData = sessionStorage.getItem("district_user") || sessionStorage.getItem("user");

    if (sessionData) {
      try {
        const user = JSON.parse(sessionData);
        if (user.districtName) {
          setDistrictName(user.districtName.toUpperCase());
        }
        if (user.districtId) {
          setDistrictId(user.districtId);
        }
      } catch (e) {
        console.error("Error parsing session user data:", e);
      }
    }
  }, []);

  const getReport = async () => {
    setLoading(true);
    setErrorMsg(null);
    setHasSearched(true);

    try {
      const queryParams = new URLSearchParams({
        fromDate,
        toDate,
        districtName,
        ...(districtId && { districtId }),
      });

      const res = await fetch(`/api/reports/district-factsheet?${queryParams.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || json.message || "Failed to load factsheet report.");
      }

      setReportData(json.data || []);
    } catch (err: any) {
      console.error("Factsheet retrieval error:", err);
      setErrorMsg(err.message || "An unexpected error occurred while fetching report data.");
      setReportData(null);
    } finally {
      setLoading(false);
    }
  };

  const getOccupancyColor = (val: number) => {
    if (val >= 90) return "bg-[#86efac] text-green-900 font-medium";
    if (val >= 70) return "bg-[#bbf7d0] text-green-900";
    if (val >= 60) return "bg-[#fef08a] text-yellow-900";
    return "bg-[#fef9c3] text-yellow-800";
  };

  const getCureColor = (val: number) => {
    if (val >= 95) return "bg-[#bbf7d0] text-green-900 font-medium";
    if (val >= 85) return "bg-[#fef08a] text-yellow-900";
    return "bg-[#fecaca] text-red-900";
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 font-sans px-4 pb-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Card Header */}
        <div className="bg-blue-50 px-5 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h5 className="text-blue-700 text-lg font-semibold m-0">
              District Annual Factsheet
            </h5>
            <p className="text-xs text-gray-500 m-0 mt-0.5">District Profile: {districtName}</p>
          </div>
          <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full flex items-center gap-1.5">
            <Building2 size={13} /> {districtName} District Dashboard
          </span>
        </div>

        {/* Filter Controls */}
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-12 gap-5 items-end">
            
            {/* From Date */}
            <div className="xl:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
                  <Calendar size={16} />
                </div>
              </div>
            </div>

            {/* To Date */}
            <div className="xl:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
                  <Calendar size={16} />
                </div>
              </div>
            </div>

            {/* Locked District Scope Field */}
            <div className="xl:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">District Scope</label>
              <input 
                type="text" 
                value={districtName} 
                disabled 
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-gray-100 text-gray-600 font-medium cursor-not-allowed outline-none" 
              />
            </div>

            {/* Action Fetch Button */}
            <div className="xl:col-span-3 flex items-center h-[34px]">
              <button
                type="button"
                onClick={getReport}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-medium text-blue-600 bg-transparent border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Search size={16} />
                )}
                {loading ? "Fetching..." : "Fetch District Data"}
              </button>
            </div>
          </div>

          {/* Interactive Matrix Spreadsheet */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm mb-4">
                {errorMsg}
              </div>
            )}

            {loading ? (
              <div className="w-full text-center py-12 bg-gray-50 rounded border border-dashed border-gray-300 flex flex-col items-center justify-center gap-2">
                <Loader2 className="animate-spin text-blue-600" size={24} />
                <span className="text-gray-500 text-sm">Calculating bed occupancy, cure rates, composite scores & rankings...</span>
              </div>
            ) : hasSearched && reportData && reportData.length > 0 ? (
              <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="w-full text-xs text-center border-collapse whitespace-nowrap">
                  
                  <thead>
                    <tr className="bg-[#114b6e] text-white font-semibold border-b border-slate-700">
                      <th rowSpan={2} className="px-2 py-3 border-r border-slate-600">SL</th>
                      <th rowSpan={2} className="px-3 py-3 border-r border-slate-600 text-left">DISTRICT</th>
                      <th rowSpan={2} className="px-4 py-3 border-r border-slate-600 text-left">MTC</th>
                      <th rowSpan={2} className="px-2 py-3 border-r border-slate-600">Bed Occupancy (%)</th>
                      <th rowSpan={2} className="px-2 py-3 border-r border-slate-600">No. of Admission</th>
                      <th colSpan={2} className="px-4 py-1.5 border-r border-slate-600 border-b border-slate-600">GENDER (%)</th>
                      <th colSpan={3} className="px-6 py-1.5 border-r border-slate-600 border-b border-slate-600">Referred by (%)</th>
                      <th rowSpan={2} className="px-2 py-3 border-r border-slate-600">No. of Exits</th>
                      <th colSpan={5} className="px-8 py-1.5 border-r border-slate-600 border-b border-slate-600">OUTCOME INDICATORS (%)</th>
                      <th rowSpan={2} className="px-3 py-3 border-r border-slate-600">Composite Index Score [BO+CR] (%)</th>
                      <th rowSpan={2} className="px-3 py-3 border-r border-slate-600">RANK (JAN-MAR)</th>
                      <th rowSpan={2} className="px-3 py-3">RANK (OCT-DEC)</th>
                    </tr>
                    <tr className="bg-[#165a84] text-white font-medium">
                      <th className="px-2 py-1.5 border-r border-slate-600">M</th>
                      <th className="px-2 py-1.5 border-r border-slate-600">F</th>
                      <th className="px-2 py-1.5 border-r border-slate-600">SAHIYA</th>
                      <th className="px-2 py-1.5 border-r border-slate-600">AWW</th>
                      <th className="px-2 py-1.5 border-r border-slate-600">Other</th>
                      <th className="px-2 py-1.5 border-r border-slate-600">Cure</th>
                      <th className="px-2 py-1.5 border-r border-slate-600">Defaulter</th>
                      <th className="px-2 py-1.5 border-r border-slate-600">Med. Transfer</th>
                      <th className="px-2 py-1.5 border-r border-slate-600">Non Respondent</th>
                      <th className="px-2 py-1.5 border-r border-slate-600">Death</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
                    {reportData.map((row) => (
                      <tr key={row.sl} className="hover:bg-slate-50 transition-colors">
                        <td className="px-2 py-2 border-r border-gray-200 font-medium">{row.sl}</td>
                        <td className="px-3 py-2 border-r border-gray-200 text-left font-medium text-slate-500">{row.district}</td>
                        <td className="px-4 py-2 border-r border-gray-200 text-left font-medium text-blue-900">{row.mtc}</td>
                        <td className={`px-2 py-2 border-r border-gray-200 ${getOccupancyColor(row.bedOccupancy)}`}>
                          {row.bedOccupancy.toFixed(1)}%
                        </td>
                        <td className="px-2 py-2 border-r border-gray-200 font-medium bg-slate-50">{row.admissions}</td>
                        <td className="px-2 py-2 border-r border-gray-100">{row.gender.m.toFixed(1)}%</td>
                        <td className="px-2 py-2 border-r border-gray-200">{row.gender.f.toFixed(1)}%</td>
                        <td className="px-2 py-2 border-r border-gray-100">{row.referredBy.sahiya.toFixed(1)}%</td>
                        <td className="px-2 py-2 border-r border-gray-100">{row.referredBy.aww.toFixed(1)}%</td>
                        <td className="px-2 py-2 border-r border-gray-200">{row.referredBy.other.toFixed(1)}%</td>
                        <td className="px-2 py-2 border-r border-gray-200 bg-slate-50 font-medium">{row.exits}</td>
                        <td className={`px-2 py-2 border-r border-gray-100 ${getCureColor(row.outcome.cure)}`}>
                          {row.outcome.cure.toFixed(1)}%
                        </td>
                        <td className="px-2 py-2 border-r border-gray-100">{row.outcome.defaulter.toFixed(1)}%</td>
                        <td className="px-2 py-2 border-r border-gray-100">{row.outcome.medTransfer.toFixed(1)}%</td>
                        <td className="px-2 py-2 border-r border-gray-100">{row.outcome.nonRespondent.toFixed(1)}%</td>
                        <td className="px-2 py-2 border-r border-gray-200">{row.outcome.death.toFixed(1)}%</td>
                        <td className="px-2 py-2 border-r border-gray-200 font-semibold text-slate-800 bg-slate-50">
                          {row.compositeScore.toFixed(1)}
                        </td>
                        <td className="px-2 py-2 border-r border-gray-200 font-bold text-sm bg-slate-50">
                          <div className="flex items-center justify-center gap-1">
                            {row.rankJanMar}
                            {row.rankChange.type === "up" && (
                              <span className="inline-flex items-center px-1 rounded bg-green-100 text-green-700 text-[10px]">
                                <ArrowUp size={10} className="mr-0.5" /> {row.rankChange.value}
                              </span>
                            )}
                            {row.rankChange.type === "down" && (
                              <span className="inline-flex items-center px-1 rounded bg-red-100 text-red-700 text-[10px]">
                                <ArrowDown size={10} className="mr-0.5" /> {row.rankChange.value}
                              </span>
                            )}
                            {row.rankChange.type === "neutral" && (
                              <span className="text-gray-400"><Minus size={10} /></span>
                            )}
                          </div>
                        </td>
                        <td className="px-2 py-2 font-medium bg-slate-50">{row.rankOctDec}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            ) : (
              <div className="w-full text-center min-h-[120px] flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-300">
                <div className="text-gray-500 text-sm">
                  Click <span className="font-semibold text-blue-600">Fetch District Data</span> to populate factsheet records for {districtName} MTCs...
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}