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

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div className="App">
      <div className="app-nav-container">
        <button 
          onClick={() => setShowLogin(!showLogin)}
          className="app-toggle-btn"
        >
          {showLogin ? "Switch to Register Account" : "Switch to Account Login"}
        </button>
      </div>

      <main>
        {showLogin ? <Login /> : <Register />}
      </main>
    </div>
  );
}

export default App;