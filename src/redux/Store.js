import { combineReducers } from "redux";
import { legacy_createStore as createStore } from "redux";
import { userReducer, themeReducer } from "./Reducer";
//import { configureStore } from "@reduxjs/toolkit";


const reducer= combineReducers({
    "userReducer": userReducer,
    "themeReducer": themeReducer
})

const Store= createStore(reducer)

export default Store;