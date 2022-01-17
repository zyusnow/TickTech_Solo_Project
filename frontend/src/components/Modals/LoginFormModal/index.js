import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { Modal } from '../../../context/Modal';
import * as sessionActions from '../../../store/session';
import Navigation from '../../Navigation';
import LoginForm from './LoginForm';
import '../../Navigation/Navigation.css';


function LoginFormModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

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
        setShowModal(false);
        navigate('/signup');
    }
    return (
        <>
            <button className='button button_login' onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                    <hr className="hrmodal"/>
                    <form  onSubmit={DemoLogin}>
                        <button className="button_submit button_secondary"type="submit">Demo User</button>
                    </form>
                    <form onSubmit={handleRedirect}>
                        <button className="button_submit button_transfer" type="submit">Want to Sign Up?</button>
                    </form>
                </Modal>
            )}
        </>
    )

}

export default LoginFormModal;
