import * as auth from '../utils/auth.js';
import React from 'react';
import { Navigate } from 'react-router-dom';

function Login (props) {

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

        auth.login(email, password)
        .then((res) => {
            props.onSubmit(res);
        });
    } 

    

    return ( !props.isLoggedIn?
        <div className='auth-container'>
            <form className='auth' onSubmit={handleSubmit}>
                <h2 className='auth__header'>Вход</h2>
                <input className='auth__input' minLength={6} maxLength={32} placeholder='Email' value={email || ''} onChange={handleEmailInput}/>
                <input className='auth__input' minLength={8} maxLength={16} type="password" placeholder='Пароль' value={password || ''} onChange={handlePasswordInput}/>
                <button className='auth__btn' type='submit'>Войти</button>
            </form>
        </div>
        :
        <Navigate to='/'/>
    );
}

export default Login;