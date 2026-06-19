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
      {/* HERO BANNER SECTION */}
      <div className="bg-white border border-[#DEE2E7] rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row items-center p-6 md:p-10 gap-8 min-h-[380px]">
        <div className="space-y-4 md:w-1/2">
          <p className="text-gray-900 font-bold text-base tracking-tight">Latest trending structural layouts</p>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight tracking-tighter">
            Electronic items, robust supply chains
          </h1>
          <button 
            onClick={() => { onCategorySelect(''); setPage('products'); }}
            className="bg-[#0D6EFD] text-white font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            Source now
          </button>
        </div>
        <div className="md:w-1/2 flex items-center justify-center text-7xl select-none animate-bounce duration-1000">
          📦🏭💻
        </div>
      </div>

      {/* DYNAMIC RECOMMENDATIONS SECTION GRID MAP */}
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