import React, { useState, useEffect } from 'react';
import './CroppedNumberPlated.css'

function CroppedNumberPlates() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/images')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        return response.json();
      })
      .then(data => setImages(data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div>
      <div className='heading'>Cropped Number Plates:</div>
      {error && <p>{error}</p>}
      <div className='cropped_plates'>
        {images.length === 0 ? (
          <p>No images found</p>
        ) : (
          images.map((image, index) => (
            <img className='plates' key={index} src={`http://localhost:5001/images/${image}`} alt={` ${image}`} />
          ))
        )}
      </div>
    </div>
  );
}

export default CroppedNumberPlates;
