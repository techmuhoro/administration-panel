"";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { ButtonProps } from "@mui/material";

/**
 *
 * @param {ButtonProps} props
 * @param {boolean} loading
 * @returns
 */
export default function LoadingButton({
  variant = "contained",
  loading,
  ...props
}) {
  return (
    <Button
      variant={variant}
      disabled={loading}
      sx={{ position: "relative" }}
      {...props}
    >
      {props.children}
      {loading && (
        <CircularProgress
          size={12}
          sx={{
            color: "#474747",
            position: "absolute",
          }}
        />
      )}
    </Button>
  );
}
