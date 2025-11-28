"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Home, Save, X, CheckCircle } from "lucide-react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

interface Child {
  id: string;
  recordNo: string;
  samNumber: string;
  childName: string;
  parentName: string;
  dateOfBirth: string;
  admissionWeight: string;
  admissionHeight: string;
  admissionDate: string;
  admissionEdema: string;
  admissionMUAC: string;
  targetWeight: string;
  createdAt: string;
}

interface DischargeRecord {
  id: string;
  childId: string;
  recordNo: string;
  samNumber: string;
  childName: string;
  parentName: string;
  dateOfBirth: string;
  admissionWeight: string;
  admissionHeight: string;
  admissionDate: string;
  admissionEdema: string;
  admissionMUAC: string;
  targetWeight: string;
  dischargeDate: string;
  dischargeWeight: string;
  dischargeHeight: string;
  dischargeMUAC: string;
  outcomeIndicator: string;
  dischargeEdema: string;
  admissionHemoglobin: string;
  hemoglobinMother: string;
  ifaGivenToMother: string;
  motherPayment: string;
  ifaSyrup: string;
  photo: string;
  dischargedAt: string;
}

export default function DischargeFormPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);
  const [dischargeProcessed, setDischargeProcessed] = useState(false);
  const [dischargeRecord, setDischargeRecord] = useState<DischargeRecord | null>(null);
  
  // Form state
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeWeight, setDischargeWeight] = useState("");
  const [dischargeHeight, setDischargeHeight] = useState("");
  const [dischargeMUAC, setDischargeMUAC] = useState("");
  const [outcomeIndicator, setOutcomeIndicator] = useState("");
  const [dischargeEdema, setDischargeEdema] = useState("");
  const [admissionHemoglobin, setAdmissionHemoglobin] = useState("");
  const [hemoglobinMother, setHemoglobinMother] = useState("");
  const [ifaGivenToMother, setIfaGivenToMother] = useState("0");
  const [motherPayment, setMotherPayment] = useState("0");
  const [ifaSyrup, setIfaSyrup] = useState("0");
  const [photoPreview, setPhotoPreview] = useState("");

  // Load child data
  useEffect(() => {
    const storedChildren = localStorage.getItem('registeredChildren');
    if (storedChildren) {
      const parsedChildren = JSON.parse(storedChildren);
      const foundChild = parsedChildren.find((c: Child) => c.id === params.id);
      
      if (foundChild) {
        setChild(foundChild);
        // Set admission hemoglobin if available
        setAdmissionHemoglobin(foundChild.admissionHemoglobin || "");
      } else {
        toast.error("Child not found");
        router.push("/mtc-user/dashboard/discharge");
      }
    } else {
      toast.error("No children data found");
      router.push("/mtc-user/dashboard/discharge");
    }
    setLoading(false);
  }, [params.id, router]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Photo size should be less than 2MB");
        return;
      }
      
      // Check file type
      if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
        toast.error("Only JPEG and PNG images are allowed");
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processDischarge = () => {
    // Get existing children from localStorage
    const storedChildren = localStorage.getItem('registeredChildren');
    if (storedChildren) {
      const parsedChildren = JSON.parse(storedChildren);
      
      // Remove the discharged child from the list
      const updatedChildren = parsedChildren.filter((c: Child) => c.id !== params.id);
      
      // Save updated list to localStorage
      localStorage.setItem('registeredChildren', JSON.stringify(updatedChildren));
      
      // Save discharge record to a separate collection
      const newDischargeRecord: DischargeRecord = {
        id: params.id,
        childId: params.id,
        recordNo: child?.recordNo || "",
        samNumber: child?.samNumber || "",
        childName: child?.childName || "",
        parentName: child?.parentName || "",
        dateOfBirth: child?.dateOfBirth || "",
        admissionWeight: child?.admissionWeight || "",
        admissionHeight: child?.admissionHeight || "",
        admissionDate: child?.admissionDate || "",
        admissionEdema: child?.admissionEdema || "",
        admissionMUAC: child?.admissionMUAC || "",
        targetWeight: child?.targetWeight || "",
        dischargeDate,
        dischargeWeight,
        dischargeHeight,
        dischargeMUAC,
        outcomeIndicator,
        dischargeEdema,
        admissionHemoglobin,
        hemoglobinMother,
        ifaGivenToMother,
        motherPayment,
        ifaSyrup,
        photo: photoPreview,
        dischargedAt: new Date().toISOString()
      };
      
      // Get existing discharge records
      const storedDischarges = localStorage.getItem('dischargeRecords');
      const dischargeRecords = storedDischarges ? JSON.parse(storedDischarges) : [];
      
      // Add new discharge record
      dischargeRecords.push(newDischargeRecord);
      
      // Save discharge records
      localStorage.setItem('dischargeRecords', JSON.stringify(dischargeRecords));
      
      // Set the discharge record to display
      setDischargeRecord(newDischargeRecord);
      setDischargeProcessed(true);
      
      toast.success("Child discharged successfully!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!dischargeDate || !dischargeWeight || !dischargeHeight || !dischargeMUAC || 
        !outcomeIndicator || !dischargeEdema || !hemoglobinMother || 
        ifaGivenToMother === "0" || motherPayment === "0" || ifaSyrup === "0") {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Show confirmation dialog
    toast((t) => (
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg border border-gray-200">
        <p className="text-lg font-medium mb-4">Do you want to discharge this patient?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              processDischarge();
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            No
          </button>
        </div>
      </div>
    ), {
      duration: Infinity, // Keep the toast open until user makes a decision
      position: "top-center",
    });
  };

  const handleCancel = () => {
    router.push("/mtc-user/dashboard/discharge");
  };

  const handleViewAllDischarges = () => {
    router.push("/mtc-user/dashboard/discharge");
  };

  const getOutcomeText = (value: string) => {
    switch(value) {
      case "1": return "CURED";
      case "2": return "DEFAULTER";
      case "3": return "MEDICAL TRANSFER";
      case "4": return "NON RESPONDENT";
      case "5": return "DEATH";
      case "6": return "PARTIAL IMPROVEMENT";
      default: return "";
    }
  };

  const getEdemaText = (value: string) => {
    switch(value) {
      case "1": return "+";
      case "2": return "++";
      case "3": return "+++";
      case "4": return "No";
      default: return "";
    }
  };

  const getYesNoText = (value: string) => {
    switch(value) {
      case "1": return "Yes";
      case "2": return "No";
      default: return "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading child data...</p>
        </div>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Child not found</p>
          <Button 
            onClick={() => router.push("/mtc-user/dashboard/discharge")}
            className="mt-4"
          >
            Back to Discharge List
          </Button>
        </div>
      </div>
    );
  }

  // Show discharge success screen
  if (dischargeProcessed && dischargeRecord) {
    return (
      <div className="min-h-screen bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
        <Toaster position="top-right" />

        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              Discharge Successful
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

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold text-green-800">Patient Discharged Successfully</h2>
            </div>
            <p className="text-green-700">
              The patient has been successfully discharged from the program. The discharge record has been saved.
            </p>
          </div>

          {/* Discharge Details */}
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-2 sm:pb-4" style={{ borderBottom: "1px solid #e5e7eb" }}>
              <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "rgb(11,145,140)" }}>
                Discharge Details
              </h2>
            </CardHeader>

            <CardContent className="pt-4 sm:pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Left Column - Patient Details */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SAM Number
                      </label>
                      <Input
                        value={dischargeRecord.samNumber}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Child Name
                      </label>
                      <Input
                        value={dischargeRecord.childName}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Parent Name
                      </label>
                      <Input
                        value={dischargeRecord.parentName}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admission Date
                      </label>
                      <Input
                        value={dischargeRecord.admissionDate}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discharge Date
                      </label>
                      <Input
                        value={dischargeRecord.dischargeDate}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Outcome
                      </label>
                      <Input
                        value={getOutcomeText(dischargeRecord.outcomeIndicator)}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admission Weight (kg)
                      </label>
                      <Input
                        value={dischargeRecord.admissionWeight}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discharge Weight (kg)
                      </label>
                      <Input
                        value={dischargeRecord.dischargeWeight}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Target Weight (kg)
                      </label>
                      <Input
                        value={dischargeRecord.targetWeight}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admission Height (cm)
                      </label>
                      <Input
                        value={dischargeRecord.admissionHeight}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discharge Height (cm)
                      </label>
                      <Input
                        value={dischargeRecord.dischargeHeight}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admission MUAC (cm)
                      </label>
                      <Input
                        value={dischargeRecord.admissionMUAC}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discharge MUAC (cm)
                      </label>
                      <Input
                        value={dischargeRecord.dischargeMUAC}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admission EDEMA
                      </label>
                      <Input
                        value={getEdemaText(dischargeRecord.admissionEdema)}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discharge EDEMA
                      </label>
                      <Input
                        value={getEdemaText(dischargeRecord.dischargeEdema)}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admission Hemoglobin (gm/dl)
                      </label>
                      <Input
                        value={dischargeRecord.admissionHemoglobin}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hemoglobin Of Mother (gm/dl)
                      </label>
                      <Input
                        value={dischargeRecord.hemoglobinMother}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        IFA Given To Mother
                      </label>
                      <Input
                        value={getYesNoText(dischargeRecord.ifaGivenToMother)}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mother&apos;s wage compensation
                      </label>
                      <Input
                        value={getYesNoText(dischargeRecord.motherPayment)}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        IFA Syrup Given To Child
                      </label>
                      <Input
                        value={getYesNoText(dischargeRecord.ifaSyrup)}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Photo */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient Photo
                    </label>
                    {dischargeRecord.photo ? (
                      <Image
                        src={dischargeRecord.photo}
                        alt="Child photo"
                        width={300}
                        height={300}
                        className="w-full h-auto rounded-md border border-gray-200"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">No photo uploaded</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
                <Button
                  onClick={handleViewAllDischarges}
                  variant="outline"
                  className="border-gray-600 text-gray-700 hover:bg-gray-100"
                >
                  View All Discharges
                </Button>
                <Button
                  onClick={() => router.push("/mtc-user/dashboard/discharge/new")}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Discharge Another Patient
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Original discharge form
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

        {/* Discharge Form */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-2 sm:pb-4" style={{ borderBottom: "1px solid #e5e7eb" }}>
            <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "rgb(11,145,140)" }}>
              Child Discharge
            </h2>
          </CardHeader>

          <CardContent className="pt-4 sm:pt-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Left Column - Child Details */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SAM Number
                      </label>
                      <Input
                        value={child.samNumber}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Child Name
                      </label>
                      <Input
                        value={child.childName}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admission Date
                      </label>
                      <Input
                        value={child.admissionDate || "02-Sep-2025 03:15"}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admission Weight (kg)
                      </label>
                      <Input
                        value={child.admissionWeight}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admission Height (cm)
                      </label>
                      <Input
                        value={child.admissionHeight}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admission EDEMA
                      </label>
                      <Input
                        value={child.admissionEdema || "No"}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admission MUAC (cm)
                      </label>
                      <Input
                        value={child.admissionMUAC || "10.5"}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Target Weight (kg)
                      </label>
                      <Input
                        value={child.targetWeight || "5.497"}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discharge Date <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="date"
                        value={dischargeDate}
                        onChange={(e) => setDischargeDate(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discharge Weight (kg) <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        value={dischargeWeight}
                        onChange={(e) => setDischargeWeight(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discharge Height (cm) <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        value={dischargeHeight}
                        onChange={(e) => setDischargeHeight(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discharge MUAC (cm) <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={dischargeMUAC}
                        onChange={(e) => setDischargeMUAC(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Outcome Indicator <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={outcomeIndicator}
                        onChange={(e) => setOutcomeIndicator(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value="">Select</option>
                        <option value="1">CURED</option>
                        <option value="2">DEFAULTER</option>
                        <option value="3">MEDICAL TRANSFER</option>
                        <option value="4">NON RESPONDENT</option>
                        <option value="5">DEATH</option>
                        <option value="6">PARTIAL IMPROVEMENT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discharge EDEMA <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={dischargeEdema}
                        onChange={(e) => setDischargeEdema(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value="">Select</option>
                        <option value="1">+</option>
                        <option value="2">++</option>
                        <option value="3">+++</option>
                        <option value="4">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admission Hemoglobin (gm/dl)
                      </label>
                      <Input
                        value={admissionHemoglobin}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hemoglobin Of Mother (gm/dl) <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={hemoglobinMother}
                        onChange={(e) => setHemoglobinMother(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        IFA Given To Mother (minimum 30 tablets) <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={ifaGivenToMother}
                        onChange={(e) => setIfaGivenToMother(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value="0">Select</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mother&apos;s wage compensation <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={motherPayment}
                        onChange={(e) => setMotherPayment(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value="0">Select</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        1 Bottle of IFA Syrup (50ml) Given To Child <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={ifaSyrup}
                        onChange={(e) => setIfaSyrup(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value="0">Select</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Right Column - Photo Upload */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Photo (max 2mb, png/jpeg only)
                    </label>
                    <Input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handlePhotoChange}
                    />
                    {photoPreview && (
                      <div className="mt-4">
                        <Image
                          src={photoPreview}
                          alt="Child photo"
                          width={300}
                          height={300}
                          className="w-full h-auto rounded-md border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="border-gray-600 text-gray-700 hover:bg-gray-100"
                >
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Save className="mr-2 h-4 w-4" /> Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}