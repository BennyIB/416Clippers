const Filter = (props) => {
    
    return (
        <div className="pt-2">
            <label className="pr-1" for="filterparty">Filter:</label>
            <select 
                name="filterparty" 
                id="filterparty" 
                className="select select-bordered select-sm bg-white"
                onChange={(e) => props.setSelectedParty(e.target.value)}
            >
                <option value="none">None</option>
                <option value="D">Democratic</option>
                <option value="R">Republican</option>
                <option value="other">Other</option>
            </select>
            <select 
                name="filterop" 
                id="filterop" 
                className="select select-bordered select-sm bg-white"
                onChange={(e) => props.setSelectedOperation(e.target.value)}
            >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
            </select>
            <select 
                name="filterrace" 
                id="filterrace" 
                className="select select-bordered select-sm bg-white"
                onChange={(e) => props.setSelectedRace(e.target.value)}
            >
                <option value="none">None</option>
                <option value="white">White</option>
                <option value="asian">Asian</option>
                <option value="hispanic">Hispanic</option>
                <option value="black">Black</option>
            </select>
        </div>
    );
}
export default Filter;