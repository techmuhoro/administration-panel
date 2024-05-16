"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary
  //   AccordionActions
} from "@/components/merchants/detail/ui";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import InfoStack from "../info-stack";

export default function StagingAccountHolder({ data }) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary aria-controls="panel1-content" id="panel1-header">
        <Stack direction="row" columnGap={2}>
          <Typography>Account Holder</Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid xs={12} md={4}>
            <InfoStack title="Firstname" content={data?.firstName} />
          </Grid>
          <Grid xs={12} md={4}>
            <InfoStack title="Lastname" content={data?.lastName} />
          </Grid>
          <Grid xs={12} md={4}>
            <InfoStack title="Email" content={data?.email} />
          </Grid>
          <Grid xs={12} md={4}>
            <InfoStack title="Phone" content={data?.phone} />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoStack title="Account Type" content={data?.accountType} />
          </Grid>
          <Grid xs={12} md={4}>
            <InfoStack title="Acount Service" content={data?.accountService} />
          </Grid>
          <Grid xs={12} md={4}>
            <InfoStack
              title="Account Holder Role"
              content={data?.accountHolderRole}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
