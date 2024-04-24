import React, { useState, useEffect } from 'react';
import './MasterSidebar.css';
import EthnicityBarChart from './EthnicityBarChart';
import ChartModal from './Modal';
import ChartSelection from './ChartSelection';
import StateAssemblyTable from './StateAssemblyTable';
import StateDataSummary from './StateDataSummary';
import OpportunityDistrictsBarChart from './OpportunityDistrictsBarChart';



const charts = [
  { id: 'ethnicityBarChart', name: 'Ethnicity Bar Chart' },
  { id: 'ecologicalInferencePlot', name: 'Ecological Inference Plot' },
  { id: 'ethnicityBarChartPop', name: 'Ethnicity Bar Chart Pop' },
  { id: 'precinctAnalysisChart', name: 'Precinct Analysis Chart' },
  // { id: 'minorityRepresentationAllDistricts', name: 'Minority Representation Across All Districts' },
  { id: 'minorityRepresentation9Districts', name: 'ReCom Ensemble Plot' },
  { id: 'ethnicityBarChartPopANDethnicityBarChart', name: 'Ethnicity Bar Chart vs Ethnicity Bar Chart Pop' },
  { id: 'stateDataSummary', name: 'State Data Summary' },
  { id: 'feasibleOpportunityDistrictsTable', name: 'Feasible Opportunity Districts Table' }, 
  { id: 'opportunityDistrictsBarChart', name: 'Opportunity Districts Bar Chart' },
  { id: 'precinctAnalysisTable', name: 'Precinct Analysis Table' },



];


const MasterSidebar = (props) => {
  const [selectedTab, setSelectedTab] = useState('State');

  // Handle changing the selected tab
  const handleChange = (event) => {
    setSelectedTab(event.target.value);
  };

  const renderChart = () => {
    switch (selectedTab) {
      case 'State':
        return (<>
                <ChartSelection setChartSelection={props.setChartSelection} chartSelection={props.chartSelection} charts={charts}/>
                <ChartModal charts={charts} chartSelection={props.chartSelection}/>
              </>);
      case 'District':
        return <StateAssemblyTable />;
      default:
        return <EthnicityBarChart/>; 
    }
  };

  // debug print statement
  useEffect(() => {
    console.log("The selected tab is", selectedTab);
  }, [selectedTab])



  return (
    <div className="absolute bg-white border-solid border-2 collapse-arrow rounded-tr-none rounded-l-none left-0 top-0 w-2/5 z-40 collapse bg-base-200">
      <input type="checkbox" className="peer" />
      <div className="collapse-title text-primary-content my-1.5 bg-white peer-checked:text-secondary-content">
        <div className="flex justify-center relative z-50">
          <div role="tablist" className="tabs tabs-bordered absolute">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab text-black text-lg"
              aria-label="State"
              value="State"
              checked={selectedTab === 'State'}
              onChange={handleChange}
            />
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab text-black text-lg"
              aria-label="District"
              value="District"
              checked={selectedTab === 'District'}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="collapse-content bg-white text-primary-content peer-checked:text-secondary-content">
        {renderChart()}
      </div>
    </div>
  );
};

export default MasterSidebar;