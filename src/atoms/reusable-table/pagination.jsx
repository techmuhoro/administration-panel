"use client";
import { useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FirstPageIcon from "@mui/icons-material/FirstPage";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Link from "next/link";

export default function TablePagination({
  currentPage,
  count,
  totalPages,
  rowsPerPage,
}) {
  console.log("currentPage", currentPage);
  const params = useSearchParams();

  function getPaginationLabel() {
    const start = (currentPage - 1) * rowsPerPage + 1;
    const end = currentPage * rowsPerPage;
    return `${start} - ${end} of ${count}`;
  }

  function getPaginationLink() {
    return "";
  }
  return (
    <Stack
      direction="row"
      columnGap={1}
      alignItems="center"
      justifyContent="flex-end"
      sx={{ mb: 1 }}
    >
      <Stack direction={"row"} columnGap={1}>
        <Typography>Rows:</Typography>

        <select defaultValue={DEFAULT_ROWS_PER_PAGE}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
      </Stack>

      <Stack direction="row" alignItems="center" columnGap={1.5}>
        <Stack direction="row">
          <Link href={getPaginationLink()}>
            <IconButton>
              <FirstPageIcon />
            </IconButton>
          </Link>
          <Link href={getPaginationLink()}>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </Link>
        </Stack>
        <Box>
          <Typography> {getPaginationLabel()}</Typography>
        </Box>
        <Stack direction="row">
          <Link href={getPaginationLink()}>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </Link>

          <Link href={getPaginationLink()}>
            <IconButton>
              <LastPageIcon />
            </IconButton>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}
