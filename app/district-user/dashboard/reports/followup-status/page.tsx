// // // "use client";

// // // import React, { useState, useEffect, useRef } from "react";
// // // import { Calendar, Search as SearchIcon, ChevronDown } from "lucide-react";

// // // // Full District Data
// // // const DISTRICTS = [
// // //   { id: "1", name: "BOKARO" }, { id: "2", name: "CHATRA" }, { id: "16", name: "DEOGHAR" },
// // //   { id: "4", name: "DHANBAD" }, { id: "17", name: "DUMKA" }, { id: "22", name: "EAST SINGHBHUM" },
// // //   { id: "14", name: "GARHWA" }, { id: "3", name: "GIRIDIH" }, { id: "18", name: "GODDA" },
// // //   { id: "9", name: "GUMLA" }, { id: "6", name: "HAZARIBAGH" }, { id: "19", name: "JAMTARA" },
// // //   { id: "10", name: "KHUNTI" }, { id: "7", name: "KODERMA" }, { id: "15", name: "LATEHAR" },
// // //   { id: "11", name: "LOHARDAGA" }, { id: "20", name: "PAKUR" }, { id: "13", name: "PALAMU" },
// // //   { id: "5", name: "RAMGARH" }, { id: "8", name: "RANCHI" }, { id: "21", name: "SAHIBGANJ" },
// // //   { id: "23", name: "SERAIKELA" }, { id: "12", name: "SIMDEGA" }, { id: "24", name: "WEST SINGHBHUM" },
// // // ];

// // // // Full MTC Data (106 options)
// // // const MTC_OPTIONS = [
// // //   { id: "1", name: "CHAS" }, { id: "2", name: "GOMIA" }, { id: "3", name: "PETERWAR" }, { id: "4", name: "FUSARO" },
// // //   { id: "5", name: "CHATRA" }, { id: "6", name: "HUNTERGUNJ" }, { id: "7", name: "SIMARIA" }, { id: "8", name: "TANDWA" },
// // //   { id: "9", name: "DUMRI" }, { id: "10", name: "GIRIDIH" }, { id: "11", name: "RAJDHANWAR" }, { id: "12", name: "JAMUA" },
// // //   { id: "13", name: "GOVINDPUR" }, { id: "14", name: "TOPCHANCH" }, { id: "15", name: "TUNDI" }, { id: "16", name: "GOLA" },
// // //   { id: "17", name: "MANDU" }, { id: "18", name: "RAMGARH" }, { id: "19", name: "BARKAGAON" }, { id: "20", name: "BERHI" },
// // //   { id: "21", name: "HAZARIBAG" }, { id: "22", name: "BISHNUGARH" }, { id: "23", name: "DOMCHANCH" }, { id: "24", name: "KODERMA" },
// // //   { id: "25", name: "SATGAWA" }, { id: "26", name: "BUNDU" }, { id: "27", name: "DORANDA" }, { id: "28", name: "MANDAR" },
// // //   { id: "29", name: "BERO" }, { id: "30", name: "GUMLA" }, { id: "31", name: "RAIDIH" }, { id: "32", name: "BISUNPUR" },
// // //   { id: "33", name: "SISAI" }, { id: "34", name: "KHUNTI" }, { id: "35", name: "TORPA" }, { id: "36", name: "KARRA" },
// // //   { id: "37", name: "MURHU" }, { id: "38", name: "BHANDRA" }, { id: "39", name: "KURU" }, { id: "40", name: "KISKO" },
// // //   { id: "41", name: "KOLEBIRA" }, { id: "42", name: "SIMDEGA" }, { id: "43", name: "BANO" }, { id: "44", name: "THETHAITANGAR" },
// // //   { id: "45", name: "KURDEG" }, { id: "46", name: "BISRAMPUR" }, { id: "47", name: "CHAINPUR" }, { id: "48", name: "HUSAINABAD" },
// // //   { id: "49", name: "PALAMU" }, { id: "50", name: "GARHWA" }, { id: "51", name: "MANJHIAON" }, { id: "52", name: "BHANDARIA" },
// // //   { id: "53", name: "NAGAR UNTARI" }, { id: "54", name: "GARU" }, { id: "55", name: "CHANDWA" }, { id: "56", name: "LATEHAR" },
// // //   { id: "57", name: "MAHUADAR" }, { id: "58", name: "KARRON" }, { id: "59", name: "PALJORI" }, { id: "60", name: "MADHUPUR" },
// // //   { id: "61", name: "DEOGHAR" }, { id: "62", name: "JASIDIH" }, { id: "63", name: "DUMKA" }, { id: "64", name: "JARMUNDI" },
// // //   { id: "65", name: "RANESWAR" }, { id: "66", name: "MAHAGAMA" }, { id: "67", name: "PATHARGAMA" }, { id: "68", name: "PORAIYAHAT" },
// // //   { id: "69", name: "SUNDERPAHARI" }, { id: "70", name: "BOARIJOR" }, { id: "71", name: "JAMTARA" }, { id: "72", name: "NALA" },
// // //   { id: "73", name: "NARAYANPUR" }, { id: "74", name: "LITTEPARA" }, { id: "75", name: "PAKUR" }, { id: "76", name: "MAHESHPUR" },
// // //   { id: "77", name: "BARHET" }, { id: "78", name: "RAJMAHAL" }, { id: "79", name: "SAHIBGANJ" }, { id: "80", name: "BARHARWA" },
// // //   { id: "81", name: "BAHRAGORA" }, { id: "82", name: "GHATSILA" }, { id: "83", name: "PKS TATA" }, { id: "84", name: "POTKA" },
// // //   { id: "85", name: "MUSABANI" }, { id: "86", name: "CHANDIL" }, { id: "87", name: "RAJNAGAR" }, { id: "88", name: "SARAIKELA" },
// // //   { id: "89", name: "NIMDIH" }, { id: "90", name: "CHAIBASA" }, { id: "91", name: "CHAKRADHARPUR" }, { id: "92", name: "JAGANNATHPUR" },
// // //   { id: "93", name: "KUMARDUNGI" }, { id: "94", name: "MANOHARPUR" }, { id: "95", name: "DHANBAD SADAR" }, { id: "96", name: "PMCH" },
// // //   { id: "97", name: "DHURKI" }, { id: "98", name: "PAKURIA" }, { id: "99", name: "BAGODAR" }, { id: "100", name: "GANDEY" },
// // //   { id: "101", name: "PANKI" }, { id: "102", name: "PATRATU" }, { id: "103", name: "KATHIKUND" }, { id: "104", name: "RIMS" },
// // //   { id: "107", name: "UP REFERRAL RIMS" }, { id: "108", name: "GODDA SADAR" }
// // // ];

// // // export default function MtcFollowUpStatusReport() {
// // //   // Form state
// // //   const [fromDate, setFromDate] = useState<string>("2026-04-08");
// // //   const [toDate, setToDate] = useState<string>("2026-04-08");
  
// // //   // Selection state
// // //   const [selectedDistricts, setSelectedDistricts] = useState<string[]>(
// // //     DISTRICTS.map(d => d.id) // Defaults to all 24 selected
// // //   );
// // //   const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]); // Defaults to none selected

// // //   // Dropdown UI & Search state
// // //   const [isMtcOpen, setIsMtcOpen] = useState(false);
// // //   const [mtcSearch, setMtcSearch] = useState("");

// // //   // Refs for handling outside clicks
// // //   const mtcRef = useRef<HTMLDivElement>(null);

// // //   // Handle outside clicks to close the dropdown
// // //   useEffect(() => {
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (mtcRef.current && !mtcRef.current.contains(event.target as Node)) {
// // //         setIsMtcOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   // Filtered MTC list based on search
// // //   const filteredMtcs = MTC_OPTIONS.filter((m) =>
// // //     m.name.toLowerCase().includes(mtcSearch.toLowerCase())
// // //   );

// // //   // Toggle individual MTC
// // //   const toggleMtc = (id: string) => {
// // //     setSelectedMtcs((prev) =>
// // //       prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
// // //     );
// // //   };

// // //   // Toggle All MTCs
// // //   const toggleAllMtcs = () => {
// // //     if (selectedMtcs.length === MTC_OPTIONS.length) {
// // //       setSelectedMtcs([]);
// // //     } else {
// // //       setSelectedMtcs(MTC_OPTIONS.map((m) => m.id));
// // //     }
// // //   };

// // //   // Helper to get button text
// // //   const getButtonText = (selectedCount: number, totalCount: number) => {
// // //     if (selectedCount === 0) return "None selected";
// // //     if (selectedCount === totalCount) return `All selected (${totalCount})`;
// // //     return `${selectedCount} selected`;
// // //   };

// // //   // Handle Search Action
// // //   const handleSearch = () => {
// // //     const searchPayload = {
// // //       fromDate,
// // //       toDate,
// // //       districts: selectedDistricts,
// // //       mtcs: selectedMtcs,
// // //     };
// // //     console.log("Fetching report with parameters:", searchPayload);
// // //   };

// // //   return (
// // //     <div className="w-full">
// // //       {/* Card Header */}
// // //       <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
// // //         <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
// // //           MTC Follow-up Status Report
// // //         </h5>
// // //       </div>

// // //       {/* Card Body */}
// // //       <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200 p-4 md:p-6 text-sm">
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          
// // //           {/* From Date */}
// // //           <div>
// // //             <label htmlFor="txt_FromDate" className="block font-medium text-gray-700 mb-1">
// // //               From Date
// // //             </label>
// // //             <div className="relative">
// // //               <input
// // //                 id="txt_FromDate"
// // //                 type="date"
// // //                 value={fromDate}
// // //                 onChange={(e) => setFromDate(e.target.value)}
// // //                 className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C]"
// // //               />
// // //               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
// // //                 <Calendar size={16} />
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* To Date */}
// // //           <div>
// // //             <label htmlFor="txt_ToDate" className="block font-medium text-gray-700 mb-1">
// // //               To Date
// // //             </label>
// // //             <div className="relative">
// // //               <input
// // //                 id="txt_ToDate"
// // //                 type="date"
// // //                 value={toDate}
// // //                 onChange={(e) => setToDate(e.target.value)}
// // //                 className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C]"
// // //               />
// // //               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
// // //                 <Calendar size={16} />
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* District Dropdown (Disabled state) */}
// // //           <div id="div_district">
// // //             <label className="block font-medium text-gray-700 mb-1">District</label>
// // //             <button
// // //               type="button"
// // //               disabled={true} // Disabled matching HTML state
// // //               className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-md py-2 px-3 text-left h-[38px] flex items-center justify-between cursor-not-allowed"
// // //             >
// // //               <span className="truncate">
// // //                 {getButtonText(selectedDistricts.length, DISTRICTS.length)}
// // //               </span>
// // //               <ChevronDown size={16} className="text-gray-400 ml-2 flex-shrink-0" />
// // //             </button>
// // //           </div>

// // //           {/* MTC Custom Checkbox Dropdown */}
// // //           <div className="relative" ref={mtcRef}>
// // //             <label className="block font-medium text-gray-700 mb-1">MTC</label>
// // //             <button
// // //               type="button"
// // //               onClick={() => setIsMtcOpen(!isMtcOpen)}
// // //               className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] flex items-center justify-between transition-shadow"
// // //             >
// // //               <span className="truncate text-gray-700">
// // //                 {getButtonText(selectedMtcs.length, MTC_OPTIONS.length)}
// // //               </span>
// // //               <ChevronDown size={16} className={`ml-2 flex-shrink-0 text-gray-400 transition-transform ${isMtcOpen ? 'rotate-180' : ''}`} />
// // //             </button>

// // //             {isMtcOpen && (
// // //               <div className="absolute z-10 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col">
// // //                 {/* Search Box */}
// // //                 <div className="p-2 border-b border-gray-100 relative bg-gray-50 rounded-t-md">
// // //                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
// // //                     <SearchIcon size={14} />
// // //                   </div>
// // //                   <input
// // //                     type="search"
// // //                     className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
// // //                     placeholder="Search MTC..."
// // //                     value={mtcSearch}
// // //                     onChange={(e) => setMtcSearch(e.target.value)}
// // //                   />
// // //                 </div>

// // //                 <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
// // //                   {/* Select All Option */}
// // //                   {!mtcSearch && (
// // //                     <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors font-semibold border-b border-gray-100 mb-1">
// // //                       <input
// // //                         type="checkbox"
// // //                         checked={selectedMtcs.length === MTC_OPTIONS.length && MTC_OPTIONS.length > 0}
// // //                         onChange={toggleAllMtcs}
// // //                         className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
// // //                       />
// // //                       <span className="text-gray-900 select-none">Select all</span>
// // //                     </label>
// // //                   )}

// // //                   {/* Individual Options */}
// // //                   {filteredMtcs.map((mtc) => (
// // //                     <label
// // //                       key={mtc.id}
// // //                       className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
// // //                     >
// // //                       <input
// // //                         type="checkbox"
// // //                         checked={selectedMtcs.includes(mtc.id)}
// // //                         onChange={() => toggleMtc(mtc.id)}
// // //                         className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
// // //                       />
// // //                       <span className="text-gray-700 select-none">{mtc.name}</span>
// // //                     </label>
// // //                   ))}
                  
// // //                   {filteredMtcs.length === 0 && (
// // //                     <div className="p-3 text-center text-gray-500 text-sm">
// // //                       No results found
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Search Button */}
// // //           <div>
// // //             <button
// // //               type="button"
// // //               onClick={handleSearch}
// // //               className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-white bg-[#0B918C] hover:bg-[#097a76] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C]"
// // //             >
// // //               <SearchIcon size={16} />
// // //               Search
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Report Output Area */}
// // //         <div className="mt-8 text-center" id="div_Report">
// // //           {/* Render your data table or visualization here */}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import React, { useState, useEffect, useRef } from "react";
// // import { Calendar, Search as SearchIcon, ChevronDown } from "lucide-react";

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
// //   { id: "1", name: "CHAS" }, { id: "2", name: "GOMIA" }, { id: "26", name: "BUNDU" }, 
// //   { id: "27", name: "DORANDA" }, { id: "104", name: "RIMS" }, { id: "107", name: "UP REFERRAL RIMS" }
// //   // ... rest of options truncated for brevity
// // ];

// // export default function MtcFollowUpStatusReport() {
// //   const [fromDate, setFromDate] = useState<string>("2026-04-08");
// //   const [toDate, setToDate] = useState<string>("2026-04-08");
// //   const [selectedDistricts, setSelectedDistricts] = useState<string[]>(DISTRICTS.map(d => d.id));
// //   const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);
// //   const [isMtcOpen, setIsMtcOpen] = useState(false);
// //   const [mtcSearch, setMtcSearch] = useState("");
// //   const mtcRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (mtcRef.current && !mtcRef.current.contains(event.target as Node)) {
// //         setIsMtcOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const filteredMtcs = MTC_OPTIONS.filter((m) =>
// //     m.name.toLowerCase().includes(mtcSearch.toLowerCase())
// //   );

// //   const toggleMtc = (id: string) => {
// //     setSelectedMtcs((prev) =>
// //       prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
// //     );
// //   };

// //   const toggleAllMtcs = () => {
// //     setSelectedMtcs(selectedMtcs.length === MTC_OPTIONS.length ? [] : MTC_OPTIONS.map((m) => m.id));
// //   };

// //   const getButtonText = (selectedCount: number, totalCount: number) => {
// //     if (selectedCount === 0) return "None selected";
// //     if (selectedCount === totalCount) return `All selected (${totalCount})`;
// //     return `${selectedCount} selected`;
// //   };

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
// //     <div className="w-full">
// //       {/* Header - Now Blue 50 Background */}
// //       <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
// //         <h5 className="text-[1.25rem] font-bold m-0 text-blue-700">
// //           MTC Follow-up Status Report
// //         </h5>
// //       </div>

// //       <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200 p-4 md:p-6 text-sm">
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          
// //           {/* From Date - Blue Focus */}
// //           <div>
// //             <label htmlFor="txt_FromDate" className="block font-medium text-gray-700 mb-1">From Date</label>
// //             <div className="relative">
// //               <input
// //                 id="txt_FromDate"
// //                 type="date"
// //                 value={fromDate}
// //                 onChange={(e) => setFromDate(e.target.value)}
// //                 className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               />
// //               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
// //                 <Calendar size={16} />
// //               </div>
// //             </div>
// //           </div>

// //           {/* To Date - Blue Focus */}
// //           <div>
// //             <label htmlFor="txt_ToDate" className="block font-medium text-gray-700 mb-1">To Date</label>
// //             <div className="relative">
// //               <input
// //                 id="txt_ToDate"
// //                 type="date"
// //                 value={toDate}
// //                 onChange={(e) => setToDate(e.target.value)}
// //                 className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               />
// //               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
// //                 <Calendar size={16} />
// //               </div>
// //             </div>
// //           </div>

// //           {/* District Dropdown */}
// //           <div>
// //             <label className="block font-medium text-gray-700 mb-1">District</label>
// //             <button
// //               type="button"
// //               disabled={true}
// //               className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-md py-2 px-3 text-left h-[38px] flex items-center justify-between cursor-not-allowed"
// //             >
// //               <span className="truncate">{getButtonText(selectedDistricts.length, DISTRICTS.length)}</span>
// //               <ChevronDown size={16} className="text-gray-400 ml-2 flex-shrink-0" />
// //             </button>
// //           </div>

// //           {/* MTC Selection - Blue Accents */}
// //           <div className="relative" ref={mtcRef}>
// //             <label className="block font-medium text-gray-700 mb-1">MTC</label>
// //             <button
// //               type="button"
// //               onClick={() => setIsMtcOpen(!isMtcOpen)}
// //               className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] flex items-center justify-between"
// //             >
// //               <span className="truncate text-gray-700">{getButtonText(selectedMtcs.length, MTC_OPTIONS.length)}</span>
// //               <ChevronDown size={16} className={`ml-2 flex-shrink-0 text-gray-400 transition-transform ${isMtcOpen ? 'rotate-180' : ''}`} />
// //             </button>

// //             {isMtcOpen && (
// //               <div className="absolute z-10 mt-1 w-full sm:w-64 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col">
// //                 <div className="p-2 border-b border-gray-100 relative bg-gray-50">
// //                   <SearchIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// //                   <input
// //                     type="search"
// //                     className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
// //                     placeholder="Search MTC..."
// //                     value={mtcSearch}
// //                     onChange={(e) => setMtcSearch(e.target.value)}
// //                   />
// //                 </div>
// //                 <div className="max-h-60 overflow-y-auto p-1">
// //                   {!mtcSearch && (
// //                     <label className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded cursor-pointer font-bold text-blue-700">
// //                       <input
// //                         type="checkbox"
// //                         checked={selectedMtcs.length === MTC_OPTIONS.length}
// //                         onChange={toggleAllMtcs}
// //                         className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
// //                       />
// //                       <span>Select all</span>
// //                     </label>
// //                   )}
// //                   {filteredMtcs.map((mtc) => (
// //                     <label key={mtc.id} className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded cursor-pointer">
// //                       <input
// //                         type="checkbox"
// //                         checked={selectedMtcs.includes(mtc.id)}
// //                         onChange={() => toggleMtc(mtc.id)}
// //                         className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
// //                       />
// //                       <span className="text-gray-700">{mtc.name}</span>
// //                     </label>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Search Button - Now Blue 600 */}
// //           <div>
// //             <button
// //               type="button"
// //               onClick={handleSearch}
// //               className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
// //             >
// //               <SearchIcon size={16} />
// //               Search
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Calendar, Search as SearchIcon, ChevronDown, CheckSquare, Square, CheckCircle2, Clock } from "lucide-react";

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

// const MTC_OPTIONS = [
//   { id: "1", name: "CHAS" }, { id: "2", name: "GOMIA" }, { id: "26", name: "BUNDU" }, 
//   { id: "27", name: "DORANDA" }, { id: "104", name: "RIMS" }, { id: "107", name: "UP REFERRAL RIMS" }
// ];

// export default function MtcFollowUpStatusReport() {
//   const [fromDate, setFromDate] = useState<string>("2026-04-08");
//   const [toDate, setToDate] = useState<string>("2026-04-08");
//   const [selectedDistricts, setSelectedDistricts] = useState<string[]>(DISTRICTS.map(d => d.id));
//   const [selectedMtcs, setSelectedMtcs] = useState<string[]>(MTC_OPTIONS.map(m => m.id));
//   const [isMtcOpen, setIsMtcOpen] = useState(false);
//   const [mtcSearch, setMtcSearch] = useState("");
//   const [showReport, setShowReport] = useState<boolean>(false);
  
//   // Follow-up reporting metrics data mock structure
//   const [followUpData, setFollowUpData] = useState({
//     completed: 342,
//     pending: 107,
//     total: 449
//   });

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

//   const getButtonText = (selectedCount: number, totalCount: number) => {
//     if (selectedCount === 0) return "None selected";
//     if (selectedCount === totalCount) return `All selected (${totalCount})`;
//     return `${selectedCount} selected`;
//   };

//   const handleSearch = () => {
//     // You can attach your actual operational fetch endpoint layout here
//     setShowReport(true);
//   };

//   return (
//     <section className="my-6 font-sans w-full max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      
//       {/* Clean Header Profile Template */}
//       <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h5 className="text-xl font-bold tracking-tight text-blue-700">
//             MTC Follow-up Status Report
//           </h5>
//           <p className="text-xs text-slate-500 mt-1">Track completed and pending child nutrition updates</p>
//         </div>
//         <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-blue-100">
//           State Operational Monitor
//         </div>
//       </div>

//       <hr className="border-slate-100" />

//       {/* Filter Parameters Section Controls */}
//       <div className="p-6">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-sm text-slate-700">
          
//           {/* From Date */}
//           <div className="md:col-span-2">
//             <label htmlFor="txt_FromDate" className="block mb-2 font-medium text-slate-700">From Date</label>
//             <input
//               id="txt_FromDate"
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-slate-800 transition-all shadow-sm"
//             />
//           </div>

//           {/* To Date */}
//           <div className="md:col-span-2">
//             <label htmlFor="txt_ToDate" className="block mb-2 font-medium text-slate-700">To Date</label>
//             <input
//               id="txt_ToDate"
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-slate-800 transition-all shadow-sm"
//             />
//           </div>

//           {/* District Selector Block */}
//           <div className="md:col-span-2">
//             <label className="block mb-2 font-medium text-slate-700">District Scope</label>
//             <button
//               type="button"
//               disabled={true}
//               className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-500 font-medium cursor-not-allowed outline-none shadow-sm text-left flex justify-between items-center h-[38px]"
//             >
//               <span className="truncate">{getButtonText(selectedDistricts.length, DISTRICTS.length)}</span>
//               <ChevronDown size={14} className="text-slate-400" />
//             </button>
//           </div>

//           {/* MTC Dynamic Dropdown */}
//           <div className="md:col-span-3 relative" ref={mtcRef}>
//             <label className="block mb-2 font-medium text-slate-700">MTC Selection</label>
//             <button
//               type="button"
//               onClick={() => setIsMtcOpen(!isMtcOpen)}
//               className="w-full px-3 py-2 text-left border border-slate-300 rounded-md bg-white hover:bg-slate-50 focus:outline-none focus:border-blue-500 flex justify-between items-center text-slate-800 shadow-sm transition-all h-[38px]"
//             >
//               <span className="truncate">{getButtonText(selectedMtcs.length, MTC_OPTIONS.length)}</span>
//               <ChevronDown size={14} className={`text-slate-500 transition-transform ${isMtcOpen ? 'rotate-180' : ''}`} />
//             </button>

//             {isMtcOpen && (
//               <div className="absolute left-0 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-xl max-h-60 overflow-y-auto z-50 p-2 space-y-0.5">
//                 <div className="p-1.5 border-b border-slate-100 bg-slate-50 rounded-t mb-1">
//                   <input
//                     type="search"
//                     className="w-full px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 bg-white"
//                     placeholder="Search MTC..."
//                     value={mtcSearch}
//                     onChange={(e) => setMtcSearch(e.target.value)}
//                   />
//                 </div>
//                 {!mtcSearch && (
//                   <button
//                     type="button"
//                     onClick={toggleAllMtcs}
//                     className="w-full flex items-center gap-2 p-2 hover:bg-slate-50 rounded font-bold text-blue-600 text-xs text-left transition-colors border-b border-slate-50"
//                   >
//                     {selectedMtcs.length === MTC_OPTIONS.length ? <CheckSquare size={13} /> : <Square size={13} />}
//                     Select All
//                   </button>
//                 )}
//                 {filteredMtcs.map((mtc) => (
//                   <button
//                     key={mtc.id}
//                     type="button"
//                     onClick={() => toggleMtc(mtc.id)}
//                     className="w-full flex items-center gap-2 p-2 hover:bg-slate-50 rounded text-xs font-medium text-slate-700 text-left transition-colors"
//                   >
//                     {selectedMtcs.includes(mtc.id) ? <CheckSquare size={13} className="text-blue-600" /> : <Square size={13} className="text-slate-400" />}
//                     {mtc.name}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Fetch Submission Query Trigger */}
//           <div className="md:col-span-3">
//             <button
//               type="button"
//               onClick={handleSearch}
//               className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-white border border-blue-500 rounded-md hover:bg-blue-50/50 transition-all shadow-sm active:scale-[0.99]"
//             >
//               <SearchIcon size={16} className="text-blue-600 stroke-[2.5]" />
//               Fetch District Data
//             </button>
//           </div>

//         </div>

//         {/* Workspace Display Area */}
//         <div className="mt-6 border-t border-slate-200 pt-6">
//           {showReport ? (
//             <div className="w-full animate-in fade-in duration-300">
              
//               {/* Dynamic Metadata Title Header Banner */}
//               <div className="text-center mb-6 bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-100 py-3 rounded-xl shadow-inner">
//                 <h6 className="text-xs font-bold tracking-wider text-blue-900 uppercase m-0">
//                   Follow-Up Overview Profile &mdash; From {fromDate} to {toDate}
//                 </h6>
//               </div>

//               {/* Status Breakdown Workspace Panel Matrix */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
//                 {/* Completed Metric Card */}
//                 <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
//                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
//                     <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
//                       <CheckCircle2 size={16} className="text-emerald-500" />
//                       Follow-up Completed
//                     </span>
//                   </div>
//                   <div className="py-2">
//                     <div className="text-3xl font-black text-slate-900">{followUpData.completed}</div>
//                     <p className="text-xs text-slate-500 mt-1">Total nutritional tracking visits successfully recorded.</p>
//                   </div>
//                   <div className="mt-2 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
//                     <div 
//                       className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
//                       style={{ width: `${(followUpData.completed / followUpData.total) * 100}%` }}
//                     />
//                   </div>
//                   <span className="text-[10px] text-slate-400 font-semibold mt-1.5 block text-right">
//                     {((followUpData.completed / followUpData.total) * 100).toFixed(1)}% Compliance
//                   </span>
//                 </div>

//                 {/* Pending Metric Card */}
//                 <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
//                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
//                     <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
//                       <Clock size={16} className="text-amber-500" />
//                       Follow-up Pending
//                     </span>
//                   </div>
//                   <div className="py-2">
//                     <div className="text-3xl font-black text-slate-900">{followUpData.pending}</div>
//                     <p className="text-xs text-slate-500 mt-1">Visits currently overdue or scheduled inside interval queues.</p>
//                   </div>
//                   <div className="mt-2 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
//                     <div 
//                       className="bg-amber-500 h-full rounded-full transition-all duration-500" 
//                       style={{ width: `${(followUpData.pending / followUpData.total) * 100}%` }}
//                     />
//                   </div>
//                   <span className="text-[10px] text-slate-400 font-semibold mt-1.5 block text-right">
//                     {((followUpData.pending / followUpData.total) * 100).toFixed(1)}% Outstanding
//                   </span>
//                 </div>

//                 {/* Combined Totals Overview Card */}
//                 <div className="bg-slate-50/50 border border-blue-100 rounded-xl p-5 shadow-sm flex flex-col justify-between">
//                   <div className="flex justify-between items-center border-b border-blue-100 pb-2.5 mb-3.5">
//                     <span className="font-bold text-sm text-blue-900">Total Cases Under Tracker</span>
//                   </div>
//                   <div className="py-4 text-center">
//                     <div className="text-5xl font-black text-blue-900 tracking-tight">{followUpData.total}</div>
//                     <p className="text-xs font-medium text-slate-500 mt-2">Active Child Instances Monitored Across Target Centers</p>
//                   </div>
//                   <div className="text-[10px] text-center bg-blue-100/60 text-blue-800 rounded py-1 font-bold">
//                     100% Data Sync Confirmed
//                   </div>
//                 </div>

//               </div>
//             </div>
//           ) : (
//             /* Plain empty layout message placeholder matching target layout behavior */
//             <div className="w-full text-center min-h-[160px] flex flex-col items-center justify-center bg-slate-50/50 rounded border border-dashed border-slate-200 p-6">
//               <p className="text-slate-500 text-sm font-normal">
//                 Click <span className="font-bold text-blue-600 cursor-pointer hover:underline" onClick={handleSearch}>Fetch District Data</span> to populate data across selected MTC Blocks...
//               </p>
//             </div>
//           )}
//         </div>

//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, ChevronDown, CheckSquare, Square, CheckCircle2, Clock } from "lucide-react";

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

const MTC_OPTIONS = [
  { id: "1", name: "CHAS" }, { id: "2", name: "GOMIA" }, { id: "26", name: "BUNDU" }, 
  { id: "27", name: "DORANDA" }, { id: "104", name: "RIMS" }, { id: "107", name: "UP REFERRAL RIMS" }
];

export default function MtcFollowUpStatusReport() {
  const [fromDate, setFromDate] = useState<string>("2026-04-08");
  const [toDate, setToDate] = useState<string>("2026-04-08");
  const [selectedDistricts] = useState<string[]>(DISTRICTS.map(d => d.id));
  const [selectedMtcs, setSelectedMtcs] = useState<string[]>(MTC_OPTIONS.map(m => m.id));
  const [isMtcOpen, setIsMtcOpen] = useState(false);
  const [mtcSearch, setMtcSearch] = useState("");
  const [showReport, setShowReport] = useState<boolean>(false);
  
  // Follow-up reporting metrics data mock structure
  const [followUpData] = useState({
    completed: 342,
    pending: 107,
    total: 449
  });

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

  const getButtonText = (selectedCount: number, totalCount: number) => {
    if (selectedCount === 0) return "None selected";
    if (selectedCount === totalCount) return `All selected (${totalCount})`;
    return `${selectedCount} selected`;
  };

  const handleSearch = () => {
    setShowReport(true);
  };

  return (
    <section className="my-6 font-sans w-full max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Clean Header Profile Template */}
      <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h5 className="text-xl font-bold tracking-tight text-blue-700">
            MTC Follow-up Status Report
          </h5>
          <p className="text-xs text-slate-500 mt-1">Track completed and pending child nutrition updates</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-blue-100">
          State Operational Monitor
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Filter Parameters Section Controls */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-sm text-slate-700">
          
          {/* From Date */}
          <div className="md:col-span-2">
            <label htmlFor="txt_FromDate" className="block mb-2 font-medium text-slate-700">From Date</label>
            <input
              id="txt_FromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-slate-800 transition-all shadow-sm"
            />
          </div>

          {/* To Date */}
          <div className="md:col-span-2">
            <label htmlFor="txt_ToDate" className="block mb-2 font-medium text-slate-700">To Date</label>
            <input
              id="txt_ToDate"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-slate-800 transition-all shadow-sm"
            />
          </div>

          {/* District Selector Block */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-slate-700">District Scope</label>
            <button
              type="button"
              disabled={true}
              className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-500 font-medium cursor-not-allowed outline-none shadow-sm text-left flex justify-between items-center h-[38px]"
            >
              <span className="truncate">{getButtonText(selectedDistricts.length, DISTRICTS.length)}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>

          {/* MTC Dynamic Dropdown */}
          <div className="md:col-span-3 relative" ref={mtcRef}>
            <label className="block mb-2 font-medium text-slate-700">MTC Selection</label>
            <button
              type="button"
              onClick={() => setIsMtcOpen(!isMtcOpen)}
              className="w-full px-3 py-2 text-left border border-slate-300 rounded-md bg-white hover:bg-slate-50 focus:outline-none focus:border-blue-500 flex justify-between items-center text-slate-800 shadow-sm transition-all h-[38px]"
            >
              <span className="truncate">{getButtonText(selectedMtcs.length, MTC_OPTIONS.length)}</span>
              <ChevronDown size={14} className={`text-slate-500 transition-transform ${isMtcOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMtcOpen && (
              <div className="absolute left-0 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-xl max-h-60 overflow-y-auto z-50 p-2 space-y-0.5">
                <div className="p-1.5 border-b border-slate-100 bg-slate-50 rounded-t mb-1">
                  <input
                    type="search"
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 bg-white"
                    placeholder="Search MTC..."
                    value={mtcSearch}
                    onChange={(e) => setMtcSearch(e.target.value)}
                  />
                </div>
                {!mtcSearch && (
                  <button
                    type="button"
                    onClick={toggleAllMtcs}
                    className="w-full flex items-center gap-2 p-2 hover:bg-slate-50 rounded font-bold text-blue-600 text-xs text-left transition-colors border-b border-slate-50"
                  >
                    {selectedMtcs.length === MTC_OPTIONS.length ? <CheckSquare size={13} /> : <Square size={13} />}
                    Select All
                  </button>
                )}
                {filteredMtcs.map((mtc) => (
                  <button
                    key={mtc.id}
                    type="button"
                    onClick={() => toggleMtc(mtc.id)}
                    className="w-full flex items-center gap-2 p-2 hover:bg-slate-50 rounded text-xs font-medium text-slate-700 text-left transition-colors"
                  >
                    {selectedMtcs.includes(mtc.id) ? <CheckSquare size={13} className="text-blue-600" /> : <Square size={13} className="text-slate-400" />}
                    {mtc.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fetch Submission Query Trigger */}
          <div className="md:col-span-3">
            <button
              type="button"
              onClick={handleSearch}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-white border border-blue-500 rounded-md hover:bg-blue-50/50 transition-all shadow-sm active:scale-[0.99]"
            >
              <SearchIcon size={16} className="text-blue-600 stroke-[2.5]" />
              Fetch District Data
            </button>
          </div>

        </div>

        {/* Workspace Display Area */}
        <div className="mt-6 border-t border-slate-200 pt-6">
          {showReport ? (
            <div className="w-full animate-in fade-in duration-300">
              
              {/* Dynamic Metadata Title Header Banner */}
              <div className="text-center mb-6 bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-100 py-3 rounded-xl shadow-inner">
                <h6 className="text-xs font-bold tracking-wider text-blue-900 uppercase m-0">
                  Follow-Up Overview Profile &mdash; From {fromDate} to {toDate}
                </h6>
              </div>

              {/* Status Breakdown Workspace Panel Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Completed Metric Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      Follow-up Completed
                    </span>
                  </div>
                  <div className="py-2">
                    <div className="text-3xl font-black text-slate-900">{followUpData.completed}</div>
                    <p className="text-xs text-slate-500 mt-1">Total nutritional tracking visits successfully recorded.</p>
                  </div>
                  <div className="mt-2 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${(followUpData.completed / followUpData.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1.5 block text-right">
                    {((followUpData.completed / followUpData.total) * 100).toFixed(1)}% Compliance
                  </span>
                </div>

                {/* Pending Metric Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Clock size={16} className="text-amber-500" />
                      Follow-up Pending
                    </span>
                  </div>
                  <div className="py-2">
                    <div className="text-3xl font-black text-slate-900">{followUpData.pending}</div>
                    <p className="text-xs text-slate-500 mt-1">Visits currently overdue or scheduled inside interval queues.</p>
                  </div>
                  <div className="mt-2 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${(followUpData.pending / followUpData.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1.5 block text-right">
                    {((followUpData.pending / followUpData.total) * 100).toFixed(1)}% Outstanding
                  </span>
                </div>

                {/* Combined Totals Overview Card */}
                <div className="bg-slate-50/50 border border-blue-100 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-center border-b border-blue-100 pb-2.5 mb-3.5">
                    <span className="font-bold text-sm text-blue-900">Total Cases Under Tracker</span>
                  </div>
                  <div className="py-4 text-center">
                    <div className="text-5xl font-black text-blue-900 tracking-tight">{followUpData.total}</div>
                    <p className="text-xs font-medium text-slate-500 mt-2">Active Child Instances Monitored Across Target Centers</p>
                  </div>
                  <div className="text-[10px] text-center bg-blue-100/60 text-blue-800 rounded py-1 font-bold">
                    100% Data Sync Confirmed
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* Plain empty layout message placeholder matching target layout behavior */
            <div className="w-full text-center min-h-[160px] flex flex-col items-center justify-center bg-slate-50/50 rounded border border-dashed border-slate-200 p-6">
              <p className="text-slate-500 text-sm font-normal">
                Click <span className="font-bold text-blue-600 cursor-pointer hover:underline" onClick={handleSearch}>Fetch District Data</span> to populate data across selected MTC Blocks...
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}