"use client";

import { useRouter, usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Link from "next/link";

export default function BreadcrumbsComponent({ items, omit = [] }) {
  const pathname = usePathname();
  function generateBreadcrumbItems(str) {
    const items =
      typeof str === "string" ? str.split("/").filter((s) => !!s) : [];
    const breadcrumbItems = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // generate link for the item
      const to = "/" + items.slice(0, i + 1).join("/");
      if (!omit.includes(item)) {
        breadcrumbItems.push({
          label: item,
          to,
        });
      }
    }

    return breadcrumbItems;
  }

  const breadcrumbItems = generateBreadcrumbItems(pathname);

  return (
    <Stack direction="row" alignItems="center" columnGap={0.5}>
      <DashboardIcon fontSize="small" sx={{}} />
      <Breadcrumbs separator=">">
        {breadcrumbItems?.map(({ label, to }) =>
          to ? (
            <Link style={{ textTransform: "capitalize" }} key={label} href={to}>
              {label}
            </Link>
          ) : (
            <Typography sx={{ textTransform: "capitalize" }} key={to}>
              {label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </Stack>
  );
  return (
    <Breadcrumbs separator=">">
      <Link href={"/dashboard"}>
        <Stack
          component="p"
          direction="row"
          alignItems="center"
          columnGap={0.5}
        >
          <DashboardIcon fontSize="small" sx={{}} />
          Dashboard
        </Stack>
      </Link>
      {breadcrumbItems?.map(({ label, to }) =>
        to ? (
          <Link style={{ textTransform: "capitalize" }} key={label} href={to}>
            {label}
          </Link>
        ) : (
          <Typography sx={{ textTransform: "capitalize" }} key={to}>
            {label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
}
