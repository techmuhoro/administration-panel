"use client";
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Page() {
  const theme = useTheme();
  return (
    <div>
      <Typography
        sx={{
          [theme.breakpoints.up("md")]: {
            color: "red",
          },
        }}
      >
        This is the dahboard page
      </Typography>
      <p>This is the dahboard page</p>
    </div>
  );
}
