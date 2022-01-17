import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { Modal } from '../../../context/Modal';
import * as sessionActions from '../../../store/session';
import SignupForm from './SignupForm';
import '../../Navigation/'

function SignupFormModal() {
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
        navigate('/login');
    }

    return (
        <>
        <button className='button' onClick={() => setShowModal(true)}>Sign Up</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <SignupForm />
                <hr className="hrmodal"/>
                <form onSubmit={DemoLogin}>
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
export default SignupFormModal;
