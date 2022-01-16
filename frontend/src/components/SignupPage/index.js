import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import * as sessionActions from '../../store/session';
import '../LoginPage/LoginPage.css';

function SignupPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) {
        return <Navigate to="/" />
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Passwords must be the same.']);
    };

    const DemoLogin = (e) => {
        e.preventDefault();
        const demoUser = {
            credential: "Demo-lition",
            password: "password"
        }

        return dispatch(sessionActions.login(demoUser))
            .catch(async (res) => {
                await res.json();
            });
    }

    const handleRedirect = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    return (
        <div>
            <div>Sign Up</div>
            <form onSubmit={handleSubmit}>
                {errors.length ?
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul> : null
                }
                <label htmlFor='email'>
                    <input
                        id='email'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        required
                    />
                </label>
                <label htmlFor='username'>
                    <input
                        id='username'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Username'
                        required
                    />
                </label>
                <label htmlFor='password'>
                    <input
                        id='password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                    />
                </label>
                <label htmlFor='confirm-password'>
                    <input
                        id='confirm-password'
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Confirm Password'
                        required
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
            <hr />
            <form onSubmit={DemoLogin}>
                <button type="submit">Demo User</button>
            </form>
            <form onSubmit={handleRedirect}>
                <button type="submit">Want to Log In?</button>
            </form>
        </div>
    )

}

export default SignupPage;
