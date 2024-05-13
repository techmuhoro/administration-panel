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
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Input } from "@/atoms/form";

export default function BusinessLocation(props) {
  const { expanded, handleExpandedChange, data } = props;
  console.log("data", data);

  return (
    <Accordion expanded={expanded} onChange={handleExpandedChange}>
      <AccordionSummary aria-controls="panel1-content" id="panel1-header">
        <Stack direction="row" columnGap={2}>
          <Typography>Location</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
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
          >
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
