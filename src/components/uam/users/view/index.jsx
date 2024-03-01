"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckIcon from "@mui/icons-material/Check";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: (theme) => `2px solid ${theme.palette.border.main}`,
  borderRadius: "5px",
};

export default function UsersView({ row }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const users = ["Albert", "James", "Zacky", "Shirley"];

  const permissions = Array(50).fill("create_user");

  return (
    <>
      <MenuItem onClick={handleOpen}>
        <Stack direction="row" alignItems={"center"} columnGap={1}>
          <VisibilityIcon sx={{ fontSize: "1rem" }} />
          <Typography>View</Typography>
        </Stack>
      </MenuItem>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="header" sx={{ px: 4, py: 2 }}>
            <Typography variant="h6" color="primary">
              Role {">"} View
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ px: 4, py: 2 }}>
            <Typography
              sx={{ textTransform: "capitalize" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              {row?.role}
            </Typography>
            <Box>
              <Stack
                direction={{
                  sm: "column",
                  md: "row",
                }}
                columnGap={2}
                rowGap={2}
              >
                <Box
                  sx={{
                    border: (theme) => `1px solid ${theme.palette.border.main}`,
                    width: {
                      sm: "100%",
                      md: "50%",
                    },
                    p: 2,
                    borderRadius: "5px",
                  }}
                >
                  <Typography sx={{ fontWeight: "500", mb: 2 }}>
                    Details
                  </Typography>
                  <Stack rowGap={1}>
                    <CustomFlex label={"Name"} content={row?.role} />
                    <CustomFlex
                      label={"Department"}
                      content={row?.department}
                    />
                    <CustomFlex
                      label={"Description"}
                      content={row?.description}
                    />
                    <CustomFlex
                      label={"Date created"}
                      content={row?.createdAt}
                    />
                    <CustomFlex label={"Create by"} content={row?.createdBy} />
                  </Stack>
                </Box>
                <Stack
                  sx={{
                    width: {
                      sm: "100%",
                      md: "50%",
                    },
                  }}
                  rowGap={2}
                >
                  <Box
                    sx={{
                      border: (theme) =>
                        `1px solid ${theme.palette.border.main}`,
                      width: "100%",
                      p: 2,
                      borderRadius: "5px",
                    }}
                  >
                    <Typography sx={{ fontWeight: "500", mb: 2 }}>
                      Users
                    </Typography>
                    <Stack direction={"row"} gap={2} flexWrap="wrap">
                      {users.map((user) => (
                        <Chip
                          color="default"
                          label={user}
                          key={user}
                          size="small"
                        />
                      ))}
                    </Stack>
                  </Box>

                  <Box
                    sx={{
                      border: (theme) =>
                        `1px solid ${theme.palette.border.main}`,
                      width: "100%",
                      p: 2,
                      borderRadius: "5px",
                    }}
                  >
                    <Typography sx={{ fontWeight: "500", mb: 2 }}>
                      Permissions
                    </Typography>

                    <Grid container columnSpacing={2} rowSpacing={2}>
                      {permissions.map((item, index) => (
                        <PermissionGridItem
                          key={item + index}
                          permissionName={item}
                        />
                      ))}
                    </Grid>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

function CustomFlex({ label, content }) {
  return (
    <Stack sx={{ width: "100%" }} direction="row" columnGap={2}>
      <Typography sx={{ width: "50%", fontWeight: "500" }}>{label}:</Typography>
      <Typography sx={{ width: "50%" }}>{content}</Typography>
    </Stack>
  );
}

function PermissionGridItem({ permissionName }) {
  return (
    <Grid sm={6} md={6} lg={4}>
      <Stack direction="row" alignItems="center" columnGap={0.5}>
        <CheckIcon sx={{ fontSize: "0.9rem" }} />
        <Typography>{permissionName}</Typography>
      </Stack>
    </Grid>
  );
}
