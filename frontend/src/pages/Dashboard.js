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
    <div className="auth-card-container dashboard-center">
      <h2>Secure Workspace</h2>
      {error ? (
        <div className="auth-message-error">{error}</div>
      ) : (
        <div>
          <p className="dashboard-welcome">
            Welcome back, <strong>{username}</strong>! You have successfully verified your identity using your security emotion pattern.
          </p>
          <button onClick={handleLogout} className="auth-submit-btn logout-btn-color">
            Log Out Securely
          </button>
        </div>
      )}
    </div>
  );
}