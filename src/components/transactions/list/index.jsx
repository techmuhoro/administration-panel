import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ReusableTable from "@/atoms/reusable-table/index";
import TransactionsFilter from "./filter";
import TransactionsExport from "./export";
import { columns } from "./columns";

export default function TransactionsList({
  data,
  count,
  currentPage,
  rowsPerPage,
  totalPages,
}) {
  return (
    <Box>
      <Typography component="h1" variant="h5">
        Transactions
      </Typography>

      <Stack direction="row" justifyContent={"flex-end"} columnGap={1} mb={1}>
        <TransactionsFilter />

        <TransactionsExport />
      </Stack>

      <ReusableTable
        columns={columns}
        data={data}
        count={count}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
      />
    </Box>
  );
}
