import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import regression from 'regression';


ChartJS.register(...registerables);

function quadraticGrowth(x, a, b, c) {
    return a * Math.pow(x, 2) + b * x + c;
  }
  
  function squareRootGrowth(x, a, b) {
    return -a * Math.sqrt(x) + b;
  }
  
  const quadraticPointsKelly = Array.from({ length: 100 }, (_, index) => ({
    x: index,
    y: quadraticGrowth(index, 1, 0, 0) * (0.5 + Math.random() * 0.5)
  }));
  
  const squareRootPointsMcSally = Array.from({ length: 100 }, (_, index) => ({
    x: index,
    y: squareRootGrowth(index, 500, 8000) * (0.5 + Math.random() * 0.5)
  }));

  const result = regression.polynomial(quadraticPointsKelly.map(point => [point.x, point.y]), { order: 2 });
  const result2 = regression.polynomial(squareRootPointsMcSally.map(point => [point.x, point.y]), { order: 2 });


  const regressionCurveKelly = Array.from({ length: 100 }, (_, index) => ({
    x: index,
    y: result.predict(index)[1]
  }));

  
  const regressionCurveMcSally = Array.from({ length: 100 }, (_, index) => ({
    x: index,
    y: result2.predict(index)[1]
  }));

const data = {
  datasets: [
    {
      label: 'Mark Kelly Vote Share',
      data: quadraticPointsKelly,
      backgroundColor: 'rgba(53, 162, 235, 0.5)', // Color for Mark Kelly
    },
    {
      label: 'Martha McSally Vote Share',
      data: squareRootPointsMcSally,
      backgroundColor: 'rgba(255, 99, 132, 0.5)', // Color for Martha McSally
    },
    {
      label: 'Kelly Regression Line',
      data: regressionCurveKelly,
      type: 'line',
      borderColor: 'rgba(53, 162, 235, 1)', // Line color for Mark Kelly
      borderWidth: 2,
      fill: false,
      showLine: true,
      pointRadius: 0,
    },
    {
      label: 'McSally Regression Line',
      data: regressionCurveMcSally,
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
        text: 'Percent Latino'
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
      text: 'Vote Share vs. Percent Latino'
    }
  }
};

const PrecinctAnalysisChart = () => {
  return <Scatter data={data} options={options} />;
};

export default PrecinctAnalysisChart;
