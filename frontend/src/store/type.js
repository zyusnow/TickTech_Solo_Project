import { csrfFetch } from "./csrf";

const GET_TYPES = 'events/getType';

// action creators
const getTypes= (types) => {
    return {
        type: GET_TYPES,
        types
    }
}

// thunk
export const fetchApiTypes = () => async dispatch => {
    const res = await csrfFetch(`/api/types`);
    if (res.ok) {
        const types = await res.json();
        dispatch(getTypes(types))
        console.log("store", types)
    }
}

// reducer
const initialState = { types: {} };
const typeReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_TYPES:
            newState = {...state};
            action.types.forEach(type => {
                newState.types[type.id] = type
            })
            console.log("type reducer", newState)
            return newState;
        default:
            return state;
    }
}

export default typeReducer;
