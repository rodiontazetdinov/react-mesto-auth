import * as auth from '../utils/auth.js';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from './../utils/Hooks.js';
import Input from './Input';

function Login (props) {

    const {values, handleChange, setValues} = useForm({});

    function handleSubmit (e) {
        e.preventDefault();

        auth.login(values.email, values.password)
        .then((res) => {
            props.onSubmit(res);
        });
    } 

    return ( !props.isLoggedIn?
        <div className='auth-container'>
            <form className='auth' onSubmit={handleSubmit}>
                <h2 className='auth__header'>Вход</h2>
                <Input className='auth__input' name='email' minLength={6} maxLength={32} placeholder='Email' value={values.email || ''} onChange={handleChange}/>
                <Input className='auth__input' name='password' minLength={8} maxLength={16} type="password" placeholder='Пароль' value={values.password || ''} onChange={handleChange}/>
                <button className='auth__btn' type='submit'>Войти</button>
            </form>
        </div>
        :
        <Navigate to='/'/>
    );
}

export default Login;