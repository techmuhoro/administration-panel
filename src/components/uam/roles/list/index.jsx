import ReusableTable from "@/atoms/reusable-table";
import RolesFilter from "./filter";
import RolesExport from "./export";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import AddIcon from "@mui/icons-material/Add";

import { columns } from "./columns";

export default function RolesList({
  data,
  count,
  currentPage,
  rowsPerPage,
  totalPages,
}) {
  return (
    <Box>
      <Typography component="h1" variant="h5" mb={1}>
        Roles
      </Typography>

      {/** Actions buttons */}
      <Stack direction={"row"} mb={1}>
        <Link href={"/dashboard/roles/add"}>
          <Button startIcon={<AddIcon />} variant="contained">
            New
          </Button>
        </Link>

        <Stack direction="row" sx={{ ml: "auto" }} columnGap={1}>
          <RolesFilter />
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
