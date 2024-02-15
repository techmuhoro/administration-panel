"use client";

import Box from "@mui/material/Box";
import BreadcrumbsComponent from "./breadcrumbs-component";

export default function DashboardContentWrapper({
  children,
  breadcrumbItems,
  breadcrumbOmit,
}) {
  return (
    <Box sx={{ p: 2 }}>
      <BreadcrumbsComponent items={breadcrumbItems} omit={breadcrumbOmit} />
      <Box sx={{ mb: 1.5 }} />
      {children}
    </Box>
  );
}
