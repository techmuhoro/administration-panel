"use client";

// import { useParams } from "next/navigation";
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

export default function Directors({ expanded, handleExpandedChange }) {
  const setAlertMessage = useNotifyAlertCtx();

  const MAXIMUM_DIRECTORS = 2;

  return (
    <Accordion expanded={expanded} onChange={handleExpandedChange}>
      <AccordionSummary aria-controls="panel5-content" id="panel5-header">
        <Stack direction="row" columnGap={2}>
          <Typography>Directors</Typography>
        </Stack>
      </AccordionSummary>

      <Formik
        initialValues={{
          directors: []
        }}
      >
        {(formikProps) => (
          <>
            <AccordionDetails>
              <Form>
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
                        {formikProps.values.directors.map((director, index) => (
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
                                  label="Contact Number"
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
                                  <MenuItem value="national-id">
                                    National ID
                                  </MenuItem>
                                  <MenuItem value="passport">Passport</MenuItem>
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
                        ))}
                      </Stack>
                    </Box>
                  )}
                </FieldArray>
              </Form>
            </AccordionDetails>

            <AccordionActions>
              <LoadingButton
                color="primary"
                variant="contained"
                loading={formikProps.isSubmitting}
              >
                Save
              </LoadingButton>
            </AccordionActions>
          </>
        )}
      </Formik>
    </Accordion>
  );
}
