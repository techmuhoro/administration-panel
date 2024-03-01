import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import UpdateUser from "@/components/uam/users/update";
import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { getUsers, getSystemDepartments, getRole } from "../../api";

export default async function Page({ searchParams }) {
  const { id } = searchParams;

  const Userurl = `${BASE_URL}users/${id}`;
  const roleUrl = `${BASE_URL}roles`;
  const departmentUrl = `${BASE_URL}departments`;
  const authToken = cookies().get("token").value;

  const departmentsPromise = getSystemDepartments(departmentUrl, authToken);
  const rolePromise = getRole(roleUrl, authToken);
  const userPromise = getUsers(Userurl, authToken);

  const [departmentsData, roleData, userData] = await Promise.all([
    departmentsPromise,
    rolePromise,
    userPromise,
  ]);

  const departments = departmentsData?.data?.data || [];
  const roles = roleData?.data?.data || [];
  const user = userData.data;

  return (
    <DashboardContentWrapper>
      <UpdateUser data={roles} derp={departments} userData={user} />
    </DashboardContentWrapper>
  );
}
