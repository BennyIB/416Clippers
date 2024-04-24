import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import regression from 'regression';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import annotationPlugin from 'chartjs-plugin-annotation';
ChartJS.register(annotationPlugin);
const PrecinctAnalysisChart = () => {
  const [selectedRace, setSelectedRace] = useState('Latino');
  const [dataPoints, setDataPoints] = useState({
    democratPoints: [],
    republicanPoints: [],
    democratEquation: '', 
    republicanEquation: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/arizona/vote-shares/precinct-analysis');
        if (response.data && response.data.democratPoints && response.data.republicanPoints) {
          setDataPoints({
            democratPoints: response.data.democratPoints,
            republicanPoints: response.data.republicanPoints,
            democratEquation: response.data.equationDemocrat ,
            republicanEquation: response.data.equationRepublican,
          });
          console.log('Fetched equations:', response.data.equationDemocrat, response.data.equationRepublican);
        } else {
          // If the expected properties aren't in the response, log the entire response for debugging
          console.error("Unexpected response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
    fetchData();
  }, []); 

  const generatePointsFromEquation = (equation) => {
    // Parse the coefficients from the equation string
    const coeffs = equation.match(/[-+]?[0-9]*\.?[0-9]+/g).map(Number);

    console.log('Coefficients:', coeffs);
    
    // Generate points using the parsed coefficients and the equation of a quadratic function
    return Array.from({ length: 100 }, (_, x) => ({
      x: x,
      y: coeffs[0] * x**2 + coeffs[2] * x + coeffs[3]
    }));
  };

  const democratRegressionCurve = dataPoints.democratEquation ? generatePointsFromEquation(dataPoints.democratEquation) : [];
  const republicanRegressionCurve = dataPoints.republicanEquation ? generatePointsFromEquation(dataPoints.republicanEquation) : [];
  

  //   const result = regression.polynomial(dataPoints.democratPoints.map(point => [point.x, point.y]), { order: 2 });
  //   const result2 = regression.polynomial(dataPoints.republicanPoints.map(point => [point.x, point.y]), { order: 2 });

  //   const regressionCurveKelly = Array.from({ length: 100 }, (_, index) => ({
  //     x: index,
  //     y: result.predict(index)[1]
  //   }));

    
  //   const regressionCurveMcSally = Array.from({ length: 100 }, (_, index) => ({
  //     x: index,
  //     y: result2.predict(index)[1]
  //   }));
  //   const maxRegressionPointKelly = regressionCurveKelly.reduce((max, p) => p.y > max.y ? p : max, regressionCurveKelly[0]);
  //   const maxPointKelly = maxRegressionPointKelly.y;
  //   const maxPointKellyX = maxRegressionPointKelly.x;

  //   // Get the min Y-value and its corresponding X-value from the McSally regression curve
  //   const minRegressionPointMcSally = regressionCurveMcSally.reduce((min, p) => p.y < min.y ? p : min, regressionCurveMcSally[0]);
  //   const minPointMcSally = minRegressionPointMcSally.y;
  //   const minPointMcSallyX = minRegressionPointMcSally.x;

  //   const absoluteDifference = maxPointKelly - minPointMcSally;

  //   // Calculate the percentage difference relative to the McSally's minimum value
  //   const percentageDifference = (absoluteDifference / minPointMcSally) * 100;

  const data = {
    datasets: [
      {
        label: 'Democrat Vote Share',
        data: dataPoints.democratPoints,
        backgroundColor: 'rgba(53, 162, 235, 0.5)', // Color for Mark Kelly
      },
      {
        label: 'Republican Vote Share',
        data: dataPoints.republicanPoints,
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Color for Martha McSally
      },
      {
        label: 'Democrat',
        data: democratRegressionCurve,
        type: 'line',
        borderColor: 'rgba(53, 162, 235, 1)', // Line color for Mark Kelly
        borderWidth: 2,
        fill: false,
        showLine: true,
        pointRadius: 0,
      },
      {
        label: 'Republican Regression Line',
        data: republicanRegressionCurve,
        type: 'line',
        borderColor: 'rgba(255, 99, 132, 1)', // Line color for Martha McSally
        borderWidth: 2,
        fill: false,
        showLine: true,
        pointRadius: 0,
      }
    ]
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: `Percent ${selectedRace}`
        }
      },
      y: {
        title: {
          display: true,
          text: 'Vote Share'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Vote Share vs. Percent ${selectedRace}`
      },
      // annotation: {
      //   annotations: {
      //     line1: {
      //       type: 'line',
      //       xMin: maxPointKellyX,
      //       xMax: maxPointKellyX,
      //       yMin: maxPointKelly,
      //       yMax: minPointMcSally,
      //       borderColor: 'black',
      //       borderWidth: 3,
      //       //borderDash: [6, 6],
      //     },
          
      //     label1: {
      //       type: 'label',
      //       xValue: (maxPointKellyX + minPointMcSallyX) / 2 - 10,
      //       yValue: (maxPointKelly + minPointMcSally) / 2  + 20,
      //       content: `Diff: ${percentageDifference.toFixed(2)}%`, // Display the difference as a percentage
      //       backgroundColor: 'rgba(0, 0, 0, 0.8)',
      //       borderColor: 'black',
      //       borderWidth: 2,
      //       borderRadius: 4,
      //       color: 'white',
      //       font: {
      //         size: 12
      //       },
      //       xPadding: 6,
      //       yPadding: 6
      //     }          
      //   }
      // }
    }
  };
  


  const handleRaceChange = (event) => {
    setSelectedRace(event.target.value);
  };

  return (
    <div>
      <select value={selectedRace} onChange={handleRaceChange} className="text-lg bg-white text-black border-solid border-2 mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
        <option value="Latino">Latino</option>
        <option value="White">White</option>
        <option value="Asian">Asian</option>
        <option value="African">African</option>
      </select>
      <Scatter data={data} options={options} />
    </div>
  );
};
export default PrecinctAnalysisChart;
