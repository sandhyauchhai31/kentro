import React, { useState } from 'react';
import { HelpCircle, RefreshCw, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductQuiz({ onDemoOpen }) {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    source: '',
    issue: '',
    tds: 500
  });
  const [recommendation, setRecommendation] = useState(null);

  const sources = [
    { id: 'municipal', label: 'Municipal Corporation Tap Water', desc: 'Usually low TDS, treated water.' },
    { id: 'borewell', label: 'Borewell / Ground Water', desc: 'Typically high TDS, hard, salty water.' },
    { id: 'tanker', label: 'Tanker / Mixed Supply', desc: 'Variable quality, depends on supply source.' }
  ];

  const issues = [
    { id: 'salty', label: 'Water is salty or brackish', desc: 'High concentration of dissolved salts.' },
    { id: 'smell', label: 'Chemical odor or chlorine taste', desc: 'Needs active carbon treatment.' },
    { id: 'turbid', label: 'Muddy, yellow, or turbid water', desc: 'Needs fine sediment physical filters.' },
    { id: 'none', label: 'No specific taste, just security', desc: 'Requires standard disinfection.' }
  ];

  const handleNextStep = () => {
    if (step === 1 && !selections.source) return;
    if (step === 2 && !selections.issue) return;
    
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      generateRecommendation();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const generateRecommendation = () => {
    let prod = {};
    if (selections.tds < 250 && selections.source === 'municipal') {
      prod = {
        name: "KENT Ultra Star (UV + UF)",
        price: 9499,
        tag: "Best for low TDS",
        desc: "Since your source water has low TDS, an RO membrane is not required. The double UV+UF purification will destroy all bacteria and viruses while retaining all original natural minerals.",
        features: ["In-tank UV disinfection", "High purification flow rate", "Non-electric operation support"],
        id: "kent-ultra-star"
      };
    } else if (selections.tds > 1200 || selections.issue === 'salty') {
      prod = {
        name: "KENT Grand Plus (RO+UV+UF+TDS)",
        price: 19499,
        tag: "Best for High TDS / Hard Water",
        desc: "Your water has high TDS/salts. The RO membrane will filter out dissolved heavy metals, and the patented TDS controller will allow you to maintain the essential minerals exactly as you prefer.",
        features: ["Mineral RO™ Technology", "Zero Water Wastage", "In-tank UV Disinfection", "Patented TDS Controller"],
        id: "kent-grand-plus"
      };
    } else {
      prod = {
        name: "KENT Prime Plus (RO+UV+UF)",
        price: 18499,
        tag: "Popular Choice - Balanced Water",
        desc: "Perfect for mixed sources. Protects your family from viruses, heavy metals, and visual impurities while maintaining a delicious, sweet water taste.",
        features: ["Patented TDS Controller", "Digital display monitor", "Zero Water Wastage"],
        id: "kent-prime-plus"
      };
    }
    setRecommendation(prod);
    setStep(4);
  };

  const handleRestart = () => {
    setSelections({ source: '', issue: '', tds: 500 });
    setRecommendation(null);
    setStep(1);
  };

  return (
    <section id="quiz" className="py-16 bg-white border-b border-slate-100 select-none">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Card Panel wrapper */}
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden">
          
          {/* Header Progress indicator */}
          {step <= 3 && (
            <div className="w-full mb-8">
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase mb-2">
                <span>Configure Water Profile</span>
                <span>Step {step} of 3</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-blue h-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              /* Step 1: Water Source */
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-extrabold text-[#091E42]">
                    What is the primary source of your drinking water?
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Select one to begin matching purifiers.</p>
                </div>

                <div className="space-y-3">
                  {sources.map((src) => (
                    <div
                      key={src.id}
                      onClick={() => setSelections(prev => ({ ...prev, source: src.id }))}
                      className={`p-4 rounded-xl border-2 text-left cursor-pointer transition ${
                        selections.source === src.id 
                          ? 'bg-white border-brand-blue shadow-md' 
                          : 'bg-white/60 border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <h4 className="font-extrabold text-sm text-slate-800">{src.label}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{src.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              /* Step 2: Quality Issues */
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-extrabold text-[#091E42]">
                    Do you face any specific taste, smell, or color complaints?
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">This helps select necessary filter cartridges.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {issues.map((iss) => (
                    <div
                      key={iss.id}
                      onClick={() => setSelections(prev => ({ ...prev, issue: iss.id }))}
                      className={`p-4 rounded-xl border-2 text-left cursor-pointer transition ${
                        selections.issue === iss.id 
                          ? 'bg-white border-brand-blue shadow-md' 
                          : 'bg-white/60 border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <h4 className="font-extrabold text-xs text-slate-800">{iss.label}</h4>
                      <p className="text-[10px] text-slate-500 mt-1">{iss.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              /* Step 3: TDS Slider */
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-left">
                  <h3 className="text-lg md:text-xl font-extrabold text-[#091E42]">
                    Estimate your water's TDS (Total Dissolved Solids) levels
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">If unsure, borewell water usually is &gt;500, tap is &lt;300.</p>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 text-center">
                  <span className="text-3xl font-black text-brand-blue">
                    {selections.tds} <span className="text-xs text-slate-500 font-semibold uppercase">ppm</span>
                  </span>
                  
                  <input 
                    type="range" 
                    min="50" 
                    max="2000" 
                    step="50"
                    value={selections.tds}
                    onChange={(e) => setSelections(prev => ({ ...prev, tds: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#008DDF]"
                  />

                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>50 ppm (Soft Water)</span>
                    <span>1000 ppm (Hard)</span>
                    <span>2000 ppm (Heavy Salty)</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-normal">
                    {selections.tds < 200 ? (
                      <span className="font-semibold text-green-500">Low TDS water detected. Standard UV purification recommended.</span>
                    ) : selections.tds < 1000 ? (
                      <span className="font-semibold text-brand-orange">Moderate hard water. RO + UV + TDS Controller recommended.</span>
                    ) : (
                      <span className="font-semibold text-red-500">Extremely hard/brackish water. Heavy duty RO membrane is critical.</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && recommendation && (
              /* Step 4: Results Display */
              <motion.div
                key="step-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 text-left"
              >
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 relative">
                  <span className="absolute right-4 top-4 bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                    {recommendation.tag}
                  </span>
                  
                  <span className="text-[10px] text-brand-blue font-bold uppercase tracking-widest block">Recommended Purifier</span>
                  <h3 className="text-xl md:text-2xl font-black text-[#091E42] mt-1">{recommendation.name}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{recommendation.desc}</p>

                  <div className="mt-4 space-y-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase">Highlights Included:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {recommendation.features.map((feat) => (
                        <li key={feat} className="text-xs text-slate-600 flex items-center space-x-1.5">
                          <Check size={14} className="text-green-500 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex justify-between items-center border-t border-blue-100/50 pt-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Special Direct Price</span>
                      <p className="text-xl font-black text-[#091E42]">
                        ₹{recommendation.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          window.location.href = `/category?cat=Water%20Purifiers&sub=RO%20Purifiers`;
                        }}
                        className="bg-brand-blue hover:bg-brand-dark-blue text-white text-xs font-bold py-2.5 px-5 rounded-full shadow-md transition"
                      >
                        Go for Enquiry
                      </button>
                      <button 
                        onClick={onDemoOpen}
                        className="border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white text-xs font-bold py-2.5 px-5 rounded-full transition"
                      >
                        Book a Free Demo
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button 
                    onClick={handleRestart}
                    className="text-xs text-brand-blue hover:underline font-semibold flex items-center space-x-1"
                  >
                    <RefreshCw size={12} />
                    <span>Retake Water Test</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom control buttons */}
          {step <= 3 && (
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-100">
              <button
                onClick={handlePrevStep}
                disabled={step === 1}
                className="text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center space-x-1 cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>

              <button
                onClick={handleNextStep}
                className="bg-brand-blue hover:bg-brand-dark-blue text-white text-xs font-bold py-2.5 px-6 rounded-full flex items-center space-x-1.5 shadow-md transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>{step === 3 ? 'Get Recommendation' : 'Next'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
