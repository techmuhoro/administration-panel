"use client";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { Input, ReusableDropdown } from "@/atoms/form";
import { Formik, Form } from "formik";

export default function AddUserForm({ rolesData }) {
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
                <Input name="name" label="Full name" />
                <Grid sm={12} md={6} mt={2}>
                  <Input name="email" label="Email" />
                </Grid>
                <Grid sm={12} md={6} mt={2}>
                  <Input name="phone" label="Phone Number" />
                </Grid>
                <Grid sm={12} md={6} mt={2}>
                  <Input name="country" label="Country" />
                </Grid>
                <Grid sm={12} md={6} mt={2}>
                  <Input name="derpartment" label="Derpartment" />
                </Grid>
                <ReusableDropdown
                  label="Select role"
                  name="role"
                  options={options}
                />

                <Box
                  sx={{
                    display: "flex",
                    marginTop: "5px",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Add user
                  </Button>
                  <Button variant="contained" type="submit">
                    Update user
                  </Button>
                </Box>
              </Form>
            </Box>
          </Container>
        )}
      </Formik>
    </Box>
  );
}
