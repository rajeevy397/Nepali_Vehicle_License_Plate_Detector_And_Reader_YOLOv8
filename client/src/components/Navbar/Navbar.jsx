import React from 'react';
import Toggle from '../Toggle/Toggle';
import './Navbar.css';
import { Link } from 'react-scroll'; 
import Logo from '../../img/Logo.png';
const Navbar = () => {
  return (
    <div className="n-wrapper">
      <div className="n-left">
        <div className="n-name"><img src={Logo} alt='1.png'/></div>
        <Toggle />
      </div>
      <div className="n-right">
        <div className="n-list">
          <ul style={{ listStyleType: 'none' }}>
            <Link
              spy={true}
              to="Navbar"
              smooth={true}
              activeClass="activeClass"
            >
              <li>Home</li>
            </Link>
            <Link spy={true} to="Services" smooth={true}>
              <li>Features</li>
            </Link>
            {/* <Link spy={true} to="Experience" smooth={true}>
              <li>Experience</li>
            </Link> */}
            <Link spy={true} to="Portfolio" smooth={true}>
              <li>SomeOutputs</li>
            </Link>
            <Link spy={true} to="Testimonials" smooth={true}>
              <li>Team</li>
            </Link>
          </ul>
        </div>
        <Link spy={true} to="Contact" smooth={true}>
          <button className="button n-button">Contact</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
