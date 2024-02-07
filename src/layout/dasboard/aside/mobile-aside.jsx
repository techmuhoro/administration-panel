"use client";
import Drawer from "@mui/material/Drawer";
import BaseAside from "./index";
import { Box, useTheme } from "@mui/material";

export default function MobileMenu({ open, handleClose }) {
  const theme = useTheme();
  return (
    <Drawer anchor="left" open={open} onClose={handleClose}>
      <Box
        sx={{
          width: "300px",
          height: "100%",
          p: 1.5,
        }}
        onClick={handleClose}
      >
        <BaseAside />
      </Box>
    </Drawer>
  );
}
