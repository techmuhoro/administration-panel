import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function InfoStack({ title, content }) {
  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body1">{content}</Typography>
    </Box>
  );
}
