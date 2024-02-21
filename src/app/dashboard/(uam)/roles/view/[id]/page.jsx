import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { getRole } from "@/app/dashboard/(uam)/api";
import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import RoleView from "@/components/uam/roles/view";

export default async function Page({ params }) {
  const url = `${BASE_URL}roles/${params.id}`;
  const authToken = cookies().get("token").value;

  const { data, isError } = await getRole(url, authToken);

  const role = data?.data || {};

  return (
    <DashboardContentWrapper breadcrumbOmit={["view"]}>
      <RoleView role={role} />
    </DashboardContentWrapper>
  );
}
