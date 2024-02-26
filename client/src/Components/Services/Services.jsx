import React from 'react';
import './Services.css';
// import HeartEmoji from '../../img/heartemoji.png';
import HeartEmoji from '../../img/accutate.png';
import Glasses from '../../img/versatile.png';
// import Glasses from '../../img/glasses.png';
import Humble from '../../img/fast.png';
// import Humble from '../../img/humble.png';
import Card from '../Card/Card';
import Resume from './resume.pdf';
import { themeContext } from '../../Context';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services = () => {
  const transition = { duration: 1, type: 'spring' };

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className="services" id="Services">
      {/* left side */}
      <div className="awesome">
        <span style={{ color: darkMode ? 'white' : '' }}>Awesome</span>
        <span>Features</span>
        <spane>
          <ul>
            <li>Finds Nepali number plates fast and easy</li>
            <li>
              Reads the numbers and letters on the plate, just like magic!
            </li>
            <li>Works in real-time, so you see results instantly.</li>
          </ul>
        </spane>
        <Link to="/predict_video_charModel">
          <button className="button s-button">Detect Number Plates In Video</button>
        </Link>
        <div className="blur s-blur1" style={{ background: '#ABF1FF94' }}></div>
      </div>

      {/* right side */}
      <div className="cards">
        {/* first card */}
        <motion.div
          initial={{ left: '25rem' }}
          whileInView={{ left: '14rem' }}
          transition={transition}
        >
          <Card
            emoji={HeartEmoji}
            heading={'ACCURATE'}
            detail={`Can't read a blurry number plates? This system helps!`}
          />
        </motion.div>
        {/* Second Card */}
        <motion.div
          initial={{ left: '-11rem', top: '12rem' }}
          whileInView={{ left: '-4rem' }}
          transition={transition}
        >
          <Card
            emoji={Glasses}
            heading={'Versatile'}
            detail={'Use it for traffic monitoring, parking systems, and more!'}
          />
        </motion.div>

        {/* Third Card */}
        <motion.div
          initial={{ top: '19rem', left: '25rem' }}
          whileInView={{ left: '12rem' }}
          transition={transition}
        >
          <Card
            emoji={Humble}
            heading={'Fast & Smart'}
            detail={'Get results in a blink, perfect for busy situations.Uses the latest AI tech for top-notch performance.'}
          />
        </motion.div>
        <div
          className="blur s-blur2"
          style={{ background: 'var(--purple)' }}
        ></div>
      </div>
    </div>
  );
};

export default Services;
