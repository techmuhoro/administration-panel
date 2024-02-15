import RolesUpdate from "@/components/uam/roles/update";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";

export default function Page() {
  return (
    <DashboardContentWrapper breadcrumbOmit={["update"]}>
      <RolesUpdate />
    </DashboardContentWrapper>
  );
}
