"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TextField from "@mui/material/TextField";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { convertStringSearchParamsToObj } from "@/lib/utils";
import { DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";

export default function PermissionsFilter() {
  return (
    <>
      <Stack direction="row" alignItems="center" columnGap={1}>
        <Typography variant="body2">0 Applied filters</Typography>
        <Button
          startIcon={<FilterAltIcon />}
          variant="outlined"
          size="small"
          //   onClick={handleClick}
        >
          Filter
        </Button>

        <Button
          startIcon={<FilterAltOffIcon />}
          variant="outlined"
          size="small"
          //   onClick={handleClearFilters}
        >
          Clear
        </Button>
      </Stack>
    </>
  );
}
