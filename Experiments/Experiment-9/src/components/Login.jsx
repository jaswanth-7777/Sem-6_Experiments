import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Card, CardContent, Typography, Alert } from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    setError('');
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/api/user/profile', {
        auth: { username, password },
      });

      if (res.status === 200) {
        const role = username.toLowerCase().includes('admin') ? 'ADMIN' : 'USER';
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);
        sessionStorage.setItem('role', role);

        if (role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      }
    } catch (err) {
      setError('Authentication failed. Check credentials and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container login-page">
      <Card className="card-form">
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            RBAC Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={login}
            disabled={loading}
            className="mt-3"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <Typography variant="body2" className="hint-text" component="p">
            Use <strong>admin</strong> in the username for ADMIN role, otherwise USER role.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
