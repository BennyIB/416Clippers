import React from 'react';
import '../App.css'; 
import axios from 'axios';
import { useEffect, useState } from 'react';

const SplashScreen = ({ fadeEffect }) => {
  const [configData, setConfigData] = useState({});

  useEffect(() => {
    const getConfigData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/config_data');
        setConfigData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getConfigData();
  }, []); 

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