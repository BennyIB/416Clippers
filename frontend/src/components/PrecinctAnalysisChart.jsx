import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import regression from 'regression';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import annotationPlugin from 'chartjs-plugin-annotation';
import { useAppState } from '../AppStateContext';

ChartJS.register(annotationPlugin);
const PrecinctAnalysisChart = () => {
  const [selectedRace, setSelectedRace] = useState('Latino');
  const [dataPoints, setDataPoints] = useState({
    democratPoints: [],
    republicanPoints: [],
    democratEquation: '', 
    republicanEquation: '',
    democratForm: '',
    republicanForm: '',
  });
  const { appState } = useAppState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const state = appState.charAt(0).toLowerCase() + appState.slice(1);
        const response = await axios.get(`http://localhost:8080/api/${state}/vote-shares/precinct-analysis?race=${selectedRace}`);

        setDataPoints({
          democratPoints: response.data.democratPoints,
          republicanPoints: response.data.republicanPoints,
          democratEquation: response.data.equationDemocrat,
          republicanEquation: response.data.equationRepublican,
          democratForm: response.data.formDemocrat,
          republicanForm: response.data.formRepublican
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [selectedRace, appState]);

  const generatePointsFromEquation = (equation, form) => {
    const coeffs = equation.match(/[-+]?[0-9]*\.?[0-9]+/g).map(Number);
  
    console.log('Coefficients:', coeffs);
  
    switch (form) {
      case 'quadratic':
        return Array.from({ length: 100 }, (_, x) => ({
          x: x,
          y: coeffs[0] * x**2 + coeffs[2] * x + coeffs[3]
        }));
      case 'cubic':
        return Array.from({ length: 100 }, (_, x) => ({
          x: x,
          y: coeffs[0] * x**3 + coeffs[2] * x**2 + coeffs[4] * x + coeffs[5]
        }));
      default:
        console.error("Unhandled equation form:", form);
        return [];
    }
  };

  const democratRegressionCurve = dataPoints.democratEquation ? generatePointsFromEquation(dataPoints.democratEquation, dataPoints.democratForm) : [];
  const republicanRegressionCurve = dataPoints.republicanEquation ? generatePointsFromEquation(dataPoints.republicanEquation, dataPoints.republicanForm) : [];

  

  const data = {
    datasets: [
      {
        label: 'Democratic Vote Share',
        data: dataPoints.democratPoints,
        backgroundColor: 'rgba(53, 162, 235, 0.5)', //blue
        type: 'scatter', // Explicitly set type to scatter for clarity
        order: 2 // Drawn after the lines (which will have order: 1)
      },
      {
        label: 'Republican Vote Share',
        data: dataPoints.republicanPoints,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',  //red
        type: 'scatter', // Explicitly set type to scatter for clarity
        order: 2 // Drawn after the lines
      },
      {
        label: 'Democratic Regression Line',
        data: democratRegressionCurve,
        type: 'line',
        borderColor: 'rgb(0, 0, 139)', //blue
        borderWidth: 2,
        fill: false,
        showLine: true,
        pointRadius: 0,
        order: 1 // Draw this line first so it's below the points
      },
      {
        label: 'Republican Regression Line',
        data: republicanRegressionCurve,
        type: 'line',
        borderColor: 'rgb(139, 0, 0)', 
        borderWidth: 2,
        fill: false,
        showLine: true,
        pointRadius: 0,
        order: 1 // Draw this line first so it's below the points
      }
    ]
  };
  

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: `Percent ${selectedRace}`
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10, 
        },
        max: 100, 
        min: 0,
        title: {
          display: true,
          text: 'Vote Share'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Vote Share vs. Percent ${selectedRace}`
      },
    }
  };
  
  
  


  const handleRaceChange = (event) => {
    setSelectedRace(event.target.value);
  };

  return (
    <div>
      <select value={selectedRace} onChange={handleRaceChange} className="text-lg bg-white text-black border-solid border-2 mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
        <option value="Latino">Latino</option>
        <option value="White">White</option>
        <option value="Asian">Asian</option>
        <option value="African">African American</option>
      </select>
      <Scatter data={data} options={options} />
    </div>
  );
};
export default PrecinctAnalysisChart;
