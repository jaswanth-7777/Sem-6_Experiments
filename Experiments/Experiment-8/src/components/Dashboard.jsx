import { useEffect, useState } from 'react'
import axios from 'axios'
import './Dashboard.css'

function Dashboard({ onLogout }) {
  const [data, setData] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    const user = sessionStorage.getItem('user')
    if (user) {
      setUsername(user)
    }
  }, [])

  const fetchProtectedData = async () => {
    setError('')
    setLoading(true)
    setData('')

    try {
      const res = await axios.get('http://localhost:5000/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      setData(res.data.message || JSON.stringify(res.data))
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch protected data')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    onLogout()
  }

  return (
    <div className="dashboard-container">
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Dashboard</span>
          <div className="text-white">
            <span className="me-3">Welcome, <strong>{username}</strong></span>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content container mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">Protected API Endpoint</h5>
              </div>
              <div className="card-body">
                <p className="text-muted mb-3">
                  Click the button below to fetch data from the protected endpoint.
                  This requires a valid JWT token.
                </p>

                <button
                  className="btn btn-success btn-lg"
                  onClick={fetchProtectedData}
                  disabled={loading}
                >
                  {loading ? 'Fetching...' : 'Fetch Protected Data'}
                </button>

                {error && (
                  <div className="alert alert-danger mt-3 alert-dismissible fade show">
                    <strong>Error:</strong> {error}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setError('')}
                    ></button>
                  </div>
                )}

                {data && (
                  <div className="alert alert-success mt-3">
                    <strong>Response:</strong>
                    <pre className="mb-0 mt-2">
                      <code>{data}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">Session Information</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <small className="text-muted">Username</small>
                  <p className="mb-0"><strong>{username}</strong></p>
                </div>
                <div className="mb-3">
                  <small className="text-muted">JWT Token</small>
                  <p className="mb-0">
                    <code className="text-truncate d-block" title={token}>
                      {token?.substring(0, 20)}...
                    </code>
                  </p>
                </div>
                <div className="mb-3">
                  <small className="text-muted">Storage Location</small>
                  <p className="mb-0"><strong>sessionStorage</strong></p>
                </div>
                <hr />
                <small className="text-muted">
                  📝 Open browser DevTools (F12) → Application → Session Storage to view token details
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
