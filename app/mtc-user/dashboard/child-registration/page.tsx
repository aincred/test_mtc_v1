

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, ArrowLeft, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isValid } from "date-fns"; 
import { cn } from "@/lib/utils";
import Image from "next/image";

// Import Z-Score Utils (Ensure this file exists in your project)
import { calculateZScore, getZScoreColor } from "@/lib/zScoreUtils"; 

interface ChildData {
  id: string;
  SamNo: string;
  MTCCode: string;
  AtId: string;
  RefererId: string;
  ChildName: string;
  MotherName: string;
  FatherName: string;
  MobileNumber: string;
  BPLNo: string;
  DateofBirth: string | null;
  GenderId: string;
  CastId: string;
  Address: string;
  DistrictId: string;
  BlockId: string;
  ICDSId: string;
  AnganwadiId: string;
  VillageName: string;
  AdmissionDate: string | null;
  AdmissionWeight: string;
  AdmissionHeight: string;
  AdmissionZScore: string;
  AdmissionEdema: string;
  AdmissionMuac: string;
  AdmissionAppetite: string;
  BreastFeeding: string;
  ComplementaryFeeding: string;
  MedicalComplication: string;
  RegistrationImage?: string | null;
}

export default function EditChildRegistration() {
  const router = useRouter();
  const params = useParams();
  const childId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // State for initial data load
  const [childData, setChildData] = useState<ChildData | null>(null);
  
  // UI States
  const [referredBy, setReferredBy] = useState("");
  const [showAshaFields, setShowAshaFields] = useState(false);
  const [selectedComplications, setSelectedComplications] = useState<{ [key: string]: boolean }>({});
  const [otherComplication, setOtherComplication] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  // Date States
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [admissionDate, setAdmissionDate] = useState<Date | undefined>(undefined);
  const [admissionTime, setAdmissionTime] = useState<string>("");

  // --- CONTROLLED STATES FOR Z-SCORE ---
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [zScore, setZScore] = useState<string>("");

  // 🔹 Fetch Data from API instead of LocalStorage
  useEffect(() => {
    async function fetchChildData() {
      try {
        const response = await fetch(`/api/children/${childId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch child data");
        }

        const child: ChildData = await response.json();
        setChildData(child);

        // --- Populate Form Fields ---
        setReferredBy(child.RefererId || "");
        setPhotoPreview(child.RegistrationImage || null);
        
        // Vitals
        setWeight(child.AdmissionWeight || "");
        setHeight(child.AdmissionHeight || "");
        setSex(child.GenderId || "");
        
        // Date Parsing (Robust handling for ISO or YYYY-MM-DD)
        if (child.AdmissionDate) {
          try {
             const dateObj = new Date(child.AdmissionDate);
             if (isValid(dateObj)) {
               setAdmissionDate(dateObj);
               // Extract time nicely
               setAdmissionTime(format(dateObj, "HH:mm"));
             }
          } catch (e) {
             console.error("Date parse error", e);
          }
        }

        if (child.DateofBirth) {
           const dobObj = new Date(child.DateofBirth);
           if(isValid(dobObj)) setDateOfBirth(dobObj);
        }
        
        // Parse Complications
        const complicationsObj: { [key: string]: boolean } = {};
        if (child.MedicalComplication) {
            const [idsPart, otherPart] = child.MedicalComplication.split(" - ");
            if(otherPart) setOtherComplication(otherPart);
            
            idsPart.split(",").forEach((id: string) => {
                if(id) complicationsObj[id.trim()] = true;
            });
        }
        setSelectedComplications(complicationsObj);

      } catch (error) {
        console.error(error);
        toast.error("Could not load child record.");
      } finally {
        setFetching(false);
      }
    }

    if (childId) {
      fetchChildData();
    }
  }, [childId]);

  // Handle Asha/Sahiya visibility
  useEffect(() => {
    setShowAshaFields(referredBy === "6");
  }, [referredBy]);

  // --- AUTO-CALCULATE Z-SCORE ---
  useEffect(() => {
    if (weight && height && sex) {
        // Ensure calculateZScore handles string inputs or convert here
        const calculated = calculateZScore(parseFloat(weight), parseFloat(height), sex);
        setZScore(calculated);
    } else {
        setZScore("");
    }
  }, [weight, height, sex]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) return toast.error("Max size 2MB");
      
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleComplicationChange = (id: string, checked: boolean) => {
    setSelectedComplications(prev => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!childData) return;

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    // Reconstruct Complications String
    const complicationsArray = Object.keys(selectedComplications).filter(key => selectedComplications[key]);
    let complicationString = complicationsArray.join(",");
    if(selectedComplications["17"] && otherComplication) {
        complicationString += ` - ${otherComplication}`;
    }

    // Format Admission Date + Time
    let finalAdmissionDate = null;
    if (admissionDate) {
        const dateStr = format(admissionDate, "yyyy-MM-dd");
        finalAdmissionDate = admissionTime ? `${dateStr} ${admissionTime}` : dateStr;
    }

    const updatedChild = {
      ...childData,
      AtId: formData.get('admissionType') as string,
      RefererId: referredBy,
      ChildName: formData.get('childName') as string,
      MotherName: formData.get('motherName') as string,
      FatherName: formData.get('fatherName') as string,
      MobileNumber: formData.get('mobileNumber') as string,
      BPLNo: formData.get('bplNumber') as string,
      DateofBirth: dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : null,
      GenderId: sex,
      AdmissionWeight: weight,
      AdmissionHeight: height,
      AdmissionZScore: zScore,
      Address: formData.get('address') as string,
      CastId: formData.get('caste') as string,
      DistrictId: formData.get('district') as string,
      BlockId: formData.get('block') as string,
      ICDSId: formData.get('icdsProject') as string,
      AnganwadiId: formData.get('anganwadiCenter') as string,
      VillageName: formData.get('village') as string,
      AdmissionDate: finalAdmissionDate,
      AdmissionEdema: formData.get('admissionOdema') as string,
      AdmissionMuac: formData.get('admissionMuac') as string,
      BreastFeeding: formData.get('breastFeeding') as string,
      ComplementaryFeeding: formData.get('complementaryFeeding') as string,
      AdmissionAppetite: formData.get('appetiteTest') as string,
      MedicalComplication: complicationString,
      RegistrationImage: photoPreview || null,
    };

    // 🔹 API PUT Request
    try {
        const res = await fetch(`/api/children/${childId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedChild)
        });

        if (!res.ok) throw new Error("Update failed");

        toast.success("Child record updated successfully!");
        
        // Optional: wait a moment before redirect
        setTimeout(() => {
            router.push('/mtc-user/dashboard/child-registration');
        }, 800);

    } catch (error) {
        console.error("Update Error:", error);
        toast.error("Failed to update record in database");
    } finally {
        setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
          <p className="text-sm text-gray-500">Loading child details...</p>
        </div>
      </div>
    );
  }

  if (!childData) {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Child Record Not Found</h2>
            <Button onClick={() => router.back()}>Go Back</Button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-md border border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => router.back()} className="mb-2">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              <h1 className="text-2xl font-bold text-teal-700">Edit Child Registration</h1>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SAM Number + Admission Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>SAM Number</Label>
                  <Input value={childData.SamNo} readOnly className="bg-gray-100 font-mono font-bold" />
                </div>
                <div>
                  <Label>Admission Type <span className="text-red-500">*</span></Label>
                  <Select name="admissionType" defaultValue={childData.AtId} required>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">NEW ADMISSION</SelectItem>
                      <SelectItem value="2">RE ADMISSION</SelectItem>
                      <SelectItem value="3">RELAPSE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Referred By</Label>
                  <Select name="referredBy" value={referredBy} onValueChange={setReferredBy}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">Sahiya/ASHA</SelectItem>
                      <SelectItem value="1">ANGANWADI</SelectItem>
                      <SelectItem value="2">ANM</SelectItem>
                      <SelectItem value="3">OPD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {showAshaFields && (
                  <div><Label>Sahiya Name</Label><Input name="referredByName" placeholder="Enter Name" /></div>
                )}
              </div>

              {/* Child & Parent Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div><Label>Child Name *</Label><Input name="childName" defaultValue={childData.ChildName} required /></div>
                <div><Label>Mother Name *</Label><Input name="motherName" defaultValue={childData.MotherName} required /></div>
                <div><Label>Father Name *</Label><Input name="fatherName" defaultValue={childData.FatherName} required /></div>
                <div><Label>Mobile *</Label><Input name="mobileNumber" defaultValue={childData.MobileNumber} maxLength={10} required /></div>
              </div>

              {/* BPL, DOB, Sex */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div><Label>BPL Number</Label><Input name="bplNumber" defaultValue={childData.BPLNo} /></div>
                <div>
                  <Label>Date of Birth *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateOfBirth && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateOfBirth ? format(dateOfBirth, "PPP") : "Pick date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dateOfBirth} onSelect={setDateOfBirth} initialFocus /></PopoverContent>
                  </Popover>
                </div>
                
                {/* SEX - Controlled State */}
                <div>
                  <Label>Sex <span className="text-red-500">*</span></Label>
                  <Select name="sex" value={sex} onValueChange={setSex} required>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Male</SelectItem>
                      <SelectItem value="2">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Address</Label><Textarea name="address" defaultValue={childData.Address} rows={1} /></div>
              </div>

              {/* Geo Location */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div><Label>Caste</Label><Select name="caste" defaultValue={childData.CastId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">ST</SelectItem></SelectContent></Select></div>
                <div><Label>District</Label><Select name="district" defaultValue={childData.DistrictId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="24">WEST SINGHBHUM</SelectItem></SelectContent></Select></div>
                <div><Label>Block</Label><Select name="block" defaultValue={childData.BlockId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="block1">Block 1</SelectItem></SelectContent></Select></div>
                <div><Label>ICDS</Label><Select name="icdsProject" defaultValue={childData.ICDSId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="icds1">ICDS 1</SelectItem></SelectContent></Select></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                 <div><Label>Anganwadi</Label><Select name="anganwadiCenter" defaultValue={childData.AnganwadiId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="anganwadi1">AWC 1</SelectItem></SelectContent></Select></div>
                 <div><Label>Village</Label><Input name="village" defaultValue={childData.VillageName} /></div>
                 <div><Label>Admission Date</Label><Button variant="outline" type="button" className="w-full justify-start">{admissionDate ? format(admissionDate, "PPP") : "Pick date"}</Button></div>
                 <div><Label>Time</Label><Input type="time" name="admissionTime" value={admissionTime} onChange={e => setAdmissionTime(e.target.value)} /></div>
              </div>

              {/* Vitals with Z-Score */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                <div>
                  <Label>Weight (kg) *</Label>
                  <Input 
                    name="admissionWeight" type="number" step="0.01" 
                    value={weight} onChange={e => setWeight(e.target.value)} required 
                  />
                </div>
                <div>
                  <Label>Height (cm) *</Label>
                  <Input 
                    name="admissionHeight" type="number" step="0.1" 
                    value={height} onChange={e => setHeight(e.target.value)} required 
                  />
                </div>
                <div>
                  <Label>Z-Score (SD)</Label>
                  <Input 
                    name="admissionZScore" 
                    value={zScore} 
                    readOnly 
                    className={cn("bg-white font-bold", getZScoreColor(zScore))} 
                  />
                </div>
                <div>
                  <Label>Odema *</Label>
                  <Select name="admissionOdema" defaultValue={childData.AdmissionEdema}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="4">No</SelectItem><SelectItem value="1">+</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>

              {/* MUAC & Feeding */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div><Label>MUAC (cm) *</Label><Input name="admissionMuac" type="number" step="0.1" defaultValue={childData.AdmissionMuac} required /></div>
                <div><Label>Breast Feeding</Label><Select name="breastFeeding" defaultValue={childData.BreastFeeding}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">Yes</SelectItem></SelectContent></Select></div>
                <div><Label>Comp. Feeding</Label><Select name="complementaryFeeding" defaultValue={childData.ComplementaryFeeding}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">Yes</SelectItem></SelectContent></Select></div>
                <div><Label>Appetite</Label><Select name="appetiteTest" defaultValue={childData.AdmissionAppetite}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">PASS</SelectItem></SelectContent></Select></div>
              </div>

              {/* Complications */}
              <div className="border rounded-md p-4">
                <Label>Medical Complications</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                   {[{ id: "0", label: "NO COMPLICATION" }, { id: "1", label: "EMERGENCY SIGNS" }, { id: "17", label: "OTHERS" }].map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <input type="checkbox" checked={selectedComplications[item.id] || false} onChange={(e) => handleComplicationChange(item.id, e.target.checked)} />
                        <Label className="text-sm">{item.label}</Label>
                      </div>
                   ))}
                </div>
                {selectedComplications["17"] && (
                    <div className="mt-2"><Label>Other Details</Label><Input value={otherComplication} onChange={e => setOtherComplication(e.target.value)} /></div>
                )}
              </div>
              
              {/* Photo */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                 <div>
                    <Label>Update Photo</Label>
                    <Input type="file" onChange={handlePhotoUpload} accept="image/*" />
                 </div>
                 {photoPreview && (
                    <div className="relative h-24 w-24"><Image src={photoPreview} alt="Preview" fill className="object-cover rounded" unoptimized /></div>
                 )}
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700">
                    {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                        </>
                    ) : "✔ Update Record"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}