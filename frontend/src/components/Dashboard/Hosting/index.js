
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Route, Routes } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Attending from '../Attending';
import Saved from '../Saved';
import './Hosting.css'

function Hosting(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);


    useEffect(()=> {
        if (!sessionUser) {
            navigate('/login')
        }
    },[])

    const goToHosting = (e) => {
        e.preventDefault();
        if(sessionUser) {
          navigate(`/users/${sessionUser.id}/hosting`)
        }
    }
    const goToAttending = (e) => {
        e.preventDefault();
        if(sessionUser) {
          navigate(`/users/${sessionUser.id}/attending`)
        }
      }
    const goToSaved = (e) => {
        e.preventDefault();
        if(sessionUser) {
          navigate(`/users/${sessionUser.id}/saved`)
        }
      }

    return (
        <>
            <div id='profile_container'>
                <div className='content'>
                    <ul>
                        <li className='content_li'>
                            <button id="content_btn" onClick={goToHosting}>Hosting</button>
                        </li>
                        <li className='content_li'>
                            <button id="content_btn" onClick={goToAttending}>Attending</button>
                        </li>
                        <li className='content_li'>
                            <button id="content_btn" onClick={goToSaved}>Saved</button>
                        </li>
                    </ul>
                </div>
                <div className='table_container'>
                    <h2>Hosting</h2>
                    <Routes>
                        <Route path='/users/:id/hosting' element={<Hosting />} />
                        <Route path='/users/:id/attending' element={<Attending />} />
                        <Route path='/users/:id/saved' element={<Saved />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}


export default Hosting
