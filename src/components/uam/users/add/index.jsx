import AddUserForm from "../forms";
import { Box } from "@mui/material";
export default function AddUser({ data }) {
  return (
    <Box>
      <AddUserForm rolesData={data} />
    </Box>
  );
}
