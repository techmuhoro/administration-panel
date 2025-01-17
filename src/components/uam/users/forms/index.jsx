"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StyledContentWrapper from "@/atoms/wrappers/styled-content-wrapper";
import { Box, Typography, Grid, Container } from "@mui/material";
import { Input, ReusableDropdown, Checkbox } from "@/atoms/form";
import { Formik, Form, Field } from "formik";
import { BASE_URL } from "@/lib/constants";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import axios from "axios";
import Cookie from "js-cookie";
import LoadingButton from "@/atoms/loading-button";
import * as Yup from "yup";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { getLoginData } from "../../../../lib/redux/auth2/otplogin-slice";
import { useSelector } from "react-redux";
import http from "@/http";

export default function AddUserForm({
  rolesData,
  departmentData,
  userDetails,
  handleSubmit,
  isUpdate,
}) {
  const loginData = useSelector(getLoginData);

  let contries = loginData?.includes?.opCountries;

  let operationContries = contries?.filter(
    (item) => item.attributes.opStatus === 1
  );

  let allContries = operationContries?.map((item) => ({
    label: item.attributes.name,
    value: item.attributes.iso,
  }));

  // Access specific values from the store state using selectors

  if (isUpdate) {
    //filter user with the role and derp
  }

  //console.log(userDetails,'user-details')
  const options = rolesData?.map((item) => {
    return {
      value: item.id,
      label: item.attributes.name,
    };
  });

  const derpetmentOptions = departmentData.map((item) => {
    return {
      value: item.id,
      label: item.attributes.name,
    };
  });

  let permissionsData = [];
  let allPermissionObjects = [];

  if (isUpdate) {
    permissionsData = userDetails?.attributes?.permissions || [];
    allPermissionObjects = userDetails?.attributes?.permissions
      .reduce((acc, permissionGroup) => {
        acc.push(permissionGroup.attributes.permissions);
        return acc;
      }, [])
      .flat();
  }

  let initialValue = {
    name: isUpdate ? userDetails?.attributes?.name : "",
    email: isUpdate ? userDetails?.attributes?.email : "",
    status: isUpdate ? userDetails?.attributes?.status : "",
    phone: isUpdate ? userDetails?.attributes?.phone : "",
    country: isUpdate ? userDetails?.attributes?.country : "",
    department: isUpdate ? userDetails?.attributes?.departmentId : "",
    role: isUpdate ? userDetails?.attributes?.roleId : "",
    permissions: isUpdate ? allPermissionObjects : "",
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
        {isUpdate ? "Update user" : "Add user"}
      </Typography>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(form) => (
          <Container maxWidth="md">
            <Form>
              <StyledContentWrapper sx={{ p: 3 }}>
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

                  {/**get this country from global storage  redux get country*/}
                  <Grid item sm={12} md={6}>
                    <ReusableDropdown
                      label="Select Country"
                      name="country"
                      options={allContries}
                    />
                  </Grid>

                  <Grid item sm={12} md={6}>
                    <ReusableDropdown
                      label="Select role"
                      name="role"
                      options={options}
                    />
                  </Grid>

                  <Grid item sm={12} md={6}>
                    <ReusableDropdown
                      label="Select derpetment"
                      name="department"
                      options={derpetmentOptions}
                    />
                  </Grid>
                  {isUpdate ? (
                    <Grid item sm={6} md={3}>
                      <Typography
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: "500",
                        }}
                        component="h4"
                      >
                        User status
                      </Typography>
                      <RadioGroup name="status">
                        <Field name="status">
                          {({ field, form }) => (
                            <>
                              <FormControlLabel
                                value={0}
                                control={<Radio />}
                                label="ACTIVE"
                                onChange={() =>
                                  form.setFieldValue("status", "true")
                                }
                                checked={field.value === "true"}
                              />
                              <FormControlLabel
                                value={1}
                                control={<Radio />}
                                label="INACTIVE"
                                onChange={() =>
                                  form.setFieldValue("status", "false")
                                }
                                checked={field.value === "false"}
                              />
                            </>
                          )}
                        </Field>
                      </RadioGroup>
                    </Grid>
                  ) : null}
                </Grid>

                {permissionsData.map((item) => (
                  <Grid key={item.id}>
                    <Typography
                      sx={{
                        textTransform: "capitalize",
                        fontWeight: "500",
                      }}
                      component="h4"
                    >
                      {item.attributes.name}
                    </Typography>

                    <Grid container>
                      {form.values.permissions.map((permissionItem, index) => {
                        if (permissionItem.parent_id !== item.id) {
                          return null;
                        }
                        return (
                          <Grid key={index} sm={4}>
                            <Checkbox
                              name={`permissions.${index}.value`}
                              label={permissionItem.key}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                ))}

                <LoadingButton
                  variant="contained"
                  sx={{ marginTop: "10px" }}
                  loading={form.isSubmitting}
                  type="submit"
                >
                  {isUpdate ? "Update user" : "Add user"}
                </LoadingButton>
              </StyledContentWrapper>
            </Form>
          </Container>
        )}
      </Formik>
    </Box>
  );
}
