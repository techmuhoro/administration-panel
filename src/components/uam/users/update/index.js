import AddUserForm from "../forms";
import { Box } from "@mui/material";
export default function UpdateUser({ data, derp, userData }) {
  return (
    <Box>
      <AddUserForm
        rolesData={data}
        departmentData={derp}
        userDetails={userData}
        isUpdate={true}
      />
    </Box>
  );
}
