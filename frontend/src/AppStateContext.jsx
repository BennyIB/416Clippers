import React, { createContext, useState, useContext } from 'react';
const AppStateContext = createContext(null);
export const useAppState = () => useContext(AppStateContext);
export const AppStateProvider = ({ children }) => {
  const [appState, setAppState] = useState("USA"); 
  const [config, setConfig] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  return (
    <AppStateContext.Provider value={{ appState, setAppState, config, setConfig, selectedDistrict, setSelectedDistrict }}>
      {children}
    </AppStateContext.Provider>
  );
};