import EthnicityBarChart from './EthnicityBarChart';
import EcologicalInferencePlot from './EcologicalInferencePlot';
import EthnicityBarChartPop from './EthnicityBarChartPop';
import PrecinctAnalysisChart from './PrecinctAnalysisChart';
import ProportionalDifferenceTable from './ProportionalDifferenceTable';
import { useState } from 'react';
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
                return <img src="/nine.png" alt="minority representation image" />;
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