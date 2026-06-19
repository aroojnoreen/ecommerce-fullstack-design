import React, { useState, useEffect } from 'react'

function ProductDetail({ setPage, productId, refreshCartCount }) {
  const [product, setProduct] = useState(null)
  const [addStatus, setAddStatus] = useState('')

  useEffect(() => {
    if (!productId) return
    fetch(`http://127.0.0.1:5000/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error loading item details:", err))
  }, [productId])

  const handleAddToCart = () => {
    fetch('http://127.0.0.1:5000/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: product.id })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAddStatus('✅ Added to Cart successfully!')
          refreshCartCount() // Triggers navigation bubble count refresh instantly
          setTimeout(() => setAddStatus(''), 2000)
        }
      })
      .catch((err) => console.error("Error writing to cart database:", err))
  }

  if (!product) {
    return <p className="text-left text-gray-500 text-sm p-8">Downloading product specification sheet...</p>
  }

  return (
    <div className="space-y-4 text-left antialiased">
      <button 
        onClick={() => setPage('home')} 
        className="text-[#0D6EFD] font-semibold text-sm hover:underline flex items-center gap-1"
      >
        ← Back to Catalog Home Page
      </button>

      <div className="bg-white border border-[#DEE2E7] rounded-xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 shadow-sm">
        {/* Left Side: Product Image Frame layout */}
        <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center text-9xl border border-gray-100 min-h-[320px] select-none">
          {product.image}
        </div>

        {/* Right Side: Specifications list content strings */}
        <div className="flex flex-col justify-between py-2">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#0D6EFD] px-3 py-1 rounded-md">
              {product.category}
            </span>
            <h1 className="text-2xl font-black text-gray-900 leading-tight">{product.name}</h1>
            <div className="text-sm font-medium text-orange-500 flex items-center gap-2">
              ★ {product.rating} <span className="text-gray-400 font-normal">· {product.orders}</span>
            </div>
            <hr className="border-gray-100" />
            <div className="text-3xl font-black text-gray-900">{product.price}</div>
            <p className="text-gray-600 text-sm leading-relaxed pt-2">{product.description}</p>
          </div>

          <div className="space-y-2 pt-6">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-[#0D6EFD] text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition shadow-sm text-sm"
            >
              Add to Shopping Cart
            </button>
            {addStatus && <p className="text-green-600 text-xs font-bold text-center animate-pulse">{addStatus}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail