import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

const EcologicalInferencePlot = () => {
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
        label: 'Support for Kelly',
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
          text: 'Hispanic - Nonhispanic support for Kelly',
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

  return <Chart type='bar' data={data} options={options} />;
};

export default EcologicalInferencePlot;
