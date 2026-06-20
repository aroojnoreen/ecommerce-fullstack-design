import React, { useState, useEffect } from 'react'

function Cart({ setPage, refreshCartCount }) {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  // 1. Read directly from persistent memory on load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCartItems(savedCart)
    setLoading(false)
  }, [])

  // 2. BULLETPROOF REMOVAL LOGIC (Wipes the ghost items permanently)
  const handleRemoveItem = (idToDelete) => {
    // Filter out the item from current active state view
    const updatedCart = cartItems.filter(item => item.id !== idToDelete)
    setCartItems(updatedCart)

    // FORCE rewrite browser storage so it doesn't reappear on refresh
    localStorage.setItem('cart', JSON.stringify(updatedCart))

    // Sync network state up to your backend API cluster
    fetch(`https://ecommerce-fullstack-design-tv00.onrender.com/api/cart/${idToDelete}`, {
      method: 'DELETE'
    })
    .catch((err) => console.warn("API sync dropped, local device cleared safely:", err))

    // Instantly notify Navbar to update the red circle count digit badge
    if (typeof refreshCartCount === 'function') {
      refreshCartCount()
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const itemPrice = typeof item.price === 'string' 
        ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
        : (item.price || 0)
      return acc + (itemPrice * (item.quantity || 1))
    }, 0).toFixed(2)
  }

  if (loading) {
    return <div className="text-center py-12 text-xs font-bold text-gray-400">Syncing procurement registry...</div>
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-left antialiased animate-fade-in">
      <div>
        <h2 className="text-xl font-black text-gray-900 tracking-tight">Your Shopping Cart</h2>
        <p className="text-xs text-gray-400 font-semibold mt-0.5">Manage your active wholesale logistics orders</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white border border-[#DEE2E7] rounded-xl p-16 text-center shadow-sm">
          <span className="text-5xl select-none block mb-3">🛒</span>
          <p className="text-gray-400 font-bold text-xs">Your procurement manifest is currently empty.</p>
          <button onClick={() => setPage('home')} className="mt-4 bg-[#0D6EFD] hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition shadow-sm">
            Explore Products Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT: LIST OF ITEMS */}
          <div className="lg:col-span-2 bg-white border border-[#DEE2E7] rounded-xl p-5 shadow-sm divide-y divide-gray-100">
            {cartItems.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-50 border border-gray-100 w-16 h-16 rounded-lg flex items-center justify-center text-3xl select-none shrink-0">
                    {item.image || '📦'}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Qty: {item.quantity || 1}</p>
                  </div>
                </div>
                
                <div className="text-right space-y-1 shrink-0">
                  <p className="font-black text-xs text-gray-900">
                    {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price}
                  </p>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-[#EB5757] font-black text-[10px] uppercase tracking-wider block ml-auto hover:underline"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-1 bg-white border border-[#DEE2E7] rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider">Manifest Valuation</h3>
            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
              <span className="text-xs text-gray-500 font-bold">Total Aggregate Price:</span>
              <span className="text-base font-black text-[#0D6EFD]">${calculateTotal()}</span>
            </div>
            <button className="w-full bg-[#22C55E] hover:bg-green-600 text-white font-bold py-2.5 rounded-lg text-xs transition shadow-sm tracking-wide">
              Proceed to Secure Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  )
}

export default Cart