import ReusableTable from "@/atoms/reusable-table";
import StyledContentWrapper from "@/atoms/wrappers/styled-content-wrapper";
import TransactionsFilter from "./filter";
import { Stack } from "@mui/system";
import { columns } from "./columns";
export default function PayingTable({
  data,
  count,
  currentPage,
  rowsPerPage,
  totalPages,
}) {
  return (
    <StyledContentWrapper sx={{ p: 3 }}>
      <Stack direction="row" justifyContent={"flex-end"} columnGap={1} mb={1}>
        <TransactionsFilter />
      </Stack>
      <ReusableTable
        columns={columns}
        data={data}
        count={count}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
      />
    </StyledContentWrapper>
  );
}
