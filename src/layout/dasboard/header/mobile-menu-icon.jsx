"use client";

import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MobileMenu from "../aside/mobile-aside";
import { useTheme } from "@mui/material";

export default function MobileMenuIcon() {
  const theme = useTheme();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const closeMenu = () => setMobileDrawerOpen(false);
  const openMenu = () => setMobileDrawerOpen(true);

  return (
    <Box
      sx={{
        [theme.breakpoints.up("md")]: {
          display: "none",
        },
      }}
    >
      <IconButton onClick={openMenu}>
        <MenuIcon fontSize="large" />
      </IconButton>

      <MobileMenu open={mobileDrawerOpen} handleClose={closeMenu} />
    </Box>
  );
}
