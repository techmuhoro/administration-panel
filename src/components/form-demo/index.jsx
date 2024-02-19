"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import CreateUserForm from "./create-user-form";
import CreateRoleForm from "./create-role-form";

export default function FormDemoTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: "medium", mb: 2 }}>
        Forms Demo
      </Typography>
      <Box sx={{ maxWidth: "500px", mx: "auto" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Create User" {...a11yProps("user")} />
              <Tab label="Create Role" {...a11yProps("role")} />
            </Tabs>

            <CustomTabPanel tab={0} activeTab={activeTab}>
              <CreateUserForm />
            </CustomTabPanel>
            <CustomTabPanel tab={1} activeTab={activeTab}>
              <CreateRoleForm />
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function a11yProps(activeTab) {
  return {
    id: `form-demo-tab-${activeTab}`,
    "aria-controls": `form-demo-tabpanel-${activeTab}`,
  };
}

function CustomTabPanel(props) {
  const { children, tab, activeTab, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tab !== activeTab}
      id={`form-tabpanel-${activeTab}`}
      aria-labelledby={`form-tab-${activeTab}`}
      {...other}
    >
      {tab === activeTab && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
