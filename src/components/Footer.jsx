import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1a3673] text-slate-300 select-none text-left">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Column 1: Brand details */}
        <div className="md:col-span-3 space-y-4">
          <div className="flex flex-col items-start">
            <div className="border-2 border-white px-4 py-1 text-center font-extrabold text-2xl tracking-[0.12em] text-white font-sans bg-transparent">
              KENT
            </div>
            <span className="text-[10px] text-slate-250 tracking-[0.18em] font-medium uppercase mt-1 block">
              House of Purity
            </span>
          </div>
          
          <p className="text-xs text-slate-200 leading-relaxed max-w-[280px]">
            Bringing you exceptional quality and thoughtful design—crafted to elevate your daily life and deliver inspiration every moment.
          </p>
        </div>

        {/* Column 2: Company */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider">Company</h4>
          <ul className="space-y-3 text-sm font-bold text-white">
            <li><a href="#overview" className="hover:underline">Overview</a></li>
            <li><a href="#press-kit" className="hover:underline">Press Kit</a></li>
            <li><a href="#become-partner" className="hover:underline">Become a Trade Partner</a></li>
            <li><a href="#intl-products" className="hover:underline">International Products</a></li>
            <li><a href="#blogs" className="hover:underline">Blogs</a></li>
            <li><Link to="/employee" target="_blank" className="hover:underline text-cyan-400 font-extrabold">Employee Portal</Link></li>
          </ul>
        </div>

        {/* Column 3: Products */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider">Products</h4>
          <ul className="space-y-3 text-sm font-bold text-white">
            <li><a href="#purifiers" className="hover:underline">Water Purifiers</a></li>
            <li><a href="#softeners" className="hover:underline">Water Softeners</a></li>
            <li><a href="#kitchen" className="hover:underline">Kitchen Appliances</a></li>
            <li><a href="#home" className="hover:underline">Home Appliances</a></li>
          </ul>
        </div>

        {/* Column 4: Quick Links */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-3 text-sm font-bold text-white">
            <li><Link to="/admin" target="_blank" className="hover:underline text-amber-400 font-extrabold">Admin Panel</Link></li>
            <li><a href="#terms" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="#refund" className="hover:underline">Return & Refund Policy</a></li>
            <li><a href="#billing" className="hover:underline">Billing & Shipping</a></li>
            <li><a href="#cookie" className="hover:underline">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Column 5: Call to Action, Payments, Socials */}
        <div className="md:col-span-3 space-y-5">
          <p className="text-xs text-slate-200 leading-relaxed">
            Join us as a trade partner in the growing water purification market in India.
          </p>
          
          <a 
            href="#become-partner"
            className="bg-white hover:bg-slate-100 text-[#1a3673] px-6 py-2.5 rounded-full font-bold text-xs shadow-sm transition inline-block text-center cursor-pointer font-sans"
          >
            Become Partner
          </a>

          <div>
            <h4 className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider mb-2.5">
              Payment Method
            </h4>
            <div className="flex space-x-2">
              {/* Mastercard */}
              <div className="bg-white px-2 py-1 rounded-[4px] flex items-center justify-center h-6 w-9 select-none">
                <div className="flex -space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#EB001B]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#F79E1B] opacity-80"></div>
                </div>
              </div>
              
              {/* Visa */}
              <div className="bg-white px-2 py-1 rounded-[4px] flex items-center justify-center h-6 w-9 select-none">
                <span className="text-[#1A1F71] font-black italic text-[9px] tracking-tighter">VISA</span>
              </div>
              
              {/* UPI */}
              <div className="bg-white px-2 py-1 rounded-[4px] flex items-center justify-center h-6 w-9 select-none">
                <span className="text-[#097939] font-black italic text-[7px] tracking-tight">UPI</span>
              </div>
              
              {/* Wallet Card */}
              <div className="bg-white px-2 py-1 rounded-[4px] flex items-center justify-center h-6 w-9 select-none text-[#1a3673]">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              
              {/* Net Banking */}
              <div className="bg-white px-2 py-1 rounded-[4px] flex items-center justify-center h-6 w-9 select-none text-[#1a3673]">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M3 21h18M3 10h18M3 10l9-7 9 7M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider mb-2.5">
              Follow Us
            </h4>
            <div className="flex space-x-3.5">
              {/* Facebook */}
              <a href="https://facebook.com" className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition" aria-label="Facebook">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              
              {/* X */}
              <a href="https://twitter.com" className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition" aria-label="Twitter">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a href="https://linkedin.com" className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition" aria-label="LinkedIn">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              
              {/* YouTube */}
              <a href="https://youtube.com" className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition" aria-label="Youtube">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.525 3.545 12 3.545 12 3.545s-7.525 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.026 0 12 0 12s0 3.974.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.863.508 9.388.508 9.388.508s7.525 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.974 24 12 24 12s0-3.974-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a href="https://instagram.com" className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition" aria-label="Instagram">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Terms */}
      <div className="border-t border-white/10 py-5 bg-[#142958] text-xs text-slate-350 select-none">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p>Copyright © 2026 . All rights reserved.</p>
          
          <div className="flex space-x-1">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <span className="text-slate-500">|</span>
            <a href="#disclaimer" className="hover:underline">Disclaimer</a>
            <span className="text-slate-500">|</span>
            <a href="#sitemap" className="hover:underline">Site Map</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
