import MyMap from "../components/Map";
import { useState, useRef, useEffect } from "react";
import HeatMapSelection from "../components/HeatMapSelection";
import HeatMapLegend from "../components/HeatMapLegend";
import MapControl from "../components/MapControl";
import MasterSidebar from "../components/MasterSidebar";
import EnsembleSummaryTable from '../components/EnsembleSummaryTable';
import { useAppState } from "../AppStateContext";
const legendItems = [
    // { color: '#ffffe0', number: 0, value: '0%', textColor: '#000' },
    // { color: '#ffffad', number: 10, value: '10%', textColor: '#000' },
    { color: "#f1eef6", number: 20, value: '20%', textColor: '#000' },
    // { color: '#e3ca77', number: 30, value: '30%', textColor: '#000' },
    { color: "#bdc9e1", number: 40, value: '40%', textColor: '#000' },
    // { color: '#c79649', number: 50, value: '50%', textColor: '#000' },
    { color: "#74a9cf", number: 60, value: '60%', textColor: '#fff' },
    // { color: '#aa6224', number: 70, value: '70%', textColor: '#fff' },
    { color: "#2b8cbe", number: 80, value: '80%', textColor: '#fff' },
    // { color: '#8a2b0a', number: 90, value: '90%', textColor: '#fff' },
    { color: "#045a8d", number: 100, value: '100%', textColor: '#fff' },
];

// Default zoom and coordinates
const ZOOMSTATE = {
    Arizona: [-115.5, 34.25, 5.75],
    Illinois: [-93.8, 39.75, 5.75],
    USA: [-98.5795, 38, 4],
    ArizonaRight: [-111.8, 34.75, 5.5],
    IllinoisRight: [-89.8, 40.25, 5.5],
    ArizonaLeft: [-112.5, 34.75, 5.5],
    IllinoisLeft: [-90.25, 40.25, 5.75]
  };
  
// 20, "#f1eef6",
// 40, "#bdc9e1",
// 60, "#74a9cf",
// 80, "#2b8cbe",
// 100, "#045a8d"
const MapPage = () => {
    const { appState } = useAppState();
    const mapRef = useRef(null);
    const [compareView, setCompareView] = useState(false);
    const [selectedHeatMap, setHeatMap] = useState("None");
    const [chartSelection, setChartSelection] = useState("Ethnicity Bar Chart");
    const [boundaryData, setBoundaryData] = useState('');
    const [legislativeDistrictData, setLegislativeDistrictData] = useState('');
    let state = appState;
    // let state; 
    // if (props.compared) {
    //   switch (appState) {
    //     case "Arizona":
    //       state = "Illinois";
    //       break;
    //     case "Illinois":
    //       state = "Arizona";
    //       break;
    //     default:
    //       state = appState;
    //       break;
    //   }
    // } else {
    //   state = appState;
    // }
    let modifiedState = false ? (state === appState ? `${state}Left` : `${state}Right`) : state;
    const defaultState = state && ZOOMSTATE[modifiedState] ? modifiedState : "USA";
    const [geojsonData, setGeojsonData] = useState(defaultState !== "USA" ? legislativeDistrictData : boundaryData);
    const [plan, setPlan] = useState("none");
    const handleZoomIn = () => {
        mapRef.current.zoomIn();
    };
    const handleZoomOut = () => {
        mapRef.current.zoomOut();
    };
    const handleResetZoom = () => {
        mapRef.current.resetZoom();
    };
    useEffect( () => {
        console.log("state is", chartSelection);
    }, [chartSelection])
    return (
        <div className="relative w-full h-screen">
            {/* <button onClick={handleReset} className="absolute top-4 left-4 z-50 p-2 bg-red-500 text-white rounded">Reset Selection</button> */}
            {(selectedHeatMap !== "None" && selectedHeatMap !== "PoliticalPartyPreference") && <HeatMapLegend legendItems={legendItems} />}
            <HeatMapSelection 
                selectedHeatMap={selectedHeatMap} 
                setHeatMap={setHeatMap} 
                plan={plan}
                setPlan={setPlan}
            />
            <MapControl 
                setCompareView={setCompareView} 
                compareView={compareView} 
                zoomIn={handleZoomIn} 
                zoomOut={handleZoomOut} 
                resetZoom={handleResetZoom} 
                setGeojsonData={setGeojsonData}
            />
            <div className="flex w-full h-full">
                <div className="flex-grow border-r border-gray-500">
                    <MyMap 
                        ref={mapRef} 
                        defaultState={defaultState} 
                        boundaryData={boundaryData}
                        setBoundaryData={setBoundaryData}
                        state={state}
                        plan={plan}
                        legislativeDistrictData={legislativeDistrictData}
                        setLegislativeDistrictData={setLegislativeDistrictData}
                        geojsonData={geojsonData}
                        setGeojsonData={setGeojsonData}
                        ZOOMSTATE={ZOOMSTATE} 
                        setCompareView={setCompareView} 
                        selectedHeatMap={selectedHeatMap} 
                        setHeatMap={setHeatMap} 
                        // compareView={compareView} 
                        left={true} 
                    />
                </div>
                {compareView &&
                    (<div className="w-1/3">
                        <MyMap 
                            compared={compareView} 
                            selectedHeatMap={selectedHeatMap} 
                            setHeatMap={setHeatMap}
                        />
                    </div>)}
            </div>
            <MasterSidebar 
                setChartSelection={setChartSelection} 
                chartSelection={chartSelection}
            />
        </div>
    );
}
export default MapPage;