import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}) {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [instructionsText, setInstructionsText] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#091E42]/40 backdrop-blur-md transition-all duration-300"
          />

          {/* Floating Cart Panel (Matches image gaps and rounded corners) */}
          <motion.div 
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 180 }}
            className="fixed right-4 top-4 bottom-4 w-[calc(100%-2rem)] sm:w-[450px] bg-white z-50 shadow-2xl rounded-3xl flex flex-col justify-between overflow-hidden border border-slate-100"
          >
            {/* Header: Title + Close Button */}
            <div className="p-6 border-b border-slate-50 flex justify-between items-center select-none">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-[#091E42] text-xl">Cart</span>
                <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-bold ml-1">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-2xl transition focus:outline-none cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20 select-none">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100">
                    <ShoppingCart size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-700 text-base">Your Cart is Empty</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
                      Add products from our bestsellers to check out.
                    </p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="bg-[#1a3673] hover:bg-[#0f2552] text-white text-xs font-bold py-2.5 px-6 rounded-full transition cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => {
                  const isBlack = item.color === 'Black';
                  return (
                    <div key={`${item.id}-${item.color}`} className="flex space-x-4 border-b border-slate-50 pb-5">
                      
                      {/* Left: Product Mockup Image Wrapper */}
                      <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-2 relative overflow-hidden flex-shrink-0">
                        {/* Miniature RO Purifier mockup */}
                        <div className={`w-8 h-12 bg-gradient-to-b ${
                          isBlack ? 'from-[#2d3035] to-[#121212]' : 'from-blue-50 to-blue-200'
                        } rounded-md border border-white/60 shadow flex flex-col justify-between p-0.5 relative`}>
                          <div className="h-1.5 w-full bg-amber-600 rounded-2xs" />
                          <div className="w-full h-1 bg-white/30 rounded-3xs" />
                        </div>
                      </div>

                      {/* Middle & Right layout details */}
                      <div className="flex-grow flex flex-col justify-between text-left">
                        <div className="flex justify-between items-start space-x-2">
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">KENT RO SYSTEMS</span>
                            <h4 className="font-bold text-xs text-[#091E42] mt-0.5 leading-snug line-clamp-2">{item.name}</h4>
                            <p className="text-[10px] text-slate-400 mt-1">Color: {item.color}</p>
                          </div>
                          
                          {/* Single item price */}
                          <span className="text-[11px] font-bold text-slate-500 flex-shrink-0 mt-0.5">
                            Rs. {item.price.toLocaleString('en-IN')}.00
                          </span>
                        </div>

                        {/* Quantity pill & remove button */}
                        <div className="flex justify-between items-end mt-4">
                          <div className="flex flex-col space-y-2">
                            {/* Quantity Selector controls */}
                            <div className="flex items-center space-x-3 bg-slate-50 border border-slate-150 rounded-xl py-1 px-3 w-max">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, item.color, item.quantity - 1)}
                                className="p-0.5 text-slate-500 hover:text-[#091E42] transition cursor-pointer"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="text-xs font-bold text-slate-800 w-4 text-center">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, item.color, item.quantity + 1)}
                                className="p-0.5 text-slate-500 hover:text-[#091E42] transition cursor-pointer"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            {/* Remove button */}
                            <button 
                              onClick={() => onRemoveItem(item.id, item.color)}
                              className="text-[10px] font-bold text-slate-400 hover:text-red-500 flex items-center space-x-1 cursor-pointer w-max focus:outline-none"
                            >
                              <span>✕ Remove</span>
                            </button>
                          </div>

                          {/* Multiplied item subtotal price */}
                          <span className="text-xs font-black text-[#091E42] pb-0.5">
                            Rs. {(item.price * item.quantity).toLocaleString('en-IN')}.00
                          </span>
                        </div>

                      </div>

                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary Container */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-white space-y-4">
                
                {/* Collapsible Order Special Instructions */}
                <div className="border-b border-slate-50 pb-3 text-left select-none">
                  <button 
                    onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
                    className="w-full flex justify-between items-center text-xs text-slate-500 font-bold cursor-pointer focus:outline-none"
                  >
                    <span>Order special instructions</span>
                    <ChevronDown size={14} className={`transform transition duration-200 ${isInstructionsOpen ? 'rotate-180 text-brand-blue' : ''}`} />
                  </button>
                  {isInstructionsOpen && (
                    <textarea 
                      rows="2"
                      value={instructionsText}
                      onChange={(e) => setInstructionsText(e.target.value)}
                      placeholder="e.g. Please call before delivery..."
                      className="w-full border border-slate-200 rounded-xl p-2.5 text-xs text-slate-700 mt-2 focus:outline-none focus:border-brand-blue resize-none transition"
                    />
                  )}
                </div>

                {/* Subtotal summary */}
                <div className="flex justify-between items-center text-left">
                  <span className="text-sm text-slate-800 font-bold">Subtotal</span>
                  <span className="text-base font-black text-[#091E42]">
                    Rs. {subtotal.toLocaleString('en-IN')}.00
                  </span>
                </div>
                
                <p className="text-[10px] text-slate-400 text-left leading-normal">
                  Tax included and shipping calculated at checkout
                </p>

                {/* Footer buttons */}
                <div className="space-y-3 pt-2 select-none">
                  <button 
                    onClick={onCheckout}
                    className="w-full bg-[#1a3673] hover:bg-[#0f2552] text-white py-3 rounded-full font-bold shadow-md transition duration-200 cursor-pointer"
                  >
                    Checkout
                  </button>
                  
                  <button 
                    onClick={onClose}
                    className="w-full text-center text-[#1a3673] hover:underline text-xs font-bold block cursor-pointer"
                  >
                    View Cart ↗
                  </button>
                </div>

              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
