"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import axios from "axios";
import Cookies from "js-cookie";

import { Form, Formik } from "formik";

import { Stack, Typography } from "@mui/material";
// import { LoadingButton } from "@mui/lab";

import FormikCustomInput from "@/atoms/FormikCustomInput";
import MuiAlert from "@/atoms/MuiAlert";

import { login } from "@/app/utils/formValidations/auth/login";
import AuthWrapper from "../authWrapper";

import { useDispatch } from "react-redux";
import { persistor } from "../../../lib/store";
import { clearState } from "../../../lib/redux/auth2/otplogin-slice";

import {
  containerStyles,
  headerStyles,
  linkStyles,
  textStyles,
} from "../styles";
import StyledContentWrapper from "@/atoms/wrappers/styled-content-wrapper";
import LoadingButton from "@/atoms/loading-button";

function Login() {
  const router = useRouter();
  const queryParams = useSearchParams();
  const nextLink = queryParams.get("next") || "";

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", tyep: "" });
  let dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(clearState());
    setLoading(true);
    setAlert({ type: "", message: "" });

    let config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/sign-in`,
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    };

    axios(config)
      .then((response) => {
        console.log(response);
        if (response.data.status === "SUCCESS") {
          Cookies.set("token", response.data.data.token);
          router.replace(
            `/auth/otp?otp=true&email=${values.email}${nextLink ? `&next=${nextLink}` : ""}`
          );
        } else {
          setAlert({
            message: "Something went wrong. Kindly conact support",
            type: "error",
          });
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          setAlert({
            type: "error",
            message: "Something went wrong.Kindly contact support",
          });
        } else if (error.response.status === 406) {
          setAlert({
            message: Object.values(error.response.data.error)[0],
            type: "error",
          });
        } else if (error.response.status === 403) {
          //riderect to reset password page
          router.replace(error.response.data.error.message);
        } else {
          setAlert({
            message: "Something went wrong. Kindly contact support",
            type: "error",
          });
        }
        setLoading(false);
      });
  };

  return (
    <AuthWrapper>
      <StyledContentWrapper
        width={{ md: "40%", xs: "90%" }}
        spacing={2}
        sx={containerStyles}
      >
        <Stack pb={3} spacing={2}>
          <Typography sx={headerStyles}>
            Sign in to iPay&#39;s Admin Dashboard
          </Typography>
          <Typography sx={textStyles}>
            New user?{" "}
            <span style={{ color: "#f57c00" }}>
              Request an admin to create your account
            </span>
          </Typography>
        </Stack>
        <Formik
          validationSchema={login}
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Stack spacing={3}>
              <FormikCustomInput
                id="email"
                name="email"
                label="Email address"
              />
              <FormikCustomInput
                id="email"
                name="password"
                label="Password"
                type="password"
              />
              <Stack alignItems="flex-end">
                <Typography
                  sx={linkStyles}
                  onClick={() => router.replace("/auth/forgotPassword")}
                >
                  Forgot Password?
                </Typography>
              </Stack>
              <LoadingButton
                color="primary"
                variant="contained"
                type="submit"
                loading={loading}
              >
                Login
              </LoadingButton>
            </Stack>
          </Form>
        </Formik>
      </StyledContentWrapper>
      {alert.message !== "" && (
        <MuiAlert message={alert.message} variant={alert.type} />
      )}
    </AuthWrapper>
  );
}

export default Login;
