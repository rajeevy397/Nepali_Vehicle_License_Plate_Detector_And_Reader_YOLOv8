import React, { useState, useRef } from 'react';
import './PredictVideo_characterModel.css';
import SecondNavbar from '../Components/Navbar/SecondNavbar';
import uploadImg from "../img/upload.png";

const PredictVideo_characterModel = () => {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [videoPath, setVideoPath] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const allowedVideoTypes = ['video/mp4', 'video/mpeg', 'video/quicktime']; // Add more video MIME types if necessary

  const handleFileChange = (event) => {
    const fileList = event.target.files || event.dataTransfer.files;
    if (fileList.length > 0) {
      const selectedFile = fileList[0];
      if (allowedVideoTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError(null); // Clear error message if a valid file is selected
      } else {
        setError('Only video files (MP4, MPEG, QuickTime) are allowed.');
      }
    }
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

  const handleClearFile = () => {
    // Clear the selected file
    setFile(null);
  };

  return (
    <div className="predict">
      <SecondNavbar />
      <div className="seasonalPrediction">
        <div className="s-left">
          <span>Let's Detect </span>
          <span>Number Plates</span>
          <span>in Video</span>
        </div>

        <div className='ses-right'>
        
          {file ? (
            <>
              <div className='drop_file_preview'>
                <div className="drop_file_preview_item">
                  <div className='image'>
                    <img src={uploadImg} alt="" />
                  </div>
                  <div className="drop_file_preview_item_info">
                    <div style={{ marginBottom: '-10px' }}>
                      <p>{file.name}</p>
                    </div>
                    <div style={{ marginTop: '-10px' }}>
                      <p>{file.size}B</p>
                    </div>
                  </div>
                </div>
                <button
                  style={{ borderRadius: '20px', marginRight: '20px' }}
                  className={`button${isLoading ? ' disabled' : ''}`}
                  onClick={handleUpload}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Upload & Process'}
                </button>
                <button className="clearButton"  onClick={handleClearFile}>x</button>
              </div>
            </>
          ) : (
            <div className="drop_file_input"
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('dragover');
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove('dragover');
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('dragover');
                handleFileChange(e);
              }}
            >
              <label htmlFor="fileInput" className="drop_file_input_label">
                <img src={uploadImg} alt="" />
                <p>Upload your video file here</p>
              </label>
              <input id="fileInput" className="user" type="file" onChange={handleFileChange} ref={fileInputRef} />
            </div>
          )}
          {error && <p className="error-message" style={{ color:'red' }}>Error: {error}</p>}
        </div>
      </div>

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

      {/* {error && <p className="error-message">Error: {error}</p>} */}
    </div>
  );
};

export default PredictVideo_characterModel;
