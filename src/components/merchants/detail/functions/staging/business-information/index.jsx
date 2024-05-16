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

export default function StagingBusinessInformation({ data }) {
  const attributes = data?.attributes || {};
  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1-content" id="panel1-header">
        <Stack direction="row" columnGap={2}>
          <Typography>Business Information</Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid xs={12} md={4}>
            <InfoStack
              title="Business Name"
              content={attributes?.businessName}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoStack title="Brand Name" content={attributes?.brandName} />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoStack title="Description" content={attributes?.description} />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoStack
              title="Business Registration Status"
              content={attributes?.businessRegistrationStatus}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoStack
              title="Business Category"
              content={attributes?.industry}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoStack title="Sub Category" content={attributes?.subCategory} />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoStack title="Country" content={attributes?.country} />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoStack title="City" content={attributes?.city} />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoStack
              title="Physical Address"
              content={attributes?.physicalAddress}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoStack
              title="Postal Address"
              content={attributes?.postalAddress}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoStack title="Website" content={attributes?.website} />
          </Grid>

          <Grid xs={12} md={4}>
            <InfoStack title="Social" content={attributes?.social} />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
