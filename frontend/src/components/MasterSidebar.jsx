import React, { useState, useEffect, useRef } from 'react';
import './MasterSidebar.css';
import EthnicityBarChart from './EthnicityBarChart';
import ChartModal from './Modal';
import ChartSelection from './ChartSelection';
import StateAssemblyTable from './StateAssemblyTable';
import Filter from './Filter';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import StateDataSummary from './StateDataSummary';
import EnsembleSummaryTable from './EnsembleSummaryTable';
import RedistrictingSummary from './RedistrictingSummary';

const charts = [
  { id: 'ethnicityBarChart', name: 'Ethnicity Bar Chart' },
  { id: 'ecologicalInferencePlot', name: 'Ecological Inference Plot' },
  { id: 'ethnicityBarChartPop', name: 'Ethnicity Bar Chart Pop' },
  { id: 'feasibleOpportunityDistrictsTable', name: 'Feasible Opportunity Districts Table' },
  { id: 'opportunityDistrictsBarChart', name: 'Opportunity Districts Bar Chart' },
  { id: 'precinctAnalysisChart', name: 'Precinct Analysis Chart' },
  { id: 'precinctAnalysisTable', name: 'Precinct Analysis Table' },
  // { id: 'minorityRepresentationAllDistricts', name: 'Minority Representation Across All Districts' },
  { id: 'minorityRepresentation9Districts', name: 'ReCom Ensemble Plot' },
  // { id: 'ethnicityBarChartPopANDethnicityBarChart', name: 'Ethnicity Bar Chart vs Ethnicity Bar Chart Pop' },
  // { id: 'stateDataSummary', name: 'State Data Summary' },
  { id: 'voteShareSeatShareCurve', name: 'Vote Share vs. Seat Share Curve' },
];


const MasterSidebar = (props) => {
  const [selectedTab, setSelectedTab] = useState('State');
  const [selectedParty, setSelectedParty] = useState('none');
  const [selectedOperation, setSelectedOperation] = useState('AND');
  const [selectedRace, setSelectedRace] = useState('none');
  const parentRef = useRef(null); 
  const [height, setHeight] = useState(window.innerHeight); 

  const updateHeight = () => {
    if (parentRef.current) {
      setHeight(parentRef.current.clientHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateHeight);
    updateHeight();

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);
  const handleChange = (event) => {
    setSelectedTab(event.target.value);
  };

  useEffect(() => {
    setHeight(parentRef.current ? parentRef.current.clientHeight : 300);
  }, [selectedTab]);

  //debug use
  useEffect(() => {
    console.log("The current is", selectedParty, selectedOperation, selectedRace)
  }, [selectedParty, selectedOperation, selectedRace])

  const renderChart = () => {
    switch (selectedTab) {
      case 'State':
        return (<>
          <ChartSelection setChartSelection={props.setChartSelection} chartSelection={props.chartSelection} charts={charts} />
          <ChartModal charts={charts} chartSelection={props.chartSelection} />
        </>);
      case 'District':
        return (<>
          <Filter setSelectedParty={setSelectedParty} setSelectedOperation={setSelectedOperation} setSelectedRace={setSelectedRace} />
          <StateAssemblyTable selectedParty={selectedParty} selectedOperation={selectedOperation} selectedRace={selectedRace} />
        </>);
      default:
        return <EthnicityBarChart />;
    }
  };
  useEffect(() => {
    console.log("Checking selected tab:", selectedTab);
  }, [selectedTab])



  return (
      <ResizableBox
        ref={parentRef}
        width={500}
        height={height} 
        className="absolute bg-white border-solid border-2 collapse-arrow rounded-tr-none rounded-l-none left-0 top-0 z-40 collapse bg-base-200"
        minConstraints={[100, 300]}
        maxConstraints={[1200, 1100]}
        resizeHandles={['e']}
        style={{ backgroundColor: 'white' }}
      >
      <div className="absolute bg-white border-solid border-2 collapse-arrow rounded-tr-none rounded-l-none left-0 top-0 z-40 collapse" style={{ width: '99%' }}>
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
        <div className="collapse-content bg-white text-primary-content peer-checked:text-secondary-content py-2">
          {renderChart()}
        </div>
      </div>
      <div className="mt-24">
        <StateDataSummary/>
        <RedistrictingSummary/>
        <EnsembleSummaryTable/>
      </div>
    </ResizableBox>
  );
};
export default MasterSidebar;