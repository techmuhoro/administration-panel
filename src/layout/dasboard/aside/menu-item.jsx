"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function MenuItem({ menuItem }) {
  const pathname = usePathname();
  const active = pathname === menuItem?.to;

  const activeStyles = {
    background: (theme) => theme.palette.primary.main,
    color: "white",
  };

  return (
    <Link href={menuItem?.to || ""}>
      <Stack
        direction={"row"}
        alignItems="center"
        columnGap={0.5}
        sx={{
          px: 1,
          py: 1,
          borderRadius: 1,
          cursor: "pointer",
          ...(active ? activeStyles : {}),
          "&:hover": {
            background: (theme) => theme.palette.primary.main,
            color: "white",
          },
        }}
      >
        {menuItem.icon}

        <Typography component={"p"}>{menuItem.label} </Typography>
      </Stack>
    </Link>
  );
}
