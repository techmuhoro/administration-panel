import Typography from "@mui/material/Typography";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";

export default function Page() {
  return (
    <DashboardContentWrapper breadcrumbItems={[]}>
      <Typography>This is the dahboard page</Typography>
      <p>This is the dahboard page</p>
    </DashboardContentWrapper>
  );
}
