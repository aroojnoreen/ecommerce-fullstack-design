import React, { useState, useEffect } from 'react'

function Home({ setPage, setSelectedProductId, onCategorySelect }) {
  const [recommendedProducts, setRecommendedProducts] = useState([])

  useEffect(() => {
    fetch('https://ecommerce-fullstack-design-tv00.onrender.com/api/products?recommended=true')
      .then((res) => res.json())
      .then((data) => setRecommendedProducts(data))
      .catch((err) => console.error("Error fetching recommended parameters:", err))
  }, [])

  return (
    <div className="space-y-10 text-left antialiased animate-fade-in">
      
      {/* 3-COLUMN HERO GRID BOX PANEL */}
      <div className="bg-white border border-[#DEE2E7] rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[380px] shadow-sm">
        
        {/* LEFT COMPONENT: CATEGORIES MENU SIDEBAR */}
        <div className="md:col-span-1 flex flex-col space-y-1 text-sm text-gray-600 font-medium">
          <div className="bg-blue-50 text-[#0D6EFD] font-bold p-2.5 rounded-lg text-xs tracking-tight select-none">
            All Categories Overview
          </div>
          <button 
            onClick={() => { onCategorySelect('Apparel'); setPage('products'); }}
            className="p-2.5 rounded-lg hover:bg-gray-50 text-left transition text-xs hover:text-gray-900"
          >
            Clothes and wear (Apparel)
          </button>
          <button 
            onClick={() => { onCategorySelect('Home and outdoor'); setPage('products'); }}
            className="p-2.5 rounded-lg hover:bg-gray-50 text-left transition text-xs hover:text-gray-900"
          >
            Home interiors (Outdoor)
          </button>
          <button 
            onClick={() => { onCategorySelect('Consumer electronics'); setPage('products'); }}
            className="p-2.5 rounded-lg hover:bg-gray-50 text-left transition text-xs hover:text-gray-900"
          >
            Computer and tech
          </button>
          <button 
            onClick={() => { onCategorySelect('Consumer electronics'); setPage('products'); }}
            className="p-2.5 rounded-lg hover:bg-gray-50 text-left transition text-xs hover:text-gray-900"
          >
            Consumer Electronics
          </button>
        </div>

        {/* MIDDLE COMPONENT: FEATURED PROMOTION CARD BANNER WITH GRAPHICS */}
        <div className="md:col-span-2 bg-[#E3F2FD] rounded-xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden border border-blue-100/40">
          <div className="space-y-4">
            <p className="text-gray-900 font-bold text-base tracking-tight">Latest trending structural layouts</p>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight tracking-tight max-w-[280px]">
              Electronic items, robust supply chains
            </h1>
          </div>
          
          {/* CENTER GRAPHICS ROW INTEGRATION */}
          <div className="flex items-center gap-4 text-5xl my-4 select-none opacity-90">
            <span>📦</span>
            <span>🏭</span>
            <span>💻</span>
          </div>

          <button 
            onClick={() => { onCategorySelect(''); setPage('products'); }}
            className="bg-[#0D6EFD] text-white font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm w-fit z-10"
          >
            Source now
          </button>
          
          <div className="absolute right-4 bottom-4 text-6xl opacity-20 select-none hidden sm:block pointer-events-none">
            🎧
          </div>
        </div>

        {/* RIGHT COMPONENT: WELCOME HUB QUICK PANEL */}
        <div className="md:col-span-1 flex flex-col justify-between gap-4">
          <div className="bg-[#E5F1FF] rounded-xl p-4 flex flex-col justify-between h-full border border-blue-100/30 text-xs">
            <div className="flex gap-3 items-center">
              <span className="text-2xl select-none">👤</span>
              <p className="font-bold text-gray-900 leading-tight">
                Hi, user, let's get started
              </p>
            </div>
            <button 
              onClick={() => setPage('products')}
              className="w-full bg-[#0D6EFD] hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition text-center shadow-sm mt-4"
            >
              Join now
            </button>
          </div>
        </div>

      </div>

      {/* DYNAMIC RECOMMENDATIONS GRID SECTION */}
      <div className="space-y-5 text-left">
        <h3 className="text-xl font-black text-gray-900 tracking-tight">Recommended inventory lines</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {recommendedProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => { setSelectedProductId(product.id); setPage('detail'); }}
              className="bg-white border border-[#DEE2E7] rounded-xl p-3.5 space-y-3 shadow-sm hover:shadow-md hover:border-gray-300 transition duration-300 group cursor-pointer text-left flex flex-col justify-between"
            >
              <div className="bg-gray-50 h-36 rounded-lg flex items-center justify-center text-5xl select-none group-hover:scale-105 transition duration-300 border border-gray-100">
                {product.image}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900 text-xs tracking-tight line-clamp-2 min-h-[32px]">{product.name}</h4>
                <p className="text-[#0D6EFD] font-black text-sm">{product.price}</p>
                <span className="inline-block bg-gray-100 text-gray-500 font-bold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home