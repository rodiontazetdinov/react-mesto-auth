import close from '../images/close_icon.svg';

function InfoToolTip (props) {
    return (
    <div className={`popup popup_type${props.ispen ? 'popup__opened' : ''}`}>
        <div className="popup__container">
            <button type="button" className="popup__close" aria-label="закрыть"><img src={close} alt="иконка закрыть" className="popup__icon" onClick={props.onClose}/></button>
        </div>
    </div>
);
}

export default InfoToolTip;