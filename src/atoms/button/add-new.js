import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddNew({ text }) {
  return (
    <Button startIcon={<AddIcon />} variant="contained">
      {text}
    </Button>
  );
}
