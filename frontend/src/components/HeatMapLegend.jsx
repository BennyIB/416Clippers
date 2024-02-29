import React from 'react';

const HeatMapLegend = ({ legendItems }) => {
    return (
      <div className="absolute z-10 bottom-1 left-1 flex flex-col p-1 bg-gray-300 rounded-md shadow-md">
        {legendItems.slice().reverse().map((item, index) => (
          <div key={index} className={`flex items-center justify-center w-12 h-6 text-center text-sm ${item.textColor === '#fff' ? 'text-white' : 'text-black'}`} style={{ backgroundColor: item.color }}>
            {item.value}
          </div>
        ))}
      </div>
    );
};


export default HeatMapLegend;
