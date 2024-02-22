import PermissionsAdd from "@/components/uam/permissions/add";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { BASE_URL } from "@/lib/constants";
import Box from "@mui/material/Box";
import { getSystemPermissions } from "@/app/dashboard/(uam)/api";

import { cookies } from "next/headers";

export default async function Page() {
  const token = cookies().get("token").value;
  const url = `${BASE_URL}permissions/system/`;

  const { data } = await getSystemPermissions(url, token);

  const categories = data?.data || [];

  return (
    <DashboardContentWrapper>
      <PermissionsAdd categories={categories} />
    </DashboardContentWrapper>
  );
}
