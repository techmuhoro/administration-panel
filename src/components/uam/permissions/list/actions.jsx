"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import PermissionDelete from "../delete";
import PermissionUpdate from "../update";

export default function PermissionActions({ row }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-controls={open ? "role-actions" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon fontSize="medium" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "role-actions",
        }}
      >
        <Typography sx={{ pb: 0.5, px: 1, fontWeight: "medium" }}>
          Actions
        </Typography>
        <Divider />

        {/* <MenuItem onClick={handleClose}>
          <Stack direction="row" alignItems={"center"} columnGap={1}>
            <VisibilityIcon sx={{ fontSize: "1rem" }} />
            <Typography>View</Typography>
          </Stack>
        </MenuItem> */}

        {/* <Link href={`/dashboard/permissions/update/${row?.id}`}>
          <MenuItem onClick={handleClose}>
            <Stack direction="row" alignItems={"center"} columnGap={1}>
              <EditIcon sx={{ fontSize: "1rem" }} />
              <Typography>Update</Typography>
            </Stack>
          </MenuItem>
        </Link> */}

        <PermissionUpdate permission={row} />

        {/* <PermissionDelete permission={row} /> */}
      </Menu>
    </>
  );
}
