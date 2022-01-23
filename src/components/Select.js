import React from 'react';

const Select = ({ label, options, setIndex, setItemsToShow }) => {
    return (
        <div style={{marginRight: '40px'}}>
            <label> {label} </label>

            <select
              onChange={(e) => {
                setIndex(0);
                setItemsToShow((e.target.value));
              }}
              defaultValue={label}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                     {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select;