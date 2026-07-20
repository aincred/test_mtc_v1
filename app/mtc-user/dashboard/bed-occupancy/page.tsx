// // // // // // "use client";

// // // // // // import { useState, useEffect, useCallback } from "react"; // Added useCallback import
// // // // // // import { useRouter } from "next/navigation";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // // import { CalendarIcon, Home, Save, Trash2, X } from "lucide-react";
// // // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // interface BedOccupancyRecord {
// // // // // //   id: string;
// // // // // //   date: string;
// // // // // //   year: number;
// // // // // //   month: number;
// // // // // //   day: number;
// // // // // //   bedSanctioned: number;
// // // // // //   utilizedBed: number;
// // // // // //   bedOccupancyPercentage: number;
// // // // // //   createdAt: string;
// // // // // // }

// // // // // // interface MonthlyData {
// // // // // //   month: string;
// // // // // //   occupancy: number;
// // // // // // }

// // // // // // export default function BedOccupancyPage() {
// // // // // //   const router = useRouter();
  
// // // // // //   // Form state
// // // // // //   const [date, setDate] = useState("");
// // // // // //   const [bedSanctioned, setBedSanctioned] = useState("");
// // // // // //   const [utilizedBed, setUtilizedBed] = useState("");
// // // // // //   const [bedOccupancyPercentage, setBedOccupancyPercentage] = useState("");
// // // // // //   const [year, setYear] = useState("");
// // // // // //   const [month, setMonth] = useState("");
// // // // // //   const [day, setDay] = useState("");
  
// // // // // //   // Data state
// // // // // //   const [records, setRecords] = useState<BedOccupancyRecord[]>([]);
// // // // // //   const [dailyData, setDailyData] = useState<number[][]>([]);
// // // // // //   const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
// // // // // //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
// // // // // //   const [editingId, setEditingId] = useState<string | null>(null);
  
// // // // // //   // Memoized generateTableData function
// // // // // //   const generateTableData = useCallback((allRecords: BedOccupancyRecord[], year: string) => {
// // // // // //     // Initialize daily data array (31 days x 12 months)
// // // // // //     const newDailyData: number[][] = Array(31).fill(null).map(() => Array(12).fill(0));
    
// // // // // //     // Initialize monthly data array
// // // // // //     const newMonthlyData: MonthlyData[] = [
// // // // // //       { month: "January", occupancy: 0 },
// // // // // //       { month: "February", occupancy: 0 },
// // // // // //       { month: "March", occupancy: 0 },
// // // // // //       { month: "April", occupancy: 0 },
// // // // // //       { month: "May", occupancy: 0 },
// // // // // //       { month: "June", occupancy: 0 },
// // // // // //       { month: "July", occupancy: 0 },
// // // // // //       { month: "August", occupancy: 0 },
// // // // // //       { month: "September", occupancy: 0 },
// // // // // //       { month: "October", occupancy: 0 },
// // // // // //       { month: "November", occupancy: 0 },
// // // // // //       { month: "December", occupancy: 0 }
// // // // // //     ];
    
// // // // // //     // Filter records for the selected year
// // // // // //     const yearRecords = allRecords.filter(record => record.year === parseInt(year));
    
// // // // // //     // Populate daily data and calculate monthly totals
// // // // // //     yearRecords.forEach(record => {
// // // // // //       const dayIndex = record.day - 1;
// // // // // //       const monthIndex = record.month - 1;
      
// // // // // //       if (dayIndex >= 0 && dayIndex < 31 && monthIndex >= 0 && monthIndex < 12) {
// // // // // //         newDailyData[dayIndex][monthIndex] = record.bedOccupancyPercentage;
// // // // // //         newMonthlyData[monthIndex].occupancy += record.bedOccupancyPercentage;
// // // // // //       }
// // // // // //     });
    
// // // // // //     // Calculate monthly averages
// // // // // //     newMonthlyData.forEach((monthData, monthIndex) => {
// // // // // //       const daysInMonth = new Date(parseInt(year), monthIndex + 1, 0).getDate();
// // // // // //       const monthRecords = yearRecords.filter(record => record.month === monthIndex + 1);
      
// // // // // //       if (monthRecords.length > 0) {
// // // // // //         monthData.occupancy = monthData.occupancy / daysInMonth;
// // // // // //       }
// // // // // //     });
    
// // // // // //     setDailyData(newDailyData);
// // // // // //     setMonthlyData(newMonthlyData);
// // // // // //   }, []); // Empty dependency array since this function doesn't depend on any external values
  
// // // // // //   // Load data from localStorage on component mount
// // // // // //   useEffect(() => {
// // // // // //     const storedRecords = localStorage.getItem('bedOccupancyRecords');
// // // // // //     if (storedRecords) {
// // // // // //       const parsedRecords = JSON.parse(storedRecords);
// // // // // //       setRecords(parsedRecords);
// // // // // //       generateTableData(parsedRecords, selectedYear);
// // // // // //     } else {
// // // // // //       // Initialize with empty arrays when no data exists
// // // // // //       setRecords([]);
// // // // // //       setDailyData([]);
// // // // // //       setMonthlyData([]);
// // // // // //     }
// // // // // //   }, [selectedYear, generateTableData]); // Added generateTableData to dependencies
  
// // // // // //   // Update table data when year changes
// // // // // //   useEffect(() => {
// // // // // //     generateTableData(records, selectedYear);
// // // // // //   }, [selectedYear, records, generateTableData]); // Added generateTableData to dependencies
  
// // // // // //   // Calculate bed occupancy percentage when inputs change
// // // // // //   useEffect(() => {
// // // // // //     if (bedSanctioned && utilizedBed) {
// // // // // //       const percentage = (parseFloat(utilizedBed) / parseFloat(bedSanctioned)) * 100;
// // // // // //       setBedOccupancyPercentage(percentage.toFixed(2));
// // // // // //     } else {
// // // // // //       setBedOccupancyPercentage("");
// // // // // //     }
// // // // // //   }, [bedSanctioned, utilizedBed]);
  
// // // // // //   // Extract year, month, day from date
// // // // // //   useEffect(() => {
// // // // // //     if (date) {
// // // // // //       const dateObj = new Date(date);
// // // // // //       setYear(dateObj.getFullYear().toString());
// // // // // //       setMonth((dateObj.getMonth() + 1).toString());
// // // // // //       setDay(dateObj.getDate().toString());
// // // // // //     } else {
// // // // // //       setYear("");
// // // // // //       setMonth("");
// // // // // //       setDay("");
// // // // // //     }
// // // // // //   }, [date]);
  
// // // // // //   const handleSave = () => {
// // // // // //     // Validate form
// // // // // //     if (!date || !bedSanctioned || !utilizedBed) {
// // // // // //       toast.error("Please fill all required fields");
// // // // // //       return;
// // // // // //     }
    
// // // // // //     // Create new record
// // // // // //     const newRecord: BedOccupancyRecord = {
// // // // // //       id: editingId || Date.now().toString(),
// // // // // //       date,
// // // // // //       year: parseInt(year),
// // // // // //       month: parseInt(month),
// // // // // //       day: parseInt(day),
// // // // // //       bedSanctioned: parseFloat(bedSanctioned),
// // // // // //       utilizedBed: parseFloat(utilizedBed),
// // // // // //       bedOccupancyPercentage: parseFloat(bedOccupancyPercentage),
// // // // // //       createdAt: new Date().toISOString()
// // // // // //     };
    
// // // // // //     // Update records
// // // // // //     let updatedRecords;
// // // // // //     if (editingId) {
// // // // // //       // Update existing record
// // // // // //       updatedRecords = records.map(record => 
// // // // // //         record.id === editingId ? newRecord : record
// // // // // //       );
// // // // // //       setEditingId(null);
// // // // // //     } else {
// // // // // //       // Add new record
// // // // // //       updatedRecords = [...records, newRecord];
// // // // // //     }
    
// // // // // //     // Save to localStorage
// // // // // //     localStorage.setItem('bedOccupancyRecords', JSON.stringify(updatedRecords));
// // // // // //     setRecords(updatedRecords);
    
// // // // // //     // Reset form
// // // // // //     handleClear();
    
// // // // // //     toast.success(editingId ? "Record updated successfully!" : "Record saved successfully!");
// // // // // //   };
  
// // // // // //   const handleClear = () => {
// // // // // //     setDate("");
// // // // // //     setBedSanctioned("");
// // // // // //     setUtilizedBed("");
// // // // // //     setBedOccupancyPercentage("");
// // // // // //     setYear("");
// // // // // //     setMonth("");
// // // // // //     setDay("");
// // // // // //     setEditingId(null);
// // // // // //   };
  
// // // // // //   const handleDelete = () => {
// // // // // //     if (!editingId) {
// // // // // //       toast.error("No record selected for deletion");
// // // // // //       return;
// // // // // //     }
    
// // // // // //     // Show confirmation dialog
// // // // // //     toast((t) => (
// // // // // //       <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg border border-gray-200">
// // // // // //         <p className="text-lg font-medium mb-4">Are you sure you want to delete this record?</p>
// // // // // //         <div className="flex gap-2">
// // // // // //           <button
// // // // // //             onClick={() => {
// // // // // //               // Delete the record
// // // // // //               const updatedRecords = records.filter(record => record.id !== editingId);
// // // // // //               localStorage.setItem('bedOccupancyRecords', JSON.stringify(updatedRecords));
// // // // // //               setRecords(updatedRecords);
// // // // // //               setEditingId(null);
// // // // // //               handleClear();
// // // // // //               toast.dismiss(t.id);
// // // // // //               toast.success("Record deleted successfully!");
// // // // // //             }}
// // // // // //             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
// // // // // //           >
// // // // // //             Yes
// // // // // //           </button>
// // // // // //           <button
// // // // // //             onClick={() => toast.dismiss(t.id)}
// // // // // //             className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
// // // // // //           >
// // // // // //             No
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     ), {
// // // // // //       duration: Infinity,
// // // // // //       position: "top-center",
// // // // // //     });
// // // // // //   };
  
// // // // // //   const handleEdit = (record: BedOccupancyRecord) => {
// // // // // //     setDate(record.date);
// // // // // //     setBedSanctioned(record.bedSanctioned.toString());
// // // // // //     setUtilizedBed(record.utilizedBed.toString());
// // // // // //     setEditingId(record.id);
    
// // // // // //     // Scroll to form
// // // // // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // // // // //   };
  
// // // // // //   const handleYearChange = (newYear: string) => {
// // // // // //     setSelectedYear(newYear);
// // // // // //   };
  
// // // // // //   // Generate year options (current year and 10 years before)
// // // // // //   const currentYear = new Date().getFullYear();
// // // // // //   const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 10 + i).map(year => year.toString());
  
// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // // // // //       <Toaster position="top-right" />
      
// // // // // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // // // // //         {/* Header */}
// // // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // // // // //             Bed Occupancy Management
// // // // // //           </h1>
// // // // // //           <div className="flex gap-2 sm:gap-3">
// // // // // //             <Button
// // // // // //               onClick={() => router.push("/mtc-user/dashboard/home")}
// // // // // //               variant="outline"
// // // // // //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// // // // // //             >
// // // // // //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // // // // //               <span className="hidden sm:inline">Back to Home</span>
// // // // // //               <span className="sm:hidden">Home</span>
// // // // // //             </Button>
// // // // // //           </div>
// // // // // //         </div>
        
// // // // // //         {/* Form Section */}
// // // // // //         <Card className="shadow-sm border border-gray-200">
// // // // // //           <CardHeader className="pb-2 sm:pb-4" style={{ borderBottom: "1px solid #e5e7eb" }}>
// // // // // //             <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "rgb(11,145,140)" }}>
// // // // // //               Daily Bed Occupancy Entry
// // // // // //             </h2>
// // // // // //           </CardHeader>
          
// // // // // //           <CardContent className="pt-4 sm:pt-6">
// // // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // // // // //               <div>
// // // // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //                   Date
// // // // // //                 </label>
// // // // // //                 <div className="relative">
// // // // // //                   <Input
// // // // // //                     type="date"
// // // // // //                     value={date}
// // // // // //                     onChange={(e) => setDate(e.target.value)}
// // // // // //                     className="pr-8 sm:pr-10"
// // // // // //                   />
// // // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-4 w-4" />
// // // // // //                 </div>
// // // // // //               </div>
              
// // // // // //               <div>
// // // // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //                   Bed Sanctioned
// // // // // //                 </label>
// // // // // //                 <select
// // // // // //                   value={bedSanctioned}
// // // // // //                   onChange={(e) => setBedSanctioned(e.target.value)}
// // // // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // // // // //                 >
// // // // // //                   <option value="">Select</option>
// // // // // //                   <option value="5">5</option>
// // // // // //                   <option value="10">10</option>
// // // // // //                   <option value="15">15</option>
// // // // // //                   <option value="20">20</option>
// // // // // //                   <option value="25">25</option>
// // // // // //                   <option value="30">30</option>
// // // // // //                 </select>
// // // // // //               </div>
              
// // // // // //               <div>
// // // // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //                   Utilized Bed
// // // // // //                 </label>
// // // // // //                 <Input
// // // // // //                   type="number"
// // // // // //                   value={utilizedBed}
// // // // // //                   onChange={(e) => setUtilizedBed(e.target.value)}
// // // // // //                   maxLength={5}
// // // // // //                 />
// // // // // //               </div>
              
// // // // // //               <div>
// // // // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //                   Bed Occupancy %
// // // // // //                 </label>
// // // // // //                 <Input
// // // // // //                   value={bedOccupancyPercentage}
// // // // // //                   readOnly
// // // // // //                   className="bg-gray-50"
// // // // // //                 />
// // // // // //               </div>
// // // // // //             </div>
            
// // // // // //             <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
// // // // // //               {editingId && (
// // // // // //                 <Button
// // // // // //                   onClick={handleDelete}
// // // // // //                   variant="destructive"
// // // // // //                   className="bg-red-600 hover:bg-red-700"
// // // // // //                 >
// // // // // //                   <Trash2 className="mr-2 h-4 w-4" /> Delete
// // // // // //                 </Button>
// // // // // //               )}
// // // // // //               <Button
// // // // // //                 onClick={handleSave}
// // // // // //                 className="bg-indigo-600 hover:bg-indigo-700"
// // // // // //               >
// // // // // //                 <Save className="mr-2 h-4 w-4" /> Save
// // // // // //               </Button>
// // // // // //               <Button
// // // // // //                 onClick={handleClear}
// // // // // //                 variant="outline"
// // // // // //                 className="border-gray-600 text-gray-700 hover:bg-gray-100"
// // // // // //               >
// // // // // //                 <X className="mr-2 h-4 w-4" /> Clear
// // // // // //               </Button>
// // // // // //             </div>
// // // // // //           </CardContent>
// // // // // //         </Card>
        
// // // // // //         {/* Table Section */}
// // // // // //         <Card className="shadow-sm border border-gray-200">
// // // // // //           <CardHeader className="pb-2 sm:pb-4">
// // // // // //             <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "rgb(11,145,140)" }}>
// // // // // //               Daily Bed Occupancy Table
// // // // // //             </h2>
// // // // // //           </CardHeader>
          
// // // // // //           <CardContent>
// // // // // //             <div className="mb-4">
// // // // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //                 Year
// // // // // //               </label>
// // // // // //               <select
// // // // // //                 value={selectedYear}
// // // // // //                 onChange={(e) => handleYearChange(e.target.value)}
// // // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // // // // //               >
// // // // // //                 <option value="">Select Year</option>
// // // // // //                 {yearOptions.map(year => (
// // // // // //                   <option key={year} value={year}>{year}</option>
// // // // // //                 ))}
// // // // // //               </select>
// // // // // //             </div>
            
// // // // // //             <div className="overflow-x-auto">
// // // // // //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // // // // //                 <thead>
// // // // // //                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold"></th>
// // // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">January</th>
// // // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">February</th>
// // // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">March</th>
// // // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">April</th>
// // // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">May</th>
// // // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">June</th>
// // // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">July</th>
// // // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">August</th>
// // // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">September</th>
// // // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">October</th>
// // // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">November</th>
// // // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">December</th>
// // // // // //                   </tr>
// // // // // //                 </thead>
// // // // // //                 <tbody>
// // // // // //                   {dailyData.length > 0 ? (
// // // // // //                     dailyData.map((row, dayIndex) => (
// // // // // //                       <tr key={dayIndex} className={dayIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
// // // // // //                         <th className="py-2 px-2 sm:px-4 font-medium">Day {dayIndex + 1}</th>
// // // // // //                         {row.map((value, monthIndex) => (
// // // // // //                           <td 
// // // // // //                             key={monthIndex} 
// // // // // //                             className="py-2 px-2 sm:px-4 cursor-pointer hover:bg-indigo-50"
// // // // // //                             onClick={() => {
// // // // // //                               if (value > 0) {
// // // // // //                                 // Find the record for this day and month
// // // // // //                                 const record = records.find(r => 
// // // // // //                                   r.year === parseInt(selectedYear) && 
// // // // // //                                   r.month === monthIndex + 1 && 
// // // // // //                                   r.day === dayIndex + 1
// // // // // //                                 );
// // // // // //                                 if (record) {
// // // // // //                                   handleEdit(record);
// // // // // //                                 }
// // // // // //                               }
// // // // // //                             }}
// // // // // //                           >
// // // // // //                             {value > 0 ? `${value.toFixed(2)}` : ""}
// // // // // //                           </td>
// // // // // //                         ))}
// // // // // //                       </tr>
// // // // // //                     ))
// // // // // //                   ) : (
// // // // // //                     <tr>
// // // // // //                       <td colSpan={13} className="py-8 text-center text-gray-500">
// // // // // //                         No data available for the selected year
// // // // // //                       </td>
// // // // // //                     </tr>
// // // // // //                   )}
// // // // // //                 </tbody>
// // // // // //               </table>
// // // // // //             </div>
            
// // // // // //             <div className="mt-6">
// // // // // //               <h3 className="text-lg font-semibold mb-2" style={{ color: "rgb(11,145,140)" }}>
// // // // // //                 Monthly Bed Occupancy Table
// // // // // //               </h3>
// // // // // //               <div className="font-medium mb-2">Year: {selectedYear}</div>
              
// // // // // //               <div className="overflow-x-auto">
// // // // // //                 <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // // // // //                   <thead>
// // // // // //                     <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">Month</th>
// // // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">January</th>
// // // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">February</th>
// // // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">March</th>
// // // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">April</th>
// // // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">May</th>
// // // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">June</th>
// // // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">July</th>
// // // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">August</th>
// // // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">September</th>
// // // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">October</th>
// // // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">November</th>
// // // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">December</th>
// // // // // //                     </tr>
// // // // // //                   </thead>
// // // // // //                   <tbody>
// // // // // //                     <tr className="bg-white">
// // // // // //                       <th className="py-2 px-2 sm:px-4 font-medium">Bed Occupancy%</th>
// // // // // //                       {monthlyData.map((data, index) => (
// // // // // //                         <td key={index} className="py-2 px-2 sm:px-4">
// // // // // //                           {data.occupancy > 0 ? data.occupancy.toFixed(2) : ""}
// // // // // //                         </td>
// // // // // //                       ))}
// // // // // //                     </tr>
// // // // // //                   </tbody>
// // // // // //                 </table>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </CardContent>
// // // // // //         </Card>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // "use client";

// // // // // import { useState, useEffect, useCallback } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // // import { CalendarIcon, Home, Save, Trash2, X, Loader2 } from "lucide-react";
// // // // // import toast, { Toaster } from "react-hot-toast";

// // // // // // Interface matching the transformed API response
// // // // // interface BedOccupancyRecord {
// // // // //   id: string;
// // // // //   date: string;
// // // // //   year: number;
// // // // //   month: number;
// // // // //   day: number;
// // // // //   bedSanctioned: number;
// // // // //   utilizedBed: number;
// // // // //   bedOccupancyPercentage: number;
// // // // //   createdAt: string;
// // // // // }

// // // // // interface MonthlyData {
// // // // //   month: string;
// // // // //   occupancy: number;
// // // // // }

// // // // // export default function BedOccupancyPage() {
// // // // //   const router = useRouter();
  
// // // // //   // TODO: Replace with actual MTC Code from your Auth Context/Session
// // // // //   const mtcCode = "JH/WSB/CBS"; 

// // // // //   // Form state
// // // // //   const [date, setDate] = useState("");
// // // // //   const [bedSanctioned, setBedSanctioned] = useState("");
// // // // //   const [utilizedBed, setUtilizedBed] = useState("");
// // // // //   const [bedOccupancyPercentage, setBedOccupancyPercentage] = useState("");
// // // // //   const [year, setYear] = useState("");
// // // // //   const [month, setMonth] = useState("");
// // // // //   const [day, setDay] = useState("");
  
// // // // //   // Data state
// // // // //   const [records, setRecords] = useState<BedOccupancyRecord[]>([]);
// // // // //   const [dailyData, setDailyData] = useState<number[][]>([]);
// // // // //   const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
// // // // //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
// // // // //   const [editingId, setEditingId] = useState<string | null>(null);
// // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // //   const [isSaving, setIsSaving] = useState(false);

// // // // //   // Memoized generateTableData function
// // // // //   const generateTableData = useCallback((allRecords: BedOccupancyRecord[], year: string) => {
// // // // //     // Initialize daily data array (31 days x 12 months)
// // // // //     const newDailyData: number[][] = Array(31).fill(null).map(() => Array(12).fill(0));
    
// // // // //     // Initialize monthly data array
// // // // //     const newMonthlyData: MonthlyData[] = [
// // // // //       { month: "January", occupancy: 0 },
// // // // //       { month: "February", occupancy: 0 },
// // // // //       { month: "March", occupancy: 0 },
// // // // //       { month: "April", occupancy: 0 },
// // // // //       { month: "May", occupancy: 0 },
// // // // //       { month: "June", occupancy: 0 },
// // // // //       { month: "July", occupancy: 0 },
// // // // //       { month: "August", occupancy: 0 },
// // // // //       { month: "September", occupancy: 0 },
// // // // //       { month: "October", occupancy: 0 },
// // // // //       { month: "November", occupancy: 0 },
// // // // //       { month: "December", occupancy: 0 }
// // // // //     ];
    
// // // // //     // Filter records for the selected year
// // // // //     const yearRecords = allRecords.filter(record => record.year === parseInt(year));
    
// // // // //     // Populate daily data and calculate monthly totals
// // // // //     yearRecords.forEach(record => {
// // // // //       const dayIndex = record.day - 1;
// // // // //       const monthIndex = record.month - 1;
      
// // // // //       if (dayIndex >= 0 && dayIndex < 31 && monthIndex >= 0 && monthIndex < 12) {
// // // // //         newDailyData[dayIndex][monthIndex] = record.bedOccupancyPercentage;
// // // // //         newMonthlyData[monthIndex].occupancy += record.bedOccupancyPercentage;
// // // // //       }
// // // // //     });
    
// // // // //     // Calculate monthly averages
// // // // //     newMonthlyData.forEach((monthData, monthIndex) => {
// // // // //       const daysInMonth = new Date(parseInt(year), monthIndex + 1, 0).getDate();
// // // // //       // Filter records specifically for this month to get accurate count of entries if needed
// // // // //       // Currently using daysInMonth for simple daily average over the whole month
// // // // //       const monthRecords = yearRecords.filter(record => record.month === monthIndex + 1);
      
// // // // //       if (monthRecords.length > 0) {
// // // // //         // Average based on days in month or entries? Usually days in month for occupancy
// // // // //         monthData.occupancy = monthData.occupancy / daysInMonth;
// // // // //       }
// // // // //     });
    
// // // // //     setDailyData(newDailyData);
// // // // //     setMonthlyData(newMonthlyData);
// // // // //   }, []);

// // // // //   // Fetch data from API
// // // // //   const fetchRecords = useCallback(async () => {
// // // // //     try {
// // // // //       setIsLoading(true);
// // // // //       const res = await fetch(`/api/bed-occupancy?year=${selectedYear}&mtcCode=${mtcCode}`);
      
// // // // //       if (!res.ok) throw new Error("Failed to fetch records");
      
// // // // //       const data: BedOccupancyRecord[] = await res.json();
// // // // //       setRecords(data);
// // // // //       generateTableData(data, selectedYear);
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //       toast.error("Could not load bed occupancy data.");
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   }, [selectedYear, generateTableData, mtcCode]);

// // // // //   // Load data on component mount or year change
// // // // //   useEffect(() => {
// // // // //     fetchRecords();
// // // // //   }, [fetchRecords]);

// // // // //   // Calculate bed occupancy percentage
// // // // //   useEffect(() => {
// // // // //     if (bedSanctioned && utilizedBed) {
// // // // //       const percentage = (parseFloat(utilizedBed) / parseFloat(bedSanctioned)) * 100;
// // // // //       setBedOccupancyPercentage(percentage.toFixed(2));
// // // // //     } else {
// // // // //       setBedOccupancyPercentage("");
// // // // //     }
// // // // //   }, [bedSanctioned, utilizedBed]);

// // // // //   // Extract year, month, day from date
// // // // //   useEffect(() => {
// // // // //     if (date) {
// // // // //       const dateObj = new Date(date);
// // // // //       setYear(dateObj.getFullYear().toString());
// // // // //       setMonth((dateObj.getMonth() + 1).toString());
// // // // //       setDay(dateObj.getDate().toString());
// // // // //     } else {
// // // // //       setYear("");
// // // // //       setMonth("");
// // // // //       setDay("");
// // // // //     }
// // // // //   }, [date]);

// // // // //   const handleSave = async () => {
// // // // //     // Validate form
// // // // //     if (!date || !bedSanctioned || !utilizedBed) {
// // // // //       toast.error("Please fill all required fields");
// // // // //       return;
// // // // //     }
    
// // // // //     try {
// // // // //       setIsSaving(true);
      
// // // // //       const payload = {
// // // // //         mtcCode,
// // // // //         date,
// // // // //         bedSanctioned,
// // // // //         utilizedBed,
// // // // //         bedOccupancyPercentage
// // // // //       };

// // // // //       const res = await fetch('/api/bed-occupancy', {
// // // // //         method: 'POST',
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //         body: JSON.stringify(payload)
// // // // //       });

// // // // //       if (!res.ok) throw new Error("Failed to save");

// // // // //       const responseData = await res.json();
      
// // // // //       toast.success(editingId ? "Record updated successfully!" : "Record saved successfully!");
      
// // // // //       // Reset form and reload table
// // // // //       handleClear();
// // // // //       fetchRecords();

// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //       toast.error("Failed to save record.");
// // // // //     } finally {
// // // // //       setIsSaving(false);
// // // // //     }
// // // // //   };
  
// // // // //   const handleClear = () => {
// // // // //     setDate("");
// // // // //     setBedSanctioned("");
// // // // //     setUtilizedBed("");
// // // // //     setBedOccupancyPercentage("");
// // // // //     setYear("");
// // // // //     setMonth("");
// // // // //     setDay("");
// // // // //     setEditingId(null);
// // // // //   };
  
// // // // //   const handleEdit = (record: BedOccupancyRecord) => {
// // // // //     // Convert date string to YYYY-MM-DD for input
// // // // //     const dateObj = new Date(record.date);
// // // // //     const formattedDate = dateObj.toISOString().split('T')[0];

// // // // //     setDate(formattedDate);
// // // // //     setBedSanctioned(record.bedSanctioned.toString());
// // // // //     setUtilizedBed(record.utilizedBed.toString());
// // // // //     setEditingId(record.id);
    
// // // // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // // // //   };
  
// // // // //   const handleYearChange = (newYear: string) => {
// // // // //     setSelectedYear(newYear);
// // // // //   };
  
// // // // //   const currentYear = new Date().getFullYear();
// // // // //   const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 10 + i).map(year => year.toString());
  
// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // // // //       <Toaster position="top-right" />
      
// // // // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // // // //         {/* Header */}
// // // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // // // //             Bed Occupancy Management
// // // // //           </h1>
// // // // //           <div className="flex gap-2 sm:gap-3">
// // // // //             <Button
// // // // //               onClick={() => router.push("/mtc-user/dashboard/home")}
// // // // //               variant="outline"
// // // // //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// // // // //             >
// // // // //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // // // //               <span className="hidden sm:inline">Back to Home</span>
// // // // //               <span className="sm:hidden">Home</span>
// // // // //             </Button>
// // // // //           </div>
// // // // //         </div>
        
// // // // //         {/* Form Section */}
// // // // //         <Card className="shadow-sm border border-gray-200">
// // // // //           <CardHeader className="pb-2 sm:pb-4" style={{ borderBottom: "1px solid #e5e7eb" }}>
// // // // //             <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "rgb(11,145,140)" }}>
// // // // //               Daily Bed Occupancy Entry
// // // // //             </h2>
// // // // //           </CardHeader>
          
// // // // //           <CardContent className="pt-4 sm:pt-6">
// // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // //                   Date
// // // // //                 </label>
// // // // //                 <div className="relative">
// // // // //                   <Input
// // // // //                     type="date"
// // // // //                     value={date}
// // // // //                     onChange={(e) => setDate(e.target.value)}
// // // // //                     className="pr-8 sm:pr-10"
// // // // //                   />
// // // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-4 w-4" />
// // // // //                 </div>
// // // // //               </div>
              
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // //                   Bed Sanctioned
// // // // //                 </label>
// // // // //                 <select
// // // // //                   value={bedSanctioned}
// // // // //                   onChange={(e) => setBedSanctioned(e.target.value)}
// // // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // // // //                 >
// // // // //                   <option value="">Select</option>
// // // // //                   <option value="5">5</option>
// // // // //                   <option value="10">10</option>
// // // // //                   <option value="15">15</option>
// // // // //                   <option value="20">20</option>
// // // // //                   <option value="25">25</option>
// // // // //                   <option value="30">30</option>
// // // // //                 </select>
// // // // //               </div>
              
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // //                   Utilized Bed
// // // // //                 </label>
// // // // //                 <Input
// // // // //                   type="number"
// // // // //                   value={utilizedBed}
// // // // //                   onChange={(e) => setUtilizedBed(e.target.value)}
// // // // //                   maxLength={5}
// // // // //                 />
// // // // //               </div>
              
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // //                   Bed Occupancy %
// // // // //                 </label>
// // // // //                 <Input
// // // // //                   value={bedOccupancyPercentage}
// // // // //                   readOnly
// // // // //                   className="bg-gray-50"
// // // // //                 />
// // // // //               </div>
// // // // //             </div>
            
// // // // //             <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
// // // // //               <Button
// // // // //                 onClick={handleSave}
// // // // //                 disabled={isSaving}
// // // // //                 className="bg-indigo-600 hover:bg-indigo-700"
// // // // //               >
// // // // //                 {isSaving ? (
// // // // //                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
// // // // //                 ) : (
// // // // //                   <Save className="mr-2 h-4 w-4" /> 
// // // // //                 )}
// // // // //                 Save
// // // // //               </Button>
// // // // //               <Button
// // // // //                 onClick={handleClear}
// // // // //                 variant="outline"
// // // // //                 className="border-gray-600 text-gray-700 hover:bg-gray-100"
// // // // //               >
// // // // //                 <X className="mr-2 h-4 w-4" /> Clear
// // // // //               </Button>
// // // // //             </div>
// // // // //           </CardContent>
// // // // //         </Card>
        
// // // // //         {/* Table Section */}
// // // // //         <Card className="shadow-sm border border-gray-200">
// // // // //           <CardHeader className="pb-2 sm:pb-4">
// // // // //             <div className="flex justify-between items-center">
// // // // //               <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "rgb(11,145,140)" }}>
// // // // //                 Daily Bed Occupancy Table
// // // // //               </h2>
// // // // //               {isLoading && <Loader2 className="h-5 w-5 animate-spin text-gray-500" />}
// // // // //             </div>
// // // // //           </CardHeader>
          
// // // // //           <CardContent>
// // // // //             <div className="mb-4">
// // // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // //                 Year
// // // // //               </label>
// // // // //               <select
// // // // //                 value={selectedYear}
// // // // //                 onChange={(e) => handleYearChange(e.target.value)}
// // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // // // //               >
// // // // //                 <option value="">Select Year</option>
// // // // //                 {yearOptions.map(year => (
// // // // //                   <option key={year} value={year}>{year}</option>
// // // // //                 ))}
// // // // //               </select>
// // // // //             </div>
            
// // // // //             <div className="overflow-x-auto">
// // // // //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // // // //                 <thead>
// // // // //                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold"></th>
// // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">January</th>
// // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">February</th>
// // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">March</th>
// // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">April</th>
// // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">May</th>
// // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">June</th>
// // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">July</th>
// // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">August</th>
// // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">September</th>
// // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">October</th>
// // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">November</th>
// // // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">December</th>
// // // // //                   </tr>
// // // // //                 </thead>
// // // // //                 <tbody>
// // // // //                   {dailyData.length > 0 ? (
// // // // //                     dailyData.map((row, dayIndex) => (
// // // // //                       <tr key={dayIndex} className={dayIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
// // // // //                         <th className="py-2 px-2 sm:px-4 font-medium">Day {dayIndex + 1}</th>
// // // // //                         {row.map((value, monthIndex) => (
// // // // //                           <td 
// // // // //                             key={monthIndex} 
// // // // //                             className="py-2 px-2 sm:px-4 cursor-pointer hover:bg-indigo-50"
// // // // //                             onClick={() => {
// // // // //                               if (value > 0) {
// // // // //                                 const record = records.find(r => 
// // // // //                                   r.year === parseInt(selectedYear) && 
// // // // //                                   r.month === monthIndex + 1 && 
// // // // //                                   r.day === dayIndex + 1
// // // // //                                 );
// // // // //                                 if (record) handleEdit(record);
// // // // //                               }
// // // // //                             }}
// // // // //                           >
// // // // //                             {value > 0 ? `${value.toFixed(2)}` : ""}
// // // // //                           </td>
// // // // //                         ))}
// // // // //                       </tr>
// // // // //                     ))
// // // // //                   ) : (
// // // // //                     <tr>
// // // // //                       <td colSpan={13} className="py-8 text-center text-gray-500">
// // // // //                         No data available for the selected year
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   )}
// // // // //                 </tbody>
// // // // //               </table>
// // // // //             </div>
            
// // // // //             <div className="mt-6">
// // // // //               <h3 className="text-lg font-semibold mb-2" style={{ color: "rgb(11,145,140)" }}>
// // // // //                 Monthly Bed Occupancy Table
// // // // //               </h3>
// // // // //               <div className="font-medium mb-2">Year: {selectedYear}</div>
              
// // // // //               <div className="overflow-x-auto">
// // // // //                 <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // // // //                   <thead>
// // // // //                     <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">Month</th>
// // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">January</th>
// // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">February</th>
// // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">March</th>
// // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">April</th>
// // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">May</th>
// // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">June</th>
// // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">July</th>
// // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">August</th>
// // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">September</th>
// // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">October</th>
// // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">November</th>
// // // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">December</th>
// // // // //                     </tr>
// // // // //                   </thead>
// // // // //                   <tbody>
// // // // //                     <tr className="bg-white">
// // // // //                       <th className="py-2 px-2 sm:px-4 font-medium">Bed Occupancy%</th>
// // // // //                       {monthlyData.map((data, index) => (
// // // // //                         <td key={index} className="py-2 px-2 sm:px-4">
// // // // //                           {data.occupancy > 0 ? data.occupancy.toFixed(2) : ""}
// // // // //                         </td>
// // // // //                       ))}
// // // // //                     </tr>
// // // // //                   </tbody>
// // // // //                 </table>
// // // // //               </div>
// // // // //             </div>
// // // // //           </CardContent>
// // // // //         </Card>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // "use client";

// // // // import { useState, useEffect, useCallback } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // import { CalendarIcon, Home, Save, X, Loader2 } from "lucide-react"; // Removed Trash2
// // // // import toast, { Toaster } from "react-hot-toast";

// // // // // Interface matching the transformed API response
// // // // interface BedOccupancyRecord {
// // // //   id: string;
// // // //   date: string;
// // // //   year: number;
// // // //   month: number;
// // // //   day: number;
// // // //   bedSanctioned: number;
// // // //   utilizedBed: number;
// // // //   bedOccupancyPercentage: number;
// // // //   createdAt: string;
// // // // }

// // // // interface MonthlyData {
// // // //   month: string;
// // // //   occupancy: number;
// // // // }

// // // // export default function BedOccupancyPage() {
// // // //   const router = useRouter();
  
// // // //   // TODO: Replace with actual MTC Code from your Auth Context/Session
// // // //   const mtcCode = "JH/WSB/CBS"; 

// // // //   // Form state
// // // //   const [date, setDate] = useState("");
// // // //   const [bedSanctioned, setBedSanctioned] = useState("");
// // // //   const [utilizedBed, setUtilizedBed] = useState("");
// // // //   const [bedOccupancyPercentage, setBedOccupancyPercentage] = useState("");
// // // //   // Removed unused state variables: year, month, day
  
// // // //   // Data state
// // // //   const [records, setRecords] = useState<BedOccupancyRecord[]>([]);
// // // //   const [dailyData, setDailyData] = useState<number[][]>([]);
// // // //   const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
// // // //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
// // // //   const [editingId, setEditingId] = useState<string | null>(null);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [isSaving, setIsSaving] = useState(false);

// // // //   // Memoized generateTableData function
// // // //   const generateTableData = useCallback((allRecords: BedOccupancyRecord[], year: string) => {
// // // //     // Initialize daily data array (31 days x 12 months)
// // // //     const newDailyData: number[][] = Array(31).fill(null).map(() => Array(12).fill(0));
    
// // // //     // Initialize monthly data array
// // // //     const newMonthlyData: MonthlyData[] = [
// // // //       { month: "January", occupancy: 0 },
// // // //       { month: "February", occupancy: 0 },
// // // //       { month: "March", occupancy: 0 },
// // // //       { month: "April", occupancy: 0 },
// // // //       { month: "May", occupancy: 0 },
// // // //       { month: "June", occupancy: 0 },
// // // //       { month: "July", occupancy: 0 },
// // // //       { month: "August", occupancy: 0 },
// // // //       { month: "September", occupancy: 0 },
// // // //       { month: "October", occupancy: 0 },
// // // //       { month: "November", occupancy: 0 },
// // // //       { month: "December", occupancy: 0 }
// // // //     ];
    
// // // //     // Filter records for the selected year
// // // //     const yearRecords = allRecords.filter(record => record.year === parseInt(year));
    
// // // //     // Populate daily data and calculate monthly totals
// // // //     yearRecords.forEach(record => {
// // // //       const dayIndex = record.day - 1;
// // // //       const monthIndex = record.month - 1;
      
// // // //       if (dayIndex >= 0 && dayIndex < 31 && monthIndex >= 0 && monthIndex < 12) {
// // // //         newDailyData[dayIndex][monthIndex] = record.bedOccupancyPercentage;
// // // //         newMonthlyData[monthIndex].occupancy += record.bedOccupancyPercentage;
// // // //       }
// // // //     });
    
// // // //     // Calculate monthly averages
// // // //     newMonthlyData.forEach((monthData, monthIndex) => {
// // // //       const daysInMonth = new Date(parseInt(year), monthIndex + 1, 0).getDate();
// // // //       const monthRecords = yearRecords.filter(record => record.month === monthIndex + 1);
      
// // // //       if (monthRecords.length > 0) {
// // // //         monthData.occupancy = monthData.occupancy / daysInMonth;
// // // //       }
// // // //     });
    
// // // //     setDailyData(newDailyData);
// // // //     setMonthlyData(newMonthlyData);
// // // //   }, []);

// // // //   // Fetch data from API
// // // //   const fetchRecords = useCallback(async () => {
// // // //     try {
// // // //       setIsLoading(true);
// // // //       const res = await fetch(`/api/bed-occupancy?year=${selectedYear}&mtcCode=${mtcCode}`);
      
// // // //       if (!res.ok) throw new Error("Failed to fetch records");
      
// // // //       const data: BedOccupancyRecord[] = await res.json();
// // // //       setRecords(data);
// // // //       generateTableData(data, selectedYear);
// // // //     } catch (error) {
// // // //       console.error(error);
// // // //       toast.error("Could not load bed occupancy data.");
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   }, [selectedYear, generateTableData, mtcCode]);

// // // //   // Load data on component mount or year change
// // // //   useEffect(() => {
// // // //     fetchRecords();
// // // //   }, [fetchRecords]);

// // // //   // Calculate bed occupancy percentage
// // // //   useEffect(() => {
// // // //     if (bedSanctioned && utilizedBed) {
// // // //       const percentage = (parseFloat(utilizedBed) / parseFloat(bedSanctioned)) * 100;
// // // //       setBedOccupancyPercentage(percentage.toFixed(2));
// // // //     } else {
// // // //       setBedOccupancyPercentage("");
// // // //     }
// // // //   }, [bedSanctioned, utilizedBed]);

// // // //   // Removed useEffect for extracting year/month/day as they were unused state variables

// // // //   const handleSave = async () => {
// // // //     // Validate form
// // // //     if (!date || !bedSanctioned || !utilizedBed) {
// // // //       toast.error("Please fill all required fields");
// // // //       return;
// // // //     }
    
// // // //     try {
// // // //       setIsSaving(true);
      
// // // //       const payload = {
// // // //         mtcCode,
// // // //         date,
// // // //         bedSanctioned,
// // // //         utilizedBed,
// // // //         bedOccupancyPercentage
// // // //       };

// // // //       const res = await fetch('/api/bed-occupancy', {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify(payload)
// // // //       });

// // // //       if (!res.ok) throw new Error("Failed to save");

// // // //       await res.json(); // Consumed but not assigned to variable
      
// // // //       toast.success(editingId ? "Record updated successfully!" : "Record saved successfully!");
      
// // // //       // Reset form and reload table
// // // //       handleClear();
// // // //       fetchRecords();

// // // //     } catch (error) {
// // // //       console.error(error);
// // // //       toast.error("Failed to save record.");
// // // //     } finally {
// // // //       setIsSaving(false);
// // // //     }
// // // //   };
  
// // // //   const handleClear = () => {
// // // //     setDate("");
// // // //     setBedSanctioned("");
// // // //     setUtilizedBed("");
// // // //     setBedOccupancyPercentage("");
// // // //     setEditingId(null);
// // // //   };
  
// // // //   const handleEdit = (record: BedOccupancyRecord) => {
// // // //     // Convert date string to YYYY-MM-DD for input
// // // //     const dateObj = new Date(record.date);
// // // //     const formattedDate = dateObj.toISOString().split('T')[0];

// // // //     setDate(formattedDate);
// // // //     setBedSanctioned(record.bedSanctioned.toString());
// // // //     setUtilizedBed(record.utilizedBed.toString());
// // // //     setEditingId(record.id);
    
// // // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // // //   };
  
// // // //   const handleYearChange = (newYear: string) => {
// // // //     setSelectedYear(newYear);
// // // //   };
  
// // // //   const currentYear = new Date().getFullYear();
// // // //   const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 10 + i).map(year => year.toString());
  
// // // //   return (
// // // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // // //       <Toaster position="top-right" />
      
// // // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // // //         {/* Header */}
// // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // // //             Bed Occupancy Management
// // // //           </h1>
// // // //           <div className="flex gap-2 sm:gap-3">
// // // //             <Button
// // // //               onClick={() => router.push("/mtc-user/dashboard/home")}
// // // //               variant="outline"
// // // //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// // // //             >
// // // //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // // //               <span className="hidden sm:inline">Back to Home</span>
// // // //               <span className="sm:hidden">Home</span>
// // // //             </Button>
// // // //           </div>
// // // //         </div>
        
// // // //         {/* Form Section */}
// // // //         <Card className="shadow-sm border border-gray-200">
// // // //           <CardHeader className="pb-2 sm:pb-4" style={{ borderBottom: "1px solid #e5e7eb" }}>
// // // //             <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "rgb(11,145,140)" }}>
// // // //               Daily Bed Occupancy Entry
// // // //             </h2>
// // // //           </CardHeader>
          
// // // //           <CardContent className="pt-4 sm:pt-6">
// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                   Date
// // // //                 </label>
// // // //                 <div className="relative">
// // // //                   <Input
// // // //                     type="date"
// // // //                     value={date}
// // // //                     onChange={(e) => setDate(e.target.value)}
// // // //                     className="pr-8 sm:pr-10"
// // // //                   />
// // // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-4 w-4" />
// // // //                 </div>
// // // //               </div>
              
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                   Bed Sanctioned
// // // //                 </label>
// // // //                 <select
// // // //                   value={bedSanctioned}
// // // //                   onChange={(e) => setBedSanctioned(e.target.value)}
// // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // // //                 >
// // // //                   <option value="">Select</option>
// // // //                   <option value="5">5</option>
// // // //                   <option value="10">10</option>
// // // //                   <option value="15">15</option>
// // // //                   <option value="20">20</option>
// // // //                   <option value="25">25</option>
// // // //                   <option value="30">30</option>
// // // //                 </select>
// // // //               </div>
              
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                   Utilized Bed
// // // //                 </label>
// // // //                 <Input
// // // //                   type="number"
// // // //                   value={utilizedBed}
// // // //                   onChange={(e) => setUtilizedBed(e.target.value)}
// // // //                   maxLength={5}
// // // //                 />
// // // //               </div>
              
// // // //               <div>
// // // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                   Bed Occupancy %
// // // //                 </label>
// // // //                 <Input
// // // //                   value={bedOccupancyPercentage}
// // // //                   readOnly
// // // //                   className="bg-gray-50"
// // // //                 />
// // // //               </div>
// // // //             </div>
            
// // // //             <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
// // // //               <Button
// // // //                 onClick={handleSave}
// // // //                 disabled={isSaving}
// // // //                 className="bg-indigo-600 hover:bg-indigo-700"
// // // //               >
// // // //                 {isSaving ? (
// // // //                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
// // // //                 ) : (
// // // //                   <Save className="mr-2 h-4 w-4" /> 
// // // //                 )}
// // // //                 Save
// // // //               </Button>
// // // //               <Button
// // // //                 onClick={handleClear}
// // // //                 variant="outline"
// // // //                 className="border-gray-600 text-gray-700 hover:bg-gray-100"
// // // //               >
// // // //                 <X className="mr-2 h-4 w-4" /> Clear
// // // //               </Button>
// // // //             </div>
// // // //           </CardContent>
// // // //         </Card>
        
// // // //         {/* Table Section */}
// // // //         <Card className="shadow-sm border border-gray-200">
// // // //           <CardHeader className="pb-2 sm:pb-4">
// // // //             <div className="flex justify-between items-center">
// // // //               <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "rgb(11,145,140)" }}>
// // // //                 Daily Bed Occupancy Table
// // // //               </h2>
// // // //               {isLoading && <Loader2 className="h-5 w-5 animate-spin text-gray-500" />}
// // // //             </div>
// // // //           </CardHeader>
          
// // // //           <CardContent>
// // // //             <div className="mb-4">
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                 Year
// // // //               </label>
// // // //               <select
// // // //                 value={selectedYear}
// // // //                 onChange={(e) => handleYearChange(e.target.value)}
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // // //               >
// // // //                 <option value="">Select Year</option>
// // // //                 {yearOptions.map(year => (
// // // //                   <option key={year} value={year}>{year}</option>
// // // //                 ))}
// // // //               </select>
// // // //             </div>
            
// // // //             <div className="overflow-x-auto">
// // // //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // // //                 <thead>
// // // //                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold"></th>
// // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">January</th>
// // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">February</th>
// // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">March</th>
// // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">April</th>
// // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">May</th>
// // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">June</th>
// // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">July</th>
// // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">August</th>
// // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">September</th>
// // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">October</th>
// // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">November</th>
// // // //                     <th className="py-2 px-2 sm:px-4 text-left font-semibold">December</th>
// // // //                   </tr>
// // // //                 </thead>
// // // //                 <tbody>
// // // //                   {dailyData.length > 0 ? (
// // // //                     dailyData.map((row, dayIndex) => (
// // // //                       <tr key={dayIndex} className={dayIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
// // // //                         <th className="py-2 px-2 sm:px-4 font-medium">Day {dayIndex + 1}</th>
// // // //                         {row.map((value, monthIndex) => (
// // // //                           <td 
// // // //                             key={monthIndex} 
// // // //                             className="py-2 px-2 sm:px-4 cursor-pointer hover:bg-indigo-50"
// // // //                             onClick={() => {
// // // //                               if (value > 0) {
// // // //                                 const record = records.find(r => 
// // // //                                   r.year === parseInt(selectedYear) && 
// // // //                                   r.month === monthIndex + 1 && 
// // // //                                   r.day === dayIndex + 1
// // // //                                 );
// // // //                                 if (record) handleEdit(record);
// // // //                               }
// // // //                             }}
// // // //                           >
// // // //                             {value > 0 ? `${value.toFixed(2)}` : ""}
// // // //                           </td>
// // // //                         ))}
// // // //                       </tr>
// // // //                     ))
// // // //                   ) : (
// // // //                     <tr>
// // // //                       <td colSpan={13} className="py-8 text-center text-gray-500">
// // // //                         No data available for the selected year
// // // //                       </td>
// // // //                     </tr>
// // // //                   )}
// // // //                 </tbody>
// // // //               </table>
// // // //             </div>
            
// // // //             <div className="mt-6">
// // // //               <h3 className="text-lg font-semibold mb-2" style={{ color: "rgb(11,145,140)" }}>
// // // //                 Monthly Bed Occupancy Table
// // // //               </h3>
// // // //               <div className="font-medium mb-2">Year: {selectedYear}</div>
              
// // // //               <div className="overflow-x-auto">
// // // //                 <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // // //                   <thead>
// // // //                     <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">Month</th>
// // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">January</th>
// // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">February</th>
// // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">March</th>
// // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">April</th>
// // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">May</th>
// // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">June</th>
// // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">July</th>
// // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">August</th>
// // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">September</th>
// // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">October</th>
// // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">November</th>
// // // //                       <th className="py-2 px-2 sm:px-4 text-left font-semibold">December</th>
// // // //                     </tr>
// // // //                   </thead>
// // // //                   <tbody>
// // // //                     <tr className="bg-white">
// // // //                       <th className="py-2 px-2 sm:px-4 font-medium">Bed Occupancy%</th>
// // // //                       {monthlyData.map((data, index) => (
// // // //                         <td key={index} className="py-2 px-2 sm:px-4">
// // // //                           {data.occupancy > 0 ? data.occupancy.toFixed(2) : ""}
// // // //                         </td>
// // // //                       ))}
// // // //                     </tr>
// // // //                   </tbody>
// // // //                 </table>
// // // //               </div>
// // // //             </div>
// // // //           </CardContent>
// // // //         </Card>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import { useState, useEffect, useCallback } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // import { CalendarIcon, Home, Save, X, Loader2 } from "lucide-react";
// // // import toast, { Toaster } from "react-hot-toast";

// // // // Interface matching the local storage record
// // // interface BedOccupancyRecord {
// // //   id: string;
// // //   date: string;
// // //   year: number;
// // //   month: number;
// // //   day: number;
// // //   bedSanctioned: number;
// // //   utilizedBed: number;
// // //   bedOccupancyPercentage: number;
// // //   createdAt: string;
// // // }

// // // interface MonthlyData {
// // //   month: string;
// // //   occupancy: number;
// // // }

// // // const LOCAL_STORAGE_KEY = "mtc_bed_occupancy_data";

// // // export default function BedOccupancyPage() {
// // //   const router = useRouter();

// // //   // Form state
// // //   const [date, setDate] = useState("");
// // //   const [bedSanctioned, setBedSanctioned] = useState("");
// // //   const [utilizedBed, setUtilizedBed] = useState("");
// // //   const [bedOccupancyPercentage, setBedOccupancyPercentage] = useState("");
  
// // //   // Data state
// // //   const [records, setRecords] = useState<BedOccupancyRecord[]>([]);
// // //   const [dailyData, setDailyData] = useState<number[][]>([]);
// // //   const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
// // //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
// // //   const [editingId, setEditingId] = useState<string | null>(null);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [isSaving, setIsSaving] = useState(false);

// // //   // Memoized generateTableData function
// // //   const generateTableData = useCallback((allRecords: BedOccupancyRecord[], year: string) => {
// // //     // Initialize daily data array (31 days x 12 months)
// // //     const newDailyData: number[][] = Array(31).fill(null).map(() => Array(12).fill(0));
    
// // //     // Initialize monthly data array
// // //     const newMonthlyData: MonthlyData[] = [
// // //       { month: "January", occupancy: 0 },
// // //       { month: "February", occupancy: 0 },
// // //       { month: "March", occupancy: 0 },
// // //       { month: "April", occupancy: 0 },
// // //       { month: "May", occupancy: 0 },
// // //       { month: "June", occupancy: 0 },
// // //       { month: "July", occupancy: 0 },
// // //       { month: "August", occupancy: 0 },
// // //       { month: "September", occupancy: 0 },
// // //       { month: "October", occupancy: 0 },
// // //       { month: "November", occupancy: 0 },
// // //       { month: "December", occupancy: 0 }
// // //     ];
    
// // //     // Filter records for the selected year
// // //     const yearRecords = allRecords.filter(record => record.year === parseInt(year));
    
// // //     // Populate daily data and calculate monthly totals
// // //     yearRecords.forEach(record => {
// // //       const dayIndex = record.day - 1;
// // //       const monthIndex = record.month - 1;
      
// // //       if (dayIndex >= 0 && dayIndex < 31 && monthIndex >= 0 && monthIndex < 12) {
// // //         newDailyData[dayIndex][monthIndex] = record.bedOccupancyPercentage;
// // //         newMonthlyData[monthIndex].occupancy += record.bedOccupancyPercentage;
// // //       }
// // //     });
    
// // //     // Calculate monthly averages
// // //     newMonthlyData.forEach((monthData, monthIndex) => {
// // //       const daysInMonth = new Date(parseInt(year), monthIndex + 1, 0).getDate();
// // //       const monthRecords = yearRecords.filter(record => record.month === monthIndex + 1);
      
// // //       if (monthRecords.length > 0) {
// // //         monthData.occupancy = monthData.occupancy / daysInMonth;
// // //       }
// // //     });
    
// // //     setDailyData(newDailyData);
// // //     setMonthlyData(newMonthlyData);
// // //   }, []);

// // //   // Fetch data from Local Storage
// // //   const fetchRecords = useCallback(async () => {
// // //     try {
// // //       setIsLoading(true);
// // //       // Slight delay to mimic network request for smoother UX
// // //       await new Promise(resolve => setTimeout(resolve, 200));
      
// // //       const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
// // //       const data: BedOccupancyRecord[] = storedData ? JSON.parse(storedData) : [];
      
// // //       setRecords(data);
// // //       generateTableData(data, selectedYear);
// // //     } catch (error) {
// // //       console.error(error);
// // //       toast.error("Could not load bed occupancy data.");
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   }, [selectedYear, generateTableData]);

// // //   // Load data on component mount or year change
// // //   useEffect(() => {
// // //     fetchRecords();
// // //   }, [fetchRecords]);

// // //   // Calculate bed occupancy percentage
// // //   useEffect(() => {
// // //     if (bedSanctioned && utilizedBed) {
// // //       const percentage = (parseFloat(utilizedBed) / parseFloat(bedSanctioned)) * 100;
// // //       setBedOccupancyPercentage(percentage.toFixed(2));
// // //     } else {
// // //       setBedOccupancyPercentage("");
// // //     }
// // //   }, [bedSanctioned, utilizedBed]);

// // //   const handleSave = async () => {
// // //     // Validate form
// // //     if (!date || !bedSanctioned || !utilizedBed) {
// // //       toast.error("Please fill all required fields");
// // //       return;
// // //     }
    
// // //     try {
// // //       setIsSaving(true);
// // //       // Slight delay to mimic network saving
// // //       await new Promise(resolve => setTimeout(resolve, 300));
      
// // //       // Parse date to extract year, month, day for the table mapping
// // //       const dateObj = new Date(date);
// // //       const year = dateObj.getFullYear();
// // //       const month = dateObj.getMonth() + 1; // getMonth is 0-indexed
// // //       const day = dateObj.getDate();

// // //       const newRecord: BedOccupancyRecord = {
// // //         id: editingId || crypto.randomUUID(), // Generate a unique ID if it's new
// // //         date,
// // //         year,
// // //         month,
// // //         day,
// // //         bedSanctioned: parseFloat(bedSanctioned),
// // //         utilizedBed: parseFloat(utilizedBed),
// // //         bedOccupancyPercentage: parseFloat(bedOccupancyPercentage),
// // //         createdAt: new Date().toISOString()
// // //       };

// // //       // Get existing records
// // //       const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
// // //       let allRecords: BedOccupancyRecord[] = storedData ? JSON.parse(storedData) : [];

// // //       if (editingId) {
// // //         // Update existing record
// // //         allRecords = allRecords.map(r => r.id === editingId ? newRecord : r);
// // //         toast.success("Record updated successfully!");
// // //       } else {
// // //         // If adding a new record, check if one already exists for this date to prevent duplicates
// // //         const existingIndex = allRecords.findIndex(r => r.date === date);
// // //         if (existingIndex >= 0) {
// // //             newRecord.id = allRecords[existingIndex].id; // Retain old ID
// // //             allRecords[existingIndex] = newRecord; // Overwrite
// // //             toast.success("Existing record for this date was overwritten.");
// // //         } else {
// // //             allRecords.push(newRecord);
// // //             toast.success("Record saved successfully!");
// // //         }
// // //       }

// // //       // Save to local storage
// // //       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allRecords));
      
// // //       // Reset form and reload table
// // //       handleClear();
// // //       fetchRecords();

// // //     } catch (error) {
// // //       console.error(error);
// // //       toast.error("Failed to save record.");
// // //     } finally {
// // //       setIsSaving(false);
// // //     }
// // //   };
  
// // //   const handleClear = () => {
// // //     setDate("");
// // //     setBedSanctioned("");
// // //     setUtilizedBed("");
// // //     setBedOccupancyPercentage("");
// // //     setEditingId(null);
// // //   };
  
// // //   const handleEdit = (record: BedOccupancyRecord) => {
// // //     // Convert date string to YYYY-MM-DD for input
// // //     const dateObj = new Date(record.date);
// // //     const formattedDate = dateObj.toISOString().split('T')[0];

// // //     setDate(formattedDate);
// // //     setBedSanctioned(record.bedSanctioned.toString());
// // //     setUtilizedBed(record.utilizedBed.toString());
// // //     setEditingId(record.id);
    
// // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // //   };
  
// // //   const handleYearChange = (newYear: string) => {
// // //     setSelectedYear(newYear);
// // //   };
  
// // //   const currentYear = new Date().getFullYear();
// // //   const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 10 + i).map(year => year.toString());
  
// // //   return (
// // //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// // //       <Toaster position="top-right" />
      
// // //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// // //         {/* Header */}
// // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// // //             Bed Occupancy Management
// // //           </h1>
// // //           <div className="flex gap-2 sm:gap-3">
// // //             <Button
// // //               onClick={() => router.push("/mtc-user/dashboard/home")}
// // //               variant="outline"
// // //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// // //             >
// // //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// // //               <span className="hidden sm:inline">Back to Home</span>
// // //               <span className="sm:hidden">Home</span>
// // //             </Button>
// // //           </div>
// // //         </div>
        
// // //         {/* Form Section */}
// // //         <Card className="shadow-sm border border-gray-200">
// // //           <CardHeader className="pb-2 sm:pb-4" style={{ borderBottom: "1px solid #e5e7eb" }}>
// // //             <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "rgb(11,145,140)" }}>
// // //               Daily Bed Occupancy Entry {editingId && <span className="text-sm text-indigo-500 ml-2">(Editing Mode)</span>}
// // //             </h2>
// // //           </CardHeader>
          
// // //           <CardContent className="pt-4 sm:pt-6">
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                   Date
// // //                 </label>
// // //                 <div className="relative">
// // //                   <Input
// // //                     type="date"
// // //                     value={date}
// // //                     onChange={(e) => setDate(e.target.value)}
// // //                     className="pr-8 sm:pr-10"
// // //                     disabled={editingId !== null} // Prevent changing date while editing a specific record
// // //                   />
// // //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-4 w-4" />
// // //                 </div>
// // //               </div>
              
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                   Bed Sanctioned
// // //                 </label>
// // //                 <select
// // //                   value={bedSanctioned}
// // //                   onChange={(e) => setBedSanctioned(e.target.value)}
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //                 >
// // //                   <option value="">Select</option>
// // //                   <option value="5">5</option>
// // //                   <option value="10">10</option>
// // //                   <option value="15">15</option>
// // //                   <option value="20">20</option>
// // //                   <option value="25">25</option>
// // //                   <option value="30">30</option>
// // //                 </select>
// // //               </div>
              
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                   Utilized Bed
// // //                 </label>
// // //                 <Input
// // //                   type="number"
// // //                   value={utilizedBed}
// // //                   onChange={(e) => setUtilizedBed(e.target.value)}
// // //                   maxLength={5}
// // //                 />
// // //               </div>
              
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                   Bed Occupancy %
// // //                 </label>
// // //                 <Input
// // //                   value={bedOccupancyPercentage}
// // //                   readOnly
// // //                   className="bg-gray-50"
// // //                 />
// // //               </div>
// // //             </div>
            
// // //             <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
// // //               <Button
// // //                 onClick={handleSave}
// // //                 disabled={isSaving}
// // //                 className="bg-indigo-600 hover:bg-indigo-700"
// // //               >
// // //                 {isSaving ? (
// // //                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
// // //                 ) : (
// // //                   <Save className="mr-2 h-4 w-4" /> 
// // //                 )}
// // //                 {editingId ? 'Update Record' : 'Save'}
// // //               </Button>
// // //               <Button
// // //                 onClick={handleClear}
// // //                 variant="outline"
// // //                 className="border-gray-600 text-gray-700 hover:bg-gray-100"
// // //               >
// // //                 <X className="mr-2 h-4 w-4" /> {editingId ? 'Cancel Edit' : 'Clear'}
// // //               </Button>
// // //             </div>
// // //           </CardContent>
// // //         </Card>
        
// // //         {/* Table Section */}
// // //         <Card className="shadow-sm border border-gray-200">
// // //           <CardHeader className="pb-2 sm:pb-4">
// // //             <div className="flex justify-between items-center">
// // //               <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "rgb(11,145,140)" }}>
// // //                 Daily Bed Occupancy Table
// // //               </h2>
// // //               {isLoading && <Loader2 className="h-5 w-5 animate-spin text-gray-500" />}
// // //             </div>
// // //           </CardHeader>
          
// // //           <CardContent>
// // //             <div className="mb-4">
// // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Year
// // //               </label>
// // //               <select
// // //                 value={selectedYear}
// // //                 onChange={(e) => handleYearChange(e.target.value)}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-[200px]"
// // //               >
// // //                 <option value="">Select Year</option>
// // //                 {yearOptions.map(year => (
// // //                   <option key={year} value={year}>{year}</option>
// // //                 ))}
// // //               </select>
// // //             </div>
            
// // //             <div className="overflow-x-auto border border-gray-200 rounded-lg">
// // //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // //                 <thead>
// // //                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // //                     <th className="py-3 px-2 sm:px-4 text-left font-semibold border-r border-gray-200">Day \ Month</th>
// // //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Jan</th>
// // //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Feb</th>
// // //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Mar</th>
// // //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Apr</th>
// // //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">May</th>
// // //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Jun</th>
// // //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Jul</th>
// // //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Aug</th>
// // //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Sep</th>
// // //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Oct</th>
// // //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Nov</th>
// // //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Dec</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {dailyData.length > 0 ? (
// // //                     dailyData.map((row, dayIndex) => (
// // //                       <tr key={dayIndex} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
// // //                         <th className="py-2 px-2 sm:px-4 font-medium text-left bg-gray-50 border-r border-gray-200">
// // //                           {dayIndex + 1}
// // //                         </th>
// // //                         {row.map((value, monthIndex) => (
// // //                           <td 
// // //                             key={monthIndex} 
// // //                             className={`py-2 px-2 sm:px-4 text-center ${value > 0 ? 'cursor-pointer hover:bg-indigo-100 hover:font-bold text-indigo-700' : 'text-gray-400'}`}
// // //                             onClick={() => {
// // //                               if (value > 0) {
// // //                                 const record = records.find(r => 
// // //                                   r.year === parseInt(selectedYear) && 
// // //                                   r.month === monthIndex + 1 && 
// // //                                   r.day === dayIndex + 1
// // //                                 );
// // //                                 if (record) handleEdit(record);
// // //                               }
// // //                             }}
// // //                           >
// // //                             {value > 0 ? `${value.toFixed(2)}` : "-"}
// // //                           </td>
// // //                         ))}
// // //                       </tr>
// // //                     ))
// // //                   ) : (
// // //                     <tr>
// // //                       <td colSpan={13} className="py-8 text-center text-gray-500">
// // //                         No data available for the selected year
// // //                       </td>
// // //                     </tr>
// // //                   )}
// // //                 </tbody>
// // //               </table>
// // //             </div>
            
// // //             <div className="mt-8">
// // //               <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: "rgb(11,145,140)" }}>
// // //                 Monthly Bed Occupancy Average
// // //               </h3>
              
// // //               <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
// // //                 <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// // //                   <thead>
// // //                     <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// // //                       <th className="py-3 px-2 sm:px-4 text-left font-semibold border-r border-gray-200">Average %</th>
// // //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Jan</th>
// // //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Feb</th>
// // //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Mar</th>
// // //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Apr</th>
// // //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">May</th>
// // //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Jun</th>
// // //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Jul</th>
// // //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Aug</th>
// // //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Sep</th>
// // //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Oct</th>
// // //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Nov</th>
// // //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Dec</th>
// // //                     </tr>
// // //                   </thead>
// // //                   <tbody>
// // //                     <tr className="bg-white hover:bg-gray-50">
// // //                       <th className="py-4 px-2 sm:px-4 font-medium text-left bg-gray-50 border-r border-gray-200">
// // //                         {selectedYear}
// // //                       </th>
// // //                       {monthlyData.map((data, index) => (
// // //                         <td key={index} className="py-4 px-2 sm:px-4 text-center font-semibold text-indigo-700">
// // //                           {data.occupancy > 0 ? data.occupancy.toFixed(2) : "-"}
// // //                         </td>
// // //                       ))}
// // //                     </tr>
// // //                   </tbody>
// // //                 </table>
// // //               </div>
// // //             </div>
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useState, useEffect, useCallback } from "react";
// // import { useRouter } from "next/navigation";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // import { CalendarIcon, Home, Save, X, Loader2 } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";

// // // Interface matching the PostgreSQL API response
// // interface BedOccupancyRecord {
// //   id: string;
// //   date: string;
// //   year: number;
// //   month: number;
// //   day: number;
// //   bedSanctioned: number;
// //   utilizedBed: number;
// //   bedOccupancyPercentage: number;
// //   createdAt: string;
// // }

// // interface MonthlyData {
// //   month: string;
// //   occupancy: number;
// // }

// // export default function BedOccupancyPage() {
// //   const router = useRouter();

// //   // TODO: Replace with actual MTC Code from your Auth Context/Session
// //   const mtcCode = "JH/WSB/CBS"; 

// //   // Form state
// //   const [date, setDate] = useState("");
// //   const [bedSanctioned, setBedSanctioned] = useState("");
// //   const [utilizedBed, setUtilizedBed] = useState("");
// //   const [bedOccupancyPercentage, setBedOccupancyPercentage] = useState("");
  
// //   // Data state
// //   const [records, setRecords] = useState<BedOccupancyRecord[]>([]);
// //   const [dailyData, setDailyData] = useState<number[][]>([]);
// //   const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
// //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
// //   const [editingId, setEditingId] = useState<string | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isSaving, setIsSaving] = useState(false);

// //   // Memoized generateTableData function
// //   const generateTableData = useCallback((allRecords: BedOccupancyRecord[], year: string) => {
// //     const newDailyData: number[][] = Array(31).fill(null).map(() => Array(12).fill(0));
    
// //     const newMonthlyData: MonthlyData[] = [
// //       { month: "January", occupancy: 0 }, { month: "February", occupancy: 0 },
// //       { month: "March", occupancy: 0 }, { month: "April", occupancy: 0 },
// //       { month: "May", occupancy: 0 }, { month: "June", occupancy: 0 },
// //       { month: "July", occupancy: 0 }, { month: "August", occupancy: 0 },
// //       { month: "September", occupancy: 0 }, { month: "October", occupancy: 0 },
// //       { month: "November", occupancy: 0 }, { month: "December", occupancy: 0 }
// //     ];
    
// //     const yearRecords = allRecords.filter(record => record.year === parseInt(year));
    
// //     yearRecords.forEach(record => {
// //       const dayIndex = record.day - 1;
// //       const monthIndex = record.month - 1;
      
// //       if (dayIndex >= 0 && dayIndex < 31 && monthIndex >= 0 && monthIndex < 12) {
// //         newDailyData[dayIndex][monthIndex] = record.bedOccupancyPercentage;
// //         newMonthlyData[monthIndex].occupancy += record.bedOccupancyPercentage;
// //       }
// //     });
    
// //     newMonthlyData.forEach((monthData, monthIndex) => {
// //       const daysInMonth = new Date(parseInt(year), monthIndex + 1, 0).getDate();
// //       const monthRecords = yearRecords.filter(record => record.month === monthIndex + 1);
      
// //       if (monthRecords.length > 0) {
// //         monthData.occupancy = monthData.occupancy / daysInMonth;
// //       }
// //     });
    
// //     setDailyData(newDailyData);
// //     setMonthlyData(newMonthlyData);
// //   }, []);

// //   // Fetch data from PostgreSQL API
// //   const fetchRecords = useCallback(async () => {
// //     try {
// //       setIsLoading(true);
// //       const res = await fetch(`/api/bed-occupancy?year=${selectedYear}&mtcCode=${mtcCode}`);
// //       if (!res.ok) throw new Error("Failed to fetch records");
      
// //       const data: BedOccupancyRecord[] = await res.json();
// //       setRecords(data);
// //       generateTableData(data, selectedYear);
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Could not load bed occupancy data.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, [selectedYear, generateTableData, mtcCode]);

// //   useEffect(() => {
// //     fetchRecords();
// //   }, [fetchRecords]);

// //   // Dynamic Percentage Calculation
// //   useEffect(() => {
// //     if (bedSanctioned && utilizedBed !== "") {
// //       const percentage = (parseFloat(utilizedBed) / parseFloat(bedSanctioned)) * 100;
// //       setBedOccupancyPercentage(percentage.toFixed(2));
// //     } else {
// //       setBedOccupancyPercentage("");
// //     }
// //   }, [bedSanctioned, utilizedBed]);

// //   // When Sanctioned Beds changes, ensure Utilized Bed doesn't exceed it
// //   useEffect(() => {
// //     if (bedSanctioned && utilizedBed !== "") {
// //       if (parseFloat(utilizedBed) > parseFloat(bedSanctioned)) {
// //         setUtilizedBed(bedSanctioned); // Cap it
// //         toast.error(`Utilized beds automatically capped to ${bedSanctioned}`);
// //       }
// //     }
// //   }, [bedSanctioned, utilizedBed]);

// //   const handleSave = async () => {
// //     if (!date || !bedSanctioned || utilizedBed === "") {
// //       toast.error("Please fill all required fields");
// //       return;
// //     }

// //     // Safety check just in case
// //     if (parseFloat(utilizedBed) > parseFloat(bedSanctioned)) {
// //       toast.error("Utilized beds cannot exceed sanctioned beds!");
// //       return;
// //     }
    
// //     try {
// //       setIsSaving(true);
      
// //       const dateObj = new Date(date);
// //       const year = dateObj.getFullYear();
// //       const month = dateObj.getMonth() + 1; 
// //       const day = dateObj.getDate();

// //       const payload = {
// //         mtcCode, date, year, month, day,
// //         bedSanctioned: parseFloat(bedSanctioned),
// //         utilizedBed: parseFloat(utilizedBed),
// //         bedOccupancyPercentage: parseFloat(bedOccupancyPercentage)
// //       };

// //       const res = await fetch('/api/bed-occupancy', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload)
// //       });

// //       if (!res.ok) throw new Error("Failed to save");

// //       toast.success(editingId ? "Record updated successfully!" : "Record saved successfully!");
      
// //       handleClear();
// //       fetchRecords();

// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Failed to save record.");
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   };
  
// //   const handleClear = () => {
// //     setDate("");
// //     setBedSanctioned("");
// //     setUtilizedBed("");
// //     setBedOccupancyPercentage("");
// //     setEditingId(null);
// //   };
  
// //   const handleEdit = (record: BedOccupancyRecord) => {
// //     setDate(record.date);
// //     setBedSanctioned(record.bedSanctioned.toString());
// //     setUtilizedBed(record.utilizedBed.toString());
// //     setEditingId(record.id);
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   };
  
// //   const handleYearChange = (newYear: string) => {
// //     setSelectedYear(newYear);
// //   };
  
// //   const currentYear = new Date().getFullYear();
// //   const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 10 + i).map(year => year.toString());
  
// //   return (
// //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// //       <Toaster position="top-right" />
      
// //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// //             Bed Occupancy Management
// //           </h1>
// //           <div className="flex gap-2 sm:gap-3">
// //             <Button
// //               onClick={() => router.push("/mtc-user/dashboard/home")}
// //               variant="outline"
// //               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// //             >
// //               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
// //               <span className="hidden sm:inline">Back to Home</span>
// //               <span className="sm:hidden">Home</span>
// //             </Button>
// //           </div>
// //         </div>
        
// //         {/* Form Section */}
// //         <Card className="shadow-sm border border-gray-200">
// //           <CardHeader className="pb-2 sm:pb-4" style={{ borderBottom: "1px solid #e5e7eb" }}>
// //             <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "rgb(11,145,140)" }}>
// //               Daily Bed Occupancy Entry {editingId && <span className="text-sm text-indigo-500 ml-2">(Editing Mode)</span>}
// //             </h2>
// //           </CardHeader>
          
// //           <CardContent className="pt-4 sm:pt-6">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
// //                 <div className="relative">
// //                   <Input
// //                     type="date"
// //                     value={date}
// //                     onChange={(e) => setDate(e.target.value)}
// //                     className="pr-8 sm:pr-10"
// //                     disabled={editingId !== null} 
// //                   />
// //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-4 w-4" />
// //                 </div>
// //               </div>
              
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Bed Sanctioned</label>
// //                 <select
// //                   value={bedSanctioned}
// //                   onChange={(e) => setBedSanctioned(e.target.value)}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 >
// //                   <option value="">Select</option>
// //                   <option value="5">5</option>
// //                   <option value="10">10</option>
// //                   <option value="15">15</option>
// //                   <option value="20">20</option>
// //                   <option value="25">25</option>
// //                   <option value="30">30</option>
// //                 </select>
// //               </div>
              
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Utilized Bed</label>
// //                 <Input 
// //                   type="number" 
// //                   value={utilizedBed} 
// //                   disabled={!bedSanctioned} // Disable if no sanctioned bed is selected
// //                   placeholder={!bedSanctioned ? "Select Sanctioned first" : "0"}
// //                   min="0"
// //                   max={bedSanctioned || ""}
// //                   onChange={(e) => {
// //                     const val = e.target.value;
// //                     if (val === "") {
// //                       setUtilizedBed("");
// //                       return;
// //                     }
                    
// //                     const numVal = parseFloat(val);
// //                     const maxVal = parseFloat(bedSanctioned);
                    
// //                     if (numVal > maxVal) {
// //                       toast.error(`Cannot exceed sanctioned beds (${maxVal})`);
// //                       setUtilizedBed(maxVal.toString());
// //                     } else if (numVal < 0) {
// //                       setUtilizedBed("0");
// //                     } else {
// //                       setUtilizedBed(val);
// //                     }
// //                   }} 
// //                 />
// //               </div>
              
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Bed Occupancy %</label>
// //                 <Input value={bedOccupancyPercentage} readOnly className="bg-gray-50 font-semibold text-indigo-700" />
// //               </div>
// //             </div>
            
// //             <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
// //               <Button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700">
// //                 {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
// //                 {editingId ? 'Update Record' : 'Save'}
// //               </Button>
// //               <Button onClick={handleClear} variant="outline" className="border-gray-600 text-gray-700 hover:bg-gray-100">
// //                 <X className="mr-2 h-4 w-4" /> {editingId ? 'Cancel Edit' : 'Clear'}
// //               </Button>
// //             </div>
// //           </CardContent>
// //         </Card>
        
// //         {/* Table Section */}
// //         <Card className="shadow-sm border border-gray-200">
// //           <CardHeader className="pb-2 sm:pb-4">
// //             <div className="flex justify-between items-center">
// //               <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "rgb(11,145,140)" }}>
// //                 Daily Bed Occupancy Table
// //               </h2>
// //               {isLoading && <Loader2 className="h-5 w-5 animate-spin text-gray-500" />}
// //             </div>
// //           </CardHeader>
          
// //           <CardContent>
// //             <div className="mb-4">
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
// //               <select
// //                 value={selectedYear}
// //                 onChange={(e) => handleYearChange(e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-[200px]"
// //               >
// //                 <option value="">Select Year</option>
// //                 {yearOptions.map(year => (
// //                   <option key={year} value={year}>{year}</option>
// //                 ))}
// //               </select>
// //             </div>
            
// //             <div className="overflow-x-auto border border-gray-200 rounded-lg">
// //               <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// //                 <thead>
// //                   <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// //                     <th className="py-3 px-2 sm:px-4 text-left font-semibold border-r border-gray-200">Day \ Month</th>
// //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Jan</th>
// //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Feb</th>
// //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Mar</th>
// //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Apr</th>
// //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">May</th>
// //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Jun</th>
// //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Jul</th>
// //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Aug</th>
// //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Sep</th>
// //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Oct</th>
// //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Nov</th>
// //                     <th className="py-3 px-2 sm:px-4 text-center font-semibold">Dec</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {dailyData.length > 0 ? (
// //                     dailyData.map((row, dayIndex) => (
// //                       <tr key={dayIndex} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
// //                         <th className="py-2 px-2 sm:px-4 font-medium text-left bg-gray-50 border-r border-gray-200">
// //                           {dayIndex + 1}
// //                         </th>
// //                         {row.map((value, monthIndex) => (
// //                           <td 
// //                             key={monthIndex} 
// //                             className={`py-2 px-2 sm:px-4 text-center ${value > 0 ? 'cursor-pointer hover:bg-indigo-100 hover:font-bold text-indigo-700' : 'text-gray-400'}`}
// //                             onClick={() => {
// //                               if (value > 0) {
// //                                 const record = records.find(r => 
// //                                   r.year === parseInt(selectedYear) && 
// //                                   r.month === monthIndex + 1 && 
// //                                   r.day === dayIndex + 1
// //                                 );
// //                                 if (record) handleEdit(record);
// //                               }
// //                             }}
// //                           >
// //                             {value > 0 ? `${Number(value).toFixed(2)}` : "-"}
// //                           </td>
// //                         ))}
// //                       </tr>
// //                     ))
// //                   ) : (
// //                     <tr>
// //                       <td colSpan={13} className="py-8 text-center text-gray-500">
// //                         No data available for the selected year
// //                       </td>
// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
            
// //             <div className="mt-8">
// //               <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: "rgb(11,145,140)" }}>
// //                 Monthly Bed Occupancy Average
// //               </h3>
              
// //               <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
// //                 <table className="min-w-full text-xs sm:text-sm text-gray-700 border-collapse">
// //                   <thead>
// //                     <tr className="bg-indigo-50 text-indigo-700 border-b border-gray-200">
// //                       <th className="py-3 px-2 sm:px-4 text-left font-semibold border-r border-gray-200">Average %</th>
// //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Jan</th>
// //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Feb</th>
// //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Mar</th>
// //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Apr</th>
// //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">May</th>
// //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Jun</th>
// //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Jul</th>
// //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Aug</th>
// //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Sep</th>
// //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Oct</th>
// //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Nov</th>
// //                       <th className="py-3 px-2 sm:px-4 text-center font-semibold">Dec</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     <tr className="bg-white hover:bg-gray-50">
// //                       <th className="py-4 px-2 sm:px-4 font-medium text-left bg-gray-50 border-r border-gray-200">
// //                         {selectedYear}
// //                       </th>
// //                       {monthlyData.map((data, index) => (
// //                         <td key={index} className="py-4 px-2 sm:px-4 text-center font-semibold text-indigo-700">
// //                           {data.occupancy > 0 ? data.occupancy.toFixed(2) : "-"}
// //                         </td>
// //                       ))}
// //                     </tr>
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>
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
// import { CalendarIcon, Home, Save, X, Loader2, Activity } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// interface BedOccupancyRecord {
//   id: string;
//   mtcName?: string;
//   date: string;
//   year: number;
//   month: number;
//   day: number;
//   bedSanctioned: number;
//   utilizedBed: number;
//   bedOccupancyPercentage: number;
//   createdAt: string;
// }

// interface MonthlyData {
//   month: string;
//   occupancy: number;
// }

// export default function BedOccupancyPage() {
//   const router = useRouter();

//   // MTC Identity States
//   const [mtcCode, setMtcCode] = useState<string>(""); 
//   const [mtcName, setMtcName] = useState<string>("");

//   // Form State
//   const [date, setDate] = useState("");
//   const [bedSanctioned, setBedSanctioned] = useState("");
//   const [utilizedBed, setUtilizedBed] = useState("");
//   const [bedOccupancyPercentage, setBedOccupancyPercentage] = useState("");
  
//   // Data State
//   const [records, setRecords] = useState<BedOccupancyRecord[]>([]);
//   const [dailyData, setDailyData] = useState<number[][]>([]);
//   const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  
//   // UI State
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isCapacityLoading, setIsCapacityLoading] = useState(true);

//   // 1. Initialize Session and Fetch Fixed Bed Capacity
//   useEffect(() => {
//     const sessionData = sessionStorage.getItem("mtc_user");
//     if (sessionData) {
//       try {
//         const user = JSON.parse(sessionData);
//         setMtcCode(user.mtcCode || "");
//         setMtcName(user.mtcName || "");

//         if (user.mtcName) {
//           setIsCapacityLoading(true);
//           fetch(`/api/mtc-beds?mtcName=${encodeURIComponent(user.mtcName)}`)
//             .then(res => res.json())
//             .then(data => {
//               if (data.beds) setBedSanctioned(data.beds.toString());
//             })
//             .catch(err => {
//               console.error("Failed to load bed capacity", err);
//               toast.error("Could not fetch sanctioned beds.");
//             })
//             .finally(() => setIsCapacityLoading(false));
//         }
//       } catch (err) {
//         console.error("Session parse error");
//         setIsCapacityLoading(false);
//       }
//     } else {
//       setIsCapacityLoading(false);
//     }
//   }, []);

//   // 2. Data Processing Logic
//   const generateTableData = useCallback((allRecords: BedOccupancyRecord[], year: string) => {
//     const newDailyData: number[][] = Array(31).fill(null).map(() => Array(12).fill(0));
    
//     const newMonthlyData: MonthlyData[] = [
//       { month: "Jan", occupancy: 0 }, { month: "Feb", occupancy: 0 },
//       { month: "Mar", occupancy: 0 }, { month: "Apr", occupancy: 0 },
//       { month: "May", occupancy: 0 }, { month: "Jun", occupancy: 0 },
//       { month: "Jul", occupancy: 0 }, { month: "Aug", occupancy: 0 },
//       { month: "Sep", occupancy: 0 }, { month: "Oct", occupancy: 0 },
//       { month: "Nov", occupancy: 0 }, { month: "Dec", occupancy: 0 }
//     ];
    
//     const yearRecords = allRecords.filter(record => record.year === parseInt(year, 10));
    
//     yearRecords.forEach(record => {
//       const dayIndex = record.day - 1;
//       const monthIndex = record.month - 1;
      
//       if (dayIndex >= 0 && dayIndex < 31 && monthIndex >= 0 && monthIndex < 12) {
//         newDailyData[dayIndex][monthIndex] = record.bedOccupancyPercentage;
//         newMonthlyData[monthIndex].occupancy += record.bedOccupancyPercentage;
//       }
//     });
    
//     newMonthlyData.forEach((monthData, monthIndex) => {
//       const daysInMonth = new Date(parseInt(year, 10), monthIndex + 1, 0).getDate();
//       const monthRecords = yearRecords.filter(record => record.month === monthIndex + 1);
      
//       if (monthRecords.length > 0) {
//         monthData.occupancy = monthData.occupancy / daysInMonth;
//       }
//     });
    
//     setDailyData(newDailyData);
//     setMonthlyData(newMonthlyData);
//   }, []);

//   const fetchRecords = useCallback(async () => {
//     if (!mtcCode) return; 

//     try {
//       setIsLoading(true);
//       const res = await fetch(`/api/bed-occupancy?year=${selectedYear}&mtcCode=${mtcCode}`);
//       if (!res.ok) throw new Error("Failed to fetch records");
      
//       const data: BedOccupancyRecord[] = await res.json();
//       setRecords(data);
//       generateTableData(data, selectedYear);
//     } catch (error) {
//       console.error(error);
//       toast.error("Could not load table data.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [selectedYear, generateTableData, mtcCode]);

//   useEffect(() => {
//     fetchRecords();
//   }, [fetchRecords]);

//   // 3. Form Validation & Calculation Effects
//   useEffect(() => {
//     if (bedSanctioned && utilizedBed !== "") {
//       const parsedUtilized = parseFloat(utilizedBed);
//       const parsedSanctioned = parseFloat(bedSanctioned);
      
//       if (parsedUtilized > parsedSanctioned) {
//         setUtilizedBed(bedSanctioned);
//         setBedOccupancyPercentage("100.00");
//         toast.error(`Capped at maximum sanctioned beds (${bedSanctioned})`);
//       } else {
//         const percentage = (parsedUtilized / parsedSanctioned) * 100;
//         setBedOccupancyPercentage(percentage.toFixed(2));
//       }
//     } else {
//       setBedOccupancyPercentage("");
//     }
//   }, [bedSanctioned, utilizedBed]);

//   // 4. Submission Logic
//   const handleSave = async () => {
//     if (!date || !bedSanctioned || utilizedBed === "") {
//       toast.error("Please fill out the Date and Utilized Bed fields.");
//       return;
//     }

//     if (!mtcCode || !mtcName) {
//       toast.error("Security Error: MTC Block Name missing. Please login again.");
//       return;
//     }

//     try {
//       setIsSaving(true);
      
//       // FIX: Secure date parsing to prevent Timezone shift bugs
//       const [yearStr, monthStr, dayStr] = date.split('-');
//       const year = parseInt(yearStr, 10);
//       const month = parseInt(monthStr, 10);
//       const day = parseInt(dayStr, 10);

//       const payload = {
//         mtcCode, 
//         mtcName, 
//         date, year, month, day,
//         bedSanctioned: parseFloat(bedSanctioned),
//         utilizedBed: parseFloat(utilizedBed),
//         bedOccupancyPercentage: parseFloat(bedOccupancyPercentage)
//       };

//       const res = await fetch('/api/bed-occupancy', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (!res.ok) throw new Error("Failed to save record");

//       toast.success(editingId ? `Record updated for ${mtcName}!` : `Record saved for ${mtcName}!`);
      
//       handleClear();
//       fetchRecords();

//     } catch (error) {
//       console.error(error);
//       toast.error("An error occurred while saving.");
//     } finally {
//       setIsSaving(false);
//     }
//   };
  
//   const handleClear = () => {
//     setDate("");
//     setUtilizedBed("");
//     setBedOccupancyPercentage("");
//     setEditingId(null);
//   };
  
//   const handleEdit = (record: BedOccupancyRecord) => {
//     setDate(record.date);
//     setBedSanctioned(record.bedSanctioned.toString());
//     setUtilizedBed(record.utilizedBed.toString());
//     setEditingId(record.id);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     toast("Editing mode enabled", { icon: "✏️" });
//   };
  
//   const currentYear = new Date().getFullYear();
//   const yearOptions = Array.from({ length: 5 }, (_, i) => (currentYear - 2 + i).toString()); // Gives current year +/- 2 years
  
//   return (
//     <div className="min-h-screen bg-slate-50 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6 font-sans">
//       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
      
//       <div className="max-w-7xl mx-auto space-y-6">
        
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div className="flex items-center gap-3">
//             <div className="bg-indigo-100 p-2.5 rounded-xl border border-indigo-200 shadow-sm">
//               <Activity className="h-6 w-6 text-indigo-700" />
//             </div>
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
//                 Bed Occupancy
//               </h1>
//               <p className="text-sm font-medium text-slate-500 mt-0.5">
//                 Block / Center: <span className="font-bold text-indigo-600 uppercase tracking-wider">{mtcName || "Loading..."}</span>
//               </p>
//             </div>
//           </div>
//           <Button
//             onClick={() => router.push("/mtc-user/dashboard/home")}
//             variant="outline"
//             className="border-slate-200 text-slate-700 hover:bg-slate-100 transition shadow-sm bg-white"
//           >
//             <Home className="mr-2 h-4 w-4" /> Back to Dashboard
//           </Button>
//         </div>
        
//         {/* Form Section */}
//         <Card className="shadow-sm border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
//           <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5 px-6">
//             <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
//               <CalendarIcon className="h-4 w-4 text-indigo-500" /> 
//               Daily Entry {editingId && <span className="text-xs text-rose-500 bg-red-50 px-2 py-0.5 rounded border border-rose-100 ml-2 normal-case tracking-normal">Editing Mode</span>}
//             </h2>
//           </CardHeader>
          
//           <CardContent className="p-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Record Date</label>
//                 <div className="relative">
//                   <Input
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     className="bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 pr-10"
//                     disabled={editingId !== null} 
//                   />
//                   <CalendarIcon className="absolute right-3 top-2.5 text-slate-400 h-4 w-4 pointer-events-none" />
//                 </div>
//               </div>
              
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Sanctioned Beds</label>
//                 <div className="relative">
//                   <Input 
//                     type="text"
//                     value={isCapacityLoading ? "Fetching..." : (bedSanctioned ? `${bedSanctioned} Beds` : "N/A")}
//                     readOnly
//                     className="bg-slate-100 font-bold text-slate-600 cursor-not-allowed border-slate-200"
//                   />
//                   {isCapacityLoading && <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-slate-400" />}
//                 </div>
//               </div>
              
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Utilized Beds</label>
//                 <Input 
//                   type="number" 
//                   value={utilizedBed} 
//                   disabled={!bedSanctioned || isCapacityLoading} 
//                   placeholder={!bedSanctioned ? "Wait..." : "Enter count"}
//                   min="0"
//                   className="bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 font-semibold"
//                   onChange={(e) => {
//                     const val = e.target.value;
//                     if (val === "" || parseFloat(val) < 0) {
//                       setUtilizedBed("");
//                     } else {
//                       setUtilizedBed(val);
//                     }
//                   }} 
//                 />
//               </div>
              
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Occupancy Rate</label>
//                 <div className="relative">
//                   <Input 
//                     value={bedOccupancyPercentage} 
//                     readOnly 
//                     className="bg-indigo-50 font-bold text-indigo-700 border-indigo-200 pr-8" 
//                     placeholder="0.00"
//                   />
//                   <span className="absolute right-3 top-2.5 text-indigo-500 font-bold">%</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
//               <Button onClick={handleClear} variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-100 w-full sm:w-auto order-2 sm:order-1">
//                 <X className="mr-2 h-4 w-4" /> {editingId ? 'Cancel Edit' : 'Clear Form'}
//               </Button>
//               <Button onClick={handleSave} disabled={isSaving || isCapacityLoading} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto order-1 sm:order-2 shadow-sm">
//                 {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
//                 {editingId ? 'Update Record' : 'Save Record'}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
        
//         {/* Table Section */}
//         <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
//           <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5 px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
//               <Activity className="h-4 w-4 text-indigo-500" /> 
//               {mtcName} — Overview
//             </h2>
//             <div className="flex items-center gap-2 w-full sm:w-auto">
//               {isLoading && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
//               <select
//                 value={selectedYear}
//                 onChange={(e) => setSelectedYear(e.target.value)}
//                 className="w-full sm:w-32 px-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium bg-white shadow-sm"
//               >
//                 {yearOptions.map(year => (
//                   <option key={year} value={year}>{year} Records</option>
//                 ))}
//               </select>
//             </div>
//           </CardHeader>
          
//           <CardContent className="p-0">
//             <div className="overflow-x-auto custom-scrollbar">
//               <table className="min-w-full text-sm text-slate-700 border-collapse">
//                 <thead>
//                   <tr className="bg-slate-50 border-b border-slate-200">
//                     <th className="py-3 px-4 text-left font-bold text-slate-500 uppercase tracking-wider text-xs border-r border-slate-200 bg-slate-100">Day \ Month</th>
//                     {monthlyData.map((m, i) => (
//                       <th key={i} className="py-3 px-4 text-center font-bold text-slate-500 uppercase tracking-wider text-xs">{m.month}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100">
//                   {dailyData.map((row, dayIndex) => (
//                     <tr key={dayIndex} className="hover:bg-indigo-50/30 transition-colors">
//                       <th className="py-2.5 px-4 font-bold text-left bg-slate-50 border-r border-slate-200 text-slate-600">
//                         {dayIndex + 1}
//                       </th>
//                       {row.map((value, monthIndex) => (
//                         <td 
//                           key={monthIndex} 
//                           className={`py-2.5 px-4 text-center border-l border-slate-50 ${value > 0 ? 'cursor-pointer font-bold text-indigo-700 hover:bg-indigo-100 hover:scale-105 transition-transform' : 'text-slate-300'}`}
//                           title={value > 0 ? "Click to edit" : ""}
//                           onClick={() => {
//                             if (value > 0) {
//                               const record = records.find(r => 
//                                 r.year === parseInt(selectedYear, 10) && 
//                                 r.month === monthIndex + 1 && 
//                                 r.day === dayIndex + 1
//                               );
//                               if (record) handleEdit(record);
//                             }
//                           }}
//                         >
//                           {value > 0 ? `${Number(value).toFixed(1)}%` : "-"}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
                  
//                   {/* Monthly Average Row (Pinned to bottom visually) */}
//                   <tr className="bg-indigo-50 border-t-2 border-indigo-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
//                     <th className="py-4 px-4 font-bold text-left border-r border-indigo-200 text-indigo-900 uppercase tracking-wider text-xs">
//                       Avg %
//                     </th>
//                     {monthlyData.map((data, index) => (
//                       <td key={index} className="py-4 px-4 text-center font-bold text-indigo-700 border-l border-indigo-100/50">
//                         {data.occupancy > 0 ? `${data.occupancy.toFixed(1)}%` : "-"}
//                       </td>
//                     ))}
//                   </tr>
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

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CalendarIcon, Home, Save, X, Loader2, Activity } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface BedOccupancyRecord {
  id: string;
  mtcName?: string;
  date: string;
  year: number;
  month: number;
  day: number;
  bedSanctioned: number;
  utilizedBed: number;
  bedOccupancyPercentage: number;
  createdAt: string;
}

interface MonthlyData {
  month: string;
  occupancy: number;
}

export default function BedOccupancyPage() {
  const router = useRouter();

  // MTC Identity States
  const [mtcCode, setMtcCode] = useState<string>(""); 
  const [mtcName, setMtcName] = useState<string>("");

  // Form State
  const [date, setDate] = useState("");
  const [bedSanctioned, setBedSanctioned] = useState("");
  const [utilizedBed, setUtilizedBed] = useState("");
  const [bedOccupancyPercentage, setBedOccupancyPercentage] = useState("");
  
  // Data State
  const [records, setRecords] = useState<BedOccupancyRecord[]>([]);
  const [dailyData, setDailyData] = useState<number[][]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  
  // UI State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCapacityLoading, setIsCapacityLoading] = useState(true);

  // 1. Initialize Session and Fetch Fixed Bed Capacity
  useEffect(() => {
    const sessionData = sessionStorage.getItem("mtc_user");
    if (sessionData) {
      try {
        const user = JSON.parse(sessionData);
        setMtcCode(user.mtcCode || "");
        setMtcName(user.mtcName || "");

        if (user.mtcName) {
          setIsCapacityLoading(true);
          fetch(`/api/mtc-beds?mtcName=${encodeURIComponent(user.mtcName)}`)
            .then(res => res.json())
            .then(data => {
              if (data.beds) setBedSanctioned(data.beds.toString());
            })
            .catch(err => {
              console.error("Failed to load bed capacity", err);
              toast.error("Could not fetch sanctioned beds.");
            })
            .finally(() => setIsCapacityLoading(false));
        }
      } catch (err) {
        console.error("Session parse error", err);
        setIsCapacityLoading(false);
      }
    } else {
      setIsCapacityLoading(false);
    }
  }, []);

  // 2. Data Processing Logic
  const generateTableData = useCallback((allRecords: BedOccupancyRecord[], year: string) => {
    const newDailyData: number[][] = Array(31).fill(null).map(() => Array(12).fill(0));
    
    const newMonthlyData: MonthlyData[] = [
      { month: "Jan", occupancy: 0 }, { month: "Feb", occupancy: 0 },
      { month: "Mar", occupancy: 0 }, { month: "Apr", occupancy: 0 },
      { month: "May", occupancy: 0 }, { month: "Jun", occupancy: 0 },
      { month: "Jul", occupancy: 0 }, { month: "Aug", occupancy: 0 },
      { month: "Sep", occupancy: 0 }, { month: "Oct", occupancy: 0 },
      { month: "Nov", occupancy: 0 }, { month: "Dec", occupancy: 0 }
    ];
    
    const yearRecords = allRecords.filter(record => record.year === parseInt(year, 10));
    
    yearRecords.forEach(record => {
      const dayIndex = record.day - 1;
      const monthIndex = record.month - 1;
      
      if (dayIndex >= 0 && dayIndex < 31 && monthIndex >= 0 && monthIndex < 12) {
        newDailyData[dayIndex][monthIndex] = record.bedOccupancyPercentage;
        newMonthlyData[monthIndex].occupancy += record.bedOccupancyPercentage;
      }
    });
    
    newMonthlyData.forEach((monthData, monthIndex) => {
      const daysInMonth = new Date(parseInt(year, 10), monthIndex + 1, 0).getDate();
      const monthRecords = yearRecords.filter(record => record.month === monthIndex + 1);
      
      if (monthRecords.length > 0) {
        monthData.occupancy = monthData.occupancy / daysInMonth;
      }
    });
    
    setDailyData(newDailyData);
    setMonthlyData(newMonthlyData);
  }, []);

  const fetchRecords = useCallback(async () => {
    if (!mtcCode) return; 

    try {
      setIsLoading(true);
      const res = await fetch(`/api/bed-occupancy?year=${selectedYear}&mtcCode=${mtcCode}`);
      if (!res.ok) throw new Error("Failed to fetch records");
      
      const data: BedOccupancyRecord[] = await res.json();
      setRecords(data);
      generateTableData(data, selectedYear);
    } catch (error) {
      console.error(error);
      toast.error("Could not load table data.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedYear, generateTableData, mtcCode]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // 3. Form Validation & Calculation Effects
  useEffect(() => {
    if (bedSanctioned && utilizedBed !== "") {
      const parsedUtilized = parseFloat(utilizedBed);
      const parsedSanctioned = parseFloat(bedSanctioned);
      
      if (parsedUtilized > parsedSanctioned) {
        setUtilizedBed(bedSanctioned);
        setBedOccupancyPercentage("100.00");
        toast.error(`Capped at maximum sanctioned beds (${bedSanctioned})`);
      } else {
        const percentage = (parsedUtilized / parsedSanctioned) * 100;
        setBedOccupancyPercentage(percentage.toFixed(2));
      }
    } else {
      setBedOccupancyPercentage("");
    }
  }, [bedSanctioned, utilizedBed]);

  // 4. Submission Logic
  const handleSave = async () => {
    if (!date || !bedSanctioned || utilizedBed === "") {
      toast.error("Please fill out the Date and Utilized Bed fields.");
      return;
    }

    if (!mtcCode || !mtcName) {
      toast.error("Security Error: MTC Block Name missing. Please login again.");
      return;
    }

    try {
      setIsSaving(true);
      
      // FIX: Secure date parsing to prevent Timezone shift bugs
      const [yearStr, monthStr, dayStr] = date.split('-');
      const year = parseInt(yearStr, 10);
      const month = parseInt(monthStr, 10);
      const day = parseInt(dayStr, 10);

      const payload = {
        mtcCode, 
        mtcName, 
        date, year, month, day,
        bedSanctioned: parseFloat(bedSanctioned),
        utilizedBed: parseFloat(utilizedBed),
        bedOccupancyPercentage: parseFloat(bedOccupancyPercentage)
      };

      const res = await fetch('/api/bed-occupancy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to save record");

      toast.success(editingId ? `Record updated for ${mtcName}!` : `Record saved for ${mtcName}!`);
      
      handleClear();
      fetchRecords();

    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleClear = () => {
    setDate("");
    setUtilizedBed("");
    setBedOccupancyPercentage("");
    setEditingId(null);
  };
  
  const handleEdit = (record: BedOccupancyRecord) => {
    setDate(record.date);
    setBedSanctioned(record.bedSanctioned.toString());
    setUtilizedBed(record.utilizedBed.toString());
    setEditingId(record.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast("Editing mode enabled", { icon: "✏️" });
  };
  
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => (currentYear - 2 + i).toString()); // Gives current year +/- 2 years
  
  return (
    <div className="min-h-screen bg-slate-50 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6 font-sans">
      <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
      
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2.5 rounded-xl border border-indigo-200 shadow-sm">
              <Activity className="h-6 w-6 text-indigo-700" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                Bed Occupancy
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-0.5">
                Block / Center: <span className="font-bold text-indigo-600 uppercase tracking-wider">{mtcName || "Loading..."}</span>
              </p>
            </div>
          </div>
          <Button
            onClick={() => router.push("/mtc-user/dashboard/home")}
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-100 transition shadow-sm bg-white"
          >
            <Home className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
        
        {/* Form Section */}
        <Card className="shadow-sm border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5 px-6">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
              <CalendarIcon className="h-4 w-4 text-indigo-500" /> 
              Daily Entry {editingId && <span className="text-xs text-rose-500 bg-red-50 px-2 py-0.5 rounded border border-rose-100 ml-2 normal-case tracking-normal">Editing Mode</span>}
            </h2>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Record Date</label>
                <div className="relative">
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 pr-10"
                    disabled={editingId !== null} 
                  />
                  <CalendarIcon className="absolute right-3 top-2.5 text-slate-400 h-4 w-4 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Sanctioned Beds</label>
                <div className="relative">
                  <Input 
                    type="text"
                    value={isCapacityLoading ? "Fetching..." : (bedSanctioned ? `${bedSanctioned} Beds` : "N/A")}
                    readOnly
                    className="bg-slate-100 font-bold text-slate-600 cursor-not-allowed border-slate-200"
                  />
                  {isCapacityLoading && <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-slate-400" />}
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Utilized Beds</label>
                <Input 
                  type="number" 
                  value={utilizedBed} 
                  disabled={!bedSanctioned || isCapacityLoading} 
                  placeholder={!bedSanctioned ? "Wait..." : "Enter count"}
                  min="0"
                  className="bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 font-semibold"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || parseFloat(val) < 0) {
                      setUtilizedBed("");
                    } else {
                      setUtilizedBed(val);
                    }
                  }} 
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Occupancy Rate</label>
                <div className="relative">
                  <Input 
                    value={bedOccupancyPercentage} 
                    readOnly 
                    className="bg-indigo-50 font-bold text-indigo-700 border-indigo-200 pr-8" 
                    placeholder="0.00"
                  />
                  <span className="absolute right-3 top-2.5 text-indigo-500 font-bold">%</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
              <Button onClick={handleClear} variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-100 w-full sm:w-auto order-2 sm:order-1">
                <X className="mr-2 h-4 w-4" /> {editingId ? 'Cancel Edit' : 'Clear Form'}
              </Button>
              <Button onClick={handleSave} disabled={isSaving || isCapacityLoading} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto order-1 sm:order-2 shadow-sm">
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {editingId ? 'Update Record' : 'Save Record'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Table Section */}
        <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 pt-5 px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
              <Activity className="h-4 w-4 text-indigo-500" /> 
              {mtcName} — Overview
            </h2>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {isLoading && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full sm:w-32 px-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium bg-white shadow-sm"
              >
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year} Records</option>
                ))}
              </select>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-full text-sm text-slate-700 border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-3 px-4 text-left font-bold text-slate-500 uppercase tracking-wider text-xs border-r border-slate-200 bg-slate-100">Day \ Month</th>
                    {monthlyData.map((m, i) => (
                      <th key={i} className="py-3 px-4 text-center font-bold text-slate-500 uppercase tracking-wider text-xs">{m.month}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dailyData.map((row, dayIndex) => (
                    <tr key={dayIndex} className="hover:bg-indigo-50/30 transition-colors">
                      <th className="py-2.5 px-4 font-bold text-left bg-slate-50 border-r border-slate-200 text-slate-600">
                        {dayIndex + 1}
                      </th>
                      {row.map((value, monthIndex) => (
                        <td 
                          key={monthIndex} 
                          className={`py-2.5 px-4 text-center border-l border-slate-50 ${value > 0 ? 'cursor-pointer font-bold text-indigo-700 hover:bg-indigo-100 hover:scale-105 transition-transform' : 'text-slate-300'}`}
                          title={value > 0 ? "Click to edit" : ""}
                          onClick={() => {
                            if (value > 0) {
                              const record = records.find(r => 
                                r.year === parseInt(selectedYear, 10) && 
                                r.month === monthIndex + 1 && 
                                r.day === dayIndex + 1
                              );
                              if (record) handleEdit(record);
                            }
                          }}
                        >
                          {value > 0 ? `${Number(value).toFixed(1)}%` : "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                  
                  {/* Monthly Average Row (Pinned to bottom visually) */}
                  <tr className="bg-indigo-50 border-t-2 border-indigo-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <th className="py-4 px-4 font-bold text-left border-r border-indigo-200 text-indigo-900 uppercase tracking-wider text-xs">
                      Avg %
                    </th>
                    {monthlyData.map((data, index) => (
                      <td key={index} className="py-4 px-4 text-center font-bold text-indigo-700 border-l border-indigo-100/50">
                        {data.occupancy > 0 ? `${data.occupancy.toFixed(1)}%` : "-"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}