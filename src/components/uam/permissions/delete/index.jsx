"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DeleteIcon from "@mui/icons-material/Delete";

export default function PermissionDelete({ permission }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    alert("To delete role");
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <Stack direction="row" alignItems={"center"} columnGap={1}>
          <DeleteIcon sx={{ fontSize: "1rem" }} />
          <Typography>Delete</Typography>
        </Stack>
      </MenuItem>

      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Confirm Action to delete Permission ({permission?.attributes?.name})
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action is not reversible
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
}
