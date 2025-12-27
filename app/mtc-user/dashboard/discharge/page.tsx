// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // import { CalendarIcon, Search, Pencil, Trash2, Home, FileText } from "lucide-react";
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
// // //   admissionDate: string;
// // //   admissionEdema: string;
// // //   admissionMUAC: string;
// // //   targetWeight: string;
// // //   createdAt: string;
// // // }

// // // export default function ChildRegistrationPage() {
// // //   const router = useRouter();

// // //   const [fromDate, setFromDate] = useState("");
// // //   const [toDate, setToDate] = useState("");
// // //   const [recordNo, setRecordNo] = useState("");
// // //   const [samNumber, setSamNumber] = useState("");
// // //   const [childName, setChildName] = useState("");
// // //   const [data, setData] = useState<Child[]>([]);
// // //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// // //   // Load data from localStorage on component mount
// // //   useEffect(() => {
// // //     const storedChildren = localStorage.getItem('registeredChildren');
// // //     if (storedChildren) {
// // //       const parsedChildren = JSON.parse(storedChildren);
// // //       setData(parsedChildren);
// // //       setFilteredData(parsedChildren);
// // //     } else {
// // //       // Initialize with empty arrays when no data exists
// // //       setData([]);
// // //       setFilteredData([]);
// // //     }
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
// // //         filterDate.setHours(23, 59, 59, 999); // Include the entire day
// // //         return childDate <= filterDate;
// // //       });
// // //     }
    
// // //     setFilteredData(filtered);
// // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // //   const handleSearch = () => {
// // //     toast.success("Search applied successfully!");
// // //   };

// // //   // 🔹 Redirect to Home page
// // //   const handleBackToHome = () => {
// // //     router.push("/mtc-user/dashboard/home");
// // //   };

// // //   // 🔹 Redirect to Edit Child form
// // //   const handleEdit = (id: string) => {
// // //     router.push(`/mtc-user/dashboard/discharge/edit-discharge/${id}`);
// // //   };

// // //   // 🔹 Redirect to Discharge form
// // //   const handleDischarge = (id: string) => {
// // //     router.push(`/mtc-user/dashboard/discharge/discharge-form/${id}`);
// // //   };

// // //   // 🔹 Delete a child record
// // //   const handleDelete = (id: string) => {
// // //     if (window.confirm("Are you sure you want to delete this record?")) {
// // //       const updatedChildren = data.filter(child => child.id !== id);
// // //       setData(updatedChildren);
// // //       setFilteredData(updatedChildren);
// // //       localStorage.setItem('registeredChildren', JSON.stringify(updatedChildren));
// // //       toast.success("Record deleted successfully!");
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // //       <Toaster position="top-right" />

// // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // //         {/* Header */}
// // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // //             Child Discharge
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
// // //           </div>
// // //         </div>

// // //         {/* Filters Section */}
// // //         <Card className="shadow-sm border border-gray-200">
// // //           <CardContent className="pt-4 sm:pt-6">
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // //                   From Date
// // //                 </label>
// // //                 <div className="relative">
// // //                   <Input
// // //                     type="date"
// // //                     value={fromDate}
// // //                     onChange={(e) => setFromDate(e.target.value)}
// // //                     className="pr-8 sm:pr-10 text-xs sm:text-sm"
// // //                   />
// // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // //                   To Date
// // //                 </label>
// // //                 <div className="relative">
// // //                   <Input
// // //                     type="date"
// // //                     value={toDate}
// // //                     onChange={(e) => setToDate(e.target.value)}
// // //                     className="pr-8 sm:pr-10 text-xs sm:text-sm"
// // //                   />
// // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // //                   Record No
// // //                 </label>
// // //                 <Input
// // //                   placeholder="Enter Record No"
// // //                   value={recordNo}
// // //                   onChange={(e) => setRecordNo(e.target.value)}
// // //                   className="text-xs sm:text-sm"
// // //                 />
// // //               </div>

// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // //                   SAM Number
// // //                 </label>
// // //                 <Input
// // //                   placeholder="Enter SAM Number"
// // //                   value={samNumber}
// // //                   onChange={(e) => setSamNumber(e.target.value)}
// // //                   className="text-xs sm:text-sm"
// // //                 />
// // //               </div>

// // //               <div>
// // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // //                   Child Name
// // //                 </label>
// // //                 <div className="flex gap-2">
// // //                   <Input
// // //                     placeholder="Enter Child Name"
// // //                     value={childName}
// // //                     onChange={(e) => setChildName(e.target.value)}
// // //                     className="text-xs sm:text-sm"
// // //                   />
// // //                   <Button
// // //                     onClick={handleSearch}
// // //                     className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3"
// // //                   >
// // //                     <Search className="w-3 h-3 sm:w-4 sm:h-4" />
// // //                   </Button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         {/* Table Section */}
// // //         <Card className="shadow-sm border border-gray-200">
// // //           <CardHeader className="pb-2 sm:pb-4">
// // //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// // //               Select a Child from the list to Discharge
// // //             </h2>
// // //           </CardHeader>

// // //           <CardContent>
// // //             <div className="overflow-x-auto rounded-lg">
// // //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // //                 <thead>
// // //                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Record No</th>
// // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">SAM Number</th>
// // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Child Name</th>
// // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden sm:table-cell">Parent Name</th>
// // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden md:table-cell">Date of Birth</th>
// // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
// // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Height</th>
// // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Actions</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {filteredData.length > 0 ? (
// // //                     filteredData.map((child, i) => (
// // //                       <tr
// // //                         key={child.id}
// // //                         className={`${
// // //                           i % 2 === 0 ? "bg-white" : "bg-gray-50"
// // //                         } hover:bg-indigo-50 transition`}
// // //                       >
// // //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.recordNo}</td>
// // //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.samNumber}</td>
// // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{child.childName}</td>
// // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">{child.parentName}</td>
// // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">{child.dateOfBirth}</td>
// // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionWeight}</td>
// // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionHeight}</td>
// // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
// // //                           <div className="flex justify-center gap-1">
// // //                             <Button
// // //                               onClick={() => handleDischarge(child.id)}
// // //                               className="bg-green-600 hover:bg-green-700 p-1 sm:p-2"
// // //                               title="Discharge"
// // //                             >
// // //                               <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
// // //                             </Button>
// // //                             <Button
// // //                               onClick={() => handleEdit(child.id)}
// // //                               className="bg-blue-600 hover:bg-blue-700 p-1 sm:p-2"
// // //                               title="Edit"
// // //                             >
// // //                               <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
// // //                             </Button>
// // //                             <Button
// // //                               onClick={() => handleDelete(child.id)}
// // //                               className="bg-red-600 hover:bg-red-700 p-1 sm:p-2"
// // //                               title="Delete"
// // //                             >
// // //                               <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
// // //                             </Button>
// // //                           </div>
// // //                         </td>
// // //                       </tr>
// // //                     ))
// // //                   ) : (
// // //                     <tr>
// // //                       <td colSpan={8} className="py-8 text-center text-gray-500 text-xs sm:text-sm">
// // //                         <div className="flex flex-col items-center">
// // //                           <div className="mb-2">
// // //                             <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// // //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
// // //                             </svg>
// // //                           </div>
// // //                           <p className="font-medium">No children registered yet</p>
// // //                           <p className="mt-1">Click the &quot;Add Child&quot; button to register your first child</p>
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
// // import { CalendarIcon, Search, Pencil, Trash2, Home, FileText, Loader2 } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";

// // // Interface matching the mapped data for the UI
// // interface DischargeChild {
// //   id: string;          // Maps to SamNo
// //   recordNo: string;    // Maps to MTCCode
// //   samNumber: string;   // Maps to SamNo
// //   childName: string;   // Maps to ChildName
// //   parentName: string;  // Maps to FatherName
// //   dateOfBirth: string; // Formatted Date
// //   admissionWeight: number;
// //   admissionHeight: number;
// //   admissionDate: string; // Used for filtering
// // }

// // export default function DischargePage() {
// //   const router = useRouter();

// //   // State
// //   const [loading, setLoading] = useState(true);
// //   const [fromDate, setFromDate] = useState("");
// //   const [toDate, setToDate] = useState("");
// //   const [recordNo, setRecordNo] = useState("");
// //   const [samNumber, setSamNumber] = useState("");
// //   const [childName, setChildName] = useState("");
  
// //   const [data, setData] = useState<DischargeChild[]>([]);
// //   const [filteredData, setFilteredData] = useState<DischargeChild[]>([]);

// //   // 1. Fetch Data from API (Database)
// //   const fetchChildren = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await fetch('/api/discharge/list');
// //       const result = await response.json();

// //       if (result.success && Array.isArray(result.data)) {
// //         // Map DB columns (PascalCase) to UI Interface (camelCase)
// //         const mappedData: DischargeChild[] = result.data.map((item: any) => ({
// //           id: item.SamNo,
// //           recordNo: item.MTCCode || 'N/A',
// //           samNumber: item.SamNo,
// //           childName: item.ChildName,
// //           parentName: item.FatherName || item.MotherName, 
// //           // Format DOB safely
// //           dateOfBirth: item.DateofBirth 
// //             ? new Date(item.DateofBirth).toLocaleDateString('en-IN') 
// //             : 'N/A',
// //           admissionWeight: item.AdmissionWeight,
// //           admissionHeight: item.AdmissionHeight,
// //           admissionDate: item.AdmissionDate
// //         }));

// //         setData(mappedData);
// //         setFilteredData(mappedData);
// //       } else {
// //         toast.error("Failed to load children list");
// //       }
// //     } catch (error) {
// //       console.error("Fetch Error:", error);
// //       toast.error("Connection error. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Load data on mount
// //   useEffect(() => {
// //     fetchChildren();
// //   }, []);

// //   // 2. Filter Logic
// //   useEffect(() => {
// //     let filtered = [...data];
    
// //     if (recordNo) {
// //       filtered = filtered.filter(child => 
// //         child.recordNo?.toLowerCase().includes(recordNo.toLowerCase())
// //       );
// //     }
    
// //     if (samNumber) {
// //       filtered = filtered.filter(child => 
// //         child.samNumber?.toLowerCase().includes(samNumber.toLowerCase())
// //       );
// //     }
    
// //     if (childName) {
// //       filtered = filtered.filter(child => 
// //         child.childName?.toLowerCase().includes(childName.toLowerCase())
// //       );
// //     }
    
// //     if (fromDate) {
// //       filtered = filtered.filter(child => {
// //         if (!child.admissionDate) return false;
// //         const childDate = new Date(child.admissionDate);
// //         const filterDate = new Date(fromDate);
// //         return childDate >= filterDate;
// //       });
// //     }
    
// //     if (toDate) {
// //       filtered = filtered.filter(child => {
// //         if (!child.admissionDate) return false;
// //         const childDate = new Date(child.admissionDate);
// //         const filterDate = new Date(toDate);
// //         filterDate.setHours(23, 59, 59, 999);
// //         return childDate <= filterDate;
// //       });
// //     }
    
// //     setFilteredData(filtered);
// //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// //   const handleSearch = () => {
// //     toast.success("List updated based on filters");
// //   };

// //   // Navigation Handlers
// //   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
  
// //   // URL Encode IDs because SAM numbers often contain slashes (e.g., JH/WSB/...)
// //   const handleEdit = (id: string) => {
// //     router.push(`/mtc-user/dashboard/discharge/edit-discharge/${encodeURIComponent(id)}`);
// //   };

// //   const handleDischarge = (id: string) => {
// //     router.push(`/mtc-user/dashboard/discharge/discharge-form/${encodeURIComponent(id)}`);
// //   };

// //   const handleDelete = (id: string) => {
// //     // Note: You need to implement a DELETE API route and DB function for this to work
// //     if (window.confirm("Are you sure you want to delete this record? (Backend integration pending)")) {
// //       toast("Delete API not yet implemented", { icon: '⚠️' });
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// //       <Toaster position="top-right" />

// //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// //             Child Discharge
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
// //           </div>
// //         </div>

// //         {/* Filters Section */}
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
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Record No (MTC Code)</label>
// //                 <Input placeholder="Search MTC Code" value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="text-xs sm:text-sm" />
// //               </div>

// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">SAM Number</label>
// //                 <Input placeholder="Search SAM No" value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="text-xs sm:text-sm" />
// //               </div>

// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Child Name</label>
// //                 <div className="flex gap-2">
// //                   <Input placeholder="Search Name" value={childName} onChange={(e) => setChildName(e.target.value)} className="text-xs sm:text-sm" />
// //                   <Button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3">
// //                     <Search className="w-3 h-3 sm:w-4 sm:h-4" />
// //                   </Button>
// //                 </div>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Table Section */}
// //         <Card className="shadow-sm border border-gray-200">
// //           <CardHeader className="pb-2 sm:pb-4">
// //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// //               Select a Child from the list to Discharge
// //             </h2>
// //           </CardHeader>

// //           <CardContent>
// //             <div className="overflow-x-auto rounded-lg">
// //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// //                 <thead>
// //                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Record No</th>
// //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">SAM Number</th>
// //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Child Name</th>
// //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden sm:table-cell">Father Name</th>
// //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden md:table-cell">DOB</th>
// //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
// //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Height</th>
// //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {loading ? (
// //                     <tr>
// //                       <td colSpan={8} className="py-10 text-center text-gray-500">
// //                         <div className="flex items-center justify-center gap-2">
// //                           <Loader2 className="h-5 w-5 animate-spin" />
// //                           <span>Loading records...</span>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ) : filteredData.length > 0 ? (
// //                     filteredData.map((child, i) => (
// //                       <tr
// //                         key={child.id}
// //                         className={`${
// //                           i % 2 === 0 ? "bg-white" : "bg-gray-50"
// //                         } hover:bg-indigo-50 transition`}
// //                       >
// //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.recordNo}</td>
// //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.samNumber}</td>
// //                         <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{child.childName}</td>
// //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">{child.parentName}</td>
// //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">{child.dateOfBirth}</td>
// //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionWeight}</td>
// //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionHeight}</td>
// //                         <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
// //                           <div className="flex justify-center gap-1">
// //                             <Button
// //                               onClick={() => handleDischarge(child.id)}
// //                               className="bg-green-600 hover:bg-green-700 p-1 sm:p-2"
// //                               title="Discharge"
// //                             >
// //                               <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
// //                             </Button>
// //                             <Button
// //                               onClick={() => handleEdit(child.id)}
// //                               className="bg-blue-600 hover:bg-blue-700 p-1 sm:p-2"
// //                               title="Edit"
// //                             >
// //                               <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
// //                             </Button>
// //                             <Button
// //                               onClick={() => handleDelete(child.id)}
// //                               className="bg-red-600 hover:bg-red-700 p-1 sm:p-2"
// //                               title="Delete"
// //                             >
// //                               <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
// //                             </Button>
// //                           </div>
// //                         </td>
// //                       </tr>
// //                     ))
// //                   ) : (
// //                     <tr>
// //                       <td colSpan={8} className="py-8 text-center text-gray-500 text-xs sm:text-sm">
// //                         <div className="flex flex-col items-center">
// //                           <p className="font-medium">No children found in database</p>
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
// import { CalendarIcon, Search, Pencil, Trash2, Home, FileText, Loader2 } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// // Interface matching the mapped data for the UI
// interface DischargeChild {
//   id: string;          // Maps to SamNo
//   recordNo: string;    // Maps to MTCCode
//   samNumber: string;   // Maps to SamNo
//   childName: string;   // Maps to ChildName
//   parentName: string;  // Maps to FatherName
//   dateOfBirth: string; // Formatted Date
//   admissionWeight: number;
//   admissionHeight: number;
//   admissionDate: string; // Used for filtering
// }

// export default function DischargePage() {
//   const router = useRouter();

//   // State
//   const [loading, setLoading] = useState(true);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [recordNo, setRecordNo] = useState("");
//   const [samNumber, setSamNumber] = useState("");
//   const [childName, setChildName] = useState("");
  
//   const [data, setData] = useState<DischargeChild[]>([]);
//   const [filteredData, setFilteredData] = useState<DischargeChild[]>([]);

//   // 1. Fetch Data from API (Database)
//   const fetchChildren = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/discharge/list');
//       const result = await response.json();

//       if (result.success && Array.isArray(result.data)) {
//         // Map DB columns (PascalCase) to UI Interface (camelCase)
//         const mappedData: DischargeChild[] = result.data.map((item: any) => ({
//           id: item.SamNo,
//           recordNo: item.MTCCode || 'N/A',
//           samNumber: item.SamNo,
//           childName: item.ChildName,
//           parentName: item.FatherName || item.MotherName, 
//           // Format DOB safely
//           dateOfBirth: item.DateofBirth 
//             ? new Date(item.DateofBirth).toLocaleDateString('en-IN') 
//             : 'N/A',
//           admissionWeight: item.AdmissionWeight,
//           admissionHeight: item.AdmissionHeight,
//           admissionDate: item.AdmissionDate
//         }));

//         setData(mappedData);
//         setFilteredData(mappedData);
//       } else {
//         toast.error("Failed to load children list");
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//       toast.error("Connection error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load data on mount
//   useEffect(() => {
//     fetchChildren();
//   }, []);

//   // 2. Filter Logic
//   useEffect(() => {
//     let filtered = [...data];
    
//     if (recordNo) {
//       filtered = filtered.filter(child => 
//         child.recordNo?.toLowerCase().includes(recordNo.toLowerCase())
//       );
//     }
    
//     if (samNumber) {
//       filtered = filtered.filter(child => 
//         child.samNumber?.toLowerCase().includes(samNumber.toLowerCase())
//       );
//     }
    
//     if (childName) {
//       filtered = filtered.filter(child => 
//         child.childName?.toLowerCase().includes(childName.toLowerCase())
//       );
//     }
    
//     if (fromDate) {
//       filtered = filtered.filter(child => {
//         if (!child.admissionDate) return false;
//         const childDate = new Date(child.admissionDate);
//         const filterDate = new Date(fromDate);
//         return childDate >= filterDate;
//       });
//     }
    
//     if (toDate) {
//       filtered = filtered.filter(child => {
//         if (!child.admissionDate) return false;
//         const childDate = new Date(child.admissionDate);
//         const filterDate = new Date(toDate);
//         filterDate.setHours(23, 59, 59, 999);
//         return childDate <= filterDate;
//       });
//     }
    
//     setFilteredData(filtered);
//   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

//   const handleSearch = () => {
//     toast.success("List updated based on filters");
//   };

//   // Navigation Handlers
//   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
  
//   // URL Encode IDs because SAM numbers often contain slashes (e.g., JH/WSB/...)
//   const handleEdit = (id: string) => {
//     router.push(`/mtc-user/dashboard/discharge/edit-discharge/${encodeURIComponent(id)}`);
//   };

//   const handleDischarge = (id: string) => {
//     router.push(`/mtc-user/dashboard/discharge/discharge-from/${encodeURIComponent(id)}`);
//   };

//   const handleDelete = (id: string) => {
//     // Note: You need to implement a DELETE API route and DB function for this to work
//     if (window.confirm("Are you sure you want to delete this record? (Backend integration pending)")) {
//       toast("Delete API not yet implemented", { icon: '⚠️' });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
//       <Toaster position="top-right" />

//       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
//             Child Discharge
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
//           </div>
//         </div>

//         {/* Filters Section */}
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
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Record No (MTC Code)</label>
//                 <Input placeholder="Search MTC Code" value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="text-xs sm:text-sm" />
//               </div>

//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">SAM Number</label>
//                 <Input placeholder="Search SAM No" value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="text-xs sm:text-sm" />
//               </div>

//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Child Name</label>
//                 <div className="flex gap-2">
//                   <Input placeholder="Search Name" value={childName} onChange={(e) => setChildName(e.target.value)} className="text-xs sm:text-sm" />
//                   <Button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3">
//                     <Search className="w-3 h-3 sm:w-4 sm:h-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Table Section */}
//         <Card className="shadow-sm border border-gray-200">
//           <CardHeader className="pb-2 sm:pb-4">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//               Select a Child from the list to Discharge
//             </h2>
//           </CardHeader>

//           <CardContent>
//             <div className="overflow-x-auto rounded-lg">
//               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
//                 <thead>
//                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
//                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Record No</th>
//                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">SAM Number</th>
//                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Child Name</th>
//                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden sm:table-cell">Father Name</th>
//                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden md:table-cell">DOB</th>
//                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
//                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Height</th>
//                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan={8} className="py-10 text-center text-gray-500">
//                         <div className="flex items-center justify-center gap-2">
//                           <Loader2 className="h-5 w-5 animate-spin" />
//                           <span>Loading records...</span>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : filteredData.length > 0 ? (
//                     filteredData.map((child, i) => (
//                       <tr
//                         key={child.id}
//                         className={`${
//                           i % 2 === 0 ? "bg-white" : "bg-gray-50"
//                         } hover:bg-indigo-50 transition`}
//                       >
//                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.recordNo}</td>
//                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.samNumber}</td>
//                         <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{child.childName}</td>
//                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">{child.parentName}</td>
//                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">{child.dateOfBirth}</td>
//                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionWeight}</td>
//                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionHeight}</td>
//                         <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
//                           <div className="flex justify-center gap-1">
//                             <Button
//                               onClick={() => handleDischarge(child.id)}
//                               className="bg-green-600 hover:bg-green-700 p-1 sm:p-2"
//                               title="Discharge"
//                             >
//                               <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
//                             </Button>
//                             <Button
//                               onClick={() => handleEdit(child.id)}
//                               className="bg-blue-600 hover:bg-blue-700 p-1 sm:p-2"
//                               title="Edit"
//                             >
//                               <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
//                             </Button>
//                             <Button
//                               onClick={() => handleDelete(child.id)}
//                               className="bg-red-600 hover:bg-red-700 p-1 sm:p-2"
//                               title="Delete"
//                             >
//                               <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={8} className="py-8 text-center text-gray-500 text-xs sm:text-sm">
//                         <div className="flex flex-col items-center">
//                           <p className="font-medium">No children found in database</p>
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
import { CalendarIcon, Search, Pencil, Trash2, Home, FileText, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Interface for the raw data coming from the API (PascalCase)
interface ApiChildRecord {
  SamNo: string;
  MTCCode: string | null;
  ChildName: string;
  FatherName: string;
  MotherName: string;
  DateofBirth: string;
  AdmissionWeight: number;
  AdmissionHeight: number;
  AdmissionDate: string;
}

// Interface matching the mapped data for the UI (camelCase)
interface DischargeChild {
  id: string;          // Maps to SamNo
  recordNo: string;    // Maps to MTCCode
  samNumber: string;   // Maps to SamNo
  childName: string;   // Maps to ChildName
  parentName: string;  // Maps to FatherName
  dateOfBirth: string; // Formatted Date
  admissionWeight: number;
  admissionHeight: number;
  admissionDate: string; // Used for filtering
}

export default function DischargePage() {
  const router = useRouter();

  // State
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [recordNo, setRecordNo] = useState("");
  const [samNumber, setSamNumber] = useState("");
  const [childName, setChildName] = useState("");
  
  const [data, setData] = useState<DischargeChild[]>([]);
  const [filteredData, setFilteredData] = useState<DischargeChild[]>([]);

  // 1. Fetch Data from API (Database)
  const fetchChildren = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/discharge/list');
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        // Cast result.data to the specific API interface instead of using 'any'
        const rawData = result.data as ApiChildRecord[];

        // Map DB columns (PascalCase) to UI Interface (camelCase)
        const mappedData: DischargeChild[] = rawData.map((item) => ({
          id: item.SamNo,
          recordNo: item.MTCCode || 'N/A',
          samNumber: item.SamNo,
          childName: item.ChildName,
          parentName: item.FatherName || item.MotherName, 
          // Format DOB safely
          dateOfBirth: item.DateofBirth 
            ? new Date(item.DateofBirth).toLocaleDateString('en-IN') 
            : 'N/A',
          admissionWeight: item.AdmissionWeight,
          admissionHeight: item.AdmissionHeight,
          admissionDate: item.AdmissionDate
        }));

        setData(mappedData);
        setFilteredData(mappedData);
      } else {
        toast.error("Failed to load children list");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchChildren();
  }, []);

  // 2. Filter Logic
  useEffect(() => {
    let filtered = [...data];
    
    if (recordNo) {
      filtered = filtered.filter(child => 
        child.recordNo?.toLowerCase().includes(recordNo.toLowerCase())
      );
    }
    
    if (samNumber) {
      filtered = filtered.filter(child => 
        child.samNumber?.toLowerCase().includes(samNumber.toLowerCase())
      );
    }
    
    if (childName) {
      filtered = filtered.filter(child => 
        child.childName?.toLowerCase().includes(childName.toLowerCase())
      );
    }
    
    if (fromDate) {
      filtered = filtered.filter(child => {
        if (!child.admissionDate) return false;
        const childDate = new Date(child.admissionDate);
        const filterDate = new Date(fromDate);
        return childDate >= filterDate;
      });
    }
    
    if (toDate) {
      filtered = filtered.filter(child => {
        if (!child.admissionDate) return false;
        const childDate = new Date(child.admissionDate);
        const filterDate = new Date(toDate);
        filterDate.setHours(23, 59, 59, 999);
        return childDate <= filterDate;
      });
    }
    
    setFilteredData(filtered);
  }, [data, recordNo, samNumber, childName, fromDate, toDate]);

  const handleSearch = () => {
    toast.success("List updated based on filters");
  };

  // Navigation Handlers
  const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
  
  // URL Encode IDs because SAM numbers often contain slashes (e.g., JH/WSB/...)
  const handleEdit = (id: string) => {
    router.push(`/mtc-user/dashboard/discharge/edit-discharge/${encodeURIComponent(id)}`);
  };

  const handleDischarge = (id: string) => {
    router.push(`/mtc-user/dashboard/discharge/discharge-from/${encodeURIComponent(id)}`);
  };

  const handleDelete = (id: string) => {
    // Note: You need to implement a DELETE API route and DB function for this to work
    if (window.confirm("Are you sure you want to delete this record? (Backend integration pending)")) {
      // Log the ID to satisfy the linter warning about unused variables
      console.log("Deleting record with ID:", id); 
      toast("Delete API not yet implemented", { icon: '⚠️' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            Child Discharge
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
          </div>
        </div>

        {/* Filters Section */}
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
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Record No (MTC Code)</label>
                <Input placeholder="Search MTC Code" value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="text-xs sm:text-sm" />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">SAM Number</label>
                <Input placeholder="Search SAM No" value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="text-xs sm:text-sm" />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Child Name</label>
                <div className="flex gap-2">
                  <Input placeholder="Search Name" value={childName} onChange={(e) => setChildName(e.target.value)} className="text-xs sm:text-sm" />
                  <Button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3">
                    <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-2 sm:pb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Select a Child from the list to Discharge
            </h2>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
                <thead>
                  <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Record No</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">SAM Number</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Child Name</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden sm:table-cell">Father Name</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden md:table-cell">DOB</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Height</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-gray-500">
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Loading records...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredData.length > 0 ? (
                    filteredData.map((child, i) => (
                      <tr
                        key={child.id}
                        className={`${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-indigo-50 transition`}
                      >
                        <td className="py-2 sm:py-3 px-2 sm:px-4">{child.recordNo}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4">{child.samNumber}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{child.childName}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">{child.parentName}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">{child.dateOfBirth}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionWeight}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionHeight}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                          <div className="flex justify-center gap-1">
                            <Button
                              onClick={() => handleDischarge(child.id)}
                              className="bg-green-600 hover:bg-green-700 p-1 sm:p-2"
                              title="Discharge"
                            >
                              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <Button
                              onClick={() => handleEdit(child.id)}
                              className="bg-blue-600 hover:bg-blue-700 p-1 sm:p-2"
                              title="Edit"
                            >
                              <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <Button
                              onClick={() => handleDelete(child.id)}
                              className="bg-red-600 hover:bg-red-700 p-1 sm:p-2"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-gray-500 text-xs sm:text-sm">
                        <div className="flex flex-col items-center">
                          <p className="font-medium">No children found in database</p>
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