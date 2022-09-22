import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, isAuthorized, isOnLogin, onPageChange}) {

    function handlePage () {
        onPageChange(!isOnLogin)
    }

    return (
        <header className="header">
            <img src={logo} alt="логотип" className="header__logo"/>
            {isAuthorized?
                <>
                    <div className='header__email'>email</div>
                    <Link className='header__link' to={'/sign-in'}>Выйти</Link>
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