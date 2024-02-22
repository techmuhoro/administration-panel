import RolesAdd from "@/components/uam/roles/add";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import {
  getSystemDepartments,
  getSystemPermissions,
} from "@/app/dashboard/(uam)/api";

export default async function Page() {
  const authToken = cookies().get("token").value;
  const permissionsUrl = `${BASE_URL}permissions/system/`;
  const departmentsUrl = `${BASE_URL}departments/system/`;

  const departmentsPromise = getSystemDepartments(departmentsUrl, authToken);
  const permissionsPromise = getSystemPermissions(permissionsUrl, authToken);

  const [departmentsData, permissionsData] = await Promise.all([
    departmentsPromise,
    permissionsPromise,
  ]);

  const departments = departmentsData?.data?.data || [];
  const permissions = permissionsData?.data?.data || [];

  return (
    <DashboardContentWrapper>
      <RolesAdd permissions={permissions} departments={departments} />
    </DashboardContentWrapper>
  );
}
