import { Box } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import boxplotPlugin from 'chartjs-chart-box-and-violin-plot';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Register the boxplot plugin and the rest of the chart.js features
ChartJS.register(...registerables, boxplotPlugin);

const BoxAndWhiskerChart = () => {
  const [dataPoints, setDataPoints] = useState({
    boxPlotData: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get('http://localhost:8080/api/your-endpoint');
        if (response.data) {
          
          setDataPoints({
            boxPlotData: response.data,
          });
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
    datasets: dataPoints.boxPlotData.map((districtData, index) => ({
      label: `District ${index + 1}`,
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderColor: 'rgba(53, 162, 235, 1)',
      borderWidth: 1,
      outlierColor: '#999999',
      padding: 10,
      itemRadius: 0,
      data: [districtData]
    })),
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        // Configure your scales as needed
        title: {
          display: true,
          text: 'Districts'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Percentage of Hispanic Population'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Box and Whisker Chart of Hispanic Population by District'
      }
    }
  };

  return (
    <div>
      {/* Render your chart here */}
      <Box data={data} options={options} />
    </div>
  );
};

export default BoxAndWhiskerChart;
