"use client";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function AsideContainer(props) {
  return (
    <Grid
      sm={0}
      md={4}
      lg={2}
      sx={{
        borderRight: (theme) => `1px solid ${theme.palette.border.main}`,
        px: 2,
      }}
    >
      {props.children}
    </Grid>
  );
}
