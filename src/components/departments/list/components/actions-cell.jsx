"use client";

import { useState, useCallback } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import UpdateModalContent from "./actions/update";
import DeleteModalContent from "./actions/delete";
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
    closeOnOutsideClick: true,
  });
  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    // setActiveAction("");
  }, [setModalOpen]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseActionMenu = () => {
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
        onClose={handleCloseActionMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Typography sx={{ pb: 0.5, px: 1, fontWeight: "medium" }}>
          Actions
        </Typography>
        <Divider />

        <MenuItem
          onClick={() => {
            handleCloseActionMenu();
            setModalOpen(true);
            setActiveAction("update");
          }}
        >
          <Stack direction="row" alignItems="center" columnGap={1}>
            <EditIcon fontSize="small" />
            <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
              Update
            </Typography>
          </Stack>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleCloseActionMenu();
            setModalOpen(true);
            setActiveAction("delete");
          }}
        >
          <Stack direction="row" alignItems="center" columnGap={1}>
            <DeleteIcon fontSize="small" />
            <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
              Delete
            </Typography>
          </Stack>
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
