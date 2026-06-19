import React, { useState, useEffect } from 'react'

function ProductDetail({ setPage, productId, refreshCartCount }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [addSuccess, setAddSuccess] = useState(false)

  useEffect(() => {
    if (!productId) return
    fetch(`https://ecommerce-fullstack-design-tv00.onrender.com/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error loading specification profiles:", err)
        setLoading(false)
      })
  }, [productId])

  const handleAddToCart = () => {
    setIsAdding(true)
    fetch('https://ecommerce-fullstack-design-tv00.onrender.com/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAdding(false)
        if (data.success) {
          setAddSuccess(true)
          refreshCartCount() // Trigger immediate global navbar badge sync loop
          setTimeout(() => setAddSuccess(false), 2000)
        }
      })
      .catch((err) => {
        console.error("Connection drop error injecting shopping data line:", err)
        setIsAdding(false)
      })
  }

  if (loading) return <p className="text-left text-gray-500 text-sm p-8">Parsing component arrays...</p>
  if (!product) return <p className="text-left text-red-500 text-sm p-8">Item data vector matrix not initialized properly.</p>

  return (
    <div className="space-y-6 text-left antialiased animate-fade-in">
      <button onClick={() => setPage('products')} className="text-xs font-bold text-[#0D6EFD] hover:underline flex items-center gap-1">
        ← Back to inventory listings
      </button>

      <div className="bg-white border border-[#DEE2E7] rounded-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-sm">
        <div className="bg-gray-50 border border-gray-100 rounded-xl min-h-[280px] md:min-h-[380px] flex items-center justify-center text-8xl select-none shadow-inner">
          {product.image}
        </div>

        <div className="flex flex-col justify-between py-2 text-left space-y-6">
          <div className="space-y-3">
            <span className="bg-blue-50 text-[#0D6EFD] font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-widest border border-blue-100/50">
              {product.category}
            </span>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">{product.name}</h2>
            <p className="text-xl font-black text-gray-900 pt-1">{product.price}</p>
            <hr className="border-gray-100" />
            <p className="text-gray-500 text-xs font-medium leading-relaxed max-w-md">
              {product.description || "Robust structural utility testing profiles ready for cross-border global commercial distribution systems. Features advanced architecture compatibility pipelines natively."}
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full sm:w-auto bg-[#0D6EFD] text-white font-bold text-xs px-8 py-3 rounded-lg hover:bg-blue-700 transition shadow-sm disabled:bg-gray-400 tracking-wide min-w-[180px]"
            >
              {isAdding ? "Syncing API Streams..." : "Add to Shopping Cart"}
            </button>
            {addSuccess && (
              <p className="text-green-600 font-bold text-xs bg-green-50 px-3 py-1.5 rounded border border-green-100 w-fit animate-bounce">
                ✨ Badge updated! Item loaded live into cart database.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail