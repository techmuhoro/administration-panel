"use client";
import {
  useSearchParams,
  usePathname,
  redirect,
  useRouter,
} from "next/navigation";
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
import { convertStringSearchParamsToObj, convertToNumber } from "@/lib/utils";

export default function TablePagination({
  currentPage,
  count,
  totalPages,
  rowsPerPage,
}) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  totalPages = Math.ceil(totalPages);

  function handleRowsPerPageChange(value) {
    // maintain the existing query params
    const existingParams = convertStringSearchParamsToObj(params.toString());
    const newParams = {
      rows: value,
      page: 1, // reset page back to one
    };

    const queryParams = new URLSearchParams({
      ...existingParams,
      ...newParams,
    }).toString();

    const url = `${pathname}/?${queryParams}`;

    router.push(url);
  }

  function getPaginationLabel() {
    const start = (currentPage - 1) * rowsPerPage + 1;
    const end = currentPage * rowsPerPage;
    return `${start} - ${end > count ? count : end} of ${count}`;
  }

  function getPaginationLink(page) {
    page = convertToNumber(page) || 1;

    // maintain the query params that may exist on the url
    const existingParams = convertStringSearchParamsToObj(params.toString());
    const newParams = {
      page,
    };

    const queryParams = new URLSearchParams({
      ...existingParams,
      ...newParams,
    }).toString();

    return `${pathname}/?${queryParams}`;
  }
  const disabledLink = {
    pointerEvents: "none",
  };
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

        <select
          defaultValue={rowsPerPage || DEFAULT_ROWS_PER_PAGE}
          onChange={(event) => handleRowsPerPageChange(event.target.value)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
      </Stack>

      <Stack direction="row" alignItems="center" columnGap={1.5}>
        <Stack direction="row">
          <Link
            style={currentPage <= 1 ? { ...disabledLink } : {}}
            href={getPaginationLink(1)}
          >
            <IconButton disabled={currentPage <= 1}>
              <FirstPageIcon />
            </IconButton>
          </Link>
          <Link
            href={getPaginationLink(currentPage - 1)}
            style={currentPage <= 1 ? { ...disabledLink } : {}}
          >
            <IconButton disabled={currentPage <= 1}>
              <ChevronLeftIcon />
            </IconButton>
          </Link>
        </Stack>
        <Box>
          <Typography> {getPaginationLabel()}</Typography>
        </Box>
        <Stack direction="row">
          <Link
            href={getPaginationLink(currentPage + 1)}
            style={currentPage >= totalPages ? { ...disabledLink } : {}}
          >
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </Link>

          <Link
            href={getPaginationLink(totalPages)}
            style={currentPage >= totalPages ? { ...disabledLink } : {}}
          >
            <IconButton disabled={currentPage >= totalPages}>
              <LastPageIcon />
            </IconButton>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}
