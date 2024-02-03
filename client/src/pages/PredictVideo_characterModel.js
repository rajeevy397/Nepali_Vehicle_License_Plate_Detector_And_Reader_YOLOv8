import React, { useState } from 'react';

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
      setVideoPath(`http://localhost:5001/${result.videoPath}`);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Process Video</button>

      {/* Display the processed video if videoPath is available */}
      {videoPath && (
        <video controls width="500" height="auto">
          <source src={videoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default PredictVideo_characterModel;
