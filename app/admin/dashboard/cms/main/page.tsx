'use client';

import React, { useState } from 'react';
import { Edit } from 'lucide-react';

// Define the shape of a CMS entry
interface CMSEntry {
  id: number;
  sNo: number;
  heading: string;
}

// Mock data extracted from the HTML table
const INITIAL_CMS_ENTRIES: CMSEntry[] = [
  { id: 1, sNo: 1, heading: 'MTC Message' },
  { id: 2, sNo: 2, heading: 'Directors Message' },
  { id: 3, sNo: 3, heading: 'National Health Mission Address' },
  { id: 4, sNo: 4, heading: 'For Programme' },
  { id: 5, sNo: 5, heading: 'For Dashboard' },
  { id: 11, sNo: 6, heading: 'State Management System' },
];

export default function ContentManagementSystem() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [cmsEntries] = useState<CMSEntry[]>(INITIAL_CMS_ENTRIES);

  // Handle Type Dropdown Change
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setSelectedType(newType);
    console.log(`CMS Type changed to: ${newType}`);
    // You would typically fetch or filter table data here based on the selected type
  };

  // Handle Edit Action
  const handleEdit = (id: number) => {
    console.log(`Fetching details for heading ID: ${id}`);
    // Equivalent to GetHeadingDetails(id) in the original script
    // Add your routing or modal logic here
  };

  return (
    <div className="w-full p-4 font-sans text-gray-800">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Content Management System</h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Type Dropdown */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1.5">Type</label>
              <select
                value={selectedType}
                onChange={handleTypeChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors bg-white"
              >
                <option value="">Select Type</option>
                <option value="1">Text</option>
                <option value="2">Image</option>
                <option value="3">Image with Text</option>
              </select>
            </div>
          </div>

          {/* CMS Table */}
          <div className="mt-8">
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">
                      S.No
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Heading
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cmsEntries.map((entry, index) => (
                    <tr key={entry.id} className={index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                      <td className="px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {entry.sNo}
                      </td>
                      <td className="px-6 py-3 text-sm font-medium text-gray-700 whitespace-nowrap">
                        {entry.heading}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleEdit(entry.id)}
                          className="inline-flex items-center justify-center p-1.5 bg-[#17a2b8] text-white rounded hover:bg-[#138496] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#17a2b8] transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {cmsEntries.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-sm text-gray-500">
                        No CMS entries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}