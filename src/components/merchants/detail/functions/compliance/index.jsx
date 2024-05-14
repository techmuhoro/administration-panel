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
import { Formik, Form } from "formik";
import LoadingButton from "@/atoms/loading-button";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import http from "@/http";

export default function Compliance(props) {
  const setAlertMessage = useNotifyAlertCtx();
  const { id: merchantId } = useParams();
  const { expanded, handleExpandedChange, data } = props;
  console.log("data", data);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await http({
        url: `/merchants/${merchantId}/kyc/compliance`,
        method: "PATCH",
        data: values,
        includeAuthorization: true
      });

      const msg = "Updated compliance details successfully";
      setAlertMessage(msg);
    } catch (error) {
      const msg =
        error?.httpMessage || "Error! Could not save compliance details";
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
          <Typography>Compliance</Typography>
        </Stack>
      </AccordionSummary>

      <Formik
        initialValues={{
          citizen: "",
          resident: "",
          greenCard: "",
          born: "",
          powerAuthority: "",
          address: "",
          mailAddress: "",
          bankAccount: "",
          telephone: "",
          fatcaStatus: "",
          consent: "",
          referenceId: ""
        }}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <>
            <AccordionDetails>
              <Form>
                <Typography>Form goes here</Typography>
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
