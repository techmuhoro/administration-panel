"use client"; //this is a client side component

import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../lib/redux/feutures/counterSlice";

import ProTip from "../components/pro-tip";
import { handleFetchData } from "@/apis";

import {
  getError,
  getLoading,
  fetchPosts,
  getPost,
} from "../lib/redux/demo/getdemoSlice";

import {
  getPostdemoLoading,
  getpostdemoError,
  getPostdemoResponse,
  sendPost,
} from "../lib/redux/demo/postdemoSlice";

export default function Home() {
  const count = useSelector((state) => state.counter.value); // Access the counter state

  const [value, setValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const getPosts = useSelector(getPost);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
    <Container maxWidth="lg">
      <div className="top">
        <label htmlFor="title">
          Title:
          <input
            type="text"
            name="title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
        </label>
        <label htmlFor="body">
          Body:
          <input
            type="text"
            name="body"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <button
          onClick={() =>
            dispatch(sendPost({ title: titleValue, body: value, userId: "1" }))
          }
        >
          submit
        </button>
      </div>
      {loading ? "loading ..." : null}
      <div>
        {getPosts.map((post, index) => (
          <div className="single-post" key={index}>
            <h4>{post.title}</h4>
            <h6>{post.body}</h6>
          </div>
        ))}
      </div>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography></Typography>
        <Typography variant="h4" component="h1">
          Admin dashboard
        </Typography>
        <ProTip />

        <Box>
          <h1>Counter: {count}</h1> {/* Display the counter state */}
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
        </Box>
      </Box>
    </Container>
  );
}
