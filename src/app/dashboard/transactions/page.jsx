import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import TransactionsList from "@/components/transactions/list";
import { convertToNumber, filterObject } from "@/lib/utils";
import { DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";
import { getTransactions, getTransactionsCount } from "@/demo-db/transactions";
import { withAuth } from "@/app/auth/with-auth";

const filtersWhiteList = ["customer", "transaction_id", "amount", "category"];
const breadcrumbItems = [
  { label: "Transactions", to: "/dashbaord/transactions" },
  { label: "Listing" },
];

export default async function Page({ searchParams }) {
  withAuth();
  const { page, rows, ...filters } = searchParams;
  const currentPage = convertToNumber(page) ? convertToNumber(page) : 1;
  const rowsPerPage = convertToNumber(rows)
    ? convertToNumber(rows)
    : DEFAULT_ROWS_PER_PAGE;

  const where = filterObject(filters, filtersWhiteList);

  /** Similar to make a network request */
  const transactionsPromise = getTransactions({
    take: rowsPerPage,
    skip: (currentPage - 1) * rowsPerPage,
    where,
  });

  const countPromise = getTransactionsCount(where);

  const [count, transactions] = await Promise.all([
    countPromise,
    transactionsPromise,
  ]);

  const totalPages = Number(count) / rowsPerPage;

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
