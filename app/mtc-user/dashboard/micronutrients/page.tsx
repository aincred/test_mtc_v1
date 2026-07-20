// // // // // "use client";

// // // // // import { useState, useEffect } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // import { Home, Search, Edit, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
// // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // Type definitions
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

// // // // // interface SearchFilters {
// // // // //   fromDate: string;
// // // // //   toDate: string;
// // // // //   childName: string;
// // // // //   samNumber: string;
// // // // //   recordId: string;
// // // // // }

// // // // // export default function AntibioticsMicronutrientsPage() {
// // // // //   const router = useRouter();
// // // // //   const [children, setChildren] = useState<Child[]>([]);
// // // // //   const [filteredChildren, setFilteredChildren] = useState<Child[]>([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [searching, setSearching] = useState(false);
// // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // //   const [itemsPerPage, setItemsPerPage] = useState(10);
  
// // // // //   const [filters, setFilters] = useState<SearchFilters>({
// // // // //     fromDate: "",
// // // // //     toDate: "",
// // // // //     childName: "",
// // // // //     samNumber: "",
// // // // //     recordId: ""
// // // // //   });

// // // // //   // Load children data from localStorage
// // // // //   useEffect(() => {
// // // // //     const loadChildren = () => {
// // // // //       try {
// // // // //         const storedChildren = localStorage.getItem('registeredChildren');
// // // // //         if (storedChildren) {
// // // // //           const parsedChildren: Child[] = JSON.parse(storedChildren);
// // // // //           setChildren(parsedChildren);
// // // // //           setFilteredChildren(parsedChildren);
// // // // //         }
// // // // //       } catch (error) {
// // // // //         console.error("Error loading children data:", error);
// // // // //         toast.error("Failed to load children data");
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     loadChildren();
// // // // //   }, []);

// // // // //   // Handle filter changes
// // // // //   const handleFilterChange = (field: keyof SearchFilters, value: string) => {
// // // // //     setFilters(prev => ({
// // // // //       ...prev,
// // // // //       [field]: value
// // // // //     }));
// // // // //   };

// // // // //   // Apply filters
// // // // //   const applyFilters = () => {
// // // // //     setSearching(true);
    
// // // // //     setTimeout(() => {
// // // // //       let filtered = [...children];
      
// // // // //       if (filters.childName) {
// // // // //         filtered = filtered.filter(child => 
// // // // //           child.childName.toLowerCase().includes(filters.childName.toLowerCase())
// // // // //         );
// // // // //       }
      
// // // // //       if (filters.samNumber) {
// // // // //         filtered = filtered.filter(child => 
// // // // //           child.samNumber.toLowerCase().includes(filters.samNumber.toLowerCase())
// // // // //         );
// // // // //       }
      
// // // // //       if (filters.recordId) {
// // // // //         filtered = filtered.filter(child => 
// // // // //           child.recordNo.includes(filters.recordId)
// // // // //         );
// // // // //       }
      
// // // // //       // Date filters would need more complex logic with date parsing
// // // // //       // For simplicity, we're not implementing them in this example
      
// // // // //       setFilteredChildren(filtered);
// // // // //       setCurrentPage(1); // Reset to first page after filtering
// // // // //       setSearching(false);
// // // // //       toast.success(`Found ${filtered.length} matching records`);
// // // // //     }, 500);
// // // // //   };

// // // // //   // Reset filters
// // // // //   const resetFilters = () => {
// // // // //     setFilters({
// // // // //       fromDate: "",
// // // // //       toDate: "",
// // // // //       childName: "",
// // // // //       samNumber: "",
// // // // //       recordId: ""
// // // // //     });
// // // // //     setFilteredChildren(children);
// // // // //     setCurrentPage(1);
// // // // //   };

// // // // //   // Navigate to edit page
// // // // //   const handleEdit = (childId: string) => {
// // // // //     router.push(`/mtc-user/dashboard/micronutrients/edit-micronutrients/${childId}`);
// // // // //   };

// // // // //   // Pagination
// // // // //   const indexOfLastItem = currentPage * itemsPerPage;
// // // // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // // // //   const currentItems = filteredChildren.slice(indexOfFirstItem, indexOfLastItem);
// // // // //   const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);

// // // // //   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gray-100 flex justify-center items-center">
// // // // //         <div className="text-center">
// // // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
// // // // //           <p className="mt-4 text-gray-600">Loading...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // // // //       <Toaster position="top-right" />

// // // // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // // // //         {/* Header */}
// // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // // // //             Antibiotics and Micronutrients Entry
// // // // //           </h1>
// // // // //           <Button
// // // // //             onClick={() => router.push("/mtc-user/dashboard/home")}
// // // // //             variant="outline"
// // // // //             className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// // // // //           >
// // // // //             <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // // // //             <span className="hidden sm:inline">Back to Home</span>
// // // // //             <span className="sm:hidden">Home</span>
// // // // //           </Button>
// // // // //         </div>

// // // // //         {/* Search Filters */}
// // // // //         <Card className="shadow-sm border border-gray-200">
// // // // //           <CardHeader className="pb-2 sm:pb-4">
// // // // //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// // // // //               Search Filters
// // // // //             </h2>
// // // // //           </CardHeader>
// // // // //           <CardContent>
// // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
// // // // //               <div>
// // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // //                   From Date
// // // // //                 </label>
// // // // //                 <div className="relative">
// // // // //                   <Input
// // // // //                     type="date"
// // // // //                     value={filters.fromDate}
// // // // //                     onChange={(e) => handleFilterChange("fromDate", e.target.value)}
// // // // //                     className="text-xs sm:text-sm pr-8"
// // // // //                   />
// // // // //                   <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
// // // // //                     <Calendar className="h-4 w-4 text-gray-400" />
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // //                   To Date
// // // // //                 </label>
// // // // //                 <div className="relative">
// // // // //                   <Input
// // // // //                     type="date"
// // // // //                     value={filters.toDate}
// // // // //                     onChange={(e) => handleFilterChange("toDate", e.target.value)}
// // // // //                     className="text-xs sm:text-sm pr-8"
// // // // //                   />
// // // // //                   <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
// // // // //                     <Calendar className="h-4 w-4 text-gray-400" />
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // //                   Child Name
// // // // //                 </label>
// // // // //                 <Input
// // // // //                   value={filters.childName}
// // // // //                   onChange={(e) => handleFilterChange("childName", e.target.value)}
// // // // //                   placeholder="Enter child name"
// // // // //                   className="text-xs sm:text-sm"
// // // // //                 />
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // //                   SAM Number
// // // // //                 </label>
// // // // //                 <Input
// // // // //                   value={filters.samNumber}
// // // // //                   onChange={(e) => handleFilterChange("samNumber", e.target.value)}
// // // // //                   placeholder="Enter SAM number"
// // // // //                   className="text-xs sm:text-sm"
// // // // //                 />
// // // // //               </div>

// // // // //               <div>
// // // // //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// // // // //                   Record ID
// // // // //                 </label>
// // // // //                 <Input
// // // // //                   value={filters.recordId}
// // // // //                   onChange={(e) => handleFilterChange("recordId", e.target.value)}
// // // // //                   placeholder="Enter record ID"
// // // // //                   className="text-xs sm:text-sm"
// // // // //                 />
// // // // //               </div>

// // // // //               <div className="flex items-end gap-2">
// // // // //                 <Button
// // // // //                   onClick={applyFilters}
// // // // //                   disabled={searching}
// // // // //                   className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm"
// // // // //                 >
// // // // //                   {searching ? (
// // // // //                     <>
// // // // //                       <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
// // // // //                       Searching...
// // // // //                     </>
// // // // //                   ) : (
// // // // //                     <>
// // // // //                       <Search className="mr-1 h-3 w-3" />
// // // // //                       Search
// // // // //                     </>
// // // // //                   )}
// // // // //                 </Button>
// // // // //                 <Button
// // // // //                   onClick={resetFilters}
// // // // //                   variant="outline"
// // // // //                   className="border-gray-600 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm"
// // // // //                 >
// // // // //                   Reset
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </CardContent>
// // // // //         </Card>

// // // // //         {/* Results Table */}
// // // // //         <Card className="shadow-sm border border-gray-200">
// // // // //           <CardHeader className="pb-2 sm:pb-4">
// // // // //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// // // // //               Select a child to update Antibiotics and Micronutrients details
// // // // //             </h2>
// // // // //           </CardHeader>
// // // // //           <CardContent>
// // // // //             {filteredChildren.length === 0 ? (
// // // // //               <div className="text-center py-8">
// // // // //                 <p className="text-gray-500">No children found matching your criteria.</p>
// // // // //                 <Button
// // // // //                   onClick={resetFilters}
// // // // //                   variant="outline"
// // // // //                   className="mt-4 border-gray-600 text-gray-700 hover:bg-gray-100"
// // // // //                 >
// // // // //                   Reset Filters
// // // // //                 </Button>
// // // // //               </div>
// // // // //             ) : (
// // // // //               <>
// // // // //                 <div className="overflow-x-auto rounded-lg">
// // // // //                   <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // // // //                     <thead>
// // // // //                       <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // // // //                         <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Record No</th>
// // // // //                         <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">SAM Number</th>
// // // // //                         <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Child Name</th>
// // // // //                         <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Parent Name</th>
// // // // //                         <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Date Of Birth</th>
// // // // //                         <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Admission Weight(kg)</th>
// // // // //                         <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold">Admission Height(cm)</th>
// // // // //                         <th className="py-2 sm:py-3 px-2 sm:px-4 text-center font-semibold">Actions</th>
// // // // //                       </tr>
// // // // //                     </thead>
// // // // //                     <tbody>
// // // // //                       {currentItems.map((child, index) => (
// // // // //                         <tr
// // // // //                           key={child.id}
// // // // //                           className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition`}
// // // // //                         >
// // // // //                           <td className="py-2 sm:py-3 px-2 sm:px-4">{child.recordNo}</td>
// // // // //                           <td className="py-2 sm:py-3 px-2 sm:px-4">{child.samNumber}</td>
// // // // //                           <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{child.childName}</td>
// // // // //                           <td className="py-2 sm:py-3 px-2 sm:px-4">{child.parentName}</td>
// // // // //                           <td className="py-2 sm:py-3 px-2 sm:px-4">{child.dateOfBirth}</td>
// // // // //                           <td className="py-2 sm:py-3 px-2 sm:px-4">{child.admissionWeight}</td>
// // // // //                           <td className="py-2 sm:py-3 px-2 sm:px-4">{child.admissionHeight}</td>
// // // // //                           <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
// // // // //                             <Button
// // // // //                               onClick={() => handleEdit(child.id)}
// // // // //                               className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
// // // // //                             >
// // // // //                               <Edit className="h-3 w-3" />
// // // // //                             </Button>
// // // // //                           </td>
// // // // //                         </tr>
// // // // //                       ))}
// // // // //                     </tbody>
// // // // //                   </table>
// // // // //                 </div>

// // // // //                 {/* Pagination */}
// // // // //                 <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
// // // // //                   <div className="text-xs sm:text-sm text-gray-700">
// // // // //                     Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredChildren.length)} of {filteredChildren.length} entries
// // // // //                   </div>
// // // // //                   <div className="flex items-center gap-2">
// // // // //                     <div className="flex items-center gap-2 mr-4">
// // // // //                       <span className="text-xs sm:text-sm text-gray-700">Show</span>
// // // // //                       <select
// // // // //                         value={itemsPerPage}
// // // // //                         onChange={(e) => {
// // // // //                           setItemsPerPage(Number(e.target.value));
// // // // //                           setCurrentPage(1);
// // // // //                         }}
// // // // //                         className="text-xs sm:text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // // // //                       >
// // // // //                         <option value={10}>10</option>
// // // // //                         <option value={25}>25</option>
// // // // //                         <option value={50}>50</option>
// // // // //                         <option value={100}>100</option>
// // // // //                       </select>
// // // // //                       <span className="text-xs sm:text-sm text-gray-700">entries</span>
// // // // //                     </div>
// // // // //                     <div className="flex">
// // // // //                       <Button
// // // // //                         onClick={() => paginate(currentPage - 1)}
// // // // //                         disabled={currentPage === 1}
// // // // //                         variant="outline"
// // // // //                         className="border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm p-1 sm:p-2"
// // // // //                       >
// // // // //                         <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
// // // // //                       </Button>
// // // // //                       {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
// // // // //                         let pageNum;
// // // // //                         if (totalPages <= 5) {
// // // // //                           pageNum = i + 1;
// // // // //                         } else if (currentPage <= 3) {
// // // // //                           pageNum = i + 1;
// // // // //                         } else if (currentPage >= totalPages - 2) {
// // // // //                           pageNum = totalPages - 4 + i;
// // // // //                         } else {
// // // // //                           pageNum = currentPage - 2 + i;
// // // // //                         }
                        
// // // // //                         return (
// // // // //                           <Button
// // // // //                             key={pageNum}
// // // // //                             onClick={() => paginate(pageNum)}
// // // // //                             variant={currentPage === pageNum ? "default" : "outline"}
// // // // //                             className={`mx-1 text-xs sm:text-sm p-1 sm:p-2 ${
// // // // //                               currentPage === pageNum
// // // // //                                 ? "bg-indigo-600 text-white"
// // // // //                                 : "border-gray-300 text-gray-700 hover:bg-gray-100"
// // // // //                             }`}
// // // // //                           >
// // // // //                             {pageNum}
// // // // //                           </Button>
// // // // //                         );
// // // // //                       })}
// // // // //                       <Button
// // // // //                         onClick={() => paginate(currentPage + 1)}
// // // // //                         disabled={currentPage === totalPages}
// // // // //                         variant="outline"
// // // // //                         className="border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm p-1 sm:p-2"
// // // // //                       >
// // // // //                         <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
// // // // //                       </Button>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </>
// // // // //             )}
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
// // // // import { Home, Search, Edit, Calendar, ChevronLeft, ChevronRight, Activity, RotateCcw } from "lucide-react";
// // // // import toast, { Toaster } from "react-hot-toast";

// // // // // Type definitions
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

// // // // interface SearchFilters {
// // // //   fromDate: string;
// // // //   toDate: string;
// // // //   childName: string;
// // // //   samNumber: string;
// // // //   recordId: string;
// // // // }

// // // // export default function AntibioticsMicronutrientsPage() {
// // // //   const router = useRouter();
// // // //   const [children, setChildren] = useState<Child[]>([]);
// // // //   const [filteredChildren, setFilteredChildren] = useState<Child[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [searching, setSearching] = useState(false);
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [itemsPerPage, setItemsPerPage] = useState(10);
  
// // // //   const [filters, setFilters] = useState<SearchFilters>({
// // // //     fromDate: "",
// // // //     toDate: "",
// // // //     childName: "",
// // // //     samNumber: "",
// // // //     recordId: ""
// // // //   });

// // // //   // Load children data from localStorage
// // // //   useEffect(() => {
// // // //     const loadChildren = () => {
// // // //       try {
// // // //         const storedChildren = localStorage.getItem('registeredChildren');
// // // //         if (storedChildren) {
// // // //           const parsedChildren: Child[] = JSON.parse(storedChildren);
// // // //           setChildren(parsedChildren);
// // // //           setFilteredChildren(parsedChildren);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Error loading children data:", error);
// // // //         toast.error("Failed to load children data");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     loadChildren();
// // // //   }, []);

// // // //   // Handle filter changes
// // // //   const handleFilterChange = (field: keyof SearchFilters, value: string) => {
// // // //     setFilters(prev => ({
// // // //       ...prev,
// // // //       [field]: value
// // // //     }));
// // // //   };

// // // //   // Apply filters
// // // //   const applyFilters = () => {
// // // //     setSearching(true);
    
// // // //     setTimeout(() => {
// // // //       let filtered = [...children];
      
// // // //       if (filters.childName) {
// // // //         filtered = filtered.filter(child => 
// // // //           child.childName.toLowerCase().includes(filters.childName.toLowerCase())
// // // //         );
// // // //       }
      
// // // //       if (filters.samNumber) {
// // // //         filtered = filtered.filter(child => 
// // // //           child.samNumber.toLowerCase().includes(filters.samNumber.toLowerCase())
// // // //         );
// // // //       }
      
// // // //       if (filters.recordId) {
// // // //         filtered = filtered.filter(child => 
// // // //           child.recordNo.includes(filters.recordId)
// // // //         );
// // // //       }
      
// // // //       setFilteredChildren(filtered);
// // // //       setCurrentPage(1); // Reset to first page after filtering
// // // //       setSearching(false);
// // // //       toast.success(`Found ${filtered.length} matching records`, {
// // // //         iconTheme: { primary: '#2563eb', secondary: '#fff' }
// // // //       });
// // // //     }, 500);
// // // //   };

// // // //   // Reset filters
// // // //   const resetFilters = () => {
// // // //     setFilters({
// // // //       fromDate: "",
// // // //       toDate: "",
// // // //       childName: "",
// // // //       samNumber: "",
// // // //       recordId: ""
// // // //     });
// // // //     setFilteredChildren(children);
// // // //     setCurrentPage(1);
// // // //   };

// // // //   // Navigate to edit page
// // // //   const handleEdit = (childId: string) => {
// // // //     router.push(`/mtc-user/dashboard/micronutrients/edit-micronutrients/${childId}`);
// // // //   };

// // // //   // Pagination
// // // //   const indexOfLastItem = currentPage * itemsPerPage;
// // // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // // //   const currentItems = filteredChildren.slice(indexOfFirstItem, indexOfLastItem);
// // // //   const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);

// // // //   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
// // // //           <p className="mt-4 text-slate-500 font-medium tracking-wide">Loading records...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-slate-50 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 md:px-8 font-sans text-slate-900">
// // // //       <Toaster position="top-right" />

// // // //       <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
// // // //         {/* Header */}
// // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // //           <div className="flex items-center gap-3">
// // // //             <div className="bg-blue-100 p-2.5 rounded-xl border border-blue-200 shadow-sm">
// // // //               <Activity className="h-6 w-6 text-blue-700" />
// // // //             </div>
// // // //             <div>
// // // //               <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
// // // //                 Antibiotics & Micronutrients
// // // //               </h1>
// // // //               <p className="text-sm text-slate-500 font-medium mt-1">Manage and update patient treatment records</p>
// // // //             </div>
// // // //           </div>
// // // //           <Button
// // // //             onClick={() => router.push("/mtc-user/dashboard/home")}
// // // //             variant="outline"
// // // //             className="border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm"
// // // //           >
// // // //             <Home className="mr-2 h-4 w-4" /> 
// // // //             Back to Home
// // // //           </Button>
// // // //         </div>

// // // //         {/* Search Filters */}
// // // //         <Card className="shadow-sm border border-slate-200 rounded-xl overflow-hidden bg-white">
// // // //           <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5 px-6">
// // // //             <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
// // // //               <Search className="h-4 w-4 text-blue-500" /> 
// // // //               Search Filters
// // // //             </h2>
// // // //           </CardHeader>
// // // //           <CardContent className="p-6">
// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
// // // //               <div className="space-y-1.5">
// // // //                 <label className="block text-sm font-semibold text-slate-700">From Date</label>
// // // //                 <div className="relative">
// // // //                   <Input
// // // //                     type="date"
// // // //                     value={filters.fromDate}
// // // //                     onChange={(e) => handleFilterChange("fromDate", e.target.value)}
// // // //                     className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm pr-10"
// // // //                   />
// // // //                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
// // // //                     <Calendar className="h-4 w-4 text-slate-400" />
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="space-y-1.5">
// // // //                 <label className="block text-sm font-semibold text-slate-700">To Date</label>
// // // //                 <div className="relative">
// // // //                   <Input
// // // //                     type="date"
// // // //                     value={filters.toDate}
// // // //                     onChange={(e) => handleFilterChange("toDate", e.target.value)}
// // // //                     className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm pr-10"
// // // //                   />
// // // //                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
// // // //                     <Calendar className="h-4 w-4 text-slate-400" />
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="space-y-1.5">
// // // //                 <label className="block text-sm font-semibold text-slate-700">Child Name</label>
// // // //                 <Input
// // // //                   value={filters.childName}
// // // //                   onChange={(e) => handleFilterChange("childName", e.target.value)}
// // // //                   placeholder="e.g. Rahul Kumar"
// // // //                   className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm"
// // // //                 />
// // // //               </div>

// // // //               <div className="space-y-1.5">
// // // //                 <label className="block text-sm font-semibold text-slate-700">SAM Number</label>
// // // //                 <Input
// // // //                   value={filters.samNumber}
// // // //                   onChange={(e) => handleFilterChange("samNumber", e.target.value)}
// // // //                   placeholder="SAM-001"
// // // //                   className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm"
// // // //                 />
// // // //               </div>

// // // //               <div className="space-y-1.5">
// // // //                 <label className="block text-sm font-semibold text-slate-700">Record ID</label>
// // // //                 <Input
// // // //                   value={filters.recordId}
// // // //                   onChange={(e) => handleFilterChange("recordId", e.target.value)}
// // // //                   placeholder="REC-001"
// // // //                   className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm"
// // // //                 />
// // // //               </div>

// // // //               <div className="flex items-end gap-3 pt-2 xl:pt-0">
// // // //                 <Button
// // // //                   onClick={applyFilters}
// // // //                   disabled={searching}
// // // //                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
// // // //                 >
// // // //                   {searching ? (
// // // //                     <>
// // // //                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// // // //                       Searching...
// // // //                     </>
// // // //                   ) : (
// // // //                     <>
// // // //                       <Search className="mr-2 h-4 w-4" />
// // // //                       Search
// // // //                     </>
// // // //                   )}
// // // //                 </Button>
// // // //                 <Button
// // // //                   onClick={resetFilters}
// // // //                   variant="outline"
// // // //                   size="icon"
// // // //                   className="border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all shrink-0"
// // // //                   title="Reset Filters"
// // // //                 >
// // // //                   <RotateCcw className="h-4 w-4" />
// // // //                 </Button>
// // // //               </div>
// // // //             </div>
// // // //           </CardContent>
// // // //         </Card>

// // // //         {/* Results Section */}
// // // //         <div className="space-y-4">
// // // //           <div className="flex items-center justify-between">
// // // //             <h2 className="text-lg font-bold text-slate-800">
// // // //               Patient Roster
// // // //             </h2>
// // // //             <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
// // // //               {filteredChildren.length} Records Found
// // // //             </div>
// // // //           </div>

// // // //           <Card className="shadow-sm border border-slate-200 rounded-xl overflow-hidden bg-white">
// // // //             {filteredChildren.length === 0 ? (
// // // //               <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
// // // //                 <div className="bg-slate-50 p-4 rounded-full mb-4 border border-slate-100">
// // // //                   <Search className="h-8 w-8 text-slate-300" />
// // // //                 </div>
// // // //                 <h3 className="text-lg font-bold text-slate-800">No patients found</h3>
// // // //                 <p className="text-slate-500 mt-1 max-w-md mx-auto text-sm">We couldn't find any children matching your current search criteria. Try adjusting your filters or clearing them to see all records.</p>
// // // //                 <Button
// // // //                   onClick={resetFilters}
// // // //                   variant="outline"
// // // //                   className="mt-6 border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200"
// // // //                 >
// // // //                   Clear All Filters
// // // //                 </Button>
// // // //               </div>
// // // //             ) : (
// // // //               <>
// // // //                 <div className="overflow-x-auto">
// // // //                   <table className="min-w-full text-sm text-slate-700 border-collapse">
// // // //                     <thead>
// // // //                       <tr className="bg-slate-50 border-b border-slate-200 uppercase tracking-wider text-xs font-bold text-slate-500">
// // // //                         <th className="py-4 px-5 text-left">Record No</th>
// // // //                         <th className="py-4 px-5 text-left">SAM Number</th>
// // // //                         <th className="py-4 px-5 text-left">Child Name</th>
// // // //                         <th className="py-4 px-5 text-left hidden md:table-cell">Parent Name</th>
// // // //                         <th className="py-4 px-5 text-left hidden lg:table-cell">DOB</th>
// // // //                         <th className="py-4 px-5 text-left hidden sm:table-cell">Adm. Wt (kg)</th>
// // // //                         <th className="py-4 px-5 text-center">Action</th>
// // // //                       </tr>
// // // //                     </thead>
// // // //                     <tbody className="divide-y divide-slate-100">
// // // //                       {currentItems.map((child) => (
// // // //                         <tr
// // // //                           key={child.id}
// // // //                           className="bg-white hover:bg-blue-50/50 transition-colors group"
// // // //                         >
// // // //                           <td className="py-4 px-5 font-medium text-slate-900">{child.recordNo}</td>
// // // //                           <td className="py-4 px-5">
// // // //                             <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
// // // //                               {child.samNumber}
// // // //                             </span>
// // // //                           </td>
// // // //                           <td className="py-4 px-5 font-bold text-slate-800">{child.childName}</td>
// // // //                           <td className="py-4 px-5 text-slate-500 hidden md:table-cell">{child.parentName}</td>
// // // //                           <td className="py-4 px-5 text-slate-500 hidden lg:table-cell">{child.dateOfBirth}</td>
// // // //                           <td className="py-4 px-5 text-slate-500 hidden sm:table-cell">{child.admissionWeight}</td>
// // // //                           <td className="py-4 px-5 text-center">
// // // //                             <Button
// // // //                               onClick={() => handleEdit(child.id)}
// // // //                               size="sm"
// // // //                               className="bg-slate-900 hover:bg-blue-600 text-white shadow-sm transition-all"
// // // //                             >
// // // //                               <Edit className="h-4 w-4 mr-2" /> Update
// // // //                             </Button>
// // // //                           </td>
// // // //                         </tr>
// // // //                       ))}
// // // //                     </tbody>
// // // //                   </table>
// // // //                 </div>

// // // //                 {/* Pagination */}
// // // //                 <div className="bg-slate-50 border-t border-slate-200 p-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
// // // //                   <div className="text-sm text-slate-500 font-medium">
// // // //                     Showing <span className="text-slate-900 font-bold">{indexOfFirstItem + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(indexOfLastItem, filteredChildren.length)}</span> of <span className="text-blue-600 font-bold">{filteredChildren.length}</span> entries
// // // //                   </div>
                  
// // // //                   <div className="flex items-center gap-4">
// // // //                     <div className="flex items-center gap-2 hidden sm:flex">
// // // //                       <span className="text-sm text-slate-500">Show</span>
// // // //                       <select
// // // //                         value={itemsPerPage}
// // // //                         onChange={(e) => {
// // // //                           setItemsPerPage(Number(e.target.value));
// // // //                           setCurrentPage(1);
// // // //                         }}
// // // //                         className="text-sm border border-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm cursor-pointer"
// // // //                       >
// // // //                         <option value={10}>10</option>
// // // //                         <option value={25}>25</option>
// // // //                         <option value={50}>50</option>
// // // //                         <option value={100}>100</option>
// // // //                       </select>
// // // //                     </div>

// // // //                     <div className="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
// // // //                       <Button
// // // //                         onClick={() => paginate(currentPage - 1)}
// // // //                         disabled={currentPage === 1}
// // // //                         variant="ghost"
// // // //                         size="icon"
// // // //                         className="h-8 w-8 text-slate-500 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50"
// // // //                       >
// // // //                         <ChevronLeft className="h-4 w-4" />
// // // //                       </Button>
                      
// // // //                       {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
// // // //                         let pageNum;
// // // //                         if (totalPages <= 5) {
// // // //                           pageNum = i + 1;
// // // //                         } else if (currentPage <= 3) {
// // // //                           pageNum = i + 1;
// // // //                         } else if (currentPage >= totalPages - 2) {
// // // //                           pageNum = totalPages - 4 + i;
// // // //                         } else {
// // // //                           pageNum = currentPage - 2 + i;
// // // //                         }
                        
// // // //                         return (
// // // //                           <Button
// // // //                             key={pageNum}
// // // //                             onClick={() => paginate(pageNum)}
// // // //                             variant={currentPage === pageNum ? "default" : "ghost"}
// // // //                             className={`h-8 w-8 p-0 text-sm font-bold ${
// // // //                               currentPage === pageNum
// // // //                                 ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
// // // //                                 : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
// // // //                             }`}
// // // //                           >
// // // //                             {pageNum}
// // // //                           </Button>
// // // //                         );
// // // //                       })}
                      
// // // //                       <Button
// // // //                         onClick={() => paginate(currentPage + 1)}
// // // //                         disabled={currentPage === totalPages || totalPages === 0}
// // // //                         variant="ghost"
// // // //                         size="icon"
// // // //                         className="h-8 w-8 text-slate-500 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50"
// // // //                       >
// // // //                         <ChevronRight className="h-4 w-4" />
// // // //                       </Button>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </>
// // // //             )}
// // // //           </Card>
// // // //         </div>
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
// // // import { Home, Search, Edit, Calendar, ChevronLeft, ChevronRight, Activity, RotateCcw } from "lucide-react";
// // // import toast, { Toaster } from "react-hot-toast";

// // // // Type definitions
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

// // // interface SearchFilters {
// // //   fromDate: string;
// // //   toDate: string;
// // //   childName: string;
// // //   samNumber: string;
// // //   recordId: string;
// // // }

// // // export default function AntibioticsMicronutrientsPage() {
// // //   const router = useRouter();
// // //   const [children, setChildren] = useState<Child[]>([]);
// // //   const [filteredChildren, setFilteredChildren] = useState<Child[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searching, setSearching] = useState(false);
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [itemsPerPage, setItemsPerPage] = useState(10);
  
// // //   const [filters, setFilters] = useState<SearchFilters>({
// // //     fromDate: "",
// // //     toDate: "",
// // //     childName: "",
// // //     samNumber: "",
// // //     recordId: ""
// // //   });

// // //   // Fetch children data from the Database API
// // //   useEffect(() => {
// // //     const fetchChildren = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const response = await fetch('/api/child-registration');
// // //         if (!response.ok) throw new Error('Failed to fetch patients');
        
// // //         const dbChildren = await response.json();
        
// // //         // Map database columns to the frontend interface
// // //         const mappedChildren: Child[] = dbChildren.map((item: any) => ({
// // //           id: item.registration_id?.toString() || item.id,
// // //           recordNo: item.registration_id?.toString() || "N/A", 
// // //           samNumber: item.sam_no || item.samNumber || "",
// // //           childName: item.child_full_name || item.childName || "Unknown",
// // //           parentName: item.guardian_name || item.parentName || "",
// // //           dateOfBirth: item.dob || item.dateOfBirth || "",
// // //           admissionWeight: item.admission_weight_kg?.toString() || item.admissionWeight || "",
// // //           admissionHeight: item.length_height_cm?.toString() || item.admissionHeight || "",
// // //           createdAt: item.admission_date || item.createdAt || new Date().toISOString(),
// // //         }));

// // //         setChildren(mappedChildren);
// // //         setFilteredChildren(mappedChildren);
// // //       } catch (error) {
// // //         console.error("Error loading children data:", error);
// // //         toast.error("Failed to load patient records from the server");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchChildren();
// // //   }, []);

// // //   // Handle filter changes
// // //   const handleFilterChange = (field: keyof SearchFilters, value: string) => {
// // //     setFilters(prev => ({
// // //       ...prev,
// // //       [field]: value
// // //     }));
// // //   };

// // //   // Apply filters
// // //   const applyFilters = () => {
// // //     setSearching(true);
    
// // //     setTimeout(() => {
// // //       let filtered = [...children];
      
// // //       if (filters.childName) {
// // //         filtered = filtered.filter(child => 
// // //           (child.childName || "").toLowerCase().includes(filters.childName.toLowerCase())
// // //         );
// // //       }
      
// // //       if (filters.samNumber) {
// // //         filtered = filtered.filter(child => 
// // //           (child.samNumber || "").toLowerCase().includes(filters.samNumber.toLowerCase())
// // //         );
// // //       }
      
// // //       if (filters.recordId) {
// // //         filtered = filtered.filter(child => 
// // //           (child.recordNo || "").toLowerCase().includes(filters.recordId.toLowerCase())
// // //         );
// // //       }

// // //       if (filters.fromDate) {
// // //         const fromTime = new Date(filters.fromDate).getTime();
// // //         filtered = filtered.filter(child => new Date(child.createdAt).getTime() >= fromTime);
// // //       }

// // //       if (filters.toDate) {
// // //         const endOfDay = new Date(filters.toDate).setHours(23, 59, 59, 999);
// // //         filtered = filtered.filter(child => new Date(child.createdAt).getTime() <= endOfDay);
// // //       }
      
// // //       setFilteredChildren(filtered);
// // //       setCurrentPage(1); // Reset to first page after filtering
// // //       setSearching(false);
// // //       toast.success(`Found ${filtered.length} matching records`, {
// // //         iconTheme: { primary: '#2563eb', secondary: '#fff' }
// // //       });
// // //     }, 400); // Slight delay for UI feedback
// // //   };

// // //   // Reset filters
// // //   const resetFilters = () => {
// // //     setFilters({
// // //       fromDate: "",
// // //       toDate: "",
// // //       childName: "",
// // //       samNumber: "",
// // //       recordId: ""
// // //     });
// // //     setFilteredChildren(children);
// // //     setCurrentPage(1);
// // //   };

// // //   // Navigate to edit page
// // //   const handleEdit = (childId: string) => {
// // //     router.push(`/mtc-user/dashboard/micronutrients/edit-micronutrients/${childId}`);
// // //   };

// // //   // Pagination
// // //   const indexOfLastItem = currentPage * itemsPerPage;
// // //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // //   const currentItems = filteredChildren.slice(indexOfFirstItem, indexOfLastItem);
// // //   const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);

// // //   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
// // //           <p className="mt-4 text-slate-500 font-medium tracking-wide">Loading patient records...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-slate-50 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 md:px-8 font-sans text-slate-900">
// // //       <Toaster position="top-right" />

// // //       <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
// // //         {/* Header */}
// // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // //           <div className="flex items-center gap-3">
// // //             <div className="bg-blue-100 p-2.5 rounded-xl border border-blue-200 shadow-sm">
// // //               <Activity className="h-6 w-6 text-blue-700" />
// // //             </div>
// // //             <div>
// // //               <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
// // //                 Antibiotics & Micronutrients
// // //               </h1>
// // //               <p className="text-sm text-slate-500 font-medium mt-1">Manage and update patient treatment records</p>
// // //             </div>
// // //           </div>
// // //           <Button
// // //             onClick={() => router.push("/mtc-user/dashboard/home")}
// // //             variant="outline"
// // //             className="border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm"
// // //           >
// // //             <Home className="mr-2 h-4 w-4" /> 
// // //             Back to Home
// // //           </Button>
// // //         </div>

// // //         {/* Search Filters */}
// // //         <Card className="shadow-sm border border-slate-200 rounded-xl overflow-hidden bg-white">
// // //           <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5 px-6">
// // //             <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
// // //               <Search className="h-4 w-4 text-blue-500" /> 
// // //               Search Filters
// // //             </h2>
// // //           </CardHeader>
// // //           <CardContent className="p-6">
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
// // //               <div className="space-y-1.5">
// // //                 <label className="block text-sm font-semibold text-slate-700">From Date</label>
// // //                 <div className="relative">
// // //                   <Input
// // //                     type="date"
// // //                     value={filters.fromDate}
// // //                     onChange={(e) => handleFilterChange("fromDate", e.target.value)}
// // //                     className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm pr-10"
// // //                   />
// // //                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
// // //                     <Calendar className="h-4 w-4 text-slate-400" />
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="space-y-1.5">
// // //                 <label className="block text-sm font-semibold text-slate-700">To Date</label>
// // //                 <div className="relative">
// // //                   <Input
// // //                     type="date"
// // //                     value={filters.toDate}
// // //                     onChange={(e) => handleFilterChange("toDate", e.target.value)}
// // //                     className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm pr-10"
// // //                   />
// // //                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
// // //                     <Calendar className="h-4 w-4 text-slate-400" />
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="space-y-1.5">
// // //                 <label className="block text-sm font-semibold text-slate-700">Child Name</label>
// // //                 <Input
// // //                   value={filters.childName}
// // //                   onChange={(e) => handleFilterChange("childName", e.target.value)}
// // //                   placeholder="e.g. Rahul Kumar"
// // //                   className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm"
// // //                 />
// // //               </div>

// // //               <div className="space-y-1.5">
// // //                 <label className="block text-sm font-semibold text-slate-700">SAM Number</label>
// // //                 <Input
// // //                   value={filters.samNumber}
// // //                   onChange={(e) => handleFilterChange("samNumber", e.target.value)}
// // //                   placeholder="SAM-001"
// // //                   className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm"
// // //                 />
// // //               </div>

// // //               <div className="space-y-1.5">
// // //                 <label className="block text-sm font-semibold text-slate-700">Record ID</label>
// // //                 <Input
// // //                   value={filters.recordId}
// // //                   onChange={(e) => handleFilterChange("recordId", e.target.value)}
// // //                   placeholder="REC-001"
// // //                   className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm"
// // //                 />
// // //               </div>

// // //               <div className="flex items-end gap-3 pt-2 xl:pt-0">
// // //                 <Button
// // //                   onClick={applyFilters}
// // //                   disabled={searching}
// // //                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
// // //                 >
// // //                   {searching ? (
// // //                     <>
// // //                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// // //                       Searching...
// // //                     </>
// // //                   ) : (
// // //                     <>
// // //                       <Search className="mr-2 h-4 w-4" />
// // //                       Search
// // //                     </>
// // //                   )}
// // //                 </Button>
// // //                 <Button
// // //                   onClick={resetFilters}
// // //                   variant="outline"
// // //                   size="icon"
// // //                   className="border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all shrink-0"
// // //                   title="Reset Filters"
// // //                 >
// // //                   <RotateCcw className="h-4 w-4" />
// // //                 </Button>
// // //               </div>
// // //             </div>
// // //           </CardContent>
// // //         </Card>

// // //         {/* Results Section */}
// // //         <div className="space-y-4">
// // //           <div className="flex items-center justify-between">
// // //             <h2 className="text-lg font-bold text-slate-800">
// // //               Patient Roster
// // //             </h2>
// // //             <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
// // //               {filteredChildren.length} Records Found
// // //             </div>
// // //           </div>

// // //           <Card className="shadow-sm border border-slate-200 rounded-xl overflow-hidden bg-white">
// // //             {filteredChildren.length === 0 ? (
// // //               <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
// // //                 <div className="bg-slate-50 p-4 rounded-full mb-4 border border-slate-100">
// // //                   <Search className="h-8 w-8 text-slate-300" />
// // //                 </div>
// // //                 <h3 className="text-lg font-bold text-slate-800">No patients found</h3>
// // //                 <p className="text-slate-500 mt-1 max-w-md mx-auto text-sm">We couldn't find any children matching your current search criteria. Try adjusting your filters or clearing them to see all records.</p>
// // //                 <Button
// // //                   onClick={resetFilters}
// // //                   variant="outline"
// // //                   className="mt-6 border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200"
// // //                 >
// // //                   Clear All Filters
// // //                 </Button>
// // //               </div>
// // //             ) : (
// // //               <>
// // //                 <div className="overflow-x-auto">
// // //                   <table className="min-w-full text-sm text-slate-700 border-collapse">
// // //                     <thead>
// // //                       <tr className="bg-slate-50 border-b border-slate-200 uppercase tracking-wider text-xs font-bold text-slate-500">
// // //                         <th className="py-4 px-5 text-left">Record No</th>
// // //                         <th className="py-4 px-5 text-left">SAM Number</th>
// // //                         <th className="py-4 px-5 text-left">Child Name</th>
// // //                         <th className="py-4 px-5 text-left hidden md:table-cell">Parent Name</th>
// // //                         <th className="py-4 px-5 text-left hidden lg:table-cell">DOB</th>
// // //                         <th className="py-4 px-5 text-left hidden sm:table-cell">Adm. Wt (kg)</th>
// // //                         <th className="py-4 px-5 text-center">Action</th>
// // //                       </tr>
// // //                     </thead>
// // //                     <tbody className="divide-y divide-slate-100">
// // //                       {currentItems.map((child) => (
// // //                         <tr
// // //                           key={child.id}
// // //                           className="bg-white hover:bg-blue-50/50 transition-colors group"
// // //                         >
// // //                           <td className="py-4 px-5 font-medium text-slate-900">{child.recordNo}</td>
// // //                           <td className="py-4 px-5">
// // //                             <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
// // //                               {child.samNumber}
// // //                             </span>
// // //                           </td>
// // //                           <td className="py-4 px-5 font-bold text-slate-800">{child.childName}</td>
// // //                           <td className="py-4 px-5 text-slate-500 hidden md:table-cell">{child.parentName}</td>
// // //                           <td className="py-4 px-5 text-slate-500 hidden lg:table-cell">{child.dateOfBirth}</td>
// // //                           <td className="py-4 px-5 text-slate-500 hidden sm:table-cell">{child.admissionWeight}</td>
// // //                           <td className="py-4 px-5 text-center">
// // //                             <Button
// // //                               onClick={() => handleEdit(child.id)}
// // //                               size="sm"
// // //                               className="bg-slate-900 hover:bg-blue-600 text-white shadow-sm transition-all"
// // //                             >
// // //                               <Edit className="h-4 w-4 mr-2" /> Update
// // //                             </Button>
// // //                           </td>
// // //                         </tr>
// // //                       ))}
// // //                     </tbody>
// // //                   </table>
// // //                 </div>

// // //                 {/* Pagination */}
// // //                 <div className="bg-slate-50 border-t border-slate-200 p-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
// // //                   <div className="text-sm text-slate-500 font-medium">
// // //                     Showing <span className="text-slate-900 font-bold">{indexOfFirstItem + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(indexOfLastItem, filteredChildren.length)}</span> of <span className="text-blue-600 font-bold">{filteredChildren.length}</span> entries
// // //                   </div>
                  
// // //                   <div className="flex items-center gap-4">
// // //                     <div className="flex items-center gap-2 hidden sm:flex">
// // //                       <span className="text-sm text-slate-500">Show</span>
// // //                       <select
// // //                         value={itemsPerPage}
// // //                         onChange={(e) => {
// // //                           setItemsPerPage(Number(e.target.value));
// // //                           setCurrentPage(1);
// // //                         }}
// // //                         className="text-sm border border-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm cursor-pointer"
// // //                       >
// // //                         <option value={10}>10</option>
// // //                         <option value={25}>25</option>
// // //                         <option value={50}>50</option>
// // //                         <option value={100}>100</option>
// // //                       </select>
// // //                     </div>

// // //                     <div className="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
// // //                       <Button
// // //                         onClick={() => paginate(currentPage - 1)}
// // //                         disabled={currentPage === 1}
// // //                         variant="ghost"
// // //                         size="icon"
// // //                         className="h-8 w-8 text-slate-500 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50"
// // //                       >
// // //                         <ChevronLeft className="h-4 w-4" />
// // //                       </Button>
                      
// // //                       {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
// // //                         let pageNum;
// // //                         if (totalPages <= 5) {
// // //                           pageNum = i + 1;
// // //                         } else if (currentPage <= 3) {
// // //                           pageNum = i + 1;
// // //                         } else if (currentPage >= totalPages - 2) {
// // //                           pageNum = totalPages - 4 + i;
// // //                         } else {
// // //                           pageNum = currentPage - 2 + i;
// // //                         }
                        
// // //                         return (
// // //                           <Button
// // //                             key={pageNum}
// // //                             onClick={() => paginate(pageNum)}
// // //                             variant={currentPage === pageNum ? "default" : "ghost"}
// // //                             className={`h-8 w-8 p-0 text-sm font-bold ${
// // //                               currentPage === pageNum
// // //                                 ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
// // //                                 : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
// // //                             }`}
// // //                           >
// // //                             {pageNum}
// // //                           </Button>
// // //                         );
// // //                       })}
                      
// // //                       <Button
// // //                         onClick={() => paginate(currentPage + 1)}
// // //                         disabled={currentPage === totalPages || totalPages === 0}
// // //                         variant="ghost"
// // //                         size="icon"
// // //                         className="h-8 w-8 text-slate-500 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50"
// // //                       >
// // //                         <ChevronRight className="h-4 w-4" />
// // //                       </Button>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </>
// // //             )}
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
// // import { Home, Search, Edit, Calendar, ChevronLeft, ChevronRight, Activity, RotateCcw } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";

// // // Type definitions
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

// // interface SearchFilters {
// //   fromDate: string;
// //   toDate: string;
// //   childName: string;
// //   samNumber: string;
// //   recordId: string;
// // }

// // export default function AntibioticsMicronutrientsPage() {
// //   const router = useRouter();
// //   const [children, setChildren] = useState<Child[]>([]);
// //   const [filteredChildren, setFilteredChildren] = useState<Child[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searching, setSearching] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [itemsPerPage, setItemsPerPage] = useState(10);
  
// //   const [filters, setFilters] = useState<SearchFilters>({
// //     fromDate: "",
// //     toDate: "",
// //     childName: "",
// //     samNumber: "",
// //     recordId: ""
// //   });

// //   // Fetch children data from the Database API (Filtered by MTC Center)
// //   useEffect(() => {
// //     const fetchChildren = async () => {
// //       setLoading(true);
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
// //         const response = await fetch(`/api/child-registration${queryParams}`);
// //         if (!response.ok) throw new Error('Failed to fetch patients');
        
// //         const dbChildren = await response.json();
        
// //         // Map database columns to the frontend interface
// //         const mappedChildren: Child[] = dbChildren.map((item: any) => ({
// //           id: item.registration_id?.toString() || item.id,
// //           recordNo: item.registration_id?.toString() || "N/A", 
// //           samNumber: item.sam_no || item.samNumber || "",
// //           childName: item.child_full_name || item.childName || "Unknown",
// //           parentName: item.guardian_name || item.parentName || "",
// //           dateOfBirth: item.dob || item.dateOfBirth || "",
// //           admissionWeight: item.admission_weight_kg?.toString() || item.admissionWeight || "",
// //           admissionHeight: item.length_height_cm?.toString() || item.admissionHeight || "",
// //           createdAt: item.admission_date || item.createdAt || new Date().toISOString(),
// //         }));

// //         setChildren(mappedChildren);
// //         setFilteredChildren(mappedChildren);
// //       } catch (error) {
// //         console.error("Error loading children data:", error);
// //         toast.error("Failed to load patient records from the server");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchChildren();
// //   }, []);

// //   // Handle filter changes
// //   const handleFilterChange = (field: keyof SearchFilters, value: string) => {
// //     setFilters(prev => ({
// //       ...prev,
// //       [field]: value
// //     }));
// //   };

// //   // Apply filters
// //   const applyFilters = () => {
// //     setSearching(true);
    
// //     setTimeout(() => {
// //       let filtered = [...children];
      
// //       if (filters.childName) {
// //         filtered = filtered.filter(child => 
// //           (child.childName || "").toLowerCase().includes(filters.childName.toLowerCase())
// //         );
// //       }
      
// //       if (filters.samNumber) {
// //         filtered = filtered.filter(child => 
// //           (child.samNumber || "").toLowerCase().includes(filters.samNumber.toLowerCase())
// //         );
// //       }
      
// //       if (filters.recordId) {
// //         filtered = filtered.filter(child => 
// //           (child.recordNo || "").toLowerCase().includes(filters.recordId.toLowerCase())
// //         );
// //       }

// //       if (filters.fromDate) {
// //         const fromTime = new Date(filters.fromDate).getTime();
// //         filtered = filtered.filter(child => new Date(child.createdAt).getTime() >= fromTime);
// //       }

// //       if (filters.toDate) {
// //         const endOfDay = new Date(filters.toDate).setHours(23, 59, 59, 999);
// //         filtered = filtered.filter(child => new Date(child.createdAt).getTime() <= endOfDay);
// //       }
      
// //       setFilteredChildren(filtered);
// //       setCurrentPage(1); // Reset to first page after filtering
// //       setSearching(false);
// //       toast.success(`Found ${filtered.length} matching records`, {
// //         iconTheme: { primary: '#2563eb', secondary: '#fff' }
// //       });
// //     }, 400); // Slight delay for UI feedback
// //   };

// //   // Reset filters
// //   const resetFilters = () => {
// //     setFilters({
// //       fromDate: "",
// //       toDate: "",
// //       childName: "",
// //       samNumber: "",
// //       recordId: ""
// //     });
// //     setFilteredChildren(children);
// //     setCurrentPage(1);
// //   };

// //   // Navigate to edit page
// //   const handleEdit = (childId: string) => {
// //     router.push(`/mtc-user/dashboard/micronutrients/edit-micronutrients/${childId}`);
// //   };

// //   // Pagination
// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = filteredChildren.slice(indexOfFirstItem, indexOfLastItem);
// //   const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);

// //   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
// //           <p className="mt-4 text-slate-500 font-medium tracking-wide">Loading patient records...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-slate-50 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 md:px-8 font-sans text-slate-900">
// //       <Toaster position="top-right" />

// //       <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //           <div className="flex items-center gap-3">
// //             <div className="bg-blue-100 p-2.5 rounded-xl border border-blue-200 shadow-sm">
// //               <Activity className="h-6 w-6 text-blue-700" />
// //             </div>
// //             <div>
// //               <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
// //                 Antibiotics & Micronutrients
// //               </h1>
// //               <p className="text-sm text-slate-500 font-medium mt-1">Manage and update patient treatment records</p>
// //             </div>
// //           </div>
// //           <Button
// //             onClick={() => router.push("/mtc-user/dashboard/home")}
// //             variant="outline"
// //             className="border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm"
// //           >
// //             <Home className="mr-2 h-4 w-4" /> 
// //             Back to Home
// //           </Button>
// //         </div>

// //         {/* Search Filters */}
// //         <Card className="shadow-sm border border-slate-200 rounded-xl overflow-hidden bg-white">
// //           <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5 px-6">
// //             <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
// //               <Search className="h-4 w-4 text-blue-500" /> 
// //               Search Filters
// //             </h2>
// //           </CardHeader>
// //           <CardContent className="p-6">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
// //               <div className="space-y-1.5">
// //                 <label className="block text-sm font-semibold text-slate-700">From Date</label>
// //                 <div className="relative">
// //                   <Input
// //                     type="date"
// //                     value={filters.fromDate}
// //                     onChange={(e) => handleFilterChange("fromDate", e.target.value)}
// //                     className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm pr-10"
// //                   />
// //                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
// //                     <Calendar className="h-4 w-4 text-slate-400" />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="space-y-1.5">
// //                 <label className="block text-sm font-semibold text-slate-700">To Date</label>
// //                 <div className="relative">
// //                   <Input
// //                     type="date"
// //                     value={filters.toDate}
// //                     onChange={(e) => handleFilterChange("toDate", e.target.value)}
// //                     className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm pr-10"
// //                   />
// //                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
// //                     <Calendar className="h-4 w-4 text-slate-400" />
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="space-y-1.5">
// //                 <label className="block text-sm font-semibold text-slate-700">Child Name</label>
// //                 <Input
// //                   value={filters.childName}
// //                   onChange={(e) => handleFilterChange("childName", e.target.value)}
// //                   placeholder="e.g. Rahul Kumar"
// //                   className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm"
// //                 />
// //               </div>

// //               <div className="space-y-1.5">
// //                 <label className="block text-sm font-semibold text-slate-700">SAM Number</label>
// //                 <Input
// //                   value={filters.samNumber}
// //                   onChange={(e) => handleFilterChange("samNumber", e.target.value)}
// //                   placeholder="SAM-001"
// //                   className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm"
// //                 />
// //               </div>

// //               <div className="space-y-1.5">
// //                 <label className="block text-sm font-semibold text-slate-700">Record ID</label>
// //                 <Input
// //                   value={filters.recordId}
// //                   onChange={(e) => handleFilterChange("recordId", e.target.value)}
// //                   placeholder="REC-001"
// //                   className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm"
// //                 />
// //               </div>

// //               <div className="flex items-end gap-3 pt-2 xl:pt-0">
// //                 <Button
// //                   onClick={applyFilters}
// //                   disabled={searching}
// //                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
// //                 >
// //                   {searching ? (
// //                     <>
// //                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// //                       Searching...
// //                     </>
// //                   ) : (
// //                     <>
// //                       <Search className="mr-2 h-4 w-4" />
// //                       Search
// //                     </>
// //                   )}
// //                 </Button>
// //                 <Button
// //                   onClick={resetFilters}
// //                   variant="outline"
// //                   size="icon"
// //                   className="border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all shrink-0"
// //                   title="Reset Filters"
// //                 >
// //                   <RotateCcw className="h-4 w-4" />
// //                 </Button>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Results Section */}
// //         <div className="space-y-4">
// //           <div className="flex items-center justify-between">
// //             <h2 className="text-lg font-bold text-slate-800">
// //               Patient Roster
// //             </h2>
// //             <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
// //               {filteredChildren.length} Records Found
// //             </div>
// //           </div>

// //           <Card className="shadow-sm border border-slate-200 rounded-xl overflow-hidden bg-white">
// //             {filteredChildren.length === 0 ? (
// //               <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
// //                 <div className="bg-slate-50 p-4 rounded-full mb-4 border border-slate-100">
// //                   <Search className="h-8 w-8 text-slate-300" />
// //                 </div>
// //                 <h3 className="text-lg font-bold text-slate-800">No patients found</h3>
// //                 <p className="text-slate-500 mt-1 max-w-md mx-auto text-sm">We couldn't find any children matching your current search criteria. Try adjusting your filters or clearing them to see all records.</p>
// //                 <Button
// //                   onClick={resetFilters}
// //                   variant="outline"
// //                   className="mt-6 border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200"
// //                 >
// //                   Clear All Filters
// //                 </Button>
// //               </div>
// //             ) : (
// //               <>
// //                 <div className="overflow-x-auto">
// //                   <table className="min-w-full text-sm text-slate-700 border-collapse">
// //                     <thead>
// //                       <tr className="bg-slate-50 border-b border-slate-200 uppercase tracking-wider text-xs font-bold text-slate-500">
// //                         <th className="py-4 px-5 text-left">Record No</th>
// //                         <th className="py-4 px-5 text-left">SAM Number</th>
// //                         <th className="py-4 px-5 text-left">Child Name</th>
// //                         <th className="py-4 px-5 text-left hidden md:table-cell">Parent Name</th>
// //                         <th className="py-4 px-5 text-left hidden lg:table-cell">DOB</th>
// //                         <th className="py-4 px-5 text-left hidden sm:table-cell">Adm. Wt (kg)</th>
// //                         <th className="py-4 px-5 text-center">Action</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="divide-y divide-slate-100">
// //                       {currentItems.map((child) => (
// //                         <tr
// //                           key={child.id}
// //                           className="bg-white hover:bg-blue-50/50 transition-colors group"
// //                         >
// //                           <td className="py-4 px-5 font-medium text-slate-900">{child.recordNo}</td>
// //                           <td className="py-4 px-5">
// //                             <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
// //                               {child.samNumber}
// //                             </span>
// //                           </td>
// //                           <td className="py-4 px-5 font-bold text-slate-800">{child.childName}</td>
// //                           <td className="py-4 px-5 text-slate-500 hidden md:table-cell">{child.parentName}</td>
// //                           <td className="py-4 px-5 text-slate-500 hidden lg:table-cell">{child.dateOfBirth}</td>
// //                           <td className="py-4 px-5 text-slate-500 hidden sm:table-cell">{child.admissionWeight}</td>
// //                           <td className="py-4 px-5 text-center">
// //                             <Button
// //                               onClick={() => handleEdit(child.id)}
// //                               size="sm"
// //                               className="bg-slate-900 hover:bg-blue-600 text-white shadow-sm transition-all"
// //                             >
// //                               <Edit className="h-4 w-4 mr-2" /> Update
// //                             </Button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>

// //                 {/* Pagination */}
// //                 <div className="bg-slate-50 border-t border-slate-200 p-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
// //                   <div className="text-sm text-slate-500 font-medium">
// //                     Showing <span className="text-slate-900 font-bold">{indexOfFirstItem + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(indexOfLastItem, filteredChildren.length)}</span> of <span className="text-blue-600 font-bold">{filteredChildren.length}</span> entries
// //                   </div>
                  
// //                   <div className="flex items-center gap-4">
// //                     <div className="flex items-center gap-2 hidden sm:flex">
// //                       <span className="text-sm text-slate-500">Show</span>
// //                       <select
// //                         value={itemsPerPage}
// //                         onChange={(e) => {
// //                           setItemsPerPage(Number(e.target.value));
// //                           setCurrentPage(1);
// //                         }}
// //                         className="text-sm border border-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm cursor-pointer"
// //                       >
// //                         <option value={10}>10</option>
// //                         <option value={25}>25</option>
// //                         <option value={50}>50</option>
// //                         <option value={100}>100</option>
// //                       </select>
// //                     </div>

// //                     <div className="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
// //                       <Button
// //                         onClick={() => paginate(currentPage - 1)}
// //                         disabled={currentPage === 1}
// //                         variant="ghost"
// //                         size="icon"
// //                         className="h-8 w-8 text-slate-500 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50"
// //                       >
// //                         <ChevronLeft className="h-4 w-4" />
// //                       </Button>
                      
// //                       {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
// //                         let pageNum;
// //                         if (totalPages <= 5) {
// //                           pageNum = i + 1;
// //                         } else if (currentPage <= 3) {
// //                           pageNum = i + 1;
// //                         } else if (currentPage >= totalPages - 2) {
// //                           pageNum = totalPages - 4 + i;
// //                         } else {
// //                           pageNum = currentPage - 2 + i;
// //                         }
                        
// //                         return (
// //                           <Button
// //                             key={pageNum}
// //                             onClick={() => paginate(pageNum)}
// //                             variant={currentPage === pageNum ? "default" : "ghost"}
// //                             className={`h-8 w-8 p-0 text-sm font-bold ${
// //                               currentPage === pageNum
// //                                 ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
// //                                 : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
// //                             }`}
// //                           >
// //                             {pageNum}
// //                           </Button>
// //                         );
// //                       })}
                      
// //                       <Button
// //                         onClick={() => paginate(currentPage + 1)}
// //                         disabled={currentPage === totalPages || totalPages === 0}
// //                         variant="ghost"
// //                         size="icon"
// //                         className="h-8 w-8 text-slate-500 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50"
// //                       >
// //                         <ChevronRight className="h-4 w-4" />
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </>
// //             )}
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Home, Search, Edit, Calendar, ChevronLeft, ChevronRight, Activity, RotateCcw, CheckCircle2 } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// // Type definitions
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
//   isSamarRegistered: boolean; // ✅ Added SAAMAR boolean
//   samarUuid: string;          // ✅ Added SAAMAR UUID
// }

// interface SearchFilters {
//   fromDate: string;
//   toDate: string;
//   childName: string;
//   samNumber: string;
//   recordId: string;
// }

// export default function AntibioticsMicronutrientsPage() {
//   const router = useRouter();
//   const [children, setChildren] = useState<Child[]>([]);
//   const [filteredChildren, setFilteredChildren] = useState<Child[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searching, setSearching] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
  
//   // ✅ Added state for separating views
//   const [viewType, setViewType] = useState<"all" | "normal" | "samar">("all");
  
//   const [filters, setFilters] = useState<SearchFilters>({
//     fromDate: "",
//     toDate: "",
//     childName: "",
//     samNumber: "",
//     recordId: ""
//   });

//   // Fetch children data from the Database API (Filtered by MTC Center)
//   useEffect(() => {
//     const fetchChildren = async () => {
//       setLoading(true);
//       try {
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

//         const response = await fetch(`/api/child-registration${queryParams}`);
//         if (!response.ok) throw new Error('Failed to fetch patients');
        
//         const dbChildren = await response.json();
        
//         // Map database columns to the frontend interface
//         const mappedChildren: Child[] = dbChildren.map((item: any) => ({
//           id: item.registration_id?.toString() || item.id,
//           recordNo: item.registration_id?.toString() || "N/A", 
//           samNumber: item.sam_no || item.samNumber || "",
//           childName: item.child_full_name || item.childName || "Unknown",
//           parentName: item.guardian_name || item.parentName || "",
//           dateOfBirth: item.dob || item.dateOfBirth || "",
//           admissionWeight: item.admission_weight_kg?.toString() || item.admissionWeight || "",
//           admissionHeight: item.length_height_cm?.toString() || item.admissionHeight || "",
//           createdAt: item.admission_date || item.createdAt || new Date().toISOString(),
//           // ✅ Map SAAMAR data from the database payload
//           isSamarRegistered: item.is_samar_registered === true || item.isSamarRegistered === true,
//           samarUuid: item.samar_uuid || item.samarUuid || "",
//         }));

//         setChildren(mappedChildren);
//         setFilteredChildren(mappedChildren);
//       } catch (error) {
//         console.error("Error loading children data:", error);
//         toast.error("Failed to load patient records from the server");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChildren();
//   }, []);

//   // Handle filter changes
//   const handleFilterChange = (field: keyof SearchFilters, value: string) => {
//     setFilters(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   // Apply filters
//   const applyFilters = useCallback(() => {
//     setSearching(true);
    
//     setTimeout(() => {
//       let filtered = [...children];
      
//       // ✅ Apply the Normal vs SAAMAR filter separation
//       if (viewType === "normal") {
//         filtered = filtered.filter(child => !child.isSamarRegistered);
//       } else if (viewType === "samar") {
//         filtered = filtered.filter(child => child.isSamarRegistered);
//       }
      
//       if (filters.childName) {
//         filtered = filtered.filter(child => 
//           (child.childName || "").toLowerCase().includes(filters.childName.toLowerCase())
//         );
//       }
      
//       if (filters.samNumber) {
//         filtered = filtered.filter(child => 
//           (child.samNumber || "").toLowerCase().includes(filters.samNumber.toLowerCase())
//         );
//       }
      
//       if (filters.recordId) {
//         filtered = filtered.filter(child => 
//           (child.recordNo || "").toLowerCase().includes(filters.recordId.toLowerCase())
//         );
//       }

//       if (filters.fromDate) {
//         const fromTime = new Date(filters.fromDate).getTime();
//         filtered = filtered.filter(child => new Date(child.createdAt).getTime() >= fromTime);
//       }

//       if (filters.toDate) {
//         const endOfDay = new Date(filters.toDate).setHours(23, 59, 59, 999);
//         filtered = filtered.filter(child => new Date(child.createdAt).getTime() <= endOfDay);
//       }
      
//       setFilteredChildren(filtered);
//       setCurrentPage(1); // Reset to first page after filtering
//       setSearching(false);
      
//       // Avoid spamming toast on tab change
//       if (document.activeElement?.tagName === "BUTTON" && document.activeElement?.textContent?.includes("Search")) {
//         toast.success(`Found ${filtered.length} matching records`, {
//           iconTheme: { primary: '#2563eb', secondary: '#fff' }
//         });
//       }
//     }, 400); // Slight delay for UI feedback
//   }, [children, filters, viewType]);

//   // Trigger filter when viewType changes
//   useEffect(() => {
//     applyFilters();
//   }, [viewType, applyFilters]);

//   // Reset filters
//   const resetFilters = () => {
//     setFilters({
//       fromDate: "",
//       toDate: "",
//       childName: "",
//       samNumber: "",
//       recordId: ""
//     });
//     setViewType("all");
//     setFilteredChildren(children);
//     setCurrentPage(1);
//   };

//   // Navigate to edit page
//   const handleEdit = (childId: string) => {
//     router.push(`/mtc-user/dashboard/micronutrients/edit-micronutrients/${childId}`);
//   };

//   // Derived counts for the tabs
//   const countAll = children.length;
//   const countNormal = children.filter(d => !d.isSamarRegistered).length;
//   const countSamar = children.filter(d => d.isSamarRegistered).length;

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredChildren.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-slate-500 font-medium tracking-wide">Loading patient records...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 md:px-8 font-sans text-slate-900">
//       <Toaster position="top-right" />

//       <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div className="flex items-center gap-3">
//             <div className="bg-blue-100 p-2.5 rounded-xl border border-blue-200 shadow-sm">
//               <Activity className="h-6 w-6 text-blue-700" />
//             </div>
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
//                 Antibiotics & Micronutrients
//               </h1>
//               <p className="text-sm text-slate-500 font-medium mt-1">Manage and update patient treatment records</p>
//             </div>
//           </div>
//           <Button
//             onClick={() => router.push("/mtc-user/dashboard/home")}
//             variant="outline"
//             className="border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm"
//           >
//             <Home className="mr-2 h-4 w-4" /> 
//             Back to Home
//           </Button>
//         </div>

//         {/* Search Filters */}
//         <Card className="shadow-sm border border-slate-200 rounded-xl overflow-hidden bg-white">
//           <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5 px-6">
//             <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
//               <Search className="h-4 w-4 text-blue-500" /> 
//               Search Filters
//             </h2>
//           </CardHeader>
//           <CardContent className="p-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
//               <div className="space-y-1.5">
//                 <label className="block text-sm font-semibold text-slate-700">From Date</label>
//                 <div className="relative">
//                   <Input
//                     type="date"
//                     value={filters.fromDate}
//                     onChange={(e) => handleFilterChange("fromDate", e.target.value)}
//                     className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm pr-10"
//                   />
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                     <Calendar className="h-4 w-4 text-slate-400" />
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="block text-sm font-semibold text-slate-700">To Date</label>
//                 <div className="relative">
//                   <Input
//                     type="date"
//                     value={filters.toDate}
//                     onChange={(e) => handleFilterChange("toDate", e.target.value)}
//                     className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm pr-10"
//                   />
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                     <Calendar className="h-4 w-4 text-slate-400" />
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="block text-sm font-semibold text-slate-700">Child Name</label>
//                 <Input
//                   value={filters.childName}
//                   onChange={(e) => handleFilterChange("childName", e.target.value)}
//                   placeholder="e.g. Rahul Kumar"
//                   className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="block text-sm font-semibold text-slate-700">SAM Number</label>
//                 <Input
//                   value={filters.samNumber}
//                   onChange={(e) => handleFilterChange("samNumber", e.target.value)}
//                   placeholder="SAM-001"
//                   className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="block text-sm font-semibold text-slate-700">Record ID</label>
//                 <Input
//                   value={filters.recordId}
//                   onChange={(e) => handleFilterChange("recordId", e.target.value)}
//                   placeholder="REC-001"
//                   className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm"
//                 />
//               </div>

//               <div className="flex items-end gap-3 pt-2 xl:pt-0">
//                 <Button
//                   onClick={applyFilters}
//                   disabled={searching}
//                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
//                 >
//                   {searching ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Searching...
//                     </>
//                   ) : (
//                     <>
//                       <Search className="mr-2 h-4 w-4" />
//                       Search
//                     </>
//                   )}
//                 </Button>
//                 <Button
//                   onClick={resetFilters}
//                   variant="outline"
//                   size="icon"
//                   className="border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all shrink-0"
//                   title="Reset Filters"
//                 >
//                   <RotateCcw className="h-4 w-4" />
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
//               Patient Roster
//             </h2>
//             <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
//               {filteredChildren.length} Records Found
//             </div>
//           </div>

//           <Card className="shadow-sm border border-slate-200 rounded-xl overflow-hidden bg-white">
//             {filteredChildren.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
//                 <div className="bg-slate-50 p-4 rounded-full mb-4 border border-slate-100">
//                   <Search className="h-8 w-8 text-slate-300" />
//                 </div>
//                 <h3 className="text-lg font-bold text-slate-800">No patients found</h3>
//                 <p className="text-slate-500 mt-1 max-w-md mx-auto text-sm">We couldn't find any children matching your current search criteria. Try adjusting your filters or clearing them to see all records.</p>
//                 <Button
//                   onClick={resetFilters}
//                   variant="outline"
//                   className="mt-6 border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200"
//                 >
//                   Clear All Filters
//                 </Button>
//               </div>
//             ) : (
//               <>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full text-sm text-slate-700 border-collapse">
//                     <thead>
//                       <tr className="bg-slate-50 border-b border-slate-200 uppercase tracking-wider text-xs font-bold text-slate-500">
//                         <th className="py-4 px-5 text-left">Record No</th>
//                         <th className="py-4 px-5 text-left">SAM Number</th>
//                         <th className="py-4 px-5 text-left">Child Name</th>
//                         {/* ✅ Added Type Header */}
//                         <th className="py-4 px-5 text-left">Registration Type</th>
//                         <th className="py-4 px-5 text-left hidden md:table-cell">Parent Name</th>
//                         <th className="py-4 px-5 text-left hidden lg:table-cell">DOB</th>
//                         <th className="py-4 px-5 text-left hidden sm:table-cell">Adm. Wt (kg)</th>
//                         <th className="py-4 px-5 text-center">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-100">
//                       {currentItems.map((child) => (
//                         <tr
//                           key={child.id}
//                           className="bg-white hover:bg-blue-50/50 transition-colors group"
//                         >
//                           <td className="py-4 px-5 font-medium text-slate-900">{child.recordNo}</td>
//                           <td className="py-4 px-5">
//                             <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
//                               {child.samNumber}
//                             </span>
//                           </td>
//                           <td className="py-4 px-5 font-bold text-slate-800">{child.childName}</td>
                          
//                           {/* ✅ SAAMAR vs Normal Visual Badge */}
//                           <td className="py-4 px-5">
//                             {child.isSamarRegistered ? (
//                               <div className="flex flex-col">
//                                 <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-purple-100 text-purple-700 w-max border border-purple-200">
//                                   SAAMAR
//                                 </span>
//                                 <span className="text-[10px] text-slate-400 mt-1 font-mono tracking-tighter" title="SAAMAR UUID">
//                                   {child.samarUuid || "No UUID"}
//                                 </span>
//                               </div>
//                             ) : (
//                               <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-slate-100 text-slate-500 w-max border border-slate-200">
//                                 Normal
//                               </span>
//                             )}
//                           </td>

//                           <td className="py-4 px-5 text-slate-500 hidden md:table-cell">{child.parentName}</td>
//                           <td className="py-4 px-5 text-slate-500 hidden lg:table-cell">{child.dateOfBirth}</td>
//                           <td className="py-4 px-5 text-slate-500 hidden sm:table-cell">{child.admissionWeight}</td>
//                           <td className="py-4 px-5 text-center">
//                             <Button
//                               onClick={() => handleEdit(child.id)}
//                               size="sm"
//                               className="bg-slate-900 hover:bg-blue-600 text-white shadow-sm transition-all"
//                             >
//                               <Edit className="h-4 w-4 mr-2" /> Update
//                             </Button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="bg-slate-50 border-t border-slate-200 p-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
//                   <div className="text-sm text-slate-500 font-medium">
//                     Showing <span className="text-slate-900 font-bold">{indexOfFirstItem + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(indexOfLastItem, filteredChildren.length)}</span> of <span className="text-blue-600 font-bold">{filteredChildren.length}</span> entries
//                   </div>
                  
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2 hidden sm:flex">
//                       <span className="text-sm text-slate-500">Show</span>
//                       <select
//                         value={itemsPerPage}
//                         onChange={(e) => {
//                           setItemsPerPage(Number(e.target.value));
//                           setCurrentPage(1);
//                         }}
//                         className="text-sm border border-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm cursor-pointer"
//                       >
//                         <option value={10}>10</option>
//                         <option value={25}>25</option>
//                         <option value={50}>50</option>
//                         <option value={100}>100</option>
//                       </select>
//                     </div>

//                     <div className="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
//                       <Button
//                         onClick={() => paginate(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 text-slate-500 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50"
//                       >
//                         <ChevronLeft className="h-4 w-4" />
//                       </Button>
                      
//                       {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
//                         let pageNum;
//                         if (totalPages <= 5) {
//                           pageNum = i + 1;
//                         } else if (currentPage <= 3) {
//                           pageNum = i + 1;
//                         } else if (currentPage >= totalPages - 2) {
//                           pageNum = totalPages - 4 + i;
//                         } else {
//                           pageNum = currentPage - 2 + i;
//                         }
                        
//                         return (
//                           <Button
//                             key={pageNum}
//                             onClick={() => paginate(pageNum)}
//                             variant={currentPage === pageNum ? "default" : "ghost"}
//                             className={`h-8 w-8 p-0 text-sm font-bold ${
//                               currentPage === pageNum
//                                 ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
//                                 : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
//                             }`}
//                           >
//                             {pageNum}
//                           </Button>
//                         );
//                       })}
                      
//                       <Button
//                         onClick={() => paginate(currentPage + 1)}
//                         disabled={currentPage === totalPages || totalPages === 0}
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 text-slate-500 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50"
//                       >
//                         <ChevronRight className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Home, Search, Edit, Calendar, ChevronLeft, ChevronRight, Activity, RotateCcw, CheckCircle2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Type definitions
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
  isSamarRegistered: boolean; // ✅ Added SAAMAR boolean
  samarUuid: string;          // ✅ Added SAAMAR UUID
}

interface SearchFilters {
  fromDate: string;
  toDate: string;
  childName: string;
  samNumber: string;
  recordId: string;
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
  is_samar_registered?: boolean;
  isSamarRegistered?: boolean;
  samar_uuid?: string;
  samarUuid?: string;
}

export default function AntibioticsMicronutrientsPage() {
  const router = useRouter();
  const [children, setChildren] = useState<Child[]>([]);
  const [filteredChildren, setFilteredChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // ✅ Added state for separating views
  const [viewType, setViewType] = useState<"all" | "normal" | "samar">("all");
  
  const [filters, setFilters] = useState<SearchFilters>({
    fromDate: "",
    toDate: "",
    childName: "",
    samNumber: "",
    recordId: ""
  });

  // Fetch children data from the Database API (Filtered by MTC Center)
  useEffect(() => {
    const fetchChildren = async () => {
      setLoading(true);
      try {
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

        const response = await fetch(`/api/child-registration${queryParams}`);
        if (!response.ok) throw new Error('Failed to fetch patients');
        
        const dbChildren = await response.json() as RawChildItem[];
        
        // Map database columns to the frontend interface
        const mappedChildren: Child[] = dbChildren.map((item) => ({
          id: item.registration_id?.toString() || item.id,
          recordNo: item.registration_id?.toString() || "N/A", 
          samNumber: item.sam_no || item.samNumber || "",
          childName: item.child_full_name || item.childName || "Unknown",
          parentName: item.guardian_name || item.parentName || "",
          dateOfBirth: item.dob || item.dateOfBirth || "",
          admissionWeight: item.admission_weight_kg?.toString() || item.admissionWeight || "",
          admissionHeight: item.length_height_cm?.toString() || item.admissionHeight || "",
          createdAt: item.admission_date || item.createdAt || new Date().toISOString(),
          // ✅ Map SAAMAR data from the database payload
          isSamarRegistered: item.is_samar_registered === true || item.isSamarRegistered === true,
          samarUuid: item.samar_uuid || item.samarUuid || "",
        }));

        setChildren(mappedChildren);
        setFilteredChildren(mappedChildren);
      } catch (error) {
        console.error("Error loading children data:", error);
        toast.error("Failed to load patient records from the server");
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  // Handle filter changes
  const handleFilterChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Apply filters
  const applyFilters = useCallback(() => {
    setSearching(true);
    
    setTimeout(() => {
      let filtered = [...children];
      
      // ✅ Apply the Normal vs SAAMAR filter separation
      if (viewType === "normal") {
        filtered = filtered.filter(child => !child.isSamarRegistered);
      } else if (viewType === "samar") {
        filtered = filtered.filter(child => child.isSamarRegistered);
      }
      
      if (filters.childName) {
        filtered = filtered.filter(child => 
          (child.childName || "").toLowerCase().includes(filters.childName.toLowerCase())
        );
      }
      
      if (filters.samNumber) {
        filtered = filtered.filter(child => 
          (child.samNumber || "").toLowerCase().includes(filters.samNumber.toLowerCase())
        );
      }
      
      if (filters.recordId) {
        filtered = filtered.filter(child => 
          (child.recordNo || "").toLowerCase().includes(filters.recordId.toLowerCase())
        );
      }

      if (filters.fromDate) {
        const fromTime = new Date(filters.fromDate).getTime();
        filtered = filtered.filter(child => new Date(child.createdAt).getTime() >= fromTime);
      }

      if (filters.toDate) {
        const endOfDay = new Date(filters.toDate).setHours(23, 59, 59, 999);
        filtered = filtered.filter(child => new Date(child.createdAt).getTime() <= endOfDay);
      }
      
      setFilteredChildren(filtered);
      setCurrentPage(1); // Reset to first page after filtering
      setSearching(false);
      
      // Avoid spamming toast on tab change
      if (document.activeElement?.tagName === "BUTTON" && document.activeElement?.textContent?.includes("Search")) {
        toast.success(`Found ${filtered.length} matching records`, {
          iconTheme: { primary: '#2563eb', secondary: '#fff' }
        });
      }
    }, 400); // Slight delay for UI feedback
  }, [children, filters, viewType]);

  // Trigger filter when viewType changes
  useEffect(() => {
    applyFilters();
  }, [viewType, applyFilters]);

  // Reset filters
  const resetFilters = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      childName: "",
      samNumber: "",
      recordId: ""
    });
    setViewType("all");
    setFilteredChildren(children);
    setCurrentPage(1);
  };

  // Navigate to edit page
  const handleEdit = (childId: string) => {
    router.push(`/mtc-user/dashboard/micronutrients/edit-micronutrients/${childId}`);
  };

  // Derived counts for the tabs
  const countAll = children.length;
  const countNormal = children.filter(d => !d.isSamarRegistered).length;
  const countSamar = children.filter(d => d.isSamarRegistered).length;

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredChildren.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredChildren.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center font-sans">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-500 font-medium tracking-wide">Loading patient records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 md:px-8 font-sans text-slate-900">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2.5 rounded-xl border border-blue-200 shadow-sm">
              <Activity className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-880 tracking-tight">
                Antibiotics & Micronutrients
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1">Manage and update patient treatment records</p>
            </div>
          </div>
          <Button
            onClick={() => router.push("/mtc-user/dashboard/home")}
            variant="outline"
            className="border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm"
          >
            <Home className="mr-2 h-4 w-4" /> 
            Back to Home
          </Button>
        </div>

        {/* Search Filters */}
        <Card className="shadow-sm border border-slate-200 rounded-xl overflow-hidden bg-white">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5 px-6">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
              <Search className="h-4 w-4 text-blue-500" /> 
              Search Filters
            </h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">From Date</label>
                <div className="relative">
                  <Input
                    type="date"
                    value={filters.fromDate}
                    onChange={(e) => handleFilterChange("fromDate", e.target.value)}
                    className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">To Date</label>
                <div className="relative">
                  <Input
                    type="date"
                    value={filters.toDate}
                    onChange={(e) => handleFilterChange("toDate", e.target.value)}
                    className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">Child Name</label>
                <Input
                  value={filters.childName}
                  onChange={(e) => handleFilterChange("childName", e.target.value)}
                  placeholder="e.g. Rahul Kumar"
                  className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">SAM Number</label>
                <Input
                  value={filters.samNumber}
                  onChange={(e) => handleFilterChange("samNumber", e.target.value)}
                  placeholder="SAM-001"
                  className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">Record ID</label>
                <Input
                  value={filters.recordId}
                  onChange={(e) => handleFilterChange("recordId", e.target.value)}
                  placeholder="REC-001"
                  className="bg-slate-50 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all text-sm"
                />
              </div>

              <div className="flex items-end gap-3 pt-2 xl:pt-0">
                <Button
                  onClick={applyFilters}
                  disabled={searching}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
                >
                  {searching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  size="icon"
                  className="border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all shrink-0"
                  title="Reset Filters"
                >
                  <RotateCcw className="h-4 w-4" />
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
              Patient Roster
            </h2>
            <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              {filteredChildren.length} Records Found
            </div>
          </div>

          <Card className="shadow-sm border border-slate-200 rounded-xl overflow-hidden bg-white">
            {filteredChildren.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="bg-slate-50 p-4 rounded-full mb-4 border border-slate-100">
                  <Search className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No patients found</h3>
                <p className="text-slate-500 mt-1 max-w-md mx-auto text-sm">We couldn&apos;t find any children matching your current search criteria. Try adjusting your filters or clearing them to see all records.</p>
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="mt-6 border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-slate-700 border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 uppercase tracking-wider text-xs font-bold text-slate-500">
                        <th className="py-4 px-5 text-left">Record No</th>
                        <th className="py-4 px-5 text-left">SAM Number</th>
                        <th className="py-4 px-5 text-left">Child Name</th>
                        {/* ✅ Added Type Header */}
                        <th className="py-4 px-5 text-left">Registration Type</th>
                        <th className="py-4 px-5 text-left hidden md:table-cell">Parent Name</th>
                        <th className="py-4 px-5 text-left hidden lg:table-cell">DOB</th>
                        <th className="py-4 px-5 text-left hidden sm:table-cell">Adm. Wt (kg)</th>
                        <th className="py-4 px-5 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentItems.map((child) => (
                        <tr
                          key={child.id}
                          className="bg-white hover:bg-blue-50/50 transition-colors group"
                        >
                          <td className="py-4 px-5 font-medium text-slate-900">{child.recordNo}</td>
                          <td className="py-4 px-5">
                            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                              {child.samNumber}
                            </span>
                          </td>
                          <td className="py-4 px-5 font-bold text-slate-800">{child.childName}</td>
                          
                          {/* ✅ SAAMAR vs Normal Visual Badge */}
                          <td className="py-4 px-5">
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

                          <td className="py-4 px-5 text-slate-500 hidden md:table-cell">{child.parentName}</td>
                          <td className="py-4 px-5 text-slate-500 hidden lg:table-cell">{child.dateOfBirth}</td>
                          <td className="py-4 px-5 text-slate-500 hidden sm:table-cell">{child.admissionWeight}</td>
                          <td className="py-4 px-5 text-center">
                            <Button
                              onClick={() => handleEdit(child.id)}
                              size="sm"
                              className="bg-slate-900 hover:bg-blue-600 text-white shadow-sm transition-all"
                            >
                              <Edit className="h-4 w-4 mr-2" /> Update
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="bg-slate-50 border-t border-slate-200 p-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-slate-500 font-medium">
                    Showing <span className="text-slate-900 font-bold">{indexOfFirstItem + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(indexOfLastItem, filteredChildren.length)}</span> of <span className="text-blue-600 font-bold">{filteredChildren.length}</span> entries
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 hidden sm:flex">
                      <span className="text-sm text-slate-500">Show</span>
                      <select
                        value={itemsPerPage}
                        onChange={(e) => {
                          setItemsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="text-sm border border-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm cursor-pointer"
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>

                    <div className="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
                      <Button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            onClick={() => paginate(pageNum)}
                            variant={currentPage === pageNum ? "default" : "ghost"}
                            className={`h-8 w-8 p-0 text-sm font-bold ${
                              currentPage === pageNum
                                ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                                : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                            }`}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                      
                      <Button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}