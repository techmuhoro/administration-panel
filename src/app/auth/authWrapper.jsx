"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Box, Stack } from "@mui/material";

import ipaylogo from "@/assets/ipaylogo.svg";

const AuthWrapper = ({ children }) => {
  const router = useRouter();

  return (
    <Stack sx={{ backgroundColor: "#f9fafb" }}>
      <Box sx={{ cursor: "pointer", px: 5, py: 3 }}>
        <Image
          src={ipaylogo}
          alt="iPay logo"
          width={100}
          height={45}
          onClick={() => {
            router.push("/auth/login");
          }}
        />
      </Box>
      <Stack alignItems="center" minHeight="85vh">
        {children}
      </Stack>
    </Stack>
  );
};

export default AuthWrapper;
