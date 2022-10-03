import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ onCardDelete, isOpen, onClose}) {
    
    function handleSubmit(e) {
        e.preventDefault();
      
        onCardDelete();
      } 

    return (
        <PopupWithForm
          title={'Вы уверены?'}
          name={'confirm'}
          btnValue='Да' 
          onSubmit={handleSubmit}
          isOpen={isOpen}
          onClose={onClose}
        />
    )
}

export default ConfirmDeletePopup;