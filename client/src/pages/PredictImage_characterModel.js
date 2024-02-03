import React, { useState } from 'react';

const PredictImage_characterModel = () => {
  const [file, setFile] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5001/processImage', {
        method: 'POST',
        body: formData,
      });

      // Handle the response from the server
      const result = await response.json();
      console.log(result);

      // Set the image path in the state
      setImagePath(`http://localhost:5001/${result.imagePath}`);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Process Image</button>

      {/* Display the processed image if imagePath is available */}
      {imagePath && <div><img src={imagePath} alt="Processed Image" style={{ maxWidth: '50%' }}/></div>}
    </div>
  );
};

export default PredictImage_characterModel;
