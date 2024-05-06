"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import MenuItem from "./menu-item";
import { alpha } from "@mui/material/styles";

/**
 *
 * @param {Object} menuItem Contains the properties of the menu item such as label. Menu items are located at ./items.jsx
 * @param {Function} closeMobileDrawer Passed by the mobile drawer. Close the drawer when a link item is closed
 * @returns
 */

export default function DropdownMenuItem({ menuItem, closeMobileDrawer }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleOpen = () => setOpen((prev) => !prev);

  const activeStyles = {
    background: (theme) => alpha(theme.palette.primary.main, 0.2),
    // color: "white",
    borderRight: (theme) => `5px solid ${theme.palette.primary.main}`,
  };

  // determine if the dropdown is action
  const active =
    typeof menuItem.active === "function"
      ? menuItem.active(pathname)
      : pathname === menuItem?.to;

  return (
    <Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          px: 1,
          py: 1,
          mb: 1,
          cursor: "pointer",
          "&:hover": {
            background: (theme) => alpha(theme.palette.primary.main, 0.2),
          },
          ...(active ? activeStyles : {}),
        }}
        onClick={toggleOpen}
      >
        <Stack direction={"row"} alignItems="center" columnGap={1}>
          {menuItem.icon}

          <Typography component={"p"}>{menuItem.label}</Typography>
        </Stack>
        <ChevronRightIcon
          sx={{
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "300ms transform ease-in",
          }}
        />
      </Stack>

      <Stack
        sx={{
          pl: 4,
          maxHeight: open ? "1000px" : 0,
          overflow: "hidden",
          transition: "300ms all ease-in-out",
        }}
        rowGap={1}
      >
        {menuItem?.links?.map((item) =>
          item.links ? (
            <DropdownMenuItem key={item.key} menuItem={item} />
          ) : (
            <MenuItem
              key={item.key}
              menuItem={item}
              closeMobileDrawer={closeMobileDrawer}
            />
          )
        )}
      </Stack>
    </Box>
  );
}
