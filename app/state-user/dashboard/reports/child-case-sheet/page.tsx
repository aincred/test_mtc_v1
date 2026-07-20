"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Search as SearchIcon, FileDown } from "lucide-react";

// Mock District Data
const DISTRICTS = [
  { id: "1", name: "BOKARO" }, { id: "2", name: "CHATRA" }, { id: "16", name: "DEOGHAR" },
  { id: "4", name: "DHANBAD" }, { id: "17", name: "DUMKA" }, { id: "22", name: "EAST SINGHBHUM" },
  { id: "14", name: "GARHWA" }, { id: "3", name: "GIRIDIH" }, { id: "18", name: "GODDA" },
  { id: "9", name: "GUMLA" }, { id: "6", name: "HAZARIBAGH" }, { id: "19", name: "JAMTARA" },
  { id: "10", name: "KHUNTI" }, { id: "7", name: "KODERMA" }, { id: "15", name: "LATEHAR" },
  { id: "11", name: "LOHARDAGA" }, { id: "20", name: "PAKUR" }, { id: "13", name: "PALAMU" },
  { id: "5", name: "RAMGARH" }, { id: "8", name: "RANCHI" }, { id: "21", name: "SAHIBGANJ" },
  { id: "23", name: "SERAIKELA" }, { id: "12", name: "SIMDEGA" }, { id: "24", name: "WEST SINGHBHUM" },
];

// Mock Table Data based on HTML
const INITIAL_TABLE_DATA = [
  { recordNo: "561834", samNo: "JH/LAT/MAH/1114", childName: "CHANDRKANT Ahir", parentName: "LALITA Kumari", dob: "18-Nov-2024", admWeight: "6.50", admHeight: "72.00" },
  { recordNo: "561721", samNo: "JH/KOD/STG/1091", childName: "Khushi Kumari", parentName: "Khushboo Devi", dob: "28-Aug-2023", admWeight: "7.31", admHeight: "79.00" },
  { recordNo: "561657", samNo: "JH/RNC/BUN/1512", childName: "Guriya munda", parentName: "Bhagyarathi kumari", dob: "08-Mar-2025", admWeight: "5.90", admHeight: "69.00" },
  { recordNo: "562015", samNo: "JH/GUM/GUM/2530", childName: "Hansh Kumar Lohra", parentName: "Sunita Devi", dob: "29-Mar-2025", admWeight: "4.56", admHeight: "59.50" },
  { recordNo: "561669", samNo: "JH/WSB/CKP/2761", childName: "Prakash Sundi", parentName: "Kunti Sundi", dob: "09-Dec-2025", admWeight: "2.19", admHeight: "48.00" },
  { recordNo: "561671", samNo: "JH/DNB/TUN/1497", childName: "Anjali Kumari", parentName: "Anita devi", dob: "05-May-2024", admWeight: "6.40", admHeight: "70.00" },
  { recordNo: "561700", samNo: "JH/SIM/BAN/0999", childName: "Raha Praveen", parentName: "Radha kumari", dob: "30-Sep-2024", admWeight: "7.36", admHeight: "77.00" },
  { recordNo: "563629", samNo: "JH/PAL/PNK/0832", childName: "Prince Kumar", parentName: "Mithun Kumar Sharma", dob: "11-Oct-2025", admWeight: "7.80", admHeight: "77.00" },
  { recordNo: "562253", samNo: "JH/GOD/BOA/1029", childName: "Tasu Hembrom", parentName: "Mari soren", dob: "07-Nov-2021", admWeight: "9.10", admHeight: "88.00" },
  { recordNo: "562254", samNo: "JH/GOD/BOA/1030", childName: "Nitya Kumari", parentName: "Samoli devi", dob: "13-Sep-2022", admWeight: "9.50", admHeight: "90.00" },
];

export default function ChildCaseSheet() {
  // Form State
  const [fromDate, setFromDate] = useState<string>("2026-04-10");
  const [toDate, setToDate] = useState<string>("2026-04-10");
  const [recordNo, setRecordNo] = useState<string>("");
  const [samNo, setSamNo] = useState<string>("");
  const [childName, setChildName] = useState<string>("");
  
  // Dropdown States
  const [district, setDistrict] = useState<string>("");
  const [mtc, setMtc] = useState<string>("");
  const [mtcOptions, setMtcOptions] = useState<{id: string, name: string}[]>([]);

  // Table & Pagination State
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock dependent dropdown loading
  useEffect(() => {
    if (district) {
      setMtcOptions([
        { id: "1", name: `MTC Center A (Dist ${district})` },
        { id: "2", name: `MTC Center B (Dist ${district})` }
      ]);
    } else {
      setMtcOptions([]);
      setMtc("");
    }
  }, [district]);

  // Handlers
  const handleRecordNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/\D/g, '');
    setRecordNo(sanitizedValue);
  };

  const handleSearchClick = () => {
    const payload = { fromDate, toDate, recordNo, samNo, childName, district, mtc };
    console.log("Searching Child Registration List with payload:", payload);
  };

  const handleSelectReport = (recId: string) => {
    console.log("Loading Child SAM Report for Record ID:", recId);
  };

  // Filter Data
  const filteredData = INITIAL_TABLE_DATA.filter((item) =>
    item.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.samNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.recordNo.includes(searchQuery)
  );

  // Pagination Logic
  const totalEntries: number = 1680; // Hardcoded to match HTML snapshot
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(0, entriesPerPage); // Simplified for mock data

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full mt-8 relative">
      {/* Outer Card with Shadow */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
        {/* Card Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
            Child Case Sheet
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-4 md:p-6 text-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 items-end mb-6">
            
            {/* From Date */}
            <div className="flex flex-col gap-1">
              <label htmlFor="txt_FromDate" className="font-medium text-gray-700">From Date</label>
              <div className="relative">
                <input
                  id="txt_FromDate"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring--[#0B918C] focus:border-[#0B918C] h-[38px]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <Calendar size={16} />
                </div>
              </div>
            </div>

            {/* To Date */}
            <div className="flex flex-col gap-1">
              <label htmlFor="txt_ToDate" className="font-medium text-gray-700">To Date</label>
              <div className="relative">
                <input
                  id="txt_ToDate"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring--[#0B918C] focus:border-[#0B918C] h-[38px]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <Calendar size={16} />
                </div>
              </div>
            </div>

            {/* Record No */}
            <div className="flex flex-col gap-1">
              <label htmlFor="txt_Record" className="font-medium text-gray-700">Record No</label>
              <input
                id="txt_Record"
                type="text"
                value={recordNo}
                onChange={handleRecordNoChange}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring--[#0B918C] focus:border-[#0B918C] h-[38px]"
              />
            </div>

            {/* SAM Number */}
            <div className="flex flex-col gap-1">
              <label htmlFor="txt_SamNo" className="font-medium text-gray-700">SAM Number</label>
              <input
                id="txt_SamNo"
                type="text"
                value={samNo}
                onChange={(e) => setSamNo(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring--[#0B918C] focus:border-[#0B918C] h-[38px]"
              />
            </div>

            {/* Child Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="txt_Name" className="font-medium text-gray-700">Child Name</label>
              <input
                id="txt_Name"
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring--[#0B918C] focus:border-[#0B918C] h-[38px]"
              />
            </div>

            {/* District Dropdown */}
            <div className="flex flex-col gap-1">
              <label htmlFor="ddl_District" className="font-medium text-gray-700">District</label>
              <select
                id="ddl_District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring--[#0B918C] focus:border-[#0B918C] h-[38px]"
              >
                <option value="">Select</option>
                {DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* MTC Dropdown */}
            <div className="flex flex-col gap-1">
              <label htmlFor="ddl_Mtc" className="font-medium text-gray-700">MTC</label>
              <select
                id="ddl_Mtc"
                value={mtc}
                onChange={(e) => setMtc(e.target.value)}
                disabled={mtcOptions.length === 0}
                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring--[#0B918C] focus:border-[#0B918C] h-[38px] disabled:bg-gray-100 disabled:text-gray-400"
              >
                <option value="">Select</option>
                {mtcOptions.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Search Button Area */}
          <div className="flex justify-start mb-6">
            <button
              type="button"
              onClick={handleSearchClick}
              className="inline-flex justify-center items-center gap-2 px-6 py-2 border border-[#0B918C] text-sm font-medium rounded-md text-[#0B918C] bg-white hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B918C] h-[38px]"
            >
              <SearchIcon size={16} />
              Search
            </button>
          </div>

          <div className="w-full h-px bg-gray-200 mb-6"></div>

          {/* Child Registration List Section */}
          <div id="div_ChildRegList">
            
            <div className="text-center mb-6 flex flex-col items-center gap-2">
              <h5 className="text-[1.1rem] font-semibold text-[#026158]">
                Download Child Case Sheet
              </h5>
              <div className="w-16 h-1 bg-[#0B918C] rounded-full"></div>
            </div>
            
            {/* Table Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <span>Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>entries</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label htmlFor="search" className="text-gray-700 whitespace-nowrap">Search:</label>
                <input
                  id="search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-64 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-[#0B918C]"
                />
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-700">
                    <th className="py-3 px-3 font-semibold text-center border-r border-gray-200 w-[50px]">S.No</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Record No</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">SAM Number</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Child Name</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Parent Name</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Date Of Birth</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Adm Weight</th>
                    <th className="py-3 px-3 font-semibold border-r border-gray-200">Adm Height</th>
                    <th className="py-3 px-3 font-semibold text-center">Report</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((row, index) => (
                      <tr 
                        key={row.recordNo} 
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                      >
                        <td className="py-2.5 px-3 text-center border-r border-gray-100">{startIndex + index + 1}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 text-[#0B918C] font-medium">{row.recordNo}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100">{row.samNo}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100">{row.childName}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100">{row.parentName}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 whitespace-nowrap">{row.dob}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 text-right">{row.admWeight}</td>
                        <td className="py-2.5 px-3 border-r border-gray-100 text-right">{row.admHeight}</td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => handleSelectReport(row.recordNo)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 text-white bg-cyan-500 rounded hover:bg-cyan-600 transition-colors shadow-sm text-xs font-medium focus:outline-none focus:ring-2 focus:ring-cyan-300"
                          >
                            <FileDown size={14} />
                            Select
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-gray-500">
                        No matching records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 text-gray-600 text-sm">
              <div>
                Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries.toLocaleString()} entries
              </div>
              
              <div className="flex items-center shadow-sm rounded-md overflow-hidden border border-gray-200 bg-white">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-200 transition-colors"
                >
                  Previous
                </button>
                
                {/* Mock pagination structure based on HTML snapshot */}
                <button onClick={() => handlePageChange(1)} className={`px-3 py-1.5 border-r border-gray-200 transition-colors ${currentPage === 1 ? 'bg-[#0B918C] text-white font-medium' : 'hover:bg-gray-50 text-gray-600'}`}>1</button>
                <button onClick={() => handlePageChange(2)} className={`px-3 py-1.5 border-r border-gray-200 transition-colors ${currentPage === 2 ? 'bg-[#0B918C] text-white font-medium' : 'hover:bg-gray-50 text-gray-600'}`}>2</button>
                <button onClick={() => handlePageChange(3)} className={`px-3 py-1.5 border-r border-gray-200 transition-colors ${currentPage === 3 ? 'bg-[#0B918C] text-white font-medium' : 'hover:bg-gray-50 text-gray-600'}`}>3</button>
                <button onClick={() => handlePageChange(4)} className={`px-3 py-1.5 border-r border-gray-200 transition-colors ${currentPage === 4 ? 'bg-[#0B918C] text-white font-medium' : 'hover:bg-gray-50 text-gray-600'}`}>4</button>
                <button onClick={() => handlePageChange(5)} className={`px-3 py-1.5 border-r border-gray-200 transition-colors ${currentPage === 5 ? 'bg-[#0B918C] text-white font-medium' : 'hover:bg-gray-50 text-gray-600'}`}>5</button>
                
                <span className="px-3 py-1.5 border-r border-gray-200 text-gray-400">...</span>
                
                <button onClick={() => handlePageChange(168)} className={`px-3 py-1.5 border-r border-gray-200 transition-colors ${currentPage === 168 ? 'bg-[#0B918C] text-white font-medium' : 'hover:bg-gray-50 text-gray-600'}`}>168</button>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Report Output Anchor */}
            <div id="div_Report" className="mt-8 pt-4 w-full text-center">
              {/* Detailed Child SAM Report will load here */}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}