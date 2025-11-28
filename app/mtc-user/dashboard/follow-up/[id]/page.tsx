"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Search, Pencil, UserPlus, AlertCircle, Home } from "lucide-react";
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

// Type for localStorage structure
interface AllFollowUps {
  [childId: string]: FollowUp[];
}

export default function FollowUpListPage() {
  const router = useRouter();
  const [dischargeRecords, setDischargeRecords] = useState<DischargeRecord[]>([]);
  const [followUps, setFollowUps] = useState<AllFollowUps>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [recordNo, setRecordNo] = useState("");
  const [samNumber, setSamNumber] = useState("");
  const [childName, setChildName] = useState("");
  const [filtered, setFiltered] = useState<DischargeRecord[]>([]);

  // Load discharge records + followups from localStorage
  useEffect(() => {
    try {
      const storedDischarges = localStorage.getItem("dischargeRecords");
      const storedFollowUps = localStorage.getItem("followUps");

      if (storedDischarges) {
        const parsedDischarges = JSON.parse(storedDischarges);
        setDischargeRecords(parsedDischarges);
        setFiltered(parsedDischarges);
      } else {
        setError("No discharge records found");
      }

      if (storedFollowUps) {
        setFollowUps(JSON.parse(storedFollowUps));
      }
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply filters
  useEffect(() => {
    let list = [...dischargeRecords];

    if (recordNo) {
      list = list.filter((c) =>
        c.recordNo.toLowerCase().includes(recordNo.toLowerCase())
      );
    }

    if (samNumber) {
      list = list.filter((c) =>
        c.samNumber.toLowerCase().includes(samNumber.toLowerCase())
      );
    }

    if (childName) {
      list = list.filter((c) =>
        c.childName.toLowerCase().includes(childName.toLowerCase())
      );
    }

    if (fromDate) {
      list = list.filter(
        (c) => new Date(c.dischargeDate) >= new Date(fromDate)
      );
    }

    if (toDate) {
      const d = new Date(toDate);
      d.setHours(23, 59, 59, 999);
      list = list.filter(
        (c) => new Date(c.dischargeDate) <= d
      );
    }

    setFiltered(list);
  }, [recordNo, samNumber, childName, fromDate, toDate, dischargeRecords]);

  const handleSearch = () => {
    toast.success("Filter applied");
  };

  const goToFollowUp = (dischargeRecord: DischargeRecord) => {
    router.push(`/mtc-user/dashboard/follow-up/create/${dischargeRecord.childId}`);
  };

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setRecordNo("");
    setSamNumber("");
    setChildName("");
    setFiltered(dischargeRecords);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading discharge data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center text-red-600 mb-4">
              <AlertCircle className="h-8 w-8 mr-2" />
              <h2 className="text-xl font-semibold">Error</h2>
            </div>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={() => router.push("/mtc-user/dashboard/home")}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <Toaster position="top-right" />

      <Card className="border">
        <CardHeader className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-700">Follow Up List</h1>
          <div className="flex gap-2">
            <Button 
              onClick={() => router.push("/mtc-user/dashboard/discharge/new")}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Discharge New Patient
            </Button>
            <Button 
              onClick={() => router.push("/mtc-user/dashboard/home")}
              className="bg-gray-500 hover:bg-gray-600"
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
            <div>
              <label className="text-xs font-semibold">From Date</label>
              <Input 
                type="date" 
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)} 
              />
            </div>

            <div>
              <label className="text-xs font-semibold">To Date</label>
              <Input 
                type="date" 
                value={toDate}
                onChange={(e) => setToDate(e.target.value)} 
              />
            </div>

            <div>
              <label className="text-xs font-semibold">Record No</label>
              <Input 
                value={recordNo}
                onChange={(e) => setRecordNo(e.target.value)} 
              />
            </div>

            <div>
              <label className="text-xs font-semibold">SAM Number</label>
              <Input 
                value={samNumber}
                onChange={(e) => setSamNumber(e.target.value)} 
              />
            </div>

            <div>
              <label className="text-xs font-semibold">Child Name</label>
              <Input 
                value={childName}
                onChange={(e) => setChildName(e.target.value)} 
              />
            </div>

            <div className="flex items-end gap-2">
              <Button 
                className="bg-teal-600 hover:bg-teal-700 flex-1"
                onClick={handleSearch}
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button 
                variant="outline"
                onClick={clearFilters}
                title="Clear filters"
              >
                <CalendarIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {filtered.length} of {dischargeRecords.length} discharged patients
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {filtered.length > 0 ? (
              <table className="min-w-full border text-sm">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="p-2">Record No</th>
                    <th className="p-2">SAM Number</th>
                    <th className="p-2">Child Name</th>
                    <th className="p-2">Discharge Date</th>
                    <th className="p-2">Discharge Z-score (SD)</th>
                    <th className="p-2">Discharge MUAC (cm)</th>
                    <th className="p-2">Follow-up 1 Date</th>
                    <th className="p-2">Follow-up 2 Date</th>
                    <th className="p-2">Follow-up 3 Date</th>
                    <th className="p-2">Follow-up 4 Date</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((dischargeRecord) => {
                    const childFollowUps = followUps[dischargeRecord.childId] || [];
                    const followUp1 = childFollowUps.find((f: FollowUp) => f.followUpVisit === 1);
                    const followUp2 = childFollowUps.find((f: FollowUp) => f.followUpVisit === 2);
                    const followUp3 = childFollowUps.find((f: FollowUp) => f.followUpVisit === 3);
                    const followUp4 = childFollowUps.find((f: FollowUp) => f.followUpVisit === 4);

                    return (
                      <tr key={dischargeRecord.id} className="border-b hover:bg-gray-100">
                        <td className="p-2">{dischargeRecord.recordNo}</td>
                        <td className="p-2">{dischargeRecord.samNumber}</td>
                        <td className="p-2 font-medium">{dischargeRecord.childName}</td>
                        <td className="p-2">{dischargeRecord.dischargeDate}</td>
                        <td className="p-2">{followUp1?.followUpZScore || "-"}</td>
                        <td className="p-2">{followUp1?.followUpMUAC || "-"}</td>
                        <td className="p-2">{followUp1?.followUpActualDate || "-"}</td>
                        <td className="p-2">{followUp2?.followUpActualDate || "-"}</td>
                        <td className="p-2">{followUp3?.followUpActualDate || "-"}</td>
                        <td className="p-2">{followUp4?.followUpActualDate || "-"}</td>
                        <td className="p-2">
                          <Button 
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => goToFollowUp(dischargeRecord)}
                            title="Edit follow-up"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <UserPlus className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No discharged patients found matching the current filters.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}