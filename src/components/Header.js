import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, isAuthorized, isOnLogin, onPageChange, userEmail, onExit}) {

    function handlePage () {
        onPageChange(!isOnLogin)
    }

    return (
        <header className="header">
            
            {isLoggedIn?
                <>
                    <img src={logo} alt="логотип" className="header__logo"/>
                    <nav className="header__navbar">
                        <div className='header__email'>{userEmail}</div>
                        <Link className='header__link' to={'/sign-in'} onClick={onExit}>Выйти</Link>
                    </nav>
                </>
                 :
                 
                 isOnLogin?
                    <Link className='header__link' to={'/sign-up'} onClick={handlePage}>Регистрация</Link>
                    :
                    <Link className='header__link' to={'/sign-in'} onClick={handlePage}>Вход</Link>
                }
            
        </header>
    )
}

export default Header;