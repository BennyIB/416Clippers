import React from 'react';

const ProportionalDifferenceTable = () => {
  const data = [
    { race: 'Black/African American', assembly: 15, population: 25 },
    { race: 'Hispanic/Latino', assembly: 10, population: 20 },
    { race: 'White/Caucasian', assembly: 55, population: 45 },
    { race: 'Asian', assembly: 5, population: 10 }
  ];

  const calculateDifference = (assembly, population) => {
    return (assembly - population).toFixed(2);
  };

  return (
    <div className="flex justify-center mt-4">
      <table className="min-w-full table-auto bg-gray-100">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Race</th>
            <th className="px-4 py-2 border">State Assembly Proportion (%)</th>
            <th className="px-4 py-2 border">Population Proportion (%)</th>
            <th className="px-4 py-2 border">Difference (Assembly - Population)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 border">{item.race}</td>
              <td className="px-4 py-2 border">{item.assembly}%</td>
              <td className="px-4 py-2 border">{item.population}%</td>
              <td className="px-4 py-2 border">{calculateDifference(item.assembly, item.population)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProportionalDifferenceTable;
