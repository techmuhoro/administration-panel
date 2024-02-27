import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/lib/constants";

const initialState = {
  data: [],
  error: "",
  loading: false,
};

//get country
export const fetchCountry = createAsyncThunk("/utils/countries", async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
});

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

export const getCountry = (state) => state.getCountryReducer.data;
export const getLoading = (state) => state.getCountryReducer.loading;
export const getError = (state) => state.getCountryReducer.error;
