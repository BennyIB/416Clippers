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
                <option value="None" className="text-black"> None </option>
                <option value="PoliticalPartyPreference" className="text-black">Political Party Preference</option>
                <option value="HispanicOrLatino" className="text-black">Hispanic/Latino</option>
                <option value="White" className="text-black">White</option>
                <option value="Black" className="text-black">Black</option>
                <option value="AsianOrPacificIslander" className="text-black">Asian/Pacific Islander</option>
                <option value="NativeAmerican" className="text-black">Native American</option>
            </select>
        </div>
    );
}

export default HeatMapSelection;