// // // "use client";

// // // import React, { useState } from "react";
// // // import { Calendar, Search as SearchIcon } from "lucide-react";

// // // // Data Constants
// // // const YEARS = Array.from({ length: 26 }, (_, i) => (2001 + i).toString());

// // // const MONTHS = [
// // //   { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
// // //   { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
// // //   { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
// // //   { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
// // // ];

// // // export default function BedOccupancyDistrictReport() {
// // //   // Report Type State
// // //   const [reportType, setReportType] = useState<"Daily" | "Monthly">("Monthly");

// // //   // Form Field State
// // //   const [fromDate, setFromDate] = useState<string>("2026-04-11");
// // //   const [year, setYear] = useState<string>("");
// // //   const [month, setMonth] = useState<string>("");

// // //   const handleSearch = () => {
// // //     const payload = reportType === "Daily" 
// // //       ? { type: "Daily", date: fromDate }
// // //       : { type: "Monthly", year, month };
      
// // //     console.log("Generating Bed Occupancy Report for:", payload);
// // //     // Add logic to fetch and display the report data here
// // //   };

// // //   return (
// // //     <div className="w-full mt-8 relative">
// // //       {/* Outer Card with Shadow */}
// // //       <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
// // //         {/* Card Header */}
// // //         <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
// // //           <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
// // //             Bed Occupancy Report By District
// // //           </h5>
// // //         </div>

// // //         {/* Card Body */}
// // //         <div className="p-4 md:p-6 text-sm">
          
// // //           {/* Radio Buttons for Report Type */}
// // //           <div className="flex items-center gap-6 mb-6 px-1">
// // //             <label className="flex items-center gap-2 cursor-pointer group">
// // //               <input 
// // //                 type="radio" 
// // //                 name="reportType" 
// // //                 value="Daily"
// // //                 checked={reportType === "Daily"}
// // //                 onChange={() => setReportType("Daily")}
// // //                 className="w-4 h-4 text-[#0B918C] border-gray-300 focus:ring-[#0B918C] cursor-pointer"
// // //               />
// // //               <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Daily</span>
// // //             </label>
            
// // //             <label className="flex items-center gap-2 cursor-pointer group">
// // //               <input 
// // //                 type="radio" 
// // //                 name="reportType" 
// // //                 value="Monthly"
// // //                 checked={reportType === "Monthly"}
// // //                 onChange={() => setReportType("Monthly")}
// // //                 className="w-4 h-4 text-[#0B918C] border-gray-300 focus:ring-[#0B918C] cursor-pointer"
// // //               />
// // //               <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Monthly</span>
// // //             </label>
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            
// // //             {/* Conditional Rendering based on Report Type */}
// // //             {reportType === "Daily" ? (
// // //               // Daily View: Shows Date input
// // //               <div className="lg:col-span-2 flex flex-col gap-1 animate-in fade-in zoom-in duration-200">
// // //                 <label htmlFor="txt_FromDate" className="font-medium text-gray-700">Date</label>
// // //                 <div className="relative">
// // //                   <input
// // //                     id="txt_FromDate"
// // //                     type="date"
// // //                     value={fromDate}
// // //                     onChange={(e) => setFromDate(e.target.value)}
// // //                     className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] h-[38px]"
// // //                   />
// // //                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
// // //                     <Calendar size={16} />
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ) : (
// // //               // Monthly View: Shows Year and Month selects
// // //               <>
// // //                 <div className="lg:col-span-2 flex flex-col gap-1 animate-in fade-in zoom-in duration-200">
// // //                   <label htmlFor="dd_Year" className="font-medium text-gray-700">Year</label>
// // //                   <select
// // //                     id="dd_Year"
// // //                     value={year}
// // //                     onChange={(e) => setYear(e.target.value)}
// // //                     className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
// // //                   >
// // //                     <option value="">Select Year</option>
// // //                     {YEARS.map((yr) => (
// // //                       <option key={yr} value={yr}>{yr}</option>
// // //                     ))}
// // //                   </select>
// // //                 </div>

// // //                 <div className="lg:col-span-2 flex flex-col gap-1 animate-in fade-in zoom-in duration-200">
// // //                   <label htmlFor="dd_Month" className="font-medium text-gray-700">Month</label>
// // //                   <select
// // //                     id="dd_Month"
// // //                     value={month}
// // //                     onChange={(e) => setMonth(e.target.value)}
// // //                     className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
// // //                   >
// // //                     <option value="">All Months</option>
// // //                     {MONTHS.map((m) => (
// // //                       <option key={m.id} value={m.id}>{m.name}</option>
// // //                     ))}
// // //                   </select>
// // //                 </div>
// // //               </>
// // //             )}

// // //             {/* Search Button */}
// // //             <div className="lg:col-span-2 lg:pt-0 pt-2">
// // //               <button
// // //                 type="button"
// // //                 onClick={handleSearch}
// // //                 className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-[#0B918C] bg-white hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C]"
// // //               >
// // //                 <SearchIcon size={16} />
// // //                 Search
// // //               </button>
// // //             </div>

// // //           </div>

// // //           {/* Report Output Section */}
// // //           <div className="mt-8 flex justify-center border-t border-gray-100 pt-6">
// // //             <div id="div_Report" className="w-full text-center text-gray-500 pt-2">
// // //               {/* The table or data result will be rendered here */}
// // //             </div>
// // //           </div>
          
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import React, { useState } from "react";
// // import { Calendar, Search as SearchIcon, Download, RefreshCw } from "lucide-react";

// // // Data Constants
// // const YEARS = Array.from({ length: 26 }, (_, i) => (2001 + i).toString());

// // const MONTHS = [
// //   { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
// //   { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
// //   { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
// //   { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
// // ];

// // const QUARTERS = [
// //   { id: "Q1", name: "Quarter 1 (Jan - Mar)" },
// //   { id: "Q2", name: "Quarter 2 (Apr - Jun)" },
// //   { id: "Q3", name: "Quarter 3 (Jul - Sep)" },
// //   { id: "Q4", name: "Quarter 4 (Oct - Dec)" },
// // ];

// // // District Data Structure with 3 Core Metrics
// // interface DistrictReportRow {
// //   id: string;
// //   districtName: string;
// //   totalAvailableBeds: number;
// //   bedsOccupied: number;
// //   occupancyRate: number;
// // }

// // const MOCK_DISTRICT_DATA: DistrictReportRow[] = [
// //   { id: "1", districtName: "Ranchi", totalAvailableBeds: 1200, bedsOccupied: 895, occupancyRate: 74.58 },
// //   { id: "2", districtName: "Dhanbad", totalAvailableBeds: 950, bedsOccupied: 712, occupancyRate: 74.95 },
// //   { id: "3", districtName: "Jamshedpur (East Singhbhum)", totalAvailableBeds: 1100, bedsOccupied: 848, occupancyRate: 77.09 },
// //   { id: "4", districtName: "Bokaro", totalAvailableBeds: 800, bedsOccupied: 548, occupancyRate: 68.50 },
// //   { id: "5", districtName: "Hazaribagh", totalAvailableBeds: 650, bedsOccupied: 435, occupancyRate: 66.92 },
// //   { id: "6", districtName: "Giridih", totalAvailableBeds: 500, bedsOccupied: 360, occupancyRate: 72.00 },
// //   { id: "7", districtName: "Deoghar", totalAvailableBeds: 600, bedsOccupied: 450, occupancyRate: 75.00 },
// //   { id: "8", districtName: "Palamu", totalAvailableBeds: 550, bedsOccupied: 388, occupancyRate: 70.55 },
// // ];

// // export default function BedOccupancyDistrictReport() {
// //   // Report Type State
// //   const [reportType, setReportType] = useState<"Daily" | "Monthly" | "Quarterly">("Monthly");

// //   // Form Field State
// //   const [fromDate, setFromDate] = useState<string>("2026-04-11");
// //   const [year, setYear] = useState<string>("2026");
// //   const [month, setMonth] = useState<string>("4");
// //   const [quarter, setQuarter] = useState<string>("Q2");

// //   // Results State
// //   const [reportData, setReportData] = useState<DistrictReportRow[] | null>(null);
// //   const [isLoading, setIsLoading] = useState<boolean>(false);
// //   const [appliedPayload, setAppliedPayload] = useState<string>("");

// //   const handleSearch = () => {
// //     setIsLoading(true);

// //     let summaryText = "";
// //     let payload = {};

// //     if (reportType === "Daily") {
// //       payload = { type: "Daily", date: fromDate };
// //       summaryText = `Daily Report for ${fromDate}`;
// //     } else if (reportType === "Monthly") {
// //       const monthObj = MONTHS.find((m) => m.id === month);
// //       payload = { type: "Monthly", year, month };
// //       summaryText = `Monthly Report for ${monthObj ? monthObj.name : "All Months"} ${year}`;
// //     } else {
// //       const qtrObj = QUARTERS.find((q) => q.id === quarter);
// //       payload = { type: "Quarterly", year, quarter };
// //       summaryText = `Quarterly Report for ${qtrObj ? qtrObj.name : quarter} ${year}`;
// //     }

// //     console.log("Generating Bed Occupancy Report for:", payload);

// //     // Simulate API fetch delay
// //     setTimeout(() => {
// //       setReportData(MOCK_DISTRICT_DATA);
// //       setAppliedPayload(summaryText);
// //       setIsLoading(false);
// //     }, 400);
// //   };

// //   // Helper calculations for totals footer
// //   const totalAvailableBeds = reportData?.reduce((acc, row) => acc + row.totalAvailableBeds, 0) || 0;
// //   const totalOccupiedBeds = reportData?.reduce((acc, row) => acc + row.bedsOccupied, 0) || 0;
// //   const avgOccupancyRate = totalAvailableBeds > 0 ? ((totalOccupiedBeds / totalAvailableBeds) * 100).toFixed(2) : "0.00";

// //   return (
// //     <div className="w-full mt-8 relative">
// //       {/* Outer Card */}
// //       <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
// //         {/* Card Header */}
// //         <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl flex justify-between items-center">
// //           <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
// //             Bed Occupancy Report By District
// //           </h5>
// //         </div>

// //         {/* Card Body */}
// //         <div className="p-4 md:p-6 text-sm">
          
// //           {/* Radio Buttons for Report Type */}
// //           <div className="flex items-center gap-6 mb-6 px-1">
// //             <label className="flex items-center gap-2 cursor-pointer group">
// //               <input 
// //                 type="radio" 
// //                 name="reportType" 
// //                 value="Daily"
// //                 checked={reportType === "Daily"}
// //                 onChange={() => setReportType("Daily")}
// //                 className="w-4 h-4 text-[#0B918C] border-gray-300 focus:ring-[#0B918C] cursor-pointer"
// //               />
// //               <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Daily</span>
// //             </label>
            
// //             <label className="flex items-center gap-2 cursor-pointer group">
// //               <input 
// //                 type="radio" 
// //                 name="reportType" 
// //                 value="Monthly"
// //                 checked={reportType === "Monthly"}
// //                 onChange={() => setReportType("Monthly")}
// //                 className="w-4 h-4 text-[#0B918C] border-gray-300 focus:ring-[#0B918C] cursor-pointer"
// //               />
// //               <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Monthly</span>
// //             </label>

// //             <label className="flex items-center gap-2 cursor-pointer group">
// //               <input 
// //                 type="radio" 
// //                 name="reportType" 
// //                 value="Quarterly"
// //                 checked={reportType === "Quarterly"}
// //                 onChange={() => setReportType("Quarterly")}
// //                 className="w-4 h-4 text-[#0B918C] border-gray-300 focus:ring-[#0B918C] cursor-pointer"
// //               />
// //               <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Quarterly</span>
// //             </label>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            
// //             {/* Daily View */}
// //             {reportType === "Daily" && (
// //               <div className="lg:col-span-2 flex flex-col gap-1 animate-in fade-in zoom-in duration-200">
// //                 <label htmlFor="txt_FromDate" className="font-medium text-gray-700">Date</label>
// //                 <div className="relative">
// //                   <input
// //                     id="txt_FromDate"
// //                     type="date"
// //                     value={fromDate}
// //                     onChange={(e) => setFromDate(e.target.value)}
// //                     className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] h-[38px]"
// //                   />
// //                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
// //                     <Calendar size={16} />
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Monthly View */}
// //             {reportType === "Monthly" && (
// //               <>
// //                 <div className="lg:col-span-2 flex flex-col gap-1 animate-in fade-in zoom-in duration-200">
// //                   <label htmlFor="dd_Year" className="font-medium text-gray-700">Year</label>
// //                   <select
// //                     id="dd_Year"
// //                     value={year}
// //                     onChange={(e) => setYear(e.target.value)}
// //                     className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
// //                   >
// //                     <option value="">Select Year</option>
// //                     {YEARS.map((yr) => (
// //                       <option key={yr} value={yr}>{yr}</option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div className="lg:col-span-2 flex flex-col gap-1 animate-in fade-in zoom-in duration-200">
// //                   <label htmlFor="dd_Month" className="font-medium text-gray-700">Month</label>
// //                   <select
// //                     id="dd_Month"
// //                     value={month}
// //                     onChange={(e) => setMonth(e.target.value)}
// //                     className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
// //                   >
// //                     <option value="">All Months</option>
// //                     {MONTHS.map((m) => (
// //                       <option key={m.id} value={m.id}>{m.name}</option>
// //                     ))}
// //                   </select>
// //                 </div>
// //               </>
// //             )}

// //             {/* Quarterly View */}
// //             {reportType === "Quarterly" && (
// //               <>
// //                 <div className="lg:col-span-2 flex flex-col gap-1 animate-in fade-in zoom-in duration-200">
// //                   <label htmlFor="dd_Year_Qtr" className="font-medium text-gray-700">Year</label>
// //                   <select
// //                     id="dd_Year_Qtr"
// //                     value={year}
// //                     onChange={(e) => setYear(e.target.value)}
// //                     className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
// //                   >
// //                     <option value="">Select Year</option>
// //                     {YEARS.map((yr) => (
// //                       <option key={yr} value={yr}>{yr}</option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div className="lg:col-span-2 flex flex-col gap-1 animate-in fade-in zoom-in duration-200">
// //                   <label htmlFor="dd_Quarter" className="font-medium text-gray-700">Quarter</label>
// //                   <select
// //                     id="dd_Quarter"
// //                     value={quarter}
// //                     onChange={(e) => setQuarter(e.target.value)}
// //                     className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
// //                   >
// //                     <option value="">Select Quarter</option>
// //                     {QUARTERS.map((q) => (
// //                       <option key={q.id} value={q.id}>{q.name}</option>
// //                     ))}
// //                   </select>
// //                 </div>
// //               </>
// //             )}

// //             {/* Search Button */}
// //             <div className="lg:col-span-2 lg:pt-0 pt-2 flex items-center gap-2">
// //               <button
// //                 type="button"
// //                 onClick={handleSearch}
// //                 disabled={isLoading}
// //                 className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-[#0B918C] bg-white hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C] disabled:opacity-50"
// //               >
// //                 {isLoading ? (
// //                   <RefreshCw size={16} className="animate-spin" />
// //                 ) : (
// //                   <SearchIcon size={16} />
// //                 )}
// //                 Search
// //               </button>
// //             </div>

// //           </div>

// //           {/* Report Output Section */}
// //           <div className="mt-8 border-t border-gray-200 pt-6">
// //             <div id="div_Report" className="w-full">
// //               {!reportData && !isLoading && (
// //                 <p className="text-center text-gray-500 py-6">
// //                   Select report filters and click <strong>Search</strong> to generate the district bed occupancy report.
// //                 </p>
// //               )}

// //               {isLoading && (
// //                 <div className="text-center py-8 text-[#0B918C] flex flex-col items-center gap-2">
// //                   <RefreshCw size={24} className="animate-spin" />
// //                   <span>Loading report data...</span>
// //                 </div>
// //               )}

// //               {reportData && !isLoading && (
// //                 <div className="space-y-4 animate-in fade-in duration-300">
                  
// //                   {/* Table Header / Summary Action Bar */}
// //                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-teal-50/60 p-3 rounded-lg border border-teal-100">
// //                     <div>
// //                       <span className="font-semibold text-gray-800">Showing Results: </span>
// //                       <span className="text-[#0B918C] font-medium">{appliedPayload}</span>
// //                     </div>
// //                     <button 
// //                       onClick={() => alert("Downloading CSV report...")}
// //                       className="inline-flex items-center gap-1.5 text-xs text-[#0B918C] border border-[#0B918C] bg-white px-3 py-1.5 rounded hover:bg-teal-50 transition-colors font-medium"
// //                     >
// //                       <Download size={14} />
// //                       Export Report
// //                     </button>
// //                   </div>

// //                   {/* Responsive Data Table - Exactly 3 Data Columns */}
// //                   <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
// //                     <table className="w-full text-left border-collapse">
// //                       <thead>
// //                         <tr className="bg-gray-100 text-gray-700 text-xs uppercase font-semibold border-b border-gray-200">
// //                           <th className="py-3 px-4 w-12">#</th>
// //                           <th className="py-3 px-4">District Name</th>
// //                           <th className="py-3 px-4 text-right">Total Available Beds</th>
// //                           <th className="py-3 px-4 text-right">Beds Occupied</th>
// //                           <th className="py-3 px-4 text-right">Bed Occupancy Rate (%)</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody className="divide-y divide-gray-200 text-gray-700">
// //                         {reportData.map((row, index) => (
// //                           <tr key={row.id} className="hover:bg-gray-50 transition-colors">
// //                             <td className="py-3 px-4 font-medium text-gray-400">{index + 1}</td>
// //                             <td className="py-3 px-4 font-semibold text-gray-900">{row.districtName}</td>
// //                             <td className="py-3 px-4 text-right font-medium">{row.totalAvailableBeds.toLocaleString()}</td>
// //                             <td className="py-3 px-4 text-right font-medium">{row.bedsOccupied.toLocaleString()}</td>
// //                             <td className="py-3 px-4 text-right font-semibold">
// //                               <span className={`inline-block px-2.5 py-0.5 rounded text-xs ${
// //                                 row.occupancyRate > 75 
// //                                   ? "bg-amber-100 text-amber-800" 
// //                                   : "bg-emerald-100 text-emerald-800"
// //                               }`}>
// //                                 {row.occupancyRate.toFixed(2)}%
// //                               </span>
// //                             </td>
// //                           </tr>
// //                         ))}
// //                       </tbody>
// //                       {/* Table Footer / Summary Row */}
// //                       <tfoot>
// //                         <tr className="bg-gray-100 font-bold text-gray-800 border-t-2 border-gray-300">
// //                           <td className="py-3 px-4" colSpan={2}>State Total</td>
// //                           <td className="py-3 px-4 text-right">{totalAvailableBeds.toLocaleString()}</td>
// //                           <td className="py-3 px-4 text-right">{totalOccupiedBeds.toLocaleString()}</td>
// //                           <td className="py-3 px-4 text-right text-[#0B918C]">{avgOccupancyRate}%</td>
// //                         </tr>
// //                       </tfoot>
// //                     </table>
// //                   </div>

// //                 </div>
// //               )}
// //             </div>
// //           </div>
          
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState } from "react";
// import { Calendar, Search as SearchIcon, Download, RefreshCw, AlertCircle } from "lucide-react";

// // Data Constants
// const YEARS = Array.from({ length: 26 }, (_, i) => (2001 + i).toString());

// const MONTHS = [
//   { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
//   { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
//   { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
//   { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
// ];

// const QUARTERS = [
//   { id: "Q1", name: "Quarter 1 (Jan - Mar)" },
//   { id: "Q2", name: "Quarter 2 (Apr - Jun)" },
//   { id: "Q3", name: "Quarter 3 (Jul - Sep)" },
//   { id: "Q4", name: "Quarter 4 (Oct - Dec)" },
// ];

// interface DistrictReportRow {
//   id: string;
//   districtName: string;
//   totalAvailableBeds: number;
//   bedsOccupied: number;
//   occupancyRate: number;
// }

// export default function BedOccupancyDistrictReport() {
//   // Filter States
//   const [reportType, setReportType] = useState<"Daily" | "Monthly" | "Quarterly">("Monthly");
//   const [fromDate, setFromDate] = useState<string>("2026-04-11");
//   const [year, setYear] = useState<string>("2026");
//   const [month, setMonth] = useState<string>("4");
//   const [quarter, setQuarter] = useState<string>("Q2");

//   // API Data & Loading States
//   const [reportData, setReportData] = useState<DistrictReportRow[] | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [appliedPayload, setAppliedPayload] = useState<string>("");

//   const handleSearch = async () => {
//     setIsLoading(true);
//     setError(null);

//     let summaryText = "";
//     const params = new URLSearchParams();

//     if (reportType === "Daily") {
//       params.append("type", "Daily");
//       params.append("fromDate", fromDate);
//       summaryText = `Daily Report for ${fromDate}`;
//     } else if (reportType === "Monthly") {
//       const monthObj = MONTHS.find((m) => m.id === month);
//       params.append("type", "Monthly");
//       if (year) params.append("year", year);
//       if (month) params.append("month", month);
//       summaryText = `Monthly Report for ${monthObj ? monthObj.name : "All Months"} ${year}`;
//     } else {
//       const qtrObj = QUARTERS.find((q) => q.id === quarter);
//       params.append("type", "Quarterly");
//       if (year) params.append("year", year);
//       if (quarter) params.append("quarter", quarter);
//       summaryText = `Quarterly Report for ${qtrObj ? qtrObj.name : quarter} ${year}`;
//     }

//     try {
//       const res = await fetch(`/api/mtc-state-report/bed-occupancy-district?${params.toString()}`);
//       const json = await res.json();

//       if (!res.ok || !json.success) {
//         throw new Error(json.error || json.details || `Failed to fetch data (Status ${res.status})`);
//       }

//       setReportData(json.data || []);
//       setAppliedPayload(summaryText);
//     } catch (err: any) {
//       console.error("Fetch Error:", err);
//       setError(err.message || "An error occurred while loading the state report.");
//       setReportData(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleExportCSV = () => {
//     if (!reportData || reportData.length === 0) return;

//     const headers = ["#,District Name,Total Available Beds,Beds Occupied,Bed Occupancy Rate (%)"];
//     const rows = reportData.map((row, index) =>
//       `${index + 1},"${row.districtName}",${row.totalAvailableBeds},${row.bedsOccupied},${row.occupancyRate.toFixed(2)}%`
//     );

//     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", `District_Bed_Occupancy_${reportType}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // State Totals Calculation
//   const totalAvailableBeds = reportData?.reduce((acc, row) => acc + row.totalAvailableBeds, 0) || 0;
//   const totalOccupiedBeds = reportData?.reduce((acc, row) => acc + row.bedsOccupied, 0) || 0;
//   const avgOccupancyRate = totalAvailableBeds > 0 ? ((totalOccupiedBeds / totalAvailableBeds) * 100).toFixed(2) : "0.00";

//   return (
//     <div className="w-full mt-8 relative">
//       <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
//         {/* Card Header */}
//         <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl flex justify-between items-center">
//           <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
//             Bed Occupancy Report By District (State Level)
//           </h5>
//         </div>

//         {/* Card Body */}
//         <div className="p-4 md:p-6 text-sm">
          
//           {/* Report Type Selector */}
//           <div className="flex items-center gap-6 mb-6 px-1">
//             <label className="flex items-center gap-2 cursor-pointer group">
//               <input 
//                 type="radio" 
//                 name="reportType" 
//                 value="Daily"
//                 checked={reportType === "Daily"}
//                 onChange={() => setReportType("Daily")}
//                 className="w-4 h-4 text-[#0B918C] border-gray-300 focus:ring-[#0B918C] cursor-pointer"
//               />
//               <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Daily</span>
//             </label>
            
//             <label className="flex items-center gap-2 cursor-pointer group">
//               <input 
//                 type="radio" 
//                 name="reportType" 
//                 value="Monthly"
//                 checked={reportType === "Monthly"}
//                 onChange={() => setReportType("Monthly")}
//                 className="w-4 h-4 text-[#0B918C] border-gray-300 focus:ring-[#0B918C] cursor-pointer"
//               />
//               <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Monthly</span>
//             </label>

//             <label className="flex items-center gap-2 cursor-pointer group">
//               <input 
//                 type="radio" 
//                 name="reportType" 
//                 value="Quarterly"
//                 checked={reportType === "Quarterly"}
//                 onChange={() => setReportType("Quarterly")}
//                 className="w-4 h-4 text-[#0B918C] border-gray-300 focus:ring-[#0B918C] cursor-pointer"
//               />
//               <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Quarterly</span>
//             </label>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            
//             {/* Daily View */}
//             {reportType === "Daily" && (
//               <div className="lg:col-span-2 flex flex-col gap-1">
//                 <label htmlFor="txt_FromDate" className="font-medium text-gray-700">Date</label>
//                 <div className="relative">
//                   <input
//                     id="txt_FromDate"
//                     type="date"
//                     value={fromDate}
//                     onChange={(e) => setFromDate(e.target.value)}
//                     className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
//                   />
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
//                     <Calendar size={16} />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Monthly View */}
//             {reportType === "Monthly" && (
//               <>
//                 <div className="lg:col-span-2 flex flex-col gap-1">
//                   <label htmlFor="dd_Year" className="font-medium text-gray-700">Year</label>
//                   <select
//                     id="dd_Year"
//                     value={year}
//                     onChange={(e) => setYear(e.target.value)}
//                     className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
//                   >
//                     <option value="">Select Year</option>
//                     {YEARS.map((yr) => (
//                       <option key={yr} value={yr}>{yr}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="lg:col-span-2 flex flex-col gap-1">
//                   <label htmlFor="dd_Month" className="font-medium text-gray-700">Month</label>
//                   <select
//                     id="dd_Month"
//                     value={month}
//                     onChange={(e) => setMonth(e.target.value)}
//                     className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
//                   >
//                     <option value="">All Months</option>
//                     {MONTHS.map((m) => (
//                       <option key={m.id} value={m.id}>{m.name}</option>
//                     ))}
//                   </select>
//                 </div>
//               </>
//             )}

//             {/* Quarterly View */}
//             {reportType === "Quarterly" && (
//               <>
//                 <div className="lg:col-span-2 flex flex-col gap-1">
//                   <label htmlFor="dd_Year_Qtr" className="font-medium text-gray-700">Year</label>
//                   <select
//                     id="dd_Year_Qtr"
//                     value={year}
//                     onChange={(e) => setYear(e.target.value)}
//                     className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
//                   >
//                     <option value="">Select Year</option>
//                     {YEARS.map((yr) => (
//                       <option key={yr} value={yr}>{yr}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="lg:col-span-2 flex flex-col gap-1">
//                   <label htmlFor="dd_Quarter" className="font-medium text-gray-700">Quarter</label>
//                   <select
//                     id="dd_Quarter"
//                     value={quarter}
//                     onChange={(e) => setQuarter(e.target.value)}
//                     className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
//                   >
//                     <option value="">Select Quarter</option>
//                     {QUARTERS.map((q) => (
//                       <option key={q.id} value={q.id}>{q.name}</option>
//                     ))}
//                   </select>
//                 </div>
//               </>
//             )}

//             {/* Search Button */}
//             <div className="lg:col-span-2 lg:pt-0 pt-2 flex items-center gap-2">
//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 disabled={isLoading}
//                 className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-[#0B918C] bg-white hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B918C] disabled:opacity-50"
//               >
//                 {isLoading ? (
//                   <RefreshCw size={16} className="animate-spin" />
//                 ) : (
//                   <SearchIcon size={16} />
//                 )}
//                 Search
//               </button>
//             </div>

//           </div>

//           {/* Output Display */}
//           <div className="mt-8 border-t border-gray-200 pt-6">
//             <div id="div_Report" className="w-full">
              
//               {!reportData && !isLoading && !error && (
//                 <p className="text-center text-gray-500 py-6">
//                   Select report filters and click <strong>Search</strong> to generate the state-wide bed occupancy report by district.
//                 </p>
//               )}

//               {isLoading && (
//                 <div className="text-center py-8 text-[#0B918C] flex flex-col items-center gap-2">
//                   <RefreshCw size={24} className="animate-spin" />
//                   <span>Loading report data...</span>
//                 </div>
//               )}

//               {error && (
//                 <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
//                   <AlertCircle size={20} className="shrink-0" />
//                   <span>{error}</span>
//                 </div>
//               )}

//               {reportData && !isLoading && !error && (
//                 <div className="space-y-4">
                  
//                   {/* Action Bar */}
//                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-teal-50/60 p-3 rounded-lg border border-teal-100">
//                     <div>
//                       <span className="font-semibold text-gray-800">Showing Results: </span>
//                       <span className="text-[#0B918C] font-medium">{appliedPayload}</span>
//                     </div>
//                     <button 
//                       onClick={handleExportCSV}
//                       className="inline-flex items-center gap-1.5 text-xs text-[#0B918C] border border-[#0B918C] bg-white px-3 py-1.5 rounded hover:bg-teal-50 transition-colors font-medium"
//                     >
//                       <Download size={14} />
//                       Export Report
//                     </button>
//                   </div>

//                   {/* 3 Metric Columns Data Table */}
//                   <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//                     <table className="w-full text-left border-collapse">
//                       <thead>
//                         <tr className="bg-gray-100 text-gray-700 text-xs uppercase font-semibold border-b border-gray-200">
//                           <th className="py-3 px-4 w-12">#</th>
//                           <th className="py-3 px-4">District Name</th>
//                           <th className="py-3 px-4 text-right">Total Available Beds</th>
//                           <th className="py-3 px-4 text-right">Beds Occupied</th>
//                           <th className="py-3 px-4 text-right">Bed Occupancy Rate (%)</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-200 text-gray-700">
//                         {reportData.length === 0 ? (
//                           <tr>
//                             <td colSpan={5} className="text-center py-6 text-gray-500">
//                               No records found for the selected filter.
//                             </td>
//                           </tr>
//                         ) : (
//                           reportData.map((row, index) => (
//                             <tr key={row.id} className="hover:bg-gray-50 transition-colors">
//                               <td className="py-3 px-4 font-medium text-gray-400">{index + 1}</td>
//                               <td className="py-3 px-4 font-semibold text-gray-900">{row.districtName}</td>
//                               <td className="py-3 px-4 text-right font-medium">{row.totalAvailableBeds.toLocaleString()}</td>
//                               <td className="py-3 px-4 text-right font-medium">{row.bedsOccupied.toLocaleString()}</td>
//                               <td className="py-3 px-4 text-right font-semibold">
//                                 <span className={`inline-block px-2.5 py-0.5 rounded text-xs ${
//                                   row.occupancyRate > 75 
//                                     ? "bg-amber-100 text-amber-800" 
//                                     : "bg-emerald-100 text-emerald-800"
//                                 }`}>
//                                   {row.occupancyRate.toFixed(2)}%
//                                 </span>
//                               </td>
//                             </tr>
//                           ))
//                         )}
//                       </tbody>
//                       {reportData.length > 0 && (
//                         <tfoot>
//                           <tr className="bg-gray-100 font-bold text-gray-800 border-t-2 border-gray-300">
//                             <td className="py-3 px-4" colSpan={2}>State Total</td>
//                             <td className="py-3 px-4 text-right">{totalAvailableBeds.toLocaleString()}</td>
//                             <td className="py-3 px-4 text-right">{totalOccupiedBeds.toLocaleString()}</td>
//                             <td className="py-3 px-4 text-right text-[#0B918C]">{avgOccupancyRate}%</td>
//                           </tr>
//                         </tfoot>
//                       )}
//                     </table>
//                   </div>

//                 </div>
//               )}
//             </div>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Calendar, Search as SearchIcon, Download, RefreshCw, AlertCircle } from "lucide-react";

// Data Constants
const YEARS = Array.from({ length: 26 }, (_, i) => (2001 + i).toString());

const MONTHS = [
  { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
  { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
  { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
  { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
];

const QUARTERS = [
  { id: "Q1", name: "Quarter 1 (Jan - Mar)" },
  { id: "Q2", name: "Quarter 2 (Apr - Jun)" },
  { id: "Q3", name: "Quarter 3 (Jul - Sep)" },
  { id: "Q4", name: "Quarter 4 (Oct - Dec)" },
];

interface DistrictReportRow {
  id: string;
  districtName: string;
  totalAvailableBeds: number;
  bedsOccupied: number;
  occupancyRate: number;
}

export default function BedOccupancyDistrictReport() {
  // Filter States
  const [reportType, setReportType] = useState<"Daily" | "Monthly" | "Quarterly">("Monthly");
  const [fromDate, setFromDate] = useState<string>("2026-04-11");
  const [year, setYear] = useState<string>("2026");
  const [month, setMonth] = useState<string>("4");
  const [quarter, setQuarter] = useState<string>("Q2");

  // API Data & Loading States
  const [reportData, setReportData] = useState<DistrictReportRow[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [appliedPayload, setAppliedPayload] = useState<string>("");

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    let summaryText = "";
    const params = new URLSearchParams();

    if (reportType === "Daily") {
      params.append("type", "Daily");
      params.append("fromDate", fromDate);
      summaryText = `Daily Report for ${fromDate}`;
    } else if (reportType === "Monthly") {
      const monthObj = MONTHS.find((m) => m.id === month);
      params.append("type", "Monthly");
      if (year) params.append("year", year);
      if (month) params.append("month", month);
      summaryText = `Monthly Report for ${monthObj ? monthObj.name : "All Months"} ${year}`;
    } else {
      const qtrObj = QUARTERS.find((q) => q.id === quarter);
      params.append("type", "Quarterly");
      if (year) params.append("year", year);
      if (quarter) params.append("quarter", quarter);
      summaryText = `Quarterly Report for ${qtrObj ? qtrObj.name : quarter} ${year}`;
    }

    try {
      const res = await fetch(`/api/mtc-state-report/bed-occupancy-district?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || json.details || `Failed to fetch data (Status ${res.status})`);
      }

      setReportData(json.data || []);
      setAppliedPayload(summaryText);
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setError(err.message || "An error occurred while loading the state report.");
      setReportData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (!reportData || reportData.length === 0) return;

    const headers = ["#,District Name,Total Available Beds,Beds Occupied,Bed Occupancy Rate (%)"];
    const rows = reportData.map((row, index) =>
      `${index + 1},"${row.districtName}",${row.totalAvailableBeds},${row.bedsOccupied},${row.occupancyRate.toFixed(2)}%`
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `District_Bed_Occupancy_${reportType}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // State Totals Calculation
  const totalAvailableBeds = reportData?.reduce((acc, row) => acc + row.totalAvailableBeds, 0) || 0;
  const totalOccupiedBeds = reportData?.reduce((acc, row) => acc + row.bedsOccupied, 0) || 0;
  const avgOccupancyRate = totalAvailableBeds > 0 ? ((totalOccupiedBeds / totalAvailableBeds) * 100).toFixed(2) : "0.00";

  return (
    <div className="w-full mt-8 relative">
      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
        {/* Card Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
            Bed Occupancy Report By District (State Level)
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-4 md:p-6 text-sm">
          
          {/* Report Type Selector */}
          <div className="flex items-center gap-6 mb-6 px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="reportType" 
                value="Daily"
                checked={reportType === "Daily"}
                onChange={() => setReportType("Daily")}
                className="w-4 h-4 text-[#0B918C] border-gray-300 focus:ring-[#0B918C] cursor-pointer"
              />
              <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Daily</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="reportType" 
                value="Monthly"
                checked={reportType === "Monthly"}
                onChange={() => setReportType("Monthly")}
                className="w-4 h-4 text-[#0B918C] border-gray-300 focus:ring-[#0B918C] cursor-pointer"
              />
              <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Monthly</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="reportType" 
                value="Quarterly"
                checked={reportType === "Quarterly"}
                onChange={() => setReportType("Quarterly")}
                className="w-4 h-4 text-[#0B918C] border-gray-300 focus:ring-[#0B918C] cursor-pointer"
              />
              <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Quarterly</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            
            {/* Daily View */}
            {reportType === "Daily" && (
              <div className="lg:col-span-2 flex flex-col gap-1">
                <label htmlFor="txt_FromDate" className="font-medium text-gray-700">Date</label>
                <div className="relative">
                  <input
                    id="txt_FromDate"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <Calendar size={16} />
                  </div>
                </div>
              </div>
            )}

            {/* Monthly View */}
            {reportType === "Monthly" && (
              <>
                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label htmlFor="dd_Year" className="font-medium text-gray-700">Year</label>
                  <select
                    id="dd_Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
                  >
                    <option value="">Select Year</option>
                    {YEARS.map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label htmlFor="dd_Month" className="font-medium text-gray-700">Month</label>
                  <select
                    id="dd_Month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
                  >
                    <option value="">All Months</option>
                    {MONTHS.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Quarterly View */}
            {reportType === "Quarterly" && (
              <>
                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label htmlFor="dd_Year_Qtr" className="font-medium text-gray-700">Year</label>
                  <select
                    id="dd_Year_Qtr"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
                  >
                    <option value="">Select Year</option>
                    {YEARS.map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label htmlFor="dd_Quarter" className="font-medium text-gray-700">Quarter</label>
                  <select
                    id="dd_Quarter"
                    value={quarter}
                    onChange={(e) => setQuarter(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
                  >
                    <option value="">Select Quarter</option>
                    {QUARTERS.map((q) => (
                      <option key={q.id} value={q.id}>{q.name}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Search Button */}
            <div className="lg:col-span-2 lg:pt-0 pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-[#0B918C] bg-white hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B918C] disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <SearchIcon size={16} />
                )}
                Search
              </button>
            </div>

          </div>

          {/* Output Display */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div id="div_Report" className="w-full">
              
              {!reportData && !isLoading && !error && (
                <p className="text-center text-gray-500 py-6">
                  Select report filters and click <strong>Search</strong> to generate the state-wide bed occupancy report by district.
                </p>
              )}

              {isLoading && (
                <div className="text-center py-8 text-[#0B918C] flex flex-col items-center gap-2">
                  <RefreshCw size={24} className="animate-spin" />
                  <span>Loading report data...</span>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
                  <AlertCircle size={20} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {reportData && !isLoading && !error && (
                <div className="space-y-4">
                  
                  {/* Action Bar */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-teal-50/60 p-3 rounded-lg border border-teal-100">
                    <div>
                      <span className="font-semibold text-gray-800">Showing Results: </span>
                      <span className="text-[#0B918C] font-medium">{appliedPayload}</span>
                    </div>
                    <button 
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-1.5 text-xs text-[#0B918C] border border-[#0B918C] bg-white px-3 py-1.5 rounded hover:bg-teal-50 transition-colors font-medium"
                    >
                      <Download size={14} />
                      Export Report
                    </button>
                  </div>

                  {/* 3 Metric Columns Data Table */}
                  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700 text-xs uppercase font-semibold border-b border-gray-200">
                          <th className="py-3 px-4 w-12">#</th>
                          <th className="py-3 px-4">District Name</th>
                          <th className="py-3 px-4 text-right">Total Available Beds</th>
                          <th className="py-3 px-4 text-right">Beds Occupied</th>
                          <th className="py-3 px-4 text-right">Bed Occupancy Rate (%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-700">
                        {reportData.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center py-6 text-gray-500">
                              No records found for the selected filter.
                            </td>
                          </tr>
                        ) : (
                          reportData.map((row, index) => (
                            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                              <td className="py-3 px-4 font-medium text-gray-400">{index + 1}</td>
                              <td className="py-3 px-4 font-semibold text-gray-900">{row.districtName}</td>
                              <td className="py-3 px-4 text-right font-medium">{row.totalAvailableBeds.toLocaleString()}</td>
                              <td className="py-3 px-4 text-right font-medium">{row.bedsOccupied.toLocaleString()}</td>
                              <td className="py-3 px-4 text-right font-semibold">
                                <span className={`inline-block px-2.5 py-0.5 rounded text-xs ${
                                  row.occupancyRate > 75 
                                    ? "bg-amber-100 text-amber-800" 
                                    : "bg-emerald-100 text-emerald-800"
                                }`}>
                                  {row.occupancyRate.toFixed(2)}%
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                      {reportData.length > 0 && (
                        <tfoot>
                          <tr className="bg-gray-100 font-bold text-gray-800 border-t-2 border-gray-300">
                            <td className="py-3 px-4" colSpan={2}>State Total</td>
                            <td className="py-3 px-4 text-right">{totalAvailableBeds.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">{totalOccupiedBeds.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right text-[#0B918C]">{avgOccupancyRate}%</td>
                          </tr>
                        </tfoot>
                      )}
                    </table>
                  </div>

                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}