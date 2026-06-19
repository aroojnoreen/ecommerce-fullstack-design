import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductListing from './pages/ProductListing'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import AdminPanel from './pages/AdminPanel'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState('')
  const [cartCount, setCartCount] = useState(0)
  
  // Auth state variables
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [authForm, setAuthForm] = useState({ username: '', password: '' })
  const [authError, setAuthError] = useState('')
  const [authSuccess, setAuthSuccess] = useState('')

  const refreshCartCount = () => {
    fetch('http://127.0.0.1:5000/api/cart')
      .then((res) => res.json())
      .then((data) => {
        const totalItems = data.reduce((sum, item) => sum + item.quantity, 0)
        setCartCount(totalItems)
      })
      .catch((err) => console.error("Error refreshing cart count:", err))
  }

  useEffect(() => {
    refreshCartCount()
  }, [])

  const handleNavigateToCategory = (categoryName) => {
    setCurrentCategoryFilter(categoryName)
    setCurrentPage('products')
  }

  const handleAuthSubmit = (e) => {
    e.preventDefault()
    setAuthError('')
    setAuthSuccess('')
    
    const endpoint = isRegisterMode ? 'register' : 'login'
    
    fetch(`http://127.0.0.1:5000/api/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: authForm.username, password: authForm.password })
    })
      .then(res => res.json().then(data => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (status >= 400) {
          setAuthError(data.error || "Authentication failed")
        } else {
          if (isRegisterMode) {
            setAuthSuccess("✨ Registration complete! Turning on login window...")
            setTimeout(() => {
              setIsRegisterMode(false)
              setAuthSuccess('')
            }, 1500)
          } else {
            setCurrentUser(data.username)
            setAuthSuccess(`👋 Welcome back, ${data.username}!`)
            setTimeout(() => {
              setIsAuthModalOpen(false)
              setAuthForm({ username: '', password: '' })
              setAuthSuccess('')
            }, 1200)
          }
        }
      })
      .catch((err) => {
        print("Auth submit connection failure details:", err)
        setAuthError("Cannot connect to authorization database server.")
      })
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col antialiased relative">
      
      <Navbar 
        setPage={setCurrentPage} 
        currentPage={currentPage} 
        cartCount={cartCount} 
        onCategorySelect={handleNavigateToCategory}
        onSignInClick={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* ADMIN FLOATING ACCESS STRIP CONTROLLER */}
      {currentUser === 'admin' && (
        <div className="bg-red-600 text-white px-4 py-2 flex justify-between items-center text-xs font-bold shadow-md">
          <span>🛡️ Signed in under administrative master privileges module.</span>
          <button 
            onClick={() => setCurrentPage(currentPage === 'admin' ? 'home' : 'admin')} 
            className="bg-white text-red-600 font-black px-3 py-1 rounded border border-transparent hover:bg-gray-100 transition"
          >
            {currentPage === 'admin' ? "Exit Admin Panel" : "Open Control Panel Dashboard"}
          </button>
        </div>
      )}

      {/* CORE APPLICATION MOUNT CONTAINER ENGINE */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {currentPage === 'home' && (
          <Home 
            setPage={setCurrentPage} 
            setSelectedProductId={setSelectedProductId} 
            onCategorySelect={handleNavigateToCategory}
          />
        )}
        {currentPage === 'products' && (
          <ProductListing 
            setPage={setCurrentPage} 
            setSelectedProductId={setSelectedProductId} 
            categoryFilter={currentCategoryFilter}
            setCategoryFilter={setCurrentCategoryFilter}
          />
        )}
        {currentPage === 'detail' && (
          <ProductDetail setPage={setCurrentPage} productId={selectedProductId} refreshCartCount={refreshCartCount} />
        )}
        {currentPage === 'cart' && (
          <Cart setPage={setCurrentPage} refreshCartCount={refreshCartCount} />
        )}
        {currentPage === 'admin' && (
          <AdminPanel setPage={setCurrentPage} />
        )}

        {/* === GLOBAL EXTRA SERVICES SECTION (PERMANENTLY VISIBLE) === */}
        <div className="space-y-5 pt-8 border-t border-gray-200/60 text-left">
          <h3 className="text-xl font-black text-gray-900 tracking-tight">Our extra services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white border border-[#DEE2E7] rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="bg-gray-900 h-28 relative flex items-center justify-center text-4xl select-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent z-10"></div>
                🏭
              </div>
              <div className="p-4 relative text-left">
                <div className="absolute top-[-20px] right-4 bg-[#0D6EFD] text-white h-10 w-10 rounded-full flex items-center justify-center border-4 border-white shadow-md text-sm font-bold">🔍</div>
                <h4 className="font-bold text-gray-900 text-sm mb-1 mt-1">Source from Industries</h4>
                <p className="text-gray-400 text-[11px] font-medium leading-relaxed">Connect directly with certified warehouse manufacturing hubs worldwide.</p>
              </div>
            </div>

            <div className="bg-white border border-[#DEE2E7] rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="bg-gray-900 h-28 relative flex items-center justify-center text-4xl select-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-transparent z-10"></div>
                📦
              </div>
              <div className="p-4 relative text-left">
                <div className="absolute top-[-20px] right-4 bg-[#0D6EFD] text-white h-10 w-10 rounded-full flex items-center justify-center border-4 border-white shadow-md text-sm font-bold">🛡️</div>
                <h4 className="font-bold text-gray-900 text-sm mb-1 mt-1">Customized Inspection</h4>
                <p className="text-gray-400 text-[11px] font-medium leading-relaxed">Ensure dynamic packaging structural security filters before freight dispatch lines.</p>
              </div>
            </div>

            <div className="bg-white border border-[#DEE2E7] rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="bg-gray-900 h-28 relative flex items-center justify-center text-4xl select-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent z-10"></div>
                ✈️
              </div>
              <div className="p-4 relative text-left">
                <div className="absolute top-[-20px] right-4 bg-[#0D6EFD] text-white h-10 w-10 rounded-full flex items-center justify-center border-4 border-white shadow-md text-sm font-bold">🚀</div>
                <h4 className="font-bold text-gray-900 text-sm mb-1 mt-1">Fast Air & Ocean Freight</h4>
                <p className="text-gray-400 text-[11px] font-medium leading-relaxed">Integrated tracking metrics for global terminal customs logistics delivery.</p>
              </div>
            </div>

            <div className="bg-white border border-[#DEE2E7] rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="bg-gray-900 h-28 relative flex items-center justify-center text-4xl select-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent z-10"></div>
                🔒
              </div>
              <div className="p-4 relative text-left">
                <div className="absolute top-[-20px] right-4 bg-[#0D6EFD] text-white h-10 w-10 rounded-full flex items-center justify-center border-4 border-white shadow-md text-sm font-bold">💳</div>
                <h4 className="font-bold text-gray-900 text-sm mb-1 mt-1">Product Payment Security</h4>
                <p className="text-gray-400 text-[11px] font-medium leading-relaxed">Encrypted transaction gateway validation layers safeguarding escrow accounts.</p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative text-left">
            <button 
              onClick={() => { setIsAuthModalOpen(false); setAuthError(''); setAuthSuccess(''); }}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 font-bold text-lg"
            >
              ✕
            </button>
            
            <h3 className="text-xl font-black text-gray-900 mb-1">
              {isRegisterMode ? "Create Account" : "Sign In to MALL"}
            </h3>
            <p className="text-xs text-gray-400 font-medium mb-5">
              {isRegisterMode ? "Register to safely process secure checkouts." : "Access your active billing order summaries panels."}
            </p>

            <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-700 mb-1.5">Username string</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter username" 
                  value={authForm.username}
                  onChange={e => setAuthForm({ ...authForm, username: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-[#0D6EFD]"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1.5">Password hash line</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  value={authForm.password}
                  onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-[#0D6EFD]"
                />
              </div>

              {authError && <p className="text-red-600 text-[11px] font-bold bg-red-50 p-2 rounded">{authError}</p>}
              {authSuccess && <p className="text-green-600 text-[11px] font-bold bg-green-50 p-2 rounded">{authSuccess}</p>}

              <button type="submit" className="w-full bg-[#0D6EFD] text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition text-sm">
                {isRegisterMode ? "Register Account" : "Log In"}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-gray-100 text-center text-xs text-gray-500 font-medium">
              {isRegisterMode ? "Already have an account?" : "New to our platform suppliers store?"}{" "}
              <span 
                onClick={() => { setIsRegisterMode(!isRegisterMode); setAuthError(''); setAuthSuccess(''); }}
                className="text-[#0D6EFD] font-bold hover:underline cursor-pointer ml-1"
              >
                {isRegisterMode ? "Sign In instead" : "Create one now"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* === COMPREHENSIVE MULTI-COLUMN INTERACTIVE FOOTER MATRIX === */}
      <footer className="bg-white border-t border-[#DEE2E7] pt-12 pb-6 text-xs text-gray-500 font-medium text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-6 gap-8 pb-10 border-b border-gray-100">
          <div className="col-span-2 space-y-4">
            <div className="text-[#0D6EFD] font-black text-xl tracking-tight select-none">🛒 MALL</div>
            <p className="text-gray-400 font-semibold max-w-xs leading-relaxed">Best full-stack enterprise e-commerce infrastructure layout integrated natively with robust API streams.</p>
          </div>
          <div className="space-y-2.5">
            <h4 className="font-bold text-gray-900 text-sm">About</h4>
            <ul className="space-y-1.5 text-gray-400 font-semibold">
              <li className="hover:text-[#0D6EFD] cursor-pointer transition">About Us</li>
              <li className="hover:text-[#0D6EFD] cursor-pointer transition">Find Store</li>
              <li className="hover:text-[#0D6EFD] cursor-pointer transition">Categories</li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="font-bold text-gray-900 text-sm">Partnership</h4>
            <ul className="space-y-1.5 text-gray-400 font-semibold">
              <li className="hover:text-[#0D6EFD] cursor-pointer transition">About Us</li>
              <li className="hover:text-[#0D6EFD] cursor-pointer transition">Find Store</li>
              <li className="hover:text-[#0D6EFD] cursor-pointer transition">Categories</li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="font-bold text-gray-900 text-sm">Information</h4>
            <ul className="space-y-1.5 text-gray-400 font-semibold">
              <li className="hover:text-[#0D6EFD] cursor-pointer transition">Help Center</li>
              <li className="hover:text-[#0D6EFD] cursor-pointer transition">Money Refund</li>
              <li className="hover:text-[#0D6EFD] cursor-pointer transition">Shipping Info</li>
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="font-bold text-gray-900 text-sm">For Users</h4>
            <ul className="space-y-1.5 text-gray-400 font-semibold">
              <li className="hover:text-[#0D6EFD] cursor-pointer transition">Login User</li>
              <li className="hover:text-[#0D6EFD] cursor-pointer transition">Register Account</li>
              <li className="hover:text-[#0D6EFD] cursor-pointer transition">My Settings</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex justify-between items-center text-gray-400 font-semibold">
          <p>© 2026 Ecommerce MALL Inc. All structural modules active.</p>
        </div>
      </footer>

    </div>
  )
}

export default App