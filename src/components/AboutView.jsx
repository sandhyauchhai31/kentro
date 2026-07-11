import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AboutView({ onBackToHome }) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [certIndex, setCertIndex] = useState(0);
  const [articleIndex, setArticleIndex] = useState(0);

  const awards = [
    {
      id: 1,
      title: "India's Most Desired Water Purifiers Brand",
      subtitle: "Certificate by: Trust Research Advisory | 2024",
      renderImage: () => (
        <div className="w-full aspect-[16/10] bg-white border border-slate-200/80 rounded-xl p-6 flex items-center justify-between shadow-xs select-none">
          <div className="flex-grow pr-4 space-y-2">
            <div className="text-left font-serif text-slate-800 font-extrabold text-[10px] leading-tight tracking-wider uppercase border-b border-slate-100 pb-1.5">
              TRA'S MOST DESIRED BRANDS
            </div>
            <div className="space-y-1 text-left">
              <div className="h-1 w-16 bg-slate-200 rounded-full" />
              <div className="h-1 w-24 bg-slate-150 rounded-full" />
              <div className="h-1 w-20 bg-slate-150 rounded-full" />
            </div>
            <div className="text-left font-sans text-[#0a3178] font-black text-[14px] leading-tight mt-2">
              KENT
            </div>
            <div className="text-left text-[7px] text-[#008DDF] font-bold tracking-widest uppercase">
              WATER PURIFIER BRAND
            </div>
          </div>
          <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
              <polygon points="50,10 65,40 35,40" fill="#008DDF" opacity="0.9" />
              <polygon points="35,42 65,42 75,65 25,65" fill="#FF5A00" opacity="0.9" />
              <polygon points="25,67 75,67 85,90 15,90" fill="#1a3673" opacity="0.9" />
              <polygon points="50,10 65,40 50,40" fill="white" opacity="0.15" />
              <polygon points="50,42 65,42 75,65 50,65" fill="white" opacity="0.15" />
              <polygon points="50,67 75,67 85,90 50,90" fill="white" opacity="0.15" />
            </svg>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "India's Most Desired Consumer Appliances Brand",
      subtitle: "Certificate by: Trust Research Advisory | 2024",
      renderImage: () => (
        <div className="w-full aspect-[16/10] bg-white border border-slate-200/80 rounded-xl p-6 flex items-center justify-between shadow-xs select-none">
          <div className="flex-grow pr-4 space-y-2">
            <div className="text-left font-serif text-slate-800 font-extrabold text-[10px] leading-tight tracking-wider uppercase border-b border-slate-100 pb-1.5">
              TRA'S MOST DESIRED BRANDS
            </div>
            <div className="space-y-1 text-left">
              <div className="h-1 w-16 bg-slate-200 rounded-full" />
              <div className="h-1 w-24 bg-slate-150 rounded-full" />
              <div className="h-1 w-20 bg-slate-150 rounded-full" />
            </div>
            <div className="text-left font-sans text-[#0a3178] font-black text-[14px] leading-tight mt-2">
              KENT
            </div>
            <div className="text-left text-[7px] text-[#008DDF] font-bold tracking-widest uppercase">
              CONSUMER APPLIANCES BRAND
            </div>
          </div>
          <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
              <polygon points="50,10 65,40 35,40" fill="#FF5A00" opacity="0.9" />
              <polygon points="35,42 65,42 75,65 25,65" fill="#008DDF" opacity="0.9" />
              <polygon points="25,67 75,67 85,90 15,90" fill="#1a3673" opacity="0.9" />
              <polygon points="50,10 65,40 50,40" fill="white" opacity="0.15" />
              <polygon points="50,42 65,42 75,65 50,65" fill="white" opacity="0.15" />
              <polygon points="50,67 75,67 85,90 50,90" fill="white" opacity="0.15" />
            </svg>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Most Preferred Brand in Water Purifier",
      subtitle: "Certificate by: Marksmen Daily | 2024-25",
      renderImage: () => (
        <div className="w-full aspect-[16/10] bg-slate-950 border-4 border-amber-500 rounded-xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-transparent opacity-60" />
          <div className="z-10 flex flex-col items-center space-y-1 w-full text-center">
            <div className="flex items-center justify-center space-x-1 text-[9px] font-black text-amber-400 tracking-widest uppercase">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>MOST PREFERRED</span>
            </div>
            <div className="text-[7.5px] text-slate-350 tracking-wider font-bold">BRANDS 2024-25</div>
          </div>
          <div className="z-10 flex flex-col items-center w-full text-center">
            <div className="text-amber-500 font-extrabold text-[12px] tracking-wide border-b border-amber-500/30 pb-0.5 mb-1 leading-none">
              KENT RO SYSTEMS LTD
            </div>
            <div className="text-white text-[7.5px] font-medium tracking-wide max-w-[140px] leading-tight">
              As Most Preferred Brand in Water Purifiers
            </div>
          </div>
          <div className="z-10 text-[6px] text-slate-400 font-bold uppercase tracking-wider w-full text-center">
            MARKSMEN DAILY RECOGNITION
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "India's Most Trusted RO Water Purifier Brand",
      subtitle: "Certificate by: Reader's Digest | 2024",
      renderImage: () => (
        <div className="w-full aspect-[16/10] bg-white border border-slate-200/80 rounded-xl p-6 flex items-center justify-between shadow-xs select-none">
          <div className="flex-grow pr-4 space-y-2">
            <div className="text-left font-serif text-[#EB001B] font-extrabold text-[10px] leading-tight tracking-wider uppercase border-b border-slate-100 pb-1.5">
              READER'S DIGEST TRUSTED BRAND
            </div>
            <div className="space-y-1 text-left">
              <div className="h-1 w-16 bg-slate-200 rounded-full" />
              <div className="h-1 w-24 bg-slate-150 rounded-full" />
              <div className="h-1 w-20 bg-slate-150 rounded-full" />
            </div>
            <div className="text-left font-sans text-[#1a3673] font-black text-[13px] leading-tight mt-2">
              GOLD AWARD
            </div>
            <div className="text-left text-[7.5px] text-slate-400 font-bold tracking-widest uppercase">
              KENT RO SYSTEMS - 2024
            </div>
          </div>
          <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-20 h-20 text-amber-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path className="text-white fill-current" d="M9.5 10.5l1.5 1.5 3.5-3.5 1 1-4.5 4.5-2.5-2.5 1-1z"/>
            </svg>
          </div>
        </div>
      )
    }
  ];

  const certifications = [
    {
      id: 1,
      title: "ISI CERTIFICATION",
      subtitle: "Certificate by: Bureau of Indian Standards | 2024",
      renderImage: () => (
        <div className="w-full aspect-[16/10] bg-white border border-slate-200/80 rounded-xl p-6 flex items-center justify-between shadow-xs select-none">
          <div className="flex-grow pr-4 space-y-1.5">
            <div className="text-left font-sans text-slate-800 font-extrabold text-[12px] leading-tight tracking-wider border-b border-slate-150 pb-1">
              BIS APPROVED
            </div>
            <div className="text-left text-[6px] text-slate-450 font-bold tracking-wider leading-relaxed max-w-[150px] mt-1">
              Bureau of Indian Standards ensures mandatory safety, performance, and operational excellence parameters.
            </div>
          </div>
          <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-18 h-18 text-slate-850" viewBox="0 0 100 100" fill="none">
              <rect x="5" y="5" width="90" height="90" rx="4" stroke="currentColor" strokeWidth="3" />
              <rect x="9" y="9" width="82" height="82" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <text x="50" y="24" textAnchor="middle" className="font-sans font-black text-[9px] fill-current">IS 14724</text>
              <path d="M25 45h50M25 55h50" stroke="currentColor" strokeWidth="2.5" />
              <text x="50" y="52" textAnchor="middle" className="font-serif font-black text-[22px] fill-current italic tracking-tighter">ISI</text>
              <text x="50" y="82" textAnchor="middle" className="font-sans font-bold text-[7px] fill-current">CM/L-8300180109</text>
            </svg>
          </div>
        </div>
      ),
      description: "The ISI certificate validates that the product meets Indian Standards (IS) as per mandatory quality and safety certification issued by the Bureau of Indian Standards (BIS) in India. This certification guarantees that the purifier effectively removes contaminants, ensuring safety, quality, and performance. The ISI mark signifies compliance with these mandatory standards."
    },
    {
      id: 2,
      title: "NSF INTERNATIONAL, USA",
      subtitle: "Certificate by: NSF International | USA",
      renderImage: () => (
        <div className="w-full aspect-[16/10] bg-white border border-slate-200/80 rounded-xl p-6 flex items-center justify-between shadow-xs select-none">
          <div className="flex-grow pr-4 space-y-1.5">
            <div className="text-left font-sans text-[#005da9] font-extrabold text-[12px] leading-tight tracking-wider border-b border-slate-150 pb-1">
              NSF/ANSI 58
            </div>
            <div className="text-left text-[6.5px] text-slate-455 font-bold tracking-wider leading-relaxed max-w-[150px] mt-1">
              Standard for reverse osmosis point-of-use systems validating public health protection standards.
            </div>
          </div>
          <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-[#005da9] rounded-full flex items-center justify-center shadow-sm select-none">
              <span className="text-white font-sans font-black italic text-[22px] tracking-tight">NSF</span>
            </div>
          </div>
        </div>
      ),
      description: "NSF/ANSI 58 is an American National Standard for point-of-use Reverse Osmosis systems. Developed by a joint committee, NSF/ANSI 58 addresses the different aspects of the RO system such as TDS (Total Dissolved Solids) Reduction, Performance Safety of Materials, Recovery Rating, Structural Integrity, Contaminant Reduction Performance, Information of the End User & Efficiency Rating."
    },
    {
      id: 3,
      title: "ROHS COMPLIANT",
      subtitle: "Certificate by: EU RoHS Directive",
      renderImage: () => (
        <div className="w-full aspect-[16/10] bg-white border border-slate-200/80 rounded-xl p-6 flex items-center justify-between shadow-xs select-none">
          <div className="flex-grow pr-4 space-y-1.5">
            <div className="text-left font-sans text-[#008240] font-extrabold text-[12px] leading-tight tracking-wider border-b border-slate-150 pb-1">
              ENVIRONMENTAL
            </div>
            <div className="text-left text-[6.5px] text-slate-455 font-bold tracking-wider leading-relaxed max-w-[150px] mt-1">
              Restriction of Hazardous Substances compliant certifying environment-friendly parts.
            </div>
          </div>
          <div className="w-18 h-18 bg-[#008240] rounded-xl flex flex-col items-center justify-center p-1.5 flex-shrink-0 shadow-sm relative">
            <span className="text-white font-sans font-black text-[18px] leading-none tracking-tight">RoHS</span>
            <span className="text-white font-sans font-bold text-[7px] tracking-widest uppercase mt-0.5">COMPLIANT</span>
            <svg className="absolute bottom-1 right-1 w-3.5 h-3.5 fill-current text-white/90" viewBox="0 0 24 24">
              <path d="M17 8C8 10 5.9 16.1 5 20c3.9-.9 10-3 12-12zM2 2c12 0 20 8 20 20H2V2z" />
            </svg>
          </div>
        </div>
      ),
      description: "Restriction of Hazardous Substances (RoHS) restricts the use of six hazardous materials found in electrical and electronic products. All applicable products in the EU market must pass RoHS compliance. RoHS compliance ensures that KENT products are not hazardous to the environment in terms of occupational exposure."
    },
    {
      id: 4,
      title: "WQA GOLD SEAL",
      subtitle: "Certificate by: Water Quality Association",
      renderImage: () => (
        <div className="w-full aspect-[16/10] bg-white border border-slate-200/80 rounded-xl p-6 flex items-center justify-between shadow-xs select-none">
          <div className="flex-grow pr-4 space-y-1.5">
            <div className="text-left font-sans text-amber-600 font-extrabold text-[12px] leading-tight tracking-wider border-b border-slate-150 pb-1">
              GOLD SEAL AWARD
            </div>
            <div className="text-left text-[6.5px] text-slate-450 font-bold tracking-wider leading-relaxed max-w-[150px] mt-1">
              Water Quality Association certification validates hardware structural durability.
            </div>
          </div>
          <div className="w-18 h-18 bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border border-white select-none">
            <div className="w-16 h-16 border border-white/20 rounded-full flex flex-col items-center justify-center">
              <span className="text-white font-serif font-black italic text-[16px] leading-none">WQA</span>
              <span className="text-white/95 font-sans font-extrabold text-[5.5px] uppercase tracking-wider mt-0.5">GOLD SEAL</span>
            </div>
          </div>
        </div>
      ),
      description: "WQA Gold Seal validates that water treatment equipment has been tested and certified according to industry standards for quality, safety, and performance. This certification gives consumers confidence that the system operates effectively as claimed."
    }
  ];

  const articles = [
    {
      id: 1,
      title: "Hydrogen Water Maker and the Many Health Benefits",
      description: "With the ever-evolving world, new trends are emerging every day. Hydrogen-rich water has caught the attention of the masses with its unbeatable ben...",
      author: "KENT RO Systems",
      date: "Updated on Dec 23, 2024"
    },
    {
      id: 2,
      title: "Various Kinds of Vacuum Cleaners: Selecting the Ideal One for You",
      description: "Vacuum cleaners are an integral part of our daily cleaning routine. With the advancement of technology, there are now a variety of types of vacuum ...",
      author: "KENT RO Systems",
      date: "Updated on Apr 24, 2023"
    },
    {
      id: 3,
      title: "The Importance of Access to Pure Water for Human Health and Wellbeing",
      description: "Water is essential for survival and is an important part of our everyday life. It is essential for maintaining health and well-being, and access to...",
      author: "KENT RO Systems",
      date: "Updated on Apr 24, 2023"
    },
    {
      id: 4,
      title: "Air Purifiers: A Must-Have for Safeguarding Modern Homes",
      description: "Air pollution is no longer just an outdoor concern. Indoor air quality can be up to 5 times worse. Learn how HEPA air purifiers protect families from pollen, dust...",
      author: "KENT RO Systems",
      date: "Updated on Jan 15, 2025"
    }
  ];

  // Auto rotate carousels every 4 seconds
  useEffect(() => {
    const awardsInterval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % awards.length);
    }, 4000);

    const certInterval = setInterval(() => {
      setCertIndex(prev => (prev + 1) % certifications.length);
    }, 4000);

    const articlesInterval = setInterval(() => {
      setArticleIndex(prev => (prev + 1) % articles.length);
    }, 4000);

    return () => {
      clearInterval(awardsInterval);
      clearInterval(certInterval);
      clearInterval(articlesInterval);
    };
  }, [awards.length, certifications.length, articles.length]);

  const displayAwards = [
    awards[carouselIndex],
    awards[(carouselIndex + 1) % awards.length],
    awards[(carouselIndex + 2) % awards.length]
  ];

  const displayCerts = [
    certifications[certIndex],
    certifications[(certIndex + 1) % certifications.length],
    certifications[(certIndex + 2) % certifications.length]
  ];

  const displayArticles = [
    articles[articleIndex],
    articles[(articleIndex + 1) % articles.length],
    articles[(articleIndex + 2) % articles.length]
  ];

  return (
    <div className="bg-white min-h-screen pb-16 select-none font-sans text-left">
      
      {/* Hero Banner Section (Full Screen Width) */}
      <section className="w-full mb-12">
        <div className="relative w-full h-[300px] md:h-[230px] bg-[#091E42]">
          <img 
            src="/img-4.png" 
            alt="KENT Corporate Office Building" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Three Cards Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: About Us */}
          <div className="bg-[#f4f7fc] p-6 md:p-8 rounded-lg flex items-start space-x-5 shadow-xs text-left">
            <svg className="w-9 h-9 text-[#1a3673] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="8" />
            </svg>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#091E42]">About Us</h3>
              <p className="text-xs md:text-[13px] text-slate-600 leading-relaxed font-medium">
                KENT is a trusted name in water purification and healthcare solutions. Since 1999, it has pioneered advanced technologies to provide safe, healthy, and great-tasting water. With a focus on innovation and quality, KENT offers a variety of water purifiers, air purifiers, and health-focused home solutions, making it a preferred choice for millions of families worldwide.
              </p>
            </div>
          </div>

          {/* Card 2: Vision */}
          <div className="bg-[#f4f7fc] p-6 md:p-8 rounded-lg flex items-start space-x-5 shadow-xs text-left">
            <svg className="w-9 h-9 text-[#1a3673] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="7.5" cy="14" r="3.5" />
              <circle cx="16.5" cy="14" r="3.5" />
              <path d="M11 14h2" />
              <path d="M7.5 10.5V6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v4.5" />
              <path d="M10 4v4.5M14 4v4.5" />
            </svg>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#091E42]">Vision</h3>
              <p className="text-xs md:text-[13px] text-slate-600 leading-relaxed font-medium">
                Our mission is to create a healthier planet with reliable, eco-friendly purification solutions. We enhance the quality of life for households by ensuring access to clean, safe water. By focusing on sustainability and innovation, we aim to benefit communities globally.
              </p>
            </div>
          </div>

          {/* Card 3: Mission */}
          <div className="bg-[#f4f7fc] p-6 md:p-8 rounded-lg flex items-start space-x-5 shadow-xs text-left">
            <svg className="w-9 h-9 text-[#1a3673] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="13" r="8" />
              <circle cx="11" cy="13" r="5" />
              <circle cx="11" cy="13" r="2" />
              <path d="M16 5l-5 5" />
            </svg>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#091E42]">Mission</h3>
              <p className="text-xs md:text-[13px] text-slate-600 leading-relaxed font-medium">
                To innovate advanced purification technologies that ensure health and safety, deliver high-quality products that remove impurities while retaining essential minerals, promote sustainability through water-saving solutions, and build lasting trust through reliable performance and value.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Legacy of Recognition Header Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-8 text-left select-none">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#091E42] tracking-tight">
          A Legacy of Recognition
        </h2>
        <p className="text-xs md:text-sm text-slate-500 font-semibold mt-2 leading-relaxed font-medium">
          25 Years of Trust by Millions and Most Preferred RO & Home Appliances Brands in India
        </p>
      </section>

      {/* Interactive Certificate Carousel */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16 select-none relative">
        
        {/* Desktop View (3 Cards side-by-side with slider effect) */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayAwards.map((award, i) => (
              <motion.div
                key={`award-${award.id}-${i}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col space-y-4 justify-between h-full hover:shadow-md transition duration-300"
              >
                {award.renderImage()}
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-bold text-slate-400 block tracking-wide">
                    {award.subtitle}
                  </span>
                  <h4 className="font-extrabold text-sm text-[#091E42] leading-tight">
                    {award.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile View (1 Card at a time) */}
        <div className="block md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`award-mob-${awards[carouselIndex].id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col space-y-4 justify-between"
            >
              {awards[carouselIndex].renderImage()}
              <div className="space-y-1 text-left">
                <span className="text-[10px] font-bold text-slate-400 block tracking-wide">
                  {awards[carouselIndex].subtitle}
                </span>
                <h4 className="font-extrabold text-sm text-[#091E42] leading-tight">
                  {awards[carouselIndex].title}
                </h4>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators / Dots */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          {awards.map((_, idx) => (
            <button
              key={`award-dot-${idx}`}
              onClick={() => setCarouselIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                carouselIndex === idx ? 'w-6 bg-slate-700' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </section>

      {/* Test & Certification Header Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-8 text-left select-none">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#091E42] tracking-tight">
          Test & Certification
        </h2>
      </section>

      {/* Test & Certification Carousel Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16 select-none relative">
        
        {/* Desktop View (3 Cards side-by-side) */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayCerts.map((cert, i) => (
              <motion.div
                key={`cert-${cert.id}-${i}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col space-y-4 justify-between h-full hover:shadow-md transition duration-300"
              >
                {cert.renderImage()}
                <div className="space-y-2 text-left">
                  <h4 className="font-extrabold text-sm text-[#091E42] leading-tight">
                    {cert.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed font-medium">
                    {cert.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile View (1 Card at a time) */}
        <div className="block md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`cert-mob-${certifications[certIndex].id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col space-y-4 justify-between"
            >
              {certifications[certIndex].renderImage()}
              <div className="space-y-2 text-left">
                <h4 className="font-extrabold text-sm text-[#091E42] leading-tight">
                  {certifications[certIndex].title}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  {certifications[certIndex].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators / Dots */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          {certifications.map((_, idx) => (
            <button
              key={`cert-dot-${idx}`}
              onClick={() => setCertIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                certIndex === idx ? 'w-6 bg-slate-700' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </section>

      {/* Media Kit Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16 text-left select-none">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#091E42] tracking-tight">
          Media Kit
        </h2>
        <p className="text-xs md:text-sm text-slate-500 font-semibold mt-2 leading-relaxed max-w-5xl">
          At KENT RO Systems, we strive to clarify our company profile, products, and services. Download our media kit PDF from our website for all the essential information about KENT RO Systems Ltd. You can also access additional content available separately in the media kit.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          {/* Card 1: KENT Logo */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-xs">
            <span className="font-extrabold text-sm text-[#091E42]">KENT Logo</span>
            <a 
              href="https://www.kent.co.in/cdn/shop/files/product-catalouge.pdf?v=1781523354"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-[#1a3673] hover:bg-[#122856] text-white rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer flex-shrink-0"
              aria-label="Download KENT Logo"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                <path d="M12 17V3m0 14l-5-5m5 5l5-5M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Card 2: Company Profile */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-xs">
            <span className="font-extrabold text-sm text-[#091E42]">Company Profile</span>
            <a 
              href="https://www.kent.co.in/cdn/shop/files/product-catalouge.pdf?v=1781523354"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-[#1a3673] hover:bg-[#122856] text-white rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer flex-shrink-0"
              aria-label="Download Company Profile"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                <path d="M12 17V3m0 14l-5-5m5 5l5-5M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Card 3: Dr. Mahesh Gupta Biography */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-xs">
            <span className="font-extrabold text-sm text-[#091E42]">Dr. Mahesh Gupta Biography</span>
            <a 
              href="https://www.kent.co.in/cdn/shop/files/product-catalouge.pdf?v=1781523354"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-[#1a3673] hover:bg-[#122856] text-white rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer flex-shrink-0"
              aria-label="Download Dr. Mahesh Gupta Biography"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                <path d="M12 17V3m0 14l-5-5m5 5l5-5M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16 text-left select-none">
        
        {/* Header Stack */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#091E42] tracking-tight">
              Latest Articles
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-semibold mt-2 leading-relaxed">
              Your ultimate source for latest technology news and how-to guides.
            </p>
          </div>
          <a 
            href="#blogs"
            className="bg-[#1a3673] hover:bg-[#122856] text-white px-6 py-2 rounded-full font-bold text-xs shadow-xs transition"
          >
            Read more
          </a>
        </div>

        {/* Desktop View (3 Cards side-by-side) */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayArticles.map((article, i) => (
              <motion.div
                key={`article-${article.id}-${i}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between h-full hover:shadow-md transition duration-300"
              >
                <div>
                  <h4 className="font-extrabold text-base text-[#091E42] leading-tight mb-3 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3 mb-6">
                    {article.description}
                  </p>
                </div>

                {/* Author & Date Stamp */}
                <div className="flex items-center space-x-3 pt-3 border-t border-slate-150/40">
                  <div className="w-8 h-8 rounded-full border border-slate-200 overflow-hidden flex-shrink-0 bg-slate-50 flex items-center justify-center">
                    <span className="text-[9px] font-black text-[#008DDF] tracking-tighter">KENT</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#091E42] leading-none mb-1">
                      {article.author}
                    </h5>
                    <span className="text-[10px] text-slate-400 font-semibold leading-none">
                      {article.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile View (1 Card at a time) */}
        <div className="block md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`article-mob-${articles[articleIndex].id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h4 className="font-extrabold text-base text-[#091E42] leading-tight mb-3">
                  {articles[articleIndex].title}
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                  {articles[articleIndex].description}
                </p>
              </div>

              {/* Author & Date Stamp */}
              <div className="flex items-center space-x-3 pt-3 border-t border-slate-150/40">
                <div className="w-8 h-8 rounded-full border border-slate-200 overflow-hidden flex-shrink-0 bg-slate-50 flex items-center justify-center">
                  <span className="text-[9px] font-black text-[#008DDF] tracking-tighter">KENT</span>
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[#091E42] leading-none mb-1">
                    {articles[articleIndex].author}
                  </h5>
                  <span className="text-[10px] text-slate-400 font-semibold leading-none">
                    {articles[articleIndex].date}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators / Dots */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          {articles.map((_, idx) => (
            <button
              key={`article-dot-${idx}`}
              onClick={() => setArticleIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                articleIndex === idx ? 'w-6 bg-slate-700' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </section>

      {/* Chairman's Message Video Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16 text-left select-none">
        

        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-950">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/Ty_YKSTB5co?autoplay=0&rel=0"
            title="Dr. Mahesh Gupta - Chairman, KENT RO Systems Ltd"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      {/* Why Millions Choose KENT Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16 text-left select-none">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#091E42] tracking-tight mb-8">
          Why Millions Choose KENT
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Benefit 1: KENT Advantage */}
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

          {/* Benefit 2: Trusted Brand */}
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

          {/* Benefit 3: 25 Years of Trust by Millions */}
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
  );
}
