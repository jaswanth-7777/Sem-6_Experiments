import { useState, useEffect } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if token exists in sessionStorage
    const token = sessionStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
    setLoading(false)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  if (loading) {
    return <div className="container mt-5"><p>Loading...</p></div>
  }

  return (
    <>
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  )
}

export default App
