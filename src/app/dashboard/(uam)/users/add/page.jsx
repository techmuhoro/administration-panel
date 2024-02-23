import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import AddUser from "@/components/uam/users/add";
import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { getRole, getSystemDepartments } from "@/app/dashboard/(uam)/api";

export default async function Page() {
  const roleUrl = `${BASE_URL}roles`;
  const departmentUrl = `${BASE_URL}departments`;
  const authToken = cookies().get("token").value;

  const departmentsPromise = getSystemDepartments(departmentUrl, authToken);
  const rolePromise = getRole(roleUrl, authToken);

  const [departmentsData, roleData] = await Promise.all([
    departmentsPromise,
    rolePromise,
  ]);

  const departments = departmentsData?.data?.data || [];
  const roles = roleData?.data?.data || [];

  return (
    <DashboardContentWrapper>
      <AddUser data={roles} derp={departments} />
    </DashboardContentWrapper>
  );
}


