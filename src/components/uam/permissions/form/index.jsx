"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Input, Select } from "@/atoms/form";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@/atoms/loading-button";
import Divider from "@mui/material/Divider";
import * as Yup from "yup";

import { Formik, Form, FieldArray } from "formik";
import { Stack, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PermissionForm({
  data = null,
  isUpdate = false,
  handleSubmit,
  categories,
}) {
  const parentCategories = categories.map((category) => ({
    id: category.id,
    name: category?.attributes?.name,
    slug: category?.attributes?.slug,
  }));

  const getCategoryExistingPermissions = (categoryId) => {
    const selectedCat = categories.find((cat) => cat.id == categoryId);

    if (selectedCat) {
      const permissions = selectedCat.attributes.children;
      return permissions.map((perm) => perm.key).join(", ");
    }

    return "";
  };

  const validationSchema = Yup.object({
    parentId: Yup.string().required("Required"),
    name: Yup.string().when("parentId", {
      is: "none",
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.optional(),
    }),

    critical: Yup.string().when("parentId", {
      is: "none",
      then: (schema) =>
        schema
          .required("Required")
          .oneOf(["true", "false"], "Critcal shoould be either Yes or No"),
      otherwise: (schema) => schema.optional(),
    }),
    // description: Yup.string().required("Required"),
    description: Yup.string().when("parentId", {
      is: "none",
      then: (schema) => schema.required("Required"),
      otherwise: (schema) => schema.optional(),
    }),
  });

  return (
    <>
      <Box>
        <Typography component="h1" variant="h5" mb={1}>
          {isUpdate ? "Update Permission" : "Create new Permission"}
        </Typography>

        <Box
          sx={{
            maxWidth: "600px",
            mx: "auto",
            borderRadius: "5px",
            // border: "1px solid rgb(211, 211, 211)",
            p: 4,
          }}
          boxShadow={2}
        >
          <Formik
            initialValues={{
              parentId: "",
              critical: "",
              name: data?.name || "", // name of category if applicable
              description: "",
              permissions: [""],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(form) => (
              <Form>
                <Grid container columnSpacing={2} rowSpacing={2} mb={1}>
                  <Grid xs={12} md={6}>
                    <Select name="parentId" label={"Parent Group"}>
                      <MenuItem value="none">Does not Exist</MenuItem>
                      {parentCategories.map((parent) => (
                        <MenuItem
                          sx={{ textTransform: "capitalize" }}
                          key={parent.id}
                          value={parent.id}
                        >
                          {parent.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  <Grid xs={12} md={6}>
                    <Input
                      name="name"
                      label="Category Name"
                      disabled={form.values.parentId !== "none"}
                      helperText="Only applicable if category does not exist"
                    />
                  </Grid>

                  <>
                    {form.values.parentId === "none" && (
                      <>
                        <Grid xs={12}>
                          <Select name="critical" label={"Critical ?"}>
                            <MenuItem value="false">No</MenuItem>
                            <MenuItem value="true">Yes</MenuItem>
                          </Select>
                        </Grid>

                        <Grid xs={12}>
                          <Input
                            name="description"
                            label="Description"
                            multiline
                            minRows={2}
                            maxRows={5}
                          />
                        </Grid>
                      </>
                    )}
                  </>
                </Grid>

                <Box>
                  <Typography variant="h6"> Permissions</Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Typography variant="body2" mb={2}>
                    <strong>Existing: </strong>
                    {getCategoryExistingPermissions(form.values.parentId)}
                  </Typography>

                  <FieldArray name="permissions">
                    {({ push, remove }) => (
                      <Stack rowGap={2}>
                        {form.values.permissions.map((item, index) => (
                          <Stack key={index} direction="row">
                            <Box sx={{ flexGrow: 1 }}>
                              <Input
                                name={`permissions.${index}`}
                                label={"Name"}
                                fullWidth
                              />
                            </Box>

                            <IconButton
                              onClick={() => push("")}
                              sx={{
                                display:
                                  index === form.values.permissions.length - 1
                                    ? "block"
                                    : "none",
                              }}
                              disabled={
                                form.values.permissions[index].length < 1
                              }
                            >
                              <AddCircleOutlineIcon color="primary" />
                            </IconButton>

                            <IconButton
                              onClick={() => remove(index)}
                              sx={{
                                display:
                                  index !== form.values.permissions.length - 1
                                    ? "block"
                                    : "none",
                              }}
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Stack>
                        ))}
                      </Stack>
                    )}
                  </FieldArray>
                </Box>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={form.isSubmitting}
                >
                  {isUpdate ? "Update" : "Create"}
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
}
