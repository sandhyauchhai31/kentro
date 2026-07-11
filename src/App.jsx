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
import CartDrawer from './components/CartDrawer';
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
  const [videoCarouselIndex, setVideoCarouselIndex] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const activeCategory = queryParams.get('cat') || '';
  const activeSubCategory = queryParams.get('sub') || '';

  const subCategoriesMap = {
    'Water Purifiers': ['RO Purifiers', 'Hydrogen Rich Water', 'UV Purifiers', 'Gravity Purifiers', 'Commercial Purifier'],
    'Water Softeners': ['Bathroom Softeners', 'Washing Machine Softeners', 'Automatic Softeners'],
    'Kitchen Appliances': ['Air Fryers', 'Cold Pressed Juicers', 'Bread Makers', 'Multi Cookers'],
    'Home Appliances': ['Air Purifiers', 'Vacuum Cleaners', 'Vegetable Cleaners'],
    'New Energy': ['Solar Panels', 'Solar Inverters']
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
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
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
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
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
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
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
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${
                  videoCarouselIndex === 0 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
                }`}
                style={{ borderRadius: '9999px' }}
                aria-label="Slide group 1"
              />
              <button 
                onClick={() => setVideoCarouselIndex(1)}
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${
                  videoCarouselIndex === 1 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
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
                    <div className="w-24 h-32 bg-slate-900 rounded-xl border border-slate-700 relative overflow-hidden flex flex-col justify-between p-2 shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <div className="h-6 w-full bg-slate-800 rounded border-b border-slate-700 flex justify-between items-center px-1">
                        <span className="text-[6px] text-[#008DDF] font-black">KENT</span>
                        <div className="w-2 h-2 bg-[#008DDF]/10 rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-[#008DDF] rounded-full" />
                        </div>
                      </div>
                      <div className="flex-grow w-full flex items-center justify-center">
                        <div className="w-2 h-14 bg-cyan-400/40 rounded-full" />
                      </div>
                      <div className="h-4 w-full bg-slate-855 border-t border-slate-700 rounded-b flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#008DDF] rounded-full" />
                      </div>
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
                    <div className="w-24 h-32 bg-slate-900 rounded-xl border border-slate-700 relative overflow-hidden flex flex-col justify-between p-2 shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <div className="h-6 w-full bg-slate-800 rounded border-b border-slate-700 flex justify-between items-center px-1">
                        <span className="text-[6px] text-amber-500 font-bold">UV SECURE</span>
                      </div>
                      <div className="flex-grow w-full bg-slate-800/40 p-1 flex flex-col justify-end relative">
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-5 bg-amber-600 rounded-t-sm flex items-end justify-center shadow-xs">
                          <div className="w-2.5 h-1.5 bg-amber-500 rounded-full" />
                        </div>
                      </div>
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
                    <div className="w-20 h-32 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <div className="w-12 h-2.5 bg-slate-100 rounded-t-md border border-slate-200" />
                      <div className="w-14 h-10 bg-cyan-200/50 border-x border-b border-slate-200 rounded-b-xs" />
                      <div className="w-16 h-2 bg-slate-100 border border-slate-200 shadow-xs" />
                      <div className="w-16 h-12 bg-cyan-350/40 border-x border-b border-slate-200 relative flex flex-col justify-between p-1">
                        <div className="w-4 h-4 bg-white rounded-full border border-slate-200 mx-auto flex items-center justify-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        </div>
                        <div className="w-2.5 h-3 bg-slate-200 rounded-b-xs mx-auto mt-auto border border-slate-300" />
                      </div>
                      <div className="w-18 h-3.5 bg-slate-100 rounded-b-lg border border-slate-200 shadow-xs" />
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
                    <div className="w-24 h-32 bg-slate-800 border-2 border-slate-700 rounded-xl relative overflow-hidden flex flex-col justify-between p-2.5 shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <div className="w-full flex justify-between items-center text-[7px] text-cyan-300 font-bold select-none leading-none">
                        <span>HYDROGEN +</span>
                      </div>
                      <div className="flex-grow flex items-center justify-center relative my-1">
                        <div className="w-8 h-12 bg-white/70 border border-slate-350 rounded-b flex flex-col justify-end p-0.5 relative z-10 shadow-xs">
                          <div className="w-full h-8 bg-cyan-200/50 rounded-b-xs" />
                        </div>
                        <span className="absolute left-1 top-0 bg-[#008DDF] text-white text-[7px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center scale-90 border border-white">H₂</span>
                      </div>
                      <div className="h-3 w-full bg-slate-900 border-t border-slate-700 rounded-b flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#008DDF] rounded-full animate-ping" />
                      </div>
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
                    <div className="w-14 h-[105px] bg-slate-900 border-2 border-slate-750 rounded-xl relative overflow-hidden flex flex-col justify-between p-1.5 shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-7 bg-slate-950 border border-slate-800 rounded-md flex flex-col justify-center items-center text-[4.5px] text-cyan-400 font-mono select-none leading-none">
                        <span>250 LPH</span>
                        <div className="w-3.5 h-0.5 bg-cyan-500/50 rounded-full mt-0.5 animate-pulse" />
                      </div>
                      <div className="flex-grow flex items-center justify-center relative py-1">
                        <div className="w-1.5 h-3 bg-slate-400 rounded-b-xs" />
                      </div>
                      <div className="w-full h-8 bg-slate-950 border-t border-slate-800 rounded-b-md flex justify-around items-center px-1">
                        <div className="w-1.5 h-1.5 bg-[#008DDF]/80 rounded-full animate-ping" />
                      </div>
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
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${
                  carouselIndex === 0 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
                }`}
                style={{ borderRadius: '9999px' }}
                aria-label="Slide group 1"
              />
              <button 
                onClick={() => setCarouselIndex(1)}
                className={`transition-all duration-300 focus:outline-none cursor-pointer ${
                  carouselIndex === 1 ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
                }`}
                style={{ borderRadius: '9999px' }}
                aria-label="Slide group 2"
              />
            </div>

          </section>

          

          {/* Hard Water Converter Trust Section */}
          <section className="w-full bg-[#f4f8fc] border-t border-slate-100 py-12 select-none">
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

        </>
      )}

      {/* 10. Footer component */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Book Demo Modal */}
      <BookDemoModal 
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
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
