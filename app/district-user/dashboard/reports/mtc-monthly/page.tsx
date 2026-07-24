// "use client";

// import React, { useState } from "react";
// import { Search, FileText, Filter, CheckCircle2, Calendar } from "lucide-react";

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

// // Helper function to generate date-wise dummy records between From Date and To Date
// const generateRangeData = (startStr: string, endStr: string) => {
//   if (!startStr || !endStr) return [];
  
//   const start = new Date(startStr);
//   const end = new Date(endStr);
  
//   if (start > end) return [];

//   const data = [];
//   let current = new Date(start);
//   let dayCounter = 1;

//   while (current <= end) {
//     const formattedDate = current.toISOString().split("T")[0];
    
//     data.push({
//       id: `date-${formattedDate}`,
//       date: formattedDate,
//       mtcName: "BUNDU",
//       totalAdmissions: (dayCounter % 3) + 1,
//       criteria: {
//         wfhLess3SD: dayCounter % 2,
//         muacLess115: (dayCounter + 1) % 2,
//         edema: dayCounter % 4 === 0 ? 1 : 0,
//       },
//       referredBy: {
//         asha: (dayCounter % 2) + 1,
//         anm: dayCounter % 3 === 0 ? 1 : 0,
//         self: dayCounter % 5 === 0 ? 1 : 0,
//       },
//       durationOfStay: {
//         lessThan7Days: dayCounter % 2,
//         sevenTo14Days: (dayCounter % 3) + 1,
//         moreThan14Days: dayCounter % 4 === 0 ? 1 : 0,
//         avgStayDays: (7 + (dayCounter % 7)).toFixed(1),
//       },
//       monthlyOutput: {
//         cured: (dayCounter % 2) + 1,
//         defaulter: dayCounter % 6 === 0 ? 1 : 0,
//         discharged: dayCounter % 4 === 0 ? 1 : 0,
//         referredHigher: dayCounter % 10 === 0 ? 1 : 0,
//         curedRatePercentage: `${70 + (dayCounter % 25)}%`,
//       },
//     });

//     current.setDate(current.getDate() + 1);
//     dayCounter++;
//   }

//   return data;
// };

// export default function MtcMonthlyReport() {
//   // Form State
//   const [fromDate, setFromDate] = useState<string>("2026-05-01");
//   const [toDate, setToDate] = useState<string>("2026-05-15");
//   const [district] = useState<string>("8");
//   const [mtc, setMtc] = useState<string>("26");
//   const [showReport, setShowReport] = useState(false);
//   const [reportData, setReportData] = useState<any[]>([]);

//   const handleSearch = () => {
//     const payload = { fromDate, toDate, district, mtc };
//     console.log("Generating Monthly Report for:", payload);
//     const data = generateRangeData(fromDate, toDate);
//     setReportData(data);
//     setShowReport(true);
//   };

//   const selectedMtcName = MTC_OPTIONS.find((m) => m.id === mtc)?.name || "All MTCs";

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
//       {/* Outer Card */}
//       <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
//         {/* Card Header */}
//         <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
//           <FileText size={20} className="text-blue-700" />
//           <h5 className="text-[1.25rem] font-bold m-0 text-blue-700">
//             MTC Monthly Report
//           </h5>
//         </div>

//         {/* Card Body */}
//         <div className="p-4 md:p-6 text-sm">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
//             {/* From Date Select */}
//             <div className="flex flex-col gap-1">
//               <label htmlFor="txt_FromDate" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">
//                 From Date
//               </label>
//               <div className="relative">
//                 <input
//                   id="txt_FromDate"
//                   type="date"
//                   value={fromDate}
//                   onChange={(e) => { setFromDate(e.target.value); setShowReport(false); }}
//                   className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] text-gray-700"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
//                   <Calendar size={16} />
//                 </div>
//               </div>
//             </div>

//             {/* To Date Select */}
//             <div className="flex flex-col gap-1">
//               <label htmlFor="txt_ToDate" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">
//                 To Date
//               </label>
//               <div className="relative">
//                 <input
//                   id="txt_ToDate"
//                   type="date"
//                   value={toDate}
//                   onChange={(e) => { setToDate(e.target.value); setShowReport(false); }}
//                   className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] text-gray-700"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
//                   <Calendar size={16} />
//                 </div>
//               </div>
//             </div>

//             {/* District Select */}
//             <div className="flex flex-col gap-1">
//               <label htmlFor="ddl_District" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">
//                 District
//               </label>
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

//             {/* MTC Select */}
//             <div className="flex flex-col gap-1">
//               <label htmlFor="ddl_Mtc" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">
//                 MTC
//               </label>
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

//             {/* Search Button */}
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

//           {/* Report Output Section */}
//           <div className="mt-8 border-t border-gray-100 pt-6">
//             {showReport ? (
//               <div className="space-y-6">
                
//                 {/* Status Banner */}
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-blue-50 rounded-lg border border-blue-100 gap-2">
//                   <div className="flex items-center gap-2 text-blue-900 font-semibold">
//                     <CheckCircle2 size={18} className="text-blue-600" />
//                     Monthly Report ({fromDate} to {toDate})
//                   </div>
//                   <div className="flex gap-2 text-xs">
//                     <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full font-medium">
//                       MTC: {selectedMtcName}
//                     </span>
//                     <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full font-medium">
//                       District: RANCHI
//                     </span>
//                   </div>
//                 </div>

//                 {/* Report Table */}
//                 <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
//                   <table className="w-full text-left text-xs border-collapse">
//                     <thead className="bg-gray-100 border-b border-gray-200 text-gray-700 font-semibold uppercase">
//                       <tr>
//                         <th className="py-3 px-3 border-r min-w-[100px]" rowSpan={2}>Date</th>
//                         <th className="py-3 px-3 border-r min-w-[120px]" rowSpan={2}>MTC Name</th>
//                         <th className="py-3 px-3 border-r text-center bg-blue-100/50" rowSpan={2}>
//                           Admissions
//                         </th>
//                         <th className="py-2 px-3 border-r text-center bg-gray-200/60" colSpan={3}>
//                           Admission Criteria
//                         </th>
//                         <th className="py-2 px-3 border-r text-center bg-gray-200/60" colSpan={3}>
//                           Referred By
//                         </th>
//                         <th className="py-2 px-3 border-r text-center bg-gray-200/60" colSpan={4}>
//                           Duration of Stay
//                         </th>
//                         <th className="py-2 px-3 text-center bg-green-100/60" colSpan={5}>
//                           Monthly Output
//                         </th>
//                       </tr>
//                       <tr className="bg-gray-50 border-b border-gray-200 text-[11px] text-gray-600">
//                         {/* Admission Criteria Subheaders */}
//                         <th className="py-2 px-2 border-r text-center">SD &lt; -3</th>
//                         <th className="py-2 px-2 border-r text-center">MUAC &lt; 11.5cm</th>
//                         <th className="py-2 px-2 border-r text-center">Edema</th>

//                         {/* Referred By Subheaders */}
//                         <th className="py-2 px-2 border-r text-center">ASHA</th>
//                         <th className="py-2 px-2 border-r text-center">ANM</th>
//                         <th className="py-2 px-2 border-r text-center">Self/Other</th>

//                         {/* Duration of Stay Subheaders */}
//                         <th className="py-2 px-2 border-r text-center">&lt; 7 Days</th>
//                         <th className="py-2 px-2 border-r text-center">7 - 14 Days</th>
//                         <th className="py-2 px-2 border-r text-center">&gt; 14 Days</th>
//                         <th className="py-2 px-2 border-r text-center bg-gray-100">Avg Stay</th>

//                         {/* Monthly Output Subheaders */}
//                         <th className="py-2 px-2 border-r text-center text-green-800">Cured</th>
//                         <th className="py-2 px-2 border-r text-center text-amber-800">Defaulter</th>
//                         <th className="py-2 px-2 border-r text-center">Discharged</th>
//                         <th className="py-2 px-2 border-r text-center text-red-800">Referred</th>
//                         <th className="py-2 px-2 text-center bg-green-200/50 font-bold text-green-900">
//                           Cure Rate
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200 text-gray-800">
//                       {reportData.length > 0 ? (
//                         reportData.map((row) => (
//                           <tr key={row.id} className="hover:bg-gray-50 transition-colors">
//                             <td className="py-2.5 px-3 border-r font-mono font-medium text-gray-600">
//                               {row.date}
//                             </td>
//                             <td className="py-2.5 px-3 border-r font-bold text-blue-700">
//                               {selectedMtcName}
//                             </td>
//                             <td className="py-2.5 px-3 border-r text-center font-bold bg-blue-50/40 text-blue-900">
//                               {row.totalAdmissions}
//                             </td>

//                             {/* Admission Criteria Data */}
//                             <td className="py-2.5 px-2 border-r text-center">{row.criteria.wfhLess3SD}</td>
//                             <td className="py-2.5 px-2 border-r text-center">{row.criteria.muacLess115}</td>
//                             <td className="py-2.5 px-2 border-r text-center">{row.criteria.edema}</td>

//                             {/* Referred By Data */}
//                             <td className="py-2.5 px-2 border-r text-center">{row.referredBy.asha}</td>
//                             <td className="py-2.5 px-2 border-r text-center">{row.referredBy.anm}</td>
//                             <td className="py-2.5 px-2 border-r text-center">{row.referredBy.self}</td>

//                             {/* Duration of Stay Data */}
//                             <td className="py-2.5 px-2 border-r text-center">{row.durationOfStay.lessThan7Days}</td>
//                             <td className="py-2.5 px-2 border-r text-center">{row.durationOfStay.sevenTo14Days}</td>
//                             <td className="py-2.5 px-2 border-r text-center">{row.durationOfStay.moreThan14Days}</td>
//                             <td className="py-2.5 px-2 border-r text-center font-semibold bg-gray-50">
//                               {row.durationOfStay.avgStayDays} d
//                             </td>

//                             {/* Monthly Output Data */}
//                             <td className="py-2.5 px-2 border-r text-center font-semibold text-green-700">
//                               {row.monthlyOutput.cured}
//                             </td>
//                             <td className="py-2.5 px-2 border-r text-center text-amber-700">
//                               {row.monthlyOutput.defaulter}
//                             </td>
//                             <td className="py-2.5 px-2 border-r text-center">{row.monthlyOutput.discharged}</td>
//                             <td className="py-2.5 px-2 border-r text-center text-red-600">
//                               {row.monthlyOutput.referredHigher}
//                             </td>
//                             <td className="py-2.5 px-2 text-center font-bold bg-green-50 text-green-800">
//                               {row.monthlyOutput.curedRatePercentage}
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan={18} className="text-center py-6 text-gray-500 italic">
//                             No records found for the selected date range.
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>

//               </div>
//             ) : (
//               <div className="text-center text-gray-400 py-10 italic flex flex-col items-center gap-2">
//                 <Filter size={24} className="text-gray-300" />
//                 Select dates and click search to view the monthly report.
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { Search, FileText, Filter, CheckCircle2, Calendar, Loader2, ChevronDown, Lock } from "lucide-react";

interface DistrictOption {
  id: string;
  name: string;
}

interface MtcOption {
  id: string;
  name: string;
}

export default function MtcMonthlyReport() {
  // Locked Active District
  const lockedDistrictName = "RANCHI";

  // Form State
  const [fromDate, setFromDate] = useState<string>("2026-05-01");
  const [toDate, setToDate] = useState<string>("2026-05-15");
  const [selectedMtc, setSelectedMtc] = useState<string>("ALL");

  // Dynamic Options States
  const [districts, setDistricts] = useState<DistrictOption[]>([]);
  const [mtcOptions, setMtcOptions] = useState<MtcOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState<boolean>(true);

  // Output & API Request States
  const [showReport, setShowReport] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [reportData, setReportData] = useState<any[]>([]);

  // 1. Fetch Dynamic Districts and MTCs from DB on component mount
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      setLoadingOptions(true);
      try {
        const res = await fetch(`/api/reports/mtc-monthly-report?type=options&districtName=${lockedDistrictName}`);
        const json = await res.json();

        if (json.success) {
          setDistricts(json.districts || []);
          setMtcOptions(json.mtcs || []);
        }
      } catch (err) {
        console.error("Failed to load options from DB:", err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchDropdownOptions();
  }, [lockedDistrictName]);

  // 2. Fetch Aggregated Report Data
  const handleSearch = async () => {
    setLoading(true);
    setShowReport(false);

    try {
      const params = new URLSearchParams({
        fromDate,
        toDate,
        districtName: lockedDistrictName,
        mtc: selectedMtc,
      });

      const res = await fetch(`/api/reports/mtc-monthly-report?${params.toString()}`);
      const json = await res.json();

      if (json.success) {
        setReportData(json.data || []);
        setShowReport(true);
      } else {
        console.error("API error:", json.error);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectedMtcLabel =
    selectedMtc === "ALL"
      ? "All MTCs"
      : mtcOptions.find((m) => m.id === selectedMtc)?.name || "Selected MTC";

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      {/* Outer Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
        {/* Card Header */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-blue-700" />
            <h5 className="text-[1.25rem] font-bold m-0 text-blue-700">
              MTC Monthly Report
            </h5>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <Lock size={12} /> District Scope Locked
          </span>
        </div>

        {/* Card Body Controls */}
        <div className="p-4 md:p-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
            {/* From Date */}
            <div className="flex flex-col gap-1">
              <label htmlFor="txt_FromDate" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">
                From Date
              </label>
              <div className="relative">
                <input
                  id="txt_FromDate"
                  type="date"
                  value={fromDate}
                  onChange={(e) => { setFromDate(e.target.value); setShowReport(false); }}
                  className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] text-gray-700"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <Calendar size={16} />
                </div>
              </div>
            </div>

            {/* To Date */}
            <div className="flex flex-col gap-1">
              <label htmlFor="txt_ToDate" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">
                To Date
              </label>
              <div className="relative">
                <input
                  id="txt_ToDate"
                  type="date"
                  value={toDate}
                  onChange={(e) => { setToDate(e.target.value); setShowReport(false); }}
                  className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] text-gray-700"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <Calendar size={16} />
                </div>
              </div>
            </div>

            {/* District Scope (Locked & Dynamically Fetched from Database) */}
            <div className="flex flex-col gap-1">
              <label htmlFor="ddl_District" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">
                District Scope
              </label>
              <div className="relative">
                <select
                  id="ddl_District"
                  disabled={true}
                  value={lockedDistrictName}
                  className="w-full bg-slate-100 text-slate-600 border border-gray-300 rounded-md py-1.5 px-3 cursor-not-allowed h-[38px] appearance-none font-medium"
                >
                  <option value={lockedDistrictName}>{lockedDistrictName}</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* MTC Select (Populated dynamically from DB for the active district) */}
            <div className="flex flex-col gap-1">
              <label htmlFor="ddl_Mtc" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">
                MTC Center
              </label>
              <select
                id="ddl_Mtc"
                value={selectedMtc}
                disabled={loadingOptions}
                onChange={(e) => { setSelectedMtc(e.target.value); setShowReport(false); }}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] text-gray-700 disabled:bg-gray-50"
              >
                <option value="ALL">All MTC Centers</option>
                {mtcOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
              </select>
            </div>

            {/* Search Trigger Button */}
            <div className="lg:pt-0 pt-2">
              <button
                type="button"
                onClick={handleSearch}
                disabled={loading || loadingOptions}
                className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-blue-600 text-sm font-bold rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin text-blue-600" />
                ) : (
                  <Search size={16} />
                )}
                {loading ? "Generating..." : "Generate Report"}
              </button>
            </div>

          </div>

          {/* Report Output Area */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            {showReport ? (
              <div className="space-y-6">
                
                {/* Header Info Banner */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-blue-50 rounded-lg border border-blue-100 gap-2">
                  <div className="flex items-center gap-2 text-blue-900 font-semibold">
                    <CheckCircle2 size={18} className="text-blue-600" />
                    Monthly Report Output ({fromDate} to {toDate})
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full font-medium">
                      MTC: {selectedMtcLabel}
                    </span>
                    <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full font-medium">
                      District: {lockedDistrictName}
                    </span>
                  </div>
                </div>

                {/* Report Table */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-200 text-gray-700 font-semibold uppercase">
                      <tr>
                        <th className="py-3 px-3 border-r min-w-[100px]" rowSpan={2}>Date</th>
                        <th className="py-3 px-3 border-r min-w-[120px]" rowSpan={2}>MTC Name</th>
                        <th className="py-3 px-3 border-r text-center bg-blue-100/50" rowSpan={2}>
                          Admissions
                        </th>
                        <th className="py-2 px-3 border-r text-center bg-gray-200/60" colSpan={3}>
                          Admission Criteria
                        </th>
                        <th className="py-2 px-3 border-r text-center bg-gray-200/60" colSpan={3}>
                          Referred By
                        </th>
                        <th className="py-2 px-3 border-r text-center bg-gray-200/60" colSpan={4}>
                          Duration of Stay
                        </th>
                        <th className="py-2 px-3 text-center bg-green-100/60" colSpan={5}>
                          Monthly Output
                        </th>
                      </tr>
                      <tr className="bg-gray-50 border-b border-gray-200 text-[11px] text-gray-600">
                        {/* Admission Criteria Subheaders */}
                        <th className="py-2 px-2 border-r text-center">SD &lt; -3</th>
                        <th className="py-2 px-2 border-r text-center">MUAC &lt; 11.5cm</th>
                        <th className="py-2 px-2 border-r text-center">Edema</th>

                        {/* Referred By Subheaders */}
                        <th className="py-2 px-2 border-r text-center">ASHA</th>
                        <th className="py-2 px-2 border-r text-center">ANM</th>
                        <th className="py-2 px-2 border-r text-center">Self/Other</th>

                        {/* Duration of Stay Subheaders */}
                        <th className="py-2 px-2 border-r text-center">&lt; 7 Days</th>
                        <th className="py-2 px-2 border-r text-center">7 - 14 Days</th>
                        <th className="py-2 px-2 border-r text-center">&gt; 14 Days</th>
                        <th className="py-2 px-2 border-r text-center bg-gray-100">Avg Stay</th>

                        {/* Monthly Output Subheaders */}
                        <th className="py-2 px-2 border-r text-center text-green-800">Cured</th>
                        <th className="py-2 px-2 border-r text-center text-amber-800">Defaulter</th>
                        <th className="py-2 px-2 border-r text-center">Discharged</th>
                        <th className="py-2 px-2 border-r text-center text-red-800">Referred</th>
                        <th className="py-2 px-2 text-center bg-green-200/50 font-bold text-green-900">
                          Cure Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-800">
                      {reportData.length > 0 ? (
                        reportData.map((row) => (
                          <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-2.5 px-3 border-r font-mono font-medium text-gray-600">
                              {row.date}
                            </td>
                            <td className="py-2.5 px-3 border-r font-bold text-blue-700">
                              {row.mtcName}
                            </td>
                            <td className="py-2.5 px-3 border-r text-center font-bold bg-blue-50/40 text-blue-900">
                              {row.totalAdmissions}
                            </td>

                            {/* Criteria */}
                            <td className="py-2.5 px-2 border-r text-center">{row.criteria.wfhLess3SD}</td>
                            <td className="py-2.5 px-2 border-r text-center">{row.criteria.muacLess115}</td>
                            <td className="py-2.5 px-2 border-r text-center">{row.criteria.edema}</td>

                            {/* Referred By */}
                            <td className="py-2.5 px-2 border-r text-center">{row.referredBy.asha}</td>
                            <td className="py-2.5 px-2 border-r text-center">{row.referredBy.anm}</td>
                            <td className="py-2.5 px-2 border-r text-center">{row.referredBy.self}</td>

                            {/* Stay Duration */}
                            <td className="py-2.5 px-2 border-r text-center">{row.durationOfStay.lessThan7Days}</td>
                            <td className="py-2.5 px-2 border-r text-center">{row.durationOfStay.sevenTo14Days}</td>
                            <td className="py-2.5 px-2 border-r text-center">{row.durationOfStay.moreThan14Days}</td>
                            <td className="py-2.5 px-2 border-r text-center font-semibold bg-gray-50">
                              {row.durationOfStay.avgStayDays} d
                            </td>

                            {/* Monthly Output */}
                            <td className="py-2.5 px-2 border-r text-center font-semibold text-green-700">
                              {row.monthlyOutput.cured}
                            </td>
                            <td className="py-2.5 px-2 border-r text-center text-amber-700">
                              {row.monthlyOutput.defaulter}
                            </td>
                            <td className="py-2.5 px-2 border-r text-center">{row.monthlyOutput.discharged}</td>
                            <td className="py-2.5 px-2 border-r text-center text-red-600">
                              {row.monthlyOutput.referredHigher}
                            </td>
                            <td className="py-2.5 px-2 text-center font-bold bg-green-50 text-green-800">
                              {row.monthlyOutput.curedRatePercentage}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={18} className="text-center py-6 text-gray-500 italic">
                            No records found for the selected date range and MTC filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            ) : (
              <div className="text-center text-gray-400 py-10 italic flex flex-col items-center gap-2">
                <Filter size={24} className="text-gray-300" />
                Select date range and click generate to view the report.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}