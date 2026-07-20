// // "use client";

// // import React, { useState } from "react";
// // import { Search } from "lucide-react";

// // // Data Constants
// // const YEARS = Array.from({ length: 26 }, (_, i) => (2001 + i).toString());

// // const MONTHS = [
// //   { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
// //   { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
// //   { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
// //   { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
// // ];

// // const REFERRED_BY_OPTIONS = [
// //   { id: "6", name: "Sahiya/ASHA" },
// //   { id: "1", name: "ANGANWADI" },
// //   { id: "2", name: "ANM" },
// //   { id: "7", name: "Poshan Sakhi" },
// //   { id: "8", name: "RBSK Team" },
// //   { id: "3", name: "OPD" },
// //   { id: "4", name: "SELF" },
// //   { id: "5", name: "OTHER" },
// // ];

// // export default function SahiyaAshaReferralReport() {
// //   // Form State
// //   const [year, setYear] = useState<string>("");
// //   const [month, setMonth] = useState<string>("");
// //   const [referredBy, setReferredBy] = useState<string>("");

// //   const handleSearch = () => {
// //     const payload = { year, month, referredBy };
// //     console.log("Generating Sahiya/ASHA Referral Report for:", payload);
// //     // Add API call or table population logic here
// //   };

// //   return (
// //     <div className="w-full">
// //       {/* Outer Card mimicking the 'card shadow' from HTML */}
// //       <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
// //         {/* Card Header */}
// //         <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
// //           <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
// //             Sahiya/ ASHA Referral Report
// //           </h5>
// //         </div>

// //         {/* Card Body */}
// //         <div className="p-4 md:p-6 text-sm">
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            
// //             {/* Year Select */}
// //             <div className="flex flex-col gap-1">
// //               <label htmlFor="dd_Year" className="font-medium text-gray-700">Year</label>
// //               <select
// //                 id="dd_Year"
// //                 value={year}
// //                 onChange={(e) => setYear(e.target.value)}
// //                 className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
// //               >
// //                 <option value="">Select Year</option>
// //                 {YEARS.map((yr) => (
// //                   <option key={yr} value={yr}>{yr}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Month Select */}
// //             <div className="flex flex-col gap-1">
// //               <label htmlFor="dd_Month" className="font-medium text-gray-700">Month</label>
// //               <select
// //                 id="dd_Month"
// //                 value={month}
// //                 onChange={(e) => setMonth(e.target.value)}
// //                 className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
// //               >
// //                 <option value="">Select Month</option>
// //                 {MONTHS.map((m) => (
// //                   <option key={m.id} value={m.id}>{m.name}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Referred By Select (Disabled state as per HTML) */}
// //             <div className="flex flex-col gap-1" id="div_district">
// //               <label htmlFor="dd_RefferedBy" className="font-medium text-gray-700">Referred By</label>
// //               <select
// //                 id="dd_RefferedBy"
// //                 disabled
// //                 value={referredBy}
// //                 onChange={(e) => setReferredBy(e.target.value)}
// //                 className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-md py-1.5 px-3 cursor-not-allowed h-[38px]"
// //               >
// //                 <option value="">Select</option>
// //                 {REFERRED_BY_OPTIONS.map((ref) => (
// //                   <option key={ref.id} value={ref.id}>{ref.name}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Search Button */}
// //             <div className="lg:pt-0 pt-2">
// //               <button
// //                 type="button"
// //                 onClick={handleSearch}
// //                 className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-[#0B918C] bg-white hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C]"
// //               >
// //                 <Search size={16} />
// //                 Search
// //               </button>
// //             </div>

// //           </div>

// //           {/* Report Output Section */}
// //           <div className="mt-8 flex justify-center">
// //             <div id="div_Report" className="w-full text-center text-gray-500 pt-2">
// //               {/* The table or data result will be rendered here */}
// //             </div>
// //           </div>
          
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState } from "react";
// import { Calendar, Search } from "lucide-react";

// // Data Constants
// const YEARS = Array.from({ length: 7 }, (_, i) => (2020 + i).toString());

// const MONTHS = [
//   { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
//   { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
//   { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
//   { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
// ];

// const REFERRED_BY_OPTIONS = [
//   { id: "6", name: "Sahiya/ASHA" },
//   { id: "1", name: "ANGANWADI" },
//   { id: "2", name: "ANM" },
//   { id: "7", name: "Poshan Sakhi" },
//   { id: "8", name: "RBSK Team" },
//   { id: "3", name: "OPD" },
//   { id: "4", name: "SELF" },
//   { id: "5", name: "OTHER" },
// ];

// export default function SahiyaAshaReferralReport() {
//   // Form State
//   const [year, setYear] = useState<string>("2026");
//   const [month, setMonth] = useState<string>("5");
//   const [referredBy, setReferredBy] = useState<string>("6");
//   const [showReport, setShowReport] = useState(false);

//   const handleSearch = () => {
//     const payload = { year, month, referredBy };
//     console.log("Generating Sahiya/ASHA Referral Report for:", payload);
//     setShowReport(true);
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
//       {/* Outer Card */}
//       <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
//         {/* Card Header - Updated to Blue 700 / Blue 50 */}
//         <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
//           <h5 className="text-[1.25rem] font-bold m-0 text-blue-700">
//             Sahiya/ ASHA Referral Report
//           </h5>
//         </div>

//         {/* Card Body */}
//         <div className="p-4 md:p-6 text-sm">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-8 pb-8 border-b border-gray-100">
            
//             {/* Year Select - Blue Focus */}
//             <div className="flex flex-col gap-1">
//               <label htmlFor="dd_Year" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">Year</label>
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

//             {/* Month Select - Blue Focus */}
//             <div className="flex flex-col gap-1">
//               <label htmlFor="dd_Month" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">Month</label>
//               <select
//                 id="dd_Month"
//                 value={month}
//                 onChange={(e) => { setMonth(e.target.value); setShowReport(false); }}
//                 className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] text-gray-700"
//               >
//                 <option value="">Select Month</option>
//                 {MONTHS.map((m) => (
//                   <option key={m.id} value={m.id}>{m.name}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Referred By Select - Disabled/Grayed */}
//             <div className="flex flex-col gap-1" id="div_district">
//               <label htmlFor="dd_RefferedBy" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">Referred By</label>
//               <select
//                 id="dd_RefferedBy"
//                 disabled
//                 value={referredBy}
//                 className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-md py-1.5 px-3 cursor-not-allowed h-[38px]"
//               >
//                 <option value="">Select</option>
//                 {REFERRED_BY_OPTIONS.map((ref) => (
//                   <option key={ref.id} value={ref.id}>{ref.name}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Search Button - Blue 600 */}
//             <div className="lg:pt-0 pt-2">
//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-blue-600 text-sm font-bold rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
//               >
//                 <Search size={16} />
//                 Search
//               </button>
//             </div>
//           </div>

//           {/* Report Output Section */}
//           <div className="mt-8">
//             {showReport ? (
//               <div className="animate-in fade-in duration-500">
//                 <div className="text-center mb-6">
//                   <h6 className="text-blue-900 font-black text-lg uppercase">Referral Analysis: {MONTHS.find(m => m.id === month)?.name} {year}</h6>
//                 </div>
//                 <div id="div_Report" className="w-full text-center text-gray-500 pt-2 italic">
//                   {/* Mock placeholder for data result */}
//                   Table showing Sahiya-wise referral counts and admission status would load here...
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center text-gray-400 py-20 border-2 border-dashed border-gray-100 rounded-xl">
//                 Select a period and click search to view Sahiya/ASHA referral efficiency.
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
import { Search } from "lucide-react";

// Data Constants
const YEARS = Array.from({ length: 7 }, (_, i) => (2020 + i).toString());

const MONTHS = [
  { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
  { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
  { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
  { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
];

const REFERRED_BY_OPTIONS = [
  { id: "6", name: "Sahiya/ASHA" },
  { id: "1", name: "ANGANWADI" },
  { id: "2", name: "ANM" },
  { id: "7", name: "Poshan Sakhi" },
  { id: "8", name: "RBSK Team" },
  { id: "3", name: "OPD" },
  { id: "4", name: "SELF" },
  { id: "5", name: "OTHER" },
];

export default function SahiyaAshaReferralReport() {
  // Form State
  const [year, setYear] = useState<string>("2026");
  const [month, setMonth] = useState<string>("5");
  const [referredBy] = useState<string>("6");
  const [showReport, setShowReport] = useState(false);

  const handleSearch = () => {
    const payload = { year, month, referredBy };
    console.log("Generating Sahiya/ASHA Referral Report for:", payload);
    setShowReport(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      {/* Outer Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
        {/* Card Header - Updated to Blue 700 / Blue 50 */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <h5 className="text-[1.25rem] font-bold m-0 text-blue-700">
            Sahiya/ ASHA Referral Report
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-4 md:p-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-8 pb-8 border-b border-gray-100">
            
            {/* Year Select - Blue Focus */}
            <div className="flex flex-col gap-1">
              <label htmlFor="dd_Year" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">Year</label>
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

            {/* Month Select - Blue Focus */}
            <div className="flex flex-col gap-1">
              <label htmlFor="dd_Month" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">Month</label>
              <select
                id="dd_Month"
                value={month}
                onChange={(e) => { setMonth(e.target.value); setShowReport(false); }}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] text-gray-700"
              >
                <option value="">Select Month</option>
                {MONTHS.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            {/* Referred By Select - Disabled/Grayed */}
            <div className="flex flex-col gap-1" id="div_district">
              <label htmlFor="dd_RefferedBy" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">Referred By</label>
              <select
                id="dd_RefferedBy"
                disabled
                value={referredBy}
                className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-md py-1.5 px-3 cursor-not-allowed h-[38px]"
              >
                <option value="">Select</option>
                {REFERRED_BY_OPTIONS.map((ref) => (
                  <option key={ref.id} value={ref.id}>{ref.name}</option>
                ))}
              </select>
            </div>

            {/* Search Button - Blue 600 */}
            <div className="lg:pt-0 pt-2">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-blue-600 text-sm font-bold rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
              >
                <Search size={16} />
                Search
              </button>
            </div>
          </div>

          {/* Report Output Section */}
          <div className="mt-8">
            {showReport ? (
              <div className="animate-in fade-in duration-500">
                <div className="text-center mb-6">
                  <h6 className="text-blue-900 font-black text-lg uppercase">Referral Analysis: {MONTHS.find(m => m.id === month)?.name} {year}</h6>
                </div>
                <div id="div_Report" className="w-full text-center text-gray-500 pt-2 italic">
                  Table showing Sahiya-wise referral counts and admission status would load here...
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-20 border-2 border-dashed border-gray-100 rounded-xl">
                Select a period and click search to view Sahiya/ASHA referral efficiency.
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}