import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Bestsellers({ onBuyNow, onNavigateToCategory, onOpenDemo, onSelectProduct }) {
  const [bestsellersIndex, setBestsellersIndex] = useState(0);

  const bestsellers = [
    {
      id: 'kent-grand-plus',
      name: 'KENT Grand Plus RO Water Purifier',
      category: 'Water Purifiers',
      subCategory: 'RO Purifiers',
      mrp: 25500,
      price: 19999,
      discount: 'Save 22%',
      image: '/kent-sapphire-iot.png',
      hasColors: true,
      colors: ['White', 'Black']
    },
    {
      id: 'kent-autosoft-8l',
      name: 'KENT Automatic Water Softener 8L',
      category: 'Water Softeners',
      subCategory: 'KENT Autosoft',
      mrp: 36000,
      price: 30500,
      discount: 'Save 15%',
      image: '/water-softner/kent-auto-soft.webp',
      hasColors: false
    },
    {
      id: 'kent-chopper',
      name: 'KENT Super Egg Boiler',
      category: 'Kitchen Appliances',
      subCategory: 'Electric Chopper',
      mrp: 1800,
      price: 1099,
      discount: 'Save 39%',
      image: '/kitchen-appliancs/info-web-electric-chopper.webp',
      hasColors: false
    },
    {
      id: 'kent-airfryer',
      name: 'KENT Digital Air Fryer Oven',
      category: 'Kitchen Appliances',
      subCategory: 'Air Fryers',
      mrp: 9999,
      price: 7999,
      discount: 'Save 20%',
      image: '/kitchen-appliancs/kent-digital-air-fryer-oven.webp',
      hasColors: false
    },
    {
      id: 'kent-induction',
      name: 'KENT Star Induction Cooktop',
      category: 'Kitchen Appliances',
      subCategory: 'Induction Cooktop',
      mrp: 4500,
      price: 3499,
      discount: 'Save 22%',
      image: '/kitchen-appliancs/kent-star-induction-cooktop-1.webp',
      hasColors: false
    },
    {
      id: 'kent-mixer',
      name: 'KENT Truemix Mixer Grinder',
      category: 'Kitchen Appliances',
      subCategory: 'Mixer Grinders',
      mrp: 6999,
      price: 5499,
      discount: 'Save 21%',
      image: '/kitchen-appliancs/kent-truemix.webp',
      hasColors: false
    },
    {
      id: 'kent-alps-plus',
      name: 'KENT Alps+ HEPA Air Purifier',
      category: 'Home Appliances',
      subCategory: 'Air Purifiers',
      mrp: 19999,
      price: 15999,
      discount: 'Save 20%',
      image: '/home-applicances/kent-alps-plus-uv-air-purifier-1.webp',
      hasColors: false
    },
    {
      id: 'kent-zoom',
      name: 'KENT Roboklean Robotic Vacuum',
      category: 'Home Appliances',
      subCategory: 'Vacuum Cleaners',
      mrp: 24000,
      price: 18999,
      discount: 'Save 21%',
      image: '/home-applicances/kent-roboklean-r1-robotic-vacuum-cleaner-1.webp',
      hasColors: false
    },
    {
      id: 'kent-swift-steamer',
      name: 'KENT Swift Handheld Garment Steamer',
      category: 'Home Appliances',
      subCategory: 'Steam Irons',
      mrp: 3200,
      price: 2499,
      discount: 'Save 22%',
      image: '/home-applicances/kent-swift-handheld-garment-steamer-1.webp',
      hasColors: false
    }
  ];

  const totalSlides = Math.ceil(bestsellers.length / 3);

  return (
    <section className="w-full bg-white py-12 md:py-16 select-none border-t border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-10 text-left">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#091E42] tracking-tight leading-snug max-w-4xl">
            Discover our bestsellers from KENT's extensive range of innovative products.
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-2 font-medium leading-relaxed">
            Our best-selling products, chosen by families across India for performance, durability, and purity.
          </p>
        </div>

        {/* Horizontal Sliding Carousel Track */}
        <div className="w-full overflow-hidden">
          <motion.div
            className="flex space-x-6 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: -((bestsellers.length - 3) * 380), right: 0 }}
            dragElastic={0.15}
            onDragEnd={(e, info) => {
              if (info.offset.x < -100 && bestsellersIndex < totalSlides - 1) {
                setBestsellersIndex(prev => prev + 1);
              } else if (info.offset.x > 100 && bestsellersIndex > 0) {
                setBestsellersIndex(prev => prev - 1);
              }
            }}
            animate={{ x: -bestsellersIndex * 1140 }}
            transition={{ type: 'spring', damping: 26, stiffness: 170 }}
          >
            {bestsellers.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  if (onSelectProduct) {
                    onSelectProduct(prod);
                  } else {
                    window.location.href = `/products/${prod.id}`;
                  }
                }}
                className="w-[360px] md:w-[370px] flex-shrink-0 flex flex-col justify-between items-start group relative cursor-pointer"
              >
                {/* Image Container with Discount Badge */}
                <div className="w-full h-[280px] bg-slate-50/60 rounded-2xl p-6 relative flex items-center justify-center border border-slate-100/80 group-hover:border-slate-200 group-hover:shadow-md transition-all duration-300 mb-5">
                  {/* Save % Pink Badge */}
                  <div className="bg-[#ec008c] text-white text-[11px] font-black px-2.5 py-1 rounded-sm shadow-xs uppercase tracking-wider absolute top-4 right-4 z-10">
                    {prod.discount}
                  </div>

                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="w-full text-left space-y-2 mb-4">
                  <h3 className="text-base md:text-lg font-bold text-[#091E42] leading-snug group-hover:text-[#1b3d7d] transition-colors">
                    {prod.name}
                  </h3>

                  <div className="flex items-center space-x-2 text-xs md:text-sm font-medium">
                    <span className="text-slate-500">
                      MRP <span className="line-through">₹{prod.mrp.toLocaleString('en-IN')}.00</span>
                    </span>
                    <span className="text-[#091E42] font-bold">
                      ₹{prod.price.toLocaleString('en-IN')}.00
                    </span>
                  </div>

                  {/* Optional Color Swatches */}
                  {prod.hasColors ? (
                    <div className="flex items-center space-x-1.5 pt-1">
                      <div className="w-4 h-4 bg-white border-2 border-slate-300 rounded-xs shadow-xs" title="White" />
                      <div className="w-4 h-4 bg-black border-2 border-slate-300 rounded-xs shadow-xs" title="Black" />
                    </div>
                  ) : (
                    <div className="h-5" />
                  )}
                </div>

                {/* Go for Enquiry Action CTA Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenDemo) {
                      onOpenDemo(prod);
                    } else if (onNavigateToCategory) {
                      onNavigateToCategory(prod.category, prod.subCategory);
                    } else {
                      window.location.href = `/category?cat=${encodeURIComponent(prod.category)}&sub=${encodeURIComponent(prod.subCategory)}`;
                    }
                  }}
                  className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-xs font-bold py-2.5 px-7 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Go for Enquiry
                </button>

              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Pagination Indicator Dots */}
        <div className="flex justify-center items-center space-x-2 mt-10">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setBestsellersIndex(i)}
              className={`transition-all duration-300 focus:outline-none cursor-pointer ${
                bestsellersIndex === i ? 'w-5 h-2 bg-[#091E42] rounded-full' : 'w-2 h-2 bg-slate-300'
              }`}
              style={{ borderRadius: '9999px' }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
