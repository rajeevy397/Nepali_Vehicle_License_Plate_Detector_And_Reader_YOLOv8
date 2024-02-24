import React, { useState, useRef } from 'react';
import axios from 'axios';

function PredictVideo() {
  const [file, setFile] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [message, setMessage] = useState('');
  const [outputVideoPath, setOutputVideoPath] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    // Display the uploaded video on the frontend
    setUploadedVideo(null); // Reset uploaded video to trigger re-render
    setTimeout(() => {
      setUploadedVideo(uploadedFile);
    }, 0);

    setOutputVideoPath(''); // Reset outputVideoPath when a new file is selected
  };

  const handleUpload = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://localhost:5000/upload_video',
        formData
      );

      console.log('Server Response:', response);
      setMessage(response.data.message);

      // Append a timestamp or unique identifier to the URL to prevent caching
      const timestamp = new Date().getTime();
      setOutputVideoPath(`${response.data.outputPath}?${timestamp}`);

      // Reset the file input value
      fileInputRef.current.value = null;
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        accept="video/*"
      />
      {uploadedVideo && (
        <div>
          <h2>Uploaded Video:</h2>
          <video controls style={{ maxWidth: '50%' }}>
            <source src={URL.createObjectURL(uploadedVideo)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? 'Processing...' : 'Upload'}
      </button>

      {loading && (
        <div>
          Please Wait and keep calm...As this system doesn't has GPU (CUDA or
          MPS),it take some time for processing depending on length of video.
        </div>
      )}

      {outputVideoPath && (
        <div>
          <h2>Output Video:</h2>
          <video controls style={{ maxWidth: '50%' }}>
            <source
              src={`http://localhost:5000${outputVideoPath}`}
              type="video/mp4"
              onError={(e) => console.error('Error loading video:', e)}
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default PredictVideo;
