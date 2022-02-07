import {fetchApiLikes, deleteLikeByUser} from '../../../store/like'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';



function Remove({likeId}) {
    const dispatch = useDispatch()
    const [updateInterestCount, setUpdateInterestdCount] = useState('')
    const userId = useSelector(state => state.session.user.id)

    useEffect(() => {
        dispatch(fetchApiLikes())
        setUpdateInterestdCount('')
    }, [dispatch, updateInterestCount])

    const unlikeEvent = e => {
          return dispatch(deleteLikeByUser(likeId))
            .then(() => {
                setUpdateInterestdCount("Decrease one")
            })
    }
    return (
        <div onClick={unlikeEvent}>Remove</div>
    )
}

export default Remove;
