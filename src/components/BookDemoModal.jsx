import React, { useState } from 'react';
import { X, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookDemoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    pinCode: '',
    interestedIn: 'RO Water Purifier',
    address: '',
    agreeTerms: true
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pinCode.trim()) newErrors.pinCode = 'Pin code is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    // 10-digit phone number check
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms & conditions';
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
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      pinCode: '',
      interestedIn: 'RO Water Purifier',
      address: '',
      agreeTerms: true
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
            className="relative bg-[#f8fafc] rounded-3xl shadow-2xl w-full max-w-2xl overflow-visible z-50 p-6 md:p-8 border border-slate-100/60"
          >
            {/* Close Button Square Box Outside/Offset */}
            <button 
              onClick={onClose}
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-white hover:bg-slate-50 text-slate-700 rounded-xl p-2.5 shadow-md border border-slate-100 hover:scale-105 transition cursor-pointer z-50 flex items-center justify-center"
              aria-label="Close modal"
            >
              <X size={16} strokeWidth={3} />
            </button>

            {/* Content Body */}
            <div>
              {isSuccess ? (
                /* Success State */
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-100 shadow-sm">
                    <CheckCircle size={40} className="animate-bounce" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-lg text-slate-800">Booking Confirmed!</h4>
                    <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                      Thank you, <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>. We have scheduled your demo request for <span className="font-semibold text-brand-blue">{formData.interestedIn}</span>. 
                    </p>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                      Our expert product representative will call you at <span className="font-bold text-slate-800">{formData.phone}</span> shortly to coordinate the visit in <span className="font-bold text-slate-800">{formData.city}</span>.
                    </p>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="bg-[#1a3673] hover:bg-[#122856] text-white text-xs font-bold py-2.5 px-8 rounded-full shadow-md transition cursor-pointer"
                  >
                    Close Window
                  </button>
                </motion.div>
              ) : (
                /* Form State */
                <form onSubmit={handleSubmit} className="text-left font-sans">
                  
                  {/* Heading */}
                  <h3 className="font-extrabold text-2xl md:text-3xl text-[#091E42] text-center mb-8 mt-2">
                    Book Free Demo
                  </h3>

                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">First Name*</label>
                      <input 
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full border bg-white px-3.5 py-2.5 rounded-lg text-xs focus:outline-none focus:border-[#1a3673] transition ${
                          errors.firstName ? 'border-red-400 bg-red-50/10' : 'border-slate-200'
                        }`}
                      />
                      {errors.firstName && <span className="text-[10px] text-red-500 mt-1 block font-semibold">{errors.firstName}</span>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Last Name*</label>
                      <input 
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full border bg-white px-3.5 py-2.5 rounded-lg text-xs focus:outline-none focus:border-[#1a3673] transition ${
                          errors.lastName ? 'border-red-400 bg-red-50/10' : 'border-slate-200'
                        }`}
                      />
                      {errors.lastName && <span className="text-[10px] text-red-500 mt-1 block font-semibold">{errors.lastName}</span>}
                    </div>
                  </div>

                  {/* Mobile Number & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Mobile Number*</label>
                      <input 
                        type="tel"
                        name="phone"
                        placeholder="Enter Mobile Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full border bg-white px-3.5 py-2.5 rounded-lg text-xs focus:outline-none focus:border-[#1a3673] transition placeholder-slate-350 ${
                          errors.phone ? 'border-red-400 bg-red-50/10' : 'border-slate-200'
                        }`}
                      />
                      {errors.phone && <span className="text-[10px] text-red-500 mt-1 block font-semibold">{errors.phone}</span>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">City*</label>
                      <input 
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full border bg-white px-3.5 py-2.5 rounded-lg text-xs focus:outline-none focus:border-[#1a3673] transition ${
                          errors.city ? 'border-red-400 bg-red-50/10' : 'border-slate-200'
                        }`}
                      />
                      {errors.city && <span className="text-[10px] text-red-500 mt-1 block font-semibold">{errors.city}</span>}
                    </div>
                  </div>

                  {/* Pin Code & Product Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Pin Code*</label>
                      <input 
                        type="text"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleChange}
                        className={`w-full border bg-white px-3.5 py-2.5 rounded-lg text-xs focus:outline-none focus:border-[#1a3673] transition ${
                          errors.pinCode ? 'border-red-400 bg-red-50/10' : 'border-slate-200'
                        }`}
                      />
                      {errors.pinCode && <span className="text-[10px] text-red-500 mt-1 block font-semibold">{errors.pinCode}</span>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">I'm interested in</label>
                      <div className="relative">
                        <select 
                          name="interestedIn"
                          value={formData.interestedIn}
                          onChange={handleChange}
                          className="w-full border border-slate-200 bg-white px-3.5 py-2.5 rounded-lg text-xs focus:outline-none focus:border-[#1a3673] transition appearance-none cursor-pointer"
                        >
                          <option>RO Water Purifier</option>
                          <option>Water Softener</option>
                          <option>Kitchen Appliances</option>
                          <option>Home Appliances</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-450">
                          <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Textarea */}
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Address*</label>
                    <textarea 
                      name="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full border bg-white px-3.5 py-2.5 rounded-lg text-xs focus:outline-none focus:border-[#1a3673] transition ${
                        errors.address ? 'border-red-400 bg-red-50/10' : 'border-slate-200'
                      }`}
                    />
                    {errors.address && <span className="text-[10px] text-red-500 mt-1 block font-semibold">{errors.address}</span>}
                  </div>

                  {/* T&C check and Submit Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                    <div className="flex items-center space-x-2.5">
                      <input 
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="rounded border-slate-300 text-[#1a3673] focus:ring-[#1a3673] h-4.5 w-4.5 cursor-pointer accent-[#1a3673]"
                      />
                      <label htmlFor="agreeTerms" className="text-slate-700 text-xs font-medium cursor-pointer leading-none">
                        I have read and agree to the <a href="#terms" className="underline hover:text-[#1a3673] transition font-semibold">terms & conditions</a>.
                      </label>
                    </div>

                    <div className="flex justify-end w-full sm:w-auto">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#1a3673] hover:bg-[#122856] disabled:bg-slate-400 text-white font-bold py-2.5 px-8 rounded-full text-xs shadow-md transition cursor-pointer"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
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
