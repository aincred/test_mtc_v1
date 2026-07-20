"use client";

import React, { useState } from "react";
import { Edit, Send } from "lucide-react";

// Mock data based on the HTML provided
const INITIAL_DATA = [
  { id: 23, districtId: 1, district: "BOKARO", mobile: "8340268013" },
  { id: 24, districtId: 2, district: "CHATRA", mobile: "9470102901" },
  { id: 25, districtId: 3, district: "GIRIDIH", mobile: "9570200749" },
  { id: 26, districtId: 4, district: "DHANBAD", mobile: "9031080232" },
  { id: 27, districtId: 5, district: "RAMGARH", mobile: "7765063747" },
  { id: 28, districtId: 6, district: "HAZARIBAGH", mobile: "9905525388" },
  { id: 29, districtId: 7, district: "KODERMA", mobile: "7004991299" },
  { id: 30, districtId: 8, district: "RANCHI", mobile: "8340494546" },
  { id: 31, districtId: 9, district: "GUMLA", mobile: "7909024296" },
  { id: 32, districtId: 10, district: "KHUNTI", mobile: "8252466328" },
  // Adding placeholders to simulate the 24 entries mentioned in pagination
  ...Array.from({ length: 14 }).map((_, i) => ({
    id: 33 + i,
    districtId: 11 + i,
    district: `DISTRICT ${11 + i}`,
    mobile: `99999999${i < 10 ? '0' + i : i}`
  }))
];

export default function DistrictSmsList() {
  // Table State
  const [data] = useState(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Action Handlers
  const handleEdit = (id: number) => {
    console.log("Open Edit Modal for ID:", id);
  };

  const handleSendSms = (id: number, distId: number) => {
    console.log("Redirecting to Send SMS for ID:", id, "DistID:", distId);
  };

  // Filter Data
  const filteredData = data.filter(item => 
    item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.mobile.includes(searchQuery)
  );

  // Pagination Logic
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full mt-8">
      {/* Outer Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        
        {/* Card Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <h5 className="text-[1.25rem] font-medium m-0" style={{ color: "#0B918C" }}>
            District SMS List
          </h5>
        </div>

        {/* Card Body */}
        <div className="p-4 md:p-6 text-sm">
          
          {/* Table Controls (Show Entries & Search) */}
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
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-700">
                  <th className="py-3 px-4 font-semibold w-[80px] border-r border-gray-200">Id</th>
                  <th className="py-3 px-4 font-semibold border-r border-gray-200">District</th>
                  <th className="py-3 px-4 font-semibold border-r border-gray-200">Mobile Numbers</th>
                  <th className="py-3 px-4 font-semibold w-[250px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => (
                    <tr 
                      key={row.id} 
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                    >
                      <td className="py-2.5 px-4 border-r border-gray-100">{startIndex + index + 1}</td>
                      <td className="py-2.5 px-4 border-r border-gray-100 text-gray-900">{row.district}</td>
                      <td className="py-2.5 px-4 border-r border-gray-100">{row.mobile}</td>
                      <td className="py-2.5 px-4">
                        <div className="flex items-center gap-2">
                          {/* Edit Button */}
                          <button
                            onClick={() => handleEdit(row.id)}
                            className="p-1.5 text-white bg-green-500 rounded hover:bg-green-600 transition-colors shadow-sm"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          
                          {/* Send SMS Button */}
                          <button
                            onClick={() => handleSendSms(row.id, row.districtId)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-white bg-green-500 rounded hover:bg-green-600 transition-colors shadow-sm text-xs font-medium"
                          >
                            <Send size={14} />
                            Send SMS
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 text-gray-600">
            <div>
              Showing {totalEntries === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries} entries
            </div>
            
            <div className="flex items-center shadow-sm rounded-md overflow-hidden border border-gray-200">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-200 transition-colors"
              >
                Previous
              </button>
              
              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1.5 border-r border-gray-200 transition-colors ${
                    currentPage === page 
                      ? 'bg-[#0B918C] text-white font-medium' 
                      : 'bg-white hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1.5 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}