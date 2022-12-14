import {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';

import * as auth from '../utils/auth.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoToolTip from './InfoToolTip';

import ConfirmDeletePopup from './ConfirmDeletePopup';
import ProtectedRoute from './ProtectedRoute';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

import {api} from '../utils/Api.js';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOnLogin, setIsOnLogin] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [userData, setUserData] = useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [isAddPlacePopupOpen , setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedCard, selectCard] = useState({});
    const [currentUser, setCurrentUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState({});

    const tokenCheck = () => {
        const token = localStorage.getItem('token');

        if (!token) return;

        auth.checkToken(token)
        .then(data => {
            setUserData(data.data);
            setIsLoggedIn(true);
        })
        .catch((err) => console.log(err));
    };

    const handleExit = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserData({});
    };

    useEffect(() => {
        tokenCheck();
    }, []);

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
        // ?????????? ??????????????????, ???????? ???? ?????? ???????? ???? ???????? ????????????????
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // ???????????????????? ???????????? ?? API ?? ???????????????? ?????????????????????? ???????????? ????????????????
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
            closeAllPopups();
        })
        .catch(err => {
            console.log(err);
        })
    } 

    function handleEditAvatarClick () {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleEditProfileClick () {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick () {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleCardClick (card) {
        selectCard(card);
    }

    function closeAllPopups () {
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsDeletePopupOpen(false);
        setIsInfoToolTipOpen(false);
        selectCard({
            link: "#",
            status: ''
        });
    }

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link;

    useEffect(() => {
        function closeByEscape(evt) {
        if(evt.key === 'Escape') {
            closeAllPopups();
        }
        }
        if(isOpen) { // ???????????????????? ???????????? ?????? ????????????????
        document.addEventListener('keydown', closeByEscape);
        return () => {
            document.removeEventListener('keydown', closeByEscape);
        }
        }
    }, [isOpen]); 

    function handleUpdateUser (obj) {
        setIsLoading(true);
        api.patchUserInfo(obj)
        .then(userData => {
            setCurrentUserInfo(userData);
            closeAllPopups();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    function handleUpdateAvatar (obj) {
        setIsLoading(true);
        api.setAvatar(obj)
        .then(userData => {
            setCurrentUserInfo(userData);
            closeAllPopups();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    function handleAddPlaceSubmit (obj) {
        setIsLoading(true);
        api.postNewCard(obj)
        .then(newCard => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    function handleRegistration (email, password) {
        auth.register(email, password)
        .then((res) => {
            if (res.data) {
                setIsRegistered(true);
            }
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setIsInfoToolTipOpen(true);
        });
        
        
    }

    function handleLogin (email, password) {
        auth.login(email, password)
        .then((res) => {
            if (res) {
                setIsLoggedIn(true);
                if (res.token) {
                    localStorage.setItem('token', res.token);
                }
            }
            tokenCheck();
        })
        .catch(err => {
            console.log(err);
            setIsInfoToolTipOpen(true);
        });
       
    }
    
  return (
    <div className="App">
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    isLoggedIn={isLoggedIn}
                    isOnLogin={isOnLogin}
                    onPageChange={setIsOnLogin}
                    onExit={handleExit}
                    userEmail={userData.email}/>
                <Routes>
                    <Route 
                        path={'/sign-up'}
                        element={<Register onRegSubmit={handleRegistration} isRegistered={isRegistered} onPageChange={setIsOnLogin} isOnLogin={isOnLogin}/>}/>
                    <Route 
                        path={'/sign-in'}
                        element={<Login onSubmit={handleLogin} isLoggedIn={isLoggedIn}/>}/>
                    <Route  path={'/'} element={<ProtectedRoute loginCheck={isLoggedIn}/>}>
                        <Route path='/' element={<Main
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={setCard}
                            onBinClick={setIsDeletePopupOpen}
                            />}>
                        </Route>
                    </Route>
                </Routes>
                <Footer/>
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  btnValue={isLoading? '????????????????????...' : '??????????????????'}
                />
                <AddPlacePopup 
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onCardAdd={handleAddPlaceSubmit}
                  btnValue={isLoading? '????????????????...' : '??????????????'}
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
                  btnValue={isLoading? '????????????????????...' : '??????????????????'}
                /> 
                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                <InfoToolTip isRegistered={isRegistered} isOpen={isInfoToolTipOpen} onClose={closeAllPopups}/>
            </div>
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;