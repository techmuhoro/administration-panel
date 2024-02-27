import { useState } from "react";
import { createPortal } from "react-dom";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
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
  loading,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        ...(typeof onConfirmAction === "function" && {
          component: "form",
          onSubmit: onConfirmAction,
        }),
      }}
    >
      {title && (
        <>
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <Divider />
        </>
      )}
      <DialogContent>
        {children}
        {/* <DialogContentText id="alert-dialog-description" component="div">
        </DialogContentText> */}
      </DialogContent>
      <DialogActions>
        {typeof onConfirmAction === "function" && (
          <Button
            sx={{ flex: "1 1 100%" }}
            variant="contained"
            type="submit"
            //   autoFocus
          >
            {loading ? (
              <CircularProgress size={25} color="inherit" />
            ) : (
              confirmText || "Yes"
            )}
          </Button>
        )}
        {typeof handleClose === "function" && (
          <Button
            onClick={handleClose}
            sx={{ flex: "1 1 100%" }}
            color="secondary"
            variant="outlined"
          >
            {cancelText || "No"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default DeptModal;
