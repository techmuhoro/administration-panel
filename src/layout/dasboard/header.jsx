"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DashboardHeader() {
  return (
    <Stack
      component="header"
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: (theme) => `1px solid ${theme.palette.border.main}`,
        px: 2,
        py: 2,
      }}
    >
      <select style={{ border: "none", background: "transparent" }}>
        <option value="ke">KE</option>
        <option value="tz">TZ</option>
        <option value="ug">UG</option>
      </select>

      <Stack
        sx={{
          flexDirection: "row",
          //   border: "1px solid red",
          columnGap: 4,
          alignItems: "center",
        }}
      >
        <p>Help</p>
        <NotificationBell />
        <UserAvatar />
      </Stack>
    </Stack>
  );
}

function NotificationBell() {
  return (
    <Box sx={{ position: "relative" }}>
      <NotificationsIcon fontSize="medium" />

      <Typography
        component="p"
        sx={{
          display: "flex",
          bgcolor: (theme) => theme.palette.primary.light,
          width: 15,
          height: 15,
          color: "white",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          position: "absolute",
          top: -2,
          right: -2,
          fontSize: "0.7rem",
        }}
      >
        2
      </Typography>
    </Box>
  );
}

function UserAvatar() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      columnGap={1}
      sx={{
        cursor: "pointer",
      }}
    >
      <Typography>James</Typography>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
        <PersonIcon />
        <ExpandMoreIcon fontSize="small" sx={{ ml: -1 }} />
      </Stack>
    </Stack>
  );
}
