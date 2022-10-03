import React from 'react';
import Input from './Input';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import { useForm } from './../utils/Hooks.js';

function EditProfilePopup(props) {

    const {values, handleChange, setValues} = useForm({});

    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
      setValues({
        name: currentUser.name,
        about: currentUser.about
      });
    }, [props.isOpen]);
    
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name: values.name,
          about: values.about
        });
      } 

    return (
        <PopupWithForm 
            title={'Редактировать профиль'}
            name = {'name'} 
            btnValue={props.btnValue} 
            isOpen={props.isOpen} 
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <Input className={'popup__input popup__input_type_user-name'} id="name" name="name" placeholder="Имя" maxLength="40" value={values.name || ''} onChange={handleChange} />
            <span className="popup__error" id="name-error"></span>
            <Input className={'popup__input popup__input_type_user-about'} id="job" name="about" placeholder="О себе" maxLength="200" value={values.about || ''} onChange={handleChange}/>
            <span className="popup__error" id="job-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
                