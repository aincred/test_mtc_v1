"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft, FileSpreadsheet, Loader2, Printer } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// --- Types & Interfaces ---
interface Annexure5ReportData {
  sc_st_count: number;
  bpl_count: number;
  total_male: number;
  total_female: number;
  total_admissions: number;
  criteria_zscore: number;
  criteria_muac: number;
  criteria_edema: number;
  ref_frontline: number;
  ref_self: number;
  ref_ward: number;
  stay_under_7: number;
  stay_7_to_15: number;
  stay_over_15: number;
  out_cured: number;
  out_defaulter: number;
  out_non_responder: number;
  out_death: number;
  relapse_cases: number;
}

// --- UI Components ---
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default function Annexure5Report() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<Annexure5ReportData | null>(null);
  
  // MTC Identity State
  const [mtcId, setMtcId] = useState<number | null>(null);
  const [mtcName, setMtcName] = useState<string>("");
  const [district, setDistrict] = useState<string>("");

  // Filter States
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());

  // Initialize Session
  useEffect(() => {
    const sessionData = sessionStorage.getItem("mtc_user");
    if (sessionData) {
      try {
        const user = JSON.parse(sessionData) as { mtcId?: number; mtcName?: string; district?: string };
        setMtcId(user.mtcId || null);
        setMtcName(user.mtcName || "");
        setDistrict(user.district || "");
      } catch {
        console.error("Session parse error");
      }
    }
  }, []);

  const handleSearch = async () => {
    if (!year || !month) {
      toast.error("Please select both Year and Month");
      return;
    }

    if (!mtcId) {
      toast.error("Security Error: Unknown MTC Center. Please login again.");
      return;
    }

    setLoading(true);
    setReportData(null);

    try {
      const queryParams = new URLSearchParams({ 
        year, 
        month,
        mtcId: mtcId.toString() 
      });

      const response = await fetch(`/api/reports/monthly?${queryParams}`);
      const result = await response.json() as { data: Annexure5ReportData; error?: string };

      if (!response.ok) throw new Error(result.error || "Failed to fetch");
      
      setReportData(result.data);
      toast.success("Report generated successfully!");
    } catch {
      toast.error("Failed to fetch report data.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans pb-28">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="mb-2 flex items-center print:hidden">
          <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-slate-500 hover:text-blue-700 hover:bg-transparent">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
        </div>

        <div className="mb-8 flex justify-between items-end print:hidden">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <FileSpreadsheet className="text-blue-600 h-8 w-8" />
              MTC Monthly Report
            </h1>
            <p className="mt-2 text-sm text-slate-500">Generate Annexure 5 reporting format for <span className="font-bold text-slate-700">{mtcName || "your center"}</span>.</p>
          </div>
          {reportData && (
            <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
              <Printer className="w-4 h-4 mr-2" /> Print Report
            </Button>
          )}
        </div>

        {/* Filters Card */}
        <Card className="border-0 shadow-sm mb-8 print:hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Year *</label>
                <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500/30 outline-none">
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Month *</label>
                <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500/30 outline-none">
                  <option value="1">January</option><option value="2">February</option>
                  <option value="3">March</option><option value="4">April</option>
                  <option value="5">May</option><option value="6">June</option>
                  <option value="7">July</option><option value="8">August</option>
                  <option value="9">September</option><option value="10">October</option>
                  <option value="11">November</option><option value="12">December</option>
                </select>
              </div>
              
              {/* Locked District Field */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">District</label>
                <Input 
                  value={district || "Loading..."} 
                  readOnly 
                  className="bg-slate-100 font-semibold text-slate-600 cursor-not-allowed border-slate-200"
                />
              </div>
              
              {/* Locked MTC Field */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">MTC Center</label>
                <Input 
                  value={mtcName || "Loading..."} 
                  readOnly 
                  className="bg-slate-100 font-semibold text-slate-600 cursor-not-allowed border-slate-200 uppercase"
                />
              </div>

              <div>
                <Button onClick={handleSearch} disabled={loading || !mtcId} className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Search className="w-4 h-4 mr-2" />}
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Annexure 5 Report Display */}
        {reportData && (
          <Card className="border-0 shadow-lg overflow-hidden bg-white print:shadow-none print:border print:border-slate-300">
            
            {/* Report Header */}
            <div className="bg-slate-50 p-6 border-b border-slate-200 print:bg-white">
              <h2 className="text-xl font-bold text-center text-slate-800 uppercase tracking-wide">Annexure 5</h2>
              <h3 className="text-center font-bold text-slate-600 mb-6">Monthly Reporting Format: Nutrition Rehabilitation Centres</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><span className="font-bold text-slate-500">Name of Health Facility:</span> <span className="font-semibold uppercase">{mtcName || "N/A"}</span></div>
                <div><span className="font-bold text-slate-500">Block:</span> <span className="font-semibold uppercase">{mtcName || "N/A"}</span></div>
                <div><span className="font-bold text-slate-500">District:</span> <span className="font-semibold capitalize">{district || "N/A"}</span></div>
                <div><span className="font-bold text-slate-500">Month:</span> <span className="font-semibold">{new Date(0, parseInt(month) - 1).toLocaleString("default", { month: "long" })}</span></div>
                <div><span className="font-bold text-slate-500">Year:</span> <span className="font-semibold">{year}</span></div>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white print:bg-slate-200 print:text-black">
                    <th className="px-6 py-3 border border-blue-700 font-semibold w-1/2">Indicators</th>
                    <th className="px-6 py-3 border border-blue-700 font-semibold text-center w-1/6">Male</th>
                    <th className="px-6 py-3 border border-blue-700 font-semibold text-center w-1/6">Female</th>
                    <th className="px-6 py-3 border border-blue-700 font-semibold text-center w-1/6">Total</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 font-medium">
                  
                  {/* A. Admissions */}
                  <tr className="bg-slate-100"><td colSpan={4} className="px-6 py-2 font-bold border border-slate-200 text-slate-900">A. Admissions</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">SC / ST</td><td className="text-center border border-slate-200">-</td><td className="text-center border border-slate-200">-</td><td className="text-center border border-slate-200 font-bold">{reportData.sc_st_count || 0}</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">BPL</td><td className="text-center border border-slate-200">-</td><td className="text-center border border-slate-200">-</td><td className="text-center border border-slate-200 font-bold">{reportData.bpl_count || 0}</td></tr>
                  <tr className="bg-blue-50/50"><td className="px-6 py-3 border border-slate-200 pl-10 font-bold text-blue-800">Total Admissions</td><td className="text-center border border-slate-200">{reportData.total_male || 0}</td><td className="text-center border border-slate-200">{reportData.total_female || 0}</td><td className="text-center border border-slate-200 font-bold text-blue-800">{reportData.total_admissions || 0}</td></tr>

                  {/* A.1 Criteria */}
                  <tr className="bg-slate-100"><td colSpan={4} className="px-6 py-2 font-bold border border-slate-200 text-slate-900">A.1 Admission Criteria</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">-3 SD WFH</td><td colSpan={2} className="bg-slate-50 border border-slate-200"></td><td className="text-center border border-slate-200 font-bold">{reportData.criteria_zscore || 0}</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">MUAC &lt; 115 mm</td><td colSpan={2} className="bg-slate-50 border border-slate-200"></td><td className="text-center border border-slate-200 font-bold">{reportData.criteria_muac || 0}</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">Bilateral pitting oedema</td><td colSpan={2} className="bg-slate-50 border border-slate-200"></td><td className="text-center border border-slate-200 font-bold">{reportData.criteria_edema || 0}</td></tr>

                  {/* A.2 Referral */}
                  <tr className="bg-slate-100"><td colSpan={4} className="px-6 py-2 font-bold border border-slate-200 text-slate-900">A.2 Referral By</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">Frontline worker (Asha/Sahiya)</td><td colSpan={2} className="bg-slate-50 border border-slate-200"></td><td className="text-center border border-slate-200 font-bold">{reportData.ref_frontline || 0}</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">Self</td><td colSpan={2} className="bg-slate-50 border border-slate-200"></td><td className="text-center border border-slate-200 font-bold">{reportData.ref_self || 0}</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">Paediatric ward/emergency</td><td colSpan={2} className="bg-slate-50 border border-slate-200"></td><td className="text-center border border-slate-200 font-bold">{reportData.ref_ward || 0}</td></tr>

                  {/* A.3 Duration */}
                  <tr className="bg-slate-100"><td colSpan={4} className="px-6 py-2 font-bold border border-slate-200 text-slate-900">A.3 Duration of Stay</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">&lt; 7 Days</td><td colSpan={2} className="bg-slate-50 border border-slate-200"></td><td className="text-center border border-slate-200 font-bold">{reportData.stay_under_7 || 0}</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">7 - 15 days</td><td colSpan={2} className="bg-slate-50 border border-slate-200"></td><td className="text-center border border-slate-200 font-bold">{reportData.stay_7_to_15 || 0}</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">&gt; 15 Days</td><td colSpan={2} className="bg-slate-50 border border-slate-200"></td><td className="text-center border border-slate-200 font-bold">{reportData.stay_over_15 || 0}</td></tr>

                  {/* B. Outputs */}
                  <tr className="bg-slate-100"><td colSpan={4} className="px-6 py-2 font-bold border border-slate-200 text-slate-900">B. Monthly Output</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">1. Discharges from NRC (Cured)</td><td colSpan={2} className="bg-slate-50 border border-slate-200"></td><td className="text-center border border-slate-200 font-bold text-green-600">{reportData.out_cured || 0}</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">2. Defaulters</td><td colSpan={2} className="bg-slate-50 border border-slate-200"></td><td className="text-center border border-slate-200 font-bold text-red-500">{reportData.out_defaulter || 0}</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">3. Non responders</td><td colSpan={2} className="bg-slate-50 border border-slate-200"></td><td className="text-center border border-slate-200 font-bold text-orange-500">{reportData.out_non_responder || 0}</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">4. Deaths</td><td colSpan={2} className="bg-slate-50 border border-slate-200"></td><td className="text-center border border-slate-200 font-bold text-red-600">{reportData.out_death || 0}</td></tr>
                  <tr><td className="px-6 py-3 border border-slate-200 pl-10">5. Relapse</td><td colSpan={2} className="bg-slate-50 border border-slate-200"></td><td className="text-center border border-slate-200 font-bold text-purple-600">{reportData.relapse_cases || 0}</td></tr>

                </tbody>
              </table>
              <div className="p-4 text-xs text-slate-400 italic">
                * This format is to be maintained at the NRC. The data should be analysed and used for improving services. Note: Follow-up tracking data is aggregated separately in the Follow-up module.
              </div>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}