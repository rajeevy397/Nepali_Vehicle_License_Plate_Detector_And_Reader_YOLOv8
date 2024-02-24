import React, { useState, useEffect } from 'react';
import './Intro.css';

import { useContext } from 'react';
import { themeContext } from '../../Context';
import { Link } from 'react-router-dom';

function Intro() {

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [typedText, setTypedText] = useState('');
  const textToType = "Nepali Vehicle's Number Plate Detection System";

  useEffect(() => {
    const interval = setInterval(() => {
      if (typedText.length === textToType.length) {
        clearInterval(interval);
      } else {
        setTypedText((prevTypedText) => prevTypedText + textToType[typedText.length]);
      }
    }, 100); // Adjust typing speed here (milliseconds)

    return () => clearInterval(interval);
  }, [typedText, textToType]);

  return (
    <div className="intro"> 
      <div className="i-left">
        <div className="i-name">
          <span style={{ color: darkMode ? 'white' : '' }}>Hy! it's</span>
          <span>{typedText}</span>
          <span>Tired of squinting at blurry Vehicle's Number plates?</span>
          <span>
            This system, built with clever AI, automatically finds vehicles number
            plates in videos and photos, even when they're small, dark, or a bit
            wonky.
          </span>
        </div>

        <Link to="/predict_image_charModel">
          <button className="button i-button">Detect Number Plates In Image</button>
        </Link>
      </div>
    </div>
  );
}

export default Intro;
