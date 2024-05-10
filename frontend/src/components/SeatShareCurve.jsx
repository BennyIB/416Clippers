// Import necessary components and modules
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppState } from '../AppStateContext';


// Register the required components
ChartJS.register(...registerables);

const SeatShareCurve = () => {
  // State to hold the fetched data
  const [chartData, setChartData] = useState({ datasets: [] });

  const { appState } = useAppState();

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      // Convert the first character to lowercase for consistent URLs
      const state = appState.charAt(0).toLowerCase() + appState.slice(1);

      // Fetch data from the backend based on the selected state
      const response = await axios.get(`http://localhost:8080/api/${state}/vote-seat-share`);

      console.log('API Response:', response);

      // Extract the data points from the response
      const dataPoints = response.data.dataPoints;

      // Separate into Republican and Democrat data
      const dataPointsVotesSeatsR = dataPoints.map(point => ({
        x: point.votes,
        y: point.seatsR
      }));

      const dataPointsVotesSeatsD = dataPoints.map(point => ({
        x: point.votes,
        y: point.seatsD
      }));

      // Prepare chart data
      setChartData({
        datasets: [
          {
            label: 'Republican Seat Share',
            data: dataPointsVotesSeatsR,
            borderColor: 'rgb(255, 99, 132)', // Red for Republicans
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointRadius: 0,
            borderWidth: 2,
            fill: false,
            tension: 0.10 // Adds a slight curve to the line
          },
          {
            label: 'Democrat Seat Share',
            data: dataPointsVotesSeatsD,
            borderColor: 'rgb(54, 162, 235)', // Blue for Democrats
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            pointRadius: 0,
            borderWidth: 2,
            fill: false,
            tension: 0.10 // Adds a slight curve to the line
          }
        ]
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [appState]);

  // Chart options
  const chartOptions = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Vote Share (%)'
        },
        min: 0,
        max: 100
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Seat Share (%)'
        },
        min: 0,
        max: 100
      }
    },
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Seat Share vs. Vote Share Curve'
      }
    }
  };

  // Render the Line chart
  return <Line data={chartData} options={chartOptions} />;
};

export default SeatShareCurve;
