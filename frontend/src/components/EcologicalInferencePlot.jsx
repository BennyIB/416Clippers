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
                return [0.0,0.21,0.62,1.03,1.44,1.85,2.26,2.68,3.09,3.29,3.5,3.5,3.29,3.09,2.88,2.47,0.0
                ];
            case 'Black':
                // Example right-skewed data for Black
                return [2.04,1.75,1.46,1.17,0.88,0.58,0.29,0.0,0.0,0.0,0.29,0.58,0.88,1.46,2.04,2.92,3.5
                ];
            case 'White':
                // Example normal distribution data for White
                return [0.0,0.27,0.81,1.35,2.15,2.69,3.5,3.5,3.5,3.23,2.96,2.42,1.88,1.35,0.81,0.27,0.0
                ];
            case 'Asian':
                // Example uniformly distributed data for Asian
                return [0.47,0.76,1.14,1.60,2.12,2.64,3.09,3.39,3.5,3.39,3.09,2.64,2.12,1.60,1.14,0.76,0.47
                ];
            default:
                return [0.0,0.0,0.0,0.21,0.41,0.62,0.82,1.03,1.44,1.85,2.26,2.88,3.29,3.5,3.29,2.88,0.0
                ];
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
            beginAtZero: true,
            title: {
                display: true,
                text: 'Density', // Label for the Y-axis
            }
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
