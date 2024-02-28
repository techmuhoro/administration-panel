"use client";

import { Input, Select, Checkbox } from "@/atoms/form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import * as Yup from "yup";

import { Formik, Form, FieldArray } from "formik";
import LoadingButton from "@/atoms/loading-button";
import { Container } from "@mui/material";

export default function RoleForm({
  data = null,
  isUpdate = false,
  handleSubmit,
  departments = [],
  permissions = [],
}) {
  const getShapedPermissions = () => {
    const results = [];

    if (isUpdate) {
      // use list on role
      for (let category of data.attributes.defaultPermissions) {
        for (let perm of category?.attributes?.permissions) {
          results.push(perm);
        }
      }
    } else {
      // use list from backend
      for (let category of permissions) {
        for (let perm of category.attributes.children) {
          results.push(perm);
        }
      }
    }
    console.log("results", results);

    return results;
  };

  const permissionCategories = isUpdate
    ? data.attributes.defaultPermissions
    : permissions;
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    department: Yup.string().required("Required"),
  });

  return (
    <Box>
      <Typography component="h1" variant="h5" mb={1}>
        {isUpdate ? "Update Role" : "Create a new role"}
      </Typography>

      <Box
        sx={{
          // border: "1px solid gray",
          maxWidth: "650px",
          mx: "auto",
          borderRadius: "5px",
          px: 2,
          py: 4,
        }}
        boxShadow={2}
      >
        <Formik
          initialValues={{
            name: data?.attributes?.name || "",
            department: data?.attributes?.departmentId || "",
            // description: data?.description || "",
            permissions: [...getShapedPermissions()],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(form) => (
            <Form>
              <Grid container columnSpacing={2} rowSpacing={2} mb={1}>
                <Grid xs={12} sm={12} md={6}>
                  <Input name="name" label="Role Name" />
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <Select name="department" label="Department">
                    {departments?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.attributes?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid xs={12}>
                  <FieldArray name="permissions">
                    {({ push }) => (
                      <Stack rowGap={1}>
                        {permissionCategories?.map((permissionCategory) => (
                          <Box key={permissionCategory.id}>
                            <Typography
                              sx={{
                                textTransform: "capitalize",
                                fontWeight: "500",
                              }}
                              component="h4"
                            >
                              {permissionCategory.attributes.name}
                            </Typography>

                            <Grid container>
                              {form.values.permissions.map(
                                (permissionItem, index) => {
                                  if (
                                    permissionItem.parent_id !==
                                    permissionCategory.id
                                  ) {
                                    return null;
                                  }
                                  return (
                                    <Grid key={permissionItem.key} sm={4}>
                                      <Checkbox
                                        name={`permissions.${index}.value`}
                                        label={permissionItem.key}
                                      />
                                    </Grid>
                                  );
                                }
                              )}
                            </Grid>
                          </Box>
                        ))}
                      </Stack>
                    )}
                  </FieldArray>
                </Grid>
              </Grid>

              <LoadingButton
                loading={form.isSubmitting}
                variant="contained"
                type="submit"
              >
                {isUpdate ? "Update" : "Create"}
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
