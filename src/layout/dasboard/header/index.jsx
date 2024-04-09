"use client";

import Stack from "@mui/material/Stack";
import UserAvatar from "./user-avatar";
import Notifications from "./notifications";
import MobileMenuIcon from "./mobile-menu-icon";
import GlobalCountry from "./global-country";

export default function DashboardHeader() {
  return (
    <Stack
      component="header"
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: (theme) => `1px solid ${theme.palette.border.main}`,
        px: 2,
        py: 1.5,
        position: "sticky",
        top: 0,
        backgroundColor: "#fff",
        zIndex: "999",
        height: "8%",
      }}
    >
      <Stack direction="row" alignItems="center" columnGap={2}>
        <MobileMenuIcon />
        <GlobalCountry />
      </Stack>

      <Stack
        sx={{
          flexDirection: "row",
          //   border: "1px solid red",
          columnGap: 4,
          alignItems: "center",
        }}
      >
        <p>Help</p>
        <Notifications />
        <UserAvatar />
      </Stack>
    </Stack>
  );
}
