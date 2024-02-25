import React from 'react';
import './Testimonials.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import profilePic1 from '../../img/1.png';
import profilePic2 from '../../img/profile1.jpg';
import profilePic3 from '../../img/profile2.jpg';
import profilePic4 from '../../img/profile4.jpg';
import { Pagination } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css';
import SwiperCore, { Autoplay } from 'swiper';

function Testimonials() {
  SwiperCore.use([Autoplay]);

  const clients = [
    {
      img: profilePic1,
      review:
        'Leading the model building efforts, I employed YOLOv8 to develop a robust Nepali number plate detection and text recognition system. Leveraging deep learning techniques, I trained and fine-tuned the model on diverse datasets to achieve high accuracy and performance. I continuously iterated on the model, incorporating feedback and improvements to enhance its effectiveness in real-world scenarios.',
      name: 'Rajeev Yadav',
    },
    {
      img: profilePic2,
      review:
        'As part of the frontend team, I contributed to crafting the user interface, ensuring an intuitive and visually appealing experience for our users. Collaborating closely with the design team, I implemented features that enhance user interaction and facilitate seamless navigation.',
      name: 'Rajkishor Yadav',
    },
    {
      img: profilePic3,
      review:
        'As the backend developer, my responsibility was to architect the server-side components, enabling efficient communication between the frontend and the model. I implemented robust APIs to handle requests, ensuring data integrity and security. Additionally, I optimized the system for scalability and reliability to support a growing user base.',
      name: 'Sanjit Baruwal',
    },
    {
      img: profilePic4,
      review:
        'In the frontend development phase, my focus was on creating responsive layouts and implementing dynamic elements to enhance user engagement. I worked on optimizing the performance of the web application, ensuring compatibility across different devices and browsers for a consistent experience.',
      name: 'Rupesh Lamichhane',
    },
  ];
  return (
    <div className="t-wrapper" id="Testimonials">
      <div className="t-heading">
        <span>Our Dynamic </span>
        <span>Project Team </span> 
        <span>Members</span>
        <div
          className="blur t-blur1"
          style={{ background: 'var(--purple)' }}
        ></div>
        <div className="blur t-blur2" style={{ background: 'skyblue' }}></div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {clients.map((client, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="testimonials">
                <img src={client.img} alt="" />
                <span>{client.review}</span>
                <span>{client.name}</span> 
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Testimonials;
