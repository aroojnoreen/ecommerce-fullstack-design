import React, { useState, useEffect } from 'react'

function ProductListing({ setPage, setSelectedProductId, categoryFilter, setCategoryFilter }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    let url = 'https://ecommerce-fullstack-design-tv00.onrender.com/api/products'
    if (categoryFilter) {
      url += `?category=${encodeURIComponent(categoryFilter)}`
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error connecting structural data arrays:", err))
  }, [categoryFilter])

  return (
    <div className="space-y-6 text-left antialiased animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200/60 pb-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Catalog Inventory</h2>
          <p className="text-xs text-gray-400 font-semibold">Explore trending wholesale manufacturing streams</p>
        </div>
        
        {categoryFilter && (
          <button 
            onClick={() => setCategoryFilter('')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[11px] px-3 py-1.5 rounded-lg border w-fit shadow-sm"
          >
            Clear Filter Matrix: <span className="text-gray-900 font-black ml-0.5">"{categoryFilter}" ×</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {products.map((product) => (
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

      {products.length === 0 && (
        <div className="bg-white border border-[#DEE2E7] rounded-xl p-16 text-center text-gray-400 font-semibold shadow-sm w-full">
          No catalog files index matching the query structure.
        </div>
      )}
    </div>
  )
}

export default ProductListing