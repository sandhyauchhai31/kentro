import React, { useState, useEffect, useRef } from 'react';
import { Calendar, PhoneCall, MessageSquare, Send, X, Bot, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SidebarActions({ onDemoOpen }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! Welcome to KENT Support. How can we help you today?", isBot: true }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  const handlePresetClick = (option) => {
    // Add user message
    const userMsg = { id: messages.length + 1, text: option, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "";
      if (option.includes("Demo")) {
        botResponse = "Sure! You can click the 'Book Free Demo' button on the sidebar to fill in your details and schedule an expert visit.";
      } else if (option.includes("Service")) {
        botResponse = "To book a service or installation request, you can dial our 24/7 Pan-India helpline: 92789 12345 or submit the request form under the 'Service Request' section on this page.";
      } else if (option.includes("Bestsellers")) {
        botResponse = "Our most popular model is the KENT Grand Plus (Mineral RO + UV + UF + TDS Control) and the KENT AutoSoft Water Softener. Scroll down to check them out!";
      } else {
        botResponse = "A support executive has been notified and will join this conversation shortly. Thank you for your patience!";
      }

      setMessages(prev => [...prev, { id: prev.length + 1, text: botResponse, isBot: true }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    setInputVal('');
    setMessages(prev => [...prev, { id: prev.length + 1, text: userText, isBot: false }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { id: prev.length + 1, text: "I have recorded your query. Let me connect you with a live assistant to assist you better.", isBot: true }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const presets = [
    "How to book a free Demo?",
    "Book a Service / Installation Request",
    "What are KENT bestsellers?",
    "Connect with an agent"
  ];

  return (
    <>
      {/* Floating Sidebar Sticky Buttons */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-2.5 items-end pr-0 select-none">
        
        {/* Book Demo Trigger */}
        <button 
          onClick={onDemoOpen}
          className="bg-brand-orange hover:bg-brand-dark-orange text-white flex items-center space-x-2 pl-4 pr-3 py-3 rounded-l-full shadow-lg transform hover:-translate-x-1.5 transition-all duration-300 group cursor-pointer"
        >
          <span className="text-xs font-bold tracking-wide uppercase hidden group-hover:inline transition-all duration-300">
            Book Free Demo
          </span>
          <Calendar size={18} className="animate-pulse-slow" />
        </button>

        {/* WhatsApp Call Trigger */}
        <a 
          href="https://wa.me/919278912345" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center space-x-2 pl-4 pr-3 py-3 rounded-l-full shadow-lg transform hover:-translate-x-1.5 transition-all duration-300 group cursor-pointer"
        >
          <span className="text-xs font-bold tracking-wide uppercase hidden group-hover:inline transition-all duration-300">
            WhatsApp Care
          </span>
          <PhoneCall size={18} />
        </a>

        {/* Live Chat Trigger */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-brand-blue hover:bg-brand-dark-blue text-white flex items-center space-x-2 pl-4 pr-3 py-3 rounded-l-full shadow-lg transform hover:-translate-x-1.5 transition-all duration-300 group cursor-pointer"
        >
          <span className="text-xs font-bold tracking-wide uppercase hidden group-hover:inline transition-all duration-300">
            Live Chat
          </span>
          <MessageSquare size={18} />
        </button>

      </div>

      {/* Floating Interactive Chat Assistant */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-white border border-slate-100 shadow-2xl rounded-2xl w-80 sm:w-96 h-[500px] flex flex-col justify-between overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-brand-blue text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">KENT Smart Support</h4>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                    <span className="text-[10px] text-white/80">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition"
              >
                <X size={15} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex items-start space-x-2.5 ${msg.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.isBot ? 'bg-brand-blue text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {msg.isBot ? <Bot size={15} /> : <User size={15} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-xs max-w-[70%] leading-relaxed ${
                    msg.isBot ? 'bg-white text-slate-700 rounded-tl-xs shadow-xs' : 'bg-brand-blue text-white rounded-tr-xs shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start space-x-2.5">
                  <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center">
                    <Bot size={15} />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-xs flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Presets and Inputs */}
            <div className="p-4 border-t border-slate-100 bg-white space-y-3">
              {/* Presets shown when chat has fewer messages */}
              {messages.length < 5 && (
                <div className="flex flex-wrap gap-1.5">
                  {presets.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handlePresetClick(opt)}
                      className="text-[10px] bg-slate-100 hover:bg-brand-blue/15 hover:text-brand-blue border border-slate-200 text-slate-600 font-semibold px-2.5 py-1.5 rounded-full transition text-left cursor-pointer flex items-center justify-between group"
                    >
                      <span>{opt}</span>
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSend} className="flex items-center space-x-2">
                <input 
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow border border-slate-200 px-3.5 py-2 rounded-full text-xs focus:outline-none focus:border-brand-blue transition bg-slate-50"
                />
                <button 
                  type="submit"
                  className="bg-brand-blue hover:bg-brand-dark-blue text-white p-2 rounded-full shadow-md transition"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
