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

export default function RoleForm({
  data = null,
  isUpdate = false,
  handleSubmit,
  departments = [],
  permissions = [],
}) {
  const getShapedPermissions = () => {
    const results = [];

    for (let category of permissions) {
      for (let perm of category.attributes.children) {
        results.push(perm);
      }
    }

    return results;
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    department: Yup.string().required("Required"),
  });

  return (
    <Box>
      <Typography component="h1" variant="h5" mb={1}>
        Create a new role
      </Typography>

      <Box
        sx={{
          // border: "1px solid gray",
          maxWidth: "600px",
          mx: "auto",
          borderRadius: "5px",
        }}
      >
        <Formik
          initialValues={{
            name: data?.name || "",
            department: data?.department || "",
            description: data?.description || "",
            permissions: [...getShapedPermissions()],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(form) => (
            <Form>
              <Grid container columnSpacing={2} rowSpacing={2} mb={1}>
                <Grid sm={12} md={6}>
                  <Input name="name" label="Role Name" />
                </Grid>
                <Grid sm={12} md={6}>
                  <Select name="department" label="Department">
                    {departments?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.attributes?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                {/* <Grid xs={12}>
                  <Input
                    name="description"
                    label="Description"
                    multiline
                    minRows={4}
                    maxRows={10}
                  />
                </Grid> */}
                <Grid xs={12}>
                  <FieldArray name="permissions">
                    {({ push }) => (
                      <Stack rowGap={1}>
                        {permissions?.map((permissionCategory) => (
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

              <Button variant="contained" type="submit">
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
