import { Stack, Typography } from "@mui/material";

const AuthWrapper = ({ children }) => {
  return (
    <Stack>
      <Stack alignItems="center" py={2} borderBottom={1} borderColor="#DADEF0">
        <Typography variant="h5">iPay Admin Dashboard</Typography>
      </Stack>
      <Stack alignItems="center" justifyContent="center" height="90vh">
        {children}
      </Stack>
    </Stack>
  );
};

export default AuthWrapper;
