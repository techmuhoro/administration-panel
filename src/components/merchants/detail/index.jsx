"use client";
import { useState } from "react";

// material
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AccordionActions from "@mui/material/AccordionActions";
import { Accordion, AccordionDetails, AccordionSummary } from "./ui";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import StyledContentWrapper from "@/atoms/wrappers/styled-content-wrapper";
// assests

export default function MerchantsOnboard() {
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box>
      <Typography component="h1" variant="h5" mb={1}>
        Merchant Onboarding
      </Typography>

      <Box sx={{ mb: 2 }} />

      <Box>
        <StyledContentWrapper sx={{ p: 3 }}>
          <Stack direction="column">
            <Accordion
              expanded={expanded === "general"}
              onChange={handleChange("general")}
            >
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
              >
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
                      />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        id="phone-number"
                      />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Paybill type"
                        id="paybill-type"
                      />
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

            <Accordion
              expanded={expanded === "reg"}
              onChange={handleChange("reg")}
            >
              <AccordionSummary
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Stack direction="row" columnGap={2}>
                  <Typography>Registration Details</Typography>
                  <Chip
                    label="55% complete"
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "kyc"}
              onChange={handleChange("kyc")}
            >
              <AccordionSummary
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Stack direction="row" columnGap={2}>
                  <Typography>KYC Documents</Typography>
                  <Chip
                    label="12% complete"
                    color="error"
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
              <AccordionActions>
                <Button>Cancel</Button>
                <Button>Agree</Button>
              </AccordionActions>
            </Accordion>

            <Accordion
              expanded={expanded === "contracts"}
              onChange={handleChange("contracts")}
            >
              <AccordionSummary
                aria-controls="panel4-content"
                id="panel4-header"
              >
                <Stack direction="row" columnGap={2}>
                  <Typography>Contracts</Typography>
                  <Chip
                    label="0% complete"
                    color="error"
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "bank"}
              onChange={handleChange("bank")}
            >
              <AccordionSummary
                aria-controls="panel5-content"
                id="panel5-header"
              >
                <Stack direction="row" columnGap={2}>
                  <Typography>Bank Details</Typography>
                  <Chip
                    label="0% complete"
                    color="error"
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "tarrifs"}
              onChange={handleChange("tarrifs")}
            >
              <AccordionSummary
                aria-controls="panel6-content"
                id="panel6-header"
              >
                <Stack direction="row" columnGap={2}>
                  <Typography>Tarrifs</Typography>
                  <Chip
                    label="0% complete"
                    color="error"
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "sub"}
              onChange={handleChange("sub")}
            >
              <AccordionSummary
                aria-controls="panel7-content"
                id="panel7-header"
              >
                <Stack direction="row" columnGap={2}>
                  <Typography>Sub Accounts</Typography>
                  <Chip
                    label="0% complete"
                    color="error"
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "account"}
              onChange={handleChange("account")}
            >
              <AccordionSummary
                aria-controls="panel7-content"
                id="panel7-header"
              >
                <Stack direction="row" columnGap={2}>
                  <Typography>Account Configuration</Typography>
                  <Chip
                    label="0% complete"
                    color="error"
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
          </Stack>
        </StyledContentWrapper>
      </Box>
    </Box>
  );
}
