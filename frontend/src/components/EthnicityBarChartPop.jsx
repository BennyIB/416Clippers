import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const EthnicityBarChartPop = () => {
  const [populationData, setPopulationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get('http://localhost:8080/api/arizona/ethnicity-population');
        if (response.data && response.data.populations) {
          setPopulationData(response.data.populations);
        } else {
          console.error("Unexpected response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ['Black/African American', 'Hispanic/Latino', 'White/Caucasian', 'Asian'],
    datasets: [
      {
        label: 'Number of People in Arizona in millions',
        data: populationData,
        backgroundColor: [
          'rgba(204, 51, 102, 0.7)', 
          'rgba(43, 130, 188, 0.7)', 
          'rgba(204, 165, 69, 0.7)', 
          'rgba(60, 154, 154, 0.7)'  
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    legend: {
      labels: {
        fontSize: 26
      }
    }
  };
  return <Bar data={data} options={options} />;
};
export default EthnicityBarChartPop; 