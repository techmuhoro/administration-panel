import RolesAdd from "@/components/uam/roles/add";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import {
  getSystemPermissions,
  getSystemDepartments,
} from "../../serverRequests";

export default async function Page() {
  const [permissions, departments] = await Promise.all([
    getSystemPermissions(),
    getSystemDepartments(),
  ]);

  return (
    <DashboardContentWrapper>
      <RolesAdd permissions={permissions} departments={departments} />
    </DashboardContentWrapper>
  );
}
