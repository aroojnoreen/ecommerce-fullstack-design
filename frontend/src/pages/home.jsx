import React, { useState, useEffect } from 'react'

function Home({ setPage, setSelectedProductId, onCategorySelect }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://ecommerce-fullstack-design-tv00.onrender.com/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching homepage structural inventory:", err))
  }, [])

  // Case-insensitive filters to safely grab products regardless of database capitalization variants
  const homeAndOutdoorItems = products.filter(p => 
    p.category && p.category.toLowerCase().includes('home')
  ).slice(0, 8)

  const consumerElectronicsItems = products.filter(p => 
    p.category && p.category.toLowerCase().includes('electronic')
  ).slice(0, 8)

  const dealsItems = products.slice(0, 5) // Top items displaying deal cuts

  return (
    <div className="space-y-8 text-left antialiased animate-fade-in pb-12">
      
      {/* 3-COLUMN HERO STRIP */}
      <div className="bg-white border border-[#DEE2E7] rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[380px] shadow-sm">
        {/* LEFT: CATEGORIES SIDEBAR */}
        <div className="md:col-span-1 flex flex-col space-y-1 text-sm text-gray-600 font-medium">
          <div className="bg-blue-50 text-[#0D6EFD] font-bold p-2.5 rounded-lg text-xs tracking-tight select-none">
            All Categories Overview
          </div>
          <button onClick={() => { onCategorySelect('Apparel'); setPage('products'); }} className="p-2.5 rounded-lg hover:bg-gray-50 text-left transition text-xs">
            Clothes and wear (Apparel)
          </button>
          <button onClick={() => { onCategorySelect('Home and outdoor'); setPage('products'); }} className="p-2.5 rounded-lg hover:bg-gray-50 text-left transition text-xs">
            Home interiors (Outdoor)
          </button>
          <button onClick={() => { onCategorySelect('Consumer electronics'); setPage('products'); }} className="p-2.5 rounded-lg hover:bg-gray-50 text-left transition text-xs">
            Computer and tech
          </button>
          <button onClick={() => { onCategorySelect('Consumer electronics'); setPage('products'); }} className="p-2.5 rounded-lg hover:bg-gray-50 text-left transition text-xs">
            Consumer Electronics
          </button>
        </div>

        {/* CENTER: COVER BANNER */}
        <div className="md:col-span-2 bg-[#E3F2FD] rounded-xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden border border-blue-100/40">
          <div className="space-y-4">
            <p className="text-gray-900 font-bold text-base tracking-tight">Latest trending structural layouts</p>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight tracking-tight max-w-[280px]">
              Electronic items, robust supply chains
            </h1>
          </div>
          <div className="flex items-center gap-4 text-5xl my-4 select-none opacity-90">
            <span>📦</span><span>🏭</span><span>💻</span>
          </div>
          <button onClick={() => { onCategorySelect(''); setPage('products'); }} className="bg-[#0D6EFD] text-white font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm w-fit z-10">
            Source now
          </button>
        </div>

        {/* RIGHT: JOIN CARD */}
        <div className="md:col-span-1 flex flex-col justify-between gap-4">
          <div className="bg-[#E5F1FF] rounded-xl p-4 flex flex-col justify-between h-full border border-blue-100/30 text-xs">
            <div className="flex gap-3 items-center">
              <span className="text-2xl select-none">👤</span>
              <p className="font-bold text-gray-900 leading-tight">Hi, user, let's get started</p>
            </div>
            <button onClick={() => setPage('products')} className="w-full bg-[#0D6EFD] hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition text-center shadow-sm mt-4">
              Join now
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: DEALS AND OFFERS BLOCK */}
      <div className="bg-white border border-[#DEE2E7] rounded-xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-5">
        <div className="p-5 border-b md:border-b-0 md:border-r border-[#DEE2E7] flex flex-col justify-center text-left space-y-1">
          <h3 className="text-base font-black text-gray-900">Deals and offers</h3>
          <p className="text-gray-400 text-xs font-semibold">Limited active layout</p>
        </div>
        <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-[#DEE2E7]">
          {dealsItems.map((product) => (
            <div 
              key={product.id} 
              onClick={() => { setSelectedProductId(product.id); setPage('detail'); }}
              className="p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-gray-50/50 transition group"
            >
              <div className="text-4xl select-none group-hover:scale-105 transition duration-200">{product.image}</div>
              <p className="text-xs font-bold text-gray-800 truncate w-full px-2">{product.name}</p>
              <span className="bg-[#FFE3E3] text-[#EB5757] text-[10px] font-black px-2 py-0.5 rounded-full">-25%</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: HOME AND OUTDOOR DUAL ROW BLOCK */}
      <div className="bg-white border border-[#DEE2E7] rounded-xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-4">
        <div className="p-6 bg-[#FBE9E7]/40 flex flex-col justify-between items-start min-h-[160px] md:min-h-0">
          <h3 className="text-base font-black text-gray-900 max-w-[120px]">Home and outdoor</h3>
          <button onClick={() => { onCategorySelect('Home and outdoor'); setPage('products'); }} className="bg-white text-gray-900 font-bold text-xs px-4 py-2 rounded-lg hover:bg-gray-50 transition border border-gray-200 shadow-sm">
            Source now
          </button>
        </div>
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-4 grid-rows-2 border-t md:border-t-0 md:border-l border-[#DEE2E7] divide-x divide-y divide-[#DEE2E7]">
          {homeAndOutdoorItems.map((product) => (
            <div 
              key={product.id}
              onClick={() => { setSelectedProductId(product.id); setPage('detail'); }}
              className="p-3 flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-50/50 transition text-left group"
            >
              <div className="space-y-0.5 max-w-[110px]">
                <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight">{product.name}</h4>
                <p className="text-gray-400 text-[10px] font-bold">From USD 19</p>
              </div>
              <div className="text-3xl select-none group-hover:scale-110 transition duration-200 shrink-0">{product.image}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: CONSUMER ELECTRONICS DUAL ROW BLOCK */}
      <div className="bg-white border border-[#DEE2E7] rounded-xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-4">
        <div className="p-6 bg-[#E3F2FD]/40 flex flex-col justify-between items-start min-h-[160px] md:min-h-0">
          <h3 className="text-base font-black text-gray-900 max-w-[120px]">Consumer electronics</h3>
          <button onClick={() => { onCategorySelect('Consumer electronics'); setPage('products'); }} className="bg-white text-gray-900 font-bold text-xs px-4 py-2 rounded-lg hover:bg-gray-50 transition border border-gray-200 shadow-sm">
            Source now
          </button>
        </div>
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-4 grid-rows-2 border-t md:border-t-0 md:border-l border-[#DEE2E7] divide-x divide-y divide-[#DEE2E7]">
          {consumerElectronicsItems.map((product) => (
            <div 
              key={product.id}
              onClick={() => { setSelectedProductId(product.id); setPage('detail'); }}
              className="p-3 flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-50/50 transition text-left group"
            >
              <div className="space-y-0.5 max-w-[110px]">
                <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight">{product.name}</h4>
                <p className="text-gray-400 text-[10px] font-bold">From USD 19</p>
              </div>
              <div className="text-3xl select-none group-hover:scale-110 transition duration-200 shrink-0">{product.image}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home