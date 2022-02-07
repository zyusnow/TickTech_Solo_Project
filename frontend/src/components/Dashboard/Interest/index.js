
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import Bread from '../Bread';
import '../Hosting/Hosting.css'

function Interest(){
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
                    <div className='nav_sub_title'>Interest</div>
                </div>
            </div>
        </>
    )
}


export default Interest
