//store.jsx
"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./redux/feutures/counterSlice";
import getReducer from "./redux/demo/getdemoSlice";
import postReducer from "./redux/demo/postdemoSlice";
import getCountryReducer from "./redux/country/country-slice";

const rootReducer = combineReducers({
  counter: counterReducer,
  getReducer,
  postReducer,
  getCountryReducer,
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});
