// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Calendar, Search as SearchIcon, ChevronDown } from "lucide-react";

// // Data Constants
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
//   { id: "26", name: "BUNDU" },
//   { id: "27", name: "DORANDA" },
//   { id: "28", name: "MANDAR" },
//   { id: "29", name: "BERO" },
//   { id: "107", name: "UP REFERRAL RIMS" },
// ];

// const STAFF_CATEGORIES = [
//   { id: "1", name: "Medical Officer" },
//   { id: "2", name: "ANM" },
//   { id: "3", name: "Nutrition Counsellor" },
//   { id: "4", name: "Cook cum Care Taker" },
//   { id: "5", name: "Attendent Cleaner" },
//   { id: "6", name: "Medical Social Worker" },
//   { id: "7", name: "Block Data Manager" },
//   { id: "8", name: "Block Programme Manager" },
//   { id: "9", name: "Hospital Manager" },
//   { id: "10", name: "Support Staff" },
// ];

// export default function StaffDetailsReport() {
//   // Form State
//   const [fromDate, setFromDate] = useState<string>("2026-04-08");
//   const [toDate, setToDate] = useState<string>("2026-04-08");
  
//   // Selection State (Hidden inputs)
//   const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
//   const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);

//   // Staff Category State
//   const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
//   const [isStaffOpen, setIsStaffOpen] = useState(false);
//   const [staffSearch, setStaffSearch] = useState("");

//   // Ref for outside click handling
//   const staffRef = useRef<HTMLDivElement>(null);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (staffRef.current && !staffRef.current.contains(event.target as Node)) {
//         setIsStaffOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Filtered Staff list based on search
//   const filteredStaff = STAFF_CATEGORIES.filter((s) =>
//     s.name.toLowerCase().includes(staffSearch.toLowerCase())
//   );

//   // Toggle individual Staff Category
//   const toggleStaff = (id: string) => {
//     setSelectedStaff((prev) =>
//       prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
//     );
//   };

//   // Toggle All Staff Categories
//   const toggleAllStaff = () => {
//     if (selectedStaff.length === STAFF_CATEGORIES.length) {
//       setSelectedStaff([]);
//     } else {
//       setSelectedStaff(STAFF_CATEGORIES.map((s) => s.id));
//     }
//   };

//   // Helper to get button text
//   const getButtonText = (selectedCount: number, totalCount: number) => {
//     if (selectedCount === 0) return "None selected";
//     if (selectedCount === totalCount) return `All selected (${totalCount})`;
//     return `${selectedCount} selected`;
//   };

//   const handleSearch = () => {
//     const payload = {
//       fromDate,
//       toDate,
//       districts: selectedDistricts,
//       mtcs: selectedMtcs,
//       staffCategories: selectedStaff,
//     };
//     console.log("Generating Staff Details Report for:", payload);
//   };

//   return (
//     <div className="w-full">
//       {/* Outer Card with Shadow */}
//       <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
//         {/* Card Header */}
//         <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
//           <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
//             Staff Details Report
//           </h5>
//         </div>

//         {/* Card Body */}
//         <div className="p-4 md:p-6 text-sm">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-end">
            
//             {/* From Date (span 2) */}
//             <div className="xl:col-span-2 flex flex-col gap-1">
//               <label htmlFor="txt_FromDate" className="font-medium text-gray-700">From Date</label>
//               <div className="relative">
//                 <input
//                   id="txt_FromDate"
//                   type="date"
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                   className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] h-[38px]"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
//                   <Calendar size={16} />
//                 </div>
//               </div>
//             </div>

//             {/* To Date (span 2) */}
//             <div className="xl:col-span-2 flex flex-col gap-1">
//               <label htmlFor="txt_ToDate" className="font-medium text-gray-700">To Date</label>
//               <div className="relative">
//                 <input
//                   id="txt_ToDate"
//                   type="date"
//                   value={toDate}
//                   onChange={(e) => setToDate(e.target.value)}
//                   className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B918C] focus:border-[#0B918C] h-[38px]"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
//                   <Calendar size={16} />
//                 </div>
//               </div>
//             </div>

//             {/* Hidden District Dropdown */}
//             <div className="hidden" id="div_district">
//               {/* Maintained for structural parity with HTML */}
//             </div>

//             {/* Hidden MTC Dropdown */}
//             <div className="hidden" id="div_mtc">
//               {/* Maintained for structural parity with HTML */}
//             </div>

//             {/* Staff by Category Multi-select (span 2) */}
//             <div className="xl:col-span-2 relative" ref={staffRef}>
//               <label className="block font-medium text-gray-700 mb-1">Staff by Category</label>
//               <button
//                 type="button"
//                 onClick={() => setIsStaffOpen(!isStaffOpen)}
//                 className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px] flex items-center justify-between transition-shadow"
//               >
//                 <span className="truncate text-gray-700">
//                   {getButtonText(selectedStaff.length, STAFF_CATEGORIES.length)}
//                 </span>
//                 <ChevronDown size={16} className={`ml-2 flex-shrink-0 text-gray-400 transition-transform ${isStaffOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {isStaffOpen && (
//                 <div className="absolute z-10 mt-1 w-full sm:w-72 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col">
//                   {/* Search Box */}
//                   <div className="p-2 border-b border-gray-100 relative bg-gray-50 rounded-t-md">
//                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
//                       <SearchIcon size={14} />
//                     </div>
//                     <input
//                       type="search"
//                       className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
//                       placeholder="Search category..."
//                       value={staffSearch}
//                       onChange={(e) => setStaffSearch(e.target.value)}
//                     />
//                   </div>

//                   <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
//                     {/* Select All Option */}
//                     {!staffSearch && (
//                       <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors font-semibold border-b border-gray-100 mb-1">
//                         <input
//                           type="checkbox"
//                           checked={selectedStaff.length === STAFF_CATEGORIES.length && STAFF_CATEGORIES.length > 0}
//                           onChange={toggleAllStaff}
//                           className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
//                         />
//                         <span className="text-gray-900 select-none">Select all</span>
//                       </label>
//                     )}

//                     {/* Individual Options */}
//                     {filteredStaff.map((staff) => (
//                       <label
//                         key={staff.id}
//                         className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
//                       >
//                         <input
//                           type="checkbox"
//                           checked={selectedStaff.includes(staff.id)}
//                           onChange={() => toggleStaff(staff.id)}
//                           className="w-4 h-4 rounded border-gray-300 text-[#0B918C] focus:ring-[#0B918C] cursor-pointer"
//                         />
//                         <span className="text-gray-700 select-none">{staff.name}</span>
//                       </label>
//                     ))}

//                     {filteredStaff.length === 0 && (
//                       <div className="p-3 text-center text-gray-500 text-sm">
//                         No results found
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Search Button (span 1) */}
//             <div className="xl:col-span-1 lg:pt-0 pt-2">
//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-4 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-[#0B918C] bg-white hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C]"
//               >
//                 <SearchIcon size={16} />
//                 Search
//               </button>
//             </div>

//           </div>

//           {/* Report Output Section */}
//           <div className="mt-8 flex justify-center">
//             <div id="div_Report" className="w-full text-center text-gray-500 pt-2">
//               {/* The table or data result will be rendered here */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Calendar, Search as SearchIcon, ChevronDown, Users } from "lucide-react";

// Data Constants
const STAFF_CATEGORIES = [
  { id: "1", name: "Medical Officer" },
  { id: "2", name: "ANM" },
  { id: "3", name: "Nutrition Counsellor" },
  { id: "4", name: "Cook cum Care Taker" },
  { id: "5", name: "Attendent Cleaner" },
  { id: "6", name: "Medical Social Worker" },
  { id: "7", name: "Block Data Manager" },
  { id: "8", name: "Block Programme Manager" },
  { id: "9", name: "Hospital Manager" },
  { id: "10", name: "Support Staff" },
];

export default function StaffDetailsReport() {
  // Form State
  const [fromDate, setFromDate] = useState<string>("2026-05-01");
  const [toDate, setToDate] = useState<string>("2026-05-15");
  
  // Staff Category State
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [isStaffOpen, setIsStaffOpen] = useState(false);
  const [staffSearch, setStaffSearch] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Ref for outside click handling
  const staffRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (staffRef.current && !staffRef.current.contains(event.target as Node)) {
        setIsStaffOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredStaff = STAFF_CATEGORIES.filter((s) =>
    s.name.toLowerCase().includes(staffSearch.toLowerCase())
  );

  const toggleStaff = (id: string) => {
    setSelectedStaff((prev) =>
      prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
    );
  };

  const toggleAllStaff = () => {
    setSelectedStaff(selectedStaff.length === STAFF_CATEGORIES.length ? [] : STAFF_CATEGORIES.map((s) => s.id));
  };

  const getButtonText = (selectedCount: number, totalCount: number) => {
    if (selectedCount === 0) return "None selected";
    if (selectedCount === totalCount) return `All selected (${totalCount})`;
    return `${selectedCount} selected`;
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
      {/* Outer Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
        {/* Card Header - Updated to Blue 700 / Blue 50 */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
          <Users size={20} className="text-blue-700" />
          <h5 className="text-[1.25rem] font-bold m-0 text-blue-700">
            Staff Details Report
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-4 md:p-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-end mb-8 pb-8 border-b border-gray-100">
            
            {/* From Date - Blue Focus */}
            <div className="xl:col-span-2 flex flex-col gap-1">
              <label htmlFor="txt_FromDate" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">From Date</label>
              <div className="relative">
                <input
                  id="txt_FromDate"
                  type="date"
                  value={fromDate}
                  onChange={(e) => { setFromDate(e.target.value); setShowReport(false); }}
                  className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-[38px]"
                />
                <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* To Date - Blue Focus */}
            <div className="xl:col-span-2 flex flex-col gap-1">
              <label htmlFor="txt_ToDate" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">To Date</label>
              <div className="relative">
                <input
                  id="txt_ToDate"
                  type="date"
                  value={toDate}
                  onChange={(e) => { setToDate(e.target.value); setShowReport(false); }}
                  className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-[38px]"
                />
                <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* Staff by Category Multi-select - Blue Accents */}
            <div className="xl:col-span-2 relative" ref={staffRef}>
              <label className="block font-bold text-gray-600 uppercase text-[10px] tracking-wider mb-1">Staff by Category</label>
              <button
                type="button"
                onClick={() => setIsStaffOpen(!isStaffOpen)}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] flex items-center justify-between"
              >
                <span className="truncate text-gray-700">
                  {getButtonText(selectedStaff.length, STAFF_CATEGORIES.length)}
                </span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isStaffOpen ? 'rotate-180' : ''}`} />
              </button>

              {isStaffOpen && (
                <div className="absolute z-10 mt-1 w-full sm:w-72 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col p-2">
                  <div className="p-2 border-b border-gray-100 relative bg-gray-50">
                    <SearchIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="search"
                      className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Search category..."
                      value={staffSearch}
                      onChange={(e) => setStaffSearch(e.target.value)}
                    />
                  </div>

                  <div className="max-h-60 overflow-y-auto p-1">
                    {!staffSearch && (
                      <label className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded cursor-pointer font-bold text-blue-700">
                        <input
                          type="checkbox"
                          checked={selectedStaff.length === STAFF_CATEGORIES.length}
                          onChange={toggleAllStaff}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                        />
                        <span>Select all</span>
                      </label>
                    )}
                    {filteredStaff.map((staff) => (
                      <label key={staff.id} className="flex items-center space-x-3 p-2 hover:bg-blue-50 rounded cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedStaff.includes(staff.id)}
                          onChange={() => toggleStaff(staff.id)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                        />
                        <span className="text-gray-700">{staff.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Button - Blue 600 */}
            <div className="xl:col-span-1 lg:pt-0 pt-2">
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm disabled:opacity-50"
              >
                <SearchIcon size={16} />
                {isSearching ? "..." : "Search"}
              </button>
            </div>

          </div>

          {/* Report Output Section */}
          <div className="mt-8">
            {showReport ? (
              <div className="animate-in fade-in duration-500 text-center text-gray-500 pt-2 italic">
                <div className="p-10 bg-blue-50/50 rounded-xl border border-dashed border-blue-200">
                  Detailed staff counts and designation-wise positioning table would render here.
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-10 italic">
                Select staff categories and dates to generate the position report.
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}