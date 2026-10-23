// // // "use client";

// // // import React, { useState, useEffect, useRef } from "react";
// // // import { 
// // //   Search as SearchIcon, 
// // //   ChevronDown, 
// // //   FileSpreadsheet, 
// // //   FileText, 
// // //   Image as ImageIcon,
// // //   Activity,
// // //   Clock,
// // //   Loader2
// // // } from "lucide-react";

// // // interface District {
// // //   id: string;
// // //   name: string;
// // // }

// // // export default function AdmissionDashboardByDistrict() {
// // //   // Dynamic Districts State
// // //   const [districts, setDistricts] = useState<District[]>([]);
// // //   const [isDistrictsLoading, setIsDistrictsLoading] = useState<boolean>(true);

// // //   // Form state
// // //   const [fromDate, setFromDate] = useState<string>("2026-04-10");
// // //   const [toDate, setToDate] = useState<string>("2026-04-10");
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [hasSearched, setHasSearched] = useState(false);
  
// // //   // District Selection State
// // //   const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
// // //   const [isDistrictOpen, setIsDistrictOpen] = useState(false);
// // //   const [districtSearch, setDistrictSearch] = useState("");

// // //   const districtRef = useRef<HTMLDivElement>(null);

// // //   // 1. Fetch Districts from Database API on mount
// // //   useEffect(() => {
// // //     const fetchDistricts = async () => {
// // //       try {
// // //         setIsDistrictsLoading(true);
// // //         const res = await fetch("/api/districts");
// // //         const json = await res.json();
        
// // //         if (json.success && Array.isArray(json.data)) {
// // //           // Mapping DB columns (district_id, district_name) to component interface (id, name)
// // //           const formattedDistricts: District[] = json.data.map((d: any) => ({
// // //             id: String(d.district_id),
// // //             name: String(d.district_name).toUpperCase(),
// // //           }));
// // //           setDistricts(formattedDistricts);
// // //         }
// // //       } catch (error) {
// // //         console.error("Failed to fetch districts from database:", error);
// // //       } finally {
// // //         setIsDistrictsLoading(false);
// // //       }
// // //     };

// // //     fetchDistricts();
// // //   }, []);

// // //   // Handle outside clicks for dropdown
// // //   useEffect(() => {
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (districtRef.current && !districtRef.current.contains(event.target as Node)) {
// // //         setIsDistrictOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   const filteredDistricts = districts.filter(d => 
// // //     d.name.toLowerCase().includes(districtSearch.toLowerCase())
// // //   );

// // //   const toggleDistrict = (id: string) => {
// // //     setSelectedDistricts(prev => 
// // //       prev.includes(id) ? prev.filter(dId => dId !== id) : [...prev, id]
// // //     );
// // //   };

// // //   const toggleAllDistricts = () => {
// // //     setSelectedDistricts(selectedDistricts.length === districts.length ? [] : districts.map(d => d.id));
// // //   };

// // //   const handleSearch = () => {
// // //     setIsLoading(true);
// // //     setHasSearched(false);
// // //     setTimeout(() => {
// // //       setIsLoading(false);
// // //       setHasSearched(true);
// // //     }, 800);
// // //   };

// // //   return (
// // //     <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
// // //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
// // //         {/* Header */}
// // //         <div className="bg-slate-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center flex-wrap gap-4">
// // //           <h5 className="text-lg font-semibold text-[#0b918c] m-0 flex items-center gap-2">
// // //             <Activity className="w-5 h-5" />
// // //             Admission Dashboard By District
// // //           </h5>
          
// // //           <div className="flex items-center gap-2 text-gray-400">
// // //             <Clock className="w-4 h-4" />
// // //             <span className="text-[10px] font-bold uppercase tracking-widest">Real-time Data</span>
// // //           </div>
// // //         </div>

// // //         <div className="p-6">
// // //           <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
// // //             {/* 1. From Date */}
// // //             <div className="md:col-span-3 lg:col-span-2">
// // //               <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">From Date</label>
// // //               <input
// // //                 type="date"
// // //                 value={fromDate}
// // //                 onChange={(e) => setFromDate(e.target.value)}
// // //                 className="w-full rounded-md border-gray-300 py-2 text-sm focus:ring-[#0b918c] focus:border-[#0b918c]"
// // //               />
// // //             </div>

// // //             {/* 2. To Date */}
// // //             <div className="md:col-span-3 lg:col-span-2">
// // //               <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">To Date</label>
// // //               <input
// // //                 type="date"
// // //                 value={toDate}
// // //                 onChange={(e) => setToDate(e.target.value)}
// // //                 className="w-full rounded-md border-gray-300 py-2 text-sm focus:ring-[#0b918c] focus:border-[#0b918c]"
// // //               />
// // //             </div>

// // //             {/* 3. Dynamic District Multi-select Dropdown */}
// // //             <div className="md:col-span-6 lg:col-span-4 relative" ref={districtRef}>
// // //               <div className="flex justify-between items-end mb-1">
// // //                 <label className="block text-[11px] font-bold text-gray-500 uppercase">District Selection</label>
// // //                 <button 
// // //                   onClick={toggleAllDistricts}
// // //                   disabled={isDistrictsLoading}
// // //                   className="text-[10px] font-bold text-[#0b918c] uppercase hover:underline disabled:opacity-50"
// // //                 >
// // //                   {selectedDistricts.length === districts.length ? 'Clear' : 'All'}
// // //                 </button>
// // //               </div>
              
// // //               <button
// // //                 type="button"
// // //                 onClick={() => setIsDistrictOpen(!isDistrictOpen)}
// // //                 disabled={isDistrictsLoading}
// // //                 className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-1 focus:ring-[#0b918c] flex items-center justify-between"
// // //               >
// // //                 <span className="text-sm text-gray-600 truncate">
// // //                   {isDistrictsLoading ? (
// // //                     <span className="flex items-center gap-1.5 text-gray-400">
// // //                       <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading districts...
// // //                     </span>
// // //                   ) : selectedDistricts.length === 0 ? (
// // //                     "None selected"
// // //                   ) : selectedDistricts.length === districts.length ? (
// // //                     `All Districts (${districts.length})`
// // //                   ) : (
// // //                     `${selectedDistricts.length} districts selected`
// // //                   )}
// // //                 </span>
// // //                 <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDistrictOpen ? 'rotate-180' : ''}`} />
// // //               </button>

// // //               {isDistrictOpen && (
// // //                 <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
// // //                   <div className="p-2 bg-gray-50 border-b relative">
// // //                     <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
// // //                     <input
// // //                       type="text"
// // //                       placeholder="Search districts..."
// // //                       className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0b918c]"
// // //                       value={districtSearch}
// // //                       onChange={(e) => setDistrictSearch(e.target.value)}
// // //                     />
// // //                   </div>
// // //                   <div className="max-h-48 overflow-y-auto p-1">
// // //                     {filteredDistricts.length > 0 ? (
// // //                       filteredDistricts.map((district) => (
// // //                         <label key={district.id} className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer group">
// // //                           <input
// // //                             type="checkbox"
// // //                             checked={selectedDistricts.includes(district.id)}
// // //                             onChange={() => toggleDistrict(district.id)}
// // //                             className="w-3.5 h-3.5 text-[#0b918c] rounded border-gray-300 focus:ring-0"
// // //                           />
// // //                           <span className="text-xs text-gray-600 group-hover:text-black">{district.name}</span>
// // //                         </label>
// // //                       ))
// // //                     ) : (
// // //                       <div className="p-3 text-center text-xs text-gray-400">No districts found</div>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* 4. Search Button */}
// // //             <div className="md:col-span-12 lg:col-span-2">
// // //               <button
// // //                 onClick={handleSearch}
// // //                 disabled={isLoading || isDistrictsLoading}
// // //                 className="w-full bg-[#0b918c] text-white py-2 rounded-md text-sm font-bold shadow-md hover:bg-[#097773] flex items-center justify-center gap-2 transition-all disabled:opacity-50 h-[38px]"
// // //               >
// // //                 {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <SearchIcon className="w-4 h-4" />}
// // //                 SEARCH
// // //               </button>
// // //             </div>

// // //             {/* 5. Export Actions */}
// // //             <div className="md:col-span-12 lg:col-span-2 flex gap-2">
// // //                 {hasSearched && (
// // //                     <div className="flex gap-1.5 w-full animate-in fade-in zoom-in-95 duration-300">
// // //                         <button title="Export Excel" className="flex-1 bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700 transition-colors flex justify-center">
// // //                             <FileSpreadsheet className="w-4 h-4" />
// // //                         </button>
// // //                         <button title="Export PDF" className="flex-1 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors flex justify-center">
// // //                             <FileText className="w-4 h-4" />
// // //                         </button>
// // //                         <button title="Export Image" className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors flex justify-center">
// // //                             <ImageIcon className="w-4 h-4" />
// // //                         </button>
// // //                     </div>
// // //                 )}
// // //             </div>
// // //           </div>

// // //           {/* Results Area */}
// // //           <div className="mt-8 pt-8 border-t border-gray-100">
// // //             <div className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/30">
// // //               {hasSearched ? (
// // //                 <div className="w-full p-4">
// // //                      <div className="bg-emerald-50 text-emerald-700 px-6 py-4 rounded-md border border-emerald-100 text-sm font-medium text-center">
// // //                         Dashboard data for {selectedDistricts.length} districts loaded successfully.
// // //                     </div>
// // //                 </div>
// // //               ) : (
// // //                 <div className="text-center">
// // //                   <p className="text-gray-400 text-xs italic">Select dates and districts, then click search to populate dashboard.</p>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // }\


// // "use client";

// // import React, { useState, useEffect, useRef } from "react";
// // import { 
// //   Search as SearchIcon, 
// //   ChevronDown, 
// //   FileSpreadsheet, 
// //   FileText, 
// //   Image as ImageIcon,
// //   Activity,
// //   Clock,
// //   Loader2,
// //   Users,
// //   BedDouble,
// //   CheckCircle2,
// //   PieChart
// // } from "lucide-react";

// // interface District {
// //   id: string;
// //   name: string;
// // }

// // // Data models for the dynamic tables
// // interface AdmissionData {
// //   districtName: string;
// //   totalAdmissions: number;
// //   // Gender
// //   male: number;
// //   female: number;
// //   otherGender: number;
// //   // Caste / Category
// //   st: number;
// //   sc: number;
// //   obc: number;
// //   general: number;
// //   // Referred By
// //   sahiya: number;
// //   anm: number;
// //   selfReferral: number;
// //   othersReferral: number;
// //   // Discharge Age Group
// //   age0to6m: number;
// //   age6to23m: number;
// //   age24to59m: number;
// //   // Discharge Status
// //   compliantDischarge: number;
// //   nonCompliantDischarge: number;
// //   totalDischarged: number;
// //   // Bed Occupancy
// //   sanctionedBeds: number;
// //   occupiedBeds: number;
// //   bedOccupancyRate: number; // percentage
// // }

// // export default function AdmissionDashboardByDistrict() {
// //   // Dynamic Districts State
// //   const [districts, setDistricts] = useState<District[]>([]);
// //   const [isDistrictsLoading, setIsDistrictsLoading] = useState<boolean>(true);

// //   // Form state
// //   const [fromDate, setFromDate] = useState<string>("2026-08-01");
// //   const [toDate, setToDate] = useState<string>("2026-08-05");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [hasSearched, setHasSearched] = useState(false);
  
// //   // District Selection State
// //   const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
// //   const [isDistrictOpen, setIsDistrictOpen] = useState(false);
// //   const [districtSearch, setDistrictSearch] = useState("");

// //   // Search Results State
// //   const [reportData, setReportData] = useState<AdmissionData[]>([]);

// //   const districtRef = useRef<HTMLDivElement>(null);

// //   // 1. Fetch Districts from Database API on mount
// //   useEffect(() => {
// //     const fetchDistricts = async () => {
// //       try {
// //         setIsDistrictsLoading(true);
// //         const res = await fetch("/api/districts");
// //         const json = await res.json();
        
// //         if (json.success && Array.isArray(json.data)) {
// //           const formattedDistricts: District[] = json.data.map((d: any) => ({
// //             id: String(d.district_id),
// //             name: String(d.district_name).toUpperCase(),
// //           }));
// //           setDistricts(formattedDistricts);
// //         } else {
// //           // Fallback static list if API returns empty/fails during dev
// //           setDistricts([
// //             { id: "1", name: "RANCHI" },
// //             { id: "2", name: "EAST SINGHBHUM" },
// //             { id: "3", name: "DHANBAD" },
// //             { id: "4", name: "HAZARIBAGH" }
// //           ]);
// //         }
// //       } catch (error) {
// //         console.error("Failed to fetch districts from database:", error);
// //         // Fallback for visual rendering
// //         setDistricts([
// //           { id: "1", name: "RANCHI" },
// //           { id: "2", name: "EAST SINGHBHUM" },
// //           { id: "3", name: "DHANBAD" },
// //           { id: "4", name: "HAZARIBAGH" }
// //         ]);
// //       } finally {
// //         setIsDistrictsLoading(false);
// //       }
// //     };

// //     fetchDistricts();
// //   }, []);

// //   // Handle outside clicks for dropdown
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (districtRef.current && !districtRef.current.contains(event.target as Node)) {
// //         setIsDistrictOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const filteredDistricts = districts.filter(d => 
// //     d.name.toLowerCase().includes(districtSearch.toLowerCase())
// //   );

// //   const toggleDistrict = (id: string) => {
// //     setSelectedDistricts(prev => 
// //       prev.includes(id) ? prev.filter(dId => dId !== id) : [...prev, id]
// //     );
// //   };

// //   const toggleAllDistricts = () => {
// //     setSelectedDistricts(selectedDistricts.length === districts.length ? [] : districts.map(d => d.id));
// //   };

// //   const handleSearch = () => {
// //     setIsLoading(true);
// //     setHasSearched(false);

// //     // Mock response dataset generation based on selection
// //     setTimeout(() => {
// //       const targetDistricts = selectedDistricts.length > 0 
// //         ? districts.filter(d => selectedDistricts.includes(d.id))
// //         : districts;

// //       const generatedData: AdmissionData[] = targetDistricts.map((d, index) => {
// //         const male = 25 + index * 4;
// //         const female = 30 + index * 3;
// //         const totalAdmissions = male + female;
// //         const compliant = Math.floor(totalAdmissions * 0.82);
// //         const nonCompliant = totalAdmissions - compliant;
// //         const beds = 30;
// //         const occupied = Math.min(beds, Math.floor(beds * (0.65 + index * 0.08)));

// //         return {
// //           districtName: d.name,
// //           totalAdmissions,
// //           male,
// //           female,
// //           otherGender: 0,
// //           st: Math.floor(totalAdmissions * 0.45),
// //           sc: Math.floor(totalAdmissions * 0.25),
// //           obc: Math.floor(totalAdmissions * 0.20),
// //           general: totalAdmissions - Math.floor(totalAdmissions * 0.90),
// //           sahiya: Math.floor(totalAdmissions * 0.60),
// //           anm: Math.floor(totalAdmissions * 0.25),
// //           selfReferral: Math.floor(totalAdmissions * 0.10),
// //           othersReferral: totalAdmissions - Math.floor(totalAdmissions * 0.95),
// //           age0to6m: Math.floor(totalAdmissions * 0.15),
// //           age6to23m: Math.floor(totalAdmissions * 0.55),
// //           age24to59m: totalAdmissions - Math.floor(totalAdmissions * 0.70),
// //           compliantDischarge: compliant,
// //           nonCompliantDischarge: nonCompliant,
// //           totalDischarged: compliant + nonCompliant,
// //           sanctionedBeds: beds,
// //           occupiedBeds: occupied,
// //           bedOccupancyRate: parseFloat(((occupied / beds) * 100).toFixed(1))
// //         };
// //       });

// //       setReportData(generatedData);
// //       setIsLoading(false);
// //       setHasSearched(true);
// //     }, 800);
// //   };

// //   // Helper summary calculations
// //   const totals = reportData.reduce(
// //     (acc, curr) => ({
// //       totalAdmissions: acc.totalAdmissions + curr.totalAdmissions,
// //       male: acc.male + curr.male,
// //       female: acc.female + curr.female,
// //       st: acc.st + curr.st,
// //       sc: acc.sc + curr.sc,
// //       obc: acc.obc + curr.obc,
// //       general: acc.general + curr.general,
// //       sahiya: acc.sahiya + curr.sahiya,
// //       anm: acc.anm + curr.anm,
// //       selfReferral: acc.selfReferral + curr.selfReferral,
// //       othersReferral: acc.othersReferral + curr.othersReferral,
// //       age0to6m: acc.age0to6m + curr.age0to6m,
// //       age6to23m: acc.age6to23m + curr.age6to23m,
// //       age24to59m: acc.age24to59m + curr.age24to59m,
// //       compliantDischarge: acc.compliantDischarge + curr.compliantDischarge,
// //       nonCompliantDischarge: acc.nonCompliantDischarge + curr.nonCompliantDischarge,
// //       totalDischarged: acc.totalDischarged + curr.totalDischarged,
// //       sanctionedBeds: acc.sanctionedBeds + curr.sanctionedBeds,
// //       occupiedBeds: acc.occupiedBeds + curr.occupiedBeds,
// //     }),
// //     {
// //       totalAdmissions: 0, male: 0, female: 0, st: 0, sc: 0, obc: 0, general: 0,
// //       sahiya: 0, anm: 0, selfReferral: 0, othersReferral: 0,
// //       age0to6m: 0, age6to23m: 0, age24to59m: 0,
// //       compliantDischarge: 0, nonCompliantDischarge: 0, totalDischarged: 0,
// //       sanctionedBeds: 0, occupiedBeds: 0
// //     }
// //   );

// //   const overallBedOccupancyRate = totals.sanctionedBeds > 0 
// //     ? ((totals.occupiedBeds / totals.sanctionedBeds) * 100).toFixed(1) 
// //     : "0.0";

// //   return (
// //     <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
// //         {/* Header */}
// //         <div className="bg-slate-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center flex-wrap gap-4">
// //           <h5 className="text-lg font-semibold text-[#0b918c] m-0 flex items-center gap-2">
// //             <Activity className="w-5 h-5" />
// //             Admission Dashboard By District
// //           </h5>
          
// //           <div className="flex items-center gap-2 text-gray-400">
// //             <Clock className="w-4 h-4" />
// //             <span className="text-[10px] font-bold uppercase tracking-widest">Real-time Data</span>
// //           </div>
// //         </div>

// //         <div className="p-6">
// //           <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
// //             {/* 1. From Date */}
// //             <div className="md:col-span-3 lg:col-span-2">
// //               <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">From Date</label>
// //               <input
// //                 type="date"
// //                 value={fromDate}
// //                 onChange={(e) => setFromDate(e.target.value)}
// //                 className="w-full rounded-md border-gray-300 py-2 text-sm focus:ring-[#0b918c] focus:border-[#0b918c]"
// //               />
// //             </div>

// //             {/* 2. To Date */}
// //             <div className="md:col-span-3 lg:col-span-2">
// //               <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">To Date</label>
// //               <input
// //                 type="date"
// //                 value={toDate}
// //                 onChange={(e) => setToDate(e.target.value)}
// //                 className="w-full rounded-md border-gray-300 py-2 text-sm focus:ring-[#0b918c] focus:border-[#0b918c]"
// //               />
// //             </div>

// //             {/* 3. Dynamic District Multi-select Dropdown */}
// //             <div className="md:col-span-6 lg:col-span-4 relative" ref={districtRef}>
// //               <div className="flex justify-between items-end mb-1">
// //                 <label className="block text-[11px] font-bold text-gray-500 uppercase">District Selection</label>
// //                 <button 
// //                   onClick={toggleAllDistricts}
// //                   disabled={isDistrictsLoading}
// //                   className="text-[10px] font-bold text-[#0b918c] uppercase hover:underline disabled:opacity-50"
// //                 >
// //                   {selectedDistricts.length === districts.length ? 'Clear' : 'All'}
// //                 </button>
// //               </div>
              
// //               <button
// //                 type="button"
// //                 onClick={() => setIsDistrictOpen(!isDistrictOpen)}
// //                 disabled={isDistrictsLoading}
// //                 className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-1 focus:ring-[#0b918c] flex items-center justify-between"
// //               >
// //                 <span className="text-sm text-gray-600 truncate">
// //                   {isDistrictsLoading ? (
// //                     <span className="flex items-center gap-1.5 text-gray-400">
// //                       <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading districts...
// //                     </span>
// //                   ) : selectedDistricts.length === 0 ? (
// //                     "None selected"
// //                   ) : selectedDistricts.length === districts.length ? (
// //                     `All Districts (${districts.length})`
// //                   ) : (
// //                     `${selectedDistricts.length} districts selected`
// //                   )}
// //                 </span>
// //                 <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDistrictOpen ? 'rotate-180' : ''}`} />
// //               </button>

// //               {isDistrictOpen && (
// //                 <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
// //                   <div className="p-2 bg-gray-50 border-b relative">
// //                     <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
// //                     <input
// //                       type="text"
// //                       placeholder="Search districts..."
// //                       className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0b918c]"
// //                       value={districtSearch}
// //                       onChange={(e) => setDistrictSearch(e.target.value)}
// //                     />
// //                   </div>
// //                   <div className="max-h-48 overflow-y-auto p-1">
// //                     {filteredDistricts.length > 0 ? (
// //                       filteredDistricts.map((district) => (
// //                         <label key={district.id} className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer group">
// //                           <input
// //                             type="checkbox"
// //                             checked={selectedDistricts.includes(district.id)}
// //                             onChange={() => toggleDistrict(district.id)}
// //                             className="w-3.5 h-3.5 text-[#0b918c] rounded border-gray-300 focus:ring-0"
// //                           />
// //                           <span className="text-xs text-gray-600 group-hover:text-black">{district.name}</span>
// //                         </label>
// //                       ))
// //                     ) : (
// //                       <div className="p-3 text-center text-xs text-gray-400">No districts found</div>
// //                     )}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* 4. Search Button */}
// //             <div className="md:col-span-12 lg:col-span-2">
// //               <button
// //                 onClick={handleSearch}
// //                 disabled={isLoading || isDistrictsLoading}
// //                 className="w-full bg-[#0b918c] text-white py-2 rounded-md text-sm font-bold shadow-md hover:bg-[#097773] flex items-center justify-center gap-2 transition-all disabled:opacity-50 h-[38px]"
// //               >
// //                 {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <SearchIcon className="w-4 h-4" />}
// //                 SEARCH
// //               </button>
// //             </div>

// //             {/* 5. Export Actions */}
// //             <div className="md:col-span-12 lg:col-span-2 flex gap-2">
// //               {hasSearched && (
// //                 <div className="flex gap-1.5 w-full animate-in fade-in zoom-in-95 duration-300">
// //                   <button title="Export Excel" className="flex-1 bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700 transition-colors flex justify-center items-center">
// //                     <FileSpreadsheet className="w-4 h-4" />
// //                   </button>
// //                   <button title="Export PDF" className="flex-1 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors flex justify-center items-center">
// //                     <FileText className="w-4 h-4" />
// //                   </button>
// //                   <button title="Export Image" className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors flex justify-center items-center">
// //                     <ImageIcon className="w-4 h-4" />
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Results Reports & Tables Section */}
// //       {hasSearched && (
// //         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
// //           {/* Key Summary KPI Cards */}
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
// //               <div className="p-3 bg-teal-50 rounded-lg text-[#0b918c]">
// //                 <Users className="w-6 h-6" />
// //               </div>
// //               <div>
// //                 <p className="text-xs font-semibold text-gray-500 uppercase">Total Admissions</p>
// //                 <h3 className="text-xl font-bold text-gray-800">{totals.totalAdmissions}</h3>
// //               </div>
// //             </div>

// //             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
// //               <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
// //                 <CheckCircle2 className="w-6 h-6" />
// //               </div>
// //               <div>
// //                 <p className="text-xs font-semibold text-gray-500 uppercase">Total Discharged</p>
// //                 <h3 className="text-xl font-bold text-gray-800">{totals.totalDischarged}</h3>
// //               </div>
// //             </div>

// //             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
// //               <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
// //                 <BedDouble className="w-6 h-6" />
// //               </div>
// //               <div>
// //                 <p className="text-xs font-semibold text-gray-500 uppercase">Occupied Beds</p>
// //                 <h3 className="text-xl font-bold text-gray-800">{totals.occupiedBeds} / {totals.sanctionedBeds}</h3>
// //               </div>
// //             </div>

// //             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
// //               <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
// //                 <PieChart className="w-6 h-6" />
// //               </div>
// //               <div>
// //                 <p className="text-xs font-semibold text-gray-500 uppercase">Avg Bed Occupancy</p>
// //                 <h3 className="text-xl font-bold text-gray-800">{overallBedOccupancyRate}%</h3>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Detailed Analytical Table */}
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// //             <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
// //               <h6 className="font-bold text-gray-700 text-sm tracking-wide uppercase">
// //                 District-Wise Admission & Discharge Consolidated Report
// //               </h6>
// //               <span className="text-xs text-gray-500">
// //                 Period: <span className="font-medium text-gray-700">{fromDate}</span> to <span className="font-medium text-gray-700">{toDate}</span>
// //               </span>
// //             </div>

// //             <div className="overflow-x-auto">
// //               <table className="w-full text-xs text-left border-collapse">
// //                 <thead className="bg-slate-100 text-gray-700 font-bold uppercase border-b border-gray-200">
// //                   <tr>
// //                     <th rowSpan={2} className="p-3 border-r border-gray-200 text-center min-w-[140px] bg-slate-200/60">District</th>
// //                     <th rowSpan={2} className="p-3 border-r border-gray-200 text-center bg-teal-50 text-[#0b918c]">Total Admissions</th>
// //                     <th colSpan={2} className="p-2 border-r border-gray-200 text-center bg-slate-100">Gender</th>
// //                     <th colSpan={4} className="p-2 border-r border-gray-200 text-center bg-slate-100">Caste / Category</th>
// //                     <th colSpan={4} className="p-2 border-r border-gray-200 text-center bg-slate-100">Referred By</th>
// //                     <th colSpan={3} className="p-2 border-r border-gray-200 text-center bg-slate-100">Discharge Age Group</th>
// //                     <th colSpan={3} className="p-2 border-r border-gray-200 text-center bg-emerald-50 text-emerald-800">Discharge Performance</th>
// //                     <th colSpan={3} className="p-2 text-center bg-blue-50 text-blue-800">Bed Occupancy Rate</th>
// //                   </tr>
// //                   <tr className="border-t border-gray-200">
// //                     {/* Gender */}
// //                     <th className="p-2 border-r border-gray-200 text-center">Male</th>
// //                     <th className="p-2 border-r border-gray-200 text-center">Female</th>
// //                     {/* Caste */}
// //                     <th className="p-2 border-r border-gray-200 text-center">ST</th>
// //                     <th className="p-2 border-r border-gray-200 text-center">SC</th>
// //                     <th className="p-2 border-r border-gray-200 text-center">OBC</th>
// //                     <th className="p-2 border-r border-gray-200 text-center">GEN</th>
// //                     {/* Referred By */}
// //                     <th className="p-2 border-r border-gray-200 text-center">Sahiya</th>
// //                     <th className="p-2 border-r border-gray-200 text-center">ANM</th>
// //                     <th className="p-2 border-r border-gray-200 text-center">Self</th>
// //                     <th className="p-2 border-r border-gray-200 text-center">Others</th>
// //                     {/* Discharge Age Group */}
// //                     <th className="p-2 border-r border-gray-200 text-center">&lt; 6M</th>
// //                     <th className="p-2 border-r border-gray-200 text-center">6-23M</th>
// //                     <th className="p-2 border-r border-gray-200 text-center">24-59M</th>
// //                     {/* Discharge Performance */}
// //                     <th className="p-2 border-r border-gray-200 text-center bg-emerald-50/50 text-emerald-700">Compliant</th>
// //                     <th className="p-2 border-r border-gray-200 text-center bg-emerald-50/50 text-emerald-700">Non-Compliant</th>
// //                     <th className="p-2 border-r border-gray-200 text-center bg-emerald-100/50 font-bold text-emerald-800">Total Discharged</th>
// //                     {/* Bed Occupancy */}
// //                     <th className="p-2 border-r border-gray-200 text-center bg-blue-50/50">Sanctioned</th>
// //                     <th className="p-2 border-r border-gray-200 text-center bg-blue-50/50">Occupied</th>
// //                     <th className="p-2 text-center bg-blue-100/50 font-bold text-blue-800">% Rate</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-200">
// //                   {reportData.map((row, idx) => (
// //                     <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
// //                       <td className="p-3 border-r border-gray-200 font-semibold text-gray-800">{row.districtName}</td>
// //                       <td className="p-3 border-r border-gray-200 text-center font-bold text-[#0b918c] bg-teal-50/30">{row.totalAdmissions}</td>
                      
// //                       {/* Gender */}
// //                       <td className="p-2 border-r border-gray-200 text-center">{row.male}</td>
// //                       <td className="p-2 border-r border-gray-200 text-center">{row.female}</td>
                      
// //                       {/* Caste */}
// //                       <td className="p-2 border-r border-gray-200 text-center">{row.st}</td>
// //                       <td className="p-2 border-r border-gray-200 text-center">{row.sc}</td>
// //                       <td className="p-2 border-r border-gray-200 text-center">{row.obc}</td>
// //                       <td className="p-2 border-r border-gray-200 text-center">{row.general}</td>
                      
// //                       {/* Referred By */}
// //                       <td className="p-2 border-r border-gray-200 text-center">{row.sahiya}</td>
// //                       <td className="p-2 border-r border-gray-200 text-center">{row.anm}</td>
// //                       <td className="p-2 border-r border-gray-200 text-center">{row.selfReferral}</td>
// //                       <td className="p-2 border-r border-gray-200 text-center">{row.othersReferral}</td>
                      
// //                       {/* Discharge Age Group */}
// //                       <td className="p-2 border-r border-gray-200 text-center">{row.age0to6m}</td>
// //                       <td className="p-2 border-r border-gray-200 text-center">{row.age6to23m}</td>
// //                       <td className="p-2 border-r border-gray-200 text-center">{row.age24to59m}</td>
                      
// //                       {/* Discharge Performance */}
// //                       <td className="p-2 border-r border-gray-200 text-center font-semibold text-emerald-600 bg-emerald-50/20">{row.compliantDischarge}</td>
// //                       <td className="p-2 border-r border-gray-200 text-center font-semibold text-red-500 bg-red-50/20">{row.nonCompliantDischarge}</td>
// //                       <td className="p-2 border-r border-gray-200 text-center font-bold text-gray-800 bg-emerald-50/30">{row.totalDischarged}</td>
                      
// //                       {/* Bed Occupancy */}
// //                       <td className="p-2 border-r border-gray-200 text-center">{row.sanctionedBeds}</td>
// //                       <td className="p-2 border-r border-gray-200 text-center">{row.occupiedBeds}</td>
// //                       <td className="p-2 text-center font-bold bg-blue-50/30 text-blue-700">{row.bedOccupancyRate}%</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //                 <tfoot className="bg-slate-100 font-bold border-t-2 border-gray-300 text-gray-800">
// //                   <tr>
// //                     <td className="p-3 border-r border-gray-200 text-left uppercase">Total / Average</td>
// //                     <td className="p-3 border-r border-gray-200 text-center text-[#0b918c]">{totals.totalAdmissions}</td>
                    
// //                     {/* Gender Totals */}
// //                     <td className="p-2 border-r border-gray-200 text-center">{totals.male}</td>
// //                     <td className="p-2 border-r border-gray-200 text-center">{totals.female}</td>
                    
// //                     {/* Caste Totals */}
// //                     <td className="p-2 border-r border-gray-200 text-center">{totals.st}</td>
// //                     <td className="p-2 border-r border-gray-200 text-center">{totals.sc}</td>
// //                     <td className="p-2 border-r border-gray-200 text-center">{totals.obc}</td>
// //                     <td className="p-2 border-r border-gray-200 text-center">{totals.general}</td>
                    
// //                     {/* Referred By Totals */}
// //                     <td className="p-2 border-r border-gray-200 text-center">{totals.sahiya}</td>
// //                     <td className="p-2 border-r border-gray-200 text-center">{totals.anm}</td>
// //                     <td className="p-2 border-r border-gray-200 text-center">{totals.selfReferral}</td>
// //                     <td className="p-2 border-r border-gray-200 text-center">{totals.othersReferral}</td>
                    
// //                     {/* Age Group Totals */}
// //                     <td className="p-2 border-r border-gray-200 text-center">{totals.age0to6m}</td>
// //                     <td className="p-2 border-r border-gray-200 text-center">{totals.age6to23m}</td>
// //                     <td className="p-2 border-r border-gray-200 text-center">{totals.age24to59m}</td>
                    
// //                     {/* Discharge Performance Totals */}
// //                     <td className="p-2 border-r border-gray-200 text-center text-emerald-700">{totals.compliantDischarge}</td>
// //                     <td className="p-2 border-r border-gray-200 text-center text-red-600">{totals.nonCompliantDischarge}</td>
// //                     <td className="p-2 border-r border-gray-200 text-center text-gray-900">{totals.totalDischarged}</td>
                    
// //                     {/* Bed Occupancy Totals */}
// //                     <td className="p-2 border-r border-gray-200 text-center">{totals.sanctionedBeds}</td>
// //                     <td className="p-2 border-r border-gray-200 text-center">{totals.occupiedBeds}</td>
// //                     <td className="p-2 text-center text-blue-800">{overallBedOccupancyRate}%</td>
// //                   </tr>
// //                 </tfoot>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { 
//   Search as SearchIcon, 
//   ChevronDown, 
//   FileSpreadsheet, 
//   FileText, 
//   Image as ImageIcon,
//   Activity,
//   Clock,
//   Loader2,
//   Users,
//   BedDouble,
//   CheckCircle2,
//   PieChart
// } from "lucide-react";

// interface District {
//   id: string;
//   name: string;
// }

// interface AdmissionData {
//   districtName: string;
//   totalAdmissions: number;
//   male: number;
//   female: number;
//   otherGender: number;
//   st: number;
//   sc: number;
//   obc: number;
//   general: number;
//   sahiya: number;
//   anm: number;
//   selfReferral: number;
//   othersReferral: number;
//   age0to6m: number;
//   age6to23m: number;
//   age24to59m: number;
//   compliantDischarge: number;
//   nonCompliantDischarge: number;
//   totalDischarged: number;
//   sanctionedBeds: number;
//   occupiedBeds: number;
//   bedOccupancyRate: number;
// }

// export default function AdmissionDashboardByDistrict() {
//   const [districts, setDistricts] = useState<District[]>([]);
//   const [isDistrictsLoading, setIsDistrictsLoading] = useState<boolean>(true);

//   const [fromDate, setFromDate] = useState<string>("2026-08-01");
//   const [toDate, setToDate] = useState<string>("2026-08-05");
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);
  
//   const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
//   const [isDistrictOpen, setIsDistrictOpen] = useState(false);
//   const [districtSearch, setDistrictSearch] = useState("");

//   const [reportData, setReportData] = useState<AdmissionData[]>([]);

//   const districtRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchDistricts = async () => {
//       try {
//         setIsDistrictsLoading(true);
//         const res = await fetch("/api/districts");
//         const json = await res.json();
        
//         if (json.success && Array.isArray(json.data)) {
//           const formattedDistricts: District[] = json.data.map((d: any) => ({
//             id: String(d.district_id || d.id || d.district_name),
//             name: String(d.district_name || d.name).toUpperCase(),
//           }));
//           setDistricts(formattedDistricts);
//         } else {
//           setDistricts([
//             { id: "RANCHI", name: "RANCHI" },
//             { id: "EAST SINGHBHUM", name: "EAST SINGHBHUM" },
//             { id: "DHANBAD", name: "DHANBAD" },
//             { id: "HAZARIBAGH", name: "HAZARIBAGH" }
//           ]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch districts from database:", error);
//         setDistricts([
//           { id: "RANCHI", name: "RANCHI" },
//           { id: "EAST SINGHBHUM", name: "EAST SINGHBHUM" },
//           { id: "DHANBAD", name: "DHANBAD" },
//           { id: "HAZARIBAGH", name: "HAZARIBAGH" }
//         ]);
//       } finally {
//         setIsDistrictsLoading(false);
//       }
//     };

//     fetchDistricts();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (districtRef.current && !districtRef.current.contains(event.target as Node)) {
//         setIsDistrictOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const filteredDistricts = districts.filter(d => 
//     d.name.toLowerCase().includes(districtSearch.toLowerCase())
//   );

//   const toggleDistrict = (id: string) => {
//     setSelectedDistricts(prev => 
//       prev.includes(id) ? prev.filter(dId => dId !== id) : [...prev, id]
//     );
//   };

//   const toggleAllDistricts = () => {
//     setSelectedDistricts(selectedDistricts.length === districts.length ? [] : districts.map(d => d.id));
//   };

//   // Connected real API handler
//   const handleSearch = async () => {
//     try {
//       setIsLoading(true);
//       setHasSearched(false);

//       const targetDistrictNames = selectedDistricts.length > 0 
//         ? districts.filter(d => selectedDistricts.includes(d.id)).map(d => d.name).join(",")
//         : "ALL";

//       const queryParams = new URLSearchParams({
//         fromDate,
//         toDate,
//         districtIds: targetDistrictNames
//       });

//       const res = await fetch(`/api/mtc-state-report/district-generation-report?${queryParams.toString()}`);
//       const json = await res.json();

//       if (json.success && Array.isArray(json.data)) {
//         setReportData(json.data);
//       } else {
//         console.error("API Error:", json.error);
//         setReportData([]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch district generation report:", error);
//       setReportData([]);
//     } finally {
//       setIsLoading(false);
//       setHasSearched(true);
//     }
//   };

//   const totals = reportData.reduce(
//     (acc, curr) => ({
//       totalAdmissions: acc.totalAdmissions + curr.totalAdmissions,
//       male: acc.male + curr.male,
//       female: acc.female + curr.female,
//       st: acc.st + curr.st,
//       sc: acc.sc + curr.sc,
//       obc: acc.obc + curr.obc,
//       general: acc.general + curr.general,
//       sahiya: acc.sahiya + curr.sahiya,
//       anm: acc.anm + curr.anm,
//       selfReferral: acc.selfReferral + curr.selfReferral,
//       othersReferral: acc.othersReferral + curr.othersReferral,
//       age0to6m: acc.age0to6m + curr.age0to6m,
//       age6to23m: acc.age6to23m + curr.age6to23m,
//       age24to59m: acc.age24to59m + curr.age24to59m,
//       compliantDischarge: acc.compliantDischarge + curr.compliantDischarge,
//       nonCompliantDischarge: acc.nonCompliantDischarge + curr.nonCompliantDischarge,
//       totalDischarged: acc.totalDischarged + curr.totalDischarged,
//       sanctionedBeds: acc.sanctionedBeds + curr.sanctionedBeds,
//       occupiedBeds: acc.occupiedBeds + curr.occupiedBeds,
//     }),
//     {
//       totalAdmissions: 0, male: 0, female: 0, st: 0, sc: 0, obc: 0, general: 0,
//       sahiya: 0, anm: 0, selfReferral: 0, othersReferral: 0,
//       age0to6m: 0, age6to23m: 0, age24to59m: 0,
//       compliantDischarge: 0, nonCompliantDischarge: 0, totalDischarged: 0,
//       sanctionedBeds: 0, occupiedBeds: 0
//     }
//   );

//   const overallBedOccupancyRate = totals.sanctionedBeds > 0 
//     ? ((totals.occupiedBeds / totals.sanctionedBeds) * 100).toFixed(1) 
//     : "0.0";

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
//         {/* Header */}
//         <div className="bg-slate-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center flex-wrap gap-4">
//           <h5 className="text-lg font-semibold text-[#0b918c] m-0 flex items-center gap-2">
//             <Activity className="w-5 h-5" />
//             Admission Dashboard By District
//           </h5>
          
//           <div className="flex items-center gap-2 text-gray-400">
//             <Clock className="w-4 h-4" />
//             <span className="text-[10px] font-bold uppercase tracking-widest">Real-time Data</span>
//           </div>
//         </div>

//         <div className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
//             {/* 1. From Date */}
//             <div className="md:col-span-3 lg:col-span-2">
//               <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">From Date</label>
//               <input
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//                 className="w-full rounded-md border-gray-300 py-2 text-sm focus:ring-[#0b918c] focus:border-[#0b918c]"
//               />
//             </div>

//             {/* 2. To Date */}
//             <div className="md:col-span-3 lg:col-span-2">
//               <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">To Date</label>
//               <input
//                 type="date"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//                 className="w-full rounded-md border-gray-300 py-2 text-sm focus:ring-[#0b918c] focus:border-[#0b918c]"
//               />
//             </div>

//             {/* 3. District Multi-select Dropdown */}
//             <div className="md:col-span-6 lg:col-span-4 relative" ref={districtRef}>
//               <div className="flex justify-between items-end mb-1">
//                 <label className="block text-[11px] font-bold text-gray-500 uppercase">District Selection</label>
//                 <button 
//                   onClick={toggleAllDistricts}
//                   disabled={isDistrictsLoading}
//                   className="text-[10px] font-bold text-[#0b918c] uppercase hover:underline disabled:opacity-50"
//                 >
//                   {selectedDistricts.length === districts.length ? 'Clear' : 'All'}
//                 </button>
//               </div>
              
//               <button
//                 type="button"
//                 onClick={() => setIsDistrictOpen(!isDistrictOpen)}
//                 disabled={isDistrictsLoading}
//                 className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-1 focus:ring-[#0b918c] flex items-center justify-between"
//               >
//                 <span className="text-sm text-gray-600 truncate">
//                   {isDistrictsLoading ? (
//                     <span className="flex items-center gap-1.5 text-gray-400">
//                       <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading districts...
//                     </span>
//                   ) : selectedDistricts.length === 0 ? (
//                     "None selected (All)"
//                   ) : selectedDistricts.length === districts.length ? (
//                     `All Districts (${districts.length})`
//                   ) : (
//                     `${selectedDistricts.length} districts selected`
//                   )}
//                 </span>
//                 <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDistrictOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {isDistrictOpen && (
//                 <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
//                   <div className="p-2 bg-gray-50 border-b relative">
//                     <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="Search districts..."
//                       className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0b918c]"
//                       value={districtSearch}
//                       onChange={(e) => setDistrictSearch(e.target.value)}
//                     />
//                   </div>
//                   <div className="max-h-48 overflow-y-auto p-1">
//                     {filteredDistricts.length > 0 ? (
//                       filteredDistricts.map((district) => (
//                         <label key={district.id} className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer group">
//                           <input
//                             type="checkbox"
//                             checked={selectedDistricts.includes(district.id)}
//                             onChange={() => toggleDistrict(district.id)}
//                             className="w-3.5 h-3.5 text-[#0b918c] rounded border-gray-300 focus:ring-0"
//                           />
//                           <span className="text-xs text-gray-600 group-hover:text-black">{district.name}</span>
//                         </label>
//                       ))
//                     ) : (
//                       <div className="p-3 text-center text-xs text-gray-400">No districts found</div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* 4. Search Button */}
//             <div className="md:col-span-12 lg:col-span-2">
//               <button
//                 onClick={handleSearch}
//                 disabled={isLoading || isDistrictsLoading}
//                 className="w-full bg-[#0b918c] text-white py-2 rounded-md text-sm font-bold shadow-md hover:bg-[#097773] flex items-center justify-center gap-2 transition-all disabled:opacity-50 h-[38px]"
//               >
//                 {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SearchIcon className="w-4 h-4" />}
//                 SEARCH
//               </button>
//             </div>

//             {/* 5. Export Actions */}
//             <div className="md:col-span-12 lg:col-span-2 flex gap-2">
//               {hasSearched && (
//                 <div className="flex gap-1.5 w-full animate-in fade-in zoom-in-95 duration-300">
//                   <button title="Export Excel" className="flex-1 bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700 transition-colors flex justify-center items-center">
//                     <FileSpreadsheet className="w-4 h-4" />
//                   </button>
//                   <button title="Export PDF" className="flex-1 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors flex justify-center items-center">
//                     <FileText className="w-4 h-4" />
//                   </button>
//                   <button title="Export Image" className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors flex justify-center items-center">
//                     <ImageIcon className="w-4 h-4" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Results Reports & Tables Section */}
//       {hasSearched && (
//         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
//           {/* Key Summary KPI Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
//               <div className="p-3 bg-teal-50 rounded-lg text-[#0b918c]">
//                 <Users className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-gray-500 uppercase">Total Admissions</p>
//                 <h3 className="text-xl font-bold text-gray-800">{totals.totalAdmissions}</h3>
//               </div>
//             </div>

//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
//               <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
//                 <CheckCircle2 className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-gray-500 uppercase">Total Discharged</p>
//                 <h3 className="text-xl font-bold text-gray-800">{totals.totalDischarged}</h3>
//               </div>
//             </div>

//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
//               <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
//                 <BedDouble className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-gray-500 uppercase">Occupied Beds</p>
//                 <h3 className="text-xl font-bold text-gray-800">{totals.occupiedBeds} / {totals.sanctionedBeds}</h3>
//               </div>
//             </div>

//             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
//               <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
//                 <PieChart className="w-6 h-6" />
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-gray-500 uppercase">Avg Bed Occupancy</p>
//                 <h3 className="text-xl font-bold text-gray-800">{overallBedOccupancyRate}%</h3>
//               </div>
//             </div>
//           </div>

//           {/* Detailed Analytical Table */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
//               <h6 className="font-bold text-gray-700 text-sm tracking-wide uppercase">
//                 District-Wise Admission & Discharge Consolidated Report
//               </h6>
//               <span className="text-xs text-gray-500">
//                 Period: <span className="font-medium text-gray-700">{fromDate}</span> to <span className="font-medium text-gray-700">{toDate}</span>
//               </span>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-xs text-left border-collapse">
//                 <thead className="bg-slate-100 text-gray-700 font-bold uppercase border-b border-gray-200">
//                   <tr>
//                     <th rowSpan={2} className="p-3 border-r border-gray-200 text-center min-w-[140px] bg-slate-200/60">District</th>
//                     <th rowSpan={2} className="p-3 border-r border-gray-200 text-center bg-teal-50 text-[#0b918c]">Total Admissions</th>
//                     <th colSpan={2} className="p-2 border-r border-gray-200 text-center bg-slate-100">Gender</th>
//                     <th colSpan={4} className="p-2 border-r border-gray-200 text-center bg-slate-100">Caste / Category</th>
//                     <th colSpan={4} className="p-2 border-r border-gray-200 text-center bg-slate-100">Referred By</th>
//                     <th colSpan={3} className="p-2 border-r border-gray-200 text-center bg-slate-100">Discharge Age Group</th>
//                     <th colSpan={3} className="p-2 border-r border-gray-200 text-center bg-emerald-50 text-emerald-800">Discharge Performance</th>
//                     <th colSpan={3} className="p-2 text-center bg-blue-50 text-blue-800">Bed Occupancy Rate</th>
//                   </tr>
//                   <tr className="border-t border-gray-200">
//                     <th className="p-2 border-r border-gray-200 text-center">Male</th>
//                     <th className="p-2 border-r border-gray-200 text-center">Female</th>
//                     <th className="p-2 border-r border-gray-200 text-center">ST</th>
//                     <th className="p-2 border-r border-gray-200 text-center">SC</th>
//                     <th className="p-2 border-r border-gray-200 text-center">OBC</th>
//                     <th className="p-2 border-r border-gray-200 text-center">GEN</th>
//                     <th className="p-2 border-r border-gray-200 text-center">Sahiya</th>
//                     <th className="p-2 border-r border-gray-200 text-center">ANM</th>
//                     <th className="p-2 border-r border-gray-200 text-center">Self</th>
//                     <th className="p-2 border-r border-gray-200 text-center">Others</th>
//                     <th className="p-2 border-r border-gray-200 text-center">&lt; 6M</th>
//                     <th className="p-2 border-r border-gray-200 text-center">6-23M</th>
//                     <th className="p-2 border-r border-gray-200 text-center">24-59M</th>
//                     <th className="p-2 border-r border-gray-200 text-center bg-emerald-50/50 text-emerald-700">Compliant</th>
//                     <th className="p-2 border-r border-gray-200 text-center bg-emerald-50/50 text-emerald-700">Non-Compliant</th>
//                     <th className="p-2 border-r border-gray-200 text-center bg-emerald-100/50 font-bold text-emerald-800">Total Discharged</th>
//                     <th className="p-2 border-r border-gray-200 text-center bg-blue-50/50">Sanctioned</th>
//                     <th className="p-2 border-r border-gray-200 text-center bg-blue-50/50">Occupied</th>
//                     <th className="p-2 text-center bg-blue-100/50 font-bold text-blue-800">% Rate</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {reportData.map((row, idx) => (
//                     <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
//                       <td className="p-3 border-r border-gray-200 font-semibold text-gray-800">{row.districtName}</td>
//                       <td className="p-3 border-r border-gray-200 text-center font-bold text-[#0b918c] bg-teal-50/30">{row.totalAdmissions}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.male}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.female}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.st}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.sc}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.obc}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.general}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.sahiya}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.anm}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.selfReferral}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.othersReferral}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.age0to6m}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.age6to23m}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.age24to59m}</td>
//                       <td className="p-2 border-r border-gray-200 text-center font-semibold text-emerald-600 bg-emerald-50/20">{row.compliantDischarge}</td>
//                       <td className="p-2 border-r border-gray-200 text-center font-semibold text-red-500 bg-red-50/20">{row.nonCompliantDischarge}</td>
//                       <td className="p-2 border-r border-gray-200 text-center font-bold text-gray-800 bg-emerald-50/30">{row.totalDischarged}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.sanctionedBeds}</td>
//                       <td className="p-2 border-r border-gray-200 text-center">{row.occupiedBeds}</td>
//                       <td className="p-2 text-center font-bold bg-blue-50/30 text-blue-700">{row.bedOccupancyRate}%</td>
//                     </tr>
//                   ))}
//                 </tbody>
//                 <tfoot className="bg-slate-100 font-bold border-t-2 border-gray-300 text-gray-800">
//                   <tr>
//                     <td className="p-3 border-r border-gray-200 text-left uppercase">Total / Average</td>
//                     <td className="p-3 border-r border-gray-200 text-center text-[#0b918c]">{totals.totalAdmissions}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.male}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.female}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.st}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.sc}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.obc}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.general}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.sahiya}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.anm}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.selfReferral}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.othersReferral}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.age0to6m}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.age6to23m}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.age24to59m}</td>
//                     <td className="p-2 border-r border-gray-200 text-center text-emerald-700">{totals.compliantDischarge}</td>
//                     <td className="p-2 border-r border-gray-200 text-center text-red-600">{totals.nonCompliantDischarge}</td>
//                     <td className="p-2 border-r border-gray-200 text-center text-gray-900">{totals.totalDischarged}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.sanctionedBeds}</td>
//                     <td className="p-2 border-r border-gray-200 text-center">{totals.occupiedBeds}</td>
//                     <td className="p-2 text-center text-blue-800">{overallBedOccupancyRate}%</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Search as SearchIcon, 
  ChevronDown, 
  FileSpreadsheet, 
  FileText, 
  Image as ImageIcon,
  Activity,
  Clock,
  Loader2,
  Users,
  BedDouble,
  CheckCircle2,
  PieChart
} from "lucide-react";

interface District {
  id: string;
  name: string;
}

interface AdmissionData {
  districtName: string;
  totalAdmissions: number;
  male: number;
  female: number;
  otherGender: number;
  st: number;
  sc: number;
  obc: number;
  general: number;
  sahiya: number;
  anm: number;
  selfReferral: number;
  othersReferral: number;
  age0to6m: number;
  age6to23m: number;
  age24to59m: number;
  compliantDischarge: number;
  nonCompliantDischarge: number;
  totalDischarged: number;
  sanctionedBeds: number;
  occupiedBeds: number;
  bedOccupancyRate: number;
}

export default function DistrictGenerationReport() {
  const [districts, setDistricts] = useState<District[]>([]);
  const [isDistrictsLoading, setIsDistrictsLoading] = useState<boolean>(true);

  const [fromDate, setFromDate] = useState<string>("2026-08-01");
  const [toDate, setToDate] = useState<string>("2026-08-05");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState("");

  const [reportData, setReportData] = useState<AdmissionData[]>([]);

  const districtRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        setIsDistrictsLoading(true);
        const res = await fetch("/api/districts");
        const json = await res.json();
        
        if (json.success && Array.isArray(json.data)) {
          const formattedDistricts: District[] = json.data.map((d: any) => ({
            id: String(d.district_id || d.id || d.district_name),
            name: String(d.district_name || d.name).toUpperCase(),
          }));
          setDistricts(formattedDistricts);
        } else {
          setDistricts([
            { id: "RANCHI", name: "RANCHI" },
            { id: "EAST SINGHBHUM", name: "EAST SINGHBHUM" },
            { id: "DHANBAD", name: "DHANBAD" },
            { id: "HAZARIBAGH", name: "HAZARIBAGH" }
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch districts from database:", error);
        setDistricts([
          { id: "RANCHI", name: "RANCHI" },
          { id: "EAST SINGHBHUM", name: "EAST SINGHBHUM" },
          { id: "DHANBAD", name: "DHANBAD" },
          { id: "HAZARIBAGH", name: "HAZARIBAGH" }
        ]);
      } finally {
        setIsDistrictsLoading(false);
      }
    };

    fetchDistricts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (districtRef.current && !districtRef.current.contains(event.target as Node)) {
        setIsDistrictOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDistricts = districts.filter(d => 
    d.name.toLowerCase().includes(districtSearch.toLowerCase())
  );

  const toggleDistrict = (id: string) => {
    setSelectedDistricts(prev => 
      prev.includes(id) ? prev.filter(dId => dId !== id) : [...prev, id]
    );
  };

  const toggleAllDistricts = () => {
    setSelectedDistricts(selectedDistricts.length === districts.length ? [] : districts.map(d => d.id));
  };

  // Connected real API handler
  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setHasSearched(false);

      const targetDistrictNames = selectedDistricts.length > 0 
        ? districts.filter(d => selectedDistricts.includes(d.id)).map(d => d.name).join(",")
        : "ALL";

      const queryParams = new URLSearchParams({
        fromDate,
        toDate,
        districtIds: targetDistrictNames
      });

      const res = await fetch(`/api/mtc-state-report/district-generation-report?${queryParams.toString()}`);
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        setReportData(json.data);
      } else {
        console.error("API Error:", json.error);
        setReportData([]);
      }
    } catch (error) {
      console.error("Failed to fetch district generation report:", error);
      setReportData([]);
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  };

  const totals = reportData.reduce(
    (acc, curr) => ({
      totalAdmissions: acc.totalAdmissions + curr.totalAdmissions,
      male: acc.male + curr.male,
      female: acc.female + curr.female,
      st: acc.st + curr.st,
      sc: acc.sc + curr.sc,
      obc: acc.obc + curr.obc,
      general: acc.general + curr.general,
      sahiya: acc.sahiya + curr.sahiya,
      anm: acc.anm + curr.anm,
      selfReferral: acc.selfReferral + curr.selfReferral,
      othersReferral: acc.othersReferral + curr.othersReferral,
      age0to6m: acc.age0to6m + curr.age0to6m,
      age6to23m: acc.age6to23m + curr.age6to23m,
      age24to59m: acc.age24to59m + curr.age24to59m,
      compliantDischarge: acc.compliantDischarge + curr.compliantDischarge,
      nonCompliantDischarge: acc.nonCompliantDischarge + curr.nonCompliantDischarge,
      totalDischarged: acc.totalDischarged + curr.totalDischarged,
      sanctionedBeds: acc.sanctionedBeds + curr.sanctionedBeds,
      occupiedBeds: acc.occupiedBeds + curr.occupiedBeds,
    }),
    {
      totalAdmissions: 0, male: 0, female: 0, st: 0, sc: 0, obc: 0, general: 0,
      sahiya: 0, anm: 0, selfReferral: 0, othersReferral: 0,
      age0to6m: 0, age6to23m: 0, age24to59m: 0,
      compliantDischarge: 0, nonCompliantDischarge: 0, totalDischarged: 0,
      sanctionedBeds: 0, occupiedBeds: 0
    }
  );

  const overallBedOccupancyRate = totals.sanctionedBeds > 0 
    ? ((totals.occupiedBeds / totals.sanctionedBeds) * 100).toFixed(1) 
    : "0.0";

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center flex-wrap gap-4">
          <h5 className="text-lg font-semibold text-[#0b918c] m-0 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            District Generation Report
          </h5>
          
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Real-time Data</span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            {/* 1. From Date */}
            <div className="md:col-span-3 lg:col-span-2">
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full rounded-md border-gray-300 py-2 text-sm focus:ring-[#0b918c] focus:border-[#0b918c]"
              />
            </div>

            {/* 2. To Date */}
            <div className="md:col-span-3 lg:col-span-2">
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full rounded-md border-gray-300 py-2 text-sm focus:ring-[#0b918c] focus:border-[#0b918c]"
              />
            </div>

            {/* 3. District Multi-select Dropdown */}
            <div className="md:col-span-6 lg:col-span-4 relative" ref={districtRef}>
              <div className="flex justify-between items-end mb-1">
                <label className="block text-[11px] font-bold text-gray-500 uppercase">District Selection</label>
                <button 
                  onClick={toggleAllDistricts}
                  disabled={isDistrictsLoading}
                  className="text-[10px] font-bold text-[#0b918c] uppercase hover:underline disabled:opacity-50"
                >
                  {selectedDistricts.length === districts.length ? 'Clear' : 'All'}
                </button>
              </div>
              
              <button
                type="button"
                onClick={() => setIsDistrictOpen(!isDistrictOpen)}
                disabled={isDistrictsLoading}
                className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left focus:outline-none focus:ring-1 focus:ring-[#0b918c] flex items-center justify-between"
              >
                <span className="text-sm text-gray-600 truncate">
                  {isDistrictsLoading ? (
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading districts...
                    </span>
                  ) : selectedDistricts.length === 0 ? (
                    "None selected (All)"
                  ) : selectedDistricts.length === districts.length ? (
                    `All Districts (${districts.length})`
                  ) : (
                    `${selectedDistricts.length} districts selected`
                  )}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDistrictOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDistrictOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                  <div className="p-2 bg-gray-50 border-b relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search districts..."
                      className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0b918c]"
                      value={districtSearch}
                      onChange={(e) => setDistrictSearch(e.target.value)}
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto p-1">
                    {filteredDistricts.length > 0 ? (
                      filteredDistricts.map((district) => (
                        <label key={district.id} className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedDistricts.includes(district.id)}
                            onChange={() => toggleDistrict(district.id)}
                            className="w-3.5 h-3.5 text-[#0b918c] rounded border-gray-300 focus:ring-0"
                          />
                          <span className="text-xs text-gray-600 group-hover:text-black">{district.name}</span>
                        </label>
                      ))
                    ) : (
                      <div className="p-3 text-center text-xs text-gray-400">No districts found</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Search Button */}
            <div className="md:col-span-12 lg:col-span-2">
              <button
                onClick={handleSearch}
                disabled={isLoading || isDistrictsLoading}
                className="w-full bg-[#0b918c] text-white py-2 rounded-md text-sm font-bold shadow-md hover:bg-[#097773] flex items-center justify-center gap-2 transition-all disabled:opacity-50 h-[38px]"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SearchIcon className="w-4 h-4" />}
                SEARCH
              </button>
            </div>

            {/* 5. Export Actions */}
            <div className="md:col-span-12 lg:col-span-2 flex gap-2">
              {hasSearched && (
                <div className="flex gap-1.5 w-full animate-in fade-in zoom-in-95 duration-300">
                  <button title="Export Excel" className="flex-1 bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700 transition-colors flex justify-center items-center">
                    <FileSpreadsheet className="w-4 h-4" />
                  </button>
                  <button title="Export PDF" className="flex-1 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors flex justify-center items-center">
                    <FileText className="w-4 h-4" />
                  </button>
                  <button title="Export Image" className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors flex justify-center items-center">
                    <ImageIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Reports & Tables Section */}
      {hasSearched && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          {/* Key Summary KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-teal-50 rounded-lg text-[#0b918c]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Total Admissions</p>
                <h3 className="text-xl font-bold text-gray-800">{totals.totalAdmissions}</h3>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Total Discharged</p>
                <h3 className="text-xl font-bold text-gray-800">{totals.totalDischarged}</h3>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <BedDouble className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Occupied Beds</p>
                <h3 className="text-xl font-bold text-gray-800">{totals.occupiedBeds} / {totals.sanctionedBeds}</h3>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                <PieChart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Avg Bed Occupancy</p>
                <h3 className="text-xl font-bold text-gray-800">{overallBedOccupancyRate}%</h3>
              </div>
            </div>
          </div>

          {/* Detailed Analytical Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
              <h6 className="font-bold text-gray-700 text-sm tracking-wide uppercase">
                District-Wise Admission & Discharge Consolidated Report
              </h6>
              <span className="text-xs text-gray-500">
                Period: <span className="font-medium text-gray-700">{fromDate}</span> to <span className="font-medium text-gray-700">{toDate}</span>
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-100 text-gray-700 font-bold uppercase border-b border-gray-200">
                  <tr>
                    <th rowSpan={2} className="p-3 border-r border-gray-200 text-center min-w-[140px] bg-slate-200/60">District</th>
                    <th rowSpan={2} className="p-3 border-r border-gray-200 text-center bg-teal-50 text-[#0b918c]">Total Admissions</th>
                    <th colSpan={2} className="p-2 border-r border-gray-200 text-center bg-slate-100">Gender</th>
                    <th colSpan={4} className="p-2 border-r border-gray-200 text-center bg-slate-100">Caste / Category</th>
                    <th colSpan={4} className="p-2 border-r border-gray-200 text-center bg-slate-100">Referred By</th>
                    <th colSpan={3} className="p-2 border-r border-gray-200 text-center bg-slate-100">Discharge Age Group</th>
                    <th colSpan={3} className="p-2 border-r border-gray-200 text-center bg-emerald-50 text-emerald-800">Discharge Performance</th>
                    <th colSpan={3} className="p-2 text-center bg-blue-50 text-blue-800">Bed Occupancy Rate</th>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <th className="p-2 border-r border-gray-200 text-center">Male</th>
                    <th className="p-2 border-r border-gray-200 text-center">Female</th>
                    <th className="p-2 border-r border-gray-200 text-center">ST</th>
                    <th className="p-2 border-r border-gray-200 text-center">SC</th>
                    <th className="p-2 border-r border-gray-200 text-center">OBC</th>
                    <th className="p-2 border-r border-gray-200 text-center">GEN</th>
                    <th className="p-2 border-r border-gray-200 text-center">Sahiya</th>
                    <th className="p-2 border-r border-gray-200 text-center">ANM</th>
                    <th className="p-2 border-r border-gray-200 text-center">Self</th>
                    <th className="p-2 border-r border-gray-200 text-center">Others</th>
                    <th className="p-2 border-r border-gray-200 text-center">&lt; 6M</th>
                    <th className="p-2 border-r border-gray-200 text-center">6-23M</th>
                    <th className="p-2 border-r border-gray-200 text-center">24-59M</th>
                    <th className="p-2 border-r border-gray-200 text-center bg-emerald-50/50 text-emerald-700">Compliant</th>
                    <th className="p-2 border-r border-gray-200 text-center bg-emerald-50/50 text-emerald-700">Non-Compliant</th>
                    <th className="p-2 border-r border-gray-200 text-center bg-emerald-100/50 font-bold text-emerald-800">Total Discharged</th>
                    <th className="p-2 border-r border-gray-200 text-center bg-blue-50/50">Sanctioned</th>
                    <th className="p-2 border-r border-gray-200 text-center bg-blue-50/50">Occupied</th>
                    <th className="p-2 text-center bg-blue-100/50 font-bold text-blue-800">% Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reportData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 border-r border-gray-200 font-semibold text-gray-800">{row.districtName}</td>
                      <td className="p-3 border-r border-gray-200 text-center font-bold text-[#0b918c] bg-teal-50/30">{row.totalAdmissions}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.male}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.female}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.st}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.sc}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.obc}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.general}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.sahiya}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.anm}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.selfReferral}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.othersReferral}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.age0to6m}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.age6to23m}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.age24to59m}</td>
                      <td className="p-2 border-r border-gray-200 text-center font-semibold text-emerald-600 bg-emerald-50/20">{row.compliantDischarge}</td>
                      <td className="p-2 border-r border-gray-200 text-center font-semibold text-red-500 bg-red-50/20">{row.nonCompliantDischarge}</td>
                      <td className="p-2 border-r border-gray-200 text-center font-bold text-gray-800 bg-emerald-50/30">{row.totalDischarged}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.sanctionedBeds}</td>
                      <td className="p-2 border-r border-gray-200 text-center">{row.occupiedBeds}</td>
                      <td className="p-2 text-center font-bold bg-blue-50/30 text-blue-700">{row.bedOccupancyRate}%</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-100 font-bold border-t-2 border-gray-300 text-gray-800">
                  <tr>
                    <td className="p-3 border-r border-gray-200 text-left uppercase">Total / Average</td>
                    <td className="p-3 border-r border-gray-200 text-center text-[#0b918c]">{totals.totalAdmissions}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.male}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.female}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.st}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.sc}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.obc}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.general}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.sahiya}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.anm}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.selfReferral}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.othersReferral}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.age0to6m}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.age6to23m}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.age24to59m}</td>
                    <td className="p-2 border-r border-gray-200 text-center text-emerald-700">{totals.compliantDischarge}</td>
                    <td className="p-2 border-r border-gray-200 text-center text-red-600">{totals.nonCompliantDischarge}</td>
                    <td className="p-2 border-r border-gray-200 text-center text-gray-900">{totals.totalDischarged}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.sanctionedBeds}</td>
                    <td className="p-2 border-r border-gray-200 text-center">{totals.occupiedBeds}</td>
                    <td className="p-2 text-center text-blue-800">{overallBedOccupancyRate}%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}