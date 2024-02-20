import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import './App.css';
import EthnicityBarChart from './EthnicityBarChart';
import PrecinctAnalysisChart from './PrecinctAnalysisChart';
import EcologicalInferencePlot from './EcologicalInferencePlot';
import EthnicityBarChartPop from './EthnicityBarChartPop';



function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ethnicity-chart" element={<EthnicityBarChart />} />
        <Route path="/ethnicity-chart-pop" element={<EthnicityBarChartPop />} />
        <Route path="/precinct-analysis" element={<PrecinctAnalysisChart />} />
        <Route path="/ecological-inference" element={<EcologicalInferencePlot />} />

      </Routes>
    </Router>
  );
}

function App() {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [selectedState, setSelectedState] = useState('');
  const clippersImageURL = "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Los_Angeles_Clippers_%282015%29.svg/1200px-Los_Angeles_Clippers_%282015%29.svg.png";

  const handleSelectState = (state) => {
    setSelectedState(state);
    if (state === 'Arizona') {
      navigate('/ethnicity-chart');
    }
  };

  return (
      <div className="clippers-container">
        <img src={clippersImageURL} alt="Clippers" className="clippers-image" />
        <h1 className="clippers-title">Clippers</h1>
        <button className="clippers-button" onClick={() => handleSelectState('Arizona')}>Arizona</button>
        <button className="clippers-button" onClick={() => handleSelectState('Illinois')}>Illinois</button>
        {selectedState && <p className="clippers-selected">You have selected: {selectedState}</p>}
        <Link to="/">Go Back to Main</Link>

      </div>
  );
}

export default AppWrapper;
