import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, ShoppingCart, ChevronUp, ChevronDown } from 'lucide-react';

export default function CategoryView({ 
  activeCategory, 
  activeSubCategory, 
  onCategoryChange, 
  onSubCategoryChange, 
  onBackToHome, 
  onAddToCart,
  onBuyNow
}) {
  // Main Filter & Sort States
  const [sortBy, setSortBy] = useState('popularity'); // 'popularity' | 'price-asc' | 'price-desc' | 'alpha-asc' | 'alpha-desc'
  const [maxPrice, setMaxPrice] = useState(45000);
  const [minPrice, setMinPrice] = useState(0);
  
  // Custom Filter States
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedInstallTypes, setSelectedInstallTypes] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [selectedRoFeatures, setSelectedRoFeatures] = useState([]);

  // Sidebar Collapse states
  const [isPriceExpanded, setIsPriceExpanded] = useState(true);
  const [isColorExpanded, setIsColorExpanded] = useState(true);
  const [isInstallExpanded, setIsInstallExpanded] = useState(true);
  const [isTechExpanded, setIsTechExpanded] = useState(true);
  const [isRoFeaturesExpanded, setIsRoFeaturesExpanded] = useState(true);

  const categoryCards = [
    { id: 'Water Purifiers', title: 'Water Purifiers', type: 'purifier' },
    { id: 'Water Softeners', title: 'Water Softeners', type: 'softener' },
    { id: 'Kitchen Appliances', title: 'Kitchen Appliances', type: 'kitchen' },
    { id: 'Home Appliances', title: 'Home Appliances', type: 'home' },
    { id: 'New Energy', title: 'New Energy', type: 'solar' }
  ];

  const subCategoriesMap = {
    'Water Purifiers': ['RO Purifiers', 'Hydrogen Rich Water', 'UV Purifiers', 'Gravity Purifiers', 'Commercial Purifier'],
    'Water Softeners': ['Bathroom Softeners', 'Washing Machine Softeners', 'Automatic Softeners'],
    'Kitchen Appliances': ['Air Fryers', 'Cold Pressed Juicers', 'Bread Makers', 'Multi Cookers'],
    'Home Appliances': ['Air Purifiers', 'Vacuum Cleaners', 'Vegetable Cleaners'],
    'New Energy': ['Solar Panels', 'Solar Inverters']
  };

  // Catalog Data with exact base pricing, descriptions, and filtering metadata
  const catalog = {
    'RO Purifiers': [
      { id: 'kent-grand-plus', name: 'KENT Grand Plus RO Purifier', price: 19499, basePrice: 24000, rating: 4.8, reviews: 843, specs: 'RO + UV + UF + TDS Control', desc: 'KENT Grand Plus is India\'s most popular water purifier, combining patented Mineral RO technology with zero water wastage.', features: ['9.2L Tank', 'In-tank UV', 'Zero Wastage'], color: ['White', 'Black'], installType: 'Wall Mounted', tech: 'RO + UV + UF + TDS Control', roFeatures: ['Best Selling', 'Zero Water Wastage Technology'] },
      { id: 'kent-elegant', name: 'KENT Elegant Wallmount RO', price: 16500, basePrice: 19500, rating: 4.6, reviews: 312, specs: 'RO + UF + TDS Control', desc: 'KENT Elegant provides highly reliable double purification with a wall-mounted space-saving compact design.', features: ['8L Tank', 'Zero Wastage'], color: ['White'], installType: 'Wall Mounted', tech: 'RO + UF + TDS Control', roFeatures: ['Zero Water Wastage Technology'] },
      { id: 'kent-prime-plus', name: 'KENT Prime Plus RO System', price: 18499, basePrice: 22000, rating: 4.7, reviews: 190, specs: 'RO + UV + UF + TDS', desc: 'KENT Prime Plus features a beautiful digital screen for real-time monitoring of filter performance and water purity.', features: ['9L Tank', 'Digital Display'], color: ['White'], installType: 'Counter Top', tech: 'RO + UV + UF + TDS Control', roFeatures: ['Zero Water Wastage Technology'] },
      { id: 'kent-supreme', name: 'KENT Supreme Alkaline RO', price: 20500, basePrice: 26000, rating: 4.8, reviews: 142, specs: 'RO + UF + UV + Alkaline + TDS Control', desc: 'KENT Supreme uses advanced alkaline pH filters to restore healthy minerals and reduce acidity in purified water.', features: ['Zero Water Wastage', 'Alkaline pH control'], color: ['Black'], installType: 'Under The Counter', tech: 'RO + UF + UV + Alkaline + TDS Control', roFeatures: ['Best Selling', 'Zero Water Wastage Technology'] },
      { id: 'kent-super-star', name: 'KENT Super Star Active Copper', price: 17499, basePrice: 21500, rating: 4.7, reviews: 205, specs: 'RO + UV + UF + Copper + TDS', desc: 'KENT Super Star is equipped with an active copper cartridge that instantly infuses copper ions for wellness benefits.', features: ['Active Copper filter', 'Auto start/stop'], color: ['White', 'Black'], installType: 'Wall Mounted', tech: 'RO + UV + UF + Copper + TDS Control', roFeatures: [] },
      { id: 'kent-grand-alkaline', name: 'KENT Grand Copper Alkaline RO', price: 22500, basePrice: 28500, rating: 4.9, reviews: 68, specs: 'RO + UV + UF + Alkaline + Copper + TDS', desc: 'KENT Grand Copper Alkaline provides top-tier filtration, infusing copper and maintaining a balanced alkaline pH level.', features: ['Copper + Alkaline boost', 'Premium design'], color: ['White'], installType: 'Wall Mounted', tech: 'RO + UV + UF + Alkaline + Copper + TDS Control', roFeatures: ['Zero Water Wastage Technology'] }
    ],
    'Hydrogen Rich Water': [
      { id: 'kent-hydrogen-stand', name: 'KENT Hydrogen Water Stand', price: 36000, basePrice: 42000, rating: 4.9, reviews: 45, specs: 'Hydrogen Generator + Filter', desc: 'KENT Hydrogen Water Stand uses cutting-edge tech to generate antioxidant-rich hydrogen water for active lifestyles.', features: ['Rich Antioxidants', 'Instant Dispenser'], color: ['Black'], installType: 'Counter Top', tech: 'RO + UV + UF + TDS Control', roFeatures: [] }
    ],
    'UV Purifiers': [
      { id: 'kent-ultra-star', name: 'KENT Ultra Star UV/UF', price: 9499, basePrice: 11500, rating: 4.7, reviews: 154, specs: 'UV + UF double purification', desc: 'Instant double purification with an elegant transparent in-tank UV disinfection system.', features: ['In-tank UV', 'Compact design'], color: ['White'], installType: 'Wall Mounted', tech: 'RO + UF + TDS Control', roFeatures: [] }
    ],
    'Gravity Purifiers': [
      { id: 'kent-gold', name: 'KENT Gold Optima gravity', price: 3200, basePrice: 4000, rating: 4.5, reviews: 412, specs: 'UF Membrane Gravity Filter', desc: 'Non-electric, chemical-free gravity water purifier with clean hollow-fiber UF membrane filter.', features: ['10L Storage', 'Non-electric'], color: ['White'], installType: 'Counter Top', tech: 'RO + UF + TDS Control', roFeatures: [] }
    ],
    'Commercial Purifier': [
      { id: 'kent-comm-25', name: 'KENT Commercial RO 25L', price: 29000, basePrice: 35000, rating: 4.8, reviews: 88, specs: 'High Capacity Commercial RO', desc: 'High-yield commercial purifier matching requirements for offices, schools, and small food outlets.', features: ['25 L/hr Flow', 'Dual Pump Tech'], color: ['Black'], installType: 'Wall Mounted', tech: 'RO + UV + UF + TDS Control', roFeatures: [] }
    ],
    'Bathroom Softeners': [
      { id: 'kent-bath-soft', name: 'KENT Bathroom Softener', price: 8500, basePrice: 10000, rating: 4.6, reviews: 92, specs: 'Hardness Removal for Bathing', desc: 'Converts hard water to soft water to protect skin, hair, and plumbing scale buildup.', features: ['Prevents scale', 'Soft skin/hair'], color: ['Black'], installType: 'Wall Mounted' }
    ],
    'Washing Machine Softeners': [
      { id: 'kent-washing-soft', name: 'KENT Washing Softener', price: 6200, basePrice: 7500, rating: 4.5, reviews: 48, specs: 'Scale prevention for Washers', desc: 'Compact softener that protects washing machine components and increases soap lathering.', features: ['Increases soap lather', 'Protects fabrics'], color: ['White'], installType: 'Wall Mounted' }
    ],
    'Automatic Softeners': [
      { id: 'kent-autosoft-8l', name: 'KENT AutoSoft 8L Softener', price: 28000, basePrice: 32000, rating: 4.7, reviews: 142, specs: 'Automatic Hardness Filter', desc: 'Automatic household softener with electronic time-based regeneration cycles.', features: ['Time-based regeneration', 'Auto backwash'], color: ['Black'], installType: 'Under The Counter' }
    ],
    'Air Fryers': [
      { id: 'kent-airfryer', name: 'KENT Digital Air Fryer', price: 7999, basePrice: 9999, rating: 4.7, reviews: 110, specs: 'Oil-Free Smart Frying', desc: 'Crispy frying with 80% less oil using digital one-touch pre-set cooking programs.', features: ['8 Pre-set menus', 'Rapid air circulation'], color: ['Black'], installType: 'Counter Top' }
    ],
    'Cold Pressed Juicers': [
      { id: 'kent-juicer', name: 'KENT Cold Pressed Juicer', price: 12500, basePrice: 15000, rating: 4.8, reviews: 67, specs: 'Nutrient retaining juicer', desc: 'Squeezes fruits at low speeds to retain essential natural enzymes and fibers.', features: ['Low speed squeeze', 'Easy to clean'], color: ['Black'], installType: 'Counter Top' }
    ],
    'Bread Makers': [
      { id: 'kent-breadmaker', name: 'KENT Bread Maker & Kneader', price: 8999, basePrice: 11000, rating: 4.6, reviews: 95, specs: 'Fully Automatic Dough Kneader', desc: 'One-touch smart bread maker that does kneading, rising, and baking automatically.', features: ['19 Program menus', 'One-touch operation'], color: ['White'], installType: 'Counter Top' }
    ],
    'Multi Cookers': [
      { id: 'kent-multicooker', name: 'KENT Smart Multi Cooker', price: 3499, basePrice: 4500, rating: 4.4, reviews: 121, specs: 'Induction steam multi cooker', desc: 'Boil, steam, and cook meals instantly inside a single compact tabletop appliance.', features: ['Compact size', 'Overheat protection'], color: ['White'], installType: 'Counter Top' }
    ],
    'Air Purifiers': [
      { id: 'kent-alps-plus', name: 'KENT Alps+ HEPA Purifier', price: 15999, basePrice: 19999, rating: 4.8, reviews: 202, specs: 'HEPA Filter + Carbon Adsorber', desc: 'Japanese HEPA technology combined with active carbon filters for 99.9% clean air.', features: ['PM2.5 Realtime display', 'UV LED sterilizer'], color: ['White'], installType: 'Counter Top' }
    ],
    'Vacuum Cleaners': [
      { id: 'kent-zoom', name: 'KENT Zoom Vacuum', price: 9999, basePrice: 12000, rating: 4.5, reviews: 218, specs: 'Cordless Cyclonic HEPA Vacuum', desc: 'High performance cordless vacuum with washable HEPA filter and multi-nozzles.', features: ['Rechargeable battery', 'Handy stick utility'], color: ['Black'], installType: 'Wall Mounted' }
    ],
    'Vegetable Cleaners': [
      { id: 'kent-veg-cleaner', name: 'KENT Ozone Veg Cleaner', price: 6500, basePrice: 8000, rating: 4.7, reviews: 310, specs: 'Ozone Disinfectant Desk model', desc: 'Uses active ozone to destroy chemical pesticides and bacterial pathogens on produce.', features: ['Kills bacteria/pesticides', 'Preserves freshness'], color: ['White'], installType: 'Counter Top' }
    ],
    'Solar Panels': [
      { id: 'kent-solar-400w', name: 'KENT Solar Panel 400W Mono', price: 14500, basePrice: 18000, rating: 4.9, reviews: 34, specs: 'High efficiency solar panels', desc: 'Premium A-grade Mono PERC silicon cells for maximum solar charge efficiency.', features: ['A-Grade Silicon cells', 'Weather resistant'], color: ['Black'], installType: 'Wall Mounted' }
    ],
    'Solar Inverters': [
      { id: 'kent-inverter-5kw', name: 'KENT Smart Grid Inverter 5kW', price: 42000, basePrice: 48000, rating: 4.8, reviews: 19, specs: 'Pure sine wave smart solar inverter', desc: 'Dual MPPT grid-connected inverter with built-in remote mobile status monitor.', features: ['Dual MPPT trackers', 'Mobile monitoring app'], color: ['Black'], installType: 'Wall Mounted' }
    ]
  };

  const currentProducts = catalog[activeSubCategory] || [];

  // Reset max price boundary and clear filters on subcategory switch
  useEffect(() => {
    if (currentProducts.length > 0) {
      const maxVal = Math.max(...currentProducts.map(p => p.price));
      setMaxPrice(maxVal + 2000);
      setMinPrice(0);
    }
    // Clear selections
    setSelectedColors([]);
    setSelectedInstallTypes([]);
    setSelectedTechs([]);
    setSelectedRoFeatures([]);
  }, [activeSubCategory]);

  // Toggle Filters
  const handleToggleColor = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleToggleInstallType = (type) => {
    setSelectedInstallTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleToggleTech = (tech) => {
    setSelectedTechs(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const handleToggleRoFeature = (feature) => {
    setSelectedRoFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  // Reset Actions
  const handleResetPrice = () => {
    setMinPrice(0);
    if (currentProducts.length > 0) {
      const maxVal = Math.max(...currentProducts.map(p => p.price));
      setMaxPrice(maxVal + 2000);
    } else {
      setMaxPrice(45000);
    }
  };

  const handleResetColors = () => setSelectedColors([]);
  const handleResetInstallTypes = () => setSelectedInstallTypes([]);
  const handleResetTechs = () => setSelectedTechs([]);
  const handleResetRoFeatures = () => setSelectedRoFeatures([]);

  // Filtering Logic
  const filteredProducts = currentProducts.filter(p => {
    // Price Filter
    if (p.price < minPrice || p.price > maxPrice) return false;

    // Color Filter
    if (selectedColors.length > 0) {
      if (!p.color || !p.color.some(c => selectedColors.includes(c))) return false;
    }

    // Installation Type Filter
    if (selectedInstallTypes.length > 0) {
      if (!p.installType || !selectedInstallTypes.includes(p.installType)) return false;
    }

    // Purification Technology Filter
    if (selectedTechs.length > 0) {
      if (!p.tech || !selectedTechs.includes(p.tech)) return false;
    }

    // RO Features Filter
    if (selectedRoFeatures.length > 0) {
      if (!p.roFeatures || !p.roFeatures.some(f => selectedRoFeatures.includes(f))) return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'alpha-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'alpha-desc') return b.name.localeCompare(a.name);
    return b.rating - a.rating; // Popularity (rating-desc)
  });

  const handleCategoryCardClick = (catId) => {
    onCategoryChange(catId);
    const subs = subCategoriesMap[catId];
    if (subs && subs.length > 0) {
      onSubCategoryChange(subs[0]);
    }
  };

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price-asc', label: 'Price, low to high' },
    { value: 'price-desc', label: 'Price, high to low' },
    { value: 'alpha-asc', label: 'Alphabetically, A-Z' },
    { value: 'alpha-desc', label: 'Alphabetically, Z-A' }
  ];

  const installTypes = ['Counter Top', 'Under The Counter', 'Wall Mounted'];

  const purificationTechs = [
    'RO + UF + TDS Control',
    'RO + UF + UV + Alkaline + TDS Control',
    'RO + UV + UF + Alkaline + Copper + TDS Control',
    'RO + UV + UF + Copper + TDS Control',
    'RO + UV + UF + TDS Control'
  ];

  const roFeaturesList = ['Best Selling', 'Zero Water Wastage Technology'];

  const renderCardMockup = (type, isActive) => {
    switch (type) {
      case 'purifier':
        return (
          <div className="w-12 h-14 bg-slate-900 rounded shadow p-1 flex flex-col justify-between relative select-none">
            <span className="text-[3px] text-blue-400 font-bold leading-none">KENT</span>
            <div className="h-3 w-full bg-slate-800 rounded-xs flex items-center justify-center">
              <div className="w-1 h-1 bg-orange-500 rounded-full" />
            </div>
            <div className="h-4 w-full bg-gradient-to-t from-blue-900/40 to-slate-850 rounded-xs" />
          </div>
        );
      case 'softener':
        return (
          <div className="w-10 h-14 bg-slate-100 rounded border border-slate-200 p-0.5 flex flex-col justify-between select-none">
            <div className="w-5 h-9 bg-blue-500 rounded-full mx-auto border border-blue-600 flex flex-col justify-around p-0.5">
              <div className="w-full h-1 bg-white/20 rounded-full" />
            </div>
            <div className="h-1.5 w-full bg-slate-350 rounded-xs" />
          </div>
        );
      case 'kitchen':
        return (
          <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-lg shadow p-1 flex flex-col justify-between items-center select-none">
            <div className="w-3 h-0.5 bg-orange-500 rounded-full" />
            <div className="w-7 h-7 bg-slate-800 rounded flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border border-slate-700 bg-slate-950 flex items-center justify-center">
                <span className="text-[3px] text-orange-400">180°</span>
              </div>
            </div>
          </div>
        );
      case 'home':
        return (
          <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-full shadow flex items-center justify-center relative select-none">
            <div className="w-7 h-7 rounded-full bg-[#008DDF] flex items-center justify-center text-white">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        );
      case 'solar':
        return (
          <div className="w-12 h-14 bg-blue-950 border border-blue-900 rounded p-0.5 grid grid-cols-3 gap-0.5 select-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-blue-900" />
            ))}
          </div>
        );
      default:
        return <div className="w-8 h-10 bg-slate-200 rounded select-none" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 select-none">
      
      {/* 1. Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-sm text-slate-500 font-semibold text-left mb-8 border-b border-slate-100 pb-3">
        <button 
          onClick={onBackToHome}
          className="hover:text-[#0b3178] transition focus:outline-none cursor-pointer"
        >
          Home
        </button>
        <span>&gt;</span>
        <button 
          onClick={() => handleCategoryCardClick(activeCategory)}
          className="text-[#091E42] font-bold hover:text-[#0b3178] focus:outline-none cursor-pointer"
        >
          {activeCategory}
        </button>
        <span>&gt;</span>
        <span className="text-slate-400 font-normal">{activeSubCategory}</span>
      </div>

      {/* 2. Horizontal Category Division Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {categoryCards.map((card) => {
          const isActive = activeCategory === card.id;
          return (
            <button
              key={card.id}
              onClick={() => handleCategoryCardClick(card.id)}
              className={`flex items-center space-x-4 p-4 rounded-xl transition duration-300 focus:outline-none text-left cursor-pointer border ${
                isActive 
                  ? 'border-[#0b3178] bg-blue-50/40 shadow-xs' 
                  : 'border-slate-100 bg-slate-50 hover:bg-slate-100/50'
              }`}
            >
              <div className="flex-shrink-0">
                {renderCardMockup(card.type, isActive)}
              </div>
              <span className={`text-xs font-black leading-tight ${
                isActive ? 'text-[#0b3178]' : 'text-slate-800'
              }`}>
                {card.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Sub-Category Tabs Filter Bar */}
      <div className="flex items-center space-x-2.5 overflow-x-auto pb-4 border-b border-slate-100 mb-10 scrollbar-thin">
        {subCategoriesMap[activeCategory]?.map((subName) => {
          const isSelected = activeSubCategory === subName;
          return (
            <button
              key={subName}
              onClick={() => onSubCategoryChange(subName)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition cursor-pointer flex-shrink-0 ${
                isSelected 
                  ? 'bg-[#0b3178] text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {subName}
            </button>
          );
        })}
      </div>

      {/* 4. Split Layout: Left Filter Sidebar next to Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT SIDEBAR: FILTERS SIDEBAR */}
        <div className="lg:col-span-3 bg-white border border-slate-150 rounded-2xl p-5 space-y-5 text-left shadow-xs">
          
          {/* Filter Section: Sort By */}
          <div className="space-y-3.5">
            <h4 className="font-extrabold text-[#091E42] text-sm tracking-tight uppercase border-b border-slate-55 pb-2">
              Sort By
            </h4>
            
            <div className="space-y-2.5">
              {sortOptions.map((opt) => {
                const isSelected = sortBy === opt.value;
                return (
                  <label 
                    key={opt.value} 
                    className="flex items-center space-x-3 cursor-pointer group text-xs text-slate-700 font-semibold select-none"
                  >
                    <input 
                      type="radio" 
                      name="sortBy"
                      value={opt.value}
                      checked={isSelected} 
                      onChange={() => setSortBy(opt.value)} 
                      className="hidden" 
                    />
                    <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition ${
                      isSelected ? 'border-brand-blue bg-white' : 'border-slate-355 bg-slate-50'
                    }`}>
                      {isSelected && (
                        <div className="w-2.5 h-2.5 bg-brand-blue rounded-full" />
                      )}
                    </div>
                    <span className={`group-hover:text-brand-blue transition ${
                      isSelected ? 'text-brand-blue font-bold' : ''
                    }`}>
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* Filter Section: Price */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-55 pb-2">
              <button 
                onClick={() => setIsPriceExpanded(!isPriceExpanded)}
                className="flex items-center space-x-1.5 font-extrabold text-[#091E42] text-sm tracking-tight uppercase cursor-pointer focus:outline-none"
              >
                <span>Price</span>
                {isPriceExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              
              <button 
                onClick={handleResetPrice}
                className="text-[11px] font-extrabold text-slate-400 hover:text-brand-blue transition cursor-pointer focus:outline-none"
              >
                Reset
              </button>
            </div>

            {isPriceExpanded && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="relative pt-2 pb-1 px-1">
                  <input 
                    type="range" 
                    min="0" 
                    max="50000" 
                    step="500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-brand-blue/20 rounded-lg appearance-none cursor-pointer accent-brand-blue focus:outline-none"
                  />
                  <div className="absolute top-3.5 left-1.5 right-1.5 h-1 bg-brand-blue rounded-full pointer-events-none" style={{ right: `${((50000 - maxPrice) / 50000) * 100}%` }} />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="flex-grow bg-slate-50 border border-slate-150 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-bold font-mono">
                    <span className="text-slate-400 mr-1.5">₹</span>
                    {minPrice}
                  </div>
                  <span className="text-slate-400 text-xs font-bold font-mono">—</span>
                  <div className="flex-grow bg-slate-50 border border-slate-150 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-bold font-mono">
                    <span className="text-slate-400 mr-1.5">₹</span>
                    {maxPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* WATER PURIFIER FILTERS CONTAINER */}
          {activeCategory === 'Water Purifiers' && (
            <>
              <div className="border-t border-slate-100" />

              {/* Filter Section: Color */}
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-slate-55 pb-2">
                  <button 
                    onClick={() => setIsColorExpanded(!isColorExpanded)}
                    className="flex items-center space-x-1.5 font-extrabold text-[#091E42] text-sm tracking-tight uppercase cursor-pointer focus:outline-none"
                  >
                    <span>Color</span>
                    {isColorExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  
                  <button 
                    onClick={handleResetColors}
                    className="text-[11px] font-extrabold text-slate-400 hover:text-brand-blue transition cursor-pointer focus:outline-none"
                  >
                    Reset
                  </button>
                </div>

                {isColorExpanded && (
                  <div className="space-y-2.5 animate-in fade-in duration-200">
                    {['Black', 'White'].map((colorName) => {
                      const isSelected = selectedColors.includes(colorName);
                      return (
                        <button 
                          key={colorName}
                          onClick={() => handleToggleColor(colorName)}
                          className="w-full flex items-center space-x-3 cursor-pointer group text-xs text-slate-700 font-semibold select-none text-left focus:outline-none"
                        >
                          <div className={`w-5 h-5 rounded-full border shadow-xs transition flex items-center justify-center ${
                            colorName === 'White' ? 'border-slate-250 bg-white' : 'border-slate-800 bg-slate-900'
                          } ${
                            isSelected ? 'ring-2 ring-brand-blue ring-offset-1 scale-105' : ''
                          }`}>
                            {isSelected && (
                              <span className={`text-[10px] font-black ${
                                colorName === 'White' ? 'text-slate-800' : 'text-white'
                              }`}>✓</span>
                            )}
                          </div>
                          <span className={isSelected ? 'text-brand-blue font-bold' : ''}>
                            {colorName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100" />

              {/* Filter Section: Installation Type */}
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-slate-55 pb-2">
                  <button 
                    onClick={() => setIsInstallExpanded(!isInstallExpanded)}
                    className="flex items-center space-x-1.5 font-extrabold text-[#091E42] text-sm tracking-tight uppercase cursor-pointer focus:outline-none"
                  >
                    <span>Installation Type</span>
                    {isInstallExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  
                  <button 
                    onClick={handleResetInstallTypes}
                    className="text-[11px] font-extrabold text-slate-400 hover:text-brand-blue transition cursor-pointer focus:outline-none"
                  >
                    Reset
                  </button>
                </div>

                {isInstallExpanded && (
                  <div className="space-y-2.5 animate-in fade-in duration-200">
                    {installTypes.map((type) => {
                      const isSelected = selectedInstallTypes.includes(type);
                      return (
                        <button 
                          key={type}
                          onClick={() => handleToggleInstallType(type)}
                          className="w-full flex items-center space-x-3 cursor-pointer group text-xs text-slate-700 font-semibold select-none text-left focus:outline-none"
                        >
                          <div className={`w-4.5 h-4.5 rounded border transition flex items-center justify-center ${
                            isSelected ? 'border-brand-blue bg-brand-blue text-white' : 'border-slate-300 bg-slate-50'
                          }`}>
                            {isSelected && <span className="text-[10px] font-black leading-none">✓</span>}
                          </div>
                          <span className={isSelected ? 'text-brand-blue font-bold' : ''}>
                            {type}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100" />

              {/* Filter Section: Purification Technology */}
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-slate-55 pb-2">
                  <button 
                    onClick={() => setIsTechExpanded(!isTechExpanded)}
                    className="flex items-center space-x-1.5 font-extrabold text-[#091E42] text-sm tracking-tight uppercase cursor-pointer focus:outline-none"
                  >
                    <span>Purification Technology</span>
                    {isTechExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  
                  <button 
                    onClick={handleResetTechs}
                    className="text-[11px] font-extrabold text-slate-400 hover:text-brand-blue transition cursor-pointer focus:outline-none"
                  >
                    Reset
                  </button>
                </div>

                {isTechExpanded && (
                  <div className="space-y-2.5 animate-in fade-in duration-200">
                    {purificationTechs.map((tech) => {
                      const isSelected = selectedTechs.includes(tech);
                      return (
                        <button 
                          key={tech}
                          onClick={() => handleToggleTech(tech)}
                          className="w-full flex items-start space-x-3 cursor-pointer group text-xs text-slate-700 font-semibold select-none text-left focus:outline-none"
                        >
                          <div className={`w-4.5 h-4.5 rounded border transition flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isSelected ? 'border-brand-blue bg-brand-blue text-white' : 'border-slate-300 bg-slate-50'
                          }`}>
                            {isSelected && <span className="text-[10px] font-black leading-none">✓</span>}
                          </div>
                          <span className={`leading-normal ${isSelected ? 'text-brand-blue font-bold' : ''}`}>
                            {tech}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100" />

              {/* Filter Section: RO Features */}
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-slate-55 pb-2">
                  <button 
                    onClick={() => setIsRoFeaturesExpanded(!isRoFeaturesExpanded)}
                    className="flex items-center space-x-1.5 font-extrabold text-[#091E42] text-sm tracking-tight uppercase cursor-pointer focus:outline-none"
                  >
                    <span>RO Features</span>
                    {isRoFeaturesExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  
                  <button 
                    onClick={handleResetRoFeatures}
                    className="text-[11px] font-extrabold text-slate-400 hover:text-brand-blue transition cursor-pointer focus:outline-none"
                  >
                    Reset
                  </button>
                </div>

                {isRoFeaturesExpanded && (
                  <div className="space-y-2.5 animate-in fade-in duration-200">
                    {roFeaturesList.map((feature) => {
                      const isSelected = selectedRoFeatures.includes(feature);
                      return (
                        <button 
                          key={feature}
                          onClick={() => handleToggleRoFeature(feature)}
                          className="w-full flex items-center space-x-3 cursor-pointer group text-xs text-slate-700 font-semibold select-none text-left focus:outline-none"
                        >
                          <div className={`w-4.5 h-4.5 rounded border transition flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'border-brand-blue bg-brand-blue text-white' : 'border-slate-300 bg-slate-50'
                          }`}>
                            {isSelected && <span className="text-[10px] font-black leading-none">✓</span>}
                          </div>
                          <span className={isSelected ? 'text-brand-blue font-bold' : ''}>
                            {feature}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}

        </div>

        {/* RIGHT AREA: PRODUCT LIST GRID (Matches image design exactly) */}
        <div className="lg:col-span-9 space-y-6">
          <div className="text-left space-y-2">
            <h3 className="text-lg font-black text-[#091E42] tracking-tight uppercase">
              {activeSubCategory} Range
            </h3>
            <p className="text-xs text-slate-500 leading-normal max-w-xl">
              Showing direct factory-prices for genuine KENT {activeSubCategory} models. Includes free installation service ticket.
            </p>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="py-24 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200 animate-in fade-in">
              No products match your filter criteria. Reset color, price, install type, or tech filters to view products.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((prod) => {
                const discountPercent = Math.round(((prod.basePrice - prod.price) / prod.basePrice) * 100);
                const isBlack = prod.color && prod.color.includes('Black') && !selectedColors.includes('White');

                return (
                  <div 
                    key={prod.id} 
                    className="bg-[#F4F6F9] rounded-3xl p-6 flex flex-col justify-between border border-slate-100 relative group animate-in fade-in duration-200"
                  >
                    {/* Centered Product Mockup & Hot Pink Discount Badge */}
                    <div className="h-44 w-full bg-transparent flex items-center justify-center relative select-none mb-6 pt-4">
                      
                      {/* Save % Hot Pink Badge */}
                      <span className="absolute top-0 right-0 bg-[#EC008C] text-white text-[10px] md:text-xs font-bold py-1 px-3 rounded-lg shadow-sm z-10">
                        Save {discountPercent}%
                      </span>

                      {/* Generative Kent RO Purifier Cabinet Mockup (Black or White) */}
                      <div className={`w-20 h-28 bg-gradient-to-b ${
                        isBlack ? 'from-[#2d3035] to-[#121212] border-slate-700' : 'from-blue-50 to-blue-200 border-white'
                      } rounded-2xl border-4 shadow-lg flex flex-col justify-between p-2 relative transform transition-transform duration-300 group-hover:scale-110`}>
                        
                        {/* Top Copper panel console */}
                        <div className="h-5 w-full bg-gradient-to-r from-amber-500 to-amber-700 rounded-xs border border-amber-600/30 flex items-center justify-center p-0.5">
                          <div className="w-3 h-2 bg-slate-900 border border-slate-800 rounded-xs flex items-center justify-center">
                            <div className="w-1 h-1 bg-[#FF5A00] rounded-full animate-pulse" />
                          </div>
                        </div>

                        {/* Dispensation cup under water stream */}
                        <div className="flex-grow w-full flex items-center justify-center relative">
                          <div className="absolute top-0 w-0.5 h-5 bg-cyan-400/80 rounded-full animate-pulse" />
                          <div className="absolute bottom-1 w-5 h-7 bg-blue-100/50 border border-blue-400 rounded-b-md flex flex-col justify-end p-0.5">
                            <div className="w-full h-2.5 bg-cyan-400/30 rounded-b-xs" />
                          </div>
                        </div>

                        <span className={`text-[4.5px] font-extrabold uppercase text-center ${
                          isBlack ? 'text-white/40' : 'text-slate-500'
                        }`}>Mineral RO™</span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="text-left space-y-2 flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-extrabold text-[#091E42] leading-snug line-clamp-2 h-10 group-hover:text-[#0b3178] transition duration-200">
                          {prod.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-2 line-clamp-2">
                          {prod.desc}
                        </p>
                      </div>

                      {/* Pricing block matching image exactly */}
                      <div className="mt-4 mb-4 space-y-1">
                        <div className="text-xs font-bold text-slate-800">
                          Best Price : <span className="text-sm md:text-base font-black text-[#091E42]">₹ {prod.price.toLocaleString('en-IN')}.00</span>
                        </div>
                        <div className="text-[11px] font-semibold text-slate-500">
                          MRP <span className="line-through">₹ {prod.basePrice.toLocaleString('en-IN')}.00</span>{' '}
                          <span className="text-[9px] text-slate-400 font-medium">(Inclusive of all taxes)</span>
                        </div>
                      </div>

                      {/* Action buttons matching image layout side by side */}
                      <div className="flex space-x-2.5 mt-2">
                        <button 
                          onClick={() => {
                            onBuyNow({
                              id: prod.id,
                              name: prod.name,
                              price: prod.price,
                              color: prod.color ? prod.color[0] : 'White'
                            });
                          }}
                          className="flex-1 bg-[#1a3673] hover:bg-[#0f2552] text-white text-xs font-bold py-3 px-4 rounded-full shadow-md transition duration-200 cursor-pointer"
                        >
                          Buy Now
                        </button>
                        
                        <button 
                          onClick={() => {
                            onAddToCart({
                              id: prod.id,
                              name: prod.name,
                              price: prod.price,
                              color: prod.color ? prod.color[0] : 'White'
                            });
                          }}
                          className="flex-1 border border-[#1a3673] hover:bg-[#1a3673]/5 text-[#1a3673] text-xs font-bold py-3 px-4 rounded-full transition duration-200 cursor-pointer text-center"
                        >
                          Add to Cart
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
