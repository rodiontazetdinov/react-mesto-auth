import close from '../images/close_icon.svg';
import success from '../images/success-icon.png';
import error from '../images/error-icon.png';

function InfoToolTip ({ isOpen, onClose, isRegistered }) {
    return (
    <div className={`popup popup_type ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
            <button type="button" className="popup__close" aria-label="закрыть"><img src={close} alt="иконка закрыть" className="popup__icon" onClick={onClose}/></button>
            <div className='popup__result'>
                <img className='popup__result-image' src={isRegistered ? success : error} alt='результат регистрации'></img>
                <h2 className='popup__result-title'>{isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </div>
    </div>
);
}

export default InfoToolTip;