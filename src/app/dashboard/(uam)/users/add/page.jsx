import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import AddUser from "@/components/uam/users/add";
import { getSystemDepartments, getSystemRoles } from "../../serverRequests";

export default async function Page() {
  const [departments, roles] = await Promise.all([
    getSystemDepartments(),
    getSystemRoles(),
  ]);

  return (
    <DashboardContentWrapper>
      <AddUser data={roles} derp={departments} />
    </DashboardContentWrapper>
  );
}
