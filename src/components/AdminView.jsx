import React, { useState, useEffect, useRef } from 'react';
import { 
  PlusCircle, 
  Database, 
  LayoutDashboard, 
  LogOut, 
  ArrowLeft, 
  Trash2, 
  CheckCircle2, 
  UserCheck, 
  ShieldAlert, 
  ImagePlus, 
  Link2, 
  Upload, 
  X, 
  Mail,
  FolderOpen,
  Calendar,
  Phone,
  MapPin,
  Tag,
  DollarSign,
  Wrench,
  Users
} from 'lucide-react';
import { getFullCatalog } from '../catalogData';

export default function AdminView({ onBackToHome }) {
  // Login States
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => sessionStorage.getItem('kentro-admin') === 'true');
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard Navigation State: 'overview' | 'add' | 'manage' | 'enquiries'
  const [activeTab, setActiveTab] = useState('overview');

  // Product Form States
  const [category, setCategory] = useState('Water Purifiers');
  const [subCategory, setSubCategory] = useState('RO Purifiers');
  const [prodId, setProdId] = useState('');
  const [prodName, setProdName] = useState('');
  const [price, setPrice] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [specs, setSpecs] = useState('');
  const [desc, setDesc] = useState('');
  const [features, setFeatures] = useState('');
  const [colors, setColors] = useState('White');
  const [installType, setInstallType] = useState('Wall Mounted');
  const [tech, setTech] = useState('');
  const [roFeatures, setRoFeatures] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageMode, setImageMode] = useState('url'); // 'url' | 'upload'
  const fileInputRef = useRef(null);
  const [formSuccess, setFormSuccess] = useState(false);

  // Warranty and Guarantee states
  const [warranty, setWarranty] = useState('');
  const [guarantee, setGuarantee] = useState('');

  // Custom products and enquiries lists
  const [customProducts, setCustomProducts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [serviceBookings, setServiceBookings] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Employee creation form states
  const [empName, setEmpName] = useState('');
  const [empAddress, setEmpAddress] = useState('');
  const [empMobile, setEmpMobile] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empLoginId, setEmpLoginId] = useState('');
  const [empPassword, setEmpPassword] = useState('');
  const [empSuccess, setEmpSuccess] = useState(false);

  // Flattened list of all catalog products for assignments
  const [allProductsList, setAllProductsList] = useState([]);

  // Get catalog products list when custom products change
  useEffect(() => {
    try {
      const catalog = getFullCatalog();
      const list = [];
      Object.values(catalog).forEach(arr => {
        arr.forEach(p => {
          if (!list.includes(p.name)) {
            list.push(p.name);
          }
        });
      });
      setAllProductsList(list);
    } catch (e) {
      console.error('Error loading catalog list:', e);
    }
  }, [customProducts]);

  // Load custom products, enquiries, service bookings, and employees on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kentro-custom-products');
      if (stored) {
        setCustomProducts(JSON.parse(stored));
      }
      const storedEnquiries = localStorage.getItem('kentro-enquiries');
      if (storedEnquiries) {
        setEnquiries(JSON.parse(storedEnquiries));
      }
      const storedBookings = localStorage.getItem('kentro-service-bookings');
      if (storedBookings) {
        setServiceBookings(JSON.parse(storedBookings));
      }
      
      const storedEmployees = localStorage.getItem('kentro-employees');
      if (storedEmployees) {
        setEmployees(JSON.parse(storedEmployees));
      } else {
        // Seed default employee
        const defaultEmployees = [
          {
            id: 'EMP-101',
            name: 'Rajesh Kumar',
            mobile: '9876543210',
            email: 'rajesh@kentro.in',
            address: 'Sector 62, Noida, UP',
            loginId: 'rajesh',
            password: 'password123'
          }
        ];
        localStorage.setItem('kentro-employees', JSON.stringify(defaultEmployees));
        setEmployees(defaultEmployees);
      }
    } catch (e) {
      console.error('Error loading data:', e);
    }

    const handleStorageChange = (e) => {
      try {
        if (e.key === 'kentro-custom-products') {
          setCustomProducts(e.newValue ? JSON.parse(e.newValue) : []);
        } else if (e.key === 'kentro-enquiries') {
          setEnquiries(e.newValue ? JSON.parse(e.newValue) : []);
        } else if (e.key === 'kentro-service-bookings') {
          setServiceBookings(e.newValue ? JSON.parse(e.newValue) : []);
        } else if (e.key === 'kentro-employees') {
          setEmployees(e.newValue ? JSON.parse(e.newValue) : []);
        }
      } catch (err) {
        console.error('Error syncing data on storage change:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync category and subcategory selects
  const categorySubcategories = {
    'Water Purifiers': ['RO Purifiers', 'Hydrogen Rich Water', 'UV Purifiers', 'Gravity Purifiers', 'Commercial Purifier'],
    'Water Softeners': ['Bathroom Softeners', 'Washing Machine Softeners', 'Automatic Softeners'],
    'Kitchen Appliances': ['Air Fryers', 'Cold Pressed Juicers', 'Bread Makers', 'Multi Cookers'],
    'Home Appliances': ['Air Purifiers', 'Vacuum Cleaners', 'Vegetable Cleaners'],
    'New Energy': ['Solar Panels', 'Solar Inverters']
  };

  const handleCategoryChange = (e) => {
    const selectedCat = e.target.value;
    setCategory(selectedCat);
    setSubCategory(categorySubcategories[selectedCat][0]);
  };

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (adminId === 'admin' && adminPassword === 'admin123') {
      sessionStorage.setItem('kentro-admin', 'true');
      setIsAdminLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid ID or Password. Try admin / admin123');
    }
  };

  // Handle Add Product Submit
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!prodId.trim() || !prodName.trim() || !price || !basePrice) {
      alert('Please fill out all required fields.');
      return;
    }

    const newProd = {
      id: prodId.trim().toLowerCase().replace(/\s+/g, '-'),
      name: prodName.trim(),
      price: parseFloat(price),
      basePrice: parseFloat(basePrice),
      specs: specs.trim() || tech.trim(),
      desc: desc.trim(),
      features: features ? features.split(',').map(f => f.trim()) : [],
      color: colors ? colors.split(',').map(c => c.trim()) : ['White'],
      installType,
      tech: tech.trim() || specs.trim(),
      roFeatures: roFeatures ? roFeatures.split(',').map(b => b.trim()) : [],
      category,
      subCategory,
      image: imagePreview || imageUrl.trim() || null,
      warranty: warranty.trim() || null,
      guarantee: guarantee.trim() || null
    };

    const updatedList = [...customProducts, newProd];

    try {
      localStorage.setItem('kentro-custom-products', JSON.stringify(updatedList));
      setCustomProducts(updatedList);

      // Reset Form Fields
      setProdId('');
      setProdName('');
      setPrice('');
      setBasePrice('');
      setSpecs('');
      setDesc('');
      setFeatures('');
      setColors('White');
      setTech('');
      setRoFeatures('');
      setImageUrl('');
      setImagePreview(null);
      setImageMode('url');
      setWarranty('');
      setGuarantee('');
      if (fileInputRef.current) fileInputRef.current.value = '';

      setFormSuccess(true);
      setTimeout(() => setFormSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save the product to local storage. This might be because the uploaded image is too large. Please try a smaller image file (< 1.5MB) or paste an image URL instead.');
    }
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    const updatedList = customProducts.filter(p => p.id !== id);
    setCustomProducts(updatedList);
    localStorage.setItem('kentro-custom-products', JSON.stringify(updatedList));
  };

  // Delete enquiry
  const handleDeleteEnquiry = (id) => {
    const updatedList = enquiries.filter(e => e.id !== id);
    setEnquiries(updatedList);
    localStorage.setItem('kentro-enquiries', JSON.stringify(updatedList));
  };

  // Update enquiry status
  const handleUpdateEnquiryStatus = (id, newStatus) => {
    const updatedList = enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e);
    setEnquiries(updatedList);
    localStorage.setItem('kentro-enquiries', JSON.stringify(updatedList));
  };

  // Delete service booking
  const handleDeleteBooking = (id) => {
    const updatedList = serviceBookings.filter(b => b.id !== id);
    setServiceBookings(updatedList);
    localStorage.setItem('kentro-service-bookings', JSON.stringify(updatedList));
  };

  // Update service booking status
  const handleUpdateBookingStatus = (id, newStatus) => {
    const updatedList = serviceBookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setServiceBookings(updatedList);
    localStorage.setItem('kentro-service-bookings', JSON.stringify(updatedList));
  };

  // Update service assignment fields
  const handleUpdateServiceAssignment = (id, fieldName, value) => {
    const updatedList = serviceBookings.map(b => b.id === id ? { ...b, [fieldName]: value } : b);
    setServiceBookings(updatedList);
    localStorage.setItem('kentro-service-bookings', JSON.stringify(updatedList));
  };

  // Add new employee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!empName.trim() || !empLoginId.trim() || !empPassword.trim()) {
      alert('Name, Login ID, and Password are required.');
      return;
    }

    // Check if Login ID is already taken
    if (employees.some(emp => emp.loginId.toLowerCase() === empLoginId.trim().toLowerCase())) {
      alert('Login ID is already taken. Please choose another one.');
      return;
    }

    const newEmp = {
      id: 'EMP-' + Math.floor(100 + Math.random() * 900),
      name: empName.trim(),
      mobile: empMobile.trim(),
      email: empEmail.trim(),
      address: empAddress.trim(),
      loginId: empLoginId.trim(),
      password: empPassword.trim()
    };

    const updatedEmployees = [...employees, newEmp];
    setEmployees(updatedEmployees);
    localStorage.setItem('kentro-employees', JSON.stringify(updatedEmployees));

    // Reset Form
    setEmpName('');
    setEmpAddress('');
    setEmpMobile('');
    setEmpEmail('');
    setEmpLoginId('');
    setEmpPassword('');
    setEmpSuccess(true);
    setTimeout(() => setEmpSuccess(false), 3000);
  };

  // Delete employee
  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem('kentro-employees', JSON.stringify(updatedEmployees));
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem('kentro-admin');
    setIsAdminLoggedIn(false);
  };

  const totalProductsCount = customProducts.length;
  const countByCategory = customProducts.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#091E42] via-[#0D2149] to-[#051129] flex flex-col justify-between items-center py-10 px-4 font-sans select-none text-white relative overflow-hidden">
        
        {/* Decorative background glow circles */}
        <div className="absolute w-[450px] h-[450px] rounded-full bg-blue-600/10 blur-[100px] -top-40 -left-40 pointer-events-none" />
        <div className="absolute w-[450px] h-[450px] rounded-full bg-cyan-600/10 blur-[100px] -bottom-40 -right-40 pointer-events-none" />

        {/* Back Link */}
        <button
          onClick={onBackToHome}
          className="self-start text-white hover:text-cyan-400 font-extrabold flex items-center space-x-2 text-sm bg-white/5 hover:bg-white/10 px-4.5 py-2.5 rounded-xl transition duration-200 border border-white/10 cursor-pointer shadow-md backdrop-blur-md z-15"
        >
          <ArrowLeft size={16} />
          <span>Back to Front Store</span>
        </button>

        {/* Login Card */}
        <div className="w-full max-w-[400px] bg-white/[0.03] backdrop-blur-xl rounded-[32px] border border-white/[0.08] p-8 shadow-2xl flex flex-col -mt-8 z-10 transition duration-300 hover:border-white/[0.12]">
          
          {/* Logo Frame */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-white text-[#0b3178] font-black text-2.5xl px-7 py-1.5 rounded-sm tracking-wider relative flex items-center justify-center shadow-lg">
              KENT
              <span className="absolute top-1 right-1.5 text-[6.5px] font-normal leading-none">®</span>
            </div>
            <div className="w-[110px] border-t border-b border-white/20 py-0.5 mt-1.5 text-[6px] font-extrabold text-white/50 tracking-widest text-center uppercase leading-none">
              House of Purity
            </div>
            <span className="text-[10px] text-cyan-400 font-black tracking-widest uppercase mt-6 block bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/30">
              Admin Portal
            </span>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Admin ID</label>
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Enter admin ID"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400 focus:bg-white/10 focus:outline-none text-[13.5px] font-semibold text-white placeholder-slate-500 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400 focus:bg-white/10 focus:outline-none text-[13.5px] font-semibold text-white placeholder-slate-500 transition-all duration-200"
                required
              />
            </div>

            {loginError && (
              <div className="text-xs text-rose-400 font-bold flex items-center gap-1.5 bg-rose-950/20 border border-rose-800/30 p-3 rounded-lg">
                <ShieldAlert size={14} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#091E42] py-3.5 rounded-xl font-extrabold text-[14px] shadow-lg shadow-cyan-500/25 transition duration-200 cursor-pointer mt-3 transform active:scale-98"
            >
              Sign In to Dashboard
            </button>
          </form>

        </div>

        {/* Footer */}
        <div className="text-[11px] font-extrabold text-slate-500 text-center select-none w-full tracking-wider uppercase">
          KENT Admin Panel © 2026. All rights reserved.
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between font-sans text-slate-800 select-none">
      
      {/* Top Header */}
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
            <span className="text-[#091E42] tracking-wider uppercase">System Management</span>
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="text-slate-500 hover:text-rose-600 font-extrabold text-xs flex items-center space-x-1.5 bg-slate-50 hover:bg-rose-50 border border-slate-200/80 hover:border-rose-100 px-4 py-2.5 rounded-xl transition duration-200 cursor-pointer"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </header>

      {/* Grid Container */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-10 py-8 flex-grow grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Dashboard Sidebar */}
        <aside className="lg:col-span-1 flex flex-col space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left text-[14.5px] font-extrabold py-3.5 px-4 rounded-xl border transition-all duration-200 flex items-center space-x-3 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#0b3178] text-white border-[#0b3178] shadow-md shadow-blue-900/10'
                : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200/60 hover:border-slate-350/50'
            }`}
          >
            <LayoutDashboard size={17} />
            <span>Dashboard Home</span>
          </button>
          
          <button
            onClick={() => setActiveTab('add')}
            className={`w-full text-left text-[14.5px] font-extrabold py-3.5 px-4 rounded-xl border transition-all duration-200 flex items-center space-x-3 cursor-pointer ${
              activeTab === 'add'
                ? 'bg-[#0b3178] text-white border-[#0b3178] shadow-md shadow-blue-900/10'
                : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200/60 hover:border-slate-350/50'
            }`}
          >
            <PlusCircle size={17} />
            <span>Add New Product</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`w-full text-left text-[14.5px] font-extrabold py-3.5 px-4 rounded-xl border transition-all duration-200 flex items-center space-x-3 cursor-pointer ${
              activeTab === 'manage'
                ? 'bg-[#0b3178] text-white border-[#0b3178] shadow-md shadow-blue-900/10'
                : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200/60 hover:border-slate-350/50'
            }`}
          >
            <Database size={17} />
            <span>Custom Products ({totalProductsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`w-full text-left text-[14.5px] font-extrabold py-3.5 px-4 rounded-xl border transition-all duration-200 flex items-center space-x-3 cursor-pointer ${
              activeTab === 'enquiries'
                ? 'bg-[#0b3178] text-white border-[#0b3178] shadow-md shadow-blue-900/10'
                : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200/60 hover:border-slate-350/50'
            }`}
          >
            <Mail size={17} />
            <span>Customer Enquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full text-left text-[14.5px] font-extrabold py-3.5 px-4 rounded-xl border transition-all duration-200 flex items-center space-x-3 cursor-pointer ${
              activeTab === 'services'
                ? 'bg-[#0b3178] text-white border-[#0b3178] shadow-md shadow-blue-900/10'
                : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200/60 hover:border-slate-350/50'
            }`}
          >
            <Wrench size={17} />
            <span>Service  ({serviceBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('employees')}
            className={`w-full text-left text-[14.5px] font-extrabold py-3.5 px-4 rounded-xl border transition-all duration-200 flex items-center space-x-3 cursor-pointer ${
              activeTab === 'employees'
                ? 'bg-[#0b3178] text-white border-[#0b3178] shadow-md shadow-blue-900/10'
                : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200/60 hover:border-slate-350/50'
            }`}
          >
            <Users size={17} />
            <span>Employees ({employees.length})</span>
          </button>
          
          <div className="pt-4 border-t border-slate-200/80 mt-2">
            <button
              onClick={onBackToHome}
              className="w-full text-left text-[12.5px] font-extrabold text-slate-400 hover:text-[#0b3178] py-2 px-3 rounded-lg hover:bg-slate-100/50 transition duration-150 flex items-center space-x-2 cursor-pointer uppercase tracking-wider"
            >
              <ArrowLeft size={13} />
              <span>Back to Storefront</span>
            </button>
          </div>
        </aside>

        {/* Right Dashboard Contents */}
        <main className="lg:col-span-3">
          
          {/* Tab 1: Overview stats */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200 text-left">
              
              <div className="border-b border-slate-200/60 pb-3">
                <h2 className="text-xl md:text-2xl font-black text-[#091E42] tracking-tight">Overview Dashboard</h2>
                <p className="text-xs text-slate-450 mt-1 font-bold">Consolidated operational metrics and logs of Kentro Storefront.</p>
              </div>
              
              {/* Four Stat Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                {/* Custom Products Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between transition hover:shadow-md">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Added Products</span>
                    <span className="text-3.5xl font-black text-[#0b3178] block">{totalProductsCount}</span>
                  </div>
                  <div className="p-3.5 bg-blue-50 text-[#0b3178] rounded-2xl border border-blue-100/50">
                    <Database size={22} />
                  </div>
                </div>

                {/* Enquiries Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between transition hover:shadow-md">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Enquiries</span>
                    <span className="text-3.5xl font-black text-amber-600 block">{enquiries.length}</span>
                  </div>
                  <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100/50">
                    <Mail size={22} />
                  </div>
                </div>

                {/* Categories Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between transition hover:shadow-md">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categories</span>
                    <span className="text-3.5xl font-black text-emerald-600 block">{Object.keys(categorySubcategories).length}</span>
                  </div>
                  <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100/50">
                    <FolderOpen size={22} />
                  </div>
                </div>

                {/* Employees Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between transition hover:shadow-md">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Staff</span>
                    <span className="text-3.5xl font-black text-indigo-650 block">{employees.length}</span>
                  </div>
                  <div className="p-3.5 bg-indigo-50 text-indigo-650 rounded-2xl border border-indigo-100/50">
                    <Users size={22} />
                  </div>
                </div>

              </div>

              {/* Grid: Category Breakdown & Recent Enquiries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Categories breakdown panel */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs">
                  <h3 className="text-xs font-black text-[#091E42] uppercase tracking-widest mb-4 pb-2 border-b border-slate-50 flex items-center gap-1.5">
                    <Tag size={14} className="text-[#0b3178]" /> Catalog Tally by Category
                  </h3>
                  <div className="space-y-3">
                    {Object.keys(categorySubcategories).map(catName => {
                      const count = countByCategory[catName] || 0;
                      return (
                        <div key={catName} className="flex justify-between items-center text-xs font-bold text-slate-600 bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-100">
                          <span>{catName}</span>
                          <span className="bg-[#0b3178] text-white px-2 py-0.5 rounded-md text-[10px] font-black">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent enquiries panel */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-black text-[#091E42] uppercase tracking-widest mb-4 pb-2 border-b border-slate-50 flex items-center gap-1.5">
                      <Mail size={14} className="text-amber-500" /> Recent Customer Enquiries
                    </h3>
                    {enquiries.length > 0 ? (
                      <div className="divide-y divide-slate-100 space-y-1 max-h-[220px] overflow-y-auto">
                        {enquiries.slice(-3).reverse().map(e => (
                          <div key={e.id} className="py-2.5 flex justify-between items-start text-xs font-semibold">
                            <div>
                              <p className="text-slate-800 font-extrabold">{e.name}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                                <Calendar size={10} /> {e.submittedAt}
                              </p>
                            </div>
                            <span className="bg-blue-50 text-[#0b3178] border border-blue-100 rounded px-2 py-0.5 text-[9px] font-black max-w-[120px] truncate" title={e.productName}>
                              {e.productName}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-400 font-bold text-xs select-none">
                        No recent inquiries logged.
                      </div>
                    )}
                  </div>
                  {enquiries.length > 3 && (
                    <button
                      onClick={() => setActiveTab('enquiries')}
                      className="w-full text-center text-xs font-black text-[#0b3178] hover:underline mt-4 pt-3 border-t border-slate-50 cursor-pointer"
                    >
                      View All Enquiries ({enquiries.length}) →
                    </button>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* Tab 2: Add Product Form */}
          {activeTab === 'add' && (
            <div className="space-y-6 bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xs text-left animate-in fade-in duration-200">
              
              <div className="border-b border-slate-200/60 pb-3 mb-6">
                <h2 className="text-xl md:text-2xl font-black text-[#091E42] tracking-tight">Add New Product</h2>
                <p className="text-xs text-slate-455 mt-1 font-bold">Populate specifications to integrate custom items into the dynamic catalog.</p>
              </div>

              {formSuccess && (
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex items-center space-x-3 text-emerald-800 text-[13.5px] font-extrabold select-none shadow-xs">
                  <CheckCircle2 size={18} className="text-emerald-600" />
                  <span>Product successfully integrated into the active storefront catalog!</span>
                </div>
              )}

              <form onSubmit={handleAddProductSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Category *</label>
                    <select
                      value={category}
                      onChange={handleCategoryChange}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13.5px] font-semibold text-slate-700 transition-all cursor-pointer"
                    >
                      {Object.keys(categorySubcategories).map(catName => (
                        <option key={catName} value={catName}>{catName}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Subcategory *</label>
                    <select
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13.5px] font-semibold text-slate-700 transition-all cursor-pointer"
                    >
                      {categorySubcategories[category].map(subName => (
                        <option key={subName} value={subName}>{subName}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Product ID (Unique Key) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. kent-prime-smart"
                      value={prodId}
                      onChange={(e) => setProdId(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13.5px] font-semibold transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Product Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. KENT Prime Smart RO Purifier"
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13.5px] font-semibold transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Offer Price (₹) *</label>
                    <div className="relative flex items-center">
                      <DollarSign size={16} className="absolute left-3.5 text-slate-400" />
                      <input
                        type="number"
                        required
                        placeholder="e.g. 17499"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13.5px] font-semibold transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Base MRP Price (₹) *</label>
                    <div className="relative flex items-center">
                      <DollarSign size={16} className="absolute left-3.5 text-slate-400" />
                      <input
                        type="number"
                        required
                        placeholder="e.g. 21000"
                        value={basePrice}
                        onChange={(e) => setBasePrice(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13.5px] font-semibold transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Technical Summary Specs</label>
                    <input
                      type="text"
                      placeholder="e.g. RO + UV + UF + TDS Control"
                      value={specs}
                      onChange={(e) => setSpecs(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13.5px] font-semibold transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Installation Mounting Type</label>
                    <select
                      value={installType}
                      onChange={(e) => setInstallType(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13.5px] font-semibold text-slate-700 transition-all cursor-pointer"
                    >
                      <option value="Wall Mounted">Wall Mounted</option>
                      <option value="Counter Top">Counter Top</option>
                      <option value="Under The Counter">Under The Counter</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Description *</label>
                  <textarea
                    rows={3}
                    placeholder="Enter detailed description guidelines..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13.5px] font-semibold resize-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Bullet Features (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. 9L storage, Smart filter health indicator, Zero wastage"
                      value={features}
                      onChange={(e) => setFeatures(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13px] font-semibold transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Color Options (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. White, Black"
                      value={colors}
                      onChange={(e) => setColors(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13px] font-semibold transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Purification Technology</label>
                    <input
                      type="text"
                      placeholder="e.g. RO + UV + UF + TDS Control"
                      value={tech}
                      onChange={(e) => setTech(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13px] font-semibold transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Key Badges (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. Best Selling, Zero Water Wastage Technology"
                      value={roFeatures}
                      onChange={(e) => setRoFeatures(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13px] font-semibold transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Product Warranty</label>
                    <input
                      type="text"
                      placeholder="e.g. 1 Year Warranty"
                      value={warranty}
                      onChange={(e) => setWarranty(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13.5px] font-semibold transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Product Guarantee</label>
                    <input
                      type="text"
                      placeholder="e.g. 3 Years Free Service Scheme"
                      value={guarantee}
                      onChange={(e) => setGuarantee(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13.5px] font-semibold transition-all"
                    />
                  </div>
                </div>

                {/* Product Image Section */}
                <div className="border-t border-slate-100 pt-5 mt-4">
                  <label className="block text-[10px] font-extrabold text-[#0b3178] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <ImagePlus size={15} /> Product Image Configuration
                  </label>

                  {/* Toggle Mode */}
                  <div className="flex gap-2.5 mb-4">
                    <button
                      type="button"
                      onClick={() => setImageMode('url')}
                      className={`flex items-center gap-1.5 text-[11.5px] font-extrabold px-4.5 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                        imageMode === 'url'
                          ? 'bg-[#0b3178] text-white border-[#0b3178] shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-350/65'
                      }`}
                    >
                      <Link2 size={13} />
                      <span>Paste Image URL</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMode('upload')}
                      className={`flex items-center gap-1.5 text-[11.5px] font-extrabold px-4.5 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                        imageMode === 'upload'
                          ? 'bg-[#0b3178] text-white border-[#0b3178] shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-350/65'
                      }`}
                    >
                      <Upload size={13} />
                      <span>Upload Local File</span>
                    </button>
                  </div>

                  {imageMode === 'url' ? (
                    <input
                      type="url"
                      placeholder="Paste image web address (e.g., https://example.com/item.png)"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        setImagePreview(e.target.value.trim() || null);
                      }}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:ring-4 focus:ring-blue-100 focus:outline-none text-[13px] font-semibold transition-all"
                    />
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const file = e.dataTransfer.files?.[0];
                        if (file) {
                          if (file.size > 1.5 * 1024 * 1024) {
                            alert('Image file is too large (Max 1.5MB allowed for browser local storage). Please use a smaller image or paste an image URL instead.');
                            return;
                          }
                          if (file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = (ev) => setImagePreview(ev.target.result);
                            reader.readAsDataURL(file);
                          }
                        }
                      }}
                      className="w-full border-2 border-dashed border-slate-250 hover:border-[#0b3178]/50 rounded-2xl py-8 flex flex-col items-center justify-center text-center cursor-pointer transition bg-slate-50/50 hover:bg-[#0b3178]/5"
                    >
                      <Upload size={26} className="text-slate-400 mb-2" />
                      <p className="text-[13px] font-extrabold text-slate-600">Click to select files or drop them here</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">PNG, JPG, or WEBP (MAX 2MB)</p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 1.5 * 1024 * 1024) {
                          alert('Image file is too large (Max 1.5MB allowed for browser local storage). Please use a smaller image or paste an image URL instead.');
                          if (fileInputRef.current) fileInputRef.current.value = '';
                          return;
                        }
                        if (file.type.startsWith('image/')) {
                          const reader = new FileReader();
                          reader.onload = (ev) => setImagePreview(ev.target.result);
                          reader.readAsDataURL(file);
                        }
                      }
                    }}
                  />

                  {/* Preview Container */}
                  {imagePreview && (
                    <div className="mt-4 relative inline-block animate-in fade-in duration-200">
                      <img
                        src={imagePreview}
                        alt="Preview mockup"
                        className="w-28 h-28 object-contain rounded-2xl border border-slate-150 bg-white p-2.5 shadow-md"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setImageUrl('');
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center shadow-md cursor-pointer transition transform active:scale-90"
                      >
                        <X size={12} />
                      </button>
                      <span className="block text-[10px] text-emerald-600 font-extrabold mt-1.5">✓ Ready for publication</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-[#0b3178] hover:bg-[#082457] text-white font-extrabold text-xs tracking-wider uppercase px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer mt-6 transform active:scale-97 hover:scale-[1.01]"
                >
                  Publish Product to Catalog
                </button>
              </form>
            </div>
          )}

          {/* Tab 3: Manage Products List */}
          {activeTab === 'manage' && (
            <div className="space-y-6 bg-white rounded-3xl border border-slate-100 p-6 shadow-xs text-left animate-in fade-in duration-200">
              
              <div className="border-b border-slate-200/60 pb-3 mb-6">
                <h2 className="text-xl md:text-2xl font-black text-[#091E42] tracking-tight">Manage Added Products</h2>
                <p className="text-xs text-slate-455 mt-1 font-bold">List and moderate custom added items published in the catalog.</p>
              </div>

              {customProducts.length > 0 ? (
                <div className="overflow-x-auto rounded-2xl border border-slate-100">
                  <table className="w-full text-left border-collapse text-xs text-slate-700 bg-white">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="px-5 py-4">Product Name</th>
                        <th className="px-5 py-4">Subcategory</th>
                        <th className="px-5 py-4">Install Type</th>
                        <th className="px-5 py-4 text-right">Price</th>
                        <th className="px-5 py-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      {customProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/30 transition duration-150">
                          <td className="px-5 py-4 text-slate-900 font-black">{p.name}</td>
                          <td className="px-5 py-4 text-slate-500 font-bold">{p.subCategory}</td>
                          <td className="px-5 py-4 text-slate-500 font-bold">{p.installType}</td>
                          <td className="px-5 py-4 text-slate-900 font-black text-right">₹{p.price.toLocaleString('en-IN')}.00</td>
                          <td className="px-5 py-4 text-center">
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="text-slate-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition duration-150 cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl bg-white select-none">
                  <Database size={24} className="mx-auto text-slate-350 mb-3" />
                  <p className="text-slate-400 font-extrabold text-sm">No custom products published yet.</p>
                  <button
                    onClick={() => setActiveTab('add')}
                    className="mt-3 text-xs font-black text-[#0b3178] hover:underline cursor-pointer"
                  >
                    Add a product now →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: View Customer Enquiries */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6 bg-white rounded-3xl border border-slate-100 p-6 shadow-xs text-left animate-in fade-in duration-200">
              
              <div className="border-b border-slate-200/60 pb-3 mb-6">
                <h2 className="text-xl md:text-2xl font-black text-[#091E42] tracking-tight">Customer Enquiries</h2>
                <p className="text-xs text-slate-455 mt-1 font-bold">List of lead inquiries submitted by customers on catalog and product views.</p>
              </div>

              {enquiries.length > 0 ? (
                <div className="overflow-x-auto rounded-2xl border border-slate-100">
                  <table className="w-full text-left border-collapse text-xs text-slate-700 bg-white">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="px-5 py-4">Customer</th>
                        <th className="px-5 py-4">Mobile</th>
                        <th className="px-5 py-4">Address</th>
                        <th className="px-5 py-4">Product Info</th>
                        <th className="px-5 py-4">Date</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      {enquiries.map((e) => (
                        <tr key={e.id} className="hover:bg-slate-50/30 transition duration-150">
                          <td className="px-5 py-4 text-slate-900 font-black">{e.name}</td>
                          <td className="px-5 py-4 text-slate-600 font-bold flex items-center gap-1">
                            <Phone size={11} className="text-slate-400" /> {e.phone}
                          </td>
                          <td className="px-5 py-4 text-slate-500 max-w-[200px] truncate font-bold" title={e.address}>
                            <span className="flex items-center gap-1"><MapPin size={11} className="text-slate-400 shrink-0" /> {e.address}</span>
                          </td>
                          <td className="px-5 py-4 text-slate-800">
                            <div className="font-extrabold text-slate-900">{e.productName}</div>
                            <div className="text-[10px] text-slate-400 font-black mt-0.5">₹ {e.productPrice?.toLocaleString('en-IN')}.00</div>
                          </td>
                          <td className="px-5 py-4 text-slate-850 text-[10.5px] font-bold">{e.submittedAt}</td>
                          <td className="px-5 py-4">
                            <select
                              value={e.status || 'Pending'}
                              onChange={(el) => handleUpdateEnquiryStatus(e.id, el.target.value)}
                              className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider focus:outline-none transition cursor-pointer ${
                                (e.status || 'Pending') === 'Pending'
                                  ? 'bg-amber-50 text-amber-700 border-amber-250/70'
                                  : (e.status || 'Pending') === 'In Discussion'
                                  ? 'bg-indigo-50 text-indigo-700 border-indigo-250/70'
                                  : (e.status || 'Pending') === 'Sell'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-250/70'
                                  : 'bg-rose-50 text-rose-700 border-rose-250/70'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Discussion">In Discussion</option>
                              <option value="Sell">Sell</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <button
                              onClick={() => handleDeleteEnquiry(e.id)}
                              className="text-slate-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition duration-150 cursor-pointer"
                              title="Delete Enquiry"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl bg-white select-none">
                  <Mail size={24} className="mx-auto text-slate-350 mb-3" />
                  <p className="text-slate-400 font-extrabold text-sm">No customer enquiries received yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 5: Service Menu - Service Bookings */}
          {activeTab === 'services' && (
            <div className="space-y-6 bg-white rounded-3xl border border-slate-100 p-6 shadow-xs text-left animate-in fade-in duration-200">
              
              <div className="border-b border-slate-200/60 pb-3 mb-6">
                <h2 className="text-xl md:text-2xl font-black text-[#091E42] tracking-tight">Service Request Log</h2>
                <p className="text-xs text-slate-455 mt-1 font-bold">Monitor, coordinate, and assign service requests registered online by store users.</p>
              </div>

              {serviceBookings.length > 0 ? (
                <div className="overflow-x-auto rounded-2xl border border-slate-100">
                  <table className="w-full text-left border-collapse text-xs text-slate-700 bg-white">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="px-5 py-4">Ref ID</th>
                        <th className="px-5 py-4">Customer</th>
                        <th className="px-5 py-4">Contact & Location</th>
                        <th className="px-5 py-4">Request Type</th>
                        <th className="px-5 py-4">Delivery & Assignment</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      {serviceBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50/30 transition duration-150">
                          <td className="px-5 py-4 text-slate-900 font-black">{b.id}</td>
                          <td className="px-5 py-4 text-slate-900 font-black">
                            <div>{b.name}</div>
                            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{b.createdAt}</div>
                          </td>
                          <td className="px-5 py-4 text-slate-600 font-bold">
                            <div className="flex items-center gap-1"><Phone size={11} className="text-slate-400" /> {b.phone}</div>
                            <div className="flex items-center gap-1 mt-1 text-slate-500 max-w-[200px] truncate" title={b.address}>
                              <MapPin size={11} className="text-slate-400 shrink-0" /> {b.pincode} - {b.address}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="bg-blue-50 text-[#0b3178] border border-blue-100 rounded-md px-2 py-1 text-[9px] font-black uppercase tracking-wider">
                              {b.serviceType}
                            </span>
                          </td>
                          <td className="px-5 py-4 space-y-2 min-w-[210px]">
                            <div>
                              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Selled Product</label>
                              <select
                                value={b.soldProduct || ''}
                                onChange={(e) => handleUpdateServiceAssignment(b.id, 'soldProduct', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 focus:outline-none focus:border-[#0b3178] cursor-pointer"
                              >
                                <option value="">Not Assigned</option>
                                {allProductsList.map((name) => (
                                  <option key={name} value={name}>{name}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Delivery Date</label>
                              <input
                                type="date"
                                value={b.deliveryDate || ''}
                                onChange={(e) => handleUpdateServiceAssignment(b.id, 'deliveryDate', e.target.value)}
                                className="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 focus:outline-none focus:border-[#0b3178] cursor-pointer"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Assigned Employee</label>
                              <select
                                value={b.assignedEmployeeId || ''}
                                onChange={(e) => handleUpdateServiceAssignment(b.id, 'assignedEmployeeId', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 focus:outline-none focus:border-[#0b3178] cursor-pointer"
                              >
                                <option value="">Unassigned</option>
                                {employees.map((emp) => (
                                  <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>
                                ))}
                              </select>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <select
                              value={b.status}
                              onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                              className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider focus:outline-none transition cursor-pointer ${
                                b.status === 'Pending'
                                  ? 'bg-amber-50 text-amber-700 border-amber-250/70'
                                  : b.status === 'Finished'
                                  ? 'bg-indigo-50 text-indigo-700 border-indigo-250/70'
                                  : b.status === 'Success'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-250/70'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-250/70'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Finished">Finished</option>
                              <option value="Success">Success</option>
                            </select>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <button
                              onClick={() => handleDeleteBooking(b.id)}
                              className="text-slate-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition duration-150 cursor-pointer"
                              title="Delete Request"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl bg-white select-none">
                  <Wrench size={24} className="mx-auto text-slate-350 mb-3" />
                  <p className="text-slate-400 font-extrabold text-sm">No service requests registered yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 6: Employees Management */}
          {activeTab === 'employees' && (
            <div className="space-y-8 animate-in fade-in duration-200 text-left">
              
              <div className="border-b border-slate-200/60 pb-3">
                <h2 className="text-xl md:text-2xl font-black text-[#091E42] tracking-tight">Employee Management</h2>
                <p className="text-xs text-slate-455 mt-1 font-bold">Register new employees, configure login credentials, and track active staff details.</p>
              </div>

              {empSuccess && (
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex items-center space-x-3 text-emerald-800 text-[13.5px] font-extrabold select-none shadow-xs">
                  <CheckCircle2 size={18} className="text-emerald-600" />
                  <span>Employee profile created and registered successfully!</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Add Employee Form */}
                <div className="lg:col-span-1 bg-white border border-slate-100 p-6 rounded-3xl shadow-xs space-y-5">
                  <h3 className="text-xs font-black text-[#091E42] uppercase tracking-widest pb-2 border-b border-slate-50 flex items-center gap-1.5">
                    <Users size={14} className="text-[#0b3178]" /> Register New Employee
                  </h3>

                  <form onSubmit={handleAddEmployee} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={empName}
                        onChange={(e) => setEmpName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[13px] font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="10-digit number"
                        value={empMobile}
                        onChange={(e) => setEmpMobile(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[13px] font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. john@kentro.in"
                        value={empEmail}
                        onChange={(e) => setEmpEmail(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[13px] font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Home Address</label>
                      <textarea
                        rows={2}
                        placeholder="Complete postal address"
                        value={empAddress}
                        onChange={(e) => setEmpAddress(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[13px] font-semibold resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Login ID *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. john"
                          value={empLoginId}
                          onChange={(e) => setEmpLoginId(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[13px] font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Password *</label>
                        <input
                          type="password"
                          required
                          placeholder="••••••"
                          value={empPassword}
                          onChange={(e) => setEmpPassword(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[13px] font-semibold"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0b3178] hover:bg-[#072457] text-white py-3 rounded-xl font-bold text-[13px] shadow-md transition duration-200 cursor-pointer mt-2"
                    >
                      Add Employee
                    </button>
                  </form>
                </div>

                {/* Employees List */}
                <div className="lg:col-span-2 bg-white border border-slate-100 p-6 rounded-3xl shadow-xs space-y-4">
                  <h3 className="text-xs font-black text-[#091E42] uppercase tracking-widest pb-2 border-b border-slate-50 flex items-center gap-1.5">
                    <Users size={14} className="text-[#0b3178]" /> Active Employees ({employees.length})
                  </h3>

                  {employees.length > 0 ? (
                    <div className="overflow-x-auto rounded-2xl border border-slate-100">
                      <table className="w-full text-left border-collapse text-xs text-slate-700 bg-white">
                        <thead>
                          <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <th className="px-4 py-3.5">ID</th>
                            <th className="px-4 py-3.5">Employee Name</th>
                            <th className="px-4 py-3.5">Contact Details</th>
                            <th className="px-4 py-3.5">Credentials</th>
                            <th className="px-4 py-3.5 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold">
                          {employees.map((emp) => (
                            <tr key={emp.id} className="hover:bg-slate-50/30 transition duration-150">
                              <td className="px-4 py-3 text-slate-900 font-black">{emp.id}</td>
                              <td className="px-4 py-3">
                                <div className="text-slate-900 font-black">{emp.name}</div>
                                <div className="text-[10px] text-slate-450 mt-0.5 max-w-[150px] truncate" title={emp.address}>
                                  <span className="flex items-center gap-1"><MapPin size={10} className="shrink-0" /> {emp.address || 'No Address'}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 space-y-0.5 text-slate-600">
                                <div className="flex items-center gap-1"><Phone size={10} className="text-slate-400" /> {emp.mobile || 'N/A'}</div>
                                <div className="flex items-center gap-1 text-[10.5px] text-slate-500">{emp.email || 'N/A'}</div>
                              </td>
                              <td className="px-4 py-3">
                                <div><span className="text-[10px] text-slate-400 font-bold uppercase mr-1">User:</span> <code className="bg-slate-50 px-1.5 py-0.5 rounded text-[#0b3178] font-mono">{emp.loginId}</code></div>
                                <div className="mt-1"><span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Pass:</span> <code className="bg-slate-50 px-1.5 py-0.5 rounded font-mono">{emp.password}</code></div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  onClick={() => handleDeleteEmployee(emp.id)}
                                  className="text-slate-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition duration-150 cursor-pointer"
                                  title="Delete Employee"
                                  disabled={emp.id === 'EMP-101'}
                                  style={{ opacity: emp.id === 'EMP-101' ? 0.35 : 1, cursor: emp.id === 'EMP-101' ? 'not-allowed' : 'pointer' }}
                                >
                                  <Trash2 size={15} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-400 font-bold text-xs select-none">
                      No employees registered yet.
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-5 text-center select-none text-[11px] font-extrabold text-slate-400 tracking-wider uppercase">
        KENT Admin Control Panel © 2026. Powered by Kent RO Systems.
      </footer>

    </div>
  );
}
