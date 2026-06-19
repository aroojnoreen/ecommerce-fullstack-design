import React, { useState, useEffect } from 'react'

function ProductListing({ setPage, setSelectedProductId, categoryFilter, setCategoryFilter }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Determine if we are processing a keyword search query or a category filter
  const isSearch = categoryFilter.startsWith('search:')
  const displayTitle = isSearch 
    ? `Search Results for "${categoryFilter.replace('search:', '')}"`
    : (categoryFilter ? `${categoryFilter} Collection` : 'All Available Catalog Stocks')

  useEffect(() => {
    setLoading(true)
    
    let url = 'http://127.0.0.1:5000/api/products'
    if (categoryFilter) {
      if (isSearch) {
        const queryText = categoryFilter.replace('search:', '')
        url += `?search=${encodeURIComponent(queryText)}`
      } else {
        url += `?category=${encodeURIComponent(categoryFilter)}`
      }
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error loading filtered products:", err)
        setLoading(false)
      })
  }, [categoryFilter])

  const handleItemSelect = (id) => {
    setSelectedProductId(id)
    setPage('detail')
  }

  if (loading) {
    return <p className="text-left text-gray-500 text-sm p-8">Searching database records...</p>
  }

  return (
    <div className="space-y-6 text-left antialiased">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-gray-900">{displayTitle}</h2>
          <p className="text-xs font-semibold text-gray-400">Showing {products.length} matching entries</p>
        </div>
        {categoryFilter && (
          <button 
            onClick={() => setCategoryFilter('')} 
            className="text-xs bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-600 font-bold px-3 py-1.5 rounded-md transition"
          >
            Clear Search Filter
          </button>
        )}
      </div>

      {/* PRODUCTS DISPLAY LIST */}
      <div className="space-y-4">
        {products.map((item) => (
          <div 
            key={item.id}
            onClick={() => handleItemSelect(item.id)}
            className="bg-white border border-[#DEE2E7] rounded-xl p-5 flex flex-col sm:flex-row gap-5 items-center hover:shadow-md transition cursor-pointer"
          >
            <div className="bg-gray-50 h-32 w-32 rounded-lg flex items-center justify-center text-5xl border border-gray-100 shrink-0 select-none">
              {item.image}
            </div>
            <div className="flex-grow space-y-2 w-full">
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-bold text-gray-900 text-base hover:text-[#0D6EFD] transition">{item.name}</h3>
                <span className="font-black text-gray-900 text-lg shrink-0">{item.price}</span>
              </div>
              <div className="text-xs font-semibold text-orange-500 flex items-center gap-2">
                ★ {item.rating} <span className="text-gray-400 font-medium">· {item.orders} · <span className="text-green-600 font-bold">{item.shipping}</span></span>
              </div>
              <p className="text-gray-500 text-xs font-medium line-clamp-2 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="bg-white border border-[#DEE2E7] rounded-xl p-12 text-center text-gray-400 font-semibold shadow-sm">
            No live catalog entries matching your search query were found.
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductListing