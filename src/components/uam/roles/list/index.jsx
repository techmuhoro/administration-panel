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

import { styled } from "@mui/material/styles";
import StyledContentWrapper from "@/atoms/wrappers/styled-content-wrapper";

// const StyldContentWrapper = styled(Box)(() => ({
//   backgroundColor: "white",
//   borderRadius: "5px",
//   border: "1px solid #e5e7eb",
// }));

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

      <StyledContentWrapper
        sx={{
          px: 3,
          py: 3,
        }}
      >
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
      </StyledContentWrapper>
    </Box>
  );
}
