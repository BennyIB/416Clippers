import React, { useState } from 'react';

const Filter = (props) => {
    const [selectedParty, setSelectedParty] = useState('none');
    const [selectedOperation, setSelectedOperation] = useState('AND');
    const [selectedRace, setSelectedRace] = useState('none');

    const resetFilters = () => {
        setSelectedParty('none');
        setSelectedOperation('AND');
        setSelectedRace('none');
        props.setSelectedParty('none');
        props.setSelectedOperation('AND');
        props.setSelectedRace('none');
    };

    return (
        <div className="pt-2">
            <label className="pr-1">Filter:</label>
            <select
                name="filterparty"
                id="filterparty"
                value={selectedParty}
                className="select select-bordered select-sm bg-white"
                onChange={(e) => {
                    setSelectedParty(e.target.value);
                    props.setSelectedParty(e.target.value);
                }}
            >
                <option value="none">None</option>
                <option value="D">Democratic</option>
                <option value="R">Republican</option>
                <option value="other">Other</option>
            </select>
            <select
                name="filterop"
                id="filterop"
                value={selectedOperation}
                className="select select-bordered select-sm bg-white"
                onChange={(e) => {
                    setSelectedOperation(e.target.value);
                    props.setSelectedOperation(e.target.value);
                }}
            >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
            </select>
            <select
                name="filterrace"
                id="filterrace"
                value={selectedRace}
                className="select select-bordered select-sm bg-white"
                onChange={(e) => {
                    setSelectedRace(e.target.value);
                    props.setSelectedRace(e.target.value);
                }}
            >
                <option value="none">None</option>
                <option value="white">White</option>
                <option value="asian">Asian</option>
                <option value="hispanic">Hispanic</option>
                <option value="black">Black</option>
            </select>
            <div
                className="btn btn-ghost"
                onClick={resetFilters}
            >
                <img className="w-4" src="/reset-icon.svg" alt="Reset"/>
            </div>
        </div>
    );
};

export default Filter;
