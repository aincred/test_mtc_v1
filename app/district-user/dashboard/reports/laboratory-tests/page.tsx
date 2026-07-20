// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Calendar, Search as SearchIcon, ChevronDown } from "lucide-react";

// // MTC Data specific to this view
// const MTC_OPTIONS = [
//   { id: "26", name: "BUNDU" },
//   { id: "27", name: "DORANDA" },
//   { id: "28", name: "MANDAR" },
//   { id: "29", name: "BERO" },
//   { id: "107", name: "UP REFERRAL RIMS" },
// ];

// export default function LaboratoryTestsDetailsReport() {
//   // Form state defaults based on HTML values
//   const [fromDate, setFromDate] = useState<string>("2026-04-08");
//   const [toDate, setToDate] = useState<string>("2026-04-08");
  
//   // Selection state
//   const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]); // Defaults to none selected

//   // Dropdown UI & Search state
//   const [isMtcOpen, setIsMtcOpen] = useState(false);
//   const [mtcSearch, setMtcSearch] = useState("");

//   // Refs for handling outside clicks
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

//   // Filtered MTC list based on search
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
//           Laboratory Tests Details Report
//         </h5>
//       </div>

//       {/* Card Body */}
//       <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200 p-4 md:p-6 text-sm">
        
//         {/* Note: grid-cols-4 since District is hidden */}
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

//           {/* Hidden District Div (Maintained to reflect HTML structure) */}
//           <div id="div_district" className="hidden">
//              {/* District select logic is hidden via display:none in original HTML */}
//           </div>

//           {/* MTC Custom Checkbox Dropdown */}
//           <div className="relative" ref={mtcRef} id="div_mtc">
//             <label className="block font-medium text-gray-700 mb-1">MTC</label>
//             <button
//               type="button"
//               onClick={() => setIsMtcOpen(!isMtcOpen)}
//               className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] flex items-center justify-between transition-shadow"
//             >
//               <span className="truncate text-gray-700">
//                 {getButtonText(selectedMtcs.length, MTC_OPTIONS.length)}
//               </span>
//               <ChevronDown size={16} className={`ml-2 flex-shrink-0 text-gray-400 transition-transform ${isMtcOpen ? 'rotate-180' : ''}`} />
//             </button>

//             {isMtcOpen && (
//               <div className="absolute z-10 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col">
//                 {/* Search Box */}
//                 <div className="p-2 border-b border-gray-100 relative bg-gray-50 rounded-t-md">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
//                     <SearchIcon size={14} />
//                   </div>
//                   <input
//                     type="search"
//                     className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
//                     placeholder="Search MTC..."
//                     value={mtcSearch}
//                     onChange={(e) => setMtcSearch(e.target.value)}
//                   />
//                 </div>

//                 <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
//                   {/* Select All Option */}
//                   {!mtcSearch && (
//                     <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors font-semibold border-b border-gray-100 mb-1">
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

//                   {filteredMtcs.length === 0 && (
//                     <div className="p-3 text-center text-gray-500 text-sm">
//                       No results found
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Search Button */}
//           <div>
//             <button
//               type="button"
//               onClick={handleSearch}
//               className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-white bg-[#0B918C] hover:bg-[#097a76] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C]"
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
import { Calendar, Search as SearchIcon, ChevronDown, FlaskConical, Download } from "lucide-react";

// MTC Data specific to this view
const MTC_OPTIONS = [
  { id: "26", name: "BUNDU" },
  { id: "27", name: "DORANDA" },
  { id: "28", name: "MANDAR" },
  { id: "29", name: "BERO" },
  { id: "107", name: "UP REFERRAL RIMS" },
];

export default function LaboratoryTestsDetailsReport() {
  // Form state
  const [fromDate, setFromDate] = useState<string>("2026-05-01");
  const [toDate, setToDate] = useState<string>("2026-05-15");
  const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);
  const [isMtcOpen, setIsMtcOpen] = useState(false);
  const [mtcSearch, setMtcSearch] = useState("");
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
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowReport(true);
    }, 800);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Card Header - Blue 700 / Blue 50 */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
          <FlaskConical size={20} className="text-blue-700" />
          <h5 className="text-[1.25rem] font-bold m-0 text-blue-700">
            Laboratory Tests Details Report
          </h5>
        </div>

        <div className="p-4 md:p-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-8 pb-8 border-b border-gray-100">
            
            {/* From Date - Blue Focus */}
            <div>
              <label htmlFor="txt_FromDate" className="block font-medium text-gray-700 mb-1">From Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => { setFromDate(e.target.value); setShowReport(false); }}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* To Date - Blue Focus */}
            <div>
              <label htmlFor="txt_ToDate" className="block font-medium text-gray-700 mb-1">To Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => { setToDate(e.target.value); setShowReport(false); }}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* MTC Custom Dropdown - Blue Accents */}
            <div className="relative" ref={mtcRef}>
              <label className="block font-medium text-gray-700 mb-1">MTC</label>
              <button
                type="button"
                onClick={() => setIsMtcOpen(!isMtcOpen)}
                className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:ring-2 focus:ring-blue-500 h-[38px] flex items-center justify-between"
              >
                <span className="truncate text-gray-700">
                  {selectedMtcs.length === 0 ? "None selected" : selectedMtcs.length === MTC_OPTIONS.length ? "All MTCs" : `${selectedMtcs.length} selected`}
                </span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isMtcOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMtcOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg flex flex-col p-2">
                  <input
                    type="text"
                    placeholder="Search MTC..."
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded mb-2 focus:ring-1 focus:ring-blue-500 outline-none"
                    value={mtcSearch}
                    onChange={(e) => setMtcSearch(e.target.value)}
                  />
                  <div className="max-h-48 overflow-y-auto">
                    <label className="flex items-center space-x-2 p-2 hover:bg-blue-50 rounded cursor-pointer font-bold text-blue-700">
                      <input type="checkbox" checked={selectedMtcs.length === MTC_OPTIONS.length} onChange={toggleAllMtcs} className="accent-blue-600" />
                      <span>Select all</span>
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

            {/* Search Button - Blue 600/700 */}
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="h-[38px] w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-all shadow-md disabled:opacity-50"
            >
              <SearchIcon size={16} /> {isSearching ? "Loading..." : "Search"}
            </button>
          </div>

          {/* Results Area */}
          {showReport ? (
            <div className="animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-6">
                <h6 className="text-blue-900 font-bold uppercase tracking-tight">Test Log Summary</h6>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white text-xs font-bold rounded-md hover:bg-blue-800 transition-colors shadow-sm">
                  <Download size={14} /> Export CSV
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px] tracking-widest">
                    <tr>
                      <th className="px-4 py-3">MTC Name</th>
                      <th className="px-4 py-3 text-center">Hb Tests</th>
                      <th className="px-4 py-3 text-center">Sugar Tests</th>
                      <th className="px-4 py-3 text-center">Malaria Tests</th>
                      <th className="px-4 py-3 text-right">Completion %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {[
                      { name: "BUNDU", hb: 85, sugar: 85, malaria: 42, rate: "100%" },
                      { name: "DORANDA", hb: 112, sugar: 108, malaria: 60, rate: "96.4%" },
                      { name: "UP REFERRAL RIMS", hb: 245, sugar: 240, malaria: 130, rate: "97.9%" },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                        <td className="px-4 py-3 font-semibold text-gray-800">{row.name}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{row.hb}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{row.sugar}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{row.malaria}</td>
                        <td className="px-4 py-3 text-right font-black text-blue-700">{row.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-gray-400 italic">
              Please select your parameters and click search to view the test log.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}