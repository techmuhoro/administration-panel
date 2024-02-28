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
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Define persist config
const persistConfig = {
  key: "root",
  storage,
  // Optionally, you can whitelist specific reducers to be persisted
  // whitelist: ['counter'],
};

// Wrap your root reducer with persistReducer
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    counter: counterReducer,
    getReducer,
    postReducer,
    country: countryReducer,
    // Add all your reducers here
  })
);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
