import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ReusableTable from "@/atoms/reusable-table";
import { columns } from "./columns";
import Link from "next/link";
import Button from "@mui/material/Button";

import AddIcon from "@mui/icons-material/Add";
import PermissionsFilter from "./filter";
import PermissionsExport from "./export";

export default function PermissionsList({
  data,
  count,
  currentPage,
  rowsPerPage,
  totalPages,
}) {
  return (
    <Box>
      <Typography component="h1" variant="h5" mb={1}>
        Permissions
      </Typography>

      <Stack direction={"row"} mb={1}>
        <Link href={"/dashboard/permissions/add"}>
          <Button startIcon={<AddIcon />} variant="contained">
            New
          </Button>
        </Link>

        <Stack direction="row" sx={{ ml: "auto" }} columnGap={1}>
          <PermissionsFilter />
          <PermissionsExport />
        </Stack>
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
