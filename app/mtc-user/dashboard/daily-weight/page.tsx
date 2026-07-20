// // "use client";

// // import { useState, useEffect, useMemo, useRef } from "react";
// // import { useRouter } from "next/navigation";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { 
// //   CalendarIcon, 
// //   Search, 
// //   Pencil, 
// //   ArrowLeft,
// //   Activity,
// //   User,
// //   Hash,
// //   ChevronLeft,
// //   ChevronRight,
// //   ClipboardList,
// //   Loader2
// // } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";
// // import { cn } from "@/lib/utils";

// // interface Child {
// //   id: string;
// //   recordNo: string;
// //   samNumber: string;
// //   childName: string;
// //   parentName: string;
// //   dateOfBirth: string;
// //   admissionWeight: string;
// //   admissionHeight: string;
// //   createdAt: string;
// // }

// // interface WeightEntry {
// //   childId: string;
// //   day0: string;
// //   day1: string;
// //   day2: string;
// //   day3: string;
// //   day4: string;
// //   day5: string;
// //   day6: string;
// // }

// // export default function DailyWeightEntryPage() {
// //   const router = useRouter();
  
// //   // Ref for auto-scrolling
// //   const listTopRef = useRef<HTMLDivElement>(null);

// //   // State Management
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [fromDate, setFromDate] = useState("");
// //   const [toDate, setToDate] = useState("");
// //   const [recordNo, setRecordNo] = useState("");
// //   const [samNumber, setSamNumber] = useState("");
// //   const [childName, setChildName] = useState("");
// //   const [children, setChildren] = useState<Child[]>([]);
// //   const [weightEntries, setWeightEntries] = useState<{ [key: string]: WeightEntry }>({});
// //   const [entriesPerPage, setEntriesPerPage] = useState(10);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

// //   // Fetch Data from API
// //   useEffect(() => {
// //     const fetchPatientsAndWeights = async () => {
// //       setIsLoading(true);
// //       try {
// //         // 1. Fetch patients from the database
// //         const response = await fetch('/api/child-registration');
// //         if (!response.ok) throw new Error('Failed to fetch patients');
// //         const dbChildren = await response.json();

// //         // Map database snake_case columns to our frontend camelCase interface
// //         const mappedChildren: Child[] = dbChildren.map((item: any) => ({
// //           id: item.registration_id?.toString() || item.id,
// //           recordNo: item.registration_id?.toString() || "N/A", 
// //           samNumber: item.sam_no || item.samNumber,
// //           childName: item.child_full_name || item.childName,
// //           parentName: item.guardian_name || item.parentName,
// //           dateOfBirth: item.dob || item.dateOfBirth,
// //           admissionWeight: item.admission_weight_kg?.toString() || item.admissionWeight,
// //           admissionHeight: item.length_height_cm?.toString() || item.admissionHeight,
// //           createdAt: item.admission_date || item.createdAt || new Date().toISOString(),
// //         }));

// //         setChildren(mappedChildren);

// //         // 2. Fetch daily weights for ALL patients
// //         // Note: For a production app with thousands of patients, you would want 
// //         // a specific endpoint like `/api/daily-weights/all` to fetch this in bulk,
// //         // rather than fetching them one by one. For now, we will fetch the bulk data
// //         // if your GET route supports omitting the childId parameter, OR we will map
// //         // default states and let the edit page handle individual fetches.
        
// //         try {
// //           // Attempting to fetch all weights (Assuming your backend can return all if childId is omitted)
// //           const weightsRes = await fetch('/api/daily-weights'); 
          
// //           if (weightsRes.ok) {
// //             const dbWeightsResult = await weightsRes.json();
// //             const weightsArray = dbWeightsResult.data || [];
            
// //             const weightsMap: { [key: string]: WeightEntry } = {};
            
// //             // Map the JSONB weights_data back to the quick-view timeline
// //             weightsArray.forEach((w: any) => {
// //               const childId = w.child_id?.toString();
// //               const wData = w.weights_data || {};
              
// //               weightsMap[childId] = {
// //                 childId: childId,
// //                 day0: wData.day0 || "",
// //                 day1: wData.day1 || "",
// //                 day2: wData.day2 || "",
// //                 day3: wData.day3 || "",
// //                 day4: wData.day4 || "",
// //                 day5: wData.day5 || "",
// //                 day6: wData.day6 || "",
// //               };
// //             });
// //             setWeightEntries(weightsMap);
// //           } else {
// //              throw new Error("Bulk weights API not available");
// //           }
// //         } catch (weightError) {
// //           // Fallback: If bulk fetch fails, initialize with admission weight for Day 0
// //           const initialWeights: { [key: string]: WeightEntry } = {};
// //           mappedChildren.forEach((child) => {
// //             initialWeights[child.id] = {
// //               childId: child.id,
// //               day0: child.admissionWeight || "",
// //               day1: "", day2: "", day3: "", day4: "", day5: "", day6: ""
// //             };
// //           });
// //           setWeightEntries(initialWeights);
// //         }

// //       } catch (error) {
// //         console.error("Error loading data:", error);
// //         toast.error("Failed to load patient data from the server.");
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchPatientsAndWeights();
// //   }, []);

// //   // PERFORMANCE OPTIMIZATION: Use useMemo instead of a useEffect double-render
// //   const filteredChildren = useMemo(() => {
// //     return children.filter(child => {
// //       const matchesRecord = child.recordNo.toLowerCase().includes(recordNo.toLowerCase());
// //       const matchesSam = (child.samNumber || "").toLowerCase().includes(samNumber.toLowerCase());
// //       const matchesName = (child.childName || "").toLowerCase().includes(childName.toLowerCase());
      
// //       const childTime = new Date(child.createdAt).getTime();
      
// //       let matchesFrom = true;
// //       if (fromDate) matchesFrom = childTime >= new Date(fromDate).getTime();

// //       let matchesTo = true;
// //       if (toDate) {
// //         const endOfDay = new Date(toDate).setHours(23, 59, 59, 999);
// //         matchesTo = childTime <= endOfDay;
// //       }

// //       return matchesRecord && matchesSam && matchesName && matchesFrom && matchesTo;
// //     });
// //   }, [children, recordNo, samNumber, childName, fromDate, toDate]);

// //   // Reset to page 1 when filters change
// //   useEffect(() => {
// //     setCurrentPage(1);
// //   }, [recordNo, samNumber, childName, fromDate, toDate, entriesPerPage]);

// //   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
// //   const handleEdit = (childId: string) => router.push(`/mtc-user/dashboard/daily-weight/edit-weight/${childId}`);

// //   // UX OPTIMIZATION: Auto-scroll to top when page changes
// //   const handlePageChange = (newPage: number) => {
// //     setCurrentPage(newPage);
// //     listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
// //   };

// //   const totalPages = Math.ceil(filteredChildren.length / entriesPerPage);
  
// //   // Calculate current entries directly
// //   const currentEntries = useMemo(() => {
// //     const startIndex = (currentPage - 1) * entriesPerPage;
// //     return filteredChildren.slice(startIndex, startIndex + entriesPerPage);
// //   }, [filteredChildren, currentPage, entriesPerPage]);

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-blue-600">
// //         <Loader2 className="h-10 w-10 animate-spin mb-4" />
// //         <h2 className="text-xl font-bold text-slate-700">Loading Patient Records...</h2>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">
// //       <Toaster position="top-center" />
      
// //       {/* Mobile Header & Filter Toggle */}
// //       <div className="md:hidden bg-white p-4 border-b flex justify-between items-center sticky top-0 z-20 shadow-sm">
// //         <div className="flex items-center gap-2">
// //           <Activity className="h-6 w-6 text-blue-600" />
// //           <h1 className="font-bold text-lg">Daily Weights</h1>
// //         </div>
// //         <div className="flex gap-2">
// //           <Button variant="outline" size="sm" onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
// //             Filters
// //           </Button>
// //           <Button size="sm" onClick={handleBackToHome} className="bg-blue-600 hover:bg-blue-700 text-white">Home</Button>
// //         </div>
// //       </div>

// //       {/* Sidebar Filters */}
// //       <aside className={cn(
// //         "w-full md:w-80 bg-white border-r border-slate-200 shrink-0 md:sticky top-0 md:h-screen overflow-y-auto transition-all shadow-sm",
// //         isMobileFilterOpen ? "block" : "hidden md:block"
// //       )}>
// //         <div className="p-6 space-y-8">
// //           <div className="hidden md:flex items-center gap-3 mb-8">
// //             <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-100">
// //               <Activity className="h-6 w-6 text-blue-600" />
// //             </div>
// //             <div>
// //               <h1 className="font-bold text-xl leading-tight text-slate-800">Daily Weight</h1>
// //               <p className="text-xs text-slate-500 font-medium mt-0.5">Tracking & Monitoring</p>
// //             </div>
// //           </div>

// //           <div className="space-y-6">
// //             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
// //               <Search className="h-3.5 w-3.5 text-blue-500" /> Search Patients
// //             </h3>

// //             <div className="space-y-4">
// //               <div className="space-y-1.5">
// //                 <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
// //                   <User className="h-4 w-4 text-slate-400" /> Child Name
// //                 </label>
// //                 <Input 
// //                   placeholder="e.g. Rahul Kumar" 
// //                   value={childName} 
// //                   onChange={(e) => setChildName(e.target.value)}
// //                   className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors"
// //                 />
// //               </div>

// //               <div className="grid grid-cols-2 gap-4">
// //                 <div className="space-y-1.5">
// //                   <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
// //                     <Hash className="h-4 w-4 text-slate-400" /> SAM ID
// //                   </label>
// //                   <Input 
// //                     placeholder="SAM-001" 
// //                     value={samNumber} 
// //                     onChange={(e) => setSamNumber(e.target.value)}
// //                     className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors"
// //                   />
// //                 </div>
// //                 <div className="space-y-1.5">
// //                   <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
// //                     <ClipboardList className="h-4 w-4 text-slate-400" /> Rec No
// //                   </label>
// //                   <Input 
// //                     placeholder="REC-001" 
// //                     value={recordNo} 
// //                     onChange={(e) => setRecordNo(e.target.value)}
// //                     className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             <hr className="border-slate-100" />

// //             <div className="space-y-4">
// //               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
// //                 <CalendarIcon className="h-3.5 w-3.5 text-blue-500" /> Date Admitted
// //               </h3>
              
// //               <div className="space-y-1.5">
// //                 <label className="text-sm font-semibold text-slate-700">From</label>
// //                 <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 transition-colors" />
// //               </div>
// //               <div className="space-y-1.5">
// //                 <label className="text-sm font-semibold text-slate-700">To</label>
// //                 <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 transition-colors" />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="pt-6 hidden md:block">
// //             <Button onClick={handleBackToHome} variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors">
// //               <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
// //             </Button>
// //           </div>
// //         </div>
// //       </aside>

// //       {/* Main Content Area */}
// //       <main className="flex-1 p-4 md:p-8 overflow-y-auto">
// //         <div className="max-w-5xl mx-auto space-y-6">
          
// //           {/* Scroll Anchor to jump back up when changing pages */}
// //           <div ref={listTopRef} className="scroll-mt-6" />

// //           {/* Header Bar */}
// //           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-4 border-b border-slate-200">
// //             <div>
// //               <h2 className="text-2xl font-bold text-slate-800">Currently Admitted</h2>
// //               <p className="text-blue-600 font-medium text-sm mt-1">{filteredChildren.length} patients matching criteria</p>
// //             </div>
// //             <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
// //               <span>Show</span>
// //               <select 
// //                 value={entriesPerPage} 
// //                 onChange={(e) => setEntriesPerPage(Number(e.target.value))}
// //                 className="bg-white border border-slate-200 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm transition-shadow"
// //               >
// //                 <option value={10}>10</option>
// //                 <option value={20}>20</option>
// //                 <option value={50}>50</option>
// //               </select>
// //             </div>
// //           </div>

// //           {/* List of Patients */}
// //           <div className="space-y-3">
// //             {currentEntries.length > 0 ? (
// //               currentEntries.map((child) => (
// //                 <div 
// //                   key={child.id} 
// //                   className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-6 hover:border-blue-300 hover:shadow-md hover:shadow-blue-900/5 transition-all duration-200"
// //                 >
// //                   {/* Patient Info */}
// //                   <div className="flex items-center gap-4 min-w-60">
// //                     <div className="h-11 w-11 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg border border-blue-100 shrink-0 shadow-sm">
// //                       {child.childName ? child.childName.charAt(0).toUpperCase() : "U"}
// //                     </div>
// //                     <div>
// //                       <h3 className="font-bold text-slate-900 text-base">{child.childName || "Unknown"}</h3>
// //                       <div className="flex items-center gap-2 mt-0.5 text-xs font-medium text-slate-500">
// //                         <span className="bg-slate-50 px-1.5 py-0.5 rounded text-slate-600 border border-slate-100">ID: {child.samNumber || "N/A"}</span>
// //                         <span className="text-slate-300">•</span>
// //                         <span className="text-slate-600">Rec: {child.recordNo}</span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Weight Timeline */}
// //                   <div className="flex-1 overflow-x-auto pb-2 xl:pb-0">
// //                     <div className="flex items-center justify-start xl:justify-center gap-2 min-w-max">
// //                       {["day0", "day1", "day2", "day3", "day4", "day5", "day6"].map((day, idx) => {
// //                         const val = weightEntries[child.id]?.[day as keyof WeightEntry];
// //                         const isDay0 = idx === 0;
// //                         const isFilled = !!val;

// //                         return (
// //                           <div key={day} className="flex flex-col items-center gap-1.5 w-14">
// //                             <span className={cn(
// //                               "text-[10px] uppercase font-bold tracking-wider",
// //                               isDay0 ? "text-blue-600" : "text-slate-400"
// //                             )}>
// //                               {idx === 0 ? "Adm" : `D${idx}`}
// //                             </span>
// //                             <div className={cn(
// //                               "h-9 w-12 rounded flex items-center justify-center text-sm font-semibold transition-colors duration-200",
// //                               isDay0 && isFilled ? "bg-blue-600 text-white shadow-sm" : 
// //                               isFilled ? "bg-blue-50 border-2 border-blue-600 text-blue-700" : 
// //                               "bg-slate-50 border border-dashed border-slate-300 text-slate-300"
// //                             )}>
// //                               {val || "-"}
// //                             </div>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   </div>

// //                   {/* Action */}
// //                   <div className="shrink-0 flex justify-end">
// //                     <Button
// //                       onClick={() => handleEdit(child.id)}
// //                       className="w-full xl:w-auto bg-slate-900 hover:bg-blue-600 text-white transition-colors duration-200 shadow-sm"
// //                     >
// //                       <Pencil className="h-4 w-4 mr-2" /> Update
// //                     </Button>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <div className="bg-white border border-slate-200 border-dashed rounded-xl p-12 text-center flex flex-col items-center justify-center text-slate-500 shadow-sm">
// //                 <div className="bg-blue-50 p-4 rounded-full mb-4">
// //                   <Search className="h-8 w-8 text-blue-400" />
// //                 </div>
// //                 <h3 className="text-lg font-bold text-slate-800">No patients found</h3>
// //                 <p className="text-sm mt-1 max-w-sm text-slate-500">No children match the current filter criteria. Try adjusting the search terms or date range in the sidebar.</p>
// //               </div>
// //             )}
// //           </div>

// //           {/* Pagination */}
// //           {filteredChildren.length > 0 && (
// //             <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
// //               <p className="text-sm text-slate-500 font-medium">
// //                 Showing <span className="text-slate-900 font-bold">{Math.min(filteredChildren.length, (currentPage - 1) * entriesPerPage + 1)}</span> to <span className="text-slate-900 font-bold">{Math.min(filteredChildren.length, currentPage * entriesPerPage)}</span> of <span className="text-blue-600 font-bold">{filteredChildren.length}</span>
// //               </p>
              
// //               <div className="flex gap-1.5 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   className="h-8 w-8 text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
// //                   onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
// //                   disabled={currentPage === 1}
// //                 >
// //                   <ChevronLeft className="h-4 w-4" />
// //                 </Button>
                
// //                 {[...Array(totalPages)].map((_, i) => {
// //                   const pageNum = i + 1;
// //                   if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
// //                     return (
// //                       <Button
// //                         key={i}
// //                         variant={currentPage === pageNum ? "default" : "ghost"}
// //                         size="sm"
// //                         className={cn(
// //                           "h-8 w-8 text-sm font-bold transition-all",
// //                           currentPage === pageNum 
// //                             ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm" 
// //                             : "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
// //                         )}
// //                         onClick={() => handlePageChange(pageNum)}
// //                       >
// //                         {pageNum}
// //                       </Button>
// //                     );
// //                   }
// //                   if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
// //                     return <span key={i} className="px-2 text-slate-400 self-center">...</span>;
// //                   }
// //                   return null;
// //                 })}

// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   className="h-8 w-8 text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
// //                   onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
// //                   disabled={currentPage === totalPages}
// //                 >
// //                   <ChevronRight className="h-4 w-4" />
// //                 </Button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect, useMemo, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { 
//   CalendarIcon, 
//   Search, 
//   Pencil, 
//   ArrowLeft,
//   Activity,
//   User,
//   Hash,
//   ChevronLeft,
//   ChevronRight,
//   ClipboardList,
//   Loader2
// } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
// import { cn } from "@/lib/utils";

// interface Child {
//   id: string;
//   recordNo: string;
//   samNumber: string;
//   childName: string;
//   parentName: string;
//   dateOfBirth: string;
//   admissionWeight: string;
//   admissionHeight: string;
//   createdAt: string;
// }

// interface WeightEntry {
//   childId: string;
//   day0: string;
//   day1: string;
//   day2: string;
//   day3: string;
//   day4: string;
//   day5: string;
//   day6: string;
// }

// export default function DailyWeightEntryPage() {
//   const router = useRouter();
  
//   // Ref for auto-scrolling
//   const listTopRef = useRef<HTMLDivElement>(null);

//   // State Management
//   const [isLoading, setIsLoading] = useState(true);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [recordNo, setRecordNo] = useState("");
//   const [samNumber, setSamNumber] = useState("");
//   const [childName, setChildName] = useState("");
//   const [children, setChildren] = useState<Child[]>([]);
//   const [weightEntries, setWeightEntries] = useState<{ [key: string]: WeightEntry }>({});
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

//   // Fetch Data from API
//   useEffect(() => {
//     const fetchPatientsAndWeights = async () => {
//       setIsLoading(true);
//       try {
//         // ✅ 1. Get the current user's MTC ID from session storage
//         const sessionData = sessionStorage.getItem("mtc_user");
//         let queryParams = "";
        
//         if (sessionData) {
//           try {
//             const user = JSON.parse(sessionData);
//             if (user.mtcId) {
//               queryParams = `?mtcId=${user.mtcId}`;
//             }
//           } catch (err) {
//             console.error("Session parse error");
//           }
//         }

//         // ✅ 2. Fetch patients from the database filtered by MTC ID
//         const response = await fetch(`/api/child-registration${queryParams}`);
//         if (!response.ok) throw new Error('Failed to fetch patients');
//         const dbChildren = await response.json();

//         // Map database snake_case columns to our frontend camelCase interface
//         const mappedChildren: Child[] = dbChildren.map((item: any) => ({
//           id: item.registration_id?.toString() || item.id,
//           recordNo: item.registration_id?.toString() || "N/A", 
//           samNumber: item.sam_no || item.samNumber,
//           childName: item.child_full_name || item.childName,
//           parentName: item.guardian_name || item.parentName,
//           dateOfBirth: item.dob || item.dateOfBirth,
//           admissionWeight: item.admission_weight_kg?.toString() || item.admissionWeight,
//           admissionHeight: item.length_height_cm?.toString() || item.admissionHeight,
//           createdAt: item.admission_date || item.createdAt || new Date().toISOString(),
//         }));

//         setChildren(mappedChildren);

//         // 3. Fetch daily weights for ALL patients
//         try {
//           const weightsRes = await fetch('/api/daily-weights'); 
          
//           if (weightsRes.ok) {
//             const dbWeightsResult = await weightsRes.json();
//             const weightsArray = dbWeightsResult.data || [];
            
//             const weightsMap: { [key: string]: WeightEntry } = {};
            
//             // Map the JSONB weights_data back to the quick-view timeline
//             weightsArray.forEach((w: any) => {
//               const childId = w.child_id?.toString();
//               const wData = w.weights_data || {};
              
//               weightsMap[childId] = {
//                 childId: childId,
//                 day0: wData.day0 || "",
//                 day1: wData.day1 || "",
//                 day2: wData.day2 || "",
//                 day3: wData.day3 || "",
//                 day4: wData.day4 || "",
//                 day5: wData.day5 || "",
//                 day6: wData.day6 || "",
//               };
//             });
//             setWeightEntries(weightsMap);
//           } else {
//              throw new Error("Bulk weights API not available");
//           }
//         } catch (weightError) {
//           // Fallback: If bulk fetch fails, initialize with admission weight for Day 0
//           const initialWeights: { [key: string]: WeightEntry } = {};
//           mappedChildren.forEach((child) => {
//             initialWeights[child.id] = {
//               childId: child.id,
//               day0: child.admissionWeight || "",
//               day1: "", day2: "", day3: "", day4: "", day5: "", day6: ""
//             };
//           });
//           setWeightEntries(initialWeights);
//         }

//       } catch (error) {
//         console.error("Error loading data:", error);
//         toast.error("Failed to load patient data from the server.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPatientsAndWeights();
//   }, []);

//   // PERFORMANCE OPTIMIZATION: Use useMemo instead of a useEffect double-render
//   const filteredChildren = useMemo(() => {
//     return children.filter(child => {
//       const matchesRecord = child.recordNo.toLowerCase().includes(recordNo.toLowerCase());
//       const matchesSam = (child.samNumber || "").toLowerCase().includes(samNumber.toLowerCase());
//       const matchesName = (child.childName || "").toLowerCase().includes(childName.toLowerCase());
      
//       const childTime = new Date(child.createdAt).getTime();
      
//       let matchesFrom = true;
//       if (fromDate) matchesFrom = childTime >= new Date(fromDate).getTime();

//       let matchesTo = true;
//       if (toDate) {
//         const endOfDay = new Date(toDate).setHours(23, 59, 59, 999);
//         matchesTo = childTime <= endOfDay;
//       }

//       return matchesRecord && matchesSam && matchesName && matchesFrom && matchesTo;
//     });
//   }, [children, recordNo, samNumber, childName, fromDate, toDate]);

//   // Reset to page 1 when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [recordNo, samNumber, childName, fromDate, toDate, entriesPerPage]);

//   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
//   const handleEdit = (childId: string) => router.push(`/mtc-user/dashboard/daily-weight/edit-weight/${childId}`);

//   // UX OPTIMIZATION: Auto-scroll to top when page changes
//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//     listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   const totalPages = Math.ceil(filteredChildren.length / entriesPerPage);
  
//   // Calculate current entries directly
//   const currentEntries = useMemo(() => {
//     const startIndex = (currentPage - 1) * entriesPerPage;
//     return filteredChildren.slice(startIndex, startIndex + entriesPerPage);
//   }, [filteredChildren, currentPage, entriesPerPage]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-blue-600">
//         <Loader2 className="h-10 w-10 animate-spin mb-4" />
//         <h2 className="text-xl font-bold text-slate-700">Loading Patient Records...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">
//       <Toaster position="top-center" />
      
//       {/* Mobile Header & Filter Toggle */}
//       <div className="md:hidden bg-white p-4 border-b flex justify-between items-center sticky top-0 z-20 shadow-sm">
//         <div className="flex items-center gap-2">
//           <Activity className="h-6 w-6 text-blue-600" />
//           <h1 className="font-bold text-lg">Daily Weights</h1>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline" size="sm" onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
//             Filters
//           </Button>
//           <Button size="sm" onClick={handleBackToHome} className="bg-blue-600 hover:bg-blue-700 text-white">Home</Button>
//         </div>
//       </div>

//       {/* Sidebar Filters */}
//       <aside className={cn(
//         "w-full md:w-80 bg-white border-r border-slate-200 shrink-0 md:sticky top-0 md:h-screen overflow-y-auto transition-all shadow-sm",
//         isMobileFilterOpen ? "block" : "hidden md:block"
//       )}>
//         <div className="p-6 space-y-8">
//           <div className="hidden md:flex items-center gap-3 mb-8">
//             <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-100">
//               <Activity className="h-6 w-6 text-blue-600" />
//             </div>
//             <div>
//               <h1 className="font-bold text-xl leading-tight text-slate-800">Daily Weight</h1>
//               <p className="text-xs text-slate-500 font-medium mt-0.5">Tracking & Monitoring</p>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
//               <Search className="h-3.5 w-3.5 text-blue-500" /> Search Patients
//             </h3>

//             <div className="space-y-4">
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//                   <User className="h-4 w-4 text-slate-400" /> Child Name
//                 </label>
//                 <Input 
//                   placeholder="e.g. Rahul Kumar" 
//                   value={childName} 
//                   onChange={(e) => setChildName(e.target.value)}
//                   className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-1.5">
//                   <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//                     <Hash className="h-4 w-4 text-slate-400" /> SAM ID
//                   </label>
//                   <Input 
//                     placeholder="SAM-001" 
//                     value={samNumber} 
//                     onChange={(e) => setSamNumber(e.target.value)}
//                     className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors"
//                   />
//                 </div>
//                 <div className="space-y-1.5">
//                   <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//                     <ClipboardList className="h-4 w-4 text-slate-400" /> Rec No
//                   </label>
//                   <Input 
//                     placeholder="REC-001" 
//                     value={recordNo} 
//                     onChange={(e) => setRecordNo(e.target.value)}
//                     className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors"
//                   />
//                 </div>
//               </div>
//             </div>

//             <hr className="border-slate-100" />

//             <div className="space-y-4">
//               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
//                 <CalendarIcon className="h-3.5 w-3.5 text-blue-500" /> Date Admitted
//               </h3>
              
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">From</label>
//                 <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 transition-colors" />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-sm font-semibold text-slate-700">To</label>
//                 <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 transition-colors" />
//               </div>
//             </div>
//           </div>

//           <div className="pt-6 hidden md:block">
//             <Button onClick={handleBackToHome} variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors">
//               <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
//             </Button>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content Area */}
//       <main className="flex-1 p-4 md:p-8 overflow-y-auto">
//         <div className="max-w-5xl mx-auto space-y-6">
          
//           {/* Scroll Anchor to jump back up when changing pages */}
//           <div ref={listTopRef} className="scroll-mt-6" />

//           {/* Header Bar */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-4 border-b border-slate-200">
//             <div>
//               <h2 className="text-2xl font-bold text-slate-800">Currently Admitted</h2>
//               <p className="text-blue-600 font-medium text-sm mt-1">{filteredChildren.length} patients matching criteria</p>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
//               <span>Show</span>
//               <select 
//                 value={entriesPerPage} 
//                 onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//                 className="bg-white border border-slate-200 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm transition-shadow"
//               >
//                 <option value={10}>10</option>
//                 <option value={20}>20</option>
//                 <option value={50}>50</option>
//               </select>
//             </div>
//           </div>

//           {/* List of Patients */}
//           <div className="space-y-3">
//             {currentEntries.length > 0 ? (
//               currentEntries.map((child) => (
//                 <div 
//                   key={child.id} 
//                   className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-6 hover:border-blue-300 hover:shadow-md hover:shadow-blue-900/5 transition-all duration-200"
//                 >
//                   {/* Patient Info */}
//                   <div className="flex items-center gap-4 min-w-60">
//                     <div className="h-11 w-11 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg border border-blue-100 shrink-0 shadow-sm">
//                       {child.childName ? child.childName.charAt(0).toUpperCase() : "U"}
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-slate-900 text-base">{child.childName || "Unknown"}</h3>
//                       <div className="flex items-center gap-2 mt-0.5 text-xs font-medium text-slate-500">
//                         <span className="bg-slate-50 px-1.5 py-0.5 rounded text-slate-600 border border-slate-100">ID: {child.samNumber || "N/A"}</span>
//                         <span className="text-slate-300">•</span>
//                         <span className="text-slate-600">Rec: {child.recordNo}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Weight Timeline */}
//                   <div className="flex-1 overflow-x-auto pb-2 xl:pb-0">
//                     <div className="flex items-center justify-start xl:justify-center gap-2 min-w-max">
//                       {["day0", "day1", "day2", "day3", "day4", "day5", "day6"].map((day, idx) => {
//                         const val = weightEntries[child.id]?.[day as keyof WeightEntry];
//                         const isDay0 = idx === 0;
//                         const isFilled = !!val;

//                         return (
//                           <div key={day} className="flex flex-col items-center gap-1.5 w-14">
//                             <span className={cn(
//                               "text-[10px] uppercase font-bold tracking-wider",
//                               isDay0 ? "text-blue-600" : "text-slate-400"
//                             )}>
//                               {idx === 0 ? "Adm" : `D${idx}`}
//                             </span>
//                             <div className={cn(
//                               "h-9 w-12 rounded flex items-center justify-center text-sm font-semibold transition-colors duration-200",
//                               isDay0 && isFilled ? "bg-blue-600 text-white shadow-sm" : 
//                               isFilled ? "bg-blue-50 border-2 border-blue-600 text-blue-700" : 
//                               "bg-slate-50 border border-dashed border-slate-300 text-slate-300"
//                             )}>
//                               {val || "-"}
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* Action */}
//                   <div className="shrink-0 flex justify-end">
//                     <Button
//                       onClick={() => handleEdit(child.id)}
//                       className="w-full xl:w-auto bg-slate-900 hover:bg-blue-600 text-white transition-colors duration-200 shadow-sm"
//                     >
//                       <Pencil className="h-4 w-4 mr-2" /> Update
//                     </Button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="bg-white border border-slate-200 border-dashed rounded-xl p-12 text-center flex flex-col items-center justify-center text-slate-500 shadow-sm">
//                 <div className="bg-blue-50 p-4 rounded-full mb-4">
//                   <Search className="h-8 w-8 text-blue-400" />
//                 </div>
//                 <h3 className="text-lg font-bold text-slate-800">No patients found</h3>
//                 <p className="text-sm mt-1 max-w-sm text-slate-500">No children match the current filter criteria. Try adjusting the search terms or date range in the sidebar.</p>
//               </div>
//             )}
//           </div>

//           {/* Pagination */}
//           {filteredChildren.length > 0 && (
//             <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
//               <p className="text-sm text-slate-500 font-medium">
//                 Showing <span className="text-slate-900 font-bold">{Math.min(filteredChildren.length, (currentPage - 1) * entriesPerPage + 1)}</span> to <span className="text-slate-900 font-bold">{Math.min(filteredChildren.length, currentPage * entriesPerPage)}</span> of <span className="text-blue-600 font-bold">{filteredChildren.length}</span>
//               </p>
              
//               <div className="flex gap-1.5 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-8 w-8 text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
//                   onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </Button>
                
//                 {[...Array(totalPages)].map((_, i) => {
//                   const pageNum = i + 1;
//                   if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
//                     return (
//                       <Button
//                         key={i}
//                         variant={currentPage === pageNum ? "default" : "ghost"}
//                         size="sm"
//                         className={cn(
//                           "h-8 w-8 text-sm font-bold transition-all",
//                           currentPage === pageNum 
//                             ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm" 
//                             : "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
//                         )}
//                         onClick={() => handlePageChange(pageNum)}
//                       >
//                         {pageNum}
//                       </Button>
//                     );
//                   }
//                   if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
//                     return <span key={i} className="px-2 text-slate-400 self-center">...</span>;
//                   }
//                   return null;
//                 })}

//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-8 w-8 text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
//                   onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  CalendarIcon, 
  Search, 
  Pencil, 
  ArrowLeft,
  Activity,
  User,
  Hash,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Loader2
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface Child {
  id: string;
  recordNo: string;
  samNumber: string;
  childName: string;
  parentName: string;
  dateOfBirth: string;
  admissionWeight: string;
  admissionHeight: string;
  createdAt: string;
}

interface WeightEntry {
  childId: string;
  day0: string;
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  day5: string;
  day6: string;
}

interface RawChildItem {
  registration_id?: string | number;
  id: string;
  sam_no?: string;
  samNumber?: string;
  child_full_name?: string;
  childName?: string;
  guardian_name?: string;
  parentName?: string;
  dob?: string;
  dateOfBirth?: string;
  admission_weight_kg?: string | number;
  admissionWeight?: string;
  length_height_cm?: string | number;
  admissionHeight?: string;
  admission_date?: string;
  createdAt?: string;
}

interface RawWeightItem {
  child_id?: string | number;
  weights_data?: {
    day0?: string;
    day1?: string;
    day2?: string;
    day3?: string;
    day4?: string;
    day5?: string;
    day6?: string;
  };
}

export default function DailyWeightEntryPage() {
  const router = useRouter();
  
  // Ref for auto-scrolling
  const listTopRef = useRef<HTMLDivElement>(null);

  // State Management
  const [isLoading, setIsLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [recordNo, setRecordNo] = useState("");
  const [samNumber, setSamNumber] = useState("");
  const [childName, setChildName] = useState("");
  const [children, setChildren] = useState<Child[]>([]);
  const [weightEntries, setWeightEntries] = useState<{ [key: string]: WeightEntry }>({});
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Fetch Data from API
  useEffect(() => {
    const fetchPatientsAndWeights = async () => {
      setIsLoading(true);
      try {
        // ✅ 1. Get the current user's MTC ID from session storage
        const sessionData = sessionStorage.getItem("mtc_user");
        let queryParams = "";
        
        if (sessionData) {
          try {
            const user = JSON.parse(sessionData) as { mtcId?: string | number };
            if (user.mtcId) {
              queryParams = `?mtcId=${user.mtcId}`;
            }
          } catch {
            console.error("Session parse error");
          }
        }

        // ✅ 2. Fetch patients from the database filtered by MTC ID
        const response = await fetch(`/api/child-registration${queryParams}`);
        if (!response.ok) throw new Error('Failed to fetch patients');
        const dbChildren = await response.json() as RawChildItem[];

        // Map database snake_case columns to our frontend camelCase interface
        const mappedChildren: Child[] = dbChildren.map((item) => ({
          id: item.registration_id?.toString() || item.id,
          recordNo: item.registration_id?.toString() || "N/A", 
          samNumber: item.sam_no || item.samNumber || "",
          childName: item.child_full_name || item.childName || "",
          parentName: item.guardian_name || item.parentName || "",
          dateOfBirth: item.dob || item.dateOfBirth || "",
          admissionWeight: item.admission_weight_kg?.toString() || item.admissionWeight || "",
          admissionHeight: item.length_height_cm?.toString() || item.admissionHeight || "",
          createdAt: item.admission_date || item.createdAt || new Date().toISOString(),
        }));

        setChildren(mappedChildren);

        // 3. Fetch daily weights for ALL patients
        try {
          const weightsRes = await fetch('/api/daily-weights'); 
          
          if (weightsRes.ok) {
            const dbWeightsResult = await weightsRes.json() as { data?: RawWeightItem[] };
            const weightsArray = dbWeightsResult.data || [];
            
            const weightsMap: { [key: string]: WeightEntry } = {};
            
            // Map the JSONB weights_data back to the quick-view timeline
            weightsArray.forEach((w) => {
              const childId = w.child_id?.toString();
              if (!childId) return;
              const wData = w.weights_data || {};
              
              weightsMap[childId] = {
                childId: childId,
                day0: wData.day0 || "",
                day1: wData.day1 || "",
                day2: wData.day2 || "",
                day3: wData.day3 || "",
                day4: wData.day4 || "",
                day5: wData.day5 || "",
                day6: wData.day6 || "",
              };
            });
            setWeightEntries(weightsMap);
          } else {
              throw new Error("Bulk weights API not available");
          }
        } catch {
          // Fallback: If bulk fetch fails, initialize with admission weight for Day 0
          const initialWeights: { [key: string]: WeightEntry } = {};
          mappedChildren.forEach((child) => {
            initialWeights[child.id] = {
              childId: child.id,
              day0: child.admissionWeight || "",
              day1: "", day2: "", day3: "", day4: "", day5: "", day6: ""
            };
          });
          setWeightEntries(initialWeights);
        }

      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load patient data from the server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientsAndWeights();
  }, []);

  // PERFORMANCE OPTIMIZATION: Use useMemo instead of a useEffect double-render
  const filteredChildren = useMemo(() => {
    return children.filter(child => {
      const matchesRecord = child.recordNo.toLowerCase().includes(recordNo.toLowerCase());
      const matchesSam = (child.samNumber || "").toLowerCase().includes(samNumber.toLowerCase());
      const matchesName = (child.childName || "").toLowerCase().includes(childName.toLowerCase());
      
      const childTime = new Date(child.createdAt).getTime();
      
      let matchesFrom = true;
      if (fromDate) matchesFrom = childTime >= new Date(fromDate).getTime();

      let matchesTo = true;
      if (toDate) {
        const endOfDay = new Date(toDate).setHours(23, 59, 59, 999);
        matchesTo = childTime <= endOfDay;
      }

      return matchesRecord && matchesSam && matchesName && matchesFrom && matchesTo;
    });
  }, [children, recordNo, samNumber, childName, fromDate, toDate]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [recordNo, samNumber, childName, fromDate, toDate, entriesPerPage]);

  const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
  const handleEdit = (childId: string) => router.push(`/mtc-user/dashboard/daily-weight/edit-weight/${childId}`);

  // UX OPTIMIZATION: Auto-scroll to top when page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const totalPages = Math.ceil(filteredChildren.length / entriesPerPage);
  
  // Calculate current entries directly
  const currentEntries = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    return filteredChildren.slice(startIndex, startIndex + entriesPerPage);
  }, [filteredChildren, currentPage, entriesPerPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-blue-600">
        <Loader2 className="h-10 w-10 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-slate-700">Loading Patient Records...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">
      <Toaster position="top-center" />
      
      {/* Mobile Header & Filter Toggle */}
      <div className="md:hidden bg-white p-4 border-b flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-blue-600" />
          <h1 className="font-bold text-lg">Daily Weights</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
            Filters
          </Button>
          <Button size="sm" onClick={handleBackToHome} className="bg-blue-600 hover:bg-blue-700 text-white">Home</Button>
        </div>
      </div>

      {/* Sidebar Filters */}
      <aside className={cn(
        "w-full md:w-80 bg-white border-r border-slate-200 shrink-0 md:sticky top-0 md:h-screen overflow-y-auto transition-all shadow-sm",
        isMobileFilterOpen ? "block" : "hidden md:block"
      )}>
        <div className="p-6 space-y-8">
          <div className="hidden md:flex items-center gap-3 mb-8">
            <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-100">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="font-bold text-xl leading-tight text-slate-800">Daily Weight</h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Tracking & Monitoring</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-blue-500" /> Search Patients
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" /> Child Name
                </label>
                <Input 
                  placeholder="e.g. Rahul Kumar" 
                  value={childName} 
                  onChange={(e) => setChildName(e.target.value)}
                  className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Hash className="h-4 w-4 text-slate-400" /> SAM ID
                  </label>
                  <Input 
                    placeholder="SAM-001" 
                    value={samNumber} 
                    onChange={(e) => setSamNumber(e.target.value)}
                    className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-slate-400" /> Rec No
                  </label>
                  <Input 
                    placeholder="REC-001" 
                    value={recordNo} 
                    onChange={(e) => setRecordNo(e.target.value)}
                    className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <CalendarIcon className="h-3.5 w-3.5 text-blue-500" /> Date Admitted
              </h3>
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">From</label>
                <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">To</label>
                <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 transition-colors" />
              </div>
            </div>
          </div>

          <div className="pt-6 hidden md:block">
            <Button onClick={handleBackToHome} variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Scroll Anchor to jump back up when changing pages */}
          <div ref={listTopRef} className="scroll-mt-6" />

          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Currently Admitted</h2>
              <p className="text-blue-600 font-medium text-sm mt-1">{filteredChildren.length} patients matching criteria</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
              <span>Show</span>
              <select 
                value={entriesPerPage} 
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm transition-shadow"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          {/* List of Patients */}
          <div className="space-y-3">
            {currentEntries.length > 0 ? (
              currentEntries.map((child) => (
                <div 
                  key={child.id} 
                  className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-6 hover:border-blue-300 hover:shadow-md hover:shadow-blue-900/5 transition-all duration-200"
                >
                  {/* Patient Info */}
                  <div className="flex items-center gap-4 min-w-60">
                    <div className="h-11 w-11 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg border border-blue-100 shrink-0 shadow-sm">
                      {child.childName ? child.childName.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{child.childName || "Unknown"}</h3>
                      <div className="flex items-center gap-2 mt-0.5 text-xs font-medium text-slate-500">
                        <span className="bg-slate-50 px-1.5 py-0.5 rounded text-slate-600 border border-slate-100">ID: {child.samNumber || "N/A"}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-600">Rec: {child.recordNo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Weight Timeline */}
                  <div className="flex-1 overflow-x-auto pb-2 xl:pb-0">
                    <div className="flex items-center justify-start xl:justify-center gap-2 min-w-max">
                      {["day0", "day1", "day2", "day3", "day4", "day5", "day6"].map((day, idx) => {
                        const val = weightEntries[child.id]?.[day as keyof WeightEntry];
                        const isDay0 = idx === 0;
                        const isFilled = !!val;

                        return (
                          <div key={day} className="flex flex-col items-center gap-1.5 w-14">
                            <span className={cn(
                              "text-[10px] uppercase font-bold tracking-wider",
                              isDay0 ? "text-blue-600" : "text-slate-400"
                            )}>
                              {idx === 0 ? "Adm" : `D${idx}`}
                            </span>
                            <div className={cn(
                              "h-9 w-12 rounded flex items-center justify-center text-sm font-semibold transition-colors duration-200",
                              isDay0 && isFilled ? "bg-blue-600 text-white shadow-sm" : 
                              isFilled ? "bg-blue-50 border-2 border-blue-600 text-blue-700" : 
                              "bg-slate-50 border border-dashed border-slate-300 text-slate-300"
                            )}>
                              {val || "-"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="shrink-0 flex justify-end">
                    <Button
                      onClick={() => handleEdit(child.id)}
                      className="w-full xl:w-auto bg-slate-900 hover:bg-blue-600 text-white transition-colors duration-200 shadow-sm"
                    >
                      <Pencil className="h-4 w-4 mr-2" /> Update
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-slate-200 border-dashed rounded-xl p-12 text-center flex flex-col items-center justify-center text-slate-500 shadow-sm">
                <div className="bg-blue-50 p-4 rounded-full mb-4">
                  <Search className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No patients found</h3>
                <p className="text-sm mt-1 max-w-sm text-slate-500">No children match the current filter criteria. Try adjusting the search terms or date range in the sidebar.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredChildren.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
              <p className="text-sm text-slate-500 font-medium">
                Showing <span className="text-slate-900 font-bold">{Math.min(filteredChildren.length, (currentPage - 1) * entriesPerPage + 1)}</span> to <span className="text-slate-900 font-bold">{Math.min(filteredChildren.length, currentPage * entriesPerPage)}</span> of <span className="text-blue-600 font-bold">{filteredChildren.length}</span>
              </p>
              
              <div className="flex gap-1.5 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                    return (
                      <Button
                        key={i}
                        variant={currentPage === pageNum ? "default" : "ghost"}
                        size="sm"
                        className={cn(
                          "h-8 w-8 text-sm font-bold transition-all",
                          currentPage === pageNum 
                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm" 
                            : "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
                        )}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                  if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return <span key={i} className="px-2 text-slate-400 self-center">...</span>;
                  }
                  return null;
                })}

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}