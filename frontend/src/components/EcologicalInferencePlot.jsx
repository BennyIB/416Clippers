    import React, { useState, useEffect, useRef } from 'react';
    import * as d3 from 'd3';
    import eco from "../assets/Ecological_Inference.json"

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
        const svgRef = useRef();
        const getDataPoints = (race) => {
            switch (race) {
                case 'Hispanic':
                    return [0.0,0.21,0.62,1.03,1.44,10.85,2.26,2.68,3.09,3.29,3.5,3.5,3.29,3.09,2.88,2.47,0.0];
                case 'Black':
                    return [2.04,1.75,1.46,1.17,0.88,0.58,0.29,0.0,0.0,0.0,0.29,0.58,0.88,1.46,2.04,2.92,3.5];
                case 'White':
                    return eco.Arizona.white
                case 'Asian':
                    return [0.47,0.76,1.14,1.60,2.12,2.64,3.09,3.39,3.5,3.39,3.09,2.64,2.12,1.60,1.14,0.76,0.47];
                default:
                    return [0.0,0.0,0.0,0.21,0.41,0.62,0.82,1.03,1.44,1.85,2.26,2.88,3.29,3.5,3.29,2.88,0.0];
            }
        };

        useEffect(() => {
            const races = getDataPoints(selectedRace);
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
            const raceDensity = kernelDensityEstimator(kernelEpanechnikov(0.05), x.ticks(100))(race);
        
            // Compute kernel density estimate for non_race
            const nonRaceDensity = kernelDensityEstimator(kernelEpanechnikov(0.08), x.ticks(100))(non_race);
        
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
            svg.append("text").attr("x", 320).attr("y", 60).text("non-"+selectedRace).style("font-size", "15px").attr("alignment-baseline", "middle")
        }, [selectedRace]);
        

        const handleRaceChange = (event) => {
            setSelectedRace(event.target.value);
        };

        const handlePartyChange = (event) => {
            setSelectedParty(event.target.value);
        };
        
        let partyName = ""
        if (selectedParty === "Democratic"){
            partyName = "Joe Biden"
        }
        else{
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
