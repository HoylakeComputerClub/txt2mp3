import React, { useState } from 'react';

const AudioUploader = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        uploadAudio(base64String);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const uploadAudio = (base64String) => {
    const apiUrl = `${props.apiUri}/transcribe`;

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audio: base64String }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from server:', data);
        // Handle the server response as needed
      })
      .catch(error => {
        console.error('Error uploading audio:', error);
      });
  };

  return (
    <div>
      <h1>Audio Uploader</h1>
      <input type="file" accept=".mp3" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default AudioUploader;
