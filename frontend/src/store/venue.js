import { csrfFetch } from "./csrf";

const GET_VENUES = 'events/getVenues';
const ADD_VENUE = 'events/addVenue';
const EDIT_VENUE = 'events/editVenue';

// action creators
const getVenues = (venues) => {
    return {
        type: GET_VENUES,
        venues
    }
}

const addVenue = (venue) => {
    return {
        type: ADD_VENUE,
        venue
    }
}

const editVenue = (venue) => {
    return {
        type: EDIT_VENUE,
        venue
    }
}


// thunk
export const fetchApiVenues = () => async dispatch => {
    const res = await csrfFetch(`/api/venues`);
    if (res.ok) {
        const venues = await res.json();
        dispatch(getVenues(venues))
    }
}

export const addNewVenue = (venue) => async dispatch => {
    const res = await csrfFetch(`/api/venues/add`, {
        method: 'POST',
        body: JSON.stringify(venue)
    });

    const resBody = await res.json();

    if (!resBody.errors) {
        const data = resBody;
        await dispatch(addVenue(venue));
        return data
    } else {
    return resBody;
    }
}

export const editOldVenue = (venue, venueId) => async dispatch => {
    const res = await csrfFetch(`/api/venues/${venueId}/edit`, {
        method: 'PUT',
        body: JSON.stringify(venue)
    });
    const resBody = await res.json()
    if (!resBody.errors) {
      const venue = resBody;
      await dispatch(editVenue(venue));
      return venue
    } else {
      return resBody;
    }
}

// reducer
const initialState = { venues: {} };
const venueReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_VENUES:
            newState = {...state};
            action.venues.forEach(venue => {
                newState.venues[venue.id] = venue
            })
            return newState;
        case ADD_VENUE:
            newState = {...state};
            newState.venues[action.venue.id] = action.venue
            return newState
        case EDIT_VENUE:
            newState = {...state};
            newState.venues[action.venue.id] = action.venue
            return newState



        default:
            return state;
    }
}

export default venueReducer;
