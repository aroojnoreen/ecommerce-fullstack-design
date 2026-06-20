import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar' // Double-checked secure relative path mapping

function AdminPanel() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Consumer electronics')
  const [image, setImage] = useState('📦')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('https://ecommerce-fullstack-design-tv00.onrender.com/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error loading inventory matrix:', err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !price) {
      setMessage('Please fill out all required operational parameters.')
      return
    }

    const newProduct = {
      name,
      price: parseFloat(price),
      category,
      image
    }

    fetch('https://ecommerce-fullstack-design-tv00.onrender.com/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage('Product added to database logs successfully!')
        setProducts([...products, data])
        setName('')
        setPrice('')
      })
      .catch((err) => {
        console.error('Submission pipeline drop:', err)
        setMessage('Failed to inject product entry.')
      })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left antialiased animate-fade-in">
      <div>
        <h2 className="text-xl font-black text-gray-900 tracking-tight">⚙️ Management Console</h2>
        <p className="text-xs text-gray-400 font-semibold mt-0.5">Control live node properties and manufacturing catalog injects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* INPUT PANEL CARD */}
        <form onSubmit={handleSubmit} className="md:col-span-1 bg-white border border-[#DEE2E7] rounded-xl p-5 space-y-4 shadow-sm h-fit">
          <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider">New Product Manifest</h3>
          
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500 uppercase">Item Title</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. High-Speed Modem" className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:outline-none focus:border-blue-500" />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500 uppercase">Wholesale Price (USD)</label>
            <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="19.00" className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:outline-none focus:border-blue-500" />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500 uppercase">Market Segment Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2 text-xs bg-white focus:outline-none focus:border-blue-500">
              <option value="Consumer electronics">Consumer electronics</option>
              <option value="Home and outdoor">Home and outdoor</option>
              <option value="Apparel">Apparel</option>
              <option value="Sports & Entertainment">Sports & Entertainment</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500 uppercase">Visual Graphic Icon Representation</label>
            <select value={image} onChange={(e) => setImage(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2 text-xs bg-white focus:outline-none focus:border-blue-500">
              <option value="📦">📦 Standard Box</option>
              <option value="💻">💻 Computer Laptop</option>
              <option value="📱">📱 Media Tablet</option>
              <option value="🪑">🪑 Soft Living Chair</option>
              <option value="👕">👕 Apparel Fabric Shirt</option>
              <option value="⚽">⚽ Sports Soccer Ball</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-[#0D6EFD] hover:bg-blue-700 text-white font-bold py-2 rounded-lg text-xs transition shadow-sm">
            Deploy Document Line
          </button>

          {message && (
            <p className={`text-[11px] font-bold text-center mt-2 ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </form>

        {/* CURRENT LIVE RECORDS LIST VIEW */}
        <div className="md:col-span-2 bg-white border border-[#DEE2E7] rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider">Live Active Registry ({products.length} Items)</h3>
          <div className="divide-y divide-gray-100 max-h-[420px] overflow-y-auto pr-2">
            {products.map((p, idx) => (
              <div key={p.id || idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-2xl select-none">{p.image || '📦'}</span>
                  <div>
                    <h4 className="font-bold text-gray-800 line-clamp-1">{p.name}</h4>
                    <span className="text-[10px] bg-gray-100 text-gray-400 font-bold px-1.5 py-0.2 rounded uppercase tracking-wide">{p.category}</span>
                  </div>
                </div>
                <p className="font-black text-gray-900">${typeof p.price === 'number' ? p.price.toFixed(2) : p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel