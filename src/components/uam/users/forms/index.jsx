"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Grid, Container } from "@mui/material";
import { Input, ReusableDropdown, Checkbox } from "@/atoms/form";
import { Formik, Form } from "formik";
import { BASE_URL } from "@/lib/constants";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import axios from "axios";
import Cookie from "js-cookie";
import LoadingButton from "@/atoms/loading-button";
import * as Yup from "yup";

export default function AddUserForm({
  rolesData,
  departmentData,
  userDetails,
  isUpdate,
}) {
  const setAlertMessage = useNotifyAlertCtx();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token = Cookie.get("token");

  if (isUpdate) {
    //filter user with the role and derp
  }

  const options = rolesData.data.map((item) => {
    return {
      value: item.id,
      label: item.attributes.name,
    };
  });
  const derpetmentOptions = departmentData.data.map((item) => {
    return {
      value: item.id,
      label: item.attributes.name,
    };
  });

  const handleSubmit = (value) => {
    console.log(value, "this are the new values");
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    setLoading(true);
    axios
      .post(`${BASE_URL}users`, JSON.stringify(value), { headers })
      .then((response) => {
        setAlertMessage("User has been created successfully", {
          type: "success",
          openDuration: 3000,
        });
        setLoading(false);

        router.push("/dashboard/users");
      })
      .catch((error) => {
        let errorObject = error.response?.data?.error;
        console.log(error);
        let errorKey = [
          "email",
          "user",
          "name",
          "phone",
          "country",
          "department",
          "role",
        ];
        errorKey.forEach((key) => {
          if (errorObject.hasOwnProperty(key)) {
            setAlertMessage(errorObject[key], {
              type: "error",
              openDuration: 3000,
            });
          }
        });
        setLoading(false);
      });
  };

  console.log(derpetmentOptions, "option field");
  console.log(options, "role optiona");
  console.log(userDetails);

  let permissionsData = userDetails.data.attributes.permissions;

  const allPermissionObjects = userDetails.data.attributes.permissions
    .reduce((acc, permissionGroup) => {
      acc.push(permissionGroup.attributes.permissions);
      return acc;
    }, [])
    .flat();

  let initialValue = {
    name: isUpdate ? userDetails.data.attributes.name : "",
    email: isUpdate ? userDetails.data.attributes.email : "",
    phone: isUpdate ? userDetails.data.attributes.phone : "",
    country: isUpdate ? userDetails.data.attributes.country : "",
    department: isUpdate ? userDetails.data.attributes.departmentId : "",
    role: isUpdate ? userDetails.data.attributes.roleId : "",
    permissions: allPermissionObjects,
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

                  <Grid item sm={6} md={6}>
                    <ReusableDropdown
                      label="Select role"
                      name="role"
                      options={options}
                    />
                  </Grid>

                  <Grid item sm={6} md={6}>
                    <ReusableDropdown
                      label="Select derpetment"
                      name="department"
                      options={derpetmentOptions}
                    />
                  </Grid>
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
                              key={index}
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
                  variant="outlined"
                  sx={{ marginLeft: "10px" }}
                  loading={loading}
                  type="submit"
                >
                  {isUpdate ? "Update user" : "Add user"}
                </LoadingButton>
              </Box>
            </Form>
          </Container>
        )}
      </Formik>
    </Box>
  );
}
