import React, { useState } from 'react'

function AdminPanel() {
  const [formData, setFormData] = useState({
    name: '', price: '', image: '📦', description: '', category: 'Consumer electronics', stock: 10
  })
  const [statusMsg, setStatusMsg] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatusMsg('Saving administrative product record...')
    
    fetch('https://ecommerce-fullstack-design-tv00.onrender.com/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.id || data.success) {
          setStatusMsg('✨ Item pushed live to database successfully!')
          setFormData({ name: '', price: '', image: '📦', description: '', category: 'Consumer electronics', stock: 10 })
        } else {
          setStatusMsg('Error injecting entry line matrix profiles.')
        }
      })
      .catch(() => setStatusMsg('Database payload push failure.'))
  }

  return (
    <div className="max-w-xl mx-auto bg-white border border-[#DEE2E7] rounded-xl p-6 text-left antialiased my-6 shadow-sm">
      <h2 className="text-xl font-black text-gray-900 mb-2">⚙️ Production Catalog Administration Panel</h2>
      <p className="text-xs text-gray-400 font-semibold mb-6">Create and register dynamic backend product collection items</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-gray-700">
        <div>
          <label className="block mb-1">Product Title Name:</label>
          <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border p-2.5 rounded-lg focus:outline-none font-medium" placeholder="e.g., Wireless Gaming Keyboard" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Price String Value:</label>
            <input type="text" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border p-2.5 rounded-lg focus:outline-none font-medium" placeholder="e.g., $49.99" />
          </div>
          <div>
            <label className="block mb-1">Emoji Icon Representation:</label>
            <input type="text" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full border p-2.5 rounded-lg text-center text-lg focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="block mb-1">Core Structural Category Line:</label>
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border p-2.5 rounded-lg bg-white focus:outline-none">
            <option value="Consumer electronics">Consumer electronics</option>
            <option value="Home and outdoor">Home and outdoor</option>
            <option value="Apparel">Apparel</option>
            <option value="Sports & Entertainment">Sports & Entertainment</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Specification Profile Details Description:</label>
          <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border p-2.5 rounded-lg focus:outline-none font-medium text-gray-600" placeholder="Enter wholesale manufacturing item properties..." />
        </div>
        <button type="submit" className="w-full bg-purple-600 text-white font-black py-3 rounded-lg hover:bg-purple-700 transition shadow-sm tracking-wide">
          Push Product Record to Database
        </button>
        {statusMsg && <p className="text-center bg-gray-50 p-2 border rounded font-bold text-gray-600 mt-2">{statusMsg}</p>}
      </form>
    </div>
  )
}

export default AdminPanel