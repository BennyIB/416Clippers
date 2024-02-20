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
        <div className="clippers-container">
          <img src={clippersImageURL} alt="Clippers" className="clippers-image" />
          <div></div>
          <button className="clippers-button" onClick={() => handleSelectState('Arizona')}>Arizona</button>
          <button className="clippers-button" onClick={() => handleSelectState('Illinois')}>Illinois</button>
          {selectedState && <p className="clippers-selected">You have selected: {selectedState}</p>}
          {/* <Link to="/">Go Back to Main</Link> */}
  
        </div>
    );
  }
  export default HomeWrapper;