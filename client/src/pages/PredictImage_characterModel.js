import React, { useState, useEffect } from 'react';
import './PredictImage_characterModel.css';
import JsonTable from '../Components/Table/Table';

const PredictImage_characterModel = () => {
  const [file, setFile] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  // const [prediction, setPrediction] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  // Function to fetch JSON data from the server
  const fetchJsonData = async () => {
    try {
      // Get the current timestamp
      const timestamp = Date.now();

      // Fetch JSON data with timestamp query parameter
      const response = await fetch(
        `http://localhost:5001/jsondata?timestamp=${timestamp}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch JSON data');
      }
      const data = await response.json();
      setJsonData(data);
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  useEffect(() => {
    fetchJsonData();
  }, []); // Fetch JSON data on component mount

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setProcessing(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5001/processImage', {
        method: 'POST',
        body: formData,
      });

      const timestamp = new Date().getTime();
      const result = await response.json();
      setImagePath(`http://localhost:5001/${result.imagePath}?${timestamp}`);
      // setPrediction(result.prediction);

      // Fetch JSON data again after uploading image
      fetchJsonData();
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleMouseMove = (event) => {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div className="predict">
      <div className="seasonalPrediction">
        <div className="ses-left">
          <span>Make a </span>
          <span>prediction</span>
        </div>

        <div className="ses-right">
          <input className="user" type="file" onChange={handleFileChange} />
          <button
            className="button"
            onClick={handleUpload}
            disabled={processing}
          >
            {processing ? 'processing...' : 'Upload and Process Image'}
          </button>
        </div>
      </div>

      {imagePath && (
        <div className="output-image" style={{ position: 'relative' }}>
          <JsonTable jsonData={jsonData} />
          <div
            className="zoom-container"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="processedImage"
              src={imagePath}
              alt="Processed Image"
              // style={{ maxWidth: '100%' }}
            />
            {isZoomed && (
              <div
                className="zoomed-area"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 800,
                  width: '200px',
                  height: '200px',
                  backgroundImage: `url(${imagePath})`,
                  backgroundSize: '500% 500%',
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>
          {/* {prediction && <div className="prediction">{prediction}</div>} */}
        </div>
      )}
    </div>
  );
};

export default PredictImage_characterModel;
