"use client";

import { useState } from "react";

// material
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import StyledContentWrapper from "@/atoms/wrappers/styled-content-wrapper";

// accordions
import AccountHolder from "./functions/account-holder";
import BusinessInformation from "./functions/business-infomartion";
import BusinessLocation from "./functions/business-location";
import BankDetails from "./functions/bank-details";
import Directors from "./functions/directors";
// assests

export default function MerchantsDetail({ data }) {
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
          <>
            {/** Each of the component below returns an accordion */}
            <AccountHolder
              expanded={expanded === "account-holder"}
              handleExpandedChange={handleChange("account-holder")}
              data={data?.accountHolderInformation}
            />

            <BusinessInformation
              expanded={expanded === "business-information"}
              handleExpandedChange={handleChange("business-information")}
              data={data?.businessInformation}
            />

            <BusinessLocation
              expanded={expanded === "business-location"}
              handleExpandedChange={handleChange("business-location")}
              data={data?.attributes?.locationInformation}
            />

            <BankDetails
              expanded={expanded === "bank-details"}
              handleExpandedChange={handleChange("bank-details")}
              data={data?.attributes?.bankInformation}
            />

            <Directors
              expanded={expanded === "directors"}
              handleExpandedChange={handleChange("directors")}
              data={data?.attributes?.directorInformation}
            />
          </>
        </StyledContentWrapper>
      </Box>
    </Box>
  );
}
