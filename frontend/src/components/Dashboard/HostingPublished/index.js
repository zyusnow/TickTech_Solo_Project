import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchApiPublishedEvents } from '../../../store/event';


function HostingPublished(){
    const dispatch = useDispatch();
    const events = useSelector(state => state.event.published);
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    useEffect(() => {
        dispatch(fetchApiPublishedEvents(sessionUser.id));
        // pass sessionUser.id that store needs, because store is: fetchApiDraftEvents = (userId)
    }, [dispatch]);

    const eventsArr = Object.values(events)

    return (
        <>
            <div  className='sub_sub_title'>Published Events</div>
            {!events.length?
                (<table>
                    <thead>
                        <tr>
                            <th>Event Date</th>
                            <th>Event Name</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(eventsArr).map(event => (
                            <tr key={event.id}>
                                <td>{event.date.slice(0,10)}</td>
                                <td>
                                    <Link to={`/events/${event.id}`}>{event.name}</Link>
                                </td>
                                <td>Edit</td>
                                <td>Delete</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                ):(<div>You haven't published any events yet.</div>)
            }
        </>



    )
}

export default HostingPublished
