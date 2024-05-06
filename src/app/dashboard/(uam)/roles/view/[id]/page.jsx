import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { getRole } from "@/app/dashboard/(uam)/api";
import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import RoleView from "@/components/uam/roles/view";
import http from "@/http";

export default async function Page({ params }) {
  let role = null;
  let errorFeed = "";

  try {
    const response = await http({
      url: `/roles/${params.id}`,
      includeAuthorization: true,
    }).then((res) => res.data);

    role = response.data || null;
  } catch (error) {
    errorFeed = error?.httpMessage || "Error! Could not fetch role.";
  }

  return (
    <DashboardContentWrapper breadcrumbOmit={["view"]}>
      <RoleView role={role} errorFeed={errorFeed} />
    </DashboardContentWrapper>
  );
}
