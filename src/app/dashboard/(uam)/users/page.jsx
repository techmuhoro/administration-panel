import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import UsersList from "@/components/uam/users";
import { BASE_URL, DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";
import { convertToNumber, filterObject } from "@/lib/utils";
import { cookies } from "next/headers";
//import axiosInstance from "@/apis";
async function getUsers(url, token) {
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

const filtersWhiteList = ["name", "email", "phone", "role"];

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

  const url = `${BASE_URL}users?${queryString}`;
  const authToken = cookies().get("token").value;

  const { data } = await getUsers(url, authToken);

  const users = data?.data?.data || [];
  const count = data?.data?.total || -1;
  const totalPages = count > 0 ? Number(count) / rowsPerPage : 1;

  return (
    <DashboardContentWrapper breadcrumbOmit={["uam"]}>
      <UsersList
        data={users}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        count={count}
      />
    </DashboardContentWrapper>
  );
}
