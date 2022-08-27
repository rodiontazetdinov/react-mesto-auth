import {useEffect, useState} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';


import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ProtectedRoute from './ProtectedRoute';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

import {api} from '../utils/Api.js';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEditProfilePopupOpen, changeProfileOpenState] = useState(false);
    const [isAddPlacePopupOpen , changePlaceState] = useState(false);
    const [isEditAvatarPopupOpen, changeAvatarState] = useState(false);
    const [isDeletePopupOpen, changeDeleteState] = useState(false);
    const [selectedCard, selectCard] = useState({});
    const [currentUser, setCurrentUserInfo] = useState({});
    const [profilePopupBtnValue, setProfilePopupBtnValue] = useState('Сохранить');
    const [addCardPopupBtnValue, setAddCardPopupBtnValue] = useState('Создать');
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState({});

    useEffect(() => {
        api.getInitialCards()
        .then(cards => {
            setCards(cards);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        api.getProfile()
        .then(userData => {
            setCurrentUserInfo(userData);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        if (isLiked) {
            api.decreaseLike(card._id).then((newCard) => {
                setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            api.increaseLike(card._id).then((newCard) => {
                setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log(err);
            });
        }
    } 

    function handleDeleteCard () {
        api.removeMyCard(card._id)
        .then((deletedCard) => {
            setCards((cards) => cards.filter((item) => item._id != card._id));
        })
        .catch(err => {
            console.log(err);
        })
    } 

    function handleEditAvatarClick () {
        changeAvatarState(!isEditAvatarPopupOpen);
    }

    function handleEditProfileClick () {
        changeProfileOpenState(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick () {
        changePlaceState(!isAddPlacePopupOpen);
    }

    function handleCardClick (card) {
        selectCard(card);
    }

    function closeAllPopups () {
        changePlaceState(false);
        changeProfileOpenState(false);
        changeAvatarState(false);
        changeDeleteState(false);
        selectCard({
            link: "#",
            status: ''
        });
    }

    function handleUpdateUser (obj) {
        setProfilePopupBtnValue('Сохранение...');
        api.patchUserInfo(obj)
        .then(userData => {
            setCurrentUserInfo(userData);
            setProfilePopupBtnValue('Сохранить');
        })
        .catch(err => {
            console.log(err);
            setProfilePopupBtnValue('Сохранить');
        })

        closeAllPopups();
    }

    function handleUpdateAvatar (obj) {
        setProfilePopupBtnValue('Сохранение...');
        api.setAvatar(obj)
        .then(userData => {
            setCurrentUserInfo(userData);
            setProfilePopupBtnValue('Сохранить');
        })
        .catch(err => {
            console.log(err);
            setProfilePopupBtnValue('Сохранить');
        })

        closeAllPopups();
    }

    function handleAddPlaceSubmit (obj) {
        setAddCardPopupBtnValue('Создание...');
        api.postNewCard(obj)
        .then(newCard => {
            setCards([newCard, ...cards]);
            setAddCardPopupBtnValue('Создать');
        })
        .catch(err => {
            console.log(err);
            setAddCardPopupBtnValue('Создать');
        })

        closeAllPopups();
    }
    
  return (
    <div className="App">
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header/>
                <Routes>
                    <Route path={'/sign-up'} element={<Register/>}/>
                    <Route path={'/sign-in'} element={<Login/>}/>
                    <Route path={'/'} element={<ProtectedRoute/>}>
                        <Route path='/' element={<Main
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={setCard}
                            onBinClick={changeDeleteState}
                            />}>
                        </Route>
                    </Route>
                    <Route>
                        {isLoggedIn ? (
                           () => <Navigate to="/" />
                        ) : (
                            () => <Navigate to="/sign-in" />
                        )}
                    </Route>
                </Routes>
                <Footer/>
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  btnValue={profilePopupBtnValue}
                />
                <AddPlacePopup 
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onCardAdd={handleAddPlaceSubmit}
                  btnValue={addCardPopupBtnValue}
                />
                <ConfirmDeletePopup 
                  onCardDelete={handleDeleteCard}
                  isOpen={isDeletePopupOpen}
                  onClose={closeAllPopups}
                />
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                  btnValue={profilePopupBtnValue}
                /> 
                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            </div>
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
