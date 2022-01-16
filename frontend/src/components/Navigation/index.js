import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


import ProfileButton from './ProfileButton';
import LoginFormModal from '../Modals/LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../Modals/SignupFormModal';



function Navigation({ isLoaded }) {
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        if (location.pathname === '/signup' || location.pathname === '/login') {
            sessionLinks = (<></>)
        } else {
            sessionLinks = (
                <>
                    <LoginFormModal />
                    <SignupFormModal />
                </>
            );
        }
    }

    return (
        <nav>
            <NavLink to="/">TichTech</NavLink>
            <div className='nav_right'>
                {isLoaded && sessionLinks}
            </div>
        </nav>
    )

}

export default Navigation;
