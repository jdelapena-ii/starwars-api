import React from 'react';

const Input = ({ handleChange, value, name, placeholder }) => {
    return (
        <div style={{marginRight: '20px'}}>
            <input 
                type="text"
                onChange={handleChange}
                value={value}
                name={name}
                placeholder={placeholder}
            />
        </div>
    )
}


export default Input 
