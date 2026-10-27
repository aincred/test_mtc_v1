// // // // "use client";

// // // // import { useState } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { RefreshCw, User, Loader2 } from "lucide-react";
// // // // import toast from "react-hot-toast";

// // // // export default function MtcUserLogin() {
// // // //   const [username, setUsername] = useState("");
// // // //   const [password, setPassword] = useState("");
// // // //   const [captcha, setCaptcha] = useState("");
// // // //   const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
// // // //   const [loading, setLoading] = useState(false);
// // // //   const router = useRouter();

// // // //   // ✅ Generate random captcha
// // // //   function generateCaptcha() {
// // // //     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
// // // //     return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
// // // //   }

// // // //   const handleRefreshCaptcha = () => {
// // // //     setCaptchaCode(generateCaptcha());
// // // //     setCaptcha("");
// // // //   };

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);

// // // //     // ✅ Captcha validation
// // // //     if (captcha.trim() !== captchaCode) {
// // // //       toast.error("Invalid Captcha. Please try again.");
// // // //       handleRefreshCaptcha();
// // // //       setLoading(false);
// // // //       return;
// // // //     }

// // // //     // ✅ Hardcoded login validation
// // // //     await new Promise((res) => setTimeout(res, 1000)); // simulate network delay

// // // //     if (username === "admin@example.com" && password === "123@admin") {
// // // //       toast.success("Login successful! Redirecting...");
// // // //       setTimeout(() => router.push("/mtc-user/dashboard/home"), 1500);
// // // //     } else {
// // // //       toast.error("Invalid username or password!");
// // // //     }

// // // //     setLoading(false);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-green-700 to-blue-500">
// // // //       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 space-y-6 relative">
// // // //         {/* Avatar */}
// // // //         <div className="flex justify-center -mt-16">
// // // //           <div className="bg-yellow-500 rounded-full p-4 shadow-lg">
// // // //             <User className="text-white w-10 h-10" />
// // // //           </div>
// // // //         </div>

// // // //         <h2 className="text-2xl font-semibold text-center text-yellow-600 mt-2">
// // // //           MTC User Login
// // // //         </h2>

// // // //         <form onSubmit={handleSubmit} className="space-y-4">
// // // //           {/* Username */}
// // // //           <input
// // // //             type="text"
// // // //             placeholder="User Name"
// // // //             value={username}
// // // //             onChange={(e) => setUsername(e.target.value)}
// // // //             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400"
// // // //             required
// // // //           />

// // // //           {/* Password */}
// // // //           <input
// // // //             type="password"
// // // //             placeholder="Password"
// // // //             value={password}
// // // //             onChange={(e) => setPassword(e.target.value)}
// // // //             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400"
// // // //             required
// // // //           />

// // // //           {/* Captcha */}
// // // //           <div>
// // // //             <label className="block text-gray-700 mb-1">Captcha Image</label>
// // // //             <div className="relative bg-gray-100 border rounded-lg text-center w-full py-3 font-mono tracking-widest text-lg text-gray-700 select-none">
// // // //               {captchaCode}
// // // //             </div>
// // // //             <div className="flex items-center mt-2 space-x-2">
// // // //               <input
// // // //                 type="text"
// // // //                 placeholder="Enter Captcha"
// // // //                 value={captcha}
// // // //                 onChange={(e) => setCaptcha(e.target.value)}
// // // //                 className="flex-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400"
// // // //                 required
// // // //               />
// // // //               <button
// // // //                 type="button"
// // // //                 onClick={handleRefreshCaptcha}
// // // //                 className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
// // // //               >
// // // //                 <RefreshCw size={20} />
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           {/* Submit Button */}
// // // //           <button
// // // //             type="submit"
// // // //             disabled={loading}
// // // //             className={`w-full flex items-center justify-center gap-2 font-semibold py-2.5 rounded-lg transition text-white ${
// // // //               loading
// // // //                 ? "bg-yellow-400 cursor-not-allowed"
// // // //                 : "bg-yellow-500 hover:bg-yellow-600"
// // // //             }`}
// // // //           >
// // // //             {loading ? (
// // // //               <>
// // // //                 <Loader2 className="w-5 h-5 animate-spin" /> Logging in...
// // // //               </>
// // // //             ) : (
// // // //               "Login"
// // // //             )}
// // // //           </button>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { RefreshCw, User, Loader2 } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";

// // export default function MtcUserLogin() {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [captcha, setCaptcha] = useState("");
// //   const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
// //   const [loading, setLoading] = useState(false);
// //   const router = useRouter();

// //   function generateCaptcha() {
// //     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
// //     return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
// //   }

// //   const handleRefreshCaptcha = () => {
// //     setCaptchaCode(generateCaptcha());
// //     setCaptcha("");
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     if (captcha.trim().toUpperCase() !== captchaCode) {
// //       toast.error("Invalid Captcha. Please try again.");
// //       handleRefreshCaptcha();
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const res = await fetch('/api/mtc-login', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ username, password })
// //       });

// //       const data = await res.json();

// //       if (res.ok && data.success) {
// //         toast.success(`Welcome back, MTC ${data.user.mtcName}!`);
        
// //         // SAVE user data to session storage so the dashboard knows who is logged in
// //         sessionStorage.setItem("mtc_user", JSON.stringify(data.user));
        
// //         setTimeout(() => router.push("/mtc-user/dashboard/home"), 1500);
// //       } else {
// //         toast.error(data.error || "Invalid username or password!");
// //         handleRefreshCaptcha(); 
// //       }
// //     } catch (error) {
// //       console.error("Login request failed:", error);
// //       toast.error("An error occurred connecting to the server.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-700 to-blue-500">
// //       <Toaster position="top-center" />
// //       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 space-y-6 relative">
// //         <div className="flex justify-center -mt-16">
// //           <div className="bg-yellow-500 rounded-full p-4 shadow-lg">
// //             <User className="text-white w-10 h-10" />
// //           </div>
// //         </div>

// //         <h2 className="text-2xl font-semibold text-center text-yellow-600 mt-2">
// //           MTC User Login
// //         </h2>

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <input
// //             type="text"
// //             placeholder="Login ID (e.g., CHAS, BERO)"
// //             value={username}
// //             onChange={(e) => setUsername(e.target.value)}
// //             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 text-gray-800 uppercase"
// //             required
// //           />

// //           <input
// //             type="password"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 text-gray-800"
// //             required
// //           />

// //           <div>
// //             <label className="block text-gray-700 mb-1 text-sm font-medium">Captcha Verification</label>
// //             <div className="relative bg-gray-100 border rounded-lg text-center w-full py-3 font-mono tracking-widest text-xl text-gray-800 select-none">
// //               {captchaCode}
// //             </div>
// //             <div className="flex items-center mt-2 space-x-2">
// //               <input
// //                 type="text"
// //                 placeholder="Enter Captcha"
// //                 value={captcha}
// //                 onChange={(e) => setCaptcha(e.target.value)}
// //                 className="flex-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 text-gray-800 uppercase"
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={handleRefreshCaptcha}
// //                 className="bg-yellow-500 hover:bg-yellow-600 text-white p-2.5 rounded-lg transition-colors"
// //               >
// //                 <RefreshCw size={24} />
// //               </button>
// //             </div>
// //           </div>

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-lg transition text-white mt-4 ${
// //               loading ? "bg-yellow-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600 shadow-md"
// //             }`}
// //           >
// //             {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</> : "Login to Dashboard"}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { RefreshCw, Loader2, KeyRound } from "lucide-react";
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
//     <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
//       <Toaster position="top-center" />

//       {/* Corporate Style Background Elements */}
//       <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />
//       <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />

//       {/* Main Login Card Wrapper */}
//       <div className="w-full max-w-md z-10 space-y-6">
        
//         {/* Simplified Branding Elements above the Box */}
//         <div className="flex flex-col items-center space-y-2 text-center">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center p-0.5 shadow-sm">
//               <span className="text-[6px] font-bold text-emerald-800 leading-none tracking-tighter">GOVT. SEAL</span>
//             </div>
//             <h1 className="text-lg font-bold text-[#2e1f5e] tracking-tight uppercase">
//               Malnutrition Treatment Center
//             </h1>
//           </div>
//           <p className="text-[11px] font-semibold text-orange-600 tracking-wide uppercase">
//             Govt. of Jharkhand • NHM Initiative
//           </p>
//         </div>

//         {/* Login Form Box */}
//         <div className="bg-white rounded-xl shadow-xl p-8 border border-slate-200">
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-3.5 shadow-md shadow-orange-500/20">
//               <KeyRound className="text-white w-6 h-6" />
//             </div>
//           </div>

//           <h2 className="text-xl font-bold text-center text-slate-800 uppercase tracking-wide">
//             MTC Portal Login
//           </h2>
//           <p className="text-xs text-center text-gray-500 mt-1 mb-6">
//             Enter your credentials to access the tracking dashboard
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Login ID</label>
//               <input
//                 type="text"
//                 placeholder="e.g., CHAS, BERO"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2e1f5e]/20 focus:border-[#2e1f5e] text-gray-800 uppercase transition-all placeholder:normal-case font-medium"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Password</label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2e1f5e]/20 focus:border-[#2e1f5e] text-gray-800 transition-all"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Captcha Verification</label>
//               <div className="relative bg-slate-100 border border-slate-200 rounded-lg text-center w-full py-2.5 font-mono tracking-widest text-xl font-bold text-slate-700 select-none shadow-inner bg-opacity-70">
//                 {captchaCode}
//               </div>
              
//               <div className="flex items-center mt-2 space-x-2">
//                 <input
//                   type="text"
//                   placeholder="Enter Captcha"
//                   value={captcha}
//                   onChange={(e) => setCaptcha(e.target.value)}
//                   className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2e1f5e]/20 focus:border-[#2e1f5e] text-gray-800 uppercase transition-all"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={handleRefreshCaptcha}
//                   className="bg-slate-700 hover:bg-slate-800 text-white p-3 rounded-lg transition-colors shadow-sm"
//                   title="Refresh Captcha"
//                 >
//                   <RefreshCw size={20} />
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-lg transition-all text-white mt-6 tracking-wide shadow-md ${
//                 loading 
//                   ? "bg-orange-400 cursor-not-allowed" 
//                   : "bg-orange-500 hover:bg-orange-600 active:transform active:scale-[0.99] shadow-orange-500/20"
//               }`}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" /> 
//                   Authenticating...
//                 </>
//               ) : (
//                 "LOGIN TO DASHBOARD"
//               )}
//             </button>
//           </form>
//         </div>
        
//         {/* Sub-text footer details */}
//         <p className="text-center text-[11px] text-gray-400 font-medium">
//           Secure Cloud System • Malnutrition Management Portal
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useEndSessionOnLoginPage } from "@/app/_components/session";
import toast, { Toaster } from "react-hot-toast";
import {
  Hospital,
  Lock,
  User,
  Eye,
  EyeOff,
  RotateCw,
  Activity,
  Plus,
  Heart,
  Shield,
  ShieldCheck,
  Microscope,
  Pill,
  Dna,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function MtcUserLogin() {
  const router = useRouter();
  useEndSessionOnLoginPage("mtc"); // returning to the main page kills the session

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [loading, setLoading] = useState(false);

  const captchaCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const generateCaptcha = () => {
    const canvas = captchaCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);

    // Distortion noise lines
    for (let i = 0; i < 7; i++) {
      ctx.strokeStyle = `rgba(37, 99, 235, ${0.15 + Math.random() * 0.25})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Rotated text characters
    ctx.font = "italic bold 22px 'Plus Jakarta Sans', monospace";
    ctx.fillStyle = "#1e3a8a";
    ctx.textBaseline = "middle";

    const startX = 16;
    for (let i = 0; i < code.length; i++) {
      ctx.save();
      const x = startX + i * 24;
      const y = canvas.height / 2 + (Math.random() * 4 - 2);
      const angle = Math.random() * 0.3 - 0.15;
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillText(code[i], 0, 0);
      ctx.restore();
    }

    // Dot noise
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(99, 102, 241, ${Math.random() * 0.4})`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useEffect(() => {
    generateCaptcha();

    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(37, 99, 235, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRefreshCaptcha = () => {
    generateCaptcha();
    setCaptchaInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaCode) return;

    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      toast.error("Invalid Captcha. Please try again.");
      handleRefreshCaptcha();
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/mtc-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(`Welcome back, MTC ${data.user?.mtcName || username}!`);
        sessionStorage.setItem("mtc_user", JSON.stringify(data.user));
        setTimeout(() => router.push("/mtc-user/dashboard/home"), 1000);
      } else {
        toast.error(data.error || "Invalid username or password!");
        handleRefreshCaptcha();
        setPassword("");
      }
    } catch (error) {
      console.error("Login request failed:", error);
      toast.error("An error occurred connecting to the server.");
      handleRefreshCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-800 flex flex-col justify-between relative selection:bg-blue-500 selection:text-white bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 overflow-x-hidden">
      <Toaster position="top-center" />

      {/* Ambient Lighting Background */}
      <div className="ambient-glow bg-blue-300/40 w-[500px] h-[500px] -top-32 -left-32" />
      <div className="ambient-glow bg-indigo-300/40 w-[600px] h-[600px] -bottom-40 -right-40" />
      <div className="ambient-glow bg-cyan-200/50 w-[400px] h-[400px] top-1/2 left-1/3 -translate-y-1/2" />

      {/* Interactive Floating Particle Background */}
      <canvas ref={bgCanvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Main Content Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 md:p-8 min-h-screen">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          
          {/* LEFT SECTION: Artwork & Mission Statement */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100/90 text-blue-700 text-xs font-bold tracking-wide uppercase border border-blue-200 shadow-sm">
                <Activity className="w-3.5 h-3.5" />
                <span>Building a Malnutrition-Free Jharkhand • Standing Quality</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Healthy Children, <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Brighter Tomorrow
                </span>
              </h2>

              <div className="flex items-center space-x-3 text-sm font-semibold text-slate-600 pt-1">
                <span>Care</span>
                <span className="text-blue-400">•</span>
                <span>Science</span>
                <span className="text-blue-400">•</span>
                <span>Hope</span>

                <div className="flex items-center space-x-1 pl-2 text-blue-600">
                  <Heart className="w-4 h-4 fill-blue-600 animate-bounce" />
                  <svg className="w-24 h-6 text-blue-500" viewBox="0 0 100 25">
                    <path
                      d="M0,12 L30,12 L35,5 L40,20 L45,2 L50,22 L55,12 L100,12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="ecg-line"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Pediatric Illustration Hero Box */}
            <div className="relative w-full h-[320px] sm:h-[380px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-transparent rounded-3xl p-6 border border-white/60 flex items-center justify-center overflow-hidden shadow-inner">
              <svg className="w-full h-full max-w-md drop-shadow-xl" viewBox="0 0 500 400" fill="none">
                <defs>
                  <linearGradient id="skinGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFDFC4" />
                    <stop offset="100%" stopColor="#F0C0A6" />
                  </linearGradient>
                  <linearGradient id="coatGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>
                  <linearGradient id="scrubGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#93C5FD" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                  <linearGradient id="bedGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#CBD5E1" />
                    <stop offset="100%" stopColor="#94A3B8" />
                  </linearGradient>
                </defs>

                <rect x="180" y="270" width="260" height="20" rx="10" fill="url(#bedGrad)" />
                <rect x="190" y="290" width="12" height="70" rx="4" fill="#64748B" />
                <rect x="410" y="290" width="12" height="70" rx="4" fill="#64748B" />
                <rect x="170" y="230" width="20" height="60" rx="6" fill="#94A3B8" />
                <rect x="360" y="245" width="70" height="30" rx="8" fill="#FFFFFF" />

                {/* Doctor */}
                <g id="doctor">
                  <path d="M120 120 C100 80, 170 70, 180 110 C185 130, 160 140, 120 120 Z" fill="#472A19" />
                  <circle cx="145" cy="130" r="35" fill="url(#skinGrad)" />
                  <circle cx="112" cy="132" r="6" fill="#F0C0A6" />
                  <circle cx="135" cy="130" r="4" fill="#334155" />
                  <circle cx="158" cy="130" r="4" fill="#334155" />
                  <path d="M137 148 Q146 158 155 148" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M100 170 C90 190, 80 260, 95 340 L195 340 C205 260, 200 190, 190 170 Z" fill="url(#coatGrad)" />
                  <polygon points="145,170 135,210 155,210" fill="#2563EB" />
                  <path d="M125 170 C125 210, 165 220, 175 200 L210 230" stroke="#475569" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <circle cx="212" cy="232" r="8" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
                </g>

                {/* Child Patient */}
                <g id="child">
                  <path d="M360 160 C340 120, 410 120, 420 160 C425 180, 400 190, 360 160 Z" fill="#3F2314" />
                  <circle cx="345" cy="165" r="10" fill="#3F2314" />
                  <circle cx="425" cy="165" r="10" fill="#3F2314" />
                  <circle cx="385" cy="175" r="30" fill="url(#skinGrad)" />
                  <circle cx="375" cy="175" r="3.5" fill="#1E293B" />
                  <circle cx="395" cy="175" r="3.5" fill="#1E293B" />
                  <path d="M378 190 Q385 198 392 190" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M345 210 Q385 200 425 210 L435 270 L335 270 Z" fill="url(#scrubGrad)" />
                  <circle cx="325" cy="225" r="8" fill="url(#skinGrad)" />
                  <path d="M322 220 L322 210" stroke="#F0C0A6" strokeWidth="4" strokeLinecap="round" />
                </g>

                {/* Teddy Bear */}
                <g id="teddy">
                  <circle cx="370" cy="240" r="16" fill="#D97706" />
                  <circle cx="358" cy="228" r="6" fill="#B45309" />
                  <circle cx="382" cy="228" r="6" fill="#B45309" />
                  <circle cx="370" cy="242" r="4" fill="#78350F" />
                </g>
              </svg>

              {/* Floating Medical Hexagon Icons */}
              <div
                className="absolute top-6 right-20 w-14 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg text-white animate-bounce transition-transform cursor-pointer"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              >
                <Microscope className="w-6 h-6" />
              </div>

              <div
                className="absolute top-24 right-36 w-12 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-md text-white hover:scale-110 transition-transform cursor-pointer"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              >
                <Activity className="w-5 h-5" />
              </div>

              <div
                className="absolute top-24 right-6 w-12 h-14 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md text-white hover:scale-110 transition-transform cursor-pointer"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              >
                <Pill className="w-5 h-5" />
              </div>

              <div
                className="absolute bottom-20 right-14 w-14 h-16 bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center shadow-lg text-white hover:scale-110 transition-transform cursor-pointer"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              >
                <Dna className="w-6 h-6" />
              </div>
            </div>

            {/* Bottom Mission Badge */}
            <div className="glass-pill rounded-full p-2.5 px-5 flex items-center justify-between shadow-lg max-w-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Our Mission</h4>
                  <p className="text-xs text-slate-600 font-medium">Better Healthcare | Better Future | Better Lives</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                <Heart className="w-4 h-4 fill-blue-600" />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: MTC User Login Glass Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md glass-card rounded-3xl p-8 relative overflow-hidden transition-all duration-300">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />

              {/* Header Icon Badge */}
              <div className="flex flex-col items-center text-center space-y-3 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-1 shadow-xl">
                    <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-white">
                      <Hospital className="w-9 h-9 text-blue-400" />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white text-[10px]">
                    ✓
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">MTC User</h3>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 mt-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Center Operations Portal</span>
                  </div>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Login ID / Username */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">
                    Login ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="e.g., CHAS, BERO"
                      value={username}
                      disabled={loading}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/90 border border-slate-200 rounded-xl text-sm font-medium uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm placeholder:text-slate-400 placeholder:normal-case disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      disabled={loading}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-white/90 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm placeholder:text-slate-400 disabled:opacity-60"
                    />
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 disabled:opacity-60"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Captcha Verification */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Captcha Verification</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="relative flex-1 h-12 rounded-xl border border-slate-200 captcha-bg overflow-hidden flex items-center justify-center select-none shadow-inner">
                      <canvas ref={captchaCanvasRef} width={180} height={48} className="w-full h-full" />
                    </div>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleRefreshCaptcha}
                      title="Refresh Captcha"
                      className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-md shadow-blue-500/20 disabled:opacity-60"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Shield className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Enter Captcha"
                      value={captchaInput}
                      disabled={loading}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/90 border border-slate-200 rounded-xl text-sm font-semibold tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm placeholder:text-slate-400 placeholder:normal-case disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center space-x-2 transition-all active:scale-[0.99] disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                  <span>{loading ? "Authenticating..." : "Login to Dashboard"}</span>
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              {/* Security Footer Note */}
              <div className="mt-6 text-center flex items-center justify-center space-x-1.5 text-xs text-slate-500 font-medium">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span>Center session protected & encrypted</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Page Footer */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-slate-500 font-medium">
        <p>© 2026 Malnutrition Treatment Center (MTC) Portal. National Health Mission, Government of Jharkhand.</p>
      </footer>
    </div>
  );
}