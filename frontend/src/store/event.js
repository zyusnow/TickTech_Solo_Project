import { csrfFetch } from "./csrf";


const GET_EVENTS = 'events/getEvents';
const GET_EVENT = 'events/getEvent';
const GET_PUBLISHED_EVENTS = 'events/getPublishedEvents';
const GET_DRAFTS_EVENTS = 'events/getDraftEvents';
const ADD_PUBLISHED_EVENT= 'events/addPublishedEvent';
const ADD_DRAFT_EVENT= 'events/addDraftEvent';


// action creators
const getEvents= (events) => {
    return {
        type: GET_EVENTS,
        events
    }
}

const getEvent= (event) => {
    return {
        type: GET_EVENT,
        event
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

const addPublishedEvent = (event) => {
    return {
        type: ADD_PUBLISHED_EVENT,
        event
    }
}

const addDraftEvent = (event) => {
    return {
        type: ADD_DRAFT_EVENT,
        event
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

export const fetchApiEvent = (id) => async dispatch => {
    const res = await csrfFetch(`/api/events/${+id}`);
    if (res.ok) {
        const event = await res.json();
        dispatch(getEvent(event))
        // console.log("store", event)
    }
}

export const addEvent = (event, published) => async dispatch =>{
    const res = await csrfFetch(`/api/events/add`, {
        method: 'POST',
        body: JSON.stringify(event)
    });

    const data = await res.json()
    
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
        case GET_EVENT:
            newState = {...state};
            newState[action.event.id] = action.event
            // console.log("store", newState)
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
