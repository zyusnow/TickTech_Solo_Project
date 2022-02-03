import { csrfFetch } from "./csrf";


const GET_EVENTS = 'events/getEvents';
const GET_EVENT = 'events/getEvent';
const GET_PUBLISHED_EVENTS = 'events/getPublishedEvents';
const GET_DRAFT_EVENTS = 'events/getDraftEvents';
const ADD_PUBLISHED_EVENT= 'events/addPublishedEvent';
const ADD_DRAFT_EVENT= 'events/addDraftEvent';
const DELETE_PUBLISHED_EVENT= 'events/deletePublishedEvent'
const DELETE_DRAFT_EVENT= 'events/deleteDraftEvent'

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
        type: GET_DRAFT_EVENTS,
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

const deletePublishedEvent = (id) => {
    return {
        type:DELETE_PUBLISHED_EVENT,
        id
    }
}
const deleteDraftEvent = (id) => {
    return {
        type:DELETE_DRAFT_EVENT,
        id
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

export const fetchApiPublishedEvents = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/hosting/published`)
    const events = await res.json()
    dispatch(getPublishedEvents(events))
}
export const fetchApiDraftEvents = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/hosting/drafts`)
    const events = await res.json()
    dispatch(getDraftEvents(events))
}


export const addEvent = (event, published) => async dispatch =>{
    const res = await csrfFetch(`/api/events/add`, {
        method: 'POST',
        body: JSON.stringify(event)
    });

    const resBody = await res.json();
    console.log("events.js->addEvent:resbody",resBody)
    if (!resBody.errors) {
        const data = resBody;
        if (published) {
            await dispatch(addPublishedEvent(data))
        }
        else{
            await dispatch(addDraftEvent(data))
        }
        return data;
      } else {
        return resBody;
      }
}


export const deleteOldSpot = (id, published) => async dispatch => {
    const res = await csrfFetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
    })
    if (published) {
        if (res.ok === true) {
            dispatch(deletePublishedEvent(+id));
            return res;
    } else if (!published) {
        dispatch(deleteDraftEvent(+id));
        return res;
    }
    }
}


// reducer
const initialState = {events: {}, published: {}, draft: {}};
const eventReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_EVENTS:
            newState = {...state};
            newState.events = action.events.reduce((events, event) => {
                events[event.id] = event;
                return events;
            }, {});
            // action.events.forEach(event => {
            //     newState.events[event.id] = event
            // })
            return newState;
        case GET_EVENT:
            newState = {...state};
            newState.published[action.event.id] = action.event
            return newState;
        case ADD_PUBLISHED_EVENT:
            newState = {...state};
            newState.events[action.event.id] = action.event
            newState.published[action.event.id] = action.event
            return newState
        case ADD_DRAFT_EVENT:
            newState = {...state};
            newState.events[action.event.id] = action.event
            newState.draft[action.event.id] = action.event
            return newState
        case GET_PUBLISHED_EVENTS:
            newState = {...state};
            // action.events.forEach(event => {
            //     newState.published[event.id] = event
            // })
            newState.published = action.events.reduce((events, event) => {
                events[event.id] = event;
                return events;
            }, {});
            // addddd--------------
            return newState;
        case GET_DRAFT_EVENTS:
            newState = {...state};
            newState.draft = action.events.reduce((events, event) => {
                events[event.id] = event;
                return events;
            }, {});
            return newState;
        case DELETE_DRAFT_EVENT:
            newState = {...state};

            delete newState.events[action.id];
            delete newState.draft[action.id];
            return newState;
        case DELETE_PUBLISHED_EVENT:
            newState = {...state};
            delete newState.events[action.id];
            delete newState.published[action.id];
            return newState;
        default:
            return state;
    }
}

export default eventReducer;
