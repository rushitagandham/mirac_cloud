import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [context, setContext] = useState('');
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleContextChange = (e) => {
    setContext(e.target.value);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...newFiles]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please upload at least one image.');
      return;
    }
  
    const formData = new FormData();
    formData.append('context', context);
  
    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });
  
    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.success) {
        setImages([...images, ...response.data.uploadedImages]);
        alert('Images uploaded successfully!');
        setSelectedFiles([]);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images.');
    }
  };
  
  return (
    <div className="container">
      <h1>Upload Screenshots</h1>

      <div className="form-group">
        <label>Optional Context</label>
        <textarea
          value={context}
          onChange={handleContextChange}
          placeholder="Enter optional context"
          className="context-input"
        />
      </div>

      <div className="form-group">
        <label>Upload Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <button onClick={handleUpload} className="upload-btn">Describe Testing Instructions</button>

      {images.length > 0 && (
        <div className="uploaded-images">
          <h3>Uploaded Images:</h3>
          <div className="image-preview">
            {images.map((image, idx) => (
              <img key={idx} src={image.url} alt={`uploaded-${idx}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
