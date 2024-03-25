"use client";

import { useEffect, useState, useCallback } from "react";
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
import LoadingButton from "@/atoms/loading-button";

const initialFilters = {
  deptName: "",
};

function DepartmentsFilter({ error }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [errorState, setErrorState] = useState(error);
  const [addedFiltersCount, setAddedFiltersCount] = useState(0);
  const [filters, setFilters] = useState(initialFilters);
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  const router = useRouter();
  const open = Boolean(anchorEl);

  const currentRelativeURL = `${pathname}${searchParams ? "?" + searchParams : ""}`;
  const [upcomingRelativeURL, setUpcomingRelativeURL] =
    useState(currentRelativeURL);
  const filtersLoading =
    !(upcomingRelativeURL === currentRelativeURL) && !errorState;

  // console.log({
  //   upcomingRelativeURL,
  //   currentRelativeURL,
  //   current_and_next_match: upcomingRelativeURL === currentRelativeURL,
  //   filtersLoading,
  // });

  useEffect(() => {
    setErrorState(error);
  }, [error, setErrorState]);

  const handleOpenMenu = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [setAnchorEl]
  );
  const handleClosePopup = useCallback(() => setAnchorEl(null), [setAnchorEl]);
  const handleResetFilters = () => {
    const initialUrlPath = pathname;
    router.replace(initialUrlPath);
    setUpcomingRelativeURL(initialUrlPath);
    setFilters(initialFilters); // Re-initialize filter values to defaults
  };
  const handleResetError = useCallback(() => {
    setErrorState("");
  }, [setErrorState]);
  const handleUpcomingRelativeURL = useCallback(
    (url) => setUpcomingRelativeURL(url),
    [setUpcomingRelativeURL]
  );
  const handleUpdateFilters = useCallback(
    (newFilters) => {
      setFilters((prev) => {
        return {
          ...prev,
          ...newFilters,
        };
      });

      const newFiltersArr = Object.entries(newFilters);
      setAddedFiltersCount(newFiltersArr.length);
    },
    [setFilters]
  );
  const handleFilterInputChange = useCallback(
    (event) => {
      const name = event.target.name;
      if (name)
        setFilters((prev) => ({
          ...prev,
          [name]: event.target.value,
        }));
    },
    [setFilters]
  );

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
        <LoadingButton
          startIcon={<FilterAltIcon />}
          variant="outlined"
          onClick={handleOpenMenu}
          loading={filtersLoading}
        >
          Filter
        </LoadingButton>
        <Button
          startIcon={<FilterAltOffIcon />}
          variant="outlined"
          size="small"
          onClick={handleResetFilters}
          disabled={filtersLoading}
        >
          Clear
        </Button>
      </Stack>

      <FilterPopover
        open={open}
        anchorEl={anchorEl}
        handleClosePopup={handleClosePopup}
        setUpcomingRelativeUrl={handleUpcomingRelativeURL}
        handleFilterInputChange={handleFilterInputChange}
        filters={filters}
        handleUpdateFilters={handleUpdateFilters}
        handleResetError={handleResetError}
      />
    </>
  );
}

export default DepartmentsFilter;

/**
 * This function is a method to pluck properties __from__ `targetObject`(non-empty) __into__ a _new returned_ object.
 * `keys` array should be passed containing keys to be extracted from `targetObject`.
 *
 * An empty object is returned if none of the keys specified in `keys` array is found on `targetObject`.
 * @param {string[]} [keys = []]
 * @param {Object} [targetObject = {}]
 * @returns {Object} Returns an object
 */
function pluckFromObject(keys = [], targetObject = {}) {
  if (keys instanceof Array) {
    const filtered = keys.reduce((pileValue, key) => {
      if (targetObject[key]) {
        pileValue[key] = targetObject[key];
      }
      return pileValue;
    }, {});

    return filtered;
  } else {
    return {};
  }
}

function FilterPopover({
  open,
  anchorEl,
  handleClosePopup,
  setUpcomingRelativeUrl,
  filters,
  handleUpdateFilters,
  handleResetError,
  handleFilterInputChange,
}) {
  const pathname = usePathname();
  const querySearchParams = useSearchParams();
  const router = useRouter();

  // Effect below transfers filters in the browser URL, to the state controlling filter inputs
  useEffect(() => {
    const filterObj = convertStringSearchParamsToObj(
      querySearchParams.toString()
    );

    // Below line, sifts out pagination filters(`rows` and `pages`)
    // Is important for getting number of filters applied
    const siftedFilterObj = pluckFromObject(Object.keys(filters), filterObj);

    handleUpdateFilters(siftedFilterObj);
  }, [querySearchParams]);

  const applyFilters = useCallback(
    (e) => {
      e?.preventDefault();

      // 1. Derive an Object of filters from url's search string
      const existingParams = convertStringSearchParamsToObj(
        querySearchParams.toString()
      );

      // 2. Remove pagination filters(`rows` and `page`)
      const existingFilters = pluckFromObject(
        Object.keys(filters),
        existingParams
      );

      // 3. Get updated filter values
      const newFilters = {
        ...existingFilters,
        ...filters,
      };

      // 4. Remove any empty
      const nonEmptyFilters = Object.entries(newFilters).reduce(
        (accm, [key, value]) => {
          if (value) accm[key] = value;
          return accm;
        },
        {}
      );

      // 5. Get a new Query string from the updated and nonEmpty filters
      const queryParams = new URLSearchParams({
        ...nonEmptyFilters,
        rows: parseInt(existingParams?.rows) || DEFAULT_ROWS_PER_PAGE,
        page: 1, // reset page to one for every new filter applied
      }).toString();

      // 6. Derive a new url(pathname + searchString)
      const nextUrl = `${pathname}${queryParams ? "?" + queryParams : ""}`;

      // 7. Call router with new url + other OP
      router.replace(nextUrl);
      setUpcomingRelativeUrl(nextUrl); // Sets the next url expected when router completes
      handleResetError();
      handleClosePopup(); // Close the filter popup
    },
    [querySearchParams.toString(), JSON.stringify(filters)]
  );

  const popoverId = open ? "departments-filter-popover" : undefined;
  return (
    <Popover
      id={popoverId}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClosePopup}
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
              onChange={handleFilterInputChange}
            />
          </Grid>
        </Grid>
        <Stack direction={"row"}>
          <Button color="secondary">Clear Filters</Button>
          <Stack direction={"row"} spacing={1} sx={{ ml: "auto" }}>
            <Button variant="contained" color="primary" type="submit">
              Apply
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClosePopup}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Popover>
  );
}
