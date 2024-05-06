import PermissionsAdd from "@/components/uam/permissions/add";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import http from "@/http";

export default async function Page() {
  let categories = [];
  let errorFeed = "";

  try {
    const response = await http({
      url: "/permissions/system/",
      includeAuthorization: true,
    }).then((res) => res.data);

    categories = response?.data || [];
  } catch (error) {
    errorFeed = error?.httpMessage || "Error! Could not fetch permissions";
  }

  return (
    <DashboardContentWrapper>
      <PermissionsAdd categories={categories} />
    </DashboardContentWrapper>
  );
}
