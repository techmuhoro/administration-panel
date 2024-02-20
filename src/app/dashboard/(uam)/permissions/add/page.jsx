import PermissionsAdd from "@/components/uam/permissions/add";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { BASE_URL } from "@/lib/constants";
import Box from "@mui/material/Box";

import { cookies, headers } from "next/headers";

async function getCategories(url, token) {
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

export default async function Page() {
  const token = cookies().get("token").value;
  const url = `${BASE_URL}permissions/system/`;

  const { data } = await getCategories(url, token);
  console.log(data);

  const categories = data?.data || [];

  return (
    <DashboardContentWrapper>
      <PermissionsAdd categories={categories} />
    </DashboardContentWrapper>
  );
}
