"use client";

import { useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import BaseAside from "./index";

export default function LargeAside() {
  const theme = useTheme();
  return (
    <Grid
      sm={0}
      md={3}
      lg={2}
      sx={{
        overflowY: "auto",
        height: "100%",
        borderRight: (theme) => `1px solid ${theme.palette.border.main}`,
        px: 2,
        [theme.breakpoints.down("md")]: {
          display: "none",
          background: "red",
        },
      }}
    >
      <BaseAside />
    </Grid>
  );
}
