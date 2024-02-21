import PermissionsList from "@/components/uam/permissions/list";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { convertToNumber, filterObject } from "@/lib/utils";
import { DEFAULT_ROWS_PER_PAGE, BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";

async function getPermissions(url, token) {
  console.log(url);
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

const filtersWhiteList = ["name", "parentName", "slug"];

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

  const url = `${BASE_URL}permissions?${queryString}`;
  const authToken = cookies().get("token").value;

  const { data } = await getPermissions(url, authToken);

  const permissions = data?.data?.data || [];
  const count = data?.data?.total || -1;
  const totalPages = count > 0 ? Math.ceil(Number(count) / rowsPerPage) : 1;

  return (
    <DashboardContentWrapper>
      <PermissionsList
        data={permissions}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        count={count}
      />
    </DashboardContentWrapper>
  );
}
