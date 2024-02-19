"use client";

import { useState } from "react";

import axios from "axios";

import { Form, Formik } from "formik";

import { Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import FormikCustomInput from "@/atoms/FormikCustomInput";
import MuiAlert from "@/atoms/MuiAlert";

import AuthWrapper from "../authWrapper";

import { forgotPassword } from "@/app/utils/formValidations/auth/forgotPassword";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const handleSubmit = (values) => {
    setLoading(true);
    setAlert({ type: "", message: "" });

    let config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/forgot-pwd`,
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    };

    axios(config)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          setLoading(false);
          setAlert({ message: response.data.data.message, type: "success" });
        } else {
          setAlert({
            type: "error",
            message: "Something went wrong.Kindly contact support",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 406) {
          setAlert({
            message: Object.values(error.response.data.error)[0],
            type: "error",
          });
        } else {
          setAlert({
            type: "error",
            message: "Something went wrong.Kindly contact support",
          });
          setLoading(false);
        }
        setLoading(false);
      });
  };

  return (
    <AuthWrapper>
      <Stack width={{ md: "40%", xs: "90%" }} spacing={2}>
        <Typography variant="h5">Forgot Password</Typography>
        <Formik
          validationSchema={forgotPassword}
          initialValues={{ email: "" }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Stack spacing={2}>
              <FormikCustomInput
                name="email"
                placeholder="email@gmail.com"
                required
              />
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
      {alert.message !== "" && alert.type !== "" && (
        <MuiAlert message={alert.message} variant={alert.type} />
      )}
    </AuthWrapper>
  );
}

export default ForgotPassword;
