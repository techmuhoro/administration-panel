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
import LoadingButton from "@/atoms/loading-button";
import DeleteIcon from "@mui/icons-material/Delete";
import { BASE_URL } from "@/lib/constants";
import Cookies from "js-cookie";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import { useRouter, usePathname } from "next/navigation";

export default function RoleDelete({ row }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const authToken = Cookies.get("token");
  const setAlertMessage = useNotifyAlertCtx();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function deleteRole() {
    const url = `${BASE_URL}roles/${row.id}`;

    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      const data = await response.json();

      // handle the response
      // success
      if (response.status == 200) {
        setAlertMessage("Role Deleted successfully", {
          openDuration: 3000,
          type: "success",
        });

        handleClose();
        return router.refresh();
      }
      // unauthenticated
      else if (response.status == 401) {
        return router.push(`/?next=${pathname}`);
      }
      // unathorized
      else if (response.status == 403) {
        setAlertMessage(
          data?.error?.message ||
            "You do not have the permission to perform this action",
          {
            openDuration: 3000,
            type: "info",
          }
        );
      }
      // internal server error
      else if (response.status.toString().startsWith("5")) {
        setAlertMessage(
          data?.error?.message || "An internal server error occurred",
          {
            openDuration: 3000,
            type: "error",
          }
        );
      }
      // default
      else {
        setAlertMessage(
          data?.error?.message ||
            "An error occurred! Kindly contact system admin.",
          {
            openDuration: 3000,
            type: "error",
          }
        );
      }
    } catch (error) {
      setAlertMessage("An error occurred. Kindly contact system admin", {
        openDuration: 3000,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

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
            Confirm Action to delete role - {row?.attributes?.name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action is not reversible, all users under this role will be
              affected.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              type="button"
              variant="contained"
              color="error"
              autoFocus
              loading={loading}
              onClick={deleteRole}
            >
              Delete
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
}
