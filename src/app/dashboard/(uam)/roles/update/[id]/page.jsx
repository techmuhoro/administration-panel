import RolesUpdate from "@/components/uam/roles/update";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";

async function getRole(url, token) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return {
    data,
    response,
    isError: !response.status.toString().startsWith("2"),
  };
}

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

export default async function Page({ params }) {
  const url = `${BASE_URL}roles/${params.id}`;
  const departmentsUrl = `${BASE_URL}departments/system/`;
  const token = cookies().get("token").value;

  const getRolePromise = getRole(url, token);
  const getDepartmentsPromise = getDepartments(departmentsUrl, token);

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
