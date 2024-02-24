import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import PredictImage from './pages/Predict_image';
import PredictImage_characterModel from './pages/PredictImage_characterModel';
import PredictVideo from './pages/Predict_video';
import PredictVideo_characterModel from './pages/PredictVideo_characterModel';


function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/predict_image" element={<PredictImage/>} />
        <Route path="/predict_image_charModel" element={<PredictImage_characterModel/>} />
        <Route path="/predict_video" element={<PredictVideo/>} />
        <Route path="/predict_video_charModel" element={<PredictVideo_characterModel/>} />
      </Routes>
    </Router>
  );
}

export default MyRoutes;
