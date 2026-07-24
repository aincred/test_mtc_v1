"use client";

import React, { useState, useEffect } from "react";
import { Search, BarChart, Loader2, ChevronDown, Lock, Award } from "lucide-react";

const YEARS = Array.from({ length: 7 }, (_, i) => (2020 + i).toString());

const QUARTERS = [
  { id: "1", name: "Annual (Apr-Mar)" },
  { id: "2", name: "Quarter 1 (Apr-Jun)" },
  { id: "3", name: "Quarter 2 (Jul-Sept)" },
  { id: "4", name: "Quarter 3 (Oct-Dec)" },
  { id: "5", name: "Quarter 4 (Jan-Mar)" },
];

interface RankingRecord {
  rank: number;
  id: number;
  mtcCode: string;
  mtcName: string;
  district: string;
  bedOccupancy: number;
  cureRate: number;
  compositeScore: number;
}

export default function PerformanceRankingReport() {
  // Form State
  const [year, setYear] = useState<string>("2026");
  const [quarter, setQuarter] = useState<string>("1"); // Default Annual
  const [district] = useState<string>("8"); // ID 8 = RANCHI
  const [districtName] = useState<string>("RANCHI");

  // Output & Execution States
  const [showReport, setShowReport] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [rankings, setRankings] = useState<RankingRecord[]>([]);

  const handleSearch = async () => {
    setLoading(true);
    setShowReport(false);

    try {
      const params = new URLSearchParams({
        year,
        quarter,
        districtName,
      });

      const res = await fetch(`/api/reports/performance-ranking?${params.toString()}`);
      const json = await res.json();

      if (json.success) {
        setRankings(json.data || []);
        setShowReport(true);
      } else {
        console.error("API Error:", json.error);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectedQuarterName = QUARTERS.find((q) => q.id === quarter)?.name || "Annual";

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
        {/* Card Header */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart size={20} className="text-blue-700" />
            <h5 className="text-[1.25rem] font-bold m-0 text-blue-700">
              Performance Ranking By MTC
            </h5>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <Lock size={12} /> District Scope Locked
          </span>
        </div>

        <div className="p-4 md:p-6 text-sm">
          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 items-end mb-8 pb-8 border-b border-gray-100">
            
            {/* Financial Year Select */}
            <div className="lg:col-span-2 flex flex-col gap-1">
              <label htmlFor="dd_Year" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">
                Financial Year
              </label>
              <select
                id="dd_Year"
                value={year}
                onChange={(e) => { setYear(e.target.value); setShowReport(false); }}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] text-gray-700"
              >
                <option value="">Select Year</option>
                {YEARS.map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>

            {/* Quarter Select */}
            <div className="lg:col-span-4 flex flex-col gap-1">
              <label htmlFor="dd_Quarter" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">
                Period / Quarter
              </label>
              <select
                id="dd_Quarter"
                value={quarter}
                onChange={(e) => { setQuarter(e.target.value); setShowReport(false); }}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px] text-gray-700"
              >
                <option value="">Select Quarter</option>
                {QUARTERS.map((q) => (
                  <option key={q.id} value={q.id}>{q.name}</option>
                ))}
              </select>
            </div>

            {/* District Select (Locked / Read-only) */}
            <div className="lg:col-span-2 flex flex-col gap-1">
              <label htmlFor="ddl_District" className="font-bold text-gray-600 uppercase text-[10px] tracking-wider">
                District Scope
              </label>
              <div className="relative">
                <select
                  id="ddl_District"
                  disabled={true}
                  value={district}
                  className="w-full bg-slate-100 text-slate-500 border border-gray-300 rounded-md py-1.5 px-3 cursor-not-allowed h-[38px] appearance-none font-medium"
                >
                  <option value={district}>{districtName}</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Generate Action Button */}
            <div className="lg:col-span-2 lg:pt-0 pt-2">
              <button
                type="button"
                onClick={handleSearch}
                disabled={loading || !year || !quarter}
                className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-6 py-2 border border-blue-600 text-sm font-bold rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin text-blue-600" />
                ) : (
                  <Search size={16} />
                )}
                {loading ? "Generating..." : "Generate Rankings"}
              </button>
            </div>
          </div>

          {/* Ranking Dashboard Output */}
          <div className="mt-8">
            {showReport ? (
              <div className="animate-in fade-in duration-300 space-y-6">
                <div className="text-center bg-blue-50/70 p-4 rounded-xl border border-blue-100">
                  <h6 className="text-blue-900 font-bold text-base uppercase m-0 flex items-center justify-center gap-2">
                    <Award className="text-amber-500" size={20} />
                    MTC Performance Ranking: FY {year} ({selectedQuarterName})
                  </h6>
                  <p className="text-gray-500 text-xs italic mt-1 m-0">
                    District Scope: <span className="font-semibold text-gray-700">{districtName}</span> | Composite Score based on Bed Occupancy & Cure Rate metrics
                  </p>
                </div>
                
                {/* Ranking Table Layout */}
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-200 text-gray-700 font-semibold uppercase">
                      <tr>
                        <th className="px-4 py-3 border-r text-center w-16">Rank</th>
                        <th className="px-4 py-3 border-r">MTC Center</th>
                        <th className="px-4 py-3 border-r text-center">District</th>
                        <th className="px-4 py-3 border-r text-center">Avg Bed Occupancy</th>
                        <th className="px-4 py-3 border-r text-center">Cure Rate</th>
                        <th className="px-4 py-3 text-center bg-blue-100/60 text-blue-900 font-bold">
                          Composite Index Score
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-800">
                      {rankings.length > 0 ? (
                        rankings.map((row) => (
                          <tr key={row.rank} className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-4 py-3 border-r text-center font-black text-blue-700 text-sm">
                              #{row.rank}
                            </td>
                            <td className="px-4 py-3 border-r font-bold text-gray-800">
                              {row.mtcName}
                            </td>
                            <td className="px-4 py-3 border-r text-center font-medium text-gray-600">
                              {row.district}
                            </td>
                            <td className="px-4 py-3 border-r text-center font-medium">
                              {row.bedOccupancy}%
                            </td>
                            <td className="px-4 py-3 border-r text-center font-semibold text-green-700">
                              {row.cureRate}%
                            </td>
                            <td className="px-4 py-3 text-center font-extrabold bg-blue-50/50 text-blue-900 text-sm">
                              {row.compositeScore}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-gray-500 italic">
                            No active performance data found for the selected period.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 italic">Configure financial year and quarter to generate performance rankings.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}