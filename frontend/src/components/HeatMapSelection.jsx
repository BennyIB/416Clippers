const HeatMapSelection = (props) => {

    return (
        <div className="absolute right-5 top-5 z-10 bg-gray-800 p-4 rounded-md">
            <div className="text-white">
                Select Heatmap
            </div>
            <select
                value={props.selectedHeatMap}
                onChange={(e) => props.setHeatMap(e.target.value)}
                className="mb-5 bg-gray-700 text-white rounded-md cursor-pointer"
            >
                <option value="None"> None </option>
                <option value="PoliticalPartyPreference">Political Party Preference</option>
                <option value="HispanicOrLatino">Hispanic/Latino</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
                <option value="AsianOrPacificIslander" >Asian/Pacific Islander</option>
                <option value="NativeAmerican">Native American</option>
            </select>
        </div>
    );
}

export default HeatMapSelection;