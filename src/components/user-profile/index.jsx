"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Grid, Container } from "@mui/material";
import { Input } from "@/atoms/form";
import { Formik, Form } from "formik";
import { BASE_URL } from "@/lib/constants";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import axios from "axios";
import Cookie from "js-cookie";
import LoadingButton from "@/atoms/loading-button";
import * as Yup from "yup";
import {
  fetchCountry,
  getCountry,
  getLoading,
  getError,
} from "../../lib/redux/country/country-slice";

import { useDispatch, useSelector } from "react-redux";

export default function UserProfile() {
  const setAlertMessage = useNotifyAlertCtx();
  const [loading, setLoading] = useState(false);
  const token = Cookie.get("token");
  const router = useRouter();

  let dispatch = useDispatch();

  // Selectors
  const countryData = useSelector(getCountry);
  const loading2 = useSelector(getLoading);
  const error = useSelector(getError);

  console.log(countryData?.data, "contry-data");
  console.log(loading2, "loading2");
  console.log(error, "errro");

  useEffect(() => {
    dispatch(fetchCountry());
  }, [dispatch]);

  const handleUpdateUser = (values) => {
    console.log(values, "update users");
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    setLoading(true);
    axios
      .put(`${BASE_URL}profile`, JSON.stringify(values), {
        headers,
      })
      .then((response) => {
        setAlertMessage("User has updated succesfully", {
          type: "success",
          openDuration: 3000,
        });
        setLoading(false);
        setTimeout(() => {
          router.refresh();
        }, 2000);
      })
      .catch((error) => {
        let errorObject = error.response?.data?.error;
        console.log(error);
        let errorKey = ["email", "message", "name", "phone", "country"];
        errorKey.forEach((key) => {
          if (errorObject?.hasOwnProperty(key)) {
            setAlertMessage(errorObject[key], {
              type: "error",
              openDuration: 3000,
            });
          }
        });
        setLoading(false);
      });
  };

  // pick this value from the redux store
  let initialValue = {
    name: "",
    email: "",
    phone: "",
    country: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
  });
  return (
    <Box>
      <Typography component="h6" variant="h5" mb={1}></Typography>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleUpdateUser}
      >
        {(form) => (
          <Container maxWidth="md">
            <Form>
              <Box boxShadow={3} p={3}>
                <Grid container spacing={1}>
                  <Grid item sm={6} md={6}>
                    <Input name="name" label="Name" />
                  </Grid>

                  <Grid item sm={6} md={6}>
                    <Input name="email" label="Email" />
                  </Grid>

                  <Grid item sm={6} md={6} mt={1}>
                    <Input name="phone" label="Phone Number" />
                  </Grid>

                  {/**get this country from global storage   */}
                  <Grid item sm={6} md={6} mt={1}>
                    <Input name="country" label="Country" />
                  </Grid>

                  <Grid item sm={6} md={6} mt={1}>
                    <Input name="department" label="Department" />
                  </Grid>

                  {/**get this country from global storage   */}
                  <Grid item sm={6} md={6} mt={1}>
                    <Input name="role" label="Role" />
                  </Grid>
                </Grid>

                <LoadingButton
                  variant="outlined"
                  sx={{ marginTop: "20px" }}
                  loading={loading}
                  type="submit"
                >
                  Update details
                </LoadingButton>
              </Box>
            </Form>
          </Container>
        )}
      </Formik>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Box>
      </Container>
    </Box>
  );
}
