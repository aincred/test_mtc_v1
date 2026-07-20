// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { Clock, Landmark, ClipboardCheck, MapPin, Activity, Stethoscope, Baby, ShieldCheck, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";
// // import { clsx, type ClassValue } from "clsx";
// // import { twMerge } from "tailwind-merge";
// // import { calculateZScore } from "@/lib/zScoreUtils";

// // function cn(...inputs: ClassValue[]) {
// //   return twMerge(clsx(inputs));
// // }

// // // --- TypeScript Interfaces to fix the 'never' error ---
// // interface DropdownItem {
// //   id: number | string;
// //   name: string;
// //   districtId?: number | string;
// // }

// // interface MasterDataState {
// //   admissionTypes: DropdownItem[];
// //   referredBy: DropdownItem[];
// //   castes: DropdownItem[];
// //   districts: DropdownItem[];
// //   sexes: DropdownItem[];
// //   relationships: DropdownItem[];
// //   odemas: DropdownItem[];
// //   breastFeeding: DropdownItem[];
// //   appetiteTests: DropdownItem[];
// //   blocks: DropdownItem[];
// //   icdsProjects: DropdownItem[];
// //   anganwadis: DropdownItem[];
// // }

// // // --- Reusable UI Components ---
// // const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
// //   ({ className, type, ...props }, ref) => (
// //     <input type={type} className={cn("flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
// //   )
// // );
// // Input.displayName = "Input";

// // interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
// //   variant?: 'default' | 'outline' | 'ghost';
// //   href?: string;
// // }

// // const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
// //   ({ className, variant = 'default', href, ...props }, ref) => {
// //     const classes = cn(
// //       "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
// //       variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
// //       variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
// //       variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
// //       className
// //     );
// //     if (href) return <a href={href} className={classes} ref={ref} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />;
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
// //     <textarea className={cn("flex min-h-20 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50", className)} ref={ref} {...props} />
// //   )
// // );
// // Textarea.displayName = "Textarea";

// // interface SelectProps {
// //   name?: string;
// //   value?: string;
// //   onValueChange?: (value: string) => void;
// //   required?: boolean;
// //   children?: React.ReactNode;
// //   disabled?: boolean;
// // }

// // interface ComponentWithName {
// //   name?: string;
// // }

// // const Select = ({ name, value, onValueChange, required, children, disabled }: SelectProps) => {
// //   const [internalValue, setInternalValue] = useState(value || "");
  
// //   useEffect(() => {
// //     if (value !== undefined) setInternalValue(value);
// //   }, [value]);

// //   const options: {value: string, label: string}[] = [];
// //   let placeholder = "Select";
  
// //   React.Children.forEach(children, child => {
// //     if (React.isValidElement(child)) {
// //       const element = child as React.ReactElement<{ children?: React.ReactNode }>;
// //       const type = element.type as ComponentWithName;
      
// //       if (type?.name === 'SelectTrigger') {
// //         React.Children.forEach(element.props.children, triggerChild => {
// //           if (React.isValidElement(triggerChild)) {
// //             const triggerElement = triggerChild as React.ReactElement<{ placeholder?: string }>;
// //             const triggerType = triggerElement.type as ComponentWithName;
// //             if (triggerType?.name === 'SelectValue') {
// //               placeholder = triggerElement.props.placeholder || "Select";
// //             }
// //           }
// //         });
// //       }
// //       if (type?.name === 'SelectContent') {
// //         const contentChildren = Array.isArray(element.props.children) 
// //           ? element.props.children.flat() 
// //           : [element.props.children];
          
// //         React.Children.forEach(contentChildren, itemChild => {
// //           if (React.isValidElement(itemChild)) {
// //             const itemElement = itemChild as React.ReactElement<{ value?: string; children?: React.ReactNode }>;
// //             const itemType = itemElement.type as ComponentWithName;
// //             if (itemType?.name === 'SelectItem') {
// //               options.push({ 
// //                 value: String(itemElement.props.value || ""), 
// //                 label: String(itemElement.props.children || "") 
// //               });
// //             }
// //           }
// //         });
// //       }
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

// // interface TriggerProps { children: React.ReactNode; className?: string }
// // interface ValueProps { placeholder?: string }
// // interface ContentProps { children: React.ReactNode }
// // interface ItemProps { children: React.ReactNode; value: string; className?: string }

// // const SelectTrigger = ({ children }: TriggerProps) => <>{children}</>;
// // const SelectValue = ({ placeholder }: ValueProps) => <>{placeholder}</>;
// // const SelectContent = ({ children }: ContentProps) => <>{children}</>;
// // const SelectItem = ({ children }: ItemProps) => <>{children}</>;

// // // --- Constants ---
// // const MEDICAL_COMPLICATIONS_LIST = [
// //   "NO COMPLICATION", "PRESENCE OF ANY OF EMERGENCY SIGNS", "VERY WEAK, APATHETIC",
// //   "ODEMA OF BOTH FEET", "SEVERE PALMAR PALLOR", "SICK YOUNG INFANT LESS THAN 2 MONTHS",
// //   "LETHARGY/ DROWSINESS/ UNCONSCIOUSNESS", "CONTINUALLY IRRITABLE AND RESTLESS", "ANY RESPIRATORY DISTRESS",
// //   "SEVERE DEHYDRATION WITH DIARRHOEA", "PERSISTENT VOMITING", "HYPOTHERMIA (<35°C)",
// //   "SEVERE ANEMIA", "FEVER (>38.5°C)", "EXTENSIVE SKIN LESIONS",
// //   "TUBERCULOSIS", "MALARIA", "OTHERS"
// // ];

// // // --- Main Application ---
// // export default function ChildRegistration() {
// //   const [loading, setLoading] = useState(false);
// //   const [isSubmitted, setIsSubmitted] = useState(false);
// //   const [samNumber, setSamNumber] = useState("Loading...");
// //   const [referredBy, setReferredBy] = useState("");
// //   const [showAshaFields, setShowAshaFields] = useState(false);
  
// //   // SAAMAR Control States
// //   const [showSamarTracker, setShowSamarTracker] = useState(false);
// //   const [isSamar, setIsSamar] = useState<string>("no");
// //   const [samarUuid, setSamarUuid] = useState<string>("");
// //   const [pendingSamarUUID, setPendingSamarUUID] = useState<string | null>(null);

// //   const [mounted, setMounted] = useState(false);

// //   // MTC Identity State
// //   const [userMtcId, setUserMtcId] = useState<number | null>(null);
// //   const [userMtcCode, setUserMtcCode] = useState<string>("");
  
// //   // Strongly typed Master Data State
// //   const [masterData, setMasterData] = useState<MasterDataState>({
// //     admissionTypes: [], referredBy: [], castes: [], districts: [],
// //     sexes: [], relationships: [], odemas: [], breastFeeding: [], appetiteTests: [],
// //     blocks: [], icdsProjects: [], anganwadis: []
// //   });
  
// //   const [district, setDistrict] = useState("");
// //   const [block, setBlock] = useState("");

// //   const [childName, setChildName] = useState<string>(""); 
// //   const [motherName, setMotherName] = useState<string>("");
// //   const [dateOfBirth, setDateOfBirth] = useState<string>("");
// //   const [ageYears, setAgeYears] = useState<string>(""); 
// //   const [ageMonths, setAgeMonths] = useState<string>(""); 
// //   const [admissionDate, setAdmissionDate] = useState<string>("");
// //   const [admissionTime, setAdmissionTime] = useState<string>("");
// //   const [sex, setSex] = useState<string>("");
// //   const [admissionWeight, setAdmissionWeight] = useState<string>("");
// //   const [admissionHeight, setAdmissionHeight] = useState<string>("");
// //   const [zScore, setZScore] = useState<string>("");
  
// //   const [selectedComplications, setSelectedComplications] = useState<string[]>([]);
// //   const [otherComplicationDetail, setOtherComplicationDetail] = useState<string>("");

// //   const showMuac = !(ageYears === "0" && parseInt(ageMonths || "0") <= 6);

// //   useEffect(() => {
// //     setMounted(true);
    
// //     let currentMtcCode = "";
// //     const sessionData = sessionStorage.getItem("mtc_user");
// //     if (sessionData) {
// //       try {
// //         const user = JSON.parse(sessionData);
// //         setUserMtcId(user.mtcId || null);
// //         setUserMtcCode(user.mtcCode || "");
// //         currentMtcCode = user.mtcCode || "";
// //       } catch (err) {
// //         console.error("Session parse error", err);
// //       }
// //     }

// //     generateSamNumber(currentMtcCode);

// //     const fetchMasterData = async () => {
// //       try {
// //         const response = await fetch('/api/master-data');
// //         if (response.ok) {
// //           const data = await response.json();
// //           setMasterData(prev => ({ ...prev, ...data }));
// //         }
// //       } catch (err) {
// //         toast.error("Failed to load dropdown options.");
// //       }
// //     };
// //     fetchMasterData();
// //   }, []);

// //   const generateSamNumber = async (code: string) => {
// //     try {
// //       const url = code ? `/api/next-sam-number?mtcCode=${encodeURIComponent(code)}` : '/api/next-sam-number';
// //       const response = await fetch(url);
// //       if (response.ok) {
// //         const data = await response.json();
// //         setSamNumber(data.nextSamNumber);
// //       } else {
// //         setSamNumber(`${code || "JH/"}0001`);
// //       }
// //     } catch (err) {
// //       setSamNumber(`${code || "JH/"}0001`);
// //     }
// //   };

// //   useEffect(() => {
// //     const storedData = sessionStorage.getItem("pendingRegistrationData");
// //     if (storedData) {
// //       try {
// //         const data = JSON.parse(storedData);
// //         if (data.NameOfChild || data.Name || data.ChildName) setChildName(data.NameOfChild || data.Name || data.ChildName);
// //         if (data.Weight) setAdmissionWeight(data.Weight.toString());
// //         if (data.Length) setAdmissionHeight(data.Length.toString());
// //         if (data.Gender) {
// //           const g = data.Gender.toString().toLowerCase().trim();
// //           if (g === "male" || g === "m") setSex("1");
// //           else if (g === "female" || g === "f") setSex("2");
// //         }
// //         if (data.Age && !isNaN(Number(data.Age))) {
// //           const totalMonths = Number(data.Age);
// //           const years = Math.floor(totalMonths / 12);
// //           const months = totalMonths % 12;
// //           setAgeYears(years.toString());
// //           setAgeMonths(months.toString()); 
// //           const today = new Date();
// //           today.setMonth(today.getMonth() - totalMonths);
// //           setDateOfBirth(today.toISOString().split('T')[0]);
// //         }
        
// //         // Ensure UUID is mapped from the referral data correctly
// //         const uuid = data.uuidChild || data.UUID || data.samarUuid || data.SamarUUID || data.uuid;
// //         if (uuid) {
// //           setPendingSamarUUID(uuid.toString());
// //         }

// //         toast.success("Child details auto-filled from referral!");
// //         sessionStorage.removeItem("pendingRegistrationData");
// //       } catch (err) {
// //         console.error("Error parsing referral data", err);
// //       }
// //     }
// //   }, []);

// //   // Safely auto-fill SAAMAR once the Master Data dropdowns have loaded
// //   useEffect(() => {
// //     if (pendingSamarUUID && masterData.referredBy.length > 0) {
// //       const samarOrOther = masterData.referredBy.find((r: DropdownItem) =>
// //         r.name.toLowerCase().includes('other') || 
// //         r.name.toLowerCase().includes('saamar') ||
// //         r.name.toLowerCase().includes('samar')
// //       );
      
// //       if (samarOrOther) {
// //         setReferredBy(samarOrOther.id.toString());
// //       }
      
// //       setIsSamar("yes");
// //       setSamarUuid(pendingSamarUUID);
// //       setShowSamarTracker(true);
// //       setPendingSamarUUID(null); // Clear the queue so it doesn't loop
// //     }
// //   }, [masterData.referredBy, pendingSamarUUID]);

// //   useEffect(() => {
// //     if (dateOfBirth) {
// //       const dob = new Date(dateOfBirth);
// //       const today = new Date();
// //       let years = today.getFullYear() - dob.getFullYear();
// //       let months = today.getMonth() - dob.getMonth();
// //       if (months < 0) { years--; months += 12; }
// //       if (today.getDate() < dob.getDate()) {
// //         months--;
// //         if (months < 0) { years--; months += 12; }
// //       }
// //       if (years >= 0 && months >= 0) {
// //         setAgeYears(years.toString());
// //         setAgeMonths(months.toString());
// //       }
// //     }
// //   }, [dateOfBirth]);

// //   useEffect(() => {
// //     if (admissionWeight && admissionHeight && sex) {
// //       const score = calculateZScore(parseFloat(admissionWeight), parseFloat(admissionHeight), sex);
// //       setZScore(score !== null && score !== undefined ? String(score) : "");
// //     } else {
// //       setZScore("");
// //     }
// //   }, [admissionWeight, admissionHeight, sex]);

// //   // --- Dependency Logic for Referral & SAAMAR ---
// //   useEffect(() => {
// //     setShowAshaFields(referredBy === "6"); 
    
// //     // Check if the selected referral type is "Other" or "SAAMAR"
// //     if (!masterData.referredBy.length || !referredBy) return;

// //     const selectedRef = masterData.referredBy.find((r: DropdownItem) => r.id.toString() === referredBy);
// //     const isOther = selectedRef && (
// //       selectedRef.name.toLowerCase().includes('other') || 
// //       selectedRef.name.toLowerCase().includes('saamar') ||
// //       selectedRef.name.toLowerCase().includes('samar')
// //     );
    
// //     setShowSamarTracker(!!isOther);

// //   }, [referredBy, masterData.referredBy]);

// //   const handleComplicationToggle = (comp: string) => {
// //     setSelectedComplications(prev => {
// //       if (comp === "OTHERS" && prev.includes("OTHERS")) setOtherComplicationDetail("");
// //       return prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp];
// //     });
// //   };

// //   const filteredBlocks = (masterData.blocks || []).filter((b: DropdownItem) => 
// //     !district || b.districtId?.toString() === district
// //   );

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (zScore === "Error" || zScore === "") {
// //       toast.error("Invalid Anthropometry data."); return;
// //     }
// //     if (selectedComplications.length === 0) {
// //       toast.error("Select at least one medical complication."); return;
// //     }
// //     if (selectedComplications.includes("OTHERS") && !otherComplicationDetail.trim()) {
// //       toast.error("Specify details for the 'Others' complication."); return;
// //     }
// //     if (showSamarTracker && isSamar === "yes" && !samarUuid.trim()) {
// //       toast.error("Please enter the SAAMAR Child UUID."); return;
// //     }
// //     if (!userMtcId) {
// //       toast.error("Security Error: Unknown MTC ID. Please log out and back in."); return;
// //     }
    
// //     setLoading(true);

// //     let finalComplications = [...selectedComplications];
// //     if (finalComplications.includes("OTHERS")) {
// //       finalComplications = finalComplications.filter(c => c !== "OTHERS");
// //       finalComplications.push(`OTHERS: ${otherComplicationDetail.trim()}`);
// //     }

// //     const formData = new FormData(e.currentTarget as HTMLFormElement);
// //     const payload = {
// //       mtcId: userMtcId, 
// //       samNumber, 
// //       isSamarRegistered: showSamarTracker && isSamar === "yes", 
// //       samarUuid: (showSamarTracker && isSamar === "yes") ? samarUuid : null, 
// //       admissionType: formData.get('admissionType'), referredBy,
// //       referredByName: formData.get('referredByName'), referredByMobile: formData.get('referredByMobile'),
// //       childName: childName || formData.get('childName'), motherName: motherName || formData.get('motherName'), 
// //       parentName: formData.get('parentName'), relationship: formData.get('relationship'), 
// //       mobileNumber: formData.get('mobileNumber'), bplNumber: formData.get('bplNumber'), 
// //       dateOfBirth, ageYears: ageYears || formData.get('ageYears'), ageMonths: ageMonths || formData.get('ageMonths'), 
// //       sex, address: formData.get('address'), caste: formData.get('caste'), district, block,
// //       icdsProject: formData.get('icdsProject'), anganwadiCenter: formData.get('anganwadiCenter'),
// //       village: formData.get('village'), aadhaarNumber: formData.get('aadhaarNumber'),
// //       bankName: formData.get('bankName'), accountHolderName: formData.get('accountHolderName'),
// //       accountNumber: formData.get('accountNumber'), ifscCode: formData.get('ifscCode'),
// //       admissionDate, admissionTime, admissionWeight, admissionHeight,
// //       admissionMuac: showMuac ? formData.get('admissionMuac') : null, zScore: zScore,
// //       admissionOdema: formData.get('admissionOdema'), breastFeeding: formData.get('breastFeeding'),
// //       complementaryFeeding: formData.get('complementaryFeeding'), appetiteTest: formData.get('appetiteTest'),
// //       medicalComplications: finalComplications 
// //     };

// //     try {
// //       const response = await fetch('/api/child-registration', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
// //       });
// //       if (!response.ok) throw new Error('Failed to submit registration');
// //       toast.success("Form submitted successfully!");
// //       setIsSubmitted(true);
// //     } catch (error: unknown) {
// //       const errorMessage = error instanceof Error ? error.message : "An error occurred.";
// //       toast.error(errorMessage);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleRegisterAnother = () => {
// //     setIsSubmitted(false); setReferredBy(""); setShowAshaFields(false);
// //     setDateOfBirth(""); setAgeYears(""); setAgeMonths(""); setAdmissionDate(""); setAdmissionTime(""); setSex("");
// //     setAdmissionWeight(""); setAdmissionHeight(""); setZScore(""); setSelectedComplications([]);
// //     setOtherComplicationDetail(""); setDistrict(""); setBlock(""); setChildName(""); setMotherName("");
// //     setIsSamar("no"); setSamarUuid(""); setShowSamarTracker(false);
// //     generateSamNumber(userMtcCode);
// //   };

// //   if (!mounted) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600 w-8 h-8" /></div>;

// //   if (isSubmitted) {
// //     return (
// //       <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
// //         <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
// //         <Card className="max-w-md w-full p-8 text-center border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
// //           <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} strokeWidth={2.5} /></div>
// //           <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Submitted Successfully!</h2>
// //           <p className="text-slate-500 mb-8">The patient registration has been securely recorded into the system.</p>
// //           <div className="flex flex-col gap-3">
// //             <Button onClick={handleRegisterAnother} className="w-full">Register Another Child</Button>
// //             <Button variant="outline" href="/mtc-user/dashboard/child-registration" className="w-full">Back to Dashboard</Button>
// //           </div>
// //         </Card>
// //       </div>
// //     );
// //   }

// //   const SectionTitle = ({ icon: Icon, title }: { icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>, title: string }) => (
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
// //           <Button variant="ghost" href="/mtc-user/dashboard/child-registration" className="pl-0 text-slate-500 hover:text-indigo-600 hover:bg-transparent">
// //             <ArrowLeft className="w-5 h-5 mr-2" /> Back
// //           </Button>
// //         </div>

// //         <div className="mb-8 text-center md:text-left md:flex md:items-end md:justify-between">
// //           <div>
// //             <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Child Registration</h1>
// //             <p className="mt-2 text-sm text-slate-500 max-w-2xl">Malnutrition Treatment Center (MTC) Intake Form.</p>
// //           </div>
// //           <div className="mt-4 md:mt-0 px-5 py-3 bg-white rounded-xl shadow-sm border border-slate-200 inline-block">
// //             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Generated SAM Number</span>
// //             <span className="text-lg font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md">{samNumber}</span>
// //           </div>
// //         </div>

// //         <form onSubmit={handleSubmit} className="relative">
// //           <div className="space-y-6">

// //             {/* ADMISSION DETAILS CARD */}
// //             <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// //               <CardContent className="p-6 sm:p-8">
// //                 <SectionTitle icon={ClipboardCheck} title="Admission Details" />
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                  
// //                   <div>
// //                     <Label>Admission Type <span className="text-red-500">*</span></Label>
// //                     <Select name="admissionType" required>
// //                       <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.admissionTypes.map((type: DropdownItem) => (<SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
                  
// //                   <div>
// //                     <Label>Referred By <span className="text-red-500">*</span></Label>
// //                     <Select name="referredBy" value={referredBy} onValueChange={(val: string) => {
// //                       setReferredBy(val);
// //                       // Clear SAAMAR details if user moves away from "Other"
// //                       const selectedRef = masterData.referredBy.find((r: DropdownItem) => r.id.toString() === val);
// //                       const isOther = selectedRef && (
// //                         selectedRef.name.toLowerCase().includes('other') || 
// //                         selectedRef.name.toLowerCase().includes('saamar') ||
// //                         selectedRef.name.toLowerCase().includes('samar')
// //                       );
// //                       if (!isOther) {
// //                         setIsSamar("no");
// //                         setSamarUuid("");
// //                       }
// //                     }} required>
// //                       <SelectTrigger><SelectValue placeholder="Select Origin" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.referredBy.map((ref: DropdownItem) => (<SelectItem key={ref.id} value={ref.id.toString()}>{ref.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>

// //                   {showAshaFields && (
// //                     <>
// //                       <div><Label>Name of Sahiya/Asha</Label><Input name="referredByName" placeholder="Enter Name" /></div>
// //                       <div><Label>Sahiya/Asha Mobile</Label><Input name="referredByMobile" type="tel" placeholder="10-digit number" maxLength={10} pattern="[0-9]{10}" /></div>
// //                     </>
// //                   )}

// //                   <div><Label>Admission Date <span className="text-red-500">*</span></Label><Input type="date" name="admissionDate" value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} required /></div>
                  
// //                   <div>
// //                     <Label>Admission Time <span className="text-red-500">*</span></Label>
// //                     <div className="relative">
// //                       <Input name="admissionTime" type="time" value={admissionTime} onChange={(e) => setAdmissionTime(e.target.value)} required className="pr-10" />
// //                       <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
// //                     </div>
// //                   </div>

// //                   {/* --- SAAMAR TRACKER LOGIC --- */}
// //                   {showSamarTracker && (
// //                     <div className="lg:col-span-4 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex flex-col md:flex-row gap-4 items-end animate-in fade-in zoom-in duration-200 mt-2">
// //                       <div className="flex-1 w-full md:max-w-xs">
// //                         <Label className="text-indigo-800">Registered in SAAMAR? <span className="text-red-500">*</span></Label>
// //                         <Select name="isSamar" value={isSamar} onValueChange={(val: string) => { setIsSamar(val); if(val === "no") setSamarUuid(""); }} required={showSamarTracker}>
// //                           <SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
// //                           <SelectContent>
// //                             <SelectItem value="yes">Yes</SelectItem>
// //                             <SelectItem value="no">No</SelectItem>
// //                           </SelectContent>
// //                         </Select>
// //                       </div>
                      
// //                       {isSamar === "yes" && (
// //                         <div className="flex-1 w-full">
// //                           <Label className="text-indigo-800">SAAMAR Child UUID <span className="text-red-500">*</span></Label>
// //                           <Input name="samarUuid" value={samarUuid} onChange={(e) => setSamarUuid(e.target.value)} placeholder="Enter UUID" className="bg-white" required />
// //                         </div>
// //                       )}
// //                     </div>
// //                   )}
// //                   {/* --------------------------- */}

// //                 </div>
// //               </CardContent>
// //             </Card>

// //             <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// //               <CardContent className="p-6 sm:p-8">
// //                 <SectionTitle icon={Baby} title="Child & Guardian Information" />
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //                   <div className="lg:col-span-2">
// //                     <Label>Child Full Name <span className="text-red-500">*</span></Label>
// //                     <Input name="childName" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Enter child&apos;s full name" required />
// //                   </div>
// //                   <div className="lg:col-span-2">
// //                     <Label>Date of Birth</Label>
// //                     <Input type="date" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
// //                   </div>
// //                   <div>
// //                     <Label>Age (Years) <span className="text-red-500">*</span></Label>
// //                     <Input type="number" min="0" value={ageYears} onChange={(e) => setAgeYears(e.target.value)} placeholder="e.g. 1" required />
// //                   </div>
// //                   <div>
// //                     <Label>Age (Months) <span className="text-red-500">*</span></Label>
// //                     <Input type="number" min="0" max="11" value={ageMonths} onChange={(e) => setAgeMonths(e.target.value)} placeholder="e.g. 6" required />
// //                   </div>
// //                   <div className="lg:col-span-2">
// //                     <Label>Sex <span className="text-red-500">*</span></Label>
// //                     <Select name="sex" value={sex} onValueChange={(val: string) => setSex(val)} required>
// //                       <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.sexes.map((s: DropdownItem) => (<SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div className="lg:col-span-2">
// //                     <Label>Mother&apos;s Name <span className="text-red-500">*</span></Label>
// //                     <Input name="motherName" value={motherName} onChange={(e) => setMotherName(e.target.value)} placeholder="Enter mother's name" required />
// //                   </div>
// //                   <div className="lg:col-span-2">
// //                     <Label>Name of Caretaker / Guardian <span className="text-red-500">*</span></Label>
// //                     <Input name="parentName" placeholder="Enter guardian's name" required />
// //                   </div>
// //                   <div>
// //                     <Label>Relationship <span className="text-red-500">*</span></Label>
// //                     <Select name="relationship" required>
// //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.relationships.map((rel: DropdownItem) => (<SelectItem key={rel.id} value={rel.id.toString()}>{rel.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div>
// //                     <Label>Mobile Number <span className="text-red-500">*</span></Label>
// //                     <Input name="mobileNumber" type="tel" placeholder="10-digit number" maxLength={10} pattern="[0-9]{10}" required />
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// //               <CardContent className="p-6 sm:p-8">
// //                 <SectionTitle icon={ShieldCheck} title="Identity & Financial Details" />
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                  
// //                   <div><Label>Parent Aadhaar Number</Label><Input name="aadhaarNumber" placeholder="12-digit number" maxLength={12} pattern="[0-9]{12}" /></div>
// //                   <div><Label>BPL Number</Label><Input name="bplNumber" placeholder="Enter BPL ID" /></div>
// //                   <div className="lg:col-span-2">
// //                     <Label>Caste <span className="text-red-500">*</span></Label>
// //                     <Select name="caste" required>
// //                       <SelectTrigger><SelectValue placeholder="Select Caste" /></SelectTrigger>
// //                       <SelectContent>
// //                         {masterData.castes.map((caste: DropdownItem) => (<SelectItem key={caste.id} value={caste.id.toString()}>{caste.name}</SelectItem>))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
                  
// //                   <div className="lg:col-span-4 mt-2">
// //                     <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4"><Landmark className="w-4 h-4 text-indigo-500" /> Bank Account Details</h3>
// //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
// //                       <div><Label>Bank Name</Label><Input name="bankName" className="bg-white" /></div>
// //                       <div><Label>Account Holder</Label><Input name="accountHolderName" className="bg-white" /></div>
// //                       <div><Label>Account Number</Label><Input name="accountNumber" className="bg-white" /></div>
// //                       <div><Label>IFSC Code</Label><Input name="ifscCode" className="bg-white" /></div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// //               <CardContent className="p-6 sm:p-8">
// //                 <SectionTitle icon={MapPin} title="Location Details" />
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                   <div className="lg:col-span-3"><Label>Full Address <span className="text-red-500">*</span></Label><Textarea name="address" placeholder="Enter complete residential address" rows={2} required /></div>
// //                   <div>
// //                     <Label>District <span className="text-red-500">*</span></Label>
// //                     <Select name="district" value={district} onValueChange={(val: string) => { setDistrict(val); setBlock(""); }} required>
// //                       <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
// //                       <SelectContent>{masterData.districts.map((dist: DropdownItem) => (<SelectItem key={dist.id} value={dist.id.toString()}>{dist.name}</SelectItem>))}</SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div>
// //                     <Label>Block</Label>
// //                     <Select name="block" value={block} onValueChange={setBlock} disabled={!district}>
// //                       <SelectTrigger><SelectValue placeholder={district ? "Select Block" : "Select District First"} /></SelectTrigger>
// //                       <SelectContent>{filteredBlocks.map((b: DropdownItem) => (<SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>))}</SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div><Label>Village</Label><Input name="village" placeholder="Enter Village" /></div>
// //                   <div>
// //                     <Label>ICDS Project</Label>
// //                     <Select name="icdsProject">
// //                       <SelectTrigger><SelectValue placeholder="Select Project" /></SelectTrigger>
// //                       <SelectContent>{masterData.icdsProjects.map((project: DropdownItem) => (<SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>))}</SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div className="lg:col-span-2">
// //                     <Label>Anganwadi Center</Label>
// //                     <Select name="anganwadiCenter">
// //                       <SelectTrigger><SelectValue placeholder="Select Center" /></SelectTrigger>
// //                       <SelectContent>{masterData.anganwadis.map((center: DropdownItem) => (<SelectItem key={center.id} value={center.id.toString()}>{center.name}</SelectItem>))}</SelectContent>
// //                     </Select>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
// //               <CardContent className="p-6 sm:p-8">
// //                 <SectionTitle icon={Activity} title="Anthropometry & Feeding" />
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //                   <div><Label>Admission Weight (kg) <span className="text-red-500">*</span></Label><Input name="admissionWeight" type="number" step="0.1" value={admissionWeight} onChange={(e) => setAdmissionWeight(e.target.value)} required /></div>
// //                   <div><Label>Length/Height (cm) <span className="text-red-500">*</span></Label><Input name="admissionHeight" type="number" step="0.1" value={admissionHeight} onChange={(e) => setAdmissionHeight(e.target.value)} required /></div>
                  
// //                   {showMuac && (
// //                     <div><Label>MUAC (cm) <span className="text-red-500">*</span></Label><Input name="admissionMuac" type="number" step="0.1" required /></div>
// //                   )}

// //                   <div><Label>Z-Score (SD)</Label><Input name="zScore" readOnly value={zScore} className={cn("font-semibold focus:ring-0 cursor-not-allowed", zScore === "Error" || zScore === "" ? "bg-red-50 text-red-600" : "bg-slate-100 text-indigo-700")} /></div>
                  
// //                   <div>
// //                     <Label>Admission Odema <span className="text-red-500">*</span></Label>
// //                     <Select name="admissionOdema" required>
// //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                       <SelectContent>{masterData.odemas.map((odema: DropdownItem) => (<SelectItem key={odema.id} value={odema.id.toString()}>{odema.name}</SelectItem>))}</SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div>
// //                     <Label>Breast Feeding <span className="text-red-500">*</span></Label>
// //                     <Select name="breastFeeding" required>
// //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                       <SelectContent>{masterData.breastFeeding.map((bf: DropdownItem) => (<SelectItem key={bf.id} value={bf.id.toString()}>{bf.name}</SelectItem>))}</SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div><Label>Complementary Feeding <span className="text-red-500">*</span></Label><Select name="complementaryFeeding" required><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="1">Yes</SelectItem><SelectItem value="2">No</SelectItem></SelectContent></Select></div>
// //                   <div>
// //                     <Label>Appetite Test <span className="text-red-500">*</span></Label>
// //                     <Select name="appetiteTest" required>
// //                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
// //                       <SelectContent>{masterData.appetiteTests.map((at: DropdownItem) => (<SelectItem key={at.id} value={at.id.toString()}>{at.name}</SelectItem>))}</SelectContent>
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

// //                 {selectedComplications.includes("OTHERS") && (
// //                   <div className="mt-5 p-5 bg-indigo-50/50 rounded-xl border border-indigo-100">
// //                     <Label className="text-indigo-900">Please specify &apos;Others&apos; complication details <span className="text-red-500">*</span></Label>
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
// //             <Button variant="ghost" href="/mtc-user/dashboard/child-registration" className="min-w-40">Cancel</Button>
// //             <Button type="submit" disabled={loading || zScore === "Error" || samNumber === "Loading..."} className="min-w-40">
// //               {loading ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Registering...</span> : "Register Patient"}
// //             </Button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect } from "react";
// import { Clock, Landmark, ClipboardCheck, MapPin, Activity, Stethoscope, Baby, ShieldCheck, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";
// import { calculateZScore } from "@/lib/zScoreUtils";

// function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// // --- TypeScript Interfaces to fix the 'never' error ---
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

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'default' | 'outline' | 'ghost';
//   href?: string;
// }

// const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
//   ({ className, variant = 'default', href, ...props }, ref) => {
//     const classes = cn(
//       "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
//       variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 h-11 py-2 px-6" : "",
//       variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 h-11 py-2 px-6 text-slate-700" : "",
//       variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 h-11 py-2 px-6 text-slate-600" : "",
//       className
//     );
//     if (href) return <a href={href} className={classes} ref={ref} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />;
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

// interface SelectProps {
//   name?: string;
//   value?: string;
//   onValueChange?: (value: string) => void;
//   required?: boolean;
//   children?: React.ReactNode;
//   disabled?: boolean;
// }

// interface ComponentWithName {
//   name?: string;
// }

// const Select = ({ name, value, onValueChange, required, children, disabled }: SelectProps) => {
//   const [internalValue, setInternalValue] = useState(value || "");
  
//   useEffect(() => {
//     if (value !== undefined) setInternalValue(value);
//   }, [value]);

//   const options: {value: string, label: string}[] = [];
//   let placeholder = "Select";
  
//   React.Children.forEach(children, child => {
//     if (React.isValidElement(child)) {
//       const element = child as React.ReactElement<{ children?: React.ReactNode }>;
//       const type = element.type as ComponentWithName;
      
//       if (type?.name === 'SelectTrigger') {
//         React.Children.forEach(element.props.children, triggerChild => {
//           if (React.isValidElement(triggerChild)) {
//             const triggerElement = triggerChild as React.ReactElement<{ placeholder?: string }>;
//             const triggerType = triggerElement.type as ComponentWithName;
//             if (triggerType?.name === 'SelectValue') {
//               placeholder = triggerElement.props.placeholder || "Select";
//             }
//           }
//         });
//       }
//       if (type?.name === 'SelectContent') {
//         const contentChildren = Array.isArray(element.props.children) 
//           ? element.props.children.flat() 
//           : [element.props.children];
          
//         React.Children.forEach(contentChildren, itemChild => {
//           if (React.isValidElement(itemChild)) {
//             const itemElement = itemChild as React.ReactElement<{ value?: string; children?: React.ReactNode }>;
//             const itemType = itemElement.type as ComponentWithName;
//             if (itemType?.name === 'SelectItem') {
//               options.push({ 
//                 value: String(itemElement.props.value || ""), 
//                 label: String(itemElement.props.children || "") 
//               });
//             }
//           }
//         });
//       }
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

// interface TriggerProps { children: React.ReactNode; className?: string }
// interface ValueProps { placeholder?: string }
// interface ContentProps { children: React.ReactNode }
// interface ItemProps { children: React.ReactNode; value: string; className?: string }

// const SelectTrigger = ({ children }: TriggerProps) => <>{children}</>;
// const SelectValue = ({ placeholder }: ValueProps) => <>{placeholder}</>;
// const SelectContent = ({ children }: ContentProps) => <>{children}</>;
// const SelectItem = ({ children }: ItemProps) => <>{children}</>;

// // --- Constants ---
// const MEDICAL_COMPLICATIONS_LIST = [
//   "NO COMPLICATION", "PRESENCE OF ANY OF EMERGENCY SIGNS", "VERY WEAK, APATHETIC",
//   "ODEMA OF BOTH FEET", "SEVERE PALMAR PALLOR", "SICK YOUNG INFANT LESS THAN 2 MONTHS",
//   "LETHARGY/ DROWSINESS/ UNCONSCIOUSNESS", "CONTINUALLY IRRITABLE AND RESTLESS", "ANY RESPIRATORY DISTRESS",
//   "SEVERE DEHYDRATION WITH DIARRHOEA", "PERSISTENT VOMITING", "HYPOTHERMIA (<35°C)",
//   "SEVERE ANEMIA", "FEVER (>38.5°C)", "EXTENSIVE SKIN LESIONS",
//   "TUBERCULOSIS", "MALARIA", "OTHERS"
// ];

// // --- Main Application ---
// export default function ChildRegistration() {
//   const [loading, setLoading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [samNumber, setSamNumber] = useState("Loading...");
//   const [referredBy, setReferredBy] = useState("");
//   const [showAshaFields, setShowAshaFields] = useState(false);
  
//   // SAAMAR Control States
//   const [showSamarTracker, setShowSamarTracker] = useState(false);
//   const [isSamar, setIsSamar] = useState<string>("no");
//   const [samarUuid, setSamarUuid] = useState<string>("");
//   const [pendingSamarUUID, setPendingSamarUUID] = useState<string | null>(null);

//   const [mounted, setMounted] = useState(false);

//   // MTC Identity State
//   const [userMtcId, setUserMtcId] = useState<number | null>(null);
//   const [userMtcCode, setUserMtcCode] = useState<string>("");
  
//   // Strongly typed Master Data State
//   const [masterData, setMasterData] = useState<MasterDataState>({
//     admissionTypes: [], referredBy: [], castes: [], districts: [],
//     sexes: [], relationships: [], odemas: [], breastFeeding: [], appetiteTests: [],
//     blocks: [], icdsProjects: [], anganwadis: []
//   });
  
//   const [district, setDistrict] = useState("");
//   const [block, setBlock] = useState("");

//   const [childName, setChildName] = useState<string>(""); 
//   const [motherName, setMotherName] = useState<string>("");
//   const [dateOfBirth, setDateOfBirth] = useState<string>("");
//   const [ageYears, setAgeYears] = useState<string>(""); 
//   const [ageMonths, setAgeMonths] = useState<string>(""); 
//   const [admissionDate, setAdmissionDate] = useState<string>("");
//   const [admissionTime, setAdmissionTime] = useState<string>("");
//   const [sex, setSex] = useState<string>("");
//   const [admissionWeight, setAdmissionWeight] = useState<string>("");
//   const [admissionHeight, setAdmissionHeight] = useState<string>("");
//   const [zScore, setZScore] = useState<string>("");
  
//   const [selectedComplications, setSelectedComplications] = useState<string[]>([]);
//   const [otherComplicationDetail, setOtherComplicationDetail] = useState<string>("");

//   const showMuac = !(ageYears === "0" && parseInt(ageMonths || "0") <= 6);

//   useEffect(() => {
//     setMounted(true);
    
//     let currentMtcCode = "";
//     const sessionData = sessionStorage.getItem("mtc_user");
//     if (sessionData) {
//       try {
//         const user = JSON.parse(sessionData);
//         setUserMtcId(user.mtcId || null);
//         setUserMtcCode(user.mtcCode || "");
//         currentMtcCode = user.mtcCode || "";
//       } catch (err) {
//         console.error("Session parse error", err);
//       }
//     }

//     generateSamNumber(currentMtcCode);

//     const fetchMasterData = async () => {
//       try {
//         const response = await fetch('/api/master-data');
//         if (response.ok) {
//           const data = await response.json();
//           setMasterData(prev => ({ ...prev, ...data }));
//         }
//       } catch {
//         toast.error("Failed to load dropdown options.");
//       }
//     };
//     fetchMasterData();
//   }, []);

//   const generateSamNumber = async (code: string) => {
//     try {
//       const url = code ? `/api/next-sam-number?mtcCode=${encodeURIComponent(code)}` : '/api/next-sam-number';
//       const response = await fetch(url);
//       if (response.ok) {
//         const data = await response.json();
//         setSamNumber(data.nextSamNumber);
//       } else {
//         setSamNumber(`${code || "JH/"}0001`);
//       }
//     } catch {
//       setSamNumber(`${code || "JH/"}0001`);
//     }
//   };

//   useEffect(() => {
//     const storedData = sessionStorage.getItem("pendingRegistrationData");
//     if (storedData) {
//       try {
//         const data = JSON.parse(storedData);
//         if (data.NameOfChild || data.Name || data.ChildName) setChildName(data.NameOfChild || data.Name || data.ChildName);
//         if (data.Weight) setAdmissionWeight(data.Weight.toString());
//         if (data.Length) setAdmissionHeight(data.Length.toString());
//         if (data.Gender) {
//           const g = data.Gender.toString().toLowerCase().trim();
//           if (g === "male" || g === "m") setSex("1");
//           else if (g === "female" || g === "f") setSex("2");
//         }
//         if (data.Age && !isNaN(Number(data.Age))) {
//           const totalMonths = Number(data.Age);
//           const years = Math.floor(totalMonths / 12);
//           const months = totalMonths % 12;
//           setAgeYears(years.toString());
//           setAgeMonths(months.toString()); 
//           const today = new Date();
//           today.setMonth(today.getMonth() - totalMonths);
//           setDateOfBirth(today.toISOString().split('T')[0]);
//         }
        
//         // Ensure UUID is mapped from the referral data correctly
//         const uuid = data.uuidChild || data.UUID || data.samarUuid || data.SamarUUID || data.uuid;
//         if (uuid) {
//           setPendingSamarUUID(uuid.toString());
//         }

//         toast.success("Child details auto-filled from referral!");
//         sessionStorage.removeItem("pendingRegistrationData");
//       } catch (err) {
//         console.error("Error parsing referral data", err);
//       }
//     }
//   }, []);

//   // Safely auto-fill SAAMAR once the Master Data dropdowns have loaded
//   useEffect(() => {
//     if (pendingSamarUUID && masterData.referredBy.length > 0) {
//       const samarOrOther = masterData.referredBy.find((r: DropdownItem) =>
//         r.name.toLowerCase().includes('other') || 
//         r.name.toLowerCase().includes('saamar') ||
//         r.name.toLowerCase().includes('samar')
//       );
      
//       if (samarOrOther) {
//         setReferredBy(samarOrOther.id.toString());
//       }
      
//       setIsSamar("yes");
//       setSamarUuid(pendingSamarUUID);
//       setShowSamarTracker(true);
//       setPendingSamarUUID(null); // Clear the queue so it doesn't loop
//     }
//   }, [masterData.referredBy, pendingSamarUUID]);

//   useEffect(() => {
//     if (dateOfBirth) {
//       const dob = new Date(dateOfBirth);
//       const today = new Date();
//       let years = today.getFullYear() - dob.getFullYear();
//       let months = today.getMonth() - dob.getMonth();
//       if (months < 0) { years--; months += 12; }
//       if (today.getDate() < dob.getDate()) {
//         months--;
//         if (months < 0) { years--; months += 12; }
//       }
//       if (years >= 0 && months >= 0) {
//         setAgeYears(years.toString());
//         setAgeMonths(months.toString());
//       }
//     }
//   }, [dateOfBirth]);

//   useEffect(() => {
//     if (admissionWeight && admissionHeight && sex) {
//       const score = calculateZScore(parseFloat(admissionWeight), parseFloat(admissionHeight), sex);
//       setZScore(score !== null && score !== undefined ? String(score) : "");
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
//       if (comp === "OTHERS" && prev.includes("OTHERS")) setOtherComplicationDetail("");
//       return prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp];
//     });
//   };

//   const filteredBlocks = (masterData.blocks || []).filter((b: DropdownItem) => 
//     !district || b.districtId?.toString() === district
//   );

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (zScore === "Error" || zScore === "") {
//       toast.error("Invalid Anthropometry data."); return;
//     }
//     if (selectedComplications.length === 0) {
//       toast.error("Select at least one medical complication."); return;
//     }
//     if (selectedComplications.includes("OTHERS") && !otherComplicationDetail.trim()) {
//       toast.error("Specify details for the 'Others' complication."); return;
//     }
//     if (showSamarTracker && isSamar === "yes" && !samarUuid.trim()) {
//       toast.error("Please enter the SAAMAR Child UUID."); return;
//     }
//     if (!userMtcId) {
//       toast.error("Security Error: Unknown MTC ID. Please log out and back in."); return;
//     }
    
//     setLoading(true);

//     let finalComplications = [...selectedComplications];
//     if (finalComplications.includes("OTHERS")) {
//       finalComplications = finalComplications.filter(c => c !== "OTHERS");
//       finalComplications.push(`OTHERS: ${otherComplicationDetail.trim()}`);
//     }

//     const formData = new FormData(e.currentTarget as HTMLFormElement);
//     const payload = {
//       mtcId: userMtcId, 
//       samNumber, 
//       isSamarRegistered: showSamarTracker && isSamar === "yes", 
//       samarUuid: (showSamarTracker && isSamar === "yes") ? samarUuid : null, 
//       admissionType: formData.get('admissionType'), referredBy,
//       referredByName: formData.get('referredByName'), referredByMobile: formData.get('referredByMobile'),
//       childName: childName || formData.get('childName'), motherName: motherName || formData.get('motherName'), 
//       parentName: formData.get('parentName'), relationship: formData.get('relationship'), 
//       mobileNumber: formData.get('mobileNumber'), bplNumber: formData.get('bplNumber'), 
//       dateOfBirth, ageYears: ageYears || formData.get('ageYears'), ageMonths: ageMonths || formData.get('ageMonths'), 
//       sex, address: formData.get('address'), caste: formData.get('caste'), district, block,
//       icdsProject: formData.get('icdsProject'), anganwadiCenter: formData.get('anganwadiCenter'),
//       village: formData.get('village'), aadhaarNumber: formData.get('aadhaarNumber'),
//       bankName: formData.get('bankName'), accountHolderName: formData.get('accountHolderName'),
//       accountNumber: formData.get('accountNumber'), ifscCode: formData.get('ifscCode'),
//       admissionDate, admissionTime, admissionWeight, admissionHeight,
//       admissionMuac: showMuac ? formData.get('admissionMuac') : null, zScore: zScore,
//       admissionOdema: formData.get('admissionOdema'), breastFeeding: formData.get('breastFeeding'),
//       complementaryFeeding: formData.get('complementaryFeeding'), appetiteTest: formData.get('appetiteTest'),
//       medicalComplications: finalComplications 
//     };

//     try {
//       const response = await fetch('/api/child-registration', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
//       });
//       if (!response.ok) throw new Error('Failed to submit registration');
//       toast.success("Form submitted successfully!");
//       setIsSubmitted(true);
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : "An error occurred.";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegisterAnother = () => {
//     setIsSubmitted(false); setReferredBy(""); setShowAshaFields(false);
//     setDateOfBirth(""); setAgeYears(""); setAgeMonths(""); setAdmissionDate(""); setAdmissionTime(""); setSex("");
//     setAdmissionWeight(""); setAdmissionHeight(""); setZScore(""); setSelectedComplications([]);
//     setOtherComplicationDetail(""); setDistrict(""); setBlock(""); setChildName(""); setMotherName("");
//     setIsSamar("no"); setSamarUuid(""); setShowSamarTracker(false);
//     generateSamNumber(userMtcCode);
//   };

//   if (!mounted) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600 w-8 h-8" /></div>;

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
//         <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
//         <Card className="max-w-md w-full p-8 text-center border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
//           <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} strokeWidth={2.5} /></div>
//           <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Submitted Successfully!</h2>
//           <p className="text-slate-500 mb-8">The patient registration has been securely recorded into the system.</p>
//           <div className="flex flex-col gap-3">
//             <Button onClick={handleRegisterAnother} className="w-full">Register Another Child</Button>
//             <Button variant="outline" href="/mtc-user/dashboard/child-registration" className="w-full">Back to Dashboard</Button>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   const SectionTitle = ({ icon: Icon, title }: { icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>, title: string }) => (
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
//           <Button variant="ghost" href="/mtc-user/dashboard/child-registration" className="pl-0 text-slate-500 hover:text-indigo-600 hover:bg-transparent">
//             <ArrowLeft className="w-5 h-5 mr-2" /> Back
//           </Button>
//         </div>

//         <div className="mb-8 text-center md:text-left md:flex md:items-end md:justify-between">
//           <div>
//             <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Child Registration</h1>
//             <p className="mt-2 text-sm text-slate-500 max-w-2xl">Malnutrition Treatment Center (MTC) Intake Form.</p>
//           </div>
//           <div className="mt-4 md:mt-0 px-5 py-3 bg-white rounded-xl shadow-sm border border-slate-200 inline-block">
//             <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Generated SAM Number</span>
//             <span className="text-lg font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md">{samNumber}</span>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="relative">
//           <div className="space-y-6">

//             {/* ADMISSION DETAILS CARD */}
//             <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
//               <CardContent className="p-6 sm:p-8">
//                 <SectionTitle icon={ClipboardCheck} title="Admission Details" />
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                  
//                   <div>
//                     <Label>Admission Type <span className="text-red-500">*</span></Label>
//                     <Select name="admissionType" required>
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
//                       // Clear SAAMAR details if user moves away from "Other"
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
//                       <div><Label>Name of Sahiya/Asha</Label><Input name="referredByName" placeholder="Enter Name" /></div>
//                       <div><Label>Sahiya/Asha Mobile</Label><Input name="referredByMobile" type="tel" placeholder="10-digit number" maxLength={10} pattern="[0-9]{10}" /></div>
//                     </>
//                   )}

//                   <div><Label>Admission Date <span className="text-red-500">*</span></Label><Input type="date" name="admissionDate" value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} required /></div>
                  
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
//                   {/* --------------------------- */}

//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
//               <CardContent className="p-6 sm:p-8">
//                 <SectionTitle icon={Baby} title="Child & Guardian Information" />
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                   <div className="lg:col-span-2">
//                     <Label>Child Full Name <span className="text-red-500">*</span></Label>
//                     <Input name="childName" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Enter child&apos;s full name" required />
//                   </div>
//                   <div className="lg:col-span-2">
//                     <Label>Date of Birth</Label>
//                     <Input type="date" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
//                   </div>
//                   <div>
//                     <Label>Age (Years) <span className="text-red-500">*</span></Label>
//                     <Input type="number" min="0" value={ageYears} onChange={(e) => setAgeYears(e.target.value)} placeholder="e.g. 1" required />
//                   </div>
//                   <div>
//                     <Label>Age (Months) <span className="text-red-500">*</span></Label>
//                     <Input type="number" min="0" max="11" value={ageMonths} onChange={(e) => setAgeMonths(e.target.value)} placeholder="e.g. 6" required />
//                   </div>
//                   <div className="lg:col-span-2">
//                     <Label>Sex <span className="text-red-500">*</span></Label>
//                     <Select name="sex" value={sex} onValueChange={(val: string) => setSex(val)} required>
//                       <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
//                       <SelectContent>
//                         {masterData.sexes.map((s: DropdownItem) => (<SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="lg:col-span-2">
//                     <Label>Mother&apos;s Name <span className="text-red-500">*</span></Label>
//                     <Input name="motherName" value={motherName} onChange={(e) => setMotherName(e.target.value)} placeholder="Enter mother's name" required />
//                   </div>
//                   <div className="lg:col-span-2">
//                     <Label>Name of Caretaker / Guardian <span className="text-red-500">*</span></Label>
//                     <Input name="parentName" placeholder="Enter guardian's name" required />
//                   </div>
//                   <div>
//                     <Label>Relationship <span className="text-red-500">*</span></Label>
//                     <Select name="relationship" required>
//                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                       <SelectContent>
//                         {masterData.relationships.map((rel: DropdownItem) => (<SelectItem key={rel.id} value={rel.id.toString()}>{rel.name}</SelectItem>))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <Label>Mobile Number <span className="text-red-500">*</span></Label>
//                     <Input name="mobileNumber" type="tel" placeholder="10-digit number" maxLength={10} pattern="[0-9]{10}" required />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
//               <CardContent className="p-6 sm:p-8">
//                 <SectionTitle icon={ShieldCheck} title="Identity & Financial Details" />
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                  
//                   <div><Label>Parent Aadhaar Number</Label><Input name="aadhaarNumber" placeholder="12-digit number" maxLength={12} pattern="[0-9]{12}" /></div>
//                   <div><Label>BPL Number</Label><Input name="bplNumber" placeholder="Enter BPL ID" /></div>
//                   <div className="lg:col-span-2">
//                     <Label>Caste <span className="text-red-500">*</span></Label>
//                     <Select name="caste" required>
//                       <SelectTrigger><SelectValue placeholder="Select Caste" /></SelectTrigger>
//                       <SelectContent>
//                         {masterData.castes.map((caste: DropdownItem) => (<SelectItem key={caste.id} value={caste.id.toString()}>{caste.name}</SelectItem>))}
//                       </SelectContent>
//                     </Select>
//                   </div>
                  
//                   <div className="lg:col-span-4 mt-2">
//                     <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4"><Landmark className="w-4 h-4 text-indigo-500" /> Bank Account Details</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
//                       <div><Label>Bank Name</Label><Input name="bankName" className="bg-white" /></div>
//                       <div><Label>Account Holder</Label><Input name="accountHolderName" className="bg-white" /></div>
//                       <div><Label>Account Number</Label><Input name="accountNumber" className="bg-white" /></div>
//                       <div><Label>IFSC Code</Label><Input name="ifscCode" className="bg-white" /></div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
//               <CardContent className="p-6 sm:p-8">
//                 <SectionTitle icon={MapPin} title="Location Details" />
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   <div className="lg:col-span-3"><Label>Full Address <span className="text-red-500">*</span></Label><Textarea name="address" placeholder="Enter complete residential address" rows={2} required /></div>
//                   <div>
//                     <Label>District <span className="text-red-500">*</span></Label>
//                     <Select name="district" value={district} onValueChange={(val: string) => { setDistrict(val); setBlock(""); }} required>
//                       <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
//                       <SelectContent>{masterData.districts.map((dist: DropdownItem) => (<SelectItem key={dist.id} value={dist.id.toString()}>{dist.name}</SelectItem>))}</SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <Label>Block</Label>
//                     <Select name="block" value={block} onValueChange={setBlock} disabled={!district}>
//                       <SelectTrigger><SelectValue placeholder={district ? "Select Block" : "Select District First"} /></SelectTrigger>
//                       <SelectContent>{filteredBlocks.map((b: DropdownItem) => (<SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>))}</SelectContent>
//                     </Select>
//                   </div>
//                   <div><Label>Village</Label><Input name="village" placeholder="Enter Village" /></div>
//                   <div>
//                     <Label>ICDS Project</Label>
//                     <Select name="icdsProject">
//                       <SelectTrigger><SelectValue placeholder="Select Project" /></SelectTrigger>
//                       <SelectContent>{masterData.icdsProjects.map((project: DropdownItem) => (<SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>))}</SelectContent>
//                     </Select>
//                   </div>
//                   <div className="lg:col-span-2">
//                     <Label>Anganwadi Center</Label>
//                     <Select name="anganwadiCenter">
//                       <SelectTrigger><SelectValue placeholder="Select Center" /></SelectTrigger>
//                       <SelectContent>{masterData.anganwadis.map((center: DropdownItem) => (<SelectItem key={center.id} value={center.id.toString()}>{center.name}</SelectItem>))}</SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
//               <CardContent className="p-6 sm:p-8">
//                 <SectionTitle icon={Activity} title="Anthropometry & Feeding" />
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                   <div><Label>Admission Weight (kg) <span className="text-red-500">*</span></Label><Input name="admissionWeight" type="number" step="0.1" value={admissionWeight} onChange={(e) => setAdmissionWeight(e.target.value)} required /></div>
//                   <div><Label>Length/Height (cm) <span className="text-red-500">*</span></Label><Input name="admissionHeight" type="number" step="0.1" value={admissionHeight} onChange={(e) => setAdmissionHeight(e.target.value)} required /></div>
                  
//                   {showMuac && (
//                     <div><Label>MUAC (cm) <span className="text-red-500">*</span></Label><Input name="admissionMuac" type="number" step="0.1" required /></div>
//                   )}

//                   <div><Label>Z-Score (SD)</Label><Input name="zScore" readOnly value={zScore} className={cn("font-semibold focus:ring-0 cursor-not-allowed", zScore === "Error" || zScore === "" ? "bg-red-50 text-red-600" : "bg-slate-100 text-indigo-700")} /></div>
                  
//                   <div>
//                     <Label>Admission Odema <span className="text-red-500">*</span></Label>
//                     <Select name="admissionOdema" required>
//                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                       <SelectContent>{masterData.odemas.map((odema: DropdownItem) => (<SelectItem key={odema.id} value={odema.id.toString()}>{odema.name}</SelectItem>))}</SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <Label>Breast Feeding <span className="text-red-500">*</span></Label>
//                     <Select name="breastFeeding" required>
//                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                       <SelectContent>{masterData.breastFeeding.map((bf: DropdownItem) => (<SelectItem key={bf.id} value={bf.id.toString()}>{bf.name}</SelectItem>))}</SelectContent>
//                     </Select>
//                   </div>
//                   <div><Label>Complementary Feeding <span className="text-red-500">*</span></Label><Select name="complementaryFeeding" required><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="1">Yes</SelectItem><SelectItem value="2">No</SelectItem></SelectContent></Select></div>
//                   <div>
//                     <Label>Appetite Test <span className="text-red-500">*</span></Label>
//                     <Select name="appetiteTest" required>
//                       <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                       <SelectContent>{masterData.appetiteTests.map((at: DropdownItem) => (<SelectItem key={at.id} value={at.id.toString()}>{at.name}</SelectItem>))}</SelectContent>
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

//                 {selectedComplications.includes("OTHERS") && (
//                   <div className="mt-5 p-5 bg-indigo-50/50 rounded-xl border border-indigo-100">
//                     <Label className="text-indigo-900">Please specify &apos;Others&apos; complication details <span className="text-red-500">*</span></Label>
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
//             <Button variant="ghost" href="/mtc-user/dashboard/child-registration" className="min-w-40">Cancel</Button>
//             <Button type="submit" disabled={loading || zScore === "Error" || samNumber === "Loading..."} className="min-w-40">
//               {loading ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Registering...</span> : "Register Patient"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { Clock, Landmark, ClipboardCheck, MapPin, Activity, Stethoscope, Baby, ShieldCheck, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { calculateZScore } from "@/lib/zScoreUtils";

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
      const componentType = element.type as any;
      
      // Use explicit displayName properties to withstand production minification
      if (componentType?.displayName === 'SelectTrigger') {
        React.Children.forEach(element.props.children, triggerChild => {
          if (React.isValidElement(triggerChild)) {
            const triggerElement = triggerChild as React.ReactElement<{ placeholder?: string }>;
            const triggerType = triggerElement.type as any;
            if (triggerType?.displayName === 'SelectValue') {
              placeholder = triggerElement.props.placeholder || "Select";
            }
          }
        });
      }
      if (componentType?.displayName === 'SelectContent') {
        const contentChildren = Array.isArray(element.props.children) 
          ? element.props.children.flat() 
          : [element.props.children];
          
        React.Children.forEach(contentChildren, itemChild => {
          if (React.isValidElement(itemChild)) {
            const itemElement = itemChild as React.ReactElement<{ value?: string; children?: React.ReactNode }>;
            const itemType = itemElement.type as any;
            if (itemType?.displayName === 'SelectItem') {
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
    <div className="relative w-full">
      <select name={name} value={internalValue} onChange={handleChange} required={required} disabled={disabled} className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100 appearance-none">
        <option value="" disabled>{placeholder}</option>
        {options.map((opt, i) => (<option key={i} value={opt.value}>{opt.label}</option>))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

interface TriggerProps { children: React.ReactNode; className?: string }
interface ValueProps { placeholder?: string }
interface ContentProps { children: React.ReactNode }
interface ItemProps { children: React.ReactNode; value: string; className?: string }

const SelectTrigger = ({ children }: TriggerProps) => <>{children}</>;
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({ placeholder }: ValueProps) => <>{placeholder}</>;
SelectValue.displayName = "SelectValue";

const SelectContent = ({ children }: ContentProps) => <>{children}</>;
SelectContent.displayName = "SelectContent";

const SelectItem = ({ children }: ItemProps) => <>{children}</>;
SelectItem.displayName = "SelectItem";

// --- Constants ---
const MEDICAL_COMPLICATIONS_LIST = [
  "NO COMPLICATION", "PRESENCE OF ANY OF EMERGENCY SIGNS", "VERY WEAK, APATHETIC",
  "ODEMA OF BOTH FEET", "SEVERE PALMAR PALLOR", "SICK YOUNG INFANT LESS THAN 2 MONTHS",
  "LETHARGY/ DROWSINESS/ UNCONSCIOUSNESS", "CONTINUALLY IRRITABLE AND RESTLESS", "ANY RESPIRATORY DISTRESS",
  "SEVERE DEHYDRATION WITH DIARRHOEA", "PERSISTENT VOMITING", "HYPOTHERMIA (<35°C)",
  "SEVERE ANEMIA", "FEVER (>38.5°C)", "EXTENSIVE SKIN LESIONS",
  "TUBERCULOSIS", "MALARIA", "OTHERS"
];

// --- Main Application ---
export default function ChildRegistration() {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [samNumber, setSamNumber] = useState("Loading...");
  const [referredBy, setReferredBy] = useState("");
  const [showAshaFields, setShowAshaFields] = useState(false);
  
  // SAAMAR Control States
  const [showSamarTracker, setShowSamarTracker] = useState(false);
  const [isSamar, setIsSamar] = useState<string>("no");
  const [samarUuid, setSamarUuid] = useState<string>("");
  const [pendingSamarUUID, setPendingSamarUUID] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);

  // MTC Identity State
  const [userMtcId, setUserMtcId] = useState<number | null>(null);
  const [userMtcCode, setUserMtcCode] = useState<string>("");
  
  // Master Data State
  const [masterData, setMasterData] = useState<MasterDataState>({
    admissionTypes: [], referredBy: [], castes: [], districts: [],
    sexes: [], relationships: [], odemas: [], breastFeeding: [], appetiteTests: [],
    blocks: [], icdsProjects: [], anganwadis: []
  });
  
  const [district, setDistrict] = useState("");
  const [block, setBlock] = useState("");

  const [childName, setChildName] = useState<string>(""); 
  const [motherName, setMotherName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [ageYears, setAgeYears] = useState<string>(""); 
  const [ageMonths, setAgeMonths] = useState<string>(""); 
  const [admissionDate, setAdmissionDate] = useState<string>("");
  const [admissionTime, setAdmissionTime] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [admissionWeight, setAdmissionWeight] = useState<string>("");
  const [admissionHeight, setAdmissionHeight] = useState<string>("");
  const [zScore, setZScore] = useState<string>("");
  
  const [selectedComplications, setSelectedComplications] = useState<string[]>([]);
  const [otherComplicationDetail, setOtherComplicationDetail] = useState<string>("");

  const showMuac = !(ageYears === "0" && parseInt(ageMonths || "0") <= 6);

  useEffect(() => {
    setMounted(true);
    
    let currentMtcCode = "";
    const sessionData = sessionStorage.getItem("mtc_user");
    if (sessionData) {
      try {
        const user = JSON.parse(sessionData);
        setUserMtcId(user.mtcId || null);
        setUserMtcCode(user.mtcCode || "");
        currentMtcCode = user.mtcCode || "";
      } catch (err) {
        console.error("Session parse error", err);
      }
    }

    generateSamNumber(currentMtcCode);

    const fetchMasterData = async () => {
      try {
        // Enforce safe deployment resolution path via relative origins
        const response = await fetch('/api/master-data');
        if (response.ok) {
          const data = await response.json();
          setMasterData(prev => ({ ...prev, ...data }));
        } else {
          toast.error("Endpoint response failed.");
        }
      } catch {
        toast.error("Failed to load dropdown options.");
      }
    };
    fetchMasterData();
  }, []);

  const generateSamNumber = async (code: string) => {
    try {
      const url = code ? `/api/next-sam-number?mtcCode=${encodeURIComponent(code)}` : '/api/next-sam-number';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSamNumber(data.nextSamNumber);
      } else {
        setSamNumber(`${code || "JH/"}0001`);
      }
    } catch {
      setSamNumber(`${code || "JH/"}0001`);
    }
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem("pendingRegistrationData");
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        if (data.NameOfChild || data.Name || data.ChildName) setChildName(data.NameOfChild || data.Name || data.ChildName);
        if (data.Weight) setAdmissionWeight(data.Weight.toString());
        if (data.Length) setAdmissionHeight(data.Length.toString());
        if (data.Gender) {
          const g = data.Gender.toString().toLowerCase().trim();
          if (g === "male" || g === "m") setSex("1");
          else if (g === "female" || g === "f") setSex("2");
        }
        if (data.Age && !isNaN(Number(data.Age))) {
          const totalMonths = Number(data.Age);
          const years = Math.floor(totalMonths / 12);
          const months = totalMonths % 12;
          setAgeYears(years.toString());
          setAgeMonths(months.toString()); 
          const today = new Date();
          today.setMonth(today.getMonth() - totalMonths);
          setDateOfBirth(today.toISOString().split('T')[0]);
        }
        
        const uuid = data.uuidChild || data.UUID || data.samarUuid || data.SamarUUID || data.uuid;
        if (uuid) {
          setPendingSamarUUID(uuid.toString());
        }

        toast.success("Child details auto-filled from referral!");
        sessionStorage.removeItem("pendingRegistrationData");
      } catch (err) {
        console.error("Error parsing referral data", err);
      }
    }
  }, []);

  useEffect(() => {
    if (pendingSamarUUID && masterData.referredBy.length > 0) {
      const samarOrOther = masterData.referredBy.find((r: DropdownItem) =>
        r.name.toLowerCase().includes('other') || 
        r.name.toLowerCase().includes('saamar') ||
        r.name.toLowerCase().includes('samar')
      );
      
      if (samarOrOther) {
        setReferredBy(samarOrOther.id.toString());
      }
      
      setIsSamar("yes");
      setSamarUuid(pendingSamarUUID);
      setShowSamarTracker(true);
      setPendingSamarUUID(null);
    }
  }, [masterData.referredBy, pendingSamarUUID]);

  useEffect(() => {
    if (dateOfBirth) {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      let years = today.getFullYear() - dob.getFullYear();
      let months = today.getMonth() - dob.getMonth();
      if (months < 0) { years--; months += 12; }
      if (today.getDate() < dob.getDate()) {
        months--;
        if (months < 0) { years--; months += 12; }
      }
      if (years >= 0 && months >= 0) {
        setAgeYears(years.toString());
        setAgeMonths(months.toString());
      }
    }
  }, [dateOfBirth]);

  useEffect(() => {
    if (admissionWeight && admissionHeight && sex) {
      const score = calculateZScore(parseFloat(admissionWeight), parseFloat(admissionHeight), sex);
      setZScore(score !== null && score !== undefined ? String(score) : "");
    } else {
      setZScore("");
    }
  }, [admissionWeight, admissionHeight, sex]);

  useEffect(() => {
    setShowAshaFields(referredBy === "6"); 
    
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
      if (comp === "OTHERS" && prev.includes("OTHERS")) setOtherComplicationDetail("");
      return prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp];
    });
  };

  const filteredBlocks = (masterData.blocks || []).filter((b: DropdownItem) => 
    !district || b.districtId?.toString() === district
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (zScore === "Error" || zScore === "") {
      toast.error("Invalid Anthropometry data."); return;
    }
    if (selectedComplications.length === 0) {
      toast.error("Select at least one medical complication."); return;
    }
    if (selectedComplications.includes("OTHERS") && !otherComplicationDetail.trim()) {
      toast.error("Specify details for the 'Others' complication."); return;
    }
    if (showSamarTracker && isSamar === "yes" && !samarUuid.trim()) {
      toast.error("Please enter the SAAMAR Child UUID."); return;
    }
    if (!userMtcId) {
      toast.error("Security Error: Unknown MTC ID. Please log out and back in."); return;
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
      samNumber, 
      isSamarRegistered: showSamarTracker && isSamar === "yes", 
      samarUuid: (showSamarTracker && isSamar === "yes") ? samarUuid : null, 
      admissionType: formData.get('admissionType'), referredBy,
      referredByName: formData.get('referredByName'), referredByMobile: formData.get('referredByMobile'),
      childName: childName || formData.get('childName'), motherName: motherName || formData.get('motherName'), 
      parentName: formData.get('parentName'), relationship: formData.get('relationship'), 
      mobileNumber: formData.get('mobileNumber'), bplNumber: formData.get('bplNumber'), 
      dateOfBirth, ageYears: ageYears || formData.get('ageYears'), ageMonths: ageMonths || formData.get('ageMonths'), 
      sex, address: formData.get('address'), caste: formData.get('caste'), district, block,
      icdsProject: formData.get('icdsProject'), anganwadiCenter: formData.get('anganwadiCenter'),
      village: formData.get('village'), aadhaarNumber: formData.get('aadhaarNumber') ? "[Aadhaar Redacted]" : null,
      bankName: formData.get('bankName'), accountHolderName: formData.get('accountHolderName'),
      accountNumber: formData.get('accountNumber'), ifscCode: formData.get('ifscCode'),
      admissionDate, admissionTime, admissionWeight, admissionHeight,
      admissionMuac: showMuac ? formData.get('admissionMuac') : null, zScore: zScore,
      admissionOdema: formData.get('admissionOdema'), breastFeeding: formData.get('breastFeeding'),
      complementaryFeeding: formData.get('complementaryFeeding'), appetiteTest: formData.get('appetiteTest'),
      medicalComplications: finalComplications 
    };

    try {
      const response = await fetch('/api/child-registration', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Failed to submit registration');
      toast.success("Form submitted successfully!");
      setIsSubmitted(true);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterAnother = () => {
    setIsSubmitted(false); setReferredBy(""); setShowAshaFields(false);
    setDateOfBirth(""); setAgeYears(""); setAgeMonths(""); setAdmissionDate(""); setAdmissionTime(""); setSex("");
    setAdmissionWeight(""); setAdmissionHeight(""); setZScore(""); setSelectedComplications([]);
    setOtherComplicationDetail(""); setDistrict(""); setBlock(""); setChildName(""); setMotherName("");
    setIsSamar("no"); setSamarUuid(""); setShowSamarTracker(false);
    generateSamNumber(userMtcCode);
  };

  if (!mounted) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600 w-8 h-8" /></div>;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <Toaster position="top-center" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
        <Card className="max-w-md w-full p-8 text-center border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} strokeWidth={2.5} /></div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Submitted Successfully!</h2>
          <p className="text-slate-500 mb-8">The patient registration has been securely recorded into the system.</p>
          <div className="flex flex-col gap-3">
            <Button onClick={handleRegisterAnother} className="w-full">Register Another Child</Button>
            <Button variant="outline" href="/mtc-user/dashboard/child-registration" className="w-full">Back to Dashboard</Button>
          </div>
        </Card>
      </div>
    );
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
          <Button variant="ghost" href="/mtc-user/dashboard/child-registration" className="pl-0 text-slate-500 hover:text-indigo-600 hover:bg-transparent">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
        </div>

        <div className="mb-8 text-center md:text-left md:flex md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Child Registration</h1>
            <p className="mt-2 text-sm text-slate-500 max-w-2xl">Malnutrition Treatment Center (MTC) Intake Form.</p>
          </div>
          <div className="mt-4 md:mt-0 px-5 py-3 bg-white rounded-xl shadow-sm border border-slate-200 inline-block">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Generated SAM Number</span>
            <span className="text-lg font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md">{samNumber}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="space-y-6">

            {/* ADMISSION DETAILS CARD */}
            <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
              <CardContent className="p-6 sm:p-8">
                <SectionTitle icon={ClipboardCheck} title="Admission Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                  
                  <div>
                    <Label>Admission Type <span className="text-red-500">*</span></Label>
                    <Select name="admissionType" required>
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
                      <div><Label>Name of Sahiya/Asha</Label><Input name="referredByName" placeholder="Enter Name" /></div>
                      <div><Label>Sahiya/Asha Mobile</Label><Input name="referredByMobile" type="tel" placeholder="10-digit number" maxLength={10} pattern="[0-9]{10}" /></div>
                    </>
                  )}

                  <div><Label>Admission Date <span className="text-red-500">*</span></Label><Input type="date" name="admissionDate" value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} required /></div>
                  
                  <div>
                    <Label>Admission Time <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Input name="admissionTime" type="time" value={admissionTime} onChange={(e) => setAdmissionTime(e.target.value)} required className="pr-10" />
                      <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                    </div>
                  </div>

                  {/* SAAMAR TRACKER LOGIC */}
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

            {/* CHILD AND GUARDIAN CARD */}
            <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
              <CardContent className="p-6 sm:p-8">
                <SectionTitle icon={Baby} title="Child & Guardian Information" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-2">
                    <Label>Child Full Name <span className="text-red-500">*</span></Label>
                    <Input name="childName" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="Enter child full name" required />
                  </div>
                  <div className="lg:col-span-2">
                    <Label>Date of Birth</Label>
                    <Input type="date" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                  </div>
                  <div>
                    <Label>Age (Years) <span className="text-red-500">*</span></Label>
                    <Input type="number" min="0" value={ageYears} onChange={(e) => setAgeYears(e.target.value)} placeholder="e.g. 1" required />
                  </div>
                  <div>
                    <Label>Age (Months) <span className="text-red-500">*</span></Label>
                    <Input type="number" min="0" max="11" value={ageMonths} onChange={(e) => setAgeMonths(e.target.value)} placeholder="e.g. 6" required />
                  </div>
                  <div className="lg:col-span-2">
                    <Label>Sex <span className="text-red-500">*</span></Label>
                    <Select name="sex" value={sex} onValueChange={(val: string) => setSex(val)} required>
                      <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                      <SelectContent>
                        {masterData.sexes.map((s: DropdownItem) => (<SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="lg:col-span-2">
                    <Label>Mother&apos;s Name <span className="text-red-500">*</span></Label>
                    <Input name="motherName" value={motherName} onChange={(e) => setMotherName(e.target.value)} placeholder="Enter mother's name" required />
                  </div>
                  <div className="lg:col-span-2">
                    <Label>Name of Caretaker / Guardian <span className="text-red-500">*</span></Label>
                    <Input name="parentName" placeholder="Enter guardian's name" required />
                  </div>
                  <div>
                    <Label>Relationship <span className="text-red-500">*</span></Label>
                    <Select name="relationship" required>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {masterData.relationships.map((rel: DropdownItem) => (<SelectItem key={rel.id} value={rel.id.toString()}>{rel.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Mobile Number <span className="text-red-500">*</span></Label>
                    <Input name="mobileNumber" type="tel" placeholder="10-digit number" maxLength={10} pattern="[0-9]{10}" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* IDENTITY AND FINANCIAL DETAILS CARD */}
            <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
              <CardContent className="p-6 sm:p-8">
                <SectionTitle icon={ShieldCheck} title="Identity & Financial Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                  
                  <div><Label>Parent Aadhaar Number</Label><Input name="aadhaarNumber" placeholder="12-digit number" maxLength={12} pattern="[0-9]{12}" /></div>
                  <div><Label>BPL Number</Label><Input name="bplNumber" placeholder="Enter BPL ID" /></div>
                  <div className="lg:col-span-2">
                    <Label>Caste <span className="text-red-500">*</span></Label>
                    <Select name="caste" required>
                      <SelectTrigger><SelectValue placeholder="Select Caste" /></SelectTrigger>
                      <SelectContent>
                        {masterData.castes.map((caste: DropdownItem) => (<SelectItem key={caste.id} value={caste.id.toString()}>{caste.name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="lg:col-span-4 mt-2">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4"><Landmark className="w-4 h-4 text-indigo-500" /> Bank Account Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
                      <div><Label>Bank Name</Label><Input name="bankName" className="bg-white" /></div>
                      <div><Label>Account Holder</Label><Input name="accountHolderName" className="bg-white" /></div>
                      <div><Label>Account Number</Label><Input name="accountNumber" className="bg-white" /></div>
                      <div><Label>IFSC Code</Label><Input name="ifscCode" className="bg-white" /></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LOCATION DETAILS CARD */}
            <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
              <CardContent className="p-6 sm:p-8">
                <SectionTitle icon={MapPin} title="Location Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-3"><Label>Full Address <span className="text-red-500">*</span></Label><Textarea name="address" placeholder="Enter complete residential address" rows={2} required /></div>
                  <div>
                    <Label>District <span className="text-red-500">*</span></Label>
                    <Select name="district" value={district} onValueChange={(val: string) => { setDistrict(val); setBlock(""); }} required>
                      <SelectTrigger><SelectValue placeholder="Select District" /></SelectTrigger>
                      <SelectContent>{masterData.districts.map((dist: DropdownItem) => (<SelectItem key={dist.id} value={dist.id.toString()}>{dist.name}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Block</Label>
                    <Select name="block" value={block} onValueChange={setBlock} disabled={!district}>
                      <SelectTrigger><SelectValue placeholder={district ? "Select Block" : "Select District First"} /></SelectTrigger>
                      <SelectContent>{filteredBlocks.map((b: DropdownItem) => (<SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div><Label>Village</Label><Input name="village" placeholder="Enter Village" /></div>
                  <div>
                    <Label>ICDS Project</Label>
                    <Select name="icdsProject">
                      <SelectTrigger><SelectValue placeholder="Select Project" /></SelectTrigger>
                      <SelectContent>{masterData.icdsProjects.map((project: DropdownItem) => (<SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div className="lg:col-span-2">
                    <Label>Anganwadi Center</Label>
                    <Select name="anganwadiCenter">
                      <SelectTrigger><SelectValue placeholder="Select Center" /></SelectTrigger>
                      <SelectContent>{masterData.anganwadis.map((center: DropdownItem) => (<SelectItem key={center.id} value={center.id.toString()}>{center.name}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ANTHROPOMETRY CARD */}
            <Card className="overflow-hidden border-0 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
              <CardContent className="p-6 sm:p-8">
                <SectionTitle icon={Activity} title="Anthropometry & Feeding" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div><Label>Admission Weight (kg) <span className="text-red-500">*</span></Label><Input name="admissionWeight" type="number" step="0.1" value={admissionWeight} onChange={(e) => setAdmissionWeight(e.target.value)} required /></div>
                  <div><Label>Length/Height (cm) <span className="text-red-500">*</span></Label><Input name="admissionHeight" type="number" step="0.1" value={admissionHeight} onChange={(e) => setAdmissionHeight(e.target.value)} required /></div>
                  
                  {showMuac && (
                    <div><Label>MUAC (cm) <span className="text-red-500">*</span></Label><Input name="admissionMuac" type="number" step="0.1" required /></div>
                  )}

                  <div><Label>Z-Score (SD)</Label><Input name="zScore" readOnly value={zScore} className={cn("font-semibold focus:ring-0 cursor-not-allowed", zScore === "Error" || zScore === "" ? "bg-red-50 text-red-600" : "bg-slate-100 text-indigo-700")} /></div>
                  
                  <div>
                    <Label>Admission Odema <span className="text-red-500">*</span></Label>
                    <Select name="admissionOdema" required>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>{masterData.odemas.map((odema: DropdownItem) => (<SelectItem key={odema.id} value={odema.id.toString()}>{odema.name}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Breast Feeding <span className="text-red-500">*</span></Label>
                    <Select name="breastFeeding" required>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>{masterData.breastFeeding.map((bf: DropdownItem) => (<SelectItem key={bf.id} value={bf.id.toString()}>{bf.name}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div><Label>Complementary Feeding <span className="text-red-500">*</span></Label><Select name="complementaryFeeding" required><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="1">Yes</SelectItem><SelectItem value="2">No</SelectItem></SelectContent></Select></div>
                  <div>
                    <Label>Appetite Test <span className="text-red-500">*</span></Label>
                    <Select name="appetiteTest" required>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>{masterData.appetiteTests.map((at: DropdownItem) => (<SelectItem key={at.id} value={at.id.toString()}>{at.name}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MEDICAL COMPLICATIONS CARD */}
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

          {/* ACTION BUTTONS PANEL */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 p-4 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 flex justify-end gap-4 sm:justify-center md:justify-end md:px-12">
            <Button variant="ghost" href="/mtc-user/dashboard/child-registration" className="min-w-40">Cancel</Button>
            <Button type="submit" disabled={loading || zScore === "Error" || samNumber === "Loading..."} className="min-w-40">
              {loading ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Registering...</span> : "Register Patient"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}