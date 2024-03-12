import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

/**
 *
 * @param {ButtonProps} props
 * @param {boolean} loading
 * @returns
 */

export default function AddNew({ variant, text, ...props }) {
  return (
    <Button startIcon={<AddIcon />} variant="contained">
      {text}
    </Button>
  );
}
