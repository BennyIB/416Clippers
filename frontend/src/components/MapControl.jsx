import { useAppState } from '../AppStateContext';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const STATES = {
    AZ: "Arizona",
    IL: "Illinois",
    USA: "USA"
};
const MapControl = (props) => {
    const navigate = useNavigate();
    const { appState, setAppState } = useAppState();
    // cycle through states
    const getNextState = (currentState) => {
        const stateKeys = Object.keys(STATES);
        const currentIndex = stateKeys.indexOf(currentState);
        const nextIndex = (currentIndex + 1) % stateKeys.length;
        return stateKeys[nextIndex];
    };
    const [currentStateAbbreviation, setCurrentStateAbbreviation] = useState("USA");
    // find state abbreviation and set it
    useEffect(() => {
        const currentStateAbbreviation = Object.keys(STATES).find(key => STATES[key] === appState) || "USA";
        setCurrentStateAbbreviation(currentStateAbbreviation);
    }, [appState]);
    return (
        <div className="absolute right-5 bottom-5 z-10 flex ">
            {/* Container for buttons growing towards the left */}
            <div className="flex items-end space-x-2">
                <button
                    className="bg-blue-500 text-white font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={() => navigate("/")}
                >
                    <img src="/home.svg" />
                </button>
                {!props.compareView && (<button
                    className="bg-blue-500 text-white font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={() => setAppState(STATES[getNextState(currentStateAbbreviation)])}
                >
                    {currentStateAbbreviation}
                </button>)}
            </div>
            {/* Container for vertical buttons growing upwards */}
            <div className="flex flex-col items-center ml-2 space-y-2">
                {/* {!props.compareView && appState !== "USA" &&
                    (<button
                        className="bg-blue-500 text-white font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center"
                        onClick={() => props.setCompareView(!props.compareView)}
                    >
                        <img src="/compare.svg" />
                    </button>)} */}
                {/* {props.compareView && appState !== "USA" &&
                    (<button
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center"
                        onClick={() => props.setCompareView(!props.compareView)}
                    >
                        <img src="/compare.svg" />
                    </button>)} */}
                <button
                    className="bg-blue-500 text-white font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={props.zoomIn}
                >
                    +
                </button>
                <button
                    className="bg-blue-500 text-white font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={props.zoomOut}
                >
                    -
                </button>
                <button
                    className="bg-blue-500 text-white font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={props.resetZoom}
                >
                    <img src="/center.svg" alt="Center" />
                </button>
            </div>
        </div>
    );
};
export default MapControl;
