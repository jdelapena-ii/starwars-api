import { ActionTypes } from "../constants/action-types"

export const setItems = (items) => {
    return {
        type: ActionTypes.SET_ITEMS,
        payload: items,
    }
}

export const selectedItem = (item) => {
    return {
        type: ActionTypes.SELECTED_ITEM,
        payload: item,
    }
}

export const setPeople = (person) => {
    return {
        type: ActionTypes.SET_PEOPLE,
        payload: person,
    }
}

export const setPlanets = (planet) => {
    return {
        type: ActionTypes.SET_PLANETS,
        payload: planet,
    }
}