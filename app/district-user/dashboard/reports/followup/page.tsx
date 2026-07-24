"use client";

import React, { useState } from "react";
import { Calendar, Search, Filter, Loader2, ChevronDown, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface MtcOption {
  id: string;
  name: string;
}

interface ReportRecord {
  id: number | string;
  childName: string;
  childId: string;
  motherName: string;
  phone: string;
  mtcName: string;
  referredBy: string;
  referredByPhone: string;
  followUpCount: number;
}

const MTC_OPTIONS: MtcOption[] = [
  { id: "1", name: "District Hospital MTC (CHAS)" },
  { id: "2", name: "Sub-Divisional MTC (GOMIA)" },
  { id: "26", name: "Community Health Center MTC (BUNDU)" },
  { id: "27", name: "DORANDA MTC" },
  { id: "104", name: "RIMS MTC" },
];

export default function FollowedUpReport() {
  // Range & Date States
  const [rangeType, setRangeType] = useState<"daily" | "monthly" | "quarterly">("daily");
  const [fromDate, setFromDate] = useState<string>("2026-06-01");
  const [toDate, setToDate] = useState<string>("2026-07-31");
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [selectedMonth, setSelectedMonth] = useState<string>("6");
  const [selectedQuarter, setSelectedQuarter] = useState<string>("2");

  // Selection & Lock States
  const [selectedDistrict] = useState<string>("RANCHI"); // Locked District
  const [mtcSelection, setMtcSelection] = useState<string>("");

  // Data & Request States
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [records, setRecords] = useState<ReportRecord[]>([]);

  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(false);

    try {
      const params = new URLSearchParams();
      params.append("rangeType", rangeType);
      params.append("districtName", selectedDistrict);

      if (rangeType === "daily") {
        params.append("fromDate", fromDate);
        params.append("toDate", toDate);
      } else if (rangeType === "monthly") {
        params.append("year", selectedYear);
        params.append("month", selectedMonth);
      } else if (rangeType === "quarterly") {
        params.append("year", selectedYear);
        params.append("quarter", selectedQuarter);
      }

      if (mtcSelection) {
        params.append("mtcSelection", mtcSelection);
      }

      const res = await fetch(`/api/reports/4th-follow-up?${params.toString()}`);
      const json = await res.json();

      if (json.success) {
        setRecords(json.records || []);
        setHasSearched(true);
      } else {
        console.error("API error:", json.error);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Export to PDF Handler
  const exportToPDF = () => {
    if (records.length === 0) return;

    const doc = new jsPDF("landscape", "pt", "a4");

    // Header Title
    doc.setFontSize(16);
    doc.setTextColor(29, 78, 216); // Blue-700
    doc.text("4th Follow-Up Completed Report", 40, 40);

    // Subtitle / Filters Metadata
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139); // Slate-500
    let periodInfo = "";
    if (rangeType === "daily") periodInfo = `From: ${fromDate} To: ${toDate}`;
    else if (rangeType === "monthly") periodInfo = `Year: ${selectedYear}, Month: ${selectedMonth}`;
    else if (rangeType === "quarterly") periodInfo = `Year: ${selectedYear}, Quarter: Q${selectedQuarter}`;

    const mtcLabel = mtcSelection 
      ? MTC_OPTIONS.find((m) => m.id === mtcSelection)?.name || "Selected MTC"
      : "All MTCs";

    doc.text(`District: ${selectedDistrict} | Filter: ${rangeType.toUpperCase()} (${periodInfo}) | Scope: ${mtcLabel}`, 40, 56);

    // Table Data Formatting
    const tableHeaders = [
      ["#", "Child Name", "Child ID", "Mother / Guardian", "Phone Number", "MTC Name", "Referred By", "Referred Mobile", "Status"]
    ];

    const tableRows = records.map((row, index) => [
      index + 1,
      row.childName,
      row.childId,
      row.motherName,
      row.phone,
      row.mtcName,
      row.referredBy,
      row.referredByPhone,
      `${row.followUpCount}th Follow-up`
    ]);

    // Generate AutoTable
    autoTable(doc, {
      head: tableHeaders,
      body: tableRows,
      startY: 70,
      theme: "grid",
      headStyles: {
        fillColor: [30, 58, 138], // Tailwind Blue-900
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: "bold",
        halign: "left",
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [51, 65, 85],
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252], // Slate-50
      },
      columnStyles: {
        0: { cellWidth: 25, halign: "center" },
        8: { halign: "center", fontStyle: "bold" },
      },
      margin: { top: 70, left: 40, right: 40 },
    });

    // Save PDF
    doc.save(`4th_FollowUp_Report_${selectedDistrict}_${new Date().toISOString().split("T")[0]}.pdf`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-6 font-sans">
      {/* Outer Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
        {/* Card Header */}
        <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 rounded-t-xl flex flex-wrap justify-between items-center gap-3">
          <div>
            <h5 className="text-[1.25rem] font-bold m-0 text-blue-700">
              4th Follow-Up Completed Report
            </h5>
            <p className="text-xs text-gray-500 m-0 mt-0.5">
              Displays detailed directory records for children who completed all 4 follow-ups
            </p>
          </div>

          {/* Export PDF Button */}
          {hasSearched && records.length > 0 && (
            <button
              type="button"
              onClick={exportToPDF}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-md shadow-sm transition-colors active:scale-95"
            >
              <Download size={14} />
              Export PDF
            </button>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 md:p-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
            
            {/* Filter Range Type */}
            <div className="lg:col-span-2 flex flex-col gap-1">
              <label htmlFor="select_RangeType" className="font-medium text-gray-700">
                Filter Range
              </label>
              <select
                id="select_RangeType"
                value={rangeType}
                onChange={(e) => setRangeType(e.target.value as "daily" | "monthly" | "quarterly")}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
              >
                <option value="daily">Daily Range</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>

            {/* Dynamic Date Controls */}
            {rangeType === "daily" && (
              <>
                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label htmlFor="txt_FromDate" className="font-medium text-gray-700">From Date</label>
                  <div className="relative">
                    <input
                      id="txt_FromDate"
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <Calendar size={16} />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label htmlFor="txt_ToDate" className="font-medium text-gray-700">To Date</label>
                  <div className="relative">
                    <input
                      id="txt_ToDate"
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <Calendar size={16} />
                    </div>
                  </div>
                </div>
              </>
            )}

            {rangeType === "monthly" && (
              <>
                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label htmlFor="select_Year" className="font-medium text-gray-700">Year</label>
                  <select
                    id="select_Year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label htmlFor="select_Month" className="font-medium text-gray-700">Month</label>
                  <select
                    id="select_Month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
                  >
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
              </>
            )}

            {rangeType === "quarterly" && (
              <>
                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label htmlFor="select_QYear" className="font-medium text-gray-700">Year</label>
                  <select
                    id="select_QYear"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-1">
                  <label htmlFor="select_Quarter" className="font-medium text-gray-700">Quarter</label>
                  <select
                    id="select_Quarter"
                    value={selectedQuarter}
                    onChange={(e) => setSelectedQuarter(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
                  >
                    <option value="1">Q1 (Jan - Mar)</option>
                    <option value="2">Q2 (Apr - Jun)</option>
                    <option value="3">Q3 (Jul - Sep)</option>
                    <option value="4">Q4 (Oct - Dec)</option>
                  </select>
                </div>
              </>
            )}

            {/* District Scope (Locked) */}
            <div className="lg:col-span-2 flex flex-col gap-1">
              <label htmlFor="select_District" className="font-medium text-gray-700">District Scope</label>
              <div className="relative">
                <select
                  id="select_District"
                  value={selectedDistrict}
                  disabled={true}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-md bg-slate-50 text-slate-500 font-medium cursor-not-allowed outline-none h-[38px] appearance-none"
                >
                  <option value={selectedDistrict}>{selectedDistrict}</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* MTC Selection */}
            <div className="lg:col-span-2 flex flex-col gap-1">
              <label htmlFor="dd_mtcSelection" className="font-medium text-gray-700">
                MTC Selection
              </label>
              <select
                id="dd_mtcSelection"
                value={mtcSelection}
                onChange={(e) => setMtcSelection(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
              >
                <option value="">All MTCs</option>
                {MTC_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Trigger Button */}
            <div className="lg:col-span-2 lg:pt-0 pt-2">
              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className="w-full h-[38px] inline-flex justify-center items-center gap-2 px-4 py-2 border border-blue-600 text-sm font-bold rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin text-blue-600" />
                ) : (
                  <Search size={16} />
                )}
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

          </div>

          {/* Report Output Section */}
          <div className="mt-8">
            <div id="div_Report" className="w-full">
              {!hasSearched ? (
                <div className="text-center text-gray-500 py-8 border border-dashed border-gray-300 rounded-lg">
                  <Filter className="mx-auto text-gray-400 mb-2" size={24} />
                  <p className="italic opacity-60 m-0">
                    Select parameters and click search to view 4th follow-up results.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-200 text-gray-700 font-semibold uppercase">
                      <tr>
                        <th className="py-3 px-4">#</th>
                        <th className="py-3 px-4">Child Name & ID</th>
                        <th className="py-3 px-4">Mother / Guardian</th>
                        <th className="py-3 px-4">Phone Number</th>
                        <th className="py-3 px-4">MTC Name</th>
                        <th className="py-3 px-4">Referred By</th>
                        <th className="py-3 px-4">Referred By Mobile</th>
                        <th className="py-3 px-4 text-center">Follow-ups</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-800">
                      {records.length > 0 ? (
                        records.map((row, index) => (
                          <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 font-medium text-gray-500">{index + 1}</td>
                            <td className="py-3 px-4">
                              <span className="font-semibold block text-blue-700">{row.childName}</span>
                              <span className="text-gray-400 text-[11px]">ID: {row.childId}</span>
                            </td>
                            <td className="py-3 px-4 font-medium">{row.motherName}</td>
                            <td className="py-3 px-4 text-gray-600">{row.phone}</td>
                            <td className="py-3 px-4 font-medium text-gray-700">{row.mtcName}</td>
                            <td className="py-3 px-4 text-gray-600">{row.referredBy}</td>
                            <td className="py-3 px-4 text-gray-600">{row.referredByPhone}</td>
                            <td className="py-3 px-4 text-center">
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300">
                                {row.followUpCount}th Follow-up
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="text-center py-6 text-gray-500 italic">
                            No records found for children who completed 4 follow-ups in this period.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}