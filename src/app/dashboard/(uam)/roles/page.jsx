import { cookies } from "next/headers";
import RolesList from "@/components/uam/roles/list";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { BASE_URL, DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";
import { convertToNumber, filterObject } from "@/lib/utils";

async function getRoles(url, token) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return {
    data,
    error: !response.status.toString().startsWith("2"), // boolean of whether the was an error or not,
  };
}

const filtersWhiteList = ["role", "department", "description", "createdBy"];

export default async function Page({ searchParams }) {
  const { page, rows, ...filters } = searchParams;
  const currentPage = convertToNumber(page) ? convertToNumber(page) : 1;
  const rowsPerPage = convertToNumber(rows)
    ? convertToNumber(rows)
    : DEFAULT_ROWS_PER_PAGE;

  const applicableFilters = filterObject(filters, filtersWhiteList);

  const queryString = new URLSearchParams({
    ...applicableFilters,
    page: currentPage,
    limit: rowsPerPage,
  }).toString();

  const url = `${BASE_URL}roles?${queryString}`;
  const authToken = cookies().get("token").value;

  const { data } = await getRoles(url, authToken);

  const roles = data?.data?.data || [];
  const count = data?.data?.total || -1;
  const totalPages = count > 0 ? Math.ceil(Number(count) / rowsPerPage) : 1;

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
