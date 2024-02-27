import React, { useState } from 'react';
import './PredictVideo_characterModel.css';

const PredictVideo_characterModel = () => {
  const [file, setFile] = useState(null);
  const [videoPath, setVideoPath] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('video', file);

      const response = await fetch('http://localhost:5001/processVideo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload video');
      }

      const result = await response.json();
      setVideoPath(`http://localhost:5001/${result.videoPath}?${new Date().getTime()}`);
    } catch (error) {
      setError('Error uploading or processing video');
      console.error('Error uploading video:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="predict">
      <div className="seasonalPrediction">
        <div className="ses-left">
          <span>Let's Detect </span>
          <span>Number Plates</span>
        </div>

        <div className="ses-right">
          <input className="user" type="file" onChange={handleFileChange} />
          <button
            className={`button${isLoading ? ' disabled' : ''}`}
            onClick={handleUpload}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Upload and Process Video'}
          </button>
        </div>
      </div>

      {/* Display the processed video if videoPath is available */}
      {videoPath && (
        <div className="output-video">
          <div className='output'>
            <span>Output:</span>
            <video className="processedVideo" controls width="700" height="auto">
              <source src={videoPath} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
};

export default PredictVideo_characterModel;
