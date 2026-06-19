import React, { useState, useEffect } from 'react'

function Home({ setPage, setSelectedProductId, onCategorySelect }) {
  const [recommendedItems, setRecommendedItems] = useState([])
  const [dealOffers, setDealOffers] = useState([])
  const [homeOutdoorItems, setHomeOutdoorItems] = useState([])
  const [electronicsItems, setElectronicsItems] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/products?recommended=true')
      .then(res => res.json())
      .then(data => setRecommendedItems(data))
      .catch(err => console.error("Error loading recs:", err))

    fetch('http://127.0.0.1:5000/api/products?category=Deals')
      .then(res => res.json())
      .then(data => setDealOffers(data))
      .catch(err => console.error("Error loading deals:", err))

    fetch('http://127.0.0.1:5000/api/products?category=Home interiors')
      .then(res => res.json())
      .then(data => setHomeOutdoorItems(data.slice(0, 8)))
      .catch(err => console.error("Error loading home interiors:", err))

    fetch('http://127.0.0.1:5000/api/products?category=Computer and tech')
      .then(res => res.json())
      .then(data => setElectronicsItems(data.slice(0, 8)))
      .catch(err => console.error("Error loading computer and tech:", err))
  }, [])

  return (
    <div className="space-y-10 text-left antialiased animate-fade-in duration-500">
      
      {/* HERO BANNER FRAME */}
      <div className="bg-white border border-[#DEE2E7] rounded-xl p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 shadow-sm">
        <div className="hidden lg:block text-sm text-gray-600 space-y-1 font-medium select-none">
          <p onClick={() => onCategorySelect('')} className="text-[#0D6EFD] font-bold bg-blue-50 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200">All Categories Overview</p>
          <p onClick={() => onCategorySelect('Clothes and wear')} className="px-4 py-2.5 rounded-lg hover:bg-gray-50 hover:text-[#0D6EFD] cursor-pointer transition-all duration-200">Clothes and wear (Apparel)</p>
          <p onClick={() => onCategorySelect('Home interiors')} className="px-4 py-2.5 rounded-lg hover:bg-gray-50 hover:text-[#0D6EFD] cursor-pointer transition-all duration-200">Home interiors (Outdoor)</p>
          <p onClick={() => onCategorySelect('Computer and tech')} className="px-4 py-2.5 rounded-lg hover:bg-gray-50 hover:text-[#0D6EFD] cursor-pointer transition-all duration-200">Computer and tech</p>
          <p onClick={() => onCategorySelect('Electronics')} className="px-4 py-2.5 rounded-lg hover:bg-gray-50 hover:text-[#0D6EFD] cursor-pointer transition-all duration-200">Consumer Electronics</p>
        </div>

        {/* HERO CALLOUT WITH GRADIENT SLIDE */}
        <div className="lg:col-span-2 bg-gradient-to-tr from-[#E3F2FD] to-[#F0F7FF] rounded-xl p-8 flex flex-col justify-between items-start min-h-[280px] relative overflow-hidden border border-blue-100 group">
          <div className="space-y-2 relative z-10">
            <h3 className="text-xl text-blue-600 font-semibold tracking-wide uppercase text-xs">Latest trending</h3>
            <h2 className="text-3xl font-black text-gray-900 leading-tight max-w-xs transition-transform duration-300 group-hover:translate-x-1">Electronic items</h2>
          </div>
          <button 
            onClick={() => onCategorySelect('Computer and tech')} 
            className="bg-white text-gray-900 font-bold text-xs px-5 py-3 rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 relative z-10"
          >
            Source Now
          </button>
          <span className="absolute right-4 bottom-2 text-[11rem] opacity-20 select-none pointer-events-none transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">🎧</span>
        </div>

        {/* WELCOME CARD */}
        <div className="space-y-4 text-xs flex flex-col justify-between">
          <div className="bg-[#E3F2FD]/50 p-5 rounded-xl border border-blue-100/60 space-y-3 flex-grow flex flex-col justify-center">
            <p className="font-bold text-gray-800 text-sm">Hi, user, let's get started</p>
            <button className="w-full bg-[#0D6EFD] hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg shadow-sm active:scale-[0.98] transition-all duration-150">
              Join now
            </button>
          </div>
        </div>
      </div>

      {/* DEALS TIMED STRIP PANELS */}
      <div className="bg-white border border-[#DEE2E7] rounded-xl flex flex-col md:flex-row overflow-hidden shadow-sm">
        <div className="p-6 border-b md:border-b-0 md:border-r border-[#DEE2E7] shrink-0 flex flex-col justify-center min-w-[200px] bg-gray-50/50">
          <h4 className="font-black text-gray-900 text-base">Deals and offers</h4>
          <p className="text-gray-400 text-xs font-medium">Limited active layout</p>
        </div>
        <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-gray-100 text-center text-xs">
          {dealOffers.map((item) => (
            <div 
              key={item.id} 
              onClick={() => { setSelectedProductId(item.id); setPage('detail'); }} 
              className="p-5 flex flex-col items-center justify-between space-y-3 hover:bg-gray-50/80 transition-all duration-200 cursor-pointer bg-white group"
            >
              <span className="text-4xl select-none transition-transform duration-300 group-hover:scale-115">{item.image}</span>
              <p className="font-semibold text-gray-700 group-hover:text-[#0D6EFD] transition-colors duration-200 truncate w-full px-1">{item.name}</p>
              <span className="bg-[#FFE3E3] text-[#EB001B] font-black px-2.5 py-1 rounded-full text-[10px] tracking-wide shadow-sm">-25%</span>
            </div>
          ))}
        </div>
      </div>

      {/* HOME INTERIORS GRID ROWS */}
      <div className="bg-white border border-[#DEE2E7] rounded-xl flex flex-col lg:flex-row overflow-hidden shadow-sm">
        <div className="p-6 bg-gradient-to-b from-[#FBEFDF] to-[#F5E1C8] min-w-[240px] flex flex-col justify-between items-start space-y-4 relative">
          <h4 className="font-black text-gray-900 text-base leading-tight">Home and outdoor</h4>
          <button 
            onClick={() => onCategorySelect('Home interiors')} 
            className="bg-white text-gray-900 font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all duration-150"
          >
            Source now
          </button>
        </div>
        <div className="flex-grow grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-gray-100 text-left text-xs bg-white">
          {homeOutdoorItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => { setSelectedProductId(item.id); setPage('detail'); }} 
              className="p-5 flex justify-between items-start hover:bg-gray-50/60 transition-all duration-200 cursor-pointer bg-white group"
            >
              <div className="space-y-1 pr-2">
                <p className="font-semibold text-gray-800 line-clamp-2 group-hover:text-[#0D6EFD] transition-colors duration-200">{item.name}</p>
                <p className="text-gray-400 font-bold text-[10px]">From USD 19</p>
              </div>
              <span className="text-3xl select-none shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">{item.image}</span>
            </div>
          ))}
        </div>
      </div>

      {/* COMPUTER AND TECH ELECTRONICS ROWS */}
      <div className="bg-white border border-[#DEE2E7] rounded-xl flex flex-col lg:flex-row overflow-hidden shadow-sm">
        <div className="p-6 bg-gradient-to-b from-[#E5F1FF] to-[#D2E7FF] min-w-[240px] flex flex-col justify-between items-start space-y-4 relative">
          <h4 className="font-black text-gray-900 text-base leading-tight">Consumer electronics</h4>
          <button 
            onClick={() => onCategorySelect('Computer and tech')} 
            className="bg-white text-gray-900 font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all duration-150"
          >
            Source now
          </button>
        </div>
        <div className="flex-grow grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-gray-100 text-left text-xs bg-white">
          {electronicsItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => { setSelectedProductId(item.id); setPage('detail'); }} 
              className="p-5 flex justify-between items-start hover:bg-gray-50/60 transition-all duration-200 cursor-pointer bg-white group"
            >
              <div className="space-y-1 pr-2">
                <p className="font-semibold text-gray-800 line-clamp-2 group-hover:text-[#0D6EFD] transition-colors duration-200">{item.name}</p>
                <p className="text-gray-400 font-bold text-[10px]">From USD 19</p>
              </div>
              <span className="text-3xl select-none shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">{item.image}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RECOMMENDED 10-CARD BLOCK SECTION */}
      <div className="space-y-5 pt-2">
        <h3 className="text-xl font-black text-gray-900 tracking-tight">Recommended items</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {recommendedItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => { setSelectedProductId(item.id); setPage('detail'); }}
              className="bg-white border border-[#DEE2E7] rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="bg-gray-50 rounded-lg h-32 flex items-center justify-center text-4xl mb-4 select-none transition-colors duration-300 group-hover:bg-blue-50/40">{item.image}</div>
              <div className="space-y-1.5 text-left text-xs font-medium">
                <p className="text-base font-black text-gray-900 group-hover:text-[#0D6EFD] transition-colors duration-150">{item.price}</p>
                <p className="text-gray-500 leading-snug line-clamp-2 font-medium">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home