"use client";

// import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@/atoms/loading-button";
// import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
// import http from "@/http";

export default function RemoveBank({ open, handleClose, bank }) {
  //   const [loading, setLoading] = useState(false);
  //   const setAlertMessage = useNotifyAlertCtx();

  //   const handleRemoveBank = async () => {
  //     try {
  //       setLoading(true);

  //       await http({});
  //     } catch (error) {
  //       const msg = error?.httpMessage || "Error! Could not remove bank.";

  //       setAlertMessage(msg, { type: "error", openDuration: 3000 });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Bank Account</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description" mb={2}>
          Please Note: This bank had already been persisted. Confirm action to
          delete.
        </DialogContentText>
        <Box sx={{ pl: 5 }}>
          <InfoStack title="Bank" content={bank?.bankName} />
          <InfoStack title="Account Name " content={bank?.accountName} />
          <InfoStack title="Account Number" content={bank?.accountNumber} />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton
          type="button"
          //   loading={loading}
          variant="contained"
          color="error"
          onClick={handleClose}
          autoFocus
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

function InfoStack({ title, content }) {
  return (
    <Stack direction="row" columnGap={1}>
      <Typography sx={{ fontWeight: "600" }}>{title}:</Typography>
      <Typography>{content}</Typography>
    </Stack>
  );
}
