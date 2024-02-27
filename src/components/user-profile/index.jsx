"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Grid, Container } from "@mui/material";
import { Input, ReusableDropdown, Checkbox } from "@/atoms/form";
import { Formik, Form, Field } from "formik";
import { BASE_URL } from "@/lib/constants";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import axios from "axios";
import Cookie from "js-cookie";
import LoadingButton from "@/atoms/loading-button";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { getCountry } from "../../lib/redux/country/country-slice";

export default function UserProfile() {
  const setAlertMessage = useNotifyAlertCtx();
  const [loading, setLoading] = useState(false);
  const token = Cookie.get("token");
  const router = useRouter();

  const dispatch = useDispatch();

  console.log(dispatch(getCountry()));

  const handleUpdateUser = (values) => {
    console.log(values, "update users");
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    setLoading(true);
    axios
      .put(`${BASE_URL}users/${userDetails.data.id}`, JSON.stringify(values), {
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
        let errorKey = [
          "email",
          "message",
          "status",
          "user",
          "name",
          "phone",
          "country",
          "department",
          "role",
        ];
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
    </Box>
  );
}
