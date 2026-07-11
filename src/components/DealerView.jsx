import React, { useState } from 'react';

export default function DealerView() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  return (
    <div className="bg-white min-h-screen pb-20 select-none font-sans text-left relative">
      
      {/* Hero Banner Section (Full Screen Width) */}
      <section className="w-full mb-12">
        <div className="relative w-full h-[250px] md:h-[450px] bg-[#091E42]">
          <img 
            src="/img-8.png" 
            alt="KENT Store Locator & Dealerships" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Search Layout Grid Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-100/50 mb-12">
          <div className="flex flex-col md:flex-row items-end justify-center gap-6">
            
            {/* Input City or Pincode */}
            <div className="w-full md:w-80 space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-700 block">
                Search by City/Pincode *
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter city or pincode"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
              />
            </div>

            {/* Product Category Select */}
            <div className="w-full md:w-64 space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-700 block">
                Product Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#1a3673] transition"
              >
                <option value="All">Select category</option>
                <option value="Water Purifiers">Water Purifiers</option>
                <option value="Water Softeners">Water Softeners</option>
                <option value="Kitchen Appliances">Kitchen Appliances</option>
              </select>
            </div>

            {/* Find Button (Pill shaped) */}
            <div className="w-full md:w-36">
              {query.trim() ? (
                <button
                  type="button"
                  className="w-full bg-[#1a3673] hover:bg-[#122856] text-white py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition cursor-pointer text-center shadow-xs"
                >
                  Find
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full bg-[#cbd5e1] text-slate-400 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider text-center cursor-not-allowed"
                >
                  Find
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Centered Placeholder Illustration & Message (Always visible) */}
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
          <div className="text-slate-300">
            <svg className="w-32 h-32" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.2">
              {/* Building shape */}
              <rect x="25" y="30" width="28" height="60" rx="2" />
              <rect x="53" y="45" width="22" height="45" rx="2" />
              {/* Windows */}
              <line x1="33" y1="42" x2="33" y2="48" strokeDasharray="1 3" strokeWidth="2" />
              <line x1="45" y1="42" x2="45" y2="48" strokeDasharray="1 3" strokeWidth="2" />
              <line x1="33" y1="56" x2="33" y2="62" strokeDasharray="1 3" strokeWidth="2" />
              <line x1="45" y1="56" x2="45" y2="62" strokeDasharray="1 3" strokeWidth="2" />
              <line x1="33" y1="70" x2="33" y2="76" strokeDasharray="1 3" strokeWidth="2" />
              <line x1="45" y1="70" x2="45" y2="76" strokeDasharray="1 3" strokeWidth="2" />
              <line x1="64" y1="55" x2="64" y2="61" strokeDasharray="1 3" strokeWidth="2" />
              <line x1="64" y1="69" x2="64" y2="75" strokeDasharray="1 3" strokeWidth="2" />
              {/* Pin shape */}
              <path d="M90 60c0 9-12 20-12 20s-12-11-12-20a12 12 0 1124 0z" strokeWidth="1.2" />
              <circle cx="78" cy="60" r="4" />
              {/* Base line */}
              <line x1="20" y1="90" x2="95" y2="90" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-base md:text-lg font-bold text-[#091E42]">
            Please search by City/Pincode to find your nearest dealer.
          </p>
        </div>

        {/* Why Millions Choose KENT Section */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 mt-12 mb-16 text-left select-none border-t border-slate-100 pt-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#091E42] tracking-tight mb-8">
            Why Millions Choose KENT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* KENT Advantage */}
            <div className="flex items-start space-x-4">
              <div className="text-[#1a3673] flex-shrink-0 mt-1">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 3c0 3.5-2.5 5.5-6 5.5 3.5 0 6 2 6 5.5 0-3.5 2.5-5.5 6-5.5-3.5 0-6-2-6-5.5z" />
                  <path d="M6 14c0 1.25-.75 2-2 2 1.25 0 2 .75 2 2 0-1.25.75-2 2-2-1.25 0-2-.75-2-2z" />
                  <path d="M18 16c0 .75-.45 1.2-1.2 1.2.75 0 1.2.45 1.2 1.2 0-.75.45-1.2 1.2-1.2-.75 0-1.2-.45-1.2-1.2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-[#091E42] text-lg mb-1 leading-snug">
                  KENT Advantage
                </h3>
                <p className="text-xs md:text-sm text-slate-500 font-semibold leading-relaxed">
                  Largest Manufacturer & Market Leader in RO Water Purifier with Large Sales and Service Network
                </p>
              </div>
            </div>

            {/* Trusted Brand */}
            <div className="flex items-start space-x-4">
              <div className="text-[#1a3673] flex-shrink-0 mt-1">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 11l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-[#091E42] text-lg mb-1 leading-snug">
                  Trusted Brand
                </h3>
                <p className="text-xs md:text-sm text-slate-500 font-semibold leading-relaxed">
                  Honored with Numerous International Certifications and Awards
                </p>
              </div>
            </div>

            {/* 25 Years of Trust */}
            <div className="flex items-start space-x-4">
              <div className="text-[#1a3673] flex-shrink-0 mt-1">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M16 11l3.5 3.5a2.5 2.5 0 01-3.5 3.5l-3-3" />
                  <path d="M8 11L4.5 14.5a2.5 2.5 0 003.5 3.5l3-3" />
                  <path d="M10 10l4-4a1.5 1.5 0 012.1 2.1L12 12" />
                  <path d="M14 10l-4 4a1.5 1.5 0 01-2.1-2.1L12 8" />
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-[#091E42] text-lg mb-1 leading-snug">
                  25 Years of Trust by Millions
                </h3>
                <p className="text-xs md:text-sm text-slate-500 font-semibold leading-relaxed">
                  Most Preferred RO & Home Appliances Brands in India
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>

    </div>
  );
}
