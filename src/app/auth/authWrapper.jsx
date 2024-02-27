import Image from "next/image";

import { Box, Stack } from "@mui/material";

import ipaylogo from "@/assets/ipaylogo.svg";

const AuthWrapper = ({ children }) => {
  return (
    <Stack sx={{ backgroundColor: "#F3F8FB" }}>
      <Box px={5} py={3}>
        <Image src={ipaylogo} alt="iPay logo" width={100} height={45} />
      </Box>
      <Stack alignItems="center" minHeight="85vh">
        {children}
      </Stack>
    </Stack>
  );
};

export default AuthWrapper;
