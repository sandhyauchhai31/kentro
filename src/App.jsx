import React, { useState } from 'react';
import { ShieldCheck, Award, Users, Wrench, Search, X, CheckCircle, HelpCircle, ArrowRight, UserCheck, Play, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Component Imports
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import SidebarActions from './components/SidebarActions';
import TechShowcase from './components/TechShowcase';
import ProductQuiz from './components/ProductQuiz';
import Bestsellers from './components/Bestsellers';
import Footer from './components/Footer';
import BookDemoModal from './components/BookDemoModal';
import CategoryView from './components/CategoryView';
import CheckoutView from './components/CheckoutView';
import AboutView from './components/AboutView';
import PartnerView from './components/PartnerView';
import ServiceView from './components/ServiceView';
import DealerView from './components/DealerView';
import LoginView from './components/LoginView';
import AccountView from './components/AccountView';
import ProductDetailView from './components/ProductDetailView';
import AdminView from './components/AdminView';
import EmployeeView from './components/EmployeeView';
import SearchModal from './components/SearchModal';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  // Global States
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const userStr = localStorage.getItem('kentro-user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  });

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [softenerCarouselIndex, setSoftenerCarouselIndex] = useState(0);
  const [videoCarouselIndex, setVideoCarouselIndex] = useState(0);
  const [kitchenVideoCarouselIndex, setKitchenVideoCarouselIndex] = useState(0);
  const [kitchenCategoryCarouselIndex, setKitchenCategoryCarouselIndex] = useState(0);
  const [homeCategoryCarouselIndex, setHomeCategoryCarouselIndex] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const activeCategory = queryParams.get('cat') || '';
  const activeSubCategory = queryParams.get('sub') || '';

  const subCategoriesMap = {
    'Water Purifiers': ['RO Purifiers', 'Hydrogen Rich Water', 'UV Purifiers', 'Gravity Purifiers', 'Commercial Purifier'],
    'Water Softeners': ['KENT Autosoft', 'KENT Iron Removal Filters', 'KENT Sand Filters', 'KENT Bathroom Water Softener', 'KENT Pressure Boosting System'],
    'Kitchen Appliances': ['Air Fryers', 'Induction Cooktop', 'Mixer Grinders', 'Hand Blenders', 'Electric Chopper'],
    'Home Appliances': ['Air Purifiers', 'Vacuum Cleaners', 'Dew Humidifier', 'Steam Irons'],
    'New Energy': ['Lithium Batteries', 'Hybrid Inverters']
  };

  const handleNavigateToCategory = (category, subCategory) => {
    navigate(`/category?cat=${encodeURIComponent(category)}&sub=${encodeURIComponent(subCategory)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (catName) => {
    const defaultSub = subCategoriesMap[catName]?.[0] || '';
    navigate(`/category?cat=${encodeURIComponent(catName)}&sub=${encodeURIComponent(defaultSub)}`);
  };

  const handleSubCategoryChange = (subName) => {
    navigate(`/category?cat=${encodeURIComponent(activeCategory)}&sub=${encodeURIComponent(subName)}`);
  };

  const handleBackToHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Service Request Form State
  const [serviceForm, setServiceForm] = useState({
    name: '',
    phone: '',
    type: 'Installation Request',
    message: ''
  });
  const [serviceSuccess, setServiceSuccess] = useState(false);
  const [serviceLoading, setServiceLoading] = useState(false);

  // Cart operations
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id && item.color === product.color);
      if (existing) {
        return prev.map(item =>
          (item.id === product.id && item.color === product.color)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Auto slide open the cart drawer for premium user feedback
    setIsCartOpen(true);
  };

  const handleBuyNow = (product) => {
    setCartItems([{ ...product, quantity: 1 }]);
    setIsCartOpen(false);
    navigate('/checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (id, color, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id, color);
      return;
    }
    setCartItems(prev => prev.map(item =>
      (item.id === id && item.color === color) ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id, color) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.color === color)));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Service Request Form Submit
  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (!serviceForm.name.trim() || !serviceForm.phone.trim()) return;

    setServiceLoading(true);
    setTimeout(() => {
      setServiceLoading(false);
      setServiceSuccess(true);
      setServiceForm({ name: '', phone: '', type: 'Installation Request', message: '' });
    }, 1500);
  };

  const categoriesData = [
    {
      title: "Water Purifiers",
      tagline: "RO | UV | UF | Gravity",
      bgClass: "from-blue-500 to-indigo-600",
      stats: "10M+ Happy Homes",
      link: "#bestsellers"
    },
    {
      title: "Water Softeners",
      tagline: "Whole House | Bathroom",
      bgClass: "from-cyan-500 to-blue-700",
      stats: "Prevents Scaling",
      link: "#bestsellers"
    },
    {
      title: "Smart Kitchen Range",
      tagline: "Air Fryers | Juicers | Toasters",
      bgClass: "from-orange-500 to-amber-600",
      stats: "Smart Chef Tech",
      link: "#bestsellers"
    },
    {
      title: "HEPA Air Purifiers",
      tagline: "Alps+ | Aura | HEPA",
      bgClass: "from-teal-500 to-emerald-700",
      stats: "99.9% Clean Air",
      link: "#bestsellers"
    }
  ];

  if (location.pathname === '/checkout') {
    return (
      <CheckoutView
        cartItems={cartItems}
        onBackToHome={() => {
          if (activeCategory && activeSubCategory) {
            navigate(`/category?cat=${encodeURIComponent(activeCategory)}&sub=${encodeURIComponent(activeSubCategory)}`);
          } else {
            navigate('/category?cat=Water%20Purifiers&sub=RO%20Purifiers');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onClearCart={() => setCartItems([])}
      />
    );
  }

  if (location.pathname === '/login') {
    return (
      <LoginView
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          navigate('/account');
        }}
        onBackToHome={handleBackToHome}
      />
    );
  }

  if (location.pathname === '/account') {
    if (!currentUser) {
      setTimeout(() => navigate('/login'), 0);
      return null;
    }
    return (
      <AccountView
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onBackToHome={handleBackToHome}
      />
    );
  }

  if (location.pathname === '/admin') {
    return (
      <AdminView onBackToHome={handleBackToHome} />
    );
  }

  if (location.pathname === '/employee') {
    return (
      <EmployeeView onBackToHome={handleBackToHome} />
    );
  }

  const isCategoryView = location.pathname.startsWith('/category');
  const isAboutPage = location.pathname === '/about-us';
  const isPartnerPage = location.pathname === '/become-trade-partner';
  const isServicePage = location.pathname === '/service';
  const isDealerPage = location.pathname === '/dealer-locator';
  const isProductDetailPage = location.pathname.startsWith('/products/');
  const productSlug = isProductDetailPage ? location.pathname.split('/products/')[1] : null;

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col justify-between overflow-x-hidden antialiased text-[#121212]">

      {/* 1. Header component */}
      <Header
        onDemoOpen={() => setIsDemoOpen(true)}
        onSearchOpen={() => setIsSearchOpen(true)}
        onProfileOpen={() => setIsProfileOpen(true)}
        onSubCategoryClick={handleNavigateToCategory}
        currentUser={currentUser}
      />

      {isCategoryView ? (
        <CategoryView
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          onCategoryChange={handleCategoryChange}
          onSubCategoryChange={handleSubCategoryChange}
          onBackToHome={handleBackToHome}
        />
      ) : isAboutPage ? (
        <AboutView onBackToHome={handleBackToHome} />
      ) : isPartnerPage ? (
        <PartnerView />
      ) : isServicePage ? (
        <ServiceView />
      ) : isDealerPage ? (
        <DealerView />
      ) : isProductDetailPage ? (
        <ProductDetailView
          productId={productSlug}
        />
      ) : (
        <>
          {/* 2. Hero Slider component */}
          <HeroSlider />

          {/* Brand Trust Banner Section */}
          <section className="w-full bg-white py-8 select-none">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#091E42] tracking-tight">
                India's Most Trusted RO Water Purifier
              </h2>
              <p className="text-xs md:text-lg text-slate-500 mt-2 font-medium leading-relaxed max-w-5xl">
                The leaders in water purification brings you India's most advanced RO technology for 100% pure, safe and healthy drinking water
              </p>
            </div>
          </section>

          {/* Brand Banner Image Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-8 pb-8 select-none">
            <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition duration-300">
              <img
                src="/img-1.png"
                alt="Kent Pure Water Purifiers Banner"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </section>

          {/* Brand Videos & Catalogue Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-8 pb-10 select-none overflow-hidden relative">
            <div className="w-full overflow-hidden">
              <motion.div
                className="flex space-x-6 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: -360, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) {
                    setVideoCarouselIndex(1);
                  } else if (info.offset.x > 60) {
                    setVideoCarouselIndex(0);
                  }
                }}
                animate={{ x: -videoCarouselIndex * 260 }}
                transition={{ type: 'spring', damping: 26, stiffness: 170 }}
              >

                {/* 1. PDF Catalogue Card */}
                <a
                  href="https://www.kent.co.in/cdn/shop/files/product-catalouge.pdf?v=1781523354"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1b3d7d] rounded-2xl p-6 h-[170px] w-[300px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-[#0d224d]"
                >
                  <div className="absolute top-4 right-4 bg-[#FF5A00] text-white text-[10px] font-black px-2.5 py-1 rounded flex items-center space-x-1 uppercase tracking-wider shadow-sm">
                    <span>PDF</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold text-[#008DDF] tracking-widest block bg-white px-2 py-0.5 rounded w-fit mb-2">KENT</span>
                    <h3 className="text-base font-black text-white leading-tight uppercase">Product Catalogue</h3>
                  </div>

                  <div className="w-9 h-9 bg-white text-[#1b3d7d] rounded-full flex items-center justify-center shadow-md self-end group-hover:scale-110 transition-transform duration-200">
                    <Download size={16} />
                  </div>
                </a>

                {/* 2. YouTube Video 1 */}
                <div
                  onClick={() => setActiveVideoId('hjTyx4c_dB8')}
                  className="relative rounded-2xl overflow-hidden h-[170px] w-[300px] flex-shrink-0 cursor-pointer shadow-md hover:shadow-lg group border border-slate-100"
                >
                  <img
                    src="https://img.youtube.com/vi/hjTyx4c_dB8/hqdefault.jpg"
                    alt="KENT Sterling IoT Video Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-11 bg-black/60 rounded-[14px] flex items-center justify-center text-white backdrop-blur-xs group-hover:scale-110 group-hover:bg-[#FF0000] transition-all duration-300 ease-out">
                      <svg className="w-5 h-5 fill-current text-white translate-x-[2px]" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 3. YouTube Video 2 */}
                <div
                  onClick={() => setActiveVideoId('70hTIQuef-8')}
                  className="relative rounded-2xl overflow-hidden h-[170px] w-[300px] flex-shrink-0 cursor-pointer shadow-md hover:shadow-lg group border border-slate-100"
                >
                  <img
                    src="https://img.youtube.com/vi/70hTIQuef-8/hqdefault.jpg"
                    alt="KENT RO Video Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-11 bg-black/60 rounded-[14px] flex items-center justify-center text-white backdrop-blur-xs group-hover:scale-110 group-hover:bg-[#FF0000] transition-all duration-300 ease-out">
                      <svg className="w-5 h-5 fill-current text-white translate-x-[2px]" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 4. YouTube Video 3 */}
                <div
                  onClick={() => setActiveVideoId('FYkT9mFPGv8')}
                  className="relative rounded-2xl overflow-hidden h-[170px] w-[300px] flex-shrink-0 cursor-pointer shadow-md hover:shadow-lg group border border-slate-100"
                >
                  <img
                    src="https://img.youtube.com/vi/FYkT9mFPGv8/hqdefault.jpg"
                    alt="KENT RO Video Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-11 bg-black/60 rounded-[14px] flex items-center justify-center text-white backdrop-blur-xs group-hover:scale-110 group-hover:bg-[#FF0000] transition-all duration-300 ease-out">
                      <svg className="w-5 h-5 fill-current text-white translate-x-[2px]" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 5. YouTube Video 4 */}
                <div
                  onClick={() => setActiveVideoId('rJ0JhKSmOnU')}
                  className="relative rounded-2xl overflow-hidden h-[170px] w-[300px] flex-shrink-0 cursor-pointer shadow-md hover:shadow-lg group border border-slate-100"
                >
                  <img
                    src="https://img.youtube.com/vi/rJ0JhKSmOnU/hqdefault.jpg"
                    alt="KENT RO Video Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-11 bg-black/60 rounded-[14px] flex items-center justify-center text-white backdrop-blur-xs group-hover:scale-110 group-hover:bg-[#FF0000] transition-all duration-300 ease-out">
                      <svg className="w-5 h-5 fill-current text-white translate-x-[2px]" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 6. YouTube Video 5 */}
                <div
                  onClick={() => setActiveVideoId('GoiV3_ssRMA')}
                  className="relative rounded-2xl overflow-hidden h-[170px] w-[300px] flex-shrink-0 cursor-pointer shadow-md hover:shadow-lg group border border-slate-100"
                >
                  <img
                    src="https://img.youtube.com/vi/GoiV3_ssRMA/hqdefault.jpg"
                    alt="KENT RO Video Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-11 bg-black/60 rounded-[14px] flex items-center justify-center text-white backdrop-blur-xs group-hover:scale-110 group-hover:bg-[#FF0000] transition-all duration-300 ease-out">
                      <svg className="w-5 h-5 fill-current text-white translate-x-[2px]" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Carousel Dot Indicators */}
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => setVideoCarouselIndex(0)}
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${videoCarouselIndex === 0 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
                  }`}
                style={{ borderRadius: '9999px' }}
                aria-label="Slide group 1"
              />
              <button
                onClick={() => setVideoCarouselIndex(1)}
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${videoCarouselIndex === 1 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
                  }`}
                style={{ borderRadius: '9999px' }}
                aria-label="Slide group 2"
              />
            </div>
          </section>

          {/* 2b. Main Purifier Division Carousel Section (Matches image) */}
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 select-none overflow-hidden relative">

            {/* Sliding Track Container */}
            <div className="w-full overflow-hidden">
              <motion.div
                className="flex space-x-6 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: -320, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) {
                    setCarouselIndex(1);
                  } else if (info.offset.x > 60) {
                    setCarouselIndex(0);
                  }
                }}
                animate={{ x: -carouselIndex * 240 }}
                transition={{ type: 'spring', damping: 26, stiffness: 170 }}
              >

                {/* Card 1: RO Water Purifiers */}
                <div
                  onClick={() => handleNavigateToCategory('Water Purifiers', 'RO Purifiers')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">RO Water Purifiers</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/water-purifier/ro-1.webp" 
                        alt="RO Purifiers" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: UV Water Purifier */}
                <div
                  onClick={() => handleNavigateToCategory('Water Purifiers', 'UV Purifiers')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">UV Water Purifier</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/water-purifier/uv purifier.webp" 
                        alt="UV Purifier" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Gravity Water Purifier */}
                <div
                  onClick={() => handleNavigateToCategory('Water Purifiers', 'Gravity Purifiers')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">Gravity Water Purifier</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/water-purifier/gravity purifier.webp" 
                        alt="Gravity Water Purifier" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

                {/* Card 4: Hydrogen Rich Water */}
                <div
                  onClick={() => handleNavigateToCategory('Water Purifiers', 'Hydrogen Rich Water')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">Hydrogen Rich Water</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/water-purifier/hydrogen-rich-water.webp" 
                        alt="Hydrogen Rich Water" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

                {/* Card 5: Commercial Purifiers */}
                <div
                  onClick={() => handleNavigateToCategory('Water Purifiers', 'Commercial Purifier')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">Commercial Purifiers</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/water-purifier/commercial-purifier.webp" 
                        alt="Commercial Purifiers" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Carousel Dot Indicators */}
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => setCarouselIndex(0)}
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${carouselIndex === 0 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
                  }`}
                style={{ borderRadius: '9999px' }}
                aria-label="Slide group 1"
              />
              <button
                onClick={() => setCarouselIndex(1)}
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${carouselIndex === 1 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
                  }`}
                style={{ borderRadius: '9999px' }}
                aria-label="Slide group 2"
              />
            </div>

          </section>



          {/* Hard Water Converter Trust Section */}
          <section className="w-full bg-white pt-8 pb-4 select-none">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#091E42] tracking-tight">
                Converts Hard Water Into Gentle Care
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-3 font-medium leading-relaxed max-w-5xl">
                Advanced water softener solutions range for whole house, bathroom and washing machine converts hardwater into soft, skin, hair and appliance-friendly water.
              </p>
            </div>
          </section>

          {/* Water Softener Banner Image Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12 select-none">
            <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition duration-300">
              <img
                src="/img-3.png"
                alt="Kent Water Softeners Banner"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </section>



          {/* Main Softener Division Carousel Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-6 select-none overflow-hidden relative">

            {/* Sliding Track Container */}
            <div className="w-full overflow-hidden">
              <motion.div
                className="flex space-x-6 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: -320, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) {
                    setSoftenerCarouselIndex(1);
                  } else if (info.offset.x > 60) {
                    setSoftenerCarouselIndex(0);
                  }
                }}
                animate={{ x: -softenerCarouselIndex * 240 }}
                transition={{ type: 'spring', damping: 26, stiffness: 170 }}
              >

                {/* Card 1: KENT AutoSoft */}
                <div
                  onClick={() => handleNavigateToCategory('Water Softeners', 'KENT Autosoft')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">KENT AutoSoft</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/water-softner/kent-auto-soft.webp" 
                        alt="KENT Autosoft" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: KENT Bathroom Water Softener */}
                <div
                  onClick={() => handleNavigateToCategory('Water Softeners', 'KENT Bathroom Water Softener')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">KENT Bathroom Water Softener</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/water-softner/kent-bathroom-water-softener-1.webp" 
                        alt="KENT Bathroom Water Softener" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: KENT Sand Filters */}
                <div
                  onClick={() => handleNavigateToCategory('Water Softeners', 'KENT Sand Filters')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">KENT Sand Filters</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/water-softner/kent-sand-filter.webp" 
                        alt="KENT Sand Filters" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

                {/* Card 4: KENT Iron Removal Filters */}
                <div
                  onClick={() => handleNavigateToCategory('Water Softeners', 'KENT Iron Removal Filters')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">KENT Iron Removal Filters</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/water-softner/kent-iron-removal-filter.webp" 
                        alt="KENT Iron Removal Filters" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Carousel Dot Indicators */}
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => setSoftenerCarouselIndex(0)}
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${softenerCarouselIndex === 0 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
                  }`}
                style={{ borderRadius: '9999px' }}
                aria-label="Slide group 1"
              />
              <button
                onClick={() => setSoftenerCarouselIndex(1)}
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${softenerCarouselIndex === 1 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
                  }`}
                style={{ borderRadius: '9999px' }}
                aria-label="Slide group 2"
              />
            </div>

          </section>

          {/* Smarter Kitchens Trust Section */}
          <section className="w-full bg-white pt-8 pb-4 select-none">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#091E42] tracking-tight">
                Smarter Kitchens Start Here.
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-3 font-medium leading-relaxed max-w-5xl">
                Create tastier, healthier meals with KENT's intelligent kitchen appliances designed for modern homes.
              </p>
            </div>
          </section>

          {/* Smarter Kitchens Banner Image Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 select-none">
            <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition duration-300">
              <img
                src="/img-9.png"
                alt="Kent Smarter Kitchens Banner"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </section>



          {/* Kitchen Appliances Videos & Catalogue Carousel Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12 select-none overflow-hidden relative">
            <div className="w-full overflow-hidden">
              <motion.div
                className="flex space-x-6 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: -600, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) {
                    setKitchenVideoCarouselIndex(1);
                  } else if (info.offset.x > 60) {
                    setKitchenVideoCarouselIndex(0);
                  }
                }}
                animate={{ x: -kitchenVideoCarouselIndex * 360 }}
                transition={{ type: 'spring', damping: 26, stiffness: 170 }}
              >
                {/* 1. PDF Catalogue Card */}
                <a
                  href="https://www.kent.co.in/cdn/shop/files/product-catalouge.pdf?v=1781523354"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1b3d7d] rounded-2xl p-6 h-[170px] w-[300px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.01] transition duration-300 relative group overflow-hidden border border-[#0d224d]"
                >
                  <div className="w-full flex justify-between items-center z-10">
                    <div className="bg-white text-[#1b3d7d] font-black text-[10px] px-2 py-0.5 tracking-wider rounded-xs border border-white/25">
                      KENT
                    </div>
                    <div className="bg-[#EC1C24] text-white text-[10px] font-black px-2 py-1 rounded flex items-center space-x-1 uppercase tracking-wider shadow-sm">
                      <span>PDF</span>
                    </div>
                  </div>

                  <div className="w-full flex justify-between items-end z-10">
                    <h3 className="text-sm font-bold text-white leading-tight uppercase tracking-tight text-left">
                      Product <br /> Catalogue
                    </h3>
                    <div className="w-9 h-9 bg-white text-[#1b3d7d] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                      <Download size={16} />
                    </div>
                  </div>
                </a>

                {/* 2. YouTube Video 1: u41jpTyXScQ */}
                <div
                  onClick={() => setActiveVideoId('u41jpTyXScQ')}
                  className="relative rounded-2xl overflow-hidden h-[170px] w-[300px] flex-shrink-0 cursor-pointer shadow-md hover:shadow-lg group border border-slate-100"
                >
                  <img
                    src="https://img.youtube.com/vi/u41jpTyXScQ/hqdefault.jpg"
                    alt="KENT Kitchen Appliance Video"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-11 bg-black/60 rounded-[14px] flex items-center justify-center text-white backdrop-blur-xs group-hover:scale-110 group-hover:bg-[#FF0000] transition-all duration-300 ease-out">
                      <svg className="w-5 h-5 fill-current text-white translate-x-[2px]" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 3. YouTube Video 2: nXGMuKyVDBc */}
                <div
                  onClick={() => setActiveVideoId('nXGMuKyVDBc')}
                  className="relative rounded-2xl overflow-hidden h-[170px] w-[300px] flex-shrink-0 cursor-pointer shadow-md hover:shadow-lg group border border-slate-100"
                >
                  <img
                    src="https://img.youtube.com/vi/nXGMuKyVDBc/hqdefault.jpg"
                    alt="KENT Kitchen Appliance Video"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-11 bg-black/60 rounded-[14px] flex items-center justify-center text-white backdrop-blur-xs group-hover:scale-110 group-hover:bg-[#FF0000] transition-all duration-300 ease-out">
                      <svg className="w-5 h-5 fill-current text-white translate-x-[2px]" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 4. YouTube Video 3: sM2_7XlsMaE */}
                <div
                  onClick={() => setActiveVideoId('sM2_7XlsMaE')}
                  className="relative rounded-2xl overflow-hidden h-[170px] w-[300px] flex-shrink-0 cursor-pointer shadow-md hover:shadow-lg group border border-slate-100"
                >
                  <img
                    src="https://img.youtube.com/vi/sM2_7XlsMaE/hqdefault.jpg"
                    alt="KENT Kitchen Appliance Video"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-11 bg-black/60 rounded-[14px] flex items-center justify-center text-white backdrop-blur-xs group-hover:scale-110 group-hover:bg-[#FF0000] transition-all duration-300 ease-out">
                      <svg className="w-5 h-5 fill-current text-white translate-x-[2px]" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 5. YouTube Video 4: 3IZB1oH2VHU */}
                <div
                  onClick={() => setActiveVideoId('3IZB1oH2VHU')}
                  className="relative rounded-2xl overflow-hidden h-[170px] w-[300px] flex-shrink-0 cursor-pointer shadow-md hover:shadow-lg group border border-slate-100"
                >
                  <img
                    src="https://img.youtube.com/vi/3IZB1oH2VHU/hqdefault.jpg"
                    alt="KENT Kitchen Appliance Video"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-11 bg-black/60 rounded-[14px] flex items-center justify-center text-white backdrop-blur-xs group-hover:scale-110 group-hover:bg-[#FF0000] transition-all duration-300 ease-out">
                      <svg className="w-5 h-5 fill-current text-white translate-x-[2px]" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 6. YouTube Video 5: WxY_b1zxlcI */}
                <div
                  onClick={() => setActiveVideoId('WxY_b1zxlcI')}
                  className="relative rounded-2xl overflow-hidden h-[170px] w-[300px] flex-shrink-0 cursor-pointer shadow-md hover:shadow-lg group border border-slate-100"
                >
                  <img
                    src="https://img.youtube.com/vi/WxY_b1zxlcI/hqdefault.jpg"
                    alt="KENT Kitchen Appliance Video"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-11 bg-black/60 rounded-[14px] flex items-center justify-center text-white backdrop-blur-xs group-hover:scale-110 group-hover:bg-[#FF0000] transition-all duration-300 ease-out">
                      <svg className="w-5 h-5 fill-current text-white translate-x-[2px]" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Carousel Dot Indicators */}
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => setKitchenVideoCarouselIndex(0)}
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${kitchenVideoCarouselIndex === 0 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
                  }`}
                style={{ borderRadius: '9999px' }}
                aria-label="Slide group 1"
              />
              <button
                onClick={() => setKitchenVideoCarouselIndex(1)}
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${kitchenVideoCarouselIndex === 1 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
                  }`}
                style={{ borderRadius: '9999px' }}
                aria-label="Slide group 2"
              />
            </div>
          </section>

          {/* Main Kitchen Appliances Division Carousel Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-6 select-none overflow-hidden relative">

            {/* Sliding Track Container */}
            <div className="w-full overflow-hidden">
              <motion.div
                className="flex space-x-6 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: -320, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) {
                    setKitchenCategoryCarouselIndex(1);
                  } else if (info.offset.x > 60) {
                    setKitchenCategoryCarouselIndex(0);
                  }
                }}
                animate={{ x: -kitchenCategoryCarouselIndex * 240 }}
                transition={{ type: 'spring', damping: 26, stiffness: 170 }}
              >

                {/* Card 1: Air Fryers */}
                <div
                  onClick={() => handleNavigateToCategory('Kitchen Appliances', 'Air Fryers')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">Air Fryers</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/kitchen-appliancs/kent-digital-air-fryer-oven.webp" 
                        alt="Air Fryers" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Induction Cooktop */}
                <div
                  onClick={() => handleNavigateToCategory('Kitchen Appliances', 'Induction Cooktop')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">Induction Cooktop</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/kitchen-appliancs/kent-star-induction-cooktop-1.webp" 
                        alt="Induction Cooktop" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Mixer Grinders */}
                <div
                  onClick={() => handleNavigateToCategory('Kitchen Appliances', 'Mixer Grinders')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">Mixer Grinders</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/kitchen-appliancs/kent-truemix.webp" 
                        alt="Mixer Grinders" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

                {/* Card 4: Egg Boilers */}
                <div
                  onClick={() => handleNavigateToCategory('Kitchen Appliances', 'Electric Chopper')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">Egg Boilers</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/kitchen-appliancs/info-web-electric-chopper.webp" 
                        alt="Egg Boilers" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Carousel Dot Indicators */}
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => setKitchenCategoryCarouselIndex(0)}
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${kitchenCategoryCarouselIndex === 0 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
                  }`}
                style={{ borderRadius: '9999px' }}
                aria-label="Slide group 1"
              />
              <button
                onClick={() => setKitchenCategoryCarouselIndex(1)}
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${kitchenCategoryCarouselIndex === 1 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
                  }`}
                style={{ borderRadius: '9999px' }}
                aria-label="Slide group 2"
              />
            </div>

          </section>

          {/* Smarter Technology Healthier Living Trust Section */}
          <section className="w-full bg-white pt-8 pb-4 select-none">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#091E42] tracking-tight">
                Smarter Technology Healthier Living
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-3 font-medium leading-relaxed max-w-5xl">
                With more than two decades of innovation & trusted by millions of families, Kent brings certainty to the essentials of life.
              </p>
            </div>
          </section>

          {/* Smarter Technology Banner Image Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 select-none">
            <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition duration-300">
              <img
                src="/img-10.png"
                alt="Kent Smarter Technology Banner"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </section>

          {/* Healthier Living Videos & Catalogue Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12 select-none">
            <div className="flex flex-col sm:flex-row gap-6 justify-start items-start">
              
              {/* Card 1: PDF Catalogue */}
              <a
                href="https://www.kent.co.in/cdn/shop/files/product-catalouge.pdf?v=1781523354"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1b3d7d] rounded-2xl p-6 h-[170px] w-[300px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.01] transition duration-300 relative group overflow-hidden border border-[#0d224d]"
              >
                <div className="w-full flex justify-between items-center z-10">
                  <div className="bg-white text-[#1b3d7d] font-black text-[10px] px-2 py-0.5 tracking-wider rounded-xs border border-white/25">
                    KENT
                  </div>
                  <div className="bg-[#EC1C24] text-white text-[10px] font-black px-2 py-1 rounded flex items-center space-x-1 uppercase tracking-wider shadow-sm">
                    <span>PDF</span>
                  </div>
                </div>

                <div className="w-full flex justify-between items-end z-10">
                  <h3 className="text-sm font-bold text-white leading-tight uppercase tracking-tight text-left">
                    Product <br /> Catalogue
                  </h3>
                  <div className="w-9 h-9 bg-white text-[#1b3d7d] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                    <Download size={16} />
                  </div>
                </div>
              </a>

              {/* Card 2: YouTube Video 1 (mIERosvgaWU) */}
              <div
                onClick={() => setActiveVideoId('mIERosvgaWU')}
                className="relative rounded-2xl overflow-hidden h-[170px] w-[300px] flex-shrink-0 cursor-pointer shadow-md hover:shadow-lg group border border-slate-100"
              >
                <img
                  src="https://img.youtube.com/vi/mIERosvgaWU/hqdefault.jpg"
                  alt="KENT Healthier Living Video"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-16 h-11 bg-black/60 rounded-[14px] flex items-center justify-center text-white backdrop-blur-xs group-hover:scale-110 group-hover:bg-[#FF0000] transition-all duration-300 ease-out">
                    <svg className="w-5 h-5 fill-current text-white translate-x-[2px]" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 3: YouTube Video 2 (p-wabpiO-xM) */}
              <div
                onClick={() => setActiveVideoId('p-wabpiO-xM')}
                className="relative rounded-2xl overflow-hidden h-[170px] w-[300px] flex-shrink-0 cursor-pointer shadow-md hover:shadow-lg group border border-slate-100"
              >
                <img
                  src="https://img.youtube.com/vi/p-wabpiO-xM/hqdefault.jpg"
                  alt="KENT Healthier Living Video"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-16 h-11 bg-black/60 rounded-[14px] flex items-center justify-center text-white backdrop-blur-xs group-hover:scale-110 group-hover:bg-[#FF0000] transition-all duration-300 ease-out">
                    <svg className="w-5 h-5 fill-current text-white translate-x-[2px]" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Main Home Appliances Division Carousel Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-6 select-none overflow-hidden relative">

            {/* Sliding Track Container */}
            <div className="w-full overflow-hidden">
              <motion.div
                className="flex space-x-6 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: -320, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) {
                    setHomeCategoryCarouselIndex(1);
                  } else if (info.offset.x > 60) {
                    setHomeCategoryCarouselIndex(0);
                  }
                }}
                animate={{ x: -homeCategoryCarouselIndex * 240 }}
                transition={{ type: 'spring', damping: 26, stiffness: 170 }}
              >

                {/* Card 1: KENT Air Purifiers */}
                <div
                  onClick={() => handleNavigateToCategory('Home Appliances', 'Air Purifiers')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">KENT Air Purifiers</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/home-applicances/kent-alps-plus-uv-air-purifier-1.webp" 
                        alt="KENT Air Purifiers" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: KENT Vacuum Cleaners */}
                <div
                  onClick={() => handleNavigateToCategory('Home Appliances', 'Vacuum Cleaners')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">KENT Vacuum Cleaners</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/home-applicances/kent-roboklean-r1-robotic-vacuum-cleaner-1.webp" 
                        alt="KENT Vacuum Cleaners" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: KENT Steam Irons */}
                <div
                  onClick={() => handleNavigateToCategory('Home Appliances', 'Steam Irons')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">KENT Steam Irons</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/home-applicances/kent-swift-handheld-garment-steamer-1.webp" 
                        alt="KENT Steam Irons" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

                {/* Card 4: KENT Dew Humidifier */}
                <div
                  onClick={() => handleNavigateToCategory('Home Appliances', 'Dew Humidifier')}
                  className="bg-[#e8f4fc] rounded-2xl p-6 h-[270px] w-[285px] flex-shrink-0 flex flex-col justify-between items-start cursor-pointer hover:shadow-lg hover:scale-[1.02] transition duration-300 relative group overflow-hidden border border-sky-100/50"
                >
                  <span className="text-sm font-bold text-[#091E42] relative z-10">KENT Dew Humidifier</span>

                  {/* Visual mockup center */}
                  <div className="absolute inset-0 flex items-center justify-center pt-6 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-52 h-52 flex items-center justify-center p-2 relative select-none">
                      <img 
                        src="/home-applicances/kent-dew-ultrasonic-humidifier-1.webp" 
                        alt="KENT Dew Humidifier" 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Explore button - animates from bottom on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <div className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-[11px] font-bold py-2.5 px-5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <span>Explore Now</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Carousel Dot Indicators */}
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => setHomeCategoryCarouselIndex(0)}
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${homeCategoryCarouselIndex === 0 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
                  }`}
                style={{ borderRadius: '9999px' }}
                aria-label="Slide group 1"
              />
              <button
                onClick={() => setHomeCategoryCarouselIndex(1)}
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${homeCategoryCarouselIndex === 1 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
                  }`}
                style={{ borderRadius: '9999px' }}
                aria-label="Slide group 2"
              />
            </div>

          </section>

          {/* Featured Products Trust Section */}
          <section className="w-full bg-white pt-8 pb-4 select-none">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#091E42] tracking-tight">
                Featured Products
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-3 font-medium leading-relaxed max-w-5xl">
                Discover KENT's latest innovations, engineered to deliver superior purification, smarter performance, and dependable everyday use, designed for modern Indian homes.
              </p>
            </div>
          </section>

          {/* Featured Products Banner Image Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 select-none">
            <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition duration-300">
              <img
                src="/img-11.png"
                alt="Kent Featured Products Banner"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </section>

          {/* Why Millions Choose KENT Section */}
          <section className="w-full bg-[#f4f8fc] py-10 md:py-12 select-none border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#091E42] tracking-tight mb-8">
                Why Millions Choose KENT
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                
                {/* Feature 1: KENT Advantage */}
                <div className="flex items-start space-x-4">
                  <div className="p-1 text-[#1b3d7d] flex-shrink-0">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 2l.8 1.8L21 4.5l-1.8.8L18.4 7l-.8-1.8L16 4.5l1.8-.8L19 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-[#091E42] tracking-tight">
                      KENT Advantage
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 mt-1 font-medium leading-relaxed">
                      Largest Manufacturer & Market Leader in RO Water Purifier with Large Sales and Service Network
                    </p>
                  </div>
                </div>

                {/* Feature 2: Trusted Brand */}
                <div className="flex items-start space-x-4">
                  <div className="p-1 text-[#1b3d7d] flex-shrink-0">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12l2 2 4.5-4.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-[#091E42] tracking-tight">
                      Trusted Brand
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 mt-1 font-medium leading-relaxed">
                      Honored with Numerous International Certifications and Awards
                    </p>
                  </div>
                </div>

                {/* Feature 3: 25 Years of Trust */}
                <div className="flex items-start space-x-4">
                  <div className="p-1 flex-shrink-0">
                    <img src="/icons/hand-shake.png" alt="25 Years of Trust" className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-[#091E42] tracking-tight">
                      25 Years of Trust by Millions
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 mt-1 font-medium leading-relaxed">
                      Most Preferred RO & Home Appliances Brands in India
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Bestsellers Section */}
          <Bestsellers
            onBuyNow={handleBuyNow}
            onNavigateToCategory={handleNavigateToCategory}
            onOpenDemo={(prod) => {
              setEnquiryProduct(prod);
              setIsDemoOpen(true);
            }}
            onSelectProduct={(prod) => {
              navigate(`/products/${prod.id}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Get Started with KENT Section */}
          <section className="w-full bg-white py-10 md:py-14 select-none">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#091E42] tracking-tight mb-8">
                Get Started with KENT
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

                {/* Card 1: KENT Store */}
                <div
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-[#f2f6fa] hover:bg-[#e4ebf5] rounded-xl p-5 flex items-center space-x-5 cursor-pointer transition duration-200 border border-slate-100/60 group"
                >
                  <div className="w-11 h-11 flex items-center justify-center text-[#1b3d7d] flex-shrink-0">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="text-sm md:text-base font-bold text-[#091E42] group-hover:text-[#1b3d7d] transition-colors">
                    KENT
                  </span>
                </div>

                {/* Card 2: Amazon */}
                <a
                  href="https://www.amazon.in/stores/KENT/page/8949827B-1C5C-4066-A583-E189280EFAFB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#f2f6fa] hover:bg-[#e4ebf5] rounded-xl p-5 flex items-center space-x-5 cursor-pointer transition duration-200 border border-slate-100/60 group"
                >
                  <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
                    <img src="/icons/social.png" alt="Amazon" className="w-8 h-8 object-contain" />
                  </div>
                  <span className="text-sm md:text-base font-bold text-[#091E42] group-hover:text-[#1b3d7d] transition-colors">
                    Amazon
                  </span>
                </a>

                {/* Card 3: Flipkart */}
                <a
                  href="https://www.flipkart.com/search?q=kent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#f2f6fa] hover:bg-[#e4ebf5] rounded-xl p-5 flex items-center space-x-5 cursor-pointer transition duration-200 border border-slate-100/60 group"
                >
                  <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-8 bg-[#FFE500] rounded-md flex items-center justify-center p-1 shadow-xs border border-amber-300">
                      <span className="text-[#2874F0] font-black text-lg italic leading-none">f</span>
                    </div>
                  </div>
                  <span className="text-sm md:text-base font-bold text-[#091E42] group-hover:text-[#1b3d7d] transition-colors">
                    Flipkart
                  </span>
                </a>

                {/* Card 4: Request a Demo */}
                <div
                  onClick={() => setIsDemoOpen(true)}
                  className="bg-[#f2f6fa] hover:bg-[#e4ebf5] rounded-xl p-5 flex items-center space-x-5 cursor-pointer transition duration-200 border border-slate-100/60 group"
                >
                  <div className="w-11 h-11 flex items-center justify-center text-[#1b3d7d] flex-shrink-0">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                  <span className="text-sm md:text-base font-bold text-[#091E42] group-hover:text-[#1b3d7d] transition-colors">
                    Request a Demo
                  </span>
                </div>

                {/* Card 5: Find a Dealer */}
                <div
                  onClick={() => {
                    navigate('/dealer-locator');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#f2f6fa] hover:bg-[#e4ebf5] rounded-xl p-5 flex items-center space-x-5 cursor-pointer transition duration-200 border border-slate-100/60 group"
                >
                  <div className="w-11 h-11 flex items-center justify-center text-[#1b3d7d] flex-shrink-0">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 7v1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m0 1a3 3 0 006 0V7m-15 0h18M5 7l1-4h12l1 4M4 10v11m16-11v11" />
                    </svg>
                  </div>
                  <span className="text-sm md:text-base font-bold text-[#091E42] group-hover:text-[#1b3d7d] transition-colors">
                    Find a Dealer
                  </span>
                </div>

                {/* Card 6: Become a Partner */}
                <div
                  onClick={() => {
                    navigate('/become-trade-partner');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#f2f6fa] hover:bg-[#e4ebf5] rounded-xl p-5 flex items-center space-x-5 cursor-pointer transition duration-200 border border-slate-100/60 group"
                >
                  <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
                    <img src="/icons/hand-shake.png" alt="Become a Partner" className="w-8 h-8 object-contain" />
                  </div>
                  <span className="text-sm md:text-base font-bold text-[#091E42] group-hover:text-[#1b3d7d] transition-colors">
                    Become a Partner
                  </span>
                </div>

              </div>
            </div>
          </section>

        </>
      )}

      {/* 10. Footer component */}
      <Footer />



      {/* Book Demo / Product Enquiry Modal */}
      <BookDemoModal
        isOpen={isDemoOpen}
        onClose={() => {
          setIsDemoOpen(false);
          setEnquiryProduct(null);
        }}
        selectedProduct={enquiryProduct}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* YouTube Video Lightbox Modal */}
      {activeVideoId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition cursor-pointer z-10"
            >
              <X size={20} />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setActiveVideoId(null)}></div>
        </div>
      )}

      {/* Floating Sidebar Sticky Action Buttons */}
      <SidebarActions onDemoOpen={() => setIsDemoOpen(true)} />

    </div>
  );
}

export default App;
