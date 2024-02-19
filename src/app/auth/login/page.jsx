"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import Cookies from "js-cookie";

import { Form, Formik } from "formik";

import { Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import FormikCustomInput from "@/atoms/FormikCustomInput";
import MuiAlert from "@/atoms/MuiAlert";

import { login } from "@/app/utils/formValidations/auth/login";
import AuthWrapper from "../authWrapper";

function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", tyep: "" });

  const handleSubmit = (values) => {
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
        if (response.data.status === "SUCCESS") {
          Cookies.set("iPayAdmin", response.data.data.token);
          router.replace("/auth/otp?otp=true");
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
          setAlert({
            message: error.response.data.error,
            type: "error",
          });
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
      <Stack width={{ md: "40%", xs: "90%" }} spacing={2}>
        <Typography>Login</Typography>
        <Formik
          validationSchema={login}
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Stack spacing={2}>
              <FormikCustomInput
                name="email"
                placeholder="email@gmail.com"
                required
              />
              <FormikCustomInput name="password" placeholder="password" />
              <Typography
                sx={{ fontSize: 12, color: "blue", cursor: "pointer" }}
                onClick={() => router.replace("/auth/forgotPassword")}
              >
                Forgot Password?
              </Typography>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={loading}
              >
                Submit
              </LoadingButton>
            </Stack>
          </Form>
        </Formik>
      </Stack>
      {alert.message !== "" && (
        <MuiAlert message={alert.message} variant={alert.type} />
      )}
    </AuthWrapper>
  );
}

export default Login;
