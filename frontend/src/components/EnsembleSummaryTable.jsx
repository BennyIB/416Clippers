import React, { useState } from 'react';

const EnsembleSummaryTable = () => {
    const [minimized, setMinimized] = useState(false);

    const toggleMinimize = () => {
        setMinimized(!minimized);
    };

    const tableStyle = {
        width: '100%',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'absolute',
        border: '1px solid #808080'
    };

    const minimizedStyle = {
        ...tableStyle,
        cursor: 'pointer',
        padding: '10px 20px',
        textAlign: 'center'
    };

    return (
        <div style={minimized ? minimizedStyle : tableStyle} onClick={toggleMinimize}>
            {minimized ? (
                <div className="flex justify-start items-center">
                    <span className="font-bold mr-auto">Ensembles Summary</span>
                    <i className="fas fa-caret-down"></i>
                </div>
            ) : (
                <>
                    <div className="flex justify-center items-center p-3">
                        <h2 className="text-lg font-bold">Ensembles Summary</h2>
                        <i className="fas fa-caret-up ml-auto"></i>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="font-semibold">Ensemble Plans</th>
                                <th className="font-semibold">Equality Threshold</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>5,000</td>
                                <td>0.05</td>
                            </tr>
                            <tr>
                                <td>250</td>
                                <td>0.05</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default EnsembleSummaryTable;
