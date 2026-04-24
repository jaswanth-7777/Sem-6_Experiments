import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Alert } from '@mui/material';

function UserDashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const role = sessionStorage.getItem('role');
  const username = sessionStorage.getItem('username');
  const password = sessionStorage.getItem('password');

  if (!role) {
    return <Navigate to="/" replace />;
  }

  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const fetchProfile = async () => {
    setError('');
    setMessage('');

    try {
      const res = await axios.get('http://localhost:8080/api/user/profile', {
        auth: { username, password },
      });
      setMessage(res.data.message || 'Profile endpoint accessed successfully.');
    } catch (err) {
      setError('Failed to fetch profile data. You may not have access.');
      console.error(err);
    }
  };

  return (
    <div className="page-container dashboard-page">
      <Card className="dashboard-card">
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            User Dashboard
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Hello, {username} ({role})
          </Typography>
          <Button variant="contained" color="success" onClick={fetchProfile} className="me-2">
            Get Profile
          </Button>
          {role === 'ADMIN' && (
            <Button variant="contained" color="secondary" onClick={() => navigate('/admin')}>
              Open Admin Dashboard
            </Button>
          )}
          <Button variant="outlined" color="error" onClick={logout} className="mt-3">
            Logout
          </Button>

          {message && <Alert severity="success" className="mt-3">{message}</Alert>}
          {error && <Alert severity="error" className="mt-3">{error}</Alert>}
          <Typography variant="body2" className="mt-3">
            Note: USER role can only access user endpoints. ADMIN role sees additional controls.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserDashboard;
