// // File: E:\malnutrition-treatment-center\my-app\app\mtc-user\dashboard\Samar\referred-children\standalone.tsx
// "use client";

// import { useState, useEffect, useCallback } from "react";

// interface DataRow {
//   [key: string]: string | number | boolean | null | undefined;
// }

// export default function MTCReferredChildListStandalone() {
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

//   useEffect(() => {
//     loadData();
//   }, []);

//   const applyFilter = useCallback(() => {
//     if (!allRows || allRows.length === 0) return;

//     if (!selectedMtc) {
//       setFilteredRows(allRows);
//       setStatusMessage(`Loaded ${allRows.length} record(s).`);
//     } else {
//       const filtered = allRows.filter((r: DataRow) => {
//         const name = (r.MtcName || r.mtcName || r.MTCName || "").toString().trim();
//         return name === selectedMtc;
//       });
//       setFilteredRows(filtered);
//       setStatusMessage(
//         `Loaded ${filtered.length} record(s) (filtered from ${allRows.length}).`
//       );
//     }
//   }, [allRows, selectedMtc]);

//   useEffect(() => {
//     applyFilter();
//   }, [applyFilter]);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       setStatusMessage("Loading data...");
//       setStatusType("");

//       const response = await fetch("/api/mtc-proxy", { method: "GET" });

//       if (!response.ok) {
//         const textErr = await response.text();
//         throw new Error(`HTTP ${response.status}: ${textErr}`);
//       }

//       const text = await response.text();

//       // Extract JSON string from XML <string>...</string>
//       const match = text.match(/<string[^>]*>([\s\S]*?)<\/string>/i);
//       if (!match) {
//         throw new Error("No JSON string found inside XML <string>.");
//       }

//       const jsonText = match[1].trim();
//       let json;
//       try {
//         json = JSON.parse(jsonText);
//       } catch {
//         console.error("JSON parse error. jsonText was:", jsonText);
//         throw new Error("Invalid JSON returned by server.");
//       }

//       // Expected structure: { status: "success", data: [ ... ] }
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
//         setStatusMessage("No records found.");
//         setStatusType("success");
//         setAllRows([]);
//         setFilteredRows([]);
//         return;
//       }

//       // Add default values for status and remarks if they don't exist
//       rows = rows.map((row, index) => ({
//         ...row,
//         MTCStatus: row.MTCStatus || "Not Registered",
//         Remarks: row.Remarks || ""
//       }));

//       // Determine all columns
//       const columnSet: { [key: string]: boolean } = {};
//       rows.forEach((row: DataRow) => {
//         for (const key in row) {
//           if (Object.prototype.hasOwnProperty.call(row, key)) {
//             columnSet[key] = true;
//           }
//         }
//       });
      
//       // Ensure MTCStatus and Remarks are included in columns
//       columnSet["MTCStatus"] = true;
//       columnSet["Remarks"] = true;
      
//       const columnKeys = Object.keys(columnSet);
//       setColumns(columnKeys);

//       // Extract MTC names for filter
//       const mtcSet = new Set<string>();
//       rows.forEach((r: DataRow) => {
//         const name = (r.MtcName || r.mtcName || r.MTCName || "").toString().trim();
//         if (name) mtcSet.add(name);
//       });
//       const sortedMtcNames = Array.from(mtcSet).sort((a, b) => a.localeCompare(b));
//       setMtcNames(sortedMtcNames);

//       setAllRows(rows);
//       setFilteredRows(rows);
//       setStatusMessage(`Loaded ${rows.length} record(s).`);
//       setStatusType("success");
//     } catch (err) {
//       console.error(err);
//       const errorMessage = err instanceof Error ? err.message : "Unknown error";
//       setError(errorMessage);
//       setStatusMessage(`Error: ${errorMessage}`);
//       setStatusType("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     window.history.back();
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleStatusChange = (rowIndex: number, newStatus: string) => {
//     setStatusUpdates(prev => ({ ...prev, [rowIndex]: newStatus }));
    
//     // Update the filtered rows
//     const updatedRows = [...filteredRows];
//     updatedRows[rowIndex] = { ...updatedRows[rowIndex], MTCStatus: newStatus };
//     setFilteredRows(updatedRows);
    
//     // Also update the original data
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
    
//     // Update the filtered rows
//     const updatedRows = [...filteredRows];
//     updatedRows[rowIndex] = { ...updatedRows[rowIndex], Remarks: remarkText };
//     setFilteredRows(updatedRows);
    
//     // Also update the original data
//     const originalIndex = allRows.findIndex(row => 
//       JSON.stringify(row) === JSON.stringify(filteredRows[rowIndex])
//     );
//     if (originalIndex !== -1) {
//       const updatedAllRows = [...allRows];
//       updatedAllRows[originalIndex] = { ...updatedAllRows[originalIndex], Remarks: remarkText };
//       setAllRows(updatedAllRows);
//     }
    
//     setEditingRemark(null);
//     setStatusMessage("Remark saved successfully.");
//     setStatusType("success");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-full mx-auto">
//         {/* Header with navigation controls */}
//         <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={handleBack}
//               className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//               </svg>
//               Back
//             </button>
//             <h1 className="text-2xl font-bold text-gray-800">MTC Referred Child List</h1>
//           </div>
//           <button
//             onClick={handlePrint}
//             className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
//           >
//             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
//             </svg>
//             Print
//           </button>
//         </div>

//         {/* Controls section */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <div className="flex flex-wrap items-center gap-4 mb-4">
//             <button
//               onClick={loadData}
//               disabled={loading}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
//             >
//               {loading ? "Loading..." : "Refresh Data"}
//             </button>

//             <div className="flex items-center">
//               <label htmlFor="mtcFilter" className="mr-2 text-gray-700">
//                 Filter by MTC:
//               </label>
//               <select
//                 id="mtcFilter"
//                 value={selectedMtc}
//                 onChange={(e) => setSelectedMtc(e.target.value)}
//                 disabled={loading || mtcNames.length === 0}
//                 className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">-- All MTCs --</option>
//                 {mtcNames.map((name) => (
//                   <option key={name} value={name}>
//                     {name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div
//             className={`mb-4 text-sm ${
//               statusType === "error" ? "text-red-600" : statusType === "success" ? "text-green-600" : "text-gray-600"
//             }`}
//           >
//             {statusMessage}
//           </div>

//           {error ? (
//             <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
//               <div className="flex">
//                 <div className="shrink-0">
//                   <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-red-700">
//                     <strong>Error:</strong> {error}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ) : null}
//         </div>

//         {/* Data table */}
//         {filteredRows.length > 0 ? (
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     {columns.map((col) => (
//                       <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         {col}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredRows.map((row: DataRow, index) => (
//                     <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                       {columns.map((col) => (
//                         <td key={col} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                           {col === "MTCStatus" ? (
//                             <select
//                               value={statusUpdates[index] !== undefined ? statusUpdates[index] : (row[col] as string || "Not Registered")}
//                               onChange={(e) => handleStatusChange(index, e.target.value)}
//                               className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                             >
//                               <option value="Registered">Registered</option>
//                               <option value="Not Registered">Not Registered</option>
//                             </select>
//                           ) : col === "Remarks" ? (
//                             editingRemark === index ? (
//                               <div className="flex items-center">
//                                 <input
//                                   type="text"
//                                   value={remarks[index] !== undefined ? remarks[index] : (row[col] as string || "")}
//                                   onChange={(e) => handleRemarkChange(index, e.target.value)}
//                                   className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm flex-1"
//                                   autoFocus
//                                 />
//                                 <button
//                                   onClick={() => saveRemark(index)}
//                                   className="ml-2 px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
//                                 >
//                                   Save
//                                 </button>
//                                 <button
//                                   onClick={() => setEditingRemark(null)}
//                                   className="ml-1 px-2 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-xs"
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             ) : (
//                               <div className="flex items-center">
//                                 <span>{row[col] as string || ""}</span>
//                                 <button
//                                   onClick={() => {
//                                     setEditingRemark(index);
//                                     setRemarks(prev => ({ ...prev, [index]: row[col] as string || "" }));
//                                   }}
//                                   className="ml-2 text-blue-600 hover:text-blue-800"
//                                 >
//                                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                                   </svg>
//                                 </button>
//                               </div>
//                             )
//                           ) : row[col] !== null && typeof row[col] === "object" ? (
//                             JSON.stringify(row[col])
//                           ) : row[col] !== undefined && row[col] !== null ? (
//                             String(row[col])
//                           ) : (
//                             ""
//                           )}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ) : loading ? (
//           <div className="bg-white rounded-lg shadow p-8 text-center">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <p className="mt-2 text-gray-600">Loading data...</p>
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow p-8 text-center">
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             <h3 className="mt-2 text-sm font-medium text-gray-900">No data to display</h3>
//             <p className="mt-1 text-sm text-gray-500">Try refreshing the data or adjusting your filters.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// 
"use client";

import { useState, useEffect, useCallback } from "react";

interface DataRow {
  [key: string]: string | number | boolean | null | undefined;
}

export default function MTCReferredChildListStandalone() {
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
    "uuidChild", "NameOfChild", "Age", "Gender", "Weight", "Length", 
    "AwcName", "AwcSevikaName", "AwcSevikaMobileNo", "ProjectName", 
    "DistrictName", "MtcName", "MtcId", "MTCStatus", "Remarks"
  ]));

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Automatically switch to card view on smaller screens
      if (window.innerWidth < 768) {
        setViewMode("card");
      } else {
        setViewMode("table");
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Wrap loadData in useCallback to prevent it from changing on every render
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setStatusMessage("Loading data...");
      setStatusType("");

      const response = await fetch("/api/mtc-proxy", { method: "GET" });

      if (!response.ok) {
        const textErr = await response.text();
        throw new Error(`HTTP ${response.status}: ${textErr}`);
      }

      const text = await response.text();

      // Extract JSON string from XML <string>...</string>
      const match = text.match(/<string[^>]*>([\s\S]*?)<\/string>/i);
      if (!match) {
        throw new Error("No JSON string found inside XML <string>.");
      }

      const jsonText = match[1].trim();
      let json;
      try {
        json = JSON.parse(jsonText);
      } catch {
        console.error("JSON parse error. jsonText was:", jsonText);
        throw new Error("Invalid JSON returned by server.");
      }

      // Expected structure: { status: "success", data: [ ... ] }
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
        setStatusMessage("No records found.");
        setStatusType("success");
        setAllRows([]);
        setFilteredRows([]);
        return;
      }

      // Add default values for status and remarks if they don't exist
      rows = rows.map((row) => ({
        ...row,
        MTCStatus: row.MTCStatus || "Not Registered",
        Remarks: row.Remarks || ""
      }));

      // Determine all columns
      const columnSet: { [key: string]: boolean } = {};
      rows.forEach((row: DataRow) => {
        for (const key in row) {
          if (Object.prototype.hasOwnProperty.call(row, key)) {
            columnSet[key] = true;
          }
        }
      });
      
      // Ensure MTCStatus and Remarks are included in columns
      columnSet["MTCStatus"] = true;
      columnSet["Remarks"] = true;
      
      const columnKeys = Object.keys(columnSet);
      setColumns(columnKeys);

      // Extract MTC names for filter
      const mtcSet = new Set<string>();
      rows.forEach((r: DataRow) => {
        const name = (r.MtcName || r.mtcName || r.MTCName || "").toString().trim();
        if (name) mtcSet.add(name);
      });
      const sortedMtcNames = Array.from(mtcSet).sort((a, b) => a.localeCompare(b));
      setMtcNames(sortedMtcNames);

      setAllRows(rows);
      setFilteredRows(rows);
      setStatusMessage(`Loaded ${rows.length} record(s).`);
      setStatusType("success");
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      setStatusMessage(`Error: ${errorMessage}`);
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Now include loadData in the dependency array
  useEffect(() => {
    loadData();
  }, [loadData]);

  const applyFilter = useCallback(() => {
    if (!allRows || allRows.length === 0) return;

    let filtered = allRows;
    
    // Apply MTC filter
    if (selectedMtc) {
      filtered = filtered.filter((r: DataRow) => {
        const name = (r.MtcName || r.mtcName || r.MTCName || "").toString().trim();
        return name === selectedMtc;
      });
    }
    
    // Apply search filter
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
        ? `Showing ${filtered.length} of ${allRows.length} record(s).`
        : `Loaded ${filtered.length} record(s).`
    );
  }, [allRows, selectedMtc, searchTerm]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  const handleBack = () => {
    window.history.back();
  };

  const handleStatusChange = (rowIndex: number, newStatus: string) => {
    setStatusUpdates(prev => ({ ...prev, [rowIndex]: newStatus }));
    
    // Update the filtered rows
    const updatedRows = [...filteredRows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], MTCStatus: newStatus };
    setFilteredRows(updatedRows);
    
    // Also update the original data
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
    
    // Update the filtered rows
    const updatedRows = [...filteredRows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], Remarks: remarkText };
    setFilteredRows(updatedRows);
    
    // Also update the original data
    const originalIndex = allRows.findIndex(row => 
      JSON.stringify(row) === JSON.stringify(filteredRows[rowIndex])
    );
    if (originalIndex !== -1) {
      const updatedAllRows = [...allRows];
      updatedAllRows[originalIndex] = { ...updatedAllRows[originalIndex], Remarks: remarkText };
      setAllRows(updatedAllRows);
    }
    
    setEditingRemark(null);
    setStatusMessage("Remark saved successfully.");
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

  const renderMobileCard = (row: DataRow, index: number) => {
    return (
      <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
        <div className="justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800">
            {row.NameOfChild || row.Name || row.ChildName || `Record ${index + 1}`}
          </h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            (statusUpdates[index] !== undefined ? statusUpdates[index] : (row.MTCStatus as string)) === "Registered"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}>
            {statusUpdates[index] !== undefined ? statusUpdates[index] : (row.MTCStatus as string || "Not Registered")}
          </span>
        </div>
        
        <div className="space-y-2">
          {columns.map((col) => {
            if (col === "MTCStatus" || col === "Remarks") return null;
            
            return (
              <div key={col} className="justify-between">
                <span className="text-sm font-medium text-gray-500">{col}:</span>
                <span className="text-sm text-gray-900">
                  {row[col] !== null && typeof row[col] === "object"
                    ? JSON.stringify(row[col])
                    : row[col] !== undefined && row[col] !== null
                    ? String(row[col])
                    : ""}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="mb-3">
            <label className="text-sm font-medium text-gray-500 block mb-1">Status:</label>
            <select
              value={statusUpdates[index] !== undefined ? statusUpdates[index] : (row.MTCStatus as string || "Not Registered")}
              onChange={(e) => handleStatusChange(index, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="Registered">Registered</option>
              <option value="Not Registered">Not Registered</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500 block mb-1">Remarks:</label>
            {editingRemark === index ? (
              <div className="items-center">
                <input
                  type="text"
                  value={remarks[index] !== undefined ? remarks[index] : (row.Remarks as string || "")}
                  onChange={(e) => handleRemarkChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  autoFocus
                />
                <button
                  onClick={() => saveRemark(index)}
                  className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingRemark(null)}
                  className="ml-1 px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="items-center">
                <span className="text-sm text-gray-900 flex-1">{row.Remarks as string || ""}</span>
                <button
                  onClick={() => {
                    setEditingRemark(index);
                    setRemarks(prev => ({ ...prev, [index]: row.Remarks as string || "" }));
                  }}
                  className="ml-2 p-1 text-blue-600 hover:text-blue-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="items-center justify-between">
            <div className="items-center">
              <button
                onClick={handleBack}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors mr-4"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">MTC Referred Child List</h1>
            </div>
            
            <div className="items-center space-x-2">
              <button
                onClick={() => setFilterPanelOpen(!filterPanelOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Panel - Top */}
      <div className={`${filterPanelOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300 ease-in-out bg-linear-to-b from-indigo-50 to-white shadow-md z-30`}>
        <div className="p-4 sm:p-6">
          <div className="justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-indigo-800 items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </h2>
            <button
              onClick={() => setFilterPanelOpen(false)}
              className="p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Refresh Button */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
              <button
                onClick={loadData}
                disabled={loading}
                className="w-full px-4 py-2.5 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:from-indigo-300 disabled:to-purple-400 transition-all duration-200 justify-center shadow-md"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Data
                  </>
                )}
              </button>
            </div>
            
            {/* MTC Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
              <label htmlFor="mtcFilter" className="block text-sm font-medium text-gray-700 mb-2 items-center">
                <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Filter by MTC
              </label>
              <select
                id="mtcFilter"
                value={selectedMtc}
                onChange={(e) => setSelectedMtc(e.target.value)}
                disabled={loading || mtcNames.length === 0}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                <option value="">-- All MTCs --</option>
                {mtcNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Search Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2 items-center">
                <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search records..."
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 items-center pr-3"
                  >
                    <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            {/* Clear Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
              <button
                onClick={clearFilters}
                disabled={!selectedMtc && !searchTerm}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 transition-colors justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            </div>
          </div>
          
          {/* Column Visibility Toggle */}
          {windowWidth >= 768 && (
            <div className="mt-4 bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
              <label className="block text-sm font-medium text-gray-700 mb-3 items-center">
                <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                Column Visibility
              </label>
              <div className="flex-wrap gap-2">
                {columns.map((col) => (
                  <button
                    key={col}
                    onClick={() => toggleColumnVisibility(col)}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${
                      visibleColumns.has(col)
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* View Mode Toggle */}
          {windowWidth >= 768 && (
            <div className="mt-4 bg-white rounded-lg shadow-sm p-4 border border-indigo-100">
              <label className="block text-sm font-medium text-gray-700 mb-3 items-center">
                <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                View Mode
              </label>
              <div className="rounded-md overflow-hidden shadow-sm max-w-xs">
                <button
                  onClick={() => setViewMode("table")}
                  className={`flex-1 px-3 py-2 transition-all ${
                    viewMode === "table"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("card")}
                  className={`flex-1 px-3 py-2 transition-all ${
                    viewMode === "card"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {/* Status Messages */}
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-indigo-100">
            <div className={`text-sm ${
              statusType === "error" ? "text-red-600" : statusType === "success" ? "text-green-600" : "text-gray-600"
            }`}>
              {statusMessage}
            </div>
            
            {error && (
              <div className="mt-2 bg-red-50 border-l-4 border-red-500 p-3 rounded">
                <div className="shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    <strong>Error:</strong> {error}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-4 sm:p-6 lg:p-8">
          {filteredRows.length > 0 ? (
            <>
              {viewMode === "table" && windowWidth >= 768 ? (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-xs">
                      <thead className="bg-gray-50">
                        <tr>
                          {columns.filter(col => visibleColumns.has(col)).map((col) => (
                            <th key={col} className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredRows.map((row: DataRow, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            {columns.filter(col => visibleColumns.has(col)).map((col) => (
                              <td key={col} className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
                                {col === "MTCStatus" ? (
                                  <select
                                    value={statusUpdates[index] !== undefined ? statusUpdates[index] : (row[col] as string || "Not Registered")}
                                    onChange={(e) => handleStatusChange(index, e.target.value)}
                                    className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs w-full"
                                  >
                                    <option value="Registered">Registered</option>
                                    <option value="Not Registered">Not Registered</option>
                                  </select>
                                ) : col === "Remarks" ? (
                                  editingRemark === index ? (
                                    <div className="items-center">
                                      <input
                                        type="text"
                                        value={remarks[index] !== undefined ? remarks[index] : (row[col] as string || "")}
                                        onChange={(e) => handleRemarkChange(index, e.target.value)}
                                        className="px-1 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs flex-1 w-20"
                                        autoFocus
                                      />
                                      <button
                                        onClick={() => saveRemark(index)}
                                        className="ml-1 px-1 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                                      >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                      </button>
                                      <button
                                        onClick={() => setEditingRemark(null)}
                                        className="ml-1 px-1 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-xs"
                                      >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="items-center">
                                      <span className="truncate max-w-20">{row[col] as string || ""}</span>
                                      <button
                                        onClick={() => {
                                          setEditingRemark(index);
                                          setRemarks(prev => ({ ...prev, [index]: row[col] as string || "" }));
                                        }}
                                        className="ml-1 text-blue-600 hover:text-blue-800"
                                      >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                      </button>
                                    </div>
                                  )
                                ) : row[col] !== null && typeof row[col] === "object" ? (
                                  <span className="truncate max-w-20">{JSON.stringify(row[col])}</span>
                                ) : row[col] !== undefined && row[col] !== null ? (
                                  <span className="truncate max-w-20">{String(row[col])}</span>
                                ) : (
                                  ""
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRows.map((row: DataRow, index) => renderMobileCard(row, index))}
                </div>
              )}
            </>
          ) : loading ? (
            <div className="flex-col items-center justify-center h-64">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading data...</p>
            </div>
          ) : (
            <div className="flex-col items-center justify-center h-64 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No data to display</h3>
              <p className="mt-1 text-sm text-gray-500">Try refreshing the data or adjusting your filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}