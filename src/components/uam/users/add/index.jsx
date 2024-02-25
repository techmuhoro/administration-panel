import AddUserForm from "../forms";
import { Box } from "@mui/material";
export default function AddUser({ data, derp }) {
  return (
    <Box>
      <AddUserForm rolesData={data} departmentData={derp} isUpdate={false} />
    </Box>
  );
}
