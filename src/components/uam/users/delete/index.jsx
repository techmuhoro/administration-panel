"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingButton from "@/atoms/loading-button";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { BASE_URL } from "@/lib/constants";
import Cookies from "js-cookie";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";

import DeleteIcon from "@mui/icons-material/Delete";

export default function UserDelete({ row }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");
  const router = useRouter();

  const setAlertMessage = useNotifyAlertCtx();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteUser = () => {
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    setLoading(true);
    axios
      .delete(`${BASE_URL}users/${row.id}`, { headers })
      .then((response) => {
        setAlertMessage("User has been deleted successfully", {
          type: "success",
          openDuration: 3000,
        });
        setLoading(false);

        setTimeout(() => {
          setOpen(false);
          router.refresh();
        }, 2000);
      })
      .catch((error) => {
        let errorObject = error.response?.data?.error;
        console.log(error);
        let errorKey = ["message"];
        errorKey.forEach((key) => {
          if (errorObject.hasOwnProperty(key)) {
            setAlertMessage(errorObject[key], {
              type: "error",
              openDuration: 3000,
            });
          }
        });
        setLoading(false);
        router.refresh();
      });
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
            Confirm Action to delete user - {row?.attributes?.name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action is not reversible user {row?.attributes?.name} will be
              deleted permanently.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              type="button"
              variant="contained"
              color="error"
              autoFocus
              loading={loading}
              onClick={handleDeleteUser}
            >
              Delete
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
}
