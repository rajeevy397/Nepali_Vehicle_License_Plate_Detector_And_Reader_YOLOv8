import React, { useState, useEffect, useRef } from 'react';
import './PredictImage_characterModel.css';
import JsonTable from '../Components/Table/Table';
import SecondNavbar from '../Components/Navbar/SecondNavbar';
import './predict_image.css';
import uploadImg from '../img/upload.png';
import { ImageConfig } from '../ImageConfig';

const PredictImage_characterModel = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

  const fetchJsonData = async () => {
    try {
      const timestamp = Date.now();
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
  }, []);

  const handleFileChange = (event) => {
    const fileList = event.target.files || event.dataTransfer.files;
    if (fileList.length > 0) {
      const selectedFile = fileList[0];
      if (allowedImageTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setErrorMessage(''); // Clear error message if a valid file is selected
      } else {
        setErrorMessage('Only image files (JPEG, PNG, GIF) are allowed.');
      }
    }
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

  const handleClearFile = () => {
    // Clear the selected file
    setFile(null);
  };

  return (
    <>
      <div className="predict">
        <SecondNavbar />
        <div className="seasonalPrediction">
          <div className="ses-left">
            <span>Let's Detect </span>
            <span>Number Plates</span>
            <span>in Image</span>
          </div>

          <div className="ses-right">
            {file ? (
              <>
                <div className="drop_file_preview">
                  <div className="drop_file_preview_item">
                    <div className="image">
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
                    style={{ borderRadius: '20px', marginRight: '20px' }}
                    className={`button${processing ? ' disabled' : ''}`}
                    onClick={handleUpload}
                    disabled={processing}
                  >
                    {processing ? 'Processing...' : 'Upload & Process'}
                  </button>
                  <button className="clearButton"  onClick={handleClearFile}>x</button>
                </div>
              </>
            ) : (
              <div
                className="drop_file_input"
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
                  <p>Upload your Image file here</p>
                </label>
                <input
                  id="fileInput"
                  className="user"
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </div>
            )}
            {errorMessage && (
              <div className="error-message" style={{ color: 'red' }}>
                {errorMessage}
              </div>
            )}
          </div>
        </div>

        {imagePath && (
          <div className="output-image">
            <div
              className="zoom-container"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span>Output:</span>
              <img className="processedImage" src={imagePath} alt="" />

              {isZoomed && (
                <div
                  className="zoomed-area"
                  style={{
                    position: 'absolute',
                    top: 200,
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
            <div className="table">
              <JsonTable jsonData={jsonData} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PredictImage_characterModel;
