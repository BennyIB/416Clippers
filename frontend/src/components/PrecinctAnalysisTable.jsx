import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppState } from '../AppStateContext';

const PrecinctAnalysisTable = () => {
  const [precinctData, setPrecinctData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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

  const handleNext = () => {
    if (currentPage < Math.ceil(precinctData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = precinctData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="relative shadow-md sm:rounded-lg max-h-[500px] overflow-auto">
      <h1 className="text-xl font-semibold text-black mb-4">Precinct Analysis</h1>
      <div className="min-w-screen">
        <table className="min-w-full text-xs text-left text-black">
          <thead className="text-xs bg-gray-50 text-black sticky top-0 z-10">
            <tr>
              <th scope="col" className="py-2 px-4">Precinct Name</th>
              <th scope="col" className="py-2 px-4">Total Population</th>
              <th scope="col" className="py-2 px-4">Hispanic Population</th>
              <th scope="col" className="py-2 px-4">Asian Population</th>
              <th scope="col" className="py-2 px-4">White Population</th>
              <th scope="col" className="py-2 px-4">Black Population</th>
              <th scope="col" className="py-2 px-4">Republican Votes</th>
              <th scope="col" className="py-2 px-4">Democratic Votes</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((precinct, index) => (
              <tr className="bg-white border-b text-black hover:bg-gray-50" key={index}>
                <td className="py-2 px-4">{precinct.precinctName}</td>
                <td className="py-2 px-4">{precinct.totalPopulation}</td>
                <td className="py-2 px-4">{precinct.hispanicPopulation}</td>
                <td className="py-2 px-4">{precinct.asianPopulation}</td>
                <td className="py-2 px-4">{precinct.whitePopulation}</td>
                <td className="py-2 px-4">{precinct.blackPopulation}</td>
                <td className="py-2 px-4">{precinct.republicanVotes}</td>
                <td className="py-2 px-4">{precinct.democraticVotes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            className="ml-5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs disabled:opacity-50"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="mr-5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs disabled:opacity-50"
            onClick={handleNext}
            disabled={currentPage >= Math.ceil(precinctData.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrecinctAnalysisTable;
