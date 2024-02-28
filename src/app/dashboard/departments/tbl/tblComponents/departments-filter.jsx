"use client";
import { useEffect, useState, useRef } from "react";
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
import { convertStringSearchParamsToObj } from "@/lib/utils";
import { DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";

function DepartmentsFilter() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [addedFiltersCount, setAddedFiltersCount] = useState(0);
  const popoverRefKey = useRef("kjxQl4d");
  const pathname = usePathname();
  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleResetFilters = () => {
    popoverRefKey.current = Math.random().toString(36);
    // router.replace(pathname, undefined, { shallow: true });
    router.push(pathname);
  };
  const trackAddedFilters = (filters) => {
    if (filters instanceof Array) {
      return setAddedFiltersCount(filters.length);
    }
    return setAddedFiltersCount(0);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        columnGap={1}
        sx={{ display: "inline-flex" }}
      >
        <Typography variant="body2">
          {addedFiltersCount} Applied{" "}
          {addedFiltersCount == 1 ? "filter" : "filters"}
        </Typography>
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
          onClick={handleResetFilters}
        >
          Clear
        </Button>
      </Stack>
      <FilterPopover
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        key={popoverRefKey.current}
        reportAddedFilters={trackAddedFilters}
      />
    </>
  );
}

function extractFilters(filterKeys = [], targetObject = {}) {
  if (filterKeys instanceof Array) {
    const filtered = filterKeys.reduce((pileValue, filterKey) => {
      if (targetObject[filterKey]) {
        pileValue[filterKey] = targetObject[filterKey];
      }
      return pileValue;
    }, {});

    return filtered;
  } else {
    return {};
  }
}
function FilterPopover({ open, anchorEl, handleClose, reportAddedFilters }) {
  const [filters, setFilters] = useState({
    deptName: "",
  });
  const pathname = usePathname();
  const querySearchParams = useSearchParams();
  const router = useRouter();
  // put any filters in the url into the input values
  useEffect(() => {
    const filterObj = convertStringSearchParamsToObj(
      querySearchParams.toString()
    );
    // Below method, sifts out pagination filters and use only 'data' filters
    const siftedFilterObj = extractFilters(Object.keys(filters), filterObj);
    setFilters((prev) => ({
      ...prev,
      ...siftedFilterObj,
    }));
    reportAddedFilters(Object.entries(siftedFilterObj));
  }, [querySearchParams]);
  // reusable function to handle change in all filter inputs
  const handleFilterChange = (event) => {
    const name = event.target.name;
    setFilters((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };
  const applyFilters = (e) => {
    e?.preventDefault();
    const existingParams = convertStringSearchParamsToObj(
      querySearchParams.toString()
    );
    const existingFilters = extractFilters(
      Object.keys(filters),
      existingParams
    );

    // const { page, rows, ...existingFilters } = existingParams;
    // override the existing filters with the new filters
    const newFilters = {
      ...existingFilters,
      ...filters,
    };

    // remove empty values
    const nonEmptyFilters = Object.entries(newFilters).reduce(
      (accm, [key, value]) => {
        if (value) accm[key] = value;
        return accm;
      },
      {}
    );
    const queryParams = new URLSearchParams({
      ...nonEmptyFilters,
      rows: parseInt(existingParams?.rows) || DEFAULT_ROWS_PER_PAGE,
      page: 1, // reset page to one for every new search
    }).toString();
    const url = `${pathname}?${queryParams}`;
    router.push(url);
    // reportAddedFilters(Object.entries(nonEmptyFilters));
    handleClose();
  };
  const popoverId = open ? "audit-trail-filter-popover" : undefined;
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
      <Box
        sx={{ width: "500px", py: 3, px: 4 }}
        component="form"
        onSubmit={applyFilters}
      >
        <Typography sx={{ mb: 2 }} color="primary" variant="h6" component="p">
          Filter by
        </Typography>
        <Grid container rowGap={1} sx={{ mb: 2 }}>
          <Grid sm={12} md={5}>
            <TextField
              label="Dept. Name"
              size="small"
              name="deptName"
              value={filters.deptName}
              onChange={handleFilterChange}
            />
          </Grid>
        </Grid>
        <Stack direction={"row"}>
          <Button color="secondary">Clear Filters</Button>
          <Stack direction={"row"} spacing={1} sx={{ ml: "auto" }}>
            <Button variant="contained" color="primary" type="submit">
              Apply
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Popover>
  );
}
export default DepartmentsFilter;
