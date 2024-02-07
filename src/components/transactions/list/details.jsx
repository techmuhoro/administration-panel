"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TransactionDelete from "../delete";

export default function TransactionDetails({ row }) {
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
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Typography sx={{ pb: 0.5, px: 1, fontWeight: "medium" }}>
          Actions
        </Typography>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Stack direction="row" alignItems={"center"} columnGap={1}>
            <VisibilityIcon fontSize="small" />
            <Typography>View</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Stack direction="row" alignItems={"center"} columnGap={1}>
            <EditIcon fontSize="small" />
            <Typography>Update</Typography>
          </Stack>
        </MenuItem>
        <TransactionDelete transaction={row} closeMenu={handleClose} />
        {/* <MenuItem onClick={handleClose}>
          <Stack direction="row" alignItems={"center"} columnGap={1}>
            <DeleteIcon fontSize="small" />
            <Typography>Delete</Typography>
          </Stack>
        </MenuItem> */}
      </Menu>
    </>
  );
}
