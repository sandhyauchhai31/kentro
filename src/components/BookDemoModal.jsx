import React, { useState } from 'react';
import { X, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookDemoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    product: 'Water Purifier',
    whatsappConsent: true
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    
    // 10-digit phone number check
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    // Email validation
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      product: 'Water Purifier',
      whatsappConsent: true
    });
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#091E42]/60 backdrop-blur-xs"
          />

          {/* Modal Panel */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden z-50 border border-slate-100"
          >
            {/* Header */}
            <div className="bg-[#008DDF] text-white p-6 relative">
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition"
              >
                <X size={18} />
              </button>
              <h3 className="font-extrabold text-xl">Book a Free Home Demo</h3>
              <p className="text-white/80 text-xs mt-1">
                Experience the purification technology in the comfort of your home.
              </p>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {isSuccess ? (
                /* Success State */
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8 space-y-4"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
                    <CheckCircle size={40} className="animate-bounce" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-lg text-slate-800">Booking Confirmed!</h4>
                    <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                      Thank you, <span className="font-bold text-slate-800">{formData.name}</span>. We have scheduled your demo request for <span className="font-semibold text-brand-blue">{formData.product}</span>. 
                    </p>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                      Our expert product representative will call you at <span className="font-bold text-slate-800">{formData.phone}</span> shortly to coordinate the visit.
                    </p>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="bg-brand-blue hover:bg-brand-dark-blue text-white text-xs font-bold py-2.5 px-8 rounded-full shadow-md transition"
                  >
                    Close Window
                  </button>
                </motion.div>
              ) : (
                /* Form State */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={`w-full border px-3.5 py-2.5 rounded-lg text-sm focus:outline-none transition ${
                        errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-brand-blue'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[11px] text-red-500 flex items-center mt-1">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Phone & City Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number *</label>
                      <input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit number"
                        className={`w-full border px-3.5 py-2.5 rounded-lg text-sm focus:outline-none transition ${
                          errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-brand-blue'
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-[11px] text-red-500 flex items-center mt-1">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City / Town *</label>
                      <input 
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                        className={`w-full border px-3.5 py-2.5 rounded-lg text-sm focus:outline-none transition ${
                          errors.city ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-brand-blue'
                        }`}
                      />
                      {errors.city && (
                        <span className="text-[11px] text-red-500 flex items-center mt-1">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.city}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address (Optional)</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@domain.com"
                      className={`w-full border border-slate-200 px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:border-brand-blue transition ${
                        errors.email ? 'border-red-400' : ''
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-500 flex items-center mt-1">
                        <AlertCircle size={12} className="mr-1" />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Product Category Interest */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Interested Product *</label>
                    <select 
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full border border-slate-200 px-3.5 py-2.5 rounded-lg text-sm bg-white focus:outline-none focus:border-brand-blue transition"
                    >
                      <option>Water Purifier</option>
                      <option>Water Softener</option>
                      <option>Smart Kitchen Appliances</option>
                      <option>HEPA Air Purifier</option>
                      <option>Vacuum Cleaner</option>
                      <option>Solar Energy Solutions</option>
                    </select>
                  </div>

                  {/* WhatsApp Opt-in Consent */}
                  <div className="flex items-start space-x-2 pt-1">
                    <input 
                      type="checkbox"
                      id="whatsappConsent"
                      name="whatsappConsent"
                      checked={formData.whatsappConsent}
                      onChange={handleChange}
                      className="mt-0.5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue h-4 w-4"
                    />
                    <label htmlFor="whatsappConsent" className="text-slate-500 text-xs leading-tight cursor-pointer">
                      I agree to receive schedules, support, and promotional updates via WhatsApp from KENT.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-orange hover:bg-brand-dark-orange disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-xl shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center space-x-2 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Validating Details...</span>
                      </>
                    ) : (
                      <span>Schedule Free Demo</span>
                    )}
                  </button>

                  {/* Security/Trust notice */}
                  <div className="flex justify-center items-center space-x-1.5 text-[10px] text-slate-400 pt-1">
                    <Shield size={12} className="text-[#008DDF]" />
                    <span>Your details are secure. We do not share data with third parties.</span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
