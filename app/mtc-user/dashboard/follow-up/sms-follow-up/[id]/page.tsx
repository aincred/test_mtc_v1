// "use client";

// import React, { useState } from "react";
// import { Search } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // Mock data based on your HTML options
// const DISTRICTS = [
//   { id: "1", name: "BOKARO" },
//   { id: "2", name: "CHATRA" },
//   { id: "4", name: "DHANBAD" },
//   { id: "8", name: "RANCHI" },
//   { id: "16", name: "DEOGHAR" },
//   { id: "17", name: "DUMKA" },
//   { id: "22", name: "EAST SINGHBHUM" },
//   { id: "24", name: "WEST SINGHBHUM" },
// ];

// const MTC_CENTERS = [
//   { id: "90", name: "CHAIBASA" },
//   { id: "91", name: "CHAKRADHARPUR" },
//   { id: "92", name: "JAGANNATHPUR" },
//   { id: "93", name: "KUMARDUNGI" },
//   { id: "94", name: "MANOHARPUR" },
// ];

// export default function SmsFollowUpPage() {
//   const [formData, setFormData] = useState({
//     fromDate: "",
//     toDate: "",
//     districtId: "",
//     mtcId: "",
//     recordNo: "",
//     samNumber: "",
//     childName: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     // Emulating your IsOnlyNumbers onkeypress event
//     if (name === "recordNo") {
//       const numericValue = value.replace(/[^0-9]/g, "");
//       setFormData((prev) => ({ ...prev, [name]: numericValue }));
//       return;
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSearch = () => {
//     // Implement your Search / GetContactDetails() logic here
//     console.log("Searching with parameters:", formData);
//   };

//   return (
//     <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
//       <Card className="shadow-lg rounded-xl mt-8">
//         <CardHeader>
//           <CardTitle className="text-[#0B918C] text-xl font-medium">
//             SMS Follow up Due Dates
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="rounded-xl">
//           <div className="flex flex-col gap-6 text-sm">
            
//             {/* ROW 1 */}
//             <div className="grid grid-cols-12 gap-4">
//               {/* From Date */}
//               <div className="col-span-12 md:col-span-6 lg:col-span-2 space-y-2">
//                 <Label htmlFor="fromDate">From Date</Label>
//                 <Input
//                   id="fromDate"
//                   name="fromDate"
//                   type="date"
//                   value={formData.fromDate}
//                   onChange={handleInputChange}
//                   className="h-9"
//                 />
//               </div>

//               {/* To Date */}
//               <div className="col-span-12 md:col-span-6 lg:col-span-2 space-y-2">
//                 <Label htmlFor="toDate">To Date</Label>
//                 <Input
//                   id="toDate"
//                   name="toDate"
//                   type="date"
//                   value={formData.toDate}
//                   onChange={handleInputChange}
//                   className="h-9"
//                 />
//               </div>

//               {/* District */}
//               <div className="col-span-12 md:col-span-6 lg:col-span-3 space-y-2">
//                 <Label htmlFor="district">District</Label>
//                 <Select
//                   value={formData.districtId}
//                   onValueChange={(val) =>
//                     setFormData((prev) => ({ ...prev, districtId: val, mtcId: "" }))
//                   }
//                 >
//                   <SelectTrigger className="h-9">
//                     <SelectValue placeholder="Select District" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {DISTRICTS.map((district) => (
//                       <SelectItem key={district.id} value={district.id}>
//                         {district.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* MTC */}
//               <div className="col-span-12 md:col-span-6 lg:col-span-3 space-y-2">
//                 <Label htmlFor="mtc">MTC</Label>
//                 <Select
//                   disabled={!formData.districtId} // Emulating disabled="disabled"
//                   value={formData.mtcId}
//                   onValueChange={(val) =>
//                     setFormData((prev) => ({ ...prev, mtcId: val }))
//                   }
//                 >
//                   <SelectTrigger className="h-9">
//                     <SelectValue placeholder="Select MTC" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {MTC_CENTERS.map((mtc) => (
//                       <SelectItem key={mtc.id} value={mtc.id}>
//                         {mtc.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* ROW 2 */}
//             <div className="grid grid-cols-12 gap-4 items-end">
//               {/* Record No */}
//               <div className="col-span-12 md:col-span-4 lg:col-span-2 space-y-2">
//                 <Label htmlFor="recordNo">Record No</Label>
//                 <Input
//                   id="recordNo"
//                   name="recordNo"
//                   type="text"
//                   value={formData.recordNo}
//                   onChange={handleInputChange}
//                   className="h-9"
//                 />
//               </div>

//               {/* SAM Number */}
//               <div className="col-span-12 md:col-span-4 lg:col-span-2 space-y-2">
//                 <Label htmlFor="samNumber">SAM Number</Label>
//                 <Input
//                   id="samNumber"
//                   name="samNumber"
//                   type="text"
//                   value={formData.samNumber}
//                   onChange={handleInputChange}
//                   className="h-9"
//                 />
//               </div>

//               {/* Child Name */}
//               <div className="col-span-12 md:col-span-4 lg:col-span-2 space-y-2">
//                 <Label htmlFor="childName">Child Name</Label>
//                 <Input
//                   id="childName"
//                   name="childName"
//                   type="text"
//                   value={formData.childName}
//                   onChange={handleInputChange}
//                   className="h-9"
//                 />
//               </div>

//               {/* Search Button */}
//               <div className="col-span-12 md:col-span-12 lg:col-span-2 pb-[2px]">
//                 <Button
//                   onClick={handleSearch}
//                   variant="outline"
//                   className="h-9 w-full lg:w-auto text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
//                 >
//                   <Search className="w-4 h-4 mr-2" />
//                   Search
//                 </Button>
//               </div>
//             </div>

//             {/* Child List Results Placeholder */}
//             <div id="div_ChildList" className="mt-8">
//               {/* Data table or results will be rendered here */}
//             </div>
            
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client"; import React, { useState } from "react"; import { Search } from "lucide-react"; import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"; import { Input } from "@/components/ui/input"; import { Label } from "@/components/ui/label"; import { Button } from "@/components/ui/button"; import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"; const DISTRICTS = [ { id: "1", name: "BOKARO" }, { id: "2", name: "CHATRA" }, { id: "4", name: "DHANBAD" }, { id: "8", name: "RANCHI" }, { id: "16", name: "DEOGHAR" }, { id: "17", name: "DUMKA" }, { id: "22", name: "EAST SINGHBHUM" }, { id: "24", name: "WEST SINGHBHUM" }, ]; const MTC_CENTERS = [ { id: "90", name: "CHAIBASA" }, { id: "91", name: "CHAKRADHARPUR" }, { id: "92", name: "JAGANNATHPUR" }, { id: "93", name: "KUMARDUNGI" }, { id: "94", name: "MANOHARPUR" }, ]; export default function SmsFollowUpPage() { const [formData, setFormData] = useState({ fromDate: "", toDate: "", districtId: "", mtcId: "", recordNo: "", samNumber: "", childName: "", }); const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { const { name, value } = e.target; if (name === "recordNo") { const numericValue = value.replace(/[^0-9]/g, ""); setFormData((prev) => ({ ...prev, [name]: numericValue })); return; } setFormData((prev) => ({ ...prev, [name]: value })); }; const handleSearch = () => { console.log("Searching with parameters:", formData); }; return ( <div className="min-h-screen bg-linear-to-br from-blue-50 via-blue-100 to-indigo-100 p-4 md:p-8"> <div className="w-full max-w-7xl mx-auto"> <Card className="shadow-2xl rounded-2xl overflow-hidden border-0 bg-white/95 backdrop-blur-sm"> <CardHeader className="bg-linear-to-r from-blue-600 via-blue-700 to-blue-800"> <CardTitle className="text-white text-2xl font-semibold"> SMS Follow-up Due Dates </CardTitle> </CardHeader> <CardContent className="p-6"> <div className="flex flex-col gap-6 text-sm"> {/* Row 1 */} <div className="grid grid-cols-12 gap-4"> <div className="col-span-12 md:col-span-6 lg:col-span-2 space-y-2"> <Label className="text-blue-700 font-medium"> From Date </Label> <Input name="fromDate" type="date" value={formData.fromDate} onChange={handleInputChange} className="h-10 border-blue-200 focus-visible:ring-blue-500" /> </div> <div className="col-span-12 md:col-span-6 lg:col-span-2 space-y-2"> <Label className="text-blue-700 font-medium"> To Date </Label> <Input name="toDate" type="date" value={formData.toDate} onChange={handleInputChange} className="h-10 border-blue-200 focus-visible:ring-blue-500" /> </div> <div className="col-span-12 md:col-span-6 lg:col-span-3 space-y-2"> <Label className="text-blue-700 font-medium"> District </Label> <Select value={formData.districtId} onValueChange={(val) => setFormData((prev) => ({ ...prev, districtId: val, mtcId: "", })) } > <SelectTrigger className="h-10 border-blue-200"> <SelectValue placeholder="Select District" /> </SelectTrigger> <SelectContent> {DISTRICTS.map((district) => ( <SelectItem key={district.id} value={district.id} > {district.name} </SelectItem> ))} </SelectContent> </Select> </div> <div className="col-span-12 md:col-span-6 lg:col-span-3 space-y-2"> <Label className="text-blue-700 font-medium"> MTC </Label> <Select disabled={!formData.districtId} value={formData.mtcId} onValueChange={(val) => setFormData((prev) => ({ ...prev, mtcId: val, })) } > <SelectTrigger className="h-10 border-blue-200"> <SelectValue placeholder="Select MTC" /> </SelectTrigger> <SelectContent> {MTC_CENTERS.map((mtc) => ( <SelectItem key={mtc.id} value={mtc.id} > {mtc.name} </SelectItem> ))} </SelectContent> </Select> </div> </div> {/* Row 2 */} <div className="grid grid-cols-12 gap-4 items-end"> <div className="col-span-12 md:col-span-4 lg:col-span-2 space-y-2"> <Label className="text-blue-700 font-medium"> Record No </Label> <Input name="recordNo" value={formData.recordNo} onChange={handleInputChange} className="h-10 border-blue-200 focus-visible:ring-blue-500" /> </div> <div className="col-span-12 md:col-span-4 lg:col-span-2 space-y-2"> <Label className="text-blue-700 font-medium"> SAM Number </Label> <Input name="samNumber" value={formData.samNumber} onChange={handleInputChange} className="h-10 border-blue-200 focus-visible:ring-blue-500" /> </div> <div className="col-span-12 md:col-span-4 lg:col-span-3 space-y-2"> <Label className="text-blue-700 font-medium"> Child Name </Label> <Input name="childName" value={formData.childName} onChange={handleInputChange} className="h-10 border-blue-200 focus-visible:ring-blue-500" /> </div> <div className="col-span-12 lg:col-span-2"> <Button onClick={handleSearch} className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white shadow-lg" > <Search className="w-4 h-4 mr-2" /> Search </Button> </div> </div> {/* Results Section */} <div id="div_ChildList" className="mt-6 bg-white border border-blue-100 rounded-xl shadow-sm p-6 min-h-[250px]" > <div className="flex items-center justify-center h-full text-blue-500"> Search results will appear here </div> </div> </div> </CardContent> </Card> </div> </div> ); }