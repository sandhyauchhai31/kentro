import React, { useState } from 'react';
import { User, MapPin, Edit, Plus, Trash2, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AccountView({ currentUser, setCurrentUser, onBackToHome }) {
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [editedEmail, setEditedEmail] = useState(currentUser?.email || '');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pinCode: ''
  });
  
  // Tab states: 'profile' | 'orders'
  const [activeView, setActiveView] = useState('profile');

  // Load and save helper
  const updateUser = (updatedFields) => {
    const updatedUser = { ...currentUser, ...updatedFields };
    setCurrentUser(updatedUser);
    localStorage.setItem('kentro-user', JSON.stringify(updatedUser));
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    if (!editedEmail.trim()) return;
    updateUser({ email: editedEmail });
    setIsEditingContact(false);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddress.fullName || !newAddress.phone || !newAddress.addressLine1 || !newAddress.city || !newAddress.pinCode) {
      alert('Please fill out all required fields.');
      return;
    }
    const currentAddresses = currentUser?.addresses || [];
    const updatedAddresses = [...currentAddresses, { ...newAddress, id: Date.now().toString() }];
    updateUser({ addresses: updatedAddresses });
    setIsAddingAddress(false);
    setNewAddress({
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pinCode: ''
    });
  };

  const handleDeleteAddress = (id) => {
    const currentAddresses = currentUser?.addresses || [];
    const updatedAddresses = currentAddresses.filter(addr => addr.id !== id);
    updateUser({ addresses: updatedAddresses });
  };

  const handleToggleMarketing = () => {
    const currentConsent = currentUser?.marketingPreferences?.email || false;
    updateUser({
      marketingPreferences: {
        ...currentUser?.marketingPreferences,
        email: !currentConsent
      }
    });
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('kentro-user');
    onBackToHome();
  };

  // Mock list of orders for the Orders tab
  const mockOrders = [
    {
      id: 'KENT-108253',
      date: 'July 05, 2026',
      product: 'KENT Grand+ RO Water Purifier',
      status: 'Delivered',
      total: '₹19,500'
    },
    {
      id: 'KENT-104928',
      date: 'May 12, 2026',
      product: 'KENT Bathroom Water Softener',
      status: 'Delivered',
      total: '₹8,500'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between font-sans text-[#121212] select-none">
      
      {/* Account Page Custom Header */}
      <header className="w-full bg-white border-b border-slate-100 py-4 px-6 md:px-12 flex justify-between items-center z-10 shadow-xs">
        <Link to="/" className="flex flex-col items-center select-none group">
          <div className="bg-[#0b3178] text-white font-black text-2xl px-5 py-0.5 rounded-xs tracking-wider relative flex items-center justify-center">
            KENT
            <span className="absolute top-0.5 right-1.5 text-[6px] font-normal leading-none">®</span>
          </div>
          <div className="w-full border-t border-b border-[#0b3178] py-0.5 mt-0.5 text-[5.5px] font-extrabold text-[#0b3178] tracking-widest text-center uppercase leading-none">
            House of Purity
          </div>
        </Link>

        {/* Circular Avatar */}
        <div className="w-10 h-10 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center shadow-xs">
          <User size={18} className="text-slate-600" />
        </div>
      </header>

      {/* Main Layout Container */}
      <main className="max-w-7xl w-full mx-auto px-6 md:px-12 py-10 flex-grow grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-1 flex flex-col space-y-2.5">
          <Link 
            to="/category?cat=Water%20Purifiers&sub=RO%20Purifiers"
            className="text-[17px] font-bold text-slate-500 hover:text-[#0b3178] transition duration-200 py-1.5 block"
          >
            Water Purifiers
          </Link>
          <Link 
            to="/category?cat=Water%20Softeners&sub=Bathroom%20Softeners"
            className="text-[17px] font-bold text-slate-500 hover:text-[#0b3178] transition duration-200 py-1.5 block"
          >
            Water Softeners
          </Link>
          <Link 
            to="/category?cat=Kitchen%20Appliances&sub=Air%20Fryers"
            className="text-[17px] font-bold text-slate-500 hover:text-[#0b3178] transition duration-200 py-1.5 block"
          >
            Kitchen Appliances
          </Link>
          <Link 
            to="/category?cat=Home%20Appliances&sub=Air%20Purifiers"
            className="text-[17px] font-bold text-slate-500 hover:text-[#0b3178] transition duration-200 py-1.5 block"
          >
            Home Appliances
          </Link>
          <button 
            onClick={() => setActiveView(activeView === 'orders' ? 'profile' : 'orders')}
            className={`w-full text-left text-[17px] font-bold transition duration-200 py-1.5 block cursor-pointer ${
              activeView === 'orders' ? 'text-[#0b3178]' : 'text-slate-500 hover:text-[#0b3178]'
            }`}
          >
            {activeView === 'orders' ? 'My Account' : 'Orders'}
          </button>
        </aside>

        {/* Right Content Area */}
        <section className="lg:col-span-3 space-y-8">
          
          {activeView === 'profile' ? (
            <>
              {/* Contact Card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-xs">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[16px] md:text-[18px] font-extrabold text-[#091E42]">Contact</h2>
                  {!isEditingContact && (
                    <button
                      onClick={() => setIsEditingContact(true)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[13px] font-extrabold px-4 py-1.5 rounded-lg transition duration-200 cursor-pointer"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {isEditingContact ? (
                  <form onSubmit={handleSaveContact} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                      <input
                        type="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[15px] font-medium"
                        required
                      />
                    </div>
                    <div className="flex space-x-3 pt-2">
                      <button
                        type="submit"
                        className="bg-[#0b3178] hover:bg-[#082457] text-white text-[13px] font-extrabold px-5 py-2.5 rounded-xl transition cursor-pointer"
                      >
                        Save Email
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditedEmail(currentUser?.email || '');
                          setIsEditingContact(false);
                        }}
                        className="bg-slate-150 hover:bg-slate-200 text-slate-800 text-[13px] font-extrabold px-5 py-2.5 rounded-xl transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col md:flex-row md:items-center justify-between border border-slate-100/60 rounded-xl p-4 bg-slate-50/30">
                    <span className="text-[14px] text-slate-500 font-medium">Email</span>
                    <span className="text-[15px] text-slate-800 font-extrabold mt-1 md:mt-0">
                      {currentUser?.email}
                    </span>
                  </div>
                )}
              </div>

              {/* Addresses Card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-xs">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[16px] md:text-[18px] font-extrabold text-[#091E42]">Addresses</h2>
                  {!isAddingAddress && (
                    <button
                      onClick={() => setIsAddingAddress(true)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[13px] font-extrabold px-4 py-1.5 rounded-lg transition duration-200 cursor-pointer"
                    >
                      Add
                    </button>
                  )}
                </div>

                {isAddingAddress ? (
                  <form onSubmit={handleAddAddress} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={newAddress.fullName}
                          onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[14px]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Phone Number *</label>
                        <input
                          type="text"
                          required
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[14px]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Address Line 1 *</label>
                      <input
                        type="text"
                        required
                        value={newAddress.addressLine1}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                        className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[14px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Address Line 2 (Optional)</label>
                      <input
                        type="text"
                        value={newAddress.addressLine2}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                        className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[14px]"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">City *</label>
                        <input
                          type="text"
                          required
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[14px]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">State *</label>
                        <input
                          type="text"
                          required
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[14px]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">PIN Code *</label>
                        <input
                          type="text"
                          required
                          value={newAddress.pinCode}
                          onChange={(e) => setNewAddress({ ...newAddress, pinCode: e.target.value })}
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-250 focus:border-[#0b3178] focus:outline-none text-[14px]"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-3 pt-2">
                      <button
                        type="submit"
                        className="bg-[#0b3178] hover:bg-[#082457] text-white text-[13px] font-extrabold px-5 py-2.5 rounded-xl transition cursor-pointer"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="bg-slate-150 hover:bg-slate-200 text-slate-800 text-[13px] font-extrabold px-5 py-2.5 rounded-xl transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : currentUser?.addresses?.length > 0 ? (
                  <div className="space-y-4">
                    {currentUser.addresses.map((addr) => (
                      <div key={addr.id} className="flex justify-between items-start border border-slate-100 rounded-xl p-4 bg-slate-50/20 relative group hover:shadow-xs transition duration-200">
                        <div className="flex items-start space-x-3.5">
                          <div className="mt-0.5 p-2 bg-blue-50/50 rounded-lg text-[#008DDF]">
                            <MapPin size={16} />
                          </div>
                          <div>
                            <p className="font-extrabold text-[15px] text-slate-800">{addr.fullName}</p>
                            <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{addr.phone}</p>
                            <p className="text-[13.5px] text-slate-600 mt-1.5 leading-relaxed">
                              {addr.addressLine1}
                              {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                              <br />
                              {addr.city}, {addr.state} - {addr.pinCode}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition duration-150 focus:outline-none cursor-pointer"
                          title="Delete address"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-white">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 mb-3.5 text-slate-400">
                      <MapPin size={20} />
                    </div>
                    <span className="text-[14px] text-slate-500 font-extrabold">
                      No addresses added
                    </span>
                  </div>
                )}
              </div>

              {/* Marketing Preferences */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-xs">
                <h2 className="text-[16px] md:text-[18px] font-extrabold text-[#091E42] mb-6">Marketing preferences</h2>
                <div className="flex items-center justify-between border border-slate-100/60 rounded-xl p-4 bg-slate-50/30">
                  <div className="flex flex-col">
                    <span className="text-[14.5px] font-extrabold text-slate-800">Email</span>
                  </div>
                  
                  {/* Slider Toggle Button */}
                  <button 
                    onClick={handleToggleMarketing}
                    className={`w-12 h-6.5 rounded-full p-0.5 transition-colors duration-300 focus:outline-none cursor-pointer ${
                      currentUser?.marketingPreferences?.email ? 'bg-[#0b3178]' : 'bg-slate-250'
                    }`}
                  >
                    <div 
                      className={`w-5.5 h-5.5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                        currentUser?.marketingPreferences?.email ? 'translate-x-5.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Sign Out Action Buttons */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <button
                  onClick={handleSignOut}
                  className="bg-white hover:bg-slate-50 text-[#0b3178] border border-[#0b3178] text-[13.5px] font-extrabold px-7 py-3 rounded-xl transition duration-200 shadow-xs cursor-pointer"
                >
                  Sign out
                </button>
                <button
                  onClick={handleSignOut}
                  className="text-slate-500 hover:text-[#0b3178] text-[13.5px] font-extrabold hover:underline transition duration-200 cursor-pointer"
                >
                  Sign out of all devices
                </button>
              </div>
            </>
          ) : (
            /* Orders Tab Content */
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-xs">
              <h2 className="text-[16px] md:text-[18px] font-extrabold text-[#091E42] mb-6">My Orders</h2>
              
              {mockOrders.length > 0 ? (
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-slate-100 rounded-xl p-5 hover:shadow-xs transition duration-200 bg-slate-50/10">
                      <div className="flex flex-wrap justify-between items-center border-b border-slate-100 pb-3 mb-3 gap-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-[14.5px] font-extrabold text-[#0b3178]">{order.id}</span>
                          <span className="text-slate-350">•</span>
                          <span className="text-[13px] text-slate-500 font-semibold">{order.date}</span>
                        </div>
                        <span className="text-[11.5px] font-extrabold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full flex items-center gap-1 border border-emerald-100">
                          <CheckCircle2 size={12} /> {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[14px] text-slate-700 font-bold">{order.product}</span>
                        <span className="text-[15px] text-slate-900 font-extrabold">{order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                  <span className="text-[14px] text-slate-500 font-extrabold">You have no orders yet.</span>
                </div>
              )}
            </div>
          )}

        </section>
      </main>

      {/* Account Page Custom Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 px-6 md:px-12 text-center select-none mt-12">
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-slate-500">
          <a href="#refund" className="hover:text-[#0b3178] transition">Refund policy</a>
          <span className="text-slate-200">|</span>
          <a href="#privacy" className="hover:text-[#0b3178] transition">Privacy policy</a>
          <span className="text-slate-200">|</span>
          <a href="#terms" className="hover:text-[#0b3178] transition">Terms of service</a>
          <span className="text-slate-200">|</span>
          <a href="#contact" className="hover:text-[#0b3178] transition">Contact information</a>
        </div>
      </footer>

    </div>
  );
}
