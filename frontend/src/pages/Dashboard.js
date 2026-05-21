import React, { useEffect, useState } from 'react';
import '../App.css';

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in first.");
      return;
    }

    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      
      if (decodedPayload.exp * 1000 < Date.now()) {
        setError("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        return;
      }

      setUsername(decodedPayload.username || "User");
    } catch (err) {
      setError("Invalid session token format.");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="auth-card-container dashboard-card" style={{ textAlign: 'center' }}>
      <div className="dashboard-icon-badge" style={{ fontSize: '3rem', marginBottom: '15px' }}>💎</div>
      <h2>Secure Area</h2>
      <p className="auth-subtitle">Creative Identity Verified</p>

      {error ? (
        <div className="auth-message-error">{error}</div>
      ) : (
        <div className="dashboard-content" style={{ marginTop: '20px' }}>
          <p style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '15px', fontWeight: '600' }}>
            Welcome, <span style={{ color: '#00dfd8', fontWeight: '800' }}>{username}</span>!
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px' }}>
            You have successfully bypassed encryption barriers using your multi-factor visual emotion pattern system.
          </p>
          
          <button 
            onClick={handleLogout} 
            className="auth-submit-btn" 
            style={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #fa5252 100%)', boxShadow: '0 8px 24px rgba(250, 82, 82, 0.2)' }}
          >
            Disconnect Session
          </button>
        </div>
      )}
    </div>
  );
}