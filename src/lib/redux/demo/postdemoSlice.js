import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const GET_POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  response: [],
  error: "",
  loading: false,
};

// make post request to server and console the response
export const sendPost = createAsyncThunk("posts/sendPosts", async (obj) => {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendPost.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(sendPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;

export const getPostdemoResponse = (state) => state.getReducer.response;
export const getPostdemoLoading = (state) => state.getReducer.loading;
export const getpostdemoError = (state) => state.getReducer.error;
