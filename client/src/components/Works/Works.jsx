import React from 'react';
import './Works.css';
import Upwork from '../../img/Upwork.png';
import Fiverr from '../../img/fiverr.png';
import Amazon from '../../img/amazon.png';
import Shopify from '../../img/Shopify.png';
import Facebook from '../../img/Facebook.png';
import { themeContext } from '../../Context';
import { useContext } from 'react';
import { motion } from 'framer-motion';

const Works = () => {
  // context
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode; 

  return (
    <div className="works">
      {/* left side */}
      <div className="awesome">
        <span style={{ color: darkMode ? 'white' : '' }}>
          Works For All These
        </span>
        <span>Brands and Clients</span>
        <spane>
          I am proud to have worked with a diverse range of<br /> clients and brands
          over the years. My portfolio includes <br /> a wide range of projects for
          both large and small businesses <br />across various industries. Here is a
          selection of some of<br /> the brands and clients I have had the pleasure
          of working with.
          <br />
        </spane>
        <button className="button s-button">Hire me</button>
        <div className="blur s-blur1" style={{ background: '#ABF1FF94' }}></div>
      </div>

      {/* right side */}
      <div className="w-right">
        <motion.div
          initial={{ rotate: 45 }}
          whileInView={{ rotate: 0 }}
          viewport={{ margin: '-40px' }}
          transition={{ duration: 3.5, type: 'spring' }}
          className="w-mainCircle"
        >
          <div className="w-secCircle">
            <img src={Upwork} alt="" />
          </div>
          <div className="w-secCircle">
            <img src={Fiverr} alt="" />
          </div>
          <div className="w-secCircle">
            <img src={Amazon} alt="" />
          </div>
          <div className="w-secCircle">
            <img src={Shopify} alt="" />
          </div>
          <div className="w-secCircle">
            <img src={Facebook} alt="" />
          </div>
        </motion.div>
        <div className="w-backCircle blueCircle"></div>
        <div className="w-backCircle yellowCircle"></div>
      </div>
    </div>
  );
}; 

export default Works;
