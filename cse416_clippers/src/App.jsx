import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MapPage from './pages/map';
import HomeWrapper from './pages/home';
import EthnicityBarChart from './EthnicityBarChart';
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
    element:
    <>
      <MapPage />
    </>
  },
  {
    path: "/chart",
    element:
    <>
      <EthnicityBarChart />
    </>
  },

]);

export default function App() {
  return (
      <RouterProvider
          router={router}
      />
      
  );
}

