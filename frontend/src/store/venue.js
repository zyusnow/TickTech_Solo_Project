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
        // console.log("store", venues)
    }
}

export const addNewVenue = (venue) => async dispatch => {
    const res = await csrfFetch(`/api/venues/add`, {
        method: 'POST',
        body: JSON.stringify(venue)
      });
    if (res.ok) {
        const venue = await res.json();
        dispatch(addVenue(venue))
        return venue
        // console.log("store", venue)
    }
}

export const editOldVenue = (venue, venueId) => async dispatch => {
    const res = await csrfFetch(`/api/venues/${venueId}/edit`, {
        method: 'PUT',
        body: JSON.stringify(venue)
      });
    if (res.ok) {
        const venue = await res.json();
        dispatch(editVenue(venue))
        return venue
        // console.log("store", venue)
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
            // console.log("reducer", newState)
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
