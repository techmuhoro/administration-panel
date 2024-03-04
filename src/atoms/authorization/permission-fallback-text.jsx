import Typography from "@mui/material/Typography";
export default function PermissionFallbackText({ permissionName }) {
  let str =
    typeof permissionName === "string"
      ? permissionName
      : Array.isArray(permissionName)
        ? permissionName.join(", ")
        : "";
  return (
    <Typography color="red" variant="h5" textAlign="center">
      {"`"}
      {str}
      {"`"} is not allowed for your account
    </Typography>
  );
}
