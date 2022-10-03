import React from 'react';

function Input(props) {

    return (
        <input 
        className={props.className}
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        minLength="2"
        maxLength={props.maxLength}
        required
        value={props.value}
        onChange={props.onChange}/>
    )
}

export default Input;