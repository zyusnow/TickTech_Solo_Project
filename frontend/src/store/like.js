import { csrfFetch } from "./csrf";

const GET_LIKES = 'events/getLikes';
const ADD_LIKE = 'events/addLike';
const DELETE_LIKE = 'events/deleteLike';


// action creators
const getLikes = (likes) => {
  return {
    type: GET_LIKES,
    likes
  }
}

const addLike = (like) => {
  return {
    type: ADD_LIKE,
    like
  }
}

const removeLike = (likeId) => {
  return {
    type: DELETE_LIKE,
    likeId
  }
}

// thunk
export const fetchApiLikes = () => async dispatch => {
  const res = await csrfFetch(`/api/likes`);
  if (res.ok) {
    const like = await res.json();
    dispatch(getLikes(like))
    return like
  }
}

export const addLikeByUser = (userId, eventId) => async (dispatch) => {
  console.log("add like by user");
  console.log(userId);
  console.log(eventId);
  const res = await csrfFetch('/api/likes', {
    method: "POST",
    body: JSON.stringify({
      userId,
      eventId
    })
  })
  if (res.ok) {
    const like = await res.json()
    dispatch(addLike(like))
    return like
  }
}

export const deleteLikeByUser = (likeId) => async (dispatch) => {
  const response = await csrfFetch(`/api/likes/${likeId}`, {
    method: 'DELETE',
    body: JSON.stringify({ likeId })
  })

  if (response.ok) {
    const likeToDelete = await response.json();
    dispatch(removeLike(likeToDelete))
    return "Remove successful"
  }
}

// reducer
const initialState = { likes: {} };
const likeReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_LIKES:
      newState = {...state};
      newState.likes = action.likes.reduce((likes, like) => {
        likes[like.id] = like;
        return likes;
      }, {});
      return newState;

    case ADD_LIKE:
      newState = { ...state }
      newState.likes[action.like.id] = action.like;
      return newState;

    case DELETE_LIKE:
      newState = { ...state }
      delete newState.likes[action.likeId]
      return newState;

    default:
      return state;
  }}
export default likeReducer;
