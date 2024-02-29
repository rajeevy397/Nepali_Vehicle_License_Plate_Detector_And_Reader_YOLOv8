import React, { useRef } from 'react';
import axios from 'axios';
import Extracted_text_table from './../Components/Extracted_text_table';


function PredictImage() {
  const [file, setFile] = React.useState(null);
  const [uploadedImage, setUploadedImage] = React.useState(null);
  const [message, setMessage] = React.useState('');
  const [outputImagePath, setOutputImagePath] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    // Display the uploaded image on the frontend
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(uploadedFile);

    setOutputImagePath(''); // Reset outputImagePath when a new file is selected
  };

  const handleUpload = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://localhost:5000/upload_image',
        formData
      );

      console.log('Server Response:', response);
      setMessage(response.data.message);

      // Append a timestamp or unique identifier to the URL to prevent caching 
      const timestamp = new Date().getTime();
      setOutputImagePath(`${response.data.outputPath}?${timestamp}`);

      // Set the uploaded image directly, overwriting the previous one
      setUploadedImage(uploadedImage);

      // Reset the file input value
      fileInputRef.current.value = null;
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
  

      <input type="file" onChange={handleFileChange} ref={fileInputRef} />
    
      {uploadedImage && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '20%' }} />
        </div>
      )}
      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? 'Processing...' : 'Upload'}
      </button>

      {loading && (
        <div>
          Please Wait and keep calm...As this system doesn't have GPU (CUDA or
          MPS), it takes some time for processing.
        </div>
      )}

      {outputImagePath && (
        <div>
          <h2>Output Image:</h2>
          <img
            src={`http://localhost:5000${outputImagePath}`}
            alt="Output"
            style={{ maxWidth: '50%' }}
            onError={(e) => console.error('Error loading image:', e)}
          />
          <Extracted_text_table />
        </div>
      )}

      {/* Use the UnicodeTable component here */}
      
    </>
  );
}

export default PredictImage;
