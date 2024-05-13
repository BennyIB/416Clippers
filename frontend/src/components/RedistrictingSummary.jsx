import React, { useState, useEffect } from 'react';
import { useAppState } from '../AppStateContext';
const RedistrictingSummary = () => {
const {appState} = useAppState();
  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [text, setText] = useState('');
  const MAPPING =
  {
    "Arizona": "In November 2000, Arizona voters passed Proposition 106, an initiative to amend the Arizona Constitution. This amendment removed the power to draw congressional and legislative districts from the state legislature and assigned it to the newly created Arizona Independent Redistricting Commission (AIRC). \nThe AIRC receives data from the Census Bureau and creates districts with similar populations in a grid-like pattern across the state. This ensures that each district has nearly the same population and maintains a more orderly shape. The AIRC consists of two Democrats, two Republicans, and one independent member. Throughout the commissioning process, public input is solicited to better tailor the redistricting process to the community's needs. The commission ensures the map adheres to several legal standards, such as the Voting Rights Act, geographic compactness, and contiguity. Once the commission finalizes the plan, it is implemented in the next congressional and state elections.",
    "Illinois": "Illinois redistricting also follows the U.S. Census. However, Illinois does not have a commission that creates the new district plan. Instead, the Illinois General Assembly, comprised of the House of Representatives and the Senate, is responsible for drawing the new maps. This makes the process heavily controlled by the majority party. Lawmakers use census data to redraw the boundaries of the districts, ensuring the map considers various legal and political matters. Once the final map is drafted, it must be passed by both houses of the General Assembly and then signed by the Governor of Illinois.",
    "USA": "Nothing here! Choose a state!"
  }

  useEffect(() => {
    setText(MAPPING[appState]);
  }, [appState]);
  // Function to truncate text at a given number of words
  const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const truncatedText = truncateText(text, 50); // Truncate after 50 words

  return (
    <div>
        <h4 className="font-bold mt-2 mb-2"> Redistricting Summary </h4>
      <div onClick={openModal} className="cursor-pointer">
        {truncatedText}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg max-w-lg w-full m-4 border border-gray-300">
            <span onClick={closeModal} className="float-right cursor-pointer text-2xl font-bold">&times;</span>
            <div>
                <h2 className="font-bold mb-2">
                    Redistricting Summary (Full)
                </h2>
                <p>{text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedistrictingSummary;
