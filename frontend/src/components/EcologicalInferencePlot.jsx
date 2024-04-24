import React, { useState, useEffect } from 'react';
import { Chart, Line } from 'react-chartjs-2';
import 'chart.js/auto';
const EcologicalInferencePlot = () => {
    const [selectedRace, setSelectedRace] = useState('Latino');
    const [selectedElection, setSelectedElection] = useState('2020');

    // Election years as an example. This could be expanded or fetched from a database
    const elections = ['2020', '2018', '2016'];

    const getDataPoints = (race) => {
        switch (race) {
            case 'Latino':
                return [0.0,0.21,0.62,1.03,1.44,1.85,2.26,2.68,3.09,3.29,3.5,3.5,3.29,3.09,2.88,2.47,0.0];
            case 'Black':
                return [2.04,1.75,1.46,1.17,0.88,0.58,0.29,0.0,0.0,0.0,0.29,0.58,0.88,1.46,2.04,2.92,3.5];
            case 'White':
                return [0.0,0.27,0.81,1.35,2.15,2.69,3.5,3.5,3.5,3.23,2.96,2.42,1.88,1.35,0.81,0.27,0.0];
            case 'Asian':
                return [0.47,0.76,1.14,1.60,2.12,2.64,3.09,3.39,3.5,3.39,3.09,2.64,2.12,1.60,1.14,0.76,0.47];
            default:
                return [0.0,0.0,0.0,0.21,0.41,0.62,0.82,1.03,1.44,1.85,2.26,2.88,3.29,3.5,3.29,2.88,0.0];
        }
    };
    const dataPoints = getDataPoints(selectedRace);

    const labels = dataPoints.map((_, index) => `${(index / (dataPoints.length - 1) * 100).toFixed(2)}%`);
    
    const chartData = {
        labels,
        datasets: [
            {
                label: `Probability of ${selectedRace} voting for Candidate`,
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
                    text: 'Percentage of Racial/Ethnic Group Voting for Candidate',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Probability Value',
                }
            }
        }
    };
    const handleRaceChange = (event) => {
        setSelectedRace(event.target.value);
    };

    const handleElectionChange = (event) => {
        setSelectedElection(event.target.value);
    };

    return (
        <div>
            <div>
                <label>Choose a race:</label>
                <select value={selectedRace} onChange={handleRaceChange} className="text-lg bg-white border-solid border-2 text-black rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="Latino">Latino</option>
                    <option value="White">White</option>
                    <option value="Asian">Asian</option>
                    <option value="Black">Black</option>
                </select>
            </div>
            <div>
                <label>Choose an election year:</label>
                <select value={selectedElection} onChange={handleElectionChange} className="text-lg bg-white border-solid border-2 text-black rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
                    {elections.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <Line data={chartData} options={options} />
        </div>
    );
};
export default EcologicalInferencePlot;