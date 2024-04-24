import React, { useState, useEffect } from 'react';

const StateDataSummary = () => {
    const [stateData, setStateData] = useState({
        name: 'Arizona',
        voterDistribution: '56%',
        totalPopulation: '7,151,502',
        racialGroups: [
            { name: 'Latino', population: '1,337,330' },
            { name: 'White', population: '4,405,325' },
            { name: 'Black', population: '886,786' },
            { name: 'Asian', population: '429,090' },
        ],
        redistrictingControl: 'Democratic Party',
    });

    const partySummary = {
        Democrat: 29,
        Republican: 31,
    };

    const racialSummary = {
        White: 36,
        Latino: 17,
        Black: 1,
        Asian: 4,
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg text-black max-h-96 overflow-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{stateData.name} Data Summary</h2>
            <ul className="list-none space-y-3">
                <li className="font-semibold">Voter Distribution: <span className="font-normal text-gray-600">{stateData.voterDistribution}</span></li>
                <li className="font-semibold">Total Population: <span className="font-normal text-gray-600">{stateData.totalPopulation}</span></li>
                <li className="font-semibold">Racial/Ethnic Groups:
                    <ul className="list-none pl-5 mt-2 space-y-2">
                        {stateData.racialGroups.map(group => (
                            <li key={group.name} className="font-normal text-gray-600">{group.name}: {group.population}</li>
                        ))}
                    </ul>
                </li>
            </ul>
            <h3 className="text-xl font-bold mt-6 text-gray-800">Representatives Summary</h3>
            <ul className="list-none space-y-3">
                <li className="font-semibold">By Party:
                    <ul className="list-none pl-5 mt-2 space-y-2">
                        {Object.entries(partySummary).map(([party, count]) => (
                            <li key={party} className="font-normal text-gray-600">{party}: {count}</li>
                        ))}
                    </ul>
                </li>
                <li className="font-semibold">By Racial/Ethnic Group:
                    <ul className="list-none pl-5 mt-2 space-y-2">
                        {Object.entries(racialSummary).map(([race, count]) => (
                            <li key={race} className="font-normal text-gray-600">{race}: {count}</li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default StateDataSummary;

