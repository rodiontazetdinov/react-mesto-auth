import close from '../images/close_icon.svg';

function PopupWithForm({ name, isOpen, onSubmit, title, children, btnValue, onClose }) {

    return (
        <div className={`popup popup_type_${name}${isOpen && ' popup_opened'}`}>
            <form className="popup__form" name={name} onSubmit={onSubmit}>
                <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
                {children}
                <input className="popup__button" type="submit" value={btnValue}/>
                <button type="button" className="popup__close" aria-label="закрыть" onClick={onClose}><img src={close} alt="иконка закрыть" className="popup__icon"/></button>
            </form>
        </div>
    )
}

export default PopupWithForm;