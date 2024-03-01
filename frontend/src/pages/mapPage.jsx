import MyMap from "../components/map";
import { useState } from "react";
// import HeatMapSelection from "../components/HeatMapSelection";
// import HeatMapLegend from "../components/HeatMapLegend";
// import MapControl from "../components/MapControl";

// const legendItems = [
//     { color: '#ffffad', number: 10, value: '10%', textColor: '#000' },
//     { color: '#f1e491', number: 20, value: '20%', textColor: '#000' },
//     { color: '#e3ca77', number: 30, value: '30%', textColor: '#000' },
//     { color: '#d5b05f', number: 40, value: '40%', textColor: '#000' },
//     { color: '#c79649', number: 50, value: '50%', textColor: '#000' },
//     { color: '#b97c35', number: 60, value: '60%', textColor: '#fff' },
//     { color: '#aa6224', number: 70, value: '70%', textColor: '#fff' },
//     { color: '#9a4716', number: 80, value: '80%', textColor: '#fff' },
//     { color: '#8a2b0a', number: 90, value: '90%', textColor: '#fff' },
//     { color: '#790000', number: 100, value: '100%', textColor: '#fff' },
//   ];

const MapPage = () => {
    const [compareView, setCompareView] = useState(false);
    const [selectedHeatMap, setHeatMap] = useState("None");
    return (
        <div className="relative w-full h-screen">
            {/* {(selectedHeatMap !== "None" && selectedHeatMap !== "PoliticalPartyPreference") && <HeatMapLegend legendItems={legendItems} />}
            <HeatMapSelection selectedHeatMap={selectedHeatMap} setHeatMap={setHeatMap} />
            <MapControl setCompareView={setCompareView} compareView={compareView} /> */}
            <div className="flex w-full h-full">
                <div className="flex-grow border-r border-gray-500">
                    <MyMap setCompareView={setCompareView} selectedHeatMap={selectedHeatMap} setHeatMap={setHeatMap} compareView={compareView} left={true}/>
                </div>
                {compareView && 
                (<div className="w-2/5">
                    <MyMap compared={compareView} selectedHeatMap={selectedHeatMap} setHeatMap={setHeatMap}/>
                </div>)}
            </div>
        </div>
    );
}
export default MapPage;