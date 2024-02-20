import RolesAdd from "@/components/uam/roles/add";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";

async function getDepartments(url, token) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return {
    data,
    response,
    error: !response.status.toString().startsWith("2"), // boolean of whether the was an error or not
  };
}

async function getPermissions(url, token) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return {
    data,
    error: !response.status.toString().startsWith("2"), // bool. whether there was an error or not
  };
}

export default async function Page() {
  const authToken = cookies().get("token").value;
  const permissionsUrl = `${BASE_URL}permissions/system/`;
  const departmentsUrl = `${BASE_URL}departments/system/`;

  const departmentsPromise = getDepartments(departmentsUrl, authToken);
  const permissionsPromise = getPermissions(permissionsUrl, authToken);

  const [departmentsData, permissionsData] = await Promise.all([
    departmentsPromise,
    permissionsPromise,
  ]);

  const departments = departmentsData?.data?.data?.message || [];
  const permissions = permissionsData?.data?.data || [];

  return (
    <DashboardContentWrapper>
      <RolesAdd permissions={permissions} departments={departments} />
    </DashboardContentWrapper>
  );
}
