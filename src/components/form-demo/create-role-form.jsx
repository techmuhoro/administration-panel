"use client";

import { Input, Checkbox } from "@/atoms/form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FieldArray, Form, Formik } from "formik";
import { getShapedPermissions, permissionCategories } from "./data";
import * as Yup from "yup";

export default function CreateRoleForm() {
  return (
    <Box>
      <Formik
        initialValues={{
          name: "",
          description: "",
          permissions: [...getShapedPermissions()],
        }}
        validationSchema={Yup.object({
          name: Yup.string().max(50, "Max 50 characters").required("Required"),
          description: Yup.string()
            .max(100, "Max 100 characters")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(form) => (
          <Form>
            <Stack rowGap={2}>
              <Input name="name" label="Role Name" />

              <Input name="description" label="Description" />

              <Box>
                <Typography sx={{ fontWeight: "medium", mb: 1 }}>
                  Permissions
                </Typography>
                <FieldArray name="permissions">
                  {({ push }) => (
                    <>
                      {permissionCategories.map((permissionCategory) => (
                        <Accordion key={permissionCategory}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel-${permissionCategory}-content`}
                            id={`panel-${permissionCategories}-header`}
                          >
                            {permissionCategory}
                          </AccordionSummary>
                          <AccordionDetails>
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
                                    <Grid key={permissionItem.name} sm={6}>
                                      <Checkbox
                                        name={`permissions.${index}.checked`}
                                        label={permissionItem.name}
                                      />
                                    </Grid>
                                  );
                                }
                              )}
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </>
                  )}
                </FieldArray>
              </Box>
              <Box>
                <Button type="submit" variant="contained">
                  Create
                </Button>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
