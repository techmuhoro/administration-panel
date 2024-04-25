import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import TransactionsList from "@/components/transactions/list";
import { convertToNumber, filterObject } from "@/lib/utils";
import { getTransactions, getTransactionsCount } from "@/demo-db/transactions"; //remove this import
import { BASE_URL, DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";
import { cookies } from "next/headers";

async function getUsers(url, token) {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return {
      data,
      error: false, // return response with ok no error
    };
  } catch (error) {
    // Handle network errors
    return {
      data: null,
      error: true,
      errorMessage: error.message,
    };
  }
}

const filtersWhiteList = ["vid", "country", "amount", "op"];
const breadcrumbItems = [
  { label: "Transactions", to: "/dashbaord/transactions" },
  { label: "Listing" },
];

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

  const url = `${BASE_URL}transactions?${queryString}`;
  const authToken = cookies().get("token").value;

  //NOTE: We've only passed api path, since baseURL is already configured when using `http` axios instance
  const { data, errorMessage, error } = await getUsers(url, authToken);

  const transactions = data?.data?.data || [];
  const count = data?.data?.total || -1;
  const totalPages = count > 0 ? Number(count) / rowsPerPage : 1;

  let errors = {
    errorMessage: errorMessage,
    error: error,
  };

  console.log(transactions, "this are transactions");
  return (
    <DashboardContentWrapper breadcrumbItems={breadcrumbItems}>
      <TransactionsList
        data={transactions}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        count={count}
      />
    </DashboardContentWrapper>
  );
}
