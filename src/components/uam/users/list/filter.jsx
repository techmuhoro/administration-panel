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

export default function UserFilter() {
  const [anchorEl, setAnchorEl] = useState(null);

  const router = useRouter();

  const pathname = usePathname();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleClearFilters = () => router.push(pathname);

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
          onClick={handleClearFilters}
        >
          Clear
        </Button>
      </Stack>

      <FilterPopover
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleClearFilters={handleClearFilters}
      />
    </>
  );
}

function FilterPopover({ open, anchorEl, handleClose, handleClearFilters }) {
  const [filters, setFilters] = useState({
    department: "",
    name: "",
    email: "",
  });

  const pathname = usePathname();
  const querySearchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paramsObj = convertStringSearchParamsToObj(
      querySearchParams.toString()
    );
    console.log(querySearchParams);
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        ...convertStringSearchParamsToObj(querySearchParams.toString()),
      };

      return newFilters;
    });
  }, [querySearchParams]);

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
    console.log("existingFilters", existingFilters);

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

    console.log(cleanFilters);

    const queryParams = new URLSearchParams({
      ...(rows && { rows: rows }),
      ...cleanFilters,
    }).toString();

    const url = `${pathname}/?${queryParams}`;

    router.push(url);

    handleClose();
  };

  const popoverId = open ? "user-filter-popover" : undefined;

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

        <Grid container rowSpacing={1} columnSpacing={2} sx={{ mb: 2 }}>
          <Grid xs={12} sm={12} md={6}>
            <TextField
              label="Name"
              size="small"
              value={filters.name}
              onChange={handleFilterChange("name")}
            />
          </Grid>
          <Grid xs={12} sm={12} md={5.5}>
            <TextField
              label="Department"
              size="small"
              value={filters.department}
              onChange={handleFilterChange("department")}
            />
          </Grid>

          <Grid xs={12} sm={12} md={5.5}>
            <TextField
              label="Email"
              size="small"
              value={filters.email}
              onChange={handleFilterChange("email")}
            />
          </Grid>
        </Grid>

        <Stack direction={"row"}>
          <Button
            color="secondary"
            onClick={() => {
              handleClearFilters();
              handleClose();
            }}
          >
            Clear Filters
          </Button>
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
