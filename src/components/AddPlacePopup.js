import React from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';

import { useForm } from './../utils/Hooks.js';

function AddPlacePopup({ isOpen, onCardAdd, btnValue, onClose }) {

    const {values, handleChange, setValues} = useForm({});

    React.useEffect(()=>{
      setValues({
        name: '',
        link: ''
      });
   },[isOpen])
    
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onCardAdd({
          name: values.name,
          link: values.link
        });
      } 

    return (
        <PopupWithForm 
          title={'Новое место'}
          name = {'card-add'}
          btnValue={btnValue}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
            <Input
              className={'popup__input popup__input_type_user-place'}
              name={'name'}
              id={'text'}
              placeholder={'Название'}
              maxLength={30}
              value={values.name || ''}
              type={'text'}
              onChange={handleChange}
            />
            <span className="popup__error" id="text-error"></span>
            <Input
              className={'popup__input popup__input_type_user-link'}
              name={'link'}
              id={'url'}
              placeholder={'Ссылка на картинку'}
              maxLength={1000}
              value={values.link || ''}
              onChange={handleChange}
              type={'url'}
            />
            <span className="popup__error" id="url-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;