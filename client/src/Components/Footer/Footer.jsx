import React from 'react';
import './Footer.css';
import profilePic1 from '../../img/1.png';
import profilePic2 from '../../img/profile1.jpg';
import profilePic3 from '../../img/profile2.jpg';
import profilePic4 from '../../img/profile4.jpg';

function Footer() {
  return (
    <footer className="footer-container">
    <div className='info'>
    <div className="developer-info">
        <h3>Developed by</h3>
        <ul>
          <li><div className='each-info'><img className='pp' src={profilePic1} alt="" /> <span>Rajeev Yadav</span></div></li>
          <li><div className='each-info'><img className='pp' src={profilePic2} alt="" /> <span>Rajkishor Yadav</span></div></li>
          <li><div className='each-info'><img className='pp' src={profilePic3} alt="" /> <span>Sanjit Baruwal</span></div></li>
          <li><div className='each-info'><img  className='pp' src={profilePic4} alt="" /> <span>Rupesh Lamichhane</span></div></li>
        </ul>
      </div>
      <div className="contact-info">
        <h3>Contact us</h3>
        <ul>
          <li>Email: 076bct062@ioepc.edu.np</li>
          <li>Phone: +9779845861550</li>
          <li>Address: Dharan,Nepal</li>
        </ul>
      </div>
    </div>
      
      <p className="company-info">&copy; {new Date().getFullYear()} IOE, TU, Purwanchal Engineering Campus,Dharan</p>
    </footer>
  );
}

export default Footer;
