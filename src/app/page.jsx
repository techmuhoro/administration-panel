"use client"; //this is a client side component

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../lib/redux/feutures/counterSlice";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";

import ProTip from "@/components/pro-tip";
import { handleFetchData, handlePostData } from "@/apis";
import { useEffect } from "react";

export default function Home() {
  const count = useSelector((state) => state.counter.value); // Access the counter state
  //useDispatch updates the store with the state from a component, as defined by your logic inside the counterslice.js
  const dispatch = useDispatch();
  const setAlertMessage = useNotifyAlertCtx();

  useEffect(() => {
    handleFetchData("/users", true)
      .then((responseData) => {
        console.log("Response Data:", responseData);
        setAlertMessage("Data from `/users` has been fetched :)", {
          type: "success",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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

        <Box sx={{ backgroundColor: "aliceblue" }}>
          <p>
            The button below👇 will trigger an alert to open. To customize the
            displayed alert, see code in <code>src/app/page.jsx</code> line{" "}
            <code>47</code>
          </p>
          <button
            onClick={() =>
              setAlertMessage("An Alert message for youz! :)", {
                closeOnClickAway: true,
                type: "info",
              })
            }
          >
            trigger alert
          </button>
        </Box>

        <Box>
          <h1>Counter: {count}</h1> {/* Display the counter state */}
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
        </Box>
      </Box>
    </Container>
  );
}
