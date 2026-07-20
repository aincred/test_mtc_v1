// "use client";

// import React, { useState, useMemo } from 'react';
// import { 
//   Plus, 
//   Edit, 
//   Key, 
//   Trash2, 
//   Search, 
//   ChevronLeft, 
//   ChevronRight,
//   MoreHorizontal
// } from 'lucide-react';

// // Define the User interface based on your HTML structure
// interface User {
//   id: number;
//   userName: string;
//   lastActivityDate: string;
//   email: string;
//   role: string;
// }

// const App: React.FC = () => {
//   // Sample data extracted from your HTML snippet
//   const [users, setUsers] = useState<User[]>([
//     { id: 1, userName: "MTCAdmin", lastActivityDate: "27-Apr-2026", email: "SEETVIKASH@GMAIL.COM", role: "ADMINISTRATOR" },
//     { id: 3, userName: "MTCState", lastActivityDate: "30-Aug-2022", email: "maniroop@dhanushinfotech.net", role: "STATE USER" },
//     { id: 4, userName: "MTCDistrict", lastActivityDate: "29-Aug-2022", email: "reddeppa@dhanushinfotech.net", role: "DISTRICT USER" },
//     { id: 5, userName: "MTC", lastActivityDate: "22-Aug-2022", email: "dhanesh@dhanushinfotech.net", role: "MTC USER" },
//     { id: 8, userName: "DistrictRanka", lastActivityDate: "17-Jul-2021", email: "naveen.e@dhanushinfotech.net", role: "DISTRICT USER" },
//     { id: 9, userName: "District Durki", lastActivityDate: "17-Jul-2021", email: "naveen.e@dhanushinfotech.net", role: "DISTRICT USER" },
//     { id: 10, userName: "Bundu", lastActivityDate: "27-Apr-2026", email: "bundu@gmail.com", role: "MTC USER" },
//     { id: 11, userName: "District Ranchi", lastActivityDate: "17-Jul-2021", email: "naveen.e@dhanushinfotech.net", role: "DISTRICT USER" },
//     { id: 12, userName: "Mandar", lastActivityDate: "27-Apr-2026", email: "mandar@gmail.com", role: "MTC USER" },
//     { id: 13, userName: "DORANDA", lastActivityDate: "14-Apr-2026", email: "doranda@gmail.com", role: "MTC USER" },
//   ]);

//   // State for filtering and pagination
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Filter users based on search term
//   const filteredUsers = useMemo(() => {
//     return users.filter(user => 
//       user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.role.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [users, searchTerm]);

//   // Pagination calculations
//   const totalEntries = filteredUsers.length;
//   const totalPages = Math.ceil(totalEntries / entriesPerPage);
//   const indexOfLastUser = currentPage * entriesPerPage;
//   const indexOfFirstUser = indexOfLastUser - entriesPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

//   // Handlers
//   const handleDelete = (id: number) => {
//     // In a real app, you'd replace this with a custom modal UI
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       setUsers(users.filter(u => u.id !== id));
//     }
//   };

//   const handleEdit = (id: number) => {
//     console.log(`Edit user ${id}`);
//     // Navigation logic would go here
//   };

//   const handleChangePassword = (id: number) => {
//     console.log(`Change password for user ${id}`);
//     // Modal logic would go here
//   };

//   return (
//     <div className="p-4 bg-gray-50 min-h-screen font-sans">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          
//           {/* Card Header */}
//           <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
//             <h5 className="text-xl font-semibold tracking-tight" style={{ color: 'rgb(11,145,140)' }}>
//               Users List
//             </h5>
//             <button 
//               className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 border border-cyan-600 rounded-lg hover:bg-cyan-50 transition-colors"
//             >
//               <Plus size={16} />
//               Add User
//             </button>
//           </div>

//           {/* Card Body */}
//           <div className="p-6">
//             {/* Table Controls */}
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <span>Show</span>
//                 <select 
//                   className="bg-white border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-cyan-500 outline-none"
//                   value={entriesPerPage}
//                   onChange={(e) => {
//                     setEntriesPerPage(Number(e.target.value));
//                     setCurrentPage(1);
//                   }}
//                 >
//                   <option value={10}>10</option>
//                   <option value={25}>25</option>
//                   <option value={50}>50</option>
//                   <option value={100}>100</option>
//                 </select>
//                 <span>entries</span>
//               </div>

//               <div className="relative w-full md:w-64">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
//                   <Search size={16} />
//                 </div>
//                 <input 
//                   type="search" 
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
//                   placeholder="Search users..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto rounded-lg border border-gray-200">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">S.No</th>
//                     <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">UserName</th>
//                     <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Last Activity Date</th>
//                     <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email Id</th>
//                     <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
//                     <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {currentUsers.length > 0 ? currentUsers.map((user, index) => (
//                     <tr key={user.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {indexOfFirstUser + index + 1}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 uppercase">
//                         {user.userName}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
//                         {user.lastActivityDate}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
//                         {user.email}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                           ${user.role === 'ADMINISTRATOR' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-800'}`}>
//                           {user.role}
//                         </span>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
//                         <div className="flex justify-center gap-2">
//                           <button 
//                             onClick={() => handleEdit(user.id)}
//                             className="p-1.5 text-cyan-600 hover:bg-cyan-50 rounded-md transition-colors"
//                             title="Edit User"
//                           >
//                             <Edit size={16} />
//                           </button>
//                           <button 
//                             onClick={() => handleChangePassword(user.id)}
//                             className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
//                             title="Change Password"
//                           >
//                             <Key size={16} />
//                           </button>
//                           <button 
//                             onClick={() => handleDelete(user.id)}
//                             className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                             title="Delete User"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   )) : (
//                     <tr>
//                       <td colSpan={6} className="px-4 py-10 text-center text-gray-400 italic">
//                         No matching users found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
//               <div className="text-sm text-gray-500">
//                 Showing {totalEntries > 0 ? indexOfFirstUser + 1 : 0} to {Math.min(indexOfLastUser, totalEntries)} of {totalEntries} entries
//               </div>
              
//               <div className="flex items-center gap-1">
//                 <button 
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage(prev => prev - 1)}
//                   className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
//                 >
//                   <ChevronLeft size={18} />
//                 </button>
                
//                 <div className="flex gap-1">
//                   {/* Simple pagination numbers */}
//                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                     const pageNum = i + 1;
//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => setCurrentPage(pageNum)}
//                         className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors 
//                           ${currentPage === pageNum 
//                             ? 'bg-cyan-600 text-white shadow-sm' 
//                             : 'text-gray-600 hover:bg-gray-100'}`}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}
//                   {totalPages > 5 && <span className="flex items-end px-2 text-gray-400"><MoreHorizontal size={16} /></span>}
//                   {totalPages > 5 && (
//                     <button
//                       onClick={() => setCurrentPage(totalPages)}
//                       className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors 
//                         ${currentPage === totalPages ? 'bg-cyan-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
//                     >
//                       {totalPages}
//                     </button>
//                   )}
//                 </div>

//                 <button 
//                   disabled={currentPage === totalPages || totalPages === 0}
//                   onClick={() => setCurrentPage(prev => prev + 1)}
//                   className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
//                 >
//                   <ChevronRight size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


"use client";

import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Edit, 
  Key, 
  Trash2, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  Users,
  UserCheck,
  ShieldAlert,
  SlidersHorizontal
} from 'lucide-react';

interface User {
  id: number;
  userName: string;
  lastActivityDate: string;
  email: string;
  role: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, userName: "MTCAdmin", lastActivityDate: "27-Apr-2026", email: "SEETVIKASH@GMAIL.COM", role: "ADMINISTRATOR" },
    { id: 3, userName: "MTCState", lastActivityDate: "30-Aug-2022", email: "maniroop@dhanushinfotech.net", role: "STATE USER" },
    { id: 4, userName: "MTCDistrict", lastActivityDate: "29-Aug-2022", email: "reddeppa@dhanushinfotech.net", role: "DISTRICT USER" },
    { id: 5, userName: "MTC", lastActivityDate: "22-Aug-2022", email: "dhanesh@dhanushinfotech.net", role: "MTC USER" },
    { id: 8, userName: "DistrictRanka", lastActivityDate: "17-Jul-2021", email: "naveen.e@dhanushinfotech.net", role: "DISTRICT USER" },
    { id: 9, userName: "District Durki", lastActivityDate: "17-Jul-2021", email: "naveen.e@dhanushinfotech.net", role: "DISTRICT USER" },
    { id: 10, userName: "Bundu", lastActivityDate: "27-Apr-2026", email: "bundu@gmail.com", role: "MTC USER" },
    { id: 11, userName: "District Ranchi", lastActivityDate: "17-Jul-2021", email: "naveen.e@dhanushinfotech.net", role: "DISTRICT USER" },
    { id: 12, userName: "Mandar", lastActivityDate: "27-Apr-2026", email: "mandar@gmail.com", role: "MTC USER" },
    { id: 13, userName: "DORANDA", lastActivityDate: "14-Apr-2026", email: "doranda@gmail.com", role: "MTC USER" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Executive Dashboard Analytics Metrics
  const metrics = useMemo(() => {
    const total = users.length;
    const admins = users.filter(u => u.role === "ADMINISTRATOR").length;
    const activeIn2026 = users.filter(u => u.lastActivityDate.includes("2026")).length;
    return { total, admins, activeIn2026 };
  }, [users]);

  // Pagination calculations
  const totalEntries = filteredUsers.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const indexOfLastUser = currentPage * entriesPerPage;
  const indexOfFirstUser = indexOfLastUser - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to permanently remove this user from the directory?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    console.log(`Edit user configuration mapping: ${id}`);
  };

  const handleChangePassword = (id: number) => {
    console.log(`Trigger secure credential override routine for user: ${id}`);
  };

  // Modern Dynamic Badges Mapping
  const getRoleBadgeStyles = (role: string) => {
    switch (role) {
      case 'ADMINISTRATOR':
        return 'bg-rose-50 text-rose-700 border-rose-200/60';
      case 'STATE USER':
        return 'bg-violet-50 text-violet-700 border-violet-200/60';
      case 'DISTRICT USER':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200/60';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/60 p-4 md:p-8 font-sans text-zinc-900 antialiased selection:bg-indigo-600 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Modern High-Contrast Executive Title Card */}
        <div className="bg-linear-to-r from-zinc-900 via-slate-900 to-zinc-900 rounded-2xl p-6 shadow-xl shadow-zinc-950/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-zinc-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_50%)]" />
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-[11px] font-bold tracking-widest uppercase mb-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> Security Access Controls
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Identity Matrix Registry
            </h1>
            <p className="text-zinc-400 text-xs mt-1">Manage institutional user roles, access provisions, and audit verification vectors.</p>
          </div>
          
          <button 
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-indigo-600/10 active:translate-y-px"
          >
            <Plus className="w-4 h-4 stroke-3" />
            Provision New User
          </button>
        </div>

        {/* Live System Metric Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-zinc-200/80 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider block">Total Directories</span>
              <span className="text-xl font-black text-zinc-900">{metrics.total}</span>
            </div>
            <div className="bg-zinc-50 p-2 rounded-lg border border-zinc-100 text-zinc-600"><Users className="w-4 h-4" /></div>
          </div>
          <div className="bg-white border border-zinc-200/80 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider block">Privileged Root Admins</span>
              <span className="text-xl font-black text-rose-600">{metrics.admins}</span>
            </div>
            <div className="bg-rose-50 p-2 rounded-lg border border-rose-100 text-rose-600"><ShieldAlert className="w-4 h-4" /></div>
          </div>
          <div className="bg-white border border-zinc-200/80 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider block">Active Cycles (2026)</span>
              <span className="text-xl font-black text-indigo-600">{metrics.activeIn2026}</span>
            </div>
            <div className="bg-indigo-50 p-2 rounded-lg border border-indigo-100 text-indigo-600"><UserCheck className="w-4 h-4" /></div>
          </div>
        </div>

        {/* Workspace Matrix Block */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
          
          {/* Controls & Searching Bar */}
          <div className="p-5 border-b border-zinc-100 bg-zinc-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="search" 
                className="block w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all placeholder:text-zinc-400 text-zinc-800"
                placeholder="Query parameters index..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 bg-white border border-zinc-200 px-3 py-2 rounded-xl">
                <span>Display Segment</span>
                <select 
                  className="bg-transparent font-bold text-zinc-800 focus:outline-none cursor-pointer border-none p-0 pr-1"
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={10}>10 Rows</option>
                  <option value={25}>25 Rows</option>
                  <option value={50}>50 Rows</option>
                  <option value={100}>100 Rows</option>
                </select>
              </div>
              <button className="p-2.5 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 text-zinc-500 transition-colors shadow-sm">
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* High Density Table Layout */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="px-6 py-4 w-16 text-center">Index</th>
                  <th className="px-6 py-4">User Authority Node</th>
                  <th className="px-6 py-4">System Email Registry</th>
                  <th className="px-6 py-4">Last Sync Routine</th>
                  <th className="px-6 py-4">Clearance Allocation</th>
                  <th className="px-6 py-4 text-center">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {currentUsers.length > 0 ? currentUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-zinc-50/60 transition-colors group">
                    <td className="px-6 py-4 text-xs font-mono font-bold text-zinc-400 text-center">
                      {String(indexOfFirstUser + index + 1).padStart(2, '0')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-zinc-900 text-sm tracking-tight uppercase">
                        {user.userName}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">UID: #00{user.id}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-zinc-600">
                      {user.email.toLowerCase()}
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${user.lastActivityDate.includes('2026') ? 'bg-emerald-500' : 'bg-zinc-300'}`} />
                        {user.lastActivityDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide border rounded-lg ${getRoleBadgeStyles(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-1 opacity-90 md:opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <button 
                          onClick={() => handleEdit(user.id)}
                          className="p-1.5 text-zinc-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Modify Record Configurations"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => handleChangePassword(user.id)}
                          className="p-1.5 text-zinc-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Secure Password Token Reset"
                        >
                          <Key size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Purge Identity Profile"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-zinc-400 text-xs italic bg-zinc-50/20">
                      No identities correspond to the active filter vectors.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Clean Segmented Control Pagination */}
          <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] font-semibold text-zinc-500">
              Showing <span className="text-zinc-800 font-bold">{totalEntries > 0 ? indexOfFirstUser + 1 : 0}</span> to <span className="text-zinc-800 font-bold">{Math.min(indexOfLastUser, totalEntries)}</span> of <span className="text-zinc-800 font-bold">{totalEntries}</span> database records
            </div>
            
            <div className="flex items-center gap-1.5">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="p-2 text-zinc-500 border border-zinc-200 bg-white hover:bg-zinc-100 rounded-xl disabled:opacity-40 disabled:hover:bg-white transition-all shadow-sm active:scale-[0.97]"
              >
                <ChevronLeft size={14} className="stroke-[2.5]" />
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 text-xs font-bold rounded-xl transition-all ${
                        currentPage === pageNum 
                          ? 'bg-zinc-900 text-white shadow-md shadow-zinc-900/10' 
                          : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && <span className="flex items-end px-1 text-zinc-300 pb-1"><MoreHorizontal size={14} /></span>}
                {totalPages > 5 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-8 h-8 text-xs font-bold rounded-xl transition-all ${
                      currentPage === totalPages ? 'bg-zinc-900 text-white' : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    {totalPages}
                  </button>
                )}
              </div>

              <button 
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-2 text-zinc-500 border border-zinc-200 bg-white hover:bg-zinc-100 rounded-xl disabled:opacity-40 disabled:hover:bg-white transition-all shadow-sm active:scale-[0.97]"
              >
                <ChevronRight size={14} className="stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;