import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
} from "@/components/merchants/detail/ui";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function GeneralInformation({
  expanded,
  handleExpandedChange,
  data,
}) {
  return (
    <Accordion expanded={expanded} onChange={handleExpandedChange}>
      <AccordionSummary aria-controls="panel1-content" id="panel1-header">
        <Stack direction="row" columnGap={2}>
          <Typography>General Information</Typography>
          <Chip
            label="100% complete"
            color="success"
            variant="outlined"
            size="small"
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Grid container rowSpacing={2} columnSpacing={1}>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Merchant Name"
                id="merchant-name"
                value={
                  data?.attributes?.businessInformation?.businessName || ""
                }
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField fullWidth label="Vendor Id" id="vendor-id" />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField
                type="email"
                fullWidth
                label="Email"
                id="email"
                value={data?.attributes?.accountHolder?.email || ""}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField fullWidth label="Phone Number" id="phone-number" />
            </Grid>

            <Grid xs={12} md={6}>
              <TextField fullWidth label="Paybill type" id="paybill-type" />
            </Grid>

            <Grid xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label" size="small">
                  Status
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Status"
                  value=""
                >
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
