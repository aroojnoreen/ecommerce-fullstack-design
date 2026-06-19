import React, { useState, useEffect } from 'react'

function Cart({ setPage, refreshCartCount }) {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  const loadCartData = () => {
    fetch('http://127.0.0.1:5000/api/cart')
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching basket lists:", err)
        setLoading(false)
      })
  }

  useEffect(() => {
    loadCartData()
  }, [])

  const handleDeleteItem = (itemId) => {
    fetch(`http://127.0.0.1:5000/api/cart/${itemId}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          loadCartData()      // Update localized row list layout array matrix
          refreshCartCount()  // Sync global navbar counter item bubbles
        }
      })
  }

  // Helper method parsing raw monetary string lists to computer floats numbers
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const numericPrice = parseFloat(item.price.replace('$', '').replace(',', '')) || 0
      return sum + (numericPrice * item.quantity)
    }, 0).toFixed(2)
  }

  if (loading) {
    return <p className="text-left text-gray-500 text-sm p-8">Loading your active cart items...</p>
  }

  return (
    <div className="space-y-6 text-left antialiased">
      <h2 className="text-xl font-black text-gray-900">My Shopping Cart ({cartItems.length})</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Active items row elements */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white border border-[#DEE2E7] rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center"
            >
              <div className="bg-gray-50 h-20 w-20 rounded-lg flex items-center justify-center text-3xl select-none border border-gray-100 shrink-0">
                {item.image}
              </div>
              
              <div className="flex-grow text-sm space-y-1 w-full">
                <h4 className="font-bold text-gray-900">{item.name}</h4>
                <p className="text-gray-400 text-xs font-semibold">Quantity lines: {item.quantity}</p>
                <button 
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-xs font-bold text-red-500 hover:underline pt-1"
                >
                  Remove Item
                </button>
              </div>

              <div className="text-right shrink-0 font-black text-gray-900 text-base">
                {item.price}
              </div>
            </div>
          ))}

          {cartItems.length === 0 && (
            <div className="bg-white border border-[#DEE2E7] rounded-xl p-12 text-center text-gray-400 font-semibold shadow-sm">
              Your shopping cart is empty. Click "MALL" to look for products.
            </div>
          )}
        </div>

        {/* Right Side: Total payment pricing calculator layout block summary widget */}
        <div className="bg-white border border-[#DEE2E7] rounded-xl p-6 space-y-4 shadow-sm">
          <h3 className="font-black text-gray-900 text-base">Payment Summary</h3>
          <hr className="border-gray-100" />
          
          <div className="space-y-2 text-xs font-semibold text-gray-500">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="text-gray-800">${calculateTotal()}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Shipping Fee:</span>
              <span>FREE</span>
            </div>
          </div>
          
          <hr className="border-gray-100" />
          
          <div className="flex justify-between items-center font-black text-gray-900 text-base">
            <span>Total Payment:</span>
            <span className="text-[#0D6EFD]">${calculateTotal()}</span>
          </div>

          <button 
            disabled={cartItems.length === 0}
            className="w-full bg-[#0D6EFD] text-white font-bold py-2.5 rounded-lg text-xs hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm mt-2"
          >
            Proceed to Payment Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart