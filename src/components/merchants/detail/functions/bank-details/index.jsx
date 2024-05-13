"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions
} from "@/components/merchants/detail/ui";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Formik, Form, FieldArray } from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Input } from "@/atoms/form";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";

export default function BankDetails({ expanded, handleExpandedChange }) {
  const setAlertMessage = useNotifyAlertCtx();

  const MAXIMUM_BANKS = 2;

  return (
    <Accordion expanded={expanded} onChange={handleExpandedChange}>
      <AccordionSummary aria-controls="panel5-content" id="panel5-header">
        <Stack direction="row" columnGap={2}>
          <Typography>Bank Details</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Formik
            initialValues={{
              banks: [
                {
                  bankLocality: "",
                  bankName: "",
                  bankBranch: "",
                  accountName: "",
                  accountNumber: "",
                  currency: "",
                  swiftCode: "",
                  referenceId: ""
                },
                {
                  bankLocality: "",
                  bankName: "",
                  bankBranch: "",
                  accountName: "",
                  accountNumber: "",
                  currency: "",
                  swiftCode: "",
                  referenceId: ""
                }
              ]
            }}
          >
            {(formikProps) => (
              <Form>
                <Typography sx={{ fontWeight: 500, mb: 2 }} variant="body2">
                  * Minimum of 1 bank, Maximum of 2 bank accounts required
                </Typography>
                <FieldArray name="banks">
                  {(fieldArrayProps) => (
                    <Box>
                      <Button
                        onClick={() => {
                          if (formikProps.values.banks.length < MAXIMUM_BANKS) {
                            fieldArrayProps.push({
                              bankLocality: "",
                              bankName: "",
                              bankBranch: "",
                              accountName: "",
                              accountNumber: "",
                              currency: "",
                              swiftCode: "",
                              referenceId: ""
                            });
                          } else {
                            // alert the user
                            setAlertMessage(
                              `Only a maxium of ${MAXIMUM_BANKS} banks is allowed`,
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
                        {formikProps.values.banks.map((bank, index) => (
                          <>
                            {/* // eslint-disable-next-line  */}
                            <Box key={bank.id}>
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
                                  Bank {index + 1} of {MAXIMUM_BANKS}
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
                                    name={`banks.${index}.bankLocality`}
                                    label="Bank Locality"
                                  />
                                </Grid>

                                <Grid xs={12} md={6}>
                                  <Input
                                    name={`banks.${index}.bankName`}
                                    label="Bank Name"
                                  />
                                </Grid>

                                <Grid xs={12} md={6}>
                                  <Input
                                    name={`banks.${index}.bankBranch`}
                                    label="Branch"
                                  />
                                </Grid>

                                <Grid xs={12} md={6}>
                                  <Input
                                    name={`banks.${index}.accountName`}
                                    label="Account Name"
                                  />
                                </Grid>

                                <Grid xs={12} md={6}>
                                  <Input
                                    name={`banks.${index}.accountNumber`}
                                    label="Account Number"
                                  />
                                </Grid>

                                <Grid xs={12} md={6}>
                                  <Input
                                    name={`banks.${index}.currency`}
                                    label="Currency"
                                  />
                                </Grid>

                                <Grid xs={12} md={6}>
                                  <Input
                                    name={`banks.${index}.swiftCode`}
                                    label="Swift Code"
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </FieldArray>
              </Form>
            )}
          </Formik>
        </Box>
      </AccordionDetails>
      <AccordionActions>
        <Button color="primary" variant="contained">
          Save
        </Button>
      </AccordionActions>
    </Accordion>
  );
}
