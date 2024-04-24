import React, { createContext, useState, useContext } from 'react';
const AppStateContext = createContext(null);
export const useAppState = () => useContext(AppStateContext);
export const AppStateProvider = ({ children }) => {
  const [appState, setAppState] = useState("USA"); 
  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppStateContext.Provider>
  );
};