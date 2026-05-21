import React from 'react';
import '../App.css';

const EMOJI_POOL = ["🌱", "🔥", "💡", "📈", "🎨", "🛡️", "🧘", "⭐", "🧩", "🧠", "🎵", "🎭"];

export default function EmojiGrid({ selectedPattern, setSelectedPattern }) {
  
  const handleEmojiClick = (emoji) => {
    if (selectedPattern.includes(emoji)) {
      setSelectedPattern(selectedPattern.filter(item => item !== emoji));
    } else {
      setSelectedPattern([...selectedPattern, emoji]);
    }
  };

  return (
    <div className="emoji-grid-section">
      <div className="emoji-grid-matrix">
        {EMOJI_POOL.map((emoji, index) => {
          const isSelected = selectedPattern.includes(emoji);
          return (
            <button
              key={index}
              type="button"
              className={`emoji-matrix-btn ${isSelected ? 'selected-active' : ''}`}
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </button>
          );
        })}
      </div>
      
      <div className="pattern-action-row">
        <button 
          type="button" 
          className="clear-pattern-btn" 
          onClick={() => setSelectedPattern([])}
        >
          Clear Selection
        </button>
      </div>
    </div>
  );
}