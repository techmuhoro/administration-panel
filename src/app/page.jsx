"use client"; //this is a client side component

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../lib/redux/feutures/counterSlice";

<<<<<<< HEAD:src/app/page.js
import ProTip from "@/components/ProTip";
import { handleFetchData, handlePostData } from "@/apis";
=======
import ProTip from "@/components/pro-tip";
>>>>>>> 3da651e09dde78122a5b5fb65a845cb348a6ca3c:src/app/page.jsx

export default function Home() {
  const count = useSelector((state) => state.counter.value); // Access the counter state
  //useDispatch updates the store with the state from a component, as defined by your logic inside the counterslice.js
  const dispatch = useDispatch();

  handleFetchData("/users", true)
    .then((responseData) => {
      console.log("Response Data:", responseData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  let payload = {
    email: "string",
    password: "string",
  };
  // handlePostData("login", payload, true)
  //   .then((responseData) => {
  //     console.log("Response Data:", responseData);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

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
