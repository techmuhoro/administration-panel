import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions
} from "@/components/merchants/detail/ui";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function BusinessInformation(props) {
  const { expanded, handleExpandedChange, data } = props;
  console.log("data", data);

  return (
    <Accordion expanded={expanded} onChange={handleExpandedChange}>
      <AccordionSummary aria-controls="panel1-content" id="panel1-header">
        <Stack direction="row" columnGap={2}>
          <Typography>Business Information</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Formik
            initialValues={{
              businessName: "",
              businessBrandName: "",
              businessRegistrationNumber: "",
              businessCategory: "",
              businessSubCategory: "",
              businessTaxPin: "",
              businessTelephone: "",
              businessEmail: "",
              businessDescription: "",
              businessCurrencies: "",
              businessStatus: "",
              registeredStatus: "",
              businessOldVid: "",
              agreedCommissionRate: "",
              businessType: "",
              duration: "",
              referenceId: ""
            }}
          >
            <Form>
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid xs={12} md={6}>
                  <Typography>Text</Typography>
                </Grid>
              </Grid>
            </Form>
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
