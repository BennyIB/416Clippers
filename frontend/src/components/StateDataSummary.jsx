import React, { useState, useEffect } from 'react';
import { useAppState } from '../AppStateContext';
import Arizona_Summary from '../assets/Arizona_State_Summary.json';
import Illinois_Summary from '../assets/Illinois_State_Summary.json';

const StateDataSummary = () => {
    const { appState } = useAppState();
    const [stateData, setStateData] = useState(null);

    useEffect(() => {
        const stateSummaries = {
            Arizona: Arizona_Summary['Arizona'],
            Illinois: Illinois_Summary['Illinois']
        };

        if (appState && stateSummaries[appState]) {
            const data = stateSummaries[appState];
            const formattedData = {
                name: appState,
                voterDistribution: `${data.population_summary.voter_dist}%`,
                totalPopulation: data.population_summary.total.toLocaleString(),
                racialGroups: [
                    { name: 'White', population: data.population_summary.white.toLocaleString() },
                    { name: 'Latino', population: data.population_summary.latino.toLocaleString() },
                    { name: 'Black', population: data.population_summary.black.toLocaleString() },
                    { name: 'Asian', population: data.population_summary.asian.toLocaleString() }
                ],
                representatives: {
                    democrat: data.representative_summary.democratic,
                    republican: data.representative_summary.republican,
                    raceCounts: {
                        White: data.representative_summary.white,
                        Latino: data.representative_summary.latino,
                        Black: data.representative_summary.black,
                        Asian: data.representative_summary.asian,
                        Other: data.representative_summary.other
                    }
                }
            };
            setStateData(formattedData);
        } else {
            console.error(`No data available for ${appState}`);
        }
    }, [appState]);

    if (!stateData) return <div>Loading...</div>;

    return (
        <div className="p-6 border border-gray-300 overflow-hidden">
            <div className="flex">
                <div className="flex-1 mr-4">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">{stateData.name} - Data Summary</h2>
                    <table className="min-w-full text-left">
                        <tbody>
                            <tr>
                                <td className="font-semibold py-1 border-b">Voter Distribution:</td>
                                <td className="text-gray-600 py-1 border-b">{stateData.voterDistribution}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-1 border-b">Total Population:</td>
                                <td className="text-gray-600 py-1 border-b">{stateData.totalPopulation}</td>
                            </tr>
                            {stateData.racialGroups.map(group => (
                                <tr key={group.name}>
                                    <td className="font-semibold py-1 border-b">{group.name} Population:</td>
                                    <td className="text-gray-600 py-1 border-b">{group.population}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex-1 ml-4">
                    <h3 className="text-xl font-bold mb-7 text-gray-800">State Assembly</h3>
                    <table className="min-w-full text-left">
                        <tbody>
                            <tr>
                                <td className="font-semibold py-1 border-b">Democrats:</td>
                                <td className="text-gray-600 py-1 border-b">{stateData.representatives.democrat}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-1 border-b">Republicans:</td>
                                <td className="text-gray-600 py-1 border-b">{stateData.representatives.republican}</td>
                            </tr>
                            {Object.entries(stateData.representatives.raceCounts).map(([race, count]) => (
                                <tr key={race}>
                                    <td className="font-semibold py-1 border-b">{race} Representatives:</td>
                                    <td className="text-gray-600 py-1 border-b">{count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StateDataSummary;
