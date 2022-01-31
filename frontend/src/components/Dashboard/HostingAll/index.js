import HostingDrafts from "../HostingDrafts"
import HostingPublished from "../HostingPublished"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HostingAll(){
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(()=> {
        if (!sessionUser) {
            navigate('/login')
        }
    },[])

    return(
        <>
            <h2>Hosting All</h2>
            <HostingPublished />
            <HostingDrafts />
        </>

    )
}

export default HostingAll
