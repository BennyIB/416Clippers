import React, { useEffect, useState } from 'react';
import Illinois_Representatives from '../assets/Illinois_Representatives.json'
import Arizona_Representatives from '../assets/Arizona_Representatives.json'
import { useAppState } from '../AppStateContext';
const StateAssemblyTable = (props) => {
    const { appState, setSelectedDistrict } = useAppState();
    const [table, setSelectedTable] = useState(null);
    useEffect(() => {
        switch (appState) {
            case 'Illinois':
                setSelectedTable(Illinois_Representatives);
                break;
            case 'Arizona':
                setSelectedTable(Arizona_Representatives);
                break;
            default:
                setSelectedTable(null);
                break;
        }
    }, [appState]);
    function handleClick(district) {
        setSelectedDistrict(district);
    }
    return (
        <div className="border-solid border-2 h-full overflow-auto">
            <table className="divide-y divide-gray-200 w-full">
                <thead className="bg-gray-50 sticky top-0 z-20 shadow">
                    <tr>
                        <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">District</th>
                        <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Image</th>
                        <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Name</th>
                        <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Party</th>
                        <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Race</th>
                        <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Vote Margin</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {table && table.map((item, index) => {
                        const { selectedParty, selectedOperation, selectedRace } = props;

                        const shouldFilterParty = selectedParty !== "none" && item.party === selectedParty;

                        const shouldFilterRace = selectedRace !== "none" && item.race === selectedRace;

                        let shouldInclude = false;
                        if (selectedOperation === "AND") {
                            shouldInclude = (selectedParty === "none" || shouldFilterParty) &&
                                (selectedRace === "none" || shouldFilterRace);
                        } else if (selectedOperation === "OR") {
                            shouldInclude = (selectedParty === "none" && selectedRace === "none") ||
                                shouldFilterParty || shouldFilterRace;
                        }

                        if (!shouldInclude) {
                            return null;
                        }

                        return (
                            <tr key={index}>
                                <td className="text-black px-1 py-4 whitespace-nowrap border cursor-pointer hover:bg-gray-100" onClick={() => handleClick(item.district)}>{item.district}</td>
                                <td className="text-black px-1 py-4 whitespace-nowrap border">
                                    <img width={50} height={50} src={item.url}></img>
                                </td>
                                <td className="text-black px-1 py-4 border overflow-x-auto">
                                    <div className="whitespace-nowrap max-w-xs" style={{ maxWidth: '100px' }}>
                                        {item.name}
                                    </div>
                                </td>
                                <td className="text-black px-1 py-4 whitespace-nowrap border">{item.party}</td>
                                <td className="text-black px-1 py-4 whitespace-nowrap border">{item.race}</td>
                                <td className="text-black px-1 py-4 whitespace-nowrap border">{item.percentage}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default StateAssemblyTable;