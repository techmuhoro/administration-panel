/**
 *
 */

"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableViewIcon from "@mui/icons-material/TableView";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export default function ExportButton({
  variant = "outlined",
  color = "primary",
  label = "Export",
  handleExport,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button
        startIcon={<DownloadIcon />}
        variant={variant}
        color={color}
        onClick={handleOpen}
      >
        {label}
      </Button>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        // PaperProps={{
        //   elevation: 0,
        //   sx: exportDropDown,
        // }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Typography variant="subtitle2" textAlign="center" color="primary">
          EXPORT IN
        </Typography>
        <Divider />
        <Stack direction="column" sx={{ px: "10px", my: "10px" }}>
          <MenuItem
            onClick={() => {
              handleExport("xlsx");
            }}
          >
            <TableViewIcon />
            <Typography sx={{ ml: 2 }}>EXCEL</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport("csv");
            }}
          >
            <ClearAllIcon />
            <Typography sx={{ ml: 2 }}>CSV</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport("pdf");
            }}
          >
            <PictureAsPdfIcon />
            <Typography sx={{ ml: 2 }}>PDF</Typography>
          </MenuItem>
        </Stack>
        <Button
          fullWidth
          color="secondary"
          variant="text"
          size="small"
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
      </Menu>
    </>
  );
}
