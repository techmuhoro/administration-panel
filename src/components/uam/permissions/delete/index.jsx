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
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

import DeleteIcon from "@mui/icons-material/Delete";
import { BASE_URL } from "@/lib/constants";
import LoadingButton from "@/atoms/loading-button";

const errorLookUp = {
  401: "You are Unauthenticated",
  403: "You don not have permission to perform this action",
  // 406: "There is an error in your form",
  500: "An internal server error occurred. Kindly contact Admin.",
};
export default function PermissionDelete({ permission }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const setAlertMessage = useNotifyAlertCtx();
  const router = useRouter();
  const pathname = usePathname();
  const authToken = Cookies.get("token");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePermission = async () => {
    const url = `${BASE_URL}permissions/${permission.id}`;

    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      // handle response
      // success
      if (response.status == 200) {
        let msg = data?.data?.message || "Permission deleted successfully";
        setAlertMessage(msg, { type: "success", openDuration: 3000 });
        router.push("/dashboard/permissions");
      }
      // unauthenticated
      else if (response.status == 401) {
        router.push(`/?next=${pathname}`);
      } else {
        let msg =
          data?.error?.message ||
          errorLookUp[response.status] ||
          "An error occurred! Contact Admin";

        // set from form error in case of 406

        setAlertMessage(msg, { type: "error", openDuration: 3000 });
      }
    } catch (error) {
      let msg = data?.error?.message || "An error occurred! Contact Admin";
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
