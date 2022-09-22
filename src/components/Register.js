import { Link, Navigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import React from 'react';


function Register (props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailInput (e) {
        setEmail(e.target.value)
    }

    function handlePasswordInput (e) {
        setPassword(e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault();

        auth.register(email, password)
        .then((res) => {
            props.onSubmit(res);
        });
    } 

    return ( !props.isRegistered ?
        <div className='auth-container'>
            <form className='auth' onSubmit={handleSubmit}>
                <h2 className='auth__header'>Регистрация</h2>
                <input className='auth__input' minLength={6} maxLength={20} type="email" placeholder='Email' value={email || ''} onChange={handleEmailInput}/>
                <input className='auth__input' type="password" maxLength={16} minLength={8} placeholder='Пароль' value={password || ''} onChange={handlePasswordInput}/>
                <button className='auth__btn' type='submit' >Зарегистрироваться</button>
                <div className='auth__link-container'>
                    <p className='auth__text'>Уже зарегестрированы?</p>
                    <Link className='auth__link' to={'/sign-in'}>Войти</Link>
                </div>
            </form>
        </div>
        :
        <Navigate to='/sign-in'/>
    );
}

export default Register;