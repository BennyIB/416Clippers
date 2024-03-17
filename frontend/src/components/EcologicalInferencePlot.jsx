import React, {useState, useEffect} from 'react';
import { Chart, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const EcologicalInferencePlot = () => {
    const [selectedRace, setSelectedRace] = useState('Latino');

    // Example left-skewed data
    const getDataPoints = (race) => {
        switch (race) {
            case 'Latino':
                // Example left-skewed data for Hispanic
                return [1, 2, 4, 6, 8, 10, 12, 14, 16, 17, 18, 18, 17, 16, 15, 13, 1];
            case 'Black':
                // Example right-skewed data for Black
                return [10, 9, 8, 7, 6, 5, 4, 3, 3, 3, 4, 5, 6, 8, 10, 13, 15];
            case 'White':
                // Example normal distribution data for White
                return [2, 3, 5, 7, 10, 12, 15, 15, 15, 14, 13, 11, 9, 7, 5, 3, 2];
            case 'Asian':
                // Example uniformly distributed data for Asian
                return [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
            default:
                return [1, 1, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 17, 18, 17, 15, 1];
        }
    };

    const dataPoints = getDataPoints(selectedRace);


    const labels = dataPoints.map((_, index) => {
        const normalizedIndex = index / (dataPoints.length - 1);
        const scaledValue = normalizedIndex * 2 - 1;
        return `${scaledValue.toFixed(2)}`;
      });
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Probability Distribution',
                data: dataPoints,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: `${selectedRace} - Non${selectedRace} support for Senator Democrats`,
                },
            },
            y: {
                beginAtZero: true
            }
        }
    };

    const handleRaceChange = (event) => {
        setSelectedRace(event.target.value);
    };

    return (
        <div>
            <select value={selectedRace} onChange={handleRaceChange} className="text-lg bg-blue-100 text-blue-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option value="Latino">Latino</option>
                <option value="White">White</option>
                <option value="Asian">Asian</option>
                <option value="African">African</option>
            </select>
            <Line data={chartData} options={options} />
        </div>
    );

};

export default EcologicalInferencePlot;
