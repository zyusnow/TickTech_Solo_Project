import HostingDrafts from "../HostingDrafts"
import HostingPublished from "../HostingPublished"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HostingAll(){
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state?.session?.user);

    useEffect(()=> {
        if (!sessionUser) {
            navigate('/login')
        }
    },[])

    return(
        <>
            <HostingPublished />
            <HostingDrafts />
        </>

    )
}

export default HostingAll
