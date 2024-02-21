"use client";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { Input, ReusableDropdown } from "@/atoms/form";
import { Formik, Form } from "formik";

export default function UpdateUserForm({ rolesData }) {
  //replace the naming
  const options = rolesData.map((item) => {
    return {
      value: item.attributes.slug,
      label: item.attributes.name,
    };
  });

  // rolesData?.map((item) => {
  //   console.log(item.attributes);
  // });

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
        Update user details
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
                <Grid container spacing={2}>
                  <Grid item sm={6} md={6}>
                    <Input name="name" label="Full name" />
                  </Grid>

                  <Grid item sm={6} md={6}>
                    <Input name="email" label="Email" />
                  </Grid>

                  <Grid item sm={6} md={6} mt={2}>
                    <Input name="phone" label="Phone Number" />
                  </Grid>

                  <Grid item sm={6} md={6} mt={2}>
                    <Input name="country" label="Country" />
                  </Grid>

                  <Grid item sm={6} md={6} mt={2}>
                    <Input name="derpartment" label="Department" />
                  </Grid>

                  <Grid item sm={6} md={6}>
                    <ReusableDropdown
                      label="Select role"
                      name="role"
                      options={options}
                    />
                  </Grid>

                  <Button
                    variant="outlined"
                    sx={{ marginLeft: "20px" }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Update
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
