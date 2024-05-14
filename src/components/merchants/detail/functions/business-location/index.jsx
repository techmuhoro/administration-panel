"use client";

import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions
} from "@/components/merchants/detail/ui";
import { Formik, Form } from "formik";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Input } from "@/atoms/form";
import * as Yup from "yup";
import http from "@/http";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import LoadingButton from "@/atoms/loading-button";

const validationSchema = Yup.object().shape({
  physicalAddress: Yup.string().required(),
  postalAddress: Yup.string().required(),
  postalCode: Yup.string().required(),
  city: Yup.string().required(),
  county: Yup.string().required(),
  websiteLink: Yup.string().required(),
  socialLink: Yup.string().required(),
  referenceId: Yup.string().optional()
});

export default function BusinessLocation(props) {
  const { id: mercantId } = useParams();
  const setAlertMessage = useNotifyAlertCtx();

  const { expanded, handleExpandedChange, data } = props;
  console.log("data", data);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await http({
        url: `/merchants/${mercantId}/kyc/location`,
        method: "PATCH",
        data: values,
        includeAuthorization: true
      }).then((res) => res.data);

      const msg = "Location details updated successfully";

      setAlertMessage(msg);
    } catch (error) {
      const msg =
        error?.httpMessage || "Error! Location details could noy be update";

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
          <Typography>Location</Typography>
        </Stack>
      </AccordionSummary>
      <Box>
        <Formik
          initialValues={{
            physicalAddress: "",
            postalAddress: "",
            postalCode: "",
            city: "",
            county: "",
            websiteLink: "",
            socialLink: "",
            referenceId: ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <>
              <AccordionDetails>
                <Form>
                  <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid xs={12} md={6}>
                      <Input name="physicalAddress" label="Physical Address" />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Input name="postalAddress" label="Postal Address" />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Input name="postalCode" label="Postal Code" />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Input name="city" label="City" />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Input name="county" label="County" />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Input name="websiteLink" label="Website Link" />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <Input name="socialLink" label="Social Link" />
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