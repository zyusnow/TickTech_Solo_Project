
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate, NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { editEvent, fetchApiEvent, fetchApiEvents } from '../../../store/event';
import { fetchApiTypes } from '../../../store/type';
import { addNewVenue, editOldVenue } from '../../../store/venue';
import HasEvent from '../HasEvent';


function EventEdit(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state?.session?.user);
    const {id} = useParams();
    const eventId = +id;
    const event = useSelector(state => state?.event?.events[eventId]);


    useEffect(() => {
        dispatch(fetchApiEvent(eventId));
        dispatch(fetchApiTypes())
    }, [dispatch],eventId);

    useEffect(()=> {
        if (!sessionUser) {
            navigate('/login')
        }
    },[])

    if (event){
        return <HasEvent event={event} eventId={eventId}/>;
    }
    else{
        return (<></>);
    }
}


export default EventEdit
