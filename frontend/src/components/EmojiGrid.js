import React, { useState, useEffect } from 'react';
import '../App.css';

const EMOJI_POOL = [
  { char: "🚀", label: "Motivation" },
  { char: "🔥", label: "Passion" },
  { char: "💡", label: "Inspiration" },
  { char: "🌱", label: "Growth" },
  { char: "🎨", label: "Creativity" },
  { char: "🛡️", label: "Safety" },
  { char: "🌊", label: "Calm" },
  { char: "🌟", label: "Success" },
  { char: "🧩", label: "Logic" },
  { char: "🦉", label: "Wisdom" },
  { char: "🎸", label: "Rhythm" },
  { char: "🎭", label: "Drama" }
];

export default function EmojiGrid({ selectedPattern, setSelectedPattern, isLogin }) {
  const [shuffledPool, setShuffledPool] = useState([]);

  useEffect(() => {
    if (isLogin) {
      const shuffled = [...EMOJI_POOL].sort(() => Math.random() - 0.5);
      setShuffledPool(shuffled);
    } else {
      setShuffledPool(EMOJI_POOL);
    }
  }, [isLogin]);

  const handleEmojiClick = (emojiChar) => {
    if (selectedPattern.length < 6) {
      setSelectedPattern([...selectedPattern, emojiChar]);
    }
  };

  const clearPattern = () => {
    setSelectedPattern([]);
  };

  return (
    <div className="emoji-container">
      <label className="emoji-title-label">
        {isLogin ? "Enter your Security Emotion Pattern:" : "Create your Security Emotion Pattern:"}
      </label>

      <div className="emoji-layout-grid">
        {shuffledPool.map((emoji, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleEmojiClick(emoji.char)}
            className="emoji-grid-btn"
            aria-label={`${emoji.label} option`}
          >
            <span className="emoji-visual-char" aria-hidden="true">{emoji.char}</span>
            <span className="emoji-text-fallback">
              {emoji.label}
            </span>
          </button>
        ))}
      </div>

      <div className="emoji-action-row">
        <div className="emoji-preview-display">
          {selectedPattern.length === 0 ? (
            <span className="emoji-empty-placeholder">No emojis selected yet...</span>
          ) : (
            selectedPattern.map((char, index) => {
              const matched = EMOJI_POOL.find(e => e.char === char);
              return (
                <span 
                  key={index} 
                  title={matched ? matched.label : ""} 
                  className="emoji-preview-item"
                >
                  {char}
                </span>
              );
            })
          )}
        </div>
        
        <button
          type="button"
          onClick={clearPattern}
          className="emoji-clear-btn"
        >
          Clear
        </button>
      </div>
    </div>
  );
}