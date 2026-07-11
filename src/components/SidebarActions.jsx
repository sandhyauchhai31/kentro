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
      <div className="fixed right-0 bottom-36 z-40 flex flex-col space-y-4 items-end pr-0 select-none">
        
        {/* Book Demo Trigger */}
        <button 
          onClick={onDemoOpen}
          className="bg-[#1a3673] hover:bg-[#152c5e] text-white flex items-center justify-center py-6 px-3.5 shadow-xl border-l border-y border-white/15 transition-all duration-300 cursor-pointer select-none h-36"
          style={{ 
            borderTopLeftRadius: '0px', 
            borderBottomLeftRadius: '0px', 
            borderTopRightRadius: '16px', 
            borderBottomRightRadius: '16px', 
            writingMode: 'vertical-rl', 
            transform: 'rotate(180deg)' 
          }}
        >
          <span className="text-[13px] font-extrabold tracking-wider uppercase">
            Book a Demo
          </span>
        </button>

        {/* WhatsApp Call Trigger */}
        <a 
          href="https://wa.me/919278912345" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-105 transition-all duration-300 mr-1.5 cursor-pointer"
          aria-label="WhatsApp Support"
        >
          <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.73.001-2.597-1.012-5.037-2.855-6.882-1.843-1.844-4.293-2.861-6.89-2.862-5.437 0-9.863 4.37-9.866 9.73-.001 1.803.508 3.562 1.47 5.09L2.148 21.84l4.5-.986zM17.15 14.5c-.282-.142-1.67-.824-1.928-.918-.258-.095-.447-.142-.635.142-.188.282-.728.918-.893 1.106-.164.188-.329.212-.611.07-2.802-1.401-4.63-2.8-5.385-4.103-.198-.342-.02-.528.15-.697.153-.153.33-.386.494-.58.164-.194.218-.329.329-.55.111-.218.056-.411-.027-.552-.083-.142-.728-1.758-.997-2.408-.262-.63-.53-.545-.728-.555l-.624-.012c-.218 0-.573.082-.873.411-.3.33-1.147 1.12-1.147 2.73s1.173 3.16 1.338 3.385c.164.225 2.308 3.525 5.59 4.945.78.337 1.39.54 1.867.692.784.248 1.498.213 2.062.129.629-.094 1.67-.682 1.905-1.34.235-.658.235-1.222.164-1.34-.07-.118-.282-.206-.564-.348z"/>
          </svg>
        </a>

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
