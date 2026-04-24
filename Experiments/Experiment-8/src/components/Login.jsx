import { useState } from 'react'
import axios from 'axios'
import './Login.css'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await axios.post('http://localhost:5000/login', {
        username,
        password
      })

      if (res.data.token) {
        sessionStorage.setItem('token', res.data.token)
        sessionStorage.setItem('user', username)
        onLogin()
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>JWT Authentication</h2>
          <p className="text-muted">Experiment-8 Frontend</p>
        </div>

        <form onSubmit={handleLogin}>
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError('')}
              ></button>
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-credentials mt-4 p-3 bg-light rounded">
          <small className="text-muted">
            <strong>Demo Credentials:</strong><br />
            Username: <code>user</code><br />
            Password: <code>pass123</code>
          </small>
        </div>
      </div>
    </div>
  )
}

export default Login
