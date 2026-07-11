import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function LoginView({ onLoginSuccess, onBackToHome }) {
  const [step, setStep] = useState('email'); // 'email' | 'otp'
  const [email, setEmail] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // References for OTP fields to handle auto-focus
  const otpRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Reset error when user changes inputs
  useEffect(() => {
    setError('');
  }, [email, otp]);

  // Handle email submission
  const handleEmailSubmit = (e) => {
    if (e) e.preventDefault();
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    // Simple email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setStep('otp');
  };

  // Handle OTP digit changes
  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if we entered a digit
    if (value && index < 5) {
      otpRefs[index + 1].current.focus();
    }

    // If fully filled, auto-submit
    if (newOtp.every(digit => digit !== '')) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  // Handle OTP key press (for backspace)
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Clear previous input and focus it
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        otpRefs[index - 1].current.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  // Handle OTP paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split('');
      setOtp(digits);
      handleVerifyOtp(pasteData);
    }
  };

  // Simulated OTP verification
  const handleVerifyOtp = (code) => {
    // Standard mock verification: accept any code, e.g. "123456" or any 6-digit number
    setSuccess(true);
    setTimeout(() => {
      onLoginSuccess({
        email,
        marketingPreferences: { email: marketingConsent },
        addresses: []
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between items-center py-8 px-4 font-sans select-none text-[#121212]">
      {/* Top Header Placeholder to push content down */}
      <div className="h-4" />

      {/* Main Content Area */}
      <div className="w-full max-w-[400px] flex flex-col items-center justify-center flex-grow -mt-16">
        
        {/* KENT Logo */}
        <div 
          onClick={onBackToHome}
          className="flex flex-col items-center cursor-pointer mb-16 select-none group"
        >
          <div className="bg-[#0b3178] text-white font-black text-3.5xl px-8 py-1.5 rounded-xs tracking-wider relative flex items-center justify-center">
            KENT
            <span className="absolute top-1 right-2 text-[8px] font-normal leading-none">®</span>
          </div>
          <div className="w-full border-t border-b border-[#0b3178] py-0.5 mt-1 text-[7.5px] font-extrabold text-[#0b3178] tracking-[0.2em] text-center uppercase leading-none">
            House of Purity
          </div>
        </div>

        {/* Dynamic Forms based on step */}
        {step === 'email' ? (
          <div className="w-full flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-left mb-1.5 font-sans tracking-tight">Sign in</h1>
            <p className="text-[13px] md:text-[14px] text-slate-500 text-left mb-6 leading-tight">
              Enter your email and we'll send you a verification code
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {/* Email Input Field with Inline Arrow */}
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 pr-12 bg-white rounded-xl border border-slate-350 focus:border-[#0b3178] focus:outline-none text-[15px] font-medium transition duration-200"
                  required
                />
                <button
                  type="submit"
                  aria-label="Send Verification Code"
                  className="absolute right-3 p-1.5 text-slate-600 hover:text-[#0b3178] transition duration-200 focus:outline-none cursor-pointer"
                >
                  <ArrowRight size={20} />
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-500 font-semibold">{error}</p>
              )}

              {/* News and Offers Checkbox */}
              <label className="flex items-start space-x-3 pt-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-1 w-4.5 h-4.5 rounded border-slate-300 text-[#0b3178] focus:ring-[#0b3178]"
                />
                <span className="text-[13.5px] text-slate-700 leading-tight">
                  Email me with news and offers
                </span>
              </label>

              {/* Terms of Service Link */}
              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  By continuing, you agree to our{' '}
                  <a href="#terms" className="underline hover:text-[#0b3178] transition">
                    Terms of service
                  </a>
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-full flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-left mb-1.5 tracking-tight">Enter code</h1>
            <div className="text-[13px] md:text-[14px] text-slate-500 text-left mb-6 flex flex-wrap items-center gap-1 leading-tight">
              <span>Sent to {email}</span>
              <button
                onClick={() => setStep('email')}
                className="text-[#0b3178] hover:underline font-bold focus:outline-none cursor-pointer"
              >
                Change
              </button>
            </div>

            <div className="flex justify-between space-x-2 md:space-x-3 mb-6" onPaste={handleOtpPaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={otpRefs[idx]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className={`w-12 h-14 md:w-14 md:h-16 text-center text-xl font-bold bg-white rounded-xl border transition-all duration-200 focus:outline-none ${
                    digit 
                      ? 'border-[#0b3178] shadow-sm' 
                      : 'border-slate-200'
                  }`}
                  style={{
                    borderColor: otpRefs[idx].current === document.activeElement ? '#0b3178' : undefined
                  }}
                />
              ))}
            </div>

            {error && (
              <p className="text-xs text-red-500 font-semibold mb-4">{error}</p>
            )}

            {success && (
              <div className="text-center py-2">
                <p className="text-sm font-bold text-emerald-600 animate-pulse">
                  Verifying code...
                </p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Footer Link */}
      <div className="text-center w-full">
        <a href="#privacy" className="text-xs text-[#0b3178] hover:underline font-semibold">
          Privacy policy
        </a>
      </div>
    </div>
  );
}
