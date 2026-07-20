"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, Download, FileText, ArrowLeft, Eye, Filter, User, Activity, Loader2, Calendar 
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";

// --- UI Components ---
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ChildRecord {
  id: string;
  samNumber: string;
  recordNo: string;
  childName: string;
  parentName: string;
  mobileNumber: string;
  sex: string;
  admissionDate: string;
  admissionWeight: number;
  admissionHeight: number;
  zScore: string;
  village?: string;
  dischargeDate?: string;
  admissionType?: string;
}

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'icon';
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', href, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
      variant === 'default' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700" : "",
      variant === 'outline' ? "border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-slate-900 text-slate-700" : "",
      variant === 'ghost' ? "hover:bg-slate-100 hover:text-slate-900 text-slate-600" : "",
      size === 'default' ? "h-11 py-2 px-6" : "",
      size === 'sm' ? "h-9 px-3 text-xs rounded-lg" : "",
      size === 'icon' ? "h-10 w-10 p-2" : "",
      className
    );
    if (href) {
      return (
        <a href={href} className={classes}>
          {props.children}
        </a>
      );
    }
    return <button ref={ref} className={classes} {...props} />;
  }
);
Button.displayName = "Button";

const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm overflow-hidden", className)} {...props} />
);

// --- Main Component ---
export default function ChildRecordsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // MTC Identity State
  const [mtcName, setMtcName] = useState<string>("");
  const [, setMtcId] = useState<number | null>(null);

  const [records, setRecords] = useState<ChildRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<ChildRecord[]>([]);
  
  // FILTERS
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); 
  const [fromDate, setFromDate] = useState(""); 
  const [toDate, setToDate] = useState(""); 

  // Load Session and Data
  useEffect(() => {
    setMounted(true);
    
    // 1. Get Session Data Securely
    const sessionData = sessionStorage.getItem("mtc_user");
    let currentMtcId = null;
    let currentMtcName = "";

    if (sessionData) {
      try {
        const user = JSON.parse(sessionData);
        currentMtcId = user.mtcId || null;
        currentMtcName = user.mtcName || "";
        setMtcId(currentMtcId);
        setMtcName(currentMtcName);
      } catch (err) {
        console.error("Session parse error", err);
      }
    }

    // 2. Fetch Data from API (Filtered by MTC ID)
    const fetchRecords = async () => {
      try {
        setIsLoading(true);
        
        // Append MTC ID to query if it exists
        const queryParams = currentMtcId ? `?mtcId=${currentMtcId}` : "";
        const response = await fetch(`/api/child-records${queryParams}`);
        
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        setRecords(data);
        setFilteredRecords(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load records from database");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Filter Logic (Search + Status + Dates)
  useEffect(() => {
    let result = records;

    // 1. Text Search Filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(record => 
        record.childName?.toLowerCase().includes(term) ||
        record.samNumber?.toLowerCase().includes(term) ||
        record.parentName?.toLowerCase().includes(term)
      );
    }

    // 2. Active / Discharged Status Filter
    if (statusFilter !== "all") {
      result = result.filter(record => {
        if (statusFilter === "active") return !record.dischargeDate;
        if (statusFilter === "discharged") return !!record.dischargeDate;
        return true;
      });
    }

    // 3. Date Filters (Based on Admission Date)
    if (fromDate) {
      const filterDate = new Date(fromDate);
      result = result.filter(record => {
        if (!record.admissionDate) return false;
        const recordDate = new Date(record.admissionDate);
        return recordDate >= filterDate;
      });
    }

    if (toDate) {
      const filterDate = new Date(toDate);
      filterDate.setHours(23, 59, 59, 999);
      result = result.filter(record => {
        if (!record.admissionDate) return false;
        const recordDate = new Date(record.admissionDate);
        return recordDate <= filterDate;
      });
    }

    setFilteredRecords(result);
  }, [searchTerm, statusFilter, fromDate, toDate, records]);

  // Export to CSV Function
  const exportToCSV = () => {
    if (filteredRecords.length === 0) {
      toast.error("No records to export");
      return;
    }

    const headers = [
      "SAM Number", "Record No", "Child Name", "Parent Name", "Mobile", 
      "Sex", "Admission Date", "Weight (kg)", "Height (cm)", "Z-Score", "Village", "Status"
    ];

    const csvData = filteredRecords.map(r => [
      r.samNumber,
      r.recordNo,
      r.childName,
      r.parentName,
      r.mobileNumber,
      r.sex === "1" ? "Male" : "Female",
      r.admissionDate,
      r.admissionWeight,
      r.admissionHeight,
      r.zScore,
      r.village || "N/A",
      r.dischargeDate ? "Discharged" : "Active" 
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.map(item => `"${item || ''}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `MTC_${mtcName || 'All'}_Records_${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Database exported successfully!");
  };

  const handleViewDetails = (id: string) => {
    router.push(`/mtc-user/dashboard/child-registration/edit-child/${id}`);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setFromDate("");
    setToDate("");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-4 flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-slate-500">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <FileText className="text-indigo-600 h-8 w-8" />
              Master Records Database
            </h1>
            <p className="mt-2 text-sm text-slate-500 max-w-2xl font-medium">
              Currently viewing complete historical database for: <span className="font-bold text-indigo-600 uppercase tracking-wider">{mtcName || "Loading..."}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={exportToCSV} variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 bg-white">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Toolbar: Search, Status, and Date Filters */}
        <Card className="mb-6 border-0 shadow-sm overflow-visible">
          <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            
            {/* From Date */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">From Date</label>
              <div className="relative">
                <Input 
                  type="date" 
                  value={fromDate} 
                  onChange={(e) => setFromDate(e.target.value)} 
                  className="bg-slate-50" 
                />
              </div>
            </div>

            {/* To Date */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">To Date</label>
              <div className="relative">
                <Input 
                  type="date" 
                  value={toDate} 
                  onChange={(e) => setToDate(e.target.value)} 
                  className="bg-slate-50" 
                />
              </div>
            </div>

            {/* Search */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Search Patient</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <Input
                  type="text"
                  placeholder="SAM, Child, or Parent..."
                  className="pl-9 bg-slate-50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Patient Status</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-4 w-4 text-slate-400" />
                </div>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-11 w-full pl-9 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer appearance-none"
                >
                  <option value="all">All Patients</option>
                  <option value="active">Active (Admitted)</option>
                  <option value="discharged">Discharged</option>
                </select>
              </div>
            </div>

          </div>
        </Card>

        {/* Records Table */}
        <Card className="border-0 shadow-sm border-t border-slate-200 relative min-h-[400px]">
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
              <p className="text-slate-600 font-medium text-sm">Loading Database...</p>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="px-6 py-4">SAM Number</th>
                  <th className="px-6 py-4">Patient Details</th>
                  <th className="px-6 py-4 hidden md:table-cell">Admission Details</th>
                  <th className="px-6 py-4 hidden lg:table-cell">Vitals (Adm.)</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {!isLoading && filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/80 transition-colors group">
                      
                      {/* SAM Number */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-mono font-medium text-indigo-700 bg-indigo-50 inline-block px-2 py-1 rounded">
                          {record.samNumber}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">Rec: {record.recordNo}</div>
                      </td>
                      
                      {/* Patient Details */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <User size={14} className="text-slate-400" />
                          {record.childName}
                        </div>
                        <div className="text-slate-500 text-xs mt-1">
                          Caregiver: {record.parentName}
                        </div>
                        <div className="text-slate-400 text-xs mt-0.5 hidden sm:block">
                          {record.village ? `Village: ${record.village}` : 'Address not provided'}
                        </div>
                      </td>
                      
                      {/* Admission Info */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="text-slate-700 flex items-center gap-1">
                           <Calendar size={13} className="text-slate-400"/> {record.admissionDate}
                        </div>
                        <div className="text-slate-500 text-xs mt-1">
                          Type: {record.admissionType === "1" ? "New" : record.admissionType === "2" ? "Re-Admission" : "Relapse"}
                        </div>
                      </td>
                      
                      {/* Vitals */}
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1 text-slate-700">
                          <Activity size={14} className="text-teal-500" />
                          <span>{record.admissionWeight} kg</span>
                        </div>
                        <div className="text-slate-500 text-xs mt-1">
                          Z-Score: <span className="font-medium text-red-500">{record.zScore}</span>
                        </div>
                      </td>
                      
                      {/* Status Badge */}
                      <td className="px-6 py-4 text-center">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
                          record.dischargeDate 
                            ? "bg-slate-100 text-slate-700 border-slate-200" 
                            : "bg-green-50 text-green-700 border-green-200"
                        )}>
                          {record.dischargeDate ? "Discharged" : "Active"}
                        </span>
                      </td>
                      
                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(record.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
                        >
                          <Eye className="w-4 h-4 mr-1.5" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : !isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                        <Search className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-1">No records found</h3>
                      <p className="text-slate-500 text-sm max-w-sm mx-auto">
                        We couldn&apos;t find any patient records matching your current filters and search criteria.
                      </p>
                      {(searchTerm || statusFilter !== 'all' || fromDate || toDate) && (
                        <Button 
                          variant="outline" 
                          className="mt-4 border-slate-200"
                          onClick={clearFilters}
                        >
                          Clear All Filters
                        </Button>
                      )}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          {!isLoading && (
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 text-sm text-slate-500 flex justify-between items-center">
              <span>Showing <span className="font-medium text-slate-900">{filteredRecords.length}</span> records for {mtcName || "All"}</span>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}