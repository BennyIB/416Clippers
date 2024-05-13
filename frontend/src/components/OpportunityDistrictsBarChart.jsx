import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useAppState } from '../AppStateContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const MAPPING = {
  "Latino" : "Hispanic",
  "White" : "White",
  "African" : "African",
  "Asian" : "Asian"
}
const OpportunityDistrictsBarChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedRace, setSelectedRace] = useState('Latino');
  const [opportunityCounts, setOpportunityCounts] = useState({});
  const { appState } = useAppState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const state = appState.charAt(0).toLowerCase() + appState.slice(1);
        const response = await axios.get(`http://localhost:8080/api/${state}/opportunity-districts`, {
          params: { race: selectedRace }
        });
        setChartData({
          labels: response.data.x_points,
          datasets: [{
            label: `${MAPPING[selectedRace]} Opportunity Districts`,
            data: response.data.y_points,
            backgroundColor: 'rgba(139, 0, 0, 0.5)',
            borderColor: 'rgba(139, 0, 0, 1)',
            borderWidth: 1,
          }],
        });
        setOpportunityCounts({
          ...opportunityCounts,
          [selectedRace]: response.data.total_opportunity_districts
        });
      } catch (error) {
        console.error('Error fetching opportunity district data:', error);
      }
    };

    fetchData();
  }, [appState, selectedRace]);

  const handleRaceChange = (event) => {
    setSelectedRace(event.target.value);
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${MAPPING[selectedRace]} Opportunity Districts`,
      },
    },
  };

  return (
    <div>
      <h2>Distribution of Opportunity Districts in {appState}</h2>
      <select id="race-select"
        className="text-lg bg-white text-black border-solid border-2 mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={selectedRace}
        onChange={handleRaceChange}
      >
        <option value="Latino">Hispanic</option>
        <option value="African">African American</option>
        <option value="Asian">Asian</option>
      </select>

      <Bar data={chartData} options={options} />
      <p style={{ color: 'black' }}>
        {appState === 'Arizona' && selectedRace === 'Latino' && `Number of opportunity districts in current district plan for Hispanics: 3`}
        {appState === 'Arizona' && selectedRace === 'Asian' && `Number of opportunity districts in current district plan for Asians: 0`}
        {appState === 'Arizona' && selectedRace === 'African' && `Number of opportunity districts in current district plan for African American: 0`}
        {appState === 'Illinois' && selectedRace === 'Latino' && `Number of opportunity districts in current district plan for Hispanics: 6`}
        {appState === 'Illinois' && selectedRace === 'Asian' && `Number of opportunity districts in current district plan for Asians: 0`}
        {appState === 'Illinois' && selectedRace === 'African' && `Number of opportunity districts in current district plan for African American: 8`}
      </p>
    </div>
  );
};

export default OpportunityDistrictsBarChart;
