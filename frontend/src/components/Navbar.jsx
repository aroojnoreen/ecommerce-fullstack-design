import React, { useState } from 'react'

function Navbar({ setPage, currentPage, onCategorySelect, onSignInClick, currentUser, onLogout, onSearchSubmit }) {
  const [searchQuery, setSearchQuery] = useState('')
  
  const categories = [
    "Consumer electronics",
    "Home and outdoor",
    "Apparel",
    "Sports & Entertainment"
  ]

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery)
      setPage('products')
    }
  }

  return (
    <header className="bg-white border-b border-[#DEE2E7] sticky top-0 z-40 w-full antialiased text-left">
      {/* MAIN TOP NAVIGATION STRIP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* LOGO LINK BRANDING */}
        <div 
          onClick={() => { onCategorySelect(''); setPage('home'); }}
          className="text-[#0D6EFD] font-black text-2xl tracking-tight cursor-pointer select-none shrink-0"
        >
          MALL
        </div>

        {/* RESTORED SEARCH BAR MODULE */}
        <form onSubmit={handleFormSubmit} className="flex-grow max-w-xl mx-4 hidden sm:flex border-2 border-[#0D6EFD] rounded-lg overflow-hidden">
          <input 
            type="text" 
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products, categories..." 
            className="w-full px-3 py-1.5 text-xs font-semibold focus:outline-none"
          />
          <button type="submit" className="bg-[#0D6EFD] text-white font-bold text-xs px-5 hover:bg-blue-700 transition">
            Search
          </button>
        </form>

        {/* RIGHT SIDE ACTIONS CONTAINER */}
        <div className="flex items-center space-x-6 shrink-0 text-xs font-semibold text-gray-500">
          
          {/* ADMIN PORTAL PANEL TOGGLE ELEMENT */}
          {currentUser === 'admin' && (
            <button 
              onClick={() => setPage('admin')}
              className={`font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-md transition ${currentPage === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              ⚙️ Admin Panel
            </button>
          )}

          {/* USER AUTH CONDITIONAL DISPATCHER */}
          {currentUser ? (
            <div className="flex items-center space-x-3 border-r border-gray-200 pr-4 py-1">
              <div className="text-right">
                <p className="text-gray-400 text-[10px] uppercase font-black tracking-wider">Active User</p>
                <p className="text-gray-900 font-bold truncate max-w-[90px]">@{currentUser}</p>
              </div>
              <button 
                onClick={onLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded-md transition font-bold"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={onSignInClick}
              className="flex flex-col items-center hover:text-[#0D6EFD] transition cursor-pointer group"
            >
              <span className="text-xl mb-0.5 select-none transition group-hover:scale-110">👤</span>
              <span className="font-semibold text-gray-600 group-hover:text-[#0D6EFD]">Sign In</span>
            </button>
          )}

          {/* CLEAN ICON-ONLY CART TOGGLE */}
          <button 
            onClick={() => setPage('cart')}
            className={`flex flex-col items-center transition cursor-pointer relative group ${currentPage === 'cart' ? 'text-[#0D6EFD]' : 'hover:text-[#0D6EFD]'}`}
          >
            <span className="text-xl mb-0.5 select-none transition group-hover:scale-110">🛒</span>
            <span className={`font-semibold ${currentPage === 'cart' ? 'text-[#0D6EFD]' : 'text-gray-600 group-hover:text-[#0D6EFD]'}`}>Cart</span>
          </button>
        </div>

      </div>

      {/* SECONDARY CATEGORIES SUITE BANNER BAR */}
      <div className="border-t border-gray-100 bg-white hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center text-xs font-bold text-gray-600 space-x-6">
          <span 
            onClick={() => { onCategorySelect(''); setPage('products'); }}
            className={`cursor-pointer hover:text-gray-900 transition ${currentPage === 'products' ? 'text-gray-900 underline decoration-2 decoration-[#0D6EFD] underline-offset-4' : ''}`}
          >
            All Categories
          </span>
          {categories.map((cat, idx) => (
            <span 
              key={idx}
              onClick={() => onCategorySelect(cat)}
              className="cursor-pointer hover:text-gray-900 transition font-medium text-gray-500 hover:font-bold"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Navbar