import { createPortal } from "react-dom";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from "@mui/icons-material/Clear";

import LoadingButton from "@/atoms/loading-button";

/**
 * @typedef {import("@mui/material").DialogProps} ModalTypes
 * @typedef {import("@mui/material").ButtonProps} BtnTypes
 */

/**
 * @callback ConfirmActionCb
 */

/**
 *
 * @param {Object} desc - Object defining behaviour and how the modal should be displayed.
 * @param {ModalTypes["open"]} desc.open - Controls if modal shold be opened or closed.
 * @param {ModalTypes["onClose"]} [desc.handleClose] - Called when modal requests to close.
 * @param {string} [desc.title] - Title to show on the dialog.
 * @param {ConfirmActionCb} [desc.onConfirmAction] - Adds a submit button and is called when submit button is clicked.
 * @param {BtnTypes["color"]} [desc.actionBtnColor = "primary"] - Color of the submit button. Visible when `onConfirmAction` function is passed.
 * @param {string} [desc.confirmText] - Text to show on the submit button.
 * @param {boolean} [desc.loading] - Shows loading UI state of the submit button. Update this prop once a submission is complete.
 * @param {boolean} [desc.closeOnClickOutside = true] - Determines whether the modal closes when clicked on its backdrop.
 * @returns {void}
 */
function DeptModal({
  open,
  handleClose,
  title,
  children,
  onConfirmAction,
  actionBtnColor = "primary",
  confirmText,
  loading,
  closeOnClickOutside = true,
}) {
  return (
    typeof window !== "undefined" &&
    createPortal(
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (closeOnClickOutside === false) {
            if (reason === "backdropClick" || reason === "escapeKeyDown")
              return;
          }
          if (typeof handleClose === "function") handleClose(event, reason);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: { position: "relative", minWidth: "320px" },
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
        <DialogContent>{children}</DialogContent>
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
