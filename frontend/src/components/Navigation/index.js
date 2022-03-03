import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaGithub, FaLinkedin} from 'react-icons/fa';
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
        <>
        <nav className="nav">
            <div className='nav_left'>
                <i className="fab fa-tumblr-square"></i>
                <NavLink id="nav_head" to="/">TickTech</NavLink>
            </div>
            <div className='nav_center'>
                <NavLink to="/">Find Tech Events</NavLink>
                <NavLink to="/events/add">Create an Event</NavLink>
                <div className='find_me'>
                    <span>Find me:</span>
                    <a className="git_logo" href="https://github.com/zyusnow" target="_blank"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/mezyu/" target="_blank"><FaLinkedin /></a>
                </div>
            </div>
            <div className='nav_right'>
                {isLoaded && sessionLinks}
            </div>
        </nav>
        <hr></hr>
        </>
    )

}

export default Navigation;
