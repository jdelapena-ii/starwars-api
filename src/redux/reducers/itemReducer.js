import { ActionTypes } from "../constants/action-types";

const initialState = {
    items: [],
    people: [],
    planets: [],
}

export const itemReducer = (state = initialState.items, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_ITEMS: 
            return { ...state, items: payload };

        default:
            return state;
    }
}

export const selectedItemReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case ActionTypes.SELECTED_ITEM: 
            return { ...state, ...payload };

        default:
            return state;
    }
}


export const peopleReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_PEOPLE: 
            return { ...state, people: payload };

        default:
            return state;
    }
}

export const planetsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_PLANETS: 
            return { ...state, planets: payload };

        default:
            return state;
    }
}