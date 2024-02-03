import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Predict_image from './pages/Predict_image';
import Predict_video from './pages/Predict_video';
import Home from './pages/Home';
import PredictVideo_characterModel from './pages/PredictVideo_characterModel';
import PredictImage_characterModel from './pages/PredictImage_characterModel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/predict_image" element={<Predict_image/>} />
        <Route path="/predict_image_charModel" element={<PredictImage_characterModel/>} />
        <Route path="/predict_video" element={<Predict_video/>} />
        <Route path="/PredictVideo_characterModel" element={<PredictVideo_characterModel/>} />
      </Routes>
    </Router>
  );
}

export default App;
