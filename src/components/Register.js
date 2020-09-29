import React from 'react';
import useRegister from '../hooks/useRegister';

export default () => {
    const [setUsername, setEmail, setPassword, setConfirmPassword, setRole, message, submitRegister ] = useRegister();

    return (
        <>
            <div className="small-form">
                <h2>Register</h2>
                <form onSubmit={event => submitRegister(event)}>
                    <input
                        name="username"
                        placeholder="Username"
                        type="text"
                        onChange={event => {
                            setUsername(event.target.value);
                        }}
                    />
                    <input
                        name="email"
                        placeholder="email"
                        type="email"
                        onChange={event => {
                            setEmail(event.target.value);
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
                    <input
                        name="confirm_password"
                        placeholder="confirm password"
                        type="password"
                        onChange={event => {
                            setConfirmPassword(event.target.value);
                        }}
                    />
                    <select
                        name="role"
                        id="role"
                        placeholder="Select Option"
                        onChange={event => {
                            alert(event.target.value);
                            setRole(event.target.value);
                        }}
                    >
                        <option value="ROLE_VOLUNTEER" key="ROLE_VOLUNTEER" >I want to help.</option>
                        <option value="ROLE_NEEDY" key="ROLE_NEEDY" >I need help.</option>
                    </select>
                    {message ? <p className="message">{message}</p> : null}
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    );
}