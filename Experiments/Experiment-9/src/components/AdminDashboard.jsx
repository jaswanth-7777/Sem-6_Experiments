import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Alert } from '@mui/material';

function AdminDashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const role = sessionStorage.getItem('role');
  const username = sessionStorage.getItem('username');
  const password = sessionStorage.getItem('password');

  if (role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const fetchAdmin = async () => {
    setError('');
    setMessage('');
    try {
      const res = await axios.get('http://localhost:8080/api/admin/dashboard', {
        auth: { username, password },
      });
      setMessage(res.data.message || 'Admin endpoint accessed successfully.');
    } catch (err) {
      setError('Failed to fetch admin data. Check your access rights.');
      console.error(err);
    }
  };

  const fetchUserProfile = async () => {
    setError('');
    setMessage('');
    try {
      const res = await axios.get('http://localhost:8080/api/user/profile', {
        auth: { username, password },
      });
      setMessage(res.data.message || 'User endpoint accessed successfully.');
    } catch (err) {
      setError('Failed to fetch user profile.');
      console.error(err);
    }
  };

  return (
    <div className="page-container dashboard-page">
      <Card className="dashboard-card">
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Welcome, {username} ({role})
          </Typography>
          <Button variant="contained" color="error" onClick={fetchAdmin} className="me-2">
            Get Admin Data
          </Button>
          <Button variant="contained" color="success" onClick={fetchUserProfile}>
            Get User Profile
          </Button>
          <Button variant="outlined" color="error" onClick={logout} className="mt-3">
            Logout
          </Button>

          {message && <Alert severity="success" className="mt-3">{message}</Alert>}
          {error && <Alert severity="error" className="mt-3">{error}</Alert>}
          <Typography variant="body2" className="mt-3">
            ADMIN users have full access and can call user and admin endpoints from this UI.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
