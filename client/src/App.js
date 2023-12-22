import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Predict_image from './pages/Predict_image';
import Predict_video from './pages/Predict_video';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/predict_image" element={<Predict_image/>} />
        <Route path="/predict_video" element={<Predict_video/>} />
      </Routes>
    </Router>
  );
}

export default App;
