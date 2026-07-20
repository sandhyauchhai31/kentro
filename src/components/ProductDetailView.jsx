import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, MapPin, CheckCircle, ChevronRight, ShoppingBag, Info, FileText, Settings, Heart, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFullCatalog } from '../catalogData';
import { getDocumentById, getDocuments, addDocument } from '../services/firestoreService';

export default function ProductDetailView({ productId }) {
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null); // null | 'success' | 'error'
  const [pincodeMessage, setPincodeMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'features' | 'specs' | 'reviews'

  // Enquiry Modal States
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [offers] = useState(() => {
    try {
      const s = localStorage.getItem('kentro-offers');
      return s ? JSON.parse(s) : [];
    } catch (e) {
      return [];
    }
  });

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      try {
        let p = await getDocumentById('products', productId);
        if (!p) {
          const list = await getDocuments('products');
          p = list.find(item => item.SKU === productId || item.id === productId);
        }
        if (!p) {
          const catalog = getFullCatalog();
          for (const subCat of Object.keys(catalog)) {
            const found = catalog[subCat].find(item => item.id === productId);
            if (found) {
              p = {
                id: found.id,
                productName: found.name,
                price: found.price,
                discountPrice: found.basePrice,
                rating: found.rating || 4.7,
                reviews: found.reviews || 120,
                specifications: found.specs || '',
                colors: Array.isArray(found.color) ? found.color.join(', ') : (found.color || 'White'),
                description: found.desc || '',
                features: found.features || [],
                installType: found.installType || 'Wall Mounted',
                tech: found.tech || found.specs || '',
                imageURLs: [found.image || '/kent-sapphire-iot.png']
              };
              break;
            }
          }
        }
        if (p) {
          setProduct({
            id: p.id,
            name: p.productName,
            price: p.price,
            basePrice: p.discountPrice,
            rating: p.rating || 4.5,
            reviewsCount: p.reviews || 0,
            specs: p.specifications || '',
            color: p.colors || 'White',
            warranty: p.warranty || '1 Year Warranty',
            guarantee: p.guarantee || '3 Years Free Service Scheme',
            desc: p.description || '',
            features: p.features || [],
            installType: p.installType || 'Wall Mounted',
            tech: p.tech || p.specifications || '',
            image: p.imageURLs?.[0] || null,
            imageURLs: p.imageURLs || []
          });
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-[#0b3178] rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">Loading Product Details...</p>
        </div>
      </div>
    );
  }

  // Product not found fallback
  if (!product) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center text-center p-12 font-sans">
        <h1 className="text-2xl font-black text-[#091E42] mb-3">Product Not Found</h1>
        <p className="text-slate-500 text-sm mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link to="/" className="bg-[#0b3178] hover:bg-[#082457] text-white font-bold text-sm px-6 py-3 rounded-xl transition">
          Back to Home
        </Link>
      </div>
    );
  }

  const applicableOffers = offers.filter(off =>
    off.status === 'Active' &&
    (off.applicableTo === 'all' || off.applicableTo === product.name)
  );

  let finalPrice = product.price;
  if (selectedOffer) {
    if (selectedOffer.type === 'Percentage') {
      finalPrice = Math.max(0, Math.round(product.price * (1 - selectedOffer.value / 100)));
    } else {
      finalPrice = Math.max(0, product.price - selectedOffer.value);
    }
  }

  const discountPercent = Math.round(((product.basePrice - finalPrice) / product.basePrice) * 100);

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) {
      setCouponError('Please enter a coupon code.');
      return;
    }
    const match = applicableOffers.find(
      off => off.code.trim().toUpperCase() === couponInput.trim().toUpperCase()
    );
    if (match) {
      setSelectedOffer(match);
      setCouponInput(match.code);
      setCouponError('');
    } else {
      setCouponError('Invalid or expired coupon code.');
      setSelectedOffer(null);
    }
  };

  const handleRemoveOffer = () => {
    setSelectedOffer(null);
    setCouponInput('');
    setCouponError('');
  };

  const handleSelectOffer = (off) => {
    if (selectedOffer?.id === off.id) {
      handleRemoveOffer();
    } else {
      setSelectedOffer(off);
      setCouponInput(off.code);
      setCouponError('');
    }
  };

  // Pincode validation helper
  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode)) {
      setPincodeStatus('success');
      setPincodeMessage('✓ Delivery available by Wednesday, July 15. Free Shipping.');
    } else {
      setPincodeStatus('error');
      setPincodeMessage('✗ Please enter a valid 6-digit pincode.');
    }
  };

  // Image source mappings for mock thumbs
  const productImage = product.image || '/kent-sapphire-iot.png';
  const mainImages = [
    productImage,        // Main photo
    productImage,        // Mock close up
    'app_screen',        // Mock App Screen UI representation
    'filters_diag'       // Mock internal filters diagram representation
  ];



  return (
    <div className="bg-white min-h-screen text-[#121212] select-none font-sans antialiased pb-12">
      
      {/* Breadcrumbs Navigation */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 text-xs font-semibold text-slate-500 flex items-center space-x-1.5 border-b border-slate-100">
        <Link to="/" className="hover:text-[#0b3178] transition">Home</Link>
        <ChevronRight size={10} className="text-slate-400" />
        <Link to="/category?cat=Water%20Purifiers&sub=RO%20Purifiers" className="hover:text-[#0b3178] transition">Water Purifiers</Link>
        <ChevronRight size={10} className="text-slate-400" />
        <span className="text-slate-800">{product.name}</span>
      </div>

      {/* Main Grid View */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Product Gallery */}
        <div className="flex flex-col space-y-6">
          
          {/* Large Main Graphic Frame */}
          <div className="w-full h-[400px] md:h-[500px] bg-slate-50 border border-slate-100 rounded-3xl p-6 flex items-center justify-center relative overflow-hidden shadow-xs group">
            
            {/* Save Badges */}
            <span className="absolute top-5 left-5 bg-[#EC008C] text-white text-xs font-black px-3.5 py-1.5 rounded-lg shadow-sm z-10 uppercase tracking-wider">
              Save {discountPercent}%
            </span>
            <span className="absolute top-5 right-5 bg-[#0b3178] text-white text-xs font-black px-3.5 py-1.5 rounded-lg shadow-sm z-10 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck size={14} /> Smart IoT
            </span>

            {/* Dynamic Rendering Based on Thumbnail selection */}
            {mainImages[selectedThumb] === productImage && selectedThumb === 0 ? (
              <img
                src={productImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain transform group-hover:scale-[1.03] transition-transform duration-300"
              />
            ) : mainImages[selectedThumb] === productImage && selectedThumb === 1 ? (
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <img
                  src={productImage}
                  alt="Zoom Detail"
                  className="max-h-full max-w-full object-contain scale-[1.6] transform origin-center transition-transform duration-300"
                />
              </div>
            ) : mainImages[selectedThumb] === 'app_screen' ? (
              /* High-tech Mock Smart App Screen representation */
              <div className="w-64 h-[380px] bg-slate-900 border-4 border-slate-800 rounded-[36px] p-4 flex flex-col justify-between shadow-2xl relative select-none font-mono text-white text-left animate-in fade-in duration-300">
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                  <span>KENT SMART APP</span>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                </div>
                
                <div className="space-y-4 my-auto">
                  <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 block font-bold">CURRENT WATER PURITY</span>
                    <span className="text-3xl font-black text-cyan-400 mt-1 block">TDS 22 <span className="text-xs text-slate-400 font-medium font-sans">PPM</span></span>
                    <span className="text-[9px] text-green-400 block mt-1 font-semibold">✓ Excellent Drinking Quality</span>
                  </div>

                  <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/50 space-y-2">
                    <span className="text-[10px] text-slate-400 block font-bold">RO FILTER LIFE</span>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mt-1.5">
                      <div className="w-[94%] bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full" />
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-350 font-bold mt-1.5">
                      <span>94% Health</span>
                      <span>9,400L remaining</span>
                    </div>
                  </div>
                </div>

                <div className="text-center bg-cyan-500 text-slate-900 text-[11px] font-extrabold py-2.5 rounded-xl shadow cursor-default select-none font-sans uppercase">
                  Connected
                </div>
              </div>
            ) : (
              /* High-tech Mock Internal Filters representation */
              <div className="flex flex-col items-center space-y-6 w-full max-w-sm text-left select-none animate-in fade-in duration-300">
                <h4 className="text-sm font-extrabold text-[#0b3178] uppercase tracking-wider text-center w-full">Advanced Double Purification System</h4>
                <div className="w-full space-y-3">
                  <div className="flex items-center space-x-3.5 bg-blue-50/50 border border-blue-100 rounded-xl p-3">
                    <span className="w-7 h-7 bg-[#0b3178] text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-xs">1</span>
                    <div>
                      <h5 className="text-[12.5px] font-extrabold text-[#091E42]">RO Filtration Membrane</h5>
                      <p className="text-[11px] text-slate-500">Filters dissolved impurities and heavy metals</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3.5 bg-blue-50/50 border border-blue-100 rounded-xl p-3">
                    <span className="w-7 h-7 bg-[#0b3178] text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-xs">2</span>
                    <div>
                      <h5 className="text-[12.5px] font-extrabold text-[#091E42]">UV Disinfection Chamber</h5>
                      <p className="text-[11px] text-slate-500">Destroys bacteria, viruses, and microbial pathogens</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3.5 bg-blue-50/50 border border-blue-100 rounded-xl p-3">
                    <span className="w-7 h-7 bg-[#0b3178] text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-xs">3</span>
                    <div>
                      <h5 className="text-[12.5px] font-extrabold text-[#091E42]">Active Copper & Alkaline Infuser</h5>
                      <p className="text-[11px] text-slate-500">Restores essential minerals and balances pH levels</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Thumbnails strip */}
          <div className="grid grid-cols-4 gap-4">
            {mainImages.map((thumb, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedThumb(idx)}
                className={`h-24 bg-slate-50 border-2 rounded-2xl flex items-center justify-center p-2 relative overflow-hidden transition-all duration-200 cursor-pointer ${
                  selectedThumb === idx ? 'border-[#0b3178] shadow-xs' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                {thumb === productImage ? (
                  <img src={productImage} alt="thumbnail" className="max-h-full max-w-full object-contain" />
                ) : thumb === 'app_screen' ? (
                  <div className="w-10 h-16 bg-slate-900 border border-slate-700 rounded-sm p-0.5 flex flex-col justify-between font-mono text-[4px] text-white select-none">
                    <div className="bg-slate-800 h-2.5 rounded-xs" />
                    <div className="bg-cyan-500 h-1.5 w-full rounded-xs mt-1" />
                  </div>
                ) : (
                  <div className="flex flex-col space-y-1 w-full p-0.5">
                    <div className="h-2 bg-slate-350 rounded-xs w-full" />
                    <div className="h-2 bg-slate-350 rounded-xs w-3/4" />
                    <div className="h-2 bg-slate-350 rounded-xs w-1/2" />
                  </div>
                )}
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Product Information */}
        <div className="flex flex-col text-left space-y-6">
          <div>
            <span className="text-[#0b3178] font-bold text-xs uppercase tracking-widest block mb-1">
              KENT House of Purity
            </span>
            <h1 className="text-2xl md:text-3.5xl font-black text-[#091E42] tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-slate-500 font-bold mt-1.5">{product.specs}</p>
          </div>

          {/* Rating Widget */}
          <div className="flex items-center space-x-3 text-sm font-semibold select-none border-b border-slate-100 pb-4">
            <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md font-black">
              <span className="mr-1">{product.rating}</span>
              <Star size={14} className="fill-current" />
            </div>
            <span className="text-slate-400">|</span>
            <span className="text-[#0b3178] hover:underline cursor-pointer">{product.reviewsCount} customer reviews</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500">12 Answered Questions</span>
          </div>

          {/* Price Block */}
          <div className="space-y-1">
            <div className="flex items-baseline space-x-3.5">
              <span className={`text-2xl md:text-3.5xl font-black ${selectedOffer ? 'text-[#EC008C]' : 'text-[#0b3178]'}`}>
                ₹ {finalPrice.toLocaleString('en-IN')}.00
              </span>
              {selectedOffer && (
                <span className="text-base text-slate-450 line-through">
                  ₹ {product.price.toLocaleString('en-IN')}.00
                </span>
              )}
              <span className="text-base text-slate-400 line-through">
                MRP ₹ {product.basePrice.toLocaleString('en-IN')}.00
              </span>
            </div>
            {selectedOffer && (
              <p className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 animate-in fade-in duration-200">
                <span>✓ Coupon <strong>{selectedOffer.code}</strong> applied!</span>
                <span className="text-slate-300">|</span>
                <span>Extra savings of ₹ {(product.price - finalPrice).toLocaleString('en-IN')}!</span>
              </p>
            )}
            <p className="text-xs text-slate-500 font-semibold">(Inclusive of all taxes)</p>
          </div>

          {/* Interactive Offers & Coupons Block */}
          <div className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/50 space-y-3">
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">Offers & Coupons</span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value);
                  setCouponError('');
                }}
                className="flex-grow px-3.5 py-2.5 bg-white rounded-xl border border-slate-350 focus:border-[#0b3178] focus:outline-none text-xs font-semibold uppercase tracking-wider"
              />
              {selectedOffer ? (
                <button
                  onClick={handleRemoveOffer}
                  type="button"
                  className="bg-red-50 hover:bg-red-100 text-red-650 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer border border-red-100"
                >
                  Remove
                </button>
              ) : (
                <button
                  onClick={handleApplyCoupon}
                  type="button"
                  className="bg-[#0b3178] hover:bg-[#072457] text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  Apply
                </button>
              )}
            </div>

            {couponError && (
              <p className="text-[11px] font-semibold text-red-500 animate-in fade-in duration-150">{couponError}</p>
            )}

            {selectedOffer && !couponError && (
              <p className="text-[11px] font-semibold text-emerald-650 flex items-center gap-1 animate-in fade-in duration-150">
                <span>🎉 Coupon <strong>{selectedOffer.code}</strong> applied successfully!</span>
              </p>
            )}

            {applicableOffers.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-200/50">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Available Coupons (Tap to Apply)</span>
                <div className="space-y-2">
                  {applicableOffers.map((off) => {
                    const isApplied = selectedOffer?.id === off.id;
                    return (
                      <button
                        key={off.id}
                        onClick={() => handleSelectOffer(off)}
                        type="button"
                        className={`w-full text-left flex items-start gap-2.5 p-3 rounded-xl border transition cursor-pointer ${
                          isApplied
                            ? 'bg-emerald-50/50 border-emerald-500/80 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-emerald-500 font-bold shrink-0 text-sm mt-0.5">🏷️</span>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-mono font-black px-1.5 py-0.5 rounded tracking-wider uppercase ${
                              isApplied ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {off.code}
                            </span>
                            <span className="text-[13px] font-black text-slate-800">{off.title}</span>
                          </div>
                          {off.description && <p className="text-[11.5px] text-slate-500 font-semibold mt-1 leading-relaxed">{off.description}</p>}
                          <p className="text-[10px] text-[#1D4ED8] font-black uppercase tracking-wider mt-1">
                            Save {off.type === 'Percentage' ? `${off.value}%` : `₹${off.value.toLocaleString('en-IN')}`}
                          </p>
                        </div>
                        {isApplied && (
                          <span className="bg-emerald-500 text-white rounded-full p-0.5 self-center shrink-0">
                            <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Highlights Box */}
          <div className="bg-[#F4F6F9] rounded-2xl p-5 border border-slate-100 space-y-3">
            <div className="text-xs font-extrabold text-[#091E42] uppercase tracking-wider">Product Highlights</div>
            {product.desc && (
              <p className="text-[13px] text-slate-600 font-semibold leading-relaxed">{product.desc}</p>
            )}
            {product.features && product.features.length > 0 && (
              <ul className="text-[13px] text-slate-600 font-semibold space-y-2.5">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start"><span className="text-[#008DDF] mr-2">✦</span> {feat}</li>
                ))}
              </ul>
            )}
            {product.specs && (
              <p className="text-[12px] text-slate-500 font-bold mt-1">Technology: {product.specs}</p>
            )}
          </div>

          {/* Warranty / Installation Notice */}
          <div className="flex flex-col space-y-2 border-t border-slate-100 pt-4">
            <div className="flex items-center space-x-2 text-[13px] font-extrabold text-emerald-600">
              <CheckCircle size={15} />
              <span>Free Installation & Demo within 24 Hours</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.warranty && (
                <p className="text-[12.5px] text-slate-500 font-bold bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 w-fit flex items-center gap-1.5 select-none">
                  🛡️ <span className="text-slate-400 font-extrabold text-[10px] uppercase tracking-wider mr-0.5">Warranty:</span> {product.warranty}
                </p>
              )}
              {product.guarantee && (
                <p className="text-[12.5px] text-slate-500 font-bold bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 w-fit flex items-center gap-1.5 select-none">
                  🤝 <span className="text-slate-400 font-extrabold text-[10px] uppercase tracking-wider mr-0.5">Guarantee:</span> {product.guarantee}
                </p>
              )}
            </div>
          </div>

          {/* Color Selector */}
          <div className="border-t border-b border-slate-100 py-5 select-none">
            {/* Color Option */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Color: {product.color}</span>
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 rounded-full bg-[#121212] border-2 border-[#0b3178] p-0.5 shadow-sm focus:outline-none cursor-default" />
              </div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="select-none">
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="w-full bg-[#0b3178] hover:bg-[#072457] text-white text-[14px] font-bold py-4 rounded-xl shadow-lg transition duration-200 cursor-pointer flex items-center justify-center space-x-2"
            >
              <ShoppingBag size={18} />
              <span>Go for Enquiry</span>
            </button>
          </div>

          {/* Pincode Checker Component */}
          <div className="border-t border-slate-100 pt-5">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2.5">Check Delivery Details</span>
            <form onSubmit={handleCheckPincode} className="flex max-w-sm items-center space-x-2">
              <div className="relative flex-grow flex items-center">
                <MapPin size={16} className="absolute left-3.5 text-slate-450" />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-350 focus:border-[#0b3178] focus:outline-none text-[13.5px] font-semibold"
                />
              </div>
              <button
                type="submit"
                className="bg-slate-100 hover:bg-slate-200 text-[#0b3178] text-[13px] font-extrabold px-5 py-3 rounded-xl transition duration-150 focus:outline-none cursor-pointer"
              >
                Check
              </button>
            </form>
            {pincodeStatus && (
              <p className={`text-[12px] font-bold mt-2.5 ${
                pincodeStatus === 'success' ? 'text-green-600' : 'text-red-500'
              }`}>
                {pincodeMessage}
              </p>
            )}
          </div>

        </div>

      </div>

      {/* Tabs Drawer Details Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 select-none border-t border-slate-100 pt-10">
        
        {/* Tab Headers */}
        <div className="flex border-b border-slate-100 space-x-6 md:space-x-8 text-[14px] md:text-[15px] font-extrabold overflow-x-auto pb-0.5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 transition duration-200 focus:outline-none cursor-pointer relative ${
              activeTab === 'overview' ? 'text-[#0b3178]' : 'text-slate-500 hover:text-[#0b3178]'
            }`}
          >
            <span>Overview</span>
            {activeTab === 'overview' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0b3178] rounded-full" />}
          </button>
          
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-4 transition duration-200 focus:outline-none cursor-pointer relative ${
              activeTab === 'features' ? 'text-[#0b3178]' : 'text-slate-500 hover:text-[#0b3178]'
            }`}
          >
            <span>Key Features</span>
            {activeTab === 'features' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0b3178] rounded-full" />}
          </button>

          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 transition duration-200 focus:outline-none cursor-pointer relative ${
              activeTab === 'specs' ? 'text-[#0b3178]' : 'text-slate-500 hover:text-[#0b3178]'
            }`}
          >
            <span>Specifications</span>
            {activeTab === 'specs' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0b3178] rounded-full" />}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 transition duration-200 focus:outline-none cursor-pointer relative ${
              activeTab === 'reviews' ? 'text-[#0b3178]' : 'text-slate-500 hover:text-[#0b3178]'
            }`}
          >
            <span>Reviews ({product.reviewsCount})</span>
            {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0b3178] rounded-full" />}
          </button>
        </div>

        {/* Tab content boxes */}
        <div className="py-8 text-left text-slate-650 leading-relaxed text-[14px] md:text-[15px]">
          
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <p>
                <strong>{product.name}</strong> — {product.desc || 'A premium product from the KENT House of Purity range, engineered to deliver best-in-class performance with advanced purification technology.'}
              </p>
              {product.specs && (
                <p>
                  <strong>Purification Technology:</strong> {product.specs}
                </p>
              )}
              {product.installType && (
                <p>
                  <strong>Installation Type:</strong> {product.installType}
                </p>
              )}
            </div>
          )}

          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-150 font-sans">
              {product.features && product.features.length > 0 ? (
                product.features.map((feat, i) => {
                  const icons = [Settings, CheckCircle, Info, FileText, ShieldCheck, Heart];
                  const IconComp = icons[i % icons.length];
                  return (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="p-2.5 bg-blue-50/50 text-[#0b3178] rounded-xl border border-blue-100">
                        <IconComp size={18} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[15px] text-[#091E42] mb-1">{feat}</h4>
                        <p className="text-[13.5px] text-slate-500">Key feature of {product.name}.</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-500 text-sm col-span-2">No specific features listed for this product.</p>
              )}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="border border-slate-100 rounded-2xl overflow-hidden max-w-3xl animate-in fade-in duration-150">
              <table className="w-full border-collapse text-[13.5px] font-semibold text-slate-600 bg-white">
                <tbody>
                  <tr className="border-b border-slate-50 bg-slate-50/30">
                    <td className="px-5 py-3.5 font-bold text-slate-800 w-1/3">Product</td>
                    <td className="px-5 py-3.5">{product.name}</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="px-5 py-3.5 font-bold text-slate-800">Product ID</td>
                    <td className="px-5 py-3.5">{product.id}</td>
                  </tr>
                  {product.tech && (
                    <tr className="border-b border-slate-50 bg-slate-50/30">
                      <td className="px-5 py-3.5 font-bold text-slate-800">Purification Technology</td>
                      <td className="px-5 py-3.5">{product.tech}</td>
                    </tr>
                  )}
                  <tr className="border-b border-slate-50">
                    <td className="px-5 py-3.5 font-bold text-slate-800">Mounting Style</td>
                    <td className="px-5 py-3.5">{product.installType}</td>
                  </tr>
                  <tr className="border-b border-slate-50 bg-slate-50/30">
                    <td className="px-5 py-3.5 font-bold text-slate-800">Color</td>
                    <td className="px-5 py-3.5">{product.color}</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="px-5 py-3.5 font-bold text-slate-800">Sale Price</td>
                    <td className="px-5 py-3.5">
                      ₹ {finalPrice.toLocaleString('en-IN')}.00
                      {selectedOffer && (
                        <span className="text-emerald-600 text-xs font-bold ml-2">
                          (Offer {selectedOffer.code} Applied)
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-50 bg-slate-50/30">
                    <td className="px-5 py-3.5 font-bold text-slate-800">MRP</td>
                    <td className="px-5 py-3.5">₹ {product.basePrice.toLocaleString('en-IN')}.00</td>
                  </tr>
                  {product.warranty && (
                    <tr className="border-b border-slate-50">
                      <td className="px-5 py-3.5 font-bold text-slate-800">Warranty</td>
                      <td className="px-5 py-3.5">{product.warranty}</td>
                    </tr>
                  )}
                  {product.guarantee && (
                    <tr className="bg-slate-50/30">
                      <td className="px-5 py-3.5 font-bold text-slate-800">Guarantee</td>
                      <td className="px-5 py-3.5">{product.guarantee}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
              
              {/* Ratings Overview Summary */}
              <div className="flex flex-wrap items-center bg-slate-50/40 border border-slate-100 rounded-2xl p-6 gap-6 md:gap-10">
                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-black text-[#091E42]">{product.rating}</span>
                  <div className="flex items-center text-amber-500 mt-1.5 mb-1 text-sm">
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                  </div>
                  <span className="text-xs text-slate-450 font-bold">{product.reviewsCount} Reviews</span>
                </div>

                <div className="flex-grow space-y-1.5">
                  <div className="flex items-center space-x-2 text-[12px] font-bold text-slate-600">
                    <span className="w-10 text-right">5 Star</span>
                    <div className="flex-grow bg-slate-150 h-2 rounded-full overflow-hidden">
                      <div className="w-[92%] bg-[#0b3178] h-full rounded-full" />
                    </div>
                    <span className="w-8">92%</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[12px] font-bold text-slate-600">
                    <span className="w-10 text-right">4 Star</span>
                    <div className="flex-grow bg-slate-150 h-2 rounded-full overflow-hidden">
                      <div className="w-[6%] bg-[#0b3178] h-full rounded-full" />
                    </div>
                    <span className="w-8">6%</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[12px] font-bold text-slate-600">
                    <span className="w-10 text-right">3 Star</span>
                    <div className="flex-grow bg-slate-150 h-2 rounded-full overflow-hidden">
                      <div className="w-[2%] bg-[#0b3178] h-full rounded-full" />
                    </div>
                    <span className="w-8">2%</span>
                  </div>
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="border border-slate-100 rounded-2xl p-5 bg-white space-y-2">
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-extrabold text-[14px] text-slate-800">Sandhya Uchhai</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-100 rounded px-1.5 py-0.5">Verified Buyer</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold">July 09, 2026</span>
                  </div>
                  <div className="flex text-amber-500 text-xs">
                    <Star size={12} className="fill-current" />
                    <Star size={12} className="fill-current" />
                    <Star size={12} className="fill-current" />
                    <Star size={12} className="fill-current" />
                    <Star size={12} className="fill-current" />
                  </div>
                  <p className="text-[13.5px] text-slate-600 leading-relaxed font-medium">
                    This smart IoT purifier is excellent! I sync it with my phone and it gives me real-time warnings on TDS level changes and filter quality status. It saves me from guessing when the cartridges require replacement. The alkaline copper mineral water has a clean, smooth taste. Highly recommended.
                  </p>
                </div>

                <div className="border border-slate-100 rounded-2xl p-5 bg-white space-y-2">
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-extrabold text-[14px] text-slate-800">Ramesh Kumar</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-100 rounded px-1.5 py-0.5">Verified Buyer</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold">June 28, 2026</span>
                  </div>
                  <div className="flex text-amber-500 text-xs">
                    <Star size={12} className="fill-current" />
                    <Star size={12} className="fill-current" />
                    <Star size={12} className="fill-current" />
                    <Star size={12} className="fill-current" />
                    <Star size={12} className="fill-current" />
                  </div>
                  <p className="text-[13.5px] text-slate-600 leading-relaxed font-medium">
                    Kent service is top-notch. The technician arrived for free installation within 24 hours of purchasing the product online. The product design looks premium in the kitchen, and it does not waste water like normal RO machines. Zero water wastage works as advertised.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Enquiry Modal */}
      {isEnquiryModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-[450px] w-full border border-slate-100 shadow-2xl relative flex flex-col text-left">
            <button
              onClick={() => {
                setIsEnquiryModalOpen(false);
                setEnquirySuccess(false);
                setEnquiryMessage('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-extrabold text-sm cursor-pointer"
            >
              ✕
            </button>

            {!enquirySuccess ? (
              <form onSubmit={async (e) => {
                e.preventDefault();
                setPhoneError('');
                setSubmitError('');

                if (!/^[6-9]\d{9}$/.test(enquiryPhone.trim())) {
                  setPhoneError('Please enter a valid 10-digit mobile number starting with 6-9.');
                  return;
                }

                setIsSubmitting(true);
                const newEnquiry = {
                  customer: enquiryName.trim(),
                  mobile: enquiryPhone.trim(),
                  product: product.name,
                  message: enquiryMessage.trim(),
                  date: new Date().toLocaleString(),
                  status: 'Pending'
                };

                try {
                  await addDocument('productEnquiries', newEnquiry);
                  setEnquirySuccess(true);
                } catch (err) {
                  console.error(err);
                  setSubmitError('A database connection error occurred. Please try again.');
                } finally {
                  setIsSubmitting(false);
                }
              }} className="space-y-4">
                <h3 className="text-lg font-black text-[#091E42] tracking-tight">Product Enquiry</h3>
                <p className="text-xs text-slate-500 font-semibold mb-2">
                  Submit your details below and a KENT product specialist will get in touch with you shortly.
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-white border border-slate-200/60 rounded-lg p-1 flex items-center justify-center">
                    <img src={productImage} alt="Product Thumbnail" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800 line-clamp-1">{product.name}</h4>
                    <span className="text-[10px] text-[#0b3178] font-black">₹ {finalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={enquiryName}
                    onChange={(e) => setEnquiryName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-350 focus:border-[#0b3178] focus:outline-none text-[13px] font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={enquiryPhone}
                    onChange={(e) => {
                      setEnquiryPhone(e.target.value);
                      setPhoneError('');
                    }}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-350 focus:border-[#0b3178] focus:outline-none text-[13px] font-semibold"
                  />
                  {phoneError && (
                    <span className="text-[10px] text-red-500 font-semibold mt-1 block flex items-center gap-1">
                      <AlertCircle size={11} /> {phoneError}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">Message / Requirements</label>
                  <textarea
                    placeholder="Enter any specific requirements or message..."
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-350 focus:border-[#0b3178] focus:outline-none text-[13px] font-semibold min-h-[80px] resize-y"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">Product Info</label>
                  <input
                    type="text"
                    readOnly
                    value={`${product.name} - ₹ ${finalPrice.toLocaleString('en-IN')}`}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-500 focus:outline-none cursor-not-allowed"
                  />
                </div>

                {submitError && (
                  <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-100 text-rose-750 text-[10px] font-bold px-3 py-2 rounded-lg mt-2">
                    <AlertCircle size={13} />
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0b3178] hover:bg-[#072457] disabled:bg-slate-400 text-white py-3 rounded-xl font-bold text-[13px] shadow-md transition duration-200 cursor-pointer mt-2 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry Request'}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200 select-none">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-lg font-black text-[#091E42]">Enquiry Submitted!</h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed px-4">
                  Thank you, <strong>{enquiryName}</strong>. Your enquiry for {product.name} has been logged. A KENT representative will contact you on <strong>{enquiryPhone}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setIsEnquiryModalOpen(false);
                    setEnquirySuccess(false);
                    setEnquiryName('');
                    setEnquiryPhone('');
                    setEnquiryMessage('');
                  }}
                  className="bg-[#0b3178] hover:bg-[#072457] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition duration-150 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
