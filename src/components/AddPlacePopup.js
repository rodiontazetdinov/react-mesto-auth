import React from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';

function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(()=>{
      setName(''); 
      setLink('');
   },[props.isOpen])
    
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onCardAdd({
          name: name,
          link: link
        });
      } 

    return (
        <PopupWithForm 
          title={'Новое место'}
          name = {'card-add'}
          btnValue={props.btnValue}
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
            <Input
              name={'name'}
              id={'text'}
              placeholder={'Название'}
              maxLength={30}
              value={name}
              type={'text'}
              onChange={setName}
            />
            <span className="popup__error" id="text-error"></span>
            <Input
              name={'link'}
              id={'url'}
              placeholder={'Ссылка на картинку'}
              maxLength={1000}
              value={link}
              onChange={setLink}
              type={'url'}
            />
            <span className="popup__error" id="url-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;