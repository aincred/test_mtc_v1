'use client';

import React, { useState, FormEvent } from 'react';
import { Save } from 'lucide-react';

// Define the shape of our privilege record
interface PrivilegeRecord {
  sNo: number;
  id: number;
  formName: string;
  isActive: boolean;
}

// Mock data extracted from the HTML table
const INITIAL_PRIVILEGES: PrivilegeRecord[] = [
  { sNo: 1, id: 1, formName: 'PRIVILAGE', isActive: true },
  { sNo: 2, id: 2, formName: 'CONTENT MANAGEMENT SYSTEM', isActive: true },
  { sNo: 3, id: 3, formName: 'HOME', isActive: false },
  { sNo: 4, id: 4, formName: 'ABOUT', isActive: false },
  { sNo: 5, id: 5, formName: 'RESOURCES', isActive: true },
  { sNo: 6, id: 6, formName: 'STATE CENTER OF EXCELLENCE', isActive: true },
  { sNo: 7, id: 7, formName: 'GALLARY', isActive: true },
  { sNo: 8, id: 8, formName: 'CONTACT US', isActive: false },
  { sNo: 9, id: 9, formName: 'USER CREATION', isActive: true },
  { sNo: 10, id: 10, formName: 'CHILD REGISTRATION', isActive: false },
  { sNo: 11, id: 11, formName: 'ADD RESOURCES', isActive: true },
  { sNo: 12, id: 12, formName: 'CONTACT DETAILS', isActive: false },
  { sNo: 13, id: 13, formName: 'DISCHARGE', isActive: true },
  { sNo: 14, id: 14, formName: 'FOLLOWUP', isActive: false },
  { sNo: 15, id: 15, formName: 'DELETE CHILD RECORD', isActive: true },
  { sNo: 16, id: 16, formName: 'BED OCCUPANCY', isActive: false },
  { sNo: 17, id: 17, formName: 'EQUIPMENT SECTION', isActive: false },
  { sNo: 18, id: 18, formName: 'MICRONUTRIENTS ANTIBIOTICS', isActive: false },
  { sNo: 19, id: 19, formName: 'MPR', isActive: true },
  { sNo: 20, id: 20, formName: 'GENERATE LETTERS FOR FOLLOWUP', isActive: false },
  { sNo: 21, id: 21, formName: 'DAILY WEIGHT', isActive: false },
  { sNo: 22, id: 22, formName: 'STAFF DETAILS', isActive: false },
  { sNo: 23, id: 23, formName: 'SMS', isActive: true },
  { sNo: 24, id: 24, formName: 'REPORTS', isActive: true },
  { sNo: 25, id: 97, formName: 'CUSTOM SMS', isActive: true },
  { sNo: 26, id: 98, formName: 'STATE SMS', isActive: true },
  { sNo: 27, id: 99, formName: 'DISTRICT SMS', isActive: true },
  { sNo: 28, id: 100, formName: 'MTC SMS', isActive: true },
  { sNo: 29, id: 101, formName: 'FOLLOW UP DUE DATES', isActive: true },
  { sNo: 30, id: 102, formName: 'DASHBOARD', isActive: true },
  { sNo: 31, id: 103, formName: 'MOHFW MTC QUARTER REPORT', isActive: true },
  { sNo: 32, id: 104, formName: 'ANNUAL STATE AND DISTRICT FACTSHEET REPORT', isActive: true },
  { sNo: 33, id: 105, formName: 'DISTRICT ADMISSION DASHBOARD', isActive: true },
  { sNo: 34, id: 106, formName: 'DISTRICT DISCHARGE DASHBOARD', isActive: true },
  { sNo: 35, id: 107, formName: 'PERFORMANCE RANKING BY DISTRICT REPORT', isActive: true },
  { sNo: 36, id: 108, formName: 'PERFORMANCE RANKING BY MTC REPORT', isActive: true },
  { sNo: 37, id: 109, formName: 'BED OCCUPANCY BY DISTRICT REPORT', isActive: true },
  { sNo: 38, id: 110, formName: 'BED OCCUPANCY BY MTC REPORT', isActive: true },
  { sNo: 39, id: 111, formName: 'MTC ADMISSION DASHBOARD', isActive: true },
  { sNo: 40, id: 112, formName: 'MTC DISCHARGE DASHBOARD', isActive: true },
  { sNo: 41, id: 113, formName: 'FOLLOW UP STATUS REPORT', isActive: true },
  { sNo: 42, id: 114, formName: 'EQUIPMENT STATUS REPORT', isActive: true },
  { sNo: 43, id: 115, formName: 'DOWNLOAD CHILDREN REPORT', isActive: true },
  { sNo: 44, id: 116, formName: 'CHILD DISCHARGE BY DISTRICT', isActive: true },
  { sNo: 45, id: 117, formName: 'CHILD DISCHARGE BY MTC', isActive: true },
  { sNo: 46, id: 181, formName: 'SAM CHART', isActive: true },
  { sNo: 47, id: 185, formName: 'SAHIYA PAYMENT', isActive: true },
  { sNo: 48, id: 189, formName: 'MPR REPORT', isActive: true },
  { sNo: 49, id: 193, formName: 'ADD GALLERY', isActive: true },
  { sNo: 50, id: 203, formName: 'CREATE MTC', isActive: true },
  { sNo: 51, id: 207, formName: 'DELETE CHILD RECORD', isActive: true },
  { sNo: 52, id: 211, formName: 'ADD SPOTLIGHT', isActive: true },
  { sNo: 53, id: 215, formName: 'STAFF REPORT', isActive: true },
  { sNo: 54, id: 219, formName: 'MICRONUTRIENTS AND ANTIBIOTICS REPORT', isActive: true },
  { sNo: 55, id: 223, formName: 'LABORATORY TEST', isActive: false },
  { sNo: 56, id: 233, formName: 'SAHIYA FOLLOWUP', isActive: true },
  { sNo: 57, id: 234, formName: 'DISCHARGE CARD', isActive: true },
  { sNo: 58, id: 235, formName: 'MATERNAL NUTRITION', isActive: false },
  { sNo: 59, id: 236, formName: 'MATERNAL NUTRITION REPORT', isActive: true },
  { sNo: 60, id: 237, formName: 'DOWNLOAD TABLES', isActive: true }
];

export default function Privileges() {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [privileges, setPrivileges] = useState<PrivilegeRecord[]>(INITIAL_PRIVILEGES);
  const [isSaving, setIsSaving] = useState(false);

  // Handle Role Dropdown Change
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);
    // Here you would typically fetch the appropriate privileges from your API based on the selected role ID.
    console.log(`Role changed to: ${newRole}`);
  };

  // Handle Checkbox Toggle
  const handleToggle = (id: number) => {
    setPrivileges((prev) =>
      prev.map((priv) =>
        priv.id === id ? { ...priv, isActive: !priv.isActive } : priv
      )
    );
  };

  // Form Submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      alert("Please select a role first.");
      return;
    }

    setIsSaving(true);

    // Build the payload mapping over the state (similar to the hidden input arrays in original HTML)
    const payload = privileges.map((priv) => ({
      ROLE_ID: parseInt(selectedRole),
      MTC_PRIVILAGES_ID: priv.id,
      IS_ACTIVE: priv.isActive,
    }));

    console.log("Submitting Payload:", payload);

    try {
      // Simulate API Call Delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle Success
      // e.g. alertify.success(data.message);
      // window.location.href = '/Home/Privilege';
      console.log('Saved successfully!');
      
    } catch (error) {
      // Handle Failure
      // e.g. alertify.error("Record Failed to Save");
      console.error('Failed to save', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full p-4 font-sans text-gray-800">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Privileges</h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Roles Dropdown */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1.5">Roles</label>
              <select
                value={selectedRole}
                onChange={handleRoleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors bg-white"
              >
                <option value="">Select Role</option>
                <option value="1">ADMINISTRATOR</option>
                <option value="2">STATE USER</option>
                <option value="3">DISTRICT USER</option>
                <option value="4">MTC USER</option>
              </select>
            </div>
          </div>

          {/* Form wrapper */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">
                      S. No
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Form Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {privileges.map((priv, index) => (
                    <tr key={priv.id} className={index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                      <td className="px-6 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {priv.sNo}
                      </td>
                      <td className="px-6 py-3 text-sm font-medium text-gray-700 whitespace-nowrap">
                        {priv.formName}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={priv.isActive}
                            onChange={() => handleToggle(priv.id)}
                            className="w-4 h-4 text-[#0b918c] bg-gray-100 border-gray-300 rounded focus:ring-[#0b918c] focus:ring-2 cursor-pointer transition-colors"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Form Actions */}
            <div className="flex justify-center mt-6 pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#0b918c] to-[#087874] hover:from-[#087874] hover:to-[#065b58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b918c] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
              >
                <Save size={16} className="mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}