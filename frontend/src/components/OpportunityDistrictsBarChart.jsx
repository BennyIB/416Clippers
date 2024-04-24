import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OpportunityDistrictsBarChart = () => {
  const [selectedRacialGroup, setSelectedRacialGroup] = useState('Black/African American');

  // Example hardcoded data for each racial group
  const dataForGroups = {
    'Black/African American': [5, 3, 4, 6, 2],
    'Hispanic/Latino': [2, 3, 7, 5, 1],
    'White/Caucasian': [8, 7, 9, 6, 5],
    'Asian': [1, 2, 2, 3, 1],
  };

  // Labels for the districts, these should match the length of your data arrays
  const districtLabels = ['District 1', 'District 2', 'District 3', 'District 4', 'District 5'];

  const data = {
    labels: districtLabels,
    datasets: [
      {
        label: `${selectedRacialGroup} Opportunity Districts`,
        data: dataForGroups[selectedRacialGroup],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      }
    ],
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
        text: `Opportunity Districts for ${selectedRacialGroup}`,
      },
    },
  };

  // This function can be linked to a select input for choosing racial groups, for example
  const handleRacialGroupChange = (e) => {
    setSelectedRacialGroup(e.target.value);
  };

  return (
    <div>
      <label htmlFor="racialGroup">Select Racial/Ethnic Group:</label>
      <select id="racialGroup" onChange={handleRacialGroupChange} value={selectedRacialGroup}>
        <option value="Black/African American">Black/African American</option>
        <option value="Hispanic/Latino">Hispanic/Latino</option>
        <option value="White/Caucasian">White/Caucasian</option>
        <option value="Asian">Asian</option>
        {/* Add more options for racial groups as needed */}
      </select>

      <div>
        <h2>Distribution of Opportunity Districts</h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default OpportunityDistrictsBarChart;
