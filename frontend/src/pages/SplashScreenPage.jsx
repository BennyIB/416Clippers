import React from 'react';
import '../App.css'; 
const SplashScreen = ({ fadeEffect }) => {
    return (
      <div className={`splash-container flex items-center justify-center h-screen ${fadeEffect ? 'fade-out' : ''}`}>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Los_Angeles_Clippers_%282015%29.svg/1200px-Los_Angeles_Clippers_%282015%29.svg.png"
          alt="Clippers Logo"
          className="animate-bounce w-48 h-auto"
        />
      </div>
    );
  };
export default SplashScreen;