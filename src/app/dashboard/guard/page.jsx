"use client";

// !TO BE DELETED. For Demo purposes only
// TODO: DELETE this page
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import PermissionGuard from "@/atoms/authorization/permission-guard";
import PermissionFallbackText from "@/atoms/authorization/permission-fallback-text";

export default function Page() {
  return (
    <DashboardContentWrapper>
      <Box>
        <Typography>Hello from guard test</Typography>
      </Box>

      <PermissionGuard
        allow={{
          and: ["view-users", "add-users", "update-user"],
        }}
        fallback={
          <PermissionFallbackText
            permissionName={["update-user", "view-users"]}
          />
        }
      >
        <Typography>Hidden</Typography>
      </PermissionGuard>
    </DashboardContentWrapper>
  );
}

// [
//   "view-users",
//   "add-users",
//   "update-users",
//   "delete-users",
//   "view-departments",
//   "add-departments",
//   "update-departments",
//   "delete-departments",
// ];
