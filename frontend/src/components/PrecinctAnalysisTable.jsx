import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppState } from '../AppStateContext';

const PrecinctAnalysisTable = () => {
  const [precinctData, setPrecinctData] = useState([]);
  const { appState } = useAppState(); 

  useEffect(() => {
    const fetchPrecinctData = async () => {
      try {
        const state = appState.charAt(0).toLowerCase() + appState.slice(1);
        const response = await axios.get(`http://localhost:8080/api/${state}/precinct-analysis-table`);
        setPrecinctData(response.data.data);
      } catch (error) {
        console.error("Error fetching precinct analysis data: ", error);
      }
    };

    fetchPrecinctData();
  }, [appState]);

  return (
    <div className="relative shadow-md sm:rounded-lg max-h-[500px] overflow-auto">
      <h1 className="text-2xl font-semibold text-black mb-4">Precinct Analysis</h1>
      <div className="min-w-screen">
        <table className="min-w-full text-sm text-left text-black">
          <thead className="text-xs bg-gray-50 text-black sticky top-0 z-10">
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
    </div>
  );
};

export default PrecinctAnalysisTable;
