"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme, useMediaQuery } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { alpha } from "@mui/material/styles";

/**
 *
 * @param {Object} menuItem Contains the properties of the menu item such as label. Menu items are located at ./items.jsx
 * @param {Function} closeMobileDrawer Passed by the mobile drawer. Close the drawer when a link item is closed
 * @returns
 */
export default function MenuItem({ menuItem, closeMobileDrawer }) {
  const pathname = usePathname();
  const theme = useTheme();

  // determines whether the link is open on a mobile menu
  const isMobileMenu = useMediaQuery(theme.breakpoints.down("md"));

  const active =
    typeof menuItem.active === "function"
      ? menuItem.active(pathname)
      : pathname === menuItem?.to;

  const activeStyles = {
    background: (theme) => alpha(theme.palette.primary.main, 0.2),
    // color: "white",
    borderRight: (theme) => `5px solid ${theme.palette.primary.main}`,
  };

  const handleCloseMobileDrawer = () => {
    if (isMobileMenu && typeof closeMobileDrawer === "function")
      closeMobileDrawer();
  };

  return (
    <Link href={menuItem?.to || ""} onClick={handleCloseMobileDrawer}>
      <Stack
        direction={"row"}
        alignItems="center"
        columnGap={0.5}
        sx={{
          px: 1,
          py: 1,
          // borderRadius: 1,
          cursor: "pointer",
          ...(active ? activeStyles : {}),
          "&:hover": {
            background: (theme) => alpha(theme.palette.primary.main, 0.2),
            color: "black",
          },
        }}
      >
        {menuItem.icon}

        <Typography component={"p"}>{menuItem.label} </Typography>
      </Stack>
    </Link>
  );
}
