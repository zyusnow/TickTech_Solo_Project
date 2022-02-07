
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from "react-router-dom";
import {fetchApiLikes, addLikeByUser, deleteLikeByUser} from '../../../store/like'
import Bread from '../Bread';
import Remove from '../Remove';
import './Interest.css';

function Interest(){
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state?.session?.user);

    const likes = useSelector(state => state?.like?.likes);
    const likesArr = Object.values(likes);
    const userLikes = likesArr.filter(like => like.userId === +sessionUser.id)



    useEffect(()=> {
        if (!sessionUser) {
            navigate('/login')
        } else {
            dispatch(fetchApiLikes())
        }
    },[dispatch])


    return (
        <>
            <div id = "interest">
                <div id='profile_container'>
                    <Bread />
                </div>
                <div className='table_container'>
                    <div className='nav_sub_title_interest'>Interests</div>

                    {userLikes.length?
                        (<table>
                            <thead>
                                <tr>
                                    <th>Event Date</th>
                                    <th>Event Name</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userLikes.map(like => (
                                    <tr key={like.id}>
                                        <td>{like?.Event.date.slice(0,10)}</td>
                                        <td><NavLink className="edit_btn" to={`/events/${like?.Event.id}`}>{like?.Event.name}</NavLink></td>
                                        <td className='remove_btn' ><Remove likeId = {like?.id}/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        ):(<div>You don't have any interests yet.</div>)
                    }
                </div>
            </div>
        </>
    )
}


export default Interest
