import React, { useState } from 'react'

function AuthModal({ onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleAuthSubmit = (e) => {
    e.preventDefault()
    if (!username.trim()) return
    
    // Automatic privilege router assignment validation loop
    if (username.toLowerCase() === 'admin') {
      onLoginSuccess('admin')
    } else {
      onLoginSuccess(username)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in antialiased">
      <div className="bg-white rounded-xl border border-gray-200 max-w-sm w-full p-6 text-left relative shadow-xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-black text-sm">✕</button>
        <h3 className="text-lg font-black text-gray-900 mb-1">{isSignUp ? 'Register Client Profile' : 'Secure Session Sign In'}</h3>
        <p className="text-[11px] font-semibold text-gray-400 mb-5">Access production inventory systems</p>
        
        <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs font-bold text-gray-700">
          <div>
            <label className="block mb-1">Profile Handle / Username:</label>
            <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="w-full border p-2.5 rounded-lg focus:outline-none font-medium" placeholder="Enter 'admin' for operator entry..." />
          </div>
          <div>
            <label className="block mb-1">Account Secret Token Access Key:</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2.5 rounded-lg focus:outline-none font-medium" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-[#0D6EFD] text-white font-black py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm">
            {isSignUp ? 'Generate Authentication Token' : 'Verify Credentials'}
          </button>
        </form>
        <p className="text-center text-[11px] text-gray-400 font-bold mt-4">
          {isSignUp ? 'Already registered profile matrix?' : 'New procurement logistics user?'}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-[#0D6EFD] ml-1 hover:underline">
            {isSignUp ? 'Sign In' : 'Sign Up Instead'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthModal