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
  Users,
  TrendingUp,
  Bell,
  Settings,
  ChevronRight,
  Package,
  ClipboardList,
  ExternalLink,
  Eye,
  EyeOff,
  Search,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  RefreshCw,
  Key,
  Pencil,
  Star,
} from 'lucide-react';
import { getFullCatalog } from '../catalogData';

// ─── Reusable input style ────────────────────────────────────────────────────
const inputCls =
  'w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 focus:outline-none text-[13px] font-semibold text-slate-700 transition-all placeholder:text-slate-400';

// ─── Status badge helper ──────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Finished: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'In Discussion': 'bg-sky-50 text-sky-700 border-sky-200',
    Sell: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  };
  const cls = map[status] || 'bg-slate-50 text-slate-600 border-slate-200';
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

// ─── Sidebar nav item ─────────────────────────────────────────────────────────
function NavItem({ icon: Icon, label, badge, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13.5px] font-bold transition-all duration-150 cursor-pointer ${
        active
          ? 'bg-[#1D4ED8] text-white shadow-lg shadow-blue-900/40'
          : 'text-slate-400 hover:bg-white/8 hover:text-white'
      }`}
      style={!active ? { '--tw-bg-opacity': 1 } : {}}
    >
      <Icon size={17} className={active ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'} />
      <span className="flex-1 text-left">{label}</span>
      {badge !== undefined && (
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
          active ? 'bg-white/25 text-white' : 'bg-white/10 text-slate-400'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ title, value, icon: Icon, color, sub }) {
  const colorMap = {
    blue:    { bg: 'bg-blue-50',    text: 'text-[#1D4ED8]',   icon: 'text-[#1D4ED8]',   val: 'text-[#1D4ED8]' },
    amber:   { bg: 'bg-amber-50',   text: 'text-amber-700',   icon: 'text-amber-600',   val: 'text-amber-700' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'text-emerald-600', val: 'text-emerald-700' },
    violet:  { bg: 'bg-violet-50',  text: 'text-violet-700',  icon: 'text-violet-600',  val: 'text-violet-700' },
    rose:    { bg: 'bg-rose-50',    text: 'text-rose-700',    icon: 'text-rose-600',    val: 'text-rose-700' },
  };
  const c = colorMap[color] || colorMap.blue;
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-start justify-between shadow-sm hover:shadow-md transition-shadow duration-200 group">
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{title}</p>
        <p className={`text-3xl font-black ${c.val}`}>{value}</p>
        {sub && <p className="text-[11px] text-slate-400 font-semibold mt-1">{sub}</p>}
      </div>
      <div className={`${c.bg} p-3 rounded-xl ${c.icon} group-hover:scale-110 transition-transform duration-200`}>
        <Icon size={22} />
      </div>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-black text-slate-800 tracking-tight">{title}</h2>
      {subtitle && <p className="text-[12px] text-slate-400 font-semibold mt-1">{subtitle}</p>}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ icon: Icon, message, action, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
        <Icon size={28} className="text-slate-400" />
      </div>
      <p className="text-slate-500 font-bold text-sm mb-1">{message}</p>
      {action && (
        <button onClick={onAction} className="text-[#1D4ED8] text-xs font-black hover:underline mt-1 cursor-pointer">
          {action} →
        </button>
      )}
    </div>
  );
}

// ─── Table wrapper ────────────────────────────────────────────────────────────
function DataTable({ headers, children }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white">
      <table className="w-full text-left border-collapse text-xs text-slate-700">
        <thead>
          <tr className="border-b border-slate-100 bg-[#F8FAFC]">
            {headers.map((h) => (
              <th key={h} className="px-5 py-3.5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 font-semibold">{children}</tbody>
      </table>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════════════
export default function AdminView({ onBackToHome }) {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    () => sessionStorage.getItem('kentro-admin') === 'true'
  );
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState('');

  // ── Navigation ────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('overview');

  // ── Product form ──────────────────────────────────────────────────────────
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
  const [imageMode, setImageMode] = useState('url');
  const fileInputRef = useRef(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [warranty, setWarranty] = useState('');
  const [guarantee, setGuarantee] = useState('');

  // ── Data ──────────────────────────────────────────────────────────────────
  const [customProducts, setCustomProducts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [serviceBookings, setServiceBookings] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [demoBookings, setDemoBookings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Water Purifiers');
  const [demoStatusFilter, setDemoStatusFilter] = useState('all');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('all');
  const [toast, setToast] = useState(null);
  const toastTimeoutRef = useRef(null);
  const showToast = (message, type = 'success') => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // ── Employee form ─────────────────────────────────────────────────────────
  const [empName, setEmpName] = useState('');
  const [empAddress, setEmpAddress] = useState('');
  const [empMobile, setEmpMobile] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empLoginId, setEmpLoginId] = useState('');
  const [empPassword, setEmpPassword] = useState('');
  const [empSpecialization, setEmpSpecialization] = useState('General');
  const [empStatus, setEmpStatus] = useState('Active');
  const [empSuccess, setEmpSuccess] = useState(false);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  // ── Offer form ────────────────────────────────────────────────────────────
  const [offers, setOffers] = useState([]);
  const [offerCode, setOfferCode] = useState('');
  const [offerTitle, setOfferTitle] = useState('');
  const [offerDescription, setOfferDescription] = useState('');
  const [offerType, setOfferType] = useState('Percentage');
  const [offerValue, setOfferValue] = useState('');
  const [offerApplicableTo, setOfferApplicableTo] = useState('all');
  const [offerStatus, setOfferStatus] = useState('Active');
  const [isAddOfferModalOpen, setIsAddOfferModalOpen] = useState(false);
  const [editingOfferId, setEditingOfferId] = useState(null);
  const [offerSuccess, setOfferSuccess] = useState(false);

  const [allProductsList, setAllProductsList] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  // ── Load catalog list ─────────────────────────────────────────────────────
  useEffect(() => {
    try {
      const catalog = getFullCatalog();
      const list = [];
      Object.values(catalog).forEach((arr) =>
        arr.forEach((p) => { if (!list.includes(p.name)) list.push(p.name); })
      );
      setAllProductsList(list);
    } catch (e) {
      console.error('Error loading catalog list:', e);
    }
  }, [customProducts]);

  // ── Load / sync localStorage ──────────────────────────────────────────────
  useEffect(() => {
    const reloadBookings = () => {
      try {
        const s = localStorage.getItem('kentro-service-bookings');
        if (s) setServiceBookings(JSON.parse(s));
      } catch (e) { console.error(e); }
    };

    const reloadDemos = () => {
      try {
        const sd = localStorage.getItem('kentro-demo-bookings');
        if (sd) setDemoBookings(JSON.parse(sd));
      } catch (e) { console.error(e); }
    };

    try {
      const s1 = localStorage.getItem('kentro-custom-products');
      if (s1) setCustomProducts(JSON.parse(s1));
      const s2 = localStorage.getItem('kentro-enquiries');
      if (s2) setEnquiries(JSON.parse(s2));
      reloadBookings();
      reloadDemos();
      const s4 = localStorage.getItem('kentro-employees');
      if (s4) {
        setEmployees(JSON.parse(s4));
      } else {
        const seed = [{
          id: 'EMP-101', name: 'Rajesh Kumar', mobile: '9876543210',
          email: 'rajesh@kentro.in', address: 'Sector 62, Noida, UP',
          loginId: 'rajesh', password: 'password123'
        }];
        localStorage.setItem('kentro-employees', JSON.stringify(seed));
        setEmployees(seed);
      }
      const sOffers = localStorage.getItem('kentro-offers');
      if (sOffers) setOffers(JSON.parse(sOffers));
    } catch (e) { console.error('Error loading data:', e); }

    const onChange = (e) => {
      try {
        if (e.key === 'kentro-custom-products')       setCustomProducts(e.newValue ? JSON.parse(e.newValue) : []);
        else if (e.key === 'kentro-enquiries')         setEnquiries(e.newValue ? JSON.parse(e.newValue) : []);
        else if (e.key === 'kentro-service-bookings')  setServiceBookings(e.newValue ? JSON.parse(e.newValue) : []);
        else if (e.key === 'kentro-employees')         setEmployees(e.newValue ? JSON.parse(e.newValue) : []);
        else if (e.key === 'kentro-demo-bookings')     setDemoBookings(e.newValue ? JSON.parse(e.newValue) : []);
        else if (e.key === 'kentro-offers')            setOffers(e.newValue ? JSON.parse(e.newValue) : []);
      } catch (err) { console.error(err); }
    };

    window.addEventListener('storage', onChange);
    window.addEventListener('kentro-service-bookings-updated', reloadBookings);
    window.addEventListener('kentro-demo-bookings-updated', reloadDemos);
    return () => {
      window.removeEventListener('storage', onChange);
      window.removeEventListener('kentro-service-bookings-updated', reloadBookings);
      window.removeEventListener('kentro-demo-bookings-updated', reloadDemos);
    };
  }, []);

  // ── Category map ──────────────────────────────────────────────────────────
  const categorySubcategories = {
    'Water Purifiers': ['RO Purifiers', 'Hydrogen Rich Water', 'UV Purifiers', 'Gravity Purifiers', 'Commercial Purifier'],
    'Water Softeners': ['Bathroom Softeners', 'Washing Machine Softeners', 'Automatic Softeners'],
    'Kitchen Appliances': ['Air Fryers', 'Cold Pressed Juicers', 'Bread Makers', 'Multi Cookers'],
    'Home Appliances': ['Air Purifiers', 'Vacuum Cleaners', 'Vegetable Cleaners'],
    'New Energy': ['Solar Panels', 'Solar Inverters'],
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategory(val);
    setSubCategory(categorySubcategories[val][0]);
  };

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (adminId === 'admin' && adminPassword === 'admin123') {
      sessionStorage.setItem('kentro-admin', 'true');
      setIsAdminLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Hint: admin / admin123');
    }
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!prodId.trim() || !prodName.trim() || !price || !basePrice) {
      showToast('Please fill all required fields.', 'warning');
      return;
    }

    const newProd = {
      id: prodId.trim().toLowerCase().replace(/\s+/g, '-'),
      name: prodName.trim(), price: parseFloat(price), basePrice: parseFloat(basePrice),
      specs: specs.trim() || tech.trim(), desc: desc.trim(),
      features: features ? features.split(',').map((f) => f.trim()) : [],
      color: colors ? colors.split(',').map((c) => c.trim()) : ['White'],
      installType, tech: tech.trim() || specs.trim(),
      roFeatures: roFeatures ? roFeatures.split(',').map((b) => b.trim()) : [],
      category, subCategory, image: imagePreview || imageUrl.trim() || null,
      warranty: warranty.trim() || null, guarantee: guarantee.trim() || null,
    };

    if (editingProductId) {
      const exists = customProducts.some((p) => p.id === editingProductId);
      const updated = exists
        ? customProducts.map((p) => (p.id === editingProductId ? newProd : p))
        : [...customProducts, newProd];
      try {
        localStorage.setItem('kentro-custom-products', JSON.stringify(updated));
        setCustomProducts(updated);
        setEditingProductId(null);
        setProdId(''); setProdName(''); setPrice(''); setBasePrice(''); setSpecs('');
        setDesc(''); setFeatures(''); setColors('White'); setTech(''); setRoFeatures('');
        setImageUrl(''); setImagePreview(null); setImageMode('url'); setWarranty(''); setGuarantee('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        showToast('Product updated successfully!');
        setActiveTab('manage');
      } catch (err) {
        console.error(err);
        showToast('Failed to update product — image may be too large.', 'error');
      }
    } else {
      const updated = [...customProducts, newProd];
      try {
        localStorage.setItem('kentro-custom-products', JSON.stringify(updated));
        setCustomProducts(updated);
        setProdId(''); setProdName(''); setPrice(''); setBasePrice(''); setSpecs('');
        setDesc(''); setFeatures(''); setColors('White'); setTech(''); setRoFeatures('');
        setImageUrl(''); setImagePreview(null); setImageMode('url'); setWarranty(''); setGuarantee('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        setFormSuccess(true);
        setTimeout(() => setFormSuccess(false), 3500);
      } catch (err) {
        console.error(err);
        showToast('Failed to save — image may be too large.', 'error');
      }
    }
  };

  const handleStartEditProduct = (p) => {
    setEditingProductId(p.id);
    setProdId(p.id);
    setProdName(p.name);
    setPrice(p.price.toString());
    setBasePrice(p.basePrice.toString());
    setSpecs(p.specs || '');
    setInstallType(p.installType || 'Wall Mounted');
    setDesc(p.desc || '');
    setFeatures(p.features ? p.features.join(', ') : '');
    setColors(p.color ? p.color.join(', ') : 'White');
    setTech(p.tech || '');
    setRoFeatures(p.roFeatures ? p.roFeatures.join(', ') : '');
    setCategory(p.category || 'Water Purifiers');
    setSubCategory(p.subCategory || '');
    setImageUrl(p.image && p.image.startsWith('http') ? p.image : '');
    setImagePreview(p.image || null);
    setImageMode(p.image && p.image.startsWith('http') ? 'url' : 'upload');
    setWarranty(p.warranty || '');
    setGuarantee(p.guarantee || '');
    setActiveTab('add');
  };

  const handleCancelEditProduct = () => {
    setEditingProductId(null);
    setProdId(''); setProdName(''); setPrice(''); setBasePrice(''); setSpecs('');
    setDesc(''); setFeatures(''); setColors('White'); setTech(''); setRoFeatures('');
    setImageUrl(''); setImagePreview(null); setImageMode('url'); setWarranty(''); setGuarantee('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setActiveTab('manage');
  };

  const handleDeleteProduct = (id) => {
    const u = customProducts.filter((p) => p.id !== id);
    setCustomProducts(u);
    localStorage.setItem('kentro-custom-products', JSON.stringify(u));
  };

  const handleDeleteEnquiry = (id) => {
    const u = enquiries.filter((e) => e.id !== id);
    setEnquiries(u);
    localStorage.setItem('kentro-enquiries', JSON.stringify(u));
  };

  const handleUpdateEnquiryStatus = (id, newStatus) => {
    const u = enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e));
    setEnquiries(u);
    localStorage.setItem('kentro-enquiries', JSON.stringify(u));
  };

  const handleDeleteBooking = (id) => {
    const u = serviceBookings.filter((b) => b.id !== id);
    setServiceBookings(u);
    localStorage.setItem('kentro-service-bookings', JSON.stringify(u));
    window.dispatchEvent(new Event('kentro-service-bookings-updated'));
  };

  const handleUpdateBookingStatus = (id, newStatus) => {
    const u = serviceBookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
    setServiceBookings(u);
    localStorage.setItem('kentro-service-bookings', JSON.stringify(u));
    window.dispatchEvent(new Event('kentro-service-bookings-updated'));
  };

  const handleUpdateServiceAssignment = (id, fieldName, value) => {
    const u = serviceBookings.map((b) => (b.id === id ? { ...b, [fieldName]: value } : b));
    setServiceBookings(u);
    localStorage.setItem('kentro-service-bookings', JSON.stringify(u));
    window.dispatchEvent(new Event('kentro-service-bookings-updated'));
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!empName.trim() || !empLoginId.trim() || !empPassword.trim()) {
      alert('Name, Login ID and Password are required.');
      return;
    }

    if (editingEmployeeId) {
      // Update Mode
      if (employees.some((emp) => emp.id !== editingEmployeeId && emp.loginId.toLowerCase() === empLoginId.trim().toLowerCase())) {
        alert('Login ID already taken by another technician.');
        return;
      }
      const updated = employees.map(emp => {
        if (emp.id === editingEmployeeId) {
          return {
            ...emp,
            name: empName.trim(),
            mobile: empMobile.trim(),
            email: empEmail.trim(),
            address: empAddress.trim(),
            loginId: empLoginId.trim(),
            password: empPassword.trim(),
            specialization: empSpecialization,
            status: empStatus,
          };
        }
        return emp;
      });
      setEmployees(updated);
      localStorage.setItem('kentro-employees', JSON.stringify(updated));
      setEditingEmployeeId(null);
    } else {
      // Create Mode
      if (employees.some((emp) => emp.loginId.toLowerCase() === empLoginId.trim().toLowerCase())) {
        alert('Login ID already taken.');
        return;
      }
      const newEmp = {
        id: 'EMP-' + Math.floor(100 + Math.random() * 900),
        name: empName.trim(), mobile: empMobile.trim(), email: empEmail.trim(),
        address: empAddress.trim(), loginId: empLoginId.trim(), password: empPassword.trim(),
        specialization: empSpecialization, status: empStatus,
      };
      const u = [...employees, newEmp];
      setEmployees(u);
      localStorage.setItem('kentro-employees', JSON.stringify(u));
    }

    setEmpName(''); setEmpAddress(''); setEmpMobile(''); setEmpEmail('');
    setEmpLoginId(''); setEmpPassword(''); setEmpSpecialization('General'); setEmpStatus('Active');
    setEmpSuccess(true);
    setIsAddEmployeeModalOpen(false);
    setTimeout(() => setEmpSuccess(false), 3550);
  };

  const handleDeleteEmployee = (id) => {
    const u = employees.filter((emp) => emp.id !== id);
    setEmployees(u);
    localStorage.setItem('kentro-employees', JSON.stringify(u));
  };

  const handleToggleEmployeeStatus = (id) => {
    const updated = employees.map(emp => {
      if (emp.id === id) {
        const nextStatus = emp.status === 'Active' ? 'Inactive' : 'Active';
        return { ...emp, status: nextStatus };
      }
      return emp;
    });
    setEmployees(updated);
    localStorage.setItem('kentro-employees', JSON.stringify(updated));
  };

  const handleStartEditEmployee = (emp) => {
    setEditingEmployeeId(emp.id);
    setEmpName(emp.name);
    setEmpAddress(emp.address || '');
    setEmpMobile(emp.mobile || '');
    setEmpEmail(emp.email || '');
    setEmpLoginId(emp.loginId);
    setEmpPassword(emp.password);
    setEmpSpecialization(emp.specialization || 'General');
    setEmpStatus(emp.status || 'Active');
    setIsAddEmployeeModalOpen(true);
  };

  // ── Offer Handlers ────────────────────────────────────────────────────────
  const handleAddOffer = (e) => {
    e.preventDefault();
    if (!offerCode.trim() || !offerTitle.trim() || !offerValue) {
      alert('Code, Title and Value are required.');
      return;
    }

    if (editingOfferId) {
      // Update Mode
      const updated = offers.map(off => {
        if (off.id === editingOfferId) {
          return {
            ...off,
            code: offerCode.trim().toUpperCase(),
            title: offerTitle.trim(),
            description: offerDescription.trim(),
            type: offerType,
            value: Number(offerValue),
            applicableTo: offerApplicableTo,
            status: offerStatus,
          };
        }
        return off;
      });
      setOffers(updated);
      localStorage.setItem('kentro-offers', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      setEditingOfferId(null);
    } else {
      // Create Mode
      if (offers.some((off) => off.code.toLowerCase() === offerCode.trim().toLowerCase())) {
        alert('An offer with this code already exists.');
        return;
      }
      const newOffer = {
        id: 'OFF-' + Math.floor(100 + Math.random() * 900),
        code: offerCode.trim().toUpperCase(),
        title: offerTitle.trim(),
        description: offerDescription.trim(),
        type: offerType,
        value: Number(offerValue),
        applicableTo: offerApplicableTo,
        status: offerStatus,
      };
      const u = [...offers, newOffer];
      setOffers(u);
      localStorage.setItem('kentro-offers', JSON.stringify(u));
      window.dispatchEvent(new Event('storage'));
    }

    // Reset Form
    setOfferCode('');
    setOfferTitle('');
    setOfferDescription('');
    setOfferType('Percentage');
    setOfferValue('');
    setOfferApplicableTo('all');
    setOfferStatus('Active');
    setOfferSuccess(true);
    setIsAddOfferModalOpen(false);
    setTimeout(() => setOfferSuccess(false), 3500);
  };

  const handleDeleteOffer = (id) => {
    const u = offers.filter((off) => off.id !== id);
    setOffers(u);
    localStorage.setItem('kentro-offers', JSON.stringify(u));
    window.dispatchEvent(new Event('storage'));
  };

  const handleToggleOfferStatus = (id) => {
    const updated = offers.map(off => {
      if (off.id === id) {
        const nextStatus = off.status === 'Active' ? 'Inactive' : 'Active';
        return { ...off, status: nextStatus };
      }
      return off;
    });
    setOffers(updated);
    localStorage.setItem('kentro-offers', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleStartEditOffer = (off) => {
    setEditingOfferId(off.id);
    setOfferCode(off.code);
    setOfferTitle(off.title);
    setOfferDescription(off.description || '');
    setOfferType(off.type);
    setOfferValue(off.value);
    setOfferApplicableTo(off.applicableTo);
    setOfferStatus(off.status);
    setIsAddOfferModalOpen(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('kentro-admin');
    setIsAdminLoggedIn(false);
  };

  const totalProductsCount = customProducts.length;
  const countByCategory = customProducts.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});
  const pendingBookings = serviceBookings.filter((b) => b.status === 'Pending').length;

  const handleDeleteDemoBooking = (id) => {
    const u = demoBookings.filter((d) => d.id !== id);
    setDemoBookings(u);
    localStorage.setItem('kentro-demo-bookings', JSON.stringify(u));
  };

  const handleUpdateDemoStatus = (id, newStatus) => {
    const u = demoBookings.map((d) => (d.id === id ? { ...d, status: newStatus } : d));
    setDemoBookings(u);
    localStorage.setItem('kentro-demo-bookings', JSON.stringify(u));
  };

  // ─────────────────────────────────────────────────────────────────────────
  // LOGIN SCREEN
  // ─────────────────────────────────────────────────────────────────────────
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E3A5F] to-[#0F172A] flex items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-[420px] relative z-10">
          {/* Back button */}
          <button
            onClick={onBackToHome}
            className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Storefront
          </button>

          {/* Card */}
          <div className="bg-white/[0.04] backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1D4ED8] to-[#3B82F6] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-3">
                  <span className="text-white font-black text-xl tracking-wide">K</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#0F172A]" />
              </div>
              <h1 className="text-white font-black text-2xl tracking-tight">KENT Admin</h1>
              <p className="text-slate-400 text-[12px] font-semibold mt-1">Control Panel — Restricted Access</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                  Admin ID
                </label>
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="Enter admin ID"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#3B82F6] focus:bg-white/10 focus:outline-none text-[13.5px] font-semibold text-white placeholder-slate-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl focus:border-[#3B82F6] focus:bg-white/10 focus:outline-none text-[13.5px] font-semibold text-white placeholder-slate-500 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="flex items-center gap-2 bg-rose-950/30 border border-rose-800/40 text-rose-400 text-xs font-bold px-4 py-3 rounded-xl">
                  <AlertCircle size={14} className="shrink-0" />
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#2563EB] text-white py-3.5 rounded-xl font-extrabold text-[14px] shadow-lg shadow-blue-500/25 transition-all duration-200 cursor-pointer mt-2 transform active:scale-[0.98]"
              >
                Sign In to Dashboard
              </button>
            </form>
          </div>

          <p className="text-center text-slate-600 text-[11px] font-bold mt-6 uppercase tracking-widest">
            KENT House of Purity © 2026
          </p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // DASHBOARD
  // ─────────────────────────────────────────────────────────────────────────
  const navItems = [
    { id: 'overview',   label: 'Dashboard',         icon: LayoutDashboard },
    { id: 'add',        label: 'Add Product',        icon: PlusCircle },
    { id: 'manage',     label: 'Products',           icon: Package,        badge: totalProductsCount },
    { id: 'offers',     label: 'Offers',             icon: Tag,            badge: offers.length },
    { id: 'demo',       label: 'Demo Bookings',      icon: ClipboardList,  badge: demoBookings.length },
    { id: 'enquiries',  label: 'Product Enquiries',  icon: Mail,           badge: enquiries.length },
    { id: 'services',   label: 'Service Requests',   icon: Wrench,         badge: serviceBookings.length },
    { id: 'employees',  label: 'Employees',          icon: Users,          badge: employees.length },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-sans text-slate-800 select-none" style={{ fontFamily: 'inherit' }}>

      {/* ── Fixed Left Sidebar ─────────────────────────────────────────────── */}
      <aside className="fixed left-0 top-0 h-full w-64 flex flex-col z-20" style={{ background: '#0F172A' }}>
        {/* Logo */}
        <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={onBackToHome}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0" style={{ background: 'linear-gradient(135deg,#1D4ED8,#60A5FA)', boxShadow: '0 4px 15px rgba(29,78,216,0.4)' }}>
              <span className="text-white font-black text-base">K</span>
            </div>
            <div>
              <p className="font-black text-white text-[14px] leading-none tracking-wide">KENT</p>
              <p className="text-[10px] font-semibold mt-0.5" style={{ color: 'rgba(148,163,184,0.8)' }}>Admin Control Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          <p className="text-[9px] font-black uppercase tracking-widest px-4 mb-3" style={{ color: 'rgba(100,116,139,0.9)' }}>Main Menu</p>
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}

          <div className="pt-5 mt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[9px] font-black uppercase tracking-widest px-4 mb-3" style={{ color: 'rgba(100,116,139,0.9)' }}>Quick Links</p>
            <button
              onClick={onBackToHome}
              className="group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all cursor-pointer"
              style={{ color: 'rgba(148,163,184,0.8)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(148,163,184,0.8)'; }}
            >
              <ExternalLink size={15} style={{ color: 'rgba(100,116,139,0.8)' }} />
              View Storefront
            </button>
          </div>
        </nav>

        {/* Admin info + logout */}
        <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,#1D4ED8,#60A5FA)' }}>
              <span className="text-white font-black text-xs">A</span>
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-black text-white leading-none">Admin</p>
              <p className="text-[10px] font-semibold mt-0.5 truncate" style={{ color: 'rgba(148,163,184,0.7)' }}>admin@kentro.in</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-[12.5px] transition-all cursor-pointer"
            style={{ color: 'rgba(248,113,113,0.85)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#f87171'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(248,113,113,0.85)'; }}
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content area (offset by sidebar) ─────────────────────────── */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">

        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-black text-slate-800 capitalize">
              {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <p className="text-[11px] text-slate-400 font-semibold">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {pendingBookings > 0 && (
              <div className="relative">
                <div className="w-9 h-9 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center text-amber-600">
                  <Bell size={16} />
                </div>
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {pendingBookings}
                </span>
              </div>
            )}
            <div className="w-9 h-9 bg-gradient-to-br from-[#1D4ED8] to-[#60A5FA] rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-200">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 px-8 py-8">

          {/* ── Overview ──────────────────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Welcome banner */}
              <div className="relative bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] rounded-3xl p-7 overflow-hidden shadow-xl shadow-blue-200">
                <div className="absolute right-0 top-0 w-64 h-full opacity-10">
                  <div className="absolute -right-8 -top-8 w-48 h-48 bg-white rounded-full" />
                  <div className="absolute -right-4 -bottom-8 w-32 h-32 bg-white rounded-full" />
                </div>
                <div className="relative z-10">
                  <p className="text-blue-200 text-[12px] font-bold mb-1">Welcome back 👋</p>
                  <h2 className="text-white font-black text-2xl tracking-tight mb-1">KENT Admin Dashboard</h2>
                  <p className="text-blue-200 text-[13px] font-semibold">
                    Manage enquiries, service bookings, products and your team.
                  </p>
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard title="Custom Products" value={totalProductsCount} icon={Package} color="blue" sub="In catalog" />
                <StatCard title="Demo Bookings" value={demoBookings.length} icon={ClipboardList} color="rose" sub="Free demos" />
                <StatCard title="Service Requests" value={serviceBookings.length} icon={Wrench} color="violet" sub={`${pendingBookings} pending`} />
                <StatCard title="Active Staff" value={employees.length} icon={Users} color="emerald" sub="Registered" />
              </div>

              {/* Two-panel row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Recent enquiries */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-slate-800 text-sm flex items-center gap-2">
                      <Mail size={15} className="text-amber-500" />
                      Recent Enquiries
                    </h3>
                    <button onClick={() => setActiveTab('enquiries')} className="text-[11px] font-black text-[#1D4ED8] hover:underline cursor-pointer flex items-center gap-1">
                      View All <ChevronRight size={12} />
                    </button>
                  </div>
                  {enquiries.length > 0 ? (
                    <div className="space-y-3">
                      {enquiries.slice(-4).reverse().map((e) => (
                        <div key={e.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                          <div>
                            <p className="text-[13px] font-extrabold text-slate-800">{e.name}</p>
                            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{e.productName}</p>
                          </div>
                          <StatusBadge status={e.status || 'Pending'} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400 font-bold text-xs">No enquiries yet.</div>
                  )}
                </div>

                {/* Recent service bookings */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-slate-800 text-sm flex items-center gap-2">
                      <Wrench size={15} className="text-violet-500" />
                      Recent Bookings
                    </h3>
                    <button onClick={() => setActiveTab('services')} className="text-[11px] font-black text-[#1D4ED8] hover:underline cursor-pointer flex items-center gap-1">
                      View All <ChevronRight size={12} />
                    </button>
                  </div>
                  {serviceBookings.length > 0 ? (
                    <div className="space-y-3">
                      {serviceBookings.slice(-4).reverse().map((b) => (
                        <div key={b.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                          <div>
                            <p className="text-[13px] font-extrabold text-slate-800">{b.name}</p>
                            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{b.serviceType}</p>
                          </div>
                          <StatusBadge status={b.status} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400 font-bold text-xs">No bookings yet.</div>
                  )}
                </div>

              </div>

              {/* Category breakdown */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <h3 className="font-black text-slate-800 text-sm mb-4 flex items-center gap-2">
                  <Tag size={15} className="text-[#1D4ED8]" />
                  Catalog by Category
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {Object.keys(categorySubcategories).map((cat) => {
                    const count = countByCategory[cat] || 0;
                    return (
                      <div key={cat} className="bg-[#F8FAFC] border border-slate-100 rounded-xl px-4 py-3 text-center">
                        <p className="text-2xl font-black text-[#1D4ED8]">{count}</p>
                        <p className="text-[10px] text-slate-500 font-bold mt-0.5 leading-tight">{cat}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── Add Product ────────────────────────────────────────────────── */}
          {activeTab === 'add' && (
            <div className="max-w-4xl">
              <SectionHeader 
                title={editingProductId ? "Edit Product" : "Add New Product"} 
                subtitle={editingProductId ? `Modify details for product: ${prodName}` : "Publish a new product into the live storefront catalog."} 
              />

              {formSuccess && (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] font-extrabold px-5 py-4 rounded-2xl mb-6 shadow-sm">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  Product published successfully to the catalog!
                </div>
              )}

              <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <form onSubmit={handleAddProductSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Category *</label>
                      <select value={category} onChange={handleCategoryChange} className={inputCls}>
                        {Object.keys(categorySubcategories).map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Subcategory *</label>
                      <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className={inputCls}>
                        {categorySubcategories[category].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Product ID *</label>
                      <input type="text" required placeholder="e.g. kent-prime-smart" value={prodId} onChange={(e) => setProdId(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Product Name *</label>
                      <input type="text" required placeholder="e.g. KENT Prime Smart RO" value={prodName} onChange={(e) => setProdName(e.target.value)} className={inputCls} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Offer Price (₹) *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                        <input type="number" required placeholder="17499" value={price} onChange={(e) => setPrice(e.target.value)} className={`${inputCls} pl-8`} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">MRP Price (₹) *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                        <input type="number" required placeholder="21000" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} className={`${inputCls} pl-8`} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Specs</label>
                      <input type="text" placeholder="e.g. RO + UV + UF + TDS Control" value={specs} onChange={(e) => setSpecs(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Install Type</label>
                      <select value={installType} onChange={(e) => setInstallType(e.target.value)} className={inputCls}>
                        <option>Wall Mounted</option>
                        <option>Counter Top</option>
                        <option>Under The Counter</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                    <textarea rows={3} placeholder="Detailed product description..." value={desc} onChange={(e) => setDesc(e.target.value)} className={`${inputCls} resize-none`} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Features (comma-separated)</label>
                      <input type="text" placeholder="e.g. 9L Tank, Smart Display" value={features} onChange={(e) => setFeatures(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Colors (comma-separated)</label>
                      <input type="text" placeholder="e.g. White, Black" value={colors} onChange={(e) => setColors(e.target.value)} className={inputCls} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Technology</label>
                      <input type="text" placeholder="e.g. RO + UV + UF" value={tech} onChange={(e) => setTech(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Key Badges (comma-separated)</label>
                      <input type="text" placeholder="e.g. Best Selling, Zero Wastage" value={roFeatures} onChange={(e) => setRoFeatures(e.target.value)} className={inputCls} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Warranty</label>
                      <input type="text" placeholder="e.g. 1 Year Warranty" value={warranty} onChange={(e) => setWarranty(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Guarantee</label>
                      <input type="text" placeholder="e.g. 3 Years Free Service" value={guarantee} onChange={(e) => setGuarantee(e.target.value)} className={inputCls} />
                    </div>
                  </div>

                  {/* Image section */}
                  <div className="border-t border-slate-100 pt-5">
                    <label className="block text-[10px] font-extrabold text-[#1D4ED8] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <ImagePlus size={14} /> Product Image
                    </label>
                    <div className="flex gap-2 mb-4">
                      {[{ id: 'url', icon: Link2, label: 'Paste URL' }, { id: 'upload', icon: Upload, label: 'Upload File' }].map((m) => (
                        <button key={m.id} type="button" onClick={() => setImageMode(m.id)}
                          className={`flex items-center gap-1.5 text-[11.5px] font-extrabold px-4 py-2 rounded-xl border transition cursor-pointer ${imageMode === m.id ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'}`}>
                          <m.icon size={12} /> {m.label}
                        </button>
                      ))}
                    </div>

                    {imageMode === 'url' ? (
                      <input type="url" placeholder="https://example.com/product.png" value={imageUrl}
                        onChange={(e) => { setImageUrl(e.target.value); setImagePreview(e.target.value.trim() || null); }}
                        className={inputCls} />
                    ) : (
                      <div onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={(e) => {
                          e.preventDefault(); e.stopPropagation();
                          const file = e.dataTransfer.files?.[0];
                          if (file) {
                            if (file.size > 5 * 1024 * 1024) { showToast('Image size cannot exceed 5MB.', 'error'); return; }
                            if (file.type.startsWith('image/')) {
                              const r = new FileReader();
                              r.onload = (ev) => setImagePreview(ev.target.result);
                              r.readAsDataURL(file);
                            }
                          }
                        }}
                        className="w-full border-2 border-dashed border-slate-200 hover:border-[#1D4ED8]/40 rounded-2xl py-10 flex flex-col items-center justify-center text-center cursor-pointer transition bg-slate-50/50 hover:bg-blue-50/20">
                        <Upload size={24} className="text-slate-300 mb-2" />
                        <p className="text-[13px] font-extrabold text-slate-500">Click or drop image here</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 uppercase font-bold tracking-wide">PNG, JPG, WEBP · Max 5MB</p>
                      </div>
                    )}

                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) { showToast('Image size cannot exceed 5MB.', 'error'); if (fileInputRef.current) fileInputRef.current.value = ''; return; }
                          if (file.type.startsWith('image/')) {
                            const r = new FileReader();
                            r.onload = (ev) => setImagePreview(ev.target.result);
                            r.readAsDataURL(file);
                          }
                        }
                      }} />

                    {imagePreview && (
                      <div className="mt-4 inline-flex items-start gap-3">
                        <div className="relative">
                          <img src={imagePreview} alt="Preview" className="w-24 h-24 object-contain rounded-2xl border border-slate-150 bg-white p-2 shadow-sm" onError={(e) => { e.target.style.display = 'none'; }} />
                          <button type="button" onClick={() => { setImagePreview(null); setImageUrl(''); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center shadow cursor-pointer transition">
                            <X size={11} />
                          </button>
                        </div>
                        <span className="text-emerald-600 text-[11px] font-black mt-2">✓ Ready to publish</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button type="submit"
                      className="bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#2563EB] text-white font-extrabold text-[13px] tracking-wide px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer mt-2">
                      {editingProductId ? 'Update Product' : 'Publish to Catalog'}
                    </button>
                    {editingProductId && (
                      <button type="button" onClick={handleCancelEditProduct}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[13px] tracking-wide px-8 py-3.5 rounded-xl border border-slate-250 transition-all cursor-pointer mt-2">
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ── Manage Products ────────────────────────────────────────────── */}
          {activeTab === 'manage' && (
            <div>
              {(() => {
                const catalog = getFullCatalog();
                const allProducts = [];
                for (const [subCat, products] of Object.entries(catalog)) {
                  products.forEach((p) => {
                    allProducts.push({
                      ...p,
                      subCategory: subCat,
                    });
                  });
                }

                // Filter products based on selectedCategory
                const filteredProducts = allProducts.filter((p) => {
                  if (selectedCategory === 'Water Purifiers') {
                    return [
                      'RO Purifiers',
                      'Hydrogen Rich Water',
                      'UV Purifiers',
                      'Gravity Purifiers',
                      'Commercial Purifier',
                      'Bathroom Softeners',
                      'Washing Machine Softeners',
                      'Automatic Softeners',
                    ].includes(p.subCategory);
                  }
                  if (selectedCategory === 'Air Purifiers') {
                    return ['Air Purifiers'].includes(p.subCategory);
                  }
                  if (selectedCategory === 'Kitchen Appliances') {
                    return ['Air Fryers', 'Cold Pressed Juicers', 'Bread Makers', 'Multi Cookers'].includes(p.subCategory);
                  }
                  return true;
                });

                // Helper to get image
                const getProductImage = (p) => {
                  if (p.image) return p.image;
                  if (p.subCategory && p.subCategory.includes('Air')) {
                    return '/img-8.png';
                  }
                  return '/kent-sapphire-iot.png';
                };

                // Categories list for pills
                const categoryPills = ['Water Purifiers', 'Air Purifiers', 'Kitchen Appliances'];

                return (
                  <div>
                    {/* Header Row with Pills */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 text-left">
                      <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Products Catalog</h2>
                        <p className="text-[12px] text-slate-400 font-semibold mt-1">
                          {filteredProducts.length} products listed
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 select-none">
                        {categoryPills.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                              selectedCategory === cat
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-white text-slate-650 border border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((p) => {
                          const isCustom = customProducts.some((cp) => cp.id === p.id);
                          const discountPct = p.basePrice && p.price ? Math.round(((p.basePrice - p.price) / p.basePrice) * 100) : 0;
                          
                          // Determine dynamic category label display
                          let catDisplay = 'Water Purifiers';
                          if (p.subCategory && p.subCategory.includes('Air')) catDisplay = 'Air Purifiers';
                          else if (p.subCategory && ['Air Fryers', 'Cold Pressed Juicers', 'Bread Makers', 'Multi Cookers'].includes(p.subCategory)) catDisplay = 'Kitchen Appliances';

                          const badgeBg = catDisplay === 'Air Purifiers' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : (catDisplay === 'Kitchen Appliances' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100');

                          return (
                            <div key={p.id} className="bg-white rounded-3xl border border-slate-100 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between relative text-left">
                              
                              {/* Top Section with Image */}
                              <div>
                                <div className="w-full h-48 bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-4 relative border border-slate-100/50">
                                  {/* Category Badge */}
                                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-wider ${badgeBg}`}>
                                    {catDisplay}
                                  </span>

                                  <img
                                    src={getProductImage(p)}
                                    alt={p.name}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>

                                {/* ID and Name */}
                                <span className="text-[10px] text-slate-400 font-extrabold uppercase mt-4 block tracking-wider">
                                  ID: {p.id.toUpperCase()}
                                </span>
                                <h3 className="text-base font-black text-slate-800 tracking-tight mt-1 line-clamp-2 min-h-[3rem]">
                                  {p.name}
                                </h3>

                                {/* Rating */}
                                <div className="flex items-center gap-1.5 mt-2.5 text-xs font-semibold text-slate-500 select-none">
                                  <div className="flex items-center text-amber-500">
                                    <Star size={13} className="fill-current" />
                                  </div>
                                  <span className="font-extrabold text-slate-700">{p.rating || '4.5'}</span>
                                  <span className="text-slate-350">|</span>
                                  <span>{p.reviews || '0'} reviews</span>
                                </div>

                                {/* Features List */}
                                <ul className="mt-4 space-y-2 text-slate-500 text-[12px] font-semibold">
                                  {p.features && p.features.slice(0, 3).map((feat, idx) => (
                                    <li key={idx} className="flex items-start gap-1.5">
                                      <span className="text-blue-500 font-black">✦</span>
                                      <span className="line-clamp-1">{feat}</span>
                                    </li>
                                  ))}
                                  {(!p.features || p.features.length === 0) && (
                                    <li className="flex items-start gap-1.5">
                                      <span className="text-blue-500 font-black">✦</span>
                                      <span>{p.specs || 'Premium Specifications'}</span>
                                    </li>
                                  )}
                                </ul>
                              </div>

                              {/* Pricing & Footer Actions */}
                              <div className="flex items-center justify-between border-t border-slate-100 mt-5 pt-4">
                                <div>
                                  {p.basePrice > p.price && (
                                    <span className="text-xs text-slate-400 line-through block font-semibold">
                                      ₹{p.basePrice.toLocaleString('en-IN')}
                                    </span>
                                  )}
                                  <span className="text-lg font-black text-[#0b3178]">
                                    ₹{p.price.toLocaleString('en-IN')}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleStartEditProduct(p)}
                                    className="text-slate-500 hover:text-[#1D4ED8] hover:bg-slate-50 p-2 rounded-xl transition cursor-pointer border border-slate-200 shrink-0"
                                    title="Edit Product"
                                  >
                                    <Pencil size={14} />
                                  </button>
                                  {isCustom && (
                                    <button
                                      onClick={() => handleDeleteProduct(p.id)}
                                      className="text-rose-500 hover:bg-rose-50 p-2 rounded-xl transition cursor-pointer border border-rose-100 shrink-0"
                                      title="Delete custom product"
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  )}
                                  <a
                                    href={`/products/${p.id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3.5 py-2.5 rounded-xl transition flex items-center gap-1 shrink-0 select-none"
                                  >
                                    View Page <ExternalLink size={12} />
                                  </a>
                                </div>
                              </div>

                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mt-6">
                        <EmptyState
                          icon={Package}
                          message="No products found in this category."
                          action="Add a custom product"
                          onAction={() => setActiveTab('add')}
                        />
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* ── Enquiries ──────────────────────────────────────────────────── */}
          {activeTab === 'enquiries' && (
            <div>
              <SectionHeader title="Customer Enquiries" subtitle="Lead enquiries submitted by customers via the product pages." />
               {/* Status summary */}
              {enquiries.length > 0 && (
                <div className="flex gap-3 mb-6 flex-wrap select-none">
                  {[
                    { label: 'All',         color: 'bg-slate-100 text-slate-700 border-slate-300', value: 'all' },
                    { label: 'Pending',     color: 'bg-blue-50 text-blue-700 border-blue-200', value: 'Pending' },
                    { label: 'Contacted',   color: 'bg-amber-50 text-amber-700 border-amber-200', value: 'Contacted' },
                    { label: 'Closed',      color: 'bg-emerald-50 text-emerald-700 border-emerald-200', value: 'Closed' },
                  ].map(({ label, color, value }) => {
                    const count = value === 'all' ? enquiries.length : enquiries.filter((e) => (e.status || 'Pending') === value).length;
                    const isActive = enquiryStatusFilter === value;
                    
                    return (
                      <button
                        key={label}
                        onClick={() => setEnquiryStatusFilter(value)}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full border text-[12px] font-black transition cursor-pointer ${color} ${
                          isActive 
                            ? 'ring-2 ring-offset-2 ring-blue-500 opacity-100 scale-102 shadow-xs' 
                            : 'opacity-50 hover:opacity-85'
                        }`}
                      >
                        <span>{label}</span>
                        <span className="font-extrabold">{count}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Active Filter Helper text */}
              {enquiryStatusFilter !== 'all' && enquiries.length > 0 && (
                <div className="text-xs font-semibold text-slate-500 mb-4 text-left flex items-center gap-2">
                  <span>Showing only <strong>{enquiryStatusFilter}</strong> customer enquiries.</span>
                  <button
                    onClick={() => setEnquiryStatusFilter('all')}
                    className="text-[#1D4ED8] hover:underline cursor-pointer font-bold"
                  >
                    Reset Filter
                  </button>
                </div>
              )}

              {(() => {
                const displayedEnquiries = enquiryStatusFilter === 'all'
                  ? enquiries
                  : enquiries.filter((e) => (e.status || 'Pending') === enquiryStatusFilter);

                if (displayedEnquiries.length > 0) {
                  return (
                    <DataTable headers={['Customer', 'Mobile', 'Product', 'Message', 'Date', 'Status', 'Action']}>
                      {displayedEnquiries.map((e) => (
                        <tr key={e.id} className="hover:bg-slate-50/60 transition">
                          <td className="px-5 py-4 font-extrabold text-slate-800">{e.name}</td>
                          <td className="px-5 py-4 text-slate-600 font-semibold whitespace-nowrap">
                            <span className="flex items-center gap-1.5"><Phone size={11} className="text-slate-400" />{e.phone}</span>
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-extrabold text-slate-800 leading-tight">{e.productName}</p>
                            <p className="text-[10px] text-slate-400 font-bold">₹{e.productPrice?.toLocaleString('en-IN')}</p>
                          </td>
                          <td className="px-5 py-4 text-slate-500 max-w-[180px] font-semibold text-[11px]" title={e.message}>
                            <p className="truncate">{e.message || <span className="text-slate-300 italic">—</span>}</p>
                          </td>
                          <td className="px-5 py-4 text-slate-500 font-semibold text-[11px] whitespace-nowrap">{e.submittedAt}</td>
                          <td className="px-5 py-4">
                            <select
                              value={e.status || 'Pending'}
                              onChange={(el) => handleUpdateEnquiryStatus(e.id, el.target.value)}
                              className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-black uppercase tracking-wider focus:outline-none transition cursor-pointer ${
                                (e.status || 'Pending') === 'Pending' ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : e.status === 'Contacted' ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }`}
                            >
                              <option>Pending</option>
                              <option>Contacted</option>
                              <option>Closed</option>
                            </select>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <button onClick={() => handleDeleteEnquiry(e.id)} className="text-slate-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition cursor-pointer">
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </DataTable>
                  );
                } else if (enquiries.length > 0) {
                  return (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center text-slate-500 font-semibold">
                      <Mail className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                      <p>No enquiries found matching status <strong>{enquiryStatusFilter}</strong>.</p>
                      <button
                        onClick={() => setEnquiryStatusFilter('all')}
                        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs"
                      >
                        Reset Filter
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <EmptyState icon={Mail} message="No customer enquiries received yet." />
                    </div>
                  );
                }
              })()}
            </div>
          )}

          {/* ── Service Requests ───────────────────────────────────────────── */}
          {activeTab === 'services' && (
            <div>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 text-left">
                <div>
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">Service Requests</h2>
                  <p className="text-[12px] text-slate-400 font-semibold mt-1">Monitor, coordinate and assign service requests from customers.</p>
                </div>
                {/* Status summary pills */}
                {serviceBookings.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { label: 'Pending',  color: 'bg-amber-50 text-amber-700 border-amber-200' },
                      { label: 'Finished', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
                      { label: 'Success',  color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                    ].map(({ label, color }) => {
                      const count = serviceBookings.filter((b) => b.status === label).length;
                      return (
                        <div key={label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-black ${color}`}>
                          <span>{label}</span>
                          <span className="font-black bg-white/60 px-1.5 py-0.5 rounded-lg">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {serviceBookings.length > 0 ? (
                <div className="space-y-4 text-left">
                  {serviceBookings.map((b) => {
                    const assignedEmp = employees.find(e => e.id === b.assignedEmployeeId);
                    return (
                      <div key={b.id} className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col xl:flex-row xl:items-center justify-between gap-5 animate-in fade-in duration-200">

                        {/* Ref ID & Status */}
                        <div className="min-w-[180px]">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] font-black text-[#1D4ED8] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg tracking-wide">{b.id}</span>
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                              b.status === 'Pending'  ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : b.status === 'Finished' ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}>
                              <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${
                                b.status === 'Pending' ? 'bg-amber-500' : b.status === 'Finished' ? 'bg-indigo-500' : 'bg-emerald-500'
                              }`} />
                              {b.status}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-slate-800 text-[14px] leading-tight">{b.name}</h4>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{b.createdAt}</p>
                        </div>

                        {/* Contact details */}
                        <div className="flex flex-col gap-1 text-[12px] text-slate-655 font-semibold min-w-[210px] flex-1">
                          <div className="flex items-center gap-2">
                            <Phone size={12} className="text-slate-400 shrink-0" />
                            <span>{b.phone}</span>
                          </div>
                          <div className="flex items-start gap-2 text-[11px] text-slate-400 font-semibold">
                            <MapPin size={12} className="text-slate-400 shrink-0 mt-0.5" />
                            <span className="truncate max-w-[170px]" title={b.address}>{b.pincode ? `${b.pincode} – ` : ''}{b.address}</span>
                          </div>
                          <div className="pt-0.5">
                            <span className="bg-blue-50 text-[#1D4ED8] border border-blue-100 rounded-lg px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wide">
                              {b.serviceType}
                            </span>
                          </div>
                        </div>

                        {/* Product / Date / Status Controls */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-[340px]">
                          <div>
                            <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Product</label>
                            <select
                              value={b.soldProduct || ''}
                              onChange={(e) => handleUpdateServiceAssignment(b.id, 'soldProduct', e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700 focus:outline-none focus:border-[#1D4ED8] cursor-pointer"
                            >
                              <option value="">Not Assigned</option>
                              {allProductsList.map((name) => <option key={name}>{name}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Delivery Date</label>
                            <input
                              type="date"
                              value={b.deliveryDate || ''}
                              onChange={(e) => handleUpdateServiceAssignment(b.id, 'deliveryDate', e.target.value)}
                              className="w-full px-2 py-1 bg-[#F8FAFC] border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700 focus:outline-none focus:border-[#1D4ED8] cursor-pointer"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Status</label>
                            <select
                              value={b.status}
                              onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                              className={`w-full px-2.5 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider focus:outline-none cursor-pointer ${
                                b.status === 'Pending'  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : b.status === 'Finished' ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }`}
                            >
                              <option>Pending</option>
                              <option>Finished</option>
                              <option>Success</option>
                            </select>
                          </div>
                        </div>

                        {/* Assign Tech Controls */}
                        <div className="min-w-[180px]">
                          <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Assign Technician</label>
                          <select
                            value={b.assignedEmployeeId || ''}
                            onChange={(e) => handleUpdateServiceAssignment(b.id, 'assignedEmployeeId', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-700 focus:outline-none focus:border-[#1D4ED8] cursor-pointer"
                          >
                            <option value="">Unassigned</option>
                            {employees.map((emp) => (
                              <option key={emp.id} value={emp.id}>{emp.name} ({emp.specialization || 'General'})</option>
                            ))}
                          </select>
                        </div>

                        {/* Right Actions & Technician Badge */}
                        <div className="flex flex-row xl:flex-col items-center xl:items-end justify-between xl:justify-center gap-3 shrink-0 pl-0 xl:pl-4 xl:border-l xl:border-slate-50 min-w-[140px]">
                          {assignedEmp ? (
                            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-2.5 py-1.5">
                              <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-[9px] font-black text-blue-700">
                                {assignedEmp.name.charAt(0)}
                              </div>
                              <span className="text-[10px] font-bold text-blue-700">{assignedEmp.name}</span>
                            </div>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400 italic">Unassigned</span>
                          )}
                          <button
                            onClick={() => handleDeleteServiceBooking(b.id)}
                            className="text-slate-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <EmptyState icon={Wrench} message="No service requests yet." />
                </div>
              )}
            </div>
          )}

          {/* ── Employees ──────────────────────────────────────────────────── */}
          {activeTab === 'employees' && (
            <div>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 text-left">
                <div>
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">Employees</h2>
                  <p className="text-[12px] text-slate-400 font-semibold mt-1">Manage your field technicians, their specializations, and service capacity.</p>
                </div>
                <button
                  onClick={() => setIsAddEmployeeModalOpen(true)}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#2563EB] text-white px-5 py-2.5 rounded-xl text-xs font-black transition cursor-pointer shadow-md shadow-blue-200"
                >
                  <Plus size={14} />
                  Add Employee
                </button>
              </div>

              {employees.length > 0 ? (
                <div className="space-y-4 text-left">
                  {employees.map((emp) => {
                    // Calculate Service Record statistics
                    const empBookings = serviceBookings.filter(b => b.assignedEmployeeId === emp.id);
                    const assignedCount = empBookings.length;
                    const activeCount = empBookings.filter(b => b.status === 'Pending').length;
                    const doneCount = empBookings.filter(b => b.status === 'Finished' || b.status === 'Success').length;

                    return (
                      <div key={emp.id} className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col xl:flex-row xl:items-center justify-between gap-5 animate-in fade-in duration-200">

                        {/* Avatar & Name & Specialization */}
                        <div className="flex items-center gap-4 min-w-[240px]">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-blue-600 bg-blue-50 font-black text-lg shadow-2xs">
                            {emp.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-slate-800 text-[14.5px] leading-tight tracking-tight uppercase truncate">{emp.name}</h4>
                            <span className="bg-blue-50 text-[#1D4ED8] border border-blue-100 px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase inline-block mt-1">
                              {emp.specialization || 'General'}
                            </span>
                          </div>
                        </div>

                        {/* Contact details */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:flex xl:flex-col gap-2.5 text-[12px] text-slate-655 font-semibold min-w-[200px] flex-1">
                          <div className="flex items-center gap-2">
                            <Phone size={12} className="text-slate-400 shrink-0" />
                            <span>{emp.mobile || '—'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail size={12} className="text-slate-400 shrink-0" />
                            <span className="truncate max-w-[150px]" title={emp.email}>{emp.email || '—'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={12} className="text-slate-400 shrink-0" />
                            <span className="truncate max-w-[150px]" title={emp.address}>{emp.address || '—'}</span>
                          </div>
                        </div>

                        {/* Credentials */}
                        <div className="bg-[#F8FAFC] border border-slate-100 px-3.5 py-2.5 rounded-2xl min-w-[170px] text-[11px]">
                          <div className="mb-1">
                            <span className="text-slate-400 font-bold uppercase mr-1.5 text-[9px]">User ID:</span>
                            <code className="font-mono text-[#1D4ED8] font-bold">{emp.loginId}</code>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold uppercase mr-1.5 text-[9px]">Pass:</span>
                            <code className="font-mono text-slate-650 font-bold">{emp.password}</code>
                          </div>
                        </div>

                        {/* Service Record */}
                        <div className="min-w-[230px]">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">Service Record</span>
                          <div className="flex gap-2">
                            <div className="bg-[#F8FAFC] border border-slate-100 rounded-xl px-3 py-1.5 text-center flex-1">
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Assigned</p>
                              <p className="text-[13px] font-black text-slate-700 mt-0.5">{assignedCount}</p>
                            </div>
                            <div className="bg-[#F8FAFC] border border-slate-100 rounded-xl px-3 py-1.5 text-center flex-1">
                              <p className="text-[8px] font-black text-[#1D4ED8] uppercase tracking-wider">Active</p>
                              <p className="text-[13px] font-black text-[#1D4ED8] mt-0.5">{activeCount}</p>
                            </div>
                            <div className="bg-[#F8FAFC] border border-slate-100 rounded-xl px-3 py-1.5 text-center flex-1">
                              <p className="text-[8px] font-black text-emerald-650 uppercase tracking-wider">Done</p>
                              <p className="text-[13px] font-black text-emerald-650 mt-0.5">{doneCount}</p>
                            </div>
                          </div>
                        </div>

                        {/* Status & Actions */}
                        <div className="flex flex-row xl:flex-col items-center xl:items-end justify-between xl:justify-center gap-3 shrink-0 pl-0 xl:pl-4 xl:border-l xl:border-slate-50 min-w-[120px]">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border ${
                            emp.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                              : 'bg-rose-50 text-rose-605 border-rose-100'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            {emp.status || 'Active'}
                          </span>

                          <div className="flex items-center gap-1 text-slate-400">
                            <button
                              onClick={() => handleToggleEmployeeStatus(emp.id)}
                              className="hover:text-emerald-500 transition cursor-pointer p-1.5 rounded-lg hover:bg-slate-50"
                              title="Toggle Status"
                            >
                              <UserCheck size={16} />
                            </button>
                            <button
                              onClick={() => handleStartEditEmployee(emp)}
                              className="hover:text-[#1D4ED8] transition cursor-pointer p-1.5 rounded-lg hover:bg-slate-50"
                              title="Edit Technician"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteEmployee(emp.id)}
                              disabled={emp.id === 'EMP-101'}
                              className="hover:text-rose-500 transition cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <EmptyState icon={Users} message="No employees registered yet." action="Add your first employee" onAction={() => setIsAddEmployeeModalOpen(true)} />
                </div>
              )}

              {/* Add Employee Modal */}
              {isAddEmployeeModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
                    onClick={() => setIsAddEmployeeModalOpen(false)}
                  />

                  {/* Modal Container */}
                  <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg z-50 p-6 md:p-8 border border-slate-100 animate-in fade-in zoom-in duration-200 text-left">
                    <button
                      onClick={() => { setIsAddEmployeeModalOpen(false); setEditingEmployeeId(null); setEmpName(''); setEmpAddress(''); setEmpMobile(''); setEmpEmail(''); setEmpLoginId(''); setEmpPassword(''); setEmpSpecialization('General'); setEmpStatus('Active'); }}
                      className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 transition p-2 cursor-pointer rounded-full hover:bg-slate-100"
                    >
                      <X size={18} />
                    </button>

                    <h3 className="text-lg font-black text-slate-800 mb-5 flex items-center gap-2">
                      {editingEmployeeId
                        ? <><Pencil size={18} className="text-[#1D4ED8]" /> Edit Technician</>
                        : <><Users size={18} className="text-[#1D4ED8]" /> Add New Employee</>}
                    </h3>

                    <form onSubmit={handleAddEmployee} className="space-y-4">
                      {[
                        { label: 'Full Name *', type: 'text', val: empName, set: setEmpName, ph: 'John Doe', req: true },
                        { label: 'Mobile', type: 'tel', val: empMobile, set: setEmpMobile, ph: '9876543210' },
                        { label: 'Email', type: 'email', val: empEmail, set: setEmpEmail, ph: 'john@kentro.in' },
                      ].map(({ label, type, val, set, ph, req }) => (
                        <div key={label}>
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">{label}</label>
                          <input type={type} required={req} placeholder={ph} value={val} onChange={(e) => set(e.target.value)} className={inputCls} />
                        </div>
                      ))}
                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Address</label>
                        <textarea rows={2} placeholder="Complete address" value={empAddress} onChange={(e) => setEmpAddress(e.target.value)} className={`${inputCls} resize-none`} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Specialization */}
                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Specialization</label>
                          <select
                            value={empSpecialization}
                            onChange={(e) => setEmpSpecialization(e.target.value)}
                            className={inputCls + ' cursor-pointer'}
                          >
                            <option>General</option>
                            <option>RO Specialist</option>
                            <option>UV Specialist</option>
                            <option>Air Purifier Tech</option>
                            <option>Kitchen Appliances</option>
                            <option>Water Softener Tech</option>
                          </select>
                        </div>

                        {/* Status toggle */}
                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Status</label>
                          <div className="flex gap-2 h-10">
                            {['Active', 'Inactive'].map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setEmpStatus(s)}
                                className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl text-[12px] font-black border transition cursor-pointer ${
                                  empStatus === s
                                    ? s === 'Active'
                                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-100'
                                      : 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-100'
                                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Login ID *</label>
                          <input type="text" required placeholder="e.g. john" value={empLoginId} onChange={(e) => setEmpLoginId(e.target.value)} className={inputCls} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Password *</label>
                          <input type="password" required placeholder="••••••" value={empPassword} onChange={(e) => setEmpPassword(e.target.value)} className={inputCls} />
                        </div>
                      </div>
                      <button type="submit"
                        className="w-full bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#2563EB] text-white py-3 rounded-xl font-extrabold text-[13px] shadow-md transition cursor-pointer mt-4">
                        {editingEmployeeId ? 'Save Changes' : 'Add Employee'}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Offers Manager ────────────────────────────────────────────── */}
          {activeTab === 'offers' && (
            <div>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 text-left">
                <div>
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">Promo Offers</h2>
                  <p className="text-[12px] text-slate-400 font-semibold mt-1">Create and manage marketing promotions, coupon discounts, and special product deals.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const s = localStorage.getItem('kentro-offers');
                      if (s) setOffers(JSON.parse(s));
                    }}
                    className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-650 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold transition cursor-pointer shadow-xs"
                  >
                    <RefreshCw size={13} className="text-slate-400" />
                    Refresh
                  </button>
                  <button
                    onClick={() => setIsAddOfferModalOpen(true)}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#2563EB] text-white px-5 py-2.5 rounded-xl text-xs font-black transition cursor-pointer shadow-md shadow-blue-200"
                  >
                    <Plus size={14} />
                    Add Offer
                  </button>
                </div>
              </div>

              {offerSuccess && (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] font-extrabold px-5 py-4 rounded-2xl mb-6 shadow-sm">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  Offer saved successfully!
                </div>
              )}

              {/* Grid of Offers */}
              {offers.length > 0 ? (
                <div className="space-y-4 text-left animate-in fade-in duration-200">
                  {offers.map((off) => (
                    <div key={off.id} className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col xl:flex-row xl:items-center justify-between gap-5 relative overflow-hidden">
                      
                      {/* Left Block: Code & Title & Description */}
                      <div className="flex items-start gap-4 min-w-[320px] flex-1">
                        <div className="bg-blue-50 text-[#1D4ED8] border border-blue-100 px-3.5 py-2 rounded-xl text-[13px] font-mono font-black tracking-wider uppercase shrink-0">
                          {off.code}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-slate-800 text-[15px] leading-tight mb-1">{off.title}</h4>
                          <p className="text-[12px] text-slate-400 font-semibold leading-relaxed line-clamp-2" title={off.description}>
                            {off.description || 'No description provided.'}
                          </p>
                        </div>
                      </div>

                      {/* Middle block: Discount details */}
                      <div className="bg-[#F8FAFC] border border-slate-100 px-4 py-2.5 rounded-2xl min-w-[130px] text-center">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Discount</p>
                        <p className="text-[15px] font-black text-[#1D4ED8] mt-0.5">
                          {off.type === 'Percentage' ? `${off.value}%` : `₹${off.value}`}
                        </p>
                      </div>

                      {/* Middle block 2: Applies To */}
                      <div className="bg-[#F8FAFC] border border-slate-100 px-4 py-2.5 rounded-2xl min-w-[200px]">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">Applies To</p>
                        <p className="text-[11.5px] font-extrabold text-slate-700 truncate" title={off.applicableTo === 'all' ? 'All Products' : off.applicableTo}>
                          {off.applicableTo === 'all' ? 'All Products' : off.applicableTo}
                        </p>
                      </div>

                      {/* Right Block: Status & Actions */}
                      <div className="flex flex-row xl:flex-col items-center xl:items-end justify-between xl:justify-center gap-3 shrink-0 pl-0 xl:pl-4 xl:border-l xl:border-slate-50 min-w-[140px]">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border ${
                          off.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-rose-50 text-rose-600 border-rose-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${off.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          {off.status}
                        </span>

                        <div className="flex items-center gap-1 text-slate-400">
                          <button
                            onClick={() => handleToggleOfferStatus(off.id)}
                            className="hover:text-emerald-500 transition cursor-pointer p-1.5 rounded-lg hover:bg-slate-50"
                            title="Toggle Status"
                          >
                            <UserCheck size={16} />
                          </button>
                          <button
                            onClick={() => handleStartEditOffer(off)}
                            className="hover:text-[#1D4ED8] transition cursor-pointer p-1.5 rounded-lg hover:bg-slate-50"
                            title="Edit Offer"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteOffer(off.id)}
                            className="hover:text-rose-500 transition cursor-pointer p-1.5 rounded-lg hover:bg-slate-50"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <EmptyState icon={Tag} message="No offers registered yet." action="Create your first offer" onAction={() => setIsAddOfferModalOpen(true)} />
                </div>
              )}

              {/* Add Offer Modal */}
              {isAddOfferModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
                    onClick={() => { setIsAddOfferModalOpen(false); setEditingOfferId(null); setOfferCode(''); setOfferTitle(''); setOfferDescription(''); setOfferType('Percentage'); setOfferValue(''); setOfferApplicableTo('all'); setOfferStatus('Active'); }}
                  />

                  {/* Modal Container */}
                  <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg z-50 p-6 md:p-8 border border-slate-100 animate-in fade-in zoom-in duration-200 text-left">
                    <button
                      onClick={() => { setIsAddOfferModalOpen(false); setEditingOfferId(null); setOfferCode(''); setOfferTitle(''); setOfferDescription(''); setOfferType('Percentage'); setOfferValue(''); setOfferApplicableTo('all'); setOfferStatus('Active'); }}
                      className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 transition p-2 cursor-pointer rounded-full hover:bg-slate-100"
                    >
                      <X size={18} />
                    </button>

                    <h3 className="text-lg font-black text-slate-800 mb-5 flex items-center gap-2">
                      {editingOfferId
                        ? <><Pencil size={18} className="text-[#1D4ED8]" /> Edit Promo Offer</>
                        : <><Tag size={18} className="text-[#1D4ED8]" /> Create Promo Offer</>}
                    </h3>

                    <form onSubmit={handleAddOffer} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Offer Code *</label>
                          <input type="text" required placeholder="e.g. KENT50" value={offerCode} onChange={(e) => setOfferCode(e.target.value.toUpperCase())} className={inputCls} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Offer Title *</label>
                          <input type="text" required placeholder="e.g. 50% Off Special Deal" value={offerTitle} onChange={(e) => setOfferTitle(e.target.value)} className={inputCls} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Description</label>
                        <textarea rows={2} placeholder="Get flat discount on purifiers..." value={offerDescription} onChange={(e) => setOfferDescription(e.target.value)} className={`${inputCls} resize-none`} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Discount Type</label>
                          <select
                            value={offerType}
                            onChange={(e) => setOfferType(e.target.value)}
                            className={inputCls + ' cursor-pointer'}
                          >
                            <option>Percentage</option>
                            <option>Flat Discount</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Discount Value *</label>
                          <input type="number" required placeholder={offerType === 'Percentage' ? 'e.g. 10' : 'e.g. 1500'} value={offerValue} onChange={(e) => setOfferValue(e.target.value)} className={inputCls} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Applies To</label>
                        <select
                          value={offerApplicableTo}
                          onChange={(e) => setOfferApplicableTo(e.target.value)}
                          className={inputCls + ' cursor-pointer'}
                        >
                          <option value="all">All Products</option>
                          {allProductsList.map((name) => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Status</label>
                        <div className="flex gap-2 h-10">
                          {['Active', 'Inactive'].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setOfferStatus(s)}
                              className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl text-[12px] font-black border transition cursor-pointer ${
                                offerStatus === s
                                  ? s === 'Active'
                                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-100'
                                    : 'bg-rose-50 text-white border-rose-500 shadow-md shadow-rose-100'
                                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button type="submit"
                        className="w-full bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#2563EB] text-white py-3 rounded-xl font-extrabold text-[13px] shadow-md transition cursor-pointer mt-4">
                        {editingOfferId ? 'Save Changes' : 'Create Offer'}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Demo Bookings ─────────────────────────────────────────────── */}
          {activeTab === 'demo' && (
            <div>
              <SectionHeader title="Demo Bookings" subtitle="Free demo requests submitted via the 'Book a Demo' form on the storefront." />

              {/* Status summary */}
              {demoBookings.length > 0 && (
                <div className="flex gap-3 mb-6 flex-wrap select-none">
                  {[
                    { label: 'All',         color: 'bg-slate-100 text-slate-700 border-slate-300', value: 'all' },
                    { label: 'New',         color: 'bg-blue-50 text-blue-700 border-blue-200', value: 'New' },
                    { label: 'Contacted',   color: 'bg-amber-50 text-amber-700 border-amber-200', value: 'Contacted' },
                    { label: 'Scheduled',   color: 'bg-indigo-50 text-indigo-700 border-indigo-200', value: 'Scheduled' },
                    { label: 'Completed',   color: 'bg-emerald-50 text-emerald-700 border-emerald-200', value: 'Completed' },
                    { label: 'Cancelled',   color: 'bg-rose-50 text-rose-700 border-rose-200', value: 'Cancelled' },
                  ].map(({ label, color, value }) => {
                    const count = value === 'all' ? demoBookings.length : demoBookings.filter((d) => (d.status || 'New') === value).length;
                    const isActive = demoStatusFilter === value;
                    
                    return (
                      <button
                        key={label}
                        onClick={() => setDemoStatusFilter(value)}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full border text-[12px] font-black transition cursor-pointer ${color} ${
                          isActive 
                            ? 'ring-2 ring-offset-2 ring-blue-500 opacity-100 scale-102 shadow-xs' 
                            : 'opacity-50 hover:opacity-85'
                        }`}
                      >
                        <span>{label}</span>
                        <span className="font-extrabold">{count}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Active Filter Helper text */}
              {demoStatusFilter !== 'all' && demoBookings.length > 0 && (
                <div className="text-xs font-semibold text-slate-500 mb-4 text-left flex items-center gap-2">
                  <span>Showing only <strong>{demoStatusFilter}</strong> demo requests.</span>
                  <button
                    onClick={() => setDemoStatusFilter('all')}
                    className="text-[#1D4ED8] hover:underline cursor-pointer font-bold"
                  >
                    Reset Filter
                  </button>
                </div>
              )}

              {(() => {
                const displayedBookings = demoStatusFilter === 'all'
                  ? demoBookings
                  : demoBookings.filter((d) => (d.status || 'New') === demoStatusFilter);

                if (displayedBookings.length > 0) {
                  return (
                    <DataTable headers={['Ref ID', 'Customer', 'Mobile', 'Interested In', 'Message', 'Submitted', 'Status', 'Action']}>
                      {displayedBookings.map((d) => (
                        <tr key={d.id} className="hover:bg-slate-50/60 transition">
                          <td className="px-5 py-4 font-black text-[#1D4ED8] whitespace-nowrap text-[11px]">{d.id}</td>
                          <td className="px-5 py-4 font-extrabold text-slate-800 whitespace-nowrap">{d.name}</td>
                          <td className="px-5 py-4 text-slate-600 font-semibold whitespace-nowrap">
                            <span className="flex items-center gap-1"><Phone size={11} className="text-slate-400" />{d.phone}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="bg-blue-50 text-[#1D4ED8] border border-blue-100 px-2.5 py-1 rounded-lg text-[10px] font-black whitespace-nowrap">{d.interestedIn}</span>
                          </td>
                          <td className="px-5 py-4 text-slate-500 font-semibold max-w-[200px]">
                            <p className="truncate text-[11px]" title={d.message}>{d.message || <span className="text-slate-300 italic">—</span>}</p>
                          </td>
                          <td className="px-5 py-4 text-slate-400 font-semibold text-[11px] whitespace-nowrap">{d.submittedAt}</td>
                          <td className="px-5 py-4">
                            <select
                              value={d.status || 'New'}
                              onChange={(e) => handleUpdateDemoStatus(d.id, e.target.value)}
                              className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider focus:outline-none transition cursor-pointer ${
                                d.status === 'New'       ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : d.status === 'Contacted' ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : d.status === 'Scheduled' ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                : d.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                              }`}
                            >
                              <option>New</option>
                              <option>Contacted</option>
                              <option>Scheduled</option>
                              <option>Completed</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <button onClick={() => handleDeleteDemoBooking(d.id)} className="text-slate-400 hover:text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition cursor-pointer" title="Delete">
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </DataTable>
                  );
                } else if (demoBookings.length > 0) {
                  return (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center text-slate-500 font-semibold">
                      <ClipboardList className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                      <p>No bookings found matching status <strong>{demoStatusFilter}</strong>.</p>
                      <button
                        onClick={() => setDemoStatusFilter('all')}
                        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs"
                      >
                        Reset Filter
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <EmptyState icon={ClipboardList} message="No demo bookings received yet." />
                    </div>
                  );
                }
              })()}
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="border-t border-slate-100 bg-white py-4 px-8 text-[11px] font-bold text-slate-400 text-center uppercase tracking-widest">
          KENT Admin Control Panel © 2026 · Powered by Kent RO Systems
        </footer>
      </main>

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl border shadow-xl backdrop-blur-md font-black text-xs select-none ${
            toast.type === 'error'
              ? 'bg-rose-50/90 text-rose-800 border-rose-100'
              : toast.type === 'warning'
              ? 'bg-amber-50/90 text-amber-800 border-amber-100'
              : 'bg-emerald-50/90 text-emerald-800 border-emerald-100'
          }`}>
            {toast.type === 'error' && <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />}
            {toast.type === 'warning' && <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping shrink-0" />}
            {toast.type === 'success' && <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />}
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75 transition font-black text-slate-400 p-0.5 cursor-pointer">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
