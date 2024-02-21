import RolesUpdate from "@/components/uam/roles/update";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { getSystemDepartments, getRole } from "@/app/dashboard/(uam)/api";

export default async function Page({ params }) {
  const url = `${BASE_URL}roles/${params.id}`;
  const departmentsUrl = `${BASE_URL}departments/system/`;
  const token = cookies().get("token").value;

  const getRolePromise = getRole(url, token);
  const getDepartmentsPromise = getSystemDepartments(departmentsUrl, token);

  const [roleData, departmentsData] = await Promise.all([
    getRolePromise,
    getDepartmentsPromise,
  ]);

  const role = roleData?.data?.data;
  const departments = departmentsData?.data?.data || [];

  return (
    <DashboardContentWrapper breadcrumbOmit={["update"]}>
      <RolesUpdate role={role} departments={departments} />
    </DashboardContentWrapper>
  );
}
