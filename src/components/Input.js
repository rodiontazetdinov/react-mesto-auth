import React from 'react';

function Input({ className, id, type, name, placeholder, maxLength, value, onChange }) {

    return (
        <input 
        className={className}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        minLength="2"
        maxLength={maxLength}
        required
        value={value}
        onChange={onChange}/>
    )
}

export default Input;