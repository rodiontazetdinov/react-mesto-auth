import pencil from '../images/pencil-icon.svg';
import plus from '../images/plus_icon.svg';
import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete, onBinClick }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <button className="profile__avatar-update" type="button" name="avatar-update" onClick={onEditAvatar}><img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar"/></button>
                <div className="profile__container">
                    <h1 className="profile__person">{currentUser.name}</h1>
                    <p className="profile__job">{currentUser.about}</p>
                    <button className="profile__edit" type="button" aria-label="редактировать профиль" onClick={onEditProfile}><img src={pencil} alt="иконка карандаш"/></button>
                </div>
                <button className="profile__add-button" type="button" aria-label="добавить" onClick={onAddPlace}><img src={plus} alt="иконка плюс"/></button>
            </section>
            <section className="cards">
                <ul className="cards-list">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        link={card.link}
                        name={card.name}
                        likes={card.likes}
                        onCardClick={onCardClick}
                        owner={card.owner._id}
                        onCardLike={onCardLike}
                        card={card}
                        onDeleteCard={onCardDelete}
                        onBinClick={onBinClick}
                    />
                ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;