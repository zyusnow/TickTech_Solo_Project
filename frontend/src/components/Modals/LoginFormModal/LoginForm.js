import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../../store/session';

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }
    return (
        <form onSubmit={handleSubmit}>
            {errors.length ?
                <ul className='modal_ul_errors'>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul> : null
            }
            <label>
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
                <input
                    id='password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    required
                />
            </label>
            <button className="button_submit" type="submit">Log In</button>
        </form>
    );
}


export default LoginForm;
