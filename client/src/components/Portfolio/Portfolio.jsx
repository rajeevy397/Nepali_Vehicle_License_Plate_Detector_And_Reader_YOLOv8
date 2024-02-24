import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Portfolio.css';
import Sidebar from '../../img/1.jpg';
import Ecommerce from '../../img/2.jpg';
import Hoc from '../../img/3.jpg';
import MusicApp from '../../img/6.jpg';
import 'swiper/css';
import { themeContext } from '../../Context';
import { useContext } from 'react';
import SwiperCore, { Autoplay } from 'swiper'; 

const Portfolio = () => {
  SwiperCore.use([Autoplay]);
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className="portfolio" id="Portfolio">
      {/* Heading */}
      <span style={{ color: darkMode ? 'white' : '' }}>Some Detected</span>
      <span>Number Plates</span>

      {/* Slider */}
      <Swiper
        
        spaceBetween={30}
        slidesPerView={3}
        grabCursor={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        loop={true}
        className="portfolio-slider"
      >
        <SwiperSlide>
          <img src={Sidebar} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Ecommerce} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={MusicApp} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Hoc} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Portfolio;
