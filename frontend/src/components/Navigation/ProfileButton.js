import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/')
  };

  const manageEvents = (e) => {
    e.preventDefault();
    if(sessionUser) {
      navigate(`/users/hosting/all`)
    }
  }

  return (
    <>
    {/* <div className="nav_right_head">Welcome, {user.username}!</div> */}
      <div className="nav_welcome">Welcome, {user.username}</div>
      <button className='nav_right_menu' onClick={openMenu}>
        <i className="fas fa-user-circle"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>
            <button id="nav_logout" onClick={manageEvents}>Manage Events</button>
          </li>
          <li>
            <button id="nav_logout" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  )
}

export default ProfileButton;
