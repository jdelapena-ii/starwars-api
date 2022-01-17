import React from 'react';

const Input = ({handleChange, value, name}) => {
    return (
        <div>
            <input 
                type="text"
                onChange={handleChange}
                value={value}
                name={name}
            />
        </div>
    )
}


export default Input