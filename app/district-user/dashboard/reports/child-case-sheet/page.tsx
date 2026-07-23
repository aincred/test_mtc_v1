"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

// --- Types ---
interface ChildRecord {
  sNo: number;
  recordNo: string;
  samNumber: string;
  childName: string;
  parentName: string;
  dob: string;
  weight: number;
  height: number;
}

interface FilterState {
  fromDate: string;
  toDate: string;
  recordNo: string;
  samNo: string;
  childName: string;
  district: string;
  mtc: string;
}

interface MtcOption {
  id: string;
  name: string;
}

export default function ChildCaseSheet() {
  const [filters, setFilters] = useState<FilterState>({
    fromDate: "",
    toDate: "",
    recordNo: "",
    samNo: "",
    childName: "",
    district: "RANCHI",
    mtc: "",
  });

  const [mtcOptions, setMtcOptions] = useState<MtcOption[]>([]);
  const [records, setRecords] = useState<ChildRecord[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const pageSize = 10;

  // Sync session user district and load MTCs
  useEffect(() => {
    const sessionData = sessionStorage.getItem("district_user") || sessionStorage.getItem("user") || sessionStorage.getItem("mtc_user");
    let activeDistrict = "RANCHI";

    if (sessionData) {
      try {
        const user = JSON.parse(sessionData);
        if (user.districtName) {
          activeDistrict = user.districtName.toUpperCase();
          setFilters((prev) => ({ ...prev, district: activeDistrict }));
        }
      } catch (e) {
        console.error("Session parse error:", e);
      }
    }

    fetchMtcList(activeDistrict);
  }, []);

  const fetchMtcList = async (distName: string) => {
    try {
      const res = await fetch(`/api/dashboard?districtName=${encodeURIComponent(distName)}`);
      const json = await res.json();
      if (json.locations) {
        setMtcOptions(json.locations.map((loc: any) => ({ id: String(loc.id), name: loc.name })));
      }
    } catch (e) {
      console.error("Failed to load MTC list:", e);
    }
  };

  const executeQuery = async (page: number = 1) => {
    setIsSearching(true);
    setHasSearched(true);

    try {
      const queryParams = new URLSearchParams({
        fromDate: filters.fromDate,
        toDate: filters.toDate,
        recordNo: filters.recordNo,
        samNo: filters.samNo,
        childName: filters.childName,
        district: filters.district,
        mtc: filters.mtc,
        page: page.toString(),
        limit: pageSize.toString(),
      });

      const res = await fetch(`/api/reports/child-case-sheet?${queryParams.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to load case sheet records.");
      }

      setRecords(json.data || []);
      setCurrentPage(json.pagination.page);
      setTotalPages(json.pagination.totalPages);
      setTotalEntries(json.pagination.total);
    } catch (error) {
      console.error("Query Execution Error:", error);
      setRecords([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "recordNo" && value !== "" && !/^\d+$/.test(value)) return;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setCurrentPage(1);
    executeQuery(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    executeQuery(newPage);
  };

  const handleSelectReport = (recordNo: string) => {
    console.log(`Loading report for Record ID: ${recordNo}`);
    window.open(`/mtc-user/dashboard/child-registration/edit-child/${recordNo}`, "_blank");
  };

  const textFields: Array<keyof Omit<FilterState, "district" | "mtc">> = [
    "fromDate",
    "toDate",
    "recordNo",
    "samNo",
    "childName",
  ];

  return (
    <div className="w-full mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        
        {/* Card Header - Blue */}
        <div className="px-6 py-4 border-b border-gray-200 bg-blue-50/50 flex justify-between items-center">
          <h5 className="text-lg font-semibold m-0 text-blue-700">
            Child Case Sheet
          </h5>
          <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-bold">
            {filters.district} District
          </span>
        </div>

        <div className="p-6">
          {/* Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 items-end mb-8">
            
            {textFields.map((field) => (
              <div key={field}>
                <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={field.includes("Date") ? "date" : "text"}
                  name={field}
                  value={filters[field]}
                  onChange={handleInputChange}
                  placeholder={field === "recordNo" ? "Numbers only" : ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">District</label>
              <input
                type="text"
                name="district"
                value={filters.district}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 text-gray-700 font-bold cursor-not-allowed outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">MTC</label>
              <select
                name="mtc"
                value={filters.mtc}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All MTCs</option>
                {mtcOptions.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full flex items-center justify-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 h-[38px]"
              >
                {isSearching ? (
                  <Loader2 size={16} className="animate-spin mr-1" />
                ) : (
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                )}
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {/* Table Results */}
          <div className="mt-6">
            <div className="text-center mb-4">
              <h5 className="text-lg font-semibold text-blue-900">
                Download Child Case Sheet
              </h5>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["S.No", "Record No", "SAM Number", "Child Name", "Parent Name", "Date Of Birth", "Weight (kg)", "Height (cm)", "Report"].map((head) => (
                      <th key={head} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  {isSearching ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 size={24} className="animate-spin text-blue-600" />
                          <span>Searching database for child records...</span>
                        </div>
                      </td>
                    </tr>
                  ) : hasSearched && records.length > 0 ? (
                    records.map((row, index) => (
                      <tr key={row.recordNo} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="px-4 py-3 text-gray-900 font-medium">{row.sNo}</td>
                        <td className="px-4 py-3 text-gray-900 font-mono">{row.recordNo}</td>
                        <td className="px-4 py-3 text-blue-900 font-mono font-medium">{row.samNumber}</td>
                        <td className="px-4 py-3 font-bold text-gray-900">{row.childName}</td>
                        <td className="px-4 py-3 text-gray-600">{row.parentName}</td>
                        <td className="px-4 py-3 text-gray-600">{row.dob}</td>
                        <td className="px-4 py-3 text-gray-700 font-medium">{row.weight.toFixed(2)}</td>
                        <td className="px-4 py-3 text-gray-700 font-medium">{row.height.toFixed(2)}</td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleSelectReport(row.recordNo)}
                            className="px-3 py-1 text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-gray-400">
                        {hasSearched ? "No matching child records found for the applied filters." : "Apply filters and click Search to query case sheets."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Dynamic Pagination Controls */}
            {hasSearched && totalEntries > 0 && (
              <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 mt-4 rounded-lg shadow-sm">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{" "}
                    <span className="font-medium">{Math.min(currentPage * pageSize, totalEntries)}</span> of{" "}
                    <span className="font-medium">{totalEntries}</span> entries
                  </p>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm text-gray-600 ring-1 ring-inset ring-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
                      .map((p) => (
                        <button
                          key={p}
                          onClick={() => handlePageChange(p)}
                          className={`px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${
                            currentPage === p ? "bg-blue-600 text-white z-10" : "text-gray-900 hover:bg-gray-50"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm text-gray-600 ring-1 ring-inset ring-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}