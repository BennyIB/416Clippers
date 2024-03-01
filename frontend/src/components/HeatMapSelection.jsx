const HeatMapSelection = (props) => {

    return (
        <div className="absolute right-5 top-5 z-10 bg-gray-200 p-1 rounded-md">
            <div className="text-black">
                Select HeatMap
            </div>
            <select
                value={props.selectedHeatMap}
                onChange={(e) => props.setHeatMap(e.target.value)}
                className="mb-4 bg-gray-300"
                style={{
                    color: 'black',
                    border: 'none',
                    padding: '5px',
                    borderRadius: '5px',
                }}
            >
                <option value="None" className="text-black">None</option>
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