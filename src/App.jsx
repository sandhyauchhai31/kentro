import React, { useState } from 'react';
import { ShieldCheck, Award, Users, Wrench, Search, X, CheckCircle, HelpCircle, ArrowRight, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

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
  
  const [carouselIndex, setCarouselIndex] = useState(0);

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

  const isCategoryView = location.pathname.startsWith('/category');

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
      ) : (
        <>
          {/* 2. Hero Slider component */}
          <HeroSlider />

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

          {/* 2c. Campaign Banner Image Placeholder */}
          <section className="max-w-7xl mx-auto px-4 md:px-8 pb-10 select-none">
            <div className="w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200/60 hover:shadow-xl transition duration-300">
              <img 
                src="https://placehold.co/1500x500" 
                alt="Campaign Banner Placeholder" 
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </section>

          {/* 3. Why Choose Kent (Trust Stats Grid) */}
          <section className="bg-slate-50 border-b border-slate-100 py-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center select-none">
              <div className="flex flex-col items-center space-y-2 p-4">
                <Award size={28} className="text-brand-orange" />
                <h3 className="font-extrabold text-[#091E42] text-sm">26+ Years Legacy</h3>
                <p className="text-[11px] text-slate-500">Pioneers of Water Purification in India</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 border-l border-slate-200">
                <ShieldCheck size={28} className="text-[#008DDF]" />
                <h3 className="font-extrabold text-[#091E42] text-sm">Free Installation</h3>
                <p className="text-[11px] text-slate-500">Service assistance across all pin codes</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 border-l border-slate-200">
                <Users size={28} className="text-emerald-500" />
                <h3 className="font-extrabold text-[#091E42] text-sm">10M+ Happy Users</h3>
                <p className="text-[11px] text-slate-500">Trusted by families nationwide</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 border-l border-slate-200">
                <Wrench size={28} className="text-indigo-500" />
                <h3 className="font-extrabold text-[#091E42] text-sm">Pan-India Support</h3>
                <p className="text-[11px] text-slate-500">Over 1,500 service centers nationwide</p>
              </div>
            </div>
          </section>

          {/* 4. Product Categories Grid Showcase */}
          <section className="py-16 md:py-24 bg-white border-b border-slate-100 select-none">
            <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
              <div className="max-w-xl mx-auto mb-16">
                <span className="text-brand-blue font-bold text-xs uppercase tracking-widest">Our Solutions</span>
                <h3 className="text-2xl md:text-4xl font-extrabold text-[#091E42] mt-2">Explore the KENT Range</h3>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  Choose from our wide catalog of housewares engineered with smart diagnostic sensors and advanced environmental filtration.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categoriesData.map((cat) => (
                  <div 
                    key={cat.title}
                    onClick={() => handleNavigateToCategory(cat.title, subCategoriesMap[cat.title]?.[0] || '')}
                    className="relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer h-72 border border-slate-100"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.bgClass} opacity-90 group-hover:opacity-95 transition-opacity`} />
                    <div className="absolute inset-0 p-8 flex flex-col justify-between text-left text-white z-10">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">{cat.stats}</span>
                        <h4 className="text-xl font-black mt-3 leading-snug">{cat.title}</h4>
                        <p className="text-[10px] text-slate-100 mt-1.5 font-medium">{cat.tagline}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-xs font-bold text-white group-hover:translate-x-1.5 transition-transform duration-200">
                        <span>Explore Range</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Bestsellers grid */}
          <Bestsellers onAddToCart={handleAddToCart} />

          {/* 6. Smart Diagnostic quiz section */}
          <ProductQuiz onNavigateToCategory={handleNavigateToCategory} />

          {/* 7. Technical superiority show */}
          <TechShowcase />

          {/* 8. Verified credentials certified section */}
          <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-100 select-none">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="text-center max-w-xl mx-auto mb-12">
                <span className="text-brand-blue font-bold text-xs uppercase tracking-widest">Validated Quality</span>
                <h3 className="text-xl md:text-3xl font-extrabold text-[#091E42] mt-2">Certified for Excellence</h3>
                <p className="text-xs text-slate-500 mt-2">
                  KENT purifiers are rigorously tested and certified by the world's most prestigious quality evaluation agencies.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
                  <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-3 font-extrabold text-sm border border-blue-100 shadow-sm">
                    WQA
                  </div>
                  <h4 className="font-extrabold text-[#091E42] text-xs">WQA Gold Seal</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Tested for compliance against NSF/ANSI standards.</p>
                </div>
                
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs border-l-0 md:border-l border-slate-100">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 font-extrabold text-sm border border-indigo-100 shadow-sm">
                    NSF
                  </div>
                  <h4 className="font-extrabold text-[#091E42] text-xs">NSF International</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Global standard mark for public health and safety.</p>
                </div>

                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs border-l-0 md:border-l border-slate-100">
                  <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3 font-extrabold text-sm border border-cyan-100 shadow-sm">
                    CE
                  </div>
                  <h4 className="font-extrabold text-[#091E42] text-xs">CE Certification</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Approved for conforming to safety standards in EU.</p>
                </div>

                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs border-l-0 md:border-l border-slate-100">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 font-extrabold text-sm border border-emerald-100 shadow-sm">
                    TUV
                  </div>
                  <h4 className="font-extrabold text-[#091E42] text-xs">TUV Certified</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Verified production and safety compliance audits.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 9. Service Reservation Request Form */}
          <section className="py-16 md:py-24 bg-white border-t border-slate-100 select-none">
            <div className="max-w-2xl mx-auto px-4 text-center">
              <div className="mb-10">
                <span className="text-brand-blue font-bold text-xs uppercase tracking-widest">Support Portal</span>
                <h3 className="text-xl md:text-3xl font-extrabold text-[#091E42] mt-2">Book Free Installation & Demo</h3>
                <p className="text-xs text-slate-500 mt-2">
                  Enter details to receive reservation calls from certified service technicians within 24 hours.
                </p>
              </div>

              {serviceSuccess ? (
                <div className="bg-green-50 text-green-700 p-6 rounded-3xl border border-green-100 space-y-2 flex flex-col items-center">
                  <UserCheck size={28} className="text-green-500" />
                  <h4 className="font-extrabold text-sm">Request Submitted Successfully!</h4>
                  <p className="text-xs">A service representative will call you shortly to confirm dates.</p>
                </div>
              ) : (
                <form onSubmit={handleServiceSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      required
                      value={serviceForm.name}
                      onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0b3178] transition"
                    />
                    <input 
                      type="tel" 
                      required
                      value={serviceForm.phone}
                      onChange={(e) => setServiceForm({ ...serviceForm, phone: e.target.value })}
                      placeholder="Mobile Phone"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0b3178] transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <select 
                      value={serviceForm.type}
                      onChange={(e) => setServiceForm({ ...serviceForm, type: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0b3178] cursor-pointer"
                    >
                      <option>Installation Request</option>
                      <option>Free Home Demo</option>
                      <option>Maintenance Service</option>
                    </select>
                    
                    <input 
                      type="text" 
                      value={serviceForm.message}
                      onChange={(e) => setServiceForm({ ...serviceForm, message: e.target.value })}
                      placeholder="Additional details (optional)"
                      className="w-full sm:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0b3178] transition"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={serviceLoading}
                    className="w-full bg-[#0b3178] hover:bg-[#082255] text-white py-3.5 rounded-full font-bold text-xs shadow-md transition cursor-pointer text-center"
                  >
                    {serviceLoading ? 'Submitting request...' : 'Schedule Service Booking'}
                  </button>
                </form>
              )}
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

    </div>
  );
}

export default App;
