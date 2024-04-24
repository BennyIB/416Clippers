import React from 'react';

const FeasibleOpportunityDistrictsTable = () => {
    const districtsData = [
        { 
            racialGroup: 'Black',
            maxOpportunityDistricts: 5,
            theoreticalOpportunityDistricts: 4,
            actualOpportunityDistricts: 3,
            idealDistrictPopulation: 100000,
            minorityPopulation: 30000
        },
        { 
            racialGroup: 'Latino',
            maxOpportunityDistricts: 7,
            theoreticalOpportunityDistricts: 6,
            actualOpportunityDistricts: 4,
            idealDistrictPopulation: 120000,
            minorityPopulation: 45000
        },
        { 
            racialGroup: 'Asian',
            maxOpportunityDistricts: 3,
            theoreticalOpportunityDistricts: 2,
            actualOpportunityDistricts: 1,
            idealDistrictPopulation: 110000,
            minorityPopulation: 25000
        },
        { 
            racialGroup: 'White',
            maxOpportunityDistricts: 8,
            theoreticalOpportunityDistricts: 7,
            actualOpportunityDistricts: 5,
            idealDistrictPopulation: 125000,
            minorityPopulation: 5000
        },
    ];

    return (
        <div className='text-black'>
            <h2 className='font-bold text-xl'>Feasible Opportunity Districts</h2>
            <div style={{ overflowX: 'auto' }}>
                <table className='w-full border-collapse border border-black mt-4'>
                    <thead>
                        <tr className='border-b border-black'>
                            <th className='p-2 border-r border-black'>Racial/Ethnic Group</th>
                            <th className='p-2 border-r border-black'>Max Opportunity Districts</th>
                            <th className='p-2 border-r border-black'>Theoretical Opportunity Districts</th>
                            <th className='p-2 border-r border-black'>Actual Opportunity Districts</th>
                            <th className='p-2 border-r border-black'>Ideal District Population</th>
                            <th className='p-2'>Minority Population</th>
                        </tr>
                    </thead>
                    <tbody>
                        {districtsData.map((district, index) => (
                            <tr key={index} className='border-b border-black'>
                                <td className='p-2 border-r border-black'>{district.racialGroup}</td>
                                <td className='p-2 border-r border-black'>{district.maxOpportunityDistricts}</td>
                                <td className='p-2 border-r border-black'>{district.theoreticalOpportunityDistricts}</td>
                                <td className='p-2 border-r border-black'>{district.actualOpportunityDistricts}</td>
                                <td className='p-2 border-r border-black'>{district.idealDistrictPopulation}</td>
                                <td className='p-2'>{district.minorityPopulation}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeasibleOpportunityDistrictsTable;
