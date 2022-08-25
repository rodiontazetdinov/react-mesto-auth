import pencil from '../images/pencil-icon.svg';
import plus from '../images/plus_icon.svg';
import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <button className="profile__avatar-update" type="button" name="avatar-update" onClick={props.onEditAvatar}><img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar"/></button>
                <div className="profile__container">
                    <h1 className="profile__person">{currentUser.name}</h1>
                    <p className="profile__job">{currentUser.about}</p>
                    <button className="profile__edit" type="button" aria-label="редактировать профиль" onClick={props.onEditProfile}><img src={pencil} alt="иконка карандаш"/></button>
                </div>
                <button className="profile__add-button" type="button" aria-label="добавить" onClick={props.onAddPlace}><img src={plus} alt="иконка плюс"/></button>
            </section>
            <section className="cards">
                <ul className="cards-list">
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        link={card.link}
                        name={card.name}
                        likes={card.likes}
                        onCardClick={props.onCardClick}
                        owner={card.owner._id}
                        onCardLike={props.onCardLike}
                        card={card}
                        onDeleteCard={props.onCardDelete}
                        onBinClick={props.onBinClick}
                    />
                ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;