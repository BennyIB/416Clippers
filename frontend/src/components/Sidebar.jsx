import React from 'react';

const Sidebar = ({ setChartSelection, handleCloseSideBar }) => {
  const charts = [
    { id: 'ethnicityBarChart', name: 'Ethnicity Bar Chart' },
    { id: 'ecologicalInferencePlot', name: 'Ecological Inference Plot' },
    { id: 'ethnicityBarChartPop', name: 'Ethnicity Bar Chart Pop' },
    { id: 'precinctAnalysisChart', name: 'Precinct Analysis Chart' },
    // { id: 'minorityRepresentationAllDistricts', name: 'Minority Representation Across All Districts' },
    { id: 'minorityRepresentation9Districts', name: 'ReCom Ensemble Plot' },
    { id: 'ethnicityBarChartPopANDethnicityBarChart', name: 'Ethnicity Bar Chart vs Ethnicity Bar Chart Pop' },
  ];

  return (
    <div className="absolute left-0 top-0 h-full bg-gray-800 text-white shadow-xl z-50 w-64">
      <div className="flex justify-between items-center p-5 border-b border-gray-600">
        <h2 className="text-3xl font-bold">Charts</h2>
        <button 
          onClick={handleCloseSideBar} 
          className="text-lg font-semibold hover:bg-red-600 hover:text-white-500 mb-2 bg-gray-700 text-white cursor-pointer"
        >
          ×
        </button>
      </div>
      <br></br>
      <ul className="px-5">
        {charts.map(chart => (
          <li key={chart.id} className="mb-2">
            <button
              className="text-left w-full py-2 px-4 rounded transition-colors duration-150 hover:bg-blue-600 hover:bg-opacity-25 mb-2 bg-gray-700 text-white rounded cursor-pointer"
              onClick={() => setChartSelection(chart.id)}
            >
              {chart.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
