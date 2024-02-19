//! this file will be delete
"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Input, Checkbox, Select, Radio, RadioGroup } from "@/atoms/form";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function CreateUserForm() {
  return (
    <Box>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          city: "",
          acceptedTerms: false, // added for our checkbox
          // jobType: "", // added for our select
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          city: Yup.string()
            .max(20, "Cannot exceed 20 characters")
            .required("Required"),
          gender: Yup.string()
            .required("Required")
            .oneOf(["male", "female"], "Gender can only be male or female"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          jobType: Yup.string()
            .oneOf(
              ["designer", "development", "product", "other"],
              "Invalid Job Type"
            )
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <Grid container sx={{}} spacing={2}>
            <Grid sm={12} md={6} sx={{}}>
              <Input name="firstName" label={"First name"} />
            </Grid>
            <Grid sm={12} md={6} sx={{}}>
              <Input name="lastName" label={"Last name"} />
            </Grid>
            <Grid sm={12} md={6}>
              <Input name="email" label={"Email"} />
            </Grid>
            <Grid sm={12} md={6}>
              <Input label="city" name="city" />
            </Grid>

            <Grid sm={12}>
              <Select name="jobType" label="Job type" id="job-type">
                {["designer", "development", "product", "other"].map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid sm={12}>
              <RadioGroup name="gender" label="Gender">
                {["male", "female"].map((item) => (
                  <Radio
                    key={item}
                    label={item.charAt(0).toUpperCase() + item.slice(1)} // transform to uppercase
                    value={item}
                  />
                ))}
              </RadioGroup>
            </Grid>
            <Grid sm={12}>
              <Checkbox
                name="acceptedTerms"
                label={"Accept Terms & Conditions"}
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}
