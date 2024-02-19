import Link from "next/link";
import ReusableTable from "@/atoms/reusable-table";
import { Box, Stack } from "@mui/material";
import { columns } from "./list/columns";
import AddNew from "@/atoms/button/add-new";

export default function UsersList({
  data,
  count,
  currentPage,
  rowsPerPage,
  totalPages,
}) {
  return (
    <Box>
      <Stack sx={{ mb: 1 }}>
        <Link href={"/dashboard/users/add"}>
          <AddNew text={"add user"} />
        </Link>{" "}
      </Stack>

      <ReusableTable
        columns={columns}
        data={data}
        count={6}
        currentPage={7}
        rowsPerPage={2}
        totalPages={3}
      />
    </Box>
  );
}
