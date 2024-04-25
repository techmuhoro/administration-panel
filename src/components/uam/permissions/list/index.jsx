"use client";

import { useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ReusableTable from "@/atoms/reusable-table";
import { columns } from "./columns";
import Link from "next/link";
import Button from "@mui/material/Button";

import AddIcon from "@mui/icons-material/Add";
import PermissionsFilter from "./filter";
import PermissionsExport from "./export";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";

export default function PermissionsList({
  tblData,
  paginationData,
  errorFeed,
}) {
  const setAlertMessage = useNotifyAlertCtx();

  // toast the error Feed
  useEffect(() => {
    if (!!errorFeed) {
      setAlertMessage(errorFeed, { type: "error", openDuration: 4000 });
    }
  }, [errorFeed, setAlertMessage]);

  return (
    <Box>
      <Typography component="h1" variant="h5" mb={1}>
        Permissions
      </Typography>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          border: "1px solid #e5e7eb",
          px: 3,
          py: 3,
        }}
      >
        <Stack direction={"row"} mb={1}>
          <Link href={"/dashboard/permissions/add"}>
            <Button startIcon={<AddIcon />} variant="contained">
              New
            </Button>
          </Link>

          <Stack direction="row" sx={{ ml: "auto" }} columnGap={1}>
            <PermissionsFilter />
            <PermissionsExport />
          </Stack>
        </Stack>

        <ReusableTable
          columns={columns}
          data={tblData}
          count={paginationData.count}
          currentPage={paginationData.currentPage}
          rowsPerPage={paginationData.rowsPerPage}
          totalPages={paginationData.totalPages}
        />
      </Box>
    </Box>
  );
}
