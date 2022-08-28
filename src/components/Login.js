import * as auth from '../utils/auth.js';
import React from 'react';

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
        console.log('submitted');
        e.preventDefault();
        console.log('submitted');

        auth.login(email, password)
        .then((res) => {
            console.log(res);
        });
    } 

    return (
        <div className='auth-container'>
            <form className='auth' onSubmit={handleSubmit}>
                <h2 className='auth__header'>Вход</h2>
                <input className='auth__input' minLength={6} maxLength={16} placeholder='Email' value={email || ''} onChange={handleEmailInput}/>
                <input className='auth__input' minLength={8} maxLength={16} type="password" placeholder='Пароль' value={password || ''} onChange={handlePasswordInput}/>
                <button className='auth__btn' type='submit'>Войти</button>
            </form>
        </div>
    );
}

export default Login;