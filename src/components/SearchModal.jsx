import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, ShoppingBag, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getFullCatalog } from '../catalogData';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  
  // Get all products from the catalog
  const catalog = getFullCatalog();
  const allProducts = [];
  Object.entries(catalog).forEach(([subCat, products]) => {
    products.forEach(p => {
      allProducts.push({
        ...p,
        subCategory: subCat
      });
    });
  });

  // Focus input on mount / when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle Search Filtering
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const filtered = allProducts.filter(product => {
      const nameMatch = product.name.toLowerCase();
      const descMatch = (product.desc || '').toLowerCase();
      const techMatch = (product.tech || '').toLowerCase();
      const subCatMatch = product.subCategory.toLowerCase();
      
      // Match all terms
      return searchTerms.every(term => 
        nameMatch.includes(term) ||
        descMatch.includes(term) ||
        techMatch.includes(term) ||
        subCatMatch.includes(term) ||
        (product.features && product.features.some(f => f.toLowerCase().includes(term)))
      );
    });

    setResults(filtered);
  }, [query]);

  const popularSearches = [
    'KENT Grand Plus',
    'Sapphire IoT',
    'Water Softener',
    'Alps+ HEPA Purifier',
    'Bread Maker',
    'Zero Water Wastage'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 md:px-0">
          {/* Backdrop overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#091E42]/60 backdrop-blur-md"
          />

          {/* Modal Panel */}
          <motion.div 
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-slate-100"
          >
            {/* Header / Input Field */}
            <div className="flex items-center justify-between border-b border-slate-100 p-4 gap-3 bg-slate-50/50">
              <Search className="text-slate-400 shrink-0" size={22} />
              
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, technologies, key features..."
                className="w-full bg-transparent border-none text-slate-800 placeholder-slate-400 focus:outline-none text-[16px] py-1 font-medium"
              />

              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 hover:bg-slate-200/60 rounded-full text-slate-400 hover:text-slate-600 transition shrink-0 cursor-pointer"
                  aria-label="Clear Search Input"
                >
                  <X size={18} />
                </button>
              )}

              <button
                onClick={onClose}
                className="ml-2 px-3 py-1.5 bg-slate-200/50 hover:bg-slate-200 text-slate-600 hover:text-slate-800 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 custom-scrollbar">
              {/* Case 1: Empty Query - Show suggestions */}
              {!query.trim() && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Popular Searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term, i) => (
                        <button
                          key={i}
                          onClick={() => setQuery(term)}
                          className="px-3.5 py-1.5 bg-slate-50 hover:bg-[#0b3178]/10 text-slate-600 hover:text-[#0b3178] border border-slate-200/80 hover:border-[#0b3178]/30 rounded-full text-xs font-semibold transition cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Shop Categories</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {Object.keys(catalog).slice(0, 6).map((cat, i) => (
                        <Link
                          key={i}
                          to={`/category?cat=${encodeURIComponent(cat === 'RO Purifiers' || cat === 'Hydrogen Rich Water' || cat === 'UV Purifiers' || cat === 'Gravity Purifiers' || cat === 'Commercial Purifier' ? 'Water Purifiers' : cat === 'Bathroom Softeners' || cat === 'Washing Machine Softeners' || cat === 'Automatic Softeners' ? 'Water Softeners' : cat === 'Air Fryers' || cat === 'Cold Pressed Juicers' || cat === 'Bread Makers' || cat === 'Multi Cookers' ? 'Kitchen Appliances' : 'Home Appliances')}&sub=${encodeURIComponent(cat)}`}
                          onClick={onClose}
                          className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/50 hover:border-slate-300 transition flex items-center justify-between group"
                        >
                          <span className="text-[13px] font-semibold text-slate-700 group-hover:text-[#0b3178] truncate">{cat}</span>
                          <ArrowRight size={14} className="text-slate-400 group-hover:text-[#0b3178] group-hover:translate-x-0.5 transition shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Case 2: Matching Results */}
              {query.trim() && results.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Search Results ({results.length})
                    </span>
                  </div>

                  <div className="space-y-2">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        onClick={onClose}
                        className="flex items-start justify-between p-3.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition group gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100/80 flex items-center justify-center text-slate-400 group-hover:bg-[#0b3178]/5 group-hover:text-[#0b3178] transition shrink-0">
                            <ShoppingBag size={20} />
                          </div>
                          <div>
                            <h4 className="text-[14px] font-bold text-slate-800 group-hover:text-[#0b3178] transition leading-snug">
                              {product.name}
                            </h4>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
                              <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                {product.subCategory}
                              </span>
                              {product.specs && (
                                <span className="text-[11px] text-slate-500 truncate max-w-[250px] md:max-w-[400px]">
                                  • {product.specs}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[14px] font-extrabold text-[#091E42]">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.basePrice && product.basePrice > product.price && (
                            <div className="text-[10px] text-slate-400 line-through">
                              ₹{product.basePrice.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Case 3: Query active but no results */}
              {query.trim() && results.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-4">
                    <Info size={24} />
                  </div>
                  <h4 className="text-slate-800 font-bold text-[16px] mb-1">No products found</h4>
                  <p className="text-slate-500 text-sm max-w-sm">
                    We couldn't find any products matching <strong className="text-slate-700">"{query}"</strong>. Try checking spelling or using broader search terms.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
