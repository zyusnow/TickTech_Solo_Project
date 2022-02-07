import { csrfFetch } from "./csrf";

const GET_TYPES = 'events/getTypes';
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
        // console.log("store", types)
    }
}


// reducer
const initialState = { types: {} };
const typeReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_TYPES:
            newState = {...state};
            newState.types = action.types.reduce((types, type) => {
                types[type.id] = type;
                return types;
            }, {});
            return newState;
        default:
            return state;
    }
}

export default typeReducer;
