// // // // // // // // // // "use client";

// // // // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // // // import { useRouter } from "next/navigation";
// // // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // // // // // import { CalendarIcon, Search, Pencil, Trash2, Home, FileText } from "lucide-react";
// // // // // // // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // // // // // interface Child {
// // // // // // // // // //   id: string;
// // // // // // // // // //   recordNo: string;
// // // // // // // // // //   samNumber: string;
// // // // // // // // // //   childName: string;
// // // // // // // // // //   parentName: string;
// // // // // // // // // //   dateOfBirth: string;
// // // // // // // // // //   admissionWeight: string;
// // // // // // // // // //   admissionHeight: string;
// // // // // // // // // //   admissionDate: string;
// // // // // // // // // //   admissionEdema: string;
// // // // // // // // // //   admissionMUAC: string;
// // // // // // // // // //   targetWeight: string;
// // // // // // // // // //   createdAt: string;
// // // // // // // // // // }

// // // // // // // // // // export default function ChildRegistrationPage() {
// // // // // // // // // //   const router = useRouter();

// // // // // // // // // //   const [fromDate, setFromDate] = useState("");
// // // // // // // // // //   const [toDate, setToDate] = useState("");
// // // // // // // // // //   const [recordNo, setRecordNo] = useState("");
// // // // // // // // // //   const [samNumber, setSamNumber] = useState("");
// // // // // // // // // //   const [childName, setChildName] = useState("");
// // // // // // // // // //   const [data, setData] = useState<Child[]>([]);
// // // // // // // // // //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// // // // // // // // // //   // Load data from localStorage on component mount
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const storedChildren = localStorage.getItem('registeredChildren');
// // // // // // // // // //     if (storedChildren) {
// // // // // // // // // //       const parsedChildren = JSON.parse(storedChildren);
// // // // // // // // // //       setData(parsedChildren);
// // // // // // // // // //       setFilteredData(parsedChildren);
// // // // // // // // // //     } else {
// // // // // // // // // //       // Initialize with empty arrays when no data exists
// // // // // // // // // //       setData([]);
// // // // // // // // // //       setFilteredData([]);
// // // // // // // // // //     }
// // // // // // // // // //   }, []);

// // // // // // // // // //   // Filter data based on search criteria
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     let filtered = [...data];
    
// // // // // // // // // //     if (recordNo) {
// // // // // // // // // //       filtered = filtered.filter(child => 
// // // // // // // // // //         child.recordNo.toLowerCase().includes(recordNo.toLowerCase())
// // // // // // // // // //       );
// // // // // // // // // //     }
    
// // // // // // // // // //     if (samNumber) {
// // // // // // // // // //       filtered = filtered.filter(child => 
// // // // // // // // // //         child.samNumber.toLowerCase().includes(samNumber.toLowerCase())
// // // // // // // // // //       );
// // // // // // // // // //     }
    
// // // // // // // // // //     if (childName) {
// // // // // // // // // //       filtered = filtered.filter(child => 
// // // // // // // // // //         child.childName.toLowerCase().includes(childName.toLowerCase())
// // // // // // // // // //       );
// // // // // // // // // //     }
    
// // // // // // // // // //     if (fromDate) {
// // // // // // // // // //       filtered = filtered.filter(child => {
// // // // // // // // // //         const childDate = new Date(child.createdAt);
// // // // // // // // // //         const filterDate = new Date(fromDate);
// // // // // // // // // //         return childDate >= filterDate;
// // // // // // // // // //       });
// // // // // // // // // //     }
    
// // // // // // // // // //     if (toDate) {
// // // // // // // // // //       filtered = filtered.filter(child => {
// // // // // // // // // //         const childDate = new Date(child.createdAt);
// // // // // // // // // //         const filterDate = new Date(toDate);
// // // // // // // // // //         filterDate.setHours(23, 59, 59, 999); // Include the entire day
// // // // // // // // // //         return childDate <= filterDate;
// // // // // // // // // //       });
// // // // // // // // // //     }
    
// // // // // // // // // //     setFilteredData(filtered);
// // // // // // // // // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // // // // // // // // //   const handleSearch = () => {
// // // // // // // // // //     toast.success("Search applied successfully!");
// // // // // // // // // //   };

// // // // // // // // // //   // 🔹 Redirect to Home page
// // // // // // // // // //   const handleBackToHome = () => {
// // // // // // // // // //     router.push("/mtc-user/dashboard/home");
// // // // // // // // // //   };

// // // // // // // // // //   // 🔹 Redirect to Edit Child form
// // // // // // // // // //   const handleEdit = (id: string) => {
// // // // // // // // // //     router.push(`/mtc-user/dashboard/discharge/edit-discharge/${id}`);
// // // // // // // // // //   };

// // // // // // // // // //   // 🔹 Redirect to Discharge form
// // // // // // // // // //   const handleDischarge = (id: string) => {
// // // // // // // // // //     router.push(`/mtc-user/dashboard/discharge/discharge-form/${id}`);
// // // // // // // // // //   };

// // // // // // // // // //   // 🔹 Delete a child record
// // // // // // // // // //   const handleDelete = (id: string) => {
// // // // // // // // // //     if (window.confirm("Are you sure you want to delete this record?")) {
// // // // // // // // // //       const updatedChildren = data.filter(child => child.id !== id);
// // // // // // // // // //       setData(updatedChildren);
// // // // // // // // // //       setFilteredData(updatedChildren);
// // // // // // // // // //       localStorage.setItem('registeredChildren', JSON.stringify(updatedChildren));
// // // // // // // // // //       toast.success("Record deleted successfully!");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // // // // // // // // //       <Toaster position="top-right" />

// // // // // // // // // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // // // // // // // // //         {/* Header */}
// // // // // // // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // // // // // // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // // // // // // // // //             Child Discharge
// // // // // // // // // //           </h1>
// // // // // // // // // //           <div className="flex gap-2 sm:gap-3">
// // // // // // // // // //             <Button
// // // // // // // // // //               onClick={handleBackToHome}
// // // // // // // // // //               variant="outline"
// // // // // // // // // //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// // // // // // // // // //             >
// // // // // // // // // //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // // // // // // // // //               <span className="hidden sm:inline">Back to Home</span>
// // // // // // // // // //               <span className="sm:hidden">Home</span>
// // // // // // // // // //             </Button>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>

// // // // // // // // // //         {/* Filters Section */}
// // // // // // // // // //         <Card className="shadow-sm border border-gray-200">
// // // // // // // // // //           <CardContent className="pt-4 sm:pt-6">
// // // // // // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
// // // // // // // // // //               <div>
// // // // // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // // // // // // //                   From Date
// // // // // // // // // //                 </label>
// // // // // // // // // //                 <div className="relative">
// // // // // // // // // //                   <Input
// // // // // // // // // //                     type="date"
// // // // // // // // // //                     value={fromDate}
// // // // // // // // // //                     onChange={(e) => setFromDate(e.target.value)}
// // // // // // // // // //                     className="pr-8 sm:pr-10 text-xs sm:text-sm"
// // // // // // // // // //                   />
// // // // // // // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // // // // // // // //                 </div>
// // // // // // // // // //               </div>

// // // // // // // // // //               <div>
// // // // // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // // // // // // //                   To Date
// // // // // // // // // //                 </label>
// // // // // // // // // //                 <div className="relative">
// // // // // // // // // //                   <Input
// // // // // // // // // //                     type="date"
// // // // // // // // // //                     value={toDate}
// // // // // // // // // //                     onChange={(e) => setToDate(e.target.value)}
// // // // // // // // // //                     className="pr-8 sm:pr-10 text-xs sm:text-sm"
// // // // // // // // // //                   />
// // // // // // // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // // // // // // // //                 </div>
// // // // // // // // // //               </div>

// // // // // // // // // //               <div>
// // // // // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // // // // // // //                   Record No
// // // // // // // // // //                 </label>
// // // // // // // // // //                 <Input
// // // // // // // // // //                   placeholder="Enter Record No"
// // // // // // // // // //                   value={recordNo}
// // // // // // // // // //                   onChange={(e) => setRecordNo(e.target.value)}
// // // // // // // // // //                   className="text-xs sm:text-sm"
// // // // // // // // // //                 />
// // // // // // // // // //               </div>

// // // // // // // // // //               <div>
// // // // // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // // // // // // //                   SAM Number
// // // // // // // // // //                 </label>
// // // // // // // // // //                 <Input
// // // // // // // // // //                   placeholder="Enter SAM Number"
// // // // // // // // // //                   value={samNumber}
// // // // // // // // // //                   onChange={(e) => setSamNumber(e.target.value)}
// // // // // // // // // //                   className="text-xs sm:text-sm"
// // // // // // // // // //                 />
// // // // // // // // // //               </div>

// // // // // // // // // //               <div>
// // // // // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // // // // // // //                   Child Name
// // // // // // // // // //                 </label>
// // // // // // // // // //                 <div className="flex gap-2">
// // // // // // // // // //                   <Input
// // // // // // // // // //                     placeholder="Enter Child Name"
// // // // // // // // // //                     value={childName}
// // // // // // // // // //                     onChange={(e) => setChildName(e.target.value)}
// // // // // // // // // //                     className="text-xs sm:text-sm"
// // // // // // // // // //                   />
// // // // // // // // // //                   <Button
// // // // // // // // // //                     onClick={handleSearch}
// // // // // // // // // //                     className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3"
// // // // // // // // // //                   >
// // // // // // // // // //                     <Search className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // // // // // //                   </Button>
// // // // // // // // // //                 </div>
// // // // // // // // // //               </div>
// // // // // // // // // //             </div>
// // // // // // // // // //           </CardContent>
// // // // // // // // // //         </Card>

// // // // // // // // // //         {/* Table Section */}
// // // // // // // // // //         <Card className="shadow-sm border border-gray-200">
// // // // // // // // // //           <CardHeader className="pb-2 sm:pb-4">
// // // // // // // // // //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// // // // // // // // // //               Select a Child from the list to Discharge
// // // // // // // // // //             </h2>
// // // // // // // // // //           </CardHeader>

// // // // // // // // // //           <CardContent>
// // // // // // // // // //             <div className="overflow-x-auto rounded-lg">
// // // // // // // // // //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // // // // // // // // //                 <thead>
// // // // // // // // // //                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Record No</th>
// // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">SAM Number</th>
// // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Child Name</th>
// // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden sm:table-cell">Parent Name</th>
// // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden md:table-cell">Date of Birth</th>
// // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
// // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Height</th>
// // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Actions</th>
// // // // // // // // // //                   </tr>
// // // // // // // // // //                 </thead>
// // // // // // // // // //                 <tbody>
// // // // // // // // // //                   {filteredData.length > 0 ? (
// // // // // // // // // //                     filteredData.map((child, i) => (
// // // // // // // // // //                       <tr
// // // // // // // // // //                         key={child.id}
// // // // // // // // // //                         className={`${
// // // // // // // // // //                           i % 2 === 0 ? "bg-white" : "bg-gray-50"
// // // // // // // // // //                         } hover:bg-indigo-50 transition`}
// // // // // // // // // //                       >
// // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.recordNo}</td>
// // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.samNumber}</td>
// // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{child.childName}</td>
// // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">{child.parentName}</td>
// // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">{child.dateOfBirth}</td>
// // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionWeight}</td>
// // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionHeight}</td>
// // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
// // // // // // // // // //                           <div className="flex justify-center gap-1">
// // // // // // // // // //                             <Button
// // // // // // // // // //                               onClick={() => handleDischarge(child.id)}
// // // // // // // // // //                               className="bg-green-600 hover:bg-green-700 p-1 sm:p-2"
// // // // // // // // // //                               title="Discharge"
// // // // // // // // // //                             >
// // // // // // // // // //                               <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // // // // // //                             </Button>
// // // // // // // // // //                             <Button
// // // // // // // // // //                               onClick={() => handleEdit(child.id)}
// // // // // // // // // //                               className="bg-blue-600 hover:bg-blue-700 p-1 sm:p-2"
// // // // // // // // // //                               title="Edit"
// // // // // // // // // //                             >
// // // // // // // // // //                               <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // // // // // //                             </Button>
// // // // // // // // // //                             <Button
// // // // // // // // // //                               onClick={() => handleDelete(child.id)}
// // // // // // // // // //                               className="bg-red-600 hover:bg-red-700 p-1 sm:p-2"
// // // // // // // // // //                               title="Delete"
// // // // // // // // // //                             >
// // // // // // // // // //                               <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // // // // // //                             </Button>
// // // // // // // // // //                           </div>
// // // // // // // // // //                         </td>
// // // // // // // // // //                       </tr>
// // // // // // // // // //                     ))
// // // // // // // // // //                   ) : (
// // // // // // // // // //                     <tr>
// // // // // // // // // //                       <td colSpan={8} className="py-8 text-center text-gray-500 text-xs sm:text-sm">
// // // // // // // // // //                         <div className="flex flex-col items-center">
// // // // // // // // // //                           <div className="mb-2">
// // // // // // // // // //                             <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// // // // // // // // // //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
// // // // // // // // // //                             </svg>
// // // // // // // // // //                           </div>
// // // // // // // // // //                           <p className="font-medium">No children registered yet</p>
// // // // // // // // // //                           <p className="mt-1">Click the &quot;Add Child&quot; button to register your first child</p>
// // // // // // // // // //                         </div>
// // // // // // // // // //                       </td>
// // // // // // // // // //                     </tr>
// // // // // // // // // //                   )}
// // // // // // // // // //                 </tbody>
// // // // // // // // // //               </table>
// // // // // // // // // //             </div>
// // // // // // // // // //           </CardContent>
// // // // // // // // // //         </Card>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }


// // // // // // "use client";

// // // // // // import { useState, useEffect } from "react";
// // // // // // import { useRouter } from "next/navigation";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // import { CalendarIcon, Search, Pencil, Trash2, Home, FileText, Loader2 } from "lucide-react";
// // // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // // Interface matching the mapped data for the UI
// // // // // // interface DischargeChild {
// // // // // //   id: string;          // Maps to SamNo
// // // // // //   recordNo: string;    // Maps to MTCCode
// // // // // //   samNumber: string;   // Maps to SamNo
// // // // // //   childName: string;   // Maps to ChildName
// // // // // //   parentName: string;  // Maps to FatherName
// // // // // //   dateOfBirth: string; // Formatted Date
// // // // // //   admissionWeight: number;
// // // // // //   admissionHeight: number;
// // // // // //   admissionDate: string; // Used for filtering
// // // // // // }

// // // // // // export default function DischargePage() {
// // // // // //   const router = useRouter();

// // // // // //   // State
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [fromDate, setFromDate] = useState("");
// // // // // //   const [toDate, setToDate] = useState("");
// // // // // //   const [recordNo, setRecordNo] = useState("");
// // // // // //   const [samNumber, setSamNumber] = useState("");
// // // // // //   const [childName, setChildName] = useState("");
  
// // // // // //   const [data, setData] = useState<DischargeChild[]>([]);
// // // // // //   const [filteredData, setFilteredData] = useState<DischargeChild[]>([]);

// // // // // //   // 1. Fetch Data from API (Database)
// // // // // //   const fetchChildren = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       const response = await fetch('/api/discharge/list');
// // // // // //       const result = await response.json();

// // // // // //       if (result.success && Array.isArray(result.data)) {
// // // // // //         // Map DB columns (PascalCase) to UI Interface (camelCase)
// // // // // //         const mappedData: DischargeChild[] = result.data.map((item: any) => ({
// // // // // //           id: item.SamNo,
// // // // // //           recordNo: item.MTCCode || 'N/A',
// // // // // //           samNumber: item.SamNo,
// // // // // //           childName: item.ChildName,
// // // // // //           parentName: item.FatherName || item.MotherName, 
// // // // // //           // Format DOB safely
// // // // // //           dateOfBirth: item.DateofBirth 
// // // // // //             ? new Date(item.DateofBirth).toLocaleDateString('en-IN') 
// // // // // //             : 'N/A',
// // // // // //           admissionWeight: item.AdmissionWeight,
// // // // // //           admissionHeight: item.AdmissionHeight,
// // // // // //           admissionDate: item.AdmissionDate
// // // // // //         }));

// // // // // //         setData(mappedData);
// // // // // //         setFilteredData(mappedData);
// // // // // //       } else {
// // // // // //         toast.error("Failed to load children list");
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("Fetch Error:", error);
// // // // // //       toast.error("Connection error. Please try again.");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // Load data on mount
// // // // // //   useEffect(() => {
// // // // // //     fetchChildren();
// // // // // //   }, []);

// // // // // //   // 2. Filter Logic
// // // // // //   useEffect(() => {
// // // // // //     let filtered = [...data];
    
// // // // // //     if (recordNo) {
// // // // // //       filtered = filtered.filter(child => 
// // // // // //         child.recordNo?.toLowerCase().includes(recordNo.toLowerCase())
// // // // // //       );
// // // // // //     }
    
// // // // // //     if (samNumber) {
// // // // // //       filtered = filtered.filter(child => 
// // // // // //         child.samNumber?.toLowerCase().includes(samNumber.toLowerCase())
// // // // // //       );
// // // // // //     }
    
// // // // // //     if (childName) {
// // // // // //       filtered = filtered.filter(child => 
// // // // // //         child.childName?.toLowerCase().includes(childName.toLowerCase())
// // // // // //       );
// // // // // //     }
    
// // // // // //     if (fromDate) {
// // // // // //       filtered = filtered.filter(child => {
// // // // // //         if (!child.admissionDate) return false;
// // // // // //         const childDate = new Date(child.admissionDate);
// // // // // //         const filterDate = new Date(fromDate);
// // // // // //         return childDate >= filterDate;
// // // // // //       });
// // // // // //     }
    
// // // // // //     if (toDate) {
// // // // // //       filtered = filtered.filter(child => {
// // // // // //         if (!child.admissionDate) return false;
// // // // // //         const childDate = new Date(child.admissionDate);
// // // // // //         const filterDate = new Date(toDate);
// // // // // //         filterDate.setHours(23, 59, 59, 999);
// // // // // //         return childDate <= filterDate;
// // // // // //       });
// // // // // //     }
    
// // // // // //     setFilteredData(filtered);
// // // // // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // // // // //   const handleSearch = () => {
// // // // // //     toast.success("List updated based on filters");
// // // // // //   };

// // // // // //   // Navigation Handlers
// // // // // //   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
  
// // // // // //   // URL Encode IDs because SAM numbers often contain slashes (e.g., JH/WSB/...)
// // // // // //   const handleEdit = (id: string) => {
// // // // // //     router.push(`/mtc-user/dashboard/discharge/edit-discharge/${encodeURIComponent(id)}`);
// // // // // //   };

// // // // // //   const handleDischarge = (id: string) => {
// // // // // //     router.push(`/mtc-user/dashboard/discharge/discharge-form/${encodeURIComponent(id)}`);
// // // // // //   };

// // // // // //   const handleDelete = (id: string) => {
// // // // // //     // Note: You need to implement a DELETE API route and DB function for this to work
// // // // // //     if (window.confirm("Are you sure you want to delete this record? (Backend integration pending)")) {
// // // // // //       toast("Delete API not yet implemented", { icon: '⚠️' });
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // // // // //       <Toaster position="top-right" />

// // // // // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // // // // //         {/* Header */}
// // // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // // // // //             Child Discharge
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
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Filters Section */}
// // // // // //         <Card className="shadow-sm border border-gray-200">
// // // // // //           <CardContent className="pt-4 sm:pt-6">
// // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
// // // // // //               <div>
// // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">From Date</label>
// // // // // //                 <div className="relative">
// // // // // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// // // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div>
// // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">To Date</label>
// // // // // //                 <div className="relative">
// // // // // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// // // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div>
// // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Record No (MTC Code)</label>
// // // // // //                 <Input placeholder="Search MTC Code" value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="text-xs sm:text-sm" />
// // // // // //               </div>

// // // // // //               <div>
// // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">SAM Number</label>
// // // // // //                 <Input placeholder="Search SAM No" value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="text-xs sm:text-sm" />
// // // // // //               </div>

// // // // // //               <div>
// // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Child Name</label>
// // // // // //                 <div className="flex gap-2">
// // // // // //                   <Input placeholder="Search Name" value={childName} onChange={(e) => setChildName(e.target.value)} className="text-xs sm:text-sm" />
// // // // // //                   <Button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3">
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
// // // // // //               Select a Child from the list to Discharge
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
// // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden sm:table-cell">Father Name</th>
// // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden md:table-cell">DOB</th>
// // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
// // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Height</th>
// // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Actions</th>
// // // // // //                   </tr>
// // // // // //                 </thead>
// // // // // //                 <tbody>
// // // // // //                   {loading ? (
// // // // // //                     <tr>
// // // // // //                       <td colSpan={8} className="py-10 text-center text-gray-500">
// // // // // //                         <div className="flex items-center justify-center gap-2">
// // // // // //                           <Loader2 className="h-5 w-5 animate-spin" />
// // // // // //                           <span>Loading records...</span>
// // // // // //                         </div>
// // // // // //                       </td>
// // // // // //                     </tr>
// // // // // //                   ) : filteredData.length > 0 ? (
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
// // // // // //                           <div className="flex justify-center gap-1">
// // // // // //                             <Button
// // // // // //                               onClick={() => handleDischarge(child.id)}
// // // // // //                               className="bg-green-600 hover:bg-green-700 p-1 sm:p-2"
// // // // // //                               title="Discharge"
// // // // // //                             >
// // // // // //                               <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // //                             </Button>
// // // // // //                             <Button
// // // // // //                               onClick={() => handleEdit(child.id)}
// // // // // //                               className="bg-blue-600 hover:bg-blue-700 p-1 sm:p-2"
// // // // // //                               title="Edit"
// // // // // //                             >
// // // // // //                               <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // //                             </Button>
// // // // // //                             <Button
// // // // // //                               onClick={() => handleDelete(child.id)}
// // // // // //                               className="bg-red-600 hover:bg-red-700 p-1 sm:p-2"
// // // // // //                               title="Delete"
// // // // // //                             >
// // // // // //                               <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // //                             </Button>
// // // // // //                           </div>
// // // // // //                         </td>
// // // // // //                       </tr>
// // // // // //                     ))
// // // // // //                   ) : (
// // // // // //                     <tr>
// // // // // //                       <td colSpan={8} className="py-8 text-center text-gray-500 text-xs sm:text-sm">
// // // // // //                         <div className="flex flex-col items-center">
// // // // // //                           <p className="font-medium">No children found in database</p>
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

// // // // // // // // // // // // "use client";

// // // // // // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // // // // // import { useRouter } from "next/navigation";
// // // // // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // // // // // // // import { CalendarIcon, Search, Pencil, Trash2, Home, FileText, Loader2 } from "lucide-react";
// // // // // // // // // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // // // // // // // // Interface matching the mapped data for the UI
// // // // // // // // // // // // interface DischargeChild {
// // // // // // // // // // // //   id: string;          // Maps to SamNo
// // // // // // // // // // // //   recordNo: string;    // Maps to MTCCode
// // // // // // // // // // // //   samNumber: string;   // Maps to SamNo
// // // // // // // // // // // //   childName: string;   // Maps to ChildName
// // // // // // // // // // // //   parentName: string;  // Maps to FatherName
// // // // // // // // // // // //   dateOfBirth: string; // Formatted Date
// // // // // // // // // // // //   admissionWeight: number;
// // // // // // // // // // // //   admissionHeight: number;
// // // // // // // // // // // //   admissionDate: string; // Used for filtering
// // // // // // // // // // // // }

// // // // // // // // // // // // export default function DischargePage() {
// // // // // // // // // // // //   const router = useRouter();

// // // // // // // // // // // //   // State
// // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // //   const [fromDate, setFromDate] = useState("");
// // // // // // // // // // // //   const [toDate, setToDate] = useState("");
// // // // // // // // // // // //   const [recordNo, setRecordNo] = useState("");
// // // // // // // // // // // //   const [samNumber, setSamNumber] = useState("");
// // // // // // // // // // // //   const [childName, setChildName] = useState("");
  
// // // // // // // // // // // //   const [data, setData] = useState<DischargeChild[]>([]);
// // // // // // // // // // // //   const [filteredData, setFilteredData] = useState<DischargeChild[]>([]);

// // // // // // // // // // // //   // 1. Fetch Data from API (Database)
// // // // // // // // // // // //   const fetchChildren = async () => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       setLoading(true);
// // // // // // // // // // // //       const response = await fetch('/api/discharge/list');
// // // // // // // // // // // //       const result = await response.json();

// // // // // // // // // // // //       if (result.success && Array.isArray(result.data)) {
// // // // // // // // // // // //         // Map DB columns (PascalCase) to UI Interface (camelCase)
// // // // // // // // // // // //         const mappedData: DischargeChild[] = result.data.map((item: any) => ({
// // // // // // // // // // // //           id: item.SamNo,
// // // // // // // // // // // //           recordNo: item.MTCCode || 'N/A',
// // // // // // // // // // // //           samNumber: item.SamNo,
// // // // // // // // // // // //           childName: item.ChildName,
// // // // // // // // // // // //           parentName: item.FatherName || item.MotherName, 
// // // // // // // // // // // //           // Format DOB safely
// // // // // // // // // // // //           dateOfBirth: item.DateofBirth 
// // // // // // // // // // // //             ? new Date(item.DateofBirth).toLocaleDateString('en-IN') 
// // // // // // // // // // // //             : 'N/A',
// // // // // // // // // // // //           admissionWeight: item.AdmissionWeight,
// // // // // // // // // // // //           admissionHeight: item.AdmissionHeight,
// // // // // // // // // // // //           admissionDate: item.AdmissionDate
// // // // // // // // // // // //         }));

// // // // // // // // // // // //         setData(mappedData);
// // // // // // // // // // // //         setFilteredData(mappedData);
// // // // // // // // // // // //       } else {
// // // // // // // // // // // //         toast.error("Failed to load children list");
// // // // // // // // // // // //       }
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error("Fetch Error:", error);
// // // // // // // // // // // //       toast.error("Connection error. Please try again.");
// // // // // // // // // // // //     } finally {
// // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Load data on mount
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     fetchChildren();
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   // 2. Filter Logic
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     let filtered = [...data];
    
// // // // // // // // // // // //     if (recordNo) {
// // // // // // // // // // // //       filtered = filtered.filter(child => 
// // // // // // // // // // // //         child.recordNo?.toLowerCase().includes(recordNo.toLowerCase())
// // // // // // // // // // // //       );
// // // // // // // // // // // //     }
    
// // // // // // // // // // // //     if (samNumber) {
// // // // // // // // // // // //       filtered = filtered.filter(child => 
// // // // // // // // // // // //         child.samNumber?.toLowerCase().includes(samNumber.toLowerCase())
// // // // // // // // // // // //       );
// // // // // // // // // // // //     }
    
// // // // // // // // // // // //     if (childName) {
// // // // // // // // // // // //       filtered = filtered.filter(child => 
// // // // // // // // // // // //         child.childName?.toLowerCase().includes(childName.toLowerCase())
// // // // // // // // // // // //       );
// // // // // // // // // // // //     }
    
// // // // // // // // // // // //     if (fromDate) {
// // // // // // // // // // // //       filtered = filtered.filter(child => {
// // // // // // // // // // // //         if (!child.admissionDate) return false;
// // // // // // // // // // // //         const childDate = new Date(child.admissionDate);
// // // // // // // // // // // //         const filterDate = new Date(fromDate);
// // // // // // // // // // // //         return childDate >= filterDate;
// // // // // // // // // // // //       });
// // // // // // // // // // // //     }
    
// // // // // // // // // // // //     if (toDate) {
// // // // // // // // // // // //       filtered = filtered.filter(child => {
// // // // // // // // // // // //         if (!child.admissionDate) return false;
// // // // // // // // // // // //         const childDate = new Date(child.admissionDate);
// // // // // // // // // // // //         const filterDate = new Date(toDate);
// // // // // // // // // // // //         filterDate.setHours(23, 59, 59, 999);
// // // // // // // // // // // //         return childDate <= filterDate;
// // // // // // // // // // // //       });
// // // // // // // // // // // //     }
    
// // // // // // // // // // // //     setFilteredData(filtered);
// // // // // // // // // // // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // // // // // // // // // // //   const handleSearch = () => {
// // // // // // // // // // // //     toast.success("List updated based on filters");
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Navigation Handlers
// // // // // // // // // // // //   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
  
// // // // // // // // // // // //   // URL Encode IDs because SAM numbers often contain slashes (e.g., JH/WSB/...)
// // // // // // // // // // // //   const handleEdit = (id: string) => {
// // // // // // // // // // // //     router.push(`/mtc-user/dashboard/discharge/edit-discharge/${encodeURIComponent(id)}`);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleDischarge = (id: string) => {
// // // // // // // // // // // //     router.push(`/mtc-user/dashboard/discharge/discharge-from/${encodeURIComponent(id)}`);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleDelete = (id: string) => {
// // // // // // // // // // // //     // Note: You need to implement a DELETE API route and DB function for this to work
// // // // // // // // // // // //     if (window.confirm("Are you sure you want to delete this record? (Backend integration pending)")) {
// // // // // // // // // // // //       toast("Delete API not yet implemented", { icon: '⚠️' });
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // // // // // // // // // // //       <Toaster position="top-right" />

// // // // // // // // // // // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // // // // // // // // // // //         {/* Header */}
// // // // // // // // // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // // // // // // // // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // // // // // // // // // // //             Child Discharge
// // // // // // // // // // // //           </h1>
// // // // // // // // // // // //           <div className="flex gap-2 sm:gap-3">
// // // // // // // // // // // //             <Button
// // // // // // // // // // // //               onClick={handleBackToHome}
// // // // // // // // // // // //               variant="outline"
// // // // // // // // // // // //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// // // // // // // // // // // //             >
// // // // // // // // // // // //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // // // // // // // // // // //               <span className="hidden sm:inline">Back to Home</span>
// // // // // // // // // // // //               <span className="sm:hidden">Home</span>
// // // // // // // // // // // //             </Button>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>

// // // // // // // // // // // //         {/* Filters Section */}
// // // // // // // // // // // //         <Card className="shadow-sm border border-gray-200">
// // // // // // // // // // // //           <CardContent className="pt-4 sm:pt-6">
// // // // // // // // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
// // // // // // // // // // // //               <div>
// // // // // // // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">From Date</label>
// // // // // // // // // // // //                 <div className="relative">
// // // // // // // // // // // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// // // // // // // // // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               </div>

// // // // // // // // // // // //               <div>
// // // // // // // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">To Date</label>
// // // // // // // // // // // //                 <div className="relative">
// // // // // // // // // // // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// // // // // // // // // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               </div>

// // // // // // // // // // // //               <div>
// // // // // // // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Record No (MTC Code)</label>
// // // // // // // // // // // //                 <Input placeholder="Search MTC Code" value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="text-xs sm:text-sm" />
// // // // // // // // // // // //               </div>

// // // // // // // // // // // //               <div>
// // // // // // // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">SAM Number</label>
// // // // // // // // // // // //                 <Input placeholder="Search SAM No" value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="text-xs sm:text-sm" />
// // // // // // // // // // // //               </div>

// // // // // // // // // // // //               <div>
// // // // // // // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Child Name</label>
// // // // // // // // // // // //                 <div className="flex gap-2">
// // // // // // // // // // // //                   <Input placeholder="Search Name" value={childName} onChange={(e) => setChildName(e.target.value)} className="text-xs sm:text-sm" />
// // // // // // // // // // // //                   <Button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3">
// // // // // // // // // // // //                     <Search className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // // // // // // // //                   </Button>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </CardContent>
// // // // // // // // // // // //         </Card>

// // // // // // // // // // // //         {/* Table Section */}
// // // // // // // // // // // //         <Card className="shadow-sm border border-gray-200">
// // // // // // // // // // // //           <CardHeader className="pb-2 sm:pb-4">
// // // // // // // // // // // //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// // // // // // // // // // // //               Select a Child from the list to Discharge
// // // // // // // // // // // //             </h2>
// // // // // // // // // // // //           </CardHeader>

// // // // // // // // // // // //           <CardContent>
// // // // // // // // // // // //             <div className="overflow-x-auto rounded-lg">
// // // // // // // // // // // //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // // // // // // // // // // //                 <thead>
// // // // // // // // // // // //                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Record No</th>
// // // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">SAM Number</th>
// // // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Child Name</th>
// // // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden sm:table-cell">Father Name</th>
// // // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden md:table-cell">DOB</th>
// // // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
// // // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Height</th>
// // // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Actions</th>
// // // // // // // // // // // //                   </tr>
// // // // // // // // // // // //                 </thead>
// // // // // // // // // // // //                 <tbody>
// // // // // // // // // // // //                   {loading ? (
// // // // // // // // // // // //                     <tr>
// // // // // // // // // // // //                       <td colSpan={8} className="py-10 text-center text-gray-500">
// // // // // // // // // // // //                         <div className="flex items-center justify-center gap-2">
// // // // // // // // // // // //                           <Loader2 className="h-5 w-5 animate-spin" />
// // // // // // // // // // // //                           <span>Loading records...</span>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                       </td>
// // // // // // // // // // // //                     </tr>
// // // // // // // // // // // //                   ) : filteredData.length > 0 ? (
// // // // // // // // // // // //                     filteredData.map((child, i) => (
// // // // // // // // // // // //                       <tr
// // // // // // // // // // // //                         key={child.id}
// // // // // // // // // // // //                         className={`${
// // // // // // // // // // // //                           i % 2 === 0 ? "bg-white" : "bg-gray-50"
// // // // // // // // // // // //                         } hover:bg-indigo-50 transition`}
// // // // // // // // // // // //                       >
// // // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.recordNo}</td>
// // // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.samNumber}</td>
// // // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{child.childName}</td>
// // // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">{child.parentName}</td>
// // // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">{child.dateOfBirth}</td>
// // // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionWeight}</td>
// // // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionHeight}</td>
// // // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
// // // // // // // // // // // //                           <div className="flex justify-center gap-1">
// // // // // // // // // // // //                             <Button
// // // // // // // // // // // //                               onClick={() => handleDischarge(child.id)}
// // // // // // // // // // // //                               className="bg-green-600 hover:bg-green-700 p-1 sm:p-2"
// // // // // // // // // // // //                               title="Discharge"
// // // // // // // // // // // //                             >
// // // // // // // // // // // //                               <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // // // // // // // //                             </Button>
// // // // // // // // // // // //                             <Button
// // // // // // // // // // // //                               onClick={() => handleEdit(child.id)}
// // // // // // // // // // // //                               className="bg-blue-600 hover:bg-blue-700 p-1 sm:p-2"
// // // // // // // // // // // //                               title="Edit"
// // // // // // // // // // // //                             >
// // // // // // // // // // // //                               <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // // // // // // // //                             </Button>
// // // // // // // // // // // //                             <Button
// // // // // // // // // // // //                               onClick={() => handleDelete(child.id)}
// // // // // // // // // // // //                               className="bg-red-600 hover:bg-red-700 p-1 sm:p-2"
// // // // // // // // // // // //                               title="Delete"
// // // // // // // // // // // //                             >
// // // // // // // // // // // //                               <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // // // // // // // //                             </Button>
// // // // // // // // // // // //                           </div>
// // // // // // // // // // // //                         </td>
// // // // // // // // // // // //                       </tr>
// // // // // // // // // // // //                     ))
// // // // // // // // // // // //                   ) : (
// // // // // // // // // // // //                     <tr>
// // // // // // // // // // // //                       <td colSpan={8} className="py-8 text-center text-gray-500 text-xs sm:text-sm">
// // // // // // // // // // // //                         <div className="flex flex-col items-center">
// // // // // // // // // // // //                           <p className="font-medium">No children found in database</p>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                       </td>
// // // // // // // // // // // //                     </tr>
// // // // // // // // // // // //                   )}
// // // // // // // // // // // //                 </tbody>
// // // // // // // // // // // //               </table>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </CardContent>
// // // // // // // // // // // //         </Card>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }


// // // // // // // // // // // "use client";

// // // // // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // // // // import { useRouter } from "next/navigation";
// // // // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // // // // // // import { CalendarIcon, Search, Pencil, Trash2, Home, FileText, Loader2 } from "lucide-react";
// // // // // // // // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // // // // // // // Interface for the raw data coming from the API (PascalCase)
// // // // // // // // // // // interface ApiChildRecord {
// // // // // // // // // // //   SamNo: string;
// // // // // // // // // // //   MTCCode: string | null;
// // // // // // // // // // //   ChildName: string;
// // // // // // // // // // //   FatherName: string;
// // // // // // // // // // //   MotherName: string;
// // // // // // // // // // //   DateofBirth: string;
// // // // // // // // // // //   AdmissionWeight: number;
// // // // // // // // // // //   AdmissionHeight: number;
// // // // // // // // // // //   AdmissionDate: string;
// // // // // // // // // // // }

// // // // // // // // // // // // Interface matching the mapped data for the UI (camelCase)
// // // // // // // // // // // interface DischargeChild {
// // // // // // // // // // //   id: string;          // Maps to SamNo
// // // // // // // // // // //   recordNo: string;    // Maps to MTCCode
// // // // // // // // // // //   samNumber: string;   // Maps to SamNo
// // // // // // // // // // //   childName: string;   // Maps to ChildName
// // // // // // // // // // //   parentName: string;  // Maps to FatherName
// // // // // // // // // // //   dateOfBirth: string; // Formatted Date
// // // // // // // // // // //   admissionWeight: number;
// // // // // // // // // // //   admissionHeight: number;
// // // // // // // // // // //   admissionDate: string; // Used for filtering
// // // // // // // // // // // }

// // // // // // // // // // // export default function DischargePage() {
// // // // // // // // // // //   const router = useRouter();

// // // // // // // // // // //   // State
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // //   const [fromDate, setFromDate] = useState("");
// // // // // // // // // // //   const [toDate, setToDate] = useState("");
// // // // // // // // // // //   const [recordNo, setRecordNo] = useState("");
// // // // // // // // // // //   const [samNumber, setSamNumber] = useState("");
// // // // // // // // // // //   const [childName, setChildName] = useState("");
  
// // // // // // // // // // //   const [data, setData] = useState<DischargeChild[]>([]);
// // // // // // // // // // //   const [filteredData, setFilteredData] = useState<DischargeChild[]>([]);

// // // // // // // // // // //   // 1. Fetch Data from API (Database)
// // // // // // // // // // //   const fetchChildren = async () => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       setLoading(true);
// // // // // // // // // // //       const response = await fetch('/api/discharge/list');
// // // // // // // // // // //       const result = await response.json();

// // // // // // // // // // //       if (result.success && Array.isArray(result.data)) {
// // // // // // // // // // //         // Cast result.data to the specific API interface instead of using 'any'
// // // // // // // // // // //         const rawData = result.data as ApiChildRecord[];

// // // // // // // // // // //         // Map DB columns (PascalCase) to UI Interface (camelCase)
// // // // // // // // // // //         const mappedData: DischargeChild[] = rawData.map((item) => ({
// // // // // // // // // // //           id: item.SamNo,
// // // // // // // // // // //           recordNo: item.MTCCode || 'N/A',
// // // // // // // // // // //           samNumber: item.SamNo,
// // // // // // // // // // //           childName: item.ChildName,
// // // // // // // // // // //           parentName: item.FatherName || item.MotherName, 
// // // // // // // // // // //           // Format DOB safely
// // // // // // // // // // //           dateOfBirth: item.DateofBirth 
// // // // // // // // // // //             ? new Date(item.DateofBirth).toLocaleDateString('en-IN') 
// // // // // // // // // // //             : 'N/A',
// // // // // // // // // // //           admissionWeight: item.AdmissionWeight,
// // // // // // // // // // //           admissionHeight: item.AdmissionHeight,
// // // // // // // // // // //           admissionDate: item.AdmissionDate
// // // // // // // // // // //         }));

// // // // // // // // // // //         setData(mappedData);
// // // // // // // // // // //         setFilteredData(mappedData);
// // // // // // // // // // //       } else {
// // // // // // // // // // //         toast.error("Failed to load children list");
// // // // // // // // // // //       }
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error("Fetch Error:", error);
// // // // // // // // // // //       toast.error("Connection error. Please try again.");
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setLoading(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Load data on mount
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     fetchChildren();
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // 2. Filter Logic
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     let filtered = [...data];
    
// // // // // // // // // // //     if (recordNo) {
// // // // // // // // // // //       filtered = filtered.filter(child => 
// // // // // // // // // // //         child.recordNo?.toLowerCase().includes(recordNo.toLowerCase())
// // // // // // // // // // //       );
// // // // // // // // // // //     }
    
// // // // // // // // // // //     if (samNumber) {
// // // // // // // // // // //       filtered = filtered.filter(child => 
// // // // // // // // // // //         child.samNumber?.toLowerCase().includes(samNumber.toLowerCase())
// // // // // // // // // // //       );
// // // // // // // // // // //     }
    
// // // // // // // // // // //     if (childName) {
// // // // // // // // // // //       filtered = filtered.filter(child => 
// // // // // // // // // // //         child.childName?.toLowerCase().includes(childName.toLowerCase())
// // // // // // // // // // //       );
// // // // // // // // // // //     }
    
// // // // // // // // // // //     if (fromDate) {
// // // // // // // // // // //       filtered = filtered.filter(child => {
// // // // // // // // // // //         if (!child.admissionDate) return false;
// // // // // // // // // // //         const childDate = new Date(child.admissionDate);
// // // // // // // // // // //         const filterDate = new Date(fromDate);
// // // // // // // // // // //         return childDate >= filterDate;
// // // // // // // // // // //       });
// // // // // // // // // // //     }
    
// // // // // // // // // // //     if (toDate) {
// // // // // // // // // // //       filtered = filtered.filter(child => {
// // // // // // // // // // //         if (!child.admissionDate) return false;
// // // // // // // // // // //         const childDate = new Date(child.admissionDate);
// // // // // // // // // // //         const filterDate = new Date(toDate);
// // // // // // // // // // //         filterDate.setHours(23, 59, 59, 999);
// // // // // // // // // // //         return childDate <= filterDate;
// // // // // // // // // // //       });
// // // // // // // // // // //     }
    
// // // // // // // // // // //     setFilteredData(filtered);
// // // // // // // // // // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // // // // // // // // // //   const handleSearch = () => {
// // // // // // // // // // //     toast.success("List updated based on filters");
// // // // // // // // // // //   };

// // // // // // // // // // //   // Navigation Handlers
// // // // // // // // // // //   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
  
// // // // // // // // // // //   // URL Encode IDs because SAM numbers often contain slashes (e.g., JH/WSB/...)
// // // // // // // // // // //   const handleEdit = (id: string) => {
// // // // // // // // // // //     router.push(`/mtc-user/dashboard/discharge/edit-discharge/${encodeURIComponent(id)}`);
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleDischarge = (id: string) => {
// // // // // // // // // // //     router.push(`/mtc-user/dashboard/discharge/discharge-from/${encodeURIComponent(id)}`);
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleDelete = (id: string) => {
// // // // // // // // // // //     // Note: You need to implement a DELETE API route and DB function for this to work
// // // // // // // // // // //     if (window.confirm("Are you sure you want to delete this record? (Backend integration pending)")) {
// // // // // // // // // // //       // Log the ID to satisfy the linter warning about unused variables
// // // // // // // // // // //       console.log("Deleting record with ID:", id); 
// // // // // // // // // // //       toast("Delete API not yet implemented", { icon: '⚠️' });
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // // // // // // // // // //       <Toaster position="top-right" />

// // // // // // // // // // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // // // // // // // // // //         {/* Header */}
// // // // // // // // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // // // // // // // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // // // // // // // // // //             Child Discharge
// // // // // // // // // // //           </h1>
// // // // // // // // // // //           <div className="flex gap-2 sm:gap-3">
// // // // // // // // // // //             <Button
// // // // // // // // // // //               onClick={handleBackToHome}
// // // // // // // // // // //               variant="outline"
// // // // // // // // // // //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// // // // // // // // // // //             >
// // // // // // // // // // //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // // // // // // // // // //               <span className="hidden sm:inline">Back to Home</span>
// // // // // // // // // // //               <span className="sm:hidden">Home</span>
// // // // // // // // // // //             </Button>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>

// // // // // // // // // // //         {/* Filters Section */}
// // // // // // // // // // //         <Card className="shadow-sm border border-gray-200">
// // // // // // // // // // //           <CardContent className="pt-4 sm:pt-6">
// // // // // // // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
// // // // // // // // // // //               <div>
// // // // // // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">From Date</label>
// // // // // // // // // // //                 <div className="relative">
// // // // // // // // // // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// // // // // // // // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               </div>

// // // // // // // // // // //               <div>
// // // // // // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">To Date</label>
// // // // // // // // // // //                 <div className="relative">
// // // // // // // // // // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="pr-8 sm:pr-10 text-xs sm:text-sm" />
// // // // // // // // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               </div>

// // // // // // // // // // //               <div>
// // // // // // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Record No (MTC Code)</label>
// // // // // // // // // // //                 <Input placeholder="Search MTC Code" value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="text-xs sm:text-sm" />
// // // // // // // // // // //               </div>

// // // // // // // // // // //               <div>
// // // // // // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">SAM Number</label>
// // // // // // // // // // //                 <Input placeholder="Search SAM No" value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="text-xs sm:text-sm" />
// // // // // // // // // // //               </div>

// // // // // // // // // // //               <div>
// // // // // // // // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Child Name</label>
// // // // // // // // // // //                 <div className="flex gap-2">
// // // // // // // // // // //                   <Input placeholder="Search Name" value={childName} onChange={(e) => setChildName(e.target.value)} className="text-xs sm:text-sm" />
// // // // // // // // // // //                   <Button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-3">
// // // // // // // // // // //                     <Search className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // // // // // // //                   </Button>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </CardContent>
// // // // // // // // // // //         </Card>

// // // // // // // // // // //         {/* Table Section */}
// // // // // // // // // // //         <Card className="shadow-sm border border-gray-200">
// // // // // // // // // // //           <CardHeader className="pb-2 sm:pb-4">
// // // // // // // // // // //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// // // // // // // // // // //               Select a Child from the list to Discharge
// // // // // // // // // // //             </h2>
// // // // // // // // // // //           </CardHeader>

// // // // // // // // // // //           <CardContent>
// // // // // // // // // // //             <div className="overflow-x-auto rounded-lg">
// // // // // // // // // // //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // // // // // // // // // //                 <thead>
// // // // // // // // // // //                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Record No</th>
// // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">SAM Number</th>
// // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Child Name</th>
// // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden sm:table-cell">Father Name</th>
// // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden md:table-cell">DOB</th>
// // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Weight</th>
// // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold hidden lg:table-cell">Height</th>
// // // // // // // // // // //                     <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Actions</th>
// // // // // // // // // // //                   </tr>
// // // // // // // // // // //                 </thead>
// // // // // // // // // // //                 <tbody>
// // // // // // // // // // //                   {loading ? (
// // // // // // // // // // //                     <tr>
// // // // // // // // // // //                       <td colSpan={8} className="py-10 text-center text-gray-500">
// // // // // // // // // // //                         <div className="flex items-center justify-center gap-2">
// // // // // // // // // // //                           <Loader2 className="h-5 w-5 animate-spin" />
// // // // // // // // // // //                           <span>Loading records...</span>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                       </td>
// // // // // // // // // // //                     </tr>
// // // // // // // // // // //                   ) : filteredData.length > 0 ? (
// // // // // // // // // // //                     filteredData.map((child, i) => (
// // // // // // // // // // //                       <tr
// // // // // // // // // // //                         key={child.id}
// // // // // // // // // // //                         className={`${
// // // // // // // // // // //                           i % 2 === 0 ? "bg-white" : "bg-gray-50"
// // // // // // // // // // //                         } hover:bg-indigo-50 transition`}
// // // // // // // // // // //                       >
// // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.recordNo}</td>
// // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4">{child.samNumber}</td>
// // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{child.childName}</td>
// // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">{child.parentName}</td>
// // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">{child.dateOfBirth}</td>
// // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionWeight}</td>
// // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">{child.admissionHeight}</td>
// // // // // // // // // // //                         <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
// // // // // // // // // // //                           <div className="flex justify-center gap-1">
// // // // // // // // // // //                             <Button
// // // // // // // // // // //                               onClick={() => handleDischarge(child.id)}
// // // // // // // // // // //                               className="bg-green-600 hover:bg-green-700 p-1 sm:p-2"
// // // // // // // // // // //                               title="Discharge"
// // // // // // // // // // //                             >
// // // // // // // // // // //                               <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // // // // // // //                             </Button>
// // // // // // // // // // //                             <Button
// // // // // // // // // // //                               onClick={() => handleEdit(child.id)}
// // // // // // // // // // //                               className="bg-blue-600 hover:bg-blue-700 p-1 sm:p-2"
// // // // // // // // // // //                               title="Edit"
// // // // // // // // // // //                             >
// // // // // // // // // // //                               <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // // // // // // //                             </Button>
// // // // // // // // // // //                             <Button
// // // // // // // // // // //                               onClick={() => handleDelete(child.id)}
// // // // // // // // // // //                               className="bg-red-600 hover:bg-red-700 p-1 sm:p-2"
// // // // // // // // // // //                               title="Delete"
// // // // // // // // // // //                             >
// // // // // // // // // // //                               <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
// // // // // // // // // // //                             </Button>
// // // // // // // // // // //                           </div>
// // // // // // // // // // //                         </td>
// // // // // // // // // // //                       </tr>
// // // // // // // // // // //                     ))
// // // // // // // // // // //                   ) : (
// // // // // // // // // // //                     <tr>
// // // // // // // // // // //                       <td colSpan={8} className="py-8 text-center text-gray-500 text-xs sm:text-sm">
// // // // // // // // // // //                         <div className="flex flex-col items-center">
// // // // // // // // // // //                           <p className="font-medium">No children found in database</p>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                       </td>
// // // // // // // // // // //                     </tr>
// // // // // // // // // // //                   )}
// // // // // // // // // // //                 </tbody>
// // // // // // // // // // //               </table>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </CardContent>
// // // // // // // // // // //         </Card>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }// app/mtc-user/dashboard/discharge/page.tsx (or wherever this list is located)
// // // // // // // // // "use client";

// // // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // // import { useRouter } from "next/navigation";
// // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // // // // import { CalendarIcon, Search, Pencil, Trash2, Home, FileText, Loader2, Users } from "lucide-react";
// // // // // // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // // // // interface Child {
// // // // // // // // //   id: string;
// // // // // // // // //   recordNo: string;
// // // // // // // // //   samNumber: string;
// // // // // // // // //   childName: string;
// // // // // // // // //   parentName: string;
// // // // // // // // //   dateOfBirth: string;
// // // // // // // // //   admissionWeight: string;
// // // // // // // // //   admissionHeight: string;
// // // // // // // // //   createdAt: string;
// // // // // // // // // }

// // // // // // // // // export default function ChildRegistrationPage() {
// // // // // // // // //   const router = useRouter();

// // // // // // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // // // // // //   const [fromDate, setFromDate] = useState("");
// // // // // // // // //   const [toDate, setToDate] = useState("");
// // // // // // // // //   const [recordNo, setRecordNo] = useState("");
// // // // // // // // //   const [samNumber, setSamNumber] = useState("");
// // // // // // // // //   const [childName, setChildName] = useState("");
// // // // // // // // //   const [data, setData] = useState<Child[]>([]);
// // // // // // // // //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// // // // // // // // //   // 1. Fetch data from PostgreSQL Backend
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchPatients = async () => {
// // // // // // // // //       setIsLoading(true);
// // // // // // // // //       try {
// // // // // // // // //         const response = await fetch('/api/child-registration');
// // // // // // // // //         if (!response.ok) throw new Error('Failed to fetch patients');
// // // // // // // // //         const dbData = await response.json();

// // // // // // // // //         // Map snake_case database columns to our camelCase frontend interface
// // // // // // // // //         const mappedData: Child[] = dbData.map((row: any) => ({
// // // // // // // // //           id: row.registration_id?.toString() || row.id,
// // // // // // // // //           recordNo: row.registration_id?.toString() || "N/A", 
// // // // // // // // //           samNumber: row.sam_no || row.samNumber,
// // // // // // // // //           childName: row.child_full_name || row.childName,
// // // // // // // // //           parentName: row.guardian_name || row.parentName,
// // // // // // // // //           dateOfBirth: row.dob || row.dateOfBirth,
// // // // // // // // //           admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight,
// // // // // // // // //           admissionHeight: row.length_height_cm?.toString() || row.admissionHeight,
// // // // // // // // //           createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
// // // // // // // // //         }));

// // // // // // // // //         setData(mappedData);
// // // // // // // // //         setFilteredData(mappedData);
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error("Error fetching data:", error);
// // // // // // // // //         toast.error("Failed to load patient records from database.");
// // // // // // // // //       } finally {
// // // // // // // // //         setIsLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     fetchPatients();
// // // // // // // // //   }, []);

// // // // // // // // //   // 2. Filter logic (Client-side)
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     let filtered = [...data];
    
// // // // // // // // //     if (recordNo) {
// // // // // // // // //       filtered = filtered.filter(child => child.recordNo.toLowerCase().includes(recordNo.toLowerCase()));
// // // // // // // // //     }
// // // // // // // // //     if (samNumber) {
// // // // // // // // //       filtered = filtered.filter(child => child.samNumber.toLowerCase().includes(samNumber.toLowerCase()));
// // // // // // // // //     }
// // // // // // // // //     if (childName) {
// // // // // // // // //       filtered = filtered.filter(child => child.childName.toLowerCase().includes(childName.toLowerCase()));
// // // // // // // // //     }
// // // // // // // // //     if (fromDate) {
// // // // // // // // //       filtered = filtered.filter(child => {
// // // // // // // // //         const childDate = new Date(child.createdAt);
// // // // // // // // //         const filterDate = new Date(fromDate);
// // // // // // // // //         return childDate >= filterDate;
// // // // // // // // //       });
// // // // // // // // //     }
// // // // // // // // //     if (toDate) {
// // // // // // // // //       filtered = filtered.filter(child => {
// // // // // // // // //         const childDate = new Date(child.createdAt);
// // // // // // // // //         const filterDate = new Date(toDate);
// // // // // // // // //         filterDate.setHours(23, 59, 59, 999);
// // // // // // // // //         return childDate <= filterDate;
// // // // // // // // //       });
// // // // // // // // //     }
    
// // // // // // // // //     setFilteredData(filtered);
// // // // // // // // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // // // // // // // //   const handleSearch = () => {
// // // // // // // // //     toast.success("Filters applied successfully!");
// // // // // // // // //   };

// // // // // // // // //   // Actions
// // // // // // // // //   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
// // // // // // // // //   const handleEdit = (id: string) => router.push(`/mtc-user/dashboard/discharge/edit-discharge/${id}`);
// // // // // // // // //   const handleDischarge = (id: string) => router.push(`/mtc-user/dashboard/discharge/discharge-form/${id}`);

// // // // // // // // //   // 3. Delete from PostgreSQL Backend
// // // // // // // // //   const handleDelete = async (id: string) => {
// // // // // // // // //     if (window.confirm("Are you sure you want to permanently delete this patient record?")) {
// // // // // // // // //       try {
// // // // // // // // //         const response = await fetch(`/api/child-registration/${id}`, {
// // // // // // // // //           method: 'DELETE',
// // // // // // // // //         });
        
// // // // // // // // //         if (!response.ok) throw new Error('Failed to delete record');
        
// // // // // // // // //         // Remove from UI state
// // // // // // // // //         const updatedChildren = data.filter(child => child.id !== id);
// // // // // // // // //         setData(updatedChildren);
// // // // // // // // //         toast.success("Record deleted successfully from database!");
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error("Delete error:", error);
// // // // // // // // //         toast.error("Failed to delete the record.");
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-slate-50 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6 font-sans">
// // // // // // // // //       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />

// // // // // // // // //       <div className="max-w-7xl mx-auto space-y-6">
// // // // // // // // //         {/* Header */}
// // // // // // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // // // // // //           <div className="flex items-center gap-3">
// // // // // // // // //             <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
// // // // // // // // //               <Users className="h-6 w-6" />
// // // // // // // // //             </div>
// // // // // // // // //             <div>
// // // // // // // // //               <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Patient Directory</h1>
// // // // // // // // //               <p className="text-sm text-slate-500 font-medium mt-1">Manage and discharge admitted children</p>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //           <Button onClick={handleBackToHome} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-700 transition-colors bg-white shadow-sm">
// // // // // // // // //             <Home className="mr-2 h-4 w-4" /> Back to Home
// // // // // // // // //           </Button>
// // // // // // // // //         </div>

// // // // // // // // //         {/* Filters Section */}
// // // // // // // // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // // // // // // //           <CardContent className="p-6">
// // // // // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
// // // // // // // // //               <div>
// // // // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">From Date</label>
// // // // // // // // //                 <div className="relative">
// // // // // // // // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               <div>
// // // // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">To Date</label>
// // // // // // // // //                 <div className="relative">
// // // // // // // // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               <div>
// // // // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Record No</label>
// // // // // // // // //                 <Input placeholder="Search Record..." value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // // // //               </div>

// // // // // // // // //               <div>
// // // // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SAM Number</label>
// // // // // // // // //                 <Input placeholder="Search SAM..." value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // // // //               </div>

// // // // // // // // //               <div>
// // // // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Child Name</label>
// // // // // // // // //                 <div className="flex gap-2">
// // // // // // // // //                   <Input placeholder="Search Name..." value={childName} onChange={(e) => setChildName(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // // // //                   <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-3 shadow-sm">
// // // // // // // // //                     <Search className="w-4 h-4" />
// // // // // // // // //                   </Button>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           </CardContent>
// // // // // // // // //         </Card>

// // // // // // // // //         {/* Table Section */}
// // // // // // // // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
// // // // // // // // //           <div className="overflow-x-auto custom-scrollbar">
// // // // // // // // //             <table className="min-w-full text-sm text-slate-700 border-collapse">
// // // // // // // // //               <thead>
// // // // // // // // //                 <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
// // // // // // // // //                   <th className="py-4 px-6 text-left font-bold">Record No</th>
// // // // // // // // //                   <th className="py-4 px-6 text-left font-bold">SAM Number</th>
// // // // // // // // //                   <th className="py-4 px-6 text-left font-bold">Child Name</th>
// // // // // // // // //                   <th className="py-4 px-6 text-left font-bold hidden sm:table-cell">Parent Name</th>
// // // // // // // // //                   <th className="py-4 px-6 text-left font-bold hidden lg:table-cell">Weight (kg)</th>
// // // // // // // // //                   <th className="py-4 px-6 text-center font-bold">Actions</th>
// // // // // // // // //                 </tr>
// // // // // // // // //               </thead>
// // // // // // // // //               <tbody className="divide-y divide-slate-100">
// // // // // // // // //                 {isLoading ? (
// // // // // // // // //                   <tr>
// // // // // // // // //                     <td colSpan={6} className="py-12 text-center">
// // // // // // // // //                       <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
// // // // // // // // //                       <p className="text-slate-500 font-medium">Fetching patient records...</p>
// // // // // // // // //                     </td>
// // // // // // // // //                   </tr>
// // // // // // // // //                 ) : filteredData.length > 0 ? (
// // // // // // // // //                   filteredData.map((child) => (
// // // // // // // // //                     <tr key={child.id} className="hover:bg-blue-50/50 transition-colors bg-white">
// // // // // // // // //                       <td className="py-4 px-6 font-semibold text-slate-700">{child.recordNo}</td>
// // // // // // // // //                       <td className="py-4 px-6 text-slate-600">{child.samNumber}</td>
// // // // // // // // //                       <td className="py-4 px-6 font-bold text-slate-900">{child.childName}</td>
// // // // // // // // //                       <td className="py-4 px-6 hidden sm:table-cell text-slate-600">{child.parentName}</td>
// // // // // // // // //                       <td className="py-4 px-6 hidden lg:table-cell text-slate-600">{child.admissionWeight}</td>
// // // // // // // // //                       <td className="py-4 px-6">
// // // // // // // // //                         <div className="flex justify-center gap-2">
// // // // // // // // //                           <Button onClick={() => handleDischarge(child.id)} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white p-2 h-auto rounded-lg shadow-none border border-emerald-200 hover:border-emerald-600 transition-all" title="Discharge Patient">
// // // // // // // // //                             <FileText className="w-4 h-4" />
// // // // // // // // //                           </Button>
// // // // // // // // //                           <Button onClick={() => handleEdit(child.id)} className="bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white p-2 h-auto rounded-lg shadow-none border border-blue-200 hover:border-blue-600 transition-all" title="Edit Record">
// // // // // // // // //                             <Pencil className="w-4 h-4" />
// // // // // // // // //                           </Button>
// // // // // // // // //                           <Button onClick={() => handleDelete(child.id)} className="bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white p-2 h-auto rounded-lg shadow-none border border-rose-200 hover:border-rose-600 transition-all" title="Delete Record">
// // // // // // // // //                             <Trash2 className="w-4 h-4" />
// // // // // // // // //                           </Button>
// // // // // // // // //                         </div>
// // // // // // // // //                       </td>
// // // // // // // // //                     </tr>
// // // // // // // // //                   ))
// // // // // // // // //                 ) : (
// // // // // // // // //                   <tr>
// // // // // // // // //                     <td colSpan={6} className="py-12 text-center bg-white">
// // // // // // // // //                       <div className="flex flex-col items-center justify-center text-slate-400">
// // // // // // // // //                         <div className="p-4 bg-slate-50 rounded-full mb-3">
// // // // // // // // //                           <Search className="h-8 w-8 text-slate-300" />
// // // // // // // // //                         </div>
// // // // // // // // //                         <p className="font-bold text-slate-600 text-lg">No records found</p>
// // // // // // // // //                         <p className="mt-1 text-sm">Adjust your filters or register a new child.</p>
// // // // // // // // //                       </div>
// // // // // // // // //                     </td>
// // // // // // // // //                   </tr>
// // // // // // // // //                 )}
// // // // // // // // //               </tbody>
// // // // // // // // //             </table>
// // // // // // // // //           </div>
// // // // // // // // //         </Card>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // "use client";

// // // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // // import { useRouter } from "next/navigation";
// // // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // // // // import { CalendarIcon, Search, Pencil, Trash2, Home, FileText, Loader2, Users } from "lucide-react";
// // // // // // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // // // // interface Child {
// // // // // // // // //   id: string;
// // // // // // // // //   recordNo: string;
// // // // // // // // //   samNumber: string;
// // // // // // // // //   childName: string;
// // // // // // // // //   parentName: string;
// // // // // // // // //   dateOfBirth: string;
// // // // // // // // //   admissionWeight: string;
// // // // // // // // //   admissionHeight: string;
// // // // // // // // //   createdAt: string;
// // // // // // // // // }

// // // // // // // // // export default function ChildRegistrationPage() {
// // // // // // // // //   const router = useRouter();

// // // // // // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // // // // // //   const [fromDate, setFromDate] = useState("");
// // // // // // // // //   const [toDate, setToDate] = useState("");
// // // // // // // // //   const [recordNo, setRecordNo] = useState("");
// // // // // // // // //   const [samNumber, setSamNumber] = useState("");
// // // // // // // // //   const [childName, setChildName] = useState("");
// // // // // // // // //   const [data, setData] = useState<Child[]>([]);
// // // // // // // // //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// // // // // // // // //   // 1. Fetch data from PostgreSQL Backend
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchPatients = async () => {
// // // // // // // // //       setIsLoading(true);
// // // // // // // // //       try {
// // // // // // // // //         const response = await fetch('/api/child-registration');
// // // // // // // // //         if (!response.ok) throw new Error('Failed to fetch patients');
// // // // // // // // //         const dbData = await response.json();

// // // // // // // // //         // Map snake_case database columns to our camelCase frontend interface
// // // // // // // // //         const mappedData: Child[] = dbData.map((row: any) => ({
// // // // // // // // //           id: row.registration_id?.toString() || row.id,
// // // // // // // // //           recordNo: row.registration_id?.toString() || "N/A", 
// // // // // // // // //           samNumber: row.sam_no || row.samNumber,
// // // // // // // // //           childName: row.child_full_name || row.childName,
// // // // // // // // //           parentName: row.guardian_name || row.parentName,
// // // // // // // // //           dateOfBirth: row.dob || row.dateOfBirth,
// // // // // // // // //           admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight,
// // // // // // // // //           admissionHeight: row.length_height_cm?.toString() || row.admissionHeight,
// // // // // // // // //           createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
// // // // // // // // //         }));

// // // // // // // // //         setData(mappedData);
// // // // // // // // //         setFilteredData(mappedData);
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error("Error fetching data:", error);
// // // // // // // // //         toast.error("Failed to load patient records from database.");
// // // // // // // // //       } finally {
// // // // // // // // //         setIsLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     fetchPatients();
// // // // // // // // //   }, []);

// // // // // // // // //   // 2. Filter logic (Client-side)
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     let filtered = [...data];
    
// // // // // // // // //     if (recordNo) {
// // // // // // // // //       filtered = filtered.filter(child => child.recordNo.toLowerCase().includes(recordNo.toLowerCase()));
// // // // // // // // //     }
// // // // // // // // //     if (samNumber) {
// // // // // // // // //       filtered = filtered.filter(child => child.samNumber.toLowerCase().includes(samNumber.toLowerCase()));
// // // // // // // // //     }
// // // // // // // // //     if (childName) {
// // // // // // // // //       filtered = filtered.filter(child => child.childName.toLowerCase().includes(childName.toLowerCase()));
// // // // // // // // //     }
// // // // // // // // //     if (fromDate) {
// // // // // // // // //       filtered = filtered.filter(child => {
// // // // // // // // //         const childDate = new Date(child.createdAt);
// // // // // // // // //         const filterDate = new Date(fromDate);
// // // // // // // // //         return childDate >= filterDate;
// // // // // // // // //       });
// // // // // // // // //     }
// // // // // // // // //     if (toDate) {
// // // // // // // // //       filtered = filtered.filter(child => {
// // // // // // // // //         const childDate = new Date(child.createdAt);
// // // // // // // // //         const filterDate = new Date(toDate);
// // // // // // // // //         filterDate.setHours(23, 59, 59, 999);
// // // // // // // // //         return childDate <= filterDate;
// // // // // // // // //       });
// // // // // // // // //     }
    
// // // // // // // // //     setFilteredData(filtered);
// // // // // // // // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // // // // // // // //   const handleSearch = () => {
// // // // // // // // //     toast.success("Filters applied successfully!");
// // // // // // // // //   };

// // // // // // // // //   // Actions
// // // // // // // // //   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
// // // // // // // // //   const handleEdit = (id: string) => router.push(`/mtc-user/dashboard/discharge/edit-discharge/${id}`);
  
// // // // // // // // //   // UPDATED PATH: Pointing to "discharge-from" as requested
// // // // // // // // //   const handleDischarge = (id: string) => router.push(`/mtc-user/dashboard/discharge/discharge-from/${id}`);

// // // // // // // // //   // 3. Delete from PostgreSQL Backend
// // // // // // // // //   const handleDelete = async (id: string) => {
// // // // // // // // //     if (window.confirm("Are you sure you want to permanently delete this patient record?")) {
// // // // // // // // //       try {
// // // // // // // // //         const response = await fetch(`/api/child-registration/${id}`, {
// // // // // // // // //           method: 'DELETE',
// // // // // // // // //         });
        
// // // // // // // // //         if (!response.ok) throw new Error('Failed to delete record');
        
// // // // // // // // //         // Remove from UI state
// // // // // // // // //         const updatedChildren = data.filter(child => child.id !== id);
// // // // // // // // //         setData(updatedChildren);
// // // // // // // // //         toast.success("Record deleted successfully from database!");
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error("Delete error:", error);
// // // // // // // // //         toast.error("Failed to delete the record.");
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-slate-50 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6 font-sans">
// // // // // // // // //       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />

// // // // // // // // //       <div className="max-w-7xl mx-auto space-y-6">
// // // // // // // // //         {/* Header */}
// // // // // // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // // // // // //           <div className="flex items-center gap-3">
// // // // // // // // //             <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
// // // // // // // // //               <Users className="h-6 w-6" />
// // // // // // // // //             </div>
// // // // // // // // //             <div>
// // // // // // // // //               <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Patient Directory</h1>
// // // // // // // // //               <p className="text-sm text-slate-500 font-medium mt-1">Manage and discharge admitted children</p>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //           <Button onClick={handleBackToHome} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-700 transition-colors bg-white shadow-sm">
// // // // // // // // //             <Home className="mr-2 h-4 w-4" /> Back to Home
// // // // // // // // //           </Button>
// // // // // // // // //         </div>

// // // // // // // // //         {/* Filters Section */}
// // // // // // // // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // // // // // // //           <CardContent className="p-6">
// // // // // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
// // // // // // // // //               <div>
// // // // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">From Date</label>
// // // // // // // // //                 <div className="relative">
// // // // // // // // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               <div>
// // // // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">To Date</label>
// // // // // // // // //                 <div className="relative">
// // // // // // // // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // // // //                 </div>
// // // // // // // // //               </div>

// // // // // // // // //               <div>
// // // // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Record No</label>
// // // // // // // // //                 <Input placeholder="Search Record..." value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // // // //               </div>

// // // // // // // // //               <div>
// // // // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SAM Number</label>
// // // // // // // // //                 <Input placeholder="Search SAM..." value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // // // //               </div>

// // // // // // // // //               <div>
// // // // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Child Name</label>
// // // // // // // // //                 <div className="flex gap-2">
// // // // // // // // //                   <Input placeholder="Search Name..." value={childName} onChange={(e) => setChildName(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // // // //                   <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-3 shadow-sm">
// // // // // // // // //                     <Search className="w-4 h-4" />
// // // // // // // // //                   </Button>
// // // // // // // // //                 </div>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           </CardContent>
// // // // // // // // //         </Card>

// // // // // // // // //         {/* Table Section */}
// // // // // // // // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
// // // // // // // // //           <div className="overflow-x-auto custom-scrollbar">
// // // // // // // // //             <table className="min-w-full text-sm text-slate-700 border-collapse">
// // // // // // // // //               <thead>
// // // // // // // // //                 <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
// // // // // // // // //                   <th className="py-4 px-6 text-left font-bold">Record No</th>
// // // // // // // // //                   <th className="py-4 px-6 text-left font-bold">SAM Number</th>
// // // // // // // // //                   <th className="py-4 px-6 text-left font-bold">Child Name</th>
// // // // // // // // //                   <th className="py-4 px-6 text-left font-bold hidden sm:table-cell">Parent Name</th>
// // // // // // // // //                   <th className="py-4 px-6 text-left font-bold hidden lg:table-cell">Weight (kg)</th>
// // // // // // // // //                   <th className="py-4 px-6 text-center font-bold">Actions</th>
// // // // // // // // //                 </tr>
// // // // // // // // //               </thead>
// // // // // // // // //               <tbody className="divide-y divide-slate-100">
// // // // // // // // //                 {isLoading ? (
// // // // // // // // //                   <tr>
// // // // // // // // //                     <td colSpan={6} className="py-12 text-center">
// // // // // // // // //                       <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
// // // // // // // // //                       <p className="text-slate-500 font-medium">Fetching patient records...</p>
// // // // // // // // //                     </td>
// // // // // // // // //                   </tr>
// // // // // // // // //                 ) : filteredData.length > 0 ? (
// // // // // // // // //                   filteredData.map((child) => (
// // // // // // // // //                     <tr key={child.id} className="hover:bg-blue-50/50 transition-colors bg-white">
// // // // // // // // //                       <td className="py-4 px-6 font-semibold text-slate-700">{child.recordNo}</td>
// // // // // // // // //                       <td className="py-4 px-6 text-slate-600">{child.samNumber}</td>
// // // // // // // // //                       <td className="py-4 px-6 font-bold text-slate-900">{child.childName}</td>
// // // // // // // // //                       <td className="py-4 px-6 hidden sm:table-cell text-slate-600">{child.parentName}</td>
// // // // // // // // //                       <td className="py-4 px-6 hidden lg:table-cell text-slate-600">{child.admissionWeight}</td>
// // // // // // // // //                       <td className="py-4 px-6">
// // // // // // // // //                         <div className="flex justify-center gap-2">
// // // // // // // // //                           <Button onClick={() => handleDischarge(child.id)} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white p-2 h-auto rounded-lg shadow-none border border-emerald-200 hover:border-emerald-600 transition-all" title="Discharge Patient">
// // // // // // // // //                             <FileText className="w-4 h-4" />
// // // // // // // // //                           </Button>
// // // // // // // // //                           <Button onClick={() => handleEdit(child.id)} className="bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white p-2 h-auto rounded-lg shadow-none border border-blue-200 hover:border-blue-600 transition-all" title="Edit Record">
// // // // // // // // //                             <Pencil className="w-4 h-4" />
// // // // // // // // //                           </Button>
// // // // // // // // //                           <Button onClick={() => handleDelete(child.id)} className="bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white p-2 h-auto rounded-lg shadow-none border border-rose-200 hover:border-rose-600 transition-all" title="Delete Record">
// // // // // // // // //                             <Trash2 className="w-4 h-4" />
// // // // // // // // //                           </Button>
// // // // // // // // //                         </div>
// // // // // // // // //                       </td>
// // // // // // // // //                     </tr>
// // // // // // // // //                   ))
// // // // // // // // //                 ) : (
// // // // // // // // //                   <tr>
// // // // // // // // //                     <td colSpan={6} className="py-12 text-center bg-white">
// // // // // // // // //                       <div className="flex flex-col items-center justify-center text-slate-400">
// // // // // // // // //                         <div className="p-4 bg-slate-50 rounded-full mb-3">
// // // // // // // // //                           <Search className="h-8 w-8 text-slate-300" />
// // // // // // // // //                         </div>
// // // // // // // // //                         <p className="font-bold text-slate-600 text-lg">No records found</p>
// // // // // // // // //                         <p className="mt-1 text-sm">Adjust your filters or register a new child.</p>
// // // // // // // // //                       </div>
// // // // // // // // //                     </td>
// // // // // // // // //                   </tr>
// // // // // // // // //                 )}
// // // // // // // // //               </tbody>
// // // // // // // // //             </table>
// // // // // // // // //           </div>
// // // // // // // // //         </Card>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // "use client";

// // // // // // // // import { useState, useEffect } from "react";
// // // // // // // // import { useRouter } from "next/navigation";
// // // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // // import { Card, CardContent } from "@/components/ui/card";
// // // // // // // // import { Search, Home, FileText, Loader2, Users } from "lucide-react";
// // // // // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // // // interface Child {
// // // // // // // //   id: string;
// // // // // // // //   recordNo: string;
// // // // // // // //   samNumber: string;
// // // // // // // //   childName: string;
// // // // // // // //   parentName: string;
// // // // // // // //   dateOfBirth: string;
// // // // // // // //   admissionWeight: string;
// // // // // // // //   admissionHeight: string;
// // // // // // // //   createdAt: string;
// // // // // // // // }

// // // // // // // // export default function ChildRegistrationPage() {
// // // // // // // //   const router = useRouter();

// // // // // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // // // // //   const [fromDate, setFromDate] = useState("");
// // // // // // // //   const [toDate, setToDate] = useState("");
// // // // // // // //   const [recordNo, setRecordNo] = useState("");
// // // // // // // //   const [samNumber, setSamNumber] = useState("");
// // // // // // // //   const [childName, setChildName] = useState("");
// // // // // // // //   const [data, setData] = useState<Child[]>([]);
// // // // // // // //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// // // // // // // //   // 1. Fetch data from PostgreSQL Backend
// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchPatients = async () => {
// // // // // // // //       setIsLoading(true);
// // // // // // // //       try {
// // // // // // // //         const response = await fetch('/api/child-registration');
// // // // // // // //         if (!response.ok) throw new Error('Failed to fetch patients');
// // // // // // // //         const dbData = await response.json();

// // // // // // // //         // Map snake_case database columns to our camelCase frontend interface
// // // // // // // //         const mappedData: Child[] = dbData.map((row: any) => ({
// // // // // // // //           id: row.registration_id?.toString() || row.id,
// // // // // // // //           recordNo: row.registration_id?.toString() || "N/A", 
// // // // // // // //           samNumber: row.sam_no || row.samNumber,
// // // // // // // //           childName: row.child_full_name || row.childName,
// // // // // // // //           parentName: row.guardian_name || row.parentName,
// // // // // // // //           dateOfBirth: row.dob || row.dateOfBirth,
// // // // // // // //           admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight,
// // // // // // // //           admissionHeight: row.length_height_cm?.toString() || row.admissionHeight,
// // // // // // // //           createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
// // // // // // // //         }));

// // // // // // // //         setData(mappedData);
// // // // // // // //         setFilteredData(mappedData);
// // // // // // // //       } catch (error) {
// // // // // // // //         console.error("Error fetching data:", error);
// // // // // // // //         toast.error("Failed to load patient records from database.");
// // // // // // // //       } finally {
// // // // // // // //         setIsLoading(false);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     fetchPatients();
// // // // // // // //   }, []);

// // // // // // // //   // 2. Filter logic (Client-side)
// // // // // // // //   useEffect(() => {
// // // // // // // //     let filtered = [...data];
    
// // // // // // // //     if (recordNo) {
// // // // // // // //       filtered = filtered.filter(child => child.recordNo.toLowerCase().includes(recordNo.toLowerCase()));
// // // // // // // //     }
// // // // // // // //     if (samNumber) {
// // // // // // // //       filtered = filtered.filter(child => child.samNumber.toLowerCase().includes(samNumber.toLowerCase()));
// // // // // // // //     }
// // // // // // // //     if (childName) {
// // // // // // // //       filtered = filtered.filter(child => child.childName.toLowerCase().includes(childName.toLowerCase()));
// // // // // // // //     }
// // // // // // // //     if (fromDate) {
// // // // // // // //       filtered = filtered.filter(child => {
// // // // // // // //         const childDate = new Date(child.createdAt);
// // // // // // // //         const filterDate = new Date(fromDate);
// // // // // // // //         return childDate >= filterDate;
// // // // // // // //       });
// // // // // // // //     }
// // // // // // // //     if (toDate) {
// // // // // // // //       filtered = filtered.filter(child => {
// // // // // // // //         const childDate = new Date(child.createdAt);
// // // // // // // //         const filterDate = new Date(toDate);
// // // // // // // //         filterDate.setHours(23, 59, 59, 999);
// // // // // // // //         return childDate <= filterDate;
// // // // // // // //       });
// // // // // // // //     }
    
// // // // // // // //     setFilteredData(filtered);
// // // // // // // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // // // // // // //   const handleSearch = () => {
// // // // // // // //     toast.success("Filters applied successfully!");
// // // // // // // //   };

// // // // // // // //   // Actions
// // // // // // // //   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
// // // // // // // //   const handleDischarge = (id: string) => router.push(`/mtc-user/dashboard/discharge/discharge-from/${id}`);

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-slate-50 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6 font-sans">
// // // // // // // //       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />

// // // // // // // //       <div className="max-w-7xl mx-auto space-y-6">
// // // // // // // //         {/* Header */}
// // // // // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // // // // //           <div className="flex items-center gap-3">
// // // // // // // //             <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
// // // // // // // //               <Users className="h-6 w-6" />
// // // // // // // //             </div>
// // // // // // // //             <div>
// // // // // // // //               <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Patient Directory</h1>
// // // // // // // //               <p className="text-sm text-slate-500 font-medium mt-1">Manage and discharge admitted children</p>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //           <Button onClick={handleBackToHome} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-700 transition-colors bg-white shadow-sm">
// // // // // // // //             <Home className="mr-2 h-4 w-4" /> Back to Home
// // // // // // // //           </Button>
// // // // // // // //         </div>

// // // // // // // //         {/* Filters Section */}
// // // // // // // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // // // // // //           <CardContent className="p-6">
// // // // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
// // // // // // // //               <div>
// // // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">From Date</label>
// // // // // // // //                 <div className="relative">
// // // // // // // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               <div>
// // // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">To Date</label>
// // // // // // // //                 <div className="relative">
// // // // // // // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               <div>
// // // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Record No</label>
// // // // // // // //                 <Input placeholder="Search Record..." value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // // //               </div>

// // // // // // // //               <div>
// // // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SAM Number</label>
// // // // // // // //                 <Input placeholder="Search SAM..." value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // // //               </div>

// // // // // // // //               <div>
// // // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Child Name</label>
// // // // // // // //                 <div className="flex gap-2">
// // // // // // // //                   <Input placeholder="Search Name..." value={childName} onChange={(e) => setChildName(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // // //                   <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-3 shadow-sm">
// // // // // // // //                     <Search className="w-4 h-4" />
// // // // // // // //                   </Button>
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           </CardContent>
// // // // // // // //         </Card>

// // // // // // // //         {/* Table Section */}
// // // // // // // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
// // // // // // // //           <div className="overflow-x-auto custom-scrollbar">
// // // // // // // //             <table className="min-w-full text-sm text-slate-700 border-collapse">
// // // // // // // //               <thead>
// // // // // // // //                 <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
// // // // // // // //                   <th className="py-4 px-6 text-left font-bold">Record No</th>
// // // // // // // //                   <th className="py-4 px-6 text-left font-bold">SAM Number</th>
// // // // // // // //                   <th className="py-4 px-6 text-left font-bold">Child Name</th>
// // // // // // // //                   <th className="py-4 px-6 text-left font-bold hidden sm:table-cell">Parent Name</th>
// // // // // // // //                   <th className="py-4 px-6 text-left font-bold hidden lg:table-cell">Weight (kg)</th>
// // // // // // // //                   <th className="py-4 px-6 text-center font-bold">Actions</th>
// // // // // // // //                 </tr>
// // // // // // // //               </thead>
// // // // // // // //               <tbody className="divide-y divide-slate-100">
// // // // // // // //                 {isLoading ? (
// // // // // // // //                   <tr>
// // // // // // // //                     <td colSpan={6} className="py-12 text-center">
// // // // // // // //                       <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
// // // // // // // //                       <p className="text-slate-500 font-medium">Fetching patient records...</p>
// // // // // // // //                     </td>
// // // // // // // //                   </tr>
// // // // // // // //                 ) : filteredData.length > 0 ? (
// // // // // // // //                   filteredData.map((child) => (
// // // // // // // //                     <tr key={child.id} className="hover:bg-blue-50/50 transition-colors bg-white">
// // // // // // // //                       <td className="py-4 px-6 font-semibold text-slate-700">{child.recordNo}</td>
// // // // // // // //                       <td className="py-4 px-6 text-slate-600">{child.samNumber}</td>
// // // // // // // //                       <td className="py-4 px-6 font-bold text-slate-900">{child.childName}</td>
// // // // // // // //                       <td className="py-4 px-6 hidden sm:table-cell text-slate-600">{child.parentName}</td>
// // // // // // // //                       <td className="py-4 px-6 hidden lg:table-cell text-slate-600">{child.admissionWeight}</td>
// // // // // // // //                       <td className="py-4 px-6">
// // // // // // // //                         <div className="flex justify-center gap-2">
// // // // // // // //                           <Button onClick={() => handleDischarge(child.id)} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-4 py-2 h-auto rounded-lg shadow-none border border-emerald-200 hover:border-emerald-600 transition-all font-medium" title="Discharge Patient">
// // // // // // // //                             <FileText className="w-4 h-4 mr-2" />
// // // // // // // //                             Discharge
// // // // // // // //                           </Button>
// // // // // // // //                         </div>
// // // // // // // //                       </td>
// // // // // // // //                     </tr>
// // // // // // // //                   ))
// // // // // // // //                 ) : (
// // // // // // // //                   <tr>
// // // // // // // //                     <td colSpan={6} className="py-12 text-center bg-white">
// // // // // // // //                       <div className="flex flex-col items-center justify-center text-slate-400">
// // // // // // // //                         <div className="p-4 bg-slate-50 rounded-full mb-3">
// // // // // // // //                           <Search className="h-8 w-8 text-slate-300" />
// // // // // // // //                         </div>
// // // // // // // //                         <p className="font-bold text-slate-600 text-lg">No records found</p>
// // // // // // // //                         <p className="mt-1 text-sm">Adjust your filters or register a new child.</p>
// // // // // // // //                       </div>
// // // // // // // //                     </td>
// // // // // // // //                   </tr>
// // // // // // // //                 )}
// // // // // // // //               </tbody>
// // // // // // // //             </table>
// // // // // // // //           </div>
// // // // // // // //         </Card>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // "use client";

// // // // // import { useState, useEffect } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Card, CardContent } from "@/components/ui/card";
// // // // // import { Search, Home, FileText, Loader2, Users } from "lucide-react";
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

// // // // // export default function ChildRegistrationPage() {
// // // // //   const router = useRouter();

// // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // //   const [fromDate, setFromDate] = useState("");
// // // // //   const [toDate, setToDate] = useState("");
// // // // //   const [recordNo, setRecordNo] = useState("");
// // // // //   const [samNumber, setSamNumber] = useState("");
// // // // //   const [childName, setChildName] = useState("");
// // // // //   const [data, setData] = useState<Child[]>([]);
// // // // //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// // // // //   // 1. Fetch data from PostgreSQL Backend
// // // // //   useEffect(() => {
// // // // //     const fetchPatients = async () => {
// // // // //       setIsLoading(true);
// // // // //       try {
// // // // //         // Force fresh data fetch, bypassing browser/Next.js cache
// // // // //         const response = await fetch('/api/child-registration', { cache: 'no-store' });
// // // // //         if (!response.ok) throw new Error('Failed to fetch patients');
// // // // //         const dbData = await response.json();

// // // // //         // Filter out patients who already have a discharge date or exit indicator
// // // // //         const activePatients = dbData.filter((row: any) => !row.discharge_date && !row.exit_indicator);

// // // // //         // Map snake_case database columns to our camelCase frontend interface
// // // // //         const mappedData: Child[] = activePatients.map((row: any) => ({
// // // // //           id: row.registration_id?.toString() || row.id,
// // // // //           recordNo: row.registration_id?.toString() || "N/A", 
// // // // //           samNumber: row.sam_no || row.samNumber,
// // // // //           childName: row.child_full_name || row.childName,
// // // // //           parentName: row.guardian_name || row.parentName,
// // // // //           dateOfBirth: row.dob || row.dateOfBirth,
// // // // //           admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight,
// // // // //           admissionHeight: row.length_height_cm?.toString() || row.admissionHeight,
// // // // //           createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
// // // // //         }));

// // // // //         setData(mappedData);
// // // // //         setFilteredData(mappedData);
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching data:", error);
// // // // //         toast.error("Failed to load patient records from database.");
// // // // //       } finally {
// // // // //         setIsLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchPatients();
// // // // //   }, []);

// // // // //   // 2. Filter logic (Client-side)
// // // // //   useEffect(() => {
// // // // //     let filtered = [...data];
    
// // // // //     if (recordNo) {
// // // // //       filtered = filtered.filter(child => child.recordNo.toLowerCase().includes(recordNo.toLowerCase()));
// // // // //     }
// // // // //     if (samNumber) {
// // // // //       filtered = filtered.filter(child => child.samNumber.toLowerCase().includes(samNumber.toLowerCase()));
// // // // //     }
// // // // //     if (childName) {
// // // // //       filtered = filtered.filter(child => child.childName.toLowerCase().includes(childName.toLowerCase()));
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
// // // // //         filterDate.setHours(23, 59, 59, 999);
// // // // //         return childDate <= filterDate;
// // // // //       });
// // // // //     }
    
// // // // //     setFilteredData(filtered);
// // // // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // // // //   const handleSearch = () => {
// // // // //     toast.success("Filters applied successfully!");
// // // // //   };

// // // // //   // Actions
// // // // //   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
// // // // //   const handleDischarge = (id: string) => router.push(`/mtc-user/dashboard/discharge/discharge-from/${id}`);

// // // // //   return (
// // // // //     <div className="min-h-screen bg-slate-50 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6 font-sans">
// // // // //       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />

// // // // //       <div className="max-w-7xl mx-auto space-y-6">
// // // // //         {/* Header */}
// // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // //           <div className="flex items-center gap-3">
// // // // //             <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
// // // // //               <Users className="h-6 w-6" />
// // // // //             </div>
// // // // //             <div>
// // // // //               <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Patient Directory</h1>
// // // // //               <p className="text-sm text-slate-500 font-medium mt-1">Manage and discharge admitted children</p>
// // // // //             </div>
// // // // //           </div>
// // // // //           <Button onClick={handleBackToHome} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-700 transition-colors bg-white shadow-sm">
// // // // //             <Home className="mr-2 h-4 w-4" /> Back to Home
// // // // //           </Button>
// // // // //         </div>

// // // // //         {/* Filters Section */}
// // // // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // // //           <CardContent className="p-6">
// // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
// // // // //               <div>
// // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">From Date</label>
// // // // //                 <div className="relative">
// // // // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">To Date</label>
// // // // //                 <div className="relative">
// // // // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Record No</label>
// // // // //                 <Input placeholder="Search Record..." value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SAM Number</label>
// // // // //                 <Input placeholder="Search SAM..." value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Child Name</label>
// // // // //                 <div className="flex gap-2">
// // // // //                   <Input placeholder="Search Name..." value={childName} onChange={(e) => setChildName(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // //                   <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-3 shadow-sm">
// // // // //                     <Search className="w-4 h-4" />
// // // // //                   </Button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </CardContent>
// // // // //         </Card>

// // // // //         {/* Table Section */}
// // // // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
// // // // //           <div className="overflow-x-auto custom-scrollbar">
// // // // //             <table className="min-w-full text-sm text-slate-700 border-collapse">
// // // // //               <thead>
// // // // //                 <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
// // // // //                   <th className="py-4 px-6 text-left font-bold">Record No</th>
// // // // //                   <th className="py-4 px-6 text-left font-bold">SAM Number</th>
// // // // //                   <th className="py-4 px-6 text-left font-bold">Child Name</th>
// // // // //                   <th className="py-4 px-6 text-left font-bold hidden sm:table-cell">Parent Name</th>
// // // // //                   <th className="py-4 px-6 text-left font-bold hidden lg:table-cell">Weight (kg)</th>
// // // // //                   <th className="py-4 px-6 text-center font-bold">Actions</th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody className="divide-y divide-slate-100">
// // // // //                 {isLoading ? (
// // // // //                   <tr>
// // // // //                     <td colSpan={6} className="py-12 text-center">
// // // // //                       <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
// // // // //                       <p className="text-slate-500 font-medium">Fetching patient records...</p>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ) : filteredData.length > 0 ? (
// // // // //                   filteredData.map((child) => (
// // // // //                     <tr key={child.id} className="hover:bg-blue-50/50 transition-colors bg-white">
// // // // //                       <td className="py-4 px-6 font-semibold text-slate-700">{child.recordNo}</td>
// // // // //                       <td className="py-4 px-6 text-slate-600">{child.samNumber}</td>
// // // // //                       <td className="py-4 px-6 font-bold text-slate-900">{child.childName}</td>
// // // // //                       <td className="py-4 px-6 hidden sm:table-cell text-slate-600">{child.parentName}</td>
// // // // //                       <td className="py-4 px-6 hidden lg:table-cell text-slate-600">{child.admissionWeight}</td>
// // // // //                       <td className="py-4 px-6">
// // // // //                         <div className="flex justify-center gap-2">
// // // // //                           <Button onClick={() => handleDischarge(child.id)} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-4 py-2 h-auto rounded-lg shadow-none border border-emerald-200 hover:border-emerald-600 transition-all font-medium" title="Discharge Patient">
// // // // //                             <FileText className="w-4 h-4 mr-2" />
// // // // //                             Discharge
// // // // //                           </Button>
// // // // //                         </div>
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   ))
// // // // //                 ) : (
// // // // //                   <tr>
// // // // //                     <td colSpan={6} className="py-12 text-center bg-white">
// // // // //                       <div className="flex flex-col items-center justify-center text-slate-400">
// // // // //                         <div className="p-4 bg-slate-50 rounded-full mb-3">
// // // // //                           <Search className="h-8 w-8 text-slate-300" />
// // // // //                         </div>
// // // // //                         <p className="font-bold text-slate-600 text-lg">No records found</p>
// // // // //                         <p className="mt-1 text-sm">Adjust your filters or register a new child.</p>
// // // // //                       </div>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 )}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>
// // // // //         </Card>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // // "use client";

// // // // // // // import { useState, useEffect } from "react";
// // // // // // // import { useRouter } from "next/navigation";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import { Input } from "@/components/ui/input";
// // // // // // // import { Card, CardContent } from "@/components/ui/card";
// // // // // // // import { Search, Home, FileText, Loader2, Users } from "lucide-react";
// // // // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // // interface Child {
// // // // // // //   id: string;
// // // // // // //   recordNo: string;
// // // // // // //   samNumber: string;
// // // // // // //   childName: string;
// // // // // // //   parentName: string;
// // // // // // //   dateOfBirth: string;
// // // // // // //   admissionWeight: string;
// // // // // // //   admissionHeight: string;
// // // // // // //   createdAt: string;
// // // // // // // }

// // // // // // // export default function DischargeListPage() {
// // // // // // //   const router = useRouter();

// // // // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // // // //   const [fromDate, setFromDate] = useState("");
// // // // // // //   const [toDate, setToDate] = useState("");
// // // // // // //   const [recordNo, setRecordNo] = useState("");
// // // // // // //   const [samNumber, setSamNumber] = useState("");
// // // // // // //   const [childName, setChildName] = useState("");
// // // // // // //   const [data, setData] = useState<Child[]>([]);
// // // // // // //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// // // // // // //   // 1. Fetch data from PostgreSQL Backend
// // // // // // //   useEffect(() => {
// // // // // // //     const fetchPatients = async () => {
// // // // // // //       setIsLoading(true);
// // // // // // //       try {
// // // // // // //         // Force fresh data fetch, bypassing browser/Next.js cache
// // // // // // //         const response = await fetch('app/api/discharge-child', { cache: 'no-store' });
// // // // // // //         if (!response.ok) throw new Error('Failed to fetch patients');
// // // // // // //         const dbData = await response.json();

// // // // // // //         // Filter out patients who already have a discharge date saved in the DB
// // // // // // //         const activePatients = dbData.filter((row: any) => row.discharge_date === null || row.discharge_date === undefined);

// // // // // // //         // Map snake_case database columns to our camelCase frontend interface
// // // // // // //         const mappedData: Child[] = activePatients.map((row: any) => ({
// // // // // // //           id: row.registration_id?.toString() || row.id,
// // // // // // //           recordNo: row.registration_id?.toString() || "N/A", 
// // // // // // //           samNumber: row.sam_no || row.samNumber,
// // // // // // //           childName: row.child_full_name || row.childName,
// // // // // // //           parentName: row.guardian_name || row.parentName,
// // // // // // //           dateOfBirth: row.dob || row.dateOfBirth,
// // // // // // //           admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight,
// // // // // // //           admissionHeight: row.length_height_cm?.toString() || row.admissionHeight,
// // // // // // //           createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
// // // // // // //         }));

// // // // // // //         setData(mappedData);
// // // // // // //         setFilteredData(mappedData);
// // // // // // //       } catch (error) {
// // // // // // //         console.error("Error fetching data:", error);
// // // // // // //         toast.error("Failed to load patient records from database.");
// // // // // // //       } finally {
// // // // // // //         setIsLoading(false);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchPatients();
// // // // // // //   }, []);

// // // // // // //   // 2. Filter logic (Client-side)
// // // // // // //   useEffect(() => {
// // // // // // //     let filtered = [...data];
    
// // // // // // //     if (recordNo) {
// // // // // // //       filtered = filtered.filter(child => child.recordNo.toLowerCase().includes(recordNo.toLowerCase()));
// // // // // // //     }
// // // // // // //     if (samNumber) {
// // // // // // //       filtered = filtered.filter(child => child.samNumber.toLowerCase().includes(samNumber.toLowerCase()));
// // // // // // //     }
// // // // // // //     if (childName) {
// // // // // // //       filtered = filtered.filter(child => child.childName.toLowerCase().includes(childName.toLowerCase()));
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
// // // // // // //     toast.success("Filters applied successfully!");
// // // // // // //   };

// // // // // // //   // Actions
// // // // // // //   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
  
// // // // // // //   // FIX: Changed "discharge-from" to "discharge-form" so the button routes correctly
// // // // // // //   const handleDischarge = (id: string) => router.push(`/mtc-user/dashboard/discharge/discharge-form/${id}`);

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-slate-50 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6 font-sans">
// // // // // // //       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />

// // // // // // //       <div className="max-w-7xl mx-auto space-y-6">
// // // // // // //         {/* Header */}
// // // // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // // // //           <div className="flex items-center gap-3">
// // // // // // //             <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
// // // // // // //               <Users className="h-6 w-6" />
// // // // // // //             </div>
// // // // // // //             <div>
// // // // // // //               <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Patient Directory</h1>
// // // // // // //               <p className="text-sm text-slate-500 font-medium mt-1">Manage and discharge admitted children</p>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //           <Button onClick={handleBackToHome} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-700 transition-colors bg-white shadow-sm">
// // // // // // //             <Home className="mr-2 h-4 w-4" /> Back to Home
// // // // // // //           </Button>
// // // // // // //         </div>

// // // // // // //         {/* Filters Section */}
// // // // // // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // // // // //           <CardContent className="p-6">
// // // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
// // // // // // //               <div>
// // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">From Date</label>
// // // // // // //                 <div className="relative">
// // // // // // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               <div>
// // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">To Date</label>
// // // // // // //                 <div className="relative">
// // // // // // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               <div>
// // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Record No</label>
// // // // // // //                 <Input placeholder="Search Record..." value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // //               </div>

// // // // // // //               <div>
// // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SAM Number</label>
// // // // // // //                 <Input placeholder="Search SAM..." value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // //               </div>

// // // // // // //               <div>
// // // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Child Name</label>
// // // // // // //                 <div className="flex gap-2">
// // // // // // //                   <Input placeholder="Search Name..." value={childName} onChange={(e) => setChildName(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // // //                   <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-3 shadow-sm">
// // // // // // //                     <Search className="w-4 h-4" />
// // // // // // //                   </Button>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </CardContent>
// // // // // // //         </Card>

// // // // // // //         {/* Table Section */}
// // // // // // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
// // // // // // //           <div className="overflow-x-auto custom-scrollbar">
// // // // // // //             <table className="min-w-full text-sm text-slate-700 border-collapse">
// // // // // // //               <thead>
// // // // // // //                 <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
// // // // // // //                   <th className="py-4 px-6 text-left font-bold">Record No</th>
// // // // // // //                   <th className="py-4 px-6 text-left font-bold">SAM Number</th>
// // // // // // //                   <th className="py-4 px-6 text-left font-bold">Child Name</th>
// // // // // // //                   <th className="py-4 px-6 text-left font-bold hidden sm:table-cell">Parent Name</th>
// // // // // // //                   <th className="py-4 px-6 text-left font-bold hidden lg:table-cell">Weight (kg)</th>
// // // // // // //                   <th className="py-4 px-6 text-center font-bold">Actions</th>
// // // // // // //                 </tr>
// // // // // // //               </thead>
// // // // // // //               <tbody className="divide-y divide-slate-100">
// // // // // // //                 {isLoading ? (
// // // // // // //                   <tr>
// // // // // // //                     <td colSpan={6} className="py-12 text-center">
// // // // // // //                       <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
// // // // // // //                       <p className="text-slate-500 font-medium">Fetching patient records...</p>
// // // // // // //                     </td>
// // // // // // //                   </tr>
// // // // // // //                 ) : filteredData.length > 0 ? (
// // // // // // //                   filteredData.map((child) => (
// // // // // // //                     <tr key={child.id} className="hover:bg-blue-50/50 transition-colors bg-white">
// // // // // // //                       <td className="py-4 px-6 font-semibold text-slate-700">{child.recordNo}</td>
// // // // // // //                       <td className="py-4 px-6 text-slate-600">{child.samNumber}</td>
// // // // // // //                       <td className="py-4 px-6 font-bold text-slate-900">{child.childName}</td>
// // // // // // //                       <td className="py-4 px-6 hidden sm:table-cell text-slate-600">{child.parentName}</td>
// // // // // // //                       <td className="py-4 px-6 hidden lg:table-cell text-slate-600">{child.admissionWeight}</td>
// // // // // // //                       <td className="py-4 px-6">
// // // // // // //                         <div className="flex justify-center gap-2">
// // // // // // //                           <Button onClick={() => handleDischarge(child.id)} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-4 py-2 h-auto rounded-lg shadow-none border border-emerald-200 hover:border-emerald-600 transition-all font-medium" title="Discharge Patient">
// // // // // // //                             <FileText className="w-4 h-4 mr-2" />
// // // // // // //                             Discharge
// // // // // // //                           </Button>
// // // // // // //                         </div>
// // // // // // //                       </td>
// // // // // // //                     </tr>
// // // // // // //                   ))
// // // // // // //                 ) : (
// // // // // // //                   <tr>
// // // // // // //                     <td colSpan={6} className="py-12 text-center bg-white">
// // // // // // //                       <div className="flex flex-col items-center justify-center text-slate-400">
// // // // // // //                         <div className="p-4 bg-slate-50 rounded-full mb-3">
// // // // // // //                           <Search className="h-8 w-8 text-slate-300" />
// // // // // // //                         </div>
// // // // // // //                         <p className="font-bold text-slate-600 text-lg">No pending records found</p>
// // // // // // //                         <p className="mt-1 text-sm">Everyone in this list has been discharged.</p>
// // // // // // //                       </div>
// // // // // // //                     </td>
// // // // // // //                   </tr>
// // // // // // //                 )}
// // // // // // //               </tbody>
// // // // // // //             </table>
// // // // // // //           </div>
// // // // // // //         </Card>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }


// // // // // // "use client";

// // // // // // import { useState, useEffect } from "react";
// // // // // // import { useRouter } from "next/navigation";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Card, CardContent } from "@/components/ui/card";
// // // // // // import { Search, Home, FileText, Loader2, Users } from "lucide-react";
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

// // // // // // export default function DischargeListPage() {
// // // // // //   const router = useRouter();

// // // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // // //   const [fromDate, setFromDate] = useState("");
// // // // // //   const [toDate, setToDate] = useState("");
// // // // // //   const [recordNo, setRecordNo] = useState("");
// // // // // //   const [samNumber, setSamNumber] = useState("");
// // // // // //   const [childName, setChildName] = useState("");
// // // // // //   const [data, setData] = useState<Child[]>([]);
// // // // // //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// // // // // //   // 1. Fetch data from the NEW PostgreSQL Backend API
// // // // // //   useEffect(() => {
// // // // // //     const fetchPendingDischarges = async () => {
// // // // // //       setIsLoading(true);
// // // // // //       try {
// // // // // //         // Hit the new dedicated API endpoint
// // // // // //         const response = await fetch('/api/pending-discharge', { cache: 'no-store' });
        
// // // // // //         if (!response.ok) throw new Error('Failed to fetch patients');
// // // // // //         const dbData = await response.json();

// // // // // //         // Map snake_case database columns to our camelCase frontend interface
// // // // // //         const mappedData: Child[] = dbData.map((row: any) => ({
// // // // // //           id: row.registration_id?.toString() || row.id,
// // // // // //           recordNo: row.registration_id?.toString() || "N/A", 
// // // // // //           samNumber: row.sam_no || row.samNumber,
// // // // // //           childName: row.child_full_name || row.childName,
// // // // // //           parentName: row.guardian_name || row.parentName,
// // // // // //           dateOfBirth: row.dob || row.dateOfBirth,
// // // // // //           admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight,
// // // // // //           admissionHeight: row.length_height_cm?.toString() || row.admissionHeight,
// // // // // //           createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
// // // // // //         }));

// // // // // //         setData(mappedData);
// // // // // //         setFilteredData(mappedData);
// // // // // //       } catch (error) {
// // // // // //         console.error("Error fetching data:", error);
// // // // // //         toast.error("Failed to load pending discharges from database.");
// // // // // //       } finally {
// // // // // //         setIsLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchPendingDischarges();
// // // // // //   }, []);

// // // // // //   // 2. Filter logic (Client-side Search Bars)
// // // // // //   useEffect(() => {
// // // // // //     let filtered = [...data];
    
// // // // // //     if (recordNo) {
// // // // // //       filtered = filtered.filter(child => child.recordNo.toLowerCase().includes(recordNo.toLowerCase()));
// // // // // //     }
// // // // // //     if (samNumber) {
// // // // // //       filtered = filtered.filter(child => child.samNumber.toLowerCase().includes(samNumber.toLowerCase()));
// // // // // //     }
// // // // // //     if (childName) {
// // // // // //       filtered = filtered.filter(child => child.childName.toLowerCase().includes(childName.toLowerCase()));
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
// // // // // //         filterDate.setHours(23, 59, 59, 999);
// // // // // //         return childDate <= filterDate;
// // // // // //       });
// // // // // //     }
    
// // // // // //     setFilteredData(filtered);
// // // // // //   }, [data, recordNo, samNumber, childName, fromDate, toDate]);

// // // // // //   const handleSearch = () => {
// // // // // //     toast.success("Filters applied successfully!");
// // // // // //   };

// // // // // //   // Actions
// // // // // //   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
// // // // // //   const handleDischarge = (id: string) => router.push(`/mtc-user/dashboard/discharge/discharge-form/${id}`);

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-slate-50 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6 font-sans">
// // // // // //       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />

// // // // // //       <div className="max-w-7xl mx-auto space-y-6">
// // // // // //         {/* Header */}
// // // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // // //           <div className="flex items-center gap-3">
// // // // // //             <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
// // // // // //               <Users className="h-6 w-6" />
// // // // // //             </div>
// // // // // //             <div>
// // // // // //               <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Pending Discharges</h1>
// // // // // //               <p className="text-sm text-slate-500 font-medium mt-1">Select a patient below to process their departure</p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //           <Button onClick={handleBackToHome} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-700 transition-colors bg-white shadow-sm">
// // // // // //             <Home className="mr-2 h-4 w-4" /> Back to Home
// // // // // //           </Button>
// // // // // //         </div>

// // // // // //         {/* Filters Section */}
// // // // // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // // // //           <CardContent className="p-6">
// // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
// // // // // //               <div>
// // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">From Date</label>
// // // // // //                 <div className="relative">
// // // // // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div>
// // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">To Date</label>
// // // // // //                 <div className="relative">
// // // // // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div>
// // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Record No</label>
// // // // // //                 <Input placeholder="Search Record..." value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // //               </div>

// // // // // //               <div>
// // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SAM Number</label>
// // // // // //                 <Input placeholder="Search SAM..." value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // //               </div>

// // // // // //               <div>
// // // // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Child Name</label>
// // // // // //                 <div className="flex gap-2">
// // // // // //                   <Input placeholder="Search Name..." value={childName} onChange={(e) => setChildName(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // // // //                   <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-3 shadow-sm">
// // // // // //                     <Search className="w-4 h-4" />
// // // // // //                   </Button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </CardContent>
// // // // // //         </Card>

// // // // // //         {/* Table Section */}
// // // // // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
// // // // // //           <div className="overflow-x-auto custom-scrollbar">
// // // // // //             <table className="min-w-full text-sm text-slate-700 border-collapse">
// // // // // //               <thead>
// // // // // //                 <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
// // // // // //                   <th className="py-4 px-6 text-left font-bold">Record No</th>
// // // // // //                   <th className="py-4 px-6 text-left font-bold">SAM Number</th>
// // // // // //                   <th className="py-4 px-6 text-left font-bold">Child Name</th>
// // // // // //                   <th className="py-4 px-6 text-left font-bold hidden sm:table-cell">Parent Name</th>
// // // // // //                   <th className="py-4 px-6 text-left font-bold hidden lg:table-cell">Weight (kg)</th>
// // // // // //                   <th className="py-4 px-6 text-center font-bold">Actions</th>
// // // // // //                 </tr>
// // // // // //               </thead>
// // // // // //               <tbody className="divide-y divide-slate-100">
// // // // // //                 {isLoading ? (
// // // // // //                   <tr>
// // // // // //                     <td colSpan={6} className="py-12 text-center">
// // // // // //                       <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
// // // // // //                       <p className="text-slate-500 font-medium">Fetching active patients...</p>
// // // // // //                     </td>
// // // // // //                   </tr>
// // // // // //                 ) : filteredData.length > 0 ? (
// // // // // //                   filteredData.map((child) => (
// // // // // //                     <tr key={child.id} className="hover:bg-blue-50/50 transition-colors bg-white">
// // // // // //                       <td className="py-4 px-6 font-semibold text-slate-700">{child.recordNo}</td>
// // // // // //                       <td className="py-4 px-6 text-slate-600">{child.samNumber}</td>
// // // // // //                       <td className="py-4 px-6 font-bold text-slate-900">{child.childName}</td>
// // // // // //                       <td className="py-4 px-6 hidden sm:table-cell text-slate-600">{child.parentName}</td>
// // // // // //                       <td className="py-4 px-6 hidden lg:table-cell text-slate-600">{child.admissionWeight}</td>
// // // // // //                       <td className="py-4 px-6">
// // // // // //                         <div className="flex justify-center gap-2">
// // // // // //                           <Button onClick={() => handleDischarge(child.id)} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-4 py-2 h-auto rounded-lg shadow-none border border-emerald-200 hover:border-emerald-600 transition-all font-medium" title="Discharge Patient">
// // // // // //                             <FileText className="w-4 h-4 mr-2" />
// // // // // //                             Discharge
// // // // // //                           </Button>
// // // // // //                         </div>
// // // // // //                       </td>
// // // // // //                     </tr>
// // // // // //                   ))
// // // // // //                 ) : (
// // // // // //                   <tr>
// // // // // //                     <td colSpan={6} className="py-12 text-center bg-white">
// // // // // //                       <div className="flex flex-col items-center justify-center text-slate-400">
// // // // // //                         <div className="p-4 bg-slate-50 rounded-full mb-3">
// // // // // //                           <Search className="h-8 w-8 text-slate-300" />
// // // // // //                         </div>
// // // // // //                         <p className="font-bold text-slate-600 text-lg">No pending records found</p>
// // // // // //                         <p className="mt-1 text-sm">Everyone in this list has already been discharged.</p>
// // // // // //                       </div>
// // // // // //                     </td>
// // // // // //                   </tr>
// // // // // //                 )}
// // // // // //               </tbody>
// // // // // //             </table>
// // // // // //           </div>
// // // // // //         </Card>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // "use client";

// // // // import { useState, useEffect } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Card, CardContent } from "@/components/ui/card";
// // // // import { Search, Home, FileText, Loader2, Users } from "lucide-react";
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
// // // //   admissionDate: string;
// // // // }

// // // // export default function ChildRegistrationPage() {
// // // //   const router = useRouter();

// // // //   const [isLoading, setIsLoading] = useState(true);
// // // //   const [fromDate, setFromDate] = useState("");
// // // //   const [toDate, setToDate] = useState("");
// // // //   const [recordNo, setRecordNo] = useState("");
// // // //   const [samNumber, setSamNumber] = useState("");
// // // //   const [childName, setChildName] = useState("");
// // // //   const [data, setData] = useState<Child[]>([]);
// // // //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// // // //   // 1. Fetch data from PostgreSQL Backend
// // // //   useEffect(() => {
// // // //     const fetchPatients = async () => {
// // // //       setIsLoading(true);
// // // //       try {
// // // //         const response = await fetch('/api/child-registration', { cache: 'no-store' });
// // // //         if (!response.ok) throw new Error('Failed to fetch patients');
// // // //         const dbData = await response.json();

// // // //         const activePatients = dbData.filter((row: any) => !row.discharge_date && !row.exit_indicator);

// // // //         const mappedData: Child[] = activePatients.map((row: any) => ({
// // // //           id: row.registration_id?.toString() || row.id,
// // // //           recordNo: row.registration_id?.toString() || "N/A", 
// // // //           samNumber: row.sam_no || row.samNumber,
// // // //           childName: row.child_full_name || row.childName,
// // // //           parentName: row.guardian_name || row.parentName,
// // // //           dateOfBirth: row.dob || row.dateOfBirth,
// // // //           admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight,
// // // //           admissionHeight: row.length_height_cm?.toString() || row.admissionHeight,
// // // //           createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
// // // //           admissionDate: row.admission_date || "N/A",
// // // //         }));

// // // //         setData(mappedData);
// // // //         setFilteredData(mappedData);
// // // //       } catch (error) {
// // // //         console.error("Error fetching data:", error);
// // // //         toast.error("Failed to load patient records from database.");
// // // //       } finally {
// // // //         setIsLoading(false);
// // // //       }
// // // //     };

// // // //     fetchPatients();
// // // //   }, []);

// // // //   // 2. Filter logic (Client-side)
// // // //   useEffect(() => {
// // // //     let filtered = [...data];
    
// // // //     if (recordNo) {
// // // //       filtered = filtered.filter(child => child.recordNo.toLowerCase().includes(recordNo.toLowerCase()));
// // // //     }
// // // //     if (samNumber) {
// // // //       filtered = filtered.filter(child => child.samNumber.toLowerCase().includes(samNumber.toLowerCase()));
// // // //     }
// // // //     if (childName) {
// // // //       filtered = filtered.filter(child => child.childName.toLowerCase().includes(childName.toLowerCase()));
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
// // // //     toast.success("Filters applied successfully!");
// // // //   };

// // // //   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
// // // //   const handleDischarge = (id: string) => router.push(`/mtc-user/dashboard/discharge/discharge-from/${id}`);

// // // //   return (
// // // //     <div className="min-h-screen bg-slate-50 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6 font-sans">
// // // //       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />

// // // //       <div className="max-w-7xl mx-auto space-y-6">
// // // //         {/* Header */}
// // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // //           <div className="flex items-center gap-3">
// // // //             <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
// // // //               <Users className="h-6 w-6" />
// // // //             </div>
// // // //             <div>
// // // //               <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Patient Directory</h1>
// // // //               <p className="text-sm text-slate-500 font-medium mt-1">Manage and discharge admitted children</p>
// // // //             </div>
// // // //           </div>
// // // //           <Button onClick={handleBackToHome} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-700 transition-colors bg-white shadow-sm">
// // // //             <Home className="mr-2 h-4 w-4" /> Back to Home
// // // //           </Button>
// // // //         </div>

// // // //         {/* Filters Section */}
// // // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // //           <CardContent className="p-6">
// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
// // // //               <div>
// // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">From Date</label>
// // // //                 <div className="relative">
// // // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">To Date</label>
// // // //                 <div className="relative">
// // // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Record No</label>
// // // //                 <Input placeholder="Search Record..." value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // //               </div>

// // // //               <div>
// // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SAM Number</label>
// // // //                 <Input placeholder="Search SAM..." value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // //               </div>

// // // //               <div>
// // // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Child Name</label>
// // // //                 <div className="flex gap-2">
// // // //                   <Input placeholder="Search Name..." value={childName} onChange={(e) => setChildName(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // // //                   <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-3 shadow-sm">
// // // //                     <Search className="w-4 h-4" />
// // // //                   </Button>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </CardContent>
// // // //         </Card>

// // // //         {/* Table Section */}
// // // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
// // // //           <div className="overflow-x-auto custom-scrollbar">
// // // //             <table className="min-w-full text-sm text-slate-700 border-collapse">
// // // //               <thead>
// // // //                 <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
// // // //                   <th className="py-4 px-6 text-left font-bold">Record No</th>
// // // //                   <th className="py-4 px-6 text-left font-bold">SAM Number</th>
// // // //                   <th className="py-4 px-6 text-left font-bold">Date of Admission</th>
// // // //                   <th className="py-4 px-6 text-left font-bold">Child Name</th>
// // // //                   <th className="py-4 px-6 text-left font-bold hidden sm:table-cell">Parent Name</th>
// // // //                   <th className="py-4 px-6 text-left font-bold hidden lg:table-cell">Weight (kg)</th>
// // // //                   <th className="py-4 px-6 text-center font-bold">Actions</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody className="divide-y divide-slate-100">
// // // //                 {isLoading ? (
// // // //                   <tr>
// // // //                     <td colSpan={7} className="py-12 text-center">
// // // //                       <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
// // // //                       <p className="text-slate-500 font-medium">Fetching patient records...</p>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ) : filteredData.length > 0 ? (
// // // //                   filteredData.map((child) => (
// // // //                     <tr key={child.id} className="hover:bg-blue-50/50 transition-colors bg-white">
// // // //                       <td className="py-4 px-6 font-semibold text-slate-700">{child.recordNo}</td>
// // // //                       <td className="py-4 px-6 text-slate-600">{child.samNumber}</td>
// // // //                       <td className="py-4 px-6 text-slate-600">{child.admissionDate}</td>
// // // //                       <td className="py-4 px-6 font-bold text-slate-900">{child.childName}</td>
// // // //                       <td className="py-4 px-6 hidden sm:table-cell text-slate-600">{child.parentName}</td>
// // // //                       <td className="py-4 px-6 hidden lg:table-cell text-slate-600">{child.admissionWeight}</td>
// // // //                       <td className="py-4 px-6">
// // // //                         <div className="flex justify-center gap-2">
// // // //                           <Button onClick={() => handleDischarge(child.id)} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-4 py-2 h-auto rounded-lg shadow-none border border-emerald-200 hover:border-emerald-600 transition-all font-medium" title="Discharge Patient">
// // // //                             <FileText className="w-4 h-4 mr-2" />
// // // //                             Discharge
// // // //                           </Button>
// // // //                         </div>
// // // //                       </td>
// // // //                     </tr>
// // // //                   ))
// // // //                 ) : (
// // // //                   <tr>
// // // //                     <td colSpan={7} className="py-12 text-center bg-white">
// // // //                       <div className="flex flex-col items-center justify-center text-slate-400">
// // // //                         <div className="p-4 bg-slate-50 rounded-full mb-3">
// // // //                           <Search className="h-8 w-8 text-slate-300" />
// // // //                         </div>
// // // //                         <p className="font-bold text-slate-600 text-lg">No records found</p>
// // // //                         <p className="mt-1 text-sm">Adjust your filters or register a new child.</p>
// // // //                       </div>
// // // //                     </td>
// // // //                   </tr>
// // // //                 )}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
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
// // // import { Card, CardContent } from "@/components/ui/card";
// // // import { Search, Home, FileText, Loader2, Users } from "lucide-react";
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
// // //   admissionDate: string;
// // // }

// // // export default function DischargeDirectoryPage() {
// // //   const router = useRouter();

// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [fromDate, setFromDate] = useState("");
// // //   const [toDate, setToDate] = useState("");
// // //   const [recordNo, setRecordNo] = useState("");
// // //   const [samNumber, setSamNumber] = useState("");
// // //   const [childName, setChildName] = useState("");
// // //   const [data, setData] = useState<Child[]>([]);
// // //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// // //   // 1. Fetch data from PostgreSQL Backend (Filtered by MTC Center)
// // //   useEffect(() => {
// // //     const fetchPatients = async () => {
// // //       setIsLoading(true);
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

// // //         // ✅ 2. Fetch only patients belonging to this MTC
// // //         const response = await fetch(`/api/child-registration${queryParams}`, { cache: 'no-store' });
// // //         if (!response.ok) throw new Error('Failed to fetch patients');
// // //         const dbData = await response.json();

// // //         // Filter out patients who have already been discharged
// // //         const activePatients = dbData.filter((row: any) => !row.discharge_date && !row.exit_indicator);

// // //         const mappedData: Child[] = activePatients.map((row: any) => ({
// // //           id: row.registration_id?.toString() || row.id,
// // //           recordNo: row.registration_id?.toString() || "N/A", 
// // //           samNumber: row.sam_no || row.samNumber,
// // //           childName: row.child_full_name || row.childName,
// // //           parentName: row.guardian_name || row.parentName,
// // //           dateOfBirth: row.dob || row.dateOfBirth,
// // //           admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight,
// // //           admissionHeight: row.length_height_cm?.toString() || row.admissionHeight,
// // //           createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
// // //           admissionDate: row.admission_date || "N/A",
// // //         }));

// // //         setData(mappedData);
// // //         setFilteredData(mappedData);
// // //       } catch (error) {
// // //         console.error("Error fetching data:", error);
// // //         toast.error("Failed to load patient records from database.");
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     };

// // //     fetchPatients();
// // //   }, []);

// // //   // 2. Filter logic (Client-side)
// // //   useEffect(() => {
// // //     let filtered = [...data];
    
// // //     if (recordNo) {
// // //       filtered = filtered.filter(child => child.recordNo.toLowerCase().includes(recordNo.toLowerCase()));
// // //     }
// // //     if (samNumber) {
// // //       filtered = filtered.filter(child => child.samNumber.toLowerCase().includes(samNumber.toLowerCase()));
// // //     }
// // //     if (childName) {
// // //       filtered = filtered.filter(child => child.childName.toLowerCase().includes(childName.toLowerCase()));
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
// // //     toast.success("Filters applied successfully!");
// // //   };

// // //   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
// // //   const handleDischarge = (id: string) => router.push(`/mtc-user/dashboard/discharge/discharge-from/${id}`);

// // //   return (
// // //     <div className="min-h-screen bg-slate-50 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6 font-sans">
// // //       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />

// // //       <div className="max-w-7xl mx-auto space-y-6">
// // //         {/* Header */}
// // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // //           <div className="flex items-center gap-3">
// // //             <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
// // //               <Users className="h-6 w-6" />
// // //             </div>
// // //             <div>
// // //               <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Patient Directory</h1>
// // //               <p className="text-sm text-slate-500 font-medium mt-1">Manage and discharge admitted children</p>
// // //             </div>
// // //           </div>
// // //           <Button onClick={handleBackToHome} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-700 transition-colors bg-white shadow-sm">
// // //             <Home className="mr-2 h-4 w-4" /> Back to Home
// // //           </Button>
// // //         </div>

// // //         {/* Filters Section */}
// // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // //           <CardContent className="p-6">
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
// // //               <div>
// // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">From Date</label>
// // //                 <div className="relative">
// // //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">To Date</label>
// // //                 <div className="relative">
// // //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Record No</label>
// // //                 <Input placeholder="Search Record..." value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // //               </div>

// // //               <div>
// // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SAM Number</label>
// // //                 <Input placeholder="Search SAM..." value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // //               </div>

// // //               <div>
// // //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Child Name</label>
// // //                 <div className="flex gap-2">
// // //                   <Input placeholder="Search Name..." value={childName} onChange={(e) => setChildName(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// // //                   <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-3 shadow-sm">
// // //                     <Search className="w-4 h-4" />
// // //                   </Button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         {/* Table Section */}
// // //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
// // //           <div className="overflow-x-auto custom-scrollbar">
// // //             <table className="min-w-full text-sm text-slate-700 border-collapse">
// // //               <thead>
// // //                 <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
// // //                   <th className="py-4 px-6 text-left font-bold">Record No</th>
// // //                   <th className="py-4 px-6 text-left font-bold">SAM Number</th>
// // //                   <th className="py-4 px-6 text-left font-bold">Date of Admission</th>
// // //                   <th className="py-4 px-6 text-left font-bold">Child Name</th>
// // //                   <th className="py-4 px-6 text-left font-bold hidden sm:table-cell">Parent Name</th>
// // //                   <th className="py-4 px-6 text-left font-bold hidden lg:table-cell">Weight (kg)</th>
// // //                   <th className="py-4 px-6 text-center font-bold">Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody className="divide-y divide-slate-100">
// // //                 {isLoading ? (
// // //                   <tr>
// // //                     <td colSpan={7} className="py-12 text-center">
// // //                       <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
// // //                       <p className="text-slate-500 font-medium">Fetching patient records...</p>
// // //                     </td>
// // //                   </tr>
// // //                 ) : filteredData.length > 0 ? (
// // //                   filteredData.map((child) => (
// // //                     <tr key={child.id} className="hover:bg-blue-50/50 transition-colors bg-white">
// // //                       <td className="py-4 px-6 font-semibold text-slate-700">{child.recordNo}</td>
// // //                       <td className="py-4 px-6 text-slate-600">{child.samNumber}</td>
// // //                       <td className="py-4 px-6 text-slate-600">{child.admissionDate}</td>
// // //                       <td className="py-4 px-6 font-bold text-slate-900">{child.childName}</td>
// // //                       <td className="py-4 px-6 hidden sm:table-cell text-slate-600">{child.parentName}</td>
// // //                       <td className="py-4 px-6 hidden lg:table-cell text-slate-600">{child.admissionWeight}</td>
// // //                       <td className="py-4 px-6">
// // //                         <div className="flex justify-center gap-2">
// // //                           <Button onClick={() => handleDischarge(child.id)} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-4 py-2 h-auto rounded-lg shadow-none border border-emerald-200 hover:border-emerald-600 transition-all font-medium" title="Discharge Patient">
// // //                             <FileText className="w-4 h-4 mr-2" />
// // //                             Discharge
// // //                           </Button>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   ))
// // //                 ) : (
// // //                   <tr>
// // //                     <td colSpan={7} className="py-12 text-center bg-white">
// // //                       <div className="flex flex-col items-center justify-center text-slate-400">
// // //                         <div className="p-4 bg-slate-50 rounded-full mb-3">
// // //                           <Search className="h-8 w-8 text-slate-300" />
// // //                         </div>
// // //                         <p className="font-bold text-slate-600 text-lg">No records found</p>
// // //                         <p className="mt-1 text-sm">Adjust your filters or register a new child.</p>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 )}
// // //               </tbody>
// // //             </table>
// // //           </div>
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
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Search, Home, FileText, Loader2, Users, CheckCircle2 } from "lucide-react";
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
// //   admissionDate: string;
// //   isSamarRegistered: boolean; // ✅ Added SAAMAR boolean
// //   samarUuid: string;          // ✅ Added SAAMAR UUID
// // }

// // export default function DischargeDirectoryPage() {
// //   const router = useRouter();

// //   const [isLoading, setIsLoading] = useState(true);
// //   const [fromDate, setFromDate] = useState("");
// //   const [toDate, setToDate] = useState("");
// //   const [recordNo, setRecordNo] = useState("");
// //   const [samNumber, setSamNumber] = useState("");
// //   const [childName, setChildName] = useState("");
  
// //   // ✅ Added state for separating views
// //   const [viewType, setViewType] = useState<"all" | "normal" | "samar">("all");

// //   const [data, setData] = useState<Child[]>([]);
// //   const [filteredData, setFilteredData] = useState<Child[]>([]);

// //   // 1. Fetch data from PostgreSQL Backend (Filtered by MTC Center)
// //   useEffect(() => {
// //     const fetchPatients = async () => {
// //       setIsLoading(true);
// //       try {
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

// //         const response = await fetch(`/api/child-registration${queryParams}`, { cache: 'no-store' });
// //         if (!response.ok) throw new Error('Failed to fetch patients');
// //         const dbData = await response.json();

// //         // Filter out patients who have already been discharged
// //         const activePatients = dbData.filter((row: any) => !row.discharge_date && !row.exit_indicator);

// //         const mappedData: Child[] = activePatients.map((row: any) => ({
// //           id: row.registration_id?.toString() || row.id,
// //           recordNo: row.registration_id?.toString() || "N/A", 
// //           samNumber: row.sam_no || row.samNumber,
// //           childName: row.child_full_name || row.childName,
// //           parentName: row.guardian_name || row.parentName,
// //           dateOfBirth: row.dob || row.dateOfBirth,
// //           admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight,
// //           admissionHeight: row.length_height_cm?.toString() || row.admissionHeight,
// //           createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
// //           admissionDate: row.admission_date || "N/A",
// //           // ✅ Map SAAMAR data from the database payload
// //           isSamarRegistered: row.is_samar_registered === true || row.isSamarRegistered === true,
// //           samarUuid: row.samar_uuid || row.samarUuid || "",
// //         }));

// //         setData(mappedData);
// //         setFilteredData(mappedData);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //         toast.error("Failed to load patient records from database.");
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchPatients();
// //   }, []);

// //   // 2. Filter logic (Client-side)
// //   useEffect(() => {
// //     let filtered = [...data];
    
// //     // ✅ Apply the Normal vs SAAMAR filter separation
// //     if (viewType === "normal") {
// //       filtered = filtered.filter(child => !child.isSamarRegistered);
// //     } else if (viewType === "samar") {
// //       filtered = filtered.filter(child => child.isSamarRegistered);
// //     }

// //     if (recordNo) {
// //       filtered = filtered.filter(child => child.recordNo.toLowerCase().includes(recordNo.toLowerCase()));
// //     }
// //     if (samNumber) {
// //       filtered = filtered.filter(child => child.samNumber.toLowerCase().includes(samNumber.toLowerCase()));
// //     }
// //     if (childName) {
// //       filtered = filtered.filter(child => child.childName.toLowerCase().includes(childName.toLowerCase()));
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
// //     toast.success("Filters applied successfully!");
// //   };

// //   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
// //   const handleDischarge = (id: string) => router.push(`/mtc-user/dashboard/discharge/discharge-from/${id}`);

// //   // Derived counts for the tabs
// //   const countAll = data.length;
// //   const countNormal = data.filter(d => !d.isSamarRegistered).length;
// //   const countSamar = data.filter(d => d.isSamarRegistered).length;

// //   return (
// //     <div className="min-h-screen bg-slate-50 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6 font-sans">
// //       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />

// //       <div className="max-w-7xl mx-auto space-y-6">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //           <div className="flex items-center gap-3">
// //             <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
// //               <Users className="h-6 w-6" />
// //             </div>
// //             <div>
// //               <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Patient Directory</h1>
// //               <p className="text-sm text-slate-500 font-medium mt-1">Manage and discharge admitted children</p>
// //             </div>
// //           </div>
// //           <Button onClick={handleBackToHome} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-700 transition-colors bg-white shadow-sm">
// //             <Home className="mr-2 h-4 w-4" /> Back to Home
// //           </Button>
// //         </div>

// //         {/* Filters Section */}
// //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// //           <CardContent className="p-6">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
// //               <div>
// //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">From Date</label>
// //                 <div className="relative">
// //                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">To Date</label>
// //                 <div className="relative">
// //                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Record No</label>
// //                 <Input placeholder="Search Record..." value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// //               </div>

// //               <div>
// //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SAM Number</label>
// //                 <Input placeholder="Search SAM..." value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// //               </div>

// //               <div>
// //                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Child Name</label>
// //                 <div className="flex gap-2">
// //                   <Input placeholder="Search Name..." value={childName} onChange={(e) => setChildName(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
// //                   <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-3 shadow-sm">
// //                     <Search className="w-4 h-4" />
// //                   </Button>
// //                 </div>
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

// //         {/* Table Section */}
// //         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
// //           <div className="overflow-x-auto custom-scrollbar">
// //             <table className="min-w-full text-sm text-slate-700 border-collapse">
// //               <thead>
// //                 <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
// //                   <th className="py-4 px-6 text-left font-bold">Record No</th>
// //                   <th className="py-4 px-6 text-left font-bold">SAM Number</th>
// //                   <th className="py-4 px-6 text-left font-bold">Date of Admission</th>
// //                   <th className="py-4 px-6 text-left font-bold">Child Name</th>
// //                   {/* ✅ Added Type Header */}
// //                   <th className="py-4 px-6 text-left font-bold">Registration Type</th> 
// //                   <th className="py-4 px-6 text-left font-bold hidden sm:table-cell">Parent Name</th>
// //                   <th className="py-4 px-6 text-left font-bold hidden lg:table-cell">Weight (kg)</th>
// //                   <th className="py-4 px-6 text-center font-bold">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-slate-100">
// //                 {isLoading ? (
// //                   <tr>
// //                     <td colSpan={8} className="py-12 text-center">
// //                       <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
// //                       <p className="text-slate-500 font-medium">Fetching patient records...</p>
// //                     </td>
// //                   </tr>
// //                 ) : filteredData.length > 0 ? (
// //                   filteredData.map((child) => (
// //                     <tr key={child.id} className="hover:bg-blue-50/50 transition-colors bg-white">
// //                       <td className="py-4 px-6 font-semibold text-slate-700">{child.recordNo}</td>
// //                       <td className="py-4 px-6 text-slate-600">{child.samNumber}</td>
// //                       <td className="py-4 px-6 text-slate-600">{child.admissionDate}</td>
// //                       <td className="py-4 px-6 font-bold text-slate-900">{child.childName}</td>
                      
// //                       {/* ✅ SAAMAR vs Normal Visual Badge */}
// //                       <td className="py-4 px-6">
// //                         {child.isSamarRegistered ? (
// //                           <div className="flex flex-col">
// //                             <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-purple-100 text-purple-700 w-max border border-purple-200">
// //                               SAAMAR
// //                             </span>
// //                             <span className="text-[10px] text-slate-400 mt-1 font-mono tracking-tighter" title="SAAMAR UUID">
// //                               {child.samarUuid || "No UUID"}
// //                             </span>
// //                           </div>
// //                         ) : (
// //                           <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-slate-100 text-slate-500 w-max border border-slate-200">
// //                             Normal
// //                           </span>
// //                         )}
// //                       </td>

// //                       <td className="py-4 px-6 hidden sm:table-cell text-slate-600">{child.parentName}</td>
// //                       <td className="py-4 px-6 hidden lg:table-cell text-slate-600">{child.admissionWeight}</td>
// //                       <td className="py-4 px-6">
// //                         <div className="flex justify-center gap-2">
// //                           <Button onClick={() => handleDischarge(child.id)} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-4 py-2 h-auto rounded-lg shadow-none border border-emerald-200 hover:border-emerald-600 transition-all font-medium" title="Discharge Patient">
// //                             <FileText className="w-4 h-4 mr-2" />
// //                             Discharge
// //                           </Button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 ) : (
// //                   <tr>
// //                     <td colSpan={8} className="py-12 text-center bg-white">
// //                       <div className="flex flex-col items-center justify-center text-slate-400">
// //                         <div className="p-4 bg-slate-50 rounded-full mb-3">
// //                           <Search className="h-8 w-8 text-slate-300" />
// //                         </div>
// //                         <p className="font-bold text-slate-600 text-lg">No records found</p>
// //                         <p className="mt-1 text-sm">Adjust your filters or register a new child.</p>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
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
// import { Card, CardContent } from "@/components/ui/card";
// import { Search, Home, FileText, Loader2, Users, CheckCircle2 } from "lucide-react";
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
//   admissionDate: string;
//   isSamarRegistered: boolean; // ✅ Added SAAMAR boolean
//   samarUuid: string;          // ✅ Added SAAMAR UUID
// }

// interface RawPatientItem {
//   registration_id?: string | number;
//   id: string;
//   sam_no?: string;
//   samNumber?: string;
//   child_full_name?: string;
//   childName?: string;
//   guardian_name?: string;
//   parentName?: string;
//   dob?: string;
//   dateOfBirth?: string;
//   admission_weight_kg?: string | number;
//   admissionWeight?: string;
//   length_height_cm?: string | number;
//   admissionHeight?: string;
//   admission_date?: string;
//   createdAt?: string;
//   discharge_date?: string;
//   exit_indicator?: string | number;
//   is_samar_registered?: boolean;
//   isSamarRegistered?: boolean;
//   samar_uuid?: string;
//   samarUuid?: string;
// }

// export default function DischargeDirectoryPage() {
//   const router = useRouter();

//   const [isLoading, setIsLoading] = useState(true);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [recordNo, setRecordNo] = useState("");
//   const [samNumber, setSamNumber] = useState("");
//   const [childName, setChildName] = useState("");
  
//   // ✅ Added state for separating views
//   const [viewType, setViewType] = useState<"all" | "normal" | "samar">("all");

//   const [data, setData] = useState<Child[]>([]);
//   const [filteredData, setFilteredData] = useState<Child[]>([]);

//   // 1. Fetch data from PostgreSQL Backend (Filtered by MTC Center)
//   useEffect(() => {
//     const fetchPatients = async () => {
//       setIsLoading(true);
//       try {
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

//         const response = await fetch(`/api/child-registration${queryParams}`, { cache: 'no-store' });
//         if (!response.ok) throw new Error('Failed to fetch patients');
//         const dbData = await response.json() as RawPatientItem[];

//         // Filter out patients who have already been discharged
//         const activePatients = dbData.filter((row) => !row.discharge_date && !row.exit_indicator);

//         const mappedData: Child[] = activePatients.map((row) => ({
//           id: row.registration_id?.toString() || row.id,
//           recordNo: row.registration_id?.toString() || "N/A", 
//           samNumber: row.sam_no || row.samNumber || "",
//           childName: row.child_full_name || row.childName || "",
//           parentName: row.guardian_name || row.parentName || "",
//           dateOfBirth: row.dob || row.dateOfBirth || "",
//           admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight || "",
//           admissionHeight: row.length_height_cm?.toString() || row.admissionHeight || "",
//           createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
//           admissionDate: row.admission_date || "N/A",
//           // ✅ Map SAAMAR data from the database payload
//           isSamarRegistered: row.is_samar_registered === true || row.isSamarRegistered === true,
//           samarUuid: row.samar_uuid || row.samarUuid || "",
//         }));

//         setData(mappedData);
//         setFilteredData(mappedData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         toast.error("Failed to load patient records from database.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPatients();
//   }, []);

//   // 2. Filter logic (Client-side)
//   useEffect(() => {
//     let filtered = [...data];
    
//     // ✅ Apply the Normal vs SAAMAR filter separation
//     if (viewType === "normal") {
//       filtered = filtered.filter(child => !child.isSamarRegistered);
//     } else if (viewType === "samar") {
//       filtered = filtered.filter(child => child.isSamarRegistered);
//     }

//     if (recordNo) {
//       filtered = filtered.filter(child => child.recordNo.toLowerCase().includes(recordNo.toLowerCase()));
//     }
//     if (samNumber) {
//       filtered = filtered.filter(child => child.samNumber.toLowerCase().includes(samNumber.toLowerCase()));
//     }
//     if (childName) {
//       filtered = filtered.filter(child => child.childName.toLowerCase().includes(childName.toLowerCase()));
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
//     toast.success("Filters applied successfully!");
//   };

//   const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
//   const handleDischarge = (id: string) => router.push(`/mtc-user/dashboard/discharge/discharge-from/${id}`);

//   // Derived counts for the tabs
//   const countAll = data.length;
//   const countNormal = data.filter(d => !d.isSamarRegistered).length;
//   const countSamar = data.filter(d => d.isSamarRegistered).length;

//   return (
//     <div className="min-h-screen bg-slate-50 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6 font-sans">
//       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />

//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
//               <Users className="h-6 w-6" />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Patient Directory</h1>
//               <p className="text-sm text-slate-500 font-medium mt-1">Manage and discharge admitted children</p>
//             </div>
//           </div>
//           <Button onClick={handleBackToHome} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-700 transition-colors bg-white shadow-sm">
//             <Home className="mr-2 h-4 w-4" /> Back to Home
//           </Button>
//         </div>

//         {/* Filters Section */}
//         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
//           <CardContent className="p-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
//               <div>
//                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">From Date</label>
//                 <div className="relative">
//                   <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">To Date</label>
//                 <div className="relative">
//                   <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Record No</label>
//                 <Input placeholder="Search Record..." value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SAM Number</label>
//                 <Input placeholder="Search SAM..." value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Child Name</label>
//                 <div className="flex gap-2">
//                   <Input placeholder="Search Name..." value={childName} onChange={(e) => setChildName(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
//                   <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-3 shadow-sm">
//                     <Search className="w-4 h-4" />
//                   </Button>
//                 </div>
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

//         {/* Table Section */}
//         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
//           <div className="overflow-x-auto custom-scrollbar">
//             <table className="min-w-full text-sm text-slate-700 border-collapse">
//               <thead>
//                 <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
//                   <th className="py-4 px-6 text-left font-bold">Record No</th>
//                   <th className="py-4 px-6 text-left font-bold">SAM Number</th>
//                   <th className="py-4 px-6 text-left font-bold">Date of Admission</th>
//                   <th className="py-4 px-6 text-left font-bold">Child Name</th>
//                   {/* ✅ Added Type Header */}
//                   <th className="py-4 px-6 text-left font-bold">Registration Type</th> 
//                   <th className="py-4 px-6 text-left font-bold hidden sm:table-cell">Parent Name</th>
//                   <th className="py-4 px-6 text-left font-bold hidden lg:table-cell">Weight (kg)</th>
//                   <th className="py-4 px-6 text-center font-bold">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan={8} className="py-12 text-center">
//                       <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
//                       <p className="text-slate-500 font-medium">Fetching patient records...</p>
//                     </td>
//                   </tr>
//                 ) : filteredData.length > 0 ? (
//                   filteredData.map((child) => (
//                     <tr key={child.id} className="hover:bg-blue-50/50 transition-colors bg-white">
//                       <td className="py-4 px-6 font-semibold text-slate-700">{child.recordNo}</td>
//                       <td className="py-4 px-6 text-slate-600">{child.samNumber}</td>
//                       <td className="py-4 px-6 text-slate-600">{child.admissionDate}</td>
//                       <td className="py-4 px-6 font-bold text-slate-900">{child.childName}</td>
                      
//                       {/* ✅ SAAMAR vs Normal Visual Badge */}
//                       <td className="py-4 px-6">
//                         {child.isSamarRegistered ? (
//                           <div className="flex flex-col">
//                             <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-purple-100 text-purple-700 w-max border border-purple-200">
//                               SAAMAR
//                             </span>
//                             <span className="text-[10px] text-slate-400 mt-1 font-mono tracking-tighter" title="SAAMAR UUID">
//                               {child.samarUuid || "No UUID"}
//                             </span>
//                           </div>
//                         ) : (
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-slate-100 text-slate-500 w-max border border-slate-200">
//                             Normal
//                           </span>
//                         )}
//                       </td>

//                       <td className="py-4 px-6 hidden sm:table-cell text-slate-600">{child.parentName}</td>
//                       <td className="py-4 px-6 hidden lg:table-cell text-slate-600">{child.admissionWeight}</td>
//                       <td className="py-4 px-6">
//                         <div className="flex justify-center gap-2">
//                           <Button onClick={() => handleDischarge(child.id)} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-4 py-2 h-auto rounded-lg shadow-none border border-emerald-200 hover:border-emerald-600 transition-all font-medium" title="Discharge Patient">
//                             <FileText className="w-4 h-4 mr-2" />
//                             Discharge
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={8} className="py-12 text-center bg-white">
//                       <div className="flex flex-col items-center justify-center text-slate-400">
//                         <div className="p-4 bg-slate-50 rounded-full mb-3">
//                           <Search className="h-8 w-8 text-slate-300" />
//                         </div>
//                         <p className="font-bold text-slate-600 text-lg">No records found</p>
//                         <p className="mt-1 text-sm">Adjust your filters or register a new child.</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
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
import { Card, CardContent } from "@/components/ui/card";
import { Search, Home, FileText, Loader2, Users, CheckCircle2, Building2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface Child {
  id: string;
  recordNo: string;
  samNumber: string;
  childName: string;
  parentName: string;
  mtc: string;
  dateOfBirth: string;
  admissionWeight: string;
  admissionHeight: string;
  createdAt: string;
  admissionDate: string;
  isSamarRegistered: boolean;
  samarUuid: string;
}

interface RawPatientItem {
  registration_id?: string | number;
  id: string;
  sam_no?: string;
  samNumber?: string;
  child_full_name?: string;
  childName?: string;
  guardian_name?: string;
  parentName?: string;
  mtc_name?: string;
  mtc?: string;
  dob?: string;
  dateOfBirth?: string;
  admission_weight_kg?: string | number;
  admissionWeight?: string;
  length_height_cm?: string | number;
  admissionHeight?: string;
  admission_date?: string;
  createdAt?: string;
  discharge_date?: string;
  exit_indicator?: string | number;
  is_samar_registered?: boolean;
  isSamarRegistered?: boolean;
  samar_uuid?: string;
  samarUuid?: string;
}

export default function DischargeDirectoryPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [recordNo, setRecordNo] = useState("");
  const [samNumber, setSamNumber] = useState("");
  const [childName, setChildName] = useState("");
  
  const [viewType, setViewType] = useState<"all" | "normal" | "samar">("all");

  const [data, setData] = useState<Child[]>([]);
  const [filteredData, setFilteredData] = useState<Child[]>([]);

  // 1. Auto-save Bundu login session & fetch data
  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true);
      try {
        let sessionData = sessionStorage.getItem("mtc_user");
        let activeMtcName = "Bundu";
        let queryParams = "";

        if (!sessionData) {
          // ✅ AUTO-SAVE: Automatically save 'Bundu' into session if not logged in
          const defaultSession = { mtcId: "bundu", mtcName: "Bundu" };
          sessionStorage.setItem("mtc_user", JSON.stringify(defaultSession));
          queryParams = `?mtcId=bundu`;
        } else {
          try {
            const user = JSON.parse(sessionData) as { mtcId?: string | number; mtcName?: string };
            if (user.mtcId) {
              queryParams = `?mtcId=${user.mtcId}`;
            }
            if (user.mtcName) {
              activeMtcName = user.mtcName;
            }
          } catch {
            console.error("Session parse error");
          }
        }

        const response = await fetch(`/api/child-registration${queryParams}`, { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to fetch patients');
        const dbData = await response.json() as RawPatientItem[];

        // Filter out discharged patients
        const activePatients = dbData.filter((row) => !row.discharge_date && !row.exit_indicator);

        const mappedData: Child[] = activePatients.map((row) => ({
          id: row.registration_id?.toString() || row.id,
          recordNo: row.registration_id?.toString() || "N/A", 
          samNumber: row.sam_no || row.samNumber || "",
          childName: row.child_full_name || row.childName || "",
          parentName: row.guardian_name || row.parentName || "",
          mtc: row.mtc_name || row.mtc || activeMtcName, // ✅ Auto-assign "Bundu"
          dateOfBirth: row.dob || row.dateOfBirth || "",
          admissionWeight: row.admission_weight_kg?.toString() || row.admissionWeight || "",
          admissionHeight: row.length_height_cm?.toString() || row.admissionHeight || "",
          createdAt: row.admission_date || row.createdAt || new Date().toISOString(),
          admissionDate: row.admission_date || "N/A",
          isSamarRegistered: row.is_samar_registered === true || row.isSamarRegistered === true,
          samarUuid: row.samar_uuid || row.samarUuid || "",
        }));

        setData(mappedData);
        setFilteredData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load patient records from database.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // 2. Client-side filtering
  useEffect(() => {
    let filtered = [...data];
    
    if (viewType === "normal") {
      filtered = filtered.filter(child => !child.isSamarRegistered);
    } else if (viewType === "samar") {
      filtered = filtered.filter(child => child.isSamarRegistered);
    }

    if (recordNo) {
      filtered = filtered.filter(child => child.recordNo.toLowerCase().includes(recordNo.toLowerCase()));
    }
    if (samNumber) {
      filtered = filtered.filter(child => child.samNumber.toLowerCase().includes(samNumber.toLowerCase()));
    }
    if (childName) {
      filtered = filtered.filter(child => child.childName.toLowerCase().includes(childName.toLowerCase()));
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

  const handleSearch = () => toast.success("Filters applied successfully!");
  const handleBackToHome = () => router.push("/mtc-user/dashboard/home");
  const handleDischarge = (id: string) => router.push(`/mtc-user/dashboard/discharge/discharge-from/${id}`);

  const countAll = data.length;
  const countNormal = data.filter(d => !d.isSamarRegistered).length;
  const countSamar = data.filter(d => d.isSamarRegistered).length;

  return (
    <div className="min-h-screen bg-slate-50 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6 font-sans">
      <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Patient Directory</h1>
              <p className="text-sm text-slate-500 font-medium mt-1">Manage and discharge admitted children</p>
            </div>
          </div>
          <Button onClick={handleBackToHome} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-700 transition-colors bg-white shadow-sm">
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>

        {/* Filter Section */}
        <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">From Date</label>
                <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">To Date</label>
                <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Record No</label>
                <Input placeholder="Search Record..." value={recordNo} onChange={(e) => setRecordNo(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SAM Number</label>
                <Input placeholder="Search SAM..." value={samNumber} onChange={(e) => setSamNumber(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Child Name</label>
                <div className="flex gap-2">
                  <Input placeholder="Search Name..." value={childName} onChange={(e) => setChildName(e.target.value)} className="bg-slate-50 focus-visible:ring-blue-500" />
                  <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-3 shadow-sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Tabs */}
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

        {/* Directory Table */}
        <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-full text-sm text-slate-700 border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
                  <th className="py-4 px-6 text-left font-bold">Record No</th>
                  <th className="py-4 px-6 text-left font-bold">SAM Number</th>
                  <th className="py-4 px-6 text-left font-bold">MTC</th>
                  <th className="py-4 px-6 text-left font-bold">Date of Admission</th>
                  <th className="py-4 px-6 text-left font-bold">Child Name</th>
                  <th className="py-4 px-6 text-left font-bold">Registration Type</th> 
                  <th className="py-4 px-6 text-left font-bold hidden sm:table-cell">Parent Name</th>
                  <th className="py-4 px-6 text-left font-bold hidden lg:table-cell">Weight (kg)</th>
                  <th className="py-4 px-6 text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">Fetching patient records...</p>
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((child) => (
                    <tr key={child.id} className="hover:bg-blue-50/50 transition-colors bg-white">
                      <td className="py-4 px-6 font-semibold text-slate-700">{child.recordNo}</td>
                      <td className="py-4 px-6 text-slate-600">{child.samNumber}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          <Building2 className="w-3.5 h-3.5" />
                          {child.mtc}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-600">{child.admissionDate}</td>
                      <td className="py-4 px-6 font-bold text-slate-900">{child.childName}</td>
                      <td className="py-4 px-6">
                        {child.isSamarRegistered ? (
                          <div className="flex flex-col">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-purple-100 text-purple-700 w-max border border-purple-200">
                              SAAMAR
                            </span>
                            <span className="text-[10px] text-slate-400 mt-1 font-mono tracking-tighter" title="SAAMAR UUID">
                              {child.samarUuid || "No UUID"}
                            </span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-slate-100 text-slate-500 w-max border border-slate-200">
                            Normal
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 hidden sm:table-cell text-slate-600">{child.parentName}</td>
                      <td className="py-4 px-6 hidden lg:table-cell text-slate-600">{child.admissionWeight}</td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center gap-2">
                          <Button onClick={() => handleDischarge(child.id)} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-4 py-2 h-auto rounded-lg shadow-none border border-emerald-200 hover:border-emerald-600 transition-all font-medium" title="Discharge Patient">
                            <FileText className="w-4 h-4 mr-2" />
                            Discharge
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-12 text-center bg-white">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <div className="p-4 bg-slate-50 rounded-full mb-3">
                          <Search className="h-8 w-8 text-slate-300" />
                        </div>
                        <p className="font-bold text-slate-600 text-lg">No records found</p>
                        <p className="mt-1 text-sm">Adjust your filters or register a new child.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}