import Box from "@mui/material/Box";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Typography from "@mui/material/Typography";

export default function Notifications() {
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
