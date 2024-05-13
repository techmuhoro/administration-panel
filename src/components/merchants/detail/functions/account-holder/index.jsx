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
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import { Input, Select } from "@/atoms/form";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function AccountHolder(props) {
  const { expanded, handleExpandedChange, data } = props;
  console.log("data", data);
  return (
    <Accordion expanded={expanded} onChange={handleExpandedChange}>
      <AccordionSummary aria-controls="panel1-content" id="panel1-header">
        <Stack direction="row" columnGap={2}>
          <Typography>Account Holder</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              contactNumber: "",
              email: "",
              gender: "",
              documentType: "",
              documentNumber: "",
              dateOfBirth: "",
              referenceId: ""
            }}
          >
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
