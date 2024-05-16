"use client";

import { useState } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import http from "@/http";

// material
import Box from "@mui/material/Box";
import LoadingButton from "@/atoms/loading-button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import StyledContentWrapper from "@/atoms/wrappers/styled-content-wrapper";

// accordions
import AccountHolder from "./functions/account-holder";
import BusinessInformation from "./functions/business-infomartion";
import BusinessLocation from "./functions/business-location";
import BankDetails from "./functions/bank-details";
import Directors from "./functions/directors";

// staging accordions
import StagingAccountHolder from "./functions/staging/account-holder";
import StagingBusinessInformation from "./functions/staging/business-information";

export default function MerchantsDetail({ data, utils }) {
  const [expanded, setExpanded] = useState("");
  const [acceptLoading, setAcceptLoading] = useState(false);
  const setAlertMessage = useNotifyAlertCtx();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id: merchantId } = useParams();
  const merchantStatus = searchParams.get("ms") || "";

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // render different status depending on merchant status
  const titileLookUp = {
    staging: "Registration Details",
    "on-boarding": "Merchant Onboarding",
    approved: "Merchant Details"
  };

  /**
   * Handle moving merchants from staging to on-boarding
   */

  const handleStartOnboarding = async () => {
    try {
      setAcceptLoading(true);
      await http({
        url: `/merchants/staging/approve/${merchantId}`,
        method: "PATCH",
        includeAuthorization: true
      });

      const msg = "Approved successfully!";
      setAlertMessage(msg, { openDuration: 3000, type: "success" });

      // move to the onboarding stage
      router.push(`/dashboard/merchants/detail/${merchantId}?ms=on-boarding`);
    } catch (error) {
      const msg =
        error?.httpMessage || "Error! could not start onboaring merchant.";
      setAlertMessage(msg, { openDuration: 3000, type: "error" });
    } finally {
      setAcceptLoading(false);
    }
  };

  return (
    <Box>
      <Typography component="h1" variant="h5" mb={1}>
        {titileLookUp[merchantStatus]}
      </Typography>

      <Box sx={{ mb: 2 }} />

      <Box>
        <StyledContentWrapper sx={{ p: 3 }}>
          {merchantStatus === "staging" ? (
            <Box>
              <Box mb={4}>
                <StagingAccountHolder
                  // expanded={expanded === "staging-account-holder"}
                  expanded
                  // handleExpandedChange={handleChange("staging-account-holder")}
                  data={data?.attributes?.accountHolderInformation}
                />

                <StagingBusinessInformation
                  // expanded={expanded === "staging-business-information"}
                  expanded
                  data={data?.attributes?.businessInformation}
                />
              </Box>

              <Stack direction="row" justifyContent="flex-end">
                <LoadingButton
                  variant="contained"
                  type="button"
                  loading={acceptLoading}
                  onClick={handleStartOnboarding}
                >
                  Start Onboarding
                </LoadingButton>
              </Stack>
            </Box>
          ) : (
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
                data={data?.attributes?.businessInformation}
                utils={utils}
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
          )}
        </StyledContentWrapper>
      </Box>
    </Box>
  );
}
