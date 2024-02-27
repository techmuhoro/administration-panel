//store.jsx
"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./redux/feutures/counterSlice";
import getReducer from "./redux/demo/getdemoSlice";
import postReducer from "./redux/demo/postdemoSlice";
import countryReducer, {
  fetchCountry,
  getCountry,
  getLoading,
  getError,
} from "../lib/redux/country/country-slice";

const rootReducer = combineReducers({
  counter: counterReducer,
  getReducer,
  postReducer,
  country: countryReducer,

  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});
