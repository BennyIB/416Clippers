import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
import { useAppState } from '../AppStateContext';
import './BoxAndWhisker.css'
const MAPPING = {
  "Latino": "Hispanic",
  "White": "White",
  "African": "African American",
  "Asian": "Asian",
  "Hispanic": "Hispanic",
  "Black": "African American",
  "Native": "Native American"
};

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BoxAndWhiskerChart = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedRace, setSelectedRace] = useState('Hispanic');
  const [ensembleCount, setEnsembleCount] = useState('5000');
  const { appState } = useAppState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const state = appState.charAt(0).toLowerCase() + appState.slice(1);
        const response = await axios.get(`http://localhost:8080/${state}/box-whisker-data/${ensembleCount}`, {
          params: { race: selectedRace } 
        });
        console.log("THE DATA", response.data);
        const data = response.data.map(item => ({
          label: item.rank - 1,
          actual: item.actual,
          y: [item.min, item.q1, item.q3, item.max, item.median]
        }));
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [selectedRace, appState, ensembleCount]);

  const stateNameCapitalized = appState.charAt(0).toUpperCase() + appState.slice(1);

  const options = {
    theme: "light2",
    animationEnabled: true,
    title: {
      text: `${stateNameCapitalized} ReCom - ${ensembleCount} Ensembles`
    },
    axisY: {
      title: `${MAPPING[selectedRace]} Pop. %`
    },
    axisX: {
      title: "Districts"
    },
    data: [{
      type: "boxAndWhisker",
      showInLegend: true,
      legendText: "ReCom Ensemble",
      yValueFormatString: "#,##0.# \"%\"",
      dataPoints: chartData.map(item => ({
        label: item.label,
        y: item.y,
      }))}, {
      type: "scatter",
      color: "red",
      showInLegend: true,
      legendText: "Enacted",
      markerSize: 5,
      toolTipContent: `Actual ${MAPPING[selectedRace]} Population Percentage: {y}%`,
      dataPoints: chartData.map(item => ({
        x: item.label,
        y: item.actual,
      })) }]
  };

  const handleRaceChange = (event) => {
    setSelectedRace(event.target.value);
  };

  const handleEnsembleCountChange = (event) => {
    setEnsembleCount(event.target.value);
  };

  return (
    <>
      <div>
        <label>Choose a race:</label>
        <select value={selectedRace} onChange={handleRaceChange} className="text-lg bg-white border-solid border-2 text-black rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
          <option value="Black">African American</option>
          <option value="Asian">Asian</option>
          <option value="Hispanic">Hispanic</option>
          <option value="Native">Native American</option>
          <option value="White">White</option>
        </select>
        <label>Number of Plans:</label>
        <select value={ensembleCount} onChange={handleEnsembleCountChange} className="text-lg bg-white border-solid border-2 text-black rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
          <option value="250">250 Plans</option>
          <option value="5000">5000 Plans</option>
        </select>
        <CanvasJSChart options={options} />
      </div>
    </>
  );
};

export default BoxAndWhiskerChart;