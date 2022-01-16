import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './LoginPage.css';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) {
        return <Navigate to="/" />
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

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
        navigate('/signup');
    }

    return (
        <div>
            <div>Log In</div>
            <form onSubmit={handleSubmit}>
                {errors.length ?
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul> : null
                }
                <label>
                    Username or Email
                    <input
                        id='username-or-email'
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        placeholder='Username or Email'
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        id='password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                    />
                </label>
                <button type="submit">Log In</button>
            </form>
            <hr />
            <form onSubmit={DemoLogin}>
                <button type="submit">Demo User</button>
            </form>
            <form onSubmit={handleRedirect}>
                <button type="submit">Want to Sign Up?</button>
            </form>
        </div>
    );
}

export default LoginPage;
