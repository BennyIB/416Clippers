import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
function HomeWrapper() {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const [selectedState, setSelectedState] = useState('');
    const clippersImageURL = "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Los_Angeles_Clippers_%282015%29.svg/1200px-Los_Angeles_Clippers_%282015%29.svg.png";
  
    const handleSelectState = (state) => {
      setSelectedState(state);
      if (state === 'Arizona') {
        navigate('/map/Arizona');
      }
      else if(state === 'Illinois')
      {
        navigate('/map/Illinois');
      }
    };
  
    return (
          <div className="flex flex-col items-center justify-center">
          <img src={clippersImageURL} alt="Clippers Logo" className="w-48 h-auto my-8" />
          <div className="flex">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg m-2 text-lg"  onClick={() => handleSelectState('Arizona')}>Arizona</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg m-2 text-lg"  onClick={() => handleSelectState('Illinois')}>Illinois</button>
          </div>
          {selectedState && <p className="text-center mt-4">You have selected: {selectedState}</p>}
        </div>
    );
  }
  export default HomeWrapper;