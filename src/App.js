import React from 'react';
import './App.css'; // Ensure this path matches your actual CSS file location
import ImageUploader from './components/ImageUploader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Image Uploader</h1>
      </header>
      <main>
        <ImageUploader />
      </main>
    </div>
  );
}

export default App;
