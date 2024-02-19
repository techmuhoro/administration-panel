"use client";

import { Input, Select, Checkbox } from "@/atoms/form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Formik, Form, FieldArray } from "formik";
import { getShapedPermissions, permissionCategories } from "./data";

export default function RoleForm({
  data = null,
  isUpdate = false,
  handleSubmit,
}) {
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
        >
          {(form) => (
            <Form>
              <Grid container columnSpacing={2} rowSpacing={2} mb={1}>
                <Grid sm={12} md={6}>
                  <Input name="name" label="Role Name" />
                </Grid>
                <Grid sm={12} md={6}>
                  <Select name="department" label="Department">
                    {[
                      "Engineering",
                      "Marketing",
                      "Operations",
                      "DevOps",
                      "HR",
                      "Customer Care",
                    ].map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid xs={12}>
                  <Input
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    maxRows={10}
                  />
                </Grid>

                <Grid xs={12}>
                  <FieldArray name="permissions">
                    {({ push }) => (
                      <Stack rowGap={1}>
                        {permissionCategories.map((permissionCategory) => (
                          <Box key={permissionCategory}>
                            <Typography
                              sx={{
                                textTransform: "capitalize",
                                fontWeight: "500",
                              }}
                              component="h4"
                            >
                              {permissionCategory}
                            </Typography>

                            <Grid container>
                              {form.values.permissions.map(
                                (permissionItem, index) => {
                                  if (
                                    permissionItem.category !==
                                    permissionCategory
                                  ) {
                                    return null;
                                  }
                                  return (
                                    <Grid key={permissionItem.name} sm={4}>
                                      <Checkbox
                                        name={`permissions.${index}.checked`}
                                        label={permissionItem.name}
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

              <Button variant="contained">Create</Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
