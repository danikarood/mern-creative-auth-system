import React, { useState } from 'react';
import EmojiGrid from '../components/EmojiGrid';
import '../App.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emojiPattern, setEmojiPattern] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (emojiPattern.length === 0) {
      setError("Please select your security emotion pattern.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          emojiPattern
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
      } else {
        setMessage(data.message);
        localStorage.setItem("token", data.token);
        setEmail("");
        setPassword("");
        setEmojiPattern([]);
      }
    } catch (err) {
      setError("Server connection error. Is your backend running?");
    }
  };

  return (
    <div className="auth-card-container">
      <h2>Account Login</h2>
      {message && <div className="auth-message-success">{message}</div>}
      {error && <div className="auth-message-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="auth-form-group">
          <label>Email</label>
          <input 
            type="email" 
            className="auth-form-input"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="auth-form-group">
          <label>Password</label>
          <input 
            type="password" 
            className="auth-form-input"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <EmojiGrid 
          selectedPattern={emojiPattern} 
          setSelectedPattern={setEmojiPattern} 
          isLogin={true} 
        />

        <button type="submit" className="auth-submit-btn">
          Sign In
        </button>
      </form>
    </div>
  );
}