import React, { useState } from 'react';
import { ShoppingBag, Search, HelpCircle, CheckCircle, ChevronDown } from 'lucide-react';

export default function CheckoutView({ cartItems, onBackToHome, onClearCart }) {
  // Form input states
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [pinCode, setPinCode] = useState('');
  const [phone, setPhone] = useState('');

  // Checkbox states (circular design)
  const [newsChecked, setNewsChecked] = useState(false);
  const [saveChecked, setSaveChecked] = useState(false);
  const [offersChecked, setOffersChecked] = useState(false);

  // Billing address selection (same or different)
  const [billingSame, setBillingSame] = useState(true);

  // Discount code states
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');
  const [discountSuccess, setDiscountSuccess] = useState('');

  // Order validation/completion states
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = subtotal * (appliedDiscount / 100);
  const total = subtotal - discountAmount;

  const handleApplyDiscount = () => {
    setDiscountError('');
    setDiscountSuccess('');
    if (discountCode.toUpperCase() === 'KENT20') {
      setAppliedDiscount(20);
      setDiscountSuccess('20% Discount applied successfully!');
    } else if (discountCode === '') {
      setDiscountError('Please enter a discount code.');
    } else {
      setDiscountError('Invalid discount code. Try "KENT20" for 20% off.');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !address || !city || !pinCode || !phone) {
      alert('Please fill in all required fields.');
      return;
    }
    const randomId = 'KENT-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setIsOrderPlaced(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col justify-between antialiased">
      
      {/* 1. Top Header */}
      <header className="w-full bg-white border-b border-slate-100 py-5 select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <button 
            onClick={onBackToHome}
            className="text-lg font-bold text-[#091E42] hover:opacity-85 transition focus:outline-none cursor-pointer"
          >
            Kent RO Systems
          </button>
          
          <button 
            onClick={onBackToHome}
            className="p-2 text-[#1a3673] hover:opacity-85 focus:outline-none cursor-pointer relative"
          >
            <ShoppingBag size={20} />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#EC008C] rounded-full" />
            )}
          </button>
        </div>
      </header>

      {/* 2. Main Full-Height Split Columns Area */}
      <div className="flex-grow w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* LEFT COLUMN: CONTACT, DELIVERY, SHIPPING & PAYMENT FORM (White Background) */}
        <div className="lg:col-span-7 bg-white px-6 md:px-12 py-10 lg:pr-16 text-left">
          <form onSubmit={handlePlaceOrder} className="space-y-6 max-w-xl">
            
            {/* SECTION: CONTACT */}
            <div className="space-y-3">
              <div className="flex justify-between items-center select-none">
                <h3 className="text-base font-bold text-[#091E42]">Contact</h3>
                <button 
                  type="button"
                  className="text-xs text-[#1a3673] underline hover:opacity-80 font-medium cursor-pointer"
                >
                  Sign in
                </button>
              </div>

              <div className="relative">
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1a3673] focus:ring-1 focus:ring-[#1a3673] transition placeholder:text-slate-400"
                />
                <HelpCircle size={14} className="absolute right-3.5 top-3.5 text-slate-400" />
              </div>

              {/* Circular Newsletter Checkbox */}
              <button 
                type="button"
                onClick={() => setNewsChecked(!newsChecked)}
                className="flex items-center space-x-3 cursor-pointer group text-xs select-none focus:outline-none text-left"
              >
                <div className={`w-4.5 h-4.5 rounded-full border transition flex items-center justify-center flex-shrink-0 ${
                  newsChecked ? 'border-[#1a3673] bg-[#1a3673]' : 'border-slate-300 bg-white'
                }`}>
                  {newsChecked && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <span className="text-[11px] text-slate-600 font-medium group-hover:text-slate-900 transition">
                  Email me with news and offers
                </span>
              </button>
            </div>

            {/* SECTION: DELIVERY */}
            <div className="space-y-3.5 pt-2">
              <h3 className="text-base font-bold text-[#091E42] select-none">Delivery</h3>
              
              <div className="space-y-3">
                
                {/* Nest styled select box for Country/Region */}
                <div className="relative border border-slate-300 rounded-lg p-2 bg-white flex flex-col text-left focus-within:border-[#1a3673] focus-within:ring-1 focus-within:ring-[#1a3673] transition">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Country/Region</span>
                  <select 
                    defaultValue="India"
                    className="bg-transparent text-xs text-slate-800 font-semibold focus:outline-none mt-1 w-full appearance-none pr-8 cursor-pointer"
                  >
                    <option>India</option>
                    <option>Nepal</option>
                    <option>Sri Lanka</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown size={14} />
                  </div>
                </div>

                {/* First name & Last name */}
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#1a3673] focus:ring-1 focus:ring-[#1a3673] transition"
                  />
                  <input 
                    type="text" 
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#1a3673] focus:ring-1 focus:ring-[#1a3673] transition"
                  />
                </div>

                {/* Address searching with Magnifying Glass Icon */}
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#1a3673] focus:ring-1 focus:ring-[#1a3673] transition"
                  />
                  <Search size={14} className="absolute right-3.5 top-3.5 text-slate-400" />
                </div>

                {/* Suite */}
                <input 
                  type="text" 
                  value={suite}
                  onChange={(e) => setSuite(e.target.value)}
                  placeholder="Apartment, suite, etc."
                  className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#1a3673] focus:ring-1 focus:ring-[#1a3673] transition"
                />

                {/* City, State selection & PIN Code */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input 
                    type="text" 
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#1a3673] transition"
                  />
                  <div className="relative border border-slate-300 rounded-lg px-2 py-1.5 bg-white flex flex-col text-left">
                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider leading-none">State</span>
                    <select 
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="bg-transparent text-xs text-slate-800 font-semibold focus:outline-none mt-0.5 w-full appearance-none pr-6 cursor-pointer"
                    >
                      <option>Maharashtra</option>
                      <option>Delhi</option>
                      <option>Karnataka</option>
                      <option>Uttar Pradesh</option>
                      <option>Tamil Nadu</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <ChevronDown size={12} />
                    </div>
                  </div>
                  <input 
                    type="text" 
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="PIN code"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#1a3673] transition"
                  />
                </div>

                {/* Phone with ? Icon */}
                <div className="relative">
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#1a3673] transition"
                  />
                  <HelpCircle size={14} className="absolute right-3.5 top-3.5 text-slate-400" />
                </div>

                {/* Checkboxes: Save Details & Text consent (Circular) */}
                <div className="space-y-2.5 pt-2 select-none">
                  <button 
                    type="button"
                    onClick={() => setSaveChecked(!saveChecked)}
                    className="flex items-center space-x-3 cursor-pointer group text-xs focus:outline-none text-left w-full"
                  >
                    <div className={`w-4.5 h-4.5 rounded-full border transition flex items-center justify-center flex-shrink-0 ${
                      saveChecked ? 'border-[#1a3673] bg-[#1a3673]' : 'border-slate-300 bg-white'
                    }`}>
                      {saveChecked && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <span className="text-[11px] text-slate-650 font-medium">Save this information for next time</span>
                  </button>

                  <button 
                    type="button"
                    onClick={() => setOffersChecked(!offersChecked)}
                    className="flex items-center space-x-3 cursor-pointer group text-xs focus:outline-none text-left w-full"
                  >
                    <div className={`w-4.5 h-4.5 rounded-full border transition flex items-center justify-center flex-shrink-0 ${
                      offersChecked ? 'border-[#1a3673] bg-[#1a3673]' : 'border-slate-300 bg-white'
                    }`}>
                      {offersChecked && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <span className="text-[11px] text-slate-650 font-medium">Text me with news and offers</span>
                  </button>
                </div>

              </div>
            </div>

            {/* SECTION: SHIPPING METHOD (Matches image layout) */}
            <div className="space-y-3.5 pt-3">
              <h3 className="text-base font-bold text-[#091E42] select-none">Shipping method</h3>
              <div className="bg-[#f4f4f4]/60 border border-slate-200 rounded-xl p-4 text-center select-none text-xs text-slate-500 font-semibold leading-relaxed">
                {address.trim() === '' 
                  ? 'Enter your shipping address to view available shipping methods.' 
                  : 'Standard Delivery — Free (Pan-India Dispatch)'
                }
              </div>
            </div>

            {/* SECTION: PAYMENT (Matches image layout with Razorpay mockups) */}
            <div className="space-y-3.5 pt-3">
              <div className="text-left select-none">
                <h3 className="text-base font-bold text-[#091E42]">Payment</h3>
                <p className="text-xs text-slate-400 mt-0.5">All transactions are secure and encrypted.</p>
              </div>

              {/* Razorpay Border container layout */}
              <div className="rounded-xl overflow-hidden border border-slate-200">
                {/* Header item */}
                <div className="bg-blue-50/10 border-b border-slate-200 p-4 flex justify-between items-center">
                  <span className="text-xs font-bold text-[#091E42] leading-none">
                    Razorpay Secure (UPI, Cards, Int\'l Cards, Wallets)
                  </span>
                  
                  {/* CSS payment badge visual mockups */}
                  <div className="flex items-center space-x-1.5 flex-shrink-0 scale-95">
                    {/* UPI */}
                    <div className="border border-slate-200 bg-white rounded px-1.5 py-0.5 text-[8px] font-bold text-slate-700 font-mono tracking-tight">
                      <span className="text-[#008DDF]">U</span><span className="text-orange-500">P</span><span className="text-[#1a3673]">I</span>
                    </div>
                    {/* VISA */}
                    <div className="bg-[#1A1F71] text-white rounded px-1.5 py-0.5 text-[8px] font-black tracking-wider italic font-sans leading-none">
                      VISA
                    </div>
                    {/* Mastercard */}
                    <div className="bg-[#111111] rounded px-1 py-0.5 flex items-center justify-center space-x-[-3px]">
                      <div className="w-2.5 h-2.5 bg-[#EB001B] rounded-full" />
                      <div className="w-2.5 h-2.5 bg-[#F79E1B] rounded-full opacity-90" />
                    </div>
                    {/* +11 */}
                    <div className="bg-slate-50 text-slate-500 border border-slate-200 rounded px-1 text-[8px] font-bold">
                      +11
                    </div>
                  </div>
                </div>

                {/* Redirect details content */}
                <div className="bg-[#F5F5F5] p-5 text-center text-xs text-slate-600 leading-relaxed font-semibold">
                  You'll be redirected to Razorpay Secure (UPI, Cards, Int'l Cards, Wallets) to complete your purchase.
                </div>
              </div>
            </div>

            {/* SECTION: BILLING ADDRESS (Matches image layout with toggle radio selectors) */}
            <div className="space-y-3.5 pt-3">
              <h3 className="text-base font-bold text-[#091E42] select-none">Billing address</h3>
              
              <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-150">
                {/* Same as shipping option */}
                <button
                  type="button"
                  onClick={() => setBillingSame(true)}
                  className={`w-full flex items-center space-x-3.5 p-4 text-left focus:outline-none transition cursor-pointer ${
                    billingSame ? 'bg-blue-50/10 font-bold' : 'bg-white'
                  }`}
                >
                  <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition flex-shrink-0 ${
                    billingSame ? 'border-[#1a3673] bg-white' : 'border-slate-300 bg-white'
                  }`}>
                    {billingSame && <div className="w-2.5 h-2.5 bg-[#1a3673] rounded-full" />}
                  </div>
                  <span className="text-xs text-slate-800">Same as shipping address</span>
                </button>

                {/* Different billing option */}
                <button
                  type="button"
                  onClick={() => setBillingSame(false)}
                  className={`w-full flex items-center space-x-3.5 p-4 text-left focus:outline-none transition cursor-pointer ${
                    !billingSame ? 'bg-blue-50/10 font-bold' : 'bg-white'
                  }`}
                >
                  <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition flex-shrink-0 ${
                    !billingSame ? 'border-[#1a3673] bg-white' : 'border-slate-300 bg-white'
                  }`}>
                    {!billingSame && <div className="w-2.5 h-2.5 bg-[#1a3673] rounded-full" />}
                  </div>
                  <span className="text-xs text-slate-800">Use a different billing address</span>
                </button>
              </div>
            </div>

            {/* Pay Now Button (Directly matching Pay now layout) */}
            <div className="pt-2 select-none">
              <button
                type="submit"
                className="w-full bg-[#1a3673] hover:bg-[#0f2552] text-white py-3.5 rounded-lg font-bold shadow-md transition duration-200 cursor-pointer text-center text-sm"
              >
                Pay now
              </button>
            </div>

            {/* Divider and Footer Policy Links */}
            <div className="pt-8 border-t border-slate-100 select-none text-[11px] text-[#1a3673] font-semibold flex flex-wrap gap-x-5 gap-y-2">
              <a href="#refund" className="underline hover:opacity-85">Refund policy</a>
              <a href="#privacy" className="underline hover:opacity-85">Privacy policy</a>
              <a href="#terms" className="underline hover:opacity-85">Terms of service</a>
              <a href="#contact" className="underline hover:opacity-85">Contact</a>
            </div>

          </form>
        </div>

        {/* RIGHT COLUMN: CART SUMMARY PANEL (Light Grey Background spanning full height) */}
        <div className="lg:col-span-5 bg-[#F5F5F5] border-l border-slate-150 px-6 md:px-12 py-10 text-left select-none">
          <div className="max-w-md space-y-6">
            
            {/* Products Listing inside summary */}
            <div className="space-y-4">
              {cartItems.map((item) => {
                const isBlack = item.color === 'Black';
                return (
                  <div key={`${item.id}-${item.color}`} className="flex justify-between items-center space-x-4">
                    
                    {/* Thumbnail wrapper with overlapping black badge */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-2 shadow-xs">
                        <div className={`w-7 h-10 bg-gradient-to-b ${
                          isBlack ? 'from-[#2d3035] to-[#121212]' : 'from-blue-50 to-blue-200'
                        } rounded border border-white/60 flex flex-col justify-between p-0.5`}>
                          <div className="w-full h-0.5 bg-amber-500 rounded-3xs" />
                        </div>
                      </div>
                      
                      {/* Black count badge */}
                      <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-xs">
                        {item.quantity}
                      </span>
                    </div>

                    {/* Product Name */}
                    <div className="flex-grow text-xs">
                      <h4 className="font-bold text-[#091E42] leading-snug line-clamp-2">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 capitalize">{item.color || 'White'}</p>
                    </div>

                    {/* Total item price */}
                    <span className="text-xs font-bold text-[#091E42] flex-shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}.00
                    </span>

                  </div>
                );
              })}
            </div>

            {/* Discount Code Input Box */}
            <div className="pt-4.5 border-t border-slate-200 space-y-2">
              <div className="flex space-x-2.5">
                <input 
                  type="text" 
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Discount code"
                  className="flex-grow bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#1a3673] transition"
                />
                
                <button 
                  type="button"
                  onClick={handleApplyDiscount}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-5 py-2.5 rounded-xl border border-slate-200 transition cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {discountError && <p className="text-[10px] text-red-500 font-semibold">{discountError}</p>}
              {discountSuccess && <p className="text-[10px] text-green-600 font-semibold">{discountSuccess}</p>}
            </div>

            {/* Financial Rows */}
            <div className="pt-4.5 border-t border-slate-200 space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#091E42]">₹{subtotal.toLocaleString('en-IN')}.00</span>
              </div>
              
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount (20%)</span>
                  <span>- ₹{discountAmount.toLocaleString('en-IN')}.00</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="text-slate-400 text-[11px]">
                  {address ? 'Free (Standard)' : 'Enter shipping address'}
                </span>
              </div>

              {/* Total final price matching image exactly */}
              <div className="flex justify-between items-baseline pt-2.5 border-t border-slate-200">
                <span className="font-bold text-sm text-[#091E42]">Total</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-[9px] text-slate-400 font-semibold">INR</span>
                  <span className="font-black text-lg text-[#091E42]">
                    ₹{total.toLocaleString('en-IN')}.00
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ORDER SUCCESS OVERLAY SCREEN */}
      {isOrderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-5 border border-slate-100 animate-in zoom-in duration-200">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 border border-green-100 mx-auto animate-bounce">
              <CheckCircle size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="font-black text-[#091E42] text-xl">Order Placed Successfully!</h3>
              <p className="text-xs text-slate-500 font-medium font-sans">
                Thank you for choosing Kent RO Systems. A reservation verification ticket and shipping updates have been sent to your email.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 font-mono text-xs">
              <span className="text-slate-400 block font-sans font-semibold mb-1">YOUR ORDER ID</span>
              <span className="font-black text-sm text-slate-800 tracking-wider">{orderId}</span>
            </div>

            <button 
              onClick={() => {
                onClearCart();
                onBackToHome();
              }}
              className="w-full bg-[#1a3673] hover:bg-[#0f2552] text-white py-3 rounded-full text-xs font-bold shadow-md transition duration-200 cursor-pointer text-center"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
