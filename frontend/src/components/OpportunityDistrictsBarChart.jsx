import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useAppState } from '../AppStateContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OpportunityDistrictsBarChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedRace, setSelectedRace] = useState('Latino'); // Default to Latino
  const { appState } = useAppState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const state = appState.charAt(0).toLowerCase() + appState.slice(1);
        const response = await axios.get(`http://localhost:8080/api/${state}/opportunity-districts`, {
          params: { race: selectedRace } // Use the selected race in API request
        });
        setChartData({
          labels: response.data.x_points,
          datasets: [{
            label: `${selectedRace} Opportunity Districts`,
            data: response.data.y_points,
            backgroundColor: 'rgba(139, 0, 0, 0.5)',
            borderColor: 'rgba(139, 0, 0, 1)',
            borderWidth: 1,
          }],
        });
      } catch (error) {
        console.error('Error fetching opportunity district data:', error);
      }
    };

    fetchData();
  }, [appState, selectedRace]); // Add selectedRace to dependency array

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
        text: `${selectedRace} Opportunity Districts`,
      },
    },
  };

  return (
    <div>
      <h2>Distribution of Opportunity Districts in {appState}</h2>
      <select id="race-select"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white text-black"
        value={selectedRace}
        onChange={handleRaceChange}
      >
        <option value="Latino">Latino</option>
        <option value="African">African American</option>
        <option value="Asian">Asian</option>
      </select>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default OpportunityDistrictsBarChart;
