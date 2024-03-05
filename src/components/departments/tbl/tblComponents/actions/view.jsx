"use client";

import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";

function View({ setActiveAction, setModalOpen }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      columnGap={1}
      onClick={() => {
        setModalOpen(true);
        setActiveAction("view");
      }}
    >
      <VisibilityIcon fontSize="small" />
      <Typography>View</Typography>
    </Stack>
  );
}

export default View;

export function ViewModalContent({ item, setModalInitials }) {
  useEffect(() => {
    setModalInitials((prev) => {
      return {
        title: "Department View",
        cancelText: "Close",
      };
    });
  }, [setModalInitials]);
  return (
    <>
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
    </>
  );
}
