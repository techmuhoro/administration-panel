import RolesAdd from "@/components/uam/roles/add";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { BASE_URL } from "@/lib/constants";

async function getDepartments(authToken) {
  const url = `${BASE_URL}departments/system/`;
  console.log(url);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const data = await response.json();

  return data;
}

async function getPermissions(authToken) {
  const url = `${BASE_URL}permissions/system/`;
  console.log(url);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const data = await response.json();

  return data;
}

const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJ7XCJpZFwiOlwidHl1aW9vamhnNjc4OVwifSIsImlhdCI6MTcwODA3NzcxNiwiZXhwIjoxNzA4MTA2NTE2fQ.9Py3LLg7HerSqSNe5biv8ehK7fkCWINJA0MHIYLbW9E`;

export default async function Page() {
  const departmentsData = await getDepartments(token);
  const permissionsData = await getPermissions(token);

  const departments = departmentsData.data;
  const permissions = permissionsData.data;

  return (
    <DashboardContentWrapper>
      <RolesAdd permissions={permissions} departments={departments} />
    </DashboardContentWrapper>
  );
}
