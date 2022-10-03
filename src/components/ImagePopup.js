import close from '../images/close_icon.svg';

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_show-image${card.status}`}>
            <div className="popup__container">
                <button type="button" className="popup__close" aria-label="закрыть"><img src={close} alt="иконка закрыть" className="popup__icon" onClick={onClose}/></button>
                <img src={card.link} alt={card.name} className="popup__image"/>
                <p className="popup__text">{card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;