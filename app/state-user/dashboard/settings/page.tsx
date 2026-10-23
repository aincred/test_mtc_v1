"use client";

import React, { useState, useEffect } from "react";
import {
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCcw,
  RefreshCw,
  Edit3,
} from "lucide-react";

interface UserProfile {
  username: string;
  name: string;
  email: string;
  role: string;
  state: string;
  department: string;
  assignedDistrict: string;
}

export default function UserSettingsPage() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: "SMTC", // Corresponds to public.mtc_state_user
    name: "Dr. Ananya Sharma",
    email: "ananya.sharma@jharkhand.gov.in",
    role: "State Admin",
    state: "Jharkhand",
    department: "National Health Mission (NHM)",
    assignedDistrict: "All Districts (State Level)",
  });

  const [profileSuccess, setProfileSuccess] = useState(false);

  // Password Form State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password Visibility Toggles
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // CAPTCHA State
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [userInputCaptcha, setUserInputCaptcha] = useState("");

  // Form Feedback State
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate CAPTCHA
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(captcha);
    setUserInputCaptcha("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  // Submit Password Change to Database API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!oldPassword) {
      setStatusMessage({ type: "error", text: "Please enter your current (old) password." });
      return;
    }

    if (newPassword.length < 8) {
      setStatusMessage({ type: "error", text: "New password must be at least 8 characters long." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: "error", text: "New password and confirm password do not match." });
      return;
    }

    if (userInputCaptcha.trim() !== generatedCaptcha) {
      setStatusMessage({ type: "error", text: "Security Check failed. Incorrect CAPTCHA code." });
      generateCaptcha();
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/mtc-state-user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userProfile.username,
          oldPassword,
          newPassword,
        }),
      });

      let json;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        json = await res.json();
      } else {
        throw new Error(`Server returned HTTP ${res.status}. Verify route exists at app/api/mtc-state-user/change-password/route.ts`);
      }

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to update password.");
      }

      setStatusMessage({
        type: "success",
        text: `Password updated successfully for account "${userProfile.username}"! Please use your new password on your next login.`,
      });

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      generateCaptcha();
    } catch (err: any) {
      console.error("Change Password Error:", err);
      setStatusMessage({ type: "error", text: err.message || "An error occurred while updating the password." });
      generateCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-6 px-4 md:px-8 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-500 text-slate-950 rounded-xl font-bold">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold">State Admin Settings</h1>
              <p className="text-xs text-slate-400">Manage state profile details and security credentials</p>
            </div>
          </div>
          <span className="text-xs bg-slate-800 text-teal-400 px-3 py-1.5 rounded-full border border-slate-700 font-medium">
            State Admin Portal
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Profile Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                {userProfile.name ? userProfile.name.charAt(0) : "A"}
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">{userProfile.name || "State User"}</h2>
                <span className="inline-block bg-teal-50 text-teal-700 text-[11px] font-bold px-2.5 py-0.5 rounded-md mt-1 border border-teal-200">
                  {userProfile.role} ({userProfile.username})
                </span>
                <p className="text-xs text-slate-400 mt-1">{userProfile.email}</p>
              </div>
            </div>

            <form onSubmit={handleProfileSave} className="mt-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Credentials</h3>
                <span className="text-[10px] text-teal-600 font-medium flex items-center gap-1">
                  <Edit3 size={12} /> Editable
                </span>
              </div>

              {profileSuccess && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>Profile details updated locally!</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">State Username</label>
                <select
                  name="username"
                  value={userProfile.username}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-semibold text-slate-800"
                >
                  <option value="SMTC">SMTC</option>
                  <option value="mdnhm">mdnhm</option>
                  <option value="miycncell">miycncell</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={userProfile.name}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">State Jurisdiction</label>
                <input
                  type="text"
                  name="state"
                  value={userProfile.state}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Department</label>
                <input
                  type="text"
                  name="department"
                  value={userProfile.department}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Official Contact Email</label>
                <input
                  type="email"
                  name="email"
                  value={userProfile.email}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Save size={14} /> Update Profile Info
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Change Password Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <KeyRound className="text-teal-600" size={20} />
              <h2 className="text-base font-bold text-slate-900">
                Change Password for ({userProfile.username})
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Update password credentials stored in public.mtc_state_user.
            </p>

            {statusMessage && (
              <div
                className={`p-4 rounded-xl text-xs mb-6 flex items-start gap-3 border ${
                  statusMessage.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-rose-50 border-rose-200 text-rose-800"
                }`}
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>{statusMessage.text}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Old Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Old Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full pl-3 pr-10 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  New Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-3 pr-10 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {newPassword && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength >= 1
                            ? passwordStrength === 1
                              ? "w-1/4 bg-rose-500"
                              : passwordStrength === 2
                              ? "w-2/4 bg-amber-500"
                              : passwordStrength === 3
                              ? "w-3/4 bg-blue-500"
                              : "w-full bg-emerald-500"
                            : "w-0"
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm New Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className={`w-full pl-3 pr-10 py-2.5 border rounded-xl text-xs focus:ring-2 focus:outline-none ${
                      confirmPassword && newPassword !== confirmPassword
                        ? "border-rose-300 focus:ring-rose-500"
                        : "border-slate-200 focus:ring-teal-500"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* CAPTCHA */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Security Check <span className="text-rose-500">*</span>
                </label>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex items-center justify-between px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl select-none min-w-[160px] tracking-widest">
                    <span
                      className="font-mono text-base font-bold text-teal-400 italic tracking-widest line-through decoration-slate-600 decoration-2"
                      style={{ letterSpacing: "0.35em" }}
                    >
                      {generatedCaptcha}
                    </span>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="text-slate-400 hover:text-white transition-colors p-1"
                      title="Refresh CAPTCHA"
                    >
                      <RefreshCw size={16} />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={userInputCaptcha}
                    onChange={(e) => setUserInputCaptcha(e.target.value)}
                    placeholder="Enter CAPTCHA text"
                    className="flex-1 px-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>Updating Database...</>
                  ) : (
                    <>
                      <Save size={15} /> Update Password
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setUserInputCaptcha("");
                    generateCaptcha();
                    setStatusMessage(null);
                  }}
                  className="p-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition"
                  title="Reset Form"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}