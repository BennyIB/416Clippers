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

