import './App.css';
import React, { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import HomeWrapper from './pages/HomePage';
import SplashScreen from './pages/SplashScreenPage';
import { AppStateProvider } from './AppStateContext';
import MapPage from './pages/MapPage';
const router = createBrowserRouter([
  {
    path: "/",
    element:
      <>
        <HomeWrapper />
      </>
  },
  {
    path: "/map",
    element: <MapPage />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/map/DefaultState" />,
      },
      {
        path: ":state",
        element: <MapPage />,
      },
    ],
  },
]);
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeEffect, setFadeEffect] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeEffect(true);
      const switchToMainContent = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(switchToMainContent);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <SplashScreen fadeEffect={fadeEffect} />;
  }
  return (
    <AppStateProvider>
      <RouterProvider router={router} />
    </AppStateProvider>
  );
}