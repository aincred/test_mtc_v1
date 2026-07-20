
// // // // // "use client";

// // // // // import React, { useState, useEffect } from "react";
// // // // // import { useRouter, useParams } from "next/navigation";
// // // // // import { Clock, Landmark, ClipboardCheck, MapPin, Activity, Stethoscope, Baby, ShieldCheck, ArrowLeft, CheckCircle } from "lucide-react";
// // // // // import toast, { Toaster } from "react-hot-toast";
// // // // // import { clsx, type ClassValue } from "clsx";
// // // // // import { twMerge } from "tailwind-merge";

// // // // // function cn(...inputs: ClassValue[]) {
// // // // //   return twMerge(clsx(inputs));
// // // // // }

// // // // // // --- Reusable UI Components ---
// // // // // const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
// // // // //   ({ className, type, ...props }, ref) => (
// // // // //     <input type={type} className={cn("flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
// // // // //   )
// // // // // );
// // // // // Input.displayName = "Input";

// // // // // const Button = React.forwardRef<any, any>(
// // // // //   ({ className, variant = 'default', href, ...props }, ref) => {
// // // // //     const classes = cn(
// // // // //       "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
// // // // //       variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
// // // // //       variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
// // // // //       variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
// // // // //       className
// // // // //     );
// // // // //     if (href) return <a href={href} className={classes} ref={ref} {...props} />;
// // // // //     return <button ref={ref} className={classes} {...props} />;
// // // // //   }
// // // // // );
// // // // // Button.displayName = "Button";

// // // // // const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// // // // //   <div className={cn("rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm", className)} {...props} />
// // // // // );
// // // // // const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// // // // //   <div className={cn("p-6 md:p-8", className)} {...props} />
// // // // // );
// // // // // const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
// // // // //   ({ className, ...props }, ref) => (
// // // // //     <label ref={ref} className={cn("text-sm font-semibold text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block", className)} {...props} />
// // // // //   )
// // // // // );
// // // // // Label.displayName = "Label";

// // // // // const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
// // // // //   ({ className, ...props }, ref) => (
// // // // //     <textarea className={cn("flex min-h-[80px] w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
// // // // //   )
// // // // // );
// // // // // Textarea.displayName = "Textarea";

// // // // // const Select = ({ name, value, onValueChange, required, children, disabled }: any) => {
// // // // //   const [internalValue, setInternalValue] = useState(value || "");
  
// // // // //   // Sync internal state if external value changes (Crucial for Edit mode resets)
// // // // //   useEffect(() => {
// // // // //     if (value !== undefined) setInternalValue(value);
// // // // //   }, [value]);

// // // // //   const options: {value: string, label: string}[] = [];
// // // // //   let placeholder = "Select";
  
// // // // //   React.Children.forEach(children, child => {
// // // // //     if (child && child.type?.name === 'SelectTrigger') {
// // // // //       React.Children.forEach(child.props.children, triggerChild => {
// // // // //         if (triggerChild && triggerChild.type?.name === 'SelectValue') placeholder = triggerChild.props.placeholder || "Select";
// // // // //       });
// // // // //     }
// // // // //     if (child && child.type?.name === 'SelectContent') {
// // // // //       const contentChildren = Array.isArray(child.props.children) ? child.props.children.flat() : [child.props.children];
// // // // //       React.Children.forEach(contentChildren, itemChild => {
// // // // //         if (itemChild && itemChild.type?.name === 'SelectItem') {
// // // // //           options.push({ value: itemChild.props.value, label: itemChild.props.children });
// // // // //         }
// // // // //       });
// // // // //     }
// // // // //   });

// // // // //   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// // // // //     setInternalValue(e.target.value);
// // // // //     if (onValueChange) onValueChange(e.target.value);
// // // // //   };

// // // // //   return (
// // // // //     <select name={name} value={internalValue} onChange={handleChange} required={required} disabled={disabled} className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100 appearance-none">
// // // // //       <option value="" disabled>{placeholder}</option>
// // // // //       {options.map((opt, i) => (<option key={i} value={opt.value}>{opt.label}</option>))}
// // // // //     </select>
// // // // //   );
// // // // // };
// // // // // const SelectTrigger = ({ children }: any) => <>{children}</>;
// // // // // const SelectValue = ({ placeholder }: any) => <>{placeholder}</>;
// // // // // const SelectContent = ({ children }: any) => <>{children}</>;
// // // // // const SelectItem = ({ children, value }: any) => <>{children}</>;

// // // // // // --- Constants & Math Functions ---
// // // // // const MEDICAL_COMPLICATIONS_LIST = [
// // // // //   "NO COMPLICATION", "PRESENCE OF ANY OF EMERGENCY SIGNS", "VERY WEAK, APATHETIC",
// // // // //   "ODEMA OF BOTH FEET", "SEVERE PALMAR PALLOR", "SICK YOUNG INFANT LESS THAN 2 MONTHS",
// // // // //   "LETHARGY/ DROWSINESS/ UNCONSCIOUSNESS", "CONTINUALLY IRRITABLE AND RESTLESS", "ANY RESPIRATORY DISTRESS",
// // // // //   "SEVERE DEHYDRATION WITH DIARRHOEA", "PERSISTENT VOMITING", "HYPOTHERMIA (<35°C)",
// // // // //   "SEVERE ANEMIA", "FEVER (>38.5°C)", "EXTENSIVE SKIN LESIONS",
// // // // //   "TUBERCULOSIS", "MALARIA", "OTHERS"
// // // // // ];

// // // // // const calculateZScore = (weight: number, height: number, sex: string) => {
// // // // //   if (!weight || !height || height <= 0) return "";
// // // // //   const score = (weight / (height / 100) ** 2) - 15;
// // // // //   if (!isFinite(score) || score > 99 || score < -99) return "Error";
// // // // //   return score.toFixed(2);
// // // // // };

// // // // // // --- Main Application ---
// // // // // export default function EditChildRegistration() {
// // // // //   const router = useRouter();
// // // // //   const params = useParams();
// // // // //   const childId = params.id as string;

// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [mounted, setMounted] = useState(false);
// // // // //   const [childData, setChildData] = useState<any>(null);
  
// // // // //   const [masterData, setMasterData] = useState({
// // // // //     admissionTypes: [], referredBy: [], castes: [], districts: [],
// // // // //     sexes: [], relationships: [], odemas: [], breastFeeding: [], appetiteTests: [],
// // // // //     blocks: [], icdsProjects: [], anganwadis: []
// // // // //   });

// // // // //   const [admissionType, setAdmissionType] = useState("");
// // // // //   const [referredBy, setReferredBy] = useState("");
// // // // //   const [showAshaFields, setShowAshaFields] = useState(false);
// // // // //   const [selectedComplications, setSelectedComplications] = useState<string[]>([]);
  
// // // // //   const [dateOfBirth, setDateOfBirth] = useState<string>("");
// // // // //   const [admissionDate, setAdmissionDate] = useState<string>("");
// // // // //   const [admissionTime, setAdmissionTime] = useState<string>("");

// // // // //   const [sex, setSex] = useState<string>("");
// // // // //   const [admissionWeight, setAdmissionWeight] = useState<string>("");
// // // // //   const [admissionHeight, setAdmissionHeight] = useState<string>("");
// // // // //   const [zScore, setZScore] = useState<string>("");

// // // // //   const [caste, setCaste] = useState("");
// // // // //   const [district, setDistrict] = useState("");
// // // // //   const [block, setBlock] = useState("");
// // // // //   const [icdsProject, setIcdsProject] = useState("");
// // // // //   const [anganwadiCenter, setAnganwadiCenter] = useState("");
// // // // //   const [relationship, setRelationship] = useState("");
  
// // // // //   const [admissionOdema, setAdmissionOdema] = useState("");
// // // // //   const [breastFeeding, setBreastFeeding] = useState("");
// // // // //   const [complementaryFeeding, setComplementaryFeeding] = useState("");
// // // // //   const [appetiteTest, setAppetiteTest] = useState("");

// // // // //   useEffect(() => {
// // // // //     setMounted(true);
    
// // // // //     // Fetch Master Data
// // // // //     const fetchMasterData = async () => {
// // // // //       try {
// // // // //         const response = await fetch('/api/master-data');
// // // // //         if (response.ok) {
// // // // //           const data = await response.json();
// // // // //           setMasterData(data);
// // // // //         }
// // // // //       } catch (error) {
// // // // //         toast.error("Failed to load dropdown options.");
// // // // //       }
// // // // //     };
    
// // // // //     // Fetch Specific Child Data
// // // // //     const fetchChildData = async () => {
// // // // //       try {
// // // // //         const response = await fetch(`/api/child-registration/${childId}`);
// // // // //         if (response.ok) {
// // // // //           const patient = await response.json();
// // // // //           setChildData(patient);
          
// // // // //           setAdmissionType(patient.admissionType || "");
// // // // //           setReferredBy(patient.referredBy || "");
// // // // //           setSex(patient.sex || "");
// // // // //           setRelationship(patient.relationship || "");
// // // // //           setCaste(patient.caste || "");
// // // // //           setDistrict(patient.district || "");
// // // // //           setBlock(patient.block || "");
// // // // //           setIcdsProject(patient.icdsProject || "");
// // // // //           setAnganwadiCenter(patient.anganwadiCenter || "");
          
// // // // //           setDateOfBirth(patient.dateOfBirth || "");
// // // // //           setAdmissionDate(patient.admissionDate || "");
// // // // //           setAdmissionTime(patient.admissionTime || "");
          
// // // // //           setAdmissionWeight(patient.admissionWeight || "");
// // // // //           setAdmissionHeight(patient.admissionHeight || "");
// // // // //           setZScore(patient.zScore || "");
          
// // // // //           setAdmissionOdema(patient.admissionOdema || "");
// // // // //           setBreastFeeding(patient.breastFeeding || "");
// // // // //           setComplementaryFeeding(patient.complementaryFeeding || "");
// // // // //           setAppetiteTest(patient.appetiteTest || "");
          
// // // // //           setSelectedComplications(patient.medicalComplications || []);
// // // // //         } else {
// // // // //           toast.error("Patient not found!");
// // // // //           router.push('/mtc-user/dashboard/child-registration');
// // // // //         }
// // // // //       } catch (error) {
// // // // //         toast.error("Error loading patient data.");
// // // // //       }
// // // // //     };

// // // // //     fetchMasterData();
// // // // //     if (childId) fetchChildData();
// // // // //   }, [childId, router]);

// // // // //   useEffect(() => {
// // // // //     if (admissionWeight && admissionHeight && sex) {
// // // // //       const score = calculateZScore(parseFloat(admissionWeight), parseFloat(admissionHeight), sex);
// // // // //       setZScore(score ? String(score) : "");
// // // // //     } else {
// // // // //       setZScore("");
// // // // //     }
// // // // //   }, [admissionWeight, admissionHeight, sex]);

// // // // //   useEffect(() => {
// // // // //     setShowAshaFields(referredBy === "6");
// // // // //   }, [referredBy]);

// // // // //   const handleComplicationToggle = (comp: string) => {
// // // // //     setSelectedComplications(prev => 
// // // // //       prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp]
// // // // //     );
// // // // //   };

// // // // //   // Filter blocks based on the currently selected district
// // // // //   const filteredBlocks = masterData.blocks.filter((b: any) => 
// // // // //     !district || b.districtId?.toString() === district
// // // // //   );

// // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // //     e.preventDefault();
// // // // //     if (zScore === "Error") {
// // // // //       toast.error("Invalid Anthropometry data. Please check Height/Weight.");
// // // // //       return;
// // // // //     }
// // // // //     if (selectedComplications.length === 0) {
// // // // //       toast.error("Please select at least one medical complication status.");
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);
// // // // //     const formData = new FormData(e.currentTarget as HTMLFormElement);
    
// // // // //     const payload = {
// // // // //       admissionType, referredBy,
// // // // //       referredByName: formData.get('referredByName'), referredByMobile: formData.get('referredByMobile'),
// // // // //       childName: formData.get('childName'), parentName: formData.get('parentName'),
// // // // //       relationship, mobileNumber: formData.get('mobileNumber'),
// // // // //       bplNumber: formData.get('bplNumber'), dateOfBirth, sex,
// // // // //       address: formData.get('address'), caste, district, block, // Uses controlled state
// // // // //       icdsProject, anganwadiCenter, village: formData.get('village'),
// // // // //       aadhaarNumber: formData.get('aadhaarNumber'), bankName: formData.get('bankName'),
// // // // //       accountHolderName: formData.get('accountHolderName'), accountNumber: formData.get('accountNumber'),
// // // // //       ifscCode: formData.get('ifscCode'), admissionDate, admissionTime,
// // // // //       admissionWeight, admissionHeight, admissionMuac: formData.get('admissionMuac'),
// // // // //       zScore: zScore, admissionOdema, breastFeeding, complementaryFeeding, appetiteTest,
// // // // //       medicalComplications: selectedComplications
// // // // //     };

// // // // //     try {
// // // // //       const response = await fetch(`/api/child-registration/${childId}`, {
// // // // //         method: 'PUT',
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //         body: JSON.stringify(payload)
// // // // //       });
      
// // // // //       if (!response.ok) throw new Error('Failed to update registration');
      
// // // // //       toast.success("Patient updated successfully!");
// // // // //       setTimeout(() => router.push('/mtc-user/dashboard/child-registration'), 1000);
      
// // // // //     } catch (error) {
// // // // //       toast.error("An error occurred while updating.");
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   if (!mounted || !childData) {
// // // // //     return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// // // // //       <div className="animate-pulse text-indigo-600 font-medium">Loading database record...</div>
// // // // //     </div>;
// // // // //   }

// // // // //   const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
// // // // //     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
// // // // //       <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Icon size={20} strokeWidth={2.5} /></div>
// // // // //       <h2 className="text-lg font-bold text-slate-800">{title}</h2>
// // // // //     </div>
// // // // //   );

// // // // //   return (
// // // // //     <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans pb-28">
// // // // //       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
      
// // // // //       <div className="max-w-6xl mx-auto">
// // // // //         <div className="mb-2 flex items-center">
// // // // //           <Button variant="ghost" onClick={() => router.push('/mtc-user/dashboard/child-registration')} type="button" className="pl-0 text-slate-500 hover:text-indigo-600 hover:bg-transparent">
// // // // //             <ArrowLeft className="w-5 h-5 mr-2" /> Back
// // // // //           </Button>
// // // // //         </div>

// // // // //         <div className="mb-8 text-center md:text-left md:flex md:items-end md:justify-between">
// // // // //           <div>
// // // // //             <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Edit Child Record</h1>
// // // // //             <p className="mt-2 text-sm text-slate-500">Update the information directly in the database.</p>
// // // // //           </div>
// // // // //           <div className="mt-4 md:mt-0 px-5 py-3 bg-white rounded-xl shadow-sm border border-slate-200 inline-block text-center md:text-right">
// // // // //             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">SAM Number</span>
// // // // //             <span className="text-lg font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md">{childData.samNumber}</span>
// // // // //           </div>
// // // // //         </div>

// // // // //         <form onSubmit={handleSubmit} className="relative">
// // // // //           <div className="space-y-6">

// // // // //             {/* Admission Info */}
// // // // //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // // //               <CardContent className="p-6 sm:p-8">
// // // // //                 <SectionTitle icon={ClipboardCheck} title="Admission Details" />
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // //                   <div>
// // // // //                     <Label>Admission Type <span className="text-red-500">*</span></Label>
// // // // //                     <Select name="admissionType" value={admissionType} onValueChange={setAdmissionType} required>
// // // // //                       <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
// // // // //                       <SelectContent>
// // // // //                         {masterData.admissionTypes.map((type: any) => (<SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>))}
// // // // //                       </SelectContent>
// // // // //                     </Select>
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>Referred By</Label>
// // // // //                     <Select name="referredBy" value={referredBy} onValueChange={setReferredBy}>
// // // // //                       <SelectTrigger><SelectValue placeholder="Select Origin" /></SelectTrigger>
// // // // //                       <SelectContent>
// // // // //                         {masterData.referredBy.map((ref: any) => (<SelectItem key={ref.id} value={ref.id.toString()}>{ref.name}</SelectItem>))}
// // // // //                       </SelectContent>
// // // // //                     </Select>
// // // // //                   </div>
// // // // //                   {showAshaFields && (
// // // // //                     <>
// // // // //                       <div>
// // // // //                         <Label>Name of Sahiya/Asha</Label>
// // // // //                         <Input name="referredByName" defaultValue={childData.referredByName || childData.parentName} placeholder="Enter Name" />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                         <Label>Sahiya/Asha Mobile</Label>
// // // // //                         <Input name="referredByMobile" defaultValue={childData.referredByMobile || childData.mobileNumber} type="tel" maxLength={10} pattern="[0-9]{10}" />
// // // // //                       </div>
// // // // //                     </>
// // // // //                   )}
// // // // //                   <div>
// // // // //                     <Label>Admission Date <span className="text-red-500">*</span></Label>
// // // // //                     <Input type="date" name="admissionDate" value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} required />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>Admission Time <span className="text-red-500">*</span></Label>
// // // // //                     <div className="relative">
// // // // //                       <Input name="admissionTime" type="time" value={admissionTime} onChange={(e) => setAdmissionTime(e.target.value)} required className="pr-10" />
// // // // //                       <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </CardContent>
// // // // //             </Card>

// // // // //             {/* Personal Info */}
// // // // //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // // //               <CardContent className="p-6 sm:p-8">
// // // // //                 <SectionTitle icon={Baby} title="Child & Guardian Information" />
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // //                   <div className="lg:col-span-2">
// // // // //                     <Label>Child Full Name <span className="text-red-500">*</span></Label>
// // // // //                     <Input name="childName" defaultValue={childData.childName} required />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>Date of Birth <span className="text-red-500">*</span></Label>
// // // // //                     <Input type="date" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>Sex <span className="text-red-500">*</span></Label>
// // // // //                     <Select name="sex" value={sex} onValueChange={setSex} required>
// // // // //                       <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
// // // // //                       <SelectContent>
// // // // //                         {masterData.sexes.map((s: any) => (<SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>))}
// // // // //                       </SelectContent>
// // // // //                     </Select>
// // // // //                   </div>
// // // // //                   <div className="lg:col-span-2">
// // // // //                     <Label>Name of Father/Mother/Caretaker <span className="text-red-500">*</span></Label>
// // // // //                     <Input name="parentName" defaultValue={childData.parentName} required />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>Relationship <span className="text-red-500">*</span></Label>
// // // // //                     <Select name="relationship" value={relationship} onValueChange={setRelationship} required>
// // // // //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // // // //                       <SelectContent>
// // // // //                         {masterData.relationships.map((rel: any) => (<SelectItem key={rel.id} value={rel.id.toString()}>{rel.name}</SelectItem>))}
// // // // //                       </SelectContent>
// // // // //                     </Select>
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>Mobile Number <span className="text-red-500">*</span></Label>
// // // // //                     <Input name="mobileNumber" defaultValue={childData.mobileNumber} type="tel" maxLength={10} pattern="[0-9]{10}" required />
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </CardContent>
// // // // //             </Card>

// // // // //             {/* Financial Details */}
// // // // //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // // //               <CardContent className="p-6 sm:p-8">
// // // // //                 <SectionTitle icon={ShieldCheck} title="Identity & Financial Details" />
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // //                   <div>
// // // // //                     <Label>Parent Aadhaar Number</Label>
// // // // //                     <Input name="aadhaarNumber" defaultValue={childData.aadhaarNumber} maxLength={12} pattern="[0-9]{12}" />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>BPL Number</Label>
// // // // //                     <Input name="bplNumber" defaultValue={childData.bplNumber} />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>Caste <span className="text-red-500">*</span></Label>
// // // // //                     <Select name="caste" value={caste} onValueChange={setCaste} required>
// // // // //                       <SelectTrigger><SelectValue placeholder="Select Caste" /></SelectTrigger>
// // // // //                       <SelectContent>
// // // // //                         {masterData.castes.map((caste: any) => (<SelectItem key={caste.id} value={caste.id.toString()}>{caste.name}</SelectItem>))}
// // // // //                       </SelectContent>
// // // // //                     </Select>
// // // // //                   </div>
// // // // //                   <div className="lg:col-span-4 mt-2">
// // // // //                     <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
// // // // //                       <Landmark className="w-4 h-4 text-indigo-500" /> Bank Account Details
// // // // //                     </h3>
// // // // //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
// // // // //                       <div><Label>Bank Name</Label><Input name="bankName" defaultValue={childData.bankName} className="bg-white" /></div>
// // // // //                       <div><Label>Account Holder</Label><Input name="accountHolderName" defaultValue={childData.accountHolderName} className="bg-white" /></div>
// // // // //                       <div><Label>Account Number</Label><Input name="accountNumber" defaultValue={childData.accountNumber} className="bg-white" /></div>
// // // // //                       <div><Label>IFSC Code</Label><Input name="ifscCode" defaultValue={childData.ifscCode} className="bg-white" /></div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </CardContent>
// // // // //             </Card>

// // // // //             {/* DEPENDENT LOCATION DETAILS */}
// // // // //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // // //               <CardContent className="p-6 sm:p-8">
// // // // //                 <SectionTitle icon={MapPin} title="Location Details" />
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //                   <div className="lg:col-span-3">
// // // // //                     <Label>Full Address <span className="text-red-500">*</span></Label>
// // // // //                     <Textarea name="address" defaultValue={childData.address} rows={2} required />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>District <span className="text-red-500">*</span></Label>
// // // // //                     <Select 
// // // // //                       name="district" 
// // // // //                       value={district} 
// // // // //                       onValueChange={(val: string) => {
// // // // //                         setDistrict(val);
// // // // //                         setBlock(""); // Clear the block whenever a new district is selected
// // // // //                       }} 
// // // // //                       required
// // // // //                     >
// // // // //                       <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
// // // // //                       <SelectContent>
// // // // //                         {masterData.districts.map((dist: any) => (<SelectItem key={dist.id} value={dist.id.toString()}>{dist.name}</SelectItem>))}
// // // // //                       </SelectContent>
// // // // //                     </Select>
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>Block</Label>
// // // // //                     <Select 
// // // // //                       name="block" 
// // // // //                       value={block} 
// // // // //                       onValueChange={setBlock}
// // // // //                       disabled={!district} // Disable if no district is selected
// // // // //                     >
// // // // //                       <SelectTrigger>
// // // // //                         <SelectValue placeholder={district ? "Select Block" : "Select District First"} />
// // // // //                       </SelectTrigger>
// // // // //                       <SelectContent>
// // // // //                         {filteredBlocks.map((b: any) => (<SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>))}
// // // // //                       </SelectContent>
// // // // //                     </Select>
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>Village</Label>
// // // // //                     <Input name="village" defaultValue={childData.village} />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>ICDS Project</Label>
// // // // //                     <Select name="icdsProject" value={icdsProject} onValueChange={setIcdsProject}>
// // // // //                       <SelectTrigger><SelectValue placeholder="Select Project" /></SelectTrigger>
// // // // //                       <SelectContent>
// // // // //                         {masterData.icdsProjects.map((project: any) => (<SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>))}
// // // // //                       </SelectContent>
// // // // //                     </Select>
// // // // //                   </div>
// // // // //                   <div className="lg:col-span-2">
// // // // //                     <Label>Anganwadi Center</Label>
// // // // //                     <Select name="anganwadiCenter" value={anganwadiCenter} onValueChange={setAnganwadiCenter}>
// // // // //                       <SelectTrigger><SelectValue placeholder="Select Center" /></SelectTrigger>
// // // // //                       <SelectContent>
// // // // //                         {masterData.anganwadis.map((center: any) => (<SelectItem key={center.id} value={center.id.toString()}>{center.name}</SelectItem>))}
// // // // //                       </SelectContent>
// // // // //                     </Select>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </CardContent>
// // // // //             </Card>

// // // // //             {/* Anthropometry Details */}
// // // // //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // // //               <CardContent className="p-6 sm:p-8">
// // // // //                 <SectionTitle icon={Activity} title="Anthropometry & Feeding" />
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // //                   <div>
// // // // //                     <Label>Admission Weight (kg) <span className="text-red-500">*</span></Label>
// // // // //                     <Input name="admissionWeight" type="number" step="0.1" value={admissionWeight} onChange={(e) => setAdmissionWeight(e.target.value)} required />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>Length/Height (cm) <span className="text-red-500">*</span></Label>
// // // // //                     <Input name="admissionHeight" type="number" step="0.1" value={admissionHeight} onChange={(e) => setAdmissionHeight(e.target.value)} required />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>MUAC (cm) <span className="text-red-500">*</span></Label>
// // // // //                     <Input name="admissionMuac" type="number" step="0.1" defaultValue={childData.admissionMuac} required />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>Z-Score (SD)</Label>
// // // // //                     <Input name="zScore" readOnly value={zScore} className={cn("font-semibold focus:ring-0 cursor-not-allowed", zScore === "Error" ? "bg-red-50 text-red-600" : "bg-slate-100 text-indigo-700")} />
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>Admission Odema <span className="text-red-500">*</span></Label>
// // // // //                     <Select name="admissionOdema" value={admissionOdema} onValueChange={setAdmissionOdema} required>
// // // // //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // // // //                       <SelectContent>
// // // // //                         {masterData.odemas.map((odema: any) => (<SelectItem key={odema.id} value={odema.id.toString()}>{odema.name}</SelectItem>))}
// // // // //                       </SelectContent>
// // // // //                     </Select>
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>Breast Feeding <span className="text-red-500">*</span></Label>
// // // // //                     <Select name="breastFeeding" value={breastFeeding} onValueChange={setBreastFeeding} required>
// // // // //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // // // //                       <SelectContent>
// // // // //                         {masterData.breastFeeding.map((bf: any) => (<SelectItem key={bf.id} value={bf.id.toString()}>{bf.name}</SelectItem>))}
// // // // //                       </SelectContent>
// // // // //                     </Select>
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>Complementary Feeding <span className="text-red-500">*</span></Label>
// // // // //                     <Select name="complementaryFeeding" value={complementaryFeeding} onValueChange={setComplementaryFeeding} required>
// // // // //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // // // //                       <SelectContent>
// // // // //                         <SelectItem value="1">Yes</SelectItem><SelectItem value="2">No</SelectItem>
// // // // //                       </SelectContent>
// // // // //                     </Select>
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <Label>Appetite Test <span className="text-red-500">*</span></Label>
// // // // //                     <Select name="appetiteTest" value={appetiteTest} onValueChange={setAppetiteTest} required>
// // // // //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // // // //                       <SelectContent>
// // // // //                         {masterData.appetiteTests.map((at: any) => (<SelectItem key={at.id} value={at.id.toString()}>{at.name}</SelectItem>))}
// // // // //                       </SelectContent>
// // // // //                     </Select>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </CardContent>
// // // // //             </Card>

// // // // //             <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // // //               <CardContent className="p-6 sm:p-8">
// // // // //                 <SectionTitle icon={Stethoscope} title="Medical Complications" />
// // // // //                 <p className="text-sm font-semibold text-slate-700 mb-4 block">Select all present complications: <span className="text-red-500">*</span></p>
                
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 bg-slate-50/50 p-6 rounded-xl border border-slate-200">
// // // // //                   {MEDICAL_COMPLICATIONS_LIST.map((comp) => (
// // // // //                     <label key={comp} className="flex items-start space-x-3 cursor-pointer group">
// // // // //                       <div className="flex items-center h-5">
// // // // //                         <input
// // // // //                           type="checkbox"
// // // // //                           className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/30 transition duration-150 ease-in-out cursor-pointer"
// // // // //                           checked={selectedComplications.includes(comp)}
// // // // //                           onChange={() => handleComplicationToggle(comp)}
// // // // //                         />
// // // // //                       </div>
// // // // //                       <span className="text-sm font-medium text-slate-600 leading-tight group-hover:text-slate-900 transition-colors">
// // // // //                         {comp}
// // // // //                       </span>
// // // // //                     </label>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </CardContent>
// // // // //             </Card>

// // // // //           </div>

// // // // //           <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 p-4 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 flex justify-end gap-4 sm:justify-center md:justify-end md:px-12">
// // // // //             <Button variant="ghost" onClick={() => router.push('/mtc-user/dashboard/child-registration')} type="button">Cancel</Button>
// // // // //             <Button type="submit" disabled={loading || zScore === "Error"} className="min-w-40">
// // // // //               {loading ? "Saving to Database..." : "Update Patient"}
// // // // //             </Button>
// // // // //           </div>
// // // // //         </form>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import React, { useState, useEffect } from "react";
// // // // import { useRouter, useParams } from "next/navigation";
// // // // import { Clock, Landmark, ClipboardCheck, MapPin, Activity, Stethoscope, Baby, ShieldCheck, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
// // // // import toast, { Toaster } from "react-hot-toast";
// // // // import { clsx, type ClassValue } from "clsx";
// // // // import { twMerge } from "tailwind-merge";

// // // // function cn(...inputs: ClassValue[]) {
// // // //   return twMerge(clsx(inputs));
// // // // }

// // // // // --- Reusable UI Components ---
// // // // const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
// // // //   ({ className, type, ...props }, ref) => (
// // // //     <input type={type} className={cn("flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
// // // //   )
// // // // );
// // // // Input.displayName = "Input";

// // // // const Button = React.forwardRef<any, any>(
// // // //   ({ className, variant = 'default', href, ...props }, ref) => {
// // // //     const classes = cn(
// // // //       "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
// // // //       variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
// // // //       variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
// // // //       variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
// // // //       className
// // // //     );
// // // //     if (href) return <a href={href} className={classes} ref={ref} {...props} />;
// // // //     return <button ref={ref} className={classes} {...props} />;
// // // //   }
// // // // );
// // // // Button.displayName = "Button";

// // // // const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// // // //   <div className={cn("rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm", className)} {...props} />
// // // // );
// // // // const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// // // //   <div className={cn("p-6 md:p-8", className)} {...props} />
// // // // );
// // // // const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
// // // //   ({ className, ...props }, ref) => (
// // // //     <label ref={ref} className={cn("text-sm font-semibold text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block", className)} {...props} />
// // // //   )
// // // // );
// // // // Label.displayName = "Label";

// // // // const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
// // // //   ({ className, ...props }, ref) => (
// // // //     <textarea className={cn("flex min-h-[80px] w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
// // // //   )
// // // // );
// // // // Textarea.displayName = "Textarea";

// // // // const Select = ({ name, value, onValueChange, required, children, disabled }: any) => {
// // // //   const [internalValue, setInternalValue] = useState(value || "");
  
// // // //   // Sync internal state if external value changes (Crucial for Edit mode resets)
// // // //   useEffect(() => {
// // // //     if (value !== undefined) setInternalValue(value);
// // // //   }, [value]);

// // // //   const options: {value: string, label: string}[] = [];
// // // //   let placeholder = "Select";
  
// // // //   React.Children.forEach(children, child => {
// // // //     if (child && child.type?.name === 'SelectTrigger') {
// // // //       React.Children.forEach(child.props.children, triggerChild => {
// // // //         if (triggerChild && triggerChild.type?.name === 'SelectValue') placeholder = triggerChild.props.placeholder || "Select";
// // // //       });
// // // //     }
// // // //     if (child && child.type?.name === 'SelectContent') {
// // // //       const contentChildren = Array.isArray(child.props.children) ? child.props.children.flat() : [child.props.children];
// // // //       React.Children.forEach(contentChildren, itemChild => {
// // // //         if (itemChild && itemChild.type?.name === 'SelectItem') {
// // // //           options.push({ value: itemChild.props.value, label: itemChild.props.children });
// // // //         }
// // // //       });
// // // //     }
// // // //   });

// // // //   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// // // //     setInternalValue(e.target.value);
// // // //     if (onValueChange) onValueChange(e.target.value);
// // // //   };

// // // //   return (
// // // //     <select name={name} value={internalValue} onChange={handleChange} required={required} disabled={disabled} className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100 appearance-none">
// // // //       <option value="" disabled>{placeholder}</option>
// // // //       {options.map((opt, i) => (<option key={i} value={opt.value}>{opt.label}</option>))}
// // // //     </select>
// // // //   );
// // // // };
// // // // const SelectTrigger = ({ children }: any) => <>{children}</>;
// // // // const SelectValue = ({ placeholder }: any) => <>{placeholder}</>;
// // // // const SelectContent = ({ children }: any) => <>{children}</>;
// // // // const SelectItem = ({ children, value }: any) => <>{children}</>;

// // // // // --- Constants & Math Functions ---
// // // // const MEDICAL_COMPLICATIONS_LIST = [
// // // //   "NO COMPLICATION", "PRESENCE OF ANY OF EMERGENCY SIGNS", "VERY WEAK, APATHETIC",
// // // //   "ODEMA OF BOTH FEET", "SEVERE PALMAR PALLOR", "SICK YOUNG INFANT LESS THAN 2 MONTHS",
// // // //   "LETHARGY/ DROWSINESS/ UNCONSCIOUSNESS", "CONTINUALLY IRRITABLE AND RESTLESS", "ANY RESPIRATORY DISTRESS",
// // // //   "SEVERE DEHYDRATION WITH DIARRHOEA", "PERSISTENT VOMITING", "HYPOTHERMIA (<35°C)",
// // // //   "SEVERE ANEMIA", "FEVER (>38.5°C)", "EXTENSIVE SKIN LESIONS",
// // // //   "TUBERCULOSIS", "MALARIA", "OTHERS"
// // // // ];

// // // // const calculateZScore = (weight: number, height: number, sex: string) => {
// // // //   if (!weight || !height || height <= 0) return "";
// // // //   const score = (weight / (height / 100) ** 2) - 15;
// // // //   if (!isFinite(score) || score > 99 || score < -99) return "Error";
// // // //   return score.toFixed(2);
// // // // };

// // // // // --- Main Application ---
// // // // export default function EditChildRegistration() {
// // // //   const router = useRouter();
// // // //   const params = useParams();
// // // //   const childId = params.id as string;

// // // //   const [loading, setLoading] = useState(false);
// // // //   const [mounted, setMounted] = useState(false);
// // // //   const [childData, setChildData] = useState<any>(null);
  
// // // //   const [masterData, setMasterData] = useState({
// // // //     admissionTypes: [], referredBy: [], castes: [], districts: [],
// // // //     sexes: [], relationships: [], odemas: [], breastFeeding: [], appetiteTests: [],
// // // //     blocks: [], icdsProjects: [], anganwadis: []
// // // //   });

// // // //   const [admissionType, setAdmissionType] = useState("");
// // // //   const [referredBy, setReferredBy] = useState("");
// // // //   const [showAshaFields, setShowAshaFields] = useState(false);
// // // //   const [selectedComplications, setSelectedComplications] = useState<string[]>([]);
  
// // // //   const [dateOfBirth, setDateOfBirth] = useState<string>("");
// // // //   const [admissionDate, setAdmissionDate] = useState<string>("");
// // // //   const [admissionTime, setAdmissionTime] = useState<string>("");

// // // //   const [sex, setSex] = useState<string>("");
// // // //   const [admissionWeight, setAdmissionWeight] = useState<string>("");
// // // //   const [admissionHeight, setAdmissionHeight] = useState<string>("");
// // // //   const [zScore, setZScore] = useState<string>("");

// // // //   const [caste, setCaste] = useState("");
// // // //   const [district, setDistrict] = useState("");
// // // //   const [block, setBlock] = useState("");
// // // //   const [icdsProject, setIcdsProject] = useState("");
// // // //   const [anganwadiCenter, setAnganwadiCenter] = useState("");
// // // //   const [relationship, setRelationship] = useState("");
  
// // // //   const [admissionOdema, setAdmissionOdema] = useState("");
// // // //   const [breastFeeding, setBreastFeeding] = useState("");
// // // //   const [complementaryFeeding, setComplementaryFeeding] = useState("");
// // // //   const [appetiteTest, setAppetiteTest] = useState("");

// // // //   useEffect(() => {
// // // //     setMounted(true);
    
// // // //     // Fetch Master Data
// // // //     const fetchMasterData = async () => {
// // // //       try {
// // // //         const response = await fetch('/api/master-data');
// // // //         if (response.ok) {
// // // //           const data = await response.json();
// // // //           setMasterData(data);
// // // //         }
// // // //       } catch (error) {
// // // //         toast.error("Failed to load dropdown options.");
// // // //       }
// // // //     };
    
// // // //     // Fetch Specific Child Data
// // // //     const fetchChildData = async () => {
// // // //       try {
// // // //         const response = await fetch(`/api/child-registration/${childId}`);
// // // //         if (response.ok) {
// // // //           const patient = await response.json();
// // // //           setChildData(patient);
          
// // // //           setAdmissionType(patient.admissionType || "");
// // // //           setReferredBy(patient.referredBy || "");
// // // //           setSex(patient.sex || "");
// // // //           setRelationship(patient.relationship || "");
// // // //           setCaste(patient.caste || "");
// // // //           setDistrict(patient.district || "");
// // // //           setBlock(patient.block || "");
// // // //           setIcdsProject(patient.icdsProject || "");
// // // //           setAnganwadiCenter(patient.anganwadiCenter || "");
          
// // // //           setDateOfBirth(patient.dateOfBirth || "");
// // // //           setAdmissionDate(patient.admissionDate || "");
// // // //           setAdmissionTime(patient.admissionTime || "");
          
// // // //           setAdmissionWeight(patient.admissionWeight || "");
// // // //           setAdmissionHeight(patient.admissionHeight || "");
// // // //           setZScore(patient.zScore || "");
          
// // // //           setAdmissionOdema(patient.admissionOdema || "");
// // // //           setBreastFeeding(patient.breastFeeding || "");
// // // //           setComplementaryFeeding(patient.complementaryFeeding || "");
// // // //           setAppetiteTest(patient.appetiteTest || "");
          
// // // //           setSelectedComplications(patient.medicalComplications || []);
// // // //         } else {
// // // //           toast.error("Patient not found!");
// // // //           router.push('/mtc-user/dashboard/child-registration');
// // // //         }
// // // //       } catch (error) {
// // // //         toast.error("Error loading patient data.");
// // // //       }
// // // //     };

// // // //     fetchMasterData();
// // // //     if (childId) fetchChildData();
// // // //   }, [childId, router]);

// // // //   useEffect(() => {
// // // //     if (admissionWeight && admissionHeight && sex) {
// // // //       const score = calculateZScore(parseFloat(admissionWeight), parseFloat(admissionHeight), sex);
// // // //       setZScore(score ? String(score) : "");
// // // //     } else {
// // // //       setZScore("");
// // // //     }
// // // //   }, [admissionWeight, admissionHeight, sex]);

// // // //   useEffect(() => {
// // // //     setShowAshaFields(referredBy === "6");
// // // //   }, [referredBy]);

// // // //   const handleComplicationToggle = (comp: string) => {
// // // //     setSelectedComplications(prev => 
// // // //       prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp]
// // // //     );
// // // //   };

// // // //   // Filter blocks based on the currently selected district
// // // //   const filteredBlocks = masterData.blocks.filter((b: any) => 
// // // //     !district || b.districtId?.toString() === district
// // // //   );

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     if (zScore === "Error") {
// // // //       toast.error("Invalid Anthropometry data. Please check Height/Weight.");
// // // //       return;
// // // //     }
// // // //     if (selectedComplications.length === 0) {
// // // //       toast.error("Please select at least one medical complication status.");
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     const formData = new FormData(e.currentTarget as HTMLFormElement);
    
// // // //     const payload = {
// // // //       admissionType, referredBy,
// // // //       referredByName: formData.get('referredByName'), referredByMobile: formData.get('referredByMobile'),
// // // //       childName: formData.get('childName'), parentName: formData.get('parentName'),
// // // //       relationship, mobileNumber: formData.get('mobileNumber'),
// // // //       bplNumber: formData.get('bplNumber'), dateOfBirth, sex,
// // // //       address: formData.get('address'), caste, district, block, // Uses controlled state
// // // //       icdsProject, anganwadiCenter, village: formData.get('village'),
// // // //       aadhaarNumber: formData.get('aadhaarNumber'), bankName: formData.get('bankName'),
// // // //       accountHolderName: formData.get('accountHolderName'), accountNumber: formData.get('accountNumber'),
// // // //       ifscCode: formData.get('ifscCode'), admissionDate, admissionTime,
// // // //       admissionWeight, admissionHeight, admissionMuac: formData.get('admissionMuac'),
// // // //       zScore: zScore, admissionOdema, breastFeeding, complementaryFeeding, appetiteTest,
// // // //       medicalComplications: selectedComplications
// // // //     };

// // // //     try {
// // // //       const response = await fetch(`/api/child-registration/${childId}`, {
// // // //         method: 'PUT',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify(payload)
// // // //       });
      
// // // //       if (!response.ok) throw new Error('Failed to update registration');
      
// // // //       toast.success("Patient updated successfully!");
// // // //       setTimeout(() => router.push('/mtc-user/dashboard/child-registration'), 1000);
      
// // // //     } catch (error) {
// // // //       toast.error("An error occurred while updating.");
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   if (!mounted || !childData) {
// // // //     return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// // // //       <Loader2 className="animate-spin text-indigo-600 w-8 h-8" />
// // // //     </div>;
// // // //   }

// // // //   const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
// // // //     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
// // // //       <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Icon size={20} strokeWidth={2.5} /></div>
// // // //       <h2 className="text-lg font-bold text-slate-800">{title}</h2>
// // // //     </div>
// // // //   );

// // // //   return (
// // // //     <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans pb-28">
// // // //       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
      
// // // //       <div className="max-w-6xl mx-auto">
// // // //         <div className="mb-2 flex items-center">
// // // //           <Button variant="ghost" onClick={() => router.push('/mtc-user/dashboard/child-registration')} type="button" className="pl-0 text-slate-500 hover:text-indigo-600 hover:bg-transparent">
// // // //             <ArrowLeft className="w-5 h-5 mr-2" /> Back
// // // //           </Button>
// // // //         </div>

// // // //         <div className="mb-8 text-center md:text-left md:flex md:items-end md:justify-between">
// // // //           <div>
// // // //             <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Edit Child Record</h1>
// // // //             <p className="mt-2 text-sm text-slate-500">Update the information directly in the database.</p>
// // // //           </div>
// // // //           <div className="mt-4 md:mt-0 px-5 py-3 bg-white rounded-xl shadow-sm border border-slate-200 inline-block text-center md:text-right">
// // // //             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">SAM Number</span>
// // // //             <span className="text-lg font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md">{childData.samNumber}</span>
// // // //           </div>
// // // //         </div>

// // // //         <form onSubmit={handleSubmit} className="relative">
// // // //           <div className="space-y-6">

// // // //             {/* Admission Info */}
// // // //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // //               <CardContent className="p-6 sm:p-8">
// // // //                 <SectionTitle icon={ClipboardCheck} title="Admission Details" />
// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //                   <div>
// // // //                     <Label>Admission Type <span className="text-red-500">*</span></Label>
// // // //                     <Select name="admissionType" value={admissionType} onValueChange={setAdmissionType} required>
// // // //                       <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
// // // //                       <SelectContent>
// // // //                         {masterData.admissionTypes.map((type: any) => (<SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>))}
// // // //                       </SelectContent>
// // // //                     </Select>
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>Referred By</Label>
// // // //                     <Select name="referredBy" value={referredBy} onValueChange={setReferredBy}>
// // // //                       <SelectTrigger><SelectValue placeholder="Select Origin" /></SelectTrigger>
// // // //                       <SelectContent>
// // // //                         {masterData.referredBy.map((ref: any) => (<SelectItem key={ref.id} value={ref.id.toString()}>{ref.name}</SelectItem>))}
// // // //                       </SelectContent>
// // // //                     </Select>
// // // //                   </div>
// // // //                   {showAshaFields && (
// // // //                     <>
// // // //                       <div>
// // // //                         <Label>Name of Sahiya/Asha</Label>
// // // //                         <Input name="referredByName" defaultValue={childData.referredByName || childData.parentName} placeholder="Enter Name" />
// // // //                       </div>
// // // //                       <div>
// // // //                         <Label>Sahiya/Asha Mobile</Label>
// // // //                         <Input name="referredByMobile" defaultValue={childData.referredByMobile || childData.mobileNumber} type="tel" maxLength={10} pattern="[0-9]{10}" />
// // // //                       </div>
// // // //                     </>
// // // //                   )}
// // // //                   <div>
// // // //                     <Label>Admission Date <span className="text-red-500">*</span></Label>
// // // //                     <Input type="date" name="admissionDate" value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} required />
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>Admission Time <span className="text-red-500">*</span></Label>
// // // //                     <div className="relative">
// // // //                       <Input name="admissionTime" type="time" value={admissionTime} onChange={(e) => setAdmissionTime(e.target.value)} required className="pr-10" />
// // // //                       <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </CardContent>
// // // //             </Card>

// // // //             {/* Personal Info */}
// // // //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // //               <CardContent className="p-6 sm:p-8">
// // // //                 <SectionTitle icon={Baby} title="Child & Guardian Information" />
// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //                   <div className="lg:col-span-2">
// // // //                     <Label>Child Full Name <span className="text-red-500">*</span></Label>
// // // //                     <Input name="childName" defaultValue={childData.childName} required />
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>Date of Birth <span className="text-red-500">*</span></Label>
// // // //                     <Input type="date" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>Sex <span className="text-red-500">*</span></Label>
// // // //                     <Select name="sex" value={sex} onValueChange={setSex} required>
// // // //                       <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
// // // //                       <SelectContent>
// // // //                         {masterData.sexes.map((s: any) => (<SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>))}
// // // //                       </SelectContent>
// // // //                     </Select>
// // // //                   </div>
// // // //                   <div className="lg:col-span-2">
// // // //                     <Label>Name of Father/Mother/Caretaker <span className="text-red-500">*</span></Label>
// // // //                     <Input name="parentName" defaultValue={childData.parentName} required />
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>Relationship <span className="text-red-500">*</span></Label>
// // // //                     <Select name="relationship" value={relationship} onValueChange={setRelationship} required>
// // // //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // // //                       <SelectContent>
// // // //                         {masterData.relationships.map((rel: any) => (<SelectItem key={rel.id} value={rel.id.toString()}>{rel.name}</SelectItem>))}
// // // //                       </SelectContent>
// // // //                     </Select>
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>Mobile Number <span className="text-red-500">*</span></Label>
// // // //                     <Input name="mobileNumber" defaultValue={childData.mobileNumber} type="tel" maxLength={10} pattern="[0-9]{10}" required />
// // // //                   </div>
// // // //                 </div>
// // // //               </CardContent>
// // // //             </Card>

// // // //             {/* Financial Details */}
// // // //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // //               <CardContent className="p-6 sm:p-8">
// // // //                 <SectionTitle icon={ShieldCheck} title="Identity & Financial Details" />
// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //                   <div>
// // // //                     <Label>Parent Aadhaar Number</Label>
// // // //                     <Input name="aadhaarNumber" defaultValue={childData.aadhaarNumber} maxLength={12} pattern="[0-9]{12}" />
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>BPL Number</Label>
// // // //                     <Input name="bplNumber" defaultValue={childData.bplNumber} />
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>Caste <span className="text-red-500">*</span></Label>
// // // //                     <Select name="caste" value={caste} onValueChange={setCaste} required>
// // // //                       <SelectTrigger><SelectValue placeholder="Select Caste" /></SelectTrigger>
// // // //                       <SelectContent>
// // // //                         {masterData.castes.map((caste: any) => (<SelectItem key={caste.id} value={caste.id.toString()}>{caste.name}</SelectItem>))}
// // // //                       </SelectContent>
// // // //                     </Select>
// // // //                   </div>
// // // //                   <div className="lg:col-span-4 mt-2">
// // // //                     <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
// // // //                       <Landmark className="w-4 h-4 text-indigo-500" /> Bank Account Details
// // // //                     </h3>
// // // //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
// // // //                       <div><Label>Bank Name</Label><Input name="bankName" defaultValue={childData.bankName} className="bg-white" /></div>
// // // //                       <div><Label>Account Holder</Label><Input name="accountHolderName" defaultValue={childData.accountHolderName} className="bg-white" /></div>
// // // //                       <div><Label>Account Number</Label><Input name="accountNumber" defaultValue={childData.accountNumber} className="bg-white" /></div>
// // // //                       <div><Label>IFSC Code</Label><Input name="ifscCode" defaultValue={childData.ifscCode} className="bg-white" /></div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </CardContent>
// // // //             </Card>

// // // //             {/* DEPENDENT LOCATION DETAILS */}
// // // //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // //               <CardContent className="p-6 sm:p-8">
// // // //                 <SectionTitle icon={MapPin} title="Location Details" />
// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //                   <div className="lg:col-span-3">
// // // //                     <Label>Full Address <span className="text-red-500">*</span></Label>
// // // //                     <Textarea name="address" defaultValue={childData.address} rows={2} required />
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>District <span className="text-red-500">*</span></Label>
// // // //                     <Select 
// // // //                       name="district" 
// // // //                       value={district} 
// // // //                       onValueChange={(val: string) => {
// // // //                         setDistrict(val);
// // // //                         setBlock(""); // Clear the block whenever a new district is selected
// // // //                       }} 
// // // //                       required
// // // //                     >
// // // //                       <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
// // // //                       <SelectContent>
// // // //                         {masterData.districts.map((dist: any) => (<SelectItem key={dist.id} value={dist.id.toString()}>{dist.name}</SelectItem>))}
// // // //                       </SelectContent>
// // // //                     </Select>
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>Block</Label>
// // // //                     <Select 
// // // //                       name="block" 
// // // //                       value={block} 
// // // //                       onValueChange={setBlock}
// // // //                       disabled={!district} // Disable if no district is selected
// // // //                     >
// // // //                       <SelectTrigger>
// // // //                         <SelectValue placeholder={district ? "Select Block" : "Select District First"} />
// // // //                       </SelectTrigger>
// // // //                       <SelectContent>
// // // //                         {filteredBlocks.map((b: any) => (<SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>))}
// // // //                       </SelectContent>
// // // //                     </Select>
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>Village</Label>
// // // //                     <Input name="village" defaultValue={childData.village} />
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>ICDS Project</Label>
// // // //                     <Select name="icdsProject" value={icdsProject} onValueChange={setIcdsProject}>
// // // //                       <SelectTrigger><SelectValue placeholder="Select Project" /></SelectTrigger>
// // // //                       <SelectContent>
// // // //                         {masterData.icdsProjects.map((project: any) => (<SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>))}
// // // //                       </SelectContent>
// // // //                     </Select>
// // // //                   </div>
// // // //                   <div className="lg:col-span-2">
// // // //                     <Label>Anganwadi Center</Label>
// // // //                     <Select name="anganwadiCenter" value={anganwadiCenter} onValueChange={setAnganwadiCenter}>
// // // //                       <SelectTrigger><SelectValue placeholder="Select Center" /></SelectTrigger>
// // // //                       <SelectContent>
// // // //                         {masterData.anganwadis.map((center: any) => (<SelectItem key={center.id} value={center.id.toString()}>{center.name}</SelectItem>))}
// // // //                       </SelectContent>
// // // //                     </Select>
// // // //                   </div>
// // // //                 </div>
// // // //               </CardContent>
// // // //             </Card>

// // // //             {/* Anthropometry Details */}
// // // //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // //               <CardContent className="p-6 sm:p-8">
// // // //                 <SectionTitle icon={Activity} title="Anthropometry & Feeding" />
// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //                   <div>
// // // //                     <Label>Admission Weight (kg) <span className="text-red-500">*</span></Label>
// // // //                     <Input name="admissionWeight" type="number" step="0.1" value={admissionWeight} onChange={(e) => setAdmissionWeight(e.target.value)} required />
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>Length/Height (cm) <span className="text-red-500">*</span></Label>
// // // //                     <Input name="admissionHeight" type="number" step="0.1" value={admissionHeight} onChange={(e) => setAdmissionHeight(e.target.value)} required />
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>MUAC (cm) <span className="text-red-500">*</span></Label>
// // // //                     <Input name="admissionMuac" type="number" step="0.1" defaultValue={childData.admissionMuac} required />
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>Z-Score (SD)</Label>
// // // //                     <Input name="zScore" readOnly value={zScore} className={cn("font-semibold focus:ring-0 cursor-not-allowed", zScore === "Error" ? "bg-red-50 text-red-600" : "bg-slate-100 text-indigo-700")} />
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>Admission Odema <span className="text-red-500">*</span></Label>
// // // //                     <Select name="admissionOdema" value={admissionOdema} onValueChange={setAdmissionOdema} required>
// // // //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // // //                       <SelectContent>
// // // //                         {masterData.odemas.map((odema: any) => (<SelectItem key={odema.id} value={odema.id.toString()}>{odema.name}</SelectItem>))}
// // // //                       </SelectContent>
// // // //                     </Select>
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>Breast Feeding <span className="text-red-500">*</span></Label>
// // // //                     <Select name="breastFeeding" value={breastFeeding} onValueChange={setBreastFeeding} required>
// // // //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // // //                       <SelectContent>
// // // //                         {masterData.breastFeeding.map((bf: any) => (<SelectItem key={bf.id} value={bf.id.toString()}>{bf.name}</SelectItem>))}
// // // //                       </SelectContent>
// // // //                     </Select>
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>Complementary Feeding <span className="text-red-500">*</span></Label>
// // // //                     <Select name="complementaryFeeding" value={complementaryFeeding} onValueChange={setComplementaryFeeding} required>
// // // //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // // //                       <SelectContent>
// // // //                         <SelectItem value="1">Yes</SelectItem><SelectItem value="2">No</SelectItem>
// // // //                       </SelectContent>
// // // //                     </Select>
// // // //                   </div>
// // // //                   <div>
// // // //                     <Label>Appetite Test <span className="text-red-500">*</span></Label>
// // // //                     <Select name="appetiteTest" value={appetiteTest} onValueChange={setAppetiteTest} required>
// // // //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // // //                       <SelectContent>
// // // //                         {masterData.appetiteTests.map((at: any) => (<SelectItem key={at.id} value={at.id.toString()}>{at.name}</SelectItem>))}
// // // //                       </SelectContent>
// // // //                     </Select>
// // // //                   </div>
// // // //                 </div>
// // // //               </CardContent>
// // // //             </Card>

// // // //             <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // // //               <CardContent className="p-6 sm:p-8">
// // // //                 <SectionTitle icon={Stethoscope} title="Medical Complications" />
// // // //                 <p className="text-sm font-semibold text-slate-700 mb-4 block">Select all present complications: <span className="text-red-500">*</span></p>
                
// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 bg-slate-50/50 p-6 rounded-xl border border-slate-200">
// // // //                   {MEDICAL_COMPLICATIONS_LIST.map((comp) => (
// // // //                     <label key={comp} className="flex items-start space-x-3 cursor-pointer group">
// // // //                       <div className="flex items-center h-5">
// // // //                         <input
// // // //                           type="checkbox"
// // // //                           className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/30 transition duration-150 ease-in-out cursor-pointer"
// // // //                           checked={selectedComplications.includes(comp)}
// // // //                           onChange={() => handleComplicationToggle(comp)}
// // // //                         />
// // // //                       </div>
// // // //                       <span className="text-sm font-medium text-slate-600 leading-tight group-hover:text-slate-900 transition-colors">
// // // //                         {comp}
// // // //                       </span>
// // // //                     </label>
// // // //                   ))}
// // // //                 </div>
// // // //               </CardContent>
// // // //             </Card>

// // // //           </div>

// // // //           <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 p-4 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 flex justify-end gap-4 sm:justify-center md:justify-end md:px-12">
// // // //             <Button variant="ghost" onClick={() => router.push('/mtc-user/dashboard/child-registration')} type="button">Cancel</Button>
// // // //             <Button type="submit" disabled={loading || zScore === "Error"} className="min-w-40">
// // // //               {loading ? "Saving to Database..." : "Update Patient"}
// // // //             </Button>
// // // //           </div>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import React, { useState, useEffect } from "react";
// // // import { useRouter, useParams } from "next/navigation";
// // // import { Clock, Landmark, ClipboardCheck, MapPin, Activity, Stethoscope, Baby, ShieldCheck, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
// // // import toast, { Toaster } from "react-hot-toast";
// // // import { clsx, type ClassValue } from "clsx";
// // // import { twMerge } from "tailwind-merge";

// // // function cn(...inputs: ClassValue[]) {
// // //   return twMerge(clsx(inputs));
// // // }

// // // // --- Reusable UI Components ---
// // // const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
// // //   ({ className, type, ...props }, ref) => (
// // //     <input type={type} className={cn("flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
// // //   )
// // // );
// // // Input.displayName = "Input";

// // // const Button = React.forwardRef<any, any>(
// // //   ({ className, variant = 'default', href, ...props }, ref) => {
// // //     const classes = cn(
// // //       "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
// // //       variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
// // //       variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
// // //       variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
// // //       className
// // //     );
// // //     if (href) return <a href={href} className={classes} ref={ref} {...props} />;
// // //     return <button ref={ref} className={classes} {...props} />;
// // //   }
// // // );
// // // Button.displayName = "Button";

// // // const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// // //   <div className={cn("rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm", className)} {...props} />
// // // );
// // // const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// // //   <div className={cn("p-6 md:p-8", className)} {...props} />
// // // );
// // // const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
// // //   ({ className, ...props }, ref) => (
// // //     <label ref={ref} className={cn("text-sm font-semibold text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block", className)} {...props} />
// // //   )
// // // );
// // // Label.displayName = "Label";

// // // const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
// // //   ({ className, ...props }, ref) => (
// // //     <textarea className={cn("flex min-h-[80px] w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
// // //   )
// // // );
// // // Textarea.displayName = "Textarea";

// // // const Select = ({ name, value, onValueChange, required, children, disabled }: any) => {
// // //   const [internalValue, setInternalValue] = useState(value || "");
  
// // //   useEffect(() => {
// // //     if (value !== undefined) setInternalValue(value);
// // //   }, [value]);

// // //   const options: {value: string, label: string}[] = [];
// // //   let placeholder = "Select";
  
// // //   React.Children.forEach(children, child => {
// // //     if (child && child.type?.name === 'SelectTrigger') {
// // //       React.Children.forEach(child.props.children, triggerChild => {
// // //         if (triggerChild && triggerChild.type?.name === 'SelectValue') {
// // //           placeholder = triggerChild.props.placeholder || "Select";
// // //         }
// // //       });
// // //     }
// // //     if (child && child.type?.name === 'SelectContent') {
// // //       const contentChildren = Array.isArray(child.props.children) ? child.props.children.flat() : [child.props.children];
// // //       React.Children.forEach(contentChildren, itemChild => {
// // //         if (itemChild && itemChild.type?.name === 'SelectItem') {
// // //           options.push({ value: itemChild.props.value, label: itemChild.props.children });
// // //         }
// // //       });
// // //     }
// // //   });

// // //   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// // //     setInternalValue(e.target.value);
// // //     if (onValueChange) onValueChange(e.target.value);
// // //   };

// // //   return (
// // //     <select name={name} value={internalValue} onChange={handleChange} required={required} disabled={disabled} className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100 appearance-none">
// // //       <option value="" disabled>{placeholder}</option>
// // //       {options.map((opt, i) => (<option key={i} value={opt.value}>{opt.label}</option>))}
// // //     </select>
// // //   );
// // // };
// // // const SelectTrigger = ({ children }: any) => <>{children}</>;
// // // const SelectValue = ({ placeholder }: any) => <>{placeholder}</>;
// // // const SelectContent = ({ children }: any) => <>{children}</>;
// // // const SelectItem = ({ children, value }: any) => <>{children}</>;

// // // // --- Constants & Math Functions ---
// // // const MEDICAL_COMPLICATIONS_LIST = [
// // //   "NO COMPLICATION", "PRESENCE OF ANY OF EMERGENCY SIGNS", "VERY WEAK, APATHETIC",
// // //   "ODEMA OF BOTH FEET", "SEVERE PALMAR PALLOR", "SICK YOUNG INFANT LESS THAN 2 MONTHS",
// // //   "LETHARGY/ DROWSINESS/ UNCONSCIOUSNESS", "CONTINUALLY IRRITABLE AND RESTLESS", "ANY RESPIRATORY DISTRESS",
// // //   "SEVERE DEHYDRATION WITH DIARRHOEA", "PERSISTENT VOMITING", "HYPOTHERMIA (<35°C)",
// // //   "SEVERE ANEMIA", "FEVER (>38.5°C)", "EXTENSIVE SKIN LESIONS",
// // //   "TUBERCULOSIS", "MALARIA", "OTHERS"
// // // ];

// // // const calculateZScore = (weight: number, height: number, sex: string) => {
// // //   if (!weight || !height || height <= 0) return "";
// // //   const score = (weight / (height / 100) ** 2) - 15;
// // //   if (!isFinite(score) || score > 99 || score < -99) return "Error";
// // //   return score.toFixed(2);
// // // };

// // // // --- Main Application ---
// // // export default function EditChildRegistration() {
// // //   const router = useRouter();
// // //   const params = useParams();
// // //   const childId = params.id as string;

// // //   const [loading, setLoading] = useState(false);
// // //   const [mounted, setMounted] = useState(false);
// // //   const [childData, setChildData] = useState<any>(null);
  
// // //   const [masterData, setMasterData] = useState({
// // //     admissionTypes: [], referredBy: [], castes: [], districts: [],
// // //     sexes: [], relationships: [], odemas: [], breastFeeding: [], appetiteTests: [],
// // //     blocks: [], icdsProjects: [], anganwadis: []
// // //   });

// // //   const [admissionType, setAdmissionType] = useState("");
// // //   const [referredBy, setReferredBy] = useState("");
// // //   const [showAshaFields, setShowAshaFields] = useState(false);
// // //   const [selectedComplications, setSelectedComplications] = useState<string[]>([]);
// // //   const [otherComplicationDetail, setOtherComplicationDetail] = useState(""); // <-- ADDED OTHERS STATE
  
// // //   const [dateOfBirth, setDateOfBirth] = useState<string>("");
// // //   const [admissionDate, setAdmissionDate] = useState<string>("");
// // //   const [admissionTime, setAdmissionTime] = useState<string>("");
// // //   const [ageYears, setAgeYears] = useState<string>(""); // <-- ADDED AGE YEARS STATE
// // //   const [ageMonths, setAgeMonths] = useState<string>(""); // <-- ADDED AGE MONTHS STATE

// // //   const [sex, setSex] = useState<string>("");
// // //   const [admissionWeight, setAdmissionWeight] = useState<string>("");
// // //   const [admissionHeight, setAdmissionHeight] = useState<string>("");
// // //   const [zScore, setZScore] = useState<string>("");

// // //   const [caste, setCaste] = useState("");
// // //   const [district, setDistrict] = useState("");
// // //   const [block, setBlock] = useState("");
// // //   const [icdsProject, setIcdsProject] = useState("");
// // //   const [anganwadiCenter, setAnganwadiCenter] = useState("");
// // //   const [relationship, setRelationship] = useState("");
  
// // //   const [admissionOdema, setAdmissionOdema] = useState("");
// // //   const [breastFeeding, setBreastFeeding] = useState("");
// // //   const [complementaryFeeding, setComplementaryFeeding] = useState("");
// // //   const [appetiteTest, setAppetiteTest] = useState("");

// // //   // ---> DYNAMIC MUAC VISIBILITY LOGIC <---
// // //   const showMuac = !(ageYears === "0" && parseInt(ageMonths || "0") <= 6);

// // //   useEffect(() => {
// // //     setMounted(true);
    
// // //     // Fetch Master Data
// // //     const fetchMasterData = async () => {
// // //       try {
// // //         const response = await fetch('/api/master-data');
// // //         if (response.ok) {
// // //           const data = await response.json();
// // //           setMasterData(data);
// // //         }
// // //       } catch (error) {
// // //         toast.error("Failed to load dropdown options.");
// // //       }
// // //     };
    
// // //     // Fetch Specific Child Data
// // //     const fetchChildData = async () => {
// // //       try {
// // //         const response = await fetch(`/api/child-registration/${childId}`);
// // //         if (response.ok) {
// // //           const patient = await response.json();
// // //           setChildData(patient);
          
// // //           setAdmissionType(patient.admissionType || "");
// // //           setReferredBy(patient.referredBy || "");
// // //           setSex(patient.sex || "");
// // //           setRelationship(patient.relationship || "");
// // //           setCaste(patient.caste || "");
// // //           setDistrict(patient.district || "");
// // //           setBlock(patient.block || "");
// // //           setIcdsProject(patient.icdsProject || "");
// // //           setAnganwadiCenter(patient.anganwadiCenter || "");
          
// // //           setDateOfBirth(patient.dateOfBirth || "");
// // //           setAdmissionDate(patient.admissionDate || "");
// // //           setAdmissionTime(patient.admissionTime || "");
// // //           setAgeYears(patient.ageYears?.toString() || "");
// // //           setAgeMonths(patient.ageMonths?.toString() || "");
          
// // //           setAdmissionWeight(patient.admissionWeight || "");
// // //           setAdmissionHeight(patient.admissionHeight || "");
// // //           setZScore(patient.zScore || "");
          
// // //           setAdmissionOdema(patient.admissionOdema || "");
// // //           setBreastFeeding(patient.breastFeeding || "");
// // //           setComplementaryFeeding(patient.complementaryFeeding || "");
// // //           setAppetiteTest(patient.appetiteTest || "");
          
// // //           // ---> PARSE OTHERS FROM DB ARRAY <---
// // //           const comps = patient.medicalComplications || [];
// // //           const standardComps: string[] = [];
// // //           let othersText = "";
          
// // //           comps.forEach((c: string) => {
// // //             if (c.startsWith("OTHERS: ")) { 
// // //               standardComps.push("OTHERS"); 
// // //               othersText = c.replace("OTHERS: ", ""); 
// // //             } else if (c === "OTHERS") {
// // //               standardComps.push("OTHERS");
// // //             } else {
// // //               standardComps.push(c);
// // //             }
// // //           });
          
// // //           setSelectedComplications(standardComps);
// // //           setOtherComplicationDetail(othersText);

// // //         } else {
// // //           toast.error("Patient not found!");
// // //           router.push('/mtc-user/dashboard/child-registration');
// // //         }
// // //       } catch (error) {
// // //         toast.error("Error loading patient data.");
// // //       }
// // //     };

// // //     fetchMasterData();
// // //     if (childId) fetchChildData();
// // //   }, [childId, router]);

// // //   useEffect(() => {
// // //     if (admissionWeight && admissionHeight && sex) {
// // //       const score = calculateZScore(parseFloat(admissionWeight), parseFloat(admissionHeight), sex);
// // //       setZScore(score ? String(score) : "");
// // //     } else {
// // //       setZScore("");
// // //     }
// // //   }, [admissionWeight, admissionHeight, sex]);

// // //   useEffect(() => {
// // //     setShowAshaFields(referredBy === "6");
// // //   }, [referredBy]);

// // //   const handleComplicationToggle = (comp: string) => {
// // //     setSelectedComplications(prev => {
// // //       if (comp === "OTHERS" && prev.includes("OTHERS")) {
// // //         setOtherComplicationDetail(""); // Clear text if unchecked
// // //       }
// // //       return prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp];
// // //     });
// // //   };

// // //   // Filter blocks based on the currently selected district
// // //   const filteredBlocks = masterData.blocks.filter((b: any) => 
// // //     !district || b.districtId?.toString() === district
// // //   );

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (zScore === "Error") {
// // //       toast.error("Invalid Anthropometry data. Please check Height/Weight.");
// // //       return;
// // //     }
// // //     if (selectedComplications.length === 0) {
// // //       toast.error("Please select at least one medical complication status.");
// // //       return;
// // //     }
// // //     if (selectedComplications.includes("OTHERS") && !otherComplicationDetail.trim()) {
// // //       toast.error("Please specify the details for the 'Others' complication.");
// // //       return;
// // //     }

// // //     setLoading(true);

// // //     // --- MERGE OTHERS TEXT FOR PAYLOAD ---
// // //     let finalComplications = [...selectedComplications];
// // //     if (finalComplications.includes("OTHERS")) {
// // //       finalComplications = finalComplications.filter(c => c !== "OTHERS");
// // //       finalComplications.push(`OTHERS: ${otherComplicationDetail.trim()}`);
// // //     }

// // //     const formData = new FormData(e.currentTarget as HTMLFormElement);
    
// // //     const payload = {
// // //       admissionType, referredBy,
// // //       referredByName: formData.get('referredByName'), referredByMobile: formData.get('referredByMobile'),
// // //       childName: formData.get('childName'), 
// // //       motherName: formData.get('motherName'), // Mapped properly
// // //       parentName: formData.get('parentName'),
// // //       relationship, mobileNumber: formData.get('mobileNumber'),
// // //       bplNumber: formData.get('bplNumber'), dateOfBirth, sex,
// // //       ageYears: ageYears, ageMonths: ageMonths,
// // //       address: formData.get('address'), caste, district, block, 
// // //       icdsProject, anganwadiCenter, village: formData.get('village'),
// // //       aadhaarNumber: formData.get('aadhaarNumber'), bankName: formData.get('bankName'),
// // //       accountHolderName: formData.get('accountHolderName'), accountNumber: formData.get('accountNumber'),
// // //       ifscCode: formData.get('ifscCode'), admissionDate, admissionTime,
// // //       admissionWeight, admissionHeight, 
// // //       admissionMuac: showMuac ? formData.get('admissionMuac') : null, // Handled properly
// // //       zScore: zScore, admissionOdema, breastFeeding, complementaryFeeding, appetiteTest,
// // //       medicalComplications: finalComplications
// // //     };

// // //     try {
// // //       const response = await fetch(`/api/child-registration/${childId}`, {
// // //         method: 'PUT',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify(payload)
// // //       });
      
// // //       if (!response.ok) throw new Error('Failed to update registration');
      
// // //       toast.success("Patient updated successfully!");
// // //       setTimeout(() => router.push('/mtc-user/dashboard/child-registration'), 1000);
      
// // //     } catch (error) {
// // //       toast.error("An error occurred while updating.");
// // //       setLoading(false);
// // //     }
// // //   };

// // //   if (!mounted || !childData) {
// // //     return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// // //       <Loader2 className="animate-spin text-indigo-600 w-8 h-8" />
// // //     </div>;
// // //   }

// // //   const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
// // //     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
// // //       <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Icon size={20} strokeWidth={2.5} /></div>
// // //       <h2 className="text-lg font-bold text-slate-800">{title}</h2>
// // //     </div>
// // //   );

// // //   return (
// // //     <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans pb-28">
// // //       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
      
// // //       <div className="max-w-6xl mx-auto">
// // //         <div className="mb-2 flex items-center">
// // //           <Button variant="ghost" onClick={() => router.push('/mtc-user/dashboard/child-registration')} type="button" className="pl-0 text-slate-500 hover:text-indigo-600 hover:bg-transparent">
// // //             <ArrowLeft className="w-5 h-5 mr-2" /> Back
// // //           </Button>
// // //         </div>

// // //         <div className="mb-8 text-center md:text-left md:flex md:items-end md:justify-between">
// // //           <div>
// // //             <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Edit Child Record</h1>
// // //             <p className="mt-2 text-sm text-slate-500">Update the information directly in the database.</p>
// // //           </div>
// // //           <div className="mt-4 md:mt-0 px-5 py-3 bg-white rounded-xl shadow-sm border border-slate-200 inline-block text-center md:text-right">
// // //             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">SAM Number</span>
// // //             <span className="text-lg font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md">{childData.samNumber}</span>
// // //           </div>
// // //         </div>

// // //         <form onSubmit={handleSubmit} className="relative">
// // //           <div className="space-y-6">

// // //             {/* Admission Info */}
// // //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // //               <CardContent className="p-6 sm:p-8">
// // //                 <SectionTitle icon={ClipboardCheck} title="Admission Details" />
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //                   <div>
// // //                     <Label>Admission Type <span className="text-red-500">*</span></Label>
// // //                     <Select name="admissionType" value={admissionType} onValueChange={setAdmissionType} required>
// // //                       <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
// // //                       <SelectContent>
// // //                         {masterData.admissionTypes.map((type: any) => (<SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>))}
// // //                       </SelectContent>
// // //                     </Select>
// // //                   </div>
// // //                   <div>
// // //                     <Label>Referred By</Label>
// // //                     <Select name="referredBy" value={referredBy} onValueChange={setReferredBy}>
// // //                       <SelectTrigger><SelectValue placeholder="Select Origin" /></SelectTrigger>
// // //                       <SelectContent>
// // //                         {masterData.referredBy.map((ref: any) => (<SelectItem key={ref.id} value={ref.id.toString()}>{ref.name}</SelectItem>))}
// // //                       </SelectContent>
// // //                     </Select>
// // //                   </div>
// // //                   {showAshaFields && (
// // //                     <>
// // //                       <div>
// // //                         <Label>Name of Sahiya/Asha</Label>
// // //                         <Input name="referredByName" defaultValue={childData.referredByName || childData.parentName} placeholder="Enter Name" />
// // //                       </div>
// // //                       <div>
// // //                         <Label>Sahiya/Asha Mobile</Label>
// // //                         <Input name="referredByMobile" defaultValue={childData.referredByMobile || childData.mobileNumber} type="tel" maxLength={10} pattern="[0-9]{10}" />
// // //                       </div>
// // //                     </>
// // //                   )}
// // //                   <div>
// // //                     <Label>Admission Date <span className="text-red-500">*</span></Label>
// // //                     <Input type="date" name="admissionDate" value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} required />
// // //                   </div>
// // //                   <div>
// // //                     <Label>Admission Time <span className="text-red-500">*</span></Label>
// // //                     <div className="relative">
// // //                       <Input name="admissionTime" type="time" value={admissionTime} onChange={(e) => setAdmissionTime(e.target.value)} required className="pr-10" />
// // //                       <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>

// // //             {/* Personal Info */}
// // //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // //               <CardContent className="p-6 sm:p-8">
// // //                 <SectionTitle icon={Baby} title="Child & Guardian Information" />
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //                   <div className="lg:col-span-2">
// // //                     <Label>Child Full Name <span className="text-red-500">*</span></Label>
// // //                     <Input name="childName" defaultValue={childData.childName} required />
// // //                   </div>
// // //                   <div className="lg:col-span-2">
// // //                     <Label>Date of Birth</Label>
// // //                     <Input type="date" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
// // //                   </div>
// // //                   <div>
// // //                     <Label>Age (Years) <span className="text-red-500">*</span></Label>
// // //                     <Input type="number" min="0" value={ageYears} onChange={(e) => setAgeYears(e.target.value)} required />
// // //                   </div>
// // //                   <div>
// // //                     <Label>Age (Months) <span className="text-red-500">*</span></Label>
// // //                     <Input type="number" min="0" max="11" value={ageMonths} onChange={(e) => setAgeMonths(e.target.value)} required />
// // //                   </div>
// // //                   <div className="lg:col-span-2">
// // //                     <Label>Sex <span className="text-red-500">*</span></Label>
// // //                     <Select name="sex" value={sex} onValueChange={setSex} required>
// // //                       <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
// // //                       <SelectContent>
// // //                         {masterData.sexes.map((s: any) => (<SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>))}
// // //                       </SelectContent>
// // //                     </Select>
// // //                   </div>
// // //                   <div className="lg:col-span-2">
// // //                     <Label>Mother's Name <span className="text-red-500">*</span></Label>
// // //                     <Input name="motherName" defaultValue={childData.motherName} required />
// // //                   </div>
// // //                   <div className="lg:col-span-2">
// // //                     <Label>Name of Caretaker / Guardian <span className="text-red-500">*</span></Label>
// // //                     <Input name="parentName" defaultValue={childData.parentName} required />
// // //                   </div>
// // //                   <div>
// // //                     <Label>Relationship <span className="text-red-500">*</span></Label>
// // //                     <Select name="relationship" value={relationship} onValueChange={setRelationship} required>
// // //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // //                       <SelectContent>
// // //                         {masterData.relationships.map((rel: any) => (<SelectItem key={rel.id} value={rel.id.toString()}>{rel.name}</SelectItem>))}
// // //                       </SelectContent>
// // //                     </Select>
// // //                   </div>
// // //                   <div>
// // //                     <Label>Mobile Number <span className="text-red-500">*</span></Label>
// // //                     <Input name="mobileNumber" defaultValue={childData.mobileNumber} type="tel" maxLength={10} pattern="[0-9]{10}" required />
// // //                   </div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>

// // //             {/* Financial Details */}
// // //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // //               <CardContent className="p-6 sm:p-8">
// // //                 <SectionTitle icon={ShieldCheck} title="Identity & Financial Details" />
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //                   <div>
// // //                     <Label>Parent Aadhaar Number</Label>
// // //                     <Input name="aadhaarNumber" defaultValue={childData.aadhaarNumber} maxLength={12} pattern="[0-9]{12}" />
// // //                   </div>
// // //                   <div>
// // //                     <Label>BPL Number</Label>
// // //                     <Input name="bplNumber" defaultValue={childData.bplNumber} />
// // //                   </div>
// // //                   <div>
// // //                     <Label>Caste <span className="text-red-500">*</span></Label>
// // //                     <Select name="caste" value={caste} onValueChange={setCaste} required>
// // //                       <SelectTrigger><SelectValue placeholder="Select Caste" /></SelectTrigger>
// // //                       <SelectContent>
// // //                         {masterData.castes.map((caste: any) => (<SelectItem key={caste.id} value={caste.id.toString()}>{caste.name}</SelectItem>))}
// // //                       </SelectContent>
// // //                     </Select>
// // //                   </div>
// // //                   <div className="lg:col-span-4 mt-2">
// // //                     <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
// // //                       <Landmark className="w-4 h-4 text-indigo-500" /> Bank Account Details
// // //                     </h3>
// // //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
// // //                       <div><Label>Bank Name</Label><Input name="bankName" defaultValue={childData.bankName} className="bg-white" /></div>
// // //                       <div><Label>Account Holder</Label><Input name="accountHolderName" defaultValue={childData.accountHolderName} className="bg-white" /></div>
// // //                       <div><Label>Account Number</Label><Input name="accountNumber" defaultValue={childData.accountNumber} className="bg-white" /></div>
// // //                       <div><Label>IFSC Code</Label><Input name="ifscCode" defaultValue={childData.ifscCode} className="bg-white" /></div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>

// // //             {/* DEPENDENT LOCATION DETAILS */}
// // //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // //               <CardContent className="p-6 sm:p-8">
// // //                 <SectionTitle icon={MapPin} title="Location Details" />
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                   <div className="lg:col-span-3">
// // //                     <Label>Full Address <span className="text-red-500">*</span></Label>
// // //                     <Textarea name="address" defaultValue={childData.address} rows={2} required />
// // //                   </div>
// // //                   <div>
// // //                     <Label>District <span className="text-red-500">*</span></Label>
// // //                     <Select 
// // //                       name="district" 
// // //                       value={district} 
// // //                       onValueChange={(val: string) => {
// // //                         setDistrict(val);
// // //                         setBlock(""); 
// // //                       }} 
// // //                       required
// // //                     >
// // //                       <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
// // //                       <SelectContent>
// // //                         {masterData.districts.map((dist: any) => (<SelectItem key={dist.id} value={dist.id.toString()}>{dist.name}</SelectItem>))}
// // //                       </SelectContent>
// // //                     </Select>
// // //                   </div>
// // //                   <div>
// // //                     <Label>Block</Label>
// // //                     <Select 
// // //                       name="block" 
// // //                       value={block} 
// // //                       onValueChange={setBlock}
// // //                       disabled={!district} 
// // //                     >
// // //                       <SelectTrigger>
// // //                         <SelectValue placeholder={district ? "Select Block" : "Select District First"} />
// // //                       </SelectTrigger>
// // //                       <SelectContent>
// // //                         {filteredBlocks.map((b: any) => (<SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>))}
// // //                       </SelectContent>
// // //                     </Select>
// // //                   </div>
// // //                   <div>
// // //                     <Label>Village</Label>
// // //                     <Input name="village" defaultValue={childData.village} />
// // //                   </div>
// // //                   <div>
// // //                     <Label>ICDS Project</Label>
// // //                     <Select name="icdsProject" value={icdsProject} onValueChange={setIcdsProject}>
// // //                       <SelectTrigger><SelectValue placeholder="Select Project" /></SelectTrigger>
// // //                       <SelectContent>
// // //                         {masterData.icdsProjects.map((project: any) => (<SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>))}
// // //                       </SelectContent>
// // //                     </Select>
// // //                   </div>
// // //                   <div className="lg:col-span-2">
// // //                     <Label>Anganwadi Center</Label>
// // //                     <Select name="anganwadiCenter" value={anganwadiCenter} onValueChange={setAnganwadiCenter}>
// // //                       <SelectTrigger><SelectValue placeholder="Select Center" /></SelectTrigger>
// // //                       <SelectContent>
// // //                         {masterData.anganwadis.map((center: any) => (<SelectItem key={center.id} value={center.id.toString()}>{center.name}</SelectItem>))}
// // //                       </SelectContent>
// // //                     </Select>
// // //                   </div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>

// // //             {/* Anthropometry Details */}
// // //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // //               <CardContent className="p-6 sm:p-8">
// // //                 <SectionTitle icon={Activity} title="Anthropometry & Feeding" />
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //                   <div>
// // //                     <Label>Admission Weight (kg) <span className="text-red-500">*</span></Label>
// // //                     <Input name="admissionWeight" type="number" step="0.1" value={admissionWeight} onChange={(e) => setAdmissionWeight(e.target.value)} required />
// // //                   </div>
// // //                   <div>
// // //                     <Label>Length/Height (cm) <span className="text-red-500">*</span></Label>
// // //                     <Input name="admissionHeight" type="number" step="0.1" value={admissionHeight} onChange={(e) => setAdmissionHeight(e.target.value)} required />
// // //                   </div>
                  
// // //                   {/* ---> CONDITIONAL MUAC FIELD <--- */}
// // //                   {showMuac && (
// // //                     <div>
// // //                       <Label>MUAC (cm) <span className="text-red-500">*</span></Label>
// // //                       <Input name="admissionMuac" type="number" step="0.1" defaultValue={childData.admissionMuac} required />
// // //                     </div>
// // //                   )}

// // //                   <div>
// // //                     <Label>Z-Score (SD)</Label>
// // //                     <Input name="zScore" readOnly value={zScore} className={cn("font-semibold focus:ring-0 cursor-not-allowed", zScore === "Error" ? "bg-red-50 text-red-600" : "bg-slate-100 text-indigo-700")} />
// // //                   </div>
// // //                   <div>
// // //                     <Label>Admission Odema <span className="text-red-500">*</span></Label>
// // //                     <Select name="admissionOdema" value={admissionOdema} onValueChange={setAdmissionOdema} required>
// // //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // //                       <SelectContent>
// // //                         {masterData.odemas.map((odema: any) => (<SelectItem key={odema.id} value={odema.id.toString()}>{odema.name}</SelectItem>))}
// // //                       </SelectContent>
// // //                     </Select>
// // //                   </div>
// // //                   <div>
// // //                     <Label>Breast Feeding <span className="text-red-500">*</span></Label>
// // //                     <Select name="breastFeeding" value={breastFeeding} onValueChange={setBreastFeeding} required>
// // //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // //                       <SelectContent>
// // //                         {masterData.breastFeeding.map((bf: any) => (<SelectItem key={bf.id} value={bf.id.toString()}>{bf.name}</SelectItem>))}
// // //                       </SelectContent>
// // //                     </Select>
// // //                   </div>
// // //                   <div>
// // //                     <Label>Complementary Feeding <span className="text-red-500">*</span></Label>
// // //                     <Select name="complementaryFeeding" value={complementaryFeeding} onValueChange={setComplementaryFeeding} required>
// // //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // //                       <SelectContent>
// // //                         <SelectItem value="1">Yes</SelectItem><SelectItem value="2">No</SelectItem>
// // //                       </SelectContent>
// // //                     </Select>
// // //                   </div>
// // //                   <div>
// // //                     <Label>Appetite Test <span className="text-red-500">*</span></Label>
// // //                     <Select name="appetiteTest" value={appetiteTest} onValueChange={setAppetiteTest} required>
// // //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// // //                       <SelectContent>
// // //                         {masterData.appetiteTests.map((at: any) => (<SelectItem key={at.id} value={at.id.toString()}>{at.name}</SelectItem>))}
// // //                       </SelectContent>
// // //                     </Select>
// // //                   </div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>

// // //             <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// // //               <CardContent className="p-6 sm:p-8">
// // //                 <SectionTitle icon={Stethoscope} title="Medical Complications" />
// // //                 <p className="text-sm font-semibold text-slate-700 mb-4 block">Select all present complications: <span className="text-red-500">*</span></p>
                
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 bg-slate-50/50 p-6 rounded-xl border border-slate-200">
// // //                   {MEDICAL_COMPLICATIONS_LIST.map((comp) => (
// // //                     <label key={comp} className="flex items-start space-x-3 cursor-pointer group">
// // //                       <div className="flex items-center h-5">
// // //                         <input
// // //                           type="checkbox"
// // //                           className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/30 transition duration-150 ease-in-out cursor-pointer"
// // //                           checked={selectedComplications.includes(comp)}
// // //                           onChange={() => handleComplicationToggle(comp)}
// // //                         />
// // //                       </div>
// // //                       <span className="text-sm font-medium text-slate-600 leading-tight group-hover:text-slate-900 transition-colors">
// // //                         {comp}
// // //                       </span>
// // //                     </label>
// // //                   ))}
// // //                 </div>

// // //                 {/* ---> DYNAMIC OTHERS TEXT BOX <--- */}
// // //                 {selectedComplications.includes("OTHERS") && (
// // //                   <div className="mt-5 p-5 bg-indigo-50/50 rounded-xl border border-indigo-100">
// // //                     <Label className="text-indigo-900">Please specify 'Others' complication details <span className="text-red-500">*</span></Label>
// // //                     <Input 
// // //                       value={otherComplicationDetail}
// // //                       onChange={(e) => setOtherComplicationDetail(e.target.value)}
// // //                       placeholder="e.g., Asthma, Severe Jaundice..."
// // //                       className="mt-2 bg-white"
// // //                       required={selectedComplications.includes("OTHERS")}
// // //                     />
// // //                   </div>
// // //                 )}

// // //               </CardContent>
// // //             </Card>

// // //           </div>

// // //           <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 p-4 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 flex justify-end gap-4 sm:justify-center md:justify-end md:px-12">
// // //             <Button variant="ghost" onClick={() => router.push('/mtc-user/dashboard/child-registration')} type="button">Cancel</Button>
// // //             <Button type="submit" disabled={loading || zScore === "Error"} className="min-w-40">
// // //               {loading ? "Saving to Database..." : "Update Patient"}
// // //             </Button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { useRouter, useParams } from "next/navigation";
// // import { Clock, Landmark, ClipboardCheck, MapPin, Activity, Stethoscope, Baby, ShieldCheck, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";
// // import { clsx, type ClassValue } from "clsx";
// // import { twMerge } from "tailwind-merge";

// // function cn(...inputs: ClassValue[]) {
// //   return twMerge(clsx(inputs));
// // }

// // // --- Reusable UI Components ---
// // const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
// //   ({ className, type, ...props }, ref) => (
// //     <input type={type} className={cn("flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
// //   )
// // );
// // Input.displayName = "Input";

// // const Button = React.forwardRef<any, any>(
// //   ({ className, variant = 'default', href, ...props }, ref) => {
// //     const classes = cn(
// //       "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
// //       variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
// //       variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
// //       variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
// //       className
// //     );
// //     if (href) return <a href={href} className={classes} ref={ref} {...props} />;
// //     return <button ref={ref} className={classes} {...props} />;
// //   }
// // );
// // Button.displayName = "Button";

// // const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// //   <div className={cn("rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm", className)} {...props} />
// // );
// // const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
// //   <div className={cn("p-6 md:p-8", className)} {...props} />
// // );
// // const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
// //   ({ className, ...props }, ref) => (
// //     <label ref={ref} className={cn("text-sm font-semibold text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block", className)} {...props} />
// //   )
// // );
// // Label.displayName = "Label";

// // const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
// //   ({ className, ...props }, ref) => (
// //     <textarea className={cn("flex min-h-[80px] w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
// //   )
// // );
// // Textarea.displayName = "Textarea";

// // const Select = ({ name, value, onValueChange, required, children, disabled }: any) => {
// //   const [internalValue, setInternalValue] = useState(value || "");
  
// //   useEffect(() => {
// //     if (value !== undefined) setInternalValue(value);
// //   }, [value]);

// //   const options: {value: string, label: string}[] = [];
// //   let placeholder = "Select";
  
// //   React.Children.forEach(children, child => {
// //     if (child && child.type?.name === 'SelectTrigger') {
// //       React.Children.forEach(child.props.children, triggerChild => {
// //         if (triggerChild && triggerChild.type?.name === 'SelectValue') {
// //           placeholder = triggerChild.props.placeholder || "Select";
// //         }
// //       });
// //     }
// //     if (child && child.type?.name === 'SelectContent') {
// //       const contentChildren = Array.isArray(child.props.children) ? child.props.children.flat() : [child.props.children];
// //       React.Children.forEach(contentChildren, itemChild => {
// //         if (itemChild && itemChild.type?.name === 'SelectItem') {
// //           options.push({ value: itemChild.props.value, label: itemChild.props.children });
// //         }
// //       });
// //     }
// //   });

// //   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     setInternalValue(e.target.value);
// //     if (onValueChange) onValueChange(e.target.value);
// //   };

// //   return (
// //     <select name={name} value={internalValue} onChange={handleChange} required={required} disabled={disabled} className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100 appearance-none">
// //       <option value="" disabled>{placeholder}</option>
// //       {options.map((opt, i) => (<option key={i} value={opt.value}>{opt.label}</option>))}
// //     </select>
// //   );
// // };
// // const SelectTrigger = ({ children }: any) => <>{children}</>;
// // const SelectValue = ({ placeholder }: any) => <>{placeholder}</>;
// // const SelectContent = ({ children }: any) => <>{children}</>;
// // const SelectItem = ({ children, value }: any) => <>{children}</>;

// // // --- Constants & Math Functions ---
// // const MEDICAL_COMPLICATIONS_LIST = [
// //   "NO COMPLICATION", "PRESENCE OF ANY OF EMERGENCY SIGNS", "VERY WEAK, APATHETIC",
// //   "ODEMA OF BOTH FEET", "SEVERE PALMAR PALLOR", "SICK YOUNG INFANT LESS THAN 2 MONTHS",
// //   "LETHARGY/ DROWSINESS/ UNCONSCIOUSNESS", "CONTINUALLY IRRITABLE AND RESTLESS", "ANY RESPIRATORY DISTRESS",
// //   "SEVERE DEHYDRATION WITH DIARRHOEA", "PERSISTENT VOMITING", "HYPOTHERMIA (<35°C)",
// //   "SEVERE ANEMIA", "FEVER (>38.5°C)", "EXTENSIVE SKIN LESIONS",
// //   "TUBERCULOSIS", "MALARIA", "OTHERS"
// // ];

// // const calculateZScore = (weight: number, height: number, sex: string) => {
// //   if (!weight || !height || height <= 0) return "";
// //   const score = (weight / (height / 100) ** 2) - 15;
// //   if (!isFinite(score) || score > 99 || score < -99) return "Error";
// //   return score.toFixed(2);
// // };

// // // --- Main Application ---
// // export default function EditChildRegistration() {
// //   const router = useRouter();
// //   const params = useParams();
// //   const childId = params.id as string;

// //   const [loading, setLoading] = useState(false);
// //   const [mounted, setMounted] = useState(false);
// //   const [childData, setChildData] = useState<any>(null);
  
// //   // ✅ MTC Identity States
// //   const [userMtcId, setUserMtcId] = useState<number | null>(null);
// //   const [userMtcCode, setUserMtcCode] = useState<string>("");

// //   const [masterData, setMasterData] = useState({
// //     admissionTypes: [], referredBy: [], castes: [], districts: [],
// //     sexes: [], relationships: [], odemas: [], breastFeeding: [], appetiteTests: [],
// //     blocks: [], icdsProjects: [], anganwadis: []
// //   });

// //   const [admissionType, setAdmissionType] = useState("");
// //   const [referredBy, setReferredBy] = useState("");
// //   const [showAshaFields, setShowAshaFields] = useState(false);
// //   const [selectedComplications, setSelectedComplications] = useState<string[]>([]);
// //   const [otherComplicationDetail, setOtherComplicationDetail] = useState(""); 
  
// //   const [dateOfBirth, setDateOfBirth] = useState<string>("");
// //   const [admissionDate, setAdmissionDate] = useState<string>("");
// //   const [admissionTime, setAdmissionTime] = useState<string>("");
// //   const [ageYears, setAgeYears] = useState<string>(""); 
// //   const [ageMonths, setAgeMonths] = useState<string>(""); 

// //   const [sex, setSex] = useState<string>("");
// //   const [admissionWeight, setAdmissionWeight] = useState<string>("");
// //   const [admissionHeight, setAdmissionHeight] = useState<string>("");
// //   const [zScore, setZScore] = useState<string>("");

// //   const [caste, setCaste] = useState("");
// //   const [district, setDistrict] = useState("");
// //   const [block, setBlock] = useState("");
// //   const [icdsProject, setIcdsProject] = useState("");
// //   const [anganwadiCenter, setAnganwadiCenter] = useState("");
// //   const [relationship, setRelationship] = useState("");
  
// //   const [admissionOdema, setAdmissionOdema] = useState("");
// //   const [breastFeeding, setBreastFeeding] = useState("");
// //   const [complementaryFeeding, setComplementaryFeeding] = useState("");
// //   const [appetiteTest, setAppetiteTest] = useState("");

// //   const showMuac = !(ageYears === "0" && parseInt(ageMonths || "0") <= 6);

// //   useEffect(() => {
// //     setMounted(true);
    
// //     // ✅ 1. Read MTC Identity from Session
// //     const sessionData = sessionStorage.getItem("mtc_user");
// //     if (sessionData) {
// //       try {
// //         const user = JSON.parse(sessionData);
// //         setUserMtcId(user.mtcId || null);
// //         setUserMtcCode(user.mtcCode || "");
// //       } catch (err) {
// //         console.error("Session parse error", err);
// //       }
// //     }
    
// //     // Fetch Master Data
// //     const fetchMasterData = async () => {
// //       try {
// //         const response = await fetch('/api/master-data');
// //         if (response.ok) {
// //           const data = await response.json();
// //           // ✅ SAFE MERGE: Prevents undefined crashes if API misses a key
// //           setMasterData(prev => ({ ...prev, ...data }));
// //         }
// //       } catch (error) {
// //         toast.error("Failed to load dropdown options.");
// //       }
// //     };
    
// //     // Fetch Specific Child Data
// //     const fetchChildData = async () => {
// //       try {
// //         const response = await fetch(`/api/child-registration/${childId}`);
// //         if (response.ok) {
// //           const patient = await response.json();
// //           setChildData(patient);
          
// //           setAdmissionType(patient.admissionType || "");
// //           setReferredBy(patient.referredBy || "");
// //           setSex(patient.sex || "");
// //           setRelationship(patient.relationship || "");
// //           setCaste(patient.caste || "");
// //           setDistrict(patient.district || "");
// //           setBlock(patient.block || "");
// //           setIcdsProject(patient.icdsProject || "");
// //           setAnganwadiCenter(patient.anganwadiCenter || "");
          
// //           setDateOfBirth(patient.dateOfBirth || "");
// //           setAdmissionDate(patient.admissionDate || "");
// //           setAdmissionTime(patient.admissionTime || "");
// //           setAgeYears(patient.ageYears?.toString() || "");
// //           setAgeMonths(patient.ageMonths?.toString() || "");
          
// //           setAdmissionWeight(patient.admissionWeight || "");
// //           setAdmissionHeight(patient.admissionHeight || "");
// //           setZScore(patient.zScore || "");
          
// //           setAdmissionOdema(patient.admissionOdema || "");
// //           setBreastFeeding(patient.breastFeeding || "");
// //           setComplementaryFeeding(patient.complementaryFeeding || "");
// //           setAppetiteTest(patient.appetiteTest || "");
          
// //           const comps = patient.medicalComplications || [];
// //           const standardComps: string[] = [];
// //           let othersText = "";
          
// //           comps.forEach((c: string) => {
// //             if (c.startsWith("OTHERS: ")) { 
// //               standardComps.push("OTHERS"); 
// //               othersText = c.replace("OTHERS: ", ""); 
// //             } else if (c === "OTHERS") {
// //               standardComps.push("OTHERS");
// //             } else {
// //               standardComps.push(c);
// //             }
// //           });
          
// //           setSelectedComplications(standardComps);
// //           setOtherComplicationDetail(othersText);

// //         } else {
// //           toast.error("Patient not found!");
// //           router.push('/mtc-user/dashboard/child-registration');
// //         }
// //       } catch (error) {
// //         toast.error("Error loading patient data.");
// //       }
// //     };

// //     fetchMasterData();
// //     if (childId) fetchChildData();
// //   }, [childId, router]);

// //   useEffect(() => {
// //     if (admissionWeight && admissionHeight && sex) {
// //       const score = calculateZScore(parseFloat(admissionWeight), parseFloat(admissionHeight), sex);
// //       setZScore(score ? String(score) : "");
// //     } else {
// //       setZScore("");
// //     }
// //   }, [admissionWeight, admissionHeight, sex]);

// //   useEffect(() => {
// //     setShowAshaFields(referredBy === "6");
// //   }, [referredBy]);

// //   const handleComplicationToggle = (comp: string) => {
// //     setSelectedComplications(prev => {
// //       if (comp === "OTHERS" && prev.includes("OTHERS")) {
// //         setOtherComplicationDetail(""); // Clear text if unchecked
// //       }
// //       return prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp];
// //     });
// //   };

// //   // ✅ SAFE FILTER: Protects against undefined "masterData.blocks"
// //   const filteredBlocks = (masterData.blocks || []).filter((b: any) => 
// //     !district || b.districtId?.toString() === district
// //   );

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (zScore === "Error") {
// //       toast.error("Invalid Anthropometry data. Please check Height/Weight.");
// //       return;
// //     }
// //     if (selectedComplications.length === 0) {
// //       toast.error("Please select at least one medical complication status.");
// //       return;
// //     }
// //     if (selectedComplications.includes("OTHERS") && !otherComplicationDetail.trim()) {
// //       toast.error("Please specify the details for the 'Others' complication.");
// //       return;
// //     }
    
// //     if (!userMtcId) {
// //       toast.error("Security Error: Unknown MTC ID. Please log out and log back in.");
// //       return;
// //     }

// //     setLoading(true);

// //     let finalComplications = [...selectedComplications];
// //     if (finalComplications.includes("OTHERS")) {
// //       finalComplications = finalComplications.filter(c => c !== "OTHERS");
// //       finalComplications.push(`OTHERS: ${otherComplicationDetail.trim()}`);
// //     }

// //     const formData = new FormData(e.currentTarget as HTMLFormElement);
    
// //     const payload = {
// //       mtcId: userMtcId, // ✅ Secured MTC DB association
// //       admissionType, referredBy,
// //       referredByName: formData.get('referredByName'), referredByMobile: formData.get('referredByMobile'),
// //       childName: formData.get('childName'), 
// //       motherName: formData.get('motherName'), 
// //       parentName: formData.get('parentName'),
// //       relationship, mobileNumber: formData.get('mobileNumber'),
// //       bplNumber: formData.get('bplNumber'), dateOfBirth, sex,
// //       ageYears: ageYears, ageMonths: ageMonths,
// //       address: formData.get('address'), caste, district, block, 
// //       icdsProject, anganwadiCenter, village: formData.get('village'),
// //       aadhaarNumber: formData.get('aadhaarNumber'), bankName: formData.get('bankName'),
// //       accountHolderName: formData.get('accountHolderName'), accountNumber: formData.get('accountNumber'),
// //       ifscCode: formData.get('ifscCode'), admissionDate, admissionTime,
// //       admissionWeight, admissionHeight, 
// //       admissionMuac: showMuac ? formData.get('admissionMuac') : null, 
// //       zScore: zScore, admissionOdema, breastFeeding, complementaryFeeding, appetiteTest,
// //       medicalComplications: finalComplications
// //     };

// //     try {
// //       const response = await fetch(`/api/child-registration/${childId}`, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload)
// //       });
      
// //       if (!response.ok) throw new Error('Failed to update registration');
      
// //       toast.success("Patient updated successfully!");
// //       setTimeout(() => router.push('/mtc-user/dashboard/child-registration'), 1000);
      
// //     } catch (error) {
// //       toast.error("An error occurred while updating.");
// //       setLoading(false);
// //     }
// //   };

// //   if (!mounted || !childData) {
// //     return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
// //       <Loader2 className="animate-spin text-indigo-600 w-8 h-8" />
// //     </div>;
// //   }

// //   const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
// //     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
// //       <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Icon size={20} strokeWidth={2.5} /></div>
// //       <h2 className="text-lg font-bold text-slate-800">{title}</h2>
// //     </div>
// //   );

// //   return (
// //     <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans pb-28">
// //       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
      
// //       <div className="max-w-6xl mx-auto">
// //         <div className="mb-2 flex items-center">
// //           <Button variant="ghost" onClick={() => router.push('/mtc-user/dashboard/child-registration')} type="button" className="pl-0 text-slate-500 hover:text-indigo-600 hover:bg-transparent">
// //             <ArrowLeft className="w-5 h-5 mr-2" /> Back
// //           </Button>
// //         </div>

// //         <div className="mb-8 text-center md:text-left md:flex md:items-end md:justify-between">
// //           <div>
// //             <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Edit Child Record</h1>
// //             <p className="mt-2 text-sm text-slate-500">Update the information directly in the database.</p>
// //           </div>
// //           <div className="mt-4 md:mt-0 px-5 py-3 bg-white rounded-xl shadow-sm border border-slate-200 inline-block text-center md:text-right">
// //             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">SAM Number</span>
// //             <span className="text-lg font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md">{childData.samNumber}</span>
// //           </div>
// //         </div>

// //         <form onSubmit={handleSubmit} className="relative">
// //           <div className="space-y-6">

// //             {/* Admission Info */}
// //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// //               <CardContent className="p-6 sm:p-8">
// //                 <SectionTitle icon={ClipboardCheck} title="Admission Details" />
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //                   <div>
// //                     <Label>Admission Type <span className="text-red-500">*</span></Label>
// //                     <Select name="admissionType" value={admissionType} onValueChange={setAdmissionType} required>
// //                       <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.admissionTypes.map((type: any) => (<SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div>
// //                     <Label>Referred By</Label>
// //                     <Select name="referredBy" value={referredBy} onValueChange={setReferredBy}>
// //                       <SelectTrigger><SelectValue placeholder="Select Origin" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.referredBy.map((ref: any) => (<SelectItem key={ref.id} value={ref.id.toString()}>{ref.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                   {showAshaFields && (
// //                     <>
// //                       <div>
// //                         <Label>Name of Sahiya/Asha</Label>
// //                         <Input name="referredByName" defaultValue={childData.referredByName || childData.parentName} placeholder="Enter Name" />
// //                       </div>
// //                       <div>
// //                         <Label>Sahiya/Asha Mobile</Label>
// //                         <Input name="referredByMobile" defaultValue={childData.referredByMobile || childData.mobileNumber} type="tel" maxLength={10} pattern="[0-9]{10}" />
// //                       </div>
// //                     </>
// //                   )}
// //                   <div>
// //                     <Label>Admission Date <span className="text-red-500">*</span></Label>
// //                     <Input type="date" name="admissionDate" value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} required />
// //                   </div>
// //                   <div>
// //                     <Label>Admission Time <span className="text-red-500">*</span></Label>
// //                     <div className="relative">
// //                       <Input name="admissionTime" type="time" value={admissionTime} onChange={(e) => setAdmissionTime(e.target.value)} required className="pr-10" />
// //                       <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
// //                     </div>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Personal Info */}
// //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// //               <CardContent className="p-6 sm:p-8">
// //                 <SectionTitle icon={Baby} title="Child & Guardian Information" />
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //                   <div className="lg:col-span-2">
// //                     <Label>Child Full Name <span className="text-red-500">*</span></Label>
// //                     <Input name="childName" defaultValue={childData.childName} required />
// //                   </div>
// //                   <div className="lg:col-span-2">
// //                     <Label>Date of Birth</Label>
// //                     <Input type="date" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
// //                   </div>
// //                   <div>
// //                     <Label>Age (Years) <span className="text-red-500">*</span></Label>
// //                     <Input type="number" min="0" value={ageYears} onChange={(e) => setAgeYears(e.target.value)} required />
// //                   </div>
// //                   <div>
// //                     <Label>Age (Months) <span className="text-red-500">*</span></Label>
// //                     <Input type="number" min="0" max="11" value={ageMonths} onChange={(e) => setAgeMonths(e.target.value)} required />
// //                   </div>
// //                   <div className="lg:col-span-2">
// //                     <Label>Sex <span className="text-red-500">*</span></Label>
// //                     <Select name="sex" value={sex} onValueChange={setSex} required>
// //                       <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.sexes.map((s: any) => (<SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div className="lg:col-span-2">
// //                     <Label>Mother's Name <span className="text-red-500">*</span></Label>
// //                     <Input name="motherName" defaultValue={childData.motherName} required />
// //                   </div>
// //                   <div className="lg:col-span-2">
// //                     <Label>Name of Caretaker / Guardian <span className="text-red-500">*</span></Label>
// //                     <Input name="parentName" defaultValue={childData.parentName} required />
// //                   </div>
// //                   <div>
// //                     <Label>Relationship <span className="text-red-500">*</span></Label>
// //                     <Select name="relationship" value={relationship} onValueChange={setRelationship} required>
// //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.relationships.map((rel: any) => (<SelectItem key={rel.id} value={rel.id.toString()}>{rel.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div>
// //                     <Label>Mobile Number <span className="text-red-500">*</span></Label>
// //                     <Input name="mobileNumber" defaultValue={childData.mobileNumber} type="tel" maxLength={10} pattern="[0-9]{10}" required />
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Financial Details */}
// //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// //               <CardContent className="p-6 sm:p-8">
// //                 <SectionTitle icon={ShieldCheck} title="Identity & Financial Details" />
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //                   <div>
// //                     <Label>Parent Aadhaar Number</Label>
// //                     <Input name="aadhaarNumber" defaultValue={childData.aadhaarNumber} maxLength={12} pattern="[0-9]{12}" />
// //                   </div>
// //                   <div>
// //                     <Label>BPL Number</Label>
// //                     <Input name="bplNumber" defaultValue={childData.bplNumber} />
// //                   </div>
// //                   <div>
// //                     <Label>Caste <span className="text-red-500">*</span></Label>
// //                     <Select name="caste" value={caste} onValueChange={setCaste} required>
// //                       <SelectTrigger><SelectValue placeholder="Select Caste" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.castes.map((caste: any) => (<SelectItem key={caste.id} value={caste.id.toString()}>{caste.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div className="lg:col-span-4 mt-2">
// //                     <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
// //                       <Landmark className="w-4 h-4 text-indigo-500" /> Bank Account Details
// //                     </h3>
// //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
// //                       <div><Label>Bank Name</Label><Input name="bankName" defaultValue={childData.bankName} className="bg-white" /></div>
// //                       <div><Label>Account Holder</Label><Input name="accountHolderName" defaultValue={childData.accountHolderName} className="bg-white" /></div>
// //                       <div><Label>Account Number</Label><Input name="accountNumber" defaultValue={childData.accountNumber} className="bg-white" /></div>
// //                       <div><Label>IFSC Code</Label><Input name="ifscCode" defaultValue={childData.ifscCode} className="bg-white" /></div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* DEPENDENT LOCATION DETAILS */}
// //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// //               <CardContent className="p-6 sm:p-8">
// //                 <SectionTitle icon={MapPin} title="Location Details" />
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                   <div className="lg:col-span-3">
// //                     <Label>Full Address <span className="text-red-500">*</span></Label>
// //                     <Textarea name="address" defaultValue={childData.address} rows={2} required />
// //                   </div>
// //                   <div>
// //                     <Label>District <span className="text-red-500">*</span></Label>
// //                     <Select 
// //                       name="district" 
// //                       value={district} 
// //                       onValueChange={(val: string) => {
// //                         setDistrict(val);
// //                         setBlock(""); 
// //                       }} 
// //                       required
// //                     >
// //                       <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.districts.map((dist: any) => (<SelectItem key={dist.id} value={dist.id.toString()}>{dist.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div>
// //                     <Label>Block</Label>
// //                     <Select 
// //                       name="block" 
// //                       value={block} 
// //                       onValueChange={setBlock}
// //                       disabled={!district} 
// //                     >
// //                       <SelectTrigger>
// //                         <SelectValue placeholder={district ? "Select Block" : "Select District First"} />
// //                       </SelectTrigger>
// //                       <SelectContent>
// //                         {filteredBlocks.map((b: any) => (<SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div>
// //                     <Label>Village</Label>
// //                     <Input name="village" defaultValue={childData.village} />
// //                   </div>
// //                   <div>
// //                     <Label>ICDS Project</Label>
// //                     <Select name="icdsProject" value={icdsProject} onValueChange={setIcdsProject}>
// //                       <SelectTrigger><SelectValue placeholder="Select Project" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.icdsProjects.map((project: any) => (<SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div className="lg:col-span-2">
// //                     <Label>Anganwadi Center</Label>
// //                     <Select name="anganwadiCenter" value={anganwadiCenter} onValueChange={setAnganwadiCenter}>
// //                       <SelectTrigger><SelectValue placeholder="Select Center" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.anganwadis.map((center: any) => (<SelectItem key={center.id} value={center.id.toString()}>{center.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Anthropometry Details */}
// //             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// //               <CardContent className="p-6 sm:p-8">
// //                 <SectionTitle icon={Activity} title="Anthropometry & Feeding" />
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //                   <div>
// //                     <Label>Admission Weight (kg) <span className="text-red-500">*</span></Label>
// //                     <Input name="admissionWeight" type="number" step="0.1" value={admissionWeight} onChange={(e) => setAdmissionWeight(e.target.value)} required />
// //                   </div>
// //                   <div>
// //                     <Label>Length/Height (cm) <span className="text-red-500">*</span></Label>
// //                     <Input name="admissionHeight" type="number" step="0.1" value={admissionHeight} onChange={(e) => setAdmissionHeight(e.target.value)} required />
// //                   </div>
                  
// //                   {/* ---> CONDITIONAL MUAC FIELD <--- */}
// //                   {showMuac && (
// //                     <div>
// //                       <Label>MUAC (cm) <span className="text-red-500">*</span></Label>
// //                       <Input name="admissionMuac" type="number" step="0.1" defaultValue={childData.admissionMuac} required />
// //                     </div>
// //                   )}

// //                   <div>
// //                     <Label>Z-Score (SD)</Label>
// //                     <Input name="zScore" readOnly value={zScore} className={cn("font-semibold focus:ring-0 cursor-not-allowed", zScore === "Error" ? "bg-red-50 text-red-600" : "bg-slate-100 text-indigo-700")} />
// //                   </div>
// //                   <div>
// //                     <Label>Admission Odema <span className="text-red-500">*</span></Label>
// //                     <Select name="admissionOdema" value={admissionOdema} onValueChange={setAdmissionOdema} required>
// //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.odemas.map((odema: any) => (<SelectItem key={odema.id} value={odema.id.toString()}>{odema.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div>
// //                     <Label>Breast Feeding <span className="text-red-500">*</span></Label>
// //                     <Select name="breastFeeding" value={breastFeeding} onValueChange={setBreastFeeding} required>
// //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.breastFeeding.map((bf: any) => (<SelectItem key={bf.id} value={bf.id.toString()}>{bf.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div>
// //                     <Label>Complementary Feeding <span className="text-red-500">*</span></Label>
// //                     <Select name="complementaryFeeding" value={complementaryFeeding} onValueChange={setComplementaryFeeding} required>
// //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                       <SelectContent>
// //                         <SelectItem value="1">Yes</SelectItem><SelectItem value="2">No</SelectItem>
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div>
// //                     <Label>Appetite Test <span className="text-red-500">*</span></Label>
// //                     <Select name="appetiteTest" value={appetiteTest} onValueChange={setAppetiteTest} required>
// //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.appetiteTests.map((at: any) => (<SelectItem key={at.id} value={at.id.toString()}>{at.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// //               <CardContent className="p-6 sm:p-8">
// //                 <SectionTitle icon={Stethoscope} title="Medical Complications" />
// //                 <p className="text-sm font-semibold text-slate-700 mb-4 block">Select all present complications: <span className="text-red-500">*</span></p>
                
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 bg-slate-50/50 p-6 rounded-xl border border-slate-200">
// //                   {MEDICAL_COMPLICATIONS_LIST.map((comp) => (
// //                     <label key={comp} className="flex items-start space-x-3 cursor-pointer group">
// //                       <div className="flex items-center h-5">
// //                         <input
// //                           type="checkbox"
// //                           className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/30 transition duration-150 ease-in-out cursor-pointer"
// //                           checked={selectedComplications.includes(comp)}
// //                           onChange={() => handleComplicationToggle(comp)}
// //                         />
// //                       </div>
// //                       <span className="text-sm font-medium text-slate-600 leading-tight group-hover:text-slate-900 transition-colors">
// //                         {comp}
// //                       </span>
// //                     </label>
// //                   ))}
// //                 </div>

// //                 {/* ---> DYNAMIC OTHERS TEXT BOX <--- */}
// //                 {selectedComplications.includes("OTHERS") && (
// //                   <div className="mt-5 p-5 bg-indigo-50/50 rounded-xl border border-indigo-100">
// //                     <Label className="text-indigo-900">Please specify 'Others' complication details <span className="text-red-500">*</span></Label>
// //                     <Input 
// //                       value={otherComplicationDetail}
// //                       onChange={(e) => setOtherComplicationDetail(e.target.value)}
// //                       placeholder="e.g., Asthma, Severe Jaundice..."
// //                       className="mt-2 bg-white"
// //                       required={selectedComplications.includes("OTHERS")}
// //                     />
// //                   </div>
// //                 )}

// //               </CardContent>
// //             </Card>

// //           </div>

// //           <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 p-4 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 flex justify-end gap-4 sm:justify-center md:justify-end md:px-12">
// //             <Button variant="ghost" onClick={() => router.push('/mtc-user/dashboard/child-registration')} type="button">Cancel</Button>
// //             <Button type="submit" disabled={loading || zScore === "Error"} className="min-w-40">
// //               {loading ? "Saving to Database..." : "Update Patient"}
// //             </Button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { Clock, Landmark, ClipboardCheck, MapPin, Activity, Stethoscope, Baby, ShieldCheck, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// // --- TypeScript Interfaces ---
// interface DropdownItem {
//   id: number | string;
//   name: string;
//   districtId?: number | string;
// }

// interface MasterDataState {
//   admissionTypes: DropdownItem[];
//   referredBy: DropdownItem[];
//   castes: DropdownItem[];
//   districts: DropdownItem[];
//   sexes: DropdownItem[];
//   relationships: DropdownItem[];
//   odemas: DropdownItem[];
//   breastFeeding: DropdownItem[];
//   appetiteTests: DropdownItem[];
//   blocks: DropdownItem[];
//   icdsProjects: DropdownItem[];
//   anganwadis: DropdownItem[];
// }

// // --- Reusable UI Components ---
// const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
//   ({ className, type, ...props }, ref) => (
//     <input type={type} className={cn("flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
//   )
// );
// Input.displayName = "Input";

// const Button = React.forwardRef<any, any>(
//   ({ className, variant = 'default', href, ...props }, ref) => {
//     const classes = cn(
//       "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
//       variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
//       variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
//       variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
//       className
//     );
//     if (href) return <a href={href} className={classes} ref={ref} {...props} />;
//     return <button ref={ref} className={classes} {...props} />;
//   }
// );
// Button.displayName = "Button";

// const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div className={cn("rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm", className)} {...props} />
// );
// const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div className={cn("p-6 md:p-8", className)} {...props} />
// );
// const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
//   ({ className, ...props }, ref) => (
//     <label ref={ref} className={cn("text-sm font-semibold text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block", className)} {...props} />
//   )
// );
// Label.displayName = "Label";

// const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
//   ({ className, ...props }, ref) => (
//     <textarea className={cn("flex min-h-20 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
//   )
// );
// Textarea.displayName = "Textarea";

// const Select = ({ name, value, onValueChange, required, children, disabled }: any) => {
//   const [internalValue, setInternalValue] = useState(value || "");
  
//   useEffect(() => {
//     if (value !== undefined) setInternalValue(value);
//   }, [value]);

//   const options: {value: string, label: string}[] = [];
//   let placeholder = "Select";
  
//   React.Children.forEach(children, child => {
//     if (child && child.type?.name === 'SelectTrigger') {
//       React.Children.forEach(child.props.children, triggerChild => {
//         if (triggerChild && triggerChild.type?.name === 'SelectValue') {
//           placeholder = triggerChild.props.placeholder || "Select";
//         }
//       });
//     }
//     if (child && child.type?.name === 'SelectContent') {
//       const contentChildren = Array.isArray(child.props.children) ? child.props.children.flat() : [child.props.children];
//       React.Children.forEach(contentChildren, itemChild => {
//         if (itemChild && itemChild.type?.name === 'SelectItem') {
//           options.push({ value: itemChild.props.value, label: itemChild.props.children });
//         }
//       });
//     }
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setInternalValue(e.target.value);
//     if (onValueChange) onValueChange(e.target.value);
//   };

//   return (
//     <select name={name} value={internalValue} onChange={handleChange} required={required} disabled={disabled} className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100 appearance-none">
//       <option value="" disabled>{placeholder}</option>
//       {options.map((opt, i) => (<option key={i} value={opt.value}>{opt.label}</option>))}
//     </select>
//   );
// };
// const SelectTrigger = ({ children }: any) => <>{children}</>;
// const SelectValue = ({ placeholder }: any) => <>{placeholder}</>;
// const SelectContent = ({ children }: any) => <>{children}</>;
// const SelectItem = ({ children, value }: any) => <>{children}</>;

// // --- Constants & Math Functions ---
// const MEDICAL_COMPLICATIONS_LIST = [
//   "NO COMPLICATION", "PRESENCE OF ANY OF EMERGENCY SIGNS", "VERY WEAK, APATHETIC",
//   "ODEMA OF BOTH FEET", "SEVERE PALMAR PALLOR", "SICK YOUNG INFANT LESS THAN 2 MONTHS",
//   "LETHARGY/ DROWSINESS/ UNCONSCIOUSNESS", "CONTINUALLY IRRITABLE AND RESTLESS", "ANY RESPIRATORY DISTRESS",
//   "SEVERE DEHYDRATION WITH DIARRHOEA", "PERSISTENT VOMITING", "HYPOTHERMIA (<35°C)",
//   "SEVERE ANEMIA", "FEVER (>38.5°C)", "EXTENSIVE SKIN LESIONS",
//   "TUBERCULOSIS", "MALARIA", "OTHERS"
// ];

// const calculateZScore = (weight: number, height: number, sex: string) => {
//   if (!weight || !height || height <= 0) return "";
//   const score = (weight / (height / 100) ** 2) - 15;
//   if (!isFinite(score) || score > 99 || score < -99) return "Error";
//   return score.toFixed(2);
// };

// // --- Main Application ---
// export default function EditChildRegistration() {
//   const router = useRouter();
//   const params = useParams();
//   const childId = params.id as string;

//   const [loading, setLoading] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [childData, setChildData] = useState<any>(null);
  
//   // ✅ MTC Identity States
//   const [userMtcId, setUserMtcId] = useState<number | null>(null);
//   const [userMtcCode, setUserMtcCode] = useState<string>("");

//   const [masterData, setMasterData] = useState<MasterDataState>({
//     admissionTypes: [], referredBy: [], castes: [], districts: [],
//     sexes: [], relationships: [], odemas: [], breastFeeding: [], appetiteTests: [],
//     blocks: [], icdsProjects: [], anganwadis: []
//   });

//   const [admissionType, setAdmissionType] = useState("");
//   const [referredBy, setReferredBy] = useState("");
//   const [showAshaFields, setShowAshaFields] = useState(false);
  
//   // ✅ SAAMAR Control States
//   const [showSamarTracker, setShowSamarTracker] = useState(false);
//   const [isSamar, setIsSamar] = useState<string>("no");
//   const [samarUuid, setSamarUuid] = useState<string>("");

//   const [selectedComplications, setSelectedComplications] = useState<string[]>([]);
//   const [otherComplicationDetail, setOtherComplicationDetail] = useState(""); 
  
//   const [dateOfBirth, setDateOfBirth] = useState<string>("");
//   const [admissionDate, setAdmissionDate] = useState<string>("");
//   const [admissionTime, setAdmissionTime] = useState<string>("");
//   const [ageYears, setAgeYears] = useState<string>(""); 
//   const [ageMonths, setAgeMonths] = useState<string>(""); 

//   const [sex, setSex] = useState<string>("");
//   const [admissionWeight, setAdmissionWeight] = useState<string>("");
//   const [admissionHeight, setAdmissionHeight] = useState<string>("");
//   const [zScore, setZScore] = useState<string>("");

//   const [caste, setCaste] = useState("");
//   const [district, setDistrict] = useState("");
//   const [block, setBlock] = useState("");
//   const [icdsProject, setIcdsProject] = useState("");
//   const [anganwadiCenter, setAnganwadiCenter] = useState("");
//   const [relationship, setRelationship] = useState("");
  
//   const [admissionOdema, setAdmissionOdema] = useState("");
//   const [breastFeeding, setBreastFeeding] = useState("");
//   const [complementaryFeeding, setComplementaryFeeding] = useState("");
//   const [appetiteTest, setAppetiteTest] = useState("");

//   const showMuac = !(ageYears === "0" && parseInt(ageMonths || "0") <= 6);

//   useEffect(() => {
//     setMounted(true);
    
//     // ✅ 1. Read MTC Identity from Session
//     const sessionData = sessionStorage.getItem("mtc_user");
//     if (sessionData) {
//       try {
//         const user = JSON.parse(sessionData);
//         setUserMtcId(user.mtcId || null);
//         setUserMtcCode(user.mtcCode || "");
//       } catch (err) {
//         console.error("Session parse error", err);
//       }
//     }
    
//     // Fetch Master Data
//     const fetchMasterData = async () => {
//       try {
//         const response = await fetch('/api/master-data');
//         if (response.ok) {
//           const data = await response.json();
//           // ✅ SAFE MERGE: Prevents undefined crashes if API misses a key
//           setMasterData(prev => ({ ...prev, ...data }));
//         }
//       } catch (error) {
//         toast.error("Failed to load dropdown options.");
//       }
//     };
    
//     // Fetch Specific Child Data
//     const fetchChildData = async () => {
//       try {
//         const response = await fetch(`/api/child-registration/${childId}`);
//         if (response.ok) {
//           const patient = await response.json();
//           setChildData(patient);
          
//           setAdmissionType(patient.admissionType?.toString() || "");
//           setReferredBy(patient.referredBy?.toString() || "");
//           setSex(patient.sex?.toString() || "");
//           setRelationship(patient.relationship?.toString() || "");
//           setCaste(patient.caste?.toString() || "");
//           setDistrict(patient.district?.toString() || "");
//           setBlock(patient.block?.toString() || "");
//           setIcdsProject(patient.icdsProject?.toString() || "");
//           setAnganwadiCenter(patient.anganwadiCenter?.toString() || "");
          
//           setDateOfBirth(patient.dateOfBirth || "");
//           setAdmissionDate(patient.admissionDate || "");
//           setAdmissionTime(patient.admissionTime || "");
//           setAgeYears(patient.ageYears?.toString() || "");
//           setAgeMonths(patient.ageMonths?.toString() || "");
          
//           setAdmissionWeight(patient.admissionWeight?.toString() || "");
//           setAdmissionHeight(patient.admissionHeight?.toString() || "");
//           setZScore(patient.zScore?.toString() || "");
          
//           setAdmissionOdema(patient.admissionOdema?.toString() || "");
//           setBreastFeeding(patient.breastFeeding?.toString() || "");
//           setComplementaryFeeding(patient.complementaryFeeding?.toString() || "");
//           setAppetiteTest(patient.appetiteTest?.toString() || "");

//           // Load SAAMAR Data if it exists
//           if (patient.isSamarRegistered) {
//             setIsSamar("yes");
//             setSamarUuid(patient.samarUuid || "");
//           } else {
//             setIsSamar("no");
//           }
          
//           const comps = patient.medicalComplications || [];
//           const standardComps: string[] = [];
//           let othersText = "";
          
//           comps.forEach((c: string) => {
//             if (c.startsWith("OTHERS: ")) { 
//               standardComps.push("OTHERS"); 
//               othersText = c.replace("OTHERS: ", ""); 
//             } else if (c === "OTHERS") {
//               standardComps.push("OTHERS");
//             } else {
//               standardComps.push(c);
//             }
//           });
          
//           setSelectedComplications(standardComps);
//           setOtherComplicationDetail(othersText);

//         } else {
//           toast.error("Patient not found!");
//           router.push('/mtc-user/dashboard/child-registration');
//         }
//       } catch (error) {
//         toast.error("Error loading patient data.");
//       }
//     };

//     fetchMasterData();
//     if (childId) fetchChildData();
//   }, [childId, router]);

//   useEffect(() => {
//     if (admissionWeight && admissionHeight && sex) {
//       const score = calculateZScore(parseFloat(admissionWeight), parseFloat(admissionHeight), sex);
//       setZScore(score ? String(score) : "");
//     } else {
//       setZScore("");
//     }
//   }, [admissionWeight, admissionHeight, sex]);

//   // --- Dependency Logic for Referral & SAAMAR ---
//   useEffect(() => {
//     setShowAshaFields(referredBy === "6");
    
//     // Check if the selected referral type is "Other" or "SAAMAR"
//     if (!masterData.referredBy.length || !referredBy) return;

//     const selectedRef = masterData.referredBy.find((r: DropdownItem) => r.id.toString() === referredBy);
//     const isOther = selectedRef && (
//       selectedRef.name.toLowerCase().includes('other') || 
//       selectedRef.name.toLowerCase().includes('saamar') ||
//       selectedRef.name.toLowerCase().includes('samar')
//     );
    
//     setShowSamarTracker(!!isOther);

//   }, [referredBy, masterData.referredBy]);

//   const handleComplicationToggle = (comp: string) => {
//     setSelectedComplications(prev => {
//       if (comp === "OTHERS" && prev.includes("OTHERS")) {
//         setOtherComplicationDetail(""); // Clear text if unchecked
//       }
//       return prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp];
//     });
//   };

//   // ✅ SAFE FILTER: Protects against undefined "masterData.blocks"
//   const filteredBlocks = (masterData.blocks || []).filter((b: DropdownItem) => 
//     !district || b.districtId?.toString() === district
//   );

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (zScore === "Error") {
//       toast.error("Invalid Anthropometry data. Please check Height/Weight.");
//       return;
//     }
//     if (selectedComplications.length === 0) {
//       toast.error("Please select at least one medical complication status.");
//       return;
//     }
//     if (selectedComplications.includes("OTHERS") && !otherComplicationDetail.trim()) {
//       toast.error("Please specify the details for the 'Others' complication.");
//       return;
//     }
//     if (showSamarTracker && isSamar === "yes" && !samarUuid.trim()) {
//       toast.error("Please enter the SAAMAR Child UUID."); return;
//     }
    
//     if (!userMtcId) {
//       toast.error("Security Error: Unknown MTC ID. Please log out and log back in.");
//       return;
//     }

//     setLoading(true);

//     let finalComplications = [...selectedComplications];
//     if (finalComplications.includes("OTHERS")) {
//       finalComplications = finalComplications.filter(c => c !== "OTHERS");
//       finalComplications.push(`OTHERS: ${otherComplicationDetail.trim()}`);
//     }

//     const formData = new FormData(e.currentTarget as HTMLFormElement);
    
//     const payload = {
//       mtcId: userMtcId, // ✅ Secured MTC DB association
//       isSamarRegistered: showSamarTracker && isSamar === "yes", 
//       samarUuid: (showSamarTracker && isSamar === "yes") ? samarUuid : null,
//       admissionType, referredBy,
//       referredByName: formData.get('referredByName'), referredByMobile: formData.get('referredByMobile'),
//       childName: formData.get('childName'), 
//       motherName: formData.get('motherName'), 
//       parentName: formData.get('parentName'),
//       relationship, mobileNumber: formData.get('mobileNumber'),
//       bplNumber: formData.get('bplNumber'), dateOfBirth, sex,
//       ageYears: ageYears, ageMonths: ageMonths,
//       address: formData.get('address'), caste, district, block, 
//       icdsProject, anganwadiCenter, village: formData.get('village'),
//       aadhaarNumber: formData.get('aadhaarNumber'), bankName: formData.get('bankName'),
//       accountHolderName: formData.get('accountHolderName'), accountNumber: formData.get('accountNumber'),
//       ifscCode: formData.get('ifscCode'), admissionDate, admissionTime,
//       admissionWeight, admissionHeight, 
//       admissionMuac: showMuac ? formData.get('admissionMuac') : null, 
//       zScore: zScore, admissionOdema, breastFeeding, complementaryFeeding, appetiteTest,
//       medicalComplications: finalComplications
//     };

//     try {
//       const response = await fetch(`/api/child-registration/${childId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });
      
//       if (!response.ok) throw new Error('Failed to update registration');
      
//       toast.success("Patient updated successfully!");
//       setTimeout(() => router.push('/mtc-user/dashboard/child-registration'), 1000);
      
//     } catch (error) {
//       toast.error("An error occurred while updating.");
//       setLoading(false);
//     }
//   };

//   if (!mounted || !childData) {
//     return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//       <Loader2 className="animate-spin text-indigo-600 w-8 h-8" />
//     </div>;
//   }

//   const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
//     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
//       <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Icon size={20} strokeWidth={2.5} /></div>
//       <h2 className="text-lg font-bold text-slate-800">{title}</h2>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans pb-28">
//       <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
      
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-2 flex items-center">
//           <Button variant="ghost" onClick={() => router.push('/mtc-user/dashboard/child-registration')} type="button" className="pl-0 text-slate-500 hover:text-indigo-600 hover:bg-transparent">
//             <ArrowLeft className="w-5 h-5 mr-2" /> Back
//           </Button>
//         </div>

//         <div className="mb-8 text-center md:text-left md:flex md:items-end md:justify-between">
//           <div>
//             <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Edit Child Record</h1>
//             <p className="mt-2 text-sm text-slate-500">Update the information directly in the database.</p>
//           </div>
//           <div className="mt-4 md:mt-0 px-5 py-3 bg-white rounded-xl shadow-sm border border-slate-200 inline-block text-center md:text-right">
//             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">SAM Number</span>
//             <span className="text-lg font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md">{childData.samNumber}</span>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="relative">
//           <div className="space-y-6">

//             {/* Admission Info */}
//             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
//               <CardContent className="p-6 sm:p-8">
//                 <SectionTitle icon={ClipboardCheck} title="Admission Details" />
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
//                   <div>
//                     <Label>Admission Type <span className="text-red-500">*</span></Label>
//                     <Select name="admissionType" value={admissionType} onValueChange={setAdmissionType} required>
//                       <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
//                       <SelectContent>
//                         {masterData.admissionTypes.map((type: DropdownItem) => (<SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <Label>Referred By <span className="text-red-500">*</span></Label>
//                     <Select name="referredBy" value={referredBy} onValueChange={(val: string) => {
//                       setReferredBy(val);
//                       const selectedRef = masterData.referredBy.find((r: DropdownItem) => r.id.toString() === val);
//                       const isOther = selectedRef && (
//                         selectedRef.name.toLowerCase().includes('other') || 
//                         selectedRef.name.toLowerCase().includes('saamar') ||
//                         selectedRef.name.toLowerCase().includes('samar')
//                       );
//                       if (!isOther) {
//                         setIsSamar("no");
//                         setSamarUuid("");
//                       }
//                     }} required>
//                       <SelectTrigger><SelectValue placeholder="Select Origin" /></SelectTrigger>
//                       <SelectContent>
//                         {masterData.referredBy.map((ref: DropdownItem) => (<SelectItem key={ref.id} value={ref.id.toString()}>{ref.name}</SelectItem>))}
//                       </SelectContent>
//                     </Select>
//                   </div>
                  
//                   {showAshaFields && (
//                     <>
//                       <div>
//                         <Label>Name of Sahiya/Asha</Label>
//                         <Input name="referredByName" defaultValue={childData.referredByName || childData.parentName} placeholder="Enter Name" />
//                       </div>
//                       <div>
//                         <Label>Sahiya/Asha Mobile</Label>
//                         <Input name="referredByMobile" defaultValue={childData.referredByMobile || childData.mobileNumber} type="tel" maxLength={10} pattern="[0-9]{10}" />
//                       </div>
//                     </>
//                   )}
//                   <div>
//                     <Label>Admission Date <span className="text-red-500">*</span></Label>
//                     <Input type="date" name="admissionDate" value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} required />
//                   </div>
//                   <div>
//                     <Label>Admission Time <span className="text-red-500">*</span></Label>
//                     <div className="relative">
//                       <Input name="admissionTime" type="time" value={admissionTime} onChange={(e) => setAdmissionTime(e.target.value)} required className="pr-10" />
//                       <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
//                     </div>
//                   </div>

//                   {/* --- SAAMAR TRACKER LOGIC --- */}
//                   {showSamarTracker && (
//                     <div className="lg:col-span-4 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex flex-col md:flex-row gap-4 items-end animate-in fade-in zoom-in duration-200 mt-2">
//                       <div className="flex-1 w-full md:max-w-xs">
//                         <Label className="text-indigo-800">Registered in SAAMAR? <span className="text-red-500">*</span></Label>
//                         <Select name="isSamar" value={isSamar} onValueChange={(val: string) => { setIsSamar(val); if(val === "no") setSamarUuid(""); }} required={showSamarTracker}>
//                           <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="yes">Yes</SelectItem>
//                             <SelectItem value="no">No</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
                      
//                       {isSamar === "yes" && (
//                         <div className="flex-1 w-full">
//                           <Label className="text-indigo-800">SAAMAR Child UUID <span className="text-red-500">*</span></Label>
//                           <Input name="samarUuid" value={samarUuid} onChange={(e) => setSamarUuid(e.target.value)} placeholder="Enter UUID" className="bg-white" required />
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Personal Info */}
//             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
//               <CardContent className="p-6 sm:p-8">
//                 <SectionTitle icon={Baby} title="Child & Guardian Information" />
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                   <div className="lg:col-span-2">
//                     <Label>Child Full Name <span className="text-red-500">*</span></Label>
//                     <Input name="childName" defaultValue={childData.childName} required />
//                   </div>
//                   <div className="lg:col-span-2">
//                     <Label>Date of Birth</Label>
//                     <Input type="date" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
//                   </div>
//                   <div>
//                     <Label>Age (Years) <span className="text-red-500">*</span></Label>
//                     <Input type="number" min="0" value={ageYears} onChange={(e) => setAgeYears(e.target.value)} required />
//                   </div>
//                   <div>
//                     <Label>Age (Months) <span className="text-red-500">*</span></Label>
//                     <Input type="number" min="0" max="11" value={ageMonths} onChange={(e) => setAgeMonths(e.target.value)} required />
//                   </div>
//                   <div className="lg:col-span-2">
//                     <Label>Sex <span className="text-red-500">*</span></Label>
//                     <Select name="sex" value={sex} onValueChange={setSex} required>
//                       <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
//                       <SelectContent>
//                         {masterData.sexes.map((s: DropdownItem) => (<SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="lg:col-span-2">
//                     <Label>Mother's Name <span className="text-red-500">*</span></Label>
//                     <Input name="motherName" defaultValue={childData.motherName} required />
//                   </div>
//                   <div className="lg:col-span-2">
//                     <Label>Name of Caretaker / Guardian <span className="text-red-500">*</span></Label>
//                     <Input name="parentName" defaultValue={childData.parentName} required />
//                   </div>
//                   <div>
//                     <Label>Relationship <span className="text-red-500">*</span></Label>
//                     <Select name="relationship" value={relationship} onValueChange={setRelationship} required>
//                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                       <SelectContent>
//                         {masterData.relationships.map((rel: DropdownItem) => (<SelectItem key={rel.id} value={rel.id.toString()}>{rel.name}</SelectItem>))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <Label>Mobile Number <span className="text-red-500">*</span></Label>
//                     <Input name="mobileNumber" defaultValue={childData.mobileNumber} type="tel" maxLength={10} pattern="[0-9]{10}" required />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Financial Details */}
//             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
//               <CardContent className="p-6 sm:p-8">
//                 <SectionTitle icon={ShieldCheck} title="Identity & Financial Details" />
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                   <div>
//                     <Label>Parent Aadhaar Number</Label>
//                     <Input name="aadhaarNumber" defaultValue={childData.aadhaarNumber} maxLength={12} pattern="[0-9]{12}" />
//                   </div>
//                   <div>
//                     <Label>BPL Number</Label>
//                     <Input name="bplNumber" defaultValue={childData.bplNumber} />
//                   </div>
//                   <div>
//                     <Label>Caste <span className="text-red-500">*</span></Label>
//                     <Select name="caste" value={caste} onValueChange={setCaste} required>
//                       <SelectTrigger><SelectValue placeholder="Select Caste" /></SelectTrigger>
//                       <SelectContent>
//                         {masterData.castes.map((caste: DropdownItem) => (<SelectItem key={caste.id} value={caste.id.toString()}>{caste.name}</SelectItem>))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="lg:col-span-4 mt-2">
//                     <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
//                       <Landmark className="w-4 h-4 text-indigo-500" /> Bank Account Details
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
//                       <div><Label>Bank Name</Label><Input name="bankName" defaultValue={childData.bankName} className="bg-white" /></div>
//                       <div><Label>Account Holder</Label><Input name="accountHolderName" defaultValue={childData.accountHolderName} className="bg-white" /></div>
//                       <div><Label>Account Number</Label><Input name="accountNumber" defaultValue={childData.accountNumber} className="bg-white" /></div>
//                       <div><Label>IFSC Code</Label><Input name="ifscCode" defaultValue={childData.ifscCode} className="bg-white" /></div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* DEPENDENT LOCATION DETAILS */}
//             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
//               <CardContent className="p-6 sm:p-8">
//                 <SectionTitle icon={MapPin} title="Location Details" />
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   <div className="lg:col-span-3">
//                     <Label>Full Address <span className="text-red-500">*</span></Label>
//                     <Textarea name="address" defaultValue={childData.address} rows={2} required />
//                   </div>
//                   <div>
//                     <Label>District <span className="text-red-500">*</span></Label>
//                     <Select 
//                       name="district" 
//                       value={district} 
//                       onValueChange={(val: string) => {
//                         setDistrict(val);
//                         setBlock(""); 
//                       }} 
//                       required
//                     >
//                       <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
//                       <SelectContent>
//                         {masterData.districts.map((dist: DropdownItem) => (<SelectItem key={dist.id} value={dist.id.toString()}>{dist.name}</SelectItem>))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <Label>Block</Label>
//                     <Select 
//                       name="block" 
//                       value={block} 
//                       onValueChange={setBlock}
//                       disabled={!district} 
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder={district ? "Select Block" : "Select District First"} />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {filteredBlocks.map((b: DropdownItem) => (<SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <Label>Village</Label>
//                     <Input name="village" defaultValue={childData.village} />
//                   </div>
//                   <div>
//                     <Label>ICDS Project</Label>
//                     <Select name="icdsProject" value={icdsProject} onValueChange={setIcdsProject}>
//                       <SelectTrigger><SelectValue placeholder="Select Project" /></SelectTrigger>
//                       <SelectContent>
//                         {masterData.icdsProjects.map((project: DropdownItem) => (<SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="lg:col-span-2">
//                     <Label>Anganwadi Center</Label>
//                     <Select name="anganwadiCenter" value={anganwadiCenter} onValueChange={setAnganwadiCenter}>
//                       <SelectTrigger><SelectValue placeholder="Select Center" /></SelectTrigger>
//                       <SelectContent>
//                         {masterData.anganwadis.map((center: DropdownItem) => (<SelectItem key={center.id} value={center.id.toString()}>{center.name}</SelectItem>))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Anthropometry Details */}
//             <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
//               <CardContent className="p-6 sm:p-8">
//                 <SectionTitle icon={Activity} title="Anthropometry & Feeding" />
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                   <div>
//                     <Label>Admission Weight (kg) <span className="text-red-500">*</span></Label>
//                     <Input name="admissionWeight" type="number" step="0.1" value={admissionWeight} onChange={(e) => setAdmissionWeight(e.target.value)} required />
//                   </div>
//                   <div>
//                     <Label>Length/Height (cm) <span className="text-red-500">*</span></Label>
//                     <Input name="admissionHeight" type="number" step="0.1" value={admissionHeight} onChange={(e) => setAdmissionHeight(e.target.value)} required />
//                   </div>
                  
//                   {/* ---> CONDITIONAL MUAC FIELD <--- */}
//                   {showMuac && (
//                     <div>
//                       <Label>MUAC (cm) <span className="text-red-500">*</span></Label>
//                       <Input name="admissionMuac" type="number" step="0.1" defaultValue={childData.admissionMuac} required />
//                     </div>
//                   )}

//                   <div>
//                     <Label>Z-Score (SD)</Label>
//                     <Input name="zScore" readOnly value={zScore} className={cn("font-semibold focus:ring-0 cursor-not-allowed", zScore === "Error" ? "bg-red-50 text-red-600" : "bg-slate-100 text-indigo-700")} />
//                   </div>
//                   <div>
//                     <Label>Admission Odema <span className="text-red-500">*</span></Label>
//                     <Select name="admissionOdema" value={admissionOdema} onValueChange={setAdmissionOdema} required>
//                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                       <SelectContent>
//                         {masterData.odemas.map((odema: DropdownItem) => (<SelectItem key={odema.id} value={odema.id.toString()}>{odema.name}</SelectItem>))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <Label>Breast Feeding <span className="text-red-500">*</span></Label>
//                     <Select name="breastFeeding" value={breastFeeding} onValueChange={setBreastFeeding} required>
//                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                       <SelectContent>
//                         {masterData.breastFeeding.map((bf: DropdownItem) => (<SelectItem key={bf.id} value={bf.id.toString()}>{bf.name}</SelectItem>))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <Label>Complementary Feeding <span className="text-red-500">*</span></Label>
//                     <Select name="complementaryFeeding" value={complementaryFeeding} onValueChange={setComplementaryFeeding} required>
//                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="1">Yes</SelectItem><SelectItem value="2">No</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <Label>Appetite Test <span className="text-red-500">*</span></Label>
//                     <Select name="appetiteTest" value={appetiteTest} onValueChange={setAppetiteTest} required>
//                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                       <SelectContent>
//                         {masterData.appetiteTests.map((at: DropdownItem) => (<SelectItem key={at.id} value={at.id.toString()}>{at.name}</SelectItem>))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
//               <CardContent className="p-6 sm:p-8">
//                 <SectionTitle icon={Stethoscope} title="Medical Complications" />
//                 <p className="text-sm font-semibold text-slate-700 mb-4 block">Select all present complications: <span className="text-red-500">*</span></p>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 bg-slate-50/50 p-6 rounded-xl border border-slate-200">
//                   {MEDICAL_COMPLICATIONS_LIST.map((comp) => (
//                     <label key={comp} className="flex items-start space-x-3 cursor-pointer group">
//                       <div className="flex items-center h-5">
//                         <input
//                           type="checkbox"
//                           className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/30 transition duration-150 ease-in-out cursor-pointer"
//                           checked={selectedComplications.includes(comp)}
//                           onChange={() => handleComplicationToggle(comp)}
//                         />
//                       </div>
//                       <span className="text-sm font-medium text-slate-600 leading-tight group-hover:text-slate-900 transition-colors">
//                         {comp}
//                       </span>
//                     </label>
//                   ))}
//                 </div>

//                 {/* ---> DYNAMIC OTHERS TEXT BOX <--- */}
//                 {selectedComplications.includes("OTHERS") && (
//                   <div className="mt-5 p-5 bg-indigo-50/50 rounded-xl border border-indigo-100">
//                     <Label className="text-indigo-900">Please specify 'Others' complication details <span className="text-red-500">*</span></Label>
//                     <Input 
//                       value={otherComplicationDetail}
//                       onChange={(e) => setOtherComplicationDetail(e.target.value)}
//                       placeholder="e.g., Asthma, Severe Jaundice..."
//                       className="mt-2 bg-white"
//                       required={selectedComplications.includes("OTHERS")}
//                     />
//                   </div>
//                 )}

//               </CardContent>
//             </Card>

//           </div>

//           <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 p-4 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 flex justify-end gap-4 sm:justify-center md:justify-end md:px-12">
//             <Button variant="ghost" onClick={() => router.push('/mtc-user/dashboard/child-registration')} type="button" className="min-w-40">Cancel</Button>
//             <Button type="submit" disabled={loading || zScore === "Error"} className="min-w-40">
//               {loading ? "Saving to Database..." : "Update Patient"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Clock, Landmark, ClipboardCheck, MapPin, Activity, Stethoscope, Baby, ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TypeScript Interfaces ---
interface DropdownItem {
  id: number | string;
  name: string;
  districtId?: number | string;
}

interface MasterDataState {
  admissionTypes: DropdownItem[];
  referredBy: DropdownItem[];
  castes: DropdownItem[];
  districts: DropdownItem[];
  sexes: DropdownItem[];
  relationships: DropdownItem[];
  odemas: DropdownItem[];
  breastFeeding: DropdownItem[];
  appetiteTests: DropdownItem[];
  blocks: DropdownItem[];
  icdsProjects: DropdownItem[];
  anganwadis: DropdownItem[];
}

interface ChildDataPayload {
  samNumber?: string;
  admissionType?: number | string;
  referredBy?: number | string;
  sex?: number | string;
  relationship?: number | string;
  caste?: number | string;
  district?: number | string;
  block?: number | string;
  icdsProject?: number | string;
  anganwadiCenter?: number | string;
  dateOfBirth?: string;
  admissionDate?: string;
  admissionTime?: string;
  ageYears?: number | string;
  ageMonths?: number | string;
  admissionWeight?: number | string;
  admissionHeight?: number | string;
  zScore?: number | string;
  admissionOdema?: number | string;
  breastFeeding?: number | string;
  complementaryFeeding?: number | string;
  appetiteTest?: number | string;
  isSamarRegistered?: boolean;
  samarUuid?: string;
  medicalComplications?: string[];
  referredByName?: string;
  referredByMobile?: string;
  childName?: string;
  motherName?: string;
  parentName?: string;
  mobileNumber?: string;
  bplNumber?: string;
  address?: string;
  village?: string;
  aadhaarNumber?: string;
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  ifscCode?: string;
  admissionMuac?: number | string;
}

// --- Reusable UI Components ---
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input type={type} className={cn("flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
  )
);
Input.displayName = "Input";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  ({ className, variant = 'default', href, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
      variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
      variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
      variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
      className
    );
    if (href) return <a href={href} className={classes} ref={ref} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />;
    return <button ref={ref} className={classes} {...props} />;
  }
);
Button.displayName = "Button";

const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm", className)} {...props} />
);
const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 md:p-8", className)} {...props} />
);
const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn("text-sm font-semibold text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block", className)} {...props} />
  )
);
Label.displayName = "Label";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea className={cn("flex min-h-20 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
  )
);
Textarea.displayName = "Textarea";

interface SelectProps {
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
}

interface ComponentWithName {
  name?: string;
}

const Select = ({ name, value, onValueChange, required, children, disabled }: SelectProps) => {
  const [internalValue, setInternalValue] = useState(value || "");
  
  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  const options: {value: string, label: string}[] = [];
  let placeholder = "Select";
  
  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      const element = child as React.ReactElement<{ children?: React.ReactNode }>;
      const type = element.type as ComponentWithName;
      
      if (type?.name === 'SelectTrigger') {
        React.Children.forEach(element.props.children, triggerChild => {
          if (React.isValidElement(triggerChild)) {
            const triggerElement = triggerChild as React.ReactElement<{ placeholder?: string }>;
            const triggerType = triggerElement.type as ComponentWithName;
            if (triggerType?.name === 'SelectValue') {
              placeholder = triggerElement.props.placeholder || "Select";
            }
          }
        });
      }
      if (type?.name === 'SelectContent') {
        const contentChildren = Array.isArray(element.props.children) 
          ? element.props.children.flat() 
          : [element.props.children];
          
        React.Children.forEach(contentChildren, itemChild => {
          if (React.isValidElement(itemChild)) {
            const itemElement = itemChild as React.ReactElement<{ value?: string; children?: React.ReactNode }>;
            const itemType = itemElement.type as ComponentWithName;
            if (itemType?.name === 'SelectItem') {
              options.push({ 
                value: String(itemElement.props.value || ""), 
                label: String(itemElement.props.children || "") 
              });
            }
          }
        });
      }
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInternalValue(e.target.value);
    if (onValueChange) onValueChange(e.target.value);
  };

  return (
    <select name={name} value={internalValue} onChange={handleChange} required={required} disabled={disabled} className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100 appearance-none">
      <option value="" disabled>{placeholder}</option>
      {options.map((opt, i) => (<option key={i} value={opt.value}>{opt.label}</option>))}
    </select>
  );
};

interface TriggerProps { children: React.ReactNode; className?: string }
interface ValueProps { placeholder?: string }
interface ContentProps { children: React.ReactNode }
interface ItemProps { children: React.ReactNode; value: string; className?: string }

const SelectTrigger = ({ children }: TriggerProps) => <>{children}</>;
const SelectValue = ({ placeholder }: ValueProps) => <>{placeholder}</>;
const SelectContent = ({ children }: ContentProps) => <>{children}</>;
const SelectItem = ({ children }: ItemProps) => <>{children}</>;

// --- Constants & Math Functions ---
const MEDICAL_COMPLICATIONS_LIST = [
  "NO COMPLICATION", "PRESENCE OF ANY OF EMERGENCY SIGNS", "VERY WEAK, APATHETIC",
  "ODEMA OF BOTH FEET", "SEVERE PALMAR PALLOR", "SICK YOUNG INFANT LESS THAN 2 MONTHS",
  "LETHARGY/ DROWSINESS/ UNCONSCIOUSNESS", "CONTINUALLY IRRITABLE AND RESTLESS", "ANY RESPIRATORY DISTRESS",
  "SEVERE DEHYDRATION WITH DIARRHOEA", "PERSISTENT VOMITING", "HYPOTHERMIA (<35°C)",
  "SEVERE ANEMIA", "FEVER (>38.5°C)", "EXTENSIVE SKIN LESIONS",
  "TUBERCULOSIS", "MALARIA", "OTHERS"
];

const calculateZScore = (weight: number, height: number) => {
  if (!weight || !height || height <= 0) return "";
  const score = (weight / (height / 100) ** 2) - 15;
  if (!isFinite(score) || score > 99 || score < -99) return "Error";
  return score.toFixed(2);
};

// --- Main Application ---
export default function EditChildRegistration() {
  const router = useRouter();
  const params = useParams();
  const childId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [childData, setChildData] = useState<ChildDataPayload | null>(null);
  
  // MTC Identity States
  const [userMtcId, setUserMtcId] = useState<number | null>(null);

  const [masterData, setMasterData] = useState<MasterDataState>({
    admissionTypes: [], referredBy: [], castes: [], districts: [],
    sexes: [], relationships: [], odemas: [], breastFeeding: [], appetiteTests: [],
    blocks: [], icdsProjects: [], anganwadis: []
  });

  const [admissionType, setAdmissionType] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [showAshaFields, setShowAshaFields] = useState(false);
  
  // SAAMAR Control States
  const [showSamarTracker, setShowSamarTracker] = useState(false);
  const [isSamar, setIsSamar] = useState<string>("no");
  const [samarUuid, setSamarUuid] = useState<string>("");

  const [selectedComplications, setSelectedComplications] = useState<string[]>([]);
  const [otherComplicationDetail, setOtherComplicationDetail] = useState(""); 
  
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [admissionDate, setAdmissionDate] = useState<string>("");
  const [admissionTime, setAdmissionTime] = useState<string>("");
  const [ageYears, setAgeYears] = useState<string>(""); 
  const [ageMonths, setAgeMonths] = useState<string>(""); 

  const [sex, setSex] = useState<string>("");
  const [admissionWeight, setAdmissionWeight] = useState<string>("");
  const [admissionHeight, setAdmissionHeight] = useState<string>("");
  const [zScore, setZScore] = useState<string>("");

  const [caste, setCaste] = useState("");
  const [district, setDistrict] = useState("");
  const [block, setBlock] = useState("");
  const [icdsProject, setIcdsProject] = useState("");
  const [anganwadiCenter, setAnganwadiCenter] = useState("");
  const [relationship, setRelationship] = useState("");
  
  const [admissionOdema, setAdmissionOdema] = useState("");
  const [breastFeeding, setBreastFeeding] = useState("");
  const [complementaryFeeding, setComplementaryFeeding] = useState("");
  const [appetiteTest, setAppetiteTest] = useState("");

  const showMuac = !(ageYears === "0" && parseInt(ageMonths || "0") <= 6);

  useEffect(() => {
    setMounted(true);
    
    // Read MTC Identity from Session
    const sessionData = sessionStorage.getItem("mtc_user");
    if (sessionData) {
      try {
        const user = JSON.parse(sessionData);
        setUserMtcId(user.mtcId || null);
      } catch (err) {
        console.error("Session parse error", err);
      }
    }
    
    // Fetch Master Data
    const fetchMasterData = async () => {
      try {
        const response = await fetch('/api/master-data');
        if (response.ok) {
          const data = await response.json();
          setMasterData(prev => ({ ...prev, ...data }));
        }
      } catch {
        toast.error("Failed to load dropdown options.");
      }
    };
    
    // Fetch Specific Child Data
    const fetchChildData = async () => {
      try {
        const response = await fetch(`/api/child-registration/${childId}`);
        if (response.ok) {
          const patient: ChildDataPayload = await response.json();
          setChildData(patient);
          
          setAdmissionType(patient.admissionType?.toString() || "");
          setReferredBy(patient.referredBy?.toString() || "");
          setSex(patient.sex?.toString() || "");
          setRelationship(patient.relationship?.toString() || "");
          setCaste(patient.caste?.toString() || "");
          setDistrict(patient.district?.toString() || "");
          setBlock(patient.block?.toString() || "");
          setIcdsProject(patient.icdsProject?.toString() || "");
          setAnganwadiCenter(patient.anganwadiCenter?.toString() || "");
          
          setDateOfBirth(patient.dateOfBirth || "");
          setAdmissionDate(patient.admissionDate || "");
          setAdmissionTime(patient.admissionTime || "");
          setAgeYears(patient.ageYears?.toString() || "");
          setAgeMonths(patient.ageMonths?.toString() || "");
          
          setAdmissionWeight(patient.admissionWeight?.toString() || "");
          setAdmissionHeight(patient.admissionHeight?.toString() || "");
          setZScore(patient.zScore?.toString() || "");
          
          setAdmissionOdema(patient.admissionOdema?.toString() || "");
          setBreastFeeding(patient.breastFeeding?.toString() || "");
          setComplementaryFeeding(patient.complementaryFeeding?.toString() || "");
          setAppetiteTest(patient.appetiteTest?.toString() || "");

          // Load SAAMAR Data if it exists
          if (patient.isSamarRegistered) {
            setIsSamar("yes");
            setSamarUuid(patient.samarUuid || "");
          } else {
            setIsSamar("no");
          }
          
          const comps = patient.medicalComplications || [];
          const standardComps: string[] = [];
          let othersText = "";
          
          comps.forEach((c: string) => {
            if (c.startsWith("OTHERS: ")) { 
              standardComps.push("OTHERS"); 
              othersText = c.replace("OTHERS: ", ""); 
            } else if (c === "OTHERS") {
              standardComps.push("OTHERS");
            } else {
              standardComps.push(c);
            }
          });
          
          setSelectedComplications(standardComps);
          setOtherComplicationDetail(othersText);

        } else {
          toast.error("Patient not found!");
          router.push('/mtc-user/dashboard/child-registration');
        }
      } catch {
        toast.error("Error loading patient data.");
      }
    };

    fetchMasterData();
    if (childId) fetchChildData();
  }, [childId, router]);

  useEffect(() => {
    if (admissionWeight && admissionHeight) {
      const score = calculateZScore(parseFloat(admissionWeight), parseFloat(admissionHeight));
      setZScore(score ? String(score) : "");
    } else {
      setZScore("");
    }
  }, [admissionWeight, admissionHeight]);

  // --- Dependency Logic for Referral & SAAMAR ---
  useEffect(() => {
    setShowAshaFields(referredBy === "6");
    
    // Check if the selected referral type is "Other" or "SAAMAR"
    if (!masterData.referredBy.length || !referredBy) return;

    const selectedRef = masterData.referredBy.find((r: DropdownItem) => r.id.toString() === referredBy);
    const isOther = selectedRef && (
      selectedRef.name.toLowerCase().includes('other') || 
      selectedRef.name.toLowerCase().includes('saamar') ||
      selectedRef.name.toLowerCase().includes('samar')
    );
    
    setShowSamarTracker(!!isOther);

  }, [referredBy, masterData.referredBy]);

  const handleComplicationToggle = (comp: string) => {
    setSelectedComplications(prev => {
      if (comp === "OTHERS" && prev.includes("OTHERS")) {
        setOtherComplicationDetail(""); // Clear text if unchecked
      }
      return prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp];
    });
  };

  const filteredBlocks = (masterData.blocks || []).filter((b: DropdownItem) => 
    !district || b.districtId?.toString() === district
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (zScore === "Error") {
      toast.error("Invalid Anthropometry data. Please check Height/Weight.");
      return;
    }
    if (selectedComplications.length === 0) {
      toast.error("Please select at least one medical complication status.");
      return;
    }
    if (selectedComplications.includes("OTHERS") && !otherComplicationDetail.trim()) {
      toast.error("Please specify the details for the 'Others' complication.");
      return;
    }
    if (showSamarTracker && isSamar === "yes" && !samarUuid.trim()) {
      toast.error("Please enter the SAAMAR Child UUID."); return;
    }
    
    if (!userMtcId) {
      toast.error("Security Error: Unknown MTC ID. Please log out and log back in.");
      return;
    }

    setLoading(true);

    let finalComplications = [...selectedComplications];
    if (finalComplications.includes("OTHERS")) {
      finalComplications = finalComplications.filter(c => c !== "OTHERS");
      finalComplications.push(`OTHERS: ${otherComplicationDetail.trim()}`);
    }

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    const payload = {
      mtcId: userMtcId, 
      isSamarRegistered: showSamarTracker && isSamar === "yes", 
      samarUuid: (showSamarTracker && isSamar === "yes") ? samarUuid : null,
      admissionType, referredBy,
      referredByName: formData.get('referredByName'), referredByMobile: formData.get('referredByMobile'),
      childName: formData.get('childName'), 
      motherName: formData.get('motherName'), 
      parentName: formData.get('parentName'),
      relationship, mobileNumber: formData.get('mobileNumber'),
      bplNumber: formData.get('bplNumber'), dateOfBirth, sex,
      ageYears: ageYears, ageMonths: ageMonths,
      address: formData.get('address'), caste, district, block, 
      icdsProject, anganwadiCenter, village: formData.get('village'),
      aadhaarNumber: formData.get('aadhaarNumber'), bankName: formData.get('bankName'),
      accountHolderName: formData.get('accountHolderName'), accountNumber: formData.get('accountNumber'),
      ifscCode: formData.get('ifscCode'), admissionDate, admissionTime,
      admissionWeight, admissionHeight, 
      admissionMuac: showMuac ? formData.get('admissionMuac') : null, 
      zScore: zScore, admissionOdema, breastFeeding, complementaryFeeding, appetiteTest,
      medicalComplications: finalComplications
    };

    try {
      const response = await fetch(`/api/child-registration/${childId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error('Failed to update registration');
      
      toast.success("Patient updated successfully!");
      setTimeout(() => router.push('/mtc-user/dashboard/child-registration'), 1000);
      
    } catch {
      toast.error("An error occurred while updating.");
      setLoading(false);
    }
  };

  if (!mounted || !childData) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Loader2 className="animate-spin text-indigo-600 w-8 h-8" />
    </div>;
  }

  const SectionTitle = ({ icon: Icon, title }: { icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Icon size={20} strokeWidth={2.5} /></div>
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans pb-28">
      <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-2 flex items-center">
          <Button variant="ghost" onClick={() => router.push('/mtc-user/dashboard/child-registration')} type="button" className="pl-0 text-slate-500 hover:text-indigo-600 hover:bg-transparent">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
        </div>

        <div className="mb-8 text-center md:text-left md:flex md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Edit Child Record</h1>
            <p className="mt-2 text-sm text-slate-500">Update the information directly in the database.</p>
          </div>
          <div className="mt-4 md:mt-0 px-5 py-3 bg-white rounded-xl shadow-sm border border-slate-200 inline-block text-center md:text-right">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">SAM Number</span>
            <span className="text-lg font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md">{childData.samNumber}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="space-y-6">

            {/* Admission Info */}
            <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
              <CardContent className="p-6 sm:p-8">
                <SectionTitle icon={ClipboardCheck} title="Admission Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                  <div>
                    <Label>Admission Type <span className="text-red-500">*</span></Label>
                    <Select name="admissionType" value={admissionType} onValueChange={setAdmissionType} required>
                      <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                      <SelectContent>
                        {masterData.admissionTypes.map((type: DropdownItem) => (<SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Referred By <span className="text-red-500">*</span></Label>
                    <Select name="referredBy" value={referredBy} onValueChange={(val: string) => {
                      setReferredBy(val);
                      const selectedRef = masterData.referredBy.find((r: DropdownItem) => r.id.toString() === val);
                      const isOther = selectedRef && (
                        selectedRef.name.toLowerCase().includes('other') || 
                        selectedRef.name.toLowerCase().includes('saamar') ||
                        selectedRef.name.toLowerCase().includes('samar')
                      );
                      if (!isOther) {
                        setIsSamar("no");
                        setSamarUuid("");
                      }
                    }} required>
                      <SelectTrigger><SelectValue placeholder="Select Origin" /></SelectTrigger>
                      <SelectContent>
                        {masterData.referredBy.map((ref: DropdownItem) => (<SelectItem key={ref.id} value={ref.id.toString()}>{ref.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {showAshaFields && (
                    <>
                      <div>
                        <Label>Name of Sahiya/Asha</Label>
                        <Input name="referredByName" defaultValue={childData.referredByName || childData.parentName} placeholder="Enter Name" />
                      </div>
                      <div>
                        <Label>Sahiya/Asha Mobile</Label>
                        <Input name="referredByMobile" defaultValue={childData.referredByMobile || childData.mobileNumber} type="tel" maxLength={10} pattern="[0-9]{10}" />
                      </div>
                    </>
                  )}
                  <div>
                    <Label>Admission Date <span className="text-red-500">*</span></Label>
                    <Input type="date" name="admissionDate" value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} required />
                  </div>
                  <div>
                    <Label>Admission Time <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Input name="admissionTime" type="time" value={admissionTime} onChange={(e) => setAdmissionTime(e.target.value)} required className="pr-10" />
                      <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                    </div>
                  </div>

                  {/* --- SAAMAR TRACKER LOGIC --- */}
                  {showSamarTracker && (
                    <div className="lg:col-span-4 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex flex-col md:flex-row gap-4 items-end animate-in fade-in zoom-in duration-200 mt-2">
                      <div className="flex-1 w-full md:max-w-xs">
                        <Label className="text-indigo-800">Registered in SAAMAR? <span className="text-red-500">*</span></Label>
                        <Select name="isSamar" value={isSamar} onValueChange={(val: string) => { setIsSamar(val); if(val === "no") setSamarUuid(""); }} required={showSamarTracker}>
                          <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {isSamar === "yes" && (
                        <div className="flex-1 w-full">
                          <Label className="text-indigo-800">SAAMAR Child UUID <span className="text-red-500">*</span></Label>
                          <Input name="samarUuid" value={samarUuid} onChange={(e) => setSamarUuid(e.target.value)} placeholder="Enter UUID" className="bg-white" required />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Personal Info */}
            <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
              <CardContent className="p-6 sm:p-8">
                <SectionTitle icon={Baby} title="Child & Guardian Information" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-2">
                    <Label>Child Full Name <span className="text-red-500">*</span></Label>
                    <Input name="childName" defaultValue={childData.childName} required />
                  </div>
                  <div className="lg:col-span-2">
                    <Label>Date of Birth</Label>
                    <Input type="date" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                  </div>
                  <div>
                    <Label>Age (Years) <span className="text-red-500">*</span></Label>
                    <Input type="number" min="0" value={ageYears} onChange={(e) => setAgeYears(e.target.value)} required />
                  </div>
                  <div>
                    <Label>Age (Months) <span className="text-red-500">*</span></Label>
                    <Input type="number" min="0" max="11" value={ageMonths} onChange={(e) => setAgeMonths(e.target.value)} required />
                  </div>
                  <div className="lg:col-span-2">
                    <Label>Sex <span className="text-red-500">*</span></Label>
                    <Select name="sex" value={sex} onValueChange={setSex} required>
                      <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                      <SelectContent>
                        {masterData.sexes.map((s: DropdownItem) => (<SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="lg:col-span-2">
                    <Label>Mother&apos;s Name <span className="text-red-500">*</span></Label>
                    <Input name="motherName" defaultValue={childData.motherName} required />
                  </div>
                  <div className="lg:col-span-2">
                    <Label>Name of Caretaker / Guardian <span className="text-red-500">*</span></Label>
                    <Input name="parentName" defaultValue={childData.parentName} required />
                  </div>
                  <div>
                    <Label>Relationship <span className="text-red-500">*</span></Label>
                    <Select name="relationship" value={relationship} onValueChange={setRelationship} required>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {masterData.relationships.map((rel: DropdownItem) => (<SelectItem key={rel.id} value={rel.id.toString()}>{rel.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Mobile Number <span className="text-red-500">*</span></Label>
                    <Input name="mobileNumber" defaultValue={childData.mobileNumber} type="tel" maxLength={10} pattern="[0-9]{10}" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Details */}
            <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
              <CardContent className="p-6 sm:p-8">
                <SectionTitle icon={ShieldCheck} title="Identity & Financial Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <Label>Parent Aadhaar Number</Label>
                    <Input name="aadhaarNumber" defaultValue={childData.aadhaarNumber} maxLength={12} pattern="[0-9]{12}" />
                  </div>
                  <div>
                    <Label>BPL Number</Label>
                    <Input name="bplNumber" defaultValue={childData.bplNumber} />
                  </div>
                  <div>
                    <Label>Caste <span className="text-red-500">*</span></Label>
                    <Select name="caste" value={caste} onValueChange={setCaste} required>
                      <SelectTrigger><SelectValue placeholder="Select Caste" /></SelectTrigger>
                      <SelectContent>
                        {masterData.castes.map((c: DropdownItem) => (<SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="lg:col-span-4 mt-2">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
                      <Landmark className="w-4 h-4 text-indigo-500" /> Bank Account Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
                      <div><Label>Bank Name</Label><Input name="bankName" defaultValue={childData.bankName} className="bg-white" /></div>
                      <div><Label>Account Holder</Label><Input name="accountHolderName" defaultValue={childData.accountHolderName} className="bg-white" /></div>
                      <div><Label>Account Number</Label><Input name="accountNumber" defaultValue={childData.accountNumber} className="bg-white" /></div>
                      <div><Label>IFSC Code</Label><Input name="ifscCode" defaultValue={childData.ifscCode} className="bg-white" /></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DEPENDENT LOCATION DETAILS */}
            <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
              <CardContent className="p-6 sm:p-8">
                <SectionTitle icon={MapPin} title="Location Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-3">
                    <Label>Full Address <span className="text-red-500">*</span></Label>
                    <Textarea name="address" defaultValue={childData.address} rows={2} required />
                  </div>
                  <div>
                    <Label>District <span className="text-red-500">*</span></Label>
                    <Select 
                      name="district" 
                      value={district} 
                      onValueChange={(val: string) => {
                        setDistrict(val);
                        setBlock(""); 
                      }} 
                      required
                    >
                      <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
                      <SelectContent>
                        {masterData.districts.map((dist: DropdownItem) => (<SelectItem key={dist.id} value={dist.id.toString()}>{dist.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Block</Label>
                    <Select 
                      name="block" 
                      value={block} 
                      onValueChange={setBlock}
                      disabled={!district} 
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={district ? "Select Block" : "Select District First"} />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredBlocks.map((b: DropdownItem) => (<SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Village</Label>
                    <Input name="village" defaultValue={childData.village} />
                  </div>
                  <div>
                    <Label>ICDS Project</Label>
                    <Select name="icdsProject" value={icdsProject} onValueChange={setIcdsProject}>
                      <SelectTrigger><SelectValue placeholder="Select Project" /></SelectTrigger>
                      <SelectContent>
                        {masterData.icdsProjects.map((project: DropdownItem) => (<SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="lg:col-span-2">
                    <Label>Anganwadi Center</Label>
                    <Select name="anganwadiCenter" value={anganwadiCenter} onValueChange={setAnganwadiCenter}>
                      <SelectTrigger><SelectValue placeholder="Select Center" /></SelectTrigger>
                      <SelectContent>
                        {masterData.anganwadis.map((center: DropdownItem) => (<SelectItem key={center.id} value={center.id.toString()}>{center.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Anthropometry Details */}
            <Card className="border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
              <CardContent className="p-6 sm:p-8">
                <SectionTitle icon={Activity} title="Anthropometry & Feeding" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <Label>Admission Weight (kg) <span className="text-red-500">*</span></Label>
                    <Input name="admissionWeight" type="number" step="0.1" value={admissionWeight} onChange={(e) => setAdmissionWeight(e.target.value)} required />
                  </div>
                  <div>
                    <Label>Length/Height (cm) <span className="text-red-500">*</span></Label>
                    <Input name="admissionHeight" type="number" step="0.1" value={admissionHeight} onChange={(e) => setAdmissionHeight(e.target.value)} required />
                  </div>
                  
                  {/* ---> CONDITIONAL MUAC FIELD <--- */}
                  {showMuac && (
                    <div>
                      <Label>MUAC (cm) <span className="text-red-500">*</span></Label>
                      <Input name="admissionMuac" type="number" step="0.1" defaultValue={childData.admissionMuac} required />
                    </div>
                  )}

                  <div>
                    <Label>Z-Score (SD)</Label>
                    <Input name="zScore" readOnly value={zScore} className={cn("font-semibold focus:ring-0 cursor-not-allowed", zScore === "Error" ? "bg-red-50 text-red-600" : "bg-slate-100 text-indigo-700")} />
                  </div>
                  <div>
                    <Label>Admission Odema <span className="text-red-500">*</span></Label>
                    <Select name="admissionOdema" value={admissionOdema} onValueChange={setAdmissionOdema} required>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {masterData.odemas.map((odema: DropdownItem) => (<SelectItem key={odema.id} value={odema.id.toString()}>{odema.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Breast Feeding <span className="text-red-500">*</span></Label>
                    <Select name="breastFeeding" value={breastFeeding} onValueChange={setBreastFeeding} required>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {masterData.breastFeeding.map((bf: DropdownItem) => (<SelectItem key={bf.id} value={bf.id.toString()}>{bf.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Complementary Feeding <span className="text-red-500">*</span></Label>
                    <Select name="complementaryFeeding" value={complementaryFeeding} onValueChange={setComplementaryFeeding} required>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Yes</SelectItem><SelectItem value="2">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Appetite Test <span className="text-red-500">*</span></Label>
                    <Select name="appetiteTest" value={appetiteTest} onValueChange={setAppetiteTest} required>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {masterData.appetiteTests.map((at: DropdownItem) => (<SelectItem key={at.id} value={at.id.toString()}>{at.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
              <CardContent className="p-6 sm:p-8">
                <SectionTitle icon={Stethoscope} title="Medical Complications" />
                <p className="text-sm font-semibold text-slate-700 mb-4 block">Select all present complications: <span className="text-red-500">*</span></p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 bg-slate-50/50 p-6 rounded-xl border border-slate-200">
                  {MEDICAL_COMPLICATIONS_LIST.map((comp) => (
                    <label key={comp} className="flex items-start space-x-3 cursor-pointer group">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/30 transition duration-150 ease-in-out cursor-pointer"
                          checked={selectedComplications.includes(comp)}
                          onChange={() => handleComplicationToggle(comp)}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-600 leading-tight group-hover:text-slate-900 transition-colors">
                        {comp}
                      </span>
                    </label>
                  ))}
                </div>

                {/* ---> DYNAMIC OTHERS TEXT BOX <--- */}
                {selectedComplications.includes("OTHERS") && (
                  <div className="mt-5 p-5 bg-indigo-50/50 rounded-xl border border-indigo-100">
                    <Label className="text-indigo-900">Please specify &apos;Others&apos; complication details <span className="text-red-500">*</span></Label>
                    <Input 
                      value={otherComplicationDetail}
                      onChange={(e) => setOtherComplicationDetail(e.target.value)}
                      placeholder="e.g., Asthma, Severe Jaundice..."
                      className="mt-2 bg-white"
                      required={selectedComplications.includes("OTHERS")}
                    />
                  </div>
                )}

              </CardContent>
            </Card>

          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 p-4 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 flex justify-end gap-4 sm:justify-center md:justify-end md:px-12">
            <Button variant="ghost" onClick={() => router.push('/mtc-user/dashboard/child-registration')} type="button" className="min-w-40">Cancel</Button>
            <Button type="submit" disabled={loading || zScore === "Error"} className="min-w-40">
              {loading ? "Saving to Database..." : "Update Patient"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}