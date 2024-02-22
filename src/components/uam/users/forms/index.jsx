"use client";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { Input, ReusableDropdown } from "@/atoms/form";
import { Formik, Form } from "formik";

export default function AddUserForm({ rolesData, derpartmentData }) {
  //replace the naming
  const options = rolesData.map((item) => {
    return {
      value: item.attributes.slug,
      label: item.attributes.name,
    };
  });
  const derpetmentOptions = derpartmentData?.map((item) => {
    return {
      value: item.attributes.slug,
      label: item.attributes.name,
    };
  });

  let initialValue = {
    fullname: "",
    email: "",
    phone: "",
    country: "",
    derpartment: "",
    role: "",
  };
  return (
    <Box>
      <Typography component="h6" variant="h5" mb={1}>
        Add user
      </Typography>
      <Formik
        initialValues={initialValue}
        //handle submit logic
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Container maxWidth="md">
            <Box boxShadow={3} p={3}>
              <Form>
                <Grid container spacing={1}>
                  <Grid item sm={6} md={6}>
                    <Input name="name" label="Full name" />
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
                      name="derpartment"
                      options={derpetmentOptions}
                    />
                  </Grid>

                  <Button
                    variant="outlined"
                    sx={{ marginLeft: "20px" }}
                    type="submit"
                    disabled={isSubmitting}
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
