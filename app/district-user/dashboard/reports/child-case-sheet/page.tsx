// // "use client";

// // import React, { useState } from "react";

// // // --- Types ---
// // interface ChildRecord {
// //   sNo: number;
// //   recordNo: string;
// //   samNumber: string;
// //   childName: string;
// //   parentName: string;
// //   dob: string;
// //   weight: number;
// //   height: number;
// // }

// // // --- Mock Data (Extracted from your HTML) ---
// // const mockData: ChildRecord[] = [
// //   { sNo: 1, recordNo: "561639", samNumber: "JH/RNC/DRD/1408", childName: "Anurag Kachhap", parentName: "Binita kachhap", dob: "18-Aug-2024", weight: 7.8, height: 79.0 },
// //   { sNo: 2, recordNo: "561640", samNumber: "JH/RNC/DRD/1409", childName: "Nikhil munda", parentName: "Sumi munda", dob: "23-Mar-2024", weight: 8.28, height: 82.0 },
// //   { sNo: 3, recordNo: "561643", samNumber: "JH/RNC/DRD/1411", childName: "Yuvraj Kachhap", parentName: "Anita kachhap", dob: "06-Dec-2021", weight: 10.99, height: 95.0 },
// //   { sNo: 4, recordNo: "561641", samNumber: "JH/RNC/DRD/1410", childName: "Ishita Munda", parentName: "Faguni kumari", dob: "24-Jan-2025", weight: 7.06, height: 75.0 },
// //   { sNo: 5, recordNo: "561644", samNumber: "JH/RNC/DRD/1412", childName: "Anvi sanga", parentName: "Sunita Devi", dob: "26-Jun-2022", weight: 9.04, height: 87.0 },
// //   { sNo: 6, recordNo: "561526", samNumber: "JH/RNC/MAN/3149", childName: "Deepika oraon", parentName: "Sushma oraon", dob: "07-Jul-2024", weight: 6.4, height: 78.0 },
// //   { sNo: 7, recordNo: "561646", samNumber: "JH/RNC/DRD/1413", childName: "Etwari Munda", parentName: "Taramani Munda", dob: "11-Mar-2024", weight: 5.02, height: 66.0 },
// //   { sNo: 8, recordNo: "561601", samNumber: "jh/rnc/rim/0181", childName: "Prashant singh", parentName: "Jevan singh", dob: "15-Feb-2022", weight: 7.2, height: 76.0 },
// //   { sNo: 9, recordNo: "561636", samNumber: "JH/RNC/MAN/3150", childName: "Nishar oraon", parentName: "Salo orain", dob: "22-Feb-2025", weight: 6.0, height: 68.0 },
// //   { sNo: 10, recordNo: "561607", samNumber: "JH/RNC/BUN/1511", childName: "Kushi munda", parentName: "Saonmani kumari", dob: "11-Nov-2024", weight: 6.2, height: 70.0 },
// // ];

// // export default function ChildCaseSheet() {
// //   // --- State ---
// //   const [filters, setFilters] = useState({
// //     fromDate: "",
// //     toDate: "",
// //     recordNo: "",
// //     samNo: "",
// //     childName: "",
// //     district: "",
// //     mtc: "",
// //   });
  
// //   const [isSearching, setIsSearching] = useState(false);

// //   // --- Handlers ---
// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target;
// //     // Basic number validation for Record No
// //     if (name === "recordNo" && value !== "" && !/^\d+$/.test(value)) return;
    
// //     setFilters((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSearch = () => {
// //     setIsSearching(true);
// //     console.log("Searching with filters:", filters);
// //     // TODO: Replace with actual API call to fetch table data
// //     setTimeout(() => setIsSearching(false), 500);
// //   };

// //   const handleSelectReport = (recordNo: string) => {
// //     console.log(`Loading report for Record ID: ${recordNo}`);
// //     // TODO: Replace with navigation or modal open logic to show the report
// //     // Example: router.push(`/reports/child-sam/${recordNo}`)
// //   };

// //   return (
// //     <div className="w-full mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
// //       <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        
// //         {/* Card Header */}
// //         <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
// //           <h5 className="text-lg font-semibold m-0" style={{ color: "rgb(11,145,140)" }}>
// //             Child Case Sheet
// //           </h5>
// //         </div>

// //         {/* Card Body */}
// //         <div className="p-6">
// //           {/* Filters Grid */}
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 items-end mb-8">
            
// //             <div>
// //               <label className="block text-xs font-medium text-gray-700 mb-1">From Date</label>
// //               <input
// //                 type="date"
// //                 name="fromDate"
// //                 value={filters.fromDate}
// //                 onChange={handleInputChange}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-xs font-medium text-gray-700 mb-1">To Date</label>
// //               <input
// //                 type="date"
// //                 name="toDate"
// //                 value={filters.toDate}
// //                 onChange={handleInputChange}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-xs font-medium text-gray-700 mb-1">Record No</label>
// //               <input
// //                 type="text"
// //                 name="recordNo"
// //                 value={filters.recordNo}
// //                 onChange={handleInputChange}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-xs font-medium text-gray-700 mb-1">SAM Number</label>
// //               <input
// //                 type="text"
// //                 name="samNo"
// //                 value={filters.samNo}
// //                 onChange={handleInputChange}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-xs font-medium text-gray-700 mb-1">Child Name</label>
// //               <input
// //                 type="text"
// //                 name="childName"
// //                 value={filters.childName}
// //                 onChange={handleInputChange}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-xs font-medium text-gray-700 mb-1">District</label>
// //               <select
// //                 name="district"
// //                 value={filters.district}
// //                 onChange={handleInputChange}
// //                 disabled
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 cursor-not-allowed focus:outline-none"
// //               >
// //                 <option value="">Select</option>
// //                 <option value="8">RANCHI</option>
// //                 {/* Add other districts if needed, disabled for now as per HTML */}
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block text-xs font-medium text-gray-700 mb-1">MTC</label>
// //               <select
// //                 name="mtc"
// //                 value={filters.mtc}
// //                 onChange={handleInputChange}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
// //               >
// //                 <option value="">Select</option>
// //                 <option value="26">BUNDU</option>
// //                 <option value="27">DORANDA</option>
// //                 <option value="28">MANDAR</option>
// //                 <option value="29">BERO</option>
// //                 <option value="107">UP REFERRAL RIMS</option>
// //               </select>
// //             </div>

// //             <div>
// //               <button
// //                 onClick={handleSearch}
// //                 disabled={isSearching}
// //                 className="w-full flex items-center justify-center px-4 py-2 border border-teal-600 text-sm font-medium rounded-md text-teal-700 bg-white hover:bg-teal-50 hover:text-teal-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 h-[38px]"
// //               >
// //                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
// //                 </svg>
// //                 Search
// //               </button>
// //             </div>
// //           </div>

// //           {/* Table Section */}
// //           <div className="mt-6">
// //             <div className="text-center mb-4">
// //               <h5 className="text-lg font-semibold" style={{ color: "#026158" }}>
// //                 Download Child Case Sheet
// //               </h5>
// //             </div>

// //             {/* DataTables Replacement */}
// //             <div className="overflow-x-auto border border-gray-200 rounded-lg">
// //               <table className="min-w-full divide-y divide-gray-200">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
// //                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Record No</th>
// //                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SAM Number</th>
// //                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Child Name</th>
// //                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Parent Name</th>
// //                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date Of Birth</th>
// //                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Admission Weight</th>
// //                     <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Admission Height</th>
// //                     <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Report</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="bg-white divide-y divide-gray-200">
// //                   {mockData.map((row, index) => (
// //                     <tr key={row.recordNo} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.sNo}</td>
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.recordNo}</td>
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.samNumber}</td>
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.childName}</td>
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.parentName}</td>
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.dob}</td>
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.weight.toFixed(2)}</td>
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.height.toFixed(2)}</td>
// //                       <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
// //                         <button
// //                           onClick={() => handleSelectReport(row.recordNo)}
// //                           className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
// //                         >
// //                           Select
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                   {mockData.length === 0 && (
// //                     <tr>
// //                       <td colSpan={9} className="px-4 py-8 text-center text-sm text-gray-500">
// //                         No records found.
// //                       </td>
// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>

// //             {/* Pagination Placeholder (Since DataTables handled this previously) */}
// //             <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4 rounded-lg shadow-sm">
// //               <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
// //                 <div>
// //                   <p className="text-sm text-gray-700">
// //                     Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">77</span> entries
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
// //                     <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50">
// //                       Previous
// //                     </button>
// //                     <button className="relative z-10 inline-flex items-center bg-teal-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
// //                       1
// //                     </button>
// //                     <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
// //                       2
// //                     </button>
// //                     <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
// //                       3
// //                     </button>
// //                     <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
// //                       ...
// //                     </span>
// //                     <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
// //                       8
// //                     </button>
// //                     <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
// //                       Next
// //                     </button>
// //                   </nav>
// //                 </div>
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </div>
      
// //       {/* Report Container Placeholder */}
// //       <div id="div_Report" className="mt-4"></div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState } from "react";

// // --- Types ---
// interface ChildRecord {
//   sNo: number;
//   recordNo: string;
//   samNumber: string;
//   childName: string;
//   parentName: string;
//   dob: string;
//   weight: number;
//   height: number;
// }

// // --- Mock Data ---
// const mockData: ChildRecord[] = [
//   { sNo: 1, recordNo: "561639", samNumber: "JH/RNC/DRD/1408", childName: "Anurag Kachhap", parentName: "Binita kachhap", dob: "18-Aug-2024", weight: 7.8, height: 79.0 },
//   { sNo: 2, recordNo: "561640", samNumber: "JH/RNC/DRD/1409", childName: "Nikhil munda", parentName: "Sumi munda", dob: "23-Mar-2024", weight: 8.28, height: 82.0 },
//   { sNo: 3, recordNo: "561643", samNumber: "JH/RNC/DRD/1411", childName: "Yuvraj Kachhap", parentName: "Anita kachhap", dob: "06-Dec-2021", weight: 10.99, height: 95.0 },
//   { sNo: 4, recordNo: "561641", samNumber: "JH/RNC/DRD/1410", childName: "Ishita Munda", parentName: "Faguni kumari", dob: "24-Jan-2025", weight: 7.06, height: 75.0 },
//   { sNo: 5, recordNo: "561644", samNumber: "JH/RNC/DRD/1412", childName: "Anvi sanga", parentName: "Sunita Devi", dob: "26-Jun-2022", weight: 9.04, height: 87.0 },
//   { sNo: 6, recordNo: "561526", samNumber: "JH/RNC/MAN/3149", childName: "Deepika oraon", parentName: "Sushma oraon", dob: "07-Jul-2024", weight: 6.4, height: 78.0 },
//   { sNo: 7, recordNo: "561646", samNumber: "JH/RNC/DRD/1413", childName: "Etwari Munda", parentName: "Taramani Munda", dob: "11-Mar-2024", weight: 5.02, height: 66.0 },
//   { sNo: 8, recordNo: "561601", samNumber: "jh/rnc/rim/0181", childName: "Prashant singh", parentName: "Jevan singh", dob: "15-Feb-2022", weight: 7.2, height: 76.0 },
//   { sNo: 9, recordNo: "561636", samNumber: "JH/RNC/MAN/3150", childName: "Nishar oraon", parentName: "Salo orain", dob: "22-Feb-2025", weight: 6.0, height: 68.0 },
//   { sNo: 10, recordNo: "561607", samNumber: "JH/RNC/BUN/1511", childName: "Kushi munda", parentName: "Saonmani kumari", dob: "11-Nov-2024", weight: 6.2, height: 70.0 },
// ];

// export default function ChildCaseSheet() {
//   const [filters, setFilters] = useState({
//     fromDate: "",
//     toDate: "",
//     recordNo: "",
//     samNo: "",
//     childName: "",
//     district: "",
//     mtc: "",
//   });
  
//   const [isSearching, setIsSearching] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     if (name === "recordNo" && value !== "" && !/^\d+$/.test(value)) return;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSearch = () => {
//     setIsSearching(true);
//     setTimeout(() => setIsSearching(false), 500);
//   };

//   const handleSelectReport = (recordNo: string) => {
//     console.log(`Loading report for Record ID: ${recordNo}`);
//   };

//   return (
//     <div className="w-full mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
//       <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        
//         {/* Card Header - Blue */}
//         <div className="px-6 py-4 border-b border-gray-200 bg-blue-50/50">
//           <h5 className="text-lg font-semibold m-0 text-blue-700">
//             Child Case Sheet
//           </h5>
//         </div>

//         <div className="p-6">
//           {/* Filters Grid - Blue focus states */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 items-end mb-8">
            
//             {["fromDate", "toDate", "recordNo", "samNo", "childName"].map((field) => (
//               <div key={field}>
//                 <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">
//                   {field.replace(/([A-Z])/g, ' $1').trim()}
//                 </label>
//                 <input
//                   type={field.includes("Date") ? "date" : "text"}
//                   name={field}
//                   value={(filters as any)[field]}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             ))}

//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">District</label>
//               <select
//                 name="district"
//                 value={filters.district}
//                 onChange={handleInputChange}
//                 disabled
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 cursor-not-allowed focus:outline-none"
//               >
//                 <option value="">Select</option>
//                 <option value="8">RANCHI</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">MTC</label>
//               <select
//                 name="mtc"
//                 value={filters.mtc}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">Select</option>
//                 <option value="26">BUNDU</option>
//                 <option value="27">DORANDA</option>
//                 <option value="28">MANDAR</option>
//                 <option value="29">BERO</option>
//                 <option value="107">UP REFERRAL RIMS</option>
//               </select>
//             </div>

//             {/* Search Button - Blue */}
//             <div>
//               <button
//                 onClick={handleSearch}
//                 disabled={isSearching}
//                 className="w-full flex items-center justify-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 h-[38px]"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//                 </svg>
//                 Search
//               </button>
//             </div>
//           </div>

//           <div className="mt-6">
//             <div className="text-center mb-4">
//               <h5 className="text-lg font-semibold text-blue-900">
//                 Download Child Case Sheet
//               </h5>
//             </div>

//             <div className="overflow-x-auto border border-gray-200 rounded-lg">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     {["S.No", "Record No", "SAM Number", "Child Name", "Parent Name", "Date Of Birth", "Weight", "Height", "Report"].map((head) => (
//                       <th key={head} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         {head}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {mockData.map((row, index) => (
//                     <tr key={row.recordNo} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                       <td className="px-4 py-3 text-sm text-gray-900">{row.sNo}</td>
//                       <td className="px-4 py-3 text-sm text-gray-900">{row.recordNo}</td>
//                       <td className="px-4 py-3 text-sm text-gray-500">{row.samNumber}</td>
//                       <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.childName}</td>
//                       <td className="px-4 py-3 text-sm text-gray-500">{row.parentName}</td>
//                       <td className="px-4 py-3 text-sm text-gray-500">{row.dob}</td>
//                       <td className="px-4 py-3 text-sm text-gray-500">{row.weight.toFixed(2)}</td>
//                       <td className="px-4 py-3 text-sm text-gray-500">{row.height.toFixed(2)}</td>
//                       <td className="px-4 py-3 text-center">
//                         <button
//                           onClick={() => handleSelectReport(row.recordNo)}
//                           className="px-3 py-1 text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
//                         >
//                           Select
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination - Blue active state */}
//             <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 mt-4 rounded-lg shadow-sm">
//               <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//                 <p className="text-sm text-gray-700">
//                   Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">77</span> entries
//                 </p>
//                 <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
//                   <button className="px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 rounded-l-md hover:bg-gray-50">Previous</button>
//                   <button className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20">1</button>
//                   <button className="px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">2</button>
//                   <button className="px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">3</button>
//                   <span className="px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">...</span>
//                   <button className="px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 rounded-r-md hover:bg-gray-50">Next</button>
//                 </nav>
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

// --- Types ---
interface ChildRecord {
  sNo: number;
  recordNo: string;
  samNumber: string;
  childName: string;
  parentName: string;
  dob: string;
  weight: number;
  height: number;
}

interface FilterState {
  fromDate: string;
  toDate: string;
  recordNo: string;
  samNo: string;
  childName: string;
  district: string;
  mtc: string;
}

// --- Mock Data ---
const mockData: ChildRecord[] = [
  { sNo: 1, recordNo: "561639", samNumber: "JH/RNC/DRD/1408", childName: "Anurag Kachhap", parentName: "Binita kachhap", dob: "18-Aug-2024", weight: 7.8, height: 79.0 },
  { sNo: 2, recordNo: "561640", samNumber: "JH/RNC/DRD/1409", childName: "Nikhil munda", parentName: "Sumi munda", dob: "23-Mar-2024", weight: 8.28, height: 82.0 },
  { sNo: 3, recordNo: "561643", samNumber: "JH/RNC/DRD/1411", childName: "Yuvraj Kachhap", parentName: "Anita kachhap", dob: "06-Dec-2021", weight: 10.99, height: 95.0 },
  { sNo: 4, recordNo: "561641", samNumber: "JH/RNC/DRD/1410", childName: "Ishita Munda", parentName: "Faguni kumari", dob: "24-Jan-2025", weight: 7.06, height: 75.0 },
  { sNo: 5, recordNo: "561644", samNumber: "JH/RNC/DRD/1412", childName: "Anvi sanga", parentName: "Sunita Devi", dob: "26-Jun-2022", weight: 9.04, height: 87.0 },
  { sNo: 6, recordNo: "561526", samNumber: "JH/RNC/MAN/3149", childName: "Deepika oraon", parentName: "Sushma oraon", dob: "07-Jul-2024", weight: 6.4, height: 78.0 },
  { sNo: 7, recordNo: "561646", samNumber: "JH/RNC/DRD/1413", childName: "Etwari Munda", parentName: "Taramani Munda", dob: "11-Mar-2024", weight: 5.02, height: 66.0 },
  { sNo: 8, recordNo: "561601", samNumber: "jh/rnc/rim/0181", childName: "Prashant singh", parentName: "Jevan singh", dob: "15-Feb-2022", weight: 7.2, height: 76.0 },
  { sNo: 9, recordNo: "561636", samNumber: "JH/RNC/MAN/3150", childName: "Nishar oraon", parentName: "Salo orain", dob: "22-Feb-2025", weight: 6.0, height: 68.0 },
  { sNo: 10, recordNo: "561607", samNumber: "JH/RNC/BUN/1511", childName: "Kushi munda", parentName: "Saonmani kumari", dob: "11-Nov-2024", weight: 6.2, height: 70.0 },
];

export default function ChildCaseSheet() {
  const [filters, setFilters] = useState<FilterState>({
    fromDate: "",
    toDate: "",
    recordNo: "",
    samNo: "",
    childName: "",
    district: "",
    mtc: "",
  });
  
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "recordNo" && value !== "" && !/^\d+$/.test(value)) return;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 500);
  };

  const handleSelectReport = (recordNo: string) => {
    console.log(`Loading report for Record ID: ${recordNo}`);
  };

  // Strictly typed array keys for mapping inputs without using "any"
  const textFields: Array<keyof Omit<FilterState, "district" | "mt">> = [
    "fromDate", 
    "toDate", 
    "recordNo", 
    "samNo", 
    "childName"
  ];

  return (
    <div className="w-full mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        
        {/* Card Header - Blue */}
        <div className="px-6 py-4 border-b border-gray-200 bg-blue-50/50">
          <h5 className="text-lg font-semibold m-0 text-blue-700">
            Child Case Sheet
          </h5>
        </div>

        <div className="p-6">
          {/* Filters Grid - Blue focus states */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 items-end mb-8">
            
            {textFields.map((field) => (
              <div key={field}>
                <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type={field.includes("Date") ? "date" : "text"}
                  name={field}
                  value={filters[field]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">District</label>
              <select
                name="district"
                value={filters.district}
                onChange={handleInputChange}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 cursor-not-allowed focus:outline-none"
              >
                <option value="">Select</option>
                <option value="8">RANCHI</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">MTC</label>
              <select
                name="mtc"
                value={filters.mtc}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="26">BUNDU</option>
                <option value="27">DORANDA</option>
                <option value="28">MANDAR</option>
                <option value="29">BERO</option>
                <option value="107">UP REFERRAL RIMS</option>
              </select>
            </div>

            {/* Search Button - Blue */}
            <div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full flex items-center justify-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 h-[38px]"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Search
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-center mb-4">
              <h5 className="text-lg font-semibold text-blue-900">
                Download Child Case Sheet
              </h5>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["S.No", "Record No", "SAM Number", "Child Name", "Parent Name", "Date Of Birth", "Weight", "Height", "Report"].map((head) => (
                      <th key={head} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockData.map((row, index) => (
                    <tr key={row.recordNo} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.sNo}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.recordNo}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.samNumber}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.childName}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.parentName}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.dob}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.weight.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.height.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleSelectReport(row.recordNo)}
                          className="px-3 py-1 text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination - Blue active state */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 mt-4 rounded-lg shadow-sm">
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">77</span> entries
                </p>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                  <button className="px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 rounded-l-md hover:bg-gray-50">Previous</button>
                  <button className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20">1</button>
                  <button className="px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">2</button>
                  <button className="px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">3</button>
                  <span className="px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">...</span>
                  <button className="px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 rounded-r-md hover:bg-gray-50">Next</button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}