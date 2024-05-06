import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
import { useAppState } from '../AppStateContext';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BoxAndWhiskerChart = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedRace, setSelectedRace] = useState('Hispanic');
  const { appState } = useAppState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const state = appState.charAt(0).toLowerCase() + appState.slice(1);
        const response = await axios.get(`http://localhost:8080/${state}/box-whisker-data`, {
          params: { race: selectedRace } 
        });
        console.log("THE DATA", response.data);
        const data = response.data.map(item => ({
          label: item.rank-1,
          actual: item.actual,
          y: [item.min, item.q1, item.q3, item.max, item.median]
        }));
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [selectedRace]);

  const options = {
    theme: "light2",
    animationEnabled: true,
    title: {
      text: "Arizona ReCom (Minority Group: Hispanic)"
    },
    axisY: {
      title: "Hispanic Pop. %"
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
      markerSize: 10,
      toolTipContent: "Actual Hispanic Population Percentage: {y}%",
      dataPoints: chartData.map(item => ({
        x: item.label,
        y: item.actual,
      })) }]
      
  };

  const handleRaceChange = (event) => {
    setSelectedRace(event.target.value);
};


  return (
    <>
    <div>
    <label>Choose a race:</label>
                <select value={selectedRace} onChange={handleRaceChange} className="text-lg bg-white border-solid border-2 text-black rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="Hispanic">Hispanic</option>
                    <option value="White">White</option>
                    <option value="Asian">Asian</option>
                    <option value="Black">Black</option>
                    <option value="Native"> Native </option>
                </select>
      <CanvasJSChart options={options} />
                
    </div>
    </>
  );
};

export default BoxAndWhiskerChart;
