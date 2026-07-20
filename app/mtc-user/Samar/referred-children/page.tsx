// // // // "use client";

// // // // import { useState, useEffect, useCallback } from "react";

// // // // interface DataRow {
// // // //   [key: string]: string | number | boolean | null | undefined;
// // // // }

// // // // export default function MTCReferredChildListStandalone() {
// // // //   const [allRows, setAllRows] = useState<DataRow[]>([]);
// // // //   const [filteredRows, setFilteredRows] = useState<DataRow[]>([]);
// // // //   const [columns, setColumns] = useState<string[]>([]);
// // // //   const [mtcNames, setMtcNames] = useState<string[]>([]);
// // // //   const [selectedMtc, setSelectedMtc] = useState<string>("");
// // // //   const [loading, setLoading] = useState<boolean>(true);
// // // //   const [error, setError] = useState<string | null>(null);
// // // //   const [statusMessage, setStatusMessage] = useState<string>("");
// // // //   const [statusType, setStatusType] = useState<"success" | "error" | "">("");
// // // //   const [statusUpdates, setStatusUpdates] = useState<{[key: number]: string}>({});
// // // //   const [remarks, setRemarks] = useState<{[key: number]: string}>({});
// // // //   const [editingRemark, setEditingRemark] = useState<number | null>(null);
// // // //   const [filterPanelOpen, setFilterPanelOpen] = useState<boolean>(true);
// // // //   const [viewMode, setViewMode] = useState<"table" | "card">("table");
// // // //   const [searchTerm, setSearchTerm] = useState<string>("");
// // // //   const [windowWidth, setWindowWidth] = useState<number>(0);
// // // //   const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set([
// // // //     "uuidChild", "NameOfChild", "Age", "Gender", "Weight", "Length", 
// // // //     "AwcName", "AwcSevikaName", "AwcSevikaMobileNo", "ProjectName", 
// // // //     "DistrictName", "MtcName", "MtcId", "MTCStatus", "Remarks"
// // // //   ]));

// // // //   // Track window width for responsive behavior
// // // //   useEffect(() => {
// // // //     const handleResize = () => {
// // // //       setWindowWidth(window.innerWidth);
// // // //       // Automatically switch to card view on smaller screens
// // // //       if (window.innerWidth < 768) {
// // // //         setViewMode("card");
// // // //       } else {
// // // //         setViewMode("table");
// // // //       }
// // // //     };
    
// // // //     handleResize();
// // // //     window.addEventListener("resize", handleResize);
// // // //     return () => window.removeEventListener("resize", handleResize);
// // // //   }, []);

// // // //   // Wrap loadData in useCallback to prevent it from changing on every render
// // // //   const loadData = useCallback(async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       setError(null);
// // // //       setStatusMessage("Loading data...");
// // // //       setStatusType("");

// // // //       const response = await fetch("/api/mtc-proxy", { method: "GET" });

// // // //       if (!response.ok) {
// // // //         const textErr = await response.text();
// // // //         throw new Error(`HTTP ${response.status}: ${textErr}`);
// // // //       }

// // // //       const text = await response.text();

// // // //       // Extract JSON string from XML <string>...</string>
// // // //       const match = text.match(/<string[^>]*>([\s\S]*?)<\/string>/i);
// // // //       if (!match) {
// // // //         throw new Error("No JSON string found inside XML <string>.");
// // // //       }

// // // //       const jsonText = match[1].trim();
// // // //       let json;
// // // //       try {
// // // //         json = JSON.parse(jsonText);
// // // //       } catch {
// // // //         console.error("JSON parse error. jsonText was:", jsonText);
// // // //         throw new Error("Invalid JSON returned by server.");
// // // //       }

// // // //       // Expected structure: { status: "success", data: [ ... ] }
// // // //       let rows: DataRow[];
// // // //       if (Array.isArray(json)) {
// // // //         rows = json;
// // // //       } else if (json && Array.isArray(json.data)) {
// // // //         rows = json.data;
// // // //       } else if (json && json.data) {
// // // //         rows = [json.data];
// // // //       } else {
// // // //         rows = [json];
// // // //       }

// // // //       if (!rows || rows.length === 0) {
// // // //         setStatusMessage("No records found.");
// // // //         setStatusType("success");
// // // //         setAllRows([]);
// // // //         setFilteredRows([]);
// // // //         return;
// // // //       }

// // // //       // Add default values for status and remarks if they don't exist
// // // //       rows = rows.map((row) => ({
// // // //         ...row,
// // // //         MTCStatus: row.MTCStatus || "Not Registered",
// // // //         Remarks: row.Remarks || ""
// // // //       }));

// // // //       // Determine all columns
// // // //       const columnSet: { [key: string]: boolean } = {};
// // // //       rows.forEach((row: DataRow) => {
// // // //         for (const key in row) {
// // // //           if (Object.prototype.hasOwnProperty.call(row, key)) {
// // // //             columnSet[key] = true;
// // // //           }
// // // //         }
// // // //       });
      
// // // //       // Ensure MTCStatus and Remarks are included in columns
// // // //       columnSet["MTCStatus"] = true;
// // // //       columnSet["Remarks"] = true;
      
// // // //       const columnKeys = Object.keys(columnSet);
// // // //       setColumns(columnKeys);

// // // //       // Extract MTC names for filter
// // // //       const mtcSet = new Set<string>();
// // // //       rows.forEach((r: DataRow) => {
// // // //         const name = (r.MtcName || r.mtcName || r.MTCName || "").toString().trim();
// // // //         if (name) mtcSet.add(name);
// // // //       });
// // // //       const sortedMtcNames = Array.from(mtcSet).sort((a, b) => a.localeCompare(b));
// // // //       setMtcNames(sortedMtcNames);

// // // //       setAllRows(rows);
// // // //       setFilteredRows(rows);
// // // //       setStatusMessage(`Loaded ${rows.length} record(s).`);
// // // //       setStatusType("success");
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       const errorMessage = err instanceof Error ? err.message : "Unknown error";
// // // //       setError(errorMessage);
// // // //       setStatusMessage(`Error: ${errorMessage}`);
// // // //       setStatusType("error");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   // Now include loadData in the dependency array
// // // //   useEffect(() => {
// // // //     loadData();
// // // //   }, [loadData]);

// // // //   const applyFilter = useCallback(() => {
// // // //     if (!allRows || allRows.length === 0) return;

// // // //     let filtered = allRows;
    
// // // //     // Apply MTC filter
// // // //     if (selectedMtc) {
// // // //       filtered = filtered.filter((r: DataRow) => {
// // // //         const name = (r.MtcName || r.mtcName || r.MTCName || "").toString().trim();
// // // //         return name === selectedMtc;
// // // //       });
// // // //     }
    
// // // //     // Apply search filter
// // // //     if (searchTerm) {
// // // //       const searchLower = searchTerm.toLowerCase();
// // // //       filtered = filtered.filter((row: DataRow) => {
// // // //         return Object.values(row).some(value => 
// // // //           value && value.toString().toLowerCase().includes(searchLower)
// // // //         );
// // // //       });
// // // //     }
    
// // // //     setFilteredRows(filtered);
// // // //     setStatusMessage(
// // // //       filtered.length !== allRows.length
// // // //         ? `Showing ${filtered.length} of ${allRows.length} record(s).`
// // // //         : `Loaded ${filtered.length} record(s).`
// // // //     );
// // // //   }, [allRows, selectedMtc, searchTerm]);

// // // //   useEffect(() => {
// // // //     applyFilter();
// // // //   }, [applyFilter]);

// // // //   const handleBack = () => {
// // // //     window.history.back();
// // // //   };

// // // //   const handleStatusChange = (rowIndex: number, newStatus: string) => {
// // // //     setStatusUpdates(prev => ({ ...prev, [rowIndex]: newStatus }));
    
// // // //     // Update the filtered rows
// // // //     const updatedRows = [...filteredRows];
// // // //     updatedRows[rowIndex] = { ...updatedRows[rowIndex], MTCStatus: newStatus };
// // // //     setFilteredRows(updatedRows);
    
// // // //     // Also update the original data
// // // //     const originalIndex = allRows.findIndex(row => 
// // // //       JSON.stringify(row) === JSON.stringify(filteredRows[rowIndex])
// // // //     );
// // // //     if (originalIndex !== -1) {
// // // //       const updatedAllRows = [...allRows];
// // // //       updatedAllRows[originalIndex] = { ...updatedAllRows[originalIndex], MTCStatus: newStatus };
// // // //       setAllRows(updatedAllRows);
// // // //     }
// // // //   };

// // // //   const handleRemarkChange = (rowIndex: number, newRemark: string) => {
// // // //     setRemarks(prev => ({ ...prev, [rowIndex]: newRemark }));
// // // //   };

// // // //   const saveRemark = (rowIndex: number) => {
// // // //     const remarkText = remarks[rowIndex] || "";
    
// // // //     // Update the filtered rows
// // // //     const updatedRows = [...filteredRows];
// // // //     updatedRows[rowIndex] = { ...updatedRows[rowIndex], Remarks: remarkText };
// // // //     setFilteredRows(updatedRows);
    
// // // //     // Also update the original data
// // // //     const originalIndex = allRows.findIndex(row => 
// // // //       JSON.stringify(row) === JSON.stringify(filteredRows[rowIndex])
// // // //     );
// // // //     if (originalIndex !== -1) {
// // // //       const updatedAllRows = [...allRows];
// // // //       updatedAllRows[originalIndex] = { ...updatedAllRows[originalIndex], Remarks: remarkText };
// // // //       setAllRows(updatedAllRows);
// // // //     }
    
// // // //     setEditingRemark(null);
// // // //     setStatusMessage("Remark saved successfully.");
// // // //     setStatusType("success");
// // // //   };

// // // //   const clearFilters = () => {
// // // //     setSelectedMtc("");
// // // //     setSearchTerm("");
// // // //   };

// // // //   const toggleColumnVisibility = (column: string) => {
// // // //     setVisibleColumns(prev => {
// // // //       const newSet = new Set(prev);
// // // //       if (newSet.has(column)) {
// // // //         newSet.delete(column);
// // // //       } else {
// // // //         newSet.add(column);
// // // //       }
// // // //       return newSet;
// // // //     });
// // // //   };

// // // //   const renderMobileCard = (row: DataRow, index: number) => {
// // // //     return (
// // // //       <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
// // // //         <div className="justify-between items-start mb-3">
// // // //           <h3 className="text-lg font-semibold text-gray-800">
// // // //             {row.NameOfChild || row.Name || row.ChildName || `Record ${index + 1}`}
// // // //           </h3>
// // // //           <span className={`px-2 py-1 text-xs rounded-full ${
// // // //             (statusUpdates[index] !== undefined ? statusUpdates[index] : (row.MTCStatus as string)) === "Registered"
// // // //               ? "bg-green-100 text-green-800"
// // // //               : "bg-gray-100 text-gray-800"
// // // //           }`}>
// // // //             {statusUpdates[index] !== undefined ? statusUpdates[index] : (row.MTCStatus as string || "Not Registered")}
// // // //           </span>
// // // //         </div>
        
// // // //         <div className="space-y-2">
// // // //           {columns.map((col) => {
// // // //             if (col === "MTCStatus" || col === "Remarks") return null;
            
// // // //             return (
// // // //               <div key={col} className="justify-between">
// // // //                 <span className="text-sm font-medium text-gray-500">{col}:</span>
// // // //                 <span className="text-sm text-gray-900">
// // // //                   {row[col] !== null && typeof row[col] === "object"
// // // //                     ? JSON.stringify(row[col])
// // // //                     : row[col] !== undefined && row[col] !== null
// // // //                     ? String(row[col])
// // // //                     : ""}
// // // //                 </span>
// // // //               </div>
// // // //             );
// // // //           })}
// // // //         </div>
        
// // // //         <div className="mt-4 pt-3 border-t border-gray-100">
// // // //           <div className="mb-3">
// // // //             <label className="text-sm font-medium text-gray-500 block mb-1">Status:</label>
// // // //             <select
// // // //               value={statusUpdates[index] !== undefined ? statusUpdates[index] : (row.MTCStatus as string || "Not Registered")}
// // // //               onChange={(e) => handleStatusChange(index, e.target.value)}
// // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
// // // //             >
// // // //               <option value="Registered">Registered</option>
// // // //               <option value="Not Registered">Not Registered</option>
// // // //             </select>
// // // //           </div>
          
// // // //           <div>
// // // //             <label className="text-sm font-medium text-gray-500 block mb-1">Remarks:</label>
// // // //             {editingRemark === index ? (
// // // //               <div className="items-center">
// // // //                 <input
// // // //                   type="text"
// // // //                   value={remarks[index] !== undefined ? remarks[index] : (row.Remarks as string || "")}
// // // //                   onChange={(e) => handleRemarkChange(index, e.target.value)}
// // // //                   className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
// // // //                   autoFocus
// // // //                 />
// // // //                 <button
// // // //                   onClick={() => saveRemark(index)}
// // // //                   className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
// // // //                 >
// // // //                   Save
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() => setEditingRemark(null)}
// // // //                   className="ml-1 px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
// // // //                 >
// // // //                   Cancel
// // // //                 </button>
// // // //               </div>
// // // //             ) : (
// // // //               <div className="items-center">
// // // //                 <span className="text-sm text-gray-900 flex-1">{row.Remarks as string || ""}</span>
// // // //                 <button
// // // //                   onClick={() => {
// // // //                     setEditingRemark(index);
// // // //                     setRemarks(prev => ({ ...prev, [index]: row.Remarks as string || "" }));
// // // //                   }}
// // // //                   className="ml-2 p-1 text-blue-600 hover:text-blue-800"
// // // //                 >
// // // //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
// // // //                   </svg>
// // // //                 </button>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 flex flex-col">
// // // //       {/* Header */}
// // // //       <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
// // // //         <div className="px-4 sm:px-6 lg:px-8 py-4">
// // // //           <div className="items-center justify-between">
// // // //             <div className="items-center">
// // // //               <button
// // // //                 onClick={handleBack}
// // // //                 className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors mr-4"
// // // //               >
// // // //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
// // // //                 </svg>
// // // //               </button>
// // // //               <h1 className="text-xl sm:text-2xl font-bold text-gray-800">MTC Referred Child List</h1>
// // // //             </div>
            
// // // //             <div className="items-center space-x-2">
// // // //               <button
// // // //                 onClick={() => setFilterPanelOpen(!filterPanelOpen)}
// // // //                 className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
// // // //               >
// // // //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
// // // //                 </svg>
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       {/* Filter Panel - Top */}
// // // //       <div className={`${filterPanelOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300 ease-in-out bg-linear-to-b from-indigo-50 to-white shadow-md z-30`}>
// // // //         <div className="p-4 sm:p-6">
// // // //           <div className="justify-between items-center mb-6">
// // // //             <h2 className="text-lg font-semibold text-indigo-800 items-center">
// // // //               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
// // // //               </svg>
// // // //               Filters
// // // //             </h2>
// // // //             <button
// // // //               onClick={() => setFilterPanelOpen(false)}
// // // //               className="p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
// // // //             >
// // // //               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// // // //               </svg>
// // // //             </button>
// // // //           </div>
          
// // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// // // //             {/* Refresh Button */}
// // // //             <div className="bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
// // // //               <button
// // // //                 onClick={loadData}
// // // //                 disabled={loading}
// // // //                 className="w-full px-4 py-2.5 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:from-indigo-300 disabled:to-purple-400 transition-all duration-200 justify-center shadow-md"
// // // //               >
// // // //                 {loading ? (
// // // //                   <>
// // // //                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // // //                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // // //                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // // //                     </svg>
// // // //                     Loading...
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// // // //                     </svg>
// // // //                     Refresh Data
// // // //                   </>
// // // //                 )}
// // // //               </button>
// // // //             </div>
            
// // // //             {/* MTC Filter */}
// // // //             <div className="bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
// // // //               <label htmlFor="mtcFilter" className="block text-sm font-medium text-gray-700 mb-2 items-center">
// // // //                 <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
// // // //                 </svg>
// // // //                 Filter by MTC
// // // //               </label>
// // // //               <select
// // // //                 id="mtcFilter"
// // // //                 value={selectedMtc}
// // // //                 onChange={(e) => setSelectedMtc(e.target.value)}
// // // //                 disabled={loading || mtcNames.length === 0}
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
// // // //               >
// // // //                 <option value="">-- All MTCs --</option>
// // // //                 {mtcNames.map((name) => (
// // // //                   <option key={name} value={name}>
// // // //                     {name}
// // // //                   </option>
// // // //                 ))}
// // // //               </select>
// // // //             </div>
            
// // // //             {/* Search Filter */}
// // // //             <div className="bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
// // // //               <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2 items-center">
// // // //                 <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// // // //                 </svg>
// // // //                 Search
// // // //               </label>
// // // //               <div className="relative">
// // // //                 <input
// // // //                   id="search"
// // // //                   type="text"
// // // //                   value={searchTerm}
// // // //                   onChange={(e) => setSearchTerm(e.target.value)}
// // // //                   placeholder="Search records..."
// // // //                   className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
// // // //                 />
// // // //                 {searchTerm && (
// // // //                   <button
// // // //                     onClick={() => setSearchTerm("")}
// // // //                     className="absolute inset-y-0 right-0 items-center pr-3"
// // // //                   >
// // // //                     <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// // // //                     </svg>
// // // //                   </button>
// // // //                 )}
// // // //               </div>
// // // //             </div>
            
// // // //             {/* Clear Filters */}
// // // //             <div className="bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
// // // //               <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
// // // //               <button
// // // //                 onClick={clearFilters}
// // // //                 disabled={!selectedMtc && !searchTerm}
// // // //                 className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 transition-colors justify-center"
// // // //               >
// // // //                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// // // //                 </svg>
// // // //                 Clear Filters
// // // //               </button>
// // // //             </div>
// // // //           </div>
          
// // // //           {/* Column Visibility Toggle */}
// // // //           {windowWidth >= 768 && (
// // // //             <div className="mt-4 bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
// // // //               <label className="block text-sm font-medium text-gray-700 mb-3 items-center">
// // // //                 <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
// // // //                 </svg>
// // // //                 Column Visibility
// // // //               </label>
// // // //               <div className="flex-wrap gap-2">
// // // //                 {columns.map((col) => (
// // // //                   <button
// // // //                     key={col}
// // // //                     onClick={() => toggleColumnVisibility(col)}
// // // //                     className={`px-3 py-1 rounded-full text-xs transition-colors ${
// // // //                       visibleColumns.has(col)
// // // //                         ? "bg-indigo-500 text-white"
// // // //                         : "bg-gray-200 text-gray-700 hover:bg-gray-300"
// // // //                     }`}
// // // //                   >
// // // //                     {col}
// // // //                   </button>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           )}
          
// // // //           {/* View Mode Toggle */}
// // // //           {windowWidth >= 768 && (
// // // //             <div className="mt-4 bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
// // // //               <label className="block text-sm font-medium text-gray-700 mb-3 items-center">
// // // //                 <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
// // // //                 </svg>
// // // //                 View Mode
// // // //               </label>
// // // //               <div className="rounded-md overflow-hidden shadow-sm max-w-xs">
// // // //                 <button
// // // //                   onClick={() => setViewMode("table")}
// // // //                   className={`flex-1 px-3 py-2 transition-all ${
// // // //                     viewMode === "table"
// // // //                       ? "bg-indigo-500 text-white"
// // // //                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// // // //                   }`}
// // // //                 >
// // // //                   <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
// // // //                   </svg>
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() => setViewMode("card")}
// // // //                   className={`flex-1 px-3 py-2 transition-all ${
// // // //                     viewMode === "card"
// // // //                       ? "bg-indigo-500 text-white"
// // // //                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// // // //                   }`}
// // // //                 >
// // // //                   <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
// // // //                   </svg>
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           )}
          
// // // //           {/* Status Messages */}
// // // //           <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-indigo-100">
// // // //             <div className={`text-sm ${
// // // //               statusType === "error" ? "text-red-600" : statusType === "success" ? "text-green-600" : "text-gray-600"
// // // //             }`}>
// // // //               {statusMessage}
// // // //             </div>
            
// // // //             {error && (
// // // //               <div className="mt-2 bg-red-50 border-l-4 border-red-500 p-3 rounded">
// // // //                 <div className="shrink-0">
// // // //                   <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
// // // //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// // // //                   </svg>
// // // //                 </div>
// // // //                 <div className="ml-3">
// // // //                   <p className="text-sm text-red-700">
// // // //                     <strong>Error:</strong> {error}
// // // //                   </p>
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Main Content */}
// // // //       <main className="flex-1 overflow-y-auto bg-gray-50">
// // // //         <div className="p-4 sm:p-6 lg:p-8">
// // // //           {filteredRows.length > 0 ? (
// // // //             <>
// // // //               {viewMode === "table" && windowWidth >= 768 ? (
// // // //                 <div className="bg-white rounded-lg shadow overflow-hidden">
// // // //                   <div className="overflow-x-auto">
// // // //                     <table className="min-w-full divide-y divide-gray-200 text-xs">
// // // //                       <thead className="bg-gray-50">
// // // //                         <tr>
// // // //                           {columns.filter(col => visibleColumns.has(col)).map((col) => (
// // // //                             <th key={col} className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
// // // //                               {col}
// // // //                             </th>
// // // //                           ))}
// // // //                         </tr>
// // // //                       </thead>
// // // //                       <tbody className="bg-white divide-y divide-gray-200">
// // // //                         {filteredRows.map((row: DataRow, index) => (
// // // //                           <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
// // // //                             {columns.filter(col => visibleColumns.has(col)).map((col) => (
// // // //                               <td key={col} className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
// // // //                                 {col === "MTCStatus" ? (
// // // //                                   <select
// // // //                                     value={statusUpdates[index] !== undefined ? statusUpdates[index] : (row[col] as string || "Not Registered")}
// // // //                                     onChange={(e) => handleStatusChange(index, e.target.value)}
// // // //                                     className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs w-full"
// // // //                                   >
// // // //                                     <option value="Registered">Registered</option>
// // // //                                     <option value="Not Registered">Not Registered</option>
// // // //                                   </select>
// // // //                                 ) : col === "Remarks" ? (
// // // //                                   editingRemark === index ? (
// // // //                                     <div className="items-center">
// // // //                                       <input
// // // //                                         type="text"
// // // //                                         value={remarks[index] !== undefined ? remarks[index] : (row[col] as string || "")}
// // // //                                         onChange={(e) => handleRemarkChange(index, e.target.value)}
// // // //                                         className="px-1 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs flex-1 w-20"
// // // //                                         autoFocus
// // // //                                       />
// // // //                                       <button
// // // //                                         onClick={() => saveRemark(index)}
// // // //                                         className="ml-1 px-1 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
// // // //                                       >
// // // //                                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // // //                                         </svg>
// // // //                                       </button>
// // // //                                       <button
// // // //                                         onClick={() => setEditingRemark(null)}
// // // //                                         className="ml-1 px-1 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-xs"
// // // //                                       >
// // // //                                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// // // //                                         </svg>
// // // //                                       </button>
// // // //                                     </div>
// // // //                                   ) : (
// // // //                                     <div className="items-center">
// // // //                                       <span className="truncate max-w-20">{row[col] as string || ""}</span>
// // // //                                       <button
// // // //                                         onClick={() => {
// // // //                                           setEditingRemark(index);
// // // //                                           setRemarks(prev => ({ ...prev, [index]: row[col] as string || "" }));
// // // //                                         }}
// // // //                                         className="ml-1 text-blue-600 hover:text-blue-800"
// // // //                                       >
// // // //                                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
// // // //                                         </svg>
// // // //                                       </button>
// // // //                                     </div>
// // // //                                   )
// // // //                                 ) : row[col] !== null && typeof row[col] === "object" ? (
// // // //                                   <span className="truncate max-w-20">{JSON.stringify(row[col])}</span>
// // // //                                 ) : row[col] !== undefined && row[col] !== null ? (
// // // //                                   <span className="truncate max-w-20">{String(row[col])}</span>
// // // //                                 ) : (
// // // //                                   ""
// // // //                                 )}
// // // //                               </td>
// // // //                             ))}
// // // //                           </tr>
// // // //                         ))}   
// // // //                       </tbody>
// // // //                     </table>
// // // //                   </div>
// // // //                 </div>
// // // //               ) : (
// // // //                 <div className="space-y-4">
// // // //                   {filteredRows.map((row: DataRow, index) => renderMobileCard(row, index))}
// // // //                 </div>
// // // //               )}
// // // //             </>
// // // //           ) : loading ? (
// // // //             <div className="flex-col items-center justify-center h-64">
// // // //               <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// // // //               <p className="mt-4 text-gray-600">Loading data...</p>
// // // //             </div>
// // // //           ) : (
// // // //             <div className="flex-col items-center justify-center h-64 text-center">
// // // //               <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// // // //               </svg>
// // // //               <h3 className="mt-2 text-sm font-medium text-gray-900">No data to display</h3>
// // // //               <p className="mt-1 text-sm text-gray-500">Try refreshing the data or adjusting your filters.</p>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }


// // // "use client";

// // // import { useState, useEffect, useCallback } from "react";

// // // interface DataRow {
// // //   [key: string]: string | number | boolean | null | undefined;
// // // }

// // // export default function MTCReferredChildListStandalone() {
// // //   const [allRows, setAllRows] = useState<DataRow[]>([]);
// // //   const [filteredRows, setFilteredRows] = useState<DataRow[]>([]);
// // //   const [columns, setColumns] = useState<string[]>([]);
// // //   const [mtcNames, setMtcNames] = useState<string[]>([]);
// // //   const [selectedMtc, setSelectedMtc] = useState<string>("");
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [statusMessage, setStatusMessage] = useState<string>("");
// // //   const [statusType, setStatusType] = useState<"success" | "error" | "">("");
// // //   const [statusUpdates, setStatusUpdates] = useState<{[key: number]: string}>({});
// // //   const [remarks, setRemarks] = useState<{[key: number]: string}>({});
// // //   const [editingRemark, setEditingRemark] = useState<number | null>(null);
// // //   const [filterPanelOpen, setFilterPanelOpen] = useState<boolean>(true);
// // //   const [viewMode, setViewMode] = useState<"table" | "card">("table");
// // //   const [searchTerm, setSearchTerm] = useState<string>("");
// // //   const [windowWidth, setWindowWidth] = useState<number>(0);
// // //   const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set([
// // //     "uuidChild", "NameOfChild", "Age", "Gender", "Weight", "Length", 
// // //     "AwcName", "AwcSevikaName", "AwcSevikaMobileNo", "ProjectName", 
// // //     "DistrictName", "MtcName", "MtcId", "MTCStatus", "Remarks"
// // //   ]));

// // //   // Track window width for responsive behavior
// // //   useEffect(() => {
// // //     const handleResize = () => {
// // //       setWindowWidth(window.innerWidth);
// // //       // Automatically switch to card view on smaller screens
// // //       if (window.innerWidth < 768) {
// // //         setViewMode("card");
// // //       } else {
// // //         setViewMode("table");
// // //       }
// // //     };
    
// // //     handleResize();
// // //     window.addEventListener("resize", handleResize);
// // //     return () => window.removeEventListener("resize", handleResize);
// // //   }, []);

// // //   // Wrap loadData in useCallback to prevent it from changing on every render
// // //   const loadData = useCallback(async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
// // //       setStatusMessage("Loading data...");
// // //       setStatusType("");

// // //       const response = await fetch("/api/mtc-proxy", { method: "GET" });

// // //       if (!response.ok) {
// // //         // This will now catch the detailed JSON error from our updated proxy
// // //         let errorMsg = `HTTP ${response.status}`;
// // //         try {
// // //           const errData = await response.json();
// // //           if (errData.error) errorMsg = errData.error;
// // //         } catch {
// // //           errorMsg = await response.text();
// // //         }
// // //         throw new Error(errorMsg);
// // //       }

// // //       const text = await response.text();

// // //       // Extract JSON string from XML <string>...</string>
// // //       const match = text.match(/<string[^>]*>([\s\S]*?)<\/string>/i);
// // //       if (!match) {
// // //         throw new Error("No JSON string found inside XML <string>.");
// // //       }

// // //       const jsonText = match[1].trim();
// // //       let json;
// // //       try {
// // //         json = JSON.parse(jsonText);
// // //       } catch {
// // //         console.error("JSON parse error. jsonText was:", jsonText);
// // //         throw new Error("Invalid JSON returned by server.");
// // //       }

// // //       // Expected structure: { status: "success", data: [ ... ] }
// // //       let rows: DataRow[];
// // //       if (Array.isArray(json)) {
// // //         rows = json;
// // //       } else if (json && Array.isArray(json.data)) {
// // //         rows = json.data;
// // //       } else if (json && json.data) {
// // //         rows = [json.data];
// // //       } else {
// // //         rows = [json];
// // //       }

// // //       if (!rows || rows.length === 0) {
// // //         setStatusMessage("No records found.");
// // //         setStatusType("success");
// // //         setAllRows([]);
// // //         setFilteredRows([]);
// // //         return;
// // //       }

// // //       // Add default values for status and remarks if they don't exist
// // //       rows = rows.map((row) => ({
// // //         ...row,
// // //         MTCStatus: row.MTCStatus || "Not Registered",
// // //         Remarks: row.Remarks || ""
// // //       }));

// // //       // Determine all columns
// // //       const columnSet: { [key: string]: boolean } = {};
// // //       rows.forEach((row: DataRow) => {
// // //         for (const key in row) {
// // //           if (Object.prototype.hasOwnProperty.call(row, key)) {
// // //             columnSet[key] = true;
// // //           }
// // //         }
// // //       });
      
// // //       // Ensure MTCStatus and Remarks are included in columns
// // //       columnSet["MTCStatus"] = true;
// // //       columnSet["Remarks"] = true;
      
// // //       const columnKeys = Object.keys(columnSet);
// // //       setColumns(columnKeys);

// // //       // Extract MTC names for filter
// // //       const mtcSet = new Set<string>();
// // //       rows.forEach((r: DataRow) => {
// // //         const name = (r.MtcName || r.mtcName || r.MTCName || "").toString().trim();
// // //         if (name) mtcSet.add(name);
// // //       });
// // //       const sortedMtcNames = Array.from(mtcSet).sort((a, b) => a.localeCompare(b));
// // //       setMtcNames(sortedMtcNames);

// // //       setAllRows(rows);
// // //       setFilteredRows(rows);
// // //       setStatusMessage(`Loaded ${rows.length} record(s).`);
// // //       setStatusType("success");
// // //     } catch (err) {
// // //       console.error(err);
// // //       const errorMessage = err instanceof Error ? err.message : "Unknown error";
// // //       setError(errorMessage);
// // //       setStatusMessage("Failed to load data.");
// // //       setStatusType("error");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   // Now include loadData in the dependency array
// // //   useEffect(() => {
// // //     loadData();
// // //   }, [loadData]);

// // //   const applyFilter = useCallback(() => {
// // //     if (!allRows || allRows.length === 0) return;

// // //     let filtered = allRows;
    
// // //     // Apply MTC filter
// // //     if (selectedMtc) {
// // //       filtered = filtered.filter((r: DataRow) => {
// // //         const name = (r.MtcName || r.mtcName || r.MTCName || "").toString().trim();
// // //         return name === selectedMtc;
// // //       });
// // //     }
    
// // //     // Apply search filter
// // //     if (searchTerm) {
// // //       const searchLower = searchTerm.toLowerCase();
// // //       filtered = filtered.filter((row: DataRow) => {
// // //         return Object.values(row).some(value => 
// // //           value && value.toString().toLowerCase().includes(searchLower)
// // //         );
// // //       });
// // //     }
    
// // //     setFilteredRows(filtered);
// // //     setStatusMessage(
// // //       filtered.length !== allRows.length
// // //         ? `Showing ${filtered.length} of ${allRows.length} record(s).`
// // //         : `Loaded ${filtered.length} record(s).`
// // //     );
// // //   }, [allRows, selectedMtc, searchTerm]);

// // //   useEffect(() => {
// // //     applyFilter();
// // //   }, [applyFilter]);

// // //   const handleBack = () => {
// // //     window.history.back();
// // //   };

// // //   const handleStatusChange = (rowIndex: number, newStatus: string) => {
// // //     setStatusUpdates(prev => ({ ...prev, [rowIndex]: newStatus }));
    
// // //     // Update the filtered rows
// // //     const updatedRows = [...filteredRows];
// // //     updatedRows[rowIndex] = { ...updatedRows[rowIndex], MTCStatus: newStatus };
// // //     setFilteredRows(updatedRows);
    
// // //     // Also update the original data
// // //     const originalIndex = allRows.findIndex(row => 
// // //       JSON.stringify(row) === JSON.stringify(filteredRows[rowIndex])
// // //     );
// // //     if (originalIndex !== -1) {
// // //       const updatedAllRows = [...allRows];
// // //       updatedAllRows[originalIndex] = { ...updatedAllRows[originalIndex], MTCStatus: newStatus };
// // //       setAllRows(updatedAllRows);
// // //     }
// // //   };

// // //   const handleRemarkChange = (rowIndex: number, newRemark: string) => {
// // //     setRemarks(prev => ({ ...prev, [rowIndex]: newRemark }));
// // //   };

// // //   const saveRemark = (rowIndex: number) => {
// // //     const remarkText = remarks[rowIndex] || "";
    
// // //     // Update the filtered rows
// // //     const updatedRows = [...filteredRows];
// // //     updatedRows[rowIndex] = { ...updatedRows[rowIndex], Remarks: remarkText };
// // //     setFilteredRows(updatedRows);
    
// // //     // Also update the original data
// // //     const originalIndex = allRows.findIndex(row => 
// // //       JSON.stringify(row) === JSON.stringify(filteredRows[rowIndex])
// // //     );
// // //     if (originalIndex !== -1) {
// // //       const updatedAllRows = [...allRows];
// // //       updatedAllRows[originalIndex] = { ...updatedAllRows[originalIndex], Remarks: remarkText };
// // //       setAllRows(updatedAllRows);
// // //     }
    
// // //     setEditingRemark(null);
// // //     setStatusMessage("Remark saved successfully.");
// // //     setStatusType("success");
// // //   };

// // //   const clearFilters = () => {
// // //     setSelectedMtc("");
// // //     setSearchTerm("");
// // //   };

// // //   const toggleColumnVisibility = (column: string) => {
// // //     setVisibleColumns(prev => {
// // //       const newSet = new Set(prev);
// // //       if (newSet.has(column)) {
// // //         newSet.delete(column);
// // //       } else {
// // //         newSet.add(column);
// // //       }
// // //       return newSet;
// // //     });
// // //   };

// // //   const renderMobileCard = (row: DataRow, index: number) => {
// // //     return (
// // //       <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
// // //         <div className="flex justify-between items-start mb-3">
// // //           <h3 className="text-lg font-semibold text-gray-800">
// // //             {row.NameOfChild || row.Name || row.ChildName || `Record ${index + 1}`}
// // //           </h3>
// // //           <span className={`px-2 py-1 text-xs rounded-full ${
// // //             (statusUpdates[index] !== undefined ? statusUpdates[index] : (row.MTCStatus as string)) === "Registered"
// // //               ? "bg-green-100 text-green-800"
// // //               : "bg-gray-100 text-gray-800"
// // //           }`}>
// // //             {statusUpdates[index] !== undefined ? statusUpdates[index] : (row.MTCStatus as string || "Not Registered")}
// // //           </span>
// // //         </div>
        
// // //         <div className="space-y-2">
// // //           {columns.map((col) => {
// // //             if (col === "MTCStatus" || col === "Remarks") return null;
            
// // //             return (
// // //               <div key={col} className="flex justify-between">
// // //                 <span className="text-sm font-medium text-gray-500">{col}:</span>
// // //                 <span className="text-sm text-gray-900">
// // //                   {row[col] !== null && typeof row[col] === "object"
// // //                     ? JSON.stringify(row[col])
// // //                     : row[col] !== undefined && row[col] !== null
// // //                     ? String(row[col])
// // //                     : ""}
// // //                 </span>
// // //               </div>
// // //             );
// // //           })}
// // //         </div>
        
// // //         <div className="mt-4 pt-3 border-t border-gray-100">
// // //           <div className="mb-3">
// // //             <label className="text-sm font-medium text-gray-500 block mb-1">Status:</label>
// // //             <select
// // //               value={statusUpdates[index] !== undefined ? statusUpdates[index] : (row.MTCStatus as string || "Not Registered")}
// // //               onChange={(e) => handleStatusChange(index, e.target.value)}
// // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
// // //             >
// // //               <option value="Registered">Registered</option>
// // //               <option value="Not Registered">Not Registered</option>
// // //             </select>
// // //           </div>
          
// // //           <div>
// // //             <label className="text-sm font-medium text-gray-500 block mb-1">Remarks:</label>
// // //             {editingRemark === index ? (
// // //               <div className="flex items-center">
// // //                 <input
// // //                   type="text"
// // //                   value={remarks[index] !== undefined ? remarks[index] : (row.Remarks as string || "")}
// // //                   onChange={(e) => handleRemarkChange(index, e.target.value)}
// // //                   className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
// // //                   autoFocus
// // //                 />
// // //                 <button
// // //                   onClick={() => saveRemark(index)}
// // //                   className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
// // //                 >
// // //                   Save
// // //                 </button>
// // //                 <button
// // //                   onClick={() => setEditingRemark(null)}
// // //                   className="ml-1 px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //               </div>
// // //             ) : (
// // //               <div className="flex items-center">
// // //                 <span className="text-sm text-gray-900 flex-1">{row.Remarks as string || ""}</span>
// // //                 <button
// // //                   onClick={() => {
// // //                     setEditingRemark(index);
// // //                     setRemarks(prev => ({ ...prev, [index]: row.Remarks as string || "" }));
// // //                   }}
// // //                   className="ml-2 p-1 text-blue-600 hover:text-blue-800"
// // //                 >
// // //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
// // //                   </svg>
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 flex flex-col">
// // //       {/* Header */}
// // //       <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
// // //         <div className="px-4 sm:px-6 lg:px-8 py-4">
// // //           <div className="flex items-center justify-between">
// // //             <div className="flex items-center">
// // //               <button
// // //                 onClick={handleBack}
// // //                 className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors mr-4"
// // //               >
// // //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
// // //                 </svg>
// // //               </button>
// // //               <h1 className="text-xl sm:text-2xl font-bold text-gray-800">MTC Referred Child List</h1>
// // //             </div>
            
// // //             <div className="flex items-center space-x-2">
// // //               <button
// // //                 onClick={() => setFilterPanelOpen(!filterPanelOpen)}
// // //                 className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
// // //               >
// // //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
// // //                 </svg>
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       {/* Filter Panel - Top */}
// // //       <div className={`${filterPanelOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300 ease-in-out bg-linear-to-b from-indigo-50 to-white shadow-md z-30`}>
// // //         <div className="p-4 sm:p-6">
// // //           <div className="flex justify-between items-center mb-6">
// // //             <h2 className="text-lg font-semibold text-indigo-800 flex items-center">
// // //               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
// // //               </svg>
// // //               Filters
// // //             </h2>
// // //             <button
// // //               onClick={() => setFilterPanelOpen(false)}
// // //               className="p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
// // //             >
// // //               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// // //               </svg>
// // //             </button>
// // //           </div>
          
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// // //             {/* Refresh Button */}
// // //             <div className="bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
// // //               <button
// // //                 onClick={loadData}
// // //                 disabled={loading}
// // //                 className="w-full flex px-4 py-2.5 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:from-indigo-300 disabled:to-purple-400 transition-all duration-200 justify-center shadow-md"
// // //               >
// // //                 {loading ? (
// // //                   <>
// // //                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // //                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //                     </svg>
// // //                     Loading...
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// // //                     </svg>
// // //                     Refresh Data
// // //                   </>
// // //                 )}
// // //               </button>
// // //             </div>
            
// // //             {/* MTC Filter */}
// // //             <div className="bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
// // //               <label htmlFor="mtcFilter" className="flex text-sm font-medium text-gray-700 mb-2 items-center">
// // //                 <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
// // //                 </svg>
// // //                 Filter by MTC
// // //               </label>
// // //               <select
// // //                 id="mtcFilter"
// // //                 value={selectedMtc}
// // //                 onChange={(e) => setSelectedMtc(e.target.value)}
// // //                 disabled={loading || mtcNames.length === 0}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
// // //               >
// // //                 <option value="">-- All MTCs --</option>
// // //                 {mtcNames.map((name) => (
// // //                   <option key={name} value={name}>
// // //                     {name}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             </div>
            
// // //             {/* Search Filter */}
// // //             <div className="bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
// // //               <label htmlFor="search" className="flex text-sm font-medium text-gray-700 mb-2 items-center">
// // //                 <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// // //                 </svg>
// // //                 Search
// // //               </label>
// // //               <div className="relative">
// // //                 <input
// // //                   id="search"
// // //                   type="text"
// // //                   value={searchTerm}
// // //                   onChange={(e) => setSearchTerm(e.target.value)}
// // //                   placeholder="Search records..."
// // //                   className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
// // //                 />
// // //                 {searchTerm && (
// // //                   <button
// // //                     onClick={() => setSearchTerm("")}
// // //                     className="absolute inset-y-0 right-0 flex items-center pr-3"
// // //                   >
// // //                     <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// // //                     </svg>
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             </div>
            
// // //             {/* Clear Filters */}
// // //             <div className="bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
// // //               <button
// // //                 onClick={clearFilters}
// // //                 disabled={!selectedMtc && !searchTerm}
// // //                 className="w-full flex px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 transition-colors justify-center"
// // //               >
// // //                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// // //                 </svg>
// // //                 Clear Filters
// // //               </button>
// // //             </div>
// // //           </div>
          
// // //           {/* Column Visibility Toggle */}
// // //           {windowWidth >= 768 && (
// // //             <div className="mt-4 bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
// // //               <label className="flex text-sm font-medium text-gray-700 mb-3 items-center">
// // //                 <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
// // //                 </svg>
// // //                 Column Visibility
// // //               </label>
// // //               <div className="flex flex-wrap gap-2">
// // //                 {columns.map((col) => (
// // //                   <button
// // //                     key={col}
// // //                     onClick={() => toggleColumnVisibility(col)}
// // //                     className={`px-3 py-1 rounded-full text-xs transition-colors ${
// // //                       visibleColumns.has(col)
// // //                         ? "bg-indigo-500 text-white"
// // //                         : "bg-gray-200 text-gray-700 hover:bg-gray-300"
// // //                     }`}
// // //                   >
// // //                     {col}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           )}
          
// // //           {/* View Mode Toggle */}
// // //           {windowWidth >= 768 && (
// // //             <div className="mt-4 bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
// // //               <label className="flex text-sm font-medium text-gray-700 mb-3 items-center">
// // //                 <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
// // //                 </svg>
// // //                 View Mode
// // //               </label>
// // //               <div className="flex rounded-md overflow-hidden shadow-sm max-w-xs">
// // //                 <button
// // //                   onClick={() => setViewMode("table")}
// // //                   className={`flex-1 px-3 py-2 transition-all ${
// // //                     viewMode === "table"
// // //                       ? "bg-indigo-500 text-white"
// // //                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// // //                   }`}
// // //                 >
// // //                   <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
// // //                   </svg>
// // //                 </button>
// // //                 <button
// // //                   onClick={() => setViewMode("card")}
// // //                   className={`flex-1 px-3 py-2 transition-all ${
// // //                     viewMode === "card"
// // //                       ? "bg-indigo-500 text-white"
// // //                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// // //                   }`}
// // //                 >
// // //                   <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
// // //                   </svg>
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           )}
          
// // //           {/* Status Messages */}
// // //           <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-indigo-100">
// // //             <div className={`text-sm ${
// // //               statusType === "error" ? "text-red-600" : statusType === "success" ? "text-green-600" : "text-gray-600"
// // //             }`}>
// // //               {statusMessage}
// // //             </div>
            
// // //             {error && (
// // //               <div className="mt-2 bg-red-50 border-l-4 border-red-500 p-3 rounded">
// // //                 <div className="flex">
// // //                   <div className="shrink-0">
// // //                     <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
// // //                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// // //                     </svg>
// // //                   </div>
// // //                   <div className="ml-3 flex-1 overflow-x-auto">
// // //                     <p className="text-sm text-red-700 font-mono">
// // //                       <strong>Error Details:</strong> {error}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Main Content */}
// // //       <main className="flex-1 overflow-y-auto bg-gray-50">
// // //         <div className="p-4 sm:p-6 lg:p-8">
// // //           {filteredRows.length > 0 ? (
// // //             <>
// // //               {viewMode === "table" && windowWidth >= 768 ? (
// // //                 <div className="bg-white rounded-lg shadow overflow-hidden">
// // //                   <div className="overflow-x-auto">
// // //                     <table className="min-w-full divide-y divide-gray-200 text-xs">
// // //                       <thead className="bg-gray-50">
// // //                         <tr>
// // //                           {columns.filter(col => visibleColumns.has(col)).map((col) => (
// // //                             <th key={col} className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
// // //                               {col}
// // //                             </th>
// // //                           ))}
// // //                         </tr>
// // //                       </thead>
// // //                       <tbody className="bg-white divide-y divide-gray-200">
// // //                         {filteredRows.map((row: DataRow, index) => (
// // //                           <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
// // //                             {columns.filter(col => visibleColumns.has(col)).map((col) => (
// // //                               <td key={col} className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
// // //                                 {col === "MTCStatus" ? (
// // //                                   <select
// // //                                     value={statusUpdates[index] !== undefined ? statusUpdates[index] : (row[col] as string || "Not Registered")}
// // //                                     onChange={(e) => handleStatusChange(index, e.target.value)}
// // //                                     className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs w-full"
// // //                                   >
// // //                                     <option value="Registered">Registered</option>
// // //                                     <option value="Not Registered">Not Registered</option>
// // //                                   </select>
// // //                                 ) : col === "Remarks" ? (
// // //                                   editingRemark === index ? (
// // //                                     <div className="flex items-center">
// // //                                       <input
// // //                                         type="text"
// // //                                         value={remarks[index] !== undefined ? remarks[index] : (row[col] as string || "")}
// // //                                         onChange={(e) => handleRemarkChange(index, e.target.value)}
// // //                                         className="px-1 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs flex-1 w-20"
// // //                                         autoFocus
// // //                                       />
// // //                                       <button
// // //                                         onClick={() => saveRemark(index)}
// // //                                         className="ml-1 px-1 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
// // //                                       >
// // //                                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // //                                         </svg>
// // //                                       </button>
// // //                                       <button
// // //                                         onClick={() => setEditingRemark(null)}
// // //                                         className="ml-1 px-1 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-xs"
// // //                                       >
// // //                                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// // //                                         </svg>
// // //                                       </button>
// // //                                     </div>
// // //                                   ) : (
// // //                                     <div className="flex items-center">
// // //                                       <span className="truncate max-w-20">{row[col] as string || ""}</span>
// // //                                       <button
// // //                                         onClick={() => {
// // //                                           setEditingRemark(index);
// // //                                           setRemarks(prev => ({ ...prev, [index]: row[col] as string || "" }));
// // //                                         }}
// // //                                         className="ml-1 text-blue-600 hover:text-blue-800"
// // //                                       >
// // //                                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
// // //                                         </svg>
// // //                                       </button>
// // //                                     </div>
// // //                                   )
// // //                                 ) : row[col] !== null && typeof row[col] === "object" ? (
// // //                                   <span className="truncate max-w-20">{JSON.stringify(row[col])}</span>
// // //                                 ) : row[col] !== undefined && row[col] !== null ? (
// // //                                   <span className="truncate max-w-20">{String(row[col])}</span>
// // //                                 ) : (
// // //                                   ""
// // //                                 )}
// // //                               </td>
// // //                             ))}
// // //                           </tr>
// // //                         ))}   
// // //                       </tbody>
// // //                     </table>
// // //                   </div>
// // //                 </div>
// // //               ) : (
// // //                 <div className="space-y-4">
// // //                   {filteredRows.map((row: DataRow, index) => renderMobileCard(row, index))}
// // //                 </div>
// // //               )}
// // //             </>
// // //           ) : loading ? (
// // //             <div className="flex flex-col items-center justify-center h-64">
// // //               <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// // //               <p className="mt-4 text-gray-600">Loading data...</p>
// // //             </div>
// // //           ) : (
// // //             <div className="flex flex-col items-center justify-center h-64 text-center">
// // //               <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// // //               </svg>
// // //               <h3 className="mt-2 text-sm font-medium text-gray-900">No data to display</h3>
// // //               <p className="mt-1 text-sm text-gray-500">Try refreshing the data or adjusting your filters.</p>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }


// // "use client";

// // import { useState, useEffect, useCallback, useMemo } from "react";
// // import { useRouter } from "next/navigation"; // Used for navigation

// // interface DataRow {
// //   [key: string]: string | number | boolean | null | undefined;
// // }

// // export default function MTCReferredChildListStandalone() {
// //   const router = useRouter(); // Initialize router
// //   const [allRows, setAllRows] = useState<DataRow[]>([]);
// //   const [filteredRows, setFilteredRows] = useState<DataRow[]>([]);
// //   const [columns, setColumns] = useState<string[]>([]);
// //   const [mtcNames, setMtcNames] = useState<string[]>([]);
// //   const [selectedMtc, setSelectedMtc] = useState<string>("");
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [statusMessage, setStatusMessage] = useState<string>("");
// //   const [statusType, setStatusType] = useState<"success" | "error" | "">("");
// //   const [statusUpdates, setStatusUpdates] = useState<{[key: number]: string}>({});
// //   const [remarks, setRemarks] = useState<{[key: number]: string}>({});
// //   const [editingRemark, setEditingRemark] = useState<number | null>(null);
// //   const [filterPanelOpen, setFilterPanelOpen] = useState<boolean>(true);
// //   const [viewMode, setViewMode] = useState<"table" | "card">("table");
// //   const [searchTerm, setSearchTerm] = useState<string>("");
// //   const [windowWidth, setWindowWidth] = useState<number>(0);
// //   const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set([
// //     "uuidChild", "NameOfChild", "Age", "Gender", "Weight", "Length", 
// //     "AwcName", "AwcSevikaName", "AwcSevikaMobileNo", "ProjectName", 
// //     "DistrictName", "MtcName", "MtcId", "MTCStatus", "Remarks"
// //   ]));

// //   // Derived Summary Statistics
// //   const summaryStats = useMemo(() => {
// //     const total = allRows.length;
// //     const registered = allRows.filter(r => r.MTCStatus === "Registered").length;
// //     const pending = total - registered;
// //     return { total, registered, pending };
// //   }, [allRows]);

// //   // Track window width for responsive behavior
// //   useEffect(() => {
// //     const handleResize = () => {
// //       setWindowWidth(window.innerWidth);
// //       if (window.innerWidth < 1024) {
// //         setViewMode("card");
// //       } else {
// //         setViewMode("table");
// //       }
// //     };
    
// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const loadData = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       setStatusMessage("Syncing records from database...");
// //       setStatusType("");

// //       const response = await fetch("/api/mtc-proxy", { method: "GET" });

// //       if (!response.ok) {
// //         let errorMsg = `HTTP ${response.status}`;
// //         try {
// //           const errData = await response.json();
// //           if (errData.error) errorMsg = errData.error;
// //         } catch {
// //           errorMsg = await response.text();
// //         }
// //         throw new Error(errorMsg);
// //       }

// //       const text = await response.text();
// //       const match = text.match(/<string[^>]*>([\s\S]*?)<\/string>/i);
// //       if (!match) {
// //         throw new Error("No payload found matching content definitions.");
// //       }

// //       const jsonText = match[1].trim();
// //       let json;
// //       try {
// //         json = JSON.parse(jsonText);
// //       } catch {
// //         throw new Error("Invalid JSON returned by server.");
// //       }

// //       let rows: DataRow[];
// //       if (Array.isArray(json)) {
// //         rows = json;
// //       } else if (json && Array.isArray(json.data)) {
// //         rows = json.data;
// //       } else if (json && json.data) {
// //         rows = [json.data];
// //       } else {
// //         rows = [json];
// //       }

// //       if (!rows || rows.length === 0) {
// //         setStatusMessage("No matching child records verified.");
// //         setStatusType("success");
// //         setAllRows([]);
// //         setFilteredRows([]);
// //         return;
// //       }

// //       rows = rows.map((row) => ({
// //         ...row,
// //         MTCStatus: row.MTCStatus || "Not Registered",
// //         Remarks: row.Remarks || ""
// //       }));

// //       const columnSet: { [key: string]: boolean } = {};
// //       rows.forEach((row: DataRow) => {
// //         for (const key in row) {
// //           if (Object.prototype.hasOwnProperty.call(row, key)) {
// //             columnSet[key] = true;
// //           }
// //         }
// //       });
      
// //       columnSet["MTCStatus"] = true;
// //       columnSet["Remarks"] = true;
      
// //       const columnKeys = Object.keys(columnSet);
// //       setColumns(columnKeys);

// //       const mtcSet = new Set<string>();
// //       rows.forEach((r: DataRow) => {
// //         const name = (r.MtcName || r.mtcName || r.MTCName || "").toString().trim();
// //         if (name) mtcSet.add(name);
// //       });
// //       const sortedMtcNames = Array.from(mtcSet).sort((a, b) => a.localeCompare(b));
// //       setMtcNames(sortedMtcNames);

// //       setAllRows(rows);
// //       setFilteredRows(rows);
// //       setStatusMessage(`Successfully populated ${rows.length} records.`);
// //       setStatusType("success");
// //     } catch (err) {
// //       console.error(err);
// //       const errorMessage = err instanceof Error ? err.message : "Unknown error";
// //       setError(errorMessage);
// //       setStatusMessage("Failed connection protocols.");
// //       setStatusType("error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     loadData();
// //   }, [loadData]);

// //   const applyFilter = useCallback(() => {
// //     if (!allRows || allRows.length === 0) return;

// //     let filtered = allRows;
    
// //     if (selectedMtc) {
// //       filtered = filtered.filter((r: DataRow) => {
// //         const name = (r.MtcName || r.mtcName || r.MTCName || "").toString().trim();
// //         return name === selectedMtc;
// //       });
// //     }
    
// //     if (searchTerm) {
// //       const searchLower = searchTerm.toLowerCase();
// //       filtered = filtered.filter((row: DataRow) => {
// //         return Object.values(row).some(value => 
// //           value && value.toString().toLowerCase().includes(searchLower)
// //         );
// //       });
// //     }
    
// //     setFilteredRows(filtered);
// //     setStatusMessage(
// //       filtered.length !== allRows.length
// //         ? `Showing ${filtered.length} of ${allRows.length} active matching queries.`
// //         : `Showing all available data metrics.`
// //     );
// //   }, [allRows, selectedMtc, searchTerm]);

// //   useEffect(() => {
// //     applyFilter();
// //   }, [applyFilter]);

// //   const handleBack = () => {
// //     window.history.back();
// //   };

// //   // --- NEW: Registration Navigation Handler ---
// //   const handleRegisterClick = (childData: DataRow) => {
// //     // 1. Save the specific child's API data to sessionStorage temporarily
// //     sessionStorage.setItem("pendingRegistrationData", JSON.stringify(childData));
    
// //     // 2. Navigate to your registration form URL
// //     router.push("/mtc-user/dashboard/child-registration/add-child?source=referral");
// //   };

// //   const handleStatusChange = (rowIndex: number, newStatus: string) => {
// //     setStatusUpdates(prev => ({ ...prev, [rowIndex]: newStatus }));
    
// //     const updatedRows = [...filteredRows];
// //     updatedRows[rowIndex] = { ...updatedRows[rowIndex], MTCStatus: newStatus };
// //     setFilteredRows(updatedRows);
    
// //     const originalIndex = allRows.findIndex(row => 
// //       JSON.stringify(row) === JSON.stringify(filteredRows[rowIndex])
// //     );
// //     if (originalIndex !== -1) {
// //       const updatedAllRows = [...allRows];
// //       updatedAllRows[originalIndex] = { ...updatedAllRows[originalIndex], MTCStatus: newStatus };
// //       setAllRows(updatedAllRows);
// //     }
// //   };

// //   const handleRemarkChange = (rowIndex: number, newRemark: string) => {
// //     setRemarks(prev => ({ ...prev, [rowIndex]: newRemark }));
// //   };

// //   const saveRemark = (rowIndex: number) => {
// //     const remarkText = remarks[rowIndex] || "";
    
// //     const updatedRows = [...filteredRows];
// //     updatedRows[rowIndex] = { ...updatedRows[rowIndex], Remarks: remarkText };
// //     setFilteredRows(updatedRows);
    
// //     const originalIndex = allRows.findIndex(row => 
// //       JSON.stringify(row) === JSON.stringify(filteredRows[rowIndex])
// //     );
// //     if (originalIndex !== -1) {
// //       const updatedAllRows = [...allRows];
// //       updatedAllRows[originalIndex] = { ...updatedAllRows[originalIndex], Remarks: remarkText };
// //       setAllRows(updatedAllRows);
// //     }
    
// //     setEditingRemark(null);
// //     setStatusMessage("Logs updated contextually.");
// //     setStatusType("success");
// //   };

// //   const clearFilters = () => {
// //     setSelectedMtc("");
// //     setSearchTerm("");
// //   };

// //   const toggleColumnVisibility = (column: string) => {
// //     setVisibleColumns(prev => {
// //       const newSet = new Set(prev);
// //       if (newSet.has(column)) {
// //         newSet.delete(column);
// //       } else {
// //         newSet.add(column);
// //       }
// //       return newSet;
// //     });
// //   };

// //   const renderMobileCard = (row: DataRow, index: number) => {
// //     const statusVal = statusUpdates[index] !== undefined ? statusUpdates[index] : (row.MTCStatus as string || "Not Registered");
    
// //     return (
// //       <div key={index} className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden hover:shadow-md transition-shadow duration-200">
// //         <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
// //           <div>
// //             <span className="text-xs font-mono text-slate-400 block mb-0.5">#{row.uuidChild?.toString().slice(0, 8) || index + 1}</span>
// //             <h3 className="text-base font-semibold text-slate-800">
// //               {row.NameOfChild || row.Name || row.ChildName || "Unrecorded Identity"}
// //             </h3>
// //           </div>
// //           <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide shadow-xs ${
// //             statusVal === "Registered" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
// //           }`}>
// //             <span className={`w-1.5 h-1.5 rounded-full ${statusVal === "Registered" ? "bg-emerald-500" : "bg-amber-500"}`}></span>
// //             {statusVal}
// //           </span>
// //         </div>
        
// //         <div className="p-4 grid grid-cols-2 gap-x-4 gap-y-3 text-xs border-b border-slate-100 bg-white">
// //           <div>
// //             <span className="text-slate-400 block mb-0.5">Age / Gender</span>
// //             <span className="font-medium text-slate-700">{row.Age || "N/A"} Months • {row.Gender || "N/A"}</span>
// //           </div>
// //           <div>
// //             <span className="text-slate-400 block mb-0.5">Metrics (Wt/Ht)</span>
// //             <span className="font-medium text-slate-700">{row.Weight || "N/A"} kg • {row.Length || "N/A"} cm</span>
// //           </div>
// //           <div className="col-span-2 pt-1 border-t border-slate-50">
// //             <span className="text-slate-400 block mb-0.5">MTC Assignment</span>
// //             <span className="font-medium text-slate-800 flex items-center gap-1">
// //               <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
// //               {row.MtcName || "No Associated Facility"}
// //             </span>
// //           </div>
// //           <div className="col-span-2">
// //             <span className="text-slate-400 block mb-0.5">AWC Details</span>
// //             <span className="text-slate-600 block font-medium">{row.AwcName || "N/A"}</span>
// //             <span className="text-slate-400 text-[11px] block">{row.AwcSevikaName || "N/A"} ({row.AwcSevikaMobileNo || "No Mobile"})</span>
// //           </div>
// //         </div>

// //         <div className="bg-slate-50/50 p-4 space-y-3">
// //           <div>
// //             <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Status Classification</label>
// //             <select
// //               value={statusVal}
// //               onChange={(e) => handleStatusChange(index, e.target.value)}
// //               className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
// //             >
// //               <option value="Registered">Registered</option>
// //               <option value="Not Registered">Not Registered</option>
// //             </select>
// //           </div>
          
// //           <div>
// //             <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Remarks & Observations</label>
// //             {editingRemark === index ? (
// //               <div className="flex gap-1.5">
// //                 <input
// //                   type="text"
// //                   value={remarks[index] !== undefined ? remarks[index] : (row.Remarks as string || "")}
// //                   onChange={(e) => handleRemarkChange(index, e.target.value)}
// //                   className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
// //                   autoFocus
// //                 />
// //                 <button
// //                   onClick={() => saveRemark(index)}
// //                   className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-xs shadow-sm transition-colors"
// //                 >
// //                   Save
// //                 </button>
// //                 <button
// //                   onClick={() => setEditingRemark(null)}
// //                   className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs transition-colors"
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="flex items-start justify-between bg-white rounded-lg border border-slate-200 p-2.5 min-h-[36px]">
// //                 <span className="text-slate-600 text-xs italic">
// //                   {row.Remarks as string || "No descriptive notes logged."}
// //                 </span>
// //                 <button
// //                   onClick={() => {
// //                     setEditingRemark(index);
// //                     setRemarks(prev => ({ ...prev, [index]: row.Remarks as string || "" }));
// //                   }}
// //                   className="text-indigo-600 hover:text-indigo-800 transition-colors p-0.5 ml-2"
// //                 >
// //                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
// //                 </button>
// //               </div>
// //             )}
// //           </div>

// //           {/* NEW: Action Button for Mobile Card */}
// //           <div className="pt-3 mt-2 border-t border-slate-200">
// //             <button 
// //               onClick={() => handleRegisterClick(row)}
// //               className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold tracking-wide shadow-sm transition-colors"
// //             >
// //               Start Registration Form
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased">
// //       {/* Structural Header Banner */}
// //       <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
// //           <div className="flex items-center space-x-4">
// //             <button
// //               onClick={handleBack}
// //               className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200"
// //               aria-label="Navigate backwards"
// //             >
// //               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
// //               </svg>
// //             </button>
// //             <div>
// //               <h1 className="text-lg font-bold text-slate-900 tracking-tight">MTC Referrals</h1>
// //               <p className="text-xs text-slate-400 hidden sm:block">Malnutrition Treatment Center Patient Tracker</p>
// //             </div>
// //           </div>
          
// //           <div className="flex items-center space-x-2">
// //             <button
// //               onClick={() => setFilterPanelOpen(!filterPanelOpen)}
// //               className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border ${
// //                 filterPanelOpen 
// //                   ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-inner" 
// //                   : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-xs"
// //               }`}
// //             >
// //               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
// //               </svg>
// //               <span>{filterPanelOpen ? "Hide Controls" : "Show Management Bar"}</span>
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Main Interactive Interface Block */}
// //       <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
// //         {/* Dynamic Analytics Counter Modules */}
// //         {!loading && allRows.length > 0 && (
// //           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// //             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
// //               <div>
// //                 <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Total System Referrals</span>
// //                 <span className="text-2xl font-extrabold text-slate-900">{summaryStats.total}</span>
// //               </div>
// //               <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
// //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
// //               </div>
// //             </div>
// //             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
// //               <div>
// //                 <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Fully Registered Children</span>
// //                 <span className="text-2xl font-extrabold text-emerald-600">{summaryStats.registered}</span>
// //               </div>
// //               <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
// //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
// //               </div>
// //             </div>
// //             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
// //               <div>
// //                 <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Pending Actions Required</span>
// //                 <span className="text-2xl font-extrabold text-amber-600">{summaryStats.pending}</span>
// //               </div>
// //               <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
// //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Modular Management Panel Card */}
// //         <div className={`bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-300 ${
// //           filterPanelOpen ? "opacity-100 max-h-[1000px] p-4 sm:p-6" : "opacity-0 max-h-0 p-0 overflow-hidden border-none"
// //         }`}>
// //           <div className="flex flex-col gap-5">
// //             <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
// //               {/* Query Actions */}
// //               <div className="sm:col-span-3">
// //                 <button
// //                   onClick={loadData}
// //                   disabled={loading}
// //                   className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-xs hover:bg-indigo-700 disabled:bg-indigo-300 shadow-sm transition-colors cursor-pointer"
// //                 >
// //                   {loading ? (
// //                     <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
// //                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                     </svg>
// //                   ) : (
// //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
// //                   )}
// //                   <span>Refresh Registry</span>
// //                 </button>
// //               </div>

// //               {/* MTC Filter Dropdown */}
// //               <div className="sm:col-span-4">
// //                 <label htmlFor="mtcFilter" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Filter Facilities</label>
// //                 <div className="relative">
// //                   <select
// //                     id="mtcFilter"
// //                     value={selectedMtc}
// //                     onChange={(e) => setSelectedMtc(e.target.value)}
// //                     disabled={loading || mtcNames.length === 0}
// //                     className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none shadow-xs disabled:bg-slate-50"
// //                   >
// //                     <option value="">-- All Diagnostic Facilities --</option>
// //                     {mtcNames.map((name) => (
// //                       <option key={name} value={name}>{name}</option>
// //                     ))}
// //                   </select>
// //                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
// //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Comprehensive String Search */}
// //               <div className="sm:col-span-5">
// //                 <label htmlFor="search" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Omni Search Engine</label>
// //                 <div className="relative">
// //                   <input
// //                     id="search"
// //                     type="text"
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     placeholder="Search by name, district, or child ID..."
// //                     className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-8 py-2 text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
// //                   />
// //                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
// //                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
// //                   </div>
// //                   {searchTerm && (
// //                     <button
// //                       onClick={() => setSearchTerm("")}
// //                       className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-slate-600"
// //                     >
// //                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Layout Customizer Block */}
// //             {windowWidth >= 1024 && (
// //               <div className="border-t border-slate-100 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
// //                 <div className="space-y-2">
// //                   <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Dynamic Column Selection</span>
// //                   <div className="flex flex-wrap gap-1.5">
// //                     {columns.map((col) => (
// //                       <button
// //                         key={col}
// //                         onClick={() => toggleColumnVisibility(col)}
// //                         className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
// //                           visibleColumns.has(col)
// //                             ? "bg-slate-800 text-white shadow-xs"
// //                             : "bg-slate-100 text-slate-600 hover:bg-slate-200"
// //                         }`}
// //                       >
// //                         {col}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div className="shrink-0 space-y-1.5">
// //                   <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider text-left md:text-right">View Type</span>
// //                   <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
// //                     <button
// //                       onClick={() => setViewMode("table")}
// //                       className={`px-3 py-1.5 rounded-md transition-all ${viewMode === "table" ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-500 hover:text-slate-800"}`}
// //                     >
// //                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
// //                     </button>
// //                     <button
// //                       onClick={() => setViewMode("card")}
// //                       className={`px-3 py-1.5 rounded-md transition-all ${viewMode === "card" ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-500 hover:text-slate-800"}`}
// //                     >
// //                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Status System Toast */}
// //         {statusMessage && (
// //           <div className={`p-3.5 rounded-xl text-xs font-medium border flex items-center gap-2.5 shadow-xs transition-all duration-300 ${
// //             statusType === "error" ? "bg-red-50 border-red-200 text-red-700" : statusType === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-indigo-50/70 border-indigo-100 text-indigo-700"
// //           }`}>
// //             <span className={`w-2 h-2 rounded-full shrink-0 ${statusType === "error" ? "bg-red-500 animate-pulse" : statusType === "success" ? "bg-emerald-500" : "bg-indigo-500 animate-pulse"}`}></span>
// //             <div className="flex-1">{statusMessage}</div>
// //             {error && <span className="font-mono text-[11px] opacity-80 border-l border-red-200 pl-2.5">Diagnostic Code: {error}</span>}
// //           </div>
// //         )}

// //         {/* Dynamic Data Content Node */}
// //         <div className="w-full">
// //           {filteredRows.length > 0 ? (
// //             <>
// //               {viewMode === "table" && windowWidth >= 1024 ? (
// //                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
// //                   <div className="overflow-x-auto">
// //                     <table className="w-full border-collapse text-left text-xs text-slate-600">
// //                       <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
// //                         <tr>
// //                           {columns.filter(col => visibleColumns.has(col)).map((col) => (
// //                             <th key={col} className="px-4 py-3.5 font-semibold whitespace-nowrap">{col}</th>
// //                           ))}
// //                           {/* NEW: Action column header */}
// //                           <th className="px-4 py-3.5 font-semibold text-right whitespace-nowrap">Actions</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody className="divide-y divide-slate-200 bg-white">
// //                         {filteredRows.map((row: DataRow, index) => (
// //                           <tr key={index} className="hover:bg-slate-50/80 transition-colors">
// //                             {columns.filter(col => visibleColumns.has(col)).map((col) => (
// //                               <td key={col} className="px-4 py-3 text-slate-700 max-w-[240px] truncate">
// //                                 {col === "MTCStatus" ? (
// //                                   <div className="relative min-w-[130px]">
// //                                     <select
// //                                       value={statusUpdates[index] !== undefined ? statusUpdates[index] : (row[col] as string || "Not Registered")}
// //                                       onChange={(e) => handleStatusChange(index, e.target.value)}
// //                                       className="bg-white border border-slate-200 rounded-md pl-2 pr-7 py-1 text-xs w-full focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none shadow-xs"
// //                                     >
// //                                       <option value="Registered">Registered</option>
// //                                       <option value="Not Registered">Not Registered</option>
// //                                     </select>
// //                                     <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
// //                                       <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
// //                                     </div>
// //                                   </div>
// //                                 ) : col === "Remarks" ? (
// //                                   editingRemark === index ? (
// //                                     <div className="flex items-center gap-1 min-w-[180px]">
// //                                       <input
// //                                         type="text"
// //                                         value={remarks[index] !== undefined ? remarks[index] : (row[col] as string || "")}
// //                                         onChange={(e) => handleRemarkChange(index, e.target.value)}
// //                                         className="px-2 py-1 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 text-xs flex-1"
// //                                         autoFocus
// //                                       />
// //                                       <button
// //                                         onClick={() => saveRemark(index)}
// //                                         className="p-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 shadow-xs"
// //                                       >
// //                                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
// //                                       </button>
// //                                       <button
// //                                         onClick={() => setEditingRemark(null)}
// //                                         className="p-1 bg-slate-200 text-slate-600 rounded hover:bg-slate-300"
// //                                       >
// //                                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
// //                                       </button>
// //                                     </div>
// //                                   ) : (
// //                                     <div className="flex items-center justify-between group min-w-[120px]">
// //                                       <span className="truncate italic text-slate-500">{row[col] as string || "No logs"}</span>
// //                                       <button
// //                                         onClick={() => {
// //                                           setEditingRemark(index);
// //                                           setRemarks(prev => ({ ...prev, [index]: row[col] as string || "" }));
// //                                         }}
// //                                         className="opacity-0 group-hover:opacity-100 text-indigo-600 hover:text-indigo-800 transition-opacity ml-1.5 p-0.5"
// //                                       >
// //                                         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
// //                                       </button>
// //                                     </div>
// //                                   )
// //                                 ) : row[col] !== null && typeof row[col] === "object" ? (
// //                                   <span>{JSON.stringify(row[col])}</span>
// //                                 ) : row[col] !== undefined && row[col] !== null ? (
// //                                   <span className="font-medium text-slate-900">{String(row[col])}</span>
// //                                 ) : (
// //                                   <span className="text-slate-300">—</span>
// //                                 )}
// //                               </td>
// //                             ))}

// //                             {/* NEW: Action column cell for button */}
// //                             <td className="px-4 py-3 text-right">
// //                               <button 
// //                                 onClick={() => handleRegisterClick(row)}
// //                                 className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-bold tracking-wide shadow-sm transition-colors whitespace-nowrap"
// //                               >
// //                                 Register Child
// //                               </button>
// //                             </td>

// //                           </tr>
// //                         ))} 
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                   {filteredRows.map((row: DataRow, index) => renderMobileCard(row, index))}
// //                 </div>
// //               )}
// //             </>
// //           ) : loading ? (
// //             <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-slate-200">
// //               <div className="w-9 h-9 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
// //               <p className="mt-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">Querying Operational Registries</p>
// //             </div>
// //           ) : (
// //             <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-slate-200 shadow-xs px-4">
// //               <div className="p-4 bg-slate-50 text-slate-400 rounded-full mb-4">
// //                 <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-base font-bold text-slate-800 tracking-tight">No Diagnostic Matched Records Found</h3>
// //               <p className="mt-1 text-xs text-slate-400 max-w-xs mx-auto">There are no records satisfying current parameters. Clear active filters or request an API resync.</p>
// //               <button 
// //                 onClick={clearFilters}
// //                 className="mt-4 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-100"
// //               >
// //                 Reset Global Filters
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }


// "use client";

// import { useState, useEffect, useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation"; 

// interface DataRow {
//   [key: string]: string | number | boolean | null | undefined;
// }

// export default function MTCReferredChildListStandalone() {
//   const router = useRouter(); 
//   const [allRows, setAllRows] = useState<DataRow[]>([]);
//   const [filteredRows, setFilteredRows] = useState<DataRow[]>([]);
//   const [columns, setColumns] = useState<string[]>([]);
//   const [mtcNames, setMtcNames] = useState<string[]>([]);
//   const [selectedMtc, setSelectedMtc] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [statusMessage, setStatusMessage] = useState<string>("");
//   const [statusType, setStatusType] = useState<"success" | "error" | "">("");
//   const [statusUpdates, setStatusUpdates] = useState<{[key: number]: string}>({});
//   const [remarks, setRemarks] = useState<{[key: number]: string}>({});
//   const [editingRemark, setEditingRemark] = useState<number | null>(null);
//   const [filterPanelOpen, setFilterPanelOpen] = useState<boolean>(true);
//   const [viewMode, setViewMode] = useState<"table" | "card">("table");
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [windowWidth, setWindowWidth] = useState<number>(0);
  
//   // Added Parent Name fields to default visible columns just in case
//   const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set([
//     "uuidChild", "NameOfChild", "MotherName", "FatherName", "Age", "Gender", "Weight", "Length", 
//     "AwcName", "AwcSevikaName", "AwcSevikaMobileNo", "ProjectName", 
//     "DistrictName", "MtcName", "MtcId", "MTCStatus", "Remarks"
//   ]));

//   // Derived Summary Statistics
//   const summaryStats = useMemo(() => {
//     const total = allRows.length;
//     const registered = allRows.filter(r => r.MTCStatus === "Registered").length;
//     const pending = total - registered;
//     return { total, registered, pending };
//   }, [allRows]);

//   // Track window width for responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//       if (window.innerWidth < 1024) {
//         setViewMode("card");
//       } else {
//         setViewMode("table");
//       }
//     };
    
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const loadData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       setStatusMessage("Syncing records from database...");
//       setStatusType("");

//       const response = await fetch("/api/mtc-proxy", { method: "GET" });

//       if (!response.ok) {
//         let errorMsg = `HTTP ${response.status}`;
//         try {
//           const errData = await response.json();
//           if (errData.error) errorMsg = errData.error;
//         } catch {
//           errorMsg = await response.text();
//         }
//         throw new Error(errorMsg);
//       }

//       const text = await response.text();
//       const match = text.match(/<string[^>]*>([\s\S]*?)<\/string>/i);
//       if (!match) {
//         throw new Error("No payload found matching content definitions.");
//       }

//       const jsonText = match[1].trim();
//       let json;
//       try {
//         json = JSON.parse(jsonText);
//       } catch {
//         throw new Error("Invalid JSON returned by server.");
//       }

//       let rows: DataRow[];
//       if (Array.isArray(json)) {
//         rows = json;
//       } else if (json && Array.isArray(json.data)) {
//         rows = json.data;
//       } else if (json && json.data) {
//         rows = [json.data];
//       } else {
//         rows = [json];
//       }

//       if (!rows || rows.length === 0) {
//         setStatusMessage("No matching child records verified.");
//         setStatusType("success");
//         setAllRows([]);
//         setFilteredRows([]);
//         return;
//       }

//       rows = rows.map((row) => ({
//         ...row,
//         MTCStatus: row.MTCStatus || "Not Registered",
//         Remarks: row.Remarks || ""
//       }));

//       const columnSet: { [key: string]: boolean } = {};
//       rows.forEach((row: DataRow) => {
//         for (const key in row) {
//           if (Object.prototype.hasOwnProperty.call(row, key)) {
//             columnSet[key] = true;
//           }
//         }
//       });
      
//       columnSet["MTCStatus"] = true;
//       columnSet["Remarks"] = true;
      
//       const columnKeys = Object.keys(columnSet);
//       setColumns(columnKeys);

//       const mtcSet = new Set<string>();
//       rows.forEach((r: DataRow) => {
//         const name = (r.MtcName || r.mtcName || r.MTCName || "").toString().trim();
//         if (name) mtcSet.add(name);
//       });
//       const sortedMtcNames = Array.from(mtcSet).sort((a, b) => a.localeCompare(b));
//       setMtcNames(sortedMtcNames);

//       setAllRows(rows);
//       setFilteredRows(rows);
//       setStatusMessage(`Successfully populated ${rows.length} records.`);
//       setStatusType("success");
//     } catch (err) {
//       console.error(err);
//       const errorMessage = err instanceof Error ? err.message : "Unknown error";
//       setError(errorMessage);
//       setStatusMessage("Failed connection protocols.");
//       setStatusType("error");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const applyFilter = useCallback(() => {
//     if (!allRows || allRows.length === 0) return;

//     let filtered = allRows;
    
//     if (selectedMtc) {
//       filtered = filtered.filter((r: DataRow) => {
//         const name = (r.MtcName || r.mtcName || r.MTCName || "").toString().trim();
//         return name === selectedMtc;
//       });
//     }
    
//     if (searchTerm) {
//       const searchLower = searchTerm.toLowerCase();
//       filtered = filtered.filter((row: DataRow) => {
//         return Object.values(row).some(value => 
//           value && value.toString().toLowerCase().includes(searchLower)
//         );
//       });
//     }
    
//     setFilteredRows(filtered);
//     setStatusMessage(
//       filtered.length !== allRows.length
//         ? `Showing ${filtered.length} of ${allRows.length} active matching queries.`
//         : `Showing all available data metrics.`
//     );
//   }, [allRows, selectedMtc, searchTerm]);

//   useEffect(() => {
//     applyFilter();
//   }, [applyFilter]);

//   const handleBack = () => {
//     window.history.back();
//   };

//   const handleRegisterClick = (childData: DataRow) => {
//     sessionStorage.setItem("pendingRegistrationData", JSON.stringify(childData));
//     router.push("/mtc-user/dashboard/child-registration/add-child?source=referral");
//   };

//   const handleStatusChange = (rowIndex: number, newStatus: string) => {
//     setStatusUpdates(prev => ({ ...prev, [rowIndex]: newStatus }));
    
//     const updatedRows = [...filteredRows];
//     updatedRows[rowIndex] = { ...updatedRows[rowIndex], MTCStatus: newStatus };
//     setFilteredRows(updatedRows);
    
//     const originalIndex = allRows.findIndex(row => 
//       JSON.stringify(row) === JSON.stringify(filteredRows[rowIndex])
//     );
//     if (originalIndex !== -1) {
//       const updatedAllRows = [...allRows];
//       updatedAllRows[originalIndex] = { ...updatedAllRows[originalIndex], MTCStatus: newStatus };
//       setAllRows(updatedAllRows);
//     }
//   };

//   const handleRemarkChange = (rowIndex: number, newRemark: string) => {
//     setRemarks(prev => ({ ...prev, [rowIndex]: newRemark }));
//   };

//   const saveRemark = (rowIndex: number) => {
//     const remarkText = remarks[rowIndex] || "";
    
//     const updatedRows = [...filteredRows];
//     updatedRows[rowIndex] = { ...updatedRows[rowIndex], Remarks: remarkText };
//     setFilteredRows(updatedRows);
    
//     const originalIndex = allRows.findIndex(row => 
//       JSON.stringify(row) === JSON.stringify(filteredRows[rowIndex])
//     );
//     if (originalIndex !== -1) {
//       const updatedAllRows = [...allRows];
//       updatedAllRows[originalIndex] = { ...updatedAllRows[originalIndex], Remarks: remarkText };
//       setAllRows(updatedAllRows);
//     }
    
//     setEditingRemark(null);
//     setStatusMessage("Logs updated contextually.");
//     setStatusType("success");
//   };

//   const clearFilters = () => {
//     setSelectedMtc("");
//     setSearchTerm("");
//   };

//   const toggleColumnVisibility = (column: string) => {
//     setVisibleColumns(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(column)) {
//         newSet.delete(column);
//       } else {
//         newSet.add(column);
//       }
//       return newSet;
//     });
//   };

//   // --- REDESIGNED CARD VIEW ---
//   const renderMobileCard = (row: DataRow, index: number) => {
//     const statusVal = statusUpdates[index] !== undefined ? statusUpdates[index] : (row.MTCStatus as string || "Not Registered");
    
//     const childName = (row.NameOfChild || row.Name || row.ChildName || "Unrecorded Identity").toString();
//     const parentName = (row.MotherName || row.FatherName || row.GuardianName || "Not Recorded").toString();
//     const initial = childName.charAt(0).toUpperCase();
    
//     return (
//       <div key={index} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col relative">
//         {/* Accent Top Border */}
//         <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
        
//         <div className="p-5 flex-1">
//           {/* Header Profile */}
//           <div className="flex justify-between items-start mb-5">
//             <div className="flex items-center gap-3.5">
//               <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-xl shrink-0 border-2 border-white shadow-sm">
//                 {initial}
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold text-slate-900 leading-tight">{childName}</h3>
//                 <span className="text-xs font-mono font-medium text-slate-400 mt-0.5 block">ID: #{row.uuidChild?.toString().slice(0, 8) || index + 1}</span>
//               </div>
//             </div>
//             <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-sm border ${
//               statusVal === "Registered" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
//             }`}>
//               <span className={`w-1.5 h-1.5 rounded-full ${statusVal === "Registered" ? "bg-emerald-500" : "bg-amber-500"}`}></span>
//               {statusVal}
//             </span>
//           </div>

//           {/* Dedicated Parent Highlight Section */}
//           <div className="mb-5 bg-slate-50/80 rounded-xl p-3 border border-slate-100 flex items-center gap-3">
//             <div className="p-2 bg-white rounded-lg shadow-sm">
//               <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//               </svg>
//             </div>
//             <div>
//               <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Parent / Guardian</span>
//               <span className="text-sm font-bold text-slate-800">{parentName}</span>
//             </div>
//           </div>
          
//           {/* Vitals Grid (3 Columns) */}
//           <div className="grid grid-cols-3 gap-2 mb-5">
//             <div className="bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/50 text-center">
//               <span className="block text-[10px] text-blue-500 font-bold uppercase mb-1 tracking-wider">Age/Sex</span>
//               <span className="text-sm font-bold text-slate-800">{row.Age || "-"}m • {row.Gender ? (row.Gender as string)[0] : "-"}</span>
//             </div>
//             <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/50 text-center">
//               <span className="block text-[10px] text-emerald-600 font-bold uppercase mb-1 tracking-wider">Weight</span>
//               <span className="text-sm font-bold text-slate-800">{row.Weight || "-"} kg</span>
//             </div>
//             <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100/50 text-center">
//               <span className="block text-[10px] text-purple-600 font-bold uppercase mb-1 tracking-wider">Length</span>
//               <span className="text-sm font-bold text-slate-800">{row.Length || "-"} cm</span>
//             </div>
//           </div>

//           {/* Locations */}
//           <div className="space-y-3.5 px-1">
//             <div className="flex items-start gap-3">
//               <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
//               <div>
//                 <span className="block text-xs font-bold text-slate-800 leading-tight">{row.MtcName || "No Facility Assigned"}</span>
//                 <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">MTC Assignment</span>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
//               <div>
//                 <span className="block text-xs font-bold text-slate-800 leading-tight">{row.AwcName || "N/A AWC"}</span>
//                 <span className="text-[10px] font-medium text-slate-500">Asha: {row.AwcSevikaName || "N/A"} ({row.AwcSevikaMobileNo || "No Mobile"})</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer Area: Actions & Remarks */}
//         <div className="bg-slate-50 border-t border-slate-100 p-4 space-y-3 mt-auto">
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Update Status</label>
//               <select
//                 value={statusVal}
//                 onChange={(e) => handleStatusChange(index, e.target.value)}
//                 className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
//               >
//                 <option value="Registered">Registered</option>
//                 <option value="Not Registered">Not Registered</option>
//               </select>
//             </div>
//             <div className="flex items-end">
//                <button 
//                 onClick={() => handleRegisterClick(row)}
//                 className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-1.5"
//               >
//                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
//                 Register
//               </button>
//             </div>
//           </div>
          
//           <div className="pt-2 border-t border-slate-200/60">
//             {editingRemark === index ? (
//               <div className="flex gap-1.5">
//                 <input
//                   type="text"
//                   value={remarks[index] !== undefined ? remarks[index] : (row.Remarks as string || "")}
//                   onChange={(e) => handleRemarkChange(index, e.target.value)}
//                   className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
//                   autoFocus
//                 />
//                 <button onClick={() => saveRemark(index)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg text-xs shadow-sm transition-colors">
//                   Save
//                 </button>
//                 <button onClick={() => setEditingRemark(null)} className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs transition-colors">
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-start justify-between bg-white rounded-lg border border-slate-200 p-2.5 min-h-[36px] shadow-sm group">
//                 <span className="text-slate-600 text-[11px] font-medium italic">
//                   {row.Remarks as string || "No descriptive notes logged."}
//                 </span>
//                 <button
//                   onClick={() => {
//                     setEditingRemark(index);
//                     setRemarks(prev => ({ ...prev, [index]: row.Remarks as string || "" }));
//                   }}
//                   className="text-slate-400 hover:text-indigo-600 transition-colors p-0.5 ml-2 opacity-0 group-hover:opacity-100"
//                 >
//                   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased">
//       {/* Structural Header Banner */}
//       <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={handleBack}
//               className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//               </svg>
//             </button>
//             <div>
//               <h1 className="text-lg font-bold text-slate-900 tracking-tight">MTC Referrals</h1>
//               <p className="text-xs text-slate-400 hidden sm:block">Malnutrition Treatment Center Patient Tracker</p>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => setFilterPanelOpen(!filterPanelOpen)}
//               className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border ${
//                 filterPanelOpen 
//                   ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-inner" 
//                   : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
//               }`}
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
//               </svg>
//               <span>{filterPanelOpen ? "Hide Controls" : "Show Management Bar"}</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Interactive Interface Block */}
//       <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
//         {/* Dynamic Analytics Counter Modules */}
//         {!loading && allRows.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
//               <div>
//                 <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Total System Referrals</span>
//                 <span className="text-2xl font-extrabold text-slate-900">{summaryStats.total}</span>
//               </div>
//               <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
//               </div>
//             </div>
//             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
//               <div>
//                 <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Fully Registered Children</span>
//                 <span className="text-2xl font-extrabold text-emerald-600">{summaryStats.registered}</span>
//               </div>
//               <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
//               </div>
//             </div>
//             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
//               <div>
//                 <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Pending Actions Required</span>
//                 <span className="text-2xl font-extrabold text-amber-600">{summaryStats.pending}</span>
//               </div>
//               <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Modular Management Panel Card */}
//         <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 ${
//           filterPanelOpen ? "opacity-100 max-h-[1000px] p-4 sm:p-6" : "opacity-0 max-h-0 p-0 overflow-hidden border-none"
//         }`}>
//           <div className="flex flex-col gap-5">
//             <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
//               <div className="sm:col-span-3">
//                 <button
//                   onClick={loadData}
//                   disabled={loading}
//                   className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-xs hover:bg-indigo-700 disabled:bg-indigo-300 shadow-sm transition-colors cursor-pointer"
//                 >
//                   {loading ? (
//                     <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                   ) : (
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
//                   )}
//                   <span>Refresh Registry</span>
//                 </button>
//               </div>

//               <div className="sm:col-span-4">
//                 <label htmlFor="mtcFilter" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Filter Facilities</label>
//                 <div className="relative">
//                   <select
//                     id="mtcFilter"
//                     value={selectedMtc}
//                     onChange={(e) => setSelectedMtc(e.target.value)}
//                     disabled={loading || mtcNames.length === 0}
//                     className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none shadow-sm disabled:bg-slate-50"
//                   >
//                     <option value="">-- All Diagnostic Facilities --</option>
//                     {mtcNames.map((name) => (
//                       <option key={name} value={name}>{name}</option>
//                     ))}
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
//                   </div>
//                 </div>
//               </div>

//               <div className="sm:col-span-5">
//                 <label htmlFor="search" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Omni Search Engine</label>
//                 <div className="relative">
//                   <input
//                     id="search"
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Search by name, district, or child ID..."
//                     className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-8 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
//                   />
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
//                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//                   </div>
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm("")}
//                       className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-slate-600"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {windowWidth >= 1024 && (
//               <div className="border-t border-slate-100 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div className="space-y-2">
//                   <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Dynamic Column Selection</span>
//                   <div className="flex flex-wrap gap-1.5">
//                     {columns.map((col) => (
//                       <button
//                         key={col}
//                         onClick={() => toggleColumnVisibility(col)}
//                         className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
//                           visibleColumns.has(col)
//                             ? "bg-slate-800 text-white shadow-sm"
//                             : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//                         }`}
//                       >
//                         {col}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="shrink-0 space-y-1.5">
//                   <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider text-left md:text-right">View Type</span>
//                   <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
//                     <button
//                       onClick={() => setViewMode("table")}
//                       className={`px-3 py-1.5 rounded-md transition-all ${viewMode === "table" ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-500 hover:text-slate-800"}`}
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
//                     </button>
//                     <button
//                       onClick={() => setViewMode("card")}
//                       className={`px-3 py-1.5 rounded-md transition-all ${viewMode === "card" ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-500 hover:text-slate-800"}`}
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {statusMessage && (
//           <div className={`p-3.5 rounded-xl text-xs font-medium border flex items-center gap-2.5 shadow-sm transition-all duration-300 ${
//             statusType === "error" ? "bg-red-50 border-red-200 text-red-700" : statusType === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-indigo-50/70 border-indigo-100 text-indigo-700"
//           }`}>
//             <span className={`w-2 h-2 rounded-full shrink-0 ${statusType === "error" ? "bg-red-500 animate-pulse" : statusType === "success" ? "bg-emerald-500" : "bg-indigo-500 animate-pulse"}`}></span>
//             <div className="flex-1">{statusMessage}</div>
//             {error && <span className="font-mono text-[11px] opacity-80 border-l border-red-200 pl-2.5">Diagnostic Code: {error}</span>}
//           </div>
//         )}

//         {/* Dynamic Data Content Node */}
//         <div className="w-full">
//           {filteredRows.length > 0 ? (
//             <>
//               {viewMode === "table" && windowWidth >= 1024 ? (
//                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//                   <div className="overflow-x-auto">
//                     <table className="w-full border-collapse text-left text-xs text-slate-600">
//                       <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
//                         <tr>
//                           {columns.filter(col => visibleColumns.has(col)).map((col) => (
//                             <th key={col} className="px-4 py-3.5 font-semibold whitespace-nowrap">{col}</th>
//                           ))}
//                           <th className="px-4 py-3.5 font-semibold text-right whitespace-nowrap">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-slate-200 bg-white">
//                         {filteredRows.map((row: DataRow, index) => (
//                           <tr key={index} className="hover:bg-slate-50/80 transition-colors">
//                             {columns.filter(col => visibleColumns.has(col)).map((col) => (
//                               <td key={col} className="px-4 py-3 text-slate-700 max-w-[240px] truncate">
//                                 {col === "MTCStatus" ? (
//                                   <div className="relative min-w-[130px]">
//                                     <select
//                                       value={statusUpdates[index] !== undefined ? statusUpdates[index] : (row[col] as string || "Not Registered")}
//                                       onChange={(e) => handleStatusChange(index, e.target.value)}
//                                       className="bg-white border border-slate-200 rounded-md pl-2 pr-7 py-1 text-xs w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none shadow-sm"
//                                     >
//                                       <option value="Registered">Registered</option>
//                                       <option value="Not Registered">Not Registered</option>
//                                     </select>
//                                     <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
//                                       <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
//                                     </div>
//                                   </div>
//                                 ) : col === "Remarks" ? (
//                                   editingRemark === index ? (
//                                     <div className="flex items-center gap-1 min-w-[180px]">
//                                       <input
//                                         type="text"
//                                         value={remarks[index] !== undefined ? remarks[index] : (row[col] as string || "")}
//                                         onChange={(e) => handleRemarkChange(index, e.target.value)}
//                                         className="px-2 py-1 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs flex-1"
//                                         autoFocus
//                                       />
//                                       <button onClick={() => saveRemark(index)} className="p-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 shadow-sm">
//                                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
//                                       </button>
//                                       <button onClick={() => setEditingRemark(null)} className="p-1 bg-slate-200 text-slate-600 rounded hover:bg-slate-300">
//                                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
//                                       </button>
//                                     </div>
//                                   ) : (
//                                     <div className="flex items-center justify-between group min-w-[120px]">
//                                       <span className="truncate italic text-slate-500">{row[col] as string || "No logs"}</span>
//                                       <button
//                                         onClick={() => {
//                                           setEditingRemark(index);
//                                           setRemarks(prev => ({ ...prev, [index]: row[col] as string || "" }));
//                                         }}
//                                         className="opacity-0 group-hover:opacity-100 text-indigo-600 hover:text-indigo-800 transition-opacity ml-1.5 p-0.5"
//                                       >
//                                         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
//                                       </button>
//                                     </div>
//                                   )
//                                 ) : row[col] !== null && typeof row[col] === "object" ? (
//                                   <span>{JSON.stringify(row[col])}</span>
//                                 ) : row[col] !== undefined && row[col] !== null ? (
//                                   <span className="font-medium text-slate-900">{String(row[col])}</span>
//                                 ) : (
//                                   <span className="text-slate-300">—</span>
//                                 )}
//                               </td>
//                             ))}

//                             <td className="px-4 py-3 text-right">
//                               <button 
//                                 onClick={() => handleRegisterClick(row)}
//                                 className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-bold tracking-wide shadow-sm transition-colors whitespace-nowrap"
//                               >
//                                 Register Child
//                               </button>
//                             </td>
//                           </tr>
//                         ))} 
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {filteredRows.map((row: DataRow, index) => renderMobileCard(row, index))}
//                 </div>
//               )}
//             </>
//           ) : loading ? (
//             <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-slate-200">
//               <div className="w-9 h-9 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//               <p className="mt-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">Querying Operational Registries</p>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-slate-200 shadow-sm px-4">
//               <div className="p-4 bg-slate-50 text-slate-400 rounded-full mb-4">
//                 <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <h3 className="text-base font-bold text-slate-800 tracking-tight">No Diagnostic Matched Records Found</h3>
//               <p className="mt-1 text-xs text-slate-400 max-w-xs mx-auto">There are no records satisfying current parameters. Clear active filters or request an API resync.</p>
//               <button 
//                 onClick={clearFilters}
//                 className="mt-4 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-100"
//               >
//                 Reset Global Filters
//               </button>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }


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