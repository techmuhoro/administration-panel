import AddUserForm from "../forms";
import { Box } from "@mui/material";
export default function AddUser({ data, derp }) {
  return (
    <Box>
      <AddUserForm rolesData={data} derpartmentData={derp} />
    </Box>
  );
}
