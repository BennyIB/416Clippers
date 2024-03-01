import EthnicityBarChart from '../components/EthnicityBarChart';
import EcologicalInferencePlot from '../components/EcologicalInferencePlot';
import EthnicityBarChartPop from '../components/EthnicityBarChartPop';
import PrecinctAnalysisChart from '../components/PrecinctAnalysisChart';
import { useState } from 'react';
const ChartModal = (props) => {
    const [selectedChart, setSelectedChart] = useState('');
    // Function to render the selected chart
    const renderChart = () => {
        switch (selectedChart) {
            case 'ethnicityBarChart':
                return <EthnicityBarChart />;
            case 'ecologicalInferencePlot':
                return <EcologicalInferencePlot />;
            case 'ethnicityBarChartPop':
                return <EthnicityBarChartPop />;
            case 'precinctAnalysisChart':
                return <PrecinctAnalysisChart />;
            case 'minorityRepresentationAllDistricts':
                return <img src="/all.png" alt="minority representation image" />;
            case 'minorityRepresentation9Districts':
                return <img src="/nine.png" alt="minority representation image" />;
            //temporary. scrap later. need revamp
            case 'ethnicityBarChartPopANDethnicityBarChart':
                return <>
                    <EthnicityBarChart />;
                    <EthnicityBarChartPop />;
                </>
            default:
                return <EthnicityBarChart />;
        }
    };

    return (
        <div className="fixed inset-0 bg-white-600 bg-opacity-50 flex justify-center items-center z-50">
            <div
                className="bg-white p-5 rounded-lg shadow-lg"
                style={{
                    width: '600px',
                    height: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    overflow: 'auto'
                }}
            >
                <h2 className="text-lg text-black font-bold text-center">{props.state} Data</h2>

                <select
                    value={selectedChart}
                    onChange={(e) => setSelectedChart(e.target.value)}
                    className="mb-4"
                    style={{
                        backgroundColor: 'gray',
                        color: 'white',
                        border: 'none',
                        padding: '5px',
                        borderRadius: '5px',
                    }}
                >

                    <option value="ethnicityBarChart">Ethnicity Bar Chart</option>
                    <option value="ecologicalInferencePlot">Ecological Inference Plot</option>
                    <option value="ethnicityBarChartPop">Ethnicity Bar Chart Pop</option>
                    <option value="precinctAnalysisChart">Precinct Analysis Chart</option>
                    <option value="minorityRepresentationAllDistricts">Minority Representation Across All Districts</option>
                    <option value="minorityRepresentation9Districts">Minority Representation Across 9 Congressional Districts</option>
                    <option value="ethnicityBarChartPopANDethnicityBarChart">Ethnicity Bart Chart vs Enthincity Bart Chart Pop</option>

                </select>


                <div className="flex-grow">
                    {renderChart()}
                </div>

                <div className="flex justify-center" >
                    <button
                        onClick={() => props.setShowModal(false)}
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>

    );
}
export default ChartModal;