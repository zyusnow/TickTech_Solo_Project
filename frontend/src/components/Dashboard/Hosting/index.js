
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Route, Routes } from "react-router-dom";
import { useParams } from 'react-router-dom';
import HostingAll from '../HostingAll';
import HostingDrafts from '../HostingDrafts';
import HostingPublished from '../HostingPublished';

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
          navigate(`/users/${sessionUser.id}/hosting/all`)
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
                    <div className='table_container_nav'>
                        <h2>Hosting</h2>
                        <div className='hosting_content'>
                            <div className='test'>
                                <NavLink className="hosting_link" to='/users/${sessionUser.id}/hosting/all'>All</NavLink>
                            </div>
                            <div className='divider'>|</div>
                            <div>
                                <NavLink className="hosting_link" to='/users/${sessionUser.id}/hosting/published'>Drafts</NavLink>
                            </div>
                            <div className='divider'>|</div>
                            <div>
                                <NavLink className="hosting_link" to='/users/${sessionUser.id}/hosting/drafts'>Published</NavLink>
                            </div>
                        </div>
                    </div>
                    <Routes>
                        <Route path='all' element={<HostingAll />} />
                        <Route path='drafts' element={<HostingDrafts />} />
                        <Route path='published' element={<HostingPublished />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}


export default Hosting


                // <Routes>
                //     <Route path='all' element={<EventsAll />} />
                //     <Route path='drafts' element={<EventsDrafts />} />
                //     <Route path='published' element={<EventsPublished />} />
                // </Routes>
