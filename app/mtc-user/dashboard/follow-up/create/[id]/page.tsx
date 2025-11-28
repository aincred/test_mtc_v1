"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Home, Save, X, ChevronDown, ChevronUp } from "lucide-react"; // Removed User import
import toast, { Toaster } from "react-hot-toast";

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

interface FollowUp {
  id: string;
  followUpVisit: number;
  followUpDueDate: string;
  followUpActualDate: string;
  followUpWeight: string;
  followUpHeight: string;
  followUpMUAC: string;
  followUpZScore: string;
  designation: string;
  followedUpByName: string;
  followedUpByMobile: string;
}

// Removed unused FollowUpData interface

// Type for localStorage structure
interface AllFollowUps {
  [childId: string]: FollowUp[];
}

export default function FollowUpFormPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [child, setChild] = useState<DischargeRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [activeAccordions, setActiveAccordions] = useState<number[]>([0]); // Start with first accordion open
  
  // Designation options
  const designationOptions = [
    { value: "6", label: "Sahiya/ASHA" },
    { value: "1", label: "ANGANWADI" },
    { value: "2", label: "ANM" },
    { value: "7", label: "Poshan Sakhi" },
    { value: "8", label: "RBSK Team" },
    { value: "3", label: "OPD" },
    { value: "4", label: "SELF" },
    { value: "5", label: "OTHER" }
  ];

  // Load child data from localStorage
  useEffect(() => {
    try {
      const storedDischarges = localStorage.getItem("dischargeRecords");
      const storedFollowUps = localStorage.getItem("followUps");

      if (storedDischarges) {
        const parsedDischarges = JSON.parse(storedDischarges);
        const foundChild = parsedDischarges.find((c: DischargeRecord) => c.childId === params.id);
        
        if (foundChild) {
          setChild(foundChild);
          
          // Initialize follow-ups with default values
          const initialFollowUps: FollowUp[] = [
            {
              id: `follow-up-1-${foundChild.childId}`,
              followUpVisit: 1,
              followUpDueDate: calculateDueDate(foundChild.dischargeDate, 15), // 15 days after discharge
              followUpActualDate: "",
              followUpWeight: "",
              followUpHeight: "",
              followUpMUAC: "",
              followUpZScore: "",
              designation: "",
              followedUpByName: "",
              followedUpByMobile: ""
            },
            {
              id: `follow-up-2-${foundChild.childId}`,
              followUpVisit: 2,
              followUpDueDate: calculateDueDate(foundChild.dischargeDate, 30), // 30 days after discharge
              followUpActualDate: "",
              followUpWeight: "",
              followUpHeight: "",
              followUpMUAC: "",
              followUpZScore: "",
              designation: "",
              followedUpByName: "",
              followedUpByMobile: ""
            },
            {
              id: `follow-up-3-${foundChild.childId}`,
              followUpVisit: 3,
              followUpDueDate: calculateDueDate(foundChild.dischargeDate, 45), // 45 days after discharge
              followUpActualDate: "",
              followUpWeight: "",
              followUpHeight: "",
              followUpMUAC: "",
              followUpZScore: "",
              designation: "",
              followedUpByName: "",
              followedUpByMobile: ""
            },
            {
              id: `follow-up-4-${foundChild.childId}`,
              followUpVisit: 4,
              followUpDueDate: calculateDueDate(foundChild.dischargeDate, 60), // 60 days after discharge
              followUpActualDate: "",
              followUpWeight: "",
              followUpHeight: "",
              followUpMUAC: "",
              followUpZScore: "",
              designation: "",
              followedUpByName: "",
              followedUpByMobile: ""
            }
          ];
          
          // If there are existing follow-ups, merge them with the initial ones
          if (storedFollowUps) {
            const parsedFollowUps: AllFollowUps = JSON.parse(storedFollowUps);
            const childFollowUps = parsedFollowUps[foundChild.childId] || [];
            
            // Update initial follow-ups with existing data
            childFollowUps.forEach((existingFollowUp: FollowUp) => {
              const index = existingFollowUp.followUpVisit - 1;
              if (index >= 0 && index < initialFollowUps.length) {
                initialFollowUps[index] = { ...initialFollowUps[index], ...existingFollowUp };
              }
            });
          }
          
          setFollowUps(initialFollowUps);
        } else {
          toast.error("Child not found");
          router.push("/mtc-user/dashboard/discharge");
        }
      } else {
        toast.error("No discharge records found");
        router.push("/mtc-user/dashboard/discharge");
      }
    } catch (err) {
      console.error("Error loading data:", err);
      toast.error("Failed to load data");
      router.push("/mtc-user/dashboard/discharge");
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  // Function to calculate due date based on discharge date
  function calculateDueDate(dischargeDate: string, daysToAdd: number): string {
    if (!dischargeDate) return "";
    
    const date = new Date(dischargeDate);
    date.setDate(date.getDate() + daysToAdd);
    
    return date.toISOString().split('T')[0];
  }

  // Toggle accordion
  const toggleAccordion = (index: number) => {
    setActiveAccordions(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Handle input change for follow-up fields
  const handleInputChange = (index: number, field: keyof FollowUp, value: string) => {
    const updatedFollowUps = [...followUps];
    updatedFollowUps[index] = {
      ...updatedFollowUps[index],
      [field]: value
    };
    setFollowUps(updatedFollowUps);
  };

  // Save follow-up data
  const saveFollowUp = (index: number) => {
    const followUp = followUps[index];
    
    // Validate required fields
    if (!followUp.followUpActualDate || !followUp.followUpWeight || 
        !followUp.followUpHeight || !followUp.designation || 
        !followUp.followedUpByName || !followUp.followedUpByMobile) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Get existing follow-ups from localStorage
    const storedFollowUps = localStorage.getItem("followUps");
    const allFollowUps: AllFollowUps = storedFollowUps ? JSON.parse(storedFollowUps) : {};
    
    // Initialize child follow-ups if they don't exist
    if (!child || !allFollowUps[child.childId]) {
      if (child) {
        allFollowUps[child.childId] = [];
      } else {
        toast.error("Child data not available");
        return;
      }
    }
    
    // Find if this follow-up already exists
    const existingIndex = allFollowUps[child!.childId].findIndex(
      (f: FollowUp) => f.followUpVisit === followUp.followUpVisit
    );
    
    // Update or add the follow-up
    if (existingIndex >= 0) {
      allFollowUps[child!.childId][existingIndex] = followUp;
    } else {
      allFollowUps[child!.childId].push(followUp);
    }
    
    // Sort by follow-up visit
    allFollowUps[child!.childId].sort((a: FollowUp, b: FollowUp) => a.followUpVisit - b.followUpVisit);
    
    // Save to localStorage
    localStorage.setItem("followUps", JSON.stringify(allFollowUps));
    
    toast.success(`Follow-up ${followUp.followUpVisit} saved successfully!`);
  };

  // Save all follow-ups
  const saveAllFollowUps = () => {
    if (!child) {
      toast.error("Child data not available");
      return;
    }
    
    let hasErrors = false;
    
    // Check if any follow-up has data but missing required fields
    followUps.forEach((followUp, index) => {
      if ((followUp.followUpActualDate || followUp.followUpWeight || 
           followUp.followUpHeight || followUp.designation || 
           followUp.followedUpByName || followUp.followedUpByMobile) &&
          (!followUp.followUpActualDate || !followUp.followUpWeight || 
           !followUp.followUpHeight || !followUp.designation || 
           !followUp.followedUpByName || !followUp.followedUpByMobile)) {
        toast.error(`Please complete all required fields in Follow-up ${followUp.followUpVisit}`);
        hasErrors = true;
        
        // Open the accordion with errors
        if (!activeAccordions.includes(index)) {
          setActiveAccordions(prev => [...prev, index]);
        }
      }
    });
    
    if (hasErrors) return;
    
    // Get existing follow-ups from localStorage
    const storedFollowUps = localStorage.getItem("followUps");
    const allFollowUps: AllFollowUps = storedFollowUps ? JSON.parse(storedFollowUps) : {};
    
    // Update child follow-ups
    allFollowUps[child.childId] = followUps.filter(f => 
      f.followUpActualDate || f.followUpWeight || 
      f.followUpHeight || f.designation || 
      f.followedUpByName || f.followedUpByMobile
    );
    
    // Save to localStorage
    localStorage.setItem("followUps", JSON.stringify(allFollowUps));
    
    toast.success("All follow-ups saved successfully!");
    router.push("/mtc-user/dashboard/follow-up");
  };

  // Cancel and go back
  const handleCancel = () => {
    router.push("/mtc-user/dashboard/follow-up");
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
            onClick={() => router.push("/mtc-user/dashboard/follow-up")}
            className="mt-4"
          >
            Back to Follow-up List
          </Button>
        </div>
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
            Child Follow Up
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

        {/* Follow Up Form */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-2 sm:pb-4" style={{ borderBottom: "1px solid #e5e7eb" }}>
            <h2 className="text-lg sm:text-xl font-semibold" style={{ color: "rgb(11,145,140)" }}>
              Child Follow Up
            </h2>
          </CardHeader>

          <CardContent className="pt-4 sm:pt-6">
            {/* Child Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
            </div>

            {/* Follow Up Accordion */}
            <div className="space-y-4">
              {followUps.map((followUp, index) => (
                <Card key={followUp.id} className="border border-gray-200">
                  <CardHeader 
                    className="py-3 px-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    onClick={() => toggleAccordion(index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-800">
                        Follow-up - {followUp.followUpVisit}
                      </h3>
                      <div className="flex items-center">
                        {activeAccordions.includes(index) ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  {activeAccordions.includes(index) && (
                    <CardContent className="pt-4">
                      <div className="overflow-x-auto">
                        <table className="min-w-full border text-sm">
                          <thead className="bg-gray-200 text-gray-700">
                            <tr>
                              <th className="p-2 text-left">Record No</th>
                              <th className="p-2 text-left">Follow-up Visit</th>
                              <th className="p-2 text-left">Follow-up Due Date</th>
                              <th className="p-2 text-left">
                                <span className="text-red-500">*</span> Follow-up Actual Date
                              </th>
                              <th className="p-2 text-left">
                                <span className="text-red-500">*</span> Follow-up Weight (kg)
                              </th>
                              <th className="p-2 text-left">
                                <span className="text-red-500">*</span> Follow-up Length/ Height (cm)
                              </th>
                              <th className="p-2 text-left">Follow-up MUAC (cm)</th>
                              <th className="p-2 text-left">Follow-up Z-Score (SD)</th>
                              <th className="p-2 text-left">
                                <span className="text-red-500">*</span> Designation
                              </th>
                              <th className="p-2 text-left">
                                <span className="text-red-500">*</span> Followed-up By Name
                              </th>
                              <th className="p-2 text-left">
                                <span className="text-red-500">*</span> Followed-up By Mobile
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-2">
                                <Input
                                  value={child.recordNo}
                                  readOnly
                                  className="bg-gray-50"
                                />
                              </td>
                              <td className="p-2">
                                <Input
                                  value={followUp.followUpVisit}
                                  readOnly
                                  className="bg-gray-50"
                                />
                              </td>
                              <td className="p-2">
                                <Input
                                  value={followUp.followUpDueDate}
                                  readOnly
                                  className="bg-gray-50"
                                />
                              </td>
                              <td className="p-2">
                                <Input
                                  type="date"
                                  value={followUp.followUpActualDate}
                                  onChange={(e) => handleInputChange(index, "followUpActualDate", e.target.value)}
                                />
                              </td>
                              <td className="p-2">
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={followUp.followUpWeight}
                                  onChange={(e) => handleInputChange(index, "followUpWeight", e.target.value)}
                                />
                              </td>
                              <td className="p-2">
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={followUp.followUpHeight}
                                  onChange={(e) => handleInputChange(index, "followUpHeight", e.target.value)}
                                />
                              </td>
                              <td className="p-2">
                                <Input
                                  type="number"
                                  step="0.1"
                                  value={followUp.followUpMUAC}
                                  onChange={(e) => handleInputChange(index, "followUpMUAC", e.target.value)}
                                />
                              </td>
                              <td className="p-2">
                                <Input
                                  value={followUp.followUpZScore}
                                  readOnly
                                  className="bg-gray-50"
                                />
                              </td>
                              <td className="p-2">
                                <select
                                  value={followUp.designation}
                                  onChange={(e) => handleInputChange(index, "designation", e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                  <option value="">Select</option>
                                  {designationOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="p-2">
                                <Input
                                  value={followUp.followedUpByName}
                                  onChange={(e) => handleInputChange(index, "followedUpByName", e.target.value)}
                                />
                              </td>
                              <td className="p-2">
                                <Input
                                  type="tel"
                                  maxLength={10}
                                  value={followUp.followedUpByMobile}
                                  onChange={(e) => handleInputChange(index, "followedUpByMobile", e.target.value)}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button
                          onClick={() => saveFollowUp(index)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="mr-2 h-4 w-4" /> Save
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
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
                onClick={saveAllFollowUps}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Save className="mr-2 h-4 w-4" /> Save All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}