// "use client";

// import React, { useState } from "react";

// // --- Data ---
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

// export default function DateReportForm() {
//   // --- State Management ---
//   // Note: HTML5 date inputs expect the YYYY-MM-DD format.
//   const [fromDate, setFromDate] = useState<string>("2026-04-07");
//   const [toDate, setToDate] = useState<string>("2026-04-07");
//   const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
//   const [isSearching, setIsSearching] = useState(false);

//   // --- Handlers ---
//   const handleSearch = () => {
//     setIsSearching(true);
    
//     const payload = {
//       fromDate,
//       toDate,
//       districts: selectedDistricts,
//     };
    
//     console.log("Searching with:", payload);
    
//     // Simulate API call to load report
//     setTimeout(() => {
//       setIsSearching(false);
//     }, 1000);
//   };

//   const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const values = Array.from(e.target.selectedOptions, (option) => option.value);
//     setSelectedDistricts(values);
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4">
//       <div className="bg-white shadow-sm border border-gray-200" style={{ borderRadius: "0.8rem" }}>
//         <div className="p-6">
          
//           {/* Form Controls Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            
//             {/* From Date */}
//             <div className="col-span-1">
//               <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="txt_FromDate">
//                 From Date
//               </label>
//               <input
//                 id="txt_FromDate"
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>

//             {/* To Date */}
//             <div className="col-span-1">
//               <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="txt_ToDate">
//                 To Date
//               </label>
//               <input
//                 id="txt_ToDate"
//                 type="date"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
//               />
//             </div>

//             {/* District Multiselect */}
//             <div className="col-span-1">
//               <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ddl_District">
//                 District
//               </label>
//               <select
//                 id="ddl_District"
//                 multiple
//                 value={selectedDistricts}
//                 onChange={handleDistrictChange}
//                 disabled // Kept disabled as per your original HTML. Remove this to enable interaction.
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 disabled:opacity-60 disabled:cursor-not-allowed h-10 overflow-y-auto"
//                 size={1}
//                 title="Hold Ctrl/Cmd to select multiple"
//               >
//                 {DISTRICTS.map((district) => (
//                   <option key={district.id} value={district.id}>
//                     {district.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Search Button */}
//             <div className="col-span-1 pb-px">
//               <button
//                 type="button"
//                 id="btn_Search"
//                 onClick={handleSearch}
//                 disabled={isSearching}
//                 className="w-full inline-flex justify-center items-center px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50"
//               >
//                 <svg
//                   className="mr-2 -ml-1 h-4 w-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 {isSearching ? "Searching..." : "Search"}
//               </button>
//             </div>

//           </div>

//           {/* Report Results Container */}
//           <div className="mt-8 border-t border-gray-100 pt-6">
//             <div className="w-full min-h-[100px] flex items-center justify-center text-gray-500 text-sm text-center">
//               <div id="div_Report">
//                 {/* Generated report tables/charts will mount here */}
//                 Select parameters and click search to view the report.
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import { Search, UserCheck, Download, Filter, MapPin } from "lucide-react";

// --- Data ---
const DISTRICTS = [
  { id: "1", name: "BOKARO" }, { id: "2", name: "CHATRA" },
  { id: "16", name: "DEOGHAR" }, { id: "4", name: "DHANBAD" },
  { id: "17", name: "DUMKA" }, { id: "22", name: "EAST SINGHBHUM" },
  { id: "14", name: "GARHWA" }, { id: "3", name: "GIRIDIH" },
  { id: "18", name: "GODDA" }, { id: "9", name: "GUMLA" },
  { id: "6", name: "HAZARIBAGH" }, { id: "19", name: "JAMTARA" },
  { id: "10", name: "KHUNTI" }, { id: "7", name: "KODERMA" },
  { id: "15", name: "LATEHAR" }, { id: "11", name: "LOHARDAGA" },
  { id: "20", name: "PAKUR" }, { id: "13", name: "PALAMU" },
  { id: "5", name: "RAMGARH" }, { id: "8", name: "RANCHI" },
  { id: "21", name: "SAHIBGANJ" }, { id: "23", name: "SERAIKELA" },
  { id: "12", name: "SIMDEGA" }, { id: "24", name: "WEST SINGHBHUM" },
];

export default function ChildrenDischargedReport() {
  const [fromDate, setFromDate] = useState<string>("2026-05-01");
  const [toDate, setToDate] = useState<string>("2026-05-15");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>(["8"]);
  const [isSearching, setIsSearching] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowReport(true);
    }, 800);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedDistricts(values);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-blue-700 text-xl font-bold flex items-center gap-2">
            <UserCheck size={24} /> Children Discharged by District
          </h2>
          <div className="text-xs text-blue-600 font-medium bg-blue-100 px-3 py-1 rounded-full">
            Report Period: {fromDate} to {toDate}
          </div>
        </div>

        <div className="p-6">
          {/* Form Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end pb-8 border-b border-gray-100">
            
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Select Districts</label>
              <select
                multiple
                value={selectedDistricts}
                onChange={handleDistrictChange}
                className="block w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 bg-white h-10 overflow-y-auto"
              >
                {DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-sm font-bold rounded-md text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50 h-[38px]"
              >
                <Search size={16} /> {isSearching ? "Loading..." : "Generate Report"}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {showReport ? (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700 font-semibold mb-1 uppercase tracking-wider">Total Discharges</p>
                  <p className="text-3xl font-black text-blue-900">1,482</p>
                </div>
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700 font-semibold mb-1 uppercase tracking-wider">Cured Rate</p>
                  <p className="text-3xl font-black text-blue-900">92.4%</p>
                </div>
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700 font-semibold mb-1 uppercase tracking-wider">Avg Stay (Days)</p>
                  <p className="text-3xl font-black text-blue-900">14.2</p>
                </div>
              </div>

              {/* Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                    <tr>
                      <th className="px-4 py-3 font-bold uppercase text-[10px] tracking-widest">District Name</th>
                      <th className="px-4 py-3 font-bold uppercase text-[10px] tracking-widest text-center">Total Admissions</th>
                      <th className="px-4 py-3 font-bold uppercase text-[10px] tracking-widest text-center">Discharged (Cured)</th>
                      <th className="px-4 py-3 font-bold uppercase text-[10px] tracking-widest text-center">Referrals</th>
                      <th className="px-4 py-3 font-bold uppercase text-[10px] tracking-widest text-right">Discharge Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {[
                      { name: "RANCHI", adm: 450, dis: 410, ref: 12, rate: "91.1%" },
                      { name: "BOKARO", adm: 320, dis: 295, ref: 8, rate: "92.2%" },
                      { name: "DHANBAD", adm: 380, dis: 342, ref: 15, rate: "90.0%" },
                      { name: "GUMLA", adm: 280, dis: 268, ref: 5, rate: "95.7%" },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                        <td className="px-4 py-3 font-semibold text-gray-800 flex items-center gap-2">
                          <MapPin size={14} className="text-blue-400" /> {row.name}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">{row.adm}</td>
                        <td className="px-4 py-3 text-center text-green-600 font-medium">{row.dis}</td>
                        <td className="px-4 py-3 text-center text-amber-600">{row.ref}</td>
                        <td className="px-4 py-3 text-right font-bold text-blue-700">{row.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <p className="text-xs text-gray-500 italic">* Data represents validated records within the selected date range.</p>
                <button className="flex items-center gap-2 px-5 py-2 bg-blue-700 text-white rounded-md text-sm font-bold hover:bg-blue-800 shadow-md transition-all">
                  <Download size={16} /> Export Detailed CSV
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-300 mb-4">
                <Filter size={32} />
              </div>
              <p className="text-gray-400 text-sm">Select a date range and district to view discharge performance data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}