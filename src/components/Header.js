import logo from '../images/logo.svg';
import { Link, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useWindowSize } from '../utils/Hooks';

function Header({ isLoggedIn, isOnLogin, onPageChange, userEmail, onExit}) {

    const size = useWindowSize();

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [windowIsMobile, setWindowIsMobile] = useState(size.width < 450);

    useEffect(() => {
        size.width < 450 ? setWindowIsMobile(true) : setWindowIsMobile(false);
    }, [size]);

    function  handleMenu() {
        setMenuIsOpen(!menuIsOpen);
    };

    function handlePage () {
        onPageChange(!isOnLogin)
    }

    return (
        <header className={isLoggedIn && menuIsOpen? "header" : 'header header_type_logged-out'}>
            
            {isLoggedIn?
                <>  
                    <div className={menuIsOpen && (size.width < 450) ? "header__wrapper header__wrapper_type_under" : "header__wrapper"}>
                        {menuIsOpen && windowIsMobile?
                            <>
                                <img src={logo} alt="логотип" className="header__logo"/>
                                <button className='header__menu-close-btn' type="button" onClick={handleMenu}/>
                            </>
                            :
                            <img src={logo} alt="логотип" className="header__logo"/>
                        }
                        
                    </div>
                    <nav className="header__navbar">
                        <div className={menuIsOpen && windowIsMobile? 'header__email header__email_isOpen' : 'header__email'}>{userEmail}</div>
                        <Link className={ menuIsOpen && windowIsMobile? 'header__link header__link_isOpen' : 'header__link'} to={'/sign-in'} onClick={onExit}>Выйти</Link>
                        <button className={menuIsOpen && windowIsMobile? 'header__menu_closed' : 'header__menu'} type="button" onClick={handleMenu}/>
                    </nav>
                </>
                 :
                 isOnLogin?
                    <>
                        <img src={logo} alt="логотип" className="header__logo"/>
                        <nav className="header__navbar">
                            <div className='header__email'>{userEmail}</div>
                            <Link className={isLoggedIn? 'header__link' : 'header__link header__link_onAuth'} to={'/sign-up'} onClick={handlePage}>Регистрация</Link>
                        </nav>
                    </>
                    :
                    <>
                        <img src={logo} alt="логотип" className="header__logo"/>
                        <nav className="header__navbar">
                            <div className='header__email'>{userEmail}</div>
                            <Link className={isLoggedIn? 'header__link' : 'header__link header__link_onAuth'} to={'/sign-in'} onClick={handlePage}>Вход</Link>
                        </nav>
                    </>
                }
                {/* <Routes>
                    <Route exact path="/">
                        <div className="header__wrapper">
                        <p className="header__user">das</p>
                        <button className="header__logout" onClick={console.log}>
                            Выйти
                        </button>
                        </div>
                    </Route>
                    <Route path="/signup">
                        <Link className="header__auth-link" to="signin">
                        Войти
                        </Link>
                    </Route>
                    <Route path="/signin">
                        <Link className="header__auth-link" to="signup">
                        Регистрация
                        </Link>
                    </Route>
                <Routes/> */}

            
        </header>
    )
}

export default Header;