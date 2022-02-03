
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Route, Routes } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Bread from '../Bread';
import '../Hosting/Hosting.css'

function Saved(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state?.session?.user);


    useEffect(()=> {
        if (!sessionUser) {
            navigate('/login')
        }
    },[])

    return (
        <>
            <div id='profile_container'>
                <Bread />
                <div className='table_container'>
                    <div className='nav_sub_title'>Saved</div>
                </div>
            </div>
        </>
    )
}


export default Saved
