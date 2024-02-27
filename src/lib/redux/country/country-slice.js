import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/lib/constants";

import Cookie from "js-cookie";
const token = Cookie.get("token");

//get country
export const fetchCountry = createAsyncThunk("/utils/countries", async () => {
  const response = await fetch(`${BASE_URL}utils/countries`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
});

const initialState = {
  data: [],
  error: "",
  loading: false,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default countrySlice.reducer;

export const getCountry = (state) => state.country.data;
export const getLoading = (state) => state.country.loading;
export const getError = (state) => state.country.error;
