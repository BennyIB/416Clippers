import React, { useState } from 'react';

const EnsembleSummaryTable = () => {
    const [minimized, setMinimized] = useState(false);

    const toggleMinimize = () => {
        setMinimized(!minimized);
    };

    const tableStyle = {
        width: '30%', 
        bottom: '10px', 
        left: '50%',
        transform: 'translateX(-50%)', 
        background: 'rgba(255, 255, 255, 0.95)', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        position: 'absolute'
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
                <>
                    <span>Ensembles Summary</span>
                    <i className="fas fa-caret-down" style={{ marginLeft: '10px' }}></i>
                </>
            ) : (
                <>
                    <div className="flex justify-between items-center p-3">
                        <h2 className="text-lg font-semibold">Ensembles Summary</h2>
                        <i className="fas fa-caret-up"></i>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th>Ensemble</th>
                                <th>Equality Threshold</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>5000</td>
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
