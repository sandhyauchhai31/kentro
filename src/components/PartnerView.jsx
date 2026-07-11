import React, { useState } from 'react';
import { Send, RotateCcw } from 'lucide-react';

export default function PartnerView() {
  const [formData, setFormData] = useState({
    partnerType: 'Retail Distributor',
    businessType: 'Proprietorship',
    businessName: '',
    panNo: '',
    gstNo: '',
    title: 'Mr.',
    firstName: '',
    lastName: '',
    mobileNo: '',
    landline: '',
    email: '',
    address1: '',
    address2: '',
    pinCode: '',
    state: '',
    city: '',
    natureOfBusiness: 'Sales',
    employees: '',
    turnover: '',
    brandsDealing: '',
    productsDealing: 'Water Purifiers',
    investment: '',
    spaceAvailable: '',
    propertyOwnership: 'Owned',
    remark: '',
    agreeToTerms: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReset = () => {
    setFormData({
      partnerType: 'Retail Distributor',
      businessType: 'Proprietorship',
      businessName: '',
      panNo: '',
      gstNo: '',
      title: 'Mr.',
      firstName: '',
      lastName: '',
      mobileNo: '',
      landline: '',
      email: '',
      address1: '',
      address2: '',
      pinCode: '',
      state: '',
      city: '',
      natureOfBusiness: 'Sales',
      employees: '',
      turnover: '',
      brandsDealing: '',
      productsDealing: 'Water Purifiers',
      investment: '',
      spaceAvailable: '',
      propertyOwnership: 'Owned',
      remark: '',
      agreeToTerms: false
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert("You must agree to the terms and conditions to proceed.");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#f4f7fc] min-h-screen pb-20 select-none font-sans text-left relative">
      
      {/* Hero Banner Section */}
      <section className="w-full mb-12">
        <div className="relative w-full h-[250px] md:h-[450px] bg-[#091E42]">
          <img 
            src="/img-5.png" 
            alt="Become KENT Trade Partner" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Form Card Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xs border border-slate-100">
          
          <form onSubmit={handleSubmit} className="space-y-10">

            {/* 1. Partner Type */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-[#091E42]">
                Partner Type
              </h3>
              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
                {[
                  { label: 'Retail Distributor', value: 'Retail Distributor' },
                  { label: 'Retail Outlet', value: 'Retail Outlet' },
                  { label: 'Direct Sales Dealer', value: 'Direct Sales Dealer' },
                  { label: 'Service Franchise', value: 'Service Franchise' }
                ].map((item) => (
                  <label key={item.value} className="flex items-center space-x-2.5 text-xs md:text-sm font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="partnerType"
                      value={item.value}
                      checked={formData.partnerType === item.value}
                      onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                      className="w-4 h-4 text-[#1a3673] border-slate-300 focus:ring-[#1a3673]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Business Information */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#091E42]">
                Business Information
              </h3>
              
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                  Type of Business*
                </span>
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {[
                    { label: 'Proprietorship', value: 'Proprietorship' },
                    { label: 'Partnership', value: 'Partnership' },
                    { label: 'Private Limited', value: 'Private Limited' }
                  ].map((item) => (
                    <label key={item.value} className="flex items-center space-x-2.5 text-xs md:text-sm font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="businessType"
                        value={item.value}
                        checked={formData.businessType === item.value}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="w-4 h-4 text-[#1a3673] border-slate-300 focus:ring-[#1a3673]"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3-Column Business Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                
                {/* Business Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    Business Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="What will you call your business?"
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

                {/* PAN Number */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    PAN No.*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.panNo}
                    onChange={(e) => setFormData({ ...formData, panNo: e.target.value })}
                    placeholder="Please provide a PAN number."
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition uppercase"
                  />
                </div>

                {/* GST */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    GST:
                  </label>
                  <input
                    type="text"
                    value={formData.gstNo}
                    onChange={(e) => setFormData({ ...formData, gstNo: e.target.value })}
                    placeholder="Please provide your business GST number."
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition uppercase"
                  />
                </div>

              </div>
            </div>

            {/* 3. Contact Details */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#091E42]">
                Contact Details
              </h3>
              
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                  Title
                </span>
                <div className="flex space-x-6">
                  {['Mr.', 'Mrs.', 'Ms.'].map((sal) => (
                    <label key={sal} className="flex items-center space-x-2.5 text-xs md:text-sm font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="title"
                        value={sal}
                        checked={formData.title === sal}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-4 h-4 text-[#1a3673] border-slate-300 focus:ring-[#1a3673]"
                      />
                      <span>{sal}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3-Column Contact Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                
                {/* First Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    First Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Please provide your first name."
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Please provide your surname"
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

                {/* Mobile No. */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    Mobile No.*
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobileNo}
                    onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                    placeholder="Please provide your mobile no."
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

                {/* Landline */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    Landline
                  </label>
                  <input
                    type="tel"
                    value={formData.landline}
                    onChange={(e) => setFormData({ ...formData, landline: e.target.value })}
                    placeholder="Please provide your landline no."
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Please provide your email address."
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

              </div>
            </div>

            {/* 4. Address Details */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#091E42]">
                Address Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Address Line 1 */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    Address Line 1*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address1}
                    onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                    placeholder="Please provide address line 1"
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

                {/* Address Line 2 */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={formData.address2}
                    onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                    placeholder="Please provide address line 2"
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                
                {/* Pin Code */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    Pin Code*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                    placeholder="Please provide pin code"
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

                {/* State */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    State*
                  </label>
                  <select
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#1a3673] transition"
                  >
                    <option value="">Please select state</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>

                {/* City */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    City*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Please provide city name"
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

              </div>
            </div>

            {/* 5. Current Business Details */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#091E42]">
                Current Business Details
              </h3>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                  Nature of Business*
                </span>
                <div className="flex space-x-6">
                  {['Sales', 'Service', 'Both'].map((nature) => (
                    <label key={nature} className="flex items-center space-x-2.5 text-xs md:text-sm font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="natureOfBusiness"
                        value={nature}
                        checked={formData.natureOfBusiness === nature}
                        onChange={(e) => setFormData({ ...formData, natureOfBusiness: e.target.value })}
                        className="w-4 h-4 text-[#1a3673] border-slate-300 focus:ring-[#1a3673]"
                      />
                      <span>{nature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Employees */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    No. of Employees
                  </label>
                  <input
                    type="number"
                    value={formData.employees}
                    onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                    placeholder="Number of employees"
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

                {/* Turnover */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    Turnover (Lakhs)*
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.turnover}
                    onChange={(e) => setFormData({ ...formData, turnover: e.target.value })}
                    placeholder="Turnover in Lakhs"
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

                {/* Brands Dealing */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    Brands Dealing With
                  </label>
                  <input
                    type="text"
                    value={formData.brandsDealing}
                    onChange={(e) => setFormData({ ...formData, brandsDealing: e.target.value })}
                    placeholder="Brands dealing with"
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

                {/* Product Dealing */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    Product Dealing With*
                  </label>
                  <select
                    required
                    value={formData.productsDealing}
                    onChange={(e) => setFormData({ ...formData, productsDealing: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#1a3673] transition"
                  >
                    <option value="Water Purifiers">Water Purifiers</option>
                    <option value="Water Softeners">Water Softeners</option>
                    <option value="Air Purifiers">Air Purifiers</option>
                    <option value="Kitchen Appliances">Kitchen Appliances</option>
                    <option value="Vacuum Cleaners">Vacuum Cleaners</option>
                  </select>
                </div>

              </div>
            </div>

            {/* 6. Investment Details */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#091E42]">
                Investment Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Planned Investment */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    Planned Investment (Lakhs)
                  </label>
                  <input
                    type="number"
                    value={formData.investment}
                    onChange={(e) => setFormData({ ...formData, investment: e.target.value })}
                    placeholder="Planned investment in Lakhs"
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

                {/* Space Available */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-650 uppercase tracking-wide block">
                    Space Available (sq. ft.)
                  </label>
                  <input
                    type="number"
                    value={formData.spaceAvailable}
                    onChange={(e) => setFormData({ ...formData, spaceAvailable: e.target.value })}
                    placeholder="Space available in square feet"
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

                {/* Property Ownership */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                    Property Ownership
                  </label>
                  <div className="flex space-x-6">
                    {['Owned', 'Rented'].map((ownership) => (
                      <label key={ownership} className="flex items-center space-x-2.5 text-xs md:text-sm font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="propertyOwnership"
                          value={ownership}
                          checked={formData.propertyOwnership === ownership}
                          onChange={(e) => setFormData({ ...formData, propertyOwnership: e.target.value })}
                          className="w-4 h-4 text-[#1a3673] border-slate-300 focus:ring-[#1a3673]"
                        />
                        <span>{ownership}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* 7. Remarks */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#091E42]">
                Remarks
              </h3>
              
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-655 uppercase tracking-wide block">
                  Remarks / Comments
                </label>
                <textarea
                  rows="3"
                  value={formData.remark}
                  onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                  placeholder="Any additional remarks"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1a3673] transition resize-none"
                />
              </div>

              {/* Agreement checkbox */}
              <label className="flex items-start space-x-3 text-xs md:text-sm text-slate-600 font-semibold cursor-pointer py-2 select-none">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="mt-0.5 w-4 h-4 text-[#1a3673] border-slate-300 focus:ring-[#1a3673] rounded"
                />
                <span>I have read and agree to the terms & conditions.</span>
              </label>
            </div>

            {/* Form actions */}
            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-100">
              
              {/* Reset */}
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-650 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>

              {/* Submit */}
              <button
                type="submit"
                className="px-8 py-2.5 bg-[#1a3673] hover:bg-[#122856] text-white rounded-lg font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition shadow-xs cursor-pointer"
              >
                <Send size={14} />
                <span>Submit</span>
              </button>

            </div>

          </form>

        </div>
      </div>

      {/* Success Dialog Popup */}
      {isSubmitted && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[100] p-4 select-none">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-100 flex flex-col items-center text-center space-y-5 animate-scale-up">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 shadow-xs">
              <svg className="w-8 h-8 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xl font-extrabold text-[#091E42] tracking-tight">
                Inquiry Received
              </h4>
              <p className="text-xs md:text-sm text-slate-500 font-semibold leading-relaxed px-2">
                Thank you! Your partnership inquiry has been registered. Our trade division representative will review your business profile and get in touch with you shortly.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="bg-[#1a3673] hover:bg-[#122856] text-white px-8 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
