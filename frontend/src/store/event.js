import { csrfFetch } from "./csrf";


const GET_EVENTS = 'events/getEvents';
const GET_PUBLISHED_EVENTS = 'events/getPublishedEvents';
const GET_DRAFTS_EVENTS = 'events/getDraftEvents';

// action creators
const getEvents= (events) => {
    return {
        type: GET_EVENTS,
        events
    }
}

const getPublishedEvents = (events) => {
    return {
        type: GET_PUBLISHED_EVENTS,
        events
    }
}

const getDraftEvents = (events) => {
    return {
        type: GET_DRAFTS_EVENTS,
        events
    }
}


// thunk
export const fetchApiEvents = () => async dispatch => {
    // fetch data from db
    const res = await csrfFetch(`/api/events`);
    // get data back
    const events = await res.json();
    // console.log("thunk", events);
    // update state in the store
    dispatch(getEvents(events))
}


// reducer
const initialState = {events: {}, published: {}, drafts: {}};
const eventReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_EVENTS:
            newState = {...state};
            action.events.forEach(event => {
                newState.events[event.id] = event
            })
            // console.log("reducer", newState)
            return newState;
        // case GET_PUBLISHED_EVENTS:
        //     newState = {...state};
        //     action.events.forEach(event => {
        //         newState.events[event.id] = event
        //     })
        default:
            return state;
    }
}

export default eventReducer;
