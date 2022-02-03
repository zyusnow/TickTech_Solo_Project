
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Route, Routes } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Bread from '../Bread';
import HostingDrafts from '../HostingDrafts';
import HostingPublished from '../HostingPublished';

import './Hosting.css'

function Hosting(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state?.session?.user);

    useEffect(()=> {
        if (!sessionUser) {
            navigate('/login')
        }
    },[sessionUser])


    return (
        <>
            <div id='profile_container'>
                <Bread />
                <div className='table_container'>
                    <div className='table_container_nav'>
                        <div className='nav_sub_title'>Hosting</div>
                        <div className='hosting_content'>
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
