import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Nepali Vehicle Number Plate Detection System</h1>
      <p>
        This application uses YOLOv8 for the detection of Nepali vehicle number plates.
        Additionally, it employs EasyOCR for text extraction from the detected plates.
      </p>
      <p>
        Get started by selecting an option below:
      </p>

      <div>
        <Link to="/predict_image">
          <button>Go to Image Prediction</button>
        </Link>

        <Link to="/predict_video">
          <button>Go to Video Prediction</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
