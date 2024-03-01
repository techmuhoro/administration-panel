"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Grid, Container, TextField } from "@mui/material";
import { Input, ReusableDropdown } from "@/atoms/form";
import { Formik, Form } from "formik";
import { BASE_URL } from "@/lib/constants";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import axios from "axios";
import Cookie from "js-cookie";
import LoadingButton from "@/atoms/loading-button";
import * as Yup from "yup";

import { getLoginData } from "../../lib/redux/auth2/otplogin-slice";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const setAlertMessage = useNotifyAlertCtx();
  const [loading, setLoading] = useState(false);
  const token = Cookie.get("token");
  const router = useRouter();

  const loginData = useSelector(getLoginData);

  let Contries = loginData?.includes?.opCountries;

  let operationContries = Contries?.filter(
    (item) => item.attributes.opStatus === 1
  );
  let allContries = [];

  if (operationContries !== undefined) {
    allContries = operationContries?.map((item) => ({
      label: item.attributes.name,
      value: item.attributes.iso,
    }));
  }
  const handleUpdateUser = (values) => {
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

  //pick this value from the redux store
  let initialValue = {
    name: loginData?.attributes?.name,
    email: loginData?.attributes?.email,
    phone: loginData?.attributes?.phone,
    country: loginData?.attributes?.country,
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
                  <Grid item sm={12} md={6}>
                    <Input name="name" label="Name" />
                  </Grid>

                  <Grid item sm={12} md={6}>
                    <Input name="email" label="Email" />
                  </Grid>

                  <Grid item sm={12} md={6} mt={2}>
                    <Input name="phone" label="Phone Number" />
                  </Grid>

                  {/**get this country from global storage   */}
                  <Grid item sm={12} md={6}>
                    <ReusableDropdown
                      label="Select Country"
                      name="country"
                      options={allContries}
                    />
                  </Grid>

                  <Grid item sm={12} md={6}>
                    <TextField
                      fullWidth
                      disabled
                      label="Department"
                      id="Department"
                      defaultValue={loginData?.attributes?.Department}
                    />
                  </Grid>

                  {/**get this country from global storage   */}
                  <Grid item sm={12} md={6}>
                    <TextField
                      fullWidth
                      disabled
                      label="Role"
                      id="Role"
                      defaultValue={loginData?.attributes?.role}
                    />
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
