// // // /mtc-user/dashboard/staff/add-staff

// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // import { CalendarIcon, Save, Home, X } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";

// // interface StaffDetails {
// //   id: number;
// //   name: string;
// //   designationId: string;
// //   mobile: string;
// //   email: string;
// //   joiningDate: string;
// //   fsamTraining: string;
// //   fsamTrainingDate: string;
// //   refresherTraining: string;
// //   refresherTrainingDate: string;
// //   status: boolean;
// //   districtName: string;
// //   mtcName: string;
// // }

// // // Define a proper type for staff list items
// // interface StaffListItem {
// //   id: number;
// //   slNo: number;
// //   districtName: string;
// //   mtcName: string;
// //   name: string;
// //   mobileNumber: string;
// //   emailId: string;
// //   designation: string;
// //   fsamTrainingReceived: string;
// //   fsamTrainingDate: string;
// //   refresherTrainingReceived: string;
// //   refresherTrainingDate: string;
// //   lastModifiedDate: string;
// // }

// // const designationOptions = [
// //   { value: "1", label: "Medical Officer" },
// //   { value: "2", label: "ANM" },
// //   { value: "3", label: "Nutrition Counsellor" },
// //   { value: "4", label: "Cook cum Care Taker" },
// //   { value: "5", label: "Attendent Cleaner" },
// //   { value: "6", label: "Medical Social Worker" },
// //   { value: "7", label: "Block Data Manager" },
// //   { value: "8", label: "Block Programme Manager" },
// //   { value: "9", label: "Hospital Manager" },
// //   { value: "10", label: "Support Staff" }
// // ];

// // const districts = [
// //   "BOKARO", "CHATRA", "DEOGHAR", "DHANBAD", "DUMKA", "EAST SINGHBHUM", 
// //   "GARHWA", "GIRIDIH", "GODDA", "GUMLA", "HAZARIBAGH", "JAMTARA", 
// //   "KHUNTI", "KODERMA", "LATEHAR", "LOHARDAGA", "PAKUR", "PALAMU", 
// //   "RAMGARH", "RANCHI", "SAHIBGANJ", "SERAIKELA", "SIMDEGA", "WEST SINGHBHUM"
// // ];

// // export default function StaffDetailsPage({ params }: { params: { staffId: string } }) {
// //   const router = useRouter();
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [showFsamDate, setShowFsamDate] = useState(false);
// //   const [showRefresherDate, setShowRefresherDate] = useState(false);
  
// //   const [formData, setFormData] = useState<StaffDetails>({
// //     id: 0,
// //     name: "",
// //     designationId: "",
// //     mobile: "",
// //     email: "",
// //     joiningDate: "",
// //     fsamTraining: "",
// //     fsamTrainingDate: "",
// //     refresherTraining: "",
// //     refresherTrainingDate: "",
// //     status: true,
// //     districtName: "",
// //     mtcName: ""
// //   });

// //   // Load staff data if editing
// //   useEffect(() => {
// //     const staffId = params.staffId;
// //     if (staffId !== "0") {
// //       setIsEditing(true);
// //       // Load staff data from localStorage
// //       const savedStaff = localStorage.getItem('staffData');
// //       if (savedStaff) {
// //         const staffData = JSON.parse(savedStaff);
// //         const staff = staffData.find((s: StaffDetails) => s.id === parseInt(staffId));
// //         if (staff) {
// //           setFormData(staff);
// //         }
// //       }
// //     }
// //   }, [params.staffId]);

// //   // Show/hide date fields based on training selection
// //   useEffect(() => {
// //     setShowFsamDate(formData.fsamTraining === "1");
// //     setShowRefresherDate(formData.refresherTraining === "1");
// //   }, [formData.fsamTraining, formData.refresherTraining]);

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target;
    
// //     if (name === "STATUS") {
// //       setFormData(prev => ({ ...prev, status: value === "True" }));
// //     } else {
// //       setFormData(prev => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   const validateForm = () => {
// //     // Validate required fields
// //     if (!formData.name.trim()) {
// //       toast.error("Name is required");
// //       return false;
// //     }
    
// //     if (!formData.designationId) {
// //       toast.error("Designation is required");
// //       return false;
// //     }
    
// //     if (!formData.mobile.trim()) {
// //       toast.error("Mobile number is required");
// //       return false;
// //     }
    
// //     if (!/^\d{10}$/.test(formData.mobile)) {
// //       toast.error("Mobile number must be 10 digits");
// //       return false;
// //     }
    
// //     if (!formData.email.trim()) {
// //       toast.error("Email is required");
// //       return false;
// //     }
    
// //     if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
// //       toast.error("Please enter a valid email address");
// //       return false;
// //     }
    
// //     if (!formData.districtName) {
// //       toast.error("District is required");
// //       return false;
// //     }
    
// //     if (!formData.mtcName.trim()) {
// //       toast.error("MTC Name is required");
// //       return false;
// //     }
    
// //     return true;
// //   };

// //   const handleSave = async () => {
// //     if (!validateForm()) return;
    
// //     setLoading(true);
    
// //     try {
// //       // Get existing staff data from localStorage
// //       const savedStaff = localStorage.getItem('staffData');
// //       // Changed from 'let' to 'const' since it's never reassigned
// //       const staffData: StaffListItem[] = savedStaff ? JSON.parse(savedStaff) : [];
      
// //       // Get designation label
// //       const designation = designationOptions.find(option => option.value === formData.designationId)?.label || "";
      
// //       // Format dates
// //       const formatDate = (dateString: string) => {
// //         if (!dateString) return "";
// //         const date = new Date(dateString);
// //         return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
// //       };
      
// //       // Create staff object for list
// //       const staffForList: StaffListItem = {
// //         id: isEditing ? formData.id : Date.now(),
// //         slNo: isEditing ? staffData.findIndex((s) => s.id === formData.id) + 1 : staffData.length + 1,
// //         districtName: formData.districtName,
// //         mtcName: formData.mtcName,
// //         name: formData.name,
// //         mobileNumber: formData.mobile,
// //         emailId: formData.email,
// //         designation,
// //         fsamTrainingReceived: formData.fsamTraining === "1" ? "Yes" : "No",
// //         fsamTrainingDate: formatDate(formData.fsamTrainingDate),
// //         refresherTrainingReceived: formData.refresherTraining === "1" ? "Yes" : "No",
// //         refresherTrainingDate: formatDate(formData.refresherTrainingDate),
// //         lastModifiedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
// //       };
      
// //       if (isEditing) {
// //         // Update existing staff
// //         const index = staffData.findIndex((s) => s.id === formData.id);
// //         if (index !== -1) {
// //           // Create a new array instead of mutating the existing one
// //           const updatedStaffData = [...staffData];
// //           updatedStaffData[index] = staffForList;
// //           localStorage.setItem('staffData', JSON.stringify(updatedStaffData));
// //         } else {
// //           localStorage.setItem('staffData', JSON.stringify(staffData));
// //         }
// //       } else {
// //         // Add new staff
// //         const newStaffData = [...staffData, staffForList];
// //         localStorage.setItem('staffData', JSON.stringify(newStaffData));
// //       }
      
// //       toast.success(isEditing ? "Staff details updated successfully!" : "Staff details saved successfully!");
      
// //       // Navigate back to the staff list after saving
// //       setTimeout(() => {
// //         router.push("/mtc-user/dashboard/staff");
// //       }, 1000);
// //     } catch (error) {
// //       // Use the error parameter or replace with underscore if intentionally unused
// //       console.error("Error saving staff details:", error);
// //       toast.error("An error occurred while saving staff details");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCancel = () => {
// //     router.push("/mtc-user/dashboard/staff");
// //   };

// //   const handleBackToHome = () => {
// //     router.push("/mtc-user/dashboard/home");
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
// //       <Toaster position="top-right" />

// //       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
// //             Staff Details
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

// //         {/* Form Section */}
// //         <Card className="shadow-sm border border-gray-200">
// //           <CardHeader className="pb-2 sm:pb-4">
// //             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
// //               {isEditing ? "Edit Staff Details" : "Add New Staff Member"}
// //             </h2>
// //           </CardHeader>

// //           <CardContent>
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                   District <span className="text-red-500">*</span>
// //                 </label>
// //                 <select
// //                   name="districtName"
// //                   value={formData.districtName}
// //                   onChange={handleInputChange}
// //                   className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 >
// //                   <option value="">Select District</option>
// //                   {districts.map(district => (
// //                     <option key={district} value={district}>
// //                       {district}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
              
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                   MTC Name <span className="text-red-500">*</span>
// //                 </label>
// //                 <Input
// //                   name="mtcName"
// //                   value={formData.mtcName}
// //                   onChange={handleInputChange}
// //                   className="text-xs sm:text-sm"
// //                   placeholder="Enter MTC name"
// //                   maxLength={50}
// //                 />
// //               </div>
              
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                   Name <span className="text-red-500">*</span>
// //                 </label>
// //                 <Input
// //                   name="name"
// //                   value={formData.name}
// //                   onChange={handleInputChange}
// //                   className="text-xs sm:text-sm"
// //                   placeholder="Enter staff name"
// //                   maxLength={50}
// //                 />
// //               </div>
              
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                   Designation <span className="text-red-500">*</span>
// //                 </label>
// //                 <select
// //                   name="designationId"
// //                   value={formData.designationId}
// //                   onChange={handleInputChange}
// //                   className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 >
// //                   <option value="">Select</option>
// //                   {designationOptions.map(option => (
// //                     <option key={option.value} value={option.value}>
// //                       {option.label}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>
            
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                   Mobile <span className="text-red-500">*</span>
// //                 </label>
// //                 <Input
// //                   name="mobile"
// //                   value={formData.mobile}
// //                   onChange={handleInputChange}
// //                   className="text-xs sm:text-sm"
// //                   placeholder="Enter mobile number"
// //                   maxLength={10}
// //                 />
// //               </div>
              
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                   Email (Personal/MTC) <span className="text-red-500">*</span>
// //                 </label>
// //                 <Input
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleInputChange}
// //                   className="text-xs sm:text-sm"
// //                   placeholder="Enter email address"
// //                   maxLength={100}
// //                 />
// //               </div>
              
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                   Date of joining at MTC
// //                 </label>
// //                 <div className="relative">
// //                   <Input
// //                     type="date"
// //                     name="joiningDate"
// //                     value={formData.joiningDate}
// //                     onChange={handleInputChange}
// //                     className="pr-8 sm:pr-10 text-xs sm:text-sm"
// //                   />
// //                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// //                 </div>
// //               </div>
              
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                   3 Days FSAM Training
// //                 </label>
// //                 <select
// //                   name="fsamTraining"
// //                   value={formData.fsamTraining}
// //                   onChange={handleInputChange}
// //                   className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 >
// //                   <option value="">Select</option>
// //                   <option value="1">Yes</option>
// //                   <option value="2">No</option>
// //                 </select>
// //               </div>
// //             </div>
            
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
// //               {showFsamDate && (
// //                 <div>
// //                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                     Date of Recent FSAM Training received
// //                   </label>
// //                   <div className="relative">
// //                     <Input
// //                       type="date"
// //                       name="fsamTrainingDate"
// //                       value={formData.fsamTrainingDate}
// //                       onChange={handleInputChange}
// //                       className="pr-8 sm:pr-10 text-xs sm:text-sm"
// //                     />
// //                     <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// //                   </div>
// //                 </div>
// //               )}
              
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                   One Day Orientation/Refresher Training
// //                 </label>
// //                 <select
// //                   name="refresherTraining"
// //                   value={formData.refresherTraining}
// //                   onChange={handleInputChange}
// //                   className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 >
// //                   <option value="">Select</option>
// //                   <option value="1">Yes</option>
// //                   <option value="2">No</option>
// //                 </select>
// //               </div>
              
// //               {showRefresherDate && (
// //                 <div>
// //                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                     Date of Recent Training received
// //                   </label>
// //                   <div className="relative">
// //                     <Input
// //                       type="date"
// //                       name="refresherTrainingDate"
// //                       value={formData.refresherTrainingDate}
// //                       onChange={handleInputChange}
// //                       className="pr-8 sm:pr-10 text-xs sm:text-sm"
// //                     />
// //                     <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
// //                   </div>
// //                 </div>
// //               )}
              
// //               <div>
// //                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
// //                   Status <span className="text-red-500">*</span>
// //                 </label>
// //                 <div className="flex gap-4">
// //                   <div className="flex items-center">
// //                     <input
// //                       type="radio"
// //                       id="rb_StatusTrue"
// //                       name="STATUS"
// //                       value="True"
// //                       checked={formData.status}
// //                       onChange={handleInputChange}
// //                       className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
// //                     />
// //                     <label htmlFor="rb_StatusTrue" className="ml-2 text-xs sm:text-sm text-gray-700">
// //                       Active
// //                     </label>
// //                   </div>
// //                   <div className="flex items-center">
// //                     <input
// //                       type="radio"
// //                       id="rb_StatusFalse"
// //                       name="STATUS"
// //                       value="False"
// //                       checked={!formData.status}
// //                       onChange={handleInputChange}
// //                       className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
// //                     />
// //                     <label htmlFor="rb_StatusFalse" className="ml-2 text-xs sm:text-sm text-gray-700">
// //                       Inactive
// //                     </label>
// //                   </div>
// //                 </div>
// //               </div> 
// //             </div>
            
// //             <div className="flex justify-end gap-2 mt-6">
// //               <Button
// //                 onClick={handleSave}
// //                 disabled={loading}
// //                 className="bg-indigo-600 hover:bg-indigo-700 text-xs sm:text-sm"
// //               >
// //                 <Save className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
// //                 {loading ? "Saving..." : "Save"}
// //               </Button>
// //               <Button
// //                 onClick={handleCancel}
// //                 variant="outline"
// //                 className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
// //               >
// //                 <X className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
// //                 Cancel
// //               </Button>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }

// // app\mtc-user\dashboard\staff\add-staff\[id]
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { CalendarIcon, Save, Home, X, Loader2 } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// interface StaffDetails {
//   id: number;
//   name: string;
//   designationId: string;
//   mobile: string;
//   email: string;
//   joiningDate: string;
//   fsamTraining: string; // "1" for Yes, "2" for No
//   fsamTrainingDate: string;
//   refresherTraining: string; // "1" for Yes, "2" for No
//   refresherTrainingDate: string;
//   status: boolean;
//   districtName: string;
//   mtcName: string;
// }

// const designationOptions = [
//   { value: "1", label: "Medical Officer" },
//   { value: "2", label: "ANM" },
//   { value: "3", label: "Nutrition Counsellor" },
//   { value: "4", label: "Cook cum Care Taker" },
//   { value: "5", label: "Attendent Cleaner" },
//   { value: "6", label: "Medical Social Worker" },
//   { value: "7", label: "Block Data Manager" },
//   { value: "8", label: "Block Programme Manager" },
//   { value: "9", label: "Hospital Manager" },
//   { value: "10", label: "Support Staff" }
// ];

// const districts = [
//   "BOKARO", "CHATRA", "DEOGHAR", "DHANBAD", "DUMKA", "EAST SINGHBHUM", 
//   "GARHWA", "GIRIDIH", "GODDA", "GUMLA", "HAZARIBAGH", "JAMTARA", 
//   "KHUNTI", "KODERMA", "LATEHAR", "LOHARDAGA", "PAKUR", "PALAMU", 
//   "RAMGARH", "RANCHI", "SAHIBGANJ", "SERAIKELA", "SIMDEGA", "WEST SINGHBHUM"
// ];

// export default function StaffDetailsPage({ params }: { params: { staffId: string } }) {
//   const router = useRouter();
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [fetchingData, setFetchingData] = useState(true);
  
//   const [showFsamDate, setShowFsamDate] = useState(false);
//   const [showRefresherDate, setShowRefresherDate] = useState(false);
  
//   const [formData, setFormData] = useState<StaffDetails>({
//     id: 0,
//     name: "",
//     designationId: "",
//     mobile: "",
//     email: "",
//     joiningDate: "",
//     fsamTraining: "",
//     fsamTrainingDate: "",
//     refresherTraining: "",
//     refresherTrainingDate: "",
//     status: true,
//     districtName: "",
//     mtcName: ""
//   });

//   // Load staff data from DB if editing
//   useEffect(() => {
//     const staffId = params.staffId;
    
//     if (staffId && staffId !== "0" && staffId !== "new") {
//       setIsEditing(true);
//       const fetchStaff = async () => {
//         try {
//           const res = await fetch(`/api/staff/${staffId}`);
//           if (!res.ok) throw new Error("Failed to fetch");
//           const data = await res.json();
          
//           setFormData({
//             id: data.id,
//             name: data.name || "",
//             designationId: data.designationId || "",
//             mobile: data.mobile || "",
//             email: data.email || "",
//             joiningDate: data.joiningDate || "",
//             // Convert DB boolean to Select values
//             fsamTraining: data.fsamTraining ? "1" : "2",
//             fsamTrainingDate: data.fsamTrainingDate || "",
//             refresherTraining: data.refresherTraining ? "1" : "2",
//             refresherTrainingDate: data.refresherTrainingDate || "",
//             status: data.status,
//             districtName: data.districtName || "",
//             mtcName: data.mtcName || ""
//           });
//         } catch (error) {
//           toast.error("Failed to load staff details");
//           console.error(error);
//         } finally {
//           setFetchingData(false);
//         }
//       };
//       fetchStaff();
//     } else {
//       setFetchingData(false);
//     }
//   }, [params.staffId]);

//   // Show/hide date fields based on training selection
//   useEffect(() => {
//     setShowFsamDate(formData.fsamTraining === "1");
//     setShowRefresherDate(formData.refresherTraining === "1");
//   }, [formData.fsamTraining, formData.refresherTraining]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     if (name === "STATUS") {
//       setFormData(prev => ({ ...prev, status: value === "True" }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const validateForm = () => {
//     if (!formData.districtName) { toast.error("District is required"); return false; }
//     if (!formData.mtcName.trim()) { toast.error("MTC Name is required"); return false; }
//     if (!formData.name.trim()) { toast.error("Name is required"); return false; }
//     if (!formData.designationId) { toast.error("Designation is required"); return false; }
//     if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) { toast.error("Valid 10-digit mobile required"); return false; }
//     if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) { toast.error("Valid email required"); return false; }
//     return true;
//   };

//   const handleSave = async () => {
//     if (!validateForm()) return;
//     setLoading(true);
    
//     try {
//       // Convert UI "1"/"2" back to proper database Booleans
//       const payload = {
//         ...formData,
//         fsamTraining: formData.fsamTraining === "1",
//         refresherTraining: formData.refresherTraining === "1",
//       };

//       const url = isEditing ? `/api/staff/${formData.id}` : `/api/staff`;
//       const method = isEditing ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) throw new Error("API request failed");
      
//       toast.success(isEditing ? "Staff details updated!" : "Staff added successfully!");
      
//       setTimeout(() => {
//         router.push("/mtc-user/dashboard/staff");
//       }, 1000);
      
//     } catch (error) {
//       console.error("Error saving staff:", error);
//       toast.error("An error occurred while saving.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetchingData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
//       <Toaster position="top-right" />

//       <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
//             Staff Details
//           </h1>
//           <div className="flex gap-2 sm:gap-3">
//             <Button
//               onClick={() => router.push("/mtc-user/dashboard/home")}
//               variant="outline"
//               className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
//             >
//               <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
//               <span className="hidden sm:inline">Back to Home</span>
//               <span className="sm:hidden">Home</span>
//             </Button>
//           </div>
//         </div>

//         {/* Form Section */}
//         <Card className="shadow-sm border border-gray-200">
//           <CardHeader className="pb-2 sm:pb-4">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//               {isEditing ? "Edit Staff Details" : "Add New Staff Member"}
//             </h2>
//           </CardHeader>

//           <CardContent>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   District <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="districtName"
//                   value={formData.districtName}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
//                 >
//                   <option value="">Select District</option>
//                   {districts.map(district => (
//                     <option key={district} value={district}>{district}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   MTC Name <span className="text-red-500">*</span>
//                 </label>
//                 <Input
//                   name="mtcName"
//                   value={formData.mtcName}
//                   onChange={handleInputChange}
//                   className="text-xs sm:text-sm"
//                   placeholder="Enter MTC name"
//                   maxLength={50}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   Name <span className="text-red-500">*</span>
//                 </label>
//                 <Input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="text-xs sm:text-sm"
//                   placeholder="Enter staff name"
//                   maxLength={50}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   Designation <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="designationId"
//                   value={formData.designationId}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
//                 >
//                   <option value="">Select</option>
//                   {designationOptions.map(option => (
//                     <option key={option.value} value={option.value}>{option.label}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   Mobile <span className="text-red-500">*</span>
//                 </label>
//                 <Input
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleInputChange}
//                   className="text-xs sm:text-sm"
//                   placeholder="10-digit number"
//                   maxLength={10}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   Email (Personal/MTC) <span className="text-red-500">*</span>
//                 </label>
//                 <Input
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="text-xs sm:text-sm"
//                   placeholder="Enter email address"
//                   maxLength={100}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   Date of joining at MTC
//                 </label>
//                 <div className="relative">
//                   <Input
//                     type="date"
//                     name="joiningDate"
//                     value={formData.joiningDate}
//                     onChange={handleInputChange}
//                     className="pr-8 sm:pr-10 text-xs sm:text-sm"
//                   />
//                   <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   3 Days FSAM Training
//                 </label>
//                 <select
//                   name="fsamTraining"
//                   value={formData.fsamTraining}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
//                 >
//                   <option value="">Select</option>
//                   <option value="1">Yes</option>
//                   <option value="2">No</option>
//                 </select>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
//               {showFsamDate && (
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                     Date of Recent FSAM Training
//                   </label>
//                   <div className="relative">
//                     <Input
//                       type="date"
//                       name="fsamTrainingDate"
//                       value={formData.fsamTrainingDate}
//                       onChange={handleInputChange}
//                       className="pr-8 sm:pr-10 text-xs sm:text-sm"
//                     />
//                     <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
//                   </div>
//                 </div>
//               )}
              
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   One Day Orientation/Refresher
//                 </label>
//                 <select
//                   name="refresherTraining"
//                   value={formData.refresherTraining}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
//                 >
//                   <option value="">Select</option>
//                   <option value="1">Yes</option>
//                   <option value="2">No</option>
//                 </select>
//               </div>
              
//               {showRefresherDate && (
//                 <div>
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                     Date of Recent Refresher
//                   </label>
//                   <div className="relative">
//                     <Input
//                       type="date"
//                       name="refresherTrainingDate"
//                       value={formData.refresherTrainingDate}
//                       onChange={handleInputChange}
//                       className="pr-8 sm:pr-10 text-xs sm:text-sm"
//                     />
//                     <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
//                   </div>
//                 </div>
//               )}
              
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                   Status <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex gap-4 mt-2">
//                   <div className="flex items-center">
//                     <input
//                       type="radio"
//                       id="rb_StatusTrue"
//                       name="STATUS"
//                       value="True"
//                       checked={formData.status === true}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
//                     />
//                     <label htmlFor="rb_StatusTrue" className="ml-2 text-xs sm:text-sm text-gray-700">Active</label>
//                   </div>
//                   <div className="flex items-center">
//                     <input
//                       type="radio"
//                       id="rb_StatusFalse"
//                       name="STATUS"
//                       value="False"
//                       checked={formData.status === false}
//                       onChange={handleInputChange}
//                       className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
//                     />
//                     <label htmlFor="rb_StatusFalse" className="ml-2 text-xs sm:text-sm text-gray-700">Inactive</label>
//                   </div>
//                 </div>
//               </div> 
//             </div>
            
//             <div className="flex justify-end gap-2 mt-8 pt-4 border-t border-gray-100">
//               <Button
//                 onClick={handleSave}
//                 disabled={loading}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-xs sm:text-sm min-w-32"
//               >
//                 {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
//                 {isEditing ? "Update Staff" : "Save Staff"}
//               </Button>
//               <Button
//                 onClick={() => router.push("/mtc-user/dashboard/staff")}
//                 variant="outline"
//                 className="border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm"
//               >
//                 <X className="mr-2 h-4 w-4" /> Cancel
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CalendarIcon, Save, Home, X, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface StaffDetails {
  id: number;
  mtcId: string; // ✅ Added mtcId to link staff
  name: string;
  designationId: string;
  mobile: string;
  email: string;
  joiningDate: string;
  fsamTraining: string; 
  fsamTrainingDate: string;
  refresherTraining: string; 
  refresherTrainingDate: string;
  status: boolean;
  districtName: string;
  mtcName: string;
}

const designationOptions = [
  { value: "1", label: "Medical Officer" },
  { value: "2", label: "ANM" },
  { value: "3", label: "Nutrition Counsellor" },
  { value: "4", label: "Cook cum Care Taker" },
  { value: "5", label: "Attendent Cleaner" },
  { value: "6", label: "Medical Social Worker" },
  { value: "7", label: "Block Data Manager" },
  { value: "8", label: "Block Programme Manager" },
  { value: "9", label: "Hospital Manager" },
  { value: "10", label: "Support Staff" }
];

export default function StaffDetailsPage({ params }: { params: Promise<{ staffId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const staffId = resolvedParams.staffId;

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  
  const [showFsamDate, setShowFsamDate] = useState(false);
  const [showRefresherDate, setShowRefresherDate] = useState(false);
  
  const [formData, setFormData] = useState<StaffDetails>({
    id: 0,
    mtcId: "",
    name: "",
    designationId: "",
    mobile: "",
    email: "",
    joiningDate: "",
    fsamTraining: "",
    fsamTrainingDate: "",
    refresherTraining: "",
    refresherTrainingDate: "",
    status: true,
    districtName: "",
    mtcName: ""
  });

  // Pre-fill MTC Details on Mount
  useEffect(() => {
    const sessionData = sessionStorage.getItem("mtc_user");
    if (sessionData) {
      try {
        const user = JSON.parse(sessionData);
        setFormData(prev => ({
          ...prev,
          mtcId: user.mtcId?.toString() || "",
          mtcName: user.mtcName || user.loginId || "",
          districtName: user.districtName || "" 
        }));
      } catch (err) {
        console.error("Session parse error", err);
      }
    }
  }, []);

  // Load staff data from DB if editing
  useEffect(() => {
    if (staffId && staffId !== "0" && staffId !== "new") {
      setIsEditing(true);
      const fetchStaff = async () => {
        try {
          const res = await fetch(`/api/staff/${staffId}`);
          if (!res.ok) throw new Error("Failed to fetch");
          const data = await res.json();
          
          setFormData(prev => ({
            ...prev,
            id: data.id,
            name: data.name || "",
            designationId: data.designationId || "",
            mobile: data.mobile || "",
            email: data.email || "",
            joiningDate: data.joiningDate || "",
            fsamTraining: data.fsamTraining ? "1" : "2",
            fsamTrainingDate: data.fsamTrainingDate || "",
            refresherTraining: data.refresherTraining ? "1" : "2",
            refresherTrainingDate: data.refresherTrainingDate || "",
            status: data.status,
            // Only overwrite district/mtc if they were saved, otherwise keep session defaults
            districtName: data.districtName || prev.districtName,
            mtcName: data.mtcName || prev.mtcName,
            mtcId: data.mtcId?.toString() || prev.mtcId
          }));
        } catch (error) {
          toast.error("Failed to load staff details");
          console.error(error);
        } finally {
          setFetchingData(false);
        }
      };
      fetchStaff();
    } else {
      setFetchingData(false);
    }
  }, [staffId]);

  useEffect(() => {
    setShowFsamDate(formData.fsamTraining === "1");
    setShowRefresherDate(formData.refresherTraining === "1");
  }, [formData.fsamTraining, formData.refresherTraining]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "STATUS") {
      setFormData(prev => ({ ...prev, status: value === "True" }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.mtcId) { toast.error("Session Error: MTC ID not found. Log in again."); return false; }
    if (!formData.name.trim()) { toast.error("Name is required"); return false; }
    if (!formData.designationId) { toast.error("Designation is required"); return false; }
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) { toast.error("Valid 10-digit mobile required"); return false; }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) { toast.error("Valid email required"); return false; }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    
    try {
      const payload = {
        ...formData,
        fsamTraining: formData.fsamTraining === "1",
        refresherTraining: formData.refresherTraining === "1",
      };

      const url = isEditing ? `/api/staff/${formData.id}` : `/api/staff`;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("API request failed");
      
      toast.success(isEditing ? "Staff details updated!" : "Staff added successfully!");
      
      setTimeout(() => {
        router.push("/mtc-user/dashboard/staff");
      }, 1000);
      
    } catch (error) {
      console.error("Error saving staff:", error);
      toast.error("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            Staff Details
          </h1>
          <div className="flex gap-2 sm:gap-3">
            <Button
              onClick={() => router.push("/mtc-user/dashboard/home")}
              variant="outline"
              className="border-gray-600 text-gray-700 hover:bg-gray-100 transition text-xs sm:text-sm"
            >
              <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Button>
          </div>
        </div>

        {/* Form Section */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-2 sm:pb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {isEditing ? "Edit Staff Details" : "Add New Staff Member"}
            </h2>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  District <span className="text-red-500">*</span>
                </label>
                <Input
                  name="districtName"
                  value={formData.districtName}
                  readOnly
                  className="text-xs sm:text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  MTC Name <span className="text-red-500">*</span>
                </label>
                <Input
                  name="mtcName"
                  value={formData.mtcName}
                  readOnly
                  className="text-xs sm:text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="text-xs sm:text-sm"
                  placeholder="Enter staff name"
                  maxLength={50}
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Designation <span className="text-red-500">*</span>
                </label>
                <select
                  name="designationId"
                  value={formData.designationId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">Select</option>
                  {designationOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <Input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="text-xs sm:text-sm"
                  placeholder="10-digit number"
                  maxLength={10}
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Email (Personal/MTC) <span className="text-red-500">*</span>
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="text-xs sm:text-sm"
                  placeholder="Enter email address"
                  maxLength={100}
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Date of joining at MTC
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                    className="pr-8 sm:pr-10 text-xs sm:text-sm"
                  />
                  <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  3 Days FSAM Training
                </label>
                <select
                  name="fsamTraining"
                  value={formData.fsamTraining}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">Select</option>
                  <option value="1">Yes</option>
                  <option value="2">No</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {showFsamDate && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Date of Recent FSAM Training
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      name="fsamTrainingDate"
                      value={formData.fsamTrainingDate}
                      onChange={handleInputChange}
                      className="pr-8 sm:pr-10 text-xs sm:text-sm"
                    />
                    <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  One Day Orientation/Refresher
                </label>
                <select
                  name="refresherTraining"
                  value={formData.refresherTraining}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">Select</option>
                  <option value="1">Yes</option>
                  <option value="2">No</option>
                </select>
              </div>
              
              {showRefresherDate && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Date of Recent Refresher
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      name="refresherTrainingDate"
                      value={formData.refresherTrainingDate}
                      onChange={handleInputChange}
                      className="pr-8 sm:pr-10 text-xs sm:text-sm"
                    />
                    <CalendarIcon className="absolute right-2 top-2.5 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="rb_StatusTrue"
                      name="STATUS"
                      value="True"
                      checked={formData.status === true}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="rb_StatusTrue" className="ml-2 text-xs sm:text-sm text-gray-700">Active</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="rb_StatusFalse"
                      name="STATUS"
                      value="False"
                      checked={formData.status === false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor="rb_StatusFalse" className="ml-2 text-xs sm:text-sm text-gray-700">Inactive</label>
                  </div>
                </div>
              </div> 
            </div>
            
            <div className="flex justify-end gap-2 mt-8 pt-4 border-t border-gray-100">
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-xs sm:text-sm min-w-32"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {isEditing ? "Update Staff" : "Save Staff"}
              </Button>
              <Button
                onClick={() => router.push("/mtc-user/dashboard/staff")}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm"
              >
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}