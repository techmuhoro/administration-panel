import { useState } from "react";
import { createPortal } from "react-dom";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { Tooltip } from "@mui/material";
import LoadingButton from "@/atoms/loading-button";

function DeptModal({
  open,
  handleClose,
  title,
  children,
  onConfirmAction,
  actionBtnColor = "primary",
  confirmText,
  loading,
}) {
  return (
    typeof window !== "undefined" &&
    createPortal(
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: { position: "relative", minWidth: "330px" },
          ...(typeof onConfirmAction === "function" && {
            component: "form",
            onSubmit: onConfirmAction,
          }),
        }}
      >
        {typeof handleClose === "function" && (
          <>
            <Box sx={{ py: 1 }}></Box>
            <Box
              sx={{
                pt: 0.5,
                pr: 0.5,
                position: "absolute",
                top: "0px",
                right: "0px",
              }}
            >
              <IconButton
                onClick={handleClose}
                // sx={{ flex: "1 1 100%" }}
                color="default"
                variant="outlined"
              >
                <Tooltip title="close" arrow>
                  <ClearIcon />
                </Tooltip>
              </IconButton>
            </Box>
          </>
        )}
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
            <LoadingButton
              loading={loading}
              variant="contained"
              style={{ flex: "1 1 100%" }}
              type="submit"
              color={actionBtnColor}
            >
              {confirmText || "Yes"}
            </LoadingButton>
          )}

          {/* {typeof handleClose === "function" && (
            <Button
              onClick={handleClose}
              sx={{ flex: "1 1 100%" }}
              color="secondary"
              variant="outlined"
            >
              {cancelText || "No"}
            </Button>
          )} */}
        </DialogActions>
      </Dialog>,
      document.body
    )
  );
}

export default DeptModal;
