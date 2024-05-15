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
  physicalAddress: Yup.string().required("Required"),
  postalAddress: Yup.string().required("Required"),
  postalCode: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  county: Yup.string().required("Required"),
  websiteLink: Yup.string().required("Required"),
  socialLink: Yup.string().required("Required"),
  referenceId: Yup.string().optional()
});

export default function BusinessLocation({
  expanded,
  handleExpandedChange,
  data
}) {
  const { id: mercantId } = useParams();
  const setAlertMessage = useNotifyAlertCtx();

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, setFieldValue }
  ) => {
    console.log(values);
    try {
      const response = await http({
        url: `/merchants/${mercantId}/kyc/location`,
        method: "PATCH",
        data: values,
        includeAuthorization: true
      }).then((res) => res.data);

      // make an update to the referenceId from data returned by backend
      if (response?.data?.id) {
        setFieldValue("referenceId", response?.data?.id);
      }

      const msg = "Location details updated successfully";

      setAlertMessage(msg);
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 406) {
        setErrors(error?.response?.data?.error);
      }

      const msg =
        error?.httpMessage || "Error! Location details could not be update";

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
      <AccordionSummary aria-controls="panel1-content" id="panel1-header">
        <Stack direction="row" columnGap={2}>
          <Typography>Location</Typography>
        </Stack>
      </AccordionSummary>
      <Box>
        <Formik
          initialValues={{
            physicalAddress: data?.attributes?.physicalAddress || "",
            postalAddress: data?.attributes?.postalAddress || "",
            postalCode: data?.attributes?.postalCode || "",
            city: data?.attributes?.cityTown || "",
            county: data?.attributes?.county || "",
            websiteLink: data?.attributes?.website || "",
            socialLink: data?.attributes?.businessAppLink || "",
            referenceId: data?.id || ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form>
              <AccordionDetails>
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
