"use client";

import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions
} from "@/components/merchants/detail/ui";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { Form, Formik } from "formik";
import { Input, Select } from "@/atoms/form";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import * as Yup from "yup";
import LoadingButton from "@/atoms/loading-button";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import http from "@/http";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  contactNumber: Yup.string().required(),
  email: Yup.string().required(),
  taxPinNumber: Yup.string().required(),
  gender: Yup.string().required(),
  documentType: Yup.string().required(),
  documentNumber: Yup.string().required(),
  dateOfBirth: Yup.string().required(),
  referenceId: Yup.string().optional()
});

export default function AccountHolder(props) {
  const { id: mercantId } = useParams();
  const setAlertMessage = useNotifyAlertCtx();

  const { expanded, handleExpandedChange, data } = props;
  console.log("data", data);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await http({
        url: `/merchants/${mercantId}/kyc/acc-holder`,
        method: "PATCH",
        data: values,
        includeAuthorization: true
      });

      const msg = "Account Holder information updated successfully";
      setAlertMessage(msg);
    } catch (error) {
      const msg =
        error?.httpMessage ||
        "Error! Account holder information could not be updated.";
      setAlertMessage(msg, {
        type: "error"
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Accordion expanded={expanded} onChange={handleExpandedChange}>
      <AccordionSummary aria-controls="panel1-content" id="panel1-header">
        <Stack direction="row" columnGap={2}>
          <Typography>Account Holder</Typography>
        </Stack>
      </AccordionSummary>
      <Box>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            firstName: "",
            lastName: "",
            contactNumber: "",
            email: "",
            taxPinNumber: "",
            gender: "",
            documentType: "",
            documentNumber: "",
            dateOfBirth: "",
            referenceId: ""
          }}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <>
              <AccordionDetails>
                <Form>
                  <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid xs={12} md={6}>
                      <Input name="firstName" label="First Name" />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Input name="lastName" label="Last Name" />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Input name="contactNumber" label="Contact Number" />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Input name="email" label="Email" />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Input name="taxPinNumber" label="Tax Pin" />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Select name="documentType" label="Document Type">
                        <MenuItem value="national-id">National ID</MenuItem>
                        <MenuItem value="passport">Passport</MenuItem>
                      </Select>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Input name="documentNumber" label="Document Number" />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Input name="gender" label="Gender" />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Input
                        type="date"
                        name="dateOfBirth"
                        label="Date Of Birth"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
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
      </Box>
    </Accordion>
  );
}
