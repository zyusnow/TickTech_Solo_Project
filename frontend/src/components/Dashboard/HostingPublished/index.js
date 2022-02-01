import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchApiPublishedEvents } from '../../../store/event';



function HostingPublished(){
    const dispatch = useDispatch();
    const events = useSelector(state => state.event.events);
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    console.log(sessionUser);
    useEffect(() => {
        dispatch(fetchApiPublishedEvents(sessionUser.id));
        // need sessionUser.id that store needs, because store is: etchApiDraftEvents = (userId)
    }, [dispatch]);

    const eventsArr = Object.values(events)
    console.log(eventsArr)

    return (
        <div>Published Events</div>

    )
}

export default HostingPublished
