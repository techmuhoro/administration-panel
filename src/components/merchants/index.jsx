"use client";

import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import StagingMerchants from "./stagingMerchants";
import OnboardingMerchants from "./onboardingMerchants";
import ApprovedMerchants from "./approvedMerchants";

function Merchants({ data }) {
  const [activeTab, setActiveTab] = useState("staging-merchants");
  // -staging-merchants -onboarding-merchants -approved-merchants

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <DashboardContentWrapper>
      <Typography variant="h5">Merchantssss...</Typography>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="merchant listing tabs">
              <Tab label="Staging" value="staging-merchants" />
              <Tab label="Onboarding" value="onboarding-merchants" />
              <Tab label="Approved" value="approved-merchants" />
            </TabList>
          </Box>

          <TabPanel value="staging-merchants">
            <StagingMerchants data={data} />
          </TabPanel>
          <TabPanel value="onboarding-merchants">
            <OnboardingMerchants data={data} />
          </TabPanel>
          <TabPanel value="approved-merchants">
            <ApprovedMerchants data={data} />
          </TabPanel>
        </TabContext>
      </Box>
    </DashboardContentWrapper>
  );
}

export default Merchants;
