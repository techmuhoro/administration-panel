"use client";

import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions
} from "@/components/merchants/detail/ui";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { Form, Formik, FieldArray } from "formik";
import LoadingButton from "@/atoms/loading-button";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Input, Select } from "@/atoms/form";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import * as Yup from "yup";
import http from "@/http";

const directorSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  shareHolderType: Yup.string().required("Required"),
  contactNumber: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  documentType: Yup.string().required("Required"),
  documentNumber: Yup.string().required("Required"),
  nationality: Yup.string().required("Required"),
  referenceId: Yup.string().optional()
});

const validationSchema = Yup.object().shape({
  directors: Yup.array().of(directorSchema)
});

export default function Directors({ expanded, handleExpandedChange, data }) {
  const { id: merchantId } = useParams();
  const setAlertMessage = useNotifyAlertCtx();

  const MAXIMUM_DIRECTORS = 2;

  console.log("data", data);

  const formatInitialData = (dataValues) =>
    dataValues?.map((director) => ({
      firstName: director?.attributes?.firstName || "",
      lastName: director?.attributes?.lastName || "",
      shareHolderType: "",
      contactNumber: director?.attributes?.phoneNumber || "",
      email: director?.attributes?.email || "",
      documentType: director?.attributes?.identificationDocumentType || "",
      documentNumber: director?.attributes?.identificationDocumentNumber || "",
      nationality: director?.attributes?.nationality || "",
      referenceId: director?.id
    }));

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    // Hello
    try {
      const response = await http({
        url: `/merchants/${merchantId}/kyc/directors`,
        method: "PATCH",
        data: values,
        includeAuthorization: true
      }).then((res) => res.data);

      const msg = "Directors details updated successfully";
      // ! set directors to the new response from backend. This ensure reference id is attached to prevent recreation if user click the update button twice
      if (Array.isArray(response?.data)) {
        // setFieldValue("directors", formatInitialData(response?.data));
      }

      setAlertMessage(msg, { type: "success", openDuration: 3000 });
    } catch (error) {
      if (error?.response?.status === 406) {
        error?.response?.data?.error?.forEach((errorObj, index) => {
          Object.entries(errorObj).forEach(([key, value]) => {
            setFieldError(`directors.${index}.${key}`, value);
          });
        });
      }

      const msg =
        error?.httpMessage || "Error! Could not update directors information.";
      setAlertMessage(msg, { type: "error", openDuration: 3000 });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Accordion expanded={expanded} onChange={handleExpandedChange}>
      <AccordionSummary aria-controls="panel5-content" id="panel5-header">
        <Stack direction="row" columnGap={2}>
          <Typography>Directors</Typography>
        </Stack>
      </AccordionSummary>

      <Formik
        initialValues={{
          directors: formatInitialData(data)
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            <AccordionDetails>
              <Typography sx={{ fontWeight: 500, mb: 2 }} variant="body2">
                * Minimum of 1 director, Maximum of 2 directors required
              </Typography>

              <FieldArray name="directors">
                {(fieldArrayProps) => (
                  <Box>
                    <Button
                      onClick={() => {
                        if (
                          formikProps.values.directors.length <
                          MAXIMUM_DIRECTORS
                        ) {
                          fieldArrayProps.push({
                            firstName: "",
                            lastName: "",
                            shareHolderType: "",
                            contactNumber: "",
                            email: "",
                            documentType: "",
                            documentNumber: "",
                            nationality: "",
                            referenceId: ""
                          });
                        } else {
                          setAlertMessage(
                            `Only a maxium of ${MAXIMUM_DIRECTORS} directors are allowed`,
                            {
                              openDuration: 3000,
                              type: "error"
                            }
                          );
                        }
                      }}
                      startIcon={<ControlPointIcon />}
                    >
                      Add
                    </Button>

                    <Stack rowGap={4}>
                      {formikProps?.values?.directors?.map(
                        (director, index) => (
                          <Box key={director.id}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                              }}
                            >
                              <Typography
                                variant="body1"
                                fontWeight={500}
                                mb={1}
                              >
                                Director {index + 1} of {MAXIMUM_DIRECTORS}
                              </Typography>

                              <Button
                                startIcon={<WarningAmberIcon />}
                                color="error"
                                onClick={() => fieldArrayProps.remove(index)}
                              >
                                Remove
                              </Button>
                            </Box>

                            <Grid container rowSpacing={2} columnSpacing={2}>
                              <Grid xs={12} md={6}>
                                <Input
                                  name={`directors.${index}.firstName`}
                                  label="First Name"
                                />
                              </Grid>
                              <Grid xs={12} md={6}>
                                <Input
                                  name={`directors.${index}.lastName`}
                                  label="Last Name"
                                />
                              </Grid>
                              <Grid xs={12} md={6}>
                                <Input
                                  name={`directors.${index}.shareHolderType`}
                                  label="Shareholder Type"
                                />
                              </Grid>

                              <Grid xs={12} md={6}>
                                <Input
                                  name={`directors.${index}.contactNumber`}
                                  label="Contact Number"
                                />
                              </Grid>
                              <Grid xs={12} md={6}>
                                <Input
                                  name={`directors.${index}.email`}
                                  label="Email"
                                />
                              </Grid>

                              <Grid xs={12} md={6}>
                                <Input
                                  name={`directors.${index}.nationality`}
                                  label="Nationality"
                                />
                              </Grid>

                              <Grid xs={12} md={6}>
                                <Select
                                  name={`directors.${index}.documentType`}
                                  label="Document Type"
                                >
                                  <MenuItem value="1">National ID</MenuItem>
                                  <MenuItem value="2">Passport</MenuItem>
                                </Select>
                              </Grid>
                              <Grid xs={12} md={6}>
                                <Input
                                  name={`directors.${index}.documentNumber`}
                                  label="Document Number"
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        )
                      )}
                    </Stack>
                  </Box>
                )}
              </FieldArray>
            </AccordionDetails>
            <AccordionActions>
              <LoadingButton
                color="primary"
                variant="contained"
                type="submit"
                loading={formikProps.isSubmitting}
              >
                Save
              </LoadingButton>
            </AccordionActions>
          </Form>
        )}
      </Formik>
    </Accordion>
  );
}
