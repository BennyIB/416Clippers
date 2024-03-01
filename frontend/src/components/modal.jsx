import EthnicityBarChart from '../components/EthnicityBarChart';
import EcologicalInferencePlot from '../components/EcologicalInferencePlot';
import EthnicityBarChartPop from '../components/EthnicityBarChartPop';
import PrecinctAnalysisChart from '../components/PrecinctAnalysisChart';
import { useState } from 'react';
const ChartModal = (props) => {
    const [selectedChart, setSelectedChart] = useState(props.selectedChart);
    
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
                className="bg-white p-5 rounded-lg shadow-lg border border-black"
                style={{
                    width: '850px',
                    height: '650px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    overflow: 'auto'
                }}
            >
                <h2 className="text-lg text-black font-bold text-center">{props.state} Data</h2>

                

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