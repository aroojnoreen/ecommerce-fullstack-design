import React, { useState, useEffect } from 'react'

function ProductDetail({ setPage, productId, refreshCartCount }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    if (!productId) return
    setLoading(true)
    fetch(`https://ecommerce-fullstack-design-tv00.onrender.com/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error pulling product node data:", err)
        setLoading(false)
      })
  }, [productId])

  // BULLETPROOF CART ADDITION MACHINE
  const handleAddToCart = () => {
    if (!product) return
    setAdding(true)
    setStatusMessage('Syncing API streams...')

    // Step 1: Secure Local Storage Backup State
    const currentCart = JSON.parse(localStorage.getItem('cart')) || []
    
    // Check if item is already in the cart to avoid duplicates
    const itemExists = currentCart.some(item => item.id === product.id)
    if (!itemExists) {
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || '📦',
        quantity: 1
      })
      localStorage.setItem('cart', JSON.stringify(currentCart))
    }

    // Step 2: Push sync to database backend API pipeline
    fetch('https://ecommerce-fullstack-design-tv00.onrender.com/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id, quantity: 1 })
    })
    .then((res) => {
      // Handle both success codes and slow server responses safely
      if (res.ok || res.status === 201 || res.status === 200) {
        return res.json().catch(() => ({ success: true }))
      }
      throw new Error('Server side cart sync rejected')
    })
    .then(() => {
      setStatusMessage('Item successfully added to cart storage matrix!')
      if (typeof refreshCartCount === 'function') refreshCartCount()
      setAdding(false)
    })
    .catch((err) => {
      console.warn("API stream drop, fallback onto persistent local storage:", err)
      // Fallback: Even if your Render API is running slow, the item is saved locally so the user can finish!
      setStatusMessage('Item added (Local Storage Mode active).')
      if (typeof refreshCartCount === 'function') refreshCartCount()
      setAdding(false)
    })
  }

  if (loading) {
    return <div className="text-center py-12 text-xs font-bold text-gray-400">Loading component assets...</div>
  }

  if (!product) {
    return (
      <div className="bg-white border border-[#DEE2E7] rounded-xl p-12 text-center max-w-md mx-auto shadow-sm">
        <p className="text-gray-400 font-bold text-xs">Product parameters could not be indexed.</p>
        <button onClick={() => setPage('home')} className="mt-4 bg-[#0D6EFD] text-white text-xs font-bold px-4 py-2 rounded-lg">Return Home</button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto bg-white border border-[#DEE2E7] rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-left shadow-sm antialiased animate-fade-in">
      
      {/* LEFT COLUMN: IMAGE DISPLAY BOX */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl h-80 flex items-center justify-center text-7xl select-none">
        {product.image || '📦'}
      </div>

      {/* RIGHT COLUMN: DETAIL STRIP */}
      <div className="flex flex-col justify-between space-y-6 py-2">
        <div className="space-y-3">
          <span className="bg-green-100 text-green-700 font-black text-[10px] uppercase px-2.5 py-1 rounded">
            In Stock & Verifiable
          </span>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight tracking-tight">
            {product.name}
          </h2>
          <p className="text-[#EB5757] font-black text-xl tracking-tight">
            {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}
          </p>
          <div className="border-t border-gray-100 my-4 pt-4">
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              {product.description || 'Wholesale commercial grade structural manufacturing layout. Sourced from high tier global processing distribution centers.'}
            </p>
          </div>
        </div>

        {/* INTERACTION HUB */}
        <div className="space-y-3">
          <button 
            onClick={handleAddToCart}
            disabled={adding}
            className={`w-full font-bold py-3 px-6 rounded-xl text-xs tracking-wide transition shadow-sm border ${
              adding 
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-[#0D6EFD] hover:bg-blue-700 border-blue-600 text-white'
            }`}
          >
            {adding ? 'Syncing API Streams...' : 'Add to Cart Matrix'}
          </button>
          
          {statusMessage && (
            <p className={`text-[11px] font-black text-center ${statusMessage.includes('successfully') || statusMessage.includes('Local') ? 'text-green-600' : 'text-amber-500'}`}>
              {statusMessage}
            </p>
          )}
        </div>
      </div>

    </div>
  )
}

export default ProductDetail