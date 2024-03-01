import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import React, { useState } from 'react';


const EcologicalInferencePlot = () => {
  const [selectedRace, setSelectedRace] = useState('Hispanic');

  const binCount = 30;
  const labels = Array.from({length: binCount}, (_, i) => -1 + (2 / binCount) * i);

  // Step 2: Generate random data for each bin
  const randomData = labels.map(label => {
    if (label >= 0.5 && label <= 0.6) {
      // Values closer to 3.5 for labels between 0.5 and 1
      return 3.5 - Math.abs(Math.random() * 0.5);
    }else if (label < 0) {
      return Math.random(); 
    }
    else {
      return Math.random() * 3.5;
    }
  });
  console.log('Labels:', labels);
  console.log('Random Data:', randomData);
  const data = {
    labels,
    datasets: [
      {
        label: 'Support for Senator Democrats',
        data: randomData,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        barThickness: 'flex', 
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      x: {
        min: -1.0,
        max: 1.0,
        title: {
          display: true,
          text: `${selectedRace} - Non${selectedRace} support for Senator Democrats`,
        },
        stacked: true, 
        ticks: {
          stepSize: 0.2 
        },
        type: 'linear',
        position: 'bottom',
      },
      y: {
        title: {
          display: true,
          text: 'Frequency',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  const handleRaceChange = (event) => {
    setSelectedRace(event.target.value);
  };

  return (
    <div>
      <select value={selectedRace} onChange={handleRaceChange} className="text-lg bg-blue-100 text-blue-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600">
        <option value="Hispanic">Hispanic</option>
        <option value="White">White</option>
        <option value="Asian">Asian</option>
        <option value="African">African</option>
      </select>
      <Chart type='bar' data={data} options={options} />
    </div>
  );
};

export default EcologicalInferencePlot;
