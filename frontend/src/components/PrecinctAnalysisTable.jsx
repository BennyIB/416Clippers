import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrecinctAnalysisTable = () => {
  const [precinctData, setPrecinctData] = useState([]);

  useEffect(() => {
    const fetchPrecinctData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/arizona/precinct-analysis-table');
        setPrecinctData(response.data.data); 
      } catch (error) {
        console.error("Error fetching precinct analysis data: ", error);
      }
    };

    fetchPrecinctData();
  }, []);

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <h1 className="text-2xl font-semibold text-black mb-4">Precinct Analysis</h1>
      <table className="w-full text-sm text-left text-black">
        <thead className="text-xs uppercase bg-gray-50 text-black">
          <tr>
            <th scope="col" className="py-3 px-6">Precinct Name</th>
            <th scope="col" className="py-3 px-6">Total Population</th>
            <th scope="col" className="py-3 px-6">Hispanic Population</th>
            <th scope="col" className="py-3 px-6">Asian Population</th>
            <th scope="col" className="py-3 px-6">White Population</th>
            <th scope="col" className="py-3 px-6">Black Population</th>
            <th scope="col" className="py-3 px-6">Republican Votes</th>
            <th scope="col" className="py-3 px-6">Democratic Votes</th>
          </tr>
        </thead>
        <tbody>
          {precinctData.map((precinct, index) => (
            <tr className="bg-white border-b text-black hover:bg-gray-50" key={index}>
              <td className="py-4 px-6">{precinct.precinctName}</td>
              <td className="py-4 px-6">{precinct.totalPopulation}</td>
              <td className="py-4 px-6">{precinct.hispanicPopulation}</td>
              <td className="py-4 px-6">{precinct.asianPopulation}</td>
              <td className="py-4 px-6">{precinct.whitePopulation}</td>
              <td className="py-4 px-6">{precinct.blackPopulation}</td>
              <td className="py-4 px-6">{precinct.republicanVotes}</td>
              <td className="py-4 px-6">{precinct.democraticVotes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrecinctAnalysisTable;
