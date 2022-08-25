import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup(props) {
    
    function handleSubmit(e) {
        e.preventDefault();
      
        props.onCardDelete();
        props.onClose();
      } 

    return (
        <PopupWithForm
          title={'Вы уверены?'}
          name={'confirm'}
          btnValue='Да' 
          onSubmit={handleSubmit}
          isOpen={props.isOpen}
          onClose={props.onClose}
        />
    )
}

export default ConfirmDeletePopup;