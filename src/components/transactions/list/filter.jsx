"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Stack from "@mui/material/Stack";
import { convertStringSearchParamsToObj, filterObject } from "@/lib/utils";
import { DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";

export default function TransactionsFilter() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <Stack direction="row" alignItems="center" columnGap={1}>
        <Typography variant="body2">0 Applied filters</Typography>
        <Button
          startIcon={<FilterAltIcon />}
          variant="outlined"
          onClick={handleClick}
        >
          Filter
        </Button>

        <Button
          startIcon={<FilterAltOffIcon />}
          variant="outlined"
          size="small"
        >
          Clear
        </Button>
      </Stack>

      <FilterPopover
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </>
  );
}

function FilterPopover({ open, anchorEl, handleClose }) {
  const [filters, setFilters] = useState({
    customer: "",
    channel: "",
    transactionId: "",
    amount: "",
  });
  const pathname = usePathname();
  const querySearchParams = useSearchParams();
  const router = useRouter();

  // put any filters in the url into the input values
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      ...convertStringSearchParamsToObj(querySearchParams.toString()),
    }));
  }, [querySearchParams]);

  // reusable function to handle change in all filter inputs
  const handleFilterChange = (name) => (event) =>
    setFilters((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));

  const applyFilters = () => {
    const existingParams = convertStringSearchParamsToObj(
      querySearchParams.toString()
    );

    const { page, rows, ...existingFilters } = existingParams;

    // override the existing filters with the new filters
    const newFilters = {
      ...existingFilters,
      ...filters,
    };

    // remove empty values
    const cleanFilters = {};

    for (let [key, value] of Object.entries(newFilters)) {
      if (value) {
        cleanFilters[key] = value;
      }
    }

    const queryParams = new URLSearchParams({
      ...cleanFilters,
      rows: rows ? rows : DEFAULT_ROWS_PER_PAGE,
      page: 1, // reset page to one for every new search
    }).toString();

    const url = `${pathname}/?${queryParams}`;

    router.push(url);

    handleClose();
  };

  const popoverId = open ? "transaction-filter-popover" : undefined;
  return (
    <Popover
      id={popoverId}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box sx={{ width: "500px", py: 3, px: 4 }}>
        <Typography sx={{ mb: 2 }} color="primary" variant="h6" component="p">
          Filter by
        </Typography>

        <Grid container rowGap={1} columnGap={2} sx={{ mb: 2 }}>
          <Grid sm={12} md={5.5}>
            <TextField
              label="Customer"
              size="small"
              value={filters.customer}
              onChange={handleFilterChange("customer")}
            />
          </Grid>
          <Grid sm={12} md={5.5}>
            <TextField
              label="Channel"
              size="small"
              value={filters.channel}
              onChange={handleFilterChange("channel")}
            />
          </Grid>

          <Grid sm={12} md={5.5}>
            <TextField
              label="Transaction Id"
              size="small"
              value={filters.transactionId}
              onChange={handleFilterChange("transactionId")}
            />
          </Grid>
          <Grid sm={12} md={5.5}>
            <TextField
              label="Amount"
              size="small"
              value={filters.amount}
              onChange={handleFilterChange("amount")}
            />
          </Grid>
        </Grid>

        <Stack direction={"row"}>
          <Button color="secondary">Clear Filters</Button>
          <Stack direction={"row"} spacing={1} sx={{ ml: "auto" }}>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={applyFilters}>
              Apply
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Popover>
  );
}
