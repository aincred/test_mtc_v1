// 'use client';

// import React, { useState, ChangeEvent } from 'react';
// import { Calendar, Search } from 'lucide-react';

// // Define the shape of our form state
// interface SearchFormData {
//   fromDate: string;
//   toDate: string;
//   districtId: string;
//   mtcId: string;
//   recordNo: string;
//   samNo: string;
//   childName: string;
// }

// // Mock data for the dependent MTC dropdown
// const MOCK_MTC_CENTERS: Record<string, { id: string; name: string }[]> = {
//   '1': [{ id: '101', name: 'Bokaro City Center' }, { id: '102', name: 'Chas MTC' }],
//   '8': [{ id: '801', name: 'Ranchi Main Hospital' }, { id: '802', name: 'Rims MTC' }],
//   '4': [{ id: '401', name: 'Dhanbad Sadar' }],
//   // Add other mappings as needed...
// };

// export default function ChildList() {
//   const [formData, setFormData] = useState<SearchFormData>({
//     fromDate: '',
//     toDate: '',
//     districtId: '',
//     mtcId: '',
//     recordNo: '',
//     samNo: '',
//     childName: '',
//   });

//   const [availableMtcs, setAvailableMtcs] = useState<{ id: string; name: string }[]>([]);

//   // Handle standard text/date inputs
//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
    
//     // Optional: Add validation for Record No (Numbers only)
//     if (name === 'recordNo' && value !== '' && !/^\d+$/.test(value)) {
//       return; 
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle District Change & Update Dependent Dropdown
//   const handleDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const selectedDistrict = e.target.value;
//     setFormData((prev) => ({ ...prev, districtId: selectedDistrict, mtcId: '' }));
    
//     // Load dependent MTCs based on selected district
//     if (selectedDistrict && MOCK_MTC_CENTERS[selectedDistrict]) {
//       setAvailableMtcs(MOCK_MTC_CENTERS[selectedDistrict]);
//     } else {
//       setAvailableMtcs([]);
//     }
//   };

//   // Handle MTC Selection
//   const handleMtcChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     setFormData((prev) => ({ ...prev, mtcId: e.target.value }));
//   };

//   const handleSearch = () => {
//     console.log('Searching with payload:', formData);
//     // Add your API call or search logic here
//   };

//   return (
//     <div className="w-full p-4 font-sans text-gray-800">
//       <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
//         {/* Card Header */}
//         <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
//           <h5 className="text-lg font-semibold m-0 text-[#0b918c]">Child List</h5>
//         </div>

//         {/* Card Body */}
//         <div className="p-6">
//           {/* Row 1 */}
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
//             {/* From Date */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-600 mb-1.5">From Date</label>
//               <div className="relative">
//                 <input
//                   type="date"
//                   name="fromDate"
//                   value={formData.fromDate}
//                   onChange={handleInputChange}
//                   className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
//                 />
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                   <Calendar size={16} className="text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             {/* To Date */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-600 mb-1.5">To Date</label>
//               <div className="relative">
//                 <input
//                   type="date"
//                   name="toDate"
//                   value={formData.toDate}
//                   onChange={handleInputChange}
//                   className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
//                 />
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                   <Calendar size={16} className="text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             {/* District Dropdown */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-600 mb-1.5">District</label>
//               <select
//                 name="districtId"
//                 value={formData.districtId}
//                 onChange={handleDistrictChange}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] bg-white transition-colors"
//               >
//                 <option value="">Select District</option>
//                 <option value="1">BOKARO</option>
//                 <option value="2">CHATRA</option>
//                 <option value="16">DEOGHAR</option>
//                 <option value="4">DHANBAD</option>
//                 <option value="17">DUMKA</option>
//                 <option value="22">EAST SINGHBHUM</option>
//                 <option value="14">GARHWA</option>
//                 <option value="3">GIRIDIH</option>
//                 <option value="18">GODDA</option>
//                 <option value="9">GUMLA</option>
//                 <option value="6">HAZARIBAGH</option>
//                 <option value="19">JAMTARA</option>
//                 <option value="10">KHUNTI</option>
//                 <option value="7">KODERMA</option>
//                 <option value="15">LATEHAR</option>
//                 <option value="11">LOHARDAGA</option>
//                 <option value="20">PAKUR</option>
//                 <option value="13">PALAMU</option>
//                 <option value="5">RAMGARH</option>
//                 <option value="8">RANCHI</option>
//                 <option value="21">SAHIBGANJ</option>
//                 <option value="23">SERAIKELA</option>
//                 <option value="12">SIMDEGA</option>
//                 <option value="24">WEST SINGHBHUM</option>
//               </select>
//             </div>

//             {/* MTC Center (Dependent Dropdown) */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-600 mb-1.5">MTC center</label>
//               <select
//                 name="mtcId"
//                 value={formData.mtcId}
//                 onChange={handleMtcChange}
//                 disabled={!formData.districtId}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] bg-white disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
//               >
//                 <option value="">Select MTC</option>
//                 {availableMtcs.map((mtc) => (
//                   <option key={mtc.id} value={mtc.id}>
//                     {mtc.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Row 2 */}
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-end">
//             {/* Record No */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-600 mb-1.5">Record No</label>
//               <input
//                 type="text"
//                 name="recordNo"
//                 value={formData.recordNo}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
//               />
//             </div>

//             {/* SAM Number */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-600 mb-1.5">SAM Number</label>
//               <input
//                 type="text"
//                 name="samNo"
//                 value={formData.samNo}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
//               />
//             </div>

//             {/* Child Name */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium text-gray-600 mb-1.5">Child Name</label>
//               <input
//                 type="text"
//                 name="childName"
//                 value={formData.childName}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0b918c] focus:border-[#0b918c] transition-colors"
//               />
//             </div>

//             {/* Search Button */}
//             <div className="flex flex-col">
//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 className="inline-flex items-center justify-center w-full md:w-auto px-5 py-2 border border-[#0b918c] text-sm font-medium rounded-md text-[#0b918c] bg-white hover:bg-[#0b918c] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b918c] transition-all duration-200"
//               >
//                 <Search size={16} className="mr-2" />
//                 Search
//               </button>
//             </div>
//           </div>

//           {/* Results Container (Empty by default) */}
//           <div className="mt-8" id="div_ChildRecords">
//             {/* Search results would render here */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search, Download, FileText, ArrowLeft, Eye, Filter, Loader2,
  Calendar, SlidersHorizontal, ChevronDown, ChevronUp, RefreshCw, X
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ChildRecord {
  registration_id: string | number;
  sam_no: string | null;
  admission_type_id: string | number | null;
  referred_by_id: string | number | null;
  admission_date: string | null;
  admission_time: string | null;
  child_full_name: string | null;
  dob: string | null;
  sex_id: string | number | null;
  guardian_name: string | null;
  relationship_id: string | number | null;
  mobile_number: string | null;
  parent_aadhaar_number: string | null;
  bpl_number: string | null;
  caste_id: string | number | null;
  bank_name: string | null;
  account_holder: string | null;
  account_number: string | null;
  ifsc_code: string | null;
  full_address: string | null;
  district_id: string | number | null;
  block_id: string | number | null;
  village: string | null;
  icds_project_id: string | number | null;
  anganwadi_id: string | number | null;
  admission_weight_kg: string | number | null;
  length_height_cm: string | number | null;
  muac_cm: string | number | null;
  z_score_sd: string | number | null;
  odema_id: string | number | null;
  breast_feeding_id: string | number | null;
  complementary_feeding: string | null;
  appetite_test_id: string | number | null;
  created_at: string | null;
  updated_at: string | null;
  medical_complications: string | null;
  discharge_date: string | null;
  discharge_weight_kg: string | number | null;
  discharge_height_cm: string | number | null;
  discharge_muac_cm: string | number | null;
  discharge_edema_id: string | number | null;
  outcome_indicator_id: string | number | null;
  hemoglobin_mother: string | number | null;
  ifa_given_to_mother: string | null;
  mother_payment_wages: string | number | null;
  ifa_syrup_to_child: string | null;
  total_stay_days: string | number | null;
  minimum_weight_kg: string | number | null;
  discharge_image_path: string | null;
  admission_hemoglobin: string | number | null;
  age_years: string | number | null;
  age_months: string | number | null;
  referred_by_name: string | null;
  referred_by_mobile: string | null;
  mother_name: string | null;
  mtc_id: string | number | null;
  is_samar_registered: string | null;
  samar_uuid: string | null;
  father_name: string | null;
}

const ALL_RECORD_KEYS: (keyof ChildRecord)[] = [
  "registration_id", "sam_no", "admission_type_id", "referred_by_id", "admission_date",
  "admission_time", "child_full_name", "dob", "sex_id", "guardian_name", "relationship_id",
  "mobile_number", "parent_aadhaar_number", "bpl_number", "caste_id", "bank_name",
  "account_holder", "account_number", "ifsc_code", "full_address", "district_id", "block_id",
  "village", "icds_project_id", "anganwadi_id", "admission_weight_kg", "length_height_cm",
  "muac_cm", "z_score_sd", "odema_id", "breast_feeding_id", "complementary_feeding",
  "appetite_test_id", "created_at", "updated_at", "medical_complications", "discharge_date",
  "discharge_weight_kg", "discharge_height_cm", "discharge_muac_cm", "discharge_edema_id",
  "outcome_indicator_id", "hemoglobin_mother", "ifa_given_to_mother", "mother_payment_wages",
  "ifa_syrup_to_child", "total_stay_days", "minimum_weight_kg", "discharge_image_path",
  "admission_hemoglobin", "age_years", "age_months", "referred_by_name", "referred_by_mobile",
  "mother_name", "mtc_id", "is_samar_registered", "samar_uuid", "father_name"
];

function DataField({ label, value }: { label: string; value: any }) {
  const display = value !== null && value !== undefined && value !== "" ? String(value) : "—";
  return (
    <div className="flex flex-col bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
      <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">{label}</span>
      <span className="text-xs font-semibold text-slate-800 break-words mt-0.5">{display}</span>
    </div>
  );
}

export default function AdminChildRecordsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [mtcId, setMtcId] = useState<number | null>(null);

  const [records, setRecords] = useState<ChildRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [modalRecord, setModalRecord] = useState<ChildRecord | null>(null);

  useEffect(() => {
    setMounted(true);
    const sessionData = sessionStorage.getItem("admin_user") || sessionStorage.getItem("mtc_user");
    if (sessionData) {
      try {
        const user = JSON.parse(sessionData);
        setMtcId(user.mtcId || null);
      } catch (err) {
        console.error("Session parse error", err);
      }
    }
  }, []);

  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      const queryParams = mtcId ? `?mtcId=${mtcId}` : "";
      const response = await fetch(`/api/admin/child-records${queryParams}`);
      if (!response.ok) throw new Error("Failed to fetch database records");
      const data = await response.json();
      setRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load records from /api/admin/child-records");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) fetchRecords();
  }, [mounted, mtcId]);

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matches =
          String(r.child_full_name || "").toLowerCase().includes(term) ||
          String(r.sam_no || "").toLowerCase().includes(term) ||
          String(r.registration_id || "").toLowerCase().includes(term) ||
          String(r.guardian_name || "").toLowerCase().includes(term) ||
          String(r.mobile_number || "").toLowerCase().includes(term);
        if (!matches) return false;
      }

      if (statusFilter === "active" && r.discharge_date) return false;
      if (statusFilter === "discharged" && !r.discharge_date) return false;

      if (fromDate) {
        if (!r.admission_date || new Date(r.admission_date) < new Date(fromDate)) return false;
      }

      if (toDate) {
        if (!r.admission_date) return false;
        const toLimit = new Date(toDate);
        toLimit.setHours(23, 59, 59, 999);
        if (new Date(r.admission_date) > toLimit) return false;
      }

      return true;
    });
  }, [records, searchTerm, statusFilter, fromDate, toDate]);

  const exportAllColumnsToCSV = () => {
    if (filteredRecords.length === 0) {
      toast.error("No records available to export");
      return;
    }

    const csvRows = [ALL_RECORD_KEYS.join(",")];
    for (const row of filteredRecords) {
      const values = ALL_RECORD_KEYS.map((key) => {
        const val = row[key] !== null && row[key] !== undefined ? String(row[key]) : "";
        const escaped = val.replace(/"/g, '""');
        return val.includes(",") ? `"${escaped}"` : escaped;
      });
      csvRows.push(values.join(","));
    }

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Admin_Child_Master_${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Admin master records exported to CSV!");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-4 md:py-8 px-3 sm:px-6 lg:px-8">
      <Toaster position="top-center" />

      <div className="max-w-[1600px] mx-auto">
        {/* Navigation & Header */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
          </button>
          <button
            onClick={fetchRecords}
            disabled={isLoading}
            className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
          >
            <RefreshCw className={cn("w-3.5 h-3.5 mr-1", isLoading && "animate-spin")} /> Refresh Data
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
              <FileText className="text-indigo-600 h-7 w-7" />
              Admin Child Master Registry
            </h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="sm:hidden inline-flex items-center px-3 py-2 border border-slate-200 bg-white rounded-xl text-xs font-semibold text-slate-700"
            >
              <SlidersHorizontal className="w-4 h-4 mr-1.5" /> Filters
            </button>
            <button
              onClick={exportAllColumnsToCSV}
              className="inline-flex items-center px-4 py-2 border border-indigo-200 text-indigo-700 hover:bg-indigo-50 bg-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Export All Columns ({filteredRecords.length})
            </button>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className={cn("mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm", showMobileFilters ? "block" : "hidden md:block")}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">From Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-xl bg-slate-50 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
                <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">To Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-xl bg-slate-50 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
                <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Search Child / SAM / ID</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by name, SAM, guardian..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-xl bg-slate-50 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Discharge Status</label>
              <div className="relative">
                <Filter className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-xl bg-slate-50 text-xs text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="all">All Patients</option>
                  <option value="active">Active (Admitted)</option>
                  <option value="discharged">Discharged</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Data Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative min-h-[400px]">
          {isLoading ? (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
              <p className="text-xs font-semibold text-slate-600">Loading Master Records from Admin Endpoint...</p>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No Child Records Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">No database rows matched your current query criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto max-h-[720px] overflow-y-auto">
              <table className="w-full text-xs text-left border-collapse min-w-max">
                <thead className="bg-slate-100/80 sticky top-0 z-10 border-b border-slate-200 backdrop-blur-md">
                  <tr>
                    <th className="px-3 py-3 font-bold text-slate-700 uppercase tracking-wider sticky left-0 bg-slate-100 z-20 border-r border-slate-200">
                      Actions
                    </th>
                    {ALL_RECORD_KEYS.map((key) => (
                      <th key={key} className="px-3 py-3 font-bold text-slate-700 uppercase tracking-wider whitespace-nowrap border-r border-slate-200/60">
                        {key.replace(/_/g, " ")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map((record) => {
                    const isExpanded = expandedId === record.registration_id;
                    return (
                      <React.Fragment key={record.registration_id}>
                        <tr className="hover:bg-indigo-50/40 transition-colors group">
                          {/* Frozen Actions Column */}
                          <td className="px-3 py-2.5 whitespace-nowrap sticky left-0 bg-white group-hover:bg-indigo-50/70 z-10 border-r border-slate-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setModalRecord(record)}
                                title="Open Full Form Inspection"
                                className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setExpandedId(isExpanded ? null : record.registration_id)}
                                title="Expand Inline Cards"
                                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                              >
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </td>

                          {/* Raw Table Columns */}
                          {ALL_RECORD_KEYS.map((key) => {
                            const val = record[key];
                            return (
                              <td key={key} className="px-3 py-2.5 whitespace-nowrap border-r border-slate-100 text-slate-700">
                                {key === "sam_no" ? (
                                  <span className="font-mono font-bold text-indigo-700 bg-indigo-50/80 px-2 py-0.5 rounded">
                                    {val || "—"}
                                  </span>
                                ) : key === "discharge_date" ? (
                                  <span className={cn(
                                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                                    val ? "bg-slate-100 text-slate-700" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  )}>
                                    {val ? String(val) : "Active"}
                                  </span>
                                ) : (
                                  <span>{val !== null && val !== undefined && val !== "" ? String(val) : "—"}</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>

                        {/* Inline Expandable Full Attributes Grid */}
                        {isExpanded && (
                          <tr className="bg-slate-50 border-y border-indigo-100">
                            <td colSpan={ALL_RECORD_KEYS.length + 1} className="p-4">
                              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-inner">
                                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                                  <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                                    Full Attribute Card: {record.child_full_name} (Registration ID: {record.registration_id})
                                  </span>
                                  <button
                                    onClick={() => setExpandedId(null)}
                                    className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                                  >
                                    Close Row
                                  </button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                  {ALL_RECORD_KEYS.map((k) => (
                                    <DataField key={k} label={k.replace(/_/g, " ")} value={record[k]} />
                                  ))}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 font-medium">
            <span>
              Showing <span className="font-bold text-slate-800">{filteredRecords.length}</span> patient entries
            </span>
            <span>Total Columns Loaded: {ALL_RECORD_KEYS.length}</span>
          </div>
        </div>
      </div>

      {/* Full Record Modal Viewer */}
      {modalRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {modalRecord.child_full_name || "Patient Profile"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Registration ID: <span className="font-mono font-bold text-indigo-600">{modalRecord.registration_id}</span> | SAM: {modalRecord.sam_no || "N/A"}
                </p>
              </div>
              <button
                onClick={() => setModalRecord(null)}
                className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {ALL_RECORD_KEYS.map((key) => (
                  <DataField key={key} label={key.replace(/_/g, " ")} value={modalRecord[key]} />
                ))}
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setModalRecord(null)}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-900 transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}