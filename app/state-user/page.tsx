// // "use client";

// // import { useState, useEffect } from "react";
// // import { RefreshCw, User, AlertCircle, CheckCircle } from "lucide-react";

// // export default function StateUserLogin() {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [captcha, setCaptcha] = useState("");
  
// //   // FIX: Initialize with empty string so server and client match initially
// //   const [captchaCode, setCaptchaCode] = useState(""); 
// //   const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: "", message: "" });

// //   function generateCaptcha() {
// //     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
// //     return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
// //   }

// //   // FIX: Generate the random value only after the component mounts on the client
// //   useEffect(() => {
// //     setCaptchaCode(generateCaptcha());
// //   }, []);

// //   const handleRefreshCaptcha = () => {
// //     setCaptchaCode(generateCaptcha());
// //     setCaptcha("");
// //     setStatus({ type: "", message: "" });
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     if (!captchaCode) return; // Prevent submit if captcha hasn't loaded

// //     if (captcha.trim().toUpperCase() !== captchaCode) {
// //       setStatus({ type: "error", message: "Invalid Captcha. Please try again." });
// //       handleRefreshCaptcha();
// //       return;
// //     }
    
// //     setStatus({ type: "success", message: `Welcome, ${username || "State User"}!` });
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-green-700 to-green-500 p-4">
// //       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 space-y-6 relative mt-10">
// //         <div className="flex justify-center -mt-16 absolute left-0 right-0 top-0">
// //           <div className="bg-green-600 rounded-full p-4 shadow-lg border-4 border-white">
// //             <User className="text-white w-10 h-10" />
// //           </div>
// //         </div>

// //         <h2 className="text-2xl font-semibold text-center text-green-700 pt-8">
// //           State User
// //         </h2>

// //         {status.message && (
// //           <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
// //             status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
// //           }`}>
// //             {status.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
// //             {status.message}
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
// //             <input
// //               type="text"
// //               placeholder="Enter User Name"
// //               value={username}
// //               onChange={(e) => setUsername(e.target.value)}
// //               className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
// //               required
// //             />
// //           </div>
          
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
// //             <input
// //               type="password"
// //               placeholder="Enter Password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">Security Check</label>
            
// //             {/* Captcha Display */}
// //             <div className="relative bg-gray-100 border border-gray-300 rounded-lg text-center w-full py-3 font-mono tracking-[0.5em] text-xl font-bold text-gray-700 select-none">
// //               {/* Show a placeholder or loading state if not yet mounted to avoid layout shift */}
// //               {captchaCode || "Wait..."}
              
// //               {/* Optional: Add some noise/lines purely with CSS if desired, simplified here */}
// //               <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
// //             </div>

// //             <div className="flex items-center mt-3 gap-2">
// //               <input
// //                 type="text"
// //                 placeholder="Type the characters above"
// //                 value={captcha}
// //                 onChange={(e) => setCaptcha(e.target.value)}
// //                 className="flex-1 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none uppercase"
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={handleRefreshCaptcha}
// //                 className="bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-300 p-2.5 rounded-lg transition-colors"
// //                 title="Refresh Captcha"
// //               >
// //                 <RefreshCw size={20} />
// //               </button>
// //             </div>
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] mt-4"
// //           >
// //             Login Securely
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { RefreshCw, User, AlertCircle, CheckCircle } from "lucide-react";

// export default function StateUserLogin() {
//   const router = useRouter();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [captcha, setCaptcha] = useState("");
//   const [captchaCode, setCaptchaCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
//     type: "",
//     message: "",
//   });

//   function generateCaptcha() {
//     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
//     return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
//   }

//   useEffect(() => {
//     setCaptchaCode(generateCaptcha());
//   }, []);

//   const handleRefreshCaptcha = () => {
//     setCaptchaCode(generateCaptcha());
//     setCaptcha("");
//     setStatus({ type: "", message: "" });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!captchaCode) return;

//     // Validate CAPTCHA locally before hitting the backend
//     if (captcha.trim().toUpperCase() !== captchaCode) {
//       setStatus({ type: "error", message: "Invalid Captcha. Please try again." });
//       handleRefreshCaptcha();
//       return;
//     }

//     setLoading(true);
//     setStatus({ type: "", message: "" });

//     try {
//       const response = await fetch("/api/state-user-login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setStatus({ type: "error", message: data.message || "Login failed." });
//         handleRefreshCaptcha();
//       } else {
//         setStatus({ type: "success", message: `Welcome, ${data.user.username}! Redirecting...` });
//         setCaptcha("");
//         setPassword("");
        
//         // Redirect to dashboard on successful login
//         setTimeout(() => {
//           router.push("/state-user/dashboard/home");
//         }, 1000);
//       }
//     } catch (error) {
//       setStatus({ type: "error", message: "Network error. Please try again later." });
//       handleRefreshCaptcha();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-700 to-green-500 p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 space-y-6 relative mt-10">
//         <div className="flex justify-center -mt-16 absolute left-0 right-0 top-0">
//           <div className="bg-green-600 rounded-full p-4 shadow-lg border-4 border-white">
//             <User className="text-white w-10 h-10" />
//           </div>
//         </div>

//         <h2 className="text-2xl font-semibold text-center text-green-700 pt-8">
//           State User
//         </h2>

//         {status.message && (
//           <div
//             className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
//               status.type === "error"
//                 ? "bg-red-50 text-red-700 border border-red-200"
//                 : "bg-green-50 text-green-700 border border-green-200"
//             }`}
//           >
//             {status.type === "error" ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
//             {status.message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//             <input
//               type="text"
//               placeholder="Enter User Name"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-900"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-900"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Security Check</label>

//             <div className="relative bg-gray-100 border border-gray-300 rounded-lg text-center w-full py-3 font-mono tracking-[0.5em] text-xl font-bold text-gray-700 select-none">
//               {captchaCode || "Wait..."}
//             </div>

//             <div className="flex items-center mt-3 gap-2">
//               <input
//                 type="text"
//                 placeholder="Type the characters above"
//                 value={captcha}
//                 onChange={(e) => setCaptcha(e.target.value)}
//                 className="flex-1 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none uppercase text-gray-900"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={handleRefreshCaptcha}
//                 className="bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-300 p-2.5 rounded-lg transition-colors"
//                 title="Refresh Captcha"
//               >
//                 <RefreshCw size={20} />
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] mt-4 disabled:opacity-50"
//           >
//             {loading ? "Authenticating..." : "Login Securely"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useEndSessionOnLoginPage } from "@/app/_components/session";
import {
  User,
  Lock,
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
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Landmark,
} from "lucide-react";

export default function StateUserLogin() {
  const router = useRouter();
  useEndSessionOnLoginPage("state"); // returning to the main page kills the session

  // Form States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
    type: "",
    message: "",
  });

  // Canvas Refs
  const captchaCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate Dynamic Canvas Captcha with Noise & Slanted Text
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

    // Rotated text
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

  // Background Interactive Floating Particles
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
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaCode) return;

    // Validate CAPTCHA locally
    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setStatus({ type: "error", message: "Invalid Captcha code. Please try again." });
      handleRefreshCaptcha();
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/state-user-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: data.message || "Login failed." });
        handleRefreshCaptcha();
      } else {
        setStatus({
          type: "success",
          message: `Welcome, ${data.user?.username || "State User"}! Redirecting...`,
        });
        setCaptchaInput("");
        setPassword("");

        setTimeout(() => {
          router.push("/state-user/dashboard/home");
        }, 1000);
      }
    } catch (error) {
      setStatus({ type: "error", message: "Network error. Please try again later." });
      handleRefreshCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-800 flex flex-col justify-between relative selection:bg-blue-500 selection:text-white bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 overflow-x-hidden">
      {/* Ambient Blur Lighting */}
      <div className="ambient-glow bg-blue-300/40 w-[500px] h-[500px] -top-32 -left-32" />
      <div className="ambient-glow bg-indigo-300/40 w-[600px] h-[600px] -bottom-40 -right-40" />
      <div className="ambient-glow bg-cyan-200/50 w-[400px] h-[400px] top-1/2 left-1/3 -translate-y-1/2" />

      {/* Dynamic Particle Canvas */}
      <canvas ref={bgCanvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 md:p-8 min-h-screen">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          
          {/* LEFT SECTION: Artwork, Medical Icons & Mission Statement */}
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

              {/* Tagline with ECG Pulse */}
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

            {/* Center Hero Visual Box with Floating Hexagonal Icons */}
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

                {/* Hospital Bed Base */}
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

              {/* Hexagon Icons */}
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

            {/* Bottom Mission Pill */}
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

          {/* RIGHT SECTION: State User Login Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md glass-card rounded-3xl p-8 relative overflow-hidden transition-all duration-300">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />

              {/* State User Header Icon */}
              <div className="flex flex-col items-center text-center space-y-3 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-1 shadow-xl">
                    <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-white">
                      <Landmark className="w-9 h-9 text-blue-400" />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white text-[10px]">
                    ✓
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">State User</h3>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 mt-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>State Level Authority Portal</span>
                  </div>
                </div>
              </div>

              {/* Status/Error Box */}
              {status.message && (
                <div
                  className={`p-3 mb-4 rounded-xl text-xs font-semibold flex items-center space-x-2 ${
                    status.type === "error" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {status.type === "error" ? (
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Enter State User ID"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/90 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm placeholder:text-slate-400"
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
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-white/90 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Security Check / Captcha */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Security Check</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="relative flex-1 h-12 rounded-xl border border-slate-200 captcha-bg overflow-hidden flex items-center justify-center select-none shadow-inner">
                      <canvas ref={captchaCanvasRef} width={180} height={48} className="w-full h-full" />
                    </div>

                    <button
                      type="button"
                      onClick={handleRefreshCaptcha}
                      title="Refresh Captcha"
                      className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-md shadow-blue-500/20"
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
                      placeholder="Enter Security Code"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/90 border border-slate-200 rounded-xl text-sm font-semibold tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm placeholder:text-slate-400 placeholder:normal-case"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center space-x-2 transition-all active:scale-[0.99] disabled:opacity-60"
                >
                  <Lock className="w-4 h-4" />
                  <span>{loading ? "Authenticating..." : "Login Securely"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Security Footer */}
              <div className="mt-6 text-center flex items-center justify-center space-x-1.5 text-xs text-slate-500 font-medium">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span>Your session is protected & encrypted</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-slate-500 font-medium">
        <p>© 2026 Malnutrition Treatment Center (MTC) Portal. National Health Mission, Government of Jharkhand.</p>
      </footer>
    </div>
  );
}