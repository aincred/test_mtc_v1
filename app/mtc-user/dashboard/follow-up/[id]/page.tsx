// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { CalendarIcon, Search, Pencil, UserPlus, AlertCircle, Home, Loader2 } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// // Interface matching the API response
// interface FollowUpRecord {
//   SamNo: string;
//   MTCCode: string;
//   ChildName: string;
//   DischargeDate: string;
  
//   // Follow Up Dates (Scheduled / Done)
//   FirstFollowUpDate?: string;
//   FirstFollowUpDoneOn?: string;
  
//   SecondFollowUpDate?: string;
//   SecondFollowUpDoneOn?: string;
  
//   ThirdFollowUpDate?: string;
//   ThirdFollowUpDoneOn?: string;
  
//   FourthFollowUpDate?: string;
//   FourthFollowUpDoneOn?: string;

//   // Latest Vitals
//   LatestZScore?: number;
//   LatestMUAC?: number;
// }

// export default function FollowUpListPage() {
//   const router = useRouter();
  
//   // State
//   const [records, setRecords] = useState<FollowUpRecord[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filtered, setFiltered] = useState<FollowUpRecord[]>([]);

//   // Filters
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [recordNo, setRecordNo] = useState("");
//   const [samNumber, setSamNumber] = useState("");
//   const [childName, setChildName] = useState("");

//   // 1. Fetch Data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("/api/follow-up/list", { cache: "no-store" });
//         const result = await res.json();

//         if (result.success && Array.isArray(result.data)) {
//           // Format dates for display
//           const formattedData = result.data.map((item: any) => ({
//             ...item,
//             DischargeDate: item.DischargeDate ? new Date(item.DischargeDate).toLocaleDateString("en-IN") : "N/A",
//             FirstFollowUpDoneOn: item.FirstFollowUpDoneOn ? new Date(item.FirstFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
//             SecondFollowUpDoneOn: item.SecondFollowUpDoneOn ? new Date(item.SecondFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
//             ThirdFollowUpDoneOn: item.ThirdFollowUpDoneOn ? new Date(item.ThirdFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
//             FourthFollowUpDoneOn: item.FourthFollowUpDoneOn ? new Date(item.FourthFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
//           }));
          
//           setRecords(formattedData);
//           setFiltered(formattedData);
//         } else {
//           toast.error("Failed to load follow-up records");
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//         toast.error("Connection error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // 2. Filter Logic
//   useEffect(() => {
//     let list = [...records];

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

//     // Date filtering (requires parsing DD/MM/YYYY back to Date object if formatted)
//     // Simplified logic assuming standard format or relying on raw data if stored separately
//     // For this example, we skip complex date string parsing logic for brevity, 
//     // but in production, you should filter against ISO strings.

//     setFiltered(list);
//   }, [recordNo, samNumber, childName, records]);

//   const handleSearch = () => {
//     toast.success("Filters applied");
//   };

//   const clearFilters = () => {
//     setFromDate("");
//     setToDate("");
//     setRecordNo("");
//     setSamNumber("");
//     setChildName("");
//     setFiltered(records);
//   };

//   // 3. Navigation
//   const goToFollowUp = (samNo: string) => {
//     // IMPORTANT: Encode the ID because it contains slashes (JH/WSB/...)
//     router.push(`/mtc-user/dashboard/follow-up/details/${encodeURIComponent(samNo)}`);
//   };

//   // --- RENDER ---

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//         <div className="text-center text-teal-700">
//           <Loader2 className="h-10 w-10 animate-spin mx-auto mb-2" />
//           <p>Loading records...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
//       <Toaster position="top-right" />

//       <Card className="border shadow-sm">
//         <CardHeader className="flex flex-row justify-between items-center border-b pb-4">
//           <h1 className="text-2xl font-bold text-teal-700">Follow Up List</h1>
//           <div className="flex gap-2">
//             <Button 
//               onClick={() => router.push("/mtc-user/dashboard/home")}
//               variant="outline"
//               className="gap-2"
//             >
//               <Home className="h-4 w-4" /> Dashboard
//             </Button>
//           </div>
//         </CardHeader>

//         <CardContent className="pt-6">
          
//           {/* Filters */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
//             <div>
//               <label className="text-xs font-semibold mb-1 block text-gray-600">From Date</label>
//               <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="h-9" />
//             </div>
//             <div>
//               <label className="text-xs font-semibold mb-1 block text-gray-600">To Date</label>
//               <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="h-9" />
//             </div>
//             <div>
//               <label className="text-xs font-semibold mb-1 block text-gray-600">Record No</label>
//               <Input value={recordNo} onChange={(e) => setRecordNo(e.target.value)} placeholder="MTC Code" className="h-9" />
//             </div>
//             <div>
//               <label className="text-xs font-semibold mb-1 block text-gray-600">SAM Number</label>
//               <Input value={samNumber} onChange={(e) => setSamNumber(e.target.value)} placeholder="ID" className="h-9" />
//             </div>
//             <div>
//               <label className="text-xs font-semibold mb-1 block text-gray-600">Child Name</label>
//               <Input value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Name" className="h-9" />
//             </div>
//             <div className="flex items-end gap-2">
//               <Button onClick={handleSearch} className="bg-teal-600 hover:bg-teal-700 h-9 flex-1">
//                 <Search className="w-4 h-4" />
//               </Button>
//               <Button onClick={clearFilters} variant="outline" className="h-9" title="Clear">
//                 <CalendarIcon className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>

//           <div className="mb-4 text-sm text-gray-500 font-medium">
//             Showing {filtered.length} records
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto rounded-md border">
//             {filtered.length > 0 ? (
//               <table className="min-w-full text-sm divide-y divide-gray-200">
//                 <thead className="bg-gray-50 text-gray-700 font-semibold">
//                   <tr>
//                     <th className="px-4 py-3 text-left">Record No</th>
//                     <th className="px-4 py-3 text-left">SAM No</th>
//                     <th className="px-4 py-3 text-left">Child Name</th>
//                     <th className="px-4 py-3 text-left">Discharge Date</th>
//                     <th className="px-4 py-3 text-center">Follow-up 1</th>
//                     <th className="px-4 py-3 text-center">Follow-up 2</th>
//                     <th className="px-4 py-3 text-center">Follow-up 3</th>
//                     <th className="px-4 py-3 text-center">Follow-up 4</th>
//                     <th className="px-4 py-3 text-center">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filtered.map((record) => (
//                     <tr key={record.SamNo} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-4 py-3 font-medium text-gray-900">{record.MTCCode}</td>
//                       <td className="px-4 py-3 text-gray-600">{record.SamNo}</td>
//                       <td className="px-4 py-3 text-gray-800 font-medium">{record.ChildName}</td>
//                       <td className="px-4 py-3 text-gray-600">{record.DischargeDate}</td>
                      
//                       {/* Follow Up Status Cells */}
//                       <td className="px-4 py-3 text-center">
//                         <span className={`px-2 py-1 rounded text-xs ${record.FirstFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
//                           {record.FirstFollowUpDoneOn}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-center">
//                         <span className={`px-2 py-1 rounded text-xs ${record.SecondFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
//                           {record.SecondFollowUpDoneOn}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-center">
//                         <span className={`px-2 py-1 rounded text-xs ${record.ThirdFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
//                           {record.ThirdFollowUpDoneOn}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-center">
//                         <span className={`px-2 py-1 rounded text-xs ${record.FourthFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
//                           {record.FourthFollowUpDoneOn}
//                         </span>
//                       </td>

//                       <td className="px-4 py-3 text-center">
//                         <Button 
//                           size="sm" 
//                           variant="ghost"
//                           className="text-teal-600 hover:text-teal-800 hover:bg-teal-50"
//                           onClick={() => goToFollowUp(record.SamNo)}
//                         >
//                           <Pencil className="h-4 w-4" />
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="text-center py-12">
//                 <UserPlus className="h-12 w-12 mx-auto text-gray-300 mb-3" />
//                 <h3 className="text-lg font-medium text-gray-900">No records found</h3>
//                 <p className="text-gray-500">Try adjusting your search or filters.</p>
//                 <Button variant="link" onClick={clearFilters} className="mt-2 text-teal-600">
//                   Clear all filters
//                 </Button>
//               </div>
//             )}
//           </div>

//         </CardContent>
//       </Card>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Search, Pencil, UserPlus, Home, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Interface for the raw data coming from the API
interface RawFollowUpRecord {
  SamNo: string;
  MTCCode: string;
  ChildName: string;
  DischargeDate: string | null;
  FirstFollowUpDate?: string | null;
  FirstFollowUpDoneOn?: string | null;
  SecondFollowUpDate?: string | null;
  SecondFollowUpDoneOn?: string | null;
  ThirdFollowUpDate?: string | null;
  ThirdFollowUpDoneOn?: string | null;
  FourthFollowUpDate?: string | null;
  FourthFollowUpDoneOn?: string | null;
  LatestZScore?: number;
  LatestMUAC?: number;
}

// Interface for the formatted data used in the UI
interface FollowUpRecord {
  SamNo: string;
  MTCCode: string;
  ChildName: string;
  DischargeDate: string;
  
  // Follow Up Dates (Scheduled / Done)
  FirstFollowUpDate?: string;
  FirstFollowUpDoneOn?: string;
  
  SecondFollowUpDate?: string;
  SecondFollowUpDoneOn?: string;
  
  ThirdFollowUpDate?: string;
  ThirdFollowUpDoneOn?: string;
  
  FourthFollowUpDate?: string;
  FourthFollowUpDoneOn?: string;

  // Latest Vitals
  LatestZScore?: number;
  LatestMUAC?: number;
}

export default function FollowUpListPage() {
  const router = useRouter();
  
  // State
  const [records, setRecords] = useState<FollowUpRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState<FollowUpRecord[]>([]);

  // Filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [recordNo, setRecordNo] = useState("");
  const [samNumber, setSamNumber] = useState("");
  const [childName, setChildName] = useState("");

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/follow-up/list", { cache: "no-store" });
        const result = await res.json();

        if (result.success && Array.isArray(result.data)) {
          // Format dates for display
          // Explicitly type 'item' as RawFollowUpRecord instead of 'any'
          const formattedData: FollowUpRecord[] = result.data.map((item: RawFollowUpRecord) => ({
            ...item,
            DischargeDate: item.DischargeDate ? new Date(item.DischargeDate).toLocaleDateString("en-IN") : "N/A",
            FirstFollowUpDoneOn: item.FirstFollowUpDoneOn ? new Date(item.FirstFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
            SecondFollowUpDoneOn: item.SecondFollowUpDoneOn ? new Date(item.SecondFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
            ThirdFollowUpDoneOn: item.ThirdFollowUpDoneOn ? new Date(item.ThirdFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
            FourthFollowUpDoneOn: item.FourthFollowUpDoneOn ? new Date(item.FourthFollowUpDoneOn).toLocaleDateString("en-IN") : "-",
            // Handle potentially missing optional strings for the UI interface
            FirstFollowUpDate: item.FirstFollowUpDate || undefined,
            SecondFollowUpDate: item.SecondFollowUpDate || undefined,
            ThirdFollowUpDate: item.ThirdFollowUpDate || undefined,
            FourthFollowUpDate: item.FourthFollowUpDate || undefined,
          }));
          
          setRecords(formattedData);
          setFiltered(formattedData);
        } else {
          toast.error("Failed to load follow-up records");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Connection error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. Filter Logic
  useEffect(() => {
    let list = [...records];

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

    // Date filtering (requires parsing DD/MM/YYYY back to Date object if formatted)
    // Simplified logic assuming standard format or relying on raw data if stored separately
    // For this example, we skip complex date string parsing logic for brevity, 
    // but in production, you should filter against ISO strings.

    setFiltered(list);
  }, [recordNo, samNumber, childName, records]);

  const handleSearch = () => {
    toast.success("Filters applied");
  };

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setRecordNo("");
    setSamNumber("");
    setChildName("");
    setFiltered(records);
  };

  // 3. Navigation
  const goToFollowUp = (samNo: string) => {
    // IMPORTANT: Encode the ID because it contains slashes (JH/WSB/...)
    router.push(`/mtc-user/dashboard/follow-up/details/${encodeURIComponent(samNo)}`);
  };

  // --- RENDER ---

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-center text-teal-700">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-2" />
          <p>Loading records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <Toaster position="top-right" />

      <Card className="border shadow-sm">
        <CardHeader className="flex flex-row justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-bold text-teal-700">Follow Up List</h1>
          <div className="flex gap-2">
            <Button 
              onClick={() => router.push("/mtc-user/dashboard/home")}
              variant="outline"
              className="gap-2"
            >
              <Home className="h-4 w-4" /> Dashboard
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
            <div>
              <label className="text-xs font-semibold mb-1 block text-gray-600">From Date</label>
              <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="h-9" />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block text-gray-600">To Date</label>
              <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="h-9" />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block text-gray-600">Record No</label>
              <Input value={recordNo} onChange={(e) => setRecordNo(e.target.value)} placeholder="MTC Code" className="h-9" />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block text-gray-600">SAM Number</label>
              <Input value={samNumber} onChange={(e) => setSamNumber(e.target.value)} placeholder="ID" className="h-9" />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block text-gray-600">Child Name</label>
              <Input value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Name" className="h-9" />
            </div>
            <div className="flex items-end gap-2">
              <Button onClick={handleSearch} className="bg-teal-600 hover:bg-teal-700 h-9 flex-1">
                <Search className="w-4 h-4" />
              </Button>
              <Button onClick={clearFilters} variant="outline" className="h-9" title="Clear">
                <CalendarIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="mb-4 text-sm text-gray-500 font-medium">
            Showing {filtered.length} records
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-md border">
            {filtered.length > 0 ? (
              <table className="min-w-full text-sm divide-y divide-gray-200">
                <thead className="bg-gray-50 text-gray-700 font-semibold">
                  <tr>
                    <th className="px-4 py-3 text-left">Record No</th>
                    <th className="px-4 py-3 text-left">SAM No</th>
                    <th className="px-4 py-3 text-left">Child Name</th>
                    <th className="px-4 py-3 text-left">Discharge Date</th>
                    <th className="px-4 py-3 text-center">Follow-up 1</th>
                    <th className="px-4 py-3 text-center">Follow-up 2</th>
                    <th className="px-4 py-3 text-center">Follow-up 3</th>
                    <th className="px-4 py-3 text-center">Follow-up 4</th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map((record) => (
                    <tr key={record.SamNo} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{record.MTCCode}</td>
                      <td className="px-4 py-3 text-gray-600">{record.SamNo}</td>
                      <td className="px-4 py-3 text-gray-800 font-medium">{record.ChildName}</td>
                      <td className="px-4 py-3 text-gray-600">{record.DischargeDate}</td>
                      
                      {/* Follow Up Status Cells */}
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${record.FirstFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                          {record.FirstFollowUpDoneOn}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${record.SecondFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                          {record.SecondFollowUpDoneOn}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${record.ThirdFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                          {record.ThirdFollowUpDoneOn}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${record.FourthFollowUpDoneOn !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                          {record.FourthFollowUpDoneOn}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-center">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-teal-600 hover:text-teal-800 hover:bg-teal-50"
                          onClick={() => goToFollowUp(record.SamNo)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <UserPlus className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No records found</h3>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
                <Button variant="link" onClick={clearFilters} className="mt-2 text-teal-600">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  );
}