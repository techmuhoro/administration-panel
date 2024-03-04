"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import ViewAction from "./actions/view";
import UpdateAction from "./actions/update";
import DeleteAction from "./actions/delete";
import DeptModal from "./dialog-modal";

// import TransactionDelete from "../delete";

const ActionsCell = ({ data: { row } }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitials, setModalInitials] = useState({
    onConfirmAction: null,
    title: "",
    confirmText: "Yes",
    cancelText: "No",
    loading: false,
  });
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Typography sx={{ pb: 0.5, px: 1, fontWeight: "medium" }}>
          Actions
        </Typography>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ViewAction
            setModalContent={setModalContent}
            setModalOpen={setModalOpen}
            setModalInitials={setModalInitials}
            item={row}
          />
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <UpdateAction
            setModalContent={setModalContent}
            setModalOpen={setModalOpen}
            setModalInitials={setModalInitials}
            item={row}
          />
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <DeleteAction
            setModalContent={setModalContent}
            setModalOpen={setModalOpen}
            setModalInitials={setModalInitials}
            item={row}
          />
        </MenuItem>
      </Menu>

      <DeptModal
        open={modalOpen}
        handleClose={handleCloseModal}
        {...modalInitials}
      >
        {modalContent}
      </DeptModal>
    </>
  );
};

export default ActionsCell;
