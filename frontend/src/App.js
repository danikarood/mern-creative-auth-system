import React, { useState, useEffect } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="App">
      <main>
        {isAuthenticated ? (
          <Dashboard />
        ) : showLogin ? (
          <Login 
            onToggleForm={() => setShowLogin(false)} 
            onLoginSuccess={() => setIsAuthenticated(true)} 
          />
        ) : (
          <Register onToggleForm={() => setShowLogin(true)} />
        )}
      </main>
    </div>
  );
}

export default App;