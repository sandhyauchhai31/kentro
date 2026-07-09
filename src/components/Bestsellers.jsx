import React, { useState } from 'react';
import { Star, ShieldCheck, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Bestsellers({ onAddToCart }) {
  const products = [
    {
      id: "kent-grand-plus",
      name: "KENT Grand Plus",
      tag: "Bestseller",
      specs: "RO + UV + UF + TDS Control",
      desc: "India's highest selling water purifier, featuring fully automatic operation.",
      rating: 4.8,
      reviews: 843,
      basePrice: 21000,
      salePrice: 19499,
      colors: ["White", "Cherry Red"],
      features: ["9.2L Storage Tank", "20 L/hr Purification", "In-tank UV Disinfection"]
    },
    {
      id: "kent-elegant",
      name: "KENT Elegant",
      tag: "Compact Value",
      specs: "RO + UF + TDS Control",
      desc: "Designed for compact spaces, wall-mounted, high performance.",
      rating: 4.6,
      reviews: 312,
      basePrice: 17500,
      salePrice: 16500,
      colors: ["White"],
      features: ["8L Storage Tank", "15 L/hr Purification", "Zero Water Wastage"]
    },
    {
      id: "kent-autosoft-8l",
      name: "KENT AutoSoft 8L",
      tag: "Water Softening",
      specs: "Automatic Water Softener",
      desc: "Protects home appliances, skin, and hair from hard water scaling.",
      rating: 4.7,
      reviews: 142,
      basePrice: 32000,
      salePrice: 28000,
      colors: ["Slate Grey"],
      features: ["Automatic regeneration", "Maintenance-free design", "Time-based control"]
    },
    {
      id: "kent-zoom-vacuum",
      name: "KENT Zoom Vacuum Cleaner",
      tag: "Clean Home",
      specs: "Cordless Cyclonic Vacuum",
      desc: "Cordless handy vacuum cleaner with highly efficient washable HEPA filter.",
      rating: 4.5,
      reviews: 218,
      basePrice: 12000,
      salePrice: 9999,
      colors: ["Midnight Blue", "Metallic Red"],
      features: ["30 min run time", "Multi-nozzle utility", "Bagless convenience"]
    }
  ];

  // Store selected colors for each product card
  const [selectedColors, setSelectedColors] = useState({
    "kent-grand-plus": "White",
    "kent-elegant": "White",
    "kent-autosoft-8l": "Slate Grey",
    "kent-zoom-vacuum": "Midnight Blue"
  });

  const handleColorChange = (prodId, color) => {
    setSelectedColors(prev => ({ ...prev, [prodId]: color }));
  };

  const getPurifierColorClass = (color) => {
    switch (color) {
      case 'Cherry Red': return 'from-red-500 to-red-700';
      case 'Slate Grey': return 'from-slate-500 to-slate-700';
      case 'Midnight Blue': return 'from-blue-800 to-indigo-950';
      case 'Metallic Red': return 'from-rose-600 to-red-800';
      default: return 'from-blue-50 to-blue-200'; // White/default
    }
  };

  return (
    <section id="bestsellers" className="py-16 md:py-24 bg-white select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
          <div className="text-left space-y-2">
            <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">
              Top Rated Products
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#091E42] tracking-tight">
              KENT Range of Bestsellers
            </h2>
          </div>
          <a href="#all-products" className="text-xs font-bold text-brand-blue hover:text-brand-dark-blue hover:underline mt-2 md:mt-0 flex items-center space-x-1">
            <span>View All Products</span>
            <span>→</span>
          </a>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod) => {
            const activeColor = selectedColors[prod.id];
            const discount = prod.basePrice - prod.salePrice;

            return (
              <div 
                key={prod.id}
                className="bg-white border border-slate-100 rounded-3xl p-5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Wishlist toggle & tags */}
                <div className="flex justify-between items-center z-10">
                  <span className="bg-[#091E42] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                    {prod.tag}
                  </span>
                  <button className="text-slate-300 hover:text-red-500 transition duration-200">
                    <Heart size={16} />
                  </button>
                </div>

                {/* Product Image Mockup Display */}
                <div className="h-48 w-full bg-slate-50 rounded-2xl my-4 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-100/50 transition">
                  {/* Styled Dynamic Mockup */}
                  <div className={`w-28 h-36 bg-gradient-to-b ${getPurifierColorClass(activeColor)} rounded-2xl border-4 ${
                    activeColor === 'White' ? 'border-white' : 'border-slate-100'
                  } shadow-md flex flex-col justify-between p-2 relative transition-all duration-300`}>
                    
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <span className={`text-[8px] font-black ${
                        activeColor === 'White' ? 'text-brand-blue' : 'text-white'
                      } tracking-wide`}>KENT</span>
                      <div className="w-4 h-4 bg-white/10 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#25D366] rounded-full" />
                      </div>
                    </div>

                    {/* Window showing internal tech (only for purifiers) */}
                    {prod.id.includes('elegant') || prod.id.includes('grand') ? (
                      <div className="w-full h-12 bg-white/10 backdrop-blur-xs rounded border border-white/10 flex flex-col justify-center items-center space-y-1 p-1">
                        <div className="w-full h-2 bg-[#008DDF]/30 rounded-xs flex items-center justify-center">
                          <span className="text-[4px] text-white font-bold">RO</span>
                        </div>
                        <div className="w-full h-2 bg-[#FF5A00]/30 rounded-xs flex items-center justify-center">
                          <span className="text-[4px] text-white font-bold">TDS</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-12 bg-black/10 rounded border border-white/5 flex flex-col justify-center items-center">
                        <div className="w-3 h-3 rounded-full bg-orange-400 animate-ping" />
                      </div>
                    )}

                    {/* Footer storage info */}
                    <div className={`flex justify-between items-end ${
                      activeColor === 'White' ? 'text-slate-600' : 'text-white/80'
                    }`}>
                      <span className="text-[6px] font-bold uppercase">{prod.features[0].split(' ')[0]} Tank</span>
                      <span className="text-[6px] font-extrabold">{prod.features[0]}</span>
                    </div>

                  </div>
                </div>

                {/* Info Text */}
                <div className="text-left space-y-2">
                  <span className="text-[10px] text-brand-blue font-bold uppercase tracking-wider">{prod.specs}</span>
                  <h3 className="font-extrabold text-[#091E42] text-base group-hover:text-brand-blue transition duration-200">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {prod.desc}
                  </p>

                  {/* Star Ratings */}
                  <div className="flex items-center space-x-1.5 pt-1">
                    <div className="flex items-center text-amber-500">
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-700">{prod.rating}</span>
                    <span className="text-[10px] text-slate-400">({prod.reviews} reviews)</span>
                  </div>

                  {/* Features Bullet details */}
                  <div className="py-2.5 border-t border-slate-100 grid grid-cols-1 gap-1">
                    {prod.features.slice(1, 3).map((f) => (
                      <div key={f} className="flex items-center space-x-1.5 text-[10px] text-slate-500">
                        <ShieldCheck size={12} className="text-brand-blue" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Color Swatches selection */}
                  {prod.colors.length > 1 && (
                    <div className="flex items-center space-x-2 pt-1 pb-2">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">Color:</span>
                      <div className="flex space-x-1.5">
                        {prod.colors.map((c) => (
                          <button
                            key={c}
                            onClick={() => handleColorChange(prod.id, c)}
                            className={`w-4.5 h-4.5 rounded-full border shadow-xs transition-all duration-200 cursor-pointer ${
                              activeColor === c ? 'ring-2 ring-brand-blue ring-offset-1 scale-110' : 'opacity-70'
                            }`}
                            style={{ 
                              backgroundColor: c === 'White' ? '#ffffff' : 
                                               c === 'Cherry Red' ? '#dc2626' : 
                                               c === 'Midnight Blue' ? '#1e3a8a' : '#e11d48',
                              borderColor: c === 'White' ? '#e2e8f0' : 'transparent'
                            }}
                            title={c}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pricing row & Action CTA */}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="text-slate-400 line-through text-[11px]">
                          ₹{prod.basePrice.toLocaleString('en-IN')}
                        </span>
                        <span className="bg-red-50 text-red-500 text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                          Save ₹{discount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-lg font-black text-[#091E42]">
                        ₹{prod.salePrice.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <button 
                      onClick={() => {
                        onAddToCart({
                          id: prod.id,
                          name: prod.name,
                          price: prod.salePrice,
                          color: activeColor
                        });
                      }}
                      className="bg-brand-blue hover:bg-brand-dark-blue text-white p-3 rounded-xl shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart size={15} />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
