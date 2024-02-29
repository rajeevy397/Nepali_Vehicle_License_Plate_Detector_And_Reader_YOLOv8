import React, { useState,useRef } from 'react';
import './PredictVideo_characterModel.css';
import { ImageConfig } from '../ImageConfig';
import SecondNavbar from '../Components/Navbar/SecondNavbar';
import uploadImg from "../img/upload.png"

const PredictVideo_characterModel = () => {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [videoPath, setVideoPath] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    // setFile(event.target.files[0]);
    const fileList = event.target.files || event.dataTransfer.files;
    if (fileList.length > 0) {
      setFile(fileList[0]);
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

  return (
    <div className="predict">
      <SecondNavbar />
      <div className="seasonalPrediction">
        <div className="ses-left">
          <span>Let's Detect </span>
          <span>Number Plates</span>
        </div>

        <div className='ses-right'>


        {file ? (
        <>

          <div className='drop_file_preview'>
            

              <div className = "drop_file_preview_item">
                <div className='image'>
                  <img
                        src={
                          ImageConfig[file.name.split('.').pop().toLowerCase()]
                        }
                       alt=""
                  />
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
              style={{borderRadius:'5px',marginRight:'20px'}}
                className={`button${isLoading ? ' disabled' : ''}`}
                onClick={handleUpload}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Upload'}
              </button>
            
          </div>
        </>
          
        ):(
          
          <div  className="drop_file_input"
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
            <label htmlFor="fileInput"  className="drop_file_input_label">
              <img src={uploadImg} alt="" />
              <p>Upload your video file here</p>
            </label>
            <input id="fileInput" className="user" type="file" onChange={handleFileChange} ref={fileInputRef}/>
          </div>
          
        )}
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
