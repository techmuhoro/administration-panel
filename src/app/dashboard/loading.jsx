import { CircularProgress, Box } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ mt: 5 }} textAlign="center">
      <CircularProgress size="24px" />
    </Box>
  );
}
