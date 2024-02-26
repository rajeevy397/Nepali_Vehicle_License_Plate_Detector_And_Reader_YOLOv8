// Footer.js
import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { BsWhatsapp } from 'react-icons/bs';

const Developer = ({ name, socialMediaLinks }) => {
  return (
    <div className="developers">
      <span className='developer1'>{name}</span>
      <div>
        <ul className="social_icons">
          {socialMediaLinks.map((link, index) => (
            <li key={index}>
              <a href={link.url}>
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Footer = () => {
  const developers = [
    {
      name: 'Rajeev Yadav',
      socialMediaLinks: [
        { url: 'https://www.facebook.com/iiam.rajeev', icon: <FaFacebook /> },
        { url: 'https://www.instagram.com/iiam.rajeev/?hl=en', icon: <FaInstagram /> },
        { url: '9845861550', icon: <BsWhatsapp /> }
      ]
    },
    {
      name: 'Rajkishor Yadav',
      socialMediaLinks: [
        { url: 'https://www.facebook.com/profile.php?id=100008609502129', icon: <FaFacebook /> },
        { url: 'https://www.instagram.com/seeyou4474/?hl=en', icon: <FaInstagram /> },
        { url: 'https://whatsapp.com', icon: <BsWhatsapp /> }
      ]
    },
    {
      name: 'Sanjit Baruwal',
      socialMediaLinks: [
        { url: 'https://www.facebook.com/sanjit.baruwal.1', icon: <FaFacebook /> },
        { url: 'https://www.instagram.com/sanjitbaruwal/?hl=en', icon: <FaInstagram /> },
        { url: 'https://whatsapp.com', icon: <BsWhatsapp /> }
      ]
    },
    {
      name: 'Rupesh Lamichhane',
      socialMediaLinks: [
        { url: 'https://www.facebook.com/rupesh.lamichhane.739', icon: <FaFacebook /> },
        { url: 'https://www.instagram.com/rupeshlamichhane973/?hl=en', icon: <FaInstagram /> },
        { url: 'https://whatsapp.com', icon: <BsWhatsapp /> }
      ]
    },
    // Add more developer objects as needed
  ];

  return (
    <footer>
      {/* Waves */}
      <div className="waves">
        {/* Waves elements */}
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>

      {/* Developer Section */}
      <div className='mainDev'>
        <h1>Developers</h1>
        {developers.map((developer, index) => (
          <Developer key={index} name={developer.name} socialMediaLinks={developer.socialMediaLinks} />
        ))}
      </div>

      <div className="contact-info">
        <h1>Company Info</h1>
        <ul>
          <li>Email: 076bct062@ioepc.edu.np</li>
          <li>Phone: +9779845861550</li>
          <li>Address: Dharan,Nepal</li>
        </ul>
      </div>
      {/* Footer text */}
      <small>
        &copy;{new Date().getFullYear()} TU, IOE, Purwanchal Engineering Campus,
        Dharan | All Rights Reserved.
      </small>
    </footer>
  );
};

export default Footer;
