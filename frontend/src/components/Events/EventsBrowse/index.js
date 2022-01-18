import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiEvents } from '../../../store/event';


function EventsBrowse() {
    const dispatch = useDispatch();
    const events = useSelector(state => state.event.events);
    useEffect(() => {
        dispatch(fetchApiEvents());
    }, [dispatch]);
    const eventsArr = Object.values(events)
    console.log("at Component", eventsArr);
    return (
        <>
        <div>Events Happening</div>
        {eventsArr.map(event => (
            <div>
              <div>{event.name}</div>
              <div>{event.date}</div>
              <div>{event.Venue.name} {event.Venue.address} {event.Venue.city} {event.Venue.state} {event.Venue.zipCode}</div>
            </div>
        ))}
        </>
    )
}

export default EventsBrowse
