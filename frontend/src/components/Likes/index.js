import {fetchApiLikes, addLikeByUser, deleteLikeByUser} from '../../store/like'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';


function Like({eventId}) {
    const dispatch = useDispatch()
    const [updateInterestCount, setUpdateInterestdCount] = useState('')
    const userId = useSelector(state => state.session.user.id)

    const likes = useSelector(state => state.like.likes);
    const likesArr = Object.values(likes);
    const eventLikes = likesArr.filter(like => like.eventId === +eventId)
    const liked = eventLikes.find(like => like.userId === +userId)
    console.log(liked)

    useEffect(() => {
        dispatch(fetchApiLikes())
        setUpdateInterestdCount('')
    }, [dispatch, updateInterestCount])


    const likeEvent = e => {
        return dispatch(addLikeByUser(userId, eventId))
            .then(() => {
                setUpdateInterestdCount("Increase one")
        })
    }

    const unlikeEvent = e => {
        if (liked) {
          return dispatch(deleteLikeByUser(liked.id))
            .then(() => {
                setUpdateInterestdCount("Decrease one")
            })
        }
    }

    let interestIcon;
    if (liked) {
        interestIcon = (
            <i class="far fa-bookmark" onClick={unlikeEvent}></i>
        )
      } else {
        interestIcon = (
            <i class="fas fa-bookmark liked" onClick={likeEvent}></i>
        )
      }

    return (
        <>
            <div>
                <div className="interestIcon">{interestIcon}</div>
                <span>
                    {liked && <div>Added to interests</div>}
                    {!liked && <div>Add to interests</div>}
                </span>
            </div>
        </>
    )
}

export default Like
