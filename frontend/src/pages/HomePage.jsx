import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppState } from '../AppStateContext';
function HomeWrapper() {
    const { setAppState } = useAppState();
    const navigate = useNavigate();
    const [selectedState, setSelectedState] = useState('');
    const clippersImageURL = "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Los_Angeles_Clippers_%282015%29.svg/1200px-Los_Angeles_Clippers_%282015%29.svg.png";
    const [isStateSelected, setIsStateSelected] = useState(false); 
    useEffect(() => {
      if (selectedState) {
        setAppState(selectedState);
        setIsStateSelected(true);
      }
    }, [selectedState, setAppState]);
    useEffect(() => {
      if (isStateSelected) {
        navigate("/map"); 
        setIsStateSelected(false); 
      }
    }, [isStateSelected, selectedState, navigate]);
  
    const handleSelectState = (state) => {
      setSelectedState(state);
    };
    return (
        <div className="flex flex-col items-center justify-center">
          <img src={clippersImageURL} alt="Clippers Logo" className="w-48 h-auto my-8" />
          <div className="flex">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg m-2 text-lg"  onClick={() => handleSelectState('Arizona')}>Arizona</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg m-2 text-lg"  onClick={() => handleSelectState('Illinois')}>Illinois</button>
          </div>
        </div>
    );
  }
  export default HomeWrapper;