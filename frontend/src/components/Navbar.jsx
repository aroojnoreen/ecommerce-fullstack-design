import React, { useState } from 'react'

function Navbar({ setPage, currentPage, cartCount, onCategorySelect, onSignInClick, currentUser, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // Passes the search string to our category filter router which handles query params
    if (searchQuery.trim()) {
      onCategorySelect(`search:${searchQuery.trim()}`)
    } else {
      onCategorySelect('')
    }
  }

  return (
    <nav className="bg-white border-b border-[#DEE2E7] w-full text-xs font-semibold antialiased">
      
      {/* UPPER MAIN HEADER STRIP CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand/Logo Layout Item */}
        <div 
          onClick={() => { setSearchQuery(''); onCategorySelect(''); setPage('home'); }} 
          className="text-[#0D6EFD] font-black text-2xl tracking-tight cursor-pointer select-none"
        >
          MALL
        </div>

        {/* Global Catalog Search Form Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-grow max-w-2xl hidden sm:flex border-2 border-[#0D6EFD] rounded-lg overflow-hidden">
          <input 
            type="text" 
            placeholder="Search products, categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-sm focus:outline-none text-gray-800 font-normal"
          />
          <button type="submit" className="bg-[#0D6EFD] text-white px-7 font-bold hover:bg-blue-700 transition tracking-wide text-xs">
            Search
          </button>
        </form>

        {/* User System Utilities Container Widgets */}
        <div className="flex items-center space-x-6 text-gray-500 font-medium select-none">
          
          {currentUser ? (
            <div className="flex flex-col items-center cursor-pointer text-gray-800" onClick={onLogout}>
              <span className="text-base text-green-600">👤 ✔</span>
              <span className="text-[9px] font-bold pt-0.5 max-w-[65px] truncate">Logout ({currentUser})</span>
            </div>
          ) : (
            <div className="flex flex-col items-center cursor-pointer hover:text-gray-800 transition" onClick={onSignInClick}>
              <span className="text-base">👤</span>
              <span className="text-[10px] pt-0.5">Sign In</span>
            </div>
          )}
          
          <div 
            onClick={() => setPage('cart')} 
            className="flex flex-col items-center cursor-pointer hover:text-gray-800 transition relative pr-1"
          >
            <span className="text-base">🛒</span>
            <span className="text-[10px] pt-0.5">Cart</span>
            <span className="absolute right-[-6px] top-[-6px] bg-[#0D6EFD] text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
              {cartCount}
            </span>
          </div>

        </div>
      </div>

      {/* SECONDARY BOTTOM CATEGORY HORIZONTAL QUICK-STRIP */}
      <div className="border-t border-gray-100 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center space-x-6 text-gray-600 font-medium overflow-x-auto whitespace-nowrap">
          <p 
            onClick={() => { setSearchQuery(''); onCategorySelect(''); setPage('home'); }} 
            className={`hover:text-[#0D6EFD] cursor-pointer transition ${currentPage === 'home' ? 'text-[#0D6EFD] font-bold' : ''}`}
          >
            All Categories
          </p>
          <p onClick={() => onCategorySelect('Electronics')} className="hover:text-[#0D6EFD] cursor-pointer transition">Consumer electronics</p>
          <p onClick={() => onCategorySelect('Home interiors')} className="hover:text-[#0D6EFD] cursor-pointer transition">Home and outdoor</p>
          <p onClick={() => onCategorySelect('Clothes and wear')} className="hover:text-[#0D6EFD] cursor-pointer transition">Apparel</p>
          <p onClick={() => onCategorySelect('Sports')} className="hover:text-[#0D6EFD] cursor-pointer transition">Sports & Entertainment</p>
        </div>
      </div>

    </nav>
  )
}

export default Navbar