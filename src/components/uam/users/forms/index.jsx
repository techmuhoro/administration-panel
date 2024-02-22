"use client";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { Input, ReusableDropdown } from "@/atoms/form";
import { Formik, Form } from "formik";
import { BASE_URL } from "@/lib/constants";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import axios from "axios";
import Cookie from "js-cookie";
import * as Yup from "yup";

export default function AddUserForm({ rolesData, derpartmentData }) {
  const setAlertMessage = useNotifyAlertCtx();
  const token = Cookie.get("token");
  //rename the field to fit material-ui drop-down options roles option
  const options = rolesData.map((item) => {
    return {
      value: item.id,
      label: item.attributes.name,
    };
  });
  const derpetmentOptions = derpartmentData?.map((item) => {
    return {
      value: item.id,
      label: item.attributes.name,
    };
  });

  const handleSubmit = (value) => {
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios
      .post(`${BASE_URL}users`, JSON.stringify(value), { headers })
      .then((response) =>{ 
         setAlertMessage("User has been created successfully", {
           type: "success",
           openDuration: 3000,
         });

        console.log(response.data)})
      .catch((error) => {
        let errorObject = error.response.data.error;
        
        let errorKey = [
          "email",
          "name",
          "phone",
          "country",
          "department",
          "role",
        ];

        errorKey.forEach((key) => {
          if (errorObject.hasOwnProperty(key)) {
            console.log(error.response.data.error);
          }
        });
      });
  };

  let initialValue = {
    name: "",
    email: "",
    phone: "",
    country: "",
    department: "",
    role: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    department: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
  });
  return (
    <Box>
      <Typography component="h6" variant="h5" mb={1}>
        Add user
      </Typography>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Container maxWidth="md">
            <Box boxShadow={3} p={3}>
              <Form>
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

                  <Grid item sm={6} md={6} mt={1}>
                    <Input name="country" label="Country" />
                  </Grid>

                  <Grid item sm={6} md={6} mt={1}>
                    <ReusableDropdown
                      label="Select role"
                      name="role"
                      options={options}
                    />
                  </Grid>

                  <Grid item sm={6} md={6} mt={1}>
                    <ReusableDropdown
                      label="Select derpetment"
                      name="department"
                      options={derpetmentOptions}
                    />
                  </Grid>

                  <Button
                    variant="outlined"
                    sx={{ marginLeft: "20px" }}
                    type="submit"
                    //disabled={isSubmitting}
                  >
                    Add users
                  </Button>
                </Grid>
              </Form>
            </Box>
          </Container>
        )}
      </Formik>
    </Box>
  );
}
