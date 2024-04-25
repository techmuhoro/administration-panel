"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import axios from "axios";

import { Form, Formik } from "formik";

import { Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import FormikCustomInput from "@/atoms/FormikCustomInput";
import MuiAlert from "@/atoms/MuiAlert";

import AuthWrapper from "../authWrapper";

import { resetPassword } from "@/app/utils/formValidations/auth/resetPassword";
import { containerStyles, headerStyles } from "../styles";

function ResetPassword() {
  const router = useRouter();
  const tokenParams = useSearchParams();

  const token = tokenParams.get("token");

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    setAlert({ type: "", message: "" });

    let config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/reset-pwd`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: values,
    };

    axios(config)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          setLoading(false);
          setAlert({ type: "success", message: response.data.data.message });
          setTimeout(() => {
            router.replace("/auth/login");
          }, 4000);
        } else {
          setAlert({
            type: "error",
            message: "Something went wrong.Kindly contact support",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          setAlert({
            type: "error",
            message: "Something went wrong. Kindly contact support.",
          });
        } else if (error.response.status === 406) {
          setAlert({
            message: Object.values(error.response.data.error)[0],
            type: "error",
          });
        } else if (error.response.status === 401) {
          setAlert({
            message: error.response.data.error.message,
            type: "error",
          });
        } else if (error.response.status === 403) {
          setAlert({
            message: error.response.data.error.message,
            type: "error",
          });
        } else {
          setAlert({
            type: "error",
            message: "Something went wrong. Kindly contact support.",
          });
        }
        setLoading(false);
      });
  };

  return (
    <AuthWrapper>
      <Stack width={{ md: "40%", xs: "90%" }} spacing={2} sx={containerStyles}>
        <Typography sx={headerStyles}>Reset Password</Typography>
        <Formik
          validationSchema={resetPassword}
          initialValues={{ password: "", confirmPassword: "" }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Stack spacing={3}>
              <FormikCustomInput
                id="password"
                name="password"
                label="Password"
                type="password"
              />
              <FormikCustomInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
              />
              <LoadingButton loading={loading} variant="blue" type="submit">
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

export default ResetPassword;
