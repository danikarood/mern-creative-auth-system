import React, { useState } from 'react';
import EmojiGrid from '../components/EmojiGrid';
import '../App.css';

export default function Login({ onToggleForm, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emojiPattern, setEmojiPattern] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (emojiPattern.length === 0) {
      setError("Please input your matrix identity pattern sequence.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3005/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, emojiPattern })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Login failed");
      } else {
        setMessage(data.message);
        localStorage.setItem("token", data.token);
        onLoginSuccess();
      }
    } catch (err) {
      setError("Server connection check validation failed.");
    }
  };

  return (
    <div className="auth-card-container">
      <h2>Welcome Back</h2>
      <p className="auth-subtitle">Provide security credentials for matrix entry</p>

      {message && <div className="auth-message-success">{message}</div>}
      {error && <div className="auth-message-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="auth-form-group">
          <label>Email Address</label>
          <input type="email" className="auth-form-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
        </div>

        <div className="auth-form-group">
          <label>Password</label>
          <div className="password-input-wrapper">
            <input type={showPassword ? "text" : "password"} className="auth-form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            <button type="button" className="password-toggle-visibility-btn" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
              {showPassword ? (
                <svg fill="currentColor" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/><path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/></svg>
              ) : (
                <svg fill="currentColor" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg>
              )}
            </button>
          </div>
        </div>

        <h3 className="security-section-title">Verify Pattern Sequence</h3>
        <div className="pattern-preview-bar">
          {emojiPattern.length === 0 ? (
            <span className="preview-placeholder">Tap emojis to reconstruct pattern...</span>
          ) : (
            emojiPattern.map((emo, idx) => (
              <span key={idx} className="preview-bubble">{emo}</span>
            ))
          )}
        </div>

        <EmojiGrid selectedPattern={emojiPattern} setSelectedPattern={setEmojiPattern} />

        <button type="submit" className="auth-submit-btn">Verify and Login</button>

        <div className="auth-switch-footer">
          Don't have an account yet?
          <button type="button" onClick={onToggleForm} className="auth-switch-link-btn">Sign Up</button>
        </div>
      </form>
    </div>
  );
}