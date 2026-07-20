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

// // export default function MtcMonthlyReport() {
// //   // Form State
// //   const [year, setYear] = useState<string>("");
// //   const [month, setMonth] = useState<string>("");
// //   const [district, setDistrict] = useState<string>("");
// //   const [mtc, setMtc] = useState<string>("");

// //   const handleSearch = () => {
// //     const payload = { year, month, district, mtc };
// //     console.log("Generating Monthly Report for:", payload);
// //     // Add your report generation logic here
// //   };

// //   return (
// //     <div className="w-full">
// //       {/* Card Header */}
// //       <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
// //         <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
// //           MTC Monthly Report
// //         </h5>
// //       </div>

// //       {/* Card Body */}
// //       <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200 p-4 md:p-6 text-sm">
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4 items-end">
          
// //           {/* Year Select */}
// //           <div className="flex flex-col gap-1">
// //             <label htmlFor="dd_Year" className="font-medium text-gray-700">Year</label>
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

// //           {/* Month Select */}
// //           <div className="flex flex-col gap-1">
// //             <label htmlFor="dd_Month" className="font-medium text-gray-700">Month</label>
// //             <select
// //               id="dd_Month"
// //               value={month}
// //               onChange={(e) => setMonth(e.target.value)}
// //               className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#0B918C] h-[38px]"
// //             >
// //               <option value="">Select Month</option>
// //               {MONTHS.map((m) => (
// //                 <option key={m.id} value={m.id}>{m.name}</option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* District Select (Disabled state as per HTML) */}
// //           <div className="flex flex-col gap-1">
// //             <label htmlFor="ddl_District" className="font-medium text-gray-700">District</label>
// //             <select
// //               id="ddl_District"
// //               disabled
// //               value={district}
// //               onChange={(e) => setDistrict(e.target.value)}
// //               className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-md py-1.5 px-3 cursor-not-allowed h-[38px]"
// //             >
// //               <option value="">Select</option>
// //               {DISTRICTS.map((d) => (
// //                 <option key={d.id} value={d.id}>{d.name}</option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* MTC Select */}
// //           <div className="flex flex-col gap-1">
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

// //           {/* Search Button */}
// //           <div className="lg:pt-0 pt-2">
// //             <button
// //               type="button"
// //               onClick={handleSearch}
// //               className="w-full lg:w-auto h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-[#0B918C] bg-white hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C]"
// //             >
// //               <Search size={16} />
// //               Search
// //             </button>
// //           </div>

// //         </div>

// //         {/* Report Section */}
// //         <div className="mt-8 flex justify-center">
// //           <div id="div_Report" className="w-full max-w-5xl">
// //             {/* The table or data result will be rendered here */}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import React, { useState } from "react";
// import { Search, FileText } from "lucide-react";

// // Data Constants
// const YEARS = Array.from({ length: 7 }, (_, i) => (2020 + i).toString());

// const MONTHS = [
//   { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
//   { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
//   { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
//   { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
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

// const MTC_OPTIONS = [
//   { id: "26", name: "BUNDU" },
//   { id: "27", name: "DORANDA" },
//   { id: "28", name: "MANDAR" },
//   { id: "29", name: "BERO" },
//   { id: "107", name: "UP REFERRAL RIMS" },
// ];

// export default function MtcMonthlyReport() {
//   // Form State
//   const [year, setYear] = useState<string>("2026");
//   const [month, setMonth] = useState<string>("5");
//   const [district, setDistrict] = useState<string>("8");
//   const [mtc, setMtc] = useState<string>("");
//   const [showReport, setShowReport] = useState(false);

//   const handleSearch = () => {
//     const payload = { year, month, district, mtc };
//     console.log("Generating Monthly Report for:", payload);
//     setShowReport(true);
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
//       {/* Outer Card */}
//       <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
//         {/* Card Header - Updated to Blue 700 / Blue 50 */}
//         <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
//           <FileText size={20} className="text-blue-700" />
//           <h5 className="text-[1.25rem] font-bold m-0 text-blue-700">
//             MTC Monthly Report
//           </h5>
//         </div>

//         {/* Card Body */}
//         <div className="p-4 md:p-6 text-sm">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
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

//             {/* District Select - Disabled/Grayed */}
//             <div className="flex flex-col gap-1">
//               <label htmlFor="ddl_District" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">District</label>
//               <select
//                 id="ddl_District"
//                 disabled
//                 value={district}
//                 className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-md py-1.5 px-3 cursor-not-allowed h-[38px]"
//               >
//                 <option value="">Select</option>
//                 {DISTRICTS.map((d) => (
//                   <option key={d.id} value={d.id}>{d.name}</option>
//                 ))}
//               </select>
//             </div>

//             {/* MTC Select - Blue Focus */}
//             <div className="flex flex-col gap-1">
//               <label htmlFor="ddl_Mtc" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">MTC</label>
//               <select
//                 id="ddl_Mtc"
//                 value={mtc}
//                 onChange={(e) => { setMtc(e.target.value); setShowReport(false); }}
//                 className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] text-gray-700"
//               >
//                 <option value="">Select MTC</option>
//                 {MTC_OPTIONS.map((opt) => (
//                   <option key={opt.id} value={opt.id}>{opt.name}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Search Button - Blue 600 */}
//             <div className="lg:pt-0 pt-2">
//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-blue-600 text-sm font-bold rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <Search size={16} />
//                 Generate Report
//               </button>
//             </div>

//           </div>

//           {/* Report Section */}
//           <div className="mt-8 border-t border-gray-100 pt-6">
//             {showReport ? (
//               <div className="animate-in fade-in duration-500 text-center">
//                 <div className="inline-block p-4 bg-blue-50 rounded-lg border border-blue-100">
//                   <p className="text-blue-800 font-medium">
//                     Showing results for {MONTHS.find(m => m.id === month)?.name} {year}
//                   </p>
//                 </div>
//                 {/* Mock data or Table would render here */}
//               </div>
//             ) : (
//               <div className="text-center text-gray-400 py-10 italic">
//                 Select parameters and click search to view the monthly analysis.
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
import { Search, FileText } from "lucide-react";

// Data Constants
const YEARS = Array.from({ length: 7 }, (_, i) => (2020 + i).toString());

const MONTHS = [
  { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
  { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
  { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
  { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
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

const MTC_OPTIONS = [
  { id: "26", name: "BUNDU" },
  { id: "27", name: "DORANDA" },
  { id: "28", name: "MANDAR" },
  { id: "29", name: "BERO" },
  { id: "107", name: "UP REFERRAL RIMS" },
];

export default function MtcMonthlyReport() {
  // Form State
  const [year, setYear] = useState<string>("2026");
  const [month, setMonth] = useState<string>("5");
  const [district] = useState<string>("8");
  const [mtc, setMtc] = useState<string>("");
  const [showReport, setShowReport] = useState(false);

  const handleSearch = () => {
    const payload = { year, month, district, mtc };
    console.log("Generating Monthly Report for:", payload);
    setShowReport(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Outer Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
        {/* Card Header - Updated to Blue 700 / Blue 50 */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
          <FileText size={20} className="text-blue-700" />
          <h5 className="text-[1.25rem] font-bold m-0 text-blue-700">
            MTC Monthly Report
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-4 md:p-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
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

            {/* District Select - Disabled/Grayed */}
            <div className="flex flex-col gap-1">
              <label htmlFor="ddl_District" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">District</label>
              <select
                id="ddl_District"
                disabled
                value={district}
                className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-md py-1.5 px-3 cursor-not-allowed h-[38px]"
              >
                <option value="">Select</option>
                {DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* MTC Select - Blue Focus */}
            <div className="flex flex-col gap-1">
              <label htmlFor="ddl_Mtc" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">MTC</label>
              <select
                id="ddl_Mtc"
                value={mtc}
                onChange={(e) => { setMtc(e.target.value); setShowReport(false); }}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] text-gray-700"
              >
                <option value="">Select MTC</option>
                {MTC_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
              </select>
            </div>

            {/* Search Button - Blue 600 */}
            <div className="lg:pt-0 pt-2">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-blue-600 text-sm font-bold rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Search size={16} />
                Generate Report
              </button>
            </div>

          </div>

          {/* Report Section */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            {showReport ? (
              <div className="animate-in fade-in duration-500 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-blue-800 font-medium">
                    Showing results for {MONTHS.find(m => m.id === month)?.name} {year}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-10 italic">
                Select parameters and click search to view the monthly analysis.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}