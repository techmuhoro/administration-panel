import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const GET_POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  data: [],
  error: "",
  loading: false,
};

// fetch the post
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(GET_POST_URL);
  const data = await response.json();
  return data;
});

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
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;

export const getPost = (state) => state.getReducer.data;
export const getLoading = (state) => state.getReducer.loading;
export const getError = (state) => state.getReducer.error;
