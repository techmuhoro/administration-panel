"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import { useRouter, usePathname } from "next/navigation";

import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@/atoms/loading-button";
import http from "@/http";

export default function PermissionDelete({ permission }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const setAlertMessage = useNotifyAlertCtx();
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePermission = async () => {
    setLoading(true);
    try {
      await http({
        url: `/permissions/${permission.id}`,
        method: "DELETE",
        includeAuthorization: true,
      }).then((res) => res.data);

      let msg = "Permission deleted successfully";
      setAlertMessage(msg, { type: "success", openDuration: 3000 });

      router.push("/dashboard/permissions");
    } catch (error) {
      let msg = error?.httpMessage || "An error occurred! Contact Admin";
      setAlertMessage(msg, { type: "error", openDuration: 3000 });
    } finally {
      setLoading(false);
    }
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
            <LoadingButton
              variant="contained"
              color="error"
              onClick={deletePermission}
              loading={loading}
              autoFocus
            >
              Delete
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
}
