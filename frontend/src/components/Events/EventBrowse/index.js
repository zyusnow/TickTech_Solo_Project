import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchApiEvent } from '../../../store/event';
import './EventBrowse.css'

function EventBrowse() {
    const dispatch = useDispatch();
    const {id} = useParams();   // id here is a string
    const eventId = +id;  // change it to a number
    const sessionUser = useSelector(state => state.session.user);
    const eventObj = useSelector(state => state.event);  // get spot: spotReducer(in store index.js) 's state
    const event = eventObj[eventId];
    console.log("eventbrowse", event)

    useEffect(() => {
        dispatch(fetchApiEvent(eventId));
    }, [dispatch],eventId);

    return (
        <>
            <div id='event_browse_container'>
                <div className='container_leftUp'>
                    {<img className='event_img' src={event?.imgUrl}></img>}
                </div>

                <div className='event_card container_rightUp'>
                    <div className={`type1 type_${event?.Type?.id}`}>{event?.Type?.name}</div>
                    <div className='content date_title'>{event?.date}</div>
                    <div className='title'>{event?.name}</div>
                </div>

                <div className='event_card container_leftDown'>
                    <div className='event_title content'>About this event</div>
                    <div className='content'>{event?.description}</div>
                </div>

                <div className='event_card container_rightDown'>
                    <div className='container_rightDown_location'>
                        <div className='event_title content'>Date and time</div>
                        <div className='content date'>{event?.date}</div>
                    </div>
                    <div className='event_card container_rightDown_date'>
                        <div id= 'location_title' className='event_title content'>Where to go</div>
                        <div className='location'>{!event?.virtual ? (<>{event?.Venue?.name}</>) : (<>Virtual Event</>)}</div>
                        <div className='location'>{!event?.virtual ? (<>{event?.Venue?.address}</>) : (<></>)}</div>
                        <div className='location'>{!event?.virtual ? (<>{event?.Venue?.city} {event?.Venue?.state} {event?.Venue?.zipCode}</>) : (<></>)}</div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default EventBrowse
