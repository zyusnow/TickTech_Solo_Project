
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Route, Routes } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Attending from '../Attending';
import Hosting from '../Hosting';
import Saved from '../Saved';
import './ProfilePage.css'

function UserProfile(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);


    useEffect(()=> {
        if (!sessionUser) {
            navigate('/login')
        }
    },[])

    const goToAll = (e) => {
        e.preventDefault();
        if(sessionUser) {
          navigate(`/users/${sessionUser.id}`)
        }
      }
    const goToAttending = (e) => {
        e.preventDefault();
        if(sessionUser) {
          navigate(`/events`)
        }
      }
    const goToSaved = (e) => {
        e.preventDefault();
        if(sessionUser) {
          navigate(`/events`)
        }
      }

    return (
        <>
            <div id='profile_container'>
                <div className='content'>
                    <ul>
                        <li>
                            <button id="nav_logout" onClick={goToAll}>Hosting</button>
                        </li>
                        <li>
                            <button id="nav_logout" onClick={goToAttending}>Attending</button>
                        </li>
                        <li>
                            <button id="nav_logout" onClick={goToSaved}>Saved</button>
                        </li>
                    </ul>
                </div>
                <div className='table_container'>
                    <h2>Title</h2>
                    <Routes>
                        <Route path='all' element={<Hosting />} />
                        <Route path='drafts' element={<Attending />} />
                        <Route path='published' element={<Saved />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}


export default UserProfile
