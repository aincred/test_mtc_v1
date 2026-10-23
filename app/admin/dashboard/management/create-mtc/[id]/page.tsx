"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  UserPlus, 
  Building2, 
  UserCheck, 
  MapPin, 
  Lock, 
  KeyRound, 
  User, 
  CheckCircle,
  Shield,
  Loader2,
  Bed
} from 'lucide-react';

type UserRole = 'MTC_USER' | 'DISTRICT_USER' | 'STATE_USER';

export default function MtcUserProvisioningPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const mtcId = resolvedParams.id;
  const router = useRouter();

  const [mtcInfo, setMtcInfo] = useState<{ district: string; mtc_name: string } | null>(null);
  const [existingUsers, setExistingUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [role, setRole] = useState<UserRole>('MTC_USER');
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    confirmPassword: ''
  });

  const loadMtcAndUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/mtc/${mtcId}/users`);
      const json = await res.json();
      if (json.success) {
        setMtcInfo(json.mtc);
        setExistingUsers(json.users);
        if (!formData.loginId && json.mtc?.mtc_name) {
          setFormData(prev => ({ ...prev, loginId: json.mtc.mtc_name }));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMtcAndUsers();
  }, [mtcId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setSaving(true);
    try {
      const roleMap: Record<UserRole, string> = {
        'MTC_USER': 'MTC USER',
        'DISTRICT_USER': 'DISTRICT USER',
        'STATE_USER': 'STATE USER'
      };

      const payload = {
        role: roleMap[role],
        loginId: formData.loginId,
        password: formData.password,
        district: mtcInfo?.district || '',
        mtcName: mtcInfo?.mtc_name || ''
      };

      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();

      if (json.success) {
        alert("User account registered successfully!");
        setFormData({ loginId: '', password: '', confirmPassword: '' });
        await loadMtcAndUsers();
      } else {
        alert(json.error);
      }
    } catch (err: any) {
      alert("Registration failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-3 md:p-6 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button 
            type="button"
            onClick={() => router.push('/admin/dashboard/management/create-mtc')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to MTC Directory
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">
              MTC Facility ID: <strong className="text-slate-900">#{mtcId}</strong>
            </span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-1">
            <Shield className="w-4 h-4" /> Provision Center Credentials
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            {mtcInfo ? `${mtcInfo.mtc_name} MTC (${mtcInfo.district})` : 'Facility User Provisioning'}
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Directly registers login credentials in <code className="text-indigo-300 font-mono">mtc_users</code>, <code className="text-indigo-300 font-mono">mtc_district_user</code>, or <code className="text-indigo-300 font-mono">mtc_state_user</code>.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setRole('MTC_USER')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              role === 'MTC_USER' ? 'bg-indigo-50 border-indigo-200 text-indigo-700 ring-2 ring-indigo-500/20' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-xs mb-1">
              <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> MTC User (mtc_users)</span>
              {role === 'MTC_USER' && <CheckCircle className="w-4 h-4 text-indigo-600" />}
            </div>
            <p className="text-[11px] text-slate-500">Facility operator for {mtcInfo?.mtc_name || 'this center'}.</p>
          </button>

          <button
            type="button"
            onClick={() => setRole('DISTRICT_USER')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              role === 'DISTRICT_USER' ? 'bg-amber-50 border-amber-200 text-amber-700 ring-2 ring-amber-500/20' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-xs mb-1">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> District User (mtc_district_user)</span>
              {role === 'DISTRICT_USER' && <CheckCircle className="w-4 h-4 text-amber-600" />}
            </div>
            <p className="text-[11px] text-slate-500">Oversees all MTCs in {mtcInfo?.district || 'district'}.</p>
          </button>

          <button
            type="button"
            onClick={() => setRole('STATE_USER')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              role === 'STATE_USER' ? 'bg-violet-50 border-violet-200 text-violet-700 ring-2 ring-violet-500/20' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-xs mb-1">
              <span className="flex items-center gap-1.5"><UserCheck className="w-4 h-4" /> State User (mtc_state_user)</span>
              {role === 'STATE_USER' && <CheckCircle className="w-4 h-4 text-violet-600" />}
            </div>
            <p className="text-[11px] text-slate-500">State-wide authority and administrative auditing.</p>
          </button>
        </div>

        {/* Form */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-4 bg-slate-50 flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-indigo-600" />
              Register Identity Node
            </h2>
            <span className="text-[11px] font-mono uppercase bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold border border-indigo-100">
              Target: {role.replace('_', ' ')}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {role === 'STATE_USER' ? 'Username (username)' : 'Login ID (login_id)'} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. CHAS, GOMIA, or custom ID"
                    value={formData.loginId}
                    onChange={(e) => setFormData({ ...formData, loginId: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black uppercase text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              {role === 'MTC_USER' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Target Center Assignment
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${mtcInfo?.mtc_name || ''} - ${mtcInfo?.district || ''}`}
                    className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-600"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="e.g. abc123"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="e.g. abc123"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard/management/create-mtc')}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-600/10 transition-all cursor-pointer"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserPlus className="w-3.5 h-3.5" />}
                Register Account
              </button>
            </div>
          </form>
        </div>

        {/* Existing Users for this MTC */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-4 bg-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900">Assigned Facility Logins ({mtcInfo?.mtc_name})</h3>
            <span className="text-xs text-slate-500 font-semibold">{existingUsers.length} total users</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="px-5 py-3">Login ID</th>
                  <th className="px-5 py-3">District</th>
                  <th className="px-5 py-3">MTC Name</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-slate-400">Loading accounts...</td>
                  </tr>
                ) : existingUsers.length > 0 ? (
                  existingUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50">
                      <td className="px-5 py-3 font-bold text-slate-900">{u.loginId}</td>
                      <td className="px-5 py-3 text-slate-600">{u.district}</td>
                      <td className="px-5 py-3 text-slate-600">{u.mtcName}</td>
                      <td className="px-5 py-3">
                        <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold border border-indigo-200 text-[10px]">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3" /> Active
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-slate-400 italic">
                      No user accounts currently assigned to this facility node.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}