// // // "use client";

// // // import { useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { RefreshCw, User, Loader2 } from "lucide-react";
// // // import toast from "react-hot-toast";

// // // export default function MtcUserLogin() {
// // //   const [username, setUsername] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [captcha, setCaptcha] = useState("");
// // //   const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
// // //   const [loading, setLoading] = useState(false);
// // //   const router = useRouter();

// // //   // ✅ Generate random captcha
// // //   function generateCaptcha() {
// // //     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
// // //     return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
// // //   }

// // //   const handleRefreshCaptcha = () => {
// // //     setCaptchaCode(generateCaptcha());
// // //     setCaptcha("");
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setLoading(true);

// // //     // ✅ Captcha validation
// // //     if (captcha.trim() !== captchaCode) {
// // //       toast.error("Invalid Captcha. Please try again.");
// // //       handleRefreshCaptcha();
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     // ✅ Hardcoded login validation
// // //     await new Promise((res) => setTimeout(res, 1000)); // simulate network delay

// // //     if (username === "admin@example.com" && password === "123@admin") {
// // //       toast.success("Login successful! Redirecting...");
// // //       setTimeout(() => router.push("/mtc-user/dashboard/home"), 1500);
// // //     } else {
// // //       toast.error("Invalid username or password!");
// // //     }

// // //     setLoading(false);
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-green-700 to-blue-500">
// // //       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 space-y-6 relative">
// // //         {/* Avatar */}
// // //         <div className="flex justify-center -mt-16">
// // //           <div className="bg-yellow-500 rounded-full p-4 shadow-lg">
// // //             <User className="text-white w-10 h-10" />
// // //           </div>
// // //         </div>

// // //         <h2 className="text-2xl font-semibold text-center text-yellow-600 mt-2">
// // //           MTC User Login
// // //         </h2>

// // //         <form onSubmit={handleSubmit} className="space-y-4">
// // //           {/* Username */}
// // //           <input
// // //             type="text"
// // //             placeholder="User Name"
// // //             value={username}
// // //             onChange={(e) => setUsername(e.target.value)}
// // //             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400"
// // //             required
// // //           />

// // //           {/* Password */}
// // //           <input
// // //             type="password"
// // //             placeholder="Password"
// // //             value={password}
// // //             onChange={(e) => setPassword(e.target.value)}
// // //             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400"
// // //             required
// // //           />

// // //           {/* Captcha */}
// // //           <div>
// // //             <label className="block text-gray-700 mb-1">Captcha Image</label>
// // //             <div className="relative bg-gray-100 border rounded-lg text-center w-full py-3 font-mono tracking-widest text-lg text-gray-700 select-none">
// // //               {captchaCode}
// // //             </div>
// // //             <div className="flex items-center mt-2 space-x-2">
// // //               <input
// // //                 type="text"
// // //                 placeholder="Enter Captcha"
// // //                 value={captcha}
// // //                 onChange={(e) => setCaptcha(e.target.value)}
// // //                 className="flex-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400"
// // //                 required
// // //               />
// // //               <button
// // //                 type="button"
// // //                 onClick={handleRefreshCaptcha}
// // //                 className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
// // //               >
// // //                 <RefreshCw size={20} />
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Submit Button */}
// // //           <button
// // //             type="submit"
// // //             disabled={loading}
// // //             className={`w-full flex items-center justify-center gap-2 font-semibold py-2.5 rounded-lg transition text-white ${
// // //               loading
// // //                 ? "bg-yellow-400 cursor-not-allowed"
// // //                 : "bg-yellow-500 hover:bg-yellow-600"
// // //             }`}
// // //           >
// // //             {loading ? (
// // //               <>
// // //                 <Loader2 className="w-5 h-5 animate-spin" /> Logging in...
// // //               </>
// // //             ) : (
// // //               "Login"
// // //             )}
// // //           </button>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { RefreshCw, User, Loader2 } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// export default function MtcUserLogin() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [captcha, setCaptcha] = useState("");
//   const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   function generateCaptcha() {
//     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
//     return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
//   }

//   const handleRefreshCaptcha = () => {
//     setCaptchaCode(generateCaptcha());
//     setCaptcha("");
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     if (captcha.trim().toUpperCase() !== captchaCode) {
//       toast.error("Invalid Captcha. Please try again.");
//       handleRefreshCaptcha();
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch('/api/mtc-login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         toast.success(`Welcome back, MTC ${data.user.mtcName}!`);
        
//         // SAVE user data to session storage so the dashboard knows who is logged in
//         sessionStorage.setItem("mtc_user", JSON.stringify(data.user));
        
//         setTimeout(() => router.push("/mtc-user/dashboard/home"), 1500);
//       } else {
//         toast.error(data.error || "Invalid username or password!");
//         handleRefreshCaptcha(); 
//       }
//     } catch (error) {
//       console.error("Login request failed:", error);
//       toast.error("An error occurred connecting to the server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-700 to-blue-500">
//       <Toaster position="top-center" />
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 space-y-6 relative">
//         <div className="flex justify-center -mt-16">
//           <div className="bg-yellow-500 rounded-full p-4 shadow-lg">
//             <User className="text-white w-10 h-10" />
//           </div>
//         </div>

//         <h2 className="text-2xl font-semibold text-center text-yellow-600 mt-2">
//           MTC User Login
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Login ID (e.g., CHAS, BERO)"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 text-gray-800 uppercase"
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 text-gray-800"
//             required
//           />

//           <div>
//             <label className="block text-gray-700 mb-1 text-sm font-medium">Captcha Verification</label>
//             <div className="relative bg-gray-100 border rounded-lg text-center w-full py-3 font-mono tracking-widest text-xl text-gray-800 select-none">
//               {captchaCode}
//             </div>
//             <div className="flex items-center mt-2 space-x-2">
//               <input
//                 type="text"
//                 placeholder="Enter Captcha"
//                 value={captcha}
//                 onChange={(e) => setCaptcha(e.target.value)}
//                 className="flex-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 text-gray-800 uppercase"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={handleRefreshCaptcha}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white p-2.5 rounded-lg transition-colors"
//               >
//                 <RefreshCw size={24} />
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-lg transition text-white mt-4 ${
//               loading ? "bg-yellow-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600 shadow-md"
//             }`}
//           >
//             {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</> : "Login to Dashboard"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Loader2, KeyRound } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function MtcUserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }

  const handleRefreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setCaptcha("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (captcha.trim().toUpperCase() !== captchaCode) {
      toast.error("Invalid Captcha. Please try again.");
      handleRefreshCaptcha();
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/mtc-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(`Welcome back, MTC ${data.user.mtcName}!`);
        sessionStorage.setItem("mtc_user", JSON.stringify(data.user));
        setTimeout(() => router.push("/mtc-user/dashboard/home"), 1500);
      } else {
        toast.error(data.error || "Invalid username or password!");
        handleRefreshCaptcha(); 
      }
    } catch (error) {
      console.error("Login request failed:", error);
      toast.error("An error occurred connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <Toaster position="top-center" />

      {/* Corporate Style Background Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />

      {/* Main Login Card Wrapper */}
      <div className="w-full max-w-md z-10 space-y-6">
        
        {/* Simplified Branding Elements above the Box */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center p-0.5 shadow-sm">
              <span className="text-[6px] font-bold text-emerald-800 leading-none tracking-tighter">GOVT. SEAL</span>
            </div>
            <h1 className="text-lg font-bold text-[#2e1f5e] tracking-tight uppercase">
              Malnutrition Treatment Center
            </h1>
          </div>
          <p className="text-[11px] font-semibold text-orange-600 tracking-wide uppercase">
            Govt. of Jharkhand • NHM Initiative
          </p>
        </div>

        {/* Login Form Box */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-3.5 shadow-md shadow-orange-500/20">
              <KeyRound className="text-white w-6 h-6" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-center text-slate-800 uppercase tracking-wide">
            MTC Portal Login
          </h2>
          <p className="text-xs text-center text-gray-500 mt-1 mb-6">
            Enter your credentials to access the tracking dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Login ID</label>
              <input
                type="text"
                placeholder="e.g., CHAS, BERO"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2e1f5e]/20 focus:border-[#2e1f5e] text-gray-800 uppercase transition-all placeholder:normal-case font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2e1f5e]/20 focus:border-[#2e1f5e] text-gray-800 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Captcha Verification</label>
              <div className="relative bg-slate-100 border border-slate-200 rounded-lg text-center w-full py-2.5 font-mono tracking-widest text-xl font-bold text-slate-700 select-none shadow-inner bg-opacity-70">
                {captchaCode}
              </div>
              
              <div className="flex items-center mt-2 space-x-2">
                <input
                  type="text"
                  placeholder="Enter Captcha"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2e1f5e]/20 focus:border-[#2e1f5e] text-gray-800 uppercase transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={handleRefreshCaptcha}
                  className="bg-slate-700 hover:bg-slate-800 text-white p-3 rounded-lg transition-colors shadow-sm"
                  title="Refresh Captcha"
                >
                  <RefreshCw size={20} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-lg transition-all text-white mt-6 tracking-wide shadow-md ${
                loading 
                  ? "bg-orange-400 cursor-not-allowed" 
                  : "bg-orange-500 hover:bg-orange-600 active:transform active:scale-[0.99] shadow-orange-500/20"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> 
                  Authenticating...
                </>
              ) : (
                "LOGIN TO DASHBOARD"
              )}
            </button>
          </form>
        </div>
        
        {/* Sub-text footer details */}
        <p className="text-center text-[11px] text-gray-400 font-medium">
          Secure Cloud System • Malnutrition Management Portal
        </p>
      </div>
    </div>
  );
}