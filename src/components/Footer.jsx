import React, { useState } from 'react';
import { Mail, Send, CheckCircle, PhoneCall, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1200);
  };

  return (
    <footer className="bg-[#091E42] text-slate-300 select-none">
      
      {/* Top Banner (pan India helpline & trust banner) */}
      <div className="border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-center md:text-left">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Beware of Spurious Service Centers!</h4>
              <p className="text-xs text-slate-400 mt-0.5 max-w-md">
                Always book your service requests directly through our official app, helpline (92789 12345), or website.
              </p>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 flex items-center space-x-4">
            <PhoneCall size={20} className="text-brand-blue animate-bounce" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">PAN-India Customer Care</span>
              <a href="tel:9278912345" className="text-base font-extrabold text-white hover:text-brand-blue transition">
                92789 12345 / 92789 87654
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Brand details Column */}
        <div className="md:col-span-4 space-y-5 text-left">
          <a href="#" className="flex items-center space-x-2">
            <div className="bg-brand-blue text-white font-extrabold text-2xl px-3 py-1 rounded-md tracking-wider">
              KENT
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white tracking-widest leading-none">RO SYSTEMS</span>
              <span className="text-[8px] text-slate-400 font-semibold uppercase leading-none tracking-tighter">Mineral RO™</span>
            </div>
          </a>
          
          <p className="text-xs text-slate-400 leading-relaxed">
            KENT is India's most trusted water purifier brand, pioneering the revolutionary Mineral RO™ Technology that retains essential natural minerals in purified water.
          </p>

          <div className="flex space-x-3 pt-2">
            <a href="https://facebook.com" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-blue hover:text-white transition flex items-center justify-center text-slate-400" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/>
              </svg>
            </a>
            <a href="https://twitter.com" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-blue hover:text-white transition flex items-center justify-center text-slate-400" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://youtube.com" className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-500 hover:text-white transition flex items-center justify-center text-slate-400" aria-label="Youtube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.525 3.545 12 3.545 12 3.545s-7.525 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.026 0 12 0 12s0 3.974.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.863.508 9.388.508 9.388.508s7.525 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.974 24 12 24 12s0-3.974-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://instagram.com" className="w-8 h-8 rounded-full bg-white/5 hover:bg-pink-500 hover:text-white transition flex items-center justify-center text-slate-400" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Link Columns (2 columns of 2 grid size) */}
        <div className="md:col-span-4 grid grid-cols-2 gap-6 text-left">
          <div className="space-y-4">
            <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">Products</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#purifiers" className="hover:text-brand-blue transition">Water Purifiers</a></li>
              <li><a href="#softeners" className="hover:text-brand-blue transition">Water Softeners</a></li>
              <li><a href="#kitchen" className="hover:text-brand-blue transition">Kitchen Appliances</a></li>
              <li><a href="#air" className="hover:text-brand-blue transition">Air Purifiers</a></li>
              <li><a href="#solar" className="hover:text-brand-blue transition">Solar Energy</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#about" className="hover:text-brand-blue transition">About Us</a></li>
              <li><a href="#partners" className="hover:text-brand-blue transition">Become a Partner</a></li>
              <li><a href="#careers" className="hover:text-brand-blue transition">Careers</a></li>
              <li><a href="#blog" className="hover:text-brand-blue transition">News & Blog</a></li>
              <li><a href="#contact" className="hover:text-brand-blue transition">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup Column */}
        <div className="md:col-span-4 space-y-4 text-left">
          <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">Join Newsletter</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Subscribe to receive product discounts, health tips, and water reports directly in your inbox.
          </p>

          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.div 
                key="subscribed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl flex items-center space-x-2.5"
              >
                <CheckCircle size={18} className="flex-shrink-0" />
                <span className="text-xs font-semibold">Subscribed successfully! Thank you.</span>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubscribe} 
                className="flex items-center space-x-2"
              >
                <div className="relative flex-grow">
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                  <input 
                    type="email" 
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-3.5 text-xs focus:outline-none focus:border-brand-blue text-white placeholder-slate-500 transition"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-brand-blue hover:bg-brand-dark-blue disabled:bg-slate-700 text-white p-3.5 rounded-xl shadow-md transition flex items-center justify-center flex-shrink-0"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Payments */}
      <div className="border-t border-slate-800/80 py-6 bg-slate-950/40 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} KENT RO Systems Ltd. All rights reserved.</p>
          
          {/* Payment providers representation */}
          <div className="flex space-x-2">
            {['Visa', 'Mastercard', 'UPI', 'Rupay', 'NetBanking'].map((method) => (
              <span key={method} className="bg-white/5 border border-white/5 px-2 py-0.5 rounded text-[9px] font-bold text-slate-400 tracking-wider">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
