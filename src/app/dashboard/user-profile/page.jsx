import { Typography } from "@mui/material";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import UserProfile from "@/components/user-profile";
export default function Page() {
  return (
    <DashboardContentWrapper breadcrumbItems={[]}>
      <UserProfile />
    </DashboardContentWrapper>
  );
}
