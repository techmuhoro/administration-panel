import RolesUpdate from "@/components/uam/roles/update";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { getSystemDepartments, getRole } from "../../../serverRequests";
import http from "@/http";

export default async function Page({ params }) {
  const [departments, role] = await Promise.all([
    getSystemDepartments(),
    getRole(params.id),
  ]);

  return (
    <DashboardContentWrapper breadcrumbOmit={["update"]}>
      <RolesUpdate role={role} departments={departments} />
    </DashboardContentWrapper>
  );
}
