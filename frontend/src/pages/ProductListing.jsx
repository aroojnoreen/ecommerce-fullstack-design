import React, { useState, useEffect } from 'react'

function ProductListing({ setPage, setSelectedProductId, categoryFilter, setCategoryFilter, searchQuery }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch('https://ecommerce-fullstack-design-tv00.onrender.com/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching catalog database lines:", err)
        setLoading(false)
      })
  }, [])

  // ADVANCED MULTI-AXIS FILTER ENGINE (Fixes both search bar keywords and category buttons)
  const filteredProducts = products.filter(product => {
    // 1. Structural Category Match Condition
    let matchesCategory = true
    if (categoryFilter) {
      const productCat = product.category ? product.category.toLowerCase() : ''
      const targetCat = categoryFilter.toLowerCase()
      
      // Smart substring check: matches "Home and outdoor" even if db field just says "home"
      matchesCategory = productCat.includes(targetCat) || targetCat.includes(productCat)
    }

    // 2. Search Query Matrix Match Condition
    let matchesSearch = true
    if (searchQuery) {
      const cleanQuery = searchQuery.toLowerCase().trim()
      const productName = product.name ? product.name.toLowerCase() : ''
      const productDesc = product.description ? product.description.toLowerCase() : ''
      const productCat = product.category ? product.category.toLowerCase() : ''

      matchesSearch = productName.includes(cleanQuery) || 
                      productDesc.includes(cleanQuery) || 
                      productCat.includes(cleanQuery)
    }

    return matchesCategory && matchesSearch
  })

  if (loading) {
    return <div className="text-center py-12 text-xs font-bold text-gray-400">Loading procurement inventory index...</div>
  }

  return (
    <div className="space-y-6 text-left antialiased animate-fade-in">
      
      {/* FILTER STATUS META CONSOLE HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Catalog Inventory</h2>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">Explore trending wholesale manufacturing streams</p>
        </div>
        
        {/* CLEAR FILTERS CHIP CONTAINER */}
        {(categoryFilter || searchQuery) && (
          <button 
            onClick={() => { setCategoryFilter('') }}
            className="bg-gray-50 hover:bg-gray-100 border text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-2 shadow-sm"
          >
            Clear Filter Matrix: 
            <span className="text-[#0D6EFD]">
              {categoryFilter ? `"${categoryFilter}"` : ''} {searchQuery ? `(Search: "${searchQuery}")` : ''}
            </span> 
            <span className="text-gray-400 font-black">×</span>
          </button>
        )}
      </div>

      {/* CORE PRODUCT CATALOG DISPLAY GRID */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-[#DEE2E7] rounded-xl p-16 text-center shadow-sm">
          <p className="text-gray-400 font-bold text-xs">No catalog files index matching the query structure.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => { setSelectedProductId(product.id); setPage('detail'); }}
              className="bg-white border border-[#DEE2E7] rounded-xl p-4 flex flex-col justify-between space-y-4 hover:shadow-md transition cursor-pointer group shadow-sm"
            >
              {/* IMAGE FRAME */}
              <div className="bg-gray-50 h-40 rounded-lg flex items-center justify-center text-5xl select-none border border-gray-100 relative overflow-hidden">
                <span className="group-hover:scale-110 transition duration-200">{product.image || '📦'}</span>
              </div>

              {/* CORE DATA STRIP */}
              <div className="space-y-2 flex-grow flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight min-h-[32px]">
                    {product.name}
                  </h3>
                  <p className="text-[#0D6EFD] font-black text-sm tracking-tight">
                    {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}
                  </p>
                </div>

                {/* VISUAL CATEGORY BADGING TAG */}
                <div className="pt-2">
                  <span className="bg-gray-100 text-gray-500 font-black tracking-wider text-[9px] uppercase px-2 py-0.5 rounded">
                    {product.category || 'Wholesale'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default ProductListing