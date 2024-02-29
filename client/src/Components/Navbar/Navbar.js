import {React, useContext} from 'react';
import Toggle from '../Toggle/Toggle';
import { themeContext } from '../../Context';
import './Navbar.css';
import { Link } from 'react-scroll'; 
import Logo from '../../img/Logo.png';
const Navbar = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="n-wrapper" style={{ background: darkMode ? 'black' : '', boxShadow: darkMode?'0 0px 10px rgba(234, 249, 231, 0.5)':''}} >
      <div className="n-left">
        <div className="n-name"><img src={Logo} alt='1.png'/></div>
        <Toggle />
      </div>
      <div className="n-middle">
        <div className="n-list">
          <ul>
            <Link
              spy={true}
              to="Navbar"
              smooth={true}
              activeClass="activeClass"
            >
              <li style={{ cursor: 'pointer', color: '#788097' }} onMouseEnter={(e) => e.target.style.color = 'rgb(151, 16, 235)'} onMouseLeave={(e) => e.target.style.color = '#788097'} onClick={handleHomeClick}>Home</li>
            </Link>
            <Link spy={true} to="Services" smooth={true}>
              <li style={{ cursor: 'pointer', color: '#788097' }} onMouseEnter={(e) => e.target.style.color = 'rgb(151, 16, 235)'} onMouseLeave={(e) => e.target.style.color = '#788097'}>Features</li>
            </Link>
            <Link spy={true} to="Portfolio" smooth={true}>
              <li style={{ cursor: 'pointer', color: '#788097' }} onMouseEnter={(e) => e.target.style.color = 'rgb(151, 16, 235)'} onMouseLeave={(e) => e.target.style.color = '#788097'}>SomeOutputs</li>
            </Link>
            <Link spy={true} to="Testimonials" smooth={true}>
              <li style={{ cursor: 'pointer', color: '#788097' }} onMouseEnter={(e) => e.target.style.color = 'rgb(151, 16, 235)'} onMouseLeave={(e) => e.target.style.color = '#788097'}>Team</li>
            </Link>
          </ul>
        </div>
      </div>

        <div className='n-right'>

        <Link spy={true} to="Contact" smooth={true}>
          <button className="button n-button">Contact</button>
        </Link>
        </div>
    </div>
  );
};

export default Navbar;
