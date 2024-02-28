"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";

import { MuiOtpInput } from "mui-one-time-password-input";

import { Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import AuthWrapper from "../authWrapper";
import MuiAlert from "@/atoms/MuiAlert";

/**added redux to handle this page */
import {
  handleOtpLogin,
  getLoginData,
  getLoading,
  getError,
} from "../../../lib/redux/auth2/otplogin-slice";

import { useDispatch, useSelector } from "react-redux";

function Otp() {
  const router = useRouter();
  const queryParams = useSearchParams();
  const nextLink = queryParams.get("next") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  /** */
  let dispatch = useDispatch();
  const loginData = useSelector(getLoginData);
  const loading2 = useSelector(getLoading);
  const error = useSelector(getError);
  /*

  

  /** */

  console.log(loginData?.data, "contry-data");
  console.log(loading2, "loading2");
  console.log(error, "errro");

  // useEffect(() => {}, [dispatch]);

  const handleLogin = async () => {
    console.log("otp-login");
    dispatch(handleOtpLogin({ code: 141454 }));
  };

  const handleChange = (newValue) => {
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
          router.replace(nextLink ? nextLink : "/dashboard");
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
        console.log("Resend Otp res", response);
      })
      .catch((error) => {
        console.log("RESEND OTP ERR", error);
        if (error.response === undefined) {
          setAlert({
            message: "Something went wrong. Kindly contact support",
            type: "error",
          });
        } else if (error.response.status === 401) {
          setAlert({ type: "error", message: error.response.data.error });
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
      <Stack width={{ md: "30%", xs: "90%" }} spacing={2}>
        <Typography variant="h5">Enter OTP</Typography>
        <MuiOtpInput value={otp} onChange={handleChange} length={6} />
        <Stack direction="row" justifyContent="space-between">
          <Typography>Didn&#39;t receive otp?</Typography>{" "}
          <Typography
            onClick={handleResendOtp}
            sx={{ color: "blue", cursor: "pointer" }}
          >
            Resend
          </Typography>
        </Stack>
        <LoadingButton
          onClick={handleSubmit}
          disabled={!otp || otp.length !== 6}
          variant="contained"
          loading={loading}
        >
          Continue
        </LoadingButton>
      </Stack>

      <LoadingButton onClick={handleLogin}> loginotps</LoadingButton>

      {alert.message !== "" && alert.type !== "" && (
        <MuiAlert variant={alert.type} message={alert.message} />
      )}
      {/* <MuiAlert
        variant="success"
        message="A One Time Password has been sent to your Email or Phone"
      /> */}
    </AuthWrapper>
  );
}

export default Otp;
