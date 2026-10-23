"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Search,
  FileSpreadsheet,
  Image as ImageIcon,
  Hospital,
  Bed,
  BedDouble,
  Users,
  CheckCircle2,
  Activity,
  Filter,
  Building2,
  RotateCcw,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

// --- Register ChartJS Modules ---
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// --- Interfaces ---
interface MtcRecord {
  id: string;
  district: string;
  division: string;
  facilityName: string;
  sanctionedBeds: number;
  availableBeds: number;
  totalAdmissions: number;
  totalCured: number;
  status: "Functional" | "Non-Functional" | "Under Maintenance";
}

interface Option {
  value: string;
  label: string;
}

interface ChartDataState {
  gender: number[];
  ageGroups: number[];
  complications: number[];
  referrals: { labels: string[]; counts: number[] };
  caste: number[];
  outcomes: number[];
}

const chartColors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#6366f1", "#64748b"];

// --- Sub-component: Filter Bar ---
const FilterBar = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  division,
  setDivision,
  district,
  setDistrict,
  districtOptions,
  onSearch,
  onReset,
}: {
  fromDate: string;
  setFromDate: (date: string) => void;
  toDate: string;
  setToDate: (date: string) => void;
  division: string;
  setDivision: (division: string) => void;
  district: string;
  setDistrict: (district: string) => void;
  districtOptions: Option[];
  onSearch: () => void;
  onReset: () => void;
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
      <div className="flex items-center gap-2 mb-3 text-slate-800 font-semibold text-sm">
        <Filter size={16} className="text-teal-600" />
        <span>Filter Parameters</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Division</label>
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            <option value="">All Divisions</option>
            <option value="NORTH CHOTANAGPUR">NORTH CHOTANAGPUR</option>
            <option value="SOUTH CHOTANAGPUR">SOUTH CHOTANAGPUR</option>
            <option value="PALAMU">PALAMU</option>
            <option value="SANTHAL">SANTHAL</option>
            <option value="KOLHAN">KOLHAN</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">District</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            <option value="">All Districts</option>
            {districtOptions.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end gap-2">
          <button
            onClick={onSearch}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-3 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Search size={14} /> Search
          </button>
          <button
            onClick={onReset}
            className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition"
            title="Reset Filters"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Sub-component: KPI Stat Card ---
const StatCard = ({
  value,
  label,
  sublabel,
  icon,
  accentBg,
  accentColor,
}: {
  value: string | number;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  accentBg: string;
  accentColor: string;
}) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>
      {sublabel && <p className="text-[11px] text-slate-400 mt-1">{sublabel}</p>}
    </div>
    <div className={`p-3 rounded-xl ${accentBg} ${accentColor}`}>{icon}</div>
  </div>
);

// --- Sub-component: Facilities Directory Table ---
const DistrictMtcTable = ({ data }: { data: MtcRecord[] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.district.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Building2 size={18} className="text-teal-600" />
            Districts & MTC Facilities Directory
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Overview of operational centers, bed capacity, and patient outcomes
          </p>
        </div>
        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search facility or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-100">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Facility Name</th>
              <th className="py-3 px-4">District</th>
              <th className="py-3 px-4 text-center">Sanctioned / Avail. Beds</th>
              <th className="py-3 px-4 text-right">Admissions</th>
              <th className="py-3 px-4 text-right">Cured</th>
              <th className="py-3 px-4 text-center">Recovery Rate</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredData.length > 0 ? (
              filteredData.map((row) => {
                const recoveryRate = row.totalAdmissions > 0 
                  ? Math.round((row.totalCured / row.totalAdmissions) * 100) 
                  : 0;
                return (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-800">{row.facilityName}</td>
                    <td className="py-3 px-4 font-medium">{row.district}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-semibold text-slate-800">{row.sanctionedBeds}</span>
                      <span className="text-slate-400"> / </span>
                      <span className="text-teal-600 font-semibold">{row.availableBeds}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">{row.totalAdmissions.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-medium text-emerald-600">{row.totalCured.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-800">
                      {recoveryRate}%
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No facilities found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Sub-component: Demographic & Outcome Analytics (Charts) ---
const ChartSection = ({ charts }: { charts?: ChartDataState }) => {
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { boxWidth: 10, font: { size: 11 }, usePointStyle: true, padding: 15 },
      },
      tooltip: { padding: 10, cornerRadius: 8 },
    },
  };

  // 1. Gender Chart Data
  const genderData = {
    labels: ["MALE", "FEMALE", "OTHER"],
    datasets: [
      {
        data: charts?.gender || [0, 0, 0],
        backgroundColor: ["#3b82f6", "#ec4899", "#94a3b8"],
        borderWidth: 0,
      },
    ],
  };

  // 2. Age Groups Chart Data
  const ageData = {
    labels: ["0-6M", "6-24 M", "24-36 M", ">36 M"],
    datasets: [
      {
        label: "Patients",
        data: charts?.ageGroups || [0, 0, 0, 0],
        backgroundColor: "#0d9488",
        borderRadius: 6,
      },
    ],
  };

  // 3. Complications Chart Data
  const complicationData = {
    labels: ["COMPLICATED", "NOT COMPLICATED"],
    datasets: [
      {
        data: charts?.complications || [0, 0],
        backgroundColor: ["#f59e0b", "#10b981"],
        borderWidth: 0,
      },
    ],
  };

  // 4. Referrals Channel Chart Data
  const referralData = {
    labels: charts?.referrals?.labels?.length ? charts.referrals.labels : ["No Data"],
    datasets: [
      {
        label: "Referrals",
        data: charts?.referrals?.counts?.length ? charts.referrals.counts : [0],
        backgroundColor: chartColors,
        borderRadius: 6,
      },
    ],
  };

  // 5. Category/Caste Chart Data
  const casteData = {
    labels: ["SC", "ST", "OBC", "OTHERS"],
    datasets: [
      {
        label: "Population",
        data: charts?.caste || [0, 0, 0, 0],
        backgroundColor: ["#6366f1", "#3b82f6", "#06b6d4", "#f59e0b"],
        borderRadius: 6,
      },
    ],
  };

  // 6. Treatment Outcomes Chart Data
  const outcomeData = {
    labels: ["CURED", "DEATH", "DEFAULTER", "MED TRANSFER", "NON RESP"],
    datasets: [
      {
        label: "Outcome",
        data: charts?.outcomes || [0, 0, 0, 0, 0],
        backgroundColor: ["#10b981", "#ef4444", "#f59e0b", "#6366f1", "#64748b"],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* 1. Gender Distribution */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 h-80 flex flex-col">
        <h5 className="text-sm font-semibold text-slate-700 mb-3 text-center">Gender Distribution</h5>
        <div className="grow relative">
          <Doughnut data={genderData} options={commonOptions} />
        </div>
      </div>

      {/* 2. Age Group Breakdown */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 h-80 flex flex-col">
        <h5 className="text-sm font-semibold text-slate-700 mb-3 text-center">Age Group Breakdown</h5>
        <div className="grow relative">
          <Bar data={ageData} options={{ ...commonOptions, plugins: { legend: { display: false } } }} />
        </div>
      </div>

      {/* 3. Complications at Admission */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 h-80 flex flex-col">
        <h5 className="text-sm font-semibold text-slate-700 mb-3 text-center">Complications at Admission</h5>
        <div className="grow relative">
          <Doughnut data={complicationData} options={commonOptions} />
        </div>
      </div>

      {/* 4. Referred By Channel */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 h-80 flex flex-col">
        <h5 className="text-sm font-semibold text-slate-700 mb-3 text-center">Referred By Channel</h5>
        <div className="grow relative">
          <Bar data={referralData} options={{ ...commonOptions, plugins: { legend: { display: false } } }} />
        </div>
      </div>

      {/* 5. Category / Caste Distribution */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 h-80 flex flex-col">
        <h5 className="text-sm font-semibold text-slate-700 mb-3 text-center">Category / Caste Distribution</h5>
        <div className="grow relative">
          <Bar data={casteData} options={{ ...commonOptions, plugins: { legend: { display: false } } }} />
        </div>
      </div>

      {/* 6. Patient Treatment Outcomes */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 h-80 flex flex-col">
        <h5 className="text-sm font-semibold text-slate-700 mb-3 text-center">Patient Treatment Outcomes</h5>
        <div className="grow relative">
          <Bar data={outcomeData} options={{ ...commonOptions, plugins: { legend: { display: false } } }} />
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function MtcDashboardHome() {
  const [fromDate, setFromDate] = useState("2026-01-01");
  const [toDate, setToDate] = useState("2026-08-31");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");

  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
  const [dashboardData, setDashboardData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch District Options on Mount
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await fetch("/api/districts");
        const json = await res.json();
        if (res.ok && json.success) {
          const formatted = (json.data || []).map((d: any) => ({
            value: d.name || d.district_name || String(d),
            label: d.name || d.district_name || String(d),
          }));
          setDistrictOptions(formatted);
        }
      } catch (err) {
        console.error("Error fetching districts:", err);
      }
    };

    fetchDistricts();
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);
    if (division) params.append("division", division);
    if (district) params.append("district", district);

    try {
      const res = await fetch(`/api/mtc-dashboard/overview?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || json.details || "Failed to load dashboard overview.");
      }

      setDashboardData(json.data);
    } catch (err: any) {
      console.error("Dashboard API Error:", err);
      setError(err.message || "Failed to connect to MTC Analytics API.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFromDate("2026-01-01");
    setToDate("2026-08-31");
    setDivision("");
    setDistrict("");
  };

  const handleExcelDownload = () => {
    if (!dashboardData?.facilities) return;
    const headers = ["#,Facility Name,District,Sanctioned Beds,Available Beds,Admissions,Cured"];
    const rows = dashboardData.facilities.map((f: any, idx: number) =>
      `${idx + 1},"${f.facilityName}","${f.district}",${f.sanctionedBeds},${f.availableBeds},${f.totalAdmissions},${f.totalCured}`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MTC_Analytics_Summary_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageDownload = () => {
    window.print();
  };

  const kpi = dashboardData?.kpi || {};

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Top Navbar */}
      <nav className="bg-slate-900 text-white border-b border-slate-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500 rounded-xl text-slate-950 font-bold">
              <Hospital size={20} />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">MTC Analytics Dashboard</h1>
              <p className="text-[11px] text-slate-400">Malnutrition Treatment Centre Monitoring System</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-medium">
              State: Jharkhand
            </span>
            <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-inner">
              AD
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Filter Controls */}
        <FilterBar
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          division={division}
          setDivision={setDivision}
          district={district}
          setDistrict={setDistrict}
          districtOptions={districtOptions}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {/* Header & Export Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Inception Performance Report</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Reporting Window: <span className="font-semibold text-slate-700">{fromDate}</span> to{" "}
              <span className="font-semibold text-slate-700">{toDate}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExcelDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition text-xs font-semibold shadow-sm"
            >
              <FileSpreadsheet size={15} className="text-emerald-600" /> Export CSV
            </button>
            <button
              onClick={handleImageDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition text-xs font-semibold shadow-sm"
            >
              <ImageIcon size={15} className="text-blue-600" /> Print Summary
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 mb-6 rounded-md bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="p-12 text-center text-teal-700 flex flex-col items-center justify-center gap-3">
            <RefreshCw size={28} className="animate-spin" />
            <span className="font-medium text-sm">Aggregating MTC Analytics & Live Reports...</span>
          </div>
        ) : (
          <>
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
              <StatCard
                label="Sanctioned MTCs"
                value={kpi.sanctionedMtcs ?? 106}
                sublabel="Across all divisions"
                icon={<Hospital size={20} />}
                accentBg="bg-blue-50"
                accentColor="text-blue-600"
              />
              <StatCard
                label="Sanctioned Beds"
                value={(kpi.sanctionedBeds ?? 1205).toLocaleString()}
                sublabel="Total approved capacity"
                icon={<Bed size={20} />}
                accentBg="bg-pink-50"
                accentColor="text-pink-600"
              />
              <StatCard
                label="Functional MTCs"
                value={kpi.functionalMtcs ?? 101}
                sublabel="Active treatment centers"
                icon={<CheckCircle2 size={20} />}
                accentBg="bg-emerald-50"
                accentColor="text-emerald-600"
              />
              <StatCard
                label="Available Beds"
                value={(kpi.availableBeds ?? 1125).toLocaleString()}
                sublabel="Currently operational"
                icon={<BedDouble size={20} />}
                accentBg="bg-amber-50"
                accentColor="text-amber-600"
              />
              <StatCard
                label="Total Admissions"
                value={(kpi.totalAdmissions ?? 0).toLocaleString()}
                sublabel="Cumulative patient count"
                icon={<Users size={20} />}
                accentBg="bg-indigo-50"
                accentColor="text-indigo-600"
              />
              <StatCard
                label="Total Cured"
                value={(kpi.totalCured ?? 0).toLocaleString()}
                sublabel={`${kpi.recoveryRate || "0%"} Recovery Rate`}
                icon={<Activity size={20} />}
                accentBg="bg-teal-50"
                accentColor="text-teal-600"
              />
            </div>

            {/* Districts and MTC Table */}
            <DistrictMtcTable data={dashboardData?.facilities || []} />

            {/* Section Header for Charts */}
            <div className="mb-4">
              <h3 className="text-base font-bold text-slate-800">Demographic & Outcome Analytics</h3>
              <p className="text-xs text-slate-500">
                Visualization of admissions classified by demographics, referrals, and clinical results
              </p>
            </div>

            {/* Charts Grid */}
            <ChartSection charts={dashboardData?.charts} />
          </>
        )}
      </div>
    </div>
  );
}