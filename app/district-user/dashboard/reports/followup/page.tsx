// "use client";

// import React, { useState } from "react";
// import { Calendar, Search } from "lucide-react";

// const FOLLOWED_BY_OPTIONS = [
//   { id: "6", name: "Sahiya/ASHA" },
//   { id: "1", name: "ANGANWADI" },
//   { id: "2", name: "ANM" },
//   { id: "7", name: "Poshan Sakhi" },
//   { id: "8", name: "RBSK Team" },
//   { id: "3", name: "OPD" },
//   { id: "4", name: "SELF" },
//   { id: "5", name: "OTHER" },
// ];

// export default function FollowedUpReport() {
//   // Form State
//   const [fromDate, setFromDate] = useState<string>("");
//   const [toDate, setToDate] = useState<string>("");
//   const [followedBy, setFollowedBy] = useState<string>("");

//   const handleSearch = () => {
//     const payload = { fromDate, toDate, followedBy };
//     console.log("Generating Followed-up Report for:", payload);
//     // Add logic to fetch and display the report data here
//   };

//   return (
//     <div className="w-full">
//       {/* Outer Card with Shadow */}
//       <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
//         {/* Card Header */}
//         <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
//           <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
//             Followed-up Report
//           </h5>
//         </div>

//         {/* Card Body */}
//         <div className="p-4 md:p-6 text-sm">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            
//             {/* From Date */}
//             <div className="flex flex-col gap-1">
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

//             {/* To Date */}
//             <div className="flex flex-col gap-1">
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

//             {/* Followed-up By Select */}
//             <div className="flex flex-col gap-1">
//               <label htmlFor="dd_followedBy" className="font-medium text-gray-700">Followed-up By</label>
//               <select
//                 id="dd_followedBy"
//                 value={followedBy}
//                 onChange={(e) => setFollowedBy(e.target.value)}
//                 className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
//               >
//                 <option value="">Select</option>
//                 {FOLLOWED_BY_OPTIONS.map((opt) => (
//                   <option key={opt.id} value={opt.id}>{opt.name}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Search Button */}
//             <div className="lg:pt-0 pt-2">
//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-[#0B918C] bg-white hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C]"
//               >
//                 <Search size={16} />
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

import React, { useState } from "react";
import { Calendar, Search } from "lucide-react";

const FOLLOWED_BY_OPTIONS = [
  { id: "6", name: "Sahiya/ASHA" },
  { id: "1", name: "ANGANWADI" },
  { id: "2", name: "ANM" },
  { id: "7", name: "Poshan Sakhi" },
  { id: "8", name: "RBSK Team" },
  { id: "3", name: "OPD" },
  { id: "4", name: "SELF" },
  { id: "5", name: "OTHER" },
];

export default function FollowedUpReport() {
  // Form State
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [followedBy, setFollowedBy] = useState<string>("");

  const handleSearch = () => {
    const payload = { fromDate, toDate, followedBy };
    console.log("Generating Followed-up Report for:", payload);
  };

  return (
    <div className="w-full">
      {/* Outer Card with Shadow */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
        {/* Card Header - Updated to Blue 700 */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <h5 className="text-[1.25rem] font-bold m-0 text-blue-700">
            Followed-up Report
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-4 md:p-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            
            {/* From Date - Blue Focus */}
            <div className="flex flex-col gap-1">
              <label htmlFor="txt_FromDate" className="font-medium text-gray-700">From Date</label>
              <div className="relative">
                <input
                  id="txt_FromDate"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-[38px]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <Calendar size={16} />
                </div>
              </div>
            </div>

            {/* To Date - Blue Focus */}
            <div className="flex flex-col gap-1">
              <label htmlFor="txt_ToDate" className="font-medium text-gray-700">To Date</label>
              <div className="relative">
                <input
                  id="txt_ToDate"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-[38px]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <Calendar size={16} />
                </div>
              </div>
            </div>

            {/* Followed-up By Select - Blue Focus */}
            <div className="flex flex-col gap-1">
              <label htmlFor="dd_followedBy" className="font-medium text-gray-700">Followed-up By</label>
              <select
                id="dd_followedBy"
                value={followedBy}
                onChange={(e) => setFollowedBy(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
              >
                <option value="">Select</option>
                {FOLLOWED_BY_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
              </select>
            </div>

            {/* Search Button - Blue 600 Border/Text */}
            <div className="lg:pt-0 pt-2">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-blue-600 text-sm font-bold rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Search size={16} />
                Search
              </button>
            </div>

          </div>

          {/* Report Output Section */}
          <div className="mt-8 flex justify-center">
            <div id="div_Report" className="w-full text-center text-gray-500 pt-2">
              {/* Data result will be rendered here */}
              <p className="italic opacity-60">Select parameters to generate results.</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}