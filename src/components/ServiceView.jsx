import React, { useState } from 'react';
import { Phone, Mail, Clock, Search, Settings, CheckCircle } from 'lucide-react';

export default function ServiceView() {
  const [serviceName, setServiceName] = useState('');
  const [servicePhone, setServicePhone] = useState('');
  const [servicePin, setServicePin] = useState('');
  const [serviceType, setServiceType] = useState('RO Installation');
  const [serviceAddress, setServiceAddress] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');

  return (
    <div className="bg-[#f4f7fc] min-h-screen pb-20 select-none font-sans text-left relative">
      
      {/* Hero Banner Section */}
      <section className="w-full mb-12">
        <div className="relative w-full h-[250px] md:h-[450px] bg-[#091E42]">
          <img 
            src="/img-6.png" 
            alt="KENT Customer Service Support" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      

      {/* 8. Download KENT Service App Section */}
      <section className="bg-white py-16 border-t border-slate-100 select-none">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            
            {/* Left side text & buttons (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#091E42] tracking-tight">
                  Download KENT Service App
                </h2>
                <p className="text-sm md:text-base text-slate-500 font-semibold mt-2">
                  To Register & Track your KENT RO Service Request
                </p>
              </div>

              {/* App Store / Google Play Buttons */}
              <div className="flex flex-wrap gap-4">
                {/* App Store */}
                <a 
                  href="https://apps.apple.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-black hover:bg-slate-900 text-white rounded-xl px-5 py-2.5 flex items-center space-x-3 transition shadow-sm w-[170px]"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.56 2.95-1.39z" />
                  </svg>
                  <div>
                    <p className="text-[9px] uppercase font-bold tracking-wider leading-none text-slate-400">Download on the</p>
                    <p className="text-sm font-bold leading-tight mt-0.5">App Store</p>
                  </div>
                </a>

                {/* Google Play */}
                <a 
                  href="https://play.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-black hover:bg-slate-900 text-white rounded-xl px-5 py-2.5 flex items-center space-x-3 transition shadow-sm w-[170px]"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M5 3.23c-.15.2-.24.47-.24.8v15.94c0 .33.09.6.24.8l.06.06L14.12 12l-.06-.06L5.06 3.17 5 3.23zM17.18 8.94L14.74 11.38l-.06.06.06.06 2.44 2.44.07-.04 2.87-1.63c.82-.47.82-1.23 0-1.7l-2.87-1.63-.07-.04zM14.12 12l-9.06 9.06.06.06c.33 0 .73-.09 1.11-.31l8.06-4.58L14.12 12zM5.06 3.17c.07-.05.15-.08.24-.08.38 0 .78.09 1.11.31l8.06 4.58-2.35 2.35L5.06 3.17z" />
                  </svg>
                  <div>
                    <p className="text-[9px] uppercase font-bold tracking-wider leading-none text-slate-400">GET IT ON</p>
                    <p className="text-sm font-bold leading-tight mt-0.5">Google Play</p>
                  </div>
                </a>
              </div>

              {/* OR Divider Line */}
              <div className="relative flex items-center py-2 max-w-sm">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">OR</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Contact list details */}
              <div className="space-y-6">
                <h4 className="text-base md:text-lg font-bold text-[#091E42]">
                  Book your service request through
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  
                  {/* Call us */}
                  <div className="flex items-start space-x-3.5">
                    <div className="text-[#1a3673] mt-0.5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.122-4.1-6.924-6.924l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Call us</p>
                      <a href="tel:9278912345" className="text-xl font-extrabold text-[#091E42] hover:text-[#1a3673] transition mt-0.5 block">
                        92789-12345
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp us */}
                  <div className="flex items-start space-x-3.5">
                    <div className="text-emerald-500 mt-0.5">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.106-1.341a9.9 9.9 0 004.903 1.297h.005c5.507 0 9.99-4.478 9.99-9.985 0-2.669-1.037-5.176-2.924-7.065C17.194 3.017 14.685 2 12.012 2zm5.728 14.106c-.314.88-1.536 1.62-2.115 1.72-.513.09-1.18.15-3.385-.758-2.82-1.163-4.636-4.04-4.776-4.23-.14-.19-1.144-1.52-1.144-2.898 0-1.378.718-2.056.974-2.333.256-.277.561-.347.747-.347.186 0 .373.002.533.01.166.008.39-.062.607.464.22.535.753 1.838.818 1.97.065.13.109.283.022.457-.087.174-.131.282-.26.435-.13.152-.272.34-.39.456-.13.13-.263.272-.113.528.15.256.666 1.099 1.43 1.779.98.87 1.808 1.14 2.064 1.27.256.13.407.108.56-.065.151-.174.654-.76.83-.1.175.761.554 2.5.64 2.68.088.175.088.327.044.414-.044.088-.415.523-.73 1.403z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">WhatsApp us</p>
                      <a href="https://wa.me/919278912345" target="_blank" rel="noreferrer" className="text-xl font-extrabold text-[#091E42] hover:text-emerald-500 transition mt-0.5 block">
                        919278912345
                      </a>
                    </div>
                  </div>

                  {/* Email at */}
                  <div className="flex items-start space-x-3.5">
                    <div className="text-slate-500 mt-0.5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Email at</p>
                      <a href="mailto:service@kent.co.in" className="text-lg font-extrabold text-[#091E42] hover:text-[#1a3673] transition mt-0.5 block break-all">
                        service@kent.co.in
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Right side phones mockup image (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[380px]">
                <img 
                  src="/img-7.png" 
                  alt="KENT Service App Preview" 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Online Service Booking Form Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mb-16 select-none text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6 bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-xs">
            <h3 className="text-xl md:text-2xl font-black text-[#091E42] tracking-tight leading-tight">
              Book a Service Request
            </h3>
            <p className="text-xs md:text-sm text-slate-500 font-bold leading-relaxed">
              If your KENT RO Water Purifier or home appliance requires repair, maintenance, or filter replacement, submit your details online.
            </p>

            <div className="space-y-4">
              <div className="bg-[#f8fafc] border border-slate-100 p-4 rounded-2xl flex items-center space-x-3.5">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#0b3178] border border-blue-100/50 flex items-center justify-center font-black text-sm">✓</span>
                <div>
                  <p className="text-xs font-black text-slate-800">Certified Engineers</p>
                  <p className="text-[10.5px] text-slate-400 font-bold mt-0.5">Kent Authorized Service Personnel</p>
                </div>
              </div>

              <div className="bg-[#f8fafc] border border-slate-100 p-4 rounded-2xl flex items-center space-x-3.5">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#0b3178] border border-blue-100/50 flex items-center justify-center font-black text-sm">✓</span>
                <div>
                  <p className="text-xs font-black text-slate-800">Genuine Spare Parts</p>
                  <p className="text-[10.5px] text-slate-400 font-bold mt-0.5">100% original replacements</p>
                </div>
              </div>

              <div className="bg-[#f8fafc] border border-slate-100 p-4 rounded-2xl flex items-center space-x-3.5">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#0b3178] border border-blue-100/50 flex items-center justify-center font-black text-sm">✓</span>
                <div>
                  <p className="text-xs font-black text-slate-800">Prompt Support</p>
                  <p className="text-[10.5px] text-slate-400 font-bold mt-0.5">Resolution within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-xs">
            {!bookingSuccess ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                const newId = 'SR-' + Math.floor(100000 + Math.random() * 900000);
                const newBooking = {
                  id: newId,
                  name: serviceName.trim(),
                  phone: servicePhone.trim(),
                  pincode: servicePin.trim(),
                  serviceType: serviceType,
                  address: serviceAddress.trim(),
                  status: 'Pending',
                  createdAt: new Date().toLocaleString()
                };
                try {
                  const existing = JSON.parse(localStorage.getItem('kentro-service-bookings') || '[]');
                  localStorage.setItem('kentro-service-bookings', JSON.stringify([...existing, newBooking]));
                  setBookingId(newId);
                  setBookingSuccess(true);
                  setServiceName('');
                  setServicePhone('');
                  setServicePin('');
                  setServiceAddress('');
                } catch (err) {
                  console.error(err);
                }
              }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-450 uppercase tracking-widest mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Customer name"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[13px] font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-450 uppercase tracking-widest mb-1.5">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile"
                      value={servicePhone}
                      onChange={(e) => setServicePhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[13px] font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-450 uppercase tracking-widest mb-1.5">Service Type *</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[13px] font-semibold text-slate-600 transition cursor-pointer"
                    >
                      <option value="RO Installation">RO Installation / Demounting</option>
                      <option value="Periodic Maintenance">Filter / Cartridge Replacement</option>
                      <option value="Breakdown Repair">Breakdown Repair Support</option>
                      <option value="AMC Inquiry">Annual Maintenance Contract (AMC)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-450 uppercase tracking-widest mb-1.5">Area Pincode *</label>
                    <input
                      type="text"
                      required
                      pattern="[0-9]{6}"
                      placeholder="6-digit pincode"
                      value={servicePin}
                      onChange={(e) => setServicePin(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[13px] font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-450 uppercase tracking-widest mb-1.5">Full Installation / Service Address *</label>
                  <textarea
                    rows={2.5}
                    required
                    placeholder="Enter complete address details..."
                    value={serviceAddress}
                    onChange={(e) => setServiceAddress(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[13px] font-semibold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0b3178] hover:bg-[#072457] text-white py-3 rounded-xl font-bold text-[13px] shadow-md transition duration-200 cursor-pointer mt-2"
                >
                  Book Service Request
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-lg font-black text-[#091E42] tracking-tight">Service Booked Successfully!</h3>
                <p className="text-xs text-slate-500 font-bold leading-relaxed px-4">
                  Your request has been registered with reference ID: <strong className="text-[#0b3178]">{bookingId}</strong>. A certified technician will call you for scheduling.
                </p>
                <button
                  onClick={() => {
                    setBookingSuccess(false);
                    setBookingId('');
                  }}
                  className="bg-[#0b3178] hover:bg-[#072457] text-white text-xs font-black px-6 py-2.5 rounded-xl transition duration-150 cursor-pointer uppercase tracking-wider"
                >
                  Book Another Request
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mb-16 select-none">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-100">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md">
            <iframe
              className="absolute top-0 left-0 w-full h-full border-0"
              src="https://www.youtube.com/embed/CYkqWSfITHw"
              title="KENT Service App Guide"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* More Information Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mb-16 text-left select-none">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#091E42] tracking-tight mb-6">
          More Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Spare Part Pricings */}
          <div className="bg-[#f8fafc] border border-slate-200/50 rounded-2xl p-6 flex items-start space-x-4 hover:shadow-xs hover:border-[#1a3673]/30 transition duration-300 cursor-pointer">
            <div className="bg-white p-3 rounded-full border border-slate-100 text-[#1a3673] flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-[#091E42] text-base mb-1">
                Spare Part Pricings
              </h4>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Genuine Parts are crafted for durability and performance, making them a reliable choice for replacements and maintenance. Opting for Genuine Parts guarantees quality and reliability.
              </p>
            </div>
            <div className="text-slate-400 self-center pl-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Card 2: AMC Details */}
          <div className="bg-[#f8fafc] border border-slate-200/50 rounded-2xl p-6 flex items-start space-x-4 hover:shadow-xs hover:border-[#1a3673]/30 transition duration-300 cursor-pointer">
            <div className="bg-white p-3 rounded-full border border-slate-100 text-[#1a3673] flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.014A3 3 0 0012 21a3 3 0 00.58-5.986m-1.16-.028A3.002 3.002 0 0112 9c.83 0 1.58.337 2.115.882m-3.275 6.132l-5.69-5.69a2.5 2.5 0 113.536-3.536L14.38 12.5m-3.275 2.486L10 17" />
              </svg>
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-[#091E42] text-base mb-1">
                AMC Details
              </h4>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                KENT AMCs are designed for exceptional durability and efficiency, ensuring they are the go-to option for all your maintenance needs. Choosing KENT AMCs means you can trust in their superior quality.
              </p>
            </div>
            <div className="text-slate-400 self-center pl-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* Why Millions Choose KENT Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mb-16 text-left select-none">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#091E42] tracking-tight mb-8">
          Why Millions Choose KENT
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* KENT Advantage */}
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

          {/* Trusted Brand */}
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

          {/* 25 Years of Trust */}
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
