import React from 'react';
import Toggle from '../Toggle/Toggle';
// import './Navbar.css';
import './SecondNavbar.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Logo from '../../img/Logo.png';

const SecondNavbar = () => {
  return (
    <div className="n-wrapper">
      <div className="n-left">
        <div className="n-name"><img src={Logo} alt='1.png'/></div>
        <Toggle />
      </div>
      <div className="nav-right">
        <div className="nav-list">
          <ul style={{ listStyleType: 'none' }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/predict_video_charModel">Video Detection</Link></li>
            {/* Add other links as needed */}
          </ul>
        </div>
        <Link to="/contact"> {/* Use Link to navigate to the Contact page */}
          <button className="button n-button">Contact</button>
        </Link>
      </div>
    </div>
  );
};

export default SecondNavbar;
