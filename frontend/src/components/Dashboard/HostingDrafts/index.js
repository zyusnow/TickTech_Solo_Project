
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchApiDraftEvents } from '../../../store/event';
import DeleteModal from '../../Modals/DeleteModal';


function HostingDrafts(){
    const dispatch = useDispatch();
    const events = useSelector(state => state?.event?.draft);
    const eventsArr = Object.values(events)
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state?.session?.user);
    useEffect(() => {
        dispatch(fetchApiDraftEvents(sessionUser?.id));
        // pass sessionUser.id that store needs, because store is: fetchApiDraftEvents = (userId)
    }, [dispatch]);

    return (
        <>
            <div  className='sub_sub_title'>Drafts</div>
            {!events?.length?
                (<table>
                    <thead>
                        <tr>
                            <th>Event Date</th>
                            <th>Event Name</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventsArr.map(event => (
                            <tr key={event?.id}>
                                <td> {event?.date ? event?.date.slice(0,10): null}</td>
                                <td> {event?.name}</td>
                                <td>Edit</td>
                                <td><DeleteModal eventId = {event?.id} published = {event?.published}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ):(<div>You don't have any draft here.</div>)
            }
        </>



    )
}



export default HostingDrafts
