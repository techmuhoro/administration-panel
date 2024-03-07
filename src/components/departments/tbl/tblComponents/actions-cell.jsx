"use client";

import { useState, useCallback } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// import ViewAction, { ViewModalContent } from "./actions/view";
import UpdateAction, { UpdateModalContent } from "./actions/update";
import DeleteAction, { DeleteModalContent } from "./actions/delete";
import DeptModal from "./dialog-modal";

const ActionsCell = ({ data: { row } }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeAction, setActiveAction] = useState("");
  const [modalInitials, setModalInitials] = useState({
    onConfirmAction: null,
    title: "",
    confirmText: "Yes",
    cancelText: "No",
    loading: false,
    actionBtnColor: "primary",
  });
  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setActiveAction("");
  }, [setModalOpen]);

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
          <UpdateAction
            setActiveAction={setActiveAction}
            setModalOpen={setModalOpen}
          />
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <DeleteAction
            setActiveAction={setActiveAction}
            setModalOpen={setModalOpen}
          />
        </MenuItem>
      </Menu>

      <DeptModal
        open={modalOpen}
        handleClose={handleCloseModal}
        {...modalInitials}
      >
        {String(activeAction).toLowerCase() === "update" ? (
          <UpdateModalContent
            item={row}
            setModalInitials={setModalInitials}
            closeModal={handleCloseModal}
          />
        ) : String(activeAction).toLowerCase() === "delete" ? (
          <DeleteModalContent
            item={row}
            setModalInitials={setModalInitials}
            closeModal={handleCloseModal}
          />
        ) : null}
      </DeptModal>
    </>
  );
};

export default ActionsCell;
