import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SpeedIcon from "@mui/icons-material/Speed";
import Link from "next/link";

export default function DashboardContentWrapper({ children, breadcrumbItems }) {
  return (
    <Box sx={{ p: 2 }}>
      <BreadcrumbsComponent items={breadcrumbItems} />
      <Box sx={{ mb: 1.5 }} />
      {children}
    </Box>
  );
}

function BreadcrumbsComponent({ items }) {
  return (
    <Breadcrumbs separator=">">
      <Link href={"/dashboard"}>
        <Stack
          component="p"
          direction="row"
          alignItems="center"
          columnGap={0.5}
        >
          <DashboardIcon fontSize="small" sx={{}} />
          Dashboard
        </Stack>
      </Link>
      {items?.map(({ label, to }) =>
        to ? (
          <Link key={label} href={to}>
            {label}
          </Link>
        ) : (
          <Typography key={to}>{label}</Typography>
        )
      )}
    </Breadcrumbs>
  );
}
