const HeatMapSelection = (props) => {
    return (
        <div className="absolute right-5 top-5 z-10 bg-white border-solid border-2 p-4 rounded-md">
            <div className="text-black my-4">
                Select Heatmap
            </div>
            <select
                value={props.selectedHeatMap}
                onChange={(e) => props.setHeatMap(e.target.value)}
                className="mb-5 bg-white text-black rounded-md cursor-pointer border-solid border-2"
            >
                <option value="None"> None </option>
                <option value="PoliticalPartyPreference">Political Party Preference</option>
                <option value="HispanicOrLatino">Hispanic/Latino</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
                <option value="AsianOrPacificIslander" >Asian/Pacific Islander</option>
                <option value="NativeAmerican">Native American</option>
            </select>
            <div className="text-black my-4">
                Select Plan
            </div>
            <select
                value={props.geojsonData}
                onChange={(e) => props.setPlan(e.target.value)}
                className="mb-5 bg-white text-black rounded-md cursor-pointer border-solid border-2"
            >
                <option value="none"> None </option>
                <option value="max"> Max Opportunity Districts </option>
                <option value="avg"> Avg Opportunity Districts </option>
            </select>
        </div>
    );
}
export default HeatMapSelection;