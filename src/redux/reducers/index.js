import { combineReducers } from "redux";
import { itemReducer, peopleReducer, selectedItemReducer, planetsReducer } from "./itemReducer";

export const reducers = combineReducers(
    {
        allItems: itemReducer,
        selectedItem: selectedItemReducer,
        allPeople: peopleReducer,
        allPlanets: planetsReducer,
    }
)