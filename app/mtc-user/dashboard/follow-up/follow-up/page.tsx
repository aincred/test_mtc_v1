// // // // // // "use client";

// // // // // // import { useState, useEffect } from "react";
// // // // // // import { useRouter } from "next/navigation";
// // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { CalendarIcon, Search, Pencil, UserPlus, AlertCircle, Home, Loader2 } from "lucide-react";
// // // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // // Interface matching the API response
// // // // // // interface FollowUpRecord {
// // // // // //   SamNo: string;
// // // // // //   MTCCode: string;
// // // // // //   ChildName: string;
// // // // // //   DischargeDate: string;
  
// // // // // //   // Follow Up Dates (Scheduled / Done)
// // // // // //   FirstFollowUpDate?: string;
// // // // // //   FirstFollowUpDoneOn?: string;
  
// // // // // //   SecondFollowUpDate?: string;
// // // // // //   SecondFollowUpDoneOn?: string;
  
// // // // // //   ThirdFollowUpDate?: string;
// // // // // //   ThirdFollowUpDoneOn?: string;
  
// // // // // //   FourthFollowUpDate?: string;
// // // // // //   FourthFollowUpDoneOn?: string;

// // // // // //   // Latest Vitals
// // // // // //   LatestZScore?: number;
// // // // // //   LatestMUAC?: number;
// // // // // // }

// // // // // // export default function FollowUpListPage() {
// // // // // //   const router = useRouter();
  
// // // // // //   // State
// // // // // //   const [records, setRecords] = useState<FollowUpRecord[]>([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [filtered, setFiltered] = useState<FollowUpRecord[]>([]);

// // // // // //   // Filters
// // // // // //   const [fromDate, setFromDate] = useState("");
// // // // // //   const [toDate, setToDate] = useState("");
// // // // // //   const [recordNo, setRecordNo] = useState("");
// // // // // //   const [samNumber, setSamNumber] = useState("");
// // // // // //   const [childName, setChildName] = useState("");

// // // // // //   // 1. Fetch Data
// // // // // //   useEffect(() => {
// // // // // //     const fetchData = async () => {
// // // // // //       try {
// // // // // //         const res = await fetch("/api/follow-up/list", { cache: "no-store" });
// // // // // //         const result = await res.json();

// // // // // //         if (result.success && Array.isArray(result.data)) {
// // // // // //           // Format dates for display
// // // // // //           const formattedData = result.data.map((item: any) => ({
// // // // // //             ...item,
// // // // // //             DischargeDate: item.DischargeDate ? new Date(item.DischargeDate).toLocaleDateString("en-IN") : "N/A",
// // // // // //             FirstFollowUpDoneOn: item.FirstFollowUpDoneOn ? new Date(item.FirstFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
// // // // // //             SecondFollowUpDoneOn: item.SecondFollowUpDoneOn ? new Date(item.SecondFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
// // // // // //             ThirdFollowUpDoneOn: item.ThirdFollowUpDoneOn ? new Date(item.ThirdFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
// // // // // //             FourthFollowUpDoneOn: item.FourthFollowUpDoneOn ? new Date(item.FourthFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
// // // // // //           }));
          
// // // // // //           setRecords(formattedData);
// // // // // //           setFiltered(formattedData);
// // // // // //         } else {
// // // // // //           toast.error("Failed to load follow-up records");
// // // // // //         }
// // // // // //       } catch (err) {
// // // // // //         console.error("Fetch error:", err);
// // // // // //         toast.error("Connection error");
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchData();
// // // // // //   }, []);

// // // // // //   // 2. Filter Logic
// // // // // //   useEffect(() => {
// // // // // //     let list = [...records];

// // // // // //     if (recordNo) {
// // // // // //       list = list.filter((c) =>
// // // // // //         c.MTCCode?.toLowerCase().includes(recordNo.toLowerCase())
// // // // // //       );
// // // // // //     }

// // // // // //     if (samNumber) {
// // // // // //       list = list.filter((c) =>
// // // // // //         c.SamNo.toLowerCase().includes(samNumber.toLowerCase())
// // // // // //       );
// // // // // //     }

// // // // // //     if (childName) {
// // // // // //       list = list.filter((c) =>
// // // // // //         c.ChildName.toLowerCase().includes(childName.toLowerCase())
// // // // // //       );
// // // // // //     }

// // // // // //     // Date filtering (requires parsing DD/MM/YYYY back to Date object if formatted)
// // // // // //     // Simplified logic assuming standard format or relying on raw data if stored separately
// // // // // //     // For this example, we skip complex date string parsing logic for brevity, 
// // // // // //     // but in production, you should filter against ISO strings.

// // // // // //     setFiltered(list);
// // // // // //   }, [recordNo, samNumber, childName, records]);

// // // // // //   const handleSearch = () => {
// // // // // //     toast.success("Filters applied");
// // // // // //   };

// // // // // //   const clearFilters = () => {
// // // // // //     setFromDate("");
// // // // // //     setToDate("");
// // // // // //     setRecordNo("");
// // // // // //     setSamNumber("");
// // // // // //     setChildName("");
// // // // // //     setFiltered(records);
// // // // // //   };

// // // // // //   // 3. Navigation
// // // // // //   const goToFollowUp = (samNo: string) => {
// // // // // //     // IMPORTANT: Encode the ID because it contains slashes (JH/WSB/...)
// // // // // //     router.push(`/mtc-user/dashboard/follow-up/details/${encodeURIComponent(samNo)}`);
// // // // // //   };

// // // // // //   // --- RENDER ---

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen bg-gray-100 flex justify-center items-center">
// // // // // //         <div className="text-center text-teal-700">
// // // // // //           <Loader2 className="h-10 w-10 animate-spin mx-auto mb-2" />
// // // // // //           <p>Loading records...</p>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
// // // // // //       <Toaster position="top-right" />

// // // // // //       <Card className="border shadow-sm">
// // // // // //         <CardHeader className="flex flex-row justify-between items-center border-b pb-4">
// // // // // //           <h1 className="text-2xl font-bold text-teal-700">Follow Up List</h1>
// // // // // //           <div className="flex gap-2">
// // // // // //             <Button 
// // // // // //               onClick={() => router.push("/mtc-user/dashboard/home")}
// // // // // //               variant="outline"
// // // // // //               className="gap-2"
// // // // // //             >
// // // // // //               <Home className="h-4 w-4" /> Dashboard
// // // // // //             </Button>
// // // // // //           </div>
// // // // // //         </CardHeader>

// // // // // //         <CardContent className="pt-6">
          
// // // // // //           {/* Filters */}
// // // // // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
// // // // // //             <div>
// // // // // //               <label className="text-xs font-semibold mb-1 block text-gray-600">From Date</label>
// // // // // //               <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="h-9" />
// // // // // //             </div>
// // // // // //             <div>
// // // // // //               <label className="text-xs font-semibold mb-1 block text-gray-600">To Date</label>
// // // // // //               <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="h-9" />
// // // // // //             </div>
// // // // // //             <div>
// // // // // //               <label className="text-xs font-semibold mb-1 block text-gray-600">Record No</label>
// // // // // //               <Input value={recordNo} onChange={(e) => setRecordNo(e.target.value)} placeholder="MTC Code" className="h-9" />
// // // // // //             </div>
// // // // // //             <div>
// // // // // //               <label className="text-xs font-semibold mb-1 block text-gray-600">SAM Number</label>
// // // // // //               <Input value={samNumber} onChange={(e) => setSamNumber(e.target.value)} placeholder="ID" className="h-9" />
// // // // // //             </div>
// // // // // //             <div>
// // // // // //               <label className="text-xs font-semibold mb-1 block text-gray-600">Child Name</label>
// // // // // //               <Input value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Name" className="h-9" />
// // // // // //             </div>
// // // // // //             <div className="flex items-end gap-2">
// // // // // //               <Button onClick={handleSearch} className="bg-teal-600 hover:bg-teal-700 h-9 flex-1">
// // // // // //                 <Search className="w-4 h-4" />
// // // // // //               </Button>
// // // // // //               <Button onClick={clearFilters} variant="outline" className="h-9" title="Clear">
// // // // // //                 <CalendarIcon className="w-4 h-4" />
// // // // // //               </Button>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           <div className="mb-4 text-sm text-gray-500 font-medium">
// // // // // //             Showing {filtered.length} records
// // // // // //           </div>

// // // // // //           {/* Table */}
// // // // // //           <div className="overflow-x-auto rounded-md border">
// // // // // //             {filtered.length > 0 ? (
// // // // // //               <table className="min-w-full text-sm divide-y divide-gray-200">
// // // // // //                 <thead className="bg-gray-50 text-gray-700 font-semibold">
// // // // // //                   <tr>
// // // // // //                     <th className="px-4 py-3 text-left">Record No</th>
// // // // // //                     <th className="px-4 py-3 text-left">SAM No</th>
// // // // // //                     <th className="px-4 py-3 text-left">Child Name</th>
// // // // // //                     <th className="px-4 py-3 text-left">Discharge Date</th>
// // // // // //                     <th className="px-4 py-3 text-center">Follow-up 1</th>
// // // // // //                     <th className="px-4 py-3 text-center">Follow-up 2</th>
// // // // // //                     <th className="px-4 py-3 text-center">Follow-up 3</th>
// // // // // //                     <th className="px-4 py-3 text-center">Follow-up 4</th>
// // // // // //                     <th className="px-4 py-3 text-center">Action</th>
// // // // // //                   </tr>
// // // // // //                 </thead>
// // // // // //                 <tbody className="bg-white divide-y divide-gray-200">
// // // // // //                   {filtered.map((record) => (
// // // // // //                     <tr key={record.SamNo} className="hover:bg-gray-50 transition-colors">
// // // // // //                       <td className="px-4 py-3 font-medium text-gray-900">{record.MTCCode}</td>
// // // // // //                       <td className="px-4 py-3 text-gray-600">{record.SamNo}</td>
// // // // // //                       <td className="px-4 py-3 text-gray-800 font-medium">{record.ChildName}</td>
// // // // // //                       <td className="px-4 py-3 text-gray-600">{record.DischargeDate}</td>
                      
// // // // // //                       {/* Follow Up Status Cells */}
// // // // // //                       <td className="px-4 py-3 text-center">
// // // // // //                         <span className={`px-2 py-1 rounded text-xs ${record.FirstFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
// // // // // //                           {record.FirstFollowUpDoneOn}
// // // // // //                         </span>
// // // // // //                       </td>
// // // // // //                       <td className="px-4 py-3 text-center">
// // // // // //                         <span className={`px-2 py-1 rounded text-xs ${record.SecondFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
// // // // // //                           {record.SecondFollowUpDoneOn}
// // // // // //                         </span>
// // // // // //                       </td>
// // // // // //                       <td className="px-4 py-3 text-center">
// // // // // //                         <span className={`px-2 py-1 rounded text-xs ${record.ThirdFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
// // // // // //                           {record.ThirdFollowUpDoneOn}
// // // // // //                         </span>
// // // // // //                       </td>
// // // // // //                       <td className="px-4 py-3 text-center">
// // // // // //                         <span className={`px-2 py-1 rounded text-xs ${record.FourthFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
// // // // // //                           {record.FourthFollowUpDoneOn}
// // // // // //                         </span>
// // // // // //                       </td>

// // // // // //                       <td className="px-4 py-3 text-center">
// // // // // //                         <Button 
// // // // // //                           size="sm" 
// // // // // //                           variant="ghost"
// // // // // //                           className="text-teal-600 hover:text-teal-800 hover:bg-teal-50"
// // // // // //                           onClick={() => goToFollowUp(record.SamNo)}
// // // // // //                         >
// // // // // //                           <Pencil className="h-4 w-4" />
// // // // // //                         </Button>
// // // // // //                       </td>
// // // // // //                     </tr>
// // // // // //                   ))}
// // // // // //                 </tbody>
// // // // // //               </table>
// // // // // //             ) : (
// // // // // //               <div className="text-center py-12">
// // // // // //                 <UserPlus className="h-12 w-12 mx-auto text-gray-300 mb-3" />
// // // // // //                 <h3 className="text-lg font-medium text-gray-900">No records found</h3>
// // // // // //                 <p className="text-gray-500">Try adjusting your search or filters.</p>
// // // // // //                 <Button variant="link" onClick={clearFilters} className="mt-2 text-teal-600">
// // // // // //                   Clear all filters
// // // // // //                 </Button>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>

// // // // // //         </CardContent>
// // // // // //       </Card>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // // // "use client";

// // // // // // // import { useState, useEffect } from "react";
// // // // // // // import { useRouter } from "next/navigation";
// // // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { CalendarIcon, Search, Pencil, UserPlus, Home, Loader2 } from "lucide-react";
// // // // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // // // Interface for the raw data coming from the API
// // // // // // // interface RawFollowUpRecord {
// // // // // // //   SamNo: string;
// // // // // // //   MTCCode: string;
// // // // // // //   ChildName: string;
// // // // // // //   DischargeDate: string | null;
// // // // // // //   FirstFollowUpDate?: string | null;
// // // // // // //   FirstFollowUpDoneOn?: string | null;
// // // // // // //   SecondFollowUpDate?: string | null;
// // // // // // //   SecondFollowUpDoneOn?: string | null;
// // // // // // //   ThirdFollowUpDate?: string | null;
// // // // // // //   ThirdFollowUpDoneOn?: string | null;
// // // // // // //   FourthFollowUpDate?: string | null;
// // // // // // //   FourthFollowUpDoneOn?: string | null;
// // // // // // //   LatestZScore?: number;
// // // // // // //   LatestMUAC?: number;
// // // // // // // }

// // // // // // // // Interface for the formatted data used in the UI
// // // // // // // interface FollowUpRecord {
// // // // // // //   SamNo: string;
// // // // // // //   MTCCode: string;
// // // // // // //   ChildName: string;
// // // // // // //   DischargeDate: string;
  
// // // // // // //   // Follow Up Dates (Scheduled / Done)
// // // // // // //   FirstFollowUpDate?: string;
// // // // // // //   FirstFollowUpDoneOn?: string;
  
// // // // // // //   SecondFollowUpDate?: string;
// // // // // // //   SecondFollowUpDoneOn?: string;
  
// // // // // // //   ThirdFollowUpDate?: string;
// // // // // // //   ThirdFollowUpDoneOn?: string;
  
// // // // // // //   FourthFollowUpDate?: string;
// // // // // // //   FourthFollowUpDoneOn?: string;

// // // // // // //   // Latest Vitals
// // // // // // //   LatestZScore?: number;
// // // // // // //   LatestMUAC?: number;
// // // // // // // }

// // // // // // // export default function FollowUpListPage() {
// // // // // // //   const router = useRouter();
  
// // // // // // //   // State
// // // // // // //   const [records, setRecords] = useState<FollowUpRecord[]>([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [filtered, setFiltered] = useState<FollowUpRecord[]>([]);

// // // // // // //   // Filters
// // // // // // //   const [fromDate, setFromDate] = useState("");
// // // // // // //   const [toDate, setToDate] = useState("");
// // // // // // //   const [recordNo, setRecordNo] = useState("");
// // // // // // //   const [samNumber, setSamNumber] = useState("");
// // // // // // //   const [childName, setChildName] = useState("");

// // // // // // //   // 1. Fetch Data
// // // // // // //   useEffect(() => {
// // // // // // //     const fetchData = async () => {
// // // // // // //       try {
// // // // // // //         const res = await fetch("/api/follow-up/list", { cache: "no-store" });
// // // // // // //         const result = await res.json();

// // // // // // //         if (result.success && Array.isArray(result.data)) {
// // // // // // //           // Format dates for display
// // // // // // //           // Explicitly type 'item' as RawFollowUpRecord instead of 'any'
// // // // // // //           const formattedData: FollowUpRecord[] = result.data.map((item: RawFollowUpRecord) => ({
// // // // // // //             ...item,
// // // // // // //             DischargeDate: item.DischargeDate ? new Date(item.DischargeDate).toLocaleDateString("en-IN") : "N/A",
// // // // // // //             FirstFollowUpDoneOn: item.FirstFollowUpDoneOn ? new Date(item.FirstFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
// // // // // // //             SecondFollowUpDoneOn: item.SecondFollowUpDoneOn ? new Date(item.SecondFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
// // // // // // //             ThirdFollowUpDoneOn: item.ThirdFollowUpDoneOn ? new Date(item.ThirdFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
// // // // // // //             FourthFollowUpDoneOn: item.FourthFollowUpDoneOn ? new Date(item.FourthFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
// // // // // // //             // Handle potentially missing optional strings for the UI interface
// // // // // // //             FirstFollowUpDate: item.FirstFollowUpDate || undefined,
// // // // // // //             SecondFollowUpDate: item.SecondFollowUpDate || undefined,
// // // // // // //             ThirdFollowUpDate: item.ThirdFollowUpDate || undefined,
// // // // // // //             FourthFollowUpDate: item.FourthFollowUpDate || undefined,
// // // // // // //           }));
          
// // // // // // //           setRecords(formattedData);
// // // // // // //           setFiltered(formattedData);
// // // // // // //         } else {
// // // // // // //           toast.error("Failed to load follow-up records");
// // // // // // //         }
// // // // // // //       } catch (err) {
// // // // // // //         console.error("Fetch error:", err);
// // // // // // //         toast.error("Connection error");
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchData();
// // // // // // //   }, []);

// // // // // // //   // 2. Filter Logic
// // // // // // //   useEffect(() => {
// // // // // // //     let list = [...records];

// // // // // // //     if (recordNo) {
// // // // // // //       list = list.filter((c) =>
// // // // // // //         c.MTCCode?.toLowerCase().includes(recordNo.toLowerCase())
// // // // // // //       );
// // // // // // //     }

// // // // // // //     if (samNumber) {
// // // // // // //       list = list.filter((c) =>
// // // // // // //         c.SamNo.toLowerCase().includes(samNumber.toLowerCase())
// // // // // // //       );
// // // // // // //     }

// // // // // // //     if (childName) {
// // // // // // //       list = list.filter((c) =>
// // // // // // //         c.ChildName.toLowerCase().includes(childName.toLowerCase())
// // // // // // //       );
// // // // // // //     }

// // // // // // //     // Date filtering (requires parsing DD/MM/YYYY back to Date object if formatted)
// // // // // // //     // Simplified logic assuming standard format or relying on raw data if stored separately
// // // // // // //     // For this example, we skip complex date string parsing logic for brevity, 
// // // // // // //     // but in production, you should filter against ISO strings.

// // // // // // //     setFiltered(list);
// // // // // // //   }, [recordNo, samNumber, childName, records]);

// // // // // // //   const handleSearch = () => {
// // // // // // //     toast.success("Filters applied");
// // // // // // //   };

// // // // // // //   const clearFilters = () => {
// // // // // // //     setFromDate("");
// // // // // // //     setToDate("");
// // // // // // //     setRecordNo("");
// // // // // // //     setSamNumber("");
// // // // // // //     setChildName("");
// // // // // // //     setFiltered(records);
// // // // // // //   };

// // // // // // //   // 3. Navigation
// // // // // // //   const goToFollowUp = (samNo: string) => {
// // // // // // //     // IMPORTANT: Encode the ID because it contains slashes (JH/WSB/...)
// // // // // // //     router.push(`/mtc-user/dashboard/follow-up/details/${encodeURIComponent(samNo)}`);
// // // // // // //   };

// // // // // // //   // --- RENDER ---

// // // // // // //   if (loading) {
// // // // // // //     return (
// // // // // // //       <div className="min-h-screen bg-gray-100 flex justify-center items-center">
// // // // // // //         <div className="text-center text-teal-700">
// // // // // // //           <Loader2 className="h-10 w-10 animate-spin mx-auto mb-2" />
// // // // // // //           <p>Loading records...</p>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
// // // // // // //       <Toaster position="top-right" />

// // // // // // //       <Card className="border shadow-sm">
// // // // // // //         <CardHeader className="flex flex-row justify-between items-center border-b pb-4">
// // // // // // //           <h1 className="text-2xl font-bold text-teal-700">Follow Up List</h1>
// // // // // // //           <div className="flex gap-2">
// // // // // // //             <Button 
// // // // // // //               onClick={() => router.push("/mtc-user/dashboard/home")}
// // // // // // //               variant="outline"
// // // // // // //               className="gap-2"
// // // // // // //             >
// // // // // // //               <Home className="h-4 w-4" /> Dashboard
// // // // // // //             </Button>
// // // // // // //           </div>
// // // // // // //         </CardHeader>

// // // // // // //         <CardContent className="pt-6">
          
// // // // // // //           {/* Filters */}
// // // // // // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
// // // // // // //             <div>
// // // // // // //               <label className="text-xs font-semibold mb-1 block text-gray-600">From Date</label>
// // // // // // //               <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="h-9" />
// // // // // // //             </div>
// // // // // // //             <div>
// // // // // // //               <label className="text-xs font-semibold mb-1 block text-gray-600">To Date</label>
// // // // // // //               <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="h-9" />
// // // // // // //             </div>
// // // // // // //             <div>
// // // // // // //               <label className="text-xs font-semibold mb-1 block text-gray-600">Record No</label>
// // // // // // //               <Input value={recordNo} onChange={(e) => setRecordNo(e.target.value)} placeholder="MTC Code" className="h-9" />
// // // // // // //             </div>
// // // // // // //             <div>
// // // // // // //               <label className="text-xs font-semibold mb-1 block text-gray-600">SAM Number</label>
// // // // // // //               <Input value={samNumber} onChange={(e) => setSamNumber(e.target.value)} placeholder="ID" className="h-9" />
// // // // // // //             </div>
// // // // // // //             <div>
// // // // // // //               <label className="text-xs font-semibold mb-1 block text-gray-600">Child Name</label>
// // // // // // //               <Input value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Name" className="h-9" />
// // // // // // //             </div>
// // // // // // //             <div className="flex items-end gap-2">
// // // // // // //               <Button onClick={handleSearch} className="bg-teal-600 hover:bg-teal-700 h-9 flex-1">
// // // // // // //                 <Search className="w-4 h-4" />
// // // // // // //               </Button>
// // // // // // //               <Button onClick={clearFilters} variant="outline" className="h-9" title="Clear">
// // // // // // //                 <CalendarIcon className="w-4 h-4" />
// // // // // // //               </Button>
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           <div className="mb-4 text-sm text-gray-500 font-medium">
// // // // // // //             Showing {filtered.length} records
// // // // // // //           </div>

// // // // // // //           {/* Table */}
// // // // // // //           <div className="overflow-x-auto rounded-md border">
// // // // // // //             {filtered.length > 0 ? (
// // // // // // //               <table className="min-w-full text-sm divide-y divide-gray-200">
// // // // // // //                 <thead className="bg-gray-50 text-gray-700 font-semibold">
// // // // // // //                   <tr>
// // // // // // //                     <th className="px-4 py-3 text-left">Record No</th>
// // // // // // //                     <th className="px-4 py-3 text-left">SAM No</th>
// // // // // // //                     <th className="px-4 py-3 text-left">Child Name</th>
// // // // // // //                     <th className="px-4 py-3 text-left">Discharge Date</th>
// // // // // // //                     <th className="px-4 py-3 text-center">Follow-up 1</th>
// // // // // // //                     <th className="px-4 py-3 text-center">Follow-up 2</th>
// // // // // // //                     <th className="px-4 py-3 text-center">Follow-up 3</th>
// // // // // // //                     <th className="px-4 py-3 text-center">Follow-up 4</th>
// // // // // // //                     <th className="px-4 py-3 text-center">Action</th>
// // // // // // //                   </tr>
// // // // // // //                 </thead>
// // // // // // //                 <tbody className="bg-white divide-y divide-gray-200">
// // // // // // //                   {filtered.map((record) => (
// // // // // // //                     <tr key={record.SamNo} className="hover:bg-gray-50 transition-colors">
// // // // // // //                       <td className="px-4 py-3 font-medium text-gray-900">{record.MTCCode}</td>
// // // // // // //                       <td className="px-4 py-3 text-gray-600">{record.SamNo}</td>
// // // // // // //                       <td className="px-4 py-3 text-gray-800 font-medium">{record.ChildName}</td>
// // // // // // //                       <td className="px-4 py-3 text-gray-600">{record.DischargeDate}</td>
                      
// // // // // // //                       {/* Follow Up Status Cells */}
// // // // // // //                       <td className="px-4 py-3 text-center">
// // // // // // //                         <span className={`px-2 py-1 rounded text-xs ${record.FirstFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
// // // // // // //                           {record.FirstFollowUpDoneOn}
// // // // // // //                         </span>
// // // // // // //                       </td>
// // // // // // //                       <td className="px-4 py-3 text-center">
// // // // // // //                         <span className={`px-2 py-1 rounded text-xs ${record.SecondFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
// // // // // // //                           {record.SecondFollowUpDoneOn}
// // // // // // //                         </span>
// // // // // // //                       </td>
// // // // // // //                       <td className="px-4 py-3 text-center">
// // // // // // //                         <span className={`px-2 py-1 rounded text-xs ${record.ThirdFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
// // // // // // //                           {record.ThirdFollowUpDoneOn}
// // // // // // //                         </span>
// // // // // // //                       </td>
// // // // // // //                       <td className="px-4 py-3 text-center">
// // // // // // //                         <span className={`px-2 py-1 rounded text-xs ${record.FourthFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
// // // // // // //                           {record.FourthFollowUpDoneOn}
// // // // // // //                         </span>
// // // // // // //                       </td>

// // // // // // //                       <td className="px-4 py-3 text-center">
// // // // // // //                         <Button 
// // // // // // //                           size="sm" 
// // // // // // //                           variant="ghost"
// // // // // // //                           className="text-teal-600 hover:text-teal-800 hover:bg-teal-50"
// // // // // // //                           onClick={() => goToFollowUp(record.SamNo)}
// // // // // // //                         >
// // // // // // //                           <Pencil className="h-4 w-4" />
// // // // // // //                         </Button>
// // // // // // //                       </td>
// // // // // // //                     </tr>
// // // // // // //                   ))}
// // // // // // //                 </tbody>
// // // // // // //               </table>
// // // // // // //             ) : (
// // // // // // //               <div className="text-center py-12">
// // // // // // //                 <UserPlus className="h-12 w-12 mx-auto text-gray-300 mb-3" />
// // // // // // //                 <h3 className="text-lg font-medium text-gray-900">No records found</h3>
// // // // // // //                 <p className="text-gray-500">Try adjusting your search or filters.</p>
// // // // // // //                 <Button variant="link" onClick={clearFilters} className="mt-2 text-teal-600">
// // // // // // //                   Clear all filters
// // // // // // //                 </Button>
// // // // // // //               </div>
// // // // // // //             )}
// // // // // // //           </div>

// // // // // // //         </CardContent>
// // // // // // //       </Card>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }


// // // // // "use client";

// // // // // import { useState, useEffect } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { 
// // // // //   CalendarIcon, 
// // // // //   Search, 
// // // // //   Pencil, 
// // // // //   UserPlus, 
// // // // //   Home, 
// // // // //   Loader2,
// // // // //   Activity,
// // // // //   RotateCcw,
// // // // //   ClipboardList
// // // // // } from "lucide-react";
// // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // Interface matching the data structure
// // // // // interface FollowUpRecord {
// // // // //   SamNo: string;
// // // // //   MTCCode: string;
// // // // //   ChildName: string;
// // // // //   DischargeDate: string;
  
// // // // //   // Follow Up Dates (Scheduled / Done)
// // // // //   FirstFollowUpDate?: string;
// // // // //   FirstFollowUpDoneOn?: string;
  
// // // // //   SecondFollowUpDate?: string;
// // // // //   SecondFollowUpDoneOn?: string;
  
// // // // //   ThirdFollowUpDate?: string;
// // // // //   ThirdFollowUpDoneOn?: string;
  
// // // // //   FourthFollowUpDate?: string;
// // // // //   FourthFollowUpDoneOn?: string;

// // // // //   // Latest Vitals
// // // // //   LatestZScore?: number;
// // // // //   LatestMUAC?: number;
// // // // // }

// // // // // // MOCK DATA: Replaces the API call
// // // // // const MOCK_RECORDS: FollowUpRecord[] = [
// // // // //   {
// // // // //     SamNo: "SAM/2026/001", MTCCode: "REC-1042", ChildName: "Rahul Kumar", DischargeDate: "12/05/2026",
// // // // //     FirstFollowUpDoneOn: "26/05/2026", SecondFollowUpDoneOn: "-", ThirdFollowUpDoneOn: "-", FourthFollowUpDoneOn: "-"
// // // // //   },
// // // // //   {
// // // // //     SamNo: "SAM/2026/002", MTCCode: "REC-1045", ChildName: "Priya Singh", DischargeDate: "05/04/2026",
// // // // //     FirstFollowUpDoneOn: "19/04/2026", SecondFollowUpDoneOn: "03/05/2026", ThirdFollowUpDoneOn: "17/05/2026", FourthFollowUpDoneOn: "-"
// // // // //   },
// // // // //   {
// // // // //     SamNo: "SAM/2026/003", MTCCode: "REC-1050", ChildName: "Amit Patel", DischargeDate: "28/05/2026",
// // // // //     FirstFollowUpDoneOn: "-", SecondFollowUpDoneOn: "-", ThirdFollowUpDoneOn: "-", FourthFollowUpDoneOn: "-"
// // // // //   },
// // // // //   {
// // // // //     SamNo: "SAM/2026/004", MTCCode: "REC-1051", ChildName: "Sneha Sharma", DischargeDate: "15/03/2026",
// // // // //     FirstFollowUpDoneOn: "29/03/2026", SecondFollowUpDoneOn: "12/04/2026", ThirdFollowUpDoneOn: "26/04/2026", FourthFollowUpDoneOn: "10/05/2026"
// // // // //   },
// // // // //   {
// // // // //     SamNo: "SAM/2026/005", MTCCode: "REC-1062", ChildName: "Vikram Das", DischargeDate: "02/06/2026",
// // // // //     FirstFollowUpDoneOn: "-", SecondFollowUpDoneOn: "-", ThirdFollowUpDoneOn: "-", FourthFollowUpDoneOn: "-"
// // // // //   }
// // // // // ];

// // // // // export default function FollowUpListPage() {
// // // // //   const router = useRouter();
  
// // // // //   // State
// // // // //   const [records, setRecords] = useState<FollowUpRecord[]>([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [filtered, setFiltered] = useState<FollowUpRecord[]>([]);

// // // // //   // Filters
// // // // //   const [fromDate, setFromDate] = useState("");
// // // // //   const [toDate, setToDate] = useState("");
// // // // //   const [recordNo, setRecordNo] = useState("");
// // // // //   const [samNumber, setSamNumber] = useState("");
// // // // //   const [childName, setChildName] = useState("");

// // // // //   // 1. Load Mock Data
// // // // //   useEffect(() => {
// // // // //     // Simulating a brief network delay for UX purposes
// // // // //     const timer = setTimeout(() => {
// // // // //       setRecords(MOCK_RECORDS);
// // // // //       setFiltered(MOCK_RECORDS);
// // // // //       setLoading(false);
// // // // //     }, 400);

// // // // //     return () => clearTimeout(timer);
// // // // //   }, []);

// // // // //   // 2. Filter Logic
// // // // //   useEffect(() => {
// // // // //     let list = [...records];

// // // // //     if (recordNo) {
// // // // //       list = list.filter((c) =>
// // // // //         c.MTCCode?.toLowerCase().includes(recordNo.toLowerCase())
// // // // //       );
// // // // //     }

// // // // //     if (samNumber) {
// // // // //       list = list.filter((c) =>
// // // // //         c.SamNo.toLowerCase().includes(samNumber.toLowerCase())
// // // // //       );
// // // // //     }

// // // // //     if (childName) {
// // // // //       list = list.filter((c) =>
// // // // //         c.ChildName.toLowerCase().includes(childName.toLowerCase())
// // // // //       );
// // // // //     }

// // // // //     setFiltered(list);
// // // // //   }, [recordNo, samNumber, childName, records]);

// // // // //   const handleSearch = () => {
// // // // //     toast.success("Filters applied successfully", {
// // // // //       iconTheme: { primary: '#2563eb', secondary: '#fff' }
// // // // //     });
// // // // //   };

// // // // //   const clearFilters = () => {
// // // // //     setFromDate("");
// // // // //     setToDate("");
// // // // //     setRecordNo("");
// // // // //     setSamNumber("");
// // // // //     setChildName("");
// // // // //     setFiltered(records);
// // // // //   };

// // // // //   // 3. Navigation
// // // // //   const goToFollowUp = (samNo: string) => {
// // // // //     router.push(`/mtc-user/dashboard/follow-up/details/${encodeURIComponent(samNo)}`);
// // // // //   };

// // // // //   // --- RENDER ---

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
// // // // //         <div className="text-center text-blue-700">
// // // // //           <Loader2 className="h-10 w-10 animate-spin mx-auto mb-3" />
// // // // //           <p className="font-medium tracking-wide">Loading records...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
// // // // //       <Toaster position="top-right" />

// // // // //       <div className="max-w-7xl mx-auto space-y-6">
// // // // //         {/* Header */}
// // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // //           <div className="flex items-center gap-3">
// // // // //             <div className="bg-blue-100 p-2.5 rounded-xl border border-blue-200 shadow-sm">
// // // // //               <ClipboardList className="h-6 w-6 text-blue-700" />
// // // // //             </div>
// // // // //             <div>
// // // // //               <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Follow Up List</h1>
// // // // //               <p className="text-sm text-slate-500 font-medium mt-0.5">Track and manage patient follow-ups</p>
// // // // //             </div>
// // // // //           </div>
// // // // //           <Button 
// // // // //             onClick={() => router.push("/mtc-user/dashboard/home")}
// // // // //             variant="outline"
// // // // //             className="border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm"
// // // // //           >
// // // // //             <Home className="mr-2 h-4 w-4" /> Dashboard
// // // // //           </Button>
// // // // //         </div>

// // // // //         {/* Filters Card */}
// // // // //         <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
// // // // //           <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5 px-6">
// // // // //             <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
// // // // //               <Search className="h-4 w-4 text-blue-500" /> 
// // // // //               Search & Filter
// // // // //             </h2>
// // // // //           </CardHeader>
// // // // //           <CardContent className="p-6">
// // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
// // // // //               <div className="space-y-1.5">
// // // // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">From Date</label>
// // // // //                 <div className="relative">
// // // // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 pr-8" />
// // // // //                   <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div className="space-y-1.5">
// // // // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">To Date</label>
// // // // //                 <div className="relative">
// // // // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 pr-8" />
// // // // //                   <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
// // // // //                 </div>
// // // // //               </div>
// // // // //               <div className="space-y-1.5">
// // // // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Record No</label>
// // // // //                 <Input value={recordNo} onChange={(e) => setRecordNo(e.target.value)} placeholder="e.g. REC-1042" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
// // // // //               </div>
// // // // //               <div className="space-y-1.5">
// // // // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">SAM Number</label>
// // // // //                 <Input value={samNumber} onChange={(e) => setSamNumber(e.target.value)} placeholder="e.g. SAM/2026" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
// // // // //               </div>
// // // // //               <div className="space-y-1.5">
// // // // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Child Name</label>
// // // // //                 <Input value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="e.g. Rahul" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
// // // // //               </div>
// // // // //               <div className="flex items-end gap-2 pt-2 lg:pt-0">
// // // // //                 <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white flex-1 shadow-sm transition-all">
// // // // //                   <Search className="w-4 h-4" />
// // // // //                 </Button>
// // // // //                 <Button onClick={clearFilters} variant="outline" className="border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all shrink-0" title="Reset Filters">
// // // // //                   <RotateCcw className="w-4 h-4" />
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </CardContent>
// // // // //         </Card>

// // // // //         {/* Results Section */}
// // // // //         <div className="space-y-4">
// // // // //           <div className="flex items-center justify-between">
// // // // //             <h2 className="text-lg font-bold text-slate-800">
// // // // //               Patient Records
// // // // //             </h2>
// // // // //             <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 shadow-sm">
// // // // //               {filtered.length} Records Found
// // // // //             </div>
// // // // //           </div>

// // // // //           <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
// // // // //             <div className="overflow-x-auto">
// // // // //               {filtered.length > 0 ? (
// // // // //                 <table className="min-w-full text-sm text-slate-700 border-collapse">
// // // // //                   <thead className="bg-slate-50 border-b border-slate-200">
// // // // //                     <tr className="uppercase tracking-wider text-xs font-bold text-slate-500">
// // // // //                       <th className="px-5 py-4 text-left">Record No</th>
// // // // //                       <th className="px-5 py-4 text-left">SAM No</th>
// // // // //                       <th className="px-5 py-4 text-left">Child Name</th>
// // // // //                       <th className="px-5 py-4 text-left">Discharge Date</th>
// // // // //                       <th className="px-5 py-4 text-center">Follow-up 1</th>
// // // // //                       <th className="px-5 py-4 text-center">Follow-up 2</th>
// // // // //                       <th className="px-5 py-4 text-center">Follow-up 3</th>
// // // // //                       <th className="px-5 py-4 text-center">Follow-up 4</th>
// // // // //                       <th className="px-5 py-4 text-center">Action</th>
// // // // //                     </tr>
// // // // //                   </thead>
// // // // //                   <tbody className="divide-y divide-slate-100">
// // // // //                     {filtered.map((record) => (
// // // // //                       <tr key={record.SamNo} className="hover:bg-blue-50/50 transition-colors group">
// // // // //                         <td className="px-5 py-4 font-semibold text-slate-900">{record.MTCCode}</td>
// // // // //                         <td className="px-5 py-4">
// // // // //                           <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
// // // // //                             {record.SamNo}
// // // // //                           </span>
// // // // //                         </td>
// // // // //                         <td className="px-5 py-4 text-slate-800 font-bold">{record.ChildName}</td>
// // // // //                         <td className="px-5 py-4 text-slate-500 font-medium">{record.DischargeDate}</td>
                        
// // // // //                         {/* Follow Up Status Cells */}
// // // // //                         {[record.FirstFollowUpDoneOn, record.SecondFollowUpDoneOn, record.ThirdFollowUpDoneOn, record.FourthFollowUpDoneOn].map((date, idx) => (
// // // // //                           <td key={idx} className="px-5 py-4 text-center">
// // // // //                             {date && date !== '-' ? (
// // // // //                               <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold shadow-sm">
// // // // //                                 {date}
// // // // //                               </span>
// // // // //                             ) : (
// // // // //                               <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-slate-50 text-slate-400 border border-slate-200 border-dashed text-xs font-medium">
// // // // //                                 Pending
// // // // //                               </span>
// // // // //                             )}
// // // // //                           </td>
// // // // //                         ))}

// // // // //                         <td className="px-5 py-4 text-center">
// // // // //                           <Button 
// // // // //                             size="sm" 
// // // // //                             className="bg-slate-900 hover:bg-blue-600 text-white shadow-sm transition-all w-full sm:w-auto"
// // // // //                             onClick={() => goToFollowUp(record.SamNo)}
// // // // //                           >
// // // // //                             <Pencil className="h-4 w-4 mr-1.5" /> Update
// // // // //                           </Button>
// // // // //                         </td>
// // // // //                       </tr>
// // // // //                     ))}
// // // // //                   </tbody>
// // // // //                 </table>
// // // // //               ) : (
// // // // //                 <div className="text-center py-16 px-4">
// // // // //                   <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
// // // // //                     <UserPlus className="h-8 w-8 text-blue-400" />
// // // // //                   </div>
// // // // //                   <h3 className="text-lg font-bold text-slate-800">No records found</h3>
// // // // //                   <p className="text-slate-500 mt-1 mb-6 text-sm max-w-sm mx-auto">We couldn't find any follow-up records matching your current filter criteria.</p>
// // // // //                   <Button variant="outline" onClick={clearFilters} className="border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200">
// // // // //                     Clear all filters
// // // // //                   </Button>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           </Card>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import { useState, useEffect } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Button } from "@/components/ui/button";
// // // // import { 
// // // //   CalendarIcon, 
// // // //   Search, 
// // // //   Pencil, 
// // // //   UserPlus, 
// // // //   Home, 
// // // //   Loader2,
// // // //   RotateCcw,
// // // //   ClipboardList
// // // // } from "lucide-react";
// // // // import toast, { Toaster } from "react-hot-toast";

// // // // // Interface matching the data structure
// // // // interface FollowUpRecord {
// // // //   SamNo: string;
// // // //   MTCCode: string;
// // // //   ChildName: string;
// // // //   DischargeDate: string;
  
// // // //   // Follow Up Dates (Scheduled / Done)
// // // //   FirstFollowUpDoneOn?: string;
// // // //   SecondFollowUpDoneOn?: string;
// // // //   ThirdFollowUpDoneOn?: string;
// // // //   FourthFollowUpDoneOn?: string;
// // // // }

// // // // export default function FollowUpListPage() {
// // // //   const router = useRouter();
  
// // // //   // State
// // // //   const [records, setRecords] = useState<FollowUpRecord[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [filtered, setFiltered] = useState<FollowUpRecord[]>([]);

// // // //   // Filters
// // // //   const [fromDate, setFromDate] = useState("");
// // // //   const [toDate, setToDate] = useState("");
// // // //   const [recordNo, setRecordNo] = useState("");
// // // //   const [samNumber, setSamNumber] = useState("");
// // // //   const [childName, setChildName] = useState("");

// // // //   // 1. Load Live Database Data
// // // //   useEffect(() => {
// // // //     const fetchDischargedPatients = async () => {
// // // //       try {
// // // //         const response = await fetch('/api/discharged-patients', { cache: 'no-store' });
// // // //         if (!response.ok) throw new Error("Failed to fetch");
        
// // // //         const dbData = await response.json();

// // // //         // Map the database response to your UI interface
// // // //         const liveRecords: FollowUpRecord[] = dbData.map((row: any) => ({
// // // //           MTCCode: row.registration_id?.toString() || "N/A",
// // // //           SamNo: row.sam_no || "N/A",
// // // //           ChildName: row.child_full_name || "Unknown",
// // // //           DischargeDate: row.discharge_date ? new Date(row.discharge_date).toLocaleDateString('en-GB') : "N/A",
          
// // // //           // Placeholders until the Follow-Up database table is created
// // // //           FirstFollowUpDoneOn: "-",
// // // //           SecondFollowUpDoneOn: "-",
// // // //           ThirdFollowUpDoneOn: "-",
// // // //           FourthFollowUpDoneOn: "-"
// // // //         }));

// // // //         setRecords(liveRecords);
// // // //         setFiltered(liveRecords);
// // // //       } catch (error) {
// // // //         console.error("Fetch error:", error);
// // // //         toast.error("Failed to load discharged patients.");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchDischargedPatients();
// // // //   }, []);

// // // //   // 2. Filter Logic
// // // //   useEffect(() => {
// // // //     let list = [...records];

// // // //     if (recordNo) {
// // // //       list = list.filter((c) =>
// // // //         c.MTCCode?.toLowerCase().includes(recordNo.toLowerCase())
// // // //       );
// // // //     }

// // // //     if (samNumber) {
// // // //       list = list.filter((c) =>
// // // //         c.SamNo.toLowerCase().includes(samNumber.toLowerCase())
// // // //       );
// // // //     }

// // // //     if (childName) {
// // // //       list = list.filter((c) =>
// // // //         c.ChildName.toLowerCase().includes(childName.toLowerCase())
// // // //       );
// // // //     }

// // // //     // Optional Date Filtering (Assuming DD/MM/YYYY format mapping)
// // // //     if (fromDate || toDate) {
// // // //       list = list.filter((c) => {
// // // //         if (!c.DischargeDate || c.DischargeDate === "N/A") return false;
// // // //         const [day, month, year] = c.DischargeDate.split('/');
// // // //         const dischargeTime = new Date(`${year}-${month}-${day}`).getTime();
        
// // // //         const fromTime = fromDate ? new Date(fromDate).getTime() : 0;
// // // //         const toTime = toDate ? new Date(toDate).getTime() : Infinity;

// // // //         return dischargeTime >= fromTime && dischargeTime <= toTime;
// // // //       });
// // // //     }

// // // //     setFiltered(list);
// // // //   }, [recordNo, samNumber, childName, fromDate, toDate, records]);

// // // //   const handleSearch = () => {
// // // //     toast.success("Filters applied successfully", {
// // // //       iconTheme: { primary: '#2563eb', secondary: '#fff' }
// // // //     });
// // // //   };

// // // //   const clearFilters = () => {
// // // //     setFromDate("");
// // // //     setToDate("");
// // // //     setRecordNo("");
// // // //     setSamNumber("");
// // // //     setChildName("");
// // // //     setFiltered(records);
// // // //   };

// // // //   // 3. Navigation (Using MTCCode / Registration ID for accurate database routing)
// // // //   const goToFollowUp = (id: string) => {
// // // //     router.push(`/mtc-user/dashboard/follow-up/FollowUpDetails/${id}`);
// // // //   };

// // // //   // --- RENDER ---

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
// // // //         <div className="text-center text-blue-700">
// // // //           <Loader2 className="h-10 w-10 animate-spin mx-auto mb-3" />
// // // //           <p className="font-medium tracking-wide">Loading records...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
// // // //       <Toaster position="top-right" />

// // // //       <div className="max-w-7xl mx-auto space-y-6">
// // // //         {/* Header */}
// // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // //           <div className="flex items-center gap-3">
// // // //             <div className="bg-blue-100 p-2.5 rounded-xl border border-blue-200 shadow-sm">
// // // //               <ClipboardList className="h-6 w-6 text-blue-700" />
// // // //             </div>
// // // //             <div>
// // // //               <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Follow Up List</h1>
// // // //               <p className="text-sm text-slate-500 font-medium mt-0.5">Track and manage patient follow-ups</p>
// // // //             </div>
// // // //           </div>
// // // //           <Button 
// // // //             onClick={() => router.push("/mtc-user/dashboard/home")}
// // // //             variant="outline"
// // // //             className="border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm"
// // // //           >
// // // //             <Home className="mr-2 h-4 w-4" /> Dashboard
// // // //           </Button>
// // // //         </div>

// // // //         {/* Filters Card */}
// // // //         <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
// // // //           <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5 px-6">
// // // //             <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
// // // //               <Search className="h-4 w-4 text-blue-500" /> 
// // // //               Search & Filter
// // // //             </h2>
// // // //           </CardHeader>
// // // //           <CardContent className="p-6">
// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
// // // //               <div className="space-y-1.5">
// // // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">From Date</label>
// // // //                 <div className="relative">
// // // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 pr-8" />
// // // //                   <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
// // // //                 </div>
// // // //               </div>
// // // //               <div className="space-y-1.5">
// // // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">To Date</label>
// // // //                 <div className="relative">
// // // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 pr-8" />
// // // //                   <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
// // // //                 </div>
// // // //               </div>
// // // //               <div className="space-y-1.5">
// // // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Record No</label>
// // // //                 <Input value={recordNo} onChange={(e) => setRecordNo(e.target.value)} placeholder="e.g. REC-1042" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
// // // //               </div>
// // // //               <div className="space-y-1.5">
// // // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">SAM Number</label>
// // // //                 <Input value={samNumber} onChange={(e) => setSamNumber(e.target.value)} placeholder="e.g. SAM/2026" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
// // // //               </div>
// // // //               <div className="space-y-1.5">
// // // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Child Name</label>
// // // //                 <Input value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="e.g. Rahul" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
// // // //               </div>
// // // //               <div className="flex items-end gap-2 pt-2 lg:pt-0">
// // // //                 <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white flex-1 shadow-sm transition-all">
// // // //                   <Search className="w-4 h-4" />
// // // //                 </Button>
// // // //                 <Button onClick={clearFilters} variant="outline" className="border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all shrink-0" title="Reset Filters">
// // // //                   <RotateCcw className="w-4 h-4" />
// // // //                 </Button>
// // // //               </div>
// // // //             </div>
// // // //           </CardContent>
// // // //         </Card>

// // // //         {/* Results Section */}
// // // //         <div className="space-y-4">
// // // //           <div className="flex items-center justify-between">
// // // //             <h2 className="text-lg font-bold text-slate-800">
// // // //               Patient Records
// // // //             </h2>
// // // //             <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 shadow-sm">
// // // //               {filtered.length} Records Found
// // // //             </div>
// // // //           </div>

// // // //           <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
// // // //             <div className="overflow-x-auto">
// // // //               {filtered.length > 0 ? (
// // // //                 <table className="min-w-full text-sm text-slate-700 border-collapse">
// // // //                   <thead className="bg-slate-50 border-b border-slate-200">
// // // //                     <tr className="uppercase tracking-wider text-xs font-bold text-slate-500">
// // // //                       <th className="px-5 py-4 text-left">Record No</th>
// // // //                       <th className="px-5 py-4 text-left">SAM No</th>
// // // //                       <th className="px-5 py-4 text-left">Child Name</th>
// // // //                       <th className="px-5 py-4 text-left">Discharge Date</th>
// // // //                       <th className="px-5 py-4 text-center">Follow-up 1</th>
// // // //                       <th className="px-5 py-4 text-center">Follow-up 2</th>
// // // //                       <th className="px-5 py-4 text-center">Follow-up 3</th>
// // // //                       <th className="px-5 py-4 text-center">Follow-up 4</th>
// // // //                       <th className="px-5 py-4 text-center">Action</th>
// // // //                     </tr>
// // // //                   </thead>
// // // //                   <tbody className="divide-y divide-slate-100">
// // // //                     {filtered.map((record) => (
// // // //                       <tr key={record.MTCCode} className="hover:bg-blue-50/50 transition-colors group">
// // // //                         <td className="px-5 py-4 font-semibold text-slate-900">{record.MTCCode}</td>
// // // //                         <td className="px-5 py-4">
// // // //                           <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
// // // //                             {record.SamNo}
// // // //                           </span>
// // // //                         </td>
// // // //                         <td className="px-5 py-4 text-slate-800 font-bold">{record.ChildName}</td>
// // // //                         <td className="px-5 py-4 text-slate-500 font-medium">{record.DischargeDate}</td>
                        
// // // //                         {/* Follow Up Status Cells */}
// // // //                         {[record.FirstFollowUpDoneOn, record.SecondFollowUpDoneOn, record.ThirdFollowUpDoneOn, record.FourthFollowUpDoneOn].map((date, idx) => (
// // // //                           <td key={idx} className="px-5 py-4 text-center">
// // // //                             {date && date !== '-' ? (
// // // //                               <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold shadow-sm">
// // // //                                 {date}
// // // //                               </span>
// // // //                             ) : (
// // // //                               <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-slate-50 text-slate-400 border border-slate-200 border-dashed text-xs font-medium">
// // // //                                 Pending
// // // //                               </span>
// // // //                             )}
// // // //                           </td>
// // // //                         ))}

// // // //                         <td className="px-5 py-4 text-center">
// // // //                           <Button 
// // // //                             size="sm" 
// // // //                             className="bg-slate-900 hover:bg-blue-600 text-white shadow-sm transition-all w-full sm:w-auto"
// // // //                             onClick={() => goToFollowUp(record.MTCCode)}
// // // //                           >
// // // //                             <Pencil className="h-4 w-4 mr-1.5" /> Update
// // // //                           </Button>
// // // //                         </td>
// // // //                       </tr>
// // // //                     ))}
// // // //                   </tbody>
// // // //                 </table>
// // // //               ) : (
// // // //                 <div className="text-center py-16 px-4">
// // // //                   <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
// // // //                     <UserPlus className="h-8 w-8 text-blue-400" />
// // // //                   </div>
// // // //                   <h3 className="text-lg font-bold text-slate-800">No records found</h3>
// // // //                   <p className="text-slate-500 mt-1 mb-6 text-sm max-w-sm mx-auto">We couldn't find any discharged patient records matching your current filter criteria.</p>
// // // //                   <Button variant="outline" onClick={clearFilters} className="border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200">
// // // //                     Clear all filters
// // // //                   </Button>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </Card>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // import { Input } from "@/components/ui/input";
// // // import { Button } from "@/components/ui/button";
// // // import { 
// // //   CalendarIcon, 
// // //   Search, 
// // //   Pencil, 
// // //   UserPlus, 
// // //   Home, 
// // //   Loader2,
// // //   RotateCcw,
// // //   ClipboardList
// // // } from "lucide-react";
// // // import toast, { Toaster } from "react-hot-toast";

// // // // Interface matching the data structure
// // // interface FollowUpRecord {
// // //   SamNo: string;
// // //   MTCCode: string;
// // //   ChildName: string;
// // //   DischargeDate: string;
  
// // //   // Follow Up Dates (Scheduled / Done)
// // //   FirstFollowUpDoneOn?: string;
// // //   SecondFollowUpDoneOn?: string;
// // //   ThirdFollowUpDoneOn?: string;
// // //   FourthFollowUpDoneOn?: string;
// // // }

// // // export default function FollowUpListPage() {
// // //   const router = useRouter();
  
// // //   // State
// // //   const [records, setRecords] = useState<FollowUpRecord[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [filtered, setFiltered] = useState<FollowUpRecord[]>([]);

// // //   // Filters
// // //   const [fromDate, setFromDate] = useState("");
// // //   const [toDate, setToDate] = useState("");
// // //   const [recordNo, setRecordNo] = useState("");
// // //   const [samNumber, setSamNumber] = useState("");
// // //   const [childName, setChildName] = useState("");

// // //   // 1. Load Live Database Data (Filtered by MTC Center)
// // //   useEffect(() => {
// // //     const fetchDischargedPatients = async () => {
// // //       try {
// // //         // ✅ 1. Get the current user's MTC ID from session storage
// // //         const sessionData = sessionStorage.getItem("mtc_user");
// // //         let queryParams = "";
        
// // //         if (sessionData) {
// // //           try {
// // //             const user = JSON.parse(sessionData);
// // //             if (user.mtcId) {
// // //               queryParams = `?mtcId=${user.mtcId}`;
// // //             }
// // //           } catch (err) {
// // //             console.error("Session parse error");
// // //           }
// // //         }

// // //         // ✅ 2. Pass the MTC ID to the backend via the URL
// // //         const response = await fetch(`/api/discharged-patients${queryParams}`, { cache: 'no-store' });
// // //         if (!response.ok) throw new Error("Failed to fetch");
        
// // //         const dbData = await response.json();

// // //         // Map the database response to your UI interface
// // //         const liveRecords: FollowUpRecord[] = dbData.map((row: any) => ({
// // //           MTCCode: row.registration_id?.toString() || "N/A",
// // //           SamNo: row.sam_no || "N/A",
// // //           ChildName: row.child_full_name || "Unknown",
// // //           DischargeDate: row.discharge_date ? new Date(row.discharge_date).toLocaleDateString('en-GB') : "N/A",
          
// // //           // Placeholders until the Follow-Up database table is connected
// // //           FirstFollowUpDoneOn: "-",
// // //           SecondFollowUpDoneOn: "-",
// // //           ThirdFollowUpDoneOn: "-",
// // //           FourthFollowUpDoneOn: "-"
// // //         }));

// // //         setRecords(liveRecords);
// // //         setFiltered(liveRecords);
// // //       } catch (error) {
// // //         console.error("Fetch error:", error);
// // //         toast.error("Failed to load discharged patients.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchDischargedPatients();
// // //   }, []);

// // //   // 2. Filter Logic
// // //   useEffect(() => {
// // //     let list = [...records];

// // //     if (recordNo) {
// // //       list = list.filter((c) =>
// // //         c.MTCCode?.toLowerCase().includes(recordNo.toLowerCase())
// // //       );
// // //     }

// // //     if (samNumber) {
// // //       list = list.filter((c) =>
// // //         c.SamNo.toLowerCase().includes(samNumber.toLowerCase())
// // //       );
// // //     }

// // //     if (childName) {
// // //       list = list.filter((c) =>
// // //         c.ChildName.toLowerCase().includes(childName.toLowerCase())
// // //       );
// // //     }

// // //     // Optional Date Filtering (Assuming DD/MM/YYYY format mapping)
// // //     if (fromDate || toDate) {
// // //       list = list.filter((c) => {
// // //         if (!c.DischargeDate || c.DischargeDate === "N/A") return false;
// // //         const [day, month, year] = c.DischargeDate.split('/');
// // //         const dischargeTime = new Date(`${year}-${month}-${day}`).getTime();
        
// // //         const fromTime = fromDate ? new Date(fromDate).getTime() : 0;
// // //         const toTime = toDate ? new Date(toDate).getTime() : Infinity;

// // //         return dischargeTime >= fromTime && dischargeTime <= toTime;
// // //       });
// // //     }

// // //     setFiltered(list);
// // //   }, [recordNo, samNumber, childName, fromDate, toDate, records]);

// // //   const handleSearch = () => {
// // //     toast.success("Filters applied successfully", {
// // //       iconTheme: { primary: '#2563eb', secondary: '#fff' }
// // //     });
// // //   };

// // //   const clearFilters = () => {
// // //     setFromDate("");
// // //     setToDate("");
// // //     setRecordNo("");
// // //     setSamNumber("");
// // //     setChildName("");
// // //     setFiltered(records);
// // //   };

// // //   // 3. Navigation (Using MTCCode / Registration ID for accurate database routing)
// // //   const goToFollowUp = (id: string) => {
// // //     router.push(`/mtc-user/dashboard/follow-up/FollowUpDetails/${id}`);
// // //   };

// // //   // --- RENDER ---

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
// // //         <div className="text-center text-blue-700">
// // //           <Loader2 className="h-10 w-10 animate-spin mx-auto mb-3" />
// // //           <p className="font-medium tracking-wide">Loading records...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
// // //       <Toaster position="top-right" />

// // //       <div className="max-w-7xl mx-auto space-y-6">
// // //         {/* Header */}
// // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // //           <div className="flex items-center gap-3">
// // //             <div className="bg-blue-100 p-2.5 rounded-xl border border-blue-200 shadow-sm">
// // //               <ClipboardList className="h-6 w-6 text-blue-700" />
// // //             </div>
// // //             <div>
// // //               <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Follow Up List</h1>
// // //               <p className="text-sm text-slate-500 font-medium mt-0.5">Track and manage patient follow-ups</p>
// // //             </div>
// // //           </div>
// // //           <Button 
// // //             onClick={() => router.push("/mtc-user/dashboard/home")}
// // //             variant="outline"
// // //             className="border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm"
// // //           >
// // //             <Home className="mr-2 h-4 w-4" /> Dashboard
// // //           </Button>
// // //         </div>

// // //         {/* Filters Card */}
// // //         <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
// // //           <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5 px-6">
// // //             <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
// // //               <Search className="h-4 w-4 text-blue-500" /> 
// // //               Search & Filter
// // //             </h2>
// // //           </CardHeader>
// // //           <CardContent className="p-6">
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
// // //               <div className="space-y-1.5">
// // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">From Date</label>
// // //                 <div className="relative">
// // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 pr-8" />
// // //                   <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
// // //                 </div>
// // //               </div>
// // //               <div className="space-y-1.5">
// // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">To Date</label>
// // //                 <div className="relative">
// // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 pr-8" />
// // //                   <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
// // //                 </div>
// // //               </div>
// // //               <div className="space-y-1.5">
// // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Record No</label>
// // //                 <Input value={recordNo} onChange={(e) => setRecordNo(e.target.value)} placeholder="e.g. REC-1042" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
// // //               </div>
// // //               <div className="space-y-1.5">
// // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">SAM Number</label>
// // //                 <Input value={samNumber} onChange={(e) => setSamNumber(e.target.value)} placeholder="e.g. SAM/2026" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
// // //               </div>
// // //               <div className="space-y-1.5">
// // //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Child Name</label>
// // //                 <Input value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="e.g. Rahul" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
// // //               </div>
// // //               <div className="flex items-end gap-2 pt-2 lg:pt-0">
// // //                 <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white flex-1 shadow-sm transition-all">
// // //                   <Search className="w-4 h-4" />
// // //                 </Button>
// // //                 <Button onClick={clearFilters} variant="outline" className="border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all shrink-0" title="Reset Filters">
// // //                   <RotateCcw className="w-4 h-4" />
// // //                 </Button>
// // //               </div>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         {/* Results Section */}
// // //         <div className="space-y-4">
// // //           <div className="flex items-center justify-between">
// // //             <h2 className="text-lg font-bold text-slate-800">
// // //               Patient Records
// // //             </h2>
// // //             <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 shadow-sm">
// // //               {filtered.length} Records Found
// // //             </div>
// // //           </div>

// // //           <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
// // //             <div className="overflow-x-auto">
// // //               {filtered.length > 0 ? (
// // //                 <table className="min-w-full text-sm text-slate-700 border-collapse">
// // //                   <thead className="bg-slate-50 border-b border-slate-200">
// // //                     <tr className="uppercase tracking-wider text-xs font-bold text-slate-500">
// // //                       <th className="px-5 py-4 text-left">Record No</th>
// // //                       <th className="px-5 py-4 text-left">SAM No</th>
// // //                       <th className="px-5 py-4 text-left">Child Name</th>
// // //                       <th className="px-5 py-4 text-left">Discharge Date</th>
// // //                       <th className="px-5 py-4 text-center">Follow-up 1</th>
// // //                       <th className="px-5 py-4 text-center">Follow-up 2</th>
// // //                       <th className="px-5 py-4 text-center">Follow-up 3</th>
// // //                       <th className="px-5 py-4 text-center">Follow-up 4</th>
// // //                       <th className="px-5 py-4 text-center">Action</th>
// // //                     </tr>
// // //                   </thead>
// // //                   <tbody className="divide-y divide-slate-100">
// // //                     {filtered.map((record) => (
// // //                       <tr key={record.MTCCode} className="hover:bg-blue-50/50 transition-colors group">
// // //                         <td className="px-5 py-4 font-semibold text-slate-900">{record.MTCCode}</td>
// // //                         <td className="px-5 py-4">
// // //                           <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
// // //                             {record.SamNo}
// // //                           </span>
// // //                         </td>
// // //                         <td className="px-5 py-4 text-slate-800 font-bold">{record.ChildName}</td>
// // //                         <td className="px-5 py-4 text-slate-500 font-medium">{record.DischargeDate}</td>
                        
// // //                         {/* Follow Up Status Cells */}
// // //                         {[record.FirstFollowUpDoneOn, record.SecondFollowUpDoneOn, record.ThirdFollowUpDoneOn, record.FourthFollowUpDoneOn].map((date, idx) => (
// // //                           <td key={idx} className="px-5 py-4 text-center">
// // //                             {date && date !== '-' ? (
// // //                               <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold shadow-sm">
// // //                                 {date}
// // //                               </span>
// // //                             ) : (
// // //                               <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-slate-50 text-slate-400 border border-slate-200 border-dashed text-xs font-medium">
// // //                                 Pending
// // //                               </span>
// // //                             )}
// // //                           </td>
// // //                         ))}

// // //                         <td className="px-5 py-4 text-center">
// // //                           <Button 
// // //                             size="sm" 
// // //                             className="bg-slate-900 hover:bg-blue-600 text-white shadow-sm transition-all w-full sm:w-auto"
// // //                             onClick={() => goToFollowUp(record.MTCCode)}
// // //                           >
// // //                             <Pencil className="h-4 w-4 mr-1.5" /> Update
// // //                           </Button>
// // //                         </td>
// // //                       </tr>
// // //                     ))}
// // //                   </tbody>
// // //                 </table>
// // //               ) : (
// // //                 <div className="text-center py-16 px-4">
// // //                   <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
// // //                     <UserPlus className="h-8 w-8 text-blue-400" />
// // //                   </div>
// // //                   <h3 className="text-lg font-bold text-slate-800">No records found</h3>
// // //                   <p className="text-slate-500 mt-1 mb-6 text-sm max-w-sm mx-auto">We couldn't find any discharged patient records matching your current filter criteria.</p>
// // //                   <Button variant="outline" onClick={clearFilters} className="border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200">
// // //                     Clear all filters
// // //                   </Button>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </Card>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // import { 
// //   CalendarIcon, 
// //   Search, 
// //   Pencil, 
// //   UserPlus, 
// //   Home, 
// //   Loader2,
// //   RotateCcw,
// //   ClipboardList,
// //   CheckCircle2
// // } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";

// // // Interface matching the data structure
// // interface FollowUpRecord {
// //   SamNo: string;
// //   MTCCode: string;
// //   ChildName: string;
// //   DischargeDate: string;
  
// //   // Follow Up Dates (Scheduled / Done)
// //   FirstFollowUpDoneOn?: string;
// //   SecondFollowUpDoneOn?: string;
// //   ThirdFollowUpDoneOn?: string;
// //   FourthFollowUpDoneOn?: string;

// //   // ✅ SAAMAR Fields
// //   isSamarRegistered: boolean;
// //   samarUuid: string;
// // }

// // export default function FollowUpListPage() {
// //   const router = useRouter();
  
// //   // State
// //   const [records, setRecords] = useState<FollowUpRecord[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [filtered, setFiltered] = useState<FollowUpRecord[]>([]);

// //   // ✅ View Type State (Normal vs SAAMAR)
// //   const [viewType, setViewType] = useState<"all" | "normal" | "samar">("all");

// //   // Filters
// //   const [fromDate, setFromDate] = useState("");
// //   const [toDate, setToDate] = useState("");
// //   const [recordNo, setRecordNo] = useState("");
// //   const [samNumber, setSamNumber] = useState("");
// //   const [childName, setChildName] = useState("");

// //   // 1. Load Live Database Data (Filtered by MTC Center)
// //   useEffect(() => {
// //     const fetchDischargedPatients = async () => {
// //       try {
// //         // ✅ 1. Get the current user's MTC ID from session storage
// //         const sessionData = sessionStorage.getItem("mtc_user");
// //         let queryParams = "";
        
// //         if (sessionData) {
// //           try {
// //             const user = JSON.parse(sessionData);
// //             if (user.mtcId) {
// //               queryParams = `?mtcId=${user.mtcId}`;
// //             }
// //           } catch (err) {
// //             console.error("Session parse error");
// //           }
// //         }

// //         // ✅ 2. Pass the MTC ID to the backend via the URL
// //         const response = await fetch(`/api/discharged-patients${queryParams}`, { cache: 'no-store' });
// //         if (!response.ok) throw new Error("Failed to fetch");
        
// //         const dbData = await response.json();

// //         // Map the database response to your UI interface
// //         const liveRecords: FollowUpRecord[] = dbData.map((row: any) => ({
// //           MTCCode: row.registration_id?.toString() || "N/A",
// //           SamNo: row.sam_no || "N/A",
// //           ChildName: row.child_full_name || "Unknown",
// //           DischargeDate: row.discharge_date ? new Date(row.discharge_date).toLocaleDateString('en-GB') : "N/A",
          
// //           // Placeholders until the Follow-Up database table is connected
// //           FirstFollowUpDoneOn: "-",
// //           SecondFollowUpDoneOn: "-",
// //           ThirdFollowUpDoneOn: "-",
// //           FourthFollowUpDoneOn: "-",

// //           // ✅ Map SAAMAR data from the database payload
// //           isSamarRegistered: row.is_samar_registered === true || row.isSamarRegistered === true,
// //           samarUuid: row.samar_uuid || row.samarUuid || "",
// //         }));

// //         setRecords(liveRecords);
// //         setFiltered(liveRecords);
// //       } catch (error) {
// //         console.error("Fetch error:", error);
// //         toast.error("Failed to load discharged patients.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDischargedPatients();
// //   }, []);

// //   // 2. Filter Logic
// //   useEffect(() => {
// //     let list = [...records];

// //     // ✅ Apply the Normal vs SAAMAR filter separation
// //     if (viewType === "normal") {
// //       list = list.filter(c => !c.isSamarRegistered);
// //     } else if (viewType === "samar") {
// //       list = list.filter(c => c.isSamarRegistered);
// //     }

// //     if (recordNo) {
// //       list = list.filter((c) =>
// //         c.MTCCode?.toLowerCase().includes(recordNo.toLowerCase())
// //       );
// //     }

// //     if (samNumber) {
// //       list = list.filter((c) =>
// //         c.SamNo.toLowerCase().includes(samNumber.toLowerCase())
// //       );
// //     }

// //     if (childName) {
// //       list = list.filter((c) =>
// //         c.ChildName.toLowerCase().includes(childName.toLowerCase())
// //       );
// //     }

// //     // Optional Date Filtering (Assuming DD/MM/YYYY format mapping)
// //     if (fromDate || toDate) {
// //       list = list.filter((c) => {
// //         if (!c.DischargeDate || c.DischargeDate === "N/A") return false;
// //         const [day, month, year] = c.DischargeDate.split('/');
// //         const dischargeTime = new Date(`${year}-${month}-${day}`).getTime();
        
// //         const fromTime = fromDate ? new Date(fromDate).getTime() : 0;
// //         const toTime = toDate ? new Date(toDate).getTime() : Infinity;

// //         return dischargeTime >= fromTime && dischargeTime <= toTime;
// //       });
// //     }

// //     setFiltered(list);
// //   }, [recordNo, samNumber, childName, fromDate, toDate, records, viewType]);

// //   const handleSearch = () => {
// //     toast.success("Filters applied successfully", {
// //       iconTheme: { primary: '#2563eb', secondary: '#fff' }
// //     });
// //   };

// //   const clearFilters = () => {
// //     setFromDate("");
// //     setToDate("");
// //     setRecordNo("");
// //     setSamNumber("");
// //     setChildName("");
// //     setViewType("all"); // Reset tab
// //     setFiltered(records);
// //   };

// //   // 3. Navigation (Using MTCCode / Registration ID for accurate database routing)
// //   const goToFollowUp = (id: string) => {
// //     router.push(`/mtc-user/dashboard/follow-up/FollowUpDetails/${id}`);
// //   };

// //   // Derived counts for the tabs
// //   const countAll = records.length;
// //   const countNormal = records.filter(d => !d.isSamarRegistered).length;
// //   const countSamar = records.filter(d => d.isSamarRegistered).length;

// //   // --- RENDER ---

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
// //         <div className="text-center text-blue-700">
// //           <Loader2 className="h-10 w-10 animate-spin mx-auto mb-3" />
// //           <p className="font-medium tracking-wide">Loading records...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
// //       <Toaster position="top-right" />

// //       <div className="max-w-7xl mx-auto space-y-6">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //           <div className="flex items-center gap-3">
// //             <div className="bg-blue-100 p-2.5 rounded-xl border border-blue-200 shadow-sm">
// //               <ClipboardList className="h-6 w-6 text-blue-700" />
// //             </div>
// //             <div>
// //               <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Follow Up List</h1>
// //               <p className="text-sm text-slate-500 font-medium mt-0.5">Track and manage patient follow-ups</p>
// //             </div>
// //           </div>
// //           <Button 
// //             onClick={() => router.push("/mtc-user/dashboard/home")}
// //             variant="outline"
// //             className="border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm"
// //           >
// //             <Home className="mr-2 h-4 w-4" /> Dashboard
// //           </Button>
// //         </div>

// //         {/* Filters Card */}
// //         <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
// //           <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5 px-6">
// //             <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
// //               <Search className="h-4 w-4 text-blue-500" /> 
// //               Search & Filter
// //             </h2>
// //           </CardHeader>
// //           <CardContent className="p-6">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
// //               <div className="space-y-1.5">
// //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">From Date</label>
// //                 <div className="relative">
// //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 pr-8" />
// //                   <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
// //                 </div>
// //               </div>
// //               <div className="space-y-1.5">
// //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">To Date</label>
// //                 <div className="relative">
// //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 pr-8" />
// //                   <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
// //                 </div>
// //               </div>
// //               <div className="space-y-1.5">
// //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Record No</label>
// //                 <Input value={recordNo} onChange={(e) => setRecordNo(e.target.value)} placeholder="e.g. REC-1042" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
// //               </div>
// //               <div className="space-y-1.5">
// //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">SAM Number</label>
// //                 <Input value={samNumber} onChange={(e) => setSamNumber(e.target.value)} placeholder="e.g. SAM/2026" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
// //               </div>
// //               <div className="space-y-1.5">
// //                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Child Name</label>
// //                 <Input value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="e.g. Rahul" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
// //               </div>
// //               <div className="flex items-end gap-2 pt-2 lg:pt-0">
// //                 <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white flex-1 shadow-sm transition-all">
// //                   <Search className="w-4 h-4" />
// //                 </Button>
// //                 <Button onClick={clearFilters} variant="outline" className="border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all shrink-0" title="Reset Filters">
// //                   <RotateCcw className="w-4 h-4" />
// //                 </Button>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* ✅ SAAMAR Separation Tabs */}
// //         <div className="flex flex-wrap gap-2 items-center bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm w-max">
// //           <button
// //             onClick={() => setViewType("all")}
// //             className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${viewType === "all" ? "bg-slate-800 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
// //           >
// //             All Patients <span className="ml-1.5 text-xs opacity-70">({countAll})</span>
// //           </button>
// //           <button
// //             onClick={() => setViewType("normal")}
// //             className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${viewType === "normal" ? "bg-blue-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
// //           >
// //             Normal Registration <span className="ml-1.5 text-xs opacity-70">({countNormal})</span>
// //           </button>
// //           <button
// //             onClick={() => setViewType("samar")}
// //             className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${viewType === "samar" ? "bg-purple-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
// //           >
// //             <CheckCircle2 className="w-4 h-4" />
// //             SAAMAR Tracker <span className="ml-0.5 text-xs opacity-70">({countSamar})</span>
// //           </button>
// //         </div>

// //         {/* Results Section */}
// //         <div className="space-y-4">
// //           <div className="flex items-center justify-between">
// //             <h2 className="text-lg font-bold text-slate-800">
// //               Patient Records
// //             </h2>
// //             <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 shadow-sm">
// //               {filtered.length} Records Found
// //             </div>
// //           </div>

// //           <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
// //             <div className="overflow-x-auto">
// //               {filtered.length > 0 ? (
// //                 <table className="min-w-full text-sm text-slate-700 border-collapse">
// //                   <thead className="bg-slate-50 border-b border-slate-200">
// //                     <tr className="uppercase tracking-wider text-xs font-bold text-slate-500">
// //                       <th className="px-5 py-4 text-left">Record No</th>
// //                       <th className="px-5 py-4 text-left">SAM No</th>
// //                       <th className="px-5 py-4 text-left">Child Name</th>
// //                       {/* ✅ Added Type Header */}
// //                       <th className="px-5 py-4 text-left">Registration Type</th>
// //                       <th className="px-5 py-4 text-left">Discharge Date</th>
// //                       <th className="px-5 py-4 text-center">Follow-up 1</th>
// //                       <th className="px-5 py-4 text-center">Follow-up 2</th>
// //                       <th className="px-5 py-4 text-center">Follow-up 3</th>
// //                       <th className="px-5 py-4 text-center">Follow-up 4</th>
// //                       <th className="px-5 py-4 text-center">Action</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="divide-y divide-slate-100">
// //                     {filtered.map((record) => (
// //                       <tr key={record.MTCCode} className="hover:bg-blue-50/50 transition-colors group">
// //                         <td className="px-5 py-4 font-semibold text-slate-900">{record.MTCCode}</td>
// //                         <td className="px-5 py-4">
// //                           <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
// //                             {record.SamNo}
// //                           </span>
// //                         </td>
// //                         <td className="px-5 py-4 text-slate-800 font-bold">{record.ChildName}</td>

// //                         {/* ✅ SAAMAR vs Normal Visual Badge */}
// //                         <td className="px-5 py-4">
// //                           {record.isSamarRegistered ? (
// //                             <div className="flex flex-col">
// //                               <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-purple-100 text-purple-700 w-max border border-purple-200">
// //                                 SAAMAR
// //                               </span>
// //                               <span className="text-[10px] text-slate-400 mt-1 font-mono tracking-tighter" title="SAAMAR UUID">
// //                                 {record.samarUuid || "No UUID"}
// //                               </span>
// //                             </div>
// //                           ) : (
// //                             <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-slate-100 text-slate-500 w-max border border-slate-200">
// //                               Normal
// //                             </span>
// //                           )}
// //                         </td>

// //                         <td className="px-5 py-4 text-slate-500 font-medium">{record.DischargeDate}</td>
                        
// //                         {/* Follow Up Status Cells */}
// //                         {[record.FirstFollowUpDoneOn, record.SecondFollowUpDoneOn, record.ThirdFollowUpDoneOn, record.FourthFollowUpDoneOn].map((date, idx) => (
// //                           <td key={idx} className="px-5 py-4 text-center">
// //                             {date && date !== '-' ? (
// //                               <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold shadow-sm">
// //                                 {date}
// //                               </span>
// //                             ) : (
// //                               <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-slate-50 text-slate-400 border border-slate-200 border-dashed text-xs font-medium">
// //                                 Pending
// //                               </span>
// //                             )}
// //                           </td>
// //                         ))}

// //                         <td className="px-5 py-4 text-center">
// //                           <Button 
// //                             size="sm" 
// //                             className="bg-slate-900 hover:bg-blue-600 text-white shadow-sm transition-all w-full sm:w-auto"
// //                             onClick={() => goToFollowUp(record.MTCCode)}
// //                           >
// //                             <Pencil className="h-4 w-4 mr-1.5" /> Update
// //                           </Button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               ) : (
// //                 <div className="text-center py-16 px-4">
// //                   <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
// //                     <UserPlus className="h-8 w-8 text-blue-400" />
// //                   </div>
// //                   <h3 className="text-lg font-bold text-slate-800">No records found</h3>
// //                   <p className="text-slate-500 mt-1 mb-6 text-sm max-w-sm mx-auto">We couldn't find any discharged patient records matching your current filter criteria.</p>
// //                   <Button variant="outline" onClick={clearFilters} className="border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200">
// //                     Clear all filters
// //                   </Button>
// //                 </div>
// //               )}
// //             </div>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { 
//   CalendarIcon, 
//   Search, 
//   Pencil, 
//   UserPlus, 
//   Home, 
//   Loader2,
//   RotateCcw,
//   ClipboardList,
//   CheckCircle2
// } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// // Interface matching the data structure
// interface FollowUpRecord {
//   SamNo: string;
//   MTCCode: string;
//   ChildName: string;
//   DischargeDate: string;
  
//   // Follow Up Dates (Scheduled / Done)
//   FirstFollowUpDoneOn?: string;
//   SecondFollowUpDoneOn?: string;
//   ThirdFollowUpDoneOn?: string;
//   FourthFollowUpDoneOn?: string;

//   // ✅ SAAMAR Fields
//   isSamarRegistered: boolean;
//   samarUuid: string;
// }

// interface RawDischargedPatient {
//   registration_id?: string | number;
//   id?: string | number;
//   sam_no?: string;
//   child_full_name?: string;
//   discharge_date?: string;
//   is_samar_registered?: boolean;
//   isSamarRegistered?: boolean;
//   samar_uuid?: string;
//   samarUuid?: string;
// }

// export default function FollowUpListPage() {
//   const router = useRouter();
  
//   // State
//   const [records, setRecords] = useState<FollowUpRecord[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filtered, setFiltered] = useState<FollowUpRecord[]>([]);

//   // ✅ View Type State (Normal vs SAAMAR)
//   const [viewType, setViewType] = useState<"all" | "normal" | "samar">("all");

//   // Filters
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [recordNo, setRecordNo] = useState("");
//   const [samNumber, setSamNumber] = useState("");
//   const [childName, setChildName] = useState("");

//   // 1. Load Live Database Data (Filtered by MTC Center)
//   useEffect(() => {
//     const fetchDischargedPatients = async () => {
//       try {
//         // ✅ 1. Get the current user's MTC ID from session storage
//         const sessionData = sessionStorage.getItem("mtc_user");
//         let queryParams = "";
        
//         if (sessionData) {
//           try {
//             const user = JSON.parse(sessionData) as { mtcId?: string | number };
//             if (user.mtcId) {
//               queryParams = `?mtcId=${user.mtcId}`;
//             }
//           } catch {
//             console.error("Session parse error");
//           }
//         }

//         // ✅ 2. Pass the MTC ID to the backend via the URL
//         const response = await fetch(`/api/discharged-patients${queryParams}`, { cache: 'no-store' });
//         if (!response.ok) throw new Error("Failed to fetch");
        
//         const dbData = await response.json() as RawDischargedPatient[];

//         // Map the database response to your UI interface
//         const liveRecords: FollowUpRecord[] = dbData.map((row) => ({
//           MTCCode: row.registration_id?.toString() || row.id?.toString() || "N/A",
//           SamNo: row.sam_no || "N/A",
//           ChildName: row.child_full_name || "Unknown",
//           DischargeDate: row.discharge_date ? new Date(row.discharge_date).toLocaleDateString('en-GB') : "N/A",
          
//           // Placeholders until the Follow-Up database table is connected
//           FirstFollowUpDoneOn: "-",
//           SecondFollowUpDoneOn: "-",
//           ThirdFollowUpDoneOn: "-",
//           FourthFollowUpDoneOn: "-",

//           // ✅ Map SAAMAR data from the database payload
//           isSamarRegistered: row.is_samar_registered === true || row.isSamarRegistered === true,
//           samarUuid: row.samar_uuid || row.samarUuid || "",
//         }));

//         setRecords(liveRecords);
//         setFiltered(liveRecords);
//       } catch (error) {
//         console.error("Fetch error:", error);
//         toast.error("Failed to load discharged patients.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDischargedPatients();
//   }, []);

//   // 2. Filter Logic
//   useEffect(() => {
//     let list = [...records];

//     // ✅ Apply the Normal vs SAAMAR filter separation
//     if (viewType === "normal") {
//       list = list.filter(c => !c.isSamarRegistered);
//     } else if (viewType === "samar") {
//       list = list.filter(c => c.isSamarRegistered);
//     }

//     if (recordNo) {
//       list = list.filter((c) =>
//         c.MTCCode?.toLowerCase().includes(recordNo.toLowerCase())
//       );
//     }

//     if (samNumber) {
//       list = list.filter((c) =>
//         c.SamNo.toLowerCase().includes(samNumber.toLowerCase())
//       );
//     }

//     if (childName) {
//       list = list.filter((c) =>
//         c.ChildName.toLowerCase().includes(childName.toLowerCase())
//       );
//     }

//     // Optional Date Filtering (Assuming DD/MM/YYYY format mapping)
//     if (fromDate || toDate) {
//       list = list.filter((c) => {
//         if (!c.DischargeDate || c.DischargeDate === "N/A") return false;
//         const [day, month, year] = c.DischargeDate.split('/');
//         const dischargeTime = new Date(`${year}-${month}-${day}`).getTime();
        
//         const fromTime = fromDate ? new Date(fromDate).getTime() : 0;
//         const toTime = toDate ? new Date(toDate).getTime() : Infinity;

//         return dischargeTime >= fromTime && dischargeTime <= toTime;
//       });
//     }

//     setFiltered(list);
//   }, [recordNo, samNumber, childName, fromDate, toDate, records, viewType]);

//   const handleSearch = () => {
//     toast.success("Filters applied successfully", {
//       iconTheme: { primary: '#2563eb', secondary: '#fff' }
//     });
//   };

//   const clearFilters = () => {
//     setFromDate("");
//     setToDate("");
//     setRecordNo("");
//     setSamNumber("");
//     setChildName("");
//     setViewType("all"); // Reset tab
//     setFiltered(records);
//   };

//   // 3. Navigation (Using MTCCode / Registration ID for accurate database routing)
//   const goToFollowUp = (id: string) => {
//     router.push(`/mtc-user/dashboard/follow-up/FollowUpDetails/${id}`);
//   };

//   // Derived counts for the tabs
//   const countAll = records.length;
//   const countNormal = records.filter(d => !d.isSamarRegistered).length;
//   const countSamar = records.filter(d => d.isSamarRegistered).length;

//   // --- RENDER ---

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
//         <div className="text-center text-blue-700">
//           <Loader2 className="h-10 w-10 animate-spin mx-auto mb-3" />
//           <p className="font-medium tracking-wide">Loading records...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
//       <Toaster position="top-right" />

//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div className="flex items-center gap-3">
//             <div className="bg-blue-100 p-2.5 rounded-xl border border-blue-200 shadow-sm">
//               <ClipboardList className="h-6 w-6 text-blue-700" />
//             </div>
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Follow Up List</h1>
//               <p className="text-sm text-slate-500 font-medium mt-0.5">Track and manage patient follow-ups</p>
//             </div>
//           </div>
//           <Button 
//             onClick={() => router.push("/mtc-user/dashboard/home")}
//             variant="outline"
//             className="border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm"
//           >
//             <Home className="mr-2 h-4 w-4" /> Dashboard
//           </Button>
//         </div>

//         {/* Filters Card */}
//         <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
//           <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5 px-6">
//             <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
//               <Search className="h-4 w-4 text-blue-500" /> 
//               Search & Filter
//             </h2>
//           </CardHeader>
//           <CardContent className="p-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">From Date</label>
//                 <div className="relative">
//                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 pr-8" />
//                   <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
//                 </div>
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">To Date</label>
//                 <div className="relative">
//                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 pr-8" />
//                   <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
//                 </div>
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Record No</label>
//                 <Input value={recordNo} onChange={(e) => setRecordNo(e.target.value)} placeholder="e.g. REC-1042" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">SAM Number</label>
//                 <Input value={samNumber} onChange={(e) => setSamNumber(e.target.value)} placeholder="e.g. SAM/2026" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Child Name</label>
//                 <Input value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="e.g. Rahul" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
//               </div>
//               <div className="flex items-end gap-2 pt-2 lg:pt-0">
//                 <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white flex-1 shadow-sm transition-all">
//                   <Search className="w-4 h-4" />
//                 </Button>
//                 <Button onClick={clearFilters} variant="outline" className="border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all shrink-0" title="Reset Filters">
//                   <RotateCcw className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* ✅ SAAMAR Separation Tabs */}
//         <div className="flex flex-wrap gap-2 items-center bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm w-max">
//           <button
//             onClick={() => setViewType("all")}
//             className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${viewType === "all" ? "bg-slate-800 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
//           >
//             All Patients <span className="ml-1.5 text-xs opacity-70">({countAll})</span>
//           </button>
//           <button
//             onClick={() => setViewType("normal")}
//             className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${viewType === "normal" ? "bg-blue-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
//           >
//             Normal Registration <span className="ml-1.5 text-xs opacity-70">({countNormal})</span>
//           </button>
//           <button
//             onClick={() => setViewType("samar")}
//             className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${viewType === "samar" ? "bg-purple-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
//           >
//             <CheckCircle2 className="w-4 h-4" />
//             SAAMAR Tracker <span className="ml-0.5 text-xs opacity-70">({countSamar})</span>
//           </button>
//         </div>

//         {/* Results Section */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-bold text-slate-800">
//               Patient Records
//             </h2>
//             <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 shadow-sm">
//               {filtered.length} Records Found
//             </div>
//           </div>

//           <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
//             <div className="overflow-x-auto">
//               {filtered.length > 0 ? (
//                 <table className="min-w-full text-sm text-slate-700 border-collapse">
//                   <thead className="bg-slate-50 border-b border-slate-200">
//                     <tr className="uppercase tracking-wider text-xs font-bold text-slate-500">
//                       <th className="px-5 py-4 text-left">Record No</th>
//                       <th className="px-5 py-4 text-left">SAM No</th>
//                       <th className="px-5 py-4 text-left">Child Name</th>
//                       {/* ✅ Added Type Header */}
//                       <th className="px-5 py-4 text-left">Registration Type</th>
//                       <th className="px-5 py-4 text-left">Discharge Date</th>
//                       <th className="px-5 py-4 text-center">Follow-up 1</th>
//                       <th className="px-5 py-4 text-center">Follow-up 2</th>
//                       <th className="px-5 py-4 text-center">Follow-up 3</th>
//                       <th className="px-5 py-4 text-center">Follow-up 4</th>
//                       <th className="px-5 py-4 text-center">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-100">
//                     {filtered.map((record) => (
//                       <tr key={record.MTCCode} className="hover:bg-blue-50/50 transition-colors group">
//                         <td className="px-5 py-4 font-semibold text-slate-900">{record.MTCCode}</td>
//                         <td className="px-5 py-4">
//                           <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
//                             {record.SamNo}
//                           </span>
//                         </td>
//                         <td className="px-5 py-4 text-slate-800 font-bold">{record.ChildName}</td>

//                         {/* ✅ SAAMAR vs Normal Visual Badge */}
//                         <td className="px-5 py-4">
//                           {record.isSamarRegistered ? (
//                             <div className="flex flex-col">
//                               <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-purple-100 text-purple-700 w-max border border-purple-200">
//                                 SAAMAR
//                               </span>
//                               <span className="text-[10px] text-slate-400 mt-1 font-mono tracking-tighter" title="SAAMAR UUID">
//                                 {record.samarUuid || "No UUID"}
//                               </span>
//                             </div>
//                           ) : (
//                             <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-slate-100 text-slate-500 w-max border border-slate-200">
//                               Normal
//                             </span>
//                           )}
//                         </td>

//                         <td className="px-5 py-4 text-slate-500 font-medium">{record.DischargeDate}</td>
                        
//                         {/* Follow Up Status Cells */}
//                         {[record.FirstFollowUpDoneOn, record.SecondFollowUpDoneOn, record.ThirdFollowUpDoneOn, record.FourthFollowUpDoneOn].map((date, idx) => (
//                           <td key={idx} className="px-5 py-4 text-center">
//                             {date && date !== '-' ? (
//                               <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold shadow-sm">
//                                 {date}
//                               </span>
//                             ) : (
//                               <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-slate-50 text-slate-400 border border-slate-200 border-dashed text-xs font-medium">
//                                 Pending
//                               </span>
//                             )}
//                           </td>
//                         ))}

//                         <td className="px-5 py-4 text-center">
//                           <Button 
//                             size="sm" 
//                             className="bg-slate-900 hover:bg-blue-600 text-white shadow-sm transition-all w-full sm:w-auto"
//                             onClick={() => goToFollowUp(record.MTCCode)}
//                           >
//                             <Pencil className="h-4 w-4 mr-1.5" /> Update
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <div className="text-center py-16 px-4">
//                   <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
//                     <UserPlus className="h-8 w-8 text-blue-400" />
//                   </div>
//                   <h3 className="text-lg font-bold text-slate-800">No records found</h3>
//                   <p className="text-slate-500 mt-1 mb-6 text-sm max-w-sm mx-auto">We couldn&apos;t find any discharged patient records matching your current filter criteria.</p>
//                   <Button variant="outline" onClick={clearFilters} className="border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200">
//                     Clear all filters
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { 
  CalendarIcon, 
  Search, 
  Pencil, 
  UserPlus, 
  Home, 
  Loader2,
  RotateCcw,
  ClipboardList,
  CheckCircle2
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Interface matching the data structure
interface FollowUpRecord {
  SamNo: string;
  MTCCode: string;
  ChildName: string;
  DischargeDate: string;
  
  // Follow Up Dates (Scheduled / Done)
  FirstFollowUpDoneOn?: string;
  SecondFollowUpDoneOn?: string;
  ThirdFollowUpDoneOn?: string;
  FourthFollowUpDoneOn?: string;

  // ✅ SAAMAR Fields
  isSamarRegistered: boolean;
  samarUuid: string;
}

interface RawDischargedPatient {
  registration_id?: string | number;
  id?: string | number;
  sam_no?: string;
  child_full_name?: string;
  discharge_date?: string;
  is_samar_registered?: boolean;
  isSamarRegistered?: boolean;
  samar_uuid?: string;
  samarUuid?: string;
}

export default function FollowUpListPage() {
  const router = useRouter();
  
  // State
  const [records, setRecords] = useState<FollowUpRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState<FollowUpRecord[]>([]);

  // ✅ View Type State (Normal vs SAAMAR)
  const [viewType, setViewType] = useState<"all" | "normal" | "samar">("all");

  // Filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [recordNo, setRecordNo] = useState("");
  const [samNumber, setSamNumber] = useState("");
  const [childName, setChildName] = useState("");

  // 1. Load Live Database Data (Filtered by MTC Center)
  useEffect(() => {
    const fetchDischargedPatients = async () => {
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

        // ✅ 2. Pass the MTC ID to the backend via the URL
        const response = await fetch(`/api/discharged-patients${queryParams}`, { cache: 'no-store' });
        if (!response.ok) throw new Error("Failed to fetch");
        
        const dbData = await response.json() as RawDischargedPatient[];

        // Map the database response to your UI interface
        const liveRecords: FollowUpRecord[] = dbData.map((row) => ({
          MTCCode: row.registration_id?.toString() || row.id?.toString() || "N/A",
          SamNo: row.sam_no || "N/A",
          ChildName: row.child_full_name || "Unknown",
          DischargeDate: row.discharge_date ? new Date(row.discharge_date).toLocaleDateString('en-GB') : "N/A",
          
          // Placeholders until the Follow-Up database table is connected
          FirstFollowUpDoneOn: "-",
          SecondFollowUpDoneOn: "-",
          ThirdFollowUpDoneOn: "-",
          FourthFollowUpDoneOn: "-",

          // ✅ Map SAAMAR data from the database payload
          isSamarRegistered: row.is_samar_registered === true || row.isSamarRegistered === true,
          samarUuid: row.samar_uuid || row.samarUuid || "",
        }));

        setRecords(liveRecords);
        setFiltered(liveRecords);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load discharged patients.");
      } finally {
        setLoading(false);
      }
    };

    fetchDischargedPatients();
  }, []);

  // 2. Filter Logic
  useEffect(() => {
    let list = [...records];

    // ✅ Apply the Normal vs SAAMAR filter separation
    if (viewType === "normal") {
      list = list.filter(c => !c.isSamarRegistered);
    } else if (viewType === "samar") {
      list = list.filter(c => c.isSamarRegistered);
    }

    if (recordNo) {
      list = list.filter((c) =>
        c.MTCCode?.toLowerCase().includes(recordNo.toLowerCase())
      );
    }

    if (samNumber) {
      list = list.filter((c) =>
        c.SamNo.toLowerCase().includes(samNumber.toLowerCase())
      );
    }

    if (childName) {
      list = list.filter((c) =>
        c.ChildName.toLowerCase().includes(childName.toLowerCase())
      );
    }

    // Optional Date Filtering (Assuming DD/MM/YYYY format mapping)
    if (fromDate || toDate) {
      list = list.filter((c) => {
        if (!c.DischargeDate || c.DischargeDate === "N/A") return false;
        const [day, month, year] = c.DischargeDate.split('/');
        const dischargeTime = new Date(`${year}-${month}-${day}`).getTime();
        
        const fromTime = fromDate ? new Date(fromDate).getTime() : 0;
        const toTime = toDate ? new Date(toDate).getTime() : Infinity;

        return dischargeTime >= fromTime && dischargeTime <= toTime;
      });
    }

    setFiltered(list);
  }, [recordNo, samNumber, childName, fromDate, toDate, records, viewType]);

  const handleSearch = () => {
    toast.success("Filters applied successfully", {
      iconTheme: { primary: '#2563eb', secondary: '#fff' }
    });
  };

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setRecordNo("");
    setSamNumber("");
    setChildName("");
    setViewType("all"); // Reset tab
    setFiltered(records);
  };

  // 3. Navigation (Using MTCCode / Registration ID for accurate database routing)
  const goToFollowUp = (id: string) => {
    router.push(`/mtc-user/dashboard/follow-up/FollowUpDetails/${id}`);
  };

  // Derived counts for the tabs
  const countAll = records.length;
  const countNormal = records.filter(d => !d.isSamarRegistered).length;
  const countSamar = records.filter(d => d.isSamarRegistered).length;

  // --- RENDER ---

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
        <div className="text-center text-blue-700">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-3" />
          <p className="font-medium tracking-wide">Loading records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2.5 rounded-xl border border-blue-200 shadow-sm">
              <ClipboardList className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Follow Up List</h1>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Track and manage patient follow-ups</p>
            </div>
          </div>
          <Button 
            onClick={() => router.push("/mtc-user/dashboard/home")}
            variant="outline"
            className="border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm"
          >
            <Home className="mr-2 h-4 w-4" /> Dashboard
          </Button>
        </div>

        {/* Filters Card */}
        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5 px-6">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
              <Search className="h-4 w-4 text-blue-500" /> 
              Search & Filter
            </h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">From Date</label>
                <div className="relative">
                  <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 pr-8" />
                  <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">To Date</label>
                <div className="relative">
                  <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 pr-8" />
                  <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Record No</label>
                <Input value={recordNo} onChange={(e) => setRecordNo(e.target.value)} placeholder="e.g. REC-1042" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">SAM Number</label>
                <Input value={samNumber} onChange={(e) => setSamNumber(e.target.value)} placeholder="e.g. SAM/2026" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Child Name</label>
                <Input value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="e.g. Rahul" className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500" />
              </div>
              <div className="flex items-end gap-2 pt-2 lg:pt-0">
                <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white flex-1 shadow-sm transition-all">
                  <Search className="w-4 h-4" />
                </Button>
                <Button onClick={clearFilters} variant="outline" className="border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all shrink-0" title="Reset Filters">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ✅ SAAMAR Separation Tabs */}
        <div className="flex flex-wrap gap-2 items-center bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm w-max">
          <button
            onClick={() => setViewType("all")}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${viewType === "all" ? "bg-slate-800 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
          >
            All Patients <span className="ml-1.5 text-xs opacity-70">({countAll})</span>
          </button>
          <button
            onClick={() => setViewType("normal")}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${viewType === "normal" ? "bg-blue-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
          >
            Normal Registration <span className="ml-1.5 text-xs opacity-70">({countNormal})</span>
          </button>
          <button
            onClick={() => setViewType("samar")}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${viewType === "samar" ? "bg-purple-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
          >
            <CheckCircle2 className="w-4 h-4" />
            SAAMAR Tracker <span className="ml-0.5 text-xs opacity-70">({countSamar})</span>
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">
              Patient Records
            </h2>
            <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 shadow-sm">
              {filtered.length} Records Found
            </div>
          </div>

          <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
            <div className="overflow-x-auto">
              {filtered.length > 0 ? (
                <table className="min-w-full text-sm text-slate-700 border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="uppercase tracking-wider text-xs font-bold text-slate-500">
                      <th className="px-5 py-4 text-left">Record No</th>
                      <th className="px-5 py-4 text-left">SAM No</th>
                      <th className="px-5 py-4 text-left">Child Name</th>
                      {/* ✅ Added Type Header */}
                      <th className="px-5 py-4 text-left">Registration Type</th>
                      <th className="px-5 py-4 text-left">Discharge Date</th>
                      <th className="px-5 py-4 text-center">Follow-up 1</th>
                      <th className="px-5 py-4 text-center">Follow-up 2</th>
                      <th className="px-5 py-4 text-center">Follow-up 3</th>
                      <th className="px-5 py-4 text-center">Follow-up 4</th>
                      <th className="px-5 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((record) => (
                      <tr key={record.MTCCode} className="hover:bg-blue-50/50 transition-colors group">
                        <td className="px-5 py-4 font-semibold text-slate-900">{record.MTCCode}</td>
                        <td className="px-5 py-4">
                          <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                            {record.SamNo}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-slate-800 font-bold">{record.ChildName}</td>

                        {/* ✅ SAAMAR vs Normal Visual Badge */}
                        <td className="px-5 py-4">
                          {record.isSamarRegistered ? (
                            <div className="flex flex-col">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-purple-100 text-purple-700 w-max border border-purple-200">
                                SAAMAR
                              </span>
                              <span className="text-[10px] text-slate-400 mt-1 font-mono tracking-tighter" title="SAAMAR UUID">
                                {record.samarUuid || "No UUID"}
                              </span>
                            </div>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-slate-100 text-slate-500 w-max border border-slate-200">
                              Normal
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-slate-500 font-medium">{record.DischargeDate}</td>
                        
                        {/* Follow Up Status Cells */}
                        {[record.FirstFollowUpDoneOn, record.SecondFollowUpDoneOn, record.ThirdFollowUpDoneOn, record.FourthFollowUpDoneOn].map((date, idx) => (
                          <td key={idx} className="px-5 py-4 text-center">
                            {date && date !== '-' ? (
                              <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold shadow-sm">
                                {date}
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-slate-50 text-slate-400 border border-slate-200 border-dashed text-xs font-medium">
                                Pending
                              </span>
                            )}
                          </td>
                        ))}

                        <td className="px-5 py-4 text-center">
                          <Button 
                            size="sm" 
                            className="bg-slate-900 hover:bg-blue-600 text-white shadow-sm transition-all w-full sm:w-auto"
                            onClick={() => goToFollowUp(record.MTCCode)}
                          >
                            <Pencil className="h-4 w-4 mr-1.5" /> Update
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-16 px-4">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                    <UserPlus className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">No records found</h3>
                  <p className="text-slate-500 mt-1 mb-6 text-sm max-w-sm mx-auto">We couldn&apos;t find any discharged patient records matching your current filter criteria.</p>
                  <Button variant="outline" onClick={clearFilters} className="border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200">
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}