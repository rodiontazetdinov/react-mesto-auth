import React from 'react';

function Input(props) {

    function handleChange(e) {
        props.onChange(e.target.value);
      }

    return (
        <input 
        className="popup__input popup__input_type_user-name"
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        minLength="2"
        maxLength={props.maxLength}
        required
        value={props.value}
        onChange={handleChange}/>
    )
}

export default Input;