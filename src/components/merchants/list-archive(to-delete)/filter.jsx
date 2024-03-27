"use client";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// material ui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

// assets
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

export default function MerchantsFilter() {
  const [anchorEl, setAnchorEl] = useState(null);

  const router = useRouter();

  const pathname = usePathname();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleClearFilters = () => router.push(pathname);

  const open = Boolean(anchorEl);

  return (
    <Stack direction="row" alignItems="center" columnGap={1}>
      <Typography variant="body2">0 Applied filters</Typography>

      <Button
        startIcon={<FilterAltIcon />}
        variant="outlined"
        size="small"
        onClick={handleClick}
      >
        Filter
      </Button>

      <FilterPopover
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleClearFilters={() => {}}
      />

      <Button startIcon={<FilterAltOffIcon />} variant="outlined" size="small">
        Clear
      </Button>
    </Stack>
  );
}

function FilterPopover({ open, anchorEl, handleClose, handleClearFilters }) {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
  });

  const pathname = usePathname();
  const querySearchParams = useSearchParams();
  const router = useRouter();

  const popoverId = open ? "merchants-filter-popover" : undefined;

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
            <TextField label="Name" size="small" value={filters.name} />
          </Grid>

          <Grid xs={12} sm={12} md={6}>
            <TextField label="Email" size="small" value={filters.email} />
          </Grid>
        </Grid>

        <Stack direction={"row"}>
          <Button color="secondary">Clear Filters</Button>
          <Stack direction={"row"} spacing={1} sx={{ ml: "auto" }}>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Apply
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Popover>
  );
}
