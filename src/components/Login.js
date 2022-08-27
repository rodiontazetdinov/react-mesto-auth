function Login (props) {

    return (
        <div className='auth-container'>
            <form className='auth'>
                <h2 className='auth__header'>Вход</h2>
                <input className='auth__input' minLength={6} maxLength={16} placeholder='Email'/>
                <input className='auth__input' minLength={8} maxLength={16} type="password" placeholder='Пароль'/>
                <button className='auth__btn' type='submit'>Войти</button>
            </form>
        </div>
    );
}

export default Login;