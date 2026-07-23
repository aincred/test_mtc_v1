// // // // // // // // "use client";

// // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // import {
// // // // // // // //   Chart as ChartJS,
// // // // // // // //   ArcElement,
// // // // // // // //   Tooltip,
// // // // // // // //   Legend,
// // // // // // // //   CategoryScale,
// // // // // // // //   LinearScale,
// // // // // // // //   BarElement,
// // // // // // // //   Title,
// // // // // // // //   ChartData,
// // // // // // // //   ChartOptions
// // // // // // // // } from 'chart.js';
// // // // // // // // import { Bar, Doughnut } from 'react-chartjs-2';
// // // // // // // // import { Search, FileSpreadsheet, Image as ImageIcon, MapPin, User, Phone, Bed, Loader2 } from 'lucide-react';
// // // // // // // // import toast, { Toaster } from 'react-hot-toast';

// // // // // // // // // --- Chart Registration ---
// // // // // // // // ChartJS.register(
// // // // // // // //   ArcElement,
// // // // // // // //   Tooltip,
// // // // // // // //   Legend,
// // // // // // // //   CategoryScale,
// // // // // // // //   LinearScale,
// // // // // // // //   BarElement,
// // // // // // // //   Title
// // // // // // // // );

// // // // // // // // const BG_COLORS = [
// // // // // // // //   '#ff6384', '#36a2eb', '#4bc0c0', '#9966ff', 
// // // // // // // //   '#ffcd56', '#ff9f40', '#ff6384', '#36a2eb'
// // // // // // // // ];

// // // // // // // // export default function Dashboard() {
// // // // // // // //   // --- State ---
// // // // // // // //   const currentYear = new Date().getFullYear();
// // // // // // // //   const [fromDate, setFromDate] = useState(`${currentYear}-01-01`);
// // // // // // // //   const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
// // // // // // // //   const [selectedMtc, setSelectedMtc] = useState<string | null>(null);
// // // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // // //   // Dynamic Data States
// // // // // // // //   const [districtName, setDistrictName] = useState("RANCHI");
// // // // // // // //   const [locations, setLocations] = useState<any[]>([]);
// // // // // // // //   const [kpiState, setKpiState] = useState<any>({});
  
// // // // // // // //   const [chartsData, setChartsData] = useState({
// // // // // // // //     gender: { labels: [] as string[], data: [] as number[] },
// // // // // // // //     age: { labels: [] as string[], data: [] as number[] },
// // // // // // // //     complication: { labels: [] as string[], data: [] as number[] },
// // // // // // // //     referral: { labels: [] as string[], data: [] as number[] },
// // // // // // // //     caste: { labels: [] as string[], data: [] as number[] },
// // // // // // // //     outcome: { labels: [] as string[], data: [] as number[] }
// // // // // // // //   });

// // // // // // // //   // --- API Fetch Logic ---
// // // // // // // //   const fetchData = async () => {
// // // // // // // //     setLoading(true);
// // // // // // // //     try {
// // // // // // // //       const sessionData = sessionStorage.getItem("district_user") || sessionStorage.getItem("user");
// // // // // // // //       let districtId = "";
      
// // // // // // // //       if (sessionData) {
// // // // // // // //         const user = JSON.parse(sessionData);
// // // // // // // //         if (user.districtId) districtId = user.districtId;
// // // // // // // //         if (user.districtName) setDistrictName(user.districtName);
// // // // // // // //       }

// // // // // // // //       const queryParams = new URLSearchParams({
// // // // // // // //         from: fromDate,
// // // // // // // //         to: toDate,
// // // // // // // //         ...(districtId && { districtId })
// // // // // // // //       });
      
// // // // // // // //       const res = await fetch(`/api/dashboard?${queryParams.toString()}`);
// // // // // // // // const data = await res.json();

// // // // // // // // // ADD THIS TO SEE THE RAW RESPONSE
// // // // // // // // console.log("API Response Data:", data); 

// // // // // // // // setKpiState(data.kpi || {});
// // // // // // // // setLocations(data.locations || []);

// // // // // // // //       // Helper to format chart API data for Chart.js
// // // // // // // //       const formatChart = (apiArray: any[]) => {
// // // // // // // //         return {
// // // // // // // //           labels: apiArray.map((item: any) => `${item.name.toUpperCase()} : ${item.value}`),
// // // // // // // //           data: apiArray.map((item: any) => item.value)
// // // // // // // //         };
// // // // // // // //       };

// // // // // // // //       setChartsData({
// // // // // // // //         gender: formatChart(data.gender || []),
// // // // // // // //         age: formatChart(data.age || []),
// // // // // // // //         complication: formatChart(data.complications || []),
// // // // // // // //         referral: formatChart(data.referral || []),
// // // // // // // //         caste: formatChart(data.caste || []),
// // // // // // // //         outcome: formatChart(data.outcome || [])
// // // // // // // //       });

// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Dashboard fetch error:", error);
// // // // // // // //       toast.error("Failed to load district statistics from database.");
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchData();
// // // // // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // // // // //   }, []);

// // // // // // // //   // --- Handlers ---
// // // // // // // //   const handleSearch = () => {
// // // // // // // //     fetchData();
// // // // // // // //   };

// // // // // // // //   const handleDownloadExcel = () => toast.success("Downloading Excel...");
// // // // // // // //   const handleDownloadImage = () => toast.success("Downloading Image...");

// // // // // // // //   const handleMtcSelect = (id: string) => {
// // // // // // // //     setSelectedMtc(id === selectedMtc ? null : id);
// // // // // // // //   };

// // // // // // // //   // --- Dynamic KPI Data ---
// // // // // // // //   const totalBeds = locations.length * 10;
// // // // // // // //   const currentOccupancy = kpiState.TotalAdmissions - kpiState.TotalExits;
// // // // // // // //   const occupancyRate = totalBeds > 0 ? ((currentOccupancy / totalBeds) * 100).toFixed(2) : "0.00";

// // // // // // // //   const KPI_DATA = [
// // // // // // // //     { label: 'Total Sanctioned MTCs', value: locations.length, color: 'rgb(46, 194, 252)' },
// // // // // // // //     { label: 'Total Beds Sanctioned', value: totalBeds, color: 'rgb(250, 110, 198)' },
// // // // // // // //     { label: 'Total Functional MTCs', value: locations.length, color: 'rgb(164, 217, 123)' },
// // // // // // // //     { label: 'Total Beds Available', value: totalBeds, color: 'rgb(254, 182, 56)' },
// // // // // // // //     { label: 'Total Admissions', value: kpiState.TotalAdmissions || 0, color: 'rgb(244, 142, 80)' },
// // // // // // // //     { label: 'Total Exits', value: kpiState.TotalExits || 0, color: 'rgb(241, 124, 138)' },
// // // // // // // //     { label: 'Total Cured', value: kpiState.TotalCured || 0, color: 'rgb(103, 174, 179)' },
// // // // // // // //     { label: 'Total Defaulters', value: kpiState.TotalDefaulters || 0, color: 'rgb(191, 209, 42)' },
// // // // // // // //     { label: 'Total Deaths', value: kpiState.TotalDeaths || 0, color: 'rgb(46, 194, 252)' },
// // // // // // // //     { label: 'Avg Weight Gain (gm/kg/day)', value: kpiState.AvgWeightGain || 0, color: 'rgb(250, 110, 198)' },
// // // // // // // //     { label: 'Bed Occupancy Rate (%)', value: occupancyRate, color: 'rgb(164, 217, 123)' },
// // // // // // // //     { label: 'Average Day of Stay', value: kpiState.AvgStay || 0, color: 'rgb(254, 182, 56)' },
// // // // // // // //   ];

// // // // // // // //   // --- Dynamic Chart Data Configurations ---
// // // // // // // //   const genderDataConfig: ChartData<'doughnut'> = {
// // // // // // // //     labels: chartsData.gender.labels,
// // // // // // // //     datasets: [{ data: chartsData.gender.data, backgroundColor: ["#ff6384", "#36a2eb", "#4bc0c0"] }]
// // // // // // // //   };

// // // // // // // //   const ageDataConfig: ChartData<'bar'> = {
// // // // // // // //     labels: chartsData.age.labels.map(l => l.split(" : ")[0]), // Clean labels for bar chart
// // // // // // // //     datasets: [{ data: chartsData.age.data, backgroundColor: BG_COLORS.slice(0, 4) }]
// // // // // // // //   };

// // // // // // // //   const complicationDataConfig: ChartData<'doughnut'> = {
// // // // // // // //     labels: chartsData.complication.labels,
// // // // // // // //     datasets: [{ data: chartsData.complication.data, backgroundColor: ["#ff6384", "#36a2eb"] }]
// // // // // // // //   };

// // // // // // // //   const referredDataConfig: ChartData<'bar'> = {
// // // // // // // //     labels: chartsData.referral.labels.map(l => l.split(" : ")[0]),
// // // // // // // //     datasets: [{ data: chartsData.referral.data, backgroundColor: BG_COLORS }]
// // // // // // // //   };

// // // // // // // //   const casteDataConfig: ChartData<'bar'> = {
// // // // // // // //     labels: chartsData.caste.labels.map(l => l.split(" : ")[0]),
// // // // // // // //     datasets: [{ data: chartsData.caste.data, backgroundColor: BG_COLORS.slice(0, 4) }]
// // // // // // // //   };

// // // // // // // //   const outcomeDataConfig: ChartData<'bar'> = {
// // // // // // // //     labels: chartsData.outcome.labels.map(l => l.split(" : ")[0]),
// // // // // // // //     datasets: [{ data: chartsData.outcome.data, backgroundColor: BG_COLORS.slice(0, 5) }]
// // // // // // // //   };

// // // // // // // //   const doughnutOptions: ChartOptions<'doughnut'> = {
// // // // // // // //     responsive: true, maintainAspectRatio: false,
// // // // // // // //     plugins: { legend: { position: 'bottom' as const, labels: { boxWidth: 12, font: { size: 10 } } } },
// // // // // // // //   };

// // // // // // // //   const barOptions: ChartOptions<'bar'> = {
// // // // // // // //     responsive: true, maintainAspectRatio: false,
// // // // // // // //     plugins: { legend: { display: false } },
// // // // // // // //     scales: { y: { beginAtZero: true } }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-[#f4f7f6] font-sans text-sm pb-12">
// // // // // // // //       <Toaster position="top-right" />
// // // // // // // //       <div className="container mx-auto px-4 pt-6">
        
// // // // // // // //         {/* Search & Header Section */}
// // // // // // // //         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
// // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-6">
// // // // // // // //             <div className="md:col-span-3 lg:col-span-2">
// // // // // // // //               <label className="block text-gray-600 mb-1 font-medium">From Date</label>
// // // // // // // //               <input 
// // // // // // // //                 type="date" 
// // // // // // // //                 value={fromDate}
// // // // // // // //                 onChange={(e) => setFromDate(e.target.value)}
// // // // // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
// // // // // // // //               />
// // // // // // // //             </div>
// // // // // // // //             <div className="md:col-span-3 lg:col-span-2">
// // // // // // // //               <label className="block text-gray-600 mb-1 font-medium">To Date</label>
// // // // // // // //               <input 
// // // // // // // //                 type="date" 
// // // // // // // //                 value={toDate}
// // // // // // // //                 onChange={(e) => setToDate(e.target.value)}
// // // // // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
// // // // // // // //               />
// // // // // // // //             </div>
// // // // // // // //             <div className="md:col-span-3 lg:col-span-2">
// // // // // // // //               <button 
// // // // // // // //                 onClick={handleSearch}
// // // // // // // //                 disabled={loading}
// // // // // // // //                 className="w-full flex items-center justify-center gap-2 bg-white border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-md transition-colors font-medium disabled:opacity-50"
// // // // // // // //               >
// // // // // // // //                 {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />} 
// // // // // // // //                 {loading ? "Loading..." : "Search"}
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           <hr className="border-gray-100 my-4" />

// // // // // // // //           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
// // // // // // // //             <div className="text-[#026158] font-medium text-center sm:text-left">
// // // // // // // //               <span className="font-bold">{districtName.toUpperCase()} District Report</span> — From: {fromDate} - To: {toDate}
// // // // // // // //             </div>
// // // // // // // //             <div className="flex gap-2">
// // // // // // // //               <button onClick={handleDownloadExcel} className="p-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition shadow-sm" title="Download Excel">
// // // // // // // //                 <FileSpreadsheet size={18} />
// // // // // // // //               </button>
// // // // // // // //               <button onClick={handleDownloadImage} className="p-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition shadow-sm" title="Download Image">
// // // // // // // //                 <ImageIcon size={18} />
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         {/* Main Content Grid */}
// // // // // // // //         <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
// // // // // // // //           {/* Left Column: MTC Centers List */}
// // // // // // // //           <div className="xl:col-span-4">
// // // // // // // //             <div className="bg-white rounded-xl shadow-sm h-[800px] flex flex-col overflow-hidden">
// // // // // // // //               <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#026158] text-white">
// // // // // // // //                 <h6 className="font-bold">{districtName.toUpperCase()} DISTRICT</h6>
// // // // // // // //                 <div className="text-white/90 text-xs flex items-center gap-1 font-medium bg-white/20 px-2 py-1 rounded">
// // // // // // // //                   <MapPin size={12} /> {locations.length} MTCs
// // // // // // // //                 </div>
// // // // // // // //               </div>
              
// // // // // // // //               <div className="p-4 flex-1 overflow-y-auto bg-gray-50/30">
// // // // // // // //                 <p className="text-xs text-gray-500 mb-4 px-2">Select an MTC center below to view specific facility data.</p>
                
// // // // // // // //                 {loading && locations.length === 0 ? (
// // // // // // // //                   <div className="flex justify-center py-10"><Loader2 className="animate-spin text-teal-600" /></div>
// // // // // // // //                 ) : locations.length === 0 ? (
// // // // // // // //                   <div className="text-center text-gray-400 py-10 text-sm">No facilities found.</div>
// // // // // // // //                 ) : (
// // // // // // // //                   <div className="flex flex-col gap-3">
// // // // // // // //                     {locations.map((mtc) => (
// // // // // // // //                       <div 
// // // // // // // //                         key={mtc.id} 
// // // // // // // //                         onClick={() => handleMtcSelect(mtc.id)}
// // // // // // // //                         className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
// // // // // // // //                           selectedMtc === mtc.id 
// // // // // // // //                             ? 'border-[#F15A29] bg-orange-50 shadow-sm' 
// // // // // // // //                             : 'border-gray-200 bg-white hover:border-[#026158] hover:shadow-sm'
// // // // // // // //                         }`}
// // // // // // // //                       >
// // // // // // // //                         <h4 className={`font-bold mb-3 ${selectedMtc === mtc.id ? 'text-[#F15A29]' : 'text-[#026158]'}`}>
// // // // // // // //                           {mtc.name}
// // // // // // // //                         </h4>
// // // // // // // //                         <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
// // // // // // // //                           <div className="flex items-center gap-2">
// // // // // // // //                             <User size={14} className="text-gray-400" /> 
// // // // // // // //                             <span className="font-medium text-gray-700">MO:</span> {mtc.mo}
// // // // // // // //                           </div>
// // // // // // // //                           <div className="flex items-center gap-2">
// // // // // // // //                             <Phone size={14} className="text-gray-400" /> 
// // // // // // // //                             <span className="font-medium text-gray-700">Contact:</span> {mtc.contact}
// // // // // // // //                           </div>
// // // // // // // //                           <div className="flex items-center gap-2">
// // // // // // // //                             <Bed size={14} className="text-gray-400" /> 
// // // // // // // //                             <span className="font-medium text-gray-700">Capacity:</span> {mtc.beds} Beds
// // // // // // // //                           </div>
// // // // // // // //                         </div>
// // // // // // // //                       </div>
// // // // // // // //                     ))}
// // // // // // // //                   </div>
// // // // // // // //                 )}
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           {/* Right Column: Stats & Charts */}
// // // // // // // //           <div className="xl:col-span-8">
// // // // // // // //             {/* KPI Cards */}
// // // // // // // //             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
// // // // // // // //               {KPI_DATA.map((kpi, idx) => (
// // // // // // // //                 <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
// // // // // // // //                   <div 
// // // // // // // //                     className="p-4 flex flex-col items-center justify-center text-center h-full text-white min-h-[90px]"
// // // // // // // //                     style={{ backgroundColor: kpi.color }}
// // // // // // // //                   >
// // // // // // // //                     <h3 className="text-2xl font-bold mb-1">{kpi.value}</h3>
// // // // // // // //                     <h6 className="text-[10px] sm:text-[11px] opacity-90 font-medium uppercase leading-tight">{kpi.label}</h6>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               ))}
// // // // // // // //             </div>

// // // // // // // //             <hr className="border-gray-200 mb-6" />

// // // // // // // //             {/* Charts Grid */}
// // // // // // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
// // // // // // // //               {/* Gender */}
// // // // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Gender Distribution</h3>
// // // // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // // // //                   <Doughnut data={genderDataConfig} options={doughnutOptions} />
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               {/* Age Group */}
// // // // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Age Group</h3>
// // // // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // // // //                   <Bar data={ageDataConfig} options={barOptions} />
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               {/* Complications */}
// // // // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Complicated vs Non-Complicated</h3>
// // // // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // // // //                   <Doughnut data={complicationDataConfig} options={doughnutOptions} />
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               {/* Referred By */}
// // // // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Referred By</h3>
// // // // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // // // //                   <Bar data={referredDataConfig} options={barOptions} />
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               {/* Caste */}
// // // // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Caste Wise Distribution</h3>
// // // // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // // // //                   <Bar data={casteDataConfig} options={barOptions} />
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //               {/* Outcome */}
// // // // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Outcome Indicators</h3>
// // // // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // // // //                   <Bar data={outcomeDataConfig} options={barOptions} />
// // // // // // // //                 </div>
// // // // // // // //               </div>

// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // "use client";

// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import {
// // // // // // //   Chart as ChartJS,
// // // // // // //   ArcElement,
// // // // // // //   Tooltip,
// // // // // // //   Legend,
// // // // // // //   CategoryScale,
// // // // // // //   LinearScale,
// // // // // // //   BarElement,
// // // // // // //   Title,
// // // // // // //   ChartData,
// // // // // // //   ChartOptions
// // // // // // // } from 'chart.js';
// // // // // // // import { Bar, Doughnut } from 'react-chartjs-2';
// // // // // // // import { Search, FileSpreadsheet, Image as ImageIcon, MapPin, User, Phone, Bed, Loader2 } from 'lucide-react';
// // // // // // // import toast, { Toaster } from 'react-hot-toast';

// // // // // // // // --- Chart Registration ---
// // // // // // // ChartJS.register(
// // // // // // //   ArcElement,
// // // // // // //   Tooltip,
// // // // // // //   Legend,
// // // // // // //   CategoryScale,
// // // // // // //   LinearScale,
// // // // // // //   BarElement,
// // // // // // //   Title
// // // // // // // );

// // // // // // // const BG_COLORS = [
// // // // // // //   '#ff6384', '#36a2eb', '#4bc0c0', '#9966ff', 
// // // // // // //   '#ffcd56', '#ff9f40', '#ff6384', '#36a2eb'
// // // // // // // ];

// // // // // // // export default function Dashboard() {
// // // // // // //   // --- State Setup ---
// // // // // // //   const currentYear = new Date().getFullYear();
// // // // // // //   const [fromDate, setFromDate] = useState(`${currentYear}-01-01`);
// // // // // // //   const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
// // // // // // //   const [selectedMtc, setSelectedMtc] = useState<string | null>(null);
// // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // //   // Dynamic Context Elements
// // // // // // //   const [districtName, setDistrictName] = useState("RANCHI");
// // // // // // //   const [locations, setLocations] = useState<any[]>([]);
// // // // // // //   const [kpiState, setKpiState] = useState<any>({});
  
// // // // // // //   const [chartsData, setChartsData] = useState({
// // // // // // //     gender: { labels: [] as string[], data: [] as number[] },
// // // // // // //     age: { labels: [] as string[], data: [] as number[] },
// // // // // // //     complication: { labels: [] as string[], data: [] as number[] },
// // // // // // //     referral: { labels: [] as string[], data: [] as number[] },
// // // // // // //     caste: { labels: [] as string[], data: [] as number[] },
// // // // // // //     outcome: { labels: [] as string[], data: [] as number[] }
// // // // // // //   });

// // // // // // //   // --- API Sync Routine ---
// // // // // // //   const fetchData = async () => {
// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       // Pull district details assigned to this session profile
// // // // // // //       const sessionData = sessionStorage.getItem("district_user") || sessionStorage.getItem("user");
// // // // // // //       let districtNameParam = "RANCHI"; 
// // // // // // //       let districtId = "";
      
// // // // // // //       if (sessionData) {
// // // // // // //         const user = JSON.parse(sessionData);
// // // // // // //         if (user.districtId) districtId = user.districtId;
// // // // // // //         if (user.districtName) {
// // // // // // //           districtNameParam = user.districtName;
// // // // // // //           setDistrictName(user.districtName);
// // // // // // //         }
// // // // // // //       }

// // // // // // //       const queryParams = new URLSearchParams({
// // // // // // //         from: fromDate,
// // // // // // //         to: toDate,
// // // // // // //         districtName: districtNameParam,
// // // // // // //         ...(districtId && { districtId })
// // // // // // //       });
      
// // // // // // //       const res = await fetch(`/api/dashboard?${queryParams.toString()}`);
// // // // // // //       const data = await res.json();

// // // // // // //       if (!res.ok) throw new Error(data.error || "Network breakdown encountered.");

// // // // // // //       console.log("Database Data Fetched:", data); 

// // // // // // //       setKpiState(data.kpi || {});
// // // // // // //       setLocations(data.locations || []);

// // // // // // //       // Parser function converting API elements cleanly to ChartJS structures
// // // // // // //       const formatChart = (apiArray: any[]) => {
// // // // // // //         return {
// // // // // // //           labels: apiArray.map((item: any) => `${item.name.toUpperCase()} : ${item.value}`),
// // // // // // //           data: apiArray.map((item: any) => item.value)
// // // // // // //         };
// // // // // // //       };

// // // // // // //       setChartsData({
// // // // // // //         gender: formatChart(data.gender || []),
// // // // // // //         age: formatChart(data.age || []),
// // // // // // //         complication: formatChart(data.complications || []),
// // // // // // //         referral: formatChart(data.referral || []),
// // // // // // //         caste: formatChart(data.caste || []),
// // // // // // //         outcome: formatChart(data.outcome || [])
// // // // // // //       });

// // // // // // //     } catch (error: any) {
// // // // // // //       console.error("Dashboard rendering error:", error);
// // // // // // //       toast.error(`Database Error: ${error.message || "Could not retrieve records."}`);
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     fetchData();
// // // // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // // // //   }, []);

// // // // // // //   // --- Layout Action Handlers ---
// // // // // // //   const handleSearch = () => {
// // // // // // //     fetchData();
// // // // // // //   };

// // // // // // //   const handleDownloadExcel = () => toast.success("Exporting metrics matrix to Excel...");
// // // // // // //   const handleDownloadImage = () => toast.success("Saving snapshot to image device...");

// // // // // // //   const handleMtcSelect = (id: string) => {
// // // // // // //     setSelectedMtc(id === selectedMtc ? null : id);
// // // // // // //   };

// // // // // // //   // --- Computation of Dynamic Facility KPIs ---
// // // // // // //   const totalBeds = locations.reduce((sum, loc) => sum + (Number(loc.beds) || 0), 0);
// // // // // // //   const currentOccupancy = (kpiState.TotalAdmissions || 0) - (kpiState.TotalExits || 0);
// // // // // // //   const occupancyRate = totalBeds > 0 ? ((currentOccupancy / totalBeds) * 100).toFixed(2) : "0.00";

// // // // // // //   const KPI_DATA = [
// // // // // // //     { label: 'Total Sanctioned MTCs', value: locations.length, color: 'rgb(46, 194, 252)' },
// // // // // // //     { label: 'Total Beds Sanctioned', value: totalBeds, color: 'rgb(250, 110, 198)' },
// // // // // // //     { label: 'Total Functional MTCs', value: locations.length, color: 'rgb(164, 217, 123)' },
// // // // // // //     { label: 'Total Beds Available', value: totalBeds, color: 'rgb(254, 182, 56)' },
// // // // // // //     { label: 'Total Admissions', value: kpiState.TotalAdmissions || 0, color: 'rgb(244, 142, 80)' },
// // // // // // //     { label: 'Total Exits', value: kpiState.TotalExits || 0, color: 'rgb(241, 124, 138)' },
// // // // // // //     { label: 'Total Cured', value: kpiState.TotalCured || 0, color: 'rgb(103, 174, 179)' },
// // // // // // //     { label: 'Total Defaulters', value: kpiState.TotalDefaulters || 0, color: 'rgb(191, 209, 42)' },
// // // // // // //     { label: 'Total Deaths', value: kpiState.TotalDeaths || 0, color: 'rgb(46, 194, 252)' },
// // // // // // //     { label: 'Avg Weight Gain (gm/kg/day)', value: kpiState.AvgWeightGain || 0, color: 'rgb(250, 110, 198)' },
// // // // // // //     { label: 'Bed Occupancy Rate (%)', value: occupancyRate, color: 'rgb(164, 217, 123)' },
// // // // // // //     { label: 'Average Day of Stay', value: kpiState.AvgStay || 0, color: 'rgb(254, 182, 56)' },
// // // // // // //   ];

// // // // // // //   // --- Chart Setup Elements ---
// // // // // // //   const genderDataConfig: ChartData<'doughnut'> = {
// // // // // // //     labels: chartsData.gender.labels,
// // // // // // //     datasets: [{ data: chartsData.gender.data, backgroundColor: ["#ff6384", "#36a2eb", "#4bc0c0"] }]
// // // // // // //   };

// // // // // // //   const ageDataConfig: ChartData<'bar'> = {
// // // // // // //     labels: chartsData.age.labels.map(l => l.split(" : ")[0]),
// // // // // // //     datasets: [{ data: chartsData.age.data, backgroundColor: BG_COLORS.slice(0, 4) }]
// // // // // // //   };

// // // // // // //   const complicationDataConfig: ChartData<'doughnut'> = {
// // // // // // //     labels: chartsData.complication.labels,
// // // // // // //     datasets: [{ data: chartsData.complication.data, backgroundColor: ["#ff6384", "#36a2eb"] }]
// // // // // // //   };

// // // // // // //   const referredDataConfig: ChartData<'bar'> = {
// // // // // // //     labels: chartsData.referral.labels.map(l => l.split(" : ")[0]),
// // // // // // //     datasets: [{ data: chartsData.referral.data, backgroundColor: BG_COLORS }]
// // // // // // //   };

// // // // // // //   const casteDataConfig: ChartData<'bar'> = {
// // // // // // //     labels: chartsData.caste.labels.map(l => l.split(" : ")[0]),
// // // // // // //     datasets: [{ data: chartsData.caste.data, backgroundColor: BG_COLORS.slice(0, 4) }]
// // // // // // //   };

// // // // // // //   const outcomeDataConfig: ChartData<'bar'> = {
// // // // // // //     labels: chartsData.outcome.labels.map(l => l.split(" : ")[0]),
// // // // // // //     datasets: [{ data: chartsData.outcome.data, backgroundColor: BG_COLORS.slice(0, 5) }]
// // // // // // //   };

// // // // // // //   const doughnutOptions: ChartOptions<'doughnut'> = {
// // // // // // //     responsive: true, maintainAspectRatio: false,
// // // // // // //     plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } } },
// // // // // // //   };

// // // // // // //   const barOptions: ChartOptions<'bar'> = {
// // // // // // //     responsive: true, maintainAspectRatio: false,
// // // // // // //     plugins: { legend: { display: false } },
// // // // // // //     scales: { y: { beginAtZero: true } }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-[#f4f7f6] font-sans text-sm pb-12">
// // // // // // //       <Toaster position="top-right" />
// // // // // // //       <div className="container mx-auto px-4 pt-6">
        
// // // // // // //         {/* Search & Configuration Header Layout */}
// // // // // // //         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
// // // // // // //           <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-6">
// // // // // // //             <div className="md:col-span-3 lg:col-span-2">
// // // // // // //               <label className="block text-gray-600 mb-1 font-medium">From Date</label>
// // // // // // //               <input 
// // // // // // //                 type="date" 
// // // // // // //                 value={fromDate}
// // // // // // //                 onChange={(e) => setFromDate(e.target.value)}
// // // // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
// // // // // // //               />
// // // // // // //             </div>
// // // // // // //             <div className="md:col-span-3 lg:col-span-2">
// // // // // // //               <label className="block text-gray-600 mb-1 font-medium">To Date</label>
// // // // // // //               <input 
// // // // // // //                 type="date" 
// // // // // // //                 value={toDate}
// // // // // // //                 onChange={(e) => setToDate(e.target.value)}
// // // // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
// // // // // // //               />
// // // // // // //             </div>
// // // // // // //             <div className="md:col-span-3 lg:col-span-2">
// // // // // // //               <button 
// // // // // // //                 onClick={handleSearch}
// // // // // // //                 disabled={loading}
// // // // // // //                 className="w-full flex items-center justify-center gap-2 bg-white border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-md transition-colors font-medium disabled:opacity-50"
// // // // // // //               >
// // // // // // //                 {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />} 
// // // // // // //                 {loading ? "Loading..." : "Search"}
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           <hr className="border-gray-100 my-4" />

// // // // // // //           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
// // // // // // //             <div className="text-[#026158] font-medium text-center sm:text-left">
// // // // // // //               <span className="font-bold">{districtName.toUpperCase()} District Report</span> — From: {fromDate} - To: {toDate}
// // // // // // //             </div>
// // // // // // //             <div className="flex gap-2">
// // // // // // //               <button onClick={handleDownloadExcel} className="p-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition shadow-sm" title="Download Excel">
// // // // // // //                 <FileSpreadsheet size={18} />
// // // // // // //               </button>
// // // // // // //               <button onClick={handleDownloadImage} className="p-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition shadow-sm" title="Download Image">
// // // // // // //                 <ImageIcon size={18} />
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* Dynamic Display Control Grid */}
// // // // // // //         <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
// // // // // // //           {/* Left Column: MTC Interactive Hub List */}
// // // // // // //           <div className="xl:col-span-4">
// // // // // // //             <div className="bg-white rounded-xl shadow-sm h-[800px] flex flex-col overflow-hidden">
// // // // // // //               <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#026158] text-white">
// // // // // // //                 <h6 className="font-bold">{districtName.toUpperCase()} DISTRICT</h6>
// // // // // // //                 <div className="text-white/90 text-xs flex items-center gap-1 font-medium bg-white/20 px-2 py-1 rounded">
// // // // // // //                   <MapPin size={12} /> {locations.length} MTCs Registered
// // // // // // //                 </div>
// // // // // // //               </div>
              
// // // // // // //               <div className="p-4 flex-1 overflow-y-auto bg-gray-50/30">
// // // // // // //                 <p className="text-xs text-gray-500 mb-4 px-2">Select an MTC center below to view specific facility data.</p>
                
// // // // // // //                 {loading && locations.length === 0 ? (
// // // // // // //                   <div className="flex justify-center py-10"><Loader2 className="animate-spin text-teal-600" /></div>
// // // // // // //                 ) : locations.length === 0 ? (
// // // // // // //                   <div className="text-center text-gray-400 py-10 text-sm">No operational health infrastructure discovered.</div>
// // // // // // //                 ) : (
// // // // // // //                   <div className="flex flex-col gap-3">
// // // // // // //                     {locations.map((mtc) => (
// // // // // // //                       <div 
// // // // // // //                         key={mtc.id} 
// // // // // // //                         onClick={() => handleMtcSelect(mtc.id)}
// // // // // // //                         className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
// // // // // // //                           selectedMtc === mtc.id 
// // // // // // //                             ? 'border-[#F15A29] bg-orange-50 shadow-sm' 
// // // // // // //                             : 'border-gray-200 bg-white hover:border-[#026158] hover:shadow-sm'
// // // // // // //                         }`}
// // // // // // //                       >
// // // // // // //                         <h4 className={`font-bold mb-3 ${selectedMtc === mtc.id ? 'text-[#F15A29]' : 'text-[#026158]'}`}>
// // // // // // //                           {mtc.name}
// // // // // // //                         </h4>
// // // // // // //                         <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
// // // // // // //                           <div className="flex items-center gap-2">
// // // // // // //                             <User size={14} className="text-gray-400" /> 
// // // // // // //                             <span className="font-medium text-gray-700">MO:</span> {mtc.mo || 'N/A'}
// // // // // // //                           </div>
// // // // // // //                           <div className="flex items-center gap-2">
// // // // // // //                             <Phone size={14} className="text-gray-400" /> 
// // // // // // //                             <span className="font-medium text-gray-700">Contact:</span> {mtc.contact || 'N/A'}
// // // // // // //                           </div>
// // // // // // //                           <div className="flex items-center gap-2">
// // // // // // //                             <Bed size={14} className="text-gray-400" /> 
// // // // // // //                             <span className="font-medium text-gray-700">Capacity:</span> {mtc.beds || 0} Beds
// // // // // // //                           </div>
// // // // // // //                         </div>
// // // // // // //                       </div>
// // // // // // //                     ))}
// // // // // // //                   </div>
// // // // // // //                 )}
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           {/* Right Column: Key Statistics Matrix & Charts Grid */}
// // // // // // //           <div className="xl:col-span-8">
// // // // // // //             {/* KPI Numerical Layout Cards */}
// // // // // // //             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
// // // // // // //               {KPI_DATA.map((kpi, idx) => (
// // // // // // //                 <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
// // // // // // //                   <div 
// // // // // // //                     className="p-4 flex flex-col items-center justify-center text-center h-full text-white min-h-[90px]"
// // // // // // //                     style={{ backgroundColor: kpi.color }}
// // // // // // //                   >
// // // // // // //                     <h3 className="text-2xl font-bold mb-1">{kpi.value}</h3>
// // // // // // //                     <h6 className="text-[10px] sm:text-[11px] opacity-90 font-medium uppercase leading-tight">{kpi.label}</h6>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               ))}
// // // // // // //             </div>

// // // // // // //             <hr className="border-gray-200 mb-6" />

// // // // // // //             {/* Rendered Analytical Charts Grid */}
// // // // // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
// // // // // // //               {/* Gender Distribution Chart */}
// // // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Gender Distribution</h3>
// // // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // // //                   <Doughnut data={genderDataConfig} options={doughnutOptions} />
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               {/* Age Categorization Chart */}
// // // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Age Group Breakdown</h3>
// // // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // // //                   <Bar data={ageDataConfig} options={barOptions} />
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               {/* Complication State Classification */}
// // // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Complicated vs Non-Complicated Cases</h3>
// // // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // // //                   <Doughnut data={complicationDataConfig} options={doughnutOptions} />
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               {/* Referral Stream Chart */}
// // // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Referred By Channels</h3>
// // // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // // //                   <Bar data={referredDataConfig} options={barOptions} />
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               {/* Social/Caste Category Metrics */}
// // // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Caste Wise Profile Distribution</h3>
// // // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // // //                   <Bar data={casteDataConfig} options={barOptions} />
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               {/* Patient Outcomes Performance */}
// // // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Patient Exit Outcome Indicators</h3>
// // // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // // //                   <Bar data={outcomeDataConfig} options={barOptions} />
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // "use client";

// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import {
// // // // // //   Chart as ChartJS,
// // // // // //   ArcElement,
// // // // // //   Tooltip,
// // // // // //   Legend,
// // // // // //   CategoryScale,
// // // // // //   LinearScale,
// // // // // //   BarElement,
// // // // // //   Title,
// // // // // //   ChartData,
// // // // // //   ChartOptions
// // // // // // } from 'chart.js';
// // // // // // import { Bar, Doughnut } from 'react-chartjs-2';
// // // // // // import { Search, FileSpreadsheet, Image as ImageIcon, MapPin, User, Phone, Bed, Loader2 } from 'lucide-react';
// // // // // // import toast, { Toaster } from 'react-hot-toast';

// // // // // // // --- Chart Registration ---
// // // // // // ChartJS.register(
// // // // // //   ArcElement,
// // // // // //   Tooltip,
// // // // // //   Legend,
// // // // // //   CategoryScale,
// // // // // //   LinearScale,
// // // // // //   BarElement,
// // // // // //   Title
// // // // // // );

// // // // // // const BG_COLORS = [
// // // // // //   '#ff6384', '#36a2eb', '#4bc0c0', '#9966ff', 
// // // // // //   '#ffcd56', '#ff9f40', '#ff6384', '#36a2eb'
// // // // // // ];

// // // // // // export default function Dashboard() {
// // // // // //   // --- State Setup ---
// // // // // //   const currentYear = new Date().getFullYear();
// // // // // //   const [fromDate, setFromDate] = useState(`${currentYear}-01-01`);
// // // // // //   const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
// // // // // //   const [selectedMtc, setSelectedMtc] = useState<string | null>(null);
// // // // // //   const [loading, setLoading] = useState(true);

// // // // // //   // Dynamic Context Elements
// // // // // //   const [districtName, setDistrictName] = useState("RANCHI");
// // // // // //   const [locations, setLocations] = useState<any[]>([]);
// // // // // //   const [kpiState, setKpiState] = useState<any>({});
  
// // // // // //   const [chartsData, setChartsData] = useState({
// // // // // //     gender: { labels: [] as string[], data: [] as number[] },
// // // // // //     age: { labels: [] as string[], data: [] as number[] },
// // // // // //     complication: { labels: [] as string[], data: [] as number[] },
// // // // // //     referral: { labels: [] as string[], data: [] as number[] },
// // // // // //     caste: { labels: [] as string[], data: [] as number[] },
// // // // // //     outcome: { labels: [] as string[], data: [] as number[] }
// // // // // //   });

// // // // // //   // --- API Sync Routine ---
// // // // // //   const fetchData = async () => {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       // Pull district details assigned to this session profile
// // // // // //       const sessionData = sessionStorage.getItem("district_user") || sessionStorage.getItem("user");
// // // // // //       let districtNameParam = "RANCHI"; 
// // // // // //       let districtId = "";
      
// // // // // //       if (sessionData) {
// // // // // //         const user = JSON.parse(sessionData);
// // // // // //         if (user.districtId) districtId = user.districtId;
// // // // // //         if (user.districtName) {
// // // // // //           districtNameParam = user.districtName;
// // // // // //           setDistrictName(user.districtName);
// // // // // //         }
// // // // // //       }

// // // // // //       const queryParams = new URLSearchParams({
// // // // // //         from: fromDate,
// // // // // //         to: toDate,
// // // // // //         districtName: districtNameParam,
// // // // // //         ...(districtId && { districtId })
// // // // // //       });
      
// // // // // //       const res = await fetch(`/api/dashboard?${queryParams.toString()}`);
// // // // // //       const data = await res.json();

// // // // // //       if (!res.ok) throw new Error(data.error || "Network breakdown encountered.");

// // // // // //       console.log("Database Data Fetched:", data); 

// // // // // //       setKpiState(data.kpi || {});
// // // // // //       setLocations(data.locations || []);

// // // // // //       // Parser function converting API elements cleanly to ChartJS structures
// // // // // //       const formatChart = (apiArray: any[]) => {
// // // // // //         return {
// // // // // //           labels: apiArray.map((item: any) => `${item.name.toUpperCase()} : ${item.value}`),
// // // // // //           data: apiArray.map((item: any) => item.value)
// // // // // //         };
// // // // // //       };

// // // // // //       setChartsData({
// // // // // //         gender: formatChart(data.gender || []),
// // // // // //         age: formatChart(data.age || []),
// // // // // //         complication: formatChart(data.complications || []),
// // // // // //         referral: formatChart(data.referral || []),
// // // // // //         caste: formatChart(data.caste || []),
// // // // // //         outcome: formatChart(data.outcome || [])
// // // // // //       });

// // // // // //     } catch (error: any) {
// // // // // //       console.error("Dashboard rendering error:", error);
// // // // // //       toast.error(`Database Error: ${error.message || "Could not retrieve records."}`);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     fetchData();
// // // // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // // //   }, []);

// // // // // //   // --- Layout Action Handlers ---
// // // // // //   const handleSearch = () => {
// // // // // //     fetchData();
// // // // // //   };

// // // // // //   const handleDownloadExcel = () => toast.success("Exporting metrics matrix to Excel...");
// // // // // //   const handleDownloadImage = () => toast.success("Saving snapshot to image device...");

// // // // // //   const handleMtcSelect = (id: string) => {
// // // // // //     setSelectedMtc(id === selectedMtc ? null : id);
// // // // // //   };

// // // // // //   // --- Computation of Dynamic Facility KPIs ---
// // // // // //   const totalBeds = locations.reduce((sum, loc) => sum + (Number(loc.beds) || 0), 0);

// // // // // //   const KPI_DATA = [
// // // // // //     { label: 'Total Sanctioned MTCs', value: locations.length, color: 'rgb(46, 194, 252)' },
// // // // // //     { label: 'Total Beds Sanctioned', value: totalBeds, color: 'rgb(250, 110, 198)' },
// // // // // //     { label: 'Total Functional MTCs', value: locations.length, color: 'rgb(164, 217, 123)' },
// // // // // //     { label: 'Total Beds Available', value: totalBeds, color: 'rgb(254, 182, 56)' },
// // // // // //     { label: 'Total Admissions', value: kpiState.TotalAdmissions || 0, color: 'rgb(244, 142, 80)' },
// // // // // //     { label: 'Total Exits', value: kpiState.TotalExits || 0, color: 'rgb(241, 124, 138)' },
// // // // // //     { label: 'Total Cured', value: kpiState.TotalCured || 0, color: 'rgb(103, 174, 179)' },
// // // // // //     { label: 'Total Defaulters', value: kpiState.TotalDefaulters || 0, color: 'rgb(191, 209, 42)' },
// // // // // //     { label: 'Total Deaths', value: kpiState.TotalDeaths || 0, color: 'rgb(46, 194, 252)' },
// // // // // //     { label: 'Avg Weight Gain (gm/kg/day)', value: kpiState.AvgWeightGain || 0, color: 'rgb(250, 110, 198)' },
// // // // // //     { label: 'Bed Occupancy Rate (%)', value: kpiState.BedOccupancyRate || "0.00", color: 'rgb(164, 217, 123)' },
// // // // // //     { label: 'Average Day of Stay', value: kpiState.AvgStay || 0, color: 'rgb(254, 182, 56)' },
// // // // // //   ];

// // // // // //   // --- Chart Setup Elements ---
// // // // // //   const genderDataConfig: ChartData<'doughnut'> = {
// // // // // //     labels: chartsData.gender.labels,
// // // // // //     datasets: [{ data: chartsData.gender.data, backgroundColor: ["#ff6384", "#36a2eb", "#4bc0c0"] }]
// // // // // //   };

// // // // // //   const ageDataConfig: ChartData<'bar'> = {
// // // // // //     labels: chartsData.age.labels.map(l => l.split(" : ")[0]),
// // // // // //     datasets: [{ data: chartsData.age.data, backgroundColor: BG_COLORS.slice(0, 4) }]
// // // // // //   };

// // // // // //   const complicationDataConfig: ChartData<'doughnut'> = {
// // // // // //     labels: chartsData.complication.labels,
// // // // // //     datasets: [{ data: chartsData.complication.data, backgroundColor: ["#ff6384", "#36a2eb"] }]
// // // // // //   };

// // // // // //   const referredDataConfig: ChartData<'bar'> = {
// // // // // //     labels: chartsData.referral.labels.map(l => l.split(" : ")[0]),
// // // // // //     datasets: [{ data: chartsData.referral.data, backgroundColor: BG_COLORS }]
// // // // // //   };

// // // // // //   const casteDataConfig: ChartData<'bar'> = {
// // // // // //     labels: chartsData.caste.labels.map(l => l.split(" : ")[0]),
// // // // // //     datasets: [{ data: chartsData.caste.data, backgroundColor: BG_COLORS.slice(0, 4) }]
// // // // // //   };

// // // // // //   const outcomeDataConfig: ChartData<'bar'> = {
// // // // // //     labels: chartsData.outcome.labels.map(l => l.split(" : ")[0]),
// // // // // //     datasets: [{ data: chartsData.outcome.data, backgroundColor: BG_COLORS.slice(0, 5) }]
// // // // // //   };

// // // // // //   const doughnutOptions: ChartOptions<'doughnut'> = {
// // // // // //     responsive: true, maintainAspectRatio: false,
// // // // // //     plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } } },
// // // // // //   };

// // // // // //   const barOptions: ChartOptions<'bar'> = {
// // // // // //     responsive: true, maintainAspectRatio: false,
// // // // // //     plugins: { legend: { display: false } },
// // // // // //     scales: { y: { beginAtZero: true } }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-[#f4f7f6] font-sans text-sm pb-12">
// // // // // //       <Toaster position="top-right" />
// // // // // //       <div className="container mx-auto px-4 pt-6">
        
// // // // // //         {/* Search & Configuration Header Layout */}
// // // // // //         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
// // // // // //           <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-6">
// // // // // //             <div className="md:col-span-3 lg:col-span-2">
// // // // // //               <label className="block text-gray-600 mb-1 font-medium">From Date</label>
// // // // // //               <input 
// // // // // //                 type="date" 
// // // // // //                 value={fromDate}
// // // // // //                 onChange={(e) => setFromDate(e.target.value)}
// // // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
// // // // // //               />
// // // // // //             </div>
// // // // // //             <div className="md:col-span-3 lg:col-span-2">
// // // // // //               <label className="block text-gray-600 mb-1 font-medium">To Date</label>
// // // // // //               <input 
// // // // // //                 type="date" 
// // // // // //                 value={toDate}
// // // // // //                 onChange={(e) => setToDate(e.target.value)}
// // // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
// // // // // //               />
// // // // // //             </div>
// // // // // //             <div className="md:col-span-3 lg:col-span-2">
// // // // // //               <button 
// // // // // //                 onClick={handleSearch}
// // // // // //                 disabled={loading}
// // // // // //                 className="w-full flex items-center justify-center gap-2 bg-white border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-md transition-colors font-medium disabled:opacity-50"
// // // // // //               >
// // // // // //                 {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />} 
// // // // // //                 {loading ? "Loading..." : "Search"}
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           <hr className="border-gray-100 my-4" />

// // // // // //           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
// // // // // //             <div className="text-[#026158] font-medium text-center sm:text-left">
// // // // // //               <span className="font-bold">{districtName.toUpperCase()} District Report</span> — From: {fromDate} - To: {toDate}
// // // // // //             </div>
// // // // // //             <div className="flex gap-2">
// // // // // //               <button onClick={handleDownloadExcel} className="p-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition shadow-sm" title="Download Excel">
// // // // // //                 <FileSpreadsheet size={18} />
// // // // // //               </button>
// // // // // //               <button onClick={handleDownloadImage} className="p-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition shadow-sm" title="Download Image">
// // // // // //                 <ImageIcon size={18} />
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Dynamic Display Control Grid */}
// // // // // //         <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
// // // // // //           {/* Left Column: MTC Interactive Hub List */}
// // // // // //           <div className="xl:col-span-4">
// // // // // //             <div className="bg-white rounded-xl shadow-sm h-[800px] flex flex-col overflow-hidden">
// // // // // //               <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#026158] text-white">
// // // // // //                 <h6 className="font-bold">{districtName.toUpperCase()} DISTRICT</h6>
// // // // // //                 <div className="text-white/90 text-xs flex items-center gap-1 font-medium bg-white/20 px-2 py-1 rounded">
// // // // // //                   <MapPin size={12} /> {locations.length} MTCs Registered
// // // // // //                 </div>
// // // // // //               </div>
              
// // // // // //               <div className="p-4 flex-1 overflow-y-auto bg-gray-50/30">
// // // // // //                 <p className="text-xs text-gray-500 mb-4 px-2">Select an MTC center below to view specific facility data.</p>
                
// // // // // //                 {loading && locations.length === 0 ? (
// // // // // //                   <div className="flex justify-center py-10"><Loader2 className="animate-spin text-teal-600" /></div>
// // // // // //                 ) : locations.length === 0 ? (
// // // // // //                   <div className="text-center text-gray-400 py-10 text-sm">No operational health infrastructure discovered.</div>
// // // // // //                 ) : (
// // // // // //                   <div className="flex flex-col gap-3">
// // // // // //                     {locations.map((mtc) => (
// // // // // //                       <div 
// // // // // //                         key={mtc.id} 
// // // // // //                         onClick={() => handleMtcSelect(mtc.id)}
// // // // // //                         className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
// // // // // //                           selectedMtc === mtc.id 
// // // // // //                             ? 'border-[#F15A29] bg-orange-50 shadow-sm' 
// // // // // //                             : 'border-gray-200 bg-white hover:border-[#026158] hover:shadow-sm'
// // // // // //                         }`}
// // // // // //                       >
// // // // // //                         <h4 className={`font-bold mb-3 ${selectedMtc === mtc.id ? 'text-[#F15A29]' : 'text-[#026158]'}`}>
// // // // // //                           {mtc.name}
// // // // // //                         </h4>
// // // // // //                         <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
// // // // // //                           <div className="flex items-center gap-2">
// // // // // //                             <User size={14} className="text-gray-400" /> 
// // // // // //                             <span className="font-medium text-gray-700">MO:</span> {mtc.mo || 'N/A'}
// // // // // //                           </div>
// // // // // //                           <div className="flex items-center gap-2">
// // // // // //                             <Phone size={14} className="text-gray-400" /> 
// // // // // //                             <span className="font-medium text-gray-700">Contact:</span> {mtc.contact || 'N/A'}
// // // // // //                           </div>
// // // // // //                           <div className="flex items-center gap-2">
// // // // // //                             <Bed size={14} className="text-gray-400" /> 
// // // // // //                             <span className="font-medium text-gray-700">Capacity:</span> {mtc.beds || 0} Beds
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                     ))}
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Right Column: Key Statistics Matrix & Charts Grid */}
// // // // // //           <div className="xl:col-span-8">
// // // // // //             {/* KPI Numerical Layout Cards */}
// // // // // //             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
// // // // // //               {KPI_DATA.map((kpi, idx) => (
// // // // // //                 <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
// // // // // //                   <div 
// // // // // //                     className="p-4 flex flex-col items-center justify-center text-center h-full text-white min-h-[90px]"
// // // // // //                     style={{ backgroundColor: kpi.color }}
// // // // // //                   >
// // // // // //                     <h3 className="text-2xl font-bold mb-1">{kpi.value}</h3>
// // // // // //                     <h6 className="text-[10px] sm:text-[11px] opacity-90 font-medium uppercase leading-tight">{kpi.label}</h6>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>

// // // // // //             <hr className="border-gray-200 mb-6" />

// // // // // //             {/* Rendered Analytical Charts Grid */}
// // // // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
// // // // // //               {/* Gender Distribution Chart */}
// // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Gender Distribution</h3>
// // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // //                   <Doughnut data={genderDataConfig} options={doughnutOptions} />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* Age Categorization Chart */}
// // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Age Group Breakdown</h3>
// // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // //                   <Bar data={ageDataConfig} options={barOptions} />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* Complication State Classification */}
// // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Complicated vs Non-Complicated Cases</h3>
// // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // //                   <Doughnut data={complicationDataConfig} options={doughnutOptions} />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* Referral Stream Chart */}
// // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Referred By Channels</h3>
// // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // //                   <Bar data={referredDataConfig} options={barOptions} />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* Social/Caste Category Metrics */}
// // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Caste Wise Profile Distribution</h3>
// // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // //                   <Bar data={casteDataConfig} options={barOptions} />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* Patient Outcomes Performance */}
// // // // // //               <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
// // // // // //                 <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Patient Exit Outcome Indicators</h3>
// // // // // //                 <div className="flex-1 min-h-[220px]">
// // // // // //                   <Bar data={outcomeDataConfig} options={barOptions} />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // "use client";

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import {
// // // // //   Chart as ChartJS,
// // // // //   ArcElement,
// // // // //   Tooltip,
// // // // //   Legend,
// // // // //   CategoryScale,
// // // // //   LinearScale,
// // // // //   BarElement,
// // // // //   Title,
// // // // //   ChartData,
// // // // //   ChartOptions
// // // // // } from 'chart.js';
// // // // // import { Bar, Doughnut } from 'react-chartjs-2';
// // // // // import { Search, MapPin, User, Phone, Bed, Loader2, Calendar, TrendingUp, Building2, Activity } from 'lucide-react';
// // // // // import toast, { Toaster } from 'react-hot-toast';

// // // // // // --- Chart Registration ---
// // // // // ChartJS.register(
// // // // //   ArcElement,
// // // // //   Tooltip,
// // // // //   Legend,
// // // // //   CategoryScale,
// // // // //   LinearScale,
// // // // //   BarElement,
// // // // //   Title
// // // // // );

// // // // // // Modernized color palette for charts
// // // // // const BG_COLORS = [
// // // // //   '#0b9f8f', '#2563eb', '#f59e0b', '#ec4899', 
// // // // //   '#8b5cf6', '#14b8a6', '#f43f5e', '#3b82f6'
// // // // // ];

// // // // // export default function Dashboard() {
// // // // //   // --- State Setup ---
// // // // //   const currentYear = new Date().getFullYear();
// // // // //   const [fromDate, setFromDate] = useState(`${currentYear}-01-01`);
// // // // //   const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
// // // // //   const [selectedMtc, setSelectedMtc] = useState<string | null>(null);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   // Dynamic Context Elements
// // // // //   const [districtName, setDistrictName] = useState("RANCHI");
// // // // //   const [locations, setLocations] = useState<any[]>([]);
// // // // //   const [kpiState, setKpiState] = useState<any>({});
  
// // // // //   const [chartsData, setChartsData] = useState({
// // // // //     gender: { labels: [] as string[], data: [] as number[] },
// // // // //     age: { labels: [] as string[], data: [] as number[] },
// // // // //     complication: { labels: [] as string[], data: [] as number[] },
// // // // //     referral: { labels: [] as string[], data: [] as number[] },
// // // // //     caste: { labels: [] as string[], data: [] as number[] },
// // // // //     outcome: { labels: [] as string[], data: [] as number[] }
// // // // //   });

// // // // //   // --- API Sync Routine ---
// // // // //   const fetchData = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const sessionData = sessionStorage.getItem("district_user") || sessionStorage.getItem("user");
// // // // //       let districtNameParam = "RANCHI"; 
// // // // //       let districtId = "";
      
// // // // //       if (sessionData) {
// // // // //         const user = JSON.parse(sessionData);
// // // // //         if (user.districtId) districtId = user.districtId;
// // // // //         if (user.districtName) {
// // // // //           districtNameParam = user.districtName;
// // // // //           setDistrictName(user.districtName);
// // // // //         }
// // // // //       }

// // // // //       const queryParams = new URLSearchParams({
// // // // //         from: fromDate,
// // // // //         to: toDate,
// // // // //         districtName: districtNameParam,
// // // // //         ...(districtId && { districtId })
// // // // //       });
      
// // // // //       const res = await fetch(`/api/dashboard?${queryParams.toString()}`);
// // // // //       const data = await res.json();

// // // // //       if (!res.ok) throw new Error(data.error || "Network breakdown encountered.");

// // // // //       setKpiState(data.kpi || {});
// // // // //       setLocations(data.locations || []);

// // // // //       const formatChart = (apiArray: any[]) => {
// // // // //         return {
// // // // //           labels: apiArray.map((item: any) => `${item.name.toUpperCase()} : ${item.value}`),
// // // // //           data: apiArray.map((item: any) => item.value)
// // // // //         };
// // // // //       };

// // // // //       setChartsData({
// // // // //         gender: formatChart(data.gender || []),
// // // // //         age: formatChart(data.age || []),
// // // // //         complication: formatChart(data.complications || []),
// // // // //         referral: formatChart(data.referral || []),
// // // // //         caste: formatChart(data.caste || []),
// // // // //         outcome: formatChart(data.outcome || [])
// // // // //       });

// // // // //     } catch (error: any) {
// // // // //       console.error("Dashboard rendering error:", error);
// // // // //       toast.error(`Database Error: ${error.message || "Could not retrieve records."}`);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchData();
// // // // //   }, []);

// // // // //   const handleSearch = () => fetchData();
// // // // //   const handleDownloadExcel = () => toast.success("Exporting metrics matrix to Excel...");
// // // // //   const handleDownloadImage = () => toast.success("Saving snapshot to image device...");
// // // // //   const handleMtcSelect = (id: string) => setSelectedMtc(id === selectedMtc ? null : id);

// // // // //   const totalBeds = locations.reduce((sum, loc) => sum + (Number(loc.beds) || 0), 0);

// // // // //   const KPI_DATA = [
// // // // //     { label: 'Sanctioned MTCs', value: locations.length, gradient: 'from-emerald-500 to-teal-600' },
// // // // //     { label: 'Beds Sanctioned', value: totalBeds, gradient: 'from-cyan-500 to-blue-600' },
// // // // //     { label: 'Functional MTCs', value: locations.length, gradient: 'from-teal-500 to-emerald-600' },
// // // // //     { label: 'Beds Available', value: totalBeds, gradient: 'from-blue-500 to-indigo-600' },
// // // // //     { label: 'Total Admissions', value: kpiState.TotalAdmissions || 0, gradient: 'from-amber-500 to-orange-600' },
// // // // //     { label: 'Total Exits', value: kpiState.TotalExits || 0, gradient: 'from-rose-500 to-pink-600' },
// // // // //     { label: 'Total Cured', value: kpiState.TotalCured || 0, gradient: 'from-green-500 to-emerald-600' },
// // // // //     { label: 'Total Defaulters', value: kpiState.TotalDefaulters || 0, gradient: 'from-orange-500 to-amber-600' },
// // // // //     { label: 'Total Deaths', value: kpiState.TotalDeaths || 0, gradient: 'from-slate-600 to-slate-800' },
// // // // //     { label: 'Avg Weight Gain', value: `${kpiState.AvgWeightGain || 0} g/kg/d`, gradient: 'from-fuchsia-500 to-purple-600' },
// // // // //     { label: 'Bed Occupancy', value: `${kpiState.BedOccupancyRate || "0.00"}%`, gradient: 'from-indigo-500 to-purple-600' },
// // // // //     { label: 'Avg Days of Stay', value: kpiState.AvgStay || 0, gradient: 'from-sky-500 to-cyan-600' },
// // // // //   ];

// // // // //   // --- Chart Configurations ---
// // // // //   const genderDataConfig: ChartData<'doughnut'> = {
// // // // //     labels: chartsData.gender.labels,
// // // // //     datasets: [{ data: chartsData.gender.data, backgroundColor: ['#0b9f8f', '#2563eb', '#f59e0b'], borderWidth: 0 }]
// // // // //   };

// // // // //   const ageDataConfig: ChartData<'bar'> = {
// // // // //     labels: chartsData.age.labels.map(l => l.split(" : ")[0]),
// // // // //     datasets: [{ data: chartsData.age.data, backgroundColor: BG_COLORS.slice(0, 4), borderRadius: 6 }]
// // // // //   };

// // // // //   const complicationDataConfig: ChartData<'doughnut'> = {
// // // // //     labels: chartsData.complication.labels,
// // // // //     datasets: [{ data: chartsData.complication.data, backgroundColor: ['#ef4444', '#10b981'] }]
// // // // //   };

// // // // //   const referredDataConfig: ChartData<'bar'> = {
// // // // //     labels: chartsData.referral.labels.map(l => l.split(" : ")[0]),
// // // // //     datasets: [{ data: chartsData.referral.data, backgroundColor: BG_COLORS, borderRadius: 6 }]
// // // // //   };

// // // // //   const casteDataConfig: ChartData<'bar'> = {
// // // // //     labels: chartsData.caste.labels.map(l => l.split(" : ")[0]),
// // // // //     datasets: [{ data: chartsData.caste.data, backgroundColor: BG_COLORS.slice(4, 8), borderRadius: 6 }]
// // // // //   };

// // // // //   const outcomeDataConfig: ChartData<'bar'> = {
// // // // //     labels: chartsData.outcome.labels.map(l => l.split(" : ")[0]),
// // // // //     datasets: [{ data: chartsData.outcome.data, backgroundColor: BG_COLORS.slice(2, 7), borderRadius: 6 }]
// // // // //   };

// // // // //   const doughnutOptions: ChartOptions<'doughnut'> = {
// // // // //     responsive: true, maintainAspectRatio: false,
// // // // //     plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 }, padding: 15 } } },
// // // // //   };

// // // // //   const barOptions: ChartOptions<'bar'> = {
// // // // //     responsive: true, maintainAspectRatio: false,
// // // // //     plugins: { legend: { display: false } },
// // // // //     scales: { 
// // // // //       y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
// // // // //       x: { grid: { display: false } }
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased selection:bg-teal-500 selection:text-white pb-12 font-sans">
// // // // //       <Toaster position="top-right" />
      
// // // // //       {/* Top Banner Accent Line */}
// // // // //       <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600" />

// // // // //       <div className="container mx-auto px-4 pt-8">
        
// // // // //         {/* Modern Control & Dynamic Header Card */}
// // // // //         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8 transition-all duration-300 hover:shadow-md">
// // // // //           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
// // // // //             {/* Context Identification */}
// // // // //             <div className="flex items-center gap-4">
// // // // //               <div className="p-3 bg-teal-50 rounded-xl text-teal-700">
// // // // //                 <Building2 size={28} />
// // // // //               </div>
// // // // //               <div>
// // // // //                 <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
// // // // //                   {districtName.toUpperCase()} <span className="text-slate-400 font-normal">District Insights</span>
// // // // //                 </h1>
// // // // //                 <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
// // // // //                   <Calendar size={13} /> Temporal Range: <span className="font-semibold text-slate-700">{fromDate}</span> to <span className="font-semibold text-slate-700">{toDate}</span>
// // // // //                 </p>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Live Filter Forms */}
// // // // //             <div className="flex flex-wrap items-end gap-3 sm:flex-nowrap">
// // // // //               <div className="w-full sm:w-auto">
// // // // //                 <label className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">From Date</label>
// // // // //                 <input 
// // // // //                   type="date" 
// // // // //                   value={fromDate}
// // // // //                   onChange={(e) => setFromDate(e.target.value)}
// // // // //                   className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
// // // // //                 />
// // // // //               </div>
// // // // //               <div className="w-full sm:w-auto">
// // // // //                 <label className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1.5 font-semibold">To Date</label>
// // // // //                 <input 
// // // // //                   type="date" 
// // // // //                   value={toDate}
// // // // //                   onChange={(e) => setToDate(e.target.value)}
// // // // //                   className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
// // // // //                 />
// // // // //               </div>
// // // // //               <button 
// // // // //                 onClick={handleSearch}
// // // // //                 disabled={loading}
// // // // //                 className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm font-medium disabled:opacity-70 active:scale-95 duration-150 text-sm h-[38px]"
// // // // //               >
// // // // //                 {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />} 
// // // // //                 {loading ? "Syncing..." : "Update Filters"}
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>

// // // // //           <div className="h-px bg-slate-100 my-5" />

// // // // //           {/* Export Actions Platform */}
// // // // //           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
// // // // //             <div className="text-xs text-slate-500 flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
// // // // //               <Activity size={14} className="text-teal-600 animate-pulse" />
// // // // //               Infrastructure telemetry up-to-date.
// // // // //             </div>
            
// // // // //             {/* Option 1: Modern Tactile SVGs */}
// // // // //             <div className="flex gap-3 w-full sm:w-auto justify-end">
// // // // //               <button 
// // // // //                 onClick={handleDownloadExcel} 
// // // // //                 className="group flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all duration-200 rounded-xl font-medium shadow-sm active:scale-95 text-xs" 
// // // // //                 title="Download Spreadsheets"
// // // // //               >
// // // // //                 <svg className="w-4 h-4 text-emerald-600 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// // // // //                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// // // // //                 </svg>
// // // // //                 Export Matrix
// // // // //               </button>
              
// // // // //               <button 
// // // // //                 onClick={handleDownloadImage} 
// // // // //                 className="group flex items-center gap-2 px-4 py-2.5 bg-blue-550 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-200 rounded-xl font-medium shadow-sm active:scale-95 text-xs" 
// // // // //                 title="Capture Analytics View"
// // // // //               >
// // // // //                 <svg className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// // // // //                   <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
// // // // //                 </svg>
// // // // //                 Save Viewport
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Primary Interactive Workspace Grid */}
// // // // //         <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
// // // // //           {/* Left Column: Interactive Facility Directory */}
// // // // //           <div className="xl:col-span-4 lg:sticky lg:top-6">
// // // // //             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden h-[810px] flex flex-col transition-all hover:shadow-md">
// // // // //               <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
// // // // //                 <div>
// // // // //                   <h3 className="font-bold tracking-tight text-sm">FACILITY REGISTRY</h3>
// // // // //                   <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">{districtName} Zone</p>
// // // // //                 </div>
// // // // //                 <div className="text-xs flex items-center gap-1.5 font-semibold bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-emerald-400">
// // // // //                   <MapPin size={13} /> {locations.length} Units Active
// // // // //                 </div>
// // // // //               </div>
              
// // // // //               <div className="p-4 flex-1 overflow-y-auto bg-slate-50/40 space-y-3 custom-scrollbar">
// // // // //                 <p className="text-xs text-slate-400 px-1 mb-2">Select an MTC node to isolate custom institutional metrics:</p>
                
// // // // //                 {loading && locations.length === 0 ? (
// // // // //                   <div className="space-y-3 pt-4">
// // // // //                     {[1, 2, 3].map((n) => (
// // // // //                       <div key={n} className="p-4 bg-white border border-slate-100 rounded-xl space-y-3 animate-pulse">
// // // // //                         <div className="h-4 bg-slate-200 rounded w-2/3"></div>
// // // // //                         <div className="h-3 bg-slate-100 rounded w-1/2"></div>
// // // // //                       </div>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 ) : locations.length === 0 ? (
// // // // //                   <div className="text-center text-slate-400 py-16 text-sm flex flex-col items-center gap-2">
// // // // //                     <Building2 size={36} className="text-slate-300" />
// // // // //                     No active infrastructure discovered.
// // // // //                   </div>
// // // // //                 ) : (
// // // // //                   <div className="flex flex-col gap-2.5">
// // // // //                     {locations.map((mtc) => {
// // // // //                       const isSelected = selectedMtc === mtc.id;
// // // // //                       return (
// // // // //                         <div 
// // // // //                           key={mtc.id} 
// // // // //                           onClick={() => handleMtcSelect(mtc.id)}
// // // // //                           className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 relative group overflow-hidden ${
// // // // //                             isSelected 
// // // // //                               ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500 shadow-sm' 
// // // // //                               : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm'
// // // // //                           }`}
// // // // //                         >
// // // // //                           {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-600" />}
// // // // //                           <h4 className={`font-bold text-sm mb-3 transition-colors ${isSelected ? 'text-teal-900' : 'text-slate-800 group-hover:text-teal-700'}`}>
// // // // //                             {mtc.name}
// // // // //                           </h4>
// // // // //                           <div className="grid grid-cols-1 gap-2 text-xs text-slate-600">
// // // // //                             <div className="flex items-center gap-2.5">
// // // // //                               <User size={13} className="text-slate-400" /> 
// // // // //                               <span><strong className="text-slate-700 font-medium">MO In-Charge:</strong> {mtc.mo || 'Awaiting Assignment'}</span>
// // // // //                             </div>
// // // // //                             <div className="flex items-center gap-2.5">
// // // // //                               <Phone size={13} className="text-slate-400" /> 
// // // // //                               <span><strong className="text-slate-700 font-medium">Contact line:</strong> {mtc.contact || 'N/A'}</span>
// // // // //                             </div>
// // // // //                             <div className="flex items-center gap-2.5">
// // // // //                               <Bed size={13} className="text-slate-400" /> 
// // // // //                               <span><strong className="text-slate-700 font-medium">Net Allocation:</strong> <span className="text-slate-900 font-semibold">{mtc.beds || 0} Beds</span></span>
// // // // //                             </div>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       );
// // // // //                     })}
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Right Column: Key Statistics Matrix & Graph Grid */}
// // // // //           <div className="xl:col-span-8 space-y-8">
            
// // // // //             {/* High Impact Metrics Panel */}
// // // // //             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
// // // // //               {KPI_DATA.map((kpi, idx) => (
// // // // //                 <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col">
// // // // //                   <div className={`p-4 bg-gradient-to-br ${kpi.gradient} text-white flex-1 flex flex-col justify-between min-h-[105px]`}>
// // // // //                     <span className="text-[10px] tracking-wider font-bold uppercase opacity-85 leading-tight">{kpi.label}</span>
// // // // //                     <h3 className="text-2xl font-extrabold tracking-tight mt-2 flex items-baseline gap-1">
// // // // //                       {loading ? (
// // // // //                         <span className="h-6 w-12 bg-white/20 rounded animate-pulse inline-block" />
// // // // //                       ) : kpi.value}
// // // // //                     </h3>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>

// // // // //             {/* Visual Analytics Sections Portfolio */}
// // // // //             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
// // // // //               <div className="flex items-center gap-2 mb-6">
// // // // //                 <TrendingUp size={18} className="text-teal-600" />
// // // // //                 <h3 className="font-bold text-slate-900 text-sm tracking-tight uppercase">Distributive Analytics Matrices</h3>
// // // // //               </div>
              
// // // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
// // // // //                 {/* Individual Chart Viewports */}
// // // // //                 {[
// // // // //                   { title: "Gender Distribution", component: <Doughnut data={genderDataConfig} options={doughnutOptions} /> },
// // // // //                   { title: "Age Group Breakdown", component: <Bar data={ageDataConfig} options={barOptions} /> },
// // // // //                   { title: "Complication Classifications", component: <Doughnut data={complicationDataConfig} options={doughnutOptions} /> },
// // // // //                   { title: "Referred Via Channels", component: <Bar data={referredDataConfig} options={barOptions} /> },
// // // // //                   { title: "Demographic Profile Distribution", component: <Bar data={casteDataConfig} options={barOptions} /> },
// // // // //                   { title: "Exit Outcome Vectors", component: <Bar data={outcomeDataConfig} options={barOptions} /> }
// // // // //                 ].map((chart, cIdx) => (
// // // // //                   <div key={cIdx} className="bg-slate-50/60 rounded-xl border border-slate-100 p-5 flex flex-col justify-between hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-300">
// // // // //                     <h4 className="text-xs font-bold text-slate-700 mb-4 text-center tracking-wide uppercase">{chart.title}</h4>
// // // // //                     <div className="flex-1 min-h-[220px] relative flex items-center justify-center">
// // // // //                       {loading ? (
// // // // //                         <div className="flex flex-col items-center gap-2 text-slate-400">
// // // // //                           <Loader2 className="animate-spin text-slate-300" size={24} />
// // // // //                           <span className="text-[10px] uppercase font-semibold tracking-wider">Compiling plots...</span>
// // // // //                         </div>
// // // // //                       ) : chart.component}
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))}

// // // // //               </div>
// // // // //             </div>

// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // "use client";

// // // // import React, { useState, useEffect } from 'react';
// // // // import {
// // // //   Chart as ChartJS,
// // // //   ArcElement,
// // // //   Tooltip,
// // // //   Legend,
// // // //   CategoryScale,
// // // //   LinearScale,
// // // //   BarElement,
// // // //   Title,
// // // //   ChartData,
// // // //   ChartOptions
// // // // } from 'chart.js';
// // // // import { Bar, Doughnut } from 'react-chartjs-2';
// // // // import { Search, MapPin, User, Phone, Bed, Loader2, Calendar, TrendingUp, Building2, Activity } from 'lucide-react';
// // // // import toast, { Toaster } from 'react-hot-toast';

// // // // // --- Chart Registration ---
// // // // ChartJS.register(
// // // //   ArcElement,
// // // //   Tooltip,
// // // //   Legend,
// // // //   CategoryScale,
// // // //   LinearScale,
// // // //   BarElement,
// // // //   Title
// // // // );

// // // // const BG_COLORS = [
// // // //   '#0b9f8f', '#2563eb', '#f59e0b', '#ec4899', 
// // // //   '#8b5cf6', '#14b8a6', '#f43f5e', '#3b82f6'
// // // // ];

// // // // export default function Dashboard() {
// // // //   // --- State Setup ---
// // // //   const currentYear = new Date().getFullYear();
// // // //   const [fromDate, setFromDate] = useState(`${currentYear}-01-01`);
// // // //   const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
// // // //   const [selectedMtc, setSelectedMtc] = useState<string | null>(null);
// // // //   const [loading, setLoading] = useState(true);

// // // //   // Dynamic Context Elements
// // // //   const [districtName, setDistrictName] = useState("RANCHI");
// // // //   const [locations, setLocations] = useState<any[]>([]);
// // // //   const [kpiState, setKpiState] = useState<any>({});
  
// // // //   const [chartsData, setChartsData] = useState({
// // // //     gender: { labels: [] as string[], data: [] as number[] },
// // // //     age: { labels: [] as string[], data: [] as number[] },
// // // //     complication: { labels: [] as string[], data: [] as number[] },
// // // //     referral: { labels: [] as string[], data: [] as number[] },
// // // //     caste: { labels: [] as string[], data: [] as number[] },
// // // //     outcome: { labels: [] as string[], data: [] as number[] }
// // // //   });

// // // //   // --- API Sync Routine ---
// // // //   const fetchData = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const sessionData = sessionStorage.getItem("district_user") || sessionStorage.getItem("user");
// // // //       let districtNameParam = "RANCHI"; 
// // // //       let districtId = "";
      
// // // //       if (sessionData) {
// // // //         const user = JSON.parse(sessionData);
// // // //         if (user.districtId) districtId = user.districtId;
// // // //         if (user.districtName) {
// // // //           districtNameParam = user.districtName;
// // // //           setDistrictName(user.districtName);
// // // //         }
// // // //       }

// // // //       const queryParams = new URLSearchParams({
// // // //         from: fromDate,
// // // //         to: toDate,
// // // //         districtName: districtNameParam,
// // // //         ...(districtId && { districtId })
// // // //       });
      
// // // //       const res = await fetch(`/api/dashboard?${queryParams.toString()}`);
// // // //       const data = await res.json();

// // // //       if (!res.ok) throw new Error(data.error || "Network breakdown encountered.");

// // // //       setKpiState(data.kpi || {});
// // // //       setLocations(data.locations || []);

// // // //       const formatChart = (apiArray: any[]) => {
// // // //         return {
// // // //           labels: apiArray.map((item: any) => `${item.name.toUpperCase()} : ${item.value}`),
// // // //           data: apiArray.map((item: any) => item.value)
// // // //         };
// // // //       };

// // // //       setChartsData({
// // // //         gender: formatChart(data.gender || []),
// // // //         age: formatChart(data.age || []),
// // // //         complication: formatChart(data.complications || []),
// // // //         referral: formatChart(data.referral || []),
// // // //         caste: formatChart(data.caste || []),
// // // //         outcome: formatChart(data.outcome || [])
// // // //       });

// // // //     } catch (error: any) {
// // // //       console.error("Dashboard rendering error:", error);
// // // //       toast.error(`Database Error: ${error.message || "Could not retrieve records."}`);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchData();
// // // //   }, []);

// // // //   const handleSearch = () => fetchData();
// // // //   const handleDownloadExcel = () => toast.success("Exporting metrics matrix to Excel...");
// // // //   const handleDownloadImage = () => toast.success("Saving snapshot to image device...");
// // // //   const handleMtcSelect = (id: string) => setSelectedMtc(id === selectedMtc ? null : id);

// // // //   const totalBeds = locations.reduce((sum, loc) => sum + (Number(loc.beds) || 0), 0);

// // // //   const KPI_DATA = [
// // // //     { label: 'Sanctioned MTCs', value: locations.length, gradient: 'from-emerald-500 to-teal-600' },
// // // //     { label: 'Beds Sanctioned', value: totalBeds, gradient: 'from-cyan-500 to-blue-600' },
// // // //     { label: 'Functional MTCs', value: locations.length, gradient: 'from-teal-500 to-emerald-600' },
// // // //     { label: 'Beds Available', value: totalBeds, gradient: 'from-blue-500 to-indigo-600' },
// // // //     { label: 'Total Admissions', value: kpiState.TotalAdmissions || 0, gradient: 'from-amber-500 to-orange-600' },
// // // //     { label: 'Total Exits', value: kpiState.TotalExits || 0, gradient: 'from-rose-500 to-pink-600' },
// // // //     { label: 'Total Cured', value: kpiState.TotalCured || 0, gradient: 'from-green-500 to-emerald-600' },
// // // //     { label: 'Total Defaulters', value: kpiState.TotalDefaulters || 0, gradient: 'from-orange-500 to-amber-600' },
// // // //     { label: 'Total Deaths', value: kpiState.TotalDeaths || 0, gradient: 'from-slate-600 to-slate-800' },
// // // //     { label: 'Avg Weight Gain', value: `${kpiState.AvgWeightGain || 0} g/kg/d`, gradient: 'from-fuchsia-500 to-purple-600' },
// // // //     { label: 'Bed Occupancy', value: `${kpiState.BedOccupancyRate || "0.00"}%`, gradient: 'from-indigo-500 to-purple-600' },
// // // //     { label: 'Avg Days of Stay', value: kpiState.AvgStay || 0, gradient: 'from-sky-500 to-cyan-600' },
// // // //   ];

// // // //   // --- Chart Configurations ---
// // // //   const genderDataConfig: ChartData<'doughnut'> = {
// // // //     labels: chartsData.gender.labels,
// // // //     datasets: [{ data: chartsData.gender.data, backgroundColor: ['#0b9f8f', '#2563eb', '#f59e0b'], hoverBorderWidth: 0 }]
// // // //   };

// // // //   const ageDataConfig: ChartData<'bar'> = {
// // // //     labels: chartsData.age.labels.map(l => l.split(" : ")[0]),
// // // //     datasets: [{ data: chartsData.age.data, backgroundColor: BG_COLORS.slice(0, 4), borderRadius: 6 }]
// // // //   };

// // // //   const complicationDataConfig: ChartData<'doughnut'> = {
// // // //     labels: chartsData.complication.labels,
// // // //     datasets: [{ data: chartsData.complication.data, backgroundColor: ['#ef4444', '#10b981'] }]
// // // //   };

// // // //   const referredDataConfig: ChartData<'bar'> = {
// // // //     labels: chartsData.referral.labels.map(l => l.split(" : ")[0]),
// // // //     datasets: [{ data: chartsData.referral.data, backgroundColor: BG_COLORS, borderRadius: 6 }]
// // // //   };

// // // //   const casteDataConfig: ChartData<'bar'> = {
// // // //     labels: chartsData.caste.labels.map(l => l.split(" : ")[0]),
// // // //     datasets: [{ data: chartsData.caste.data, backgroundColor: BG_COLORS.slice(4, 8), borderRadius: 6 }]
// // // //   };

// // // //   const outcomeDataConfig: ChartData<'bar'> = {
// // // //     labels: chartsData.outcome.labels.map(l => l.split(" : ")[0]),
// // // //     datasets: [{ data: chartsData.outcome.data, backgroundColor: BG_COLORS.slice(2, 7), borderRadius: 6 }]
// // // //   };

// // // //   const doughnutOptions: ChartOptions<'doughnut'> = {
// // // //     responsive: true, maintainAspectRatio: false,
// // // //     plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 }, padding: 15 } } },
// // // //   };

// // // //   const barOptions: ChartOptions<'bar'> = {
// // // //     responsive: true, maintainAspectRatio: false,
// // // //     plugins: { legend: { display: false } },
// // // //     scales: { 
// // // //       y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
// // // //       x: { grid: { display: false } }
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased pb-12 font-sans">
// // // //       <Toaster position="top-right" />
      
// // // //       <div className="container mx-auto px-4 pt-8">
        
// // // //         {/* Modern Control Header Card */}
// // // //         <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 mb-8 transition-all duration-300">
// // // //           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
// // // //             {/* Context Identification */}
// // // //             <div className="flex items-center gap-4">
// // // //               <div className="p-3 bg-slate-900 rounded-xl text-white">
// // // //                 <Building2 size={26} />
// // // //               </div>
// // // //               <div>
// // // //                 <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
// // // //                   {districtName.toUpperCase()} <span className="text-slate-400 font-normal">District Dashboard</span>
// // // //                 </h1>
// // // //                 <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
// // // //                   <Calendar size={13} /> Active Range: <span className="font-semibold text-slate-700">{fromDate}</span> to <span className="font-semibold text-slate-700">{toDate}</span>
// // // //                 </p>
// // // //               </div>
// // // //             </div>

// // // //             {/* Live Filter Forms */}
// // // //             <div className="flex flex-wrap items-end gap-3 sm:flex-nowrap">
// // // //               <div className="w-full sm:w-auto">
// // // //                 <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">From</label>
// // // //                 <input 
// // // //                   type="date" 
// // // //                   value={fromDate}
// // // //                   onChange={(e) => setFromDate(e.target.value)}
// // // //                   className="w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-xl text-xs font-medium text-slate-707 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
// // // //                 />
// // // //               </div>
// // // //               <div className="w-full sm:w-auto">
// // // //                 <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">To</label>
// // // //                 <input 
// // // //                   type="date" 
// // // //                   value={toDate}
// // // //                   onChange={(e) => setToDate(e.target.value)}
// // // //                   className="w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-xl text-xs font-medium text-slate-707 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
// // // //                 />
// // // //               </div>
// // // //               <button 
// // // //                 onClick={handleSearch}
// // // //                 disabled={loading}
// // // //                 className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl transition-all shadow-sm font-semibold disabled:opacity-70 text-xs active:scale-95 duration-150 h-[34px]"
// // // //               >
// // // //                 {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />} 
// // // //                 Filter
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           <div className="h-px bg-slate-100 my-5" />

// // // //           {/* Export Actions Platform: Monolithic Segmented Component */}
// // // //           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
// // // //             <div className="text-xs text-slate-500 flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
// // // //               <Activity size={14} className="text-emerald-600 animate-pulse" />
// // // //               Operational intelligence sync complete.
// // // //             </div>
            
// // // //             {/* Split SaaS Component Element */}
// // // //             <div className="flex items-center overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm p-1 gap-0.5">
// // // //               <button 
// // // //                 onClick={handleDownloadExcel} 
// // // //                 className="group flex items-center gap-2 px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 transition-all rounded-lg text-xs font-semibold active:scale-95"
// // // //               >
// // // //                 <svg className="w-4 h-4 text-emerald-600 transition-transform duration-200 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// // // //                 </svg>
// // // //                 <span>Export Matrix</span>
// // // //               </button>

// // // //               <div className="w-[1px] h-4 bg-slate-200 mx-1" />

// // // //               <button 
// // // //                 onClick={handleDownloadImage} 
// // // //                 className="group flex items-center gap-2 px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 transition-all rounded-lg text-xs font-semibold active:scale-95"
// // // //               >
// // // //                 <svg className="w-4 h-4 text-indigo-600 transition-transform duration-200 group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
// // // //                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
// // // //                 </svg>
// // // //                 <span>Save Viewport</span>
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Workspace Layout Content */}
// // // //         <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
// // // //           {/* Left Column: Interactive Facility Directory */}
// // // //           <div className="xl:col-span-4 lg:sticky lg:top-6">
// // // //             <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden h-[810px] flex flex-col transition-all">
// // // //               <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
// // // //                 <div>
// // // //                   <h3 className="font-bold tracking-tight text-xs tracking-wider uppercase">Facility Registry</h3>
// // // //                 </div>
// // // //                 <div className="text-[11px] flex items-center gap-1.5 font-bold bg-white/10 px-2.5 py-1 rounded-lg text-emerald-400">
// // // //                   <MapPin size={12} /> {locations.length} Units Active
// // // //                 </div>
// // // //               </div>
              
// // // //               <div className="p-4 flex-1 overflow-y-auto bg-slate-50/40 space-y-3">
// // // //                 <p className="text-xs text-slate-400 px-1 mb-2">Select a facility to filter regional records:</p>
                
// // // //                 {loading && locations.length === 0 ? (
// // // //                   <div className="space-y-3 pt-4">
// // // //                     {[1, 2, 3].map((n) => (
// // // //                       <div key={n} className="p-4 bg-white border border-slate-100 rounded-xl space-y-3 animate-pulse">
// // // //                         <div className="h-4 bg-slate-200 rounded w-2/3"></div>
// // // //                         <div className="h-3 bg-slate-100 rounded w-1/2"></div>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 ) : locations.length === 0 ? (
// // // //                   <div className="text-center text-slate-400 py-16 text-sm flex flex-col items-center gap-2">
// // // //                     <Building2 size={36} className="text-slate-300" />
// // // //                     No active infrastructure discovered.
// // // //                   </div>
// // // //                 ) : (
// // // //                   <div className="flex flex-col gap-2.5">
// // // //                     {locations.map((mtc) => {
// // // //                       const isSelected = selectedMtc === mtc.id;
// // // //                       return (
// // // //                         <div 
// // // //                           key={mtc.id} 
// // // //                           onClick={() => handleMtcSelect(mtc.id)}
// // // //                           className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 relative group overflow-hidden ${
// // // //                             isSelected 
// // // //                               ? 'border-slate-900 bg-slate-900 text-white shadow-sm' 
// // // //                               : 'border-slate-200 bg-white hover:border-slate-400'
// // // //                           }`}
// // // //                         >
// // // //                           <h4 className={`font-bold text-sm mb-3 ${isSelected ? 'text-white' : 'text-slate-800'}`}>
// // // //                             {mtc.name}
// // // //                           </h4>
// // // //                           <div className={`grid grid-cols-1 gap-2 text-xs ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
// // // //                             <div className="flex items-center gap-2.5">
// // // //                               <User size={13} className="opacity-70" /> 
// // // //                               <span><strong className={isSelected ? 'text-white font-medium' : 'text-slate-700 font-medium'}>MO In-Charge:</strong> {mtc.mo || 'Awaiting Assignment'}</span>
// // // //                             </div>
// // // //                             <div className="flex items-center gap-2.5">
// // // //                               <Phone size={13} className="opacity-70" /> 
// // // //                               <span><strong className={isSelected ? 'text-white font-medium' : 'text-slate-700 font-medium'}>Contact line:</strong> {mtc.contact || 'N/A'}</span>
// // // //                             </div>
// // // //                             <div className="flex items-center gap-2.5">
// // // //                               <Bed size={13} className="opacity-70" /> 
// // // //                               <span><strong className={isSelected ? 'text-white font-medium' : 'text-slate-700 font-medium'}>Net Allocation:</strong> <span className={isSelected ? 'text-emerald-400 font-bold' : 'text-slate-900 font-semibold'}>{mtc.beds || 0} Beds</span></span>
// // // //                             </div>
// // // //                           </div>
// // // //                         </div>
// // // //                       );
// // // //                     })}
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Right Column: Key Statistics Matrix & Graph Grid */}
// // // //           <div className="xl:col-span-8 space-y-8">
            
// // // //             {/* High Impact Metrics Panel */}
// // // //             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
// // // //               {KPI_DATA.map((kpi, idx) => (
// // // //                 <div key={idx} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col">
// // // //                   <div className={`p-4 bg-gradient-to-br ${kpi.gradient} text-white flex-1 flex flex-col justify-between min-h-[105px]`}>
// // // //                     <span className="text-[10px] tracking-wider font-bold uppercase opacity-85 leading-tight">{kpi.label}</span>
// // // //                     <h3 className="text-2xl font-extrabold tracking-tight mt-2 flex items-baseline gap-1">
// // // //                       {loading ? (
// // // //                         <span className="h-6 w-12 bg-white/20 rounded animate-pulse inline-block" />
// // // //                       ) : kpi.value}
// // // //                     </h3>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>

// // // //             {/* Visual Analytics Sections Portfolio */}
// // // //             <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
// // // //               <div className="flex items-center gap-2 mb-6">
// // // //                 <TrendingUp size={18} className="text-slate-900" />
// // // //                 <h3 className="font-bold text-slate-900 text-sm tracking-tight uppercase">Distributive Analytics Matrices</h3>
// // // //               </div>
              
// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
// // // //                 {[
// // // //                   { title: "Gender Distribution", component: <Doughnut data={genderDataConfig} options={doughnutOptions} /> },
// // // //                   { title: "Age Group Breakdown", component: <Bar data={ageDataConfig} options={barOptions} /> },
// // // //                   { title: "Complication Classifications", component: <Doughnut data={complicationDataConfig} options={doughnutOptions} /> },
// // // //                   { title: "Referred Via Channels", component: <Bar data={referredDataConfig} options={barOptions} /> },
// // // //                   { title: "Demographic Profile Distribution", component: <Bar data={casteDataConfig} options={barOptions} /> },
// // // //                   { title: "Exit Outcome Vectors", component: <Bar data={outcomeDataConfig} options={barOptions} /> }
// // // //                 ].map((chart, cIdx) => (
// // // //                   <div key={cIdx} className="bg-slate-50/60 rounded-xl border border-slate-200/60 p-5 flex flex-col justify-between hover:bg-white hover:border-slate-300 transition-all duration-300">
// // // //                     <h4 className="text-xs font-bold text-slate-700 mb-4 text-center tracking-wide uppercase">{chart.title}</h4>
// // // //                     <div className="flex-1 min-h-[220px] relative flex items-center justify-center">
// // // //                       {loading ? (
// // // //                         <div className="flex flex-col items-center gap-2 text-slate-400">
// // // //                           <Loader2 className="animate-spin text-slate-300" size={24} />
// // // //                           <span className="text-[10px] uppercase font-semibold tracking-wider">Compiling plots...</span>
// // // //                         </div>
// // // //                       ) : chart.component}
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}

// // // //               </div>
// // // //             </div>

// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   Chart as ChartJS,
// // //   ArcElement,
// // //   Tooltip,
// // //   Legend,
// // //   CategoryScale,
// // //   LinearScale,
// // //   BarElement,
// // //   Title,
// // //   ChartData,
// // //   ChartOptions
// // // } from 'chart.js';
// // // import { Bar, Doughnut } from 'react-chartjs-2';
// // // import { Search, MapPin, User, Phone, Bed, Loader2, Calendar, TrendingUp, Building2, Activity } from 'lucide-react';
// // // import toast, { Toaster } from 'react-hot-toast';

// // // // --- Chart Registration ---
// // // ChartJS.register(
// // //   ArcElement,
// // //   Tooltip,
// // //   Legend,
// // //   CategoryScale,
// // //   LinearScale,
// // //   BarElement,
// // //   Title
// // // );

// // // const BG_COLORS = [
// // //   '#0b9f8f', '#2563eb', '#f59e0b', '#ec4899', 
// // //   '#8b5cf6', '#14b8a6', '#f43f5e', '#3b82f6'
// // // ];

// // // export default function Dashboard() {
// // //   // --- State Setup ---
// // //   const currentYear = new Date().getFullYear();
// // //   const [fromDate, setFromDate] = useState(`${currentYear}-01-01`);
// // //   const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
// // //   const [selectedMtc, setSelectedMtc] = useState<string | null>(null);
// // //   const [loading, setLoading] = useState(true);

// // //   // Dynamic Context Elements
// // //   const [districtName, setDistrictName] = useState("RANCHI");
// // //   const [locations, setLocations] = useState<any[]>([]);
// // //   const [kpiState, setKpiState] = useState<any>({});
  
// // //   const [chartsData, setChartsData] = useState({
// // //     gender: { labels: [] as string[], data: [] as number[] },
// // //     age: { labels: [] as string[], data: [] as number[] },
// // //     complication: { labels: [] as string[], data: [] as number[] },
// // //     referral: { labels: [] as string[], data: [] as number[] },
// // //     caste: { labels: [] as string[], data: [] as number[] },
// // //     outcome: { labels: [] as string[], data: [] as number[] }
// // //   });

// // //   // --- API Sync Routine ---
// // //   const fetchData = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const sessionData = sessionStorage.getItem("district_user") || sessionStorage.getItem("user");
// // //       let districtNameParam = "RANCHI"; 
// // //       let districtId = "";
      
// // //       if (sessionData) {
// // //         const user = JSON.parse(sessionData);
// // //         if (user.districtId) districtId = user.districtId;
// // //         if (user.districtName) {
// // //           districtNameParam = user.districtName;
// // //           setDistrictName(user.districtName);
// // //         }
// // //       }

// // //       const queryParams = new URLSearchParams({
// // //         from: fromDate,
// // //         to: toDate,
// // //         districtName: districtNameParam,
// // //         ...(districtId && { districtId })
// // //       });
      
// // //       const res = await fetch(`/api/dashboard?${queryParams.toString()}`);
// // //       const data = await res.json();

// // //       if (!res.ok) throw new Error(data.error || "Network breakdown encountered.");

// // //       setKpiState(data.kpi || {});
// // //       setLocations(data.locations || []);

// // //       const formatChart = (apiArray: any[]) => {
// // //         return {
// // //           labels: apiArray.map((item: any) => `${item.name.toUpperCase()} : ${item.value}`),
// // //           data: apiArray.map((item: any) => item.value)
// // //         };
// // //       };

// // //       setChartsData({
// // //         gender: formatChart(data.gender || []),
// // //         age: formatChart(data.age || []),
// // //         complication: formatChart(data.complications || []),
// // //         referral: formatChart(data.referral || []),
// // //         caste: formatChart(data.caste || []),
// // //         outcome: formatChart(data.outcome || [])
// // //       });

// // //     } catch (error: any) {
// // //       console.error("Dashboard rendering error:", error);
// // //       toast.error(`Database Error: ${error.message || "Could not retrieve records."}`);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, []);

// // //   const handleSearch = () => fetchData();

// // //   // --- Fully Implemented Data Export System ---
// // //   const handleDownloadExcel = () => {
// // //     try {
// // //       toast.loading("Compiling telemetry rows...", { id: "export-excel" });
      
// // //       // Build metrics matrix structure
// // //       let csvContent = "data:text/csv;charset=utf-8,";
      
// // //       // Section 1: Meta Headers
// // //       csvContent += `DISTRICT METRICS MATRIX REPORT: ${districtName.toUpperCase()}\n`;
// // //       csvContent += `Temporal Scope, From: ${fromDate} To: ${toDate}\n\n`;
      
// // //       // Section 2: Key Operational High-Impact KPIs
// // //       csvContent += "KEY PERFORMANCE INDICATORS (KPIs)\n";
// // //       csvContent += "Indicator Metric,Value Data Value\n";
// // //       csvContent += `Total Sanctioned MTCs,${locations.length}\n`;
// // //       csvContent += `Total Admissions,${kpiState.TotalAdmissions || 0}\n`;
// // //       csvContent += `Total Exits,${kpiState.TotalExits || 0}\n`;
// // //       csvContent += `Total Cured,${kpiState.TotalCured || 0}\n`;
// // //       csvContent += `Total Defaulters,${kpiState.TotalDefaulters || 0}\n`;
// // //       csvContent += `Total Deaths,${kpiState.TotalDeaths || 0}\n`;
// // //       csvContent += `Avg Weight Gain (g/kg/day),${kpiState.AvgWeightGain || 0}\n`;
// // //       csvContent += `Bed Occupancy Rate (%),${kpiState.BedOccupancyRate || 0}%\n`;
// // //       csvContent += `Average Days of Stay,${kpiState.AvgStay || 0}\n\n`;
      
// // //       // Section 3: Node-by-Node Registries
// // //       csvContent += "ACTIVE INSTITUTIONAL INFRASTRUCTURE REGISTRY\n";
// // //       csvContent += "Facility ID,MTC Center Name,Medical Officer In-Charge,Contact Information,Assigned Beds Capacity\n";
      
// // //       locations.forEach((loc) => {
// // //         csvContent += `"${loc.id}","${loc.name}","${loc.mo || 'N/A'}","${loc.contact || 'N/A'}",${loc.beds || 0}\n`;
// // //       });
      
// // //       // Trigger native download anchor pipeline
// // //       const encodedUri = encodeURI(csvContent);
// // //       const link = document.createElement("a");
// // //       link.setAttribute("href", encodedUri);
// // //       link.setAttribute("download", `MTC_Metrics_Matrix_${districtName.toLowerCase()}_${fromDate}_to_${toDate}.csv`);
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       document.body.removeChild(link);
      
// // //       toast.success("Excel/CSV metrics matrix downloaded successfully!", { id: "export-excel" });
// // //     } catch (err) {
// // //       toast.error("Failed to compile spreadsheet download.", { id: "export-excel" });
// // //     }
// // //   };

// // //   // --- Fully Implemented Viewport Capture System ---
// // //   const handleDownloadImage = () => {
// // //     try {
// // //       toast.loading("Preparing viewport layout structure...", { id: "export-view" });
      
// // //       // Triggers native cross-device vector serialization print context setup cleanly without bloated libraries
// // //       setTimeout(() => {
// // //         window.print();
// // //         toast.success("Viewport layout processed!", { id: "export-view" });
// // //       }, 500);
// // //     } catch (err) {
// // //       toast.error("Failed to initialize viewport preservation.", { id: "export-view" });
// // //     }
// // //   };

// // //   const handleMtcSelect = (id: string) => setSelectedMtc(id === selectedMtc ? null : id);

// // //   const totalBeds = locations.reduce((sum, loc) => sum + (Number(loc.beds) || 0), 0);

// // //   const KPI_DATA = [
// // //     { label: 'Sanctioned MTCs', value: locations.length, gradient: 'from-emerald-500 to-teal-600' },
// // //     { label: 'Beds Sanctioned', value: totalBeds, gradient: 'from-cyan-500 to-blue-600' },
// // //     { label: 'Functional MTCs', value: locations.length, gradient: 'from-teal-500 to-emerald-600' },
// // //     { label: 'Beds Available', value: totalBeds, gradient: 'from-blue-500 to-indigo-600' },
// // //     { label: 'Total Admissions', value: kpiState.TotalAdmissions || 0, gradient: 'from-amber-500 to-orange-600' },
// // //     { label: 'Total Exits', value: kpiState.TotalExits || 0, gradient: 'from-rose-500 to-pink-600' },
// // //     { label: 'Total Cured', value: kpiState.TotalCured || 0, gradient: 'from-green-500 to-emerald-600' },
// // //     { label: 'Total Defaulters', value: kpiState.TotalDefaulters || 0, gradient: 'from-orange-500 to-amber-600' },
// // //     { label: 'Total Deaths', value: kpiState.TotalDeaths || 0, gradient: 'from-slate-600 to-slate-800' },
// // //     { label: 'Avg Weight Gain', value: `${kpiState.AvgWeightGain || 0} g/kg/d`, gradient: 'from-fuchsia-500 to-purple-600' },
// // //     { label: 'Bed Occupancy', value: `${kpiState.BedOccupancyRate || "0.00"}%`, gradient: 'from-indigo-500 to-purple-600' },
// // //     { label: 'Avg Days of Stay', value: kpiState.AvgStay || 0, gradient: 'from-sky-500 to-cyan-600' },
// // //   ];

// // //   // --- Chart Configurations ---
// // //   const genderDataConfig: ChartData<'doughnut'> = {
// // //     labels: chartsData.gender.labels,
// // //     datasets: [{ data: chartsData.gender.data, backgroundColor: ['#0b9f8f', '#2563eb', '#f59e0b'], hoverBorderWidth: 0 }]
// // //   };

// // //   const ageDataConfig: ChartData<'bar'> = {
// // //     labels: chartsData.age.labels.map(l => l.split(" : ")[0]),
// // //     datasets: [{ data: chartsData.age.data, backgroundColor: BG_COLORS.slice(0, 4), borderRadius: 6 }]
// // //   };

// // //   const complicationDataConfig: ChartData<'doughnut'> = {
// // //     labels: chartsData.complication.labels,
// // //     datasets: [{ data: chartsData.complication.data, backgroundColor: ['#ef4444', '#10b981'] }]
// // //   };

// // //   const referredDataConfig: ChartData<'bar'> = {
// // //     labels: chartsData.referral.labels.map(l => l.split(" : ")[0]),
// // //     datasets: [{ data: chartsData.referral.data, backgroundColor: BG_COLORS, borderRadius: 6 }]
// // //   };

// // //   const casteDataConfig: ChartData<'bar'> = {
// // //     labels: chartsData.caste.labels.map(l => l.split(" : ")[0]),
// // //     datasets: [{ data: chartsData.caste.data, backgroundColor: BG_COLORS.slice(4, 8), borderRadius: 6 }]
// // //   };

// // //   const outcomeDataConfig: ChartData<'bar'> = {
// // //     labels: chartsData.outcome.labels.map(l => l.split(" : ")[0]),
// // //     datasets: [{ data: chartsData.outcome.data, backgroundColor: BG_COLORS.slice(2, 7), borderRadius: 6 }]
// // //   };

// // //   const doughnutOptions: ChartOptions<'doughnut'> = {
// // //     responsive: true, maintainAspectRatio: false,
// // //     plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 }, padding: 15 } } },
// // //   };

// // //   const barOptions: ChartOptions<'bar'> = {
// // //     responsive: true, maintainAspectRatio: false,
// // //     plugins: { legend: { display: false } },
// // //     scales: { 
// // //       y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
// // //       x: { grid: { display: false } }
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased pb-12 font-sans print:bg-white print:pb-0">
// // //       <Toaster position="top-right" />
      
// // //       <div className="container mx-auto px-4 pt-8 print:pt-2 print:max-w-full">
        
// // //         {/* Modern Control Header Card */}
// // //         <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 mb-8 transition-all duration-300 print:shadow-none print:border-none print:mb-4">
// // //           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 print:flex-row">
            
// // //             {/* Context Identification */}
// // //             <div className="flex items-center gap-4">
// // //               <div className="p-3 bg-slate-900 rounded-xl text-white print:bg-slate-100 print:text-slate-900">
// // //                 <Building2 size={26} />
// // //               </div>
// // //               <div>
// // //                 <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
// // //                   {districtName.toUpperCase()} <span className="text-slate-400 font-normal">District Dashboard</span>
// // //                 </h1>
// // //                 <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
// // //                   <Calendar size={13} /> Active Range: <span className="font-semibold text-slate-700">{fromDate}</span> to <span className="font-semibold text-slate-700">{toDate}</span>
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             {/* Live Filter Forms - hidden automatically on print preservation execution */}
// // //             <div className="flex flex-wrap items-end gap-3 sm:flex-nowrap print:hidden">
// // //               <div className="w-full sm:w-auto">
// // //                 <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">From</label>
// // //                 <input 
// // //                   type="date" 
// // //                   value={fromDate}
// // //                   onChange={(e) => setFromDate(e.target.value)}
// // //                   className="w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
// // //                 />
// // //               </div>
// // //               <div className="w-full sm:w-auto">
// // //                 <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">To</label>
// // //                 <input 
// // //                   type="date" 
// // //                   value={toDate}
// // //                   onChange={(e) => setToDate(e.target.value)}
// // //                   className="w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
// // //                 />
// // //               </div>
// // //               <button 
// // //                 onClick={handleSearch}
// // //                 disabled={loading}
// // //                 className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl transition-all shadow-sm font-semibold disabled:opacity-70 text-xs active:scale-95 duration-150 h-[34px]"
// // //               >
// // //                 {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />} 
// // //                 Filter
// // //               </button>
// // //             </div>
// // //           </div>

// // //           <div className="h-px bg-slate-100 my-5 print:my-3" />

// // //           {/* Export Actions Platform: SaaS Segmented Style */}
// // //           <div className="flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
// // //             <div className="text-xs text-slate-500 flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
// // //               <Activity size={14} className="text-emerald-600 animate-pulse" />
// // //               Operational intelligence sync complete.
// // //             </div>
            
// // //             {/* Split Action Component Module */}
// // //             <div className="flex items-center overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm p-1 gap-0.5">
// // //               <button 
// // //                 onClick={handleDownloadExcel} 
// // //                 className="group flex items-center gap-2 px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 transition-all rounded-lg text-xs font-semibold active:scale-95"
// // //               >
// // //                 <svg className="w-4 h-4 text-emerald-600 transition-transform duration-200 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// // //                 </svg>
// // //                 <span>Export Matrix</span>
// // //               </button>

// // //               <div className="w-[1px] h-4 bg-slate-200 mx-1" />

// // //               <button 
// // //                 onClick={handleDownloadImage} 
// // //                 className="group flex items-center gap-2 px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 transition-all rounded-lg text-xs font-semibold active:scale-95"
// // //               >
// // //                 <svg className="w-4 h-4 text-indigo-600 transition-transform duration-200 group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
// // //                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
// // //                 </svg>
// // //                 <span>Save Viewport</span>
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Workspace Layout Content */}
// // //         <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start print:block">
          
// // //           {/* Left Column: Interactive Facility Directory */}
// // //           <div className="xl:col-span-4 lg:sticky lg:top-6 print:hidden">
// // //             <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden h-[810px] flex flex-col transition-all">
// // //               <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
// // //                 <div>
// // //                   <h3 className="font-bold tracking-tight text-xs tracking-wider uppercase">Facility Registry</h3>
// // //                 </div>
// // //                 <div className="text-[11px] flex items-center gap-1.5 font-bold bg-white/10 px-2.5 py-1 rounded-lg text-emerald-400">
// // //                   <MapPin size={12} /> {locations.length} Units Active
// // //                 </div>
// // //               </div>
              
// // //               <div className="p-4 flex-1 overflow-y-auto bg-slate-50/40 space-y-3">
// // //                 <p className="text-xs text-slate-400 px-1 mb-2">Select a facility to filter regional records:</p>
                
// // //                 {loading && locations.length === 0 ? (
// // //                   <div className="space-y-3 pt-4">
// // //                     {[1, 2, 3].map((n) => (
// // //                       <div key={n} className="p-4 bg-white border border-slate-100 rounded-xl space-y-3 animate-pulse">
// // //                         <div className="h-4 bg-slate-200 rounded w-2/3"></div>
// // //                         <div className="h-3 bg-slate-100 rounded w-1/2"></div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 ) : locations.length === 0 ? (
// // //                   <div className="text-center text-slate-400 py-16 text-sm flex flex-col items-center gap-2">
// // //                     <Building2 size={36} className="text-slate-300" />
// // //                     No active infrastructure discovered.
// // //                   </div>
// // //                 ) : (
// // //                   <div className="flex flex-col gap-2.5">
// // //                     {locations.map((mtc) => {
// // //                       const isSelected = selectedMtc === mtc.id;
// // //                       return (
// // //                         <div 
// // //                           key={mtc.id} 
// // //                           onClick={() => handleMtcSelect(mtc.id)}
// // //                           className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 relative group overflow-hidden ${
// // //                             isSelected 
// // //                               ? 'border-slate-900 bg-slate-900 text-white shadow-sm' 
// // //                               : 'border-slate-200 bg-white hover:border-slate-400'
// // //                           }`}
// // //                         >
// // //                           <h4 className={`font-bold text-sm mb-3 ${isSelected ? 'text-white' : 'text-slate-800'}`}>
// // //                             {mtc.name}
// // //                           </h4>
// // //                           <div className={`grid grid-cols-1 gap-2 text-xs ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
// // //                             <div className="flex items-center gap-2.5">
// // //                               <User size={13} className="opacity-70" /> 
// // //                               <span><strong className={isSelected ? 'text-white font-medium' : 'text-slate-700 font-medium'}>MO In-Charge:</strong> {mtc.mo || 'Awaiting Assignment'}</span>
// // //                             </div>
// // //                             <div className="flex items-center gap-2.5">
// // //                               <Phone size={13} className="opacity-70" /> 
// // //                               <span><strong className={isSelected ? 'text-white font-medium' : 'text-slate-700 font-medium'}>Contact line:</strong> {mtc.contact || 'N/A'}</span>
// // //                             </div>
// // //                             <div className="flex items-center gap-2.5">
// // //                               <Bed size={13} className="opacity-70" /> 
// // //                               <span><strong className={isSelected ? 'text-white font-medium' : 'text-slate-700 font-medium'}>Net Allocation:</strong> <span className={isSelected ? 'text-emerald-400 font-bold' : 'text-slate-900 font-semibold'}>{mtc.beds || 0} Beds</span></span>
// // //                             </div>
// // //                           </div>
// // //                         </div>
// // //                       );
// // //                     })}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Right Column: Key Statistics Matrix & Graph Grid */}
// // //           <div className="xl:col-span-8 space-y-8 print:w-full">
            
// // //             {/* High Impact Metrics Panel */}
// // //             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 print:grid-cols-3 print:gap-2">
// // //               {KPI_DATA.map((kpi, idx) => (
// // //                 <div key={idx} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col print:shadow-none print:border print:border-slate-300">
// // //                   <div className={`p-4 bg-gradient-to-br ${kpi.gradient} text-white flex-1 flex flex-col justify-between min-h-[105px] print:bg-none print:text-slate-900 print:min-h-[70px]`}>
// // //                     <span className="text-[10px] tracking-wider font-bold uppercase opacity-85 leading-tight print:text-slate-500">{kpi.label}</span>
// // //                     <h3 className="text-2xl font-extrabold tracking-tight mt-2 flex items-baseline gap-1 print:text-slate-900 print:mt-1">
// // //                       {loading ? (
// // //                         <span className="h-6 w-12 bg-white/20 rounded animate-pulse inline-block print:bg-slate-200" />
// // //                       ) : kpi.value}
// // //                     </h3>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             {/* Visual Analytics Sections Portfolio */}
// // //             <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 print:border-none print:p-0">
// // //               <div className="flex items-center gap-2 mb-6 print:mb-4">
// // //                 <TrendingUp size={18} className="text-slate-900" />
// // //                 <h3 className="font-bold text-slate-900 text-sm tracking-tight uppercase">Distributive Analytics Matrices</h3>
// // //               </div>
              
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-4">
                
// // //                 {[
// // //                   { title: "Gender Distribution", component: <Doughnut data={genderDataConfig} options={doughnutOptions} /> },
// // //                   { title: "Age Group Breakdown", component: <Bar data={ageDataConfig} options={barOptions} /> },
// // //                   { title: "Complication Classifications", component: <Doughnut data={complicationDataConfig} options={doughnutOptions} /> },
// // //                   { title: "Referred Via Channels", component: <Bar data={referredDataConfig} options={barOptions} /> },
// // //                   { title: "Demographic Profile Distribution", component: <Bar data={casteDataConfig} options={barOptions} /> },
// // //                   { title: "Exit Outcome Vectors", component: <Bar data={outcomeDataConfig} options={barOptions} /> }
// // //                 ].map((chart, cIdx) => (
// // //                   <div key={cIdx} className="bg-slate-50/60 rounded-xl border border-slate-200/60 p-5 flex flex-col justify-between hover:bg-white hover:border-slate-300 transition-all duration-300 print:bg-white print:border-slate-300 print:break-inside-avoid">
// // //                     <h4 className="text-xs font-bold text-slate-700 mb-4 text-center tracking-wide uppercase">{chart.title}</h4>
// // //                     <div className="flex-1 min-h-[220px] relative flex items-center justify-center">
// // //                       {loading ? (
// // //                         <div className="flex flex-col items-center gap-2 text-slate-400">
// // //                           <Loader2 className="animate-spin text-slate-300" size={24} />
// // //                           <span className="text-[10px] uppercase font-semibold tracking-wider">Compiling plots...</span>
// // //                         </div>
// // //                       ) : chart.component}
// // //                     </div>
// // //                   </div>
// // //                 ))}

// // //               </div>
// // //             </div>

// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// "use client";

// import React, { useState, useEffect } from 'react';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   ChartData,
//   ChartOptions
// } from 'chart.js';
// import { Bar, Doughnut } from 'react-chartjs-2';
// import { Search, MapPin, User, Phone, Bed, Loader2, Calendar, TrendingUp, Building2, Activity } from 'lucide-react';
// import toast, { Toaster } from 'react-hot-toast';

// // --- Chart Registration ---
// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title
// );

// const BG_COLORS = [
//   '#0b9f8f', '#2563eb', '#f59e0b', '#ec4899', 
//   '#8b5cf6', '#14b8a6', '#f43f5e', '#3b82f6'
// ];

// export default function Dashboard() {
//   // --- State Setup ---
//   const currentYear = new Date().getFullYear();
//   const [fromDate, setFromDate] = useState(`${currentYear}-01-01`);
//   const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedMtc, setSelectedMtc] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Dynamic Context Elements
//   const [districtName, setDistrictName] = useState("RANCHI");
//   const [locations, setLocations] = useState<any[]>([]);
//   const [kpiState, setKpiState] = useState<any>({});
  
//   const [chartsData, setChartsData] = useState({
//     gender: { labels: [] as string[], data: [] as number[] },
//     age: { labels: [] as string[], data: [] as number[] },
//     complication: { labels: [] as string[], data: [] as number[] },
//     referral: { labels: [] as string[], data: [] as number[] },
//     caste: { labels: [] as string[], data: [] as number[] },
//     outcome: { labels: [] as string[], data: [] as number[] }
//   });

//   // --- API Sync Routine ---
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const sessionData = sessionStorage.getItem("district_user") || sessionStorage.getItem("user");
//       let districtNameParam = "RANCHI"; 
//       let districtId = "";
      
//       if (sessionData) {
//         const user = JSON.parse(sessionData);
//         if (user.districtId) districtId = user.districtId;
//         if (user.districtName) {
//           districtNameParam = user.districtName;
//           setDistrictName(user.districtName);
//         }
//       }

//       const queryParams = new URLSearchParams({
//         from: fromDate,
//         to: toDate,
//         districtName: districtNameParam,
//         ...(districtId && { districtId })
//       });
      
//       const res = await fetch(`/api/dashboard?${queryParams.toString()}`);
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.error || "Network breakdown encountered.");

//       setKpiState(data.kpi || {});
//       setLocations(data.locations || []);

//       const formatChart = (apiArray: any[]) => {
//         return {
//           labels: apiArray.map((item: any) => `${item.name.toUpperCase()} : ${item.value}`),
//           data: apiArray.map((item: any) => item.value)
//         };
//       };

//       setChartsData({
//         gender: formatChart(data.gender || []),
//         age: formatChart(data.age || []),
//         complication: formatChart(data.complications || []),
//         referral: formatChart(data.referral || []),
//         caste: formatChart(data.caste || []),
//         outcome: formatChart(data.outcome || [])
//       });

//     } catch (error: any) {
//       console.error("Dashboard rendering error:", error);
//       toast.error(`Database Error: ${error.message || "Could not retrieve records."}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSearch = () => fetchData();

//   // --- Fully Implemented Data Export System ---
//   const handleDownloadExcel = () => {
//     try {
//       toast.loading("Compiling telemetry rows...", { id: "export-excel" });
      
//       // Build metrics matrix structure
//       let csvContent = "data:text/csv;charset=utf-8,";
      
//       // Section 1: Meta Headers
//       csvContent += `DISTRICT METRICS MATRIX REPORT: ${districtName.toUpperCase()}\n`;
//       csvContent += `Temporal Scope, From: ${fromDate} To: ${toDate}\n\n`;
      
//       // Section 2: Key Operational High-Impact KPIs
//       csvContent += "KEY PERFORMANCE INDICATORS (KPIs)\n";
//       csvContent += "Indicator Metric,Value Data Value\n";
//       csvContent += `Total Sanctioned MTCs,${locations.length}\n`;
//       csvContent += `Total Admissions,${kpiState.TotalAdmissions || 0}\n`;
//       csvContent += `Total Exits,${kpiState.TotalExits || 0}\n`;
//       csvContent += `Total Cured,${kpiState.TotalCured || 0}\n`;
//       csvContent += `Total Defaulters,${kpiState.TotalDefaulters || 0}\n`;
//       csvContent += `Total Deaths,${kpiState.TotalDeaths || 0}\n`;
//       csvContent += `Avg Weight Gain (g/kg/day),${kpiState.AvgWeightGain || 0}\n`;
//       csvContent += `Bed Occupancy Rate (%),${kpiState.BedOccupancyRate || 0}%\n`;
//       csvContent += `Average Days of Stay,${kpiState.AvgStay || 0}\n\n`;
      
//       // Section 3: Node-by-Node Registries
//       csvContent += "ACTIVE INSTITUTIONAL INFRASTRUCTURE REGISTRY\n";
//       csvContent += "Facility ID,MTC Center Name,Medical Officer In-Charge,Contact Information,Assigned Beds Capacity\n";
      
//       locations.forEach((loc) => {
//         csvContent += `"${loc.id}","${loc.name}","${loc.mo || 'N/A'}","${loc.contact || 'N/A'}",${loc.beds || 0}\n`;
//       });
      
//       // Trigger native download anchor pipeline
//       const encodedUri = encodeURI(csvContent);
//       const link = document.createElement("a");
//       link.setAttribute("href", encodedUri);
//       link.setAttribute("download", `MTC_Metrics_Matrix_${districtName.toLowerCase()}_${fromDate}_to_${toDate}.csv`);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
      
//       toast.success("Excel/CSV metrics matrix downloaded successfully!", { id: "export-excel" });
//     } catch (err) {
//       toast.error("Failed to compile spreadsheet download.", { id: "export-excel" });
//     }
//   };

//   // --- Fully Implemented Viewport Capture System ---
//   const handleDownloadImage = () => {
//     try {
//       toast.loading("Preparing viewport layout structure...", { id: "export-view" });
      
//       // Triggers native cross-device vector serialization print context setup cleanly without bloated libraries
//       setTimeout(() => {
//         window.print();
//         toast.success("Viewport layout processed!", { id: "export-view" });
//       }, 500);
//     } catch (err) {
//       toast.error("Failed to initialize viewport preservation.", { id: "export-view" });
//     }
//   };

//   const handleMtcSelect = (id: string) => setSelectedMtc(id === selectedMtc ? null : id);

//   const totalBeds = locations.reduce((sum, loc) => sum + (Number(loc.beds) || 0), 0);

//   const KPI_DATA = [
//     { label: 'Sanctioned MTCs', value: locations.length, gradient: 'from-emerald-500 to-teal-600' },
//     { label: 'Beds Sanctioned', value: totalBeds, gradient: 'from-cyan-500 to-blue-600' },
//     { label: 'Functional MTCs', value: locations.length, gradient: 'from-teal-500 to-emerald-600' },
//     { label: 'Beds Available', value: totalBeds, gradient: 'from-blue-500 to-indigo-600' },
//     { label: 'Total Admissions', value: kpiState.TotalAdmissions || 0, gradient: 'from-amber-500 to-orange-600' },
//     { label: 'Total Exits', value: kpiState.TotalExits || 0, gradient: 'from-rose-500 to-pink-600' },
//     { label: 'Total Cured', value: kpiState.TotalCured || 0, gradient: 'from-green-500 to-emerald-600' },
//     { label: 'Total Defaulters', value: kpiState.TotalDefaulters || 0, gradient: 'from-orange-500 to-amber-600' },
//     { label: 'Total Deaths', value: kpiState.TotalDeaths || 0, gradient: 'from-slate-600 to-slate-800' },
//     { label: 'Avg Weight Gain', value: `${kpiState.AvgWeightGain || 0} g/kg/d`, gradient: 'from-fuchsia-500 to-purple-600' },
//     { label: 'Bed Occupancy', value: `${kpiState.BedOccupancyRate || "0.00"}%`, gradient: 'from-indigo-500 to-purple-600' },
//     { label: 'Avg Days of Stay', value: kpiState.AvgStay || 0, gradient: 'from-sky-500 to-cyan-600' },
//   ];

//   // --- Chart Configurations ---
//   const genderDataConfig: ChartData<'doughnut'> = {
//     labels: chartsData.gender.labels,
//     datasets: [{ data: chartsData.gender.data, backgroundColor: ['#0b9f8f', '#2563eb', '#f59e0b'], hoverBorderWidth: 0 }]
//   };

//   const ageDataConfig: ChartData<'bar'> = {
//     labels: chartsData.age.labels.map(l => l.split(" : ")[0]),
//     datasets: [{ data: chartsData.age.data, backgroundColor: BG_COLORS.slice(0, 4), borderRadius: 6 }]
//   };

//   const complicationDataConfig: ChartData<'doughnut'> = {
//     labels: chartsData.complication.labels,
//     datasets: [{ data: chartsData.complication.data, backgroundColor: ['#ef4444', '#10b981'] }]
//   };

//   const referredDataConfig: ChartData<'bar'> = {
//     labels: chartsData.referral.labels.map(l => l.split(" : ")[0]),
//     datasets: [{ data: chartsData.referral.data, backgroundColor: BG_COLORS, borderRadius: 6 }]
//   };

//   const casteDataConfig: ChartData<'bar'> = {
//     labels: chartsData.caste.labels.map(l => l.split(" : ")[0]),
//     datasets: [{ data: chartsData.caste.data, backgroundColor: BG_COLORS.slice(4, 8), borderRadius: 6 }]
//   };

//   const outcomeDataConfig: ChartData<'bar'> = {
//     labels: chartsData.outcome.labels.map(l => l.split(" : ")[0]),
//     datasets: [{ data: chartsData.outcome.data, backgroundColor: BG_COLORS.slice(2, 7), borderRadius: 6 }]
//   };

//   const doughnutOptions: ChartOptions<'doughnut'> = {
//     responsive: true, maintainAspectRatio: false,
//     plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 }, padding: 15 } } },
//   };

//   const barOptions: ChartOptions<'bar'> = {
//     responsive: true, maintainAspectRatio: false,
//     plugins: { legend: { display: false } },
//     scales: { 
//       y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
//       x: { grid: { display: false } }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased pb-12 font-sans print:bg-white print:pb-0">
//       <Toaster position="top-right" />
      
//       <div className="container mx-auto px-4 pt-8 print:pt-2 print:max-w-full">
        
//         {/* Modern Control Header Card */}
//         <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 mb-8 transition-all duration-300 print:shadow-none print:border-none print:mb-4">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 print:flex-row">
            
//             {/* Context Identification */}
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-slate-900 rounded-xl text-white print:bg-slate-100 print:text-slate-900">
//                 <Building2 size={26} />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
//                   {districtName.toUpperCase()} <span className="text-slate-400 font-normal">District Dashboard</span>
//                 </h1>
//                 <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
//                   <Calendar size={13} /> Active Range: <span className="font-semibold text-slate-700">{fromDate}</span> to <span className="font-semibold text-slate-700">{toDate}</span>
//                 </p>
//               </div>
//             </div>

//             {/* Live Filter Forms - hidden automatically on print preservation execution */}
//             <div className="flex flex-wrap items-end gap-3 sm:flex-nowrap print:hidden">
//               <div className="w-full sm:w-auto">
//                 <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">From</label>
//                 <input 
//                   type="date" 
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                   className="w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
//                 />
//               </div>
//               <div className="w-full sm:w-auto">
//                 <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">To</label>
//                 <input 
//                   type="date" 
//                   value={toDate}
//                   onChange={(e) => setToDate(e.target.value)}
//                   className="w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
//                 />
//               </div>
//               <button 
//                 onClick={handleSearch}
//                 disabled={loading}
//                 className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl transition-all shadow-sm font-semibold disabled:opacity-70 text-xs active:scale-95 duration-150 h-[34px]"
//               >
//                 {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />} 
//                 Filter
//               </button>
//             </div>
//           </div>

//           <div className="h-px bg-slate-100 my-5 print:my-3" />

//           {/* Export Actions Platform: SaaS Segmented Style */}
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
//             <div className="text-xs text-slate-500 flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
//               <Activity size={14} className="text-emerald-600 animate-pulse" />
//               Operational intelligence sync complete.
//             </div>
            
//             {/* Split Action Component Module */}
//             <div className="flex items-center overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm p-1 gap-0.5">
//               <button 
//                 onClick={handleDownloadExcel} 
//                 className="group flex items-center gap-2 px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 transition-all rounded-lg text-xs font-semibold active:scale-95"
//               >
//                 <svg className="w-4 h-4 text-emerald-600 transition-transform duration-200 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 <span>Export Matrix</span>
//               </button>

//               <div className="w-[1px] h-4 bg-slate-200 mx-1" />

//               <button 
//                 onClick={handleDownloadImage} 
//                 className="group flex items-center gap-2 px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 transition-all rounded-lg text-xs font-semibold active:scale-95"
//               >
//                 <svg className="w-4 h-4 text-indigo-600 transition-transform duration-200 group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 <span>Save Viewport</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Workspace Layout Content */}
//         <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start print:block">
          
//           {/* Left Column: Interactive Facility Directory */}
//           <div className="xl:col-span-4 lg:sticky lg:top-6 print:hidden">
//             <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden h-[810px] flex flex-col transition-all">
//               <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
//                 <div>
//                   <h3 className="font-bold tracking-tight text-xs tracking-wider uppercase">Facility Registry</h3>
//                 </div>
//                 <div className="text-[11px] flex items-center gap-1.5 font-bold bg-white/10 px-2.5 py-1 rounded-lg text-emerald-400">
//                   <MapPin size={12} /> {locations.length} Units Active
//                 </div>
//               </div>
              
//               <div className="p-4 flex-1 overflow-y-auto bg-slate-50/40 space-y-3">
//                 <p className="text-xs text-slate-400 px-1 mb-2">Select a facility to filter regional records:</p>
                
//                 {loading && locations.length === 0 ? (
//                   <div className="space-y-3 pt-4">
//                     {[1, 2, 3].map((n) => (
//                       <div key={n} className="p-4 bg-white border border-slate-100 rounded-xl space-y-3 animate-pulse">
//                         <div className="h-4 bg-slate-200 rounded w-2/3"></div>
//                         <div className="h-3 bg-slate-100 rounded w-1/2"></div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : locations.length === 0 ? (
//                   <div className="text-center text-slate-400 py-16 text-sm flex flex-col items-center gap-2">
//                     <Building2 size={36} className="text-slate-300" />
//                     No active infrastructure discovered.
//                   </div>
//                 ) : (
//                   <div className="flex flex-col gap-2.5">
//                     {locations.map((mtc) => {
//                       const isSelected = selectedMtc === mtc.id;
//                       return (
//                         <div 
//                           key={mtc.id} 
//                           onClick={() => handleMtcSelect(mtc.id)}
//                           className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 relative group overflow-hidden ${
//                             isSelected 
//                               ? 'border-slate-900 bg-slate-900 text-white shadow-sm' 
//                               : 'border-slate-200 bg-white hover:border-slate-400'
//                           }`}
//                         >
//                           <h4 className={`font-bold text-sm mb-3 ${isSelected ? 'text-white' : 'text-slate-800'}`}>
//                             {mtc.name}
//                           </h4>
//                           <div className={`grid grid-cols-1 gap-2 text-xs ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
//                             <div className="flex items-center gap-2.5">
//                               <User size={13} className="opacity-70" /> 
//                               <span><strong className={isSelected ? 'text-white font-medium' : 'text-slate-700 font-medium'}>MO In-Charge:</strong> {mtc.mo || 'Awaiting Assignment'}</span>
//                             </div>
//                             <div className="flex items-center gap-2.5">
//                               <Phone size={13} className="opacity-70" /> 
//                               <span><strong className={isSelected ? 'text-white font-medium' : 'text-slate-700 font-medium'}>Contact line:</strong> {mtc.contact || 'N/A'}</span>
//                             </div>
//                             <div className="flex items-center gap-2.5">
//                               <Bed size={13} className="opacity-70" /> 
//                               <span><strong className={isSelected ? 'text-white font-medium' : 'text-slate-700 font-medium'}>Net Allocation:</strong> <span className={isSelected ? 'text-emerald-400 font-bold' : 'text-slate-900 font-semibold'}>{mtc.beds || 0} Beds</span></span>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Key Statistics Matrix & Graph Grid */}
//           <div className="xl:col-span-8 space-y-8 print:w-full">
            
//             {/* High Impact Metrics Panel */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 print:grid-cols-3 print:gap-2">
//               {KPI_DATA.map((kpi, idx) => (
//                 <div key={idx} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col print:shadow-none print:border print:border-slate-300">
//                   <div className={`p-4 bg-gradient-to-br ${kpi.gradient} text-white flex-1 flex flex-col justify-between min-h-[105px] print:bg-none print:text-slate-900 print:min-h-[70px]`}>
//                     <span className="text-[10px] tracking-wider font-bold uppercase opacity-85 leading-tight print:text-slate-500">{kpi.label}</span>
//                     <h3 className="text-2xl font-extrabold tracking-tight mt-2 flex items-baseline gap-1 print:text-slate-900 print:mt-1">
//                       {loading ? (
//                         <span className="h-6 w-12 bg-white/20 rounded animate-pulse inline-block print:bg-slate-200" />
//                       ) : kpi.value}
//                     </h3>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Visual Analytics Sections Portfolio */}
//             <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 print:border-none print:p-0">
//               <div className="flex items-center gap-2 mb-6 print:mb-4">
//                 <TrendingUp size={18} className="text-slate-900" />
//                 <h3 className="font-bold text-slate-900 text-sm tracking-tight uppercase">Distributive Analytics Matrices</h3>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-4">
                
//                 {[
//                   { title: "Gender Distribution", component: <Doughnut data={genderDataConfig} options={doughnutOptions} /> },
//                   { title: "Age Group Breakdown", component: <Bar data={ageDataConfig} options={barOptions} /> },
//                   { title: "Complication Classifications", component: <Doughnut data={complicationDataConfig} options={doughnutOptions} /> },
//                   { title: "Referred Via Channels", component: <Bar data={referredDataConfig} options={barOptions} /> },
//                   { title: "Demographic Profile Distribution", component: <Bar data={casteDataConfig} options={barOptions} /> },
//                   { title: "Exit Outcome Vectors", component: <Bar data={outcomeDataConfig} options={barOptions} /> }
//                 ].map((chart, cIdx) => (
//                   <div key={cIdx} className="bg-slate-50/60 rounded-xl border border-slate-200/60 p-5 flex flex-col justify-between hover:bg-white hover:border-slate-300 transition-all duration-300 print:bg-white print:border-slate-300 print:break-inside-avoid">
//                     <h4 className="text-xs font-bold text-slate-700 mb-4 text-center tracking-wide uppercase">{chart.title}</h4>
//                     <div className="flex-1 min-h-[220px] relative flex items-center justify-center">
//                       {loading ? (
//                         <div className="flex flex-col items-center gap-2 text-slate-400">
//                           <Loader2 className="animate-spin text-slate-300" size={24} />
//                           <span className="text-[10px] uppercase font-semibold tracking-wider">Compiling plots...</span>
//                         </div>
//                       ) : chart.component}
//                     </div>
//                   </div>
//                 ))}

//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Search, MapPin, User, Phone, Bed, Loader2, Calendar, TrendingUp, Building2, Activity } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// --- Chart Registration ---
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const BG_COLORS = [
  '#0b9f8f', '#2563eb', '#f59e0b', '#ec4899', 
  '#8b5cf6', '#14b8a6', '#f43f5e', '#3b82f6'
];

export default function Dashboard() {
  // --- State Setup ---
  const currentYear = new Date().getFullYear();
  const [fromDate, setFromDate] = useState(`${currentYear}-01-01`);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMtc, setSelectedMtc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Dynamic Context Elements
  const [districtName, setDistrictName] = useState("RANCHI");
  const [locations, setLocations] = useState<any[]>([]);
  const [kpiState, setKpiState] = useState<any>({});
  
  const [chartsData, setChartsData] = useState({
    gender: { labels: [] as string[], data: [] as number[] },
    age: { labels: [] as string[], data: [] as number[] },
    complication: { labels: [] as string[], data: [] as number[] },
    referral: { labels: [] as string[], data: [] as number[] },
    caste: { labels: [] as string[], data: [] as number[] },
    outcome: { labels: [] as string[], data: [] as number[] }
  });

  // --- API Sync Routine ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const sessionData = sessionStorage.getItem("district_user") || sessionStorage.getItem("user");
      let districtNameParam = "RANCHI"; 
      let districtId = "";
      
      if (sessionData) {
        const user = JSON.parse(sessionData);
        if (user.districtId) districtId = user.districtId;
        if (user.districtName) {
          districtNameParam = user.districtName;
          setDistrictName(user.districtName);
        }
      }

      const queryParams = new URLSearchParams({
        from: fromDate,
        to: toDate,
        districtName: districtNameParam,
        ...(districtId && { districtId })
      });
      
      const res = await fetch(`/api/dashboard?${queryParams.toString()}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Network breakdown encountered.");

      setKpiState(data.kpi || {});
      setLocations(data.locations || []);

      const formatChart = (apiArray: any[]) => {
        return {
          labels: apiArray.map((item: any) => `${item.name.toUpperCase()} : ${item.value}`),
          data: apiArray.map((item: any) => item.value)
        };
      };

      setChartsData({
        gender: formatChart(data.gender || []),
        age: formatChart(data.age || []),
        complication: formatChart(data.complications || []),
        referral: formatChart(data.referral || []),
        caste: formatChart(data.caste || []),
        outcome: formatChart(data.outcome || [])
      });

    } catch (error: any) {
      console.error("Dashboard rendering error:", error);
      toast.error(`Database Error: ${error.message || "Could not retrieve records."}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => fetchData();

  // --- Fully Implemented Data Export System ---
  const handleDownloadExcel = () => {
    try {
      toast.loading("Compiling telemetry rows...", { id: "export-excel" });
      
      // Build metrics matrix structure
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Section 1: Meta Headers
      csvContent += `DISTRICT METRICS MATRIX REPORT: ${districtName.toUpperCase()}\n`;
      csvContent += `Temporal Scope, From: ${fromDate} To: ${toDate}\n\n`;
      
      // Section 2: Key Operational High-Impact KPIs
      csvContent += "KEY PERFORMANCE INDICATORS (KPIs)\n";
      csvContent += "Indicator Metric,Value Data Value\n";
      csvContent += `Total Sanctioned MTCs,${locations.length}\n`;
      csvContent += `Total Admissions,${kpiState.TotalAdmissions || 0}\n`;
      csvContent += `Total Exits,${kpiState.TotalExits || 0}\n`;
      csvContent += `Total Cured,${kpiState.TotalCured || 0}\n`;
      csvContent += `Total Defaulters,${kpiState.TotalDefaulters || 0}\n`;
      csvContent += `Total Deaths,${kpiState.TotalDeaths || 0}\n`;
      csvContent += `Avg Weight Gain (g/kg/day),${kpiState.AvgWeightGain || 0}\n`;
      csvContent += `Bed Occupancy Rate (%),${kpiState.BedOccupancyRate || 0}%\n`;
      csvContent += `Average Days of Stay,${kpiState.AvgStay || 0}\n\n`;
      
      // Section 3: Node-by-Node Registries
      csvContent += "ACTIVE INSTITUTIONAL INFRASTRUCTURE REGISTRY\n";
      csvContent += "Facility ID,MTC Center Name,Doctor Name,Contact Line,Assigned Beds Capacity\n";
      
      locations.forEach((loc) => {
        csvContent += `"${loc.id}","${loc.name}","${loc.mo || 'N/A'}","${loc.contact || 'N/A'}",${loc.beds || 0}\n`;
      });
      
      // Trigger native download anchor pipeline
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `MTC_Metrics_Matrix_${districtName.toLowerCase()}_${fromDate}_to_${toDate}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Excel/CSV metrics matrix downloaded successfully!", { id: "export-excel" });
    } catch (err) {
      toast.error("Failed to compile spreadsheet download.", { id: "export-excel" });
    }
  };

  // --- Fully Implemented Viewport Capture System ---
  const handleDownloadImage = () => {
    try {
      toast.loading("Preparing viewport layout structure...", { id: "export-view" });
      
      // Triggers native cross-device vector serialization print context setup cleanly without bloated libraries
      setTimeout(() => {
        window.print();
        toast.success("Viewport layout processed!", { id: "export-view" });
      }, 500);
    } catch (err) {
      toast.error("Failed to initialize viewport preservation.", { id: "export-view" });
    }
  };

  const handleMtcSelect = (id: string) => setSelectedMtc(id === selectedMtc ? null : id);

  const totalBeds = locations.reduce((sum, loc) => sum + (Number(loc.beds) || 0), 0);

  const KPI_DATA = [
    { label: 'Sanctioned MTCs', value: locations.length, gradient: 'from-emerald-500 to-teal-600' },
    { label: 'Beds Sanctioned', value: totalBeds, gradient: 'from-cyan-500 to-blue-600' },
    { label: 'Functional MTCs', value: locations.length, gradient: 'from-teal-500 to-emerald-600' },
    { label: 'Beds Available', value: totalBeds, gradient: 'from-blue-500 to-indigo-600' },
    { label: 'Total Admissions', value: kpiState.TotalAdmissions || 0, gradient: 'from-amber-500 to-orange-600' },
    { label: 'Total Exits', value: kpiState.TotalExits || 0, gradient: 'from-rose-500 to-pink-600' },
    { label: 'Total Cured', value: kpiState.TotalCured || 0, gradient: 'from-green-500 to-emerald-600' },
    { label: 'Total Defaulters', value: kpiState.TotalDefaulters || 0, gradient: 'from-orange-500 to-amber-600' },
    { label: 'Total Deaths', value: kpiState.TotalDeaths || 0, gradient: 'from-slate-600 to-slate-800' },
    { label: 'Avg Weight Gain', value: `${kpiState.AvgWeightGain || 0} g/kg/d`, gradient: 'from-fuchsia-500 to-purple-600' },
    { label: 'Bed Occupancy', value: `${kpiState.BedOccupancyRate || "0.00"}%`, gradient: 'from-indigo-500 to-purple-600' },
    { label: 'Avg Days of Stay', value: kpiState.AvgStay || 0, gradient: 'from-sky-500 to-cyan-600' },
  ];

  // --- Chart Configurations ---
  const genderDataConfig: ChartData<'doughnut'> = {
    labels: chartsData.gender.labels,
    datasets: [{ data: chartsData.gender.data, backgroundColor: ['#0b9f8f', '#2563eb', '#f59e0b'], hoverBorderWidth: 0 }]
  };

  const ageDataConfig: ChartData<'bar'> = {
    labels: chartsData.age.labels.map(l => l.split(" : ")[0]),
    datasets: [{ data: chartsData.age.data, backgroundColor: BG_COLORS.slice(0, 4), borderRadius: 6 }]
  };

  const complicationDataConfig: ChartData<'doughnut'> = {
    labels: chartsData.complication.labels,
    datasets: [{ data: chartsData.complication.data, backgroundColor: ['#ef4444', '#10b981'] }]
  };

  const referredDataConfig: ChartData<'bar'> = {
    labels: chartsData.referral.labels.map(l => l.split(" : ")[0]),
    datasets: [{ data: chartsData.referral.data, backgroundColor: BG_COLORS, borderRadius: 6 }]
  };

  const casteDataConfig: ChartData<'bar'> = {
    labels: chartsData.caste.labels.map(l => l.split(" : ")[0]),
    datasets: [{ data: chartsData.caste.data, backgroundColor: BG_COLORS.slice(4, 8), borderRadius: 6 }]
  };

  const outcomeDataConfig: ChartData<'bar'> = {
    labels: chartsData.outcome.labels.map(l => l.split(" : ")[0]),
    datasets: [{ data: chartsData.outcome.data, backgroundColor: BG_COLORS.slice(2, 7), borderRadius: 6 }]
  };

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 }, padding: 15 } } },
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { 
      y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
      x: { grid: { display: false } }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased pb-12 font-sans print:bg-white print:pb-0">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 pt-8 print:pt-2 print:max-w-full">
        
        {/* Modern Control Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 mb-8 transition-all duration-300 print:shadow-none print:border-none print:mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 print:flex-row">
            
            {/* Context Identification */}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-900 rounded-xl text-white print:bg-slate-100 print:text-slate-900">
                <Building2 size={26} />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  {districtName.toUpperCase()} <span className="text-slate-400 font-normal">District Dashboard</span>
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Calendar size={13} /> Active Range: <span className="font-semibold text-slate-700">{fromDate}</span> to <span className="font-semibold text-slate-700">{toDate}</span>
                </p>
              </div>
            </div>

            {/* Live Filter Forms - hidden automatically on print preservation execution */}
            <div className="flex flex-wrap items-end gap-3 sm:flex-nowrap print:hidden">
              <div className="w-full sm:w-auto">
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">From</label>
                <input 
                  type="date" 
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                />
              </div>
              <div className="w-full sm:w-auto">
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">To</label>
                <input 
                  type="date" 
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                />
              </div>
              <button 
                onClick={handleSearch}
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl transition-all shadow-sm font-semibold disabled:opacity-70 text-xs active:scale-95 duration-150 h-[34px]"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />} 
                Filter
              </button>
            </div>
          </div>

          <div className="h-px bg-slate-100 my-5 print:my-3" />

          {/* Export Actions Platform: SaaS Segmented Style */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
            <div className="text-xs text-slate-500 flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
              <Activity size={14} className="text-emerald-600 animate-pulse" />
              Operational intelligence sync complete.
            </div>
            
            {/* Split Action Component Module */}
            <div className="flex items-center overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm p-1 gap-0.5">
              <button 
                onClick={handleDownloadExcel} 
                className="group flex items-center gap-2 px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 transition-all rounded-lg text-xs font-semibold active:scale-95"
              >
                <svg className="w-4 h-4 text-emerald-600 transition-transform duration-200 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export Matrix</span>
              </button>

              <div className="w-[1px] h-4 bg-slate-200 mx-1" />

              <button 
                onClick={handleDownloadImage} 
                className="group flex items-center gap-2 px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 transition-all rounded-lg text-xs font-semibold active:scale-95"
              >
                <svg className="w-4 h-4 text-indigo-600 transition-transform duration-200 group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Save Viewport</span>
              </button>
            </div>
          </div>
        </div>

        {/* Workspace Layout Content */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start print:block">
          
          {/* Left Column: Interactive Facility Directory */}
          <div className="xl:col-span-4 lg:sticky lg:top-6 print:hidden">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden h-[810px] flex flex-col transition-all">
              <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
                <div>
                  <h3 className="font-bold tracking-tight text-xs tracking-wider uppercase">Facility Registry</h3>
                </div>
                <div className="text-[11px] flex items-center gap-1.5 font-bold bg-white/10 px-2.5 py-1 rounded-lg text-emerald-400">
                  <MapPin size={12} /> {locations.length} Units Active
                </div>
              </div>
              
              <div className="p-4 flex-1 overflow-y-auto bg-slate-50/40 space-y-3">
                <p className="text-xs text-slate-400 px-1 mb-2">Select a facility to filter regional records:</p>
                
                {loading && locations.length === 0 ? (
                  <div className="space-y-3 pt-4">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="p-4 bg-white border border-slate-100 rounded-xl space-y-3 animate-pulse">
                        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                        <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : locations.length === 0 ? (
                  <div className="text-center text-slate-400 py-16 text-sm flex flex-col items-center gap-2">
                    <Building2 size={36} className="text-slate-300" />
                    No active infrastructure discovered.
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    {locations.map((mtc) => {
                      const isSelected = selectedMtc === mtc.id;
                      return (
                        <div 
                          key={mtc.id} 
                          onClick={() => handleMtcSelect(mtc.id)}
                          className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 relative group overflow-hidden ${
                            isSelected 
                              ? 'border-slate-900 bg-slate-900 text-white shadow-sm' 
                              : 'border-slate-200 bg-white hover:border-slate-400'
                          }`}
                        >
                          <h4 className={`font-bold text-sm mb-3 ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                            {mtc.name}
                          </h4>
                          <div className={`grid grid-cols-1 gap-2 text-xs ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                            <div className="flex items-center gap-2.5">
                              <User size={13} className="opacity-70" /> 
                              <span><strong className={isSelected ? 'text-white font-medium' : 'text-slate-700 font-medium'}>Doctor Name:</strong> {mtc.mo || 'Awaiting Assignment'}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <Phone size={13} className="opacity-70" /> 
                              <span><strong className={isSelected ? 'text-white font-medium' : 'text-slate-700 font-medium'}>Contact Line:</strong> {mtc.contact || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <Bed size={13} className="opacity-70" /> 
                              <span><strong className={isSelected ? 'text-white font-medium' : 'text-slate-700 font-medium'}>Net Allocation:</strong> <span className={isSelected ? 'text-emerald-400 font-bold' : 'text-slate-900 font-semibold'}>{mtc.beds || 0} Beds</span></span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Key Statistics Matrix & Graph Grid */}
          <div className="xl:col-span-8 space-y-8 print:w-full">
            
            {/* High Impact Metrics Panel */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 print:grid-cols-3 print:gap-2">
              {KPI_DATA.map((kpi, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col print:shadow-none print:border print:border-slate-300">
                  <div className={`p-4 bg-gradient-to-br ${kpi.gradient} text-white flex-1 flex flex-col justify-between min-h-[105px] print:bg-none print:text-slate-900 print:min-h-[70px]`}>
                    <span className="text-[10px] tracking-wider font-bold uppercase opacity-85 leading-tight print:text-slate-500">{kpi.label}</span>
                    <h3 className="text-2xl font-extrabold tracking-tight mt-2 flex items-baseline gap-1 print:text-slate-900 print:mt-1">
                      {loading ? (
                        <span className="h-6 w-12 bg-white/20 rounded animate-pulse inline-block print:bg-slate-200" />
                      ) : kpi.value}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Analytics Sections Portfolio */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 print:border-none print:p-0">
              <div className="flex items-center gap-2 mb-6 print:mb-4">
                <TrendingUp size={18} className="text-slate-900" />
                <h3 className="font-bold text-slate-900 text-sm tracking-tight uppercase">Distributive Analytics Matrices</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-4">
                
                {[
                  { title: "Gender Distribution", component: <Doughnut data={genderDataConfig} options={doughnutOptions} /> },
                  { title: "Age Group Breakdown", component: <Bar data={ageDataConfig} options={barOptions} /> },
                  { title: "Complication Classifications", component: <Doughnut data={complicationDataConfig} options={doughnutOptions} /> },
                  { title: "Referred Via Channels", component: <Bar data={referredDataConfig} options={barOptions} /> },
                  { title: "Demographic Profile Distribution", component: <Bar data={casteDataConfig} options={barOptions} /> },
                  { title: "Exit Outcome Vectors", component: <Bar data={outcomeDataConfig} options={barOptions} /> }
                ].map((chart, cIdx) => (
                  <div key={cIdx} className="bg-slate-50/60 rounded-xl border border-slate-200/60 p-5 flex flex-col justify-between hover:bg-white hover:border-slate-300 transition-all duration-300 print:bg-white print:border-slate-300 print:break-inside-avoid">
                    <h4 className="text-xs font-bold text-slate-700 mb-4 text-center tracking-wide uppercase">{chart.title}</h4>
                    <div className="flex-1 min-h-[220px] relative flex items-center justify-center">
                      {loading ? (
                        <div className="flex flex-col items-center gap-2 text-slate-400">
                          <Loader2 className="animate-spin text-slate-300" size={24} />
                          <span className="text-[10px] uppercase font-semibold tracking-wider">Compiling plots...</span>
                        </div>
                      ) : chart.component}
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}