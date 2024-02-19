import RolesList from "@/components/uam/roles/list";
import { getRoles, getRolesCount } from "@/demo-db/role";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { BASE_URL, DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";
import { convertToNumber, filterObject } from "@/lib/utils";
import { redirect } from "next/navigation";
import { cache } from "react";

async function getUser() {
  // refresh
}

const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJ7XCJpZFwiOlwidHl1aW9vamhnNjc4OVwifSIsImlhdCI6MTcwODA3NzcxNiwiZXhwIjoxNzA4MTA2NTE2fQ.9Py3LLg7HerSqSNe5biv8ehK7fkCWINJA0MHIYLbW9E`;

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

  console.log(queryString);

  const url = `${BASE_URL}roles?${queryString}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  const roles = data?.data?.data || [];

  const count = data?.data?.total || -1;

  const totatlPages = count > 0 ? Number(count) / rowsPerPage : 1;

  return (
    <DashboardContentWrapper breadcrumbOmit={["uam"]}>
      <RolesList
        data={roles}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalPages={totatlPages}
        count={count}
      />
    </DashboardContentWrapper>
  );
}
