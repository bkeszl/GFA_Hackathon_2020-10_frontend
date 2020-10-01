import React from 'react';
import useLogin from '../hooks/useLogin';

export default () => {
    const [username, setUsername, setPassword, message, submitLogin ] = useLogin();

    return (
        <>
            <div className="small-form fifty">
                <h2>Login</h2>
                <form onSubmit={event => submitLogin(event)}>
                    <input
                        name="username"
                        placeholder="Username"
                        type="text"
                        defaultValue={username}
                        onChange={event => {
                            setUsername(event.target.value);
                        }}
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={event => {
                            setPassword(event.target.value);
                        }}
                    />
                    {message ? <p className="error-message">{message}</p> : null}
                    <button type="submit">Sign in</button>
                </form>
            </div>
        </>
    );
}