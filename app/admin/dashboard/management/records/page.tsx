'use client';

import React, { useState, ChangeEvent } from 'react';
import { Calendar, Search } from 'lucide-react';

// Define the shape of our form state
interface SearchFormData {
  fromDate: string;
  toDate: string;
  districtId: string;
  mtcId: string;
  recordNo: string;
  samNo: string;
  childName: string;
}

// Mock data for the dependent MTC dropdown
const MOCK_MTC_CENTERS: Record<string, { id: string; name: string }[]> = {
  '1': [{ id: '101', name: 'Bokaro City Center' }, { id: '102', name: 'Chas MTC' }],
  '8': [{ id: '801', name: 'Ranchi Main Hospital' }, { id: '802', name: 'Rims MTC' }],
  '4': [{ id: '401', name: 'Dhanbad Sadar' }],
  // Add other mappings as needed...
};

export default function ChildList() {
  const [formData, setFormData] = useState<SearchFormData>({
    fromDate: '',
    toDate: '',
    districtId: '',
    mtcId: '',
    recordNo: '',
    samNo: '',
    childName: '',
  });

  const [availableMtcs, setAvailableMtcs] = useState<{ id: string; name: string }[]>([]);

  // Handle standard text/date inputs
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Optional: Add validation for Record No (Numbers only)
    if (name === 'recordNo' && value !== '' && !/^\d+$/.test(value)) {
      return; 
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle District Change & Update Dependent Dropdown
  const handleDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = e.target.value;
    setFormData((prev) => ({ ...prev, districtId: selectedDistrict, mtcId: '' }));
    
    // Load dependent MTCs based on selected district
    if (selectedDistrict && MOCK_MTC_CENTERS[selectedDistrict]) {
      setAvailableMtcs(MOCK_MTC_CENTERS[selectedDistrict]);
    } else {
      setAvailableMtcs([]);
    }
  };

  // Handle MTC Selection
  const handleMtcChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, mtcId: e.target.value }));
  };

  const handleSearch = () => {
    console.log('Searching with payload:', formData);
    // Add your API call or search logic here
  };

  return (
    <div className="w-full p-4 font-sans text-gray-800">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Child List</h5>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            {/* From Date */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1.5">From Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleInputChange}
                  className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* To Date */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1.5">To Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleInputChange}
                  className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* District Dropdown */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1.5">District</label>
              <select
                name="districtId"
                value={formData.districtId}
                onChange={handleDistrictChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] bg-white transition-colors"
              >
                <option value="">Select District</option>
                <option value="1">BOKARO</option>
                <option value="2">CHATRA</option>
                <option value="16">DEOGHAR</option>
                <option value="4">DHANBAD</option>
                <option value="17">DUMKA</option>
                <option value="22">EAST SINGHBHUM</option>
                <option value="14">GARHWA</option>
                <option value="3">GIRIDIH</option>
                <option value="18">GODDA</option>
                <option value="9">GUMLA</option>
                <option value="6">HAZARIBAGH</option>
                <option value="19">JAMTARA</option>
                <option value="10">KHUNTI</option>
                <option value="7">KODERMA</option>
                <option value="15">LATEHAR</option>
                <option value="11">LOHARDAGA</option>
                <option value="20">PAKUR</option>
                <option value="13">PALAMU</option>
                <option value="5">RAMGARH</option>
                <option value="8">RANCHI</option>
                <option value="21">SAHIBGANJ</option>
                <option value="23">SERAIKELA</option>
                <option value="12">SIMDEGA</option>
                <option value="24">WEST SINGHBHUM</option>
              </select>
            </div>

            {/* MTC Center (Dependent Dropdown) */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1.5">MTC center</label>
              <select
                name="mtcId"
                value={formData.mtcId}
                onChange={handleMtcChange}
                disabled={!formData.districtId}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] bg-white disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
              >
                <option value="">Select MTC</option>
                {availableMtcs.map((mtc) => (
                  <option key={mtc.id} value={mtc.id}>
                    {mtc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-end">
            {/* Record No */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1.5">Record No</label>
              <input
                type="text"
                name="recordNo"
                value={formData.recordNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
              />
            </div>

            {/* SAM Number */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1.5">SAM Number</label>
              <input
                type="text"
                name="samNo"
                value={formData.samNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
              />
            </div>

            {/* Child Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1.5">Child Name</label>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
              />
            </div>

            {/* Search Button */}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={handleSearch}
                className="inline-flex items-center justify-center w-full md:w-auto px-5 py-2 border border-[#0b918c] text-sm font-medium rounded-md text-[#0b918c] bg-white hover:bg-[#0b918c] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b918c] transition-all duration-200"
              >
                <Search size={16} className="mr-2" />
                Search
              </button>
            </div>
          </div>

          {/* Results Container (Empty by default) */}
          <div className="mt-8" id="div_ChildRecords">
            {/* Search results would render here */}
          </div>
        </div>
      </div>
    </div>
  );
}