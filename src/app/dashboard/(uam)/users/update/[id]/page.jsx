import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import UpdateUser from "@/components/uam/users/update";
import {
  getSystemDepartments,
  getSystemRoles,
  getUser,
} from "../../../serverRequests";

export default async function Page({ params }) {
  const [departments, roles, user] = await Promise.all([
    getSystemDepartments(),
    getSystemRoles(),
    getUser(params.id),
  ]);

  return (
    <DashboardContentWrapper breadcrumbOmit={["update"]}>
      <UpdateUser data={roles} derp={departments} userData={user} />
    </DashboardContentWrapper>
  );
}
