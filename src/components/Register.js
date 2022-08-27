import { Link } from 'react-router-dom';


function Register (props) {


    return (
        <div className='auth-container'>
            <form className='auth'>
                <h2 className='auth__header'>Регистрация</h2>
                <input className='auth__input' minLength={6} maxLength={16} placeholder='Email'/>
                <input className='auth__input' type="password" maxLength={16} minLength={8} placeholder='Пароль'/>
                <button className='auth__btn' type='submit'>Зарегистрироваться</button>
                <div className='auth__link-container'>
                    <p className='auth__text'>Уже зарегестрированы?</p>
                    <Link className='auth__link' to={'/sign-in'}>Войти</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;