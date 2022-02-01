
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
    },[sessionUser])

    const goToHosting = (e) => {
        e.preventDefault();
        if(sessionUser) {
          navigate(`/users/hosting/published`)
        }
    }
    const goToAttending = (e) => {
        e.preventDefault();
        if(sessionUser) {
          navigate(`/users/attending`)
        }
      }
    const goToSaved = (e) => {
        e.preventDefault();
        if(sessionUser) {
          navigate(`/users/saved`)
        }
      }

    return (
        <>
            <div id='profile_container'>
                <div className='da_content'>
                    <ul>
                        <li className='da_content_li'>
                            <button id="content_btn" onClick={goToHosting}>Hosting</button>
                        </li>
                        <li className='da_content_li'>
                            <button id="content_btn" onClick={goToAttending}>Attending</button>
                        </li>
                        <li className='da_content_li'>
                            <button id="content_btn" onClick={goToSaved}>Saved</button>
                        </li>
                    </ul>
                </div>
                <div className='table_container'>
                    <div className='table_container_nav'>
                        <div className='nav_sub_title'>Hosting</div>
                        <div className='hosting_content'>
                            {/* <div className='test'>
                                <NavLink className="hosting_link" to={`/users/hosting/allevents`}>All</NavLink>
                            </div> */}
                            {/* <div className='divider'>|</div> */}
                            <div>
                                <NavLink className="hosting_link" to={`/users/hosting/published`}>Published</NavLink>
                            </div>
                            <div className='divider'>|</div>
                            <div>
                                <NavLink className="hosting_link" to={`/users/hosting/drafts`}>Drafts</NavLink>
                            </div>
                        </div>
                    </div>
                    <Routes>
                        {/* <Route path='all' element={<HostingAll />} /> */}
                        <Route path='drafts' element={<HostingDrafts />} />
                        <Route path='published' element={<HostingPublished />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}


export default Hosting
