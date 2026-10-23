// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { Calendar, Search as SearchIcon, Loader2 } from "lucide-react";

// // interface District {
// //   id: string;
// //   name: string;
// // }

// // export default function StateAndDistrictAnnualFactsheet() {
// //   // Dynamic Districts State
// //   const [districts, setDistricts] = useState<District[]>([]);
// //   const [isDistrictsLoading, setIsDistrictsLoading] = useState<boolean>(true);

// //   // Form State
// //   const [fromDate, setFromDate] = useState<string>("");
// //   const [toDate, setToDate] = useState<string>("");
// //   const [district, setDistrict] = useState<string>("");
// //   const [isSearching, setIsSearching] = useState<boolean>(false);

// //   // Fetch Districts from Database API on mount
// //   useEffect(() => {
// //     const fetchDistricts = async () => {
// //       try {
// //         setIsDistrictsLoading(true);
// //         const res = await fetch("/api/districts");
// //         const json = await res.json();

// //         if (json.success && Array.isArray(json.data)) {
// //           // Map DB fields (district_id, district_name) to local District interface
// //           const formattedDistricts: District[] = json.data.map((d: any) => ({
// //             id: String(d.district_id),
// //             name: String(d.district_name).toUpperCase(),
// //           }));
// //           setDistricts(formattedDistricts);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching districts from database:", error);
// //       } finally {
// //         setIsDistrictsLoading(false);
// //       }
// //     };

// //     fetchDistricts();
// //   }, []);

// //   const handleSearch = async () => {
// //     setIsSearching(true);
// //     const payload = {
// //       fromDate,
// //       toDate,
// //       districtId: district || "Jharkhand (All)",
// //     };
// //     console.log("Generating State and District Annual Factsheet for:", payload);
    
// //     // Simulate API fetch delay (replace with your actual report fetch endpoint)
// //     setTimeout(() => {
// //       setIsSearching(false);
// //     }, 800);
// //   };

// //   return (
// //     <div className="w-full mt-8">
// //       {/* Outer Card with margin/shadow similar to HTML */}
// //       <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
// //         {/* Card Header */}
// //         <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
// //           <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
// //             State and District Annual Factsheet
// //           </h5>
// //         </div>

// //         {/* Card Body */}
// //         <div className="p-4 md:p-6 text-sm">
          
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 items-end">
            
// //             {/* From Date */}
// //             <div className="lg:col-span-2 flex flex-col gap-1">
// //               <label htmlFor="txt_FromDate" className="font-medium text-gray-700">From Date</label>
// //               <div className="relative">
// //                 <input
// //                   id="txt_FromDate"
// //                   type="date"
// //                   value={fromDate}
// //                   onChange={(e) => setFromDate(e.target.value)}
// //                   className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] h-[38px]"
// //                 />
// //                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
// //                   <Calendar size={16} />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* To Date */}
// //             <div className="lg:col-span-2 flex flex-col gap-1">
// //               <label htmlFor="txt_ToDate" className="font-medium text-gray-700">To Date</label>
// //               <div className="relative">
// //                 <input
// //                   id="txt_ToDate"
// //                   type="date"
// //                   value={toDate}
// //                   onChange={(e) => setToDate(e.target.value)}
// //                   className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] h-[38px]"
// //                 />
// //                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
// //                   <Calendar size={16} />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* District Select */}
// //             <div className="lg:col-span-3 flex flex-col gap-1">
// //               <label htmlFor="ddl_District" className="font-medium text-gray-700">District</label>
// //               <select
// //                 id="ddl_District"
// //                 value={district}
// //                 disabled={isDistrictsLoading}
// //                 onChange={(e) => setDistrict(e.target.value)}
// //                 className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] disabled:bg-gray-100 disabled:cursor-not-allowed"
// //               >
// //                 <option value="">{isDistrictsLoading ? "Loading districts..." : "Jharkhand (All)"}</option>
// //                 {districts.map((d) => (
// //                   <option key={d.id} value={d.id}>{d.name}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Search Button */}
// //             <div className="lg:col-span-3 lg:pt-0 pt-2">
// //               <button
// //                 type="button"
// //                 onClick={handleSearch}
// //                 disabled={isDistrictsLoading || isSearching}
// //                 className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-[#0B918C] bg-white hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C] disabled:opacity-50"
// //               >
// //                 {isSearching ? <Loader2 size={16} className="animate-spin" /> : <SearchIcon size={16} />}
// //                 Search
// //               </button>
// //             </div>

// //           </div>

// //           {/* Report Output Section */}
// //           <div className="mt-8 flex justify-center border-t border-gray-100 pt-6">
// //             <div id="div_Report" className="w-full text-center text-gray-500">
// //               {/* Report content renders here */}
// //             </div>
// //           </div>
          
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { Calendar, Search as SearchIcon, Loader2, Building2, Trophy, ArrowUp, ArrowDown, Minus } from "lucide-react";

// interface District {
//   id: string;
//   name: string;
// }

// interface OutcomeData {
//   cure: number;
//   defaulter: number;
//   medTransfer: number;
//   nonRespondent: number;
//   death: number;
// }

// interface DistrictFactsheetRecord {
//   sl: number;
//   districtId: string;
//   district: string;
//   bedOccupancy: number;
//   admissions: number;
//   gender: { m: number; f: number };
//   referredBy: { sahiya: number; aww: number; other: number };
//   exits: number;
//   outcome: OutcomeData;
//   compositeScore: number;
//   rankJanMar: number;
//   rankChange: { type: "up" | "down" | "neutral"; value: number };
//   rankOctDec: number;
// }

// export default function StateAndDistrictAnnualFactsheet() {
//   const currentYear = new Date().getFullYear();

//   // Dynamic Districts State
//   const [districts, setDistricts] = useState<District[]>([]);
//   const [isDistrictsLoading, setIsDistrictsLoading] = useState<boolean>(true);

//   // Form Filter State (Defaults to "ALL" Districts)
//   const [fromDate, setFromDate] = useState<string>(`${currentYear}-01-01`);
//   const [toDate, setToDate] = useState<string>(new Date().toISOString().split("T")[0]);
//   const [selectedDistrict, setSelectedDistrict] = useState<string>("ALL");

//   // Report & UI State
//   const [reportData, setReportData] = useState<DistrictFactsheetRecord[]>([]);
//   const [isSearching, setIsSearching] = useState<boolean>(false);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const [hasSearched, setHasSearched] = useState<boolean>(false);

//   // 1. Fetch District Dropdown Items
//   useEffect(() => {
//     const fetchDistricts = async () => {
//       try {
//         setIsDistrictsLoading(true);
//         const res = await fetch("/api/districts");
//         const json = await res.json();

//         if (json.success && Array.isArray(json.data)) {
//           const formattedDistricts: District[] = json.data.map((d: any) => ({
//             id: String(d.district_id || d.id),
//             name: String(d.district_name || d.name || d.district).toUpperCase(),
//           }));
//           setDistricts(formattedDistricts);
//         }
//       } catch (error) {
//         console.error("Error fetching districts:", error);
//       } finally {
//         setIsDistrictsLoading(false);
//       }
//     };

//     fetchDistricts();
//   }, []);

//   // 2. Fetch Factsheet Data for All Districts
//   const handleSearch = async () => {
//     setIsSearching(true);
//     setErrorMsg(null);
//     setHasSearched(true);

//     try {
//       const queryParams = new URLSearchParams({
//         fromDate,
//         toDate,
//         districtName: selectedDistrict,
//       });

//       const res = await fetch(`/api/mtc-state-report/factsheet?${queryParams.toString()}`);
//       const json = await res.json();

//       if (!res.ok || !json.success) {
//         throw new Error(json.error || json.details || "Failed to fetch state factsheet data.");
//       }

//       setReportData(json.data || []);
//     } catch (err: unknown) {
//       console.error("Factsheet error:", err);
//       const message = err instanceof Error ? err.message : "An unexpected error occurred.";
//       setErrorMsg(message);
//       setReportData([]);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   // Auto-fetch "ALL DISTRICTS" on initial render
//   useEffect(() => {
//     handleSearch();
//   }, []);

//   // 3. Aggregate State Overall Metrics
//   const stateSummary = useMemo(() => {
//     if (!reportData.length) return null;

//     const count = reportData.length;
//     const totalAdmissions = reportData.reduce((acc, curr) => acc + (curr.admissions || 0), 0);
//     const totalExits = reportData.reduce((acc, curr) => acc + (curr.exits || 0), 0);
//     const avgBedOccupancy = reportData.reduce((acc, curr) => acc + (curr.bedOccupancy || 0), 0) / count;
//     const avgCureRate = reportData.reduce((acc, curr) => acc + (curr.outcome?.cure || 0), 0) / count;
//     const avgComposite = reportData.reduce((acc, curr) => acc + (curr.compositeScore || 0), 0) / count;

//     return {
//       totalDistricts: count,
//       totalAdmissions,
//       totalExits,
//       avgBedOccupancy: avgBedOccupancy.toFixed(1),
//       avgCureRate: avgCureRate.toFixed(1),
//       avgComposite: avgComposite.toFixed(1),
//     };
//   }, [reportData]);

//   const fmt = (val: number | undefined) => (val ?? 0).toFixed(1);

//   return (
//     <div className="w-full max-w-[96rem] mx-auto mt-6 px-4 pb-12 font-sans">
//       <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
//         {/* Header Banner */}
//         <div className="bg-gradient-to-r from-slate-800 to-[#0B918C] px-6 py-4 text-white flex flex-wrap justify-between items-center gap-4">
//           <div>
//             <h5 className="text-xl font-bold m-0 tracking-wide">
//               State & District Annual Factsheet (All Districts)
//             </h5>
//             <p className="text-xs text-emerald-100 m-0 mt-1">
//               State Administrative View • Complete District Performance Matrix & Rankings
//             </p>
//           </div>
//           <span className="px-3 py-1 text-xs font-semibold bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-1.5 text-white">
//             <Building2 size={14} /> State Level Access
//           </span>
//         </div>

//         {/* Filter Controls */}
//         <div className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 items-end">
            
//             {/* From Date */}
//             <div className="lg:col-span-2 flex flex-col gap-1">
//               <label htmlFor="txt_FromDate" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 From Date
//               </label>
//               <div className="relative">
//                 <input
//                   id="txt_FromDate"
//                   type="date"
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                   className="w-full pl-3 pr-9 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
//                 />
//                 <Calendar size={16} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             {/* To Date */}
//             <div className="lg:col-span-2 flex flex-col gap-1">
//               <label htmlFor="txt_ToDate" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 To Date
//               </label>
//               <div className="relative">
//                 <input
//                   id="txt_ToDate"
//                   type="date"
//                   value={toDate}
//                   onChange={(e) => setToDate(e.target.value)}
//                   className="w-full pl-3 pr-9 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
//                 />
//                 <Calendar size={16} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             {/* District Select Dropdown (Default: ALL) */}
//             <div className="lg:col-span-3 flex flex-col gap-1">
//               <label htmlFor="ddl_District" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 District Scope
//               </label>
//               <select
//                 id="ddl_District"
//                 value={selectedDistrict}
//                 disabled={isDistrictsLoading}
//                 onChange={(e) => setSelectedDistrict(e.target.value)}
//                 className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] disabled:bg-gray-100 disabled:cursor-not-allowed font-medium"
//               >
//                 <option value="ALL">JHARKHAND (ALL DISTRICTS)</option>
//                 {districts.map((d) => (
//                   <option key={d.id} value={d.name}>
//                     {d.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Search Action Button */}
//             <div className="lg:col-span-3">
//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 disabled={isDistrictsLoading || isSearching}
//                 className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-semibold rounded-md text-white bg-[#0B918C] hover:bg-[#08736f] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B918C] disabled:opacity-50"
//               >
//                 {isSearching ? <Loader2 size={16} className="animate-spin" /> : <SearchIcon size={16} />}
//                 {isSearching ? "Loading All Districts..." : "Generate Factsheet"}
//               </button>
//             </div>

//           </div>

//           {/* Error Message */}
//           {errorMsg && (
//             <div className="mt-4 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-sm">
//               {errorMsg}
//             </div>
//           )}

//           {/* Summary Indicator Cards */}
//           {hasSearched && stateSummary && (
//             <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
//               <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
//                 <div className="text-[10px] font-bold text-slate-500 uppercase">Total Districts</div>
//                 <div className="text-lg font-bold text-slate-800">{stateSummary.totalDistricts}</div>
//               </div>
//               <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
//                 <div className="text-[10px] font-bold text-slate-500 uppercase">State Admissions</div>
//                 <div className="text-lg font-bold text-slate-800">{stateSummary.totalAdmissions.toLocaleString()}</div>
//               </div>
//               <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
//                 <div className="text-[10px] font-bold text-slate-500 uppercase">State Exits</div>
//                 <div className="text-lg font-bold text-slate-800">{stateSummary.totalExits.toLocaleString()}</div>
//               </div>
//               <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
//                 <div className="text-[10px] font-bold text-emerald-700 uppercase">Avg Bed Occupancy</div>
//                 <div className="text-lg font-bold text-emerald-800">{stateSummary.avgBedOccupancy}%</div>
//               </div>
//               <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
//                 <div className="text-[10px] font-bold text-blue-700 uppercase">Avg Cure Rate</div>
//                 <div className="text-lg font-bold text-blue-800">{stateSummary.avgCureRate}%</div>
//               </div>
//               <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-center">
//                 <div className="text-[10px] font-bold text-teal-700 uppercase">Avg Composite Score</div>
//                 <div className="text-lg font-bold text-teal-800">{stateSummary.avgComposite}</div>
//               </div>
//             </div>
//           )}

//           {/* Matrix Table */}
//           <div className="mt-6 border-t border-gray-100 pt-4">
//             {isSearching ? (
//               <div className="w-full text-center py-16 bg-slate-50 rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center gap-3">
//                 <Loader2 className="animate-spin text-[#0B918C]" size={28} />
//                 <span className="text-slate-600 font-medium text-sm">
//                   Calculating metrics & generating all-district state rankings...
//                 </span>
//               </div>
//             ) : hasSearched && reportData.length > 0 ? (
//               <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//                 <table className="w-full text-xs text-center border-collapse whitespace-nowrap">
//                   <thead>
//                     <tr className="bg-[#114b6e] text-white font-semibold border-b border-slate-700">
//                       <th rowSpan={2} className="px-3 py-3 border-r border-slate-600">SL / RANK</th>
//                       <th rowSpan={2} className="px-4 py-3 border-r border-slate-600 text-left">DISTRICT</th>
//                       <th rowSpan={2} className="px-3 py-3 border-r border-slate-600">Bed Occupancy (%)</th>
//                       <th rowSpan={2} className="px-3 py-3 border-r border-slate-600">No. of Admissions</th>
//                       <th colSpan={2} className="px-4 py-1.5 border-r border-slate-600 border-b border-slate-600">GENDER (%)</th>
//                       <th colSpan={3} className="px-6 py-1.5 border-r border-slate-600 border-b border-slate-600">REFERRED BY (%)</th>
//                       <th rowSpan={2} className="px-3 py-3 border-r border-slate-600">No. of Exits</th>
//                       <th colSpan={5} className="px-8 py-1.5 border-r border-slate-600 border-b border-slate-600">OUTCOME INDICATORS (%)</th>
//                       <th rowSpan={2} className="px-3 py-3 border-r border-slate-600 bg-slate-800">
//                         Composite Score [BO+CR] (%)
//                       </th>
//                       <th rowSpan={2} className="px-4 py-3 border-r border-slate-600 bg-amber-900">
//                         RANK (JAN-MAR)
//                       </th>
//                       <th rowSpan={2} className="px-3 py-3 bg-slate-800">RANK (OCT-DEC)</th>
//                     </tr>
//                     <tr className="bg-[#165a84] text-white font-medium">
//                       <th className="px-2.5 py-1.5 border-r border-slate-600">M</th>
//                       <th className="px-2.5 py-1.5 border-r border-slate-600">F</th>
//                       <th className="px-2.5 py-1.5 border-r border-slate-600">SAHIYA</th>
//                       <th className="px-2.5 py-1.5 border-r border-slate-600">AWW</th>
//                       <th className="px-2.5 py-1.5 border-r border-slate-600">Other</th>
//                       <th className="px-2.5 py-1.5 border-r border-slate-600">Cure</th>
//                       <th className="px-2.5 py-1.5 border-r border-slate-600">Defaulter</th>
//                       <th className="px-2.5 py-1.5 border-r border-slate-600">Med. Transfer</th>
//                       <th className="px-2.5 py-1.5 border-r border-slate-600">Non Respondent</th>
//                       <th className="px-2.5 py-1.5 border-r border-slate-600">Death</th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
//                     {reportData.map((row, idx) => {
//                       const isTopThree = row.rankJanMar && row.rankJanMar <= 3;
//                       return (
//                         <tr key={row.districtId || idx} className="hover:bg-slate-50 transition-colors">
//                           <td className="px-3 py-2 border-r border-gray-200 font-bold text-slate-600">
//                             #{row.rankJanMar}
//                           </td>
//                           <td className="px-4 py-2 border-r border-gray-200 text-left font-bold text-slate-800 flex items-center gap-1.5">
//                             {isTopThree && <Trophy size={14} className="text-amber-500 shrink-0" />}
//                             {row.district}
//                           </td>
//                           <td className="px-3 py-2 border-r border-gray-200 bg-emerald-50 text-emerald-900 font-semibold">
//                             {fmt(row.bedOccupancy)}%
//                           </td>
//                           <td className="px-3 py-2 border-r border-gray-200 font-semibold bg-slate-50">
//                             {row.admissions ?? 0}
//                           </td>
//                           <td className="px-2.5 py-2 border-r border-gray-100">{fmt(row.gender?.m)}%</td>
//                           <td className="px-2.5 py-2 border-r border-gray-200">{fmt(row.gender?.f)}%</td>
//                           <td className="px-2.5 py-2 border-r border-gray-100">{fmt(row.referredBy?.sahiya)}%</td>
//                           <td className="px-2.5 py-2 border-r border-gray-100">{fmt(row.referredBy?.aww)}%</td>
//                           <td className="px-2.5 py-2 border-r border-gray-200">{fmt(row.referredBy?.other)}%</td>
//                           <td className="px-3 py-2 border-r border-gray-200 font-semibold bg-slate-50">
//                             {row.exits ?? 0}
//                           </td>
//                           <td className="px-2.5 py-2 border-r border-gray-100 bg-green-50 text-green-900 font-semibold">
//                             {fmt(row.outcome?.cure)}%
//                           </td>
//                           <td className="px-2.5 py-2 border-r border-gray-100">{fmt(row.outcome?.defaulter)}%</td>
//                           <td className="px-2.5 py-2 border-r border-gray-100">{fmt(row.outcome?.medTransfer)}%</td>
//                           <td className="px-2.5 py-2 border-r border-gray-100">{fmt(row.outcome?.nonRespondent)}%</td>
//                           <td className="px-2.5 py-2 border-r border-gray-200">{fmt(row.outcome?.death)}%</td>
//                           <td className="px-3 py-2 border-r border-gray-200 font-bold text-slate-800 bg-slate-100">
//                             {fmt(row.compositeScore)}
//                           </td>
//                           <td className="px-3 py-2 border-r border-gray-200 font-extrabold text-sm bg-amber-50/60 text-amber-950">
//                             <div className="flex items-center justify-center gap-1.5">
//                               <span>#{row.rankJanMar ?? "-"}</span>
//                               {row.rankChange?.type === "up" && (
//                                 <span className="inline-flex items-center px-1 rounded bg-emerald-100 text-emerald-800 text-[10px]">
//                                   <ArrowUp size={10} className="mr-0.5" /> {row.rankChange.value}
//                                 </span>
//                               )}
//                               {row.rankChange?.type === "down" && (
//                                 <span className="inline-flex items-center px-1 rounded bg-rose-100 text-rose-800 text-[10px]">
//                                   <ArrowDown size={10} className="mr-0.5" /> {row.rankChange.value}
//                                 </span>
//                               )}
//                               {row.rankChange?.type === "neutral" && (
//                                 <span className="text-gray-400"><Minus size={10} /></span>
//                               )}
//                             </div>
//                           </td>
//                           <td className="px-3 py-2 font-semibold bg-slate-50 text-slate-600">
//                             #{row.rankOctDec ?? "-"}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <div className="w-full text-center py-16 bg-slate-50 rounded-lg border border-dashed border-slate-300">
//                 <div className="text-slate-500 text-sm">No district data found for the selected date range.</div>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Search as SearchIcon,
  Loader2,
  Building2,
  Trophy,
  ArrowUp,
  ArrowDown,
  Minus,
  FileSpreadsheet,
  FileText,
} from "lucide-react";

interface District {
  id: string;
  name: string;
}

interface OutcomeData {
  cure: number;
  defaulter: number;
  medTransfer: number;
  nonRespondent: number;
  death: number;
}

interface DistrictFactsheetRecord {
  sl: number;
  districtId: string;
  district: string;
  bedOccupancy: number;
  admissions: number;
  gender: { m: number; f: number };
  referredBy: { sahiya: number; aww: number; other: number };
  exits: number;
  outcome: OutcomeData;
  compositeScore: number;
  rankJanMar: number;
  rankChange: { type: "up" | "down" | "neutral"; value: number };
  rankOctDec: number;
}

export default function StateAndDistrictAnnualFactsheet() {
  const currentYear = new Date().getFullYear();

  // District Selection State
  const [districts, setDistricts] = useState<District[]>([]);
  const [isDistrictsLoading, setIsDistrictsLoading] = useState<boolean>(true);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("ALL");

  // Form Filter State
  const [fromDate, setFromDate] = useState<string>(`${currentYear}-01-01`);
  const [toDate, setToDate] = useState<string>(new Date().toISOString().split("T")[0]);

  // Report & UI State
  const [reportData, setReportData] = useState<DistrictFactsheetRecord[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Load District Dropdown Options
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        setIsDistrictsLoading(true);
        const res = await fetch("/api/districts");
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          const formatted: District[] = json.data.map((d: any) => ({
            id: String(d.district_id || d.id),
            name: String(d.district_name || d.name || d.district).toUpperCase(),
          }));
          setDistricts(formatted);
        }
      } catch (err) {
        console.error("Error loading districts list:", err);
      } finally {
        setIsDistrictsLoading(false);
      }
    };

    fetchDistricts();
  }, []);

  // Fetch Report Data
  const handleSearch = async () => {
    setIsSearching(true);
    setErrorMsg(null);
    setHasSearched(true);

    try {
      const queryParams = new URLSearchParams({
        fromDate,
        toDate,
        ...(selectedDistrict !== "ALL" && { districtName: selectedDistrict }),
      });

      const res = await fetch(`/api/mtc-state-report/factsheet?${queryParams.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || json.details || "Failed to fetch factsheet data.");
      }

      setReportData(json.data || []);
    } catch (err: unknown) {
      console.error("Factsheet error:", err);
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(message);
      setReportData([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Initial Auto-Fetch
  useEffect(() => {
    handleSearch();
  }, []);

  // Aggregate State Totals
  const stateSummary = useMemo(() => {
    if (!reportData.length) return null;

    const count = reportData.length;
    const totalAdmissions = reportData.reduce((acc, curr) => acc + (curr.admissions || 0), 0);
    const totalExits = reportData.reduce((acc, curr) => acc + (curr.exits || 0), 0);
    const avgBedOccupancy = reportData.reduce((acc, curr) => acc + (curr.bedOccupancy || 0), 0) / count;
    const avgCureRate = reportData.reduce((acc, curr) => acc + (curr.outcome?.cure || 0), 0) / count;
    const avgComposite = reportData.reduce((acc, curr) => acc + (curr.compositeScore || 0), 0) / count;

    return {
      totalDistricts: count,
      totalAdmissions,
      totalExits,
      avgBedOccupancy: avgBedOccupancy.toFixed(1),
      avgCureRate: avgCureRate.toFixed(1),
      avgComposite: avgComposite.toFixed(1),
    };
  }, [reportData]);

  const fmt = (val: number | undefined) => (val ?? 0).toFixed(1);

  // --- EXCEL EXPORT HANDLER ---
  const handleExportExcel = async () => {
    if (!reportData.length) return;

    try {
      const XLSX = await import("xlsx");

      const exportRows = reportData.map((row) => ({
        "SL / RANK": `#${row.rankJanMar}`,
        DISTRICT: row.district,
        "BED OCCUPANCY (%)": Number(fmt(row.bedOccupancy)),
        ADMISSIONS: row.admissions,
        "GENDER MALE (%)": Number(fmt(row.gender?.m)),
        "GENDER FEMALE (%)": Number(fmt(row.gender?.f)),
        "REFERRED SAHIYA (%)": Number(fmt(row.referredBy?.sahiya)),
        "REFERRED AWW (%)": Number(fmt(row.referredBy?.aww)),
        "REFERRED OTHER (%)": Number(fmt(row.referredBy?.other)),
        EXITS: row.exits,
        "CURE (%)": Number(fmt(row.outcome?.cure)),
        "DEFAULTER (%)": Number(fmt(row.outcome?.defaulter)),
        "MED. TRANSFER (%)": Number(fmt(row.outcome?.medTransfer)),
        "NON RESPONDENT (%)": Number(fmt(row.outcome?.nonRespondent)),
        "DEATH (%)": Number(fmt(row.outcome?.death)),
        "COMPOSITE SCORE (%)": Number(fmt(row.compositeScore)),
        "RANK (JAN-MAR)": row.rankJanMar,
        "RANK (OCT-DEC)": row.rankOctDec,
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportRows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Factsheet");

      XLSX.writeFile(
        workbook,
        `MTC_Factsheet_${selectedDistrict}_${fromDate}_to_${toDate}.xlsx`
      );
    } catch (err) {
      console.error("Failed to export Excel:", err);
      alert("Failed to export Excel file. Ensure 'xlsx' package is installed.");
    }
  };

  // --- PDF EXPORT HANDLER ---
  const handleExportPDF = async () => {
    if (!reportData.length) return;

    try {
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;

      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

      // Report Header Title
      doc.setFontSize(14);
      doc.setTextColor(11, 145, 140);
      doc.text("State & District Annual Factsheet Report", 14, 15);

      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text(
        `Scope: ${selectedDistrict === "ALL" ? "All Districts" : selectedDistrict} | Period: ${fromDate} to ${toDate}`,
        14,
        21
      );

      // Construct Table Data Rows
      const tableHeaders = [
        [
          "Rank",
          "District",
          "Bed Occ %",
          "Admissions",
          "M %",
          "F %",
          "Sahiya %",
          "AWW %",
          "Other %",
          "Exits",
          "Cure %",
          "Defaulter %",
          "Med. Trans %",
          "Non Resp %",
          "Death %",
          "Composite",
          "Rank (J-M)",
          "Rank (O-D)",
        ],
      ];

      const tableBody = reportData.map((row) => [
        `#${row.rankJanMar}`,
        row.district,
        `${fmt(row.bedOccupancy)}%`,
        row.admissions,
        `${fmt(row.gender?.m)}%`,
        `${fmt(row.gender?.f)}%`,
        `${fmt(row.referredBy?.sahiya)}%`,
        `${fmt(row.referredBy?.aww)}%`,
        `${fmt(row.referredBy?.other)}%`,
        row.exits,
        `${fmt(row.outcome?.cure)}%`,
        `${fmt(row.outcome?.defaulter)}%`,
        `${fmt(row.outcome?.medTransfer)}%`,
        `${fmt(row.outcome?.nonRespondent)}%`,
        `${fmt(row.outcome?.death)}%`,
        fmt(row.compositeScore),
        row.rankJanMar,
        row.rankOctDec,
      ]);

      autoTable(doc, {
        head: tableHeaders,
        body: tableBody,
        startY: 26,
        styles: { fontSize: 7, halign: "center" },
        headStyles: { fillColor: [17, 75, 110], textColor: [255, 255, 255] },
        columnStyles: { 1: { halign: "left", fontStyle: "bold" } },
      });

      doc.save(`MTC_Factsheet_${selectedDistrict}_${fromDate}_to_${toDate}.pdf`);
    } catch (err) {
      console.error("Failed to export PDF:", err);
      alert("Failed to export PDF file. Ensure 'jspdf' and 'jspdf-autotable' packages are installed.");
    }
  };

  return (
    <div className="w-full max-w-[96rem] mx-auto mt-6 px-4 pb-12 font-sans">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-800 to-[#0B918C] px-6 py-4 text-white flex flex-wrap justify-between items-center gap-4">
          <div>
            <h5 className="text-xl font-bold m-0 tracking-wide">
              State & District Annual Factsheet
            </h5>
            <p className="text-xs text-emerald-100 m-0 mt-1">
              State Administrative View • Complete District Performance Matrix & Rankings
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-1.5 text-white">
              <Building2 size={14} /> State Level Access
            </span>
          </div>
        </div>

        {/* Filter Controls & Export Buttons */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 items-end">
            
            {/* From Date */}
            <div className="lg:col-span-2 flex flex-col gap-1">
              <label htmlFor="txt_FromDate" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                From Date
              </label>
              <div className="relative">
                <input
                  id="txt_FromDate"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full pl-3 pr-9 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
                />
                <Calendar size={16} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* To Date */}
            <div className="lg:col-span-2 flex flex-col gap-1">
              <label htmlFor="txt_ToDate" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                To Date
              </label>
              <div className="relative">
                <input
                  id="txt_ToDate"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full pl-3 pr-9 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
                />
                <Calendar size={16} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* District Select Filter */}
            <div className="lg:col-span-3 flex flex-col gap-1">
              <label htmlFor="ddl_District" className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                District Filter
              </label>
              <select
                id="ddl_District"
                value={selectedDistrict}
                disabled={isDistrictsLoading}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] disabled:bg-gray-100 font-medium"
              >
                <option value="ALL">JHARKHAND (ALL DISTRICTS)</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Action Button */}
            <div className="lg:col-span-3">
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-semibold rounded-md text-white bg-[#0B918C] hover:bg-[#08736f] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B918C] disabled:opacity-50"
              >
                {isSearching ? <Loader2 size={16} className="animate-spin" /> : <SearchIcon size={16} />}
                {isSearching ? "Loading..." : "Generate Report"}
              </button>
            </div>

          </div>

          {/* Export Action Toolbar */}
          {hasSearched && reportData.length > 0 && (
            <div className="mt-4 flex justify-end items-center gap-2 border-t pt-4 border-gray-100">
              <span className="text-xs text-gray-500 font-medium mr-2">Export Factsheet:</span>
              <button
                type="button"
                onClick={handleExportExcel}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-300 rounded hover:bg-emerald-100 transition-colors"
              >
                <FileSpreadsheet size={15} /> Excel
              </button>
              <button
                type="button"
                onClick={handleExportPDF}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-300 rounded hover:bg-rose-100 transition-colors"
              >
                <FileText size={15} /> PDF
              </button>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="mt-4 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-sm">
              {errorMsg}
            </div>
          )}

          {/* Summary Indicator Cards */}
          {hasSearched && stateSummary && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Total Districts</div>
                <div className="text-lg font-bold text-slate-800">{stateSummary.totalDistricts}</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                <div className="text-[10px] font-bold text-slate-500 uppercase">State Admissions</div>
                <div className="text-lg font-bold text-slate-800">{stateSummary.totalAdmissions.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                <div className="text-[10px] font-bold text-slate-500 uppercase">State Exits</div>
                <div className="text-lg font-bold text-slate-800">{stateSummary.totalExits.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
                <div className="text-[10px] font-bold text-emerald-700 uppercase">Avg Bed Occupancy</div>
                <div className="text-lg font-bold text-emerald-800">{stateSummary.avgBedOccupancy}%</div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                <div className="text-[10px] font-bold text-blue-700 uppercase">Avg Cure Rate</div>
                <div className="text-lg font-bold text-blue-800">{stateSummary.avgCureRate}%</div>
              </div>
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-center">
                <div className="text-[10px] font-bold text-teal-700 uppercase">Avg Composite Score</div>
                <div className="text-lg font-bold text-teal-800">{stateSummary.avgComposite}</div>
              </div>
            </div>
          )}

          {/* Matrix Table */}
          <div className="mt-6 border-t border-gray-100 pt-4">
            {isSearching ? (
              <div className="w-full text-center py-16 bg-slate-50 rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center gap-3">
                <Loader2 className="animate-spin text-[#0B918C]" size={28} />
                <span className="text-slate-600 font-medium text-sm">
                  Fetching district records & compiling factsheet data...
                </span>
              </div>
            ) : hasSearched && reportData.length > 0 ? (
              <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="w-full text-xs text-center border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-[#114b6e] text-white font-semibold border-b border-slate-700">
                      <th rowSpan={2} className="px-3 py-3 border-r border-slate-600">SL / RANK</th>
                      <th rowSpan={2} className="px-4 py-3 border-r border-slate-600 text-left">DISTRICT</th>
                      <th rowSpan={2} className="px-3 py-3 border-r border-slate-600">Bed Occupancy (%)</th>
                      <th rowSpan={2} className="px-3 py-3 border-r border-slate-600">No. of Admissions</th>
                      <th colSpan={2} className="px-4 py-1.5 border-r border-slate-600 border-b border-slate-600">GENDER (%)</th>
                      <th colSpan={3} className="px-6 py-1.5 border-r border-slate-600 border-b border-slate-600">REFERRED BY (%)</th>
                      <th rowSpan={2} className="px-3 py-3 border-r border-slate-600">No. of Exits</th>
                      <th colSpan={5} className="px-8 py-1.5 border-r border-slate-600 border-b border-slate-600">OUTCOME INDICATORS (%)</th>
                      <th rowSpan={2} className="px-3 py-3 border-r border-slate-600 bg-slate-800">
                        Composite Score [BO+CR] (%)
                      </th>
                      <th rowSpan={2} className="px-4 py-3 border-r border-slate-600 bg-amber-900">
                        RANK (JAN-MAR)
                      </th>
                      <th rowSpan={2} className="px-3 py-3 bg-slate-800">RANK (OCT-DEC)</th>
                    </tr>
                    <tr className="bg-[#165a84] text-white font-medium">
                      <th className="px-2.5 py-1.5 border-r border-slate-600">M</th>
                      <th className="px-2.5 py-1.5 border-r border-slate-600">F</th>
                      <th className="px-2.5 py-1.5 border-r border-slate-600">SAHIYA</th>
                      <th className="px-2.5 py-1.5 border-r border-slate-600">AWW</th>
                      <th className="px-2.5 py-1.5 border-r border-slate-600">Other</th>
                      <th className="px-2.5 py-1.5 border-r border-slate-600">Cure</th>
                      <th className="px-2.5 py-1.5 border-r border-slate-600">Defaulter</th>
                      <th className="px-2.5 py-1.5 border-r border-slate-600">Med. Transfer</th>
                      <th className="px-2.5 py-1.5 border-r border-slate-600">Non Respondent</th>
                      <th className="px-2.5 py-1.5 border-r border-slate-600">Death</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
                    {reportData.map((row) => {
                      const isTopThree = row.rankJanMar > 0 && row.rankJanMar <= 3;
                      return (
                        <tr key={row.districtId} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-2 border-r border-gray-200 font-bold text-slate-600">
                            #{row.rankJanMar}
                          </td>
                          <td className="px-4 py-2 border-r border-gray-200 text-left font-bold text-slate-800 flex items-center gap-1.5">
                            {isTopThree && <Trophy size={14} className="text-amber-500 shrink-0" />}
                            {row.district}
                          </td>
                          <td className="px-3 py-2 border-r border-gray-200 bg-emerald-50 text-emerald-900 font-semibold">
                            {fmt(row.bedOccupancy)}%
                          </td>
                          <td className="px-3 py-2 border-r border-gray-200 font-semibold bg-slate-50">
                            {row.admissions ?? 0}
                          </td>
                          <td className="px-2.5 py-2 border-r border-gray-100">{fmt(row.gender?.m)}%</td>
                          <td className="px-2.5 py-2 border-r border-gray-200">{fmt(row.gender?.f)}%</td>
                          <td className="px-2.5 py-2 border-r border-gray-100">{fmt(row.referredBy?.sahiya)}%</td>
                          <td className="px-2.5 py-2 border-r border-gray-100">{fmt(row.referredBy?.aww)}%</td>
                          <td className="px-2.5 py-2 border-r border-gray-200">{fmt(row.referredBy?.other)}%</td>
                          <td className="px-3 py-2 border-r border-gray-200 font-semibold bg-slate-50">
                            {row.exits ?? 0}
                          </td>
                          <td className="px-2.5 py-2 border-r border-gray-100 bg-green-50 text-green-900 font-semibold">
                            {fmt(row.outcome?.cure)}%
                          </td>
                          <td className="px-2.5 py-2 border-r border-gray-100">{fmt(row.outcome?.defaulter)}%</td>
                          <td className="px-2.5 py-2 border-r border-gray-100">{fmt(row.outcome?.medTransfer)}%</td>
                          <td className="px-2.5 py-2 border-r border-gray-100">{fmt(row.outcome?.nonRespondent)}%</td>
                          <td className="px-2.5 py-2 border-r border-gray-200">{fmt(row.outcome?.death)}%</td>
                          <td className="px-3 py-2 border-r border-gray-200 font-bold text-slate-800 bg-slate-100">
                            {fmt(row.compositeScore)}
                          </td>
                          <td className="px-3 py-2 border-r border-gray-200 font-extrabold text-sm bg-amber-50/60 text-amber-950">
                            <div className="flex items-center justify-center gap-1.5">
                              <span>{row.rankJanMar}</span>
                              {row.rankChange?.type === "up" && (
                                <span className="inline-flex items-center px-1 rounded bg-emerald-100 text-emerald-800 text-[10px]">
                                  <ArrowUp size={10} className="mr-0.5" /> {row.rankChange.value}
                                </span>
                              )}
                              {row.rankChange?.type === "down" && (
                                <span className="inline-flex items-center px-1 rounded bg-rose-100 text-rose-800 text-[10px]">
                                  <ArrowDown size={10} className="mr-0.5" /> {row.rankChange.value}
                                </span>
                              )}
                              {row.rankChange?.type === "neutral" && (
                                <span className="text-gray-400"><Minus size={10} /></span>
                              )}
                            </div>
                          </td>
                          <td className="px-3 py-2 font-semibold bg-slate-50 text-slate-600">
                            {row.rankOctDec}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="w-full text-center py-16 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <div className="text-slate-500 text-sm">No district data found.</div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}