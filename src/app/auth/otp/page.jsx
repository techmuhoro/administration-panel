"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState, useEffect } from "react";

import Cookies from "js-cookie";
import axios from "axios";

import { MuiOtpInput } from "mui-one-time-password-input";

import { Stack, Typography, Alert, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// import LoadingButton from "@/atoms/loading-button";

import AuthWrapper from "../authWrapper";
import MuiAlert from "@/atoms/MuiAlert";
import {
  containerStyles,
  headerStyles,
  linkStyles,
  textStyles,
} from "../styles";
import StyledContentWrapper from "@/atoms/wrappers/styled-content-wrapper";

/**added redux to handle this page */
import {
  handleOtpLogin,
  getLoginData,
  getLoading,
  getError,
  clearState,
} from "../../../lib/redux/auth2/otplogin-slice";
import { useDispatch, useSelector } from "react-redux";
//import { persistor } from "../../../lib/store";

function Otp() {
  const router = useRouter();
  const queryParams = useSearchParams();
  const nextLink = queryParams.get("next") || "";
  const email = queryParams.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  /** */
  let dispatch = useDispatch();
  const loginData = useSelector(getLoginData);
  const loading2 = useSelector(getLoading);
  const error = useSelector(getError);
  console.log(router);
  /*

  

  /** */

  console.log(loginData, "login iiiifiifissdata");
  console.log(loading2, "loading2");
  console.log(error, "error");

  useEffect(() => {
    if (loginData?.data === undefined) {
      setAlert({
        message: error,
        type: "error",
      });
      //dispatch(clearState());
    }

    if (loginData?.type === "users") {
      setAlert({
        message: "loged in successfully",
        type: "success",
      });
      Cookies.set("token", loginData?.includes.token);
      router.replace(nextLink ? nextLink : "/dashboard");
    }
  }, [error, loginData, nextLink, router]);

  let token = Cookies.get("token");
  const handleLogin = () => {
    dispatch(clearState());
    dispatch(handleOtpLogin({ code: otp, token: token }));
  };

  const handleChange = (newValue) => {
    dispatch(clearState());
    setOtp(newValue);
  };

  const handleSubmit = () => {
    setLoading(true);
    setAlert({ type: "", message: "" });
    const credentials = Cookies.get("token");

    let config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/verify-otp`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
      },
      data: JSON.stringify({ code: otp }),
    };

    axios(config)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          console.log(response);
          Cookies.set("token", response.data.data.includes.token);
          //router.replace(nextLink ? nextLink : "/dashboard");
          setLoading(false);
        } else {
          setAlert({
            message: "Something went wrong. Kindly contact support",
            type: "error",
          });
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          setAlert({
            message: "Something went wrong. Kindly contact support",
            type: "error",
          });
        } else if (error.response.status === 401) {
          setAlert({
            type: "error",
            message: error.response.data.error.message,
          });
        } else if (error.response.status === 406) {
          setAlert({
            type: "error",
            message: Object.values(error.response.data.error)[0],
          });
        }
        setLoading(false);
      });
  };

  const handleResendOtp = () => {
    setAlert({ type: "", message: "" });
    const credentials = Cookies.get("token");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/resend-otp`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          setAlert({
            message: "OTP has been resent!",
            type: "success",
          });
          setLoading(false);
        } else {
          setAlert({
            message: "Something went wrong. Kindly contact support",
            type: "error",
          });
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          setAlert({
            message: "Something went wrong. Kindly contact support",
            type: "error",
          });
        } else if (error.response.status === 401) {
          setAlert({ type: "error", message: error.response.data.message });
        } else if (error.response.status == 406) {
          setAlert({
            message: Object.values(error.response.data.error)[0],
            type: "error",
          });
          setLoading(false);
        }

        setLoading(false);
      });
  };

  return (
    <AuthWrapper>
      <StyledContentWrapper
        width={{ md: "35%", xs: "90%" }}
        spacing={2}
        sx={containerStyles}
      >
        <Stack spacing={2}>
          <Typography sx={headerStyles}>Enter OTP</Typography>
          <Alert severity="success">
            An OTP has been sent to{" "}
            <span style={{ fontWeight: 500 }}>{email}</span>
          </Alert>
          <Stack>
            <MuiOtpInput value={otp} onChange={handleChange} length={6} />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignContent="center"
          >
            <Typography sx={textStyles}>Didn&#39;t receive otp?</Typography>{" "}
            <Typography onClick={handleResendOtp} sx={linkStyles}>
              Resend
            </Typography>
          </Stack>
          <LoadingButton
            onClick={handleLogin}
            disabled={!otp || otp.length !== 6}
            variant="contained"
            loading={loading2}
          >
            Continue
          </LoadingButton>
        </Stack>
      </StyledContentWrapper>

      {alert.message !== "" && alert.type !== "" && (
        <MuiAlert variant={alert.type} message={alert.message} />
      )}
    </AuthWrapper>
  );
}

export default Otp;
