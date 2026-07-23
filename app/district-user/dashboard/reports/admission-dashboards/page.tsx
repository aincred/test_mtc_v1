// // // // // // // "use client";

// // // // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // // // import { Calendar, Search, FileSpreadsheet, FileText, Image as ImageIcon, ChevronDown } from "lucide-react";
// // // // // // // import {
// // // // // // //   Chart as ChartJS,
// // // // // // //   CategoryScale,
// // // // // // //   LinearScale,
// // // // // // //   BarElement,
// // // // // // //   Title,
// // // // // // //   Tooltip,
// // // // // // //   Legend,
// // // // // // //   ArcElement
// // // // // // // } from "chart.js";
// // // // // // // import { Bar, Doughnut } from "react-chartjs-2";

// // // // // // // // Register ChartJS components
// // // // // // // ChartJS.register(
// // // // // // //   CategoryScale,
// // // // // // //   LinearScale,
// // // // // // //   BarElement,
// // // // // // //   Title,
// // // // // // //   Tooltip,
// // // // // // //   Legend,
// // // // // // //   ArcElement
// // // // // // // );

// // // // // // // interface District {
// // // // // // //   id: string;
// // // // // // //   name: string;
// // // // // // // }

// // // // // // // const DISTRICTS: District[] = [
// // // // // // //   { id: "1", name: "BOKARO" },
// // // // // // //   { id: "2", name: "CHATRA" },
// // // // // // //   { id: "16", name: "DEOGHAR" },
// // // // // // //   { id: "4", name: "DHANBAD" },
// // // // // // //   { id: "17", name: "DUMKA" },
// // // // // // //   { id: "22", name: "EAST SINGHBHUM" },
// // // // // // //   { id: "14", name: "GARHWA" },
// // // // // // //   { id: "3", name: "GIRIDIH" },
// // // // // // //   { id: "18", name: "GODDA" },
// // // // // // //   { id: "9", name: "GUMLA" },
// // // // // // //   { id: "6", name: "HAZARIBAGH" },
// // // // // // //   { id: "19", name: "JAMTARA" },
// // // // // // //   { id: "10", name: "KHUNTI" },
// // // // // // //   { id: "7", name: "KODERMA" },
// // // // // // //   { id: "15", name: "LATEHAR" },
// // // // // // //   { id: "11", name: "LOHARDAGA" },
// // // // // // //   { id: "20", name: "PAKUR" },
// // // // // // //   { id: "13", name: "PALAMU" },
// // // // // // //   { id: "5", name: "RAMGARH" },
// // // // // // //   { id: "8", name: "RANCHI" },
// // // // // // //   { id: "21", name: "SAHIBGANJ" },
// // // // // // //   { id: "23", name: "SERAIKELA" },
// // // // // // //   { id: "12", name: "SIMDEGA" },
// // // // // // //   { id: "24", name: "WEST SINGHBHUM" },
// // // // // // // ];

// // // // // // // const MTC_OPTIONS = [
// // // // // // //   { id: "26", name: "BUNDU" },
// // // // // // //   { id: "27", name: "DORANDA" },
// // // // // // //   { id: "28", name: "MANDAR" },
// // // // // // //   { id: "29", name: "BERO" },
// // // // // // //   { id: "107", name: "UP REFERRAL RIMS" },
// // // // // // // ];

// // // // // // // // Chart Color Palettes
// // // // // // // const barColors = ['#4971d0', '#966acc', '#c960bd', '#ef58a7', '#fe746a', '#feac18', '#0080ff', '#8000ff', '#ff00ff', '#ff0000', '#80dfff', '#00b3b3', '#00e673', '#00b300', '#aaaa55', '#e6e600', '#ffa31a', '#e62e00', '#ffb3b3', '#ff4dc4', '#ff66ff', '#ff0000', '#993366', '#999966', '#4d9900', '#00e6e6', '#3366cc', '#ebccff', '#f2f2f2', '#80e5ff', '#660066', '#ffff00', '#ffcc99', '#99ff99', '#8080ff', '#00ff00', '#a300cc', '#a3c2c2'];
// // // // // // // const defaultPieColors = ["#ff1493", "#0040ff", "#4b872f"];
// // // // // // // const altPieColors = ["#0040ff", "#ff1493", "#4b872f"];

// // // // // // // // Reusable Chart Component
// // // // // // // const ChartCard = ({ title, type, labels, dataPoints, colors }: { title: string, type: 'bar' | 'doughnut', labels: string[], dataPoints: number[], colors: string[] }) => {
// // // // // // //   const data = {
// // // // // // //     labels: labels,
// // // // // // //     datasets: [{
// // // // // // //       data: dataPoints,
// // // // // // //       backgroundColor: colors,
// // // // // // //       borderWidth: 1,
// // // // // // //     }]
// // // // // // //   };

// // // // // // //   const options = {
// // // // // // //     responsive: true,
// // // // // // //     maintainAspectRatio: false,
// // // // // // //     plugins: {
// // // // // // //       legend: {
// // // // // // //         display: type === 'doughnut',
// // // // // // //         position: 'bottom' as const,
// // // // // // //         labels: { color: "#000000", font: { weight: 'bold' as const } }
// // // // // // //       },
// // // // // // //       title: {
// // // // // // //         display: true,
// // // // // // //         text: title,
// // // // // // //         color: '#026158',
// // // // // // //         font: { size: 16, family: 'Helvetica' },
// // // // // // //         padding: { bottom: 20 }
// // // // // // //       },
// // // // // // //     },
// // // // // // //     scales: type === 'bar' ? {
// // // // // // //       y: { beginAtZero: true, grid: { color: '#f0f0f0' }, ticks: { color: '#000000', font: { weight: 'bold' as const } } },
// // // // // // //       x: { grid: { display: false }, ticks: { color: '#000000', font: { weight: 'bold' as const } } }
// // // // // // //     } : undefined
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative h-[320px] flex flex-col">
// // // // // // //       <div className="absolute top-3 right-3 z-10">
// // // // // // //         <button
// // // // // // //           className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
// // // // // // //           title="Download Image"
// // // // // // //         >
// // // // // // //           <ImageIcon size={18} />
// // // // // // //         </button>
// // // // // // //       </div>
// // // // // // //       <div className="grow w-full relative">
// // // // // // //         {type === 'doughnut' ? <Doughnut data={data} options={options} /> : <Bar data={data} options={options} />}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default function DistrictAnnualFactsheet() {
// // // // // // //   const [fromDate, setFromDate] = useState<string>("2025-11-05");
// // // // // // //   const [toDate, setToDate] = useState<string>("2026-04-04");
// // // // // // //   const [districtId, setDistrictId] = useState<string>("8"); // Defaulting to Ranchi based on the output
// // // // // // //   const [mtcIds, setMtcIds] = useState<string[]>([]);
// // // // // // //   const [isMtcDropdownOpen, setIsMtcDropdownOpen] = useState<boolean>(false);
// // // // // // //   const [showReport, setShowReport] = useState<boolean>(false);
// // // // // // //   const [reportTitle, setReportTitle] = useState<string>("");
// // // // // // //   const mtcDropdownRef = useRef<HTMLDivElement>(null);

// // // // // // //   // Handle clicking outside to close the MTC dropdown
// // // // // // //   useEffect(() => {
// // // // // // //     const handleClickOutside = (event: MouseEvent) => {
// // // // // // //       if (mtcDropdownRef.current && !mtcDropdownRef.current.contains(event.target as Node)) {
// // // // // // //         setIsMtcDropdownOpen(false);
// // // // // // //       }
// // // // // // //     };
// // // // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // // // // //   }, []);

// // // // // // //   const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// // // // // // //     setDistrictId(e.target.value);
// // // // // // //   };

// // // // // // //   const toggleMtc = (id: string) => {
// // // // // // //     setMtcIds((prev) =>
// // // // // // //       prev.includes(id) ? prev.filter((mtcId) => mtcId !== id) : [...prev, id]
// // // // // // //     );
// // // // // // //   };

// // // // // // //   const toggleAllMtc = () => {
// // // // // // //     if (mtcIds.length === MTC_OPTIONS.length) {
// // // // // // //       setMtcIds([]); // Deselect all
// // // // // // //     } else {
// // // // // // //       setMtcIds(MTC_OPTIONS.map((m) => m.id)); // Select all
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const getReport = () => {
// // // // // // //     const selectedDistrict = DISTRICTS.find(d => d.id === districtId)?.name || "JHARKHAND";
// // // // // // //     const mtcNames = mtcIds.length > 0 
// // // // // // //       ? MTC_OPTIONS.filter(m => mtcIds.includes(m.id)).map(m => m.name).join(", ")
// // // // // // //       : "";
      
// // // // // // //     const locationName = mtcNames || selectedDistrict;
    
// // // // // // //     // Format dates for the title (rough conversion for display)
// // // // // // //     const formattedFrom = new Date(fromDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
// // // // // // //     const formattedTo = new Date(toDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
    
// // // // // // //     setReportTitle(`${locationName} ADMISSION REPORT ---  From Date ${formattedFrom} -  To Date ${formattedTo}`);
// // // // // // //     setShowReport(true);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="w-full max-w-7xl mx-auto mt-8 font-sans">
// // // // // // //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
// // // // // // //         {/* Card Header */}
// // // // // // //         <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
// // // // // // //           <h5 className="text-[#0b918c] text-lg font-semibold m-0">
// // // // // // //             District Annual Factsheet
// // // // // // //           </h5>
// // // // // // //         </div>

// // // // // // //         {/* Card Body */}
// // // // // // //         <div className="p-5">
// // // // // // //           <div className="flex flex-col lg:flex-row justify-between items-end gap-5">
// // // // // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end flex-grow">
              
// // // // // // //               {/* From Date Input */}
// // // // // // //               <div>
// // // // // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
// // // // // // //                 <div className="relative">
// // // // // // //                   <input
// // // // // // //                     type="date"
// // // // // // //                     value={fromDate}
// // // // // // //                     onChange={(e) => setFromDate(e.target.value)}
// // // // // // //                     className="w-full pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded focus:ring-[#0b918c] focus:border-[#0b918c] outline-none"
// // // // // // //                   />
// // // // // // //                   <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
// // // // // // //                     <Calendar size={16} />
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               {/* To Date Input */}
// // // // // // //               <div>
// // // // // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
// // // // // // //                 <div className="relative">
// // // // // // //                   <input
// // // // // // //                     type="date"
// // // // // // //                     value={toDate}
// // // // // // //                     onChange={(e) => setToDate(e.target.value)}
// // // // // // //                     className="w-full pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded focus:ring-[#0b918c] focus:border-[#0b918c] outline-none"
// // // // // // //                   />
// // // // // // //                   <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
// // // // // // //                     <Calendar size={16} />
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               {/* District Dropdown */}
// // // // // // //               <div>
// // // // // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
// // // // // // //                 <select
// // // // // // //                   value={districtId}
// // // // // // //                   onChange={handleDistrictChange}
// // // // // // //                   className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-[#0b918c] focus:border-[#0b918c] outline-none bg-white"
// // // // // // //                 >
// // // // // // //                   <option value="">Jharkhand</option>
// // // // // // //                   {DISTRICTS.map((district) => (
// // // // // // //                     <option key={district.id} value={district.id}>{district.name}</option>
// // // // // // //                   ))}
// // // // // // //                 </select>
// // // // // // //               </div>

// // // // // // //               {/* MTC Multiselect */}
// // // // // // //               <div className="relative" ref={mtcDropdownRef}>
// // // // // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">MTC</label>
// // // // // // //                 <button
// // // // // // //                   type="button"
// // // // // // //                   onClick={() => setIsMtcDropdownOpen(!isMtcDropdownOpen)}
// // // // // // //                   className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-[#0b918c] focus:border-[#0b918c] outline-none bg-white h-[34px] flex justify-between items-center text-left"
// // // // // // //                 >
// // // // // // //                   <span className="truncate text-gray-700">
// // // // // // //                     {mtcIds.length === 0 
// // // // // // //                       ? "None selected" 
// // // // // // //                       : mtcIds.length === MTC_OPTIONS.length 
// // // // // // //                         ? `All selected (${mtcIds.length})` 
// // // // // // //                         : `${mtcIds.length} selected`}
// // // // // // //                   </span>
// // // // // // //                   <ChevronDown size={16} className={`text-gray-400 transition-transform ${isMtcDropdownOpen ? "rotate-180" : ""}`} />
// // // // // // //                 </button>

// // // // // // //                 {isMtcDropdownOpen && (
// // // // // // //                   <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
// // // // // // //                     <div className="p-2 border-b border-gray-100">
// // // // // // //                       <label className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-gray-50 rounded">
// // // // // // //                         <input
// // // // // // //                           type="checkbox"
// // // // // // //                           checked={mtcIds.length === MTC_OPTIONS.length}
// // // // // // //                           onChange={toggleAllMtc}
// // // // // // //                           className="rounded text-[#0b918c] focus:ring-[#0b918c] accent-[#0b918c] w-4 h-4 cursor-pointer"
// // // // // // //                         />
// // // // // // //                         <span className="text-sm font-bold text-gray-800">Select all</span>
// // // // // // //                       </label>
// // // // // // //                     </div>
// // // // // // //                     <div className="p-1">
// // // // // // //                       {MTC_OPTIONS.map((mtc) => (
// // // // // // //                         <label key={mtc.id} className="flex items-center space-x-2 cursor-pointer p-1.5 hover:bg-gray-50 rounded">
// // // // // // //                           <input
// // // // // // //                             type="checkbox"
// // // // // // //                             checked={mtcIds.includes(mtc.id)}
// // // // // // //                             onChange={() => toggleMtc(mtc.id)}
// // // // // // //                             className="rounded text-[#0b918c] focus:ring-[#0b918c] accent-[#0b918c] w-4 h-4 cursor-pointer"
// // // // // // //                           />
// // // // // // //                           <span className="text-sm text-gray-700">{mtc.name}</span>
// // // // // // //                         </label>
// // // // // // //                       ))}
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 )}
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             {/* Actions */}
// // // // // // //             <div className="flex gap-4 items-center h-[34px] lg:mt-0 mt-4">
// // // // // // //               <button
// // // // // // //                 type="button"
// // // // // // //                 onClick={getReport}
// // // // // // //                 className="flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-medium text-green-600 bg-transparent border border-green-600 rounded hover:bg-green-600 hover:text-white transition-colors duration-200"
// // // // // // //               >
// // // // // // //                 <Search size={16} />
// // // // // // //                 Search
// // // // // // //               </button>

// // // // // // //               {showReport && (
// // // // // // //                 <div className="flex gap-2">
// // // // // // //                   <button className="p-1.5 text-white bg-cyan-500 hover:bg-cyan-600 rounded transition-colors" title="Download Excel">
// // // // // // //                     <FileSpreadsheet size={16} />
// // // // // // //                   </button>
// // // // // // //                   <button className="p-1.5 text-white bg-cyan-500 hover:bg-cyan-600 rounded transition-colors" title="Download PDF">
// // // // // // //                     <FileText size={16} />
// // // // // // //                   </button>
// // // // // // //                   <button className="p-1.5 text-white bg-cyan-500 hover:bg-cyan-600 rounded transition-colors" title="Download Image">
// // // // // // //                     <ImageIcon size={16} />
// // // // // // //                   </button>
// // // // // // //                 </div>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           {/* Report Rendering Area */}
// // // // // // //           <div className="mt-8 border-t border-gray-100 pt-6">
// // // // // // //             {!showReport ? (
// // // // // // //               <div className="w-full text-center min-h-[100px] flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-300">
// // // // // // //                 <span className="text-gray-500 text-sm">Select filters and click Search to view the report...</span>
// // // // // // //               </div>
// // // // // // //             ) : (
// // // // // // //               <div className="w-full animate-in fade-in duration-500">
// // // // // // //                 <div className="text-center mb-8">
// // // // // // //                   <h6 className="text-[#026158] font-bold text-lg uppercase tracking-wide">
// // // // // // //                     {reportTitle}
// // // // // // //                   </h6>
// // // // // // //                 </div>

// // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // //                   <ChartCard title="Gender Distribution" type="doughnut" labels={["FEMALE : 122", "MALE : 91", "TRANSGENDER : 0"]} dataPoints={[122, 91, 0]} colors={defaultPieColors} />
// // // // // // //                   <ChartCard title="Caste Wise Distribution" type="bar" labels={["SC", "ST", "OBC", "OTHERS"]} dataPoints={[26, 125, 37, 25]} colors={barColors} />
// // // // // // //                   <ChartCard title="Age Group" type="bar" labels={["0-6M", "6-24 M", "24-36 M", ">36 M"]} dataPoints={[21, 124, 31, 37]} colors={barColors} />
                  
// // // // // // //                   <ChartCard title="Z-Score" type="bar" labels={["<-1SD", "<-2SD", "<-3SD", "<-4SD"]} dataPoints={[2, 16, 142, 51]} colors={barColors} />
// // // // // // //                   <ChartCard title="Odema" type="doughnut" labels={["WITH ODEMA : 0", "WITHOUT ODEMA : 213"]} dataPoints={[0, 213]} colors={defaultPieColors} />
// // // // // // //                   <ChartCard title="MUAC" type="doughnut" labels={["MUAC<11.5 : 97", "MUAC>11.5 : 116"]} dataPoints={[97, 116]} colors={defaultPieColors} />
                  
// // // // // // //                   <ChartCard title="Breast Feeding" type="doughnut" labels={["HAVE BREAST FEEDING : 188", "NO BREAST FEEDING : 25"]} dataPoints={[188, 25]} colors={defaultPieColors} />
// // // // // // //                   <ChartCard title="Total Admission" type="doughnut" labels={["NEW ADMISSION : 209", "RE ADMISSION : 4", "RELAPSE : 0"]} dataPoints={[209, 4, 0]} colors={defaultPieColors} />
// // // // // // //                   <ChartCard title="Referred By" type="bar" labels={["ANGANWADI", "ANM", "OPD", "OTHER", "Poshan Sakhi", "RBSK Team", "Sahiya/ASHA", "SELF"]} dataPoints={[50, 3, 1, 8, 0, 0, 63, 84]} colors={barColors} />
                  
// // // // // // //                   <ChartCard title="Complementary Feeding" type="doughnut" labels={["HAVE COMPLEMENTARY FEEDING : 199", "NO COMPLEMENTARY FEEDING : 14"]} dataPoints={[199, 14]} colors={defaultPieColors} />
// // // // // // //                   <ChartCard title="Appetite Test" type="doughnut" labels={["APPETITE TEST FAIL : 105", "APPETITE TEST NOT DONE : 0", "APPETITE TEST PASS : 108"]} dataPoints={[105, 0, 108]} colors={defaultPieColors} />
// // // // // // //                   <ChartCard title="HB" type="bar" labels={["MILD HB", "MODERATE HB", "NORMAL HB", "SEVERE HB"]} dataPoints={[33, 0, 0, 62]} colors={barColors} />
                  
// // // // // // //                   <ChartCard title="Complicated and Non-Complicated SAM" type="doughnut" labels={["COMPLICATION : 166", "NO COMPLICATION : 47"]} dataPoints={[166, 47]} colors={altPieColors} />
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>

// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }


// // // // // // "use client";

// // // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // // import { Search, ChevronDown } from "lucide-react";
// // // // // // import {
// // // // // //   Chart as ChartJS,
// // // // // //   CategoryScale,
// // // // // //   LinearScale,
// // // // // //   BarElement,
// // // // // //   Title,
// // // // // //   Tooltip,
// // // // // //   Legend,
// // // // // //   ArcElement
// // // // // // } from "chart.js";
// // // // // // import { Bar, Doughnut } from "react-chartjs-2";

// // // // // // // Register ChartJS components
// // // // // // ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// // // // // // // --- Constants ---
// // // // // // type ReportMode = "daily" | "monthly" | "quarterly";

// // // // // // const YEARS = Array.from({ length: 7 }, (_, i) => (2020 + i).toString());

// // // // // // const MONTHS = [
// // // // // //   { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
// // // // // //   { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
// // // // // //   { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
// // // // // //   { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
// // // // // // ];

// // // // // // const QUARTERS = [
// // // // // //   { id: "Q1", name: "Q1 (Jan-Mar)" },
// // // // // //   { id: "Q2", name: "Q2 (Apr-Jun)" },
// // // // // //   { id: "Q3", name: "Q3 (Jul-Sep)" },
// // // // // //   { id: "Q4", name: "Q4 (Oct-Dec)" },
// // // // // // ];

// // // // // // const DISTRICTS = [
// // // // // //   { id: "1", name: "BOKARO" }, { id: "2", name: "CHATRA" }, { id: "8", name: "RANCHI" },
// // // // // // ];

// // // // // // const MTC_OPTIONS = [
// // // // // //   { id: "26", name: "BUNDU" }, { id: "27", name: "DORANDA" }, { id: "28", name: "MANDAR" },
// // // // // //   { id: "29", name: "BERO" }, { id: "107", name: "UP REFERRAL RIMS" },
// // // // // // ];

// // // // // // // --- Reusable Chart Component ---
// // // // // // const ChartCard = ({ title, type, labels, dataPoints, colors }: { title: string, type: 'bar' | 'doughnut', labels: string[], dataPoints: number[], colors: string[] }) => {
// // // // // //   const data = {
// // // // // //     labels: labels,
// // // // // //     datasets: [{ data: dataPoints, backgroundColor: colors, borderWidth: 1 }]
// // // // // //   };

// // // // // //   const options = {
// // // // // //     responsive: true,
// // // // // //     maintainAspectRatio: false,
// // // // // //     plugins: {
// // // // // //       legend: {
// // // // // //         display: type === 'doughnut',
// // // // // //         position: 'bottom' as const,
// // // // // //         labels: { color: "#1e3a8a", font: { weight: 'bold' as const } }
// // // // // //       },
// // // // // //       title: {
// // // // // //         display: true,
// // // // // //         text: title,
// // // // // //         color: '#1e40af', // Blue-800
// // // // // //         font: { size: 14, weight: 'bold' as const },
// // // // // //         padding: { bottom: 10 }
// // // // // //       },
// // // // // //     },
// // // // // //     scales: type === 'bar' ? {
// // // // // //       y: { beginAtZero: true, grid: { color: '#f0f0f0' }, ticks: { color: '#444', font: { size: 11 } } },
// // // // // //       x: { grid: { display: false }, ticks: { color: '#444', font: { size: 10 } } }
// // // // // //     } : undefined
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative h-[300px] flex flex-col">
// // // // // //       <div className="grow w-full relative">
// // // // // //         {type === 'doughnut' ? <Doughnut data={data} options={options} /> : <Bar data={data} options={options} />}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default function DistrictAnnualFactsheet() {
// // // // // //   // --- State ---
// // // // // //   const [reportMode, setReportMode] = useState<ReportMode>("daily");
// // // // // //   const [fromDate, setFromDate] = useState<string>("2026-01-01");
// // // // // //   const [toDate, setToDate] = useState<string>("2026-05-15");
// // // // // //   const [selectedYear, setSelectedYear] = useState<string>("2026");
// // // // // //   const [selectedMonth, setSelectedMonth] = useState<string>("5");
// // // // // //   const [selectedQuarter, setSelectedQuarter] = useState<string>("Q1");
  
// // // // // //   const [districtId, setDistrictId] = useState<string>("8");
// // // // // //   const [mtcIds, setMtcIds] = useState<string[]>([]);
// // // // // //   const [isMtcDropdownOpen, setIsMtcDropdownOpen] = useState<boolean>(false);
// // // // // //   const [showReport, setShowReport] = useState<boolean>(false);
// // // // // //   const [reportTitle, setReportTitle] = useState<string>("");
  
// // // // // //   const mtcDropdownRef = useRef<HTMLDivElement>(null);

// // // // // //   useEffect(() => {
// // // // // //     const handleClickOutside = (event: MouseEvent) => {
// // // // // //       if (mtcDropdownRef.current && !mtcDropdownRef.current.contains(event.target as Node)) {
// // // // // //         setIsMtcDropdownOpen(false);
// // // // // //       }
// // // // // //     };
// // // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // // // //   }, []);

// // // // // //   const getReport = () => {
// // // // // //     const selectedDistrict = DISTRICTS.find(d => d.id === districtId)?.name || "JHARKHAND";
// // // // // //     const mtcNames = mtcIds.length > 0 
// // // // // //       ? MTC_OPTIONS.filter(m => mtcIds.includes(m.id)).map(m => m.name).join(", ")
// // // // // //       : "";
// // // // // //     const locationName = mtcNames || selectedDistrict;

// // // // // //     let dateRange = "";
// // // // // //     if (reportMode === "daily") {
// // // // // //       dateRange = `From Date ${fromDate} - To Date ${toDate}`;
// // // // // //     } else if (reportMode === "monthly") {
// // // // // //       const monthName = MONTHS.find(m => m.id === selectedMonth)?.name || "All Months";
// // // // // //       dateRange = `${monthName} ${selectedYear}`;
// // // // // //     } else {
// // // // // //       dateRange = `${selectedQuarter} ${selectedYear}`;
// // // // // //     }

// // // // // //     setReportTitle(`${locationName} ADMISSION REPORT --- ${dateRange}`);
// // // // // //     setShowReport(true);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="w-full max-w-7xl mx-auto mt-8 font-sans px-4">
// // // // // //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
// // // // // //         {/* Header - Now Blue */}
// // // // // //         <div className="bg-blue-50 px-5 py-4 border-b border-gray-200 flex justify-between items-center">
// // // // // //           <h5 className="text-blue-700 text-lg font-semibold m-0">District Annual Factsheet</h5>
// // // // // //         </div>

// // // // // //         <div className="p-5">
// // // // // //           {/* Mode Selector - Now Blue Accents */}
// // // // // //           <div className="flex items-center space-x-6 mb-6">
// // // // // //             {(['daily', 'monthly', 'quarterly'] as ReportMode[]).map((mode) => (
// // // // // //               <label key={mode} className="flex items-center space-x-2 cursor-pointer group">
// // // // // //                 <input
// // // // // //                   type="radio"
// // // // // //                   name="reportMode"
// // // // // //                   checked={reportMode === mode}
// // // // // //                   onChange={() => { setReportMode(mode); setShowReport(false); }}
// // // // // //                   className="w-4 h-4 text-blue-600 focus:ring-blue-500 accent-blue-600"
// // // // // //                 />
// // // // // //                 <span className={`text-sm font-medium capitalize ${reportMode === mode ? 'text-blue-600' : 'text-gray-600'}`}>
// // // // // //                   {mode}
// // // // // //                 </span>
// // // // // //               </label>
// // // // // //             ))}
// // // // // //           </div>

// // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
// // // // // //             {reportMode === "daily" && (
// // // // // //               <>
// // // // // //                 <div>
// // // // // //                   <label className="block text-xs font-bold text-gray-600 mb-1">From Date</label>
// // // // // //                   <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-3 py-1.5 text-sm border rounded outline-none focus:ring-1 focus:ring-blue-500" />
// // // // // //                 </div>
// // // // // //                 <div>
// // // // // //                   <label className="block text-xs font-bold text-gray-600 mb-1">To Date</label>
// // // // // //                   <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-3 py-1.5 text-sm border rounded outline-none focus:ring-1 focus:ring-blue-500" />
// // // // // //                 </div>
// // // // // //               </>
// // // // // //             )}

// // // // // //             {(reportMode === "monthly" || reportMode === "quarterly") && (
// // // // // //               <div>
// // // // // //                 <label className="block text-xs font-bold text-gray-600 mb-1">Year</label>
// // // // // //                 <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full px-3 py-1.5 text-sm border rounded bg-white outline-none focus:ring-1 focus:ring-blue-500">
// // // // // //                   {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
// // // // // //                 </select>
// // // // // //               </div>
// // // // // //             )}

// // // // // //             {reportMode === "monthly" && (
// // // // // //               <div>
// // // // // //                 <label className="block text-xs font-bold text-gray-600 mb-1">Month</label>
// // // // // //                 <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full px-3 py-1.5 text-sm border rounded bg-white outline-none focus:ring-1 focus:ring-blue-500">
// // // // // //                   <option value="">All Months</option>
// // // // // //                   {MONTHS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
// // // // // //                 </select>
// // // // // //               </div>
// // // // // //             )}

// // // // // //             {reportMode === "quarterly" && (
// // // // // //               <div>
// // // // // //                 <label className="block text-xs font-bold text-gray-600 mb-1">Quarter</label>
// // // // // //                 <select value={selectedQuarter} onChange={(e) => setSelectedQuarter(e.target.value)} className="w-full px-3 py-1.5 text-sm border rounded bg-white outline-none focus:ring-1 focus:ring-blue-500">
// // // // // //                   {QUARTERS.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
// // // // // //                 </select>
// // // // // //               </div>
// // // // // //             )}

// // // // // //             <div>
// // // // // //               <label className="block text-xs font-bold text-gray-600 mb-1">District</label>
// // // // // //               <select value={districtId} onChange={(e) => setDistrictId(e.target.value)} className="w-full px-3 py-1.5 text-sm border rounded bg-white outline-none focus:ring-1 focus:ring-blue-500">
// // // // // //                 <option value="">Jharkhand</option>
// // // // // //                 {DISTRICTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
// // // // // //               </select>
// // // // // //             </div>

// // // // // //             <div className="relative" ref={mtcDropdownRef}>
// // // // // //               <label className="block text-xs font-bold text-gray-600 mb-1">MTC</label>
// // // // // //               <button onClick={() => setIsMtcDropdownOpen(!isMtcDropdownOpen)} className="w-full px-3 py-1.5 text-sm border rounded bg-white text-left flex justify-between items-center h-[34px] focus:ring-1 focus:ring-blue-500">
// // // // // //                 <span className="truncate">{mtcIds.length === 0 ? "None" : `${mtcIds.length} Selected`}</span>
// // // // // //                 <ChevronDown size={14} className="text-blue-600" />
// // // // // //               </button>
// // // // // //               {isMtcDropdownOpen && (
// // // // // //                 <div className="absolute z-20 w-full mt-1 bg-white border rounded shadow-lg max-h-48 overflow-auto p-2">
// // // // // //                    {MTC_OPTIONS.map(mtc => (
// // // // // //                      <label key={mtc.id} className="flex items-center space-x-2 p-1 hover:bg-blue-50 cursor-pointer text-sm">
// // // // // //                        <input type="checkbox" className="accent-blue-600" checked={mtcIds.includes(mtc.id)} onChange={() => setMtcIds(prev => prev.includes(mtc.id) ? prev.filter(x => x !== mtc.id) : [...prev, mtc.id])} />
// // // // // //                        <span>{mtc.name}</span>
// // // // // //                      </label>
// // // // // //                    ))}
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </div>

// // // // // //             {/* Search Button - Now Blue */}
// // // // // //             <button onClick={getReport} className="flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors">
// // // // // //               <Search size={16} /> Search
// // // // // //             </button>
// // // // // //           </div>

// // // // // //           <div className="mt-8 border-t border-gray-100 pt-6">
// // // // // //             {showReport && (
// // // // // //               <div className="animate-in fade-in duration-500">
// // // // // //                 <div className="text-center mb-6">
// // // // // //                   {/* Report Title - Deep Blue */}
// // // // // //                   <h6 className="text-blue-900 font-bold text-lg uppercase">{reportTitle}</h6>
// // // // // //                 </div>
// // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // //                   <ChartCard title="Gender Distribution" type="doughnut" labels={["FEMALE", "MALE"]} dataPoints={[122, 91]} colors={["#60a5fa", "#1e40af"]} />
// // // // // //                   <ChartCard title="Caste Wise Distribution" type="bar" labels={["SC", "ST", "OBC", "OTHERS"]} dataPoints={[26, 125, 37, 25]} colors={['#3b82f6']} />
// // // // // //                   <ChartCard title="Age Group" type="bar" labels={["0-6M", "6-24 M", "24-36 M", ">36 M"]} dataPoints={[21, 124, 31, 37]} colors={['#1d4ed8']} />
// // // // // //                   <ChartCard title="Total Admission" type="doughnut" labels={["NEW", "RE-ADMIT"]} dataPoints={[209, 4]} colors={["#2563eb", "#93c5fd"]} />
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // "use client";

// // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // import { Search, ChevronDown, Loader2 } from "lucide-react";
// // // // // import {
// // // // //   Chart as ChartJS,
// // // // //   CategoryScale,
// // // // //   LinearScale,
// // // // //   BarElement,
// // // // //   Title,
// // // // //   Tooltip,
// // // // //   Legend,
// // // // //   ArcElement
// // // // // } from "chart.js";
// // // // // import { Bar, Doughnut } from "react-chartjs-2";
// // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // Register ChartJS components
// // // // // ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// // // // // // --- Constants ---
// // // // // type ReportMode = "daily" | "monthly" | "quarterly";

// // // // // const YEARS = Array.from({ length: 7 }, (_, i) => (2020 + i).toString());

// // // // // const MONTHS = [
// // // // //   { id: "1", name: "January" }, { id: "2", name: "February" }, { id: "3", name: "March" },
// // // // //   { id: "4", name: "April" }, { id: "5", name: "May" }, { id: "6", name: "June" },
// // // // //   { id: "7", name: "July" }, { id: "8", name: "August" }, { id: "9", name: "September" },
// // // // //   { id: "10", name: "October" }, { id: "11", name: "November" }, { id: "12", name: "December" },
// // // // // ];

// // // // // const QUARTERS = [
// // // // //   { id: "Q1", name: "Q1 (Jan-Mar)" },
// // // // //   { id: "Q2", name: "Q2 (Apr-Jun)" },
// // // // //   { id: "Q3", name: "Q3 (Jul-Sep)" },
// // // // //   { id: "Q4", name: "Q4 (Oct-Dec)" },
// // // // // ];

// // // // // // Locked to Ranchi MTCs
// // // // // const MTC_OPTIONS = [
// // // // //   { id: "26", name: "BUNDU" }, 
// // // // //   { id: "27", name: "DORANDA" }, 
// // // // //   { id: "28", name: "MANDAR" },
// // // // //   { id: "29", name: "BERO" }, 
// // // // //   { id: "104", name: "RIMS" },
// // // // //   { id: "107", name: "UP REFERRAL RIMS" }
// // // // // ];

// // // // // // --- Reusable Chart Component ---
// // // // // const ChartCard = ({ title, type, labels, dataPoints, colors }: { title: string, type: 'bar' | 'doughnut', labels: string[], dataPoints: number[], colors: string[] }) => {
// // // // //   const data = {
// // // // //     labels: labels.map((label, i) => `${label}: ${dataPoints[i] || 0}`),
// // // // //     datasets: [{ data: dataPoints, backgroundColor: colors, borderWidth: 1 }]
// // // // //   };

// // // // //   const options = {
// // // // //     responsive: true,
// // // // //     maintainAspectRatio: false,
// // // // //     plugins: {
// // // // //       legend: {
// // // // //         display: type === 'doughnut',
// // // // //         position: 'bottom' as const,
// // // // //         labels: { color: "#1e3a8a", font: { weight: 'bold' as const }, boxWidth: 12 }
// // // // //       },
// // // // //       title: {
// // // // //         display: true,
// // // // //         text: title,
// // // // //         color: '#1e40af', 
// // // // //         font: { size: 14, weight: 'bold' as const },
// // // // //         padding: { bottom: 10 }
// // // // //       },
// // // // //     },
// // // // //     scales: type === 'bar' ? {
// // // // //       y: { beginAtZero: true, grid: { color: '#f0f0f0' }, ticks: { color: '#444', font: { size: 11 }, precision: 0 } },
// // // // //       x: { grid: { display: false }, ticks: { color: '#444', font: { size: 10 } } }
// // // // //     } : undefined
// // // // //   };

// // // // //   return (
// // // // //     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative h-[300px] flex flex-col">
// // // // //       <div className="grow w-full relative">
// // // // //         {type === 'doughnut' ? <Doughnut data={data} options={options} /> : <Bar data={data} options={options} />}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default function RanchiAnnualFactsheet() {
// // // // //   // --- State ---
// // // // //   const currentYear = new Date().getFullYear().toString();
// // // // //   const [reportMode, setReportMode] = useState<ReportMode>("daily");
// // // // //   const [fromDate, setFromDate] = useState<string>(`${currentYear}-01-01`);
// // // // //   const [toDate, setToDate] = useState<string>(new Date().toISOString().split('T')[0]);
// // // // //   const [selectedYear, setSelectedYear] = useState<string>(currentYear);
// // // // //   const [selectedMonth, setSelectedMonth] = useState<string>("1");
// // // // //   const [selectedQuarter, setSelectedQuarter] = useState<string>("Q1");
  
// // // // //   // Locked to Ranchi District ID (20)
// // // // //   const districtId = "20"; 
// // // // //   const [mtcIds, setMtcIds] = useState<string[]>([]);
// // // // //   const [isMtcDropdownOpen, setIsMtcDropdownOpen] = useState<boolean>(false);
// // // // //   const [showReport, setShowReport] = useState<boolean>(false);
// // // // //   const [reportTitle, setReportTitle] = useState<string>("");
// // // // //   const [loading, setLoading] = useState<boolean>(false);
  
// // // // //   // Data States for Charts
// // // // //   const [chartData, setChartData] = useState({
// // // // //     gender: [0, 0],
// // // // //     caste: [0, 0, 0, 0],
// // // // //     age: [0, 0, 0, 0],
// // // // //     admission: [0, 0],
// // // // //     total: 0
// // // // //   });

// // // // //   const mtcDropdownRef = useRef<HTMLDivElement>(null);

// // // // //   useEffect(() => {
// // // // //     const handleClickOutside = (event: MouseEvent) => {
// // // // //       if (mtcDropdownRef.current && !mtcDropdownRef.current.contains(event.target as Node)) {
// // // // //         setIsMtcDropdownOpen(false);
// // // // //       }
// // // // //     };
// // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // // //   }, []);

// // // // //   const getReport = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const mtcNames = mtcIds.length > 0 
// // // // //         ? MTC_OPTIONS.filter(m => mtcIds.includes(m.id)).map(m => m.name).join(", ")
// // // // //         : "";
// // // // //       const locationName = mtcNames ? `RANCHI (${mtcNames})` : "RANCHI DISTRICT";

// // // // //       let dateRange = "";
// // // // //       if (reportMode === "daily") {
// // // // //         dateRange = `From ${fromDate} To ${toDate}`;
// // // // //       } else if (reportMode === "monthly") {
// // // // //         const monthName = MONTHS.find(m => m.id === selectedMonth)?.name || "All Months";
// // // // //         dateRange = `${monthName} ${selectedYear}`;
// // // // //       } else {
// // // // //         dateRange = `${selectedQuarter} ${selectedYear}`;
// // // // //       }

// // // // //       setReportTitle(`${locationName} ADMISSION REPORT --- ${dateRange}`);

// // // // //       // Construct API Query (Always passes districtId=20 for Ranchi)
// // // // //       const queryParams = new URLSearchParams({
// // // // //         mode: reportMode,
// // // // //         ...(reportMode === 'daily' && { from: fromDate, to: toDate }),
// // // // //         ...(reportMode === 'monthly' && { year: selectedYear, month: selectedMonth }),
// // // // //         ...(reportMode === 'quarterly' && { year: selectedYear, quarter: selectedQuarter }),
// // // // //         districtId: districtId, 
// // // // //         ...(mtcIds.length > 0 && { mtcIds: mtcIds.join(',') })
// // // // //       });

// // // // //       const res = await fetch(`/api/factsheet?${queryParams.toString()}`);
// // // // //       if (!res.ok) throw new Error("Failed to fetch report data");
      
// // // // //       const data = await res.json();
// // // // //       setChartData(data);
// // // // //       setShowReport(true);
      
// // // // //       if (data.total === 0) toast.error("No admission records found for Ranchi in this time range.");
      
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //       toast.error("An error occurred while generating the report.");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="w-full max-w-7xl mx-auto mt-8 font-sans px-4 pb-12">
// // // // //       <Toaster position="top-right" />
// // // // //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
// // // // //         {/* Header - Now Blue */}
// // // // //         <div className="bg-blue-50 px-5 py-4 border-b border-gray-200 flex justify-between items-center">
// // // // //           <h5 className="text-blue-700 text-lg font-semibold m-0">Ranchi District Factsheet</h5>
// // // // //         </div>

// // // // //         <div className="p-5">
// // // // //           {/* Mode Selector - Now Blue Accents */}
// // // // //           <div className="flex items-center space-x-6 mb-6">
// // // // //             {(['daily', 'monthly', 'quarterly'] as ReportMode[]).map((mode) => (
// // // // //               <label key={mode} className="flex items-center space-x-2 cursor-pointer group">
// // // // //                 <input
// // // // //                   type="radio"
// // // // //                   name="reportMode"
// // // // //                   checked={reportMode === mode}
// // // // //                   onChange={() => { setReportMode(mode); setShowReport(false); }}
// // // // //                   className="w-4 h-4 text-blue-600 focus:ring-blue-500 accent-blue-600"
// // // // //                 />
// // // // //                 <span className={`text-sm font-medium capitalize ${reportMode === mode ? 'text-blue-600' : 'text-gray-600'}`}>
// // // // //                   {mode}
// // // // //                 </span>
// // // // //               </label>
// // // // //             ))}
// // // // //           </div>

// // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            
// // // // //             {reportMode === "daily" && (
// // // // //               <>
// // // // //                 <div>
// // // // //                   <label className="block text-xs font-bold text-gray-600 mb-1">From Date</label>
// // // // //                   <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-3 py-1.5 text-sm border rounded outline-none focus:ring-1 focus:ring-blue-500" />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <label className="block text-xs font-bold text-gray-600 mb-1">To Date</label>
// // // // //                   <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-3 py-1.5 text-sm border rounded outline-none focus:ring-1 focus:ring-blue-500" />
// // // // //                 </div>
// // // // //               </>
// // // // //             )}

// // // // //             {(reportMode === "monthly" || reportMode === "quarterly") && (
// // // // //               <div>
// // // // //                 <label className="block text-xs font-bold text-gray-600 mb-1">Year</label>
// // // // //                 <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full px-3 py-1.5 text-sm border rounded bg-white outline-none focus:ring-1 focus:ring-blue-500">
// // // // //                   {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
// // // // //                 </select>
// // // // //               </div>
// // // // //             )}

// // // // //             {reportMode === "monthly" && (
// // // // //               <div>
// // // // //                 <label className="block text-xs font-bold text-gray-600 mb-1">Month</label>
// // // // //                 <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full px-3 py-1.5 text-sm border rounded bg-white outline-none focus:ring-1 focus:ring-blue-500">
// // // // //                   <option value="">All Months</option>
// // // // //                   {MONTHS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
// // // // //                 </select>
// // // // //               </div>
// // // // //             )}

// // // // //             {reportMode === "quarterly" && (
// // // // //               <div>
// // // // //                 <label className="block text-xs font-bold text-gray-600 mb-1">Quarter</label>
// // // // //                 <select value={selectedQuarter} onChange={(e) => setSelectedQuarter(e.target.value)} className="w-full px-3 py-1.5 text-sm border rounded bg-white outline-none focus:ring-1 focus:ring-blue-500">
// // // // //                   {QUARTERS.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
// // // // //                 </select>
// // // // //               </div>
// // // // //             )}

// // // // //             {/* Filter by MTC specifically for Ranchi */}
// // // // //             <div className="relative" ref={mtcDropdownRef}>
// // // // //               <label className="block text-xs font-bold text-gray-600 mb-1">Filter by Ranchi MTC</label>
// // // // //               <button onClick={() => setIsMtcDropdownOpen(!isMtcDropdownOpen)} className="w-full px-3 py-1.5 text-sm border rounded bg-white text-left flex justify-between items-center h-[34px] focus:ring-1 focus:ring-blue-500">
// // // // //                 <span className="truncate">{mtcIds.length === 0 ? "All Ranchi Centers" : `${mtcIds.length} Selected`}</span>
// // // // //                 <ChevronDown size={14} className="text-blue-600" />
// // // // //               </button>
// // // // //               {isMtcDropdownOpen && (
// // // // //                 <div className="absolute z-20 w-full mt-1 bg-white border rounded shadow-lg max-h-48 overflow-auto p-2">
// // // // //                    {MTC_OPTIONS.map(mtc => (
// // // // //                      <label key={mtc.id} className="flex items-center space-x-2 p-1 hover:bg-blue-50 cursor-pointer text-sm">
// // // // //                        <input type="checkbox" className="accent-blue-600" checked={mtcIds.includes(mtc.id)} onChange={() => setMtcIds(prev => prev.includes(mtc.id) ? prev.filter(x => x !== mtc.id) : [...prev, mtc.id])} />
// // // // //                        <span>{mtc.name}</span>
// // // // //                      </label>
// // // // //                    ))}
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>

// // // // //             {/* Search Button */}
// // // // //             <button 
// // // // //               onClick={getReport} 
// // // // //               disabled={loading}
// // // // //               className="flex items-center justify-center gap-2 px-4 py-1.5 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded hover:bg-blue-700 transition-colors h-[34px] disabled:opacity-50"
// // // // //             >
// // // // //               {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />} 
// // // // //               Generate Report
// // // // //             </button>
// // // // //           </div>

// // // // //           <div className="mt-8 border-t border-gray-100 pt-6">
// // // // //             {showReport && (
// // // // //               <div className="animate-in fade-in duration-500">
// // // // //                 <div className="text-center mb-6">
// // // // //                   {/* Report Title - Deep Blue */}
// // // // //                   <h6 className="text-blue-900 font-bold text-lg uppercase">{reportTitle}</h6>
// // // // //                   <span className="inline-block mt-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
// // // // //                     Total Admissions Found: {chartData.total}
// // // // //                   </span>
// // // // //                 </div>

// // // // //                 {chartData.total > 0 ? (
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //                     <ChartCard title="Gender Distribution" type="doughnut" labels={["FEMALE", "MALE"]} dataPoints={chartData.gender} colors={["#60a5fa", "#1e40af"]} />
// // // // //                     <ChartCard title="Caste Wise Distribution" type="bar" labels={["SC", "ST", "OBC", "OTHERS"]} dataPoints={chartData.caste} colors={['#3b82f6']} />
// // // // //                     <ChartCard title="Age Group" type="bar" labels={["0-6M", "6-24 M", "24-36 M", ">36 M"]} dataPoints={chartData.age} colors={['#1d4ed8']} />
// // // // //                     <ChartCard title="Total Admission" type="doughnut" labels={["NEW", "RE-ADMIT"]} dataPoints={chartData.admission} colors={["#2563eb", "#93c5fd"]} />
// // // // //                   </div>
// // // // //                 ) : (
// // // // //                   <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
// // // // //                     <Search className="w-10 h-10 mx-auto text-gray-300 mb-2" />
// // // // //                     No admission records match the selected criteria in Ranchi District.
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import React, { useState } from "react";
// // // // import { Search, FileSpreadsheet, FileText, Image as ImageIcon, CheckSquare, Square } from "lucide-react";

// // // // interface MtcOption {
// // // //   id: string;
// // // //   name: string;
// // // // }

// // // // const RANCHI_MTCS: MtcOption[] = [
// // // //   { id: "26", name: "BUNDU" },
// // // //   { id: "27", name: "DORANDA" },
// // // //   { id: "28", name: "MANDAR" },
// // // //   { id: "29", name: "BERO" },
// // // //   { id: "107", name: "UP REFERRAL RIMS" },
// // // // ];

// // // // export default function AdmissionDashboardByMTC() {
// // // //   const [fromDate, setFromDate] = useState<string>("2026-07-17");
// // // //   const [toDate, setToDate] = useState<string>("2026-07-17");
// // // //   const [selectedMtcs, setSelectedMtcs] = useState<string[]>(["26", "27", "28", "29", "107"]);
// // // //   const [showReport, setShowReport] = useState<boolean>(false);

// // // //   const handleMtcCheckboxChange = (id: string) => {
// // // //     if (selectedMtcs.includes(id)) {
// // // //       setSelectedMtcs(selectedMtcs.filter((item) => item !== id));
// // // //     } else {
// // // //       setSelectedMtcs([...selectedMtcs, id]);
// // // //     }
// // // //   };

// // // //   const handleSelectAll = () => {
// // // //     if (selectedMtcs.length === RANCHI_MTCS.length) {
// // // //       setSelectedMtcs([]);
// // // //     } else {
// // // //       setSelectedMtcs(RANCHI_MTCS.map((m) => m.id));
// // // //     }
// // // //   };

// // // //   return (
// // // //     <section className="my-6 font-sans w-full max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      
// // // //       {/* Clean Header layout matching the original image style specifications */}
// // // //       <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // //         <div>
// // // //           <h5 className="text-xl font-bold tracking-tight text-blue-700">
// // // //             Admission Dashboard By MTC
// // // //           </h5>
// // // //           <p className="text-xs text-slate-500 mt-1">Monitor admission statistics, age profiles, and clinical metrics</p>
// // // //         </div>
// // // //         <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-blue-100">
// // // //           Ranchi District User Dashboard
// // // //         </div>
// // // //       </div>

// // // //       <hr className="border-slate-100" />

// // // //       {/* Form Controls Container */}
// // // //       <div className="p-6">
// // // //         <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-sm text-slate-700">
          
// // // //           {/* From Date group field */}
// // // //           <div className="md:col-span-3">
// // // //             <label className="block mb-2 font-medium text-slate-700">From Date</label>
// // // //             <div className="relative flex items-center">
// // // //               <input
// // // //                 type="date"
// // // //                 value={fromDate}
// // // //                 onChange={(e) => setFromDate(e.target.value)}
// // // //                 className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-slate-800 transition-all shadow-sm"
// // // //               />
// // // //             </div>
// // // //           </div>

// // // //           {/* To Date group field */}
// // // //           <div className="md:col-span-3">
// // // //             <label className="block mb-2 font-medium text-slate-700">To Date</label>
// // // //             <div className="relative flex items-center">
// // // //               <input
// // // //                 type="date"
// // // //                 value={toDate}
// // // //                 onChange={(e) => setToDate(e.target.value)}
// // // //                 className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-slate-800 transition-all shadow-sm"
// // // //               />
// // // //             </div>
// // // //           </div>

// // // //           {/* District Scope */}
// // // //           <div className="md:col-span-3">
// // // //             <label className="block mb-2 font-medium text-slate-700">District Scope</label>
// // // //             <input
// // // //               type="text"
// // // //               value="RANCHI"
// // // //               disabled
// // // //               className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-700 font-medium cursor-not-allowed outline-none shadow-sm"
// // // //             />
// // // //           </div>

// // // //           {/* Styled Outlined Fetch/Search Button */}
// // // //           <div className="md:col-span-3">
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => setShowReport(true)}
// // // //               className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-white border border-blue-500 rounded-md hover:bg-blue-50/50 transition-all shadow-sm active:scale-[0.99]"
// // // //             >
// // // //               <Search size={16} className="text-blue-600 stroke-[2.5]" />
// // // //               Fetch MTC Data
// // // //             </button>
// // // //           </div>

// // // //         </div>

// // // //         {/* Filters Context Row */}
// // // //         <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-dashed border-slate-100 pt-4">
// // // //           <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mr-2">MTC Context Filters:</span>
// // // //           <button
// // // //             type="button"
// // // //             onClick={handleSelectAll}
// // // //             className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border transition-all ${
// // // //               selectedMtcs.length === RANCHI_MTCS.length
// // // //                 ? "bg-blue-600 text-white border-blue-600"
// // // //                 : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
// // // //             }`}
// // // //           >
// // // //             {selectedMtcs.length === RANCHI_MTCS.length ? <CheckSquare size={12} /> : <Square size={12} />}
// // // //             Select All ({RANCHI_MTCS.length})
// // // //           </button>
// // // //           {RANCHI_MTCS.map((mtc) => {
// // // //             const isChecked = selectedMtcs.includes(mtc.id);
// // // //             return (
// // // //               <button
// // // //                 key={mtc.id}
// // // //                 type="button"
// // // //                 onClick={() => handleMtcCheckboxChange(mtc.id)}
// // // //                 className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border transition-all ${
// // // //                   isChecked
// // // //                     ? "bg-blue-50 text-blue-700 border-blue-200 font-semibold"
// // // //                     : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
// // // //                 }`}
// // // //               >
// // // //                 {isChecked ? <CheckSquare size={12} className="text-blue-600" /> : <Square size={12} className="text-slate-400" />}
// // // //                 {mtc.name}
// // // //               </button>
// // // //             );
// // // //           })}
          
// // // //           {/* Quick Actions Layout Toolbar */}
// // // //           <div className="flex items-center gap-1 ml-auto">
// // // //             <button title="Download Excel" className="p-1.5 text-slate-400 hover:text-blue-600 rounded transition-colors">
// // // //               <FileSpreadsheet size={16} />
// // // //             </button>
// // // //             <button title="Download PDF" className="p-1.5 text-slate-400 hover:text-blue-600 rounded transition-colors">
// // // //               <FileText size={16} />
// // // //             </button>
// // // //             <button title="Download Image" className="p-1.5 text-slate-400 hover:text-blue-600 rounded transition-colors">
// // // //               <ImageIcon size={16} />
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Graphical Analytics Workspace showing all requested datasets */}
// // // //         <div className="mt-6 border-t border-slate-200 pt-6">
// // // //           {showReport ? (
// // // //             <div id="div_AdmissionDashboard" className="w-full animate-in fade-in duration-300">
              
// // // //               {/* Upper Metadata Banner */}
// // // //               <div className="text-center mb-6 bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-100 py-3 rounded-xl shadow-inner">
// // // //                 <h6 id="hd_NameOfPlace" className="text-xs font-bold tracking-wider text-blue-900 uppercase m-0">
// // // //                   RANCHI ADMISSION REPORT &mdash; From Date 01-Jan-2026 - To Date 17-Jul-2026
// // // //                 </h6>
// // // //               </div>

// // // //               {/* Dashboard Layout Grid - 3 Column Matrix containing all 13 updates */}
// // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
// // // //                 {/* Unit 1: Gender Distribution Summary */}
// // // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
// // // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // // //                     <span className="font-bold text-sm text-slate-900">Gender Distribution</span>
// // // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // // //                   </div>
// // // //                   <div className="space-y-2 text-xs font-bold">
// // // //                     <div className="flex justify-between p-2 rounded-lg bg-blue-50/60 text-blue-900">
// // // //                       <span>FEMALE</span><span>228 Cases</span>
// // // //                     </div>
// // // //                     <div className="flex justify-between p-2 rounded-lg bg-blue-50/60 text-blue-900">
// // // //                       <span>MALE</span><span>221 Cases</span>
// // // //                     </div>
// // // //                     <div className="flex justify-between p-2 rounded-lg bg-slate-50 text-slate-400 font-medium">
// // // //                       <span>TRANSGENDER</span><span>0 Cases</span>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Unit 2: Caste Wise Distribution Matrix */}
// // // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
// // // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // // //                     <span className="font-bold text-sm text-slate-900">Caste Wise Distribution</span>
// // // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // // //                   </div>
// // // //                   <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
// // // //                     <div className="p-2 bg-blue-600 rounded-lg text-white">
// // // //                       <div className="text-[10px] tracking-wide opacity-90">ST</div>
// // // //                       <div className="text-xl mt-0.5">230</div>
// // // //                     </div>
// // // //                     <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
// // // //                       <div className="text-[10px] tracking-wide text-blue-700">OTHERS</div>
// // // //                       <div className="text-xl mt-0.5">81</div>
// // // //                     </div>
// // // //                     <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
// // // //                       <div className="text-[10px] tracking-wide text-blue-700">SC</div>
// // // //                       <div className="text-xl mt-0.5">71</div>
// // // //                     </div>
// // // //                     <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
// // // //                       <div className="text-[10px] tracking-wide text-blue-700">OBC</div>
// // // //                       <div className="text-xl mt-0.5">67</div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Unit 3: Age Group Profile Indicators */}
// // // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
// // // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // // //                     <span className="font-bold text-sm text-slate-900">Age Group</span>
// // // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // // //                   </div>
// // // //                   <div className="space-y-2 text-xs font-semibold">
// // // //                     <div>
// // // //                       <div className="flex justify-between mb-0.5"><span>6 - 24 M</span><span className="font-bold text-blue-700">258</span></div>
// // // //                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-600 h-full" style={{ width: "57%" }}></div></div>
// // // //                     </div>
// // // //                     <div>
// // // //                       <div className="flex justify-between mb-0.5"><span>24 - 36 M</span><span className="font-bold text-blue-700">72</span></div>
// // // //                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-500 h-full" style={{ width: "16%" }}></div></div>
// // // //                     </div>
// // // //                     <div>
// // // //                       <div className="flex justify-between mb-0.5"><span>&gt; 36 M</span><span className="font-bold text-blue-700">70</span></div>
// // // //                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-400 h-full" style={{ width: "15%" }}></div></div>
// // // //                     </div>
// // // //                     <div>
// // // //                       <div className="flex justify-between mb-0.5"><span>0 - 6 M</span><span className="font-bold text-blue-700">49</span></div>
// // // //                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-slate-400 h-full" style={{ width: "12%" }}></div></div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Unit 4: Z-Score Severe Profile */}
// // // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // // //                     <span className="font-bold text-sm text-slate-900">Z-Score Parameters</span>
// // // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // // //                   </div>
// // // //                   <div className="flex justify-around items-center h-24 text-center text-xs font-bold">
// // // //                     <div><div className="text-2xl font-black text-blue-600">304</div><div className="text-[9px] text-slate-400 uppercase">&lt; -3SD</div></div>
// // // //                     <div><div className="text-xl font-bold text-blue-500">104</div><div className="text-[9px] text-slate-400 uppercase">&lt; -4SD</div></div>
// // // //                     <div><div className="text-lg font-semibold text-slate-600">27</div><div className="text-[9px] text-slate-400 uppercase">&lt; -2SD</div></div>
// // // //                     <div><div className="text-sm font-medium text-slate-400">11</div><div className="text-[9px] text-slate-400 uppercase">&lt; -1SD</div></div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Unit 5: Oedema Breakdown Summary */}
// // // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // // //                     <span className="font-bold text-sm text-slate-900">Oedema Breakdown</span>
// // // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // // //                   </div>
// // // //                   <div className="space-y-2 text-xs font-bold mt-3">
// // // //                     <div className="flex justify-between p-2 rounded-lg bg-blue-50 text-blue-900">
// // // //                       <span>WITHOUT OEDEMA</span><span className="text-blue-700">449 Cases</span>
// // // //                     </div>
// // // //                     <div className="flex justify-between p-2 rounded-lg bg-slate-50 text-slate-400 font-medium">
// // // //                       <span>WITH OEDEMA</span><span>0 Cases</span>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Unit 6: MUAC Status Values */}
// // // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // // //                     <span className="font-bold text-sm text-slate-900">MUAC Metrics</span>
// // // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // // //                   </div>
// // // //                   <div className="space-y-2 text-xs font-bold mt-3">
// // // //                     <div className="flex justify-between p-2 rounded-lg bg-blue-50 text-blue-900">
// // // //                       <span>MUAC &gt; 11.5</span><span className="text-blue-700">270 Cases</span>
// // // //                     </div>
// // // //                     <div className="flex justify-between p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-900">
// // // //                       <span>MUAC &lt; 11.5</span><span className="text-blue-700">179 Cases</span>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Unit 7: Breastfeeding Nutrition Summary */}
// // // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // // //                     <span className="font-bold text-sm text-slate-900">Breast Feeding</span>
// // // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // // //                   </div>
// // // //                   <div className="space-y-2 text-xs font-bold mt-3">
// // // //                     <div className="flex justify-between p-2 rounded-lg bg-blue-50 text-blue-900">
// // // //                       <span>HAVE BREAST FEEDING</span><span className="text-blue-700">413 Cases</span>
// // // //                     </div>
// // // //                     <div className="flex justify-between p-2 rounded-lg bg-slate-50 text-slate-500">
// // // //                       <span>NO BREAST FEEDING</span><span className="text-slate-700">36 Cases</span>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Unit 8: Total Admission Overview */}
// // // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // // //                     <span className="font-bold text-sm text-slate-900">Total Admission Overview</span>
// // // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // // //                   </div>
// // // //                   <div className="space-y-2 mt-2 text-xs font-semibold text-slate-700">
// // // //                     <div className="flex justify-between py-1 border-b border-slate-100"><span>New Admission Cases</span><span className="font-bold text-blue-600">438</span></div>
// // // //                     <div className="flex justify-between py-1 border-b border-slate-100"><span>Re-Admissions Status</span><span className="font-bold text-blue-600">10</span></div>
// // // //                     <div className="flex justify-between py-1"><span>Relapse Complications</span><span className="font-bold text-blue-600">1</span></div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Unit 9: Referred By Channel */}
// // // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // // //                     <span className="font-bold text-sm text-slate-900">Referred By Channel</span>
// // // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // // //                   </div>
// // // //                   <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-bold mt-1">
// // // //                     <div className="flex justify-between border-b border-slate-100 pb-0.5"><span>SELF</span><span className="text-blue-600">166</span></div>
// // // //                     <div className="flex justify-between border-b border-slate-100 pb-0.5"><span>SAHIYA/ASHA</span><span className="text-blue-600">118</span></div>
// // // //                     <div className="flex justify-between border-b border-slate-100 pb-0.5"><span>ANGANWADI</span><span className="text-blue-600">98</span></div>
// // // //                     <div className="flex justify-between border-b border-slate-100 pb-0.5"><span>OTHER</span><span className="text-blue-600">39</span></div>
// // // //                     <div className="flex justify-between"><span>ANM</span><span className="text-blue-600">11</span></div>
// // // //                     <div className="flex justify-between"><span>OPD CLINIC</span><span className="text-blue-600">11</span></div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Unit 10: Complementary Feeding */}
// // // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // // //                     <span className="font-bold text-sm text-slate-900">Complementary Feeding</span>
// // // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // // //                   </div>
// // // //                   <div className="space-y-2 text-xs font-bold mt-3">
// // // //                     <div className="flex justify-between p-2 rounded-lg bg-blue-50 text-blue-900">
// // // //                       <span>HAVE COMPLEMENTARY FEEDING</span><span className="text-blue-700">422 Cases</span>
// // // //                     </div>
// // // //                     <div className="flex justify-between p-2 rounded-lg bg-slate-50 text-slate-500">
// // // //                       <span>NO COMPLEMENTARY FEEDING</span><span className="text-slate-700">27 Cases</span>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Unit 11: Appetite Test Status */}
// // // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // // //                     <span className="font-bold text-sm text-slate-900">Appetite Test Status</span>
// // // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // // //                   </div>
// // // //                   <div className="space-y-1.5 text-xs font-bold mt-2">
// // // //                     <div className="flex justify-between p-2 bg-blue-50 text-blue-900 rounded-lg"><span>APPETITE TEST FAIL</span><span>243</span></div>
// // // //                     <div className="flex justify-between p-2 bg-blue-50 text-blue-900 rounded-lg"><span>APPETITE TEST PASS</span><span>204</span></div>
// // // //                     <div className="flex justify-between px-2 text-slate-400 font-medium"><span>APPETITE TEST NOT DONE</span><span>2</span></div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Unit 12: Hemoglobin Grade */}
// // // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // // //                     <span className="font-bold text-sm text-slate-900">Hemoglobin (HB) Grade</span>
// // // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // // //                   </div>
// // // //                   <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
// // // //                     <div className="p-2 bg-blue-600 rounded-lg text-white">
// // // //                       <div className="text-[9px] uppercase tracking-wide opacity-90">SEVERE HB</div>
// // // //                       <div className="text-lg font-black mt-0.5">156</div>
// // // //                     </div>
// // // //                     <div className="p-2 bg-blue-50 border border-blue-100 rounded-lg text-blue-900">
// // // //                       <div className="text-[9px] uppercase tracking-wide text-blue-700">MILD HB</div>
// // // //                       <div className="text-lg font-black mt-0.5">84</div>
// // // //                     </div>
// // // //                     <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400 font-medium flex flex-col justify-center">
// // // //                       <span className="text-[9px]">MODERATE</span>
// // // //                       <span className="text-sm">0</span>
// // // //                     </div>
// // // //                     <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400 font-medium flex flex-col justify-center">
// // // //                       <span className="text-[9px]">NORMAL</span>
// // // //                       <span className="text-sm">0</span>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Unit 13: Complications Profile */}
// // // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // // //                     <span className="font-bold text-sm text-slate-900">Complications Profile</span>
// // // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // // //                   </div>
// // // //                   <div className="flex items-center justify-between mt-4">
// // // //                     <div className="w-1/2 text-center border-r border-slate-100">
// // // //                       <div className="text-2xl font-black text-blue-600">338</div>
// // // //                       <div className="text-[9px] font-bold text-slate-500 uppercase mt-1">Complications</div>
// // // //                     </div>
// // // //                     <div className="w-1/2 text-center">
// // // //                       <div className="text-2xl font-black text-blue-500">111</div>
// // // //                       <div className="text-[9px] font-bold text-slate-500 uppercase mt-1">No Complications</div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //               </div>
// // // //             </div>
// // // //           ) : (
// // // //             /* Replicated Workspace Placeholder */
// // // //             <div className="w-full text-center min-h-[160px] flex flex-col items-center justify-center bg-slate-50/50 rounded border border-dashed border-slate-200 p-6">
// // // //               <p className="text-slate-500 text-sm font-normal">
// // // //                 Click <span className="font-bold text-blue-600 cursor-pointer hover:underline" onClick={() => setShowReport(true)}>Fetch MTC Data</span> to populate data across Ranchi MTC Blocks...
// // // //               </p>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }

// // // "use client";

// // // import React, { useState, useEffect } from "react";
// // // import { Search, FileSpreadsheet, FileText, Image as ImageIcon, CheckSquare, Square } from "lucide-react";

// // // interface MtcOption {
// // //   id: string;
// // //   name: string;
// // // }

// // // export default function AdmissionDashboardByMTC() {
// // //   const [fromDate, setFromDate] = useState<string>("2026-07-17");
// // //   const [toDate, setToDate] = useState<string>("2026-07-17");
// // //   const [ranchiMtcs, setRanchiMtcs] = useState<MtcOption[]>([]);
// // //   const [selectedMtcs, setSelectedMtcs] = useState<string[]>([]);
// // //   const [showReport, setShowReport] = useState<boolean>(false);
// // //   const [loading, setLoading] = useState<boolean>(true);

// // //   // Fetch MTC options dynamically in Next.js (Client Component)
// // //   useEffect(() => {
// // //     async function fetchMtcOptions() {
// // //       try {
// // //         // Replace with your actual API endpoint e.g., fetch('/api/mtcs')
// // //         const data: MtcOption[] = [
// // //           { id: "26", name: "BUNDU" },
// // //           { id: "27", name: "DORANDA" },
// // //           { id: "28", name: "MANDAR" },
// // //           { id: "29", name: "BERO" },
// // //           { id: "107", name: "UP REFERRAL RIMS" },
// // //         ];
// // //         setRanchiMtcs(data);
// // //         setSelectedMtcs(data.map((m) => m.id));
// // //       } catch (error) {
// // //         console.error("Failed to fetch MTC options", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     }

// // //     fetchMtcOptions();
// // //   }, []);

// // //   const handleMtcCheckboxChange = (id: string) => {
// // //     if (selectedMtcs.includes(id)) {
// // //       setSelectedMtcs(selectedMtcs.filter((item) => item !== id));
// // //     } else {
// // //       setSelectedMtcs([...selectedMtcs, id]);
// // //     }
// // //   };

// // //   const handleSelectAll = () => {
// // //     if (selectedMtcs.length === ranchiMtcs.length) {
// // //       setSelectedMtcs([]);
// // //     } else {
// // //       setSelectedMtcs(ranchiMtcs.map((m) => m.id));
// // //     }
// // //   };

// // //   return (
// // //     <section className="my-6 font-sans w-full max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      
// // //       {/* Clean Header layout matching the original image style specifications */}
// // //       <div className="px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // //         <div>
// // //           <h5 className="text-xl font-bold tracking-tight text-blue-700">
// // //             Admission Dashboard By MTC
// // //           </h5>
// // //           <p className="text-xs text-slate-500 mt-1">Monitor admission statistics, age profiles, and clinical metrics</p>
// // //         </div>
// // //         <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm border border-blue-100">
// // //           Ranchi District User Dashboard
// // //         </div>
// // //       </div>

// // //       <hr className="border-slate-100" />

// // //       {/* Form Controls Container */}
// // //       <div className="p-6">
// // //         <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-sm text-slate-700">
          
// // //           {/* From Date group field */}
// // //           <div className="md:col-span-3">
// // //             <label className="block mb-2 font-medium text-slate-700">From Date</label>
// // //             <div className="relative flex items-center">
// // //               <input
// // //                 type="date"
// // //                 value={fromDate}
// // //                 onChange={(e) => setFromDate(e.target.value)}
// // //                 className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-slate-800 transition-all shadow-sm"
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* To Date group field */}
// // //           <div className="md:col-span-3">
// // //             <label className="block mb-2 font-medium text-slate-700">To Date</label>
// // //             <div className="relative flex items-center">
// // //               <input
// // //                 type="date"
// // //                 value={toDate}
// // //                 onChange={(e) => setToDate(e.target.value)}
// // //                 className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-slate-800 transition-all shadow-sm"
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* District Scope */}
// // //           <div className="md:col-span-3">
// // //             <label className="block mb-2 font-medium text-slate-700">District Scope</label>
// // //             <input
// // //               type="text"
// // //               value="RANCHI"
// // //               disabled
// // //               className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-700 font-medium cursor-not-allowed outline-none shadow-sm"
// // //             />
// // //           </div>

// // //           {/* Styled Outlined Fetch/Search Button */}
// // //           <div className="md:col-span-3">
// // //             <button
// // //               type="button"
// // //               onClick={() => setShowReport(true)}
// // //               className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-white border border-blue-500 rounded-md hover:bg-blue-50/50 transition-all shadow-sm active:scale-[0.99]"
// // //             >
// // //               <Search size={16} className="text-blue-600 stroke-[2.5]" />
// // //               Fetch MTC Data
// // //             </button>
// // //           </div>

// // //         </div>

// // //         {/* Filters Context Row */}
// // //         <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-dashed border-slate-100 pt-4">
// // //           <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mr-2">MTC Context Filters:</span>
// // //           {!loading && ranchiMtcs.length > 0 && (
// // //             <>
// // //               <button
// // //                 type="button"
// // //                 onClick={handleSelectAll}
// // //                 className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border transition-all ${
// // //                   selectedMtcs.length === ranchiMtcs.length
// // //                     ? "bg-blue-600 text-white border-blue-600"
// // //                     : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
// // //                 }`}
// // //               >
// // //                 {selectedMtcs.length === ranchiMtcs.length ? <CheckSquare size={12} /> : <Square size={12} />}
// // //                 Select All ({ranchiMtcs.length})
// // //               </button>
// // //               {ranchiMtcs.map((mtc) => {
// // //                 const isChecked = selectedMtcs.includes(mtc.id);
// // //                 return (
// // //                   <button
// // //                     key={mtc.id}
// // //                     type="button"
// // //                     onClick={() => handleMtcCheckboxChange(mtc.id)}
// // //                     className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border transition-all ${
// // //                       isChecked
// // //                         ? "bg-blue-50 text-blue-700 border-blue-200 font-semibold"
// // //                         : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
// // //                     }`}
// // //                   >
// // //                     {isChecked ? <CheckSquare size={12} className="text-blue-600" /> : <Square size={12} className="text-slate-400" />}
// // //                     {mtc.name}
// // //                   </button>
// // //                 );
// // //               })}
// // //             </>
// // //           )}
          
// // //           {/* Quick Actions Layout Toolbar */}
// // //           <div className="flex items-center gap-1 ml-auto">
// // //             <button title="Download Excel" className="p-1.5 text-slate-400 hover:text-blue-600 rounded transition-colors">
// // //               <FileSpreadsheet size={16} />
// // //             </button>
// // //             <button title="Download PDF" className="p-1.5 text-slate-400 hover:text-blue-600 rounded transition-colors">
// // //               <FileText size={16} />
// // //             </button>
// // //             <button title="Download Image" className="p-1.5 text-slate-400 hover:text-blue-600 rounded transition-colors">
// // //               <ImageIcon size={16} />
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Graphical Analytics Workspace showing all requested datasets */}
// // //         <div className="mt-6 border-t border-slate-200 pt-6">
// // //           {showReport ? (
// // //             <div id="div_AdmissionDashboard" className="w-full animate-in fade-in duration-300">
              
// // //               {/* Upper Metadata Banner */}
// // //               <div className="text-center mb-6 bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-100 py-3 rounded-xl shadow-inner">
// // //                 <h6 id="hd_NameOfPlace" className="text-xs font-bold tracking-wider text-blue-900 uppercase m-0">
// // //                   RANCHI ADMISSION REPORT &mdash; From Date 01-Jan-2026 - To Date 17-Jul-2026
// // //                 </h6>
// // //               </div>

// // //               {/* Dashboard Layout Grid - 3 Column Matrix containing remaining updates */}
// // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
// // //                 {/* Unit 1: Gender Distribution Summary */}
// // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
// // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // //                     <span className="font-bold text-sm text-slate-900">Gender Distribution</span>
// // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // //                   </div>
// // //                   <div className="space-y-2 text-xs font-bold">
// // //                     <div className="flex justify-between p-2 rounded-lg bg-blue-50/60 text-blue-900">
// // //                       <span>FEMALE</span><span>228 Cases</span>
// // //                     </div>
// // //                     <div className="flex justify-between p-2 rounded-lg bg-blue-50/60 text-blue-900">
// // //                       <span>MALE</span><span>221 Cases</span>
// // //                     </div>
// // //                     <div className="flex justify-between p-2 rounded-lg bg-slate-50 text-slate-400 font-medium">
// // //                       <span>TRANSGENDER</span><span>0 Cases</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Unit 2: Caste Wise Distribution Matrix (Updated categories) */}
// // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
// // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // //                     <span className="font-bold text-sm text-slate-900">Caste Wise Distribution</span>
// // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // //                   </div>
// // //                   <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
// // //                     <div className="p-2 bg-blue-600 rounded-lg text-white">
// // //                       <div className="text-[9px] tracking-wide opacity-90">ST</div>
// // //                       <div className="text-lg mt-0.5">230</div>
// // //                     </div>
// // //                     <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
// // //                       <div className="text-[9px] tracking-wide text-blue-700">GENERAL</div>
// // //                       <div className="text-lg mt-0.5">45</div>
// // //                     </div>
// // //                     <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
// // //                       <div className="text-[9px] tracking-wide text-blue-700">OBC</div>
// // //                       <div className="text-lg mt-0.5">67</div>
// // //                     </div>
// // //                     <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
// // //                       <div className="text-[9px] tracking-wide text-blue-700">SC</div>
// // //                       <div className="text-lg mt-0.5">71</div>
// // //                     </div>
// // //                     <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
// // //                       <div className="text-[9px] tracking-wide text-blue-700">EWS</div>
// // //                       <div className="text-lg mt-0.5">20</div>
// // //                     </div>
// // //                     <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
// // //                       <div className="text-[9px] tracking-wide text-blue-700">OTHER</div>
// // //                       <div className="text-lg mt-0.5">16</div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Unit 3: Age Group Profile Indicators */}
// // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
// // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // //                     <span className="font-bold text-sm text-slate-900">Age Group</span>
// // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // //                   </div>
// // //                   <div className="space-y-2 text-xs font-semibold">
// // //                     <div>
// // //                       <div className="flex justify-between mb-0.5"><span>6 - 24 M</span><span className="font-bold text-blue-700">258</span></div>
// // //                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-600 h-full" style={{ width: "57%" }}></div></div>
// // //                     </div>
// // //                     <div>
// // //                       <div className="flex justify-between mb-0.5"><span>24 - 36 M</span><span className="font-bold text-blue-700">72</span></div>
// // //                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-500 h-full" style={{ width: "16%" }}></div></div>
// // //                     </div>
// // //                     <div>
// // //                       <div className="flex justify-between mb-0.5"><span>&gt; 36 M</span><span className="font-bold text-blue-700">70</span></div>
// // //                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-400 h-full" style={{ width: "15%" }}></div></div>
// // //                     </div>
// // //                     <div>
// // //                       <div className="flex justify-between mb-0.5"><span>0 - 6 M</span><span className="font-bold text-blue-700">49</span></div>
// // //                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-slate-400 h-full" style={{ width: "12%" }}></div></div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Unit 4: MUAC Status Values */}
// // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // //                     <span className="font-bold text-sm text-slate-900">MUAC Metrics</span>
// // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // //                   </div>
// // //                   <div className="space-y-2 text-xs font-bold mt-3">
// // //                     <div className="flex justify-between p-2 rounded-lg bg-blue-50 text-blue-900">
// // //                       <span>MUAC &gt; 11.5</span><span className="text-blue-700">270 Cases</span>
// // //                     </div>
// // //                     <div className="flex justify-between p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-900">
// // //                       <span>MUAC &lt; 11.5</span><span className="text-blue-700">179 Cases</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Unit 5: Breastfeeding Nutrition Summary */}
// // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // //                     <span className="font-bold text-sm text-slate-900">Breast Feeding</span>
// // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // //                   </div>
// // //                   <div className="space-y-2 text-xs font-bold mt-3">
// // //                     <div className="flex justify-between p-2 rounded-lg bg-blue-50 text-blue-900">
// // //                       <span>HAVE BREAST FEEDING</span><span className="text-blue-700">413 Cases</span>
// // //                     </div>
// // //                     <div className="flex justify-between p-2 rounded-lg bg-slate-50 text-slate-500">
// // //                       <span>NO BREAST FEEDING</span><span className="text-slate-700">36 Cases</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Unit 6: Total Admission Overview */}
// // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // //                     <span className="font-bold text-sm text-slate-900">Total Admission Overview</span>
// // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // //                   </div>
// // //                   <div className="space-y-2 mt-2 text-xs font-semibold text-slate-700">
// // //                     <div className="flex justify-between py-1 border-b border-slate-100"><span>New Admission Cases</span><span className="font-bold text-blue-600">438</span></div>
// // //                     <div className="flex justify-between py-1 border-b border-slate-100"><span>Re-Admissions Status</span><span className="font-bold text-blue-600">10</span></div>
// // //                     <div className="flex justify-between py-1"><span>Relapse Complications</span><span className="font-bold text-blue-600">1</span></div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Unit 7: Referred By Channel */}
// // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // //                     <span className="font-bold text-sm text-slate-900">Referred By Channel</span>
// // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // //                   </div>
// // //                   <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-bold mt-1">
// // //                     <div className="flex justify-between border-b border-slate-100 pb-0.5"><span>SELF</span><span className="text-blue-600">166</span></div>
// // //                     <div className="flex justify-between border-b border-slate-100 pb-0.5"><span>SAHIYA/ASHA</span><span className="text-blue-600">118</span></div>
// // //                     <div className="flex justify-between border-b border-slate-100 pb-0.5"><span>ANGANWADI</span><span className="text-blue-600">98</span></div>
// // //                     <div className="flex justify-between border-b border-slate-100 pb-0.5"><span>OTHER</span><span className="text-blue-600">39</span></div>
// // //                     <div className="flex justify-between"><span>ANM</span><span className="text-blue-600">11</span></div>
// // //                     <div className="flex justify-between"><span>OPD CLINIC</span><span className="text-blue-600">11</span></div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Unit 8: Complementary Feeding */}
// // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // //                     <span className="font-bold text-sm text-slate-900">Complementary Feeding</span>
// // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // //                   </div>
// // //                   <div className="space-y-2 text-xs font-bold mt-3">
// // //                     <div className="flex justify-between p-2 rounded-lg bg-blue-50 text-blue-900">
// // //                       <span>HAVE COMPLEMENTARY FEEDING</span><span className="text-blue-700">422 Cases</span>
// // //                     </div>
// // //                     <div className="flex justify-between p-2 rounded-lg bg-slate-50 text-slate-500">
// // //                       <span>NO COMPLEMENTARY FEEDING</span><span className="text-slate-700">27 Cases</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Unit 9: Complications Profile */}
// // //                 <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
// // //                   <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 mb-3.5">
// // //                     <span className="font-bold text-sm text-slate-900">Complications Profile</span>
// // //                     <button className="text-slate-400 hover:text-blue-600"><ImageIcon size={14} /></button>
// // //                   </div>
// // //                   <div className="flex items-center justify-between mt-4">
// // //                     <div className="w-1/2 text-center border-r border-slate-100">
// // //                       <div className="text-2xl font-black text-blue-600">338</div>
// // //                       <div className="text-[9px] font-bold text-slate-500 uppercase mt-1">Complications</div>
// // //                     </div>
// // //                     <div className="w-1/2 text-center">
// // //                       <div className="text-2xl font-black text-blue-500">111</div>
// // //                       <div className="text-[9px] font-bold text-slate-500 uppercase mt-1">No Complications</div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //               </div>
// // //             </div>
// // //           ) : (
// // //             <div className="w-full text-center min-h-[160px] flex flex-col items-center justify-center bg-slate-50/50 rounded border border-dashed border-slate-200 p-6">
// // //               <p className="text-slate-500 text-sm font-normal">
// // //                 Click <span className="font-bold text-blue-600 cursor-pointer hover:underline" onClick={() => setShowReport(true)}>Fetch MTC Data</span> to populate data across Ranchi MTC Blocks...
// // //               </p>
// // //             </div>
// // //           )}
// // //         </div>

// // //       </div>
// // //     </section>
// // //   );
// // // }

// // "use client";

// // import React, { useState } from "react";
// // import { Search, FileSpreadsheet, FileText, Image as ImageIcon } from "lucide-react";

// // interface DistrictOption {
// //   id: string;
// //   name: string;
// // }

// // const DISTRICTS: DistrictOption[] = [
// //   { id: "ranchi", name: "RANCHI" },
// //   { id: "jamshedpur", name: "JAMSHEDPUR" },
// //   { id: "dhanbad", name: "DHANBAD" },
// //   { id: "bokaro", name: "BOKARO" },
// //   { id: "deoghar", name: "DEOGHAR" },
// // ];

// // export default function AdmissionDashboardByMTC() {
// //   const [fromDate, setFromDate] = useState<string>("2026-07-17");
// //   const [toDate, setToDate] = useState<string>("2026-07-17");
// //   const [selectedDistrict, setSelectedDistrict] = useState<string>("ranchi");
// //   const [showReport, setShowReport] = useState<boolean>(false);

// //   return (
// //     <section className="my-6 font-sans w-full max-w-7xl mx-auto bg-slate-50 min-h-screen p-4 sm:p-6">
// //       {/* Clean Light-Blue Card Container */}
// //       <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
        
// //         {/* Header */}
// //         <div className="px-6 py-5 bg-blue-50/50 border-b border-blue-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //           <div>
// //             <h5 className="text-xl font-bold tracking-tight text-blue-900">
// //               Admission Dashboard By MTC
// //             </h5>
// //             <p className="text-xs text-blue-600/80 mt-0.5">
// //               Monitor admission statistics, age profiles, and clinical metrics
// //             </p>
// //           </div>
// //           <div className="bg-blue-100/80 text-blue-800 px-3.5 py-1.5 rounded-full text-xs font-semibold">
// //             {selectedDistrict.toUpperCase()} District Dashboard
// //           </div>
// //         </div>

// //         {/* Filter Controls */}
// //         <div className="p-6">
// //           <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-sm">
            
// //             {/* From Date */}
// //             <div className="md:col-span-3">
// //               <label className="block mb-1.5 font-medium text-xs text-slate-600 uppercase tracking-wider">
// //                 From Date
// //               </label>
// //               <input
// //                 type="date"
// //                 value={fromDate}
// //                 onChange={(e) => setFromDate(e.target.value)}
// //                 className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
// //               />
// //             </div>

// //             {/* To Date */}
// //             <div className="md:col-span-3">
// //               <label className="block mb-1.5 font-medium text-xs text-slate-600 uppercase tracking-wider">
// //                 To Date
// //               </label>
// //               <input
// //                 type="date"
// //                 value={toDate}
// //                 onChange={(e) => setToDate(e.target.value)}
// //                 className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
// //               />
// //             </div>

// //             {/* District Scope */}
// //             <div className="md:col-span-3">
// //               <label className="block mb-1.5 font-medium text-xs text-slate-600 uppercase tracking-wider">
// //                 District Scope
// //               </label>
// //               <select
// //                 value={selectedDistrict}
// //                 onChange={(e) => setSelectedDistrict(e.target.value)}
// //                 className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium cursor-pointer"
// //               >
// //                 {DISTRICTS.map((dist) => (
// //                   <option key={dist.id} value={dist.id}>
// //                     {dist.name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Fetch Button */}
// //             <div className="md:col-span-3">
// //               <button
// //                 type="button"
// //                 onClick={() => setShowReport(true)}
// //                 className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
// //               >
// //                 <Search size={16} />
// //                 Fetch MTC Data
// //               </button>
// //             </div>
// //           </div>

// //           {/* Quick Actions Toolbar */}
// //           <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
// //             <span className="text-xs text-slate-400">Export options</span>
// //             <div className="flex items-center gap-1">
// //               <button title="Download Excel" className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
// //                 <FileSpreadsheet size={16} />
// //               </button>
// //               <button title="Download PDF" className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
// //                 <FileText size={16} />
// //               </button>
// //               <button title="Download Image" className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
// //                 <ImageIcon size={16} />
// //               </button>
// //             </div>
// //           </div>

// //           {/* Dashboard Cards Area */}
// //           <div className="mt-6 border-t border-slate-100 pt-6">
// //             {showReport ? (
// //               <div id="div_AdmissionDashboard" className="w-full space-y-6">
                
// //                 {/* Banner */}
// //                 <div className="bg-blue-50 border border-blue-100 text-center py-2.5 rounded-lg">
// //                   <h6 className="text-xs font-semibold text-blue-900 uppercase tracking-wide">
// //                     {selectedDistrict.toUpperCase()} ADMISSION REPORT &mdash; {fromDate} to {toDate}
// //                   </h6>
// //                 </div>

// //                 {/* Simplified Card Grid Layout */}
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  
// //                   {/* Card 1: Gender Distribution */}
// //                   <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
// //                     <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
// //                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gender</span>
// //                       <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">449 Total</span>
// //                     </div>
// //                     <div className="space-y-3">
// //                       <div>
// //                         <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
// //                           <span>Female</span>
// //                           <span className="font-semibold text-blue-900">228 Cases (51%)</span>
// //                         </div>
// //                         <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
// //                           <div className="bg-blue-600 h-full rounded-full" style={{ width: "51%" }}></div>
// //                         </div>
// //                       </div>
// //                       <div>
// //                         <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
// //                           <span>Male</span>
// //                           <span className="font-semibold text-blue-900">221 Cases (49%)</span>
// //                         </div>
// //                         <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
// //                           <div className="bg-blue-400 h-full rounded-full" style={{ width: "49%" }}></div>
// //                         </div>
// //                       </div>
// //                       <div className="pt-1 flex justify-between text-xs text-slate-400">
// //                         <span>Transgender</span>
// //                         <span>0 Cases</span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Card 2: Caste Wise Distribution */}
// //                   <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
// //                     <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
// //                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Caste Category</span>
// //                       <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Distribution</span>
// //                     </div>
// //                     <div className="grid grid-cols-3 gap-2">
// //                       <div className="bg-blue-600 text-white rounded-lg p-2.5 text-center">
// //                         <span className="text-[10px] block opacity-80 uppercase">ST</span>
// //                         <span className="text-lg font-bold">230</span>
// //                       </div>
// //                       <div className="bg-blue-50 text-blue-900 rounded-lg p-2.5 text-center">
// //                         <span className="text-[10px] block text-blue-600 uppercase">SC</span>
// //                         <span className="text-lg font-bold">71</span>
// //                       </div>
// //                       <div className="bg-blue-50 text-blue-900 rounded-lg p-2.5 text-center">
// //                         <span className="text-[10px] block text-blue-600 uppercase">OBC</span>
// //                         <span className="text-lg font-bold">67</span>
// //                       </div>
// //                       <div className="bg-slate-50 text-slate-700 rounded-lg p-2 text-center">
// //                         <span className="text-[10px] block text-slate-400 uppercase">GEN</span>
// //                         <span className="text-base font-semibold">45</span>
// //                       </div>
// //                       <div className="bg-slate-50 text-slate-700 rounded-lg p-2 text-center">
// //                         <span className="text-[10px] block text-slate-400 uppercase">EWS</span>
// //                         <span className="text-base font-semibold">20</span>
// //                       </div>
// //                       <div className="bg-slate-50 text-slate-700 rounded-lg p-2 text-center">
// //                         <span className="text-[10px] block text-slate-400 uppercase">OTH</span>
// //                         <span className="text-base font-semibold">16</span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Card 3: Age Group */}
// //                   <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
// //                     <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
// //                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Age Profile</span>
// //                       <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Months</span>
// //                     </div>
// //                     <div className="space-y-2.5">
// //                       <div>
// //                         <div className="flex justify-between text-xs text-slate-700 mb-1">
// //                           <span className="font-medium">6 - 24 M</span>
// //                           <span className="font-bold text-blue-600">258</span>
// //                         </div>
// //                         <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
// //                           <div className="bg-blue-600 h-full rounded-full" style={{ width: "57%" }}></div>
// //                         </div>
// //                       </div>
// //                       <div>
// //                         <div className="flex justify-between text-xs text-slate-700 mb-1">
// //                           <span className="font-medium">24 - 36 M</span>
// //                           <span className="font-bold text-blue-600">72</span>
// //                         </div>
// //                         <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
// //                           <div className="bg-blue-400 h-full rounded-full" style={{ width: "16%" }}></div>
// //                         </div>
// //                       </div>
// //                       <div>
// //                         <div className="flex justify-between text-xs text-slate-700 mb-1">
// //                           <span className="font-medium">&gt; 36 M</span>
// //                           <span className="font-bold text-blue-600">70</span>
// //                         </div>
// //                         <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
// //                           <div className="bg-blue-300 h-full rounded-full" style={{ width: "15%" }}></div>
// //                         </div>
// //                       </div>
// //                       <div>
// //                         <div className="flex justify-between text-xs text-slate-700 mb-1">
// //                           <span className="font-medium">0 - 6 M</span>
// //                           <span className="font-bold text-blue-600">49</span>
// //                         </div>
// //                         <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
// //                           <div className="bg-slate-300 h-full rounded-full" style={{ width: "12%" }}></div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Card 4: Breast Feeding */}
// //                   <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
// //                     <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
// //                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Breast Feeding</span>
// //                       <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Status</span>
// //                     </div>
// //                     <div className="space-y-2">
// //                       <div className="flex justify-between items-center p-2.5 rounded-lg bg-blue-50/60 border border-blue-100/80">
// //                         <span className="text-xs font-medium text-blue-900">Have Breast Feeding</span>
// //                         <span className="text-sm font-bold text-blue-700">413</span>
// //                       </div>
// //                       <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 border border-slate-100">
// //                         <span className="text-xs font-medium text-slate-600">No Breast Feeding</span>
// //                         <span className="text-sm font-semibold text-slate-800">36</span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Card 5: Total Admission Overview */}
// //                   <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
// //                     <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
// //                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Admission Type</span>
// //                       <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Overview</span>
// //                     </div>
// //                     <div className="space-y-2 text-xs">
// //                       <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
// //                         <span className="text-slate-600">New Admissions</span>
// //                         <span className="font-bold text-blue-600 text-sm">438</span>
// //                       </div>
// //                       <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
// //                         <span className="text-slate-600">Re-Admissions</span>
// //                         <span className="font-semibold text-slate-800 text-sm">10</span>
// //                       </div>
// //                       <div className="flex justify-between items-center py-1.5">
// //                         <span className="text-slate-600">Relapses</span>
// //                         <span className="font-semibold text-slate-800 text-sm">1</span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Card 6: Referred By Channel */}
// //                   <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
// //                     <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
// //                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Referred By</span>
// //                       <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Channel</span>
// //                     </div>
// //                     <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
// //                       <div className="flex justify-between py-1 border-b border-slate-50">
// //                         <span className="text-slate-600">Self</span>
// //                         <span className="font-bold text-blue-600">166</span>
// //                       </div>
// //                       <div className="flex justify-between py-1 border-b border-slate-50">
// //                         <span className="text-slate-600">Sahiya/Asha</span>
// //                         <span className="font-bold text-blue-600">118</span>
// //                       </div>
// //                       <div className="flex justify-between py-1 border-b border-slate-50">
// //                         <span className="text-slate-600">Anganwadi</span>
// //                         <span className="font-bold text-blue-600">98</span>
// //                       </div>
// //                       <div className="flex justify-between py-1 border-b border-slate-50">
// //                         <span className="text-slate-600">Other</span>
// //                         <span className="font-semibold text-slate-700">39</span>
// //                       </div>
// //                       <div className="flex justify-between py-1">
// //                         <span className="text-slate-600">ANM</span>
// //                         <span className="font-semibold text-slate-700">11</span>
// //                       </div>
// //                       <div className="flex justify-between py-1">
// //                         <span className="text-slate-600">OPD Clinic</span>
// //                         <span className="font-semibold text-slate-700">11</span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Card 7: Complementary Feeding */}
// //                   <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors lg:col-span-3">
// //                     <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
// //                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Complementary Feeding</span>
// //                       <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Status</span>
// //                     </div>
// //                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// //                       <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50/60 border border-blue-100">
// //                         <span className="text-xs font-medium text-blue-900">Have Complementary Feeding</span>
// //                         <span className="text-base font-bold text-blue-700">422 Cases</span>
// //                       </div>
// //                       <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
// //                         <span className="text-xs font-medium text-slate-600">No Complementary Feeding</span>
// //                         <span className="text-base font-semibold text-slate-800">27 Cases</span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="w-full text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
// //                 <p className="text-slate-500 text-sm">
// //                   Click <span className="font-semibold text-blue-600 cursor-pointer hover:underline" onClick={() => setShowReport(true)}>Fetch MTC Data</span> to display statistics for {selectedDistrict.toUpperCase()}.
// //                 </p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import React, { useState } from "react";
// import { Search, FileSpreadsheet, FileText, Image as ImageIcon, Loader2 } from "lucide-react";

// interface DistrictOption {
//   id: string;
//   name: string;
// }

// interface DashboardData {
//   total_admissions: number;
//   new_cases: number;
//   re_admissions: number;
//   relapses: number;
//   female_count: number;
//   male_count: number;
//   trans_count: number;
//   age_0_6: number;
//   age_6_24: number;
//   age_24_36: number;
//   age_gt_36: number;
//   general_count: number;
//   obc_count: number;
//   sc_count: number;
//   st_count: number;
//   ews_count: number;
//   others_count: number;
//   ref_asha: number;
//   ref_aww: number;
//   ref_anm: number;
//   ref_poshan_sakhi: number;
//   ref_rbsk: number;
//   ref_opd: number;
//   ref_self: number;
//   ref_other: number;
//   bf_given: number;
//   bf_not_given: number;
//   cf_given: number;
//   cf_not_given: number;
// }

// const DISTRICTS: DistrictOption[] = [
//   { id: "ALL", name: "ALL DISTRICTS" },
//   { id: "RANCHI", name: "RANCHI" },
//   { id: "JAMSHEDPUR", name: "JAMSHEDPUR" },
//   { id: "DHANBAD", name: "DHANBAD" },
//   { id: "BOKARO", name: "BOKARO" },
//   { id: "DEOGHAR", name: "DEOGHAR" },
// ];

// export default function AdmissionDashboardByMTC() {
//   const [fromDate, setFromDate] = useState<string>("2026-01-01");
//   const [toDate, setToDate] = useState<string>("2026-07-17");
//   const [selectedDistrict, setSelectedDistrict] = useState<string>("RANCHI");
//   const [reportData, setReportData] = useState<DashboardData | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const [hasFetched, setHasFetched] = useState<boolean>(false);

//   const fetchDistrictData = async () => {
//     setLoading(true);
//     setErrorMsg(null);
//     setHasFetched(true);

//     try {
//       const queryParams = new URLSearchParams({
//         fromDate,
//         toDate,
//         districtName: selectedDistrict,
//       });

//       const res = await fetch(`/api/reports/district-admission?${queryParams.toString()}`);
//       const json = await res.json();

//       if (!res.ok || !json.success) {
//         throw new Error(json.error || json.message || "Failed to fetch dashboard data");
//       }

//       setReportData(json.data);
//     } catch (err: any) {
//       console.error(err);
//       setErrorMsg(err.message || "An error occurred while fetching data.");
//       setReportData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="my-6 font-sans w-full max-w-7xl mx-auto bg-slate-50 min-h-screen p-4 sm:p-6">
//       <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
        
//         {/* Header */}
//         <div className="px-6 py-5 bg-blue-50/50 border-b border-blue-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h5 className="text-xl font-bold tracking-tight text-blue-900">
//               Admission Dashboard By MTC
//             </h5>
//             <p className="text-xs text-blue-600/80 mt-0.5">
//               Monitor admission statistics, age profiles, and clinical metrics
//             </p>
//           </div>
//           <div className="bg-blue-100/80 text-blue-800 px-3.5 py-1.5 rounded-full text-xs font-semibold">
//             {selectedDistrict} Scope Dashboard
//           </div>
//         </div>

//         {/* Form Controls */}
//         <div className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-sm">
            
//             {/* From Date */}
//             <div className="md:col-span-3">
//               <label className="block mb-1.5 font-medium text-xs text-slate-600 uppercase tracking-wider">
//                 From Date
//               </label>
//               <input
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//                 className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
//               />
//             </div>

//             {/* To Date */}
//             <div className="md:col-span-3">
//               <label className="block mb-1.5 font-medium text-xs text-slate-600 uppercase tracking-wider">
//                 To Date
//               </label>
//               <input
//                 type="date"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//                 className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
//               />
//             </div>

//             {/* District Scope Dropdown */}
//             <div className="md:col-span-3">
//               <label className="block mb-1.5 font-medium text-xs text-slate-600 uppercase tracking-wider">
//                 District Scope
//               </label>
//               <select
//                 value={selectedDistrict}
//                 onChange={(e) => setSelectedDistrict(e.target.value)}
//                 className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium cursor-pointer"
//               >
//                 {DISTRICTS.map((dist) => (
//                   <option key={dist.id} value={dist.id}>
//                     {dist.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Fetch Button */}
//             <div className="md:col-span-3">
//               <button
//                 type="button"
//                 onClick={fetchDistrictData}
//                 disabled={loading}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-lg transition-colors shadow-sm disabled:opacity-60"
//               >
//                 {loading ? (
//                   <Loader2 size={16} className="animate-spin" />
//                 ) : (
//                   <Search size={16} />
//                 )}
//                 {loading ? "Fetching..." : "Fetch MTC Data"}
//               </button>
//             </div>
//           </div>

//           {/* Export Toolbar */}
//           <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
//             <span className="text-xs text-slate-400">Export options</span>
//             <div className="flex items-center gap-1">
//               <button title="Download Excel" className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
//                 <FileSpreadsheet size={16} />
//               </button>
//               <button title="Download PDF" className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
//                 <FileText size={16} />
//               </button>
//               <button title="Download Image" className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
//                 <ImageIcon size={16} />
//               </button>
//             </div>
//           </div>

//           {/* Workspace Area */}
//           <div className="mt-6 border-t border-slate-100 pt-6">
//             {errorMsg && (
//               <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm mb-4">
//                 {errorMsg}
//               </div>
//             )}

//             {loading ? (
//               <div className="w-full text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center gap-2">
//                 <Loader2 className="animate-spin text-blue-600" size={24} />
//                 <p className="text-slate-500 text-sm">Querying database for {selectedDistrict}...</p>
//               </div>
//             ) : hasFetched && reportData ? (
//               <div id="div_AdmissionDashboard" className="w-full space-y-6">
                
//                 {/* Banner */}
//                 <div className="bg-blue-50 border border-blue-100 text-center py-2.5 rounded-lg">
//                   <h6 className="text-xs font-semibold text-blue-900 uppercase tracking-wide">
//                     {selectedDistrict} ADMISSION REPORT &mdash; {fromDate} to {toDate}
//                   </h6>
//                 </div>

//                 {/* Card Grid Layout */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  
//                   {/* Card 1: Gender Distribution */}
//                   <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
//                     <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
//                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gender</span>
//                       <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
//                         {reportData.female_count + reportData.male_count + reportData.trans_count} Total
//                       </span>
//                     </div>
//                     <div className="space-y-3">
//                       <div>
//                         <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
//                           <span>Female</span>
//                           <span className="font-semibold text-blue-900">{reportData.female_count} Cases</span>
//                         </div>
//                         <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
//                           <div 
//                             className="bg-blue-600 h-full rounded-full" 
//                             style={{ 
//                               width: `${(reportData.female_count / (reportData.total_admissions || 1)) * 100}%` 
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                       <div>
//                         <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
//                           <span>Male</span>
//                           <span className="font-semibold text-blue-900">{reportData.male_count} Cases</span>
//                         </div>
//                         <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
//                           <div 
//                             className="bg-blue-400 h-full rounded-full" 
//                             style={{ 
//                               width: `${(reportData.male_count / (reportData.total_admissions || 1)) * 100}%` 
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                       <div className="pt-1 flex justify-between text-xs text-slate-400">
//                         <span>Transgender</span>
//                         <span>{reportData.trans_count} Cases</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Card 2: Caste Distribution */}
//                   <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
//                     <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
//                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Caste Category</span>
//                       <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Distribution</span>
//                     </div>
//                     <div className="grid grid-cols-3 gap-2">
//                       <div className="bg-blue-600 text-white rounded-lg p-2.5 text-center">
//                         <span className="text-[10px] block opacity-80 uppercase">ST</span>
//                         <span className="text-lg font-bold">{reportData.st_count}</span>
//                       </div>
//                       <div className="bg-blue-50 text-blue-900 rounded-lg p-2.5 text-center">
//                         <span className="text-[10px] block text-blue-600 uppercase">SC</span>
//                         <span className="text-lg font-bold">{reportData.sc_count}</span>
//                       </div>
//                       <div className="bg-blue-50 text-blue-900 rounded-lg p-2.5 text-center">
//                         <span className="text-[10px] block text-blue-600 uppercase">OBC</span>
//                         <span className="text-lg font-bold">{reportData.obc_count}</span>
//                       </div>
//                       <div className="bg-slate-50 text-slate-700 rounded-lg p-2 text-center">
//                         <span className="text-[10px] block text-slate-400 uppercase">GEN</span>
//                         <span className="text-base font-semibold">{reportData.general_count}</span>
//                       </div>
//                       <div className="bg-slate-50 text-slate-700 rounded-lg p-2 text-center">
//                         <span className="text-[10px] block text-slate-400 uppercase">EWS</span>
//                         <span className="text-base font-semibold">{reportData.ews_count}</span>
//                       </div>
//                       <div className="bg-slate-50 text-slate-700 rounded-lg p-2 text-center">
//                         <span className="text-[10px] block text-slate-400 uppercase">OTH</span>
//                         <span className="text-base font-semibold">{reportData.others_count}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Card 3: Age Group */}
//                   <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
//                     <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
//                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Age Profile</span>
//                       <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Months</span>
//                     </div>
//                     <div className="space-y-2.5">
//                       <div>
//                         <div className="flex justify-between text-xs text-slate-700 mb-1">
//                           <span className="font-medium">6 - 24 M</span>
//                           <span className="font-bold text-blue-600">{reportData.age_6_24}</span>
//                         </div>
//                         <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
//                           <div 
//                             className="bg-blue-600 h-full rounded-full" 
//                             style={{ width: `${(reportData.age_6_24 / (reportData.total_admissions || 1)) * 100}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                       <div>
//                         <div className="flex justify-between text-xs text-slate-700 mb-1">
//                           <span className="font-medium">24 - 36 M</span>
//                           <span className="font-bold text-blue-600">{reportData.age_24_36}</span>
//                         </div>
//                         <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
//                           <div 
//                             className="bg-blue-400 h-full rounded-full" 
//                             style={{ width: `${(reportData.age_24_36 / (reportData.total_admissions || 1)) * 100}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                       <div>
//                         <div className="flex justify-between text-xs text-slate-700 mb-1">
//                           <span className="font-medium">&gt; 36 M</span>
//                           <span className="font-bold text-blue-600">{reportData.age_gt_36}</span>
//                         </div>
//                         <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
//                           <div 
//                             className="bg-blue-300 h-full rounded-full" 
//                             style={{ width: `${(reportData.age_gt_36 / (reportData.total_admissions || 1)) * 100}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                       <div>
//                         <div className="flex justify-between text-xs text-slate-700 mb-1">
//                           <span className="font-medium">0 - 6 M</span>
//                           <span className="font-bold text-blue-600">{reportData.age_0_6}</span>
//                         </div>
//                         <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
//                           <div 
//                             className="bg-slate-300 h-full rounded-full" 
//                             style={{ width: `${(reportData.age_0_6 / (reportData.total_admissions || 1)) * 100}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Card 4: Breast Feeding */}
//                   <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
//                     <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
//                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Breast Feeding</span>
//                       <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Status</span>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="flex justify-between items-center p-2.5 rounded-lg bg-blue-50/60 border border-blue-100/80">
//                         <span className="text-xs font-medium text-blue-900">Have Breast Feeding</span>
//                         <span className="text-sm font-bold text-blue-700">{reportData.bf_given}</span>
//                       </div>
//                       <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 border border-slate-100">
//                         <span className="text-xs font-medium text-slate-600">No Breast Feeding</span>
//                         <span className="text-sm font-semibold text-slate-800">{reportData.bf_not_given}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Card 5: Total Admission Overview */}
//                   <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
//                     <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
//                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Admission Type</span>
//                       <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Overview</span>
//                     </div>
//                     <div className="space-y-2 text-xs">
//                       <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
//                         <span className="text-slate-600">New Admissions</span>
//                         <span className="font-bold text-blue-600 text-sm">{reportData.new_cases}</span>
//                       </div>
//                       <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
//                         <span className="text-slate-600">Re-Admissions</span>
//                         <span className="font-semibold text-slate-800 text-sm">{reportData.re_admissions}</span>
//                       </div>
//                       <div className="flex justify-between items-center py-1.5">
//                         <span className="text-slate-600">Relapses</span>
//                         <span className="font-semibold text-slate-800 text-sm">{reportData.relapses}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Card 6: Referred By Channel */}
//                   <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
//                     <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
//                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Referred By</span>
//                       <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Channel</span>
//                     </div>
//                     <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
//                       <div className="flex justify-between py-1 border-b border-slate-50">
//                         <span className="text-slate-600">Self</span>
//                         <span className="font-bold text-blue-600">{reportData.ref_self}</span>
//                       </div>
//                       <div className="flex justify-between py-1 border-b border-slate-50">
//                         <span className="text-slate-600">Asha</span>
//                         <span className="font-bold text-blue-600">{reportData.ref_asha}</span>
//                       </div>
//                       <div className="flex justify-between py-1 border-b border-slate-50">
//                         <span className="text-slate-600">Anganwadi</span>
//                         <span className="font-bold text-blue-600">{reportData.ref_aww}</span>
//                       </div>
//                       <div className="flex justify-between py-1 border-b border-slate-50">
//                         <span className="text-slate-600">Other</span>
//                         <span className="font-semibold text-slate-700">{reportData.ref_other}</span>
//                       </div>
//                       <div className="flex justify-between py-1">
//                         <span className="text-slate-600">ANM</span>
//                         <span className="font-semibold text-slate-700">{reportData.ref_anm}</span>
//                       </div>
//                       <div className="flex justify-between py-1">
//                         <span className="text-slate-600">OPD Clinic</span>
//                         <span className="font-semibold text-slate-700">{reportData.ref_opd}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Card 7: Complementary Feeding */}
//                   <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors lg:col-span-3">
//                     <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
//                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Complementary Feeding</span>
//                       <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Status</span>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                       <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50/60 border border-blue-100">
//                         <span className="text-xs font-medium text-blue-900">Have Complementary Feeding</span>
//                         <span className="text-base font-bold text-blue-700">{reportData.cf_given} Cases</span>
//                       </div>
//                       <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
//                         <span className="text-xs font-medium text-slate-600">No Complementary Feeding</span>
//                         <span className="text-base font-semibold text-slate-800">{reportData.cf_not_given} Cases</span>
//                       </div>
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             ) : (
//               <div className="w-full text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
//                 <p className="text-slate-500 text-sm">
//                   Click <span className="font-semibold text-blue-600 cursor-pointer hover:underline" onClick={fetchDistrictData}>Fetch MTC Data</span> to query live data for {selectedDistrict}.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { Search, FileSpreadsheet, FileText, Image as ImageIcon, Loader2, Building2 } from "lucide-react";

interface DashboardData {
  total_admissions: number;
  new_cases: number;
  re_admissions: number;
  relapses: number;
  female_count: number;
  male_count: number;
  trans_count: number;
  age_0_6: number;
  age_6_24: number;
  age_24_36: number;
  age_gt_36: number;
  general_count: number;
  obc_count: number;
  sc_count: number;
  st_count: number;
  ews_count: number;
  others_count: number;
  ref_asha: number;
  ref_aww: number;
  ref_anm: number;
  ref_poshan_sakhi: number;
  ref_rbsk: number;
  ref_opd: number;
  ref_self: number;
  ref_other: number;
  bf_given: number;
  bf_not_given: number;
  cf_given: number;
  cf_not_given: number;
}

export default function AdmissionDashboardByMTC() {
  const currentYear = new Date().getFullYear();
  const [fromDate, setFromDate] = useState<string>(`${currentYear}-01-01`);
  const [toDate, setToDate] = useState<string>(new Date().toISOString().split("T")[0]);
  
  // Locked district state derived from session
  const [districtName, setDistrictName] = useState<string>("RANCHI");
  const [districtId, setDistrictId] = useState<string | null>(null);

  const [reportData, setReportData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // --- Read & Lock Logged-In User's District (Without Auto-Fetching) ---
  useEffect(() => {
    const sessionData = sessionStorage.getItem("district_user") || sessionStorage.getItem("user");

    if (sessionData) {
      try {
        const user = JSON.parse(sessionData);
        if (user.districtName) {
          setDistrictName(user.districtName.toUpperCase());
        }
        if (user.districtId) {
          setDistrictId(user.districtId);
        }
      } catch (e) {
        console.error("Error reading session user data:", e);
      }
    }
  }, []);

  // --- Search Trigger Handler ---
  const handleSearch = async () => {
    setLoading(true);
    setErrorMsg(null);
    setHasSearched(true);

    try {
      const queryParams = new URLSearchParams({
        fromDate,
        toDate,
        districtName,
        ...(districtId && { districtId })
      });

      const res = await fetch(`/api/reports/district-admission?${queryParams.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || json.message || "Failed to fetch dashboard data");
      }

      setReportData(json.data);
    } catch (err: any) {
      console.error("Dashboard fetch error:", err);
      setErrorMsg(err.message || "An error occurred while fetching data.");
      setReportData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="my-6 font-sans w-full max-w-7xl mx-auto bg-slate-50 min-h-screen p-4 sm:p-6">
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 bg-blue-50/50 border-b border-blue-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h5 className="text-xl font-bold tracking-tight text-blue-900">
              Admission Dashboard By MTC
            </h5>
            <p className="text-xs text-blue-600/80 mt-0.5">
              Monitor admission statistics, age profiles, and clinical metrics
            </p>
          </div>
          <div className="bg-blue-900 text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm">
            <Building2 size={14} className="text-blue-300" />
            {districtName} DISTRICT
          </div>
        </div>

        {/* Form Controls */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-sm">
            
            {/* Locked District Display */}
            <div className="md:col-span-4">
              <label className="block mb-1.5 font-medium text-xs text-slate-600 uppercase tracking-wider">
                Assigned District
              </label>
              <div className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 font-bold text-sm flex items-center gap-2 cursor-not-allowed">
                <Building2 size={16} className="text-slate-500" />
                <span>{districtName}</span>
              </div>
            </div>

            {/* From Date */}
            <div className="md:col-span-3">
              <label className="block mb-1.5 font-medium text-xs text-slate-600 uppercase tracking-wider">
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
              />
            </div>

            {/* To Date */}
            <div className="md:col-span-3">
              <label className="block mb-1.5 font-medium text-xs text-slate-600 uppercase tracking-wider">
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
              />
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-lg transition-colors shadow-sm disabled:opacity-60 h-[38px]"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Search size={16} />
                )}
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {/* Export Toolbar */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">Export options</span>
            <div className="flex items-center gap-1">
              <button title="Download Excel" className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                <FileSpreadsheet size={16} />
              </button>
              <button title="Download PDF" className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                <FileText size={16} />
              </button>
              <button title="Download Image" className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                <ImageIcon size={16} />
              </button>
            </div>
          </div>

          {/* Workspace Area */}
          <div className="mt-6 border-t border-slate-100 pt-6">
            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm mb-4">
                {errorMsg}
              </div>
            )}

            {loading ? (
              <div className="w-full text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center gap-2">
                <Loader2 className="animate-spin text-blue-600" size={24} />
                <p className="text-slate-500 text-sm">Searching records for {districtName} District...</p>
              </div>
            ) : hasSearched && reportData ? (
              <div id="div_AdmissionDashboard" className="w-full space-y-6">
                
                {/* Banner */}
                <div className="bg-blue-50 border border-blue-100 text-center py-2.5 rounded-lg">
                  <h6 className="text-xs font-semibold text-blue-900 uppercase tracking-wide">
                    {districtName} ADMISSION REPORT &mdash; {fromDate} to {toDate}
                  </h6>
                </div>

                {/* Card Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  
                  {/* Card 1: Gender Distribution */}
                  <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gender</span>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {reportData.female_count + reportData.male_count + reportData.trans_count} Total
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                          <span>Female</span>
                          <span className="font-semibold text-blue-900">{reportData.female_count} Cases</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-600 h-full rounded-full" 
                            style={{ 
                              width: `${(reportData.female_count / (reportData.total_admissions || 1)) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                          <span>Male</span>
                          <span className="font-semibold text-blue-900">{reportData.male_count} Cases</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-400 h-full rounded-full" 
                            style={{ 
                              width: `${(reportData.male_count / (reportData.total_admissions || 1)) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="pt-1 flex justify-between text-xs text-slate-400">
                        <span>Transgender</span>
                        <span>{reportData.trans_count} Cases</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Caste Distribution */}
                  <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Caste Category</span>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Distribution</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-blue-600 text-white rounded-lg p-2.5 text-center">
                        <span className="text-[10px] block opacity-80 uppercase">ST</span>
                        <span className="text-lg font-bold">{reportData.st_count}</span>
                      </div>
                      <div className="bg-blue-50 text-blue-900 rounded-lg p-2.5 text-center">
                        <span className="text-[10px] block text-blue-600 uppercase">SC</span>
                        <span className="text-lg font-bold">{reportData.sc_count}</span>
                      </div>
                      <div className="bg-blue-50 text-blue-900 rounded-lg p-2.5 text-center">
                        <span className="text-[10px] block text-blue-600 uppercase">OBC</span>
                        <span className="text-lg font-bold">{reportData.obc_count}</span>
                      </div>
                      <div className="bg-slate-50 text-slate-700 rounded-lg p-2 text-center">
                        <span className="text-[10px] block text-slate-400 uppercase">GEN</span>
                        <span className="text-base font-semibold">{reportData.general_count}</span>
                      </div>
                      <div className="bg-slate-50 text-slate-700 rounded-lg p-2 text-center">
                        <span className="text-[10px] block text-slate-400 uppercase">EWS</span>
                        <span className="text-base font-semibold">{reportData.ews_count}</span>
                      </div>
                      <div className="bg-slate-50 text-slate-700 rounded-lg p-2 text-center">
                        <span className="text-[10px] block text-slate-400 uppercase">OTH</span>
                        <span className="text-base font-semibold">{reportData.others_count}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Age Group */}
                  <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Age Profile</span>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Months</span>
                    </div>
                    <div className="space-y-2.5">
                      <div>
                        <div className="flex justify-between text-xs text-slate-700 mb-1">
                          <span className="font-medium">6 - 24 M</span>
                          <span className="font-bold text-blue-600">{reportData.age_6_24}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-600 h-full rounded-full" 
                            style={{ width: `${(reportData.age_6_24 / (reportData.total_admissions || 1)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-700 mb-1">
                          <span className="font-medium">24 - 36 M</span>
                          <span className="font-bold text-blue-600">{reportData.age_24_36}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-400 h-full rounded-full" 
                            style={{ width: `${(reportData.age_24_36 / (reportData.total_admissions || 1)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-700 mb-1">
                          <span className="font-medium">&gt; 36 M</span>
                          <span className="font-bold text-blue-600">{reportData.age_gt_36}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-300 h-full rounded-full" 
                            style={{ width: `${(reportData.age_gt_36 / (reportData.total_admissions || 1)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-700 mb-1">
                          <span className="font-medium">0 - 6 M</span>
                          <span className="font-bold text-blue-600">{reportData.age_0_6}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-slate-300 h-full rounded-full" 
                            style={{ width: `${(reportData.age_0_6 / (reportData.total_admissions || 1)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Breast Feeding */}
                  <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Breast Feeding</span>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Status</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2.5 rounded-lg bg-blue-50/60 border border-blue-100/80">
                        <span className="text-xs font-medium text-blue-900">Have Breast Feeding</span>
                        <span className="text-sm font-bold text-blue-700">{reportData.bf_given}</span>
                      </div>
                      <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-xs font-medium text-slate-600">No Breast Feeding</span>
                        <span className="text-sm font-semibold text-slate-800">{reportData.bf_not_given}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 5: Total Admission Overview */}
                  <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Admission Type</span>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Overview</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                        <span className="text-slate-600">New Admissions</span>
                        <span className="font-bold text-blue-600 text-sm">{reportData.new_cases}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                        <span className="text-slate-600">Re-Admissions</span>
                        <span className="font-semibold text-slate-800 text-sm">{reportData.re_admissions}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-slate-600">Relapses</span>
                        <span className="font-semibold text-slate-800 text-sm">{reportData.relapses}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 6: Referred By Channel */}
                  <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Referred By</span>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Channel</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-600">Self</span>
                        <span className="font-bold text-blue-600">{reportData.ref_self}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-600">Asha</span>
                        <span className="font-bold text-blue-600">{reportData.ref_asha}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-600">Anganwadi</span>
                        <span className="font-bold text-blue-600">{reportData.ref_aww}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-600">Other</span>
                        <span className="font-semibold text-slate-700">{reportData.ref_other}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-600">ANM</span>
                        <span className="font-semibold text-slate-700">{reportData.ref_anm}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-600">OPD Clinic</span>
                        <span className="font-semibold text-slate-700">{reportData.ref_opd}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 7: Complementary Feeding */}
                  <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors lg:col-span-3">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Complementary Feeding</span>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Status</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50/60 border border-blue-100">
                        <span className="text-xs font-medium text-blue-900">Have Complementary Feeding</span>
                        <span className="text-base font-bold text-blue-700">{reportData.cf_given} Cases</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-xs font-medium text-slate-600">No Complementary Feeding</span>
                        <span className="text-base font-semibold text-slate-800">{reportData.cf_not_given} Cases</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="w-full text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-slate-500 text-sm">
                  Click <span className="font-semibold text-blue-600 cursor-pointer hover:underline" onClick={handleSearch}>Search</span> to load MTC data for {districtName} District.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}