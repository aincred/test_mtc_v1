"use client";

import { useState, useEffect } from "react";
import { RefreshCw, User, AlertCircle, CheckCircle } from "lucide-react";

export default function StateUserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  
  // FIX: Initialize with empty string so server and client match initially
  const [captchaCode, setCaptchaCode] = useState(""); 
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: "", message: "" });

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }

  // FIX: Generate the random value only after the component mounts on the client
  useEffect(() => {
    setCaptchaCode(generateCaptcha());
  }, []);

  const handleRefreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setCaptcha("");
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaCode) return; // Prevent submit if captcha hasn't loaded

    if (captcha.trim().toUpperCase() !== captchaCode) {
      setStatus({ type: "error", message: "Invalid Captcha. Please try again." });
      handleRefreshCaptcha();
      return;
    }
    
    setStatus({ type: "success", message: `Welcome, ${username || "State User"}!` });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-green-700 to-green-500 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 space-y-6 relative mt-10">
        <div className="flex justify-center -mt-16 absolute left-0 right-0 top-0">
          <div className="bg-green-600 rounded-full p-4 shadow-lg border-4 border-white">
            <User className="text-white w-10 h-10" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center text-green-700 pt-8">
          State User
        </h2>

        {status.message && (
          <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
            status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {status.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Security Check</label>
            
            {/* Captcha Display */}
            <div className="relative bg-gray-100 border border-gray-300 rounded-lg text-center w-full py-3 font-mono tracking-[0.5em] text-xl font-bold text-gray-700 select-none">
              {/* Show a placeholder or loading state if not yet mounted to avoid layout shift */}
              {captchaCode || "Wait..."}
              
              {/* Optional: Add some noise/lines purely with CSS if desired, simplified here */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
            </div>

            <div className="flex items-center mt-3 gap-2">
              <input
                type="text"
                placeholder="Type the characters above"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none uppercase"
                required
              />
              <button
                type="button"
                onClick={handleRefreshCaptcha}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-300 p-2.5 rounded-lg transition-colors"
                title="Refresh Captcha"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] mt-4"
          >
            Login Securely
          </button>
        </form>
      </div>
    </div>
  );
}