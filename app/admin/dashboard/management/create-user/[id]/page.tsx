"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Building2, 
  UserCheck, 
  SlidersHorizontal,
  User, 
  Lock, 
  Save, 
  X, 
  CheckCircle2,
  MapPin
} from 'lucide-react';

type UserRole = 'MTC USER' | 'STATE USER' | 'DISTRICT USER';

const ROLE_PRESETS: Record<UserRole, { label: string; description: string; badge: string; icon: React.ReactNode }> = {
  'MTC USER': {
    label: "MTC Facility User",
    description: "Operates local clinical bed records and registers entries under `mtc_users` table.",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: <Building2 className="w-4 h-4" />
  },
  'DISTRICT USER': {
    label: "District Level User",
    description: "Manages district-wide facilities and registers entries under `mtc_district_user` table.",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    icon: <SlidersHorizontal className="w-4 h-4" />
  },
  'STATE USER': {
    label: "State Nodal User",
    description: "State-wide oversight account and registers entries under `mtc_state_user` table.",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    icon: <UserCheck className="w-4 h-4" />
  }
};

const DISTRICTS = [
  "BOKARO", "CHATRA", "DEOGHAR", "DHANBAD", "DUMKA", "EAST SINGHBHUM", 
  "GARHWA", "GIRIDIH", "GODDA", "GUMLA", "HAZARIBAGH", "JAMTARA", 
  "KHUNTI", "KODERMA", "LATEHAR", "LOHARDAGA", "PAKUR", "PALAMU", 
  "RAMGARH", "RANCHI", "SAHIBGANJ", "SERAIKELA", "SIMDEGA", "WEST SINGHBHUM"
];

export default function CreateOrEditUser({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const userId = resolvedParams.id;
  const isNew = userId === 'new';
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryRole = searchParams.get('role') as UserRole | null;

  const [role, setRole] = useState<UserRole>(queryRole || 'MTC USER');
  const [formData, setFormData] = useState({
    login_id: '',
    district: 'BOKARO',
    mtc_name: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(!isNew);
  const [submitting, setSubmitting] = useState(false);

  // If editing an existing user, load details from API
  useEffect(() => {
    if (!isNew && queryRole) {
      fetch(`/api/admin/users/${userId}?role=${encodeURIComponent(queryRole)}`)
        .then(res => res.json())
        .then(json => {
          if (json.success && json.user) {
            setFormData({
              login_id: json.user.login_id || json.user.username || '',
              district: json.user.district || 'BOKARO',
              mtc_name: json.user.mtc_name || '',
              password: '',
              confirmPassword: ''
            });
            setRole(queryRole);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [userId, isNew, queryRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isNew && formData.password !== formData.confirmPassword) {
      alert("Password and Confirmation Password do not match!");
      return;
    }

    try {
      setSubmitting(true);
      const url = isNew ? '/api/admin/users' : `/api/admin/users/${userId}`;
      const method = isNew ? 'POST' : 'PUT';

      const payload = {
        role,
        district: formData.district,
        mtc_name: formData.mtc_name,
        login_id: formData.login_id,
        password: formData.password
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();

      if (json.success) {
        router.push('/admin/dashboard/management/create-user');
      } else {
        alert(json.error || "Failed to save user.");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen p-8 text-center text-zinc-500 font-mono">Loading user configuration...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-50/60 p-4 md:p-8 font-sans text-zinc-900 selection:bg-indigo-600 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button 
            type="button"
            onClick={() => router.push('/admin/dashboard/management/create-user')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 bg-white px-3.5 py-2 rounded-xl border border-zinc-200 shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </button>
          
          <span className="text-xs font-mono bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-lg border border-zinc-200 font-semibold">
            {isNew ? 'PROVISION NEW RECORD' : `EDITING UID #${userId}`}
          </span>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-zinc-900 via-slate-900 to-zinc-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden border border-zinc-800">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-1">
              <ShieldCheck className="w-4 h-4" /> Tier Authorization
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              {isNew ? 'Create New System User' : 'Update User Account'}
            </h1>
            <p className="text-zinc-400 text-xs mt-1">
              Select the appropriate schema table and assign database login credentials.
            </p>
          </div>
        </div>

        {/* Role Switcher */}
        {isNew && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(Object.keys(ROLE_PRESETS) as UserRole[]).map((r) => {
              const config = ROLE_PRESETS[r];
              const isSelected = role === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected 
                      ? `${config.badge} ring-2 ring-indigo-500/20 shadow-md` 
                      : 'bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                      {config.icon}
                      <span>{r}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-normal">
                    {config.description}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-zinc-100 px-6 py-4 bg-zinc-50/50 flex items-center justify-between">
            <h3 className="text-sm font-black text-zinc-900">
              Database Table Mapping: <span className="font-mono text-indigo-600">{role === 'MTC USER' ? 'mtc_users' : role === 'DISTRICT USER' ? 'mtc_district_user' : 'mtc_state_user'}</span>
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Login ID / Username */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Login ID / Username <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. CHAS or BOKARO"
                    value={formData.login_id}
                    onChange={(e) => setFormData({ ...formData, login_id: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:border-indigo-600 focus:bg-white text-zinc-800 uppercase"
                  />
                </div>
              </div>

              {/* District Field (if not state user) */}
              {role !== 'STATE USER' && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    District <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:border-indigo-600 focus:bg-white text-zinc-800 cursor-pointer"
                    >
                      {DISTRICTS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* MTC Name (if MTC USER) */}
              {role === 'MTC USER' && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    MTC Centre Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CHAS, GOMIA, PETERWAR"
                    value={formData.mtc_name}
                    onChange={(e) => setFormData({ ...formData, mtc_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:border-indigo-600 focus:bg-white text-zinc-800 uppercase"
                  />
                </div>
              )}

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  {isNew ? 'Password' : 'New Password (Leave blank to keep current)'} {isNew && <span className="text-rose-500">*</span>}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="password"
                    required={isNew}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-mono focus:border-indigo-600 focus:bg-white text-zinc-800"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              {isNew && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-mono focus:border-indigo-600 focus:bg-white text-zinc-800"
                    />
                  </div>
                </div>
              )}

            </div>

            <div className="pt-4 border-t border-zinc-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard/management/create-user')}
                className="px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 font-bold text-xs uppercase tracking-wider hover:bg-zinc-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                {submitting ? 'Saving...' : isNew ? 'Create User' : 'Update Record'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}