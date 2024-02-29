import { useState } from "react";


const HeatMapSelection = (props) => {

    return (
        <div className="absolute right-5 top-5 z-10 bg-gray-500 p-1 rounded-md">
            <div>
                Select HeatMap
            </div>
            <select
                value={props.selectedHeatMap}
                onChange={(e) => props.setHeatMap(e.target.value)}
                className="mb-4 bg-gray-400"
                style={{
                    color: 'white',
                    border: 'none',
                    padding: '5px',
                    borderRadius: '5px',
                }}
            >
                <option value="None" className="text-white">None</option>
                <option value="PoliticalPartyPreference" className="text-white">Political Party Preference</option>
                <option value="HispanicOrLatino" className="text-white">Hispanic/Latino</option>
                <option value="White" className="text-white">White</option>
                <option value="AsianOrPacificIslander" className="text-white">Asian/Pacific Islander</option>
                <option value="NativeAmerican" className="text-white">Native American</option>
            </select>
        </div>
    );
}

export default HeatMapSelection;