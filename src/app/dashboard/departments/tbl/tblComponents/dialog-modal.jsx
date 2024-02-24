import { useState } from "react";
import { createPortal } from "react-dom";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DeleteIcon from "@mui/icons-material/Delete";

function DeptModal({
  open,
  handleClose,
  title,
  children,
  onConfirmAction,
  cancelText,
  confirmText,
}) {
  return createPortal(
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && (
        <>
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <Divider />
        </>
      )}
      <DialogContent>
        <DialogContentText id="alert-dialog-description" component="div">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          // justifyContent: "stretch",
          alignItems: "center",
        }}
      >
        {typeof onConfirmAction === "function" && (
          <Button
            onClick={onConfirmAction}
            sx={{ flex: "1 0 100%" }}
            variant="contained"
            //   autoFocus
          >
            {confirmText || "Yes"}
          </Button>
        )}
        {typeof handleClose === "function" && (
          <Button
            onClick={handleClose}
            sx={{ flex: "1 0 100%" }}
            variant="outlined"
          >
            {cancelText || "No"}
          </Button>
        )}
      </DialogActions>
    </Dialog>,
    document.body
  );
}

export default DeptModal;
