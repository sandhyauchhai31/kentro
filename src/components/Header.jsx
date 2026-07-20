import React, { useState, useEffect, useRef } from 'react';
import { Search, User, Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({
  onDemoOpen,
  onSearchOpen,
  onProfileOpen,
  onSubCategoryClick,
  currentUser
}) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const headerRef = useRef(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isUserPopoverOpen, setIsUserPopoverOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem('kentro-lang-name') || 'English');

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'हिंदी', code: 'hi' },
    { name: 'বাংলা', code: 'bn' },
    
    { name: 'नेपाली', code: 'ne' },
    { name: 'मराठी', code: 'mr' },
    { name: 'ਪੰਜਾਬੀ', code: 'pa' },
    { name: 'தமிழ்', code: 'ta' },
    { name: 'ಕನ್ನಡ', code: 'kn' },
    { name: 'తెలుగు', code: 'te' },
    { name: 'اردو', code: 'ur' },
    { name: 'Español', code: 'es' },
    { name: 'Français', code: 'fr' }
  ];

  const handleLanguageChange = (lang) => {
    localStorage.setItem('kentro-lang-name', lang.name);
    setCurrentLang(lang.name);
    setLangDropdownOpen(false);

    if (lang.code === 'en') {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=localhost; path=/;";
    } else {
      document.cookie = `googtrans=/en/${lang.code}; path=/;`;
      document.cookie = `googtrans=/en/${lang.code}; domain=localhost; path=/;`;
    }
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside listener to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveMenu(null);
        setLangDropdownOpen(false);
        setIsUserPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = {
    'Water Purifiers': [
      'RO Purifiers',
      'Hydrogen Rich Water',
      'UV Purifiers',
      'Gravity Purifiers',
      'Commercial Purifier'
    ],
    'Water Softeners': [
      'KENT Autosoft',
      'KENT Iron Removal Filters',
      'KENT Sand Filters',
      'KENT Bathroom Water Softener',
      'KENT Pressure Boosting System'
    ],
    'Kitchen Appliances': [
      'Air Fryers',
      'Induction Cooktop',
      'Mixer Grinders',
      'Hand Blenders',
      'Electric Chopper'
    ],
    'Home Appliances': [
      'Air Purifiers',
      'Vacuum Cleaners',
      'Dew Humidifier',
      'Steam Irons'
    ],
    'New Energy': [
      'Lithium Batteries',
      'Hybrid Inverters'
    ]
  };

  const handleMenuClick = (catName) => {
    if (activeMenu === catName) {
      setActiveMenu(null);
    } else {
      setActiveMenu(catName);
    }
  };

  const renderProductMockup = (type) => {
    switch (type) {
      case 'RO Purifiers':
        return (
          <img 
            src="/water-purifier/ro-1.webp" 
            alt="RO Purifiers" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'Hydrogen Rich Water':
        return (
          <img 
            src="/water-purifier/hydrogen-rich-water.webp" 
            alt="Hydrogen Rich Water" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'UV Purifiers':
        return (
          <img 
            src="/water-purifier/uv purifier.webp" 
            alt="UV Purifiers" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'Gravity Purifiers':
        return (
          <img 
            src="/water-purifier/gravity purifier.webp" 
            alt="Gravity Purifiers" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'Commercial Purifier':
        return (
          <img 
            src="/water-purifier/commercial-purifier.webp" 
            alt="Commercial Purifier" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      // Softeners
      case 'KENT Autosoft':
        return (
          <img 
            src="/water-softner/kent-auto-soft.webp" 
            alt="KENT Autosoft" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'KENT Iron Removal Filters':
        return (
          <img 
            src="/water-softner/kent-iron-removal-filter.webp" 
            alt="KENT Iron Removal Filters" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'KENT Sand Filters':
        return (
          <img 
            src="/water-softner/kent-sand-filter.webp" 
            alt="KENT Sand Filters" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'KENT Bathroom Water Softener':
        return (
          <img 
            src="/water-softner/kent-bathroom-water-softener-1.webp" 
            alt="KENT Bathroom Water Softener" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'KENT Pressure Boosting System':
        return (
          <img 
            src="/water-softner/kent-pressure-boosting-system.webp" 
            alt="KENT Pressure Boosting System" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      // Kitchen
      case 'Air Fryers':
        return (
          <img 
            src="/kitchen-appliancs/kent-digital-air-fryer-oven.webp" 
            alt="Air Fryers" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'Induction Cooktop':
        return (
          <img 
            src="/kitchen-appliancs/kent-star-induction-cooktop-1.webp" 
            alt="Induction Cooktop" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'Mixer Grinders':
        return (
          <img 
            src="/kitchen-appliancs/kent-truemix.webp" 
            alt="Mixer Grinders" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'Hand Blenders':
        return (
          <img 
            src="/kitchen-appliancs/KENT-Hand_Blender-Chopper.webp" 
            alt="Hand Blenders" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'Electric Chopper':
        return (
          <img 
            src="/kitchen-appliancs/info-web-electric-chopper.webp" 
            alt="Electric Chopper" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      // Home
      case 'Air Purifiers':
        return (
          <img 
            src="/home-applicances/kent-alps-plus-uv-air-purifier-1.webp" 
            alt="Air Purifiers" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'Vacuum Cleaners':
        return (
          <img 
            src="/home-applicances/kent-roboklean-r1-robotic-vacuum-cleaner-1.webp" 
            alt="Vacuum Cleaners" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'Dew Humidifier':
        return (
          <img 
            src="/home-applicances/kent-dew-ultrasonic-humidifier-1.webp" 
            alt="Dew Humidifier" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'Steam Irons':
        return (
          <img 
            src="/home-applicances/kent-swift-handheld-garment-steamer-1.webp" 
            alt="Steam Irons" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'Vegetable Cleaners':
        return (
          <div className="w-12 h-16 bg-slate-50 border border-slate-200 rounded-lg shadow p-1 flex flex-col justify-between items-center select-none">
            <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/25 rounded flex items-center justify-center">
              <span className="text-[5px] text-emerald-600 font-bold leading-none">OZONE</span>
            </div>
            <div className="w-5 h-1.5 bg-slate-300 rounded-xs" />
          </div>
        );
      // Solar
      case 'Lithium Batteries':
        return (
          <img 
            src="/new-energy/kent-li-battery-a6-1280-1.webp" 
            alt="Lithium Batteries" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      case 'Hybrid Inverters':
        return (
          <img 
            src="/new-energy/Inverter.webp" 
            alt="Hybrid Inverters" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        );
      default:
        return <div className="w-10 h-14 bg-slate-200 rounded select-none" />;
    }
  };

  return (
    <header
      ref={headerRef}
      onMouseLeave={() => setActiveMenu(null)}
      className={`w-full bg-white z-40 border-b border-slate-100 transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 shadow-md py-2' : 'relative py-4'
        }`}
    >
      <div className="w-full px-6 md:px-12 flex justify-between items-center">

        {/* Left Side: Logo & Main Navigation Categories */}
        <div className="flex items-center space-x-6 lg:space-x-8">

          {/* Replicated KENT logo */}
          <Link to="/" className="flex flex-col items-center select-none group mr-2">
            <div className="bg-[#0b3178] text-white font-black text-3xl px-6 py-1 rounded-xs tracking-wider relative flex items-center justify-center">
              KENT
              <span className="absolute top-1 right-1.5 text-[7px] font-normal leading-none">®</span>
            </div>
            <div className="w-full border-t border-b border-[#0b3178] py-0.5 mt-1 text-[6.5px] font-extrabold text-[#0b3178] tracking-widest text-center uppercase leading-none">
              House of Purity
            </div>
          </Link>

          {/* Desktop Categories Menu (Hover & Click megamenu) */}
          <nav className="hidden lg:flex space-x-3.5 xl:space-x-7 h-full">
            {Object.keys(categories).map((catName) => {
              const isActive = activeMenu === catName;
              return (
                <div key={catName} className="relative flex items-center py-2">
                  <button
                    onMouseEnter={() => setActiveMenu(catName)}
                    onClick={() => handleMenuClick(catName)}
                    className={`relative pb-3.5 pt-1.5 text-[13px] xl:text-[15px] font-semibold transition duration-200 focus:outline-none cursor-pointer ${isActive ? 'text-[#0b3178]' : 'text-slate-700 hover:text-[#0b3178]'
                      }`}
                  >
                    <span className="whitespace-nowrap">{catName}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0b3178] rounded-full" />
                    )}
                  </button>
                </div>
              );
            })}
          </nav>

        </div>

        {/* Right Side: Two-Row Stacked Layout */}
        <div className="hidden lg:flex flex-col items-end space-y-2.5">

          {/* Row 1: Top Utility Links */}
          <div className="flex items-center space-x-3 xl:space-x-5 text-xs xl:text-[13.5px] text-slate-700 font-semibold">
            <Link to="/about-us" className="hover:text-[#0b3178] transition whitespace-nowrap">About Us</Link>
            <Link to="/become-trade-partner" className="hover:text-[#0b3178] transition whitespace-nowrap">Become a Trade Partner</Link>
            <Link to="/service" className="hover:text-[#0b3178] transition whitespace-nowrap">Customer Service</Link>

            <Link to="/dealer-locator" className="hover:text-[#0b3178] transition whitespace-nowrap">Dealer Locator</Link>
             
             <div className="relative">
               <button 
                 onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                 className="flex items-center space-x-1 hover:text-[#0b3178] transition focus:outline-none whitespace-nowrap cursor-pointer"
               >
                 <span>{currentLang}</span>
                 <ChevronDown size={12} className={`text-slate-400 transform transition duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
               </button>

               {langDropdownOpen && (
                 <div className="absolute right-0 mt-2.5 w-40 bg-white border border-slate-100 rounded-xl shadow-lg py-2 z-[120] text-left">
                   <div className="max-h-[300px] overflow-y-auto">
                     {languages.map((lang) => (
                       <button
                         key={lang.code}
                         onClick={() => handleLanguageChange(lang)}
                         className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer ${
                           currentLang === lang.name ? 'text-[#1a3673] bg-blue-50/40' : 'text-slate-700'
                         }`}
                       >
                         {lang.name}
                       </button>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           </div>

          {/* Row 2: Main Header Action Controls */}
          <div className="flex items-center space-x-5">
            {/* Search Input Button */}
            <button
              onClick={onSearchOpen}
              className="flex items-center space-x-1.5 text-[14px] font-semibold text-slate-700 hover:text-[#0b3178] focus:outline-none"
            >
              <Search size={18} className="text-slate-600" />
              <span>Search</span>
            </button>

            {/* User account */}
            {currentUser ? (
              <Link
                to="/account"
                className="text-slate-700 hover:text-[#0b3178] p-1 focus:outline-none"
                aria-label="User Account"
              >
                <User size={18} className="text-slate-600" />
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserPopoverOpen(!isUserPopoverOpen)}
                  className="text-slate-700 hover:text-[#0b3178] p-1 focus:outline-none cursor-pointer"
                  aria-label="User Account"
                >
                  <User size={18} className="text-slate-600" />
                </button>
                {isUserPopoverOpen && (
                  <div className="absolute right-[-10px] mt-3.5 w-60 bg-white border border-slate-100 rounded-2xl shadow-xl p-6 z-50 flex flex-col items-center animate-in fade-in slide-in-from-top-1.5 duration-200">
                    <Link
                      to="/login"
                      onClick={() => setIsUserPopoverOpen(false)}
                      className="w-full bg-[#0b3178] hover:bg-[#072457] text-white text-center font-bold text-[15px] py-3 px-8 rounded-full shadow-md transition duration-200 whitespace-nowrap block"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setIsUserPopoverOpen(false)}
                      className="mt-4 text-[#0b3178] hover:underline font-extrabold text-[15px] flex items-center justify-center gap-1 transition"
                    >
                      <span>Create Account</span>
                      <span className="text-sm">↗</span>
                    </Link>
                  </div>
                )}
              </div>
            )}


          </div>

        </div>

        {/* Mobile Navbar Hamburger Controls */}
        <div className="lg:hidden flex items-center space-x-4">


          <button
            className="p-2 text-slate-600 hover:text-[#0b3178] focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Full-Width Horizontal Megamenu (opens on active click) */}
      {activeMenu && (
        <div className="absolute left-0 top-full w-full bg-white border-b border-slate-200 shadow-xl z-50 py-10 transition-all duration-300 animate-in fade-in slide-in-from-top-1.5 duration-200">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-center items-center gap-12 flex-wrap">
            {categories[activeMenu].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveMenu(null);
                  if (onSubCategoryClick) {
                    onSubCategoryClick(activeMenu, item);
                  }
                }}
                className="flex flex-col items-center space-y-4 group hover:scale-105 transition duration-300 cursor-pointer focus:outline-none"
              >
                {/* Visual mockup container representation */}
                <div className="w-24 h-28 bg-slate-50 rounded-2xl flex items-center justify-center p-2 border border-slate-100 group-hover:bg-slate-100 group-hover:shadow-xs transition duration-300">
                  {renderProductMockup(item)}
                </div>

                {/* Label text matching image styling */}
                <span className="text-xs font-bold text-[#091E42] group-hover:text-[#0b3178] transition text-center uppercase tracking-wide">
                  {item}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs transition-all duration-300">
          <div className="absolute right-0 top-0 w-80 h-full bg-white shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <span className="font-extrabold text-[#091E42] text-lg">Shop Categories</span>
                <button className="text-slate-500 hover:text-[#0b3178]" onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              <div className="space-y-4">
                {Object.keys(categories).map((catName) => (
                  <div key={catName} className="border-b border-slate-50 pb-2">
                    <span className="font-extrabold text-[#0b3178] text-sm block mb-1.5">{catName}</span>
                    <ul className="pl-3 space-y-1">
                      {categories[catName].map((item) => (
                        <li key={item}>
                          <button
                            className="text-xs text-slate-500 hover:text-[#0b3178] py-1 block text-left w-full focus:outline-none cursor-pointer"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              if (onSubCategoryClick) {
                                onSubCategoryClick(catName, item);
                              }
                            }}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              {currentUser ? (
                <Link
                  to="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-[#0b3178] hover:bg-[#072457] text-white py-3 rounded-xl font-bold shadow-md transition flex items-center justify-center space-x-2"
                >
                  <User size={16} />
                  <span>My Account</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-[#0b3178] hover:bg-[#072457] text-white py-3 rounded-xl font-bold shadow-md transition flex items-center justify-center space-x-2"
                >
                  <User size={16} />
                  <span>Sign In</span>
                </Link>
              )}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onDemoOpen();
                }}
                className="w-full bg-[#FF5A00] hover:bg-[#d44b00] text-white py-3 rounded-xl font-bold shadow-md transition cursor-pointer"
              >
                Book Free Demo
              </button>
              <div className="flex justify-around text-slate-400 text-xs py-2">
                <a href="#partner" className="hover:text-[#0b3178]">Partner</a>
                <span>•</span>
                <a href="#service" className="hover:text-[#0b3178]">Helpline</a>
                <span>•</span>
                <button className="hover:text-[#0b3178]">English</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
