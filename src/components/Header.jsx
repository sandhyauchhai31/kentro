import React, { useState, useEffect, useRef } from 'react';
import { Search, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({
  onCartToggle,
  cartCount,
  onDemoOpen,
  onSearchOpen,
  onProfileOpen,
  onSubCategoryClick
}) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const headerRef = useRef(null);

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
      'Bathroom Softeners',
      'Washing Machine Softeners',
      'Automatic Softeners'
    ],
    'Kitchen Appliances': [
      'Air Fryers',
      'Cold Pressed Juicers',
      'Bread Makers',
      'Multi Cookers'
    ],
    'Home Appliances': [
      'Air Purifiers',
      'Vacuum Cleaners',
      'Vegetable Cleaners'
    ],
    'New Energy': [
      'Solar Panels',
      'Solar Inverters'
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
          <div className="w-14 h-18 bg-slate-900 rounded-lg shadow border border-slate-800 p-1 flex flex-col justify-between relative select-none">
            <span className="text-[4px] text-[#008DDF] font-black leading-none">KENT</span>
            <div className="h-4 w-full bg-slate-800 border border-slate-700/60 rounded-xs flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#FF5A00] rounded-full animate-pulse" />
            </div>
            <div className="h-5 w-full bg-gradient-to-t from-blue-900/40 to-slate-850 rounded-xs flex items-end justify-center">
              <div className="w-6 h-0.5 bg-blue-400 rounded-full mb-0.5" />
            </div>
            {/* Tiny smartphone mockup next to it representing smart tech */}
            <div className="absolute -bottom-1 -left-1.5 w-3 h-6 bg-slate-800 rounded-xs border border-slate-700 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-1.5 h-4 bg-slate-950 rounded-xs flex items-center justify-center">
                <div className="w-0.5 h-0.5 bg-green-500 rounded-full" />
              </div>
            </div>
          </div>
        );
      case 'Hydrogen Rich Water':
        return (
          <div className="w-14 h-18 bg-slate-100 rounded-lg shadow border border-slate-200 p-1 flex flex-col justify-between relative select-none">
            <span className="text-[4px] text-slate-800 font-bold leading-none">KENT</span>
            <div className="flex-grow w-full bg-white/70 rounded border border-slate-200/50 my-1 relative overflow-hidden flex items-center justify-center">
              <div className="absolute w-1 h-1 bg-cyan-400 rounded-full top-1 left-2 animate-ping" />
              <div className="absolute w-1 h-1 bg-cyan-400 rounded-full top-2 right-2 animate-pulse" />
              <div className="w-4 h-6 bg-slate-200 rounded-xs border border-slate-350" />
            </div>
            <div className="h-1.5 w-full bg-slate-300 rounded-xs" />
          </div>
        );
      case 'UV Purifiers':
        return (
          <div className="w-14 h-18 bg-slate-900 rounded-lg shadow border border-slate-800 p-1.5 flex flex-col justify-between select-none">
            <span className="text-[4px] text-[#008DDF] font-bold leading-none">KENT</span>
            <div className="flex-grow w-full bg-purple-900/10 border border-purple-500/20 rounded my-0.5 flex items-center justify-center">
              <div className="w-1.5 h-5 bg-purple-500/35 rounded-full blur-[1px] animate-pulse" />
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-xs" />
          </div>
        );
      case 'Gravity Purifiers':
        return (
          <div className="w-14 h-18 flex flex-col items-center justify-center select-none">
            <div className="w-8 h-6 bg-blue-100/60 border border-blue-300/40 rounded-t-lg relative">
              <div className="w-3 h-1.5 bg-blue-300/60 rounded-full mx-auto mt-0.5" />
            </div>
            <div className="w-10 h-8 bg-blue-200/60 border border-blue-400/40 rounded-b-lg relative flex items-end justify-center p-0.5">
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-xs" />
              <span className="text-[4px] text-blue-900 font-extrabold uppercase">Gold</span>
            </div>
          </div>
        );
      case 'Commercial Purifier':
        return (
          <div className="w-12 h-18 bg-gradient-to-b from-slate-300 to-slate-400 rounded-md shadow border border-slate-400 p-1 flex flex-col justify-between select-none">
            <div className="w-full h-1.5 bg-slate-700 rounded-xs flex items-center justify-center">
              <span className="text-[3px] text-slate-100 font-bold leading-none">COMMERCIAL</span>
            </div>
            <div className="flex-grow w-full bg-slate-200 rounded border border-slate-300/50 my-0.5 p-0.5 flex flex-col justify-around">
              <div className="w-full h-0.5 bg-slate-400 rounded-xs" />
              <div className="w-full h-0.5 bg-slate-400 rounded-xs" />
            </div>
            <div className="h-2.5 w-full bg-slate-800 rounded-xs flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            </div>
          </div>
        );
      // Softeners
      case 'Bathroom Softeners':
        return (
          <div className="w-12 h-18 bg-slate-100 rounded-lg shadow border border-slate-250 p-1 flex flex-col justify-between select-none">
            <div className="w-6 h-10 bg-blue-500 rounded-full mx-auto border border-blue-600 flex flex-col justify-around p-0.5">
              <div className="w-full h-1.5 bg-white/20 rounded-full" />
              <div className="w-full h-1.5 bg-white/20 rounded-full" />
            </div>
            <div className="h-1.5 w-full bg-slate-300 rounded-xs" />
          </div>
        );
      case 'Washing Machine Softeners':
        return (
          <div className="w-12 h-18 bg-slate-50 rounded-lg shadow border border-slate-200 p-1 flex flex-col justify-between items-center select-none">
            <div className="w-6 h-6 rounded-full bg-slate-300 border border-slate-400 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200" />
            </div>
            <div className="w-6 h-7 bg-blue-400 rounded-md border border-blue-500" />
          </div>
        );
      case 'Automatic Softeners':
        return (
          <div className="w-14 h-18 bg-slate-200 rounded-lg shadow border border-slate-300 p-1 flex flex-col justify-between select-none">
            <div className="w-full h-2 bg-slate-850 rounded-xs text-[4px] text-green-400 font-bold text-center">AUTO</div>
            <div className="flex-grow w-full bg-slate-100 border border-slate-200 rounded my-0.5 flex items-center justify-center">
              <div className="w-3 h-6 bg-blue-500 rounded-xs" />
            </div>
          </div>
        );
      // Kitchen
      case 'Air Fryers':
        return (
          <div className="w-12 h-16 bg-slate-900 border border-slate-800 rounded-xl shadow p-1 flex flex-col justify-between items-center select-none">
            <div className="w-4 h-1 bg-orange-500 rounded-full animate-pulse" />
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border border-slate-700 bg-slate-950 flex items-center justify-center">
                <span className="text-[4px] text-orange-400">180°</span>
              </div>
            </div>
          </div>
        );
      case 'Cold Pressed Juicers':
        return (
          <div className="w-11 h-16 bg-slate-100 border border-slate-200 rounded shadow p-1 flex flex-col justify-between items-center select-none">
            <div className="w-4 h-2.5 bg-slate-300 rounded-t" />
            <div className="w-7 h-7 bg-orange-400/20 border border-orange-400 rounded-xs flex items-center justify-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full" />
            </div>
            <div className="w-3 h-3 bg-slate-800 rounded-full" />
          </div>
        );
      case 'Bread Makers':
        return (
          <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-lg shadow p-1 flex flex-col justify-between select-none">
            <div className="w-full h-2 bg-slate-200 rounded border border-slate-300" />
            <div className="w-full h-5 bg-slate-100 rounded border border-slate-200 flex items-center justify-center">
              <div className="w-6 h-2.5 bg-amber-600/30 border border-amber-600 rounded-xs" />
            </div>
          </div>
        );
      case 'Multi Cookers':
        return (
          <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-full shadow flex items-center justify-center p-1 relative select-none">
            <div className="w-8 h-8 bg-white border border-slate-300 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-slate-100 border border-slate-200 rounded-full" />
            </div>
            <div className="absolute top-0 right-1 w-1 h-2 bg-slate-850 rounded-xs" />
          </div>
        );
      // Home
      case 'Air Purifiers':
        return (
          <div className="w-11 h-16 bg-slate-50 border border-slate-200 rounded-t-lg rounded-b shadow p-1 flex flex-col justify-between select-none">
            <div className="w-full h-1.5 bg-slate-900 rounded-xs text-[3px] text-green-400 font-bold font-mono text-center">AQI 012</div>
            <div className="flex-grow w-full flex flex-col justify-around py-1">
              <div className="w-full h-0.5 bg-slate-200 rounded-xs" />
              <div className="w-full h-0.5 bg-slate-200 rounded-xs" />
            </div>
          </div>
        );
      case 'Vacuum Cleaners':
        return (
          <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-full shadow flex items-center justify-center relative select-none">
            <div className="w-8 h-8 rounded-full bg-[#008DDF] flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
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
      case 'Solar Panels':
        return (
          <div className="w-14 h-18 bg-blue-950 border border-blue-900 rounded shadow p-0.5 grid grid-cols-3 gap-0.5 select-none">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-blue-900 border border-blue-850" />
            ))}
          </div>
        );
      case 'Solar Inverters':
        return (
          <div className="w-12 h-16 bg-slate-800 border border-slate-700 rounded shadow p-1 flex flex-col justify-between select-none">
            <div className="w-full h-2 bg-slate-900 rounded-xs text-[4px] text-green-400 font-mono text-center">5.2 KW</div>
            <div className="flex-grow w-full bg-slate-700 rounded my-0.5 flex items-center justify-center">
              <div className="w-6 h-3 bg-orange-500 rounded-xs" />
            </div>
          </div>
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
          <div className="flex items-center space-x-3 xl:space-x-5 text-[10.5px] xl:text-xs text-slate-650 font-medium">
            <Link to="/about" className="hover:text-[#0b3178] transition whitespace-nowrap">About Us</Link>
            <Link to="/partner" className="hover:text-[#0b3178] transition whitespace-nowrap">Become a Trade Partner</Link>
            <Link to="/service" className="hover:text-[#0b3178] transition whitespace-nowrap">Customer Service</Link>

            <Link to="/dealer" className="hover:text-[#0b3178] transition whitespace-nowrap">Dealer Locator</Link>
            <button className="flex items-center space-x-1 hover:text-[#0b3178] transition focus:outline-none whitespace-nowrap">
              <span>English</span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>
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
            <button
              onClick={onProfileOpen}
              className="text-slate-700 hover:text-[#0b3178] p-1 focus:outline-none"
              aria-label="User Account"
            >
              <User size={18} className="text-slate-600" />
            </button>

            {/* Separator */}
            <span className="text-slate-200 select-none">|</span>

            {/* Cart Button */}
            <button
              onClick={onCartToggle}
              className="flex items-center space-x-2 text-slate-700 hover:text-[#0b3178] focus:outline-none group"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={18} className="text-slate-600 group-hover:text-[#0b3178]" />
              <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-bold min-w-[24px] text-center border border-slate-200">
                {cartCount}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Navbar Hamburger Controls */}
        <div className="lg:hidden flex items-center space-x-4">
          <button
            onClick={onCartToggle}
            className="relative p-2 text-slate-600 hover:text-[#0b3178] focus:outline-none"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF5A00] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

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
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onDemoOpen();
                }}
                className="w-full bg-[#FF5A00] hover:bg-[#d44b00] text-white py-3 rounded-xl font-bold shadow-md transition"
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
