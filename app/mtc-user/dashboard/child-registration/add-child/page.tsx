// // // // "use client";

// // // // import { useState, useEffect } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // // import { Label } from "@/components/ui/label";
// // // // import {
// // // //   Select,
// // // //   SelectContent,
// // // //   SelectItem,
// // // //   SelectTrigger,
// // // //   SelectValue,
// // // // } from "@/components/ui/select";
// // // // import { CalendarIcon, Upload, Clock } from "lucide-react";
// // // // import toast, { Toaster } from "react-hot-toast";
// // // // import { Textarea } from "@/components/ui/textarea";
// // // // import { Calendar } from "@/components/ui/calendar";
// // // // import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// // // // import { format } from "date-fns";
// // // // import { cn } from "@/lib/utils";
// // // // import Image from "next/image"; // Import the Image component

// // // // export default function ChildRegistration() {
// // // //   const router = useRouter();
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [samNumber, setSamNumber] = useState("");
// // // //   const [referredBy, setReferredBy] = useState("");
// // // //   const [showAshaFields, setShowAshaFields] = useState(false);
// // // //   const [selectedComplications, setSelectedComplications] = useState<{ [key: string]: boolean }>({});
// // // //   const [otherComplication, setOtherComplication] = useState("");
// // // //   const [photoPreview, setPhotoPreview] = useState<string | null>(null);
// // // //   const [mounted, setMounted] = useState(false);
  
// // // //   // Date states
// // // //   const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
// // // //   const [admissionDate, setAdmissionDate] = useState<Date | undefined>(undefined);
// // // //   const [admissionTime, setAdmissionTime] = useState<string>("");

// // // //   // Fix hydration issue by ensuring component is mounted before rendering dynamic content
// // // //   useEffect(() => {
// // // //     setMounted(true);
// // // //     generateSamNumber();
// // // //   }, []);

// // // //   // Show/hide ASHA fields based on referred by selection
// // // //   useEffect(() => {
// // // //     setShowAshaFields(referredBy === "6");
// // // //   }, [referredBy]);

// // // //   const generateSamNumber = () => {
// // // //     const randomNum = Math.floor(1000 + Math.random() * 9000);
// // // //     const newSam = `JH/WSB/CBS/${randomNum}`;
// // // //     setSamNumber(newSam);
// // // //   };

// // // //   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const file = e.target.files?.[0];
// // // //     if (file) {
// // // //       // Validate file size (2MB max)
// // // //       if (file.size > 2 * 1024 * 1024) {
// // // //         toast.error("Photo size must be less than 2MB");
// // // //         return;
// // // //       }
      
// // // //       // Validate file type (JPEG/PNG only)
// // // //       if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
// // // //         toast.error("Only JPEG and PNG images are allowed");
// // // //         return;
// // // //       }
      
// // // //       // Create preview
// // // //       const reader = new FileReader();
// // // //       reader.onload = () => {
// // // //         setPhotoPreview(reader.result as string);
// // // //       };
// // // //       reader.readAsDataURL(file);
// // // //     }
// // // //   };

// // // //   const handleComplicationChange = (id: string, checked: boolean) => {
// // // //     setSelectedComplications(prev => ({
// // // //       ...prev,
// // // //       [id]: checked
// // // //     }));
// // // //   };

// // // //   const handleSubmit = (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);

// // // //     // Get form data
// // // //     const formData = new FormData(e.currentTarget as HTMLFormElement);
    
// // // //     // Collect all form values
// // // //     const admissionType = formData.get('admissionType') as string;
// // // //     const childName = formData.get('childName') as string;
// // // //     const parentName = formData.get('parentName') as string;
// // // //     const relationship = formData.get('relationship') as string;
// // // //     const mobileNumber = formData.get('mobileNumber') as string;
// // // //     const bplNumber = formData.get('bplNumber') as string;
// // // //     const sex = formData.get('sex') as string;
// // // //     const address = formData.get('address') as string;
// // // //     const caste = formData.get('caste') as string;
// // // //     const district = formData.get('district') as string;
// // // //     const block = formData.get('block') as string;
// // // //     const icdsProject = formData.get('icdsProject') as string;
// // // //     const anganwadiCenter = formData.get('anganwadiCenter') as string;
// // // //     const village = formData.get('village') as string;
// // // //     const admissionWeight = formData.get('admissionWeight') as string;
// // // //     const admissionHeight = formData.get('admissionHeight') as string;
// // // //     const admissionOdema = formData.get('admissionOdema') as string;
// // // //     const admissionMuac = formData.get('admissionMuac') as string;
// // // //     const breastFeeding = formData.get('breastFeeding') as string;
// // // //     const complementaryFeeding = formData.get('complementaryFeeding') as string;
// // // //     const appetiteTest = formData.get('appetiteTest') as string;
    
// // // //     // Get selected complications
// // // //     const complications = Object.keys(selectedComplications).filter(key => selectedComplications[key]);
    
// // // //     // Create child object
// // // //     const newChild = {
// // // //       id: Date.now().toString(),
// // // //       recordNo: Math.floor(100000 + Math.random() * 900000).toString(),
// // // //       samNumber,
// // // //       admissionType,
// // // //       referredBy,
// // // //       referredByName: formData.get('referredByName') as string,
// // // //       referredByMobile: formData.get('referredByMobile') as string,
// // // //       childName,
// // // //       parentName,
// // // //       relationship,
// // // //       mobileNumber,
// // // //       bplNumber,
// // // //       dateOfBirth: dateOfBirth ? format(dateOfBirth, "dd-MMM-yyyy") : "",
// // // //       sex,
// // // //       address,
// // // //       caste,
// // // //       district,
// // // //       block,
// // // //       icdsProject,
// // // //       anganwadiCenter,
// // // //       village,
// // // //       admissionDate: admissionDate ? format(admissionDate, "dd-MMM-yyyy") : "",
// // // //       admissionTime,
// // // //       admissionWeight,
// // // //       admissionHeight,
// // // //       admissionOdema,
// // // //       admissionMuac,
// // // //       breastFeeding,
// // // //       complementaryFeeding,
// // // //       appetiteTest,
// // // //       complications,
// // // //       otherComplication,
// // // //       photo: photoPreview,
// // // //       createdAt: new Date().toISOString()
// // // //     };

// // // //     // Get existing children from localStorage
// // // //     const existingChildren = JSON.parse(localStorage.getItem('registeredChildren') || '[]');
    
// // // //     // Add new child to array
// // // //     const updatedChildren = [...existingChildren, newChild];
    
// // // //     // Save to localStorage
// // // //     localStorage.setItem('registeredChildren', JSON.stringify(updatedChildren));

// // // //     // Simulate API call
// // // //     setTimeout(() => {
// // // //       toast.success("Child registered successfully!");
// // // //       setLoading(false);
      
// // // //       // Redirect to list page
// // // //       router.push('/mtc-user/dashboard/child-registration');
// // // //     }, 1500);
// // // //   };

// // // //   // Don't render until component is mounted on client
// // // //   if (!mounted) {
// // // //     return null;
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-100 py-10 px-6">
// // // //       <Toaster position="top-right" />
// // // //       <div className="max-w-7xl mx-auto">
// // // //         <Card className="shadow-md border border-gray-200">
// // // //           <CardHeader>
// // // //             <h1 className="text-2xl font-bold text-teal-700">
// // // //               Child Registration
// // // //             </h1>
// // // //           </CardHeader>

// // // //           <CardContent>
// // // //             <form onSubmit={handleSubmit} className="space-y-6">
// // // //               {/* SAM Number + Admission Info */}
// // // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // // //                 <div>
// // // //                   <Label>SAM Number</Label>
// // // //                   <Input
// // // //                     value={samNumber}
// // // //                     readOnly
// // // //                     className="bg-gray-100 font-mono text-gray-700"
// // // //                   />
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Admission Type <span className="text-red-500">*</span></Label>
// // // //                   <Select name="admissionType" required>
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Select Type" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="1">NEW ADMISSION</SelectItem>
// // // //                       <SelectItem value="2">RE ADMISSION</SelectItem>
// // // //                       <SelectItem value="3">RELAPSE</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Referred By</Label>
// // // //                   <Select name="referredBy" onValueChange={(val) => setReferredBy(val)}>
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Select" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="6">Sahiya/ASHA</SelectItem>
// // // //                       <SelectItem value="1">ANGANWADI</SelectItem>
// // // //                       <SelectItem value="2">ANM</SelectItem>
// // // //                       <SelectItem value="7">Poshan Sakhi</SelectItem>
// // // //                       <SelectItem value="8">RBSK Team</SelectItem>
// // // //                       <SelectItem value="3">OPD</SelectItem>
// // // //                       <SelectItem value="4">SELF</SelectItem>
// // // //                       <SelectItem value="5">OTHER</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>
// // // //                 {showAshaFields && (
// // // //                   <div>
// // // //                     <Label>Name of Sahiya/Asha</Label>
// // // //                     <Input name="referredByName" placeholder="Enter Sahiya/Asha Name" />
// // // //                   </div>
// // // //                 )}
// // // //               </div>

// // // //               {/* ASHA Mobile Number */}
// // // //               {showAshaFields && (
// // // //                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // // //                   <div>
// // // //                     <Label>Sahiya/Asha Mobile</Label>
// // // //                     <Input
// // // //                       name="referredByMobile"
// // // //                       type="tel"
// // // //                       placeholder="Enter Mobile Number"
// // // //                       maxLength={10}
// // // //                       pattern="[0-9]{10}"
// // // //                     />
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {/* Child Info */}
// // // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // // //                 <div>
// // // //                   <Label>Child Name <span className="text-red-500">*</span></Label>
// // // //                   <Input name="childName" placeholder="Enter Child Name" required />
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Name of the Father/Mother/Caretaker <span className="text-red-500">*</span></Label>
// // // //                   <Input name="parentName" placeholder="Enter Name" required />
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Relationship with child <span className="text-red-500">*</span></Label>
// // // //                   <Select name="relationship" required>
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Select" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="1">Father</SelectItem>
// // // //                       <SelectItem value="2">Mother</SelectItem>
// // // //                       <SelectItem value="3">Any Other</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Mobile Number <span className="text-red-500">*</span></Label>
// // // //                   <Input
// // // //                     name="mobileNumber"
// // // //                     type="tel"
// // // //                     placeholder="Enter Mobile Number"
// // // //                     maxLength={10}
// // // //                     pattern="[0-9]{10}"
// // // //                     required
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               {/* BPL Number, DOB, Sex */}
// // // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // // //                 <div>
// // // //                   <Label>BPL Number</Label>
// // // //                   <Input name="bplNumber" placeholder="Enter BPL Number" />
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Date of Birth <span className="text-red-500">*</span></Label>
// // // //                   <Popover>
// // // //                     <PopoverTrigger asChild>
// // // //                       <Button
// // // //                         variant="outline"
// // // //                         className={cn(
// // // //                           "w-full justify-start text-left font-normal",
// // // //                           !dateOfBirth && "text-muted-foreground"
// // // //                         )}
// // // //                       >
// // // //                         <CalendarIcon className="mr-2 h-4 w-4" />
// // // //                         {dateOfBirth ? format(dateOfBirth, "PPP") : "Pick a date"}
// // // //                       </Button>
// // // //                     </PopoverTrigger>
// // // //                     <PopoverContent className="w-auto p-0">
// // // //                       <Calendar
// // // //                         mode="single"
// // // //                         selected={dateOfBirth}
// // // //                         onSelect={setDateOfBirth}
// // // //                         initialFocus
// // // //                       />
// // // //                     </PopoverContent>
// // // //                   </Popover>
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Sex <span className="text-red-500">*</span></Label>
// // // //                   <Select name="sex" required>
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Select" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="1">Male</SelectItem>
// // // //                       <SelectItem value="2">Female</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Address <span className="text-red-500">*</span></Label>
// // // //                   <Textarea name="address" placeholder="Enter Address" rows={1} />
// // // //                 </div>
// // // //               </div>

// // // //               {/* Photo Upload */}
// // // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // // //                 <div>
// // // //                   <Label>Upload Photo (max 2MB, png/jpeg only)</Label>
// // // //                   <div className="flex items-center gap-2">
// // // //                     <Input 
// // // //                       type="file" 
// // // //                       accept=".jpg,.jpeg,.png" 
// // // //                       onChange={handlePhotoUpload}
// // // //                       className="hidden"
// // // //                       id="photo-upload"
// // // //                     />
// // // //                     <Button
// // // //                       type="button"
// // // //                       variant="outline"
// // // //                       onClick={() => document.getElementById('photo-upload')?.click()}
// // // //                       className="flex items-center gap-2"
// // // //                     >
// // // //                       <Upload className="h-4 w-4" />
// // // //                       Choose File
// // // //                     </Button>
// // // //                   </div>
// // // //                 </div>
// // // //                 {photoPreview && (
// // // //                   <div className="col-span-3">
// // // //                     {/* Replaced img with Next.js Image component */}
// // // //                     <div className="relative h-32 w-auto">
// // // //                       <Image 
// // // //                         src={photoPreview} 
// // // //                         alt="Child Photo" 
// // // //                         fill
// // // //                         className="rounded border object-contain"
// // // //                         unoptimized // Required for data URLs
// // // //                       />
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //               </div>

// // // //               {/* Caste, District, Block */}
// // // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // // //                 <div>
// // // //                   <Label>Caste <span className="text-red-500">*</span></Label>
// // // //                   <Select name="caste" required>
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Select" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="1">ST</SelectItem>
// // // //                       <SelectItem value="2">SC</SelectItem>
// // // //                       <SelectItem value="3">OBC</SelectItem>
// // // //                       <SelectItem value="4">OTHERS</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>District <span className="text-red-500">*</span></Label>
// // // //                   <Select name="district" required>
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Select District" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="1">BOKARO</SelectItem>
// // // //                       <SelectItem value="2">CHATRA</SelectItem>
// // // //                       <SelectItem value="16">DEOGHAR</SelectItem>
// // // //                       <SelectItem value="4">DHANBAD</SelectItem>
// // // //                       <SelectItem value="17">DUMKA</SelectItem>
// // // //                       <SelectItem value="22">EAST SINGHBHUM</SelectItem>
// // // //                       <SelectItem value="14">GARHWA</SelectItem>
// // // //                       <SelectItem value="3">GIRIDIH</SelectItem>
// // // //                       <SelectItem value="18">GODDA</SelectItem>
// // // //                       <SelectItem value="9">GUMLA</SelectItem>
// // // //                       <SelectItem value="6">HAZARIBAGH</SelectItem>
// // // //                       <SelectItem value="19">JAMTARA</SelectItem>
// // // //                       <SelectItem value="10">KHUNTI</SelectItem>
// // // //                       <SelectItem value="7">KODERMA</SelectItem>
// // // //                       <SelectItem value="15">LATEHAR</SelectItem>
// // // //                       <SelectItem value="11">LOHARDAGA</SelectItem>
// // // //                       <SelectItem value="20">PAKUR</SelectItem>
// // // //                       <SelectItem value="13">PALAMU</SelectItem>
// // // //                       <SelectItem value="5">RAMGARH</SelectItem>
// // // //                       <SelectItem value="8">RANCHI</SelectItem>
// // // //                       <SelectItem value="21">SAHIBGANJ</SelectItem>
// // // //                       <SelectItem value="23">SERAIKELA</SelectItem>
// // // //                       <SelectItem value="12">SIMDEGA</SelectItem>
// // // //                       <SelectItem value="24">WEST SINGHBHUM</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Block</Label>
// // // //                   <Select name="block">
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Select Block" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="block1">Block 1</SelectItem>
// // // //                       <SelectItem value="block2">Block 2</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>ICDS Project</Label>
// // // //                   <Select name="icdsProject">
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Select ICDS Project" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="icds1">ICDS Project 1</SelectItem>
// // // //                       <SelectItem value="icds2">ICDS Project 2</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Anganwadi Center, Village, Admission Date and Time */}
// // // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // // //                 <div>
// // // //                   <Label>Anganwadi Center</Label>
// // // //                   <Select name="anganwadiCenter">
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Select Anganwadi Center" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="anganwadi1">Anganwadi Center 1</SelectItem>
// // // //                       <SelectItem value="anganwadi2">Anganwadi Center 2</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Village</Label>
// // // //                   <Input name="village" placeholder="Enter Village" />
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Admission Date <span className="text-red-500">*</span></Label>
// // // //                   <Popover>
// // // //                     <PopoverTrigger asChild>
// // // //                       <Button
// // // //                         variant="outline"
// // // //                         className={cn(
// // // //                           "w-full justify-start text-left font-normal",
// // // //                           !admissionDate && "text-muted-foreground"
// // // //                         )}
// // // //                       >
// // // //                         <CalendarIcon className="mr-2 h-4 w-4" />
// // // //                         {admissionDate ? format(admissionDate, "PPP") : "Pick a date"}
// // // //                       </Button>
// // // //                     </PopoverTrigger>
// // // //                     <PopoverContent className="w-auto p-0">
// // // //                       <Calendar
// // // //                         mode="single"
// // // //                         selected={admissionDate}
// // // //                         onSelect={setAdmissionDate}
// // // //                         initialFocus
// // // //                       />
// // // //                     </PopoverContent>
// // // //                   </Popover>
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Admission Time <span className="text-red-500">*</span></Label>
// // // //                   <div className="relative">
// // // //                     <Input
// // // //                       name="admissionTime"
// // // //                       type="time"
// // // //                       value={admissionTime}
// // // //                       onChange={(e) => setAdmissionTime(e.target.value)}
// // // //                       required
// // // //                       className="pr-10"
// // // //                     />
// // // //                     <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Height, Z-Score, Odema, MUAC */}
// // // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // // //                 <div>
// // // //                   <Label>Admission Weight (kg) <span className="text-red-500">*</span></Label>
// // // //                   <Input name="admissionWeight" type="number" step="0.1" placeholder="Enter Weight" required />
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Admission Length/Height (cm) <span className="text-red-500">*</span></Label>
// // // //                   <Input name="admissionHeight" type="number" step="0.1" placeholder="Enter Height" required />
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Z-Score (SD)</Label>
// // // //                   <Input readOnly placeholder="Auto-calculated" />
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Admission Odema <span className="text-red-500">*</span></Label>
// // // //                   <Select name="admissionOdema" required>
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Select" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="1">+</SelectItem>
// // // //                       <SelectItem value="2">++</SelectItem>
// // // //                       <SelectItem value="3">+++</SelectItem>
// // // //                       <SelectItem value="4">No</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>
// // // //               </div>

// // // //               {/* MUAC */}
// // // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // // //                 <div>
// // // //                   <Label>Admission MUAC (cm) <span className="text-red-500">*</span></Label>
// // // //                   <Input name="admissionMuac" type="number" step="0.1" placeholder="Enter MUAC" required />
// // // //                 </div>
// // // //               </div>

// // // //               {/* Feeding Information */}
// // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // //                 <div>
// // // //                   <Label>Breast Feeding <span className="text-red-500">*</span></Label>
// // // //                   <Select name="breastFeeding" required>
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Select" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="1">Yes</SelectItem>
// // // //                       <SelectItem value="2">No</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Complementary Feeding <span className="text-red-500">*</span></Label>
// // // //                   <Select name="complementaryFeeding" required>
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Select" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="1">Yes</SelectItem>
// // // //                       <SelectItem value="2">No</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label>Appetite Test <span className="text-red-500">*</span></Label>
// // // //                   <Select name="appetiteTest" required>
// // // //                     <SelectTrigger>
// // // //                       <SelectValue placeholder="Select" />
// // // //                     </SelectTrigger>
// // // //                     <SelectContent>
// // // //                       <SelectItem value="1">PASS</SelectItem>
// // // //                       <SelectItem value="2">FAIL</SelectItem>
// // // //                       <SelectItem value="3">NOT DONE</SelectItem>
// // // //                     </SelectContent>
// // // //                   </Select>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Medical Complications */}
// // // //               <div>
// // // //                 <Label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                   Medical Complications <span className="text-red-500">*</span>
// // // //                 </Label>
// // // //                 <div className="border rounded-md p-4">
// // // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
// // // //                     {[
// // // //                       { id: "0", label: "NO COMPLICATION" },
// // // //                       { id: "1", label: "PRESENCE OF ANY OF EMERGENCY SIGNS" },
// // // //                       { id: "2", label: "VERY WEAK, APATHETIC" },
// // // //                       { id: "3", label: "ODEMA OF BOTH FEET" },
// // // //                       { id: "4", label: "SEVERE PALMAR PALLOR" },
// // // //                       { id: "5", label: "SICK YOUNG INFANT LESS THAN 2 MONTHS" },
// // // //                       { id: "6", label: "LETHARGY/ DROWSINESS/ UNCONSCIOUSNESS" },
// // // //                       { id: "7", label: "CONTINUALLY IRRITABLE AND RESTLESS" },
// // // //                       { id: "8", label: "ANY RESPIRATORY DISTRESS" },
// // // //                       { id: "9", label: "SIGN SUGGESTING SEVERE DEHYDRATION WITH DIARRHOEA" },
// // // //                       { id: "10", label: "PRESISTENT VOMITING" },
// // // //                       { id: "11", label: "HYPOTHERMIA (<35 DEGREE CENTIGRADE)" },
// // // //                       { id: "12", label: "SEVERE ANEMIA" },
// // // //                       { id: "13", label: "FEVER (>38.5 DEGREE CENTIGRADE)" },
// // // //                       { id: "14", label: "EXTENSIVE SKIN LESIONS, EYE LESIONS, POST-MEASLES STATES" },
// // // //                       { id: "15", label: "TUBERCULOSIS" },
// // // //                       { id: "16", label: "MALARIA" },
// // // //                       { id: "17", label: "OTHERS" },
// // // //                     ].map((item) => (
// // // //                       <div key={item.id} className="flex items-center space-x-2">
// // // //                         <input
// // // //                           type="checkbox"
// // // //                           id={`complication-${item.id}`}
// // // //                           checked={selectedComplications[item.id] || false}
// // // //                           onChange={(e) => handleComplicationChange(item.id, e.target.checked)}
// // // //                           className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
// // // //                         />
// // // //                         <Label htmlFor={`complication-${item.id}`} className="text-sm">
// // // //                           {item.label}
// // // //                         </Label>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                   {selectedComplications["17"] && (
// // // //                     <div className="mt-3">
// // // //                       <Label htmlFor="other-complication">Other Complication Details</Label>
// // // //                       <Input
// // // //                         id="other-complication"
// // // //                         value={otherComplication}
// // // //                         onChange={(e) => setOtherComplication(e.target.value)}
// // // //                         placeholder="Please specify other complication"
// // // //                       />
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               </div>

// // // //               {/* Buttons */}
// // // //               <div className="flex justify-end gap-3">
// // // //                 <Button
// // // //                   type="button"
// // // //                   variant="outline"
// // // //                   onClick={() => router.push('/mtc-user/dashboard/child-registration')}
// // // //                   className="bg-gray-100"
// // // //                 >
// // // //                   ✕ Cancel
// // // //                 </Button>
// // // //                 <Button
// // // //                   type="submit"
// // // //                   disabled={loading}
// // // //                   className="bg-teal-600 hover:bg-teal-700"
// // // //                 >
// // // //                   {loading ? "Registering..." : "✔ Register"}
// // // //                 </Button>
// // // //               </div>
// // // //             </form>
// // // //           </CardContent>
// // // //         </Card>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { Input } from "@/components/ui/input";
// // // import { Button } from "@/components/ui/button";
// // // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // // import { Label } from "@/components/ui/label";
// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from "@/components/ui/select";
// // // import { CalendarIcon, Upload, Clock } from "lucide-react";
// // // import toast, { Toaster } from "react-hot-toast";
// // // import { Textarea } from "@/components/ui/textarea";
// // // import { Calendar } from "@/components/ui/calendar";
// // // import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// // // import { format } from "date-fns";
// // // import { cn } from "@/lib/utils";
// // // import Image from "next/image";

// // // // Import the utility functions (Ensure this file exists at lib/zScoreUtils.ts)
// // // import { calculateZScore, getZScoreColor } from "@/lib/zScoreUtils"; 

// // // export default function ChildRegistration() {
// // //   const router = useRouter();
// // //   const [loading, setLoading] = useState(false);
  
// // //   // State for SAM Number
// // //   const [samNumber, setSamNumber] = useState("Fetching from DB...");
  
// // //   // Form States
// // //   const [referredBy, setReferredBy] = useState("");
// // //   const [showAshaFields, setShowAshaFields] = useState(false);
// // //   const [selectedComplications, setSelectedComplications] = useState<{ [key: string]: boolean }>({});
// // //   const [otherComplication, setOtherComplication] = useState("");
// // //   const [photoPreview, setPhotoPreview] = useState<string | null>(null);
// // //   const [mounted, setMounted] = useState(false);
  
// // //   // Date states
// // //   const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
// // //   const [admissionDate, setAdmissionDate] = useState<Date | undefined>(undefined);
// // //   const [admissionTime, setAdmissionTime] = useState<string>("");

// // //   // Controlled States for Z-Score Calculation
// // //   const [weight, setWeight] = useState<string>("");
// // //   const [height, setHeight] = useState<string>("");
// // //   const [sex, setSex] = useState<string>("");
// // //   const [zScore, setZScore] = useState<string>("");

// // //   useEffect(() => {
// // //     setMounted(true);
// // //     fetchNextSamNumber();
// // //   }, []);

// // //   useEffect(() => {
// // //     setShowAshaFields(referredBy === "6");
// // //   }, [referredBy]);

// // //   // Auto-Calculate Z-Score Effect
// // //   useEffect(() => {
// // //     if (weight && height && sex) {
// // //         const calculated = calculateZScore(parseFloat(weight), parseFloat(height), sex);
// // //         setZScore(calculated);
// // //     } else {
// // //         setZScore("");
// // //     }
// // //   }, [weight, height, sex]);

// // //   // Mock Fetch for SAM Number (Replace with real API call if needed)
// // //   const fetchNextSamNumber = async () => {
// // //     try {
// // //         // console.log("Fetching next CBS number...");
// // //         setTimeout(() => {
// // //             const dbGeneratedId = "JH/WSB/CBS/"; 
// // //             setSamNumber(dbGeneratedId);
// // //         }, 800);
// // //     } catch (error) {
// // //         console.error("Error fetching SAM Number", error);
// // //         setSamNumber("Error Fetching");
// // //     }
// // //   };

// // //   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = e.target.files?.[0];
// // //     if (file) {
// // //       if (file.size > 2 * 1024 * 1024) {
// // //         toast.error("Photo size must be less than 2MB");
// // //         return;
// // //       }
      
// // //       if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
// // //         toast.error("Only JPEG and PNG images are allowed");
// // //         return;
// // //       }
      
// // //       const reader = new FileReader();
// // //       reader.onload = () => {
// // //         setPhotoPreview(reader.result as string);
// // //       };
// // //       reader.readAsDataURL(file);
// // //     }
// // //   };

// // //   const handleComplicationChange = (id: string, checked: boolean) => {
// // //     setSelectedComplications(prev => ({
// // //       ...prev,
// // //       [id]: checked
// // //     }));
// // //   };

// // //   // --- UPDATED HANDLER FOR BACKEND SUBMISSION ---
// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setLoading(true);

// // //     const formData = new FormData(e.currentTarget as HTMLFormElement);
    
// // //     // 1. Process Complications String
// // //     const complicationsArray = Object.keys(selectedComplications).filter(key => selectedComplications[key]);
// // //     let complicationString = complicationsArray.join(",");
// // //     if(selectedComplications["17"] && otherComplication) {
// // //         complicationString += ` - ${otherComplication}`;
// // //     }

// // //     // 2. Helper Functions for Type Safety (Convert strings to SQL-ready types)
// // //     const getInt = (val: FormDataEntryValue | null) => (val && val !== "") ? parseInt(val.toString()) : null;
// // //     const getFloat = (val: FormDataEntryValue | null) => (val && val !== "") ? parseFloat(val.toString()) : null;
// // //     const getString = (val: FormDataEntryValue | null) => (val && val !== "") ? val.toString() : null;

// // //     // 3. Construct Payload
// // //     const sqlPayload = {
// // //       SamNo: samNumber,
// // //       MTCCode: "MTC_DEFAULT_01", // Ideally from user session
      
// // //       // IDs and References
// // //       AtId: getInt(formData.get('admissionType')),
// // //       RefererId: parseInt(referredBy) || null,
      
// // //       // Personal Info
// // //       ChildName: getString(formData.get('childName')),
// // //       MotherName: getString(formData.get('motherName')),
// // //       FatherName: getString(formData.get('fatherName')),
// // //       MobileNumber: getString(formData.get('mobileNumber')),
// // //       BPLNo: getString(formData.get('bplNumber')),
// // //       DateofBirth: dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : null,
      
// // //       // Vitals (Use State values here as they are controlled inputs)
// // //       GenderId: sex ? parseInt(sex) : null,
// // //       AdmissionWeight: weight ? parseFloat(weight) : null,
// // //       AdmissionHeight: height ? parseFloat(height) : null,
// // //       AdmissionZScore: zScore ? parseFloat(zScore) : null,

// // //       // Location & Demographics
// // //       CastId: getInt(formData.get('caste')),
// // //       Address: getString(formData.get('address')),
// // //       DistrictId: getInt(formData.get('district')),
// // //       BlockId: getString(formData.get('block')), 
// // //       ICDSId: getString(formData.get('icdsProject')),
// // //       AnganwadiId: getString(formData.get('anganwadiCenter')),
// // //       VillageName: getString(formData.get('village')),
      
// // //       // Admission Details (Combine Date + Time)
// // //       AdmissionDate: admissionDate 
// // //         ? `${format(admissionDate, "yyyy-MM-dd")} ${admissionTime || "00:00"}` 
// // //         : null,
      
// // //       // Clinical Details
// // //       AdmissionEdema: getInt(formData.get('admissionOdema')),
// // //       AdmissionMuac: getFloat(formData.get('admissionMuac')),
// // //       AdmissionAppetite: getInt(formData.get('appetiteTest')),
// // //       BreastFeeding: getInt(formData.get('breastFeeding')),
// // //       ComplementaryFeeding: getInt(formData.get('complementaryFeeding')),
// // //       MedicalComplication: complicationString,
      
// // //       // Image (Sends Base64 string)
// // //       RegistrationImage: photoPreview || null,
// // //     };

// // //     console.log("Submitting Payload to API:", sqlPayload);

// // //     try {
// // //       // 4. Send Data to API Route
// // //       const response = await fetch('/api/register-child', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify(sqlPayload),
// // //       });

// // //       const result = await response.json();

// // //       if (!response.ok) {
// // //         throw new Error(result.message || 'Registration failed');
// // //       }

// // //       // 5. Success
// // //       toast.success("Child successfully saved to Database!");
      
// // //       setTimeout(() => {
// // //         router.push('/mtc-user/dashboard/child-registration');
// // //       }, 1500);

// // //     } catch (error: any) {
// // //       console.error("Submission Error:", error);
// // //       toast.error(error.message || "Failed to connect to server");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   if (!mounted) {
// // //     return null;
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 py-10 px-6">
// // //       <Toaster position="top-right" />
// // //       <div className="max-w-7xl mx-auto">
// // //         <Card className="shadow-md border border-gray-200">
// // //           <CardHeader>
// // //             <h1 className="text-2xl font-bold text-teal-700">
// // //               Child Registration
// // //             </h1>
// // //           </CardHeader>

// // //           <CardContent>
// // //             <form onSubmit={handleSubmit} className="space-y-6">
              
// // //               {/* --- SAM Number & Admission Type --- */}
// // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // //                 <div>
// // //                   <Label>SAM Number (Auto-Generated)</Label>
// // //                   <Input
// // //                     value={samNumber}
// // //                     readOnly
// // //                     className="bg-gray-100 font-mono text-gray-700 font-bold cursor-not-allowed"
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <Label>Admission Type <span className="text-red-500">*</span></Label>
// // //                   <Select name="admissionType" required>
// // //                     <SelectTrigger>
// // //                       <SelectValue placeholder="Select Type" />
// // //                     </SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="1">NEW ADMISSION</SelectItem>
// // //                       <SelectItem value="2">RE ADMISSION</SelectItem>
// // //                       <SelectItem value="3">RELAPSE</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
// // //                 <div>
// // //                   <Label>Referred By</Label>
// // //                   <Select name="referredBy" onValueChange={(val) => setReferredBy(val)}>
// // //                     <SelectTrigger>
// // //                       <SelectValue placeholder="Select" />
// // //                     </SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="6">Sahiya/ASHA</SelectItem>
// // //                       <SelectItem value="1">ANGANWADI</SelectItem>
// // //                       <SelectItem value="2">ANM</SelectItem>
// // //                       <SelectItem value="7">Poshan Sakhi</SelectItem>
// // //                       <SelectItem value="8">RBSK Team</SelectItem>
// // //                       <SelectItem value="3">OPD</SelectItem>
// // //                       <SelectItem value="4">SELF</SelectItem>
// // //                       <SelectItem value="5">OTHER</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
// // //                 {showAshaFields && (
// // //                   <div>
// // //                     <Label>Name of Sahiya/Asha</Label>
// // //                     <Input name="referredByName" placeholder="Enter Sahiya/Asha Name" />
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* --- Personal Information --- */}
// // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // //                 <div>
// // //                   <Label>Child Name <span className="text-red-500">*</span></Label>
// // //                   <Input name="childName" placeholder="Enter Child Name" required />
// // //                 </div>
// // //                 <div>
// // //                   <Label>Mother Name <span className="text-red-500">*</span></Label>
// // //                   <Input name="motherName" placeholder="Enter Mother Name" required />
// // //                 </div>
// // //                 <div>
// // //                   <Label>Father Name <span className="text-red-500">*</span></Label>
// // //                   <Input name="fatherName" placeholder="Enter Father Name" required />
// // //                 </div>
// // //                 <div>
// // //                   <Label>Mobile Number <span className="text-red-500">*</span></Label>
// // //                   <Input
// // //                     name="mobileNumber"
// // //                     type="tel"
// // //                     placeholder="Enter Mobile Number"
// // //                     maxLength={10}
// // //                     pattern="[0-9]{10}"
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>

// // //               {/* --- BPL, DOB, Sex, Address --- */}
// // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // //                 <div>
// // //                   <Label>BPL Number</Label>
// // //                   <Input name="bplNumber" placeholder="Enter BPL Number" />
// // //                 </div>
// // //                 <div>
// // //                   <Label>Date of Birth <span className="text-red-500">*</span></Label>
// // //                   <Popover>
// // //                     <PopoverTrigger asChild>
// // //                       <Button
// // //                         variant="outline"
// // //                         className={cn(
// // //                           "w-full justify-start text-left font-normal",
// // //                           !dateOfBirth && "text-muted-foreground"
// // //                         )}
// // //                       >
// // //                         <CalendarIcon className="mr-2 h-4 w-4" />
// // //                         {dateOfBirth ? format(dateOfBirth, "PPP") : "Pick a date"}
// // //                       </Button>
// // //                     </PopoverTrigger>
// // //                     <PopoverContent className="w-auto p-0">
// // //                       <Calendar
// // //                         mode="single"
// // //                         selected={dateOfBirth}
// // //                         onSelect={setDateOfBirth}
// // //                         initialFocus
// // //                       />
// // //                     </PopoverContent>
// // //                   </Popover>
// // //                 </div>
                
// // //                 {/* Sex: Controlled State */}
// // //                 <div>
// // //                   <Label>Sex <span className="text-red-500">*</span></Label>
// // //                   <Select name="sex" value={sex} onValueChange={setSex} required>
// // //                     <SelectTrigger>
// // //                       <SelectValue placeholder="Select" />
// // //                     </SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="1">Male</SelectItem>
// // //                       <SelectItem value="2">Female</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
                
// // //                 <div>
// // //                   <Label>Address <span className="text-red-500">*</span></Label>
// // //                   <Textarea name="address" placeholder="Enter Address" rows={1} />
// // //                 </div>
// // //               </div>

// // //               {/* --- Caste, Location --- */}
// // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // //                 <div>
// // //                   <Label>Caste <span className="text-red-500">*</span></Label>
// // //                   <Select name="caste" required>
// // //                     <SelectTrigger>
// // //                       <SelectValue placeholder="Select" />
// // //                     </SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="1">ST</SelectItem>
// // //                       <SelectItem value="2">SC</SelectItem>
// // //                       <SelectItem value="3">OBC</SelectItem>
// // //                       <SelectItem value="4">OTHERS</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
// // //                 <div>
// // //                   <Label>District <span className="text-red-500">*</span></Label>
// // //                   <Select name="district" required>
// // //                     <SelectTrigger>
// // //                       <SelectValue placeholder="Select District" />
// // //                     </SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="1">BOKARO</SelectItem>
// // //                       <SelectItem value="2">CHATRA</SelectItem>
// // //                       <SelectItem value="8">RANCHI</SelectItem>
// // //                       <SelectItem value="24">WEST SINGHBHUM</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
// // //                 <div>
// // //                   <Label>Block</Label>
// // //                   <Select name="block">
// // //                     <SelectTrigger>
// // //                       <SelectValue placeholder="Select Block" />
// // //                     </SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="block1">Block 1</SelectItem>
// // //                       <SelectItem value="block2">Block 2</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
// // //                 <div>
// // //                   <Label>ICDS Project</Label>
// // //                   <Select name="icdsProject">
// // //                     <SelectTrigger>
// // //                       <SelectValue placeholder="Select ICDS Project" />
// // //                     </SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="icds1">ICDS Project 1</SelectItem>
// // //                       <SelectItem value="icds2">ICDS Project 2</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
// // //               </div>

// // //               {/* --- Village & Admission Date/Time --- */}
// // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // //                 <div>
// // //                   <Label>Anganwadi Center</Label>
// // //                   <Select name="anganwadiCenter">
// // //                     <SelectTrigger>
// // //                       <SelectValue placeholder="Select Anganwadi Center" />
// // //                     </SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="anganwadi1">Anganwadi Center 1</SelectItem>
// // //                       <SelectItem value="anganwadi2">Anganwadi Center 2</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
// // //                 <div>
// // //                   <Label>Village</Label>
// // //                   <Input name="village" placeholder="Enter Village" />
// // //                 </div>
// // //                 <div>
// // //                   <Label>Admission Date <span className="text-red-500">*</span></Label>
// // //                   <Popover>
// // //                     <PopoverTrigger asChild>
// // //                       <Button
// // //                         variant="outline"
// // //                         className={cn(
// // //                           "w-full justify-start text-left font-normal",
// // //                           !admissionDate && "text-muted-foreground"
// // //                         )}
// // //                       >
// // //                         <CalendarIcon className="mr-2 h-4 w-4" />
// // //                         {admissionDate ? format(admissionDate, "PPP") : "Pick a date"}
// // //                       </Button>
// // //                     </PopoverTrigger>
// // //                     <PopoverContent className="w-auto p-0">
// // //                       <Calendar
// // //                         mode="single"
// // //                         selected={admissionDate}
// // //                         onSelect={setAdmissionDate}
// // //                         initialFocus
// // //                       />
// // //                     </PopoverContent>
// // //                   </Popover>
// // //                 </div>
// // //                 <div>
// // //                   <Label>Admission Time <span className="text-red-500">*</span></Label>
// // //                   <div className="relative">
// // //                     <Input
// // //                       name="admissionTime"
// // //                       type="time"
// // //                       value={admissionTime}
// // //                       onChange={(e) => setAdmissionTime(e.target.value)}
// // //                       required
// // //                       className="pr-10"
// // //                     />
// // //                     <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* --- Vitals & Z-Score --- */}
// // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
// // //                 <div>
// // //                   <Label>Admission Weight (kg) <span className="text-red-500">*</span></Label>
// // //                   <Input 
// // //                     name="admissionWeight" 
// // //                     type="number" 
// // //                     step="0.01" 
// // //                     placeholder="Enter Weight" 
// // //                     required 
// // //                     value={weight}
// // //                     onChange={(e) => setWeight(e.target.value)}
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <Label>Admission Height (cm) <span className="text-red-500">*</span></Label>
// // //                   <Input 
// // //                     name="admissionHeight" 
// // //                     type="number" 
// // //                     step="0.1" 
// // //                     placeholder="Enter Height" 
// // //                     required 
// // //                     value={height}
// // //                     onChange={(e) => setHeight(e.target.value)}
// // //                   />
// // //                 </div>
                
// // //                 {/* Auto Calculated Z-Score Field */}
// // //                 <div>
// // //                   <Label>Z-Score (SD)</Label>
// // //                   <Input 
// // //                     name="admissionZScore" 
// // //                     placeholder="Auto-calculated" 
// // //                     value={zScore}
// // //                     readOnly
// // //                     className={cn("bg-white font-bold", getZScoreColor(zScore))}
// // //                   />
// // //                 </div>
                
// // //                 <div>
// // //                   <Label>Admission Odema <span className="text-red-500">*</span></Label>
// // //                   <Select name="admissionOdema" required>
// // //                     <SelectTrigger>
// // //                       <SelectValue placeholder="Select" />
// // //                     </SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="1">+</SelectItem>
// // //                       <SelectItem value="2">++</SelectItem>
// // //                       <SelectItem value="3">+++</SelectItem>
// // //                       <SelectItem value="4">No</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
// // //               </div>

// // //               {/* --- MUAC & Feeding --- */}
// // //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // //                 <div>
// // //                   <Label>Admission MUAC (cm) <span className="text-red-500">*</span></Label>
// // //                   <Input name="admissionMuac" type="number" step="0.1" placeholder="Enter MUAC" required />
// // //                 </div>
// // //                 <div>
// // //                   <Label>Breast Feeding <span className="text-red-500">*</span></Label>
// // //                   <Select name="breastFeeding" required>
// // //                     <SelectTrigger>
// // //                       <SelectValue placeholder="Select" />
// // //                     </SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="1">Yes</SelectItem>
// // //                       <SelectItem value="2">No</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
// // //                 <div>
// // //                   <Label>Complementary Feeding <span className="text-red-500">*</span></Label>
// // //                   <Select name="complementaryFeeding" required>
// // //                     <SelectTrigger>
// // //                       <SelectValue placeholder="Select" />
// // //                     </SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="1">Yes</SelectItem>
// // //                       <SelectItem value="2">No</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
// // //                 <div>
// // //                   <Label>Appetite Test <span className="text-red-500">*</span></Label>
// // //                   <Select name="appetiteTest" required>
// // //                     <SelectTrigger>
// // //                       <SelectValue placeholder="Select" />
// // //                     </SelectTrigger>
// // //                     <SelectContent>
// // //                       <SelectItem value="1">PASS</SelectItem>
// // //                       <SelectItem value="2">FAIL</SelectItem>
// // //                       <SelectItem value="3">NOT DONE</SelectItem>
// // //                     </SelectContent>
// // //                   </Select>
// // //                 </div>
// // //               </div>

// // //               {/* --- Medical Complications --- */}
// // //               <div>
// // //                 <Label className="block text-sm font-medium text-gray-700 mb-2">
// // //                   Medical Complications <span className="text-red-500">*</span>
// // //                 </Label>
// // //                 <div className="border rounded-md p-4">
// // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
// // //                     {[
// // //                       { id: "0", label: "NO COMPLICATION" },
// // //                       { id: "1", label: "PRESENCE OF ANY OF EMERGENCY SIGNS" },
// // //                       { id: "2", label: "VERY WEAK, APATHETIC" },
// // //                       { id: "3", label: "ODEMA OF BOTH FEET" },
// // //                       { id: "4", label: "SEVERE PALMAR PALLOR" },
// // //                       { id: "5", label: "SICK YOUNG INFANT LESS THAN 2 MONTHS" },
// // //                       { id: "6", label: "LETHARGY/ DROWSINESS/ UNCONSCIOUSNESS" },
// // //                       { id: "7", label: "CONTINUALLY IRRITABLE AND RESTLESS" },
// // //                       { id: "8", label: "ANY RESPIRATORY DISTRESS" },
// // //                       { id: "9", label: "SIGN SUGGESTING SEVERE DEHYDRATION WITH DIARRHOEA" },
// // //                       { id: "10", label: "PERSISTENT VOMITING" },
// // //                       { id: "11", label: "HYPOTHERMIA (<35 DEGREE CENTIGRADE)" },
// // //                       { id: "12", label: "SEVERE ANEMIA" },
// // //                       { id: "13", label: "FEVER (>38.5 DEGREE CENTIGRADE)" },
// // //                       { id: "14", label: "EXTENSIVE SKIN LESIONS, EYE LESIONS, POST-MEASLES STATES" },
// // //                       { id: "15", label: "TUBERCULOSIS" },
// // //                       { id: "16", label: "MALARIA" },
// // //                       { id: "17", label: "OTHERS" },
// // //                     ].map((item) => (
// // //                       <div key={item.id} className="flex items-center space-x-2">
// // //                         <input
// // //                           type="checkbox"
// // //                           id={`complication-${item.id}`}
// // //                           checked={selectedComplications[item.id] || false}
// // //                           onChange={(e) => handleComplicationChange(item.id, e.target.checked)}
// // //                           className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
// // //                         />
// // //                         <Label htmlFor={`complication-${item.id}`} className="text-sm">
// // //                           {item.label}
// // //                         </Label>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                   {selectedComplications["17"] && (
// // //                     <div className="mt-3">
// // //                       <Label htmlFor="other-complication">Other Complication Details</Label>
// // //                       <Input
// // //                         id="other-complication"
// // //                         value={otherComplication}
// // //                         onChange={(e) => setOtherComplication(e.target.value)}
// // //                         placeholder="Please specify other complication"
// // //                       />
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //                {/* --- Photo Upload --- */}
// // //                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // //                 <div>
// // //                   <Label>Upload Photo (max 2MB, png/jpeg only)</Label>
// // //                   <div className="flex items-center gap-2">
// // //                     <Input 
// // //                       type="file" 
// // //                       accept=".jpg,.jpeg,.png" 
// // //                       onChange={handlePhotoUpload}
// // //                       className="hidden"
// // //                       id="photo-upload"
// // //                     />
// // //                     <Button
// // //                       type="button"
// // //                       variant="outline"
// // //                       onClick={() => document.getElementById('photo-upload')?.click()}
// // //                       className="flex items-center gap-2"
// // //                     >
// // //                       <Upload className="h-4 w-4" />
// // //                       Choose File
// // //                     </Button>
// // //                   </div>
// // //                 </div>
// // //                 {photoPreview && (
// // //                   <div className="col-span-3">
// // //                     <div className="relative h-32 w-auto">
// // //                       <Image 
// // //                         src={photoPreview} 
// // //                         alt="Child Photo" 
// // //                         fill
// // //                         className="rounded border object-contain"
// // //                         unoptimized
// // //                       />
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* --- Buttons --- */}
// // //               <div className="flex justify-end gap-3">
// // //                 <Button
// // //                   type="button"
// // //                   variant="outline"
// // //                   onClick={() => router.push('/mtc-user/dashboard/child-registration')}
// // //                   className="bg-gray-100"
// // //                 >
// // //                   ✕ Cancel
// // //                 </Button>
// // //                 <Button
// // //                   type="submit"
// // //                   disabled={loading}
// // //                   className="bg-teal-600 hover:bg-teal-700"
// // //                 >
// // //                   {loading ? "Registering..." : "✔ Register"}
// // //                 </Button>
// // //               </div>
// // //             </form>
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";
// // import { format } from "date-fns";
// // import toast, { Toaster } from "react-hot-toast";
// // import { CalendarIcon, Upload, Clock, CheckCircle } from "lucide-react";

// // // UI Components
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardHeader, CardContent } from "@/components/ui/card";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Calendar } from "@/components/ui/calendar";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover";
// // import { cn } from "@/lib/utils";

// // // Utilities
// // import { calculateZScore, getZScoreColor } from "@/lib/zScoreUtils";

// // export default function ChildRegistration() {
// //   const router = useRouter();
// //   const [loading, setLoading] = useState(false);
// //   const [mounted, setMounted] = useState(false);

// //   // --- Success Modal State ---
// //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// //   const [generatedSamNo, setGeneratedSamNo] = useState("");

// //   // --- Date & Time ---
// //   const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
// //   const [admissionDate, setAdmissionDate] = useState<Date | undefined>(undefined);
// //   const [admissionTime, setAdmissionTime] = useState<string>("");

// //   // --- Form Logic ---
// //   const [referredBy, setReferredBy] = useState("");
// //   const [showAshaFields, setShowAshaFields] = useState(false);

// //   // --- Complications ---
// //   const [selectedComplications, setSelectedComplications] = useState<{ [key: string]: boolean }>({});
// //   const [otherComplication, setOtherComplication] = useState("");

// //   // --- Files ---
// //   const [photoPreview, setPhotoPreview] = useState<string | null>(null);

// //   // --- Vitals & Calculation ---
// //   const [weight, setWeight] = useState<string>("");
// //   const [height, setHeight] = useState<string>("");
// //   const [sex, setSex] = useState<string>("");
// //   const [zScore, setZScore] = useState<string>("");

// //   // --- Effects ---
// //   useEffect(() => {
// //     setMounted(true);
// //   }, []);

// //   useEffect(() => {
// //     setShowAshaFields(referredBy === "6");
// //   }, [referredBy]);

// //   useEffect(() => {
// //     if (weight && height && sex) {
// //       const calculated = calculateZScore(parseFloat(weight), parseFloat(height), sex);
// //       setZScore(calculated);
// //     } else {
// //       setZScore("");
// //     }
// //   }, [weight, height, sex]);

// //   // --- Handlers ---

// //   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       if (file.size > 2 * 1024 * 1024) {
// //         toast.error("Photo size must be less than 2MB");
// //         return;
// //       }
// //       if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
// //         toast.error("Only JPEG and PNG images are allowed");
// //         return;
// //       }
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         setPhotoPreview(reader.result as string);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleComplicationChange = (id: string, checked: boolean) => {
// //     setSelectedComplications((prev) => ({
// //       ...prev,
// //       [id]: checked,
// //     }));
// //   };

// //   const handleCloseSuccess = () => {
// //     setShowSuccessModal(false);
// //     router.push("/mtc-user/dashboard/child-registration");
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     const formData = new FormData(e.currentTarget as HTMLFormElement);

// //     // 1. Process Complications
// //     const complicationsArray = Object.keys(selectedComplications).filter(
// //       (key) => selectedComplications[key]
// //     );
// //     let complicationString = complicationsArray.join(",");
// //     if (selectedComplications["17"] && otherComplication) {
// //       complicationString += ` - ${otherComplication}`;
// //     }

// //     const getInt = (val: FormDataEntryValue | null) =>
// //       val && val !== "" ? parseInt(val.toString()) : null;
// //     const getFloat = (val: FormDataEntryValue | null) =>
// //       val && val !== "" ? parseFloat(val.toString()) : null;
// //     const getString = (val: FormDataEntryValue | null) =>
// //       val && val !== "" ? val.toString() : null;

// //     // 2. Construct Payload (NOTE: SamNo is REMOVED, generated on server)
// //     const sqlPayload = {
// //       MTCCode: "MTC_DEFAULT_01",
// //       AtId: getInt(formData.get("admissionType")),
// //       RefererId: parseInt(referredBy) || null,
// //       ChildName: getString(formData.get("childName")),
// //       MotherName: getString(formData.get("motherName")),
// //       FatherName: getString(formData.get("fatherName")),
// //       MobileNumber: getString(formData.get("mobileNumber")),
// //       BPLNo: getString(formData.get("bplNumber")),
// //       DateofBirth: dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : null,
// //       GenderId: sex ? parseInt(sex) : null,
// //       AdmissionWeight: weight ? parseFloat(weight) : null,
// //       AdmissionHeight: height ? parseFloat(height) : null,
// //       AdmissionZScore: zScore ? parseFloat(zScore) : null,
// //       CastId: getInt(formData.get("caste")),
// //       Address: getString(formData.get("address")),
// //       DistrictId: getInt(formData.get("district")),
// //       BlockId: getString(formData.get("block")),
// //       ICDSId: getString(formData.get("icdsProject")),
// //       AnganwadiId: getString(formData.get("anganwadiCenter")),
// //       VillageName: getString(formData.get("village")),
// //       AdmissionDate: admissionDate
// //         ? `${format(admissionDate, "yyyy-MM-dd")} ${admissionTime || "00:00"}`
// //         : null,
// //       AdmissionEdema: getInt(formData.get("admissionOdema")),
// //       AdmissionMuac: getFloat(formData.get("admissionMuac")),
// //       AdmissionAppetite: getInt(formData.get("appetiteTest")),
// //       BreastFeeding: getInt(formData.get("breastFeeding")),
// //       ComplementaryFeeding: getInt(formData.get("complementaryFeeding")),
// //       MedicalComplication: complicationString,
// //       RegistrationImage: photoPreview || null,
// //     };

// //     try {
// //       const response = await fetch("/api/register-child", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(sqlPayload),
// //       });

// //       const result = await response.json();

// //       if (!response.ok) {
// //         throw new Error(result.message || "Registration failed");
// //       }

// //       // 3. Handle Success
// //       setGeneratedSamNo(result.samNo); // Get ID from backend response
// //       setShowSuccessModal(true);       // Show the modal
      
// //     } catch (error: any) {
// //       console.error("Submission Error:", error);
// //       toast.error(error.message || "Failed to connect to server");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (!mounted) return null;

// //   return (
// //     <div className="min-h-screen bg-gray-100 py-10 px-6">
// //       <Toaster position="top-right" />
      
// //       {/* --- Success Modal (Custom Implementation) --- */}
// //       {showSuccessModal && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
// //           <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
// //             <div className="p-6 pb-2">
// //               <h2 className="text-xl font-semibold flex items-center gap-2 text-teal-700">
// //                 <CheckCircle className="h-6 w-6 text-teal-600" />
// //                 Registration Successful
// //               </h2>
// //               <p className="text-sm text-gray-500 mt-1">
// //                 The child has been registered in the database.
// //               </p>
// //             </div>
// //             <div className="p-6 py-8 flex flex-col items-center justify-center bg-gray-50 border-y border-gray-100">
// //               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
// //                 Generated SAM Number
// //               </span>
// //               <div className="text-3xl font-mono font-bold text-gray-900 bg-white px-6 py-3 rounded border border-gray-200 shadow-sm select-all">
// //                 {generatedSamNo}
// //               </div>
// //             </div>
// //             <div className="p-6 pt-4 flex justify-end">
// //               <Button 
// //                 onClick={handleCloseSuccess} 
// //                 className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white"
// //               >
// //                 Done & Return to Dashboard
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <div className="max-w-7xl mx-auto">
// //         <Card className="shadow-md border border-gray-200">
// //           <CardHeader>
// //             <h1 className="text-2xl font-bold text-teal-700">Child Registration</h1>
// //           </CardHeader>
// //           <CardContent>
// //             <form onSubmit={handleSubmit} className="space-y-6">
              
// //               {/* --- SAM Number (Static) --- */}
// //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //                 <div>
// //                   <Label>SAM Number</Label>
// //                   <Input
// //                     value="Auto-generated on Save"
// //                     readOnly
// //                     className="bg-gray-100 font-bold text-gray-900 cursor-not-allowed border-gray-300 focus-visible:ring-0"
// //                   />
// //                   <p className="text-xs text-teal-600 mt-1">
// //                     * ID will be assigned automatically
// //                   </p>
// //                 </div>
                
// //                 {/* --- Admission Type --- */}
// //                 <div>
// //                     <Label>Admission Type <span className="text-red-500">*</span></Label>
// //                     <Select name="admissionType" required>
// //                       <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
// //                       <SelectContent>
// //                         <SelectItem value="1">NEW ADMISSION</SelectItem>
// //                         <SelectItem value="2">RE ADMISSION</SelectItem>
// //                         <SelectItem value="3">RELAPSE</SelectItem>
// //                       </SelectContent>
// //                     </Select>
// //                 </div>

// //                 {/* --- Referred By --- */}
// //                  <div>
// //                     <Label>Referred By</Label>
// //                     <Select name="referredBy" onValueChange={setReferredBy}>
// //                         <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                         <SelectContent>
// //                             <SelectItem value="6">Sahiya/ASHA</SelectItem>
// //                             <SelectItem value="1">ANGANWADI</SelectItem>
// //                             <SelectItem value="2">ANM</SelectItem>
// //                             <SelectItem value="7">Poshan Sakhi</SelectItem>
// //                             <SelectItem value="8">RBSK Team</SelectItem>
// //                             <SelectItem value="3">OPD</SelectItem>
// //                             <SelectItem value="4">SELF</SelectItem>
// //                             <SelectItem value="5">OTHER</SelectItem>
// //                         </SelectContent>
// //                     </Select>
// //                  </div>
// //                  {showAshaFields && (
// //                   <div>
// //                     <Label>Name of Sahiya/Asha</Label>
// //                     <Input name="referredByName" placeholder="Enter Sahiya/Asha Name" />
// //                   </div>
// //                  )}
// //               </div>
              
// //               {/* --- Personal Information --- */}
// //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //                  <div>
// //                    <Label>Child Name <span className="text-red-500">*</span></Label>
// //                    <Input name="childName" placeholder="Enter Child Name" required />
// //                  </div>
// //                  <div>
// //                    <Label>Mother Name <span className="text-red-500">*</span></Label>
// //                    <Input name="motherName" placeholder="Enter Mother Name" required />
// //                  </div>
// //                  <div>
// //                    <Label>Father Name <span className="text-red-500">*</span></Label>
// //                    <Input name="fatherName" placeholder="Enter Father Name" required />
// //                  </div>
// //                  <div>
// //                    <Label>Mobile Number <span className="text-red-500">*</span></Label>
// //                    <Input name="mobileNumber" type="tel" maxLength={10} required pattern="[0-9]{10}" placeholder="Enter Mobile Number" />
// //                  </div>
// //               </div>

// //                {/* --- BPL, DOB, Sex, Address --- */}
// //                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //                  <div>
// //                    <Label>BPL Number</Label>
// //                    <Input name="bplNumber" placeholder="Enter BPL Number" />
// //                  </div>
// //                  <div>
// //                    <Label>Date of Birth <span className="text-red-500">*</span></Label>
// //                    <Popover>
// //                     <PopoverTrigger asChild>
// //                       <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateOfBirth && "text-muted-foreground")}>
// //                         <CalendarIcon className="mr-2 h-4 w-4" />
// //                         {dateOfBirth ? format(dateOfBirth, "PPP") : "Pick a date"}
// //                       </Button>
// //                     </PopoverTrigger>
// //                     <PopoverContent className="w-auto p-0">
// //                       <Calendar mode="single" selected={dateOfBirth} onSelect={setDateOfBirth} initialFocus />
// //                     </PopoverContent>
// //                    </Popover>
// //                  </div>
// //                  <div>
// //                    <Label>Sex <span className="text-red-500">*</span></Label>
// //                    <Select name="sex" value={sex} onValueChange={setSex} required>
// //                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                      <SelectContent>
// //                        <SelectItem value="1">Male</SelectItem>
// //                        <SelectItem value="2">Female</SelectItem>
// //                      </SelectContent>
// //                    </Select>
// //                  </div>
// //                  <div>
// //                    <Label>Address <span className="text-red-500">*</span></Label>
// //                    <Textarea name="address" placeholder="Enter Address" rows={1} />
// //                  </div>
// //                </div>

// //               {/* --- Location Details --- */}
// //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //                 <div>
// //                    <Label>Caste <span className="text-red-500">*</span></Label>
// //                    <Select name="caste" required>
// //                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                      <SelectContent>
// //                        <SelectItem value="1">ST</SelectItem>
// //                        <SelectItem value="2">SC</SelectItem>
// //                        <SelectItem value="3">OBC</SelectItem>
// //                        <SelectItem value="4">OTHERS</SelectItem>
// //                      </SelectContent>
// //                    </Select>
// //                 </div>
// //                 <div>
// //                    <Label>District <span className="text-red-500">*</span></Label>
// //                    <Select name="district" required>
// //                      <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
// //                      <SelectContent>
// //                        <SelectItem value="1">BOKARO</SelectItem>
// //                        <SelectItem value="2">CHATRA</SelectItem>
// //                        <SelectItem value="8">RANCHI</SelectItem>
// //                        <SelectItem value="24">WEST SINGHBHUM</SelectItem>
// //                      </SelectContent>
// //                    </Select>
// //                 </div>
// //                 <div>
// //                    <Label>Block</Label>
// //                    <Select name="block">
// //                      <SelectTrigger><SelectValue placeholder="Select Block" /></SelectTrigger>
// //                      <SelectContent>
// //                        <SelectItem value="block1">Block 1</SelectItem>
// //                        <SelectItem value="block2">Block 2</SelectItem>
// //                      </SelectContent>
// //                    </Select>
// //                 </div>
// //                 <div>
// //                    <Label>ICDS Project</Label>
// //                    <Select name="icdsProject">
// //                      <SelectTrigger><SelectValue placeholder="Select ICDS Project" /></SelectTrigger>
// //                      <SelectContent>
// //                        <SelectItem value="icds1">ICDS Project 1</SelectItem>
// //                        <SelectItem value="icds2">ICDS Project 2</SelectItem>
// //                      </SelectContent>
// //                    </Select>
// //                 </div>
// //               </div>

// //                {/* --- Village & Admission Date/Time --- */}
// //                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //                  <div>
// //                    <Label>Anganwadi Center</Label>
// //                    <Select name="anganwadiCenter">
// //                      <SelectTrigger><SelectValue placeholder="Select Anganwadi Center" /></SelectTrigger>
// //                      <SelectContent>
// //                        <SelectItem value="anganwadi1">Anganwadi Center 1</SelectItem>
// //                        <SelectItem value="anganwadi2">Anganwadi Center 2</SelectItem>
// //                      </SelectContent>
// //                    </Select>
// //                  </div>
// //                  <div>
// //                    <Label>Village</Label>
// //                    <Input name="village" placeholder="Enter Village" />
// //                  </div>
// //                  <div>
// //                    <Label>Admission Date <span className="text-red-500">*</span></Label>
// //                    <Popover>
// //                     <PopoverTrigger asChild>
// //                       <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !admissionDate && "text-muted-foreground")}>
// //                         <CalendarIcon className="mr-2 h-4 w-4" />
// //                         {admissionDate ? format(admissionDate, "PPP") : "Pick a date"}
// //                       </Button>
// //                     </PopoverTrigger>
// //                     <PopoverContent className="w-auto p-0">
// //                       <Calendar mode="single" selected={admissionDate} onSelect={setAdmissionDate} initialFocus />
// //                     </PopoverContent>
// //                    </Popover>
// //                  </div>
// //                  <div>
// //                    <Label>Admission Time <span className="text-red-500">*</span></Label>
// //                    <div className="relative">
// //                      <Input name="admissionTime" type="time" value={admissionTime} onChange={(e) => setAdmissionTime(e.target.value)} required className="pr-10" />
// //                      <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
// //                    </div>
// //                  </div>
// //                </div>

// //               {/* --- Vitals --- */}
// //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
// //                  <div>
// //                    <Label>Admission Weight (kg) <span className="text-red-500">*</span></Label>
// //                    <Input name="admissionWeight" type="number" step="0.01" value={weight} onChange={(e) => setWeight(e.target.value)} required placeholder="Enter Weight" />
// //                  </div>
// //                  <div>
// //                    <Label>Admission Height (cm) <span className="text-red-500">*</span></Label>
// //                    <Input name="admissionHeight" type="number" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} required placeholder="Enter Height" />
// //                  </div>
// //                  <div>
// //                    <Label>Z-Score (SD)</Label>
// //                    <Input name="admissionZScore" placeholder="Auto-calculated" value={zScore} readOnly className={cn("bg-white font-bold", getZScoreColor(zScore))} />
// //                  </div>
// //                  <div>
// //                    <Label>Admission Odema <span className="text-red-500">*</span></Label>
// //                    <Select name="admissionOdema" required>
// //                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                      <SelectContent>
// //                        <SelectItem value="1">+</SelectItem>
// //                        <SelectItem value="2">++</SelectItem>
// //                        <SelectItem value="3">+++</SelectItem>
// //                        <SelectItem value="4">No</SelectItem>
// //                      </SelectContent>
// //                    </Select>
// //                  </div>
// //               </div>

// //                {/* --- MUAC & Feeding --- */}
// //                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //                  <div>
// //                    <Label>Admission MUAC (cm) <span className="text-red-500">*</span></Label>
// //                    <Input name="admissionMuac" type="number" step="0.1" placeholder="Enter MUAC" required />
// //                  </div>
// //                  <div>
// //                    <Label>Breast Feeding <span className="text-red-500">*</span></Label>
// //                    <Select name="breastFeeding" required>
// //                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                      <SelectContent>
// //                        <SelectItem value="1">Yes</SelectItem>
// //                        <SelectItem value="2">No</SelectItem>
// //                      </SelectContent>
// //                    </Select>
// //                  </div>
// //                  <div>
// //                    <Label>Complementary Feeding <span className="text-red-500">*</span></Label>
// //                    <Select name="complementaryFeeding" required>
// //                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                      <SelectContent>
// //                        <SelectItem value="1">Yes</SelectItem>
// //                        <SelectItem value="2">No</SelectItem>
// //                      </SelectContent>
// //                    </Select>
// //                  </div>
// //                  <div>
// //                    <Label>Appetite Test <span className="text-red-500">*</span></Label>
// //                    <Select name="appetiteTest" required>
// //                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                      <SelectContent>
// //                        <SelectItem value="1">PASS</SelectItem>
// //                        <SelectItem value="2">FAIL</SelectItem>
// //                        <SelectItem value="3">NOT DONE</SelectItem>
// //                      </SelectContent>
// //                    </Select>
// //                  </div>
// //                </div>

// //                {/* --- Medical Complications --- */}
// //                <div>
// //                   <Label className="block text-sm font-medium text-gray-700 mb-2">Medical Complications <span className="text-red-500">*</span></Label>
// //                   <div className="border rounded-md p-4">
// //                     <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
// //                        {[
// //                          { id: "0", label: "NO COMPLICATION" },
// //                          { id: "1", label: "PRESENCE OF ANY OF EMERGENCY SIGNS" },
// //                          { id: "2", label: "VERY WEAK, APATHETIC" },
// //                          { id: "3", label: "ODEMA OF BOTH FEET" },
// //                          { id: "4", label: "SEVERE PALMAR PALLOR" },
// //                          { id: "5", label: "SICK YOUNG INFANT LESS THAN 2 MONTHS" },
// //                          { id: "6", label: "LETHARGY/ DROWSINESS/ UNCONSCIOUSNESS" },
// //                          { id: "7", label: "CONTINUALLY IRRITABLE AND RESTLESS" },
// //                          { id: "8", label: "ANY RESPIRATORY DISTRESS" },
// //                          { id: "9", label: "SIGN SUGGESTING SEVERE DEHYDRATION WITH DIARRHOEA" },
// //                          { id: "10", label: "PERSISTENT VOMITING" },
// //                          { id: "11", label: "HYPOTHERMIA (<35 DEGREE CENTIGRADE)" },
// //                          { id: "12", label: "SEVERE ANEMIA" },
// //                          { id: "13", label: "FEVER (>38.5 DEGREE CENTIGRADE)" },
// //                          { id: "14", label: "EXTENSIVE SKIN LESIONS, EYE LESIONS, POST-MEASLES STATES" },
// //                          { id: "15", label: "TUBERCULOSIS" },
// //                          { id: "16", label: "MALARIA" },
// //                          { id: "17", label: "OTHERS" },
// //                        ].map((item) => (
// //                          <div key={item.id} className="flex items-center space-x-2">
// //                            <input type="checkbox" id={`complication-${item.id}`} checked={selectedComplications[item.id] || false} onChange={(e) => handleComplicationChange(item.id, e.target.checked)} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
// //                            <Label htmlFor={`complication-${item.id}`} className="text-sm cursor-pointer">{item.label}</Label>
// //                          </div>
// //                        ))}
// //                     </div>
// //                     {selectedComplications["17"] && (
// //                       <div className="mt-3">
// //                         <Label htmlFor="other-complication">Other Complication Details</Label>
// //                         <Input id="other-complication" value={otherComplication} onChange={(e) => setOtherComplication(e.target.value)} placeholder="Please specify" className="mt-1" />
// //                       </div>
// //                     )}
// //                   </div>
// //                </div>

// //                {/* --- Photo Upload --- */}
// //                {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //                  <div>
// //                    <Label>Upload Photo (max 2MB, png/jpeg only)</Label>
// //                    <div className="flex items-center gap-2 mt-1">
// //                      <Input type="file" accept=".jpg,.jpeg,.png" onChange={handlePhotoUpload} className="hidden" id="photo-upload" />
// //                      <Button type="button" variant="outline" onClick={() => document.getElementById("photo-upload")?.click()} className="flex items-center gap-2 w-full">
// //                        <Upload className="h-4 w-4" /> Choose File
// //                      </Button>
// //                    </div>
// //                  </div>
// //                  {photoPreview && (
// //                    <div className="col-span-3">
// //                      <div className="relative h-32 w-32">
// //                        <Image src={photoPreview} alt="Child Photo" fill className="rounded border object-cover" unoptimized />
// //                      </div>
// //                    </div>
// //                  )}
// //                </div> */}

// //                {/* --- Buttons --- */}
// //                <div className="flex justify-end gap-3 pt-6 border-t">
// //                   <Button type="button" variant="outline" onClick={() => router.push("/mtc-user/dashboard/child-registration")} className="bg-gray-100">
// //                     ✕ Cancel
// //                   </Button>
// //                   <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700 min-w-[140px]">
// //                     {loading ? "Saving..." : "✔ Register Child"}
// //                   </Button>
// //                 </div>
// //             </form>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { format } from "date-fns";
// import toast, { Toaster } from "react-hot-toast";
// import { CalendarIcon, Clock, CheckCircle } from "lucide-react";

// // UI Components
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";

// // Utilities
// import { calculateZScore, getZScoreColor } from "@/lib/zScoreUtils";

// export default function ChildRegistration() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   // --- Success Modal State ---
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [generatedSamNo, setGeneratedSamNo] = useState("");

//   // --- Database Lists State ---
//   const [genderList, setGenderList] = useState<any[]>([]);
//   const [castList, setCastList] = useState<any[]>([]);
//   const [districtList, setDistrictList] = useState<any[]>([]);
//   const [blockList, setBlockList] = useState<any[]>([]); // Added Block List
//   const [icdsList, setICDSList] = useState<any[]>([]);
//   const [anganwadiList, setAnganwadiList] = useState<any[]>([]);

//   // --- Selected Values for Cascading ---
//   const [selectedDistrict, setSelectedDistrict] = useState<string>("");
//   const [selectedBlock, setSelectedBlock] = useState<string>(""); // Added Selected Block
//   const [selectedICDS, setSelectedICDS] = useState<string>("");

//   // --- Date & Time ---
//   const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
//   const [admissionDate, setAdmissionDate] = useState<Date | undefined>(undefined);
//   const [admissionTime, setAdmissionTime] = useState<string>("");

//   // --- Form Logic ---
//   const [referredBy, setReferredBy] = useState("");
//   const [showAshaFields, setShowAshaFields] = useState(false);

//   // --- Complications ---
//   const [selectedComplications, setSelectedComplications] = useState<{ [key: string]: boolean }>({});
//   const [otherComplication, setOtherComplication] = useState("");

//   // --- Files ---
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);

//   // --- Vitals & Calculation ---
//   const [weight, setWeight] = useState<string>("");
//   const [height, setHeight] = useState<string>("");
//   const [sex, setSex] = useState<string>("");
//   const [zScore, setZScore] = useState<string>("");

//   // --- Effects ---
//   useEffect(() => {
//     setMounted(true);
//     fetchMasterData(); // Fetch initial lists on load
//   }, []);

//   useEffect(() => {
//     setShowAshaFields(referredBy === "6");
//   }, [referredBy]);

//   useEffect(() => {
//     if (weight && height && sex) {
//       const calculated = calculateZScore(parseFloat(weight), parseFloat(height), sex);
//       setZScore(calculated);
//     } else {
//       setZScore("");
//     }
//   }, [weight, height, sex]);

//   // --- Data Fetching Helpers ---

//   const fetchMasterData = async () => {
//     try {
//       const res = await fetch('/api/master-data');
//       if (!res.ok) throw new Error("API Failed");
      
//       const data = await res.json();
      
//       setGenderList(data.genders || []);
//       setCastList(data.casts || []);
//       setDistrictList(data.districts || []);
//     } catch (error) {
//       console.error("Failed to load master data", error);
//       toast.error("Failed to load dropdown options");
//     }
//   };

//   const handleDistrictChange = async (districtId: string) => {
//     setSelectedDistrict(districtId);
    
//     // Reset subordinate fields
//     setSelectedICDS(""); 
//     setICDSList([]);     
//     setAnganwadiList([]); 

//     // Reset Block
//     setSelectedBlock("");
//     setBlockList([]);

//     try {
//       // Fetch ICDS and Blocks in parallel
//       const [resIcds, resBlock] = await Promise.all([
//         fetch(`/api/master-data?type=icds&parentId=${districtId}`),
//         fetch(`/api/master-data?type=block&parentId=${districtId}`)
//       ]);

//       const icdsData = await resIcds.json();
//       const blockData = await resBlock.json();

//       setICDSList(icdsData);
//       setBlockList(blockData);
//     } catch (error) {
//       toast.error("Failed to load location data");
//     }
//   };

//   const handleICDSChange = async (icdsId: string) => {
//     setSelectedICDS(icdsId);
//     setAnganwadiList([]); 

//     try {
//       const res = await fetch(`/api/master-data?type=anganwadi&parentId=${icdsId}`);
//       const data = await res.json();
//       setAnganwadiList(data);
//     } catch (error) {
//       toast.error("Failed to load Anganwadi Centers");
//     }
//   };

//   // --- Handlers ---

//   const handleComplicationChange = (id: string, checked: boolean) => {
//     setSelectedComplications((prev) => ({
//       ...prev,
//       [id]: checked,
//     }));
//   };

//   const handleCloseSuccess = () => {
//     setShowSuccessModal(false);
//     router.push("/mtc-user/dashboard/child-registration");
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.currentTarget as HTMLFormElement);

//     // 1. Process Complications
//     const complicationsArray = Object.keys(selectedComplications).filter(
//       (key) => selectedComplications[key]
//     );
//     let complicationString = complicationsArray.join(",");
//     if (selectedComplications["17"] && otherComplication) {
//       complicationString += ` - ${otherComplication}`;
//     }

//     const getInt = (val: FormDataEntryValue | null) =>
//       val && val !== "" ? parseInt(val.toString()) : null;
//     const getFloat = (val: FormDataEntryValue | null) =>
//       val && val !== "" ? parseFloat(val.toString()) : null;
//     const getString = (val: FormDataEntryValue | null) =>
//       val && val !== "" ? val.toString() : null;

//     // 2. Construct Payload
//     const sqlPayload = {
//       MTCCode: "MTC_DEFAULT_01",
//       AtId: getInt(formData.get("admissionType")),
//       RefererId: parseInt(referredBy) || null,
//       ChildName: getString(formData.get("childName")),
//       MotherName: getString(formData.get("motherName")),
//       FatherName: getString(formData.get("fatherName")),
//       MobileNumber: getString(formData.get("mobileNumber")),
//       BPLNo: getString(formData.get("bplNumber")),
//       DateofBirth: dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : null,
//       GenderId: sex ? parseInt(sex) : null,
//       AdmissionWeight: weight ? parseFloat(weight) : null,
//       AdmissionHeight: height ? parseFloat(height) : null,
//       AdmissionZScore: zScore ? parseFloat(zScore) : null,
//       CastId: getInt(formData.get("caste")), 
//       Address: getString(formData.get("address")),
      
//       DistrictId: parseInt(selectedDistrict),
//       BlockId: selectedBlock ? parseInt(selectedBlock) : null, // Uses State now
//       ICDSId: parseInt(selectedICDS),
//       AnganwadiId: getInt(formData.get("anganwadiCenter")),
      
//       VillageName: getString(formData.get("village")),
//       AdmissionDate: admissionDate
//         ? `${format(admissionDate, "yyyy-MM-dd")} ${admissionTime || "00:00"}`
//         : null,
//       AdmissionEdema: getInt(formData.get("admissionOdema")),
//       AdmissionMuac: getFloat(formData.get("admissionMuac")),
//       AdmissionAppetite: getInt(formData.get("appetiteTest")),
//       BreastFeeding: getInt(formData.get("breastFeeding")),
//       ComplementaryFeeding: getInt(formData.get("complementaryFeeding")),
//       MedicalComplication: complicationString,
//       RegistrationImage: photoPreview || null,
//     };

//     try {
//       const response = await fetch("/api/register-child", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(sqlPayload),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Registration failed");
//       }

//       setGeneratedSamNo(result.samNo);
//       setShowSuccessModal(true);
      
//     } catch (error: any) {
//       console.error("Submission Error:", error);
//       toast.error(error.message || "Failed to connect to server");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!mounted) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-6">
//       <Toaster position="top-right" />
      
//       {/* --- Success Modal --- */}
//       {showSuccessModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
//             <div className="p-6 pb-2">
//               <h2 className="text-xl font-semibold flex items-center gap-2 text-teal-700">
//                 <CheckCircle className="h-6 w-6 text-teal-600" />
//                 Registration Successful
//               </h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 The child has been registered in the database.
//               </p>
//             </div>
//             <div className="p-6 py-8 flex flex-col items-center justify-center bg-gray-50 border-y border-gray-100">
//               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
//                 Generated SAM Number
//               </span>
//               <div className="text-3xl font-mono font-bold text-gray-900 bg-white px-6 py-3 rounded border border-gray-200 shadow-sm select-all">
//                 {generatedSamNo}
//               </div>
//             </div>
//             <div className="p-6 pt-4 flex justify-end">
//               <Button 
//                 onClick={handleCloseSuccess} 
//                 className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white"
//               >
//                 Done & Return to Dashboard
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto">
//         <Card className="shadow-md border border-gray-200">
//           <CardHeader>
//             <h1 className="text-2xl font-bold text-teal-700">Child Registration</h1>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
              
//               {/* --- SAM Number (Static) --- */}
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div>
//                   <Label>SAM Number</Label>
//                   <Input
//                     value="Auto-generated on Save"
//                     readOnly
//                     className="bg-gray-100 font-bold text-gray-900 cursor-not-allowed border-gray-300 focus-visible:ring-0"
//                   />
//                 </div>
                
//                 <div>
//                     <Label>Admission Type <span className="text-red-500">*</span></Label>
//                     <Select name="admissionType" required>
//                       <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="1">NEW ADMISSION</SelectItem>
//                         <SelectItem value="2">RE ADMISSION</SelectItem>
//                         <SelectItem value="3">RELAPSE</SelectItem>
//                       </SelectContent>
//                     </Select>
//                 </div>

//                  <div>
//                     <Label>Referred By</Label>
//                     <Select name="referredBy" onValueChange={setReferredBy}>
//                         <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="6">Sahiya/ASHA</SelectItem>
//                             <SelectItem value="1">ANGANWADI</SelectItem>
//                             <SelectItem value="2">ANM</SelectItem>
//                             <SelectItem value="7">Poshan Sakhi</SelectItem>
//                             <SelectItem value="8">RBSK Team</SelectItem>
//                             <SelectItem value="3">OPD</SelectItem>
//                             <SelectItem value="4">SELF</SelectItem>
//                             <SelectItem value="5">OTHER</SelectItem>
//                         </SelectContent>
//                     </Select>
//                  </div>
//                  {showAshaFields && (
//                   <div>
//                     <Label>Name of Sahiya/Asha</Label>
//                     <Input name="referredByName" placeholder="Enter Sahiya/Asha Name" />
//                   </div>
//                  )}
//               </div>
              
//               {/* --- Personal Information --- */}
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   <div>
//                     <Label>Child Name <span className="text-red-500">*</span></Label>
//                     <Input name="childName" placeholder="Enter Child Name" required />
//                   </div>
//                   <div>
//                     <Label>Mother Name <span className="text-red-500">*</span></Label>
//                     <Input name="motherName" placeholder="Enter Mother Name" required />
//                   </div>
//                   <div>
//                     <Label>Father Name <span className="text-red-500">*</span></Label>
//                     <Input name="fatherName" placeholder="Enter Father Name" required />
//                   </div>
//                   <div>
//                     <Label>Mobile Number <span className="text-red-500">*</span></Label>
//                     <Input name="mobileNumber" type="tel" maxLength={10} required pattern="[0-9]{10}" placeholder="Enter Mobile Number" />
//                   </div>
//               </div>

//                {/* --- BPL, DOB, Sex, Address --- */}
//                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                  <div>
//                    <Label>BPL Number</Label>
//                    <Input name="bplNumber" placeholder="Enter BPL Number" />
//                  </div>
//                  <div>
//                    <Label>Date of Birth <span className="text-red-500">*</span></Label>
//                    <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateOfBirth && "text-muted-foreground")}>
//                         <CalendarIcon className="mr-2 h-4 w-4" />
//                         {dateOfBirth ? format(dateOfBirth, "PPP") : "Pick a date"}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0">
//                       <Calendar mode="single" selected={dateOfBirth} onSelect={setDateOfBirth} initialFocus />
//                     </PopoverContent>
//                    </Popover>
//                  </div>

//                  <div>
//                    <Label>Sex <span className="text-red-500">*</span></Label>
//                    <Select name="sex" value={sex} onValueChange={setSex} required>
//                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                      <SelectContent>
//                        {genderList.map((g) => (
//                          <SelectItem 
//                            key={g.GenderId || g.genderId} 
//                            value={String(g.GenderId || g.genderId)}
//                          >
//                            {g.GenderName || g.genderName}
//                          </SelectItem>
//                        ))}
//                      </SelectContent>
//                    </Select>
//                  </div>

//                  <div>
//                    <Label>Address <span className="text-red-500">*</span></Label>
//                    <Textarea name="address" placeholder="Enter Address" rows={1} />
//                  </div>
//                </div>

//               {/* --- Location Details --- */}
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
//                 <div>
//                    <Label>Caste <span className="text-red-500">*</span></Label>
//                    <Select name="caste" required>
//                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                      <SelectContent>
//                        {castList.map((c) => (
//                          <SelectItem 
//                            key={c.CastId || c.castId} 
//                            value={String(c.CastId || c.castId)}
//                          >
//                            {c.CastName || c.castName}
//                          </SelectItem>
//                        ))}
//                      </SelectContent>
//                    </Select>
//                 </div>

//                 <div>
//                    <Label>District <span className="text-red-500">*</span></Label>
//                    <Select 
//                      name="district" 
//                      value={selectedDistrict} 
//                      onValueChange={handleDistrictChange} 
//                      required
//                    >
//                      <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
//                      <SelectContent>
//                        {districtList.map((d) => (
//                          <SelectItem 
//                            key={d.DistrictId || d.districtId} 
//                            value={String(d.DistrictId || d.districtId)}
//                          >
//                            {d.DistrictName || d.districtName}
//                          </SelectItem>
//                        ))}
//                      </SelectContent>
//                    </Select>
//                 </div>

//                 {/* --- DYNAMIC BLOCK DROPDOWN --- */}
//                 <div>
//                    <Label>Block <span className="text-red-500">*</span></Label>
//                    <Select 
//                      name="block" 
//                      value={selectedBlock} 
//                      onValueChange={setSelectedBlock}
//                      disabled={!selectedDistrict}
//                      required
//                    >
//                      <SelectTrigger><SelectValue placeholder="Select Block" /></SelectTrigger>
//                      <SelectContent>
//                        {blockList.map((b) => (
//                          <SelectItem 
//                            key={b.BlockId || b.blockId} 
//                            value={String(b.BlockId || b.blockId)}
//                          >
//                            {b.BlockName || b.blockName}
//                          </SelectItem>
//                        ))}
//                      </SelectContent>
//                    </Select>
//                 </div>

//                 <div>
//                    <Label>ICDS Project</Label>
//                    <Select 
//                     name="icdsProject"
//                     value={selectedICDS}
//                     onValueChange={handleICDSChange}
//                     disabled={!selectedDistrict}
//                    >
//                      <SelectTrigger><SelectValue placeholder="Select ICDS Project" /></SelectTrigger>
//                      <SelectContent>
//                        {icdsList.map((i) => (
//                          <SelectItem 
//                            key={i.ICDSId || i.icdsId} 
//                            value={String(i.ICDSId || i.icdsId)}
//                          >
//                            {i.ICDSName || i.icdsName}
//                          </SelectItem>
//                        ))}
//                      </SelectContent>
//                    </Select>
//                 </div>
//               </div>

//                {/* --- Village & Admission Date/Time --- */}
//                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                 
//                  <div>
//                    <Label>Anganwadi Center</Label>
//                    <Select 
//                     name="anganwadiCenter"
//                     disabled={!selectedICDS}
//                    >
//                      <SelectTrigger><SelectValue placeholder="Select Anganwadi Center" /></SelectTrigger>
//                      <SelectContent>
//                        {anganwadiList.map((a) => (
//                          <SelectItem 
//                            key={a.AnganwadiId || a.anganwadiId} 
//                            value={String(a.AnganwadiId || a.anganwadiId)}
//                          >
//                            {a.AnganwadiName || a.anganwadiName}
//                          </SelectItem>
//                        ))}
//                      </SelectContent>
//                    </Select>
//                  </div>

//                  <div>
//                    <Label>Village</Label>
//                    <Input name="village" placeholder="Enter Village" />
//                  </div>
//                  <div>
//                    <Label>Admission Date <span className="text-red-500">*</span></Label>
//                    <Popover>
//                     <PopoverTrigger asChild>
//                       <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !admissionDate && "text-muted-foreground")}>
//                         <CalendarIcon className="mr-2 h-4 w-4" />
//                         {admissionDate ? format(admissionDate, "PPP") : "Pick a date"}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0">
//                       <Calendar mode="single" selected={admissionDate} onSelect={setAdmissionDate} initialFocus />
//                     </PopoverContent>
//                    </Popover>
//                  </div>
//                  <div>
//                    <Label>Admission Time <span className="text-red-500">*</span></Label>
//                    <div className="relative">
//                      <Input name="admissionTime" type="time" value={admissionTime} onChange={(e) => setAdmissionTime(e.target.value)} required className="pr-10" />
//                      <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                    </div>
//                  </div>
//                </div>

//               {/* --- Vitals --- */}
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
//                   <div>
//                     <Label>Admission Weight (kg) <span className="text-red-500">*</span></Label>
//                     <Input name="admissionWeight" type="number" step="0.01" value={weight} onChange={(e) => setWeight(e.target.value)} required placeholder="Enter Weight" />
//                   </div>
//                   <div>
//                     <Label>Admission Height (cm) <span className="text-red-500">*</span></Label>
//                     <Input name="admissionHeight" type="number" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} required placeholder="Enter Height" />
//                   </div>
//                   <div>
//                     <Label>Z-Score (SD)</Label>
//                     <Input name="admissionZScore" placeholder="Auto-calculated" value={zScore} readOnly className={cn("bg-white font-bold", getZScoreColor(zScore))} />
//                   </div>
//                   <div>
//                     <Label>Admission Odema <span className="text-red-500">*</span></Label>
//                     <Select name="admissionOdema" required>
//                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="1">+</SelectItem>
//                         <SelectItem value="2">++</SelectItem>
//                         <SelectItem value="3">+++</SelectItem>
//                         <SelectItem value="4">No</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//               </div>

//                {/* --- MUAC & Feeding --- */}
//                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                  <div>
//                    <Label>Admission MUAC (cm) <span className="text-red-500">*</span></Label>
//                    <Input name="admissionMuac" type="number" step="0.1" placeholder="Enter MUAC" required />
//                  </div>
//                  <div>
//                    <Label>Breast Feeding <span className="text-red-500">*</span></Label>
//                    <Select name="breastFeeding" required>
//                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                      <SelectContent>
//                        <SelectItem value="1">Yes</SelectItem>
//                        <SelectItem value="2">No</SelectItem>
//                      </SelectContent>
//                    </Select>
//                  </div>
//                  <div>
//                    <Label>Complementary Feeding <span className="text-red-500">*</span></Label>
//                    <Select name="complementaryFeeding" required>
//                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                      <SelectContent>
//                        <SelectItem value="1">Yes</SelectItem>
//                        <SelectItem value="2">No</SelectItem>
//                      </SelectContent>
//                    </Select>
//                  </div>
//                  <div>
//                    <Label>Appetite Test <span className="text-red-500">*</span></Label>
//                    <Select name="appetiteTest" required>
//                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                      <SelectContent>
//                        <SelectItem value="1">PASS</SelectItem>
//                        <SelectItem value="2">FAIL</SelectItem>
//                        <SelectItem value="3">NOT DONE</SelectItem>
//                      </SelectContent>
//                    </Select>
//                  </div>
//                </div>

//                {/* --- Medical Complications --- */}
//                <div>
//                   <Label className="block text-sm font-medium text-gray-700 mb-2">Medical Complications <span className="text-red-500">*</span></Label>
//                   <div className="border rounded-md p-4">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                        {[
//                          { id: "0", label: "NO COMPLICATION" },
//                          { id: "1", label: "PRESENCE OF ANY OF EMERGENCY SIGNS" },
//                          { id: "2", label: "VERY WEAK, APATHETIC" },
//                          { id: "3", label: "ODEMA OF BOTH FEET" },
//                          { id: "4", label: "SEVERE PALMAR PALLOR" },
//                          { id: "5", label: "SICK YOUNG INFANT LESS THAN 2 MONTHS" },
//                          { id: "6", label: "LETHARGY/ DROWSINESS/ UNCONSCIOUSNESS" },
//                          { id: "7", label: "CONTINUALLY IRRITABLE AND RESTLESS" },
//                          { id: "8", label: "ANY RESPIRATORY DISTRESS" },
//                          { id: "9", label: "SIGN SUGGESTING SEVERE DEHYDRATION WITH DIARRHOEA" },
//                          { id: "10", label: "PERSISTENT VOMITING" },
//                          { id: "11", label: "HYPOTHERMIA (<35 DEGREE CENTIGRADE)" },
//                          { id: "12", label: "SEVERE ANEMIA" },
//                          { id: "13", label: "FEVER (>38.5 DEGREE CENTIGRADE)" },
//                          { id: "14", label: "EXTENSIVE SKIN LESIONS, EYE LESIONS, POST-MEASLES STATES" },
//                          { id: "15", label: "TUBERCULOSIS" },
//                          { id: "16", label: "MALARIA" },
//                          { id: "17", label: "OTHERS" },
//                        ].map((item) => (
//                          <div key={item.id} className="flex items-center space-x-2">
//                            <input type="checkbox" id={`complication-${item.id}`} checked={selectedComplications[item.id] || false} onChange={(e) => handleComplicationChange(item.id, e.target.checked)} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
//                            <Label htmlFor={`complication-${item.id}`} className="text-sm cursor-pointer">{item.label}</Label>
//                          </div>
//                        ))}
//                     </div>
//                     {selectedComplications["17"] && (
//                       <div className="mt-3">
//                         <Label htmlFor="other-complication">Other Complication Details</Label>
//                         <Input id="other-complication" value={otherComplication} onChange={(e) => setOtherComplication(e.target.value)} placeholder="Please specify" className="mt-1" />
//                       </div>
//                     )}
//                   </div>
//                </div>

//                {/* --- Buttons --- */}
//                <div className="flex justify-end gap-3 pt-6 border-t">
//                   <Button type="button" variant="outline" onClick={() => router.push("/mtc-user/dashboard/child-registration")} className="bg-gray-100">
//                     ✕ Cancel
//                   </Button>
//                   <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700 min-w-[140px]">
//                     {loading ? "Saving..." : "✔ Register Child"}
//                   </Button>
//                 </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Removed unused Image import
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { CalendarIcon, Clock, CheckCircle } from "lucide-react";

// UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Utilities
import { calculateZScore, getZScoreColor } from "@/lib/zScoreUtils";

// --- Interfaces for Master Data ---
interface Gender {
  GenderId?: number;
  genderId?: number;
  GenderName?: string;
  genderName?: string;
}

interface Cast {
  CastId?: number;
  castId?: number;
  CastName?: string;
  castName?: string;
}

interface District {
  DistrictId?: number;
  districtId?: number;
  DistrictName?: string;
  districtName?: string;
}

interface Block {
  BlockId?: number;
  blockId?: number;
  BlockName?: string;
  blockName?: string;
}

interface ICDS {
  ICDSId?: number;
  icdsId?: number;
  ICDSName?: string;
  icdsName?: string;
}

interface Anganwadi {
  AnganwadiId?: number;
  anganwadiId?: number;
  AnganwadiName?: string;
  anganwadiName?: string;
}

export default function ChildRegistration() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // --- Success Modal State ---
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedSamNo, setGeneratedSamNo] = useState("");

  // --- Database Lists State ---
  const [genderList, setGenderList] = useState<Gender[]>([]);
  const [castList, setCastList] = useState<Cast[]>([]);
  const [districtList, setDistrictList] = useState<District[]>([]);
  const [blockList, setBlockList] = useState<Block[]>([]);
  const [icdsList, setICDSList] = useState<ICDS[]>([]);
  const [anganwadiList, setAnganwadiList] = useState<Anganwadi[]>([]);

  // --- Selected Values for Cascading ---
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedBlock, setSelectedBlock] = useState<string>("");
  const [selectedICDS, setSelectedICDS] = useState<string>("");

  // --- Date & Time ---
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [admissionDate, setAdmissionDate] = useState<Date | undefined>(undefined);
  const [admissionTime, setAdmissionTime] = useState<string>("");

  // --- Form Logic ---
  const [referredBy, setReferredBy] = useState("");
  const [showAshaFields, setShowAshaFields] = useState(false);

  // --- Complications ---
  const [selectedComplications, setSelectedComplications] = useState<{ [key: string]: boolean }>({});
  const [otherComplication, setOtherComplication] = useState("");

  // --- Files ---
  // Removed unused state setters for photoPreview since no upload logic exists yet.
  // If you add upload logic later, add `setPhotoPreview` back.
  const photoPreview: string | null = null; 

  // --- Vitals & Calculation ---
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [zScore, setZScore] = useState<string>("");

  // --- Effects ---
  useEffect(() => {
    setMounted(true);
    fetchMasterData(); // Fetch initial lists on load
  }, []);

  useEffect(() => {
    setShowAshaFields(referredBy === "6");
  }, [referredBy]);

  useEffect(() => {
    if (weight && height && sex) {
      const calculated = calculateZScore(parseFloat(weight), parseFloat(height), sex);
      setZScore(calculated);
    } else {
      setZScore("");
    }
  }, [weight, height, sex]);

  // --- Data Fetching Helpers ---

  const fetchMasterData = async () => {
    try {
      const res = await fetch('/api/master-data');
      if (!res.ok) throw new Error("API Failed");
      
      const data = await res.json();
      
      setGenderList(data.genders || []);
      setCastList(data.casts || []);
      setDistrictList(data.districts || []);
    } catch (error) {
      console.error("Failed to load master data", error);
      toast.error("Failed to load dropdown options");
    }
  };

  const handleDistrictChange = async (districtId: string) => {
    setSelectedDistrict(districtId);
    
    // Reset subordinate fields
    setSelectedICDS(""); 
    setICDSList([]);     
    setAnganwadiList([]); 

    // Reset Block
    setSelectedBlock("");
    setBlockList([]);

    try {
      // Fetch ICDS and Blocks in parallel
      const [resIcds, resBlock] = await Promise.all([
        fetch(`/api/master-data?type=icds&parentId=${districtId}`),
        fetch(`/api/master-data?type=block&parentId=${districtId}`)
      ]);

      const icdsData = await resIcds.json();
      const blockData = await resBlock.json();

      setICDSList(icdsData);
      setBlockList(blockData);
    } catch {
      // Removed unused 'error' variable
      toast.error("Failed to load location data");
    }
  };

  const handleICDSChange = async (icdsId: string) => {
    setSelectedICDS(icdsId);
    setAnganwadiList([]); 

    try {
      const res = await fetch(`/api/master-data?type=anganwadi&parentId=${icdsId}`);
      const data = await res.json();
      setAnganwadiList(data);
    } catch {
      // Removed unused 'error' variable
      toast.error("Failed to load Anganwadi Centers");
    }
  };

  // --- Handlers ---

  const handleComplicationChange = (id: string, checked: boolean) => {
    setSelectedComplications((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    router.push("/mtc-user/dashboard/child-registration");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // 1. Process Complications
    const complicationsArray = Object.keys(selectedComplications).filter(
      (key) => selectedComplications[key]
    );
    let complicationString = complicationsArray.join(",");
    if (selectedComplications["17"] && otherComplication) {
      complicationString += ` - ${otherComplication}`;
    }

    const getInt = (val: FormDataEntryValue | null) =>
      val && val !== "" ? parseInt(val.toString()) : null;
    const getFloat = (val: FormDataEntryValue | null) =>
      val && val !== "" ? parseFloat(val.toString()) : null;
    const getString = (val: FormDataEntryValue | null) =>
      val && val !== "" ? val.toString() : null;

    // 2. Construct Payload
    const sqlPayload = {
      MTCCode: "MTC_DEFAULT_01",
      AtId: getInt(formData.get("admissionType")),
      RefererId: parseInt(referredBy) || null,
      ChildName: getString(formData.get("childName")),
      MotherName: getString(formData.get("motherName")),
      FatherName: getString(formData.get("fatherName")),
      MobileNumber: getString(formData.get("mobileNumber")),
      BPLNo: getString(formData.get("bplNumber")),
      DateofBirth: dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : null,
      GenderId: sex ? parseInt(sex) : null,
      AdmissionWeight: weight ? parseFloat(weight) : null,
      AdmissionHeight: height ? parseFloat(height) : null,
      AdmissionZScore: zScore ? parseFloat(zScore) : null,
      CastId: getInt(formData.get("caste")), 
      Address: getString(formData.get("address")),
      
      DistrictId: parseInt(selectedDistrict),
      BlockId: selectedBlock ? parseInt(selectedBlock) : null, // Uses State now
      ICDSId: parseInt(selectedICDS),
      AnganwadiId: getInt(formData.get("anganwadiCenter")),
      
      VillageName: getString(formData.get("village")),
      AdmissionDate: admissionDate
        ? `${format(admissionDate, "yyyy-MM-dd")} ${admissionTime || "00:00"}`
        : null,
      AdmissionEdema: getInt(formData.get("admissionOdema")),
      AdmissionMuac: getFloat(formData.get("admissionMuac")),
      AdmissionAppetite: getInt(formData.get("appetiteTest")),
      BreastFeeding: getInt(formData.get("breastFeeding")),
      ComplementaryFeeding: getInt(formData.get("complementaryFeeding")),
      MedicalComplication: complicationString,
      RegistrationImage: photoPreview || null,
    };

    try {
      const response = await fetch("/api/register-child", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sqlPayload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      setGeneratedSamNo(result.samNo);
      setShowSuccessModal(true);
      
    } catch (error: unknown) {
      console.error("Submission Error:", error);
      // Safer type checking for error message
      const errorMessage = error instanceof Error ? error.message : "Failed to connect to server";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <Toaster position="top-right" />
      
      {/* --- Success Modal --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 pb-2">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-teal-700">
                <CheckCircle className="h-6 w-6 text-teal-600" />
                Registration Successful
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                The child has been registered in the database.
              </p>
            </div>
            <div className="p-6 py-8 flex flex-col items-center justify-center bg-gray-50 border-y border-gray-100">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Generated SAM Number
              </span>
              <div className="text-3xl font-mono font-bold text-gray-900 bg-white px-6 py-3 rounded border border-gray-200 shadow-sm select-all">
                {generatedSamNo}
              </div>
            </div>
            <div className="p-6 pt-4 flex justify-end">
              <Button 
                onClick={handleCloseSuccess} 
                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white"
              >
                Done & Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <Card className="shadow-md border border-gray-200">
          <CardHeader>
            <h1 className="text-2xl font-bold text-teal-700">Child Registration</h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* --- SAM Number (Static) --- */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>SAM Number</Label>
                  <Input
                    value="Auto-generated on Save"
                    readOnly
                    className="bg-gray-100 font-bold text-gray-900 cursor-not-allowed border-gray-300 focus-visible:ring-0"
                  />
                </div>
                
                <div>
                    <Label>Admission Type <span className="text-red-500">*</span></Label>
                    <Select name="admissionType" required>
                      <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">NEW ADMISSION</SelectItem>
                        <SelectItem value="2">RE ADMISSION</SelectItem>
                        <SelectItem value="3">RELAPSE</SelectItem>
                      </SelectContent>
                    </Select>
                </div>

                 <div>
                    <Label>Referred By</Label>
                    <Select name="referredBy" onValueChange={setReferredBy}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="6">Sahiya/ASHA</SelectItem>
                            <SelectItem value="1">ANGANWADI</SelectItem>
                            <SelectItem value="2">ANM</SelectItem>
                            <SelectItem value="7">Poshan Sakhi</SelectItem>
                            <SelectItem value="8">RBSK Team</SelectItem>
                            <SelectItem value="3">OPD</SelectItem>
                            <SelectItem value="4">SELF</SelectItem>
                            <SelectItem value="5">OTHER</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
                 {showAshaFields && (
                  <div>
                    <Label>Name of Sahiya/Asha</Label>
                    <Input name="referredByName" placeholder="Enter Sahiya/Asha Name" />
                  </div>
                 )}
              </div>
              
              {/* --- Personal Information --- */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Child Name <span className="text-red-500">*</span></Label>
                    <Input name="childName" placeholder="Enter Child Name" required />
                  </div>
                  <div>
                    <Label>Mother Name <span className="text-red-500">*</span></Label>
                    <Input name="motherName" placeholder="Enter Mother Name" required />
                  </div>
                  <div>
                    <Label>Father Name <span className="text-red-500">*</span></Label>
                    <Input name="fatherName" placeholder="Enter Father Name" required />
                  </div>
                  <div>
                    <Label>Mobile Number <span className="text-red-500">*</span></Label>
                    <Input name="mobileNumber" type="tel" maxLength={10} required pattern="[0-9]{10}" placeholder="Enter Mobile Number" />
                  </div>
              </div>

               {/* --- BPL, DOB, Sex, Address --- */}
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                 <div>
                   <Label>BPL Number</Label>
                   <Input name="bplNumber" placeholder="Enter BPL Number" />
                 </div>
                 <div>
                   <Label>Date of Birth <span className="text-red-500">*</span></Label>
                   <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateOfBirth && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateOfBirth ? format(dateOfBirth, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateOfBirth} onSelect={setDateOfBirth} initialFocus />
                    </PopoverContent>
                   </Popover>
                 </div>

                 <div>
                   <Label>Sex <span className="text-red-500">*</span></Label>
                   <Select name="sex" value={sex} onValueChange={setSex} required>
                     <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                     <SelectContent>
                       {genderList.map((g) => (
                         <SelectItem 
                           key={g.GenderId || g.genderId} 
                           value={String(g.GenderId || g.genderId)}
                         >
                           {g.GenderName || g.genderName}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </div>

                 <div>
                   <Label>Address <span className="text-red-500">*</span></Label>
                   <Textarea name="address" placeholder="Enter Address" rows={1} />
                 </div>
               </div>

              {/* --- Location Details --- */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                <div>
                   <Label>Caste <span className="text-red-500">*</span></Label>
                   <Select name="caste" required>
                     <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                     <SelectContent>
                       {castList.map((c) => (
                         <SelectItem 
                           key={c.CastId || c.castId} 
                           value={String(c.CastId || c.castId)}
                         >
                           {c.CastName || c.castName}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                </div>

                <div>
                   <Label>District <span className="text-red-500">*</span></Label>
                   <Select 
                     name="district" 
                     value={selectedDistrict} 
                     onValueChange={handleDistrictChange} 
                     required
                   >
                     <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
                     <SelectContent>
                       {districtList.map((d) => (
                         <SelectItem 
                           key={d.DistrictId || d.districtId} 
                           value={String(d.DistrictId || d.districtId)}
                         >
                           {d.DistrictName || d.districtName}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                </div>

                {/* --- DYNAMIC BLOCK DROPDOWN --- */}
                <div>
                   <Label>Block <span className="text-red-500">*</span></Label>
                   <Select 
                     name="block" 
                     value={selectedBlock} 
                     onValueChange={setSelectedBlock}
                     disabled={!selectedDistrict}
                     required
                   >
                     <SelectTrigger><SelectValue placeholder="Select Block" /></SelectTrigger>
                     <SelectContent>
                       {blockList.map((b) => (
                         <SelectItem 
                           key={b.BlockId || b.blockId} 
                           value={String(b.BlockId || b.blockId)}
                         >
                           {b.BlockName || b.blockName}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                </div>

                <div>
                   <Label>ICDS Project</Label>
                   <Select 
                    name="icdsProject"
                    value={selectedICDS}
                    onValueChange={handleICDSChange}
                    disabled={!selectedDistrict}
                   >
                     <SelectTrigger><SelectValue placeholder="Select ICDS Project" /></SelectTrigger>
                     <SelectContent>
                       {icdsList.map((i) => (
                         <SelectItem 
                           key={i.ICDSId || i.icdsId} 
                           value={String(i.ICDSId || i.icdsId)}
                         >
                           {i.ICDSName || i.icdsName}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                </div>
              </div>

               {/* --- Village & Admission Date/Time --- */}
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                 
                 <div>
                   <Label>Anganwadi Center</Label>
                   <Select 
                    name="anganwadiCenter"
                    disabled={!selectedICDS}
                   >
                     <SelectTrigger><SelectValue placeholder="Select Anganwadi Center" /></SelectTrigger>
                     <SelectContent>
                       {anganwadiList.map((a) => (
                         <SelectItem 
                           key={a.AnganwadiId || a.anganwadiId} 
                           value={String(a.AnganwadiId || a.anganwadiId)}
                         >
                           {a.AnganwadiName || a.anganwadiName}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </div>

                 <div>
                   <Label>Village</Label>
                   <Input name="village" placeholder="Enter Village" />
                 </div>
                 <div>
                   <Label>Admission Date <span className="text-red-500">*</span></Label>
                   <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !admissionDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {admissionDate ? format(admissionDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={admissionDate} onSelect={setAdmissionDate} initialFocus />
                    </PopoverContent>
                   </Popover>
                 </div>
                 <div>
                   <Label>Admission Time <span className="text-red-500">*</span></Label>
                   <div className="relative">
                     <Input name="admissionTime" type="time" value={admissionTime} onChange={(e) => setAdmissionTime(e.target.value)} required className="pr-10" />
                     <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                   </div>
                 </div>
               </div>

              {/* --- Vitals --- */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                  <div>
                    <Label>Admission Weight (kg) <span className="text-red-500">*</span></Label>
                    <Input name="admissionWeight" type="number" step="0.01" value={weight} onChange={(e) => setWeight(e.target.value)} required placeholder="Enter Weight" />
                  </div>
                  <div>
                    <Label>Admission Height (cm) <span className="text-red-500">*</span></Label>
                    <Input name="admissionHeight" type="number" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} required placeholder="Enter Height" />
                  </div>
                  <div>
                    <Label>Z-Score (SD)</Label>
                    <Input name="admissionZScore" placeholder="Auto-calculated" value={zScore} readOnly className={cn("bg-white font-bold", getZScoreColor(zScore))} />
                  </div>
                  <div>
                    <Label>Admission Odema <span className="text-red-500">*</span></Label>
                    <Select name="admissionOdema" required>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">+</SelectItem>
                        <SelectItem value="2">++</SelectItem>
                        <SelectItem value="3">+++</SelectItem>
                        <SelectItem value="4">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              </div>

               {/* --- MUAC & Feeding --- */}
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                 <div>
                   <Label>Admission MUAC (cm) <span className="text-red-500">*</span></Label>
                   <Input name="admissionMuac" type="number" step="0.1" placeholder="Enter MUAC" required />
                 </div>
                 <div>
                   <Label>Breast Feeding <span className="text-red-500">*</span></Label>
                   <Select name="breastFeeding" required>
                     <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                     <SelectContent>
                       <SelectItem value="1">Yes</SelectItem>
                       <SelectItem value="2">No</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div>
                   <Label>Complementary Feeding <span className="text-red-500">*</span></Label>
                   <Select name="complementaryFeeding" required>
                     <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                     <SelectContent>
                       <SelectItem value="1">Yes</SelectItem>
                       <SelectItem value="2">No</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div>
                   <Label>Appetite Test <span className="text-red-500">*</span></Label>
                   <Select name="appetiteTest" required>
                     <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                     <SelectContent>
                       <SelectItem value="1">PASS</SelectItem>
                       <SelectItem value="2">FAIL</SelectItem>
                       <SelectItem value="3">NOT DONE</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
               </div>

               {/* --- Medical Complications --- */}
               <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Medical Complications <span className="text-red-500">*</span></Label>
                  <div className="border rounded-md p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                       {[
                         { id: "0", label: "NO COMPLICATION" },
                         { id: "1", label: "PRESENCE OF ANY OF EMERGENCY SIGNS" },
                         { id: "2", label: "VERY WEAK, APATHETIC" },
                         { id: "3", label: "ODEMA OF BOTH FEET" },
                         { id: "4", label: "SEVERE PALMAR PALLOR" },
                         { id: "5", label: "SICK YOUNG INFANT LESS THAN 2 MONTHS" },
                         { id: "6", label: "LETHARGY/ DROWSINESS/ UNCONSCIOUSNESS" },
                         { id: "7", label: "CONTINUALLY IRRITABLE AND RESTLESS" },
                         { id: "8", label: "ANY RESPIRATORY DISTRESS" },
                         { id: "9", label: "SIGN SUGGESTING SEVERE DEHYDRATION WITH DIARRHOEA" },
                         { id: "10", label: "PERSISTENT VOMITING" },
                         { id: "11", label: "HYPOTHERMIA (<35 DEGREE CENTIGRADE)" },
                         { id: "12", label: "SEVERE ANEMIA" },
                         { id: "13", label: "FEVER (>38.5 DEGREE CENTIGRADE)" },
                         { id: "14", label: "EXTENSIVE SKIN LESIONS, EYE LESIONS, POST-MEASLES STATES" },
                         { id: "15", label: "TUBERCULOSIS" },
                         { id: "16", label: "MALARIA" },
                         { id: "17", label: "OTHERS" },
                       ].map((item) => (
                         <div key={item.id} className="flex items-center space-x-2">
                           <input type="checkbox" id={`complication-${item.id}`} checked={selectedComplications[item.id] || false} onChange={(e) => handleComplicationChange(item.id, e.target.checked)} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                           <Label htmlFor={`complication-${item.id}`} className="text-sm cursor-pointer">{item.label}</Label>
                         </div>
                       ))}
                    </div>
                    {selectedComplications["17"] && (
                      <div className="mt-3">
                        <Label htmlFor="other-complication">Other Complication Details</Label>
                        <Input id="other-complication" value={otherComplication} onChange={(e) => setOtherComplication(e.target.value)} placeholder="Please specify" className="mt-1" />
                      </div>
                    )}
                  </div>
               </div>

               {/* --- Buttons --- */}
               <div className="flex justify-end gap-3 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={() => router.push("/mtc-user/dashboard/child-registration")} className="bg-gray-100">
                    ✕ Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700 min-w-[140px]">
                    {loading ? "Saving..." : "✔ Register Child"}
                  </Button>
                </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}