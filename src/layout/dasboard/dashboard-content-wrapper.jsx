import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SpeedIcon from "@mui/icons-material/Speed";
import Link from "next/link";

export default function DashboardContentWrapper(props) {
  return (
    <Box sx={{ p: 2 }}>
      <BreadcrumbsComponent />
      <Box sx={{ mb: 1.5 }} />
      {props.children}
    </Box>
  );
}

function BreadcrumbsComponent() {
  return (
    <Breadcrumbs>
      <Link href={"/dashboard"}>
        <Stack
          component="p"
          direction="row"
          alignItems="center"
          columnGap={0.5}
        >
          <DashboardIcon fontSize="small" sx={{ mt: -0.5 }} />
          Dashboard
        </Stack>
      </Link>
      <Typography>Transactions</Typography>
    </Breadcrumbs>
  );
}
