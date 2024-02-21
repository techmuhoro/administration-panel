import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import UpdateUserForm from "@/components/uam/users/update";
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
    error: !response.status.toString().startsWith("2"),
  };
}

const url = `${BASE_URL}roles`;
const authToken = cookies().get("token").value;

const { data } = await getRole(url, authToken);

let roles = data?.data?.data || [];

export default async function Page() {
  return (
    <DashboardContentWrapper>
      <p> update user details</p>
      {/* <UpdateUserForm data={roles} /> */}
    </DashboardContentWrapper>
  );
}
