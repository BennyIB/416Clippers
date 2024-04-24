import React, { useEffect, useState } from 'react';
import Illinois_Representatives from '../assets/Illinois_Representatives.json'
import Arizona_Representatives from '../assets/Arizona_Representatives.json'
import { useAppState } from '../AppStateContext';
const StateAssemblyTable = () => {
    const { appState } = useAppState();
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
    return (
        <div className="border-solid border-2 h-full overflow-auto">
            <table className="divide-y divide-gray-200 w-full">
                <thead className="bg-gray-50 sticky top-0 z-20 shadow">
                    <tr>
                        <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">District</th>
                        <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Name</th>
                        <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Image</th>
                        <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Party</th>
                        <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Race</th>
                        <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Vote Margin</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {table && table.map((item, index) => (
                        <tr key={index}>
                            <td className="text-black px-1 py-4 whitespace-nowrap border">{item.district}</td>
                            <td className="text-black px-1 py-4 whitespace-nowrap border">
                                <img width={40} height={40} src={item.url}></img>
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
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default StateAssemblyTable;