import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BoxAndWhiskerChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/box-whisker-data');
        console.log("THE DATA", response.data);
        const data = response.data.map(item => ({
          label: item.rank-1,
          actual: item.actual,
          y: [item.min, item.q1, item.q3, item.max, item.median]
        }));
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    theme: "light2",
    animationEnabled: true,
    title: {
      text: "Arizona ReCom (Minority Group: Hispanic)"
    },
    axisY: {
      title: "Hispanic Population Percentage"
    },
    axisX: {
      title: "Districts"
    },
    data: [{
      type: "boxAndWhisker",
      showInLegend: true,
      legendText: "ReCom Ensemble",
      yValueFormatString: "#,##0.# \"%\"",
      dataPoints: chartData.map(item => ({
        label: item.label,
        y: item.y,
      }))}, {
      type: "scatter",
      color: "red",
      showInLegend: true,
      legendText: "Enacted",
      markerSize: 10,
      toolTipContent: "Actual Hispanic Population Percentage: {y}%",
      dataPoints: chartData.map(item => ({
        x: item.label,
        y: item.actual,
      })) }]
      
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default BoxAndWhiskerChart;
