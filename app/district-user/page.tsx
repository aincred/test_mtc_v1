// "use client";

// import { useState } from "react";
// import { RefreshCw, User } from "lucide-react";

// export default function DistrictUserLogin() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [captcha, setCaptcha] = useState("");
//   const [captchaCode, setCaptchaCode] = useState(generateCaptcha());

//   function generateCaptcha() {
//     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
//     return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
//   }

//   const handleRefreshCaptcha = () => {
//     setCaptchaCode(generateCaptcha());
//     setCaptcha("");
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (captcha.trim() !== captchaCode) {
//       alert("Invalid Captcha. Please try again.");
//       handleRefreshCaptcha();
//       return;
//     }
//     alert(`Welcome, ${username || "District User"}!`);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-yellow-600 to-yellow-400">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 space-y-6 relative">
//         <div className="flex justify-center -mt-16">
//           <div className="bg-yellow-500 rounded-full p-4 shadow-lg">
//             <User className="text-white w-10 h-10" />
//           </div>
//         </div>

//         <h2 className="text-2xl font-semibold text-center text-yellow-600 mt-2">
//           District User
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="User Name"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400"
//             required
//           />

//           <div>
//             <label className="block text-gray-700 mb-1">Captcha Image</label>
//             <div className="relative bg-gray-100 border rounded-lg text-center w-full py-3 font-mono tracking-widest text-lg text-gray-700">
//               {captchaCode}
//             </div>
//             <div className="flex items-center mt-2 space-x-2">
//               <input
//                 type="text"
//                 placeholder="Enter Captcha"
//                 value={captcha}
//                 onChange={(e) => setCaptcha(e.target.value)}
//                 className="flex-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={handleRefreshCaptcha}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
//               >
//                 <RefreshCw size={20} />
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2.5 rounded-lg transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { RefreshCw, User, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function DistrictUserLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [loading, setLoading] = useState(false);

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
    
    // 1. Validate Captcha
    if (captcha.trim() !== captchaCode) {
      toast.error("Invalid Captcha. Please try again.");
      handleRefreshCaptcha();
      return;
    }

    setLoading(true);

    try {
      // 2. Call the District Login API
      const response = await fetch('/api/auth/district-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId: username, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(`Welcome, ${data.user.districtName} District Admin!`);
        
        // 3. Save District User context to sessionStorage
        sessionStorage.setItem('district_user', JSON.stringify(data.user));
        
        // 4. Redirect to the District Dashboard
        router.push('/district-user/dashboard/home');
      } else {
        toast.error(data.error || "Invalid Username or Password");
        handleRefreshCaptcha();
        setPassword(""); // Clear password field on failure
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-600 to-yellow-400">
      <Toaster position="top-center" />
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 space-y-6 relative">
        <div className="flex justify-center -mt-16">
          <div className="bg-yellow-500 rounded-full p-4 shadow-lg">
            <User className="text-white w-10 h-10" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center text-yellow-600 mt-2">
          District User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 outline-none"
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 outline-none"
            required
            disabled={loading}
          />

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">Captcha Image</label>
            <div className="relative bg-gray-100 border rounded-lg text-center w-full py-3 font-mono tracking-widest text-lg text-gray-700">
              {captchaCode}
            </div>
            <div className="flex items-center mt-2 space-x-2">
              <input
                type="text"
                placeholder="Enter Captcha"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                className="flex-1 border rounded-lg p-2.5 focus:ring-2 focus:ring-yellow-400 outline-none uppercase"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={handleRefreshCaptcha}
                disabled={loading}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}