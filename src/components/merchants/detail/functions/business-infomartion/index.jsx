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
import MenuItem from "@mui/material/MenuItem";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Input, Select } from "@/atoms/form";

export default function BusinessInformation({
  expanded,
  handleExpandedChange,
  data
  // utils
}) {
  // Dropdown utils
  return (
    <Accordion expanded={expanded} onChange={handleExpandedChange}>
      <AccordionSummary aria-controls="panel1-content" id="panel1-header">
        <Stack direction="row" columnGap={2}>
          <Typography>Business Information</Typography>
        </Stack>
      </AccordionSummary>

      <Box>
        <Formik
          initialValues={{
            businessName: data?.attributes?.businessName || "",
            businessBrandName: data?.attributes?.brandName || "",
            businessRegistrationNumber:
              data?.attributes?.businessRegistrationNumber || "",
            businessCategory: "",
            businessSubCategory: data?.attributes?.businessSubCategory || "",
            businessTaxPin: data?.attributes?.businessTaxPin || "",
            businessTelephone: data?.attributes?.businessPhoneNumber || "",
            businessEmail: data?.attributes?.businessEmail || "",
            businessDescription: data?.attributes?.businessDescription || "",
            businessCurrencies: "",
            businessStatus: data?.attributes?.businessType || "",
            registeredStatus: "",
            businessOldVid: "",
            agreedCommissionRate: data?.attributes?.businessRate || "",
            businessType: data?.attributes?.businessType || "",
            duration: data?.attributes?.signUpDuration || "",
            referenceId: ""
          }}
        >
          <Form>
            <AccordionDetails>
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid xs={12} md={6}>
                  <Input name="businessName" label="Business Name" />
                </Grid>

                <Grid xs={12} md={6}>
                  <Input name="businessBrandName" label="BrandName" />
                </Grid>

                <Grid xs={12} md={6}>
                  <Select name="businessCategory" label="Category">
                    <MenuItem value="1">Category 1</MenuItem>
                    <MenuItem value="2">Category 2</MenuItem>
                  </Select>
                </Grid>

                <Grid xs={12} md={6}>
                  <Select name="businessSubCategory" label="Sub Category">
                    <MenuItem value="1">Sub Category 1</MenuItem>
                    <MenuItem value="2">Sub Category 2</MenuItem>
                  </Select>
                </Grid>

                <Grid xs={12} md={6}>
                  <Input
                    name="businessRegistrationNumber"
                    label="Registration Number"
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  <Input name="businessTaxPin" label="Business Tax Pin" />
                </Grid>

                <Grid xs={12} md={6}>
                  <Input name="businessTelephone" label="Business Telephone" />
                </Grid>

                <Grid xs={12} md={6}>
                  <Input name="businessEmail" label="Business Email" />
                </Grid>

                <Grid xs={12} md={6}>
                  <Input
                    name="businessDescription"
                    label="Business Description"
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  <Input name="businessCurrencies" label="Currencies" />
                </Grid>

                <Grid xs={12} md={6}>
                  <Select name="businessStatus" label="Business Status">
                    <MenuItem value="1">Live</MenuItem>
                    <MenuItem value="2">Dormant</MenuItem>
                    <MenuItem value="3">Suspended</MenuItem>
                  </Select>
                </Grid>

                <Grid xs={12} md={6}>
                  <Select name="registeredStatus" label="Registered Status">
                    <MenuItem value="1">Yes</MenuItem>
                    <MenuItem value="2">No</MenuItem>
                  </Select>
                </Grid>

                <Grid xs={12} md={6}>
                  <Input name="businessOldVid" label="Business Old Vid" />
                </Grid>

                <Grid xs={12} md={6}>
                  <Input
                    name="agreedCommissionRate"
                    label="Agreed Commission"
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  <Select name="businessType" label="Business Type">
                    <MenuItem value="1">Registered </MenuItem>
                    <MenuItem value="2">Non Registered </MenuItem>
                  </Select>
                </Grid>

                <Grid xs={12} md={6}>
                  <Input name="duration" label="Duration" />
                </Grid>
              </Grid>
            </AccordionDetails>

            <AccordionActions>
              <Button color="primary" variant="contained">
                Save
              </Button>
            </AccordionActions>
          </Form>
        </Formik>
      </Box>
    </Accordion>
  );
}
