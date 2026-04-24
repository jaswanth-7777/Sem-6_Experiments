import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import UserDashboard from './components/UserDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import './App.css';

function App() {
  const role = sessionStorage.getItem('role');

  return (
    <Router>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/user"
            element={
              role === 'USER' || role === 'ADMIN' ? <UserDashboard /> : <Navigate to="/" />
            }
          />
          <Route path="/admin" element={role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
