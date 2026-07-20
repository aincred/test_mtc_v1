// // "use client";

// // import React, { useState, useEffect, useRef } from "react";
// // import { Calendar, Search as SearchIcon, ChevronDown } from "lucide-react";

// // // Full District Data
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

// // // Full MTC Data extracted from your HTML
// // const MTC_OPTIONS = [
// //   { id: "1", name: "CHAS" }, { id: "2", name: "GOMIA" }, { id: "3", name: "PETERWAR" }, { id: "4", name: "FUSARO" },
// //   { id: "5", name: "CHATRA" }, { id: "6", name: "HUNTERGUNJ" }, { id: "7", name: "SIMARIA" }, { id: "8", name: "TANDWA" },
// //   { id: "9", name: "DUMRI" }, { id: "10", name: "GIRIDIH" }, { id: "11", name: "RAJDHANWAR" }, { id: "12", name: "JAMUA" },
// //   { id: "13", name: "GOVINDPUR" }, { id: "14", name: "TOPCHANCH" }, { id: "15", name: "TUNDI" }, { id: "16", name: "GOLA" },
// //   { id: "17", name: "MANDU" }, { id: "18", name: "RAMGARH" }, { id: "19", name: "BARKAGAON" }, { id: "20", name: "BERHI" },
// //   { id: "21", name: "HAZARIBAG" }, { id: "22", name: "BISHNUGARH" }, { id: "23", name: "DOMCHANCH" }, { id: "24", name: "KODERMA" },
// //   { id: "25", name: "SATGAWA" }, { id: "26", name: "BUNDU" }, { id: "27", name: "DORANDA" }, { id: "28", name: "MANDAR" },
// //   { id: "29", name: "BERO" }, { id: "30", name: "GUMLA" }, { id: "31", name: "RAIDIH" }, { id: "32", name: "BISUNPUR" },
// //   { id: "33", name: "SISAI" }, { id: "34", name: "KHUNTI" }, { id: "35", name: "TORPA" }, { id: "36", name: "KARRA" },
// //   { id: "37", name: "MURHU" }, { id: "38", name: "BHANDRA" }, { id: "39", name: "KURU" }, { id: "40", name: "KISKO" },
// //   { id: "41", name: "KOLEBIRA" }, { id: "42", name: "SIMDEGA" }, { id: "43", name: "BANO" }, { id: "44", name: "THETHAITANGAR" },
// //   { id: "45", name: "KURDEG" }, { id: "46", name: "BISRAMPUR" }, { id: "47", name: "CHAINPUR" }, { id: "48", name: "HUSAINABAD" },
// //   { id: "49", name: "PALAMU" }, { id: "50", name: "GARHWA" }, { id: "51", name: "MANJHIAON" }, { id: "52", name: "BHANDARIA" },
// //   { id: "53", name: "NAGAR UNTARI" }, { id: "54", name: "GARU" }, { id: "55", name: "CHANDWA" }, { id: "56", name: "LATEHAR" },
// //   { id: "57", name: "MAHUADAR" }, { id: "58", name: "KARRON" }, { id: "59", name: "PALJORI" }, { id: "60", name: "MADHUPUR" },
// //   { id: "61", name: "DEOGHAR" }, { id: "62", name: "JASIDIH" }, { id: "63", name: "DUMKA" }, { id: "64", name: "JARMUNDI" },
// //   { id: "65", name: "RANESWAR" }, { id: "66", name: "MAHAGAMA" }, { id: "67", name: "PATHARGAMA" }, { id: "68", name: "PORAIYAHAT" },
// //   { id: "69", name: "SUNDERPAHARI" }, { id: "70", name: "BOARIJOR" }, { id: "71", name: "JAMTARA" }, { id: "72", name: "NALA" },
// //   { id: "73", name: "NARAYANPUR" }, { id: "74", name: "LITTEPARA" }, { id: "75", name: "PAKUR" }, { id: "76", name: "MAHESHPUR" },
// //   { id: "77", name: "BARHET" }, { id: "78", name: "RAJMAHAL" }, { id: "79", name: "SAHIBGANJ" }, { id: "80", name: "BARHARWA" },
// //   { id: "81", name: "BAHRAGORA" }, { id: "82", name: "GHATSILA" }, { id: "83", name: "PKS TATA" }, { id: "84", name: "POTKA" },
// //   { id: "85", name: "MUSABANI" }, { id: "86", name: "CHANDIL" }, { id: "87", name: "RAJNAGAR" }, { id: "88", name: "SARAIKELA" },
// //   { id: "89", name: "NIMDIH" }, { id: "90", name: "CHAIBASA" }, { id: "91", name: "CHAKRADHARPUR" }, { id: "92", name: "JAGANNATHPUR" },
// //   { id: "93", name: "KUMARDUNGI" }, { id: "94", name: "MANOHARPUR" }, { id: "95", name: "DHANBAD SADAR" }, { id: "96", name: "PMCH" },
// //   { id: "97", name: "DHURKI" }, { id: "98", name: "PAKURIA" }, { id: "99", name: "BAGODAR" }, { id: "100", name: "GANDEY" },
// //   { id: "101", name: "PANKI" }, { id: "102", name: "PATRATU" }, { id: "103", name: "KATHIKUND" }, { id: "104", name: "RIMS" },
// //   { id: "107", name: "UP REFERRAL RIMS" }, { id: "108", name: "GODDA SADAR" }
// // ];

// // export default function ReportFilter() {
// //   // Form state
// //   const [fromDate, setFromDate] = useState<string>("2026-04-08");
// //   const [toDate, setToDate] = useState<string>("2026-04-08");
  
// //   // Selection state
// //   const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
// //   const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);

// //   // Dropdown UI & Search state
// //   const [isDistrictOpen, setIsDistrictOpen] = useState(false);
// //   const [districtSearch, setDistrictSearch] = useState("");
  
// //   const [isMtcOpen, setIsMtcOpen] = useState(false);
// //   const [mtcSearch, setMtcSearch] = useState("");

// //   // Refs for handling outside clicks
// //   const districtRef = useRef<HTMLDivElement>(null);
// //   const mtcRef = useRef<HTMLDivElement>(null);

// //   // Handle outside clicks to close the dropdowns
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (districtRef.current && !districtRef.current.contains(event.target as Node)) {
// //         setIsDistrictOpen(false);
// //       }
// //       if (mtcRef.current && !mtcRef.current.contains(event.target as Node)) {
// //         setIsMtcOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Filtered lists based on search input
// //   const filteredDistricts = DISTRICTS.filter(d => d.name.toLowerCase().includes(districtSearch.toLowerCase()));
// //   const filteredMtcs = MTC_OPTIONS.filter(m => m.name.toLowerCase().includes(mtcSearch.toLowerCase()));

// //   // Toggle individual District
// //   const toggleDistrict = (id: string) => {
// //     setSelectedDistricts(prev => 
// //       prev.includes(id) ? prev.filter(dId => dId !== id) : [...prev, id]
// //     );
// //   };

// //   // Toggle All Districts
// //   const toggleAllDistricts = () => {
// //     if (selectedDistricts.length === DISTRICTS.length) {
// //       setSelectedDistricts([]);
// //     } else {
// //       setSelectedDistricts(DISTRICTS.map(d => d.id));
// //     }
// //   };

// //   // Toggle individual MTC
// //   const toggleMtc = (id: string) => {
// //     setSelectedMtcs(prev => 
// //       prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
// //     );
// //   };

// //   // Toggle All MTCs
// //   const toggleAllMtcs = () => {
// //     if (selectedMtcs.length === MTC_OPTIONS.length) {
// //       setSelectedMtcs([]);
// //     } else {
// //       setSelectedMtcs(MTC_OPTIONS.map(m => m.id));
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
// //       districts: selectedDistricts,
// //       mtcs: selectedMtcs,
// //     };
// //     console.log("Fetching report with parameters:", searchPayload);
// //   };

// //   return (
// //     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 text-sm">
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        
// //         {/* From Date */}
// //         <div>
// //           <label htmlFor="txt_FromDate" className="block font-medium text-gray-700 mb-1">
// //             From Date
// //           </label>
// //           <div className="relative">
// //             <input
// //               id="txt_FromDate"
// //               type="date"
// //               value={fromDate}
// //               onChange={(e) => setFromDate(e.target.value)}
// //               className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //             />
// //             <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
// //               <Calendar size={16} />
// //             </div>
// //           </div>
// //         </div>

// //         {/* To Date */}
// //         <div>
// //           <label htmlFor="txt_ToDate" className="block font-medium text-gray-700 mb-1">
// //             To Date
// //           </label>
// //           <div className="relative">
// //             <input
// //               id="txt_ToDate"
// //               type="date"
// //               value={toDate}
// //               onChange={(e) => setToDate(e.target.value)}
// //               className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //             />
// //             <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
// //               <Calendar size={16} />
// //             </div>
// //           </div>
// //         </div>

// //         {/* District Custom Checkbox Dropdown */}
// //         <div className="relative" ref={districtRef}>
// //           <label className="block font-medium text-gray-700 mb-1">District</label>
// //           <button
// //             type="button"
// //             onClick={() => setIsDistrictOpen(!isDistrictOpen)}
// //             className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] flex items-center justify-between"
// //           >
// //             <span className="truncate text-gray-700">
// //               {getButtonText(selectedDistricts.length, DISTRICTS.length)}
// //             </span>
// //             <ChevronDown size={16} className="text-gray-400 ml-2 flex-shrink-0" />
// //           </button>

// //           {isDistrictOpen && (
// //             <div className="absolute z-10 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col">
// //               {/* Search Box */}
// //               <div className="p-2 border-b border-gray-100 relative">
// //                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
// //                   <SearchIcon size={14} />
// //                 </div>
// //                 <input
// //                   type="search"
// //                   className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
// //                   placeholder="Search"
// //                   value={districtSearch}
// //                   onChange={(e) => setDistrictSearch(e.target.value)}
// //                 />
// //               </div>
              
// //               <div className="max-h-60 overflow-y-auto p-1">
// //                 {/* Select All Option */}
// //                 {!districtSearch && (
// //                   <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors font-semibold">
// //                     <input
// //                       type="checkbox"
// //                       checked={selectedDistricts.length === DISTRICTS.length && DISTRICTS.length > 0}
// //                       onChange={toggleAllDistricts}
// //                       className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
// //                     />
// //                     <span className="text-gray-900 select-none">Select all</span>
// //                   </label>
// //                 )}
                
// //                 {/* Individual Options */}
// //                 {filteredDistricts.map((district) => (
// //                   <label 
// //                     key={district.id} 
// //                     className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       checked={selectedDistricts.includes(district.id)}
// //                       onChange={() => toggleDistrict(district.id)}
// //                       className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
// //                     />
// //                     <span className="text-gray-700 select-none">{district.name}</span>
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* MTC Custom Checkbox Dropdown */}
// //         <div className="relative" ref={mtcRef}>
// //           <label className="block font-medium text-gray-700 mb-1">MTC</label>
// //           <button
// //             type="button"
// //             onClick={() => setIsMtcOpen(!isMtcOpen)}
// //             className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] flex items-center justify-between"
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
// //                   className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
// //                   placeholder="Search"
// //                   value={mtcSearch}
// //                   onChange={(e) => setMtcSearch(e.target.value)}
// //                 />
// //               </div>

// //               <div className="max-h-60 overflow-y-auto p-1">
// //                 {/* Select All Option */}
// //                 {!mtcSearch && (
// //                   <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors font-semibold">
// //                     <input
// //                       type="checkbox"
// //                       checked={selectedMtcs.length === MTC_OPTIONS.length && MTC_OPTIONS.length > 0}
// //                       onChange={toggleAllMtcs}
// //                       className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
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
// //                       className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
// //                     />
// //                     <span className="text-gray-700 select-none">{mtc.name}</span>
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
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

// //       <div className="mt-8 text-center" id="div_Report">
// //         {/* Render your data table here */}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Calendar, Search as SearchIcon, ChevronDown, Download, BarChart3, Users } from "lucide-react";

// // --- Types & Constants ---
// type RangeType = "daily" | "monthly" | "quarterly";

// const YEARS = Array.from({ length: 5 }, (_, i) => (2022 + i).toString());
// const MONTHS = [
//   { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
//   { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
//   { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
//   { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
// ];
// const QUARTERS = [
//   { id: "1", name: "Q1 (Jan-Mar)" }, { id: "2", name: "Q2 (Apr-Jun)" },
//   { id: "3", name: "Q3 (Jul-Sep)" }, { id: "4", name: "Q4 (Oct-Dec)" },
// ];

// const DISTRICTS = [
//   { id: "1", name: "BOKARO" }, { id: "2", name: "CHATRA" }, { id: "8", name: "RANCHI" },
// ];

// const MTC_OPTIONS = [
//   { id: "26", name: "BUNDU" }, { id: "27", name: "DORANDA" }, { id: "107", name: "UP REFERRAL RIMS" },
//   { id: "28", name: "MANDAR" }, { id: "29", name: "BERO" },
// ];

// export default function MtcDischargeReport() {
//   const [range, setRange] = useState<RangeType>("monthly");
//   const [fromDate, setFromDate] = useState<string>("2026-05-01");
//   const [toDate, setToDate] = useState<string>("2026-05-15");
//   const [selectedYear, setSelectedYear] = useState<string>("2026");
//   const [selectedMonth, setSelectedMonth] = useState<string>("5");
//   const [selectedQuarter, setSelectedQuarter] = useState<string>("");
//   const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
//   const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);

//   const [isDistrictOpen, setIsDistrictOpen] = useState(false);
//   const [isMtcOpen, setIsMtcOpen] = useState(false);
//   const [showReport, setShowReport] = useState(false);
//   const [isSearching, setIsSearching] = useState(false);
  
//   const districtRef = useRef<HTMLDivElement>(null);
//   const mtcRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (districtRef.current && !districtRef.current.contains(e.target as Node)) setIsDistrictOpen(false);
//       if (mtcRef.current && !mtcRef.current.contains(e.target as Node)) setIsMtcOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSearch = () => {
//     setIsSearching(true);
//     setTimeout(() => {
//       setIsSearching(false);
//       setShowReport(true);
//     }, 800);
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 text-sm">
        
//         {/* Header - Blue 700 */}
//         <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
//           <h1 className="text-xl font-bold text-blue-700">Children Discharged by MTC</h1>
//         </div>

//         {/* Range Selector */}
//         <div className="flex items-center space-x-6 mb-6">
//           {(["daily", "monthly", "quarterly"] as RangeType[]).map((r) => (
//             <label key={r} className="flex items-center space-x-2 cursor-pointer group">
//               <input
//                 type="radio"
//                 checked={range === r}
//                 onChange={() => { setRange(r); setShowReport(false); }}
//                 className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 accent-blue-600"
//               />
//               <span className={`capitalize font-medium ${range === r ? "text-blue-600" : "text-gray-500"}`}>
//                 {r}
//               </span>
//             </label>
//           ))}
//         </div>

//         {/* Filter Controls */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end mb-8">
//           {range === "daily" ? (
//             <>
//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">From Date</label>
//                 <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
//               </div>
//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">To Date</label>
//                 <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
//               </div>
//             </>
//           ) : (
//             <>
//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">Year</label>
//                 <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-white outline-none focus:ring-2 focus:ring-blue-500">
//                   {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">{range === "monthly" ? "Month" : "Quarter"}</label>
//                 <select value={range === "monthly" ? selectedMonth : selectedQuarter} onChange={(e) => range === "monthly" ? setSelectedMonth(e.target.value) : setSelectedQuarter(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-white outline-none focus:ring-2 focus:ring-blue-500">
//                   <option value="">{range === "monthly" ? "All Months" : "Select Quarter"}</option>
//                   {(range === "monthly" ? MONTHS : QUARTERS).map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
//                 </select>
//               </div>
//             </>
//           )}

//           <div className="relative" ref={districtRef}>
//             <label className="block font-medium text-gray-700 mb-1">District</label>
//             <button onClick={() => setIsDistrictOpen(!isDistrictOpen)} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left h-[38px] flex justify-between items-center">
//               <span className="truncate">{selectedDistricts.length === 0 ? "All Districts" : `${selectedDistricts.length} selected`}</span>
//               <ChevronDown size={16} className="text-gray-400" />
//             </button>
//             {isDistrictOpen && (
//               <div className="absolute z-20 mt-1 w-full bg-white border rounded-md shadow-lg p-1 max-h-60 overflow-y-auto">
//                 {DISTRICTS.map(d => (
//                   <label key={d.id} className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded cursor-pointer">
//                     <input type="checkbox" checked={selectedDistricts.includes(d.id)} onChange={() => setSelectedDistricts(prev => prev.includes(d.id) ? prev.filter(i => i !== d.id) : [...prev, d.id])} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
//                     <span>{d.name}</span>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="relative" ref={mtcRef}>
//             <label className="block font-medium text-gray-700 mb-1">MTC</label>
//             <button onClick={() => setIsMtcOpen(!isMtcOpen)} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left h-[38px] flex justify-between items-center">
//               <span className="truncate">{selectedMtcs.length === 0 ? "All MTCs" : `${selectedMtcs.length} selected`}</span>
//               <ChevronDown size={16} className="text-gray-400" />
//             </button>
//             {isMtcOpen && (
//               <div className="absolute z-20 mt-1 w-full bg-white border rounded-md shadow-lg p-1 max-h-60 overflow-y-auto">
//                 {MTC_OPTIONS.map(m => (
//                   <label key={m.id} className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded cursor-pointer">
//                     <input type="checkbox" checked={selectedMtcs.includes(m.id)} onChange={() => setSelectedMtcs(prev => prev.includes(m.id) ? prev.filter(i => i !== m.id) : [...prev, m.id])} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
//                     <span>{m.name}</span>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>

//           <button onClick={handleSearch} disabled={isSearching} className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all font-bold">
//             <SearchIcon size={16} /> {isSearching ? "Loading..." : "Search"}
//           </button>
//         </div>

//         {/* Results Section */}
//         {showReport && (
//           <div className="animate-in fade-in duration-500">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-center gap-4">
//                 <div className="bg-blue-600 p-3 rounded-full text-white"><Users size={20} /></div>
//                 <div>
//                   <p className="text-blue-800 text-xs font-bold uppercase">Total Discharged</p>
//                   <p className="text-2xl font-black text-blue-900">842</p>
//                 </div>
//               </div>
//               <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-center gap-4">
//                 <div className="bg-blue-600 p-3 rounded-full text-white"><BarChart3 size={20} /></div>
//                 <div>
//                   <p className="text-blue-800 text-xs font-bold uppercase">Avg. Success Rate</p>
//                   <p className="text-2xl font-black text-blue-900">88.5%</p>
//                 </div>
//               </div>
//               <div className="flex items-end justify-end">
//                 <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-md font-bold hover:bg-blue-800 transition-colors shadow-sm">
//                   <Download size={16} /> Export MTC Data
//                 </button>
//               </div>
//             </div>

//             <div className="border border-gray-200 rounded-lg overflow-hidden">
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
//                   <tr>
//                     <th className="px-4 py-3">MTC Name</th>
//                     <th className="px-4 py-3 text-center">Cured</th>
//                     <th className="px-4 py-3 text-center">LAMA</th>
//                     <th className="px-4 py-3 text-center">Referrals</th>
//                     <th className="px-4 py-3 text-right">Cure Rate</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {[
//                     { name: "BUNDU", cured: 124, lama: 8, ref: 4, rate: "91.1%" },
//                     { name: "DORANDA", cured: 210, lama: 15, ref: 10, rate: "89.3%" },
//                     { name: "UP REFERRAL RIMS", cured: 342, lama: 42, ref: 18, rate: "85.0%" },
//                   ].map((mtc, i) => (
//                     <tr key={i} className="hover:bg-blue-50/30">
//                       <td className="px-4 py-3 font-semibold text-gray-800">{mtc.name}</td>
//                       <td className="px-4 py-3 text-center text-green-600 font-medium">{mtc.cured}</td>
//                       <td className="px-4 py-3 text-center text-amber-600">{mtc.lama}</td>
//                       <td className="px-4 py-3 text-center text-blue-500">{mtc.ref}</td>
//                       <td className="px-4 py-3 text-right font-black text-blue-700">{mtc.rate}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, ChevronDown, Download, BarChart3, Users } from "lucide-react";

// --- Types & Constants ---
type RangeType = "daily" | "monthly" | "quarterly";

const YEARS = Array.from({ length: 5 }, (_, i) => (2022 + i).toString());
const MONTHS = [
  { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
  { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
  { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
  { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
];
const QUARTERS = [
  { id: "1", name: "Q1 (Jan-Mar)" }, { id: "2", name: "Q2 (Apr-Jun)" },
  { id: "3", name: "Q3 (Jul-Sep)" }, { id: "4", name: "Q4 (Oct-Dec)" },
];

const DISTRICTS = [
  { id: "1", name: "BOKARO" }, { id: "2", name: "CHATRA" }, { id: "8", name: "RANCHI" },
];

const MTC_OPTIONS = [
  { id: "26", name: "BUNDU" }, { id: "27", name: "DORANDA" }, { id: "107", name: "UP REFERRAL RIMS" },
  { id: "28", name: "MANDAR" }, { id: "29", name: "BERO" },
];

export default function MtcDischargeReport() {
  const [range, setRange] = useState<RangeType>("monthly");
  const [fromDate, setFromDate] = useState<string>("2026-05-01");
  const [toDate, setToDate] = useState<string>("2026-05-15");
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [selectedMonth, setSelectedMonth] = useState<string>("5");
  const [selectedQuarter, setSelectedQuarter] = useState<string>("");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);

  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [isMtcOpen, setIsMtcOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const districtRef = useRef<HTMLDivElement>(null);
  const mtcRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (districtRef.current && !districtRef.current.contains(e.target as Node)) setIsDistrictOpen(false);
      if (mtcRef.current && !mtcRef.current.contains(e.target as Node)) setIsMtcOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowReport(true);
    }, 800);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 text-sm">
        
        {/* Header - Blue 700 */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-blue-700">Children Discharged by MTC</h1>
        </div>

        {/* Range Selector */}
        <div className="flex items-center space-x-6 mb-6">
          {(["daily", "monthly", "quarterly"] as RangeType[]).map((r) => (
            <label key={r} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="radio"
                checked={range === r}
                onChange={() => { setRange(r); setShowReport(false); }}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 accent-blue-600"
              />
              <span className={`capitalize font-medium ${range === r ? "text-blue-600" : "text-gray-500"}`}>
                {r}
              </span>
            </label>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end mb-8">
          {range === "daily" ? (
            <>
              <div>
                <label className="block font-medium text-gray-700 mb-1">From Date</label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">To Date</label>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Year</label>
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-white outline-none focus:ring-2 focus:ring-blue-500">
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">{range === "monthly" ? "Month" : "Quarter"}</label>
                <select value={range === "monthly" ? selectedMonth : selectedQuarter} onChange={(e) => range === "monthly" ? setSelectedMonth(e.target.value) : setSelectedQuarter(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-white outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">{range === "monthly" ? "All Months" : "Select Quarter"}</option>
                  {(range === "monthly" ? MONTHS : QUARTERS).map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
              </div>
            </>
          )}

          <div className="relative" ref={districtRef}>
            <label className="block font-medium text-gray-700 mb-1">District</label>
            <button onClick={() => setIsDistrictOpen(!isDistrictOpen)} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left h-[38px] flex justify-between items-center">
              <span className="truncate">{selectedDistricts.length === 0 ? "All Districts" : `${selectedDistricts.length} selected`}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            {isDistrictOpen && (
              <div className="absolute z-20 mt-1 w-full bg-white border rounded-md shadow-lg p-1 max-h-60 overflow-y-auto">
                {DISTRICTS.map(d => (
                  <label key={d.id} className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded cursor-pointer">
                    <input type="checkbox" checked={selectedDistricts.includes(d.id)} onChange={() => setSelectedDistricts(prev => prev.includes(d.id) ? prev.filter(i => i !== d.id) : [...prev, d.id])} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                    <span>{d.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={mtcRef}>
            <label className="block font-medium text-gray-700 mb-1">MTC</label>
            <button onClick={() => setIsMtcOpen(!isMtcOpen)} className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left h-[38px] flex justify-between items-center">
              <span className="truncate">{selectedMtcs.length === 0 ? "All MTCs" : `${selectedMtcs.length} selected`}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            {isMtcOpen && (
              <div className="absolute z-20 mt-1 w-full bg-white border rounded-md shadow-lg p-1 max-h-60 overflow-y-auto">
                {MTC_OPTIONS.map(m => (
                  <label key={m.id} className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded cursor-pointer">
                    <input type="checkbox" checked={selectedMtcs.includes(m.id)} onChange={() => setSelectedMtcs(prev => prev.includes(m.id) ? prev.filter(i => i !== m.id) : [...prev, m.id])} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                    <span>{m.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleSearch} disabled={isSearching} className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all font-bold">
            <SearchIcon size={16} /> {isSearching ? "Loading..." : "Search"}
          </button>
        </div>

        {/* Results Section */}
        {showReport && (
          <div className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-center gap-4">
                <div className="bg-blue-600 p-3 rounded-full text-white"><Users size={20} /></div>
                <div>
                  <p className="text-blue-800 text-xs font-bold uppercase">Total Discharged</p>
                  <p className="text-2xl font-black text-blue-900">842</p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-center gap-4">
                <div className="bg-blue-600 p-3 rounded-full text-white"><BarChart3 size={20} /></div>
                <div>
                  <p className="text-blue-800 text-xs font-bold uppercase">Avg. Success Rate</p>
                  <p className="text-2xl font-black text-blue-900">88.5%</p>
                </div>
              </div>
              <div className="flex items-end justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-md font-bold hover:bg-blue-800 transition-colors shadow-sm">
                  <Download size={16} /> Export MTC Data
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                  <tr>
                    <th className="px-4 py-3">MTC Name</th>
                    <th className="px-4 py-3 text-center">Cured</th>
                    <th className="px-4 py-3 text-center">LAMA</th>
                    <th className="px-4 py-3 text-center">Referrals</th>
                    <th className="px-4 py-3 text-right">Cure Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: "BUNDU", cured: 124, lama: 8, ref: 4, rate: "91.1%" },
                    { name: "DORANDA", cured: 210, lama: 15, ref: 10, rate: "89.3%" },
                    { name: "UP REFERRAL RIMS", cured: 342, lama: 42, ref: 18, rate: "85.0%" },
                  ].map((mtc, i) => (
                    <tr key={i} className="hover:bg-blue-50/30">
                      <td className="px-4 py-3 font-semibold text-gray-800">{mtc.name}</td>
                      <td className="px-4 py-3 text-center text-green-600 font-medium">{mtc.cured}</td>
                      <td className="px-4 py-3 text-center text-amber-600">{mtc.lama}</td>
                      <td className="px-4 py-3 text-center text-blue-500">{mtc.ref}</td>
                      <td className="px-4 py-3 text-right font-black text-blue-700">{mtc.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}