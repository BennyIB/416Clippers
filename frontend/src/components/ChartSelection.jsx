
const ChartSelection = (props) => {

    return (
        <select className="px-5 bg-white rounded-md cursor-pointer mb-2 border-solid border-2"
            value={props.chartSelection}
            onChange={(e) => props.setChartSelection(e.target.value)}
        >
            {props.charts.map(chart => (
                <option 
                        value={chart.name}
                        key={chart.name}
                >        
                    {chart.name}
                </option>
            ))}
        </select>
    );
}
export default ChartSelection;