"use client";
import { useState } from "react";

// material
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import StyledContentWrapper from "@/atoms/wrappers/styled-content-wrapper";

// accordions
import GeneralInformation from "./functions/general-information";
import RegistrationDetails from "./functions/registration-details";
import KYCDocuments from "./functions/kyc-documents";
import BankDetails from "./functions/bank-details";
import Contracts from "./functions/contracts";
// assests

export default function MerchantsDetail({ data, errorFeed }) {
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
            <GeneralInformation
              expanded={expanded === "general"}
              handleExpandedChange={handleChange("general")}
              data={data}
            />

            <RegistrationDetails
              expanded={expanded === "reg"}
              handleExpandedChange={handleChange("reg")}
            />

            <KYCDocuments
              expanded={expanded === "kyc"}
              handleExpandedChange={handleChange("kyc")}
            />

            <BankDetails
              expanded={expanded === "bank"}
              handleExpandedChange={handleChange("bank")}
            />

            <Contracts
              expanded={expanded === "contracts"}
              handleExpandedChange={handleChange("contracts")}
            />
          </>
        </StyledContentWrapper>
      </Box>
    </Box>
  );
}
