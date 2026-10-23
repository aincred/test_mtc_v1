"use client";

import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Calendar,
  ChevronRight,
  Download,
  Filter,
  HeartPulse,
  MailCheck,
  Plus,
  Send,
  Sparkles,
  Users2,
} from "lucide-react";
import Link from "next/link";

const quickStats = [
  {
    label: "Active Inpatients",
    value: "1,140",
    delta: "+8.3%",
    sub: "Target: 1,200",
  },
  {
    label: "Discharge Success",
    value: "94.2%",
    delta: "+1.8%",
    sub: "Last 30 days",
  },
  {
    label: "Pending Follow-ups",
    value: "128",
    delta: "-12%",
    sub: "42 critical",
  },
  {
    label: "Facility Readiness",
    value: "96.5%",
    delta: "+0.4%",
    sub: "48 of 50 active",
  },
];

const centerStatusList = [
  { name: "Ranchi District Hospital MTC", SAM: 38, capacity: "95%", status: "High" },
  { name: "Khunti Sub-Divisional Center", SAM: 22, capacity: "73%", status: "Optimal" },
  { name: "Bundu Community Health Center", SAM: 14, capacity: "58%", status: "Optimal" },
  { name: "Gumla District Hospital MTC", SAM: 29, capacity: "88%", status: "Warning" },
];

export default function BentoDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Banner Toolbar */}
      <div className="rounded-2xl bg-slate-900 px-6 py-7 text-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">
              <Sparkles className="h-3 w-3" /> Live Center Feed
            </span>
            <span className="text-xs text-slate-400">• Updated 5m ago</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Nutrition Operations Console</h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time multi-district tracking across state-certified treatment units.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/dashboard/sms/custom"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/15 transition-colors"
          >
            <Send className="h-3.5 w-3.5 text-indigo-300" />
            Broadcast SMS
          </Link>
          <Link
            href="/admin/dashboard/management/create-user"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            New Admission
          </Link>
        </div>
      </div>

      {/* Modern KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-slate-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{stat.label}</span>
              <span className="inline-flex items-center text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                {stat.delta}
              </span>
            </div>
            <div className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
              {stat.value}
            </div>
            <p className="mt-1 text-[11px] text-slate-400">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Bento Grid Core */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Box 1: Facility Capacity & Triage Table (2 cols wide) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                <BarChart3 className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900">District Center Occupancy</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 border border-slate-200 px-2.5 py-1.5 rounded-lg hover:bg-slate-50"
              >
                <Filter className="h-3 w-3" /> Filter
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 border border-slate-200 px-2.5 py-1.5 rounded-lg hover:bg-slate-50"
              >
                <Download className="h-3 w-3" /> Export
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {centerStatusList.map((center) => (
              <div
                key={center.name}
                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-slate-900">{center.name}</p>
                  <p className="text-[11px] text-slate-400">Total SAM cases managed: {center.SAM}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-28 hidden sm:block">
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Occupancy</span>
                      <span className="font-semibold text-slate-700">{center.capacity}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          center.status === "High" ? "bg-rose-500" : "bg-indigo-600"
                        }`}
                        style={{ width: center.capacity }}
                      />
                    </div>
                  </div>

                  <span
                    className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                      center.status === "High"
                        ? "bg-rose-50 text-rose-600 border border-rose-100"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {center.status}
                  </span>

                  <ChevronRight className="h-4 w-4 text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Box 2: Realtime Alert & Health Actions Stack */}
        <div className="space-y-4">
          
          {/* Quick Metrics Tile */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Action Priority
            </h3>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                  !
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">4 Follow-ups Delayed</h4>
                  <p className="text-[11px] text-amber-800">Critical Stage 3 check-in missed</p>
                </div>
              </div>
              <Link
                href="/admin/dashboard/sms/follow-up"
                className="text-xs font-semibold text-amber-900 underline hover:text-amber-950"
              >
                Send Alert
              </Link>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-3">
                <MailCheck className="h-5 w-5 text-indigo-600" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">SMS Automated Sync</h4>
                  <p className="text-[11px] text-slate-500">Scheduled for 18:00 IST</p>
                </div>
              </div>
              <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Active
              </span>
            </div>
          </div>

          {/* District Highlights Tile */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Deliverables
              </h3>
              <Activity className="h-4 w-4 text-slate-400" />
            </div>

            <ul className="space-y-3 text-xs">
              <li className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-600">Nutritional Recovery Rate</span>
                <span className="font-semibold text-slate-900">89.4%</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-600">Avg Inpatient Duration</span>
                <span className="font-semibold text-slate-900">14.2 Days</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-600">Default Rate</span>
                <span className="font-semibold text-emerald-600">1.2% (Low)</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}