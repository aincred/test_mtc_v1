// // "use client";

// // import React, { useState } from "react";
// // import { Search } from "lucide-react";

// // // Data Constants
// // const YEARS = Array.from({ length: 26 }, (_, i) => (2001 + i).toString());

// // const QUARTERS = [
// //   { id: "1", name: "Annual (Apr-Mar)" },
// //   { id: "2", name: "Quarter1 (Apr-Jun)" },
// //   { id: "3", name: "Quarter2 (Jul-Sept)" },
// //   { id: "4", name: "Quarter3 (Oct-Dec)" },
// //   { id: "5", name: "Quarter4 (Jan-Mar)" },
// // ];

// // const DISTRICTS = [
// //   { id: "1", name: "BOKARO" }, { id: "2", name: "CHATRA" }, { id: "16", name: "DEOGHAR" },
// //   { id: "4", name: "DHANBAD" }, { id: "17", name: "DUMKA" }, { id: "22", name: "EAST SINGHBHUM" },
// //   { id: "14", name: "GARHWA" }, { id: "3", name: "GIRIDIH" }, { id: "18", name: "GODDA" },
// //   { id: "9", name: "GUMLA" }, { id: "6", name: "HAZARIBAGH" }, { id: "19", name: "JAMTARA" },
// //   { id: "10", name: "KHUNTI" }, { id: "7", name: "KODERMA" }, { id: "15", name: "LATEHAR" },
// //   { id: "11", name: "LOHARDAGA" }, { id: "20", name: "PAKUR" }, { id: "13", name: "PALAMU" },
// //   { id: "5", name: "RAMGARH" }, { id: "8", name: "RANCHI" }, { id: "21", name: "SAHIBGANJ" },
// //   { id: "23", name: "SERAIKELA" }, { id: "12", name: "SIMDEGA" }, { id: "24", name: "WEST SINGHBHUM" },
// // ];

// // const MTC_OPTIONS = [
// //   { id: "26", name: "BUNDU" },
// //   { id: "27", name: "DORANDA" },
// //   { id: "28", name: "MANDAR" },
// //   { id: "29", name: "BERO" },
// //   { id: "107", name: "UP REFERRAL RIMS" },
// // ];

// // export default function PerformanceRankingReport() {
// //   // Form State
// //   const [year, setYear] = useState<string>("");
// //   const [quarter, setQuarter] = useState<string>("");
// //   const [district, setDistrict] = useState<string>("");
// //   const [mtc, setMtc] = useState<string>("");

// //   const handleSearch = () => {
// //     const payload = { year, quarter, district, mtc };
// //     console.log("Generating Performance Ranking Report for:", payload);
// //   };

// //   return (
// //     <div className="w-full">
// //       {/* Card Header */}
// //       <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
// //         <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
// //           Performance Ranking By MTC
// //         </h5>
// //       </div>

// //       {/* Card Body */}
// //       <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200 p-4 md:p-6 text-sm">
        
// //         {/* Adjusted Grid: Using 10 columns for xl to match 2-4-2-2 span ratio */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 items-end">
          
// //           {/* Financial Year Select (col-xl-2 -> lg:col-span-2) */}
// //           <div className="lg:col-span-2 flex flex-col gap-1">
// //             <label htmlFor="dd_Year" className="font-medium text-gray-700">Financial Year</label>
// //             <select
// //               id="dd_Year"
// //               value={year}
// //               onChange={(e) => setYear(e.target.value)}
// //               className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
// //             >
// //               <option value="">Select Year</option>
// //               {YEARS.map((yr) => (
// //                 <option key={yr} value={yr}>{yr}</option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Quarter Select (col-xl-4 -> lg:col-span-4) */}
// //           <div className="lg:col-span-4 flex flex-col gap-1">
// //             <label htmlFor="dd_Quarter" className="font-medium text-gray-700">Quarter</label>
// //             <select
// //               id="dd_Quarter"
// //               value={quarter}
// //               onChange={(e) => setQuarter(e.target.value)}
// //               className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
// //             >
// //               <option value="">select</option>
// //               {QUARTERS.map((q) => (
// //                 <option key={q.id} value={q.id}>{q.name}</option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* District Select (col-xl-2 -> lg:col-span-2) - Disabled */}
// //           <div className="lg:col-span-2 flex flex-col gap-1">
// //             <label htmlFor="ddl_District" className="font-medium text-gray-700">District</label>
// //             <select
// //               id="ddl_District"
// //               disabled
// //               value={district}
// //               onChange={(e) => setDistrict(e.target.value)}
// //               className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-md py-1.5 px-3 cursor-not-allowed h-[38px]"
// //             >
// //               <option value="">All Districts</option>
// //               {DISTRICTS.map((d) => (
// //                 <option key={d.id} value={d.id}>{d.name}</option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Hidden MTC Select */}
// //           <div className="hidden">
// //             <label htmlFor="ddl_Mtc" className="font-medium text-gray-700">MTC</label>
// //             <select
// //               id="ddl_Mtc"
// //               value={mtc}
// //               onChange={(e) => setMtc(e.target.value)}
// //               className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
// //             >
// //               <option value="">Select</option>
// //               {MTC_OPTIONS.map((opt) => (
// //                 <option key={opt.id} value={opt.id}>{opt.name}</option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Search Button (col-xl-2 -> lg:col-span-2) */}
// //           <div className="lg:col-span-2 lg:pt-0 pt-2">
// //             <button
// //               type="button"
// //               onClick={handleSearch}
// //               className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-[#0B918C] bg-white hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C]"
// //             >
// //               <Search size={16} />
// //               Search
// //             </button>
// //           </div>

// //         </div>

// //         {/* Report Output Sections */}
// //         <div className="mt-8 flex flex-col items-center w-full">
// //           <div id="div_Report" className="w-full max-w-5xl mb-4">
// //             {/* The table or data result will be rendered here */}
// //           </div>
          
// //           <div id="div_Svg" className="w-full max-w-5xl">
// //             {/* The SVG map or chart will be rendered here */}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState } from "react";
// import { Search, BarChart } from "lucide-react";

// // Data Constants
// const YEARS = Array.from({ length: 7 }, (_, i) => (2020 + i).toString());

// const QUARTERS = [
//   { id: "1", name: "Annual (Apr-Mar)" },
//   { id: "2", name: "Quarter1 (Apr-Jun)" },
//   { id: "3", name: "Quarter2 (Jul-Sept)" },
//   { id: "4", name: "Quarter3 (Oct-Dec)" },
//   { id: "5", name: "Quarter4 (Jan-Mar)" },
// ];

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

// export default function PerformanceRankingReport() {
//   // Form State
//   const [year, setYear] = useState<string>("2026");
//   const [quarter, setQuarter] = useState<string>("");
//   const [district, setDistrict] = useState<string>("8");
//   const [showReport, setShowReport] = useState(false);

//   const handleSearch = () => {
//     const payload = { year, quarter, district };
//     console.log("Generating Performance Ranking Report for:", payload);
//     setShowReport(true);
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
//       <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
//         {/* Card Header - Updated to Blue 700 / Blue 50 */}
//         <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
//           <BarChart size={20} className="text-blue-700" />
//           <h5 className="text-[1.25rem] font-bold m-0 text-blue-700">
//             Performance Ranking By MTC
//           </h5>
//         </div>

//         <div className="p-4 md:p-6 text-sm">
//           {/* Grid Layout */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 items-end mb-8 pb-8 border-b border-gray-100">
            
//             {/* Financial Year Select */}
//             <div className="lg:col-span-2 flex flex-col gap-1">
//               <label htmlFor="dd_Year" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">Financial Year</label>
//               <select
//                 id="dd_Year"
//                 value={year}
//                 onChange={(e) => { setYear(e.target.value); setShowReport(false); }}
//                 className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] text-gray-700"
//               >
//                 <option value="">Select Year</option>
//                 {YEARS.map((yr) => (
//                   <option key={yr} value={yr}>{yr}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Quarter Select */}
//             <div className="lg:col-span-4 flex flex-col gap-1">
//               <label htmlFor="dd_Quarter" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">Quarter</label>
//               <select
//                 id="dd_Quarter"
//                 value={quarter}
//                 onChange={(e) => { setQuarter(e.target.value); setShowReport(false); }}
//                 className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] text-gray-700"
//               >
//                 <option value="">select</option>
//                 {QUARTERS.map((q) => (
//                   <option key={q.id} value={q.id}>{q.name}</option>
//                 ))}
//               </select>
//             </div>

//             {/* District Select - Disabled */}
//             <div className="lg:col-span-2 flex flex-col gap-1">
//               <label htmlFor="ddl_District" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">District</label>
//               <select
//                 id="ddl_District"
//                 disabled
//                 value={district}
//                 className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-md py-1.5 px-3 cursor-not-allowed h-[38px]"
//               >
//                 <option value="">All Districts</option>
//                 {DISTRICTS.map((d) => (
//                   <option key={d.id} value={d.id}>{d.name}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Search Button - Blue 600 */}
//             <div className="lg:col-span-2 lg:pt-0 pt-2">
//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-blue-600 text-sm font-bold rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <Search size={16} />
//                 Generate Rankings
//               </button>
//             </div>
//           </div>

//           {/* Ranking Dashboard Output */}
//           <div className="mt-8">
//             {showReport ? (
//               <div className="animate-in fade-in duration-500">
//                 <div className="text-center mb-6">
//                   <h6 className="text-blue-900 font-black text-lg uppercase">Ranking Summary: {year}</h6>
//                   <p className="text-gray-500 text-xs italic">Based on composite performance metrics across all active centers.</p>
//                 </div>
                
//                 {/* Ranking table would be injected here */}
//                 <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
//                     <table className="w-full text-left text-sm">
//                         <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
//                             <tr>
//                                 <th className="px-4 py-3 font-bold uppercase text-[10px] tracking-widest">Rank</th>
//                                 <th className="px-4 py-3 font-bold uppercase text-[10px] tracking-widest">MTC Center</th>
//                                 <th className="px-4 py-3 font-bold uppercase text-[10px] tracking-widest text-right">Score</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-100">
//                             {[
//                                 { rank: 1, name: "BUNDU", score: 98.4 },
//                                 { rank: 2, name: "DORANDA", score: 94.2 },
//                                 { rank: 3, name: "UP REFERRAL RIMS", score: 89.1 },
//                             ].map((row) => (
//                                 <tr key={row.rank} className="hover:bg-blue-50/30 transition-colors">
//                                     <td className="px-4 py-3 font-black text-blue-700">#{row.rank}</td>
//                                     <td className="px-4 py-3 font-semibold text-gray-800">{row.name}</td>
//                                     <td className="px-4 py-3 text-right font-bold text-gray-600">{row.score}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
//                 <p className="text-gray-400 italic">Configure financial year and quarter to view performance rankings.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Search, BarChart } from "lucide-react";

// Data Constants
const YEARS = Array.from({ length: 7 }, (_, i) => (2020 + i).toString());

const QUARTERS = [
  { id: "1", name: "Annual (Apr-Mar)" },
  { id: "2", name: "Quarter1 (Apr-Jun)" },
  { id: "3", name: "Quarter2 (Jul-Sept)" },
  { id: "4", name: "Quarter3 (Oct-Dec)" },
  { id: "5", name: "Quarter4 (Jan-Mar)" },
];

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

export default function PerformanceRankingReport() {
  // Form State
  const [year, setYear] = useState<string>("2026");
  const [quarter, setQuarter] = useState<string>("");
  const [district] = useState<string>("8");
  const [showReport, setShowReport] = useState(false);

  const handleSearch = () => {
    const payload = { year, quarter, district };
    console.log("Generating Performance Ranking Report for:", payload);
    setShowReport(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
        {/* Card Header - Updated to Blue 700 / Blue 50 */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
          <BarChart size={20} className="text-blue-700" />
          <h5 className="text-[1.25rem] font-bold m-0 text-blue-700">
            Performance Ranking By MTC
          </h5>
        </div>

        <div className="p-4 md:p-6 text-sm">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 items-end mb-8 pb-8 border-b border-gray-100">
            
            {/* Financial Year Select */}
            <div className="lg:col-span-2 flex flex-col gap-1">
              <label htmlFor="dd_Year" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">Financial Year</label>
              <select
                id="dd_Year"
                value={year}
                onChange={(e) => { setYear(e.target.value); setShowReport(false); }}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] text-gray-700"
              >
                <option value="">Select Year</option>
                {YEARS.map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>

            {/* Quarter Select */}
            <div className="lg:col-span-4 flex flex-col gap-1">
              <label htmlFor="dd_Quarter" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">Quarter</label>
              <select
                id="dd_Quarter"
                value={quarter}
                onChange={(e) => { setQuarter(e.target.value); setShowReport(false); }}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] text-gray-700"
              >
                <option value="">select</option>
                {QUARTERS.map((q) => (
                  <option key={q.id} value={q.id}>{q.name}</option>
                ))}
              </select>
            </div>

            {/* District Select - Disabled */}
            <div className="lg:col-span-2 flex flex-col gap-1">
              <label htmlFor="ddl_District" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">District</label>
              <select
                id="ddl_District"
                disabled
                value={district}
                className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-md py-1.5 px-3 cursor-not-allowed h-[38px]"
              >
                <option value="">All Districts</option>
                {DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Search Button - Blue 600 */}
            <div className="lg:col-span-2 lg:pt-0 pt-2">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-blue-600 text-sm font-bold rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Search size={16} />
                Generate Rankings
              </button>
            </div>
          </div>

          {/* Ranking Dashboard Output */}
          <div className="mt-8">
            {showReport ? (
              <div className="animate-in fade-in duration-500">
                <div className="text-center mb-6">
                  <h6 className="text-blue-900 font-black text-lg uppercase">Ranking Summary: {year}</h6>
                  <p className="text-gray-500 text-xs italic">Based on composite performance metrics across all active centers.</p>
                </div>
                
                {/* Ranking table layout */}
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                            <tr>
                                <th className="px-4 py-3 font-bold uppercase text-[10px] tracking-widest">Rank</th>
                                <th className="px-4 py-3 font-bold uppercase text-[10px] tracking-widest">MTC Center</th>
                                <th className="px-4 py-3 font-bold uppercase text-[10px] tracking-widest text-right">Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { rank: 1, name: "BUNDU", score: 98.4 },
                                { rank: 2, name: "DORANDA", score: 94.2 },
                                { rank: 3, name: "UP REFERRAL RIMS", score: 89.1 },
                            ].map((row) => (
                                <tr key={row.rank} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="px-4 py-3 font-black text-blue-700">#{row.rank}</td>
                                    <td className="px-4 py-3 font-semibold text-gray-800">{row.name}</td>
                                    <td className="px-4 py-3 text-right font-bold text-gray-600">{row.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 italic">Configure financial year and quarter to view performance rankings.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}