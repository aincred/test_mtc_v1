// // // // // // "use client";

// // // // // // import { useState, useEffect } from "react";
// // // // // // import { useRouter } from "next/navigation";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // // Removed Trash2 from imports
// // // // // // import { CalendarIcon, Plus, Search, Pencil, Home } from "lucide-react";
// // // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // interface Child {
// // // // // //   id: string;
// // // // // //   recordNo: string;
// // // // // //   samNumber: string;
// // // // // //   childName: string;
// // // // // //   parentName: string;
// // // // // //   dateOfBirth: string;
// // // // // //   admissionWeight: string;
// // // // // //   admissionHeight: string;
// // // // // //   createdAt: string;
// // // // // // }

// // // // // // export default function ChildRegistrationPage() {
// // // // // //   const router = useRouter();

// // // // // //   const [fromDate, setFromDate] = useState("");
// // // // // //   const [toDate, setToDate] = useState("");
// // // // // //   const [recordNo, setRecordNo] = useState("");
// // // // // //   const [samNumber, setSamNumber] = useState("");
// // // // // //   const [childName, setChildName] = useState("");
// // // // // //   const [data, setData] = useState<Child[]>([]);
// // // // // //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// // // // // //   // Load data from localStorage on component mount
// // // // // //   useEffect(() => {
// // // // // //     const storedChildren = localStorage.getItem('registeredChildren');
// // // // // //     if (storedChildren) {
// // // // // //       const parsedChildren = JSON.parse(storedChildren);
// // // // // //       setData(parsedChildren);
// // // // // //       setFilteredData(parsedChildren);
// // // // // //     } else {
// // // // // //       // Initialize with empty arrays when no data exists
// // // // // //       setData([]);
// // // // // //       setFilteredData([]);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   // Filter data based on search criteria
// // // // // //   useEffect(() => {
// // // // // //     let filtered = [...data];
    
// // // // // //     if (recordNo) {
// // // // // //       filtered = filtered.filter(child => 
// // // // // //         child.recordNo.toLowerCase().includes(recordNo.toLowerCase())
// // // // // //       );
// // // // // //     }
    
// // // // // //     if (samNumber) {
// // // // // //       filtered = filtered.filter(child => 
// // // // // //         child.samNumber.toLowerCase().includes(samNumber.toLowerCase())
// // // // // //       );
// // // // // //     }
    
// // // // // //     if (childName) {
// // // // // //       filtered = filtered.filter(child => 
// // // // // //         child.childName.toLowerCase().includes(childName.toLowerCase())
// // // // // //       );
// // // // // //     }
    
// // // // // //     if (fromDate) {
// // // // // //       filtered = filtered.filter(child => {
// // // // // //         const childDate = new Date(child.createdAt);
// // // // // //         const filterDate = new Date(fromDate);
// // // // // //         return childDate >= filterDate;
// // // // // //       });
// // // // // //     }
    
// // // // // //     if (toDate) {
// // // // // //       filtered = filtered.filter(child => {
// // // // // //         const childDate = new Date(child.createdAt);
// // // // // //         const filterDate = new Date(toDate);
// // // // // //         filterDate.setHours(23, 59, 59, 999); // Include entire day
// // // // // //         return childDate <= filterDate;
// // // // // //       });
// // // // // //     }
    
// // // // // //     setFilteredData(filtered);
// // // // // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // // // // //   const handleSearch = () => {
// // // // // //     toast.success("Search applied successfully!");
// // // // // //   };

// // // // // //   // 🔹 Redirect to Add Child form
// // // // // //   const handleAdd = () => {
// // // // // //     router.push("/mtc-user/dashboard/child-registration/add-child");
// // // // // //   };

// // // // // //   // 🔹 Redirect to Home page
// // // // // //   const handleBackToHome = () => {
// // // // // //     router.push("/mtc-user/dashboard/home");
// // // // // //   };

// // // // // //   // 🔹 Redirect to Edit Child form
// // // // // //   const handleEdit = (id: string) => {
// // // // // //     router.push(`/mtc-user/dashboard/child-registration/edit-child/${id}`);
// // // // // //   };

// // // // // //   // REMOVED: handleDelete function

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // // // // //       <Toaster position="top-right" />

// // // // // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // // // // //         {/* Header */}
// // // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // // // // //             Child Registration
// // // // // //           </h1>
// // // // // //           <div className="flex gap-2 sm:gap-3">
// // // // // //             <Button
// // // // // //               onClick={handleBackToHome}
// // // // // //               variant="outline"
// // // // // //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// // // // // //             >
// // // // // //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // // // // //               <span className="hidden sm:inline">Back to Home</span>
// // // // // //               <span className="sm:hidden">Home</span>
// // // // // //             </Button>
// // // // // //             <Button
// // // // // //               onClick={handleAdd}
// // // // // //               className="bg-indigo-600 hover:bg-indigo-700 transition text-xs sm:text-sm"
// // // // // //             >
// // // // // //               <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // // // // //               <span className="hidden sm:inline">Add Child</span>
// // // // // //               <span className="sm:hidden">Add</span>
// // // // // //             </Button>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Filters Section */}
// // // // // //         <Card className="shadow-sm border border-gray-200">
// // // // // //           <CardContent className="pt-4 sm:pt-6">
// // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
// // // // // //               <div>
// // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // // //                   From Date
// // // // // //                 </label>
// // // // // //                 <div className="relative">
// // // // // //                   <Input
// // // // // //                     type="date"
// // // // // //                     value={fromDate}
// // // // // //                     onChange={(e) => setFromDate(e.target.value)}
// // // // // //                     className="pr-8 sm:pr-10 text-xs sm:text-sm"
// // // // // //                   />
// // // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div>
// // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // // //                   To Date
// // // // // //                 </label>
// // // // // //                 <div className="relative">
// // // // // //                   <Input
// // // // // //                     type="date"
// // // // // //                     value={toDate}
// // // // // //                     onChange={(e) => setToDate(e.target.value)}
// // // // // //                     className="pr-8 sm:pr-10 text-xs sm:text-sm"
// // // // // //                   />
// // // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div>
// // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // // //                   Record No
// // // // // //                 </label>
// // // // // //                 <Input
// // // // // //                   placeholder="Enter Record No"
// // // // // //                   value={recordNo}
// // // // // //                   onChange={(e) => setRecordNo(e.target.value)}
// // // // // //                   className="text-xs sm:text-sm"
// // // // // //                 />
// // // // // //               </div>

// // // // // //               <div>
// // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // // //                   SAM Number
// // // // // //                 </label>
// // // // // //                 <Input
// // // // // //                   placeholder="Enter SAM Number"
// // // // // //                   value={samNumber}
// // // // // //                   onChange={(e) => setSamNumber(e.target.value)}
// // // // // //                   className="text-xs sm:text-sm"
// // // // // //                 />
// // // // // //               </div>

// // // // // //               <div>
// // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // // //                   Child Name
// // // // // //                 </label>
// // // // // //                 <div className="flex gap-2">
// // // // // //                   <Input
// // // // // //                     placeholder="Enter Child Name"
// // // // // //                     value={childName}
// // // // // //                     onChange={(e) => setChildName(e.target.value)}
// // // // // //                     className="text-xs sm:text-sm"
// // // // // //                   />
// // // // // //                   <Button
// // // // // //                     onClick={handleSearch}
// // // // // //                     className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3"
// // // // // //                   >
// // // // // //                     <Search className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // //                   </Button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </CardContent>
// // // // // //         </Card>

// // // // // //         {/* Table Section */}
// // // // // //         <Card className="shadow-sm border border-gray-200">
// // // // // //           <CardHeader className="pb-2 sm:pb-4">
// // // // // //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// // // // // //               Registered Children
// // // // // //             </h2>
// // // // // //           </CardHeader>

// // // // // //           <CardContent>
// // // // // //             <div className="overflow-x-auto rounded-lg">
// // // // // //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // // // // //                 <thead>
// // // // // //                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Record No</th>
// // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">SAM Number</th>
// // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Child Name</th>
// // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden sm:table-cell">Parent Name</th>
// // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden md:table-cell">Date of Birth</th>
// // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
// // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Height</th>
// // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Actions</th>
// // // // // //                   </tr>
// // // // // //                 </thead>
// // // // // //                 <tbody>
// // // // // //                   {filteredData.length > 0 ? (
// // // // // //                     filteredData.map((child, i) => (
// // // // // //                       <tr
// // // // // //                         key={child.id}
// // // // // //                         className={`${
// // // // // //                           i % 2 === 0 ? "bg-white" : "bg-gray-50"
// // // // // //                         } hover:bg-indigo-50 transition`}
// // // // // //                       >
// // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.recordNo}</td>
// // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.samNumber}</td>
// // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{child.childName}</td>
// // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">{child.parentName}</td>
// // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">{child.dateOfBirth}</td>
// // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionWeight}</td>
// // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionHeight}</td>
// // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
// // // // // //                           <div className="flex justify-center gap-1 sm:gap-2">
// // // // // //                             <Button
// // // // // //                               variant="outline"
// // // // // //                               size="sm"
// // // // // //                               className="border-indigo-600 text-indigo-700 hover:bg-indigo-100 p-1 sm:p-2"
// // // // // //                               onClick={() => handleEdit(child.id)}
// // // // // //                             >
// // // // // //                               <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
// // // // // //                             </Button>
// // // // // //                             {/* REMOVED: Delete Button */}
// // // // // //                           </div>
// // // // // //                         </td>
// // // // // //                       </tr>
// // // // // //                     ))
// // // // // //                   ) : (
// // // // // //                     <tr>
// // // // // //                       <td colSpan={8} className="py-8 text-center text-gray-500 text-xs sm:text-sm">
// // // // // //                         <div className="flex flex-col items-center">
// // // // // //                           <div className="mb-2">
// // // // // //                             <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// // // // // //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
// // // // // //                             </svg>
// // // // // //                           </div>
// // // // // //                           <p className="font-medium">No children registered yet</p>
// // // // // //                           <p className="mt-1">Click &quot;Add Child&quot; button to register your first child</p>
// // // // // //                         </div>
// // // // // //                       </td>
// // // // // //                     </tr>
// // // // // //                   )}
// // // // // //                 </tbody>
// // // // // //               </table>
// // // // // //             </div>
// // // // // //           </CardContent>
// // // // // //         </Card>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // // "use client";

// // // // // // // import { useState, useEffect } from "react";
// // // // // // // import { useRouter } from "next/navigation";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // // import { CalendarIcon, Plus, Search, Pencil, Home, Loader2 } from "lucide-react";
// // // // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // // // Interface matches the mapped data from our API
// // // // // // // interface Child {
// // // // // // //   id: string;
// // // // // // //   recordNo: string;
// // // // // // //   samNumber: string;
// // // // // // //   childName: string;
// // // // // // //   parentName: string;
// // // // // // //   dateOfBirth: string;
// // // // // // //   admissionWeight: string;
// // // // // // //   admissionHeight: string;
// // // // // // //   createdAt: string; // ISO Date string from DB AdmissionDate
// // // // // // // }

// // // // // // // export default function ChildRegistrationPage() {
// // // // // // //   const router = useRouter();

// // // // // // //   // Filter States
// // // // // // //   const [fromDate, setFromDate] = useState("");
// // // // // // //   const [toDate, setToDate] = useState("");
// // // // // // //   const [recordNo, setRecordNo] = useState("");
// // // // // // //   const [samNumber, setSamNumber] = useState("");
// // // // // // //   const [childName, setChildName] = useState("");

// // // // // // //   // Data States
// // // // // // //   const [data, setData] = useState<Child[]>([]);
// // // // // // //   const [filteredData, setFilteredData] = useState<Child[]>([]);
// // // // // // //   const [isLoading, setIsLoading] = useState(true);

// // // // // // //   // 1. Fetch Data from API on Mount
// // // // // // //   useEffect(() => {
// // // // // // //     const fetchChildren = async () => {
// // // // // // //       try {
// // // // // // //         setIsLoading(true);
// // // // // // //         const response = await fetch("/api/children");
        
// // // // // // //         if (!response.ok) {
// // // // // // //           throw new Error("Failed to fetch data");
// // // // // // //         }

// // // // // // //         const result = await response.json();
// // // // // // //         setData(result);
// // // // // // //         setFilteredData(result);
// // // // // // //       } catch (error) {
// // // // // // //         console.error(error);
// // // // // // //         toast.error("Could not load children data");
// // // // // // //       } finally {
// // // // // // //         setIsLoading(false);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchChildren();
// // // // // // //   }, []);

// // // // // // //   // 2. Filter Logic (Runs whenever filters or data change)
// // // // // // //   useEffect(() => {
// // // // // // //     let filtered = [...data];
    
// // // // // // //     if (recordNo) {
// // // // // // //       filtered = filtered.filter(child => 
// // // // // // //         child.recordNo.toLowerCase().includes(recordNo.toLowerCase())
// // // // // // //       );
// // // // // // //     }
    
// // // // // // //     if (samNumber) {
// // // // // // //       filtered = filtered.filter(child => 
// // // // // // //         child.samNumber.toLowerCase().includes(samNumber.toLowerCase())
// // // // // // //       );
// // // // // // //     }
    
// // // // // // //     if (childName) {
// // // // // // //       filtered = filtered.filter(child => 
// // // // // // //         child.childName.toLowerCase().includes(childName.toLowerCase())
// // // // // // //       );
// // // // // // //     }
    
// // // // // // //     if (fromDate) {
// // // // // // //       filtered = filtered.filter(child => {
// // // // // // //         const childDate = new Date(child.createdAt);
// // // // // // //         const filterDate = new Date(fromDate);
// // // // // // //         return childDate >= filterDate;
// // // // // // //       });
// // // // // // //     }
    
// // // // // // //     if (toDate) {
// // // // // // //       filtered = filtered.filter(child => {
// // // // // // //         const childDate = new Date(child.createdAt);
// // // // // // //         const filterDate = new Date(toDate);
// // // // // // //         filterDate.setHours(23, 59, 59, 999);
// // // // // // //         return childDate <= filterDate;
// // // // // // //       });
// // // // // // //     }
    
// // // // // // //     setFilteredData(filtered);
// // // // // // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // // // // // //   const handleSearch = () => {
// // // // // // //     toast.success("Search filters applied!");
// // // // // // //   };

// // // // // // //   const handleAdd = () => router.push("/mtc-user/dashboard/child-registration/add-child");
// // // // // // //   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
// // // // // // //   const handleEdit = (id: string) => router.push(`/mtc-user/dashboard/child-registration/edit-child/${encodeURIComponent(id)}`);

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // // // // // //       <Toaster position="top-right" />

// // // // // // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // // // // // //         {/* Header */}
// // // // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // // // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // // // // // //             Child Registration
// // // // // // //           </h1>
// // // // // // //           <div className="flex gap-2 sm:gap-3">
// // // // // // //             <Button
// // // // // // //               onClick={handleBackToHome}
// // // // // // //               variant="outline"
// // // // // // //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// // // // // // //             >
// // // // // // //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // // // // // //               <span className="hidden sm:inline">Back to Home</span>
// // // // // // //               <span className="sm:hidden">Home</span>
// // // // // // //             </Button>
// // // // // // //             <Button
// // // // // // //               onClick={handleAdd}
// // // // // // //               className="bg-indigo-600 hover:bg-indigo-700 transition text-xs sm:text-sm"
// // // // // // //             >
// // // // // // //               <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // // // // // //               <span className="hidden sm:inline">Add Child</span>
// // // // // // //               <span className="sm:hidden">Add</span>
// // // // // // //             </Button>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* Filters Section */}
// // // // // // //         <Card className="shadow-sm border border-gray-200">
// // // // // // //           <CardContent className="pt-4 sm:pt-6">
// // // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
// // // // // // //               <div>
// // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">From Date</label>
// // // // // // //                 <div className="relative">
// // // // // // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// // // // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               <div>
// // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">To Date</label>
// // // // // // //                 <div className="relative">
// // // // // // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// // // // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               <div>
// // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Record No</label>
// // // // // // //                 <Input placeholder="Enter Record No" value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="text-xs sm:text-sm" />
// // // // // // //               </div>

// // // // // // //               <div>
// // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">SAM Number</label>
// // // // // // //                 <Input placeholder="Enter SAM Number" value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="text-xs sm:text-sm" />
// // // // // // //               </div>

// // // // // // //               <div>
// // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Child Name</label>
// // // // // // //                 <div className="flex gap-2">
// // // // // // //                   <Input placeholder="Enter Child Name" value={childName} onChange={(e) => setChildName(e.target.value)} className="text-xs sm:text-sm" />
// // // // // // //                   <Button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3">
// // // // // // //                     <Search className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // // //                   </Button>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </CardContent>
// // // // // // //         </Card>

// // // // // // //         {/* Table Section */}
// // // // // // //         <Card className="shadow-sm border border-gray-200">
// // // // // // //           <CardHeader className="pb-2 sm:pb-4">
// // // // // // //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Registered Children</h2>
// // // // // // //           </CardHeader>

// // // // // // //           <CardContent>
// // // // // // //             <div className="overflow-x-auto rounded-lg">
// // // // // // //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // // // // // //                 <thead>
// // // // // // //                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Record No</th>
// // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">SAM Number</th>
// // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Child Name</th>
// // // // // // //                     {/* FIXED: Escaped the apostrophe in Mother's Name */}
// // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden sm:table-cell">Mother&apos;s Name</th>
// // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden md:table-cell">Date of Birth</th>
// // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
// // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Height</th>
// // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Actions</th>
// // // // // // //                   </tr>
// // // // // // //                 </thead>
// // // // // // //                 <tbody>
// // // // // // //                   {isLoading ? (
// // // // // // //                     <tr>
// // // // // // //                       <td colSpan={8} className="py-8 text-center text-gray-500">
// // // // // // //                         <div className="flex flex-col items-center justify-center">
// // // // // // //                           <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mb-2" />
// // // // // // //                           <p>Loading records...</p>
// // // // // // //                         </div>
// // // // // // //                       </td>
// // // // // // //                     </tr>
// // // // // // //                   ) : filteredData.length > 0 ? (
// // // // // // //                     filteredData.map((child, i) => (
// // // // // // //                       <tr key={child.id} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition`}>
// // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.recordNo}</td>
// // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.samNumber}</td>
// // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{child.childName}</td>
// // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">{child.parentName}</td>
// // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">{child.dateOfBirth}</td>
// // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionWeight} kg</td>
// // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionHeight} cm</td>
// // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
// // // // // // //                           <div className="flex justify-center gap-1 sm:gap-2">
// // // // // // //                             <Button
// // // // // // //                               variant="outline"
// // // // // // //                               size="sm"
// // // // // // //                               className="border-indigo-600 text-indigo-700 hover:bg-indigo-100 p-1 sm:p-2"
// // // // // // //                               onClick={() => handleEdit(child.id)}
// // // // // // //                             >
// // // // // // //                               <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
// // // // // // //                             </Button>
// // // // // // //                           </div>
// // // // // // //                         </td>
// // // // // // //                       </tr>
// // // // // // //                     ))
// // // // // // //                   ) : (
// // // // // // //                     <tr>
// // // // // // //                       <td colSpan={8} className="py-8 text-center text-gray-500 text-xs sm:text-sm">
// // // // // // //                         <div className="flex flex-col items-center">
// // // // // // //                           <p className="font-medium">No children found</p>
// // // // // // //                           <p className="mt-1">Try adjusting your filters or add a new child.</p>
// // // // // // //                         </div>
// // // // // // //                       </td>
// // // // // // //                     </tr>
// // // // // // //                   )}
// // // // // // //                 </tbody>
// // // // // // //               </table>
// // // // // // //             </div>
// // // // // // //           </CardContent>
// // // // // // //         </Card>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }


// // // // // "use client";

// // // // // import { useState, useEffect } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // import { CalendarIcon, Plus, Search, Pencil, Home } from "lucide-react";
// // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // interface Child {
// // // // //   id: string;
// // // // //   recordNo: string;
// // // // //   samNumber: string;
// // // // //   childName: string;
// // // // //   parentName: string;
// // // // //   dateOfBirth: string;
// // // // //   admissionWeight: string;
// // // // //   admissionHeight: string;
// // // // //   createdAt: string;
// // // // // }

// // // // // // 🔹 Dummy data to show patients locally if nothing has been registered yet
// // // // // const DUMMY_PATIENTS: Child[] = [
// // // // //   {
// // // // //     id: "1",
// // // // //     recordNo: "105822",
// // // // //     samNumber: "JH/WSB/CBS/4092",
// // // // //     childName: "Aarav Kumar",
// // // // //     parentName: "Rahul Kumar",
// // // // //     dateOfBirth: "2024-01-15",
// // // // //     admissionWeight: "4.2",
// // // // //     admissionHeight: "62.5",
// // // // //     createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
// // // // //   },
// // // // //   {
// // // // //     id: "2",
// // // // //     recordNo: "105823",
// // // // //     samNumber: "JH/WSB/CBS/8173",
// // // // //     childName: "Priya Singh",
// // // // //     parentName: "Amit Singh",
// // // // //     dateOfBirth: "2023-11-20",
// // // // //     admissionWeight: "5.1",
// // // // //     admissionHeight: "68.0",
// // // // //     createdAt: new Date().toISOString(), // Today
// // // // //   }
// // // // // ];

// // // // // export default function ChildRegistrationPage() {
// // // // //   const router = useRouter();

// // // // //   const [fromDate, setFromDate] = useState("");
// // // // //   const [toDate, setToDate] = useState("");
// // // // //   const [recordNo, setRecordNo] = useState("");
// // // // //   const [samNumber, setSamNumber] = useState("");
// // // // //   const [childName, setChildName] = useState("");
// // // // //   const [data, setData] = useState<Child[]>([]);
// // // // //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// // // // //   // 🔹 Load data from localStorage or inject dummy data on component mount
// // // // //   useEffect(() => {
// // // // //     const storedChildren = localStorage.getItem('registeredChildren');
    
// // // // //     if (storedChildren && JSON.parse(storedChildren).length > 0) {
// // // // //       const parsedChildren = JSON.parse(storedChildren);
// // // // //       setData(parsedChildren);
// // // // //       setFilteredData(parsedChildren);
// // // // //     } else {
// // // // //       // If empty, set the dummy patients to local storage and state
// // // // //       localStorage.setItem('registeredChildren', JSON.stringify(DUMMY_PATIENTS));
// // // // //       setData(DUMMY_PATIENTS);
// // // // //       setFilteredData(DUMMY_PATIENTS);
// // // // //     }
// // // // //   }, []);

// // // // //   // Filter data based on search criteria
// // // // //   useEffect(() => {
// // // // //     let filtered = [...data];
    
// // // // //     if (recordNo) {
// // // // //       filtered = filtered.filter(child => 
// // // // //         child.recordNo.toLowerCase().includes(recordNo.toLowerCase())
// // // // //       );
// // // // //     }
    
// // // // //     if (samNumber) {
// // // // //       filtered = filtered.filter(child => 
// // // // //         child.samNumber.toLowerCase().includes(samNumber.toLowerCase())
// // // // //       );
// // // // //     }
    
// // // // //     if (childName) {
// // // // //       filtered = filtered.filter(child => 
// // // // //         child.childName.toLowerCase().includes(childName.toLowerCase())
// // // // //       );
// // // // //     }
    
// // // // //     if (fromDate) {
// // // // //       filtered = filtered.filter(child => {
// // // // //         const childDate = new Date(child.createdAt);
// // // // //         const filterDate = new Date(fromDate);
// // // // //         return childDate >= filterDate;
// // // // //       });
// // // // //     }
    
// // // // //     if (toDate) {
// // // // //       filtered = filtered.filter(child => {
// // // // //         const childDate = new Date(child.createdAt);
// // // // //         const filterDate = new Date(toDate);
// // // // //         filterDate.setHours(23, 59, 59, 999); // Include entire day
// // // // //         return childDate <= filterDate;
// // // // //       });
// // // // //     }
    
// // // // //     setFilteredData(filtered);
// // // // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // // // //   const handleSearch = () => {
// // // // //     toast.success("Search applied successfully!");
// // // // //   };

// // // // //   const handleAdd = () => {
// // // // //     router.push("/mtc-user/dashboard/child-registration/add-child");
// // // // //   };

// // // // //   const handleBackToHome = () => {
// // // // //     router.push("/mtc-user/dashboard/home");
// // // // //   };

// // // // //   const handleEdit = (id: string) => {
// // // // //     router.push(`/mtc-user/dashboard/child-registration/edit-child/${id}`);
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // // // //       <Toaster position="top-right" />

// // // // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // // // //         {/* Header */}
// // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // // // //             Child Registration
// // // // //           </h1>
// // // // //           <div className="flex gap-2 sm:gap-3">
// // // // //             <Button
// // // // //               onClick={handleBackToHome}
// // // // //               variant="outline"
// // // // //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// // // // //             >
// // // // //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // // // //               <span className="hidden sm:inline">Back to Home</span>
// // // // //               <span className="sm:hidden">Home</span>
// // // // //             </Button>
// // // // //             <Button
// // // // //               onClick={handleAdd}
// // // // //               className="bg-indigo-600 hover:bg-indigo-700 transition text-xs sm:text-sm"
// // // // //             >
// // // // //               <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // // // //               <span className="hidden sm:inline">Add Child</span>
// // // // //               <span className="sm:hidden">Add</span>
// // // // //             </Button>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Filters Section */}
// // // // //         <Card className="shadow-sm border border-gray-200">
// // // // //           <CardContent className="pt-4 sm:pt-6">
// // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
// // // // //               <div>
// // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // //                   From Date
// // // // //                 </label>
// // // // //                 <div className="relative">
// // // // //                   <Input
// // // // //                     type="date"
// // // // //                     value={fromDate}
// // // // //                     onChange={(e) => setFromDate(e.target.value)}
// // // // //                     className="pr-8 sm:pr-10 text-xs sm:text-sm"
// // // // //                   />
// // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // //                   To Date
// // // // //                 </label>
// // // // //                 <div className="relative">
// // // // //                   <Input
// // // // //                     type="date"
// // // // //                     value={toDate}
// // // // //                     onChange={(e) => setToDate(e.target.value)}
// // // // //                     className="pr-8 sm:pr-10 text-xs sm:text-sm"
// // // // //                   />
// // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // //                   Record No
// // // // //                 </label>
// // // // //                 <Input
// // // // //                   placeholder="Enter Record No"
// // // // //                   value={recordNo}
// // // // //                   onChange={(e) => setRecordNo(e.target.value)}
// // // // //                   className="text-xs sm:text-sm"
// // // // //                 />
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // //                   SAM Number
// // // // //                 </label>
// // // // //                 <Input
// // // // //                   placeholder="Enter SAM Number"
// // // // //                   value={samNumber}
// // // // //                   onChange={(e) => setSamNumber(e.target.value)}
// // // // //                   className="text-xs sm:text-sm"
// // // // //                 />
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // //                   Child Name
// // // // //                 </label>
// // // // //                 <div className="flex gap-2">
// // // // //                   <Input
// // // // //                     placeholder="Enter Child Name"
// // // // //                     value={childName}
// // // // //                     onChange={(e) => setChildName(e.target.value)}
// // // // //                     className="text-xs sm:text-sm"
// // // // //                   />
// // // // //                   <Button
// // // // //                     onClick={handleSearch}
// // // // //                     className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3"
// // // // //                   >
// // // // //                     <Search className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // //                   </Button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </CardContent>
// // // // //         </Card>

// // // // //         {/* Table Section */}
// // // // //         <Card className="shadow-sm border border-gray-200">
// // // // //           <CardHeader className="pb-2 sm:pb-4">
// // // // //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// // // // //               Registered Children
// // // // //             </h2>
// // // // //           </CardHeader>

// // // // //           <CardContent>
// // // // //             <div className="overflow-x-auto rounded-lg">
// // // // //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // // // //                 <thead>
// // // // //                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Record No</th>
// // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">SAM Number</th>
// // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Child Name</th>
// // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden sm:table-cell">Parent Name</th>
// // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden md:table-cell">Date of Birth</th>
// // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
// // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Height</th>
// // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Actions</th>
// // // // //                   </tr>
// // // // //                 </thead>
// // // // //                 <tbody>
// // // // //                   {filteredData.length > 0 ? (
// // // // //                     filteredData.map((child, i) => (
// // // // //                       <tr
// // // // //                         key={child.id}
// // // // //                         className={`${
// // // // //                           i % 2 === 0 ? "bg-white" : "bg-gray-50"
// // // // //                         } hover:bg-indigo-50 transition`}
// // // // //                       >
// // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.recordNo}</td>
// // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.samNumber}</td>
// // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{child.childName}</td>
// // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">{child.parentName}</td>
// // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">{child.dateOfBirth}</td>
// // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionWeight}</td>
// // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionHeight}</td>
// // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
// // // // //                           <div className="flex justify-center gap-1 sm:gap-2">
// // // // //                             <Button
// // // // //                               variant="outline"
// // // // //                               size="sm"
// // // // //                               className="border-indigo-600 text-indigo-700 hover:bg-indigo-100 p-1 sm:p-2"
// // // // //                               onClick={() => handleEdit(child.id)}
// // // // //                             >
// // // // //                               <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
// // // // //                             </Button>
// // // // //                           </div>
// // // // //                         </td>
// // // // //                       </tr>
// // // // //                     ))
// // // // //                   ) : (
// // // // //                     <tr>
// // // // //                       <td colSpan={8} className="py-8 text-center text-gray-500 text-xs sm:text-sm">
// // // // //                         <div className="flex flex-col items-center">
// // // // //                           <div className="mb-2">
// // // // //                             <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// // // // //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0-3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
// // // // //                             </svg>
// // // // //                           </div>
// // // // //                           <p className="font-medium">No children registered yet</p>
// // // // //                           <p className="mt-1">Click &quot;Add Child&quot; button to register your first child</p>
// // // // //                         </div>
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   )}
// // // // //                 </tbody>
// // // // //               </table>
// // // // //             </div>
// // // // //           </CardContent>
// // // // //         </Card>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import { useState, useEffect } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // import { CalendarIcon, Plus, Search, Pencil, Home, Loader2 } from "lucide-react";
// // // // import toast, { Toaster } from "react-hot-toast";

// // // // interface Child {
// // // //   id: string;
// // // //   recordNo: string;
// // // //   samNumber: string;
// // // //   childName: string;
// // // //   parentName: string;
// // // //   dateOfBirth: string;
// // // //   admissionWeight: string;
// // // //   admissionHeight: string;
// // // //   createdAt: string;
// // // // }

// // // // export default function ChildRegistrationPage() {
// // // //   const router = useRouter();

// // // //   const [loading, setLoading] = useState(true);
// // // //   const [fromDate, setFromDate] = useState("");
// // // //   const [toDate, setToDate] = useState("");
// // // //   const [recordNo, setRecordNo] = useState("");
// // // //   const [samNumber, setSamNumber] = useState("");
// // // //   const [childName, setChildName] = useState("");
// // // //   const [data, setData] = useState<Child[]>([]);
// // // //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// // // //   // 🔹 Fetch data from PostgreSQL database via API
// // // //   useEffect(() => {
// // // //     const fetchChildren = async () => {
// // // //       try {
// // // //         const response = await fetch('/api/child-registration');
// // // //         if (response.ok) {
// // // //           const fetchedData = await response.json();
// // // //           setData(fetchedData);
// // // //           setFilteredData(fetchedData);
// // // //         } else {
// // // //           toast.error("Failed to load patient records.");
// // // //         }
// // // //       } catch (error) {
// // // //         toast.error("Network error while connecting to database.");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchChildren();
// // // //   }, []);

// // // //   // Filter data based on search criteria
// // // //   useEffect(() => {
// // // //     let filtered = [...data];
    
// // // //     if (recordNo) {
// // // //       filtered = filtered.filter(child => 
// // // //         child.recordNo.toLowerCase().includes(recordNo.toLowerCase())
// // // //       );
// // // //     }
// // // //     if (samNumber) {
// // // //       filtered = filtered.filter(child => 
// // // //         child.samNumber.toLowerCase().includes(samNumber.toLowerCase())
// // // //       );
// // // //     }
// // // //     if (childName) {
// // // //       filtered = filtered.filter(child => 
// // // //         child.childName.toLowerCase().includes(childName.toLowerCase())
// // // //       );
// // // //     }
// // // //     if (fromDate) {
// // // //       filtered = filtered.filter(child => {
// // // //         const childDate = new Date(child.createdAt);
// // // //         const filterDate = new Date(fromDate);
// // // //         return childDate >= filterDate;
// // // //       });
// // // //     }
// // // //     if (toDate) {
// // // //       filtered = filtered.filter(child => {
// // // //         const childDate = new Date(child.createdAt);
// // // //         const filterDate = new Date(toDate);
// // // //         filterDate.setHours(23, 59, 59, 999);
// // // //         return childDate <= filterDate;
// // // //       });
// // // //     }
    
// // // //     setFilteredData(filtered);
// // // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // // //   const handleSearch = () => {
// // // //     toast.success("Filters applied!");
// // // //   };

// // // //   const handleAdd = () => {
// // // //     router.push("/mtc-user/dashboard/child-registration/add-child");
// // // //   };

// // // //   const handleBackToHome = () => {
// // // //     router.push("/mtc-user/dashboard/home");
// // // //   };

// // // //   const handleEdit = (id: string) => {
// // // //     router.push(`/mtc-user/dashboard/child-registration/edit-child/${id}`);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // // //       <Toaster position="top-right" />

// // // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // // //         {/* Header */}
// // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // // //             Child Registration
// // // //           </h1>
// // // //           <div className="flex gap-2 sm:gap-3">
// // // //             <Button
// // // //               onClick={handleBackToHome}
// // // //               variant="outline"
// // // //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// // // //             >
// // // //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // // //               <span className="hidden sm:inline">Back to Home</span>
// // // //               <span className="sm:hidden">Home</span>
// // // //             </Button>
// // // //             <Button
// // // //               onClick={handleAdd}
// // // //               className="bg-indigo-600 hover:bg-indigo-700 transition text-xs sm:text-sm"
// // // //             >
// // // //               <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // // //               <span className="hidden sm:inline">Add Child</span>
// // // //               <span className="sm:hidden">Add</span>
// // // //             </Button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Filters Section */}
// // // //         <Card className="shadow-sm border border-gray-200">
// // // //           <CardContent className="pt-4 sm:pt-6">
// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
// // // //               <div>
// // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">From Date</label>
// // // //                 <div className="relative">
// // // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // //                 </div>
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">To Date</label>
// // // //                 <div className="relative">
// // // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // //                 </div>
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Record No</label>
// // // //                 <Input placeholder="Enter Record No" value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="text-xs sm:text-sm" />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">SAM Number</label>
// // // //                 <Input placeholder="Enter SAM Number" value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="text-xs sm:text-sm" />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Child Name</label>
// // // //                 <div className="flex gap-2">
// // // //                   <Input placeholder="Enter Child Name" value={childName} onChange={(e) => setChildName(e.target.value)} className="text-xs sm:text-sm" />
// // // //                   <Button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3">
// // // //                     <Search className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                   </Button>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </CardContent>
// // // //         </Card>

// // // //         {/* Table Section */}
// // // //         <Card className="shadow-sm border border-gray-200">
// // // //           <CardHeader className="pb-2 sm:pb-4 flex flex-row items-center justify-between">
// // // //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// // // //               Registered Children
// // // //             </h2>
// // // //             <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
// // // //               {filteredData.length} Records
// // // //             </span>
// // // //           </CardHeader>

// // // //           <CardContent>
// // // //             <div className="overflow-x-auto rounded-lg border border-gray-200">
// // // //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // // //                 <thead>
// // // //                   <tr className="bg-indigo-50/50 text-indigo-700 border-b border-gray-200">
// // // //                     <th className="py-3 px-4 text-left font-semibold">Record No</th>
// // // //                     <th className="py-3 px-4 text-left font-semibold">SAM Number</th>
// // // //                     <th className="py-3 px-4 text-left font-semibold">Child Name</th>
// // // //                     <th className="py-3 px-4 text-left font-semibold hidden sm:table-cell">Parent Name</th>
// // // //                     <th className="py-3 px-4 text-left font-semibold hidden md:table-cell">Date of Birth</th>
// // // //                     <th className="py-3 px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
// // // //                     <th className="py-3 px-4 text-left font-semibold hidden lg:table-cell">Height</th>
// // // //                     <th className="py-3 px-4 text-center font-semibold">Actions</th>
// // // //                   </tr>
// // // //                 </thead>
// // // //                 <tbody>
// // // //                   {loading ? (
// // // //                     <tr>
// // // //                       <td colSpan={8} className="py-12 text-center text-gray-500">
// // // //                         <div className="flex flex-col items-center justify-center">
// // // //                           <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-4" />
// // // //                           <p className="font-medium text-gray-600">Loading database records...</p>
// // // //                         </div>
// // // //                       </td>
// // // //                     </tr>
// // // //                   ) : filteredData.length > 0 ? (
// // // //                     filteredData.map((child, i) => (
// // // //                       <tr
// // // //                         key={child.id}
// // // //                         className={`${
// // // //                           i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
// // // //                         } hover:bg-indigo-50/50 transition border-b border-gray-100 last:border-0`}
// // // //                       >
// // // //                         <td className="py-3 px-4 font-mono text-gray-600">{child.recordNo}</td>
// // // //                         <td className="py-3 px-4 font-mono text-indigo-600 font-medium">{child.samNumber}</td>
// // // //                         <td className="py-3 px-4 font-semibold text-gray-900">{child.childName}</td>
// // // //                         <td className="py-3 px-4 hidden sm:table-cell text-gray-600">{child.parentName}</td>
// // // //                         <td className="py-3 px-4 hidden md:table-cell text-gray-600">{child.dateOfBirth}</td>
// // // //                         <td className="py-3 px-4 hidden lg:table-cell text-gray-600">{child.admissionWeight} kg</td>
// // // //                         <td className="py-3 px-4 hidden lg:table-cell text-gray-600">{child.admissionHeight} cm</td>
// // // //                         <td className="py-3 px-4 text-center">
// // // //                           <div className="flex justify-center">
// // // //                             <Button
// // // //                               variant="outline"
// // // //                               size="sm"
// // // //                               className="border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 p-2"
// // // //                               onClick={() => handleEdit(child.id)}
// // // //                             >
// // // //                               <Pencil className="h-4 w-4" />
// // // //                             </Button>
// // // //                           </div>
// // // //                         </td>
// // // //                       </tr>
// // // //                     ))
// // // //                   ) : (
// // // //                     <tr>
// // // //                       <td colSpan={8} className="py-12 text-center text-gray-500">
// // // //                         <div className="flex flex-col items-center">
// // // //                           <div className="mb-3 bg-gray-100 p-3 rounded-full">
// // // //                             <Search className="w-6 h-6 text-gray-400" />
// // // //                           </div>
// // // //                           <p className="font-medium text-gray-900">No children found</p>
// // // //                           <p className="mt-1 text-sm">Adjust your filters or add a new registration.</p>
// // // //                         </div>
// // // //                       </td>
// // // //                     </tr>
// // // //                   )}
// // // //                 </tbody>
// // // //               </table>
// // // //             </div>
// // // //           </CardContent>
// // // //         </Card>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // import { CalendarIcon, Plus, Search, Pencil, Home, Loader2 } from "lucide-react";
// // // import toast, { Toaster } from "react-hot-toast";

// // // interface Child {
// // //   id: string;
// // //   recordNo: string;
// // //   samNumber: string;
// // //   childName: string;
// // //   parentName: string;
// // //   dateOfBirth: string;
// // //   admissionWeight: string;
// // //   admissionHeight: string;
// // //   createdAt: string;
// // // }

// // // export default function ChildRegistrationPage() {
// // //   const router = useRouter();

// // //   const [loading, setLoading] = useState(true);
// // //   const [fromDate, setFromDate] = useState("");
// // //   const [toDate, setToDate] = useState("");
// // //   const [recordNo, setRecordNo] = useState("");
// // //   const [samNumber, setSamNumber] = useState("");
// // //   const [childName, setChildName] = useState("");
// // //   const [data, setData] = useState<Child[]>([]);
// // //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// // //   // 🔹 Fetch data from PostgreSQL database via API
// // //   useEffect(() => {
// // //     const fetchChildren = async () => {
// // //       try {
// // //         const response = await fetch('/api/child-registration', { cache: 'no-store' });
// // //         if (response.ok) {
// // //           const fetchedData = await response.json();
          
// // //           // CRITICAL FIX: Map database snake_case to frontend camelCase
// // //           const mappedData: Child[] = fetchedData.map((row: any) => ({
// // //             id: row.registration_id?.toString() || row.id || `fallback-${Math.random()}`,
// // //             recordNo: row.registration_id?.toString() || row.recordNo || "N/A", 
// // //             samNumber: row.sam_no || row.samNumber || "N/A",
// // //             childName: row.child_full_name || row.childName || "Unknown",
// // //             parentName: row.guardian_name || row.parentName || "Unknown",
// // //             dateOfBirth: row.dob ? new Date(row.dob).toLocaleDateString() : row.dateOfBirth || "N/A",
// // //             admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight || "-",
// // //             admissionHeight: row.length_height_cm?.toString() || row.admissionHeight || "-",
// // //             createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
// // //           }));

// // //           setData(mappedData);
// // //           setFilteredData(mappedData);
// // //         } else {
// // //           toast.error("Failed to load patient records.");
// // //         }
// // //       } catch (error) {
// // //         toast.error("Network error while connecting to database.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchChildren();
// // //   }, []);

// // //   // Filter data based on search criteria
// // //   useEffect(() => {
// // //     let filtered = [...data];
    
// // //     if (recordNo) {
// // //       filtered = filtered.filter(child => 
// // //         child.recordNo.toLowerCase().includes(recordNo.toLowerCase())
// // //       );
// // //     }
// // //     if (samNumber) {
// // //       filtered = filtered.filter(child => 
// // //         child.samNumber.toLowerCase().includes(samNumber.toLowerCase())
// // //       );
// // //     }
// // //     if (childName) {
// // //       filtered = filtered.filter(child => 
// // //         child.childName.toLowerCase().includes(childName.toLowerCase())
// // //       );
// // //     }
// // //     if (fromDate) {
// // //       filtered = filtered.filter(child => {
// // //         const childDate = new Date(child.createdAt);
// // //         const filterDate = new Date(fromDate);
// // //         return childDate >= filterDate;
// // //       });
// // //     }
// // //     if (toDate) {
// // //       filtered = filtered.filter(child => {
// // //         const childDate = new Date(child.createdAt);
// // //         const filterDate = new Date(toDate);
// // //         filterDate.setHours(23, 59, 59, 999);
// // //         return childDate <= filterDate;
// // //       });
// // //     }
    
// // //     setFilteredData(filtered);
// // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // //   const handleSearch = () => {
// // //     toast.success("Filters applied!");
// // //   };

// // //   const handleAdd = () => {
// // //     router.push("/mtc-user/dashboard/child-registration/add-child");
// // //   };

// // //   const handleBackToHome = () => {
// // //     router.push("/mtc-user/dashboard/home");
// // //   };

// // //   const handleEdit = (id: string) => {
// // //     router.push(`/mtc-user/dashboard/child-registration/edit-child/${id}`);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // //       <Toaster position="top-right" />

// // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // //         {/* Header */}
// // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // //             Child Registration
// // //           </h1>
// // //           <div className="flex gap-2 sm:gap-3">
// // //             <Button
// // //               onClick={handleBackToHome}
// // //               variant="outline"
// // //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// // //             >
// // //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // //               <span className="hidden sm:inline">Back to Home</span>
// // //               <span className="sm:hidden">Home</span>
// // //             </Button>
// // //             <Button
// // //               onClick={handleAdd}
// // //               className="bg-indigo-600 hover:bg-indigo-700 transition text-xs sm:text-sm"
// // //             >
// // //               <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // //               <span className="hidden sm:inline">Add Child</span>
// // //               <span className="sm:hidden">Add</span>
// // //             </Button>
// // //           </div>
// // //         </div>

// // //         {/* Filters Section */}
// // //         <Card className="shadow-sm border border-gray-200">
// // //           <CardContent className="pt-4 sm:pt-6">
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">From Date</label>
// // //                 <div className="relative">
// // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // //                 </div>
// // //               </div>
// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">To Date</label>
// // //                 <div className="relative">
// // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // //                 </div>
// // //               </div>
// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Record No</label>
// // //                 <Input placeholder="Enter Record No" value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="text-xs sm:text-sm" />
// // //               </div>
// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">SAM Number</label>
// // //                 <Input placeholder="Enter SAM Number" value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="text-xs sm:text-sm" />
// // //               </div>
// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Child Name</label>
// // //                 <div className="flex gap-2">
// // //                   <Input placeholder="Enter Child Name" value={childName} onChange={(e) => setChildName(e.target.value)} className="text-xs sm:text-sm" />
// // //                   <Button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3">
// // //                     <Search className="w-3 h-3 sm:w-4 sm:h-4" />
// // //                   </Button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         {/* Table Section */}
// // //         <Card className="shadow-sm border border-gray-200">
// // //           <CardHeader className="pb-2 sm:pb-4 flex flex-row items-center justify-between">
// // //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// // //               Registered Children
// // //             </h2>
// // //             <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
// // //               {filteredData.length} Records
// // //             </span>
// // //           </CardHeader>

// // //           <CardContent>
// // //             <div className="overflow-x-auto rounded-lg border border-gray-200">
// // //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // //                 <thead>
// // //                   <tr className="bg-indigo-50/50 text-indigo-700 border-b border-gray-200">
// // //                     <th className="py-3 px-4 text-left font-semibold">Record No</th>
// // //                     <th className="py-3 px-4 text-left font-semibold">SAM Number</th>
// // //                     <th className="py-3 px-4 text-left font-semibold">Child Name</th>
// // //                     <th className="py-3 px-4 text-left font-semibold hidden sm:table-cell">Parent Name</th>
// // //                     <th className="py-3 px-4 text-left font-semibold hidden md:table-cell">Date of Birth</th>
// // //                     <th className="py-3 px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
// // //                     <th className="py-3 px-4 text-left font-semibold hidden lg:table-cell">Height</th>
// // //                     <th className="py-3 px-4 text-center font-semibold">Actions</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {loading ? (
// // //                     <tr>
// // //                       <td colSpan={8} className="py-12 text-center text-gray-500">
// // //                         <div className="flex flex-col items-center justify-center">
// // //                           <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-4" />
// // //                           <p className="font-medium text-gray-600">Loading database records...</p>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   ) : filteredData.length > 0 ? (
// // //                     filteredData.map((child, i) => (
// // //                       <tr
// // //                         // Fixed Key Warning here as well
// // //                         key={child.id || `fallback-row-${i}`}
// // //                         className={`${
// // //                           i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
// // //                         } hover:bg-indigo-50/50 transition border-b border-gray-100 last:border-0`}
// // //                       >
// // //                         <td className="py-3 px-4 font-mono text-gray-600">{child.recordNo}</td>
// // //                         <td className="py-3 px-4 font-mono text-indigo-600 font-medium">{child.samNumber}</td>
// // //                         <td className="py-3 px-4 font-semibold text-gray-900">{child.childName}</td>
// // //                         <td className="py-3 px-4 hidden sm:table-cell text-gray-600">{child.parentName}</td>
// // //                         <td className="py-3 px-4 hidden md:table-cell text-gray-600">{child.dateOfBirth}</td>
// // //                         <td className="py-3 px-4 hidden lg:table-cell text-gray-600">{child.admissionWeight} kg</td>
// // //                         <td className="py-3 px-4 hidden lg:table-cell text-gray-600">{child.admissionHeight} cm</td>
// // //                         <td className="py-3 px-4 text-center">
// // //                           <div className="flex justify-center">
// // //                             <Button
// // //                               variant="outline"
// // //                               size="sm"
// // //                               className="border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 p-2"
// // //                               onClick={() => handleEdit(child.id)}
// // //                             >
// // //                               <Pencil className="h-4 w-4" />
// // //                             </Button>
// // //                           </div>
// // //                         </td>
// // //                       </tr>
// // //                     ))
// // //                   ) : (
// // //                     <tr>
// // //                       <td colSpan={8} className="py-12 text-center text-gray-500">
// // //                         <div className="flex flex-col items-center">
// // //                           <div className="mb-3 bg-gray-100 p-3 rounded-full">
// // //                             <Search className="w-6 h-6 text-gray-400" />
// // //                           </div>
// // //                           <p className="font-medium text-gray-900">No children found</p>
// // //                           <p className="mt-1 text-sm">Adjust your filters or add a new registration.</p>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   )}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // import { CalendarIcon, Plus, Search, Pencil, Home, Loader2 } from "lucide-react";
// // // import toast, { Toaster } from "react-hot-toast";

// // // interface Child {
// // //   id: string;
// // //   recordNo: string;
// // //   samNumber: string;
// // //   childName: string;
// // //   parentName: string;
// // //   dateOfBirth: string;
// // //   admissionWeight: string;
// // //   admissionHeight: string;
// // //   createdAt: string;
// // // }

// // // export default function ChildRegistrationPage() {
// // //   const router = useRouter();

// // //   const [loading, setLoading] = useState(true);
// // //   const [fromDate, setFromDate] = useState("");
// // //   const [toDate, setToDate] = useState("");
// // //   const [recordNo, setRecordNo] = useState("");
// // //   const [samNumber, setSamNumber] = useState("");
// // //   const [childName, setChildName] = useState("");
// // //   const [data, setData] = useState<Child[]>([]);
// // //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// // //   // 🔹 Fetch data securely filtered by MTC Center
// // //   useEffect(() => {
// // //     const fetchChildren = async () => {
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
// // //         const response = await fetch(`/api/child-registration${queryParams}`, { cache: 'no-store' });
        
// // //         if (response.ok) {
// // //           const fetchedData = await response.json();
          
// // //           const mappedData: Child[] = fetchedData.map((row: any) => ({
// // //             id: row.registration_id?.toString() || row.id || `fallback-${Math.random()}`,
// // //             recordNo: row.registration_id?.toString() || row.recordNo || "N/A", 
// // //             samNumber: row.sam_no || row.samNumber || "N/A",
// // //             childName: row.child_full_name || row.childName || "Unknown",
// // //             parentName: row.guardian_name || row.parentName || "Unknown",
// // //             dateOfBirth: row.dob ? new Date(row.dob).toLocaleDateString() : row.dateOfBirth || "N/A",
// // //             admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight || "-",
// // //             admissionHeight: row.length_height_cm?.toString() || row.admissionHeight || "-",
// // //             createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
// // //           }));

// // //           setData(mappedData);
// // //           setFilteredData(mappedData);
// // //         } else {
// // //           toast.error("Failed to load patient records.");
// // //         }
// // //       } catch (error) {
// // //         toast.error("Network error while connecting to database.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchChildren();
// // //   }, []);

// // //   // Filter data based on manual search criteria
// // //   useEffect(() => {
// // //     let filtered = [...data];
    
// // //     if (recordNo) {
// // //       filtered = filtered.filter(child => 
// // //         child.recordNo.toLowerCase().includes(recordNo.toLowerCase())
// // //       );
// // //     }
// // //     if (samNumber) {
// // //       filtered = filtered.filter(child => 
// // //         child.samNumber.toLowerCase().includes(samNumber.toLowerCase())
// // //       );
// // //     }
// // //     if (childName) {
// // //       filtered = filtered.filter(child => 
// // //         child.childName.toLowerCase().includes(childName.toLowerCase())
// // //       );
// // //     }
// // //     if (fromDate) {
// // //       filtered = filtered.filter(child => {
// // //         const childDate = new Date(child.createdAt);
// // //         const filterDate = new Date(fromDate);
// // //         return childDate >= filterDate;
// // //       });
// // //     }
// // //     if (toDate) {
// // //       filtered = filtered.filter(child => {
// // //         const childDate = new Date(child.createdAt);
// // //         const filterDate = new Date(toDate);
// // //         filterDate.setHours(23, 59, 59, 999);
// // //         return childDate <= filterDate;
// // //       });
// // //     }
    
// // //     setFilteredData(filtered);
// // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // //   const handleSearch = () => {
// // //     toast.success("Filters applied!");
// // //   };

// // //   const handleAdd = () => {
// // //     router.push("/mtc-user/dashboard/child-registration/add-child");
// // //   };

// // //   const handleBackToHome = () => {
// // //     router.push("/mtc-user/dashboard/home");
// // //   };

// // //   const handleEdit = (id: string) => {
// // //     router.push(`/mtc-user/dashboard/child-registration/edit-child/${id}`);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // //       <Toaster position="top-right" />

// // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // //             Child Registration
// // //           </h1>
// // //           <div className="flex gap-2 sm:gap-3">
// // //             <Button
// // //               onClick={handleBackToHome}
// // //               variant="outline"
// // //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// // //             >
// // //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // //               <span className="hidden sm:inline">Back to Home</span>
// // //               <span className="sm:hidden">Home</span>
// // //             </Button>
// // //             <Button
// // //               onClick={handleAdd}
// // //               className="bg-indigo-600 hover:bg-indigo-700 transition text-xs sm:text-sm"
// // //             >
// // //               <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // //               <span className="hidden sm:inline">Add Child</span>
// // //               <span className="sm:hidden">Add</span>
// // //             </Button>
// // //           </div>
// // //         </div>

// // //         <Card className="shadow-sm border border-gray-200">
// // //           <CardContent className="pt-4 sm:pt-6">
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">From Date</label>
// // //                 <div className="relative">
// // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // //                 </div>
// // //               </div>
// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">To Date</label>
// // //                 <div className="relative">
// // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // //                 </div>
// // //               </div>
// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Record No</label>
// // //                 <Input placeholder="Enter Record No" value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="text-xs sm:text-sm" />
// // //               </div>
// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">SAM Number</label>
// // //                 <Input placeholder="Enter SAM Number" value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="text-xs sm:text-sm" />
// // //               </div>
// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Child Name</label>
// // //                 <div className="flex gap-2">
// // //                   <Input placeholder="Enter Child Name" value={childName} onChange={(e) => setChildName(e.target.value)} className="text-xs sm:text-sm" />
// // //                   <Button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3">
// // //                     <Search className="w-3 h-3 sm:w-4 sm:h-4" />
// // //                   </Button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         <Card className="shadow-sm border border-gray-200">
// // //           <CardHeader className="pb-2 sm:pb-4 flex flex-row items-center justify-between">
// // //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// // //               Registered Children
// // //             </h2>
// // //             <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
// // //               {filteredData.length} Records
// // //             </span>
// // //           </CardHeader>

// // //           <CardContent>
// // //             <div className="overflow-x-auto rounded-lg border border-gray-200">
// // //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // //                 <thead>
// // //                   <tr className="bg-indigo-50/50 text-indigo-700 border-b border-gray-200">
// // //                     <th className="py-3 px-4 text-left font-semibold">Record No</th>
// // //                     <th className="py-3 px-4 text-left font-semibold">SAM Number</th>
// // //                     <th className="py-3 px-4 text-left font-semibold">Child Name</th>
// // //                     <th className="py-3 px-4 text-left font-semibold hidden sm:table-cell">Parent Name</th>
// // //                     <th className="py-3 px-4 text-left font-semibold hidden md:table-cell">Date of Birth</th>
// // //                     <th className="py-3 px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
// // //                     <th className="py-3 px-4 text-left font-semibold hidden lg:table-cell">Height</th>
// // //                     <th className="py-3 px-4 text-center font-semibold">Actions</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {loading ? (
// // //                     <tr>
// // //                       <td colSpan={8} className="py-12 text-center text-gray-500">
// // //                         <div className="flex flex-col items-center justify-center">
// // //                           <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-4" />
// // //                           <p className="font-medium text-gray-600">Loading database records...</p>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   ) : filteredData.length > 0 ? (
// // //                     filteredData.map((child, i) => (
// // //                       <tr
// // //                         key={child.id || `fallback-row-${i}`}
// // //                         className={`${
// // //                           i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
// // //                         } hover:bg-indigo-50/50 transition border-b border-gray-100 last:border-0`}
// // //                       >
// // //                         <td className="py-3 px-4 font-mono text-gray-600">{child.recordNo}</td>
// // //                         <td className="py-3 px-4 font-mono text-indigo-600 font-medium">{child.samNumber}</td>
// // //                         <td className="py-3 px-4 font-semibold text-gray-900">{child.childName}</td>
// // //                         <td className="py-3 px-4 hidden sm:table-cell text-gray-600">{child.parentName}</td>
// // //                         <td className="py-3 px-4 hidden md:table-cell text-gray-600">{child.dateOfBirth}</td>
// // //                         <td className="py-3 px-4 hidden lg:table-cell text-gray-600">{child.admissionWeight} kg</td>
// // //                         <td className="py-3 px-4 hidden lg:table-cell text-gray-600">{child.admissionHeight} cm</td>
// // //                         <td className="py-3 px-4 text-center">
// // //                           <div className="flex justify-center">
// // //                             <Button
// // //                               variant="outline"
// // //                               size="sm"
// // //                               className="border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 p-2"
// // //                               onClick={() => handleEdit(child.id)}
// // //                             >
// // //                               <Pencil className="h-4 w-4" />
// // //                             </Button>
// // //                           </div>
// // //                         </td>
// // //                       </tr>
// // //                     ))
// // //                   ) : (
// // //                     <tr>
// // //                       <td colSpan={8} className="py-12 text-center text-gray-500">
// // //                         <div className="flex flex-col items-center">
// // //                           <div className="mb-3 bg-gray-100 p-3 rounded-full">
// // //                             <Search className="w-6 h-6 text-gray-400" />
// // //                           </div>
// // //                           <p className="font-medium text-gray-900">No children found</p>
// // //                           <p className="mt-1 text-sm">Adjust your filters or add a new registration.</p>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   )}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </CardContent>
// // //         </Card>
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
// // import { CalendarIcon, Plus, Search, Pencil, Home, Loader2, CheckCircle2 } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";

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
// //   isSamarRegistered: boolean; // ✅ Added SAAMAR boolean
// //   samarUuid: string;          // ✅ Added SAAMAR UUID
// // }

// // export default function ChildRegistrationPage() {
// //   const router = useRouter();

// //   const [loading, setLoading] = useState(true);
// //   const [fromDate, setFromDate] = useState("");
// //   const [toDate, setToDate] = useState("");
// //   const [recordNo, setRecordNo] = useState("");
// //   const [samNumber, setSamNumber] = useState("");
// //   const [childName, setChildName] = useState("");
  
// //   // ✅ Added state for separating views
// //   const [viewType, setViewType] = useState<"all" | "normal" | "samar">("all");

// //   const [data, setData] = useState<Child[]>([]);
// //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// //   // 🔹 Fetch data securely filtered by MTC Center
// //   useEffect(() => {
// //     const fetchChildren = async () => {
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
// //         const response = await fetch(`/api/child-registration${queryParams}`, { cache: 'no-store' });
        
// //         if (response.ok) {
// //           const fetchedData = await response.json();
          
// //           const mappedData: Child[] = fetchedData.map((row: any) => ({
// //             id: row.registration_id?.toString() || row.id || `fallback-${Math.random()}`,
// //             recordNo: row.registration_id?.toString() || row.recordNo || "N/A", 
// //             samNumber: row.sam_no || row.samNumber || "N/A",
// //             childName: row.child_full_name || row.childName || "Unknown",
// //             parentName: row.guardian_name || row.parentName || "Unknown",
// //             dateOfBirth: row.dob ? new Date(row.dob).toLocaleDateString() : row.dateOfBirth || "N/A",
// //             admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight || "-",
// //             admissionHeight: row.length_height_cm?.toString() || row.admissionHeight || "-",
// //             createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
// //             // ✅ Map SAAMAR data from the database payload
// //             isSamarRegistered: row.is_samar_registered === true || row.isSamarRegistered === true,
// //             samarUuid: row.samar_uuid || row.samarUuid || "",
// //           }));

// //           setData(mappedData);
// //           setFilteredData(mappedData);
// //         } else {
// //           toast.error("Failed to load patient records.");
// //         }
// //       } catch (error) {
// //         toast.error("Network error while connecting to database.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchChildren();
// //   }, []);

// //   // Filter data based on manual search criteria and view type
// //   useEffect(() => {
// //     let filtered = [...data];
    
// //     // ✅ Apply the Normal vs SAAMAR filter separation
// //     if (viewType === "normal") {
// //       filtered = filtered.filter(child => !child.isSamarRegistered);
// //     } else if (viewType === "samar") {
// //       filtered = filtered.filter(child => child.isSamarRegistered);
// //     }

// //     if (recordNo) {
// //       filtered = filtered.filter(child => 
// //         child.recordNo.toLowerCase().includes(recordNo.toLowerCase())
// //       );
// //     }
// //     if (samNumber) {
// //       filtered = filtered.filter(child => 
// //         child.samNumber.toLowerCase().includes(samNumber.toLowerCase())
// //       );
// //     }
// //     if (childName) {
// //       filtered = filtered.filter(child => 
// //         child.childName.toLowerCase().includes(childName.toLowerCase())
// //       );
// //     }
// //     if (fromDate) {
// //       filtered = filtered.filter(child => {
// //         const childDate = new Date(child.createdAt);
// //         const filterDate = new Date(fromDate);
// //         return childDate >= filterDate;
// //       });
// //     }
// //     if (toDate) {
// //       filtered = filtered.filter(child => {
// //         const childDate = new Date(child.createdAt);
// //         const filterDate = new Date(toDate);
// //         filterDate.setHours(23, 59, 59, 999);
// //         return childDate <= filterDate;
// //       });
// //     }
    
// //     setFilteredData(filtered);
// //   }, [data, recordNo, samNumber, childName, fromDate, toDate, viewType]);

// //   const handleSearch = () => {
// //     toast.success("Filters applied!");
// //   };

// //   const handleAdd = () => {
// //     router.push("/mtc-user/dashboard/child-registration/add-child");
// //   };

// //   const handleBackToHome = () => {
// //     router.push("/mtc-user/dashboard/home");
// //   };

// //   const handleEdit = (id: string) => {
// //     router.push(`/mtc-user/dashboard/child-registration/edit-child/${id}`);
// //   };

// //   // Derived counts for the tabs
// //   const countAll = data.length;
// //   const countNormal = data.filter(d => !d.isSamarRegistered).length;
// //   const countSamar = data.filter(d => d.isSamarRegistered).length;

// //   return (
// //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// //       <Toaster position="top-right" />

// //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// //             Child Registration
// //           </h1>
// //           <div className="flex gap-2 sm:gap-3">
// //             <Button
// //               onClick={handleBackToHome}
// //               variant="outline"
// //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// //             >
// //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// //               <span className="hidden sm:inline">Back to Home</span>
// //               <span className="sm:hidden">Home</span>
// //             </Button>
// //             <Button
// //               onClick={handleAdd}
// //               className="bg-indigo-600 hover:bg-indigo-700 transition text-xs sm:text-sm"
// //             >
// //               <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// //               <span className="hidden sm:inline">Add Child</span>
// //               <span className="sm:hidden">Add</span>
// //             </Button>
// //           </div>
// //         </div>

// //         <Card className="shadow-sm border border-gray-200">
// //           <CardContent className="pt-4 sm:pt-6">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">From Date</label>
// //                 <div className="relative">
// //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// //                 </div>
// //               </div>
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">To Date</label>
// //                 <div className="relative">
// //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// //                 </div>
// //               </div>
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Record No</label>
// //                 <Input placeholder="Enter Record No" value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="text-xs sm:text-sm" />
// //               </div>
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">SAM Number</label>
// //                 <Input placeholder="Enter SAM Number" value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="text-xs sm:text-sm" />
// //               </div>
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Child Name</label>
// //                 <div className="flex gap-2">
// //                   <Input placeholder="Enter Child Name" value={childName} onChange={(e) => setChildName(e.target.value)} className="text-xs sm:text-sm" />
// //                   <Button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3">
// //                     <Search className="w-3 h-3 sm:w-4 sm:h-4" />
// //                   </Button>
// //                 </div>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* ✅ SAAMAR Separation Tabs */}
// //         <div className="flex flex-wrap gap-2 items-center bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm w-max">
// //           <button
// //             onClick={() => setViewType("all")}
// //             className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${viewType === "all" ? "bg-slate-800 text-white shadow" : "text-gray-600 hover:bg-gray-100"}`}
// //           >
// //             All Patients <span className="ml-1.5 text-xs opacity-70">({countAll})</span>
// //           </button>
// //           <button
// //             onClick={() => setViewType("normal")}
// //             className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${viewType === "normal" ? "bg-blue-600 text-white shadow" : "text-gray-600 hover:bg-gray-100"}`}
// //           >
// //             Normal Registration <span className="ml-1.5 text-xs opacity-70">({countNormal})</span>
// //           </button>
// //           <button
// //             onClick={() => setViewType("samar")}
// //             className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${viewType === "samar" ? "bg-purple-600 text-white shadow" : "text-gray-600 hover:bg-gray-100"}`}
// //           >
// //             <CheckCircle2 className="w-4 h-4" />
// //             SAAMAR Tracker <span className="ml-0.5 text-xs opacity-70">({countSamar})</span>
// //           </button>
// //         </div>

// //         <Card className="shadow-sm border border-gray-200">
// //           <CardHeader className="pb-2 sm:pb-4 flex flex-row items-center justify-between">
// //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// //               Registered Children
// //             </h2>
// //             <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
// //               {filteredData.length} Records
// //             </span>
// //           </CardHeader>

// //           <CardContent>
// //             <div className="overflow-x-auto rounded-lg border border-gray-200">
// //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// //                 <thead>
// //                   <tr className="bg-indigo-50/50 text-indigo-700 border-b border-gray-200">
// //                     <th className="py-3 px-4 text-left font-semibold">Record No</th>
// //                     <th className="py-3 px-4 text-left font-semibold">SAM Number</th>
// //                     <th className="py-3 px-4 text-left font-semibold">Child Name</th>
// //                     {/* ✅ Added Type Header */}
// //                     <th className="py-3 px-4 text-left font-semibold">Registration Type</th>
// //                     <th className="py-3 px-4 text-left font-semibold hidden sm:table-cell">Parent Name</th>
// //                     <th className="py-3 px-4 text-left font-semibold hidden md:table-cell">Date of Birth</th>
// //                     <th className="py-3 px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
// //                     <th className="py-3 px-4 text-left font-semibold hidden lg:table-cell">Height</th>
// //                     <th className="py-3 px-4 text-center font-semibold">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {loading ? (
// //                     <tr>
// //                       <td colSpan={9} className="py-12 text-center text-gray-500">
// //                         <div className="flex flex-col items-center justify-center">
// //                           <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-4" />
// //                           <p className="font-medium text-gray-600">Loading database records...</p>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ) : filteredData.length > 0 ? (
// //                     filteredData.map((child, i) => (
// //                       <tr
// //                         key={child.id || `fallback-row-${i}`}
// //                         className={`${
// //                           i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
// //                         } hover:bg-indigo-50/50 transition border-b border-gray-100 last:border-0`}
// //                       >
// //                         <td className="py-3 px-4 font-mono text-gray-600">{child.recordNo}</td>
// //                         <td className="py-3 px-4 font-mono text-indigo-600 font-medium">{child.samNumber}</td>
// //                         <td className="py-3 px-4 font-semibold text-gray-900">{child.childName}</td>
                        
// //                         {/* ✅ SAAMAR vs Normal Visual Badge */}
// //                         <td className="py-3 px-4">
// //                           {child.isSamarRegistered ? (
// //                             <div className="flex flex-col">
// //                               <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-purple-100 text-purple-700 w-max border border-purple-200">
// //                                 SAAMAR
// //                               </span>
// //                               <span className="text-[10px] text-gray-400 mt-1 font-mono tracking-tighter" title="SAAMAR UUID">
// //                                 {child.samarUuid || "No UUID"}
// //                               </span>
// //                             </div>
// //                           ) : (
// //                             <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-gray-100 text-gray-500 w-max border border-gray-200">
// //                               Normal
// //                             </span>
// //                           )}
// //                         </td>

// //                         <td className="py-3 px-4 hidden sm:table-cell text-gray-600">{child.parentName}</td>
// //                         <td className="py-3 px-4 hidden md:table-cell text-gray-600">{child.dateOfBirth}</td>
// //                         <td className="py-3 px-4 hidden lg:table-cell text-gray-600">{child.admissionWeight} kg</td>
// //                         <td className="py-3 px-4 hidden lg:table-cell text-gray-600">{child.admissionHeight} cm</td>
// //                         <td className="py-3 px-4 text-center">
// //                           <div className="flex justify-center">
// //                             <Button
// //                               variant="outline"
// //                               size="sm"
// //                               className="border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 p-2"
// //                               onClick={() => handleEdit(child.id)}
// //                             >
// //                               <Pencil className="h-4 w-4" />
// //                             </Button>
// //                           </div>
// //                         </td>
// //                       </tr>
// //                     ))
// //                   ) : (
// //                     <tr>
// //                       <td colSpan={9} className="py-12 text-center text-gray-500">
// //                         <div className="flex flex-col items-center">
// //                           <div className="mb-3 bg-gray-100 p-3 rounded-full">
// //                             <Search className="w-6 h-6 text-gray-400" />
// //                           </div>
// //                           <p className="font-medium text-gray-900">No children found</p>
// //                           <p className="mt-1 text-sm">Adjust your filters or add a new registration.</p>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </CardContent>
// //         </Card>
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
// import { CalendarIcon, Plus, Search, Pencil, Home, Loader2, CheckCircle2 } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

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
//   isSamarRegistered: boolean;
//   samarUuid: string;
// }

// // ✅ Explicit type matching your actual DB API payload shape
// interface ChildApiResponseRow {
//   registration_id?: number | string;
//   id?: string;
//   recordNo?: string;
//   sam_no?: string;
//   samNumber?: string;
//   child_full_name?: string;
//   childName?: string;
//   guardian_name?: string;
//   parentName?: string;
//   dob?: string | Date;
//   dateOfBirth?: string;
//   admission_weight_kg?: number | string;
//   admissionWeight?: string;
//   length_height_cm?: number | string;
//   admissionHeight?: string;
//   admission_date?: string;
//   createdAt?: string;
//   is_samar_registered?: boolean;
//   isSamarRegistered?: boolean;
//   samar_uuid?: string;
//   samarUuid?: string;
// }

// export default function ChildRegistrationPage() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [recordNo, setRecordNo] = useState("");
//   const [samNumber, setSamNumber] = useState("");
//   const [childName, setChildName] = useState("");
  
//   const [viewType, setViewType] = useState<"all" | "normal" | "samar">("all");

//   const [data, setData] = useState<Child[]>([]);
//   const [filteredData, setFilteredData] = useState<Child[]>([]);

//   useEffect(() => {
//     const fetchChildren = async () => {
//       try {
//         const sessionData = sessionStorage.getItem("mtc_user");
//         let queryParams = "";
        
//         if (sessionData) {
//           try {
//             const user = JSON.parse(sessionData);
//             if (user.mtcId) {
//               queryParams = `?mtcId=${user.mtcId}`;
//             }
//           } catch (_err) { // ✅ Fixed: Prefixed with underscore to clear unused warning
//             console.error("Session parse error");
//           }
//         }

//         const response = await fetch(`/api/child-registration${queryParams}`, { cache: 'no-store' });
        
//         if (response.ok) {
//           const fetchedData: ChildApiResponseRow[] = await response.json(); // ✅ Fixed: Substituted typed interface over 'any'
          
//           const mappedData: Child[] = fetchedData.map((row, i) => ({
//             id: row.registration_id?.toString() || row.id || `fallback-${i}-${Math.random()}`,
//             recordNo: row.registration_id?.toString() || row.recordNo || "N/A", 
//             samNumber: row.sam_no || row.samNumber || "N/A",
//             childName: row.child_full_name || row.childName || "Unknown",
//             parentName: row.guardian_name || row.parentName || "Unknown",
//             dateOfBirth: row.dob ? new Date(row.dob).toLocaleDateString() : row.dateOfBirth || "N/A",
//             admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight || "-",
//             admissionHeight: row.length_height_cm?.toString() || row.admissionHeight || "-",
//             createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
//             isSamarRegistered: row.is_samar_registered === true || row.isSamarRegistered === true,
//             samarUuid: row.samar_uuid || row.samarUuid || "",
//           }));

//           setData(mappedData);
//           setFilteredData(mappedData);
//         } else {
//           toast.error("Failed to load patient records.");
//         }
//       } catch (_error) { // ✅ Fixed: Prefixed with underscore to clear unused warning
//         toast.error("Network error while connecting to database.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChildren();
//   }, []);

//   // Filter data based on manual search criteria and view type
//   useEffect(() => {
//     let filtered = [...data];
    
//     if (viewType === "normal") {
//       filtered = filtered.filter(child => !child.isSamarRegistered);
//     } else if (viewType === "samar") {
//       filtered = filtered.filter(child => child.isSamarRegistered);
//     }

//     if (recordNo) {
//       filtered = filtered.filter(child => 
//         child.recordNo.toLowerCase().includes(recordNo.toLowerCase())
//       );
//     }
//     if (samNumber) {
//       filtered = filtered.filter(child => 
//         child.samNumber.toLowerCase().includes(samNumber.toLowerCase())
//       );
//     }
//     if (childName) {
//       filtered = filtered.filter(child => 
//         child.childName.toLowerCase().includes(childName.toLowerCase())
//       );
//     }
//     if (fromDate) {
//       filtered = filtered.filter(child => {
//         const childDate = new Date(child.createdAt);
//         const filterDate = new Date(fromDate);
//         return childDate >= filterDate;
//       });
//     }
//     if (toDate) {
//       filtered = filtered.filter(child => {
//         const childDate = new Date(child.createdAt);
//         const filterDate = new Date(toDate);
//         filterDate.setHours(23, 59, 59, 999);
//         return childDate <= filterDate;
//       });
//     }
    
//     setFilteredData(filtered);
//   }, [data, recordNo, samNumber, childName, fromDate, toDate, viewType]);

//   const handleSearch = () => {
//     toast.success("Filters applied!");
//   };

//   const handleAdd = () => {
//     router.push("/mtc-user/dashboard/child-registration/add-child");
//   };

//   const handleBackToHome = () => {
//     router.push("/mtc-user/dashboard/home");
//   };

//   const handleEdit = (id: string) => {
//     router.push(`/mtc-user/dashboard/child-registration/edit-child/${id}`);
//   };

//   const countAll = data.length;
//   const countNormal = data.filter(d => !d.isSamarRegistered).length;
//   const countSamar = data.filter(d => d.isSamarRegistered).length;

//   return (
//     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
//       <Toaster position="top-right" />

//       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
//             Child Registration
//           </h1>
//           <div className="flex gap-2 sm:gap-3">
//             <Button
//               onClick={handleBackToHome}
//               variant="outline"
//               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
//             >
//               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
//               <span className="hidden sm:inline">Back to Home</span>
//               <span className="sm:hidden">Home</span>
//             </Button>
//             <Button
//               onClick={handleAdd}
//               className="bg-indigo-600 hover:bg-indigo-700 transition text-xs sm:text-sm"
//             >
//               <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
//               <span className="hidden sm:inline">Add Child</span>
//               <span className="sm:hidden">Add</span>
//             </Button>
//           </div>
//         </div>

//         <Card className="shadow-sm border border-gray-200">
//           <CardContent className="pt-4 sm:pt-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">From Date</label>
//                 <div className="relative">
//                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
//                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">To Date</label>
//                 <div className="relative">
//                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
//                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Record No</label>
//                 <Input placeholder="Enter Record No" value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="text-xs sm:text-sm" />
//               </div>
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">SAM Number</label>
//                 <Input placeholder="Enter SAM Number" value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="text-xs sm:text-sm" />
//               </div>
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Child Name</label>
//                 <div className="flex gap-2">
//                   <Input placeholder="Enter Child Name" value={childName} onChange={(e) => setChildName(e.target.value)} className="text-xs sm:text-sm" />
//                   <Button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3">
//                     <Search className="w-3 h-3 sm:w-4 sm:h-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="flex flex-wrap gap-2 items-center bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm w-max">
//           <button
//             onClick={() => setViewType("all")}
//             className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${viewType === "all" ? "bg-slate-800 text-white shadow" : "text-gray-600 hover:bg-gray-100"}`}
//           >
//             All Patients <span className="ml-1.5 text-xs opacity-70">({countAll})</span>
//           </button>
//           <button
//             onClick={() => setViewType("normal")}
//             className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${viewType === "normal" ? "bg-blue-600 text-white shadow" : "text-gray-600 hover:bg-gray-100"}`}
//           >
//             Normal Registration <span className="ml-1.5 text-xs opacity-70">({countNormal})</span>
//           </button>
//           <button
//             onClick={() => setViewType("samar")}
//             className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${viewType === "samar" ? "bg-purple-600 text-white shadow" : "text-gray-600 hover:bg-gray-100"}`}
//           >
//             <CheckCircle2 className="w-4 h-4" />
//             SAAMAR Tracker <span className="ml-0.5 text-xs opacity-70">({countSamar})</span>
//           </button>
//         </div>

//         <Card className="shadow-sm border border-gray-200">
//           <CardHeader className="pb-2 sm:pb-4 flex flex-row items-center justify-between">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//               Registered Children
//             </h2>
//             <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
//               {filteredData.length} Records
//             </span>
//           </CardHeader>

//           <CardContent>
//             <div className="overflow-x-auto rounded-lg border border-gray-200">
//               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
//                 <thead>
//                   <tr className="bg-indigo-50/50 text-indigo-700 border-b border-gray-200">
//                     <th className="py-3 px-4 text-left font-semibold">Record No</th>
//                     <th className="py-3 px-4 text-left font-semibold">SAM Number</th>
//                     <th className="py-3 px-4 text-left font-semibold">Child Name</th>
//                     <th className="py-3 px-4 text-left font-semibold">Registration Type</th>
//                     <th className="py-3 px-4 text-left font-semibold hidden sm:table-cell">Parent Name</th>
//                     <th className="py-3 px-4 text-left font-semibold hidden md:table-cell">Date of Birth</th>
//                     <th className="py-3 px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
//                     <th className="py-3 px-4 text-left font-semibold hidden lg:table-cell">Height</th>
//                     <th className="py-3 px-4 text-center font-semibold">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan={9} className="py-12 text-center text-gray-500">
//                         <div className="flex flex-col items-center justify-center">
//                           <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-4" />
//                           <p className="font-medium text-gray-600">Loading database records...</p>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : filteredData.length > 0 ? (
//                     filteredData.map((child, i) => (
//                       <tr
//                         key={child.id || `fallback-row-${i}`}
//                         className={`${
//                           i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
//                         } hover:bg-indigo-50/50 transition border-b border-gray-100 last:border-0`}
//                       >
//                         <td className="py-3 px-4 font-mono text-gray-600">{child.recordNo}</td>
//                         <td className="py-3 px-4 font-mono text-indigo-600 font-medium">{child.samNumber}</td>
//                         <td className="py-3 px-4 font-semibold text-gray-900">{child.childName}</td>
                        
//                         <td className="py-3 px-4">
//                           {child.isSamarRegistered ? (
//                             <div className="flex flex-col">
//                               <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-purple-100 text-purple-700 w-max border border-purple-200">
//                                 SAAMAR
//                               </span>
//                               <span className="text-[10px] text-gray-400 mt-1 font-mono tracking-tighter" title="SAAMAR UUID">
//                                 {child.samarUuid || "No UUID"}
//                               </span>
//                             </div>
//                           ) : (
//                             <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-gray-100 text-gray-500 w-max border border-gray-200">
//                               Normal
//                             </span>
//                           )}
//                         </td>

//                         <td className="py-3 px-4 hidden sm:table-cell text-gray-600">{child.parentName}</td>
//                         <td className="py-3 px-4 hidden md:table-cell text-gray-600">{child.dateOfBirth}</td>
//                         <td className="py-3 px-4 hidden lg:table-cell text-gray-600">{child.admissionWeight} kg</td>
//                         <td className="py-3 px-4 hidden lg:table-cell text-gray-600">{child.admissionHeight} cm</td>
//                         <td className="py-3 px-4 text-center">
//                           <div className="flex justify-center">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 p-2"
//                               onClick={() => handleEdit(child.id)}
//                             >
//                               <Pencil className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={9} className="py-12 text-center text-gray-500">
//                         <div className="flex flex-col items-center">
//                           <div className="mb-3 bg-gray-100 p-3 rounded-full">
//                             <Search className="w-6 h-6 text-gray-400" />
//                           </div>
//                           <p className="font-medium text-gray-900">No children found</p>
//                           <p className="mt-1 text-sm">Adjust your filters or add a new registration.</p>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>
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
import { CalendarIcon, Plus, Search, Pencil, Home, Loader2, CheckCircle2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

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
  isSamarRegistered: boolean;
  samarUuid: string;
}

interface ChildApiResponseRow {
  registration_id?: number | string;
  id?: string;
  recordNo?: string;
  sam_no?: string;
  samNumber?: string;
  child_full_name?: string;
  childName?: string;
  guardian_name?: string;
  parentName?: string;
  dob?: string | Date;
  dateOfBirth?: string;
  admission_weight_kg?: number | string;
  admissionWeight?: string;
  length_height_cm?: number | string;
  admissionHeight?: string;
  admission_date?: string;
  createdAt?: string;
  is_samar_registered?: boolean;
  isSamarRegistered?: boolean;
  samar_uuid?: string;
  samarUuid?: string;
}

export default function ChildRegistrationPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [recordNo, setRecordNo] = useState("");
  const [samNumber, setSamNumber] = useState("");
  const [childName, setChildName] = useState("");
  
  const [viewType, setViewType] = useState<"all" | "normal" | "samar">("all");

  const [data, setData] = useState<Child[]>([]);
  const [filteredData, setFilteredData] = useState<Child[]>([]);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const sessionData = sessionStorage.getItem("mtc_user");
        let queryParams = "";
        
        if (sessionData) {
          try {
            const user = JSON.parse(sessionData);
            if (user.mtcId) {
              queryParams = `?mtcId=${user.mtcId}`;
            }
          } catch { // ✅ Fixed: Removed unused exception variable completely
            console.error("Session parse error");
          }
        }

        const response = await fetch(`/api/child-registration${queryParams}`, { cache: 'no-store' });
        
        if (response.ok) {
          const fetchedData: ChildApiResponseRow[] = await response.json();
          
          const mappedData: Child[] = fetchedData.map((row, i) => ({
            id: row.registration_id?.toString() || row.id || `fallback-${i}-${Math.random()}`,
            recordNo: row.registration_id?.toString() || row.recordNo || "N/A", 
            samNumber: row.sam_no || row.samNumber || "N/A",
            childName: row.child_full_name || row.childName || "Unknown",
            parentName: row.guardian_name || row.parentName || "Unknown",
            dateOfBirth: row.dob ? new Date(row.dob).toLocaleDateString() : row.dateOfBirth || "N/A",
            admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight || "-",
            admissionHeight: row.length_height_cm?.toString() || row.admissionHeight || "-",
            createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
            isSamarRegistered: row.is_samar_registered === true || row.isSamarRegistered === true,
            samarUuid: row.samar_uuid || row.samarUuid || "",
          }));

          setData(mappedData);
          setFilteredData(mappedData);
        } else {
          toast.error("Failed to load patient records.");
        }
      } catch { // ✅ Fixed: Removed unused exception variable completely
        toast.error("Network error while connecting to database.");
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  // Filter data based on manual search criteria and view type
  useEffect(() => {
    let filtered = [...data];
    
    if (viewType === "normal") {
      filtered = filtered.filter(child => !child.isSamarRegistered);
    } else if (viewType === "samar") {
      filtered = filtered.filter(child => child.isSamarRegistered);
    }

    if (recordNo) {
      filtered = filtered.filter(child => 
        child.recordNo.toLowerCase().includes(recordNo.toLowerCase())
      );
    }
    if (samNumber) {
      filtered = filtered.filter(child => 
        child.samNumber.toLowerCase().includes(samNumber.toLowerCase())
      );
    }
    if (childName) {
      filtered = filtered.filter(child => 
        child.childName.toLowerCase().includes(childName.toLowerCase())
      );
    }
    if (fromDate) {
      filtered = filtered.filter(child => {
        const childDate = new Date(child.createdAt);
        const filterDate = new Date(fromDate);
        return childDate >= filterDate;
      });
    }
    if (toDate) {
      filtered = filtered.filter(child => {
        const childDate = new Date(child.createdAt);
        const filterDate = new Date(toDate);
        filterDate.setHours(23, 59, 59, 999);
        return childDate <= filterDate;
      });
    }
    
    setFilteredData(filtered);
  }, [data, recordNo, samNumber, childName, fromDate, toDate, viewType]);

  const handleSearch = () => {
    toast.success("Filters applied!");
  };

  const handleAdd = () => {
    router.push("/mtc-user/dashboard/child-registration/add-child");
  };

  const handleBackToHome = () => {
    router.push("/mtc-user/dashboard/home");
  };

  const handleEdit = (id: string) => {
    router.push(`/mtc-user/dashboard/child-registration/edit-child/${id}`);
  };

  const countAll = data.length;
  const countNormal = data.filter(d => !d.isSamarRegistered).length;
  const countSamar = data.filter(d => d.isSamarRegistered).length;

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            Child Registration
          </h1>
          <div className="flex gap-2 sm:gap-3">
            <Button
              onClick={handleBackToHome}
              variant="outline"
              className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
            >
              <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Button>
            <Button
              onClick={handleAdd}
              className="bg-indigo-600 hover:bg-indigo-700 transition text-xs sm:text-sm"
            >
              <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
              <span className="hidden sm:inline">Add Child</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>

        <Card className="shadow-sm border border-gray-200">
          <CardContent className="pt-4 sm:pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">From Date</label>
                <div className="relative">
                  <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
                  <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">To Date</label>
                <div className="relative">
                  <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
                  <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Record No</label>
                <Input placeholder="Enter Record No" value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="text-xs sm:text-sm" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">SAM Number</label>
                <Input placeholder="Enter SAM Number" value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="text-xs sm:text-sm" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Child Name</label>
                <div className="flex gap-2">
                  <Input placeholder="Enter Child Name" value={childName} onChange={(e) => setChildName(e.target.value)} className="text-xs sm:text-sm" />
                  <Button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3">
                    <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2 items-center bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm w-max">
          <button
            onClick={() => setViewType("all")}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${viewType === "all" ? "bg-slate-800 text-white shadow" : "text-gray-600 hover:bg-gray-100"}`}
          >
            All Patients <span className="ml-1.5 text-xs opacity-70">({countAll})</span>
          </button>
          <button
            onClick={() => setViewType("normal")}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${viewType === "normal" ? "bg-blue-600 text-white shadow" : "text-gray-600 hover:bg-gray-100"}`}
          >
            Normal Registration <span className="ml-1.5 text-xs opacity-70">({countNormal})</span>
          </button>
          <button
            onClick={() => setViewType("samar")}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${viewType === "samar" ? "bg-purple-600 text-white shadow" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <CheckCircle2 className="w-4 h-4" />
            SAAMAR Tracker <span className="ml-0.5 text-xs opacity-70">({countSamar})</span>
          </button>
        </div>

        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-2 sm:pb-4 flex flex-row items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Registered Children
            </h2>
            <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
              {filteredData.length} Records
            </span>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
                <thead>
                  <tr className="bg-indigo-50/50 text-indigo-700 border-b border-gray-200">
                    <th className="py-3 px-4 text-left font-semibold">Record No</th>
                    <th className="py-3 px-4 text-left font-semibold">SAM Number</th>
                    <th className="py-3 px-4 text-left font-semibold">Child Name</th>
                    <th className="py-3 px-4 text-left font-semibold">Registration Type</th>
                    <th className="py-3 px-4 text-left font-semibold hidden sm:table-cell">Parent Name</th>
                    <th className="py-3 px-4 text-left font-semibold hidden md:table-cell">Date of Birth</th>
                    <th className="py-3 px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
                    <th className="py-3 px-4 text-left font-semibold hidden lg:table-cell">Height</th>
                    <th className="py-3 px-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-4" />
                          <p className="font-medium text-gray-600">Loading database records...</p>
                        </div>
                      </td>
                    </tr>
                  ) : filteredData.length > 0 ? (
                    filteredData.map((child, i) => (
                      <tr
                        key={child.id || `fallback-row-${i}`}
                        className={`${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        } hover:bg-indigo-50/50 transition border-b border-gray-100 last:border-0`}
                      >
                        <td className="py-3 px-4 font-mono text-gray-600">{child.recordNo}</td>
                        <td className="py-3 px-4 font-mono text-indigo-600 font-medium">{child.samNumber}</td>
                        <td className="py-3 px-4 font-semibold text-gray-900">{child.childName}</td>
                        
                        <td className="py-3 px-4">
                          {child.isSamarRegistered ? (
                            <div className="flex flex-col">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-purple-100 text-purple-700 w-max border border-purple-200">
                                SAAMAR
                              </span>
                              <span className="text-[10px] text-gray-400 mt-1 font-mono tracking-tighter" title="SAAMAR UUID">
                                {child.samarUuid || "No UUID"}
                              </span>
                            </div>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-gray-100 text-gray-500 w-max border border-gray-200">
                              Normal
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 hidden sm:table-cell text-gray-600">{child.parentName}</td>
                        <td className="py-3 px-4 hidden md:table-cell text-gray-600">{child.dateOfBirth}</td>
                        <td className="py-3 px-4 hidden lg:table-cell text-gray-600">{child.admissionWeight} kg</td>
                        <td className="py-3 px-4 hidden lg:table-cell text-gray-600">{child.admissionHeight} cm</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 p-2"
                              onClick={() => handleEdit(child.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <div className="mb-3 bg-gray-100 p-3 rounded-full">
                            <Search className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="font-medium text-gray-900">No children found</p>
                          <p className="mt-1 text-sm">Adjust your filters or add a new registration.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}