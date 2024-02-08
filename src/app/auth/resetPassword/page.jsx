"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Cookies from "js-cookie";

import { Form, Formik } from "formik";

import { Stack, Button, Typography } from "@mui/material";

import FormikCustomInput from "@/atoms/FormikCustomInput";

import { login } from "@/app/utils/formValidations/auth/login";
import axios from "axios";
import AuthWrapper from "../authWrapper";
import MuiAlert from "@/atoms/MuiAlert";

function ResetPassword() {
  const router = useRouter();
  const tokenParams = useSearchParams();

  const token = tokenParams.get("token");

  const handleSubmit = (values) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/reset-pwd`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: values,
    };

    axios(config)
      .then((response) => {
        console.log("Reset Pass Res", response);
        if (response.data.status === "SUCCESS") {
          router.replace("/auth/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthWrapper>
      <Stack width={{ md: "40%", xs: "90%" }} spacing={2}>
        <Typography>Reset Password</Typography>
        <Formik
          // validationSchema={login}
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Stack spacing={2}>
              <FormikCustomInput name="password" placeholder="Password" />
              <FormikCustomInput
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <Button variant="blue" type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Stack>
      <MuiAlert
        variant="success"
        message="Password reset link has been sent to your email"
      />
    </AuthWrapper>
  );
}

export default ResetPassword;
