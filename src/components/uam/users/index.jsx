"use client";
import Link from "next/link";
import ReusableTable from "@/atoms/reusable-table";
import { Box, Stack } from "@mui/material";
import { columns } from "./list/columns";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import MuiAlert from "@/atoms/MuiAlert";
import AddNew from "@/atoms/button/add-new";
import Alert from "@mui/material/Alert";

export default function UsersList({
  errorDetails,
  data,
  count,
  currentPage,
  rowsPerPage,
  totalPages,
}) {
  return (
    <Box>
      {errorDetails.error ? (
        <MuiAlert message={errorDetails.errorMessage} variant={"error"} />
      ) : null}
      <Stack sx={{ mb: 1 }}>
        <Link href={"/dashboard/users/add"}>
          <AddNew text={"add user"} />
        </Link>
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
