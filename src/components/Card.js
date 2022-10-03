import bin from '../images/bin_icon.svg';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import React from 'react';

function Card({ owner, likes, link, name, onCardClick, onCardLike, card, onBinClick, onDeleteCard }) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `cards-list__card-bin ${isOwn ? '' : 'cards-list__card-bin_hidden'}`
      ); 

    const isLiked = likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `cards-list__like ${isLiked ? 'cards-list__like_active' : ''}`
      ); 

    function handleClick () {
        const card = {
            link: link,
            status: ' popup_opened',
            name: name
        }
        onCardClick(card);
    }

    function handleLikeClick () {
        onCardLike(card);
    }

    function handleDeleteClick () {
        onBinClick(true)
        onDeleteCard(card);
    }

    return (
        <li className="cards-list__card-container">
            <img src={link} alt={name} className="cards-list__card-image" onClick={handleClick}/>
            <img src={bin} alt="иконка удаления" className={cardDeleteButtonClassName} onClick={handleDeleteClick}/>
            <div className="cards-list__info">
                <h2 className="cards-list__name">{name}</h2>
                <div className="cards-list__like-container">
                    <button type="button" className={cardLikeButtonClassName} aria-label="лайк" onClick={handleLikeClick}></button>
                    <div className="cards-list__like-counter">{likes.length}</div>
                </div>
            </div>
        </li>
    )
}

export default Card;