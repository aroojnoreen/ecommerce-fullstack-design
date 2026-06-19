import React, { useState, useEffect } from 'react'

function AdminPanel({ setPage }) {
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({ id: null, name: '', price: '', category: '', description: '', image: '📦' })
  const [isEditing, setIsEditing] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')

  const fetchInventory = () => {
    fetch('https://ecommerce-fullstack-design-tv00.onrender.com/api/products?recommended=true')
      .then(res => res.json())
      .then(recs => {
        fetch('https://ecommerce-fullstack-design-tv00.onrender.com/api/products')
          .then(res => res.json())
          .then(normals => {
            const combined = [...recs, ...normals]
            const uniqueMap = {}
            combined.forEach(item => { uniqueMap[item.id] = item })
            setProducts(Object.values(uniqueMap))
          })
      })
      .catch(err => console.error("Error fetching inventory:", err))
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = isEditing 
      ? `https://ecommerce-fullstack-design-tv00.onrender.com/api/admin/products/${formData.id}`
      : 'https://ecommerce-fullstack-design-tv00.onrender.com/api/admin/products'
    const method = isEditing ? 'PUT' : 'POST'

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatusMsg(isEditing ? '✅ Product updated successfully!' : '✅ New product launched live!')
          setFormData({ id: null, name: '', price: '', category: '', description: '', image: '📦' })
          setIsEditing(false)
          fetchInventory()
          setTimeout(() => setStatusMsg(''), 2500)
        }
      })
  }

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to permanently strip this product from the database catalog?")) return
    fetch(`https://ecommerce-fullstack-design-tv00.onrender.com/api/admin/products/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatusMsg('🗑️ Product pulled from live store inventory records.')
          fetchInventory()
          setTimeout(() => setStatusMsg(''), 2500)
        }
      })
  }

  const handleEditSelect = (p) => {
    setFormData({ id: p.id, name: p.name, price: p.price, category: p.category, description: p.description || '', image: p.image })
    setIsEditing(true)
  }

  return (
    <div className="space-y-6 text-left antialiased animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Admin Control Panel</h2>
          <p className="text-xs text-gray-400 font-semibold">Protected Storefront Inventory Management</p>
        </div>
        <button onClick={() => setPage('home')} className="bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded-lg text-xs hover:bg-gray-200 shadow-sm">
          Back to Mall Home
        </button>
      </div>

      {statusMsg && <p className="p-3 bg-blue-50 text-blue-700 font-bold text-xs rounded-lg animate-pulse shadow-sm">{statusMsg}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <form onSubmit={handleSubmit} className="bg-white border border-[#DEE2E7] rounded-xl p-5 space-y-4 shadow-sm text-xs font-semibold">
          <h3 className="text-sm font-black text-gray-900 border-b pb-2">{isEditing ? "Modify Specifications" : "Launch New Product"}</h3>
          <div>
            <label className="block text-gray-600 mb-1">Product Title</label>
            <input type="text" required placeholder="e.g. Pro Leather Shoes" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded p-2.5 font-normal text-gray-800 focus:outline-none focus:border-[#0D6EFD]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-600 mb-1">Price String</label>
              <input type="text" required placeholder="e.g. $45.00" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border rounded p-2.5 font-normal text-gray-800 focus:outline-none focus:border-[#0D6EFD]" />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Category</label>
              <input type="text" required placeholder="e.g. Sports" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border rounded p-2.5 font-normal text-gray-800 focus:outline-none focus:border-[#0D6EFD]" />
            </div>
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Emoji Icon Graphic</label>
            <input type="text" placeholder="e.g. 👟" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full border rounded p-2.5 font-normal text-gray-800 focus:outline-none focus:border-[#0D6EFD]" />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Description</label>
            <textarea rows="3" placeholder="Enter product description specifications..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded p-2.5 font-normal text-gray-800 focus:outline-none focus:border-[#0D6EFD]"></textarea>
          </div>
          <button type="submit" className="w-full bg-[#0D6EFD] text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition tracking-wide shadow-sm">
            {isEditing ? "Save Parameters" : "Deploy Item Live"}
          </button>
          {isEditing && (
            <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, name: '', price: '', category: '', description: '', image: '📦' }); }} className="w-full text-center text-gray-500 font-bold hover:underline pt-1">
              Cancel
            </button>
          )}
        </form>

        <div className="lg:col-span-2 space-y-3 max-h-[520px] overflow-y-auto pr-1">
          <h3 className="text-sm font-black text-gray-900 pl-1">Live Database Inventory</h3>
          {products.map(p => (
            <div key={p.id} className="bg-white border border-[#DEE2E7] rounded-xl p-3.5 flex justify-between items-center text-xs gap-4 shadow-sm hover:border-gray-300 transition">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl select-none bg-gray-50 h-11 w-11 border border-gray-100 rounded-lg flex items-center justify-center shrink-0 shadow-inner">{p.image}</span>
                <div className="min-w-0 text-left">
                  <h4 className="font-bold text-gray-900 truncate max-w-sm md:max-w-md">{p.name}</h4>
                  <p className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider mt-0.5">{p.category} · <span className="text-gray-800 font-black">{p.price}</span></p>
                </div>
              </div>
              <div className="flex items-center space-x-4 shrink-0">
                <button onClick={() => handleEditSelect(p)} className="text-[#0D6EFD] font-black hover:underline">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-500 font-black hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel