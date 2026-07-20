import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Key,
  UserCheck,
  ShieldAlert,
  LogOut,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Wrench,
  Search,
  LayoutDashboard,
  User,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDocuments, updateDocument } from '../services/firestoreService';

export default function EmployeeView({ onBackToHome }) {
  // Session states
  const [employeeUser, setEmployeeUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('kentro-employee-logged-in');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  // Service bookings & tasks
  const [serviceBookings, setServiceBookings] = useState([]);

  // Tab state: 'tasks' | 'profile'
  const [activeTab, setActiveTab] = useState('tasks');

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  const reloadBookings = async () => {
    try {
      const list = await getDocuments('serviceRequests');
      const mapped = list.map(b => ({
        id: b.id,
        bookingId: b.customId || b.id || '',
        name: b.customerName || b.name || '',
        customerName: b.customerName || b.name || '',
        phone: b.phone || '',
        address: b.address || '',
        product: b.product || b.serviceType || '',
        deliveryDate: b.deliveryDate || '',
        status: b.status || 'Pending',
        assignedEmployeeId: b.assignedEmployeeId || '',
        createdAt: b.createdAtDate || b.createdAt || '',
        createdAtDate: b.createdAtDate || b.createdAt || ''
      }));
      setServiceBookings(mapped);
    } catch (e) {
      console.error(e);
    }
  };

  // Sync state from Firestore
  useEffect(() => {
    if (employeeUser) {
      reloadBookings();
    }
  }, [employeeUser]);

  // Login handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginId.trim() || !password.trim()) {
      setLoginError('Please enter both ID and password.');
      return;
    }

    setIsSubmittingLogin(true);
    setLoginError('');

    try {
      const list = await getDocuments('employees');
      const mapped = list.map(emp => ({
        id: emp.id,
        employeeId: emp.employeeId || emp.id,
        name: emp.fullName || '',
        mobile: emp.mobile || '',
        email: emp.email || '',
        address: emp.address || '',
        loginId: emp.userID || '',
        password: emp.password || '',
        specialization: emp.specialization || 'General',
        status: emp.status || 'Active'
      }));

      const match = mapped.find(
        emp => emp.loginId.toLowerCase() === loginId.trim().toLowerCase() && emp.password === password.trim()
      );

      if (match) {
        if (match.status !== 'Active') {
          setLoginError('Your employee account is suspended. Contact Administrator.');
        } else {
          sessionStorage.setItem('kentro-employee-logged-in', JSON.stringify(match));
          setEmployeeUser(match);
          setLoginError('');
          setLoginId('');
          setPassword('');
        }
      } else {
        setLoginError('Invalid Employee Login ID or Password.');
      }
    } catch (err) {
      console.error(err);
      setLoginError('Failed to access database.');
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('kentro-employee-logged-in');
    setEmployeeUser(null);
  };

  // Update single task status (Pending, Finished, Success)
  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await updateDocument('serviceRequests', taskId, { status: newStatus });
      await reloadBookings();
    } catch (err) {
      console.error(err);
      alert('Failed to update task status.');
    }
  };

  // Filter tasks assigned to this employee
  const employeeTasks = serviceBookings.filter(
    b => b.assignedEmployeeId === employeeUser?.id
  );

  // Search filtered tasks
  const filteredTasks = employeeTasks.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.phone.includes(searchTerm) ||
    (b.bookingId || b.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (b.soldProduct && b.soldProduct.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Stat computations
  const totalTasks = employeeTasks.length;
  const pendingTasks = employeeTasks.filter(b => b.status === 'Pending').length;
  const finishedTasks = employeeTasks.filter(b => b.status === 'Finished').length;
  const successTasks = employeeTasks.filter(b => b.status === 'Success').length;

  if (!employeeUser) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-[#051129] via-[#091E42] to-[#122A59] flex flex-col justify-between items-center py-10 px-4 font-sans select-none text-white relative overflow-hidden">

        {/* Glowing visual effect rings */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] -top-32 -left-32 pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] -bottom-32 -right-32 pointer-events-none" />

        {/* Header Back Button */}
        <button
          onClick={onBackToHome}
          className="self-start text-white hover:text-cyan-400 font-extrabold flex items-center space-x-2 text-sm bg-white/5 hover:bg-white/10 px-4.5 py-2.5 rounded-xl transition duration-200 border border-white/10 cursor-pointer shadow-md backdrop-blur-md z-15"
        >
          <ArrowLeft size={16} />
          <span>Back to Website</span>
        </button>

        {/* Login form container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[420px] bg-white/[0.03] backdrop-blur-xl rounded-[32px] border border-white/[0.08] p-8 shadow-2xl flex flex-col -mt-8 z-10 transition duration-300 hover:border-white/[0.12]"
        >

          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-white text-[#0b3178] font-black text-2.5xl px-7 py-1.5 rounded-sm tracking-wider relative flex items-center justify-center shadow-lg">
              KENT
              <span className="absolute top-1 right-1.5 text-[6.5px] font-normal leading-none">®</span>
            </div>
            <div className="w-[110px] border-t border-b border-white/20 py-0.5 mt-1.5 text-[6px] font-extrabold text-white/50 tracking-widest text-center uppercase leading-none">
              House of Purity
            </div>
            <span className="text-[10px] text-cyan-400 font-black tracking-widest uppercase mt-6 block bg-cyan-950/40 px-3.5 py-1 rounded-full border border-cyan-800/30">
              Employee Portal
            </span>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5 text-left">
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Employee Login ID</label>
              <input
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="Enter login ID"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400 focus:bg-white/10 focus:outline-none text-[13.5px] font-semibold text-white placeholder-slate-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400 focus:bg-white/10 focus:outline-none text-[13.5px] font-semibold text-white placeholder-slate-500 transition-all duration-200"
                required
              />
            </div>

            {loginError && (
              <div className="text-xs text-rose-450 font-bold flex items-center gap-1.5 bg-rose-950/20 border border-rose-800/30 p-3 rounded-lg animate-pulse">
                <ShieldAlert size={14} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

             <button
               type="submit"
               disabled={isSubmittingLogin}
               className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-[#091E42] py-3.5 rounded-xl font-extrabold text-[14px] shadow-lg shadow-cyan-500/25 transition duration-200 cursor-pointer mt-3 transform active:scale-98 flex items-center justify-center gap-2"
             >
               {isSubmittingLogin ? 'Verifying Credentials...' : 'Sign In to Portal'}
             </button>
          </form>

          {/* Quick seeded demo credentials note */}
          <div className="mt-6 border-t border-white/5 pt-4 text-center">
            <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded">
              Demo Credentials: <strong>rajesh</strong> / <strong>password123</strong>
            </span>
          </div>

        </motion.div>

        {/* Footer */}
        <div className="text-[11px] font-extrabold text-slate-500 text-center select-none w-full tracking-wider uppercase">
          KENT Employee Hub © 2026. All rights reserved.
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between font-sans text-slate-800 select-none">

      {/* Header Panel */}
      <header className="w-full bg-white border-b border-slate-100 py-3.5 px-6 md:px-10 flex justify-between items-center z-10 shadow-xs">
        <div className="flex items-center space-x-5">
          <div className="flex flex-col items-center select-none cursor-pointer" onClick={onBackToHome}>
            <div className="bg-[#0b3178] text-white font-black text-[22px] px-4.5 py-0.5 rounded-xs tracking-wider relative flex items-center justify-center shadow-xs">
              KENT
              <span className="absolute top-0.5 right-1.5 text-[5px] font-normal leading-none">®</span>
            </div>
            <div className="w-full border-t border-b border-[#0b3178] py-0.5 mt-0.5 text-[5px] font-extrabold text-[#0b3178] tracking-widest text-center uppercase leading-none">
              House of Purity
            </div>
          </div>
          <span className="text-slate-200 text-lg font-light">|</span>
          <span className="text-xs font-black text-slate-500 flex items-center gap-1.5 bg-slate-50 border border-slate-150 px-3 py-1.5 rounded-xl shadow-2xs">
            <UserCheck size={14} className="text-[#0b3178]" />
            <span className="text-[#091E42] tracking-wider uppercase">Employee Hub</span>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-800 leading-none">{employeeUser.name}</p>
            <span className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider mt-1 block">Staff ID: {employeeUser.id}</span>
          </div>

          <button
            onClick={handleLogout}
            className="text-slate-500 hover:text-rose-600 font-extrabold text-xs flex items-center space-x-1.5 bg-slate-50 hover:bg-rose-50 border border-slate-200/80 hover:border-rose-100 px-4 py-2.5 rounded-xl transition duration-200 cursor-pointer"
          >
            <LogOut size={14} />
            <span className="hidden xs:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Grid View */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-10 py-8 flex-grow grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Left Sidebar Menu */}
        <aside className="lg:col-span-1 flex flex-col space-y-2">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`w-full text-left text-[14.5px] font-extrabold py-3.5 px-4 rounded-xl border transition-all duration-200 flex items-center space-x-3 cursor-pointer ${activeTab === 'tasks'
              ? 'bg-[#0b3178] text-white border-[#0b3178] shadow-md shadow-blue-900/10'
              : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200/60 hover:border-slate-350/50'
              }`}
          >
            <LayoutDashboard size={17} />
            <span>Assigned Tasks ({totalTasks})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left text-[14.5px] font-extrabold py-3.5 px-4 rounded-xl border transition-all duration-200 flex items-center space-x-3 cursor-pointer ${activeTab === 'profile'
              ? 'bg-[#0b3178] text-white border-[#0b3178] shadow-md shadow-blue-900/10'
              : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200/60 hover:border-slate-350/50'
              }`}
          >
            <User size={17} />
            <span>My Profile</span>
          </button>

          <div className="pt-4 border-t border-slate-200/80 mt-2">
            <button
              onClick={onBackToHome}
              className="w-full text-left text-[12.5px] font-extrabold text-slate-400 hover:text-[#0b3178] py-2 px-3 rounded-lg hover:bg-slate-100/50 transition duration-150 flex items-center space-x-2 cursor-pointer uppercase tracking-wider"
            >
              <ArrowLeft size={13} />
              <span>website</span>
            </button>
          </div>
        </aside>

        {/* Right Content Tab */}
        <main className="lg:col-span-3">

          {/* Tab 1: Tasks Logs */}
          {activeTab === 'tasks' && (
            <div className="space-y-6 animate-in fade-in duration-200 text-left">

              {/* Dashboard Title & stats */}
              <div className="border-b border-slate-200/60 pb-3 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-[#091E42] tracking-tight">Assigned Service Tasks</h2>
                  <p className="text-xs text-slate-455 mt-1 font-bold">List of installation, delivery, and repairs registered to your account.</p>
                </div>

                <div className="relative w-full md:max-w-[280px]">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search customer, ID, product..."
                    className="w-full pl-9.5 pr-4 py-2 bg-white rounded-xl border border-slate-250 text-xs font-semibold focus:outline-none focus:border-[#0b3178]"
                  />
                </div>
              </div>

              {/* Counters Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                {/* Total */}
                <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Duties</span>
                  <span className="text-2.5xl font-black text-slate-700 mt-2 block">{totalTasks}</span>
                </div>

                {/* Pending */}
                <div className="bg-amber-50/50 p-4.5 rounded-2xl border border-amber-100 flex flex-col justify-between">
                  <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-1"><Clock size={11} /> Pending</span>
                  <span className="text-2.5xl font-black text-amber-600 mt-2 block">{pendingTasks}</span>
                </div>

                {/* Finished */}
                <div className="bg-indigo-50/50 p-4.5 rounded-2xl border border-indigo-100 flex flex-col justify-between">
                  <span className="text-[9px] font-black text-indigo-700 uppercase tracking-widest flex items-center gap-1"><Wrench size={11} /> Finished</span>
                  <span className="text-2.5xl font-black text-indigo-650 mt-2 block">{finishedTasks}</span>
                </div>

                {/* Success */}
                <div className="bg-emerald-50/50 p-4.5 rounded-2xl border border-emerald-100 flex flex-col justify-between">
                  <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-1"><CheckCircle2 size={11} /> Success</span>
                  <span className="text-2.5xl font-black text-emerald-600 mt-2 block">{successTasks}</span>
                </div>

              </div>

              {/* Tasks List */}
              {filteredTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs flex flex-col justify-between space-y-5 hover:shadow-md hover:border-slate-200 transition-all duration-300 relative group overflow-hidden"
                    >
                      {/* Left accent strip colored by status */}
                      <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${task.status === 'Pending'
                        ? 'bg-amber-500'
                        : task.status === 'Finished'
                          ? 'bg-indigo-500'
                          : 'bg-emerald-500'
                        }`} />

                      {/* Card Header: ID & Status Toggle */}
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold font-mono">
                            {task.bookingId || task.id}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold block mt-1.5">{task.createdAt}</span>
                        </div>

                        {/* Interactive Status Dropdown */}
                        <div className="space-y-1">
                          <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider text-right">Status</label>
                          <select
                            value={task.status}
                            onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider focus:outline-none transition cursor-pointer text-right ${task.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border-amber-250/70'
                              : task.status === 'Finished'
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-250/70'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-250/70'
                              }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Finished">Finished</option>
                            <option value="Success">Success</option>
                          </select>
                        </div>
                      </div>

                      {/* Content block: Customer Details */}
                      <div className="space-y-3 pt-1">

                        {/* Name & Contact */}
                        <div className="space-y-0.5">
                          <p className="text-[14px] font-black text-slate-900 leading-tight">{task.name}</p>
                          <a
                            href={`tel:${task.phone}`}
                            className="text-xs text-[#0b3178] hover:underline font-bold flex items-center gap-1 w-fit"
                          >
                            <Phone size={11} className="text-slate-400" /> {task.phone}
                          </a>
                        </div>

                        {/* Address */}
                        <div className="text-xs text-slate-650 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-1.5 font-semibold">
                          <MapPin size={13} className="text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-slate-500 font-bold text-[10.5px]">DELIVERY ADDRESS:</p>
                            <p className="mt-0.5 leading-relaxed text-slate-800">{task.address}</p>
                            <p className="text-[10px] text-slate-400 font-black mt-1">Area Pincode: {task.pincode}</p>
                          </div>
                        </div>

                        {/* Duty Info */}
                        <div className="grid grid-cols-2 gap-4 text-xs font-semibold">

                          {/* Duty Type */}
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Work Type</span>
                            <span className="text-slate-800 font-extrabold">{task.serviceType}</span>
                          </div>

                          {/* Sold Product */}
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Product Sold</span>
                            <span className="text-[#0b3178] font-black truncate block" title={task.soldProduct || 'Not Assigned'}>
                              {task.soldProduct || 'Not Assigned'}
                            </span>
                          </div>

                        </div>

                        {/* Delivery date */}
                        <div className="bg-blue-50/40 p-2.5 rounded-xl border border-blue-100/30 flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-bold flex items-center gap-1">
                            <Calendar size={12} className="text-slate-400" /> Delivery Target Date:
                          </span>
                          <span className="text-[#0b3178] font-black">
                            {task.deliveryDate ? new Date(task.deliveryDate).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : 'Pending assignment'}
                          </span>
                        </div>

                      </div>

                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white border border-dashed border-slate-200 rounded-[32px] select-none">
                  <Wrench size={32} className="mx-auto text-slate-350 mb-3" />
                  <h4 className="text-slate-455 font-black text-sm uppercase tracking-wider">No Assigned Duties Found</h4>
                  <p className="text-slate-400 text-xs mt-1.5 font-bold">You are currently clear! Check back later for assigned delivery tasks.</p>
                </div>
              )}

            </div>
          )}

          {/* Tab 2: Profile Info */}
          {activeTab === 'profile' && (
            <div className="space-y-6 bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xs text-left animate-in fade-in duration-200">

              <div className="border-b border-slate-200/60 pb-3 mb-6 flex justify-between items-center">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-[#091E42] tracking-tight">Staff Account Profile</h2>
                  <p className="text-xs text-slate-455 mt-1 font-bold">Your corporate profile credentials and assignment metrics.</p>
                </div>
                <span className="text-[10.5px] font-black text-cyan-700 bg-cyan-50 border border-cyan-150 px-3 py-1 rounded-full uppercase tracking-wider">
                  Active Staff
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Profile Card */}
                <div className="md:col-span-1 bg-[#f8fafc] border border-slate-200/50 rounded-2xl p-6 flex flex-col items-center justify-between text-center space-y-4">
                  <div className="space-y-3">
                    <div className="w-20 h-20 bg-[#0b3178] text-white rounded-full flex items-center justify-center mx-auto shadow-md border-4 border-white">
                      <User size={36} />
                    </div>
                    <div>
                      <h4 className="text-[15.5px] font-black text-slate-800 leading-tight">{employeeUser.name}</h4>
                      <p className="text-xs text-slate-400 font-extrabold mt-1">ID: {employeeUser.id}</p>
                    </div>
                  </div>

                  <div className="w-full border-t border-slate-200/60 pt-4 text-xs font-semibold text-slate-600 space-y-1.5">
                    <p className="flex justify-between">
                      <span className="text-slate-400 font-bold">Duty Tally:</span>
                      <span className="text-slate-800 font-black">{totalTasks} tasks</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-400 font-bold">Finished Rate:</span>
                      <span className="text-slate-800 font-black">
                        {totalTasks > 0 ? Math.round(((finishedTasks + successTasks) / totalTasks) * 100) : 0}%
                      </span>
                    </p>
                  </div>
                </div>

                {/* Profile Info Details */}
                <div className="md:col-span-2 space-y-5">
                  <h3 className="text-xs font-black text-[#091E42] uppercase tracking-widest pb-1 border-b border-slate-100">
                    Contact & Location Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 text-xs font-semibold">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Mobile Number</span>
                      <p className="text-slate-800 text-[13px] font-extrabold">{employeeUser.mobile || 'Not Configured'}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Email Address</span>
                      <p className="text-slate-800 text-[13px] font-extrabold">{employeeUser.email || 'Not Configured'}</p>
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Home Base Address</span>
                      <p className="text-slate-800 text-[13px] font-extrabold leading-relaxed">{employeeUser.address || 'Not Configured'}</p>
                    </div>
                  </div>

                  <h3 className="text-xs font-black text-[#091E42] uppercase tracking-widest pb-1 border-b border-slate-100 pt-3">
                    Corporate Login Credentials
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 text-xs font-semibold">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Login Username</span>
                      <code className="bg-slate-50 border border-slate-200 px-2 py-1 rounded text-[#0b3178] font-mono text-xs w-fit block mt-1">{employeeUser.loginId}</code>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Account Password</span>
                      <code className="bg-slate-50 border border-slate-200 px-2 py-1 rounded text-slate-700 font-mono text-xs w-fit block mt-1">{employeeUser.password}</code>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-5 text-center select-none text-[11px] font-extrabold text-slate-400 tracking-wider uppercase">
        KENT Employee Control Panel © 2026. Powered by Kent RO Systems.
      </footer>

    </div>
  );
}
