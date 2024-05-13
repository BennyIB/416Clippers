import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import eco from "../assets/Ecological_Inference.json"
import { useAppState } from '../AppStateContext'

function kernelDensityEstimator(kernel, X) {
    return function (V) {
        return X.map(function (x) {
            return [
                x,
                d3.mean(V, function (v) {
                    return kernel(x - v);
                }),
            ];
        });
    };
}


function kernelEpanechnikov(k) {
    return function (v) {
        return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
    };
}
const EcologicalInferencePlot = () => {
    const [selectedRace, setSelectedRace] = useState('White');
    const [selectedParty, setSelectedParty] = useState('Democratic');
    const { appState } = useAppState();
    const svgRef = useRef();
    const getDataPoints = (state, party, race) => {
        console.log("DATA ARE")
        console.log(state)
        console.log(party)
        console.log(race)
        switch (state) {
            case 'Arizona':
                switch (party) {
                    case 'Democratic':
                        switch (race) {
                            case 'Hispanic':
                                return eco.Arizona.Democratic.hispanic
                            case 'Black':
                                return eco.Arizona.Democratic.black
                            case 'White':
                                return eco.Arizona.Democratic.white
                            case 'Asian':
                                return eco.Arizona.Democratic.asian
                            case 'Native':
                                return eco.Arizona.Democratic.native
                        }
                    case 'Republican':
                        switch (race) {
                            case 'Hispanic':
                                return eco.Arizona.Republican.hispanic
                            case 'Black':
                                return eco.Arizona.Republican.black
                            case 'White':
                                return eco.Arizona.Republican.white
                            case 'Asian':
                                return eco.Arizona.Republican.asian
                            case 'Native':
                                return eco.Arizona.Republican.native
                        }
                }
            case 'Illinois': {
                switch (party) {
                    case 'Democratic':
                        switch (race) {
                            case 'Hispanic':
                                return eco.Illinois.Democratic.hispanic;
                            case 'Black':
                                return eco.Illinois.Democratic.black;
                            case 'White':
                                return eco.Illinois.Democratic.white;
                            case 'Asian':
                                return eco.Illinois.Democratic.asian;
                            case 'Native':
                                return eco.Illinois.Democratic.native;
                        }
                    case 'Republican':
                        switch (race) {
                            case 'Hispanic':
                                return eco.Illinois.Republican.hispanic;
                            case 'Black':
                                return eco.Illinois.Republican.black;
                            case 'White':
                                return eco.Illinois.Republican.white;
                            case 'Asian':
                                return eco.Illinois.Republican.asian;
                            case 'Native':
                                return eco.Illinois.Republican.native;
                        }
                }
            }
        }
    };

    useEffect(() => {
        const races = getDataPoints(appState, selectedParty, selectedRace);
        const race = races['race'];
        const non_race = races['non-race'];

        // Clear previous chart
        d3.select(svgRef.current).selectAll('*').remove();

        // Create density chart using D3
        const margin = { top: 30, right: 30, bottom: 30, left: 50 };
        const width = 460 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // Append the SVG element
        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X axis
        const x = d3.scaleLinear()
            .domain([0, 1])
            .range([0, width]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        // Compute kernel density estimate for race
        const raceDensity = kernelDensityEstimator(kernelEpanechnikov(0.001), x.ticks(200))(race);
        // Compute kernel density estimate for non_race
        const nonRaceDensity = kernelDensityEstimator(kernelEpanechnikov(0.008), x.ticks(100))(non_race);

        // Merge raceDensity and nonRaceDensity to find the maximum y-value
        const maxDensity = Math.max(
            d3.max(raceDensity, d => d[1]),
            d3.max(nonRaceDensity, d => d[1])
        );

        // Y axis
        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, maxDensity]); // Set the domain dynamically based on maxDensity

        svg.append("g")
            .call(d3.axisLeft(y));

        // Append race density path
        svg.append("path")
            .datum(raceDensity)
            .attr("fill", "#69b3a2")
            .attr("opacity", ".6")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(d => x(d[0]))
                .y(d => y(d[1]))
            );

        // Append non-race density path
        svg.append("path")
            .datum(nonRaceDensity)
            .attr("fill", "#404080")
            .attr("opacity", ".6")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(d => x(d[0]))
                .y(d => y(d[1]))
            );

        const yAxisLabelText = "Probability Density"; // Change this to any desired label

        // Append Y axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left) // Adjust position if needed
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(yAxisLabelText);


        svg.append("rect")
            .attr("x", 280)
            .attr("y", 10)
            .attr("width", 150)
            .attr("height", 70)
            .attr("fill", "lightgray")
            .attr("fill-opacity", 0.6)
        // Handmade legend
        svg.append("circle").attr("cx", 300).attr("cy", 30).attr("r", 6).style("fill", "#69b3a2")
        svg.append("circle").attr("cx", 300).attr("cy", 60).attr("r", 6).style("fill", "#404080")
        svg.append("text").attr("x", 320).attr("y", 30).text(selectedRace).style("font-size", "15px").attr("alignment-baseline", "middle")
        svg.append("text").attr("x", 320).attr("y", 60).text("non-" + selectedRace).style("font-size", "15px").attr("alignment-baseline", "middle")
    }, [selectedRace, selectedParty]);


    const handleRaceChange = (event) => {
        setSelectedRace(event.target.value);
    };

    const handlePartyChange = (event) => {
        setSelectedParty(event.target.value);
    };

    let partyName = ""
    if (selectedParty === "Democratic") {
        partyName = "Joe Biden"
    }
    else {
        partyName = "Donald Trump"
    }
    return (
        <div>
            <div>
                <label>Race:</label>
                <select value={selectedRace} onChange={handleRaceChange} className="bg-white border-2 border-solid">
                    <option value="Hispanic">Hispanic</option>
                    <option value="White">White</option>
                    <option value="Asian">Asian</option>
                    <option value="Black">Black</option>
                    <option value="Native">Native</option>
                </select>
                <label>Party:</label>
                <select value={selectedParty} onChange={handlePartyChange} className="bg-white border-2 border-solid">
                    <option value="Democratic">Democratic</option>
                    <option value="Republican">Republican</option>
                </select>
            </div>
            <svg ref={svgRef}></svg>
            <div>Support for {partyName}</div>
        </div>
    );
};

export default EcologicalInferencePlot;
