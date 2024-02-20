import './App.css';
import EthnicityBarChart from './EthnicityBarChart';
import PrecinctAnalysisChart from './PrecinctAnalysisChart';
import EcologicalInferencePlot from './EcologicalInferencePlot';
import EthnicityBarChartPop from './EthnicityBarChartPop';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MapPage from './pages/map';
import HomeWrapper from './pages/home';
import EthnicityBarChart from './EthnicityBarChart';
import { Navigate } from 'react-router-dom';
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
  {
    path: "/chart",
    element:
    <>
      <EthnicityBarChart />
    </>
  },
  {
    path: "/precint-analysis-chart",
    element:
    <>
      <PrecinctAnalysisChart />
    </>
  },
  {
    path: "/ecological-inference-plot",
    element:
    <>
      <EcologicalInferencePlot />
    </>
  },
  {
    path: "/ethnicity-bar-chart-pop",
    element:
    <>
      <EthnicityBarChartPop />
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

