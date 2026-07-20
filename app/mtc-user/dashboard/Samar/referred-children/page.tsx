"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Loader2, ClipboardList, AlertCircle } from "lucide-react";

// 1. Define a strict interface to eliminate `any`
interface SahiyaReferralRecord {
  id: string;
  sahiyaName: string;
  childName: string;
  parentName: string;
  village: string;
  referralDate: string;
  status: "Admitted" | "Pending" | "Defrained"; 
}

export default function SahiyaReferralReportPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [reportData, setReportData] = useState<SahiyaReferralRecord[] | null>(null);

  // Memoized fetch function to prevent dependency array issues
  const fetchReferralData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/reports/sahiya-referral");
      if (!response.ok) throw new Error("Network response failure");
      
      const result = await response.json() as { data?: SahiyaReferralRecord[] };
      setReportData(result.data || []);
    } catch {
      setReportData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Safely trigger data load on component mount via useEffect
  useEffect(() => {
    fetchReferralData();
  }, [fetchReferralData]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
          <div className="bg-indigo-50 p-2.5 rounded-xl border border-indigo-100 text-indigo-600">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sahiya Referral Report</h1>
            <p className="text-sm text-slate-500 font-medium mt-0.5">Track and view active community nutrition referrals</p>
          </div>
        </div>

        {/* Loading and Data Presentation States */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Generating referral records...</p>
          </div>
        ) : reportData && reportData.length > 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-6 py-4">Sahiya Name</th>
                    <th className="px-6 py-4">Child Name</th>
                    <th className="px-6 py-4">Parent / Guardian</th>
                    <th className="px-6 py-4">Village</th>
                    <th className="px-6 py-4">Referral Date</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {reportData.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">{record.sahiyaName}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">{record.childName}</td>
                      <td className="px-6 py-4 text-slate-600">{record.parentName}</td>
                      <td className="px-6 py-4 text-slate-600">{record.village}</td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(record.referralDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                          record.status === "Admitted" ? "bg-green-50 text-green-700 border border-green-200" :
                          record.status === "Pending" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                          "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center text-slate-500 shadow-sm">
            <div className="bg-slate-50 p-4 rounded-full mb-4 border border-slate-100">
              <AlertCircle className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No referral records</h3>
            <p className="text-sm mt-1 max-w-sm text-slate-500">There are currently no active community referral indicators reported for this operational block center.</p>
          </div>
        )}
      </div>
    </div>
  );
}