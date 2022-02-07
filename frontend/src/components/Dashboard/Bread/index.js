
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Route, Routes } from "react-router-dom";
import "../Hosting/Hosting.css"

function Bread(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state?.session?.user);

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
    const goToInterest = (e) => {
        e.preventDefault();
        if(sessionUser) {
          navigate(`/users/interest`)
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
                            <button id="content_btn" onClick={goToInterest}>Interests</button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}


export default Bread
