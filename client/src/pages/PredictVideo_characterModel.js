import React, { useState } from 'react';
import './PredictVideo_characterModel.css';

const PredictVideo_characterModel = () => {
  const [file, setFile] = useState(null);
  const [videoPath, setVideoPath] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await fetch('http://localhost:5001/processVideo', {
        method: 'POST',
        body: formData,
      });

      // Handle the response from the server
      const result = await response.json();
      console.log(result);

      // Set the video path in the state
      const timestamp = new Date().getTime();
      setVideoPath(`http://localhost:5001/${result.videoPath}?${timestamp}`);
    } catch (error) {
      console.error('Error uploading video:', error);
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
          <button className="button" onClick={handleUpload}>
            Upload and Process Video
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
    </div>
  );
};

export default PredictVideo_characterModel;
