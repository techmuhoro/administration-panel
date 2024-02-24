"use client";

import { useState, useCallback } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";

import DeptModal from "../dialog-modal";

function View({ item, handleMenuClose }) {
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
        <VisibilityIcon fontSize="small" />
        <Typography>View</Typography>
      </Stack>

      <DeptModal
        open={modalOpen}
        handleClose={handleCloseModal}
        title="Department View"
        cancelText="Close"
      >
        <Box>
          <Typography variant="body2" component="span" sx={{ mr: 1 }}>
            Name:
          </Typography>
          <Typography
            variant="h6"
            component="span"
            sx={{ textTransform: "capitalize" }}
          >
            {item.attributes.name}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" component="span" sx={{ mr: 1 }}>
            Created On:
          </Typography>
          <Typography variant="h6" component="span">
            {item.attributes.createdAt}
          </Typography>
        </Box>
        <p>View Modal</p>
      </DeptModal>
    </>
  );
}

export default View;
