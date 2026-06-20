import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/home'
import ProductListing from './pages/ProductListing'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import AdminPanel from './pages/AdminPanel'
import AuthModal from './components/AuthModal'

function App() {
  const [page, setPage] = useState('home')
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [showAuth, setShowAuth] = useState(false)

  const handleCategorySelect = (category) => {
    // Standardize category tracking matches for backend collections
    let cleanCategory = category
    if (category.toLowerCase().includes('apparel') || category.toLowerCase().includes('clothes')) {
      cleanCategory = 'Apparel'
    } else if (category.toLowerCase().includes('home') || category.toLowerCase().includes('outdoor')) {
      cleanCategory = 'Home and outdoor'
    } else if (category.toLowerCase().includes('electronic') || category.toLowerCase().includes('tech')) {
      cleanCategory = 'Consumer electronics'
    }

    setCategoryFilter(cleanCategory)
    setSearchQuery('') 
    setPage('products') // Force route explicitly to product catalog grid view
  }

  const handleSearchSubmit = (query) => {
    setSearchQuery(query)
    setCategoryFilter('') 
    setPage('products') // Force route explicitly to product catalog grid view
  }

  const handleLoginSuccess = (user) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setPage('home')
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans antialiased flex flex-col justify-between">
      <Navbar 
        setPage={setPage} 
        currentPage={page}
        onCategorySelect={handleCategorySelect}
        onSignInClick={() => setShowAuth(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onSearchSubmit={handleSearchSubmit}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {page === 'home' && (
          <Home setPage={setPage} setSelectedProductId={setSelectedProductId} onCategorySelect={handleCategorySelect} />
        )}
        {page === 'products' && (
          <ProductListing 
            setPage={setPage} 
            setSelectedProductId={setSelectedProductId} 
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            searchQuery={searchQuery}
          />
        )}
        {page === 'detail' && (
          <ProductDetail setPage={setPage} productId={selectedProductId} refreshCartCount={() => {}} />
        )}
        {page === 'cart' && (
          <Cart setPage={setPage} refreshCartCount={() => {}} />
        )}
        {page === 'admin' && currentUser === 'admin' && (
          <AdminPanel />
        )}
      </main>

      <footer className="bg-white border-t border-[#DEE2E7] py-6 text-center text-xs text-gray-400 font-semibold w-full">
        © 2026 MALL Wholesale Procurement Networks. All structural rights reserved.
      </footer>

      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  )
}

export default App