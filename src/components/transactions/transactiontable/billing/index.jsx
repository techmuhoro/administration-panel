import ReusableTable from "@/atoms/reusable-table";
export default function Billing({
  columns,
  data,
  count,
  currentPage,
  rowsPerPage,
  totalPages,
}) {
  return (
    <ReusableTable
      columns={columns}
      data={data}
      count={count}
      currentPage={currentPage}
      rowsPerPage={rowsPerPage}
      totalPages={totalPages}
    />
  );
}
