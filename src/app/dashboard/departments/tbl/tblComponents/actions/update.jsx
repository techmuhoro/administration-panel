"use client";

import { useState, useCallback } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

import DeptModal from "../dialog-modal";

function Update({ item, handleMenuClose }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    // handleMenuClose();
  }, [setModalOpen]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        columnGap={1}
        onClick={handleOpenModal}
      >
        <EditIcon fontSize="small" />
        <Typography>Update</Typography>
      </Stack>

      <DeptModal
        open={modalOpen}
        handleClose={handleCloseModal}
        title="Update Department"
      >
        <p>Update Modal</p>
      </DeptModal>
    </>
  );
}

export default Update;
