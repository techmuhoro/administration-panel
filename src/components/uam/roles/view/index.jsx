"use client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import CheckIcon from "@mui/icons-material/Check";

export default function RoleView({ role }) {
  const assignedPermissions = [];
  for (let category of role?.attributes?.defaultPermissions) {
    // flatten the permissions of category
    for (let perm of category.attributes.permissions) {
      if (perm.value === true || perm.value === "true") {
        assignedPermissions.push(perm);
      }
    }
  }

  const userList = role?.includes?.users || [];

  return (
    <Box>
      <Box component="header">
        <Typography variant="h6">Role {">"} View</Typography>
      </Box>
      <Box
        sx={{
          maxWidth: "80%",
          mx: "auto",
          backgroundColor: "white",
          border: `1px solid #e5e7eb`,
          borderRadius: "5px",
        }}
      >
        <Box sx={{ px: 4, py: 3 }}>
          <Typography
            sx={{ textTransform: "capitalize" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {role?.attributes?.name}
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
                  <CustomFlex label={"Name"} content={role?.attributes?.name} />
                  <CustomFlex
                    label={"Department"}
                    content={role?.attributes?.departmentName}
                  />
                  <CustomFlex label={"Slug"} content={role?.attributes?.slug} />
                  <CustomFlex
                    label={"Date created"}
                    content={role?.attributes?.createdAt}
                  />
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
                    border: (theme) => `1px solid ${theme.palette.border.main}`,
                    width: "100%",
                    p: 2,
                    borderRadius: "5px",
                  }}
                >
                  <Typography sx={{ fontWeight: "500", mb: 2 }}>
                    Users
                  </Typography>
                  <Stack direction={"row"} gap={2} flexWrap="wrap">
                    {userList.length < 1 && <Typography>No users!</Typography>}
                    {userList.map((user) => (
                      <Tooltip
                        key={user.id}
                        title={user.attributes.email}
                        sx={{ cursor: "pointer" }}
                      >
                        <Chip
                          color="default"
                          label={user.attributes.name}
                          size="small"
                        />
                      </Tooltip>
                    ))}
                  </Stack>
                </Box>

                <Box
                  sx={{
                    border: (theme) => `1px solid ${theme.palette.border.main}`,
                    width: "100%",
                    p: 2,
                    borderRadius: "5px",
                  }}
                >
                  <Typography sx={{ fontWeight: "500", mb: 2 }}>
                    Permissions
                  </Typography>

                  <Grid container columnSpacing={2} rowSpacing={2}>
                    {assignedPermissions.map((item, index) => (
                      <PermissionGridItem
                        key={item.key}
                        permissionName={item.key}
                      />
                    ))}
                  </Grid>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
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
        <Typography variant="body2">{permissionName}</Typography>
      </Stack>
    </Grid>
  );
}
