"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { alpha } from "@mui/material/styles";

export default function MenuItem({ menuItem }) {
  const pathname = usePathname();

  const active =
    typeof menuItem.active === "function"
      ? menuItem.active(pathname)
      : pathname === menuItem?.to;

  const activeStyles = {
    background: (theme) => alpha(theme.palette.primary.main, 0.2),
    // color: "white",
    borderRight: (theme) => `5px solid ${theme.palette.primary.main}`,
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
          // borderRadius: 1,
          cursor: "pointer",
          ...(active ? activeStyles : {}),
          "&:hover": {
            background: (theme) => alpha(theme.palette.primary.main, 0.2),
            color: "black",
          },
        }}
      >
        {menuItem.icon}

        <Typography component={"p"}>{menuItem.label} </Typography>
      </Stack>
    </Link>
  );
}
