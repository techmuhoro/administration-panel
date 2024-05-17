"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions
} from "@/components/merchants/detail/ui";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Formik, Form, FieldArray } from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Input, Select } from "@/atoms/form";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import LoadingButton from "@/atoms/loading-button";
import * as Yup from "yup";
import http from "@/http";

const bankShema = Yup.object().shape({
  bankLocality: Yup.string().required("Required"),
  bankName: Yup.string().required("Required"),
  bankBranch: Yup.string().required("Required"),
  accountName: Yup.string().required("Required"),
  accountNumber: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  releaseLevel: Yup.string().required("Required"),
  releaseFrequency: Yup.string().required("Required"),
  swiftCode: Yup.string().required("Required"),
  referenceId: Yup.string().optional()
});

const RELEASE_FREQUENCIES = [
  { key: "1", value: "Daily" },
  { key: "2", value: "Weekly" },
  { key: "3", value: "Monthly" },
  { key: "4", value: "Fortnight" }
];

// const currencies = ["KES", "USD"];

const validationShema = Yup.object().shape({
  banks: Yup.array().of(bankShema)
});

export default function BankDetails({
  expanded,
  handleExpandedChange,
  data,
  utils
}) {
  const { id: merchantId } = useParams();
  const setAlertMessage = useNotifyAlertCtx();

  const formatInitialData = (dataValues) =>
    dataValues?.map((bank) => ({
      bankLocality: bank?.attributes.bankLocality || "",
      bankName: bank?.attributes.bankName || "",
      bankBranch: bank?.attributes.bankBranch || "",
      accountName: bank?.attributes.bankAccountName || "",
      accountNumber: bank?.attributes.bankAccountNumber || "",
      currency: bank?.attributes.bankAccountCurrency || "",
      swiftCode: bank?.attributes.swiftCode || "",
      referenceId: bank?.id || ""
    })) || [];

  const MAXIMUM_BANKS = 2;

  const countries = useMemo(
    () =>
      utils?.countries?.map((country) => ({
        key: country?.id,
        value: country?.attributes?.name
      })),
    [utils?.countries]
  );

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldValue, setFieldError }
  ) => {
    try {
      const response = await http({
        url: `/merchants/${merchantId}/kyc/banks`,
        method: "PATCH",
        data: values,
        includeAuthorization: true
      }).then((res) => res.data);

      const msg = "Bank details updated successfully";

      // ! set banks to the new response from backend. This ensure reference id is attached to prevent recreation if user click the update button twice
      if (Array.isArray(response?.data)) {
        setFieldValue("banks", formatInitialData(response?.data));
      }

      setAlertMessage(msg, { openDuration: 3000, type: "success" });
    } catch (error) {
      if (error?.response?.status === 406) {
        error?.response?.data?.error?.forEach((errorObj, index) => {
          Object.entries(errorObj).forEach(([key, value]) => {
            setFieldError(`banks.${index}.${key}`, value);
          });
        });
      }
      const msg = error?.httpMessage || "Error! Could not update bank details";
      setAlertMessage(msg, {
        type: "error",
        openDuration: 3000
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Accordion expanded={expanded} onChange={handleExpandedChange}>
      <AccordionSummary aria-controls="panel5-content" id="panel5-header">
        <Stack direction="row" columnGap={2}>
          <Typography>Bank Details</Typography>
        </Stack>
      </AccordionSummary>

      <Box>
        <Formik
          initialValues={{
            banks: formatInitialData(data)
          }}
          validationSchema={validationShema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form>
              <AccordionDetails>
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
                              releaseLevel: "",
                              releaseFrequency: "",
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
                                  {/* <Input
                                    name={`banks.${index}.bankLocality`}
                                    label="Bank Locality"
                                  /> */}

                                  <Select
                                    name={`banks.${index}.bankLocality`}
                                    label="Bank Locality"
                                  >
                                    <MenuItem value="">
                                      Select Locality
                                    </MenuItem>
                                    {countries.map((country) => (
                                      <MenuItem
                                        key={country?.key}
                                        value={country?.key}
                                      >
                                        {country?.value}
                                      </MenuItem>
                                    ))}
                                  </Select>
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
                                    name={`banks.${index}.releaseLevel`}
                                    label="Release Level / Amount"
                                    type="number"
                                  />
                                </Grid>

                                <Grid xs={12} md={6}>
                                  <Select
                                    name={`banks.${index}.releaseFrequency`}
                                    label="Release Frequency"
                                  >
                                    <MenuItem>
                                      Select Release Frequency
                                    </MenuItem>
                                    {RELEASE_FREQUENCIES.map((item) => (
                                      <MenuItem
                                        key={item?.key}
                                        value={item?.key}
                                      >
                                        {item?.value}
                                      </MenuItem>
                                    ))}
                                  </Select>
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
      </Box>
    </Accordion>
  );
}
