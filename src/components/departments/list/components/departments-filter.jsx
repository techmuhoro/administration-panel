"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Stack from "@mui/material/Stack";

import { convertStringSearchParamsToObj, pluckProperties } from "@/lib/utils";
import { DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";
import LoadingButton from "@/atoms/loading-button";
import PopoverMenuBtn from "@/atoms/PopoverMenuBtn";

const initialFilters = {
  deptName: "",
};

function DepartmentsFilter({ error }) {
  const [errorState, setErrorState] = useState(error);
  const [addedFiltersCount, setAddedFiltersCount] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  const router = useRouter();
  const queryParams = useSearchParams();

  const currentRelativeURL = `${pathname}${searchParams ? "?" + searchParams : ""}`;
  const [upcomingRelativeURL, setUpcomingRelativeURL] =
    useState(currentRelativeURL);
  const filtersLoading =
    !(upcomingRelativeURL === currentRelativeURL) && !errorState.error;

  useEffect(() => {
    setErrorState(error);
  }, [error, setErrorState]);

  useEffect(() => {
    const filterObj = convertStringSearchParamsToObj(queryParams.toString());

    // Below code, will sift out pagination filters(`rows` and `pages`)
    // Is important to get data filters in use on this component
    const siftedFilterObj = pluckProperties(
      Object.keys(initialFilters),
      filterObj
    );

    const filtersApplied = Object.entries(siftedFilterObj);

    if (filtersApplied) setAddedFiltersCount(filtersApplied?.length || 0); // A Note: [] is truthy
  }, [queryParams, setAddedFiltersCount]);

  const handleResetFilters = () => {
    const initialUrlPath = pathname;
    router.replace(initialUrlPath);
    setUpcomingRelativeURL(initialUrlPath);
  };
  const handleResetError = useCallback(() => {
    setErrorState("");
  }, [setErrorState]);
  const handleUpcomingRelativeURL = useCallback(
    (url) => setUpcomingRelativeURL(url),
    [setUpcomingRelativeURL]
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

        <PopoverMenuBtn
          variant="outlined"
          renderMenu={({ closeMenu }) => {
            return (
              <FilterPopover
                closePopup={closeMenu}
                upcomingRelativeUrl={handleUpcomingRelativeURL}
                initialFilters={initialFilters}
                resetError={handleResetError}
              />
            );
          }}
          buttonComponent={<LoadingButton startIcon={<FilterAltIcon />} />}
          loading={filtersLoading}
        >
          Filter
        </PopoverMenuBtn>
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
    </>
  );
}

export default DepartmentsFilter;

function FilterPopover({
  closePopup,
  upcomingRelativeUrl,
  initialFilters,
  resetError,
}) {
  const [filters, setFilters] = useState(initialFilters);
  const pathname = usePathname();
  const querySearchParams = useSearchParams();
  const router = useRouter();

  // Effect below transfers filters in the browser URL, to the state controlling filter inputs
  useEffect(() => {
    const filterObj = convertStringSearchParamsToObj(
      querySearchParams.toString()
    );

    // Below code, will sift out pagination filters(`rows` and `pages`)
    // Is important to get data filters in use on this component
    const siftedFilterObj = pluckProperties(Object.keys(filters), filterObj);

    handleUpdateFilters(siftedFilterObj);
  }, [querySearchParams]);

  const handleUpdateFilters = useCallback(
    (newFilters) => {
      setFilters((prev) => {
        return {
          ...prev,
          ...newFilters,
        };
      });
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

  const applyFilters = useCallback(
    (e) => {
      e?.preventDefault();

      // 1. Derive an Object of filters from url's search string
      const existingParams = convertStringSearchParamsToObj(
        querySearchParams.toString()
      );

      // 2. Remove pagination filters(`rows` and `page`)
      const existingFilters = pluckProperties(
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
      upcomingRelativeUrl(nextUrl); // Sets the next url expected when router completes
      resetError();
      closePopup(); // Close the filter popup
    },
    [querySearchParams.toString(), JSON.stringify(filters)]
  );

  return (
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
          <Button variant="text" color="primary" onClick={closePopup}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Apply
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
