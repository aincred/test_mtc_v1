
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation"; 

interface DataRow {
  [key: string]: string | number | boolean | null | undefined;
}

// --- UTILITY: Format CamelCase API keys to readable Spaced Strings ---
const formatColumnName = (col: string) => {
  if (col === "uuidChild") return "UUID Child";
  if (col === "AwcName") return "AWC Name";
  if (col === "AwcSevikaName") return "AWC Sevika Name";
  if (col === "AwcSevikaMobileNo") return "AWC Sevika Mobile No";
  if (col === "MtcName" || col === "mtcName" || col === "MTCName") return "MTC Name";
  if (col === "MtcId" || col === "mtcId" || col === "MTCId") return "MTC ID";
  if (col === "MTCStatus") return "MTC Status";
  if (col.toLowerCase() === "dob" || col === "DateOfBirth") return "Date of Birth";

  return col
    .replace(/([a-z])([A-Z])/g, '$1 $2') 
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') 
    .replace(/^./, (s) => s.toUpperCase()); 
};

export default function MTCReferredChildListStandalone() {
  const router = useRouter(); 
  const [allRows, setAllRows] = useState<DataRow[]>([]);
  const [filteredRows, setFilteredRows] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [mtcNames, setMtcNames] = useState<string[]>([]);
  const [selectedMtc, setSelectedMtc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const [statusUpdates, setStatusUpdates] = useState<{[key: number]: string}>({});
  const [remarks, setRemarks] = useState<{[key: number]: string}>({});
  const [editingRemark, setEditingRemark] = useState<number | null>(null);
  const [filterPanelOpen, setFilterPanelOpen] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [windowWidth, setWindowWidth] = useState<number>(0);
  
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set([
    "uuidChild", "NameOfChild", "MotherName", "FatherName", "DateOfBirth", "Age", "Gender", "Weight", "Length", 
    "AwcName", "AwcSevikaName", "AwcSevikaMobileNo", "ProjectName", 
    "DistrictName", "MtcName", "MtcId", "MTCStatus", "Remarks"
  ]));

  const summaryStats = useMemo(() => {
    const total = allRows.length;
    const registered = allRows.filter(r => r.MTCStatus === "Registered").length;
    const pending = total - registered;
    return { total, registered, pending };
  }, [allRows]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 1024) {
        setViewMode("card");
      } else {
        setViewMode("table");
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setStatusMessage("Syncing records from database...");
      setStatusType("");

      const response = await fetch("/api/mtc-proxy", { method: "GET" });

      if (!response.ok) {
        let errorMsg = `HTTP ${response.status}`;
        try {
          const errData = await response.json();
          if (errData.error) errorMsg = errData.error;
        } catch {
          errorMsg = await response.text();
        }
        throw new Error(errorMsg);
      }

      const text = await response.text();
      const match = text.match(/<string[^>]*>([\s\S]*?)<\/string>/i);
      if (!match) {
        throw new Error("No payload found matching content definitions.");
      }

      const jsonText = match[1].trim();
      let json;
      try {
        json = JSON.parse(jsonText);
      } catch {
        throw new Error("Invalid JSON returned by server.");
      }

      let rows: DataRow[];
      if (Array.isArray(json)) {
        rows = json;
      } else if (json && Array.isArray(json.data)) {
        rows = json.data;
      } else if (json && json.data) {
        rows = [json.data];
      } else {
        rows = [json];
      }

      if (!rows || rows.length === 0) {
        setStatusMessage("No matching child records verified.");
        setStatusType("success");
        setAllRows([]);
        setFilteredRows([]);
        return;
      }

      rows = rows.map((row) => ({
        ...row,
        MTCStatus: row.MTCStatus || "Not Registered",
        Remarks: row.Remarks || ""
      }));

      const columnSet: { [key: string]: boolean } = {};
      rows.forEach((row: DataRow) => {
        for (const key in row) {
          if (Object.prototype.hasOwnProperty.call(row, key)) {
            columnSet[key] = true;
          }
        }
      });
      
      columnSet["MTCStatus"] = true;
      columnSet["Remarks"] = true;
      
      const columnKeys = Object.keys(columnSet);
      setColumns(columnKeys);

      const mtcSet = new Set<string>();
      rows.forEach((r: DataRow) => {
        const name = (r.MtcName || r.mtcName || r.MTCName || "").toString().trim();
        if (name) mtcSet.add(name);
      });
      const sortedMtcNames = Array.from(mtcSet).sort((a, b) => a.localeCompare(b));
      setMtcNames(sortedMtcNames);

      setAllRows(rows);
      setFilteredRows(rows);
      setStatusMessage(`Successfully populated ${rows.length} records.`);
      setStatusType("success");
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      setStatusMessage("Failed connection protocols.");
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const applyFilter = useCallback(() => {
    if (!allRows || allRows.length === 0) return;

    let filtered = allRows;
    
    if (selectedMtc) {
      filtered = filtered.filter((r: DataRow) => {
        const name = (r.MtcName || r.mtcName || r.MTCName || "").toString().trim();
        return name === selectedMtc;
      });
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((row: DataRow) => {
        return Object.values(row).some(value => 
          value && value.toString().toLowerCase().includes(searchLower)
        );
      });
    }
    
    setFilteredRows(filtered);
    setStatusMessage(
      filtered.length !== allRows.length
        ? `Showing ${filtered.length} of ${allRows.length} active matching queries.`
        : `Showing all available data metrics.`
    );
  }, [allRows, selectedMtc, searchTerm]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  const handleBack = () => {
    router.push("/mtc-user/dashboard/home");
  };

  const handleRegisterClick = (childData: DataRow) => {
    // Explicitly grab the UUID and save it to session storage so the Add Child page can auto-fill it
    sessionStorage.setItem("pendingRegistrationData", JSON.stringify({
      ...childData,
      uuidChild: childData.uuidChild || childData.UUID || childData.uuid 
    }));
    router.push("/mtc-user/dashboard/child-registration/add-child");
  };

  const handleStatusChange = (rowIndex: number, newStatus: string) => {
    setStatusUpdates(prev => ({ ...prev, [rowIndex]: newStatus }));
    
    const updatedRows = [...filteredRows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], MTCStatus: newStatus };
    setFilteredRows(updatedRows);
    
    const originalIndex = allRows.findIndex(row => 
      JSON.stringify(row) === JSON.stringify(filteredRows[rowIndex])
    );
    if (originalIndex !== -1) {
      const updatedAllRows = [...allRows];
      updatedAllRows[originalIndex] = { ...updatedAllRows[originalIndex], MTCStatus: newStatus };
      setAllRows(updatedAllRows);
    }
  };

  const handleRemarkChange = (rowIndex: number, newRemark: string) => {
    setRemarks(prev => ({ ...prev, [rowIndex]: newRemark }));
  };

  const saveRemark = (rowIndex: number) => {
    const remarkText = remarks[rowIndex] || "";
    
    const updatedRows = [...filteredRows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], Remarks: remarkText };
    setFilteredRows(updatedRows);
    
    const originalIndex = allRows.findIndex(row => 
      JSON.stringify(row) === JSON.stringify(filteredRows[rowIndex])
    );
    if (originalIndex !== -1) {
      const updatedAllRows = [...allRows];
      updatedAllRows[originalIndex] = { ...updatedAllRows[originalIndex], Remarks: remarkText };
      setAllRows(updatedAllRows);
    }
    
    setEditingRemark(null);
    setStatusMessage("Logs updated contextually.");
    setStatusType("success");
  };

  const clearFilters = () => {
    setSelectedMtc("");
    setSearchTerm("");
  };

  const toggleColumnVisibility = (column: string) => {
    setVisibleColumns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(column)) {
        newSet.delete(column);
      } else {
        newSet.add(column);
      }
      return newSet;
    });
  };

  // --- CARD VIEW FOR MOBILE ---
  const renderMobileCard = (row: DataRow, index: number) => {
    const statusVal = statusUpdates[index] !== undefined ? statusUpdates[index] : (row.MTCStatus as string || "Not Registered");
    
    const childName = (row.NameOfChild || row.Name || row.ChildName || "Unrecorded Identity").toString();
    const parentName = (row.MotherName || row.FatherName || row.GuardianName || "Not Recorded").toString();
    const initial = childName.charAt(0).toUpperCase();
    const dob = (row.DateOfBirth || row.DOB || row.dob || "-").toString();
    
    return (
      <div key={index} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col relative">
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
        
        <div className="p-5 flex-1">
          <div className="flex justify-between items-start mb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-xl shrink-0 border-2 border-white shadow-sm">
                {initial}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{childName}</h3>
                <span className="text-xs font-mono font-medium text-slate-400 mt-0.5 block">ID: #{row.uuidChild?.toString().slice(0, 8) || index + 1}</span>
              </div>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-sm border ${
              statusVal === "Registered" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusVal === "Registered" ? "bg-emerald-500" : "bg-amber-500"}`}></span>
              {statusVal}
            </span>
          </div>

          <div className="mb-5 bg-slate-50/80 rounded-xl p-3 border border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Parent / Guardian</span>
              <span className="text-sm font-bold text-slate-800">{parentName}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-5">
            <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/50 text-center">
              <span className="block text-[10px] text-blue-500 font-bold uppercase mb-1 tracking-wider">DOB / Age</span>
              <span className="text-xs font-bold text-slate-800 block truncate">{dob}</span>
              <span className="text-xs font-medium text-slate-600 block mt-0.5">{row.Age || "-"}m • {row.Gender ? (row.Gender as string)[0] : "-"}</span>
            </div>
            <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/50 text-center flex flex-col justify-center">
              <span className="block text-[10px] text-emerald-600 font-bold uppercase mb-1 tracking-wider">Weight</span>
              <span className="text-sm font-bold text-slate-800">{row.Weight || "-"} kg</span>
            </div>
            <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100/50 text-center flex flex-col justify-center">
              <span className="block text-[10px] text-purple-600 font-bold uppercase mb-1 tracking-wider">Length</span>
              <span className="text-sm font-bold text-slate-800">{row.Length || "-"} cm</span>
            </div>
          </div>

          <div className="space-y-3.5 px-1">
            <div className="flex items-start gap-3">
              <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              <div>
                <span className="block text-xs font-bold text-slate-800 leading-tight">{row.MtcName || "No Facility Assigned"}</span>
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">MTC Assignment</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <div>
                <span className="block text-xs font-bold text-slate-800 leading-tight">{row.AwcName || "N/A AWC"}</span>
                <span className="text-[10px] font-medium text-slate-500">Asha: {row.AwcSevikaName || "N/A"} ({row.AwcSevikaMobileNo || "No Mobile"})</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border-t border-slate-100 p-4 space-y-3 mt-auto">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Update Status</label>
              <select
                value={statusVal}
                onChange={(e) => handleStatusChange(index, e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              >
                <option value="Registered">Registered</option>
                <option value="Not Registered">Not Registered</option>
              </select>
            </div>
            <div className="flex items-end">
               <button 
                onClick={() => handleRegisterClick(row)}
                className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                Register
              </button>
            </div>
          </div>
          
          <div className="pt-2 border-t border-slate-200/60">
            {editingRemark === index ? (
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={remarks[index] !== undefined ? remarks[index] : (row.Remarks as string || "")}
                  onChange={(e) => handleRemarkChange(index, e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  autoFocus
                />
                <button onClick={() => saveRemark(index)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg text-xs shadow-sm transition-colors">
                  Save
                </button>
                <button onClick={() => setEditingRemark(null)} className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs transition-colors">
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-start justify-between bg-white rounded-lg border border-slate-200 p-2.5 min-h-[36px] shadow-sm group">
                <span className="text-slate-600 text-[11px] font-medium italic">
                  {row.Remarks as string || "No descriptive notes logged."}
                </span>
                <button
                  onClick={() => {
                    setEditingRemark(index);
                    setRemarks(prev => ({ ...prev, [index]: row.Remarks as string || "" }));
                  }}
                  className="text-slate-400 hover:text-indigo-600 transition-colors p-0.5 ml-2 opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">MTC Referrals</h1>
              <p className="text-xs text-slate-400 hidden sm:block">Malnutrition Treatment Center Patient Tracker</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border ${
                filterPanelOpen 
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-inner" 
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>{filterPanelOpen ? "Hide Controls" : "Show Management Bar"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {!loading && allRows.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Total System Referrals</span>
                <span className="text-2xl font-extrabold text-slate-900">{summaryStats.total}</span>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Fully Registered Children</span>
                <span className="text-2xl font-extrabold text-emerald-600">{summaryStats.registered}</span>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Pending Actions Required</span>
                <span className="text-2xl font-extrabold text-amber-600">{summaryStats.pending}</span>
              </div>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              </div>
            </div>
          </div>
        )}

        <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 ${
          filterPanelOpen ? "opacity-100 max-h-[1000px] p-4 sm:p-6" : "opacity-0 max-h-0 p-0 overflow-hidden border-none"
        }`}>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              <div className="sm:col-span-3">
                <button
                  onClick={loadData}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-xs hover:bg-indigo-700 disabled:bg-indigo-300 shadow-sm transition-colors cursor-pointer"
                >
                  {loading ? (
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  )}
                  <span>Refresh Registry</span>
                </button>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="mtcFilter" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Filter Facilities</label>
                <div className="relative">
                  <select
                    id="mtcFilter"
                    value={selectedMtc}
                    onChange={(e) => setSelectedMtc(e.target.value)}
                    disabled={loading || mtcNames.length === 0}
                    className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none shadow-sm disabled:bg-slate-50"
                  >
                    <option value="">-- All Diagnostic Facilities --</option>
                    {mtcNames.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-5">
                <label htmlFor="search" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Omni Search Engine</label>
                <div className="relative">
                  <input
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, district, or child ID..."
                    className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-8 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-slate-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {windowWidth >= 1024 && (
              <div className="border-t border-slate-100 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Dynamic Column Selection</span>
                  <div className="flex flex-wrap gap-1.5">
                    {columns.map((col) => (
                      <button
                        key={col}
                        onClick={() => toggleColumnVisibility(col)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                          visibleColumns.has(col)
                            ? "bg-slate-800 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {formatColumnName(col)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 space-y-1.5">
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider text-left md:text-right">View Type</span>
                  <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                    <button
                      onClick={() => setViewMode("table")}
                      className={`px-3 py-1.5 rounded-md transition-all ${viewMode === "table" ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-500 hover:text-slate-800"}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                    </button>
                    <button
                      onClick={() => setViewMode("card")}
                      className={`px-3 py-1.5 rounded-md transition-all ${viewMode === "card" ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-500 hover:text-slate-800"}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {statusMessage && (
          <div className={`p-3.5 rounded-xl text-xs font-medium border flex items-center gap-2.5 shadow-sm transition-all duration-300 ${
            statusType === "error" ? "bg-red-50 border-red-200 text-red-700" : statusType === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-indigo-50/70 border-indigo-100 text-indigo-700"
          }`}>
            <span className={`w-2 h-2 rounded-full shrink-0 ${statusType === "error" ? "bg-red-500 animate-pulse" : statusType === "success" ? "bg-emerald-500" : "bg-indigo-500 animate-pulse"}`}></span>
            <div className="flex-1">{statusMessage}</div>
            {error && <span className="font-mono text-[11px] opacity-80 border-l border-red-200 pl-2.5">Diagnostic Code: {error}</span>}
          </div>
        )}

        <div className="w-full">
          {filteredRows.length > 0 ? (
            <>
              {viewMode === "table" && windowWidth >= 1024 ? (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs text-slate-600">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                        <tr>
                          {columns.filter(col => visibleColumns.has(col)).map((col) => (
                            <th key={col} className="px-4 py-3.5 font-semibold whitespace-nowrap">
                              {formatColumnName(col)}
                            </th>
                          ))}
                          <th className="px-4 py-3.5 font-semibold text-right whitespace-nowrap">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {filteredRows.map((row: DataRow, index) => (
                          <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                            {columns.filter(col => visibleColumns.has(col)).map((col) => (
                              <td key={col} className="px-4 py-3 text-slate-700 max-w-[240px] truncate">
                                {col === "MTCStatus" ? (
                                  <div className="relative min-w-[130px]">
                                    <select
                                      value={statusUpdates[index] !== undefined ? statusUpdates[index] : (row[col] as string || "Not Registered")}
                                      onChange={(e) => handleStatusChange(index, e.target.value)}
                                      className="bg-white border border-slate-200 rounded-md pl-2 pr-7 py-1 text-xs w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none shadow-sm"
                                    >
                                      <option value="Registered">Registered</option>
                                      <option value="Not Registered">Not Registered</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                  </div>
                                ) : col === "Remarks" ? (
                                  editingRemark === index ? (
                                    <div className="flex items-center gap-1 min-w-[180px]">
                                      <input
                                        type="text"
                                        value={remarks[index] !== undefined ? remarks[index] : (row[col] as string || "")}
                                        onChange={(e) => handleRemarkChange(index, e.target.value)}
                                        className="px-2 py-1 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs flex-1"
                                        autoFocus
                                      />
                                      <button onClick={() => saveRemark(index)} className="p-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 shadow-sm">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                      </button>
                                      <button onClick={() => setEditingRemark(null)} className="p-1 bg-slate-200 text-slate-600 rounded hover:bg-slate-300">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-between group min-w-[120px]">
                                      <span className="truncate italic text-slate-500">{row[col] as string || "No logs"}</span>
                                      <button
                                        onClick={() => {
                                          setEditingRemark(index);
                                          setRemarks(prev => ({ ...prev, [index]: row[col] as string || "" }));
                                        }}
                                        className="opacity-0 group-hover:opacity-100 text-indigo-600 hover:text-indigo-800 transition-opacity ml-1.5 p-0.5"
                                      >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                      </button>
                                    </div>
                                  )
                                ) : row[col] !== null && typeof row[col] === "object" ? (
                                  <span>{JSON.stringify(row[col])}</span>
                                ) : row[col] !== undefined && row[col] !== null ? (
                                  <span className="font-medium text-slate-900">{String(row[col])}</span>
                                ) : (
                                  <span className="text-slate-300">—</span>
                                )}
                              </td>
                            ))}

                            <td className="px-4 py-3 text-right">
                              <button 
                                onClick={() => handleRegisterClick(row)}
                                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-bold tracking-wide shadow-sm transition-colors whitespace-nowrap"
                              >
                                Register Child
                              </button>
                            </td>
                          </tr>
                        ))} 
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredRows.map((row: DataRow, index) => renderMobileCard(row, index))}
                </div>
              )}
            </>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-slate-200">
              <div className="w-9 h-9 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">Querying Operational Registries</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-slate-200 shadow-sm px-4">
              <div className="p-4 bg-slate-50 text-slate-400 rounded-full mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight">No Diagnostic Matched Records Found</h3>
              <p className="mt-1 text-xs text-slate-400 max-w-xs mx-auto">There are no records satisfying current parameters. Clear active filters or request an API resync.</p>
              <button 
                onClick={clearFilters}
                className="mt-4 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-100"
              >
                Reset Global Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}