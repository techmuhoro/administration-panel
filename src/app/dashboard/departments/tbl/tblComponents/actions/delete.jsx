"use client";

import { useCallback, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

import DeptModal from "../dialog-modal";

function Delete({ item, handleMenuClose }) {
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
        <DeleteIcon fontSize="small" />
        <Typography>Delete</Typography>
      </Stack>

      <DeptModal
        open={modalOpen}
        // handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        title="Are you sure you want to delete"
      >
        <p>Delete Modal</p>
      </DeptModal>
    </>
  );
}

export default Delete;
