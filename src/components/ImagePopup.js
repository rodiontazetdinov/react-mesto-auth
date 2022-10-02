import close from '../images/close_icon.svg';

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_show-image${props.card.status}`}>
            <div className="popup__container">
                <button type="button" className="popup__close" aria-label="закрыть"><img src={close} alt="иконка закрыть" className="popup__icon" onClick={props.onClose}/></button>
                <img src={props.card.link} alt={props.card.name} className="popup__image"/>
                <p className="popup__text">{props.card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;