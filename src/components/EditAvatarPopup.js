import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onUpdateAvatar, btnValue, onClose }) {

    const avatarRef = React.useRef(); 

    React.useEffect(()=>{
      avatarRef.current.value = '';
   },[isOpen])
    
    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarRef.current.value
        });
    } 

    return (
        <PopupWithForm 
          title={'Обновить аватар'}
          name = {'avatar-save'} 
          btnValue={btnValue} 
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}>
            <input className="popup__input popup__input_type_image-url"
              id="avatar"
              type="url"
              name="avatar"
              placeholder="Ссылка на картинку"
              ref={avatarRef}
              required/>
            <span className="popup__error" id="avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;