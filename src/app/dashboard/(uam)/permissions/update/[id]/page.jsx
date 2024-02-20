import PermissionUpdate from "@/components/uam/permissions/update";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";

export default function Page({ params }) {
  console.log(params);
  return (
    <DashboardContentWrapper breadcrumbOmit={["update"]}>
      <PermissionUpdate />
    </DashboardContentWrapper>
  );
}
