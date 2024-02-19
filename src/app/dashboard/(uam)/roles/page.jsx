import RolesList from "@/components/uam/roles/list";
import { getRoles, getRolesCount } from "@/demo-db/role";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";
import { convertToNumber, filterObject } from "@/lib/utils";
import { redirect } from "next/navigation";
import { cache } from "react";

async function getUser() {
  // refresh
}

const filtersWhiteList = ["role", "department", "description", "createdBy"];
const breadcrumbItems = [
  {
    label: "Roles",
  },
];

export default async function Page({ searchParams }) {
  const { page, rows, ...filters } = searchParams;
  const currentPage = convertToNumber(page) ? convertToNumber(page) : 1;
  const rowsPerPage = convertToNumber(rows)
    ? convertToNumber(rows)
    : DEFAULT_ROWS_PER_PAGE;

  const where = filterObject(filters, filtersWhiteList);

  const rolesPromise = getRoles({
    take: rowsPerPage,
    skip: (currentPage - 1) * rowsPerPage,
    where,
  });

  const countPromise = getRolesCount(where);

  const [count, roles] = await Promise.all([countPromise, rolesPromise]);

  const totalPages = Number(count) / rowsPerPage;

  return (
    <DashboardContentWrapper breadcrumbOmit={["uam"]}>
      <RolesList
        data={roles}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        count={count}
      />
    </DashboardContentWrapper>
  );
}
