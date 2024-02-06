"use client"; //this is a client side component

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../lib/redux/feutures/counterSlice";

import ProTip from "@/components/pro-tip";

export default function Home() {
  const count = useSelector((state) => state.counter.value); // Access the counter state

  //useDispatch updates the store with the state from a component, as defined by your logic inside the counterslice.js
  const dispatch = useDispatch();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
