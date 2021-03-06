import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { fetchApiEvents } from '../../../store/event';
import { fetchApiTypes } from '../../../store/type';
import './EventsBrowse.css'

function EventsBrowse() {
    const dispatch = useDispatch();
    const events = useSelector(state => state?.event?.events);
    const eventsArr = Object.values(events)

    const types = useSelector(state => state.type.types);
    const typesArr = Object.values(types);

    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchApiEvents());
        dispatch(fetchApiTypes())
    }, [dispatch]);

    function shortcontent(str) {
        if (str?.length < 70) return str;
        else return (str)?.slice(0, 70) + '...';
    }

    const toEvent = (id, e) => {
        e.preventDefault();
        navigate(`/events/${id}`);
    }


    return (
        <>
            <div className='events_main'>
                <div id="events_title">Popular Events</div>


                <div className='card_container'>
                    {eventsArr?.map(event => (
                        <div className='one_card_container' key={event?.id} onClick={e=>toEvent(event?.id,e)}>
                            <div className='img_container'>
                                <img className="img" src={event?.imgUrl}></img>
                            </div>
                            <div className='card_content'>
                                <div className={`type type_${event?.Type?.id}`}>{event?.Type?.name}</div>
                                <div className='event_name'>{event?.name}</div>
                                {/* <div className='event_time'>{event?.date}</div> */}
                                <div className='event_time_main'>
                                    <i className="fas fa-calendar-minus"></i>
                                    <div className='event_time'>Sat, Feb 12, 2:00 PM</div>
                                </div>
                                <div className='event_location_main'>
                                    {/* <i className="far fa-map-marker-alt"></i> */}
                                    <i className="far fa-compass"></i>
                                    <div className='event_location'>
                                        {!event?.virtual ? (<>{event?.Venue?.name}</>) : (<>Virtual Event</>)}
                                        {/* <div className="event_location_2">{event?.Venue?.address} {event?.Venue?.city} {event?.Venue?.state}</div> */}
                                        {/* <div className="event_location_2">{shortaddress({event?.Venue?.address}, {event?.Venue?.city}, {event?.Venue?.state})}</div> */}
                                    </div>
                                </div>
                                    <div className='event_description'>"{shortcontent(event?.description)}"</div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default EventsBrowse
