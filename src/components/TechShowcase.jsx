import React, { useState } from 'react';
import { ShieldCheck, Layers, Eye, RefreshCw, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TechShowcase() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. Sediment Filter",
      sub: "Removes visible impurities",
      desc: "Strains out large particles, mud, rust, dirt, and sand from raw water. This increases the life of subsequent filters.",
      metric: "Removes up to 99% of physical sediment particles.",
      icon: Layers,
      color: "border-blue-400 text-blue-600 bg-blue-50"
    },
    {
      title: "2. Carbon Filter",
      sub: "Eliminates odor & chlorine",
      desc: "Uses premium activated carbon granules to absorb organic chemicals, chlorine, agricultural pesticides, bad smell, and volatile organic compounds.",
      metric: "Removes 100% of residual chlorine and bad odor.",
      icon: ShieldCheck,
      color: "border-indigo-400 text-indigo-600 bg-indigo-50"
    },
    {
      title: "3. RO Membrane",
      sub: "Reduces TDS & heavy metals",
      desc: "Forces water under pressure through a semi-permeable membrane. Filters out dissolved salts, fluoride, arsenic, lead, and other heavy metals.",
      metric: "Reduces TDS by 90-95% & eliminates dissolved impurities.",
      icon: RefreshCw,
      color: "border-cyan-400 text-cyan-600 bg-cyan-50"
    },
    {
      title: "4. TDS Controller",
      sub: "Restores natural minerals",
      desc: "A patented technology that allows a controlled blending of minerals. Restores essential calcium, magnesium, and other natural salts lost during RO.",
      metric: "Keeps TDS at ideal healthy range (100 - 150 mg/L).",
      icon: Award,
      color: "border-orange-400 text-brand-orange bg-orange-50"
    },
    {
      title: "5. UV Disinfection",
      sub: "Kills viruses & bacteria",
      desc: "Exposes water to high-intensity UV-C radiation. Scrambles DNA of pathogenous microorganisms, rendering them completely harmless.",
      metric: "Ensures 99.99% pathogen-free sterile water.",
      icon: Zap,
      color: "border-purple-400 text-purple-600 bg-purple-50"
    },
    {
      title: "6. Ultra Filtration (UF)",
      sub: "Double security barrier",
      desc: "A secondary physical membrane that filters out any remaining dead bacteria, cysts, and colloidal matter, making water crystal clear.",
      metric: "Pore size of 0.01 microns filters fine suspended elements.",
      icon: Eye,
      color: "border-teal-400 text-teal-600 bg-teal-50"
    }
  ];

  return (
    <section id="technology" className="py-16 md:py-24 bg-slate-50 border-y border-slate-100 select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-brand-blue font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Patented Technology
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#091E42] tracking-tight">
            KENT Mineral RO™ Purification
          </h2>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
            Standard RO purifiers strip water of essential minerals. KENT's unique technology retains natural minerals while providing 100% pure water.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Interactive Left Pipeline Navigation */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest text-left mb-6">
              Interactive Purification Stages:
            </h3>
            
            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-6 top-6 bottom-6 w-1 bg-gradient-to-b from-blue-300 via-indigo-300 to-teal-300 rounded-full z-0 hidden sm:block" />

              <div className="space-y-4 relative z-10">
                {steps.map((step, idx) => {
                  const IconComp = step.icon;
                  const isActive = idx === activeStep;

                  return (
                    <motion.div
                      key={step.title}
                      whileHover={{ x: 4 }}
                      onClick={() => setActiveStep(idx)}
                      className={`flex flex-col sm:flex-row items-start sm:items-center p-4 rounded-xl border transition cursor-pointer text-left ${
                        isActive 
                          ? 'bg-white border-brand-blue shadow-lg' 
                          : 'bg-white/80 border-slate-100 hover:border-slate-300 hover:shadow-xs'
                      }`}
                    >
                      {/* Icon Circle */}
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 mb-3 sm:mb-0 sm:mr-4 ${
                        isActive ? step.color : 'border-slate-200 text-slate-400 bg-slate-50'
                      }`}>
                        <IconComp size={20} className={isActive ? 'animate-pulse' : ''} />
                      </div>

                      {/* Details summary */}
                      <div className="flex-grow">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-extrabold text-sm text-slate-800">{step.title}</h4>
                          {isActive && (
                            <span className="bg-brand-blue/10 text-brand-blue text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Active View
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{step.sub}</p>
                      </div>

                      <div className="hidden sm:block text-slate-400">
                        <ChevronRight size={18} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Explanation Panel */}
          <div className="lg:col-span-5">
            <div className="bg-[#091E42] text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-slate-800 h-[380px] flex flex-col justify-between">
              
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-blue/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-orange/10 rounded-full blur-3xl" />

              <div>
                <span className="text-[10px] font-black text-brand-orange uppercase tracking-wider">
                  How It Functions
                </span>
                
                {/* Active node details */}
                <div className="mt-4 space-y-4">
                  <h4 className="text-xl md:text-2xl font-black tracking-tight text-white">
                    {steps[activeStep].title}
                  </h4>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {steps[activeStep].desc}
                  </p>
                </div>
              </div>

              {/* Functional Metric Badge */}
              <div className="mt-6 border-t border-slate-800 pt-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue flex-shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h5 className="text-[10px] text-slate-400 font-bold uppercase">Efficiency Index</h5>
                    <p className="text-[11px] font-semibold text-slate-200 mt-0.5">
                      {steps[activeStep].metric}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// Simple internal helper icon
function ChevronRight({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
