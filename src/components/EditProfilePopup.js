import React from 'react';
import Input from './Input';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    }, [props.isOpen]);
    
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name: name,
          about: description
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
            <Input id="name" name="name" placeholder="Имя" maxLength="40" value={name || ''} onChange={setName} />
            <span className="popup__error" id="name-error"></span>
            <Input id="job" name="about" placeholder="О себе" maxLength="200" value={description || ''} onChange={setDescription}/>
            <span className="popup__error" id="job-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
                