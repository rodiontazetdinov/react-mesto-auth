import { Link, Navigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import React from 'react';
import { useForm } from './../utils/Hooks.js';
import Input from './Input';


function Register ({ onRegSubmit, isRegistered, onPageChange, isOnLogin }) {

    const {values, handleChange, setValues} = useForm({});

    function handleSubmit (e) {
        e.preventDefault();

        auth.register(values.email, values.password)
        .then((res) => {
            onRegSubmit(res);
        });
    }

    function handlePage () {
        onPageChange(!isOnLogin)
    }

    return ( !isRegistered ?
        <div className='auth-container'>
            <form className='auth' onSubmit={handleSubmit}>
                <h2 className='auth__header'>Регистрация</h2>
                <Input className='auth__input' name='email' minLength={6} maxLength={20} type="email" placeholder='Email' value={values.email || ''} onChange={handleChange}/>
                <Input className='auth__input' name='password' type="password" maxLength={16} minLength={8} placeholder='Пароль' value={values.password || ''} onChange={handleChange}/>
                <button className='auth__btn' type='submit' >Зарегистрироваться</button>
                <div className='auth__link-container'>
                    <p className='auth__text'>Уже зарегестрированы?</p>
                    <Link className='auth__link' to={'/sign-in'} onClick={handlePage}>Войти</Link>
                </div>
            </form>
        </div>
        :
        <Navigate to='/sign-in'/>
    );
}

export default Register;