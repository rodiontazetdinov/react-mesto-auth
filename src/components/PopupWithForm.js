import close from '../images/close_icon.svg';

function PopupWithForm(props) {

    return (
        <div className={`popup popup_type_${props.name}${props.isOpen && ' popup_opened'}`}>
            <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
                <h2 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h2>
                {props.children}
                <input className="popup__button" type="submit" value={props.btnValue}/>
                <button type="button" className="popup__close" aria-label="закрыть" onClick={props.onClose}><img src={close} alt="иконка закрыть" className="popup__icon"/></button>
            </form>
        </div>
    )
}

export default PopupWithForm;