import EthnicityBarChart from './EthnicityBarChart';
import EcologicalInferencePlot from './EcologicalInferencePlot';
import EthnicityBarChartPop from './EthnicityBarChartPop';
import PrecinctAnalysisChart from './PrecinctAnalysisChart';
import ProportionalDifferenceTable from './ProportionalDifferenceTable';
import StateDataSummary from './StateDataSummary';
import FeasibleOpportunityDistrictsTable from './FeasibleOpportunityDistrictsTable'; 
import OpportunityDistrictsBarChart from './OpportunityDistrictsBarChart';
import PrecinctAnalysisTable from './PrecinctAnalysisTable';
import BoxAndWhisker from './BoxAndWhisker';
import SeatShareCurve from './SeatShareCurve';


import { useState, useEffect } from 'react';
import BoxAndWhiskerChart from './BoxAndWhisker';

const ChartModal = (props) => {
    const [localChartSelection, setLocalChartSelection] = useState('ethnicityBarChartPop');
    function getIdByName(chartName) {
        const chart = props.charts.find(chart => chart.name === chartName);
        return chart ? chart.id : 'Chart name not found';
      }
    const renderChart = () => {
        switch (getIdByName(props.chartSelection)) {
            case 'ethnicityBarChart':
                return <EthnicityBarChart />;
            case 'ecologicalInferencePlot':
                return <EcologicalInferencePlot />;
            case 'ethnicityBarChartPop':
                return <EthnicityBarChartPop />;
            case 'precinctAnalysisChart':
                return <PrecinctAnalysisChart />;
            case 'minorityRepresentation9Districts':
                return <BoxAndWhisker />;
            case 'stateDataSummary':  
                return <StateDataSummary/>;
            case 'feasibleOpportunityDistrictsTable':
                return <FeasibleOpportunityDistrictsTable />;
            case 'opportunityDistrictsBarChart': 
                return <OpportunityDistrictsBarChart />;
            case 'precinctAnalysisTable':
                return <PrecinctAnalysisTable />;
            case 'voteShareSeatShareCurve': 
                return <SeatShareCurve />;
            //temporary. scrap later. need revamp
            case 'ethnicityBarChartPopANDethnicityBarChart':
                return (
                    <>
                        <select 
                            value={localChartSelection} 
                            className="text-lg bg-blue-100 text-blue-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            onChange={(e) => setLocalChartSelection(e.target.value) }
                        >
                            <option value="ethnicityBarChartPop">Ethnicity Bar Chart Pop</option>
                            <option value="ethnicityBarChart">Ethnicity Bar Chart</option>
                        </select>
                        {localChartSelection === 'ethnicityBarChartPop' ? 
                            <EthnicityBarChartPop /> : <EthnicityBarChart />}
                        <ProportionalDifferenceTable/>
                    </>
                );
            default:
                console.log("Chart was not found");
                return;
        }
    };
    return (
            <div>
                <div className="flex-grow">
                    {renderChart()}
                </div>
            </div>
    );
}
export default ChartModal;