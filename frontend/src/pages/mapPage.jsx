import MyMap from "../components/map";
import { useState } from "react";

const MapPage = () => {
    const [compareView, setCompareView] = useState(false);
    return (
        <div className="relative w-full h-screen">
            <div className="flex w-full h-full">
                <div className="flex-grow border-r border-gray-500">
                    <MyMap setCompareView={setCompareView} compareView={compareView} left={true}/>
                </div>
                {compareView && 
                (<div className="w-2/5">
                    <MyMap compared={compareView}/>
                </div>)}
            </div>
        </div>
    );
}
export default MapPage;