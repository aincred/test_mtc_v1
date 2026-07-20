'use client';

import React, { useState } from 'react';
import { Calendar, FileSpreadsheet } from 'lucide-react';

// List of tables extracted from the HTML select options
const TABLE_NAMES = [
  "ADMISSION_TYPE", "ANGANWADI_CENTERS", "ANGANWADI_CENTERS_BCP", "APPETITE_TEST",
  "BED_OCCUPANCY", "BED_OCCUPANCY_DUP", "BED_SANCTIONED", "BLOCK", "BMI_HEIGHT",
  "BMI_HEIGHT_WEIGHT", "BMI_WEIGHT", "CASTS", "CHILD_COMPLICATION", "CHILD_DISCHARGE",
  "CHILD_DISCHARGE_10062022", "CHILD_REGISTRATION", "CHILD_REGISTRATION_10062022",
  "CONTACT_LIST", "CONTACT_US", "CONTENT_TEXT", "DAILY_WEIGHT", "DESIGNATION",
  "DISCHARGE_EDEMA", "DISTRICT", "DIVISION", "EQUIPMENT_GROUPS", "EQUIPMENT_SECTION",
  "EQUIPMENT_SECTION_DETAILS", "EQUIPMENT_SUBGROUPS", "FINANCIALYEAR", "FOLLOW_UP",
  "FREE_FEEDING", "GALLERY", "GALLERY_FOLDERS", "GENDER", "HOMEPAGE_HEADINGS",
  "ICDS_PROJECTS", "Images_Content", "MATERNAL_NUTRITION", "MEDICAL_COMPLICATIONS",
  "MICRONUTRIENTS_ANTIBIOTICS", "MIS_MICRONUTRIENT", "MIS_MICRONUTRIENTS_MASTER",
  "MODULES", "MTC_CENTER", "MTC_DESIGNATION_MAPPING", "MTC_FORMS", "MTC_LOGINTRACE",
  "MTC_Master_DUPLICATED", "MTC_PRIVILAGE", "MTC_PRIVILAGES", "MTC_SMS",
  "MTC_WEB_CONFIG", "NUMBER_OF_VISITS", "NUTRITION_COMPLICATIONS", "ORGANIZATION",
  "OUTCOME_INDICATOR", "QUARTERLY_YEAR", "RECKONER_MICRONUTRIENT_ELECROLYTE",
  "REFFERED_BY", "RELATIONSHIP", "RESOURCE_CATEGORY", "RESOURCE_SUBCATEGORY",
  "RESOURCES", "ROLE_MODULES", "ROLES", "SAM_SEQNO", "SECTOR", "SPOTLIGHT",
  "STAFF_DETAILS", "STARTER_DIET_OEDEMA", "STATE", "USERS", "USERS_LOGINAUDIT",
  "VILLAGE", "WEIGHT_LENGTH_REFERENCE_CARD", "WRONG_LOGIN_ATTEMPTS"
];

export default function DownloadTables() {
  // Default dates set to match the HTML defaults
  const [fromDate, setFromDate] = useState('2026-04-28');
  const [toDate, setToDate] = useState('2026-04-28');
  const [tableName, setTableName] = useState('ADMISSION_TYPE');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    console.log('Initiating Export with payload:', { fromDate, toDate, tableName });

    try {
      // Simulate API call or download delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // alertify.success("Export successful!");
      console.log('Export successful!');
    } catch (error) {
      console.error('Export failed', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full p-4 font-sans text-gray-800">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden relative">
        
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Download Tables</h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 items-end">
            
            {/* From Date */}
            <div className="md:col-span-3 flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1.5">From Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* To Date */}
            <div className="md:col-span-3 flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1.5">To Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Table Name Dropdown */}
            <div className="md:col-span-4 flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1.5">Table Name</label>
              <select
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors bg-white"
              >
                {TABLE_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Export Button */}
            <div className="md:col-span-2 flex flex-col">
              <button
                type="button"
                onClick={handleExport}
                disabled={isExporting}
                className="inline-flex items-center justify-center w-full px-4 py-2 border border-[#28a745] text-sm font-medium rounded-md text-[#28a745] bg-white hover:bg-[#28a745] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#28a745] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <FileSpreadsheet size={16} className="mr-2" />
                {isExporting ? 'Exporting...' : 'Export'}
              </button>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}